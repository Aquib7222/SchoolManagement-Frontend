
// import { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// import AppRoutes from "./AppRoutes";
// import AdminSidebar from "./components/AdminSidebar";
// import Header from "./components/Header";
// import Sidebar_menu from "./components/Admin/Sidebar_Menu";
// import { useAuth } from "./context/AuthContext";
// import "./app.css";

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const { auth } = useAuth();

//   // 🚨 If not logged in → show ONLY routes (login)
//   if (!auth.token) {
//     return <AppRoutes />;
//   }

//   const token = localStorage.getItem("token");
//   let userRole = null;

//   if (token) {
//     try {
//       const role = localStorage.getItem("role");
//       userRole = role;
//       console.log("userrole:", role);
//     } catch (err) {
//       localStorage.removeItem("token");
//     }
//   }

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 768) {
//         setSidebarOpen(true);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen((prev) => !prev);
//   };

//   return (
//     <>
//       <div
//         className="top-header"
//         style={{
//           position: "fixed",
//           width: "100%",
//           height: "60px",
//           zIndex: 2000,
//         }}
//       >
//         <Header toggleSidebar={toggleSidebar} />
//       </div>

//       <div
//         className="content"
//         style={{ display: "flex", paddingTop: "60px", minHeight: "100vh" }}
//       >
//         <div className={`sidebar ${sidebarOpen ? "open" : "close"}`}>
//           {sidebarOpen && (
//             <>{userRole === "ADMIN" ? <AdminSidebar /> : <Sidebar_menu />}</>
//           )}
//         </div>

//         <div
//           className="main-content"
//           style={{
//             marginLeft: sidebarOpen && window.innerWidth > 768 ? "20%" : "0",
//             width: sidebarOpen && window.innerWidth > 768 ? "80%" : "100%",
//             padding: "1rem",
//             // backgroundColor: "#f2fcfb",
//             zIndex:"1",
//           }}
//         >
//           <AppRoutes />
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;


import { useState, useEffect } from "react";

import AppRoutes from "./AppRoutes";
import AdminSidebar from "./components/AdminSidebar";
import Header from "./components/Header";
import Sidebar_menu from "./components/Admin/Sidebar_Menu";
import { useAuth } from "./context/AuthContext";
import "./app.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { auth } = useAuth();

  // Always call hooks before any conditional return
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Get role
  const userRole = localStorage.getItem("role");

  console.log("userrole:", userRole);

  // If not logged in → show only routes
  if (!auth.token) {
    return <AppRoutes />;
  }

  return (
    <>
      <div
        className="top-header"
        style={{
          position: "fixed",
          width: "100%",
          height: "60px",
          zIndex: 2000,
        }}
      >
        <Header toggleSidebar={toggleSidebar} />
      </div>

      <div
        className="content"
        style={{
          display: "flex",
          paddingTop: "60px",
          minHeight: "100vh",
        }}
      >
        <div className={`sidebar ${sidebarOpen ? "open" : "close"}`}>
          {sidebarOpen && (
            <>
              {userRole === "ADMIN" ? (
                <AdminSidebar />
              ) : (
                <Sidebar_menu />
              )}
            </>
          )}
        </div>

        <div
          className="main-content"
          style={{
            marginLeft:
              sidebarOpen && window.innerWidth > 768 ? "20%" : "0",

            width:
              sidebarOpen && window.innerWidth > 768 ? "80%" : "100%",

            padding: "1rem",
            zIndex: "1",
          }}
        >
          <AppRoutes />
        </div>
      </div>
    </>
  );
}

export default App;