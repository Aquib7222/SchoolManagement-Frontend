// import React, { useState } from "react";
// import { LuNotebookText } from "react-icons/lu";
// import useMasters from "../../hooks/useMasters";
// import { CiSearch } from "react-icons/ci";
// import { toast } from "react-toastify";
// import axiosInstance from "../../api/axiosInstance";

// const RollNoGeneration = () => {
//   const { sessions, standards, sections } = useMasters();
//   const token = localStorage.getItem("token");
//   const schoolId = JSON.parse(localStorage.getItem("schoolId"));
//   const [students, setStudents] = useState([]);
//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [loading,setloading] = useState(false);

//   const handleSearch = async () => {
//      if(!selectedSession){
//             toast.error("Please select session");
//             return;
//         }
//         if(!selectedStandard){
//             toast.error("Please select standard");
//             return;
//         }
//         if(!selectedSection){
//             toast.error("Please select section");
//             return;
//         }
//     try {
       
//         setloading(true);
//         const res = await axiosInstance.get("/api/students/search",{
//             params:{
//                 academicYear:selectedSession,
//                 studentClass:selectedStandard,
//                 section:selectedSection
//             }

//         });
//         setStudents(res.data);


//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log("Students",students);
//   return (
//     <>
//       <div
//         className="row shadow"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           minHeight: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6 className="mb-1">
//           <LuNotebookText className="me-2" />
//           Roll No Generation
//         </h6>

//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb mb-0">
//             <li className="breadcrumb-item">
//               <a
//                 href="/"
//                 style={{
//                   textDecoration: "none",
//                   color: "black",
//                 }}
//               >
//                 <small>Home</small>
//               </a>
//             </li>

//             <li className="breadcrumb-item">
//               <small>Setup</small>
//             </li>

//             <li className="breadcrumb-item active">
//               <small>Roll No Generation</small>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       <div className="ms-2 me-2 rounded-4 shadow bg-white p-3 mt-4">
//         <div className="row g-3">
//           <div className="col-12 col-sm-3 col-lg-3">
//             <label className="form-label">
//               Session <span className="text-danger">*</span>
//             </label>
//             <select
//               name=""
//               id=""
//               className="form-select"
//               value={selectedSession}
//               onChange={(e) => setSelectedSession(e.target.value)}
//             >
//               <option value="">Select Session</option>
//               {sessions.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-12 col-sm-3 col-lg-3">
//             <label className="form-label">
//               Standard <span className="text-danger">*</span>
//             </label>
//             <select
//               name=""
//               id=""
//               className="form-select"
//               value={selectedStandard}
//               onChange={(e) => setSelectedStandard(e.target.value)}
//             >
//               <option value="">Select Standard</option>
//               {standards.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-12 col-sm-3 col-lg-2">
//             <label className="form-label">
//               Section <span className="text-danger">*</span>
//             </label>
//             <select
//               name=""
//               id=""
//               className="form-select"
//               value={selectedSection}
//               onChange={(e) => setSelectedSection(e.target.value)}
//             >
//               <option value="">Select Section</option>
//               {sections.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-12 col-sm-3 col-lg-2">
//             <button
//               className="btn btn-outline-dark w-100 "
//               style={{ marginTop: "32px" }}
//             >
//               Reset
//             </button>
//           </div>
//           <div className="col-12 col-sm-3 col-lg-2">
//             <button
//               className="btn bg-primary w-100 "
//               style={{ marginTop: "32px" }}
//               onClick={handleSearch}
//             >
//               <CiSearch size={20} /> Search
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RollNoGeneration;


// import React, { useState } from "react";
// import { LuNotebookText } from "react-icons/lu";
// import { CiSearch } from "react-icons/ci";
// import { FaSave, FaRandom } from "react-icons/fa";
// import { RiResetLeftLine } from "react-icons/ri";
// import { toast } from "react-toastify";

// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";

// const RollNoGeneration = () => {
//   const { sessions, standards, sections } = useMasters();

//   const schoolId = JSON.parse(localStorage.getItem("schoolId"));

//   const [students, setStudents] = useState([]);

//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   // =====================================================
//   // SEARCH STUDENTS
//   // =====================================================

//   const handleSearch = async () => {
//     if (!selectedSession) {
//       toast.error("Please select session");
//       return;
//     }

//     if (!selectedStandard) {
//       toast.error("Please select standard");
//       return;
//     }

//     if (!selectedSection) {
//       toast.error("Please select section");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axiosInstance.get(
//         "/api/students/search",
//         {
//           params: {
//             schoolId: schoolId,
//             academicYear: selectedSession,
//             studentClass: selectedStandard,
//             section: selectedSection,
//           },
//         }
//       );

//       console.log("Students:", response.data);

//       /*
//        * Admission number ke according sorting
//        */
//       const sortedStudents = [...(response.data || [])].sort(
//         (a, b) =>
//           String(a.admissionNumber || "").localeCompare(
//             String(b.admissionNumber || ""),
//             undefined,
//             {
//               numeric: true,
//               sensitivity: "base",
//             }
//           )
//       );

//       setStudents(sortedStudents);

//       if (sortedStudents.length === 0) {
//         toast.info("No students found");
//       } else {
//         toast.success(
//           `${sortedStudents.length} students loaded`
//         );
//       }
//     } catch (error) {
//       console.log("Load Students Error:", error);

//       toast.error(
//         error.response?.data ||
//           "Failed to load students"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // GENERATE ROLL NUMBERS
//   // =====================================================

//   const handleGenerateRollNumbers = () => {
//     if (students.length === 0) {
//       toast.error("Please load students first");
//       return;
//     }

//     const generatedStudents = students.map(
//       (student, index) => ({
//         ...student,
//         rollNumber: index + 1,
//       })
//     );

//     setStudents(generatedStudents);

//     toast.success(
//       `Roll numbers generated for ${students.length} students`
//     );
//   };

//   // =====================================================
//   // SAVE ROLL NUMBERS
//   // =====================================================

//   const handleSaveRollNumbers = async () => {
//     if (students.length === 0) {
//       toast.error("Please load students first");
//       return;
//     }

//     // Check all students have roll number
//     const missingRollNumber = students.some(
//       (student) =>
//         student.rollNumber === null ||
//         student.rollNumber === undefined ||
//         student.rollNumber === ""
//     );

//     if (missingRollNumber) {
//       toast.error(
//         "Please generate roll numbers before saving"
//       );
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         schoolId: schoolId,
//         academicYear: selectedSession,
//         studentClass: selectedStandard,
//         section: selectedSection,

//         students: students.map((student) => ({
//           admissionNumber: student.admissionNumber,
//           rollNumber: Number(student.rollNumber),
//         })),
//       };

//       console.log(
//         "Save Roll Number Payload:",
//         payload
//       );

//       const response = await axiosInstance.put(
//         "/api/students/roll-numbers",
//         payload
//       );

//       console.log(
//         "Roll Number Save Response:",
//         response.data
//       );

//       toast.success(
//         "Roll numbers saved successfully"
//       );

//       /*
//        * Dobara students load karne ki zarurat nahi.
//        * Current list already updated hai.
//        */
//     } catch (error) {
//       console.log(
//         "Save Roll Number Error:",
//         error
//       );

//       console.log(
//         "Status:",
//         error.response?.status
//       );

//       console.log(
//         "Response:",
//         error.response?.data
//       );

//       toast.error(
//         error.response?.data ||
//           "Failed to save roll numbers"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // =====================================================
//   // RESET
//   // =====================================================

//   const handleReset = () => {
//     setSelectedSession("");
//     setSelectedStandard("");
//     setSelectedSection("");

//     setStudents([]);
//   };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <>
//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div
//         className="row shadow"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           minHeight: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6 className="mb-1">
//           <LuNotebookText className="me-2" />
//           Roll No Generation
//         </h6>

//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb mb-0">
//             <li className="breadcrumb-item">
//               <a
//                 href="/"
//                 style={{
//                   textDecoration: "none",
//                   color: "black",
//                 }}
//               >
//                 <small>Home</small>
//               </a>
//             </li>

//             <li className="breadcrumb-item">
//               <small>Setup</small>
//             </li>

//             <li className="breadcrumb-item active">
//               <small>Roll No Generation</small>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* =================================================
//           FILTER
//       ================================================= */}

//       <div className="ms-2 me-2 rounded-4 shadow bg-white p-3 mt-4">
//         <div className="row g-3">

//           {/* SESSION */}

//           <div className="col-12 col-sm-6 col-lg-3">
//             <label className="form-label">
//               Session{" "}
//               <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               value={selectedSession}
//               onChange={(e) =>
//                 setSelectedSession(e.target.value)
//               }
//             >
//               <option value="">
//                 Select Session
//               </option>

//               {sessions?.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* STANDARD */}

//           <div className="col-12 col-sm-6 col-lg-3">
//             <label className="form-label">
//               Standard{" "}
//               <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               value={selectedStandard}
//               onChange={(e) =>
//                 setSelectedStandard(e.target.value)
//               }
//             >
//               <option value="">
//                 Select Standard
//               </option>

//               {standards?.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* SECTION */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label">
//               Section{" "}
//               <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               value={selectedSection}
//               onChange={(e) =>
//                 setSelectedSection(e.target.value)
//               }
//             >
//               <option value="">
//                 Select Section
//               </option>

//               {sections?.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* RESET */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <button
//               type="button"
//               className="btn btn-outline-dark w-100"
//               style={{ marginTop: "32px" }}
//               onClick={handleReset}
//             >
//               <RiResetLeftLine className="me-1" />
//               Reset
//             </button>
//           </div>

//           {/* SEARCH */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <button
//               type="button"
//               className="btn bg-primary w-100"
//               style={{ marginTop: "32px" }}
//               onClick={handleSearch}
//               disabled={loading}
//             >
//               <CiSearch size={20} />

//               {loading
//                 ? " Loading..."
//                 : " Search"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* =================================================
//           STUDENT LIST
//       ================================================= */}

//       <div className="ms-2 me-2 mt-3 bg-white rounded-4 shadow p-3">

//         {/* HEADER */}

//         <div className="d-flex justify-content-between align-items-center mb-3">

//           <div>
//             <h6 className="mb-1">
//               <LuNotebookText className="me-2" />
//               Student List
//             </h6>

//             {students.length > 0 && (
//               <small className="text-muted">
//                 {selectedSession} |{" "}
//                 {selectedStandard} | Section{" "}
//                 {selectedSection} |{" "}
//                 <strong>
//                   {students.length} Students
//                 </strong>
//               </small>
//             )}
//           </div>

//           {/* ACTION BUTTONS */}

//           {students.length > 0 && (
//             <div className="d-flex gap-2">

//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={
//                   handleGenerateRollNumbers
//                 }
//               >
//                 <FaRandom className="me-1" />
//                 Generate Roll Numbers
//               </button>

//               <button
//                 type="button"
//                 className="btn bg-primary"
//                 onClick={
//                   handleSaveRollNumbers
//                 }
//                 disabled={saving}
//               >
//                 <FaSave className="me-1" />

//                 {saving
//                   ? " Saving..."
//                   : " Save Roll Numbers"}
//               </button>
//             </div>
//           )}
//         </div>

//         {/* TABLE */}

//         {students.length === 0 ? (
//           <div className="text-center text-muted py-5 border rounded-4">
//             <LuNotebookText
//               size={35}
//               className="mb-2"
//             />

//             <div>
//               Search students to generate roll
//               numbers.
//             </div>
//           </div>
//         ) : (
//           <div className="table-responsive">

//             <table className="table table-bordered table-hover align-middle mb-0">

//               <thead className="table-info">
//                 <tr>
//                   <th style={{ width: "70px" }}>
//                     #
//                   </th>

//                   <th>
//                     Admission Number
//                   </th>

//                   <th>
//                     Student Name
//                   </th>

//                   <th>
//                     Roll Number
//                   </th>

//                   <th>
//                     Status
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {students.map(
//                   (student, index) => (
//                     <tr
//                       key={
//                         student.admissionNumber
//                       }
//                     >
//                       <td>
//                         {index + 1}
//                       </td>

//                       <td>
//                         <strong>
//                           {
//                             student.admissionNumber
//                           }
//                         </strong>
//                       </td>

//                       <td>
//                         {student.firstName} {student.lastName}
//                       </td>

//                       <td>
//                         {student.rollNumber ? (
//                           <span className="badge bg-primary fs-6">
//                             {student.rollNumber}
//                           </span>
//                         ) : (
//                           <span className="text-muted">
//                             Not Generated
//                           </span>
//                         )}
//                       </td>

//                       <td>
//                         {student.rollNumber ? (
//                           <span className="badge bg-primary">
//                             Generated
//                           </span>
//                         ) : (
//                           <span className="badge bg-warning text-dark">
//                             Pending
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   )
//                 )}
//               </tbody>

//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default RollNoGeneration;


import React, { useState } from "react";
import { LuNotebookText } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaSave, FaRandom } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";
import { toast } from "react-toastify";

import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";
import { MdOutlineSchool } from "react-icons/md";
import { FaShuffle } from "react-icons/fa6";

const RollNoGeneration = () => {
  const { sessions, standards, sections } = useMasters();

  const schoolId = localStorage.getItem("schoolId");

  const [students, setStudents] = useState([]);

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // =====================================================
  // SEARCH STUDENTS
  // =====================================================

  const handleSearch = async () => {
    if (!selectedSession) {
      toast.error("Please select session");
      return;
    }

    if (!selectedStandard) {
      toast.error("Please select standard");
      return;
    }

    if (!selectedSection) {
      toast.error("Please select section");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.get("/api/students/search", {
        params: {
          schoolId,
          academicYear: selectedSession,
          studentClass: selectedStandard,
          section: selectedSection,
        },
      });

      const sortedStudents = [...(response.data || [])].sort((a, b) =>
        String(a.admissionNumber || "").localeCompare(
          String(b.admissionNumber || ""),
          undefined,
          {
            numeric: true,
            sensitivity: "base",
          }
        )
      );

      setStudents(sortedStudents);

      if (sortedStudents.length === 0) {
        toast.info("No students found");
      } else {
        toast.success(`${sortedStudents.length} students loaded`);
      }
    } catch (error) {
      console.error("Load Students Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load students"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GENERATE ROLL NUMBERS
  // =====================================================

  const handleGenerateRollNumbers = () => {
    if (students.length === 0) {
      toast.error("Please load students first");
      return;
    }

    const generatedStudents = students.map((student, index) => ({
      ...student,
      rollNumber: index + 1,
    }));

    setStudents(generatedStudents);

    toast.success(
      `Roll numbers generated for ${students.length} students`
    );
  };

  // =====================================================
  // SAVE ROLL NUMBERS
  // =====================================================

  const handleSaveRollNumbers = async () => {
    if (students.length === 0) {
      toast.error("Please load students first");
      return;
    }

    const missingRollNumber = students.some(
      (student) =>
        student.rollNumber === null ||
        student.rollNumber === undefined ||
        student.rollNumber === ""
    );

    if (missingRollNumber) {
      toast.error("Please generate roll numbers before saving");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        schoolId: Number(schoolId),
        academicYear: selectedSession,
        studentClass: selectedStandard,
        section: selectedSection,

        students: students.map((student) => ({
          admissionNumber: student.admissionNumber,
          rollNumber: Number(student.rollNumber),
        })),
      };

      console.log("Save Roll Number Payload:", payload);

      const response = await axiosInstance.put(
        "/api/students/roll-numbers",
        payload
      );

      console.log("Roll Number Save Response:", response.data);

      toast.success("Roll numbers saved successfully");
    } catch (error) {
      console.error("Save Roll Number Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to save roll numbers"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    setSelectedSession("");
    setSelectedStandard("");
    setSelectedSection("");
    setStudents([]);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* =================================================
          HEADER
      ================================================= */}

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
                        <h5 className="mb-1 fw-bold text-dark">Roll No Generation</h5>
      
                        <div className="text-muted small">
                          Setup &nbsp;/ &nbsp; Roll No Generation
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
                      Roll No Generation
                    </span>
                  </small>
                </div>
              </div>
            </div>

      {/* =================================================
          FILTER CARD
      ================================================= */}

      <div className="ms-2 me-2 mt-3 bg-white rounded-4 shadow">
        <div className="card border-0 rounded-4">
          <div className="card-header bg-white border-bottom">
            <h6 className="mb-0">
              <LuNotebookText className="me-2 text-primary" />
              Roll Number Setup
            </h6>
          </div>

          <div className="card-body">
            <div className="row g-3">
              {/* SESSION */}

              <div className="col-12 col-md-4 col-lg-3">
                <label className="form-label">
                  Session <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
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

              <div className="col-12 col-md-4 col-lg-3">
                <label className="form-label">
                  Standard <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selectedStandard}
                  onChange={(e) => setSelectedStandard(e.target.value)}
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

              <div className="col-12 col-md-4 col-lg-2">
                <label className="form-label">
                  Section <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="">Select Section</option>

                  {sections?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* RESET */}

              <div className="col-12 col-md-6 col-lg-2">
                <label className="form-label invisible">
                  Reset
                </label>

                <button
                  type="button"
                  className="btn btn-outline-dark w-100"
                  onClick={handleReset}
                >
                  <RiResetLeftLine className="me-1" />
                  Reset
                </button>
              </div>

              {/* SEARCH */}

              <div className="col-12 col-md-6 col-lg-2">
                <label className="form-label invisible">
                  Search
                </label>

                <button
                  type="button"
                  className="btn bg-primary w-100 text-white"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  <CiSearch size={20} className="me-1" />

                  {loading ? "Loading..." : "Search"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          STUDENT LIST
      ================================================= */}

      <div className="ms-2 me-2 mt-3 bg-white shadow rounded-4">
        <div className="card border-0 rounded-4">
          {/* CARD HEADER */}

          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">
                <LuNotebookText className="me-2 text-primary" />
                Student List
              </h6>

              {students.length > 0 && (
                <small className="text-muted">
                  {selectedSession} | {selectedStandard} | Section{" "}
                  {selectedSection} |{" "}
                  <strong>{students.length} Students</strong>
                </small>
              )}
            </div>

            {/* ACTION BUTTONS */}

            {students.length > 0 && (
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleGenerateRollNumbers}
                >
                  <FaRandom className="me-1" />
                  Generate Roll Numbers
                </button>

                <button
                  type="button"
                  className="btn bg-primary"
                  onClick={handleSaveRollNumbers}
                  disabled={saving}
                >
                  <FaSave className="me-1" />

                  {saving ? "Saving..." : "Save Roll Numbers"}
                </button>
              </div>
            )}
          </div>

          {/* CARD BODY */}

          <div className="card-body">
            {students.length === 0 ? (
              <div
                className="text-center text-muted py-5 border rounded-4"
                style={{
                  backgroundColor: "#f8f9fa",
                }}
              >
                <LuNotebookText
                  size={40}
                  className="mb-2 text-primary"
                />

                <h6 className="mt-2">
                  No Students Found
                </h6>

                <small>
                  Select Session, Standard and Section,
                  then search students to generate roll numbers.
                </small>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle mb-0">
                  <thead className="table-success">
                    <tr>
                      <th
                        style={{
                          width: "70px",
                          textAlign: "center",
                        }}
                      >
                        #
                      </th>

                      <th>Admission Number</th>

                      <th>Student Name</th>

                      <th
                        style={{
                          width: "180px",
                          textAlign: "center",
                        }}
                      >
                        Roll Number
                      </th>

                      <th
                        style={{
                          width: "150px",
                          textAlign: "center",
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student.admissionNumber}>
                        <td className="text-center">
                          {index + 1}
                        </td>

                        <td>
                          <strong>
                            {student.admissionNumber}
                          </strong>
                        </td>

                        <td>
                          {student.firstName}{" "}
                          {student.lastName || ""}
                        </td>

                        <td className="text-center">
                          {student.rollNumber ? (
                            <span className="badge bg-primary fs-6 px-3 py-2">
                              {student.rollNumber}
                            </span>
                          ) : (
                            <span className="text-muted">
                              Not Generated
                            </span>
                          )}
                        </td>

                        <td className="text-center">
                          {student.rollNumber ? (
                            <span className="badge bg-primary">
                              Generated
                            </span>
                          ) : (
                            <span className="badge bg-warning text-dark">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* FOOTER SUMMARY */}

          {students.length > 0 && (
            <div className="card-footer bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Total Students:{" "}
                  <strong>{students.length}</strong>
                </small>

                <small className="text-muted">
                  Generated:{" "}
                  <strong>
                    {
                      students.filter(
                        (student) =>
                          student.rollNumber !== null &&
                          student.rollNumber !== undefined &&
                          student.rollNumber !== ""
                      ).length
                    }
                  </strong>
                </small>

                <small className="text-muted">
                  Pending:{" "}
                  <strong>
                    {
                      students.filter(
                        (student) =>
                          !student.rollNumber
                      ).length
                    }
                  </strong>
                </small>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RollNoGeneration;

