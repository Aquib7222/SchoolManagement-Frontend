

import React, { useEffect, useMemo, useState } from "react";
import {
  LuSearch,
  LuRotateCcw,
  LuEye,
  LuWalletCards,
  LuUser,
  LuGraduationCap,
  LuIndianRupee,
  LuCircleCheck,
  LuCircleAlert,
  LuCalendarDays,
} from "react-icons/lu";

import { FaMoneyBillWave, FaUsers } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const StudentFeeAssignment = () => {
  const token = localStorage.getItem("token");

  // =========================================================
  // STATES
  // =========================================================

  const [session, setSession] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");

  const [sessions, setSessions] = useState([]);
  const [standards, setStandards] = useState([]);
  const [sections, setSections] = useState([]);

  const [students, setStudents] = useState([]);
  const [studentFees, setStudentFees] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadSessions();
    loadStandards();
    loadSections();
  }, []);

  // =========================================================
  // LOAD SESSIONS
  // =========================================================

  const loadSessions = async () => {
    try {
      const res = await axiosInstance.get("/api/master/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSessions(res.data || []);
    } catch (err) {
      console.log("Session Error:", err);
      setSessions([]);
    }
  };

  // =========================================================
  // LOAD STANDARDS
  // =========================================================

  const loadStandards = async () => {
    try {
      const res = await axiosInstance.get("/api/master/standard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStandards(res.data || []);
    } catch (err) {
      console.log("Standard Error:", err);
      setStandards([]);
    }
  };

  // =========================================================
  // LOAD SECTIONS
  // =========================================================

  const loadSections = async () => {
    try {
      const res = await axiosInstance.get("/api/master/section", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSections(res.data || []);
    } catch (err) {
      console.log("Section Error:", err);
      setSections([]);
    }
  };

  // =========================================================
  // LOAD STUDENTS
  // =========================================================

  const loadStudents = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/api/student-fee", {
        params: {
          session,
          studentClass,
          section,
          admissionNumber,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data || []);
      setStudentFees([]);
      setSelectedStudent(null);
    } catch (err) {
      console.log(
        "Student Fee Error:",
        err.response?.data || err.message
      );

      setStudents([]);
      setStudentFees([]);
      setSelectedStudent(null);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD STUDENT FEES
  // =========================================================

  const loadStudentFees = async (admissionNo) => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/api/student-fee/${admissionNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fees = res.data || [];

      setStudentFees(fees);

      if (fees.length > 0) {
        setSelectedStudent((prev) => ({
          ...prev,
          admissionNumber: admissionNo,
          studentName:
            prev?.studentName ||
            fees[0]?.studentName ||
            "",
        }));
      }
    } catch (err) {
      console.log(
        "Student Fee Details Error:",
        err.response?.data || err.message
      );

      setStudentFees([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = () => {
    loadStudents();
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    setSession("");
    setStudentClass("");
    setSection("");
    setAdmissionNumber("");

    setStudents([]);
    setStudentFees([]);
    setSelectedStudent(null);
  };

  // =========================================================
  // VIEW STUDENT
  // =========================================================

  const handleView = (student) => {
    setSelectedStudent(student);
    loadStudentFees(student.admissionNumber);
  };

  // =========================================================
  // SUMMARY
  // =========================================================

  const summary = useMemo(() => {
    const totalStudents = students.length;

    const paidStudents = students.filter(
      (student) =>
        Number(student.totalDue || 0) === 0
    ).length;

    const unpaidStudents =
      totalStudents - paidStudents;

    const totalAssignedAmount = studentFees.reduce(
      (sum, fee) =>
        sum + Number(fee.amount || 0),
      0
    );

    const totalPaidAmount = studentFees.reduce(
      (sum, fee) =>
        sum + Number(fee.paidAmount || 0),
      0
    );

    const totalDueAmount = studentFees.reduce(
      (sum, fee) =>
        sum + Number(fee.dueAmount || 0),
      0
    );

    return {
      totalStudents,
      paidStudents,
      unpaidStudents,
      totalAssignedAmount,
      totalPaidAmount,
      totalDueAmount,
    };
  }, [students, studentFees]);

  // =========================================================
  // MONEY FORMAT
  // =========================================================

  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <div className="container-fluid px-2 px-md-3 pb-5 mt-2">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="mx-0 mt-2 mb-3">
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
                    minWidth: "52px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaMoneyBillWave size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Student Fee Assignment
                  </h5>

                  <div className="text-muted small">
                    Fees &nbsp;/&nbsp; Student Fee Assignment
                  </div>
                </div>

              </div>

              <div>
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <LuWalletCards
                    size={15}
                    className="me-1"
                  />
                  Fee Management
                </span>
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
              Home &nbsp;›&nbsp; Fees &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Student Fee Assignment
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="row g-3 mb-4">

        {/* TOTAL STUDENTS */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaUsers />
            </div>

            <div className="stat-content">
              <span>Total Students</span>

              <h3>
                {summary.totalStudents.toLocaleString("en-IN")}
              </h3>

              <small>
                Students found
              </small>
            </div>
          </div>
        </div>

        {/* PAID */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <LuCircleCheck />
            </div>

            <div className="stat-content">
              <span>Paid Students</span>

              <h3>
                {summary.paidStudents.toLocaleString("en-IN")}
              </h3>

              <small>
                Fully paid
              </small>
            </div>
          </div>
        </div>

        {/* UNPAID */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <LuCircleAlert />
            </div>

            <div className="stat-content">
              <span>Unpaid Students</span>

              <h3>
                {summary.unpaidStudents.toLocaleString("en-IN")}
              </h3>

              <small>
                Payment pending
              </small>
            </div>
          </div>
        </div>

        {/* TOTAL DUE */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-red shadow">
            <div className="stat-icon">
              <LuIndianRupee />
            </div>

            <div className="stat-content">
              <span>Total Due</span>

              <h3>
                ₹
                {summary.totalDueAmount.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Selected student fees
              </small>
            </div>
          </div>
        </div>

      </div>

      {/* =====================================================
          SEARCH CARD
      ====================================================== */}

      <div className="px-0">

        <div className="card shadow border-0 mb-4 rounded-4">

          {/* HEADER */}

          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom:
                "1px solid #e5e7eb",
            }}
          >

            <div className="d-flex align-items-center justify-content-between">

              <div className="d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <LuSearch size={20} />
                </div>

                <div className="d-flex flex-column ms-2">

                  <h6 className="mb-0 lh-1 fw-bold">
                    Search Student
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Search student fee assignment records
                  </small>

                </div>

              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border:
                    "1px solid #bfdbfe",
                }}
              >
                <FaMoneyBillWave className="me-1" />
                Fee Search
              </span>

            </div>

          </div>

          {/* BODY */}

          <div className="card-body p-4">

            <div className="row g-3 align-items-end">

              {/* SESSION */}

              <div className="col-xl-3 col-lg-3 col-md-6">

                <label className="form-label fw-semibold">
                  Session
                </label>

                <select
                  className="form-select"
                  value={session}
                  onChange={(e) =>
                    setSession(e.target.value)
                  }
                >
                  <option value="">
                    Select Session
                  </option>

                  {sessions.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* CLASS */}

              <div className="col-xl-3 col-lg-3 col-md-6">

                <label className="form-label fw-semibold">
                  Class
                </label>

                <select
                  className="form-select"
                  value={studentClass}
                  onChange={(e) =>
                    setStudentClass(e.target.value)
                  }
                >
                  <option value="">
                    Select Class
                  </option>

                  {standards.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* SECTION */}

              <div className="col-xl-2 col-lg-2 col-md-6">

                <label className="form-label fw-semibold">
                  Section
                </label>

                <select
                  className="form-select"
                  value={section}
                  onChange={(e) =>
                    setSection(e.target.value)
                  }
                >
                  <option value="">
                    All Sections
                  </option>

                  {sections.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* ADMISSION */}

              <div className="col-xl-2 col-lg-2 col-md-6">

                <label className="form-label fw-semibold">
                  Admission No.
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="ADM00001"
                  value={admissionNumber}
                  onChange={(e) =>
                    setAdmissionNumber(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* BUTTONS */}

              <div className="col-xl-2 col-lg-2 col-md-12">

                <div className="d-flex gap-2">

                  <button
                    className="btn btn-primary flex-grow-1 rounded-3"
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <LuSearch
                          className="me-1"
                        />
                        Search
                      </>
                    )}
                  </button>

                  <button
                    className="btn btn-outline-secondary rounded-3"
                    onClick={handleReset}
                    title="Reset"
                  >
                    <LuRotateCcw />
                  </button>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          STUDENT LIST
      ====================================================== */}

      <div className="px-0">

        <div className="card shadow border-0 rounded-4 mb-4">

          {/* HEADER */}

          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom:
                "1px solid #e5e7eb",
            }}
          >

            <div className="d-flex justify-content-between align-items-center">

              <div className="d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <LuWalletCards size={22} />
                </div>

                <div className="d-flex flex-column ms-2">

                  <h6 className="mb-0 lh-1 fw-bold">
                    Assigned Students
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Students with assigned fees
                  </small>

                </div>

              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border:
                    "1px solid #bfdbfe",
                }}
              >
                {students.length} Students
              </span>

            </div>

          </div>

          {/* TABLE */}

          <div className="card-body px-0">

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead
                  className="small text-center"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#1e3a8a",
                  }}
                >

                  <tr>
                    <th>#</th>
                    <th>Admission No</th>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Mobile</th>
                    <th>Total Due</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody className="text-center small">

                  {loading ? (

                    <tr>
                      <td
                        colSpan="9"
                        className="text-center py-5"
                      >

                        <div
                          className="spinner-border text-primary"
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                          }}
                        />

                        <div className="mt-2 text-muted">
                          Loading students...
                        </div>

                      </td>
                    </tr>

                  ) : students.length === 0 ? (

                    <tr>
                      <td
                        colSpan="9"
                        className="text-center py-5"
                      >

                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor:
                              "#fef2f2",
                            color: "#dc2626",
                          }}
                        >
                          <LuUser size={28} />
                        </div>

                        <h6 className="text-danger fw-bold">
                          No Record Found
                        </h6>

                        <small className="text-muted">
                          Search students using the
                          filters above.
                        </small>

                      </td>
                    </tr>

                  ) : (

                    students.map((student, index) => {

                      const due =
                        Number(
                          student.totalDue || 0
                        );

                      const isPaid = due === 0;

                      return (
                        <tr
                          key={
                            student.studentId ||
                            student.admissionNumber ||
                            index
                          }
                        >

                          <td className="fw-semibold">
                            {index + 1}
                          </td>

                          <td>
                            <span className="fw-bold text-primary">
                              {student.admissionNumber ||
                                "-"}
                            </span>
                          </td>

                          <td className="fw-semibold">
                            {student.studentName ||
                              "-"}
                          </td>

                          <td>
                            {student.studentClass ||
                              "-"}
                          </td>

                          <td>
                            {student.section || "-"}
                          </td>

                          <td>
                            {student.mobileNumber ||
                              "N/A"}
                          </td>

                          <td
                            className={
                              due > 0
                                ? "text-danger fw-bold"
                                : "text-success fw-bold"
                            }
                          >
                            ₹ {formatMoney(due)}
                          </td>

                          <td>

                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={
                                isPaid
                                  ? {
                                      backgroundColor:
                                        "#dcfce7",
                                      color:
                                        "#166534",
                                      border:
                                        "1px solid #bbf7d0",
                                    }
                                  : {
                                      backgroundColor:
                                        "#fee2e2",
                                      color:
                                        "#b91c1c",
                                      border:
                                        "1px solid #fecaca",
                                    }
                              }
                            >
                              {isPaid
                                ? "PAID"
                                : "UNPAID"}
                            </span>

                          </td>

                          <td>

                            <button
                              className="btn btn-primary btn-sm rounded-3 px-3"
                              onClick={() =>
                                handleView(
                                  student
                                )
                              }
                            >
                              <LuEye
                                className="me-1"
                              />
                              View
                            </button>

                          </td>

                        </tr>
                      );
                    })
                  )}

                </tbody>

              </table>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          SELECTED STUDENT
      ====================================================== */}

      {selectedStudent && (

        <div className="px-0">

          <div className="card shadow border-0 rounded-4 mb-4">

            {/* HEADER */}

            <div
              className="card-header bg-white py-3"
              style={{
                borderBottom:
                  "1px solid #e5e7eb",
              }}
            >

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">

                <div className="d-flex align-items-center">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "42px",
                      height: "42px",
                      background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",
                      color: "#fff",
                      boxShadow:
                        "0 8px 20px rgba(37,99,235,.22)",
                    }}
                  >
                    <LuWalletCards size={22} />
                  </div>

                  <div className="d-flex flex-column ms-2">

                    <h6 className="mb-0 lh-1 fw-bold">
                      Student Fee Details
                    </h6>

                    <small className="lh-1 text-muted mt-1">
                      Assigned fee details and payment status
                    </small>

                  </div>

                </div>

                <div className="d-flex flex-wrap gap-2">

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor:
                        "#eff6ff",
                      color: "#2563eb",
                      border:
                        "1px solid #bfdbfe",
                    }}
                  >
                    <LuUser
                      size={14}
                      className="me-1"
                    />
                    {selectedStudent.studentName ||
                      "-"}
                  </span>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor:
                        "#f8fafc",
                      color: "#334155",
                      border:
                        "1px solid #cbd5e1",
                    }}
                  >
                    {selectedStudent.admissionNumber ||
                      "-"}
                  </span>

                </div>

              </div>

            </div>

            {/* STUDENT INFO */}

            <div className="card-body">

              <div className="row g-3 mb-4">

                <div className="col-xl-3 col-md-6">

                  <div
                    className="p-3 rounded-3 h-100"
                    style={{
                      backgroundColor:
                        "#eff6ff",
                      border:
                        "1px solid #dbeafe",
                    }}
                  >

                    <div className="d-flex align-items-center gap-2">

                      <LuUser
                        className="text-primary"
                        size={20}
                      />

                      <small className="text-muted">
                        Student
                      </small>

                    </div>

                    <h6 className="fw-bold mt-2 mb-0">
                      {selectedStudent.studentName ||
                        "-"}
                    </h6>

                  </div>

                </div>

                <div className="col-xl-3 col-md-6">

                  <div
                    className="p-3 rounded-3 h-100"
                    style={{
                      backgroundColor:
                        "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  >

                    <div className="d-flex align-items-center gap-2">

                      <LuGraduationCap
                        className="text-primary"
                        size={20}
                      />

                      <small className="text-muted">
                        Class
                      </small>

                    </div>

                    <h6 className="fw-bold mt-2 mb-0">
                      {selectedStudent.studentClass ||
                        "-"}
                      {selectedStudent.section
                        ? ` (${selectedStudent.section})`
                        : ""}
                    </h6>

                  </div>

                </div>

                <div className="col-xl-3 col-md-6">

                  <div
                    className="p-3 rounded-3 h-100"
                    style={{
                      backgroundColor:
                        "#f0fdf4",
                      border:
                        "1px solid #dcfce7",
                    }}
                  >

                    <div className="d-flex align-items-center gap-2">

                      <LuCircleCheck
                        className="text-success"
                        size={20}
                      />

                      <small className="text-muted">
                        Total Paid
                      </small>

                    </div>

                    <h6 className="fw-bold text-success mt-2 mb-0">
                      ₹ {formatMoney(
                        summary.totalPaidAmount
                      )}
                    </h6>

                  </div>

                </div>

                <div className="col-xl-3 col-md-6">

                  <div
                    className="p-3 rounded-3 h-100"
                    style={{
                      backgroundColor:
                        "#fef2f2",
                      border:
                        "1px solid #fee2e2",
                    }}
                  >

                    <div className="d-flex align-items-center gap-2">

                      <LuCircleAlert
                        className="text-danger"
                        size={20}
                      />

                      <small className="text-muted">
                        Total Due
                      </small>

                    </div>

                    <h6 className="fw-bold text-danger mt-2 mb-0">
                      ₹ {formatMoney(
                        summary.totalDueAmount
                      )}
                    </h6>

                  </div>

                </div>

              </div>

              {/* FEE TABLE */}

              <div className="table-responsive">

                <table className="table align-middle mb-0">

                  <thead
                    className="small text-center"
                    style={{
                      backgroundColor:
                        "#eff6ff",
                      color: "#1e3a8a",
                    }}
                  >

                    <tr>
                      <th>#</th>
                      <th>Fee Code</th>
                      <th>Fee Name</th>
                      <th>Category</th>
                      <th>Batch</th>
                      <th>Amount</th>
                      <th>Paid</th>
                      <th>Due</th>
                      <th>Status</th>
                      <th>Assigned Date</th>
                    </tr>

                  </thead>

                  <tbody className="text-center small">

                    {loading ? (

                      <tr>
                        <td
                          colSpan="10"
                          className="text-center py-5"
                        >

                          <div className="spinner-border text-primary" />

                          <div className="mt-2 text-muted">
                            Loading fee details...
                          </div>

                        </td>
                      </tr>

                    ) : studentFees.length === 0 ? (

                      <tr>
                        <td
                          colSpan="10"
                          className="text-center py-5"
                        >

                          <div
                            className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                            style={{
                              width: "60px",
                              height: "60px",
                              backgroundColor:
                                "#fef2f2",
                              color: "#dc2626",
                            }}
                          >
                            <LuWalletCards size={28} />
                          </div>

                          <h6 className="text-danger fw-bold">
                            No Fee Assigned
                          </h6>

                          <small className="text-muted">
                            No fee details found for
                            this student.
                          </small>

                        </td>
                      </tr>

                    ) : (

                      studentFees.map(
                        (fee, index) => {

                          const amount =
                            Number(
                              fee.amount || 0
                            );

                          const paid =
                            Number(
                              fee.paidAmount || 0
                            );

                          const due =
                            Number(
                              fee.dueAmount || 0
                            );

                          return (
                            <tr
                              key={
                                fee.id ||
                                fee.feeCode ||
                                index
                              }
                            >

                              <td className="fw-semibold">
                                {index + 1}
                              </td>

                              <td>

                                <span className="fw-bold text-primary">
                                  {fee.feeCode ||
                                    "-"}
                                </span>

                              </td>

                              <td className="fw-semibold">
                                {fee.feeName ||
                                  "-"}
                              </td>

                              <td>
                                {fee.feeCategory ||
                                  "-"}
                              </td>

                              <td>
                                {fee.feeBatch ||
                                  "-"}
                              </td>

                              <td className="fw-semibold">
                                ₹ {formatMoney(
                                  amount
                                )}
                              </td>

                              <td className="text-success fw-bold">
                                ₹ {formatMoney(
                                  paid
                                )}
                              </td>

                              <td className="text-danger fw-bold">
                                ₹ {formatMoney(
                                  due
                                )}
                              </td>

                              <td>

                                <span
                                  className="badge rounded-pill px-3 py-2"
                                  style={
                                    fee.status ===
                                    "PAID"
                                      ? {
                                          backgroundColor:
                                            "#dcfce7",
                                          color:
                                            "#166534",
                                          border:
                                            "1px solid #bbf7d0",
                                        }
                                      : fee.status ===
                                        "PARTIAL"
                                      ? {
                                          backgroundColor:
                                            "#fef3c7",
                                          color:
                                            "#92400e",
                                          border:
                                            "1px solid #fde68a",
                                        }
                                      : {
                                          backgroundColor:
                                            "#fee2e2",
                                          color:
                                            "#b91c1c",
                                          border:
                                            "1px solid #fecaca",
                                        }
                                  }
                                >
                                  {fee.status ||
                                    "UNPAID"}
                                </span>

                              </td>

                              <td>

                                <span className="text-muted">

                                  <LuCalendarDays
                                    size={14}
                                    className="me-1"
                                  />

                                  {fee.assignDate ||
                                    "-"}

                                </span>

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

          </div>

        </div>
      )}

      {/* =====================================================
          REPORT SUMMARY
      ====================================================== */}

      {selectedStudent && studentFees.length > 0 && (

        <div className="px-0">

          <div className="card shadow border-0 rounded-4 mb-5">

            <div className="card-body p-4">

              <div className="d-flex align-items-center mb-4">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3 me-3"
                  style={{
                    width: "45px",
                    height: "45px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                  }}
                >
                  <FaMoneyBillWave size={22} />
                </div>

                <div>

                  <h6 className="mb-1 fw-bold">
                    Fee Assignment Summary
                  </h6>

                  <small className="text-muted">
                    Current student's assigned fee summary
                  </small>

                </div>

              </div>

              <hr />

              <div className="row text-center">

                <div className="col-md-3 border-end">

                  <small className="text-muted">
                    Total Assigned
                  </small>

                  <h4 className="text-primary fw-bold mt-1">
                    ₹{" "}
                    {summary.totalAssignedAmount.toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </h4>

                </div>

                <div className="col-md-3 border-end">

                  <small className="text-muted">
                    Total Paid
                  </small>

                  <h4 className="text-success fw-bold mt-1">
                    ₹{" "}
                    {summary.totalPaidAmount.toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </h4>

                </div>

                <div className="col-md-3 border-end">

                  <small className="text-muted">
                    Total Due
                  </small>

                  <h4 className="text-danger fw-bold mt-1">
                    ₹{" "}
                    {summary.totalDueAmount.toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </h4>

                </div>

                <div className="col-md-3">

                  <small className="text-muted">
                    Fee Records
                  </small>

                  <h4 className="text-primary fw-bold mt-1">
                    {studentFees.length}
                  </h4>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          RESPONSIVE STYLE
      ====================================================== */}

      <style>
        {`
          .premium-stat-card {
            border-radius: 16px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            background: #ffffff;
            min-height: 125px;
          }

          .premium-stat-card .stat-icon {
            width: 52px;
            height: 52px;
            min-width: 52px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
          }

          .premium-stat-card .stat-content {
            min-width: 0;
          }

          .premium-stat-card .stat-content span {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: #64748b;
            margin-bottom: 4px;
          }

          .premium-stat-card .stat-content h3 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            color: #0f172a;
          }

          .premium-stat-card .stat-content small {
            display: block;
            color: #94a3b8;
            margin-top: 3px;
            font-size: 12px;
          }

          .stat-blue {
            border-left: 4px solid #2563eb;
          }

          .stat-blue .stat-icon {
            background: #eff6ff;
            color: #2563eb;
          }

          .stat-green {
            border-left: 4px solid #16a34a;
          }

          .stat-green .stat-icon {
            background: #f0fdf4;
            color: #16a34a;
          }

          .stat-orange {
            border-left: 4px solid #f59e0b;
          }

          .stat-orange .stat-icon {
            background: #fffbeb;
            color: #d97706;
          }

          .stat-red {
            border-left: 4px solid #dc2626;
          }

          .stat-red .stat-icon {
            background: #fef2f2;
            color: #dc2626;
          }

          .table > :not(caption) > * > * {
            padding: 12px 10px;
            white-space: nowrap;
          }

          .table tbody tr {
            transition: background-color 0.15s ease;
          }

          .table tbody tr:hover {
            background-color: #f8fbff;
          }

          .form-control,
          .form-select {
            min-height: 40px;
            border-color: #dbe2ea;
          }

          .form-control:focus,
          .form-select:focus {
            border-color: #86b7fe;
            box-shadow: 0 0 0 0.2rem rgba(13,110,253,.12);
          }

          @media (max-width: 767px) {
            .premium-stat-card {
              min-height: 110px;
              padding: 16px;
            }

            .premium-stat-card .stat-content h3 {
              font-size: 21px;
            }

            .premium-stat-card .stat-icon {
              width: 46px;
              height: 46px;
              min-width: 46px;
              font-size: 21px;
            }
          }

          @media print {

            body {
              background: white !important;
            }

            .card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }

            button,
            .btn {
              display: none !important;
            }

            .shadow {
              box-shadow: none !important;
            }

            .premium-stat-card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }

            @page {
              size: landscape;
              margin: 8mm;
            }
          }
        `}
      </style>

    </div>
  );
};

export default StudentFeeAssignment;