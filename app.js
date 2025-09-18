import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Basic routes
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Hello from Express app (shared for local & Vercel)!" });
});

app.get("/ping", (req, res) => res.send("pong"));

app.get("/hello", (req, res) => {
  const name = req.query.name || "friend";
  res.json({ message: `Hello, ${name}!` });
});

  app.listen(3000, () => console.log(`Local server on http://localhost:3000`));

