/**
 * Represents the response structure for the Health Check API.
 */

export interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

export type Priority = "low" | "medium" | "high" | "critical";

export enum PriorityEnum {
    low = 10,
    medium = 20,
    high = 30,
    critical = 50
}

export type Status = "open" | "resolved";

export interface Ticket {
    id : number;
    title : string;
    description : string;
    priority : Priority;
    status : Status;
    createdAt : Date;
    ticketAge : number;
    urgencyScore: number;
    urgencyLevel : string;
}