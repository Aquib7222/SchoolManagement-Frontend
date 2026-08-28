
import React, { useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaRedo,
  FaSearch,
  FaRupeeSign,
  FaTimesCircle,
  FaUndo,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import axiosInstance from "../../../api/axiosInstance";

const MonthlyFeeCollection = () => {
  const token = localStorage.getItem("token");

  const [standards, setStandards] = useState([]);
  const [sections, setSections] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [searchText, setSearchText] = useState("");

  const [monthlyCollection, setMonthlyCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadStandards();
    loadSections();
  }, []);

  // ==========================================
  // LOAD MONTHLY DATA WHEN MONTH CHANGES
  // ==========================================

  useEffect(() => {
    if (selectedMonth) {
      loadMonthlyCollection();
    } else {
      setMonthlyCollection([]);
    }
  }, [selectedMonth]);

  // ==========================================
  // LOAD STANDARDS
  // ==========================================

  const loadStandards = async () => {
    try {
      const res = await axiosInstance.get("/api/master/standard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStandards(res.data || []);
    } catch (error) {
      console.log("Standard Error:", error);
    }
  };

  // ==========================================
  // LOAD SECTIONS
  // ==========================================

  const loadSections = async () => {
    try {
      const res = await axiosInstance.get("/api/master/section", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSections(res.data || []);
    } catch (error) {
      console.log("Section Error:", error);
    }
  };

  // ==========================================
  // LOAD MONTHLY COLLECTION
  // ==========================================

  const loadMonthlyCollection = async () => {
    if (!selectedMonth) {
      setMonthlyCollection([]);
      return;
    }

    try {
      setLoading(true);

      const [year, month] = selectedMonth.split("-");

      const res = await axiosInstance.get(
        "/api/student-fee/payment/report/monthly",
        {
          params: {
            month,
            year,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMonthlyCollection(res.data || []);
    } catch (error) {
      console.log(
        "Monthly Collection Error:",
        error.response?.data || error.message
      );

      setMonthlyCollection([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FILTER DATA
  // ==========================================

  const filteredData = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    return monthlyCollection.filter((item) => {
      const matchClass =
        selectedClass === "" ||
        item.studentClass === selectedClass;

      const matchSection =
        selectedSection === "" ||
        item.section === selectedSection;

      const matchMode =
        paymentMode === "" ||
        item.paymentMode === paymentMode;

      const matchSearch =
        search === "" ||
        item.studentName?.toLowerCase().includes(search) ||
        item.admissionNumber?.toLowerCase().includes(search) ||
        item.receiptNo?.toLowerCase().includes(search) ||
        item.feeName?.toLowerCase().includes(search);

      return (
        matchClass &&
        matchSection &&
        matchMode &&
        matchSearch
      );
    });
  }, [
    monthlyCollection,
    selectedClass,
    selectedSection,
    paymentMode,
    searchText,
  ]);

  // ==========================================
  // SUMMARY
  // ==========================================

  const totalCollection = useMemo(
    () =>
      filteredData.reduce(
        (sum, item) => sum + Number(item.paidAmount || 0),
        0
      ),
    [filteredData]
  );

  const totalDiscount = useMemo(
    () =>
      filteredData.reduce(
        (sum, item) => sum + Number(item.discountAmount || 0),
        0
      ),
    [filteredData]
  );

  const totalFine = useMemo(
    () =>
      filteredData.reduce(
        (sum, item) => sum + Number(item.fineAmount || 0),
        0
      ),
    [filteredData]
  );

  const totalAmount = useMemo(
    () =>
      filteredData.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      ),
    [filteredData]
  );

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = () => {
    if (!selectedMonth) {
      alert("Please select month first.");
      return;
    }

    loadMonthlyCollection();
  };

  // ==========================================
  // RESET
  // ==========================================

  const handleReset = () => {
    setSelectedMonth("");
    setSelectedClass("");
    setSelectedSection("");
    setPaymentMode("");
    setSearchText("");
    setMonthlyCollection([]);
  };

  // ==========================================
  // PRINT
  // ==========================================

  const handlePrint = () => {
    window.print();
  };

  // ==========================================
  // PDF
  // ==========================================

  const downloadPDF = () => {
    if (filteredData.length === 0) {
      alert("No data available to export.");
      return;
    }

    const doc = new jsPDF("landscape");

    const selectedMonthLabel = selectedMonth
      ? new Date(`${selectedMonth}-01`).toLocaleDateString(
          "en-IN",
          {
            month: "long",
            year: "numeric",
          }
        )
      : "All Months";

    doc.setFontSize(18);
    doc.text("Monthly Fee Collection Report", 14, 15);

    doc.setFontSize(10);
    doc.text(`Month: ${selectedMonthLabel}`, 14, 22);

    doc.text(
      `Total Collection: ₹${totalCollection.toLocaleString(
        "en-IN"
      )}`,
      14,
      28
    );

    autoTable(doc, {
      startY: 34,

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
          "Amount",
          "Discount",
          "Fine",
          "Paid",
          "Mode",
          "Status",
        ],
      ],

      body: filteredData.map((item, index) => [
        index + 1,
        item.receiptNo || "-",
        item.paymentDate || "-",
        item.admissionNumber || "-",
        item.studentName || "-",
        `${item.studentClass || "-"}${
          item.section ? ` (${item.section})` : ""
        }`,
        item.feeName || "-",
        item.month || "-",
        `₹ ${Number(item.amount || 0).toLocaleString("en-IN")}`,
        `₹ ${Number(
          item.discountAmount || 0
        ).toLocaleString("en-IN")}`,
        `₹ ${Number(
          item.fineAmount || 0
        ).toLocaleString("en-IN")}`,
        `₹ ${Number(
          item.paidAmount || 0
        ).toLocaleString("en-IN")}`,
        item.paymentMode || "-",
        item.status || "-",
      ]),
    });

    doc.save("Monthly_Fee_Collection_Report.pdf");
  };

  // ==========================================
  // EXCEL
  // ==========================================

  const exportExcel = () => {
    if (filteredData.length === 0) {
      alert("No data available to export.");
      return;
    }

    const data = filteredData.map((item, index) => ({
      "S.No": index + 1,
      "Receipt No": item.receiptNo,
      Date: item.paymentDate,
      Time: item.paymentTime,
      "Admission No": item.admissionNumber,
      Student: item.studentName,
      Class: item.studentClass,
      Section: item.section,
      "Fee Name": item.feeName,
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
      "Monthly Collection"
    );

    XLSX.writeFile(
      workbook,
      "Monthly_Fee_Collection_Report.xlsx"
    );
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN");
  };

  // ==========================================
  // TIME FORMAT
  // ==========================================

  const formatTime = (time) => {
    if (!time) return "-";

    const parsedTime = new Date(time);

    if (Number.isNaN(parsedTime.getTime())) {
      return time;
    }

    return parsedTime.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ==========================================
  // MONTH LABEL
  // ==========================================

  const monthLabel = selectedMonth
    ? new Date(`${selectedMonth}-01`).toLocaleDateString(
        "en-IN",
        {
          month: "long",
          year: "numeric",
        }
      )
    : "Select Month";

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <>
      {/* =====================================================
          PREMIUM HEADER
      ====================================================== */}

      <div className="premium-page-header shadow mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <div className="premium-title-icon">
                <FaChartLine />
              </div>

              <h4 className="mb-0 fw-bold">
                Monthly Fee Collection
              </h4>
            </div>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 mt-2">
                <li className="breadcrumb-item">
                  Home
                </li>

                <li className="breadcrumb-item">
                  Fee
                </li>

                <li className="breadcrumb-item active">
                  Monthly Collection
                </li>
              </ol>
            </nav>
          </div>

          <div className="header-month-badge">
            <FaCalendarAlt className="me-2" />
            {monthLabel}
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="row g-3 mb-4">

        {/* Total Amount */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaRupeeSign />
            </div>

            <div className="stat-content">
              <span>Total Amount</span>

              <h3>
                ₹{totalAmount.toLocaleString("en-IN")}
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
              <span>Total Collection</span>

              <h3>
                ₹
                {totalCollection.toLocaleString("en-IN")}
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

      {/* =====================================================
          FILTER CARD
      ====================================================== */}

      <div className="premium-card mb-4 shadow">

        <div className="premium-card-header">
          <div>
            <h5 className="mb-1 fw-bold">
              Collection Filters
            </h5>

            <small className="text-muted">
              Filter monthly fee collection records
            </small>
          </div>

          <div className="filter-header-icon">
            <FaSearch />
          </div>
        </div>

        <div className="premium-card-body">

          <div className="row g-3">

            {/* Month */}

            <div className="col-xl-2 col-lg-3 col-md-6">
              <label className="premium-label">
                <FaCalendarAlt className="me-1" />
                Month
              </label>

              <input
                type="month"
                className="form-control premium-input"
                value={selectedMonth}
                onChange={(e) =>
                  setSelectedMonth(e.target.value)
                }
              />
            </div>

            {/* Search */}

            <div className="col-xl-3 col-lg-3 col-md-6">
              <label className="premium-label">
                <FaSearch className="me-1" />
                Search Student
              </label>

              <input
                type="text"
                className="form-control premium-input"
                placeholder="Name / Admission / Receipt"
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
              />
            </div>

            {/* Class */}

            <div className="col-xl-2 col-lg-2 col-md-6">
              <label className="premium-label">
                Class
              </label>

              <select
                className="form-select premium-input"
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

            <div className="col-xl-2 col-lg-2 col-md-6">
              <label className="premium-label">
                Section
              </label>

              <select
                className="form-select premium-input"
                value={selectedSection}
                onChange={(e) =>
                  setSelectedSection(e.target.value)
                }
              >
                <option value="">
                  All Sections
                </option>

                {sections.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment */}

            <div className="col-xl-3 col-lg-2 col-md-6">
              <label className="premium-label">
                Payment Mode
              </label>

              <select
                className="form-select premium-input"
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

          {/* ACTION BUTTONS */}

          <div className="d-flex justify-content-end flex-wrap gap-2 mt-4 pt-3 border-top">

            <button
              className="btn premium-btn-primary"
              onClick={handleSearch}
            >
              <FaSearch className="me-2" />
              Search
            </button>

            <button
              className="btn premium-btn-secondary"
              onClick={handleReset}
            >
              <FaRedo className="me-2" />
              Reset
            </button>

            <button
              className="btn premium-btn-danger"
              onClick={downloadPDF}
            >
              <FaFilePdf className="me-2" />
              PDF
            </button>

            <button
              className="btn premium-btn-success"
              onClick={exportExcel}
            >
              <FaFileExcel className="me-2" />
              Excel
            </button>

            <button
              className="btn premium-btn-dark"
              onClick={handlePrint}
            >
              <FaPrint className="me-2" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          REPORT TABLE
      ====================================================== */}

      <div className="premium-card report-print-area shadow">

        <div className="premium-card-header">

          <div>
            <h5 className="mb-1 fw-bold">
              Monthly Collection Report
            </h5>

            <small className="text-muted">
              {monthLabel}
            </small>
          </div>

          <div className="d-flex align-items-center gap-2">

            <span className="record-count">
              {filteredData.length}
            </span>

            <span className="text-muted small">
              Records
            </span>

          </div>
        </div>

        <div className="premium-card-body p-0">

          {loading ? (
            <div className="premium-loading">
              <div className="spinner-border text-primary" />

              <h6 className="mt-3 mb-1">
                Loading collection...
              </h6>

              <small className="text-muted">
                Please wait
              </small>
            </div>
          ) : (
            <div className="table-responsive">

              <table className="table premium-table align-middle mb-0">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Receipt</th>
                    <th>Date</th>
                    <th>Admission</th>
                    <th>Student</th>
                    <th>Class</th>
                    <th>Fee</th>
                    <th>Month</th>
                    <th>Amount</th>
                    <th>Discount</th>
                    <th>Fine</th>
                    <th>Paid</th>
                    <th>Mode</th>
                    <th>Collected By</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={item.id || index}>

                        <td>
                          <span className="serial-number">
                            {index + 1}
                          </span>
                        </td>

                        <td>
                          <span className="receipt-number">
                            {item.receiptNo || "-"}
                          </span>
                        </td>

                        <td>
                          <div className="date-cell">
                            <strong>
                              {formatDate(
                                item.paymentDate
                              )}
                            </strong>

                            <small>
                              {formatTime(
                                item.paymentTime
                              )}
                            </small>
                          </div>
                        </td>

                        <td>
                          <span className="admission-badge">
                            {item.admissionNumber || "-"}
                          </span>
                        </td>

                        <td>
                          <div className="student-cell">
                            <div className="student-avatar">
                              {item.studentName
                                ?.charAt(0)
                                ?.toUpperCase() || "S"}
                            </div>

                            <div>
                              <strong>
                                {item.studentName || "-"}
                              </strong>

                              <small>
                                {item.section
                                  ? `Section ${item.section}`
                                  : ""}
                              </small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="class-badge">
                            {item.studentClass || "-"}
                            {item.section
                              ? ` - ${item.section}`
                              : ""}
                          </span>
                        </td>

                        <td>
                          <strong>
                            {item.feeName || "-"}
                          </strong>
                        </td>

                        <td>
                          <span className="month-badge">
                            {item.month || "-"}
                          </span>
                        </td>

                        <td>
                          <strong>
                            ₹
                            {Number(
                              item.amount || 0
                            ).toLocaleString("en-IN")}
                          </strong>
                        </td>

                        <td>
                          <span className="amount-discount">
                            ₹
                            {Number(
                              item.discountAmount || 0
                            ).toLocaleString("en-IN")}
                          </span>
                        </td>

                        <td>
                          <span className="amount-fine">
                            ₹
                            {Number(
                              item.fineAmount || 0
                            ).toLocaleString("en-IN")}
                          </span>
                        </td>

                        <td>
                          <span className="amount-paid">
                            ₹
                            {Number(
                              item.paidAmount || 0
                            ).toLocaleString("en-IN")}
                          </span>
                        </td>

                        <td>
                          <span className="payment-badge">
                            {item.paymentMode || "-"}
                          </span>
                        </td>

                        <td>
                          {item.collectedBy || "-"}
                        </td>

                        <td>
                          <span
                            className={`status-badge ${
                              item.status === "SUCCESS"
                                ? "status-success"
                                : "status-failed"
                            }`}
                          >
                            {item.status === "SUCCESS" ? (
                              <FaCheckCircle />
                            ) : (
                              <FaTimesCircle />
                            )}

                            {item.status || "UNKNOWN"}
                          </span>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="15">
                        <div className="premium-empty-state">

                          <div className="empty-icon">
                            <FaFilePdf />
                          </div>

                          <h5>
                            No Collection Records
                          </h5>

                          <p>
                            No fee collection record
                            found for the selected filters.
                          </p>

                          <button
                            className="btn btn-outline-primary"
                            onClick={handleReset}
                          >
                            <FaRedo className="me-2" />
                            Clear Filters
                          </button>

                        </div>
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          REPORT FOOTER
      ====================================================== */}

      <div className="premium-footer-card mt-4 shadow">

        <div className="row align-items-center">

          <div className="col-md-6">

            <div className="footer-record">

              <div className="footer-icon">
                <FaChartLine />
              </div>

              <div>
                <h6 className="mb-1 fw-bold">
                  Monthly Collection Summary
                </h6>

                <small className="text-muted">
                  Showing{" "}
                  <strong className="text-primary">
                    {filteredData.length}
                  </strong>{" "}
                  collection records
                </small>
              </div>

            </div>
          </div>

          <div className="col-md-6 text-md-end mt-3 mt-md-0">

            <button
              className="btn btn-outline-primary me-2"
              onClick={loadMonthlyCollection}
              disabled={!selectedMonth || loading}
            >
              <FaRedo className="me-2" />
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

        <div className="row g-3 text-center">

          <div className="col-xl-3 col-md-6">
            <div className="footer-summary">
              <small>Total Amount</small>

              <h4>
                ₹
                {totalAmount.toLocaleString("en-IN")}
              </h4>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="footer-summary">
              <small>Total Collection</small>

              <h4 className="text-success">
                ₹
                {totalCollection.toLocaleString("en-IN")}
              </h4>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="footer-summary">
              <small>Total Discount</small>

              <h4 className="text-warning">
                ₹
                {totalDiscount.toLocaleString("en-IN")}
              </h4>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="footer-summary">
              <small>Total Fine</small>

              <h4 className="text-danger">
                ₹
                {totalFine.toLocaleString("en-IN")}
              </h4>
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          PREMIUM CSS
      ====================================================== */}

      <style>{`
        .premium-page-header {
          background: #ffffff;
          border-radius: 14px;
          padding: 20px 24px;
          border: 1px solid #edf0f5;
        }

        .premium-title-icon {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #e8f0ff, #f4f7ff);
          color: #0d6efd;
          font-size: 19px;
        }

        .header-month-badge {
          background: #f4f7fb;
          border: 1px solid #e4e9f0;
          border-radius: 10px;
          padding: 10px 15px;
          font-size: 13px;
          font-weight: 600;
          color: #495057;
        }

        .premium-stat-card {
          position: relative;
          overflow: hidden;
          border-radius: 15px;
          padding: 20px;
          min-height: 105px;
          display: flex;
          align-items: center;
          gap: 16px;
          background: #ffffff;
          border: 1px solid #edf0f5;
          box-shadow: 0 5px 18px rgba(0,0,0,.05);
          transition: all .25s ease;
        }

        .premium-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,.08);
        }

        .premium-stat-card::after {
          content: "";
          position: absolute;
          right: -35px;
          top: -35px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          opacity: .08;
        }

        .stat-blue::after {
          background: #0d6efd;
        }

        .stat-green::after {
          background: #198754;
        }

        .stat-orange::after {
          background: #ffc107;
        }

        .stat-red::after {
          background: #dc3545;
        }

        .stat-icon {
          min-width: 52px;
          width: 52px;
          height: 52px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .stat-blue .stat-icon {
          background: #eaf2ff;
          color: #0d6efd;
        }

        .stat-green .stat-icon {
          background: #eaf8f0;
          color: #198754;
        }

        .stat-orange .stat-icon {
          background: #fff8df;
          color: #d99a00;
        }

        .stat-red .stat-icon {
          background: #ffeded;
          color: #dc3545;
        }

        .stat-content span {
          display: block;
          color: #6c757d;
          font-size: 13px;
          font-weight: 600;
        }

        .stat-content h3 {
          margin: 5px 0 2px;
          font-size: 24px;
          font-weight: 750;
          color: #212529;
        }

        .stat-content small {
          color: #9aa1aa;
          font-size: 11px;
        }

        .premium-card {
          background: #ffffff;
          border: 1px solid #edf0f5;
          border-radius: 15px;
          box-shadow: 0 5px 18px rgba(0,0,0,.045);
          overflow: hidden;
        }

        .premium-card-header {
          padding: 17px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #edf0f5;
          background: #fff;
        }

        .filter-header-icon {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #eef4ff;
          color: #0d6efd;
        }

        .premium-card-body {
          padding: 20px;
        }

        .premium-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #495057;
          margin-bottom: 7px;
        }

        .premium-input {
          min-height: 42px;
          border-radius: 9px;
          border: 1px solid #dfe4ea;
          font-size: 13px;
          box-shadow: none !important;
        }

        .premium-input:focus {
          border-color: #86b7fe;
        }

        .premium-btn-primary,
        .premium-btn-secondary,
        .premium-btn-danger,
        .premium-btn-success,
        .premium-btn-dark {
          min-height: 40px;
          padding: 8px 15px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
        }

        .premium-btn-primary {
          background: #0d6efd;
          color: #fff;
        }

        .premium-btn-secondary {
          background: #f1f3f5;
          color: #495057;
        }

        .premium-btn-danger {
          background: #dc3545;
          color: #fff;
        }

        .premium-btn-success {
          background: #198754;
          color: #fff;
        }

        .premium-btn-dark {
          background: #212529;
          color: #fff;
        }

        .premium-table {
          font-size: 12px;
          white-space: nowrap;
        }

        .premium-table thead th {
          background: #f7f9fc;
          color: #495057;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .3px;
          font-weight: 750;
          border-bottom: 1px solid #e9edf2;
          padding: 13px 12px;
        }

        .premium-table tbody td {
          padding: 13px 12px;
          border-color: #eef1f4;
          color: #343a40;
        }

        .premium-table tbody tr {
          transition: background .15s ease;
        }

        .premium-table tbody tr:hover {
          background: #f8fbff;
        }

        .serial-number {
          width: 26px;
          height: 26px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          background: #f1f4f8;
          font-weight: 700;
          color: #6c757d;
        }

        .receipt-number {
          color: #0d6efd;
          font-weight: 750;
        }

        .admission-badge {
          background: #eef4ff;
          color: #0d6efd;
          border-radius: 6px;
          padding: 5px 8px;
          font-size: 11px;
          font-weight: 700;
        }

        .student-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .student-avatar {
          width: 31px;
          height: 31px;
          min-width: 31px;
          border-radius: 50%;
          background: #eaf2ff;
          color: #0d6efd;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 750;
        }

        .student-cell strong {
          display: block;
          font-size: 12px;
        }

        .student-cell small {
          display: block;
          color: #9aa1aa;
          font-size: 10px;
          margin-top: 2px;
        }

        .class-badge {
          background: #f3f5f7;
          color: #495057;
          padding: 5px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 650;
        }

        .month-badge {
          background: #fff7e1;
          color: #a66b00;
          border-radius: 6px;
          padding: 5px 8px;
          font-weight: 650;
          font-size: 11px;
        }

        .payment-badge {
          background: #e8f7f1;
          color: #198754;
          border-radius: 6px;
          padding: 5px 8px;
          font-size: 11px;
          font-weight: 700;
        }

        .amount-discount {
          color: #d99a00;
          font-weight: 700;
        }

        .amount-fine {
          color: #dc3545;
          font-weight: 700;
        }

        .amount-paid {
          color: #198754;
          font-weight: 750;
        }

        .date-cell strong {
          display: block;
          font-size: 11px;
        }

        .date-cell small {
          color: #9aa1aa;
          font-size: 10px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          border-radius: 20px;
          padding: 5px 9px;
          font-size: 10px;
          font-weight: 750;
        }

        .status-success {
          background: #e8f7f0;
          color: #198754;
        }

        .status-failed {
          background: #ffebee;
          color: #dc3545;
        }

        .record-count {
          min-width: 31px;
          height: 27px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          background: #0d6efd;
          color: #fff;
          font-size: 12px;
          font-weight: 750;
        }

        .premium-loading {
          min-height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .premium-empty-state {
          padding: 65px 20px;
          text-align: center;
        }

        .empty-icon {
          width: 58px;
          height: 58px;
          margin: auto;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f4f8;
          color: #8b949e;
          font-size: 21px;
        }

        .premium-empty-state h5 {
          margin-top: 15px;
          font-weight: 700;
        }

        .premium-empty-state p {
          color: #8b949e;
          font-size: 13px;
        }

        .premium-footer-card {
          background: #fff;
          border: 1px solid #edf0f5;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 5px 18px rgba(0,0,0,.045);
        }

        .footer-record {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #eef4ff;
          color: #0d6efd;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-summary {
          background: #f8f9fb;
          border-radius: 10px;
          padding: 13px;
        }

        .footer-summary small {
          color: #7b838d;
          font-size: 11px;
          font-weight: 600;
        }

        .footer-summary h4 {
          margin: 5px 0 0;
          font-weight: 750;
        }

        @media (max-width: 767px) {
          .premium-page-header {
            padding: 15px;
          }

          .premium-card-header {
            padding: 15px;
          }

          .premium-card-body {
            padding: 15px;
          }

          .premium-stat-card {
            min-height: 125px;
          }

          .premium-footer-card {
            padding: 15px;
          }
        }

        @media print {
          body {
            background: #fff !important;
          }

          body * {
            visibility: hidden;
          }

          .report-print-area,
          .report-print-area * {
            visibility: visible;
          }

          .report-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            border: none !important;
          }

          .premium-table {
            font-size: 9px !important;
          }

          .premium-table th,
          .premium-table td {
            padding: 6px !important;
          }

          @page {
            size: landscape;
            margin: 8mm;
          }
        }
      `}</style>
    </>
  );
};

export default MonthlyFeeCollection;

