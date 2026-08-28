// import { useState, useEffect, useRef } from "react";
// import { RiAccountBoxLine } from "react-icons/ri";
// import { TbLogout2 } from "react-icons/tb";
// import { VscThreeBars } from "react-icons/vsc";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/icon/zyntaks.png";
// import "./Header.css";
// import {
//   FaBell,
//   FaSearch,
//   FaMoon,
//   FaCog,
//   FaUserCircle,
//   FaEnvelope,
// } from "react-icons/fa";

// const Header = ({ toggleSidebar }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [time, setTime] = useState("");
//   const [greeting, setGreeting] = useState("");
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     const updateClock = () => {
//       const now = new Date();

//       setTime(
//         now.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       );

//       const hour = now.getHours();

//       if (hour < 12) {
//         setGreeting("🌞 Good Morning");
//       } else if (hour < 17) {
//         setGreeting("☀ Good Afternoon");
//       } else if (hour < 21) {
//         setGreeting("🌇 Good Evening");
//       } else {
//         setGreeting("🌙 Good Night");
//       }
//     };

//     updateClock();

//     const interval = setInterval(updateClock, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const user = JSON.parse(localStorage.getItem("user"));
//   console.log("user", user);

//   const handleDashboard = () => {
//     navigate("/");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   const toggleDropdown = () => {
//     setShowDropdown((prev) => !prev);
//   };

//   const LoginSchoolName =
//     JSON.parse(localStorage.getItem("User Logged in")) || {};
//   const profilePic =
//     localStorage.getItem("profilePic") || "https://i.pravatar.cc/150?img=12";

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // date
//   const today = new Date();

//   const formattedDate = today.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <div style={{ position: "relative", width: "100%" }}>
//       {/* Header Main Content */}
//       <div
//         className="d-flex  align-items-center px-4"
//         style={{
//           width: "100%",
//           height: "60px",
//           backgroundColor: "white",
//           color: "black",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         {/* Left: Logo & Sidebar Toggle */}
//         <div className="header-left">
          

//           <img
//             src={logo}
//             alt="Logo"
//             className="school-logo"
//             onClick={() => navigate("/")}
//           />

          
//         </div>

//         {/* Right: School Name & Profile Dropdown */}
//         <div className="header-right">

//           <div className="bar-school">
//             <VscThreeBars className="menu-icon" onClick={toggleSidebar} />

//           <h5 className="school-name ">
//             {user?.school?.schoolName || "School Name"}
//           </h5>
//           </div>

//           <div className="profile-box" onClick={toggleDropdown}>
//             <img src={profilePic} alt="Profile" className="profile-img" />

//             <span className="profile-user">{user?.name || "User"}</span>
//           </div>

//           {/* Dropdown Menu */}
//           {showDropdown && (
//             <div
//               ref={dropdownRef}
//               style={{
//                 position: "absolute",
//                 top: "60px",
//                 right: "0px",
//                 width: "220px",
//                 backgroundColor: "#ffffff",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//                 boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
//                 zIndex: 1000,
//                 color: "#333",
//               }}
//             >
//               <ul style={{ listStyle: "none", margin: 0, padding: "10px 0" }}>
//                 <li
//                   style={{
//                     padding: "10px 20px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "10px",
//                     cursor: "default",
//                   }}
//                 >
//                   {/* <FaUserTie /> */}
//                   {user?.email || "ROLE"}
//                 </li>
//                 <li
//                   style={{
//                     padding: "10px 20px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "10px",
//                     cursor: "default",
//                   }}
//                 >
//                   {/* <FaUserTie /> */}
//                   {user.role || "ROLE"}
//                 </li>
//                 <li
//                   style={{
//                     padding: "10px 20px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "10px",
//                     cursor: "pointer",
//                     transition: "background 0.2s",
//                   }}
//                   onClick={() => alert("Account Settings")}
//                   onMouseOver={(e) =>
//                     (e.currentTarget.style.backgroundColor = "#f1f5f9")
//                   }
//                   onMouseOut={(e) =>
//                     (e.currentTarget.style.backgroundColor = "transparent")
//                   }
//                 >
//                   <RiAccountBoxLine /> Account Settings
//                 </li>
//                 <li
//                   style={{
//                     padding: "10px 20px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "10px",
//                     cursor: "pointer",
//                     transition: "background 0.2s",
//                   }}
//                   onClick={handleLogout}
//                   onMouseOver={(e) =>
//                     (e.currentTarget.style.backgroundColor = "#fee2e2")
//                   }
//                   onMouseOut={(e) =>
//                     (e.currentTarget.style.backgroundColor = "transparent")
//                   }
//                 >
//                   <TbLogout2 color="red" /> Logout
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Bottom shadow bar - 80% wide */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: "20%",
//           width: "80%",
//           height: "8px",
//           // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//           borderRadius: "4px",
//           zIndex: 0,
//         }}
//       ></div>
//     </div>


//   );
// };

// export default Header;

import { useState, useEffect, useRef } from "react";
import { RiAccountBoxLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { VscThreeBars } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

import logo from "../assets/icon/zyntaks.png";
import "./Header.css";

import {
  FaBell,
  FaSearch,
  FaMoon,
  FaCog,
  FaUserCircle,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "null") || {};

  const profilePic =
    localStorage.getItem("profilePic") ||
    "https://i.pravatar.cc/150?img=12";

  /* =========================================
     LIVE CLOCK + GREETING
  ========================================= */

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );

      const hour = now.getHours();

      if (hour < 12) {
        setGreeting("Good Morning");
      } else if (hour < 17) {
        setGreeting("Good Afternoon");
      } else if (hour < 21) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
      }
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  /* =========================================
     OUTSIDE CLICK
  ========================================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================================
     DATE
  ========================================= */

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  /* =========================================
     LOGOUT
  ========================================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("AdminToken");
    localStorage.removeItem("role");

    navigate("/login");
  };

  /* =========================================
     USER NAME
  ========================================= */

  const userName =
    user?.name ||
    user?.username ||
    user?.firstName ||
    "Administrator";

  const userRole =
    user?.role ||
    localStorage.getItem("role") ||
    "ADMIN";

  const schoolName =
    user?.school?.schoolName ||
    user?.schoolName ||
    "ZYNTaks Administration";

  return (
    <header className="premium-header">

      {/* =========================================
          LEFT SECTION
      ========================================= */}

      <div className="header-left-section">

        {/* LOGO */}

        <div
          className="header-logo-box"
          onClick={() => navigate("/")}
          title="Dashboard"
        >
          <img
            src={logo}
            alt="ZYNTaks"
            className="header-logo"
          />
        </div>

        {/* DIVIDER */}

        <div className="header-divider"></div>

        {/* SIDEBAR TOGGLE */}

        <button
          className="sidebar-toggle-btn"
          onClick={toggleSidebar}
          title="Toggle Sidebar"
        >
          <VscThreeBars size={22} />
        </button>

        {/* GREETING */}

        <div className="header-greeting">

          <div className="greeting-text">
            {greeting}, <strong>{userName}</strong>
          </div>

          <div className="greeting-date">
            {formattedDate}
          </div>

        </div>

      </div>


      {/* =========================================
          CENTER SCHOOL AREA
      ========================================= */}

      <div className="header-center">

        <div className="school-info">

          <div className="school-icon">
            <FaUserCircle size={19} />
          </div>

          <div className="school-details">

            <span className="school-label">
              ORGANIZATION
            </span>

            <span className="school-name">
              {schoolName}
            </span>

          </div>

        </div>

      </div>


      {/* =========================================
          RIGHT SECTION
      ========================================= */}

      <div className="header-right-section">

        {/* SEARCH */}

        <div className="header-search">

          <FaSearch size={14} />

          <input
            type="text"
            placeholder="Search..."
          />

          <span className="search-shortcut">
            Ctrl K
          </span>

        </div>


        {/* TIME */}

        <div className="header-time">

          <div className="time-value">
            {time}
          </div>

          <div className="time-label">
            Local Time
          </div>

        </div>


        {/* NOTIFICATION */}

        <button
          className="header-action-btn notification-btn"
          title="Notifications"
          onClick={() => alert("Notifications")}
        >
          <FaBell size={17} />

          <span className="notification-dot"></span>
        </button>


        {/* SETTINGS */}

        <button
          className="header-action-btn"
          title="Settings"
          onClick={() => navigate("/admin/modules")}
        >
          <FaCog size={17} />
        </button>


        {/* PROFILE */}

        <div
          className="profile-wrapper"
          ref={dropdownRef}
        >

          <button
            className="profile-trigger"
            onClick={() =>
              setShowDropdown((prev) => !prev)
            }
          >

            <img
              src={profilePic}
              alt="Profile"
              className="profile-image"
            />

            <div className="profile-info">

              <span className="profile-name">
                {userName}
              </span>

              <span className="profile-role">
                {userRole}
              </span>

            </div>

            <FaChevronDown
              size={11}
              className={`profile-chevron ${
                showDropdown ? "rotate" : ""
              }`}
            />

          </button>


          {/* =========================================
              PROFILE DROPDOWN
          ========================================= */}

          {showDropdown && (

            <div className="profile-dropdown">

              {/* PROFILE HEADER */}

              <div className="dropdown-profile">

                <img
                  src={profilePic}
                  alt="Profile"
                />

                <div>

                  <div className="dropdown-name">
                    {userName}
                  </div>

                  <div className="dropdown-email">
                    {user?.email || "admin@zyntaks.com"}
                  </div>

                </div>

              </div>


              <div className="dropdown-divider"></div>


              {/* ROLE */}

              <div className="dropdown-info">

                <span>Role</span>

                <strong>
                  {userRole}
                </strong>

              </div>


              {/* ACCOUNT */}

              <button
                className="dropdown-item"
                onClick={() => {
                  setShowDropdown(false);
                  alert("Account Settings");
                }}
              >
                <span className="dropdown-item-icon">
                  <RiAccountBoxLine />
                </span>

                <span>
                  Account Settings
                </span>
              </button>


              {/* PROFILE */}

              <button
                className="dropdown-item"
                onClick={() => {
                  setShowDropdown(false);
                  alert("Profile");
                }}
              >
                <span className="dropdown-item-icon">
                  <FaUserCircle />
                </span>

                <span>
                  My Profile
                </span>
              </button>


              {/* NOTIFICATION */}

              <button
                className="dropdown-item"
                onClick={() => {
                  setShowDropdown(false);
                  alert("Notification Settings");
                }}
              >
                <span className="dropdown-item-icon">
                  <FaBell />
                </span>

                <span>
                  Notifications
                </span>
              </button>


              <div className="dropdown-divider"></div>


              {/* LOGOUT */}

              <button
                className="dropdown-item logout-item"
                onClick={handleLogout}
              >

                <span className="dropdown-item-icon logout-icon">
                  <TbLogout2 />
                </span>

                <span>
                  Logout
                </span>

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
};

export default Header;