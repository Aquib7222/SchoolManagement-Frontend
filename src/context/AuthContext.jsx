// import { createContext, useContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [auth, setAuth] = useState({
//     token: null,
//     role: null,
//     user: null,
//   });

//   // Load auth on refresh
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         const expired = decoded.exp * 1000 < Date.now();

//         if (expired) {
//           logout();
//         } else {
//           setAuth({ token, role, user });
//         }
//       } catch {
//         logout();
//       }
//     }
//   }, []);

//   const login = ({ token, user }) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("role", user.role);
//     localStorage.setItem("user", JSON.stringify(user));

//     setAuth({ token, role: user.role, user });
//   };

//   const logout = () => {
//     localStorage.clear();
//     setAuth({ token: null, role: null, user: null });
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    token: null,
    role: null,
    user: null,
    loading: true, // 🔥 important
  });

  // 🔁 Run once on app load / refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && role) {
      setAuth({
        token,
        role,
        user,
        loading: false,
      });
    } else {
      setAuth({
        token: null,
        role: null,
        user: null,
        loading: false,
      });
    }
  }, []);

  // login 

 const login = ({ token, user }) => {

  localStorage.setItem("token", token);
  localStorage.setItem("role", user.role);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("email", user.email);
  localStorage.setItem("schoolId", user.schoolId);
  localStorage.setItem("userGroupId", user.userGroupId ?? "");

  if (user.school) {
    localStorage.setItem("school", JSON.stringify(user.school));
  }

  setAuth({
    token,
    role: user.role,
    user,
    loading: false,
  });

  if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
    navigate("/");
  } else {
    navigate("/userInterface");
  }
};

  // ✅ Logout
  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null, user: null, loading: false });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
