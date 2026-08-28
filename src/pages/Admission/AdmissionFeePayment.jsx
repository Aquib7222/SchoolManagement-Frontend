// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import * as XLSX from "xlsx";
// import axios from "../../api/axiosInstance";

// const AdmissionFeePayment = () => {
//   const navigate = useNavigate();
//   const {standards, sessions} = useMasters();

//   const handleNavigate = (id) => navigate(`/admission/fee/${id}`);
//   const [payments, setPayments] = useState({});
//   const [selectedReceipt, setSelectedReceipt] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const receiptRef = useRef(null);

//   useEffect(() => {
//     const stored =
//       JSON.parse(localStorage.getItem("AdmissionFeePayments")) || {};
//     setPayments(stored);
//   }, []);

//   useEffect(() => {
//     if (selectedReceipt) {
//       setTimeout(() => {
//         handlePrintReceipt();
//         setSelectedReceipt(null);
//       }, 100);
//     }
//   }, [selectedReceipt]);

//   const handleChange = (e, admissionNo, field) => {
//     const value = e.target.value;
//     setPayments((prev) => ({
//       ...prev,
//       [admissionNo]: {
//         ...prev[admissionNo],
//         [field]: value,
//       },
//     }));
//   };

//   const [StudentData, setStudentData] = useState([]);
//   //   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!user?.schoolId || !token) return;

//     setLoading(true);

//     axios
//       .get(`/api/admissions/school?schoolId=${user.schoolId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         console.log("approved admission", res);
//         const approved = (res.data || []).filter(
//           (item) => item.status === "APPROVED",
//         );
//         setStudentData(approved);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [user?.schoolId, token]);

//   console.log("setStudentData", StudentData);

//   const handlePrintReceipt = () => {
//     if (receiptRef.current) {
//       const printWindow = window.open("", "PRINT", "height=650,width=900");
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Fee Receipt</title>
//             <style>
//               body { font-family: Arial; padding: 20px; }
//               h2, h4 { margin: 5px 0; }
//               .line { border-top: 1px dashed #000; margin: 10px 0; }
//             </style>
//           </head>
//           <body>
//             ${receiptRef.current.innerHTML}
//           </body>
//         </html>
//       `);
//       printWindow.document.close();
//       printWindow.focus();
//       printWindow.print();
//       printWindow.close();
//     }
//   };

//   const handleExportToExcel = () => {
//     const exportData = Object.entries(payments).map(([admNo, payment]) => {
//       const student =
//         StudentData.find((s) => s.admissionNumber === admNo) || {};
//       return {
//         "Admission No": admNo,
//         "Student Name": `${student.firstName || ""} ${student.middleName || ""} ${student.lastName || ""}`,
//         Class: student.class,
//         Amount: payment.amount,
//         Mode: payment.mode,
//         Date: payment.date,
//         Status: payment.status,
//       };
//     });

//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Fee Payments");
//     XLSX.writeFile(workbook, "FeePayments.xlsx");
//   };

//   const summary = StudentData.reduce(
//     (acc, student, idx) => {
//       const admNo = student.admissionNumber || `ADM${idx + 1}`;
//       const data = payments[admNo] || {};

//       if (data.status === "Paid") {
//         acc.paidCount += 1;
//         acc.totalPaid += parseFloat(data.amount || 0);
//       } else if (data.status === "Unpaid") {
//         acc.unpaidCount += 1;
//       }
//       return acc;
//     },
//     { paidCount: 0, unpaidCount: 0, totalPaid: 0 },
//   );

//   const filteredStudents = StudentData.filter((student) => {
//     const fullName =
//       `${student.firstName} ${student.middleName || ""} ${student.lastName}`.toLowerCase();
//     const admissionNo = student.admissionNumber?.toLowerCase() || "";
//     return fullName.includes(searchTerm) || admissionNo.includes(searchTerm);
//   });

//   return (
//     <>
//       <div
//         className="row shadow"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           height: "67px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <strong>Admission Fee Payment</strong>
//         </h6>
//         <nav aria-label="breadcrumb py-2">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                 Home
//               </a>
//             </li>
//             <li className="breadcrumb-item">
//               <a href="#" style={{ textDecoration: "none", color: "black" }}>
//                 Admission Fee Payment
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       <div className="container mt-4">
//         <div className="shadow p-4 bg-white rounded">
//           <h4 className="text-primary mb-4">Admission Fee Payment</h4>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by name or admission number..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
//               />
//             </div>
//             <div className="col-md-6 text-end">
//               <button
//                 className="btn btn-outline-success"
//                 onClick={handleExportToExcel}
//               >
//                 Export to Excel
//               </button>
//             </div>
//           </div>

//           <div className="row mb-4">
//             <div className="col-md-4">
//               <div className="border p-3 rounded bg-success text-white">
//                 <h6>Total Paid Students</h6>
//                 <h4>{summary.paidCount}</h4>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="border p-3 rounded bg-danger text-white">
//                 <h6>Unpaid Students</h6>
//                 <h4>{summary.unpaidCount}</h4>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="border p-3 rounded bg-info text-white">
//                 <h6>Total Fee Collected</h6>
//                 <h4>₹ {summary.totalPaid.toFixed(2)}</h4>
//               </div>
//             </div>
//           </div>

//           <div className="table-responsive">
//             <table className="table table-bordered table-striped">
//               <thead className="table-primary">
//                 <tr>
//                   <th>S.No</th>
//                   <th>Student Name</th>
//                   <th>Admission No</th>
//                   <th>Class</th>
//                   <th>Father Name</th>
//                   <th>Mobile No</th>

//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredStudents.map((student, idx) => {
//                   const admNo = student.admissionNumber || `ADM${idx + 1}`;
//                   const feeData = payments[admNo] || {};
//                   return (
//                     <tr key={admNo}>
//                       <td>{idx + 1}</td>
//                       <td>{`${student.firstName} ${student.middleName || ""} ${student.lastName}`}</td>
//                       <td>{admNo}</td>
//                       <td>{student.studentClass || "-"}</td>
//                       <td>{student.fatherName}</td>
//                       <td>{student.preferredNo}</td>

//                       <td>
//                         {/* <button className="btn btn-sm btn-success me-1" onClick={() => handleSave(admNo)}>Save</button>
//                         {feeData.status === "Paid" && (
//                           <button
//                             className="btn btn-sm btn-primary"
//                             onClick={() => setSelectedReceipt({ ...student, ...feeData, receiptNo: `RCPT-${admNo}-${feeData.date}` })}
//                           >
//                             Print
//                           </button>
//                         )} */}
//                         <button
//                           className="btn btn-success"
//                           onClick={() => handleNavigate(student.id)}
//                         >
//                           Pay Admission Fee
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//                 {filteredStudents.length === 0 && (
//                   <tr>
//                     <td colSpan="9" className="text-center text-danger">
//                       No confirmed student data found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {selectedReceipt && (
//         <div style={{ display: "none" }}>
//           <div ref={receiptRef}>
//             <h2>Jamia Public School</h2>
//             <div className="line" />
//             <h4>Fee Payment Receipt</h4>
//             <p>
//               <strong>Receipt No:</strong> {selectedReceipt.receiptNo}
//             </p>
//             <p>
//               <strong>Name:</strong> {selectedReceipt.firstName}{" "}
//               {selectedReceipt.middleName} {selectedReceipt.lastName}
//             </p>
//             <p>
//               <strong>Admission No:</strong> {selectedReceipt.admissionNumber}
//             </p>
//             <p>
//               <strong>Class:</strong> {selectedReceipt.class}
//             </p>
//             <p>
//               <strong>Amount Paid:</strong> ₹ {selectedReceipt.amount}
//             </p>
//             <p>
//               <strong>Payment Date:</strong> {selectedReceipt.date}
//             </p>
//             <p>
//               <strong>Mode:</strong> {selectedReceipt.mode}
//             </p>
//             <div className="line" />
//             <p>Signature: ___________________</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdmissionFeePayment;


import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileExcel, FaSearch, FaMoneyBillWave } from "react-icons/fa";
import * as XLSX from "xlsx";
import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";


const AdmissionFeePayment = () => {
  const navigate = useNavigate();

  // const { standards, sessions } = useMasters();

  const [payments, setPayments] = useState({});
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const receiptRef = useRef(null);

  const PRIMARY = "rgb(30, 58, 138)";

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  /* ================= NAVIGATION ================= */

  const handleNavigate = (id) => {
    navigate(`/admission/fee/${id}`);
  };

  /* ================= LOAD LOCAL PAYMENTS ================= */

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("AdmissionFeePayments")) || {};

    setPayments(stored);
  }, []);

  /* ================= FETCH APPROVED STUDENTS ================= */

  useEffect(() => {
    if (!user?.schoolId || !token) return;

    setLoading(true);

    axios
      .get(`/api/admissions/school?schoolId=${user.schoolId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Approved admission:", res.data);

        const approved = (res.data || []).filter(
          (item) => item.status?.toUpperCase() === "APPROVED"
        );

        setStudentData(approved);
      })
      .catch((error) => {
        console.error("Admission fetch error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.schoolId, token]);

  /* ================= PRINT RECEIPT ================= */

  useEffect(() => {
    if (selectedReceipt) {
      setTimeout(() => {
        handlePrintReceipt();
        setSelectedReceipt(null);
      }, 100);
    }
  }, [selectedReceipt]);

  const handlePrintReceipt = () => {
    if (!receiptRef.current) return;

    const printWindow = window.open(
      "",
      "PRINT",
      "height=650,width=900"
    );

    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Fee Receipt</title>

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              color: #222;
            }

            h2,
            h4 {
              margin: 5px 0;
            }

            .line {
              border-top: 1px dashed #000;
              margin: 15px 0;
            }
          </style>
        </head>

        <body>
          ${receiptRef.current.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  /* ================= HANDLE PAYMENT FIELD ================= */

  const handleChange = (e, admissionNo, field) => {
    const value = e.target.value;

    setPayments((prev) => ({
      ...prev,
      [admissionNo]: {
        ...prev[admissionNo],
        [field]: value,
      },
    }));
  };

  /* ================= EXPORT EXCEL ================= */

  const handleExportToExcel = () => {
    if (filteredStudents.length === 0) {
      alert("No student data available for export.");
      return;
    }

    const exportData = filteredStudents.map((student, index) => {
      const admNo =
        student.admissionNumber || `ADM${index + 1}`;

      const payment = payments[admNo] || {};

      return {
        "S.No": index + 1,
        "Student Name": `${student.firstName || ""} ${
          student.middleName || ""
        } ${student.lastName || ""}`.trim(),
        "Admission No": admNo,
        Class: student.studentClass || "-",
        Session: student.academicYear || "-",
        "Father Name": student.fatherName || "-",
        "Mobile No":
          student.preferredNo ||
          student.fatherMobile ||
          "-",
        Amount: payment.amount || 0,
        Mode: payment.mode || "-",
        Date: payment.date || "-",
        Status: payment.status || "Unpaid",
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Admission Fee Payments"
    );

    XLSX.writeFile(
      workbook,
      "Admission_Fee_Payment_List.xlsx"
    );
  };

  /* ================= SUMMARY ================= */

  const summary = studentData.reduce(
    (acc, student, idx) => {
      const admNo =
        student.admissionNumber || `ADM${idx + 1}`;

      const data = payments[admNo] || {};

      if (data.status === "Paid") {
        acc.paidCount += 1;
        acc.totalPaid += parseFloat(data.amount || 0);
      } else {
        acc.unpaidCount += 1;
      }

      return acc;
    },
    {
      paidCount: 0,
      unpaidCount: 0,
      totalPaid: 0,
    }
  );

  /* ================= SEARCH ================= */

  const filteredStudents = studentData.filter((student) => {
    const fullName = `
      ${student.firstName || ""}
      ${student.middleName || ""}
      ${student.lastName || ""}
    `.toLowerCase();

    const admissionNo =
      student.admissionNumber?.toLowerCase() || "";

    const fatherName =
      student.fatherName?.toLowerCase() || "";

    const mobile =
      student.preferredNo?.toLowerCase() ||
      student.fatherMobile?.toLowerCase() ||
      "";

    const search = searchTerm.toLowerCase();

    return (
      fullName.includes(search) ||
      admissionNo.includes(search) ||
      fatherName.includes(search) ||
      mobile.includes(search)
    );
  });

  return (
    <>
      {/* ================= PAGE HEADER ================= */}

      <div
        className="row shadow"
        style={{
          backgroundColor: "white",
          margin: "10px",
          minHeight: "70px",
          borderRadius: "6px",
          padding: "10px 15px",
          color: "black",
          borderLeft: `4px solid ${PRIMARY}`,
        }}
      >
        <h6 className="mb-1">
          <strong>Admission Fee Payment</strong>
        </h6>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "#555",
                }}
              >
                Home
              </a>
            </li>

            <li
              className="breadcrumb-item active"
              aria-current="page"
              style={{
                color: PRIMARY,
                fontWeight: "500",
              }}
            >
              Admission Fee Payment
            </li>
          </ol>
        </nav>
      </div>

      {/* ================= MAIN CARD ================= */}

      <div
        className="mt-3 mx-2 mb-4 bg-white rounded shadow p-3"
        style={{
          borderTop: `3px solid ${PRIMARY}`,
        }}
      >
        {/* ================= TITLE ================= */}

        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <div>
            <h5
              className="mb-1"
              style={{
                color: PRIMARY,
                fontWeight: "600",
              }}
            >
              Admission Fee Payment
            </h5>

            <small className="text-muted">
              Manage admission fee payments for approved students
            </small>
          </div>

          <span
            className="badge rounded-pill px-3 py-2 mt-2 mt-md-0"
            style={{
              backgroundColor: "#e8eefc",
              color: PRIMARY,
              fontSize: "13px",
            }}
          >
            Approved Students: {studentData.length}
          </span>
        </div>

        {/* ================= SEARCH + EXPORT ================= */}

        <div
          className="p-3 rounded mb-4"
          style={{
            backgroundColor: "#f8f9fc",
            border: "1px solid #e9ecef",
          }}
        >
          <div className="row align-items-center g-2">
            {/* SEARCH */}

            <div className="col-lg-6 col-md-7">
              <div className="position-relative">
                <FaSearch
                  style={{
                    position: "absolute",
                    left: "13px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#777",
                  }}
                />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, admission no, father name or mobile..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  style={{
                    paddingLeft: "38px",
                    borderRadius: "6px",
                  }}
                />
              </div>
            </div>

            {/* EXPORT */}

            <div className="col-lg-6 col-md-5">
              <div className="d-flex justify-content-md-end">
                <button
                  type="button"
                  className="btn text-white"
                  onClick={handleExportToExcel}
                  style={{
                    backgroundColor: "#198754",
                    borderRadius: "5px",
                  }}
                >
                  <FaFileExcel className="me-2" />
                  Export Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div className="row g-3 mb-4">
          {/* PAID */}

          <div className="col-xl-4 col-md-6">
            <div
              className="h-100 p-3 rounded shadow"
              style={{
                background:
                  "linear-gradient(135deg, #198754, #20c997)",
                color: "white",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small
                    style={{
                      opacity: 0.9,
                    }}
                  >
                    Total Paid Students
                  </small>

                  <h3 className="fw-bold mb-0 mt-1">
                    {summary.paidCount}
                  </h3>
                </div>

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor:
                      "rgba(255,255,255,0.18)",
                  }}
                >
                  <FaMoneyBillWave size={21} />
                </div>
              </div>
            </div>
          </div>

          {/* UNPAID */}

          <div className="col-xl-4 col-md-6">
            <div
              className="h-100 p-3 rounded shadow"
              style={{
                background:
                  "linear-gradient(135deg, #dc3545, #e35d6a)",
                color: "white",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small
                    style={{
                      opacity: 0.9,
                    }}
                  >
                    Unpaid Students
                  </small>

                  <h3 className="fw-bold mb-0 mt-1">
                    {summary.unpaidCount}
                  </h3>
                </div>

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor:
                      "rgba(255,255,255,0.18)",
                  }}
                >
                  <FaMoneyBillWave size={21} />
                </div>
              </div>
            </div>
          </div>

          {/* TOTAL COLLECTION */}

          <div className="col-xl-4 col-md-12">
            <div
              className="h-100 p-3 rounded shadow"
              style={{
                background:
                  "linear-gradient(135deg, #0dcaf0, #0d6efd)",
                color: "white",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small
                    style={{
                      opacity: 0.9,
                    }}
                  >
                    Total Fee Collected
                  </small>

                  <h3 className="fw-bold mb-0 mt-1">
                    ₹ {summary.totalPaid.toFixed(2)}
                  </h3>
                </div>

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor:
                      "rgba(255,255,255,0.18)",
                  }}
                >
                  <FaMoneyBillWave size={21} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div className="table-responsive">
          <table
            className="table table-bordered table-hover align-middle mb-0"
            style={{
              minWidth: "950px",
            }}
          >
            <thead
              style={{
                backgroundColor: PRIMARY,
                color: "white",
              }}
            >
              <tr>
                <th className="text-center">S.No</th>
                <th>Student Name</th>
                <th>Admission No</th>
                <th>Class</th>
                <th>Session</th>
                <th>Father Name</th>
                <th>Mobile No</th>
                <th>Payment Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-5"
                  >
                    <div
                      className="spinner-border"
                      role="status"
                      style={{
                        color: PRIMARY,
                        width: "28px",
                        height: "28px",
                      }}
                    >
                      <span className="visually-hidden">
                        Loading...
                      </span>
                    </div>

                    <div className="mt-2 text-muted">
                      Loading approved students...
                    </div>
                  </td>
                </tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student, idx) => {
                  const admNo =
                    student.admissionNumber ||
                    `ADM${idx + 1}`;

                  const feeData =
                    payments[admNo] || {};

                  const isPaid =
                    feeData.status === "Paid";

                  return (
                    <tr key={admNo}>
                      {/* S.NO */}

                      <td className="text-center fw-semibold">
                        {idx + 1}
                      </td>

                      {/* NAME */}

                      <td>
                        <div className="fw-semibold">
                          {[
                            student.firstName,
                            student.middleName,
                            student.lastName,
                          ]
                            .filter(Boolean)
                            .join(" ") || "-"}
                        </div>
                      </td>

                      {/* ADMISSION NUMBER */}

                      <td>
                        <span
                          style={{
                            color: PRIMARY,
                            fontWeight: "600",
                          }}
                        >
                          {admNo}
                        </span>
                      </td>

                      {/* CLASS */}

                      <td>
                        {student.studentClass || "-"}
                      </td>

                      {/* SESSION */}

                      <td>
                        {student.academicYear || "-"}
                      </td>

                      {/* FATHER */}

                      <td>
                        {student.fatherName || "-"}
                      </td>

                      {/* MOBILE */}

                      <td>
                        {student.preferredNo ||
                          student.fatherMobile ||
                          "-"}
                      </td>

                      {/* STATUS */}

                      <td>
                        {isPaid ? (
                          <span
                            className="badge rounded-pill px-3 py-2"
                            style={{
                              backgroundColor: "#d1e7dd",
                              color: "#146c43",
                            }}
                          >
                            PAID
                          </span>
                        ) : (
                          <span
                            className="badge rounded-pill px-3 py-2"
                            style={{
                              backgroundColor: "#f8d7da",
                              color: "#b02a37",
                            }}
                          >
                            UNPAID
                          </span>
                        )}
                      </td>

                      {/* ACTION */}

                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-sm text-white"
                          onClick={() =>
                            handleNavigate(student.id)
                          }
                          style={{
                            backgroundColor: PRIMARY,
                            borderRadius: "5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <FaMoneyBillWave className="me-2" />
                          Pay Admission Fee
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-5"
                  >
                    <div
                      style={{
                        fontSize: "38px",
                        color: "#adb5bd",
                      }}
                    >
                      ₹
                    </div>

                    <h6 className="text-muted mb-1">
                      No approved students found
                    </h6>

                    <small className="text-secondary">
                      No student matches your search.
                    </small>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= TABLE FOOTER ================= */}

        {!loading && filteredStudents.length > 0 && (
          <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
            <small className="text-muted">
              Showing{" "}
              <strong>{filteredStudents.length}</strong>{" "}
              approved student
              {filteredStudents.length !== 1
                ? "s"
                : ""}
            </small>

            <small
              style={{
                color: PRIMARY,
                fontWeight: "500",
              }}
            >
              Total Collected: ₹{" "}
              {summary.totalPaid.toFixed(2)}
            </small>
          </div>
        )}
      </div>

      {/* ================= HIDDEN RECEIPT ================= */}

      {selectedReceipt && (
        <div style={{ display: "none" }}>
          <div ref={receiptRef}>
            <h2>Jamia Public School</h2>

            <div className="line" />

            <h4>Fee Payment Receipt</h4>

            <p>
              <strong>Receipt No:</strong>{" "}
              {selectedReceipt.receiptNo}
            </p>

            <p>
              <strong>Name:</strong>{" "}
              {selectedReceipt.firstName}{" "}
              {selectedReceipt.middleName}{" "}
              {selectedReceipt.lastName}
            </p>

            <p>
              <strong>Admission No:</strong>{" "}
              {selectedReceipt.admissionNumber}
            </p>

            <p>
              <strong>Class:</strong>{" "}
              {selectedReceipt.studentClass}
            </p>

            <p>
              <strong>Amount Paid:</strong> ₹{" "}
              {selectedReceipt.amount}
            </p>

            <p>
              <strong>Payment Date:</strong>{" "}
              {selectedReceipt.date}
            </p>

            <p>
              <strong>Mode:</strong>{" "}
              {selectedReceipt.mode}
            </p>

            <div className="line" />

            <p>
              Signature: ___________________
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdmissionFeePayment;

