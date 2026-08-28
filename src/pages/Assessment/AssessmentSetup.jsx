// import React from "react";
// import { FaPlus } from "react-icons/fa6";
// import { IoFilter } from "react-icons/io5";
// import { MdAssessment, MdErrorOutline } from "react-icons/md";

// const AssessmentSetup = () => {
//   return (
//     <>
//       {/* Header */}
//       <div
//         className="row shadow-lg"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           height: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <MdAssessment /> Assessment Setup
//         </h6>
//         <nav aria-label="breadcrumb py-2">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                 <small>Home</small>
//               </a>
//             </li>
//             <li className="breadcrumb-item active">
//               <small>School Management</small>
//             </li>
//             <li className="breadcrumb-item active">
//               <small>Assessment Setup</small>
//             </li>
//           </ol>
//           {/* <button className='btn'>View Assessment Structure</button> */}
//         </nav>
//       </div>

//       {/* alert  */}
//       <div
//         className="ms-2 me-2  alert  p-2 rounded shadow"
//         style={{ backgroundColor: "#ebfffd" }}
//       >
//         <small>
//           <MdErrorOutline /> Create and manage assessments
//           (exams,tests,quizzes,etc..) for diffenet classes and subjects.
//         </small>
//       </div>

//       <div className="container-fluid mt-3">
//         <div className="row g-2">
//           <div className="col-12 col-lg-3">
//             <div className="card shadow h-100">
//               <div className="card-header bg-white">
//                 <h6>Create New Assessment</h6>
//               </div>
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-12 col-md-6"></div>
//                   <div className="col-12 col-md-6"></div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6"></div>
//                   <div className="col-12 col-md-6"></div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6"></div>
//                   <div className="col-12 col-md-6"></div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6"></div>
//                   <div className="col-12 col-md-6"></div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6"></div>
//                   <div className="col-12 col-md-6"></div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6"></div>
//                   <div className="col-12 col-md-6"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-lg-9">
//             <div className="card shadow h-100">
//               <div className="card-header bg-white d-flex justify-content-between align-item-center">
//                 <h6>Existing Assessment</h6>
//                 <div className="d-flex gap-3">
//                   <input
//                     type="search"
//                     name=""
//                     id=""
//                     className="form-control w-50"
//                     placeholder="Search Assessment.."
//                   />
//                   <button className="btn btn-outline-success btn-sm">
//                     <IoFilter /> Filter
//                   </button>
//                   <button className="btn btn-success btn-sm">
//                     <FaPlus /> Add New
//                   </button>
//                 </div>
//               </div>
//               <div className="card-body"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AssessmentSetup;



import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";
import { toast } from "react-toastify";

import { FaPlus, FaEye, FaPencil, FaTrash, FaRotate } from "react-icons/fa6";
import { IoFilter, IoSearchOutline } from "react-icons/io5";
import {
  MdAssessment,
  MdErrorOutline,
  MdClose,
} from "react-icons/md";

const AssessmentSetup = () => {
  /* =========================================================
     USER / SCHOOL
  ========================================================= */

  const storedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const storedSchoolId = JSON.parse(
    localStorage.getItem("schoolId") || "null"
  );

  const schoolId =
    storedUser?.schoolId ||
    storedUser?.school?.id ||
    storedSchoolId;

  /* =========================================================
     MASTERS
  ========================================================= */

  const {
    sessions = [],
    standards = [],
    sections = [],
  } = useMasters();

  /* =========================================================
     STATE
  ========================================================= */

  const [assessments, setAssessments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [showFilter, setShowFilter] = useState(false);
  const [selectedAssessment, setSelectedAssessment] =
    useState(null);

  const [showView, setShowView] = useState(false);

  const [editId, setEditId] = useState(null);

  const [filterSession, setFilterSession] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  /* =========================================================
     FORM
  ========================================================= */

  const initialForm = {
    schoolId: schoolId || "",
    assessmentName: "",
    shortCode: "",
    session: "",
    studentClass: "",
    section: "",
    assessmentType: "",
    assessmentNature: "",
    startDate: "",
    endDate: "",
    description: "",
    status: true,
  };

  const [formData, setFormData] = useState(initialForm);

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* =========================================================
     LOAD ASSESSMENTS
  ========================================================= */

  const loadAssessments = async () => {
    if (!schoolId) {
      toast.error("School ID not found");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        "/api/assessment",
        {
          params: {
            schoolId,
          },
        }
      );

      setAssessments(
        Array.isArray(response.data)
          ? response.data
          : response.data?.content || []
      );
    } catch (error) {
      console.error("Assessment Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load assessments"
      );

      setAssessments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssessments();
  }, [schoolId]);

  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setFormData({
      ...initialForm,
      schoolId: schoolId || "",
    });

    setEditId(null);
  };

  /* =========================================================
     SAVE / UPDATE
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!schoolId) {
      toast.error("School ID not found");
      return;
    }

    if (!formData.assessmentName.trim()) {
      toast.error("Assessment name is required");
      return;
    }

    if (!formData.session) {
      toast.error("Please select session");
      return;
    }

    if (!formData.studentClass) {
      toast.error("Please select class");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...formData,
        schoolId,
      };

      if (editId) {
        await axiosInstance.put(
          `/api/assessment/${editId}`,
          payload
        );

        toast.success("Assessment updated successfully");
      } else {
        await axiosInstance.post(
          "/api/assessment",
          payload
        );

        toast.success("Assessment created successfully");
      }

      resetForm();
      loadAssessments();
    } catch (error) {
      console.error("Save Assessment Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to save assessment"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = (item) => {
    setEditId(item.id);

    setFormData({
      schoolId: schoolId || "",
      assessmentName:
        item.assessmentName ||
        item.examName ||
        item.name ||
        "",
      shortCode: item.shortCode || "",
      session: item.session || "",
      studentClass:
        item.studentClass ||
        item.className ||
        item.studentClassName ||
        "",
      section: item.section || "",
      assessmentType:
        item.assessmentType ||
        item.type ||
        "",
      assessmentNature:
        item.assessmentNature ||
        item.nature ||
        "",
      startDate:
        item.startDate
          ? String(item.startDate).substring(0, 10)
          : "",
      endDate:
        item.endDate
          ? String(item.endDate).substring(0, 10)
          : "",
      description: item.description || "",
      status:
        item.status !== undefined
          ? item.status
          : true,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assessment?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(
        `/api/assessment/${id}`,
        {
          params: {
            schoolId,
          },
        }
      );

      toast.success("Assessment deleted successfully");

      loadAssessments();
    } catch (error) {
      console.error("Delete Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to delete assessment"
      );
    }
  };

  /* =========================================================
     VIEW
  ========================================================= */

  const handleView = (item) => {
    setSelectedAssessment(item);
    setShowView(true);
  };

  /* =========================================================
     FILTERED DATA
  ========================================================= */

  const filteredAssessments = useMemo(() => {
    return assessments.filter((item) => {
      const assessmentName =
        item.assessmentName ||
        item.examName ||
        item.name ||
        "";

      const shortCode =
        item.shortCode || "";

      const matchesSearch =
        assessmentName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        shortCode
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSession =
        !filterSession ||
        String(item.session || "") ===
          String(filterSession);

      const matchesClass =
        !filterClass ||
        String(
          item.studentClass ||
            item.className ||
            ""
        ) === String(filterClass);

      const matchesStatus =
        !filterStatus ||
        String(item.status) ===
          String(filterStatus);

      return (
        matchesSearch &&
        matchesSession &&
        matchesClass &&
        matchesStatus
      );
    });
  }, [
    assessments,
    search,
    filterSession,
    filterClass,
    filterStatus,
  ]);

  /* =========================================================
     CLEAR FILTER
  ========================================================= */

  const clearFilters = () => {
    setFilterSession("");
    setFilterClass("");
    setFilterStatus("");
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="row shadow-lg"
        style={{
          backgroundColor: "white",
          margin: "10px",
          minHeight: "70px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6 className="mb-1">
          <MdAssessment className="me-2" />
          Assessment Setup
        </h6>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <small>Home</small>
              </a>
            </li>

            <li className="breadcrumb-item">
              <small>School Management</small>
            </li>

            <li className="breadcrumb-item active">
              <small>Assessment Setup</small>
            </li>
          </ol>
        </nav>
      </div>

      {/* =====================================================
          INFO ALERT
      ===================================================== */}

      <div
        className="ms-2 me-2 alert p-2 rounded shadow"
        style={{
          backgroundColor: "#ebfffd",
          border: "1px solid #d7f5f2",
        }}
      >
        <small>
          <MdErrorOutline className="me-1" />
          Create and manage assessments such as exams,
          tests and quizzes for different classes and
          subjects.
        </small>
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="container-fluid mt-3">
        <div className="row g-3">

          {/* =================================================
              LEFT - CREATE ASSESSMENT
          ================================================= */}

          <div className="col-12 col-xl-4">
            <div className="card shadow h-100">

              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                  {editId
                    ? "Update Assessment"
                    : "Create New Assessment"}
                </h6>

                {editId && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={resetForm}
                  >
                    <MdClose />
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="card-body">

                  {/* NAME */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Assessment Name
                      <span className="text-danger">
                        {" "}*
                      </span>
                    </label>

                    <input
                      type="text"
                      name="assessmentName"
                      className="form-control"
                      placeholder="Enter assessment name"
                      value={formData.assessmentName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* SHORT CODE */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Short Code
                    </label>

                    <input
                      type="text"
                      name="shortCode"
                      className="form-control"
                      placeholder="Example: UT1"
                      value={formData.shortCode}
                      onChange={handleChange}
                    />
                  </div>

                  {/* SESSION + CLASS */}

                  <div className="row">

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Session
                        <span className="text-danger">
                          {" "}*
                        </span>
                      </label>

                      <select
                        name="session"
                        className="form-select"
                        value={formData.session}
                        onChange={handleChange}
                      >
                        <option value="">
                          Select Session
                        </option>

                        {sessions?.map((item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Class
                        <span className="text-danger">
                          {" "}*
                        </span>
                      </label>

                      <select
                        name="studentClass"
                        className="form-select"
                        value={formData.studentClass}
                        onChange={handleChange}
                      >
                        <option value="">
                          Select Class
                        </option>

                        {standards?.map((item, index) => {
                          const value =
                            typeof item === "string"
                              ? item
                              : item.name ||
                                item.standardName ||
                                item.value;

                          return (
                            <option
                              key={item.id || index}
                              value={value}
                            >
                              {value}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                  </div>

                  {/* SECTION + TYPE */}

                  <div className="row">

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Section
                      </label>

                      <select
                        name="section"
                        className="form-select"
                        value={formData.section}
                        onChange={handleChange}
                      >
                        <option value="">
                          All Sections
                        </option>

                        {sections?.map((item, index) => {
                          const value =
                            typeof item === "string"
                              ? item
                              : item.name ||
                                item.sectionName ||
                                item.value;

                          return (
                            <option
                              key={item.id || index}
                              value={value}
                            >
                              {value}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Assessment Type
                      </label>

                      <select
                        name="assessmentType"
                        className="form-select"
                        value={formData.assessmentType}
                        onChange={handleChange}
                      >
                        <option value="">
                          Select Type
                        </option>
                        <option value="EXAM">
                          Exam
                        </option>
                        <option value="TEST">
                          Test
                        </option>
                        <option value="QUIZ">
                          Quiz
                        </option>
                        <option value="UNIT_TEST">
                          Unit Test
                        </option>
                      </select>
                    </div>

                  </div>

                  {/* NATURE */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Assessment Nature
                    </label>

                    <select
                      name="assessmentNature"
                      className="form-select"
                      value={formData.assessmentNature}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select Nature
                      </option>

                      <option value="FORMATIVE">
                        Formative
                      </option>

                      <option value="SUMMATIVE">
                        Summative
                      </option>

                      <option value="PRACTICAL">
                        Practical
                      </option>

                      <option value="ORAL">
                        Oral
                      </option>
                    </select>
                  </div>

                  {/* DATES */}

                  <div className="row">

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Start Date
                      </label>

                      <input
                        type="date"
                        name="startDate"
                        className="form-control"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        End Date
                      </label>

                      <input
                        type="date"
                        name="endDate"
                        className="form-control"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                    </div>

                  </div>

                  {/* DESCRIPTION */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Description
                    </label>

                    <textarea
                      name="description"
                      rows="3"
                      className="form-control"
                      placeholder="Enter description..."
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  {/* STATUS */}

                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="status"
                      checked={formData.status}
                      onChange={handleChange}
                      id="assessmentStatus"
                    />

                    <label
                      className="form-check-label fw-semibold"
                      htmlFor="assessmentStatus"
                    >
                      Active
                    </label>
                  </div>

                </div>

                <div className="card-footer bg-white d-flex gap-2">

                  <button
                    type="button"
                    className="btn btn-outline-secondary flex-fill"
                    onClick={resetForm}
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="btn btn-success flex-fill"
                    disabled={saving}
                  >
                    {saving ? (
                      "Saving..."
                    ) : editId ? (
                      <>
                        <FaPencil className="me-1" />
                        Update
                      </>
                    ) : (
                      <>
                        <FaPlus className="me-1" />
                        Create
                      </>
                    )}
                  </button>

                </div>
              </form>

            </div>
          </div>

          {/* =================================================
              RIGHT - EXISTING ASSESSMENTS
          ================================================= */}

          <div className="col-12 col-xl-8">

            <div className="card shadow h-100">

              {/* HEADER */}

              <div className="card-header bg-white">

                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">

                  <h6 className="mb-0">
                    Existing Assessments
                  </h6>

                  <div className="d-flex flex-wrap gap-2">

                    <div
                      className="input-group"
                      style={{
                        width: "240px",
                      }}
                    >
                      <span className="input-group-text bg-white">
                        <IoSearchOutline />
                      </span>

                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search Assessment..."
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }
                      />
                    </div>

                    <button
                      className="btn btn-outline-success"
                      onClick={() =>
                        setShowFilter(!showFilter)
                      }
                    >
                      <IoFilter className="me-1" />
                      Filter
                    </button>

                    <button
                      className="btn btn-outline-secondary"
                      onClick={loadAssessments}
                      disabled={loading}
                    >
                      <FaRotate />
                    </button>

                    <button
                      className="btn btn-success"
                      onClick={() => {
                        resetForm();
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      <FaPlus className="me-1" />
                      Add New
                    </button>

                  </div>

                </div>

                {/* FILTER */}

                {showFilter && (
                  <div className="border rounded p-3 mt-3 bg-light">

                    <div className="row g-2">

                      <div className="col-12 col-md-4">
                        <label className="form-label small fw-semibold">
                          Session
                        </label>

                        <select
                          className="form-select form-select-sm"
                          value={filterSession}
                          onChange={(e) =>
                            setFilterSession(
                              e.target.value
                            )
                          }
                        >
                          <option value="">
                            All Sessions
                          </option>

                          {sessions?.map((item) => (
                            <option
                              key={item}
                              value={item}
                            >
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="form-label small fw-semibold">
                          Class
                        </label>

                        <select
                          className="form-select form-select-sm"
                          value={filterClass}
                          onChange={(e) =>
                            setFilterClass(
                              e.target.value
                            )
                          }
                        >
                          <option value="">
                            All Classes
                          </option>

                          {standards?.map(
                            (item, index) => {
                              const value =
                                typeof item ===
                                "string"
                                  ? item
                                  : item.name ||
                                    item.standardName ||
                                    item.value;

                              return (
                                <option
                                  key={
                                    item.id ||
                                    index
                                  }
                                  value={value}
                                >
                                  {value}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="form-label small fw-semibold">
                          Status
                        </label>

                        <select
                          className="form-select form-select-sm"
                          value={filterStatus}
                          onChange={(e) =>
                            setFilterStatus(
                              e.target.value
                            )
                          }
                        >
                          <option value="">
                            All
                          </option>

                          <option value="true">
                            Active
                          </option>

                          <option value="false">
                            Inactive
                          </option>
                        </select>
                      </div>

                    </div>

                    <div className="text-end mt-2">

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </button>

                    </div>

                  </div>
                )}

              </div>

              {/* BODY */}

              <div className="card-body">

                {loading ? (
                  <div className="text-center py-5">
                    <div
                      className="spinner-border text-success"
                      role="status"
                    />
                    <div className="small text-muted mt-2">
                      Loading assessments...
                    </div>
                  </div>
                ) : filteredAssessments.length ===
                  0 ? (
                  <div className="text-center py-5">

                    <MdAssessment
                      size={45}
                      className="text-muted mb-2"
                    />

                    <h6 className="text-muted">
                      No Assessment Found
                    </h6>

                    <small className="text-muted">
                      Create your first assessment
                      using the form.
                    </small>

                  </div>
                ) : (
                  <div className="table-responsive">

                    <table className="table table-bordered table-hover align-middle mb-0">

                      <thead className="table-light">

                        <tr>
                          <th>#</th>
                          <th>Assessment</th>
                          <th>Session</th>
                          <th>Class</th>
                          <th>Type</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th className="text-center">
                            Action
                          </th>
                        </tr>

                      </thead>

                      <tbody>

                        {filteredAssessments.map(
                          (item, index) => {

                            const name =
                              item.assessmentName ||
                              item.examName ||
                              item.name ||
                              "-";

                            const className =
                              item.studentClass ||
                              item.className ||
                              "-";

                            const type =
                              item.assessmentType ||
                              item.type ||
                              "-";

                            return (
                              <tr
                                key={
                                  item.id || index
                                }
                              >

                                <td>
                                  {index + 1}
                                </td>

                                <td>
                                  <div className="fw-semibold">
                                    {name}
                                  </div>

                                  {item.shortCode && (
                                    <small className="text-muted">
                                      {
                                        item.shortCode
                                      }
                                    </small>
                                  )}
                                </td>

                                <td>
                                  {item.session ||
                                    "-"}
                                </td>

                                <td>
                                  {className}

                                  {item.section && (
                                    <small className="text-muted ms-1">
                                      ({item.section})
                                    </small>
                                  )}
                                </td>

                                <td>
                                  {type}
                                </td>

                                <td>
                                  {item.startDate
                                    ? String(
                                        item.startDate
                                      ).substring(
                                        0,
                                        10
                                      )
                                    : "-"}
                                </td>

                                <td>
                                  <span
                                    className={`badge ${
                                      item.status
                                        ? "bg-success"
                                        : "bg-danger"
                                    }`}
                                  >
                                    {item.status
                                      ? "Active"
                                      : "Inactive"}
                                  </span>
                                </td>

                                <td>

                                  <div className="d-flex justify-content-center gap-1">

                                    <button
                                      className="btn btn-sm btn-outline-primary"
                                      title="View"
                                      onClick={() =>
                                        handleView(
                                          item
                                        )
                                      }
                                    >
                                      <FaEye />
                                    </button>

                                    <button
                                      className="btn btn-sm btn-outline-warning"
                                      title="Edit"
                                      onClick={() =>
                                        handleEdit(
                                          item
                                        )
                                      }
                                    >
                                      <FaPencil />
                                    </button>

                                    <button
                                      className="btn btn-sm btn-outline-danger"
                                      title="Delete"
                                      onClick={() =>
                                        handleDelete(
                                          item.id
                                        )
                                      }
                                    >
                                      <FaTrash />
                                    </button>

                                  </div>

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

              {/* FOOTER */}

              <div className="card-footer bg-white">

                <small className="text-muted">
                  Showing{" "}
                  <strong>
                    {filteredAssessments.length}
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {assessments.length}
                  </strong>{" "}
                  assessments
                </small>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {showView && selectedAssessment && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">

            <div className="modal-content">

              <div className="modal-header">

                <h5 className="modal-title">
                  Assessment Details
                </h5>

                <button
                  className="btn-close"
                  onClick={() =>
                    setShowView(false)
                  }
                />

              </div>

              <div className="modal-body">

                <div className="row g-3">

                  <div className="col-md-6">
                    <div className="border rounded p-3">
                      <small className="text-muted">
                        Assessment Name
                      </small>
                      <div className="fw-bold">
                        {selectedAssessment.assessmentName ||
                          selectedAssessment.examName ||
                          selectedAssessment.name ||
                          "-"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="border rounded p-3">
                      <small className="text-muted">
                        Short Code
                      </small>
                      <div className="fw-bold">
                        {selectedAssessment.shortCode ||
                          "-"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="border rounded p-3">
                      <small className="text-muted">
                        Session
                      </small>
                      <div className="fw-bold">
                        {selectedAssessment.session ||
                          "-"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="border rounded p-3">
                      <small className="text-muted">
                        Class
                      </small>
                      <div className="fw-bold">
                        {selectedAssessment.studentClass ||
                          selectedAssessment.className ||
                          "-"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="border rounded p-3">
                      <small className="text-muted">
                        Section
                      </small>
                      <div className="fw-bold">
                        {selectedAssessment.section ||
                          "All"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="border rounded p-3">
                      <small className="text-muted">
                        Assessment Type
                      </small>
                      <div className="fw-bold">
                        {selectedAssessment.assessmentType ||
                          "-"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="border rounded p-3">
                      <small className="text-muted">
                        Assessment Nature
                      </small>
                      <div className="fw-bold">
                        {selectedAssessment.assessmentNature ||
                          "-"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="border rounded p-3">
                      <small className="text-muted">
                        Start Date
                      </small>
                      <div className="fw-bold">
                        {selectedAssessment.startDate ||
                          "-"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="border rounded p-3">
                      <small className="text-muted">
                        End Date
                      </small>
                      <div className="fw-bold">
                        {selectedAssessment.endDate ||
                          "-"}
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="border rounded p-3">
                      <small className="text-muted">
                        Description
                      </small>
                      <div>
                        {selectedAssessment.description ||
                          "-"}
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setShowView(false)
                  }
                >
                  Close
                </button>

                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setShowView(false);
                    handleEdit(
                      selectedAssessment
                    );
                  }}
                >
                  <FaPencil className="me-1" />
                  Edit
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* =====================================================
          CUSTOM CSS
      ===================================================== */}

      <style>{`
        .form-control,
        .form-select {
          border-radius: 6px;
        }

        .table th,
        .table td {
          vertical-align: middle;
        }

        .card {
          border: 0;
          border-radius: 8px;
        }

        .card-header {
          border-bottom: 1px solid #eeeeee;
        }

        .card-footer {
          border-top: 1px solid #eeeeee;
        }

        @media (max-width: 768px) {
          .input-group {
            width: 100% !important;
          }
        }
      `}</style>
    </>
  );
};

export default AssessmentSetup;

