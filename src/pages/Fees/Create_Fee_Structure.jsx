import React, { useEffect, useMemo, useState } from "react";
import {
  LuPlus,
  LuPencil,
  LuTrash2,
  LuX,
  LuSearch,
  LuRefreshCw,
  LuSave,
  LuLayers,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const Create_Fee_Structure = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // =====================================================
  // FORM
  // =====================================================

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

  const [formData, setFormData] = useState(initialFormData);
  const [feeInput, setFeeInput] = useState(initialFeeInput);

  // =====================================================
  // DATA
  // =====================================================

  const [feeCategories, setFeeCategories] = useState([]);
  const [feeBatches, setFeeBatches] = useState([]);
  const [standards, setStandards] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [feeMaster, setFeeMaster] = useState([]);
  const [feeStructures, setFeeStructures] = useState([]);

  // Fees being added to current structure
  const [fees, setFees] = useState([]);

  // =====================================================
  // EDIT STATES
  // =====================================================

  const [editingId, setEditingId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  // =====================================================
  // LOADING
  // =====================================================

  const [pageLoading, setPageLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // =====================================================
  // FILTER
  // =====================================================

  const [filter, setFilter] = useState({
    session: "",
    standard: "",
    category: "",
    batch: "",
    search: "",
  });

  // =====================================================
  // LOAD ALL MASTER DATA
  // =====================================================

  useEffect(() => {
    loadMasterData();
    loadFeeStructures();
  }, []);

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadMasterData = async () => {
    setPageLoading(true);

    try {
      const [
        sessionRes,
        standardRes,
        categoryRes,
        batchRes,
        feeMasterRes,
      ] = await Promise.all([
        axiosInstance.get("/api/master/sessions", authConfig),
        axiosInstance.get("/api/master/standard", authConfig),
        axiosInstance.get("/api/master/fee-category", authConfig),
        axiosInstance.get("/api/master/fee-batch", authConfig),
        axiosInstance.get("/api/fee-master", authConfig),
      ]);

      setSessions(sessionRes.data || []);
      setStandards(standardRes.data || []);
      setFeeCategories(categoryRes.data || []);
      setFeeBatches(batchRes.data || []);
      setFeeMaster(feeMasterRes.data || []);
    } catch (error) {
      console.error("Master data error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Unable to load master data",
      );
    } finally {
      setPageLoading(false);
    }
  };

  // =====================================================
  // LOAD FEE STRUCTURES
  // =====================================================

  const loadFeeStructures = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/fee-structure",
        authConfig,
      );

      setFeeStructures(res.data || []);
    } catch (error) {
      console.error("Fee structure error:", error);
      setFeeStructures([]);
    }
  };

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // FEE INPUT CHANGE
  // =====================================================

  const handleFeeInputChange = (e) => {
    const { name, value } = e.target;

    setFeeInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // ADD / UPDATE FEE IN TEMPORARY LIST
  // =====================================================

  const handleAddFee = () => {
    if (!feeInput.type || !feeInput.amount) {
      alert("Please select Fee Type and enter Amount.");
      return;
    }

    if (Number(feeInput.amount) <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    const selectedFee = feeMaster.find(
      (item) => String(item.id) === String(feeInput.type),
    );

    if (!selectedFee) {
      alert("Invalid Fee Type.");
      return;
    }

    const obj = {
      feeMasterId: selectedFee.id,
      feeName: selectedFee.feeName,
      feeCode: selectedFee.feeCode,
      amount: Number(feeInput.amount),
    };

    // UPDATE EXISTING TEMP FEE
    if (editIndex !== null) {
      const updatedFees = [...fees];
      updatedFees[editIndex] = obj;

      setFees(updatedFees);
      setEditIndex(null);
    } else {
      // Prevent duplicate fee type
      const alreadyExists = fees.some(
        (fee) => Number(fee.feeMasterId) === Number(selectedFee.id),
      );

      if (alreadyExists) {
        alert("This Fee Type is already added.");
        return;
      }

      setFees((prev) => [...prev, obj]);
    }

    setFeeInput(initialFeeInput);
  };

  // =====================================================
  // EDIT TEMP FEE
  // =====================================================

  const handleEditFee = (index) => {
    const fee = fees[index];

    setFeeInput({
      type: String(fee.feeMasterId),
      amount: fee.amount,
    });

    setEditIndex(index);
  };

  // =====================================================
  // DELETE TEMP FEE
  // =====================================================

  const handleDeleteFee = (index) => {
    const updatedFees = fees.filter((_, i) => i !== index);

    setFees(updatedFees);

    if (editIndex === index) {
      setEditIndex(null);
      setFeeInput(initialFeeInput);
    }
  };

  // =====================================================
  // CANCEL TEMP FEE EDIT
  // =====================================================

  const handleCancelFeeEdit = () => {
    setEditIndex(null);
    setFeeInput(initialFeeInput);
  };

  // =====================================================
  // EDIT FEE STRUCTURE
  // =====================================================

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      session: item.session || "",
      standard: item.standard || "",
      category: item.feeCategory || "",
      batch: item.batch || "",
    });

    setFees(
      (item.feeDetails || []).map((detail) => ({
        feeMasterId: detail.feeMaster?.id,
        feeName: detail.feeMaster?.feeName,
        feeCode: detail.feeMaster?.feeCode,
        amount: detail.amount,
      })),
    );

    setFeeInput(initialFeeInput);
    setEditIndex(null);

    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setEditingId(null);
    setEditIndex(null);
    setFormData(initialFormData);
    setFeeInput(initialFeeInput);
    setFees([]);
  };

  // =====================================================
  // SAVE / UPDATE
  // =====================================================

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      !formData.session ||
      !formData.standard ||
      !formData.category ||
      !formData.batch
    ) {
      alert("Please fill all Fee Structure fields.");
      return;
    }

    if (fees.length === 0) {
      alert("Please add at least one fee.");
      return;
    }

    const payload = {
      session: formData.session,
      standard: formData.standard,
      feeCategory: formData.category,
      batch: formData.batch,
      fees: fees.map((item) => ({
        feeMasterId: item.feeMasterId,
        amount: Number(item.amount),
      })),
    };

    console.log("editingId =", editingId);
    console.log("payload =", payload);

    setSaveLoading(true);

    try {
      let res;

      if (editingId) {
        res = await axiosInstance.put(
          `/api/fee-structure/${editingId}`,
          payload,
          {
            ...authConfig,
            headers: {
              ...authConfig.headers,
              "Content-Type": "application/json",
            },
          },
        );
      } else {
        res = await axiosInstance.post(
          "/api/fee-structure",
          payload,
          {
            ...authConfig,
            headers: {
              ...authConfig.headers,
              "Content-Type": "application/json",
            },
          },
        );
      }

      alert(
        res.data?.message ||
          res.data ||
          (editingId
            ? "Fee Structure Updated Successfully"
            : "Fee Structure Created Successfully"),
      );

      resetForm();
      await loadFeeStructures();
    } catch (error) {
      console.error("Save Fee Structure Error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Something went wrong",
      );
    } finally {
      setSaveLoading(false);
    }
  };

  // =====================================================
  // DELETE STRUCTURE
  // =====================================================

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this Fee Structure?",
      )
    ) {
      return;
    }

    try {
      const res = await axiosInstance.delete(
        `/api/fee-structure/${id}`,
        authConfig,
      );

      alert(
        res.data?.message ||
          res.data ||
          "Fee Structure deleted successfully",
      );

      if (editingId === id) {
        resetForm();
      }

      await loadFeeStructures();
    } catch (error) {
      console.error("Delete Error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Delete Failed",
      );
    }
  };

  // =====================================================
  // FILTER CHANGE
  // =====================================================

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // FILTER STRUCTURES
  // =====================================================

  const filteredStructures = useMemo(() => {
    return feeStructures.filter((item) => {
      const search = filter.search.toLowerCase();

      const matchesSearch =
        !search ||
        item.session?.toLowerCase().includes(search) ||
        item.standard?.toLowerCase().includes(search) ||
        item.feeCategory?.toLowerCase().includes(search) ||
        item.batch?.toLowerCase().includes(search);

      const matchesSession =
        !filter.session || item.session === filter.session;

      const matchesStandard =
        !filter.standard || item.standard === filter.standard;

      const matchesCategory =
        !filter.category || item.feeCategory === filter.category;

      const matchesBatch =
        !filter.batch || item.batch === filter.batch;

      return (
        matchesSearch &&
        matchesSession &&
        matchesStandard &&
        matchesCategory &&
        matchesBatch
      );
    });
  }, [feeStructures, filter]);

  // =====================================================
  // CLEAR FILTER
  // =====================================================

  const clearFilter = () => {
    setFilter({
      session: "",
      standard: "",
      category: "",
      batch: "",
      search: "",
    });
  };

  // =====================================================
  // BATCH VALUE HELPER
  // =====================================================

  const getBatchValue = (item) => {
    if (typeof item === "string") return item;

    return item?.batch || item?.name || item?.value || "";
  };

  // =====================================================
  // TOTAL CURRENT FEES
  // =====================================================

  const totalCurrentFee = fees.reduce(
    (sum, fee) => sum + Number(fee.amount || 0),
    0,
  );

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div
        className="bg-white shadow rounded-3 p-3 mb-3"
         style={{
          borderLeft: "5px solid #0d6efd",
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h5 className="mb-1">
              <strong>Fee Structure</strong>
            </h5>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <span>Home</span>
                </li>

                <li className="breadcrumb-item">
                  <span>Fee</span>
                </li>

                <li className="breadcrumb-item active">
                  Fee Structure
                </li>
              </ol>
            </nav>
          </div>

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => navigate("fee-types")}
          >
            <LuLayers className="me-1" size={17} />
            Fee Type Master
          </button>
        </div>
      </div>

      {/* =====================================================
          CREATE / UPDATE FORM
      ===================================================== */}

      <div className="card border-0 shadow mb-3">
        <div className="card-header bg-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              <strong>
                {editingId
                  ? "Update Fee Structure"
                  : "Create Fee Structure"}
              </strong>
            </h6>

            {editingId && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetForm}
              >
                <LuX size={16} className="me-1" />
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        <div className="card-body">
          {pageLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" />
              <p className="mt-2 mb-0 text-muted">
                Loading master data...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSave}>
              {/* ==========================
                  STRUCTURE DETAILS
              ========================== */}

              <div className="row g-3">
                {/* Session */}

                <div className="col-12 col-md-6 col-xl-3">
                  <label className="form-label">
                    Session <span className="text-danger">*</span>
                  </label>

                  <select
                    className="form-select"
                    name="session"
                    value={formData.session}
                    onChange={handleFormChange}
                  >
                    <option value="">Select Session</option>

                    {sessions.map((item, index) => (
                      <option key={index} value={item}>
                        {String(item).replaceAll("_", "-")}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Standard */}

                <div className="col-12 col-md-6 col-xl-3">
                  <label className="form-label">
                    Standard <span className="text-danger">*</span>
                  </label>

                  <select
                    className="form-select"
                    name="standard"
                    value={formData.standard}
                    onChange={handleFormChange}
                  >
                    <option value="">Select Standard</option>

                    {standards.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}

                <div className="col-12 col-md-6 col-xl-3">
                  <label className="form-label">
                    Fee Category <span className="text-danger">*</span>
                  </label>

                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                  >
                    <option value="">Select Category</option>

                    {feeCategories.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Batch */}

                <div className="col-12 col-md-6 col-xl-3">
                  <label className="form-label">
                    Fee Batch <span className="text-danger">*</span>
                  </label>

                  <select
                    className="form-select"
                    name="batch"
                    value={formData.batch}
                    onChange={handleFormChange}
                  >
                    <option value="">Select Batch</option>

                    {feeBatches.map((item, index) => {
                      const value = getBatchValue(item);

                      return (
                        <option key={index} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <hr className="my-4" />

              {/* ==========================
                  ADD FEE
              ========================== */}

              <div className="mb-3">
                <h6 className="mb-3">
                  <strong>Add Fee Components</strong>
                </h6>

                <div className="row g-3">
                  <div className="col-12 col-md-5">
                    <label className="form-label">
                      Fee Type
                    </label>

                    <select
                      className="form-select"
                      name="type"
                      value={feeInput.type}
                      onChange={handleFeeInputChange}
                    >
                      <option value="">
                        Select Fee Type
                      </option>

                      {feeMaster.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.feeCode
                            ? `${item.feeCode} - ${item.feeName}`
                            : item.feeName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-5">
                    <label className="form-label">
                      Amount
                    </label>

                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="Enter Amount"
                      name="amount"
                      value={feeInput.amount}
                      onChange={handleFeeInputChange}
                    />
                  </div>

                  <div className="col-12 col-md-2 d-flex align-items-end">
                    <div className="w-100 d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-primary flex-grow-1"
                        onClick={handleAddFee}
                      >
                        {editIndex !== null ? (
                          <>
                            <LuPencil
                              size={16}
                              className="me-1"
                            />
                            Update
                          </>
                        ) : (
                          <>
                            <LuPlus
                              size={16}
                              className="me-1"
                            />
                            Add
                          </>
                        )}
                      </button>

                      {editIndex !== null && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={handleCancelFeeEdit}
                        >
                          <LuX size={17} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ==========================
                  TEMP FEE TABLE
              ========================== */}

              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle mb-2">
                  <thead className="table-light">
                    <tr>
                      <th width="70">S.No</th>
                      <th>Fee Code</th>
                      <th>Fee Type</th>
                      <th>Amount</th>
                      <th width="150">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {fees.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center text-muted py-4"
                        >
                          No fee components added yet.
                        </td>
                      </tr>
                    ) : (
                      fees.map((fee, index) => (
                        <tr key={`${fee.feeMasterId}-${index}`}>
                          <td>{index + 1}</td>

                          <td>{fee.feeCode || "-"}</td>

                          <td>{fee.feeName}</td>

                          <td>
                            <strong>
                              ₹ {Number(fee.amount).toLocaleString("en-IN")}
                            </strong>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-warning me-2"
                              title="Edit"
                              onClick={() =>
                                handleEditFee(index)
                              }
                            >
                              <LuPencil size={15} />
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              title="Delete"
                              onClick={() =>
                                handleDeleteFee(index)
                              }
                            >
                              <LuTrash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>

                  {fees.length > 0 && (
                    <tfoot>
                      <tr>
                        <th
                          colSpan="3"
                          className="text-end"
                        >
                          Total Fee
                        </th>

                        <th>
                          ₹{" "}
                          {totalCurrentFee.toLocaleString(
                            "en-IN",
                          )}
                        </th>

                        <th></th>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>

              {/* ==========================
                  SAVE
              ========================== */}

              <div className="d-flex justify-content-end gap-2 mt-4">
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={resetForm}
                    disabled={saveLoading}
                  >
                    <LuX className="me-1" />
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  className="btn btn-success px-4"
                  disabled={saveLoading}
                >
                  {saveLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      />

                      Saving...
                    </>
                  ) : editingId ? (
                    <>
                      <LuSave className="me-1" />
                      Update Fee Structure
                    </>
                  ) : (
                    <>
                      <LuSave className="me-1" />
                      Save Fee Structure
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* =====================================================
          FILTER
      ===================================================== */}

      <div className="card border-0 shadow mb-3">
        <div className="card-header bg-white py-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h6 className="mb-0">
              <strong>Search Fee Structures</strong>
            </h6>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={clearFilter}
            >
              <LuRefreshCw size={15} className="me-1" />
              Clear
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-6 col-xl-2">
              <label className="form-label">Session</label>

              <select
                className="form-select"
                name="session"
                value={filter.session}
                onChange={handleFilterChange}
              >
                <option value="">All Sessions</option>

                {sessions.map((item, index) => (
                  <option key={index} value={item}>
                    {String(item).replaceAll("_", "-")}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 col-xl-2">
              <label className="form-label">Standard</label>

              <select
                className="form-select"
                name="standard"
                value={filter.standard}
                onChange={handleFilterChange}
              >
                <option value="">All Standards</option>

                {standards.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 col-xl-2">
              <label className="form-label">Category</label>

              <select
                className="form-select"
                name="category"
                value={filter.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>

                {feeCategories.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 col-xl-2">
              <label className="form-label">Batch</label>

              <select
                className="form-select"
                name="batch"
                value={filter.batch}
                onChange={handleFilterChange}
              >
                <option value="">All Batches</option>

                {feeBatches.map((item, index) => {
                  const value = getBatchValue(item);

                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-12 col-xl-4">
              <label className="form-label">
                Search
              </label>

              <div className="input-group">
                <span className="input-group-text bg-white">
                  <LuSearch size={17} />
                </span>

                <input
                  type="search"
                  className="form-control"
                  name="search"
                  value={filter.search}
                  onChange={handleFilterChange}
                  placeholder="Search session, class, category..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FEE STRUCTURE LIST
      ===================================================== */}

      <div className="card border-0 shadow mb-4">
        <div className="card-header bg-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              <strong>Fee Structure List</strong>
            </h6>

            <span className="badge bg-primary">
              {filteredStructures.length} Structure
              {filteredStructures.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>S.No</th>
                  <th>Session</th>
                  <th>Standard</th>
                  <th>Category</th>
                  <th>Batch</th>
                  <th>Fee Code</th>
                  <th>Fee Name</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th width="130">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStructures.length === 0 ? (
                  <tr>
                    <td
                      colSpan="10"
                      className="text-center py-5 text-muted"
                    >
                      <div className="mb-2">
                        <LuLayers size={30} />
                      </div>

                      No Fee Structure Found
                    </td>
                  </tr>
                ) : (
                  filteredStructures.map((item, index) => {
                    const details = item.feeDetails || [];

                    return details.length > 0 ? (
                      details.map((detail, detailIndex) => (
                        <tr key={`${item.id}-${detail.id}`}>
                          {detailIndex === 0 && (
                            <>
                              <td
                                rowSpan={details.length}
                                className="text-center"
                              >
                                {index + 1}
                              </td>

                              <td
                                rowSpan={details.length}
                              >
                                {item.session}
                              </td>

                              <td
                                rowSpan={details.length}
                              >
                                {item.standard}
                              </td>

                              <td
                                rowSpan={details.length}
                              >
                                {item.feeCategory}
                              </td>

                              <td
                                rowSpan={details.length}
                              >
                                {item.batch}
                              </td>
                            </>
                          )}

                          <td>
                            {detail.feeMaster?.feeCode ||
                              "-"}
                          </td>

                          <td>
                            {detail.feeMaster?.feeName ||
                              "-"}
                          </td>

                          <td>
                            <strong>
                              ₹{" "}
                              {Number(
                                detail.amount || 0,
                              ).toLocaleString("en-IN")}
                            </strong>
                          </td>

                          <td>
                            {detail.feeMaster?.status ===
                            "ACTIVE" ? (
                              <span className="badge bg-success">
                                ACTIVE
                              </span>
                            ) : (
                              <span className="badge bg-danger">
                                INACTIVE
                              </span>
                            )}
                          </td>

                          {detailIndex === 0 && (
                            <td
                              rowSpan={details.length}
                              className="text-center"
                            >
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-warning me-2"
                                title="Edit Structure"
                                onClick={() =>
                                  handleEdit(item)
                                }
                              >
                                <LuPencil size={16} />
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                title="Delete Structure"
                                onClick={() =>
                                  handleDelete(item.id)
                                }
                              >
                                <LuTrash2 size={16} />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.session}</td>
                        <td>{item.standard}</td>
                        <td>{item.feeCategory}</td>
                        <td>{item.batch}</td>
                        <td colSpan="5">
                          No fee details available
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create_Fee_Structure;