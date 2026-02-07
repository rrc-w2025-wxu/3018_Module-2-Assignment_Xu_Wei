import express, { Express } from "express";
import router from "./api/v1/routes";
import morgan from "morgan";

export const app: Express = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.use(express.json());

app.use("/api/v1/", router)

export default app;
