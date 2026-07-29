

import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
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

  useEffect(() => {
    loadStandards();
    loadSection();
  }, []);

  useEffect(() => {
    loadDailyCollection();
  }, [selectedDate]);

  const filteredData = useMemo(() => {
    return dailyCollection.filter((item) => {
      const matchClass =
        selectedClass === "" || item.studentClass === selectedClass;

      const matchSection =
        selectedSection === "" || item.section === selectedSection;

      const matchMode = paymentMode === "" || item.paymentMode === paymentMode;

      const search = searchText.toLowerCase();

      const matchSearch =
        search === "" ||
        item.studentName?.toLowerCase().includes(search) ||
        item.admissionNumber?.toLowerCase().includes(search) ||
        item.receiptNo?.toLowerCase().includes(search);

      return matchClass && matchSection && matchMode && matchSearch;
    });
  }, [
    dailyCollection,
    selectedClass,
    selectedSection,
    paymentMode,
    searchText,
  ]);
  // ==========================
  // Load Standards
  // ==========================
  const loadStandards = async () => {
    try {
      const res = await axiosInstance.get("/api/master/standard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      const res = await axiosInstance.get("/api/master/section", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSection(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Load Daily Collection
  // ==========================
  const loadDailyCollection = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/student-fee/payment/report/daily",
        {
          params: {
            date: selectedDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setDailyCollection(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // ==========================
  // Search Button
  // ==========================
  const handleSearch = () => {
    loadDailyCollection();
  };

  // ==========================
  // Reset Filters
  // ==========================
  const handleReset = () => {
    setSelectedDate("");
    setSelectedClass("");
    setSelectedSection("");
    setPaymentMode("");
    setSearchText("");

    loadDailyCollection();
  };

  // ==========================
  // Print Report
  // ==========================
  const handlePrint = () => {
    window.print();
  };

  // ==========================
  // Download PDF
  // ==========================
  const downloadPDF = () => {
    const doc = new jsPDF("landscape");

    doc.setFontSize(16);
    doc.text("Daily Fee Collection Report", 14, 15);

    autoTable(doc, {
      startY: 22,
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
        `${item.studentClass}${item.section ? " (" + item.section + ")" : ""}`,
        item.feeName,
        item.month,
        item.paidAmount,
        item.paymentMode,
        item.status,
      ]),
    });

    doc.save("Daily_Fee_Collection_Report.pdf");
  };

  // ==========================
  // Export Excel
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

    XLSX.utils.book_append_sheet(workbook, worksheet, "Daily Collection");

    XLSX.writeFile(workbook, "Daily_Fee_Collection_Report.xlsx");
  };

  return (
    <>

     {/* ===========================
        Header
      =========================== */}
      <div
        className="bg-white shadow p-3 mb-3"
       
      >
        <div className="col-md-8">
          <h4 className="mb-1">
            <strong>Daily Fee Collection Report</strong>
          </h4>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">Fee</li>
              <li className="breadcrumb-item active">Daily Collection Report</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* ===========================
        Summary Cards
      =========================== */}

      <div className="row mb-3">
        {/* Total Collection */}

        <div className="col-xl-3 col-md-3 mb-2">
          <div className="card border-0 shadow-sm bg-primary text-white h-100">
            <div className="card-body">
              <small>Total Collection</small>

              <h3 className="mt-2 fw-bold">
                ₹{" "}
                {filteredData
                  .reduce((sum, item) => sum + (item.paidAmount || 0), 0)
                  .toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        {/* Total Receipts */}

        <div className="col-xl-3 col-md-3 mb-3">
          <div className="card border-0 shadow-sm bg-success text-white h-100">
            <div className="card-body">
              <small>Total Receipts</small>

              <h3 className="mt-2 fw-bold">{filteredData.length}</h3>
            </div>
          </div>
        </div>

        {/* Total Discount */}

        <div className="col-xl-3 col-md-3 mb-3">
          <div className="card border-0 shadow-sm bg-warning text-dark h-100">
            <div className="card-body">
              <small>Total Discount</small>

              <h3 className="mt-2 fw-bold">
                ₹{" "}
                {filteredData
                  .reduce((sum, item) => sum + (item.discountAmount || 0), 0)
                  .toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        {/* Total Fine */}

        <div className="col-xl-3 col-md-3 mb-3">
          <div className="card border-0 shadow-sm bg-danger text-white h-100">
            <div className="card-body">
              <small>Total Fine</small>

              <h3 className="mt-2 fw-bold">
                ₹{" "}
                {filteredData
                  .reduce((sum, item) => sum + (item.fineAmount || 0), 0)
                  .toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* ===========================
    Filters
=========================== */}

      <div className="card shadow mb-3">
        <div className="card-header bg-white">
          <h5 className="mb-0">Daily Fee Collection Report</h5>
        </div>

        <div className="card-body">
          <div className="row g-3">
            {/* Date */}

            <div className="col-md-2">
              <label className="form-label fw-semibold">Date</label>

              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* Search */}

            <div className="col-md-3">
              <label className="form-label fw-semibold">Search Student</label>

              <input
                type="text"
                className="form-control"
                placeholder="Admission / Name / Receipt"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* Class */}

            <div className="col-md-2">
              <label className="form-label fw-semibold">Class</label>

              <select
                className="form-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">All Classes</option>

                {standards.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Section */}

            <div className="col-md-2">
              <label className="form-label fw-semibold">Section</label>

              <select
                className="form-select"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="">All Section</option>

                {section.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Mode */}

            <div className="col-md-3">
              <label className="form-label fw-semibold">Payment Mode</label>

              <select
                className="form-select"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option value="">All</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Online">Online</option>
                <option value="Cheque">Cheque</option>
                <option value="Card">Card</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-primary me-2" onClick={handleSearch}>
              🔍 Search
            </button>

            <button className="btn btn-secondary me-2" onClick={handleReset}>
              Reset
            </button>

            <button className="btn btn-danger me-2" onClick={downloadPDF}>
              📄 Download PDF
            </button>

            <button className="btn btn-success me-2" onClick={exportExcel}>
              📊 Export Excel
            </button>

            <button className="btn btn-dark" onClick={handlePrint}>
              🖨 Print
            </button>
          </div>
        </div>
      </div>

      {/* ===========================
        Daily Collection Table
=========================== */}

      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Daily Fee Collection Report</h5>

          <span className="badge bg-primary">
            Total Records : {filteredData.length}
          </span>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover table-striped align-middle">
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
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>

                      <td className="fw-bold text-primary">{item.receiptNo}</td>

                      <td>
                        {new Date(item.paymentDate).toLocaleDateString("en-IN")}
                      </td>

                      <td>
                        {new Date(item.paymentTime).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          },
                        )}
                      </td>

                      <td>{item.admissionNumber}</td>

                      <td>{item.studentName}</td>

                      <td>
                        {item.studentClass}
                        {item.section ? ` (${item.section})` : ""}
                      </td>

                      <td>{item.feeName}</td>

                      <td>{item.month}</td>

                      <td>₹ {item.amount}</td>

                      <td className="text-warning fw-bold">
                        ₹ {item.discountAmount}
                      </td>

                      <td className="text-danger fw-bold">
                        ₹ {item.fineAmount}
                      </td>

                      <td className="text-success fw-bold">
                        ₹ {item.paidAmount}
                      </td>

                      <td>
                        <span className="badge bg-info">
                          {item.paymentMode}
                        </span>
                      </td>

                      <td>{item.collectedBy}</td>

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
                      className="text-center text-danger fw-bold"
                    >
                      No Record Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* ===========================
        Report Footer
=========================== */}

      <div className="card shadow mt-3">
        <div className="card-body">
          <div className="row align-items-center">
            {/* Left */}

            <div className="col-md-6">
              <h6 className="mb-1">
                Showing
                <span className="text-primary fw-bold">
                  {" "}
                  {filteredData.length}{" "}
                </span>
                record(s)
              </h6>

              <small className="text-muted">Daily Fee Collection Report</small>
            </div>

            {/* Right */}

            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <button
                className="btn btn-outline-primary me-2"
                onClick={loadDailyCollection}
              >
                🔄 Refresh
              </button>

              <button className="btn btn-outline-dark" onClick={handlePrint}>
                🖨 Print Report
              </button>
            </div>
          </div>

          <hr />

          <div className="row text-center">
            <div className="col-md-3">
              <h6>Total Collection</h6>

              <h4 className="text-success fw-bold">
                ₹{" "}
                {filteredData
                  .reduce((sum, item) => sum + (item.paidAmount || 0), 0)
                  .toLocaleString()}
              </h4>
            </div>

            <div className="col-md-3">
              <h6>Total Discount</h6>

              <h4 className="text-warning fw-bold">
                ₹{" "}
                {filteredData
                  .reduce((sum, item) => sum + (item.discountAmount || 0), 0)
                  .toLocaleString()}
              </h4>
            </div>

            <div className="col-md-3">
              <h6>Total Fine</h6>

              <h4 className="text-danger fw-bold">
                ₹{" "}
                {filteredData
                  .reduce((sum, item) => sum + (item.fineAmount || 0), 0)
                  .toLocaleString()}
              </h4>
            </div>

            <div className="col-md-3">
              <h6>Total Receipts</h6>

              <h4 className="text-primary fw-bold">{filteredData.length}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyFeeCollection;
