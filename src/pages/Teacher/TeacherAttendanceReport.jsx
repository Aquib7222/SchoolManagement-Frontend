// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import axiosInstance from "../../api/axiosInstance";

// const TeacherAttendanceReport = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.school?.id;

//   const [month, setMonth] = useState(
//     new Date().toISOString().slice(0, 7)
//   );
//   const [reportData, setReportData] = useState([]);

//   /* =========================
//      FETCH MONTHLY DATA
//   ========================== */
//   useEffect(() => {
//     if (!schoolId) return;

//     axiosInstance
//       .get(
//         `/api/teacher-attendance/monthly?schoolId=${schoolId}&month=${month}`
//       )
//       .then(res => setReportData(res.data))
//       .catch(err => console.error(err));
//   }, [month, schoolId]);

//   /* =========================
//      PDF EXPORT
//   ========================== */
//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Teacher Attendance Monthly Report", 14, 15);

//     const tableData = reportData.map((t, i) => [
//       i + 1,
//       t.teacherName,
//       t.present,
//       t.absent,
//       t.leave,
//       t.halfDay,
//       t.total
//     ]);

//     doc.autoTable({
//       head: [
//         [
//           "#",
//           "Teacher",
//           "Present",
//           "Absent",
//           "Leave",
//           "Half Day",
//           "Total Days"
//         ]
//       ],
//       body: tableData,
//       startY: 20
//     });

//     doc.save(`Teacher_Attendance_${month}.pdf`);
//   };

//   /* =========================
//      EXCEL EXPORT
//   ========================== */
//   const exportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       reportData.map(t => ({
//         Teacher: t.teacherName,
//         Present: t.present,
//         Absent: t.absent,
//         Leave: t.leave,
//         HalfDay: t.halfDay,
//         Total: t.total
//       }))
//     );

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array"
//     });

//     saveAs(
//       new Blob([excelBuffer], {
//         type:
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//       }),
//       `Teacher_Attendance_${month}.xlsx`
//     );
//   };

//   return (
//     <>
//       <div className="bg-white p-3 m-2 shadow rounded">
//         <h5>Teacher Attendance Report</h5>
//       </div>

//       <div className="bg-white p-3 m-2 shadow rounded">
//         <div className="d-flex flex-wrap gap-2 mb-3">
//           <input
//             type="month"
//             className="form-control w-auto"
//             value={month}
//             onChange={e => setMonth(e.target.value)}
//           />

//           <button className="btn btn-danger" onClick={exportPDF}>
//             Export PDF
//           </button>

//           <button className="btn btn-success" onClick={exportExcel}>
//             Export Excel
//           </button>
//         </div>

//         <table className="table table-bordered text-center">
//           <thead className="table-light">
//             <tr>
//               <th>#</th>
//               <th>Teacher Name</th>
//               <th>Present</th>
//               <th>Absent</th>
//               <th>Leave</th>
//               <th>Half Day</th>
//               <th>Total Days</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reportData.length ? (
//               reportData.map((t, i) => (
//                 <tr key={i}>
//                   <td>{i + 1}</td>
//                   <td>{t.teacherName}</td>
//                   <td className="text-success">{t.present}</td>
//                   <td className="text-danger">{t.absent}</td>
//                   <td className="text-warning">{t.leave}</td>
//                   <td>{t.halfDay}</td>
//                   <td>
//                     <strong>{t.total}</strong>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">No data found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default TeacherAttendanceReport;



import React, { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import {
  FaCalendarAlt,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaSearch,
  FaSyncAlt,
  FaUserTie,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarCheck,
  FaHistory,
} from "react-icons/fa";

import { MdOutlineSchool, MdAssessment } from "react-icons/md";

import axiosInstance from "../../api/axiosInstance";

const TeacherAttendanceReport = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.school?.id;

  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [reportData, setReportData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
      FETCH MONTHLY DATA
  ========================== */

  const loadReport = async () => {
    if (!schoolId) return;

    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/api/teacher-attendance/monthly",
        {
          params: {
            schoolId,
            month,
          },
        }
      );

      setReportData(res.data || []);
    } catch (error) {
      console.error(error);
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, [month, schoolId]);

  /* =========================
      FILTER DATA
  ========================== */

  const filteredData = useMemo(() => {
    const search = searchText.toLowerCase().trim();

    return reportData.filter((teacher) =>
      search === ""
        ? true
        : teacher.teacherName?.toLowerCase().includes(search)
    );
  }, [reportData, searchText]);

  /* =========================
      SUMMARY
  ========================== */

  const totalTeachers = filteredData.length;

  const totalPresent = filteredData.reduce(
    (sum, item) => sum + Number(item.present || 0),
    0
  );

  const totalAbsent = filteredData.reduce(
    (sum, item) => sum + Number(item.absent || 0),
    0
  );

  const totalLeave = filteredData.reduce(
    (sum, item) => sum + Number(item.leave || 0),
    0
  );

  const totalHalfDay = filteredData.reduce(
    (sum, item) => sum + Number(item.halfDay || 0),
    0
  );

  const totalAttendanceDays = filteredData.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  );

  /* =========================
      MONTH NAME
  ========================== */

  const formattedMonth = new Date(
    `${month}-01`
  ).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  /* =========================
      PDF EXPORT
  ========================== */

  const exportPDF = () => {
    const doc = new jsPDF("landscape");

    doc.setFontSize(16);
    doc.text(
      "Teacher Attendance Monthly Report",
      14,
      15
    );

    doc.setFontSize(10);
    doc.text(
      `Month: ${formattedMonth}`,
      14,
      21
    );

    doc.text(
      `Total Teachers: ${totalTeachers}`,
      14,
      26
    );

    const tableData = filteredData.map(
      (teacher, index) => [
        index + 1,
        teacher.teacherName,
        teacher.present || 0,
        teacher.absent || 0,
        teacher.leave || 0,
        teacher.halfDay || 0,
        teacher.total || 0,
      ]
    );

    autoTable(doc, {
      startY: 32,

      head: [
        [
          "#",
          "Teacher",
          "Present",
          "Absent",
          "Leave",
          "Half Day",
          "Total Days",
        ],
      ],

      body: tableData,

      styles: {
        fontSize: 9,
        cellPadding: 3,
        halign: "center",
      },

      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
        fontStyle: "bold",
      },

      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
    });

    doc.save(
      `Teacher_Attendance_${month}.pdf`
    );
  };

  /* =========================
      EXCEL EXPORT
  ========================== */

  const exportExcel = () => {
    const data = filteredData.map(
      (teacher, index) => ({
        "S.No": index + 1,
        Teacher: teacher.teacherName,
        Present: teacher.present || 0,
        Absent: teacher.absent || 0,
        Leave: teacher.leave || 0,
        "Half Day": teacher.halfDay || 0,
        "Total Days": teacher.total || 0,
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Teacher Attendance"
    );

    XLSX.writeFile(
      workbook,
      `Teacher_Attendance_${month}.xlsx`
    );
  };

  /* =========================
      PRINT
  ========================== */

  const handlePrint = () => {
    window.print();
  };

  /* =========================
      RESET
  ========================== */

  const handleReset = () => {
    setSearchText("");
    setMonth(
      new Date().toISOString().slice(0, 7)
    );
  };

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
                  }}
                >
                  <FaUserTie size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Teacher Attendance Report
                  </h5>

                  <div className="text-muted small">
                    Attendance &nbsp;/&nbsp; Monthly Report
                  </div>
                </div>

              </div>

              <div className="d-flex align-items-center gap-2">

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border:
                      "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Attendance
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
              Home &nbsp;›&nbsp; Attendance &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Teacher Attendance Report
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 px-2">

        {/* TOTAL TEACHERS */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaUserTie />
            </div>

            <div className="stat-content">
              <span>Total Teachers</span>

              <h3>
                {totalTeachers.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Teachers in report
              </small>
            </div>
          </div>
        </div>

        {/* PRESENT */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div className="stat-content">
              <span>Total Present</span>

              <h3>
                {totalPresent.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Present attendance days
              </small>
            </div>
          </div>
        </div>

        {/* ABSENT */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-red shadow">
            <div className="stat-icon">
              <FaTimesCircle />
            </div>

            <div className="stat-content">
              <span>Total Absent</span>

              <h3>
                {totalAbsent.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Absent attendance days
              </small>
            </div>
          </div>
        </div>

        {/* LEAVE */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <FaCalendarCheck />
            </div>

            <div className="stat-content">
              <span>Total Leave</span>

              <h3>
                {totalLeave.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Leave days
              </small>
            </div>
          </div>
        </div>

      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="px-2">

        <div className="card shadow border-0 mb-4 rounded-4">

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
                  <FaSearch size={20} />
                </div>

                <div className="d-flex flex-column ms-2">

                  <h6 className="mb-0 lh-1">
                    Attendance Filter
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Filter monthly teacher attendance
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
                <FaCalendarAlt className="me-1" />
                {formattedMonth}
              </span>

            </div>

          </div>

          <div className="card-body p-4">

            <div className="row g-3 align-items-end">

              {/* MONTH */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  <FaCalendarAlt className="me-1 text-primary" />
                  Attendance Month
                </label>

                <input
                  type="month"
                  className="form-control"
                  value={month}
                  onChange={(e) =>
                    setMonth(e.target.value)
                  }
                />

              </div>

              {/* SEARCH */}

              <div className="col-xl-4 col-md-6">

                <label className="form-label fw-semibold">
                  <FaSearch className="me-1 text-primary" />
                  Search Teacher
                </label>

                <div className="input-group">

                  <span className="input-group-text bg-light">
                    <FaSearch className="text-primary" />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search teacher name..."
                    value={searchText}
                    onChange={(e) =>
                      setSearchText(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              {/* BUTTONS */}

              <div className="col-xl-5 col-md-12">

                <div className="d-flex flex-wrap gap-2 justify-content-xl-end">

                  <button
                    className="btn btn-primary rounded-3 px-3"
                    onClick={loadReport}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <FaSearch className="me-2" />
                        Search
                      </>
                    )}
                  </button>

                  <button
                    className="btn btn-outline-secondary rounded-3 px-3"
                    onClick={handleReset}
                  >
                    <FaSyncAlt className="me-2" />
                    Reset
                  </button>

                  <button
                    className="btn btn-outline-danger rounded-3 px-3"
                    onClick={exportPDF}
                    disabled={!filteredData.length}
                  >
                    <FaFilePdf className="me-2" />
                    PDF
                  </button>

                  <button
                    className="btn btn-outline-success rounded-3 px-3"
                    onClick={exportExcel}
                    disabled={!filteredData.length}
                  >
                    <FaFileExcel className="me-2" />
                    Excel
                  </button>

                  <button
                    className="btn btn-outline-dark rounded-3 px-3"
                    onClick={handlePrint}
                  >
                    <FaPrint className="me-2" />
                    Print
                  </button>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          ATTENDANCE TABLE
      ===================================================== */}

      <div className="px-2">

        <div className="card shadow border-0 rounded-4 mb-4">

          <div
            className="card-header bg-white py-3 d-flex justify-content-between align-items-center"
            style={{
              borderBottom:
                "1px solid #e5e7eb",
            }}
          >

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
                <MdAssessment size={25} />
              </div>

              <div className="d-flex flex-column ms-2">

                <h6 className="mb-0 lh-1">
                  Monthly Attendance Records
                </h6>

                <small className="lh-1 text-muted mt-1">
                  Teacher attendance summary
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
              {filteredData.length} Records
            </span>

          </div>

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

                    <th className="text-start">
                      Teacher Name
                    </th>

                    <th>
                      Present
                    </th>

                    <th>
                      Absent
                    </th>

                    <th>
                      Leave
                    </th>

                    <th>
                      Half Day
                    </th>

                    <th>
                      Total Days
                    </th>

                  </tr>
                </thead>

                <tbody className="text-center small">

                  {loading ? (

                    <tr>

                      <td
                        colSpan="7"
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
                          Loading attendance report...
                        </div>

                      </td>

                    </tr>

                  ) : filteredData.length > 0 ? (

                    filteredData.map(
                      (teacher, index) => (

                        <tr
                          key={
                            teacher.teacherId ||
                            teacher.teacherName ||
                            index
                          }
                        >

                          <td className="fw-semibold">
                            {index + 1}
                          </td>

                          <td className="text-start">

                            <div className="d-flex align-items-center">

                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle me-2"
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  backgroundColor:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                }}
                              >
                                <FaUserTie size={15} />
                              </div>

                              <span className="fw-semibold">
                                {teacher.teacherName}
                              </span>

                            </div>

                          </td>

                          <td>
                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                backgroundColor:
                                  "#dcfce7",
                                color:
                                  "#15803d",
                                border:
                                  "1px solid #bbf7d0",
                              }}
                            >
                              {teacher.present || 0}
                            </span>
                          </td>

                          <td>
                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                backgroundColor:
                                  "#fee2e2",
                                color:
                                  "#dc2626",
                                border:
                                  "1px solid #fecaca",
                              }}
                            >
                              {teacher.absent || 0}
                            </span>
                          </td>

                          <td>
                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                backgroundColor:
                                  "#fef3c7",
                                color:
                                  "#b45309",
                                border:
                                  "1px solid #fde68a",
                              }}
                            >
                              {teacher.leave || 0}
                            </span>
                          </td>

                          <td>
                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                backgroundColor:
                                  "#dbeafe",
                                color:
                                  "#2563eb",
                                border:
                                  "1px solid #bfdbfe",
                              }}
                            >
                              {teacher.halfDay || 0}
                            </span>
                          </td>

                          <td>
                            <span className="fw-bold text-dark">
                              {teacher.total || 0}
                            </span>
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
                          className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor:
                              "#fef2f2",
                            color:
                              "#dc2626",
                          }}
                        >
                          <FaUserTie size={28} />
                        </div>

                        <h6 className="text-danger fw-bold">
                          No Attendance Found
                        </h6>

                        <small className="text-muted">
                          No teacher attendance
                          record matches your
                          selected month or search.
                        </small>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          REPORT SUMMARY
      ===================================================== */}

      <div className="px-2">

        <div className="card shadow border-0 rounded-4 mb-5">

          <div className="card-body p-4">

            <div className="row align-items-center">

              <div className="col-md-6">

                <div className="d-flex align-items-center">

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
                    <FaHistory size={22} />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold">
                      Report Summary
                    </h6>

                    <small className="text-muted">
                      Showing{" "}
                      <span className="text-primary fw-bold">
                        {filteredData.length}
                      </span>{" "}
                      teacher record(s) for{" "}
                      <span className="fw-semibold">
                        {formattedMonth}
                      </span>
                    </small>

                  </div>

                </div>

              </div>

              <div className="col-md-6 text-md-end mt-3 mt-md-0">

                <button
                  className="btn btn-outline-primary rounded-3 me-2"
                  onClick={loadReport}
                  disabled={loading}
                >
                  <FaSyncAlt className="me-2" />
                  Refresh
                </button>

                <button
                  className="btn btn-outline-dark rounded-3"
                  onClick={handlePrint}
                >
                  <FaPrint className="me-2" />
                  Print Report
                </button>

              </div>

            </div>

            <hr className="my-4" />

            <div className="row text-center">

              <div className="col-md-3 border-end">

                <small className="text-muted">
                  Total Present
                </small>

                <h4 className="text-success fw-bold mt-1">
                  {totalPresent}
                </h4>

              </div>

              <div className="col-md-3 border-end">

                <small className="text-muted">
                  Total Absent
                </small>

                <h4 className="text-danger fw-bold mt-1">
                  {totalAbsent}
                </h4>

              </div>

              <div className="col-md-3 border-end">

                <small className="text-muted">
                  Total Leave
                </small>

                <h4 className="text-warning fw-bold mt-1">
                  {totalLeave}
                </h4>

              </div>

              <div className="col-md-3">

                <small className="text-muted">
                  Half Day
                </small>

                <h4 className="text-primary fw-bold mt-1">
                  {totalHalfDay}
                </h4>

              </div>

            </div>

            <div className="row mt-4">

              <div className="col-12">

                <div
                  className="rounded-3 p-3 text-center"
                  style={{
                    backgroundColor:
                      "#f8fafc",
                    border:
                      "1px solid #e2e8f0",
                  }}
                >

                  <small className="text-muted">
                    Total Attendance Days
                  </small>

                  <h4 className="fw-bold text-dark mb-0 mt-1">
                    {totalAttendanceDays}
                  </h4>

                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

      {/* =====================================================
          PRINT CSS
      ===================================================== */}

      <style>
        {`
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

            .card-header {
              color: black !important;
              background: white !important;
            }

            table {
              font-size: 9px !important;
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
    </>
  );
};

export default TeacherAttendanceReport;

