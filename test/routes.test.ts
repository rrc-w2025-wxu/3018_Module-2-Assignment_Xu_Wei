import request, { Response } from "supertest";
import { app } from "../src/app";

describe("Basic Route Tests", () => {

    describe("GET /api/v1/health", () => {
        it("should return a valid health check response", async () => {
            // Act
            const response: Response = await request(app).get("/api/v1/health");

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                status: "OK",
                uptime: expect.any(Number),
                timestamp: expect.any(String),
                version: "1.0.0",
            });
        });
    });

    describe("GET /api/v1/tickets", () => {
        it("Get all tickets returns array with correct structure", async () => {
            const response: Response = await request(app).get("/api/v1/tickets");

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);

            // Each ticket must have these fields checked.
            response.body.data.forEach((ticket: any) => {
            expect(ticket).toEqual(
                expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
                description: expect.any(String),
                priority: expect.any(String),
                status: expect.any(String),
                createdAt: expect.any(String)
                })
              );
            });
          });
        });

    describe("GET /api/v1/tickets/:id/urgency", () => {
        it("Ticket with urgency, 200 returned", async () => {
            // Act
            const response: Response = await request(app)
                .get("/api/v1/tickets/5/urgency");

            // Assert
            expect(response.body).toEqual(
                {
                    "message": "Tickets urgency calculated",
                    "data": {
                        "id": 5,
                        "title": "Export to PDF not working",
                        "description": "PDF export fails silently",
                        "priority": "high",
                        "status": "open",
                        "createdAt": "2025-01-06T10:00:00.000Z",
                        "ticketAge": 9,
                        "urgencyScore": 75,
                        "urgencyLevel": "High urgency. Prioritize resolution."
                    }
                }
            );
        });
    });

    describe("POST /api/v1/tickets", () => {
        it("Create a new ticket, 200 returned", async () => {
            // Arrange
            const newTicket = {
                title: "Export to PDF not working",
                description: "PDF export fails silently",
                priority: "high"
            };
            
            // Act
            const response: Response = await request(app)
                .post("/api/v1/tickets")
                .send(newTicket)
                .set("Accept", "application/json");

            // Assert
            // Assert
            expect(response.status).toBe(201); // POST 成功返回 CREATED
            expect(response.body).toEqual(
            expect.objectContaining({
                message: "Ticket created",
                data: expect.objectContaining({
                id: expect.any(Number),
                title: "Export to PDF not working",
                description: "PDF export fails silently",
                priority: "high",
                status: "open",
                createdAt: expect.any(String),
                })
              })
            );
        });
    });

    describe("PUT /api/v1/tickets/:id", () => {
        it("Update ticket, 200 returned", async () => {
            // Arrange
            const updateTicket = {
                "priority": "high",
                "status":"open"
            };
            
            // Act
            const response: Response = await request(app)
                .put("/api/v1/tickets/1")
                .send(updateTicket)
                .set("Accept", "application/json");

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
            expect.objectContaining({
                message: "Item updated",
                data: expect.objectContaining({
                id: 1,
                title: expect.any(String),
                description: expect.any(String),
                priority: "high",   
                status: "open",
                createdAt: expect.any(String)
                })
              })
            );
        });
    });

    describe("DELETE /api/v1/tickets/:id", () => {
        it("Delete ticket, 200 returned", async () => {            
            // Act
            const response: Response = await request(app)
                .delete("/api/v1/tickets/1");

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
            expect.objectContaining({
                message: "Item deleted"
              })
            );

            // Check
            const responseCheck: Response = await request(app)
                .get("/api/v1/tickets/1");
            
            expect(responseCheck.status).toBe(404);
            expect(responseCheck.body).toEqual(
                { message: "Ticket not found" }
            );
        });
    });


});