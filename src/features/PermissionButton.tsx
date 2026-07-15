import React from "react";
import { Button } from "../components/ui/button";
import { usePermissionContext } from "../contexts/PermissionContext";
import { useSessionStore } from "../stores/session.store";
import type { TActions, TResource } from "@/mock/permissions";

interface PermissionButtonProps {
  resource: TResource;
  action: TActions;
  children: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  fallbackMessage?: string;
}

export function PermissionButton({
  resource,
  action,
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  fallbackMessage,
}: PermissionButtonProps) {
  const { hasPermission } = usePermissionContext();
  const { currentUser } = useSessionStore();

  if (!currentUser || !hasPermission(resource, action)) {
    if (fallbackMessage) {
      return (
        <Button
          variant="outline"
          size={size}
          className={`opacity-50 cursor-not-allowed ${className}`}
          disabled
          title={fallbackMessage}
        >
          {children}
        </Button>
      );
    }
    return null;
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
