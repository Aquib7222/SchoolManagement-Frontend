
import React, { useEffect, useMemo, useState } from "react";
import {
  FaMoneyCheckAlt,
  FaSearch,
  FaCheckCircle,
  FaUsers,
  FaFileInvoiceDollar,
  FaLayerGroup,
} from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const AssignFeeToStudents = () => {
  const token = localStorage.getItem("token");

  // ==========================
  // Master Data
  // ==========================
  const [sessions, setSessions] = useState([]);
  const [standards, setStandards] = useState([]);
  const [feeCategories, setFeeCategories] = useState([]);
  const [feeBatches, setFeeBatches] = useState([]);

  // ==========================
  // Search Filters
  // ==========================
  const [selected, setSelected] = useState({
    session: "",
    standard: "",
    category: "",
    batch: "",
  });

  // ==========================
  // Tables
  // ==========================
  const [feeStructures, setFeeStructures] = useState([]);
  const [students, setStudents] = useState([]);

  // ==========================
  // Selected
  // ==========================
  const [selectedFees, setSelectedFees] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // ==========================
  // Load Masters
  // ==========================
  useEffect(() => {
    loadSessions();
    loadStandards();
    loadFeeCategories();
    loadFeeBatches();
  }, []);

  const loadSessions = async () => {
    try {
      const res = await axiosInstance.get("/api/master/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSessions(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadStandards = async () => {
    try {
      const res = await axiosInstance.get("/api/master/standard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStandards(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadFeeCategories = async () => {
    try {
      const res = await axiosInstance.get("/api/master/fee-category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeeCategories(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadFeeBatches = async () => {
    try {
      const res = await axiosInstance.get("/api/master/fee-batch", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeeBatches(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Search
  // ==========================
  const handleSearch = async () => {
    if (
      !selected.session ||
      !selected.standard ||
      !selected.category ||
      !selected.batch
    ) {
      alert("Please select all filters.");
      return;
    }

    setLoading(true);
    setSelectedFees([]);
    setSelectedStudents([]);

    try {
      await Promise.all([loadFeeStructures(), loadStudents()]);
      setSearchPerformed(true);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Fee Structures
  // ==========================
  const loadFeeStructures = async () => {
    try {
      const res = await axiosInstance.get("/api/fee-structure", {
        params: {
          session: selected.session,
          standard: selected.standard,
          category: selected.category,
          batch: selected.batch,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeeStructures(res.data || []);
    } catch (err) {
      console.log(err);
      setFeeStructures([]);
    }
  };

  // ==========================
  // Students
  // ==========================
  const loadStudents = async () => {
    try {
      const res = await axiosInstance.get("/api/students/search", {
        params: {
          academicYear: selected.session,
          studentClass: selected.standard,
          feeCategory: selected.category,
          feeBatch: selected.batch,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data || []);
    } catch (err) {
      console.log(err);
      setStudents([]);
    }
  };

  // ==========================
  // Flatten Fee Details
  // ==========================
  const feeDetails = useMemo(() => {
    return feeStructures.flatMap((structure) =>
      (structure.feeDetails || []).map((detail) => ({
        ...detail,
        structureId: structure.id,
      })),
    );
  }, [feeStructures]);

  // ==========================
  // Total Fee
  // ==========================
  const selectedFeeAmount = useMemo(() => {
    return feeDetails
      .filter((fee) => selectedFees.includes(fee.id))
      .reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
  }, [feeDetails, selectedFees]);

  // ==========================
  // Fee Checkbox
  // ==========================
  const handleFeeCheckbox = (id) => {
    setSelectedFees((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id],
    );
  };

  // ==========================
  // Student Checkbox
  // ==========================
  const handleStudentCheckbox = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id],
    );
  };

  // ==========================
  // Select All Fees
  // ==========================
  const handleSelectAllFees = (e) => {
    if (e.target.checked) {
      setSelectedFees(feeDetails.map((fee) => fee.id));
    } else {
      setSelectedFees([]);
    }
  };

  // ==========================
  // Select All Students
  // ==========================
  const handleSelectAllStudents = (e) => {
    if (e.target.checked) {
      setSelectedStudents(students.map((stu) => stu.id));
    } else {
      setSelectedStudents([]);
    }
  };

  // ==========================
  // Assign Fee
  // ==========================
  const handleAssign = async () => {
    if (selectedFees.length === 0) {
      alert("Please select at least one Fee.");
      return;
    }

    if (selectedStudents.length === 0) {
      alert("Please select at least one Student.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        feeStructureIds: selectedFees,
        studentIds: selectedStudents,
      };

      const res = await axiosInstance.post(
        "/api/student-fee/assign",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data || "Fee Assigned Successfully");

      setSelectedFees([]);
      setSelectedStudents([]);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Fee Assignment Failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* =========================================
          PAGE HEADER
      ========================================= */}
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
                background:
                  "linear-gradient(135deg, #0d6efd, #6610f2)",
                color: "white",
                fontSize: "21px",
              }}
            >
              <FaMoneyCheckAlt />
            </div>

            <div>
              <h5 className="mb-1 fw-bold">Assign Fee To Student</h5>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 small">
                  <li className="breadcrumb-item">
                    <a
                      href="/"
                      className="text-decoration-none text-secondary"
                    >
                      Home
                    </a>
                  </li>

                  <li className="breadcrumb-item text-secondary">
                    Fee
                  </li>

                  <li className="breadcrumb-item active">
                    Assign Fee
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          FILTER CARD
      ========================================= */}
      <div className="mx-2 mt-3">
        <div className="card border-0 shadow rounded-3">
          <div
            className="card-header bg-white p-3"
            
          >
            <div className="d-flex align-items-center gap-2">
              <FaSearch />
              <strong>Fee Assignment Filters</strong>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="row g-3">
              {/* Session */}
              <div className="col-12 col-md-6 col-xl-3">
                <label className="form-label fw-semibold">
                  Session <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selected.session}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      session: e.target.value,
                    })
                  }
                >
                  <option value="">Select Session</option>

                  {sessions.map((item) => (
                    <option key={item} value={item}>
                      {item.replaceAll("_", "-")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Standard */}
              <div className="col-12 col-md-6 col-xl-3">
                <label className="form-label fw-semibold">
                  Standard <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selected.standard}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      standard: e.target.value,
                    })
                  }
                >
                  <option value="">Select Standard</option>

                  {standards.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="col-12 col-md-6 col-xl-3">
                <label className="form-label fw-semibold">
                  Fee Category <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selected.category}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">Select Category</option>

                  {feeCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Batch */}
              <div className="col-12 col-md-6 col-xl-3">
                <label className="form-label fw-semibold">
                  Fee Batch <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selected.batch}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      batch: e.target.value,
                    })
                  }
                >
                  <option value="">Select Batch</option>

                  {feeBatches.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div className="col-12 text-end mt-3">
                <button
                  className="btn btn-primary px-4"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <FaSearch className="me-2" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          SUMMARY CARDS
      ========================================= */}
      {searchPerformed && !loading && (
        <div className="mx-2 mt-3">
          <div className="row g-3">
            {/* Fee */}
            <div className="col-12 col-md-4">
              <div className="card border-0 shadow rounded-3 h-100">
                <div className="card-body d-flex align-items-center gap-3">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "#e7f1ff",
                      color: "#0d6efd",
                    }}
                  >
                    <FaFileInvoiceDollar />
                  </div>

                  <div>
                    <small className="text-muted">
                      Fee Items
                    </small>

                    <h5 className="mb-0 fw-bold">
                      {feeDetails.length}
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Students */}
            <div className="col-12 col-md-4">
              <div className="card border-0 shadow rounded-3 h-100">
                <div className="card-body d-flex align-items-center gap-3">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "#e8f7ee",
                      color: "#198754",
                    }}
                  >
                    <FaUsers />
                  </div>

                  <div>
                    <small className="text-muted">
                      Students Found
                    </small>

                    <h5 className="mb-0 fw-bold">
                      {students.length}
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected */}
            <div className="col-12 col-md-4">
              <div className="card border-0 shadow rounded-3 h-100">
                <div className="card-body d-flex align-items-center gap-3">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "#fff3cd",
                      color: "#856404",
                    }}
                  >
                    <FaCheckCircle />
                  </div>

                  <div>
                    <small className="text-muted">
                      Selected Fee Amount
                    </small>

                    <h5 className="mb-0 fw-bold">
                      ₹ {selectedFeeAmount.toLocaleString("en-IN")}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          LOADING
      ========================================= */}
      {loading ? (
        <div className="mx-2 mt-4">
          <div className="card border-0 shadow rounded-3">
            <div className="card-body text-center py-5">
              <div className="spinner-border text-primary" />

              <p className="mt-3 mb-0 text-muted">
                Loading fee structures and students...
              </p>
            </div>
          </div>
        </div>
      ) : (
        searchPerformed && (
          <>
            {/* =========================================
                FEE STRUCTURE
            ========================================= */}
            <div className="mx-2 mt-4">
              <div className="card border-0 shadow rounded-3">
                <div className="card-header bg-white border-0 p-3">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="rounded-2 d-flex align-items-center justify-content-center"
                        style={{
                          width: "38px",
                          height: "38px",
                          background: "#e7f1ff",
                          color: "#0d6efd",
                        }}
                      >
                        <FaFileInvoiceDollar />
                      </div>

                      <div>
                        <h6 className="mb-0 fw-bold">
                          Fee Structure
                        </h6>

                        <small className="text-muted">
                          Select fee items to assign
                        </small>
                      </div>
                    </div>

                    <span className="badge bg-primary rounded-pill px-3 py-2">
                      {selectedFees.length} Selected
                    </span>
                  </div>
                </div>

                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered mb-0 align-middle">
                      <thead className="table-primary">
                        <tr>
                          <th className="text-center" style={{ width: "60px" }}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              onChange={handleSelectAllFees}
                              checked={
                                feeDetails.length > 0 &&
                                selectedFees.length === feeDetails.length
                              }
                            />
                          </th>

                          <th>Fee Code</th>
                          <th>Fee Name</th>
                          <th className="text-end">Amount</th>
                        </tr>
                      </thead>

                      <tbody>
                        {feeDetails.length === 0 ? (
                          <tr>
                            <td
                              colSpan="4"
                              className="text-center py-4 text-muted"
                            >
                              <FaFileInvoiceDollar
                                className="mb-2"
                                size={25}
                              />

                              <div>
                                No Fee Structure Found
                              </div>
                            </td>
                          </tr>
                        ) : (
                          feeDetails.map((detail) => (
                            <tr
                              key={detail.id}
                              className={
                                selectedFees.includes(detail.id)
                                  ? "table-active"
                                  : ""
                              }
                            >
                              <td className="text-center">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={selectedFees.includes(detail.id)}
                                  onChange={() =>
                                    handleFeeCheckbox(detail.id)
                                  }
                                />
                              </td>

                              <td>
                                <span className="badge bg-light text-dark border">
                                  {detail.feeMaster?.feeCode || "-"}
                                </span>
                              </td>

                              <td className="fw-semibold">
                                {detail.feeMaster?.feeName || "-"}
                              </td>

                              <td className="text-end fw-bold">
                                ₹{" "}
                                {Number(detail.amount || 0).toLocaleString(
                                  "en-IN",
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>

                      {feeDetails.length > 0 && (
                        <tfoot>
                          <tr>
                            <th colSpan="3" className="text-end">
                              Selected Total
                            </th>

                            <th className="text-end text-primary">
                              ₹{" "}
                              {selectedFeeAmount.toLocaleString(
                                "en-IN",
                              )}
                            </th>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================
                STUDENTS
            ========================================= */}
            <div className="mx-2 mt-4">
              <div className="card border-0 shadow rounded-3">
                <div className="card-header bg-white border-0 p-3">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="rounded-2 d-flex align-items-center justify-content-center"
                        style={{
                          width: "38px",
                          height: "38px",
                          background: "#e8f7ee",
                          color: "#198754",
                        }}
                      >
                        <FaUsers />
                      </div>

                      <div>
                        <h6 className="mb-0 fw-bold">
                          Students
                        </h6>

                        <small className="text-muted">
                          Select students for fee assignment
                        </small>
                      </div>
                    </div>

                    <span className="badge bg-success rounded-pill px-3 py-2">
                      {selectedStudents.length} Selected
                    </span>
                  </div>
                </div>

                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered mb-0 align-middle">
                      <thead className="table-primary">
                        <tr>
                          <th
                            className="text-center"
                            style={{ width: "60px" }}
                          >
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                students.length > 0 &&
                                selectedStudents.length ===
                                  students.length
                              }
                              onChange={handleSelectAllStudents}
                            />
                          </th>

                          <th>Admission No</th>
                          <th>Student Name</th>
                          <th>Class</th>
                          <th>Section</th>
                          <th>Category</th>
                          <th>Batch</th>
                        </tr>
                      </thead>

                      <tbody>
                        {students.length === 0 ? (
                          <tr>
                            <td
                              colSpan="7"
                              className="text-center py-4 text-muted"
                            >
                              <FaUsers
                                size={25}
                                className="mb-2"
                              />

                              <div>
                                No Students Found
                              </div>
                            </td>
                          </tr>
                        ) : (
                          students.map((stu) => (
                            <tr
                              key={stu.id}
                              className={
                                selectedStudents.includes(stu.id)
                                  ? "table-active"
                                  : ""
                              }
                            >
                              <td className="text-center">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={selectedStudents.includes(
                                    stu.id,
                                  )}
                                  onChange={() =>
                                    handleStudentCheckbox(stu.id)
                                  }
                                />
                              </td>

                              <td>
                                <span className="badge bg-light text-dark border">
                                  {stu.admissionNumber}
                                </span>
                              </td>

                              <td className="fw-semibold">
                                {stu.firstName} {stu.lastName}
                              </td>

                              <td>
                                <span className="badge bg-primary">
                                  {stu.studentClass || stu.class || "-"}
                                </span>
                              </td>

                              <td>{stu.section || "-"}</td>

                              <td>
                                <span className="badge bg-info text-dark">
                                  {stu.feeCategory || "-"}
                                </span>
                              </td>

                              <td>
                                <span className="badge bg-secondary">
                                  {stu.feeBatch || "-"}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================
                ASSIGN FOOTER
            ========================================= */}
            <div className="mx-2 mt-4 mb-5">
              <div
                className="card border-0 shadow rounded-3"
                style={{
                  background:
                    "linear-gradient(135deg, #f8faff, #ffffff)",
                }}
              >
                <div className="card-body p-3">
                  <div className="row align-items-center g-3">
                    <div className="col-12 col-md-8">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "45px",
                            height: "45px",
                            background: "#e7f1ff",
                            color: "#0d6efd",
                          }}
                        >
                          <FaLayerGroup />
                        </div>

                        <div>
                          <h6 className="mb-1 fw-bold">
                            Ready to Assign Fee
                          </h6>

                          <small className="text-muted">
                            {selectedFees.length} fee item(s) selected
                            {" • "}
                            {selectedStudents.length} student(s) selected
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-4 text-md-end">
                      <button
                        className="btn btn-success px-4 py-2"
                        onClick={handleAssign}
                        disabled={
                          loading ||
                          selectedFees.length === 0 ||
                          selectedStudents.length === 0
                        }
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Assigning...
                          </>
                        ) : (
                          <>
                            <FaCheckCircle className="me-2" />
                            Assign Fee
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default AssignFeeToStudents;

