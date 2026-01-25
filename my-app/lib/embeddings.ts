// src/lib/embeddings.ts
import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";

const MAX_BATCH_SIZE = 100;
const DELAY_BETWEEN_BATCHES = 700; // 700ms pour respecter le rate limit

// ✅ Types pour les erreurs d'embedding API
interface RetryInfoDetail {
  "@type": "type.googleapis.com/google.rpc.RetryInfo";
  retryDelay?: string; // Format: "40s"
}

interface OtherDetail {
  "@type": string;
}

type ErrorDetail = RetryInfoDetail | OtherDetail;

interface EmbeddingApiErrorData {
  error?: {
    code?: number;
    message?: string;
    status?: string;
    details?: ErrorDetail[];
  };
}

interface EmbeddingApiError {
  statusCode?: number;
  data?: EmbeddingApiErrorData;
  message?: string;
}

// ✅ Type guard pour vérifier si c'est une erreur API
function isEmbeddingApiError(error: unknown): error is EmbeddingApiError {
  if (typeof error !== "object" || error === null) return false;
  const err = error as Record<string, unknown>;
  return typeof err.statusCode === "number";
}

// ✅ Type guard pour RetryInfoDetail
function isRetryInfoDetail(detail: ErrorDetail): detail is RetryInfoDetail {
  return detail["@type"] === "type.googleapis.com/google.rpc.RetryInfo";
}

// ✅ Fonction utilitaire pour attendre
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ✅ Extraire le retry delay depuis les détails d'erreur
function extractRetryDelay(error: EmbeddingApiError): number {
  const details = error.data?.error?.details;
  if (!details) return 40000; // 40 secondes par défaut

  const retryInfo = details.find(isRetryInfoDetail);
  if (!retryInfo?.retryDelay) return 40000;

  // Parser "40s" -> 40000ms
  const seconds = parseInt(retryInfo.retryDelay.replace("s", ""), 10);
  return isNaN(seconds) ? 40000 : seconds * 1000;
}

// ✅ Génère un embedding pour un texte
export async function generateEmbedding(text: string): Promise<number[]> {
  const input = text.replaceAll("\n", " ").trim();

  try {
    const { embedding } = await embed({
      model: google.embedding("gemini-embedding-001"),
      value: input,
      providerOptions: {
        google: {
          outputDimensionality: 768,
        },
      },
    });

    return embedding;
  } catch (error: unknown) {
    // Gestion de l'erreur 429 (quota dépassé)
    if (isEmbeddingApiError(error) && error.statusCode === 429) {
      console.log("Rate limit atteint, attente de 2 secondes...");
      await sleep(2000);

      // Réessayer
      const { embedding } = await embed({
        model: google.embedding("gemini-embedding-001"),
        value: input,
        providerOptions: {
          google: {
            outputDimensionality: 768,
          },
        },
      });

      return embedding;
    }

    throw error;
  }
}

// ✅ Génère des embeddings pour plusieurs textes (avec batching et rate limiting)
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const inputs = texts
    .map((text) => text.replaceAll("\n", " ").trim())
    .filter(Boolean);

  const allEmbeddings: number[][] = [];
  const totalBatches = Math.ceil(inputs.length / MAX_BATCH_SIZE);

  console.log(
    `Génération de ${inputs.length} embeddings en ${totalBatches} batch(es)...`
  );

  for (let i = 0; i < inputs.length; i += MAX_BATCH_SIZE) {
    const batch = inputs.slice(i, i + MAX_BATCH_SIZE);
    const batchNumber = Math.floor(i / MAX_BATCH_SIZE) + 1;

    try {
      console.log(
        `Traitement du batch ${batchNumber}/${totalBatches} (${batch.length} textes)...`
      );

      const { embeddings } = await embedMany({
        model: google.embedding("gemini-embedding-001"),
        values: batch,
        providerOptions: {
          google: {
            outputDimensionality: 768,
          },
        },
      });

      allEmbeddings.push(...embeddings);

      // Attendre entre les batches (sauf pour le dernier)
      if (i + MAX_BATCH_SIZE < inputs.length) {
        console.log(
          `Attente de ${DELAY_BETWEEN_BATCHES}ms avant le prochain batch...`
        );
        await sleep(DELAY_BETWEEN_BATCHES);
      }
    } catch (error: unknown) {
      // Gestion des erreurs de quota
      if (isEmbeddingApiError(error) && error.statusCode === 429) {
        const waitTime = extractRetryDelay(error);

        console.log(
          `Quota dépassé. Attente de ${waitTime / 1000}s avant de réessayer...`
        );
        await sleep(waitTime);

        // Réessayer ce batch
        const { embeddings } = await embedMany({
          model: google.embedding("gemini-embedding-001"),
          values: batch,
          providerOptions: {
            google: {
              outputDimensionality: 768,
            },
          },
        });

        allEmbeddings.push(...embeddings);

        // Attendre après le retry
        if (i + MAX_BATCH_SIZE < inputs.length) {
          await sleep(DELAY_BETWEEN_BATCHES);
        }
      } else {
        throw error;
      }
    }
  }

  console.log(
    `✅ Tous les embeddings générés avec succès (${allEmbeddings.length} total)`
  );
  return allEmbeddings;
}