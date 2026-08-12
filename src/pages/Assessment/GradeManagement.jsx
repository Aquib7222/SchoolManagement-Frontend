

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
//               <div className="border rounded p-3 h-100 shadow-sm">

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

import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { LuNotebookText } from "react-icons/lu";
import { MdErrorOutline, MdModeEdit } from "react-icons/md";
import {
  RiDeleteBin6Line,
  RiResetLeftLine,
} from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";

import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";

const GradeManagement = () => {
  const { sessions } = useMasters();

  const schoolId = JSON.parse(
    localStorage.getItem("schoolId")
  );

  // =====================================================
  // STATES
  // =====================================================

  const [showAddGrade, setShowAddGrade] = useState(false);

  const [grades, setGrades] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [searchApplied, setSearchApplied] = useState(false);

  // =====================================================
  // FILTERS
  // =====================================================

  const [filters, setFilters] = useState({
    session: "",
    grade: "",
    status: "",
  });

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    schoolId: schoolId,
    session: "",
    grade: "",
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
          : [
                "minPercentage",
                "maxPercentage",
                "gradePoint",
              ].includes(name)
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
        `/api/assessment/grade?schoolId=${schoolId}`
      );

      console.log("Grades:", response.data);

      setGrades(response.data || []);
    } catch (error) {
      console.log("Get Grades Error:", error);

      toast.error(
        error.response?.data ||
          "Failed to load grades"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = () => {
    setSearchApplied(true);

    console.log("Grade Filters:", filters);
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
    console.log("Edit Grade:", grade);

    setEditingId(grade.id);

    setFormData({
      schoolId: schoolId,
      session: grade.session || "",
      grade: grade.grade || "",
      description: grade.description || "",
      minPercentage:
        grade.minPercentage ?? "",
      maxPercentage:
        grade.maxPercentage ?? "",
      gradePoint:
        grade.gradePoint ?? "",
      status: grade.status ?? true,
    });

    setShowAddGrade(true);
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this grade?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      console.log("Deleting Grade ID:", id);

      await axiosInstance.delete(
        `/api/assessment/grade/${id}?schoolId=${schoolId}`
      );

      toast.success(
        "Grade deleted successfully"
      );

      await loadGrades();
    } catch (error) {
      console.log(
        "Delete Grade Error:",
        error
      );

      console.log(
        "Status:",
        error.response?.status
      );

      console.log(
        "Response:",
        error.response?.data
      );

      toast.error(
        error.response?.data ||
          "Failed to delete grade"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SAVE / UPDATE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ===================================================
    // VALIDATION
    // ===================================================

    if (!formData.session) {
      toast.error("Please select session");
      return;
    }

    if (!formData.grade.trim()) {
      toast.error("Grade is required");
      return;
    }

    if (
      formData.minPercentage === "" ||
      formData.maxPercentage === ""
    ) {
      toast.error(
        "Percentage range is required"
      );
      return;
    }

    const min =
      Number(formData.minPercentage);

    const max =
      Number(formData.maxPercentage);

    // Min validation
    if (min < 0 || min > 100) {
      toast.error(
        "Minimum percentage must be between 0 and 100"
      );
      return;
    }

    // Max validation
    if (max < 0 || max > 100) {
      toast.error(
        "Maximum percentage must be between 0 and 100"
      );
      return;
    }

    // Range validation
    if (min >= max) {
      toast.error(
        "Minimum percentage must be less than maximum percentage"
      );
      return;
    }

    // Grade point validation
    if (
      formData.gradePoint !== "" &&
      Number(formData.gradePoint) < 0
    ) {
      toast.error(
        "Grade point cannot be negative"
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        schoolId: schoolId,
        session: formData.session,
        grade: formData.grade.trim(),
        description:
          formData.description.trim(),
        minPercentage: min,
        maxPercentage: max,
        gradePoint:
          formData.gradePoint === ""
            ? null
            : Number(formData.gradePoint),
        status: formData.status,
      };

      console.log(
        "========== GRADE PAYLOAD =========="
      );

      console.log(
        JSON.stringify(
          payload,
          null,
          2
        )
      );

      console.log(
        "==================================="
      );

      // =================================================
      // UPDATE
      // =================================================

      if (editingId) {
        const response =
          await axiosInstance.put(
            `/api/assessment/grade/${editingId}`,
            payload
          );

        console.log(
          "Grade Updated:",
          response.data
        );

        toast.success(
          "Grade updated successfully"
        );
      }

      // =================================================
      // ADD
      // =================================================

      else {
        const response =
          await axiosInstance.post(
            "/api/assessment/grade",
            payload
          );

        console.log(
          "Grade Added:",
          response.data
        );

        toast.success(
          "Grade added successfully"
        );
      }

      // Reload grades

      await loadGrades();

      // Reset form

      resetForm();

      // Close form

      setShowAddGrade(false);
    } catch (error) {
      console.log(
        "Grade Save/Update Error:",
        error
      );

      console.log(
        "Status:",
        error.response?.status
      );

      console.log(
        "Response:",
        error.response?.data
      );

      toast.error(
        error.response?.data ||
          (editingId
            ? "Failed to update grade"
            : "Failed to add grade")
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FILTERED GRADES
  // =====================================================

  const filteredGrades = grades.filter(
    (grade) => {
      // Search button press nahi hua
      // to saare grades dikhao

      if (!searchApplied) {
        return true;
      }

      // Session

      const sessionMatch =
        !filters.session ||
        grade.session ===
          filters.session;

      // Grade

      const gradeMatch =
        !filters.grade ||
        grade.grade
          ?.toLowerCase()
          .includes(
            filters.grade.toLowerCase()
          );

      // Status

      const statusMatch =
        filters.status === "" ||
        String(grade.status) ===
          filters.status;

      return (
        sessionMatch &&
        gradeMatch &&
        statusMatch
      );
    }
  );

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
    <>
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="row shadow-lg"
        style={{
          backgroundColor: "white",
          margin: "10px",
          minHeight: "70px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6 className="mb-1">
          <LuNotebookText className="me-2" />

          Grade Management
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
                <small>
                  Home
                </small>
              </a>
            </li>

            <li className="breadcrumb-item">
              <small>
                Assessment
              </small>
            </li>

            <li className="breadcrumb-item active">
              <small>
                Grade Management
              </small>
            </li>
          </ol>
        </nav>
      </div>

      {/* =================================================
          INFORMATION ALERT
      ================================================= */}

      <div
        className="ms-2 me-2 mt-2 alert p-2 rounded shadow"
        style={{
          backgroundColor: "#ebfffd",
        }}
      >
        <small>
          <MdErrorOutline
            size={20}
            className="me-2"
          />

          Manage grading rules used to
          automatically assign grades based
          on student marks and percentage.
        </small>
      </div>

      {/* =================================================
          FILTER SECTION
      ================================================= */}

      <div className="ms-2 me-2 mt-3 rounded shadow bg-white p-3">
        <div className="row g-3">

          {/* SESSION */}

          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-label">
              Session
            </label>

            <select
              name="session"
              className="form-select"
              value={filters.session}
              onChange={
                handleFilterChange
              }
            >
              <option value="">
                All
              </option>

              {sessions?.map(
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

          {/* GRADE */}

          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-label">
              Grade
            </label>

            <input
              type="text"
              name="grade"
              className="form-control"
              placeholder="e.g. A+"
              value={filters.grade}
              onChange={
                handleFilterChange
              }
            />
          </div>

          {/* STATUS */}

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label">
              Status
            </label>

            <select
              name="status"
              className="form-select"
              value={filters.status}
              onChange={
                handleFilterChange
              }
            >
              <option value="">
                All
              </option>

              <option value="true">
                Active
              </option>

              <option value="false">
                Inactive
              </option>
            </select>
          </div>

          {/* SEARCH */}

          <div className="col-12 col-sm-4 col-lg-2">
            <button
              type="button"
              className="btn btn-success w-100 mt-4"
              onClick={
                handleSearch
              }
            >
              <CiSearch
                size={20}
                className="me-1"
              />

              Search
            </button>
          </div>

          {/* RESET */}

          <div className="col-12 col-sm-4 col-lg-2">
            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-4"
              onClick={
                handleReset
              }
            >
              <RiResetLeftLine className="me-1" />

              Reset
            </button>
          </div>
        </div>

        {/* ADD BUTTON */}

        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                resetForm();
                setShowAddGrade(true);
              }}
            >
              <FaPlus className="me-1" />

              Add Grade
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
          MAIN SECTION
      ================================================= */}

      <div className="ms-2 me-2 bg-white mt-3 rounded shadow p-3">
        <div className="row g-3">

          {/* =================================================
              GRADE LIST
          ================================================= */}

          <div
            className={
              showAddGrade
                ? "col-12 col-lg-8"
                : "col-12"
            }
          >
            <div className="d-flex justify-content-between align-items-center mb-3">

              <h6 className="mb-0">
                <LuNotebookText className="me-2" />

                Grade List
              </h6>

              {showAddGrade && (
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    resetForm();
                    setShowAddGrade(
                      false
                    );
                  }}
                >
                  Close
                </button>
              )}
            </div>

            {/* TABLE */}

            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle mb-0">

                <thead className="table-info">
                  <tr>
                    <th>
                      #
                    </th>

                    <th>
                      Grade
                    </th>

                    <th>
                      Description
                    </th>

                    <th>
                      Min %
                    </th>

                    <th>
                      Max %
                    </th>

                    <th>
                      Grade Point
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {loading ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-4"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : filteredGrades.length >
                    0 ? (
                    filteredGrades.map(
                      (
                        grade,
                        index
                      ) => (
                        <tr
                          key={
                            grade.id
                          }
                        >

                          {/* NUMBER */}

                          <td>
                            {index + 1}
                          </td>

                          {/* GRADE */}

                          <td>
                            <span className="badge bg-primary">
                              {
                                grade.grade
                              }
                            </span>
                          </td>

                          {/* DESCRIPTION */}

                          <td>
                            {grade.description ||
                              "-"}
                          </td>

                          {/* MIN */}

                          <td>
                            {
                              grade.minPercentage
                            }
                            %
                          </td>

                          {/* MAX */}

                          <td>
                            {
                              grade.maxPercentage
                            }
                            %
                          </td>

                          {/* GRADE POINT */}

                          <td>
                            {
                              grade.gradePoint ??
                              "-"
                            }
                          </td>

                          {/* STATUS */}

                          <td>
                            {grade.status ? (
                              <span className="badge bg-success">
                                Active
                              </span>
                            ) : (
                              <span className="badge bg-danger">
                                Inactive
                              </span>
                            )}
                          </td>

                          {/* ACTION */}

                          <td>
                            <div className="d-flex align-items-center">

                              {/* EDIT */}

                              <MdModeEdit
                                size={20}
                                className="text-primary me-3"
                                style={{
                                  cursor:
                                    "pointer",
                                }}
                                title="Edit"
                                onClick={() =>
                                  handleEdit(
                                    grade
                                  )
                                }
                              />

                              {/* DELETE */}

                              <RiDeleteBin6Line
                                size={20}
                                className="text-danger"
                                style={{
                                  cursor:
                                    "pointer",
                                }}
                                title="Delete"
                                onClick={() =>
                                  handleDelete(
                                    grade.id
                                  )
                                }
                              />

                            </div>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center text-muted py-5"
                      >
                        No grades found.
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>
          </div>

          {/* =================================================
              ADD / EDIT GRADE
          ================================================= */}

          {showAddGrade && (
            <div className="col-12 col-lg-4">

              <div className="border rounded p-3 h-100 shadow-sm">

                {/* FORM HEADER */}

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <h6 className="mb-0">

                    {editingId ? (
                      <>
                        <MdModeEdit className="me-1" />

                        Edit Grade
                      </>
                    ) : (
                      <>
                        <FaPlus className="me-1" />

                        Add Grade
                      </>
                    )}

                  </h6>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      resetForm();

                      setShowAddGrade(
                        false
                      );
                    }}
                  ></button>
                </div>

                <hr />

                {/* =================================================
                    SESSION
                ================================================= */}

                <div className="mb-3">

                  <label className="form-label">
                    Session{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <select
                    className="form-select"
                    name="session"
                    value={
                      formData.session
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="">
                      Select Session
                    </option>

                    {sessions?.map(
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

                {/* =================================================
                    GRADE
                ================================================= */}

                <div className="mb-3">

                  <label className="form-label">
                    Grade{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. A+"
                    name="grade"
                    value={
                      formData.grade
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <div className="mb-3">

                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    className="form-control"
                    name="description"
                    rows="2"
                    placeholder="e.g. Outstanding performance"
                    value={
                      formData.description
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                {/* =================================================
                    MIN PERCENTAGE
                ================================================= */}

                <div className="mb-3">

                  <label className="form-label">
                    Minimum Percentage{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    className="form-control"
                    placeholder="e.g. 90"
                    name="minPercentage"
                    value={
                      formData.minPercentage
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                {/* =================================================
                    MAX PERCENTAGE
                ================================================= */}

                <div className="mb-3">

                  <label className="form-label">
                    Maximum Percentage{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    className="form-control"
                    placeholder="e.g. 100"
                    name="maxPercentage"
                    value={
                      formData.maxPercentage
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                {/* =================================================
                    GRADE POINT
                ================================================= */}

                <div className="mb-3">

                  <label className="form-label">
                    Grade Point
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="form-control"
                    placeholder="e.g. 10"
                    name="gradePoint"
                    value={
                      formData.gradePoint
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                {/* =================================================
                    STATUS
                ================================================= */}

                <div className="mb-3">

                  <label className="form-label">
                    Status
                  </label>

                  <select
                    className="form-select"
                    name="status"
                    value={String(
                      formData.status
                    )}
                    onChange={
                      handleChange
                    }
                  >

                    <option value="true">
                      Active
                    </option>

                    <option value="false">
                      Inactive
                    </option>

                  </select>

                </div>

                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="d-flex justify-content-end gap-2">

                  {/* CANCEL */}

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      resetForm();

                      setShowAddGrade(
                        false
                      );
                    }}
                  >
                    Cancel
                  </button>

                  {/* SAVE / UPDATE */}

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={
                      handleSubmit
                    }
                    disabled={
                      loading
                    }
                  >

                    {editingId ? (
                      <MdModeEdit className="me-1" />
                    ) : (
                      <FaPlus className="me-1" />
                    )}

                    {loading
                      ? editingId
                        ? "Updating..."
                        : "Saving..."
                      : editingId
                        ? "Update Grade"
                        : "Add Grade"}

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

export default GradeManagement;