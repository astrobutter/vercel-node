
import 'dotenv/config';
import express from "express";
import cors from "cors";

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Hello from Express app (shared for local & Vercel)!" });
});

app.get("/ping", (req, res) => res.send("pong"));

app.get("/hello", (req, res) => {
  const name = req.query.name || "friend";
  res.json({ message: `Hello, ${name}!` });
});

app.listen(3001, () => console.log("Server started at 3001"));