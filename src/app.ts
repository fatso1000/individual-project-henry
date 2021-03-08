import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { CORS_URL } from "./config";
import routesV1 from "./routes/v1";

process.on("uncaughtException", (e) => {
  console.error(e);
});

const app = express();

// Add the following code to your Server.js (server) file. 
// This tells the server to look for a build of the react app.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/", (req, resp) => {
    resp.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

// EXPRESS CONFIG
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: CORS_URL, optionsSuccessStatus: 200 }));

// ROUTES
app.use("/api/v1", routesV1);

export default app;
