
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../../api/axiosInstance";
// import { FaArrowLeft } from "react-icons/fa";
// import { LuBox } from "react-icons/lu";
// import { useNavigate, useParams } from "react-router-dom";

// const ModuleCreation = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const isEditMode = Boolean(id);

//   const initialState = {
//     moduleName: "",
//     description: "",
//     path: "",
//     hasMenu: true,
//     status: "Active",
//     moduleCode: "",
//     sequenceNumber: "",
//   };

//   const [form, setForm] = useState(initialState);

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false);

//   // =====================================================
//   // HANDLE INPUT
//   // =====================================================

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === "file") {
//       const file = files?.[0];

//       if (file) {
//         setImage(file);
//         setPreview(URL.createObjectURL(file));
//       }

//       return;
//     }

//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // =====================================================
//   // FETCH MODULE FOR EDIT
//   // =====================================================

//   const fetchModule = async () => {
//     if (!id) return;

//     try {
//       setFetching(true);

//       const response = await axiosInstance.get(
//         `/api/module/${id}`
//       );

//       const data = response.data?.data || response.data;

//       console.log("EDIT MODULE:", data);

//       setForm({
//         moduleName: data?.moduleName || "",
//         description: data?.description || "",
//         path: data?.path || "",
//         hasMenu:
//           typeof data?.hasMenu === "boolean"
//             ? data.hasMenu
//             : true,
//         status: data?.status || "Active",
//         moduleCode: data?.moduleCode || "",
//         sequenceNumber:
//           data?.sequenceNumber !== null &&
//           data?.sequenceNumber !== undefined
//             ? data.sequenceNumber
//             : "",
//       });

//       // Existing image
//       if (data?.image) {
//         setPreview(`/uploads/${data.image}`);
//       }
//     } catch (error) {
//       console.error("Error fetching module:", error);
//       alert("Unable to load module");
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     fetchModule();
//   }, [id]);

//   // =====================================================
//   // CREATE / UPDATE MODULE
//   // =====================================================

//   const saveModule = async () => {
//     if (!form.moduleName.trim()) {
//       alert("Please enter Module Name");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();

//       formData.append(
//         "module",
//         new Blob([JSON.stringify(form)], {
//           type: "application/json",
//         })
//       );

//       if (image) {
//         formData.append("image", image);
//       }

//       let response;

//       if (isEditMode) {
//         // UPDATE
//         response = await axiosInstance.put(
//           `/api/module/update/${id}`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         alert("Module Updated Successfully");
//       } else {
//         // CREATE
//         response = await axiosInstance.post(
//           "/api/module/create",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         alert("Module Created Successfully");
//       }

//       console.log("SAVE RESPONSE:", response.data);

//       setForm(initialState);
//       setImage(null);
//       setPreview("");

//       const input = document.getElementById("imageInput");

//       if (input) {
//         input.value = "";
//       }

//       // After save go back to list
//       navigate("/Admin/moduleList");
//     } catch (error) {
//       console.error("Save module error:", error);

//       console.error(
//         "Backend response:",
//         error?.response?.data
//       );

//       alert(
//         error?.response?.data?.message ||
//           `Unable to ${
//             isEditMode ? "update" : "create"
//           } module`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // LOADING
//   // =====================================================

//   if (fetching) {
//     return (
//       <div className="container-fluid px-2">
//         <div className="bg-white shadow rounded-2 p-5 text-center">
//           <div
//             className="spinner-border text-primary"
//             style={{
//               width: "28px",
//               height: "28px",
//             }}
//           />

//           <div className="text-muted mt-2">
//             Loading module...
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
//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="container-fluid px-2">
//         <div
//           className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
//           style={{
//             minHeight: "70px",
//           }}
//         >
//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//             <div>
//               <h4 className="fw-bold mb-1">
//                 {isEditMode
//                   ? "Edit Module"
//                   : "Create Modules"}
//               </h4>

//               <p className="text-muted mb-2">
//                 {isEditMode
//                   ? "Update module information and settings."
//                   : "Create and manage system modules for your platform."}
//               </p>

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
//                     Module Management
//                   </li>

//                   <li className="breadcrumb-item active text-primary">
//                     {isEditMode
//                       ? "Edit Module"
//                       : "Module Creation"}
//                   </li>
//                 </ol>
//               </nav>
//             </div>

//             <button
//               type="button"
//               className="btn btn-outline-primary"
//               onClick={() =>
//                 navigate("/module-list")
//               }
//             >
//               <FaArrowLeft className="me-2" />

//               Back to Module List
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           FORM
//       ===================================================== */}

//       <div className="container-fluid px-2 mt-3">
//         <div className="bg-white shadow rounded-2 p-3 mt-2 mb-3">
//           <h4 className="mb-4 d-flex align-items-center">
//             <span
//               className="rounded-circle bg-primary me-2 d-inline-flex align-items-center justify-content-center"
//               style={{
//                 width: "32px",
//                 height: "32px",
//               }}
//             >
//               <LuBox
//                 size={18}
//                 className="text-white"
//               />
//             </span>

//             {isEditMode
//               ? "Update Module"
//               : "Create New Module"}
//           </h4>

//           <div className="row">

//             {/* MODULE NAME */}

//             <div className="col-md-4 mb-3">
//               <label className="form-label">
//                 <h6>
//                   Module Name{" "}
//                   <span className="text-danger">
//                     *
//                   </span>
//                 </h6>
//               </label>

//               <input
//                 type="text"
//                 className="form-control"
//                 name="moduleName"
//                 value={form.moduleName}
//                 onChange={handleChange}
//                 placeholder="Enter module name"
//               />
//             </div>

//             {/* MODULE CODE */}

//             <div className="col-md-4 mb-3">
//               <label className="form-label">
//                 <h6>Module Code</h6>
//               </label>

//               <input
//                 type="text"
//                 className="form-control"
//                 name="moduleCode"
//                 value={form.moduleCode}
//                 onChange={handleChange}
//                 placeholder="Enter module code"
//               />
//             </div>

//             {/* DESCRIPTION */}

//             <div className="col-md-4 mb-3">
//               <label className="form-label">
//                 <h6>Description</h6>
//               </label>

//               <input
//                 type="text"
//                 className="form-control"
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 placeholder="Enter module description"
//               />
//             </div>

//             {/* HAS MENU */}

//             <div className="col-md-4 mb-3">
//               <label className="form-label d-block">
//                 <h6>Has Menu</h6>
//               </label>

//               <div className="form-check form-switch">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   name="hasMenu"
//                   checked={form.hasMenu}
//                   onChange={handleChange}
//                   id="hasMenu"
//                 />

//                 <label
//                   className="form-check-label"
//                   htmlFor="hasMenu"
//                 >
//                   {form.hasMenu
//                     ? "Yes"
//                     : "No"}
//                 </label>
//               </div>
//             </div>

//             {/* DIRECT PATH */}

//             {!form.hasMenu && (
//               <div className="col-md-4 mb-3">
//                 <label className="form-label">
//                   <h6>Direct Path</h6>
//                 </label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   name="path"
//                   value={form.path}
//                   onChange={handleChange}
//                   placeholder="/dashboard"
//                 />
//               </div>
//             )}

//             {/* STATUS */}

//             <div className="col-md-4 mb-3">
//               <label className="form-label">
//                 <h6>Status</h6>
//               </label>

//               <select
//                 className="form-select"
//                 name="status"
//                 value={form.status}
//                 onChange={handleChange}
//               >
//                 <option value="Active">
//                   Active
//                 </option>

//                 <option value="Inactive">
//                   Inactive
//                 </option>
//               </select>
//             </div>

//             {/* IMAGE */}

//             <div className="col-md-4 mb-3">
//               <label className="form-label">
//                 <h6>Module Image</h6>
//               </label>

//               <input
//                 id="imageInput"
//                 type="file"
//                 className="form-control"
//                 accept=".png,.jpg,.jpeg,.webp"
//                 onChange={handleChange}
//               />

//               {isEditMode && (
//                 <small className="text-muted">
//                   Leave empty to keep existing image.
//                 </small>
//               )}
//             </div>

//             {/* SEQUENCE */}

//             <div className="col-md-4 mb-3">
//               <label className="form-label">
//                 <h6>Sequence Number</h6>
//               </label>

//               <input
//                 type="text"
//                 className="form-control"
//                 name="sequenceNumber"
//                 value={form.sequenceNumber}
//                 onChange={handleChange}
//                 placeholder="Enter sequence number"
//               />
//             </div>

//             {/* PREVIEW */}

//             {preview && (
//               <div className="col-md-3 mb-3">
//                 <label className="form-label">
//                   <h6>Preview</h6>
//                 </label>

//                 <div className="border rounded p-2">
//                   <img
//                     src={preview}
//                     alt="Module Preview"
//                     style={{
//                       width: "100%",
//                       height: "120px",
//                       objectFit: "contain",
//                     }}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BUTTON */}

//           <div className="text-end mt-3">
//             <button
//               type="button"
//               className="btn btn-primary px-4"
//               onClick={saveModule}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <span
//                     className="spinner-border spinner-border-sm me-2"
//                   />

//                   {isEditMode
//                     ? "Updating..."
//                     : "Creating..."}
//                 </>
//               ) : isEditMode ? (
//                 "Update Module"
//               ) : (
//                 "Create Module"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ModuleCreation;


import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { LuBox, LuUpload, LuSettings2 } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

const ModuleCreation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const initialState = {
    moduleName: "",
    description: "",
    path: "",
    hasMenu: true,
    status: "Active",
    moduleCode: "",
    sequenceNumber: "",
  };

  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files?.[0];

      if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // FETCH MODULE FOR EDIT
  // =====================================================

  const fetchModule = async () => {
    if (!id) return;

    try {
      setFetching(true);

      const response = await axiosInstance.get(`/api/module/${id}`);

      const data = response.data?.data || response.data;

      setForm({
        moduleName: data?.moduleName || "",
        description: data?.description || "",
        path: data?.path || "",
        hasMenu:
          typeof data?.hasMenu === "boolean"
            ? data.hasMenu
            : true,
        status: data?.status || "Active",
        moduleCode: data?.moduleCode || "",
        sequenceNumber:
          data?.sequenceNumber !== null &&
          data?.sequenceNumber !== undefined
            ? data.sequenceNumber
            : "",
      });

      if (data?.image) {
        setPreview(`/uploads/${data.image}`);
      }
    } catch (error) {
      console.error("Error fetching module:", error);
      alert("Unable to load module");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchModule();
  }, [id]);

  // =====================================================
  // CREATE / UPDATE MODULE
  // =====================================================

  const saveModule = async () => {
    if (!form.moduleName.trim()) {
      alert("Please enter Module Name");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "module",
        new Blob([JSON.stringify(form)], {
          type: "application/json",
        })
      );

      if (image) {
        formData.append("image", image);
      }

      let response;

      if (isEditMode) {
        response = await axiosInstance.put(
          `/api/module/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Module Updated Successfully");
      } else {
        response = await axiosInstance.post(
          "/api/module/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Module Created Successfully");
      }

      console.log("SAVE RESPONSE:", response.data);

      setForm(initialState);
      setImage(null);
      setPreview("");

      const input = document.getElementById("imageInput");

      if (input) {
        input.value = "";
      }

      navigate("/Admin/moduleList");
    } catch (error) {
      console.error("Save module error:", error);

      console.error(
        "Backend response:",
        error?.response?.data
      );

      alert(
        error?.response?.data?.message ||
          `Unable to ${
            isEditMode ? "update" : "create"
          } module`
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (fetching) {
    return (
      <>
        <div className="mx-2 mt-2 mb-3">
          <div className="card border-0 shadow rounded-4 overflow-hidden">
            <div className="p-5 text-center">
              <div
                className="spinner-border text-primary"
                style={{
                  width: "32px",
                  height: "32px",
                }}
              />

              <div className="text-muted mt-3">
                Loading module...
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
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mx-2 mt-2 mb-3">
        <div className="rounded-4 shadow overflow-hidden mc-page-header">
          <div className="p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="mc-title-icon">
                  <LuBox size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    {isEditMode
                      ? "Edit Module"
                      : "Create Module"}
                  </h5>

                  <div className="text-muted small">
                    {isEditMode
                      ? "Update module information and settings."
                      : "Create and manage system modules for your platform."}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-outline-primary rounded-3 px-3"
                onClick={() =>
                  navigate("/module-list")
                }
              >
                <FaArrowLeft className="me-2" />
                Back to Module List
              </button>
            </div>
          </div>

          {/* BREADCRUMB */}

          <div className="px-4 py-2 mc-breadcrumb-strip">
            <small className="text-muted">
              Dashboard{" "}
              <span className="mx-1">›</span>{" "}
              Module Management{" "}
              <span className="mx-1">›</span>{" "}
              <span className="text-primary fw-semibold">
                {isEditMode
                  ? "Edit Module"
                  : "Module Creation"}
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          FORM CARD
      ===================================================== */}

      <div className="mx-2 mb-4">
        <div className="card border-0 shadow rounded-4 overflow-hidden">
          {/* SECTION HEADER */}

          <div className="card-header bg-white border-0 border-bottom p-3 p-md-4">
            <div className="d-flex align-items-center gap-3">
              <div className="mc-section-icon">
                <LuSettings2 size={21} />
              </div>

              <div>
                <h6 className="mb-1 fw-bold">
                  {isEditMode
                    ? "Update Module"
                    : "Create New Module"}
                </h6>

                <small className="text-muted">
                  Configure module details, access and display
                  settings.
                </small>
              </div>
            </div>
          </div>

          {/* FORM BODY */}

          <div className="card-body p-3 p-md-4">
            <div className="row g-3">
              {/* MODULE NAME */}

              <div className="col-lg-4 col-md-6">
                <label className="form-label mc-label">
                  Module Name{" "}
                  <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control mc-input"
                  name="moduleName"
                  value={form.moduleName}
                  onChange={handleChange}
                  placeholder="Enter module name"
                />

                <small className="text-muted">
                  Enter a unique module name.
                </small>
              </div>

              {/* MODULE CODE */}

              <div className="col-lg-4 col-md-6">
                <label className="form-label mc-label">
                  Module Code
                </label>

                <input
                  type="text"
                  className="form-control mc-input"
                  name="moduleCode"
                  value={form.moduleCode}
                  onChange={handleChange}
                  placeholder="Enter module code"
                />

                <small className="text-muted">
                  Example: STUDENT, FEE, ATTENDANCE
                </small>
              </div>

              {/* DESCRIPTION */}

              <div className="col-lg-4 col-md-6">
                <label className="form-label mc-label">
                  Description
                </label>

                <input
                  type="text"
                  className="form-control mc-input"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter module description"
                />

                <small className="text-muted">
                  Short description of this module.
                </small>
              </div>

              {/* HAS MENU */}

              <div className="col-lg-4 col-md-6">
                <label className="form-label mc-label">
                  Menu Configuration
                </label>

                <div className="mc-switch-box">
                  <div className="form-check form-switch m-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="hasMenu"
                      checked={form.hasMenu}
                      onChange={handleChange}
                      id="hasMenu"
                    />

                    <label
                      className="form-check-label fw-semibold ms-2"
                      htmlFor="hasMenu"
                    >
                      {form.hasMenu
                        ? "Module has menu"
                        : "Direct access module"}
                    </label>
                  </div>
                </div>
              </div>

              {/* DIRECT PATH */}

              {!form.hasMenu && (
                <div className="col-lg-4 col-md-6">
                  <label className="form-label mc-label">
                    Direct Path
                  </label>

                  <input
                    type="text"
                    className="form-control mc-input"
                    name="path"
                    value={form.path}
                    onChange={handleChange}
                    placeholder="/dashboard"
                  />

                  <small className="text-muted">
                    Route used when menu is disabled.
                  </small>
                </div>
              )}

              {/* STATUS */}

              <div className="col-lg-4 col-md-6">
                <label className="form-label mc-label">
                  Status
                </label>

                <select
                  className="form-select mc-input"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>

              {/* SEQUENCE */}

              <div className="col-lg-4 col-md-6">
                <label className="form-label mc-label">
                  Sequence Number
                </label>

                <input
                  type="number"
                  className="form-control mc-input"
                  name="sequenceNumber"
                  value={form.sequenceNumber}
                  onChange={handleChange}
                  placeholder="Enter sequence number"
                />

                <small className="text-muted">
                  Controls module display order.
                </small>
              </div>

              {/* IMAGE */}

              <div className="col-lg-4 col-md-6">
                <label className="form-label mc-label">
                  Module Image
                </label>

                <div className="mc-upload-wrapper">
                  <input
                    id="imageInput"
                    type="file"
                    className="form-control mc-input"
                    accept=".png,.jpg,.jpeg,.webp"
                    onChange={handleChange}
                  />

                  <div className="mc-upload-hint">
                    <LuUpload
                      size={16}
                      className="me-1"
                    />

                    PNG, JPG, JPEG or WEBP
                  </div>
                </div>

                {isEditMode && (
                  <small className="text-muted">
                    Leave empty to keep existing image.
                  </small>
                )}
              </div>

              {/* IMAGE PREVIEW */}

              {preview && (
                <div className="col-lg-4 col-md-6">
                  <label className="form-label mc-label">
                    Module Preview
                  </label>

                  <div className="mc-preview-card">
                    <div className="mc-preview-image">
                      <img
                        src={preview}
                        alt="Module Preview"
                      />
                    </div>

                    <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
                      <FaCheckCircle
                        className="text-success"
                        size={14}
                      />

                      <small className="text-muted">
                        Image selected
                      </small>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* =================================================
                FORM FOOTER
            ================================================= */}

            <div className="mc-form-footer mt-4 pt-3">
              <div className="d-flex flex-wrap justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-3 px-4"
                  onClick={() =>
                    navigate("/module-list")
                  }
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary rounded-3 px-4 mc-primary-btn"
                  onClick={saveModule}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />

                      {isEditMode
                        ? "Updating..."
                        : "Creating..."}
                    </>
                  ) : (
                    <>
                      {isEditMode
                        ? "Update Module"
                        : "Create Module"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          STYLES
      ===================================================== */}

      <style>{`
        .mc-page-header {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f5f9ff 60%,
            #eaf3ff 100%
          );
          border: 1px solid #dbeafe;
        }

        .mc-title-icon {
          width: 52px;
          height: 52px;
          min-width: 52px;
          border-radius: 14px;
          display: flex;
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

        .mc-breadcrumb-strip {
          background: rgba(239, 246, 255, 0.75);
          border-top: 1px solid #e0ecff;
        }

        .mc-section-icon {
          width: 42px;
          height: 42px;
          min-width: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: #ffffff;
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.18);
        }

        .mc-label {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 7px;
        }

        .mc-input {
          min-height: 42px;
          border-radius: 10px;
          border: 1px solid #dbe3ef;
          padding: 9px 12px;
          transition: all 0.2s ease;
        }

        .mc-input:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 0.2rem rgba(37, 99, 235, 0.1);
        }

        .mc-switch-box {
          min-height: 42px;
          display: flex;
          align-items: center;
          padding: 9px 12px;
          border-radius: 10px;
          background: #f8fbff;
          border: 1px solid #dbeafe;
        }

        .mc-switch-box .form-check-input {
          cursor: pointer;
          width: 2.5em;
          height: 1.3em;
          margin-top: 0;
        }

        .mc-switch-box .form-check-input:checked {
          background-color: #2563eb;
          border-color: #2563eb;
        }

        .mc-upload-wrapper {
          position: relative;
        }

        .mc-upload-hint {
          margin-top: 6px;
          font-size: 12px;
          color: #64748b;
          display: flex;
          align-items: center;
        }

        .mc-preview-card {
          padding: 10px;
          border-radius: 14px;
          border: 1px solid #dbeafe;
          background: #f8fbff;
        }

        .mc-preview-image {
          height: 120px;
          border-radius: 10px;
          background: #ffffff;
          border: 1px dashed #bfdbfe;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .mc-preview-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 8px;
        }

        .mc-form-footer {
          border-top: 1px solid #e5edf8;
        }

        .mc-primary-btn {
          min-width: 145px;
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.18);
        }

        .mc-primary-btn:hover {
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .mc-title-icon {
            width: 46px;
            height: 46px;
            min-width: 46px;
          }

          .mc-page-header .btn {
            width: 100%;
          }

          .mc-form-footer .d-flex {
            justify-content: stretch !important;
          }

          .mc-form-footer button {
            flex: 1;
          }
        }

        @media (max-width: 576px) {
          .mc-title-icon {
            width: 44px;
            height: 44px;
            min-width: 44px;
          }

          .mc-title-icon svg {
            width: 23px;
            height: 23px;
          }

          .mc-form-footer button {
            width: 100%;
            flex: 1 1 100%;
          }
        }
      `}</style>
    </>
  );
};

export default ModuleCreation;