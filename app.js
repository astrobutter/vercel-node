import express from "express";
import cors from "cors";
import { MockRoutes } from "./Routes/MockRoutes/MockRoutes.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Hello from Express app (shared for local & Vercel)!" });
});

app.get("/ping", (req, res) => res.send("pong"));

app.get("/hello", (req, res) => {
  const name = req.query.name || "friend";
  res.json({ message: `Hello, ${name}!` });
});

app.get("/data", (req, res) => {
  const sampleData = {
    users: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ],
  };
  res.json(sampleData);
});

app.use("/mock", MockRoutes);

app.listen(3000, () => console.log(`Local server on http://localhost:3000`));