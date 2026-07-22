

// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";


// const ProtectedRoute = ({ children, allowedRole }) => {
//   const token = localStorage.getItem("token");
//   console.log("token:",token);

//   // Not logged in
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   try {
//     const decoded = jwtDecode(token);
//     console.log("decode",decoded);
//     const userRole = decoded.role;
//     console.log("userRole",userRole);

//     if (allowedRole && userRole !== allowedRole) {
//       return <Navigate to="/login" replace />;
//     }

//     return children;
//   } catch (error) {
//     localStorage.removeItem("token");
//     return <Navigate to="/login" replace />;
//   }
// };

// export default ProtectedRoute;

// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, role }) => {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (role && role !== userRole) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { auth } = useAuth();


  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && auth.role !== allowedRole) {
    console.log("allowedRole ",allowedRole);
    console.log("auth role",auth.role);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

