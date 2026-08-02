import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import axios from "../../api/axiosInstance";

const AdmissionFeePayment = () => {
  const navigate = useNavigate();
  const {standards, sessions} = useMasters();

  const handleNavigate = (id) => navigate(`/admission/fee/${id}`);
  const [payments, setPayments] = useState({});
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const receiptRef = useRef(null);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("AdmissionFeePayments")) || {};
    setPayments(stored);
  }, []);

  useEffect(() => {
    if (selectedReceipt) {
      setTimeout(() => {
        handlePrintReceipt();
        setSelectedReceipt(null);
      }, 100);
    }
  }, [selectedReceipt]);

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

  const [StudentData, setStudentData] = useState([]);
  //   const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user?.schoolId || !token) return;

    setLoading(true);

    axios
      .get(`/api/admissions/school?schoolId=${user.schoolId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("approved admission", res);
        const approved = (res.data || []).filter(
          (item) => item.status === "APPROVED",
        );
        setStudentData(approved);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.schoolId, token]);

  console.log("setStudentData", StudentData);

  const handlePrintReceipt = () => {
    if (receiptRef.current) {
      const printWindow = window.open("", "PRINT", "height=650,width=900");
      printWindow.document.write(`
        <html>
          <head>
            <title>Fee Receipt</title>
            <style>
              body { font-family: Arial; padding: 20px; }
              h2, h4 { margin: 5px 0; }
              .line { border-top: 1px dashed #000; margin: 10px 0; }
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
    }
  };

  const handleExportToExcel = () => {
    const exportData = Object.entries(payments).map(([admNo, payment]) => {
      const student =
        StudentData.find((s) => s.admissionNumber === admNo) || {};
      return {
        "Admission No": admNo,
        "Student Name": `${student.firstName || ""} ${student.middleName || ""} ${student.lastName || ""}`,
        Class: student.class,
        Amount: payment.amount,
        Mode: payment.mode,
        Date: payment.date,
        Status: payment.status,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fee Payments");
    XLSX.writeFile(workbook, "FeePayments.xlsx");
  };

  const summary = StudentData.reduce(
    (acc, student, idx) => {
      const admNo = student.admissionNumber || `ADM${idx + 1}`;
      const data = payments[admNo] || {};

      if (data.status === "Paid") {
        acc.paidCount += 1;
        acc.totalPaid += parseFloat(data.amount || 0);
      } else if (data.status === "Unpaid") {
        acc.unpaidCount += 1;
      }
      return acc;
    },
    { paidCount: 0, unpaidCount: 0, totalPaid: 0 },
  );

  const filteredStudents = StudentData.filter((student) => {
    const fullName =
      `${student.firstName} ${student.middleName || ""} ${student.lastName}`.toLowerCase();
    const admissionNo = student.admissionNumber?.toLowerCase() || "";
    return fullName.includes(searchTerm) || admissionNo.includes(searchTerm);
  });

  return (
    <>
      <div
        className="row shadow"
        style={{
          backgroundColor: "white",
          margin: "10px",
          height: "67px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6>
          <strong>Admission Fee Payment</strong>
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" style={{ textDecoration: "none", color: "black" }}>
                Admission Fee Payment
              </a>
            </li>
          </ol>
        </nav>
      </div>

      <div className="container mt-4">
        <div className="shadow p-4 bg-white rounded">
          <h4 className="text-primary mb-4">Admission Fee Payment</h4>

          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or admission number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>
            <div className="col-md-6 text-end">
              <button
                className="btn btn-outline-success"
                onClick={handleExportToExcel}
              >
                Export to Excel
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <div className="border p-3 rounded bg-success text-white">
                <h6>Total Paid Students</h6>
                <h4>{summary.paidCount}</h4>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border p-3 rounded bg-danger text-white">
                <h6>Unpaid Students</h6>
                <h4>{summary.unpaidCount}</h4>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border p-3 rounded bg-info text-white">
                <h6>Total Fee Collected</h6>
                <h4>₹ {summary.totalPaid.toFixed(2)}</h4>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-primary">
                <tr>
                  <th>S.No</th>
                  <th>Student Name</th>
                  <th>Admission No</th>
                  <th>Class</th>
                  <th>Father Name</th>
                  <th>Mobile No</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, idx) => {
                  const admNo = student.admissionNumber || `ADM${idx + 1}`;
                  const feeData = payments[admNo] || {};
                  return (
                    <tr key={admNo}>
                      <td>{idx + 1}</td>
                      <td>{`${student.firstName} ${student.middleName || ""} ${student.lastName}`}</td>
                      <td>{admNo}</td>
                      <td>{student.studentClass || "-"}</td>
                      <td>{student.fatherName}</td>
                      <td>{student.preferredNo}</td>

                      <td>
                        {/* <button className="btn btn-sm btn-success me-1" onClick={() => handleSave(admNo)}>Save</button>
                        {feeData.status === "Paid" && (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => setSelectedReceipt({ ...student, ...feeData, receiptNo: `RCPT-${admNo}-${feeData.date}` })}
                          >
                            Print
                          </button>
                        )} */}
                        <button
                          className="btn btn-success"
                          onClick={() => handleNavigate(student.id)}
                        >
                          Pay Admission Fee
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center text-danger">
                      No confirmed student data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedReceipt && (
        <div style={{ display: "none" }}>
          <div ref={receiptRef}>
            <h2>Jamia Public School</h2>
            <div className="line" />
            <h4>Fee Payment Receipt</h4>
            <p>
              <strong>Receipt No:</strong> {selectedReceipt.receiptNo}
            </p>
            <p>
              <strong>Name:</strong> {selectedReceipt.firstName}{" "}
              {selectedReceipt.middleName} {selectedReceipt.lastName}
            </p>
            <p>
              <strong>Admission No:</strong> {selectedReceipt.admissionNumber}
            </p>
            <p>
              <strong>Class:</strong> {selectedReceipt.class}
            </p>
            <p>
              <strong>Amount Paid:</strong> ₹ {selectedReceipt.amount}
            </p>
            <p>
              <strong>Payment Date:</strong> {selectedReceipt.date}
            </p>
            <p>
              <strong>Mode:</strong> {selectedReceipt.mode}
            </p>
            <div className="line" />
            <p>Signature: ___________________</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdmissionFeePayment;
