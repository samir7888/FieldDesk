import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { tickets } from "../../mock/tickets";
import { useSessionStore } from "../../stores/session.store";
import type { ITicket } from "../../types/type";

export const AgentDashboard = () => {
  const { currentUser } = useSessionStore();
  const [myTickets, setMyTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    // Filter tickets assigned to current agent
    const agentTickets = tickets.filter(
      (ticket) => ticket.assignedTo === currentUser.id
    );

    setTimeout(() => {
      setMyTickets(agentTickets);
      setLoading(false);
    }, 300);
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

  const activeTickets = myTickets.filter(
    (ticket) => ticket.status === "OPEN" || ticket.status === "IN_PROGRESS"
  );

  const resolvedToday = myTickets.filter(
    (ticket) => ticket.status === "RESOLVED" || ticket.status === "CLOSED"
  );

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Agent Dashboard</h2>
        <p className="text-gray-600 mb-6">
          Welcome back! Here's your current workload and progress.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              My Active Tickets
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-blue-600">
              {activeTickets.length}
            </div>
            <p className="text-sm text-gray-600">Assigned to Me</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Assigned
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-purple-600">
              {myTickets.length}
            </div>
            <p className="text-sm text-gray-600">All Time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-green-600">
              {resolvedToday.length}
            </div>
            <p className="text-sm text-gray-600">Resolved/Closed</p>
          </CardContent>
        </Card>
      </div>

      {/* My Tickets List */}
      <Card>
        <CardHeader>
          <CardTitle>My Assigned Tickets</CardTitle>
          <CardDescription>Tickets currently assigned to you</CardDescription>
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {myTickets.map((ticket) => (
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
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Work On
                        </button>
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {myTickets.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No tickets assigned to you yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
