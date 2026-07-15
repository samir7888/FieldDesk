import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/route";
import type { Role } from "../../types/type";
import type { ReactNode } from "react";
import { useSession } from "../../hooks/useSesstion";

interface PermissionGuardProps {
  children: ReactNode;
  allowedRoles: Role[];
  fallbackPath?: string;
}
export const PermissionGuard = ({
  children,
  allowedRoles,
  fallbackPath = ROUTES.FORBIDDEN,
}: PermissionGuardProps) => {
  const { currentUser } = useSession();

  // If no user is authenticated, this should be handled by AuthGuard first
  if (!currentUser) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Check if user's role is in the allowed roles
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to={fallbackPath} replace />;
  }
  

  // User has the required permissions, render the protected content
  return <>{children}</>;
};



