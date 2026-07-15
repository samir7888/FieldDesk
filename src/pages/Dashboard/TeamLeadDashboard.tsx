import { useState } from "react";
import { TicketsManagement } from "../Organization/TicketsManagement";
import { AnalyticsPage } from "../Organization/AnalyticsPage";
import { OrganizationDetailsCard } from "../Organization/OrganizationDetailsCard";

export const TeamLeadDashboard = () => {
  const [activeTab, setActiveTab] = useState("tickets");

  const tabs = [
    { id: "tickets", label: "Team Tickets", component: TicketsManagement },
    { id: "analytics", label: "Team Analytics", component: AnalyticsPage },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || TicketsManagement;

  return (
    <div className="space-y-8">
      {/* Organization Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Team Lead Dashboard</h2>
        <OrganizationDetailsCard />
      </div>

      {/* Quick Access Tabs */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Quick Access</h3>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};
