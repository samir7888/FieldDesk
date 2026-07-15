// services/organization.service.ts

import { organizations, type IOrganization } from "../mock/organizations";
import { mockApi } from "./api";

export const organizationService = {

  async getAll() {

    return mockApi<IOrganization[]>(organizations);

  },

  async getById(id: string) {

    return mockApi<IOrganization | undefined>(
      organizations.find((o) => o.id === id)
    );

  }

};