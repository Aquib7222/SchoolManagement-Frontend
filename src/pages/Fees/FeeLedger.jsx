
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";

// const FeeLedger = () => {
//   const [sessions, setSessions] = useState([]);
//   const [selectedSession, setSelectedSession] = useState("");
//   const [admissionNo, setAdmissionNo] = useState("");
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadSessions();
//   }, []);

//   const loadSessions = async () => {
//     try {
//       const res = await axiosInstance.get("/api/master/sessions", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setSessions(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleSearch = async () => {
//     if (!selectedSession) {
//       alert("Select Session");
//       return;
//     }

//     if (!admissionNo.trim()) {
//       alert("Enter Admission Number");
//       return;
//     }

//     try {
//       setLoading(true);
//       setSearched(true);
//       setStudents([]);

//       const res = await axiosInstance.get("/api/students/search", {
//         params: {
//           session: selectedSession,
//           admissionNumber: admissionNo.trim(),
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setStudents(res.data);
//     } catch (err) {
//       console.log(err);
//       setStudents([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setSelectedSession("");
//     setAdmissionNo("");
//     setStudents([]);
//     setSearched(false);
//   };

//   return (
//     <>
//       <div
//         className="bg-white shadow rounded p-3 mb-3 mt-3"
//         style={{
//           borderLeft: "5px solid #0d6efd",
//         }}
//       >
//         <h4 className="mb-1">
//           <strong>Fee Ledger</strong>
//         </h4>

//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb mb-0">
//             <li className="breadcrumb-item">Home</li>
//             <li className="breadcrumb-item">Fee</li>
//             <li className="breadcrumb-item active">Fee Ledger</li>
//           </ol>
//         </nav>
//       </div>

//       <div className="card shadow">
//         <div className="card-header bg-white p-3 ">
//           <strong>Search Student</strong>
//         </div>

//         <div className="card-body">
//           <div className="row align-items-end">
//             <div className="col-md-5 mb-3 mb-md-0">
//               <label className="form-label fw-bold">
//                 Select Session <span className="text-danger">*</span>
//               </label>

//               <select
//                 className="form-select"
//                 value={selectedSession}
//                 onChange={(e) => setSelectedSession(e.target.value)}
//               >
//                 <option value="">Select Session</option>

//                 {sessions.map((item) => (
//                   <option key={item} value={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-md-5 mb-3 mb-md-0">
//               <label className="form-label fw-bold">
//                 Admission Number <span className="text-danger">*</span>
//               </label>

//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter Admission Number"
//                 value={admissionNo}
//                 onChange={(e) => setAdmissionNo(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     handleSearch();
//                   }
//                 }}
//               />
//             </div>

//             <div className="col-md-2">
//               <button
//                 className="btn btn-primary w-100"
//                 onClick={handleSearch}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span
//                       className="spinner-border spinner-border-sm me-2"
//                       role="status"
//                     ></span>
//                     Searching...
//                   </>
//                 ) : (
//                   "Search"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {loading && (
//         <div className="card shadow mt-3">
//           <div
//             className="card-body text-center"
//             style={{ padding: "60px" }}
//           >
//             <div
//               className="spinner-border text-primary"
//               style={{
//                 width: "4rem",
//                 height: "4rem",
//               }}
//               role="status"
//             >
//               <span className="visually-hidden">Loading...</span>
//             </div>

//             <h5 className="mt-3">Searching Student...</h5>

//             <p className="text-muted mb-0">
//               Please wait while fetching student details.
//             </p>
//           </div>
//         </div>
//       )}

//       {!loading && searched && students.length > 0 && (
//         <div className="card shadow mt-3">
//           <div className="card-header bg-white ">
//             <strong>Student List</strong>
//           </div>

//           <div className="card-body">
//             <div className="table-responsive">
//               <table className="table table-bordered table-hover align-middle mb-0">
//                 <thead className="table-primary">
//                   <tr>
//                     <th>#</th>
//                     <th>Admission No</th>
//                     <th>Name</th>
//                     <th>Class</th>
//                     <th>Section</th>
//                     <th>Mobile</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {students.map((student, index) => (
//                     <tr key={student.id || student.admissionNumber}>
//                       <td>{index + 1}</td>

//                       <td className="fw-semibold">
//                         {student.admissionNumber || "-"}
//                       </td>

//                       <td>
//                         {student.firstName || ""}{" "}
//                         {student.lastName || ""}
//                       </td>

//                       <td>{student.studentClass || "-"}</td>

//                       <td>{student.section || "-"}</td>

//                       <td>{student.mobile || "-"}</td>

//                       <td>
//                         <button
//                           className="btn btn-primary btn-sm"
//                           onClick={() =>
//                             navigate(
//                               `/fee/feeledger/${student.admissionNumber}`,
//                             )
//                           }
//                         >
//                           View Ledger
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       {!loading && searched && students.length === 0 && (
//         <div className="card shadow mt-3">
//           <div className="card-header bg-white ">
//             <strong>Student List</strong>
//           </div>

//           <div className="card-body text-center p-5">
//             <i
//               className="bi bi-person-x-fill text-danger"
//               style={{ fontSize: "60px" }}
//             ></i>

//             <h4 className="text-danger mt-3">Student Not Found</h4>

//             <p className="text-muted">
//               No student found for the selected session and admission number.
//             </p>

//             <button
//               className="btn btn-secondary btn-sm"
//               onClick={handleReset}
//             >
//               Search Again
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FeeLedger;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdMoney,
  MdOutlineSchool,
  MdOutlineFormatListBulleted,
  MdFilterListAlt,
} from "react-icons/md";
import { FaCalendarDays, FaUser } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";
import { FaEye, FaRedo, FaSearch, FaUserGraduate } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const FeeLedger = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // =========================================================
  // LOAD SESSIONS
  // =========================================================

  useEffect(() => {
    loadSessions();
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

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = async () => {
    if (!selectedSession) {
      alert("Select Session");
      return;
    }

    if (!admissionNo.trim()) {
      alert("Enter Admission Number");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      setStudents([]);

      const res = await axiosInstance.get("/api/students/search", {
        params: {
          session: selectedSession,
          admissionNumber: admissionNo.trim(),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data || []);
    } catch (err) {
      console.log(err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    setSelectedSession("");
    setAdmissionNo("");
    setStudents([]);
    setSearched(false);
  };

  // =========================================================
  // VIEW LEDGER
  // =========================================================

  const handleViewLedger = (admissionNumber) => {
    navigate(`/fee/feeledger/${admissionNumber}`);
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
              {/* LEFT */}

              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-4"
                  style={{
                    width: "52px",
                    height: "52px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <MdMoney size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Fee Ledger
                  </h5>

                  <div className="text-muted small">
                    Fees &nbsp;/&nbsp; Fee Ledger
                  </div>
                </div>
              </div>

              {/* RIGHT BADGE */}

              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Fee Management
                </span>
              </div>
            </div>
          </div>

          {/* BREADCRUMB */}

          <div
            className="px-4 py-2"
            style={{
              backgroundColor: "rgba(239,246,255,.75)",
              borderTop: "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp; Fees &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Fee Ledger
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH CARD
      ===================================================== */}

      <div className="px-2">
        <div className="card border-0 shadow rounded-4 mb-4">
          {/* HEADER */}

          <div className="card-header bg-white border-bottom-2 rounded-top-3 py-3">
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 me-2"
                style={{
                  width: "42px",
                  height: "42px",
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                }}
              >
                <MdFilterListAlt size={20} />
              </div>

              <div className="d-flex flex-column">
                <h6 className="mb-0 lh-1">
                  Search Student
                </h6>

                <small className="lh-1 text-muted mt-1">
                  Search student to view fee ledger
                </small>
              </div>
            </div>
          </div>

          {/* BODY */}

          <div className="card-body p-3 p-md-4">
            <div className="row g-3 align-items-end">
              {/* ACADEMIC YEAR */}

              <div className="col-lg-5 col-md-6">
                <label className="form-label fw-semibold small">
                  Academic Year{" "}
                  <span className="text-danger">*</span>
                </label>

                <div className="position-relative">
                  <FaCalendarDays
                    className="position-absolute text-primary"
                    size={14}
                    style={{
                      left: "13px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  />

                  <select
                    className="form-select ps-5"
                    value={selectedSession}
                    onChange={(e) =>
                      setSelectedSession(e.target.value)
                    }
                  >
                    <option value="">
                      Select Academic Year
                    </option>

                    {sessions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ADMISSION NUMBER */}

              <div className="col-lg-5 col-md-6">
                <label className="form-label fw-semibold small">
                  Admission Number{" "}
                  <span className="text-danger">*</span>
                </label>

                <div className="position-relative">
                  <FaUser
                    className="position-absolute text-primary"
                    size={13}
                    style={{
                      left: "13px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  />

                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Enter Admission Number"
                    value={admissionNo}
                    onChange={(e) =>
                      setAdmissionNo(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                </div>
              </div>

              {/* SEARCH */}

              <div className="col-lg-2 col-md-12">
                <button
                  type="button"
                  className="btn btn-primary w-100 rounded-3"
                  onClick={handleSearch}
                  disabled={loading}
                  style={{
                    minHeight: "40px",
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <RiSearchLine className="me-2" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* RESET */}

            {(selectedSession || admissionNo) && (
              <div className="d-flex justify-content-end mt-3">
                <button
                  type="button"
                  className="btn btn-light border rounded-3 px-3"
                  onClick={handleReset}
                >
                  <FaRedo size={12} className="me-2" />
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH RESULT SUMMARY
      ===================================================== */}

      {searched && !loading && (
        <div className="px-2 mb-3">
          <div className="row g-3">
            {/* STUDENTS FOUND */}

            <div className="col-xl-4 col-md-6">
              <div className="premium-stat-card stat-blue shadow">
                <div className="stat-icon">
                  <FaUserGraduate />
                </div>

                <div className="stat-content">
                  <span>Students Found</span>

                  <h3>{students.length}</h3>

                  <small>Matching Students</small>
                </div>
              </div>
            </div>

            {/* SESSION */}

            <div className="col-xl-4 col-md-6">
              <div className="premium-stat-card stat-green shadow">
                <div className="stat-icon">
                  <FaCalendarDays />
                </div>

                <div className="stat-content">
                  <span>Academic Year</span>

                  <h3
                    style={{
                      fontSize: "21px",
                    }}
                  >
                    {selectedSession || "-"}
                  </h3>

                  <small>Selected Session</small>
                </div>
              </div>
            </div>

            {/* ADMISSION */}

            <div className="col-xl-4 col-md-6">
              <div className="premium-stat-card stat-orange shadow">
                <div className="stat-icon">
                  <FaSearch />
                </div>

                <div className="stat-content">
                  <span>Admission Number</span>

                  <h3
                    style={{
                      fontSize: "21px",
                    }}
                  >
                    {admissionNo || "-"}
                  </h3>

                  <small>Search Criteria</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <div className="px-2">
          <div className="card border-0 shadow rounded-4 mt-3">
            <div
              className="card-body text-center"
              style={{
                padding: "60px",
              }}
            >
              <div
                className="spinner-border text-primary"
                style={{
                  width: "3rem",
                  height: "3rem",
                }}
                role="status"
              >
                <span className="visually-hidden">
                  Loading...
                </span>
              </div>

              <h6 className="mt-3 fw-semibold">
                Searching Student...
              </h6>

              <p className="text-muted mb-0 small">
                Please wait while fetching student details.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          STUDENT LIST
      ===================================================== */}

      {!loading && searched && students.length > 0 && (
        <div className="px-2 mb-4">
          <div className="card border-0 shadow rounded-4 overflow-hidden">
            {/* HEADER */}

            <div className="card-header bg-white border-0 rounded-top-3 py-3">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 me-2"
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
                    <MdOutlineFormatListBulleted size={20} />
                  </div>

                  <div>
                    <h6 className="mb-0 fw-bold">
                      Student List
                    </h6>

                    <small className="text-muted">
                      Select a student to view fee ledger
                    </small>
                  </div>
                </div>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  {students.length} Students
                </span>
              </div>
            </div>

            {/* TABLE */}

            <div className="card-body p-1">
              <div className="table-responsive">
                <table className="table align-middle mb-0 fw-medium small">
                  <thead className="table-light">
                    <tr>
                      <th
                        className="text-center"
                        style={{
                          padding: "13px 12px",
                        }}
                      >
                        #
                      </th>

                      <th
                        style={{
                          padding: "13px 12px",
                        }}
                      >
                        Admission No
                      </th>

                      <th
                        style={{
                          padding: "13px 12px",
                        }}
                      >
                        Student Name
                      </th>

                      <th
                        style={{
                          padding: "13px 12px",
                        }}
                      >
                        Class
                      </th>

                      <th
                        style={{
                          padding: "13px 12px",
                        }}
                      >
                        Section
                      </th>

                      <th
                        style={{
                          padding: "13px 12px",
                        }}
                      >
                        Mobile
                      </th>

                      <th
                        className="text-center"
                        style={{
                          padding: "13px 12px",
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student, index) => (
                      <tr
                        key={
                          student.id ||
                          student.admissionNumber ||
                          index
                        }
                      >
                        {/* NUMBER */}

                        <td className="text-center fw-semibold">
                          <span
                            className="d-inline-flex align-items-center justify-content-center rounded-circle"
                            style={{
                              width: "28px",
                              height: "28px",
                              background: "#f1f5f9",
                              color: "#64748b",
                              fontSize: "12px",
                            }}
                          >
                            {index + 1}
                          </span>
                        </td>

                        {/* ADMISSION */}

                        <td>
                          <span
                            className="badge rounded-pill"
                            style={{
                              background: "#eff6ff",
                              color: "#2563eb",
                              border:
                                "1px solid #bfdbfe",
                              padding: "7px 10px",
                            }}
                          >
                            {student.admissionNumber ||
                              "-"}
                          </span>
                        </td>

                        {/* NAME */}

                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle"
                              style={{
                                width: "34px",
                                height: "34px",
                                background: "#eaf3ff",
                                color: "#2563eb",
                              }}
                            >
                              <FaUser size={13} />
                            </div>

                            <span className="fw-semibold">
                              {student.firstName || ""}{" "}
                              {student.middleName || ""}{" "}
                              {student.lastName || ""}
                            </span>
                          </div>
                        </td>

                        {/* CLASS */}

                        <td>
                          <span
                            className="badge rounded-pill"
                            style={{
                              background: "#f1f5f9",
                              color: "#475569",
                              border:
                                "1px solid #e2e8f0",
                              padding: "7px 10px",
                            }}
                          >
                            {student.studentClass ||
                              "-"}
                          </span>
                        </td>

                        {/* SECTION */}

                        <td>
                          {student.section || "-"}
                        </td>

                        {/* MOBILE */}

                        <td>
                          {student.mobile ||
                            student.fatherMobile ||
                            student.motherMobile ||
                            "-"}
                        </td>

                        {/* ACTION */}

                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-sm d-inline-flex align-items-center gap-2 rounded-3"
                            style={{
                              background: "#eff6ff",
                              color: "#2563eb",
                              border:
                                "1px solid #bfdbfe",
                              fontWeight: "600",
                              padding: "7px 12px",
                            }}
                            onClick={() =>
                              handleViewLedger(
                                student.admissionNumber
                              )
                            }
                          >
                            <FaEye size={12} />
                            View Ledger
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FOOTER */}

            <div
              className="card-footer bg-white"
              style={{
                borderTop: "1px solid #eef0f2",
                padding: "12px 16px",
              }}
            >
              <small className="text-muted">
                Showing{" "}
                <strong className="text-primary">
                  {students.length}
                </strong>{" "}
                student(s)
              </small>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          NO STUDENT FOUND
      ===================================================== */}

      {!loading && searched && students.length === 0 && (
        <div className="px-2 mb-4">
          <div className="card border-0 shadow rounded-4">
            {/* HEADER */}

            <div className="card-header bg-white border-0 py-3">
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3 me-2"
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
                  <MdOutlineFormatListBulleted size={20} />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">
                    Student List
                  </h6>

                  <small className="text-muted">
                    Search results
                  </small>
                </div>
              </div>
            </div>

            {/* BODY */}

            <div className="card-body text-center py-5">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle mx-auto"
                style={{
                  width: "70px",
                  height: "70px",
                  background: "#fff1f2",
                  color: "#dc3545",
                }}
              >
                <FaUserGraduate size={28} />
              </div>

              <h5 className="text-danger mt-3 mb-1">
                Student Not Found
              </h5>

              <p className="text-muted small mb-3">
                No student found for the selected academic
                year and admission number.
              </p>

              <button
                type="button"
                className="btn btn-primary btn-sm rounded-3 px-4"
                onClick={handleReset}
              >
                <FaRedo size={12} className="me-2" />
                Search Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          SMALL CSS
      ===================================================== */}

      <style>
        {`
          .table tbody tr {
            transition: all 0.18s ease;
          }

          .table tbody tr:hover {
            background-color: #fbfdff;
          }

          .form-select,
          .form-control {
            border-color: #dee2e6;
            border-radius: 7px;
            min-height: 40px;
            font-size: 13px;
          }

          .form-select:focus,
          .form-control:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 0.15rem rgba(37, 99, 235, 0.10);
          }

          .btn {
            font-size: 13px;
            font-weight: 500;
          }

          .premium-stat-card {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 18px;
            border-radius: 14px;
            background: #fff;
            min-height: 105px;
          }

          .premium-stat-card .stat-icon {
            width: 48px;
            height: 48px;
            min-width: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
          }

          .premium-stat-card .stat-content {
            min-width: 0;
          }

          .premium-stat-card .stat-content span {
            display: block;
            color: #6c757d;
            font-size: 12px;
            font-weight: 600;
          }

          .premium-stat-card .stat-content h3 {
            margin: 3px 0;
            font-weight: 700;
            color: #212529;
          }

          .premium-stat-card .stat-content small {
            color: #8a94a6;
            font-size: 11px;
          }

          .stat-blue .stat-icon {
            background: #e7f1ff;
            color: #2563eb;
          }

          .stat-green .stat-icon {
            background: #e8f7ee;
            color: #198754;
          }

          .stat-orange .stat-icon {
            background: #fff3cd;
            color: #d97706;
          }

          @media (max-width: 768px) {
            .card-header {
              padding: 12px !important;
            }

            .table {
              font-size: 12px;
            }

            .premium-stat-card {
              padding: 15px;
            }
          }
        `}
      </style>
    </>
  );
};

export default FeeLedger;