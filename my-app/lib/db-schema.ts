import { pgTable, serial, text, vector, index } from "drizzle-orm/pg-core";

export const documents = pgTable(
  "documents",
  {
    // Clé primaire auto-incrémentée
    id: serial("id").primaryKey(),

    // Texte source utilisé pour le RAG (chunk de document)
    content: text("content").notNull(),

    // Embedding généré avec Google text-embedding-004
    // 768 dimensions → standard Gemini
    embedding: vector("embedding", { dimensions: 768 }),
  },
  (table) => [
    // Index vectoriel pour recherche sémantique rapide
    // HNSW + cosine similarity = combo optimal pour RAG
    index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
  ],
);

export type InsertDocument = typeof documents.$inferInsert;
export type SelectDocument = typeof documents.$inferSelect;
