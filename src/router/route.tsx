import { ROUTES } from "../constants/route";
import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardPage } from "../pages/Dashboard/DashboardPage";
import { OrganizationDetailsPage } from "../pages/Organization/OrganizationDetailsPage";
import PermissionManagementPage from "../pages/PermissionManagementPage";
import { ForbiddenPage } from "../pages/ForbiddenPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AuthGuard } from "../features/guards/AuthGuard";
import { PermissionGuard } from "../features/guards/PermissionGuard";
import { AnalyticsPage } from "../pages/Organization/AnalyticsPage";
import OrganizationForm from "../pages/forms/OrganizationForm";
import UserForm from "../pages/forms/UserForm";
import TicketForm from "../pages/forms/TicketForm";
import FormsDemo from "../pages/FormsDemo";

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },

  {
    path: "/",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },

      {
        path: "/organizations/:orgId",
        element: (
          <PermissionGuard
            allowedRoles={["SUPER_ADMIN", "AUDITOR", "ORG_ADMIN"]}
          >
            <OrganizationDetailsPage />
          </PermissionGuard>
        ),
      },

      {
        path: ROUTES.ANALYTICS,
        element: (
          <PermissionGuard
            allowedRoles={["SUPER_ADMIN", "AUDITOR", "ORG_ADMIN"]}
          >
            <AnalyticsPage />
          </PermissionGuard>
        ),
      },

      {
        path: ROUTES.PERMISSIONS,
        element: (
          <PermissionGuard allowedRoles={["SUPER_ADMIN"]}>
            <PermissionManagementPage />
          </PermissionGuard>
        ),
      },

      // Form routes with proper permissions
      {
        path: ROUTES.FORMS_DEMO,
        element: (
          <PermissionGuard allowedRoles={["SUPER_ADMIN"]}>
            <FormsDemo />
          </PermissionGuard>
        ),
      },

      {
        path: ROUTES.CREATE_ORGANIZATION,
        element: (
          <PermissionGuard allowedRoles={["SUPER_ADMIN"]}>
            <OrganizationForm mode="create" />
          </PermissionGuard>
        ),
      },

      {
        path: ROUTES.EDIT_ORGANIZATION,
        element: (
          <PermissionGuard allowedRoles={["SUPER_ADMIN"]}>
            <OrganizationForm mode="edit" />
          </PermissionGuard>
        ),
      },

      {
        path: ROUTES.CREATE_USER,
        element: (
          <PermissionGuard allowedRoles={["SUPER_ADMIN", "ORG_ADMIN"]}>
            <UserForm mode="create" />
          </PermissionGuard>
        ),
      },

      {
        path: ROUTES.EDIT_USER,
        element: (
          <PermissionGuard allowedRoles={["SUPER_ADMIN", "ORG_ADMIN"]}>
            <UserForm mode="edit" />
          </PermissionGuard>
        ),
      },

      {
        path: ROUTES.CREATE_TICKET,
        element: (
          <PermissionGuard
            allowedRoles={["SUPER_ADMIN", "ORG_ADMIN", "TEAM_LEAD", "AGENT"]}
          >
            <TicketForm mode="create" />
          </PermissionGuard>
        ),
      },

      {
        path: ROUTES.EDIT_TICKET,
        element: (
          <PermissionGuard
            allowedRoles={["SUPER_ADMIN", "ORG_ADMIN", "TEAM_LEAD", "AGENT"]}
          >
            <TicketForm mode="edit" />
          </PermissionGuard>
        ),
      },
    ],
  },

  {
    path: ROUTES.FORBIDDEN,
    element: <ForbiddenPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
