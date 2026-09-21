
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaCog,
  FaUserCircle,
  FaChevronDown,
  FaUser,
  FaRegBell,
  FaUserShield,
  FaSlidersH,
  FaCube,
  FaUserPlus,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaBus,
  FaChartBar,
  FaCogs,
  FaBook,
  FaUsers,
  FaFileAlt,
  FaUniversity,
  FaSearch,
} from "react-icons/fa";
import {
  MdLogout,
  MdOutlineSettings,
  MdKeyboardArrowRight,
  MdMenu,
} from "react-icons/md";
import logo from "../assets/icon/zyntaks.png";
import axiosInstance from "../api/axiosInstance";
import "./Header.css";
/* ========================================================= SAME AS SIDEBAR LOAD ALL ICON ASSETS FROM FRONTEND ========================================================= */ const images =
  import.meta.glob("../assets/icon/*", { eager: true, import: "default" });
const imageMap = {};
Object.keys(images).forEach((path) => {
  const fileName = path.split("/").pop();
  imageMap[fileName] = images[path];
});
 const Header =
  ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModuleDropdown, setShowModuleDropdown] = useState(false);
    const [time, setTime] = useState("");
    const [greeting, setGreeting] = useState("");
    const [sidebarModules, setSidebarModules] = useState([]);
    const [moduleLoading, setModuleLoading] = useState(false);
    const dropdownRef = useRef(null);
    const moduleDropdownRef = useRef(null);
  const user =
      JSON.parse(localStorage.getItem("user") || "null") || {};
    const profilePic =
      localStorage.getItem("profilePic") || "https://i.pravatar.cc/150?img=12";
    const userName =
      user?.name || user?.username || user?.firstName || "Administrator";
    const userRole = user?.role || localStorage.getItem("role") || "ADMIN";
    const schoolName =
      user?.school?.schoolName || user?.schoolName || "ZYNTaks Administration";
    const userEmail = user?.email || "admin@zyntaks.com";
    const schoolId =
      user?.schoolId || user?.school?.id || localStorage.getItem("schoolId");
    const groupId =
      user?.groupId || user?.userGroupId || localStorage.getItem("groupId");
     const getModuleIcon =
      (moduleName) => {
        const name = String(moduleName || "").toLowerCase();
        if (name.includes("admission")) return FaUserPlus;
        if (name.includes("student") || name.includes("profile")) {
          return FaUserGraduate;
        }
        if (name.includes("teacher") || name.includes("staff")) {
          return FaChalkboardTeacher;
        }
        if (name.includes("attendance") || name.includes("present")) {
          return FaCalendarCheck;
        }
        if (name.includes("fee") || name.includes("payment")) {
          return FaMoneyBillWave;
        }
        if (
          name.includes("assessment") ||
          name.includes("exam") ||
          name.includes("result")
        ) {
          return FaClipboardCheck;
        }
        if (name.includes("transport") || name.includes("vehicle")) {
          return FaBus;
        }
        if (name.includes("report")) return FaChartBar;
        if (name.includes("library") || name.includes("book")) {
          return FaBook;
        }
        if (name.includes("user") || name.includes("management")) {
          return FaUsers;
        }
        if (
          name.includes("setup") ||
          name.includes("setting") ||
          name.includes("configuration")
        ) {
          return FaCogs;
        }
        if (name.includes("search")) return FaSearch;
        if (name.includes("tc") || name.includes("certificate")) {
          return FaFileAlt;
        }
        if (name.includes("school") || name.includes("organization")) {
          return FaUniversity;
        }
        return FaCube;
      };
    
    /* ========================================================= CLOCK ========================================================= */ useEffect(() => {
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
    /* ========================================================= LOAD MODULES SAME API AS SIDEBAR ========================================================= */ useEffect(() => {
      const loadModules = async () => {
        /* ADMIN uses separate AdminSidebar. Module dropdown is for school users. */ if (
          String(userRole).toUpperCase() === "ADMIN"
        ) {
          setSidebarModules([]);
          return;
        }
        if (!schoolId || !groupId) {
          setSidebarModules([]);
          return;
        }
        try {
          setModuleLoading(true);
          const token =
            localStorage.getItem("token") || localStorage.getItem("AdminToken");
          const res = await axiosInstance.get("/api/school-mapping/sidebar", {
            params: { schoolId, groupId },
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Header Sidebar response:", res.data);
          const sidebarData = Array.isArray(res.data) ? res.data : [];
          /* ===================================================== SAME MODULE STRUCTURE AS SIDEBAR ===================================================== */ const modules =
            sidebarData
              .map((item) => ({
                id: item.id,
                name: item.label || "Module",
                image: item.image || null,
                path: item.path || "",
                sequenceNumber: Number(item.sequenceNumber) || 0,
                subMenus: Array.isArray(item.subMenus) ? item.subMenus : [],
              }))
              .filter((item) => item.id);
          /* ===================================================== SORT BY SEQUENCE NUMBER ===================================================== */ modules.sort(
            (a, b) => a.sequenceNumber - b.sequenceNumber,
          );
          /* ===================================================== REMOVE DUPLICATE MODULE LABELS ===================================================== */ const uniqueModules =
            [];
          const moduleNames = new Set();
          modules.forEach((module) => {
            const normalizedName = String(module.name || "")
              .trim()
              .toLowerCase();
            if (!moduleNames.has(normalizedName)) {
              moduleNames.add(normalizedName);
              uniqueModules.push(module);
            }
          });
          setSidebarModules(uniqueModules);
        } catch (error) {
          console.error("Header module loading failed:", error);
          console.error("Response:", error?.response?.data);
          setSidebarModules([]);
        } finally {
          setModuleLoading(false);
        }
      };
      loadModules();
    }, [schoolId, groupId, userRole]);
    /* ========================================================= DATE ========================================================= */ const formattedDate =
      new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    /* ========================================================= OUTSIDE CLICK ========================================================= */ useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setShowDropdown(false);
        }
        if (
          moduleDropdownRef.current &&
          !moduleDropdownRef.current.contains(event.target)
        ) {
          setShowModuleDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    /* ========================================================= ESCAPE ========================================================= */ useEffect(() => {
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          setShowDropdown(false);
          setShowModuleDropdown(false);
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, []);
    /* ========================================================= NAVIGATION ========================================================= */ const handleNavigate =
      (path) => {
        if (!path) return;
        setShowDropdown(false);
        setShowModuleDropdown(false);
        navigate(path);
      };
    /* ========================================================= MODULE CLICK ========================================================= */ const handleModuleClick =
      (module) => {
        /* If module itself has a path, use it first. */ if (module?.path) {
          handleNavigate(module.path);
          return;
        }
        /* Most modules have path="" so open first available submenu. */ const firstSubMenu =
          Array.isArray(module?.subMenus)
            ? module.subMenus.find((subMenu) => subMenu?.path)
            : null;
        if (firstSubMenu?.path) {
          handleNavigate(firstSubMenu.path);
          return;
        }
        console.log("No navigation path available for:", module?.name);
      };
    /* ========================================================= LOGOUT ========================================================= */ const handleLogout =
      () => {
        localStorage.removeItem("token");
        localStorage.removeItem("AdminToken");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        localStorage.removeItem("schoolId");
        localStorage.removeItem("groupId");
        localStorage.removeItem("userGroupId");
        navigate("/login");
      };
    /* ========================================================= RENDER ========================================================= */ return (
      <header className="premium-header">
        
        {/* ===================================================== LEFT ===================================================== */}
        <div className="header-left-section">
          
          {/* LOGO */}
          <div className="header-logo-box" onClick={() => navigate("/")}>
            
            <img
              src={logo}
              alt="ZYNTaks Education"
              className="header-logo"
            />
          </div>
          <div className="header-divider" /> {/* SIDEBAR BUTTON */}
          <button
            type="button"
            className="sidebar-toggle-btn"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            
            <MdMenu size={23} />
          </button>
          {/* GREETING */}
          <div className="header-greeting">
            
            <div className="greeting-text">
              
              {greeting}, <strong>{userName}</strong>
            </div>
            <div className="greeting-date"> {formattedDate} </div>
          </div>
        </div>
      
        <div className="header-center">
          
          <div className="school-info">
            
            <div className="school-icon">
              
              <FaUniversity size={16} />
            </div>
            <div className="school-details">
             
              <span className="school-label"> SCHOOL MANAGEMENT </span>
              <span className="school-name"> {schoolName} </span>
            </div>
          </div>
        </div>
      
        <div className="header-right-section">
          
          {/* SEARCH */}
          <div className="header-search">
            
            <FaSearch size={12} /> <input type="text" placeholder="Search..." />
            <span className="search-shortcut"> / </span>
          </div>
          {/* TIME */}
          <div className="header-time">
            
            <div className="time-value"> {time} </div>
            <div className="time-label"> Local Time </div>
          </div>
          {/* NOTIFICATION */}
          <button
            type="button"
            className="header-action-btn"
            aria-label="Notifications"
          >
            
            <FaRegBell size={17} /> <span className="notification-dot" />
          </button>
          {/* SETTINGS */}
          <button
            type="button"
            className="header-action-btn"
            aria-label="Settings"
            onClick={() => navigate("/settings")}
          >
            
            <MdOutlineSettings size={19} />
          </button>
          {/* ================================================= MODULE BUTTON ================================================= */}
          {String(userRole).toUpperCase() !== "ADMIN" && (
            <div className="module-header-wrapper" ref={moduleDropdownRef}>
              
              <button
                type="button"
                className={`header-action-btn module-header-btn ${showModuleDropdown ? "module-btn-active" : ""}`}
                onClick={() => setShowModuleDropdown((prev) => !prev)}
                aria-label="Modules"
              >
                
                <FaCube size={17} />
                {sidebarModules.length > 0 && (
                  <span className="module-count-dot">
                    
                    {sidebarModules.length}
                  </span>
                )}
              </button>
              {/* ================================================= MODULE DROPDOWN ================================================= */}
              {showModuleDropdown && (
                <div className="module-dropdown">
                  
                  {/* HEADER */}
                  <div className="module-dropdown-header">
                    
                    <div className="module-dropdown-title-row">
                      
                      <div className="module-dropdown-main-icon">
                        
                        <FaCube size={15} />
                      </div>
                      <div>
                        
                        <div className="module-dropdown-title">
                          
                          Modules
                        </div>
                        <div className="module-dropdown-subtitle">
                          
                          Available modules
                        </div>
                      </div>
                    </div>
                    <div className="module-total-badge">
                      
                      {sidebarModules.length}
                    </div>
                  </div>
                  <div className="module-dropdown-divider" />
                  {/* ================================================= ICON GRID ================================================= */}
                  <div className="module-icon-grid">
                    
                    {moduleLoading ? (
                      <div className="module-loading">
                        
                        <div className="module-spinner" />
                        <span> Loading modules... </span>
                      </div>
                    ) : sidebarModules.length === 0 ? (
                      <div className="module-empty">
                        
                        <div className="module-empty-icon">
                          
                          <FaCube size={18} />
                        </div>
                        <div className="module-empty-title">
                          
                          No modules available
                        </div>
                      </div>
                    ) : (
                      sidebarModules.map((module, index) => {
                        const Icon = getModuleIcon(module.name);
                        // const theme = moduleColors[index % moduleColors.length];
                        const imageSrc =
                          module?.image && imageMap[module.image]
                            ? imageMap[module.image]
                            : null;
                        return (
                          <button
                            type="button"
                            key={module.id}
                            className="module-icon-item"
                            title={module.name}
                            // style={{
                            //   "--module-color": theme.color,
                            //   "--module-bg": theme.bg,
                            //   "--module-border": theme.border,
                            // }}
                            onClick={() => handleModuleClick(module)}
                          >
                            
                            {/* SHINE */} <span className="module-icon-shine" />
                            {/* ICON */}
                            <span className="module-only-icon">
                              
                              {imageSrc ? (
                                <img src={imageSrc} alt="" />
                              ) : (
                                <Icon size={21} />
                              )}
                            </span>
                            {/* GLOW */}
                            <span className="module-icon-glow" />
                          </button>
                        );
                      })
                    )}
                  </div>
                  {/* FOOTER */}
                  {sidebarModules.length > 0 && (
                    <div className="module-dropdown-footer">
                      
                      <FaCube size={10} />
                      <span> Click an icon to open module </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {/* ================================================= PROFILE ================================================= */}
          <div className="profile-wrapper" ref={dropdownRef}>
            
            <button
              type="button"
              className={`profile-trigger ${showDropdown ? "active" : ""}`}
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              
              <img
                src={profilePic}
                alt={userName}
                className="profile-image"
              />
              <div className="profile-info">
                
                <div className="profile-name"> {userName} </div>
                <div className="profile-role"> {userRole} </div>
              </div>
              <FaChevronDown
                size={11}
                className={`profile-chevron ${showDropdown ? "rotate" : ""}`}
              />
            </button>
            {/* ================================================= PROFILE DROPDOWN ================================================= */}
            {showDropdown && (
              <div className="profile-dropdown">
                
                <div className="dropdown-profile">
                  
                  <div className="dropdown-avatar-wrapper">
                    
                    <img
                      src={profilePic}
                      alt={userName}
                      className="dropdown-avatar"
                    />
                    <span className="online-status" />
                  </div>
                  <div className="dropdown-profile-details">
                    
                    <div className="dropdown-name"> {userName} </div>
                    <div className="dropdown-role-row">
                      
                      <span className="role-badge">
                        
                        <FaUserShield size={8} /> {userRole}
                      </span>
                    </div>
                    <div className="dropdown-email"> {userEmail} </div>
                  </div>
                </div>
                <div className="dropdown-divider" />
                <button
                  type="button"
                  className="dropdown-menu-item"
                  onClick={() => handleNavigate("/profile")}
                >
                  
                  <div className="dropdown-menu-left">
                    
                    <div className="dropdown-menu-icon">
                      
                      <FaUser size={13} />
                    </div>
                    <span className="dropdown-menu-text">
                      
                      My Profile
                    </span>
                  </div>
                  <MdKeyboardArrowRight
                    size={18}
                    className="dropdown-arrow"
                  />
                </button>
                <button
                  type="button"
                  className="dropdown-menu-item"
                  onClick={() => handleNavigate("/settings")}
                >
                  
                  <div className="dropdown-menu-left">
                    
                    <div className="dropdown-menu-icon">
                      
                      <FaSlidersH size={13} />
                    </div>
                    <span className="dropdown-menu-text"> Settings </span>
                  </div>
                  <MdKeyboardArrowRight
                    size={18}
                    className="dropdown-arrow"
                  />
                </button>
                <div className="dropdown-divider" />
                <button
                  type="button"
                  className="dropdown-menu-item logout-menu-item"
                  onClick={handleLogout}
                >
                  
                  <div className="dropdown-menu-left">
                    
                    <div className="dropdown-menu-icon">
                      
                      <MdLogout size={16} />
                    </div>
                    <span className="dropdown-menu-text"> Logout </span>
                  </div>
                  <MdKeyboardArrowRight
                    size={18}
                    className="dropdown-arrow"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  };
export default Header;
