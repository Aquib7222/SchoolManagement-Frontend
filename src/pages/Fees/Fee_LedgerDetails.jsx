
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaPrint,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaExclamationCircle,
  FaPercentage,
  FaReceipt,
  FaEye,
  FaFilePdf,
  FaUserGraduate,
} from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const Fee_LedgerDetails = () => {
  const { admissionNumber } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ==========================================
  // States
  // ==========================================

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [ledger, setLedger] = useState([]);
  const [receipts, setReceipts] = useState([]);

  const [summary, setSummary] = useState({
    totalFee: 0,
    paidAmount: 0,
    dueAmount: 0,
    fineAmount: 0,
    discountAmount: 0,
  });

  // ==========================================
  // Load All Data
  // ==========================================

  useEffect(() => {
    if (!admissionNumber) return;

    loadData();
  }, [admissionNumber]);

  const loadData = async () => {
    setLoading(true);

    try {
      await Promise.all([
        loadStudent(),
        loadLedger(),
        loadReceipts(),
      ]);
    } catch (error) {
      console.log("Fee Ledger Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Load Student
  // ==========================================

  const loadStudent = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/students/${admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudent(res.data);
    } catch (error) {
      console.log("Student Error:", error);
      setStudent(null);
    }
  };

  // ==========================================
  // Load Fee Ledger
  // ==========================================

  const loadLedger = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/student-fee/schedule/${admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = Array.isArray(res.data) ? res.data : [];

      setLedger(data);
      calculateSummary(data);
    } catch (error) {
      console.log("Ledger Error:", error);

      setLedger([]);
      calculateSummary([]);
    }
  };

  // ==========================================
  // Load Receipt History
  // ==========================================

  const loadReceipts = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/student-fee/payment/history/${admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = Array.isArray(res.data) ? res.data : [];

      const successReceipts = data.filter(
        (item) => item.status === "SUCCESS"
      );

      setReceipts(successReceipts);
    } catch (error) {
      console.log("Receipt Error:", error);
      setReceipts([]);
    }
  };

  // ==========================================
  // Summary Calculation
  // ==========================================

  const calculateSummary = (data) => {
    const totalFee = data.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const paidAmount = data.reduce(
      (sum, item) => sum + Number(item.paidAmount || 0),
      0
    );

    const dueAmount = data.reduce(
      (sum, item) => sum + Number(item.dueAmount || 0),
      0
    );

    const fineAmount = data.reduce(
      (sum, item) => sum + Number(item.fineAmount || 0),
      0
    );

    const discountAmount = data.reduce(
      (sum, item) => sum + Number(item.discountAmount || 0),
      0
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
  // Currency
  // ==========================================

  const currency = (value) => {
    return `₹ ${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // ==========================================
  // Print
  // ==========================================

  const handlePrint = () => {
    window.print();
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status"></div>

        <h6 className="mt-3 text-muted">
          Loading Fee Ledger...
        </h6>
      </div>
    );
  }

  // ==========================================
  // Student Not Found
  // ==========================================

  if (!student) {
    return (
      <div className="container-fluid mt-4">
        <div className="card shadow border-0">
          <div className="card-body text-center py-5">
            <FaUserGraduate
              size={45}
              className="text-muted mb-3"
            />

            <h5>Student Not Found</h5>

            <p className="text-muted mb-3">
              No student record found for admission number{" "}
              <strong>{admissionNumber}</strong>.
            </p>

            <button
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft className="me-2" />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ==========================================
          Print CSS
      ========================================== */}

      <style>
        {`
          @media print {
            body {
              background: #fff !important;
            }

            .no-print {
              display: none !important;
            }

            .print-card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }

            .container-fluid {
              width: 100% !important;
              max-width: 100% !important;
            }

            .table {
              font-size: 11px !important;
            }

            .student-image {
              width: 80px !important;
              height: 80px !important;
            }
          }
        `}
      </style>

      {/* ==========================================
          Header
      ========================================== */}

      <div className="container-fluid">
        <div className="card shadow border-0 mb-3 no-print">
          <div className="card-body p-3">
            <div className="row align-items-center">
              <div className="col-md-7">
                <h5 className="mb-1 fw-semibold">
                  Fee Ledger Details
                </h5>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      Home
                    </li>

                    <li className="breadcrumb-item">
                      Fee
                    </li>

                    <li className="breadcrumb-item active">
                      Fee Ledger
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="col-md-5 text-md-end mt-3 mt-md-0">
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeft className="me-1" />
                  Back
                </button>

                <button
                  className="btn btn-success btn-sm"
                  onClick={handlePrint}
                >
                  <FaPrint className="me-1" />
                  Print Ledger
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            Student Information
        ========================================== */}

        <div className="card shadow border-0 mb-4 print-card">
          <div className="card-header bg-primary text-white">
            <div className="d-flex align-items-center">
              <FaUserGraduate className="me-2" />

              <h6 className="mb-0">
                Student Information
              </h6>
            </div>
          </div>

          <div className="card-body">
            <div className="row align-items-center">
              {/* Image */}

              <div className="col-lg-2 col-md-3 text-center mb-3 mb-md-0">
                <img
                  src={
                    student.studentImage ||
                    "/images/default-avatar.png"
                  }
                  alt="Student"
                  className="img-thumbnail student-image"
                  style={{
                    width: "125px",
                    height: "125px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* Basic Details */}

              <div className="col-lg-5 col-md-5">
                <table className="table table-borderless table-sm mb-0">
                  <tbody>
                    <tr>
                      <th style={{ width: "140px" }}>
                        Name
                      </th>

                      <td>
                        {student.firstName}{" "}
                        {student.lastName}
                      </td>
                    </tr>

                    <tr>
                      <th>Admission No</th>

                      <td className="fw-semibold">
                        {student.admissionNumber}
                      </td>
                    </tr>

                    <tr>
                      <th>Class</th>

                      <td>
                        {student.studentClass || "-"}
                        {" / "}
                        {student.section || "-"}
                      </td>
                    </tr>

                    <tr>
                      <th>Session</th>

                      <td>
                        {student.academicYear || "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Fee Details */}

              <div className="col-lg-5 col-md-4">
                <table className="table table-borderless table-sm mb-0">
                  <tbody>
                    <tr>
                      <th style={{ width: "140px" }}>
                        Mobile
                      </th>

                      <td>
                        {student.mobile || "-"}
                      </td>
                    </tr>

                    <tr>
                      <th>Fee Category</th>

                      <td>
                        {student.feeCategory || "-"}
                      </td>
                    </tr>

                    <tr>
                      <th>Fee Batch</th>

                      <td>
                        {student.feeBatch || "-"}
                      </td>
                    </tr>

                    <tr>
                      <th>Status</th>

                      <td>
                        <span className="badge bg-success">
                          ACTIVE
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            Summary Cards
        ========================================== */}

        <div className="row g-3 mb-4">
          {/* Total */}

          <div className="col-xl col-lg-4 col-md-6">
            <div className="card shadow border-0 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <small className="text-muted">
                      Total Fee
                    </small>

                    <h5 className="fw-bold mt-2 mb-0">
                      {currency(summary.totalFee)}
                    </h5>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                    style={{
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <FaFileInvoiceDollar />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Paid */}

          <div className="col-xl col-lg-4 col-md-6">
            <div className="card shadow border-0 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <small className="text-muted">
                      Paid Amount
                    </small>

                    <h5 className="fw-bold text-success mt-2 mb-0">
                      {currency(summary.paidAmount)}
                    </h5>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white"
                    style={{
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <FaMoneyBillWave />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Due */}

          <div className="col-xl col-lg-4 col-md-6">
            <div className="card shadow border-0 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <small className="text-muted">
                      Due Amount
                    </small>

                    <h5 className="fw-bold text-danger mt-2 mb-0">
                      {currency(summary.dueAmount)}
                    </h5>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-danger text-white"
                    style={{
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <FaExclamationCircle />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fine */}

          <div className="col-xl col-lg-4 col-md-6">
            <div className="card shadow border-0 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <small className="text-muted">
                      Fine
                    </small>

                    <h5 className="fw-bold text-warning mt-2 mb-0">
                      {currency(summary.fineAmount)}
                    </h5>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-warning text-dark"
                    style={{
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <FaExclamationCircle />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Discount */}

          <div className="col-xl col-lg-4 col-md-6">
            <div className="card shadow border-0 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <small className="text-muted">
                      Discount
                    </small>

                    <h5 className="fw-bold text-info mt-2 mb-0">
                      {currency(summary.discountAmount)}
                    </h5>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-info text-white"
                    style={{
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <FaPercentage />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            Fee Ledger
        ========================================== */}

        <div className="card shadow border-0 mb-4 print-card">
          <div className="card-header bg-dark text-white">
            <div className="d-flex align-items-center">
              <FaFileInvoiceDollar className="me-2" />

              <h6 className="mb-0">
                Fee Ledger
              </h6>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center mb-0">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
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
                      <td
                        colSpan="11"
                        className="text-center py-4 text-danger"
                      >
                        <FaExclamationCircle className="me-2" />
                        No Fee Generated
                      </td>
                    </tr>
                  ) : (
                    ledger.map((fee, index) => (
                      <tr key={fee.id || index}>
                        <td>{index + 1}</td>

                        <td>
                          {fee.month || "-"}
                        </td>

                        <td>
                          {fee.feeCode || "-"}
                        </td>

                        <td className="text-start">
                          {fee.feeName || "-"}
                        </td>

                        <td className="fw-semibold">
                          {currency(fee.amount)}
                        </td>

                        <td className="text-success fw-bold">
                          {currency(fee.paidAmount)}
                        </td>

                        <td className="text-danger fw-bold">
                          {currency(fee.dueAmount)}
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
                            {fee.status || "DUE"}
                          </span>
                        </td>

                        <td>
                          {fee.generateDate || "-"}
                        </td>

                        <td>
                          {fee.dueDate || "-"}
                        </td>

                        <td>
                          {fee.paymentDate || "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

                {ledger.length > 0 && (
                  <tfoot className="table-secondary">
                    <tr>
                      <th
                        colSpan="4"
                        className="text-end"
                      >
                        Grand Total
                      </th>

                      <th>
                        {currency(summary.totalFee)}
                      </th>

                      <th className="text-success">
                        {currency(summary.paidAmount)}
                      </th>

                      <th className="text-danger">
                        {currency(summary.dueAmount)}
                      </th>

                      <th colSpan="4"></th>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>

        {/* ==========================================
            Receipt History
        ========================================== */}

        <div className="card shadow border-0 mb-4 print-card">
          <div className="card-header bg-success text-white">
            <div className="d-flex align-items-center">
              <FaReceipt className="me-2" />

              <h6 className="mb-0">
                Receipt History
              </h6>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center mb-0">
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
                    <th className="no-print">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {receipts.length === 0 ? (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center py-4 text-danger"
                      >
                        <FaReceipt className="me-2" />
                        No Receipt Found
                      </td>
                    </tr>
                  ) : (
                    receipts.map((receipt, index) => (
                      <tr key={receipt.id || index}>
                        <td>{index + 1}</td>

                        <td className="fw-semibold">
                          {receipt.receiptNo || "-"}
                        </td>

                        <td>
                          {receipt.month || "-"}
                        </td>

                        <td>
                          {receipt.paymentMode || "-"}
                        </td>

                        <td>
                          {receipt.transactionId || "-"}
                        </td>

                        <td>
                          {receipt.collectedBy || "-"}
                        </td>

                        <td>
                          {receipt.paymentDate || "-"}
                        </td>

                        <td className="fw-bold text-success">
                          {currency(receipt.amount)}
                        </td>

                        <td>
                          <span className="badge bg-success">
                            PAID
                          </span>
                        </td>

                        <td className="no-print">
                          <button
                            className="btn btn-sm btn-primary me-2"
                            title="View Receipt"
                            onClick={() =>
                              navigate(
                                `/fee/receipt/${receipt.receiptNo}`
                              )
                            }
                          >
                            <FaEye className="me-1" />
                            View
                          </button>

                          <button
                            className="btn btn-sm btn-success"
                            title="Print Receipt"
                            onClick={() =>
                              window.open(
                                `/fee/receipt/print/${receipt.id}`,
                                "_blank"
                              )
                            }
                          >
                            <FaPrint className="me-1" />
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

        {/* ==========================================
            Bottom Actions
        ========================================== */}

        <div className="card shadow border-0 mb-5 no-print">
          <div className="card-body">
            <div className="row g-2">
              <div className="col-lg-3 col-md-6">
                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    navigate(
                      `/fee/feecollection/${student.admissionNumber}`
                    )
                  }
                >
                  <FaMoneyBillWave className="me-2" />
                  Fee Collection
                </button>
              </div>

              <div className="col-lg-3 col-md-6">
                <button
                  className="btn btn-success w-100"
                  onClick={handlePrint}
                >
                  <FaPrint className="me-2" />
                  Print Ledger
                </button>
              </div>

              <div className="col-lg-3 col-md-6">
                <button
                  className="btn btn-warning w-100"
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeft className="me-2" />
                  Back
                </button>
              </div>

              <div className="col-lg-3 col-md-6">
                <button
                  className="btn btn-danger w-100"
                  onClick={() => navigate("/")}
                >
                  <FaFilePdf className="me-2" />
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fee_LedgerDetails;

