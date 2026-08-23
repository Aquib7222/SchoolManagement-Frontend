import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dashboard from "../pages/AdminDashboard/Dashboard";
import SuperDashboard from "../pages/Dashboard/SuperDashboard";
import TeacherDashboard from "../pages/Dashboard/TeacherDashboard";
import StudentDashboard from "../pages/Dashboard/StudentDashboard";

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

  if(auth.role === "TEACHER"){
    return <TeacherDashboard />;
  }

  if(auth.role === "STUDENT"){
    return <StudentDashboard />;
  }

  return <Navigate to="/login" replace />;
};

export default HomeRedirect;
