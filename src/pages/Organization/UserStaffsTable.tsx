import { useState, useEffect } from "react";
import { Link, useNavigate, useRevalidator } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { users } from "../../mock/users";
import { useSessionStore } from "../../stores/session.store";
import { ROUTES } from "../../constants/route";
import type { IUser } from "../../types/type";
import MockDataService from "@/services/mockDataService";
import { userService } from "@/services";

export const UserStaffsTable = () => {
  const { currentUser } = useSessionStore();
  if (!currentUser) {
    return null;
  }
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const [organizationUsers, setOrganizationUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user's organization ID
    const currentOrgId = currentUser?.organizationId;
    if (!currentOrgId) return;

    const orgUsers = users.filter(
      (user) => user.organizationId === currentOrgId
    );

    setTimeout(() => {
      setOrganizationUsers(orgUsers);
      setLoading(false);
    }, 500);
  }, [currentUser]);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ORG_ADMIN":
        return "bg-purple-100 text-purple-800";
      case "TEAM_LEAD":
        return "bg-blue-100 text-blue-800";
      case "AGENT":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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

  const removeUser = async (userid: string) => {
    const users = await userService.deleteUserById(
      userid,
      currentUser?.organizationId || ""
    );
    setOrganizationUsers(users || []);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization User Staffs</CardTitle>
        <p className="text-sm text-gray-600">
          Manage users and staff members in your organization
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3 font-semibold text-gray-900">
                  Name
                </th>
                <th className="text-left p-3 font-semibold text-gray-900">
                  Email
                </th>
                <th className="text-left p-3 font-semibold text-gray-900">
                  Role
                </th>
                <th className="text-left p-3 font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {organizationUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-gray-900">{user.name}</td>
                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      {user.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Link
                        to={ROUTES.EDIT_USER.replace(":id", user.id.toString())}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => removeUser(user.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {organizationUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found in this organization
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link
            to={ROUTES.CREATE_USER}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
          >
            Add New User
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
