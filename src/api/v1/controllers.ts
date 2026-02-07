
import { HealthCheckResponse } from "src/interface_properties";
import { Request, Response } from "express";
import * as itemService from "./service/itemService";

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
    res.send(healthCheck);
}

export const getAllItems = (req: Request, res: Response): void => {
    const items: string[] = itemService.getAllItems();
    const count: number = items.length;
    res.status(200).json({ message: "Tickets retrieved", count, data: items });
}

export const getItem = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const item: string[] = itemService.getItem(id);
    res.status(200).json({ message: "Tickets urgency calculated", data: item });
}

export const createItem = (req: Request, res: Response): void => {
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;

    if (!title){
        return res.status(400).json({ message: "Missing required field: title" });
    }

    if  (!description){
        return res.status(400).json({ message: "Missing required field: description" });
    }

    if (!Object.values(PriorityEnum)
      .filter(v => typeof v === "number")
      .includes(priority)) {

        return res.status(400).json({
            message: "Invalid priority"
        });
    }
    const item: string[] = itemService.createItem(title, description, priority);
    res.status(200).json({ message: "Tickets urgency calculated", data: item });
}

export const updateItem = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const item: string[] = itemService.getItem(id);
    res.status(200).json({ message: "Tickets urgency calculated", data: item });
}

export const deleteItem = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const item: string[] = itemService.getItem(id);
    res.status(200).json({ message: "Tickets urgency calculated", data: item });
}