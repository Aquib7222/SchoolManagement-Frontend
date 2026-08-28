
import React, { useState } from "react";
import useMasters from "../../../hooks/useMasters";
import axiosInstance from "../../../api/axiosInstance";

const MonthlyAttendanceReport = () => {
  const {
    loading: masterLoading,
    sessions,
    standards,
    sections,
    month,
  } = useMasters();

  const token = localStorage.getItem("token");

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState(false);
  const [students, setStudents] = useState([]);

  const year = Number(selectedSession?.split("-")[0]);

  const monthMap = {
    JANUARY: 1,
    FEBRUARY: 2,
    MARCH: 3,
    APRIL: 4,
    MAY: 5,
    JUNE: 6,
    JULY: 7,
    AUGUST: 8,
    SEPTEMBER: 9,
    OCTOBER: 10,
    NOVEMBER: 11,
    DECEMBER: 12,
  };

  const monthNumber = monthMap[selectedMonth];

  const getDaysInMonth = (year, monthNumber) => {
    if (!year || !monthNumber) return 0;
    return new Date(year, monthNumber, 0).getDate();
  };

  const getSundays = (year, monthNumber) => {
    if (!year || !monthNumber) return [];

    const sundays = [];
    const totalDays = getDaysInMonth(year, monthNumber);

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, monthNumber - 1, day);

      if (date.getDay() === 0) {
        sundays.push(day);
      }
    }

    return sundays;
  };

  const totalDays =
    year && monthNumber ? getDaysInMonth(year, monthNumber) : 0;

  const sundays =
    year && monthNumber ? getSundays(year, monthNumber) : [];

  const workingDays =
    totalDays > 0 ? totalDays - sundays.length : 0;

  const handleSearch = async () => {
    if (
      !selectedSession ||
      !selectedStandard ||
      !selectedSection ||
      !selectedMonth
    ) {
      alert("Please select Session, Standard, Section and Month");
      return;
    }

    try {
      setSearchLoading(true);

      const attendanceRes = await axiosInstance.get(
        "/api/student/attendance/monthly",
        {
          params: {
            academicYear: selectedSession,
            studentClass: selectedStandard,
            section: selectedSection,
            month: selectedMonth,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(attendanceRes.data || []);
      setInput(true);
      setSearch("");
    } catch (error) {
      console.error(error);
      alert("Student attendance not found");
      setStudents([]);
      setInput(false);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedSession("");
    setSelectedStandard("");
    setSelectedSection("");
    setSelectedMonth("");
    setSearch("");
    setStudents([]);
    setInput(false);
  };

  const filterStudents = students.filter((student) => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return true;

    return (
      student.studentName?.toLowerCase().includes(keyword) ||
      student.admissionNumber?.toLowerCase().includes(keyword)
    );
  });

  const totalPresent = students.reduce(
    (sum, student) => sum + Number(student.present || 0),
    0
  );

  const totalWorkingDays = students.length * workingDays;

  const percentage =
    totalWorkingDays > 0
      ? ((totalPresent / totalWorkingDays) * 100).toFixed(2)
      : "0.00";

  const averagePercentage = Number(percentage);

  return (
    <>
      {/* ================= HEADER ================= */}
      <div
        className="mx-2 mt-2 px-3 py-2 bg-white shadow rounded-3"
        style={{
          borderLeft: "4px solid #0d6efd",
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h5 className="mb-1 fw-bold text-dark">
              Monthly Attendance Report
            </h5>

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

                <li className="breadcrumb-item active">
                  Monthly Attendance Report
                </li>
              </ol>
            </nav>
          </div>

          {input && (
            <div className="text-end">
              <small className="text-muted d-block">
                Attendance Month
              </small>
              <strong className="text-success">
                {selectedMonth} {year}
              </strong>
            </div>
          )}
        </div>
      </div>

      {/* ================= SEARCH CARD ================= */}
      <div className="mx-2 mt-3">
        <div className="card border-0 shadow rounded-3">
          <div className="card-header bg-white border-bottom py-3">
            <div className="d-flex align-items-center gap-2">
              <div
                className="d-flex align-items-center justify-content-center rounded-2 bg-success bg-opacity-10 text-success"
                style={{
                  width: "38px",
                  height: "38px",
                }}
              >
                <i className="bi bi-calendar3 fs-5"></i>
              </div>

              <div>
                <h6 className="mb-0 fw-bold">
                  Search Attendance
                </h6>

                <small className="text-muted">
                  Select class and month to view attendance
                </small>
              </div>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="row g-3">
              {/* SESSION */}
              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label fw-semibold small">
                  Session
                </label>

                <select
                  className="form-select shadow-none"
                  value={selectedSession}
                  onChange={(e) =>
                    setSelectedSession(e.target.value)
                  }
                  disabled={masterLoading}
                >
                  <option value="">Select Session</option>

                  {sessions?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* STANDARD */}
              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label fw-semibold small">
                  Standard
                </label>

                <select
                  className="form-select shadow-none"
                  value={selectedStandard}
                  onChange={(e) =>
                    setSelectedStandard(e.target.value)
                  }
                  disabled={masterLoading}
                >
                  <option value="">Select Standard</option>

                  {standards?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* SECTION */}
              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label fw-semibold small">
                  Section
                </label>

                <select
                  className="form-select shadow-none"
                  value={selectedSection}
                  onChange={(e) =>
                    setSelectedSection(e.target.value)
                  }
                  disabled={masterLoading}
                >
                  <option value="">Select Section</option>

                  {sections?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* MONTH */}
              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label fw-semibold small">
                  Month
                </label>

                <select
                  className="form-select shadow-none"
                  value={selectedMonth}
                  onChange={(e) =>
                    setSelectedMonth(e.target.value)
                  }
                  disabled={masterLoading}
                >
                  <option value="">Select Month</option>

                  {month?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="d-flex justify-content-end gap-2 mt-4 flex-wrap">
              <button
                type="button"
                className="btn btn-light border px-4"
                onClick={handleReset}
              >
                Reset
              </button>

              <button
                type="button"
                className="btn btn-success px-4"
                onClick={handleSearch}
                disabled={searchLoading}
              >
                {searchLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Searching...
                  </>
                ) : (
                  <>
                    <i className="bi bi-search me-2"></i>
                    Search Attendance
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RESULT SECTION ================= */}
      {input && (
        <>
          {/* ================= SUMMARY CARDS ================= */}
          <div className="mx-2 mt-3">
            <div className="row g-3">
              {/* TOTAL STUDENTS */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-0 shadow rounded-3 h-100">
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">
                          Total Students
                        </small>

                        <h4 className="fw-bold mb-0 mt-1">
                          {students.length}
                        </h4>
                      </div>

                      <div
                        className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                        }}
                      >
                        <i className="bi bi-people fs-4"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WORKING DAYS */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-0 shadow rounded-3 h-100">
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">
                          Working Days
                        </small>

                        <h4 className="fw-bold mb-0 mt-1">
                          {workingDays}
                        </h4>
                      </div>

                      <div
                        className="rounded-3 bg-warning bg-opacity-10 text-warning d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                        }}
                      >
                        <i className="bi bi-calendar-check fs-4"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TOTAL PRESENT */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-0 shadow rounded-3 h-100">
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">
                          Total Present
                        </small>

                        <h4 className="fw-bold text-success mb-0 mt-1">
                          {totalPresent}
                        </h4>
                      </div>

                      <div
                        className="rounded-3 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                        }}
                      >
                        <i className="bi bi-check-circle fs-4"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AVERAGE */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-0 shadow rounded-3 h-100">
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">
                          Class Average
                        </small>

                        <h4
                          className={`fw-bold mb-0 mt-1 ${
                            averagePercentage < 50
                              ? "text-danger"
                              : "text-success"
                          }`}
                        >
                          {percentage}%
                        </h4>
                      </div>

                      <div
                        className={`rounded-3 ${
                          averagePercentage < 50
                            ? "bg-danger"
                            : "bg-success"
                        } bg-opacity-10 ${
                          averagePercentage < 50
                            ? "text-danger"
                            : "text-success"
                        } d-flex align-items-center justify-content-center`}
                        style={{
                          width: "48px",
                          height: "48px",
                        }}
                      >
                        <i className="bi bi-graph-up-arrow fs-4"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= SEARCH / EXPORT BAR ================= */}
          <div className="mx-2 mt-3">
            <div className="card border-0 shadow rounded-3">
              <div className="card-body p-3">
                <div className="row g-2 align-items-center">
                  <div className="col-12 col-lg-5">
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-search text-muted"></i>
                      </span>

                      <input
                        type="search"
                        className="form-control shadow-none"
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }
                        placeholder="Search by student name or admission number"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-7">
                    <div className="d-flex justify-content-lg-end gap-2 flex-wrap">
                      <button className="btn btn-outline-success">
                        <i className="bi bi-file-earmark-excel me-2"></i>
                        Export Excel
                      </button>

                      <button className="btn btn-outline-danger">
                        <i className="bi bi-file-earmark-pdf me-2"></i>
                        Export PDF
                      </button>

                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => window.print()}
                      >
                        <i className="bi bi-printer me-2"></i>
                        Print
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= ATTENDANCE TABLE ================= */}
          <div className="mx-2 mt-3 mb-4">
            <div className="card border-0 shadow rounded-3">
              <div className="card-header bg-white border-bottom p-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <div>
                    <h6 className="fw-bold mb-1">
                      Attendance Summary
                    </h6>

                    <small className="text-muted">
                      {selectedStandard} - Section {selectedSection}
                      {" • "}
                      {selectedMonth} {year}
                    </small>
                  </div>

                  <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                    {filterStudents.length} Students
                  </span>
                </div>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle mb-0">
                    <thead
                      className="table-primary"
                      style={{
                        verticalAlign: "middle",
                      }}
                    >
                      <tr>
                        <th
                          className="text-center"
                          style={{ minWidth: "70px" }}
                        >
                          S.No
                        </th>

                        <th style={{ minWidth: "200px" }}>
                          Student Name
                        </th>

                        <th style={{ minWidth: "160px" }}>
                          Admission Number
                        </th>

                        <th
                          className="text-center"
                          style={{ minWidth: "120px" }}
                        >
                          Present
                        </th>

                        <th
                          className="text-center"
                          style={{ minWidth: "130px" }}
                        >
                          Working Days
                        </th>

                        <th
                          className="text-center"
                          style={{ minWidth: "130px" }}
                        >
                          Percentage
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filterStudents.length === 0 ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="text-center py-5"
                          >
                            <div className="text-muted">
                              <i className="bi bi-person-x fs-2 d-block mb-2"></i>

                              <strong>
                                No students found
                              </strong>

                              <div className="small mt-1">
                                Try another student name or admission
                                number.
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filterStudents.map((student, index) => {
                          const studentPercentage =
                            workingDays > 0
                              ? (
                                  (Number(student.present || 0) /
                                    workingDays) *
                                  100
                                ).toFixed(2)
                              : "0.00";

                          const isLow =
                            Number(studentPercentage) < 50;

                          return (
                            <tr key={student.studentId}>
                              <td className="text-center fw-semibold">
                                {index + 1}
                              </td>

                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <div
                                    className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center fw-bold"
                                    style={{
                                      width: "36px",
                                      height: "36px",
                                    }}
                                  >
                                    {student.studentName
                                      ?.charAt(0)
                                      ?.toUpperCase()}
                                  </div>

                                  <div>
                                    <div className="fw-semibold">
                                      {student.studentName}
                                    </div>

                                    <small className="text-muted">
                                      Student
                                    </small>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <span className="badge bg-light text-dark border px-3 py-2">
                                  {student.admissionNumber}
                                </span>
                              </td>

                              <td className="text-center">
                                <span className="fw-bold text-success">
                                  {student.present || 0}
                                </span>
                              </td>

                              <td className="text-center">
                                {workingDays}
                              </td>

                              <td className="text-center">
                                <span
                                  className={`badge px-3 py-2 ${
                                    isLow
                                      ? "bg-danger"
                                      : "bg-success"
                                  }`}
                                >
                                  {studentPercentage}%
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FOOTER */}
              {filterStudents.length > 0 && (
                <div className="card-footer bg-white border-top">
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <small className="text-muted">
                      Showing{" "}
                      <strong>{filterStudents.length}</strong>{" "}
                      student(s)
                    </small>

                    <small className="text-muted">
                      Average Attendance:{" "}
                      <strong
                        className={
                          averagePercentage < 50
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {percentage}%
                      </strong>
                    </small>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MonthlyAttendanceReport;

