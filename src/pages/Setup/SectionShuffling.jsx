// import React, { useState } from "react";
// import { FaArrowDown, FaRegEye, FaShuffle } from "react-icons/fa6";
// import useMasters from "../../hooks/useMasters";
// import { IoPrintOutline, IoSearchOutline } from "react-icons/io5";
// import { TbRepeat } from "react-icons/tb";
// import { useStudents } from "../../context/StudentContext";
// import { HiUsers } from "react-icons/hi2";
// import { IoIosArrowDown } from "react-icons/io";
// import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
// import { MdArrowCircleDown, MdOutlinePictureAsPdf } from "react-icons/md";
// import { RiErrorWarningFill } from "react-icons/ri";
// import axiosInstance from "../../api/axiosInstance";

// const SectionShuffling = () => {
//   // load from custom hooks
//   const { sessions, standards, sections } = useMasters();
//   const { students, loadStudents, loading } = useStudents();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user.schoolId;
//   console.log("school id in section shuffling", schoolId);

//   //   selected usestate
//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [selectedNewSection, setSelectedNewSection] = useState("");
//   const [admissionNumber, selectedAdmissionNumber] = useState("");
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [sectionloading, setLoading] = useState(false);

//   console.log("selected Student", selectedStudents);

//   //   handle search students
//   const handleSearch = () => {
//     if (!selectedSession || !selectedStandard || !selectedSection) {
//       return;
//     }

//     loadStudents(selectedSession, selectedStandard, selectedSection);
//   };

//   console.log("students in section shuffling ", students);

//   //   handle reset

//   const handleReset = () => {
//     setSelectedNewSection("");
//     setSelectedSection("");
//     setSelectedSession("");
//     setSelectedStandard("");

//   };

//   const exportOptions = {
//     excel: {
//       label: "Export Excel",
//       icon: <PiMicrosoftExcelLogoBold color="green" size={18} />,
//     },

//     pdf: {
//       label: "Export PDF",
//       icon: <MdOutlinePictureAsPdf color="red" size={18} />,
//     },

//     print: {
//       label: "Print",
//       icon: <IoPrintOutline color="#0d6efd" size={18} />,
//     },
//   };

//   const [selectedExport, setSelectedExport] = useState(exportOptions.excel);

//   const handleExport = (type) => {
//     setSelectedExport(exportOptions[type]);

//     switch (type) {
//       case "excel":
//         console.log("Export Excel");
//         // exportExcel();
//         break;

//       case "pdf":
//         console.log("Export PDF");
//         // exportPDF();
//         break;

//       case "print":
//         console.log("Print");
//         // handlePrint();
//         break;

//       default:
//         break;
//     }
//   };

//   //   format date
//   const formatDate = (date) => {
//     if (!date) return "";

//     return date.split("-").reverse().join("-");
//   };

//   //   pagination

//   const [currentPage, setCurrentPage] = useState(1);

//   const studentsPerPage = 10;

//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

//   const currentStudents = students.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent,
//   );

//   const totalPages = Math.ceil(students.length / studentsPerPage);

//   //   select all students
//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       const allAdmissionNumbers = students.map(
//         (student) => student.admissionNumber,
//       );

//       setSelectedStudents(allAdmissionNumbers);
//     } else {
//       setSelectedStudents([]);
//     }
//   };

//   // handle update section
//   const handleBulkSectionUpdate = async () => {
//     try {
//       if (selectedStudents.length === 0) {
//         alert("Please select at least one student.");
//         return;
//       }

//       if (!selectedNewSection) {
//         alert("Please select section.");
//         return;
//       }

//       setLoading(true);

//       const payload = {
//         schoolId,
//         admissionNumber: selectedStudents,
//         section: selectedNewSection,
//       };
//       console.log("payload", payload);

//       const response = await axiosInstance.patch(
//         "/api/students/section-shuffling",
//         payload,
//       );

//       alert(response.data);

//       // Students dobara load kar lo
//       fetchStudents();

//       // Reset
//       setSelectedStudents([]);
//       setSelectedNewSection("");
//     } catch (error) {
//       console.error(error);

//       alert(error.response?.data?.message || "Failed to update section.");
//     } finally {
//       setLoading(false);
//     }
//   };

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
//           <FaShuffle /> Section Shuffling
//         </h6>
//         <nav aria-label="breadcrumb py-2">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                 <small>Home</small>
//               </a>
//             </li>
//             <li className="breadcrumb-item active">
//               <small>School Management</small>
//             </li>
//             <li className="breadcrumb-item active">
//               <small>Section Shuffling</small>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* search bar  */}
//       <div className="ms-2 me-2 mt-3 bg-white rounded shadow">
//         <div className="card ">
//           {/* <div className="card-header">Section Shuffling</div> */}
//           <div className="card-body">
//             <div className="row">
//               <div className="col-12 col-md-3">
//                 <label htmlFor="">
//                   Session <span className="text-danger">*</span>
//                 </label>
//                 <select
//                   name=""
//                   id=""
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
//               <div className="col-12 col-md-3">
//                 <label htmlFor="">
//                   Standard <span className="text-danger">*</span>
//                 </label>
//                 <select
//                   name=""
//                   id=""
//                   className="form-select"
//                   value={selectedStandard}
//                   onChange={(e) => setSelectedStandard(e.target.value)}
//                 >
//                   <option value="">Select Standard</option>
//                   {standards.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-12 col-md-3">
//                 <label htmlFor="">
//                   Current Section <span className="text-danger">*</span>
//                 </label>
//                 <select
//                   name=""
//                   id=""
//                   className="form-select"
//                   value={selectedSection}
//                   onChange={(e) => setSelectedSection(e.target.value)}
//                 >
//                   <option value="">Select Section</option>
//                   {sections.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-12 col-md-3">
//                 <button
//                   className="btn btn-primary w-100 mt-4"
//                   onClick={handleSearch}
//                 >
//                   <IoSearchOutline />
//                   Search Students
//                 </button>
//               </div>
//             </div>
//             <div className="row mt-3">
//               <div className="col-12 col-md-3">
//                 <label htmlFor="">
//                   Next Section <span className="text-danger">*</span>
//                 </label>
//                 <select
//                   name=""
//                   id=""
//                   className="form-select"
//                   value={setSelectedNewSection}
//                   onChange={(e) => setSelectedNewSection(e.target.value)}
//                 >
//                   <option value="">Select Section</option>
//                   {sections.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-12 col-md-4">
//                 <label htmlFor="">Search Student</label>
//                 {/* <i
//                   className="bi bi-search position-absolute"
//                   style={{
//                     left: "12px",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     color: "#6c757d",
//                   }}
//                 ></i> */}
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search by Adm No. or Name..."
//                 />
//               </div>
//               <div className="col-12 col-md-3 mt-4">
//                 <button
//                   className="btn border w-100 hover"
//                   onClick={handleReset}
//                 >
//                   <TbRepeat /> Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {students.length >= 1 && (
//         <>
//           {/* student table  */}
//           <div className="container-fluid mt-3 px-2">
//             <div className="row g-3">
//               {/* Student List */}
//               <div className="col-12 col-lg-9">
//                 <div className="card shadow h-100">
//                   <div className="card-header bg-white">Student List</div>
//                   <div className="card-body">
//                     {/* Student Table */}
//                     <div className="d-flex justify-content-between align-items-center">
//                       {/* Select All */}
//                       <div className="form-check ms-3 ">
//                         <input
//                           type="checkbox"
//                           className="form-check-input"
//                           checked={
//                             students.length > 0 &&
//                             selectedStudents.length === students.length
//                           }
//                           onChange={handleSelectAll}
//                         />
//                         <label
//                           htmlFor="selectAll"
//                           className="form-check-label ms-2"
//                         >
//                           Select All
//                         </label>
//                       </div>

//                       {/* Export Dropdown */}
//                       <div className="dropdown">
//                         <button
//                           className="btn border dropdown-toggle d-flex align-items-center gap-2"
//                           type="button"
//                           data-bs-toggle="dropdown"
//                         >
//                           {selectedExport.icon}
//                           {selectedExport.label}
//                         </button>

//                         <ul className="dropdown-menu dropdown-menu-end">
//                           <li>
//                             <button
//                               className="dropdown-item d-flex align-items-center gap-2"
//                               onClick={() => handleExport("excel")}
//                             >
//                               <PiMicrosoftExcelLogoBold
//                                 color="green"
//                                 size={18}
//                               />
//                               Export Excel
//                             </button>
//                           </li>

//                           <li>
//                             <button
//                               className="dropdown-item d-flex align-items-center gap-2"
//                               onClick={() => handleExport("pdf")}
//                             >
//                               <MdOutlinePictureAsPdf color="red" size={18} />
//                               Export PDF
//                             </button>
//                           </li>

//                           <li>
//                             <button
//                               className="dropdown-item d-flex align-items-center gap-2"
//                               onClick={() => handleExport("print")}
//                             >
//                               <IoPrintOutline color="#0d6efd" size={18} />
//                               Print
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>

//                     <div className="container-fluid table-responsive mt-3 ">
//                       <table className="table  table-hover  align-middle border">
//                         <thead className="table-primary">
//                           <tr>
//                             <th>
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 checked={
//                                   students.length > 0 &&
//                                   selectedStudents.length === students.length
//                                 }
//                                 onChange={handleSelectAll}
//                               />
//                             </th>
//                             <th>Adm No.</th>
//                             <th>Student Name</th>
//                             <th>Gender</th>
//                             <th>Class - Section</th>
//                             <th>Date of Birth</th>
//                             <th>Status</th>
//                           </tr>
//                         </thead>

//                         <tbody>
//                           {currentStudents.map((student, idx) => (
//                             <tr>
//                               <td>
//                                 <input
//                                   type="checkbox"
//                                   className="form-check-input"
//                                   checked={selectedStudents.includes(
//                                     student.admissionNumber,
//                                   )}
//                                   onChange={(e) => {
//                                     if (e.target.checked) {
//                                       setSelectedStudents([
//                                         ...selectedStudents,
//                                         student.admissionNumber,
//                                       ]);
//                                     } else {
//                                       setSelectedStudents(
//                                         selectedStudents.filter(
//                                           (admissionNumber) =>
//                                             admissionNumber !==
//                                             student.admissionNumber,
//                                         ),
//                                       );
//                                     }
//                                   }}
//                                 />
//                               </td>
//                               <td>{student.admissionNumber}</td>
//                               <td>
//                                 {student.firstName} {student.lastName}
//                               </td>
//                               <td>{student.gender}</td>
//                               <td>
//                                 {student.studentClass}-{student.section}
//                               </td>
//                               <td>
//                                 <td>{formatDate(student.dob)}</td>
//                               </td>
//                               <td>
//                                 <span className="badge text-bg-primary text-white p-1">
//                                   {student.status}
//                                 </span>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>

//                       <div className="d-flex justify-content-end mt-3">
//                         {[...Array(totalPages)].map((_, i) => (
//                           <button
//                             key={i}
//                             className={`btn mx-1 ${
//                               currentPage === i + 1
//                                 ? "btn-primary"
//                                 : "btn-outline-primary"
//                             }`}
//                             onClick={() => setCurrentPage(i + 1)}
//                           >
//                             {i + 1}
//                           </button>
//                         ))}
//                       </div>

//                       <div className="alert bg-white border mt-3 d-flex justify-content-between py-1">
//                         <span>Total Students: {students.length} </span>
//                         <span>
//                           Selected Students: {selectedStudents.length}
//                         </span>
//                       </div>

//                       <div
//                         className="alert  border mt-3 d-flex  py-1"
//                         style={{
//                           backgroundColor: "#FFF3CD",
//                           color: "#664D03",
//                         }}
//                       >
//                         <small className="fw-lighter">
//                           <RiErrorWarningFill size={17} /> Note: Only Active
//                           Studens are listed.Please select students and clicked
//                           on "Shuffle Section" to move them to the other
//                           section.
//                         </small>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Shuffling Summary */}
//               <div className="col-12 col-lg-3">
//                 <div className="card shadow h-100">
//                   <div className="card-header bg-white">
//                     {" "}
//                     <HiUsers size={20} className=" text-primary" /> Shuffling
//                     Summary
//                   </div>
//                   <div className="card-body">
//                     <div>
//                       <small>Current Session</small>
//                       <h6 className="text-primary">{selectedSession}</h6>
//                     </div>

//                     <div className="mt-2">
//                       <small>Current Class - Section</small>
//                       <h6 className="text-primary">
//                         {selectedStandard}-{selectedSection}
//                       </h6>
//                     </div>

//                     <div className="mt-2">
//                       -----------
//                       <span className="bg-info px-2 rounded-circle py-2">
//                         <FaArrowDown size={20} className="text-white" />
//                       </span>
//                       -----------
//                     </div>

//                     {/* next section  */}
//                     <div className="mt-2">
//                       <small>Current Session</small>
//                       <h6 className="text-primary">{selectedSession}</h6>
//                     </div>

//                     <div className="mt-2">
//                       <small>Next Class - Section</small>
//                       <h6 className="text-primary">
//                         {selectedStandard}-{selectedNewSection}
//                       </h6>
//                     </div>

//                     {/* alert  */}
//                     <div
//                       className="alert  text-center m-0 py-1"
//                       style={{
//                         backgroundColor: "#FFF3CD",
//                         color: "#664D03",
//                       }}
//                     >
//                       <h6>Selected Student</h6>
//                       <h6>{selectedStudents.length}</h6>
//                     </div>

//                     {/* button  */}

//                     <div className="mt-2">
//                       <button
//                         className="btn btn-primary w-100"
//                         onClick={handleBulkSectionUpdate}
//                         disabled={loading}
//                       >
//                         {sectionloading ? "Updating..." : "Shuffle Students"}
//                         {/* <FaShuffle /> Shuffle Students */}
//                       </button>
//                       <button
//                         className="btn  w-100 mt-2"
//                         style={{ border: "1px solid black" }}
//                       >
//                         <FaRegEye /> Preview Students
//                       </button>

//                       <div
//                         className="alert  mt-2"
//                         style={{ backgroundColor: "#def0ff" }}
//                       >
//                         <small>Students will be shuffle from </small>
//                         <strong>
//                           {selectedStandard}-{selectedSection}
//                         </strong>{" "}
//                         to{" "}
//                         <strong>
//                           {selectedStandard}-{selectedNewSection}{" "}
//                         </strong>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default SectionShuffling;
import React, { useMemo, useState } from "react";
import { FaArrowDown, FaRegEye, FaShuffle, FaUsers } from "react-icons/fa6";
import { IoPrintOutline, IoSearchOutline } from "react-icons/io5";
import { TbRepeat } from "react-icons/tb";
import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
import {
  MdOutlineAssessment,
  MdOutlinePictureAsPdf,
  MdOutlineSchool,
} from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { LuUsersRound, LuRefreshCw } from "react-icons/lu";

import useMasters from "../../hooks/useMasters";
import { useStudents } from "../../context/StudentContext";
import axiosInstance from "../../api/axiosInstance";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const SectionShuffling = () => {
  const { sessions = [], standards = [], sections = [] } = useMasters();
  const { students = [], loadStudents, loading } = useStudents();

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  /* =========================================================
     STATES
  ========================================================= */

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedNewSection, setSelectedNewSection] = useState("");

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [sectionLoading, setSectionLoading] = useState(false);

  const [searchStudent, setSearchStudent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 10;

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "";

    if (typeof date === "string" && date.includes("-")) {
      return date.split("-").reverse().join("-");
    }

    return date;
  };

  /* =========================================================
     STUDENT NAME
  ========================================================= */

  const getStudentName = (student) => {
    return (
      `${student?.firstName || ""} ${student?.lastName || ""}`.trim() || "-"
    );
  };

  /* =========================================================
     SEARCH STUDENTS
  ========================================================= */

  const handleSearch = () => {
    if (!selectedSession || !selectedStandard || !selectedSection) {
      alert("Please select Session, Standard and Current Section.");
      return;
    }

    setCurrentPage(1);
    setSelectedStudents([]);

    loadStudents(selectedSession, selectedStandard, selectedSection);
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setSelectedSession("");
    setSelectedStandard("");
    setSelectedSection("");
    setSelectedNewSection("");
    setSelectedStudents([]);
    setSearchStudent("");
    setCurrentPage(1);
  };

  /* =========================================================
     FILTER STUDENTS
  ========================================================= */

  const filteredStudents = useMemo(() => {
    const search = searchStudent.toLowerCase().trim();

    if (!search) {
      return students;
    }

    return students.filter((student) => {
      const name = getStudentName(student).toLowerCase();

      const admissionNumber = student?.admissionNumber?.toLowerCase() || "";

      return name.includes(search) || admissionNumber.includes(search);
    });
  }, [students, searchStudent]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  /* =========================================================
     SELECT ALL
  ========================================================= */

  const handleSelectAll = (e) => {
    const currentPageAdmissionNumbers = currentStudents.map(
      (student) => student.admissionNumber,
    );

    if (e.target.checked) {
      setSelectedStudents((prev) => [
        ...new Set([...prev, ...currentPageAdmissionNumbers]),
      ]);
    } else {
      setSelectedStudents((prev) =>
        prev.filter(
          (admissionNumber) =>
            !currentPageAdmissionNumbers.includes(admissionNumber),
        ),
      );
    }
  };

  const isCurrentPageSelected =
    currentStudents.length > 0 &&
    currentStudents.every((student) =>
      selectedStudents.includes(student.admissionNumber),
    );

  /* =========================================================
     INDIVIDUAL SELECT
  ========================================================= */

  const handleStudentSelect = (admissionNumber, checked) => {
    if (checked) {
      setSelectedStudents((prev) => [...new Set([...prev, admissionNumber])]);
    } else {
      setSelectedStudents((prev) =>
        prev.filter((item) => item !== admissionNumber),
      );
    }
  };

  /* =========================================================
     BULK SECTION UPDATE
  ========================================================= */

  const handleBulkSectionUpdate = async () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    if (!selectedNewSection) {
      alert("Please select Next Section.");
      return;
    }

    if (selectedNewSection === selectedSection) {
      alert("Current Section and Next Section cannot be same.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to move ${selectedStudents.length} student(s) from ${selectedStandard}-${selectedSection} to ${selectedStandard}-${selectedNewSection}?`,
    );

    if (!confirmed) return;

    try {
      setSectionLoading(true);

      const payload = {
        schoolId,
        admissionNumber: selectedStudents,
        section: selectedNewSection,
      };

      console.log("Section Shuffle Payload:", payload);

      const response = await axiosInstance.patch(
        "/api/students/section-shuffling",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(response.data || "Students section updated primaryfully.");

      await loadStudents(selectedSession, selectedStandard, selectedSection);

      setSelectedStudents([]);
      setSelectedNewSection("");
    } catch (error) {
      console.error("Section shuffling error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to update section.",
      );
    } finally {
      setSectionLoading(false);
    }
  };

  /* =========================================================
     EXPORT EXCEL
  ========================================================= */

  const exportExcel = () => {
    if (filteredStudents.length === 0) {
      alert("No students available to export.");
      return;
    }

    const excelData = filteredStudents.map((student, index) => ({
      "Sl No": index + 1,
      "Admission No": student.admissionNumber || "",
      "Student Name": getStudentName(student),
      Gender: student.gender || "",
      Session: student.academicYear || selectedSession,
      Class: student.studentClass || selectedStandard,
      Section: student.section || "",
      "Date of Birth": student.dob || "",
      Status: student.status || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    worksheet["!cols"] = [
      { wch: 8 },
      { wch: 18 },
      { wch: 28 },
      { wch: 12 },
      { wch: 15 },
      { wch: 15 },
      { wch: 12 },
      { wch: 18 },
      { wch: 15 },
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Section Shuffling");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "Section_Shuffling_Report.xlsx");
  };

  /* =========================================================
     EXPORT PDF
  ========================================================= */

  const exportPDF = () => {
    if (filteredStudents.length === 0) {
      alert("No students available to export.");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(18);
    doc.setTextColor(25, 135, 84);

    doc.text("School Management System", pageWidth / 2, 15, {
      align: "center",
    });

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);

    doc.text("Section Shuffling Report", pageWidth / 2, 23, {
      align: "center",
    });

    doc.setFontSize(9);

    doc.text(`Session : ${selectedSession || "All"}`, 14, 33);

    doc.text(`Class : ${selectedStandard || "All"}`, 75, 33);

    doc.text(`Current Section : ${selectedSection || "All"}`, 135, 33);

    doc.text(`Next Section : ${selectedNewSection || "Not Selected"}`, 205, 33);

    autoTable(doc, {
      startY: 40,

      head: [
        [
          "#",
          "Admission No",
          "Student Name",
          "Gender",
          "Class",
          "Section",
          "Date of Birth",
          "Status",
        ],
      ],

      body: filteredStudents.map((student, index) => [
        index + 1,
        student.admissionNumber || "",
        getStudentName(student),
        student.gender || "",
        student.studentClass || selectedStandard || "",
        student.section || "",
        formatDate(student.dob),
        student.status || "",
      ]),

      theme: "grid",

      styles: {
        fontSize: 8,
        cellPadding: 2,
        halign: "center",
        valign: "middle",
      },

      headStyles: {
        fillColor: [25, 135, 84],
        textColor: 255,
        fontStyle: "bold",
      },

      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },

      didDrawPage: (data) => {
        doc.setFontSize(8);

        doc.text(
          `Page ${doc.internal.getNumberOfPages()}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 8,
        );

        doc.text(
          `Total Students : ${filteredStudents.length}`,
          pageWidth - 55,
          doc.internal.pageSize.height - 8,
        );
      },
    });

    doc.save("Section_Shuffling_Report.pdf");
  };

  /* =========================================================
     PRINT
  ========================================================= */

  const handlePrint = () => {
    if (filteredStudents.length === 0) {
      alert("No students available to print.");
      return;
    }

    const printWindow = window.open("", "_blank", "width=1200,height=800");

    if (!printWindow) return;

    const rows = filteredStudents
      .map(
        (student, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${student.admissionNumber || ""}</td>
            <td>${getStudentName(student)}</td>
            <td>${student.gender || ""}</td>
            <td>${student.studentClass || selectedStandard || ""}</td>
            <td>${student.section || ""}</td>
            <td>${formatDate(student.dob)}</td>
            <td>${student.status || ""}</td>
          </tr>
        `,
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Section Shuffling Report</title>

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 25px;
              color: #000;
            }

            h2,
            h4 {
              text-align: center;
              margin: 5px;
            }

            .filters {
              display: flex;
              justify-content: space-between;
              margin: 25px 0 10px;
              font-size: 14px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
            }

            th,
            td {
              border: 1px solid #999;
              padding: 8px;
              text-align: center;
              font-size: 12px;
            }

            th {
              background: #198754;
              color: white;
            }

            @media print {
              body {
                padding: 10px;
              }
            }
          </style>
        </head>

        <body>
          <h2>School Management System</h2>
          <h4>Section Shuffling Report</h4>

          <div class="filters">
            <span>
              <strong>Session:</strong>
              ${selectedSession || "All"}
            </span>

            <span>
              <strong>Class:</strong>
              ${selectedStandard || "All"}
            </span>

            <span>
              <strong>Current Section:</strong>
              ${selectedSection || "All"}
            </span>

            <span>
              <strong>Next Section:</strong>
              ${selectedNewSection || "Not Selected"}
            </span>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Admission No</th>
                <th>Student Name</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Section</th>
                <th>Date of Birth</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              ${rows}
            </tbody>
          </table>

          <script>
            window.onload = function () {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  /* =========================================================
     PREVIEW
  ========================================================= */

  const handlePreview = () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    alert(
      `${selectedStudents.length} student(s) selected for ${selectedStandard || "-"}-${selectedNewSection || "-"}`,
    );
  };

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <>
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
                  <FaShuffle size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">Section Shuffling</h5>

                  <div className="text-muted small">
                    Setup &nbsp;/ &nbsp; Section Shuffling
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
                  Setup
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
              Home &nbsp;›&nbsp; Setup &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Section Shuffling
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTER SECTION
      ===================================================== */}

      <div className="ms-2 me-2 mt-3">
        <div className="bg-white rounded-4 shadow p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1 fw-semibold">
                <FaShuffle className="text-primary me-2" size={15} />
                Shuffling Filters
              </h6>

              <small className="text-muted">
                Select class and section to manage student movement
              </small>
            </div>

            <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
              Section Management
            </span>
          </div>

          <div className="row g-3">
            {/* SESSION */}

            <div className="col-12 col-sm-6 col-lg-3">
              <label className="form-label fw-semibold">
                Session <span className="text-danger">*</span>
              </label>

              <select
                className="form-select"
                value={selectedSession}
                onChange={(e) => {
                  setSelectedSession(e.target.value);
                  setSelectedStandard("");
                  setSelectedSection("");
                  setSelectedNewSection("");
                  setSelectedStudents([]);
                }}
              >
                <option value="">Select Session</option>

                {sessions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* STANDARD */}

            <div className="col-12 col-sm-6 col-lg-3">
              <label className="form-label fw-semibold">
                Standard <span className="text-danger">*</span>
              </label>

              <select
                className="form-select"
                disabled={!selectedSession}
                value={selectedStandard}
                onChange={(e) => {
                  setSelectedStandard(e.target.value);
                  setSelectedSection("");
                  setSelectedNewSection("");
                  setSelectedStudents([]);
                }}
              >
                <option value="">Select Standard</option>

                {standards.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* CURRENT SECTION */}

            <div className="col-12 col-sm-6 col-lg-3">
              <label className="form-label fw-semibold">
                Current Section <span className="text-danger">*</span>
              </label>

              <select
                className="form-select"
                disabled={!selectedStandard}
                value={selectedSection}
                onChange={(e) => {
                  setSelectedSection(e.target.value);
                  setSelectedNewSection("");
                  setSelectedStudents([]);
                }}
              >
                <option value="">Select Section</option>

                {sections.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* SEARCH */}

            <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-end">
              <button
                className="btn btn-primary w-100"
                onClick={handleSearch}
                disabled={
                  loading ||
                  !selectedSession ||
                  !selectedStandard ||
                  !selectedSection
                }
              >
                <IoSearchOutline size={18} className="me-1" />

                {loading ? "Loading..." : "Load Students"}
              </button>
            </div>
          </div>

          {/* SECOND ROW */}

          <div className="row g-3 mt-1">
            {/* NEXT SECTION */}

            <div className="col-12 col-sm-6 col-lg-3">
              <label className="form-label fw-semibold">
                Next Section <span className="text-danger">*</span>
              </label>

              <select
                className="form-select"
                disabled={!selectedSection}
                value={selectedNewSection}
                onChange={(e) => setSelectedNewSection(e.target.value)}
              >
                <option value="">Select Next Section</option>

                {sections
                  .filter((item) => item !== selectedSection)
                  .map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>

            {/* SEARCH STUDENT */}

            <div className="col-12 col-lg-5">
              <label className="form-label fw-semibold">Search Student</label>

              <div className="input-group">
                <span className="input-group-text bg-white">
                  <IoSearchOutline className="text-muted" />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by admission no. or student name..."
                  value={searchStudent}
                  onChange={(e) => {
                    setSearchStudent(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {/* RESET */}

            <div className="col-12 col-lg-2 d-flex align-items-end">
              <button
                className="btn btn-outline-dark w-100"
                onClick={handleReset}
              >
                <TbRepeat size={18} className="me-1" />
                Reset
              </button>
            </div>

            {/* SELECTED */}

            <div className="col-12 col-lg-2 d-flex align-items-end">
              <div
                className="w-100 rounded px-3 py-2 border"
                style={{
                  background: "#f8f9fa",
                }}
              >
                <small className="text-muted d-block">Selected</small>

                <strong className="text-primary">
                  {selectedStudents.length} Students
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <div className="ms-2 me-2 mt-4 bg-white rounded shadow p-5 text-center">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />

          <div className="mt-3 text-muted">
            Loading students, please wait...
          </div>
        </div>
      )}

      {/* =====================================================
          STUDENT DATA
      ===================================================== */}

      {!loading && students.length > 0 && (
        <div className="container-fluid mt-4 px-2">
          <div className="row g-3">
            {/* =================================================
                STUDENT TABLE
            ================================================= */}

            <div className="col-12 col-xl-9">
              <div className="bg-white rounded-4 shadow p-3 h-100">
                {/* HEADER */}

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                  <div>
                    <h6 className="mb-1 fw-semibold">
                      <LuUsersRound className="text-primary me-2" size={18} />
                      Student List
                    </h6>

                    <small className="text-muted">
                      {selectedSession} {" | "} {selectedStandard}{" "}
                      {" | Section "} {selectedSection}
                    </small>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-primary-subtle text-primary">
                      {filteredStudents.length} Students
                    </span>

                    {selectedStudents.length > 0 && (
                      <span className="badge bg-warning-subtle text-warning-emphasis">
                        {selectedStudents.length} Selected
                      </span>
                    )}
                  </div>
                </div>

                {/* ACTION BAR */}

                <div
                  className="d-flex justify-content-between align-items-center flex-wrap gap-2 p-2 rounded border"
                  style={{
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <div className="form-check mb-0 ms-1">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="selectAllStudents"
                      checked={isCurrentPageSelected}
                      onChange={handleSelectAll}
                    />

                    <label
                      htmlFor="selectAllStudents"
                      className="form-check-label fw-semibold ms-1"
                    >
                      Select All
                    </label>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <small className="text-muted">
                      Showing{" "}
                      <strong>
                        {filteredStudents.length === 0
                          ? 0
                          : indexOfFirstStudent + 1}
                      </strong>{" "}
                      -{" "}
                      <strong>
                        {Math.min(indexOfLastStudent, filteredStudents.length)}
                      </strong>{" "}
                      of <strong>{filteredStudents.length}</strong>
                    </small>

                    {/* EXPORT DROPDOWN */}

                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-light border dropdown-toggle d-flex align-items-center gap-2"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <MdOutlinePictureAsPdf
                          size={17}
                          className="text-danger"
                        />
                        Export
                      </button>

                      <ul className="dropdown-menu dropdown-menu-end shadow">
                        <li>
                          <button
                            className="dropdown-item d-flex align-items-center gap-2"
                            onClick={exportExcel}
                          >
                            <PiMicrosoftExcelLogoBold
                              size={18}
                              className="text-primary"
                            />
                            Export Excel
                          </button>
                        </li>

                        <li>
                          <button
                            className="dropdown-item d-flex align-items-center gap-2"
                            onClick={exportPDF}
                          >
                            <MdOutlinePictureAsPdf
                              size={18}
                              className="text-danger"
                            />
                            Export PDF
                          </button>
                        </li>

                        <li>
                          <button
                            className="dropdown-item d-flex align-items-center gap-2"
                            onClick={handlePrint}
                          >
                            <IoPrintOutline
                              size={18}
                              className="text-primary"
                            />
                            Print
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* TABLE */}

                <div className="table-responsive mt-3">
                  <table className="table table-bordered table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="text-center" style={{ width: "55px" }}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={isCurrentPageSelected}
                            onChange={handleSelectAll}
                          />
                        </th>

                        <th
                          className="text-center"
                          style={{
                            minWidth: "60px",
                          }}
                        >
                          #
                        </th>

                        <th
                          style={{
                            minWidth: "145px",
                          }}
                        >
                          Admission No
                        </th>

                        <th
                          style={{
                            minWidth: "210px",
                          }}
                        >
                          Student Name
                        </th>

                        <th
                          className="text-center"
                          style={{
                            minWidth: "100px",
                          }}
                        >
                          Gender
                        </th>

                        <th
                          className="text-center"
                          style={{
                            minWidth: "150px",
                          }}
                        >
                          Class - Section
                        </th>

                        <th
                          className="text-center"
                          style={{
                            minWidth: "130px",
                          }}
                        >
                          Date of Birth
                        </th>

                        <th
                          className="text-center"
                          style={{
                            minWidth: "100px",
                          }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentStudents.length > 0 ? (
                        currentStudents.map((student, index) => {
                          const isSelected = selectedStudents.includes(
                            student.admissionNumber,
                          );

                          return (
                            <tr
                              key={student.admissionNumber}
                              style={{
                                backgroundColor: isSelected
                                  ? "#f0fff7"
                                  : undefined,
                              }}
                            >
                              {/* CHECKBOX */}

                              <td className="text-center">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={isSelected}
                                  onChange={(e) =>
                                    handleStudentSelect(
                                      student.admissionNumber,
                                      e.target.checked,
                                    )
                                  }
                                />
                              </td>

                              {/* SERIAL */}

                              <td className="text-center text-muted">
                                {indexOfFirstStudent + index + 1}
                              </td>

                              {/* ADMISSION */}

                              <td>
                                <span className="fw-semibold">
                                  {student.admissionNumber}
                                </span>
                              </td>

                              {/* NAME */}

                              <td>
                                <div className="fw-semibold">
                                  {getStudentName(student)}
                                </div>

                                {isSelected && (
                                  <small className="text-primary">
                                    Selected for shuffling
                                  </small>
                                )}
                              </td>

                              {/* GENDER */}

                              <td className="text-center">
                                {student.gender || "-"}
                              </td>

                              {/* CLASS */}

                              <td className="text-center">
                                <span className="badge bg-light text-dark border">
                                  {student.studentClass ||
                                    selectedStandard ||
                                    "-"}{" "}
                                  - {student.section || "-"}
                                </span>
                              </td>

                              {/* DOB */}

                              <td className="text-center">
                                {formatDate(student.dob) || "-"}
                              </td>

                              {/* STATUS */}

                              <td className="text-center">
                                <span
                                  className={`badge ${
                                    String(student.status).toUpperCase() ===
                                    "ACTIVE"
                                      ? "bg-primary"
                                      : "bg-secondary"
                                  }`}
                                >
                                  {student.status || "ACTIVE"}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center py-5">
                            <LuUsersRound
                              size={40}
                              className="text-muted mb-2"
                            />

                            <div className="fw-semibold text-muted">
                              No students found
                            </div>

                            <small className="text-muted">
                              Try another search keyword.
                            </small>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* PAGINATION */}

                {totalPages > 1 && (
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
                    <small className="text-muted">
                      Page <strong>{currentPage}</strong> of{" "}
                      <strong>{totalPages}</strong>
                    </small>

                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                      >
                        Previous
                      </button>

                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          className={`btn btn-sm ${
                            currentPage === i + 1
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* COUNTER */}

                <div
                  className="mt-3 p-2 rounded border d-flex justify-content-between flex-wrap gap-2"
                  style={{
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <small className="text-muted">
                    Total Students:{" "}
                    <strong className="text-dark">
                      {filteredStudents.length}
                    </strong>
                  </small>

                  <small className="text-muted">
                    Selected Students:{" "}
                    <strong className="text-primary">
                      {selectedStudents.length}
                    </strong>
                  </small>
                </div>

                {/* WARNING */}

                <div
                  className="alert border mt-3 mb-0 d-flex align-items-start py-2"
                  style={{
                    backgroundColor: "#fff9e6",
                    color: "#664d03",
                  }}
                >
                  <RiErrorWarningFill
                    size={18}
                    className="me-2 mt-1 flex-shrink-0"
                  />

                  <small>
                    Only active students are displayed. Select one or more
                    students and choose a different section to move them.
                  </small>
                </div>
              </div>
            </div>

            {/* =================================================
                SUMMARY / SHUFFLING PANEL
            ================================================= */}

            <div className="col-12 col-xl-3">
              <div className="bg-white rounded shadow p-3 h-100">
                {/* HEADER */}

                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h6 className="mb-1 fw-semibold">
                      <FaShuffle className="text-primary me-2" size={16} />
                      Shuffling Summary
                    </h6>

                    <small className="text-muted">
                      Review movement details
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "38px",
                      height: "38px",
                      backgroundColor: "#e8f7ef",
                    }}
                  >
                    <FaShuffle className="text-primary" size={16} />
                  </div>
                </div>

                {/* CURRENT */}

                <div
                  className="rounded border p-3"
                  style={{
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <small className="text-muted">Current</small>

                  <div className="mt-1 fw-semibold">
                    {selectedStandard || "-"}
                    {" - "}
                    {selectedSection || "-"}
                  </div>

                  <small className="text-muted d-block mt-1">
                    Session: {selectedSession || "-"}
                  </small>
                </div>

                {/* ARROW */}

                <div className="text-center py-3">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      style={{
                        height: "1px",
                        background: "#dee2e6",
                        flex: 1,
                      }}
                    />

                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: "38px",
                        height: "38px",
                        backgroundColor: "#198754",
                      }}
                    >
                      <FaArrowDown size={15} className="text-white" />
                    </div>

                    <div
                      style={{
                        height: "1px",
                        background: "#dee2e6",
                        flex: 1,
                      }}
                    />
                  </div>
                </div>

                {/* NEXT */}

                <div
                  className="rounded border p-3"
                  style={{
                    backgroundColor: "#f0fff7",
                    borderColor: "#b7e4c7",
                  }}
                >
                  <small className="text-muted">Move To</small>

                  <div className="mt-1 fw-semibold text-primary">
                    {selectedStandard || "-"}
                    {" - "}
                    {selectedNewSection || "-"}
                  </div>

                  <small className="text-muted d-block mt-1">
                    Session: {selectedSession || "-"}
                  </small>
                </div>

                {/* SELECTED STUDENTS */}

                <div
                  className="mt-3 p-3 rounded text-center"
                  style={{
                    background: "linear-gradient(135deg, #f0fff7, #ffffff)",
                    border: "1px solid #d1e7dd",
                  }}
                >
                  <small className="text-muted">Selected Students</small>

                  <div
                    className="fw-bold text-primary mt-1"
                    style={{
                      fontSize: "30px",
                      lineHeight: "1",
                    }}
                  >
                    {selectedStudents.length}
                  </div>

                  <small className="text-muted">students selected</small>
                </div>

                {/* SHUFFLE BUTTON */}

                <button
                  className="btn btn-primary w-100 mt-3 py-2"
                  onClick={handleBulkSectionUpdate}
                  disabled={
                    sectionLoading ||
                    selectedStudents.length === 0 ||
                    !selectedNewSection
                  }
                >
                  <FaShuffle className="me-2" />

                  {sectionLoading ? "Updating..." : "Shuffle Students"}
                </button>

                {/* PREVIEW */}

                <button
                  className="btn btn-light border w-100 mt-2"
                  disabled={selectedStudents.length === 0}
                  onClick={handlePreview}
                >
                  <FaRegEye className="me-2" />
                  Preview Students
                </button>

                {/* MOVEMENT INFO */}

                <div
                  className="mt-3 rounded border p-3"
                  style={{
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <div className="d-flex align-items-start">
                    <RiErrorWarningFill
                      className="text-primary me-2 mt-1"
                      size={17}
                    />

                    <small className="text-muted">
                      Students will move from{" "}
                      <strong className="text-dark">
                        {selectedStandard || "-"}-{selectedSection || "-"}
                      </strong>{" "}
                      to{" "}
                      <strong className="text-primary">
                        {selectedStandard || "-"}-{selectedNewSection || "-"}
                      </strong>
                      .
                    </small>
                  </div>
                </div>

                {/* QUICK STATS */}

                <div className="row g-2 mt-2">
                  <div className="col-6">
                    <div className="border rounded p-2 text-center">
                      <small className="text-muted d-block">Available</small>

                      <strong>{filteredStudents.length}</strong>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="border rounded p-2 text-center">
                      <small className="text-muted d-block">Selected</small>

                      <strong className="text-primary">
                        {selectedStudents.length}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          NO DATA
      ===================================================== */}

      {!loading && students.length === 0 && (
        <div className="ms-2 me-2 mt-4 bg-white rounded shadow p-5 text-center">
          <LuUsersRound size={48} className="text-muted mb-3" />

          <h6 className="text-muted fw-semibold">No Student Data</h6>

          <small className="text-muted">
            Select Session, Standard and Current Section, then click{" "}
            <strong>Load Students</strong>.
          </small>
        </div>
      )}
    </>
  );
};

export default SectionShuffling;
