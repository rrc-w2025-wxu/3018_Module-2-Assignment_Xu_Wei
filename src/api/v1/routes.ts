import express, { Router } from "express";
import { getAllItems, getItem, createItem, updateItem, deleteItem, itemsHealthCheck } from "./controllers";

const router: Router = express.Router();

router.get("/health", itemsHealthCheck);
router.get("/items", getAllItems);
router.get("/items/:id", getItem);
router.post("/tickets", createItem);
router.put("/tickets/:id", updateItem);
router.get("/items/:id", deleteItem);

export default router;