import serverless from "serverless-http";
import app from "../app.js";

// Export a serverless handler for Vercel
export const handler = serverless(app);
export default handler;
