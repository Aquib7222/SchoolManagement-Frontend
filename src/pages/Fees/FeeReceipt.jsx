
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  FaArrowLeft,
  FaDownload,
  FaPrint,
  FaTrash,
  FaReceipt,
  FaUniversity,
  FaUserGraduate,
  FaCalendarAlt,
  FaCreditCard,
} from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const FeeReceipt = () => {
  const { receiptNo } = useParams();
  const receiptRef = useRef();
  const navigate = useNavigate();

  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadReceipt();
  }, [receiptNo]);

  const loadReceipt = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/api/student-fee/payment/receipt/${receiptNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setReceipt(res.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load receipt");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReceipt = async () => {
    if (!window.confirm("Are you sure you want to delete this receipt?")) {
      return;
    }

    try {
      setDeleting(true);

      await axiosInstance.delete(
        `/api/student-fee/payment/receipt/${receiptNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Receipt Deleted Successfully");
      navigate("/fee/feeledger");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Unable to delete receipt",
      );
    } finally {
      setDeleting(false);
    }
  };

  const printReceipt = () => {
    window.print();
  };

  const downloadPDF = async () => {
    try {
      const element = receiptRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 8;
      const width = pageWidth - margin * 2;
      const height = (canvas.height * width) / canvas.width;

      if (height <= pageHeight - margin * 2) {
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin,
          width,
          height,
        );
      } else {
        const scaledHeight = pageHeight - margin * 2;

        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin,
          width,
          scaledHeight,
        );
      }

      pdf.save(`${receipt.receiptNo}.pdf`);
    } catch (error) {
      console.log(error);
      alert("Unable to generate PDF");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
        ></div>

        <h5 className="mt-3">Loading Receipt...</h5>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="text-center mt-5">
        <h4 className="text-danger">Receipt Not Found</h4>

        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Back
        </button>
      </div>
    );
  }

  const formattedDateTime = receipt.paymentTime
    ? new Date(receipt.paymentTime).toLocaleString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "-";

  const school = user?.school;

  return (
    <>
      <style>
        {`
          .receipt-page {
            background: #f4f7fb;
            min-height: 100vh;
            padding: 25px 15px 50px;
          }

          .receipt-toolbar {
            max-width: 1000px;
            margin: 0 auto 20px;
          }

          .premium-receipt {
            max-width: 1000px;
            margin: auto;
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #e3e8ef;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          }

          .receipt-top-border {
            height: 6px;
            background: #0d6efd;
          }

          .receipt-header {
            padding: 28px 35px 22px;
            border-bottom: 1px solid #e9ecef;
          }

          .school-logo {
            width: 72px;
            height: 72px;
            object-fit: contain;
            border-radius: 10px;
            border: 1px solid #dee2e6;
            padding: 5px;
            background: #fff;
          }

          .school-name {
            font-size: 25px;
            font-weight: 700;
            color: #172033;
            margin-bottom: 4px;
          }

          .school-address {
            color: #6c757d;
            font-size: 14px;
            margin-bottom: 0;
          }

          .receipt-title {
            color: #0d6efd;
            font-weight: 800;
            letter-spacing: 1px;
            font-size: 19px;
          }

          .receipt-number {
            display: inline-block;
            background: #eef5ff;
            color: #0d6efd;
            border: 1px solid #cfe2ff;
            padding: 7px 13px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 13px;
          }

          .info-section {
            padding: 22px 35px;
          }

          .info-box {
            background: #f8faff;
            border: 1px solid #e4ebf5;
            border-radius: 8px;
            padding: 17px;
            height: 100%;
          }

          .section-title {
            color: #172033;
            font-size: 15px;
            font-weight: 700;
            border-bottom: 1px solid #e5eaf1;
            padding-bottom: 10px;
            margin-bottom: 12px;
          }

          .info-row {
            display: flex;
            justify-content: space-between;
            gap: 15px;
            padding: 5px 0;
            font-size: 13px;
          }

          .info-label {
            color: #6c757d;
            font-weight: 600;
          }

          .info-value {
            color: #172033;
            font-weight: 600;
            text-align: right;
          }

          .payment-badge {
            background: #e8f7ee;
            color: #198754;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
          }

          .fee-section {
            padding: 0 35px 22px;
          }

          .fee-table {
            margin-bottom: 0;
          }

          .fee-table thead th {
            background: #0d6efd;
            color: #fff;
            border-color: #0d6efd;
            font-size: 13px;
            padding: 11px;
          }

          .fee-table tbody td {
            font-size: 13px;
            padding: 10px;
            vertical-align: middle;
          }

          .summary-wrapper {
            padding: 0 35px 25px;
          }

          .summary-card {
            max-width: 430px;
            margin-left: auto;
            border: 1px solid #e1e7ef;
            border-radius: 8px;
            overflow: hidden;
          }

          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 9px 14px;
            font-size: 13px;
            border-bottom: 1px solid #edf0f4;
          }

          .summary-row:last-child {
            border-bottom: none;
          }

          .summary-total {
            background: #f1f6ff;
            color: #0d6efd;
            font-weight: 700;
          }

          .summary-paid {
            color: #198754;
            font-weight: 700;
          }

          .summary-balance {
            background: #fff4f4;
            color: #dc3545;
            font-weight: 700;
          }

          .receipt-footer {
            padding: 22px 35px 28px;
            border-top: 1px dashed #ced4da;
          }

          .thank-you {
            color: #6c757d;
            font-size: 12px;
          }

          .signature {
            text-align: center;
            min-width: 190px;
            font-size: 12px;
            color: #343a40;
          }

          .signature-line {
            border-top: 1px solid #343a40;
            margin-bottom: 6px;
          }

          @media print {
            body {
              background: #fff !important;
            }

            .no-print {
              display: none !important;
            }

            .receipt-page {
              padding: 0;
              background: #fff;
            }

            .premium-receipt {
              box-shadow: none;
              border: none;
              border-radius: 0;
              max-width: 100%;
            }

            .receipt-top-border {
              height: 4px;
            }

            @page {
              size: A4;
              margin: 8mm;
            }
          }

          @media (max-width: 768px) {
            .receipt-header,
            .info-section,
            .fee-section,
            .summary-wrapper,
            .receipt-footer {
              padding-left: 18px;
              padding-right: 18px;
            }

            .school-name {
              font-size: 20px;
            }

            .school-logo {
              width: 60px;
              height: 60px;
            }

            .summary-card {
              max-width: 100%;
            }
          }
        `}
      </style>

      <div className="receipt-page">
        <div className="receipt-toolbar no-print">
          <div className="d-flex justify-content-end gap-2 flex-wrap">
            <button
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft className="me-2" />
              Back
            </button>

            <button
              className="btn btn-primary"
              onClick={printReceipt}
            >
              <FaPrint className="me-2" />
              Print
            </button>

            <button
              className="btn btn-success"
              onClick={downloadPDF}
            >
              <FaDownload className="me-2" />
              Download PDF
            </button>

            <button
              className="btn btn-danger"
              onClick={handleDeleteReceipt}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Deleting...
                </>
              ) : (
                <>
                  <FaTrash className="me-2" />
                  Delete Receipt
                </>
              )}
            </button>
          </div>
        </div>

        <div ref={receiptRef} className="premium-receipt">
          <div className="receipt-top-border"></div>

          <div className="receipt-header">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="d-flex align-items-center gap-3">
                  {school?.schoolLogo && (
                    <img
                      src={school.schoolLogo}
                      alt="School Logo"
                      className="school-logo"
                    />
                  )}

                  <div>
                    <div className="school-name">
                      {school?.schoolName || "School Name"}
                    </div>

                    <p className="school-address">
                      {school?.address || "School Address"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <div className="receipt-title">
                  <FaReceipt className="me-2" />
                  FEE PAYMENT RECEIPT
                </div>

                <div className="receipt-number mt-2">
                  Receipt No: {receipt.receiptNo}
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="info-box">
                  <div className="section-title">
                    <FaUserGraduate className="text-primary me-2" />
                    Student Information
                  </div>

                  <div className="info-row">
                    <span className="info-label">
                      Admission No
                    </span>
                    <span className="info-value">
                      {receipt.admissionNumber || "-"}
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Student Name</span>
                    <span className="info-value">
                      {receipt.studentName || "-"}
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Class</span>
                    <span className="info-value">
                      {receipt.studentClass || "-"}
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Section</span>
                    <span className="info-value">
                      {receipt.section || "-"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="info-box">
                  <div className="section-title">
                    <FaCreditCard className="text-primary me-2" />
                    Payment Information
                  </div>

                  <div className="info-row">
                    <span className="info-label">Session</span>
                    <span className="info-value">
                      {receipt.session || "-"}
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">
                      <FaCalendarAlt className="me-1" />
                      Date
                    </span>
                    <span className="info-value">
                      {receipt.paymentDate || "-"}
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Time</span>
                    <span className="info-value">
                      {formattedDateTime}
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Payment Mode</span>
                    <span className="info-value">
                      <span className="payment-badge">
                        {receipt.paymentMode || "-"}
                      </span>
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Collected By</span>
                    <span className="info-value">
                      {receipt.collectedBy || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="fee-section">
            <div className="section-title">
              <FaReceipt className="text-primary me-2" />
              Fee Details
            </div>

            <div className="table-responsive">
              <table className="table table-bordered fee-table">
                <thead>
                  <tr>
                    <th width="60">#</th>
                    <th>Month</th>
                    <th>Fee</th>
                    <th className="text-end">Amount</th>
                    <th className="text-end">Paid</th>
                    <th className="text-end">Due</th>
                  </tr>
                </thead>

                <tbody>
                  {receipt?.feeDetails?.length > 0 ? (
                    receipt.feeDetails.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>{item.month || "-"}</td>

                        <td>{item.feeName || "-"}</td>

                        <td className="text-end">
                          ₹ {Number(item.amount || 0).toFixed(2)}
                        </td>

                        <td className="text-end text-success fw-bold">
                          ₹ {Number(item.paidAmount || 0).toFixed(2)}
                        </td>

                        <td className="text-end text-danger fw-bold">
                          ₹ {Number(item.dueAmount || 0).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center text-muted"
                      >
                        No fee details available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="summary-wrapper">
            <div className="summary-card">
              <div className="summary-row summary-total">
                <span>Total Amount</span>
                <span>
                  ₹ {Number(receipt.totalAmount || 0).toFixed(2)}
                </span>
              </div>

              <div className="summary-row summary-paid">
                <span>Paid Amount</span>
                <span>
                  ₹ {Number(receipt.paidAmount || 0).toFixed(2)}
                </span>
              </div>

              <div className="summary-row">
                <span>Fine</span>
                <span>
                  ₹ {Number(receipt.fineAmount || 0).toFixed(2)}
                </span>
              </div>

              <div className="summary-row">
                <span>Discount</span>
                <span>
                  ₹ {Number(receipt.discountAmount || 0).toFixed(2)}
                </span>
              </div>

              <div className="summary-row summary-balance">
                <span>Balance Due</span>
                <span>
                  ₹ {Number(receipt.dueAmount || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="receipt-footer">
            <div className="row align-items-end">
              <div className="col-md-7">
                <div className="thank-you">
                  This is a computer-generated fee receipt and does not
                  require a physical stamp.
                </div>

                <div className="mt-2 fw-semibold">
                  Thank you for your payment.
                </div>
              </div>

              <div className="col-md-5 mt-4 mt-md-0">
                <div className="signature ms-auto">
                  <div className="signature-line"></div>
                  Authorized Signature
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeeReceipt;

