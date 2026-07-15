import type { ITicket } from "../types/type";


export const tickets: ITicket[] = [
  {
    id: "t1",
    title: "Printer not working",
    description: "Office printer is offline.",
    status: "OPEN",
    priority: "HIGH",
    organizationId: "org-1",
    assignedTo: "u5",
    createdBy: "u3",
  },

  {
    id: "t2",
    title: "Website down",
    description: "Homepage returns 500.",
    status: "IN_PROGRESS",
    priority: "URGENT",
    organizationId: "org-1",
    assignedTo: "u6",
    createdBy: "u4",
  },

  {
    id: "t3",
    title: "Email issue",
    description: "Cannot receive emails.",
    status: "RESOLVED",
    priority: "MEDIUM",
    organizationId: "org-1",
    assignedTo: "u5",
    createdBy: "u3",
  },

  {
    id: "t4",
    title: "ATM Cash Error",
    description: "Cash dispenser failed.",
    status: "OPEN",
    priority: "URGENT",
    organizationId: "org-2",
    assignedTo: "u9",
    createdBy: "u7",
  },

  {
    id: "t5",
    title: "Mobile Banking Bug",
    description: "OTP not received.",
    status: "OPEN",
    priority: "HIGH",
    organizationId: "org-2",
    assignedTo: "u9",
    createdBy: "u8",
  },

  {
    id: "t6",
    title: "Admission Portal Crash",
    description: "Students cannot login.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    organizationId: "org-3",
    assignedTo: "u12",
    createdBy: "u10",
  },

  {
    id: "t7",
    title: "Projector not working",
    description: "Classroom projector is dead.",
    status: "CLOSED",
    priority: "LOW",
    organizationId: "org-3",
    assignedTo: "u12",
    createdBy: "u11",
  },
];
