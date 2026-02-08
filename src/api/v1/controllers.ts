
import { HealthCheckResponse } from "../../interface_properties";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/httpConstants";
import * as itemService from "./services";

/**
 * Portfolio performance API handler.
 *
 * Check the health status of the returned service.
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

export const getAllItems = (req: Request, res: Response): void => {
    const items = itemService.getAllItems();
    const count: number = items.length;
    res.status(HTTP_STATUS.OK).json({ message: "Tickets retrieved", count, data: items });
}

export const getItem = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const item = itemService.getItem(id);

    if (item){
        res.status(HTTP_STATUS.OK).json({ message: "Tickets urgency calculated", data: item });
    }
    else{
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
    } 
}

export const createItem = (req: Request, res: Response) => {
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;

    if (!title){
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: title" });
    }

    if  (!description){
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: description" });
    }

    if (!["critical", "high", "medium", "low"].includes(priority)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid priority. Must be one of: critical, high, medium, low"
        });
    }
        const item = itemService.createItem(title, description, priority);
        res.status(HTTP_STATUS.CREATED).json({ message: "Ticket created", data: item });
    }

export const updateItem = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const priority = req.body.priority;
    const status = req.body.status;

    if (!["critical", "high", "medium", "low"].includes(priority)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid priority. Must be one of: critical, high, medium, low"
        });
    }

    if (!status){
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid status. Must be one of: open, in-progress, resolved"
        });
    }
    const result = itemService.updateItem(id,priority,status);
    res.status(HTTP_STATUS.OK).json({ message: "Item updated", data:result });
}

export const deleteItem = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    itemService.deleteItem(id);
    res.status(HTTP_STATUS.OK).json({ message: "Item deleted" });
}