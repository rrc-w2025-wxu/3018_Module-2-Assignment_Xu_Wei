
import { getItem } from "../src/api/v1/services"; 

describe("Urgency Function Tests", () => {

    describe("/api/v1/tickets/:id/urgency", () => {
        it("calculates urgency for id is 5", () => {
            // Act
            const result = getItem(5);

            // Assert
            expect(result?.urgencyScore).toBe(75);
            expect(result?.urgencyLevel).toBe("High urgency. Prioritize resolution.");
        });

        it("calculates urgency for id is 3", () => {
            // Act
            const result = getItem(3);

            // Assert
            expect(result?.urgencyScore).toBe(50);
            expect(result?.urgencyLevel).toBe("Moderate. Schedule for attention.");
        });
    });
});