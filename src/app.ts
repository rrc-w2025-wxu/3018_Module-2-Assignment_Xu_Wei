import express, { Express } from "express";
import router from "./api/v1/routes";

export const app: Express = express();

app.use(express.json);

app.use("src/api/v1/", router)

export default app;
