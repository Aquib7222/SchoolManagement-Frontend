import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaPrint } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import axiosInstance from "../../api/axiosInstance";

const Fee_LedgerDetails = () => {
  const { admissionNumber } = useParams();
  console.log("admission Number", admissionNumber);
  const navigate = useNavigate();

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
  // Ledger
  // ==========================================

  const [ledger, setLedger] = useState([]);

  // ==========================================
  // Receipt History
  // ==========================================

  const [receipts, setReceipts] = useState([]);

  // ==========================================
  // Summary
  // ==========================================

  const [summary, setSummary] = useState({
    totalFee: 0,
    paidAmount: 0,
    dueAmount: 0,
    fineAmount: 0,
    discountAmount: 0,
  });

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {
    // loadData();
    loadLedger();
    loadStudent();
    loadReceipts();
  }, []);

  // ==========================================
  // Load All Data
  // ==========================================

  //   const loadData = async () => {
  //     try {
  //       setLoading(true);

  //       await Promise.all([loadStudent(), loadLedger()]);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   console.log("load data",loadData);

  // ==========================================
  // Student
  // ==========================================

  const loadStudent = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/students/${admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStudent(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  console.log("Students ", student);

  // ==========================================
  // Fee Ledger
  // ==========================================

  const loadLedger = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/student-fee/schedule/${admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setLedger(res.data);

      calculateSummary(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  console.log("ledger", ledger);

  // ==========================================
  // Receipt History
  // ==========================================

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

  console.log("receipt", receipts);

  // ==========================================
  // Summary Calculation
  // ==========================================

  const calculateSummary = (data) => {
    const totalFee = data.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );

    const paidAmount = data.reduce(
      (sum, item) => sum + Number(item.paidAmount || 0),
      0,
    );

    const dueAmount = data.reduce(
      (sum, item) => sum + Number(item.dueAmount || 0),
      0,
    );

    const fineAmount = data.reduce(
      (sum, item) => sum + Number(item.fineAmount || 0),
      0,
    );

    const discountAmount = data.reduce(
      (sum, item) => sum + Number(item.discountAmount || 0),
      0,
    );

    setSummary({
      totalFee,
      paidAmount,
      dueAmount,
      fineAmount,
      discountAmount,
    });
  };

  // ==========================================
  // Loading Screen
  // ==========================================

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <h5 className="mt-3">Loading Fee Ledger...</h5>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center mt-5">
        <h4>Student Not Found</h4>
      </div>
    );
  }
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
            <strong>Fee Ledger</strong>
          </h4>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">Fee</li>
              <li className="breadcrumb-item active">Fee Ledger</li>
            </ol>
          </nav>
        </div>

        <div className="col-md-4 text-end">
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" />
            Back
          </button>

          <button className="btn btn-success" onClick={() => window.print()}>
            <FaPrint className="me-2" />
            Print
          </button>
        </div>
      </div>

      {/* ==========================================
      Student Details
  ========================================== */}

      <div className="container-fluid mt-3">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Student Information</h5>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-2 text-center">
                <img
                  src={student.studentImage}
                  alt=""
                  className="img-thumbnail"
                  style={{
                    width: "120px",
                    height: "120px",
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
                      <th>Fee Category</th>
                      <td>{student.feeCategory}</td>
                    </tr>

                    <tr>
                      <th>Fee Batch</th>
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
      </div>

      {/* ==========================================
      Summary Cards
  ========================================== */}

      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow border-0 bg-primary text-white">
              <div className="card-body text-center">
                <h6 className="mt-2">Total Fee</h6>

                <h4>₹ {summary.totalFee}</h4>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 bg-success text-white">
              <div className="card-body text-center">
                <h6 className="mt-2">Paid</h6>

                <h4>₹ {summary.paidAmount}</h4>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 bg-danger text-white">
              <div className="card-body text-center">
                <h6 className="mt-2">Due</h6>

                <h4>₹ {summary.dueAmount}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4">
            <div className="card shadow border-0 bg-warning">
              <div className="card-body text-center">
                <h6 className="mt-2">Fine</h6>

                <h4>₹ {summary.fineAmount}</h4>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 bg-info text-white">
              <div className="card-body text-center">
                <h6 className="mt-2">Discount</h6>

                <h4>₹ {summary.discountAmount}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
      Fee Ledger Table
  ========================================== */}

      <div className="container-fluid mt-4">
        <div className="card shadow">
          <div className="card-header bg-dark text-white">
            <h5 className="mb-0">Fee Ledger</h5>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th width="60">#</th>

                    <th>Month</th>

                    <th>Fee Code</th>

                    <th>Fee Name</th>

                    <th>Amount</th>

                    <th>Paid</th>

                    <th>Due</th>

                    <th>Status</th>

                    <th>Generate Date</th>

                    <th>Due Date</th>

                    <th>Payment Date</th>
                  </tr>
                </thead>

                <tbody>
                  {ledger.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="text-center text-danger">
                        No Fee Generated
                      </td>
                    </tr>
                  ) : (
                    ledger.map((fee, index) => (
                      <tr key={fee.id}>
                        <td>{index + 1}</td>

                        <td>{fee.month}</td>

                        <td>{fee.feeCode}</td>

                        <td>{fee.feeName}</td>

                        <td>₹ {Number(fee.amount).toFixed(2)}</td>

                        <td className="text-success fw-bold">
                          ₹ {Number(fee.paidAmount).toFixed(2)}
                        </td>

                        <td className="text-danger fw-bold">
                          ₹ {Number(fee.dueAmount).toFixed(2)}
                        </td>

                        <td>
                          <span
                            className={`badge ${
                              fee.status === "PAID"
                                ? "bg-success"
                                : fee.status === "PARTIAL"
                                  ? "bg-warning text-dark"
                                  : "bg-danger"
                            }`}
                          >
                            {fee.status}
                          </span>
                        </td>

                        <td>{fee.generateDate || "-"}</td>

                        <td>{fee.dueDate || "-"}</td>

                        <td>{fee.paymentDate || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>

                {ledger.length > 0 && (
                  <tfoot className="table-secondary">
                    <tr>
                      <th colSpan="4" className="text-end">
                        Grand Total
                      </th>

                      <th>₹ {summary.totalFee.toFixed(2)}</th>

                      <th className="text-success">
                        ₹ {summary.paidAmount.toFixed(2)}
                      </th>

                      <th className="text-danger">
                        ₹ {summary.dueAmount.toFixed(2)}
                      </th>

                      <th colSpan="4"></th>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Receipt History
      ========================================== */}

      <div className="container-fluid mt-4">
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
                            className="btn btn-sm btn-success"
                            onClick={() =>
                              window.open(
                                `/fee/receipt/print/${receipt.id}`,
                                "_blank",
                              )
                            }
                          >
                            Print
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

      {/* ==========================================
          Bottom Buttons
      ========================================== */}

      <div className="container-fluid mt-4 mb-5">
        <div className="row">
          <div className="col-md-3">
            <button
              className="btn btn-primary w-100"
              onClick={() =>
                navigate(`/fee/feecollection/${student.admissionNumber}`)
              }
            >
              Go To Fee Collection
            </button>
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-success w-100"
              onClick={() => window.print()}
            >
              Print Ledger
            </button>
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-warning w-100"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-danger w-100"
              onClick={() => navigate("/")}
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fee_LedgerDetails;
