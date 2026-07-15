import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { usePermissions } from "../hooks/usePermissions";

export default function PermissionManagementPage() {
  const { permissions, loading, updatePermission, roles, resources } =
    usePermissions();
  const [selectedRole, setSelectedRole] = useState<string>("SUPER_ADMIN");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading permissions...</div>
      </div>
    );
  }

  const rolePermissions = permissions.filter((p) => p.role === selectedRole);

  const handlePermissionToggle = async (id: string, currentValue: boolean) => {
    await updatePermission(id, !currentValue);
  };

  const getPermissionIcon = (allowed: boolean) => {
    return allowed ? "✅" : "❌";
  };

  const getResourceActions = (resource: string) => {
    return resources[resource as keyof typeof resources] || [];
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Permission Management</h1>
        <div className="text-sm text-gray-600">
          Changes take effect immediately across the application
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <Button
                key={role}
                variant={selectedRole === role ? "default" : "outline"}
                onClick={() => setSelectedRole(role)}
                className="mb-2"
              >
                {role.replace("_", " ")}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Permissions for {selectedRole.replace("_", " ")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(resources).map(([resource, actions]) => (
              <div key={resource} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 capitalize">
                  {resource} Management
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {actions.map((action) => {
                    const permission = rolePermissions.find(
                      (p) => p.resource === resource && p.action === action
                    );

                    return (
                      <div
                        key={`${resource}-${action}`}
                        className="flex items-center justify-between p-3 border rounded-md bg-gray-50"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            {getPermissionIcon(permission?.allowed ?? false)}
                          </span>
                          <span className="capitalize font-medium">
                            {action} {resource}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant={
                            permission?.allowed ? "destructive" : "default"
                          }
                          onClick={() =>
                            permission &&
                            handlePermissionToggle(
                              permission.id,
                              permission.allowed
                            )
                          }
                          disabled={!permission}
                        >
                          {permission?.allowed ? "Revoke" : "Grant"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permission Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {roles.map((role) => {
              const rolePerms = permissions.filter((p) => p.role === role);
              const granted = rolePerms.filter((p) => p.allowed).length;
              const total = rolePerms.length;

              return (
                <div key={role} className="text-center p-3 border rounded-md">
                  <div className="font-semibold text-sm">
                    {role.replace("_", " ")}
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {granted}/{total}
                  </div>
                  <div className="text-xs text-gray-600">
                    Permissions Granted
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
