import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const u = new URL(process.env.DATABASE_URL as string);

export default defineConfig({
  dialect: 'mysql',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    host: u.hostname,
    port: Number(u.port) || 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace('/', ''),
    ssl: {
      ca: fs.readFileSync(path.resolve(__dirname, 'isrgrootx1.pem'), 'utf8'),
      rejectUnauthorized: true,
    },
  },
});
