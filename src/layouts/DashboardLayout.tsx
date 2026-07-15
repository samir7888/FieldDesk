import { Outlet } from "react-router-dom";
import { useSessionStore } from "../stores/session.store";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/route";
import { can } from "../lib/permission";

export const DashboardLayout = () => {
  const { currentUser, selectedOrganization, logout } = useSessionStore();

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to={ROUTES.DASHBOARD}>
                <h1 className="text-xl font-semibold text-gray-900">
                  FieldDesk
                </h1>
              </Link>
              <div className="text-sm text-gray-500">
                {currentUser?.role.replace("_", " ")} Dashboard
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {currentUser?.name}
                </p>
                <p className="text-xs text-gray-500">{currentUser?.email}</p>
                {selectedOrganization && (
                  <p className="text-xs text-blue-600">
                    {selectedOrganization.name}
                  </p>
                )}
              </div>
              <button
                onClick={logout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};
