import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

const FeeCollection = () => {
  const { admissionNumber } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Logged In User", user);

  const token = localStorage.getItem("token");

  // ==========================================
  // Loading
  // ==========================================

  const [loading, setLoading] = useState(true);

  // ==========================================
  // Student
  // ==========================================

  const [student, setStudent] = useState(null);

  // ==========================================
  // Due Fee Schedule
  // ==========================================

  const [schedules, setSchedules] = useState([]);

  // ==========================================
  // Selected Schedule
  // ==========================================

  const [selectedIds, setSelectedIds] = useState([]);

  // ==========================================
  // Payment Details
  // ==========================================

  const [paymentMode, setPaymentMode] = useState("");

  const [transactionId, setTransactionId] = useState("");

  const [bankName, setBankName] = useState("");

  const [chequeNo, setChequeNo] = useState("");

  const [remarks, setRemarks] = useState("");

  const [fineAmount, setFineAmount] = useState(0);

  const [discountAmount, setDiscountAmount] = useState(0);

  const [paidAmount, setPaidAmount] = useState("");

  // ==========================================
  // Receipt
  // ==========================================

  const [receipt, setReceipt] = useState(null);

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {
    loadData();
  }, []);

  // ==========================================
  // Load Data
  // ==========================================

  const loadData = async () => {
    try {
      setLoading(true);

      await Promise.all([loadStudent(), loadSchedules()]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Load Student
  // ==========================================

  const loadStudent = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/students/${admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStudent(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================================
  // Load Due Fee Schedule
  // ==========================================

  const loadSchedules = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/student-fee/schedule/${admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const dueFees = res.data.filter(
        (item) => item.status === "UNPAID" || item.status === "PARTIAL",
      );

      setSchedules(dueFees);
    } catch (err) {
      console.log(err);
      setSchedules([]);
    }
  };
  console.log("Schedule ", schedules);
  console.log("Student", student);
  // ==========================================
  // Select Fee
  // ==========================================

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  // ==========================================
  // Total Amount
  // ==========================================

  const totalAmount = schedules
    .filter((item) => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + Number(item.dueAmount || 0), 0);

  // ==========================================
  // Collect Fee
  // ==========================================

  const handleCollectFee = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one fee.");
      return;
    }

    if (!paidAmount || Number(paidAmount) <= 0) {
      alert("Enter Paying Amount");
      return;
    }

    if (Number(paidAmount) > totalAmount) {
      alert("Paid Amount cannot exceed Due Amount");
      return;
    }
    // Payment Mode Required
    if (!paymentMode) {
      alert("Please select payment mode");
      return;
    }

    // Cash ke alawa validation
    if (paymentMode !== "Cash") {
      if (!transactionId.trim()) {
        alert("Transaction Id is required");
        return;
      }
    }

    // Online / UPI
    if (paymentMode === "Online" || paymentMode === "UPI") {
      if (!bankName.trim()) {
        alert("Bank Name is required");
        return;
      }
    }

    // Cheque
    if (paymentMode === "Cheque") {
      if (!bankName.trim()) {
        alert("Bank Name is required");
        return;
      }

      if (!chequeNo.trim()) {
        alert("Cheque Number is required");
        return;
      }
    }

    try {
      const payload = {
        scheduleIds: selectedIds,
        paymentMode,
        paidAmount: Number(paidAmount),
        transactionId,
        bankName,
        chequeNo,
        remarks,
        collectedBy: user.name,
        fineAmount: Number(fineAmount),
        discountAmount: Number(discountAmount),
      };

      const res = await axios.post(
        "http://localhost:8080/api/student-fee/payment",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Fee Collected Successfully");
      console.log("res",res);


      setReceipt(res.data);
      navigate(`/fee/receipt/${res.data.receiptNo}`);

      setPaidAmount("");

      setTransactionId("");

      setBankName("");

      setChequeNo("");

      setRemarks("");

      setFineAmount(0);

      setDiscountAmount(0);

      setPaymentMode("");

      setSelectedIds([]);

      loadSchedules();
      
    } catch (err) {
      console.log(err);
      alert("Fee Collection Failed");
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>

        <h5 className="mt-3">Loading Fee Collection...</h5>
      </div>
    );
  }

  // ==========================================
  // Student Not Found
  // ==========================================

  if (!student) {
    return (
      <div className="text-center mt-5">
        <h4>Student Not Found</h4>

        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" />
          Back
        </button>
      </div>
    );
  }
  // ==========================================
  // Loading
  // ==========================================

  // if (loading) {
  //   return (
  //     <div className="text-center mt-5">
  //       <div className="spinner-border text-primary"></div>
  //       <h5 className="mt-3">Loading...</h5>
  //     </div>
  //   );
  // }

  // if (!student) {
  //   return (
  //     <div className="text-center mt-5">
  //       <h4>Student Not Found</h4>
  //     </div>
  //   );
  // }

  return (
    <>
      {/* ==========================================
        Header
    ========================================== */}

      <div
        className="row shadow"
        style={{
          background: "#fff",
          margin: "10px",
          borderRadius: "6px",
          padding: "15px",
        }}
      >
        <div className="col-md-8">
          <h4 className="mb-1">
            <strong>Fee Collection</strong>
          </h4>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">Fee</li>
              <li className="breadcrumb-item active">Fee Collection</li>
            </ol>
          </nav>
        </div>

        <div className="col-md-4 text-end">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>

      {/* ==========================================
        Student Details
    ========================================== */}

      <div className="card shadow mt-3">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Student Details</h5>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-2 text-center">
              <img
                src={student.studentImage}
                alt=""
                className="img-thumbnail"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="col-md-5">
              <table className="table table-borderless table-sm">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>
                      {student.firstName} {student.lastName}
                    </td>
                  </tr>

                  <tr>
                    <th>Admission No</th>
                    <td>{student.admissionNumber}</td>
                  </tr>

                  <tr>
                    <th>Class</th>
                    <td>
                      {student.studentClass} / {student.section}
                    </td>
                  </tr>

                  <tr>
                    <th>Session</th>
                    <td>{student.academicYear}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-md-5">
              <table className="table table-borderless table-sm">
                <tbody>
                  <tr>
                    <th>Mobile</th>
                    <td>{student.mobile}</td>
                  </tr>

                  <tr>
                    <th>Category</th>
                    <td>{student.feeCategory}</td>
                  </tr>

                  <tr>
                    <th>Batch</th>
                    <td>{student.feeBatch}</td>
                  </tr>

                  <tr>
                    <th>Status</th>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
        Due Fee Table
    ========================================== */}

      <div className="card shadow mt-4">
        <div className="card-header bg-danger text-white">
          <h5 className="mb-0">Select Due Fee</h5>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th width="60">Select</th>
                  <th>Month</th>
                  <th>Fee Code</th>
                  <th>Fee Name</th>
                  <th>Amount</th>
                  <th>Paid</th>
                  <th>Due</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {schedules.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-danger">
                      No Due Fee Found
                    </td>
                  </tr>
                ) : (
                  schedules.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleSelect(item.id)}
                        />
                      </td>

                      <td>{item.month}</td>

                      <td>{item.feeCode}</td>

                      <td>{item.feeName}</td>

                      <td>₹ {item.amount}</td>

                      <td>₹ {item.paidAmount}</td>

                      <td className="text-danger fw-bold">
                        ₹ {item.dueAmount}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            item.status === "PARTIAL"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ==========================================
        Payment Details
    ========================================== */}

      <div className="card shadow mt-4">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">Payment Details</h5>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <label className="form-label">Payment Mode</label>

              <select
                className="form-select"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option value="">Select Payment Mode</option>
                <option>Cash</option>
                <option>Online</option>
                <option>UPI</option>
                <option>Cheque</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Fine Amount</label>

              <input
                type="number"
                className="form-control"
                value={fineAmount}
                onChange={(e) => setFineAmount(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Discount Amount</label>

              <input
                type="number"
                className="form-control"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label className="form-label">Paying Amount</label>

              <input
                type="number"
                className="form-control"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-3">
            {paymentMode === "Cheque" && (
              <div className="col-md-4">
                <label className="form-label">Cheque No</label>

                <input
                  type="text"
                  className="form-control"
                  value={chequeNo}
                  onChange={(e) => setChequeNo(e.target.value)}
                />
              </div>
            )}

            {paymentMode !== "Cash" && (
              <div className="col-md-4">
                <label className="form-label">Transaction Id</label>

                <input
                  type="text"
                  className="form-control"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </div>
            )}

            {paymentMode !== "Cash" && (
              <div className="col-md-4">
                <label className="form-label">Bank Name</label>

                <input
                  type="text"
                  className="form-control"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <label className="form-label">Remarks</label>

              <textarea
                rows="3"
                className="form-control"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
        Selected Fee Summary
    ========================================== */}

      <div className="card shadow mt-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4">
              <h4>
                Selected Fees :
                <span className="text-primary">{selectedIds.length}</span>
              </h4>
            </div>
            <div className="col-md-4">
              <h5 className="text-danger">Total Due : ₹ {totalAmount}</h5>

              <h4 className="text-success">Paying : ₹ {paidAmount || 0}</h4>
            </div>

            <div className="col-md-4 text-end">
              <h5 className="text-warning">
                Remaining : ₹{" "}
                {(totalAmount - Number(paidAmount || 0)).toFixed(2)}
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
        Collect Fee Button
    ========================================== */}

      <div className="text-end mt-4 mb-4">
        <button
          className="btn btn-success btn-lg"
          disabled={selectedIds.length === 0}
          onClick={handleCollectFee}
        >
          Collect Fee
        </button>
      </div>

      {/* ==========================================
        Receipt Success
    ========================================== */}

      {receipt && (
        <div className="card shadow border-success mb-5">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">Fee Collected Successfully</h5>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Receipt No</th>
                      <td>{receipt.receiptNo || "-"}</td>
                    </tr>

                    <tr>
                      <th>Admission No</th>
                      <td>{student.admissionNumber}</td>
                    </tr>

                    <tr>
                      <th>Student</th>
                      <td>
                        {student.firstName} {student.lastName}
                      </td>
                    </tr>

                    <tr>
                      <th>Payment Mode</th>
                      <td>{paymentMode}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-md-6">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Total Paid</th>
                      <td className="text-success fw-bold">
                        ₹ {totalAmount.toFixed(2)}
                      </td>
                    </tr>

                    <tr>
                      <th>Transaction Id</th>
                      <td>{transactionId || "-"}</td>
                    </tr>

                    <tr>
                      <th>Bank</th>
                      <td>{bankName || "-"}</td>
                    </tr>

                    <tr>
                      <th>Status</th>
                      <td>
                        <span className="badge bg-success">SUCCESS</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-end">
              <button
                className="btn btn-primary me-2"
                onClick={() =>
                  navigate(`/fee/feeledger/${student.admissionNumber}`)
                }
              >
                Go To Ledger
              </button>

              <button
                className="btn btn-success"
                onClick={() => window.print()}
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeeCollection;
