
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";

// const FeeCollectionSearch = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const [sessions, setSessions] = useState([]);
//   const [selectedSession, setSelectedSession] = useState("");
//   const [admissionNo, setAdmissionNo] = useState("");
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);

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
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSearch = async () => {
//     if (!selectedSession || !admissionNo.trim()) {
//       alert("Please select session and enter admission number.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setSearched(true);
//       setStudent(null);

//       const res = await axiosInstance.get(
//         "/api/students/session-admission",
//         {
//           params: {
//             academicYear: selectedSession,
//             admissionNumber: admissionNo.trim(),
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setStudent(res.data);
//     } catch (error) {
//       console.log(error);
//       setStudent(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setSelectedSession("");
//     setAdmissionNo("");
//     setStudent(null);
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
//           <strong>Fee Collection</strong>
//         </h4>

//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb mb-0">
//             <li className="breadcrumb-item">Home</li>
//             <li className="breadcrumb-item">Fee</li>
//             <li className="breadcrumb-item active">Fee Collection</li>
//           </ol>
//         </nav>
//       </div>

//       <div className="card shadow mb-3">
//         <div className="card-header bg-white ">
//           <strong>Search Student For Collection</strong>
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

//       {!loading && student && (
//         <div className="card shadow mt-3">
//           <div className="card-header bg-white ">
//             <strong>Student Details</strong>
//           </div>

//           <div className="card-body">
//             <div className="table-responsive">
//               <table className="table table-bordered table-hover align-middle mb-0">
//                 <thead className="table-primary">
//                   <tr>
//                     <th>S.No</th>
//                     <th>Admission No</th>
//                     <th>Student Name</th>
//                     <th>Class</th>
//                     <th>Section</th>
//                     <th>Father Name</th>
//                     <th>Mother Name</th>
//                     <th>Mobile</th>
//                     <th>Address</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   <tr>
//                     <td>1</td>

//                     <td className="fw-semibold">
//                       {student.admissionNumber || "-"}
//                     </td>

//                     <td>
//                       {student.firstName || ""}{" "}
//                       {student.lastName || ""}
//                     </td>

//                     <td>{student.studentClass || "-"}</td>

//                     <td>{student.section || "-"}</td>

//                     <td>{student.fatherName || "-"}</td>

//                     <td>{student.motherName || "-"}</td>

//                     <td>{student.mobile || "-"}</td>

//                     <td>{student.address || "-"}</td>

//                     <td>
//                       <button
//                         className="btn btn-primary btn-sm"
//                         onClick={() =>
//                           navigate(
//                             `/fee/feeCollection/${student.admissionNumber}`,
//                           )
//                         }
//                       >
//                         Collect Fee
//                       </button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             <div className="text-end mt-3">
//               <button
//                 className="btn btn-secondary btn-sm"
//                 onClick={handleReset}
//               >
//                 Clear Search
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {!loading && searched && !student && (
//         <div className="card shadow mt-3">
//           <div className="card-header bg-white text-white">
//             <strong>Student Details</strong>
//           </div>

//           <div className="card-body text-center p-5">
//             <div className="mb-3">
//               <i
//                 className="bi bi-person-x-fill text-danger"
//                 style={{ fontSize: "60px" }}
//               ></i>
//             </div>

//             <h4 className="text-danger">Student Not Found</h4>

//             <p className="text-muted mb-3">
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

// export default FeeCollectionSearch;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdMoney,
  MdOutlineSchool,
  MdFilterListAlt,
  MdOutlineFormatListBulleted,
  MdPersonSearch,
} from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";
import { FaUserGraduate, FaArrowRight, FaUserTimes } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const FeeCollectionSearch = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

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

      setSessions(res.data);
    } catch (error) {
      console.log("Session Load Error:", error);
    }
  };

  const handleSearch = async () => {
    if (!selectedSession || !admissionNo.trim()) {
      alert("Please select session and enter admission number.");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      setStudent(null);

      const res = await axiosInstance.get(
        "/api/students/session-admission",
        {
          params: {
            academicYear: selectedSession,
            admissionNumber: admissionNo.trim(),
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudent(res.data);
    } catch (error) {
      console.log("Student Search Error:", error);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedSession("");
    setAdmissionNo("");
    setStudent(null);
    setSearched(false);
  };

  const getStudentName = () => {
    return (
      `${student?.firstName || ""} ${student?.middleName || ""} ${
        student?.lastName || ""
      }`.trim() || "-"
    );
  };

  return (
    <>
      {/* ==========================================
          PAGE HEADER
      ========================================== */}

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
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <MdMoney size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Fee Collection
                  </h5>

                  <div className="text-muted small">
                    Fees &nbsp;/&nbsp; Fee Collection
                  </div>
                </div>
              </div>

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
                  Fees
                </span>
              </div>
            </div>
          </div>

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
                Fee Collection
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* ==========================================
          SEARCH STUDENT
      ========================================== */}

      <div className="px-2">
        <div className="card border-0 shadow rounded-4 mb-4">
          <div className="card-header bg-white border-bottom-2 rounded-top-3 py-3">
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 me-2"
                style={{
                  width: "42px",
                  height: "42px",
                  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                }}
              >
                <MdFilterListAlt size={20} />
              </div>

              <div className="d-flex flex-column">
                <h6 className="mb-0 lh-1">
                  Search Student For Collection
                </h6>

                <small className="lh-1 text-muted mt-1">
                  Search student to collect fee
                </small>
              </div>
            </div>
          </div>

          <div className="card-body p-3 p-md-4">
            <div className="row g-3 align-items-end">
              {/* Academic Year */}

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

              {/* Admission Number */}

              <div className="col-lg-5 col-md-6">
                <label className="form-label fw-semibold small">
                  Admission Number{" "}
                  <span className="text-danger">*</span>
                </label>

                <div className="position-relative">
                  <FaUserGraduate
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

                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Enter admission number"
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

              {/* Search */}

              <div className="col-lg-2 col-md-12">
                <button
                  type="button"
                  className="btn btn-primary w-100 rounded-3"
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
                      <RiSearchLine className="me-2" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          LOADING
      ========================================== */}

      {loading && (
        <div className="px-2">
          <div className="card border-0 shadow rounded-4 mb-4">
            <div className="card-body text-center py-5">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle mx-auto"
                style={{
                  width: "65px",
                  height: "65px",
                  background: "#eff6ff",
                }}
              >
                <div
                  className="spinner-border text-primary"
                  role="status"
                />
              </div>

              <h6 className="fw-bold mt-3 mb-1">
                Searching Student...
              </h6>

              <small className="text-muted">
                Please wait while fetching student details.
              </small>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          STUDENT RESULT
      ========================================== */}

      {!loading && student && (
        <div className="px-2">
          <div className="card border-0 shadow rounded-4 mb-4">
            {/* Header */}

            <div className="card-header bg-white border-0 rounded-top-4 py-3">
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
                    <h6 className="mb-0 fw-semibold">
                      Student Details
                    </h6>

                    <small className="text-muted">
                      Student available for fee collection
                    </small>
                  </div>
                </div>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#eaf8f0",
                    color: "#198754",
                  }}
                >
                  Student Found
                </span>
              </div>
            </div>

            {/* Student Mini Info */}

            <div className="px-3 pt-2">
              <div
                className="rounded-3 p-3"
                style={{
                  background:
                    "linear-gradient(135deg,#f8fbff,#eef6ff)",
                  border: "1px solid #e0ecff",
                }}
              >
                <div className="row g-3 align-items-center">
                  <div className="col-lg-1 col-md-2 text-center">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle mx-auto"
                      style={{
                        width: "52px",
                        height: "52px",
                        background: "#eaf2ff",
                        color: "#0d6efd",
                      }}
                    >
                      <FaUserGraduate size={22} />
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-4">
                    <small className="text-muted d-block">
                      Student Name
                    </small>

                    <span className="fw-semibold">
                      {getStudentName()}
                    </span>
                  </div>

                  <div className="col-lg-2 col-md-3">
                    <small className="text-muted d-block">
                      Admission No
                    </small>

                    <span className="fw-semibold text-primary">
                      {student.admissionNumber || "-"}
                    </span>
                  </div>

                  <div className="col-lg-2 col-md-3">
                    <small className="text-muted d-block">
                      Class
                    </small>

                    <span className="fw-semibold">
                      {student.studentClass || "-"}
                    </span>
                  </div>

                  <div className="col-lg-2 col-md-3">
                    <small className="text-muted d-block">
                      Section
                    </small>

                    <span className="fw-semibold">
                      {student.section || "-"}
                    </span>
                  </div>

                  <div className="col-lg-2 col-md-3">
                    <small className="text-muted d-block">
                      Academic Year
                    </small>

                    <span className="fw-semibold">
                      {selectedSession || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}

            <div className="card-body p-3">
              <div className="table-responsive">
                <table className="table align-middle mb-0 fw-medium small">
                  <thead className="table-light">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Admission No</th>
                      <th>Student Name</th>
                      <th>Class</th>
                      <th>Section</th>
                      <th>Father Name</th>
                      <th>Mother Name</th>
                      <th>Mobile</th>
                      <th>Address</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="text-center fw-semibold">
                        1
                      </td>

                      <td>
                        <span className="fw-semibold text-primary">
                          {student.admissionNumber || "-"}
                        </span>
                      </td>

                      <td>{getStudentName()}</td>

                      <td>
                        {student.studentClass || "-"}
                      </td>

                      <td>
                        {student.section || "-"}
                      </td>

                      <td>
                        {student.fatherName || "-"}
                      </td>

                      <td>
                        {student.motherName || "-"}
                      </td>

                      <td>
                        {student.mobile || "-"}
                      </td>

                      <td>
                        {student.address || "-"}
                      </td>

                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm px-3 rounded-3"
                          onClick={() =>
                            navigate(
                              `/fee/feeCollection/${student.admissionNumber}`
                            )
                          }
                        >
                          Collect Fee
                          <FaArrowRight className="ms-2" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bottom Actions */}

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm rounded-3 px-3"
                  onClick={handleReset}
                >
                  Clear Search
                </button>

                <button
                  type="button"
                  className="btn btn-primary btn-sm rounded-3 px-3"
                  onClick={() =>
                    navigate(
                      `/fee/feeCollection/${student.admissionNumber}`
                    )
                  }
                >
                  <MdMoney className="me-1" />
                  Collect Fee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          NOT FOUND
      ========================================== */}

      {!loading && searched && !student && (
        <div className="px-2">
          <div className="card border-0 shadow rounded-4 mb-4">
            <div className="card-header bg-white border-0 rounded-top-4 py-3">
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3 me-2"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "#ffeded",
                    color: "#dc3545",
                  }}
                >
                  <FaUserTimes size={19} />
                </div>

                <div>
                  <h6 className="mb-0 fw-semibold">
                    Student Details
                  </h6>

                  <small className="text-muted">
                    Search result
                  </small>
                </div>
              </div>
            </div>

            <div className="card-body text-center py-5">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle mx-auto"
                style={{
                  width: "75px",
                  height: "75px",
                  background: "#ffeded",
                  color: "#dc3545",
                }}
              >
                <FaUserTimes size={32} />
              </div>

              <h5 className="text-danger fw-bold mt-3 mb-2">
                Student Not Found
              </h5>

              <p className="text-muted mb-3">
                No student found for the selected academic year
                and admission number.
              </p>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-3 px-4"
                onClick={handleReset}
              >
                Search Again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeeCollectionSearch;