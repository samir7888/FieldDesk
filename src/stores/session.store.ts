import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "../types/type";
import { organizations, type IOrganization } from "../mock/organizations";
import { users } from "../mock/users";

interface SessionState {
  currentUser: IUser | null;

  selectedOrganization: IOrganization | null;

  login: (userId: string) => void;

  logout: () => void;

  switchUser: (userId: string) => void;

  switchOrganization: (organizationId: string) => void;
}

export const useSessionStore = create(
  persist<SessionState>(
    (set, get) => ({
      currentUser: null,

      selectedOrganization: null,

      login: (userId) => {
        const user = users.find((u) => u.id === userId);

        if (!user) return;

        let organization = null;

        if (user.organizationId) {
          organization =
            organizations.find((org) => org.id === user.organizationId) ?? null;
        }

        set({
          currentUser: user,
          selectedOrganization: organization,
        });
      },

      logout: () =>
        set({
          currentUser: null,
          selectedOrganization: null,
        }),

      switchUser: (userId) => {
        get().login(userId);
      },

      switchOrganization: (organizationId) => {
        const { currentUser } = get();

        if (!currentUser) return;

        // only platform users can switch organizations
        if (
          currentUser.role !== "SUPER_ADMIN" &&
          currentUser.role !== "AUDITOR"
        ) {
          return;
        }

        const organization =
          organizations.find((org) => org.id === organizationId) ?? null;

        set({
          selectedOrganization: organization,
        });
      },
    }),
    {
      name: "fielddesk-session",
    },
  ),
);
