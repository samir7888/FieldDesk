import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useSessionStore } from "../../stores/session.store";

export const PermissionSummary = () => {
  const { currentUser } = useSessionStore();

  if (!currentUser) return null;

  const getRolePermissions = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return [
          "Full platform access",
          "Manage organizations",
          "Manage all users",
          "View all tickets",
          "System configuration",
        ];
      case "AUDITOR":
        return [
          "View all data",
          "Generate reports",
          "Compliance monitoring",
          "Risk assessment",
        ];
      case "ORG_ADMIN":
        return [
          "Manage organization users",
          "View organization tickets",
          "Organization settings",
          "Team management",
        ];
      case "TEAM_LEAD":
        return [
          "Manage team members",
          "Assign tickets",
          "Team reporting",
          "Performance monitoring",
        ];
      case "AGENT":
        return [
          "View assigned tickets",
          "Update ticket status",
          "Basic reporting",
        ];
      default:
        return [];
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🔐 Permission Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="font-medium text-sm text-gray-600">
            Current Role:{" "}
            <span className="text-blue-600 font-semibold">
              {currentUser.role.replace("_", " ")}
            </span>
          </div>
          <div className="text-sm">
            <div className="font-medium mb-2">Permissions:</div>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {getRolePermissions(currentUser.role).map((permission, index) => (
                <li key={index}>{permission}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
