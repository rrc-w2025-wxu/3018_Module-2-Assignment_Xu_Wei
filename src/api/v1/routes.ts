import express, { Router } from "express";
import { getAllItems, getItem, createItem, updateItem, deleteItem, itemsHealthCheck } from "./controllers";

// Create a new router instance
const router: Router = express.Router();

// Health check endpoint
router.get("/health", itemsHealthCheck);

// Get all tickets
router.get("/tickets", getAllItems);

// Get a ticket's urgency by ID
router.get("/tickets/:id/urgency", getItem);

// Create a new ticket
router.post("/tickets", createItem);

// Update an existing ticket by ID
router.put("/tickets/:id", updateItem);

// Delete a ticket by ID
router.delete("/tickets/:id", deleteItem);

export default router;