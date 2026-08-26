import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import {
  FaArrowLeft,
  FaEdit,
  FaEye,
  FaPlus,
  FaSearch,
  FaTrash,
  FaUserShield,
  FaCheckCircle,
  FaTimesCircle,
  FaKey,
  FaPowerOff,
  FaSyncAlt,
  FaFilter,
  FaPhone,
  FaEnvelope,
  FaSchool,
  FaPauseCircle,
  FaUserGraduate,
} from "react-icons/fa";

import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { SiAdguard } from "react-icons/si";

const API_BASE = "http://localhost:8080/api/superadmin";

const SuperAdminList = () => {
  const token = localStorage.getItem("token");

  // =========================================================
  // DATA
  // =========================================================

  const [superAdmins, setSuperAdmins] = useState([]);
  const [schools, setSchools] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  // =========================================================
  // LOADING
  // =========================================================

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // =========================================================
  // SEARCH / FILTER
  // =========================================================

  const [search, setSearch] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");
  console.log("schoolFilter",schoolFilter);
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // =========================================================
  // PAGINATION
  // =========================================================

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // =========================================================
  // MODALS
  // =========================================================

  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // =========================================================
  // PASSWORD
  // =========================================================

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] =
    useState("");

  // =========================================================
  // API CONFIG
  // =========================================================

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // =========================================================
  // LOAD
  // =========================================================

  useEffect(() => {
    loadSuperAdmins();
    loadSchools();
    loadUserGroups();
  }, []);

  // =========================================================
  // LOAD SUPER ADMINS
  // =========================================================

  const loadSuperAdmins = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_BASE}/all`,
        axiosConfig
      );

      console.log(
        "Super Admin List:",
        response.data
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.content ||
          response.data?.data ||
          [];

      setSuperAdmins(data);
    } catch (error) {
      console.error(
        "Failed to load Super Admins:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to load Super Admin list."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD SCHOOLS
  // =========================================================

  const loadSchools = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/school/all",
        axiosConfig
      );

      setSchools(response.data || []);
    } catch (error) {
      console.error(
        "Failed to load schools:",
        error
      );
    }
  };

  // =========================================================
  // LOAD USER GROUP
  // =========================================================

  const loadUserGroups = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user-group/all",
        axiosConfig
      );

      setUserGroups(response.data || []);
    } catch (error) {
      console.error(
        "Failed to load user groups:",
        error
      );
    }
  };

  // =========================================================
  // SCHOOL NAME
  // =========================================================

  console.log("school",schools);

  const getSchoolName = (schoolId) => {
    console.log("school id",schoolId);
    const school = schools.find(
      (item) =>
        Number(item.id) === Number(schoolId)
    );

    if (!school) {
      return schoolId
        ? `School #${schoolId}`
        : "All Schools";
    }

    return (
      school.schoolName ||
      school.name ||
      school.schoolCode ||
      `School #${schoolId}`
    );
  };

  // =========================================================
  // USER GROUP NAME
  // =========================================================

  const getUserGroupName = (userGroupId) => {
    const group = userGroups.find(
      (item) =>
        Number(item.id) ===
        Number(userGroupId)
    );

    return (
      group?.groupName ||
      group?.name ||
      "Super Admin"
    );
  };

  // =========================================================
  // STATUS
  // =========================================================

  const isActive = (admin) => {
    return (
      admin.status === "Active" ||
      admin.status === "ACTIVE" ||
      admin.accountStatus === true ||
      admin.active === true
    );
  };

  // =========================================================
  // FILTER
  // =========================================================

  const filteredAdmins = useMemo(() => {
    return superAdmins.filter((admin) => {
      const searchValue =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        String(
          admin.name ||
            admin.fullName ||
            admin.username ||
            ""
        )
          .toLowerCase()
          .includes(searchValue) ||
        String(admin.email || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(admin.phone || "")
          .toLowerCase()
          .includes(searchValue);

      const matchesSchool =
        !schoolFilter ||
        String(
          admin?.school.id
        ) === String(schoolFilter);

      const active = isActive(admin);

      const matchesStatus =
        !statusFilter ||
        (statusFilter === "Active" &&
          active) ||
        (statusFilter === "Inactive" &&
          !active);

      const matchesRole =
        !roleFilter ||
        String(
          admin.userGroupId
        ) === String(roleFilter);

      return (
        matchesSearch &&
        matchesSchool &&
        matchesStatus &&
        matchesRole
      );
    });
  }, [
    superAdmins,
    search,
    schoolFilter,
    statusFilter,
    roleFilter,
    schools,
    userGroups,
  ]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.ceil(
    filteredAdmins.length / itemsPerPage
  );

  const paginatedAdmins =
    filteredAdmins.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    console.log("paginatedAdmins",paginatedAdmins);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    schoolFilter,
    statusFilter,
    roleFilter,
    itemsPerPage,
  ]);

  // =========================================================
  // COUNTS
  // =========================================================

  const totalCount = superAdmins.length;

  const activeCount = superAdmins.filter(
    (admin) => isActive(admin)
  ).length;

  const inactiveCount =
    totalCount - activeCount;

  const verifiedCount =
    superAdmins.filter(
      (admin) =>
        admin.phoneVerified === true &&
        admin.emailVerified === true
    ).length;

  // =========================================================
  // RESET FILTER
  // =========================================================

  const resetFilters = () => {
    setSearch("");
    setSchoolFilter("");
    setStatusFilter("");
    setRoleFilter("");
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async () => {
    if (!selectedAdmin?.id) {
      return;
    }

    try {
      setDeleting(true);

      await axios.delete(
        `${API_BASE}/delete/${selectedAdmin.id}`,
        axiosConfig
      );

      alert(
        "Super Admin deleted successfully."
      );

      setShowDeleteModal(false);
      setSelectedAdmin(null);

      loadSuperAdmins();
    } catch (error) {
      console.error(
        "Delete Super Admin Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to delete Super Admin."
      );
    } finally {
      setDeleting(false);
    }
  };

  // =========================================================
  // STATUS
  // =========================================================

  const handleStatusChange = async () => {
    if (!selectedAdmin?.id) {
      return;
    }

    try {
      setUpdatingStatus(true);

      const newStatus = isActive(selectedAdmin)
        ? "Inactive"
        : "Active";

      await axios.patch(
        `${API_BASE}/${selectedAdmin.id}/status`,
        {
          status: newStatus,
        },
        axiosConfig
      );

      alert(
        `Super Admin ${newStatus.toLowerCase()} successfully.`
      );

      setShowStatusModal(false);
      setSelectedAdmin(null);

      loadSuperAdmins();
    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to update status."
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  // =========================================================
  // RESET PASSWORD
  // =========================================================

  const handleResetPassword = async () => {
    if (!selectedAdmin?.id) {
      return;
    }

    if (!newPassword) {
      alert("Please enter new password.");
      return;
    }

    if (newPassword.length < 8) {
      alert(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (
      newPassword !==
      confirmNewPassword
    ) {
      alert(
        "Password and confirm password do not match."
      );
      return;
    }

    try {
      await axios.patch(
        `${API_BASE}/${selectedAdmin.id}/reset-password`,
        {
          password: newPassword,
          confirmPassword:
            confirmNewPassword,
        },
        axiosConfig
      );

      alert(
        "Password reset successfully."
      );

      setNewPassword("");
      setConfirmNewPassword("");

      setShowPasswordModal(false);
      setSelectedAdmin(null);
    } catch (error) {
      console.error(
        "Password reset error:",
        error
      );

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to reset password."
      );
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (admin) => {
    /*
      Apne route ke according change kar sakte ho.
    */

    window.location.href =
      `/super-admin/edit/${admin.id}`;
  };

  // =========================================================
  // VIEW
  // =========================================================

  const handleView = (admin) => {
  setSelectedAdmin(admin);
};

  // =========================================================
  // BADGE
  // =========================================================

  const StatusBadge = ({ active }) => {
    return active ? (
      <span className="status-badge active">
        <FaCheckCircle size={12} />
        Active
      </span>
    ) : (
      <span className="status-badge inactive">
        <FaTimesCircle size={12} />
        Inactive
      </span>
    );
  };

  // =========================================================
  // PAGINATION BUTTONS
  // =========================================================

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];

    for (
      let i = 1;
      i <= totalPages;
      i++
    ) {
      pages.push(i);
    }

    return (
      <div className="pagination-wrapper">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`page-btn ${
              currentPage === page
                ? "active"
                : ""
            }`}
            onClick={() =>
              setCurrentPage(page)
            }
          >
            {page}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }
        >
          Next
        </button>
      </div>
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
    

      <div className="container-fluid px-2 ">
        <div className="page-header-card shadow">

          <div>
            <div className="title-icon">
              <MdOutlineAdminPanelSettings
                size={27}
              />
            </div>

            <div>
              <h4 className="page-title">
                Super Admin Management
              </h4>

              <p className="page-subtitle">
                Manage system administrators,
                roles, access and account status.
              </p>

              <nav>
                <ol className="breadcrumb mb-0 small">
                  <li className="breadcrumb-item">
                    <a
                      href="/"
                      className="text-decoration-none"
                    >
                      Dashboard
                    </a>
                  </li>

                  <li className="breadcrumb-item">
                    Administration
                  </li>

                  <li className="breadcrumb-item active text-primary">
                    Super Admins
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="header-actions">
            <button
              className="btn btn-outline-primary"
              onClick={() =>
                window.history.back()
              }
            >
              <FaArrowLeft className="me-2" />
              Back
            </button>

            <button
              className="btn btn-primary"
              onClick={() =>
                (window.location.href =
                  "/super-admin/create")
              }
            >
              <FaPlus className="me-2" />
              Create Super Admin
            </button>
          </div>

        </div>
      </div>


      <div className="container-fluid px-2 mt-3">

        <div className="row g-3">

          <div className="col-xl-3 col-md-6 ">
            <div className="stat-card shadow ">
              <div className="stat-icon blue">
                <FaUserShield />
              </div>

              <div className=" ">
                <h6>
                  Total Super Admins: <span className="fw-bolder fs-5">{totalCount}</span>
                </h6>

               
              </div>
            </div>
           
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="stat-card shadow " >
              <div className="stat-icon green">
                <FaCheckCircle />
              </div>

              <div>
                <h6>
                  Active: <span className="fw-bolder fs-5">{activeCount}</span>
                </h6>

              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="stat-card shadow">
              <div className="stat-icon red">
                <FaTimesCircle />
              </div>

              <div>
                <h6>
                  Inactive: <span className="fw-bolder fs-5">{inactiveCount}</span>
                </h6>

               
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="stat-card shadow">
              <div className="stat-icon purple">
                <FaCheckCircle />
              </div>

              <div>
                <h6>
                  Fully Verified: <span className="fw-bolder fs-5">{verifiedCount}</span>
                </h6>

                
              </div>
            </div>
          </div>

        </div>
      </div>

 
     {!selectedAdmin ? (
  <>
    {/* FILTER + TABLE + PAGINATION */}
     <div className="container-fluid px-2 mt-3 mb-4">

        <div className="main-card shadow">

         

          <div className="filter-header">

            <div className="filter-title">
              <FaFilter />
              <strong>
                Search & Filter
              </strong>
            </div>

            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={resetFilters}
            >
              <FaSyncAlt className="me-1" />
              Reset
            </button>

          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="row g-3 p-3">

            {/* SEARCH */}

            <div className="col-xl-4 col-md-6">

              <label className="form-label">
                Search
              </label>

              <div className="search-box">

                <FaSearch />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search name, email, phone..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* SCHOOL */}

            <div className="col-xl-3 col-md-6">

              <label className="form-label">
                School
              </label>

              <select
                className="form-select"
                value={schoolFilter}
                onChange={(e) =>
                  setSchoolFilter(
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Schools
                </option>

                {schools.map((school) => (
                  <option
                    key={school.id}
                    value={school.id}
                  >
                    {school.schoolName ||
                      school.name ||
                      school.schoolCode}
                  </option>
                ))}

              </select>

            </div>

            {/* STATUS */}

            <div className="col-xl-2 col-md-6">

              <label className="form-label">
                Status
              </label>

              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>

            {/* ROLE */}

            <div className="col-xl-3 col-md-6">

              <label className="form-label">
                Role / User Group
              </label>

              <select
                className="form-select"
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Roles
                </option>

                {userGroups.map(
                  (group) => (
                    <option
                      key={group.id}
                      value={group.id}
                    >
                      {group.groupName ||
                        group.name}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>

          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <div className="table-top">

            <div>
              <strong>
                Super Admin List
              </strong>

              <span className="result-count">
                {filteredAdmins.length} Records
              </span>
            </div>

            <div className="d-flex align-items-center gap-2">

              <span className="small text-muted">
                Show
              </span>

              <select
                className="form-select form-select-sm"
                style={{
                  width: "75px",
                }}
                value={itemsPerPage}
                onChange={(e) =>
                  setItemsPerPage(
                    Number(
                      e.target.value
                    )
                  )
                }
              >
                <option value={5}>
                  5
                </option>

                <option value={10}>
                  10
                </option>

                <option value={20}>
                  20
                </option>

                <option value={50}>
                  50
                </option>
              </select>

            </div>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="table-responsive">

            <table className="table custom-table align-middle mb-0">

              <thead>
                <tr>

                  <th>
                    #
                  </th>

                  <th>
                    Super Admin
                  </th>

                  <th>
                    Contact
                  </th>

                  <th>
                    School
                  </th>

                  <th>
                    Role
                  </th>

                  <th>
                    Verification
                  </th>

                  <th>
                    Status
                  </th>

                  <th className="text-center">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >

                      <span className="spinner-border text-primary" />

                      <div className="mt-2 text-muted">
                        Loading Super Admins...
                      </div>

                    </td>
                  </tr>
                ) : paginatedAdmins.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >

                      <div className="empty-icon">
                        <FaUserShield />
                      </div>

                      <h6 className="mt-2">
                        No Super Admin Found
                      </h6>

                      <p className="text-muted mb-0">
                        Try changing your
                        search or filters.
                      </p>

                    </td>
                  </tr>
                ) : (
                  paginatedAdmins.map(
                    (admin, index) => {

                      const active =
                        isActive(admin);

                      return (
                        <tr
                          key={
                            admin.id ||
                            admin.userId ||
                            index
                          }
                        >

                          {/* NUMBER */}

                          <td>
                            {(currentPage -
                              1) *
                              itemsPerPage +
                              index +
                              1}
                          </td>

                          {/* ADMIN */}

                          <td>

                            <div className="admin-info">

                              <div className="avatar">
                                {(
                                  admin.name ||
                                  admin.fullName ||
                                  "S"
                                )
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>

                                <div className="admin-name">
                                  {admin.name ||
                                    admin.fullName ||
                                    "N/A"}
                                </div>

                                <small className="text-muted">
                                  {admin.username
                                    ? `@${admin.username}`
                                    : `ID: ${
                                        admin.id ||
                                        "-"
                                      }`}
                                </small>

                              </div>

                            </div>

                          </td>

                          {/* CONTACT */}

                          <td>

                            <div className="contact-item">
                              <FaEnvelope />
                              <span>
                                {admin.email ||
                                  "-"}
                              </span>
                            </div>

                            <div className="contact-item">
                              <FaPhone />
                              <span>
                                {admin.phone ||
                                  "-"}
                              </span>
                            </div>

                          </td>

                          {/* SCHOOL */}

                          <td>

                            <div className="school-cell">

                              <FaSchool />

                              <span>
                                {getSchoolName(
                                  admin?.school.id
                                )}
                              </span>

                            </div>

                          </td>

                          {/* ROLE */}

                          <td>

                            <span className="role-badge">
                              <FaUserShield
                                size={11}
                              />

                              {admin.role ||
                                getUserGroupName(
                                  admin.userGroupId
                                )}
                            </span>

                          </td>

                          {/* VERIFICATION */}

                          <td>

                            <div className="verification-list">

                              <span
                                className={
                                  admin.emailVerified
                                    ? "verified"
                                    : "not-verified"
                                }
                              >
                                {admin.emailVerified ? (
                                  <FaCheckCircle />
                                ) : (
                                  <FaTimesCircle />
                                )}

                                Email
                              </span>

                              <span
                                className={
                                  admin.phoneVerified
                                    ? "verified"
                                    : "not-verified"
                                }
                              >
                                {admin.phoneVerified ? (
                                  <FaCheckCircle />
                                ) : (
                                  <FaTimesCircle />
                                )}

                                Phone
                              </span>

                            </div>

                          </td>

                          {/* STATUS */}

                          <td>
                            <StatusBadge
                              active={active}
                            />
                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="action-buttons">

                              {/* VIEW */}

                              <button
                                type="button"
                                className="action-btn view"
                                title="View"
                                onClick={() =>
                                  handleView(
                                    admin
                                  )
                                }
                              >
                                <FaEye />
                              </button>

                              {/* EDIT */}

                              <button
                                type="button"
                                className="action-btn edit"
                                title="Edit"
                                onClick={() =>
                                  handleEdit(
                                    admin
                                  )
                                }
                              >
                                <FaEdit />
                              </button>

                              {/* STATUS */}

                              <button
                                type="button"
                                className={`action-btn ${
                                  active
                                    ? "warning"
                                    : "success"
                                }`}
                                title={
                                  active
                                    ? "Deactivate"
                                    : "Activate"
                                }
                                onClick={() => {
                                  setSelectedAdmin(
                                    admin
                                  );
                                  setShowStatusModal(
                                    true
                                  );
                                }}
                              >
                                <FaPowerOff />
                              </button>

                              {/* PASSWORD */}

                              <button
                                type="button"
                                className="action-btn password"
                                title="Reset Password"
                                onClick={() => {
                                  setSelectedAdmin(
                                    admin
                                  );
                                  setShowPasswordModal(
                                    true
                                  );
                                }}
                              >
                                <FaKey />
                              </button>

                              {/* DELETE */}

                              <button
                                type="button"
                                className="action-btn delete"
                                title="Delete"
                                onClick={() => {
                                  setSelectedAdmin(
                                    admin
                                  );
                                  setShowDeleteModal(
                                    true
                                  );
                                }}
                              >
                                <FaTrash />
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )
                )}

              </tbody>

            </table>

          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="pagination-container">

            <div className="small text-muted">
              Showing{" "}
              {filteredAdmins.length === 0
                ? 0
                : (currentPage - 1) *
                    itemsPerPage +
                  1}{" "}
              to{" "}
              {Math.min(
                currentPage *
                  itemsPerPage,
                filteredAdmins.length
              )}{" "}
              of{" "}
              {filteredAdmins.length}{" "}
              records
            </div>

            {renderPagination()}

          </div>

        </div>
      </div>
  </>
) : (
  <>
    {/* SUPER ADMIN VIEW */}
    <div className="container-fluid px-2 mt-3 mb-4">

  <div className="main-card shadow">

    {/* HEADER */}
    <div className="details-page-header">

      <div className="d-flex align-items-center gap-3">

        <div className="title-icon">
          <FaUserShield size={24} />
        </div>

        <div>
          <h6 className="mb-1">
            Super Admin Details
          </h6>

          <p className="text-muted mb-0">
            Complete account information
          </p>
        </div>

      </div>

      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => setSelectedAdmin(null)}
      >
        <FaArrowLeft className="me-2" />
        Back to List
      </button>

    </div>


    {/* PROFILE */}
    <div className="profile-section">

      <div className="profile-header">

        <div className="large-avatar">
          {(
            selectedAdmin.name ||
            selectedAdmin.fullName ||
            "S"
          )
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>

          <h4 className="mb-1">
            {selectedAdmin.name ||
              selectedAdmin.fullName ||
              "N/A"}
          </h4>

          <div className="mb-2">
            <StatusBadge
              active={isActive(selectedAdmin)}
            />
          </div>

          <span className="role-badge">
            <FaUserShield size={11} />

            {selectedAdmin.role ||
              getUserGroupName(
                selectedAdmin.userGroupId
              )}
          </span>

        </div>

      </div>


      {/* DETAILS */}
      <div className="details-grid">

        <DetailItem
          label="Email"
          value={selectedAdmin.email}
        />

        <DetailItem
          label="Phone"
          value={selectedAdmin.phone}
        />

        <DetailItem
          label="School"
          value={getSchoolName(
            selectedAdmin?.school?.id
          )}
        />

        <DetailItem
          label="Username"
          value={selectedAdmin.username}
        />

        <DetailItem
          label="Date of Birth"
          value={selectedAdmin.dateOfBirth}
        />

        <DetailItem
          label="Gender"
          value={selectedAdmin.gender}
        />

        <DetailItem
          label="Alternate Phone"
          value={selectedAdmin.alternatePhone}
        />

        <DetailItem
          label="Language"
          value={selectedAdmin.languagePreference}
        />

        <DetailItem
          label="Time Zone"
          value={selectedAdmin.timeZone}
        />

        <DetailItem
          label="Address"
          value={selectedAdmin.address}
        />

      </div>


      {/* VERIFICATION */}
      <div className="verification-box mt-4">

        <strong>
          Verification
        </strong>

        <div className="d-flex gap-4 mt-3">

          <span
            className={
              selectedAdmin.emailVerified
                ? "verified"
                : "not-verified"
            }
          >
            {selectedAdmin.emailVerified ? (
              <FaCheckCircle />
            ) : (
              <FaTimesCircle />
            )}

            Email
          </span>


          <span
            className={
              selectedAdmin.phoneVerified
                ? "verified"
                : "not-verified"
            }
          >
            {selectedAdmin.phoneVerified ? (
              <FaCheckCircle />
            ) : (
              <FaTimesCircle />
            )}

            Phone
          </span>

        </div>

      </div>


      {/* ACTIONS */}
      <div className="d-flex justify-content-end gap-2 mt-4">

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() =>
            handleEdit(selectedAdmin)
          }
        >
          <FaEdit className="me-2" />
          Edit
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            setSelectedAdmin(null)
          }
        >
          <FaArrowLeft className="me-2" />
          Back
        </button>

      </div>

    </div>

  </div>

</div>
  </>
)}

     

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {/* {showViewModal &&
        selectedAdmin && (
          <div className="modal-overlay">

            <div className="custom-modal view-modal">

              <div className="modal-header">

                <div>
                  <h5>
                    Super Admin Details
                  </h5>

                  <small>
                    Complete account information
                  </small>
                </div>

                <button
                  className="close-btn"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                >
                  <IoMdClose />
                </button>

              </div>

              <div className="modal-body">

                <div className="profile-header">

                  <div className="large-avatar">
                    {(
                      selectedAdmin.name ||
                      selectedAdmin.fullName ||
                      "S"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>

                    <h5 className="mb-1">
                      {selectedAdmin.name ||
                        selectedAdmin.fullName ||
                        "N/A"}
                    </h5>

                    <div className="mb-2">
                      <StatusBadge
                        active={isActive(
                          selectedAdmin
                        )}
                      />
                    </div>

                    <span className="role-badge">
                      {selectedAdmin.role ||
                        getUserGroupName(
                          selectedAdmin.userGroupId
                        )}
                    </span>

                  </div>

                </div>

                <div className="details-grid">

                  <DetailItem
                    label="Email"
                    value={
                      selectedAdmin.email
                    }
                  />

                  <DetailItem
                    label="Phone"
                    value={
                      selectedAdmin.phone
                    }
                  />

                  <DetailItem
                    label="School"
                    value={getSchoolName(
                      selectedAdmin?.school.id
                    )}
                  />

                  <DetailItem
                    label="Username"
                    value={
                      selectedAdmin.username
                    }
                  />

                  <DetailItem
                    label="Date of Birth"
                    value={
                      selectedAdmin.dateOfBirth
                    }
                  />

                  <DetailItem
                    label="Gender"
                    value={
                      selectedAdmin.gender
                    }
                  />

                  <DetailItem
                    label="Alternate Phone"
                    value={
                      selectedAdmin.alternatePhone
                    }
                  />

                  <DetailItem
                    label="Language"
                    value={
                      selectedAdmin.languagePreference
                    }
                  />

                  <DetailItem
                    label="Time Zone"
                    value={
                      selectedAdmin.timeZone
                    }
                  />

                  <DetailItem
                    label="Address"
                    value={
                      selectedAdmin.address
                    }
                  />

                </div>

                <div className="verification-box">

                  <strong>
                    Verification
                  </strong>

                  <div className="d-flex gap-3 mt-2">

                    <span
                      className={
                        selectedAdmin.emailVerified
                          ? "verified"
                          : "not-verified"
                      }
                    >
                      {selectedAdmin.emailVerified ? (
                        <FaCheckCircle />
                      ) : (
                        <FaTimesCircle />
                      )}
                      Email
                    </span>

                    <span
                      className={
                        selectedAdmin.phoneVerified
                          ? "verified"
                          : "not-verified"
                      }
                    >
                      {selectedAdmin.phoneVerified ? (
                        <FaCheckCircle />
                      ) : (
                        <FaTimesCircle />
                      )}
                      Phone
                    </span>

                  </div>

                </div>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                >
                  Close
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowViewModal(false);
                    handleEdit(
                      selectedAdmin
                    );
                  }}
                >
                  <FaEdit className="me-2" />
                  Edit
                </button>

              </div>

            </div>

          </div>
        )} */}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {showDeleteModal &&
        selectedAdmin && (
          <div className="modal-overlay">

            <div className="custom-modal small-modal">

              <div className="modal-header">

                <h5>
                  Delete Super Admin
                </h5>

                <button
                  className="close-btn"
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                >
                  <IoMdClose />
                </button>

              </div>

              <div className="modal-body text-center">

                <div className="danger-icon">
                  <FaTrash />
                </div>

                <h5 className="mt-3">
                  Are you sure?
                </h5>

                <p className="text-muted">
                  You are about to delete{" "}
                  <strong>
                    {selectedAdmin.name ||
                      selectedAdmin.fullName}
                  </strong>
                  . This action cannot be
                  undone.
                </p>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger"
                  disabled={deleting}
                  onClick={handleDelete}
                >
                  {deleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FaTrash className="me-2" />
                      Delete
                    </>
                  )}
                </button>

              </div>

            </div>

          </div>
        )}

      {/* =====================================================
          STATUS MODAL
      ===================================================== */}

      {showStatusModal &&
        selectedAdmin && (
          <div className="modal-overlay">

            <div className="custom-modal small-modal">

              <div className="modal-header">

                <h5>
                  {isActive(
                    selectedAdmin
                  )
                    ? "Deactivate Super Admin"
                    : "Activate Super Admin"}
                </h5>

                <button
                  className="close-btn"
                  onClick={() =>
                    setShowStatusModal(false)
                  }
                >
                  <IoMdClose />
                </button>

              </div>

              <div className="modal-body text-center">

                <div
                  className={`status-modal-icon ${
                    isActive(
                      selectedAdmin
                    )
                      ? "warning-icon"
                      : "success-icon"
                  }`}
                >
                  <FaPowerOff />
                </div>

                <h5 className="mt-3">
                  {isActive(
                    selectedAdmin
                  )
                    ? "Deactivate this account?"
                    : "Activate this account?"}
                </h5>

                <p className="text-muted">
                  {isActive(
                    selectedAdmin
                  )
                    ? "This Super Admin will no longer be able to login."
                    : "This Super Admin will be able to login again."}
                </p>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowStatusModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className={`btn ${
                    isActive(
                      selectedAdmin
                    )
                      ? "btn-warning"
                      : "btn-success"
                  }`}
                  disabled={updatingStatus}
                  onClick={
                    handleStatusChange
                  }
                >
                  {updatingStatus ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Updating...
                    </>
                  ) : isActive(
                      selectedAdmin
                    ) ? (
                    "Deactivate"
                  ) : (
                    "Activate"
                  )}
                </button>

              </div>

            </div>

          </div>
        )}

      {/* =====================================================
          PASSWORD MODAL
      ===================================================== */}

      {showPasswordModal &&
        selectedAdmin && (
          <div className="modal-overlay">

            <div className="custom-modal small-modal">

              <div className="modal-header">

                <div>
                  <h5>
                    Reset Password
                  </h5>

                  <small className="text-muted">
                    {selectedAdmin.name ||
                      selectedAdmin.fullName}
                  </small>
                </div>

                <button
                  className="close-btn"
                  onClick={() =>
                    setShowPasswordModal(false)
                  }
                >
                  <IoMdClose />
                </button>

              </div>

              <div className="modal-body">

                <div className="mb-3">

                  <label className="form-label">
                    New Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div>

                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    value={
                      confirmNewPassword
                    }
                    onChange={(e) =>
                      setConfirmNewPassword(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowPasswordModal(
                      false
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={
                    handleResetPassword
                  }
                >
                  <FaKey className="me-2" />
                  Reset Password
                </button>

              </div>

            </div>

          </div>
        )}

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        /* =====================================================
           PAGE HEADER
        ===================================================== */

        .page-header-card {
          background: #ffffff;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,.06);
          padding: 18px 20px;
          margin-top: 8px;

          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .page-header-card > div:first-child {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .title-icon {
          width: 46px;
          height: 46px;
          border-radius: 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #0d6efd;
          color: white;

          flex-shrink: 0;
        }

        .page-title {
          font-weight: 700;
          margin-bottom: 4px;
        }

        .page-subtitle {
          color: #6c757d;
          margin-bottom: 7px;
          font-size: 14px;
        }

        .header-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* =====================================================
           STAT
        ===================================================== */

        .stat-card {
          background: white;
          border-radius: 10px;
          padding: 17px;

          display: flex;
          align-items: center;
          gap: 10px;

          box-shadow: 0 2px 10px rgba(0,0,0,.05);

          border: 1px solid #eef0f4;
        }

        .stat-icon {
          width: 40px;
          height: 40px;

          border-radius: 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 25px;
          flex-shrink: 0;
        }

        .stat-icon.blue {
          background: #e8f1ff;
          color: #0d6efd;
        }

        .stat-icon.green {
          background: #e8f8ef;
          color: #198754;
        }

        .stat-icon.red {
          background: #ffeded;
          color: #dc3545;
        }

        .stat-icon.purple {
          background: #f0eaff;
          color: #6f42c1;
        }

        .stat-card small {
          color: #6c757d;
          font-size: 13px;
        }

        .stat-card h3 {
          margin: 0 0;
          font-weight: 500;
        }

        /* =====================================================
           MAIN CARD
        ===================================================== */

        .main-card {
          background: white;
          border-radius: 10px;

          // box-shadow: 0 2px 12px rgba(0,0,0,.06);

          border: 1px solid #eef0f4;

          overflow: hidden;
        }

        /* =====================================================
           FILTER
        ===================================================== */

        .filter-header {
          padding: 15px 18px;

          background: #fafbfc;

          border-bottom: 1px solid #e8ebef;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .filter-title {
          display: flex;
          align-items: center;
          gap: 8px;

          color: #212529;
        }

        .filter-title svg {
          color: #0d6efd;
        }

        .search-box {
          position: relative;
        }

        .search-box > svg {
          position: absolute;

          left: 13px;
          top: 50%;

          transform: translateY(-50%);

          color: #8a94a6;

          z-index: 2;
        }

        .search-box input {
          padding-left: 38px;
        }

        /* =====================================================
           TABLE TOP
        ===================================================== */

        .table-top {
          border-top: 1px solid #edf0f4;
          border-bottom: 1px solid #edf0f4;

          padding: 13px 18px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .result-count {
          display: inline-block;

          margin-left: 10px;

          padding: 3px 9px;

          border-radius: 20px;

          background: #edf4ff;

          color: #0d6efd;

          font-size: 12px;
          font-weight: 600;
        }

        /* =====================================================
           TABLE
        ===================================================== */

        .custom-table {
          min-width: 1100px;
        }

        .custom-table thead th {
          background: #f8f9fb;

          color: #495057;

          font-size: 13px;

          font-weight: 700;

          white-space: nowrap;

          padding: 13px 12px;

          border-bottom: 1px solid #e4e7eb;
        }

        .custom-table tbody td {
          padding: 13px 12px;

          font-size: 13px;

          border-bottom: 1px solid #edf0f3;

          vertical-align: middle;
        }

        .custom-table tbody tr:hover {
          background: #fafcff;
        }

        /* =====================================================
           ADMIN
        ===================================================== */

        .admin-info {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 180px;
        }

        .avatar {
          width: 40px;
          height: 40px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #e8f1ff;
          color: #0d6efd;

          font-weight: 700;

          flex-shrink: 0;
        }

        .admin-name {
          font-weight: 600;
          color: #212529;
        }

        /* =====================================================
           CONTACT
        ===================================================== */

        .contact-item {
          display: flex;
          align-items: center;
          gap: 7px;

          margin-bottom: 5px;

          white-space: nowrap;
        }

        .contact-item:last-child {
          margin-bottom: 0;
        }

        .contact-item svg {
          color: #7b8794;
          font-size: 12px;
        }

        /* =====================================================
           SCHOOL
        ===================================================== */

        .school-cell {
          display: flex;
          align-items: center;
          gap: 7px;

          max-width: 180px;
        }

        .school-cell svg {
          color: #0d6efd;
          flex-shrink: 0;
        }

        /* =====================================================
           ROLE
        ===================================================== */

        .role-badge {
          display: inline-flex;

          align-items: center;
          gap: 5px;

          padding: 5px 9px;

          border-radius: 20px;

          background: #f0eaff;
          color: #6741b9;

          font-size: 11px;
          font-weight: 600;

          white-space: nowrap;
        }

        /* =====================================================
           STATUS
        ===================================================== */

        .status-badge {
          display: inline-flex;

          align-items: center;
          gap: 5px;

          padding: 5px 9px;

          border-radius: 20px;

          font-size: 11px;
          font-weight: 600;
        }

        .status-badge.active {
          background: #e8f8ef;
          color: #198754;
        }

        .status-badge.inactive {
          background: #ffeded;
          color: #dc3545;
        }

        /* =====================================================
           VERIFICATION
        ===================================================== */

        .verification-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .verified,
        .not-verified {
          display: inline-flex;
          align-items: center;
          gap: 5px;

          font-size: 11px;
          font-weight: 600;
        }

        .verified {
          color: #198754;
        }

        .not-verified {
          color: #dc3545;
        }

        /* =====================================================
           ACTION
        ===================================================== */

        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 5px;
        }

        .action-btn {
          width: 31px;
          height: 31px;

          border: 1px solid #e1e5ea;

          border-radius: 6px;

          background: white;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          transition: .2s;
        }

        .action-btn:hover {
          transform: translateY(-1px);
        }

        .action-btn.view {
          color: #0d6efd;
        }

        .action-btn.edit {
          color: #6f42c1;
        }

        .action-btn.warning {
          color: #fd7e14;
        }

        .action-btn.success {
          color: #198754;
        }

        .action-btn.password {
          color: #0dcaf0;
        }

        .action-btn.delete {
          color: #dc3545;
        }

        /* =====================================================
           EMPTY
        ===================================================== */

        .empty-icon {
          width: 60px;
          height: 60px;

          margin: auto;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #edf4ff;
          color: #0d6efd;

          font-size: 25px;
        }

        /* =====================================================
           PAGINATION
        ===================================================== */

        .pagination-container {
          padding: 14px 18px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 15px;

          border-top: 1px solid #edf0f3;
        }

        .pagination-wrapper {
          display: flex;
          gap: 5px;
        }

        .page-btn {
          min-width: 34px;
          height: 32px;

          padding: 0 9px;

          border: 1px solid #dee2e6;

          background: white;

          border-radius: 5px;

          font-size: 12px;
        }

        .page-btn:hover:not(:disabled) {
          background: #f1f6ff;
          border-color: #0d6efd;
          color: #0d6efd;
        }

        .page-btn.active {
          background: #0d6efd;
          color: white;
          border-color: #0d6efd;
        }

        .page-btn:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

     .details-page-header {
  padding: 18px 20px;
  border-bottom: 1px solid #e9ecef;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;
}

.profile-section {
  padding: 25px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 15px;

  padding-bottom: 25px;
  margin-bottom: 25px;

  border-bottom: 1px solid #edf0f3;
}

.large-avatar {
  width: 72px;
  height: 72px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #e8f1ff;
  color: #0d6efd;

  font-size: 28px;
  font-weight: 700;

  flex-shrink: 0;
}

.details-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 15px;
}

.detail-item {
  padding: 15px;

  background: #f8f9fb;

  border: 1px solid #edf0f3;
  border-radius: 8px;
}

.detail-label {
  display: block;

  font-size: 12px;
  font-weight: 600;

  color: #6c757d;

  margin-bottom: 5px;
}

.detail-value {
  font-size: 14px;
  font-weight: 600;

  color: #212529;

  word-break: break-word;
}

.verification-box {
  padding: 16px;

  background: #f8f9fb;

  border: 1px solid #edf0f3;
  border-radius: 8px;
}

@media (max-width: 768px) {

  .details-page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .details-page-header button {
    width: 100%;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .profile-section {
    padding: 15px;
  }

}

        /* =====================================================
           PROFILE
        ===================================================== */

        .profile-header {
          display: flex;
          align-items: center;
          gap: 15px;

          padding-bottom: 20px;

          margin-bottom: 20px;

          border-bottom: 1px solid #edf0f3;
        }

        .large-avatar {
          width: 70px;
          height: 70px;

          border-radius: 50%;

          background: #e8f1ff;
          color: #0d6efd;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 27px;
          font-weight: 700;
        }

        .details-grid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 15px;
        }

        .detail-item {
          padding: 12px;

          border: 1px solid #edf0f3;

          border-radius: 8px;
        }

        .detail-label {
          display: block;

          font-size: 11px;

          color: #6c757d;

          margin-bottom: 4px;
        }

        .detail-value {
          font-weight: 600;

          color: #212529;

          word-break: break-word;
        }

        .verification-box {
          margin-top: 18px;

          padding: 13px;

          background: #f8f9fb;

          border-radius: 8px;
        }

        /* =====================================================
           DANGER
        ===================================================== */

        .danger-icon {
          width: 65px;
          height: 65px;

          margin: auto;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #ffeded;
          color: #dc3545;

          font-size: 24px;
        }

        .status-modal-icon {
          width: 65px;
          height: 65px;

          margin: auto;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 23px;
        }

        .warning-icon {
          background: #fff3cd;
          color: #fd7e14;
        }

        .success-icon {
          background: #e8f8ef;
          color: #198754;
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 768px) {

          .page-header-card {
            flex-direction: column;
            align-items: stretch;
          }

          .header-actions {
            width: 100%;
          }

          .header-actions button {
            flex: 1;
          }

          .pagination-container {
            flex-direction: column;
            align-items: flex-start;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 576px) {

          .page-header-card {
            padding: 14px;
          }

          .title-icon {
            width: 40px;
            height: 40px;
          }

          .page-title {
            font-size: 18px;
          }

          .page-subtitle {
            font-size: 12px;
          }

          .header-actions {
            flex-direction: column;
          }

          .header-actions button {
            width: 100%;
          }

          .table-top {
            align-items: flex-start;
            flex-direction: column;
          }

          .pagination-wrapper {
            width: 100%;
            overflow-x: auto;
          }

          .modal-overlay {
            padding: 8px;
          }

        }

      `}</style>
    </>
  );
};

// =========================================================
// DETAIL ITEM
// =========================================================

const DetailItem = ({
  label,
  value,
}) => {
  return (
    <div className="detail-item">

      <span className="detail-label">
        {label}
      </span>

      <span className="detail-value">
        {value || "-"}
      </span>

    </div>
  );
};

export default SuperAdminList;