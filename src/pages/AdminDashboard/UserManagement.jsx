

import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaRedo,
  FaKey,
  FaEnvelope,
  FaPhone,
  FaSchool,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
  FaPaperPlane,
  FaUserShield,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaUserTag,
  FaIdBadge,
} from "react-icons/fa";

import axiosInstance from "../../api/axiosInstance";
import { MdArrowOutward } from "react-icons/md";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [schoolFilter, setSchoolFilter] = useState("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // USER DETAILS
  // =========================================================

  const [showStudentDetails, setShowStudentDetails] = useState(false);

  // =========================================================
  // RESET PASSWORD
  // =========================================================

  const [selectedUser, setSelectedUser] = useState(null);

  const [showResetModal, setShowResetModal] = useState(false);

  const [resetStep, setResetStep] = useState(1);

  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetLoading, setResetLoading] = useState(false);

  const [resetMessage, setResetMessage] = useState("");

  const [resetError, setResetError] = useState("");

  // =========================================================
  // STATUS UPDATE
  // =========================================================

  const [statusUpdatingId, setStatusUpdatingId] = useState(null);

  // =========================================================
  // GET ALL USERS
  // =========================================================

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.get("/api/user/all");

      console.log("USER API RESPONSE =", response.data);
      console.log("IS ARRAY =", Array.isArray(response.data));

      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setUsers([]);
        setError("Invalid response received from server.");
      }
    } catch (err) {
      console.error("Error fetching users:", err);

      setUsers([]);

      const message =
        err?.response?.data?.message ||
        (typeof err?.response?.data === "string" ? err.response.data : "") ||
        err?.message ||
        "Failed to load users.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================================================
  // FILTER
  // =========================================================

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) {
      return [];
    }

    const keyword = search.trim().toLowerCase();

    return users.filter((user) => {
      if (!user) return false;

      const matchesSearch =
        !keyword ||
        String(user.name || "")
          .toLowerCase()
          .includes(keyword) ||
        String(user.username || "")
          .toLowerCase()
          .includes(keyword) ||
        String(user.email || "")
          .toLowerCase()
          .includes(keyword) ||
        String(user.phone || "")
          .toLowerCase()
          .includes(keyword) ||
        String(user.role || "")
          .toLowerCase()
          .includes(keyword) ||
        String(user.schoolName || "")
          .toLowerCase()
          .includes(keyword) ||
        String(user.schoolCode || "")
          .toLowerCase()
          .includes(keyword) ||
        String(user.userGroupName || "")
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        statusFilter === "ALL" ||
        String(user.status || "").toUpperCase() === statusFilter;

      const matchesRole =
        roleFilter === "ALL" ||
        String(user.role || "").toUpperCase() === roleFilter;

      const matchesSchool =
        schoolFilter === "ALL" ||
        String(user.schoolId || "") === String(schoolFilter);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRole &&
        matchesSchool
      );
    });
  }, [users, search, statusFilter, roleFilter, schoolFilter]);

  const schoolOptions = useMemo(() => {
    const map = new Map();

    users.forEach((user) => {
      if (user?.schoolId && user?.schoolName) {
        map.set(String(user.schoolId), {
          id: user.schoolId,
          name: user.schoolName,
        });
      }
    });

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [users]);

  const roleOptions = useMemo(() => {
    return [
      ...new Set(
        users
          .map((user) =>
            String(user?.role || "")
              .trim()
              .toUpperCase()
          )
          .filter(Boolean)
      ),
    ].sort();
  }, [users]);

  // =========================================================
  // STATS
  // =========================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) =>
      String(user?.status || "").toUpperCase() === "ACTIVE"
  ).length;

  const inactiveUsers = users.filter(
    (user) =>
      String(user?.status || "").toUpperCase() === "INACTIVE"
  ).length;

  const superadmins = users.filter(
    (user) =>
      String(user?.role || "").toUpperCase() === "SUPERADMIN"
  ).length;

  // =========================================================
  // OPEN RESET MODAL
  // =========================================================

  const openResetModal = (user) => {
    setSelectedUser(user);

    setResetStep(1);

    setOtp("");
    setNewPassword("");
    setConfirmPassword("");

    setResetMessage("");
    setResetError("");

    setShowResetModal(true);
  };

  // =========================================================
  // OPEN USER DETAILS
  // =========================================================

  const openStudentDetails = (user) => {
    setSelectedUser(user);
    setShowStudentDetails(true);
  };

  // =========================================================
  // CLOSE USER DETAILS
  // =========================================================

  const closeStudentDetails = () => {
    setShowStudentDetails(false);
    setSelectedUser(null);
  };

  // =========================================================
  // CLOSE RESET MODAL
  // =========================================================

  const closeResetModal = () => {
    if (resetLoading) return;

    setShowResetModal(false);

    setSelectedUser(null);

    setResetStep(1);

    setOtp("");

    setNewPassword("");

    setConfirmPassword("");

    setResetMessage("");

    setResetError("");
  };

  // =========================================================
  // STATUS UPDATE
  // =========================================================

  const updateUserStatus = async (user) => {
    if (!user?.id) return;

    const currentStatus =
      String(user?.status || "").toUpperCase() === "ACTIVE"
        ? "ACTIVE"
        : "INACTIVE";

    const newStatus =
      currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    // Optimistic UI update
    setUsers((prevUsers) =>
      prevUsers.map((item) =>
        item.id === user.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );

    try {
      setStatusUpdatingId(user.id);

      const response = await axiosInstance.put(
        `/api/user/${user.id}/status`,
        {
          status: newStatus,
        }
      );

      console.log("STATUS UPDATE RESPONSE =", response.data);

      // Use backend returned status if available
      const backendStatus =
        response?.data?.status;

      if (backendStatus) {
        setUsers((prevUsers) =>
          prevUsers.map((item) =>
            item.id === user.id
              ? {
                  ...item,
                  status: backendStatus,
                }
              : item
          )
        );
      }

      // Also update selected details user if currently open
      setSelectedUser((prev) =>
        prev?.id === user.id
          ? {
              ...prev,
              status: backendStatus || newStatus,
            }
          : prev
      );
    } catch (err) {
      console.error("Status update error:", err);

      // Rollback
      setUsers((prevUsers) =>
        prevUsers.map((item) =>
          item.id === user.id
            ? {
                ...item,
                status: currentStatus,
              }
            : item
        )
      );

      setSelectedUser((prev) =>
        prev?.id === user.id
          ? {
              ...prev,
              status: currentStatus,
            }
          : prev
      );

      const message =
        err?.response?.data?.message ||
        (typeof err?.response?.data === "string"
          ? err.response.data
          : "") ||
        "Failed to update user status.";

      alert(message);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // =========================================================
  // STEP 1 - SEND OTP
  // =========================================================

  const sendResetOtp = async () => {
    if (!selectedUser?.email) {
      setResetError("User email is not available.");

      return;
    }

    try {
      setResetLoading(true);

      setResetMessage("");
      setResetError("");

      const response = await axiosInstance.post(
        `/api/password-reset/send-otp?email=${encodeURIComponent(
          selectedUser.email
        )}`
      );

      console.log("SEND OTP RESPONSE =", response.data);

      setResetMessage(
        response?.data?.message ||
          "OTP sent successfully."
      );

      setResetStep(2);
    } catch (err) {
      console.error("Send OTP error:", err);

      const message =
        err?.response?.data?.message ||
        (typeof err?.response?.data === "string"
          ? err.response.data
          : "") ||
        "Failed to send OTP.";

      setResetError(message);
    } finally {
      setResetLoading(false);
    }
  };

  // =========================================================
  // STEP 2 - VERIFY OTP
  // =========================================================

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setResetError(
        "Please enter a valid 6-digit OTP."
      );

      return;
    }

    try {
      setResetLoading(true);

      setResetMessage("");
      setResetError("");

      const response = await axiosInstance.post(
        `/api/password-reset/verify-otp?email=${encodeURIComponent(
          selectedUser.email
        )}&otp=${encodeURIComponent(otp)}`
      );

      console.log(
        "VERIFY OTP RESPONSE =",
        response.data
      );

      setResetMessage(
        response?.data?.message ||
          "OTP verified successfully."
      );

      setResetStep(3);
    } catch (err) {
      console.error("Verify OTP error:", err);

      const message =
        err?.response?.data?.message ||
        (typeof err?.response?.data === "string"
          ? err.response.data
          : "") ||
        "Invalid or expired OTP.";

      setResetError(message);
    } finally {
      setResetLoading(false);
    }
  };

  // =========================================================
  // STEP 3 - CHANGE PASSWORD
  // =========================================================

  const changePassword = async () => {
    setResetMessage("");
    setResetError("");

    if (!newPassword) {
      setResetError(
        "Please enter a new password."
      );

      return;
    }

    if (newPassword.length < 6) {
      setResetError(
        "Password must be at least 6 characters."
      );

      return;
    }

    if (!confirmPassword) {
      setResetError(
        "Please confirm your password."
      );

      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError(
        "New password and confirm password do not match."
      );

      return;
    }

    try {
      setResetLoading(true);

      const response = await axiosInstance.post(
        "/api/password-reset/change-password",
        {
          email: selectedUser.email,
          newPassword: newPassword,
        }
      );

      console.log(
        "CHANGE PASSWORD RESPONSE =",
        response.data
      );

      setResetMessage(
        response?.data?.message ||
          "Password changed successfully."
      );

      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(
        "Change password error:",
        err
      );

      const message =
        err?.response?.data?.message ||
        (typeof err?.response?.data === "string"
          ? err.response.data
          : "") ||
        "Failed to change password.";

      setResetError(message);
    } finally {
      setResetLoading(false);
    }
  };

  // =========================================================
  // HELPERS
  // =========================================================

  const getInitials = (name) => {
    if (!name) return "U";

    const words = String(name)
      .trim()
      .split(/\s+/);

    if (words.length === 1) {
      return words[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[1].charAt(0)
    ).toUpperCase();
  };

  const getRoleClass = (role) => {
    const value = String(role || "").toUpperCase();

    if (value === "SUPERADMIN") {
      return "um-role-superadmin";
    }

    if (value === "ADMIN") {
      return "um-role-admin";
    }

    return "um-role-default";
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <>
      <div className="mx-2 mt-2 mb-3">
        <div
          className="rounded-4 shadow overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
            border: "1px solid #dbeafe",
          }}
        >
          <div className="p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "52px",
                    height: "52px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaUsers size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    User Management
                  </h5>

                  <div className="text-muted small">
                    Manage all users and reset passwords
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="um-refresh-btn rounded-4"
                  onClick={fetchUsers}
                  disabled={loading}
                >
                  <FaRedo
                    className={
                      loading ? "um-spin" : ""
                    }
                  />

                  <span>
                    {loading
                      ? "Refreshing..."
                      : "Refresh"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div
            className="px-4 py-2"
            style={{
              backgroundColor:
                "rgba(239,246,255,.75)",
              borderTop:
                "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp; Admin &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                User Management System
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="container-fluid px-2">
        <div className="row g-3">
          <div className="col-12 col-sm-6 col-lg">
            <div className="premium-stat-card shadow stat-blue h-100">
              <div className="stat-icon">
                <FaUsers />
              </div>

              <div className="stat-content">
                <span>Total Users</span>

                <h3>{totalUsers}</h3>

                <small></small>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg">
            <div className="premium-stat-card shadow stat-green h-100">
              <div className="stat-icon">
                <FaCheckCircle />
              </div>

              <div className="stat-content">
                <span>Active Users</span>

                <h3>{activeUsers}</h3>

                <small></small>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg">
            <div className="premium-stat-card shadow stat-orange h-100">
              <div className="stat-icon">
                <FaTimesCircle />
              </div>

              <div className="stat-content">
                <span>Inactive Users</span>

                <h3>{inactiveUsers}</h3>

                <small></small>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg">
            <div className="premium-stat-card shadow stat-red h-100">
              <div className="stat-icon">
                <FaUserShield />
              </div>

              <div className="stat-content">
                <span>SuperAdmins</span>

                <h3>{superadmins}</h3>

                <small>
                  Unread{" "}
                  <MdArrowOutward
                    size={13}
                    className="ms-1"
                  />
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="px-2">
        <div className="d-flex p-3 mt-3 bg-white shadow rounded-4 um-toolbar-wrapper">
          {/* SEARCH */}

          <div className="um-search-box">
            <FaSearch />

            <input
              type="text"
              placeholder="Search user, email, phone, role, school..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                className="um-clear-search"
                onClick={() => setSearch("")}
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* FILTERS */}

          <div className="um-filters-container">
            {/* SCHOOL */}

            <div className="um-filter-box">
              <label>School</label>

              <select
                value={schoolFilter}
                onChange={(e) =>
                  setSchoolFilter(
                    e.target.value
                  )
                }
              >
                <option value="ALL">
                  All Schools
                </option>

                {schoolOptions.map(
                  (school) => (
                    <option
                      key={school.id}
                      value={school.id}
                    >
                      {school.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* ROLE */}

            <div className="um-filter-box">
              <label>Role</label>

              <select
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(
                    e.target.value
                  )
                }
              >
                <option value="ALL">
                  All Roles
                </option>

                {roleOptions.map(
                  (role) => (
                    <option
                      key={role}
                      value={role}
                    >
                      {role}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* STATUS */}

            <div className="um-filter-box">
              <label>Status</label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >
                <option value="ALL">
                  All Status
                </option>

                <option value="ACTIVE">
                  Active
                </option>

                <option value="INACTIVE">
                  Inactive
                </option>
              </select>
            </div>

            {/* CLEAR */}

            {(schoolFilter !== "ALL" ||
              roleFilter !== "ALL" ||
              statusFilter !== "ALL" ||
              search) && (
              <button
                className="um-clear-filter-btn"
                onClick={() => {
                  setSearch("");
                  setSchoolFilter("ALL");
                  setRoleFilter("ALL");
                  setStatusFilter("ALL");
                }}
              >
                <FaTimes />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="um-error-box">
          <FaTimesCircle />

          <div>
            <strong>
              Unable to load users
            </strong>

            <p>{error}</p>
          </div>

          <button onClick={fetchUsers}>
            Try Again
          </button>
        </div>
      )}

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="px-2">
        <div className="um-table-card mt-3 shadow rounded-4">
          <div className="um-table-header">
            <div>
              <h3>All Users</h3>

              <p>
                Showing{" "}
                <strong>
                  {filteredUsers.length}
                </strong>{" "}
                of{" "}
                <strong>{totalUsers}</strong>{" "}
                users
              </p>
            </div>
          </div>

          {loading ? (
            <div className="um-loading">
              <div className="um-loader"></div>

              <p>Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="um-empty">
              <div className="um-empty-icon">
                <FaUsers />
              </div>

              <h4>No Users Found</h4>

              <p>
                No users match your search or
                filter.
              </p>
            </div>
          ) : (
            <div className="um-table-wrapper">
              <table className="um-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>School</th>
                    <th>User Group</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>View</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map(
                    (user, index) => {
                      const isActive =
                        String(
                          user?.status || ""
                        ).toUpperCase() ===
                        "ACTIVE";

                      const isUpdating =
                        statusUpdatingId ===
                        user?.id;

                      return (
                        <tr
                          key={
                            user?.id ??
                            index
                          }
                        >
                          <td>
                            <span className="um-index">
                              {index + 1}
                            </span>
                          </td>

                          {/* USER */}

                          <td>
                            <div className="um-user-cell">
                              <div className="um-avatar">
                                {getInitials(
                                  user?.name
                                )}
                              </div>

                              <div className="um-user-info">
                                <strong>
                                  {user?.name ||
                                    "N/A"}
                                </strong>

                                <small>
                                  ID:{" "}
                                  {user?.id ??
                                    "N/A"}
                                </small>
                              </div>
                            </div>
                          </td>

                          {/* USERNAME */}

                          <td>
                            <span className="um-username">
                              {user?.username ||
                                "N/A"}
                            </span>
                          </td>

                          {/* EMAIL */}

                          <td>
                            <div className="um-contact-cell">
                              <FaEnvelope />

                              <span>
                                {user?.email ||
                                  "N/A"}
                              </span>
                            </div>
                          </td>

                          {/* PHONE */}

                          <td>
                            <div className="um-contact-cell">
                              <FaPhone />

                              <span>
                                {user?.phone ||
                                  "N/A"}
                              </span>
                            </div>
                          </td>

                          {/* ROLE */}

                          <td>
                            <span
                              className={`um-role ${getRoleClass(
                                user?.role
                              )}`}
                            >
                              {user?.role ||
                                "N/A"}
                            </span>
                          </td>

                          {/* SCHOOL */}

                          <td>
                            <div className="um-school-cell">
                              <div className="um-school-icon">
                                <FaSchool />
                              </div>

                              <div>
                                <strong>
                                  {user?.schoolName ||
                                    "No School"}
                                </strong>

                                {user?.schoolCode && (
                                  <small>
                                    {
                                      user.schoolCode
                                    }
                                  </small>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* USER GROUP */}

                          <td>
                            {user?.userGroupName ? (
                              <div className="um-group-cell">
                                <strong>
                                  {
                                    user.userGroupName
                                  }
                                </strong>

                                <small>
                                  {
                                    user.userGroupCode
                                  }
                                </small>
                              </div>
                            ) : (
                              <span className="um-muted">
                                N/A
                              </span>
                            )}
                          </td>

                          {/* STATUS */}

                          <td>
                            <div className="um-status-control">
                              <button
                                type="button"
                                className={`um-status-switch ${
                                  isActive
                                    ? "um-switch-active"
                                    : "um-switch-inactive"
                                }`}
                                onClick={() =>
                                  updateUserStatus(
                                    user
                                  )
                                }
                                disabled={
                                  isUpdating
                                }
                                title={
                                  isActive
                                    ? "Click to deactivate user"
                                    : "Click to activate user"
                                }
                              >
                                <span className="um-switch-circle"></span>
                              </button>

                              <span
                                className={`um-status-text ${
                                  isActive
                                    ? "um-status-text-active"
                                    : "um-status-text-inactive"
                                }`}
                              >
                                {isUpdating
                                  ? "Updating..."
                                  : isActive
                                  ? "ACTIVE"
                                  : "INACTIVE"}
                              </span>
                            </div>
                          </td>

                          {/* ACTION */}

                          <td>
                            <button
                              className="um-forgot-btn"
                              onClick={() =>
                                openResetModal(
                                  user
                                )
                              }
                              disabled={
                                !user?.email
                              }
                            >
                              <FaKey />

                              <span>
                                Forgot Password
                              </span>
                            </button>
                          </td>

                          {/* VIEW */}

                          <td>
                            <button
                              className="um-forgot-btn"
                              onClick={() =>
                                openStudentDetails(
                                  user
                                )
                              }
                              title="View User Details"
                            >
                              <FaEye />
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          USER DETAILS
      ===================================================== */}

      {showStudentDetails &&
        selectedUser && (
          <div className="px-2 mt-3">
            <div className="um-details-card shadow rounded-4">
              {/* HEADER */}

              <div className="um-details-header">
                <div className="d-flex align-items-center gap-3">
                  <div className="um-details-avatar">
                    {getInitials(
                      selectedUser?.name
                    )}
                  </div>

                  <div>
                    <h4>
                      {selectedUser?.name ||
                        "User Details"}
                    </h4>

                    <p>
                      Complete information
                      about this user
                    </p>
                  </div>
                </div>

                <button
                  className="um-details-close"
                  onClick={
                    closeStudentDetails
                  }
                >
                  <FaTimes />
                </button>
              </div>

              {/* BODY */}

              <div className="um-details-body">
                {/* ACCOUNT SUMMARY */}

                <div className="um-details-summary">
                  <div className="um-details-summary-item">
                    <span>Role</span>

                    <strong>
                      <span
                        className={`um-role ${getRoleClass(
                          selectedUser?.role
                        )}`}
                      >
                        {selectedUser?.role ||
                          "N/A"}
                      </span>
                    </strong>
                  </div>

                  <div className="um-details-summary-item">
                    <span>Username</span>

                    <strong>
                      {selectedUser?.username ||
                        "N/A"}
                    </strong>
                  </div>

                  <div className="um-details-summary-item">
                    <span>Account Status</span>

                    <strong
                      className={
                        String(
                          selectedUser?.status ||
                            ""
                        ).toUpperCase() ===
                        "ACTIVE"
                          ? "um-detail-active"
                          : "um-detail-inactive"
                      }
                    >
                      <span className="um-detail-status-dot"></span>

                      {String(
                        selectedUser?.status ||
                          "N/A"
                      ).toUpperCase()}
                    </strong>
                  </div>
                </div>

                <div className="row g-3 mt-1">
                  {/* PERSONAL INFORMATION */}

                  <div className="col-12 col-lg-6">
                    <div className="um-details-section">
                      <div className="um-details-section-title">
                        <div className="um-details-section-icon">
                          <FaUser />
                        </div>

                        <div>
                          <h5>
                            Personal Information
                          </h5>

                          <p>
                            Basic user information
                          </p>
                        </div>
                      </div>

                      <div className="um-details-grid">
                        <div className="um-detail-item">
                          <label>
                            Full Name
                          </label>

                          <div>
                            <FaUser />
                            <span>
                              {selectedUser?.name ||
                                "N/A"}
                            </span>
                          </div>
                        </div>

                        <div className="um-detail-item">
                          <label>
                            User ID
                          </label>

                          <div>
                            <FaIdBadge />
                            <span>
                              {selectedUser?.id ??
                                "N/A"}
                            </span>
                          </div>
                        </div>

                        <div className="um-detail-item">
                          <label>
                            Username
                          </label>

                          <div>
                            <FaUserTag />
                            <span>
                              {selectedUser?.username ||
                                "N/A"}
                            </span>
                          </div>
                        </div>

                        <div className="um-detail-item">
                          <label>
                            Role
                          </label>

                          <div>
                            <FaUserShield />
                            <span>
                              {selectedUser?.role ||
                                "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CONTACT INFORMATION */}

                  <div className="col-12 col-lg-6">
                    <div className="um-details-section">
                      <div className="um-details-section-title">
                        <div className="um-details-section-icon">
                          <FaEnvelope />
                        </div>

                        <div>
                          <h5>
                            Contact Information
                          </h5>

                          <p>
                            Registered contact
                            details
                          </p>
                        </div>
                      </div>

                      <div className="um-details-grid">
                        <div className="um-detail-item um-detail-full">
                          <label>
                            Email Address
                          </label>

                          <div>
                            <FaEnvelope />
                            <span>
                              {selectedUser?.email ||
                                "N/A"}
                            </span>
                          </div>
                        </div>

                        <div className="um-detail-item">
                          <label>
                            Phone Number
                          </label>

                          <div>
                            <FaPhone />
                            <span>
                              {selectedUser?.phone ||
                                "N/A"}
                            </span>
                          </div>
                        </div>

                        <div className="um-detail-item">
                          <label>
                            Phone Verification
                          </label>

                          <div>
                            {selectedUser?.phoneVerified ? (
                              <>
                                <FaCheckCircle className="um-verified-icon" />
                                <span>
                                  Verified
                                </span>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle className="um-not-verified-icon" />
                                <span>
                                  Not Verified
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="um-detail-item">
                          <label>
                            Email Verification
                          </label>

                          <div>
                            {selectedUser?.emailVerified ? (
                              <>
                                <FaCheckCircle className="um-verified-icon" />
                                <span>
                                  Verified
                                </span>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle className="um-not-verified-icon" />
                                <span>
                                  Not Verified
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SCHOOL INFORMATION */}

                  <div className="col-12">
                    <div className="um-details-section">
                      <div className="um-details-section-title">
                        <div className="um-details-section-icon">
                          <FaSchool />
                        </div>

                        <div>
                          <h5>
                            School Information
                          </h5>

                          <p>
                            School assigned to
                            this user
                          </p>
                        </div>
                      </div>

                      <div className="um-school-detail-box">
                        <div className="um-school-detail-icon">
                          <FaSchool />
                        </div>

                        <div className="um-school-detail-content">
                          <span>
                            School Name
                          </span>

                          <strong>
                            {selectedUser?.schoolName ||
                              "No School Assigned"}
                          </strong>

                          {selectedUser?.schoolCode && (
                            <small>
                              School Code:{" "}
                              {
                                selectedUser.schoolCode
                              }
                            </small>
                          )}
                        </div>

                        <div className="um-school-detail-id">
                          <span>
                            School ID
                          </span>

                          <strong>
                            {selectedUser?.schoolId ??
                              "N/A"}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* USER GROUP */}

                  <div className="col-12 col-lg-6">
                    <div className="um-details-section">
                      <div className="um-details-section-title">
                        <div className="um-details-section-icon">
                          <FaUsers />
                        </div>

                        <div>
                          <h5>
                            User Group
                          </h5>

                          <p>
                            Group assigned to
                            this user
                          </p>
                        </div>
                      </div>

                      <div className="um-group-detail-box">
                        {selectedUser?.userGroupName ? (
                          <>
                            <div className="um-group-detail-icon">
                              <FaUsers />
                            </div>

                            <div>
                              <span>
                                Group Name
                              </span>

                              <strong>
                                {
                                  selectedUser.userGroupName
                                }
                              </strong>

                              <small>
                                Code:{" "}
                                {selectedUser?.userGroupCode ||
                                  "N/A"}
                              </small>
                            </div>
                          </>
                        ) : (
                          <div className="um-no-group">
                            <FaTimesCircle />

                            <span>
                              No user group
                              assigned
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* STATUS INFORMATION */}

                  <div className="col-12 col-lg-6">
                    <div className="um-details-section">
                      <div className="um-details-section-title">
                        <div className="um-details-section-icon">
                          <FaCheckCircle />
                        </div>

                        <div>
                          <h5>
                            Account Status
                          </h5>

                          <p>
                            Manage user's
                            account access
                          </p>
                        </div>
                      </div>

                      <div className="um-status-detail-box">
                        <div>
                          <span>
                            Current Status
                          </span>

                          <strong
                            className={
                              String(
                                selectedUser?.status ||
                                  ""
                              ).toUpperCase() ===
                              "ACTIVE"
                                ? "um-detail-active"
                                : "um-detail-inactive"
                            }
                          >
                            <span className="um-detail-status-dot"></span>

                            {String(
                              selectedUser?.status ||
                                "N/A"
                            ).toUpperCase()}
                          </strong>
                        </div>

                        <button
                          type="button"
                          className={`um-status-switch ${
                            String(
                              selectedUser?.status ||
                                ""
                            ).toUpperCase() ===
                            "ACTIVE"
                              ? "um-switch-active"
                              : "um-switch-inactive"
                          }`}
                          onClick={() =>
                            updateUserStatus(
                              selectedUser
                            )
                          }
                          disabled={
                            statusUpdatingId ===
                            selectedUser?.id
                          }
                        >
                          <span className="um-switch-circle"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER */}

              <div className="um-details-footer">
                <button
                  className="um-cancel-btn"
                  onClick={
                    closeStudentDetails
                  }
                >
                  Close
                </button>

                {selectedUser?.email && (
                  <button
                    className="um-send-otp-btn"
                    onClick={() => {
                      setShowStudentDetails(
                        false
                      );
                      openResetModal(
                        selectedUser
                      );
                    }}
                  >
                    <FaKey />
                    Reset Password
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      {/* =====================================================
          RESET PASSWORD MODAL
      ===================================================== */}

      {showResetModal &&
        selectedUser && (
          <div
            className="um-modal-overlay"
            onClick={closeResetModal}
          >
            <div
              className="um-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              {/* MODAL HEADER */}

              <div className="um-modal-header">
                <div className="um-modal-title">
                  <div className="um-modal-icon">
                    <FaKey />
                  </div>

                  <div>
                    <h3>
                      Reset Password
                    </h3>

                    <p>
                      Step {resetStep} of 3
                    </p>
                  </div>
                </div>

                <button
                  className="um-modal-close"
                  onClick={
                    closeResetModal
                  }
                  disabled={resetLoading}
                >
                  <FaTimes />
                </button>
              </div>

              {/* PROGRESS */}

              <div className="um-progress">
                <div
                  className={
                    resetStep >= 1
                      ? "active"
                      : ""
                  }
                >
                  <span>1</span>
                  <small>Send OTP</small>
                </div>

                <div
                  className={
                    resetStep >= 2
                      ? "active"
                      : ""
                  }
                >
                  <span>2</span>
                  <small>Verify OTP</small>
                </div>

                <div
                  className={
                    resetStep >= 3
                      ? "active"
                      : ""
                  }
                >
                  <span>3</span>
                  <small>
                    New Password
                  </small>
                </div>
              </div>

              {/* BODY */}

              <div className="um-modal-body">
                {/* USER */}

                <div className="um-selected-user">
                  <div className="um-selected-avatar">
                    {getInitials(
                      selectedUser.name
                    )}
                  </div>

                  <div>
                    <strong>
                      {selectedUser.name}
                    </strong>

                    <span>
                      {selectedUser.role}
                    </span>
                  </div>
                </div>

                {/* EMAIL */}

                <div className="um-email-box">
                  <div className="um-email-icon">
                    <FaEnvelope />
                  </div>

                  <div>
                    <label>
                      Registered Email
                    </label>

                    <strong>
                      {selectedUser.email}
                    </strong>
                  </div>
                </div>

                {/* STEP 1 */}

                {resetStep === 1 && (
                  <div className="um-step-content">
                    <div className="um-reset-info">
                      <FaPaperPlane />

                      <p>
                        Click below to send a
                        6-digit OTP to this
                        user's registered
                        email address.
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}

                {resetStep === 2 && (
                  <div className="um-step-content">
                    <div className="um-reset-info">
                      <FaEnvelope />

                      <p>
                        Enter the 6-digit OTP
                        sent to the registered
                        email address.
                      </p>
                    </div>

                    <label className="um-input-label">
                      Enter OTP
                    </label>

                    <input
                      className="um-otp-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) =>
                        setOtp(
                          e.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                    />
                  </div>
                )}

                {/* STEP 3 */}

                {resetStep === 3 && (
                  <div className="um-step-content">
                    <div className="um-reset-info">
                      <FaLock />

                      <p>
                        OTP verified. Now
                        create a new password
                        for this user.
                      </p>
                    </div>

                    <label className="um-input-label">
                      New Password
                    </label>

                    <div className="um-password-box">
                      <input
                        type={
                          showNewPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) =>
                          setNewPassword(
                            e.target.value
                          )
                        }
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowNewPassword(
                            !showNewPassword
                          )
                        }
                      >
                        {showNewPassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>
                    </div>

                    <label className="um-input-label">
                      Confirm Password
                    </label>

                    <div className="um-password-box">
                      <input
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Confirm new password"
                        value={
                          confirmPassword
                        }
                        onChange={(e) =>
                          setConfirmPassword(
                            e.target.value
                          )
                        }
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>
                    </div>

                    <small className="um-password-hint">
                      Password must be at least
                      6 characters.
                    </small>
                  </div>
                )}

                {/* SUCCESS */}

                {resetMessage && (
                  <div className="um-success-message">
                    <FaCheckCircle />

                    <span>
                      {resetMessage}
                    </span>
                  </div>
                )}

                {/* ERROR */}

                {resetError && (
                  <div className="um-reset-error">
                    <FaTimesCircle />

                    <span>
                      {resetError}
                    </span>
                  </div>
                )}
              </div>

              {/* FOOTER */}

              <div className="um-modal-footer">
                <button
                  className="um-cancel-btn"
                  onClick={
                    closeResetModal
                  }
                  disabled={resetLoading}
                >
                  Close
                </button>

                {/* STEP 1 */}

                {resetStep === 1 && (
                  <button
                    className="um-send-otp-btn"
                    onClick={sendResetOtp}
                    disabled={resetLoading}
                  >
                    {resetLoading ? (
                      <>
                        <span className="um-small-spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send OTP
                      </>
                    )}
                  </button>
                )}

                {/* STEP 2 */}

                {resetStep === 2 && (
                  <button
                    className="um-send-otp-btn"
                    onClick={verifyOtp}
                    disabled={
                      resetLoading ||
                      otp.length !== 6
                    }
                  >
                    {resetLoading ? (
                      <>
                        <span className="um-small-spinner"></span>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <FaCheckCircle />
                        Verify OTP
                      </>
                    )}
                  </button>
                )}

                {/* STEP 3 */}

                {resetStep === 3 && (
                  <button
                    className="um-send-otp-btn"
                    onClick={changePassword}
                    disabled={resetLoading}
                  >
                    {resetLoading ? (
                      <>
                        <span className="um-small-spinner"></span>
                        Changing...
                      </>
                    ) : (
                      <>
                        <FaLock />
                        Change Password
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .um-refresh-btn {
          border: none;
          background: #1769e0;
          color: white;
          height: 42px;
          padding: 0 17px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .um-refresh-btn:disabled {
          opacity: .7;
        }

        .um-spin {
          animation: umSpin 1s linear infinite;
        }

        @keyframes umSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        /* STATS */

        .um-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        .um-stat-card {
          background: white;
          border: 1px solid #e7edf5;
          border-radius: 14px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .um-stat-icon {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .um-stat-blue {
          background: #e9f2ff;
          color: #1769e0;
        }

        .um-stat-green {
          background: #e9f9f0;
          color: #159957;
        }

        .um-stat-red {
          background: #fff0f0;
          color: #df3c3c;
        }

        .um-stat-purple {
          background: #f1edff;
          color: #7357d8;
        }

        .um-stat-card span {
          display: block;
          color: #7b8798;
          font-size: 13px;
        }

        .um-stat-card strong {
          font-size: 22px;
        }

        /* TOOLBAR */

        .um-toolbar {
          background: white;
          border: 1px solid #e7edf5;
          border-radius: 14px;
          padding: 15px;
          display: flex;
          gap: 15px;
          margin-bottom: 18px;
        }

        .um-search-box {
          flex: 1;
          height: 44px;
          border: 1px solid #dbe4ef;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 13px;
        }

        .um-search-box svg {
          color: #7c8a9d;
        }

        .um-toolbar-wrapper {
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
        }

        .um-search-box {
          flex: 1;
          min-width: 260px;
        }

        .um-filters-container {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .um-filter-box {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .um-filter-box label {
          font-size: 10px;
          font-weight: 700;
          color: #667085;
          margin-left: 2px;
        }

        .um-filter-box select {
          height: 40px;
          min-width: 145px;
          border: 1px solid #dbe4ef;
          border-radius: 9px;
          padding: 0 12px;
          background: white;
          color: #344054;
          font-size: 12px;
          outline: none;
          cursor: pointer;
        }

        .um-filter-box select:focus {
          border-color: #1769e0;
          box-shadow: 0 0 0 3px rgba(23,105,224,.08);
        }

        .um-clear-filter-btn {
          height: 40px;
          margin-top: 15px;
          padding: 0 12px;
          border: 1px solid #ffd1d1;
          background: #fff5f5;
          color: #d93636;
          border-radius: 9px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 650;
          cursor: pointer;
        }

        .um-clear-filter-btn:hover {
          background: #d93636;
          color: white;
        }

        @media (max-width: 1100px) {

          .um-toolbar-wrapper {
            flex-direction: column;
            align-items: stretch !important;
          }

          .um-search-box {
            width: 100%;
          }

          .um-filters-container {
            width: 100%;
          }

          .um-filter-box {
            flex: 1;
          }

          .um-filter-box select {
            width: 100%;
          }

        }

        @media (max-width: 600px) {

          .um-filters-container {
            flex-direction: column;
            align-items: stretch;
          }

          .um-filter-box {
            width: 100%;
          }

          .um-clear-filter-btn {
            width: 100%;
            justify-content: center;
            margin-top: 0;
          }

        }

        .um-search-box input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 14px;
        }

        .um-clear-search {
          border: none;
          background: transparent;
          cursor: pointer;
          color: #8b98a8;
        }

        /* TABLE */

        .um-table-card {
          background: white;
          border: 1px solid #e7edf5;
          border-radius: 14px;
          overflow: hidden;
        }

        .um-table-header {
          padding: 18px 20px;
          border-bottom: 1px solid #edf1f6;
        }

        .um-table-header h3 {
          margin: 0;
          font-size: 17px;
        }

        .um-table-header p {
          margin: 4px 0 0;
          color: #7a8798;
          font-size: 12px;
        }

        .um-table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .um-table {
          width: 100%;
          min-width: 1250px;
          border-collapse: collapse;
        }

        .um-table thead {
          background: #f7faff;
        }

        .um-table th {
          padding: 13px 14px;
          text-align: left;
          font-size: 11px;
          color: #657286;
          text-transform: uppercase;
          border-bottom: 1px solid #e7edf5;
        }

        .um-table td {
          padding: 14px;
          border-bottom: 1px solid #edf1f6;
          vertical-align: middle;
          font-size: 13px;
        }

        .um-table tbody tr:hover {
          background: #fbfdff;
        }

        .um-index {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #f1f5f9;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
        }

        .um-user-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .um-avatar {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #e8f1ff;
          color: #1769e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }

        .um-user-info strong {
          display: block;
          font-size: 13px;
        }

        .um-user-info small {
          color: #8995a5;
          font-size: 10px;
        }

        .um-contact-cell {
          display: flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
        }

        .um-contact-cell svg {
          color: #8b98a8;
          font-size: 11px;
        }

        .um-contact-cell span {
          font-size: 12px;
        }

        .um-role {
          display: inline-flex;
          padding: 5px 9px;
          border-radius: 7px;
          font-size: 10px;
          font-weight: 700;
        }

        .um-role-superadmin {
          background: #f1edff;
          color: #7054d6;
        }

        .um-role-admin {
          background: #e8f2ff;
          color: #1769e0;
        }

        .um-role-default {
          background: #f1f4f7;
          color: #667085;
        }

        .um-school-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .um-school-icon {
          width: 31px;
          height: 31px;
          border-radius: 8px;
          background: #edf5ff;
          color: #1769e0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .um-school-cell strong {
          display: block;
          font-size: 12px;
        }

        .um-school-cell small,
        .um-group-cell small {
          display: block;
          color: #8a96a6;
          font-size: 10px;
        }

        .um-group-cell strong {
          font-size: 11px;
        }

        .um-muted {
          color: #98a2b3;
        }

        /* =====================================================
           STATUS SWITCH
        ===================================================== */

        .um-status-control {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .um-status-switch {
          position: relative;
          width: 38px;
          height: 21px;
          border: none;
          border-radius: 20px;
          padding: 0;
          cursor: pointer;
          transition: all .2s ease;
          flex-shrink: 0;
        }

        .um-switch-active {
          background: #159957;
          box-shadow: 0 3px 8px rgba(21,153,87,.20);
        }

        .um-switch-inactive {
          background: #cbd5e1;
        }

        .um-switch-circle {
          position: absolute;
          width: 17px;
          height: 17px;
          top: 2px;
          background: white;
          border-radius: 50%;
          transition: all .2s ease;
          box-shadow: 0 1px 4px rgba(0,0,0,.20);
        }

        .um-switch-active .um-switch-circle {
          left: 19px;
        }

        .um-switch-inactive .um-switch-circle {
          left: 2px;
        }

        .um-status-switch:disabled {
          opacity: .55;
          cursor: not-allowed;
        }

        .um-status-text {
          font-size: 10px;
          font-weight: 750;
        }

        .um-status-text-active {
          color: #14804a;
        }

        .um-status-text-inactive {
          color: #c53030;
        }

        .um-forgot-btn {
          border: 1px solid #cfe0fa;
          background: #f5f9ff;
          color: #1769e0;
          border-radius: 8px;
          height: 34px;
          padding: 0 10px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 650;
          cursor: pointer;
          white-space: nowrap;
        }

        .um-forgot-btn:hover {
          background: #1769e0;
          color: white;
        }

        .um-forgot-btn:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        /* =====================================================
           USER DETAILS
        ===================================================== */

        .um-details-card {
          background: white;
          border: 1px solid #e7edf5;
          border-radius: 14px;
          overflow: hidden;
        }

        .um-details-header {
          padding: 20px;
          border-bottom: 1px solid #edf1f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f7faff 100%
          );
        }

        .um-details-avatar {
          width: 52px;
          height: 52px;
          border-radius: 13px;
          background: #e8f1ff;
          color: #1769e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 800;
          border: 1px solid #dbeafe;
        }

        .um-details-header h4 {
          margin: 0;
          font-size: 18px;
          font-weight: 750;
          color: #1f2937;
        }

        .um-details-header p {
          margin: 4px 0 0;
          color: #8995a5;
          font-size: 11px;
        }

        .um-details-close {
          width: 34px;
          height: 34px;
          border: 1px solid #e1e7ef;
          background: white;
          color: #667085;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .um-details-close:hover {
          background: #f5f9ff;
          color: #1769e0;
          border-color: #cfe0fa;
        }

        .um-details-body {
          padding: 20px;
        }

        .um-details-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid #e7edf5;
          border-radius: 11px;
          overflow: hidden;
          background: #f9fbfe;
        }

        .um-details-summary-item {
          padding: 14px 16px;
          border-right: 1px solid #e7edf5;
        }

        .um-details-summary-item:last-child {
          border-right: none;
        }

        .um-details-summary-item > span {
          display: block;
          color: #8995a5;
          font-size: 10px;
          margin-bottom: 6px;
          text-transform: uppercase;
          font-weight: 700;
        }

        .um-details-summary-item strong {
          font-size: 12px;
          color: #344054;
        }

        .um-details-section {
          height: 100%;
          border: 1px solid #e7edf5;
          border-radius: 11px;
          overflow: hidden;
          background: white;
        }

        .um-details-section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 15px;
          background: #f8fbff;
          border-bottom: 1px solid #e7edf5;
        }

        .um-details-section-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #edf5ff;
          color: #1769e0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .um-details-section-title h5 {
          margin: 0;
          font-size: 13px;
          font-weight: 750;
          color: #344054;
        }

        .um-details-section-title p {
          margin: 2px 0 0;
          color: #8995a5;
          font-size: 10px;
        }

        .um-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 8px;
        }

        .um-detail-item {
          padding: 11px;
          border-bottom: 1px solid #f0f3f7;
        }

        .um-detail-item:nth-last-child(-n+2) {
          border-bottom: none;
        }

        .um-detail-item label {
          display: block;
          color: #98a2b3;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .um-detail-item > div {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #344054;
        }

        .um-detail-item > div svg {
          color: #8b98a8;
          font-size: 11px;
          flex-shrink: 0;
        }

        .um-detail-item > div span {
          font-size: 11px;
          word-break: break-word;
        }

        .um-detail-full {
          grid-column: 1 / -1;
        }

        .um-verified-icon {
          color: #159957 !important;
        }

        .um-not-verified-icon {
          color: #d93636 !important;
        }

        .um-school-detail-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
        }

        .um-school-detail-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #edf5ff;
          color: #1769e0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .um-school-detail-content {
          flex: 1;
          min-width: 0;
        }

        .um-school-detail-content span,
        .um-school-detail-id span {
          display: block;
          color: #98a2b3;
          font-size: 9px;
          text-transform: uppercase;
          font-weight: 700;
        }

        .um-school-detail-content strong {
          display: block;
          color: #344054;
          font-size: 13px;
          margin-top: 2px;
        }

        .um-school-detail-content small {
          color: #8995a5;
          font-size: 10px;
        }

        .um-school-detail-id {
          padding-left: 15px;
          border-left: 1px solid #e7edf5;
          min-width: 90px;
        }

        .um-school-detail-id strong {
          display: block;
          color: #1769e0;
          font-size: 12px;
          margin-top: 2px;
        }

        .um-group-detail-box {
          min-height: 80px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
        }

        .um-group-detail-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #f1edff;
          color: #7054d6;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .um-group-detail-box span,
        .um-group-detail-box small {
          display: block;
          color: #98a2b3;
          font-size: 9px;
        }

        .um-group-detail-box strong {
          display: block;
          color: #344054;
          font-size: 12px;
          margin: 2px 0;
        }

        .um-no-group {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #98a2b3;
          font-size: 11px;
        }

        .um-no-group svg {
          color: #d93636;
        }

        .um-status-detail-box {
          min-height: 80px;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .um-status-detail-box > div > span {
          display: block;
          color: #98a2b3;
          font-size: 9px;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .um-status-detail-box strong {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
        }

        .um-detail-active {
          color: #14804a !important;
        }

        .um-detail-inactive {
          color: #c53030 !important;
        }

        .um-detail-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
          display: inline-block;
        }

        .um-details-footer {
          padding: 14px 20px;
          border-top: 1px solid #edf1f6;
          display: flex;
          justify-content: flex-end;
          gap: 9px;
        }

        /* LOADING */

        .um-loading {
          min-height: 280px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .um-loader {
          width: 35px;
          height: 35px;
          border: 3px solid #e5edf8;
          border-top-color: #1769e0;
          border-radius: 50%;
          animation: umSpin .8s linear infinite;
        }

        .um-loading p {
          color: #7b8798;
          font-size: 13px;
        }

        .um-empty {
          min-height: 280px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .um-empty-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #edf4ff;
          color: #1769e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
        }

        .um-empty h4 {
          margin: 12px 0 5px;
        }

        .um-empty p {
          color: #8a96a6;
          font-size: 13px;
        }

        /* ERROR */

        .um-error-box {
          background: #fff4f4;
          border: 1px solid #ffd5d5;
          border-radius: 12px;
          padding: 13px 15px;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #c53030;
        }

        .um-error-box div {
          flex: 1;
        }

        .um-error-box p {
          margin: 3px 0 0;
          font-size: 12px;
        }

        .um-error-box button {
          border: 1px solid #f1a8a8;
          background: white;
          color: #c53030;
          border-radius: 8px;
          padding: 7px 12px;
          cursor: pointer;
        }

        /* MODAL */

        .um-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, .55);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 9999;
        }

        .um-modal {
          width: 100%;
          max-width: 480px;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(15, 23, 42, .2);
        }

        .um-modal-header {
          padding: 18px 20px;
          border-bottom: 1px solid #edf1f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .um-modal-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .um-modal-icon {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          background: #eaf2ff;
          color: #1769e0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .um-modal-title h3 {
          margin: 0;
          font-size: 17px;
        }

        .um-modal-title p {
          margin: 3px 0 0;
          color: #8a96a6;
          font-size: 11px;
        }

        .um-modal-close {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          background: #f5f7fa;
          cursor: pointer;
        }

        /* PROGRESS */

        .um-progress {
          display: flex;
          padding: 15px 20px;
          border-bottom: 1px solid #edf1f6;
          justify-content: space-between;
        }

        .um-progress > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          flex: 1;
          color: #a0aab7;
        }

        .um-progress span {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #edf1f5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
        }

        .um-progress small {
          font-size: 9px;
        }

        .um-progress .active {
          color: #1769e0;
        }

        .um-progress .active span {
          background: #1769e0;
          color: white;
        }

        /* BODY */

        .um-modal-body {
          padding: 20px;
        }

        .um-selected-user {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 12px;
          border-radius: 11px;
          background: #f7faff;
          border: 1px solid #e6eef9;
          margin-bottom: 14px;
        }

        .um-selected-avatar {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #1769e0;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }

        .um-selected-user strong {
          display: block;
          font-size: 13px;
        }

        .um-selected-user span {
          display: block;
          color: #7c8899;
          font-size: 11px;
          margin-top: 3px;
        }

        .um-email-box {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 12px;
          border: 1px solid #e4eaf2;
          border-radius: 10px;
        }

        .um-email-icon {
          width: 35px;
          height: 35px;
          border-radius: 8px;
          background: #edf5ff;
          color: #1769e0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .um-email-box label {
          display: block;
          color: #8995a5;
          font-size: 10px;
        }

        .um-email-box strong {
          display: block;
          color: #344054;
          font-size: 12px;
          word-break: break-all;
        }

        .um-step-content {
          margin-top: 15px;
        }

        .um-reset-info {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          padding: 11px;
          border-radius: 9px;
          background: #f7faff;
          color: #5d6b7e;
          margin-bottom: 15px;
        }

        .um-reset-info svg {
          color: #1769e0;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .um-reset-info p {
          margin: 0;
          font-size: 11px;
          line-height: 1.6;
        }

        .um-input-label {
          display: block;
          margin-bottom: 6px;
          color: #475467;
          font-size: 11px;
          font-weight: 650;
        }

        .um-otp-input {
          width: 100%;
          height: 48px;
          border: 1px solid #dbe4ef;
          border-radius: 9px;
          outline: none;
          padding: 0 14px;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 7px;
        }

        .um-otp-input:focus {
          border-color: #1769e0;
        }

        .um-password-box {
          width: 100%;
          height: 44px;
          border: 1px solid #dbe4ef;
          border-radius: 9px;
          display: flex;
          align-items: center;
          margin-bottom: 13px;
        }

        .um-password-box:focus-within {
          border-color: #1769e0;
        }

        .um-password-box input {
          flex: 1;
          height: 100%;
          border: none;
          outline: none;
          padding: 0 12px;
          font-size: 13px;
        }

        .um-password-box button {
          border: none;
          background: transparent;
          color: #7c8899;
          padding: 0 12px;
          cursor: pointer;
        }

        .um-password-hint {
          color: #8a96a6;
          font-size: 10px;
        }

        .um-success-message {
          margin-top: 13px;
          padding: 10px 12px;
          border-radius: 8px;
          background: #eaf9f1;
          color: #16804b;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
        }

        .um-reset-error {
          margin-top: 13px;
          padding: 10px 12px;
          border-radius: 8px;
          background: #fff1f1;
          color: #c53030;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
        }

        /* FOOTER */

        .um-modal-footer {
          padding: 14px 20px;
          border-top: 1px solid #edf1f6;
          display: flex;
          justify-content: flex-end;
          gap: 9px;
        }

        .um-cancel-btn {
          height: 38px;
          padding: 0 15px;
          border: 1px solid #dbe3ed;
          background: white;
          color: #5d6979;
          border-radius: 8px;
          cursor: pointer;
        }

        .um-send-otp-btn {
          height: 38px;
          padding: 0 16px;
          border: none;
          background: #1769e0;
          color: white;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 650;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          cursor: pointer;
        }

        .um-send-otp-btn:hover {
          background: #0f56bd;
        }

        .um-send-otp-btn:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .um-small-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,.35);
          border-top-color: white;
          border-radius: 50%;
          animation: umSpin .7s linear infinite;
        }

        /* RESPONSIVE */

        @media (max-width: 1100px) {

          .um-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }

        @media (max-width: 768px) {

          .user-management-page {
            padding: 15px;
          }

          .um-stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .um-toolbar {
            flex-direction: column;
          }

          .um-filter-box {
            justify-content: space-between;
          }

          .um-details-summary {
            grid-template-columns: 1fr;
          }

          .um-details-summary-item {
            border-right: none;
            border-bottom: 1px solid #e7edf5;
          }

          .um-details-summary-item:last-child {
            border-bottom: none;
          }

          .um-school-detail-box {
            align-items: flex-start;
          }

          .um-school-detail-id {
            margin-left: auto;
          }

        }

        @media (max-width: 480px) {

          .um-stats-grid {
            grid-template-columns: 1fr;
          }

          .um-header h2 {
            font-size: 20px;
          }

          .um-modal-footer {
            flex-direction: column-reverse;
          }

          .um-cancel-btn,
          .um-send-otp-btn {
            width: 100%;
          }

          .um-details-header {
            align-items: flex-start;
          }

          .um-details-header h4 {
            font-size: 15px;
          }

          .um-details-body {
            padding: 12px;
          }

          .um-details-grid {
            grid-template-columns: 1fr;
          }

          .um-detail-item:nth-last-child(-n+2) {
            border-bottom: 1px solid #f0f3f7;
          }

          .um-detail-item:last-child {
            border-bottom: none;
          }

          .um-school-detail-box {
            flex-wrap: wrap;
          }

          .um-school-detail-id {
            width: 100%;
            margin-left: 0;
            padding-left: 56px;
            border-left: none;
          }

          .um-details-footer {
            flex-direction: column-reverse;
          }

          .um-details-footer button {
            width: 100%;
          }

        }

      `}</style>
    </>
  );
};

export default UserManagement;