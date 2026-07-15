import React, { createContext, useContext, useEffect, useState } from "react";
import { useSessionStore } from "../stores/session.store";
import { can } from "../lib/permission";
import type { TActions, TResource } from "@/mock/permissions";

interface PermissionContextType {
  hasPermission: (resource: TResource, action: TActions) => boolean;
  refreshPermissions: () => void;
}

const PermissionContext = createContext<PermissionContextType | null>(null);

export function PermissionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useSessionStore();
  const [, forceUpdate] = useState({});

  const refreshPermissions = () => {
    forceUpdate({});
  };

  const hasPermission = (resource: TResource, action: TActions) => {
    return currentUser ? can(currentUser, resource, action) : false;
  };

  useEffect(() => {
    // Listen for permission changes to trigger re-renders
    const handlePermissionChange = () => {
      refreshPermissions();
    };

    window.addEventListener("permissionsChanged", handlePermissionChange);

    return () => {
      window.removeEventListener("permissionsChanged", handlePermissionChange);
    };
  }, []);

  return (
    <PermissionContext.Provider value={{ hasPermission, refreshPermissions }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissionContext() {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error(
      "usePermissionContext must be used within PermissionProvider"
    );
  }
  return context;
}
