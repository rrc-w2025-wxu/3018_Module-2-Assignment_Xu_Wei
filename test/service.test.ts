
import { getItem } from "../src/api/v1/services"; 

describe("Urgency Function Tests", () => {

    describe("/api/v1/tickets/1/urgency", () => {
        it("calculates urgency for id is 5", () => {
            // Act
            const result = getItem(5);

            // Assert
            expect(result?.urgencyScore).toBe(75);
            expect(result?.urgencyLevel).toBe("High urgency. Prioritize resolution.");
        });

        it("calculates percentageChange for < 10", () => {
            // Act
            const result = calculatePortfolioPerformance(10000, 10800);

            // Assert
            expect(result.percentageChange).toBe(8);
            expect(result.performanceSummary).toBe("Modest gain. Your portfolio is growing slowly.");
        });

        it("calculates percentageChange for < -10", () => {
            // Act
            const result = calculatePortfolioPerformance(10000, 7000);

            // Assert
            expect(result.percentageChange).toBe(-30);
            expect(result.performanceSummary).toBe("Significant loss. Review your portfolio strategy.");
        });
    });
});