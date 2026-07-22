import { useState, useEffect, useRef } from "react";
import { RiAccountBoxLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { VscThreeBars } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icon/web_logo.png";

const Header = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const role = localStorage.getItem("role");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);

  const handleDashboard = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const LoginSchoolName =
    JSON.parse(localStorage.getItem("User Logged in")) || {};
  const profilePic =
    localStorage.getItem("profilePic") || "https://i.pravatar.cc/150?img=12";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Header Main Content */}
      <div
        className="d-flex flex-wrap align-items-center px-4"
        style={{
          width: "100%",
          height: "60px",
          backgroundColor: "white",
          color: "black",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: Logo & Sidebar Toggle */}
        <div
          className="flex-grow-1 d-flex align-items-center justify-content-between"
          style={{ flexBasis: "20%" }}
        >
          {/* <h4
            className="m-2 m-md-0"
            style={{ cursor: "pointer" }}
            onClick={handleDashboard}
          >
            EduMatrix
          </h4> */}
          <img
            src={logo}
            alt=""
            style={{ height: "60px", width: "150px", marginTop: "2px",cursor: "pointer" }}
            onClick={() => navigate("/")}

          />
          <VscThreeBars
            size={22}
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={toggleSidebar}
          />
        </div>

        {/* Right: School Name & Profile Dropdown */}
        <div
          className="d-flex align-items-center justify-content-between gap-3"
          style={{ flexBasis: "80%" }}
        >
          <h5 className="m-0">{user?.school?.schoolName || "School Name"}</h5>

          <div style={{ cursor: "pointer" }} onClick={toggleDropdown}>
            <div
              className="d-flex align-items-center"
              style={{ padding: "6px 12px" }}
            >
              <img
                src={profilePic}
                alt="Profile"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
              <span style={{ fontWeight: "500" }}>{user?.name || "User"}</span>
            </div>
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              style={{
                position: "absolute",
                top: "60px",
                right: "0px",
                width: "220px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                zIndex: 1000,
                color: "#333",
              }}
            >
              <ul style={{ listStyle: "none", margin: 0, padding: "10px 0" }}>
                <li
                  style={{
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "default",
                  }}
                >
                  {/* <FaUserTie /> */}
                  {user?.email || "ROLE"}
                </li>
                <li
                  style={{
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "default",
                  }}
                >
                  {/* <FaUserTie /> */}
                  {user.role || "ROLE"}
                </li>
                <li
                  style={{
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onClick={() => alert("Account Settings")}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f1f5f9")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <RiAccountBoxLine /> Account Settings
                </li>
                <li
                  style={{
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onClick={handleLogout}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fee2e2")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <TbLogout2 color="red" /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bottom shadow bar - 80% wide */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "20%",
          width: "80%",
          height: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          borderRadius: "4px",
          zIndex: 0,
        }}
      ></div>
    </div>
  );
};

export default Header;
