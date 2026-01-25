// Import de Drizzle ORM pour l'utiliser avec Neon (PostgreSQL serverless)
import { drizzle } from "drizzle-orm/neon-http";

// Client HTTP officiel de Neon (évite une connexion TCP classique)
import { neon } from "@neondatabase/serverless";

// Permet de charger les variables d'environnement depuis un fichier .env
import { config } from "dotenv";

// Charge explicitement les variables depuis .env.local
// Indispensable en local si la variable NEON_DATABASE_URL n'est pas déjà dans le process
config({ path: ".env.local" });

// Création du client SQL Neon à partir de l'URL de connexion PostgreSQL
// Le "!" indique à TypeScript que la variable existe forcément
const sql = neon(process.env.NEON_DATABASE_URL!);

// Initialisation de Drizzle avec le client Neon
// `db` sera utilisé partout dans l'app pour faire des requêtes typées
export const db = drizzle(sql);