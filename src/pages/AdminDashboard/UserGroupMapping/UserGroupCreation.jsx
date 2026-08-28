import React, { useEffect, useState } from "react";
import {
  LuArrowLeft,
  LuSave,
  LuShieldCheck,
  LuRefreshCw,
} from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const UserGroupCreation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");


  const editId = location.state?.groupId || null;

  const isEditMode = Boolean(editId);


  const [formData, setFormData] = useState({
    groupName: "",
    groupCode: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(false);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

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

  // =====================================================
  // FETCH GROUP FOR EDIT
  // =====================================================

  useEffect(() => {
    if (isEditMode) {
      fetchGroup();
    }
  }, [editId]);

  const fetchGroup = async () => {
    try {
      setFetching(true);

      const response = await axiosInstance.get(
        `/api/user-group/${editId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      setFormData({
        groupName: data?.groupName || "",
        groupCode: data?.groupCode || "",
        status: data?.status || "Active",
      });
    } catch (error) {
      console.error("Fetch User Group Error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to load user group"
      );

      navigate("/user-group-list");
    } finally {
      setFetching(false);
    }
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validate = () => {
    const newErrors = {};

    if (!formData.groupName.trim()) {
      newErrors.groupName =
        "Group name is required";
    }

    if (!formData.groupCode.trim()) {
      newErrors.groupCode =
        "Group code is required";
    }

    if (!formData.status) {
      newErrors.status =
        "Please select status";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        groupName: formData.groupName.trim(),
        groupCode: formData.groupCode.trim().toUpperCase(),
        status: formData.status,
      };

      let response;

      // ==============================
      // UPDATE
      // ==============================

      if (isEditMode) {
        response = await axiosInstance.put(
          `/api/user-group/update/${editId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        alert(
          "User Group updated successfully"
        );
      }

      // ==============================
      // CREATE
      // ==============================

      else {
        response = await axiosInstance.post(
          "/api/user-group/create",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        alert(
          "User Group created successfully"
        );
      }

      navigate("/user-group-list");

    } catch (error) {
      console.error(
        "User Group Save Error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    if (isEditMode) {
      fetchGroup();
      return;
    }

    setFormData({
      groupName: "",
      groupCode: "",
      status: "Active",
    });

    setErrors({});
  };

  // =====================================================
  // BACK
  // =====================================================

  const handleBack = () => {
    navigate("/user-group-list");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (fetching) {
    return (
      <div className="container-fluid px-2">
        <div
          className="card shadow border-0 rounded-3 mt-3"
          style={{ minHeight: "300px" }}
        >
          <div className="card-body d-flex justify-content-center align-items-center">
            <div className="text-center">
              <div
                className="spinner-border text-primary"
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />

              <div className="text-muted mt-2">
                Loading user group...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="container-fluid px-2">
        <div
          className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
          style={{
            minHeight: "70px",
          }}
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

            <div>
              <h4 className="fw-bold mb-1">
                {isEditMode
                  ? "Update User Group"
                  : "Create User Group"}
              </h4>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 small">

                  <li className="breadcrumb-item">
                    <a
                      href="/"
                      className="text-decoration-none text-dark"
                    >
                      Dashboard
                    </a>
                  </li>

                  <li className="breadcrumb-item">
                    User Management
                  </li>

                  <li className="breadcrumb-item">
                    User Group
                  </li>

                  <li className="breadcrumb-item active text-primary">
                    {isEditMode
                      ? "Update"
                      : "Create"}
                  </li>

                </ol>
              </nav>
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={handleBack}
            >
              <LuArrowLeft
                size={16}
                className="me-1"
              />
              Back
            </button>

          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* FORM */}
      {/* ================================================= */}

      <div className="container-fluid px-2">
        <div className="card shadow border-0 rounded-3">

          {/* CARD HEADER */}

          <div className="card-header bg-white border-0 p-3">

            <div className="d-flex align-items-center">

              <span
                className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
                style={{
                  width: "38px",
                  height: "38px",
                  background: "#f0eaff",
                }}
              >
                <LuShieldCheck
                  size={20}
                  style={{
                    color: "#6f2cff",
                  }}
                />
              </span>

              <div>
                <h6 className="fw-bold mb-0">
                  User Group Information
                </h6>

                <small className="text-muted">
                  {isEditMode
                    ? "Update user group details"
                    : "Create a new user group"}
                </small>
              </div>

            </div>

          </div>

          {/* BODY */}

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row g-3">

                {/* GROUP NAME */}

                <div className="col-md-6">

                  <label className="form-label">
                    <h6 className="mb-1">
                      Group Name{" "}
                      <span className="text-danger">
                        *
                      </span>
                    </h6>
                  </label>

                  <input
                    type="text"
                    name="groupName"
                    className={`form-control ${
                      errors.groupName
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Enter group name"
                    value={formData.groupName}
                    onChange={handleChange}
                  />

                  {errors.groupName && (
                    <div className="invalid-feedback">
                      {errors.groupName}
                    </div>
                  )}

                </div>

                {/* GROUP CODE */}

                <div className="col-md-6">

                  <label className="form-label">
                    <h6 className="mb-1">
                      Group Code{" "}
                      <span className="text-danger">
                        *
                      </span>
                    </h6>
                  </label>

                  <input
                    type="text"
                    name="groupCode"
                    className={`form-control ${
                      errors.groupCode
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Enter group code"
                    value={formData.groupCode}
                    onChange={handleChange}
                  />

                  {errors.groupCode && (
                    <div className="invalid-feedback">
                      {errors.groupCode}
                    </div>
                  )}

                </div>

                {/* STATUS */}

                <div className="col-md-6">

                  <label className="form-label">
                    <h6 className="mb-1">
                      Status{" "}
                      <span className="text-danger">
                        *
                      </span>
                    </h6>
                  </label>

                  <select
                    name="status"
                    className={`form-select ${
                      errors.status
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Status
                    </option>

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                  {errors.status && (
                    <div className="invalid-feedback">
                      {errors.status}
                    </div>
                  )}

                </div>

              </div>

              {/* ================================================= */}
              {/* BUTTONS */}
              {/* ================================================= */}

              <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleReset}
                  disabled={loading}
                >
                  <LuRefreshCw
                    size={16}
                    className="me-1"
                  />

                  Reset
                </button>

                <button
                  type="button"
                  className="btn btn-light"
                  onClick={handleBack}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >

                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                      />
                      {isEditMode
                        ? "Updating..."
                        : "Saving..."}
                    </>
                  ) : (
                    <>
                      <LuSave
                        size={17}
                        className="me-1"
                      />

                      {isEditMode
                        ? "Update User Group"
                        : "Save User Group"}
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default UserGroupCreation;