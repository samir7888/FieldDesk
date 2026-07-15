import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { organizations } from "../../mock/organizations";
import { users } from "../../mock/users";
import { tickets } from "../../mock/tickets";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import { can } from "@/lib/permission";
import { useSession } from "@/hooks/useSesstion";

export const OrganizationTable = () => {
  const { currentUser } = useSession();
  if (!currentUser) {
    return null;
  }
  const getOrgStats = (orgId: string) => {
    const orgUsers = users.filter((user) => user.organizationId === orgId);
    const orgTickets = tickets.filter(
      (ticket) => ticket.organizationId === orgId
    );
    const openTickets = orgTickets.filter((ticket) => ticket.status === "OPEN");

    return {
      staff: orgUsers.length,
      totalTickets: orgTickets.length,
      openTickets: openTickets.length,
    };
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between  gap-2">
          <span>🏢 Organizations Overview</span>
          {can(currentUser, "organization", "manage") && (
            <Link
              to={ROUTES.CREATE_ORGANIZATION}
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
            >
              Create Organization
            </Link>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Organization</th>
                <th className="text-left p-3 font-medium">Location</th>
                <th className="text-center p-3 font-medium">Staff</th>
                <th className="text-center p-3 font-medium">Total Tickets</th>
                <th className="text-center p-3 font-medium">Open Tickets</th>
                <th className="text-center p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => {
                const stats = getOrgStats(org.id);
                return (
                  <tr key={org.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <Link
                          to={`/organizations/${org.id}`}
                          className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                        >
                          {org.name}
                        </Link>
                        <div className="text-sm text-gray-500">
                          ({org.shortName})
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">{org.address}</td>
                    <td className="p-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {stats.staff}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {stats.totalTickets}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          stats.openTickets > 0
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {stats.openTickets}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          org.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {org.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
