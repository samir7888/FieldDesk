// services/ticket.service.ts

import { tickets } from "../mock/tickets";
import type { ITicket } from "../types/type";
import { mockApi } from "./api";

export const ticketService = {
  async getAll() {
    return mockApi<ITicket[]>(tickets);
  },

  async getById(id: string) {
    const ticket = tickets.find((t) => t.id === id);

    return mockApi(ticket);
  },

  async create(ticket: ITicket) {
    tickets.push(ticket);

    return mockApi(ticket);
  },

  async update(id: string, updatedTicket: ITicket) {
    const index = tickets.findIndex((t) => t.id === id);

    tickets[index] = updatedTicket;

    return mockApi(updatedTicket);
  },

  async delete(id: string, orgId: string) {
    const organizationTickets = tickets.filter(
      (t) => t.organizationId === orgId
    );

    if (!organizationTickets) {
      throw new Error("Ticket not found");
    }
    const remainingTickets = organizationTickets.filter((t) => t.id !== id);

    return mockApi(remainingTickets);
  },

  async assign(id: string, userId: string) {
    const ticket = tickets.find((t) => t.id === id);

    if (ticket) {
      ticket.assignedTo = userId;
    }

    return mockApi(ticket);
  },
};
