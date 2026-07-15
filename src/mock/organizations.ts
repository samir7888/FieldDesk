
export interface IOrganization {
  id: string;
  name: string;
  shortName: string;
  address: string;
  active: boolean;
}

export const organizations: IOrganization[] = [
  {
    id: "org-1",
    name: "Himalayan Guardian Nepal",
    shortName: "HGN",
    address: "Kathmandu",
    active: true,
  },
  {
    id: "org-2",
    name: "Everest Bank",
    shortName: "EBL",
    address: "Lalitpur",
    active: true,
  },
  {
    id: "org-3",
    name: "ABC School",
    shortName: "ABC",
    address: "Pokhara",
    active: true,
  },
];
