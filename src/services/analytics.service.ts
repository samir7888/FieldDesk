import { tickets } from "../mock/tickets";
import { mockApi } from "./api";

export const analyticsService = {
  async getDashboard() {
    return mockApi({
      total: tickets.length,

      open: tickets.filter((t) => t.status === "OPEN").length,

      inProgress: tickets.filter((t) => t.status === "IN_PROGRESS").length,

      resolved: tickets.filter((t) => t.status === "RESOLVED").length,

      closed: tickets.filter((t) => t.status === "CLOSED").length,
    });
  },
};
