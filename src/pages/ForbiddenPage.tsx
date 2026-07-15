import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/route";

export const ForbiddenPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-red-600">
            403 - Forbidden
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-4">
            You don't have permission to access this resource.
          </p>
          <Link
            to={ROUTES.DASHBOARD}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
