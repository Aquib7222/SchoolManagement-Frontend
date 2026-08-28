// import React, { useRef, useState } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { IoSearchSharp } from "react-icons/io5";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";
// import { FaRegEye, FaShieldAlt, FaUserCircle } from "react-icons/fa";
// import emblem from "../../assets/icon/emblem.png";
// import { IoMdClose, IoMdCloseCircleOutline } from "react-icons/io";

// const AdmissionNewAccounts = () => {
//   const { sessions, standards } = useMasters();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [students, setStudents] = useState([]);
//   const token = localStorage.getItem("token");
//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [SearchLoading, setSearchLoading] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const slipRef = useRef(null);

//   const studentsPerPage = 5;

//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

//   const currentStudents = students.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent,
//   );

//   const totalPages = Math.ceil(students.length / studentsPerPage);

//   // ✅ BACKEND SEARCH
//   const handleSearch = async () => {
//     try {
//       setSearchLoading(true);

//       const res = await axiosInstance.get("/api/students/search", {
//         params: {
//           academicYear: selectedSession || null,
//           studentClass: selectedStandard || null,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setStudents(res.data);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to fetch students");
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   // download pdf
//   const downloadPDF = async () => {
//     const element = slipRef.current;

//     const canvas = await html2canvas(element, {
//       scale: 2,
//       useCORS: true,
//     });

//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");

//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

//     pdf.save(
//       `${selectedStudent.firstName}_${selectedStudent.admissionNumber}.pdf`,
//     );
//   };

//   console.log(students);
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
//           <strong>Students New Accounts</strong>
//         </h6>
//         <nav aria-label="breadcrumb py-2">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                 Home
//               </a>
//             </li>
//             <li className="breadcrumb-item active">New Accounts</li>
//           </ol>
//         </nav>
//       </div>

//       <div className="d-flex gap-3 ms-2 me-2 mt-3 align-items-stretch">
//         {/* Left Side */}
//         <div
//           style={{
//             width: selectedStudent ? "50%" : "100%",
//             transition: "all .3s ease",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* Search Card */}
//           <div className="bg-white rounded shadow">
//             <div className="card p-3">
//               <div className="card-header gap-0 p-2">
//                 <h6>
//                   <IoSearchSharp size={25} /> Search Students for for Accounts
//                 </h6>
//                 <small>
//                   Find students by Admission Number or Name and generate
//                   accounts slip
//                 </small>
//               </div>

//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-md-4">
//                     <label>
//                       <h6>Search Students:</h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Search by Admission Number or Name"
//                     />
//                   </div>
//                   <div className="col-6 col-md-2">
//                     <label>
//                       <h6>Session:</h6>
//                     </label>
//                     <select
//                       className="form-select"
//                       value={selectedSession}
//                       onChange={(e) => setSelectedSession(e.target.value)}
//                     >
//                       <option value="">Select Session</option>
//                       {sessions.map((session) => (
//                         <option key={session} value={session}>
//                           {session}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-6 col-md-2">
//                     <label>
//                       <h6>Standard:</h6>
//                     </label>
//                     <select
//                       className="form-select"
//                       value={selectedStandard}
//                       onChange={(e) => setSelectedStandard(e.target.value)}
//                     >
//                       <option value="">Select Standard</option>
//                       {standards.map((standard) => (
//                         <option key={standard} value={standard}>
//                           {standard}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-md-2">
//                     <button
//                       className="btn btn-primary mt-4"
//                       onClick={handleSearch}
//                     >
//                       Search
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Student List */}
//           <div className="bg-white rounded shadow mt-3">
//             <div className="card">
//               <div className="card-header">
//                 <h6>Student List</h6>
//               </div>
//               <div className="card-body">
//                 <div className="table-responsive">
//                   <table className="table table-bordered table-hover   rounded">
//                     <thead className="table-info">
//                       <tr>
//                         <th>#</th>
//                         <th>Admission Number</th>
//                         <th>Student Name</th>
//                         <th>Class</th>
//                         <th>Section</th>

//                         <th>Father Name</th>
//                         <th>Mobile</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentStudents.map((student, index) => (
//                         <tr key={student.id}>
//                           <td>{index + 1}</td>
//                           <td>{student.admissionNumber}</td>
//                           <td>
//                             {student.firstName} {student.lastName}
//                           </td>
//                           <td>{student.studentClass}</td>
//                           <td>{student.section}</td>

//                           <td>{student.fatherName}</td>
//                           <td>{student.mobile}</td>
//                           <td>
//                             {student.status === "ACTIVE" ? (
//                               <span className="badge bg-success d-inline-flex align-items-center gap-1">
//                                 <FaShieldAlt size={12} />
//                                 Enrolled
//                               </span>
//                             ) : (
//                               <span className="badge bg-danger">
//                                 {student.status}
//                               </span>
//                             )}
//                           </td>
//                           <td>
//                             <button
//                               className="btn btn-info btn-sm"
//                               onClick={() => setSelectedStudent(student)}
//                             >
//                               <FaRegEye /> View
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="d-flex justify-content-between align-items-center mt-3">
//                   <button
//                     className="btn btn-outline-secondary"
//                     disabled={currentPage === 1}
//                     onClick={() => setCurrentPage(currentPage - 1)}
//                   >
//                     Previous
//                   </button>

//                   <span>
//                     Page {currentPage} of {totalPages}
//                   </span>

//                   <button
//                     className="btn btn-outline-secondary"
//                     disabled={currentPage === totalPages}
//                     onClick={() => setCurrentPage(currentPage + 1)}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {selectedStudent && (
//             <>
//               <div className="ms-2 me-2 mt-3 rounded shadow bg-white p-3">
//                 <div className="row justify-content-center">
//                   <div className="col-12 ">
//                     <div className="card border-0 mt-3 mb-3">
//                       <div className="card-header w-100 bg-info d-flex justify-content-between align-items-center">
//                         <h5 className="mb-0 text-white">Student Information</h5>
//                         <IoMdCloseCircleOutline
//                           size={25}
//                           className="color-white"
//                           onClick={() => setSelectedStudent(null)}
//                         />
//                       </div>

//                       <div className="card-body ">
//                         <div className="row align-items-center">
//                           <div
//                             className="col-md-7 text-center"
//                             style={{
//                               borderRight: "1px solid #ddd",
//                             }}
//                           >
//                             <p>
//                               <h5>
//                                 <strong>
//                                   {selectedStudent.firstName}{" "}
//                                   {selectedStudent.lastName}
//                                 </strong>
//                               </h5>
//                             </p>
//                             <p>
//                               <strong>Admission Number: </strong>
//                               {selectedStudent.admissionNumber}
//                             </p>

//                             <p>
//                               <strong>Class / Section: </strong>
//                               {selectedStudent.studentClass} /{" "}
//                               {selectedStudent.section}
//                             </p>
//                             <p>
//                               <strong>Session: </strong>
//                               {selectedStudent.academicYear}
//                             </p>

//                             <div className="d-flex justify-content-center mt-3 w-100">
//                               <button
//                                 className="btn btn-success"
//                                 onClick={downloadPDF}
//                               >
//                                 Print Account Slip
//                               </button>
//                             </div>
//                           </div>
//                           <div className="col-md-5 ps-4">
//                             <h6 className="fw-bold text-success mb-2">
//                               <strong>Account Information</strong>
//                             </h6>
//                             <p className="mb-1">
//                               <strong>User Id: </strong>
//                               {selectedStudent.email}
//                             </p>
//                             <p className="mb-1">
//                               <strong>Password: </strong>
//                               1234
//                             </p>
//                             <p className="mb-1">
//                               <strong>Role: </strong>
//                               STUDENT
//                             </p>
//                             <p className="mb-1">
//                               <strong>User Group: </strong>
//                               STUDENT USER
//                             </p>
//                             <p className="mb-1">
//                               <strong>Status: </strong>
//                               <span className="badge bg-success">
//                                 {selectedStudent.status}
//                               </span>
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Right Side */}
//         {selectedStudent && (
//           <div
//             ref={slipRef}
//             style={{
//               width: "48%",
//               maxWidth: "48%",
//               transition: "all .3s ease",
//               flexDirection: "column",

//               // overflowY: "auto",
//             }}
//           >
//             <div
//               className="bg-white rounded shadow p-3 account-slip"
//               style={{
//                 // position: "sticky",
//                 top: "80px",
//               }}
//             >
//               <div className="d-flex align-items-center justify-content-center  pb-3">
//                 {/* Left Side Logo */}
//                 <div className="me-3">
//                   <img src={emblem} alt="School Logo" width={75} height={75} />
//                 </div>

//                 {/* Right Side School Details */}
//                 <div>
//                   <h3
//                     className="fw-bold mb-1"
//                     style={{
//                       color: "#0B6B53",
//                       letterSpacing: "1px",
//                     }}
//                   >
//                     ABC PUBLIC SCHOOL
//                   </h3>
//                   <h6
//                     className="ms-4"
//                     style={{
//                       color: "#0B6B53",
//                       letterSpacing: "1px",
//                     }}
//                   >
//                     Knowledge . Excellence . Integrity
//                   </h6>

//                   <p className="mb-1 ms-5">
//                     Station Road, Siwan, Bihar - 841226
//                   </p>

//                   <small className="d-block">
//                     📞 +91-9876543210 | ✉ abcpublicschool@gmail.com
//                   </small>
//                 </div>
//               </div>
//               <h6
//                 className="mt-2 fw-bold bg-success rounded text-white text-center mx-auto"
//                 style={{
//                   width: "260px",
//                   padding: "8px",
//                 }}
//               >
//                 STUDENT ACCOUNT DETAILS
//               </h6>

//               <h6 className="text-end">
//                 Date: {new Date().toLocaleDateString()}
//               </h6>

//               <div className="card border-0 mt-3 mb-3">
//                 <div
//                   className="card-header w-50"
//                   style={{
//                     background: "#0B6B53",
//                     color: "white",
//                     borderTopLeftRadius: "8px",
//                     borderTopRightRadius: "8px",
//                     borderBottomLeftRadius: "0",
//                     borderBottomRightRadius: "0",
//                   }}
//                 >
//                   <h6 className="mb-0 text-center">Student Information</h6>
//                 </div>

//                 <div
//                   className="card-body border border-dark"
//                   style={{
//                     borderTopLeftRadius: "0",
//                     borderTopRightRadius: "8px",
//                     borderBottomLeftRadius: "8px",
//                     borderBottomRightRadius: "8px",
//                     marginTop: "-1px", // header aur body ka border join ho jayega
//                   }}
//                 >
//                   <div className="row">
//                     <div
//                       className="col-md-6"
//                       style={{ borderRight: "1px solid #bebbbb" }}
//                     >
//                       <p>
//                         <strong>Admission Number: </strong>
//                         {selectedStudent.admissionNumber}
//                       </p>
//                       <p>
//                         <strong>Student Name: </strong>
//                         {selectedStudent.firstName} {selectedStudent.lastName}
//                       </p>
//                       <p>
//                         <strong>Class / Section: </strong>
//                         {selectedStudent.studentClass} /{" "}
//                         {selectedStudent.section}
//                       </p>
//                       <p>
//                         <strong>Father's Name: </strong>
//                         {selectedStudent.fatherName}
//                       </p>
//                       <p>
//                         <strong>Mother's Name: </strong>
//                         {selectedStudent.motherName}
//                       </p>
//                     </div>
//                     <div className="col-md-4">
//                       <p>
//                         <strong>Roll Number: </strong>
//                         {selectedStudent.admissionNumber}
//                       </p>
//                       <p>
//                         <strong>Session: </strong>
//                         {selectedStudent.academicYear}
//                       </p>
//                       <p>
//                         <strong>Gender: </strong>
//                         {selectedStudent.gender}
//                       </p>
//                       <p>
//                         <strong>Contact: </strong>
//                         {selectedStudent.mobile}
//                       </p>
//                     </div>
//                     <div className="col-md-2">
//                       <img
//                         className="rounded-circle border border-dark"
//                         style={{
//                           width: "70px",
//                           height: "70px",
//                           objectFit: "cover",
//                         }}
//                         src={selectedStudent.photo}
//                         alt="Student Photo"
                        
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="card border-0 mt-3 mb-3">
//                 <div
//                   className="card-header w-50"
//                   style={{
//                     background: "#0B6B53",
//                     color: "white",
//                     borderTopLeftRadius: "8px",
//                     borderTopRightRadius: "8px",
//                     borderBottomLeftRadius: "0",
//                     borderBottomRightRadius: "0",
//                   }}
//                 >
//                   <h6 className="mb-0 text-center">Login Credentials</h6>
//                 </div>

//                 <div
//                   className="card-body border border-dark"
//                   style={{
//                     borderTopLeftRadius: "0",
//                     borderTopRightRadius: "8px",
//                     borderBottomLeftRadius: "8px",
//                     borderBottomRightRadius: "8px",
//                     marginTop: "-1px", // header aur body ka border join ho jayega
//                   }}
//                 >
//                   <div className="row">
//                     <div className="col-md-6">
//                       <p>
//                         <strong>User Id: </strong>
//                         {selectedStudent.email}
//                       </p>
//                       <p>
//                         <strong>Password: </strong>
//                         1234
//                       </p>
//                       <p>
//                         <strong> </strong>
//                         Change after first login
//                       </p>
//                     </div>
//                     <div className="col-md-4">
//                       <p>
//                         <strong>Role: </strong>
//                         STUDENT
//                       </p>
//                       <p>
//                         <strong>User Group: </strong>
//                         STUDENT USER
//                       </p>
//                       <p>
//                         <strong>Status: </strong>
//                         {selectedStudent.status}
//                       </p>
//                     </div>
//                     <div className="col-md-2"></div>
//                   </div>
//                 </div>
//               </div>

//               <div className="card border-0 mt-3 mb-3">
//                 <div
//                   className="card-header w-50"
//                   style={{
//                     background: "#0B6B53",
//                     color: "white",
//                     borderTopLeftRadius: "8px",
//                     borderTopRightRadius: "8px",
//                     borderBottomLeftRadius: "0",
//                     borderBottomRightRadius: "0",
//                   }}
//                 >
//                   <h6 className="mb-0 text-center">Terms & Conditions</h6>
//                 </div>

//                 <div
//                   className="card-body border border-dark py-2 px-3"
//                   style={{
//                     borderTopLeftRadius: "0",
//                     borderTopRightRadius: "8px",
//                     borderBottomLeftRadius: "8px",
//                     borderBottomRightRadius: "8px",
//                     marginTop: "-1px", // header aur body ka border join ho jayega
//                   }}
//                 >
//                   <div className="row">
//                     <ul
//                       style={{
//                         fontSize: "12px",
//                         lineHeight: "1.4",
//                         paddingLeft: "18px",
//                         marginBottom: "8px",
//                       }}
//                     >
//                       <li>Use this account only for School ERP Portal.</li>

//                       <li>Do not share your User ID and Password.</li>

//                       <li>Change your password after first login.</li>

//                       <li>Contact school administration for support.</li>

//                       <li>School is not responsible for account misuse.</li>

//                       <li>Valid only for current academic session.</li>
//                     </ul>

//                     <div className="alert alert-info py-2 mb-0">
//                       I agree to the above terms & conditions.
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <p
//                 className="text-center mt-2 mb-0"
//                 style={{
//                   fontSize: "12px",
//                 }}
//               >
//                 "Education is most powerfull weapon which can you use to change
//                 the world."
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Student Details Card */}
//     </>
//   );
// };

// export default AdmissionNewAccounts;



import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  IoSearchSharp,
  IoClose,
  IoPrintOutline,
} from "react-icons/io5";
import {
  FaRegEye,
  FaShieldAlt,
  FaUserCircle,
  FaFilePdf,
} from "react-icons/fa";

import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";
import emblem from "../../assets/icon/emblem.png";

const AdmissionNewAccounts = () => {
  const { sessions, standards } = useMasters();

  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [searchText, setSearchText] = useState("");

  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const slipRef = useRef(null);

  const token = localStorage.getItem("token");

  const studentsPerPage = 5;

  /* =========================================================
     SEARCH STUDENTS
  ========================================================= */

  const handleSearch = async () => {
    try {
      setSearchLoading(true);
      setCurrentPage(1);

      const res = await axiosInstance.get("/api/students/search", {
        params: {
          academicYear: selectedSession || null,
          studentClass: selectedStandard || null,
          search: searchText || null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data || []);
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
          "Failed to fetch students"
      );
    } finally {
      setSearchLoading(false);
    }
  };

  /* =========================================================
     CLEAR FILTER
  ========================================================= */

  const handleClear = () => {
    setSelectedSession("");
    setSelectedStandard("");
    setSearchText("");
    setStudents([]);
    setCurrentPage(1);
    setSelectedStudent(null);
  };

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(students.length / studentsPerPage)
  );

  const indexOfLastStudent =
    currentPage * studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage;

  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  /* =========================================================
     VIEW STUDENT
  ========================================================= */

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  /* =========================================================
     DOWNLOAD PDF
  ========================================================= */

  const downloadPDF = async () => {
    if (!slipRef.current || !selectedStudent) return;

    try {
      const element = slipRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight =
        (canvas.height * pdfWidth) / canvas.width;

      const pageHeight =
        pdf.internal.pageSize.getHeight();

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        pdfWidth,
        pdfHeight
      );

      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;

        pdf.addPage();

        pdf.addImage(
          imgData,
          "PNG",
          0,
          position,
          pdfWidth,
          pdfHeight
        );

        heightLeft -= pageHeight;
      }

      pdf.save(
        `${selectedStudent.firstName || "Student"}_${
          selectedStudent.admissionNumber || "Account"
        }.pdf`
      );
    } catch (error) {
      console.error(error);
      alert("Unable to generate account slip.");
    }
  };
const PRIMARY = "rgb(30, 58, 138)";
  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div
        className="row shadow"
        style={{
          backgroundColor: "white",
          margin: "10px",
          minHeight: "70px",
          borderRadius: "6px",
          padding: "10px 15px",
          color: "black",
          borderLeft: `4px solid ${PRIMARY}`,
        }}
      >
        <h6 className="mb-1">
          <strong>Student New Accounts</strong>
        </h6>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "#555",
                }}
              >
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "#555",
                }}
              >
                Admission
              </a>
            </li>

            <li
              className="breadcrumb-item active"
              aria-current="page"
              style={{
                color: PRIMARY,
                fontWeight: "500",
              }}
            >
              New Accounts
            </li>
          </ol>
        </nav>
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="ms-2 me-2 mt-3">
        <div
          className="d-flex gap-3 align-items-start"
          style={{
            flexWrap: selectedStudent ? "nowrap" : "wrap",
          }}
        >
          {/* =================================================
              LEFT SECTION
          ================================================= */}

          <div
            style={{
              width: selectedStudent ? "52%" : "100%",
              transition: "all .3s ease",
            }}
          >
            {/* ===============================================
                SEARCH CARD
            =============================================== */}

            <div
              className="bg-white rounded-3 shadow"
              style={{
                border: "1px solid #edf0f5",
              }}
            >
              <div
                className="p-3"
                style={{
                  borderBottom: "1px solid #edf0f5",
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "9px",
                      background: "#eef4ff",
                      color: "#2563eb",
                    }}
                  >
                    <IoSearchSharp size={21} />
                  </div>

                  <div>
                    <h6
                      className="mb-0 fw-bold"
                      style={{ color: "#1f2937" }}
                    >
                      Search Students
                    </h6>

                    <small
                      style={{
                        color: "#8b95a7",
                        fontSize: "11px",
                      }}
                    >
                      Find students and generate account slips
                    </small>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <div className="row g-3 align-items-end">
                  {/* Search */}
                  <div className="col-xl-4 col-md-6">
                    <label className="form-label small fw-semibold">
                      Student Search
                    </label>

                    <div className="position-relative">
                      <IoSearchSharp
                        className="position-absolute"
                        style={{
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#9ca3af",
                        }}
                      />

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Admission No / Name"
                        value={searchText}
                        onChange={(e) =>
                          setSearchText(e.target.value)
                        }
                        style={{
                          paddingLeft: "36px",
                          borderRadius: "7px",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                  </div>

                  {/* Session */}
                  <div className="col-xl-3 col-md-6">
                    <label className="form-label small fw-semibold">
                      Session
                    </label>

                    <select
                      className="form-select"
                      value={selectedSession}
                      onChange={(e) => {
                        setSelectedSession(e.target.value);
                        setCurrentPage(1);
                      }}
                      style={{
                        borderRadius: "7px",
                        fontSize: "13px",
                      }}
                    >
                      <option value="">
                        Select Session
                      </option>

                      {sessions?.map((session) => (
                        <option
                          key={session}
                          value={session}
                        >
                          {session}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Standard */}
                  <div className="col-xl-3 col-md-6">
                    <label className="form-label small fw-semibold">
                      Standard
                    </label>

                    <select
                      className="form-select"
                      value={selectedStandard}
                      onChange={(e) => {
                        setSelectedStandard(e.target.value);
                        setCurrentPage(1);
                      }}
                      style={{
                        borderRadius: "7px",
                        fontSize: "13px",
                      }}
                    >
                      <option value="">
                        Select Standard
                      </option>

                      {standards?.map((standard) => (
                        <option
                          key={standard}
                          value={standard}
                        >
                          {standard}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="col-xl-2 col-md-6">
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary flex-grow-1"
                        onClick={handleSearch}
                        disabled={searchLoading}
                        style={{
                          borderRadius: "7px",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {searchLoading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-1"
                              role="status"
                            />
                            Search
                          </>
                        ) : (
                          <>
                            <IoSearchSharp className="me-1" />
                            Search
                          </>
                        )}
                      </button>

                      <button
                        className="btn btn-light"
                        title="Clear"
                        onClick={handleClear}
                        style={{
                          border: "1px solid #e5e7eb",
                          borderRadius: "7px",
                        }}
                      >
                        <IoClose size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===============================================
                STUDENT LIST CARD
            =============================================== */}

            <div
              className="bg-white rounded-3 shadow mt-3"
              style={{
                border: "1px solid #edf0f5",
              }}
            >
              <div
                className="d-flex justify-content-between align-items-center p-3"
                style={{
                  borderBottom: "1px solid #edf0f5",
                }}
              >
                <div>
                  <h6
                    className="mb-1 fw-bold"
                    style={{ color: "#1f2937" }}
                  >
                    Student List
                  </h6>

                  <small
                    style={{
                      color: "#8b95a7",
                      fontSize: "11px",
                    }}
                  >
                    Students available for account management
                  </small>
                </div>

                <span
                  className="badge"
                  style={{
                    background: "#eef4ff",
                    color: "#2563eb",
                    padding: "7px 11px",
                    borderRadius: "20px",
                    fontSize: "11px",
                  }}
                >
                  {students.length} Students
                </span>
              </div>

              <div className="p-3">
                <div className="table-responsive">
                  <table
                    className="table table-hover align-middle mb-0"
                    style={{
                      minWidth: "850px",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#f8fafc",
                        }}
                      >
                        <th
                          className="small text-muted"
                          style={{ padding: "12px" }}
                        >
                          #
                        </th>

                        <th
                          className="small text-muted"
                          style={{ padding: "12px" }}
                        >
                          Admission No
                        </th>

                        <th
                          className="small text-muted"
                          style={{ padding: "12px" }}
                        >
                          Student
                        </th>

                        <th
                          className="small text-muted"
                          style={{ padding: "12px" }}
                        >
                          Class
                        </th>

                        <th
                          className="small text-muted"
                          style={{ padding: "12px" }}
                        >
                          Section
                        </th>

                        <th
                          className="small text-muted"
                          style={{ padding: "12px" }}
                        >
                          Father Name
                        </th>

                        <th
                          className="small text-muted"
                          style={{ padding: "12px" }}
                        >
                          Mobile
                        </th>

                        <th
                          className="small text-muted"
                          style={{ padding: "12px" }}
                        >
                          Status
                        </th>

                        <th
                          className="small text-muted text-center"
                          style={{ padding: "12px" }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {searchLoading ? (
                        <tr>
                          <td
                            colSpan="9"
                            className="text-center py-5"
                          >
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            />

                            <div className="small text-muted mt-2">
                              Loading students...
                            </div>
                          </td>
                        </tr>
                      ) : currentStudents.length > 0 ? (
                        currentStudents.map(
                          (student, index) => (
                            <tr key={student.id}>
                              <td
                                style={{
                                  color: "#6b7280",
                                  fontSize: "13px",
                                }}
                              >
                                {indexOfFirstStudent +
                                  index +
                                  1}
                              </td>

                              <td>
                                <span
                                  className="fw-semibold"
                                  style={{
                                    color: "#2563eb",
                                    fontSize: "13px",
                                  }}
                                >
                                  {student.admissionNumber ||
                                    "-"}
                                </span>
                              </td>

                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  {student.photo ? (
                                    <img
                                      src={student.photo}
                                      alt="Student"
                                      style={{
                                        width: "34px",
                                        height: "34px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border:
                                          "1px solid #e5e7eb",
                                      }}
                                    />
                                  ) : (
                                    <FaUserCircle
                                      size={34}
                                      color="#cbd5e1"
                                    />
                                  )}

                                  <div>
                                    <div
                                      className="fw-semibold"
                                      style={{
                                        color: "#374151",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {student.firstName || ""}{" "}
                                      {student.middleName || ""}{" "}
                                      {student.lastName || ""}
                                    </div>

                                    <small
                                      style={{
                                        color: "#9ca3af",
                                        fontSize: "10px",
                                      }}
                                    >
                                      Student
                                    </small>
                                  </div>
                                </div>
                              </td>

                              <td
                                style={{
                                  fontSize: "13px",
                                }}
                              >
                                {student.studentClass || "-"}
                              </td>

                              <td
                                style={{
                                  fontSize: "13px",
                                }}
                              >
                                {student.section || "-"}
                              </td>

                              <td
                                style={{
                                  fontSize: "13px",
                                }}
                              >
                                {student.fatherName || "-"}
                              </td>

                              <td
                                style={{
                                  fontSize: "13px",
                                }}
                              >
                                {student.mobile ||
                                  student.preferredNo ||
                                  "-"}
                              </td>

                              <td>
                                {student.status ===
                                "ACTIVE" ? (
                                  <span
                                    className="badge d-inline-flex align-items-center gap-1"
                                    style={{
                                      background: "#e8f8ef",
                                      color: "#198754",
                                      border:
                                        "1px solid #c8efd8",
                                      padding:
                                        "6px 9px",
                                      borderRadius:
                                        "20px",
                                      fontSize: "10px",
                                    }}
                                  >
                                    <FaShieldAlt size={10} />
                                    Enrolled
                                  </span>
                                ) : (
                                  <span
                                    className="badge"
                                    style={{
                                      background: "#fff1f2",
                                      color: "#dc3545",
                                      padding:
                                        "6px 9px",
                                      borderRadius:
                                        "20px",
                                      fontSize: "10px",
                                    }}
                                  >
                                    {student.status || "-"}
                                  </span>
                                )}
                              </td>

                              <td className="text-center">
                                <button
                                  className="btn btn-sm"
                                  onClick={() =>
                                    handleViewStudent(
                                      student
                                    )
                                  }
                                  style={{
                                    background:
                                      "#eef4ff",
                                    color: "#2563eb",
                                    border: "1px solid #dbe7ff",
                                    borderRadius: "6px",
                                    fontSize: "12px",
                                  }}
                                >
                                  <FaRegEye className="me-1" />
                                  View
                                </button>
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td
                            colSpan="9"
                            className="text-center py-5"
                          >
                            <div
                              className="d-flex flex-column align-items-center"
                              style={{
                                color: "#9ca3af",
                              }}
                            >
                              <FaUserCircle
                                size={45}
                                className="mb-2"
                                color="#dbe1ea"
                              />

                              <span
                                style={{
                                  fontSize: "13px",
                                }}
                              >
                                No students found
                              </span>

                              <small
                                style={{
                                  fontSize: "11px",
                                }}
                              >
                                Search students using
                                the filters above.
                              </small>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* ===========================================
                    PAGINATION
                =========================================== */}

                {students.length > 0 && (
                  <div
                    className="d-flex justify-content-between align-items-center mt-3 pt-3"
                    style={{
                      borderTop: "1px solid #edf0f5",
                    }}
                  >
                    <small
                      style={{
                        color: "#8b95a7",
                      }}
                    >
                      Showing{" "}
                      <strong>
                        {indexOfFirstStudent + 1}
                      </strong>{" "}
                      -{" "}
                      <strong>
                        {Math.min(
                          indexOfLastStudent,
                          students.length
                        )}
                      </strong>{" "}
                      of{" "}
                      <strong>{students.length}</strong>
                    </small>

                    <div className="d-flex gap-2 align-items-center">
                      <button
                        className="btn btn-sm btn-light"
                        disabled={currentPage === 1}
                        onClick={() =>
                          setCurrentPage((p) =>
                            Math.max(1, p - 1)
                          )
                        }
                        style={{
                          border: "1px solid #e5e7eb",
                        }}
                      >
                        Previous
                      </button>

                      <span
                        className="px-2"
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                        }}
                      >
                        Page{" "}
                        <strong>
                          {currentPage}
                        </strong>{" "}
                        of{" "}
                        <strong>
                          {totalPages}
                        </strong>
                      </span>

                      <button
                        className="btn btn-sm btn-primary"
                        disabled={
                          currentPage === totalPages
                        }
                        onClick={() =>
                          setCurrentPage((p) =>
                            Math.min(
                              totalPages,
                              p + 1
                            )
                          )
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ===============================================
                STUDENT INFORMATION CARD
            =============================================== */}

            {selectedStudent && (
              <div
                className="bg-white rounded-3 shadow mt-3"
                style={{
                  border: "1px solid #edf0f5",
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-center p-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #2563eb, #4f46e5)",
                    borderRadius:
                      "10px 10px 0 0",
                  }}
                >
                  <div>
                    <h6 className="mb-0 text-white fw-bold">
                      Student Information
                    </h6>

                    <small
                      className="text-white"
                      style={{ opacity: 0.8 }}
                    >
                      Account details
                    </small>
                  </div>

                  <button
                    className="btn btn-sm text-white"
                    onClick={() =>
                      setSelectedStudent(null)
                    }
                    style={{
                      background:
                        "rgba(255,255,255,.15)",
                      border: "1px solid rgba(255,255,255,.25)",
                      borderRadius: "6px",
                    }}
                  >
                    <IoClose size={18} />
                  </button>
                </div>

                <div className="p-3">
                  <div className="row align-items-center">
                    <div className="col-md-7 text-center border-end">
                      {selectedStudent.photo ? (
                        <img
                          src={selectedStudent.photo}
                          alt="Student"
                          className="rounded-circle mb-2"
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            border:
                              "3px solid #eef4ff",
                          }}
                        />
                      ) : (
                        <FaUserCircle
                          size={70}
                          color="#cbd5e1"
                          className="mb-2"
                        />
                      )}

                      <h5 className="fw-bold mb-2">
                        {selectedStudent.firstName}{" "}
                        {selectedStudent.middleName || ""}{" "}
                        {selectedStudent.lastName}
                      </h5>

                      <p className="mb-1 small">
                        <strong>
                          Admission Number:
                        </strong>{" "}
                        {selectedStudent.admissionNumber ||
                          "-"}
                      </p>

                      <p className="mb-1 small">
                        <strong>
                          Class / Section:
                        </strong>{" "}
                        {selectedStudent.studentClass ||
                          "-"}{" "}
                        /{" "}
                        {selectedStudent.section ||
                          "-"}
                      </p>

                      <p className="mb-1 small">
                        <strong>Session:</strong>{" "}
                        {selectedStudent.academicYear ||
                          "-"}
                      </p>

                      <button
                        className="btn btn-success mt-3"
                        onClick={downloadPDF}
                        style={{
                          borderRadius: "7px",
                          fontSize: "12px",
                        }}
                      >
                        <FaFilePdf className="me-1" />
                        Print Account Slip
                      </button>
                    </div>

                    <div className="col-md-5 ps-md-4 mt-3 mt-md-0">
                      <h6
                        className="fw-bold mb-3"
                        style={{
                          color: "#198754",
                        }}
                      >
                        Account Information
                      </h6>

                      <p className="small mb-2">
                        <strong>User ID:</strong>{" "}
                        {selectedStudent.email ||
                          selectedStudent.admissionNumber ||
                          "-"}
                      </p>

                      <p className="small mb-2">
                        <strong>Password:</strong>{" "}
                        <span className="badge bg-light text-dark">
                          1234
                        </span>
                      </p>

                      <p className="small mb-2">
                        <strong>Role:</strong>{" "}
                        STUDENT
                      </p>

                      <p className="small mb-2">
                        <strong>User Group:</strong>{" "}
                        STUDENT USER
                      </p>

                      <p className="small mb-0">
                        <strong>Status:</strong>{" "}
                        <span className="badge bg-success">
                          {selectedStudent.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =================================================
              RIGHT ACCOUNT SLIP
          ================================================= */}

          {selectedStudent && (
            <div
              ref={slipRef}
              style={{
                width: "48%",
                maxWidth: "48%",
                transition: "all .3s ease",
              }}
            >
              <div
                className="bg-white rounded-3 shadow p-4"
                style={{
                  border: "1px solid #e5e7eb",
                }}
              >
                {/* =========================================
                    SCHOOL HEADER
                ========================================= */}

                <div
                  className="text-center pb-3"
                  style={{
                    borderBottom:
                      "2px solid #0B6B53",
                  }}
                >
                  <img
                    src={emblem}
                    alt="School Logo"
                    width="68"
                    height="68"
                    style={{
                      objectFit: "contain",
                    }}
                  />

                  <h3
                    className="fw-bold mb-1 mt-2"
                    style={{
                      color: "#0B6B53",
                      letterSpacing: "1px",
                      fontSize: "20px",
                    }}
                  >
                    ABC PUBLIC SCHOOL
                  </h3>

                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "11px",
                    }}
                  >
                    Knowledge • Excellence • Integrity
                  </div>

                  <p
                    className="mb-1 mt-2"
                    style={{
                      fontSize: "11px",
                      color: "#4b5563",
                    }}
                  >
                    Station Road, Siwan, Bihar -
                    841226
                  </p>

                  <small
                    style={{
                      fontSize: "10px",
                      color: "#6b7280",
                    }}
                  >
                    +91-9876543210 |{" "}
                    abcpublicschool@gmail.com
                  </small>
                </div>

                {/* =========================================
                    TITLE
                ========================================= */}

                <div className="text-center mt-3">
                  <span
                    className="d-inline-block fw-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #0B6B53, #198754)",
                      padding: "8px 22px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      letterSpacing: ".5px",
                    }}
                  >
                    STUDENT ACCOUNT DETAILS
                  </span>
                </div>

                <div
                  className="text-end mt-2"
                  style={{
                    fontSize: "10px",
                    color: "#6b7280",
                  }}
                >
                  Date:{" "}
                  {new Date().toLocaleDateString()}
                </div>

                {/* =========================================
                    STUDENT INFORMATION
                ========================================= */}

                <div className="mt-3">
                  <div
                    className="fw-bold text-white text-center py-2"
                    style={{
                      background: "#0B6B53",
                      width: "50%",
                      minWidth: "180px",
                      borderRadius:
                        "7px 7px 0 0",
                      fontSize: "12px",
                    }}
                  >
                    Student Information
                  </div>

                  <div
                    className="p-3"
                    style={{
                      border:
                        "1px solid #0B6B53",
                      borderRadius:
                        "0 7px 7px 7px",
                    }}
                  >
                    <div className="row">
                      <div
                        className="col-7"
                        style={{
                          borderRight:
                            "1px solid #e5e7eb",
                        }}
                      >
                        <p className="small mb-2">
                          <strong>
                            Admission Number:
                          </strong>
                          <br />
                          {
                            selectedStudent.admissionNumber
                          }
                        </p>

                        <p className="small mb-2">
                          <strong>
                            Student Name:
                          </strong>
                          <br />
                          {
                            selectedStudent.firstName
                          }{" "}
                          {
                            selectedStudent.middleName ||
                            ""
                          }{" "}
                          {
                            selectedStudent.lastName
                          }
                        </p>

                        <p className="small mb-2">
                          <strong>
                            Class / Section:
                          </strong>
                          <br />
                          {
                            selectedStudent.studentClass
                          }{" "}
                          /{" "}
                          {selectedStudent.section ||
                            "-"}
                        </p>

                        <p className="small mb-2">
                          <strong>
                            Father's Name:
                          </strong>
                          <br />
                          {selectedStudent.fatherName ||
                            "-"}
                        </p>

                        <p className="small mb-0">
                          <strong>
                            Mother's Name:
                          </strong>
                          <br />
                          {selectedStudent.motherName ||
                            "-"}
                        </p>
                      </div>

                      <div className="col-5 ps-3">
                        <p className="small mb-2">
                          <strong>
                            Roll Number:
                          </strong>
                          <br />
                          {selectedStudent.rollNumber ||
                            "-"}
                        </p>

                        <p className="small mb-2">
                          <strong>Session:</strong>
                          <br />
                          {
                            selectedStudent.academicYear
                          }
                        </p>

                        <p className="small mb-2">
                          <strong>Gender:</strong>
                          <br />
                          {selectedStudent.gender ||
                            "-"}
                        </p>

                        <p className="small mb-2">
                          <strong>Contact:</strong>
                          <br />
                          {selectedStudent.mobile ||
                            selectedStudent.preferredNo ||
                            "-"}
                        </p>

                        <div className="text-center mt-2">
                          {selectedStudent.photo ? (
                            <img
                              src={
                                selectedStudent.photo
                              }
                              alt="Student"
                              style={{
                                width: "58px",
                                height: "58px",
                                objectFit: "cover",
                                borderRadius: "7px",
                                border:
                                  "1px solid #9ca3af",
                              }}
                            />
                          ) : (
                            <FaUserCircle
                              size={58}
                              color="#cbd5e1"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =========================================
                    LOGIN CREDENTIALS
                ========================================= */}

                <div className="mt-3">
                  <div
                    className="fw-bold text-white text-center py-2"
                    style={{
                      background: "#0B6B53",
                      width: "50%",
                      minWidth: "180px",
                      borderRadius:
                        "7px 7px 0 0",
                      fontSize: "12px",
                    }}
                  >
                    Login Credentials
                  </div>

                  <div
                    className="p-3"
                    style={{
                      border:
                        "1px solid #0B6B53",
                      borderRadius:
                        "0 7px 7px 7px",
                    }}
                  >
                    <div className="row">
                      <div className="col-7">
                        <p className="small mb-2">
                          <strong>User ID:</strong>
                          <br />
                          {selectedStudent.email ||
                            selectedStudent.admissionNumber ||
                            "-"}
                        </p>

                        <p className="small mb-2">
                          <strong>Password:</strong>
                          <br />
                          <span
                            style={{
                              fontFamily:
                                "monospace",
                              letterSpacing: "2px",
                            }}
                          >
                            1234
                          </span>
                        </p>

                        <small
                          style={{
                            color: "#dc3545",
                            fontSize: "9px",
                          }}
                        >
                          Change password after first
                          login.
                        </small>
                      </div>

                      <div className="col-5">
                        <p className="small mb-2">
                          <strong>Role:</strong>
                          <br />
                          STUDENT
                        </p>

                        <p className="small mb-2">
                          <strong>User Group:</strong>
                          <br />
                          STUDENT USER
                        </p>

                        <p className="small mb-0">
                          <strong>Status:</strong>
                          <br />
                          <span className="badge bg-success">
                            {selectedStudent.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =========================================
                    TERMS & CONDITIONS
                ========================================= */}

                <div className="mt-3">
                  <div
                    className="fw-bold text-white text-center py-2"
                    style={{
                      background: "#0B6B53",
                      width: "50%",
                      minWidth: "180px",
                      borderRadius:
                        "7px 7px 0 0",
                      fontSize: "12px",
                    }}
                  >
                    Terms & Conditions
                  </div>

                  <div
                    className="p-3"
                    style={{
                      border:
                        "1px solid #0B6B53",
                      borderRadius:
                        "0 7px 7px 7px",
                    }}
                  >
                    <ul
                      style={{
                        fontSize: "9px",
                        lineHeight: "1.6",
                        paddingLeft: "17px",
                        marginBottom: "8px",
                        color: "#4b5563",
                      }}
                    >
                      <li>
                        Use this account only for
                        School ERP Portal.
                      </li>

                      <li>
                        Do not share your User ID
                        and Password.
                      </li>

                      <li>
                        Change your password after
                        first login.
                      </li>

                      <li>
                        Contact school administration
                        for support.
                      </li>

                      <li>
                        School is not responsible
                        for account misuse.
                      </li>

                      <li>
                        Valid only for current
                        academic session.
                      </li>
                    </ul>

                    <div
                      className="p-2"
                      style={{
                        background: "#eef8ff",
                        border:
                          "1px solid #cfe8ff",
                        borderRadius: "5px",
                        fontSize: "9px",
                        color: "#2563eb",
                      }}
                    >
                      I agree to the above terms &
                      conditions.
                    </div>
                  </div>
                </div>

                {/* =========================================
                    FOOTER
                ========================================= */}

                <div
                  className="text-center mt-3 pt-2"
                  style={{
                    borderTop:
                      "1px dashed #cbd5e1",
                    fontSize: "9px",
                    color: "#6b7280",
                  }}
                >
                  "Education is the most powerful
                  weapon which you can use to change
                  the world."
                </div>

                <div className="text-center mt-2">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={downloadPDF}
                    style={{
                      borderRadius: "6px",
                      fontSize: "10px",
                    }}
                  >
                    <IoPrintOutline className="me-1" />
                    Print / Save PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdmissionNewAccounts;

