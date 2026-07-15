import { useState, useEffect } from "react";
import {
  type IPermission,
  permissionAPI,
  ROLES,
  RESOURCES,
} from "../mock/permissions";

export function usePermissions() {
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPermissions = () => {
    setLoading(true);
    const allPermissions = permissionAPI.getAllPermissions();
    setPermissions(allPermissions);
    setLoading(false);
  };

  useEffect(() => {
    loadPermissions();

    // Listen for permission changes to update immediately
    const handlePermissionChange = () => {
      loadPermissions();
    };

    window.addEventListener("permissionsChanged", handlePermissionChange);

    return () => {
      window.removeEventListener("permissionsChanged", handlePermissionChange);
    };
  }, []);

  const updatePermission = async (id: string, allowed: boolean) => {
    try {
      await permissionAPI.updatePermission(id, allowed);
      // The event listener will automatically update the state
    } catch (error) {
      console.error("Failed to update permission:", error);
    }
  };

  const getPermissionsByRole = (role: string) => {
    return permissions.filter((p) => p.role === role);
  };

  return {
    permissions,
    loading,
    updatePermission,
    getPermissionsByRole,
    roles: ROLES,
    resources: RESOURCES,
  };
}
