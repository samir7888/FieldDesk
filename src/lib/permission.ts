import {
  permissionAPI,
  type TActions,
  type TResource,
} from "../mock/permissions";
import { tickets } from "../mock/tickets";
import { mockApi } from "../services/api";
import type { ITicket, IUser } from "../types/type";

export function can(
  user: IUser,
  resource: TResource,
  action: TActions
): boolean {
  return permissionAPI.hasPermission(user.role, resource, action);
}

export function cannot(user: IUser, resource: TResource, action: TActions) {
  return !can(user, resource, action);
}

export function canAccessTicket(user: IUser, ticket: ITicket) {
  if (user.role === "SUPER_ADMIN") return true;

  if (user.role === "AUDITOR") return true;

  if (user.organizationId !== ticket.organizationId) return false;

  if (user.role === "AGENT") return ticket.assignedTo === user.id;

  return true;
}

export function getVisibleTickets(user: IUser) {
  const visibleTickets = tickets.filter((ticket) =>
    canAccessTicket(user, ticket)
  );

  return mockApi(visibleTickets);
}
