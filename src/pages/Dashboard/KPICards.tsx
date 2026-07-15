import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { users } from "../../mock/users";
import { organizations } from "../../mock/organizations";
import { tickets } from "../../mock/tickets";

export const KPICards = () => {
  const totalOrganizations = organizations.length;
  const totalStaff = users.length;
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(
    (ticket) => ticket.status === "OPEN"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-600">
            Total Organizations
          </CardTitle>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🏢</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">
            {totalOrganizations}
          </div>
          <p className="text-xs text-blue-600">Active organizations</p>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-600">
            Total Staff
          </CardTitle>
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">👥</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">{totalStaff}</div>
          <p className="text-xs text-green-600">Registered users</p>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-yellow-600">
            Total Tickets
          </CardTitle>
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🎫</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-700">
            {totalTickets}
          </div>
          <p className="text-xs text-yellow-600">All time tickets</p>
        </CardContent>
      </Card>

      <Card className="bg-red-50 border-red-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-600">
            Open Tickets
          </CardTitle>
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🚨</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-700">{openTickets}</div>
          <p className="text-xs text-red-600">Needs attention</p>
        </CardContent>
      </Card>
    </div>
  );
};
