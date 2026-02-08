import express, { Router } from "express";
import { getAllItems, getItem, createItem, updateItem, deleteItem, itemsHealthCheck } from "./controllers";

const router: Router = express.Router();

router.get("/health", itemsHealthCheck);
router.get("/tickets", getAllItems);
router.get("/tickets/:id/urgency", getItem);
router.post("/tickets", createItem);
router.put("/tickets/:id", updateItem);
router.delete("/tickets/:id", deleteItem);

export default router;