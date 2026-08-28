// import React, { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa6";
// import { LuNotebookText } from "react-icons/lu";
// import { MdErrorOutline, MdModeEdit } from "react-icons/md";
// import { RiDeleteBin6Line, RiResetLeftLine } from "react-icons/ri";
// import { CiSearch } from "react-icons/ci";
// import { toast } from "react-toastify";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";

// const GradeManagement = () => {
//   const { sessions } = useMasters();

//   const schoolId = JSON.parse(localStorage.getItem("schoolId"));

//   const [showAddGrade, setShowAddGrade] = useState(false);
//   const [grades, setGrades] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // =========================
//   // FILTERS
//   // =========================

//   const [filters, setFilters] = useState({
//     session: "",
//     gradeType: "",
//     status: "",
//   });

//   // =========================
//   // FORM
//   // =========================

//   const [formData, setFormData] = useState({
//     schoolId: schoolId,
//     session: "",
//     grade: "",
//     minPercentage: "",
//     maxPercentage: "",
//     gradePoint: "",

//     status: true,
//   });

//   // =========================
//   // FILTER CHANGE
//   // =========================

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;

//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =========================
//   // FORM CHANGE
//   // =========================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "status"
//           ? value === "true"
//           : ["minPercentage", "maxPercentage", "gradePoint"].includes(name)
//             ? value === ""
//               ? ""
//               : Number(value)
//             : value,
//     }));
//   };

//   // =========================
//   // RESET FORM
//   // =========================

//   const resetForm = () => {
//     setFormData({
//       schoolId: schoolId,
//       session: "",
//       grade: "",
//       minPercentage: "",
//       maxPercentage: "",
//       gradePoint: "",

//       status: true,
//     });

//     setEditingId(null);
//   };

//   // =========================
//   // LOAD GRADES
//   // =========================

//   const loadGrades = async () => {
//     try {
//       setLoading(true);

//       const response = await axiosInstance.get(
//         `/api/assessment/grade?schoolId=${schoolId}`,
//       );

//       console.log("Grades:", response.data);

//       setGrades(response.data || []);
//     } catch (error) {
//       console.log("Get Grades Error:", error);

//       toast.error(
//         error.response?.data || "Failed to load grades",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // SEARCH
//   // =========================

//   const handleSearch = () => {
//     // Agar backend filtering API banani hai
//     // to yahan API call laga dena.
//     console.log("Grade Filters:", filters);
//   };

//   // =========================
//   // RESET FILTER
//   // =========================

//   const handleReset = () => {
//     setFilters({
//       session: "",
//       gradeType: "",
//       status: "",
//     });

//     loadGrades();
//   };

//   // =========================
//   // EDIT
//   // =========================

//   const handleEdit = (grade) => {
//     setEditingId(grade.id);

//     setFormData({
//       schoolId: schoolId,
//       session: grade.session || "",
//       grade: grade.grade || "",
//       minPercentage: grade.minPercentage ?? "",
//       maxPercentage: grade.maxPercentage ?? "",
//       gradePoint: grade.gradePoint ?? "",

//       status: grade.status ?? true,
//     });

//     setShowAddGrade(true);
//   };

//   // =========================
//   // DELETE
//   // =========================

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this grade?",
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       setLoading(true);

//       await axiosInstance.delete(
//         `/api/assessment/grade/${id}?schoolId=${schoolId}`,
//       );

//       toast.success("Grade deleted successfully");

//       await loadGrades();
//     } catch (error) {
//       console.log("Delete Grade Error:", error);

//       toast.error(
//         error.response?.data || "Failed to delete grade",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // SAVE / UPDATE
//   // =========================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.session) {
//       toast.error("Please select session");
//       return;
//     }

//     if (!formData.grade.trim()) {
//       toast.error("Grade is required");
//       return;
//     }

//     if (
//       formData.minPercentage === "" ||
//       formData.maxPercentage === ""
//     ) {
//       toast.error("Percentage range is required");
//       return;
//     }

//     if (
//       Number(formData.minPercentage) >
//       Number(formData.maxPercentage)
//     ) {
//       toast.error(
//         "Minimum percentage cannot be greater than maximum percentage",
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         ...formData,
//         schoolId: schoolId,
//       };

//       console.log(
//         editingId
//           ? "Update Grade Payload:"
//           : "Add Grade Payload:",
//         payload,
//       );

//       if (editingId) {
//         await axiosInstance.put(
//           `/api/assessment/grade/${editingId}`,
//           payload,
//         );

//         toast.success("Grade updated successfully");
//       } else {
//         await axiosInstance.post(
//           "/api/assessment/grade",
//           payload,
//         );

//         toast.success("Grade added successfully");
//       }

//       await loadGrades();

//       resetForm();
//       setShowAddGrade(false);
//     } catch (error) {
//       console.log("Grade Save/Update Error:", error);

//       console.log("Status:", error.response?.status);
//       console.log("Data:", error.response?.data);

//       toast.error(
//         error.response?.data ||
//           (editingId
//             ? "Failed to update grade"
//             : "Failed to add grade"),
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // FILTERED GRADES
//   // =========================

//   const filteredGrades = grades.filter((grade) => {
//     const sessionMatch =
//       !filters.session ||
//       grade.session === filters.session;

//     const statusMatch =
//       filters.status === "" ||
//       String(grade.status) === filters.status;

//     return sessionMatch && statusMatch;
//   });

//   // =========================
//   // INITIAL LOAD
//   // =========================

//   useEffect(() => {
//     loadGrades();
//   }, []);

//   return (
//     <>
//       {/* ================= HEADER ================= */}

//       <div
//         className="row shadow-lg"
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
//           Grade Management
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
//               <small>Assessment</small>
//             </li>

//             <li className="breadcrumb-item active">
//               <small>Grade Management</small>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* ================= ALERT ================= */}

//       <div
//         className="ms-2 me-2 mt-2 alert p-2 rounded shadow"
//         style={{
//           backgroundColor: "#ebfffd",
//         }}
//       >
//         <small>
//           <MdErrorOutline size={20} className="me-2" />
//           Manage grading rules used to automatically assign
//           grades based on student marks and percentage.
//         </small>
//       </div>

//       {/* ================= FILTER ================= */}

//       <div className="ms-2 me-2 mt-3 rounded shadow bg-white p-3">
//         <div className="row g-3">

//           {/* SESSION */}

//           <div className="col-12 col-sm-6 col-lg-3">
//             <label className="form-label">
//               Session
//             </label>

//             <select
//               name="session"
//               className="form-select"
//               value={filters.session}
//               onChange={handleFilterChange}
//             >
//               <option value="">All</option>

//               {sessions?.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* STATUS */}

//           <div className="col-12 col-sm-6 col-lg-3">
//             <label className="form-label">
//               Status
//             </label>

//             <select
//               name="status"
//               className="form-select"
//               value={filters.status}
//               onChange={handleFilterChange}
//             >
//               <option value="">All</option>
//               <option value="true">Active</option>
//               <option value="false">Inactive</option>
//             </select>
//           </div>

//           {/* SEARCH */}

//           <div className="col-12 col-sm-4 col-lg-2">
//             <button
//               type="button"
//               className="btn btn-success w-100 mt-4"
//               onClick={handleSearch}
//             >
//               <CiSearch size={20} /> Search
//             </button>
//           </div>

//           {/* RESET */}

//           <div className="col-12 col-sm-4 col-lg-2">
//             <button
//               type="button"
//               className="btn btn-outline-secondary w-100 mt-4"
//               onClick={handleReset}
//             >
//               <RiResetLeftLine /> Reset
//             </button>
//           </div>

//           {/* ADD */}

//           <div className="col-12 col-sm-4 col-lg-2">
//             <button
//               type="button"
//               className="btn btn-success w-100 mt-4"
//               onClick={() => {
//                 resetForm();
//                 setShowAddGrade(true);
//               }}
//             >
//               <FaPlus /> Add Grade
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ================= MAIN ================= */}

//       <div className="ms-2 me-2 bg-white mt-3 rounded shadow p-3">
//         <div className="row g-3">

//           {/* ================= GRADE LIST ================= */}

//           <div
//             className={
//               showAddGrade
//                 ? "col-12 col-lg-8"
//                 : "col-12"
//             }
//           >
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h6 className="mb-0">
//                 <LuNotebookText className="me-2" />
//                 Grade List
//               </h6>

//               {showAddGrade && (
//                 <button
//                   className="btn btn-outline-secondary btn-sm"
//                   onClick={() => {
//                     resetForm();
//                     setShowAddGrade(false);
//                   }}
//                 >
//                   Close
//                 </button>
//               )}
//             </div>

//             <div className="table-responsive">
//               <table className="table table-bordered table-hover align-middle">
//                 <thead className="table-info">
//                   <tr>
//                     <th>#</th>
//                     <th>Grade</th>
//                     <th>Min %</th>
//                     <th>Max %</th>
//                     <th>Grade Point</th>

//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filteredGrades.length > 0 ? (
//                     filteredGrades.map((grade, index) => (
//                       <tr key={grade.id}>
//                         <td>{index + 1}</td>

//                         <td>
//                           <strong>
//                             {grade.grade}
//                           </strong>
//                         </td>

//                         <td>
//                           {grade.minPercentage}%
//                         </td>

//                         <td>
//                           {grade.maxPercentage}%
//                         </td>

//                         <td>
//                           {grade.gradePoint ?? "-"}
//                         </td>

//                         <td>
//                           {grade.status ? (
//                             <span className="badge bg-success">
//                               Active
//                             </span>
//                           ) : (
//                             <span className="badge bg-danger">
//                               Inactive
//                             </span>
//                           )}
//                         </td>

//                         <td>
//                           <MdModeEdit
//                             size={20}
//                             className="text-primary me-2"
//                             style={{
//                               cursor: "pointer",
//                             }}
//                             onClick={() =>
//                               handleEdit(grade)
//                             }
//                           />

//                           <RiDeleteBin6Line
//                             size={20}
//                             className="text-danger"
//                             style={{
//                               cursor: "pointer",
//                             }}
//                             onClick={() =>
//                               handleDelete(grade.id)
//                             }
//                           />
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="8"
//                         className="text-center text-muted py-4"
//                       >
//                         No grades found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* ================= ADD GRADE FORM ================= */}

//           {showAddGrade && (
//             <div className="col-12 col-lg-4">
//               <div className="border rounded p-3 h-100 shadow">

//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <h6 className="mb-0">
//                     {editingId ? (
//                       <>
//                         <MdModeEdit className="me-1" />
//                         Edit Grade
//                       </>
//                     ) : (
//                       <>
//                         <FaPlus className="me-1" />
//                         Add Grade
//                       </>
//                     )}
//                   </h6>

//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => {
//                       resetForm();
//                       setShowAddGrade(false);
//                     }}
//                   ></button>
//                 </div>

//                 <hr />

//                 {/* SESSION */}

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Session{" "}
//                     <span className="text-danger">
//                       *
//                     </span>
//                   </label>

//                   <select
//                     className="form-select"
//                     name="session"
//                     value={formData.session}
//                     onChange={handleChange}
//                   >
//                     <option value="">
//                       Select Session
//                     </option>

//                     {sessions?.map((item) => (
//                       <option key={item} value={item}>
//                         {item}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* GRADE */}

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Grade{" "}
//                     <span className="text-danger">
//                       *
//                     </span>
//                   </label>

//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="e.g. A+"
//                     name="grade"
//                     value={formData.grade}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 {/* MIN */}

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Minimum Percentage
//                   </label>

//                   <input
//                     type="number"
//                     className="form-control"
//                     placeholder="e.g. 90"
//                     name="minPercentage"
//                     value={formData.minPercentage}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 {/* MAX */}

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Maximum Percentage
//                   </label>

//                   <input
//                     type="number"
//                     className="form-control"
//                     placeholder="e.g. 100"
//                     name="maxPercentage"
//                     value={formData.maxPercentage}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 {/* GRADE POINT */}

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Grade Point
//                   </label>

//                   <input
//                     type="number"
//                     step="0.1"
//                     className="form-control"
//                     placeholder="e.g. 10"
//                     name="gradePoint"
//                     value={formData.gradePoint}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 {/* STATUS */}

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Status
//                   </label>

//                   <select
//                     className="form-select"
//                     name="status"
//                     value={String(formData.status)}
//                     onChange={handleChange}
//                   >
//                     <option value="true">
//                       Active
//                     </option>

//                     <option value="false">
//                       Inactive
//                     </option>
//                   </select>
//                 </div>

//                 {/* BUTTONS */}

//                 <div className="d-flex justify-content-end gap-2">

//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => {
//                       resetForm();
//                       setShowAddGrade(false);
//                     }}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     onClick={handleSubmit}
//                     disabled={loading}
//                   >
//                     {editingId ? (
//                       <MdModeEdit />
//                     ) : (
//                       <FaPlus />
//                     )}

//                     {loading
//                       ? editingId
//                         ? " Updating..."
//                         : " Saving..."
//                       : editingId
//                         ? " Update Grade"
//                         : " Add Grade"}
//                   </button>

//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default GradeManagement;

// import React, { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa6";
// import { LuNotebookText } from "react-icons/lu";
// import { MdErrorOutline, MdModeEdit } from "react-icons/md";
// import {
//   RiDeleteBin6Line,
//   RiResetLeftLine,
// } from "react-icons/ri";
// import { CiSearch } from "react-icons/ci";
// import { toast } from "react-toastify";

// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";

// const GradeManagement = () => {
//   const { sessions } = useMasters();

//   const schoolId = JSON.parse(
//     localStorage.getItem("schoolId")
//   );

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [showAddGrade, setShowAddGrade] = useState(false);

//   const [grades, setGrades] = useState([]);

//   const [editingId, setEditingId] = useState(null);

//   const [loading, setLoading] = useState(false);

//   const [searchApplied, setSearchApplied] = useState(false);

//   // =====================================================
//   // FILTERS
//   // =====================================================

//   const [filters, setFilters] = useState({
//     session: "",
//     grade: "",
//     status: "",
//   });

//   // =====================================================
//   // FORM DATA
//   // =====================================================

//   const [formData, setFormData] = useState({
//     schoolId: schoolId,
//     session: "",
//     grade: "",
//     remarks:"",
//     description: "",
//     minPercentage: "",
//     maxPercentage: "",
//     gradePoint: "",
//     status: true,
//   });

//   // =====================================================
//   // FILTER CHANGE
//   // =====================================================

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;

//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =====================================================
//   // FORM CHANGE
//   // =====================================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,

//       [name]:
//         name === "status"
//           ? value === "true"
//           : [
//                 "minPercentage",
//                 "maxPercentage",
//                 "gradePoint",
//               ].includes(name)
//             ? value === ""
//               ? ""
//               : Number(value)
//             : name === "grade"
//               ? value.toUpperCase()
//               : value,
//     }));
//   };

//   // =====================================================
//   // RESET FORM
//   // =====================================================

//   const resetForm = () => {
//     setFormData({
//       schoolId: schoolId,
//       session: "",
//       grade: "",
//       remarks:"",
//       description: "",
//       minPercentage: "",
//       maxPercentage: "",
//       gradePoint: "",
//       status: true,
//     });

//     setEditingId(null);
//   };

//   // =====================================================
//   // LOAD GRADES
//   // =====================================================

//   const loadGrades = async () => {
//     try {
//       setLoading(true);

//       const response = await axiosInstance.get(
//         `/api/assessment/grade?schoolId=${schoolId}`
//       );

//       console.log("Grades:", response.data);

//       setGrades(response.data || []);
//     } catch (error) {
//       console.log("Get Grades Error:", error);

//       toast.error(
//         error.response?.data ||
//           "Failed to load grades"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // SEARCH
//   // =====================================================

//   const handleSearch = () => {
//     setSearchApplied(true);

//     console.log("Grade Filters:", filters);
//   };

//   // =====================================================
//   // RESET FILTER
//   // =====================================================

//   const handleReset = () => {
//     setFilters({
//       session: "",
//       grade: "",
//       status: "",
//     });

//     setSearchApplied(false);
//   };

//   // =====================================================
//   // EDIT
//   // =====================================================

//   const handleEdit = (grade) => {
//     console.log("Edit Grade:", grade);

//     setEditingId(grade.id);

//     setFormData({
//       schoolId: schoolId,
//       session: grade.session || "",
//       grade: grade.grade || "",
//       remarks:grade.remarks || "",
//       description: grade.description || "",
//       minPercentage:
//         grade.minPercentage ?? "",
//       maxPercentage:
//         grade.maxPercentage ?? "",
//       gradePoint:
//         grade.gradePoint ?? "",
//       status: grade.status ?? true,
//     });

//     setShowAddGrade(true);
//   };

//   // =====================================================
//   // DELETE
//   // =====================================================

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this grade?"
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       setLoading(true);

//       console.log("Deleting Grade ID:", id);

//       await axiosInstance.delete(
//         `/api/assessment/grade/${id}?schoolId=${schoolId}`
//       );

//       toast.success(
//         "Grade deleted successfully"
//       );

//       await loadGrades();
//     } catch (error) {
//       console.log(
//         "Delete Grade Error:",
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
//           "Failed to delete grade"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // SAVE / UPDATE
//   // =====================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ===================================================
//     // VALIDATION
//     // ===================================================

//     if (!formData.session) {
//       toast.error("Please select session");
//       return;
//     }

//     if (!formData.grade.trim()) {
//       toast.error("Grade is required");
//       return;
//     }

//     if (
//       formData.minPercentage === "" ||
//       formData.maxPercentage === ""
//     ) {
//       toast.error(
//         "Percentage range is required"
//       );
//       return;
//     }

//     const min =
//       Number(formData.minPercentage);

//     const max =
//       Number(formData.maxPercentage);

//     // Min validation
//     if (min < 0 || min > 100) {
//       toast.error(
//         "Minimum percentage must be between 0 and 100"
//       );
//       return;
//     }

//     // Max validation
//     if (max < 0 || max > 100) {
//       toast.error(
//         "Maximum percentage must be between 0 and 100"
//       );
//       return;
//     }

//     // Range validation
//     if (min >= max) {
//       toast.error(
//         "Minimum percentage must be less than maximum percentage"
//       );
//       return;
//     }

//     // Grade point validation
//     if (
//       formData.gradePoint !== "" &&
//       Number(formData.gradePoint) < 0
//     ) {
//       toast.error(
//         "Grade point cannot be negative"
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         schoolId: schoolId,
//         session: formData.session,
//         grade: formData.grade.trim(),
//         remarks:formData.remarks,
//         description:
//           formData.description.trim(),
//         minPercentage: min,
//         maxPercentage: max,
//         gradePoint:
//           formData.gradePoint === ""
//             ? null
//             : Number(formData.gradePoint),
//         status: formData.status,
//       };

//       console.log(
//         "========== GRADE PAYLOAD =========="
//       );

//       console.log(
//         JSON.stringify(
//           payload,
//           null,
//           2
//         )
//       );

//       console.log(
//         "==================================="
//       );

//       // =================================================
//       // UPDATE
//       // =================================================

//       if (editingId) {
//         const response =
//           await axiosInstance.put(
//             `/api/assessment/grade/${editingId}`,
//             payload
//           );

//         console.log(
//           "Grade Updated:",
//           response.data
//         );

//         toast.success(
//           "Grade updated successfully"
//         );
//       }

//       // =================================================
//       // ADD
//       // =================================================

//       else {
//         const response =
//           await axiosInstance.post(
//             "/api/assessment/grade",
//             payload
//           );

//         console.log(
//           "Grade Added:",
//           response.data
//         );

//         toast.success(
//           "Grade added successfully"
//         );
//       }

//       // Reload grades

//       await loadGrades();

//       // Reset form

//       resetForm();

//       // Close form

//       setShowAddGrade(false);
//     } catch (error) {
//       console.log(
//         "Grade Save/Update Error:",
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
//           (editingId
//             ? "Failed to update grade"
//             : "Failed to add grade")
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // FILTERED GRADES
//   // =====================================================

//   const filteredGrades = grades.filter(
//     (grade) => {
//       // Search button press nahi hua
//       // to saare grades dikhao

//       if (!searchApplied) {
//         return true;
//       }

//       // Session

//       const sessionMatch =
//         !filters.session ||
//         grade.session ===
//           filters.session;

//       // Grade

//       const gradeMatch =
//         !filters.grade ||
//         grade.grade
//           ?.toLowerCase()
//           .includes(
//             filters.grade.toLowerCase()
//           );

//       // Status

//       const statusMatch =
//         filters.status === "" ||
//         String(grade.status) ===
//           filters.status;

//       return (
//         sessionMatch &&
//         gradeMatch &&
//         statusMatch
//       );
//     }
//   );

//   // =====================================================
//   // INITIAL LOAD
//   // =====================================================

//   useEffect(() => {
//     loadGrades();
//   }, []);

//   // =====================================================
//   // JSX
//   // =====================================================

//   return (
//     <>
//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div
//         className="row shadow-lg"
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

//           Grade Management
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
//                 <small>
//                   Home
//                 </small>
//               </a>
//             </li>

//             <li className="breadcrumb-item">
//               <small>
//                 Assessment
//               </small>
//             </li>

//             <li className="breadcrumb-item active">
//               <small>
//                 Grade Management
//               </small>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* =================================================
//           INFORMATION ALERT
//       ================================================= */}

//       <div
//         className="ms-2 me-2 mt-2 alert p-2 rounded shadow"
//         style={{
//           backgroundColor: "#ebfffd",
//         }}
//       >
//         <small>
//           <MdErrorOutline
//             size={20}
//             className="me-2"
//           />

//           Manage grading rules used to
//           automatically assign grades based
//           on student marks and percentage.
//         </small>
//       </div>

//       {/* =================================================
//           FILTER SECTION
//       ================================================= */}

//       <div className="ms-2 me-2 mt-3 rounded shadow bg-white p-3">
//         <div className="row g-3">

//           {/* SESSION */}

//           <div className="col-12 col-sm-6 col-lg-3">
//             <label className="form-label">
//               Session
//             </label>

//             <select
//               name="session"
//               className="form-select"
//               value={filters.session}
//               onChange={
//                 handleFilterChange
//               }
//             >
//               <option value="">
//                 All
//               </option>

//               {sessions?.map(
//                 (item) => (
//                   <option
//                     key={item}
//                     value={item}
//                   >
//                     {item}
//                   </option>
//                 )
//               )}
//             </select>
//           </div>

//           {/* GRADE */}

//           <div className="col-12 col-sm-6 col-lg-3">
//             <label className="form-label">
//               Grade
//             </label>

//             <input
//               type="text"
//               name="grade"
//               className="form-control"
//               placeholder="e.g. A+"
//               value={filters.grade}
//               onChange={
//                 handleFilterChange
//               }
//             />
//           </div>

//           {/* STATUS */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label">
//               Status
//             </label>

//             <select
//               name="status"
//               className="form-select"
//               value={filters.status}
//               onChange={
//                 handleFilterChange
//               }
//             >
//               <option value="">
//                 All
//               </option>

//               <option value="true">
//                 Active
//               </option>

//               <option value="false">
//                 Inactive
//               </option>
//             </select>
//           </div>

//           {/* SEARCH */}

//           <div className="col-12 col-sm-4 col-lg-2">
//             <button
//               type="button"
//               className="btn btn-success w-100 mt-4"
//               onClick={
//                 handleSearch
//               }
//             >
//               <CiSearch
//                 size={20}
//                 className="me-1"
//               />

//               Search
//             </button>
//           </div>

//           {/* RESET */}

//           <div className="col-12 col-sm-4 col-lg-2">
//             <button
//               type="button"
//               className="btn btn-outline-secondary w-100 mt-4"
//               onClick={
//                 handleReset
//               }
//             >
//               <RiResetLeftLine className="me-1" />

//               Reset
//             </button>
//           </div>
//         </div>

//         {/* ADD BUTTON */}

//         <div className="row mt-3">
//           <div className="col-12 d-flex justify-content-end">
//             <button
//               type="button"
//               className="btn btn-success"
//               onClick={() => {
//                 resetForm();
//                 setShowAddGrade(true);
//               }}
//             >
//               <FaPlus className="me-1" />

//               Add Grade
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* =================================================
//           MAIN SECTION
//       ================================================= */}

//       <div className="ms-2 me-2 bg-white mt-3 rounded shadow p-3">
//         <div className="row g-3">

//           {/* =================================================
//               GRADE LIST
//           ================================================= */}

//           <div
//             className={
//               showAddGrade
//                 ? "col-12 col-lg-8"
//                 : "col-12"
//             }
//           >
//             <div className="d-flex justify-content-between align-items-center mb-3">

//               <h6 className="mb-0">
//                 <LuNotebookText className="me-2" />

//                 Grade List
//               </h6>

//               {showAddGrade && (
//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary btn-sm"
//                   onClick={() => {
//                     resetForm();
//                     setShowAddGrade(
//                       false
//                     );
//                   }}
//                 >
//                   Close
//                 </button>
//               )}
//             </div>

//             {/* TABLE */}

//             <div className="table-responsive">
//               <table className="table table-bordered table-hover align-middle mb-0">

//                 <thead className="table-info">
//                   <tr>
//                     <th>
//                       #
//                     </th>

//                     <th>
//                       Grade
//                     </th>

//                     <th>
//                       Description
//                     </th>

//                     <th>
//                       Min %
//                     </th>

//                     <th>
//                       Max %
//                     </th>

//                     <th>
//                       Grade Point
//                     </th>

//                     <th>Remarks</th>

//                     <th>
//                       Status
//                     </th>

//                     <th>
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="text-center">

//                   {loading ? (
//                     <tr>
//                       <td
//                         colSpan="8"
//                         className="text-center py-4"
//                       >
//                         Loading...
//                       </td>
//                     </tr>
//                   ) : filteredGrades.length >
//                     0 ? (
//                     filteredGrades.map(
//                       (
//                         grade,
//                         index
//                       ) => (
//                         <tr
//                           key={
//                             grade.id
//                           }
//                         >

//                           {/* NUMBER */}

//                           <td>
//                             {index + 1}
//                           </td>

//                           {/* GRADE */}

//                           <td>
//                             <span className="badge bg-primary">
//                               {
//                                 grade.grade
//                               }
//                             </span>
//                           </td>

//                           {/* DESCRIPTION */}

//                           <td>
//                             {grade.description ||
//                               "-"}
//                           </td>

//                           {/* MIN */}

//                           <td>
//                             {
//                               grade.minPercentage
//                             }
//                             %
//                           </td>

//                           {/* MAX */}

//                           <td>
//                             {
//                               grade.maxPercentage
//                             }
//                             %
//                           </td>

//                           {/* GRADE POINT */}

//                           <td>
//                             {
//                               grade.gradePoint ??
//                               "-"
//                             }
//                           </td>

//                           <td>
//                             {grade.remarks ?? "-"}
//                           </td>

//                           {/* STATUS */}

//                           <td>
//                             {grade.status ? (
//                               <span className="badge bg-success">
//                                 Active
//                               </span>
//                             ) : (
//                               <span className="badge bg-danger">
//                                 Inactive
//                               </span>
//                             )}
//                           </td>

//                           {/* ACTION */}

//                           <td>
//                             <div className="d-flex align-items-center">

//                               {/* EDIT */}

//                               <MdModeEdit
//                                 size={20}
//                                 className="text-primary me-3"
//                                 style={{
//                                   cursor:
//                                     "pointer",
//                                 }}
//                                 title="Edit"
//                                 onClick={() =>
//                                   handleEdit(
//                                     grade
//                                   )
//                                 }
//                               />

//                               {/* DELETE */}

//                               <RiDeleteBin6Line
//                                 size={20}
//                                 className="text-danger"
//                                 style={{
//                                   cursor:
//                                     "pointer",
//                                 }}
//                                 title="Delete"
//                                 onClick={() =>
//                                   handleDelete(
//                                     grade.id
//                                   )
//                                 }
//                               />

//                             </div>
//                           </td>
//                         </tr>
//                       )
//                     )
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="8"
//                         className="text-center text-muted py-5"
//                       >
//                         No grades found.
//                       </td>
//                     </tr>
//                   )}

//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* =================================================
//               ADD / EDIT GRADE
//           ================================================= */}

//           {showAddGrade && (
//             <div className="col-12 col-lg-4">

//               <div className="border rounded p-3 h-100 shadow">

//                 {/* FORM HEADER */}

//                 <div className="d-flex justify-content-between align-items-center mb-3">

//                   <h6 className="mb-0">

//                     {editingId ? (
//                       <>
//                         <MdModeEdit className="me-1" />

//                         Edit Grade
//                       </>
//                     ) : (
//                       <>
//                         <FaPlus className="me-1" />

//                         Add Grade
//                       </>
//                     )}

//                   </h6>

//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => {
//                       resetForm();

//                       setShowAddGrade(
//                         false
//                       );
//                     }}
//                   ></button>
//                 </div>

//                 <hr />

//                 {/* =================================================
//                     SESSION
//                 ================================================= */}

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Session{" "}
//                     <span className="text-danger">
//                       *
//                     </span>
//                   </label>

//                   <select
//                     className="form-select"
//                     name="session"
//                     value={
//                       formData.session
//                     }
//                     onChange={
//                       handleChange
//                     }
//                   >

//                     <option value="">
//                       Select Session
//                     </option>

//                     {sessions?.map(
//                       (item) => (
//                         <option
//                           key={item}
//                           value={item}
//                         >
//                           {item}
//                         </option>
//                       )
//                     )}

//                   </select>
//                 </div>

//                 {/* =================================================
//                     GRADE
//                 ================================================= */}

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Grade{" "}
//                     <span className="text-danger">
//                       *
//                     </span>
//                   </label>

//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="e.g. A+"
//                     name="grade"
//                     value={
//                       formData.grade
//                     }
//                     onChange={
//                       handleChange
//                     }
//                   />

//                 </div>

//                 {/* =================================================
//                     DESCRIPTION
//                 ================================================= */}

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Description
//                   </label>

//                   <textarea
//                     className="form-control"
//                     name="description"
//                     rows="2"
//                     placeholder="e.g. Outstanding performance"
//                     value={
//                       formData.description
//                     }
//                     onChange={
//                       handleChange
//                     }
//                   />

//                 </div>

//                 {/* =================================================
//                     MIN PERCENTAGE
//                 ================================================= */}

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Minimum Percentage{" "}
//                     <span className="text-danger">
//                       *
//                     </span>
//                   </label>

//                   <input
//                     type="number"
//                     min="0"
//                     max="100"
//                     step="0.01"
//                     className="form-control"
//                     placeholder="e.g. 90"
//                     name="minPercentage"
//                     value={
//                       formData.minPercentage
//                     }
//                     onChange={
//                       handleChange
//                     }
//                   />

//                 </div>

//                 {/* =================================================
//                     MAX PERCENTAGE
//                 ================================================= */}

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Maximum Percentage{" "}
//                     <span className="text-danger">
//                       *
//                     </span>
//                   </label>

//                   <input
//                     type="number"
//                     min="0"
//                     max="100"
//                     step="0.01"
//                     className="form-control"
//                     placeholder="e.g. 100"
//                     name="maxPercentage"
//                     value={
//                       formData.maxPercentage
//                     }
//                     onChange={
//                       handleChange
//                     }
//                   />

//                 </div>

//                 {/* =================================================
//                     GRADE POINT
//                 ================================================= */}

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Grade Point
//                   </label>

//                   <input
//                     type="number"
//                     min="0"
//                     step="0.1"
//                     className="form-control"
//                     placeholder="e.g. 10"
//                     name="gradePoint"
//                     value={
//                       formData.gradePoint
//                     }
//                     onChange={
//                       handleChange
//                     }
//                   />

//                 </div>

//                    <div className="mb-3">

//                   <label className="form-label">
//                     Remarks{" "}
//                     <span className="text-danger">
//                       *
//                     </span>
//                   </label>

//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="e.g. Outstanding"
//                     name="remarks"
//                     value={
//                       formData.remarks
//                     }
//                     onChange={
//                       handleChange
//                     }
//                   />

//                 </div>

//                 {/* =================================================
//                     STATUS
//                 ================================================= */}

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Status
//                   </label>

//                   <select
//                     className="form-select"
//                     name="status"
//                     value={String(
//                       formData.status
//                     )}
//                     onChange={
//                       handleChange
//                     }
//                   >

//                     <option value="true">
//                       Active
//                     </option>

//                     <option value="false">
//                       Inactive
//                     </option>

//                   </select>

//                 </div>

//                 {/* =================================================
//                     BUTTONS
//                 ================================================= */}

//                 <div className="d-flex justify-content-end gap-2">

//                   {/* CANCEL */}

//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => {
//                       resetForm();

//                       setShowAddGrade(
//                         false
//                       );
//                     }}
//                   >
//                     Cancel
//                   </button>

//                   {/* SAVE / UPDATE */}

//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     onClick={
//                       handleSubmit
//                     }
//                     disabled={
//                       loading
//                     }
//                   >

//                     {editingId ? (
//                       <MdModeEdit className="me-1" />
//                     ) : (
//                       <FaPlus className="me-1" />
//                     )}

//                     {loading
//                       ? editingId
//                         ? "Updating..."
//                         : "Saving..."
//                       : editingId
//                         ? "Update Grade"
//                         : "Add Grade"}

//                   </button>

//                 </div>

//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default GradeManagement;

// import React, { useEffect, useState } from "react";
// import { FaPlus, FaRegEye } from "react-icons/fa6";
// import { IoCloseSharp } from "react-icons/io5";
// import { LuNotebookText } from "react-icons/lu";
// import {
//   MdAssessment,
//   MdAssignment,
//   MdErrorOutline,
//   MdModeEdit,
// } from "react-icons/md";
// import { TbBulb } from "react-icons/tb";
// import { RiDeleteBin6Line, RiResetLeftLine } from "react-icons/ri";
// import { CiSearch } from "react-icons/ci";
// import { toast } from "react-toastify";

// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";

// const GradeManagement = () => {
//   const { sessions } = useMasters();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [showAddGrade, setShowAddGrade] = useState(false);
//   const [grades, setGrades] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searchApplied, setSearchApplied] = useState(false);

//   // =====================================================
//   // FILTERS
//   // =====================================================

//   const [filters, setFilters] = useState({
//     session: "",
//     grade: "",
//     status: "",
//   });

//   // =====================================================
//   // FORM DATA
//   // =====================================================

//   const [formData, setFormData] = useState({
//     schoolId: schoolId,
//     session: "",
//     grade: "",
//     remarks: "",
//     description: "",
//     minPercentage: "",
//     maxPercentage: "",
//     gradePoint: "",
//     status: true,
//   });

//   // =====================================================
//   // FILTER CHANGE
//   // =====================================================

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;

//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =====================================================
//   // FORM CHANGE
//   // =====================================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "status"
//           ? value === "true"
//           : ["minPercentage", "maxPercentage", "gradePoint"].includes(name)
//             ? value === ""
//               ? ""
//               : Number(value)
//             : name === "grade"
//               ? value.toUpperCase()
//               : value,
//     }));
//   };

//   // =====================================================
//   // RESET FORM
//   // =====================================================

//   const resetForm = () => {
//     setFormData({
//       schoolId: schoolId,
//       session: "",
//       grade: "",
//       remarks: "",
//       description: "",
//       minPercentage: "",
//       maxPercentage: "",
//       gradePoint: "",
//       status: true,
//     });

//     setEditingId(null);
//   };

//   // =====================================================
//   // LOAD GRADES
//   // =====================================================

//   const loadGrades = async () => {
//     try {
//       setLoading(true);

//       const response = await axiosInstance.get(
//         `/api/assessment/grade?schoolId=${schoolId}`
//       );

//       setGrades(response.data || []);
//     } catch (error) {
//       console.log("Get Grades Error:", error);

//       toast.error(
//         error.response?.data || "Failed to load grades"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // SEARCH
//   // =====================================================

//   const handleSearch = () => {
//     setSearchApplied(true);
//   };

//   // =====================================================
//   // RESET FILTER
//   // =====================================================

//   const handleReset = () => {
//     setFilters({
//       session: "",
//       grade: "",
//       status: "",
//     });

//     setSearchApplied(false);
//   };

//   // =====================================================
//   // EDIT
//   // =====================================================

//   const handleEdit = (grade) => {
//     setEditingId(grade.id);

//     setFormData({
//       schoolId: schoolId,
//       session: grade.session || "",
//       grade: grade.grade || "",
//       remarks: grade.remarks || "",
//       description: grade.description || "",
//       minPercentage: grade.minPercentage ?? "",
//       maxPercentage: grade.maxPercentage ?? "",
//       gradePoint: grade.gradePoint ?? "",
//       status: grade.status ?? true,
//     });

//     setShowAddGrade(true);
//   };

//   // =====================================================
//   // DELETE
//   // =====================================================

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this grade?"
//     );

//     if (!confirmDelete) return;

//     try {
//       setLoading(true);

//       await axiosInstance.delete(
//         `/api/assessment/grade/${id}?schoolId=${schoolId}`
//       );

//       toast.success("Grade deleted successfully");

//       await loadGrades();
//     } catch (error) {
//       console.log("Delete Grade Error:", error);

//       toast.error(
//         error.response?.data || "Failed to delete grade"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // SAVE / UPDATE
//   // =====================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.session) {
//       toast.error("Please select session");
//       return;
//     }

//     if (!formData.grade.trim()) {
//       toast.error("Grade is required");
//       return;
//     }

//     if (
//       formData.minPercentage === "" ||
//       formData.maxPercentage === ""
//     ) {
//       toast.error("Percentage range is required");
//       return;
//     }

//     const min = Number(formData.minPercentage);
//     const max = Number(formData.maxPercentage);

//     if (min < 0 || min > 100) {
//       toast.error("Minimum percentage must be between 0 and 100");
//       return;
//     }

//     if (max < 0 || max > 100) {
//       toast.error("Maximum percentage must be between 0 and 100");
//       return;
//     }

//     if (min >= max) {
//       toast.error(
//         "Minimum percentage must be less than maximum percentage"
//       );
//       return;
//     }

//     if (
//       formData.gradePoint !== "" &&
//       Number(formData.gradePoint) < 0
//     ) {
//       toast.error("Grade point cannot be negative");
//       return;
//     }

//     if (!formData.remarks.trim()) {
//       toast.error("Remarks is required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         schoolId: schoolId,
//         session: formData.session,
//         grade: formData.grade.trim(),
//         remarks: formData.remarks.trim(),
//         description: formData.description.trim(),
//         minPercentage: min,
//         maxPercentage: max,
//         gradePoint:
//           formData.gradePoint === ""
//             ? null
//             : Number(formData.gradePoint),
//         status: formData.status,
//       };

//       if (editingId) {
//         await axiosInstance.put(
//           `/api/assessment/grade/${editingId}`,
//           payload
//         );

//         toast.success("Grade updated successfully");
//       } else {
//         await axiosInstance.post(
//           "/api/assessment/grade",
//           payload
//         );

//         toast.success("Grade added successfully");
//       }

//       await loadGrades();

//       resetForm();
//       setShowAddGrade(false);
//     } catch (error) {
//       console.log("Grade Save/Update Error:", error);

//       toast.error(
//         error.response?.data ||
//           (editingId
//             ? "Failed to update grade"
//             : "Failed to add grade")
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // FILTERED GRADES
//   // =====================================================

//   const filteredGrades = grades.filter((grade) => {
//     if (!searchApplied) {
//       return true;
//     }

//     const sessionMatch =
//       !filters.session ||
//       grade.session === filters.session;

//     const gradeMatch =
//       !filters.grade ||
//       grade.grade
//         ?.toLowerCase()
//         .includes(filters.grade.toLowerCase());

//     const statusMatch =
//       filters.status === "" ||
//       String(grade.status) === filters.status;

//     return sessionMatch && gradeMatch && statusMatch;
//   });

//   // =====================================================
//   // COUNTS
//   // =====================================================

//   const activeCount = grades.filter(
//     (item) => item.status
//   ).length;

//   const inactiveCount = grades.filter(
//     (item) => !item.status
//   ).length;

//   // =====================================================
//   // INITIAL LOAD
//   // =====================================================

//   useEffect(() => {
//     loadGrades();
//   }, []);

//   // =====================================================
//   // JSX
//   // =====================================================

//   return (
//     <>
//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div
//         className="row shadow-lg"
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
//           <MdAssessment className="me-2" />
//           Grade Management
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

//             <li className="breadcrumb-item active">
//               <small>Assessment</small>
//             </li>

//             <li className="breadcrumb-item active">
//               <small>Grade Management</small>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* =================================================
//           INFO ALERT
//       ================================================= */}

//       <div
//         className="ms-2 me-2 mt-2 alert p-2 rounded shadow"
//         style={{
//           backgroundColor: "#ebfffd",
//         }}
//       >
//         <small>
//           <MdErrorOutline size={20} className="me-2" />
//           Manage grading rules used to automatically assign
//           grades based on student marks and percentage.
//         </small>
//       </div>

//       {/* =================================================
//           SUMMARY CARDS
//       ================================================= */}

//       <div className="container-fluid mt-3">
//         <div className="row g-2">

//           {/* TOTAL */}

//           <div className="col-12 col-sm-4">
//             <div className="card shadow rounded h-100">
//               <div className="card-body">
//                 <div className="d-flex align-items-center">
//                   <div
//                     className="rounded-3 d-flex align-items-center justify-content-center me-3"
//                     style={{
//                       width: 55,
//                       height: 55,
//                       background: "#E8F1FF",
//                     }}
//                   >
//                     <LuNotebookText
//                       size={26}
//                       color="#2563eb"
//                     />
//                   </div>

//                   <div>
//                     <small className="text-muted d-block">
//                       Total Grades
//                     </small>

//                     <h4 className="fw-bold mb-0">
//                       {grades.length}
//                     </h4>

//                     <small className="text-success">
//                       All grading rules
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ACTIVE */}

//           <div className="col-12 col-sm-4">
//             <div className="card shadow rounded h-100">
//               <div className="card-body">
//                 <div className="d-flex align-items-center">
//                   <div
//                     className="rounded-3 d-flex align-items-center justify-content-center me-3"
//                     style={{
//                       width: 55,
//                       height: 55,
//                       background: "#e7f8ee",
//                     }}
//                   >
//                     <span
//                       className="text-success fw-bold"
//                       style={{ fontSize: "25px" }}
//                     >
//                       ✓
//                     </span>
//                   </div>

//                   <div>
//                     <small className="text-muted d-block">
//                       Active Grades
//                     </small>

//                     <h4 className="fw-bold mb-0">
//                       {activeCount}
//                     </h4>

//                     <small className="text-success">
//                       Currently Active
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* INACTIVE */}

//           <div className="col-12 col-sm-4">
//             <div className="card shadow rounded h-100">
//               <div className="card-body">
//                 <div className="d-flex align-items-center">
//                   <div
//                     className="rounded-3 d-flex align-items-center justify-content-center me-3"
//                     style={{
//                       width: 55,
//                       height: 55,
//                       background: "#ffeaea",
//                     }}
//                   >
//                     <span
//                       className="text-danger fw-bold"
//                       style={{ fontSize: "25px" }}
//                     >
//                       !
//                     </span>
//                   </div>

//                   <div>
//                     <small className="text-muted d-block">
//                       Inactive Grades
//                     </small>

//                     <h4 className="fw-bold mb-0">
//                       {inactiveCount}
//                     </h4>

//                     <small className="text-danger">
//                       Currently Inactive
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* =================================================
//           FILTER
//       ================================================= */}

//       <div className="ms-2 me-2 mt-4">
//         <div className="card shadow border-0">
//           <div className="card-header bg-white">
//             <h6 className="mb-0">
//               <MdErrorOutline className="me-2" />
//               Filter Grades
//             </h6>
//           </div>

//           <div className="card-body">
//             <div className="row g-3">

//               {/* SESSION */}

//               <div className="col-12 col-md-4">
//                 <label className="form-label">
//                   Session
//                 </label>

//                 <select
//                   name="session"
//                   className="form-select"
//                   value={filters.session}
//                   onChange={handleFilterChange}
//                 >
//                   <option value="">All Sessions</option>

//                   {sessions?.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* GRADE */}

//               <div className="col-12 col-md-4">
//                 <label className="form-label">
//                   Grade
//                 </label>

//                 <input
//                   type="text"
//                   name="grade"
//                   className="form-control"
//                   placeholder="e.g. A+"
//                   value={filters.grade}
//                   onChange={handleFilterChange}
//                 />
//               </div>

//               {/* STATUS */}

//               <div className="col-12 col-md-4">
//                 <label className="form-label">
//                   Status
//                 </label>

//                 <select
//                   name="status"
//                   className="form-select"
//                   value={filters.status}
//                   onChange={handleFilterChange}
//                 >
//                   <option value="">All Status</option>
//                   <option value="true">Active</option>
//                   <option value="false">Inactive</option>
//                 </select>
//               </div>

//               {/* BUTTONS */}

//               <div className="col-12 d-flex justify-content-end gap-2">

//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary btn-sm"
//                   onClick={handleReset}
//                 >
//                   <RiResetLeftLine className="me-1" />
//                   Reset
//                 </button>

//                 <button
//                   type="button"
//                   className="btn btn-success btn-sm"
//                   onClick={handleSearch}
//                 >
//                   <CiSearch
//                     size={20}
//                     className="me-1"
//                   />
//                   Search
//                 </button>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =================================================
//           MAIN CONTENT
//       ================================================= */}

//       <div className="container-fluid mt-3">
//         <div className="row g-3">

//           {/* =================================================
//               GRADE LIST
//           ================================================= */}

//           <div
//             className={
//               showAddGrade
//                 ? "col-12 col-lg-8"
//                 : "col-12"
//             }
//           >
//             <div className="card shadow h-100">

//               <div className="card-header bg-white d-flex justify-content-between align-items-center">
//                 <h6 className="mb-0">
//                   <LuNotebookText
//                     className="me-2"
//                     size={20}
//                   />
//                   Grade List
//                 </h6>

//                 {!showAddGrade && (
//                   <button
//                     className="btn btn-success btn-sm"
//                     onClick={() => {
//                       resetForm();
//                       setShowAddGrade(true);
//                     }}
//                   >
//                     <FaPlus className="me-1" />
//                     Add Grade
//                   </button>
//                 )}

//                 {showAddGrade && (
//                   <button
//                     className="btn btn-outline-dark btn-sm"
//                     onClick={() => {
//                       resetForm();
//                       setShowAddGrade(false);
//                     }}
//                   >
//                     <IoCloseSharp size={18} />
//                     Close
//                   </button>
//                 )}
//               </div>

//               <div className="card-body table-responsive">

//                 <table className="table table-bordered table-hover align-middle mb-0">

//                   <thead className="table-success">
//                     <tr>
//                       <th>S.No</th>
//                       <th>Grade</th>
//                       <th>Description</th>
//                       <th>Min %</th>
//                       <th>Max %</th>
//                       <th>Grade Point</th>
//                       <th>Remarks</th>
//                       <th>Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>

//                   <tbody className="text-center">

//                     {loading ? (
//                       <tr>
//                         <td
//                           colSpan="9"
//                           className="py-5 text-muted"
//                         >
//                           Loading grades...
//                         </td>
//                       </tr>
//                     ) : filteredGrades.length > 0 ? (
//                       filteredGrades.map((grade, index) => (
//                         <tr key={grade.id}>

//                           <td>
//                             {index + 1}
//                           </td>

//                           <td>
//                             <span className="badge bg-primary">
//                               {grade.grade}
//                             </span>
//                           </td>

//                           <td>
//                             {grade.description || "-"}
//                           </td>

//                           <td>
//                             {grade.minPercentage}%
//                           </td>

//                           <td>
//                             {grade.maxPercentage}%
//                           </td>

//                           <td>
//                             {grade.gradePoint ?? "-"}
//                           </td>

//                           <td>
//                             {grade.remarks || "-"}
//                           </td>

//                           <td>
//                             {grade.status ? (
//                               <span className="badge bg-success">
//                                 Active
//                               </span>
//                             ) : (
//                               <span className="badge bg-danger">
//                                 Inactive
//                               </span>
//                             )}
//                           </td>

//                           <td>
//                             <div className="d-flex justify-content-center align-items-center">

//                               <MdModeEdit
//                                 size={20}
//                                 className="text-primary me-3"
//                                 style={{
//                                   cursor: "pointer",
//                                 }}
//                                 title="Edit"
//                                 onClick={() =>
//                                   handleEdit(grade)
//                                 }
//                               />

//                               <RiDeleteBin6Line
//                                 size={20}
//                                 className="text-danger"
//                                 style={{
//                                   cursor: "pointer",
//                                 }}
//                                 title="Delete"
//                                 onClick={() =>
//                                   handleDelete(grade.id)
//                                 }
//                               />

//                             </div>
//                           </td>

//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="9"
//                           className="py-5 text-muted"
//                         >
//                           No grades found.
//                         </td>
//                       </tr>
//                     )}

//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               ADD / EDIT FORM
//           ================================================= */}

//           {showAddGrade && (
//             <div className="col-12 col-lg-4">

//               <div className="card shadow h-100">

//                 <div className="card-header bg-white d-flex justify-content-between align-items-center">

//                   <h6 className="mb-0">
//                     {editingId ? (
//                       <>
//                         <MdModeEdit className="me-2" />
//                         Edit Grade
//                       </>
//                     ) : (
//                       <>
//                         <MdAssignment className="me-2" />
//                         Add Grade
//                       </>
//                     )}
//                   </h6>

//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => {
//                       resetForm();
//                       setShowAddGrade(false);
//                     }}
//                   ></button>

//                 </div>

//                 <div className="card-body">

//                   {/* SESSION */}

//                   <div className="mb-3">
//                     <label className="form-label">
//                       Session{" "}
//                       <span className="text-danger">*</span>
//                     </label>

//                     <select
//                       className="form-select"
//                       name="session"
//                       value={formData.session}
//                       onChange={handleChange}
//                     >
//                       <option value="">
//                         Select Session
//                       </option>

//                       {sessions?.map((item) => (
//                         <option
//                           key={item}
//                           value={item}
//                         >
//                           {item}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* GRADE */}

//                   <div className="mb-3">
//                     <label className="form-label">
//                       Grade{" "}
//                       <span className="text-danger">*</span>
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="e.g. A+"
//                       name="grade"
//                       value={formData.grade}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   {/* MIN / MAX */}

//                   <div className="row">

//                     <div className="col-6 mb-3">
//                       <label className="form-label">
//                         Minimum %{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </label>

//                       <input
//                         type="number"
//                         min="0"
//                         max="100"
//                         step="0.01"
//                         className="form-control"
//                         placeholder="e.g. 90"
//                         name="minPercentage"
//                         value={
//                           formData.minPercentage
//                         }
//                         onChange={handleChange}
//                       />
//                     </div>

//                     <div className="col-6 mb-3">
//                       <label className="form-label">
//                         Maximum %{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </label>

//                       <input
//                         type="number"
//                         min="0"
//                         max="100"
//                         step="0.01"
//                         className="form-control"
//                         placeholder="e.g. 100"
//                         name="maxPercentage"
//                         value={
//                           formData.maxPercentage
//                         }
//                         onChange={handleChange}
//                       />
//                     </div>

//                   </div>

//                   {/* GRADE POINT */}

//                   <div className="mb-3">
//                     <label className="form-label">
//                       Grade Point
//                     </label>

//                     <input
//                       type="number"
//                       min="0"
//                       step="0.1"
//                       className="form-control"
//                       placeholder="e.g. 10"
//                       name="gradePoint"
//                       value={
//                         formData.gradePoint
//                       }
//                       onChange={handleChange}
//                     />
//                   </div>

//                   {/* REMARKS */}

//                   <div className="mb-3">
//                     <label className="form-label">
//                       Remarks{" "}
//                       <span className="text-danger">
//                         *
//                       </span>
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="e.g. Outstanding"
//                       name="remarks"
//                       value={formData.remarks}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   {/* DESCRIPTION */}

//                   <div className="mb-3">
//                     <label className="form-label">
//                       Description
//                     </label>

//                     <textarea
//                       className="form-control"
//                       rows="2"
//                       maxLength={255}
//                       placeholder="Enter description"
//                       name="description"
//                       value={
//                         formData.description
//                       }
//                       onChange={handleChange}
//                     />

//                     <div className="d-flex justify-content-between">
//                       <small className="text-muted">
//                         Max 255 characters
//                       </small>

//                       <small className="text-muted">
//                         {
//                           formData.description
//                             .length
//                         }{" "}
//                         / 255
//                       </small>
//                     </div>
//                   </div>

//                   {/* STATUS */}

//                   <div className="mb-3">
//                     <label className="form-label">
//                       Status{" "}
//                       <span className="text-danger">
//                         *
//                       </span>
//                     </label>

//                     <select
//                       className="form-select"
//                       name="status"
//                       value={String(
//                         formData.status
//                       )}
//                       onChange={handleChange}
//                     >
//                       <option value="true">
//                         Active
//                       </option>

//                       <option value="false">
//                         Inactive
//                       </option>
//                     </select>
//                   </div>

//                   <hr />

//                   {/* BUTTONS */}

//                   <div className="d-flex justify-content-end gap-2">

//                     <button
//                       type="button"
//                       className="btn btn-outline-dark btn-sm"
//                       onClick={() => {
//                         resetForm();
//                         setShowAddGrade(false);
//                       }}
//                     >
//                       <IoCloseSharp size={18} />
//                       Cancel
//                     </button>

//                     <button
//                       type="button"
//                       className="btn btn-success btn-sm"
//                       onClick={handleSubmit}
//                       disabled={loading}
//                     >
//                       {editingId ? (
//                         <MdModeEdit className="me-1" />
//                       ) : (
//                         <MdAssignment className="me-1" />
//                       )}

//                       {loading
//                         ? editingId
//                           ? "Updating..."
//                           : "Saving..."
//                         : editingId
//                           ? "Update Grade"
//                           : "Save Grade"}
//                     </button>

//                   </div>

//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =================================================
//           BOTTOM INFORMATION
//       ================================================= */}

//       <div
//         className="ms-2 me-2 mt-4 alert p-2 rounded shadow d-flex justify-content-between align-items-center"
//         style={{
//           backgroundColor: "#e6ecff",
//         }}
//       >
//         <div>
//           <h6>
//             <MdErrorOutline
//               size={20}
//               className="me-2"
//             />
//             About Grade Management
//           </h6>

//           <small>
//             Grade Management allows you to define percentage
//             ranges and automatically assign grades and grade
//             points to students based on their performance.
//           </small>

//           <div className="mt-2">
//             <small>
//               <TbBulb size={18} className="me-1" />
//               Example: 90–100% = A+, 80–89% = A,
//               70–79% = B+.
//             </small>
//           </div>
//         </div>

//         <div className="d-none d-md-block">
//           <FaRegEye size={45} className="text-primary" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default GradeManagement;

import React, { useEffect, useState } from "react";
import { FaPlus, FaRegEye } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { LuNotebookText } from "react-icons/lu";
import {
  MdAssessment,
  MdAssignment,
  MdErrorOutline,
  MdModeEdit,
  MdOutlineAssessment,
  MdOutlineSchool,
} from "react-icons/md";

import { TbBulb, TbExclamationMark } from "react-icons/tb";
import { RiDeleteBin6Line, RiResetLeftLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";

import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";
import { TiTick } from "react-icons/ti";
import { GiCheckMark } from "react-icons/gi";
import { IoMdSearch } from "react-icons/io";

const GradeManagement = () => {
  const { sessions } = useMasters();

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;

  // =====================================================
  // STATES
  // =====================================================

  const [showAddGrade, setShowAddGrade] = useState(false);
  const [grades, setGrades] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchApplied, setSearchApplied] = useState(false);

  const [filters, setFilters] = useState({
    session: "",
    grade: "",
    status: "",
  });

  const [formData, setFormData] = useState({
    schoolId: schoolId,
    session: "",
    grade: "",
    remarks: "",
    description: "",
    minPercentage: "",
    maxPercentage: "",
    gradePoint: "",
    status: true,
  });

  // =====================================================
  // FILTER CHANGE
  // =====================================================

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "status"
          ? value === "true"
          : ["minPercentage", "maxPercentage", "gradePoint"].includes(name)
            ? value === ""
              ? ""
              : Number(value)
            : name === "grade"
              ? value.toUpperCase()
              : value,
    }));
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData({
      schoolId: schoolId,
      session: "",
      grade: "",
      remarks: "",
      description: "",
      minPercentage: "",
      maxPercentage: "",
      gradePoint: "",
      status: true,
    });

    setEditingId(null);
  };

  // =====================================================
  // LOAD GRADES
  // =====================================================

  const loadGrades = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/api/assessment/grade?schoolId=${schoolId}`,
      );

      setGrades(response.data || []);
    } catch (error) {
      console.log("Get Grades Error:", error);

      toast.error(error.response?.data || "Failed to load grades");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = () => {
    setSearchApplied(true);
  };

  // =====================================================
  // RESET FILTER
  // =====================================================

  const handleReset = () => {
    setFilters({
      session: "",
      grade: "",
      status: "",
    });

    setSearchApplied(false);
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (grade) => {
    setEditingId(grade.id);

    setFormData({
      schoolId: schoolId,
      session: grade.session || "",
      grade: grade.grade || "",
      remarks: grade.remarks || "",
      description: grade.description || "",
      minPercentage: grade.minPercentage ?? "",
      maxPercentage: grade.maxPercentage ?? "",
      gradePoint: grade.gradePoint ?? "",
      status: grade.status ?? true,
    });

    setShowAddGrade(true);
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this grade?",
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await axiosInstance.delete(
        `/api/assessment/grade/${id}?schoolId=${schoolId}`,
      );

      toast.success("Grade deleted successfully");

      await loadGrades();
    } catch (error) {
      console.log("Delete Grade Error:", error);

      toast.error(error.response?.data || "Failed to delete grade");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SAVE / UPDATE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.session) {
      toast.error("Please select session");
      return;
    }

    if (!formData.grade.trim()) {
      toast.error("Grade is required");
      return;
    }

    if (formData.minPercentage === "" || formData.maxPercentage === "") {
      toast.error("Percentage range is required");
      return;
    }

    const min = Number(formData.minPercentage);
    const max = Number(formData.maxPercentage);

    if (min < 0 || min > 100) {
      toast.error("Minimum percentage must be between 0 and 100");
      return;
    }

    if (max < 0 || max > 100) {
      toast.error("Maximum percentage must be between 0 and 100");
      return;
    }

    if (min >= max) {
      toast.error("Minimum percentage must be less than maximum percentage");
      return;
    }

    if (formData.gradePoint !== "" && Number(formData.gradePoint) < 0) {
      toast.error("Grade point cannot be negative");
      return;
    }

    if (!formData.remarks.trim()) {
      toast.error("Remarks is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        schoolId: schoolId,
        session: formData.session,
        grade: formData.grade.trim(),
        remarks: formData.remarks.trim(),
        description: formData.description.trim(),
        minPercentage: min,
        maxPercentage: max,
        gradePoint:
          formData.gradePoint === "" ? null : Number(formData.gradePoint),
        status: formData.status,
      };

      if (editingId) {
        await axiosInstance.put(`/api/assessment/grade/${editingId}`, payload);

        toast.success("Grade updated successfully");
      } else {
        await axiosInstance.post("/api/assessment/grade", payload);

        toast.success("Grade added successfully");
      }

      await loadGrades();

      resetForm();
      setShowAddGrade(false);
    } catch (error) {
      console.log("Grade Save/Update Error:", error);

      toast.error(
        error.response?.data ||
          (editingId ? "Failed to update grade" : "Failed to add grade"),
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FILTERED GRADES
  // =====================================================

  const filteredGrades = grades.filter((grade) => {
    if (!searchApplied) {
      return true;
    }

    const sessionMatch = !filters.session || grade.session === filters.session;

    const gradeMatch =
      !filters.grade ||
      grade.grade?.toLowerCase().includes(filters.grade.toLowerCase());

    const statusMatch =
      filters.status === "" || String(grade.status) === filters.status;

    return sessionMatch && gradeMatch && statusMatch;
  });

  // =====================================================
  // COUNTS
  // =====================================================

  const activeCount = grades.filter((item) => item.status).length;

  const inactiveCount = grades.filter((item) => !item.status).length;

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadGrades();
  }, []);

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="pb-4">
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
                  <MdOutlineAssessment size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">Grade Management</h5>

                  <div className="text-muted small">
                    Assessment &nbsp;/ &nbsp; Grade Management
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
                  Academic Assessment
                </span>

                {/* {savedMarks?.status && (
                        <span
                          className={`badge rounded-pill px-3 py-2 ${
                            savedMarks.status ===
                            "GENERATED"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {savedMarks.status}
                        </span>
                      )} */}
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
              Home &nbsp;›&nbsp; Assessment &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">Grade Management</span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          INFO BANNER
      ===================================================== */}

      <div
        className="mx-2 mt-3 shadow"
        style={{
          background: "linear-gradient(90deg, #eff6ff, #f8fbff)",
          border: "1px solid #dbeafe",
          borderRadius: "10px",
          padding: "12px 15px",
        }}
      >
        <div className="d-flex align-items-start gap-2">
          <div
            className="d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "7px",
              background: "#dbeafe",
              color: "#2563eb",
            }}
          >
            <MdErrorOutline size={20} />
          </div>

          <div>
            <div className="fw-semibold text-primary">Grade Configuration</div>

            <small className="text-muted">
              Define percentage ranges, grade points and remarks used for
              automatic student grading.
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 mt-3 px-2">
        <div className="col-xl-4 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <LuNotebookText />
            </div>

            <div className="stat-content">
              <span>Total Grades</span>

              <h3>{grades.length}</h3>

              <small>All Grading Rules</small>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <GiCheckMark />
            </div>

            <div className="stat-content">
              <span>Active Grades</span>

              <h3>{activeCount}</h3>

              <small>Currentyly active</small>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6">
          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <TbExclamationMark />
            </div>

            <div className="stat-content">
              <span>Inactive Grades</span>

              <h3>{inactiveCount}</h3>

              <small>Currently inactive</small>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-2 mt-3">
        <div className="card border-0 shadow rounded-4" >
          <div
            className="card-header bg-white"
            style={{
              borderBottom: "1px solid #edf2f7",
              borderRadius: "10px 10px 0 0",
            }}
          >
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center me-2"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "7px",
                  background: "#eaf2ff",
                  color: "#2563eb",
                }}
              >
                <CiSearch size={19} />
              </div>

              <div>
                <h6 className="mb-0 fw-semibold">Filter Grades</h6>

                <small className="text-muted">Search grading rules</small>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-3">
              {/* SESSION */}

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold small">Session</label>

                <select
                  name="session"
                  className="form-select"
                  value={filters.session}
                  onChange={handleFilterChange}
                >
                  <option value="">
                    <LuNotebookText size={18} /> All Sessions
                  </option>

                  {sessions?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* GRADE */}

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold small">Grade</label>

                <input
                  type="text"
                  name="grade"
                  className="form-control"
                  placeholder="Search grade e.g. A+"
                  value={filters.grade}
                  onChange={handleFilterChange}
                />
              </div>

              {/* STATUS */}

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold small">Status</label>

                <select
                  name="status"
                  className="form-select"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All Status</option>

                  <option value="true">Active</option>

                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            <div
              className="d-flex flex-wrap justify-content-between align-items-center mt-4 pt-3"
              style={{
                borderTop: "1px solid #eef2f7",
              }}
            >
              <small className="text-muted">
                <span className="text-danger">*</span> Required fields
              </small>

              <div className="d-flex gap-2 mt-2 mt-md-0">
                <button
                  type="button"
                  className="btn btn-light border px-3"
                  onClick={handleReset}
                >
                  <RiResetLeftLine className="me-1" />
                  Reset
                </button>

                <button
                  type="button"
                  className="btn px-4"
                  style={{
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    border: 0,
                    boxShadow: "0 5px 15px rgba(37,99,235,.20)",
                  }}
                  onClick={handleSearch}
                  disabled={loading}
                >
                  <IoMdSearch size={19} className="me-1" />

                  {loading ? "Loading..." : "Search"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

     
<div className="container-fluid mt-3 px-2">
  <div className="row g-3 ">

    {/* =================================================
        GRADE LIST
    ================================================= */}

    <div className={showAddGrade ? "col-12 col-xl-8" : "col-12"}>
      <div
        className="card border-0 shadow h-100"
        style={{
          borderRadius: "14px",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >

        {/* HEADER */}
        <div
          className="card-header bg-white border-0 px-3 px-md-4 py-3"
          style={{
            borderBottom: "1px solid #eef2f7",
          }}
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

            <div className="d-flex align-items-center">

              <div
                className="d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "11px",
                  background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                  color: "#2563eb",
                  border: "1px solid #dbeafe",
                }}
              >
                <LuNotebookText size={21} />
              </div>

              <div>
                <h6
                  className="mb-1 fw-bold"
                  style={{ color: "#172033" }}
                >
                  Grade List
                </h6>

                <small style={{ color: "#718096" }}>
                  Manage percentage based grading rules
                </small>
              </div>

            </div>

            <div className="d-flex align-items-center gap-2">

              <span
                className="px-3 py-2 rounded-pill"
                style={{
                  background: "#f5f8ff",
                  color: "#2563eb",
                  border: "1px solid #e2eaff",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {filteredGrades.length} Rules
              </span>

              {!showAddGrade && (
                <button
                  className="btn btn-primary btn-sm px-3 py-2"
                  onClick={() => {
                    resetForm();
                    setShowAddGrade(true);
                  }}
                  style={{
                    borderRadius: "8px",
                    fontWeight: "600",
                    boxShadow: "0 4px 10px rgba(37, 99, 235, 0.18)",
                  }}
                >
                  <FaPlus size={13} className="me-1" />
                  Add Grade
                </button>
              )}

              {showAddGrade && (
                <button
                  className="btn btn-light btn-sm px-3 py-2"
                  onClick={() => {
                    resetForm();
                    setShowAddGrade(false);
                  }}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    color: "#475569",
                    fontWeight: "600",
                  }}
                >
                  <IoCloseSharp size={18} className="me-1" />
                  Close
                </button>
              )}

            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="card-body p-0">

          <div className="table-responsive">
            <table
              className="table align-middle mb-0"
              style={{ minWidth: "850px" }}
            >

              <thead
                style={{
                  background: "#f8fafc",
                  borderBottom: "1px solid #e8edf4",
                }}
              >
                <tr>

                  <th
                    className="px-3 py-3 small fw-semibold"
                    style={{ color: "#64748b" }}
                  >
                    S.No
                  </th>

                  <th
                    className="py-3 small fw-semibold"
                    style={{ color: "#64748b" }}
                  >
                    Grade
                  </th>

                  <th
                    className="py-3 small fw-semibold"
                    style={{ color: "#64748b" }}
                  >
                    Description
                  </th>

                  <th
                    className="py-3 small fw-semibold text-center"
                    style={{ color: "#64748b" }}
                  >
                    Range
                  </th>

                  <th
                    className="py-3 small fw-semibold text-center"
                    style={{ color: "#64748b" }}
                  >
                    Point
                  </th>

                  <th
                    className="py-3 small fw-semibold"
                    style={{ color: "#64748b" }}
                  >
                    Remarks
                  </th>

                  <th
                    className="py-3 small fw-semibold text-center"
                    style={{ color: "#64748b" }}
                  >
                    Status
                  </th>

                  <th
                    className="py-3 small fw-semibold text-center"
                    style={{ color: "#64748b" }}
                  >
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td colSpan="8" className="text-center py-5">

                      <div className="d-flex flex-column align-items-center">

                        <div
                          className="spinner-border spinner-border-sm text-primary mb-2"
                          role="status"
                        />

                        <small className="text-muted">
                          Loading grading rules...
                        </small>

                      </div>

                    </td>
                  </tr>

                ) : filteredGrades.length > 0 ? (

                  filteredGrades.map((grade, index) => (

                    <tr
                      key={grade.id}
                      style={{
                        borderBottom: "1px solid #f0f3f7",
                      }}
                    >

                      {/* S.NO */}
                      <td className="px-3">

                        <span
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "7px",
                            background: "#f8fafc",
                            color: "#64748b",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {index + 1}
                        </span>

                      </td>

                      {/* GRADE */}
                      <td>

                        <div className="d-flex align-items-center gap-2">

                          <span
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "10px",
                              background:
                                "linear-gradient(135deg, #eff6ff, #dbeafe)",
                              color: "#2563eb",
                              border: "1px solid #dbeafe",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "800",
                              fontSize: "14px",
                            }}
                          >
                            {grade.grade}
                          </span>

                        </div>

                      </td>

                      {/* DESCRIPTION */}
                      <td>

                        <div
                          style={{
                            maxWidth: "190px",
                            whiteSpace: "normal",
                            color: "#334155",
                            fontSize: "13px",
                            lineHeight: "1.5",
                          }}
                        >
                          {grade.description || (
                            <span className="text-muted">No description</span>
                          )}
                        </div>

                      </td>

                      {/* RANGE */}
                      <td className="text-center">

                        <div
                          className="fw-bold"
                          style={{
                            color: "#1e293b",
                            fontSize: "13px",
                          }}
                        >
                          {grade.minPercentage}% – {grade.maxPercentage}%
                        </div>

                        <small
                          style={{
                            color: "#94a3b8",
                            fontSize: "11px",
                          }}
                        >
                          Percentage Range
                        </small>

                      </td>

                      {/* POINT */}
                      <td className="text-center">

                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "38px",
                            height: "30px",
                            padding: "0 8px",
                            borderRadius: "7px",
                            background: "#f0f7ff",
                            color: "#2563eb",
                            fontWeight: "700",
                            fontSize: "13px",
                          }}
                        >
                          {grade.gradePoint ?? "-"}
                        </span>

                      </td>

                      {/* REMARKS */}
                      <td>

                        <span
                          style={{
                            color: "#475569",
                            fontSize: "13px",
                          }}
                        >
                          {grade.remarks || "-"}
                        </span>

                      </td>

                      {/* STATUS */}
                      <td className="text-center">

                        {grade.status ? (

                          <span
                            className="d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill"
                            style={{
                              background: "#ecfdf5",
                              color: "#15803d",
                              border: "1px solid #bbf7d0",
                              fontSize: "11px",
                              fontWeight: "700",
                            }}
                          >
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "#22c55e",
                              }}
                            />
                            Active
                          </span>

                        ) : (

                          <span
                            className="d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill"
                            style={{
                              background: "#fff1f2",
                              color: "#dc2626",
                              border: "1px solid #fecdd3",
                              fontSize: "11px",
                              fontWeight: "700",
                            }}
                          >
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "#ef4444",
                              }}
                            />
                            Inactive
                          </span>

                        )}

                      </td>

                      {/* ACTION */}
                      <td>

                        <div className="d-flex justify-content-center gap-2">

                          <button
                            type="button"
                            title="Edit Grade"
                            onClick={() => handleEdit(grade)}
                            style={{
                              width: "34px",
                              height: "34px",
                              borderRadius: "8px",
                              border: "1px solid #dbeafe",
                              background: "#eff6ff",
                              color: "#2563eb",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <MdModeEdit size={17} />
                          </button>

                          <button
                            type="button"
                            title="Delete Grade"
                            onClick={() => handleDelete(grade.id)}
                            style={{
                              width: "34px",
                              height: "34px",
                              borderRadius: "8px",
                              border: "1px solid #fecdd3",
                              background: "#fff1f2",
                              color: "#dc2626",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <RiDeleteBin6Line size={17} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan="8" className="text-center py-5">

                      <div className="d-flex flex-column align-items-center">

                        <div
                          className="d-flex align-items-center justify-content-center mb-3"
                          style={{
                            width: "58px",
                            height: "58px",
                            borderRadius: "14px",
                            background: "#f8fafc",
                            color: "#94a3b8",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          <LuNotebookText size={26} />
                        </div>

                        <h6
                          className="mb-1 fw-semibold"
                          style={{ color: "#334155" }}
                        >
                          No Grades Found
                        </h6>

                        <small className="text-muted">
                          No grading rules match your current filters.
                        </small>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>
          </div>

        </div>

        {/* TABLE FOOTER */}
        {filteredGrades.length > 0 && (
          <div
            className="px-3 py-2"
            style={{
              background: "#fbfcfe",
              borderTop: "1px solid #eef2f7",
            }}
          >
            <small className="text-muted">
              Showing{" "}
              <span className="fw-semibold text-dark">
                {filteredGrades.length}
              </span>{" "}
              grading rule{filteredGrades.length !== 1 ? "s" : ""}
            </small>
          </div>
        )}

      </div>
    </div>


    {/* =================================================
        ADD / EDIT FORM
    ================================================= */}

    {showAddGrade && (

      <div className="col-12 col-xl-4">

        <div
          className="card border-0 shadow h-100"
          style={{
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >

          {/* FORM HEADER */}

          <div
            className="card-header bg-white border-0 px-3 px-md-4 py-3"
            style={{
              borderBottom: "1px solid #eef2f7",
            }}
          >

            <div className="d-flex justify-content-between align-items-center">

              <div className="d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "11px",
                    background:
                      "linear-gradient(135deg, #eff6ff, #dbeafe)",
                    color: "#2563eb",
                    border: "1px solid #dbeafe",
                  }}
                >

                  {editingId ? (
                    <MdModeEdit size={21} />
                  ) : (
                    <MdAssignment size={21} />
                  )}

                </div>

                <div>

                  <h6
                    className="mb-1 fw-bold"
                    style={{ color: "#172033" }}
                  >
                    {editingId ? "Edit Grade" : "Add Grade"}
                  </h6>

                  <small style={{ color: "#718096" }}>
                    {editingId
                      ? "Update existing grading rule"
                      : "Create a new grading rule"}
                  </small>

                </div>

              </div>

              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  resetForm();
                  setShowAddGrade(false);
                }}
              />

            </div>

          </div>


          {/* FORM BODY */}

          <div className="card-body p-3 p-md-4">

            {/* SESSION */}

            <div className="mb-3">

              <label className="form-label small fw-semibold text-dark">
                Session <span className="text-danger">*</span>
              </label>

              <select
                className="form-select"
                name="session"
                value={formData.session}
                onChange={handleChange}
                style={{
                  borderRadius: "8px",
                  borderColor: "#dce3ec",
                  fontSize: "14px",
                }}
              >

                <option value="">Select Session</option>

                {sessions?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}

              </select>

            </div>


            {/* GRADE */}

            <div className="mb-3">

              <label className="form-label small fw-semibold text-dark">
                Grade <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="e.g. A+"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                style={{
                  borderRadius: "8px",
                  borderColor: "#dce3ec",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              />

            </div>


            {/* MIN MAX */}

            <div className="row g-2">

              <div className="col-6 mb-3">

                <label className="form-label small fw-semibold text-dark">
                  Minimum %
                  <span className="text-danger"> *</span>
                </label>

                <div className="input-group">

                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    className="form-control"
                    placeholder="90"
                    name="minPercentage"
                    value={formData.minPercentage}
                    onChange={handleChange}
                    style={{
                      borderRadius: "8px 0 0 8px",
                      borderColor: "#dce3ec",
                    }}
                  />

                  <span
                    className="input-group-text"
                    style={{
                      background: "#f8fafc",
                      borderColor: "#dce3ec",
                    }}
                  >
                    %
                  </span>

                </div>

              </div>


              <div className="col-6 mb-3">

                <label className="form-label small fw-semibold text-dark">
                  Maximum %
                  <span className="text-danger"> *</span>
                </label>

                <div className="input-group">

                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    className="form-control"
                    placeholder="100"
                    name="maxPercentage"
                    value={formData.maxPercentage}
                    onChange={handleChange}
                    style={{
                      borderRadius: "8px 0 0 8px",
                      borderColor: "#dce3ec",
                    }}
                  />

                  <span
                    className="input-group-text"
                    style={{
                      background: "#f8fafc",
                      borderColor: "#dce3ec",
                    }}
                  >
                    %
                  </span>

                </div>

              </div>

            </div>


            {/* RANGE PREVIEW */}

            {formData.minPercentage !== "" &&
              formData.maxPercentage !== "" && (

                <div
                  className="mb-3 p-3"
                  style={{
                    borderRadius: "10px",
                    background:
                      "linear-gradient(135deg, #f8fbff, #eff6ff)",
                    border: "1px solid #dbeafe",
                  }}
                >

                  <div className="d-flex justify-content-between align-items-center mb-2">

                    <small
                      className="fw-semibold"
                      style={{ color: "#64748b" }}
                    >
                      Grade Preview
                    </small>

                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#2563eb",
                      }}
                    />

                  </div>

                  <div className="d-flex align-items-center justify-content-between">

                    <div>

                      <div
                        className="fw-bold"
                        style={{
                          color: "#2563eb",
                          fontSize: "18px",
                        }}
                      >
                        {formData.grade || "Grade"}
                      </div>

                      <small className="text-muted">
                        Grade Level
                      </small>

                    </div>

                    <div className="text-end">

                      <div
                        className="fw-bold"
                        style={{
                          color: "#1e293b",
                          fontSize: "14px",
                        }}
                      >
                        {formData.minPercentage}% –{" "}
                        {formData.maxPercentage}%
                      </div>

                      <small className="text-muted">
                        Score Range
                      </small>

                    </div>

                  </div>

                </div>

              )}


            {/* GRADE POINT */}

            <div className="mb-3">

              <label className="form-label small fw-semibold text-dark">
                Grade Point
              </label>

              <input
                type="number"
                min="0"
                step="0.1"
                className="form-control"
                placeholder="e.g. 10"
                name="gradePoint"
                value={formData.gradePoint}
                onChange={handleChange}
                style={{
                  borderRadius: "8px",
                  borderColor: "#dce3ec",
                }}
              />

            </div>


            {/* REMARKS */}

            <div className="mb-3">

              <label className="form-label small fw-semibold text-dark">
                Remarks <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="e.g. Outstanding"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                style={{
                  borderRadius: "8px",
                  borderColor: "#dce3ec",
                }}
              />

            </div>


            {/* DESCRIPTION */}

            <div className="mb-3">

              <label className="form-label small fw-semibold text-dark">
                Description
              </label>

              <textarea
                className="form-control"
                rows="3"
                maxLength={255}
                placeholder="Enter grade description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{
                  borderRadius: "8px",
                  borderColor: "#dce3ec",
                  resize: "none",
                }}
              />

              <div className="d-flex justify-content-between mt-1">

                <small className="text-muted">
                  Maximum 255 characters
                </small>

                <small
                  className={
                    formData.description.length >= 255
                      ? "text-danger"
                      : "text-muted"
                  }
                >
                  {formData.description.length}/255
                </small>

              </div>

            </div>


            {/* STATUS */}

            <div className="mb-3">

              <label className="form-label small fw-semibold text-dark">
                Status <span className="text-danger">*</span>
              </label>

              <select
                className="form-select"
                name="status"
                value={String(formData.status)}
                onChange={handleChange}
                style={{
                  borderRadius: "8px",
                  borderColor: "#dce3ec",
                }}
              >

                <option value="true">
                  Active
                </option>

                <option value="false">
                  Inactive
                </option>

              </select>

            </div>


            <hr
              style={{
                borderColor: "#edf2f7",
                margin: "18px 0",
              }}
            />


            {/* BUTTONS */}

            <div className="d-flex justify-content-end gap-2">

              <button
                type="button"
                className="btn btn-light btn-sm px-3"
                onClick={() => {
                  resetForm();
                  setShowAddGrade(false);
                }}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  color: "#475569",
                  fontWeight: "600",
                }}
              >
                <IoCloseSharp size={18} className="me-1" />
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-primary btn-sm px-3"
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  borderRadius: "8px",
                  fontWeight: "600",
                  minWidth: "120px",
                  boxShadow:
                    "0 4px 10px rgba(37, 99, 235, 0.18)",
                }}
              >

                {loading ? (

                  <span>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                    />

                    {editingId
                      ? "Updating..."
                      : "Saving..."}
                  </span>

                ) : (

                  <>
                    {editingId ? (
                      <MdModeEdit className="me-1" />
                    ) : (
                      <MdAssignment className="me-1" />
                    )}

                    {editingId
                      ? "Update Grade"
                      : "Save Grade"}
                  </>

                )}

              </button>

            </div>

          </div>
        </div>
      </div>
    )}

  </div>
</div>



      {/* =====================================================
          BOTTOM INFORMATION
      ===================================================== */}

      <div
        className="mx-2 mt-3 shadow"
        style={{
          background: "linear-gradient(90deg, #eff6ff, #f8fbff)",
          border: "1px solid #dbeafe",
          borderRadius: "10px",
          padding: "14px 16px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="d-flex align-items-center mb-1">
              <div
                className="d-flex align-items-center justify-content-center me-2"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "7px",
                  background: "#dbeafe",
                  color: "#2563eb",
                }}
              >
                <TbBulb size={18} />
              </div>

              <h6 className="mb-0 fw-semibold">About Grade Management</h6>
            </div>

            <small className="text-muted">
              Define percentage ranges and automatically assign grades and grade
              points based on student performance.
            </small>

            <div className="mt-2">
              <small className="text-primary">
                <TbBulb size={17} className="me-1" />
                Example: 90–100% = A+, 80–89% = A, 70–79% = B+.
              </small>
            </div>
          </div>

          <div
            className="d-none d-md-flex align-items-center justify-content-center"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "12px",
              background: "#eaf2ff",
              color: "#2563eb",
            }}
          >
            <FaRegEye size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeManagement;
