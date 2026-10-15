// Minimal Express + tRPC entry (placeholder)
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.send('JobDocs4U API (Step 1 scaffold)'));

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
