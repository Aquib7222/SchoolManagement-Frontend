import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Create_Fee_Master = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    feeName: "",
    feeCode: "",
    feeCategory: "",
    status: "ACTIVE",
  });

  const token = localStorage.getItem("token");
  const [feeCategories, setFeeCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadFeeCategories();
    loadFeeMaster();

    // TODO
    // loadBatches();
    // loadFeeStructures();
  }, []);
  console.log("feeCategories", feeCategories);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("formData", formData);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8080/api/fee-master",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      alert(res.data);

      // Form Clear
      setFormData({
        feeName: "",
        feeCode: "",
        feeCategory: "",
        status: "ACTIVE",
      });

      // Agar list dikha rahe ho to reload kar lo
      // loadFeeMaster();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          err.response?.data ||
          "Something went wrong",
      );
    }
  };

  const [feeMaster, setFeeMaster] = useState([]);

  const loadFeeMaster = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/fee-master", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeeMaster(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="shadow bg-white p-3 mb-3" style={{ borderRadius: "6px" }}>
        <h5 className="mb-1">Create Fee Master</h5>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item">Master</li>
            <li className="breadcrumb-item active">Fee Master</li>
          </ol>
        </nav>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <h6 className="mb-0">Fee Master Details</h6>
            </div>
            <div className="col-md-6 text-end">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>

        <div className="card-body">
          <form onSubmit={handleSave}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Fee Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="feeName"
                  value={formData.feeName}
                  onChange={handleChange}
                  placeholder="Enter Fee Name"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Fee Code</label>

                <input
                  type="text"
                  className="form-control"
                  name="feeCode"
                  value={formData.feeCode}
                  onChange={handleChange}
                  placeholder="Enter Fee Code"
                />
              </div>

              <div className="col-md-3">
                <label>Fee Category</label>

                <select
                  className="form-select"
                  name="feeCategory"
                  value={formData.feeCategory}
                  onChange={handleChange}
                >
                  <option value="">Select</option>

                  {feeCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">ACTIVE</option>

                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Save Fee Master
            </button>
          </form>
        </div>
      </div>

      {/* fee master list  */}
      <div className="card shadow-sm mt-3">
        <div className="card-header">
          <h6 className="mb-0">Fee Master List</h6>
        </div>
        <div className="card-body">
           <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-primary">
              <tr>
                <th>S.No</th>
                <th>Fee Code</th>
                <th>Fee Name</th>
                <th>Fee Category</th>
                
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : feeMaster.length > 0 ? (
                feeMaster.map((a, index) => (
                  <tr key={a.id}>
                    <td>{ index + 1}</td>
                    <td>
                      {a.feeCode}
                    </td>
                    <td>{a.feeName}</td>
                    <td>{a.feeCategory}</td>
                    
                    <td>
                      {a.status === "ACTIVE" ? (
                        <span className="badge bg-success">ACTIVE</span>
                      ) : (
                        <span className="badge bg-danger">INACTIVE</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
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

export default Create_Fee_Master;
