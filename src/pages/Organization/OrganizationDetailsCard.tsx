import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { users } from "../../mock/users";
import { tickets } from "../../mock/tickets";
import { organizations } from "../../mock/organizations";
import { useSessionStore } from "../../stores/session.store";
import type { IOrganization } from "../../mock/organizations";

interface OrganizationStats {
  totalUsers: number;
  activeTickets: number;
  resolvedTickets: number;
  totalTickets: number;
  resolutionRate: number;
}

export const OrganizationDetailsCard = () => {
  const { currentUser } = useSessionStore();
  const [organizationDetails, setOrganizationDetails] =
    useState<IOrganization | null>(null);
  const [stats, setStats] = useState<OrganizationStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.organizationId) return;

    // Get organization details
    const orgDetails = organizations.find(
      (org) => org.id === currentUser.organizationId
    );

    // Calculate organization statistics
    const orgUsers = users.filter(
      (user) => user.organizationId === currentUser.organizationId
    );
    const orgTickets = tickets.filter(
      (ticket) => ticket.organizationId === currentUser.organizationId
    );

    const activeTickets = orgTickets.filter(
      (ticket) => ticket.status === "OPEN" || ticket.status === "IN_PROGRESS"
    ).length;

    const resolvedTickets = orgTickets.filter(
      (ticket) => ticket.status === "RESOLVED" || ticket.status === "CLOSED"
    ).length;

    const resolutionRate =
      orgTickets.length > 0
        ? Math.round((resolvedTickets / orgTickets.length) * 100)
        : 0;

    const calculatedStats: OrganizationStats = {
      totalUsers: orgUsers.length,
      activeTickets,
      resolvedTickets,
      totalTickets: orgTickets.length,
      resolutionRate,
    };

    setTimeout(() => {
      setOrganizationDetails(orgDetails || null);
      setStats(calculatedStats);
      setLoading(false);
    }, 300);
  }, [currentUser]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!organizationDetails || !stats) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8 text-gray-500">
            Organization details not available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Organization Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{organizationDetails.name}</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                organizationDetails.active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {organizationDetails.active ? "Active" : "Inactive"}
            </span>
          </CardTitle>
          <CardDescription>
            {organizationDetails.shortName} • {organizationDetails.address}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-blue-600">
              {stats.totalUsers}
            </div>
            <p className="text-sm text-gray-600">Active Members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Tickets
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-orange-600">
              {stats.activeTickets}
            </div>
            <p className="text-sm text-gray-600">Open & In Progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Tickets
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-purple-600">
              {stats.totalTickets}
            </div>
            <p className="text-sm text-gray-600">All Time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Resolution Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-green-600">
              {stats.resolutionRate}%
            </div>
            <p className="text-sm text-gray-600">Team Performance</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
