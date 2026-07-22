import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create_Fee_Structure = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    session: "",
    standard: "",
    category: "",
    batch: "",
  });

  const [feeInput, setFeeInput] = useState({
    type: "",
    amount: "",
  });

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Backend Data
  const [feeCategories, setFeeCategories] = useState([]);
  const [feeBatches, setFeeBatches] = useState([]);
  const [standard, setStandard] = useState([]);
  const [feeMaster, setFeeMaster] = useState([]);
  const [feeStructures, setFeeStructures] = useState([]);

  const [allFeeStructures, setAllFeeStructures] = useState([]);

  const [editIndex, setEditIndex] = useState(null);

  const [filter, setFilter] = useState({
    session: "",
    standard: "",
    category: "",
    batch: "",
  });

  useEffect(() => {
    loadFeeCategories();
    loadFeeBatches();
    loadStandard();
    loadFeeMaster();
  }, []);

  console.log("feeCategories", feeCategories);
  console.log("feeBatches", feeBatches);
  console.log("standard", standard);
  console.log("feeMaster", feeMaster);
  console.log("feeStructures", feeStructures);

  useEffect(() => {
    loadFeeStructures();
  }, []);

  const loadFeeStructures = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:8080/api/fee-structure", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeeStructures(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadFeeMaster = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/fee-master", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeeMaster(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadStandard = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/master/standard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStandard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFeeCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/master/fee-category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFeeCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFeeBatches = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/master/fee-batch",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFeeBatches(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeeInputChange = (e) => {
    const { name, value } = e.target;

    setFeeInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   const handleAddFee = () => {
  //     if (!feeInput.type || !feeInput.amount) return;

  //     if (editIndex !== null) {
  //       const updated = [...fees];
  //       updated[editIndex] = feeInput;
  //       setFees(updated);
  //       setEditIndex(null);
  //     } else {
  //       setFees([...fees, feeInput]);
  //     }

  //     setFeeInput({
  //       type: "",
  //       amount: "",
  //     });
  //   };

  const handleEditFee = (index) => {
    const fee = fees[index];

    setFeeInput({
      type: fee.feeMasterId,
      amount: fee.amount,
    });

    setEditIndex(index);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this Fee Structure?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:8080/api/fee-structure/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data);

      loadFeeStructures();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const [editingId, setEditingId] = useState(null);
  // table structure handlee
 const handleEdit = (item) => {
  setEditingId(item.id);

  setFormData({
    session: item.session,
    standard: item.standard,
    category: item.feeCategory,
    batch: item.batch,
  });

  setFees(
    item.feeDetails.map((d) => ({
      feeMasterId: d.feeMaster.id,
      feeName: d.feeMaster.feeName,
      amount: d.amount,
    }))
  );

  // Reset fee input
  setFeeInput({
    type: "",
    amount: "",
  });

  setEditIndex(null);
};

  // saved api call
  const handleSave = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (
      !formData.session ||
      !formData.standard ||
      !formData.category ||
      !formData.batch
    ) {
      alert("Please fill all fields");
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

    // 👇 Ye 2 console yahin lagao
    console.log("editingId =", editingId);
    console.log("payload =", payload);

    try {
      let res;

      if (editingId) {
        console.log("PUT API Call");
        res = await axios.put(
          `http://localhost:8080/api/fee-structure/${editingId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
      } else {
        console.log("POST API Call");
        res = await axios.post(
          "http://localhost:8080/api/fee-structure",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
      }

      alert(res.data);

      setEditingId(null);

      setFormData({
        session: "",
        standard: "",
        category: "",
        batch: "",
      });

      setFeeInput({
        type: "",
        amount: "",
      });

      setFees([]);

      loadFeeStructures();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          err.response?.data ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  // add before saved
  const handleAddFee = () => {
  if (!feeInput.type || !feeInput.amount) return;

  const selectedFee = feeMaster.find(
    (item) => item.id === Number(feeInput.type)
  );

  const obj = {
    feeMasterId: selectedFee.id,
    feeName: selectedFee.feeName,
    amount: Number(feeInput.amount),
  };

  if (editIndex !== null) {
    const temp = [...fees];
    temp[editIndex] = obj;
    setFees(temp);
    setEditIndex(null);
  } else {
    setFees([...fees, obj]);
  }

  setFeeInput({
    type: "",
    amount: "",
  });
};

  // handle delete fee
  const handleDeleteFee = (index) => {
    const updated = [...fees];
    updated.splice(index, 1);
    setFees(updated);

    if (editIndex === index) {
      setEditIndex(null);
      setFeeInput({
        type: "",
        amount: "",
      });
    }
  };

  return (
    <>
      <div className="shadow bg-white p-3 mb-3" style={{ borderRadius: "6px" }}>
        <h5 className="mb-1">Create Fee Structure</h5>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">Home</li>
            {/* <li className="breadcrumb-item">Master</li> */}
            <li className="breadcrumb-item active">Fee Structure</li>
          </ol>
        </nav>
      </div>
      <div className="">
        <div className="card shadow-sm">
          <div className="card-header">
            <div className="row">
              <div className="col-md-6">
                <h6 className="mb-0">Create Fee Structure</h6>
              </div>
              <div className="col-md-6 text-end">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate("fee-types")}
                >
                  Fee Type Master
                </button>
              </div>
            </div>
          </div>

          <div className="p-3">
            <form onSubmit={handleSave}>
              <div className="row">
                <div className="col-md-3">
                  <label>Session</label>

                  <select
                    className="form-select"
                    name="session"
                    value={formData.session}
                    onChange={handleFormChange}
                  >
                    <option value="">Select</option>
                    <option value="2025-26">2025-26</option>
                    <option value="2026-27">2026-27</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label>Standard</label>

                  <select
                    className="form-select"
                    name="standard"
                    value={formData.standard}
                    onChange={handleFormChange}
                  >
                    <option value="">Select</option>

                    {standard.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label>Fee Category</label>

                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                  >
                    <option value="">Select</option>

                    {feeCategories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label>Batch</label>

                  <select
                    className="form-select"
                    name="batch"
                    value={formData.batch}
                    onChange={handleFormChange}
                  >
                    <option value="">Select</option>

                    {feeBatches.map((item) => (
                      <option key={item.id} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-md-5">
                  <select
                    className="form-select"
                    name="type"
                    value={feeInput.type}
                    onChange={handleFeeInputChange}
                  >
                    <option value="">Select Fee Type</option>

                    {feeMaster.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.feeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-5">
                  <input
                    className="form-control"
                    placeholder="Amount"
                    name="amount"
                    value={feeInput.amount}
                    onChange={handleFeeInputChange}
                  />
                </div>

                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleAddFee}
                  >
                    {editIndex === null ? "Add" : "Update"}
                  </button>
                </div>
              </div>

              <table className="table table-bordered mt-4">
                <thead>
                  <tr>
                    <th>Fee Type</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {fees.map((fee, index) => (
                    <tr key={index}>
                      <td>{fee.feeName}</td>

                      <td>{fee.amount}</td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEditFee(index)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteFee(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="btn btn-success">
                {editingId ? "Update Fee Structure" : "Save Fee Structure"}
              </button>
            </form>
          </div>
        </div>

        {/* TODO */}
        {/* Filter Section */}

        {/* TODO */}
        {/* Saved Fee Structure Table */}
      </div>

      <div className="card mt-3 shadow-sm mb-3" style={{ borderRadius: "6px" }}>
        <div className="card-header">
          <strong>Fee Structure List</strong>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
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
                  <th width="150">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : feeStructures.length > 0 ? (
                  feeStructures.map((item, index) =>
                    item.feeDetails.map((detail, i) => (
                      <tr key={detail.id}>
                        {i === 0 && (
                          <>
                            <td rowSpan={item.feeDetails.length}>
                              {index + 1}
                            </td>

                            <td rowSpan={item.feeDetails.length}>
                              {item.session}
                            </td>

                            <td rowSpan={item.feeDetails.length}>
                              {item.standard}
                            </td>

                            <td rowSpan={item.feeDetails.length}>
                              {item.feeCategory}
                            </td>

                            <td rowSpan={item.feeDetails.length}>
                              {item.batch}
                            </td>
                          </>
                        )}

                        <td>{detail.feeMaster.feeCode}</td>

                        <td>{detail.feeMaster.feeName}</td>

                        <td>₹ {detail.amount}</td>

                        <td>
                          {detail.feeMaster.status === "ACTIVE" ? (
                            <span className="badge bg-success">ACTIVE</span>
                          ) : (
                            <span className="badge bg-danger">INACTIVE</span>
                          )}
                        </td>

                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )),
                  )
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No records found
                    </td>
                  </tr>
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
