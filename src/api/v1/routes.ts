import express, { Router } from "express";
import { getAllItems, getItem, itemsHealthCheck } from "./controllers";

const router: Router = express.Router();

router.get("/health", itemsHealthCheck);
router.get("/items", getAllItems);
router.get("/items:id", getItem);

export default router;