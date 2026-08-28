import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import {
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaSearch,
  FaSyncAlt,
  FaMoneyBillWave,
  FaReceipt,
  FaPercentage,
  FaExclamationTriangle,
  FaUndo,
  FaClock,
  FaRupeeSign,
  FaCheckCircle,
} from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance";

const DailyFeeCollection = () => {
  const token = localStorage.getItem("token");

  const [standards, setStandards] = useState([]);
  const [section, setSection] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [searchText, setSearchText] = useState("");

  const [dailyCollection, setDailyCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStandards();
    loadSection();
  }, []);

  useEffect(() => {
    loadDailyCollection();
  }, [selectedDate]);

  // ==========================
  // Filter Data
  // ==========================

  const filteredData = useMemo(() => {
    return dailyCollection.filter((item) => {
      const matchClass =
        selectedClass === "" || item.studentClass === selectedClass;

      const matchSection =
        selectedSection === "" || item.section === selectedSection;

      const matchMode =
        paymentMode === "" || item.paymentMode === paymentMode;

      const search = searchText.toLowerCase().trim();

      const matchSearch =
        search === "" ||
        item.studentName?.toLowerCase().includes(search) ||
        item.admissionNumber?.toLowerCase().includes(search) ||
        item.receiptNo?.toLowerCase().includes(search);

      return (
        matchClass &&
        matchSection &&
        matchMode &&
        matchSearch
      );
    });
  }, [
    dailyCollection,
    selectedClass,
    selectedSection,
    paymentMode,
    searchText,
  ]);

  // ==========================
  // Summary
  // ==========================

  const totalCollection = filteredData.reduce(
    (sum, item) => sum + Number(item.paidAmount || 0),
    0
  );

  const totalDiscount = filteredData.reduce(
    (sum, item) => sum + Number(item.discountAmount || 0),
    0
  );

  const totalFine = filteredData.reduce(
    (sum, item) => sum + Number(item.fineAmount || 0),
    0
  );

  const totalReceipts = filteredData.length;

  // ==========================
  // Load Standards
  // ==========================

  const loadStandards = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/master/standard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStandards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Load Sections
  // ==========================

  const loadSection = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/master/section",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSection(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Load Collection
  // ==========================

  const loadDailyCollection = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/api/student-fee/payment/report/daily",
        {
          params: {
            date: selectedDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDailyCollection(res.data || []);
    } catch (err) {
      console.log(err.response?.data);
      setDailyCollection([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Search
  // ==========================

  const handleSearch = () => {
    loadDailyCollection();
  };

  // ==========================
  // Reset
  // ==========================

  const handleReset = () => {
    setSelectedDate("");
    setSelectedClass("");
    setSelectedSection("");
    setPaymentMode("");
    setSearchText("");

    setTimeout(() => {
      loadDailyCollection();
    }, 0);
  };

  // ==========================
  // Print
  // ==========================

  const handlePrint = () => {
    window.print();
  };

  // ==========================
  // PDF
  // ==========================

  const downloadPDF = () => {
    const doc = new jsPDF("landscape");

    doc.setFontSize(16);
    doc.text("Daily Fee Collection Report", 14, 15);

    doc.setFontSize(10);
    doc.text(
      `Total Collection: Rs. ${totalCollection.toLocaleString()}`,
      14,
      21
    );

    autoTable(doc, {
      startY: 27,

      head: [
        [
          "#",
          "Receipt",
          "Date",
          "Admission",
          "Student",
          "Class",
          "Fee",
          "Month",
          "Paid",
          "Mode",
          "Status",
        ],
      ],

      body: filteredData.map((item, index) => [
        index + 1,
        item.receiptNo,
        item.paymentDate,
        item.admissionNumber,
        item.studentName,
        `${item.studentClass}${
          item.section ? " (" + item.section + ")" : ""
        }`,
        item.feeName,
        item.month,
        `Rs. ${item.paidAmount || 0}`,
        item.paymentMode,
        item.status,
      ]),

      styles: {
        fontSize: 8,
        cellPadding: 2,
      },

      headStyles: {
        fillColor: [13, 110, 253],
        textColor: 255,
      },
    });

    doc.save("Daily_Fee_Collection_Report.pdf");
  };

  // ==========================
  // Excel
  // ==========================

  const exportExcel = () => {
    const data = filteredData.map((item, index) => ({
      "S.No": index + 1,
      "Receipt No": item.receiptNo,
      Date: item.paymentDate,
      Time: item.paymentTime,
      Admission: item.admissionNumber,
      Student: item.studentName,
      Class: item.studentClass,
      Section: item.section,
      Fee: item.feeName,
      Month: item.month,
      Amount: item.amount,
      Discount: item.discountAmount,
      Fine: item.fineAmount,
      Paid: item.paidAmount,
      "Payment Mode": item.paymentMode,
      "Collected By": item.collectedBy,
      Status: item.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Daily Collection"
    );

    XLSX.writeFile(
      workbook,
      "Daily_Fee_Collection_Report.xlsx"
    );
  };

  return (
    <>
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div
        className="bg-white shadow rounded-3 p-3 mb-3 mt-3"
        style={{
          borderLeft: "5px solid #0d6efd",
        }}
      >
        <h4 className="mb-1 fw-bold text-dark">
          Daily Fee Collection Report
        </h4>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              Home
            </li>

            <li className="breadcrumb-item">
              Fee
            </li>

            <li className="breadcrumb-item active text-primary">
              Daily Collection Report
            </li>
          </ol>
        </nav>
      </div>

     

       <div className="row g-3 mb-4">
    
            {/* Total Amount */}
    
            <div className="col-xl-3 col-md-6">
              <div className="premium-stat-card stat-blue shadow">
                <div className="stat-icon">
                  <FaRupeeSign />
                </div>
    
                <div className="stat-content">
                  <span>Total Collection</span>
    
                  <h3>
                    ₹{totalCollection.toLocaleString("en-IN")}
                  </h3>
    
                  <small>
                    Total generated collection
                  </small>
                </div>
              </div>
            </div>
    
            {/* Collection */}
    
            <div className="col-xl-3 col-md-6">
              <div className="premium-stat-card stat-green shadow">
                <div className="stat-icon">
                  <FaCheckCircle />
                </div>
    
                <div className="stat-content">
                  <span>Total Receipts</span>
    
                  <h3>
                    ₹
                    {totalReceipts.toLocaleString("en-IN")}
                  </h3>
    
                  <small>
                    Successfully collected
                  </small>
                </div>
              </div>
            </div>
    
            {/* Discount */}
    
            <div className="col-xl-3 col-md-6">
              <div className="premium-stat-card stat-orange shadow">
                <div className="stat-icon">
                  <FaUndo />
                </div>
    
                <div className="stat-content">
                  <span>Total Discount</span>
    
                  <h3>
                    ₹
                    {totalDiscount.toLocaleString("en-IN")}
                  </h3>
    
                  <small>
                    Discount given
                  </small>
                </div>
              </div>
            </div>
    
            {/* Fine */}
    
            <div className="col-xl-3 col-md-6">
              <div className="premium-stat-card stat-red shadow">
                <div className="stat-icon">
                  <FaClock />
                </div>
    
                <div className="stat-content">
                  <span>Total Fine</span>
    
                  <h3>
                    ₹{totalFine.toLocaleString("en-IN")}
                  </h3>
    
                  <small>
                    Late payment fine
                  </small>
                </div>
              </div>
            </div>
          </div>

      {/* =================================================
          FILTER CARD
      ================================================= */}

      <div className="card border-0 shadow mb-3">

        <div
          className="card-header bg-white "
          
        >
          <div className="d-flex align-items-center justify-content-between">

            <div>
              <h5 className="mb-0 fw-bold">
                Daily Fee Collection
              </h5>

              <small className="opacity-75">
                Filter collection records
              </small>
            </div>

            <FaMoneyBillWave size={24} />

          </div>
        </div>

        <div className="card-body">

          <div className="row g-3">

            {/* Date */}

            <div className="col-xl-2 col-md-6">
              <label className="form-label fw-semibold">
                Date
              </label>

              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={(e) =>
                  setSelectedDate(e.target.value)
                }
              />
            </div>

            {/* Search */}

            <div className="col-xl-3 col-md-6">
              <label className="form-label fw-semibold">
                Search Student
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Admission / Name / Receipt"
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
              />
            </div>

            {/* Class */}

            <div className="col-xl-2 col-md-6">
              <label className="form-label fw-semibold">
                Class
              </label>

              <select
                className="form-select"
                value={selectedClass}
                onChange={(e) =>
                  setSelectedClass(e.target.value)
                }
              >
                <option value="">
                  All Classes
                </option>

                {standards.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Section */}

            <div className="col-xl-2 col-md-6">
              <label className="form-label fw-semibold">
                Section
              </label>

              <select
                className="form-select"
                value={selectedSection}
                onChange={(e) =>
                  setSelectedSection(e.target.value)
                }
              >
                <option value="">
                  All Sections
                </option>

                {section.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Mode */}

            <div className="col-xl-3 col-md-6">
              <label className="form-label fw-semibold">
                Payment Mode
              </label>

              <select
                className="form-select"
                value={paymentMode}
                onChange={(e) =>
                  setPaymentMode(e.target.value)
                }
              >
                <option value="">
                  All Payment Modes
                </option>

                <option value="Cash">
                  Cash
                </option>

                <option value="UPI">
                  UPI
                </option>

                <option value="Online">
                  Online
                </option>

                <option value="Cheque">
                  Cheque
                </option>

                <option value="Card">
                  Card
                </option>
              </select>
            </div>

          </div>

          {/* Buttons */}

          <div className="d-flex justify-content-end flex-wrap gap-2 mt-4">

            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Loading...
                </>
              ) : (
                <>
                  <FaSearch className="me-2" />
                  Search
                </>
              )}
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={handleReset}
            >
              <FaSyncAlt className="me-2" />
              Reset
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={downloadPDF}
            >
              <FaFilePdf className="me-2" />
              PDF
            </button>

            <button
              className="btn btn-outline-success"
              onClick={exportExcel}
            >
              <FaFileExcel className="me-2" />
              Excel
            </button>

            <button
              className="btn btn-outline-dark"
              onClick={handlePrint}
            >
              <FaPrint className="me-2" />
              Print
            </button>

          </div>

        </div>
      </div>

      {/* =================================================
          COLLECTION TABLE
      ================================================= */}

      <div className="card border-0 shadow">

        <div
          className="card-header bg-white  d-flex justify-content-between align-items-center"
          
        >

          <div>
            <h5 className="mb-0 fw-bold">
              Collection Records
            </h5>

            <small className="opacity-75">
              Daily fee payment details
            </small>
          </div>

          <span className="badge bg-white text-primary px-3 py-2">
            Total Records : {filteredData.length}
          </span>

        </div>

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-bordered table-hover table-striped align-middle mb-0">

              <thead className="table-primary">

                <tr>
                  <th>#</th>
                  <th>Receipt No</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Admission No</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Fee Name</th>
                  <th>Month</th>
                  <th>Amount</th>
                  <th>Discount</th>
                  <th>Fine</th>
                  <th>Paid Amount</th>
                  <th>Payment Mode</th>
                  <th>Collected By</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td
                      colSpan="16"
                      className="text-center py-5"
                    >
                      <div className="spinner-border text-primary" />

                      <div className="mt-2 text-muted">
                        Loading collection records...
                      </div>
                    </td>
                  </tr>

                ) : filteredData.length > 0 ? (

                  filteredData.map((item, index) => (

                    <tr key={item.id || index}>

                      <td className="fw-semibold">
                        {index + 1}
                      </td>

                      <td>
                        <span className="fw-bold text-primary">
                          {item.receiptNo}
                        </span>
                      </td>

                      <td>
                        {item.paymentDate
                          ? new Date(
                              item.paymentDate
                            ).toLocaleDateString("en-IN")
                          : "-"}
                      </td>

                      <td>
                        {item.paymentTime
                          ? new Date(
                              item.paymentTime
                            ).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                              }
                            )
                          : "-"}
                      </td>

                      <td>
                        {item.admissionNumber}
                      </td>

                      <td className="fw-semibold">
                        {item.studentName}
                      </td>

                      <td>
                        {item.studentClass}
                        {item.section
                          ? ` (${item.section})`
                          : ""}
                      </td>

                      <td>
                        {item.feeName}
                      </td>

                      <td>
                        {item.month}
                      </td>

                      <td>
                        ₹ {item.amount || 0}
                      </td>

                      <td className="text-warning fw-bold">
                        ₹ {item.discountAmount || 0}
                      </td>

                      <td className="text-danger fw-bold">
                        ₹ {item.fineAmount || 0}
                      </td>

                      <td className="text-success fw-bold">
                        ₹ {item.paidAmount || 0}
                      </td>

                      <td>
                        <span className="badge bg-info text-dark">
                          {item.paymentMode}
                        </span>
                      </td>

                      <td>
                        {item.collectedBy}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            item.status === "SUCCESS"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td
                      colSpan="16"
                      className="text-center py-5"
                    >

                      <div
                        className="text-danger mb-2"
                        style={{
                          fontSize: "35px",
                        }}
                      >
                        <FaReceipt />
                      </div>

                      <h6 className="text-danger fw-bold">
                        No Record Found
                      </h6>

                      <small className="text-muted">
                        No fee collection record matches
                        your selected filters.
                      </small>

                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>
        </div>
      </div>

      {/* =================================================
          REPORT FOOTER
      ================================================= */}

      <div className="card border-0 shadow mt-3">

        <div className="card-body">

          <div className="row align-items-center">

            <div className="col-md-6">

              <h6 className="mb-1">
                Showing{" "}
                <span className="text-primary fw-bold">
                  {filteredData.length}
                </span>{" "}
                record(s)
              </h6>

              <small className="text-muted">
                Daily Fee Collection Report
              </small>

            </div>

            <div className="col-md-6 text-md-end mt-3 mt-md-0">

              <button
                className="btn btn-outline-primary me-2"
                onClick={loadDailyCollection}
                disabled={loading}
              >
                <FaSyncAlt className="me-2" />
                Refresh
              </button>

              <button
                className="btn btn-outline-dark"
                onClick={handlePrint}
              >
                <FaPrint className="me-2" />
                Print Report
              </button>

            </div>

          </div>

          <hr />

          <div className="row text-center">

            <div className="col-md-3 border-end">

              <small className="text-muted">
                Total Collection
              </small>

              <h4 className="text-success fw-bold mt-1">
                ₹ {totalCollection.toLocaleString()}
              </h4>

            </div>

            <div className="col-md-3 border-end">

              <small className="text-muted">
                Total Discount
              </small>

              <h4 className="text-warning fw-bold mt-1">
                ₹ {totalDiscount.toLocaleString()}
              </h4>

            </div>

            <div className="col-md-3 border-end">

              <small className="text-muted">
                Total Fine
              </small>

              <h4 className="text-danger fw-bold mt-1">
                ₹ {totalFine.toLocaleString()}
              </h4>

            </div>

            <div className="col-md-3">

              <small className="text-muted">
                Total Receipts
              </small>

              <h4 className="text-primary fw-bold mt-1">
                {totalReceipts}
              </h4>

            </div>

          </div>

        </div>
      </div>

      {/* =================================================
          PRINT CSS
      ================================================= */}

      <style>
        {`
        
          @media print {

            body {
              background: white !important;
            }

            .card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }

            button,
            .btn {
              display: none !important;
            }

            .card-header {
              color: black !important;
              background: white !important;
            }

            table {
              font-size: 10px !important;
            }

            .shadow,
            .shadow {
              box-shadow: none !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default DailyFeeCollection;