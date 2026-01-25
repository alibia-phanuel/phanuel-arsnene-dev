// components/AISidebar.tsx
"use client";
import { useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Loader } from "@/components/ai-elements/loader";

export default function AISidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { messages, sendMessage, status } = useChat();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const messageText = input;
    setInput(""); // Vider immédiatement

    try {
      await sendMessage({ text: messageText });
    } catch (err) {
      console.error("Erreur chat :", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form; // Récupère le form parent
      if (form) form.requestSubmit(); // Appelle handleSubmit via onSubmit du form
    }
  };

  const suggestions = [
    "Quelles sont les compétences techniques en IA de Phanuel  ?",
    "Décris-moi les projets internationaux réalisés",
    "Quelle est l'expérience de Phanuel avec les chatbots et RAG ?",
    "Quels sont les objectifs et la vision d'Alibia Tech ?",
  ];

  return (
    <>
      {/* Bouton flottant AI */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed bottom-8 right-8 z-[10001] group transition-all duration-500 ${
          isSidebarOpen
            ? "scale-75 opacity-80 rotate-180"
            : "scale-100 opacity-100"
        }`}
        aria-label={
          isSidebarOpen ? "Fermer l'assistant IA" : "Ouvrir l'assistant IA"
        }
      >
        <div className="absolute inset-0 rounded-full bg-[#193cb8] animate-pulse opacity-60 blur-lg" />
        <div className="absolute inset-0 rounded-full bg-[#a2f4fd] animate-ping opacity-40" />

        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#193cb8] to-[#0d1128] shadow-2xl hover:shadow-[#193cb8]/50 transition-all duration-300 hover:scale-110 border-2 border-[#a2f4fd]/30">
          {isSidebarOpen ? (
            <X className="w-8 h-8 text-[#a2f4fd] animate-pulse" />
          ) : (
            <Sparkles className="w-8 h-8 text-[#a2f4fd] animate-pulse" />
          )}

          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#a2f4fd] rounded-full animate-bounce shadow-lg shadow-[#a2f4fd]/50" />
          <div
            className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#a2f4fd] rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
        </div>

        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-[#0d1128] text-[#a2f4fd] text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#193cb8]">
          Assistant IA
          <div className="absolute top-full right-4 w-2 h-2 bg-[#0d1128] border-r border-b border-[#193cb8] transform rotate-45 -mt-1" />
        </div>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[#010104] z-[10004] transition-all duration-700 ${
          isSidebarOpen
            ? "opacity-80 backdrop-blur-sm"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-2/5 bg-gradient-to-b from-[#0d1128] to-[#010104] shadow-2xl z-[10005] transition-all duration-700 ease-out flex flex-col ${
          isSidebarOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between p-5 md:p-6 border-b border-[#193cb8]/30 bg-gradient-to-r from-[#0d1128] via-[#193cb8]/40 to-[#0d1128] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a2f4fd]/10 to-transparent animate-shimmer" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-[#a2f4fd] rounded-full blur-md opacity-50 animate-pulse" />
              <div className="relative bg-white/10 p-2 rounded-full backdrop-blur-sm border border-[#a2f4fd]/30">
                <Sparkles className="w-6 h-6 text-[#a2f4fd]" />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Assistant IA
            </h2>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="relative z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-[#a2f4fd]/30 hover:border-[#a2f4fd]"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-[#a2f4fd] hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col min-h-0 p-5 md:p-6 overflow-hidden bg-[#010104]/40">
          <Conversation className="flex-1 flex flex-col">
            <ConversationContent className="flex-1 space-y-6 pb-8 overflow-y-auto scrollbar-thin scrollbar-thumb-[#193cb8]/40 scrollbar-track-transparent pr-2">
              {/* Écran d'accueil */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-[#a2f4fd] rounded-full blur-3xl opacity-20 animate-pulse" />
                    <Sparkles className="relative w-20 h-20 mx-auto text-[#a2f4fd]/70" />
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3">
                    Envie d&apos;en savoir plus sur moi ?
                  </h2>

                  <p className="text-[#a2f4fd]/70 max-w-md mb-8">
                    Pose une question à l&apos;IA pour découvrir mon parcours,
                    mes compétences, mon CV ou ce que je fais actuellement.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                    {suggestions.map((text, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(text)}
                        className="px-4 py-3 bg-[#193cb8]/20 hover:bg-[#193cb8]/40 border border-[#193cb8]/40 hover:border-[#a2f4fd]/40 rounded-xl text-left text-sm text-[#e0f7ff] transition-all hover:shadow-md hover:shadow-[#193cb8]/30"
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.parts?.map((part, idx) => {
                    if (part.type !== "text" || !part.text?.trim()) return null;

                    const isUser = msg.role === "user";

                    return (
                      <Message
                        key={`${msg.id}-${idx}`}
                        from={msg.role}
                        className={
                          isUser ? "flex justify-end" : "flex justify-start"
                        }
                      >
                        <MessageContent
                          className={`
                            max-w-[85%] rounded-2xl px-5 py-3.5 shadow-md
                            ${
                              isUser
                                ? "bg-gradient-to-br from-[#193cb8] to-[#0d1128] text-[#e0f7ff]"
                                : "bg-[#0d1128]/70 backdrop-blur-sm border border-[#193cb8]/50 text-[#e0f7ff]"
                            }
                          `}
                        >
                          <Response className="prose prose-invert prose-sm max-w-none leading-6">
                            {part.text}
                          </Response>
                        </MessageContent>
                      </Message>
                    );
                  })}
                </div>
              ))}

              {/* Loader pendant soumission + streaming */}
              {(isSubmitting ||
                status === "submitted" ||
                status === "streaming") && (
                <div className="flex justify-start">
                  <div className="bg-[#0d1128]/70 backdrop-blur-sm rounded-2xl px-5 py-3.5 border border-[#193cb8]/50 shadow-md">
                    <Loader />
                  </div>
                </div>
              )}
            </ConversationContent>

            <ConversationScrollButton />
          </Conversation>

          {/* Zone de saisie - Style comme dans la capture */}
          <div className="mt-5 pt-5">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative bg-[#0d1128]/80 backdrop-blur-md rounded-[32px] border border-[#193cb8]/40 hover:border-[#a2f4fd]/60 transition-all duration-200 shadow-2xl shadow-[#193cb8]/20">
                <div className="flex items-end gap-2 p-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Que souhaitez-vous savoir sur moi ?"
                    className="flex-1 resize-none bg-transparent border-0 focus:ring-0 focus:outline-none text-[#e0f7ff] placeholder:text-[#a2f4fd]/40 text-base leading-relaxed px-4 py-3 min-h-[56px] max-h-[200px]"
                    rows={1}
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#193cb8 transparent",
                    }}
                    autoFocus
                  />

                  <button
                    type="submit"
                    disabled={!input.trim() || isSubmitting}
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-black hover:bg-gray-900 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl disabled:hover:bg-black"
                    aria-label="Envoyer"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-shimmer {
            animation: shimmer 2.5s infinite;
          }
        `}</style>
      </div>
    </>
  );
}
