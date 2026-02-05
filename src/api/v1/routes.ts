import express, { Router } from "express";
import { getAllItems, getItem, updateItem, deleteItem, itemsHealthCheck } from "./controllers";

const router: Router = express.Router();

router.get("/health", itemsHealthCheck);
router.get("/items", getAllItems);
router.get("/items:id", getItem);
router.get("/items:id", updateItem);
router.get("/items:id", deleteItem);

export default router;