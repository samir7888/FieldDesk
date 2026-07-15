import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { organizations } from "../../mock/organizations";
import { users } from "../../mock/users";
import { tickets } from "../../mock/tickets";
import { useState } from "react";
import { can } from "../../lib/permission";
import { useSession } from "../../hooks/useSesstion";

export const OrganizationDetailsPage = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useSession();
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const organization = organizations.find((org) => org.id === orgId);
  const orgUsers = users.filter((user) => user.organizationId === orgId);
  const orgTickets = tickets.filter(
    (ticket) => ticket.organizationId === orgId
  );
  console.log(
    currentUser,
    currentUser ? can(currentUser, "staff", "manage") : false,
    "de"
  );

  if (!organization) {
    return (
      <div className="px-4 py-6">
        <Card>
          <CardContent className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900">
              Organization Not Found
            </h3>
            <p className="text-gray-600 mt-2">
              The requested organization does not exist.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getOrgStats = () => {
    const openTickets = orgTickets.filter((ticket) => ticket.status === "OPEN");
    const inProgressTickets = orgTickets.filter(
      (ticket) => ticket.status === "IN_PROGRESS"
    );
    const resolvedTickets = orgTickets.filter(
      (ticket) => ticket.status === "RESOLVED"
    );
    const closedTickets = orgTickets.filter(
      (ticket) => ticket.status === "CLOSED"
    );

    return {
      totalUsers: orgUsers.length,
      totalTickets: orgTickets.length,
      openTickets: openTickets.length,
      inProgressTickets: inProgressTickets.length,
      resolvedTickets: resolvedTickets.length,
      closedTickets: closedTickets.length,
      admins: orgUsers.filter((u) => u.role === "ORG_ADMIN").length,
      teamLeads: orgUsers.filter((u) => u.role === "TEAM_LEAD").length,
      agents: orgUsers.filter((u) => u.role === "AGENT").length,
    };
  };

  const stats = getOrgStats();

  const handleUserAction = (action: string, userId: string) => {
    console.log(`${action} user: ${userId}`);
    // Placeholder for user management actions
    if (action === "edit") {
      setEditingUser(userId);
    } else {
      setEditingUser(null);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ORG_ADMIN":
        return "bg-blue-100 text-blue-800";
      case "TEAM_LEAD":
        return "bg-green-100 text-green-800";
      case "AGENT":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUsersByRole = (role: string) => {
    return orgUsers.filter((user) => user.role === role);
  };

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {organization.name}
          </h1>
          <p className="text-gray-600">({organization.shortName})</p>
        </div>
        <div className="text-right">
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              organization.active
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {organization.active ? "Active" : "Inactive"}
          </div>
        </div>
      </div>

      {/* Organization Info Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🏢</span> Organization Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900">Full Name</h4>
              <p className="text-gray-600">{organization.name}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Short Name</h4>
              <p className="text-gray-600">{organization.shortName}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Address</h4>
              <p className="text-gray-600">{organization.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalUsers}
            </div>
            <div className="text-sm text-gray-600">Total Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {stats.totalTickets}
            </div>
            <div className="text-sm text-gray-600">Total Tickets</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {stats.openTickets}
            </div>
            <div className="text-sm text-gray-600">Open Tickets</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {stats.inProgressTickets}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span>👥</span> User Management
            </span>
            <span className="text-sm text-gray-500">
              {currentUser && can(currentUser, "staff", "manage")
                ? "Management View"
                : "Read-Only View"}
            </span>
          </CardTitle>
          <CardDescription>
            {currentUser && can(currentUser, "staff", "manage")
              ? "Manage users, roles, and permissions for this organization."
              : "View user information and roles (Auditor permissions)."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* User Role Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {stats.admins}
              </div>
              <div className="text-sm text-gray-600">Organization Admins</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {stats.teamLeads}
              </div>
              <div className="text-sm text-gray-600">Team Leads</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {stats.agents}
              </div>
              <div className="text-sm text-gray-600">Agents</div>
            </div>
          </div>

          {/* Users by Role */}
          <div className="space-y-6">
            {/* Organization Admins */}
            {getUsersByRole("ORG_ADMIN").length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Organization Administrators
                </h4>
                <div className="space-y-2">
                  {getUsersByRole("ORG_ADMIN").map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-blue-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {user.role.replace("_", " ")}
                        </span>
                        {currentUser &&
                          can(currentUser, "organization", "manage") && (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-red-600`}
                            >
                              Manage
                            </span>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Leads */}
            {getUsersByRole("TEAM_LEAD").length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Team Leads</h4>
                <div className="space-y-2">
                  {getUsersByRole("TEAM_LEAD").map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-green-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {user.role.replace("_", " ")}
                        </span>
                        {currentUser &&
                          can(currentUser, "organization", "manage") && (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-red-600`}
                            >
                              Manage
                            </span>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agents */}
            {getUsersByRole("AGENT").length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Agents</h4>
                <div className="space-y-2">
                  {getUsersByRole("AGENT").map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-orange-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {user.role.replace("_", " ")}
                        </span>
                        {currentUser &&
                          can(currentUser, "organization", "manage") && (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-red-600`}
                            >
                              Manage
                            </span>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Tickets Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🎫</span> Recent Organization Tickets
          </CardTitle>
          <CardDescription>
            Latest tickets from this organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orgTickets.length > 0 ? (
            <div className="space-y-3">
              {orgTickets.slice(0, 5).map((ticket) => {
                const assignedUser = users.find(
                  (u) => u.id === ticket.assignedTo
                );
                return (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {ticket.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {ticket.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Assigned to: {assignedUser?.name || "Unassigned"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 ml-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === "OPEN"
                            ? "bg-red-100 text-red-800"
                            : ticket.status === "IN_PROGRESS"
                            ? "bg-blue-100 text-blue-800"
                            : ticket.status === "RESOLVED"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {ticket.status.replace("_", " ")}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.priority === "URGENT"
                            ? "bg-red-100 text-red-800"
                            : ticket.priority === "HIGH"
                            ? "bg-orange-100 text-orange-800"
                            : ticket.priority === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">
              No tickets found for this organization.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
