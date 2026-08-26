// import React, { useState } from "react";
// import axiosInstance from "../../../api/axiosInstance";
// import { FaArrowLeft } from "react-icons/fa";
// import { LuBox } from "react-icons/lu";

// const ModuleCreation = () => {
//   const initialState = {
//     moduleName: "",
//     description: "",
//     path: "",
//     hasMenu: true,
//     status: "Active",
//   };

//   const [form, setForm] = useState(initialState);
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   // Handle Input Change
//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === "file") {
//       const file = files[0];

//       if (file) {
//         setImage(file);
//         setPreview(URL.createObjectURL(file));
//       }
//     } else {
//       setForm((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   // Save Module
//   const createModule = async () => {
//     if (!form.moduleName.trim()) {
//       alert("Please enter Module Name");
//       return;
//     }

//     try {
//       const formData = new FormData();

//       formData.append(
//         "module",
//         new Blob([JSON.stringify(form)], {
//           type: "application/json",
//         }),
//       );

//       if (image) {
//         formData.append("image", image);
//       }

//       await axiosInstance.post("/api/module/create", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("Module Created Successfully");

//       setForm(initialState);
//       setImage(null);
//       setPreview("");

//       document.getElementById("imageInput").value = "";
//     } catch (error) {
//       console.error(error);
//       alert("Unable to create module");
//     }
//   };

//   return (
//     <>
//       {/* Header */}
//       <div className="container-fluid px-2">
//         <div
//           className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
//           style={{ minHeight: "70px" }}
//         >
//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//             <div>
//               <h4 className="fw-bold mb-1">Create Modules</h4>

//               <p className="text-muted mb-2">
//                 Create and manage system modules for your platform.
//               </p>

//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb mb-0 small">
//                   <li className="breadcrumb-item">
//                     <a href="/" className="text-decoration-none text-dark">
//                       Dashboard
//                     </a>
//                   </li>

//                   <li className="breadcrumb-item">Module Management</li>

//                   <li className="breadcrumb-item active text-primary">
//                     Module Creation
//                   </li>
//                 </ol>
//               </nav>
//             </div>

//             <button
//               type="button"
//               className="btn btn-outline-primary"
//               onClick={() => window.history.back()}
//             >
//               <FaArrowLeft className="me-2" />
//               Back to Super Admin List
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Form */}

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
//               <LuBox size={18} className="text-white" />
//             </span>
//             Create New Module
//           </h4>

//           <div className="row">
//             {/* Module Name */}

//             <div className="col-md-4 mb-3">
//               <label className="form-label">
//                 <h6>
//                   Module Name <span className="text-danger">*</span>
//                 </h6>
//               </label>

//               <input
//                 type="text"
//                 className="form-control"
//                 name="moduleName"
//                 value={form.moduleName}
//                 onChange={handleChange}
//                 placeholder="Enter module name (e.g. Academic , Attendance)"
//               />
//             </div>

//             {/* Icon */}

//             <div className="col-md-4 mb-3">
//               <label className="form-label">Description</label>

//               <input
//                 type="text"
//                 className="form-control"
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 placeholder="Enter module description"
//               />
//             </div>

//             {/* Has Menu */}

//             <div className="col-md-4 mb-3">
//               <label className="form-label d-block">Has Menu</label>

//               <input
//                 type="checkbox"
//                 name="hasMenu"
//                 checked={form.hasMenu}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Path */}

//             {!form.hasMenu && (
//               <div className="col-md-4 mb-3">
//                 <label className="form-label">Direct Path</label>

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

//             {/* Status */}

//             <div className="col-md-4 mb-3">
//               <label className="form-label">Status</label>

//               <select
//                 className="form-select"
//                 name="status"
//                 value={form.status}
//                 onChange={handleChange}
//               >
//                 <option>Active</option>
//                 <option>Inactive</option>
//               </select>
//             </div>

//             {/* Image */}

//             <div className="col-md-4 mb-3">
//               <label className="form-label">Module Image</label>

//               <input
//                 id="imageInput"
//                 type="file"
//                 className="form-control"
//                 accept=".png,.jpg,.jpeg"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4 mb-3">
//               <label className="form-label">Sequence Number</label>

//               <input
//                 type="text"
//                 className="form-control"
//                 name="sequenceNumber"
//                 value={form.sequenceNumber}
//                 onChange={handleChange}
//                 placeholder="Enter Sequence Number"
//               />
//             </div>

//             {/* Preview */}

//             {preview && (
//               <div className="col-md-3 mb-3">
//                 <label className="form-label">Preview</label>

//                 <div className="border rounded p-2">
//                   <img
//                     src={preview}
//                     alt="Preview"
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

//           <div className="text-end mt-3">
//             <button className="btn btn-primary px-4" onClick={createModule}>
//               Create Module
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
import { FaArrowLeft } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
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

      const response = await axiosInstance.get(
        `/api/module/${id}`
      );

      const data = response.data?.data || response.data;

      console.log("EDIT MODULE:", data);

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

      // Existing image
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
        // UPDATE
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
        // CREATE
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

      // After save go back to list
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
      <div className="container-fluid px-2">
        <div className="bg-white shadow rounded-2 p-5 text-center">
          <div
            className="spinner-border text-primary"
            style={{
              width: "28px",
              height: "28px",
            }}
          />

          <div className="text-muted mt-2">
            Loading module...
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="container-fluid px-2">
        <div
          className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
          style={{
            minHeight: "70px",
          }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <h4 className="fw-bold mb-1">
                {isEditMode
                  ? "Edit Module"
                  : "Create Modules"}
              </h4>

              <p className="text-muted mb-2">
                {isEditMode
                  ? "Update module information and settings."
                  : "Create and manage system modules for your platform."}
              </p>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 small">
                  <li className="breadcrumb-item">
                    <a
                      href="/"
                      className="text-decoration-none text-dark"
                    >
                      Dashboard
                    </a>
                  </li>

                  <li className="breadcrumb-item">
                    Module Management
                  </li>

                  <li className="breadcrumb-item active text-primary">
                    {isEditMode
                      ? "Edit Module"
                      : "Module Creation"}
                  </li>
                </ol>
              </nav>
            </div>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() =>
                navigate("/module-list")
              }
            >
              <FaArrowLeft className="me-2" />

              Back to Module List
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <div className="container-fluid px-2 mt-3">
        <div className="bg-white shadow rounded-2 p-3 mt-2 mb-3">
          <h4 className="mb-4 d-flex align-items-center">
            <span
              className="rounded-circle bg-primary me-2 d-inline-flex align-items-center justify-content-center"
              style={{
                width: "32px",
                height: "32px",
              }}
            >
              <LuBox
                size={18}
                className="text-white"
              />
            </span>

            {isEditMode
              ? "Update Module"
              : "Create New Module"}
          </h4>

          <div className="row">

            {/* MODULE NAME */}

            <div className="col-md-4 mb-3">
              <label className="form-label">
                <h6>
                  Module Name{" "}
                  <span className="text-danger">
                    *
                  </span>
                </h6>
              </label>

              <input
                type="text"
                className="form-control"
                name="moduleName"
                value={form.moduleName}
                onChange={handleChange}
                placeholder="Enter module name"
              />
            </div>

            {/* MODULE CODE */}

            <div className="col-md-4 mb-3">
              <label className="form-label">
                <h6>Module Code</h6>
              </label>

              <input
                type="text"
                className="form-control"
                name="moduleCode"
                value={form.moduleCode}
                onChange={handleChange}
                placeholder="Enter module code"
              />
            </div>

            {/* DESCRIPTION */}

            <div className="col-md-4 mb-3">
              <label className="form-label">
                <h6>Description</h6>
              </label>

              <input
                type="text"
                className="form-control"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter module description"
              />
            </div>

            {/* HAS MENU */}

            <div className="col-md-4 mb-3">
              <label className="form-label d-block">
                <h6>Has Menu</h6>
              </label>

              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="hasMenu"
                  checked={form.hasMenu}
                  onChange={handleChange}
                  id="hasMenu"
                />

                <label
                  className="form-check-label"
                  htmlFor="hasMenu"
                >
                  {form.hasMenu
                    ? "Yes"
                    : "No"}
                </label>
              </div>
            </div>

            {/* DIRECT PATH */}

            {!form.hasMenu && (
              <div className="col-md-4 mb-3">
                <label className="form-label">
                  <h6>Direct Path</h6>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="path"
                  value={form.path}
                  onChange={handleChange}
                  placeholder="/dashboard"
                />
              </div>
            )}

            {/* STATUS */}

            <div className="col-md-4 mb-3">
              <label className="form-label">
                <h6>Status</h6>
              </label>

              <select
                className="form-select"
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

            {/* IMAGE */}

            <div className="col-md-4 mb-3">
              <label className="form-label">
                <h6>Module Image</h6>
              </label>

              <input
                id="imageInput"
                type="file"
                className="form-control"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={handleChange}
              />

              {isEditMode && (
                <small className="text-muted">
                  Leave empty to keep existing image.
                </small>
              )}
            </div>

            {/* SEQUENCE */}

            <div className="col-md-4 mb-3">
              <label className="form-label">
                <h6>Sequence Number</h6>
              </label>

              <input
                type="text"
                className="form-control"
                name="sequenceNumber"
                value={form.sequenceNumber}
                onChange={handleChange}
                placeholder="Enter sequence number"
              />
            </div>

            {/* PREVIEW */}

            {preview && (
              <div className="col-md-3 mb-3">
                <label className="form-label">
                  <h6>Preview</h6>
                </label>

                <div className="border rounded p-2">
                  <img
                    src={preview}
                    alt="Module Preview"
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* BUTTON */}

          <div className="text-end mt-3">
            <button
              type="button"
              className="btn btn-primary px-4"
              onClick={saveModule}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                  />

                  {isEditMode
                    ? "Updating..."
                    : "Creating..."}
                </>
              ) : isEditMode ? (
                "Update Module"
              ) : (
                "Create Module"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleCreation;