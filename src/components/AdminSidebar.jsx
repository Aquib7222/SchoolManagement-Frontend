
import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import banner from "../assets/icon/Login_Banner.png";

const AdminSidebar = () => {
  return (
    <div
      style={{
        width: "20%",
        height: "100vh",
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "#070000ff",
        padding: "20px",
        position: "fixed",
        top: "60px",
        left: 0,
        overflowY: "auto",
        boxShadow: "6px 0 12px rgba(0,0,0,0.25)",
      }}
    >
      <ul className="list-unstyled m-0">
        {/* Dashboard */}
        <NavLink to="/" end>
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-speedometer2 sidebar-icon"></i>
              <span className="ms-3">Dashboard</span>
            </li>
          )}
        </NavLink>

        {/* Schools */}
        <NavLink to="/schools">
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-building sidebar-icon"></i>
              <span className="ms-3">Schools</span>
            </li>
          )}
        </NavLink>

        {/* Users */}
        <NavLink to="/admin/users">
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-people sidebar-icon"></i>
              <span className="ms-3">Users</span>
            </li>
          )}
        </NavLink>

        {/* Users */}
        <NavLink to="/admin/modules">
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-people sidebar-icon"></i>
              <span className="ms-3">Modules Creation</span>
            </li>
          )}
        </NavLink>
        {/* Users */}
        <NavLink to="/admin/menus">
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-people sidebar-icon"></i>
              <span className="ms-3">Menu Creation</span>
            </li>
          )}
        </NavLink>

        {/* user group mapping */}
        <NavLink to="/admin/userGroupmapping">
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-people sidebar-icon"></i>
              <span className="ms-3">UserGroup Mapping</span>
            </li>
          )}
        </NavLink>

        {/* school Mapping  */}
        <NavLink to="/admin/schoolMapping">
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-people sidebar-icon"></i>
              <span className="ms-3">School Mapping</span>
            </li>
          )}
        </NavLink>
        {/* user mapping  */}
        <NavLink to="/admin/userMapping">
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-people sidebar-icon"></i>
              <span className="ms-3">User Mapping</span>
            </li>
          )}
        </NavLink>

         {/* Module list  */}
        <NavLink to="/admin/moduleList">
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-people sidebar-icon"></i>
              <span className="ms-3">Module List</span>
            </li>
          )}
        </NavLink>

        {/* Settings */}
        <NavLink to="/admin/settings">
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-gear sidebar-icon"></i>
              <span className="ms-3">Settings</span>
            </li>
          )}
        </NavLink>
      </ul>

      {/* STYLES */}
      <style>{`
        a {
          text-decoration: none;
          color: inherit;
        }

        .sidebar-item {
          cursor: pointer;
          padding: 12px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          transition: background-color 0.3s ease;
        }

        /* HOVER BACKGROUND */
        .sidebar-item:hover {
          background: rgba(13, 110, 253, 0.12);
        }

        /* ACTIVE BACKGROUND */
        .sidebar-item.active {
          background: rgba(13, 110, 253, 0.2);
          font-weight: 600;
        }

        .sidebar-icon {
          font-size: 25px;
          transition: all 0.3s ease;
        }

        /* ICON HOVER GLOW */
        .sidebar-item:hover .sidebar-icon {
          color: #0d6efd;
          text-shadow: 0 0 8px rgba(13, 110, 253, 0.8);
          transform: scale(1.15);
        }

        /* ICON ACTIVE GLOW */
        .sidebar-item.active .sidebar-icon {
          color: #0d6efd;
          text-shadow:
            0 0 6px rgba(13, 110, 253, 0.9),
            0 0 14px rgba(13, 110, 253, 0.7);
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default AdminSidebar;
