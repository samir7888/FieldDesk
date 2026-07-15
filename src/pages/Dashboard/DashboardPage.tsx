import { useSessionStore } from "../../stores/session.store";
import { KPICards } from "./KPICards";
import { TicketStatusChart } from "./TicketStatusChart";
import { TicketPriorityChart } from "./TicketPriorityChart";
import { OrganizationTable } from "./OrganizationTable";
import { RecentTickets } from "./RecentTickets";
import { TeamLeadDashboard } from "./TeamLeadDashboard";
import { AgentDashboard } from "./AgentDashboard";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/route";
import { OrganizationPage } from "../Organization/OrganizationPage";

export const DashboardPage = () => {
  const { currentUser } = useSessionStore();
  if (!currentUser) return null;

  const isPlatformUser = (): boolean => {
    if (!currentUser) return false;
    return ["SUPER_ADMIN", "AUDITOR"].includes(currentUser.role);
  };

  if (isPlatformUser()) {
    return (
      <div>
        {/* Header with FIELDDESK branding */}
        <div className="text-center mb-8 space-y-2">
          <div className="border-t-4 border-b-4 border-gray-300 py-4">
            <h1 className="text-4xl font-bold text-gray-900 tracking-wider">
              FIELDDESK
            </h1>
          </div>
          {currentUser.role === "SUPER_ADMIN" && (
            <Link to={`${ROUTES.PERMISSIONS}`}>
              <Button>Manage Permission</Button>
            </Link>
          )}
        </div>

        {/* KPI Cards Row */}
        <KPICards />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TicketStatusChart />
          <TicketPriorityChart />
        </div>

        {/* Organizations Overview */}
        <OrganizationTable />

        {/* Recent Tickets */}
        <RecentTickets />

        
      </div>
    );
  }

  const getDashboardContent = () => {
    switch (currentUser.role) {
      case "ORG_ADMIN":
        return <OrganizationPage />;

      case "TEAM_LEAD":
        return <TeamLeadDashboard />;

      case "AGENT":
        return <AgentDashboard />;

      default:
        return <div>Unknown role</div>;
    }
  };

  return <div className="px-4 py-6">{getDashboardContent()}</div>;
};
