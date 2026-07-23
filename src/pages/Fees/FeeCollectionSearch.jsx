// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const FeeCollectionSearch = () => {
// //   const token = localStorage.getItem("token");
// //   const [sessions, setSessions] = useState([]);
// //   const [selectedSession, setSelectedSession] = useState("");
// //   const [admissionNo, setAdmissionNo] = useState([]);
// //   const [student, setStudent] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     loadSessions();
// //   }, []);

// //   console.log("Sessions", sessions);

// //   const loadSessions = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:8080/api/master/sessions", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       setSessions(res.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   //   ================================
// //   //        Search Student
// //   //   ================================
// //   const handleSearch = async () => {
// //     try {
// //       const res = await axios.get(
// //         "http://localhost:8080/api/students/session-admission",
// //         {
// //           params: {
// //             academicYear: selectedSession,
// //             admissionNumber: admissionNo,
// //           },
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );

// //       setStudent(res.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   console.log("student", student);

// //   return (
// //     <>
// //       {/* ==========================================
// //         Header
// //     ========================================== */}

// //       <div
// //         className="shadow rounded mt-3 p-3"

// //       >
// //         <div className="row">
// //             <div className="col-md-8">
// //           <h4 className="mb-1">
// //             <strong>Fee Collection</strong>
// //           </h4>

// //           <nav aria-label="breadcrumb">
// //             <ol className="breadcrumb mb-0">
// //               <li className="breadcrumb-item">Home</li>
// //               <li className="breadcrumb-item">Fee</li>
// //               <li className="breadcrumb-item active">Fee Collection</li>
// //             </ol>
// //           </nav>
// //         </div>
// //         </div>
// //       </div>

// //       {/* =================================
// //       SEARCH
// //       ================================= */}

// //       <div className="mt-3">
// //         <div className="card shadow">
// //           <div className="card-header">
// //             <strong>Search Student For Collection</strong>
// //           </div>
// //           <div className="card-body">
// //             <div className="row">
// //               <div className="col-md-5">
// //                 <label>
// //                   <h6>Select Session:</h6>
// //                 </label>
// //                 <select
// //                   className="form-select"
// //                   value={selectedSession}
// //                   onChange={(e) => setSelectedSession(e.target.value)}
// //                 >
// //                   <option value="">Select Session</option>

// //                   {sessions.map((item) => (
// //                     <option key={item} value={item}>
// //                       {item}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //               <div className="col-md-5">
// //                 <label htmlFor="">
// //                   <h6>Admission No:</h6>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   onChange={(e) => setAdmissionNo(e.target.value)}
// //                 />
// //               </div>
// //               <div className="col-md-2 ">
// //                 <button className="btn btn-success mt-4" onClick={handleSearch}>
// //                   Search
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* SEARCHED STUDENT TABLE  */}

// //       <div className="shadow rounded mt-3">
// //         <div className="card">
// //           <div className="card-header">Student Details</div>
// //           <div className="card-body p-3 table-responsive">
// //             <table className="table table-bordered table-striped">
// //               <thead className="">
// //                 <tr>
// //                   <th>S.No</th>
// //                   <th>Admission No</th>
// //                   <th>Student Name</th>
// //                   <th>Student Class</th>
// //                   <th>Section</th>
// //                   <th>F.Name</th>
// //                   <th>M.Name</th>
// //                   <th>Mobile No</th>
// //                   <th>Address</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {student ? (
// //                   <tr>
// //                     <td></td>
// //                     <td>{student.admissionNumber}</td>
// //                     <td>
// //                       {student.firstName} {student.lastName}
// //                     </td>
// //                     <td>{student.studentClass}</td>
// //                     <td>{student.section}</td>
// //                     <td>{student.fatherName}</td>
// //                     <td>{student.motherName}</td>
// //                     <td>{student.mobile}</td>
// //                     <td>{student.address}</td>
// //                     <td>
// //                       <button
// //                         className="btn btn-danger"
// //                         onClick={() =>
// //                           navigate(
// //                             `/fee/feeCollection/${student.admissionNumber}`,
// //                           )
// //                         }
// //                       >
// //                         Collect
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   <tr>
// //                     <td colSpan="10" className="text-center">
// //                       No Student Found
// //                     </td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default FeeCollectionSearch;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const FeeCollectionSearch = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // ===============================
//   // States
//   // ===============================
//   const [sessions, setSessions] = useState([]);
//   const [selectedSession, setSelectedSession] = useState("");
//   const [admissionNo, setAdmissionNo] = useState("");

//   const [student, setStudent] = useState(null);

//   const [loading, setLoading] = useState(false);

//   // ===============================
//   // Load Master Data
//   // ===============================
//   useEffect(() => {
//     loadSessions();
//   }, []);

//   console.log("Sessions :", sessions);
//   console.log("Student :", student);
//   // ==========================================
//   // Load Sessions
//   // ==========================================
//   const loadSessions = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/master/sessions", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setSessions(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ==========================================
//   // Search Student
//   // ==========================================
//   const handleSearch = async () => {
//     if (!selectedSession || !admissionNo) {
//       alert("Please select session and enter admission number.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setStudent(null);

//       const res = await axios.get(
//         "http://localhost:8080/api/students/session-admission",
//         {
//           params: {
//             academicYear: selectedSession,
//             admissionNumber: admissionNo,
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
//   return (
//     <>
//       {/* /* ==========================================
//       Header
//   ========================================== */}

//       <div
//         className="row shadow"
//         style={{
//           background: "#fff",
//           margin: "10px",
//           borderRadius: "6px",
//           padding: "15px",
//         }}
//       >
//         <div className="col-md-8">
//           <h4 className="mb-1">
//             <strong>Fee Collection</strong>
//           </h4>

//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb mb-0">
//               <li className="breadcrumb-item">Home</li>
//               <li className="breadcrumb-item">Fee</li>
//               <li className="breadcrumb-item active">Fee Collection</li>
//             </ol>
//           </nav>
//         </div>
//       </div>

//       {/* ==========================================
//       Search Card
//   ========================================== */}

//       <div className="mt-3">
//         <div className="card shadow">
//           <div className="card-header">
//             <strong>Search Student For Collection</strong>
//           </div>

//           <div className="card-body">
//             <div className="row align-items-end">
//               {/* Session */}

//               <div className="col-md-5">
//                 <label className="form-label fw-bold">Select Session</label>

//                 <select
//                   className="form-select"
//                   value={selectedSession}
//                   onChange={(e) => setSelectedSession(e.target.value)}
//                 >
//                   <option value="">Select Session</option>

//                   {sessions.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Admission */}

//               <div className="col-md-5">
//                 <label className="form-label fw-bold">Admission Number</label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter Admission Number"
//                   value={admissionNo}
//                   onChange={(e) => setAdmissionNo(e.target.value)}
//                 />
//               </div>

//               {/* Search */}

//               <div className="col-md-2">
//                 <button
//                   className="btn btn-success w-100"
//                   onClick={handleSearch}
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <span
//                         className="spinner-border spinner-border-sm me-2"
//                         role="status"
//                       ></span>
//                       Searching...
//                     </>
//                   ) : (
//                     "Search"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* ==========================================
//           Loading
//       ========================================== */}

//       {/* {loading && (
//         <div className="card shadow mt-4">
//           <div
//             className="card-body text-center"
//             style={{ padding: "60px" }}
//           >
//             <div
//               className="spinner-border text-primary"
//               style={{ width: "4rem", height: "4rem" }}
//               role="status"
//             >
//               <span className="visually-hidden">Loading...</span>
//             </div>

//             <h5 className="mt-3">Searching Student...</h5>
//           </div>
//         </div>
//       )} */}

//       {/* ==========================================
//           Student Details
//       ========================================== */}
//       {loading && student.length === 0 ? (
//         <h6>Student Not Found</h6>
//       ) : (
//         <div className="card shadow mt-4">
//           <div className="card-header">
//             <strong>Student Details</strong>
//           </div>

//           <div className="card-body table-responsive">
//             <table className="table table-bordered table-striped align-middle">
//               <thead className="table-primary">
//                 <tr>
//                   <th>S.No</th>

//                   <th>Admission No</th>

//                   <th>Student Name</th>

//                   <th>Class</th>

//                   <th>Section</th>

//                   <th>Father Name</th>

//                   <th>Mother Name</th>

//                   <th>Mobile</th>

//                   <th>Address</th>

//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 <tr>
//                   <td>1</td>

//                   <td>{student.admissionNumber}</td>

//                   <td>
//                     {student.firstName} {student.lastName}
//                   </td>

//                   <td>{student.studentClass}</td>

//                   <td>{student.section}</td>

//                   <td>{student.fatherName}</td>

//                   <td>{student.motherName}</td>

//                   <td>{student.mobile}</td>

//                   <td>{student.address}</td>

//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() =>
//                         navigate(
//                           `/fee/feeCollection/${student.admissionNumber}`,
//                         )
//                       }
//                     >
//                       Collect Fee
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//       {/* ==========================================
//           No Student Found
//       ========================================== */}
//       {/* {!loading &&
//         student === null &&
//         selectedSession !== "" &&
//         admissionNo !== "" && (
//           <div className="card shadow mt-4">
//             <div className="card-body text-center p-5">
//               <h4 className="text-danger mb-2">
//                 Student Not Found
//               </h4>

//               <p className="text-muted mb-0">
//                 No student found for the selected session and
//                 admission number.
//               </p>
//             </div>
//           </div>
//         )} */}
//     </>
//   );
// };

// export default FeeCollectionSearch;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeeCollectionSearch = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ==========================================
  // States
  // ==========================================
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");

  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // ==========================================
  // Load Master Data
  // ==========================================
  useEffect(() => {
    loadSessions();
  }, []);

  console.log("Sessions :", sessions);
  console.log("Student :", student);

  // ==========================================
  // Load Sessions
  // ==========================================
  const loadSessions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/master/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSessions(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // ==========================================
  // Search Student
  // ==========================================
  const handleSearch = async () => {
    if (!selectedSession || !admissionNo) {
      alert("Please select session and enter admission number.");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      setStudent(null);

      const res = await axios.get(
        "http://localhost:8080/api/students/session-admission",
        {
          params: {
            academicYear: selectedSession,
            admissionNumber: admissionNo,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStudent(res.data);
    } catch (error) {
      console.log(error);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ==========================================
          Header
      ========================================== */}

      <div
        className="shadow rounded p-3"
        
      >
        <div className="row">
            <div className="col-md-8">
          <h4 className="mb-1">
            <strong>Fee Collection</strong>
          </h4>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">Fee</li>
              <li className="breadcrumb-item active">Fee Collection</li>
            </ol>
          </nav>
        </div>
        </div>
      </div>

      {/* ==========================================
          Search Card
      ========================================== */}

      <div className="mt-3">
        <div className="card shadow">
          <div className="card-header">
            <strong>Search Student For Collection</strong>
          </div>

          <div className="card-body">
            <div className="row align-items-end">
              {/* Session */}

              <div className="col-md-5">
                <label className="form-label fw-bold">Select Session</label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                >
                  <option value="">Select Session</option>

                  {sessions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Admission Number */}

              <div className="col-md-5">
                <label className="form-label fw-bold">Admission Number</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Admission Number"
                  value={admissionNo}
                  onChange={(e) => setAdmissionNo(e.target.value)}
                />
              </div>

              {/* Search Button */}

              <div className="col-md-2">
                <button
                  className="btn btn-success w-100"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Loading Spinner
      ========================================== */}

      {loading && (
        <div className="card shadow mt-4">
          <div className="card-body text-center" style={{ padding: "60px" }}>
            <div
              className="spinner-border text-primary"
              style={{ width: "4rem", height: "4rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>

            <h5 className="mt-3">Searching Student...</h5>

            <p className="text-muted mb-0">
              Please wait while fetching student details.
            </p>
          </div>
        </div>
      )}

      {/* ==========================================
          Student Details
      ========================================== */}

      {!loading && student && (
        <div className="card shadow mt-4">
          <div className="card-header">
            <strong>Student Details</strong>
          </div>

          <div className="card-body table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead className="table-primary">
                <tr>
                  <th>S.No</th>
                  <th>Admission No</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Father Name</th>
                  <th>Mother Name</th>
                  <th>Mobile</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>

                  <td>{student.admissionNumber}</td>

                  <td>
                    {student.firstName} {student.lastName}
                  </td>

                  <td>{student.studentClass}</td>

                  <td>{student.section}</td>

                  <td>{student.fatherName}</td>

                  <td>{student.motherName}</td>

                  <td>{student.mobile}</td>

                  <td>{student.address}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        navigate(
                          `/fee/feeCollection/${student.admissionNumber}`,
                        )
                      }
                    >
                      Collect Fee
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==========================================
          Student Not Found
      ========================================== */}

      {!loading && searched && !student && (
        <div className="card shadow mt-4">
          <div className="card-body text-center p-5">
            <div className="mb-3">
              <i
                className="bi bi-person-x-fill text-danger"
                style={{ fontSize: "60px" }}
              ></i>
            </div>

            <h4 className="text-danger">Student Not Found</h4>

            <p className="text-muted mb-0">
              No student found for the selected session and admission number.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FeeCollectionSearch;
