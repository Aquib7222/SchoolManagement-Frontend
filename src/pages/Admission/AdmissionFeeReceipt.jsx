// // import React, { useEffect, useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";

// // const AdmissionFeeReceipt = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const [data, setData] = useState(null);

// //   useEffect(() => {
// //     // Get payment details passed from previous page
// //     if (location.state?.payment) {
// //       setData(location.state.payment);
// //     } else {
// //       // If no data, redirect back
// //       navigate("/"); 
// //     }
// //   }, [location, navigate]);

// //   const handlePrint = () => {
// //     window.print(); // Open browser print dialog
// //   };

// //   if (!data) return <div>Loading...</div>;

// //   return (
// //     <div className="container mt-4">
// //       <div className="card p-4 shadow">
// //         <h3 className="text-center mb-3">Fee Receipt</h3>

// //         <div className="mb-2">
// //           <strong>Student Name:</strong> {data.studentName}
// //         </div>
// //         <div className="mb-2">
// //           <strong>Admission No:</strong> {data.admissionNumber}
// //         </div>
// //         <div className="mb-2">
// //           <strong>Class:</strong> {data.standard}
// //         </div>
// //         <div className="mb-2">
// //           <strong>Session:</strong> {data.session}
// //         </div>
// //         <div className="mb-2">
// //           <strong>Payment Date:</strong>{" "}
// //           {new Date(data.paymentDate).toLocaleString()}
// //         </div>
// //         <div className="mb-2">
// //           <strong>Payment Mode:</strong> {data.paymentMode}
// //         </div>

// //         <hr />

// //         <h5>Fee Details</h5>
// //         <table className="table table-bordered">
// //           <thead>
// //             <tr>
// //               <th>Fee Type</th>
// //               <th>Amount</th>
// //               <th>Discount</th>
// //               <th>Paid</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {Object.entries(data.fixedFees || {}).map(([key, val]) => (
// //               <tr key={key}>
// //                 <td>{key}</td>
// //                 <td>₹{val.amount}</td>
// //                 <td>₹{val.discount}</td>
// //                 <td>₹{val.amount - val.discount}</td>
// //               </tr>
// //             ))}
// //             {data.paidMonths.map((month) => (
// //               <tr key={month}>
// //                 <td>Tuition Fee ({month})</td>
// //                 <td>₹{data.tuitionFee[month]}</td>
// //                 <td>₹0</td>
// //                 <td>₹{data.tuitionFee[month]}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>

// //         <h5 className="text-end">Total: ₹{data.totalAmount}</h5>

// //         <div className="text-center mt-4">
// //           <button className="btn btn-primary" onClick={handlePrint}>
// //             Print / Download
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdmissionFeeReceipt;

// // Receipt.jsx

// import React, { useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const AdmissionFeeReceipt = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const receiptRef = useRef();

//   // Receive data passed from payment page
//   const { receiptData } = location.state || {};

//   useEffect(() => {
//     if (!receiptData) {
//       navigate("/"); // redirect if no data
//       return;
//     }

//     // Automatically generate PDF
//     const generatePDF = async () => {
//       const input = receiptRef.current;
//       const canvas = await html2canvas(input, { scale: 2 });
//       const imgData = canvas.toDataURL("image/png");

//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`Receipt_${receiptData.receiptNo}.pdf`);
//     };

//     generatePDF();
//   }, [receiptData, navigate]);

//   if (!receiptData) return null;

//   return (
//     <div
//       ref={receiptRef}
//       className="p-4"
//       style={{
//         maxWidth: "800px",
//         margin: "20px auto",
//         borderRadius: "10px",
//         padding: "30px",
//         // background: "linear-gradient(to right, #6a11cb, #2575fc)",
//         background:"white",
//         color: "black",
//         border:"2px solid black",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//         {receiptData.schoolName || "School Name"}
//       </h2>
//       <h4 style={{ textAlign: "center", marginBottom: "30px" }}>
//         Fee Receipt - #{receiptData.receiptNo}
//       </h4>

//       <div style={{ marginBottom: "20px" }}>
//         <strong>Student Name:</strong> {receiptData.studentName} <br />
//         <strong>Admission No:</strong> {receiptData.admissionNumber} <br />
//         <strong>Class:</strong> {receiptData.standard} <br />
//         <strong>Session:</strong> {receiptData.session} <br />
//         <strong>Payment Date:</strong>{" "}
//         {new Date(receiptData.paymentDate).toLocaleString()} <br />
//         <strong>Payment Mode:</strong> {receiptData.paymentMode}
//       </div>
//       ------------------------------------------------------------------------------------------------------------------------------------
//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           marginBottom: "20px",
//         }}
//       >
//         <thead>
//           <tr>
//             <th
//               style={{
//                 borderBottom: "1px solid #fff",
//                 textAlign: "left",
//                 padding: "8px",
//               }}
//             >
//               Fee Type
//             </th>
//             <th
//               style={{
//                 borderBottom: "1px solid #fff",
//                 textAlign: "right",
//                 padding: "8px",
//               }}
//             >
//               Amount
//             </th>
//             <th
//               style={{
//                 borderBottom: "1px solid #fff",
//                 textAlign: "right",
//                 padding: "8px",
//               }}
//             >
//               Discount
//             </th>
//             <th
//               style={{
//                 borderBottom: "1px solid #fff",
//                 textAlign: "right",
//                 padding: "8px",
//               }}
//             >
//               Paid
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(receiptData.fees).map(([fee, val]) => (
//             <tr key={fee}>
//               <td style={{ padding: "8px" }}>{fee}</td>
//               <td style={{ padding: "8px", textAlign: "right" }}>
//                 ₹{val.amount || 0}
//               </td>
//               <td style={{ padding: "8px", textAlign: "right" }}>
//                 ₹{val.discount || 0}
//               </td>
//               <td style={{ padding: "8px", textAlign: "right" }}>
//                 ₹{(val.amount || 0) - (val.discount || 0)}
//               </td>
//             </tr>
//           ))}

//           {/* Tuition months */}
//           {receiptData.tuitionMonths.map((month) => (
//             <tr key={month}>
//               <td style={{ padding: "8px" }}>Tuition Fee ({month})</td>
//               <td style={{ padding: "8px", textAlign: "right" }}>
//                 ₹{receiptData.tuitionFee[month]}
//               </td>
//               <td style={{ padding: "8px", textAlign: "right" }}>₹0</td>
//               <td style={{ padding: "8px", textAlign: "right" }}>
//                 ₹{receiptData.tuitionFee[month]}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td
//               colSpan={3}
//               style={{ textAlign: "right", fontWeight: "bold", padding: "8px" }}
//             >
//               Total Amount Paid:
//             </td>
//             <td style={{ textAlign: "right", fontWeight: "bold", padding: "8px" }}>
//               ₹{receiptData.totalAmount}
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// };

// export default AdmissionFeeReceipt;


import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaSchool, FaPhone, FaEnvelope, FaPrint } from "react-icons/fa";
import emblem from "../../assets/icon/emblem.png";

const AdmissionFeeReceipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef(null);

  const { receiptData } = location.state || {};

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------------------------------
  // FORMAT CURRENCY
  // --------------------------------------------------
  const currency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  // --------------------------------------------------
  // FEE LABEL
  // --------------------------------------------------
  const formatFeeName = (fee) => {
    return fee
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  // --------------------------------------------------
  // CALCULATE TOTALS
  // --------------------------------------------------
  const fixedFeeRows = Object.entries(receiptData?.fees || {});

  const fixedFeeTotal = fixedFeeRows.reduce((total, [, value]) => {
    const amount = Number(value?.amount || 0);
    const discount = Number(value?.discount || 0);

    return total + Math.max(amount - discount, 0);
  }, 0);

  const tuitionTotal = (receiptData?.tuitionMonths || []).reduce(
    (total, month) => {
      return total + Number(receiptData?.tuitionFee?.[month] || 0);
    },
    0
  );

  const totalDiscount = fixedFeeRows.reduce((total, [, value]) => {
    return total + Number(value?.discount || 0);
  }, 0);

  const calculatedTotal = fixedFeeTotal + tuitionTotal;

  // --------------------------------------------------
  // GENERATE PDF
  // --------------------------------------------------
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

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const margin = 8;

      const availableWidth = pdfWidth - margin * 2;

      const imageHeight =
        (canvas.height * availableWidth) / canvas.width;

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

      heightLeft -= pdfHeight - margin * 2;

      while (heightLeft > 0) {
        position = heightLeft - imageHeight + margin;

        pdf.addPage();

        pdf.addImage(
          imgData,
          "PNG",
          margin,
          position,
          availableWidth,
          imageHeight
        );

        heightLeft -= pdfHeight - margin * 2;
      }

      pdf.save(
        `Admission_Fee_Receipt_${receiptData.receiptNo}.pdf`
      );
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Unable to generate PDF");
    }
  };

  // --------------------------------------------------
  // PRINT
  // --------------------------------------------------
  const handlePrint = () => {
    window.print();
  };

  // --------------------------------------------------
  // AUTO PDF
  // --------------------------------------------------
  useEffect(() => {
    if (!receiptData) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      generatePDF();
    }, 500);

    return () => clearTimeout(timer);
  }, [receiptData]);

  if (!receiptData) return null;

  return (
    <>
      {/* =====================================================
          PRINT BUTTON
      ====================================================== */}
      <div
        className="d-flex justify-content-center gap-2 mt-3 mb-3 no-print"
      >
        <button
          className="btn btn-success"
          onClick={generatePDF}
        >
          Download PDF
        </button>

        <button
          className="btn btn-primary"
          onClick={handlePrint}
        >
          <FaPrint className="me-1" />
          Print Receipt
        </button>
      </div>

      {/* =====================================================
          RECEIPT
      ====================================================== */}
      <div
        ref={receiptRef}
        className="fee-receipt"
        style={{
          width: "794px",
          minHeight: "1123px",
          margin: "20px auto",
          padding: "28px",
          backgroundColor: "#ffffff",
          color: "#111827",
          fontFamily: "Arial, Helvetica, sans-serif",
          border: "1px solid #d1d5db",
          boxSizing: "border-box",
        }}
      >
        {/* =================================================
            SCHOOL HEADER
        ================================================== */}
        <div
          style={{
            border: "2px solid #0B6B53",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "18px",
            }}
          >
            <img
              src={emblem}
              alt="School Logo"
              style={{
                width: "78px",
                height: "78px",
                objectFit: "contain",
              }}
            />

            <div style={{ textAlign: "center" }}>
              <h2
                style={{
                  margin: 0,
                  color: "#0B6B53",
                  fontSize: "24px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {receiptData.schoolName || "ABC PUBLIC SCHOOL"}
              </h2>

              <div
                style={{
                  marginTop: "4px",
                  color: "#555",
                  fontSize: "12px",
                }}
              >
                Knowledge • Excellence • Integrity
              </div>

              <div
                style={{
                  marginTop: "6px",
                  fontSize: "12px",
                }}
              >
                Station Road, Siwan, Bihar - 841226
              </div>

              <div
                style={{
                  marginTop: "4px",
                  fontSize: "11px",
                  color: "#555",
                }}
              >
                <FaPhone size={9} /> +91-9876543210
                &nbsp;&nbsp; | &nbsp;&nbsp;
                <FaEnvelope size={9} /> abcpublicschool@gmail.com
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            RECEIPT TITLE
        ================================================== */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              backgroundColor: "#0B6B53",
              color: "#ffffff",
              padding: "8px 24px",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            ADMISSION FEE RECEIPT
          </div>

          <div
            style={{
              textAlign: "right",
              fontSize: "11px",
              lineHeight: "1.6",
            }}
          >
            <div>
              <strong>Receipt No:</strong>{" "}
              {receiptData.receiptNo}
            </div>

            <div>
              <strong>Date:</strong>{" "}
              {formatDate(receiptData.paymentDate)}
            </div>
          </div>
        </div>

        {/* =================================================
            STUDENT INFORMATION
        ================================================== */}
        <div style={{ marginBottom: "15px" }}>
          <div
            style={{
              backgroundColor: "#0B6B53",
              color: "#ffffff",
              padding: "7px 12px",
              fontSize: "13px",
              fontWeight: "700",
              borderRadius: "5px 5px 0 0",
            }}
          >
            STUDENT INFORMATION
          </div>

          <div
            style={{
              border: "1px solid #999",
              borderTop: "none",
              padding: "12px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                rowGap: "8px",
                columnGap: "30px",
                fontSize: "12px",
              }}
            >
              <div>
                <strong>Student Name:</strong>{" "}
                {receiptData.studentName || "-"}
              </div>

              <div>
                <strong>Admission No:</strong>{" "}
                {receiptData.admissionNumber || "-"}
              </div>

              <div>
                <strong>Class:</strong>{" "}
                {receiptData.standard || "-"}
              </div>

              <div>
                <strong>Session:</strong>{" "}
                {receiptData.session || "-"}
              </div>

              <div>
                <strong>Payment Mode:</strong>{" "}
                {receiptData.paymentMode || "-"}
              </div>

              <div>
                <strong>Payment Date:</strong>{" "}
                {formatDate(receiptData.paymentDate)}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            FEE DETAILS
        ================================================== */}
        <div style={{ marginBottom: "15px" }}>
          <div
            style={{
              backgroundColor: "#0B6B53",
              color: "#ffffff",
              padding: "7px 12px",
              fontSize: "13px",
              fontWeight: "700",
              borderRadius: "5px 5px 0 0",
            }}
          >
            FEE DETAILS
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "11px",
            }}
          >
            <thead>
              <tr>
                <th style={headerStyle}>#</th>
                <th style={{ ...headerStyle, textAlign: "left" }}>
                  Fee Type
                </th>
                <th style={headerStyle}>Amount</th>
                <th style={headerStyle}>Discount</th>
                <th style={headerStyle}>Paid Amount</th>
              </tr>
            </thead>

            <tbody>
              {fixedFeeRows.map(([fee, value], index) => {
                const amount = Number(value?.amount || 0);
                const discount = Number(value?.discount || 0);
                const paid = Math.max(amount - discount, 0);

                return (
                  <tr key={fee}>
                    <td style={cellStyle}>{index + 1}</td>

                    <td
                      style={{
                        ...cellStyle,
                        textAlign: "left",
                      }}
                    >
                      {formatFeeName(fee)}
                    </td>

                    <td style={cellStyle}>
                      {currency(amount)}
                    </td>

                    <td style={cellStyle}>
                      {currency(discount)}
                    </td>

                    <td style={cellStyle}>
                      {currency(paid)}
                    </td>
                  </tr>
                );
              })}

              {/* Tuition Fees */}
              {(receiptData.tuitionMonths || []).map(
                (month, index) => {
                  const amount = Number(
                    receiptData.tuitionFee?.[month] || 0
                  );

                  return (
                    <tr key={`tuition-${month}`}>
                      <td style={cellStyle}>
                        {fixedFeeRows.length + index + 1}
                      </td>

                      <td
                        style={{
                          ...cellStyle,
                          textAlign: "left",
                        }}
                      >
                        Tuition Fee ({month})
                      </td>

                      <td style={cellStyle}>
                        {currency(amount)}
                      </td>

                      <td style={cellStyle}>
                        {currency(0)}
                      </td>

                      <td style={cellStyle}>
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
                  style={{
                    border: "1px solid #555",
                    padding: "8px",
                    textAlign: "right",
                    fontWeight: "700",
                  }}
                >
                  Total Discount
                </td>

                <td
                  colSpan="2"
                  style={{
                    border: "1px solid #555",
                    padding: "8px",
                    textAlign: "right",
                    fontWeight: "700",
                  }}
                >
                  {currency(totalDiscount)}
                </td>
              </tr>

              <tr>
                <td
                  colSpan="3"
                  style={{
                    border: "1px solid #555",
                    padding: "10px",
                    textAlign: "right",
                    fontWeight: "700",
                    fontSize: "13px",
                  }}
                >
                  TOTAL AMOUNT PAID
                </td>

                <td
                  colSpan="2"
                  style={{
                    border: "1px solid #555",
                    padding: "10px",
                    textAlign: "right",
                    fontWeight: "700",
                    fontSize: "15px",
                    color: "#0B6B53",
                  }}
                >
                  {currency(
                    receiptData.totalAmount ?? calculatedTotal
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* =================================================
            PAYMENT SUMMARY
        ================================================== */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #0B6B53",
            borderRadius: "6px",
            padding: "10px 14px",
            marginBottom: "15px",
          }}
        >
          <div style={{ fontSize: "12px" }}>
            <strong>Payment Mode:</strong>{" "}
            {receiptData.paymentMode || "-"}
          </div>

          <div style={{ fontSize: "14px" }}>
            <strong>Amount Paid:</strong>{" "}
            <span
              style={{
                color: "#0B6B53",
                fontWeight: "700",
              }}
            >
              {currency(
                receiptData.totalAmount ?? calculatedTotal
              )}
            </span>
          </div>
        </div>

        {/* =================================================
            AMOUNT IN WORDS
        ================================================== */}
        <div
          style={{
            border: "1px solid #ddd",
            backgroundColor: "#f8fafc",
            padding: "10px",
            marginBottom: "18px",
            fontSize: "11px",
          }}
        >
          <strong>Amount Received:</strong>{" "}
          {currency(
            receiptData.totalAmount ?? calculatedTotal
          )}
        </div>

        {/* =================================================
            TERMS & CONDITIONS
        ================================================== */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              backgroundColor: "#0B6B53",
              color: "#ffffff",
              padding: "7px 12px",
              fontSize: "12px",
              fontWeight: "700",
              borderRadius: "5px 5px 0 0",
            }}
          >
            TERMS & CONDITIONS
          </div>

          <div
            style={{
              border: "1px solid #999",
              borderTop: "none",
              padding: "9px 15px",
              fontSize: "10px",
              lineHeight: "1.6",
            }}
          >
            <ol style={{ margin: 0, paddingLeft: "18px" }}>
              <li>
                This receipt is valid as proof of fee payment.
              </li>

              <li>
                Please preserve this receipt for future reference.
              </li>

              <li>
                Fee once paid will be subject to the school's refund
                policy.
              </li>

              <li>
                Any discrepancy in the receipt should be reported to
                the school administration.
              </li>

              <li>
                This receipt is valid for the academic session mentioned
                above.
              </li>
            </ol>
          </div>
        </div>

        {/* =================================================
            SIGNATURE
        ================================================== */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "35px",
            fontSize: "11px",
          }}
        >
          <div
            style={{
              width: "180px",
              textAlign: "center",
              borderTop: "1px solid #333",
              paddingTop: "6px",
            }}
          >
            Parent / Guardian Signature
          </div>

          <div
            style={{
              width: "180px",
              textAlign: "center",
              borderTop: "1px solid #333",
              paddingTop: "6px",
            }}
          >
            Authorized Signature
          </div>
        </div>

        {/* =================================================
            FOOTER
        ================================================== */}
        <div
          style={{
            textAlign: "center",
            borderTop: "1px solid #ddd",
            marginTop: "35px",
            paddingTop: "8px",
            fontSize: "9px",
            color: "#666",
          }}
        >
          This is a computer-generated fee receipt and does not require
          a physical stamp.
        </div>
      </div>

      {/* =====================================================
          PRINT CSS
      ====================================================== */}
      <style>
        {`
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
              margin: 0 auto !important;
              border: none !important;
              width: 794px !important;
              min-height: 1123px !important;
              box-shadow: none !important;
            }

            @page {
              size: A4 portrait;
              margin: 0;
            }
          }

          @media screen and (max-width: 850px) {
            .fee-receipt {
              width: 100% !important;
              min-height: auto !important;
              margin: 10px !important;
              padding: 15px !important;
            }
          }
        `}
      </style>
    </>
  );
};

const headerStyle = {
  border: "1px solid #555",
  padding: "7px",
  textAlign: "center",
  backgroundColor: "#e8f5f1",
  fontWeight: "700",
};

const cellStyle = {
  border: "1px solid #777",
  padding: "7px",
  textAlign: "right",
  verticalAlign: "middle",
};

export default AdmissionFeeReceipt;