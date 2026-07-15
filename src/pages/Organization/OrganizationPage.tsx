import { useState } from "react";
import { Link } from "react-router-dom";
import { AnalyticsPage } from "./AnalyticsPage";
import { UserStaffsTable } from "./UserStaffsTable";
import { TicketsManagement } from "./TicketsManagement";
import { OrganizationDetailsCard } from "./OrganizationDetailsCard";
import { useSessionStore } from "../../stores/session.store";
import type { Role } from "../../types/type";

export const OrganizationPage = () => {
  const { currentUser } = useSessionStore();

  // Define which roles can access which tabs
  const rolePermissions: Record<Role, string[]> = {
    SUPER_ADMIN: ["userstaffs", "tickets", "analytics"],
    AUDITOR: ["userstaffs", "tickets", "analytics"],
    ORG_ADMIN: ["userstaffs", "tickets", "analytics"],
    TEAM_LEAD: ["tickets", "analytics"], // Team Lead can only access tickets and analytics
    AGENT: ["tickets"], // Agents typically only need tickets
  };

  const allTabs = [
    { id: "userstaffs", label: "User Staffs", component: UserStaffsTable },
    { id: "tickets", label: "Tickets", component: TicketsManagement },
    { id: "analytics", label: "Analytics", component: AnalyticsPage },
  ];

  // Filter tabs based on user role
  const allowedTabIds = currentUser
    ? rolePermissions[currentUser.role] || []
    : [];
  const tabs = allTabs.filter((tab) => allowedTabIds.includes(tab.id));

  // Set default tab based on available tabs
  const getDefaultTab = () => {
    if (allowedTabIds.includes("userstaffs")) return "userstaffs";
    if (allowedTabIds.includes("tickets")) return "tickets";
    if (allowedTabIds.includes("analytics")) return "analytics";
    return tabs[0]?.id || "tickets";
  };

  const [activeTab, setActiveTab] = useState(getDefaultTab());

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || TicketsManagement;

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Organization Management</h2>

      {/* Organization Details */}
      <div className="mb-8">
        <OrganizationDetailsCard />
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <ActiveComponent />
    </div>
  );
};
