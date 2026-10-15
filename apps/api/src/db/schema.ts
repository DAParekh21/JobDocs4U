import { mysqlTable, serial, int, varchar, text, datetime } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 191 }).notNull(),
  passwordHash: varchar('password_hash', { length: 191 }).notNull(),
  stripeCustomerId: varchar('stripe_customer_id', { length: 191 }),
  membershipActive: int('membership_active').default(0),
  createdAt: datetime('created_at').defaultNow()
});

export const resumes = mysqlTable('resumes', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  jobDescription: text('job_description'),
  atsOptimized: int('ats_optimized').default(1),
  createdAt: datetime('created_at').defaultNow()
});

export const coverLetters = mysqlTable('cover_letters', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(),
  resumeId: int('resume_id'),
  content: text('content').notNull(),
  companyName: varchar('company_name', { length: 255 }),
  createdAt: datetime('created_at').defaultNow()
});

export const usage = mysqlTable('usage', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(),
  freeResumesUsed: int('free_resumes_used').default(0),
  freeCoverLettersUsed: int('free_cover_letters_used').default(0),
  interviewPurchased: int('interview_purchased').default(0),
  updatedAt: datetime('updated_at').defaultNow()
});
