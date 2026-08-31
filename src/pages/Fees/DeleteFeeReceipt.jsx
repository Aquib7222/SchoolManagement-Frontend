// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";

// const DeleteFeeReceipt = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const [receipts, setReceipts] = useState([]);
//   const [admissionNumber, setAdmissionNumber] = useState();

//   // api for get receipt using admission number
//   const loadReceipts = async () => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/student-fee/payment/history/${admissionNumber}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const successReceipts = res.data.filter(
//         (item) => item.status === "SUCCESS",
//       );

//       setReceipts(successReceipts);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   console.log("admission no", admissionNumber);
//   console.log("Receipt", receipts);

//   // api for delete receipt
//   const handleDeleteReceipt = async (receiptNo) => {
//     if (!window.confirm("Are you sure want to delete this receipt?")) {
//       return;
//     }

//     try {
//       await axiosInstance.delete(
//         `/api/student-fee/payment/receipt/${receiptNo}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         },
//       );

//       alert("Receipt Deleted Successfully");
//     } catch (error) {
//       console.log(error);

//       alert("Unable to delete receipt");
//     }
//   };
//   return (
//     <>
//       {/* ===========================
//         Header
//       =========================== */}
//       <div className="bg-white shadow p-3 mt-3">
//         <div className="col-md-8">
//           <h4 className="mb-1">
//             <strong>Delete Fee Receipt</strong>
//           </h4>

//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb mb-0">
//               <li className="breadcrumb-item">Home</li>
//               <li className="breadcrumb-item">Fee</li>
//               <li className="breadcrumb-item active">Delete Fee Receipt</li>
//             </ol>
//           </nav>
//         </div>
//       </div>

//       {/* search card  */}

//       <div className=" shadow rounded mt-3">
//         <div className="card">
//           <div className="card-header bg-success text-white">
//             <h5>Search Student</h5>
//           </div>
//           <div className="card-body">
//             <div className="row">
//               <div className="col-md-5">
//                 <label>Admission No:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter Admission Number"
//                   value={admissionNumber}
//                   onChange={(e) => setAdmissionNumber(e.target.value)}
//                 />
//               </div>
//               <div className="col-md-3 mt-4">
//                 <button className="btn btn-success" onClick={loadReceipts}>
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ==========================================
//           Receipt History
//       ========================================== */}

//       <div className="shadow rounded mt-4">
//         <div className="card shadow">
//           <div className="card-header bg-success text-white">
//             <h5 className="mb-0">Receipt History</h5>
//           </div>

//           <div className="card-body">
//             <div className="table-responsive">
//               <table className="table table-bordered table-hover">
//                 <thead className="table-success">
//                   <tr>
//                     <th>#</th>

//                     <th>Receipt No</th>

//                     <th>Paid Month</th>

//                     <th>Payment Mode</th>

//                     <th>Transaction Id</th>

//                     <th>Collected By</th>

//                     <th>Paid Date</th>

//                     <th>Amount</th>

//                     <th>Status</th>

//                     <th width="170">Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {receipts.length === 0 ? (
//                     <tr>
//                       <td colSpan="10" className="text-center text-danger">
//                         No Receipt Found
//                       </td>
//                     </tr>
//                   ) : (
//                     receipts.map((receipt, index) => (
//                       <tr key={receipt.id}>
//                         <td>{index + 1}</td>

//                         <td>{receipt.receiptNo}</td>

//                         <td>{receipt.month}</td>

//                         <td>{receipt.paymentMode}</td>

//                         <td>{receipt.transactionId}</td>

//                         <td>{receipt.collectedBy}</td>

//                         <td>{receipt.paymentDate}</td>

//                         <td>₹ {Number(receipt.amount).toFixed(2)}</td>

//                         <td>
//                           <span className="badge bg-success">Paid</span>
//                         </td>

//                         <td>
//                           <button
//                             className="btn btn-sm btn-primary me-2"
//                             onClick={() =>
//                               navigate(`/fee/receipt/${receipt.receiptNo}`)
//                             }
//                           >
//                             View
//                           </button>

//                           <button
//   className="btn btn-sm btn-danger mt-2"
//   onClick={() => handleDeleteReceipt(receipt.receiptNo)}
// >
//   Delete
// </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DeleteFeeReceipt;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaEye,
  FaFileInvoiceDollar,
  FaSearch,
  FaTrash,
  FaReceipt,
} from "react-icons/fa";
import { MdOutlineSchool, MdDeleteSweep } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import axiosInstance from "../../api/axiosInstance";

const DeleteFeeReceipt = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [receipts, setReceipts] = useState([]);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // ==============================
  // LOAD RECEIPTS
  // ==============================
  const loadReceipts = async () => {
    if (!admissionNumber.trim()) {
      alert("Please enter admission number.");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);

      const res = await axiosInstance.get(
        `/api/student-fee/payment/history/${admissionNumber.trim()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const successReceipts = (res.data || []).filter(
        (item) => item.status === "SUCCESS",
      );

      setReceipts(successReceipts);
    } catch (err) {
      console.log(err);
      setReceipts([]);

      alert(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to load receipt history.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // DELETE RECEIPT
  // ==============================
  const handleDeleteReceipt = async (receiptNo) => {
    if (
      !window.confirm(
        `Are you sure you want to delete receipt ${receiptNo}?`,
      )
    ) {
      return;
    }

    try {
      await axiosInstance.delete(
        `/api/student-fee/payment/receipt/${receiptNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Receipt Deleted Successfully");

      // Remove deleted receipt immediately from UI
      setReceipts((prev) =>
        prev.filter((item) => item.receiptNo !== receiptNo),
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Unable to delete receipt",
      );
    }
  };

  // ==============================
  // ENTER SEARCH
  // ==============================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loadReceipts();
    }
  };

  // ==============================
  // RESET
  // ==============================
  const handleReset = () => {
    setAdmissionNumber("");
    setReceipts([]);
    setSearched(false);
  };

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
            border: "1px solid #dbeafe",
          }}
        >
          <div className="p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div className="d-flex align-items-center gap-3">
                {/* ICON */}
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "52px",
                    height: "52px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <MdDeleteSweep size={28} />
                </div>

                {/* TITLE */}
                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Delete Fee Receipt
                  </h5>

                  <div className="text-muted small">
                    Fees &nbsp;/&nbsp; Delete Fee Receipt
                  </div>
                </div>
              </div>

              {/* BADGE */}
              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Fees
                </span>
              </div>
            </div>
          </div>

          {/* BREADCRUMB */}
          <div
            className="px-4 py-2"
            style={{
              backgroundColor: "rgba(239,246,255,.75)",
              borderTop: "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp; Fees &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Delete Fee Receipt
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH CARD
      ===================================================== */}
      <div className="px-2">
        <div className="card shadow border-0 mb-4 rounded-4">
          {/* CARD HEADER */}
          <div className="card-header bg-white py-3">
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "42px",
                  height: "42px",
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                }}
              >
                <FaSearch size={20} />
              </div>

              <div className="d-flex flex-column ms-2">
                <h6 className="mb-0 lh-1">
                  Search Student
                </h6>

                <small className="lh-1 text-muted mt-1">
                  Search receipt using admission number
                </small>
              </div>
            </div>
          </div>

          {/* CARD BODY */}
          <div className="card-body p-4">
            <div className="row g-3 align-items-end">
              <div className="col-xl-6 col-md-8">
                <label className="form-label fw-semibold">
                  Admission Number{" "}
                  <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Admission Number"
                  value={admissionNumber}
                  onChange={(e) =>
                    setAdmissionNumber(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="col-xl-2 col-md-4">
                <button
                  className="btn btn-primary w-100 rounded-3"
                  onClick={loadReceipts}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <FaSearch className="me-2" />
                      Search
                    </>
                  )}
                </button>
              </div>

              <div className="col-xl-2 col-md-4">
                <button
                  className="btn btn-outline-secondary w-100 rounded-3"
                  onClick={handleReset}
                  disabled={loading}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}
      {searched && (
        <div className="row g-3 mb-4 px-2">
          {/* RECEIPTS */}
          <div className="col-xl-4 col-md-6">
            <div className="premium-stat-card stat-blue shadow">
              <div className="stat-icon">
                <FaReceipt />
              </div>

              <div className="stat-content">
                <span>Total Receipts</span>

                <h3>{receipts.length}</h3>

                <small>Successful receipts found</small>
              </div>
            </div>
          </div>

          {/* TOTAL AMOUNT */}
          <div className="col-xl-4 col-md-6">
            <div className="premium-stat-card stat-green shadow">
              <div className="stat-icon">
                <RiMoneyRupeeCircleFill />
              </div>

              <div className="stat-content">
                <span>Total Collected</span>

                <h3>
                  ₹
                  {receipts
                    .reduce(
                      (sum, item) =>
                        sum + Number(item.amount || 0),
                      0,
                    )
                    .toFixed(2)}
                </h3>

                <small>Successful payment amount</small>
              </div>
            </div>
          </div>

          {/* STUDENT */}
          <div className="col-xl-4 col-md-6">
            <div className="premium-stat-card stat-orange shadow">
              <div className="stat-icon">
                <FaFileInvoiceDollar />
              </div>

              <div className="stat-content">
                <span>Admission Number</span>

                <h5 className="mb-1">
                  {admissionNumber || "-"}
                </h5>

                <small>Receipt search reference</small>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          RECEIPT HISTORY
      ===================================================== */}
      <div className="px-2">
        <div className="card shadow border-0 mb-5 rounded-4">
          {/* HEADER */}
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "42px",
                  height: "42px",
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                }}
              >
                <FaFileInvoiceDollar size={23} />
              </div>

              <div className="d-flex flex-column ms-2">
                <h6 className="mb-0 lh-1">
                  Receipt History
                </h6>

                <small className="lh-1 text-muted mt-1">
                  Successful fee payment receipts
                </small>
              </div>
            </div>

            <span className="badge bg-info text-white">
              {receipts.length} Records
            </span>
          </div>

          {/* BODY */}
          <div className="card-body px-0">
            {loading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border text-primary"
                  style={{
                    width: "3rem",
                    height: "3rem",
                  }}
                />

                <h6 className="mt-3 text-muted">
                  Loading Receipt History...
                </h6>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="small text-center">
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
                      <th width="190">Action</th>
                    </tr>
                  </thead>

                  <tbody className="text-center small">
                    {receipts.length === 0 ? (
                      <tr>
                        <td
                          colSpan="10"
                          className="text-center py-5"
                        >
                          <div className="mb-2">
                            <FaFileInvoiceDollar
                              size={38}
                              className="text-muted"
                            />
                          </div>

                          <div className="text-danger fw-semibold">
                            {searched
                              ? "No Receipt Found"
                              : "Search Student To View Receipts"}
                          </div>

                          <small className="text-muted">
                            {searched
                              ? "No successful payment receipt found for this admission number."
                              : "Enter admission number above and click Search."}
                          </small>
                        </td>
                      </tr>
                    ) : (
                      receipts.map((receipt, index) => (
                        <tr key={receipt.id}>
                          {/* S.NO */}
                          <td>{index + 1}</td>

                          {/* RECEIPT */}
                          <td>
                            <span
                              className="badge fw-semibold px-2 py-1"
                              style={{
                                backgroundColor: "#dbeafe",
                                color: "#2563eb",
                              }}
                            >
                              {receipt.receiptNo || "-"}
                            </span>
                          </td>

                          {/* MONTH */}
                          <td>
                            <span className="badge bg-light text-dark border">
                              {receipt.month || "-"}
                            </span>
                          </td>

                          {/* PAYMENT MODE */}
                          <td>
                            <span className="badge bg-info text-white">
                              {receipt.paymentMode || "-"}
                            </span>
                          </td>

                          {/* TRANSACTION */}
                          <td>
                            {receipt.transactionId || "-"}
                          </td>

                          {/* COLLECTED BY */}
                          <td>
                            {receipt.collectedBy || "-"}
                          </td>

                          {/* DATE */}
                          <td>
                            {receipt.paymentDate || "-"}
                          </td>

                          {/* AMOUNT */}
                          <td>
                            <span
                              className="badge fw-semibold px-2 py-1"
                              style={{
                                backgroundColor: "#b9ffb8",
                                color: "#198754",
                              }}
                            >
                              ₹{" "}
                              {Number(
                                receipt.amount || 0,
                              ).toFixed(2)}
                            </span>
                          </td>

                          {/* STATUS */}
                          <td>
                            <span className="badge bg-success">
                              PAID
                            </span>
                          </td>

                          {/* ACTION */}
                          <td>
                            <div className="d-flex justify-content-center flex-wrap gap-2">
                              {/* VIEW */}
                              <button
                                className="btn btn-sm btn-outline-primary rounded-3"
                                onClick={() =>
                                  navigate(
                                    `/fee/receipt/${receipt.receiptNo}`,
                                  )
                                }
                              >
                                <FaEye className="me-1" />
                                View
                              </button>

                              {/* DELETE */}
                              <button
                                className="btn btn-sm btn-outline-danger rounded-3"
                                onClick={() =>
                                  handleDeleteReceipt(
                                    receipt.receiptNo,
                                  )
                                }
                              >
                                <FaTrash className="me-1" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>

                  {/* TOTAL */}
                  {receipts.length > 0 && (
                    <tfoot className="table-light">
                      <tr>
                        <th
                          colSpan="7"
                          className="text-end"
                        >
                          Total Collected
                        </th>

                        <th>
                          <span
                            className="badge fw-semibold px-2 py-1"
                            style={{
                              backgroundColor: "#b9ffb8",
                              color: "#198754",
                            }}
                          >
                            ₹{" "}
                            {receipts
                              .reduce(
                                (sum, item) =>
                                  sum +
                                  Number(
                                    item.amount || 0,
                                  ),
                                0,
                              )
                              .toFixed(2)}
                          </span>
                        </th>

                        <th colSpan="2"></th>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            )}

            {/* FOOTER */}
            {receipts.length > 0 && (
              <div className="d-flex justify-content-between align-items-center mt-4 px-3 pb-2">
                <div className="text-muted small">
                  Showing{" "}
                  <strong className="text-primary">
                    {receipts.length}
                  </strong>{" "}
                  successful receipt
                  {receipts.length !== 1 ? "s" : ""}
                </div>

                <button
                  className="btn btn-secondary rounded-3"
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeft className="me-2" />
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteFeeReceipt;