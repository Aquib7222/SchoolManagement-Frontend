
import React, { useEffect, useMemo, useState } from "react";
import {
  LuSearch,
  LuPrinter,
  LuEye,
  LuPlus,
  LuCalendarDays,
  LuUsers,
  LuFileText,
  LuClock3,
  LuCircleCheck,
  LuCircleX,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { MdOutlineSchool } from "react-icons/md";
import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

const ITEMS_PER_PAGE = 5;

const StudentLeaveLetter = () => {
  const { standards, sections, sessions } = useMasters();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [showLetter, setShowLetter] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [leaveForm, setLeaveForm] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  /* =========================================================
     FETCH STUDENTS
  ========================================================= */

  useEffect(() => {
    if (!user?.schoolId || !token) return;

    setLoading(true);

    axios
      .get(`/api/students/school?schoolId=${user.schoolId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStudents(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);

        /*
         * If your API is:
         * /api/admissions/school
         * then simply replace the URL above.
         */
      })
      .finally(() => setLoading(false));
  }, [user?.schoolId, token]);

  /* =========================================================
     HELPERS
  ========================================================= */

  const getName = (student) =>
    `${student?.firstName || ""} ${
      student?.middleName || ""
    } ${student?.lastName || ""}`
      .replace(/\s+/g, " ")
      .trim();

  const getClass = (student) =>
    student?.studentClass ||
    student?.className ||
    student?.class ||
    "";

  const getSection = (student) =>
    student?.section || "";

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredStudents = useMemo(() => {
    let data = [...students];

    if (selectedClass) {
      data = data.filter(
        (student) => getClass(student) === selectedClass
      );
    }

    if (selectedSection) {
      data = data.filter(
        (student) =>
          getSection(student) === selectedSection
      );
    }

    if (selectedSession) {
      data = data.filter(
        (student) =>
          student?.academicYear === selectedSession ||
          student?.session === selectedSession
      );
    }

    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter((student) => {
        const name = getName(student).toLowerCase();

        const admissionNumber = (
          student?.admissionNumber || ""
        ).toLowerCase();

        return (
          name.includes(keyword) ||
          admissionNumber.includes(keyword)
        );
      });
    }

    return data;
  }, [
    students,
    selectedClass,
    selectedSection,
    selectedSession,
    search,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length / ITEMS_PER_PAGE
    )
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* =========================================================
     OPEN LETTER
  ========================================================= */

  const handleViewLetter = (student) => {
    setSelectedStudent(student);

    setLeaveForm({
      fromDate: "",
      toDate: "",
      reason: "",
    });

    setShowLetter(true);
  };

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) return date;

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =========================================================
     TOTAL DAYS
  ========================================================= */

  const totalLeaveDays = useMemo(() => {
    if (!leaveForm.fromDate || !leaveForm.toDate) {
      return 0;
    }

    const from = new Date(leaveForm.fromDate);
    const to = new Date(leaveForm.toDate);

    if (to < from) return 0;

    const difference =
      to.getTime() - from.getTime();

    return (
      Math.floor(
        difference / (1000 * 60 * 60 * 24)
      ) + 1
    );
  }, [
    leaveForm.fromDate,
    leaveForm.toDate,
  ]);

  /* =========================================================
     PRINT
  ========================================================= */

  const handlePrint = () => {
    window.print();
  };

  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalStudents = filteredStudents.length;

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
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "52px",
                    height: "52px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                    flexShrink: 0,
                  }}
                >
                  <LuFileText size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Student Leave Letter
                  </h5>

                  <div className="text-muted small">
                    Student Management
                    &nbsp;/&nbsp;
                    Leave Letter
                  </div>
                </div>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                }}
              >
                <MdOutlineSchool className="me-1" />
                Student Leave Management
              </span>
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
              Home &nbsp;›&nbsp;
              Student Management &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Leave Letter
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="mx-2 mb-4">
        <div
          className="bg-white rounded-4 shadow p-3 p-md-4"
          style={{
            border: "1px solid #edf2f7",
          }}
        >

          {/* TITLE */}

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

            <div>
              <h5
                className="mb-1 fw-bold"
                style={{
                  color: "#1e3a8a",
                }}
              >
                Student Leave Letters
              </h5>

              <small className="text-muted">
                Select a student to prepare and print
                an official leave letter
              </small>
            </div>

            <div
              className="d-flex align-items-center gap-2 px-3 py-2 rounded-3"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <LuUsers
                size={18}
                style={{
                  color: "#2563eb",
                }}
              />

              <span
                className="fw-semibold"
                style={{
                  color: "#334155",
                }}
              >
                {totalStudents} Students
              </span>
            </div>
          </div>

          {/* =================================================
              FILTER
          ================================================= */}

          <div
            className="rounded-4 p-3 p-md-4 mb-4"
            style={{
              background:
                "linear-gradient(135deg,#f8fbff,#f3f7fc)",
              border: "1px solid #e2e8f0",
            }}
          >

            <div className="d-flex align-items-center gap-2 mb-3">

              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "36px",
                  height: "36px",
                  background: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #dbeafe",
                }}
              >
                <LuSearch size={18} />
              </div>

              <div>
                <h6 className="mb-0 fw-bold text-dark">
                  Search & Filter
                </h6>

                <small className="text-muted">
                  Filter students by class,
                  section and session
                </small>
              </div>
            </div>

            <div className="row g-3">

              {/* SEARCH */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Student Search
                </label>

                <div className="position-relative">

                  <LuSearch
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
                    type="search"
                    className="form-control"
                    placeholder="Name / Admission No"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    style={{
                      paddingLeft: "38px",
                      borderRadius: "9px",
                    }}
                  />
                </div>
              </div>

              {/* CLASS */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Class
                </label>

                <select
                  className="form-select"
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                  }}
                >
                  <option value="">
                    All Classes
                  </option>

                  {standards?.map((item) => (
                    <option
                      key={
                        item?.id ||
                        item?.value ||
                        item
                      }
                      value={
                        item?.name ||
                        item?.value ||
                        item
                      }
                    >
                      {item?.name ||
                        item?.label ||
                        item?.value ||
                        item}
                    </option>
                  ))}
                </select>
              </div>

              {/* SECTION */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Section
                </label>

                <select
                  className="form-select"
                  value={selectedSection}
                  onChange={(e) => {
                    setSelectedSection(
                      e.target.value
                    );
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                  }}
                >
                  <option value="">
                    All Sections
                  </option>

                  {sections?.map((item) => (
                    <option
                      key={
                        item?.id ||
                        item?.value ||
                        item
                      }
                      value={
                        item?.name ||
                        item?.value ||
                        item
                      }
                    >
                      {item?.name ||
                        item?.label ||
                        item?.value ||
                        item}
                    </option>
                  ))}
                </select>
              </div>

              {/* SESSION */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Academic Year
                </label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) => {
                    setSelectedSession(
                      e.target.value
                    );
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                  }}
                >
                  <option value="">
                    All Sessions
                  </option>

                  {sessions?.map((item) => (
                    <option
                      key={
                        item?.id ||
                        item?.value ||
                        item
                      }
                      value={
                        item?.name ||
                        item?.value ||
                        item
                      }
                    >
                      {item?.name ||
                        item?.label ||
                        item?.value ||
                        item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <div className="d-flex justify-content-between align-items-center mb-3">

            <div>
              <h6
                className="fw-bold mb-1"
                style={{
                  color: "#1e293b",
                }}
              >
                Student List
              </h6>

              <small className="text-muted">
                Showing{" "}
                <strong>
                  {filteredStudents.length}
                </strong>{" "}
                student
                {filteredStudents.length !== 1
                  ? "s"
                  : ""}
              </small>
            </div>

            <span
              className="badge rounded-pill px-3 py-2"
              style={{
                background: "#eff6ff",
                color: "#2563eb",
                border:
                  "1px solid #bfdbfe",
              }}
            >
              {filteredStudents.length} Records
            </span>
          </div>

          {/* =================================================
              PREMIUM TABLE
          ================================================= */}

          <div
            className="table-responsive rounded-4"
            style={{
              border: "1px solid #dbe3ef",
              overflow: "hidden",
            }}
          >
            <table
              className="table align-middle mb-0"
              style={{
                minWidth: "900px",
              }}
            >

              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(135deg,#172554,#1e3a8a,#2563eb)",
                  }}
                >
                  <th
                    className="px-3 py-3 text-white"
                    style={{
                      fontSize: "12px",
                      letterSpacing: ".4px",
                    }}
                  >
                    #
                  </th>

                  <th
                    className="py-3 text-white"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    ADMISSION NO
                  </th>

                  <th
                    className="py-3 text-white"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    STUDENT
                  </th>

                  <th
                    className="py-3 text-white"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    CLASS
                  </th>

                  <th
                    className="py-3 text-white"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    SECTION
                  </th>

                  <th
                    className="py-3 text-white"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    SESSION
                  </th>

                  <th
                    className="py-3 text-center text-white"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-5"
                    >
                      <div
                        className="spinner-border"
                        style={{
                          color: "#2563eb",
                        }}
                      />

                      <div className="text-muted mt-2">
                        Loading students...
                      </div>
                    </td>
                  </tr>
                ) : paginatedStudents.length > 0 ? (

                  paginatedStudents.map(
                    (student, index) => (
                      <tr
                        key={
                          student.id ||
                          student.admissionNumber
                        }
                        style={{
                          borderBottom:
                            "1px solid #eef2f7",
                        }}
                      >

                        <td className="px-3">
                          <span
                            className="d-inline-flex align-items-center justify-content-center rounded-3"
                            style={{
                              width: "30px",
                              height: "30px",
                              background:
                                "#f1f5f9",
                              color: "#64748b",
                              fontSize: "12px",
                              fontWeight: "700",
                            }}
                          >
                            {(currentPage - 1) *
                              ITEMS_PER_PAGE +
                              index +
                              1}
                          </span>
                        </td>

                        <td>
                          <span
                            className="fw-bold"
                            style={{
                              color: "#2563eb",
                            }}
                          >
                            {student.admissionNumber ||
                              "-"}
                          </span>
                        </td>

                        <td>
                          <div className="d-flex align-items-center gap-2">

                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle"
                              style={{
                                width: "38px",
                                height: "38px",
                                background:
                                  "linear-gradient(135deg,#dbeafe,#eff6ff)",
                                color: "#2563eb",
                                fontWeight: "700",
                              }}
                            >
                              {getName(student)
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "S"}
                            </div>

                            <div>
                              <div className="fw-semibold text-dark">
                                {getName(student) ||
                                  "-"}
                              </div>

                              <small className="text-muted">
                                Student
                              </small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className="badge rounded-pill px-3 py-2"
                            style={{
                              background:
                                "#f8fafc",
                              color: "#334155",
                              border:
                                "1px solid #e2e8f0",
                            }}
                          >
                            {getClass(student) ||
                              "-"}
                          </span>
                        </td>

                        <td>
                          <span
                            className="badge rounded-pill px-3 py-2"
                            style={{
                              background:
                                "#f0fdf4",
                              color: "#15803d",
                              border:
                                "1px solid #bbf7d0",
                            }}
                          >
                            {getSection(student) ||
                              "-"}
                          </span>
                        </td>

                        <td>
                          <span className="text-muted small fw-semibold">
                            {student?.academicYear ||
                              student?.session ||
                              "-"}
                          </span>
                        </td>

                        <td className="text-center">

                          <button
                            type="button"
                            className="btn btn-sm me-2"
                            onClick={() =>
                              handleViewLetter(
                                student
                              )
                            }
                            style={{
                              background:
                                "linear-gradient(135deg,#2563eb,#3b82f6)",
                              color: "#fff",
                              border: "none",
                              borderRadius: "8px",
                              padding:
                                "7px 12px",
                              boxShadow:
                                "0 4px 12px rgba(37,99,235,.18)",
                            }}
                          >
                            <LuEye
                              size={15}
                              className="me-1"
                            />
                            View
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm"
                            onClick={() =>
                              handleViewLetter(
                                student
                              )
                            }
                            style={{
                              background:
                                "#f8fafc",
                              color: "#475569",
                              border:
                                "1px solid #dbe3ef",
                              borderRadius: "8px",
                              padding:
                                "7px 12px",
                            }}
                          >
                            <LuPlus
                              size={15}
                              className="me-1"
                            />
                            Prepare
                          </button>

                        </td>
                      </tr>
                    )
                  )

                ) : (

                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-5"
                    >
                      <div
                        className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                        style={{
                          width: "58px",
                          height: "58px",
                          background:
                            "#f1f5f9",
                          color: "#94a3b8",
                        }}
                      >
                        <LuUsers size={26} />
                      </div>

                      <h6 className="text-muted">
                        No students found
                      </h6>

                      <small className="text-secondary">
                        Try changing your filters.
                      </small>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-2">

            <small className="text-muted">
              Page{" "}
              <strong>{currentPage}</strong>{" "}
              of{" "}
              <strong>{totalPages}</strong>
            </small>

            <div className="d-flex gap-2">

              <button
                type="button"
                className="btn btn-sm"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    (p) => p - 1
                  )
                }
                style={{
                  border:
                    "1px solid #dbe3ef",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              >
                <LuChevronLeft size={16} />
                Previous
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className="btn btn-sm"
                  style={
                    currentPage === page
                      ? {
                          background:
                            "linear-gradient(135deg,#2563eb,#3b82f6)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          minWidth: "34px",
                        }
                      : {
                          background: "#fff",
                          color: "#475569",
                          border:
                            "1px solid #dbe3ef",
                          borderRadius: "8px",
                          minWidth: "34px",
                        }
                  }
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className="btn btn-sm"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (p) => p + 1
                  )
                }
                style={{
                  border:
                    "1px solid #dbe3ef",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              >
                Next
                <LuChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          LETTER MODAL
      ===================================================== */}

      {showLetter && selectedStudent && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            background:
              "rgba(15,23,42,.65)",
            zIndex: 1055,
          }}
        >
          <div
            className="modal-dialog modal-xl modal-dialog-scrollable"
          >
            <div className="modal-content border-0 rounded-4 overflow-hidden">

              {/* MODAL HEADER */}

              <div
                className="modal-header text-white"
                style={{
                  background:
                    "linear-gradient(135deg,#172554,#2563eb)",
                }}
              >
                <div>
                  <h5 className="modal-title fw-bold">
                    Prepare Leave Letter
                  </h5>

                  <small
                    style={{
                      opacity: 0.8,
                    }}
                  >
                    {getName(
                      selectedStudent
                    )}
                  </small>
                </div>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() =>
                    setShowLetter(false)
                  }
                />
              </div>

              {/* FORM */}

              <div className="modal-body p-4">

                <div className="row g-3 mb-4">

                  <div className="col-md-4">

                    <label className="form-label fw-semibold">
                      Leave From
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      value={
                        leaveForm.fromDate
                      }
                      onChange={(e) =>
                        setLeaveForm({
                          ...leaveForm,
                          fromDate:
                            e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-4">

                    <label className="form-label fw-semibold">
                      Leave To
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      value={
                        leaveForm.toDate
                      }
                      onChange={(e) =>
                        setLeaveForm({
                          ...leaveForm,
                          toDate:
                            e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-4">

                    <label className="form-label fw-semibold">
                      Total Days
                    </label>

                    <div
                      className="form-control bg-light fw-bold"
                    >
                      {totalLeaveDays || 0} Day
                      {totalLeaveDays !== 1
                        ? "s"
                        : ""}
                    </div>
                  </div>

                  <div className="col-12">

                    <label className="form-label fw-semibold">
                      Leave Reason
                    </label>

                    <textarea
                      rows="3"
                      className="form-control"
                      placeholder="Enter reason for leave..."
                      value={
                        leaveForm.reason
                      }
                      onChange={(e) =>
                        setLeaveForm({
                          ...leaveForm,
                          reason:
                            e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* =================================================
                    LETTER PREVIEW
                ================================================= */}

                <div
                  className="border rounded-3 p-4"
                  style={{
                    background: "#f8fafc",
                  }}
                >

                  <div
                    id="leave-letter"
                    className="bg-white mx-auto p-5"
                    style={{
                      maxWidth: "794px",
                      minHeight: "1050px",
                      boxShadow:
                        "0 8px 30px rgba(15,23,42,.10)",
                    }}
                  >

                    {/* SCHOOL HEADER */}

                    <div className="text-center">

                      <div
                        className="d-flex align-items-center justify-content-center mx-auto mb-2 rounded-circle"
                        style={{
                          width: "62px",
                          height: "62px",
                          background:
                            "#eff6ff",
                          color: "#2563eb",
                        }}
                      >
                        <MdOutlineSchool
                          size={35}
                        />
                      </div>

                      <h3
                        className="fw-bold mb-1"
                        style={{
                          color: "#172554",
                        }}
                      >
                        {user?.schoolName ||
                          "YOUR SCHOOL NAME"}
                      </h3>

                      <p className="text-muted mb-1">
                        {user?.schoolAddress ||
                          "School Address"}
                      </p>

                      <div
                        style={{
                          height: "2px",
                          background:
                            "#2563eb",
                          margin:
                            "15px 0 25px",
                        }}
                      />
                    </div>

                    <div className="text-end mb-4">
                      Date:{" "}
                      <strong>
                        {formatDate(
                          new Date()
                        )}
                      </strong>
                    </div>

                    <h4
                      className="text-center fw-bold mb-5"
                      style={{
                        textDecoration:
                          "underline",
                        color: "#172554",
                      }}
                    >
                      LEAVE LETTER
                    </h4>

                    <p
                      style={{
                        lineHeight: "1.9",
                        fontSize: "16px",
                      }}
                    >
                      To,
                      <br />
                      The Principal
                      <br />
                      <strong>
                        {user?.schoolName ||
                          "The School"}
                      </strong>
                    </p>

                    <p
                      style={{
                        lineHeight: "1.9",
                        fontSize: "16px",
                      }}
                    >
                      Subject:{" "}
                      <strong>
                        Leave Application
                      </strong>
                    </p>

                    <p
                      style={{
                        lineHeight: "1.9",
                        fontSize: "16px",
                      }}
                    >
                      Respected Sir/Madam,
                    </p>

                    <p
                      style={{
                        lineHeight: "1.9",
                        fontSize: "16px",
                        textAlign: "justify",
                      }}
                    >
                      I hereby request leave for
                      my ward{" "}
                      <strong>
                        {getName(
                          selectedStudent
                        ) || "________________"}
                      </strong>
                      , studying in Class{" "}
                      <strong>
                        {getClass(
                          selectedStudent
                        ) || "________"}
                      </strong>
                      , Section{" "}
                      <strong>
                        {getSection(
                          selectedStudent
                        ) || "________"}
                      </strong>
                      , Admission No.{" "}
                      <strong>
                        {selectedStudent
                          ?.admissionNumber ||
                          "________"}
                      </strong>
                      .
                    </p>

                    <p
                      style={{
                        lineHeight: "1.9",
                        fontSize: "16px",
                        textAlign: "justify",
                      }}
                    >
                      The student requires leave
                      from{" "}
                      <strong>
                        {formatDate(
                          leaveForm.fromDate
                        )}
                      </strong>{" "}
                      to{" "}
                      <strong>
                        {formatDate(
                          leaveForm.toDate
                        )}
                      </strong>
                      , for a total of{" "}
                      <strong>
                        {totalLeaveDays || "____"}
                      </strong>{" "}
                      day(s).
                    </p>

                    <p
                      style={{
                        lineHeight: "1.9",
                        fontSize: "16px",
                        textAlign: "justify",
                      }}
                    >
                      Reason for leave:{" "}
                      <strong>
                        {leaveForm.reason ||
                          "____________________________________________"}
                      </strong>
                    </p>

                    <p
                      style={{
                        lineHeight: "1.9",
                        fontSize: "16px",
                        textAlign: "justify",
                      }}
                    >
                      I kindly request you to grant
                      the above-mentioned leave.
                      I shall be grateful for your
                      consideration.
                    </p>

                    <p
                      className="mt-5"
                      style={{
                        lineHeight: "1.8",
                        fontSize: "16px",
                      }}
                    >
                      Thank you.
                      <br />
                      Yours faithfully,
                    </p>

                    <div className="row mt-5 pt-4">

                      <div className="col-4 text-center">
                        <div
                          style={{
                            borderTop:
                              "1px solid #334155",
                            paddingTop: "8px",
                          }}
                        >
                          Parent / Guardian
                        </div>
                      </div>

                      <div className="col-4 text-center">
                        <div
                          style={{
                            borderTop:
                              "1px solid #334155",
                            paddingTop: "8px",
                          }}
                        >
                          Class Teacher
                        </div>
                      </div>

                      <div className="col-4 text-center">
                        <div
                          style={{
                            borderTop:
                              "1px solid #334155",
                            paddingTop: "8px",
                          }}
                        >
                          Principal
                        </div>
                      </div>

                    </div>

                    <div
                      className="text-center text-muted mt-5 pt-4"
                      style={{
                        borderTop:
                          "1px solid #e2e8f0",
                        fontSize: "11px",
                      }}
                    >
                      This is an official student
                      leave letter generated by the
                      school management system.
                    </div>

                  </div>
                </div>
              </div>

              {/* MODAL FOOTER */}

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() =>
                    setShowLetter(false)
                  }
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn text-white d-flex align-items-center gap-2"
                  onClick={handlePrint}
                  style={{
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    border: "none",
                    borderRadius: "9px",
                  }}
                >
                  <LuPrinter size={17} />
                  Print Leave Letter
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          PRINT CSS
      ===================================================== */}

      <style>
        {`
          @media print {

            body * {
              visibility: hidden !important;
            }

            #leave-letter,
            #leave-letter * {
              visibility: visible !important;
            }

            #leave-letter {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 210mm !important;
              min-height: 297mm !important;
              margin: 0 !important;
              box-shadow: none !important;
            }

            @page {
              size: A4;
              margin: 0;
            }
          }

          .table tbody tr:hover {
            background-color: #f8fbff !important;
          }

          .form-control:focus,
          .form-select:focus {
            border-color: #93c5fd !important;
            box-shadow: 0 0 0 .2rem rgba(37,99,235,.10) !important;
          }
        `}
      </style>
    </>
  );
};

export default StudentLeaveLetter;

