import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

let db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (db) return db;
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL not set');

  // mysql2 connection using connection string
  const pool = mysql.createPool(databaseUrl);
  db = drizzle(pool);
  return db;
}
