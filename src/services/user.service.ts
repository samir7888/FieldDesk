// services/user.service.ts

import { users } from "../mock/users";
import type { IUser } from "../types/type";
import { mockApi } from "./api";

export const userService = {
  async getAll() {
    return mockApi<IUser[]>(users);
  },

  async getById(id: string) {
    return mockApi<IUser | undefined>(users.find((u) => u.id === id));
  },

  async getByOrganization(orgId: string) {
    return mockApi<IUser[]>(users.filter((u) => u.organizationId === orgId));
  },

  async deleteUserById(userid: string, orgId: string) {
    const getOrganizationUsers = await this.getByOrganization(orgId);
    if (!getOrganizationUsers) return;
    return mockApi<IUser[]>(
      getOrganizationUsers.filter((u) => u.id !== userid)
    );
  },

  async createUser(userData: Omit<IUser, "id">, orgId: string) {
    const newUserData = {
      ...userData,
      organizationId: orgId,
      id: `u${users.length + 1}`,
    };
    const getOrganizationUsers = await this.getByOrganization(orgId);
    if (!getOrganizationUsers) return;
    return mockApi<IUser[]>([...getOrganizationUsers, newUserData]);
  },

  async updateUserById(
    userid: string,
    updatedData: Partial<IUser>,
    orgId: string
  ) {
    return mockApi<IUser[]>(
      users.map((u) =>
        u.id === userid ? { ...u, organizationId: orgId, ...updatedData } : u
      )
    );
  },
};
