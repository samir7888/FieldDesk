import { organizations, type IOrganization } from "@/mock/organizations";
import { users } from "@/mock/users";
import { tickets } from "@/mock/tickets";
import { type IUser, type ITicket } from "@/types/type";

// In-memory storage (in a real app, this would be API calls)
class MockDataService {
  private static organizationsStore: IOrganization[] = [...organizations];
  private static usersStore: IUser[] = [...users];
  private static ticketsStore: ITicket[] = [...tickets];

  // Organization CRUD operations
  static getOrganizations(): IOrganization[] {
    return [...this.organizationsStore];
  }

  static getOrganizationById(id: string): IOrganization | undefined {
    return this.organizationsStore.find((org) => org.id === id);
  }

  static createOrganization(orgData: Omit<IOrganization, "id">): IOrganization {
    const newOrg: IOrganization = {
      id: `org-${Date.now()}`,
      ...orgData,
    };
    this.organizationsStore.push(newOrg);
    return newOrg;
  }

  static updateOrganization(
    id: string,
    orgData: Partial<IOrganization>
  ): IOrganization | null {
    const index = this.organizationsStore.findIndex((org) => org.id === id);
    if (index === -1) return null;

    this.organizationsStore[index] = {
      ...this.organizationsStore[index],
      ...orgData,
    };
    return this.organizationsStore[index];
  }

  static deleteOrganization(id: string): boolean {
    const index = this.organizationsStore.findIndex((org) => org.id === id);
    if (index === -1) return false;

    // Also remove users and tickets associated with this organization
    this.usersStore = this.usersStore.filter(
      (user) => user.organizationId !== id
    );
    this.ticketsStore = this.ticketsStore.filter(
      (ticket) => ticket.organizationId !== id
    );

    this.organizationsStore.splice(index, 1);
    return true;
  }

  // User CRUD operations
  static getUsers(): IUser[] {
    return [...this.usersStore];
  }

  static getUserById(id: string): IUser | undefined {
    return this.usersStore.find((user) => user.id === id);
  }

  static getUsersByOrganization(organizationId: string): IUser[] {
    return this.usersStore.filter(
      (user) => user.organizationId === organizationId
    );
  }

  static createUser(userData: Omit<IUser, "id">): IUser {
    const newUser: IUser = {
      id: `u${Date.now()}`,
      ...userData,
    };
    this.usersStore.push(newUser);
    return newUser;
  }

  static updateUser(id: string, userData: Partial<IUser>): IUser | null {
    const index = this.usersStore.findIndex((user) => user.id === id);
    if (index === -1) return null;

    this.usersStore[index] = { ...this.usersStore[index], ...userData };
    return this.usersStore[index];
  }

  static deleteUser(id: string): boolean {
    const index = this.usersStore.findIndex((user) => user.id === id);
    if (index === -1) return false;

    // Update tickets where this user was assigned or created
    this.ticketsStore = this.ticketsStore.map((ticket) => ({
      ...ticket,
      assignedTo: ticket.assignedTo === id ? "" : ticket.assignedTo,
      // Note: We keep createdBy for audit purposes, but could handle differently
    }));

    this.usersStore.splice(index, 1);
    return true;
  }

  // Ticket CRUD operations
  static getTickets(): ITicket[] {
    return [...this.ticketsStore];
  }

  static getTicketById(id: string): ITicket | undefined {
    return this.ticketsStore.find((ticket) => ticket.id === id);
  }

  static getTicketsByOrganization(organizationId: string): ITicket[] {
    return this.ticketsStore.filter(
      (ticket) => ticket.organizationId === organizationId
    );
  }

  static getTicketsByUser(userId: string): ITicket[] {
    return this.ticketsStore.filter(
      (ticket) => ticket.assignedTo === userId || ticket.createdBy === userId
    );
  }

  static createTicket(ticketData: Omit<ITicket, "id">): ITicket {
    const newTicket: ITicket = {
      id: `t${Date.now()}`,
      ...ticketData,
    };
    this.ticketsStore.push(newTicket);
    return newTicket;
  }

  static updateTicket(
    id: string,
    ticketData: Partial<ITicket>
  ): ITicket | null {
    const index = this.ticketsStore.findIndex((ticket) => ticket.id === id);
    if (index === -1) return null;

    this.ticketsStore[index] = { ...this.ticketsStore[index], ...ticketData };
    return this.ticketsStore[index];
  }

  static deleteTicket(id: string): boolean {
    const index = this.ticketsStore.findIndex((ticket) => ticket.id === id);
    if (index === -1) return false;

    this.ticketsStore.splice(index, 1);
    return true;
  }

  // Utility methods for statistics and filters
  static getTicketStats(organizationId?: string) {
    const relevantTickets = organizationId
      ? this.getTicketsByOrganization(organizationId)
      : this.getTickets();

    return {
      total: relevantTickets.length,
      open: relevantTickets.filter((t) => t.status === "OPEN").length,
      inProgress: relevantTickets.filter((t) => t.status === "IN_PROGRESS")
        .length,
      resolved: relevantTickets.filter((t) => t.status === "RESOLVED").length,
      closed: relevantTickets.filter((t) => t.status === "CLOSED").length,
      urgent: relevantTickets.filter((t) => t.priority === "URGENT").length,
      high: relevantTickets.filter((t) => t.priority === "HIGH").length,
    };
  }

  // Reset to original mock data (useful for development/testing)
  static resetData(): void {
    this.organizationsStore = [...organizations];
    this.usersStore = [...users];
    this.ticketsStore = [...tickets];
  }
}

export default MockDataService;
