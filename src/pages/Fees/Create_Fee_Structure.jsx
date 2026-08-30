// import React, { useEffect, useMemo, useState } from "react";
// import {
//   LuPlus,
//   LuPencil,
//   LuTrash2,
//   LuX,
//   LuSearch,
//   LuRefreshCw,
//   LuSave,
//   LuLayers,
// } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";

// const Create_Fee_Structure = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // =====================================================
//   // FORM
//   // =====================================================

//   const initialFormData = {
//     session: "",
//     standard: "",
//     category: "",
//     batch: "",
//   };

//   const initialFeeInput = {
//     type: "",
//     amount: "",
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [feeInput, setFeeInput] = useState(initialFeeInput);

//   // =====================================================
//   // DATA
//   // =====================================================

//   const [feeCategories, setFeeCategories] = useState([]);
//   const [feeBatches, setFeeBatches] = useState([]);
//   const [standards, setStandards] = useState([]);
//   const [sessions, setSessions] = useState([]);
//   const [feeMaster, setFeeMaster] = useState([]);
//   const [feeStructures, setFeeStructures] = useState([]);

//   // Fees being added to current structure
//   const [fees, setFees] = useState([]);

//   // =====================================================
//   // EDIT STATES
//   // =====================================================

//   const [editingId, setEditingId] = useState(null);
//   const [editIndex, setEditIndex] = useState(null);

//   // =====================================================
//   // LOADING
//   // =====================================================

//   const [pageLoading, setPageLoading] = useState(false);
//   const [saveLoading, setSaveLoading] = useState(false);

//   // =====================================================
//   // FILTER
//   // =====================================================

//   const [filter, setFilter] = useState({
//     session: "",
//     standard: "",
//     category: "",
//     batch: "",
//     search: "",
//   });

//   // =====================================================
//   // LOAD ALL MASTER DATA
//   // =====================================================

//   useEffect(() => {
//     loadMasterData();
//     loadFeeStructures();
//   }, []);

//   const authConfig = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const loadMasterData = async () => {
//     setPageLoading(true);

//     try {
//       const [
//         sessionRes,
//         standardRes,
//         categoryRes,
//         batchRes,
//         feeMasterRes,
//       ] = await Promise.all([
//         axiosInstance.get("/api/master/sessions", authConfig),
//         axiosInstance.get("/api/master/standard", authConfig),
//         axiosInstance.get("/api/master/fee-category", authConfig),
//         axiosInstance.get("/api/master/fee-batch", authConfig),
//         axiosInstance.get("/api/fee-master", authConfig),
//       ]);

//       setSessions(sessionRes.data || []);
//       setStandards(standardRes.data || []);
//       setFeeCategories(categoryRes.data || []);
//       setFeeBatches(batchRes.data || []);
//       setFeeMaster(feeMasterRes.data || []);
//     } catch (error) {
//       console.error("Master data error:", error);

//       alert(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Unable to load master data",
//       );
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   // =====================================================
//   // LOAD FEE STRUCTURES
//   // =====================================================

//   const loadFeeStructures = async () => {
//     try {
//       const res = await axiosInstance.get(
//         "/api/fee-structure",
//         authConfig,
//       );

//       setFeeStructures(res.data || []);
//     } catch (error) {
//       console.error("Fee structure error:", error);
//       setFeeStructures([]);
//     }
//   };

//   // =====================================================
//   // FORM CHANGE
//   // =====================================================

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =====================================================
//   // FEE INPUT CHANGE
//   // =====================================================

//   const handleFeeInputChange = (e) => {
//     const { name, value } = e.target;

//     setFeeInput((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =====================================================
//   // ADD / UPDATE FEE IN TEMPORARY LIST
//   // =====================================================

//   const handleAddFee = () => {
//     if (!feeInput.type || !feeInput.amount) {
//       alert("Please select Fee Type and enter Amount.");
//       return;
//     }

//     if (Number(feeInput.amount) <= 0) {
//       alert("Amount must be greater than 0.");
//       return;
//     }

//     const selectedFee = feeMaster.find(
//       (item) => String(item.id) === String(feeInput.type),
//     );

//     if (!selectedFee) {
//       alert("Invalid Fee Type.");
//       return;
//     }

//     const obj = {
//       feeMasterId: selectedFee.id,
//       feeName: selectedFee.feeName,
//       feeCode: selectedFee.feeCode,
//       amount: Number(feeInput.amount),
//     };

//     // UPDATE EXISTING TEMP FEE
//     if (editIndex !== null) {
//       const updatedFees = [...fees];
//       updatedFees[editIndex] = obj;

//       setFees(updatedFees);
//       setEditIndex(null);
//     } else {
//       // Prevent duplicate fee type
//       const alreadyExists = fees.some(
//         (fee) => Number(fee.feeMasterId) === Number(selectedFee.id),
//       );

//       if (alreadyExists) {
//         alert("This Fee Type is already added.");
//         return;
//       }

//       setFees((prev) => [...prev, obj]);
//     }

//     setFeeInput(initialFeeInput);
//   };

//   // =====================================================
//   // EDIT TEMP FEE
//   // =====================================================

//   const handleEditFee = (index) => {
//     const fee = fees[index];

//     setFeeInput({
//       type: String(fee.feeMasterId),
//       amount: fee.amount,
//     });

//     setEditIndex(index);
//   };

//   // =====================================================
//   // DELETE TEMP FEE
//   // =====================================================

//   const handleDeleteFee = (index) => {
//     const updatedFees = fees.filter((_, i) => i !== index);

//     setFees(updatedFees);

//     if (editIndex === index) {
//       setEditIndex(null);
//       setFeeInput(initialFeeInput);
//     }
//   };

//   // =====================================================
//   // CANCEL TEMP FEE EDIT
//   // =====================================================

//   const handleCancelFeeEdit = () => {
//     setEditIndex(null);
//     setFeeInput(initialFeeInput);
//   };

//   // =====================================================
//   // EDIT FEE STRUCTURE
//   // =====================================================

//   const handleEdit = (item) => {
//     setEditingId(item.id);

//     setFormData({
//       session: item.session || "",
//       standard: item.standard || "",
//       category: item.feeCategory || "",
//       batch: item.batch || "",
//     });

//     setFees(
//       (item.feeDetails || []).map((detail) => ({
//         feeMasterId: detail.feeMaster?.id,
//         feeName: detail.feeMaster?.feeName,
//         feeCode: detail.feeMaster?.feeCode,
//         amount: detail.amount,
//       })),
//     );

//     setFeeInput(initialFeeInput);
//     setEditIndex(null);

//     // Scroll to form
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // =====================================================
//   // RESET FORM
//   // =====================================================

//   const resetForm = () => {
//     setEditingId(null);
//     setEditIndex(null);
//     setFormData(initialFormData);
//     setFeeInput(initialFeeInput);
//     setFees([]);
//   };

//   // =====================================================
//   // SAVE / UPDATE
//   // =====================================================

//   const handleSave = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.session ||
//       !formData.standard ||
//       !formData.category ||
//       !formData.batch
//     ) {
//       alert("Please fill all Fee Structure fields.");
//       return;
//     }

//     if (fees.length === 0) {
//       alert("Please add at least one fee.");
//       return;
//     }

//     const payload = {
//       session: formData.session,
//       standard: formData.standard,
//       feeCategory: formData.category,
//       batch: formData.batch,
//       fees: fees.map((item) => ({
//         feeMasterId: item.feeMasterId,
//         amount: Number(item.amount),
//       })),
//     };

//     console.log("editingId =", editingId);
//     console.log("payload =", payload);

//     setSaveLoading(true);

//     try {
//       let res;

//       if (editingId) {
//         res = await axiosInstance.put(
//           `/api/fee-structure/${editingId}`,
//           payload,
//           {
//             ...authConfig,
//             headers: {
//               ...authConfig.headers,
//               "Content-Type": "application/json",
//             },
//           },
//         );
//       } else {
//         res = await axiosInstance.post(
//           "/api/fee-structure",
//           payload,
//           {
//             ...authConfig,
//             headers: {
//               ...authConfig.headers,
//               "Content-Type": "application/json",
//             },
//           },
//         );
//       }

//       alert(
//         res.data?.message ||
//           res.data ||
//           (editingId
//             ? "Fee Structure Updated Successfully"
//             : "Fee Structure Created Successfully"),
//       );

//       resetForm();
//       await loadFeeStructures();
//     } catch (error) {
//       console.error("Save Fee Structure Error:", error);

//       alert(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Something went wrong",
//       );
//     } finally {
//       setSaveLoading(false);
//     }
//   };

//   // =====================================================
//   // DELETE STRUCTURE
//   // =====================================================

//   const handleDelete = async (id) => {
//     if (
//       !window.confirm(
//         "Are you sure you want to delete this Fee Structure?",
//       )
//     ) {
//       return;
//     }

//     try {
//       const res = await axiosInstance.delete(
//         `/api/fee-structure/${id}`,
//         authConfig,
//       );

//       alert(
//         res.data?.message ||
//           res.data ||
//           "Fee Structure deleted successfully",
//       );

//       if (editingId === id) {
//         resetForm();
//       }

//       await loadFeeStructures();
//     } catch (error) {
//       console.error("Delete Error:", error);

//       alert(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Delete Failed",
//       );
//     }
//   };

//   // =====================================================
//   // FILTER CHANGE
//   // =====================================================

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;

//     setFilter((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =====================================================
//   // FILTER STRUCTURES
//   // =====================================================

//   const filteredStructures = useMemo(() => {
//     return feeStructures.filter((item) => {
//       const search = filter.search.toLowerCase();

//       const matchesSearch =
//         !search ||
//         item.session?.toLowerCase().includes(search) ||
//         item.standard?.toLowerCase().includes(search) ||
//         item.feeCategory?.toLowerCase().includes(search) ||
//         item.batch?.toLowerCase().includes(search);

//       const matchesSession =
//         !filter.session || item.session === filter.session;

//       const matchesStandard =
//         !filter.standard || item.standard === filter.standard;

//       const matchesCategory =
//         !filter.category || item.feeCategory === filter.category;

//       const matchesBatch =
//         !filter.batch || item.batch === filter.batch;

//       return (
//         matchesSearch &&
//         matchesSession &&
//         matchesStandard &&
//         matchesCategory &&
//         matchesBatch
//       );
//     });
//   }, [feeStructures, filter]);

//   // =====================================================
//   // CLEAR FILTER
//   // =====================================================

//   const clearFilter = () => {
//     setFilter({
//       session: "",
//       standard: "",
//       category: "",
//       batch: "",
//       search: "",
//     });
//   };

//   // =====================================================
//   // BATCH VALUE HELPER
//   // =====================================================

//   const getBatchValue = (item) => {
//     if (typeof item === "string") return item;

//     return item?.batch || item?.name || item?.value || "";
//   };

//   // =====================================================
//   // TOTAL CURRENT FEES
//   // =====================================================

//   const totalCurrentFee = fees.reduce(
//     (sum, fee) => sum + Number(fee.amount || 0),
//     0,
//   );

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <>
//       {/* =====================================================
//           PAGE HEADER
//       ===================================================== */}

//       <div
//         className="bg-white shadow rounded-3 p-3 mb-3"
//          style={{
//           borderLeft: "5px solid #0d6efd",
//         }}
//       >
//         <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//           <div>
//             <h5 className="mb-1">
//               <strong>Fee Structure</strong>
//             </h5>

//             <nav aria-label="breadcrumb">
//               <ol className="breadcrumb mb-0">
//                 <li className="breadcrumb-item">
//                   <span>Home</span>
//                 </li>

//                 <li className="breadcrumb-item">
//                   <span>Fee</span>
//                 </li>

//                 <li className="breadcrumb-item active">
//                   Fee Structure
//                 </li>
//               </ol>
//             </nav>
//           </div>

//           <button
//             type="button"
//             className="btn btn-outline-primary"
//             onClick={() => navigate("fee-types")}
//           >
//             <LuLayers className="me-1" size={17} />
//             Fee Type Master
//           </button>
//         </div>
//       </div>

//       {/* =====================================================
//           CREATE / UPDATE FORM
//       ===================================================== */}

//       <div className="card border-0 shadow mb-3">
//         <div className="card-header bg-white py-3">
//           <div className="d-flex justify-content-between align-items-center">
//             <h6 className="mb-0">
//               <strong>
//                 {editingId
//                   ? "Update Fee Structure"
//                   : "Create Fee Structure"}
//               </strong>
//             </h6>

//             {editingId && (
//               <button
//                 type="button"
//                 className="btn btn-sm btn-outline-secondary"
//                 onClick={resetForm}
//               >
//                 <LuX size={16} className="me-1" />
//                 Cancel Edit
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="card-body">
//           {pageLoading ? (
//             <div className="text-center py-4">
//               <div className="spinner-border text-primary" />
//               <p className="mt-2 mb-0 text-muted">
//                 Loading master data...
//               </p>
//             </div>
//           ) : (
//             <form onSubmit={handleSave}>
//               {/* ==========================
//                   STRUCTURE DETAILS
//               ========================== */}

//               <div className="row g-3">
//                 {/* Session */}

//                 <div className="col-12 col-md-6 col-xl-3">
//                   <label className="form-label">
//                     Session <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     className="form-select"
//                     name="session"
//                     value={formData.session}
//                     onChange={handleFormChange}
//                   >
//                     <option value="">Select Session</option>

//                     {sessions.map((item, index) => (
//                       <option key={index} value={item}>
//                         {String(item).replaceAll("_", "-")}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Standard */}

//                 <div className="col-12 col-md-6 col-xl-3">
//                   <label className="form-label">
//                     Standard <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     className="form-select"
//                     name="standard"
//                     value={formData.standard}
//                     onChange={handleFormChange}
//                   >
//                     <option value="">Select Standard</option>

//                     {standards.map((item, index) => (
//                       <option key={index} value={item}>
//                         {item}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Category */}

//                 <div className="col-12 col-md-6 col-xl-3">
//                   <label className="form-label">
//                     Fee Category <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     className="form-select"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleFormChange}
//                   >
//                     <option value="">Select Category</option>

//                     {feeCategories.map((item, index) => (
//                       <option key={index} value={item}>
//                         {item}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Batch */}

//                 <div className="col-12 col-md-6 col-xl-3">
//                   <label className="form-label">
//                     Fee Batch <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     className="form-select"
//                     name="batch"
//                     value={formData.batch}
//                     onChange={handleFormChange}
//                   >
//                     <option value="">Select Batch</option>

//                     {feeBatches.map((item, index) => {
//                       const value = getBatchValue(item);

//                       return (
//                         <option key={index} value={value}>
//                           {value}
//                         </option>
//                       );
//                     })}
//                   </select>
//                 </div>
//               </div>

//               <hr className="my-4" />

//               {/* ==========================
//                   ADD FEE
//               ========================== */}

//               <div className="mb-3">
//                 <h6 className="mb-3">
//                   <strong>Add Fee Components</strong>
//                 </h6>

//                 <div className="row g-3">
//                   <div className="col-12 col-md-5">
//                     <label className="form-label">
//                       Fee Type
//                     </label>

//                     <select
//                       className="form-select"
//                       name="type"
//                       value={feeInput.type}
//                       onChange={handleFeeInputChange}
//                     >
//                       <option value="">
//                         Select Fee Type
//                       </option>

//                       {feeMaster.map((item) => (
//                         <option key={item.id} value={item.id}>
//                           {item.feeCode
//                             ? `${item.feeCode} - ${item.feeName}`
//                             : item.feeName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="col-12 col-md-5">
//                     <label className="form-label">
//                       Amount
//                     </label>

//                     <input
//                       type="number"
//                       min="0"
//                       className="form-control"
//                       placeholder="Enter Amount"
//                       name="amount"
//                       value={feeInput.amount}
//                       onChange={handleFeeInputChange}
//                     />
//                   </div>

//                   <div className="col-12 col-md-2 d-flex align-items-end">
//                     <div className="w-100 d-flex gap-2">
//                       <button
//                         type="button"
//                         className="btn btn-primary flex-grow-1"
//                         onClick={handleAddFee}
//                       >
//                         {editIndex !== null ? (
//                           <>
//                             <LuPencil
//                               size={16}
//                               className="me-1"
//                             />
//                             Update
//                           </>
//                         ) : (
//                           <>
//                             <LuPlus
//                               size={16}
//                               className="me-1"
//                             />
//                             Add
//                           </>
//                         )}
//                       </button>

//                       {editIndex !== null && (
//                         <button
//                           type="button"
//                           className="btn btn-outline-secondary"
//                           onClick={handleCancelFeeEdit}
//                         >
//                           <LuX size={17} />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ==========================
//                   TEMP FEE TABLE
//               ========================== */}

//               <div className="table-responsive">
//                 <table className="table table-bordered table-hover align-middle mb-2">
//                   <thead className="table-light">
//                     <tr>
//                       <th width="70">S.No</th>
//                       <th>Fee Code</th>
//                       <th>Fee Type</th>
//                       <th>Amount</th>
//                       <th width="150">Action</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {fees.length === 0 ? (
//                       <tr>
//                         <td
//                           colSpan="5"
//                           className="text-center text-muted py-4"
//                         >
//                           No fee components added yet.
//                         </td>
//                       </tr>
//                     ) : (
//                       fees.map((fee, index) => (
//                         <tr key={`${fee.feeMasterId}-${index}`}>
//                           <td>{index + 1}</td>

//                           <td>{fee.feeCode || "-"}</td>

//                           <td>{fee.feeName}</td>

//                           <td>
//                             <strong>
//                               ₹ {Number(fee.amount).toLocaleString("en-IN")}
//                             </strong>
//                           </td>

//                           <td>
//                             <button
//                               type="button"
//                               className="btn btn-sm btn-outline-warning me-2"
//                               title="Edit"
//                               onClick={() =>
//                                 handleEditFee(index)
//                               }
//                             >
//                               <LuPencil size={15} />
//                             </button>

//                             <button
//                               type="button"
//                               className="btn btn-sm btn-outline-danger"
//                               title="Delete"
//                               onClick={() =>
//                                 handleDeleteFee(index)
//                               }
//                             >
//                               <LuTrash2 size={15} />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>

//                   {fees.length > 0 && (
//                     <tfoot>
//                       <tr>
//                         <th
//                           colSpan="3"
//                           className="text-end"
//                         >
//                           Total Fee
//                         </th>

//                         <th>
//                           ₹{" "}
//                           {totalCurrentFee.toLocaleString(
//                             "en-IN",
//                           )}
//                         </th>

//                         <th></th>
//                       </tr>
//                     </tfoot>
//                   )}
//                 </table>
//               </div>

//               {/* ==========================
//                   SAVE
//               ========================== */}

//               <div className="d-flex justify-content-end gap-2 mt-4">
//                 {editingId && (
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={resetForm}
//                     disabled={saveLoading}
//                   >
//                     <LuX className="me-1" />
//                     Cancel
//                   </button>
//                 )}

//                 <button
//                   type="submit"
//                   className="btn btn-success px-4"
//                   disabled={saveLoading}
//                 >
//                   {saveLoading ? (
//                     <>
//                       <span
//                         className="spinner-border spinner-border-sm me-2"
//                         role="status"
//                       />

//                       Saving...
//                     </>
//                   ) : editingId ? (
//                     <>
//                       <LuSave className="me-1" />
//                       Update Fee Structure
//                     </>
//                   ) : (
//                     <>
//                       <LuSave className="me-1" />
//                       Save Fee Structure
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>

//       {/* =====================================================
//           FILTER
//       ===================================================== */}

//       <div className="card border-0 shadow mb-3">
//         <div className="card-header bg-white py-3">
//           <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//             <h6 className="mb-0">
//               <strong>Search Fee Structures</strong>
//             </h6>

//             <button
//               type="button"
//               className="btn btn-sm btn-outline-secondary"
//               onClick={clearFilter}
//             >
//               <LuRefreshCw size={15} className="me-1" />
//               Clear
//             </button>
//           </div>
//         </div>

//         <div className="card-body">
//           <div className="row g-3">
//             <div className="col-12 col-md-6 col-xl-2">
//               <label className="form-label">Session</label>

//               <select
//                 className="form-select"
//                 name="session"
//                 value={filter.session}
//                 onChange={handleFilterChange}
//               >
//                 <option value="">All Sessions</option>

//                 {sessions.map((item, index) => (
//                   <option key={index} value={item}>
//                     {String(item).replaceAll("_", "-")}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-12 col-md-6 col-xl-2">
//               <label className="form-label">Standard</label>

//               <select
//                 className="form-select"
//                 name="standard"
//                 value={filter.standard}
//                 onChange={handleFilterChange}
//               >
//                 <option value="">All Standards</option>

//                 {standards.map((item, index) => (
//                   <option key={index} value={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-12 col-md-6 col-xl-2">
//               <label className="form-label">Category</label>

//               <select
//                 className="form-select"
//                 name="category"
//                 value={filter.category}
//                 onChange={handleFilterChange}
//               >
//                 <option value="">All Categories</option>

//                 {feeCategories.map((item, index) => (
//                   <option key={index} value={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-12 col-md-6 col-xl-2">
//               <label className="form-label">Batch</label>

//               <select
//                 className="form-select"
//                 name="batch"
//                 value={filter.batch}
//                 onChange={handleFilterChange}
//               >
//                 <option value="">All Batches</option>

//                 {feeBatches.map((item, index) => {
//                   const value = getBatchValue(item);

//                   return (
//                     <option key={index} value={value}>
//                       {value}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>

//             <div className="col-12 col-xl-4">
//               <label className="form-label">
//                 Search
//               </label>

//               <div className="input-group">
//                 <span className="input-group-text bg-white">
//                   <LuSearch size={17} />
//                 </span>

//                 <input
//                   type="search"
//                   className="form-control"
//                   name="search"
//                   value={filter.search}
//                   onChange={handleFilterChange}
//                   placeholder="Search session, class, category..."
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           FEE STRUCTURE LIST
//       ===================================================== */}

//       <div className="card border-0 shadow mb-4">
//         <div className="card-header bg-white py-3">
//           <div className="d-flex justify-content-between align-items-center">
//             <h6 className="mb-0">
//               <strong>Fee Structure List</strong>
//             </h6>

//             <span className="badge bg-primary">
//               {filteredStructures.length} Structure
//               {filteredStructures.length !== 1 ? "s" : ""}
//             </span>
//           </div>
//         </div>

//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered table-hover align-middle">
//               <thead className="table-primary">
//                 <tr>
//                   <th>S.No</th>
//                   <th>Session</th>
//                   <th>Standard</th>
//                   <th>Category</th>
//                   <th>Batch</th>
//                   <th>Fee Code</th>
//                   <th>Fee Name</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                   <th width="130">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredStructures.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="10"
//                       className="text-center py-5 text-muted"
//                     >
//                       <div className="mb-2">
//                         <LuLayers size={30} />
//                       </div>

//                       No Fee Structure Found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredStructures.map((item, index) => {
//                     const details = item.feeDetails || [];

//                     return details.length > 0 ? (
//                       details.map((detail, detailIndex) => (
//                         <tr key={`${item.id}-${detail.id}`}>
//                           {detailIndex === 0 && (
//                             <>
//                               <td
//                                 rowSpan={details.length}
//                                 className="text-center"
//                               >
//                                 {index + 1}
//                               </td>

//                               <td
//                                 rowSpan={details.length}
//                               >
//                                 {item.session}
//                               </td>

//                               <td
//                                 rowSpan={details.length}
//                               >
//                                 {item.standard}
//                               </td>

//                               <td
//                                 rowSpan={details.length}
//                               >
//                                 {item.feeCategory}
//                               </td>

//                               <td
//                                 rowSpan={details.length}
//                               >
//                                 {item.batch}
//                               </td>
//                             </>
//                           )}

//                           <td>
//                             {detail.feeMaster?.feeCode ||
//                               "-"}
//                           </td>

//                           <td>
//                             {detail.feeMaster?.feeName ||
//                               "-"}
//                           </td>

//                           <td>
//                             <strong>
//                               ₹{" "}
//                               {Number(
//                                 detail.amount || 0,
//                               ).toLocaleString("en-IN")}
//                             </strong>
//                           </td>

//                           <td>
//                             {detail.feeMaster?.status ===
//                             "ACTIVE" ? (
//                               <span className="badge bg-success">
//                                 ACTIVE
//                               </span>
//                             ) : (
//                               <span className="badge bg-danger">
//                                 INACTIVE
//                               </span>
//                             )}
//                           </td>

//                           {detailIndex === 0 && (
//                             <td
//                               rowSpan={details.length}
//                               className="text-center"
//                             >
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-outline-warning me-2"
//                                 title="Edit Structure"
//                                 onClick={() =>
//                                   handleEdit(item)
//                                 }
//                               >
//                                 <LuPencil size={16} />
//                               </button>

//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-outline-danger"
//                                 title="Delete Structure"
//                                 onClick={() =>
//                                   handleDelete(item.id)
//                                 }
//                               >
//                                 <LuTrash2 size={16} />
//                               </button>
//                             </td>
//                           )}
//                         </tr>
//                       ))
//                     ) : (
//                       <tr key={item.id}>
//                         <td>{index + 1}</td>
//                         <td>{item.session}</td>
//                         <td>{item.standard}</td>
//                         <td>{item.feeCategory}</td>
//                         <td>{item.batch}</td>
//                         <td colSpan="5">
//                           No fee details available
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Create_Fee_Structure;



import { useEffect, useMemo, useState } from "react";
import {
  FaEdit,
  FaPlus,
  FaRedo,
  FaSearch,
  FaTrash,
  FaMoneyBillWave,
  FaFilter,
  // FaCalendarDays,
  FaLayerGroup,
  FaList,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const CreateFeeStructure = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  /* =========================================================
     AUTH CONFIG
  ========================================================= */

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  /* =========================================================
     INITIAL FORM
  ========================================================= */

  const initialFormData = {
    session: "",
    standard: "",
    category: "",
    batch: "",
  };

  const initialFeeInput = {
    type: "",
    amount: "",
  };

  const initialFilters = {
    session: "",
    standard: "",
    category: "",
    batch: "",
    search: "",
  };

  /* =========================================================
     FORM STATES
  ========================================================= */

  const [formData, setFormData] = useState(initialFormData);

  const [feeInput, setFeeInput] = useState(initialFeeInput);

  const [fees, setFees] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [editIndex, setEditIndex] = useState(null);

  /* =========================================================
     MASTER DATA
  ========================================================= */

  const [sessions, setSessions] = useState([]);

  const [standards, setStandards] = useState([]);

  const [feeCategories, setFeeCategories] = useState([]);

  const [feeBatches, setFeeBatches] = useState([]);

  const [feeMaster, setFeeMaster] = useState([]);

  /* =========================================================
     FEE STRUCTURES
  ========================================================= */

  const [feeStructures, setFeeStructures] = useState([]);

  /* =========================================================
     FILTER
  ========================================================= */

  const [filters, setFilters] = useState(initialFilters);

  /* =========================================================
     LOADING
  ========================================================= */

  const [pageLoading, setPageLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const [saveLoading, setSaveLoading] = useState(false);

  /* =========================================================
     LOAD ALL DATA
  ========================================================= */

  useEffect(() => {
    loadMasterData();
    loadFeeStructures();
  }, []);

  /* =========================================================
     LOAD MASTER DATA
  ========================================================= */

  const loadMasterData = async () => {
    try {
      setPageLoading(true);

      const [
        sessionRes,
        standardRes,
        categoryRes,
        batchRes,
        feeMasterRes,
      ] = await Promise.all([
        axiosInstance.get(
          "/api/master/sessions",
          authConfig
        ),

        axiosInstance.get(
          "/api/master/standard",
          authConfig
        ),

        axiosInstance.get(
          "/api/master/fee-category",
          authConfig
        ),

        axiosInstance.get(
          "/api/master/fee-batch",
          authConfig
        ),

        axiosInstance.get(
          "/api/fee-master",
          authConfig
        ),
      ]);

      setSessions(sessionRes.data || []);

      setStandards(standardRes.data || []);

      setFeeCategories(categoryRes.data || []);

      setFeeBatches(batchRes.data || []);

      setFeeMaster(feeMasterRes.data || []);
    } catch (error) {
      console.error("Master Data Error:", error);

      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Unable to load master data"
      );
    } finally {
      setPageLoading(false);
    }
  };

  /* =========================================================
     LOAD FEE STRUCTURES
  ========================================================= */

  const loadFeeStructures = async () => {
    try {
      setLoading(true);

      /*
       * IMPORTANT:
       * Existing API kept exactly same.
       */

      const res = await axiosInstance.get(
        "/api/fee-structure",
        authConfig
      );

      console.log(
        "Fee Structure Response:",
        res.data
      );

      setFeeStructures(res.data || []);
    } catch (error) {
      console.error(
        "Fee Structure Error:",
        error
      );

      setFeeStructures([]);

      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Unable to load fee structures"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     FEE INPUT CHANGE
  ========================================================= */

  const handleFeeInputChange = (e) => {
    const { name, value } = e.target;

    setFeeInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     GET BATCH VALUE
  ========================================================= */

  const getBatchValue = (item) => {
    if (typeof item === "string") {
      return item;
    }

    return (
      item?.batch ||
      item?.name ||
      item?.value ||
      ""
    );
  };

  /* =========================================================
     ADD / UPDATE FEE COMPONENT
  ========================================================= */

  const handleAddFee = () => {
    if (
      !feeInput.type ||
      feeInput.amount === ""
    ) {
      alert(
        "Please select Fee Type and enter Amount."
      );

      return;
    }

    if (Number(feeInput.amount) <= 0) {
      alert(
        "Amount must be greater than 0."
      );

      return;
    }

    const selectedFee = feeMaster.find(
      (item) =>
        String(item.id) ===
        String(feeInput.type)
    );

    if (!selectedFee) {
      alert("Invalid Fee Type.");

      return;
    }

    const feeObject = {
      feeMasterId: selectedFee.id,

      feeName:
        selectedFee.feeName || "-",

      feeCode:
        selectedFee.feeCode || "-",

      amount: Number(
        feeInput.amount
      ),
    };

    /* =====================================================
       UPDATE TEMPORARY FEE
    ===================================================== */

    if (editIndex !== null) {
      const duplicate = fees.some(
        (fee, index) =>
          index !== editIndex &&
          Number(fee.feeMasterId) ===
            Number(selectedFee.id)
      );

      if (duplicate) {
        alert(
          "This Fee Type is already added."
        );

        return;
      }

      const updatedFees = [...fees];

      updatedFees[editIndex] =
        feeObject;

      setFees(updatedFees);

      setEditIndex(null);
    }

    /* =====================================================
       ADD NEW FEE
    ===================================================== */

    else {
      const alreadyExists =
        fees.some(
          (fee) =>
            Number(fee.feeMasterId) ===
            Number(selectedFee.id)
        );

      if (alreadyExists) {
        alert(
          "This Fee Type is already added."
        );

        return;
      }

      setFees((prev) => [
        ...prev,
        feeObject,
      ]);
    }

    setFeeInput(initialFeeInput);
  };

  /* =========================================================
     EDIT TEMP FEE
  ========================================================= */

  const handleEditFee = (index) => {
    const fee = fees[index];

    setFeeInput({
      type: String(
        fee.feeMasterId || ""
      ),

      amount:
        fee.amount !== null &&
        fee.amount !== undefined
          ? String(fee.amount)
          : "",
    });

    setEditIndex(index);
  };

  /* =========================================================
     DELETE TEMP FEE
  ========================================================= */

  const handleDeleteFee = (index) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to remove this fee component?"
      );

    if (!confirmed) {
      return;
    }

    setFees((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );

    if (editIndex === index) {
      setEditIndex(null);

      setFeeInput(
        initialFeeInput
      );
    }
  };

  /* =========================================================
     CANCEL FEE EDIT
  ========================================================= */

  const handleCancelFeeEdit = () => {
    setEditIndex(null);

    setFeeInput(
      initialFeeInput
    );
  };

  /* =========================================================
     EDIT FEE STRUCTURE
  ========================================================= */

  const handleEdit = (item) => {
    console.log(
      "Editing Fee Structure:",
      item
    );

    setEditingId(item.id);

    /*
     * Existing response fields.
     */

    setFormData({
      session: item.session || "",

      standard:
        item.standard || "",

      category:
        item.feeCategory || "",

      batch:
        item.batch || "",
    });

    /*
     * Existing feeDetails response.
     */

    const existingFees =
      (item.feeDetails || []).map(
        (detail) => ({
          feeMasterId:
            detail.feeMaster?.id,

          feeName:
            detail.feeMaster?.feeName ||
            "-",

          feeCode:
            detail.feeMaster?.feeCode ||
            "-",

          amount:
            Number(detail.amount || 0),
        })
      );

    setFees(existingFees);

    setFeeInput(
      initialFeeInput
    );

    setEditIndex(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setEditingId(null);

    setEditIndex(null);

    setFormData(
      initialFormData
    );

    setFeeInput(
      initialFeeInput
    );

    setFees([]);
  };

  /* =========================================================
     SAVE / UPDATE FEE STRUCTURE
  ========================================================= */

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      !formData.session ||
      !formData.standard ||
      !formData.category ||
      !formData.batch
    ) {
      alert(
        "Please fill all Fee Structure fields."
      );

      return;
    }

    if (fees.length === 0) {
      alert(
        "Please add at least one fee component."
      );

      return;
    }

    const payload = {
      session:
        formData.session,

      standard:
        formData.standard,

      feeCategory:
        formData.category,

      batch:
        formData.batch,

      fees: fees.map((item) => ({
        feeMasterId:
          item.feeMasterId,

        amount:
          Number(item.amount),
      })),
    };

    console.log(
      "Fee Structure Payload:",
      payload
    );

    setSaveLoading(true);

    try {
      let res;

      /* =====================================================
         UPDATE
      ===================================================== */

      if (editingId) {
        res =
          await axiosInstance.put(
            `/api/fee-structure/${editingId}`,
            payload,
            {
              ...authConfig,

              headers: {
                ...authConfig.headers,

                "Content-Type":
                  "application/json",
              },
            }
          );
      }

      /* =====================================================
         CREATE
      ===================================================== */

      else {
        res =
          await axiosInstance.post(
            "/api/fee-structure",
            payload,
            {
              ...authConfig,

              headers: {
                ...authConfig.headers,

                "Content-Type":
                  "application/json",
              },
            }
          );
      }

      alert(
        res?.data?.message ||
          (editingId
            ? "Fee Structure Updated Successfully"
            : "Fee Structure Created Successfully")
      );

      resetForm();

      await loadFeeStructures();
    } catch (error) {
      console.error(
        "Save Fee Structure Error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Something went wrong while saving fee structure"
      );
    } finally {
      setSaveLoading(false);
    }
  };

  /* =========================================================
     DELETE FEE STRUCTURE
  ========================================================= */

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this Fee Structure?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await axiosInstance.delete(
        `/api/fee-structure/${id}`,
        authConfig
      );

      setFeeStructures(
        (prev) =>
          prev.filter(
            (item) =>
              Number(item.id) !==
              Number(id)
          )
      );

      if (
        Number(editingId) ===
        Number(id)
      ) {
        resetForm();
      }

      alert(
        "Fee Structure deleted successfully"
      );
    } catch (error) {
      console.error(
        "Delete Fee Structure Error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Delete Failed"
      );
    }
  };

  /* =========================================================
     FILTER CHANGE
  ========================================================= */

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     FILTER STRUCTURES
  ========================================================= */

  const filteredFeeStructures =
    useMemo(() => {
      const search =
        filters.search
          .trim()
          .toLowerCase();

      return feeStructures.filter(
        (item) => {
          const matchesSearch =
            !search ||
            String(
              item.session || ""
            )
              .toLowerCase()
              .includes(search) ||
            String(
              item.standard || ""
            )
              .toLowerCase()
              .includes(search) ||
            String(
              item.feeCategory || ""
            )
              .toLowerCase()
              .includes(search) ||
            String(
              item.batch || ""
            )
              .toLowerCase()
              .includes(search) ||
            (item.feeDetails || []).some(
              (detail) =>
                String(
                  detail.feeMaster
                    ?.feeName || ""
                )
                  .toLowerCase()
                  .includes(search) ||
                String(
                  detail.feeMaster
                    ?.feeCode || ""
                )
                  .toLowerCase()
                  .includes(search)
            );

          const matchesSession =
            !filters.session ||
            String(
              item.session || ""
            ) ===
              String(
                filters.session
              );

          const matchesStandard =
            !filters.standard ||
            String(
              item.standard || ""
            ) ===
              String(
                filters.standard
              );

          const matchesCategory =
            !filters.category ||
            String(
              item.feeCategory || ""
            ) ===
              String(
                filters.category
              );

          const matchesBatch =
            !filters.batch ||
            String(
              item.batch || ""
            ) ===
              String(
                filters.batch
              );

          return (
            matchesSearch &&
            matchesSession &&
            matchesStandard &&
            matchesCategory &&
            matchesBatch
          );
        }
      );
    }, [
      feeStructures,
      filters,
    ]);

  /* =========================================================
     RESET FILTER
  ========================================================= */

  const handleResetFilter = () => {
    setFilters(
      initialFilters
    );
  };

  /* =========================================================
     TOTAL CURRENT FORM AMOUNT
  ========================================================= */

  const totalCurrentFee =
    fees.reduce(
      (sum, fee) =>
        sum +
        Number(
          fee.amount || 0
        ),
      0
    );

  /* =========================================================
     TOTAL STRUCTURE AMOUNT
  ========================================================= */

  const getStructureTotal = (
    item
  ) => {
    if (
      item.totalAmount !==
        undefined &&
      item.totalAmount !== null
    ) {
      return Number(
        item.totalAmount
      );
    }

    if (
      item.amount !==
        undefined &&
      item.amount !== null
    ) {
      return Number(
        item.amount
      );
    }

    return (
      item.feeDetails || []
    ).reduce(
      (sum, detail) =>
        sum +
        Number(
          detail.amount || 0
        ),
      0
    );
  };

  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalStructures =
    feeStructures.length;

  const activeStructures =
    feeStructures.filter(
      (item) =>
        item.status ===
        "ACTIVE"
    ).length;

  const inactiveStructures =
    feeStructures.filter(
      (item) =>
        item.status ===
        "INACTIVE"
    ).length;

  /*
   * If API does not provide status,
   * all structures are considered active
   * for summary purpose.
   */

  const totalAmount =
    feeStructures.reduce(
      (sum, item) =>
        sum +
        getStructureTotal(
          item
        ),
      0
    );

  const displayActiveStructures =
    feeStructures.some(
      (item) =>
        item.status
    )
      ? activeStructures
      : totalStructures;

  /* =========================================================
     FORMAT AMOUNT
  ========================================================= */

  const formatAmount = (
    amount
  ) => {
    return `₹ ${Number(
      amount || 0
    ).toLocaleString(
      "en-IN"
    )}`;
  };

  /* =========================================================
     STATUS
  ========================================================= */

  const getStatusConfig = (
    status
  ) => {
    if (
      status ===
      "INACTIVE"
    ) {
      return {
        background:
          "#f1f3f5",
        color:
          "#6c757d",
        dot:
          "#6c757d",
      };
    }

    return {
      background:
        "#e8f7ee",
      color:
        "#198754",
      dot:
        "#198754",
    };
  };

  /* =========================================================
     GET STRUCTURE FEE DETAILS
  ========================================================= */

  const getFeeDetails = (
    item
  ) => {
    return Array.isArray(
      item.feeDetails
    )
      ? item.feeDetails
      : [];
  };

  /* =========================================================
     UI
  ========================================================= */

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
                  className="d-flex align-items-center justify-content-center rounded-4"
                  style={{
                    width:
                      "52px",
                    height:
                      "52px",

                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",

                    color:
                      "#fff",

                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaMoneyBillWave
                    size={25}
                  />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Fee Structure
                  </h5>

                  <div className="text-muted small">
                    Fee Management
                    &nbsp;/&nbsp;
                    Fee Structure
                  </div>
                </div>

              </div>

              <div className="d-flex gap-2 flex-wrap">

                <button
                  type="button"
                  className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 rounded-4 px-3"
                  onClick={() =>
                    navigate(
                      "fee-types"
                    )
                  }
                >
                  <FaLayerGroup
                    size={13}
                  />

                  Fee Type Master
                </button>

                <button
                  type="button"
                  className="btn btn-primary d-flex align-items-center justify-content-center gap-2 rounded-4 px-4"
                  onClick={
                    resetForm
                  }
                >
                  <FaPlus
                    size={13}
                  />

                  New Structure
                </button>

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
              Home &nbsp;›&nbsp;
              Fee Management
              &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Fee Structure
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 px-2">

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">

            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>

            <div className="stat-content">
              <span>
                Total Structures
              </span>

              <h3>
                {totalStructures}
              </h3>

              <small>
                Fee Structures
              </small>
            </div>

          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow">

            <div className="stat-icon">
              <FaGraduationCap />
            </div>

            <div className="stat-content">
              <span>
                Active
              </span>

              <h3>
                {
                  displayActiveStructures
                }
              </h3>

              <small>
                Active Fee Structures
              </small>
            </div>

          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow">

            <div className="stat-icon">
              <FaFilter />
            </div>

            <div className="stat-content">
              <span>
                Inactive
              </span>

              <h3>
                {inactiveStructures}
              </h3>

              <small>
                Inactive Structures
              </small>
            </div>

          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-red shadow">

            <div className="stat-icon">
              <MdOutlinePayments />
            </div>

            <div className="stat-content">
              <span>
                Total Amount
              </span>

              <h3
                style={{
                  fontSize:
                    "21px",
                }}
              >
                {formatAmount(
                  totalAmount
                )}
              </h3>

              <small>
                Configured Fee Amount
              </small>
            </div>

          </div>
        </div>

      </div>

      {/* =====================================================
          CREATE / EDIT FORM
      ===================================================== */}

      <div className="mx-2 mb-4">

        <div className="card border-0 shadow rounded-4 overflow-hidden">

          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom:
                "1px solid #eef0f2",
            }}
          >

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

              <div className="d-flex align-items-center">

                <div
                  className="rounded-2 d-flex align-items-center justify-content-center me-2"
                  style={{
                    width:
                      "36px",
                    height:
                      "36px",
                    background:
                      "#e9f7ef",
                    color:
                      "#198754",
                  }}
                >
                  {editingId ? (
                    <FaEdit
                      size={16}
                    />
                  ) : (
                    <FaPlus
                      size={16}
                    />
                  )}
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">
                    {editingId
                      ? "Update Fee Structure"
                      : "Create Fee Structure"}
                  </h6>

                  <small className="text-muted">
                    Configure session,
                    class and fee
                    components
                  </small>
                </div>

              </div>

              {editingId && (
                <button
                  type="button"
                  className="btn btn-sm btn-light border"
                  onClick={
                    resetForm
                  }
                >
                  <FaTimes
                    className="me-1"
                  />

                  Cancel Edit
                </button>
              )}

            </div>

          </div>

          <div className="card-body p-3 p-md-4">

            {pageLoading ? (
              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary"
                  style={{
                    width:
                      "2.5rem",
                    height:
                      "2.5rem",
                  }}
                />

                <div className="mt-3 text-muted">
                  Loading master
                  data...
                </div>

              </div>
            ) : (

              <form
                onSubmit={
                  handleSave
                }
              >

                {/* =================================================
                    STRUCTURE DETAILS
                ================================================= */}

                <div className="row g-3">

                  {/* SESSION */}

                  <div className="col-12 col-md-6 col-xl-3">

                    <label className="form-label fw-semibold small">
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
                        handleFormChange
                      }
                    >

                      <option value="">
                        Select Session
                      </option>

                      {sessions.map(
                        (
                          item,
                          index
                        ) => (
                          <option
                            key={
                              `${item}-${index}`
                            }
                            value={
                              item
                            }
                          >
                            {String(
                              item
                            ).replaceAll(
                              "_",
                              "-"
                            )}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* STANDARD */}

                  <div className="col-12 col-md-6 col-xl-3">

                    <label className="form-label fw-semibold small">
                      Standard{" "}
                      <span className="text-danger">
                        *
                      </span>
                    </label>

                    <select
                      className="form-select"
                      name="standard"
                      value={
                        formData.standard
                      }
                      onChange={
                        handleFormChange
                      }
                    >

                      <option value="">
                        Select Standard
                      </option>

                      {standards.map(
                        (
                          item,
                          index
                        ) => (
                          <option
                            key={
                              `${item}-${index}`
                            }
                            value={
                              item
                            }
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* CATEGORY */}

                  <div className="col-12 col-md-6 col-xl-3">

                    <label className="form-label fw-semibold small">
                      Fee Category{" "}
                      <span className="text-danger">
                        *
                      </span>
                    </label>

                    <select
                      className="form-select"
                      name="category"
                      value={
                        formData.category
                      }
                      onChange={
                        handleFormChange
                      }
                    >

                      <option value="">
                        Select Category
                      </option>

                      {feeCategories.map(
                        (
                          item,
                          index
                        ) => (
                          <option
                            key={
                              `${item}-${index}`
                            }
                            value={
                              item
                            }
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* BATCH */}

                  <div className="col-12 col-md-6 col-xl-3">

                    <label className="form-label fw-semibold small">
                      Fee Batch{" "}
                      <span className="text-danger">
                        *
                      </span>
                    </label>

                    <select
                      className="form-select"
                      name="batch"
                      value={
                        formData.batch
                      }
                      onChange={
                        handleFormChange
                      }
                    >

                      <option value="">
                        Select Batch
                      </option>

                      {feeBatches.map(
                        (
                          item,
                          index
                        ) => {
                          const value =
                            getBatchValue(
                              item
                            );

                          return (
                            <option
                              key={
                                `${value}-${index}`
                              }
                              value={
                                value
                              }
                            >
                              {value}
                            </option>
                          );
                        }
                      )}

                    </select>

                  </div>

                </div>

                <hr className="my-4" />

                {/* =================================================
                    FEE COMPONENT
                ================================================= */}

                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">

                  <div>
                    <h6 className="fw-bold mb-1">
                      <FaMoneyBillWave
                        className="text-primary me-2"
                        size={14}
                      />

                      Fee Components
                    </h6>

                    <small className="text-muted">
                      Add individual
                      fee components
                      to this structure
                    </small>
                  </div>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background:
                        "#e9f7ef",
                      color:
                        "#198754",
                    }}
                  >
                    {fees.length} Component
                    {fees.length !==
                    1
                      ? "s"
                      : ""}
                  </span>

                </div>

                <div className="row g-3">

                  <div className="col-12 col-md-5">

                    <label className="form-label fw-semibold small">
                      Fee Type
                    </label>

                    <select
                      className="form-select"
                      name="type"
                      value={
                        feeInput.type
                      }
                      onChange={
                        handleFeeInputChange
                      }
                    >

                      <option value="">
                        Select Fee Type
                      </option>

                      {feeMaster.map(
                        (item) => (
                          <option
                            key={
                              item.id
                            }
                            value={
                              item.id
                            }
                          >
                            {item.feeCode
                              ? `${item.feeCode} - ${item.feeName}`
                              : item.feeName}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  <div className="col-12 col-md-5">

                    <label className="form-label fw-semibold small">
                      Amount
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        ₹
                      </span>

                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        name="amount"
                        value={
                          feeInput.amount
                        }
                        onChange={
                          handleFeeInputChange
                        }
                        placeholder="Enter Amount"
                      />

                    </div>

                  </div>

                  <div className="col-12 col-md-2 d-flex align-items-end">

                    <div className="d-flex gap-2 w-100">

                      <button
                        type="button"
                        className="btn btn-primary flex-grow-1"
                        onClick={
                          handleAddFee
                        }
                      >
                        {editIndex !==
                        null ? (
                          <>
                            <FaEdit
                              className="me-1"
                            />

                            Update
                          </>
                        ) : (
                          <>
                            <FaPlus
                              className="me-1"
                            />

                            Add
                          </>
                        )}
                      </button>

                      {editIndex !==
                        null && (
                        <button
                          type="button"
                          className="btn btn-light border"
                          onClick={
                            handleCancelFeeEdit
                          }
                        >
                          <FaTimes />
                        </button>
                      )}

                    </div>

                  </div>

                </div>

                {/* =================================================
                    TEMP FEE TABLE
                ================================================= */}

                <div className="table-responsive mt-4">

                  <table className="table align-middle mb-0">

                    <thead
                      style={{
                        background:
                          "#f8f9fa",
                      }}
                    >
                      <tr>

                        <th
                          className="text-center"
                          style={
                            headerStyle
                          }
                        >
                          #
                        </th>

                        <th
                          style={
                            headerStyle
                          }
                        >
                          FEE CODE
                        </th>

                        <th
                          style={
                            headerStyle
                          }
                        >
                          FEE NAME
                        </th>

                        <th
                          className="text-end"
                          style={
                            headerStyle
                          }
                        >
                          AMOUNT
                        </th>

                        <th
                          className="text-center"
                          style={
                            headerStyle
                          }
                        >
                          ACTION
                        </th>

                      </tr>
                    </thead>

                    <tbody>

                      {fees.length ===
                      0 ? (
                        <tr>

                          <td
                            colSpan="5"
                            className="text-center py-5"
                          >

                            <div
                              className="d-flex align-items-center justify-content-center mx-auto mb-2 rounded-circle"
                              style={{
                                width:
                                  "48px",
                                height:
                                  "48px",
                                background:
                                  "#f1f3f5",
                                color:
                                  "#868e96",
                              }}
                            >
                              <FaMoneyBillWave
                                size={19}
                              />
                            </div>

                            <div className="fw-semibold text-muted">
                              No fee components
                              added
                            </div>

                            <small className="text-muted">
                              Select a fee type
                              and enter an
                              amount
                            </small>

                          </td>

                        </tr>
                      ) : (

                        fees.map(
                          (
                            fee,
                            index
                          ) => (
                            <tr
                              key={`${fee.feeMasterId}-${index}`}
                            >

                              <td className="text-center">

                                <span
                                  className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                  style={{
                                    width:
                                      "28px",
                                    height:
                                      "28px",
                                    background:
                                      "#f4f6f8",
                                    color:
                                      "#6c757d",
                                    fontSize:
                                      "12px",
                                    fontWeight:
                                      "600",
                                  }}
                                >
                                  {index +
                                    1}
                                </span>

                              </td>

                              <td>
                                <span className="badge bg-light text-dark border">
                                  {fee.feeCode ||
                                    "-"}
                                </span>
                              </td>

                              <td>
                                <div className="fw-semibold">
                                  {
                                    fee.feeName
                                  }
                                </div>
                              </td>

                              <td className="text-end">

                                <strong className="text-primary">
                                  {formatAmount(
                                    fee.amount
                                  )}
                                </strong>

                              </td>

                              <td className="text-center">

                                <button
                                  type="button"
                                  className="btn btn-sm me-2"
                                  style={{
                                    background:
                                      "#e9f7ef",
                                    border:
                                      "1px solid #cfe8d8",
                                    color:
                                      "#198754",
                                  }}
                                  onClick={() =>
                                    handleEditFee(
                                      index
                                    )
                                  }
                                  title="Edit"
                                >
                                  <FaEdit
                                    size={
                                      12
                                    }
                                  />
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-sm"
                                  style={{
                                    background:
                                      "#fff1f2",
                                    border:
                                      "1px solid #ffd6da",
                                    color:
                                      "#dc3545",
                                  }}
                                  onClick={() =>
                                    handleDeleteFee(
                                      index
                                    )
                                  }
                                  title="Delete"
                                >
                                  <FaTrash
                                    size={
                                      12
                                    }
                                  />
                                </button>

                              </td>

                            </tr>
                          )
                        )

                      )}

                    </tbody>

                    {fees.length >
                      0 && (
                      <tfoot>

                        <tr>

                          <th
                            colSpan="3"
                            className="text-end"
                          >
                            Total Fee
                          </th>

                          <th className="text-end">

                            <span className="text-primary fw-bold">
                              {formatAmount(
                                totalCurrentFee
                              )}
                            </span>

                          </th>

                          <th />

                        </tr>

                      </tfoot>
                    )}

                  </table>

                </div>

                {/* =================================================
                    SAVE
                ================================================= */}

                <div className="d-flex justify-content-end gap-2 mt-4">

                  {editingId && (
                    <button
                      type="button"
                      className="btn btn-light border px-4"
                      onClick={
                        resetForm
                      }
                      disabled={
                        saveLoading
                      }
                    >
                      <FaTimes className="me-1" />

                      Cancel
                    </button>
                  )}

                  <button
                    type="submit"
                    className="btn btn-success px-4"
                    disabled={
                      saveLoading
                    }
                  >

                    {saveLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-1" />

                        {editingId
                          ? "Update Fee Structure"
                          : "Save Fee Structure"}
                      </>
                    )}

                  </button>

                </div>

              </form>
            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          FILTER
      ===================================================== */}

      <div className="mx-2 mb-4">

        <div className="card border-0 shadow rounded-4">

          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom:
                "1px solid #eef0f2",
            }}
          >

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

              <div>

                <h6 className="mb-1 fw-bold">

                  <FaFilter
                    className="text-primary me-2"
                    size={14}
                  />

                  Fee Structure Search

                </h6>

                <small className="text-muted">
                  Filter fee structures
                  using the options
                  below
                </small>

              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background:
                    "#e9f7ef",
                  color:
                    "#198754",
                }}
              >
                {
                  filteredFeeStructures.length
                }{" "}
                Records
              </span>

            </div>

          </div>

          <div className="card-body p-3">

            <div className="row g-3">

              {/* SESSION */}

              <div className="col-12 col-sm-6 col-xl-2">

                <label className="form-label fw-semibold small">
                  Session
                </label>

                <select
                  name="session"
                  value={
                    filters.session
                  }
                  onChange={
                    handleFilterChange
                  }
                  className="form-select"
                >

                  <option value="">
                    All Sessions
                  </option>

                  {sessions.map(
                    (
                      item,
                      index
                    ) => (
                      <option
                        key={`${item}-${index}`}
                        value={item}
                      >
                        {String(
                          item
                        ).replaceAll(
                          "_",
                          "-"
                        )}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* STANDARD */}

              <div className="col-12 col-sm-6 col-xl-2">

                <label className="form-label fw-semibold small">
                  Standard
                </label>

                <select
                  name="standard"
                  value={
                    filters.standard
                  }
                  onChange={
                    handleFilterChange
                  }
                  className="form-select"
                >

                  <option value="">
                    All Standards
                  </option>

                  {standards.map(
                    (
                      item,
                      index
                    ) => (
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

              {/* CATEGORY */}

              <div className="col-12 col-sm-6 col-xl-2">

                <label className="form-label fw-semibold small">
                  Fee Category
                </label>

                <select
                  name="category"
                  value={
                    filters.category
                  }
                  onChange={
                    handleFilterChange
                  }
                  className="form-select"
                >

                  <option value="">
                    All Categories
                  </option>

                  {feeCategories.map(
                    (
                      item,
                      index
                    ) => (
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

              {/* BATCH */}

              <div className="col-12 col-sm-6 col-xl-2">

                <label className="form-label fw-semibold small">
                  Fee Batch
                </label>

                <select
                  name="batch"
                  value={
                    filters.batch
                  }
                  onChange={
                    handleFilterChange
                  }
                  className="form-select"
                >

                  <option value="">
                    All Batches
                  </option>

                  {feeBatches.map(
                    (
                      item,
                      index
                    ) => {
                      const value =
                        getBatchValue(
                          item
                        );

                      return (
                        <option
                          key={`${value}-${index}`}
                          value={value}
                        >
                          {value}
                        </option>
                      );
                    }
                  )}

                </select>

              </div>

              {/* SEARCH */}

              <div className="col-12 col-xl-4">

                <label className="form-label fw-semibold small">
                  Search
                </label>

                <div className="input-group">

                  <span className="input-group-text bg-white">
                    <FaSearch
                      size={14}
                    />
                  </span>

                  <input
                    type="search"
                    className="form-control"
                    name="search"
                    value={
                      filters.search
                    }
                    onChange={
                      handleFilterChange
                    }
                    placeholder="Search session, standard, category, batch, fee..."
                  />

                </div>

              </div>

            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">

              <button
                type="button"
                className="btn btn-light border px-4"
                onClick={
                  handleResetFilter
                }
              >
                <FaRedo
                  className="me-2"
                  size={12}
                />

                Reset
              </button>

              <button
                type="button"
                className="btn btn-primary px-4"
                onClick={() =>
                  setFilters(
                    (prev) => ({
                      ...prev,
                      search:
                        prev.search,
                    })
                  )
                }
              >
                <FaSearch
                  className="me-2"
                  size={12}
                />

                Search
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          FEE STRUCTURE LIST
      ===================================================== */}

      <div className="mx-2 mb-4">

        <div className="card border-0 shadow rounded-4 overflow-hidden">

          {/* HEADER */}

          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom:
                "1px solid #eef0f2",
            }}
          >

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

              <div className="d-flex align-items-center">

                <div
                  className="rounded-2 d-flex align-items-center justify-content-center me-2"
                  style={{
                    width:
                      "36px",
                    height:
                      "36px",
                    background:
                      "#e9f7ef",
                    color:
                      "#198754",
                  }}
                >
                  <FaList
                    size={16}
                  />
                </div>

                <div>

                  <h6 className="mb-0 fw-bold">
                    Fee Structure List
                  </h6>

                  <small className="text-muted">
                    Manage all fee
                    structures
                  </small>

                </div>

              </div>

              <div className="d-flex align-items-center gap-2">

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background:
                      "#f4f6f8",
                    color:
                      "#495057",
                  }}
                >
                  Showing{" "}
                  <strong>
                    {
                      filteredFeeStructures.length
                    }
                  </strong>
                </span>

                <button
                  type="button"
                  className="btn btn-sm btn-light border d-flex align-items-center gap-1"
                  onClick={
                    loadFeeStructures
                  }
                  disabled={
                    loading
                  }
                >
                  <FaRedo
                    size={11}
                    className={
                      loading
                        ? "spin"
                        : ""
                    }
                  />

                  Refresh
                </button>

              </div>

            </div>

          </div>

          {/* TABLE */}

          <div className="card-body p-0">

            <div
              className="table-responsive"
              style={{
                maxHeight:
                  "650px",
                overflowY:
                  "auto",
              }}
            >

              <table
                className="table align-middle mb-0"
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
                    zIndex: 2,
                    background:
                      "#f8f9fa",
                  }}
                >

                  <tr>

                    <th
                      className="text-center"
                      style={
                        headerStyle
                      }
                    >
                      #
                    </th>

                    <th
                      style={{
                        ...headerStyle,
                        minWidth:
                          "170px",
                      }}
                    >
                      SESSION
                    </th>

                    <th
                      style={{
                        ...headerStyle,
                        minWidth:
                          "140px",
                      }}
                    >
                      STANDARD
                    </th>

                    <th
                      style={{
                        ...headerStyle,
                        minWidth:
                          "150px",
                      }}
                    >
                      CATEGORY
                    </th>

                    <th
                      style={{
                        ...headerStyle,
                        minWidth:
                          "130px",
                      }}
                    >
                      BATCH
                    </th>

                    <th
                      style={{
                        ...headerStyle,
                        minWidth:
                          "180px",
                      }}
                    >
                      FEE COMPONENT
                    </th>

                    <th
                      style={{
                        ...headerStyle,
                        minWidth:
                          "130px",
                      }}
                    >
                      FEE CODE
                    </th>

                    <th
                      className="text-end"
                      style={{
                        ...headerStyle,
                        minWidth:
                          "130px",
                      }}
                    >
                      AMOUNT
                    </th>

                    <th
                      className="text-center"
                      style={{
                        ...headerStyle,
                        minWidth:
                          "120px",
                      }}
                    >
                      STATUS
                    </th>

                    <th
                      className="text-center"
                      style={{
                        ...headerStyle,
                        minWidth:
                          "150px",
                      }}
                    >
                      ACTION
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {loading ? (

                    <tr>

                      <td
                        colSpan="10"
                        className="text-center py-5"
                      >

                        <div
                          className="spinner-border text-primary"
                          style={{
                            width:
                              "2.5rem",
                            height:
                              "2.5rem",
                          }}
                        />

                        <div className="mt-3 text-muted small">
                          Loading fee
                          structures...
                        </div>

                      </td>

                    </tr>

                  ) : filteredFeeStructures.length ===
                    0 ? (

                    <tr>

                      <td
                        colSpan="10"
                        className="text-center py-5"
                      >

                        <div
                          className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                          style={{
                            width:
                              "55px",
                            height:
                              "55px",
                            background:
                              "#f1f3f5",
                            color:
                              "#868e96",
                          }}
                        >
                          <FaMoneyBillWave
                            size={23}
                          />
                        </div>

                        <h6 className="fw-semibold text-muted mb-1">
                          No Fee Structures
                        </h6>

                        <small className="text-muted">
                          No fee structure
                          matches the
                          selected filters.
                        </small>

                      </td>

                    </tr>

                  ) : (

                    filteredFeeStructures.map(
                      (
                        item,
                        index
                      ) => {

                        const details =
                          getFeeDetails(
                            item
                          );

                        const status =
                          item.status ||
                          "ACTIVE";

                        const statusConfig =
                          getStatusConfig(
                            status
                          );

                        /*
                         * If no fee details,
                         * still show structure.
                         */

                        if (
                          details.length ===
                          0
                        ) {
                          return (
                            <tr
                              key={
                                item.id
                              }
                            >

                              <td className="text-center">
                                <span
                                  className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                  style={{
                                    width:
                                      "28px",
                                    height:
                                      "28px",
                                    background:
                                      "#f4f6f8",
                                    color:
                                      "#6c757d",
                                    fontSize:
                                      "12px",
                                    fontWeight:
                                      "600",
                                  }}
                                >
                                  {index +
                                    1}
                                </span>
                              </td>

                              <td>
                                {item.session ||
                                  "-"}
                              </td>

                              <td>
                                {item.standard ||
                                  "-"}
                              </td>

                              <td>
                                {item.feeCategory ||
                                  "-"}
                              </td>

                              <td>
                                {item.batch ||
                                  "-"}
                              </td>

                              <td
                                colSpan="3"
                                className="text-muted"
                              >
                                No fee
                                components
                              </td>

                              <td className="text-center">

                                <span
                                  className="d-inline-flex align-items-center rounded-pill"
                                  style={{
                                    background:
                                      statusConfig.background,
                                    color:
                                      statusConfig.color,
                                    padding:
                                      "6px 12px",
                                    fontSize:
                                      "12px",
                                    fontWeight:
                                      "600",
                                  }}
                                >

                                  <span
                                    className="rounded-circle me-2"
                                    style={{
                                      width:
                                        "7px",
                                      height:
                                        "7px",
                                      background:
                                        statusConfig.dot,
                                    }}
                                  />

                                  {status}

                                </span>

                              </td>

                              <td className="text-center">

                                <button
                                  type="button"
                                  className="btn btn-sm me-2"
                                  style={{
                                    background:
                                      "#e9f7ef",
                                    border:
                                      "1px solid #cfe8d8",
                                    color:
                                      "#198754",
                                  }}
                                  onClick={() =>
                                    handleEdit(
                                      item
                                    )
                                  }
                                >
                                  <FaEdit
                                    size={
                                      12
                                    }
                                  />
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-sm"
                                  style={{
                                    background:
                                      "#fff1f2",
                                    border:
                                      "1px solid #ffd6da",
                                    color:
                                      "#dc3545",
                                  }}
                                  onClick={() =>
                                    handleDelete(
                                      item.id
                                    )
                                  }
                                >
                                  <FaTrash
                                    size={
                                      12
                                    }
                                  />
                                </button>

                              </td>

                            </tr>
                          );
                        }

                        return details.map(
                          (
                            detail,
                            detailIndex
                          ) => (
                            <tr
                              key={`${item.id}-${detail.id || detailIndex}`}
                            >

                              {/* NUMBER */}

                              {detailIndex ===
                                0 && (
                                <td
                                  rowSpan={
                                    details.length
                                  }
                                  className="text-center"
                                >
                                  <span
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                    style={{
                                      width:
                                        "28px",
                                      height:
                                        "28px",
                                      background:
                                        "#f4f6f8",
                                      color:
                                        "#6c757d",
                                      fontSize:
                                        "12px",
                                      fontWeight:
                                        "600",
                                    }}
                                  >
                                    {index +
                                      1}
                                  </span>
                                </td>
                              )}

                              {/* SESSION */}

                              {detailIndex ===
                                0 && (
                                <td
                                  rowSpan={
                                    details.length
                                  }
                                >
                                  <span
                                    className="badge rounded-pill text-primary"
                                    style={{
                                      background:
                                        "#f1f8f4",
                                      border:
                                        "1px solid #d9eee1",
                                      fontWeight:
                                        "600",
                                      padding:
                                        "6px 10px",
                                    }}
                                  >
                                    {item.session ||
                                      "-"}
                                  </span>
                                </td>
                              )}

                              {/* STANDARD */}

                              {detailIndex ===
                                0 && (
                                <td
                                  rowSpan={
                                    details.length
                                  }
                                >
                                  <span
                                    className="badge rounded-pill"
                                    style={{
                                      background:
                                        "#f4f6f8",
                                      color:
                                        "#495057",
                                      border:
                                        "1px solid #e1e5e8",
                                      fontWeight:
                                        "600",
                                      padding:
                                        "6px 10px",
                                    }}
                                  >
                                    {item.standard ||
                                      "-"}
                                  </span>
                                </td>
                              )}

                              {/* CATEGORY */}

                              {detailIndex ===
                                0 && (
                                <td
                                  rowSpan={
                                    details.length
                                  }
                                >
                                  <span
                                    style={{
                                      fontSize:
                                        "12px",
                                      fontWeight:
                                        "600",
                                      color:
                                        "#495057",
                                    }}
                                  >
                                    {item.feeCategory ||
                                      "-"}
                                  </span>
                                </td>
                              )}

                              {/* BATCH */}

                              {detailIndex ===
                                0 && (
                                <td
                                  rowSpan={
                                    details.length
                                  }
                                >
                                  <span
                                    className="badge rounded-pill"
                                    style={{
                                      background:
                                        "#fff8e8",
                                      color:
                                        "#996c00",
                                      border:
                                        "1px solid #f8e5af",
                                      fontWeight:
                                        "600",
                                      padding:
                                        "6px 10px",
                                    }}
                                  >
                                    {item.batch ||
                                      "-"}
                                  </span>
                                </td>
                              )}

                              {/* FEE NAME */}

                              <td>

                                <div className="d-flex align-items-center">

                                  <div
                                    className="d-flex align-items-center justify-content-center rounded-circle me-2"
                                    style={{
                                      width:
                                        "34px",
                                      height:
                                        "34px",
                                      minWidth:
                                        "34px",
                                      background:
                                        "#eef5ff",
                                      color:
                                        "#2563eb",
                                    }}
                                  >
                                    <FaMoneyBillWave
                                      size={
                                        13
                                      }
                                    />
                                  </div>

                                  <div>
                                    <div className="fw-semibold small">
                                      {detail
                                        .feeMaster
                                        ?.feeName ||
                                        "-"}
                                    </div>
                                  </div>

                                </div>

                              </td>

                              {/* CODE */}

                              <td>

                                <span className="badge bg-light text-dark border">
                                  {detail
                                    .feeMaster
                                    ?.feeCode ||
                                    "-"}
                                </span>

                              </td>

                              {/* AMOUNT */}

                              <td className="text-end">

                                <strong className="text-primary">
                                  {formatAmount(
                                    detail.amount
                                  )}
                                </strong>

                              </td>

                              {/* STATUS */}

                              {detailIndex ===
                                0 && (
                                <td
                                  rowSpan={
                                    details.length
                                  }
                                  className="text-center"
                                >

                                  <span
                                    className="d-inline-flex align-items-center rounded-pill"
                                    style={{
                                      background:
                                        statusConfig.background,
                                      color:
                                        statusConfig.color,
                                      padding:
                                        "6px 12px",
                                      fontSize:
                                        "12px",
                                      fontWeight:
                                        "600",
                                    }}
                                  >

                                    <span
                                      className="rounded-circle me-2"
                                      style={{
                                        width:
                                          "7px",
                                        height:
                                          "7px",
                                        background:
                                          statusConfig.dot,
                                      }}
                                    />

                                    {status}

                                  </span>

                                </td>
                              )}

                              {/* ACTION */}

                              {detailIndex ===
                                0 && (
                                <td
                                  rowSpan={
                                    details.length
                                  }
                                  className="text-center"
                                >

                                  <div className="d-flex justify-content-center gap-2">

                                    <button
                                      type="button"
                                      className="btn btn-sm d-inline-flex align-items-center gap-1"
                                      style={{
                                        background:
                                          "#e9f7ef",
                                        border:
                                          "1px solid #cfe8d8",
                                        color:
                                          "#198754",
                                        fontWeight:
                                          "600",
                                        padding:
                                          "6px 11px",
                                      }}
                                      title="Edit Fee Structure"
                                      onClick={() =>
                                        handleEdit(
                                          item
                                        )
                                      }
                                    >
                                      <FaEdit
                                        size={
                                          12
                                        }
                                      />

                                      Edit
                                    </button>

                                    <button
                                      type="button"
                                      className="btn btn-sm d-inline-flex align-items-center justify-content-center"
                                      style={{
                                        background:
                                          "#fff1f2",
                                        border:
                                          "1px solid #ffd6da",
                                        color:
                                          "#dc3545",
                                        padding:
                                          "6px 10px",
                                      }}
                                      title="Delete Fee Structure"
                                      onClick={() =>
                                        handleDelete(
                                          item.id
                                        )
                                      }
                                    >
                                      <FaTrash
                                        size={
                                          12
                                        }
                                      />
                                    </button>

                                  </div>

                                </td>
                              )}

                            </tr>
                          )
                        );
                      }
                    )

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* FOOTER */}

          <div
            className="card-footer bg-white p-3"
            style={{
              borderTop:
                "1px solid #eef0f2",
            }}
          >

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

              <small className="text-muted">
                Showing{" "}
                <strong className="text-primary">
                  {
                    filteredFeeStructures.length
                  }
                </strong>{" "}
                fee structure(s)
              </small>

              <small className="text-muted">
                Total Structures:{" "}
                <strong className="text-dark">
                  {
                    feeStructures.length
                  }
                </strong>
              </small>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>
        {`
          .table tbody tr {
            transition: all 0.18s ease;
          }

          .table tbody tr:hover {
            background-color: #fbfdfc;
          }

          .form-select,
          .form-control {
            border-color: #dee2e6;
            border-radius: 8px;
            min-height: 40px;
            font-size: 13px;
          }

          .form-select:focus,
          .form-control:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 0.15rem rgba(37, 99, 235, 0.10);
          }

          .input-group-text {
            border-color: #dee2e6;
            border-radius: 8px 0 0 8px;
            color: #6c757d;
          }

          .input-group .form-control {
            border-radius: 0 8px 8px 0;
          }

          .btn {
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
          }

          .spin {
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 768px) {
            .card-header {
              padding: 12px !important;
            }

            .table {
              font-size: 12px;
            }
          }
        `}
      </style>
    </>
  );
};

/* =========================================================
   TABLE HEADER STYLE
========================================================= */

const headerStyle = {
  padding: "14px 12px",
  fontSize: "12px",
  color: "#6c757d",
  fontWeight: "700",
  whiteSpace: "nowrap",
};

export default CreateFeeStructure;

