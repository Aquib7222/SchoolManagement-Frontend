
import React, { useEffect, useMemo, useState } from "react";
import {
  FaMoneyCheckAlt,
  FaSearch,
  FaCheckCircle,
  FaUsers,
  FaFileInvoiceDollar,
  FaLayerGroup,
  FaRedo,
  
  FaGraduationCap,
} from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";
import { MdOutlinePayments } from "react-icons/md";

const AssignFeeToStudents = () => {
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;

  // =====================================================
  // MASTER DATA
  // =====================================================

  const [sessions, setSessions] = useState([]);
  const [standards, setStandards] = useState([]);
  const [feeCategories, setFeeCategories] = useState([]);
  const [feeBatches, setFeeBatches] = useState([]);
  const [transportFilter, setTransportFilter] = useState("");

  // =====================================================
  // FILTER
  // =====================================================

  const initialSelected = {
    session: "",
    standard: "",
    category: "",
    batch: "",
  };

  const [selected, setSelected] = useState(initialSelected);

  // =====================================================
  // DATA
  // =====================================================

  const [feeStructures, setFeeStructures] = useState([]);
  const [students, setStudents] = useState([]);

  console.log("students",students);

  // =====================================================
  // SELECTED
  // =====================================================

  const [selectedFees, setSelectedFees] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // =====================================================
  // LOADING
  // =====================================================

  const [loading, setLoading] = useState(false);
  const [masterLoading, setMasterLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // =====================================================
  // LOAD MASTER DATA
  // =====================================================

  useEffect(() => {
    loadMasterData();
  }, []);

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadMasterData = async () => {
    try {
      setMasterLoading(true);

      const [
        sessionRes,
        standardRes,
        categoryRes,
        batchRes,
      ] = await Promise.all([
        axiosInstance.get(
          "/api/master/sessions",
          authConfig
        ),

        axiosInstance.get(
          "/api/master/standard",
          authConfig
        ),

        axiosInstance.get(
          "/api/master/fee-category",
          authConfig
        ),

        axiosInstance.get(
          "/api/master/fee-batch",
          authConfig
        ),
      ]);

      setSessions(sessionRes.data || []);
      setStandards(standardRes.data || []);
      setFeeCategories(categoryRes.data || []);
      setFeeBatches(batchRes.data || []);
    } catch (error) {
      console.error("Master Data Error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Unable to load master data"
      );
    } finally {
      setMasterLoading(false);
    }
  };

  // =====================================================
  // BATCH VALUE
  // =====================================================

  const getBatchValue = (item) => {
    if (typeof item === "string") {
      return item;
    }

    return (
      item?.batch ||
      item?.name ||
      item?.value ||
      ""
    );
  };

  // =====================================================
  // SEARCH
  // =====================================================

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

    try {
      setLoading(true);

      setSelectedFees([]);
      setSelectedStudents([]);
      setFeeStructures([]);
      setStudents([]);

      await Promise.all([
        loadFeeStructures(),
        loadStudents(),
      ]);

      setSearchPerformed(true);
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD FEE STRUCTURES
  // EXISTING API - NOT CHANGED
  // =====================================================

  const loadFeeStructures = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/fee-structure",
        {
          params: {
            session: selected.session,
            standard: selected.standard,
            category: selected.category,
            batch: selected.batch,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFeeStructures(res.data || []);
    } catch (error) {
      console.error(
        "Fee Structure Error:",
        error
      );

      setFeeStructures([]);
    }
  };

  // =====================================================
  // LOAD STUDENTS
  // EXISTING API - NOT CHANGED
  // =====================================================

  const loadStudents = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/students/search",
        {
          params: {
            academicYear: selected.session,
            studentClass: selected.standard,
            feeCategory: selected.category,
            feeBatch: selected.batch,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(res.data || []);
    } catch (error) {
      console.error(
        "Students Error:",
        error
      );

      setStudents([]);
    }
  };

  console.log("Fee structure ",feeStructures);

  // =====================================================
  // FLATTEN FEE DETAILS
  // =====================================================

const feeDetails = useMemo(() => {
  return feeStructures
    .filter((structure) => {
      return (
        String(structure.session) === String(selected.session) &&
        String(structure.standard) === String(selected.standard) &&
        String(structure.feeCategory) === String(selected.category) &&
        String(structure.batch) === String(selected.batch)
      );
    })
    .flatMap((structure) =>
      (structure.feeDetails || []).map((detail) => ({
        ...detail,

        structureId: structure.id,

        session: structure.session,
        standard: structure.standard,
        batch: structure.batch,
        feeCategory: structure.feeCategory,

        // Fee Master se direct values
        feeMasterId:
          detail.feeMasterId ||
          detail.feeMaster?.id ||
          null,

        feeCode:
          detail.feeCode ||
          detail.feeMaster?.feeCode ||
          "",

        feeName:
          detail.feeName ||
          detail.feeMaster?.feeName ||
          "",
      }))
    );
}, [
  feeStructures,
  selected.session,
  selected.standard,
  selected.category,
  selected.batch,
]);
console.log("Fee details ",feeDetails);
  // =====================================================
  // SELECTED FEE AMOUNT
  // =====================================================

  const selectedFeeAmount = useMemo(() => {
    return feeDetails
      .filter((fee) =>
        selectedFees.includes(fee.id)
      )
      .reduce(
        (sum, fee) =>
          sum + Number(fee.amount || 0),
        0
      );
  }, [feeDetails, selectedFees]);

  // =====================================================
  // TOTAL AVAILABLE FEE
  // =====================================================

  const totalAvailableFee = useMemo(() => {
    return feeDetails.reduce(
      (sum, fee) =>
        sum + Number(fee.amount || 0),
      0
    );
  }, [feeDetails]);

  // =====================================================
  // FEE CHECKBOX
  // =====================================================

  const handleFeeCheckbox = (id) => {
    setSelectedFees((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  // =====================================================
  // STUDENT CHECKBOX
  // =====================================================

  const handleStudentCheckbox = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  // =====================================================
  // SELECT ALL FEES
  // =====================================================

  const handleSelectAllFees = (e) => {
    if (e.target.checked) {
      setSelectedFees(
        feeDetails.map((fee) => fee.id)
      );
    } else {
      setSelectedFees([]);
    }
  };

  // =====================================================
  // SELECT ALL STUDENTS
  // =====================================================

 const handleSelectAllStudents = (e) => {
  if (e.target.checked) {
    setSelectedStudents(
      filteredStudents.map((stu) => stu.id)
    );
  } else {
    setSelectedStudents([]);
  }
};

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
  setSelected(initialSelected);

  setFeeStructures([]);
  setStudents([]);

  setSelectedFees([]);
  setSelectedStudents([]);

  setTransportFilter("");

  setSearchPerformed(false);
};

  const filteredStudents = useMemo(() => {
  if (transportFilter === "") {
    return students;
  }

  return students.filter((stu) => {
    const transportRequired = stu.transportRequired;

    if (transportFilter === "true") {
      return (
        transportRequired === true ||
        transportRequired === "true" ||
        transportRequired === "YES" ||
        transportRequired === "Yes"
      );
    }

    if (transportFilter === "false") {
      return (
        transportRequired === false ||
        transportRequired === "false" ||
        transportRequired === "NO" ||
        transportRequired === "No" ||
        transportRequired == null
      );
    }

    return true;
  });
}, [students, transportFilter]);

  // =====================================================
  // ASSIGN FEE
  // EXISTING API - NOT CHANGED
  // =====================================================

  const handleAssign = async () => {
    if (selectedFees.length === 0) {
      alert("Please select at least one Fee.");
      return;
    }

    if (selectedStudents.length === 0) {
      alert(
        "Please select at least one Student."
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        feeStructureIds: selectedFees,
        studentIds: selectedStudents,
      };

      console.log(
        "Assign Fee Payload:",
        payload
      );

      const res = await axiosInstance.post(
        "/api/student-fee/assign",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        res.data?.message ||
          res.data ||
          "Fee Assigned Successfully"
      );

      setSelectedFees([]);
      setSelectedStudents([]);
    } catch (error) {
      console.error(
        "Fee Assignment Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Fee Assignment Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FORMAT AMOUNT
  // =====================================================

  const formatAmount = (amount) => {
    return `₹ ${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

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
                  className="d-flex align-items-center justify-content-center rounded-4"
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
                  <FaMoneyCheckAlt
                    size={24}
                  />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Assign Fee To Student
                  </h5>

                  <div className="text-muted small">
                    Fee Management&nbsp; / &nbsp;
                    Assign Fee
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-light border d-flex align-items-center gap-2 rounded-4 px-3"
                  onClick={handleReset}
                >
                  <FaRedo size={12} />
                  Reset
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
              Home&nbsp; › &nbsp;Fee Management
              &nbsp; › &nbsp;
              <span className="text-primary fw-semibold">
                Assign Fee
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="mx-2 mt-3">
        <div className="card border-0 shadow rounded-4">
          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom:
                "1px solid #eef0f2",
            }}
          >
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "38px",
                    height: "38px",
                    background: "#e7f1ff",
                    color: "#0d6efd",
                  }}
                >
                  <FaSearch size={15} />
                </div>

                <div>
                  <h6 className="mb-1 fw-bold">
                    Fee Assignment Filters
                  </h6>

                  <small className="text-muted">
                    Select session, standard,
                    category and batch
                  </small>
                </div>
              </div>

              {searchPerformed && (
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#e9f7ef",
                    color: "#198754",
                  }}
                >
                  {students.length} Students
                </span>
              )}
            </div>
          </div>

          <div className="card-body p-3 p-md-4">
            {masterLoading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" />

                <div className="small text-muted mt-2">
                  Loading master data...
                </div>
              </div>
            ) : (
              <div className="row g-3">
                {/* SESSION */}

                <div className="col-12 col-md-6 col-xl-3">
                  <label className="form-label fw-semibold small">
                    Session{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <select
                    className="form-select"
                    value={selected.session}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        session:
                          e.target.value,
                      })
                    }
                  >
                    <option value="">
                      Select Session
                    </option>

                    {sessions.map(
                      (item, index) => (
                        <option
                          key={`${item}-${index}`}
                          value={item}
                        >
                          {String(item).replaceAll(
                            "_",
                            "-"
                          )}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* STANDARD */}

                <div className="col-12 col-md-6 col-xl-3">
                  <label className="form-label fw-semibold small">
                    Standard{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <select
                    className="form-select"
                    value={selected.standard}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        standard:
                          e.target.value,
                      })
                    }
                  >
                    <option value="">
                      Select Standard
                    </option>

                    {standards.map(
                      (item, index) => (
                        <option
                          key={`${item}-${index}`}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* CATEGORY */}

                <div className="col-12 col-md-6 col-xl-3">
                  <label className="form-label fw-semibold small">
                    Fee Category{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <select
                    className="form-select"
                    value={selected.category}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        category:
                          e.target.value,
                      })
                    }
                  >
                    <option value="">
                      Select Category
                    </option>

                    {feeCategories.map(
                      (item, index) => (
                        <option
                          key={`${item}-${index}`}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* BATCH */}

                <div className="col-12 col-md-6 col-xl-3">
                  <label className="form-label fw-semibold small">
                    Fee Batch{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <select
                    className="form-select"
                    value={selected.batch}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        batch:
                          e.target.value,
                      })
                    }
                  >
                    <option value="">
                      Select Batch
                    </option>

                    {feeBatches.map(
                      (item, index) => {
                        const value =
                          getBatchValue(item);

                        return (
                          <option
                            key={`${value}-${index}`}
                            value={value}
                          >
                            {value}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>

                {/* ACTION */}

                <div className="col-12">
                  <div className="d-flex justify-content-end gap-2 mt-2 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-light border px-4"
                      onClick={handleReset}
                    >
                      <FaRedo
                        className="me-2"
                        size={12}
                      />
                      Reset
                    </button>

                    <button
                      type="button"
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
                          <FaSearch
                            className="me-2"
                            size={12}
                          />
                          Search
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      {searchPerformed && !loading && (
        <div className="row g-3 mt-1 px-2">
          {/* FEE ITEMS */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-blue shadow">
              <div className="stat-icon">
                <FaFileInvoiceDollar />
              </div>

              <div className="stat-content">
                <span>Fee Items</span>

                <h3>
                  {feeDetails.length}
                </h3>

                <small>
                  Available Fee Components
                </small>
              </div>
            </div>
          </div>

          {/* STUDENTS */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-green shadow">
              <div className="stat-icon">
                <FaUsers />
              </div>

              <div className="stat-content">
                <span>Students Found</span>

                <h3>
                  {students.length}
                </h3>

                <small>
                  Students Matching Filters
                </small>
              </div>
            </div>
          </div>

          {/* SELECTED */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-orange shadow">
              <div className="stat-icon">
                <FaCheckCircle />
              </div>

              <div className="stat-content">
                <span>Selected Students</span>

                <h3>
                  {selectedStudents.length}
                </h3>

                <small>
                  Students Selected
                </small>
              </div>
            </div>
          </div>

          {/* AMOUNT */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-red shadow">
              <div className="stat-icon">
                <MdOutlinePayments />
              </div>

              <div className="stat-content">
                <span>Selected Fee</span>

                <h3
                  style={{
                    fontSize: "21px",
                  }}
                >
                  {formatAmount(
                    selectedFeeAmount
                  )}
                </h3>

                <small>
                  Selected Fee Amount
                </small>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <div className="mx-2 mt-4">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body text-center py-5">
              <div
                className="spinner-border text-primary"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                }}
              />

              <p className="mt-3 mb-0 text-muted">
                Loading fee structures and
                students...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          RESULTS
      ===================================================== */}

      {!loading && searchPerformed && (
        <>
          {/* =================================================
              FEE COMPONENTS
          ================================================= */}

          <div className="mx-2 mt-4">
            <div className="card border-0 shadow rounded-4 overflow-hidden">
              <div
                className="card-header bg-white p-3"
                style={{
                  borderBottom:
                    "1px solid #eef0f2",
                }}
              >
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "#e7f1ff",
                        color: "#0d6efd",
                      }}
                    >
                      <FaFileInvoiceDollar />
                    </div>

                    <div>
                      <h6 className="mb-1 fw-bold">
                        Fee Components
                      </h6>

                      <small className="text-muted">
                        Select fee components
                        to assign
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
                  <table
                    className="table align-middle mb-0"
                    style={{
                      minWidth: "700px",
                    }}
                  >
                    <thead
                      style={{
                        background:
                          "#f8f9fa",
                      }}
                    >
                      <tr>
                        <th
                          className="text-center"
                          style={headerStyle}
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            onChange={
                              handleSelectAllFees
                            }
                            checked={
                              feeDetails.length >
                                0 &&
                              selectedFees.length ===
                                feeDetails.length
                            }
                          />
                        </th>

                        <th style={headerStyle}>
                          #
                        </th>

                        <th style={headerStyle}>
                          FEE CODE
                        </th>

                        <th style={headerStyle}>
                          FEE NAME
                        </th>

                        <th
                          className="text-end"
                          style={headerStyle}
                        >
                          AMOUNT
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {feeDetails.length ===
                      0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center py-5"
                          >
                            <div
                              className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                              style={{
                                width: "55px",
                                height: "55px",
                                background:
                                  "#f1f3f5",
                                color: "#868e96",
                              }}
                            >
                              <FaFileInvoiceDollar
                                size={23}
                              />
                            </div>

                            <h6 className="fw-semibold text-muted mb-1">
                              No Fee Components
                            </h6>

                            <small className="text-muted">
                              No fee structure
                              found for the
                              selected filters.
                            </small>
                          </td>
                        </tr>
                      ) : (
                        feeDetails.map(
                          (detail, index) => {
                            const isSelected =
                              selectedFees.includes(
                                detail.id
                              );

                            return (
                              <tr
                                key={
                                  detail.id
                                }
                                style={{
                                  background:
                                    isSelected
                                      ? "#f8fbff"
                                      : "",
                                  borderBottom:
                                    "1px solid #f0f1f2",
                                }}
                              >
                                <td className="text-center">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={
                                      isSelected
                                    }
                                    onChange={() =>
                                      handleFeeCheckbox(
                                        detail.id
                                      )
                                    }
                                  />
                                </td>

                                <td>
                                  <span
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                    style={{
                                      width: "28px",
                                      height: "28px",
                                      background:
                                        "#f4f6f8",
                                      color:
                                        "#6c757d",
                                      fontSize:
                                        "12px",
                                      fontWeight:
                                        "600",
                                    }}
                                  >
                                    {index + 1}
                                  </span>
                                </td>

                                <td>
                                  <span
                                    className="badge rounded-pill"
                                    style={{
                                      background:
                                        "#f1f8f4",
                                      color:
                                        "#198754",
                                      border:
                                        "1px solid #d9eee1",
                                      padding:
                                        "6px 10px",
                                    }}
                                  >
                                    {detail
                                      .feeMaster
                                      ?.feeCode ||
                                      "-"}
                                  </span>
                                </td>

                                <td>
                                  <div className="d-flex align-items-center gap-2">
                                    <div
                                      className="rounded-2 d-flex align-items-center justify-content-center"
                                      style={{
                                        width: "34px",
                                        height: "34px",
                                        background:
                                          "#e7f1ff",
                                        color:
                                          "#0d6efd",
                                      }}
                                    >
                                      <FaMoneyCheckAlt
                                        size={13}
                                      />
                                    </div>

                                    <div>
                                      <div className="fw-semibold">
                                        {detail
                                          .feeMaster
                                          ?.feeName ||
                                          "-"}
                                      </div>

                                      <small className="text-muted">
                                        Fee Component
                                      </small>
                                    </div>
                                  </div>
                                </td>

                                <td className="text-end">
                                  <span
                                    className="fw-bold text-primary"
                                    style={{
                                      fontSize:
                                        "13px",
                                    }}
                                  >
                                    {formatAmount(
                                      detail.amount
                                    )}
                                  </span>
                                </td>
                              </tr>
                            );
                          }
                        )
                      )}
                    </tbody>

                    {feeDetails.length >
                      0 && (
                      <tfoot>
                        <tr>
                          <th
                            colSpan="4"
                            className="text-end"
                          >
                            Selected Total
                          </th>

                          <th className="text-end text-primary">
                            {formatAmount(
                              selectedFeeAmount
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

          {/* =================================================
              STUDENTS
          ================================================= */}

          <div className="mx-2 mt-4">
            <div className="card border-0 shadow rounded-4 overflow-hidden">
              <div
                className="card-header bg-white p-3"
                style={{
                  borderBottom:
                    "1px solid #eef0f2",
                }}
              >
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "#e9f7ef",
                        color: "#198754",
                      }}
                    >
                      <FaUsers />
                    </div>

                    <div>
                      <h6 className="mb-1 fw-bold">
                        Students
                      </h6>

                      <small className="text-muted">
                        Select students for fee
                        assignment
                      </small>
                    </div>
                  </div>

                 <div className="d-flex align-items-center gap-2 flex-wrap">

  <select
    className="form-select"
    value={transportFilter}
    onChange={(e) => {
      setTransportFilter(e.target.value);
      setSelectedStudents([]);
    }}
    style={{
      width: "170px",
      minHeight: "38px",
      fontSize: "12px",
    }}
  >
    <option value="">All Transport</option>
    <option value="true">Transport: Yes</option>
    <option value="false">Transport: No</option>
  </select>

  <span 
    className="badge rounded-pill px-3 py-2"
    style={{ 
      background: "#e9f7ef", 
      color: "#198754", 
    }}
  >
    {selectedStudents.length} Selected
  </span>

</div>
                </div>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table
                    className="table align-middle mb-0"
                    style={{
                      minWidth:
                        "1000px",
                    }}
                  >
                    <thead
                      style={{
                        background:
                          "#f8f9fa",
                      }}
                    >
                      <tr>
                        <th
                          className="text-center"
                          style={headerStyle}
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                           checked={
  filteredStudents.length > 0 &&
  filteredStudents.every((stu) =>
    selectedStudents.includes(stu.id)
  )
}
                            onChange={
                              handleSelectAllStudents
                            }
                          />
                        </th>

                        <th style={headerStyle}>
                          #
                        </th>

                        <th style={headerStyle}>
                          ADMISSION NO
                        </th>

                        <th style={headerStyle}>
                          STUDENT
                        </th>

                        <th style={headerStyle}>
                          CLASS
                        </th>

                        <th style={headerStyle}>
                          SECTION
                        </th>

                        <th style={headerStyle}>
                          CATEGORY
                        </th>

                        <th style={headerStyle}>
                          BATCH
                        </th>
                        <th style={headerStyle}>
                          Transport Required
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredStudents.length ===
                      0 ? (
                        <tr>
                          <td
                            colSpan="8"
                            className="text-center py-5"
                          >
                            <div
                              className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                              style={{
                                width: "55px",
                                height: "55px",
                                background:
                                  "#f1f3f5",
                                color: "#868e96",
                              }}
                            >
                              <FaUsers
                                size={23}
                              />
                            </div>

                            <h6 className="fw-semibold text-muted mb-1">
                              No Students Found
                            </h6>

                            <small className="text-muted">
                              No students match
                              the selected
                              filters.
                            </small>
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map(
                          (stu, index) => {
                            const isSelected =
                              selectedStudents.includes(
                                stu.id
                              );

                            return (
                              <tr
                                key={
                                  stu.id
                                }
                                style={{
                                  background:
                                    isSelected
                                      ? "#fbfdfc"
                                      : "",
                                  borderBottom:
                                    "1px solid #f0f1f2",
                                }}
                              >
                                <td className="text-center">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={
                                      isSelected
                                    }
                                    onChange={() =>
                                      handleStudentCheckbox(
                                        stu.id
                                      )
                                    }
                                  />
                                </td>

                                <td>
                                  <span
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                    style={{
                                      width: "28px",
                                      height: "28px",
                                      background:
                                        "#f4f6f8",
                                      color:
                                        "#6c757d",
                                      fontSize:
                                        "12px",
                                      fontWeight:
                                        "600",
                                    }}
                                  >
                                    {index +
                                      1}
                                  </span>
                                </td>

                                <td>
                                  <span
                                    className="badge rounded-pill"
                                    style={{
                                      background:
                                        "#f4f6f8",
                                      color:
                                        "#495057",
                                      border:
                                        "1px solid #e1e5e8",
                                      padding:
                                        "6px 10px",
                                    }}
                                  >
                                    {stu.admissionNumber ||
                                      "-"}
                                  </span>
                                </td>

                                <td>
                                  <div className="d-flex align-items-center gap-2">
                                    <div
                                      className="d-flex align-items-center justify-content-center rounded-circle"
                                      style={{
                                        width:
                                          "36px",
                                        height:
                                          "36px",
                                        minWidth:
                                          "36px",
                                        background:
                                          "#e7f1ff",
                                        color:
                                          "#0d6efd",
                                      }}
                                    >
                                      <FaGraduationCap
                                        size={
                                          15
                                        }
                                      />
                                    </div>

                                    <div>
                                      <div className="fw-semibold">
                                        {
                                          stu.firstName
                                        }{" "}
                                        {
                                          stu.lastName
                                        }
                                      </div>

                                      <small className="text-muted">
                                        Student
                                      </small>
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <span
                                    className="badge rounded-pill"
                                    style={{
                                      background:
                                        "#f1f8f4",
                                      color:
                                        "#198754",
                                      border:
                                        "1px solid #d9eee1",
                                      padding:
                                        "6px 10px",
                                    }}
                                  >
                                    {stu.studentClass ||
                                      stu.class ||
                                      "-"}
                                  </span>
                                </td>

                                <td>
                                  {stu.section ||
                                    "-"}
                                </td>

                                <td>
                                  <span
                                    className="badge rounded-pill"
                                    style={{
                                      background:
                                        "#e7f1ff",
                                      color:
                                        "#0d6efd",
                                      padding:
                                        "6px 10px",
                                    }}
                                  >
                                    {stu.feeCategory ||
                                      selected.category ||
                                      "-"}
                                  </span>
                                </td>

                                <td>
                                  <span
                                    className="badge rounded-pill"
                                    style={{
                                      background:
                                        "#f4f6f8",
                                      color:
                                        "#495057",
                                      border:
                                        "1px solid #e1e5e8",
                                      padding:
                                        "6px 10px",
                                    }}
                                  >
                                    {stu.feeBatch ||
                                      selected.batch ||
                                      "-"}
                                  </span>
                                </td>
                                <td>
  {stu.transportRequired === true ||
  stu.transportRequired === "true" ||
  stu.transportRequired === "YES" ||
  stu.transportRequired === "Yes" ? (
    <span
      className="badge rounded-pill"
      style={{
        background: "#e9f7ef",
        color: "#198754",
        border: "1px solid #d9eee1",
        padding: "6px 10px",
      }}
    >
      Yes
    </span>
  ) : (
    <span
      className="badge rounded-pill"
      style={{
        background: "#fff1f2",
        color: "#dc3545",
        border: "1px solid #f5c2c7",
        padding: "6px 10px",
      }}
    >
      No
    </span>
  )}
</td>
                              </tr>
                            );
                          }
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                className="card-footer bg-white p-3"
                style={{
                  borderTop:
                    "1px solid #eef0f2",
                }}
              >
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <small className="text-muted">
                  Showing{" "}
<strong className="text-primary">
  {filteredStudents.length}
</strong>{" "}
of{" "}
<strong>
  {students.length}
</strong>{" "}
student(s)
                  </small>

                  <small className="text-muted">
                    Selected:{" "}
                    <strong className="text-success">
                      {
                        selectedStudents.length
                      }
                    </strong>
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              ASSIGN FOOTER
          ================================================= */}

          <div className="mx-2 mt-4 mb-5">
            <div
              className="card border-0 shadow rounded-4 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg,#f8faff,#ffffff)",
              }}
            >
              <div className="card-body p-3 p-md-4">
                <div className="row align-items-center g-3">
                  <div className="col-12 col-md-8">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                          background:
                            "#e7f1ff",
                          color: "#0d6efd",
                        }}
                      >
                        <FaLayerGroup />
                      </div>

                      <div>
                        <h6 className="mb-1 fw-bold">
                          Ready To Assign Fee
                        </h6>

                        <small className="text-muted">
                          {selectedFees.length}{" "}
                          fee item(s) selected
                          {" • "}
                          {
                            selectedStudents.length
                          }{" "}
                          student(s) selected
                        </small>

                        <div className="mt-1">
                          <small className="fw-semibold text-primary">
                            Selected Amount:{" "}
                            {formatAmount(
                              selectedFeeAmount
                            )}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4 text-md-end">
                    <button
                      type="button"
                      className="btn btn-success px-4 py-2 rounded-3"
                      onClick={handleAssign}
                      disabled={
                        loading ||
                        selectedFees.length ===
                          0 ||
                        selectedStudents.length ===
                          0
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
      )}

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>
        {`
          .premium-stat-card {
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            gap: 15px;
            min-height: 115px;
            padding: 18px;
            border-radius: 16px;
            background: #ffffff;
            border: 1px solid #eef0f2;
          }

          .premium-stat-card::after {
            content: "";
            position: absolute;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            right: -25px;
            top: -25px;
            opacity: 0.08;
            background: currentColor;
          }

          .stat-icon {
            width: 48px;
            height: 48px;
            min-width: 48px;
            border-radius: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
          }

          .stat-content {
            display: flex;
            flex-direction: column;
          }

          .stat-content span {
            font-size: 12px;
            color: #6c757d;
            font-weight: 600;
          }

          .stat-content h3 {
            margin: 3px 0;
            font-size: 24px;
            font-weight: 700;
            color: #212529;
          }

          .stat-content small {
            font-size: 11px;
            color: #8b9299;
          }

          .stat-blue {
            color: #0d6efd;
          }

          .stat-blue .stat-icon {
            background: #e7f1ff;
            color: #0d6efd;
          }

          .stat-green {
            color: #198754;
          }

          .stat-green .stat-icon {
            background: #e9f7ef;
            color: #198754;
          }

          .stat-orange {
            color: #fd7e14;
          }

          .stat-orange .stat-icon {
            background: #fff3e8;
            color: #fd7e14;
          }

          .stat-red {
            color: #dc3545;
          }

          .stat-red .stat-icon {
            background: #fff1f2;
            color: #dc3545;
          }

          .form-select,
          .form-control {
            min-height: 40px;
            border-radius: 8px;
            border-color: #dee2e6;
            font-size: 13px;
          }

          .form-select:focus,
          .form-control:focus {
            border-color: #198754;
            box-shadow: 0 0 0 0.15rem rgba(25, 135, 84, 0.10);
          }

          .form-check-input {
            width: 17px;
            height: 17px;
            cursor: pointer;
          }

          .form-check-input:checked {
            background-color: #0d6efd;
            border-color: #0d6efd;
          }

          .table tbody tr {
            transition: all 0.18s ease;
          }

          .table tbody tr:hover {
            background-color: #fbfdfc !important;
          }

          .btn {
            font-size: 13px;
            font-weight: 500;
          }

          .card {
            overflow: hidden;
          }

          @media (max-width: 768px) {
            .premium-stat-card {
              min-height: 100px;
            }

            .table {
              font-size: 12px;
            }

            .card-header {
              padding: 12px !important;
            }
          }
        `}
      </style>
    </>
  );
};

// =========================================================
// TABLE HEADER STYLE
// =========================================================

const headerStyle = {
  padding: "14px 12px",
  fontSize: "11px",
  color: "#6c757d",
  fontWeight: "700",
  letterSpacing: "0.3px",
};

export default AssignFeeToStudents;