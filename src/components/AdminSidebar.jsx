import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import banner from "../assets/icon/Login_Banner.png";
import { IoSchoolOutline } from "react-icons/io5";
import { FaRegListAlt, FaUserFriends, FaUserPlus } from "react-icons/fa";
import { SiFreelancermap } from "react-icons/si";
import { MdDashboard, MdViewModule } from "react-icons/md";
import { PiListBulletsFill } from "react-icons/pi";
import {
  LuBell,
  LuFileClock,
  LuLink,
  LuLink2,
  LuList,
  LuMenu,
  LuPackage,
  LuPackagePlus,
  LuSchool,
  LuSettings2,
  LuShieldCheck,
  LuUsersRound,
} from "react-icons/lu";
import { TfiMenuAlt } from "react-icons/tfi";

const AdminSidebar = () => {
  return (
    <div
  className="admin-sidebar"
  style={{
    padding: "15px 15px",
    display: "flex",
    flexDirection: "column",
    height: "90vh",
    width: "100%",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    overflowY: "auto",
    overflowX: "hidden",
  }}
>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          marginBottom: "20px",
          marginLeft: "20px",
        }}
      >
        {/* Dashboard */}
        <NavLink to="/" end>
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              {/* <i className="bi bi-speedometer2 sidebar-icon"></i> */}
              <strong className="ms-2">
                <MdDashboard size={25} /> Dashboard
              </strong>
            </li>
          )}
        </NavLink>

        {/* Organization Management */}
        <li className="">
          <div className="py-2 d-flex align-items-center">
            <strong className="ms-3">
              <LuSchool size={25} className="me-2" /> Organization Management
            </strong>
          </div>

          <ul className="list-unstyled ms-4">
            <NavLink to="/add/schools" className="text-decoration-none">
              {({ isActive }) => (
                <>
                  <li
                    className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                  >
                    <small>
                      <LuSchool size={20} /> Schools Creation
                    </small>
                  </li>
                </>
              )}
            </NavLink>

            <NavLink to="/school-list" className="text-decoration-none">
              {({ isActive }) => (
                <li
                  className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                >
                  <small>
                    <FaRegListAlt size={20} /> School List
                  </small>
                </li>
              )}
            </NavLink>
          </ul>
        </li>

        {/* Super Admin Management */}
        <li className="">
          <div className="py-2 d-flex align-items-center">
            <strong className="ms-3">
              <FaUserPlus size={26} className="me-2" />
              Super Admin Management
            </strong>
          </div>

          <ul className="list-unstyled ms-4">
            <NavLink to="/add/superadmins" className="text-decoration-none">
              {({ isActive }) => (
                <>
                  <li
                    className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                  >
                    <small>
                      <FaUserPlus size={20} /> Create Super Admins
                    </small>
                  </li>
                </>
              )}
            </NavLink>

            <NavLink to="/superadmin-list" className="text-decoration-none">
              {({ isActive }) => (
                <li
                  className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                >
                  <small>
                    <FaUserFriends size={20} /> Super Admin List
                  </small>
                </li>
              )}
            </NavLink>
          </ul>
        </li>

        {/* Module Management */}
        <li className=" ">
          <div className="py-2 d-flex align-items-center">
            <strong className="ms-3">
              <LuPackage size={25} className="me-2" /> Module Management
            </strong>
          </div>

          <ul className="list-unstyled ms-4">
            <NavLink to="/admin/modules" className="text-decoration-none">
              {({ isActive }) => (
                <>
                  <li
                    className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                  >
                    <small>
                      <LuPackagePlus size={20} /> Module Creations
                    </small>
                  </li>
                </>
              )}
            </NavLink>

            <NavLink to="/admin/moduleList" className="text-decoration-none">
              {({ isActive }) => (
                <li
                  className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                >
                  <small>
                    <LuPackage size={20} /> Module List
                  </small>
                </li>
              )}
            </NavLink>

            <NavLink
              to="/admin/menus/creation"
              className="text-decoration-none"
            >
              {({ isActive }) => (
                <li
                  className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                >
                  <small>
                    <TfiMenuAlt size={20} /> Menu Creation
                  </small>
                </li>
              )}
            </NavLink>
            <NavLink to="/admin/menus/all" className="text-decoration-none">
              {({ isActive }) => (
                <li
                  className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                >
                  <small>
                    <LuMenu size={20} /> Menu List
                  </small>
                </li>
              )}
            </NavLink>
          </ul>
        </li>

        {/* User Group Management */}
        <li className=" ">
          <div className="py-2 d-flex align-items-center">
            <strong className="ms-3">User Group Management</strong>
          </div>

          <ul className="list-unstyled ms-4">
            <NavLink to="/admin/modules" className="text-decoration-none">
              {({ isActive }) => (
                <>
                  <li
                    className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                  >
                    <small>
                      <LuUsersRound size={20} /> User Group Creation
                    </small>
                  </li>
                </>
              )}
            </NavLink>

            <NavLink to="/admin/moduleList" className="text-decoration-none">
              {({ isActive }) => (
                <li
                  className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                >
                  <small>
                    <LuUsersRound size={20} /> User Group List
                  </small>
                </li>
              )}
            </NavLink>
            <NavLink
              to="/admin/userGroupmapping"
              className="text-decoration-none"
            >
              {({ isActive }) => (
                <li
                  className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                >
                  <small>
                    <LuLink size={20} /> User Group Mapping
                  </small>
                </li>
              )}
            </NavLink>
          </ul>
        </li>

        {/* User Group Management */}
        <li className=" ">
          <div className="py-2 d-flex align-items-center">
            <strong className="ms-3">School Group Mapping</strong>
          </div>

          <ul className="list-unstyled ms-4">
            <NavLink to="/admin/schoolMapping" className="text-decoration-none">
              {({ isActive }) => (
                <>
                  <li
                    className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                  >
                    <small>
                      <LuLink2 size={20} /> School Module Mapping
                    </small>
                  </li>
                </>
              )}
            </NavLink>

            <NavLink
              to="/admin/module-mapping/list"
              className="text-decoration-none"
            >
              {({ isActive }) => (
                <li
                  className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                >
                  <small>
                    <LuList size={20} /> School Module Mapping List
                  </small>
                </li>
              )}
            </NavLink>
          </ul>
        </li>

        {/* User Group Management */}
        <li className=" ">
          <div className="py-2 d-flex align-items-center">
            <strong className="ms-3">System Settings</strong>
          </div>

          <ul className="list-unstyled ms-4">
            <NavLink to="/admin/modules" className="text-decoration-none">
              {({ isActive }) => (
                <>
                  <li
                    className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                  >
                    <small>
                      <LuSettings2 size={20} /> General Settings
                    </small>
                  </li>
                </>
              )}
            </NavLink>

            <NavLink to="/admin/moduleList" className="text-decoration-none">
              {({ isActive }) => (
                <li
                  className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                >
                  <small>
                    <LuShieldCheck size={20} /> Role & Permission
                  </small>
                </li>
              )}
            </NavLink>
            <NavLink
              to="/admin/userGroupmapping"
              className="text-decoration-none"
            >
              {({ isActive }) => (
                <li
                  className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                >
                  <small>
                    <LuBell size={20} /> Notification Settings
                  </small>
                </li>
              )}
            </NavLink>
            <NavLink
              to="/settings/system-log/"
              className="text-decoration-none"
            >
              {({ isActive }) => (
                <li
                  className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                >
                  <small>
                    <LuFileClock size={20} /> System Log
                  </small>
                </li>
              )}
            </NavLink>
          </ul>
        </li>
      </ul>

      {/* STYLES */}
      <style>{`
      .admin-sidebar {
  scrollbar-width: thin;
  scrollbar-color: rgba(13, 110, 253, 0.45) transparent;
}

/* Chrome / Edge / Safari */
.admin-sidebar::-webkit-scrollbar {
  width: 5px;
}

.admin-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.admin-sidebar::-webkit-scrollbar-thumb {
  background: rgba(13, 110, 253, 0.45);
  border-radius: 10px;
}

.admin-sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(13, 110, 253, 0.8);
}
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
