import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { tickets } from "../../mock/tickets";
import { users } from "../../mock/users";
import { useSessionStore } from "../../stores/session.store";
import type { ITicket, IUser } from "../../types/type";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import { can } from "@/lib/permission";
import { ticketService } from "@/services";

export const TicketsManagement = () => {
  const { currentUser } = useSessionStore();
  const [organizationTickets, setOrganizationTickets] = useState<ITicket[]>([]);
  const [organizationUsers, setOrganizationUsers] = useState<IUser[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user's organization ID
    const currentOrgId = currentUser?.organizationId;
    if (!currentOrgId) return;

    const orgTickets = tickets.filter(
      (ticket) => ticket.organizationId === currentOrgId
    );
    const orgUsers = users.filter(
      (user) => user.organizationId === currentOrgId
    );

    setTimeout(() => {
      setOrganizationTickets(orgTickets);
      setOrganizationUsers(orgUsers);
      setLoading(false);
    }, 500);
  }, [currentUser]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      case "CLOSED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "LOW":
        return "bg-gray-100 text-gray-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800";
      case "URGENT":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUserName = (userId: string) => {
    return users.find((user) => user.id === userId)?.name || "Unknown";
  };

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

  const deleteTicket = async (ticketId: string) => {
    const tickets = await ticketService.delete(
      ticketId,
      currentUser?.organizationId || ""
    );
    setOrganizationTickets(tickets);
  };
  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Tickets Management</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Create, view, assign and manage tickets for your organization
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
            >
              {showCreateForm ? "Cancel" : "Create Ticket"}
            </button>
          </div>
        </CardHeader>
      </Card>

      {/* Create Ticket Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter ticket title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter ticket description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select user</option>
                    {organizationUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tickets List */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-900">
                    Title
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-900">
                    Priority
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-900">
                    Assigned To
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-900">
                    Created By
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {organizationTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium text-gray-900">
                          {ticket.title}
                        </div>
                        <div className="text-sm text-gray-600 truncate max-w-xs">
                          {ticket.description}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                          ticket.status
                        )}`}
                      >
                        {ticket.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeColor(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="p-3 text-gray-900">
                      {getUserName(ticket.assignedTo)}
                    </td>
                    <td className="p-3 text-gray-900">
                      {getUserName(ticket.createdBy)}
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Link
                          to={ROUTES.EDIT_TICKET.replace(
                            ":id",
                            ticket.id.toString()
                          )}
                        >
                          <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                            Edit
                          </button>
                        </Link>
                        {currentUser &&
                          can(currentUser, "ticket", "delete") && (
                            <button
                              onClick={() => deleteTicket(ticket.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Delete
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {organizationTickets.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No tickets found for this organization
              </div>
            )}
          </div>
        </CardContent>
        <div className="flex space-x-2 p-4">
          <Link
            to={ROUTES.CREATE_TICKET}
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 font-medium"
          >
            Create Ticket
          </Link>
        </div>
      </Card>
    </div>
  );
};
