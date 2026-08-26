// import { useState, useEffect } from "react";

// import AppRoutes from './AppRoutes'
// import AdminSidebar from "./components/AdminSidebar";
// import Header from "./components/Header";
// import Sidebar_menu from "./components/Admin/Sidebar_Menu";

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Close sidebar on window resize if bigger than mobile
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 768) {
//         setSidebarOpen(true); // always open on bigger screens
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen((prev) => !prev);
//   };

//    // Get user role from localStorage
//   const userRole = JSON.parse(localStorage.getItem("userLogin"));
// console.log(userRole.role);  // 👉 superadmin

//   return (
//     <>
//      <div className="top-header" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "60px", zIndex: 2000 }}>
//         <Header toggleSidebar={toggleSidebar} />
//       </div>

//       <div
//         className="content"
//         style={{
//           display: "flex",
//           position: "relative",
//           paddingTop: "60px", // push content below fixed header
//           minHeight: "100vh",
//         }}
//       >
//         {/* Sidebar */}
//         <div
//           className="sidebar"
//           style={{
//             width: sidebarOpen ? "20%" : "0",
//             overflowX: "hidden",
//             transition: "width 0.3s ease",
//             backgroundColor: "#fff",
//             height: "calc(100vh - 60px)", // full height minus header
//             position: "fixed",
//             top: "60px",
//             left: 0,
//             zIndex: 1100,
//             boxShadow: sidebarOpen ? "2px 0 5px rgba(0,0,0,0.1)" : "none",
//           }}
//         >
//            {sidebarOpen && (
//             <>
//               {/* {userRole === "superadmin" ? (
//                 <Sidebar_menu />
//               ) : (
//                 <AdminSidebar />
//               )} */}
//               {userRole?.role === "admin" ? <AdminSidebar /> : <Sidebar_menu />}
//             </>
//           )}
//         </div>

//         {/* Overlay */}
//         {sidebarOpen && window.innerWidth <= 768 && (
//           <div
//             onClick={toggleSidebar}
//             style={{
//               position: "fixed",
//               top: "60px",
//               left: 0,
//               right: 0,
//               bottom: 0,
//               // backgroundColor: "rgba(0,0,0,0.4)",
//               zIndex: 1000,
//             }}
//           />
//         )}

//         {/* Main content */}
//         <div
//           className="main-content"
//           style={{
//             marginLeft: sidebarOpen && window.innerWidth > 768 ? "20%" : "0",
//             width: sidebarOpen && window.innerWidth > 768 ? "80%" : "100%",
//             // backgroundColor: "#f7f2f2",
//             // backgroundColor:"#fffde7",
//             padding: "1rem",
//             transition: "margin-left 0.3s ease, width 0.3s ease",
//             minHeight: "calc(100vh - 60px)",
//             marginTop: 0,
//           }}
//         >
//           <AppRoutes />
//         </div>
//       </div>

//     </>
//   )
// }

// export default App

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import AppRoutes from "./AppRoutes";
import AdminSidebar from "./components/AdminSidebar";
import Header from "./components/Header";
import Sidebar_menu from "./components/Admin/Sidebar_Menu";
import { useAuth } from "./context/AuthContext";
import "./app.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { auth } = useAuth();

  // 🚨 If not logged in → show ONLY routes (login)
  if (!auth.token) {
    return <AppRoutes />;
  }

  const token = localStorage.getItem("token");
  let userRole = null;

  if (token) {
    try {
      const role = localStorage.getItem("role");
      userRole = role;
      console.log("userrole:", role);
    } catch (err) {
      localStorage.removeItem("token");
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

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
        style={{ display: "flex", paddingTop: "60px", minHeight: "100vh" }}
      >
        <div className={`sidebar ${sidebarOpen ? "open" : "close"}`}>
          {sidebarOpen && (
            <>{userRole === "ADMIN" ? <AdminSidebar /> : <Sidebar_menu />}</>
          )}
        </div>

        <div
          className="main-content"
          style={{
            marginLeft: sidebarOpen && window.innerWidth > 768 ? "20%" : "0",
            width: sidebarOpen && window.innerWidth > 768 ? "80%" : "100%",
            padding: "1rem",
            // backgroundColor: "#f2fcfb",
            zIndex:"1",
          }}
        >
          <AppRoutes />
        </div>
      </div>
    </>
  );
}

export default App;

// import { useState, useEffect } from "react";
// import AppRoutes from "./AppRoutes";
// import AdminSidebar from "./components/AdminSidebar";
// import Header from "./components/Header";
// import Sidebar_menu from "./components/Admin/Sidebar_Menu";

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   // ✅ IF NOT LOGGED IN → SHOW ONLY ROUTES (LOGIN / REGISTER)
//   if (!token) {
//     return <AppRoutes />;
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
//       {/* Header */}
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

//       {/* Content */}
//       <div
//         className="content"
//         style={{
//           display: "flex",
//           paddingTop: "60px",
//           minHeight: "100vh",
//         }}
//       >
//         {/* Sidebar */}
//         <div
//           className="sidebar"
//           style={{
//             width: sidebarOpen ? "20%" : "0",
//             overflowX: "hidden",
//             transition: "width 0.3s ease",
//             backgroundColor: "#fff",
//             height: "calc(100vh - 60px)",
//             position: "fixed",
//             top: "60px",
//             left: 0,
//           }}
//         >
//           {sidebarOpen &&
//             (userRole === "ADMIN" ? (
//               <AdminSidebar />
//             ) : (
//               <Sidebar_menu />
//             ))}
//         </div>

//         {/* Main Content */}
//         <div
//           className="main-content"
//           style={{
//             marginLeft:
//               sidebarOpen && window.innerWidth > 768 ? "20%" : "0",
//             width:
//               sidebarOpen && window.innerWidth > 768 ? "80%" : "100%",
//             padding: "1rem",
//           }}
//         >
//           <AppRoutes />
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
