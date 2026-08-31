

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

import {
  MdOutlineSchool,
  MdOutlineFormatListBulleted,
} from "react-icons/md";

import axiosInstance from "../../api/axiosInstance";

const Fee_LedgerDetails = () => {
  // =====================================================
  // USER / ADMISSION NUMBER FROM LOCAL STORAGE
  // =====================================================

  const user = JSON.parse(localStorage.getItem("user"));
  const admissionNumber = user?.admissionNumber;

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // =====================================================
  // STATE
  // =====================================================

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

  // =====================================================
  // LOAD ALL DATA
  // =====================================================

  useEffect(() => {
    if (!admissionNumber) {
      setLoading(false);
      return;
    }

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

  // =====================================================
  // LOAD STUDENT
  // =====================================================

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

  // =====================================================
  // LOAD LEDGER
  // =====================================================

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

      const data = Array.isArray(res.data)
        ? res.data
        : [];

      setLedger(data);
      calculateSummary(data);
    } catch (error) {
      console.log("Ledger Error:", error);

      setLedger([]);
      calculateSummary([]);
    }
  };

  // =====================================================
  // LOAD RECEIPTS
  // =====================================================

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

      const data = Array.isArray(res.data)
        ? res.data
        : [];

      const successReceipts = data.filter(
        (item) => item.status === "SUCCESS"
      );

      setReceipts(successReceipts);
    } catch (error) {
      console.log("Receipt Error:", error);
      setReceipts([]);
    }
  };

  // =====================================================
  // CALCULATE SUMMARY
  // =====================================================

  const calculateSummary = (data) => {
    const totalFee = data.reduce(
      (sum, item) =>
        sum + Number(item.amount || 0),
      0
    );

    const paidAmount = data.reduce(
      (sum, item) =>
        sum + Number(item.paidAmount || 0),
      0
    );

    const dueAmount = data.reduce(
      (sum, item) =>
        sum + Number(item.dueAmount || 0),
      0
    );

    const fineAmount = data.reduce(
      (sum, item) =>
        sum + Number(item.fineAmount || 0),
      0
    );

    const discountAmount = data.reduce(
      (sum, item) =>
        sum + Number(item.discountAmount || 0),
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

  // =====================================================
  // CURRENCY
  // =====================================================

  const currency = (value) => {
    return `₹ ${Number(value || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  // =====================================================
  // PRINT CURRENT PAGE
  // =====================================================

  const handlePrint = () => {
    window.print();
  };

  // =====================================================
  // DOWNLOAD RECEIPT PDF
  // =====================================================

  const handleDownloadReceipt = async (receipt) => {
    try {
      if (!receipt?.id) {
        console.error("Receipt ID not found");
        return;
      }

      const response = await axiosInstance.get(
        `/api/student-fee/payment/receipt/${receipt.id}/pdf`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `${receipt.receiptNo || "receipt"}.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Receipt PDF Download Error:",
        error
      );
    }
  };

  // =====================================================
  // PRINT RECEIPT
  // =====================================================

  const handlePrintReceipt = async (receipt) => {
    try {
      if (!receipt?.id) {
        console.error("Receipt ID not found");
        return;
      }

      /*
       * Receipt PDF API se PDF load karenge.
       * PDF ko new tab me open karenge.
       * User ke click ke baad hi print dialog open hoga.
       */

      const response = await axiosInstance.get(
        `/api/student-fee/payment/receipt/${receipt.id}/pdf`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      const printWindow =
        window.open(url, "_blank");

      if (!printWindow) {
        alert(
          "Print window blocked. Please allow pop-ups for this site."
        );

        window.URL.revokeObjectURL(url);
        return;
      }

      /*
       * PDF browser me load hone ke baad print dialog.
       */

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };

      /*
       * Kuch browsers PDF viewer ke saath
       * onload properly fire nahi karte.
       * Isliye fallback timeout.
       */

      setTimeout(() => {
        try {
          printWindow.focus();
          printWindow.print();
        } catch (error) {
          console.log(
            "Print fallback error:",
            error
          );
        }
      }, 1200);

    } catch (error) {
      console.error(
        "Receipt Print Error:",
        error
      );
    }
  };

  // =====================================================
  // STUDENT NAME
  // =====================================================

  const studentName = [
    student?.firstName,
    student?.middleName,
    student?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  // =====================================================
  // STUDENT PHOTO
  // =====================================================

  const studentPhoto = student?.photo
    ? `/api/documents/${student.photo}`
    : "/images/default-avatar.png";

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
        />

        <h6 className="mt-3 text-muted">
          Loading Fee Details...
        </h6>
      </div>
    );
  }

  // =====================================================
  // STUDENT NOT FOUND
  // =====================================================

  if (!student) {
    return (
      <div className="mx-2 mt-3">
        <div className="card border-0 shadow rounded-4">
          <div className="card-body text-center py-5">

            <FaUserGraduate
              size={45}
              className="text-muted mb-3"
            />

            <h5 className="fw-bold">
              Student Not Found
            </h5>

            <p className="text-muted mb-3">
              No student record found for admission
              number{" "}
              <strong>
                {admissionNumber}
              </strong>.
            </p>

            <button
              className="btn btn-secondary rounded-3 px-4"
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

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <style>
        {`
          .fee-page {
            padding-bottom: 20px;
          }

          /* ============================================
             PREMIUM STUDENT CARD
          ============================================ */

          .premium-student-card {
            position: relative;
            overflow: hidden;
            border: 1px solid #dbeafe;
            background:
              linear-gradient(
                135deg,
                #ffffff 0%,
                #f8fbff 55%,
                #eef6ff 100%
              );
          }

          .premium-student-card::before {
            content: "";
            position: absolute;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            right: -90px;
            top: -100px;
            background: #2563eb;
            opacity: .045;
          }

          .premium-student-card::after {
            content: "";
            position: absolute;
            width: 160px;
            height: 160px;
            border-radius: 50%;
            left: -90px;
            bottom: -100px;
            background: #60a5fa;
            opacity: .04;
          }

          .student-profile-wrapper {
            width: 135px;
            height: 135px;
            padding: 4px;
            border-radius: 22px;
            background:
              linear-gradient(
                135deg,
                #2563eb,
                #60a5fa
              );
            box-shadow:
              0 12px 30px
              rgba(37,99,235,.18);
          }

          .student-profile-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 18px;
            background: #fff;
          }

          .student-info-grid {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .student-detail-box {
            background: rgba(255,255,255,.8);
            border: 1px solid #e5edf7;
            border-radius: 12px;
            padding: 10px 12px;
            min-height: 58px;
          }

          .student-detail-box span {
            display: block;
            color: #7b8490;
            font-size: 10px;
            font-weight: 600;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: .25px;
          }

          .student-detail-box strong {
            display: block;
            color: #263244;
            font-size: 13px;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* ============================================
             PREMIUM TABLE
          ============================================ */

          .premium-fee-table {
            min-width: 1050px;
          }

          .premium-fee-table thead th {
            background:
              linear-gradient(
                90deg,
                #f8fbff,
                #f2f6fc
              );
            color: #64748b;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .35px;
            white-space: nowrap;
            padding: 14px 12px;
            border-bottom: 1px solid #e7edf5;
          }

          .premium-fee-table tbody td {
            padding: 14px 12px;
            font-size: 12px;
            color: #475569;
            border-bottom: 1px solid #f0f3f7;
            white-space: nowrap;
          }

          .premium-fee-table tbody tr {
            transition: all .2s ease;
          }

          .premium-fee-table tbody tr:hover {
            background: #f8fbff;
          }

          .premium-fee-table tfoot td,
          .premium-fee-table tfoot th {
            padding: 15px 12px;
            background: #f8fafc;
            border-top: 2px solid #e2e8f0;
          }

          .month-pill {
            display: inline-flex;
            align-items: center;
            padding: 6px 11px;
            border-radius: 50px;
            background: #eff6ff;
            color: #2563eb;
            font-size: 11px;
            font-weight: 700;
          }

          .amount-paid {
            display: inline-block;
            padding: 6px 9px;
            border-radius: 8px;
            background: #ecfdf5;
            color: #15803d;
            font-weight: 700;
          }

          .amount-due {
            display: inline-block;
            padding: 6px 9px;
            border-radius: 8px;
            background: #fff1f2;
            color: #dc2626;
            font-weight: 700;
          }

          /* ============================================
             RECEIPT
          ============================================ */

          .receipt-table {
            min-width: 950px;
          }

          .receipt-table thead th {
            background:
              linear-gradient(
                90deg,
                #f8fffb,
                #f2faf5
              );
            color: #64748b;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .35px;
            white-space: nowrap;
            padding: 14px 12px;
            border-bottom: 1px solid #e4eee7;
          }

          .receipt-table tbody td {
            padding: 14px 12px;
            font-size: 12px;
            border-bottom: 1px solid #eef2ef;
          }

          .receipt-table tbody tr {
            transition: all .2s ease;
          }

          .receipt-table tbody tr:hover {
            background: #f8fdf9;
          }

          .receipt-icon {
            width: 40px;
            height: 40px;
            border-radius: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ecfdf5;
            color: #16a34a;
          }

          .receipt-number {
            color: #2563eb;
            font-weight: 700;
            font-size: 12px;
          }

          .receipt-action {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            border-radius: 9px;
            padding: 7px 10px;
            font-size: 11px;
            font-weight: 600;
            transition: all .2s ease;
          }

          .receipt-action:hover {
            transform: translateY(-1px);
          }

          .view-receipt {
            color: #2563eb;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
          }

          .download-receipt {
            color: #15803d;
            background: #ecfdf5;
            border: 1px solid #bbf7d0;
          }

          .print-receipt {
            color: #7c3aed;
            background: #f5f3ff;
            border: 1px solid #ddd6fe;
          }

          /* ============================================
             EMPTY STATE
          ============================================ */

          .premium-empty-icon {
            width: 62px;
            height: 62px;
            border-radius: 50%;
            margin: 0 auto 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f1f5f9;
            color: #64748b;
          }

          /* ============================================
             HEADER
          ============================================ */

          .fee-page-header {
            background:
              linear-gradient(
                135deg,
                #ffffff 0%,
                #f5f9ff 60%,
                #eaf3ff 100%
              );
            border: 1px solid #dbeafe;
          }

          /* ============================================
             STAT CARDS
          ============================================ */

          .premium-stat-card {
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 18px;
            border-radius: 18px;
            background: #fff;
            border: 1px solid #edf1f5;
          }

          .premium-stat-card .stat-icon {
            width: 50px;
            height: 50px;
            min-width: 50px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
          }

          .premium-stat-card .stat-content span {
            display: block;
            color: #64748b;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
          }

          .premium-stat-card .stat-content h3 {
            margin: 4px 0;
            font-size: 20px;
            font-weight: 800;
            color: #1e293b;
          }

          .premium-stat-card .stat-content small {
            color: #94a3b8;
            font-size: 10px;
          }

          .stat-blue {
            border-top: 3px solid #2563eb;
          }

          .stat-blue .stat-icon {
            background: #eff6ff;
            color: #2563eb;
          }

          .stat-green {
            border-top: 3px solid #16a34a;
          }

          .stat-green .stat-icon {
            background: #ecfdf5;
            color: #16a34a;
          }

          .stat-red {
            border-top: 3px solid #dc2626;
          }

          .stat-red .stat-icon {
            background: #fef2f2;
            color: #dc2626;
          }

          .stat-orange {
            border-top: 3px solid #ea580c;
          }

          .stat-orange .stat-icon {
            background: #fff7ed;
            color: #ea580c;
          }

          /* ============================================
             MOBILE
          ============================================ */

          @media (max-width: 768px) {

            .student-info-grid {
              grid-template-columns: 1fr;
            }

            .student-profile-wrapper {
              width: 120px;
              height: 120px;
            }

            .student-detail-box {
              padding: 9px 11px;
            }

            .student-detail-box strong {
              font-size: 12px;
            }

          }

          @media (max-width: 576px) {

            .premium-student-card .card-body {
              padding: 18px 14px !important;
            }

            .fee-page-header .p-3 {
              padding: 14px !important;
            }

            .student-profile-wrapper {
              width: 110px;
              height: 110px;
              border-radius: 18px;
            }

            .student-profile-image {
              border-radius: 14px;
            }

            .receipt-action {
              padding: 6px 8px;
            }

          }

          /* ============================================
             PRINT
          ============================================ */

          @media print {

            body {
              background: #fff !important;
            }

            .no-print {
              display: none !important;
            }

            .card {
              box-shadow: none !important;
            }

            .premium-student-card,
            .print-card {
              border: 1px solid #ddd !important;
              box-shadow: none !important;
            }

            .container-fluid {
              width: 100% !important;
              max-width: 100% !important;
            }

            .premium-fee-table,
            .receipt-table {
              min-width: 100% !important;
            }

            .premium-fee-table thead th,
            .receipt-table thead th {
              font-size: 9px !important;
            }

            .premium-fee-table tbody td,
            .receipt-table tbody td {
              font-size: 9px !important;
              padding: 7px !important;
            }

            .student-profile-wrapper {
              width: 90px !important;
              height: 90px !important;
            }

          }
        `}
      </style>

      <div className="fee-page">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mx-2 mt-2 mb-3">
          <div className="rounded-4 shadow overflow-hidden fee-page-header">

            <div className="p-3 p-md-4">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

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
                    <FaFileInvoiceDollar size={25} />
                  </div>

                  <div>
                    <h5 className="mb-1 fw-bold text-dark">
                      My Fee
                    </h5>

                    <div className="text-muted small">
                      Fees / My Fee / Details
                    </div>
                  </div>

                </div>

                <div className="d-flex align-items-center gap-2 no-print">

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
                    Fee Details
                  </span>

                  <button
                    className="btn btn-outline-secondary btn-sm rounded-3"
                    onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft className="me-1" />
                    Back
                  </button>

                  <button
                    className="btn btn-primary btn-sm rounded-3"
                    onClick={handlePrint}
                  >
                    <FaPrint className="me-1" />
                    Print
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
                Home &nbsp;›&nbsp; Fees &nbsp;›&nbsp;
                <span className="text-primary fw-semibold">
                  My Fee
                </span>
              </small>
            </div>

          </div>
        </div>

        {/* =====================================================
            PREMIUM STUDENT INFORMATION
        ===================================================== */}

        <div className="px-2">

          <div
            className="card border-0 shadow rounded-4 mb-4 overflow-hidden premium-student-card"
          >

            <div
              className="px-3 px-md-4 py-3"
              style={{
                borderBottom:
                  "1px solid #e5edf8",
                background:
                  "rgba(255,255,255,.72)",
                position: "relative",
                zIndex: 2,
              }}
            >

              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      background:
                        "linear-gradient(135deg,#2563eb,#60a5fa)",
                      color: "#fff",
                      boxShadow:
                        "0 8px 20px rgba(37,99,235,.20)",
                    }}
                  >
                    <FaUserGraduate size={20} />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold">
                      Student Information
                    </h6>

                    <small className="text-muted">
                      Personal, academic & fee information
                    </small>

                  </div>

                </div>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#ecfdf5",
                    color: "#15803d",
                    border:
                      "1px solid #bbf7d0",
                  }}
                >
                  <span
                    className="d-inline-block rounded-circle me-1"
                    style={{
                      width: "7px",
                      height: "7px",
                      background: "#22c55e",
                    }}
                  />

                  {student.status || "ACTIVE"}
                </span>

              </div>

            </div>

            <div
              className="card-body p-3 p-md-4"
              style={{
                position: "relative",
                zIndex: 2,
              }}
            >

              <div className="row align-items-center g-4">

                <div className="col-lg-3 col-md-4">

                  <div className="text-center">

                    <div
                      className="student-profile-wrapper mx-auto"
                    >
                      <img
                        src={studentPhoto}
                        alt="Student"
                        className="student-profile-image"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/images/default-avatar.png";
                        }}
                      />
                    </div>

                    <h5 className="fw-bold mt-3 mb-1">
                      {studentName || "Student"}
                    </h5>

                    <div className="text-muted small">
                      {student.gender || "Student"}
                    </div>

                    <div className="mt-2">

                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          background: "#eff6ff",
                          color: "#2563eb",
                          border:
                            "1px solid #bfdbfe",
                        }}
                      >
                        {student.admissionNumber}
                      </span>

                    </div>

                  </div>

                </div>

                <div className="col-lg-4 col-md-4">

                  <div className="student-info-grid">

                    <div className="student-detail-box">
                      <span>
                        Admission No
                      </span>

                      <strong className="text-primary">
                        {student.admissionNumber || "-"}
                      </strong>
                    </div>

                    <div className="student-detail-box">
                      <span>
                        Roll Number
                      </span>

                      <strong>
                        {student.rollNumber || "-"}
                      </strong>
                    </div>

                    <div className="student-detail-box">
                      <span>
                        Class
                      </span>

                      <strong>
                        {student.studentClass || "-"}
                      </strong>
                    </div>

                    <div className="student-detail-box">
                      <span>
                        Section
                      </span>

                      <strong>
                        {student.section || "-"}
                      </strong>
                    </div>

                    <div className="student-detail-box">
                      <span>
                        Academic Year
                      </span>

                      <strong>
                        {student.academicYear || "-"}
                      </strong>
                    </div>

                    <div className="student-detail-box">
                      <span>
                        Mobile
                      </span>

                      <strong>
                        {student.mobile ||
                          student.fatherMobile ||
                          "-"}
                      </strong>
                    </div>

                  </div>

                </div>

                <div className="col-lg-5 col-md-4">

                  <div className="student-info-grid">

                    <div className="student-detail-box">
                      <span>
                        Fee Category
                      </span>

                      <strong>
                        {student.feeCategory || "-"}
                      </strong>
                    </div>

                    <div className="student-detail-box">
                      <span>
                        Fee Batch
                      </span>

                      <strong>
                        {student.feeBatch || "-"}
                      </strong>
                    </div>

                    <div className="student-detail-box">
                      <span>
                        Father Name
                      </span>

                      <strong>
                        {student.fatherName || "-"}
                      </strong>
                    </div>

                    <div className="student-detail-box">
                      <span>
                        Father Mobile
                      </span>

                      <strong>
                        {student.fatherMobile || "-"}
                      </strong>
                    </div>

                    <div className="student-detail-box">
                      <span>
                        Email
                      </span>

                      <strong
                        title={
                          student.email ||
                          student.fatherEmail ||
                          "-"
                        }
                      >
                        {student.email ||
                          student.fatherEmail ||
                          "-"}
                      </strong>
                    </div>

                    <div className="student-detail-box">
                      <span>
                        Status
                      </span>

                      <strong
                        style={{
                          color: "#15803d",
                        }}
                      >
                        {student.status || "ACTIVE"}
                      </strong>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <div className="row g-3 mb-4 px-2">

          <div className="col-xl col-lg-4 col-md-6">
            <div className="premium-stat-card stat-blue h-100 shadow">

              <div className="stat-icon">
                <FaFileInvoiceDollar />
              </div>

              <div className="stat-content">

                <span>Total Fee</span>

                <h3>
                  {currency(summary.totalFee)}
                </h3>

                <small>
                  Total generated fee
                </small>

              </div>

            </div>
          </div>

          <div className="col-xl col-lg-4 col-md-6">
            <div className="premium-stat-card stat-green h-100 shadow">

              <div className="stat-icon">
                <FaMoneyBillWave />
              </div>

              <div className="stat-content">

                <span>Paid Amount</span>

                <h3>
                  {currency(summary.paidAmount)}
                </h3>

                <small>
                  Total amount received
                </small>

              </div>

            </div>
          </div>

          <div className="col-xl col-lg-4 col-md-6">
            <div className="premium-stat-card stat-red h-100 shadow">

              <div className="stat-icon">
                <FaExclamationCircle />
              </div>

              <div className="stat-content">

                <span>Due Amount</span>

                <h3>
                  {currency(summary.dueAmount)}
                </h3>

                <small>
                  Outstanding amount
                </small>

              </div>

            </div>
          </div>

          <div className="col-xl col-lg-4 col-md-6">
            <div className="premium-stat-card stat-orange h-100 shadow">

              <div className="stat-icon">
                <FaExclamationCircle />
              </div>

              <div className="stat-content">

                <span>Fine</span>

                <h3>
                  {currency(summary.fineAmount)}
                </h3>

                <small>
                  Total fine amount
                </small>

              </div>

            </div>
          </div>

          <div className="col-xl col-lg-4 col-md-6">
            <div className="premium-stat-card stat-blue h-100 shadow">

              <div className="stat-icon">
                <FaPercentage />
              </div>

              <div className="stat-content">

                <span>Discount</span>

                <h3>
                  {currency(summary.discountAmount)}
                </h3>

                <small>
                  Total discount
                </small>

              </div>

            </div>
          </div>

        </div>

        {/* =====================================================
            PREMIUM FEE LEDGER
        ===================================================== */}

        <div className="px-2">

          <div className="card border-0 shadow rounded-4 mb-4 overflow-hidden print-card">

            <div
              className="card-header bg-white border-0 py-3 px-3 px-md-4"
            >

              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      background:
                        "linear-gradient(135deg,#2563eb,#60a5fa)",
                      color: "#fff",
                      boxShadow:
                        "0 8px 20px rgba(37,99,235,.20)",
                    }}
                  >
                    <MdOutlineFormatListBulleted
                      size={21}
                    />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold">
                      Fee Ledger
                    </h6>

                    <small className="text-muted">
                      Complete fee schedule & payment status
                    </small>

                  </div>

                </div>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#eff6ff",
                    color: "#2563eb",
                    border:
                      "1px solid #bfdbfe",
                  }}
                >
                  {ledger.length} Records
                </span>

              </div>

            </div>

            <div className="card-body p-0">

              <div className="table-responsive">

                <table className="table premium-fee-table align-middle mb-0">

                  <thead>
                    <tr>

                      <th className="text-center">
                        #
                      </th>

                      <th>
                        Month
                      </th>

                      <th>
                        Fee
                      </th>

                      <th className="text-end">
                        Amount
                      </th>

                      <th className="text-end">
                        Paid
                      </th>

                      <th className="text-end">
                        Due
                      </th>

                      <th className="text-center">
                        Status
                      </th>

                      <th>
                        Generated
                      </th>

                      <th>
                        Due Date
                      </th>

                      <th>
                        Payment Date
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {ledger.length === 0 ? (

                      <tr>

                        <td colSpan="10">

                          <div className="text-center py-5">

                            <div className="premium-empty-icon">
                              <FaExclamationCircle
                                size={25}
                              />
                            </div>

                            <h6 className="fw-bold text-danger">
                              No Fee Generated
                            </h6>

                            <small className="text-muted">
                              No fee schedule found
                              for this student.
                            </small>

                          </div>

                        </td>

                      </tr>

                    ) : (

                      ledger.map((fee, index) => (

                        <tr key={fee.id || index}>

                          <td className="text-center fw-semibold text-muted">
                            {index + 1}
                          </td>

                          <td>
                            <span className="month-pill">
                              {fee.month || "-"}
                            </span>
                          </td>

                          <td>

                            <div className="fw-bold text-dark">
                              {fee.feeName || "-"}
                            </div>

                            <small className="text-primary">
                              {fee.feeCode || ""}
                            </small>

                          </td>

                          <td className="text-end fw-bold text-dark">
                            {currency(fee.amount)}
                          </td>

                          <td className="text-end">

                            <span className="amount-paid">
                              {currency(
                                fee.paidAmount
                              )}
                            </span>

                          </td>

                          <td className="text-end">

                            <span className="amount-due">
                              {currency(
                                fee.dueAmount
                              )}
                            </span>

                          </td>

                          <td className="text-center">

                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                background:
                                  fee.status === "PAID"
                                    ? "#dcfce7"
                                    : fee.status === "PARTIAL"
                                    ? "#fef3c7"
                                    : "#fee2e2",

                                color:
                                  fee.status === "PAID"
                                    ? "#15803d"
                                    : fee.status === "PARTIAL"
                                    ? "#a16207"
                                    : "#dc2626",
                              }}
                            >
                              {fee.status || "DUE"}
                            </span>

                          </td>

                          <td className="text-muted small">
                            {fee.generateDate || "-"}
                          </td>

                          <td className="text-muted small">
                            {fee.dueDate || "-"}
                          </td>

                          <td className="text-muted small">
                            {fee.paymentDate || "-"}
                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                  {ledger.length > 0 && (

                    <tfoot>

                      <tr>

                        <th
                          colSpan="3"
                          className="text-end"
                        >
                          Grand Total
                        </th>

                        <th className="text-end fw-bold">
                          {currency(
                            summary.totalFee
                          )}
                        </th>

                        <th className="text-end text-success fw-bold">
                          {currency(
                            summary.paidAmount
                          )}
                        </th>

                        <th className="text-end text-danger fw-bold">
                          {currency(
                            summary.dueAmount
                          )}
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

        {/* =====================================================
            PREMIUM RECEIPT HISTORY
        ===================================================== */}

        <div className="px-2">

          <div className="card border-0 shadow rounded-4 mb-4 overflow-hidden print-card">

            <div
              className="card-header bg-white border-0 py-3 px-3 px-md-4"
            >

              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      background:
                        "linear-gradient(135deg,#16a34a,#4ade80)",
                      color: "#fff",
                      boxShadow:
                        "0 8px 20px rgba(22,163,74,.18)",
                    }}
                  >
                    <FaReceipt size={20} />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold">
                      Payment Receipts
                    </h6>

                    <small className="text-muted">
                      Your successful payment history
                    </small>

                  </div>

                </div>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#ecfdf5",
                    color: "#15803d",
                    border:
                      "1px solid #bbf7d0",
                  }}
                >
                  {receipts.length} Receipts
                </span>

              </div>

            </div>

            <div className="card-body p-0">

              <div className="table-responsive">

                <table className="table receipt-table align-middle mb-0">

                  <thead>

                    <tr>

                      <th className="text-center">
                        #
                      </th>

                      <th>
                        Receipt
                      </th>

                      <th>
                        Month
                      </th>

                      <th>
                        Payment Mode
                      </th>

                      <th>
                        Transaction ID
                      </th>

                      <th>
                        Paid Date
                      </th>

                      <th className="text-end">
                        Amount
                      </th>

                      <th className="text-center">
                        Status
                      </th>

                      <th className="text-center no-print">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {receipts.length === 0 ? (

                      <tr>

                        <td colSpan="9">

                          <div className="text-center py-5">

                            <div className="premium-empty-icon">
                              <FaReceipt size={25} />
                            </div>

                            <h6 className="fw-bold">
                              No Receipt Found
                            </h6>

                            <small className="text-muted">
                              No successful payment
                              receipt found.
                            </small>

                          </div>

                        </td>

                      </tr>

                    ) : (

                      receipts.map(
                        (receipt, index) => (

                          <tr
                            key={
                              receipt.id ||
                              index
                            }
                          >

                            <td className="text-center fw-semibold text-muted">
                              {index + 1}
                            </td>

                            <td>

                              <div className="d-flex align-items-center gap-2">

                                <div className="receipt-icon">
                                  <FaReceipt />
                                </div>

                                <div>

                                  <div className="receipt-number">
                                    {receipt.receiptNo ||
                                      "-"}
                                  </div>

                                  <small className="text-muted">
                                    Payment Receipt
                                  </small>

                                </div>

                              </div>

                            </td>

                            <td>

                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  background:
                                    "#f1f5f9",
                                  color:
                                    "#475569",
                                }}
                              >
                                {receipt.month ||
                                  "-"}
                              </span>

                            </td>

                            <td>
                              {receipt.paymentMode ||
                                "-"}
                            </td>

                            <td>

                              <span className="text-muted small">
                                {receipt.transactionId ||
                                  "-"}
                              </span>

                            </td>

                            <td className="text-muted small">
                              {receipt.paymentDate ||
                                "-"}
                            </td>

                            <td className="text-end">

                              <span
                                className="fw-bold px-3 py-2 rounded-3"
                                style={{
                                  background:
                                    "#ecfdf5",
                                  color:
                                    "#15803d",
                                }}
                              >
                                {currency(
                                  receipt.amount
                                )}
                              </span>

                            </td>

                            <td className="text-center">

                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  background:
                                    "#dcfce7",
                                  color:
                                    "#15803d",
                                }}
                              >
                                ✓ PAID
                              </span>

                            </td>

                            {/* =================================================
                                ACTION BUTTONS
                            ================================================= */}

                            <td className="text-center no-print">

                              <div className="d-flex justify-content-center gap-2">

                                {/* VIEW */}

                                <button
                                  type="button"
                                  className="receipt-action view-receipt"
                                  title="View Receipt"
                                  onClick={() =>
                                    navigate(
                                      `/fee/receipt/${receipt.receiptNo}`
                                    )
                                  }
                                >
                                  <FaEye />
                                  View
                                </button>

                                {/* DOWNLOAD PDF */}

                                <button
                                  type="button"
                                  className="receipt-action download-receipt"
                                  title="Download PDF"
                                  onClick={() =>
                                    handleDownloadReceipt(
                                      receipt
                                    )
                                  }
                                >
                                  <FaFilePdf />
                                  Download
                                </button>

                                {/* PRINT */}

                                <button
                                  type="button"
                                  className="receipt-action print-receipt"
                                  title="Print Receipt"
                                  onClick={() =>
                                    handlePrintReceipt(
                                      receipt
                                    )
                                  }
                                >
                                  <FaPrint />
                                  Print
                                </button>

                              </div>

                            </td>

                          </tr>

                        )
                      )

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM ACTIONS
        ===================================================== */}

        <div className="px-2">

          <div className="card border-0 shadow rounded-4 mb-5 no-print">

            <div className="card-body p-3">

              <div className="row g-2">

                <div className="col-lg-3 col-md-6">

                  <button
                    className="btn btn-primary w-100 rounded-3"
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
                    className="btn btn-success w-100 rounded-3"
                    onClick={handlePrint}
                  >
                    <FaPrint className="me-2" />
                    Print Ledger
                  </button>

                </div>

                <div className="col-lg-3 col-md-6">

                  <button
                    className="btn btn-outline-secondary w-100 rounded-3"
                    onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft className="me-2" />
                    Back
                  </button>

                </div>

                <div className="col-lg-3 col-md-6">

                  <button
                    className="btn btn-outline-danger w-100 rounded-3"
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

      </div>
    </>
  );
};

export default Fee_LedgerDetails;

