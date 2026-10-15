# JobDocs4U

Minimal scaffold implementing Step 1 of your requested setup.

What this commit includes
- pnpm workspace setup (root package.json + pnpm-workspace.yaml)
- apps/api and apps/web folders as workspace packages
- .env.example with MySQL + Stripe test keys and other env vars
- Drizzle schema: users, resumes, coverLetters, usage
- DB client placeholder (using mysql2 + drizzle) at apps/api/src/db/client.ts
- Email/password auth module (register/login) with bcrypt hashing at apps/api/src/auth/index.ts

What I did NOT include yet (per your instructions)
- No AI generation code
- No Stripe webhook handlers or billing logic beyond env placeholders
- No frontend implementation beyond a README placeholder
- No deployment or CI

Next steps I can run for you on request
- Add tRPC routers for auth and generation endpoints
- Add basic frontend pages and forms (Vite + React)
- Add Stripe checkout integration and webhook handling
- Implement AI adapter and generation logic

To proceed, tell me which next step you want me to implement. If you want me to run any install/build steps or create initial issues, I can do that next.
