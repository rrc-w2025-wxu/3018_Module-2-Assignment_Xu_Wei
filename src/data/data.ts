import { Ticket } from "src/interface_properties";

export const tickets : Ticket[] = [
  {
      id: 1,
      title: "Update footer copyright year",
      description: "Footer still shows 2024",
      priority: "low",
      status: "open",
      createdAt: new Date("2025-01-12T10:00:00.000Z"),
      ticketAge: 3,
      urgencyScore: 25,
      urgencyLevel: "Low urgency. Address when capacity allows."
  },
  {
      id: 2,
      title: "Profile picture upload slow",
      description: "Upload takes 30+ seconds",
      priority: "medium",
      status: "open",
      createdAt: new Date("2025-01-13T10:00:00.000Z"),
      ticketAge: 2,
      urgencyScore: 30,
      urgencyLevel: "Moderate. Schedule for attention."
  },
  {
      id: 3,
      title: "Dashboard loading slowly",
      description: "Dashboard takes 10+ seconds to load",
      priority: "medium",
      status: "open",
      createdAt: new Date("2025-01-09T10:00:00.000Z"),
      ticketAge: 6,
      urgencyScore: 50,
      urgencyLevel: "Moderate. Schedule for attention."
  },
  {
      id: 4,
      title: "Password reset email delayed",
      description: "Reset emails taking over 30 minutes",
      priority: "high",
      status: "open",
      createdAt: new Date("2025-01-10T10:00:00.000Z"),
      ticketAge: 5,
      urgencyScore: 55,
      urgencyLevel: "High urgency. Prioritize resolution."
  },
  {
      id: 5,
      title: "Export to PDF not working",
      description: "PDF export fails silently",
      priority: "high",
      status: "open",
      createdAt: new Date("2025-01-06T10:00:00.000Z"),
      ticketAge: 9,
      urgencyScore: 75,
      urgencyLevel: "High urgency. Prioritize resolution."
  },
  {
      id: 6,
      title: "Login page not loading",
      description: "Users report blank screen on login",
      priority: "critical",
      status: "open",
      createdAt: new Date("2025-01-09T10:00:00.000Z"),
      ticketAge: 6,
      urgencyScore: 80,
      urgencyLevel: "Critical. Immediate attention required."
  },
  {
      id: 7,
      title: "Dark mode toggle broken",
      description: "Dark mode doesn't persist after refresh",
      priority: "medium",
      status: "resolved",
      createdAt: new Date("2025-01-05T10:00:00.000Z"),
      ticketAge: 10,
      urgencyScore: 0,
      urgencyLevel: "Minimal. Ticket resolved."
  }
];
