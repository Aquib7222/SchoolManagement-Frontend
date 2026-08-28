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
//                   className="btn btn-success w-100 mt-4"
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
//                         <thead className="table-success">
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
//                                 <span className="badge text-bg-success text-white p-1">
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
//                     <HiUsers size={20} className=" text-success" /> Shuffling
//                     Summary
//                   </div>
//                   <div className="card-body">
//                     <div>
//                       <small>Current Session</small>
//                       <h6 className="text-success">{selectedSession}</h6>
//                     </div>

//                     <div className="mt-2">
//                       <small>Current Class - Section</small>
//                       <h6 className="text-success">
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
//                       <h6 className="text-success">{selectedSession}</h6>
//                     </div>

//                     <div className="mt-2">
//                       <small>Next Class - Section</small>
//                       <h6 className="text-success">
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
//                         className="btn btn-success w-100"
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

import React, { useState } from "react";
import { FaArrowDown, FaRegEye, FaShuffle } from "react-icons/fa6";
import useMasters from "../../hooks/useMasters";
import {
  IoPrintOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { TbRepeat } from "react-icons/tb";
import { useStudents } from "../../context/StudentContext";
import { HiUsers } from "react-icons/hi2";
import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
import {
  MdOutlinePictureAsPdf,
} from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import axiosInstance from "../../api/axiosInstance";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const SectionShuffling = () => {
  const { sessions, standards, sections } = useMasters();
  const { students, loadStudents, loading } = useStudents();

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  // ---------------- STATES ----------------

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedNewSection, setSelectedNewSection] = useState("");

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [sectionLoading, setSectionLoading] = useState(false);

  const [searchStudent, setSearchStudent] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const [selectedExport, setSelectedExport] = useState({
    label: "Export Excel",
    icon: (
      <PiMicrosoftExcelLogoBold
        color="green"
        size={18}
      />
    ),
  });

  // ---------------- FORMAT DATE ----------------

  const formatDate = (date) => {
    if (!date) return "";

    return date.split("-").reverse().join("-");
  };

  // ---------------- SEARCH STUDENTS ----------------

  const handleSearch = () => {
    if (
      !selectedSession ||
      !selectedStandard ||
      !selectedSection
    ) {
      alert(
        "Please select Session, Standard and Current Section."
      );
      return;
    }

    setCurrentPage(1);
    setSelectedStudents([]);

    loadStudents(
      selectedSession,
      selectedStandard,
      selectedSection
    );
  };

  // ---------------- RESET ----------------

  const handleReset = () => {
    setSelectedSession("");
    setSelectedStandard("");
    setSelectedSection("");
    setSelectedNewSection("");
    setSelectedStudents([]);
    setSearchStudent("");
    setCurrentPage(1);
  };

  // ---------------- FILTER STUDENTS ----------------

  const filteredStudents = students.filter((student) => {
    const search = searchStudent.toLowerCase().trim();

    if (!search) return true;

    const name =
      `${student.firstName || ""} ${
        student.lastName || ""
      }`.toLowerCase();

    const admissionNumber =
      student.admissionNumber?.toLowerCase() || "";

    return (
      name.includes(search) ||
      admissionNumber.includes(search)
    );
  });

  // ---------------- PAGINATION ----------------

  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  const indexOfLastStudent =
    currentPage * studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // ---------------- SELECT ALL ----------------

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const currentPageAdmissionNumbers =
        currentStudents.map(
          (student) => student.admissionNumber
        );

      setSelectedStudents((prev) => [
        ...new Set([
          ...prev,
          ...currentPageAdmissionNumbers,
        ]),
      ]);
    } else {
      const currentPageAdmissionNumbers =
        currentStudents.map(
          (student) => student.admissionNumber
        );

      setSelectedStudents((prev) =>
        prev.filter(
          (admissionNumber) =>
            !currentPageAdmissionNumbers.includes(
              admissionNumber
            )
        )
      );
    }
  };

  const isCurrentPageSelected =
    currentStudents.length > 0 &&
    currentStudents.every((student) =>
      selectedStudents.includes(
        student.admissionNumber
      )
    );

  // ---------------- INDIVIDUAL SELECT ----------------

  const handleStudentSelect = (
    admissionNumber,
    checked
  ) => {
    if (checked) {
      setSelectedStudents((prev) => [
        ...new Set([...prev, admissionNumber]),
      ]);
    } else {
      setSelectedStudents((prev) =>
        prev.filter(
          (item) => item !== admissionNumber
        )
      );
    }
  };

  // ---------------- SECTION UPDATE ----------------

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
      alert(
        "Current Section and Next Section cannot be same."
      );
      return;
    }

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
        }
      );

      alert(
        response.data ||
          "Students section updated successfully."
      );

      // Reload students
      await loadStudents(
        selectedSession,
        selectedStandard,
        selectedSection
      );

      setSelectedStudents([]);
      setSelectedNewSection("");
    } catch (error) {
      console.error(
        "Section shuffling error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update section."
      );
    } finally {
      setSectionLoading(false);
    }
  };

  // ---------------- EXPORT EXCEL ----------------

  const exportExcel = () => {
    if (filteredStudents.length === 0) {
      alert("No students available to export.");
      return;
    }

    const excelData = filteredStudents.map(
      (student, index) => ({
        "Sl No": index + 1,
        "Admission No":
          student.admissionNumber || "",
        "Student Name":
          `${student.firstName || ""} ${
            student.lastName || ""
          }`.trim(),
        Gender: student.gender || "",
        Session:
          student.academicYear || selectedSession,
        Class:
          student.studentClass ||
          selectedStandard,
        Section: student.section || "",
        "Date of Birth":
          student.dob || "",
        Status: student.status || "",
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(excelData);

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

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Section Shuffling"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      fileData,
      "Section_Shuffling_Report.xlsx"
    );
  };

  // ---------------- EXPORT PDF ----------------

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

    const pageWidth =
      doc.internal.pageSize.getWidth();

    doc.setFontSize(18);
    doc.setTextColor(0, 102, 51);

    doc.text(
      "School Management System",
      pageWidth / 2,
      15,
      {
        align: "center",
      }
    );

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);

    doc.text(
      "Section Shuffling Report",
      pageWidth / 2,
      23,
      {
        align: "center",
      }
    );

    doc.setFontSize(9);

    doc.text(
      `Session : ${selectedSession || "All"}`,
      14,
      33
    );

    doc.text(
      `Class : ${selectedStandard || "All"}`,
      75,
      33
    );

    doc.text(
      `Current Section : ${
        selectedSection || "All"
      }`,
      135,
      33
    );

    doc.text(
      `Next Section : ${
        selectedNewSection || "Not Selected"
      }`,
      205,
      33
    );

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

      body: filteredStudents.map(
        (student, index) => [
          index + 1,
          student.admissionNumber,
          `${student.firstName || ""} ${
            student.lastName || ""
          }`.trim(),
          student.gender,
          student.studentClass,
          student.section,
          formatDate(student.dob),
          student.status,
        ]
      ),

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
          doc.internal.pageSize.height - 8
        );

        doc.text(
          `Total Students : ${filteredStudents.length}`,
          pageWidth - 55,
          doc.internal.pageSize.height - 8
        );
      },
    });

    doc.save("Section_Shuffling_Report.pdf");
  };

  // ---------------- PRINT ----------------

  const handlePrint = () => {
    if (filteredStudents.length === 0) {
      alert("No students available to print.");
      return;
    }

    const printWindow = window.open(
      "",
      "_blank",
      "width=1200,height=800"
    );

    if (!printWindow) return;

    const rows = filteredStudents
      .map(
        (student, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${student.admissionNumber || ""}</td>
            <td>
              ${student.firstName || ""} ${
          student.lastName || ""
        }
            </td>
            <td>${student.gender || ""}</td>
            <td>${student.studentClass || ""}</td>
            <td>${student.section || ""}</td>
            <td>${formatDate(student.dob)}</td>
            <td>${student.status || ""}</td>
          </tr>
        `
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

            h2, h4 {
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

            th, td {
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

  // ---------------- EXPORT HANDLER ----------------

  const handleExport = (type) => {
    if (type === "excel") {
      setSelectedExport({
        label: "Export Excel",
        icon: (
          <PiMicrosoftExcelLogoBold
            color="green"
            size={18}
          />
        ),
      });

      exportExcel();
    }

    if (type === "pdf") {
      setSelectedExport({
        label: "Export PDF",
        icon: (
          <MdOutlinePictureAsPdf
            color="red"
            size={18}
          />
        ),
      });

      exportPDF();
    }

    if (type === "print") {
      setSelectedExport({
        label: "Print",
        icon: (
          <IoPrintOutline
            color="#0d6efd"
            size={18}
          />
        ),
      });

      handlePrint();
    }
  };

  // ---------------- JSX ----------------

  return (
    <>
      {/* ================= HEADER ================= */}

      <div
        className="row shadow"
        style={{
          backgroundColor: "white",
          margin: "10px",
          minHeight: "70px",
          borderRadius: "6px",
          padding: "10px 15px",
          color: "black",
          borderLeft: "4px solid #198754",
        }}
      >
        <h6 className="mb-1">
          <FaShuffle
            className="text-success me-2"
            size={15}
          />
          <strong>Section Shuffling</strong>
        </h6>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <small>Home</small>
              </a>
            </li>

            <li className="breadcrumb-item">
              <small>School Management</small>
            </li>

            <li className="breadcrumb-item active">
              <small>Section Shuffling</small>
            </li>
          </ol>
        </nav>
      </div>

      {/* ================= FILTER CARD ================= */}

      <div className="ms-2 me-2 mt-3">
        <div className="card border-0 shadow">
          <div
            className="card-header bg-white"
            style={{
              borderBottom: "1px solid #e9ecef",
            }}
          >
            <div className="d-flex align-items-center">
              <FaShuffle
                className="text-success me-2"
              />
              <strong>Section Shuffling</strong>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-3">
              {/* Session */}

              <div className="col-12 col-md-3">
                <label className="form-label">
                  Session{" "}
                  <span className="text-danger">
                    *
                  </span>
                </label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) =>
                    setSelectedSession(
                      e.target.value
                    )
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

              {/* Standard */}

              <div className="col-12 col-md-3">
                <label className="form-label">
                  Standard{" "}
                  <span className="text-danger">
                    *
                  </span>
                </label>

                <select
                  className="form-select"
                  value={selectedStandard}
                  onChange={(e) =>
                    setSelectedStandard(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select Standard
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

              {/* Current Section */}

              <div className="col-12 col-md-3">
                <label className="form-label">
                  Current Section{" "}
                  <span className="text-danger">
                    *
                  </span>
                </label>

                <select
                  className="form-select"
                  value={selectedSection}
                  onChange={(e) =>
                    setSelectedSection(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select Section
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

              {/* Search */}

              <div className="col-12 col-md-3 d-flex align-items-end">
                <button
                  className="btn btn-success w-100"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  <IoSearchOutline
                    size={18}
                    className="me-1"
                  />

                  {loading
                    ? "Loading..."
                    : "Search Students"}
                </button>
              </div>
            </div>

            {/* SECOND ROW */}

            <div className="row g-3 mt-1">
              {/* Next Section */}

              <div className="col-12 col-md-3">
                <label className="form-label">
                  Next Section{" "}
                  <span className="text-danger">
                    *
                  </span>
                </label>

                <select
                  className="form-select"
                  value={selectedNewSection}
                  onChange={(e) =>
                    setSelectedNewSection(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select Section
                  </option>

                  {sections
                    .filter(
                      (item) =>
                        item !== selectedSection
                    )
                    .map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                </select>
              </div>

              {/* Search Student */}

              <div className="col-12 col-md-4">
                <label className="form-label">
                  Search Student
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <IoSearchOutline />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Adm No. or Name..."
                    value={searchStudent}
                    onChange={(e) => {
                      setSearchStudent(
                        e.target.value
                      );
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              {/* Reset */}

              <div className="col-12 col-md-3 d-flex align-items-end">
                <button
                  className="btn btn-light border w-100"
                  onClick={handleReset}
                >
                  <TbRepeat
                    size={18}
                    className="me-1"
                  />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= STUDENT AREA ================= */}

      {students.length > 0 && (
        <div className="container-fluid mt-3 px-2">
          <div className="row g-3">
            {/* ================= STUDENT LIST ================= */}

            <div className="col-12 col-lg-9">
              <div className="card border-0 shadow h-100">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <div>
                    <strong>
                      <HiUsers
                        className="text-success me-2"
                        size={20}
                      />
                      Student List
                    </strong>
                  </div>

                  <span className="badge bg-light text-dark border">
                    Total:{" "}
                    {filteredStudents.length}
                  </span>
                </div>

                <div className="card-body">
                  {/* TOP ACTIONS */}

                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div className="form-check ms-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="selectAllStudents"
                        checked={
                          isCurrentPageSelected
                        }
                        onChange={
                          handleSelectAll
                        }
                      />

                      <label
                        htmlFor="selectAllStudents"
                        className="form-check-label ms-2"
                      >
                        Select All
                      </label>
                    </div>

                    {/* EXPORT */}

                    <div className="dropdown">
                      <button
                        className="btn btn-light border dropdown-toggle d-flex align-items-center gap-2"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        {selectedExport.icon}
                        {selectedExport.label}
                      </button>

                      <ul className="dropdown-menu dropdown-menu-end shadow">
                        <li>
                          <button
                            className="dropdown-item d-flex align-items-center gap-2"
                            onClick={() =>
                              handleExport(
                                "excel"
                              )
                            }
                          >
                            <PiMicrosoftExcelLogoBold
                              color="green"
                              size={18}
                            />
                            Export Excel
                          </button>
                        </li>

                        <li>
                          <button
                            className="dropdown-item d-flex align-items-center gap-2"
                            onClick={() =>
                              handleExport(
                                "pdf"
                              )
                            }
                          >
                            <MdOutlinePictureAsPdf
                              color="red"
                              size={18}
                            />
                            Export PDF
                          </button>
                        </li>

                        <li>
                          <button
                            className="dropdown-item d-flex align-items-center gap-2"
                            onClick={() =>
                              handleExport(
                                "print"
                              )
                            }
                          >
                            <IoPrintOutline
                              color="#0d6efd"
                              size={18}
                            />
                            Print
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* TABLE */}

                  <div className="table-responsive mt-3">
                    <table className="table table-hover align-middle border mb-0">
                      <thead className="table-success">
                        <tr>
                          <th style={{ width: "50px" }}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                isCurrentPageSelected
                              }
                              onChange={
                                handleSelectAll
                              }
                            />
                          </th>

                          <th>Adm No.</th>
                          <th>Student Name</th>
                          <th>Gender</th>
                          <th>Class - Section</th>
                          <th>Date of Birth</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentStudents.length >
                        0 ? (
                          currentStudents.map(
                            (student) => (
                              <tr
                                key={
                                  student.admissionNumber
                                }
                              >
                                <td>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={selectedStudents.includes(
                                      student.admissionNumber
                                    )}
                                    onChange={(
                                      e
                                    ) =>
                                      handleStudentSelect(
                                        student.admissionNumber,
                                        e.target
                                          .checked
                                      )
                                    }
                                  />
                                </td>

                                <td className="fw-semibold">
                                  {
                                    student.admissionNumber
                                  }
                                </td>

                                <td>
                                  <div className="fw-medium">
                                    {
                                      student.firstName
                                    }{" "}
                                    {
                                      student.lastName
                                    }
                                  </div>
                                </td>

                                <td>
                                  {student.gender ||
                                    "-"}
                                </td>

                                <td>
                                  <span className="badge bg-light text-dark border">
                                    {
                                      student.studentClass
                                    }{" "}
                                    -{" "}
                                    {
                                      student.section
                                    }
                                  </span>
                                </td>

                                <td>
                                  {formatDate(
                                    student.dob
                                  )}
                                </td>

                                <td>
                                  <span className="badge bg-success">
                                    {student.status}
                                  </span>
                                </td>
                              </tr>
                            )
                          )
                        ) : (
                          <tr>
                            <td
                              colSpan="7"
                              className="text-center py-4 text-muted"
                            >
                              No students found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* PAGINATION */}

                  {totalPages > 1 && (
                    <div className="d-flex justify-content-end mt-3 flex-wrap gap-1">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        disabled={currentPage === 1}
                        onClick={() =>
                          setCurrentPage(
                            currentPage - 1
                          )
                        }
                      >
                        Previous
                      </button>

                      {[...Array(totalPages)].map(
                        (_, i) => (
                          <button
                            key={i}
                            className={`btn btn-sm ${
                              currentPage === i + 1
                                ? "btn-primary"
                                : "btn-outline-primary"
                            }`}
                            onClick={() =>
                              setCurrentPage(i + 1)
                            }
                          >
                            {i + 1}
                          </button>
                        )
                      )}

                      <button
                        className="btn btn-sm btn-outline-primary"
                        disabled={
                          currentPage === totalPages
                        }
                        onClick={() =>
                          setCurrentPage(
                            currentPage + 1
                          )
                        }
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {/* COUNTER */}

                  <div className="alert bg-white border mt-3 mb-0 d-flex justify-content-between py-2">
                    <span>
                      Total Students:{" "}
                      <strong>
                        {filteredStudents.length}
                      </strong>
                    </span>

                    <span>
                      Selected Students:{" "}
                      <strong>
                        {selectedStudents.length}
                      </strong>
                    </span>
                  </div>

                  {/* WARNING */}

                  <div
                    className="alert border mt-3 mb-0 d-flex align-items-start py-2"
                    style={{
                      backgroundColor: "#FFF3CD",
                      color: "#664D03",
                    }}
                  >
                    <RiErrorWarningFill
                      size={18}
                      className="me-2 mt-1"
                    />

                    <small>
                      Note: Only Active Students
                      are listed. Please select
                      students and click on
                      <strong>
                        {" "}
                        "Shuffle Students"
                      </strong>{" "}
                      to move them to another
                      section.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= SUMMARY ================= */}

            <div className="col-12 col-lg-3">
              <div className="card border-0 shadow h-100">
                <div className="card-header bg-white">
                  <strong>
                    <HiUsers
                      size={20}
                      className="text-success me-2"
                    />
                    Shuffling Summary
                  </strong>
                </div>

                <div className="card-body">
                  {/* CURRENT */}

                  <div className="border-bottom pb-3">
                    <small className="text-muted">
                      Current Session
                    </small>

                    <h6 className="text-success mb-2">
                      {selectedSession || "-"}
                    </h6>

                    <small className="text-muted">
                      Current Class - Section
                    </small>

                    <h6 className="text-success mb-0">
                      {selectedStandard || "-"} -{" "}
                      {selectedSection || "-"}
                    </h6>
                  </div>

                  {/* ARROW */}

                  <div className="text-center py-3">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          height: "1px",
                          background: "#dee2e6",
                          flex: 1,
                        }}
                      />

                      <span
                        className="bg-info d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        <FaArrowDown
                          size={17}
                          className="text-white"
                        />
                      </span>

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

                  <div className="border-bottom pb-3">
                    <small className="text-muted">
                      Next Session
                    </small>

                    <h6 className="text-success mb-2">
                      {selectedSession || "-"}
                    </h6>

                    <small className="text-muted">
                      Next Class - Section
                    </small>

                    <h6 className="text-success mb-0">
                      {selectedStandard || "-"} -{" "}
                      {selectedNewSection || "-"}
                    </h6>
                  </div>

                  {/* SELECTED */}

                  <div
                    className="alert text-center mt-3 mb-3"
                    style={{
                      backgroundColor: "#FFF3CD",
                      color: "#664D03",
                    }}
                  >
                    <small>
                      Selected Students
                    </small>

                    <h4 className="mb-0 fw-bold">
                      {selectedStudents.length}
                    </h4>
                  </div>

                  {/* BUTTON */}

                  <button
                    className="btn btn-success w-100"
                    onClick={
                      handleBulkSectionUpdate
                    }
                    disabled={sectionLoading}
                  >
                    <FaShuffle className="me-2" />

                    {sectionLoading
                      ? "Updating..."
                      : "Shuffle Students"}
                  </button>

                  <button
                    className="btn btn-light border w-100 mt-2"
                    disabled={
                      selectedStudents.length === 0
                    }
                    onClick={() =>
                      alert(
                        `${selectedStudents.length} student(s) selected for ${
                          selectedStandard || "-"
                        }-${selectedNewSection || "-"}`
                      )
                    }
                  >
                    <FaRegEye className="me-2" />
                    Preview Students
                  </button>

                  {/* INFO */}

                  <div
                    className="alert mt-3 mb-0 py-2"
                    style={{
                      backgroundColor: "#DEF0FF",
                      color: "#084298",
                    }}
                  >
                    <small>
                      Students will be shuffled
                      from{" "}
                      <strong>
                        {selectedStandard || "-"}-
                        {selectedSection || "-"}
                      </strong>{" "}
                      to{" "}
                      <strong>
                        {selectedStandard || "-"}-
                        {selectedNewSection || "-"}
                      </strong>
                      .
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SectionShuffling;