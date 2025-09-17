# Express + Vercel Starter (Local & Serverless)

This template lets you run a normal Express server locally **and** deploy the same app to Vercel as a **serverless** function.

## Folder layout
```
express-vercel-starter/
  app.js               # Express app (no app.listen here)
  server.js            # Local-only runner (classic Node server)
  api/
    index.js           # Vercel serverless entry (wraps app.js)
  public/
    index.html         # Static file example
  package.json
  vercel.json          # (optional) rewrite all routes to /api/index
  .env.example
  .env.local.example
  .gitignore
  README.md
```

## Install
```bash
npm install
```

## Local (classic server)
```bash
cp .env.example .env   # add values
npm run local
# http://localhost:3001  -> Express app
# Try: /, /ping, /hello?name=Rishabh
```

## Local (Vercel emulator)
```bash
cp .env.local.example .env.local  # add values
npx vercel login   # first time only
npm run dev
# http://localhost:3000 (Vercel dev)
```

## Deploy to Vercel
```bash
npm run deploy
```

## Notes
- `app.listen()` is only used in `server.js` for local classic runs.
- In Vercel, `api/index.js` exports a serverless handler; no port binding.
- Static files in `/public` are served by Vercel automatically.
- If you prefer your API under `/api/*` instead of normal paths, remove `vercel.json`.
- For databases, cache your client in module scope to reuse across warm invocations.
