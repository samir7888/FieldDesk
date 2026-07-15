import { Navigate, useLocation } from "react-router-dom";
import { useSessionStore } from "../../stores/session.store";
import { ROUTES } from "../../constants/route";
import type { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { currentUser } = useSessionStore();
  const location = useLocation();

  // If user is not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};
