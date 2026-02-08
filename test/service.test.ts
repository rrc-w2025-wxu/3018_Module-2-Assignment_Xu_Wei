
import { getItem } from "../src/api/v1/services"; 

/**
 * Test suite for ticket urgency calculations.
 */
describe("Urgency Function Tests", () => {

    /**
     * Tests for GET /api/v1/tickets/:id/urgency functionality.
     * We test the service function getItem directly to verify urgencyScore and urgencyLevel.
     */
    describe("/api/v1/tickets/:id/urgency", () => {
        /**
         * Test urgency calculation for ticket with ID 5
         * This ticket has "high" priority and should calculate urgency accordingly.
         */
        it("calculates urgency for id is 5", () => {
            // Act
            const result = getItem(5);

            // Assert
            expect(result?.urgencyScore).toBe(75);
            expect(result?.urgencyLevel).toBe("High urgency. Prioritize resolution.");
        });

        /**
         * Test urgency calculation for ticket with ID 3
         * This ticket has "medium" priority.
         */
        it("calculates urgency for id is 3", () => {
            // Act
            const result = getItem(3);

            // Assert
            expect(result?.urgencyScore).toBe(50);
            expect(result?.urgencyLevel).toBe("Moderate. Schedule for attention.");
        });

        /**
         * Test urgency calculation for ticket with ID 1
         * This ticket has "low" priority.
         */
        it("calculates urgency for id is 1", () => {
            // Act
            const result = getItem(1);

            // Assert
            expect(result?.urgencyScore).toBe(25);
            expect(result?.urgencyLevel).toBe("Low urgency. Address when capacity allows.");
        });

        /**
         * Test urgency calculation for ticket with ID 7
         * This ticket is already "resolved", so urgency should be minimal.
         */
        it("calculates urgency for id is 7", () => {
            // Act
            const result = getItem(7);

            // Assert
            expect(result?.urgencyScore).toBe(0);
            expect(result?.urgencyLevel).toBe("Minimal. Ticket resolved.");
        });
    });
});