import { users } from "../mock/users";
import { organizations } from "../mock/organizations";
import { useSessionStore } from "../stores/session.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/route";

export const LoginPage = () => {
  const { currentUser, login } = useSessionStore();

  // If user is already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const handleUserLogin = (userId: string) => {
    login(userId);
  };

  const getUsersByRole = (role: string) => {
    return users.filter((user) => user.role === role);
  };

  const getOrganizationName = (orgId: string | null) => {
    if (!orgId) return "Platform Level";
    const org = organizations.find((o) => o.id === orgId);
    return org ? org.name : "Unknown Organization";
  };

  const roleColors = {
    SUPER_ADMIN: "bg-red-50 border-red-200 hover:bg-red-100",
    AUDITOR: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    ORG_ADMIN: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    TEAM_LEAD: "bg-green-50 border-green-200 hover:bg-green-100",
    AGENT: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            FieldDesk Login
          </h1>
          <p className="text-lg text-gray-600">
            Select a user role to access the dashboard
          </p>
        </div>

        {/* Platform Level Users */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Platform Level Access
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {getUsersByRole("SUPER_ADMIN")
              .concat(getUsersByRole("AUDITOR"))
              .map((user) => (
                <Card
                  key={user.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    roleColors[user.role]
                  } hover:shadow-lg`}
                  onClick={() => handleUserLogin(user.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{user.name}</CardTitle>
                    <CardDescription className="text-base font-medium">
                      {user.role.replace("_", " ")} • {user.email}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Organization: {getOrganizationName(user.organizationId)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Full platform access with{" "}
                      {user.role === "SUPER_ADMIN" ? "administrative" : "audit"}{" "}
                      privileges
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Organization Level Users */}
        {organizations.map((org) => (
          <div key={org.id} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {org.name} ({org.shortName})
            </h2>
            <p className="text-gray-600 mb-6">{org.address}</p>
            <div className="grid md:grid-cols-3 gap-4">
              {users
                .filter((user) => user.organizationId === org.id)
                .map((user) => (
                  <Card
                    key={user.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      roleColors[user.role]
                    } hover:shadow-lg`}
                    onClick={() => handleUserLogin(user.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <CardDescription className="font-medium">
                        {user.role.replace("_", " ")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                      <p className="text-xs text-gray-500">
                        {user.role === "ORG_ADMIN"
                          ? "Organization administrator"
                          : user.role === "TEAM_LEAD"
                          ? "Team leadership role"
                          : "Field agent role"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
