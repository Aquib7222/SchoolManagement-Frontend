// import React, { useEffect, useState } from "react";
// import { FaRegEye } from "react-icons/fa6";
// import { IoCloseSharp } from "react-icons/io5";
// import { MdAssessment, MdAssignment, MdErrorOutline } from "react-icons/md";
// import { TbBulb } from "react-icons/tb";
// import { TiTick } from "react-icons/ti";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";
// import { toast } from "react-toastify";

// const AddAssessmentType = () => {
//   const { sessions, assessmentNature } = useMasters();
//   const schoolId = JSON.parse(localStorage.getItem("schoolId"));
//   const [categories, setCategories] = useState([]);
//   const [examTerms, setExamTerms] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     schoolId: schoolId,
//     typeName: "",
//     shortCode: "",
//     nature: "",
//     categoryId: "",
//     examTermId: "",
//     session: "",
//     maxMarks: "",
//     passingMarks: "",
//     weightage: "",
//     description: "",
//     displayOrder: "",
//     status: true,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "status"
//           ? value === "true"
//           : ["maxMarks", "passingMarks", "displayOrder"].includes(name)
//             ? value === ""
//               ? ""
//               : Number(value)
//             : name === "weightage"
//               ? value === ""
//                 ? ""
//                 : Number(value)
//               : value,
//     }));
//   };

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   const loadCategories = async () => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/assessment/category?schoolId=${schoolId}`,
//       );
//       setCategories(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   console.log("categories", categories);

//   useEffect(() => {
//     if (formData.session) {
//       loadExamTerms();
//     } else {
//       setExamTerms([]);
//     }
//   }, [formData.session]);

//   const loadExamTerms = async () => {
//     try {
//       const response = await axiosInstance.get(
//         `/api/assessment/exam-term?schoolId=${schoolId}&session=${formData.session}`,
//       );

//       setExamTerms(response.data);
//     } catch (error) {
//       console.log("Exam Term error :", error);
//     }
//   };

//   console.log("exam Terms", examTerms);

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const payload = {
//         ...formData,
//         schoolId: schoolId,
//       };

//       console.log("Assessment Type Payload:", payload);

//       const response = await axiosInstance.post(
//         "/api/assessment/type",
//         payload,
//       );

//       console.log("Saved:", response.data);

//       toast.success("Assessment Type added successfully");
//     } catch (error) {
//       console.log("Status:", error.response?.status);
//       console.log("Data:", error.response?.data);

//       toast.error(error.response?.data || "Failed to save assessment type");
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
//           <MdAssessment /> Add Assessment Type
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
//               <small>Add Assessment Type</small>
//             </li>
//           </ol>
//           {/* <button className='btn'>View Assessment Structure</button> */}
//         </nav>
//       </div>

//       {/* alert  */}
//       <div
//         className="ms-2 me-2  alert  p-2 rounded shadow"
//         style={{ backgroundColor: "#ebfffd" }}
//       >
//         <small>
//           <MdErrorOutline /> Create a new assessment type that will be available
//           in assessment setup.
//         </small>
//       </div>

//       <div className="container-fluid mt-3">
//         <div className="row g-2 align-items-stretch">
//           <div className="col-12 col-lg-8">
//             <div className="card shadow h-100">
//               <div className="card-header bg-white d-flex align-items-center">
//                 <h6>
//                   <MdAssignment size={20} /> Assessment Type Details
//                 </h6>
//               </div>
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Assessment Type Name{" "}
//                       <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="typeName"
//                       value={formData.typeName}
//                       onChange={handleChange}
//                       placeholder="Enter assessment type name"
//                     />
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Short Code <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="shortCode"
//                       value={formData.shortCode}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           shortCode: e.target.value.toUpperCase(),
//                         }))
//                       }
//                       placeholder="Enter short code"
//                     />
//                     <div className="">
//                       <small className="text-muted">
//                         Used for quick reference
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row mt-3">
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Assessment Category <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       name="categoryId"
//                       id="categoryId"
//                       className="form-select"
//                       value={formData.categoryId}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((category) => (
//                         <option key={category.id} value={category.id}>
//                           {category.categoryName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Assessment Nature <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       name="nature"
//                       id="nature"
//                       className="form-select"
//                       value={formData.nature}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select Nature</option>
//                       {assessmentNature.map((item) => (
//                         <option key={item.name} value={item.name}>
//                           {item.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="row mt-3">
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Sessions <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       name="session"
//                       id="session"
//                       className="form-select"
//                       value={formData.session}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select Session</option>
//                       {sessions.map((item) => (
//                         <option key={item} value={item}>
//                           {item}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Exam Term <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       name="examTermId"
//                       id="examTermId"
//                       className="form-select"
//                       value={formData.examTermId}
//                       onChange={handleChange}
//                       disabled={!formData.session}
//                     >
//                       <option value="">
//                         {formData.session
//                           ? "Select Exam Term"
//                           : "Select Session First"}
//                       </option>

//                       {examTerms.map((item) => (
//                         <option key={item.id} value={item.id}>
//                           {item.examTerm}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="row mt-3 ">
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Max Marks <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="maxMarks"
//                       value={formData.maxMarks}
//                       onChange={handleChange}
//                       placeholder="Enter maximum marks"
//                     />
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">Passing Marks (Optional)</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="passingMarks"
//                       value={formData.passingMarks}
//                       onChange={handleChange}
//                       placeholder="Enter passing marks"
//                     />
//                   </div>
//                 </div>

//                 <div className="row mt-3">
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Display Order <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="displayOrder"
//                       value={formData.displayOrder}
//                       onChange={handleChange}
//                       placeholder="Enter display order"
//                     />
//                     <div className="">
//                       <small className="text-muted">
//                         Used to sort in dropdowns
//                       </small>
//                     </div>
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Default Weightage % <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="weightage"
//                       value={formData.weightage}
//                       onChange={handleChange}
//                       placeholder="Enter weightage percentage"
//                     />
//                     <div className="">
//                       <small className="text-muted">
//                         Used in result weightage
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row mt-3">
//                   <div className="col-md-12">
//                     <label htmlFor="">Description (Optional) </label>
//                     <textarea
//                       className="form-control"
//                       maxLength={255}
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       placeholder="Enter description/instruction for this assessment type"
//                     />

//                     <div className="d-flex justify-content-between mt-1">
//                       <small className="text-muted">Max 255 characters</small>

//                       <small className="text-muted">
//                         {formData.description.length} / 255
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row mt-3">
//                   <div className="col-md-12">
//                     <label htmlFor="">
//                       Status <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       name="status"
//                       id="status"
//                       className="form-select w-25"
//                       value={String(formData.status)}
//                       onChange={handleChange}
//                     >
//                       <option value="true">Active</option>
//                       <option value="false">Inactive</option>
//                     </select>
//                   </div>
//                 </div>
//                 <hr />
//                 <div className="row mt-3 ">
//                   <div className="col-md-12 d-flex justify-content-end gap-2">
//                     <button className="btn btn-outline-dark btn-sm">
//                       <IoCloseSharp size={20} /> Cancel
//                     </button>
//                     <button
//                       className="btn btn-success btn-sm"
//                       onClick={handleSubmit}
//                       disabled={loading}
//                     >
//                       <MdAssignment size={18} />

//                       {loading ? " Saving..." : " Save assessment type"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-lg-4 d-flex flex-column">
//             <div className="card shadow  flex-fill mb-2 alert alert-primary ">
//               <h6>
//                 <MdErrorOutline size={25} /> Assessment Type Information
//               </h6>
//               <div className="card-body mt-0">
//                 <p>
//                   <small>
//                     Assessment type are used to categorize different evaluation
//                     in the school.
//                   </small>{" "}
//                 </p>
//                 <h6>Examples:</h6>
//                 <div>
//                   <h6>
//                     <TiTick size={20} />
//                     Unit Test{" "}
//                   </h6>
//                   <h6>
//                     <TiTick size={20} />
//                     Class Test{" "}
//                   </h6>
//                   <h6>
//                     <TiTick size={20} />
//                     Quiz{" "}
//                   </h6>
//                   <h6>
//                     <TiTick size={20} />
//                     Home work{" "}
//                   </h6>
//                   <h6>
//                     <TiTick size={20} />
//                     Mid Term Exam{" "}
//                   </h6>
//                   <h6>
//                     <TiTick size={20} />
//                     Term End Exam{" "}
//                   </h6>
//                   <h6>
//                     <TiTick size={20} />
//                     Practical Exam{" "}
//                   </h6>
//                   <h6>
//                     <TiTick size={20} />
//                     Oral / Viva{" "}
//                   </h6>
//                   <h6>
//                     <TiTick size={20} />
//                     Project / Assignment{" "}
//                   </h6>
//                   <h6>
//                     <TiTick size={20} />
//                     Etc{" "}
//                   </h6>
//                 </div>
//               </div>
//             </div>
//             {/* Bottom Card */}
//             <div className="card shadow flex-fill p-3">
//               <h6>
//                 <FaRegEye /> Preview
//               </h6>
//               <hr />
//               <div className="card-body">
//                 <h6>
//                   <small>Type Name : {formData.typeName || "-"}</small>
//                 </h6>

//                 <h6>
//                   <small>Short Code : {formData.shortCode || "-"}</small>
//                 </h6>

//                 <h6>
//                   <small>
//                     Category :{" "}
//                     {categories.find(
//                       (item) => String(item.id) === String(formData.categoryId),
//                     )?.categoryName || "-"}
//                   </small>
//                 </h6>

//                 <h6>
//                   <small>
//                     Nature :{" "}
//                     {assessmentNature.find(
//                       (item) => item.name === formData.nature,
//                     )?.displayName || "-"}
//                   </small>
//                 </h6>

//                 <h6>
//                   <small>Session : {formData.session || "-"}</small>
//                 </h6>

//                 <h6>
//                   <small>
//                     Exam Term :{" "}
//                     {examTerms.find(
//                       (item) => String(item.id) === String(formData.examTermId),
//                     )?.examTerm || "-"}
//                   </small>
//                 </h6>

//                 <h6>
//                   <small>Max Marks : {formData.maxMarks || "-"}</small>
//                 </h6>

//                 <h6>
//                   <small>Passing Marks : {formData.passingMarks || "-"}</small>
//                 </h6>

//                 <h6>
//                   <small>
//                     Weightage :{" "}
//                     {formData.weightage !== "" ? `${formData.weightage}%` : "-"}
//                   </small>
//                 </h6>

//                 <h6>
//                   <small>Display Order : {formData.displayOrder || "-"}</small>
//                 </h6>

//                 <h6>
//                   <small>
//                     Status : {formData.status ? "Active" : "Inactive"}
//                   </small>
//                 </h6>

//                 <div className="alert alert-warning p-1 mt-3">
//                   <small>
//                     <TbBulb size={20} /> Description :{" "}
//                     {formData.description || "-"}
//                   </small>
//                 </div>

//                 <div className="alert alert-warning p-1 mt-3">
//                   <small>
//                     <TbBulb size={20} /> This assessment type will be available
//                     in Assessment setup once saved.
//                   </small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddAssessmentType;


import React, { useEffect, useMemo, useState } from "react";
import { FaRegEye, FaCheckCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import {
  MdAssessment,
  MdAssignment,
  MdErrorOutline,
  MdInfoOutline,
  MdOutlineAssessment,
  MdOutlineSchool,
} from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const AddAssessmentType = () => {
  const navigate = useNavigate();
  const { sessions = [], assessmentNature = [] } = useMasters();

  const schoolId = JSON.parse(localStorage.getItem("schoolId"));

  const [categories, setCategories] = useState([]);
  const [examTerms, setExamTerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingExamTerms, setLoadingExamTerms] = useState(false);

  const [formData, setFormData] = useState({
    schoolId: schoolId,
    typeName: "",
    shortCode: "",
    nature: "",
    categoryId: "",
    examTermId: "",
    session: "",
    maxMarks: "",
    passingMarks: "",
    weightage: "",
    description: "",
    displayOrder: "",
    status: true,
  });

  /* =========================================================
     LOAD CATEGORIES
  ========================================================= */

  useEffect(() => {
    if (schoolId) {
      loadCategories();
    }
  }, [schoolId]);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);

      const res = await axiosInstance.get(
        `/api/assessment/category?schoolId=${schoolId}`
      );

      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Category Error:", error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load assessment categories"
      );
    } finally {
      setLoadingCategories(false);
    }
  };

  /* =========================================================
     LOAD EXAM TERMS WHEN SESSION CHANGES
  ========================================================= */

  useEffect(() => {
    if (formData.session) {
      loadExamTerms(formData.session);
    } else {
      setExamTerms([]);
      setFormData((prev) => ({
        ...prev,
        examTermId: "",
      }));
    }
  }, [formData.session]);

  const loadExamTerms = async (sessionValue) => {
    try {
      setLoadingExamTerms(true);

      const response = await axiosInstance.get(
        `/api/assessment/exam-term?schoolId=${schoolId}&session=${sessionValue}`
      );

      setExamTerms(Array.isArray(response.data) ? response.data : []);

      setFormData((prev) => ({
        ...prev,
        examTermId: "",
      }));
    } catch (error) {
      console.error("Exam Term Error:", error);

      setExamTerms([]);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load exam terms"
      );
    } finally {
      setLoadingExamTerms(false);
    }
  };

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "status") {
      updatedValue = value === "true";
    }

    if (
      ["maxMarks", "passingMarks", "displayOrder", "weightage"].includes(name)
    ) {
      updatedValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!schoolId) {
      toast.error("School ID not found");
      return;
    }

    if (!formData.typeName.trim()) {
      toast.error("Please enter assessment type name");
      return;
    }

    if (!formData.shortCode.trim()) {
      toast.error("Please enter short code");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Please select assessment category");
      return;
    }

    if (!formData.nature) {
      toast.error("Please select assessment nature");
      return;
    }

    if (!formData.session) {
      toast.error("Please select session");
      return;
    }

    if (!formData.examTermId) {
      toast.error("Please select exam term");
      return;
    }

    if (formData.maxMarks === "" || Number(formData.maxMarks) <= 0) {
      toast.error("Please enter valid maximum marks");
      return;
    }

    if (
      formData.passingMarks !== "" &&
      Number(formData.passingMarks) > Number(formData.maxMarks)
    ) {
      toast.error("Passing marks cannot be greater than maximum marks");
      return;
    }

    if (
      formData.weightage !== "" &&
      (Number(formData.weightage) < 0 || Number(formData.weightage) > 100)
    ) {
      toast.error("Weightage must be between 0 and 100");
      return;
    }

    if (formData.displayOrder === "" || Number(formData.displayOrder) < 0) {
      toast.error("Please enter valid display order");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        schoolId: schoolId,
        typeName: formData.typeName.trim(),
        shortCode: formData.shortCode.trim().toUpperCase(),
        categoryId: Number(formData.categoryId),
        examTermId: Number(formData.examTermId),
      };

      console.log("Assessment Type Payload:", payload);

      const response = await axiosInstance.post(
        "/api/assessment/type",
        payload
      );

      console.log("Assessment Type Saved:", response.data);

      toast.success("Assessment Type added successfully");

      setTimeout(() => {
        navigate("/assessment/type");
      }, 800);
    } catch (error) {
      console.error("Save Assessment Type Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to save assessment type"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setFormData({
      schoolId: schoolId,
      typeName: "",
      shortCode: "",
      nature: "",
      categoryId: "",
      examTermId: "",
      session: "",
      maxMarks: "",
      passingMarks: "",
      weightage: "",
      description: "",
      displayOrder: "",
      status: true,
    });

    setExamTerms([]);
  };

  /* =========================================================
     PREVIEW DATA
  ========================================================= */

  const selectedCategory = useMemo(() => {
    return categories.find(
      (item) => String(item.id) === String(formData.categoryId)
    );
  }, [categories, formData.categoryId]);

  const selectedNature = useMemo(() => {
    return assessmentNature.find(
      (item) => item.name === formData.nature
    );
  }, [assessmentNature, formData.nature]);

  const selectedExamTerm = useMemo(() => {
    return examTerms.find(
      (item) => String(item.id) === String(formData.examTermId)
    );
  }, [examTerms, formData.examTermId]);

  /* =========================================================
     UI
  ========================================================= */

  return (
    <>
      {/* =====================================================
          HEADER
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
                       <MdOutlineAssessment
                         size={27}
                       />
                     </div>
     
                     <div>
                       <h5 className="mb-1 fw-bold text-dark">
                         Add Assessment Type
                       </h5>
     
                       <div className="text-muted small">
                         Assessment Type &nbsp;/
                         &nbsp; Add Assessment Type
                       </div>
                     </div>
                   </div>
     
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
                       <MdOutlineSchool className="me-1" />
                       Assessment Type
                     </span>
     
                   </div>
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
                   Home &nbsp;›&nbsp; Assessment Type
                   &nbsp;›&nbsp;
                   <span className="text-primary fw-semibold">
                     Add Assessment Type
                   </span>
                 </small>
               </div>
             </div>
           </div>

      {/* =====================================================
          INFO ALERT
      ===================================================== */}

      

       <div className="mx-2 mb-3">
              <div
                className="rounded-3 p-3 d-flex align-items-start gap-3"
                style={{
                  background: "linear-gradient(90deg,#eff6ff,#f8fbff)",
                  border: "1px solid #dbeafe",
                }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: "34px",
                    height: "34px",
                    backgroundColor: "#dbeafe",
                    color: "#2563eb",
                  }}
                >
                  <MdErrorOutline size={20} />
                </div>
      
                <div>
                  <div className="fw-semibold text-dark small">
                   Add Assessment Type Workspace
                  </div>
      
                  <small className="text-muted">
                    Create a new assessment type that will be available in Assessment
          Setup.
                  </small>
                </div>
              </div>
            </div>
      

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="container-fluid mt-3">
        <div className="row g-3 align-items-stretch">
          {/* =================================================
              FORM CARD
          ================================================= */}

          <div className="col-12 col-xl-8">
            <div
              className="card h-100 border-0 shadow"
              style={{
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                className="card-header bg-white py-3"
                style={{
                  borderBottom: "1px solid #edf1f7",
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "38px",
                        height: "38px",
                        background: "#eaf2ff",
                        color: "#2563eb",
                      }}
                    >
                      <MdAssignment size={21} />
                    </div>

                    <div>
                      <h6 className="mb-0 fw-bold">
                        Assessment Type Details
                      </h6>

                      <small className="text-muted">
                        Configure assessment type information
                      </small>
                    </div>
                  </div>

                  <span
                    className="badge rounded-pill"
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      padding: "7px 12px",
                    }}
                  >
                    Required fields *
                  </span>
                </div>
              </div>

              <div className="card-body p-3 p-md-4">
                <form onSubmit={handleSubmit}>
                  {/* -----------------------------------------
                      BASIC INFORMATION
                  ----------------------------------------- */}

                  <div className="section-title mb-3">
                    <span>Basic Information</span>
                  </div>

                  <div className="row g-3">
                    {/* TYPE NAME */}

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Assessment Type Name{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="typeName"
                        value={formData.typeName}
                        onChange={handleChange}
                        placeholder="e.g. Unit Test"
                      />

                      <small className="text-muted">
                        Name of the assessment type
                      </small>
                    </div>

                    {/* SHORT CODE */}

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Short Code <span className="text-danger">*</span>
                      </label>

                      <input
                        type="text"
                        className="form-control text-uppercase"
                        name="shortCode"
                        value={formData.shortCode}
                        maxLength={20}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            shortCode: e.target.value.toUpperCase(),
                          }))
                        }
                        placeholder="e.g. UT"
                      />

                      <small className="text-muted">
                        Used for quick reference
                      </small>
                    </div>

                    {/* CATEGORY */}

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Assessment Category{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <select
                        name="categoryId"
                        className="form-select"
                        value={formData.categoryId}
                        onChange={handleChange}
                      >
                        <option value="">
                          {loadingCategories
                            ? "Loading Categories..."
                            : "Select Category"}
                        </option>

                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* NATURE */}

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Assessment Nature{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <select
                        name="nature"
                        className="form-select"
                        value={formData.nature}
                        onChange={handleChange}
                      >
                        <option value="">Select Nature</option>

                        {assessmentNature.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.displayName || item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* -----------------------------------------
                      SESSION & EXAM
                  ----------------------------------------- */}

                  <div className="section-title mt-4 mb-3">
                    <span>Academic & Examination</span>
                  </div>

                  <div className="row g-3">
                    {/* SESSION */}

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Session <span className="text-danger">*</span>
                      </label>

                      <select
                        name="session"
                        className="form-select"
                        value={formData.session}
                        onChange={handleChange}
                      >
                        <option value="">Select Session</option>

                        {sessions.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* EXAM TERM */}

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Exam Term <span className="text-danger">*</span>
                      </label>

                      <select
                        name="examTermId"
                        className="form-select"
                        value={formData.examTermId}
                        onChange={handleChange}
                        disabled={!formData.session || loadingExamTerms}
                      >
                        <option value="">
                          {!formData.session
                            ? "Select Session First"
                            : loadingExamTerms
                            ? "Loading Exam Terms..."
                            : "Select Exam Term"}
                        </option>

                        {examTerms.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.examTerm}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* -----------------------------------------
                      MARKS
                  ----------------------------------------- */}

                  <div className="section-title mt-4 mb-3">
                    <span>Marks & Weightage</span>
                  </div>

                  <div className="row g-3">
                    {/* MAX MARKS */}

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Max Marks <span className="text-danger">*</span>
                      </label>

                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        name="maxMarks"
                        value={formData.maxMarks}
                        onChange={handleChange}
                        placeholder="Enter maximum marks"
                      />
                    </div>

                    {/* PASSING MARKS */}

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Passing Marks{" "}
                        <span className="text-muted fw-normal">
                          (Optional)
                        </span>
                      </label>

                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        name="passingMarks"
                        value={formData.passingMarks}
                        onChange={handleChange}
                        placeholder="Enter passing marks"
                      />
                    </div>

                    {/* DISPLAY ORDER */}

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Display Order{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        name="displayOrder"
                        value={formData.displayOrder}
                        onChange={handleChange}
                        placeholder="e.g. 1"
                      />

                      <small className="text-muted">
                        Used to sort assessment types
                      </small>
                    </div>

                    {/* WEIGHTAGE */}

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Default Weightage %{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <div className="input-group">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className="form-control"
                          name="weightage"
                          value={formData.weightage}
                          onChange={handleChange}
                          placeholder="Enter weightage"
                        />

                        <span className="input-group-text">%</span>
                      </div>

                      <small className="text-muted">
                        Used in result calculation
                      </small>
                    </div>
                  </div>

                  {/* -----------------------------------------
                      DESCRIPTION
                  ----------------------------------------- */}

                  <div className="section-title mt-4 mb-3">
                    <span>Additional Information</span>
                  </div>

                  <div>
                    <label className="form-label fw-semibold">
                      Description{" "}
                      <span className="text-muted fw-normal">
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      className="form-control"
                      rows="4"
                      maxLength={255}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter description or instructions for this assessment type"
                    />

                    <div className="d-flex justify-content-between mt-1">
                      <small className="text-muted">
                        Maximum 255 characters
                      </small>

                      <small className="text-muted">
                        {formData.description.length}/255
                      </small>
                    </div>
                  </div>

                  {/* -----------------------------------------
                      STATUS
                  ----------------------------------------- */}

                  <div className="mt-4">
                    <label className="form-label fw-semibold">
                      Status <span className="text-danger">*</span>
                    </label>

                    <select
                      name="status"
                      className="form-select"
                      style={{ maxWidth: "250px" }}
                      value={String(formData.status)}
                      onChange={handleChange}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>

                  <hr className="my-4" />

                  {/* -----------------------------------------
                      BUTTONS
                  ----------------------------------------- */}

                  <div className="d-flex flex-wrap justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/assessment/type")}
                    >
                      <FaArrowLeft className="me-1" />
                      Back
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={handleReset}
                    >
                      <IoCloseSharp size={19} className="me-1" />
                      Reset
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary px-4"
                      disabled={loading}
                    >
                      <MdAssignment size={18} className="me-1" />

                      {loading
                        ? "Saving..."
                        : "Save Assessment Type"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="col-12 col-xl-4">
            <div className="d-flex flex-column gap-3 h-100">
              {/* -----------------------------------------
                  INFORMATION CARD
              ----------------------------------------- */}

              <div
                className="card border-0 shadow"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <div
                  className="card-header border-0"
                  style={{
                    background: "#eff6ff",
                    color: "#1e40af",
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "36px",
                        height: "36px",
                        background: "#ffffff",
                      }}
                    >
                      <MdErrorOutline size={21} />
                    </div>

                    <div>
                      <h6 className="mb-0 fw-bold">
                        Assessment Type Information
                      </h6>

                      <small>
                        Understand assessment types
                      </small>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <p className="text-muted small">
                    Assessment types are used to categorize different
                    evaluations conducted in the school.
                  </p>

                  <h6 className="fw-bold mb-3">
                    Common Examples
                  </h6>

                  <div className="row g-2">
                    {[
                      "Unit Test",
                      "Class Test",
                      "Quiz",
                      "Homework",
                      "Mid Term Exam",
                      "Term End Exam",
                      "Practical Exam",
                      "Oral / Viva",
                      "Project / Assignment",
                    ].map((item) => (
                      <div className="col-12 col-sm-6" key={item}>
                        <div
                          className="d-flex align-items-center gap-2 rounded-3 p-2"
                          style={{
                            background: "#f8fafc",
                            border: "1px solid #edf2f7",
                          }}
                        >
                          <FaCheckCircle
                            size={15}
                            style={{ color: "#2563eb" }}
                          />

                          <small className="fw-semibold">
                            {item}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* -----------------------------------------
                  PREVIEW CARD
              ----------------------------------------- */}

              <div
                className="card border-0 shadow flex-grow-1"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <div
                  className="card-header bg-white py-3"
                  style={{
                    borderBottom: "1px solid #edf1f7",
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "36px",
                        height: "36px",
                        background: "#eaf2ff",
                        color: "#2563eb",
                      }}
                    >
                      <FaRegEye size={18} />
                    </div>

                    <div>
                      <h6 className="mb-0 fw-bold">Live Preview</h6>

                      <small className="text-muted">
                        Preview before saving
                      </small>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  {/* PREVIEW HEADER */}

                  <div
                    className="rounded-3 p-3 mb-3"
                    style={{
                      background: "#f8fbff",
                      border: "1px solid #dbeafe",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start gap-2">
                      <div>
                        <small className="text-muted d-block">
                          Assessment Type
                        </small>

                        <h5 className="fw-bold mb-1">
                          {formData.typeName || "Assessment Type"}
                        </h5>

                        <span
                          className="badge"
                          style={{
                            background: "#2563eb",
                          }}
                        >
                          {formData.shortCode || "CODE"}
                        </span>
                      </div>

                      <span
                        className={`badge ${
                          formData.status
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {formData.status ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* PREVIEW DETAILS */}

                  <div className="preview-item">
                    <span>Category</span>

                    <strong>
                      {selectedCategory?.categoryName || "-"}
                    </strong>
                  </div>

                  <div className="preview-item">
                    <span>Nature</span>

                    <strong>
                      {selectedNature?.displayName ||
                        selectedNature?.name ||
                        "-"}
                    </strong>
                  </div>

                  <div className="preview-item">
                    <span>Session</span>

                    <strong>{formData.session || "-"}</strong>
                  </div>

                  <div className="preview-item">
                    <span>Exam Term</span>

                    <strong>
                      {selectedExamTerm?.examTerm || "-"}
                    </strong>
                  </div>

                  <div className="preview-item">
                    <span>Max Marks</span>

                    <strong>
                      {formData.maxMarks || "-"}
                    </strong>
                  </div>

                  <div className="preview-item">
                    <span>Passing Marks</span>

                    <strong>
                      {formData.passingMarks || "-"}
                    </strong>
                  </div>

                  <div className="preview-item">
                    <span>Weightage</span>

                    <strong>
                      {formData.weightage !== ""
                        ? `${formData.weightage}%`
                        : "-"}
                    </strong>
                  </div>

                  <div className="preview-item">
                    <span>Display Order</span>

                    <strong>
                      {formData.displayOrder || "-"}
                    </strong>
                  </div>

                  {/* DESCRIPTION */}

                  <div
                    className="mt-3 p-2 rounded-3"
                    style={{
                      background: "#fffaf0",
                      border: "1px solid #fde68a",
                    }}
                  >
                    <small className="d-flex gap-2">
                      <TbBulb
                        size={19}
                        className="text-warning flex-shrink-0"
                      />

                      <span>
                        <strong>Description:</strong>{" "}
                        {formData.description || "-"}
                      </span>
                    </small>
                  </div>

                  <div
                    className="mt-3 p-2 rounded-3"
                    style={{
                      background: "#eef6ff",
                      border: "1px solid #dbeafe",
                      color: "#1e40af",
                    }}
                  >
                    <small className="d-flex gap-2 align-items-start">
                      <MdInfoOutline
                        size={19}
                        className="flex-shrink-0"
                      />

                      This assessment type will be available in
                      Assessment Setup once saved.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`
        .form-label {
          color: #263247;
          font-size: 14px;
          margin-bottom: 7px;
        }

        .form-control,
        .form-select {
          border: 1px solid #dbe2ea;
          border-radius: 7px;
          min-height: 40px;
          font-size: 14px;
          color: #263247;
        }

        .form-control:focus,
        .form-select:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.18rem rgba(37, 99, 235, 0.10);
        }

        textarea.form-control {
          min-height: 105px;
          resize: vertical;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #1e3a8a;
          font-size: 14px;
          font-weight: 700;
        }

        .section-title::after {
          content: "";
          height: 1px;
          background: #e5eaf1;
          flex: 1;
        }

        .preview-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px dashed #e5e7eb;
        }

        .preview-item:last-child {
          border-bottom: none;
        }

        .preview-item span {
          color: #64748b;
          font-size: 13px;
        }

        .preview-item strong {
          color: #1e293b;
          font-size: 13px;
          text-align: right;
        }

        .btn-primary {
          background: #2563eb;
          border-color: #2563eb;
        }

        .btn-primary:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
        }

        @media (max-width: 576px) {
          .card-body {
            padding: 15px !important;
          }

          .preview-item {
            align-items: flex-start;
          }

          .preview-item strong {
            max-width: 55%;
          }
        }
      `}</style>
    </>
  );
};

export default AddAssessmentType;