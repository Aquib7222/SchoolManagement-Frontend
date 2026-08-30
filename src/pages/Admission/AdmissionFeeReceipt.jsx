
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import {
  FaSchool,
  FaPhone,
  FaEnvelope,
  FaPrint,
  FaMoneyBillWave,
  FaUserGraduate,
  FaReceipt,
  FaCheckCircle,
  FaUniversity,
  FaHashtag,
} from "react-icons/fa";

import emblem from "../../assets/icon/emblem.png";

const AdmissionFeeReceipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef(null);

  const { receiptData } = location.state || {};

  console.log("receipt data",receiptData);

  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  /* =====================================================
     FORMAT CURRENCY
  ===================================================== */

  const currency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  /* =====================================================
     FEE LABEL
  ===================================================== */

  const formatFeeName = (fee) => {
    if (!fee) return "-";

    return fee
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  /* =====================================================
     PAYMENT INFORMATION
  ===================================================== */

  const paymentMode = receiptData?.paymentMode || "";

  const utrNumber =
    receiptData?.utrNumber ||
    receiptData?.utrNo ||
    receiptData?.transactionId ||
    "";

  const bankName =
    receiptData?.bankName ||
    receiptData?.bank ||
    "";

  const referenceNumber =
    receiptData?.referenceNumber ||
    receiptData?.referenceNo ||
    receiptData?.transactionReference ||
    "";

  /* =====================================================
     FIXED FEE ROWS
  ===================================================== */

  const fixedFeeRows = Object.entries(
    receiptData?.fees || {}
  );

  /* =====================================================
     FIXED FEE TOTAL
  ===================================================== */

  const fixedFeeTotal = fixedFeeRows.reduce(
    (total, [, value]) => {
      const amount = Number(value?.amount || 0);
      const discount = Number(value?.discount || 0);

      return total + Math.max(amount - discount, 0);
    },
    0
  );

  /* =====================================================
     TUITION TOTAL
  ===================================================== */

  const tuitionTotal = (
    receiptData?.tuitionMonths || []
  ).reduce((total, month) => {
    return (
      total +
      Number(
        receiptData?.tuitionFee?.[month] || 0
      )
    );
  }, 0);

  /* =====================================================
     TOTAL DISCOUNT
  ===================================================== */

  const totalDiscount = fixedFeeRows.reduce(
    (total, [, value]) => {
      return (
        total +
        Number(value?.discount || 0)
      );
    },
    0
  );

  /* =====================================================
     CALCULATED TOTAL
  ===================================================== */

  const calculatedTotal =
    fixedFeeTotal + tuitionTotal;

  const finalTotal = Number(
    receiptData?.totalAmount ??
      calculatedTotal
  );

  /* =====================================================
     STUDENT NAME
  ===================================================== */
const name = [
  receiptData?.admission?.firstName,
  receiptData?.admission?.middleName,
  receiptData?.admission?.lastName,
]
  .filter(Boolean)
  .join(" ");

const studentName =
  receiptData?.studentName || name || "-";

  /* =====================================================
     GENERATE PDF
  ===================================================== */

  const generatePDF = async () => {
    const input = receiptRef.current;

    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData =
        canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        pdf.internal.pageSize.getHeight();

      const margin = 6;

      const availableWidth =
        pdfWidth - margin * 2;

      const imageHeight =
        (canvas.height * availableWidth) /
        canvas.width;

      let heightLeft = imageHeight;
      let position = margin;

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        position,
        availableWidth,
        imageHeight
      );

      heightLeft -=
        pdfHeight - margin * 2;

      while (heightLeft > 0) {
        position =
          heightLeft -
          imageHeight +
          margin;

        pdf.addPage();

        pdf.addImage(
          imgData,
          "PNG",
          margin,
          position,
          availableWidth,
          imageHeight
        );

        heightLeft -=
          pdfHeight - margin * 2;
      }

      pdf.save(
        `Admission_Fee_Receipt_${
          receiptData?.receiptNo || "receipt"
        }.pdf`
      );
    } catch (error) {
      console.error(
        "PDF generation error:",
        error
      );

      alert(
        "Unable to generate PDF"
      );
    }
  };

  /* =====================================================
     PRINT
  ===================================================== */

  const handlePrint = () => {
    window.print();
  };

  /* =====================================================
     AUTO PDF
  ===================================================== */

  useEffect(() => {
    if (!receiptData) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      generatePDF();
    }, 700);

    return () => clearTimeout(timer);
  }, [receiptData]);

  /* =====================================================
     NO RECEIPT
  ===================================================== */

  if (!receiptData) {
    return null;
  }

  return (
    <>
      {/* =====================================================
          ACTION BUTTONS
      ===================================================== */}

      <div className="d-flex justify-content-center gap-2 mt-3 mb-3 no-print">
        <button
          className="btn btn-success px-4"
          onClick={generatePDF}
        >
          <FaReceipt className="me-2" />
          Download PDF
        </button>

        <button
          className="btn btn-primary px-4"
          onClick={handlePrint}
        >
          <FaPrint className="me-2" />
          Print Receipt
        </button>

        <button
          className="btn btn-outline-secondary px-4"
          onClick={() =>
            navigate("/admission/fee")
          }
        >
          Back
        </button>
      </div>

      {/* =====================================================
          RECEIPT
      ===================================================== */}

      <div
        ref={receiptRef}
        className="fee-receipt"
      >
        {/* ===================================================
            SCHOOL HEADER
        =================================================== */}

        <div className="school-header">
          <div className="school-header-inner">
            <img
              src={emblem}
              alt="School Logo"
              className="school-logo"
            />

            <div className="school-info">
              <h1>
                {receiptData.schoolName || receiptData?.admission?.school.schoolName ||
                  "ABC PUBLIC SCHOOL"}
              </h1>

              <div className="school-tagline">
                Knowledge • Excellence • Integrity
              </div>

              <div className="school-address">
                <FaSchool className="me-1" />
                { receiptData?.admission?.school.addressLine1 ||
                  "Station Road, Siwan, Bihar - 841226"}
                
              </div>

              <div className="school-contact">
                <span>
                  <FaPhone className="me-1" />
                   { receiptData?.admission?.school.phoneNumber ||
                  "+91-9876543210"}
                  
                </span>

                <span className="separator">
                  |
                </span>

                <span>
                  <FaEnvelope className="me-1" />
                 { receiptData?.admission?.school.email ||
                  "abcpublicschool@gmail.com"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            RECEIPT TITLE
        =================================================== */}

        <div className="receipt-title-row">
          <div className="receipt-title">
            <FaMoneyBillWave className="me-2" />
            ADMISSION FEE RECEIPT
          </div>

          <div className="receipt-meta">
            <div>
              <strong>Receipt No:</strong>{" "}
              {receiptData.receiptNo || "-"}
            </div>

            <div>
              <strong>Date:</strong>{" "}
              {formatDate(
                receiptData.paymentDate 
              )}
            </div>
          </div>
        </div>

        {/* ===================================================
            STUDENT INFORMATION
        =================================================== */}

        <div className="section-box">
          <div className="section-header">
            <FaUserGraduate className="me-2" />
            STUDENT INFORMATION
          </div>

          <div className="section-body">
            <div className="student-grid">

              <div className="info-item">
                <span className="info-label">
                  Student Name
                </span>
                <span className="info-value">
                  {studentName}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  Admission No
                </span>
                <span className="info-value">
                  {receiptData?.admission.admissionNumber || receiptData.admissionNumber ||
                    "-"}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  Class
                </span>
                <span className="info-value">
                  {receiptData.standard ||
                    "-"}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  Academic Session
                </span>
                <span className="info-value">
                  {receiptData.session || "-"}
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* ===================================================
            FEE DETAILS
        =================================================== */}

        <div className="section-box">
          <div className="section-header">
            <FaMoneyBillWave className="me-2" />
            FEE DETAILS
          </div>

          <div className="table-responsive">
            <table className="fee-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="text-start">
                    Fee Type
                  </th>
                  <th>Amount</th>
                  <th>Discount</th>
                  <th>Paid Amount</th>
                </tr>
              </thead>

              <tbody>
                {fixedFeeRows.map(
                  ([fee, value], index) => {
                    const amount =
                      Number(
                        value?.amount || 0
                      );

                    const discount =
                      Number(
                        value?.discount || 0
                      );

                    const paid =
                      Math.max(
                        amount - discount,
                        0
                      );

                    return (
                      <tr key={fee}>
                        <td>
                          {index + 1}
                        </td>

                        <td className="text-start">
                          {formatFeeName(fee)}
                        </td>

                        <td>
                          {currency(amount)}
                        </td>

                        <td>
                          {currency(discount)}
                        </td>

                        <td className="fw-bold">
                          {currency(paid)}
                        </td>
                      </tr>
                    );
                  }
                )}

                {(receiptData.tuitionMonths ||
                  []).map(
                    (month, index) => {
                      const amount =
                        Number(
                          receiptData
                            ?.tuitionFee?.[
                            month
                          ] || 0
                        );

                      return (
                        <tr
                          key={`tuition-${month}`}
                        >
                          <td>
                            {fixedFeeRows.length +
                              index +
                              1}
                          </td>

                          <td className="text-start">
                            Tuition Fee (
                            {month})
                          </td>

                          <td>
                            {currency(amount)}
                          </td>

                          <td>
                            {currency(0)}
                          </td>

                          <td className="fw-bold">
                            {currency(amount)}
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>

              <tfoot>
                <tr>
                  <td
                    colSpan="3"
                    className="total-label"
                  >
                    Total Discount
                  </td>

                  <td
                    colSpan="2"
                    className="total-value"
                  >
                    {currency(
                      totalDiscount
                    )}
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="3"
                    className="grand-total-label"
                  >
                    TOTAL AMOUNT PAID
                  </td>

                  <td
                    colSpan="2"
                    className="grand-total-value"
                  >
                    {currency(finalTotal)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ===================================================
            PAYMENT INFORMATION
        =================================================== */}

        <div className="section-box">
          <div className="section-header">
            <FaCheckCircle className="me-2" />
            PAYMENT INFORMATION
          </div>

          <div className="section-body">
            <div className="payment-grid">

              {/* PAYMENT MODE */}

              <div className="payment-item">
                <div className="payment-icon">
                  <FaMoneyBillWave />
                </div>

                <div>
                  <div className="payment-label">
                    Payment Mode
                  </div>

                  <div className="payment-value">
                    {paymentMode || "-"}
                  </div>
                </div>
              </div>

              {/* CASH */}

              {paymentMode === "Cash" && (
                <div className="payment-item">
                  <div className="payment-icon">
                    <FaCheckCircle />
                  </div>

                  <div>
                    <div className="payment-label">
                      Payment Status
                    </div>

                    <div className="payment-value text-success">
                      Paid Successfully
                    </div>
                  </div>
                </div>
              )}

              {/* UPI */}

              {paymentMode === "UPI" && (
                <>
                  <div className="payment-item">
                    <div className="payment-icon">
                      <FaHashtag />
                    </div>

                    <div>
                      <div className="payment-label">
                        UTR Number
                      </div>

                      <div className="payment-value">
                        {utrNumber || "-"}
                      </div>
                    </div>
                  </div>

                  <div className="payment-item">
                    <div className="payment-icon">
                      <FaCheckCircle />
                    </div>

                    <div>
                      <div className="payment-label">
                        Payment Status
                      </div>

                      <div className="payment-value text-success">
                        UPI Payment Verified
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* NET BANKING */}

              {paymentMode ===
                "Net Banking" && (
                <>
                  <div className="payment-item">
                    <div className="payment-icon">
                      <FaUniversity />
                    </div>

                    <div>
                      <div className="payment-label">
                        Bank Name
                      </div>

                      <div className="payment-value">
                        {bankName || "-"}
                      </div>
                    </div>
                  </div>

                  <div className="payment-item">
                    <div className="payment-icon">
                      <FaHashtag />
                    </div>

                    <div>
                      <div className="payment-label">
                        Reference Number
                      </div>

                      <div className="payment-value">
                        {referenceNumber ||
                          "-"}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* PAYMENT DATE */}

              <div className="payment-item">
                <div className="payment-icon">
                  <FaReceipt />
                </div>

                <div>
                  <div className="payment-label">
                    Payment Date
                  </div>

                  <div className="payment-value">
                    {formatDate(
                      receiptData.paymentDate
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ===================================================
            AMOUNT SUMMARY
        =================================================== */}

        <div className="amount-summary">
          <div>
            <div className="summary-label">
              Amount Received
            </div>

            <div className="summary-note">
              Fee payment received successfully
            </div>
          </div>

          <div className="summary-amount">
            {currency(finalTotal)}
          </div>
        </div>

        {/* ===================================================
            TERMS
        =================================================== */}

        <div className="section-box">
          <div className="section-header">
            TERMS & CONDITIONS
          </div>

          <div className="terms-body">
            <ol>
              <li>
                This receipt is valid as
                proof of fee payment.
              </li>

              <li>
                Please preserve this
                receipt for future
                reference.
              </li>

              <li>
                Fee once paid will be
                subject to the school's
                refund policy.
              </li>

              <li>
                Any discrepancy in the
                receipt should be reported
                to the school administration.
              </li>

              <li>
                This receipt is valid for
                the academic session
                mentioned above.
              </li>
            </ol>
          </div>
        </div>

        {/* ===================================================
            SIGNATURES
        =================================================== */}

        <div className="signature-row">

          <div className="signature">
            <div className="signature-line" />
            Parent / Guardian Signature
          </div>

          <div className="signature">
            <div className="signature-line" />
            Authorized Signature
          </div>

        </div>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <div className="receipt-footer">
          This is a computer-generated fee
          receipt and does not require a
          physical stamp.
        </div>
      </div>

      {/* =====================================================
          STYLES
      ===================================================== */}

      <style>
        {`

        * {
          box-sizing: border-box;
        }

        .fee-receipt {
          width: 794px;
          min-height: 1123px;
          margin: 20px auto;
          padding: 25px;
          background: #ffffff;
          color: #111827;
          font-family: Arial, Helvetica, sans-serif;
          border: 1px solid #d1d5db;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        /* SCHOOL HEADER */

        .school-header {
          border: 2px solid #0B6B53;
          border-radius: 8px;
          padding: 14px;
          margin-bottom: 15px;
        }

        .school-header-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
        }

        .school-logo {
          width: 75px;
          height: 75px;
          object-fit: contain;
        }

        .school-info {
          text-align: center;
        }

        .school-info h1 {
          margin: 0;
          color: #0B6B53;
          font-size: 23px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .school-tagline {
          margin-top: 3px;
          color: #555;
          font-size: 11px;
        }

        .school-address {
          margin-top: 5px;
          font-size: 11px;
        }

        .school-contact {
          margin-top: 4px;
          font-size: 10px;
          color: #555;
        }

        .separator {
          margin: 0 8px;
        }

        /* RECEIPT TITLE */

        .receipt-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .receipt-title {
          display: inline-flex;
          align-items: center;
          background: #0B6B53;
          color: white;
          padding: 8px 20px;
          border-radius: 5px;
          font-size: 15px;
          font-weight: 700;
        }

        .receipt-meta {
          text-align: right;
          font-size: 10px;
          line-height: 1.7;
        }

        /* SECTION */

        .section-box {
          margin-bottom: 14px;
        }

        .section-header {
          background: #0B6B53;
          color: white;
          padding: 7px 12px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 5px 5px 0 0;
        }

        .section-body {
          border: 1px solid #999;
          border-top: none;
          padding: 11px;
        }

        /* STUDENT */

        .student-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 35px;
        }

        .info-item {
          display: flex;
          gap: 5px;
          font-size: 11px;
        }

        .info-label {
          font-weight: 700;
        }

        .info-value {
          color: #374151;
        }

        /* TABLE */

        .table-responsive {
          width: 100%;
        }

        .fee-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 10px;
        }

        .fee-table th {
          border: 1px solid #555;
          padding: 7px;
          text-align: center;
          background: #e8f5f1;
          font-weight: 700;
        }

        .fee-table td {
          border: 1px solid #777;
          padding: 7px;
          text-align: right;
          vertical-align: middle;
        }

        .fee-table td:first-child {
          text-align: center;
        }

        .text-start {
          text-align: left !important;
        }

        .total-label {
          border: 1px solid #555;
          padding: 8px;
          text-align: right !important;
          font-weight: 700;
        }

        .total-value {
          border: 1px solid #555;
          padding: 8px;
          text-align: right !important;
          font-weight: 700;
        }

        .grand-total-label {
          border: 1px solid #555;
          padding: 10px;
          text-align: right !important;
          font-weight: 700;
          font-size: 12px;
        }

        .grand-total-value {
          border: 1px solid #555;
          padding: 10px;
          text-align: right !important;
          font-weight: 700;
          font-size: 14px;
          color: #0B6B53;
        }

        /* PAYMENT */

        .payment-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .payment-item {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #d1d5db;
          border-radius: 5px;
          padding: 9px;
          background: #f8fafc;
        }

        .payment-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #e8f5f1;
          color: #0B6B53;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .payment-label {
          font-size: 9px;
          color: #6b7280;
        }

        .payment-value {
          font-size: 11px;
          font-weight: 700;
          margin-top: 2px;
        }

        .text-success {
          color: #198754;
        }

        /* AMOUNT */

        .amount-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #0B6B53;
          border-radius: 6px;
          padding: 10px 14px;
          margin-bottom: 14px;
        }

        .summary-label {
          font-size: 11px;
          font-weight: 700;
        }

        .summary-note {
          font-size: 9px;
          color: #6b7280;
          margin-top: 2px;
        }

        .summary-amount {
          color: #0B6B53;
          font-size: 17px;
          font-weight: 700;
        }

        /* TERMS */

        .terms-body {
          border: 1px solid #999;
          border-top: none;
          padding: 8px 14px;
          font-size: 9px;
          line-height: 1.55;
        }

        .terms-body ol {
          margin: 0;
          padding-left: 17px;
        }

        /* SIGNATURE */

        .signature-row {
          display: flex;
          justify-content: space-between;
          margin-top: 32px;
          font-size: 10px;
        }

        .signature {
          width: 180px;
          text-align: center;
        }

        .signature-line {
          border-top: 1px solid #333;
          margin-bottom: 6px;
        }

        /* FOOTER */

        .receipt-footer {
          text-align: center;
          border-top: 1px solid #ddd;
          margin-top: 30px;
          padding-top: 7px;
          font-size: 8px;
          color: #666;
        }

        /* PRINT */

        @media print {

          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          .no-print {
            display: none !important;
          }

          .fee-receipt {
            width: 794px !important;
            min-height: 1123px !important;
            margin: 0 auto !important;
            padding: 25px !important;
            border: none !important;
            box-shadow: none !important;
          }

          @page {
            size: A4 portrait;
            margin: 0;
          }
        }

        /* MOBILE */

        @media screen and (max-width: 850px) {

          .fee-receipt {
            width: 100% !important;
            min-height: auto !important;
            margin: 10px !important;
            padding: 15px !important;
          }

          .school-header-inner {
            flex-direction: column;
          }

          .school-info h1 {
            font-size: 18px;
          }

          .receipt-title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .receipt-meta {
            text-align: left;
          }

          .student-grid,
          .payment-grid {
            grid-template-columns: 1fr;
          }

          .fee-table {
            min-width: 650px;
          }

          .table-responsive {
            overflow-x: auto;
          }
        }

        `}
      </style>
    </>
  );
};

export default AdmissionFeeReceipt;
