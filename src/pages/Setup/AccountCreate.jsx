
import React, { useEffect, useState } from "react";
import {
  LuUserPlus,
  LuUser,
  LuMail,
  LuPhone,
  LuLock,
  LuEye,
  LuEyeOff,
  LuShieldCheck,
  LuUsers,
  LuCircleCheck,
  LuRefreshCw,
  LuSave,
  LuArrowLeft,
  LuKeyRound,
} from "react-icons/lu";
import { MdOutlineSchool } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";

const AccountCreate = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [userGroups, setUserGroups] = useState([]);

  const [formData, setFormData] = useState({
    accountType: "STAFF",
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    userGroupId: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  /* =====================================================
     ACCOUNT TYPES
  ===================================================== */

  const accountTypes = [
    {
      value: "STAFF",
      label: "Staff",
    },
    {
      value: "TEACHER",
      label: "Teacher",
    },
    {
      value: "PARENT",
      label: "Parent",
    },
    {
      value: "STUDENT",
      label: "Student",
    },
    {
      value: "ADMIN",
      label: "Admin",
    },
  ];

  /* =====================================================
     FETCH USER GROUPS
  ===================================================== */

  useEffect(() => {
    if (!user?.schoolId || !token) return;

    const fetchGroups = async () => {
      setGroupsLoading(true);

      try {
        const response = await axios.get(
          `/api/user-group/all?schoolId=${user.schoolId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserGroups(response.data || []);
      } catch (error) {
        console.error("Error fetching user groups:", error);
      } finally {
        setGroupsLoading(false);
      }
    };

    fetchGroups();
  }, [user?.schoolId, token]);

  /* =====================================================
     HANDLE CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =====================================================
     GENERATE PASSWORD
  ===================================================== */

  const generatePassword = () => {
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$";

    let password = "";

    for (let i = 0; i < 10; i++) {
      password += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setFormData((prev) => ({
      ...prev,
      password,
    }));

    setShowPassword(true);
  };

  /* =====================================================
     VALIDATION
  ===================================================== */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.accountType) {
      newErrors.accountType = "Please select account type.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    if (!formData.userGroupId) {
      newErrors.userGroupId = "Please select user group.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     CREATE ACCOUNT
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user?.schoolId) {
      alert("School information not found.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
      role: formData.accountType,
      status: formData.status,
      userGroupId: Number(formData.userGroupId),
      schoolId: user.schoolId,
    };

    try {
      setLoading(true);

      await axios.post("/api/user/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Account created successfully.");

      setFormData({
        accountType: "STAFF",
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        userGroupId: "",
        status: "Active",
      });

      setErrors({});
    } catch (error) {
      console.error("Error creating account:", error);

      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     RESET
  ===================================================== */

  const handleReset = () => {
    setFormData({
      accountType: "STAFF",
      name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      userGroupId: "",
      status: "Active",
    });

    setErrors({});
    setShowPassword(false);
  };

  return (
    <div className="mx-2 mt-2 mb-4">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div
        className="rounded-4 shadow-sm overflow-hidden mb-3"
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
                  width: "54px",
                  height: "54px",
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  boxShadow:
                    "0 8px 20px rgba(37,99,235,.22)",
                  flexShrink: 0,
                }}
              >
                <LuUserPlus size={28} />
              </div>

              <div>
                <h5 className="mb-1 fw-bold text-dark">
                  Create Account
                </h5>

                <div className="text-muted small">
                  Setup&nbsp; / &nbsp;Accounts&nbsp; / &nbsp;
                  Create Account
                </div>
              </div>

            </div>

            <div className="d-flex align-items-center gap-2">

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                }}
              >
                <MdOutlineSchool className="me-1" />
                Account Setup
              </span>

            </div>

          </div>

        </div>

        {/* BREADCRUMB */}

        <div
          className="px-4 py-2"
          style={{
            backgroundColor: "rgba(239,246,255,.75)",
            borderTop: "1px solid #e0ecff",
          }}
        >
          <small className="text-muted">
            Home&nbsp; › &nbsp;Setup&nbsp; › &nbsp;Accounts&nbsp; › &nbsp;
            <span className="text-primary fw-semibold">
              Create Account
            </span>
          </small>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="row g-3">

        {/* ===================================================
            LEFT SIDE - FORM
        =================================================== */}

        <div className="col-xl-8">

          <div
            className="bg-white rounded-4 shadow-sm p-3 p-md-4"
            style={{
              border: "1px solid #edf2f7",
            }}
          >

            {/* FORM HEADER */}

            <div className="d-flex align-items-center justify-content-between mb-4">

              <div className="d-flex align-items-center gap-3">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #dbeafe",
                  }}
                >
                  <LuUser size={21} />
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Account Information
                  </h6>

                  <small className="text-muted">
                    Enter user login and profile details
                  </small>
                </div>

              </div>

            </div>

            <form onSubmit={handleSubmit}>

              {/* ACCOUNT TYPE */}

              <div className="mb-4">

                <label className="form-label fw-semibold text-dark">
                  Account Type
                  <span className="text-danger ms-1">*</span>
                </label>

                <div className="row g-2">

                  {accountTypes.map((type) => (

                    <div
                      className="col-xl-4 col-md-6"
                      key={type.value}
                    >

                      <button
                        type="button"
                        className="w-100 text-start"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            accountType: type.value,
                          }))
                        }
                        style={{
                          borderRadius: "10px",
                          padding: "11px 13px",
                          background:
                            formData.accountType ===
                            type.value
                              ? "#eff6ff"
                              : "#fff",
                          border:
                            formData.accountType ===
                            type.value
                              ? "1px solid #60a5fa"
                              : "1px solid #dbe3ef",
                          color:
                            formData.accountType ===
                            type.value
                              ? "#2563eb"
                              : "#475569",
                        }}
                      >

                        <div className="d-flex align-items-center gap-2">

                          <div
                            className="d-flex align-items-center justify-content-center rounded-2"
                            style={{
                              width: "30px",
                              height: "30px",
                              background:
                                formData.accountType ===
                                type.value
                                  ? "#dbeafe"
                                  : "#f8fafc",
                            }}
                          >
                            <LuUser size={16} />
                          </div>

                          <span className="fw-semibold">
                            {type.label}
                          </span>

                          {formData.accountType ===
                            type.value && (
                            <LuCircleCheck
                              size={17}
                              className="ms-auto"
                            />
                          )}

                        </div>

                      </button>

                    </div>

                  ))}

                </div>

                {errors.accountType && (
                  <small className="text-danger">
                    {errors.accountType}
                  </small>
                )}

              </div>

              {/* NAME + USERNAME */}

              <div className="row g-3 mb-3">

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Full Name
                    <span className="text-danger ms-1">*</span>
                  </label>

                  <div className="position-relative">

                    <LuUser
                      size={17}
                      style={{
                        position: "absolute",
                        left: "13px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        color: "#94a3b8",
                      }}
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-control ${
                        errors.name
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter full name"
                      style={{
                        paddingLeft: "38px",
                        borderRadius: "9px",
                        minHeight: "43px",
                      }}
                    />

                  </div>

                  {errors.name && (
                    <small className="text-danger">
                      {errors.name}
                    </small>
                  )}

                </div>

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Username
                    <span className="text-danger ms-1">*</span>
                  </label>

                  <div className="position-relative">

                    <LuKeyRound
                      size={17}
                      style={{
                        position: "absolute",
                        left: "13px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        color: "#94a3b8",
                      }}
                    />

                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`form-control ${
                        errors.username
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter username"
                      style={{
                        paddingLeft: "38px",
                        borderRadius: "9px",
                        minHeight: "43px",
                      }}
                    />

                  </div>

                  {errors.username && (
                    <small className="text-danger">
                      {errors.username}
                    </small>
                  )}

                </div>

              </div>

              {/* EMAIL + PHONE */}

              <div className="row g-3 mb-3">

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Email
                    <span className="text-danger ms-1">*</span>
                  </label>

                  <div className="position-relative">

                    <LuMail
                      size={17}
                      style={{
                        position: "absolute",
                        left: "13px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        color: "#94a3b8",
                      }}
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${
                        errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="example@school.com"
                      style={{
                        paddingLeft: "38px",
                        borderRadius: "9px",
                        minHeight: "43px",
                      }}
                    />

                  </div>

                  {errors.email && (
                    <small className="text-danger">
                      {errors.email}
                    </small>
                  )}

                </div>

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Phone
                    <span className="text-danger ms-1">*</span>
                  </label>

                  <div className="position-relative">

                    <LuPhone
                      size={17}
                      style={{
                        position: "absolute",
                        left: "13px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        color: "#94a3b8",
                      }}
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-control ${
                        errors.phone
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter phone number"
                      style={{
                        paddingLeft: "38px",
                        borderRadius: "9px",
                        minHeight: "43px",
                      }}
                    />

                  </div>

                  {errors.phone && (
                    <small className="text-danger">
                      {errors.phone}
                    </small>
                  )}

                </div>

              </div>

              {/* PASSWORD */}

              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Password
                  <span className="text-danger ms-1">*</span>
                </label>

                <div className="d-flex gap-2">

                  <div className="position-relative flex-grow-1">

                    <LuLock
                      size={17}
                      style={{
                        position: "absolute",
                        left: "13px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        color: "#94a3b8",
                      }}
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`form-control ${
                        errors.password
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter password"
                      style={{
                        paddingLeft: "38px",
                        paddingRight: "42px",
                        borderRadius: "9px",
                        minHeight: "43px",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      className="btn p-0 border-0"
                      style={{
                        position: "absolute",
                        right: "13px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        color: "#64748b",
                      }}
                    >
                      {showPassword ? (
                        <LuEyeOff size={18} />
                      ) : (
                        <LuEye size={18} />
                      )}
                    </button>

                  </div>

                  <button
                    type="button"
                    className="btn d-flex align-items-center gap-2"
                    onClick={generatePassword}
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      border:
                        "1px solid #bfdbfe",
                      borderRadius: "9px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <LuRefreshCw size={16} />
                    Generate
                  </button>

                </div>

                {errors.password && (
                  <small className="text-danger">
                    {errors.password}
                  </small>
                )}

                <small className="text-muted d-block mt-1">
                  Minimum 6 characters recommended.
                </small>

              </div>

              {/* GROUP + STATUS */}

              <div className="row g-3 mb-4">

                <div className="col-md-7">

                  <label className="form-label fw-semibold">
                    User Group
                    <span className="text-danger ms-1">*</span>
                  </label>

                  <select
                    name="userGroupId"
                    value={formData.userGroupId}
                    onChange={handleChange}
                    className={`form-select ${
                      errors.userGroupId
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{
                      borderRadius: "9px",
                      minHeight: "43px",
                    }}
                  >

                    <option value="">
                      {groupsLoading
                        ? "Loading groups..."
                        : "Select user group"}
                    </option>

                    {userGroups.map((group) => (
                      <option
                        key={
                          group.id ||
                          group.userGroupId
                        }
                        value={
                          group.id ||
                          group.userGroupId
                        }
                      >
                        {group.name ||
                          group.groupName ||
                          group.title}
                      </option>
                    ))}

                  </select>

                  {errors.userGroupId && (
                    <small className="text-danger">
                      {errors.userGroupId}
                    </small>
                  )}

                </div>

                <div className="col-md-5">

                  <label className="form-label fw-semibold">
                    Account Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                    style={{
                      borderRadius: "9px",
                      minHeight: "43px",
                    }}
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>

                </div>

              </div>

              {/* BUTTONS */}

              <div
                className="d-flex flex-wrap justify-content-between gap-2 pt-3"
                style={{
                  borderTop:
                    "1px solid #edf2f7",
                }}
              >

                <button
                  type="button"
                  className="btn d-flex align-items-center gap-2"
                  onClick={handleReset}
                  style={{
                    border:
                      "1px solid #dbe3ef",
                    color: "#475569",
                    background: "#fff",
                    borderRadius: "9px",
                    padding: "9px 16px",
                  }}
                >
                  <LuRefreshCw size={16} />
                  Reset
                </button>

                <div className="d-flex gap-2">

                  <button
                    type="button"
                    className="btn d-flex align-items-center gap-2"
                    onClick={() => navigate(-1)}
                    style={{
                      border:
                        "1px solid #dbe3ef",
                      color: "#475569",
                      background: "#fff",
                      borderRadius: "9px",
                      padding: "9px 16px",
                    }}
                  >
                    <LuArrowLeft size={16} />
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn d-flex align-items-center gap-2 text-white"
                    style={{
                      background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",
                      border: "none",
                      borderRadius: "9px",
                      padding: "9px 18px",
                      boxShadow:
                        "0 5px 14px rgba(37,99,235,.18)",
                    }}
                  >

                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                        />
                        Creating...
                      </>
                    ) : (
                      <>
                        <LuSave size={17} />
                        Create Account
                      </>
                    )}

                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>

        {/* ===================================================
            RIGHT SIDE - INFORMATION
        =================================================== */}

        <div className="col-xl-4">

          {/* ACCOUNT PREVIEW */}

          <div
            className="rounded-4 shadow-sm p-4 mb-3"
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#3b82f6)",
              color: "#fff",
              overflow: "hidden",
              position: "relative",
            }}
          >

            <div
              style={{
                position: "absolute",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background:
                  "rgba(255,255,255,.08)",
                right: "-55px",
                top: "-60px",
              }}
            />

            <div
              style={{
                position: "absolute",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background:
                  "rgba(255,255,255,.06)",
                left: "-35px",
                bottom: "-35px",
              }}
            />

            <div className="position-relative">

              <div className="d-flex align-items-center gap-3 mb-4">

                <div
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "58px",
                    height: "58px",
                    background:
                      "rgba(255,255,255,.17)",
                    border:
                      "1px solid rgba(255,255,255,.25)",
                  }}
                >
                  <LuUser size={27} />
                </div>

                <div>

                  <small
                    style={{
                      opacity: ".75",
                    }}
                  >
                    Account Preview
                  </small>

                  <h5 className="fw-bold mb-0">
                    {formData.name ||
                      "New Account"}
                  </h5>

                </div>

              </div>

              <div className="mb-3">

                <small
                  style={{
                    opacity: ".75",
                  }}
                >
                  Account Type
                </small>

                <div className="fw-semibold">
                  {accountTypes.find(
                    (x) =>
                      x.value ===
                      formData.accountType
                  )?.label || "Staff"}
                </div>

              </div>

              <div className="mb-3">

                <small
                  style={{
                    opacity: ".75",
                  }}
                >
                  Username
                </small>

                <div className="fw-semibold">
                  {formData.username ||
                    "Not specified"}
                </div>

              </div>

              <div>

                <small
                  style={{
                    opacity: ".75",
                  }}
                >
                  Status
                </small>

                <div className="mt-1">

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background:
                        "rgba(255,255,255,.17)",
                      border:
                        "1px solid rgba(255,255,255,.25)",
                    }}
                  >
                    <LuCircleCheck
                      size={13}
                      className="me-1"
                    />
                    {formData.status}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* SECURITY CARD */}

          <div
            className="bg-white rounded-4 shadow-sm p-4 mb-3"
            style={{
              border: "1px solid #edf2f7",
            }}
          >

            <div className="d-flex align-items-center gap-3 mb-3">

              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "42px",
                  height: "42px",
                  background: "#ecfdf5",
                  color: "#059669",
                  border:
                    "1px solid #a7f3d0",
                }}
              >
                <LuShieldCheck size={21} />
              </div>

              <div>
                <h6 className="fw-bold mb-1">
                  Account Security
                </h6>

                <small className="text-muted">
                  Login credentials
                </small>
              </div>

            </div>

            <div
              className="rounded-3 p-3"
              style={{
                background: "#f8fafc",
                border:
                  "1px solid #e2e8f0",
              }}
            >

              <div className="d-flex gap-2 mb-2">

                <LuLock
                  size={16}
                  style={{
                    color: "#059669",
                    marginTop: "2px",
                  }}
                />

                <small className="text-muted">
                  Password will be securely encrypted
                  before saving.
                </small>

              </div>

              <div className="d-flex gap-2">

                <LuShieldCheck
                  size={16}
                  style={{
                    color: "#2563eb",
                    marginTop: "2px",
                  }}
                />

                <small className="text-muted">
                  User access will be controlled by
                  the selected user group.
                </small>

              </div>

            </div>

          </div>

          {/* QUICK INFO */}

          <div
            className="bg-white rounded-4 shadow-sm p-4"
            style={{
              border: "1px solid #edf2f7",
            }}
          >

            <h6 className="fw-bold mb-3">
              Account Setup
            </h6>

            <div className="d-flex align-items-start gap-3 mb-3">

              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#eff6ff",
                  color: "#2563eb",
                  flexShrink: 0,
                }}
              >
                <LuUsers size={16} />
              </div>

              <div>
                <div className="fw-semibold small">
                  User Group
                </div>

                <small className="text-muted">
                  Determines module and menu access.
                </small>
              </div>

            </div>

            <div className="d-flex align-items-start gap-3">

              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#ecfdf5",
                  color: "#059669",
                  flexShrink: 0,
                }}
              >
                <LuCircleCheck size={16} />
              </div>

              <div>
                <div className="fw-semibold small">
                  Account Status
                </div>

                <small className="text-muted">
                  Inactive accounts cannot login.
                </small>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AccountCreate;
