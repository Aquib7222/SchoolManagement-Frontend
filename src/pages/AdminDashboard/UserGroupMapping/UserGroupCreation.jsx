// import React, { useEffect, useState } from "react";
// import {
//   LuArrowLeft,
//   LuSave,
//   LuShieldCheck,
//   LuRefreshCw,
// } from "react-icons/lu";
// import { useNavigate, useLocation } from "react-router-dom";
// import axiosInstance from "../../../api/axiosInstance";

// const UserGroupCreation = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const token = localStorage.getItem("token");


//   const editId = location.state?.groupId || null;

//   const isEditMode = Boolean(editId);


//   const [formData, setFormData] = useState({
//     groupName: "",
//     groupCode: "",
//     status: "Active",
//   });

//   const [errors, setErrors] = useState({});

//   const [loading, setLoading] = useState(false);

//   const [fetching, setFetching] = useState(false);

//   // =====================================================
//   // HANDLE CHANGE
//   // =====================================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   // =====================================================
//   // FETCH GROUP FOR EDIT
//   // =====================================================

//   useEffect(() => {
//     if (isEditMode) {
//       fetchGroup();
//     }
//   }, [editId]);

//   const fetchGroup = async () => {
//     try {
//       setFetching(true);

//       const response = await axiosInstance.get(
//         `/api/user-group/${editId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = response.data;

//       setFormData({
//         groupName: data?.groupName || "",
//         groupCode: data?.groupCode || "",
//         status: data?.status || "Active",
//       });
//     } catch (error) {
//       console.error("Fetch User Group Error:", error);

//       alert(
//         error?.response?.data?.message ||
//           "Unable to load user group"
//       );

//       navigate("/user-group-list");
//     } finally {
//       setFetching(false);
//     }
//   };

//   // =====================================================
//   // VALIDATION
//   // =====================================================

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.groupName.trim()) {
//       newErrors.groupName =
//         "Group name is required";
//     }

//     if (!formData.groupCode.trim()) {
//       newErrors.groupCode =
//         "Group code is required";
//     }

//     if (!formData.status) {
//       newErrors.status =
//         "Please select status";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // =====================================================
//   // SUBMIT
//   // =====================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) {
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         groupName: formData.groupName.trim(),
//         groupCode: formData.groupCode.trim().toUpperCase(),
//         status: formData.status,
//       };

//       let response;

//       // ==============================
//       // UPDATE
//       // ==============================

//       if (isEditMode) {
//         response = await axiosInstance.put(
//           `/api/user-group/update/${editId}`,
//           payload,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         alert(
//           "User Group updated successfully"
//         );
//       }

//       // ==============================
//       // CREATE
//       // ==============================

//       else {
//         response = await axiosInstance.post(
//           "/api/user-group/create",
//           payload,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         alert(
//           "User Group created successfully"
//         );
//       }

//       navigate("/user-group-list");

//     } catch (error) {
//       console.error(
//         "User Group Save Error:",
//         error
//       );

//       alert(
//         error?.response?.data?.message ||
//           error?.response?.data ||
//           "Something went wrong"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // RESET
//   // =====================================================

//   const handleReset = () => {
//     if (isEditMode) {
//       fetchGroup();
//       return;
//     }

//     setFormData({
//       groupName: "",
//       groupCode: "",
//       status: "Active",
//     });

//     setErrors({});
//   };

//   // =====================================================
//   // BACK
//   // =====================================================

//   const handleBack = () => {
//     navigate("/user-group-list");
//   };

//   // =====================================================
//   // LOADING
//   // =====================================================

//   if (fetching) {
//     return (
//       <div className="container-fluid px-2">
//         <div
//           className="card shadow border-0 rounded-3 mt-3"
//           style={{ minHeight: "300px" }}
//         >
//           <div className="card-body d-flex justify-content-center align-items-center">
//             <div className="text-center">
//               <div
//                 className="spinner-border text-primary"
//                 style={{
//                   width: "30px",
//                   height: "30px",
//                 }}
//               />

//               <div className="text-muted mt-2">
//                 Loading user group...
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <>
//       {/* ================================================= */}
//       {/* HEADER */}
//       {/* ================================================= */}

//       <div className="container-fluid px-2">
//         <div
//           className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
//           style={{
//             minHeight: "70px",
//           }}
//         >
//           <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

//             <div>
//               <h4 className="fw-bold mb-1">
//                 {isEditMode
//                   ? "Update User Group"
//                   : "Create User Group"}
//               </h4>

//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb mb-0 small">

//                   <li className="breadcrumb-item">
//                     <a
//                       href="/"
//                       className="text-decoration-none text-dark"
//                     >
//                       Dashboard
//                     </a>
//                   </li>

//                   <li className="breadcrumb-item">
//                     User Management
//                   </li>

//                   <li className="breadcrumb-item">
//                     User Group
//                   </li>

//                   <li className="breadcrumb-item active text-primary">
//                     {isEditMode
//                       ? "Update"
//                       : "Create"}
//                   </li>

//                 </ol>
//               </nav>
//             </div>

//             <button
//               type="button"
//               className="btn btn-outline-secondary btn-sm"
//               onClick={handleBack}
//             >
//               <LuArrowLeft
//                 size={16}
//                 className="me-1"
//               />
//               Back
//             </button>

//           </div>
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* FORM */}
//       {/* ================================================= */}

//       <div className="container-fluid px-2">
//         <div className="card shadow border-0 rounded-3">

//           {/* CARD HEADER */}

//           <div className="card-header bg-white border-0 p-3">

//             <div className="d-flex align-items-center">

//               <span
//                 className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                 style={{
//                   width: "38px",
//                   height: "38px",
//                   background: "#f0eaff",
//                 }}
//               >
//                 <LuShieldCheck
//                   size={20}
//                   style={{
//                     color: "#6f2cff",
//                   }}
//                 />
//               </span>

//               <div>
//                 <h6 className="fw-bold mb-0">
//                   User Group Information
//                 </h6>

//                 <small className="text-muted">
//                   {isEditMode
//                     ? "Update user group details"
//                     : "Create a new user group"}
//                 </small>
//               </div>

//             </div>

//           </div>

//           {/* BODY */}

//           <div className="card-body">

//             <form onSubmit={handleSubmit}>

//               <div className="row g-3">

//                 {/* GROUP NAME */}

//                 <div className="col-md-6">

//                   <label className="form-label">
//                     <h6 className="mb-1">
//                       Group Name{" "}
//                       <span className="text-danger">
//                         *
//                       </span>
//                     </h6>
//                   </label>

//                   <input
//                     type="text"
//                     name="groupName"
//                     className={`form-control ${
//                       errors.groupName
//                         ? "is-invalid"
//                         : ""
//                     }`}
//                     placeholder="Enter group name"
//                     value={formData.groupName}
//                     onChange={handleChange}
//                   />

//                   {errors.groupName && (
//                     <div className="invalid-feedback">
//                       {errors.groupName}
//                     </div>
//                   )}

//                 </div>

//                 {/* GROUP CODE */}

//                 <div className="col-md-6">

//                   <label className="form-label">
//                     <h6 className="mb-1">
//                       Group Code{" "}
//                       <span className="text-danger">
//                         *
//                       </span>
//                     </h6>
//                   </label>

//                   <input
//                     type="text"
//                     name="groupCode"
//                     className={`form-control ${
//                       errors.groupCode
//                         ? "is-invalid"
//                         : ""
//                     }`}
//                     placeholder="Enter group code"
//                     value={formData.groupCode}
//                     onChange={handleChange}
//                   />

//                   {errors.groupCode && (
//                     <div className="invalid-feedback">
//                       {errors.groupCode}
//                     </div>
//                   )}

//                 </div>

//                 {/* STATUS */}

//                 <div className="col-md-6">

//                   <label className="form-label">
//                     <h6 className="mb-1">
//                       Status{" "}
//                       <span className="text-danger">
//                         *
//                       </span>
//                     </h6>
//                   </label>

//                   <select
//                     name="status"
//                     className={`form-select ${
//                       errors.status
//                         ? "is-invalid"
//                         : ""
//                     }`}
//                     value={formData.status}
//                     onChange={handleChange}
//                   >

//                     <option value="">
//                       Select Status
//                     </option>

//                     <option value="Active">
//                       Active
//                     </option>

//                     <option value="Inactive">
//                       Inactive
//                     </option>

//                   </select>

//                   {errors.status && (
//                     <div className="invalid-feedback">
//                       {errors.status}
//                     </div>
//                   )}

//                 </div>

//               </div>

//               {/* ================================================= */}
//               {/* BUTTONS */}
//               {/* ================================================= */}

//               <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">

//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary"
//                   onClick={handleReset}
//                   disabled={loading}
//                 >
//                   <LuRefreshCw
//                     size={16}
//                     className="me-1"
//                   />

//                   Reset
//                 </button>

//                 <button
//                   type="button"
//                   className="btn btn-light"
//                   onClick={handleBack}
//                   disabled={loading}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={loading}
//                 >

//                   {loading ? (
//                     <>
//                       <span
//                         className="spinner-border spinner-border-sm me-2"
//                       />
//                       {isEditMode
//                         ? "Updating..."
//                         : "Saving..."}
//                     </>
//                   ) : (
//                     <>
//                       <LuSave
//                         size={17}
//                         className="me-1"
//                       />

//                       {isEditMode
//                         ? "Update User Group"
//                         : "Save User Group"}
//                     </>
//                   )}

//                 </button>

//               </div>

//             </form>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserGroupCreation;


import React, { useEffect, useState } from "react";
import {
  LuArrowLeft,
  LuSave,
  LuShieldCheck,
  LuRefreshCw,
  LuUsers,
} from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const UserGroupCreation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const editId = location.state?.groupId || null;
  const isEditMode = Boolean(editId);

  const [formData, setFormData] = useState({
    groupName: "",
    groupCode: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =====================================================
  // FETCH GROUP FOR EDIT
  // =====================================================

  useEffect(() => {
    if (isEditMode) {
      fetchGroup();
    }
  }, [editId]);

  const fetchGroup = async () => {
    try {
      setFetching(true);

      const response = await axiosInstance.get(
        `/api/user-group/${editId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      setFormData({
        groupName: data?.groupName || "",
        groupCode: data?.groupCode || "",
        status: data?.status || "Active",
      });
    } catch (error) {
      console.error("Fetch User Group Error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to load user group"
      );

      navigate("/user-group-list");
    } finally {
      setFetching(false);
    }
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validate = () => {
    const newErrors = {};

    if (!formData.groupName.trim()) {
      newErrors.groupName = "Group name is required";
    }

    if (!formData.groupCode.trim()) {
      newErrors.groupCode = "Group code is required";
    }

    if (!formData.status) {
      newErrors.status = "Please select status";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        groupName: formData.groupName.trim(),
        groupCode: formData.groupCode.trim().toUpperCase(),
        status: formData.status,
      };

      let response;

      // =================================================
      // UPDATE
      // =================================================

      if (isEditMode) {
        response = await axiosInstance.put(
          `/api/user-group/update/${editId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        alert("User Group updated successfully");
      }

      // =================================================
      // CREATE
      // =================================================

      else {
        response = await axiosInstance.post(
          "/api/user-group/create",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        alert("User Group created successfully");
      }

      navigate("/user-group-list");
    } catch (error) {
      console.error("User Group Save Error:", error);

      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    if (isEditMode) {
      fetchGroup();
      return;
    }

    setFormData({
      groupName: "",
      groupCode: "",
      status: "Active",
    });

    setErrors({});
  };

  // =====================================================
  // BACK
  // =====================================================

  const handleBack = () => {
    navigate("/user-group-list");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (fetching) {
    return (
      <>
        <style>
          {`
            .ugc-loading-card {
              min-height: 320px;
              border: 1px solid #dbeafe !important;
              background: #ffffff;
            }

            .ugc-loading-icon {
              width: 52px;
              height: 52px;
              border-radius: 14px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(
                135deg,
                #2563eb,
                #3b82f6
              );
              color: #ffffff;
              box-shadow: 0 8px 20px rgba(37, 99, 235, 0.22);
            }
          `}
        </style>

        <div className="container-fluid px-2">
          <div className="card shadow border-0 rounded-4 mt-3 ugc-loading-card">
            <div className="card-body d-flex justify-content-center align-items-center">
              <div className="text-center">
                <div className="ugc-loading-icon mb-3">
                  <LuShieldCheck size={25} />
                </div>

                <div
                  className="spinner-border text-primary mb-2"
                  style={{
                    width: "28px",
                    height: "28px",
                  }}
                />

                <div className="text-muted small">
                  Loading user group...
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <style>
        {`
          /* =================================================
             PAGE HEADER
          ================================================= */

          .ugc-page-header {
            background:
              linear-gradient(
                135deg,
                #ffffff 0%,
                #f5f9ff 60%,
                #eaf3ff 100%
              );
            border: 1px solid #dbeafe;
          }

          .ugc-title-icon {
            width: 52px;
            height: 52px;
            min-width: 52px;
            border-radius: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            background:
              linear-gradient(
                135deg,
                #2563eb,
                #3b82f6
              );
            box-shadow:
              0 8px 20px rgba(37, 99, 235, 0.22);
          }

          .ugc-breadcrumb-strip {
            background: rgba(239, 246, 255, 0.75);
            border-top: 1px solid #e0ecff;
          }

          /* =================================================
             FORM CARD
          ================================================= */

          .ugc-form-card {
            border: 1px solid #e2e8f0 !important;
          }

          .ugc-section-icon {
            width: 42px;
            height: 42px;
            min-width: 42px;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #2563eb;
            background:
              linear-gradient(
                135deg,
                #eff6ff,
                #eaf3ff
              );
            border: 1px solid #bfdbfe;
          }

          /* =================================================
             INPUTS
          ================================================= */

          .ugc-form-control,
          .ugc-form-select {
            min-height: 43px;
            border-radius: 11px !important;
            border: 1px solid #dbe3ef;
            transition:
              border-color 0.2s ease,
              box-shadow 0.2s ease;
          }

          .ugc-form-control:focus,
          .ugc-form-select:focus {
            border-color: #60a5fa;
            box-shadow:
              0 0 0 0.2rem rgba(37, 99, 235, 0.10);
          }

          .ugc-form-label {
            font-size: 13px;
            font-weight: 600;
            color: #334155;
            margin-bottom: 7px;
          }

          /* =================================================
             INFO BOX
          ================================================= */

          .ugc-info-box {
            background: #f8fbff;
            border: 1px solid #dbeafe;
            border-radius: 12px;
          }

          .ugc-code-hint {
            background: #eff6ff;
            color: #2563eb;
            border: 1px solid #bfdbfe;
            border-radius: 8px;
            font-size: 11px;
            padding: 4px 8px;
          }

          /* =================================================
             BUTTONS
          ================================================= */

          .ugc-btn {
            border-radius: 10px !important;
            min-height: 40px;
            font-weight: 500;
          }

          .ugc-btn-primary {
            box-shadow:
              0 5px 12px rgba(37, 99, 235, 0.18);
          }

          .ugc-btn-reset {
            border-color: #dbe3ef;
            color: #475569;
            background: #ffffff;
          }

          .ugc-btn-reset:hover {
            background: #f8fafc;
          }

          .ugc-btn-cancel {
            border-color: #e2e8f0;
            color: #475569;
            background: #f8fafc;
          }

          .ugc-btn-cancel:hover {
            background: #f1f5f9;
          }

          /* =================================================
             STATUS
          ================================================= */

          .ugc-status-preview {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 5px 10px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
          }

          .ugc-status-active {
            color: #15803d;
            background: #ecfdf5;
            border: 1px solid #bbf7d0;
          }

          .ugc-status-inactive {
            color: #dc2626;
            background: #fef2f2;
            border: 1px solid #fecaca;
          }

          /* =================================================
             RESPONSIVE
          ================================================= */

          @media (max-width: 768px) {
            .ugc-header-row {
              flex-direction: column;
              align-items: flex-start !important;
            }

            .ugc-back-btn {
              width: 100%;
            }

            .ugc-back-btn button {
              width: 100%;
            }

            .ugc-form-actions {
              flex-direction: column;
            }

            .ugc-form-actions button {
              width: 100%;
            }
          }

          @media (max-width: 576px) {
            .ugc-title-icon {
              width: 46px;
              height: 46px;
              min-width: 46px;
            }

            .ugc-section-icon {
              width: 38px;
              height: 38px;
              min-width: 38px;
            }
          }
        `}
      </style>

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="container-fluid px-2">
        <div className="mx-0 mt-2 mb-3">
          <div className="rounded-4 shadow overflow-hidden ugc-page-header">
            <div className="p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center gap-3 ugc-header-row">
                {/* TITLE */}

                <div className="d-flex align-items-center gap-3">
                  <div className="ugc-title-icon">
                    <LuShieldCheck size={27} />
                  </div>

                  <div>
                    <h5 className="mb-1 fw-bold text-dark">
                      {isEditMode
                        ? "Update User Group"
                        : "Create User Group"}
                    </h5>

                    <div className="text-muted small">
                      {isEditMode
                        ? "Update user group details and access status."
                        : "Create and manage user groups for your school."}
                    </div>
                  </div>
                </div>

                {/* BACK */}

                <div className="ugc-back-btn">
                  <button
                    type="button"
                    className="btn btn-outline-primary rounded-3 px-3"
                    onClick={handleBack}
                  >
                    <LuArrowLeft
                      size={17}
                      className="me-1"
                    />
                    Back
                  </button>
                </div>
              </div>
            </div>

            {/* BREADCRUMB */}

            <div className="px-3 px-md-4 py-2 ugc-breadcrumb-strip">
              <small className="text-muted">
                Dashboard
                <span className="mx-2">›</span>

                User Management
                <span className="mx-2">›</span>

                User Group
                <span className="mx-2">›</span>

                <span className="text-primary fw-semibold">
                  {isEditMode
                    ? "Update"
                    : "Create"}
                </span>
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FORM CARD
      ===================================================== */}

      <div className="container-fluid px-2">
        <div className="card shadow border-0 rounded-4 overflow-hidden ugc-form-card">
          {/* CARD HEADER */}

          <div className="card-header bg-white border-0 p-3 p-md-4">
            <div className="d-flex align-items-center gap-3">
              <div className="ugc-section-icon">
                <LuUsers size={21} />
              </div>

              <div>
                <h6 className="fw-bold mb-1">
                  User Group Information
                </h6>

                <small className="text-muted">
                  {isEditMode
                    ? "Update user group details"
                    : "Enter details to create a new user group"}
                </small>
              </div>
            </div>
          </div>

          {/* BODY */}

          <div className="card-body p-3 p-md-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* =================================================
                    GROUP NAME
                ================================================= */}

                <div className="col-md-6">
                  <label className="ugc-form-label">
                    Group Name{" "}
                    <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    name="groupName"
                    className={`form-control ugc-form-control ${
                      errors.groupName
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Enter group name"
                    value={formData.groupName}
                    onChange={handleChange}
                  />

                  {errors.groupName && (
                    <div className="invalid-feedback">
                      {errors.groupName}
                    </div>
                  )}
                </div>

                {/* =================================================
                    GROUP CODE
                ================================================= */}

                <div className="col-md-6">
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="ugc-form-label mb-0">
                      Group Code{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <span className="ugc-code-hint">
                      UPPERCASE
                    </span>
                  </div>

                  <input
                    type="text"
                    name="groupCode"
                    className={`form-control ugc-form-control mt-2 ${
                      errors.groupCode
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Enter group code"
                    value={formData.groupCode}
                    onChange={handleChange}
                  />

                  {errors.groupCode && (
                    <div className="invalid-feedback">
                      {errors.groupCode}
                    </div>
                  )}
                </div>

                {/* =================================================
                    STATUS
                ================================================= */}

                <div className="col-md-6">
                  <label className="ugc-form-label">
                    Status{" "}
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    name="status"
                    className={`form-select ugc-form-select ${
                      errors.status
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Status
                    </option>

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>

                  {errors.status && (
                    <div className="invalid-feedback">
                      {errors.status}
                    </div>
                  )}

                  {/* STATUS PREVIEW */}

                  {formData.status && (
                    <div className="mt-2">
                      {formData.status === "Active" ? (
                        <span className="ugc-status-preview ugc-status-active">
                          <span>●</span>
                          Active
                        </span>
                      ) : (
                        <span className="ugc-status-preview ugc-status-inactive">
                          <span>●</span>
                          Inactive
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* =================================================
                  INFORMATION BOX
              ================================================= */}

              <div className="ugc-info-box p-3 mt-4">
                <div className="d-flex align-items-start gap-2">
                  <LuShieldCheck
                    size={18}
                    className="text-primary mt-1"
                  />

                  <div>
                    <div className="fw-semibold small text-dark">
                      User Group Management
                    </div>

                    <div className="text-muted small mt-1">
                      User groups can be used to organize users
                      and manage their permissions and access
                      within the school management system.
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="d-flex justify-content-end align-items-center gap-2 mt-4 pt-3 border-top ugc-form-actions">
                {/* RESET */}

                <button
                  type="button"
                  className="btn ugc-btn ugc-btn-reset"
                  onClick={handleReset}
                  disabled={loading}
                >
                  <LuRefreshCw
                    size={16}
                    className="me-1"
                  />

                  Reset
                </button>

                {/* CANCEL */}

                <button
                  type="button"
                  className="btn ugc-btn ugc-btn-cancel"
                  onClick={handleBack}
                  disabled={loading}
                >
                  Cancel
                </button>

                {/* SAVE / UPDATE */}

                <button
                  type="submit"
                  className="btn btn-primary ugc-btn ugc-btn-primary px-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      />

                      {isEditMode
                        ? "Updating..."
                        : "Saving..."}
                    </>
                  ) : (
                    <>
                      <LuSave
                        size={17}
                        className="me-1"
                      />

                      {isEditMode
                        ? "Update User Group"
                        : "Save User Group"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGroupCreation;