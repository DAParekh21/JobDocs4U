import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

let db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (db) return db;
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL not set');

  const url = new URL(databaseUrl);
  const useSsl = process.env.DB_SSL !== 'false' && url.hostname !== 'localhost';

  const pool = mysql.createPool({
    host: url.hostname,
    port: Number(url.port) || 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace('/', ''),
    ssl: useSsl ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined,
    waitForConnections: true,
    connectionLimit: 10,
  });

  db = drizzle(pool);
  return db;
}
