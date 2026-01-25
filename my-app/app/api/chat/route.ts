// src/app/api/chat/route.ts
import {
  streamText,
  convertToModelMessages,
  tool,
  InferUITools,
  UIDataTypes,
  UIMessage,
  stepCountIs,
} from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { searchDocuments } from "@/lib/search";

// ✅ Types personnalisés pour les erreurs API
interface RetryInfo {
  "@type": string;
  retryDelay?: string;
}

interface QuotaFailure {
  "@type": string;
  violations?: Array<{
    quotaMetric: string;
    quotaId: string;
    quotaDimensions: Record<string, string>;
    quotaValue: string;
  }>;
}

interface ApiErrorDetails {
  error: {
    code: number;
    message: string;
    status: string;
    details?: Array<RetryInfo | QuotaFailure | { "@type": string }>;
  };
}

interface ApiError {
  statusCode?: number;
  responseBody?: string | ApiErrorDetails;
  lastError?: {
    statusCode?: number;
    responseBody?: string | ApiErrorDetails;
  };
}

// ✅ Tools configuration
const tools = {
  searchKnowledgeBase: tool({
    description:
      "Rechercher des informations pertinentes dans la base de connaissances",
    inputSchema: z.object({
      query: z
        .string()
        .describe(
          "La requête de recherche pour trouver des documents pertinents",
        ),
    }),
    execute: async ({ query }) => {
      try {
        const results = await searchDocuments(query, 3, 0.5);

        if (results.length === 0) {
          return "Aucune information pertinente trouvée dans la base de connaissances.";
        }

        const formattedResults = results
          .map((r, i) => `[${i + 1}] ${r.content}`)
          .join("\n\n");

        return formattedResults;
      } catch (error) {
        console.error("Erreur de recherche:", error);
        return "Erreur lors de la recherche dans la base de connaissances";
      }
    },
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

// ✅ Helper: Vérifie si c'est une erreur API
function isApiError(error: unknown): error is ApiError {
  if (typeof error !== "object" || error === null) return false;
  const err = error as Record<string, unknown>;
  return (
    typeof err.statusCode === "number" ||
    (typeof err.lastError === "object" &&
      err.lastError !== null &&
      typeof (err.lastError as Record<string, unknown>).statusCode === "number")
  );
}

// ✅ Helper: Parse les données d'erreur JSON
function parseErrorData(data: unknown): ApiErrorDetails | null {
  try {
    if (typeof data === "string") {
      return JSON.parse(data) as ApiErrorDetails;
    }
    if (typeof data === "object" && data !== null) {
      return data as ApiErrorDetails;
    }
  } catch {
    // Ignore parsing errors
  }
  return null;
}

// ✅ Helper: Extraire le retry delay depuis les détails de l'erreur
function extractRetryDelay(errorData: ApiErrorDetails | null): string {
  if (!errorData?.error?.details) return "quelques minutes";

  const retryInfo = errorData.error.details.find(
    (detail): detail is RetryInfo =>
      detail["@type"]?.includes("RetryInfo") === true,
  );

  return retryInfo?.retryDelay || "quelques minutes";
}

// ✅ POST handler
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: modelMessages,
      tools,
      system: `Tu es un assistant intelligent qui aide les utilisateurs à en savoir plus sur moi.
          Tu as accès à une base de connaissances contenant des informations me concernant.
          
          INSTRUCTIONS IMPORTANTES:
          - Réponds TOUJOURS en français
          - Cherche dans la base de connaissances avant de répondre aux questions sur moi
          - Utilise le tool "searchKnowledgeBase" pour toute question qui pourrait concerner les documents téléchargés
          - Base tes réponses sur les résultats de recherche quand ils sont disponibles
          - Donne des réponses concises et précises qui répondent directement à la question de l'utilisateur
          - Ne submerge pas l'utilisateur avec toutes les informations - sois sélectif et pertinent
          - Si tu ne trouves pas d'information dans la base de connaissances, dis-le clairement
          
          Ton rôle est d'aider les gens à mieux me connaître en utilisant les informations de ma base de connaissances.`,
      stopWhen: stepCountIs(2),
      maxRetries: 2,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: unknown) {
    console.error("Erreur dans la route de chat:", error);

    // ✅ Vérifier si c'est une erreur 429 (quota dépassé)
    if (isApiError(error)) {
      const statusCode = error.statusCode || error.lastError?.statusCode;

      if (statusCode === 429) {
        // Récupérer le responseBody
        const errorBody = error.responseBody || error.lastError?.responseBody;
        const errorData = parseErrorData(errorBody);
        const retryAfter = extractRetryDelay(errorData);

        return new Response(
          JSON.stringify({
            error: "Quota de l'API dépassé",
            message: `Vous avez atteint la limite quotidienne pour le niveau gratuit (20 requêtes/jour). Veuillez réessayer dans ${retryAfter} ou mettez à niveau votre plan API.`,
            type: "quota_exceeded",
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }
    }

    // ✅ Gestion des autres erreurs
    const message =
      error instanceof Error
        ? error.message
        : "Une erreur inattendue s'est produite";

    return new Response(
      JSON.stringify({
        error: "Erreur interne du serveur",
        message,
        type: "server_error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
