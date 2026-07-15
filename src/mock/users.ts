
import type { IUser } from "../types/type";



export const users: IUser[] = [
  {
    id: "u1",
    name: "Sameer Sharma",
    email: "superadmin@fielddesk.com",
    role: "SUPER_ADMIN",
    organizationId: null,
  },

  {
    id: "u2",
    name: "Sarah Auditor",
    email: "auditor@fielddesk.com",
    role: "AUDITOR",
    organizationId: null,
  },

  // HGN

  {
    id: "u3",
    name: "Hari Admin",
    email: "hari@hgn.com",
    role: "ORG_ADMIN",
    organizationId: "org-1",
  },

  {
    id: "u4",
    name: "Ram Lead",
    email: "ram@hgn.com",
    role: "TEAM_LEAD",
    organizationId: "org-1",
  },

  {
    id: "u5",
    name: "Sita Agent",
    email: "sita@hgn.com",
    role: "AGENT",
    organizationId: "org-1",
  },

  {
    id: "u6",
    name: "Krishna Agent",
    email: "krishna@hgn.com",
    role: "AGENT",
    organizationId: "org-1",
  },

  // Everest Bank

  {
    id: "u7",
    name: "Nabin Admin",
    email: "nabin@ebl.com",
    role: "ORG_ADMIN",
    organizationId: "org-2",
  },

  {
    id: "u8",
    name: "Anita Lead",
    email: "anita@ebl.com",
    role: "TEAM_LEAD",
    organizationId: "org-2",
  },

  {
    id: "u9",
    name: "Ramesh Agent",
    email: "ramesh@ebl.com",
    role: "AGENT",
    organizationId: "org-2",
  },

  // ABC School

  {
    id: "u10",
    name: "Dipesh Admin",
    email: "dipesh@abc.com",
    role: "ORG_ADMIN",
    organizationId: "org-3",
  },

  {
    id: "u11",
    name: "Mina Lead",
    email: "mina@abc.com",
    role: "TEAM_LEAD",
    organizationId: "org-3",
  },

  {
    id: "u12",
    name: "Aashish Agent",
    email: "aashish@abc.com",
    role: "AGENT",
    organizationId: "org-3",
  },
];
