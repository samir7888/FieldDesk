import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { tickets } from "../../mock/tickets";

export const TicketPriorityChart = () => {
  const priorityCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(priorityCounts).map(([priority, count]) => ({
    name: priority,
    value: count,
    fill: getPriorityColor(priority),
  }));

  function getPriorityColor(priority: string): string {
    switch (priority) {
      case "LOW":
        return "#10b981";
      case "MEDIUM":
        return "#f59e0b";
      case "HIGH":
        return "#f97316";
      case "URGENT":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🥧</span> Ticket Priority Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${((percent || 0) * 100).toFixed(0)}%)`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
