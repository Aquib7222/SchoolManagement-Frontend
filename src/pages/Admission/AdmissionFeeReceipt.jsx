// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const AdmissionFeeReceipt = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // Get payment details passed from previous page
//     if (location.state?.payment) {
//       setData(location.state.payment);
//     } else {
//       // If no data, redirect back
//       navigate("/"); 
//     }
//   }, [location, navigate]);

//   const handlePrint = () => {
//     window.print(); // Open browser print dialog
//   };

//   if (!data) return <div>Loading...</div>;

//   return (
//     <div className="container mt-4">
//       <div className="card p-4 shadow">
//         <h3 className="text-center mb-3">Fee Receipt</h3>

//         <div className="mb-2">
//           <strong>Student Name:</strong> {data.studentName}
//         </div>
//         <div className="mb-2">
//           <strong>Admission No:</strong> {data.admissionNumber}
//         </div>
//         <div className="mb-2">
//           <strong>Class:</strong> {data.standard}
//         </div>
//         <div className="mb-2">
//           <strong>Session:</strong> {data.session}
//         </div>
//         <div className="mb-2">
//           <strong>Payment Date:</strong>{" "}
//           {new Date(data.paymentDate).toLocaleString()}
//         </div>
//         <div className="mb-2">
//           <strong>Payment Mode:</strong> {data.paymentMode}
//         </div>

//         <hr />

//         <h5>Fee Details</h5>
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Fee Type</th>
//               <th>Amount</th>
//               <th>Discount</th>
//               <th>Paid</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(data.fixedFees || {}).map(([key, val]) => (
//               <tr key={key}>
//                 <td>{key}</td>
//                 <td>₹{val.amount}</td>
//                 <td>₹{val.discount}</td>
//                 <td>₹{val.amount - val.discount}</td>
//               </tr>
//             ))}
//             {data.paidMonths.map((month) => (
//               <tr key={month}>
//                 <td>Tuition Fee ({month})</td>
//                 <td>₹{data.tuitionFee[month]}</td>
//                 <td>₹0</td>
//                 <td>₹{data.tuitionFee[month]}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <h5 className="text-end">Total: ₹{data.totalAmount}</h5>

//         <div className="text-center mt-4">
//           <button className="btn btn-primary" onClick={handlePrint}>
//             Print / Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdmissionFeeReceipt;

// Receipt.jsx
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AdmissionFeeReceipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef();

  // Receive data passed from payment page
  const { receiptData } = location.state || {};

  useEffect(() => {
    if (!receiptData) {
      navigate("/"); // redirect if no data
      return;
    }

    // Automatically generate PDF
    const generatePDF = async () => {
      const input = receiptRef.current;
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Receipt_${receiptData.receiptNo}.pdf`);
    };

    generatePDF();
  }, [receiptData, navigate]);

  if (!receiptData) return null;

  return (
    <div
      ref={receiptRef}
      className="p-4"
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        borderRadius: "10px",
        padding: "30px",
        // background: "linear-gradient(to right, #6a11cb, #2575fc)",
        background:"white",
        color: "black",
        border:"2px solid black",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {receiptData.schoolName || "School Name"}
      </h2>
      <h4 style={{ textAlign: "center", marginBottom: "30px" }}>
        Fee Receipt - #{receiptData.receiptNo}
      </h4>

      <div style={{ marginBottom: "20px" }}>
        <strong>Student Name:</strong> {receiptData.studentName} <br />
        <strong>Admission No:</strong> {receiptData.admissionNumber} <br />
        <strong>Class:</strong> {receiptData.standard} <br />
        <strong>Session:</strong> {receiptData.session} <br />
        <strong>Payment Date:</strong>{" "}
        {new Date(receiptData.paymentDate).toLocaleString()} <br />
        <strong>Payment Mode:</strong> {receiptData.paymentMode}
      </div>
      ------------------------------------------------------------------------------------------------------------------------------------
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                borderBottom: "1px solid #fff",
                textAlign: "left",
                padding: "8px",
              }}
            >
              Fee Type
            </th>
            <th
              style={{
                borderBottom: "1px solid #fff",
                textAlign: "right",
                padding: "8px",
              }}
            >
              Amount
            </th>
            <th
              style={{
                borderBottom: "1px solid #fff",
                textAlign: "right",
                padding: "8px",
              }}
            >
              Discount
            </th>
            <th
              style={{
                borderBottom: "1px solid #fff",
                textAlign: "right",
                padding: "8px",
              }}
            >
              Paid
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(receiptData.fees).map(([fee, val]) => (
            <tr key={fee}>
              <td style={{ padding: "8px" }}>{fee}</td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                ₹{val.amount || 0}
              </td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                ₹{val.discount || 0}
              </td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                ₹{(val.amount || 0) - (val.discount || 0)}
              </td>
            </tr>
          ))}

          {/* Tuition months */}
          {receiptData.tuitionMonths.map((month) => (
            <tr key={month}>
              <td style={{ padding: "8px" }}>Tuition Fee ({month})</td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                ₹{receiptData.tuitionFee[month]}
              </td>
              <td style={{ padding: "8px", textAlign: "right" }}>₹0</td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                ₹{receiptData.tuitionFee[month]}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan={3}
              style={{ textAlign: "right", fontWeight: "bold", padding: "8px" }}
            >
              Total Amount Paid:
            </td>
            <td style={{ textAlign: "right", fontWeight: "bold", padding: "8px" }}>
              ₹{receiptData.totalAmount}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AdmissionFeeReceipt;
