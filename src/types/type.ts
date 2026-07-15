// types.ts

export type Role =
  | "SUPER_ADMIN"
  | "AUDITOR"
  | "ORG_ADMIN"
  | "TEAM_LEAD"
  | "AGENT";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface ITicket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  organizationId: string;
  assignedTo: string;
  createdBy: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  organizationId: string | null;
}
