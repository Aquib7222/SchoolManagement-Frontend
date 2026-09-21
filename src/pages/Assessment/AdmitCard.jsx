// // // import React, { useState } from "react";
// // // import { FaRegListAlt, FaSearch, FaUserGraduate } from "react-icons/fa";
// // // import { MdOutlineSchool } from "react-icons/md";
// // // import useMasters from "../../hooks/useMasters";
// // // import axiosInstance from "../../api/axiosInstance";

// // // const AdmitCard = () => {
// // //   const { sessions, standards, sections } = useMasters();

// // //   const user = JSON.parse(localStorage.getItem("user"));
// // //   const schoolId = user?.schoolId;

// // //   const [loading, setLoading] = useState(false);

// // //   const [students, setStudents] = useState([]);

// // //   const [examTerms, setExamTerms] = useState([]);

// // //   const [selectedExamTerm, setSelectedExamTerm] = useState("");
// // //   const [selectedSitting,setSelectedSitting] = useState("");

// // //   const [filters, setFilters] = useState({
// // //     academicYear: "",
// // //     studentClass: "",
// // //     section: "",
// // //   });

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;

// // //     setFilters((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   const handleSearch = async () => {
// // //     if (!filters.academicYear || !filters.studentClass || !filters.section) {
// // //       alert("Please select Academic Year, Standard and Section");
// // //       return;
// // //     }

// // //     if (!schoolId) {
// // //       alert("School ID not found");
// // //       return;
// // //     }

// // //     try {
// // //       setLoading(true);

// // //       setSelectedExamTerm("");

// // //       const studentRes = await axiosInstance.get("/api/students/search", {
// // //         params: {
// // //           academicYear: filters.academicYear,
// // //           studentClass: filters.studentClass,
// // //           section: filters.section,
// // //         },
// // //       });

// // //       const studentData = studentRes.data || [];

// // //       setStudents(studentData);

// // //       if (studentData.length > 0) {
// // //         const examTermRes = await axiosInstance.get(
// // //           "/api/assessment/exam-term",
// // //           {
// // //             params: {
// // //               schoolId: schoolId,
// // //               session: filters.academicYear,
// // //             },
// // //           },
// // //         );

// // //         setExamTerms(examTermRes.data || []);
// // //       } else {
// // //         setExamTerms([]);
// // //       }
// // //     } catch (error) {
// // //       console.error("Search error:", error);

// // //       setStudents([]);
// // //       setExamTerms([]);
// // //       setSelectedExamTerm("");

// // //       alert(
// // //         error.response?.data?.message ||
// // //           "Something went wrong while searching students",
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleReset = () => {
// // //     setFilters({
// // //       academicYear: "",
// // //       studentClass: "",
// // //       section: "",
// // //     });

// // //     setStudents("");
// // //   };

// // //   return (
// // //     <>
// // //       <div className="mx-2 mt-2 mb-3">
// // //         <div
// // //           className="rounded-4 shadow overflow-hidden"
// // //           style={{
// // //             background:
// // //               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
// // //             border: "1px solid #dbeafe",
// // //           }}
// // //         >
// // //           <div className="p-3 p-md-4">
// // //             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
// // //               {/* LEFT */}
// // //               <div className="d-flex align-items-center gap-3">
// // //                 <div
// // //                   className="d-flex align-items-center justify-content-center rounded-3"
// // //                   style={{
// // //                     width: "52px",
// // //                     height: "52px",
// // //                     background: "linear-gradient(135deg,#2563eb,#3b82f6)",
// // //                     color: "#fff",
// // //                     boxShadow: "0 8px 20px rgba(37,99,235,.22)",
// // //                   }}
// // //                 >
// // //                   <FaUserGraduate size={26} />
// // //                 </div>

// // //                 <div>
// // //                   <h5 className="mb-1 fw-bold text-dark">Admit Card</h5>

// // //                   <div className="text-muted small">
// // //                     Assessment &nbsp;/&nbsp; Admit Card
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* RIGHT */}
// // //               <div className="d-flex align-items-center gap-2">
// // //                 <span
// // //                   className="badge rounded-pill px-3 py-2"
// // //                   style={{
// // //                     backgroundColor: "#eff6ff",
// // //                     color: "#2563eb",
// // //                     border: "1px solid #bfdbfe",
// // //                   }}
// // //                 >
// // //                   <MdOutlineSchool className="me-1" />
// // //                   Assessment
// // //                 </span>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* BREADCRUMB */}
// // //           <div
// // //             className="px-4 py-2"
// // //             style={{
// // //               backgroundColor: "rgba(239,246,255,.75)",
// // //               borderTop: "1px solid #e0ecff",
// // //             }}
// // //           >
// // //             <small className="text-muted">
// // //               Home &nbsp;›&nbsp; Assessment &nbsp;›&nbsp;
// // //               <span className="text-primary fw-semibold">Admit Card</span>
// // //             </small>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="mx-2 mt-2 mb-3">
// // //         <div className="card rounded-4 border-0 shadow overflow-hidden">
// // //           {/* HEADER */}
// // //           <div className="card-header bg-white p-3 border-bottom">
// // //             <strong className="d-flex align-items-center">
// // //               <span
// // //                 className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
// // //                 style={{
// // //                   backgroundColor: "#e8f6fa",
// // //                   width: "36px",
// // //                   height: "36px",
// // //                   color: "#2563eb",
// // //                 }}
// // //               >
// // //                 <FaSearch size={18} />
// // //               </span>
// // //               Search Students
// // //             </strong>
// // //           </div>

// // //           {/* BODY */}
// // //           <div className="card-body p-3">
// // //             <div className="row g-3 align-items-end">
// // //               {/* ACADEMIC YEAR */}
// // //               <div className="col-md-3">
// // //                 <label htmlFor="academicYear" className="form-label mb-2">
// // //                   <strong>Academic Year</strong>{" "}
// // //                   <span className="text-danger">*</span>
// // //                 </label>

// // //                 <select
// // //                   name="academicYear"
// // //                   id="academicYear"
// // //                   className="form-select"
// // //                   value={filters.academicYear}
// // //                   onChange={handleChange}
// // //                 >
// // //                   <option value="">Select Session</option>

// // //                   {sessions.map((item) => (
// // //                     <option key={item} value={item}>
// // //                       {item}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //               </div>

// // //               {/* STANDARD */}
// // //               <div className="col-md-3">
// // //                 <label htmlFor="studentClass" className="form-label mb-2">
// // //                   <strong>Standard</strong>{" "}
// // //                   <span className="text-danger">*</span>
// // //                 </label>

// // //                 <select
// // //                   name="studentClass"
// // //                   id="studentClass"
// // //                   className="form-select"
// // //                   value={filters.studentClass}
// // //                   onChange={handleChange}
// // //                 >
// // //                   <option value="">Select Standard</option>

// // //                   {standards.map((item) => (
// // //                     <option key={item} value={item}>
// // //                       {item}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //               </div>

// // //               {/* SECTION */}
// // //               <div className="col-md-3">
// // //                 <label htmlFor="section" className="form-label mb-2">
// // //                   <strong>Section</strong>{" "}
// // //                   <span className="text-danger">*</span>
// // //                 </label>

// // //                 <select
// // //                   name="section"
// // //                   id="section"
// // //                   className="form-select"
// // //                   value={filters.section}
// // //                   onChange={handleChange}
// // //                 >
// // //                   <option value="">Select Section</option>

// // //                   {sections.map((item) => (
// // //                     <option key={item} value={item}>
// // //                       {item}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //               </div>

// // //               {/* SEARCH BUTTON */}
// // //               <div className="col-md-3">
// // //                 <button
// // //                   type="button"
// // //                   className="btn btn-primary rounded-2 w-100"
// // //                   onClick={handleSearch}
// // //                   disabled={loading}
// // //                 >
// // //                   {loading ? (
// // //                     <>
// // //                       <span
// // //                         className="spinner-border spinner-border-sm me-2"
// // //                         role="status"
// // //                         aria-hidden="true"
// // //                       ></span>
// // //                       Searching...
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <FaSearch className="me-2" size={14} />
// // //                       Search
// // //                     </>
// // //                   )}
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             <div className="row mt-3">
// // //               <div className="col-md-3">
// // //                 <label htmlFor="examTerm" className="form-label mb-2">
// // //                   <strong>Exam Term</strong>{" "}
// // //                   <span className="text-danger">*</span>
// // //                 </label>

// // //                 <select
// // //                   name="examTerm"
// // //                   id="examTerm"
// // //                   className="form-select"
// // //                   value={selectedExamTerm}
// // //                   onChange={(e) => setSelectedExamTerm(e.target.value)}
// // //                   disabled={students.length === 0}
// // //                 >
// // //                   <option value="">
// // //                     {students.length === 0
// // //                       ? "Search Students First"
// // //                       : examTerms.length === 0
// // //                         ? "No Exam Term Available"
// // //                         : "Select Exam Term"}
// // //                   </option>

// // //                   {students.length > 0 &&
// // //                     examTerms.map((item) => (
// // //                       <option key={item.id} value={item.examTerm}>
// // //                         {item.examTerm}
// // //                       </option>
// // //                     ))}
// // //                 </select>
// // //               </div>
// // //               <div className="col-md-3">
// // //                 <label htmlFor="examTerm" className="form-label mb-2">
// // //                   <strong>Select Sitting</strong>{" "}
// // //                   <span className="text-danger">*</span>
// // //                 </label>

// // //                 <select
                  
// // //                   className="form-select"
// // //                   value={selectedSitting}
// // //                   onChange={(e) => setSelectedSitting(e.target.value)}
// // //                   disabled={students.length === 0}
// // //                 >
// // //                   <option value="">
// // //                     Select Sitting
// // //                   </option>

// // //                   <option value={"1st Sitting"}>1st Sitting</option>
// // //                   <option value={"2nd Sitting"}>2nd Sitting</option>
// // //                 </select>
// // //               </div>
// // //               <div className="col-md-3">
// // //                 <button
// // //                   className="btn btn-danger rounded-2 w-100"
// // //                   style={{ marginTop: "35px" }}
// // //                   onClick={handleReset}
// // //                 >
// // //                   Reset
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="mx-2 mt-2 mb-3">
// // //         <div className="card rounded-4 border-0 shadow overflow-hidden">
// // //           <div className="card-header bg-white p-3 border-bottom">
// // //             <div className="d-flex align-items-center">
// // //               {/* Icon */}
// // //               <span
// // //                 className="d-inline-flex align-items-center justify-content-center rounded-2 me-2 flex-shrink-0"
// // //                 style={{
// // //                   backgroundColor: "#e8f6fa",
// // //                   width: "36px",
// // //                   height: "36px",
// // //                   color: "#2563eb",
// // //                 }}
// // //               >
// // //                 <FaRegListAlt size={18} />
// // //               </span>

// // //               <div>
// // //                 <h6 className="mb-0 fw-semibold text-dark">Students List</h6>

// // //                 <div className="text-muted small mt-1">
// // //                   Select exam term and add room no
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //         <div className="card-body p-3">

// // //   {loading ? (
// // //     <div className="text-center py-5">
// // //       <div
// // //         className="spinner-border text-primary"
// // //         role="status"
// // //         style={{ width: "2.5rem", height: "2.5rem" }}
// // //       >
// // //         <span className="visually-hidden">Loading...</span>
// // //       </div>

// // //       <p className="text-muted small mt-3 mb-0">
// // //         Searching students...
// // //       </p>
// // //     </div>

// // //   ) : students.length === 0 ? (

// // //     <div className="text-center py-4">
// // //       <FaUserGraduate
// // //         size={35}
// // //         className="mb-2 text-primary"
// // //       />

// // //       <h6 className="fw-semibold text-dark mb-1">
// // //         No Students Found
// // //       </h6>

// // //       <p className="text-muted small mb-0">
// // //         Please search students by selecting Academic Year,
// // //         Standard and Section.
// // //       </p>
// // //     </div>

// // //   ) : (

// // //     <div className="table-responsive">
// // //       <table className="table table-hover align-middle mb-0">

// // //         <thead className="table-light">
// // //           <tr>
// // //             <th>#</th>
// // //             <th>Student</th>
// // //             <th>Admission No.</th>
// // //             <th>Class</th>
            
// // //             <th>Academic Year</th>
// // //             <th>Exam Term</th>
// // //             <th>Room No</th>
// // //             <th>Sitting</th>
// // //             <th>Start Time</th>
// // //             <th>End Time</th>
// // //           </tr>
// // //         </thead>

// // //         <tbody>
// // //           {students.map((student, index) => (
// // //             <tr key={student.id || index}>

// // //               <td>
// // //                 {index + 1}
// // //               </td>

// // //               <td>
// // //                 <div className="d-flex align-items-center">

// // //                   {student.photo ? (
// // //                     <img
// // //                       src={student.photo}
// // //                       alt={student.name}
// // //                       style={{
// // //                         width: "40px",
// // //                         height: "40px",
// // //                         objectFit: "cover",
// // //                         borderRadius: "50%",
// // //                         marginRight: "10px",
// // //                       }}
// // //                     />
// // //                   ) : (
// // //                     <div
// // //                       className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary"
// // //                       style={{
// // //                         width: "40px",
// // //                         height: "40px",
// // //                         borderRadius: "50%",
// // //                         marginRight: "10px",
// // //                       }}
// // //                     >
// // //                       <FaUserGraduate size={18} />
// // //                     </div>
// // //                   )}

// // //                   <div>
// // //                     <div className="fw-semibold text-dark">
// // //                       {student.firstName || "-"} {student.lastName}
// // //                     </div>

// // //                     <small className="text-muted">
// // //                       {student.email || "-"}
// // //                     </small>
// // //                   </div>

// // //                 </div>
// // //               </td>

// // //               <td>
// // //                 <span className="fw-medium">
// // //                   {student.admissionNumber || "-"}
// // //                 </span>
// // //               </td>

// // //               <td>
// // //                 {student.studentClass}/{student/section}
// // //               </td>

             

// // //               <td>
// // //                 {student.academicYear || "-"}
// // //               </td>

// // //               <td>
// // //                 <input type="text" className="form-control"  value={selectedExamTerm}/>
// // //               </td>

// // //                   <td><input type="text" className="form-control" /></td>
// // //                   <td><input type="text" className="form-control"  value={selectedSitting}/></td>
// // //                   <td><input type="time" className="form-control" /></td>
// // //                   <td><input type="time" className="form-control" /></td>
// // //             </tr>
// // //           ))}
// // //         </tbody>

// // //       </table>
// // //     </div>

// // //   )}

// // // </div>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default AdmitCard;


// // import React, { useState } from "react";
// // import {
// //   FaRegListAlt,
// //   FaSearch,
// //   FaUserGraduate,
// //   FaClock,
// // } from "react-icons/fa";
// // import { MdOutlineSchool } from "react-icons/md";
// // import useMasters from "../../hooks/useMasters";
// // import axiosInstance from "../../api/axiosInstance";

// // const AdmitCard = () => {
// //   const { sessions, standards, sections } = useMasters();

// //   const user = JSON.parse(localStorage.getItem("user"));
// //   const schoolId = user?.schoolId;

// //   const [loading, setLoading] = useState(false);
// //   const [students, setStudents] = useState([]);
// //   const [examTerms, setExamTerms] = useState([]);

// //   const [selectedExamTerm, setSelectedExamTerm] = useState("");
// //   const [selectedSitting, setSelectedSitting] = useState("");

// //   // Same timing for all students
// //   const [startTime, setStartTime] = useState("");
// //   const [endTime, setEndTime] = useState("");

// //   // Room number can be different for each student
// //   const [roomNumbers, setRoomNumbers] = useState({});

// //   const [filters, setFilters] = useState({
// //     academicYear: "",
// //     studentClass: "",
// //     section: "",
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     setFilters((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSearch = async () => {
// //     if (
// //       !filters.academicYear ||
// //       !filters.studentClass ||
// //       !filters.section
// //     ) {
// //       alert("Please select Academic Year, Standard and Section");
// //       return;
// //     }

// //     if (!schoolId) {
// //       alert("School ID not found");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       // Reset previous selections
// //       setSelectedExamTerm("");
// //       setSelectedSitting("");
// //       setStartTime("");
// //       setEndTime("");
// //       setRoomNumbers({});

// //       const studentRes = await axiosInstance.get("/api/students/search", {
// //         params: {
// //           academicYear: filters.academicYear,
// //           studentClass: filters.studentClass,
// //           section: filters.section,
// //         },
// //       });

// //       const studentData = studentRes.data || [];

// //       setStudents(studentData);

// //       if (studentData.length > 0) {
// //         const examTermRes = await axiosInstance.get(
// //           "/api/assessment/exam-term",
// //           {
// //             params: {
// //               schoolId: schoolId,
// //               session: filters.academicYear,
// //             },
// //           }
// //         );

// //         setExamTerms(examTermRes.data || []);
// //       } else {
// //         setExamTerms([]);
// //       }
// //     } catch (error) {
// //       console.error("Search error:", error);

// //       setStudents([]);
// //       setExamTerms([]);
// //       setSelectedExamTerm("");
// //       setSelectedSitting("");
// //       setStartTime("");
// //       setEndTime("");
// //       setRoomNumbers({});

// //       alert(
// //         error.response?.data?.message ||
// //           "Something went wrong while searching students"
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRoomChange = (studentId, value) => {
// //     setRoomNumbers((prev) => ({
// //       ...prev,
// //       [studentId]: value,
// //     }));
// //   };

// //   const handleReset = () => {
// //     setFilters({
// //       academicYear: "",
// //       studentClass: "",
// //       section: "",
// //     });

// //     setStudents([]);
// //     setExamTerms([]);

// //     setSelectedExamTerm("");
// //     setSelectedSitting("");

// //     setStartTime("");
// //     setEndTime("");

// //     setRoomNumbers({});
// //   };

// //   return (
// //     <>
// //       {/* =========================================================
// //           PAGE HEADER
// //       ========================================================= */}
// //       <div className="mx-2 mt-2 mb-3">
// //         <div
// //           className="rounded-4 shadow overflow-hidden"
// //           style={{
// //             background:
// //               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
// //             border: "1px solid #dbeafe",
// //           }}
// //         >
// //           <div className="p-3 p-md-4">
// //             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
// //               {/* LEFT */}
// //               <div className="d-flex align-items-center gap-3">
// //                 <div
// //                   className="d-flex align-items-center justify-content-center rounded-3"
// //                   style={{
// //                     width: "52px",
// //                     height: "52px",
// //                     background:
// //                       "linear-gradient(135deg,#2563eb,#3b82f6)",
// //                     color: "#fff",
// //                     boxShadow: "0 8px 20px rgba(37,99,235,.22)",
// //                   }}
// //                 >
// //                   <FaUserGraduate size={26} />
// //                 </div>

// //                 <div>
// //                   <h5 className="mb-1 fw-bold text-dark">
// //                     Admit Card
// //                   </h5>

// //                   <div className="text-muted small">
// //                     Assessment &nbsp;/&nbsp; Admit Card
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* RIGHT */}
// //               <div className="d-flex align-items-center gap-2">
// //                 <span
// //                   className="badge rounded-pill px-3 py-2"
// //                   style={{
// //                     backgroundColor: "#eff6ff",
// //                     color: "#2563eb",
// //                     border: "1px solid #bfdbfe",
// //                   }}
// //                 >
// //                   <MdOutlineSchool className="me-1" />
// //                   Assessment
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* BREADCRUMB */}
// //           <div
// //             className="px-4 py-2"
// //             style={{
// //               backgroundColor: "rgba(239,246,255,.75)",
// //               borderTop: "1px solid #e0ecff",
// //             }}
// //           >
// //             <small className="text-muted">
// //               Home &nbsp;›&nbsp; Assessment &nbsp;›&nbsp;
// //               <span className="text-primary fw-semibold">
// //                 Admit Card
// //               </span>
// //             </small>
// //           </div>
// //         </div>
// //       </div>

// //       {/* =========================================================
// //           SEARCH CARD
// //       ========================================================= */}
// //       <div className="mx-2 mt-2 mb-3">
// //         <div className="card rounded-4 border-0 shadow overflow-hidden">
// //           {/* HEADER */}
// //           <div className="card-header bg-white p-3 border-bottom">
// //             <strong className="d-flex align-items-center">
// //               <span
// //                 className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
// //                 style={{
// //                   backgroundColor: "#e8f6fa",
// //                   width: "36px",
// //                   height: "36px",
// //                   color: "#2563eb",
// //                 }}
// //               >
// //                 <FaSearch size={18} />
// //               </span>

// //               Search Students
// //             </strong>
// //           </div>

// //           {/* BODY */}
// //           <div className="card-body p-3">
// //             <div className="row g-3 align-items-end">
// //               {/* ACADEMIC YEAR */}
// //               <div className="col-md-3">
// //                 <label
// //                   htmlFor="academicYear"
// //                   className="form-label mb-2"
// //                 >
// //                   <strong>Academic Year</strong>{" "}
// //                   <span className="text-danger">*</span>
// //                 </label>

// //                 <select
// //                   name="academicYear"
// //                   id="academicYear"
// //                   className="form-select"
// //                   value={filters.academicYear}
// //                   onChange={handleChange}
// //                 >
// //                   <option value="">Select Session</option>

// //                   {sessions.map((item) => (
// //                     <option key={item} value={item}>
// //                       {item}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* STANDARD */}
// //               <div className="col-md-3">
// //                 <label
// //                   htmlFor="studentClass"
// //                   className="form-label mb-2"
// //                 >
// //                   <strong>Standard</strong>{" "}
// //                   <span className="text-danger">*</span>
// //                 </label>

// //                 <select
// //                   name="studentClass"
// //                   id="studentClass"
// //                   className="form-select"
// //                   value={filters.studentClass}
// //                   onChange={handleChange}
// //                 >
// //                   <option value="">Select Standard</option>

// //                   {standards.map((item) => (
// //                     <option key={item} value={item}>
// //                       {item}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* SECTION */}
// //               <div className="col-md-3">
// //                 <label
// //                   htmlFor="section"
// //                   className="form-label mb-2"
// //                 >
// //                   <strong>Section</strong>{" "}
// //                   <span className="text-danger">*</span>
// //                 </label>

// //                 <select
// //                   name="section"
// //                   id="section"
// //                   className="form-select"
// //                   value={filters.section}
// //                   onChange={handleChange}
// //                 >
// //                   <option value="">Select Section</option>

// //                   {sections.map((item) => (
// //                     <option key={item} value={item}>
// //                       {item}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* SEARCH */}
// //               <div className="col-md-3">
// //                 <button
// //                   type="button"
// //                   className="btn btn-primary rounded-2 w-100"
// //                   onClick={handleSearch}
// //                   disabled={loading}
// //                   style={{
// //                     height: "38px",
// //                     boxShadow: "0 5px 12px rgba(37,99,235,.18)",
// //                   }}
// //                 >
// //                   {loading ? (
// //                     <>
// //                       <span
// //                         className="spinner-border spinner-border-sm me-2"
// //                         role="status"
// //                         aria-hidden="true"
// //                       ></span>

// //                       Searching...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <FaSearch className="me-2" size={14} />
// //                       Search
// //                     </>
// //                   )}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* =====================================================
// //                 EXAM SETTINGS
// //             ===================================================== */}
// //             <div
// //               className="mt-4 pt-3"
// //               style={{
// //                 borderTop: "1px solid #edf2f7",
// //               }}
// //             >
// //               <div className="row g-3 align-items-end">
// //                 {/* EXAM TERM */}
// //                 <div className="col-md-3">
// //                   <label
// //                     htmlFor="examTerm"
// //                     className="form-label mb-2"
// //                   >
// //                     <strong>Exam Term</strong>{" "}
// //                     <span className="text-danger">*</span>
// //                   </label>

// //                   <select
// //                     name="examTerm"
// //                     id="examTerm"
// //                     className="form-select"
// //                     value={selectedExamTerm}
// //                     onChange={(e) =>
// //                       setSelectedExamTerm(e.target.value)
// //                     }
// //                     disabled={students.length === 0}
// //                   >
// //                     <option value="">
// //                       {students.length === 0
// //                         ? "Search Students First"
// //                         : examTerms.length === 0
// //                         ? "No Exam Term Available"
// //                         : "Select Exam Term"}
// //                     </option>

// //                     {students.length > 0 &&
// //                       examTerms.map((item) => (
// //                         <option
// //                           key={item.id}
// //                           value={item.examTerm}
// //                         >
// //                           {item.examTerm}
// //                         </option>
// //                       ))}
// //                   </select>
// //                 </div>

// //                 {/* SITTING */}
// //                 <div className="col-md-2">
// //                   <label
// //                     htmlFor="sitting"
// //                     className="form-label mb-2"
// //                   >
// //                     <strong>Select Sitting</strong>{" "}
// //                     <span className="text-danger">*</span>
// //                   </label>

// //                   <select
// //                     id="sitting"
// //                     className="form-select"
// //                     value={selectedSitting}
// //                     onChange={(e) =>
// //                       setSelectedSitting(e.target.value)
// //                     }
// //                     disabled={students.length === 0}
// //                   >
// //                     <option value="">Select Sitting</option>

// //                     <option value="1st Sitting">
// //                       1st Sitting
// //                     </option>

// //                     <option value="2nd Sitting">
// //                       2nd Sitting
// //                     </option>
// //                   </select>
// //                 </div>

// //                 {/* START TIME */}
// //                 <div className="col-md-2">
// //                   <label
// //                     htmlFor="startTime"
// //                     className="form-label mb-2"
// //                   >
// //                     <strong>Start Time</strong>{" "}
// //                     <span className="text-danger">*</span>
// //                   </label>

// //                   <div className="input-group">
// //                     <span className="input-group-text bg-white">
// //                       <FaClock
// //                         size={14}
// //                         className="text-primary"
// //                       />
// //                     </span>

// //                     <input
// //                       type="time"
// //                       id="startTime"
// //                       className="form-control"
// //                       value={startTime}
// //                       onChange={(e) =>
// //                         setStartTime(e.target.value)
// //                       }
// //                       disabled={students.length === 0}
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* END TIME */}
// //                 <div className="col-md-2">
// //                   <label
// //                     htmlFor="endTime"
// //                     className="form-label mb-2"
// //                   >
// //                     <strong>End Time</strong>{" "}
// //                     <span className="text-danger">*</span>
// //                   </label>

// //                   <div className="input-group">
// //                     <span className="input-group-text bg-white">
// //                       <FaClock
// //                         size={14}
// //                         className="text-primary"
// //                       />
// //                     </span>

// //                     <input
// //                       type="time"
// //                       id="endTime"
// //                       className="form-control"
// //                       value={endTime}
// //                       onChange={(e) =>
// //                         setEndTime(e.target.value)
// //                       }
// //                       disabled={students.length === 0}
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* RESET */}
// //                 <div className="col-md-3">
// //                   <button
// //                     type="button"
// //                     className="btn btn-danger rounded-2 w-100"
// //                     onClick={handleReset}
// //                   >
// //                     Reset
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* =========================================================
// //           STUDENTS LIST
// //       ========================================================= */}
// //       <div className="mx-2 mt-2 mb-3">
// //         <div className="card rounded-4 border-0 shadow overflow-hidden">
// //           {/* HEADER */}
// //           <div className="card-header bg-white p-3 border-bottom">
// //             <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
// //               <div className="d-flex align-items-center">
// //                 <span
// //                   className="d-inline-flex align-items-center justify-content-center rounded-2 me-2 flex-shrink-0"
// //                   style={{
// //                     backgroundColor: "#e8f6fa",
// //                     width: "36px",
// //                     height: "36px",
// //                     color: "#2563eb",
// //                   }}
// //                 >
// //                   <FaRegListAlt size={18} />
// //                 </span>

// //                 <div>
// //                   <h6 className="mb-0 fw-semibold text-dark">
// //                     Students List
// //                   </h6>

// //                   <div className="text-muted small mt-1">
// //                     Add room number for each student
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* STUDENT COUNT */}
// //               {students.length > 0 && (
// //                 <span
// //                   className="badge rounded-pill px-3 py-2"
// //                   style={{
// //                     backgroundColor: "#eff6ff",
// //                     color: "#2563eb",
// //                     border: "1px solid #bfdbfe",
// //                   }}
// //                 >
// //                   {students.length} Students
// //                 </span>
// //               )}
// //             </div>
// //           </div>

// //           {/* BODY */}
// //           <div className="card-body p-0">
// //             {loading ? (
// //               <div className="text-center py-5">
// //                 <div
// //                   className="spinner-border text-primary"
// //                   role="status"
// //                   style={{
// //                     width: "2.5rem",
// //                     height: "2.5rem",
// //                   }}
// //                 >
// //                   <span className="visually-hidden">
// //                     Loading...
// //                   </span>
// //                 </div>

// //                 <p className="text-muted small mt-3 mb-0">
// //                   Searching students...
// //                 </p>
// //               </div>
// //             ) : students.length === 0 ? (
// //               <div className="text-center py-5">
// //                 <div
// //                   className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
// //                   style={{
// //                     width: "65px",
// //                     height: "65px",
// //                     backgroundColor: "#eff6ff",
// //                   }}
// //                 >
// //                   <FaUserGraduate
// //                     size={30}
// //                     className="text-primary"
// //                   />
// //                 </div>

// //                 <h6 className="fw-semibold text-dark mb-1">
// //                   No Students Found
// //                 </h6>

// //                 <p className="text-muted small mb-0">
// //                   Please search students by selecting Academic
// //                   Year, Standard and Section.
// //                 </p>
// //               </div>
// //             ) : (
// //               <div
// //                 className="table-responsive"
// //                 style={{
// //                   maxHeight: "550px",
// //                   overflowY: "auto",
// //                 }}
// //               >
// //                 <table
// //                   className="table table-hover align-middle mb-0"
// //                   style={{
// //                     minWidth: "1050px",
// //                   }}
// //                 >
// //                   <thead
// //                     style={{
// //                       position: "sticky",
// //                       top: 0,
// //                       zIndex: 5,
// //                       backgroundColor: "#f8fafc",
// //                     }}
// //                   >
// //                     <tr>
// //                       <th
// //                         className="px-3 py-3 text-muted small fw-semibold"
// //                         style={{ width: "55px" }}
// //                       >
// //                         #
// //                       </th>

// //                       <th
// //                         className="px-3 py-3 text-muted small fw-semibold"
// //                         style={{ minWidth: "240px" }}
// //                       >
// //                         Student
// //                       </th>

// //                       <th className="px-3 py-3 text-muted small fw-semibold">
// //                         Admission No.
// //                       </th>

// //                       <th className="px-3 py-3 text-muted small fw-semibold">
// //                         Class
// //                       </th>

// //                       <th className="px-3 py-3 text-muted small fw-semibold">
// //                         Section
// //                       </th>

// //                       <th className="px-3 py-3 text-muted small fw-semibold">
// //                         Academic Year
// //                       </th>

// //                       <th
// //                         className="px-3 py-3 text-muted small fw-semibold"
// //                         style={{ minWidth: "150px" }}
// //                       >
// //                         Room No.
// //                       </th>

// //                       <th className="px-3 py-3 text-muted small fw-semibold">
// //                         Exam Term
// //                       </th>

// //                       <th className="px-3 py-3 text-muted small fw-semibold">
// //                         Sitting
// //                       </th>

// //                       <th className="px-3 py-3 text-muted small fw-semibold">
// //                         Start Time
// //                       </th>

// //                       <th className="px-3 py-3 text-muted small fw-semibold">
// //                         End Time
// //                       </th>
// //                     </tr>
// //                   </thead>

// //                   <tbody>
// //                     {students.map((student, index) => {
// //                       const studentKey =
// //                         student.id ||
// //                         student.admissionNumber ||
// //                         index;

// //                       return (
// //                         <tr key={studentKey}>
// //                           {/* NUMBER */}
// //                           <td className="px-3 py-3">
// //                             <span className="fw-semibold text-muted">
// //                               {index + 1}
// //                             </span>
// //                           </td>

// //                           {/* STUDENT */}
// //                           <td className="px-3 py-3">
// //                             <div className="d-flex align-items-center">
// //                               {student.photo ? (
// //                                 <img
// //                                   src={student.photo}
// //                                   alt={
// //                                     student.firstName || "Student"
// //                                   }
// //                                   style={{
// //                                     width: "42px",
// //                                     height: "42px",
// //                                     objectFit: "cover",
// //                                     borderRadius: "50%",
// //                                     marginRight: "11px",
// //                                     border:
// //                                       "2px solid #e0ecff",
// //                                   }}
// //                                 />
// //                               ) : (
// //                                 <div
// //                                   className="d-flex align-items-center justify-content-center flex-shrink-0"
// //                                   style={{
// //                                     width: "42px",
// //                                     height: "42px",
// //                                     borderRadius: "50%",
// //                                     marginRight: "11px",
// //                                     backgroundColor: "#eff6ff",
// //                                     color: "#2563eb",
// //                                     border:
// //                                       "2px solid #dbeafe",
// //                                   }}
// //                                 >
// //                                   <FaUserGraduate size={18} />
// //                                 </div>
// //                               )}

// //                               <div>
// //                                 <div className="fw-semibold text-dark">
// //                                   {student.firstName || "-"}{" "}
// //                                   {student.lastName || ""}
// //                                 </div>

// //                                 {student.email && (
// //                                   <small className="text-muted">
// //                                     {student.email}
// //                                   </small>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           </td>

// //                           {/* ADMISSION NUMBER */}
// //                           <td className="px-3 py-3">
// //                             <span
// //                               className="fw-semibold"
// //                               style={{
// //                                 color: "#2563eb",
// //                               }}
// //                             >
// //                               {student.admissionNumber || "-"}
// //                             </span>
// //                           </td>

// //                           {/* CLASS */}
// //                           <td className="px-3 py-3">
// //                             <span className="fw-medium text-dark">
// //                               {student.studentClass || "-"}
// //                             </span>
// //                           </td>

// //                           {/* SECTION */}
// //                           <td className="px-3 py-3">
// //                             <span
// //                               className="badge rounded-pill"
// //                               style={{
// //                                 backgroundColor: "#f1f5f9",
// //                                 color: "#475569",
// //                                 border:
// //                                   "1px solid #e2e8f0",
// //                               }}
// //                             >
// //                               {student.section || "-"}
// //                             </span>
// //                           </td>

// //                           {/* ACADEMIC YEAR */}
// //                           <td className="px-3 py-3">
// //                             {student.academicYear || "-"}
// //                           </td>

// //                           {/* ROOM NUMBER */}
// //                           <td className="px-3 py-3">
// //                             <input
// //                               type="text"
// //                               className="form-control form-control-sm"
// //                               placeholder="Room No."
// //                               value={
// //                                 roomNumbers[studentKey] || ""
// //                               }
// //                               onChange={(e) =>
// //                                 handleRoomChange(
// //                                   studentKey,
// //                                   e.target.value
// //                                 )
// //                               }
// //                               style={{
// //                                 minWidth: "120px",
// //                                 borderRadius: "8px",
// //                               }}
// //                             />
// //                           </td>

// //                           {/* EXAM TERM */}
// //                           <td className="px-3 py-3">
// //                             <span
// //                               className="badge rounded-pill"
// //                               style={{
// //                                 backgroundColor:
// //                                   "#eff6ff",
// //                                 color: "#2563eb",
// //                                 border:
// //                                   "1px solid #bfdbfe",
// //                                 whiteSpace: "nowrap",
// //                               }}
// //                             >
// //                               {selectedExamTerm || "-"}
// //                             </span>
// //                           </td>

// //                           {/* SITTING */}
// //                           <td className="px-3 py-3">
// //                             <span
// //                               className="badge rounded-pill"
// //                               style={{
// //                                 backgroundColor: "#f0fdf4",
// //                                 color: "#15803d",
// //                                 border:
// //                                   "1px solid #bbf7d0",
// //                                 whiteSpace: "nowrap",
// //                               }}
// //                             >
// //                               {selectedSitting || "-"}
// //                             </span>
// //                           </td>

// //                           {/* START TIME */}
// //                           <td className="px-3 py-3">
// //                             <span className="fw-medium text-dark">
// //                               {startTime || "-"}
// //                             </span>
// //                           </td>

// //                           {/* END TIME */}
// //                           <td className="px-3 py-3">
// //                             <span className="fw-medium text-dark">
// //                               {endTime || "-"}
// //                             </span>
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default AdmitCard;


// import React, { useState } from "react";
// import {
//   FaEye,
//   FaRegListAlt,
//   FaSearch,
//   FaUserGraduate,
//   FaClock,
//   FaTimes,
//   FaPrint,
// } from "react-icons/fa";
// import { MdOutlineSchool } from "react-icons/md";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";

// const AdmitCard = () => {
//   const { sessions, standards, sections } = useMasters();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;

//   const [loading, setLoading] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [examTerms, setExamTerms] = useState([]);

//   const [selectedExamTerm, setSelectedExamTerm] = useState("");
//   const [selectedSitting, setSelectedSitting] = useState("");

//   // Same timing for all students
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   // Room number can be different for each student
//   const [roomNumbers, setRoomNumbers] = useState({});

//   // Selected student for Admit Card Preview
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   const [filters, setFilters] = useState({
//     academicYear: "",
//     studentClass: "",
//     section: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSearch = async () => {
//     if (
//       !filters.academicYear ||
//       !filters.studentClass ||
//       !filters.section
//     ) {
//       alert("Please select Academic Year, Standard and Section");
//       return;
//     }

//     if (!schoolId) {
//       alert("School ID not found");
//       return;
//     }

//     try {
//       setLoading(true);

//       setSelectedExamTerm("");
//       setSelectedSitting("");
//       setStartTime("");
//       setEndTime("");
//       setRoomNumbers({});
//       setSelectedStudent(null);

//       const studentRes = await axiosInstance.get("/api/students/search", {
//         params: {
//           academicYear: filters.academicYear,
//           studentClass: filters.studentClass,
//           section: filters.section,
//         },
//       });

//       const studentData = studentRes.data || [];

//       setStudents(studentData);

//       if (studentData.length > 0) {
//         const examTermRes = await axiosInstance.get(
//           "/api/assessment/exam-term",
//           {
//             params: {
//               schoolId: schoolId,
//               session: filters.academicYear,
//             },
//           }
//         );

//         setExamTerms(examTermRes.data || []);
//       } else {
//         setExamTerms([]);
//       }
//     } catch (error) {
//       console.error("Search error:", error);

//       setStudents([]);
//       setExamTerms([]);
//       setSelectedExamTerm("");
//       setSelectedSitting("");
//       setStartTime("");
//       setEndTime("");
//       setRoomNumbers({});
//       setSelectedStudent(null);

//       alert(
//         error.response?.data?.message ||
//           "Something went wrong while searching students"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRoomChange = (studentId, value) => {
//     setRoomNumbers((prev) => ({
//       ...prev,
//       [studentId]: value,
//     }));
//   };

//   const handleViewAdmitCard = (student) => {
//     setSelectedStudent(student);
//   };

//   const handleCloseAdmitCard = () => {
//     setSelectedStudent(null);
//   };

//   const handleReset = () => {
//     setFilters({
//       academicYear: "",
//       studentClass: "",
//       section: "",
//     });

//     setStudents([]);
//     setExamTerms([]);

//     setSelectedExamTerm("");
//     setSelectedSitting("");

//     setStartTime("");
//     setEndTime("");

//     setRoomNumbers({});
//     setSelectedStudent(null);
//   };

//   const selectedStudentKey =
//     selectedStudent?.id ||
//     selectedStudent?.admissionNumber ||
//     "";

//   const selectedRoomNumber =
//     roomNumbers[selectedStudentKey] || "";

//   return (
//     <>
//       {/* =========================================================
//           PAGE HEADER
//       ========================================================= */}
//       <div className="mx-2 mt-2 mb-3">
//         <div
//           className="rounded-4 shadow overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
//             border: "1px solid #dbeafe",
//           }}
//         >
//           <div className="p-3 p-md-4">
//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//               <div className="d-flex align-items-center gap-3">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow: "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <FaUserGraduate size={26} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     Admit Card
//                   </h5>

//                   <div className="text-muted small">
//                     Assessment &nbsp;/&nbsp; Admit Card
//                   </div>
//                 </div>
//               </div>

//               <div className="d-flex align-items-center gap-2">
//                 <span
//                   className="badge rounded-pill px-3 py-2"
//                   style={{
//                     backgroundColor: "#eff6ff",
//                     color: "#2563eb",
//                     border: "1px solid #bfdbfe",
//                   }}
//                 >
//                   <MdOutlineSchool className="me-1" />
//                   Assessment
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div
//             className="px-4 py-2"
//             style={{
//               backgroundColor: "rgba(239,246,255,.75)",
//               borderTop: "1px solid #e0ecff",
//             }}
//           >
//             <small className="text-muted">
//               Home &nbsp;›&nbsp; Assessment &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Admit Card
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//           SEARCH CARD
//       ========================================================= */}
//       <div className="mx-2 mt-2 mb-3">
//         <div className="card rounded-4 border-0 shadow overflow-hidden">
//           <div className="card-header bg-white p-3 border-bottom">
//             <strong className="d-flex align-items-center">
//               <span
//                 className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                 style={{
//                   backgroundColor: "#e8f6fa",
//                   width: "36px",
//                   height: "36px",
//                   color: "#2563eb",
//                 }}
//               >
//                 <FaSearch size={18} />
//               </span>

//               Search Students
//             </strong>
//           </div>

//           <div className="card-body p-3">
//             <div className="row g-3 align-items-end">
//               {/* ACADEMIC YEAR */}
//               <div className="col-md-3">
//                 <label
//                   htmlFor="academicYear"
//                   className="form-label mb-2"
//                 >
//                   <strong>Academic Year</strong>{" "}
//                   <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   name="academicYear"
//                   id="academicYear"
//                   className="form-select"
//                   value={filters.academicYear}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Session</option>

//                   {sessions.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* STANDARD */}
//               <div className="col-md-3">
//                 <label
//                   htmlFor="studentClass"
//                   className="form-label mb-2"
//                 >
//                   <strong>Standard</strong>{" "}
//                   <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   name="studentClass"
//                   id="studentClass"
//                   className="form-select"
//                   value={filters.studentClass}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Standard</option>

//                   {standards.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* SECTION */}
//               <div className="col-md-3">
//                 <label
//                   htmlFor="section"
//                   className="form-label mb-2"
//                 >
//                   <strong>Section</strong>{" "}
//                   <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   name="section"
//                   id="section"
//                   className="form-select"
//                   value={filters.section}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Section</option>

//                   {sections.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* SEARCH */}
//               <div className="col-md-3">
//                 <button
//                   type="button"
//                   className="btn btn-primary rounded-2 w-100"
//                   onClick={handleSearch}
//                   disabled={loading}
//                   style={{
//                     height: "38px",
//                     boxShadow: "0 5px 12px rgba(37,99,235,.18)",
//                   }}
//                 >
//                   {loading ? (
//                     <>
//                       <span
//                         className="spinner-border spinner-border-sm me-2"
//                         role="status"
//                         aria-hidden="true"
//                       ></span>
//                       Searching...
//                     </>
//                   ) : (
//                     <>
//                       <FaSearch className="me-2" size={14} />
//                       Search
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* =====================================================
//                 EXAM SETTINGS
//             ===================================================== */}
//             <div
//               className="mt-4 pt-3"
//               style={{
//                 borderTop: "1px solid #edf2f7",
//               }}
//             >
//               <div className="row g-3 align-items-end">
//                 {/* EXAM TERM */}
//                 <div className="col-md-3">
//                   <label
//                     htmlFor="examTerm"
//                     className="form-label mb-2"
//                   >
//                     <strong>Exam Term</strong>{" "}
//                     <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     name="examTerm"
//                     id="examTerm"
//                     className="form-select"
//                     value={selectedExamTerm}
//                     onChange={(e) =>
//                       setSelectedExamTerm(e.target.value)
//                     }
//                     disabled={students.length === 0}
//                   >
//                     <option value="">
//                       {students.length === 0
//                         ? "Search Students First"
//                         : examTerms.length === 0
//                         ? "No Exam Term Available"
//                         : "Select Exam Term"}
//                     </option>

//                     {students.length > 0 &&
//                       examTerms.map((item) => (
//                         <option
//                           key={item.id}
//                           value={item.examTerm}
//                         >
//                           {item.examTerm}
//                         </option>
//                       ))}
//                   </select>
//                 </div>

//                 {/* SITTING */}
//                 <div className="col-md-2">
//                   <label
//                     htmlFor="sitting"
//                     className="form-label mb-2"
//                   >
//                     <strong>Select Sitting</strong>{" "}
//                     <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     id="sitting"
//                     className="form-select"
//                     value={selectedSitting}
//                     onChange={(e) =>
//                       setSelectedSitting(e.target.value)
//                     }
//                     disabled={students.length === 0}
//                   >
//                     <option value="">Select Sitting</option>

//                     <option value="1st Sitting">
//                       1st Sitting
//                     </option>

//                     <option value="2nd Sitting">
//                       2nd Sitting
//                     </option>
//                   </select>
//                 </div>

//                 {/* START TIME */}
//                 <div className="col-md-2">
//                   <label
//                     htmlFor="startTime"
//                     className="form-label mb-2"
//                   >
//                     <strong>Start Time</strong>{" "}
//                     <span className="text-danger">*</span>
//                   </label>

//                   <div className="input-group">
//                     <span className="input-group-text bg-white">
//                       <FaClock
//                         size={14}
//                         className="text-primary"
//                       />
//                     </span>

//                     <input
//                       type="time"
//                       id="startTime"
//                       className="form-control"
//                       value={startTime}
//                       onChange={(e) =>
//                         setStartTime(e.target.value)
//                       }
//                       disabled={students.length === 0}
//                     />
//                   </div>
//                 </div>

//                 {/* END TIME */}
//                 <div className="col-md-2">
//                   <label
//                     htmlFor="endTime"
//                     className="form-label mb-2"
//                   >
//                     <strong>End Time</strong>{" "}
//                     <span className="text-danger">*</span>
//                   </label>

//                   <div className="input-group">
//                     <span className="input-group-text bg-white">
//                       <FaClock
//                         size={14}
//                         className="text-primary"
//                       />
//                     </span>

//                     <input
//                       type="time"
//                       id="endTime"
//                       className="form-control"
//                       value={endTime}
//                       onChange={(e) =>
//                         setEndTime(e.target.value)
//                       }
//                       disabled={students.length === 0}
//                     />
//                   </div>
//                 </div>

//                 {/* RESET */}
//                 <div className="col-md-3">
//                   <button
//                     type="button"
//                     className="btn btn-danger rounded-2 w-100"
//                     onClick={handleReset}
//                   >
//                     Reset
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//           STUDENTS LIST
//       ========================================================= */}
//       <div className="mx-2 mt-2 mb-3">
//         <div className="card rounded-4 border-0 shadow overflow-hidden">
//           <div className="card-header bg-white p-3 border-bottom">
//             <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
//               <div className="d-flex align-items-center">
//                 <span
//                   className="d-inline-flex align-items-center justify-content-center rounded-2 me-2 flex-shrink-0"
//                   style={{
//                     backgroundColor: "#e8f6fa",
//                     width: "36px",
//                     height: "36px",
//                     color: "#2563eb",
//                   }}
//                 >
//                   <FaRegListAlt size={18} />
//                 </span>

//                 <div>
//                   <h6 className="mb-0 fw-semibold text-dark">
//                     Students List
//                   </h6>

//                   <div className="text-muted small mt-1">
//                     Add room number and preview admit card
//                   </div>
//                 </div>
//               </div>

//               {students.length > 0 && (
//                 <span
//                   className="badge rounded-pill px-3 py-2"
//                   style={{
//                     backgroundColor: "#eff6ff",
//                     color: "#2563eb",
//                     border: "1px solid #bfdbfe",
//                   }}
//                 >
//                   {students.length} Students
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="card-body p-0">
//             {loading ? (
//               <div className="text-center py-5">
//                 <div
//                   className="spinner-border text-primary"
//                   role="status"
//                   style={{
//                     width: "2.5rem",
//                     height: "2.5rem",
//                   }}
//                 >
//                   <span className="visually-hidden">
//                     Loading...
//                   </span>
//                 </div>

//                 <p className="text-muted small mt-3 mb-0">
//                   Searching students...
//                 </p>
//               </div>
//             ) : students.length === 0 ? (
//               <div className="text-center py-5">
//                 <div
//                   className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
//                   style={{
//                     width: "65px",
//                     height: "65px",
//                     backgroundColor: "#eff6ff",
//                   }}
//                 >
//                   <FaUserGraduate
//                     size={30}
//                     className="text-primary"
//                   />
//                 </div>

//                 <h6 className="fw-semibold text-dark mb-1">
//                   No Students Found
//                 </h6>

//                 <p className="text-muted small mb-0">
//                   Please search students by selecting Academic
//                   Year, Standard and Section.
//                 </p>
//               </div>
//             ) : (
//               <div
//                 className="table-responsive"
//                 style={{
//                   maxHeight: "550px",
//                   overflowY: "auto",
//                 }}
//               >
//                 <table
//                   className="table table-hover align-middle mb-0"
//                   style={{
//                     minWidth: "1150px",
//                   }}
//                 >
//                   <thead
//                     style={{
//                       position: "sticky",
//                       top: 0,
//                       zIndex: 5,
//                       backgroundColor: "#f8fafc",
//                     }}
//                   >
//                     <tr>
//                       <th className="px-3 py-3 text-muted small fw-semibold">
//                         #
//                       </th>

//                       <th
//                         className="px-3 py-3 text-muted small fw-semibold"
//                         style={{ minWidth: "240px" }}
//                       >
//                         Student
//                       </th>

//                       <th className="px-3 py-3 text-muted small fw-semibold">
//                         Admission No.
//                       </th>

//                       <th className="px-3 py-3 text-muted small fw-semibold">
//                         Class
//                       </th>

//                       <th className="px-3 py-3 text-muted small fw-semibold">
//                         Section
//                       </th>

//                       <th className="px-3 py-3 text-muted small fw-semibold">
//                         Academic Year
//                       </th>

//                       <th
//                         className="px-3 py-3 text-muted small fw-semibold"
//                         style={{ minWidth: "140px" }}
//                       >
//                         Room No.
//                       </th>

//                       <th className="px-3 py-3 text-muted small fw-semibold">
//                         Exam Term
//                       </th>

//                       <th className="px-3 py-3 text-muted small fw-semibold">
//                         Sitting
//                       </th>

//                       <th className="px-3 py-3 text-muted small fw-semibold">
//                         Start Time
//                       </th>

//                       <th className="px-3 py-3 text-muted small fw-semibold">
//                         End Time
//                       </th>

//                       <th
//                         className="px-3 py-3 text-muted small fw-semibold text-center"
//                         style={{ width: "90px" }}
//                       >
//                         Action
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {students.map((student, index) => {
//                       const studentKey =
//                         student.id ||
//                         student.admissionNumber ||
//                         index;

//                       return (
//                         <tr key={studentKey}>
//                           {/* NUMBER */}
//                           <td className="px-3 py-3">
//                             <span className="fw-semibold text-muted">
//                               {index + 1}
//                             </span>
//                           </td>

//                           {/* STUDENT */}
//                           <td className="px-3 py-3">
//                             <div className="d-flex align-items-center">
//                               {student.photo ? (
//                                 <img
//                                   src={student.photo}
//                                   alt={
//                                     student.firstName ||
//                                     "Student"
//                                   }
//                                   style={{
//                                     width: "42px",
//                                     height: "42px",
//                                     objectFit: "cover",
//                                     borderRadius: "50%",
//                                     marginRight: "11px",
//                                     border:
//                                       "2px solid #e0ecff",
//                                   }}
//                                 />
//                               ) : (
//                                 <div
//                                   className="d-flex align-items-center justify-content-center flex-shrink-0"
//                                   style={{
//                                     width: "42px",
//                                     height: "42px",
//                                     borderRadius: "50%",
//                                     marginRight: "11px",
//                                     backgroundColor: "#eff6ff",
//                                     color: "#2563eb",
//                                     border:
//                                       "2px solid #dbeafe",
//                                   }}
//                                 >
//                                   <FaUserGraduate size={18} />
//                                 </div>
//                               )}

//                               <div>
//                                 <div className="fw-semibold text-dark">
//                                   {student.firstName || "-"}{" "}
//                                   {student.lastName || ""}
//                                 </div>

//                                 {student.email && (
//                                   <small className="text-muted">
//                                     {student.email}
//                                   </small>
//                                 )}
//                               </div>
//                             </div>
//                           </td>

//                           {/* ADMISSION NUMBER */}
//                           <td className="px-3 py-3">
//                             <span
//                               className="fw-semibold"
//                               style={{
//                                 color: "#2563eb",
//                               }}
//                             >
//                               {student.admissionNumber || "-"}
//                             </span>
//                           </td>

//                           {/* CLASS */}
//                           <td className="px-3 py-3">
//                             <span className="fw-medium text-dark">
//                               {student.studentClass || "-"}
//                             </span>
//                           </td>

//                           {/* SECTION */}
//                           <td className="px-3 py-3">
//                             <span
//                               className="badge rounded-pill"
//                               style={{
//                                 backgroundColor: "#f1f5f9",
//                                 color: "#475569",
//                                 border:
//                                   "1px solid #e2e8f0",
//                               }}
//                             >
//                               {student.section || "-"}
//                             </span>
//                           </td>

//                           {/* ACADEMIC YEAR */}
//                           <td className="px-3 py-3">
//                             {student.academicYear || "-"}
//                           </td>

//                           {/* ROOM NUMBER */}
//                           <td className="px-3 py-3">
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               placeholder="Room No."
//                               value={
//                                 roomNumbers[studentKey] || ""
//                               }
//                               onChange={(e) =>
//                                 handleRoomChange(
//                                   studentKey,
//                                   e.target.value
//                                 )
//                               }
//                               style={{
//                                 minWidth: "115px",
//                                 borderRadius: "8px",
//                               }}
//                             />
//                           </td>

//                           {/* EXAM TERM */}
//                           <td className="px-3 py-3">
//                             <span
//                               className="badge rounded-pill"
//                               style={{
//                                 backgroundColor: "#eff6ff",
//                                 color: "#2563eb",
//                                 border:
//                                   "1px solid #bfdbfe",
//                                 whiteSpace: "nowrap",
//                               }}
//                             >
//                               {selectedExamTerm || "-"}
//                             </span>
//                           </td>

//                           {/* SITTING */}
//                           <td className="px-3 py-3">
//                             <span
//                               className="badge rounded-pill"
//                               style={{
//                                 backgroundColor: "#f0fdf4",
//                                 color: "#15803d",
//                                 border:
//                                   "1px solid #bbf7d0",
//                                 whiteSpace: "nowrap",
//                               }}
//                             >
//                               {selectedSitting || "-"}
//                             </span>
//                           </td>

//                           {/* START TIME */}
//                           <td className="px-3 py-3">
//                             <span className="fw-medium text-dark">
//                               {startTime || "-"}
//                             </span>
//                           </td>

//                           {/* END TIME */}
//                           <td className="px-3 py-3">
//                             <span className="fw-medium text-dark">
//                               {endTime || "-"}
//                             </span>
//                           </td>

//                           {/* ACTION */}
//                           <td className="px-3 py-3 text-center">
//                             <button
//                               type="button"
//                               className="btn btn-sm d-inline-flex align-items-center justify-content-center"
//                               onClick={() =>
//                                 handleViewAdmitCard(student)
//                               }
//                               title="View Admit Card"
//                               style={{
//                                 width: "38px",
//                                 height: "38px",
//                                 borderRadius: "10px",
//                                 backgroundColor: "#eff6ff",
//                                 color: "#2563eb",
//                                 border:
//                                   "1px solid #bfdbfe",
//                               }}
//                             >
//                               <FaEye size={16} />
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//           ADMIT CARD PREVIEW MODAL
//       ========================================================= */}
//       {selectedStudent && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             backgroundColor: "rgba(15,23,42,.65)",
//             backdropFilter: "blur(5px)",
//             zIndex: 9999,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: "20px",
//           }}
//           onClick={handleCloseAdmitCard}
//         >
//           <div
//             className="bg-white rounded-4 shadow-lg overflow-hidden"
//             style={{
//               width: "100%",
//               maxWidth: "850px",
//               maxHeight: "95vh",
//               overflowY: "auto",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* MODAL HEADER */}
//             <div
//               className="d-flex align-items-center justify-content-between px-4 py-3"
//               style={{
//                 background:
//                   "linear-gradient(135deg,#2563eb,#3b82f6)",
//                 color: "#fff",
//               }}
//             >
//               <div>
//                 <h5 className="mb-1 fw-bold">
//                   Admit Card Preview
//                 </h5>

//                 <small style={{ opacity: 0.85 }}>
//                   {selectedStudent.firstName}{" "}
//                   {selectedStudent.lastName || ""}
//                 </small>
//               </div>

//               <div className="d-flex align-items-center gap-2">
//                 <button
//                   type="button"
//                   className="btn btn-light btn-sm rounded-2"
//                   title="Print Admit Card"
//                   onClick={() => window.print()}
//                 >
//                   <FaPrint />
//                 </button>

//                 <button
//                   type="button"
//                   className="btn btn-light btn-sm rounded-2"
//                   onClick={handleCloseAdmitCard}
//                   title="Close"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
//             </div>

//             {/* =====================================================
//                 ADMIT CARD DESIGN
//             ===================================================== */}
//             <div className="p-4">
//               <div
//                 className="admit-card-preview"
//                 style={{
//                   border: "2px solid #1e3a8a",
//                   borderRadius: "12px",
//                   overflow: "hidden",
//                   backgroundColor: "#fff",
//                 }}
//               >
//                 {/* SCHOOL HEADER */}
//                 <div
//                   className="text-center p-4"
//                   style={{
//                     background:
//                       "linear-gradient(135deg,#eff6ff,#ffffff)",
//                     borderBottom: "2px solid #dbeafe",
//                   }}
//                 >
//                   <div
//                     className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
//                     style={{
//                       width: "55px",
//                       height: "55px",
//                       backgroundColor: "#2563eb",
//                       color: "#fff",
//                     }}
//                   >
//                     <MdOutlineSchool size={30} />
//                   </div>

//                   <h4 className="fw-bold text-dark mb-1">
//                     ZYNTaks Education
//                   </h4>

//                   <div className="text-muted small">
//                     School Examination Department
//                   </div>

//                   <div
//                     className="mt-3 d-inline-block px-4 py-2 rounded-pill"
//                     style={{
//                       backgroundColor: "#2563eb",
//                       color: "#fff",
//                       fontWeight: "600",
//                     }}
//                   >
//                     ADMIT CARD
//                   </div>
//                 </div>

//                 {/* EXAM INFORMATION */}
//                 <div className="p-4">
//                   <div className="row g-3">
//                     <div className="col-md-4">
//                       <div
//                         className="p-3 rounded-3"
//                         style={{
//                           backgroundColor: "#f8fafc",
//                           border: "1px solid #e2e8f0",
//                         }}
//                       >
//                         <small className="text-muted d-block">
//                           Exam Term
//                         </small>

//                         <strong className="text-dark">
//                           {selectedExamTerm || "-"}
//                         </strong>
//                       </div>
//                     </div>

//                     <div className="col-md-4">
//                       <div
//                         className="p-3 rounded-3"
//                         style={{
//                           backgroundColor: "#f8fafc",
//                           border: "1px solid #e2e8f0",
//                         }}
//                       >
//                         <small className="text-muted d-block">
//                           Academic Year
//                         </small>

//                         <strong className="text-dark">
//                           {selectedStudent.academicYear ||
//                             filters.academicYear ||
//                             "-"}
//                         </strong>
//                       </div>
//                     </div>

//                     <div className="col-md-4">
//                       <div
//                         className="p-3 rounded-3"
//                         style={{
//                           backgroundColor: "#f8fafc",
//                           border: "1px solid #e2e8f0",
//                         }}
//                       >
//                         <small className="text-muted d-block">
//                           Sitting
//                         </small>

//                         <strong className="text-dark">
//                           {selectedSitting || "-"}
//                         </strong>
//                       </div>
//                     </div>
//                   </div>

//                   {/* STUDENT DETAILS */}
//                   <div className="mt-4">
//                     <h6
//                       className="fw-bold mb-3"
//                       style={{ color: "#1e3a8a" }}
//                     >
//                       Student Information
//                     </h6>

//                     <div className="row g-3">
//                       <div className="col-md-8">
//                         <div
//                           className="p-3 rounded-3"
//                           style={{
//                             border: "1px solid #e2e8f0",
//                           }}
//                         >
//                           <div className="row g-3">
//                             <div className="col-sm-6">
//                               <small className="text-muted d-block">
//                                 Student Name
//                               </small>

//                               <strong>
//                                 {selectedStudent.firstName ||
//                                   "-"}{" "}
//                                 {selectedStudent.lastName || ""}
//                               </strong>
//                             </div>

//                             <div className="col-sm-6">
//                               <small className="text-muted d-block">
//                                 Admission Number
//                               </small>

//                               <strong>
//                                 {selectedStudent.admissionNumber ||
//                                   "-"}
//                               </strong>
//                             </div>

//                             <div className="col-sm-6">
//                               <small className="text-muted d-block">
//                                 Class
//                               </small>

//                               <strong>
//                                 {selectedStudent.studentClass ||
//                                   "-"}
//                               </strong>
//                             </div>

//                             <div className="col-sm-6">
//                               <small className="text-muted d-block">
//                                 Section
//                               </small>

//                               <strong>
//                                 {selectedStudent.section || "-"}
//                               </strong>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* PHOTO */}
//                       <div className="col-md-4">
//                         <div
//                           className="h-100 d-flex flex-column align-items-center justify-content-center rounded-3"
//                           style={{
//                             border: "1px solid #e2e8f0",
//                             minHeight: "150px",
//                           }}
//                         >
//                           {selectedStudent.photo ? (
//                             <img
//                               src={selectedStudent.photo}
//                               alt="Student"
//                               style={{
//                                 width: "100px",
//                                 height: "115px",
//                                 objectFit: "cover",
//                                 borderRadius: "8px",
//                                 border:
//                                   "2px solid #dbeafe",
//                               }}
//                             />
//                           ) : (
//                             <div
//                               className="d-flex align-items-center justify-content-center"
//                               style={{
//                                 width: "100px",
//                                 height: "115px",
//                                 borderRadius: "8px",
//                                 backgroundColor: "#eff6ff",
//                                 color: "#2563eb",
//                               }}
//                             >
//                               <FaUserGraduate size={40} />
//                             </div>
//                           )}

//                           <small className="text-muted mt-2">
//                             Student Photo
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* EXAM SCHEDULE */}
//                   <div className="mt-4">
//                     <h6
//                       className="fw-bold mb-3"
//                       style={{ color: "#1e3a8a" }}
//                     >
//                       Examination Details
//                     </h6>

//                     <div
//                       className="row g-0 rounded-3 overflow-hidden"
//                       style={{
//                         border: "1px solid #dbeafe",
//                       }}
//                     >
//                       <div className="col-md-4">
//                         <div
//                           className="p-3 h-100"
//                           style={{
//                             backgroundColor: "#eff6ff",
//                           }}
//                         >
//                           <small className="text-muted d-block">
//                             Room Number
//                           </small>

//                           <strong className="fs-5">
//                             {selectedRoomNumber || "-"}
//                           </strong>
//                         </div>
//                       </div>

//                       <div className="col-md-4">
//                         <div
//                           className="p-3 h-100"
//                           style={{
//                             backgroundColor: "#f8fafc",
//                           }}
//                         >
//                           <small className="text-muted d-block">
//                             Start Time
//                           </small>

//                           <strong className="fs-5">
//                             {startTime || "-"}
//                           </strong>
//                         </div>
//                       </div>

//                       <div className="col-md-4">
//                         <div
//                           className="p-3 h-100"
//                           style={{
//                             backgroundColor: "#f8fafc",
//                           }}
//                         >
//                           <small className="text-muted d-block">
//                             End Time
//                           </small>

//                           <strong className="fs-5">
//                             {endTime || "-"}
//                           </strong>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* INSTRUCTIONS */}
//                   <div
//                     className="mt-4 p-3 rounded-3"
//                     style={{
//                       backgroundColor: "#fffbeb",
//                       border: "1px solid #fde68a",
//                     }}
//                   >
//                     <h6 className="fw-bold text-dark mb-2">
//                       Instructions
//                     </h6>

//                     <ul className="mb-0 small text-muted ps-3">
//                       <li>
//                         Carry this admit card to the examination
//                         hall.
//                       </li>

//                       <li>
//                         Reach the examination room before the
//                         reporting time.
//                       </li>

//                       <li>
//                         Follow all examination rules and
//                         instructions.
//                       </li>
//                     </ul>
//                   </div>

//                   {/* SIGNATURE */}
//                   <div className="row mt-5 pt-3">
//                     <div className="col-6 text-center">
//                       <div
//                         style={{
//                           borderTop: "1px solid #94a3b8",
//                           width: "150px",
//                           margin: "0 auto",
//                         }}
//                       ></div>

//                       <small className="text-muted">
//                         Class Teacher
//                       </small>
//                     </div>

//                     <div className="col-6 text-center">
//                       <div
//                         style={{
//                           borderTop: "1px solid #94a3b8",
//                           width: "150px",
//                           margin: "0 auto",
//                         }}
//                       ></div>

//                       <small className="text-muted">
//                         Principal
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* MODAL FOOTER */}
//             <div
//               className="px-4 py-3 d-flex justify-content-end"
//               style={{
//                 backgroundColor: "#f8fafc",
//                 borderTop: "1px solid #e2e8f0",
//               }}
//             >
//               <button
//                 type="button"
//                 className="btn btn-secondary rounded-2"
//                 onClick={handleCloseAdmitCard}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdmitCard;


// import React, { useState } from "react";
// import {
//   FaDownload,
//   FaEdit,
//   FaEye,
//   FaRegListAlt,
//   FaSearch,
//   FaUserGraduate,
//   FaClock,
//   FaFilePdf,
//   FaCheckSquare,
// } from "react-icons/fa";
// import { MdOutlineSchool } from "react-icons/md";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";

// const AdmitCard = () => {
//   const { sessions, standards, sections } = useMasters();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;

//   const [loading, setLoading] = useState(false);

//   const [students, setStudents] = useState([]);
//   const [examTerms, setExamTerms] = useState([]);

//   const [selectedExamTerm, setSelectedExamTerm] = useState("");
//   const [selectedSitting, setSelectedSitting] = useState("");

//   // Same timing for all students
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   // Room number student-wise
//   const [roomNumbers, setRoomNumbers] = useState({});

//   // Selected students
//   const [selectedStudents, setSelectedStudents] = useState([]);

//   // Student currently shown in preview
//   const [previewStudent, setPreviewStudent] = useState(null);

//   const [filters, setFilters] = useState({
//     academicYear: "",
//     studentClass: "",
//     section: "",
//   });

//   // =========================================================
//   // FILTER CHANGE
//   // =========================================================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =========================================================
//   // SEARCH STUDENTS
//   // =========================================================
//   const handleSearch = async () => {
//     if (
//       !filters.academicYear ||
//       !filters.studentClass ||
//       !filters.section
//     ) {
//       alert("Please select Academic Year, Standard and Section");
//       return;
//     }

//     if (!schoolId) {
//       alert("School ID not found");
//       return;
//     }

//     try {
//       setLoading(true);

//       setSelectedExamTerm("");
//       setSelectedSitting("");
//       setStartTime("");
//       setEndTime("");

//       setRoomNumbers({});
//       setSelectedStudents([]);
//       setPreviewStudent(null);

//       const studentRes = await axiosInstance.get("/api/students/search", {
//         params: {
//           academicYear: filters.academicYear,
//           studentClass: filters.studentClass,
//           section: filters.section,
//         },
//       });

//       const studentData = studentRes.data || [];

//       setStudents(studentData);

//       if (studentData.length > 0) {
//         const examTermRes = await axiosInstance.get(
//           "/api/assessment/exam-term",
//           {
//             params: {
//               schoolId: schoolId,
//               session: filters.academicYear,
//             },
//           }
//         );

//         setExamTerms(examTermRes.data || []);
//       } else {
//         setExamTerms([]);
//       }
//     } catch (error) {
//       console.error("Search error:", error);

//       setStudents([]);
//       setExamTerms([]);
//       setSelectedExamTerm("");
//       setSelectedSitting("");
//       setStartTime("");
//       setEndTime("");
//       setRoomNumbers({});
//       setSelectedStudents([]);
//       setPreviewStudent(null);

//       alert(
//         error.response?.data?.message ||
//           "Something went wrong while searching students"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================================================
//   // STUDENT KEY
//   // =========================================================
//   const getStudentKey = (student, index = 0) => {
//     return student.id || student.admissionNumber || index;
//   };

//   // =========================================================
//   // SELECT SINGLE STUDENT
//   // =========================================================
//   const handleStudentSelect = (student, index) => {
//     const key = getStudentKey(student, index);

//     setSelectedStudents((prev) => {
//       if (prev.includes(key)) {
//         return prev.filter((id) => id !== key);
//       }

//       return [...prev, key];
//     });
//   };

//   // =========================================================
//   // SELECT ALL
//   // =========================================================
//   const handleSelectAll = () => {
//     if (selectedStudents.length === students.length) {
//       setSelectedStudents([]);
//       return;
//     }

//     const allStudentKeys = students.map((student, index) =>
//       getStudentKey(student, index)
//     );

//     setSelectedStudents(allStudentKeys);
//   };

//   const isAllSelected =
//     students.length > 0 &&
//     selectedStudents.length === students.length;

//   // =========================================================
//   // ROOM NUMBER
//   // =========================================================
//   const handleRoomChange = (studentId, value) => {
//     setRoomNumbers((prev) => ({
//       ...prev,
//       [studentId]: value,
//     }));
//   };

//   // =========================================================
//   // VIEW ADMIT CARD
//   // =========================================================
//   const handleViewAdmitCard = (student) => {
//     setPreviewStudent(student);

//     setTimeout(() => {
//       document
//         .getElementById("admit-card-preview")
//         ?.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//     }, 100);
//   };

//   // =========================================================
//   // EDIT
//   // =========================================================
//   const handleEdit = (student) => {
//     const studentKey =
//       student.id || student.admissionNumber;

//     const currentRoom = roomNumbers[studentKey] || "";

//     const newRoom = window.prompt(
//       `Enter Room Number for ${student.firstName || "Student"}`,
//       currentRoom
//     );

//     if (newRoom !== null) {
//       setRoomNumbers((prev) => ({
//         ...prev,
//         [studentKey]: newRoom,
//       }));
//     }
//   };

//   // =========================================================
//   // SINGLE PDF DOWNLOAD
//   // =========================================================
//   const handleDownloadPdf = (student) => {
//     alert(
//       `PDF download will be connected with backend for ${
//         student.firstName || "this student"
//       }.`
//     );
//   };

//   // =========================================================
//   // BULK PDF DOWNLOAD
//   // =========================================================
//   const handleBulkDownload = () => {
//     if (selectedStudents.length === 0) {
//       alert("Please select at least one student.");
//       return;
//     }

//     alert(
//       `${selectedStudents.length} admit card(s) PDF download will be connected with backend.`
//     );
//   };

//   // =========================================================
//   // GENERATE ADMIT CARDS
//   // =========================================================
//   const handleGenerateAdmitCards = () => {
//     if (students.length === 0) {
//       alert("Please search students first.");
//       return;
//     }

//     if (!selectedExamTerm) {
//       alert("Please select Exam Term.");
//       return;
//     }

//     if (!selectedSitting) {
//       alert("Please select Sitting.");
//       return;
//     }

//     if (!startTime || !endTime) {
//       alert("Please select Start Time and End Time.");
//       return;
//     }

//     if (selectedStudents.length === 0) {
//       alert("Please select at least one student.");
//       return;
//     }

//     alert(
//       `${selectedStudents.length} admit card(s) ready to generate. Backend will be connected next.`
//     );
//   };

//   // =========================================================
//   // RESET
//   // =========================================================
//   const handleReset = () => {
//     setFilters({
//       academicYear: "",
//       studentClass: "",
//       section: "",
//     });

//     setStudents([]);
//     setExamTerms([]);

//     setSelectedExamTerm("");
//     setSelectedSitting("");

//     setStartTime("");
//     setEndTime("");

//     setRoomNumbers({});
//     setSelectedStudents([]);
//     setPreviewStudent(null);
//   };

//   // =========================================================
//   // CURRENT PREVIEW ROOM
//   // =========================================================
//   const previewStudentKey =
//     previewStudent?.id ||
//     previewStudent?.admissionNumber ||
//     "";

//   const previewRoom =
//     roomNumbers[previewStudentKey] || "";

//   return (
//     <>
//       {/* =========================================================
//           PAGE HEADER
//       ========================================================= */}
//       <div className="mx-2 mt-2 mb-3">
//         <div
//           className="rounded-4 shadow overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
//             border: "1px solid #dbeafe",
//           }}
//         >
//           <div className="p-3 p-md-4">
//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//               <div className="d-flex align-items-center gap-3">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow: "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <FaUserGraduate size={26} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     Admit Card
//                   </h5>

//                   <div className="text-muted small">
//                     Assessment &nbsp;/&nbsp; Admit Card
//                   </div>
//                 </div>
//               </div>

//               <span
//                 className="badge rounded-pill px-3 py-2"
//                 style={{
//                   backgroundColor: "#eff6ff",
//                   color: "#2563eb",
//                   border: "1px solid #bfdbfe",
//                 }}
//               >
//                 <MdOutlineSchool className="me-1" />
//                 Assessment
//               </span>
//             </div>
//           </div>

//           <div
//             className="px-4 py-2"
//             style={{
//               backgroundColor: "rgba(239,246,255,.75)",
//               borderTop: "1px solid #e0ecff",
//             }}
//           >
//             <small className="text-muted">
//               Home &nbsp;›&nbsp; Assessment &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Admit Card
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//           SEARCH + EXAM SETTINGS
//       ========================================================= */}
//       <div className="mx-2 mt-2 mb-3">
//         <div className="card rounded-4 border-0 shadow overflow-hidden">
//           <div className="card-header bg-white p-3 border-bottom">
//             <strong className="d-flex align-items-center">
//               <span
//                 className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                 style={{
//                   backgroundColor: "#e8f6fa",
//                   width: "36px",
//                   height: "36px",
//                   color: "#2563eb",
//                 }}
//               >
//                 <FaSearch size={18} />
//               </span>

//               Search Students
//             </strong>
//           </div>

//           <div className="card-body p-3">
//             <div className="row g-3 align-items-end">
//               {/* ACADEMIC YEAR */}
//               <div className="col-md-3">
//                 <label
//                   htmlFor="academicYear"
//                   className="form-label mb-2"
//                 >
//                   <strong>Academic Year</strong>{" "}
//                   <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   name="academicYear"
//                   id="academicYear"
//                   className="form-select"
//                   value={filters.academicYear}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Session</option>

//                   {sessions.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* STANDARD */}
//               <div className="col-md-3">
//                 <label
//                   htmlFor="studentClass"
//                   className="form-label mb-2"
//                 >
//                   <strong>Standard</strong>{" "}
//                   <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   name="studentClass"
//                   id="studentClass"
//                   className="form-select"
//                   value={filters.studentClass}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Standard</option>

//                   {standards.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* SECTION */}
//               <div className="col-md-3">
//                 <label
//                   htmlFor="section"
//                   className="form-label mb-2"
//                 >
//                   <strong>Section</strong>{" "}
//                   <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   name="section"
//                   id="section"
//                   className="form-select"
//                   value={filters.section}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Section</option>

//                   {sections.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* SEARCH */}
//               <div className="col-md-3">
//                 <button
//                   type="button"
//                   className="btn btn-primary rounded-2 w-100"
//                   onClick={handleSearch}
//                   disabled={loading}
//                   style={{
//                     height: "38px",
//                     boxShadow:
//                       "0 5px 12px rgba(37,99,235,.18)",
//                   }}
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
//                     <>
//                       <FaSearch className="me-2" size={14} />
//                       Search
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* =====================================================
//                 EXAM SETTINGS
//             ===================================================== */}
//             <div
//               className="mt-4 pt-3"
//               style={{
//                 borderTop: "1px solid #edf2f7",
//               }}
//             >
//               <div className="row g-3 align-items-end">
//                 {/* EXAM TERM */}
//                 <div className="col-md-3">
//                   <label
//                     htmlFor="examTerm"
//                     className="form-label mb-2"
//                   >
//                     <strong>Exam Term</strong>{" "}
//                     <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     id="examTerm"
//                     className="form-select"
//                     value={selectedExamTerm}
//                     onChange={(e) =>
//                       setSelectedExamTerm(e.target.value)
//                     }
//                     disabled={students.length === 0}
//                   >
//                     <option value="">
//                       {students.length === 0
//                         ? "Search Students First"
//                         : examTerms.length === 0
//                         ? "No Exam Term Available"
//                         : "Select Exam Term"}
//                     </option>

//                     {examTerms.map((item) => (
//                       <option
//                         key={item.id}
//                         value={item.examTerm}
//                       >
//                         {item.examTerm}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* SITTING */}
//                 <div className="col-md-2">
//                   <label
//                     htmlFor="sitting"
//                     className="form-label mb-2"
//                   >
//                     <strong>Select Sitting</strong>{" "}
//                     <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     id="sitting"
//                     className="form-select"
//                     value={selectedSitting}
//                     onChange={(e) =>
//                       setSelectedSitting(e.target.value)
//                     }
//                     disabled={students.length === 0}
//                   >
//                     <option value="">Select Sitting</option>
//                     <option value="1st Sitting">
//                       1st Sitting
//                     </option>
//                     <option value="2nd Sitting">
//                       2nd Sitting
//                     </option>
//                   </select>
//                 </div>

//                 {/* START TIME */}
//                 <div className="col-md-2">
//                   <label
//                     htmlFor="startTime"
//                     className="form-label mb-2"
//                   >
//                     <strong>Start Time</strong>{" "}
//                     <span className="text-danger">*</span>
//                   </label>

//                   <div className="input-group">
//                     <span className="input-group-text bg-white">
//                       <FaClock
//                         size={14}
//                         className="text-primary"
//                       />
//                     </span>

//                     <input
//                       type="time"
//                       id="startTime"
//                       className="form-control"
//                       value={startTime}
//                       onChange={(e) =>
//                         setStartTime(e.target.value)
//                       }
//                       disabled={students.length === 0}
//                     />
//                   </div>
//                 </div>

//                 {/* END TIME */}
//                 <div className="col-md-2">
//                   <label
//                     htmlFor="endTime"
//                     className="form-label mb-2"
//                   >
//                     <strong>End Time</strong>{" "}
//                     <span className="text-danger">*</span>
//                   </label>

//                   <div className="input-group">
//                     <span className="input-group-text bg-white">
//                       <FaClock
//                         size={14}
//                         className="text-primary"
//                       />
//                     </span>

//                     <input
//                       type="time"
//                       id="endTime"
//                       className="form-control"
//                       value={endTime}
//                       onChange={(e) =>
//                         setEndTime(e.target.value)
//                       }
//                       disabled={students.length === 0}
//                     />
//                   </div>
//                 </div>

//                 {/* RESET */}
//                 <div className="col-md-3">
//                   <button
//                     type="button"
//                     className="btn btn-danger rounded-2 w-100"
//                     onClick={handleReset}
//                   >
//                     Reset
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//           STUDENTS LIST
//       ========================================================= */}
//       <div className="mx-2 mt-2 mb-3">
//         <div className="card rounded-4 border-0 shadow overflow-hidden">
//           {/* HEADER */}
//           <div className="card-header bg-white p-3 border-bottom">
//             <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
//               <div className="d-flex align-items-center">
//                 <span
//                   className="d-inline-flex align-items-center justify-content-center rounded-2 me-2 flex-shrink-0"
//                   style={{
//                     backgroundColor: "#e8f6fa",
//                     width: "36px",
//                     height: "36px",
//                     color: "#2563eb",
//                   }}
//                 >
//                   <FaRegListAlt size={18} />
//                 </span>

//                 <div>
//                   <h6 className="mb-0 fw-semibold text-dark">
//                     Students List
//                   </h6>

//                   <div className="text-muted small mt-1">
//                     Select students and manage admit cards
//                   </div>
//                 </div>
//               </div>

//               {students.length > 0 && (
//                 <div className="d-flex align-items-center gap-2">
//                   <span
//                     className="badge rounded-pill px-3 py-2"
//                     style={{
//                       backgroundColor: "#eff6ff",
//                       color: "#2563eb",
//                       border: "1px solid #bfdbfe",
//                     }}
//                   >
//                     {selectedStudents.length} /{" "}
//                     {students.length} Selected
//                   </span>

//                   <span
//                     className="badge rounded-pill px-3 py-2"
//                     style={{
//                       backgroundColor: "#f0fdf4",
//                       color: "#15803d",
//                       border: "1px solid #bbf7d0",
//                     }}
//                   >
//                     {students.length} Students
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* BODY */}
//           <div className="card-body p-0">
//             {loading ? (
//               <div className="text-center py-5">
//                 <div
//                   className="spinner-border text-primary"
//                   role="status"
//                   style={{
//                     width: "2.5rem",
//                     height: "2.5rem",
//                   }}
//                 ></div>

//                 <p className="text-muted small mt-3 mb-0">
//                   Searching students...
//                 </p>
//               </div>
//             ) : students.length === 0 ? (
//               <div className="text-center py-5">
//                 <div
//                   className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
//                   style={{
//                     width: "65px",
//                     height: "65px",
//                     backgroundColor: "#eff6ff",
//                   }}
//                 >
//                   <FaUserGraduate
//                     size={30}
//                     className="text-primary"
//                   />
//                 </div>

//                 <h6 className="fw-semibold text-dark mb-1">
//                   No Students Found
//                 </h6>

//                 <p className="text-muted small mb-0">
//                   Please search students by selecting Academic
//                   Year, Standard and Section.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 {/* SELECT ALL BAR */}
//                 <div
//                   className="px-3 py-3 d-flex align-items-center justify-content-between flex-wrap gap-2"
//                   style={{
//                     backgroundColor: "#f8fafc",
//                     borderBottom: "1px solid #e2e8f0",
//                   }}
//                 >
//                   <div className="form-check mb-0">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="selectAllStudents"
//                       checked={isAllSelected}
//                       onChange={handleSelectAll}
//                       style={{
//                         cursor: "pointer",
//                       }}
//                     />

//                     <label
//                       className="form-check-label fw-semibold"
//                       htmlFor="selectAllStudents"
//                       style={{
//                         cursor: "pointer",
//                       }}
//                     >
//                       <FaCheckSquare
//                         className="text-primary me-1"
//                       />
//                       Select All Students
//                     </label>
//                   </div>

//                   {selectedStudents.length > 0 && (
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-outline-primary rounded-2"
//                       onClick={handleBulkDownload}
//                     >
//                       <FaFilePdf className="me-2" />
//                       Download Selected PDFs
//                     </button>
//                   )}
//                 </div>

//                 {/* TABLE */}
//                 <div
//                   className="table-responsive"
//                   style={{
//                     maxHeight: "570px",
//                     overflowY: "auto",
//                   }}
//                 >
//                   <table
//                     className="table table-hover align-middle mb-0"
//                     style={{
//                       minWidth: "1250px",
//                     }}
//                   >
//                     <thead
//                       style={{
//                         position: "sticky",
//                         top: 0,
//                         zIndex: 5,
//                         backgroundColor: "#f8fafc",
//                       }}
//                     >
//                       <tr>
//                         <th
//                           className="px-3 py-3"
//                           style={{ width: "50px" }}
//                         >
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             checked={isAllSelected}
//                             onChange={handleSelectAll}
//                             style={{
//                               cursor: "pointer",
//                             }}
//                           />
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           #
//                         </th>

//                         <th
//                           className="px-3 py-3 text-muted small fw-semibold"
//                           style={{ minWidth: "240px" }}
//                         >
//                           Student
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Admission No.
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Class
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Section
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Academic Year
//                         </th>

//                         <th
//                           className="px-3 py-3 text-muted small fw-semibold"
//                           style={{ minWidth: "130px" }}
//                         >
//                           Room No.
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Exam Term
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Sitting
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Time
//                         </th>

//                         <th
//                           className="px-3 py-3 text-muted small fw-semibold text-center"
//                           style={{ minWidth: "130px" }}
//                         >
//                           Action
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {students.map((student, index) => {
//                         const studentKey = getStudentKey(
//                           student,
//                           index
//                         );

//                         const isSelected =
//                           selectedStudents.includes(
//                             studentKey
//                           );

//                         return (
//                           <tr
//                             key={studentKey}
//                             style={{
//                               backgroundColor: isSelected
//                                 ? "#f8fbff"
//                                 : "#fff",
//                             }}
//                           >
//                             {/* CHECKBOX */}
//                             <td className="px-3 py-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 checked={isSelected}
//                                 onChange={() =>
//                                   handleStudentSelect(
//                                     student,
//                                     index
//                                   )
//                                 }
//                                 style={{
//                                   cursor: "pointer",
//                                 }}
//                               />
//                             </td>

//                             {/* NUMBER */}
//                             <td className="px-3 py-3">
//                               <span className="fw-semibold text-muted">
//                                 {index + 1}
//                               </span>
//                             </td>

//                             {/* STUDENT */}
//                             <td className="px-3 py-3">
//                               <div className="d-flex align-items-center">
//                                 {student.photo ? (
//                                   <img
//                                     src={student.photo}
//                                     alt={
//                                       student.firstName ||
//                                       "Student"
//                                     }
//                                     style={{
//                                       width: "42px",
//                                       height: "42px",
//                                       objectFit: "cover",
//                                       borderRadius: "50%",
//                                       marginRight: "11px",
//                                       border:
//                                         "2px solid #dbeafe",
//                                     }}
//                                   />
//                                 ) : (
//                                   <div
//                                     className="d-flex align-items-center justify-content-center flex-shrink-0"
//                                     style={{
//                                       width: "42px",
//                                       height: "42px",
//                                       borderRadius: "50%",
//                                       marginRight: "11px",
//                                       backgroundColor:
//                                         "#eff6ff",
//                                       color: "#2563eb",
//                                       border:
//                                         "2px solid #dbeafe",
//                                     }}
//                                   >
//                                     <FaUserGraduate
//                                       size={18}
//                                     />
//                                   </div>
//                                 )}

//                                 <div>
//                                   <div className="fw-semibold text-dark">
//                                     {student.firstName ||
//                                       "-"}{" "}
//                                     {student.lastName || ""}
//                                   </div>

//                                   {student.email && (
//                                     <small className="text-muted">
//                                       {student.email}
//                                     </small>
//                                   )}
//                                 </div>
//                               </div>
//                             </td>

//                             {/* ADMISSION */}
//                             <td className="px-3 py-3">
//                               <span
//                                 className="fw-semibold"
//                                 style={{
//                                   color: "#2563eb",
//                                 }}
//                               >
//                                 {student.admissionNumber ||
//                                   "-"}
//                               </span>
//                             </td>

//                             {/* CLASS */}
//                             <td className="px-3 py-3">
//                               <span className="fw-medium">
//                                 {student.studentClass ||
//                                   "-"}
//                               </span>
//                             </td>

//                             {/* SECTION */}
//                             <td className="px-3 py-3">
//                               <span
//                                 className="badge rounded-pill"
//                                 style={{
//                                   backgroundColor:
//                                     "#f1f5f9",
//                                   color: "#475569",
//                                   border:
//                                     "1px solid #e2e8f0",
//                                 }}
//                               >
//                                 {student.section || "-"}
//                               </span>
//                             </td>

//                             {/* ACADEMIC YEAR */}
//                             <td className="px-3 py-3">
//                               {student.academicYear || "-"}
//                             </td>

//                             {/* ROOM */}
//                             <td className="px-3 py-3">
//                               <input
//                                 type="text"
//                                 className="form-control form-control-sm"
//                                 placeholder="Room No."
//                                 value={
//                                   roomNumbers[
//                                     studentKey
//                                   ] || ""
//                                 }
//                                 onChange={(e) =>
//                                   handleRoomChange(
//                                     studentKey,
//                                     e.target.value
//                                   )
//                                 }
//                                 style={{
//                                   minWidth: "110px",
//                                   borderRadius: "8px",
//                                 }}
//                               />
//                             </td>

//                             {/* EXAM TERM */}
//                             <td className="px-3 py-3">
//                               <span
//                                 className="badge rounded-pill"
//                                 style={{
//                                   backgroundColor:
//                                     "#eff6ff",
//                                   color: "#2563eb",
//                                   border:
//                                     "1px solid #bfdbfe",
//                                   whiteSpace: "nowrap",
//                                 }}
//                               >
//                                 {selectedExamTerm || "-"}
//                               </span>
//                             </td>

//                             {/* SITTING */}
//                             <td className="px-3 py-3">
//                               <span
//                                 className="badge rounded-pill"
//                                 style={{
//                                   backgroundColor:
//                                     "#f0fdf4",
//                                   color: "#15803d",
//                                   border:
//                                     "1px solid #bbf7d0",
//                                   whiteSpace: "nowrap",
//                                 }}
//                               >
//                                 {selectedSitting || "-"}
//                               </span>
//                             </td>

//                             {/* TIME */}
//                             <td className="px-3 py-3">
//                               <div
//                                 className="small fw-medium"
//                                 style={{
//                                   whiteSpace: "nowrap",
//                                 }}
//                               >
//                                 {startTime && endTime
//                                   ? `${startTime} - ${endTime}`
//                                   : "-"}
//                               </div>
//                             </td>

//                             {/* ACTION */}
//                             <td className="px-3 py-3">
//                               <div className="d-flex justify-content-center gap-1">
//                                 {/* VIEW */}
//                                 <button
//                                   type="button"
//                                   className="btn btn-sm"
//                                   title="View Admit Card"
//                                   onClick={() =>
//                                     handleViewAdmitCard(
//                                       student
//                                     )
//                                   }
//                                   style={{
//                                     width: "34px",
//                                     height: "34px",
//                                     padding: 0,
//                                     borderRadius: "8px",
//                                     backgroundColor:
//                                       "#eff6ff",
//                                     color: "#2563eb",
//                                     border:
//                                       "1px solid #bfdbfe",
//                                   }}
//                                 >
//                                   <FaEye size={14} />
//                                 </button>

//                                 {/* EDIT */}
//                                 <button
//                                   type="button"
//                                   className="btn btn-sm"
//                                   title="Edit Room"
//                                   onClick={() =>
//                                     handleEdit(student)
//                                   }
//                                   style={{
//                                     width: "34px",
//                                     height: "34px",
//                                     padding: 0,
//                                     borderRadius: "8px",
//                                     backgroundColor:
//                                       "#fff7ed",
//                                     color: "#ea580c",
//                                     border:
//                                       "1px solid #fed7aa",
//                                   }}
//                                 >
//                                   <FaEdit size={14} />
//                                 </button>

//                                 {/* PDF */}
//                                 <button
//                                   type="button"
//                                   className="btn btn-sm"
//                                   title="Download PDF"
//                                   onClick={() =>
//                                     handleDownloadPdf(
//                                       student
//                                     )
//                                   }
//                                   style={{
//                                     width: "34px",
//                                     height: "34px",
//                                     padding: 0,
//                                     borderRadius: "8px",
//                                     backgroundColor:
//                                       "#fef2f2",
//                                     color: "#dc2626",
//                                     border:
//                                       "1px solid #fecaca",
//                                   }}
//                                 >
//                                   <FaDownload size={14} />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* =================================================
//                     GENERATE BUTTON
//                 ================================================= */}
//                 <div
//                   className="p-3 d-flex align-items-center justify-content-between flex-wrap gap-3"
//                   style={{
//                     backgroundColor: "#f8fafc",
//                     borderTop: "1px solid #e2e8f0",
//                   }}
//                 >
//                   <div className="small text-muted">
//                     {selectedStudents.length > 0 ? (
//                       <>
//                         <strong className="text-dark">
//                           {selectedStudents.length}
//                         </strong>{" "}
//                         student(s) selected for admit card
//                         generation.
//                       </>
//                     ) : (
//                       "Select students to generate admit cards."
//                     )}
//                   </div>

//                   <button
//                     type="button"
//                     className="btn btn-primary rounded-3 px-4 py-2"
//                     onClick={handleGenerateAdmitCards}
//                     disabled={selectedStudents.length === 0}
//                     style={{
//                       boxShadow:
//                         "0 6px 16px rgba(37,99,235,.2)",
//                     }}
//                   >
//                     <FaFilePdf className="me-2" />
//                     Generate Admit Cards
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//           ADMIT CARD PREVIEW
//       ========================================================= */}
//       {previewStudent && (
//         <div
//           id="admit-card-preview"
//           className="mx-2 mt-4 mb-4"
//         >
//           <div className="card rounded-4 border-0 shadow overflow-hidden">
//             {/* PREVIEW HEADER */}
//             <div className="card-header bg-white p-3 border-bottom">
//               <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
//                 <div className="d-flex align-items-center">
//                   <span
//                     className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                     style={{
//                       backgroundColor: "#e8f6fa",
//                       width: "36px",
//                       height: "36px",
//                       color: "#2563eb",
//                     }}
//                   >
//                     <FaEye size={18} />
//                   </span>

//                   <div>
//                     <h6 className="mb-0 fw-semibold text-dark">
//                       Admit Card Preview
//                     </h6>

//                     <div className="text-muted small mt-1">
//                       Preview for{" "}
//                       <strong>
//                         {previewStudent.firstName}{" "}
//                         {previewStudent.lastName || ""}
//                       </strong>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   className="btn btn-outline-danger btn-sm rounded-2"
//                   onClick={() => setPreviewStudent(null)}
//                 >
//                   Close Preview
//                 </button>
//               </div>
//             </div>

//             {/* =====================================================
//                 ADMIT CARD
//             ===================================================== */}
//             <div className="card-body p-4">
//               <div
//                 style={{
//                   maxWidth: "850px",
//                   margin: "0 auto",
//                   border: "2px solid #1e3a8a",
//                   borderRadius: "12px",
//                   overflow: "hidden",
//                   backgroundColor: "#fff",
//                 }}
//               >
//                 {/* SCHOOL HEADER */}
//                 <div
//                   className="text-center p-4"
//                   style={{
//                     background:
//                       "linear-gradient(135deg,#eff6ff,#ffffff)",
//                     borderBottom: "2px solid #dbeafe",
//                   }}
//                 >
//                   <div
//                     className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
//                     style={{
//                       width: "58px",
//                       height: "58px",
//                       backgroundColor: "#2563eb",
//                       color: "#fff",
//                     }}
//                   >
//                     <MdOutlineSchool size={32} />
//                   </div>

//                   <h3 className="fw-bold text-dark mb-1">
//                     ZYNTaks Education
//                   </h3>

//                   <div className="text-muted small">
//                     School Examination Department
//                   </div>

//                   <div
//                     className="mt-3 d-inline-block px-4 py-2 rounded-pill"
//                     style={{
//                       backgroundColor: "#2563eb",
//                       color: "#fff",
//                       fontWeight: "700",
//                       letterSpacing: "1px",
//                     }}
//                   >
//                     ADMIT CARD
//                   </div>
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-4">
//                   {/* EXAM DETAILS */}
//                   <div className="row g-3 mb-4">
//                     <div className="col-md-3">
//                       <div
//                         className="p-3 rounded-3 h-100"
//                         style={{
//                           backgroundColor: "#f8fafc",
//                           border:
//                             "1px solid #e2e8f0",
//                         }}
//                       >
//                         <small className="text-muted d-block">
//                           Exam Term
//                         </small>

//                         <strong>
//                           {selectedExamTerm || "-"}
//                         </strong>
//                       </div>
//                     </div>

//                     <div className="col-md-3">
//                       <div
//                         className="p-3 rounded-3 h-100"
//                         style={{
//                           backgroundColor: "#f8fafc",
//                           border:
//                             "1px solid #e2e8f0",
//                         }}
//                       >
//                         <small className="text-muted d-block">
//                           Academic Year
//                         </small>

//                         <strong>
//                           {previewStudent.academicYear ||
//                             filters.academicYear ||
//                             "-"}
//                         </strong>
//                       </div>
//                     </div>

//                     <div className="col-md-3">
//                       <div
//                         className="p-3 rounded-3 h-100"
//                         style={{
//                           backgroundColor: "#f8fafc",
//                           border:
//                             "1px solid #e2e8f0",
//                         }}
//                       >
//                         <small className="text-muted d-block">
//                           Sitting
//                         </small>

//                         <strong>
//                           {selectedSitting || "-"}
//                         </strong>
//                       </div>
//                     </div>

//                     <div className="col-md-3">
//                       <div
//                         className="p-3 rounded-3 h-100"
//                         style={{
//                           backgroundColor: "#eff6ff",
//                           border:
//                             "1px solid #bfdbfe",
//                         }}
//                       >
//                         <small className="text-muted d-block">
//                           Room No.
//                         </small>

//                         <strong>
//                           {previewRoom || "-"}
//                         </strong>
//                       </div>
//                     </div>
//                   </div>

//                   {/* STUDENT INFORMATION */}
//                   <h6
//                     className="fw-bold mb-3"
//                     style={{ color: "#1e3a8a" }}
//                   >
//                     Student Information
//                   </h6>

//                   <div className="row g-3">
//                     <div className="col-md-8">
//                       <div
//                         className="p-3 rounded-3"
//                         style={{
//                           border:
//                             "1px solid #e2e8f0",
//                         }}
//                       >
//                         <div className="row g-4">
//                           <div className="col-sm-6">
//                             <small className="text-muted d-block">
//                               Student Name
//                             </small>

//                             <strong>
//                               {previewStudent.firstName ||
//                                 "-"}{" "}
//                               {previewStudent.lastName ||
//                                 ""}
//                             </strong>
//                           </div>

//                           <div className="col-sm-6">
//                             <small className="text-muted d-block">
//                               Admission Number
//                             </small>

//                             <strong>
//                               {previewStudent.admissionNumber ||
//                                 "-"}
//                             </strong>
//                           </div>

//                           <div className="col-sm-6">
//                             <small className="text-muted d-block">
//                               Class
//                             </small>

//                             <strong>
//                               {previewStudent.studentClass ||
//                                 "-"}
//                             </strong>
//                           </div>

//                           <div className="col-sm-6">
//                             <small className="text-muted d-block">
//                               Section
//                             </small>

//                             <strong>
//                               {previewStudent.section ||
//                                 "-"}
//                             </strong>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* PHOTO */}
//                     <div className="col-md-4">
//                       <div
//                         className="h-100 d-flex align-items-center justify-content-center rounded-3"
//                         style={{
//                           border:
//                             "1px solid #e2e8f0",
//                           minHeight: "160px",
//                         }}
//                       >
//                         {previewStudent.photo ? (
//                           <img
//                             src={previewStudent.photo}
//                             alt="Student"
//                             style={{
//                               width: "105px",
//                               height: "125px",
//                               objectFit: "cover",
//                               borderRadius: "8px",
//                               border:
//                                 "2px solid #dbeafe",
//                             }}
//                           />
//                         ) : (
//                           <div
//                             className="d-flex align-items-center justify-content-center"
//                             style={{
//                               width: "105px",
//                               height: "125px",
//                               borderRadius: "8px",
//                               backgroundColor:
//                                 "#eff6ff",
//                               color: "#2563eb",
//                             }}
//                           >
//                             <FaUserGraduate size={42} />
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* EXAM TIMING */}
//                   <div className="mt-4">
//                     <h6
//                       className="fw-bold mb-3"
//                       style={{ color: "#1e3a8a" }}
//                     >
//                       Examination Schedule
//                     </h6>

//                     <div
//                       className="row g-0 rounded-3 overflow-hidden"
//                       style={{
//                         border:
//                           "1px solid #dbeafe",
//                       }}
//                     >
//                       <div className="col-md-4">
//                         <div
//                           className="p-3"
//                           style={{
//                             backgroundColor:
//                               "#eff6ff",
//                           }}
//                         >
//                           <small className="text-muted d-block">
//                             Exam Term
//                           </small>

//                           <strong>
//                             {selectedExamTerm ||
//                               "-"}
//                           </strong>
//                         </div>
//                       </div>

//                       <div className="col-md-4">
//                         <div
//                           className="p-3"
//                           style={{
//                             backgroundColor:
//                               "#f8fafc",
//                           }}
//                         >
//                           <small className="text-muted d-block">
//                             Start Time
//                           </small>

//                           <strong>
//                             {startTime || "-"}
//                           </strong>
//                         </div>
//                       </div>

//                       <div className="col-md-4">
//                         <div
//                           className="p-3"
//                           style={{
//                             backgroundColor:
//                               "#f8fafc",
//                           }}
//                         >
//                           <small className="text-muted d-block">
//                             End Time
//                           </small>

//                           <strong>
//                             {endTime || "-"}
//                           </strong>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* INSTRUCTIONS */}
//                   <div
//                     className="mt-4 p-3 rounded-3"
//                     style={{
//                       backgroundColor: "#fffbeb",
//                       border:
//                         "1px solid #fde68a",
//                     }}
//                   >
//                     <h6 className="fw-bold mb-2">
//                       Instructions
//                     </h6>

//                     <ul className="mb-0 small text-muted ps-3">
//                       <li>
//                         Carry the admit card to the
//                         examination hall.
//                       </li>

//                       <li>
//                         Reach the examination room
//                         before the reporting time.
//                       </li>

//                       <li>
//                         Follow all examination rules
//                         and instructions.
//                       </li>
//                     </ul>
//                   </div>

//                   {/* SIGNATURE */}
//                   <div className="row mt-5 pt-3">
//                     <div className="col-6 text-center">
//                       <div
//                         style={{
//                           borderTop:
//                             "1px solid #94a3b8",
//                           width: "150px",
//                           margin: "0 auto",
//                         }}
//                       ></div>

//                       <small className="text-muted">
//                         Class Teacher
//                       </small>
//                     </div>

//                     <div className="col-6 text-center">
//                       <div
//                         style={{
//                           borderTop:
//                             "1px solid #94a3b8",
//                           width: "150px",
//                           margin: "0 auto",
//                         }}
//                       ></div>

//                       <small className="text-muted">
//                         Principal
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* PREVIEW ACTIONS */}
//             <div
//               className="card-footer bg-white p-3"
//               style={{
//                 borderTop: "1px solid #e2e8f0",
//               }}
//             >
//               <div className="d-flex justify-content-end gap-2">
//                 <button
//                   type="button"
//                   className="btn btn-outline-primary rounded-2"
//                   onClick={() =>
//                     handleEdit(previewStudent)
//                   }
//                 >
//                   <FaEdit className="me-2" />
//                   Edit
//                 </button>

//                 <button
//                   type="button"
//                   className="btn btn-danger rounded-2"
//                   onClick={() =>
//                     handleDownloadPdf(previewStudent)
//                   }
//                 >
//                   <FaDownload className="me-2" />
//                   Download PDF
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdmitCard;


// import React, { useEffect, useState } from "react";
// import {
//   FaDownload,
//   FaEdit,
//   FaEye,
//   FaRegListAlt,
//   FaSearch,
//   FaUserGraduate,
//   FaClock,
//   FaFilePdf,
//   FaCheckSquare,
// } from "react-icons/fa";
// import { MdOutlineSchool } from "react-icons/md";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";

// const AdmitCard = () => {
//   const { sessions, standards, sections } = useMasters();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;

//   const [loading, setLoading] = useState(false);

//   const [students, setStudents] = useState([]);
//   const [examTerms, setExamTerms] = useState([]);

//   const [selectedExamTerm, setSelectedExamTerm] = useState("");
//   const [selectedSitting, setSelectedSitting] = useState("");

//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

 
//   const [roomNumbers, setRoomNumbers] = useState({});

  
//   const [selectedStudents, setSelectedStudents] = useState([]);

 
//   const [previewStudent, setPreviewStudent] = useState(null);


//   const [generatedStudents, setGeneratedStudents] = useState([]);
//    const [schoolImage, setSchoolImage] = useState([]);
    
  
//     const fetchSchoolImage = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `/api/school/${schoolId}/images`,
//         );
  
//         setSchoolImage(response.data);
//       } catch (error) {
//         console.log("error", error);
//       }
//     };
//     useEffect(()=>{
//       if(!schoolId)return;
//       fetchSchoolImage();
//     },fetchSchoolImage);
//     console.log("image",schoolImage);
  
//     const getImageUrl = (url) => {
//     if (!url) return null;
  
//     if (url.startsWith("http://") || url.startsWith("https://")) {
//       return url;
//     }
  
//     return `${axiosInstance.defaults.baseURL}${url}`;
//   };

//   const [filters, setFilters] = useState({
//     academicYear: "",
//     studentClass: "",
//     section: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSearch = async () => {
//     if (
//       !filters.academicYear ||
//       !filters.studentClass ||
//       !filters.section
//     ) {
//       alert("Please select Academic Year, Standard and Section");
//       return;
//     }

//     if (!schoolId) {
//       alert("School ID not found");
//       return;
//     }

//     try {
//       setLoading(true);

//       setSelectedExamTerm("");
//       setSelectedSitting("");
//       setStartTime("");
//       setEndTime("");

//       setRoomNumbers({});
//       setSelectedStudents([]);
//       setPreviewStudent(null);
//       setGeneratedStudents([]);

//       const studentRes = await axiosInstance.get("/api/students/search", {
//         params: {
//           academicYear: filters.academicYear,
//           studentClass: filters.studentClass,
//           section: filters.section,
//         },
//       });

//       const studentData = studentRes.data || [];

//       setStudents(studentData);

//       if (studentData.length > 0) {
//         const examTermRes = await axiosInstance.get(
//           "/api/assessment/exam-term",
//           {
//             params: {
//               schoolId: schoolId,
//               session: filters.academicYear,
//             },
//           }
//         );

//         setExamTerms(examTermRes.data || []);
//       } else {
//         setExamTerms([]);
//       }
//     } catch (error) {
//       console.error("Search error:", error);

//       setStudents([]);
//       setExamTerms([]);
//       setSelectedExamTerm("");
//       setSelectedSitting("");
//       setStartTime("");
//       setEndTime("");
//       setRoomNumbers({});
//       setSelectedStudents([]);
//       setPreviewStudent(null);
//       setGeneratedStudents([]);

//       alert(
//         error.response?.data?.message ||
//           "Something went wrong while searching students"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };


//   const getStudentKey = (student, index = 0) => {
//     return student.id || student.admissionNumber || index;
//   };

  
//   const handleStudentSelect = (student, index) => {
//     const key = getStudentKey(student, index);

//     setSelectedStudents((prev) => {
//       if (prev.includes(key)) {
//         return prev.filter((id) => id !== key);
//       }

//       return [...prev, key];
//     });
//   };

 
//   const handleSelectAll = () => {
//     if (selectedStudents.length === students.length) {
//       setSelectedStudents([]);
//       return;
//     }

//     const allStudentKeys = students.map((student, index) =>
//       getStudentKey(student, index)
//     );

//     setSelectedStudents(allStudentKeys);
//   };

//   const isAllSelected =
//     students.length > 0 &&
//     selectedStudents.length === students.length;

//   const handleRoomChange = (studentId, value) => {
//     setRoomNumbers((prev) => ({
//       ...prev,
//       [studentId]: value,
//     }));
//   };


//   const handleViewAdmitCard = (student) => {
//     setGeneratedStudents([]);
//     setPreviewStudent(student);

//     setTimeout(() => {
//       document
//         .getElementById("admit-card-preview")
//         ?.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//     }, 100);
//   };

 
//   const handleEdit = (student) => {
//     const studentKey =
//       student.id || student.admissionNumber;

//     const currentRoom = roomNumbers[studentKey] || "";

//     const newRoom = window.prompt(
//       `Enter Room Number for ${student.firstName || "Student"}`,
//       currentRoom
//     );

//     if (newRoom !== null) {
//       setRoomNumbers((prev) => ({
//         ...prev,
//         [studentKey]: newRoom,
//       }));

//       // Update generated preview also
//       setGeneratedStudents((prev) =>
//         prev.map((item) => {
//           const itemKey =
//             item.id || item.admissionNumber;

//           if (itemKey === studentKey) {
//             return {
//               ...item,
//               __roomNo: newRoom,
//             };
//           }

//           return item;
//         })
//       );
//     }
//   };

 
//   const handleDownloadPdf = (student) => {
//     alert(
//       `PDF download will be connected with backend for ${
//         student.firstName || "this student"
//       }.`
//     );
//   };

 
//   const handleBulkDownload = () => {
//     if (selectedStudents.length === 0) {
//       alert("Please select at least one student.");
//       return;
//     }

//     alert(
//       `${selectedStudents.length} admit card(s) PDF download will be connected with backend.`
//     );
//   };


//   const handleGenerateAdmitCards = () => {
//     if (students.length === 0) {
//       alert("Please search students first.");
//       return;
//     }

//     if (!selectedExamTerm) {
//       alert("Please select Exam Term.");
//       return;
//     }

//     if (!selectedSitting) {
//       alert("Please select Sitting.");
//       return;
//     }

//     if (!startTime || !endTime) {
//       alert("Please select Start Time and End Time.");
//       return;
//     }

//     if (startTime >= endTime) {
//       alert("End Time must be greater than Start Time.");
//       return;
//     }

//     if (selectedStudents.length === 0) {
//       alert("Please select at least one student.");
//       return;
//     }

    
//     const selectedStudentData = students
//       .map((student, index) => {
//         const studentKey = getStudentKey(
//           student,
//           index
//         );

//         if (!selectedStudents.includes(studentKey)) {
//           return null;
//         }

//         return {
//           ...student,
//           __roomNo: roomNumbers[studentKey] || "",
//         };
//       })
//       .filter(Boolean);

   
//     setPreviewStudent(null);
//     setGeneratedStudents(selectedStudentData);

    
//     setTimeout(() => {
//       document
//         .getElementById("admit-card-preview")
//         ?.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//     }, 150);
//   };

//   const handleReset = () => {
//     setFilters({
//       academicYear: "",
//       studentClass: "",
//       section: "",
//     });

//     setStudents([]);
//     setExamTerms([]);

//     setSelectedExamTerm("");
//     setSelectedSitting("");

//     setStartTime("");
//     setEndTime("");

//     setRoomNumbers({});
//     setSelectedStudents([]);
//     setPreviewStudent(null);
//     setGeneratedStudents([]);
//   };

//   // =========================================================
//   // ADMIT CARD PREVIEW COMPONENT
//   // =========================================================
//   const AdmitCardPreview = ({ student }) => {
//     const studentKey =
//       student.id || student.admissionNumber;

//     const previewRoom =
//       student.__roomNo !== undefined
//         ? student.__roomNo
//         : roomNumbers[studentKey] || "";

//     return (
//       <div
//         style={{
//           maxWidth: "850px",
//           margin: "0 auto 30px",
//           border: "2px solid #1e3a8a",
//           borderRadius: "12px",
//           overflow: "hidden",
//           backgroundColor: "#fff",
//         }}
//       >
//       {/* SCHOOL HEADER */}
// <div
//   className="d-flex align-items-center p-4"
//   style={{
//     background: "linear-gradient(135deg,#eff6ff,#ffffff)",
//     borderBottom: "2px solid #dbeafe",
//     position: "relative",
//   }}
// >
//   {/* SCHOOL LOGO - LEFT */}
//   <div
//     className="d-flex align-items-center justify-content-center"
//     style={{
//       width: "120px",
//       height: "120px",
//       flexShrink: 0,
//     }}
//   >
//     {schoolImage?.logoUrl && (
//       <img
//         src={getImageUrl(schoolImage.logoUrl)}
//         alt="School Image"
//         className="w-100 h-100"
//         style={{
//           objectFit: "fill",
//         }}
//       />
//     )}
//   </div>

//   {/* SCHOOL DETAILS - CENTER */}
//   <div
//     className="flex-grow-1 text-center"
//     style={{
//       marginRight: "120px",
//     }}
//   >
//     <h3 className="fw-bold text-dark mb-1">
//       {user?.school?.schoolName}
//     </h3>

//     <div className="text-muted small">
//       Address: {user?.school?.addressLine1},
//       {user?.school?.city},{" "}
//       {user?.school?.state}
//     </div>
//     <div className="text-muted small">
//       Email: {user?.school?.email},
      
//     </div>
//     <div className="text-muted small">
//       Mobile: {user?.school?.phoneNumber},{" "}
      
//     </div>

//     <div
//       className="mt-3 d-inline-block px-4 py-2 rounded-pill"
//       style={{
//         backgroundColor: "#2563eb",
//         color: "#fff",
//         fontWeight: "700",
//         letterSpacing: "1px",
//       }}
//     >
//       ADMIT CARD
//     </div>
//   </div>
// </div>

// <div className="p-2">
//     <h6
//             className="fw-bold mb-3"
//             style={{ color: "#1e3a8a" }}
//           >
//             Student Information
//           </h6>

//           <div className="row g-3">
//             <div className="col-md-8">
//               <div
//                 className="p-3 rounded-3"
//                 style={{
//                   border: "1px solid #e2e8f0",
//                 }}
//               >
//                 <div className="row g-4">
//                   <div className="col-sm-4">
//                     <small className="text-muted d-block">
//                       Student Name
//                     </small>

//                     <strong>
//                       {student.firstName || "-"}{" "}
//                       {student.lastName || ""}
//                     </strong>
//                   </div>

//                   <div className="col-sm-4">
//                     <small className="text-muted d-block">
//                       Admission Number
//                     </small>

//                     <strong>
//                       {student.admissionNumber || "-"}
//                     </strong>
//                   </div>

//                   <div className="col-sm-4">
//                     <small className="text-muted d-block">
//                       Class / Section
//                     </small>

//                     <strong>
//                       {student.studentClass || "-"} / {student.section || "-"}
//                     </strong>
//                   </div>

               
//                   <div className="col-sm-4">
//                     <small className="text-muted d-block">
//                       Roll No
//                     </small>

//                     <strong>
//                       {student.rollNumber || "-"}
//                     </strong>
//                   </div>
//                    <div className="col-sm-4">
//                     <small className="text-muted d-block">
//                       Father Name
//                     </small>

//                     <strong>
//                       {student.fatherName || "-"}
//                     </strong>
//                   </div>
//                    <div className="col-sm-4">
//                     <small className="text-muted d-block">
//                       Mobile No
//                     </small>

//                     <strong>
//                       {student.mobile || "-"}
//                     </strong>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* PHOTO */}
//             <div className="col-md-4">
//               <div
//                 className="h-100 d-flex align-items-center justify-content-center rounded-3"
//                 style={{
//                   border: "1px solid #e2e8f0",
//                   minHeight: "160px",
//                 }}
//               >
//                 {student.photo ? (
//                   <img
//                     src={student.photo}
//                     alt="Student"
//                     style={{
//                       width: "105px",
//                       height: "125px",
//                       objectFit: "cover",
//                       borderRadius: "8px",
//                       border: "2px solid #dbeafe",
//                     }}
//                   />
//                 ) : (
//                   <div
//                     className="d-flex align-items-center justify-content-center"
//                     style={{
//                       width: "105px",
//                       height: "125px",
//                       borderRadius: "8px",
//                       backgroundColor: "#eff6ff",
//                       color: "#2563eb",
//                     }}
//                   >
//                     <FaUserGraduate size={42} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
// </div>

     
//         <div className="p-4">
//           {/* EXAM DETAILS */}
//           <div className="row g-3 mb-4">
//             <div className="col-md-3">
//               <div
//                 className="p-3 rounded-3 h-100"
//                 style={{
//                   backgroundColor: "#f8fafc",
//                   border: "1px solid #e2e8f0",
//                 }}
//               >
//                 <small className="text-muted d-block">
//                   Exam Term
//                 </small>

//                 <strong>
//                   {selectedExamTerm || "-"}
//                 </strong>
//               </div>
//             </div>

//             <div className="col-md-3">
//               <div
//                 className="p-3 rounded-3 h-100"
//                 style={{
//                   backgroundColor: "#f8fafc",
//                   border: "1px solid #e2e8f0",
//                 }}
//               >
//                 <small className="text-muted d-block">
//                   Academic Year
//                 </small>

//                 <strong>
//                   {student.academicYear ||
//                     filters.academicYear ||
//                     "-"}
//                 </strong>
//               </div>
//             </div>

//             <div className="col-md-3">
//               <div
//                 className="p-3 rounded-3 h-100"
//                 style={{
//                   backgroundColor: "#f8fafc",
//                   border: "1px solid #e2e8f0",
//                 }}
//               >
//                 <small className="text-muted d-block">
//                   Sitting
//                 </small>

//                 <strong>
//                   {selectedSitting || "-"}
//                 </strong>
//               </div>
//             </div>

//             <div className="col-md-3">
//               <div
//                 className="p-3 rounded-3 h-100"
//                 style={{
//                   backgroundColor: "#eff6ff",
//                   border: "1px solid #bfdbfe",
//                 }}
//               >
//                 <small className="text-muted d-block">
//                   Room No.
//                 </small>

//                 <strong>
//                   {previewRoom || "-"}
//                 </strong>
//               </div>
//             </div>
//           </div>

          

//           {/* EXAM TIMING */}
//           <div className="mt-4">
//             <h6
//               className="fw-bold mb-3"
//               style={{ color: "#1e3a8a" }}
//             >
//               Examination Schedule
//             </h6>

//             <div
//               className="row g-0 rounded-3 overflow-hidden"
//               style={{
//                 border: "1px solid #dbeafe",
//               }}
//             >
//               <div className="col-md-4">
//                 <div
//                   className="p-3"
//                   style={{
//                     backgroundColor: "#eff6ff",
//                   }}
//                 >
//                   <small className="text-muted d-block">
//                     Exam Term
//                   </small>

//                   <strong>
//                     {selectedExamTerm || "-"}
//                   </strong>
//                 </div>
//               </div>

//               <div className="col-md-4">
//                 <div
//                   className="p-3"
//                   style={{
//                     backgroundColor: "#f8fafc",
//                   }}
//                 >
//                   <small className="text-muted d-block">
//                     Start Time
//                   </small>

//                   <strong>
//                     {startTime || "-"}
//                   </strong>
//                 </div>
//               </div>

//               <div className="col-md-4">
//                 <div
//                   className="p-3"
//                   style={{
//                     backgroundColor: "#f8fafc",
//                   }}
//                 >
//                   <small className="text-muted d-block">
//                     End Time
//                   </small>

//                   <strong>
//                     {endTime || "-"}
//                   </strong>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* INSTRUCTIONS */}
//           <div
//             className="mt-4 p-3 rounded-3"
//             style={{
//               backgroundColor: "#fffbeb",
//               border: "1px solid #fde68a",
//             }}
//           >
//             <h6 className="fw-bold mb-2">
//               Instructions
//             </h6>

//             <ul className="mb-0 small text-muted ps-3">
//               <li>
//                 Carry the admit card to the examination
//                 hall.
//               </li>

//               <li>
//                 Reach the examination room before the
//                 reporting time.
//               </li>

//               <li>
//                 Follow all examination rules and
//                 instructions.
//               </li>
//             </ul>
//           </div>

//           {/* SIGNATURE */}
//           <div className="row mt-5 pt-3">
//             <div className="col-6 text-center">
//               <div
//                 style={{
//                   borderTop: "1px solid #94a3b8",
//                   width: "150px",
//                   margin: "0 auto",
//                 }}
//               ></div>

//               <small className="text-muted">
//                 Class Teacher
//               </small>
//             </div>

//             <div className="col-6 text-center">
//               <div
//                 style={{
//                   borderTop: "1px solid #94a3b8",
//                   width: "150px",
//                   margin: "0 auto",
//                 }}
//               ></div>

//               <small className="text-muted">
//                 Principal
//               </small>
//             </div>
//           </div>
//         </div>

//         {/* CARD ACTIONS */}
//         <div
//           className="p-3 d-flex justify-content-end gap-2"
//           style={{
//             borderTop: "1px solid #e2e8f0",
//           }}
//         >
//           <button
//             type="button"
//             className="btn btn-outline-primary rounded-2"
//             onClick={() => handleEdit(student)}
//           >
//             <FaEdit className="me-2" />
//             Edit
//           </button>

//           <button
//             type="button"
//             className="btn btn-danger rounded-2"
//             onClick={() => handleDownloadPdf(student)}
//           >
//             <FaDownload className="me-2" />
//             Download PDF
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
     
//       <div className="mx-2 mt-2 mb-3">
//         <div
//           className="rounded-4 shadow overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
//             border: "1px solid #dbeafe",
//           }}
//         >
//           <div className="p-3 p-md-4">
//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//               <div className="d-flex align-items-center gap-3">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <FaUserGraduate size={26} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     Admit Card
//                   </h5>

//                   <div className="text-muted small">
//                     Assessment &nbsp;/&nbsp; Admit Card
//                   </div>
//                 </div>
//               </div>

//               <span
//                 className="badge rounded-pill px-3 py-2"
//                 style={{
//                   backgroundColor: "#eff6ff",
//                   color: "#2563eb",
//                   border: "1px solid #bfdbfe",
//                 }}
//               >
//                 <MdOutlineSchool className="me-1" />
//                 Assessment
//               </span>
//             </div>
//           </div>

//           <div
//             className="px-4 py-2"
//             style={{
//               backgroundColor: "rgba(239,246,255,.75)",
//               borderTop: "1px solid #e0ecff",
//             }}
//           >
//             <small className="text-muted">
//               Home &nbsp;›&nbsp; Assessment &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Admit Card
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//           SEARCH + EXAM SETTINGS
//       ========================================================= */}
//       <div className="mx-2 mt-2 mb-3">
//         <div className="card rounded-4 border-0 shadow overflow-hidden">
//           <div className="card-header bg-white p-3 border-bottom">
//             <strong className="d-flex align-items-center">
//               <span
//                 className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                 style={{
//                   backgroundColor: "#e8f6fa",
//                   width: "36px",
//                   height: "36px",
//                   color: "#2563eb",
//                 }}
//               >
//                 <FaSearch size={18} />
//               </span>

//               Search Students
//             </strong>
//           </div>

//           <div className="card-body p-3">
//             <div className="row g-3 align-items-end">
//               {/* ACADEMIC YEAR */}
//               <div className="col-md-3">
//                 <label
//                   htmlFor="academicYear"
//                   className="form-label mb-2"
//                 >
//                   <strong>Academic Year</strong>{" "}
//                   <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   name="academicYear"
//                   id="academicYear"
//                   className="form-select"
//                   value={filters.academicYear}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Session</option>

//                   {sessions.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* STANDARD */}
//               <div className="col-md-3">
//                 <label
//                   htmlFor="studentClass"
//                   className="form-label mb-2"
//                 >
//                   <strong>Standard</strong>{" "}
//                   <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   name="studentClass"
//                   id="studentClass"
//                   className="form-select"
//                   value={filters.studentClass}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Standard</option>

//                   {standards.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* SECTION */}
//               <div className="col-md-3">
//                 <label
//                   htmlFor="section"
//                   className="form-label mb-2"
//                 >
//                   <strong>Section</strong>{" "}
//                   <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   name="section"
//                   id="section"
//                   className="form-select"
//                   value={filters.section}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Section</option>

//                   {sections.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* SEARCH */}
//               <div className="col-md-3">
//                 <button
//                   type="button"
//                   className="btn btn-primary rounded-2 w-100"
//                   onClick={handleSearch}
//                   disabled={loading}
//                   style={{
//                     height: "38px",
//                     boxShadow:
//                       "0 5px 12px rgba(37,99,235,.18)",
//                   }}
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
//                     <>
//                       <FaSearch className="me-2" size={14} />
//                       Search
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* =====================================================
//                 EXAM SETTINGS
//             ===================================================== */}
//             <div
//               className="mt-4 pt-3"
//               style={{
//                 borderTop: "1px solid #edf2f7",
//               }}
//             >
//               <div className="row g-3 align-items-end">
//                 {/* EXAM TERM */}
//                 <div className="col-md-3">
//                   <label
//                     htmlFor="examTerm"
//                     className="form-label mb-2"
//                   >
//                     <strong>Exam Term</strong>{" "}
//                     <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     id="examTerm"
//                     className="form-select"
//                     value={selectedExamTerm}
//                     onChange={(e) =>
//                       setSelectedExamTerm(e.target.value)
//                     }
//                     disabled={students.length === 0}
//                   >
//                     <option value="">
//                       {students.length === 0
//                         ? "Search Students First"
//                         : examTerms.length === 0
//                         ? "No Exam Term Available"
//                         : "Select Exam Term"}
//                     </option>

//                     {examTerms.map((item) => (
//                       <option
//                         key={item.id}
//                         value={item.examTerm}
//                       >
//                         {item.examTerm}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* SITTING */}
//                 <div className="col-md-2">
//                   <label
//                     htmlFor="sitting"
//                     className="form-label mb-2"
//                   >
//                     <strong>Select Sitting</strong>{" "}
//                     <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     id="sitting"
//                     className="form-select"
//                     value={selectedSitting}
//                     onChange={(e) =>
//                       setSelectedSitting(e.target.value)
//                     }
//                     disabled={students.length === 0}
//                   >
//                     <option value="">Select Sitting</option>

//                     <option value="1st Sitting">
//                       1st Sitting
//                     </option>

//                     <option value="2nd Sitting">
//                       2nd Sitting
//                     </option>
//                   </select>
//                 </div>

//                 {/* START TIME */}
//                 <div className="col-md-2">
//                   <label
//                     htmlFor="startTime"
//                     className="form-label mb-2"
//                   >
//                     <strong>Start Time</strong>{" "}
//                     <span className="text-danger">*</span>
//                   </label>

//                   <div className="input-group">
//                     <span className="input-group-text bg-white">
//                       <FaClock
//                         size={14}
//                         className="text-primary"
//                       />
//                     </span>

//                     <input
//                       type="time"
//                       id="startTime"
//                       className="form-control"
//                       value={startTime}
//                       onChange={(e) =>
//                         setStartTime(e.target.value)
//                       }
//                       disabled={students.length === 0}
//                     />
//                   </div>
//                 </div>

//                 {/* END TIME */}
//                 <div className="col-md-2">
//                   <label
//                     htmlFor="endTime"
//                     className="form-label mb-2"
//                   >
//                     <strong>End Time</strong>{" "}
//                     <span className="text-danger">*</span>
//                   </label>

//                   <div className="input-group">
//                     <span className="input-group-text bg-white">
//                       <FaClock
//                         size={14}
//                         className="text-primary"
//                       />
//                     </span>

//                     <input
//                       type="time"
//                       id="endTime"
//                       className="form-control"
//                       value={endTime}
//                       onChange={(e) =>
//                         setEndTime(e.target.value)
//                       }
//                       disabled={students.length === 0}
//                     />
//                   </div>
//                 </div>

//                 {/* RESET */}
//                 <div className="col-md-3">
//                   <button
//                     type="button"
//                     className="btn btn-danger rounded-2 w-100"
//                     onClick={handleReset}
//                   >
//                     Reset
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//           STUDENTS LIST
//       ========================================================= */}
//       <div className="mx-2 mt-2 mb-3">
//         <div className="card rounded-4 border-0 shadow overflow-hidden">
//           {/* HEADER */}
//           <div className="card-header bg-white p-3 border-bottom">
//             <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
//               <div className="d-flex align-items-center">
//                 <span
//                   className="d-inline-flex align-items-center justify-content-center rounded-2 me-2 flex-shrink-0"
//                   style={{
//                     backgroundColor: "#e8f6fa",
//                     width: "36px",
//                     height: "36px",
//                     color: "#2563eb",
//                   }}
//                 >
//                   <FaRegListAlt size={18} />
//                 </span>

//                 <div>
//                   <h6 className="mb-0 fw-semibold text-dark">
//                     Students List
//                   </h6>

//                   <div className="text-muted small mt-1">
//                     Select students and manage admit cards
//                   </div>
//                 </div>
//               </div>

//               {students.length > 0 && (
//                 <div className="d-flex align-items-center gap-2">
//                   <span
//                     className="badge rounded-pill px-3 py-2"
//                     style={{
//                       backgroundColor: "#eff6ff",
//                       color: "#2563eb",
//                       border: "1px solid #bfdbfe",
//                     }}
//                   >
//                     {selectedStudents.length} /{" "}
//                     {students.length} Selected
//                   </span>

//                   <span
//                     className="badge rounded-pill px-3 py-2"
//                     style={{
//                       backgroundColor: "#f0fdf4",
//                       color: "#15803d",
//                       border: "1px solid #bbf7d0",
//                     }}
//                   >
//                     {students.length} Students
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* BODY */}
//           <div className="card-body p-0">
//             {loading ? (
//               <div className="text-center py-5">
//                 <div
//                   className="spinner-border text-primary"
//                   role="status"
//                   style={{
//                     width: "2.5rem",
//                     height: "2.5rem",
//                   }}
//                 ></div>

//                 <p className="text-muted small mt-3 mb-0">
//                   Searching students...
//                 </p>
//               </div>
//             ) : students.length === 0 ? (
//               <div className="text-center py-5">
//                 <div
//                   className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
//                   style={{
//                     width: "65px",
//                     height: "65px",
//                     backgroundColor: "#eff6ff",
//                   }}
//                 >
//                   <FaUserGraduate
//                     size={30}
//                     className="text-primary"
//                   />
//                 </div>

//                 <h6 className="fw-semibold text-dark mb-1">
//                   No Students Found
//                 </h6>

//                 <p className="text-muted small mb-0">
//                   Please search students by selecting Academic
//                   Year, Standard and Section.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 {/* SELECT ALL BAR */}
//                 <div
//                   className="px-3 py-3 d-flex align-items-center justify-content-between flex-wrap gap-2"
//                   style={{
//                     backgroundColor: "#f8fafc",
//                     borderBottom: "1px solid #e2e8f0",
//                   }}
//                 >
//                   <div className="form-check mb-0">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="selectAllStudents"
//                       checked={isAllSelected}
//                       onChange={handleSelectAll}
//                       style={{
//                         cursor: "pointer",
//                       }}
//                     />

//                     <label
//                       className="form-check-label fw-semibold"
//                       htmlFor="selectAllStudents"
//                       style={{
//                         cursor: "pointer",
//                       }}
//                     >
//                       <FaCheckSquare className="text-primary me-1" />
//                       Select All Students
//                     </label>
//                   </div>

//                   {selectedStudents.length > 0 && (
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-outline-primary rounded-2"
//                       onClick={handleBulkDownload}
//                     >
//                       <FaFilePdf className="me-2" />
//                       Download Selected PDFs
//                     </button>
//                   )}
//                 </div>

//                 {/* TABLE */}
//                 <div
//                   className="table-responsive"
//                   style={{
//                     maxHeight: "570px",
//                     overflowY: "auto",
//                   }}
//                 >
//                   <table
//                     className="table table-hover align-middle mb-0"
//                     style={{
//                       minWidth: "1250px",
//                     }}
//                   >
//                     <thead
//                       style={{
//                         position: "sticky",
//                         top: 0,
//                         zIndex: 5,
//                         backgroundColor: "#f8fafc",
//                       }}
//                     >
//                       <tr>
//                         <th
//                           className="px-3 py-3"
//                           style={{ width: "50px" }}
//                         >
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             checked={isAllSelected}
//                             onChange={handleSelectAll}
//                             style={{
//                               cursor: "pointer",
//                             }}
//                           />
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           #
//                         </th>

//                         <th
//                           className="px-3 py-3 text-muted small fw-semibold"
//                           style={{ minWidth: "240px" }}
//                         >
//                           Student
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Admission No.
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Class
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Section
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Academic Year
//                         </th>

//                         <th
//                           className="px-3 py-3 text-muted small fw-semibold"
//                           style={{ minWidth: "130px" }}
//                         >
//                           Room No.
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Exam Term
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Sitting
//                         </th>

//                         <th className="px-3 py-3 text-muted small fw-semibold">
//                           Time
//                         </th>

//                         <th
//                           className="px-3 py-3 text-muted small fw-semibold text-center"
//                           style={{ minWidth: "130px" }}
//                         >
//                           Action
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {students.map((student, index) => {
//                         const studentKey = getStudentKey(
//                           student,
//                           index
//                         );

//                         const isSelected =
//                           selectedStudents.includes(
//                             studentKey
//                           );

//                         return (
//                           <tr
//                             key={studentKey}
//                             style={{
//                               backgroundColor: isSelected
//                                 ? "#f8fbff"
//                                 : "#fff",
//                             }}
//                           >
//                             {/* CHECKBOX */}
//                             <td className="px-3 py-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 checked={isSelected}
//                                 onChange={() =>
//                                   handleStudentSelect(
//                                     student,
//                                     index
//                                   )
//                                 }
//                                 style={{
//                                   cursor: "pointer",
//                                 }}
//                               />
//                             </td>

//                             {/* NUMBER */}
//                             <td className="px-3 py-3">
//                               <span className="fw-semibold text-muted">
//                                 {index + 1}
//                               </span>
//                             </td>

//                             {/* STUDENT */}
//                             <td className="px-3 py-3">
//                               <div className="d-flex align-items-center">
//                                 {student.photo ? (
//                                   <img
//                                     src={student.photo}
//                                     alt={
//                                       student.firstName ||
//                                       "Student"
//                                     }
//                                     style={{
//                                       width: "42px",
//                                       height: "42px",
//                                       objectFit: "cover",
//                                       borderRadius: "50%",
//                                       marginRight: "11px",
//                                       border:
//                                         "2px solid #dbeafe",
//                                     }}
//                                   />
//                                 ) : (
//                                   <div
//                                     className="d-flex align-items-center justify-content-center flex-shrink-0"
//                                     style={{
//                                       width: "42px",
//                                       height: "42px",
//                                       borderRadius: "50%",
//                                       marginRight: "11px",
//                                       backgroundColor:
//                                         "#eff6ff",
//                                       color: "#2563eb",
//                                       border:
//                                         "2px solid #dbeafe",
//                                     }}
//                                   >
//                                     <FaUserGraduate
//                                       size={18}
//                                     />
//                                   </div>
//                                 )}

//                                 <div>
//                                   <div className="fw-semibold text-dark">
//                                     {student.firstName ||
//                                       "-"}{" "}
//                                     {student.lastName || ""}
//                                   </div>

//                                   {student.email && (
//                                     <small className="text-muted">
//                                       {student.email}
//                                     </small>
//                                   )}
//                                 </div>
//                               </div>
//                             </td>

//                             {/* ADMISSION */}
//                             <td className="px-3 py-3">
//                               <span
//                                 className="fw-semibold"
//                                 style={{
//                                   color: "#2563eb",
//                                 }}
//                               >
//                                 {student.admissionNumber ||
//                                   "-"}
//                               </span>
//                             </td>

//                             {/* CLASS */}
//                             <td className="px-3 py-3">
//                               <span className="fw-medium">
//                                 {student.studentClass ||
//                                   "-"}
//                               </span>
//                             </td>

//                             {/* SECTION */}
//                             <td className="px-3 py-3">
//                               <span
//                                 className="badge rounded-pill"
//                                 style={{
//                                   backgroundColor:
//                                     "#f1f5f9",
//                                   color: "#475569",
//                                   border:
//                                     "1px solid #e2e8f0",
//                                 }}
//                               >
//                                 {student.section || "-"}
//                               </span>
//                             </td>

//                             {/* ACADEMIC YEAR */}
//                             <td className="px-3 py-3">
//                               {student.academicYear || "-"}
//                             </td>

//                             {/* ROOM */}
//                             <td className="px-3 py-3">
//                               <input
//                                 type="text"
//                                 className="form-control form-control-sm"
//                                 placeholder="Room No."
//                                 value={
//                                   roomNumbers[
//                                     studentKey
//                                   ] || ""
//                                 }
//                                 onChange={(e) =>
//                                   handleRoomChange(
//                                     studentKey,
//                                     e.target.value
//                                   )
//                                 }
//                                 style={{
//                                   minWidth: "110px",
//                                   borderRadius: "8px",
//                                 }}
//                               />
//                             </td>

//                             {/* EXAM TERM */}
//                             <td className="px-3 py-3">
//                               <span
//                                 className="badge rounded-pill"
//                                 style={{
//                                   backgroundColor:
//                                     "#eff6ff",
//                                   color: "#2563eb",
//                                   border:
//                                     "1px solid #bfdbfe",
//                                   whiteSpace: "nowrap",
//                                 }}
//                               >
//                                 {selectedExamTerm || "-"}
//                               </span>
//                             </td>

//                             {/* SITTING */}
//                             <td className="px-3 py-3">
//                               <span
//                                 className="badge rounded-pill"
//                                 style={{
//                                   backgroundColor:
//                                     "#f0fdf4",
//                                   color: "#15803d",
//                                   border:
//                                     "1px solid #bbf7d0",
//                                   whiteSpace: "nowrap",
//                                 }}
//                               >
//                                 {selectedSitting || "-"}
//                               </span>
//                             </td>

//                             {/* TIME */}
//                             <td className="px-3 py-3">
//                               <div
//                                 className="small fw-medium"
//                                 style={{
//                                   whiteSpace: "nowrap",
//                                 }}
//                               >
//                                 {startTime && endTime
//                                   ? `${startTime} - ${endTime}`
//                                   : "-"}
//                               </div>
//                             </td>

//                             {/* ACTION */}
//                             <td className="px-3 py-3">
//                               <div className="d-flex justify-content-center gap-1">
//                                 {/* VIEW */}
//                                 <button
//                                   type="button"
//                                   className="btn btn-sm"
//                                   title="View Admit Card"
//                                   onClick={() =>
//                                     handleViewAdmitCard(
//                                       student
//                                     )
//                                   }
//                                   style={{
//                                     width: "34px",
//                                     height: "34px",
//                                     padding: 0,
//                                     borderRadius: "8px",
//                                     backgroundColor:
//                                       "#eff6ff",
//                                     color: "#2563eb",
//                                     border:
//                                       "1px solid #bfdbfe",
//                                   }}
//                                 >
//                                   <FaEye size={14} />
//                                 </button>

//                                 {/* EDIT */}
//                                 <button
//                                   type="button"
//                                   className="btn btn-sm"
//                                   title="Edit Room"
//                                   onClick={() =>
//                                     handleEdit(student)
//                                   }
//                                   style={{
//                                     width: "34px",
//                                     height: "34px",
//                                     padding: 0,
//                                     borderRadius: "8px",
//                                     backgroundColor:
//                                       "#fff7ed",
//                                     color: "#ea580c",
//                                     border:
//                                       "1px solid #fed7aa",
//                                   }}
//                                 >
//                                   <FaEdit size={14} />
//                                 </button>

//                                 {/* PDF */}
//                                 <button
//                                   type="button"
//                                   className="btn btn-sm"
//                                   title="Download PDF"
//                                   onClick={() =>
//                                     handleDownloadPdf(
//                                       student
//                                     )
//                                   }
//                                   style={{
//                                     width: "34px",
//                                     height: "34px",
//                                     padding: 0,
//                                     borderRadius: "8px",
//                                     backgroundColor:
//                                       "#fef2f2",
//                                     color: "#dc2626",
//                                     border:
//                                       "1px solid #fecaca",
//                                   }}
//                                 >
//                                   <FaDownload size={14} />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* =================================================
//                     GENERATE BUTTON
//                 ================================================= */}
//                 <div
//                   className="p-3 d-flex align-items-center justify-content-between flex-wrap gap-3"
//                   style={{
//                     backgroundColor: "#f8fafc",
//                     borderTop: "1px solid #e2e8f0",
//                   }}
//                 >
//                   <div className="small text-muted">
//                     {selectedStudents.length > 0 ? (
//                       <>
//                         <strong className="text-dark">
//                           {selectedStudents.length}
//                         </strong>{" "}
//                         student(s) selected for admit card
//                         generation.
//                       </>
//                     ) : (
//                       "Select students to generate admit cards."
//                     )}
//                   </div>

//                   <button
//                     type="button"
//                     className="btn btn-primary rounded-3 px-4 py-2"
//                     onClick={handleGenerateAdmitCards}
//                     disabled={selectedStudents.length === 0}
//                     style={{
//                       boxShadow:
//                         "0 6px 16px rgba(37,99,235,.2)",
//                     }}
//                   >
//                     <FaFilePdf className="me-2" />
//                     Generate Admit Cards
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//           SINGLE STUDENT PREVIEW
//       ========================================================= */}
//       {previewStudent && generatedStudents.length === 0 && (
//         <div
//           id="admit-card-preview"
//           className="mx-2 mt-4 mb-4"
//         >
//           <div className="card rounded-4 border-0 shadow overflow-hidden">
//             {/* PREVIEW HEADER */}
//             <div className="card-header bg-white p-3 border-bottom">
//               <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
//                 <div className="d-flex align-items-center">
//                   <span
//                     className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                     style={{
//                       backgroundColor: "#e8f6fa",
//                       width: "36px",
//                       height: "36px",
//                       color: "#2563eb",
//                     }}
//                   >
//                     <FaEye size={18} />
//                   </span>

//                   <div>
//                     <h6 className="mb-0 fw-semibold text-dark">
//                       Admit Card Preview
//                     </h6>

//                     <div className="text-muted small mt-1">
//                       Preview for{" "}
//                       <strong>
//                         {previewStudent.firstName}{" "}
//                         {previewStudent.lastName || ""}
//                       </strong>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   className="btn btn-outline-danger btn-sm rounded-2"
//                   onClick={() => setPreviewStudent(null)}
//                 >
//                   Close Preview
//                 </button>
//               </div>
//             </div>

//             <div className="card-body p-4">
//               <AdmitCardPreview student={previewStudent} />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =========================================================
//           GENERATED MULTIPLE ADMIT CARDS PREVIEW
//       ========================================================= */}
//       {generatedStudents.length > 0 && (
//         <div
//           id="admit-card-preview"
//           className="mx-2 mt-4 mb-4"
//         >
//           <div className="card rounded-4 border-0 shadow overflow-hidden">
//             {/* GENERATED HEADER */}
//             <div className="card-header bg-white p-3 border-bottom">
//               <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
//                 <div className="d-flex align-items-center">
//                   <span
//                     className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                     style={{
//                       backgroundColor: "#e8f6fa",
//                       width: "36px",
//                       height: "36px",
//                       color: "#2563eb",
//                     }}
//                   >
//                     <FaFilePdf size={18} />
//                   </span>

//                   <div>
//                     <h6 className="mb-0 fw-semibold text-dark">
//                       Admit Card Preview
//                     </h6>

//                     <div className="text-muted small mt-1">
//                       Preview of{" "}
//                       <strong>
//                         {generatedStudents.length}
//                       </strong>{" "}
//                       selected student
//                       {generatedStudents.length > 1
//                         ? "s"
//                         : ""}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="d-flex align-items-center gap-2">
//                   <span
//                     className="badge rounded-pill px-3 py-2"
//                     style={{
//                       backgroundColor: "#eff6ff",
//                       color: "#2563eb",
//                       border: "1px solid #bfdbfe",
//                     }}
//                   >
//                     {generatedStudents.length} Cards
//                   </span>

//                   <button
//                     type="button"
//                     className="btn btn-outline-danger btn-sm rounded-2"
//                     onClick={() =>
//                       setGeneratedStudents([])
//                     }
//                   >
//                     Close Preview
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* GENERATED CARDS */}
//             <div className="card-body p-4">
//               {generatedStudents.map(
//                 (student, index) => (
//                   <div key={getStudentKey(student, index)}>
//                     <AdmitCardPreview
//                       student={student}
//                     />

//                     {/* SEPARATOR */}
//                     {index <
//                       generatedStudents.length - 1 && (
//                       <div
//                         style={{
//                           borderBottom:
//                             "2px dashed #dbeafe",
//                           margin:
//                             "10px 0 30px",
//                         }}
//                       ></div>
//                     )}
//                   </div>
//                 )
//               )}
//             </div>

//             {/* GENERATED FOOTER */}
//             <div
//               className="p-3 d-flex align-items-center justify-content-between flex-wrap gap-2"
//               style={{
//                 backgroundColor: "#f8fafc",
//                 borderTop: "1px solid #e2e8f0",
//               }}
//             >
//               <div className="small text-muted">
//                 <strong className="text-dark">
//                   {generatedStudents.length}
//                 </strong>{" "}
//                 admit card(s) generated in preview.
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-danger rounded-2"
//                 onClick={handleBulkDownload}
//               >
//                 <FaFilePdf className="me-2" />
//                 Download All PDFs
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdmitCard;

import React, { useEffect, useState } from "react";
import {
  FaDownload,
  FaEdit,
  FaEye,
  FaRegListAlt,
  FaSearch,
  FaUserGraduate,
  FaClock,
  FaFilePdf,
  FaCheckSquare,
} from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";
import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";

const AdmitCard = () => {
  const { sessions, standards, sections } = useMasters();

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;

  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [examTerms, setExamTerms] = useState([]);

  // Selected exam term ID
  const [selectedExamTerm, setSelectedExamTerm] = useState("");

  const [selectedSitting, setSelectedSitting] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [roomNumbers, setRoomNumbers] = useState({});

  const [selectedStudents, setSelectedStudents] = useState([]);

  const [previewStudent, setPreviewStudent] = useState(null);

  const [generatedStudents, setGeneratedStudents] = useState([]);

  const [generatedAdmitCard, setGeneratedAdmitCard] = useState(null);

  const [schoolImage, setSchoolImage] = useState(null);

  const [filters, setFilters] = useState({
    academicYear: "",
    studentClass: "",
    section: "",
  });

  // =========================================================
  // SCHOOL IMAGE
  // =========================================================

  const fetchSchoolImage = async () => {
    try {
      if (!schoolId) return;

      const response = await axiosInstance.get(
        `/api/school/${schoolId}/images`
      );

      setSchoolImage(response.data);
    } catch (error) {
      console.log("School image error:", error);
      setSchoolImage(null);
    }
  };

  useEffect(() => {
    if (!schoolId) return;

    fetchSchoolImage();
  }, [schoolId]);

  const getImageUrl = (url) => {
    if (!url) return null;

    if (
      url.startsWith("http://") ||
      url.startsWith("https://")
    ) {
      return url;
    }

    return `${axiosInstance.defaults.baseURL}${url}`;
  };

  // =========================================================
  // SELECTED EXAM TERM NAME
  // =========================================================

  const getSelectedExamTermName = () => {
    const term = examTerms.find(
      (item) =>
        String(item.id) === String(selectedExamTerm)
    );

    return term?.examTerm || "-";
  };

  // =========================================================
  // FILTER CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // SEARCH STUDENTS
  // =========================================================

  const handleSearch = async () => {
    if (
      !filters.academicYear ||
      !filters.studentClass ||
      !filters.section
    ) {
      alert(
        "Please select Academic Year, Standard and Section"
      );
      return;
    }

    if (!schoolId) {
      alert("School ID not found");
      return;
    }

    try {
      setLoading(true);

      // Reset previous data
      setSelectedExamTerm("");
      setSelectedSitting("");
      setStartTime("");
      setEndTime("");

      setRoomNumbers({});
      setSelectedStudents([]);
      setPreviewStudent([]);
      setGeneratedStudents([]);
      setGeneratedAdmitCard(null);

      // =====================================================
      // SEARCH STUDENTS
      // =====================================================

      const studentRes = await axiosInstance.get(
        "/api/students/search",
        {
          params: {
            academicYear: filters.academicYear,
            studentClass: filters.studentClass,
            section: filters.section,
          },
        }
      );

      const studentData = studentRes.data || [];

      setStudents(studentData);

      // =====================================================
      // SEARCH EXAM TERMS
      // =====================================================

      if (studentData.length > 0) {
        const examTermRes =
          await axiosInstance.get(
            "/api/assessment/exam-term",
            {
              params: {
                schoolId: schoolId,
                session: filters.academicYear,
              },
            }
          );

        setExamTerms(examTermRes.data || []);
      } else {
        setExamTerms([]);
      }
    } catch (error) {
      console.error("Search error:", error);

      setStudents([]);
      setExamTerms([]);

      setSelectedExamTerm("");
      setSelectedSitting("");
      setStartTime("");
      setEndTime("");

      setRoomNumbers({});
      setSelectedStudents([]);
      setPreviewStudent(null);
      setGeneratedStudents([]);
      setGeneratedAdmitCard(null);

      alert(
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message ||
              "Something went wrong while searching students"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // STUDENT KEY
  // =========================================================

  const getStudentKey = (student, index = 0) => {
    return (
      student.id ||
      student.admissionNumber ||
      index
    );
  };

  // =========================================================
  // SELECT STUDENT
  // =========================================================

  const handleStudentSelect = (student, index) => {
    const key = getStudentKey(student, index);

    setSelectedStudents((prev) => {
      if (prev.includes(key)) {
        return prev.filter((id) => id !== key);
      }

      return [...prev, key];
    });
  };

  // =========================================================
  // SELECT ALL
  // =========================================================

  const handleSelectAll = () => {
    if (
      selectedStudents.length === students.length
    ) {
      setSelectedStudents([]);
      return;
    }

    const allStudentKeys = students.map(
      (student, index) =>
        getStudentKey(student, index)
    );

    setSelectedStudents(allStudentKeys);
  };

  const isAllSelected =
    students.length > 0 &&
    selectedStudents.length === students.length;

  // =========================================================
  // ROOM NUMBER
  // =========================================================

  const handleRoomChange = (
    studentId,
    value
  ) => {
    setRoomNumbers((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  // =========================================================
  // VIEW STUDENT ADMIT CARD
  // =========================================================

  const handleViewAdmitCard = async (student) => {
    try {
      setLoading(true);

      /*
       * First check whether this student already has
       * an admit card generated in backend.
       */
      const response = await axiosInstance.get(
        `/api/admit-card/student/${student.admissionNumber}`
      );

      const admitCards = response.data || [];

      // =====================================================
      // NO BACKEND ADMIT CARD
      // =====================================================

      if (admitCards.length === 0) {
        setGeneratedStudents([]);
        setGeneratedAdmitCard(null);
        setPreviewStudent(student);

        setTimeout(() => {
          document
            .getElementById(
              "admit-card-preview"
            )
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }, 100);

        return;
      }

      // =====================================================
      // GET LATEST ADMIT CARD
      // =====================================================

      const latestAdmitCard =
        admitCards[admitCards.length - 1];

      const backendStudent =
        latestAdmitCard.students?.find(
          (item) =>
            item.admissionNumber ===
            student.admissionNumber
        );

      if (!backendStudent) {
        setGeneratedStudents([]);
        setGeneratedAdmitCard(null);
        setPreviewStudent(student);

        setTimeout(() => {
          document
            .getElementById(
              "admit-card-preview"
            )
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }, 100);

        return;
      }

      const previewData = {
        ...backendStudent,
        __roomNo:
          backendStudent.roomNumber || "",
      };

      setGeneratedAdmitCard(
        latestAdmitCard
      );

      setGeneratedStudents([]);

      setPreviewStudent(previewData);

      setTimeout(() => {
        document
          .getElementById(
            "admit-card-preview"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (error) {
      console.error(
        "View Admit Card Error:",
        error
      );

      /*
       * If backend does not have admit card,
       * show current frontend preview.
       */
      setGeneratedStudents([]);
      setGeneratedAdmitCard(null);
      setPreviewStudent(student);

      setTimeout(() => {
        document
          .getElementById(
            "admit-card-preview"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // EDIT ROOM
  // =========================================================

  const handleEdit = (student) => {
    const studentKey =
      student.id ||
      student.admissionNumber;

    const currentRoom =
      student.__roomNo !== undefined
        ? student.__roomNo
        : roomNumbers[studentKey] || "";

    const newRoom = window.prompt(
      `Enter Room Number for ${
        student.firstName || "Student"
      }`,
      currentRoom
    );

    if (newRoom !== null) {
      setRoomNumbers((prev) => ({
        ...prev,
        [studentKey]: newRoom,
      }));

      // Update single preview
      if (previewStudent) {
        const previewKey =
          previewStudent.id ||
          previewStudent.admissionNumber;

        if (previewKey === studentKey) {
          setPreviewStudent((prev) => ({
            ...prev,
            __roomNo: newRoom,
          }));
        }
      }

      // Update generated preview
      setGeneratedStudents((prev) =>
        prev.map((item) => {
          const itemKey =
            item.id ||
            item.studentId ||
            item.admissionNumber;

          if (itemKey === studentKey) {
            return {
              ...item,
              __roomNo: newRoom,
            };
          }

          return item;
        })
      );
    }
  };

  // =========================================================
  // DOWNLOAD SINGLE PDF
  // =========================================================

  const handleDownloadPdf = (student) => {
    alert(
      `PDF download will be connected with backend for ${
        student.firstName || "this student"
      }.`
    );
  };

  // =========================================================
  // BULK DOWNLOAD
  // =========================================================

  const handleBulkDownload = () => {
    if (selectedStudents.length === 0) {
      alert(
        "Please select at least one student."
      );
      return;
    }

    alert(
      `${selectedStudents.length} admit card(s) PDF download will be connected with backend.`
    );
  };

  // =========================================================
  // GENERATE ADMIT CARDS - BACKEND
  // =========================================================

  const handleGenerateAdmitCards =
    async () => {
      if (students.length === 0) {
        alert(
          "Please search students first."
        );
        return;
      }

      if (!selectedExamTerm) {
        alert(
          "Please select Exam Term."
        );
        return;
      }

      if (!selectedSitting) {
        alert(
          "Please select Sitting."
        );
        return;
      }

      if (!startTime || !endTime) {
        alert(
          "Please select Start Time and End Time."
        );
        return;
      }

      if (startTime >= endTime) {
        alert(
          "End Time must be greater than Start Time."
        );
        return;
      }

      if (selectedStudents.length === 0) {
        alert(
          "Please select at least one student."
        );
        return;
      }

      if (!schoolId) {
        alert("School ID not found.");
        return;
      }

      try {
        setLoading(true);

       

        const selectedStudentData =
          students
            .map((student, index) => {
              const studentKey =
                getStudentKey(
                  student,
                  index
                );

              if (
                !selectedStudents.includes(
                  studentKey
                )
              ) {
                return null;
              }

              return {
                ...student,
                __roomNo:
                  roomNumbers[
                    studentKey
                  ] || "",
              };
            })
            .filter(Boolean);

        // ===================================================
        // BACKEND REQUEST
        // ===================================================

        const requestData = {
          schoolId: schoolId,
          academicYear:
            filters.academicYear,

          examTermId:
            Number(selectedExamTerm),

          sitting:
            selectedSitting,

          startTime:
            startTime,

          endTime:
            endTime,

          students:
            selectedStudentData.map(
              (student) => ({
                admissionNumber:
                  student.admissionNumber,

                roomNumber:
                  student.__roomNo || "",
              })
            ),
        };

        console.log(
          "Generate Admit Card Request:",
          requestData
        );

        // ===================================================
        // POST BACKEND
        // ===================================================

        const response =
          await axiosInstance.post(
            "/api/admit-card/generate",
            requestData
          );

        console.log(
          "Generate Admit Card Response:",
          response.data
        );

        const backendData =
          response.data;

        // ===================================================
        // BACKEND STUDENTS -> PREVIEW DATA
        // ===================================================

        const generatedData =
          (
            backendData.students || []
          ).map((student) => ({
            ...student,

            __roomNo:
              student.roomNumber || "",
          }));

        // ===================================================
        // SAVE GENERATED DATA
        // ===================================================

        setGeneratedAdmitCard(
          backendData
        );

        setPreviewStudent(null);

        setGeneratedStudents(
          generatedData
        );

        // ===================================================
        // SCROLL PREVIEW
        // ===================================================

        setTimeout(() => {
          document
            .getElementById(
              "admit-card-preview"
            )
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }, 150);

        alert(
          `${generatedData.length} admit card(s) generated successfully.`
        );
      } catch (error) {
        console.error(
          "Generate Admit Card Error:",
          error
        );

        console.error(
          "Backend response:",
          error.response?.data
        );

        alert(
          typeof error.response?.data ===
            "string"
            ? error.response.data
            : error.response?.data?.message ||
                "Failed to generate admit cards."
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================================================
  // DELETE ADMIT CARD
  // =========================================================

  const handleDeleteAdmitCard =
    async (id) => {
      if (!id) return;

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this admit card?"
        );

      if (!confirmDelete) {
        return;
      }

      try {
        setLoading(true);

        await axiosInstance.delete(
          `/api/admit-card/${id}`
        );

        alert(
          "Admit card deleted successfully."
        );

        setGeneratedAdmitCard(null);
        setGeneratedStudents([]);
        setPreviewStudent(null);
      } catch (error) {
        console.error(
          "Delete Admit Card Error:",
          error
        );

        alert(
          typeof error.response?.data ===
            "string"
            ? error.response.data
            : error.response?.data?.message ||
                "Failed to delete admit card."
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    setFilters({
      academicYear: "",
      studentClass: "",
      section: "",
    });

    setStudents([]);
    setExamTerms([]);

    setSelectedExamTerm("");
    setSelectedSitting("");

    setStartTime("");
    setEndTime("");

    setRoomNumbers({});
    setSelectedStudents([]);

    setPreviewStudent(null);

    setGeneratedStudents([]);

    setGeneratedAdmitCard(null);
  };

  // =========================================================
  // ADMIT CARD PREVIEW COMPONENT
  // =========================================================

  const AdmitCardPreview = ({
    student,
  }) => {
    const studentKey =
      student.id ||
      student.studentId ||
      student.admissionNumber;

    const previewRoom =
      student.__roomNo !== undefined
        ? student.__roomNo
        : roomNumbers[
            studentKey
          ] || "";

    const previewExamTerm =
      generatedAdmitCard?.examTerm ||
      getSelectedExamTermName();

    const previewSitting =
      generatedAdmitCard?.sitting ||
      selectedSitting;

    const previewStartTime =
      generatedAdmitCard?.startTime ||
      startTime;

    const previewEndTime =
      generatedAdmitCard?.endTime ||
      endTime;

    const previewAcademicYear =
      student.academicYear ||
      generatedAdmitCard?.academicYear ||
      filters.academicYear;

    return (
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto 30px",
          border:
            "2px solid #1e3a8a",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        {/* =====================================================
            SCHOOL HEADER
        ===================================================== */}

        <div
          className="d-flex align-items-center p-4"
          style={{
            background:
              "linear-gradient(135deg,#eff6ff,#ffffff)",
            borderBottom:
              "2px solid #dbeafe",
            position: "relative",
          }}
        >
          {/* SCHOOL LOGO - LEFT */}

          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: "120px",
              height: "120px",
              flexShrink: 0,
            }}
          >
            {schoolImage?.logoUrl && (
              <img
                src={getImageUrl(
                  schoolImage.logoUrl
                )}
                alt="School Image"
                className="w-100 h-100"
                style={{
                  objectFit: "fill",
                }}
              />
            )}
          </div>

          {/* SCHOOL DETAILS - CENTER */}

          <div
            className="flex-grow-1 text-center"
            style={{
              marginRight: "120px",
            }}
          >
            <h3 className="fw-bold text-dark mb-1">
              {user?.school?.schoolName}
            </h3>

            <div className="text-muted small">
              Address:{" "}
              {user?.school?.addressLine1},{" "}
              {user?.school?.city},{" "}
              {user?.school?.state}
            </div>

            <div className="text-muted small">
              Email:{" "}
              {user?.school?.email}
            </div>

            <div className="text-muted small">
              Mobile:{" "}
              {user?.school?.phoneNumber}
            </div>

            <div
              className="mt-3 d-inline-block px-4 py-2 rounded-pill"
              style={{
                backgroundColor:
                  "#2563eb",
                color: "#fff",
                fontWeight: "700",
                letterSpacing: "1px",
              }}
            >
              ADMIT CARD
            </div>
          </div>
        </div>

        {/* =====================================================
            STUDENT INFORMATION
        ===================================================== */}

        <div className="p-2">
          <h6
            className="fw-bold mb-3"
            style={{
              color: "#1e3a8a",
            }}
          >
            Student Information
          </h6>

          <div className="row g-3">
            <div className="col-md-8">
              <div
                className="p-3 rounded-3"
                style={{
                  border:
                    "1px solid #e2e8f0",
                }}
              >
                <div className="row g-4">
                  {/* NAME */}

                  <div className="col-sm-4">
                    <small className="text-muted d-block">
                      Student Name
                    </small>

                    <strong>
                      {student.firstName ||
                        "-"}{" "}
                      {student.lastName ||
                        ""}
                    </strong>
                  </div>

                  {/* ADMISSION */}

                  <div className="col-sm-4">
                    <small className="text-muted d-block">
                      Admission Number
                    </small>

                    <strong>
                      {student.admissionNumber ||
                        "-"}
                    </strong>
                  </div>

                  {/* CLASS */}

                  <div className="col-sm-4">
                    <small className="text-muted d-block">
                      Class / Section
                    </small>

                    <strong>
                      {student.studentClass ||
                        "-"}{" "}
                      /{" "}
                      {student.section ||
                        "-"}
                    </strong>
                  </div>

                  {/* ROLL */}

                  <div className="col-sm-4">
                    <small className="text-muted d-block">
                      Roll No
                    </small>

                    <strong>
                      {student.rollNumber ||
                        "-"}
                    </strong>
                  </div>

                  {/* FATHER */}

                  <div className="col-sm-4">
                    <small className="text-muted d-block">
                      Father Name
                    </small>

                    <strong>
                      {student.fatherName ||
                        "-"}
                    </strong>
                  </div>

                  {/* MOBILE */}

                  <div className="col-sm-4">
                    <small className="text-muted d-block">
                      Mobile No
                    </small>

                    <strong>
                      {student.mobile ||
                        "-"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* PHOTO */}

            <div className="col-md-4">
              <div
                className="h-100 d-flex align-items-center justify-content-center rounded-3"
                style={{
                  border:
                    "1px solid #e2e8f0",
                  minHeight: "160px",
                }}
              >
                {student.photo ? (
                  <img
                    src={getImageUrl(
                      student.photo
                    )}
                    alt="Student"
                    style={{
                      width: "105px",
                      height: "125px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border:
                        "2px solid #dbeafe",
                    }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "105px",
                      height: "125px",
                      borderRadius: "8px",
                      backgroundColor:
                        "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <FaUserGraduate
                      size={42}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            EXAM DETAILS
        ===================================================== */}

        <div className="p-4">
          <div className="row g-3 mb-4">
            {/* EXAM TERM */}

            <div className="col-md-3">
              <div
                className="p-3 rounded-3 h-100"
                style={{
                  backgroundColor:
                    "#f8fafc",
                  border:
                    "1px solid #e2e8f0",
                }}
              >
                <small className="text-muted d-block">
                  Exam Term
                </small>

                <strong>
                  {previewExamTerm ||
                    "-"}
                </strong>
              </div>
            </div>

            {/* ACADEMIC YEAR */}

            <div className="col-md-3">
              <div
                className="p-3 rounded-3 h-100"
                style={{
                  backgroundColor:
                    "#f8fafc",
                  border:
                    "1px solid #e2e8f0",
                }}
              >
                <small className="text-muted d-block">
                  Academic Year
                </small>

                <strong>
                  {previewAcademicYear ||
                    "-"}
                </strong>
              </div>
            </div>

            {/* SITTING */}

            <div className="col-md-3">
              <div
                className="p-3 rounded-3 h-100"
                style={{
                  backgroundColor:
                    "#f8fafc",
                  border:
                    "1px solid #e2e8f0",
                }}
              >
                <small className="text-muted d-block">
                  Sitting
                </small>

                <strong>
                  {previewSitting ||
                    "-"}
                </strong>
              </div>
            </div>

            {/* ROOM */}

            <div className="col-md-3">
              <div
                className="p-3 rounded-3 h-100"
                style={{
                  backgroundColor:
                    "#eff6ff",
                  border:
                    "1px solid #bfdbfe",
                }}
              >
                <small className="text-muted d-block">
                  Room No.
                </small>

                <strong>
                  {previewRoom || "-"}
                </strong>
              </div>
            </div>
          </div>

          {/* ===================================================
              EXAMINATION SCHEDULE
          =================================================== */}

          <div className="mt-4">
            <h6
              className="fw-bold mb-3"
              style={{
                color: "#1e3a8a",
              }}
            >
              Examination Schedule
            </h6>

            <div
              className="row g-0 rounded-3 overflow-hidden"
              style={{
                border:
                  "1px solid #dbeafe",
              }}
            >
              {/* TERM */}

              <div className="col-md-4">
                <div
                  className="p-3"
                  style={{
                    backgroundColor:
                      "#eff6ff",
                  }}
                >
                  <small className="text-muted d-block">
                    Exam Term
                  </small>

                  <strong>
                    {previewExamTerm ||
                      "-"}
                  </strong>
                </div>
              </div>

              {/* START */}

              <div className="col-md-4">
                <div
                  className="p-3"
                  style={{
                    backgroundColor:
                      "#f8fafc",
                  }}
                >
                  <small className="text-muted d-block">
                    Start Time
                  </small>

                  <strong>
                    {previewStartTime ||
                      "-"}
                  </strong>
                </div>
              </div>

              {/* END */}

              <div className="col-md-4">
                <div
                  className="p-3"
                  style={{
                    backgroundColor:
                      "#f8fafc",
                  }}
                >
                  <small className="text-muted d-block">
                    End Time
                  </small>

                  <strong>
                    {previewEndTime ||
                      "-"}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              INSTRUCTIONS
          =================================================== */}

          <div
            className="mt-4 p-3 rounded-3"
            style={{
              backgroundColor:
                "#fffbeb",
              border:
                "1px solid #fde68a",
            }}
          >
            <h6 className="fw-bold mb-2">
              Instructions
            </h6>

            <ul className="mb-0 small text-muted ps-3">
              <li>
                Carry the admit card to
                the examination hall.
              </li>

              <li>
                Reach the examination room
                before the reporting time.
              </li>

              <li>
                Follow all examination rules
                and instructions.
              </li>
            </ul>
          </div>

          {/* ===================================================
              SIGNATURE
          =================================================== */}

          <div className="row mt-5 pt-3">
            <div className="col-6 text-center">
              <div
                style={{
                  borderTop:
                    "1px solid #94a3b8",
                  width: "150px",
                  margin: "0 auto",
                }}
              ></div>

              <small className="text-muted">
                Class Teacher
              </small>
            </div>

            <div className="col-6 text-center">
              <div
                style={{
                  borderTop:
                    "1px solid #94a3b8",
                  width: "150px",
                  margin: "0 auto",
                }}
              ></div>

              <small className="text-muted">
                Principal
              </small>
            </div>
          </div>
        </div>

        {/* =====================================================
            CARD ACTIONS
        ===================================================== */}

        <div
          className="p-3 d-flex justify-content-end gap-2"
          style={{
            borderTop:
              "1px solid #e2e8f0",
          }}
        >
          <button
            type="button"
            className="btn btn-outline-primary rounded-2"
            onClick={() =>
              handleEdit(student)
            }
          >
            <FaEdit className="me-2" />
            Edit
          </button>

          <button
            type="button"
            className="btn btn-danger rounded-2"
            onClick={() =>
              handleDownloadPdf(student)
            }
          >
            <FaDownload className="me-2" />
            Download PDF
          </button>
        </div>
      </div>
    );
  };

  // =========================================================
  // RETURN
  // =========================================================

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
            border:
              "1px solid #dbeafe",
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
                  <FaUserGraduate
                    size={26}
                  />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Admit Card
                  </h5>

                  <div className="text-muted small">
                    Assessment
                    &nbsp;/&nbsp;
                    Admit Card
                  </div>
                </div>
              </div>

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
                <MdOutlineSchool className="me-1" />
                Assessment
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
              Assessment &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Admit Card
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH + EXAM SETTINGS
      ===================================================== */}

      <div className="mx-2 mt-2 mb-3">
        <div className="card rounded-4 border-0 shadow overflow-hidden">
          <div className="card-header bg-white p-3 border-bottom">
            <strong className="d-flex align-items-center">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
                style={{
                  backgroundColor:
                    "#e8f6fa",
                  width: "36px",
                  height: "36px",
                  color: "#2563eb",
                }}
              >
                <FaSearch size={18} />
              </span>

              Search Students
            </strong>
          </div>

          <div className="card-body p-3">
            <div className="row g-3 align-items-end">
              {/* ACADEMIC YEAR */}

              <div className="col-md-3">
                <label
                  htmlFor="academicYear"
                  className="form-label mb-2"
                >
                  <strong>
                    Academic Year
                  </strong>{" "}
                  <span className="text-danger">
                    *
                  </span>
                </label>

                <select
                  name="academicYear"
                  id="academicYear"
                  className="form-select"
                  value={
                    filters.academicYear
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="">
                    Select Session
                  </option>

                  {sessions.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* STANDARD */}

              <div className="col-md-3">
                <label
                  htmlFor="studentClass"
                  className="form-label mb-2"
                >
                  <strong>
                    Standard
                  </strong>{" "}
                  <span className="text-danger">
                    *
                  </span>
                </label>

                <select
                  name="studentClass"
                  id="studentClass"
                  className="form-select"
                  value={
                    filters.studentClass
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="">
                    Select Standard
                  </option>

                  {standards.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* SECTION */}

              <div className="col-md-3">
                <label
                  htmlFor="section"
                  className="form-label mb-2"
                >
                  <strong>
                    Section
                  </strong>{" "}
                  <span className="text-danger">
                    *
                  </span>
                </label>

                <select
                  name="section"
                  id="section"
                  className="form-select"
                  value={
                    filters.section
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="">
                    Select Section
                  </option>

                  {sections.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* SEARCH */}

              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-primary rounded-2 w-100"
                  onClick={
                    handleSearch
                  }
                  disabled={loading}
                  style={{
                    height: "38px",
                    boxShadow:
                      "0 5px 12px rgba(37,99,235,.18)",
                  }}
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
                    <>
                      <FaSearch
                        className="me-2"
                        size={14}
                      />

                      Search
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* =================================================
                EXAM SETTINGS
            ================================================= */}

            <div
              className="mt-4 pt-3"
              style={{
                borderTop:
                  "1px solid #edf2f7",
              }}
            >
              <div className="row g-3 align-items-end">
                {/* EXAM TERM */}

                <div className="col-md-3">
                  <label
                    htmlFor="examTerm"
                    className="form-label mb-2"
                  >
                    <strong>
                      Exam Term
                    </strong>{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <select
                    id="examTerm"
                    className="form-select"
                    value={
                      selectedExamTerm
                    }
                    onChange={(e) =>
                      setSelectedExamTerm(
                        e.target.value
                      )
                    }
                    disabled={
                      students.length ===
                      0
                    }
                  >
                    <option value="">
                      {students.length ===
                      0
                        ? "Search Students First"
                        : examTerms.length ===
                          0
                        ? "No Exam Term Available"
                        : "Select Exam Term"}
                    </option>

                    {examTerms.map(
                      (item) => (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.examTerm}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* SITTING */}

                <div className="col-md-2">
                  <label
                    htmlFor="sitting"
                    className="form-label mb-2"
                  >
                    <strong>
                      Select Sitting
                    </strong>{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <select
                    id="sitting"
                    className="form-select"
                    value={
                      selectedSitting
                    }
                    onChange={(e) =>
                      setSelectedSitting(
                        e.target.value
                      )
                    }
                    disabled={
                      students.length ===
                      0
                    }
                  >
                    <option value="">
                      Select Sitting
                    </option>

                    <option value="1st Sitting">
                      1st Sitting
                    </option>

                    <option value="2nd Sitting">
                      2nd Sitting
                    </option>
                  </select>
                </div>

                {/* START TIME */}

                <div className="col-md-2">
                  <label
                    htmlFor="startTime"
                    className="form-label mb-2"
                  >
                    <strong>
                      Start Time
                    </strong>{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <FaClock
                        size={14}
                        className="text-primary"
                      />
                    </span>

                    <input
                      type="time"
                      id="startTime"
                      className="form-control"
                      value={startTime}
                      onChange={(e) =>
                        setStartTime(
                          e.target.value
                        )
                      }
                      disabled={
                        students.length ===
                        0
                      }
                    />
                  </div>
                </div>

                {/* END TIME */}

                <div className="col-md-2">
                  <label
                    htmlFor="endTime"
                    className="form-label mb-2"
                  >
                    <strong>
                      End Time
                    </strong>{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <FaClock
                        size={14}
                        className="text-primary"
                      />
                    </span>

                    <input
                      type="time"
                      id="endTime"
                      className="form-control"
                      value={endTime}
                      onChange={(e) =>
                        setEndTime(
                          e.target.value
                        )
                      }
                      disabled={
                        students.length ===
                        0
                      }
                    />
                  </div>
                </div>

                {/* RESET */}

                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-danger rounded-2 w-100"
                    onClick={
                      handleReset
                    }
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          STUDENTS LIST
      ===================================================== */}

      <div className="mx-2 mt-2 mb-3">
        <div className="card rounded-4 border-0 shadow overflow-hidden">
          {/* HEADER */}

          <div className="card-header bg-white p-3 border-bottom">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="d-flex align-items-center">
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-2 me-2 flex-shrink-0"
                  style={{
                    backgroundColor:
                      "#e8f6fa",
                    width: "36px",
                    height: "36px",
                    color: "#2563eb",
                  }}
                >
                  <FaRegListAlt
                    size={18}
                  />
                </span>

                <div>
                  <h6 className="mb-0 fw-semibold text-dark">
                    Students List
                  </h6>

                  <div className="text-muted small mt-1">
                    Select students and
                    manage admit cards
                  </div>
                </div>
              </div>

              {students.length > 0 && (
                <div className="d-flex align-items-center gap-2">
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
                    {
                      selectedStudents.length
                    }{" "}
                    /{" "}
                    {students.length}{" "}
                    Selected
                  </span>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor:
                        "#f0fdf4",
                      color: "#15803d",
                      border:
                        "1px solid #bbf7d0",
                    }}
                  >
                    {students.length}{" "}
                    Students
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* BODY */}

          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border text-primary"
                  role="status"
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                  }}
                ></div>

                <p className="text-muted small mt-3 mb-0">
                  Processing...
                </p>
              </div>
            ) : students.length ===
              0 ? (
              <div className="text-center py-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{
                    width: "65px",
                    height: "65px",
                    backgroundColor:
                      "#eff6ff",
                  }}
                >
                  <FaUserGraduate
                    size={30}
                    className="text-primary"
                  />
                </div>

                <h6 className="fw-semibold text-dark mb-1">
                  No Students Found
                </h6>

                <p className="text-muted small mb-0">
                  Please search students by
                  selecting Academic Year,
                  Standard and Section.
                </p>
              </div>
            ) : (
              <>
                {/* SELECT ALL BAR */}

                <div
                  className="px-3 py-3 d-flex align-items-center justify-content-between flex-wrap gap-2"
                  style={{
                    backgroundColor:
                      "#f8fafc",
                    borderBottom:
                      "1px solid #e2e8f0",
                  }}
                >
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="selectAllStudents"
                      checked={
                        isAllSelected
                      }
                      onChange={
                        handleSelectAll
                      }
                      style={{
                        cursor:
                          "pointer",
                      }}
                    />

                    <label
                      className="form-check-label fw-semibold"
                      htmlFor="selectAllStudents"
                      style={{
                        cursor:
                          "pointer",
                      }}
                    >
                      <FaCheckSquare className="text-primary me-1" />
                      Select All Students
                    </label>
                  </div>

                  {selectedStudents.length >
                    0 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary rounded-2"
                      onClick={
                        handleBulkDownload
                      }
                    >
                      <FaFilePdf className="me-2" />
                      Download Selected
                      PDFs
                    </button>
                  )}
                </div>

                {/* TABLE */}

                <div
                  className="table-responsive"
                  style={{
                    maxHeight:
                      "570px",
                    overflowY:
                      "auto",
                  }}
                >
                  <table
                    className="table table-hover align-middle mb-0"
                    style={{
                      minWidth:
                        "1250px",
                    }}
                  >
                    <thead
                      style={{
                        position:
                          "sticky",
                        top: 0,
                        zIndex: 5,
                        backgroundColor:
                          "#f8fafc",
                      }}
                    >
                      <tr>
                        <th
                          className="px-3 py-3"
                          style={{
                            width: "50px",
                          }}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={
                              isAllSelected
                            }
                            onChange={
                              handleSelectAll
                            }
                            style={{
                              cursor:
                                "pointer",
                            }}
                          />
                        </th>

                        <th className="px-3 py-3 text-muted small fw-semibold">
                          #
                        </th>

                        <th
                          className="px-3 py-3 text-muted small fw-semibold"
                          style={{
                            minWidth:
                              "240px",
                          }}
                        >
                          Student
                        </th>

                        <th className="px-3 py-3 text-muted small fw-semibold">
                          Admission No.
                        </th>

                        <th className="px-3 py-3 text-muted small fw-semibold">
                          Class
                        </th>

                        <th className="px-3 py-3 text-muted small fw-semibold">
                          Section
                        </th>

                        <th className="px-3 py-3 text-muted small fw-semibold">
                          Academic Year
                        </th>

                        <th
                          className="px-3 py-3 text-muted small fw-semibold"
                          style={{
                            minWidth:
                              "130px",
                          }}
                        >
                          Room No.
                        </th>

                        <th className="px-3 py-3 text-muted small fw-semibold">
                          Exam Term
                        </th>

                        <th className="px-3 py-3 text-muted small fw-semibold">
                          Sitting
                        </th>

                        <th className="px-3 py-3 text-muted small fw-semibold">
                          Time
                        </th>

                        <th
                          className="px-3 py-3 text-muted small fw-semibold text-center"
                          style={{
                            minWidth:
                              "130px",
                          }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {students.map(
                        (
                          student,
                          index
                        ) => {
                          const studentKey =
                            getStudentKey(
                              student,
                              index
                            );

                          const isSelected =
                            selectedStudents.includes(
                              studentKey
                            );

                          return (
                            <tr
                              key={
                                studentKey
                              }
                              style={{
                                backgroundColor:
                                  isSelected
                                    ? "#f8fbff"
                                    : "#fff",
                              }}
                            >
                              {/* CHECKBOX */}

                              <td className="px-3 py-3">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    isSelected
                                  }
                                  onChange={() =>
                                    handleStudentSelect(
                                      student,
                                      index
                                    )
                                  }
                                  style={{
                                    cursor:
                                      "pointer",
                                  }}
                                />
                              </td>

                              {/* NUMBER */}

                              <td className="px-3 py-3">
                                <span className="fw-semibold text-muted">
                                  {index +
                                    1}
                                </span>
                              </td>

                              {/* STUDENT */}

                              <td className="px-3 py-3">
                                <div className="d-flex align-items-center">
                                  {student.photo ? (
                                    <img
                                      src={getImageUrl(
                                        student.photo
                                      )}
                                      alt={
                                        student.firstName ||
                                        "Student"
                                      }
                                      style={{
                                        width:
                                          "42px",
                                        height:
                                          "42px",
                                        objectFit:
                                          "cover",
                                        borderRadius:
                                          "50%",
                                        marginRight:
                                          "11px",
                                        border:
                                          "2px solid #dbeafe",
                                      }}
                                    />
                                  ) : (
                                    <div
                                      className="d-flex align-items-center justify-content-center flex-shrink-0"
                                      style={{
                                        width:
                                          "42px",
                                        height:
                                          "42px",
                                        borderRadius:
                                          "50%",
                                        marginRight:
                                          "11px",
                                        backgroundColor:
                                          "#eff6ff",
                                        color:
                                          "#2563eb",
                                        border:
                                          "2px solid #dbeafe",
                                      }}
                                    >
                                      <FaUserGraduate
                                        size={
                                          18
                                        }
                                      />
                                    </div>
                                  )}

                                  <div>
                                    <div className="fw-semibold text-dark">
                                      {student.firstName ||
                                        "-"}{" "}
                                      {student.lastName ||
                                        ""}
                                    </div>

                                    {student.email && (
                                      <small className="text-muted">
                                        {
                                          student.email
                                        }
                                      </small>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* ADMISSION */}

                              <td className="px-3 py-3">
                                <span
                                  className="fw-semibold"
                                  style={{
                                    color:
                                      "#2563eb",
                                  }}
                                >
                                  {student.admissionNumber ||
                                    "-"}
                                </span>
                              </td>

                              {/* CLASS */}

                              <td className="px-3 py-3">
                                <span className="fw-medium">
                                  {student.studentClass ||
                                    "-"}
                                </span>
                              </td>

                              {/* SECTION */}

                              <td className="px-3 py-3">
                                <span
                                  className="badge rounded-pill"
                                  style={{
                                    backgroundColor:
                                      "#f1f5f9",
                                    color:
                                      "#475569",
                                    border:
                                      "1px solid #e2e8f0",
                                  }}
                                >
                                  {student.section ||
                                    "-"}
                                </span>
                              </td>

                              {/* ACADEMIC YEAR */}

                              <td className="px-3 py-3">
                                {student.academicYear ||
                                  "-"}
                              </td>

                              {/* ROOM */}

                              <td className="px-3 py-3">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Room No."
                                  value={
                                    roomNumbers[
                                      studentKey
                                    ] || ""
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    handleRoomChange(
                                      studentKey,
                                      e
                                        .target
                                        .value
                                    )
                                  }
                                  style={{
                                    minWidth:
                                      "110px",
                                    borderRadius:
                                      "8px",
                                  }}
                                />
                              </td>

                              {/* EXAM TERM */}

                              <td className="px-3 py-3">
                                <span
                                  className="badge rounded-pill"
                                  style={{
                                    backgroundColor:
                                      "#eff6ff",
                                    color:
                                      "#2563eb",
                                    border:
                                      "1px solid #bfdbfe",
                                    whiteSpace:
                                      "nowrap",
                                  }}
                                >
                                  {getSelectedExamTermName()}
                                </span>
                              </td>

                              {/* SITTING */}

                              <td className="px-3 py-3">
                                <span
                                  className="badge rounded-pill"
                                  style={{
                                    backgroundColor:
                                      "#f0fdf4",
                                    color:
                                      "#15803d",
                                    border:
                                      "1px solid #bbf7d0",
                                    whiteSpace:
                                      "nowrap",
                                  }}
                                >
                                  {selectedSitting ||
                                    "-"}
                                </span>
                              </td>

                              {/* TIME */}

                              <td className="px-3 py-3">
                                <div
                                  className="small fw-medium"
                                  style={{
                                    whiteSpace:
                                      "nowrap",
                                  }}
                                >
                                  {startTime &&
                                  endTime
                                    ? `${startTime} - ${endTime}`
                                    : "-"}
                                </div>
                              </td>

                              {/* ACTION */}

                              <td className="px-3 py-3">
                                <div className="d-flex justify-content-center gap-1">
                                  {/* VIEW */}

                                  <button
                                    type="button"
                                    className="btn btn-sm"
                                    title="View Admit Card"
                                    onClick={() =>
                                      handleViewAdmitCard(
                                        student
                                      )
                                    }
                                    style={{
                                      width:
                                        "34px",
                                      height:
                                        "34px",
                                      padding: 0,
                                      borderRadius:
                                        "8px",
                                      backgroundColor:
                                        "#eff6ff",
                                      color:
                                        "#2563eb",
                                      border:
                                        "1px solid #bfdbfe",
                                    }}
                                  >
                                    <FaEye
                                      size={
                                        14
                                      }
                                    />
                                  </button>

                                  {/* EDIT */}

                                  <button
                                    type="button"
                                    className="btn btn-sm"
                                    title="Edit Room"
                                    onClick={() =>
                                      handleEdit(
                                        student
                                      )
                                    }
                                    style={{
                                      width:
                                        "34px",
                                      height:
                                        "34px",
                                      padding: 0,
                                      borderRadius:
                                        "8px",
                                      backgroundColor:
                                        "#fff7ed",
                                      color:
                                        "#ea580c",
                                      border:
                                        "1px solid #fed7aa",
                                    }}
                                  >
                                    <FaEdit
                                      size={
                                        14
                                      }
                                    />
                                  </button>

                                  {/* PDF */}

                                  <button
                                    type="button"
                                    className="btn btn-sm"
                                    title="Download PDF"
                                    onClick={() =>
                                      handleDownloadPdf(
                                        student
                                      )
                                    }
                                    style={{
                                      width:
                                        "34px",
                                      height:
                                        "34px",
                                      padding: 0,
                                      borderRadius:
                                        "8px",
                                      backgroundColor:
                                        "#fef2f2",
                                      color:
                                        "#dc2626",
                                      border:
                                        "1px solid #fecaca",
                                    }}
                                  >
                                    <FaDownload
                                      size={
                                        14
                                      }
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>

                {/* =================================================
                    GENERATE BUTTON
                ================================================= */}

                <div
                  className="p-3 d-flex align-items-center justify-content-between flex-wrap gap-3"
                  style={{
                    backgroundColor:
                      "#f8fafc",
                    borderTop:
                      "1px solid #e2e8f0",
                  }}
                >
                  <div className="small text-muted">
                    {selectedStudents.length >
                    0 ? (
                      <>
                        <strong className="text-dark">
                          {
                            selectedStudents.length
                          }
                        </strong>{" "}
                        student(s) selected
                        for admit card
                        generation.
                      </>
                    ) : (
                      "Select students to generate admit cards."
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary rounded-3 px-4 py-2"
                    onClick={
                      handleGenerateAdmitCards
                    }
                    disabled={
                      selectedStudents.length ===
                        0 ||
                      loading
                    }
                    style={{
                      boxShadow:
                        "0 6px 16px rgba(37,99,235,.2)",
                    }}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Generating...
                      </>
                    ) : (
                      <>
                        <FaFilePdf className="me-2" />
                        Generate Admit Cards
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          SINGLE STUDENT PREVIEW
      ===================================================== */}

      {previewStudent &&
        generatedStudents.length ===
          0 && (
          <div
            id="admit-card-preview"
            className="mx-2 mt-4 mb-4"
          >
            <div className="card rounded-4 border-0 shadow overflow-hidden">
              {/* PREVIEW HEADER */}

              <div className="card-header bg-white p-3 border-bottom">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex align-items-center">
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
                      style={{
                        backgroundColor:
                          "#e8f6fa",
                        width: "36px",
                        height: "36px",
                        color:
                          "#2563eb",
                      }}
                    >
                      <FaEye size={18} />
                    </span>

                    <div>
                      <h6 className="mb-0 fw-semibold text-dark">
                        Admit Card
                        Preview
                      </h6>

                      <div className="text-muted small mt-1">
                        Preview for{" "}
                        <strong>
                          {
                            previewStudent.firstName
                          }{" "}
                          {
                            previewStudent.lastName ||
                            ""
                          }
                        </strong>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm rounded-2"
                    onClick={() => {
                      setPreviewStudent(
                        null
                      );
                      setGeneratedAdmitCard(
                        null
                      );
                    }}
                  >
                    Close Preview
                  </button>
                </div>
              </div>

              <div className="card-body p-4">
                <AdmitCardPreview
                  student={
                    previewStudent
                  }
                />
              </div>
            </div>
          </div>
        )}

      {/* =====================================================
          GENERATED MULTIPLE ADMIT CARDS PREVIEW
      ===================================================== */}

      {generatedStudents.length >
        0 && (
        <div
          id="admit-card-preview"
          className="mx-2 mt-4 mb-4"
        >
          <div className="card rounded-4 border-0 shadow overflow-hidden">
            {/* GENERATED HEADER */}

            <div className="card-header bg-white p-3 border-bottom">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div className="d-flex align-items-center">
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
                    style={{
                      backgroundColor:
                        "#e8f6fa",
                      width: "36px",
                      height: "36px",
                      color:
                        "#2563eb",
                    }}
                  >
                    <FaFilePdf
                      size={18}
                    />
                  </span>

                  <div>
                    <h6 className="mb-0 fw-semibold text-dark">
                      Admit Card
                      Preview
                    </h6>

                    <div className="text-muted small mt-1">
                      Preview of{" "}
                      <strong>
                        {
                          generatedStudents.length
                        }
                      </strong>{" "}
                      selected student
                      {generatedStudents.length >
                      1
                        ? "s"
                        : ""}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor:
                        "#eff6ff",
                      color:
                        "#2563eb",
                      border:
                        "1px solid #bfdbfe",
                    }}
                  >
                    {
                      generatedStudents.length
                    }{" "}
                    Cards
                  </span>

                  {generatedAdmitCard?.id && (
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm rounded-2"
                      onClick={() =>
                        handleDeleteAdmitCard(
                          generatedAdmitCard.id
                        )
                      }
                    >
                      Delete
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm rounded-2"
                    onClick={() => {
                      setGeneratedStudents(
                        []
                      );
                      setGeneratedAdmitCard(
                        null
                      );
                    }}
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>

            {/* GENERATED CARDS */}

            <div className="card-body p-4">
              {generatedStudents.map(
                (
                  student,
                  index
                ) => (
                  <div
                    key={getStudentKey(
                      student,
                      index
                    )}
                  >
                    <AdmitCardPreview
                      student={
                        student
                      }
                    />

                    {/* SEPARATOR */}

                    {index <
                      generatedStudents.length -
                        1 && (
                      <div
                        style={{
                          borderBottom:
                            "2px dashed #dbeafe",
                          margin:
                            "10px 0 30px",
                        }}
                      ></div>
                    )}
                  </div>
                )
              )}
            </div>

            {/* GENERATED FOOTER */}

            <div
              className="p-3 d-flex align-items-center justify-content-between flex-wrap gap-2"
              style={{
                backgroundColor:
                  "#f8fafc",
                borderTop:
                  "1px solid #e2e8f0",
              }}
            >
              <div className="small text-muted">
                <strong className="text-dark">
                  {
                    generatedStudents.length
                  }
                </strong>{" "}
                admit card(s) generated
                in preview.
              </div>

              <button
                type="button"
                className="btn btn-danger rounded-2"
                onClick={
                  handleBulkDownload
                }
              >
                <FaFilePdf className="me-2" />
                Download All PDFs
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdmitCard;