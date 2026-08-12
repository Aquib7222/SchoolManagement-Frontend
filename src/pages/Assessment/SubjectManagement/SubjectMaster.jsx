import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { LuNotebookText } from "react-icons/lu";
import { MdAssessment, MdErrorOutline, MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line, RiResetLeftLine } from "react-icons/ri";
import useMasters from "../../../hooks/useMasters";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

const SubjectMaster = () => {
  const { subjectType, subjectCategory } = useMasters();
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const schoolId = JSON.parse(localStorage.getItem("schoolId"));
  const [editingId, setEditingId] = useState(null);

  const [filters, setFilters] = useState({
    subjectName: "",
    shortCode: "",
    subjectType: "",
    status: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredSubjects = subjects.filter((subject) => {
    const subjectNameMatch = subject.subjectName
      ?.toLowerCase()
      .includes(filters.subjectName.toLowerCase());

    const shortCodeMatch = subject.shortCode
      ?.toLowerCase()
      .includes(filters.shortCode.toLowerCase());

    const subjectTypeMatch =
      !filters.subjectType || subject.subjectType === filters.subjectType;

    const statusMatch =
      filters.status === "" || String(subject.status) === filters.status;

    return (
      subjectNameMatch && shortCodeMatch && subjectTypeMatch && statusMatch
    );
  });

  const [formData, setFormData] = useState({
    schoolId: schoolId,
    subjectName: "",
    shortCode: "",
    subjectType: "",
    subjectCategory: "",
    displayOrder: "",
    status: true,
  });

  const resetForm = () => {
    setFormData({
      schoolId: schoolId,
      subjectName: "",
      shortCode: "",
      subjectType: "",
      subjectCategory: "",
      displayOrder: "",
      status: true,
    });

    setEditingId(null);
  };

  const handleEdit = (subject) => {
    setEditingId(subject.id);

    setFormData({
      schoolId: schoolId,
      subjectName: subject.subjectName || "",
      shortCode: subject.shortCode || "",
      subjectType: subject.subjectType || "",
      subjectCategory: subject.subjectCategory || "",
      displayOrder: subject.displayOrder ?? "",
      status: subject.status ?? true,
    });

    setShowAddSubject(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.delete(
        `/api/assessment/subject/${id}?schoolId=${schoolId}`,
      );

      toast.success("Subject deleted successfully");

      await loadSubjects();
    } catch (error) {
      console.log("Delete Subject Error:", error);

      toast.error(error.response?.data || "Failed to delete subject");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "status"
          ? value === "true"
          : name === "shortCode"
            ? value.toUpperCase()
            : name === "displayOrder"
              ? value === ""
                ? ""
                : Number(value)
              : value,
    }));
  };

  const [loading, setLoading] = useState(false);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // Basic validation
  //     if (!formData.subjectName.trim()) {
  //       toast.error("Subject name is required");
  //       return;
  //     }

  //     if (!formData.shortCode.trim()) {
  //       toast.error("Subject code is required");
  //       return;
  //     }

  //     if (!formData.subjectType) {
  //       toast.error("Please select subject type");
  //       return;
  //     }

  //     if (!formData.subjectCategory) {
  //       toast.error("Please select subject category");
  //       return;
  //     }

  //     try {
  //       setLoading(true);

  //       const payload = {
  //         ...formData,
  //         schoolId: schoolId,
  //       };

  //       console.log("Subject Payload:", payload);

  //       const response = await axiosInstance.post(
  //         "/api/assessment/subject",
  //         payload,
  //       );

  //       console.log("Subject saved:", response.data);

  //       toast.success("Subject added successfully");

  //       // Form reset
  //       setFormData({
  //         schoolId: schoolId,
  //         subjectName: "",
  //         shortCode: "",
  //         subjectType: "",
  //         subjectCategory: "",
  //         displayOrder: "",
  //         status: true,
  //       });
  //     } catch (error) {
  //       console.log("Status:", error.response?.status);
  //       console.log("Data:", error.response?.data);

  //       toast.error(error.response?.data || "Failed to add subject");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =========================
    // VALIDATION
    // =========================

    if (!formData.subjectName.trim()) {
      toast.error("Subject name is required");
      return;
    }

    if (!formData.shortCode.trim()) {
      toast.error("Subject code is required");
      return;
    }

    if (!formData.subjectType) {
      toast.error("Please select subject type");
      return;
    }

    if (!formData.subjectCategory) {
      toast.error("Please select subject category");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        schoolId: schoolId,
      };

      console.log(
        editingId ? "Update Subject Payload:" : "Add Subject Payload:",
        payload,
      );

      // =========================
      // UPDATE
      // =========================

      if (editingId) {
        const response = await axiosInstance.put(
          `/api/assessment/subject/${editingId}`,
          payload,
        );

        console.log("Subject updated:", response.data);

        toast.success("Subject updated successfully");
      }

      // =========================
      // ADD
      // =========================
      else {
        const response = await axiosInstance.post(
          "/api/assessment/subject",
          payload,
        );

        console.log("Subject saved:", response.data);

        toast.success("Subject added successfully");
      }

      // Reload list
      await loadSubjects();

      // Reset form
      resetForm();

      // Close form
      setShowAddSubject(false);
    } catch (error) {
      console.log("Subject Save/Update Error:", error);

      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);

      toast.error(
        error.response?.data ||
          (editingId ? "Failed to update subject" : "Failed to add subject"),
      );
    } finally {
      setLoading(false);
    }
  };
  const loadSubjects = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/api/assessment/subject?schoolId=${schoolId}`,
      );

      console.log("Subjects:", response.data);

      setSubjects(response.data);
    } catch (error) {
      console.log("Get Subjects Error:", error);
      toast.error(error.response?.data || "Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  return (
    <>
      {/* Header */}
      <div
        className="row shadow-lg"
        style={{
          backgroundColor: "white",
          margin: "10px",
          height: "70px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6>
          <LuNotebookText /> Subject Management
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                <small>Home</small>
              </a>
            </li>
            <li className="breadcrumb-item active">
              <small>School Management</small>
            </li>
            <li className="breadcrumb-item active">
              <small>Subject Master</small>
            </li>
          </ol>
          {/* <button className='btn'>View Assessment Structure</button> */}
        </nav>
      </div>

      {/* alert  */}
      <div
        className="ms-2 me-2 mt-2 alert  p-2 rounded shadow"
        style={{ backgroundColor: "#ebfffd" }}
      >
        <small>
          <MdErrorOutline size={20} /> Manage all subjects offered in this
          school.These subjects will be used in assessment structure and mark
          entry.
        </small>
      </div>

      <div className="ms-2 me-2 mt-3 rounded shadow bg-white p-3">
        <div className="row g-3">
          {/* Subject Name */}
          <div className="col-12 col-sm-6 col-lg-2">
            <label>Subject Name</label>

            <input
              type="text"
              className="form-control mt-1"
              name="subjectName"
              value={filters.subjectName}
              onChange={handleFilterChange}
              placeholder="Search subject"
            />
          </div>

          {/* Short Code */}
          <div className="col-12 col-sm-6 col-lg-2">
            <label>Short Code</label>

            <input
              type="text"
              className="form-control mt-1"
              name="shortCode"
              value={filters.shortCode}
              onChange={handleFilterChange}
              placeholder="Search code"
            />
          </div>

          {/* Subject Type */}
          <div className="col-12 col-sm-6 col-lg-2">
            <label>Subject Type</label>

            <select
              name="subjectType"
              className="form-select mt-1"
              value={filters.subjectType}
              onChange={handleFilterChange}
            >
              <option value="">All</option>

              {subjectType.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="col-12 col-sm-6 col-lg-2">
            <label>Status</label>

            <select
              name="status"
              className="form-select mt-1"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* Reset */}
          <div className="col-12 col-sm-6 col-lg-2">
            <button
              type="button"
              className="btn btn-outline-secondary mt-4"
              onClick={() =>
                setFilters({
                  subjectName: "",
                  shortCode: "",
                  subjectType: "",
                  status: "",
                })
              }
            >
              <RiResetLeftLine /> Reset
            </button>
          </div>

          {/* Add */}
          <div className="col-12 col-sm-6 col-lg-2">
            <button
              type="button"
              className="btn btn-success mt-4"
              onClick={() => {
                resetForm();
                setShowAddSubject(true);
              }}
            >
              <FaPlus /> Add Subject
            </button>
          </div>
        </div>
      </div>

      <div className="ms-2 me-2 bg-white mt-3 rounded shadow p-3">
        <div className="row g-3">
          {/* Subject List */}
          <div className={showAddSubject ? "col-12 col-lg-8" : "col-12"}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">
                <LuNotebookText /> Subject List
              </h6>

              {showAddSubject && (
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setShowAddSubject(false)}
                >
                  Close
                </button>
              )}
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-info">
                  <tr>
                    <th className="fw-medium">#</th>
                    <th className="fw-medium">Subject Name</th>
                    <th className="fw-medium">Short Code</th>
                    <th className="fw-medium">Subject Type</th>
                    <th className="fw-medium">Subject Category</th>
                    <th className="fw-medium">Display Order</th>
                    <th className="fw-medium">Status</th>
                    <th className="fw-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((subject, idx) => (
                      <tr key={subject.id}>
                        <td>{idx + 1}</td>

                        <td>{subject.subjectName}</td>

                        <td>{subject.shortCode}</td>

                        <td>{subject.subjectType}</td>

                        <td>{subject.subjectCategory}</td>

                        <td>{subject.displayOrder}</td>

                        <td>
                          {subject.status ? (
                            <span className="badge bg-success">Active</span>
                          ) : (
                            <span className="badge bg-danger">Inactive</span>
                          )}
                        </td>

                        <td>
                          <MdModeEdit
                            size={20}
                            className="text-primary me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEdit(subject)}
                          />

                          <RiDeleteBin6Line
                            size={20}
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(subject.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center text-muted py-4">
                        No subjects found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Subject Form */}
          {showAddSubject && (
            <div className="col-12 col-lg-4">
              <div className="border rounded p-3 h-100 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">
                    {editingId ? (
                      <>
                        <MdModeEdit /> Edit Subject
                      </>
                    ) : (
                      <>
                        <FaPlus /> Add Subject
                      </>
                    )}
                  </h6>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddSubject(false)}
                  ></button>
                </div>

                <hr />

                {/* Form yahan aayega */}
                <div className="mb-3">
                  <label className="form-label">
                    Subject Name <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter subject name"
                    name="subjectName"
                    value={formData.subjectName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Short Code <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. ENG"
                    name="shortCode"
                    value={formData.shortCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Subject Type <span className="text-danger">*</span>
                  </label>

                  <select
                    className="form-select"
                    name="subjectType"
                    value={formData.subjectType}
                    onChange={handleChange}
                  >
                    <option value="">Select Type</option>

                    {subjectType.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Subject Category <span className="text-danger">*</span>
                  </label>

                  <select
                    className="form-select"
                    name="subjectCategory"
                    value={formData.subjectCategory}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {subjectCategory.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Display Order</label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 1"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>

                  <select
                    className="form-select"
                    name="status"
                    value={String(formData.status)}
                    onChange={handleChange}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      resetForm();
                      setShowAddSubject(false);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {editingId ? <MdModeEdit /> : <FaPlus />}

                    {loading
                      ? editingId
                        ? " Updating..."
                        : " Saving..."
                      : editingId
                        ? " Update Subject"
                        : " Add Subject"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SubjectMaster;
