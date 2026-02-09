import express, { Express } from "express";
import router from "./api/v1/routes";
import morgan from "morgan";

export const app: Express = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Use Express's built-in JSON parser middleware
app.use(express.json());

// Register the API router
app.use("/api/v1/", router)

export default app;
