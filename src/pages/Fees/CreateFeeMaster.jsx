// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";
// import { FaMoneyCheckAlt } from "react-icons/fa";

// const CreateFeeMaster = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // ==============================
//   // State
//   // ==============================
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const [feeCategories, setFeeCategories] = useState([]);
//   const [feeMaster, setFeeMaster] = useState([]);

//   const [editingId, setEditingId] = useState(null);

//   const [formData, setFormData] = useState({
//     feeName: "",
//     feeCode: "",
//     feeCategory: "",
//     status: "ACTIVE",
//   });

//   // ==============================
//   // Load Data
//   // ==============================
//   useEffect(() => {
//     loadFeeCategories();
//     loadFeeMaster();
//   }, []);

//   // ==============================
//   // Load Fee Categories
//   // ==============================
//   const loadFeeCategories = async () => {
//     try {
//       const res = await axiosInstance.get("/api/master/fee-category", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setFeeCategories(res.data || []);
//     } catch (error) {
//       console.log("Fee Category Error:", error);
//     }
//   };

//   // ==============================
//   // Load Fee Master
//   // ==============================
//   const loadFeeMaster = async () => {
//     try {
//       setLoading(true);

//       const res = await axiosInstance.get("/api/fee-master", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setFeeMaster(res.data || []);
//     } catch (error) {
//       console.log("Fee Master Error:", error);
//       setFeeMaster([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================
//   // Handle Input
//   // ==============================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ==============================
//   // Reset Form
//   // ==============================
//   const resetForm = () => {
//     setFormData({
//       feeName: "",
//       feeCode: "",
//       feeCategory: "",
//       status: "ACTIVE",
//     });

//     setEditingId(null);
//   };

//   // ==============================
//   // Edit Fee Master
//   // ==============================
//   const handleEdit = (item) => {
//     setEditingId(item.id);

//     setFormData({
//       feeName: item.feeName || "",
//       feeCode: item.feeCode || "",
//       feeCategory: item.feeCategory || "",
//       status: item.status || "ACTIVE",
//     });

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // ==============================
//   // Delete Fee Master
//   // ==============================
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this Fee Master?",
//     );

//     if (!confirmDelete) return;

//     try {
//       setLoading(true);

//       const res = await axiosInstance.delete(`/api/fee-master/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert(res.data || "Fee Master deleted successfully");

//       await loadFeeMaster();
//     } catch (error) {
//       console.log("Delete Error:", error);

//       alert(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Fee Master Delete Failed",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================
//   // Save / Update
//   // ==============================
//   const handleSave = async (e) => {
//     e.preventDefault();

//     if (!formData.feeName.trim()) {
//       alert("Please enter Fee Name");
//       return;
//     }

//     if (!formData.feeCode.trim()) {
//       alert("Please enter Fee Code");
//       return;
//     }

//     if (!formData.feeCategory) {
//       alert("Please select Fee Category");
//       return;
//     }

//     if (!formData.status) {
//       alert("Please select Status");
//       return;
//     }

//     try {
//       setSaving(true);

//       let res;

//       if (editingId) {
//         // ==============================
//         // UPDATE
//         // ==============================
//         res = await axiosInstance.put(
//           `/api/fee-master/${editingId}`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           },
//         );
//       } else {
//         // ==============================
//         // CREATE
//         // ==============================
//         res = await axiosInstance.post("/api/fee-master", formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//       }

//       alert(
//         res.data ||
//           (editingId
//             ? "Fee Master updated successfully"
//             : "Fee Master created successfully"),
//       );

//       resetForm();
//       await loadFeeMaster();
//     } catch (error) {
//       console.log("Save Error:", error);

//       alert(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Something went wrong",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <>
//       {/* =====================================================
//           PAGE HEADER
//       ====================================================== */}

//       <div
//         className="mx-2 mt-2 shadow rounded-3 bg-white"
//         style={{
//           borderLeft: "5px solid #0d6efd",
//         }}
//       >
//         <div className="p-3">
//           <div className="d-flex align-items-center gap-3">
//             <div
//               className="d-flex align-items-center justify-content-center rounded-3"
//               style={{
//                 width: "48px",
//                 height: "48px",
//                 background: "linear-gradient(135deg, #0d6efd, #6610f2)",
//                 color: "white",
//                 fontSize: "21px",
//               }}
//             >
//               <FaMoneyCheckAlt />
//             </div>

//             <div>
//               <h5 className="mb-1 fw-bold">Fee Master</h5>

//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb mb-0 small">
//                   <li className="breadcrumb-item">
//                     <a href="/" className="text-decoration-none text-secondary">
//                       Home
//                     </a>
//                   </li>

//                   <li className="breadcrumb-item text-secondary">Master</li>

//                   <li className="breadcrumb-item active">Fee Master</li>
//                 </ol>
//               </nav>
//             </div>

//             <div className="col-md-4 text-md-end mt-2 mt-md-0">
//               <button
//                 type="button"
//                 className="btn btn-secondary btn-sm"
//                 onClick={() => navigate(-1)}
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           CREATE / UPDATE FORM
//       ====================================================== */}
//       <div className="card mx-2 mt-2 shadow rounded-3 bg-white">
//         <div className="card-header">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h6 className="mb-0">
//                 {editingId ? "Update Fee Master" : "Create Fee Master"}
//               </h6>
//             </div>

//             <div className="col-md-4 text-md-end mt-2 mt-md-0">
//               {editingId && (
//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary btn-sm"
//                   onClick={resetForm}
//                 >
//                   Cancel Edit
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="card-body">
//           <form onSubmit={handleSave}>
//             <div className="row">
//               {/* Fee Name */}
//               <div className="col-12 col-md-6 col-lg-3 mb-3">
//                 <label className="form-label">
//                   Fee Name <span className="text-danger">*</span>
//                 </label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   name="feeName"
//                   value={formData.feeName}
//                   onChange={handleChange}
//                   placeholder="Enter Fee Name"
//                 />
//               </div>

//               {/* Fee Code */}
//               <div className="col-12 col-md-6 col-lg-3 mb-3">
//                 <label className="form-label">
//                   Fee Code <span className="text-danger">*</span>
//                 </label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   name="feeCode"
//                   value={formData.feeCode}
//                   onChange={handleChange}
//                   placeholder="Enter Fee Code"
//                 />
//               </div>

//               {/* Fee Category */}
//               <div className="col-12 col-md-6 col-lg-3 mb-3">
//                 <label className="form-label">
//                   Fee Category <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   className="form-select"
//                   name="feeCategory"
//                   value={formData.feeCategory}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Category</option>

//                   {feeCategories.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Status */}
//               <div className="col-12 col-md-6 col-lg-3 mb-3">
//                 <label className="form-label">
//                   Status <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   className="form-select"
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                 >
//                   <option value="ACTIVE">ACTIVE</option>
//                   <option value="INACTIVE">INACTIVE</option>
//                 </select>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="d-flex gap-2 mt-2">
//               <button
//                 type="submit"
//                 className={`btn ${editingId ? "btn-warning" : "btn-primary"}`}
//                 disabled={saving}
//               >
//                 {saving ? (
//                   <>
//                     <span
//                       className="spinner-border spinner-border-sm me-2"
//                       role="status"
//                     ></span>
//                     Saving...
//                   </>
//                 ) : editingId ? (
//                   "Update Fee Master"
//                 ) : (
//                   "Save Fee Master"
//                 )}
//               </button>

//               {editingId && (
//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary"
//                   onClick={resetForm}
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* =====================================================
//           FEE MASTER LIST
//       ====================================================== */}
//       <div className="card mx-2 mt-2 shadow rounded-3 bg-white" >
//         <div className="card-header">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h6 className="mb-0">
//                 <strong>Fee Master List</strong>
//               </h6>
//             </div>

//             <div className="col-md-4 text-md-end mt-2 mt-md-0">
//               <span className="badge bg-primary">
//                 Total: {feeMaster.length}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered table-hover align-middle mb-0">
//               <thead className="table-primary">
//                 <tr>
//                   <th className="text-center">S.No</th>
//                   <th>Fee Code</th>
//                   <th>Fee Name</th>
//                   <th>Fee Category</th>
//                   <th className="text-center">Status</th>
//                   <th className="text-center">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan="6" className="text-center py-4">
//                       <div className="spinner-border text-primary"></div>
//                       <div className="mt-2">Loading...</div>
//                     </td>
//                   </tr>
//                 ) : feeMaster.length > 0 ? (
//                   feeMaster.map((item, index) => (
//                     <tr key={item.id}>
//                       <td className="text-center">{index + 1}</td>

//                       <td>
//                         <strong>{item.feeCode}</strong>
//                       </td>

//                       <td>{item.feeName}</td>

//                       <td>{item.feeCategory}</td>

//                       <td className="text-center">
//                         {item.status === "ACTIVE" ? (
//                           <span className="badge bg-success">ACTIVE</span>
//                         ) : (
//                           <span className="badge bg-danger">INACTIVE</span>
//                         )}
//                       </td>

//                       <td className="text-center">
//                         <button
//                           type="button"
//                           className="btn btn-warning btn-sm me-2"
//                           onClick={() => handleEdit(item)}
//                         >
//                           Edit
//                         </button>

//                         <button
//                           type="button"
//                           className="btn btn-danger btn-sm"
//                           onClick={() => handleDelete(item.id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="text-center py-4">
//                       No Fee Master records found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateFeeMaster;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMoneyCheckAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaArrowLeft,
  FaList,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";
import { MdOutlineSchool, MdCategory } from "react-icons/md";
import axiosInstance from "../../api/axiosInstance";

const CreateFeeMaster = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [feeCategories, setFeeCategories] = useState([]);
  const [feeMaster, setFeeMaster] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    feeName: "",
    feeCode: "",
    feeCategory: "",
    status: "ACTIVE",
  });

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {
    loadFeeCategories();
    loadFeeMaster();
  }, []);

  // =====================================================
  // LOAD FEE CATEGORIES
  // =====================================================

  const loadFeeCategories = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/master/fee-category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFeeCategories(res.data || []);
    } catch (error) {
      console.log("Fee Category Error:", error);
      setFeeCategories([]);
    }
  };

  // =====================================================
  // LOAD FEE MASTER
  // =====================================================

  const loadFeeMaster = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/api/fee-master",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFeeMaster(res.data || []);
    } catch (error) {
      console.log("Fee Master Error:", error);
      setFeeMaster([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // RESET
  // =====================================================

  const resetForm = () => {
    setFormData({
      feeName: "",
      feeCode: "",
      feeCategory: "",
      status: "ACTIVE",
    });

    setEditingId(null);
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      feeName: item.feeName || "",
      feeCode: item.feeCode || "",
      feeCategory: item.feeCategory || "",
      status: item.status || "ACTIVE",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Fee Master?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await axiosInstance.delete(
        `/api/fee-master/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        res.data ||
          "Fee Master deleted successfully."
      );

      await loadFeeMaster();
    } catch (error) {
      console.log("Delete Error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Fee Master Delete Failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SAVE / UPDATE
  // =====================================================

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.feeName.trim()) {
      alert("Please enter Fee Name.");
      return;
    }

    if (!formData.feeCode.trim()) {
      alert("Please enter Fee Code.");
      return;
    }

    if (!formData.feeCategory) {
      alert("Please select Fee Category.");
      return;
    }

    if (!formData.status) {
      alert("Please select Status.");
      return;
    }

    try {
      setSaving(true);

      let res;

      if (editingId) {
        res = await axiosInstance.put(
          `/api/fee-master/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        res = await axiosInstance.post(
          "/api/fee-master",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      alert(
        res.data ||
          (editingId
            ? "Fee Master updated successfully."
            : "Fee Master created successfully.")
      );

      resetForm();
      await loadFeeMaster();
    } catch (error) {
      console.log("Save Error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredFeeMaster = feeMaster.filter(
    (item) => {
      const value = search.toLowerCase();

      return (
        String(item.feeName || "")
          .toLowerCase()
          .includes(value) ||
        String(item.feeCode || "")
          .toLowerCase()
          .includes(value) ||
        String(item.feeCategory || "")
          .toLowerCase()
          .includes(value)
      );
    }
  );

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* =================================================
          PAGE HEADER
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

              {/* LEFT */}

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
                  <FaMoneyCheckAlt size={25} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Fee Master
                  </h5>

                  <div className="text-muted small">
                    Master &nbsp;/&nbsp;
                    Fee Master
                  </div>
                </div>
              </div>

              {/* RIGHT */}

              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border:
                      "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Fee Management
                </span>

                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeft className="me-1" />
                  Back
                </button>
              </div>
            </div>
          </div>

          {/* BREADCRUMB */}

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
              Home &nbsp;›&nbsp; Master
              &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Fee Master
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <div className="px-2">
        <div className="card border-0 shadow rounded-4 mb-4 overflow-hidden">

          {/* FORM HEADER */}

          <div className="card-header bg-white py-3">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">

              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                  }}
                >
                  {editingId ? (
                    <FaEdit size={19} />
                  ) : (
                    <FaPlus size={19} />
                  )}
                </div>

                <div className="ms-2">
                  <h6 className="mb-0 fw-bold">
                    {editingId
                      ? "Update Fee Master"
                      : "Create Fee Master"}
                  </h6>

                  <small className="text-muted">
                    {editingId
                      ? "Update existing fee information"
                      : "Create a new fee master"}
                  </small>
                </div>
              </div>

              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={resetForm}
                >
                  <FaTimes className="me-1" />
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          {/* FORM BODY */}

          <div className="card-body p-4">
            <form onSubmit={handleSave}>

              <div className="row g-3">

                {/* FEE NAME */}

                <div className="col-12 col-md-6 col-xl-3">
                  <label className="form-label fw-semibold">
                    Fee Name
                    <span className="text-danger">
                      {" "}*
                    </span>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="feeName"
                    value={formData.feeName}
                    onChange={handleChange}
                    placeholder="Enter fee name"
                  />
                </div>

                {/* FEE CODE */}

                <div className="col-12 col-md-6 col-xl-3">
                  <label className="form-label fw-semibold">
                    Fee Code
                    <span className="text-danger">
                      {" "}*
                    </span>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="feeCode"
                    value={formData.feeCode}
                    onChange={handleChange}
                    placeholder="Enter fee code"
                  />
                </div>

                {/* CATEGORY */}

                <div className="col-12 col-md-6 col-xl-3">
                  <label className="form-label fw-semibold">
                    Fee Category
                    <span className="text-danger">
                      {" "}*
                    </span>
                  </label>

                  <select
                    className="form-select"
                    name="feeCategory"
                    value={formData.feeCategory}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Category
                    </option>

                    {feeCategories.map(
                      (item, index) => (
                        <option
                          key={`${item}-${index}`}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* STATUS */}

                <div className="col-12 col-md-6 col-xl-3">
                  <label className="form-label fw-semibold">
                    Status
                    <span className="text-danger">
                      {" "}*
                    </span>
                  </label>

                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="ACTIVE">
                      ACTIVE
                    </option>

                    <option value="INACTIVE">
                      INACTIVE
                    </option>
                  </select>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="d-flex flex-wrap gap-2 mt-4">

                <button
                  type="submit"
                  className={`btn ${
                    editingId
                      ? "btn-warning"
                      : "btn-primary"
                  } px-4`}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Saving...
                    </>
                  ) : editingId ? (
                    <>
                      <FaEdit className="me-2" />
                      Update Fee Master
                    </>
                  ) : (
                    <>
                      <FaSave className="me-2" />
                      Save Fee Master
                    </>
                  )}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={resetForm}
                  >
                    <FaTimes className="me-2" />
                    Clear
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="px-2">
        <div className="row g-3 mb-4">

          {/* TOTAL */}

          <div className="col-12 col-md-4">
            <div
              className="card border-0 shadow-sm rounded-4 h-100"
              style={{
                background:
                  "linear-gradient(135deg,#eff6ff,#ffffff)",
              }}
            >
              <div className="card-body d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3 me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                  }}
                >
                  <FaList size={20} />
                </div>

                <div>
                  <small className="text-muted">
                    Total Fee Master
                  </small>

                  <h4 className="mb-0 fw-bold">
                    {feeMaster.length}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVE */}

          <div className="col-12 col-md-4">
            <div
              className="card border-0 shadow-sm rounded-4 h-100"
              style={{
                background:
                  "linear-gradient(135deg,#ecfdf5,#ffffff)",
              }}
            >
              <div className="card-body d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3 me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                    background:
                      "linear-gradient(135deg,#198754,#20c997)",
                    color: "#fff",
                  }}
                >
                  <FaCheckCircle size={20} />
                </div>

                <div>
                  <small className="text-muted">
                    Active Fees
                  </small>

                  <h4 className="mb-0 fw-bold text-success">
                    {
                      feeMaster.filter(
                        (item) =>
                          item.status ===
                          "ACTIVE"
                      ).length
                    }
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* CATEGORIES */}

          <div className="col-12 col-md-4">
            <div
              className="card border-0 shadow-sm rounded-4 h-100"
              style={{
                background:
                  "linear-gradient(135deg,#fff7ed,#ffffff)",
              }}
            >
              <div className="card-body d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3 me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                    background:
                      "linear-gradient(135deg,#f59e0b,#f97316)",
                    color: "#fff",
                  }}
                >
                  <MdCategory size={23} />
                </div>

                <div>
                  <small className="text-muted">
                    Categories
                  </small>

                  <h4 className="mb-0 fw-bold text-warning">
                    {feeCategories.length}
                  </h4>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =================================================
          FEE MASTER LIST
      ================================================= */}

      <div className="px-2">
        <div className="card border-0 shadow rounded-4 mb-5 overflow-hidden">

          {/* HEADER */}

          <div className="card-header bg-white py-3">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

              <div className="d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                  }}
                >
                  <FaList size={19} />
                </div>

                <div className="ms-2">
                  <h6 className="mb-0 fw-bold">
                    Fee Master List
                  </h6>

                  <small className="text-muted">
                    Manage all fee master records
                  </small>
                </div>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border:
                    "1px solid #bfdbfe",
                }}
              >
                Total: {feeMaster.length}
              </span>
            </div>
          </div>

          {/* SEARCH */}

          <div className="card-body border-bottom py-3">
            <div className="row align-items-center g-3">

              <div className="col-12 col-md-6">
                <div className="input-group">

                  <span className="input-group-text bg-white">
                    <FaSearch className="text-muted" />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search fee name, code or category..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 text-md-end">
                <small className="text-muted">
                  Showing{" "}
                  <strong>
                    {filteredFeeMaster.length}
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {feeMaster.length}
                  </strong>{" "}
                  records
                </small>
              </div>
            </div>
          </div>

          {/* TABLE */}

          <div className="card-body p-0">
            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead
                  className="small text-center"
                  style={{
                    backgroundColor: "#f8fafc",
                  }}
                >
                  <tr>
                    <th className="py-3">
                      S.No
                    </th>

                    <th className="py-3">
                      Fee Code
                    </th>

                    <th className="py-3">
                      Fee Name
                    </th>

                    <th className="py-3">
                      Category
                    </th>

                    <th className="py-3">
                      Status
                    </th>

                    <th className="py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="small">

                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-5"
                      >
                        <div className="spinner-border text-primary" />

                        <div className="mt-2 text-muted">
                          Loading Fee Master...
                        </div>
                      </td>
                    </tr>
                  ) : filteredFeeMaster.length >
                    0 ? (
                    filteredFeeMaster.map(
                      (item, index) => (
                        <tr key={item.id}>

                          <td className="text-center">
                            <span className="text-muted">
                              {index + 1}
                            </span>
                          </td>

                          <td>
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
                              {item.feeCode}
                            </span>
                          </td>

                          <td>
                            <div className="fw-semibold text-dark">
                              {item.feeName}
                            </div>
                          </td>

                          <td>
                            <span className="badge bg-light text-dark border">
                              {item.feeCategory}
                            </span>
                          </td>

                          <td className="text-center">
                            {item.status ===
                            "ACTIVE" ? (
                              <span className="badge rounded-pill bg-success px-3">
                                <FaCheckCircle className="me-1" />
                                ACTIVE
                              </span>
                            ) : (
                              <span className="badge rounded-pill bg-danger px-3">
                                INACTIVE
                              </span>
                            )}
                          </td>

                          <td className="text-center">

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-warning me-2"
                              onClick={() =>
                                handleEdit(item)
                              }
                              title="Edit"
                            >
                              <FaEdit />
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleDelete(
                                  item.id
                                )
                              }
                              title="Delete"
                            >
                              <FaTrash />
                            </button>

                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-5"
                      >
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            background:
                              "#eff6ff",
                            color:
                              "#2563eb",
                          }}
                        >
                          <FaMoneyCheckAlt
                            size={25}
                          />
                        </div>

                        <h6 className="fw-bold">
                          No Fee Master Found
                        </h6>

                        <p className="text-muted small mb-0">
                          Create a Fee Master
                          using the form above.
                        </p>
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateFeeMaster;

