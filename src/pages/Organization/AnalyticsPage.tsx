import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { tickets } from "../../mock/tickets";
import { useSessionStore } from "../../stores/session.store";
import type { ITicket } from "../../types/type";

interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  priorityStats: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
}

export const AnalyticsPage = () => {
  const { currentUser } = useSessionStore();
  const [stats, setStats] = useState<TicketStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user's organization ID
    const currentOrgId = currentUser?.organizationId;
    if (!currentOrgId) return;

    const orgTickets = tickets.filter(
      (ticket) => ticket.organizationId === currentOrgId
    );

    const calculateStats = (tickets: ITicket[]): TicketStats => {
      return {
        total: tickets.length,
        open: tickets.filter((t) => t.status === "OPEN").length,
        inProgress: tickets.filter((t) => t.status === "IN_PROGRESS").length,
        resolved: tickets.filter((t) => t.status === "RESOLVED").length,
        closed: tickets.filter((t) => t.status === "CLOSED").length,
        priorityStats: {
          low: tickets.filter((t) => t.priority === "LOW").length,
          medium: tickets.filter((t) => t.priority === "MEDIUM").length,
          high: tickets.filter((t) => t.priority === "HIGH").length,
          urgent: tickets.filter((t) => t.priority === "URGENT").length,
        },
      };
    };

    setTimeout(() => {
      setStats(calculateStats(orgTickets));
      setLoading(false);
    }, 500);
  }, [currentUser]);

  const getPercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
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

  if (!stats) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8 text-gray-500">
            Unable to load analytics data
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ticket Analytics Dashboard</CardTitle>
          <p className="text-sm text-gray-600">
            Overview of ticket statistics and trends for your organization
          </p>
        </CardHeader>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Tickets</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {stats.open}
              </div>
              <div className="text-sm text-gray-600 mt-1">Open</div>
              <div className="text-xs text-gray-500">
                {getPercentage(stats.open, stats.total)}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {stats.inProgress}
              </div>
              <div className="text-sm text-gray-600 mt-1">In Progress</div>
              <div className="text-xs text-gray-500">
                {getPercentage(stats.inProgress, stats.total)}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {stats.resolved}
              </div>
              <div className="text-sm text-gray-600 mt-1">Resolved</div>
              <div className="text-xs text-gray-500">
                {getPercentage(stats.resolved, stats.total)}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600">
                {stats.closed}
              </div>
              <div className="text-sm text-gray-600 mt-1">Closed</div>
              <div className="text-xs text-gray-500">
                {getPercentage(stats.closed, stats.total)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Open</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{
                        width: `${getPercentage(stats.open, stats.total)}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {stats.open}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">In Progress</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${getPercentage(
                          stats.inProgress,
                          stats.total
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {stats.inProgress}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Resolved</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${getPercentage(stats.resolved, stats.total)}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {stats.resolved}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Closed</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-500 h-2 rounded-full"
                      style={{
                        width: `${getPercentage(stats.closed, stats.total)}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {stats.closed}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Urgent</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{
                        width: `${getPercentage(
                          stats.priorityStats.urgent,
                          stats.total
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {stats.priorityStats.urgent}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">High</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{
                        width: `${getPercentage(
                          stats.priorityStats.high,
                          stats.total
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {stats.priorityStats.high}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Medium</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{
                        width: `${getPercentage(
                          stats.priorityStats.medium,
                          stats.total
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {stats.priorityStats.medium}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Low</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-500 h-2 rounded-full"
                      style={{
                        width: `${getPercentage(
                          stats.priorityStats.low,
                          stats.total
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {stats.priorityStats.low}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {getPercentage(stats.resolved + stats.closed, stats.total)}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Resolution Rate</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {getPercentage(
                  stats.priorityStats.urgent + stats.priorityStats.high,
                  stats.total
                )}
                %
              </div>
              <div className="text-sm text-gray-600 mt-1">
                High Priority Tickets
              </div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {getPercentage(stats.open + stats.inProgress, stats.total)}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Active Tickets</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
