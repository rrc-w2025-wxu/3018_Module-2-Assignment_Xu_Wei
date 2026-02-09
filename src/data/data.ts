import { Tickets } from "src/interface_properties";

/**
 * Sample ticket data used for testing or development.
 *
 * Each ticket contains:
 * - id: Unique identifier for the ticket
 * - title: Short summary of the issue
 * - description: Detailed description of the issue
 * - priority: Ticket priority level ("low", "medium", "high", "critical")
 * - status: Current status of the ticket ("open", "resolved", etc.)
 * - createdAt: Date when the ticket was created
 * - currentTime: Reference time used to calculate ticket age
 *
 * Note: ticketAge can be calculated as the difference between currentTime and createdAt.
 */

export const tickets: Tickets[] = [
  {
    id: 1,
    title: "Update footer copyright year",
    description: "Footer still shows 2024",
    priority: "low",
    status: "open",
    createdAt: new Date("2025-01-12T10:00:00.000Z"),
    currentTime: new Date("2025-01-15T10:00:00.000Z") 
  },
  {
    id: 2,
    title: "Profile picture upload slow",
    description: "Upload takes 30+ seconds",
    priority: "medium",
    status: "open",
    createdAt: new Date("2025-01-13T10:00:00.000Z"),
    currentTime: new Date("2025-01-15T10:00:00.000Z")
  },
  {
    id: 3,
    title: "Dashboard loading slowly",
    description: "Dashboard takes 10+ seconds to load",
    priority: "medium",
    status: "open",
    createdAt: new Date("2025-01-09T10:00:00.000Z"),
    currentTime: new Date("2025-01-15T10:00:00.000Z")
  },
  {
    id: 4,
    title: "Password reset email delayed",
    description: "Reset emails taking over 30 minutes",
    priority: "high",
    status: "open",
    createdAt: new Date("2025-01-10T10:00:00.000Z"),
    currentTime: new Date("2025-01-15T10:00:00.000Z")
  },
  {
    id: 5,
    title: "Export to PDF not working",
    description: "PDF export fails silently",
    priority: "high",
    status: "open",
    createdAt: new Date("2025-01-06T10:00:00.000Z"),
    currentTime: new Date("2025-01-15T10:00:00.000Z")
  },
  {
    id: 6,
    title: "Login page not loading",
    description: "Users report blank screen on login",
    priority: "critical",
    status: "open",
    createdAt: new Date("2025-01-09T10:00:00.000Z"),
    currentTime: new Date("2025-01-15T10:00:00.000Z")
  },
  {
    id: 7,
    title: "Dark mode toggle broken",
    description: "Dark mode doesn't persist after refresh",
    priority: "medium",
    status: "resolved",
    createdAt: new Date("2025-01-05T10:00:00.000Z"),
    currentTime: new Date("2025-01-15T10:00:00.000Z")
  }
];
