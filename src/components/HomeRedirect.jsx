import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dashboard from "../pages/AdminDashboard/Dashboard";
import SuperDashboard from "../pages/Dashboard/SuperDashboard";

const HomeRedirect = () => {
  const { auth } = useAuth();

  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  if (auth.role === "ADMIN") {
    return <Dashboard />;
  }

  if (auth.role === "SUPERADMIN") {
    return <SuperDashboard />;
  }

  return <Navigate to="/login" replace />;
};

export default HomeRedirect;
