import type { Role } from "@/types/type";

export type TResource = "ticket" | "staff" | "organization" | "analytics";
export  type TActions = "view" | "create" | "edit" | "delete" | "assign" | "manage";
export interface IPermission {
  id: string;
  role: Role;
  resource: TResource;
  action: TActions;
  allowed: boolean;
}

// Available roles in the system
export const ROLES = [
  "SUPER_ADMIN",
  "AUDITOR",
  "ORG_ADMIN",
  "TEAM_LEAD",
  "AGENT",
] as const;

// Available resources and actions
export const RESOURCES = {
  ticket: ["view", "create", "edit", "assign", "delete"],
  staff: ["manage"],
  organization: ["view", "manage"],
  analytics: ["view"],
} as const;

// Mock permissions store - in real app this would be in database/API
let permissionsStore: IPermission[] = [
  // SUPER ADMIN - Full access
  {
    id: "1",
    role: "SUPER_ADMIN",
    resource: "ticket",
    action: "view",
    allowed: true,
  },
  {
    id: "2",
    role: "SUPER_ADMIN",
    resource: "ticket",
    action: "create",
    allowed: true,
  },
  {
    id: "3",
    role: "SUPER_ADMIN",
    resource: "ticket",
    action: "edit",
    allowed: true,
  },
  {
    id: "4",
    role: "SUPER_ADMIN",
    resource: "ticket",
    action: "delete",
    allowed: true,
  },
  {
    id: "5",
    role: "SUPER_ADMIN",
    resource: "ticket",
    action: "assign",
    allowed: true,
  },
  {
    id: "6",
    role: "SUPER_ADMIN",
    resource: "staff",
    action: "manage",
    allowed: true,
  },
  {
    id: "7",
    role: "SUPER_ADMIN",
    resource: "organization",
    action: "view",
    allowed: true,
  },
  {
    id: "8",
    role: "SUPER_ADMIN",
    resource: "organization",
    action: "manage",
    allowed: true,
  },
  {
    id: "9",
    role: "SUPER_ADMIN",
    resource: "analytics",
    action: "view",
    allowed: true,
  },

  // AUDITOR - Read-only access
  {
    id: "10",
    role: "AUDITOR",
    resource: "ticket",
    action: "view",
    allowed: true,
  },
  {
    id: "11",
    role: "AUDITOR",
    resource: "ticket",
    action: "create",
    allowed: false,
  },
  {
    id: "12",
    role: "AUDITOR",
    resource: "ticket",
    action: "edit",
    allowed: false,
  },
  {
    id: "13",
    role: "AUDITOR",
    resource: "ticket",
    action: "delete",
    allowed: false,
  },
  {
    id: "14",
    role: "AUDITOR",
    resource: "ticket",
    action: "assign",
    allowed: false,
  },
  {
    id: "15",
    role: "AUDITOR",
    resource: "staff",
    action: "manage",
    allowed: false,
  },
  {
    id: "16",
    role: "AUDITOR",
    resource: "organization",
    action: "view",
    allowed: true,
  },
  {
    id: "17",
    role: "AUDITOR",
    resource: "organization",
    action: "manage",
    allowed: false,
  },
  {
    id: "18",
    role: "AUDITOR",
    resource: "analytics",
    action: "view",
    allowed: true,
  },

  // ORG_ADMIN - Organization management + tickets
  {
    id: "19",
    role: "ORG_ADMIN",
    resource: "ticket",
    action: "view",
    allowed: true,
  },
  {
    id: "20",
    role: "ORG_ADMIN",
    resource: "ticket",
    action: "create",
    allowed: true,
  },
  {
    id: "21",
    role: "ORG_ADMIN",
    resource: "ticket",
    action: "edit",
    allowed: true,
  },
  {
    id: "22",
    role: "ORG_ADMIN",
    resource: "ticket",
    action: "delete",
    allowed: true,
  },
  {
    id: "23",
    role: "ORG_ADMIN",
    resource: "ticket",
    action: "assign",
    allowed: true,
  },
  {
    id: "24",
    role: "ORG_ADMIN",
    resource: "staff",
    action: "manage",
    allowed: true,
  },
  {
    id: "25",
    role: "ORG_ADMIN",
    resource: "organization",
    action: "view",
    allowed: true,
  },
  {
    id: "26",
    role: "ORG_ADMIN",
    resource: "organization",
    action: "manage",
    allowed: true,
  },
  {
    id: "27",
    role: "ORG_ADMIN",
    resource: "analytics",
    action: "view",
    allowed: true,
  },

  // TEAM_LEAD - Team management + limited tickets
  {
    id: "28",
    role: "TEAM_LEAD",
    resource: "ticket",
    action: "view",
    allowed: true,
  },
  {
    id: "29",
    role: "TEAM_LEAD",
    resource: "ticket",
    action: "create",
    allowed: true,
  },
  {
    id: "30",
    role: "TEAM_LEAD",
    resource: "ticket",
    action: "edit",
    allowed: true,
  },
  {
    id: "31",
    role: "TEAM_LEAD",
    resource: "ticket",
    action: "delete",
    allowed: false,
  },
  {
    id: "32",
    role: "TEAM_LEAD",
    resource: "ticket",
    action: "assign",
    allowed: true,
  },
  {
    id: "33",
    role: "TEAM_LEAD",
    resource: "staff",
    action: "manage",
    allowed: false,
  },
  {
    id: "34",
    role: "TEAM_LEAD",
    resource: "organization",
    action: "view",
    allowed: true,
  },
  {
    id: "35",
    role: "TEAM_LEAD",
    resource: "organization",
    action: "manage",
    allowed: false,
  },
  {
    id: "36",
    role: "TEAM_LEAD",
    resource: "analytics",
    action: "view",
    allowed: true,
  },

  // AGENT - Basic ticket operations
  {
    id: "37",
    role: "AGENT",
    resource: "ticket",
    action: "view",
    allowed: true,
  },
  {
    id: "38",
    role: "AGENT",
    resource: "ticket",
    action: "create",
    allowed: true,
  },
  {
    id: "39",
    role: "AGENT",
    resource: "ticket",
    action: "edit",
    allowed: true,
  },
  {
    id: "40",
    role: "AGENT",
    resource: "ticket",
    action: "delete",
    allowed: false,
  },
  {
    id: "41",
    role: "AGENT",
    resource: "ticket",
    action: "assign",
    allowed: false,
  },
  {
    id: "42",
    role: "AGENT",
    resource: "staff",
    action: "manage",
    allowed: false,
  },
  {
    id: "43",
    role: "AGENT",
    resource: "organization",
    action: "view",
    allowed: false,
  },
  {
    id: "44",
    role: "AGENT",
    resource: "organization",
    action: "manage",
    allowed: false,
  },
  {
    id: "45",
    role: "AGENT",
    resource: "analytics",
    action: "view",
    allowed: false,
  },
];

// API functions to manage permissions
export const permissionAPI = {
  // Get all permissions
  getAllPermissions: (): IPermission[] => {
    return [...permissionsStore];
  },

  // Get permissions by role
  getPermissionsByRole: (role: string): IPermission[] => {
    return permissionsStore.filter((p) => p.role === role);
  },

  // Update a permission
  updatePermission: (id: string, allowed: boolean): Promise<IPermission> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = permissionsStore.findIndex((p) => p.id === id);
        if (index !== -1) {
          permissionsStore[index] = { ...permissionsStore[index], allowed };
          resolve(permissionsStore[index]);

          // Trigger permission change event for immediate effect
          window.dispatchEvent(
            new CustomEvent("permissionsChanged", {
              detail: { updatedPermission: permissionsStore[index] },
            })
          );
        }
      }, 100); // Simulate API delay
    });
  },

  // Get permission for specific role/resource/action
  hasPermission: (role: string, resource: string, action: string): boolean => {
    const permission = permissionsStore.find(
      (p) => p.role === role && p.resource === resource && p.action === action
    );
    return permission?.allowed ?? false;
  },
};

// Export for backwards compatibility
export const permissions = permissionsStore;
