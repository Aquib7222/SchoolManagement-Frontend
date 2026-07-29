import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const DeleteFeeReceipt = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState([]);
  const [admissionNumber, setAdmissionNumber] = useState();

  // api for get receipt using admission number
  const loadReceipts = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/student-fee/payment/history/${admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const successReceipts = res.data.filter(
        (item) => item.status === "SUCCESS",
      );

      setReceipts(successReceipts);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("admission no", admissionNumber);
  console.log("Receipt", receipts);

  // api for delete receipt
  const handleDeleteReceipt = async (receiptNo) => {
    if (!window.confirm("Are you sure want to delete this receipt?")) {
      return;
    }

    try {
      await axiosInstance.delete(
        `/api/student-fee/payment/receipt/${receiptNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert("Receipt Deleted Successfully");
    } catch (error) {
      console.log(error);

      alert("Unable to delete receipt");
    }
  };
  return (
    <>
      {/* ===========================
        Header
      =========================== */}
      <div className="bg-white shadow p-3 mt-3">
        <div className="col-md-8">
          <h4 className="mb-1">
            <strong>Delete Fee Receipt</strong>
          </h4>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">Fee</li>
              <li className="breadcrumb-item active">Delete Fee Receipt</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* search card  */}

      <div className=" shadow rounded mt-3">
        <div className="card">
          <div className="card-header bg-success text-white">
            <h5>Search Student</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-5">
                <label>Admission No:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Admission Number"
                  value={admissionNumber}
                  onChange={(e) => setAdmissionNumber(e.target.value)}
                />
              </div>
              <div className="col-md-3 mt-4">
                <button className="btn btn-success" onClick={loadReceipts}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Receipt History
      ========================================== */}

      <div className="shadow rounded mt-4">
        <div className="card shadow">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">Receipt History</h5>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-success">
                  <tr>
                    <th>#</th>

                    <th>Receipt No</th>

                    <th>Paid Month</th>

                    <th>Payment Mode</th>

                    <th>Transaction Id</th>

                    <th>Collected By</th>

                    <th>Paid Date</th>

                    <th>Amount</th>

                    <th>Status</th>

                    <th width="170">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {receipts.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center text-danger">
                        No Receipt Found
                      </td>
                    </tr>
                  ) : (
                    receipts.map((receipt, index) => (
                      <tr key={receipt.id}>
                        <td>{index + 1}</td>

                        <td>{receipt.receiptNo}</td>

                        <td>{receipt.month}</td>

                        <td>{receipt.paymentMode}</td>

                        <td>{receipt.transactionId}</td>

                        <td>{receipt.collectedBy}</td>

                        <td>{receipt.paymentDate}</td>

                        <td>₹ {Number(receipt.amount).toFixed(2)}</td>

                        <td>
                          <span className="badge bg-success">Paid</span>
                        </td>

                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() =>
                              navigate(`/fee/receipt/${receipt.receiptNo}`)
                            }
                          >
                            View
                          </button>

                          <button
  className="btn btn-sm btn-danger mt-2"
  onClick={() => handleDeleteReceipt(receipt.receiptNo)}
>
  Delete
</button>
                        </td>
                      </tr>
                    ))
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

export default DeleteFeeReceipt;
