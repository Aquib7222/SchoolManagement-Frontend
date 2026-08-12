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

const AdminSidebar = () => {
  return (
    <div
      className=" "
      style={{
        padding: "15px 15px",
        display: "flex",
        flexDirection: "column",
        height: "95vh",
        width: "100%",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",

        // backgroundRepeat: "no-repeat",
        borderRight: "1px solid black",
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
            <strong className="ms-3">Organization Management</strong>
          </div>

          <ul className="list-unstyled ms-4">
            <NavLink to="/add/schools" className="text-decoration-none">
              {({ isActive }) => (
                <>
                  <li
                    className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                  >
                    <small>
                      <IoSchoolOutline size={20} /> Schools Creation
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

            <NavLink to="/school-mapping" className="text-decoration-none">
              {({ isActive }) => (
                <li
                  className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                >
                  <small>
                    <SiFreelancermap size={20} /> School Mapping
                  </small>
                </li>
              )}
            </NavLink>
          </ul>
        </li>

        {/* Super Admin Management */}
        <li className="">
          <div className="py-2 d-flex align-items-center">
            <strong className="ms-3">Super Admin Management</strong>
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
            <strong className="ms-3">Module Management</strong>
          </div>

          <ul className="list-unstyled ms-4">
            <NavLink to="/admin/modules" className="text-decoration-none">
              {({ isActive }) => (
                <>
                  <li
                    className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                  >
                    <small>
                      <MdViewModule size={20} /> Module Creations
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
                    <PiListBulletsFill size={20} /> Module List
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
                      <MdViewModule size={20} /> User Group Creation
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
                    <PiListBulletsFill size={20} /> User Group List
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
                    <PiListBulletsFill size={20} /> User Group Mapping
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
            <NavLink to="/admin/modules" className="text-decoration-none">
              {({ isActive }) => (
                <>
                  <li
                    className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
                  >
                    <small>
                      <MdViewModule size={20} /> School Module Mapping
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
                    <PiListBulletsFill size={20} /> School Menu Mapping
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
                    <PiListBulletsFill size={20} /> School User Group Mapping
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
                    <PiListBulletsFill size={20} /> School User Mapping
                  </small>
                </li>
              )}
            </NavLink>
          </ul>
        </li>

        {/* Users */}
        <NavLink to="/admin/users">
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-people sidebar-icon"></i>
              <small className="ms-3">Users</small>
            </li>
          )}
        </NavLink>

        {/* Users */}
        <NavLink to="/admin/modules">
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-people sidebar-icon"></i>
              <small className="ms-3">Modules Creation</small>
            </li>
          )}
        </NavLink>

        {/* user group mapping */}
        <NavLink to="/admin/userGroupmapping">
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-people sidebar-icon"></i>
              <small className="ms-3">UserGroup Mapping</small>
            </li>
          )}
        </NavLink>

        {/* school Mapping  */}
        <NavLink to="/admin/schoolMapping">
          {({ isActive }) => (
            <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
              <i className="bi bi-people sidebar-icon"></i>
              <small className="ms-3">School Mapping</small>
            </li>
          )}
        </NavLink>

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
                      <MdViewModule size={20} /> General Settings
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
                    <PiListBulletsFill size={20} /> Role & Permission
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
                    <PiListBulletsFill size={20} /> Notification Settings
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
                    <PiListBulletsFill size={20} /> System Log
                  </small>
                </li>
              )}
            </NavLink>
          </ul>
        </li>
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
