
import { HealthCheckResponse } from "../../interface_properties";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/httpConstants";
import * as itemService from "./services";

/**
 * Check the health status of the service.
 *
 * GET /api/v1/health
 *
 * @param req - Express Request
 * @param res - Express Response
 */
export const itemsHealthCheck = (req: Request, res: Response): void => {
    const healthCheck:HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };
    res.json(healthCheck);
}

/**
 * Get all tickets.
 *
 * GET /api/v1/tickets
 *
 * @param req - Express Request
 * @param res - Express Response
 */
export const getAllItems = (req: Request, res: Response): void => {
    const items = itemService.getAllItems();
    const count: number = items.length;
    res.status(HTTP_STATUS.OK).json({ message: "Tickets retrieved", count, data: items });
}

/**
 * Show a single ticket and calculate its urgency.
 *
 * GET /api/v1/tickets/:id/urgency
 *
 * @param req - Express Request
 * @param res - Express Response
 */
export const getItem = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const item = itemService.getItem(id);

    if (item){
        // If ticket exists, return it with urgency information
        res.status(HTTP_STATUS.OK).json({ message: "Tickets urgency calculated", data: item });
    }
    else{
        // If ticket not found, return 404
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
    } 
}

/**
 * Create a new ticket.
 *
 * POST /api/v1/tickets
 *
 * @param req - Express Request
 * @param res - Express Response
 */
export const createItem = (req: Request, res: Response) => {
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;

    // Validate required fields
    if (!title){
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: title" });
    }

    if  (!description){
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: description" });
    }

    // Validate priority value
    if (!["critical", "high", "medium", "low"].includes(priority)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid priority. Must be one of: critical, high, medium, low"
        });
    }

    // Create ticket via service
    const item = itemService.createItem(title, description, priority);
    res.status(HTTP_STATUS.CREATED).json({ message: "Ticket created", data: item });
}

/**
 * Update an existing ticket's priority or status.
 *
 * PUT /api/v1/tickets/:id
 *
 * @param req - Express Request
 * @param res - Express Response
 */
export const updateItem = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const priority = req.body.priority;
    const status = req.body.status;

    // Validate priority if provided
    if (!["critical", "high", "medium", "low"].includes(priority)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid priority. Must be one of: critical, high, medium, low"
        });
    }

    // Validate status if provided
    if (!status){
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid status. Must be one of: open, in-progress, resolved"
        });
    }

    // Update ticket via service
    const result = itemService.updateItem(id,priority,status);
    res.status(HTTP_STATUS.OK).json({ message: "Item updated", data:result });
}

/**
 * Delete a ticket by ID.
 *
 * DELETE /api/v1/tickets/:id
 *
 * @param req - Express Request
 * @param res - Express Response
 */
export const deleteItem = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    itemService.deleteItem(id);
    res.status(HTTP_STATUS.OK).json({ message: "Item deleted" });
}