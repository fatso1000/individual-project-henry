import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { CORS_URL } from "./config";
import routesV1 from "./routes/v1";

process.on("uncaughtException", (e) => {
  console.error(e);
});

const app = express();

// EXPRESS CONFIG
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: CORS_URL, optionsSuccessStatus: 200 }));

// ROUTES
app.use("/v1", routesV1);

export default app;
