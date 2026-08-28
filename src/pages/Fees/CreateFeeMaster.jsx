import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { FaMoneyCheckAlt } from "react-icons/fa";

const Create_Fee_Master = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ==============================
  // State
  // ==============================
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [feeCategories, setFeeCategories] = useState([]);
  const [feeMaster, setFeeMaster] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    feeName: "",
    feeCode: "",
    feeCategory: "",
    status: "ACTIVE",
  });

  // ==============================
  // Load Data
  // ==============================
  useEffect(() => {
    loadFeeCategories();
    loadFeeMaster();
  }, []);

  // ==============================
  // Load Fee Categories
  // ==============================
  const loadFeeCategories = async () => {
    try {
      const res = await axiosInstance.get("/api/master/fee-category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeeCategories(res.data || []);
    } catch (error) {
      console.log("Fee Category Error:", error);
    }
  };

  // ==============================
  // Load Fee Master
  // ==============================
  const loadFeeMaster = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/api/fee-master", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeeMaster(res.data || []);
    } catch (error) {
      console.log("Fee Master Error:", error);
      setFeeMaster([]);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Handle Input
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // Reset Form
  // ==============================
  const resetForm = () => {
    setFormData({
      feeName: "",
      feeCode: "",
      feeCategory: "",
      status: "ACTIVE",
    });

    setEditingId(null);
  };

  // ==============================
  // Edit Fee Master
  // ==============================
  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      feeName: item.feeName || "",
      feeCode: item.feeCode || "",
      feeCategory: item.feeCategory || "",
      status: item.status || "ACTIVE",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==============================
  // Delete Fee Master
  // ==============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Fee Master?",
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await axiosInstance.delete(`/api/fee-master/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data || "Fee Master deleted successfully");

      await loadFeeMaster();
    } catch (error) {
      console.log("Delete Error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Fee Master Delete Failed",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Save / Update
  // ==============================
  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.feeName.trim()) {
      alert("Please enter Fee Name");
      return;
    }

    if (!formData.feeCode.trim()) {
      alert("Please enter Fee Code");
      return;
    }

    if (!formData.feeCategory) {
      alert("Please select Fee Category");
      return;
    }

    if (!formData.status) {
      alert("Please select Status");
      return;
    }

    try {
      setSaving(true);

      let res;

      if (editingId) {
        // ==============================
        // UPDATE
        // ==============================
        res = await axiosInstance.put(
          `/api/fee-master/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
      } else {
        // ==============================
        // CREATE
        // ==============================
        res = await axiosInstance.post("/api/fee-master", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      alert(
        res.data ||
          (editingId
            ? "Fee Master updated successfully"
            : "Fee Master created successfully"),
      );

      resetForm();
      await loadFeeMaster();
    } catch (error) {
      console.log("Save Error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Something went wrong",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div
        className="mx-2 mt-2 shadow rounded-3 bg-white"
        style={{
          borderLeft: "5px solid #0d6efd",
        }}
      >
        <div className="p-3">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #0d6efd, #6610f2)",
                color: "white",
                fontSize: "21px",
              }}
            >
              <FaMoneyCheckAlt />
            </div>

            <div>
              <h5 className="mb-1 fw-bold">Fee Master</h5>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 small">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-decoration-none text-secondary">
                      Home
                    </a>
                  </li>

                  <li className="breadcrumb-item text-secondary">Master</li>

                  <li className="breadcrumb-item active">Fee Master</li>
                </ol>
              </nav>
            </div>

            <div className="col-md-4 text-md-end mt-2 mt-md-0">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CREATE / UPDATE FORM
      ====================================================== */}
      <div className="card mx-2 mt-2 shadow rounded-3 bg-white">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h6 className="mb-0">
                {editingId ? "Update Fee Master" : "Create Fee Master"}
              </h6>
            </div>

            <div className="col-md-4 text-md-end mt-2 mt-md-0">
              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="card-body">
          <form onSubmit={handleSave}>
            <div className="row">
              {/* Fee Name */}
              <div className="col-12 col-md-6 col-lg-3 mb-3">
                <label className="form-label">
                  Fee Name <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="feeName"
                  value={formData.feeName}
                  onChange={handleChange}
                  placeholder="Enter Fee Name"
                />
              </div>

              {/* Fee Code */}
              <div className="col-12 col-md-6 col-lg-3 mb-3">
                <label className="form-label">
                  Fee Code <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="feeCode"
                  value={formData.feeCode}
                  onChange={handleChange}
                  placeholder="Enter Fee Code"
                />
              </div>

              {/* Fee Category */}
              <div className="col-12 col-md-6 col-lg-3 mb-3">
                <label className="form-label">
                  Fee Category <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  name="feeCategory"
                  value={formData.feeCategory}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>

                  {feeCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="col-12 col-md-6 col-lg-3 mb-3">
                <label className="form-label">
                  Status <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2 mt-2">
              <button
                type="submit"
                className={`btn ${editingId ? "btn-warning" : "btn-primary"}`}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Saving...
                  </>
                ) : editingId ? (
                  "Update Fee Master"
                ) : (
                  "Save Fee Master"
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* =====================================================
          FEE MASTER LIST
      ====================================================== */}
      <div className="card mx-2 mt-2 shadow rounded-3 bg-white" >
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h6 className="mb-0">
                <strong>Fee Master List</strong>
              </h6>
            </div>

            <div className="col-md-4 text-md-end mt-2 mt-md-0">
              <span className="badge bg-primary">
                Total: {feeMaster.length}
              </span>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead className="table-primary">
                <tr>
                  <th className="text-center">S.No</th>
                  <th>Fee Code</th>
                  <th>Fee Name</th>
                  <th>Fee Category</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <div className="spinner-border text-primary"></div>
                      <div className="mt-2">Loading...</div>
                    </td>
                  </tr>
                ) : feeMaster.length > 0 ? (
                  feeMaster.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center">{index + 1}</td>

                      <td>
                        <strong>{item.feeCode}</strong>
                      </td>

                      <td>{item.feeName}</td>

                      <td>{item.feeCategory}</td>

                      <td className="text-center">
                        {item.status === "ACTIVE" ? (
                          <span className="badge bg-success">ACTIVE</span>
                        ) : (
                          <span className="badge bg-danger">INACTIVE</span>
                        )}
                      </td>

                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No Fee Master records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create_Fee_Master;
