import { getDb } from '../db/client';
import { users, usage } from '../db/schema';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export async function registerUser(email: string, password: string) {
  const db = await getDb();
  // check if user exists
  const existing = await db.select().from(users).where(users.email.eq(email));
  if (existing.length > 0) throw new Error('User already exists');

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await db.insert(users).values({ email, passwordHash });

  // initialize usage row
  const insertedId = (result as any).insertId;
  await db.insert(usage).values({ userId: insertedId });

  return { id: insertedId, email };
}

export async function verifyUser(email: string, password: string) {
  const db = await getDb();
  const found = await db.select().from(users).where(users.email.eq(email));
  if (found.length === 0) return null;
  const user = found[0] as any;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  // return safe user object
  return { id: user.id, email: user.email, membershipActive: user.membershipActive };
}
