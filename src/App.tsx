import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/route";
import { PermissionProvider } from "./contexts/PermissionContext";

function App() {
  return (
    <PermissionProvider>
      <RouterProvider router={router} />
    </PermissionProvider>
  );
}

export default App;
