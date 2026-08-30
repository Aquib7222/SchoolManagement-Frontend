

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaEye,
  FaEdit,
  FaRedo,
  FaSearch,
  FaUsers,
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaFilter,
  FaReceipt,
  FaRupeeSign,
  FaExclamationCircle,
} from "react-icons/fa";

import { MdOutlinePayments } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";

import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";

const AdmissionFeePaymentList = () => {
  const navigate = useNavigate();

  /* =========================================================
     MASTER DATA
  ========================================================= */

  const { sessions = [], standards = [] } = useMasters();

  /* =========================================================
     USER
  ========================================================= */

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  /* =========================================================
     STATES
  ========================================================= */

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [receiptLoading, setIsReceiptLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    session: "",
    standard: "",
    status: "",
    paymentDate: "",
  });

  /* =========================================================
     STATUS OPTIONS
  ========================================================= */

  const STATUS_OPTIONS = ["PAID", "PARTIAL", "PENDING"];

  /* =========================================================
     LOAD ADMISSION FEE PAYMENTS
  ========================================================= */

  const loadPayments = async () => {
    if (!schoolId) {
      setPayments([]);
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        "/api/admission-fee/school",
        {
          params: {
            schoolId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data || [];

      console.log("Admission fee payment API:", data);

      const normalizedPayments = Array.isArray(data)
        ? data
        : data.content ||
          data.data ||
          data.payments ||
          [];

      setPayments(normalizedPayments);
    } catch (error) {
      console.error(
        "Admission Fee Payment Error:",
        error?.response?.data || error
      );

      setPayments([]);

      alert(
        error?.response?.data?.message ||
          "Unable to load admission fee payment records."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    if (schoolId && token) {
      loadPayments();
    }
  }, [schoolId, token]);

  /* =========================================================
     GET ADMISSION OBJECT
  ========================================================= */

  const getAdmission = (item) => {
    return (
      item?.admission ||
      item?.admissionData ||
      {}
    );
  };

  /* =========================================================
     GET ADMISSION ID
  ========================================================= */

  const getAdmissionId = (item) => {
    const admission = getAdmission(item);

    return (
      item?.admissionId ||
      item?.admission_id ||
      admission?.id ||
      null
    );
  };

  /* =========================================================
     GET RAW PAYMENT STATUS

     IMPORTANT:
     FEE_PAID / ENROLLED / PAID => FULLY PAID
  ========================================================= */

  const getRawPaymentStatus = (item) => {
    return String(
      item?.status ||
        item?.paymentStatus ||
        item?.admission?.status ||
        item?.admissionData?.status ||
        ""
    )
      .trim()
      .toUpperCase();
  };

  /* =========================================================
     GET STUDENT DATA
  ========================================================= */

  const getStudentData = (item) => {
    const admission = getAdmission(item);

    return {
      id:
        admission?.studentId ||
        admission?.student?.id ||
        item?.studentId ||
        null,

      firstName:
        admission?.firstName ||
        admission?.student?.firstName ||
        item?.firstName ||
        "",

      middleName:
        admission?.middleName ||
        admission?.student?.middleName ||
        item?.middleName ||
        "",

      lastName:
        admission?.lastName ||
        admission?.student?.lastName ||
        item?.lastName ||
        "",

      admissionNumber:
        admission?.admissionNumber ||
        item?.admissionNumber ||
        "",

      fatherName:
        admission?.fatherName ||
        admission?.father?.name ||
        item?.fatherName ||
        "",

      fatherMobile:
        admission?.fatherMobile ||
        admission?.fatherPhone ||
        item?.fatherMobile ||
        "",

      motherName:
        admission?.motherName ||
        admission?.mother?.name ||
        item?.motherName ||
        "",

      studentClass:
        admission?.studentClass ||
        admission?.standard ||
        item?.studentClass ||
        item?.standard ||
        "",

      section:
        admission?.section ||
        item?.section ||
        "",

      academicYear:
        admission?.academicYear ||
        admission?.session ||
        item?.academicYear ||
        item?.session ||
        "",

      dateOfBirth:
        admission?.dateOfBirth ||
        admission?.dob ||
        "",

      gender:
        admission?.gender ||
        "",

      mobile:
        admission?.mobile ||
        admission?.phone ||
        "",

      address:
        admission?.address ||
        "",
    };
  };

  /* =========================================================
     STUDENT NAME
  ========================================================= */

  const getStudentName = (item) => {
    const student = getStudentData(item);

    return (
      `${student.firstName || ""} ${
        student.middleName || ""
      } ${student.lastName || ""}`
        .replace(/\s+/g, " ")
        .trim() || "N/A"
    );
  };

  /* =========================================================
     ADMISSION NUMBER
  ========================================================= */

  const getAdmissionNumber = (item) => {
    const student = getStudentData(item);

    return student.admissionNumber || "-";
  };

  /* =========================================================
     STANDARD
  ========================================================= */

  const getStandard = (item) => {
    const student = getStudentData(item);

    return student.studentClass || "-";
  };

  /* =========================================================
     SESSION
  ========================================================= */

  const getSession = (item) => {
    const student = getStudentData(item);

    return student.academicYear || "-";
  };

  /* =========================================================
     TOTAL FEE

     IMPORTANT:
     FEE_PAID / ENROLLED / PAID:
     Total Fee = Paid Amount

     Otherwise normal total fee calculation.
  ========================================================= */

  const getTotalFee = (item) => {
    const admission = getAdmission(item);
    const status = getRawPaymentStatus(item);

    const paidAmount = Number(
      item?.paidAmount ??
        item?.amountPaid ??
        item?.paymentAmount ??
        item?.amount ??
        item?.paid ??
        0
    );

    /* FULLY PAID STATUS */

    if (
      status === "FEE_PAID" ||
      status === "ENROLLED" ||
      status === "PAID"
    ) {
      return paidAmount;
    }

    return Number(
      item?.totalFee ??
        item?.totalAmount ??
        item?.admissionFee ??
        item?.feeAmount ??
        item?.totalPayable ??
        admission?.totalFee ??
        admission?.admissionFee ??
        0
    );
  };

  /* =========================================================
     PAID AMOUNT
  ========================================================= */

  const getPaidAmount = (item) => {
    const status = getRawPaymentStatus(item);

    const paidAmount = Number(
      item?.totalAmount ??
        item?.amountPaid ??
        item?.paymentAmount ??
        item?.amount ??
        item?.paid ??
        0
    );

    /*
     * FEE_PAID / ENROLLED / PAID
     * me total amount hi paid amount hai.
     */

    if (
      status === "FEE_PAID" ||
      status === "ENROLLED" ||
      status === "PAID"
    ) {
      return paidAmount;
    }

    return paidAmount;
  };

  /* =========================================================
     DUE AMOUNT

     FULLY PAID STATUS => 0
  ========================================================= */

  const getDueAmount = (item) => {
    const status = getRawPaymentStatus(item);

    /*
     * IMPORTANT:
     * FEE_PAID and ENROLLED means fully paid.
     */

    if (
      status === "FEE_PAID" ||
      status === "ENROLLED" ||
      status === "PAID"
    ) {
      return 0;
    }

    const directDue =
      item?.dueAmount ??
      item?.remainingAmount ??
      item?.balanceAmount ??
      item?.due;

    if (
      directDue !== undefined &&
      directDue !== null
    ) {
      return Math.max(Number(directDue), 0);
    }

    const total = getTotalFee(item);
    const paid = getPaidAmount(item);

    return Math.max(total - paid, 0);
  };

  /* =========================================================
     PAYMENT STATUS

     FEE_PAID / ENROLLED / PAID => PAID
  ========================================================= */

  const getPaymentStatus = (item) => {
    const status = getRawPaymentStatus(item);

    /*
     * FULLY PAID
     */

    if (
      status === "PAID" ||
      status === "FEE_PAID" ||
      status === "ENROLLED"
    ) {
      return "PAID";
    }

    /*
     * PARTIAL
     */

    if (status === "PARTIAL") {
      return "PARTIAL";
    }

    /*
     * PENDING
     */

    if (status === "PENDING") {
      return "PENDING";
    }

    /*
     * FALLBACK CALCULATION
     */

    const total = getTotalFee(item);
    const paid = getPaidAmount(item);
    const due = getDueAmount(item);

    if (total > 0 && due <= 0) {
      return "PAID";
    }

    if (paid > 0) {
      return "PARTIAL";
    }

    return "PENDING";
  };

  /* =========================================================
     PAYMENT MODE
  ========================================================= */

  const getPaymentMode = (item) => {
    return (
      item?.paymentMode ||
      item?.modeOfPayment ||
      item?.paymentMethod ||
      item?.mode ||
      "-"
    );
  };

  /* =========================================================
     PAYMENT DATE
  ========================================================= */

  const getPaymentDate = (item) => {
    return (
      item?.paymentDate ||
      item?.paidDate ||
      item?.transactionDate ||
      item?.createdAt ||
      item?.today ||
      null
    );
  };

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "N/A";

    const value = String(date).substring(0, 10);

    const parts = value.split("-");

    if (parts.length !== 3) {
      return date;
    }

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  /* =========================================================
     FORMAT MONEY
  ========================================================= */

  const formatMoney = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  /* =========================================================
     STATUS CONFIG
  ========================================================= */

  const getStatusConfig = (status) => {
    switch (status) {
      case "PAID":
        return {
          bg: "#e8f7ee",
          color: "#198754",
          dot: "#198754",
        };

      case "PARTIAL":
        return {
          bg: "#fff4d6",
          color: "#997404",
          dot: "#ffc107",
        };

      case "PENDING":
        return {
          bg: "#ffe8e8",
          color: "#dc3545",
          dot: "#dc3545",
        };

      default:
        return {
          bg: "#eef0f2",
          color: "#6c757d",
          dot: "#6c757d",
        };
    }
  };

  /* =========================================================
     FILTER CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     FILTER PAYMENTS
  ========================================================= */

  const filteredPayments = useMemo(() => {
    return payments.filter((item) => {
      const studentName =
        getStudentName(item).toLowerCase();

      const admissionNumber =
        getAdmissionNumber(item).toLowerCase();

      const search =
        filters.search.toLowerCase();

      const studentSession = getSession(item);
      const studentClass = getStandard(item);

      const matchSearch =
        !search ||
        studentName.includes(search) ||
        admissionNumber.includes(search);

      const matchSession =
        !filters.session ||
        String(studentSession).toLowerCase() ===
          String(filters.session).toLowerCase();

      const matchStandard =
        !filters.standard ||
        String(studentClass).toLowerCase() ===
          String(filters.standard).toLowerCase();

      const matchStatus =
        !filters.status ||
        getPaymentStatus(item) ===
          filters.status;

      const rawDate = getPaymentDate(item);

      const itemDate = rawDate
        ? String(rawDate).substring(0, 10)
        : "";

      const matchDate =
        !filters.paymentDate ||
        itemDate === filters.paymentDate;

      return (
        matchSearch &&
        matchSession &&
        matchStandard &&
        matchStatus &&
        matchDate
      );
    });
  }, [payments, filters]);

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const handleReset = () => {
    setFilters({
      search: "",
      session: "",
      standard: "",
      status: "",
      paymentDate: "",
    });
  };

  /* =========================================================
     VIEW PAYMENT
  ========================================================= */

  const handleView = (item) => {
    if (!item?.id) {
      alert("Payment ID not found.");
      return;
    }

    navigate(
      `/admission/fee_payment/view/${item.id}`,
      {
        state: {
          payment: item,
          admissionId: getAdmissionId(item),
        },
      }
    );
  };

  /* =========================================================
     EDIT PAYMENT
  ========================================================= */

  const handleEdit = (item) => {
    if (!item?.id) {
      alert("Payment ID not found.");
      return;
    }

    navigate(
      `/admission/fee_payment/edit/${item.id}`,
      {
        state: {
          payment: item,
          admissionId: getAdmissionId(item),
        },
      }
    );
  };

  /* =========================================================
     RECEIPT
  ========================================================= */

//   const handleReceipt = async (payment) => {
//     const admissionNumber =
//       getAdmissionNumber(payment);

//     if (
//       !admissionNumber ||
//       admissionNumber === "-"
//     ) {
//       alert("Admission number not found.");
//       return;
//     }

//     try {
//       setReceiptLoading(payment.id);

//       const response =
//         await axiosInstance.get(
//           "/admission/fee/receipt",
//           {
//             params: {
//               schoolId,
//               admissionNumber,
//               session: getSession(payment),
//               standard: getStandard(payment),
//               admissionId:
//                 getAdmissionId(payment),
//               paymentId: payment?.id,
//             },

//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//       const feeData = response.data || {};

//       const receipt = feeData.receiptData
//         ? feeData.receiptData
//         : feeData;

//       const receiptData = {
//         ...receipt,

//         paymentId:
//           receipt.paymentId ||
//           receipt.id ||
//           payment?.id ||
//           "-",

//         admissionId:
//           receipt.admissionId ||
//           getAdmissionId(payment) ||
//           "-",

//         receiptNo:
//           receipt.receiptNo ||
//           receipt.receiptNumber ||
//           receipt.id ||
//           receipt.paymentId ||
//           payment?.id ||
//           "-",

//         schoolName:
//           receipt.schoolName ||
//           user?.school?.schoolName ||
//           "School Management System",

//         studentName:
//           receipt.studentName ||
//           getStudentName(payment),

//         admissionNumber:
//           receipt.admissionNumber ||
//           admissionNumber,

//         standard:
//           receipt.standard ||
//           getStandard(payment),

//         session:
//           receipt.session ||
//           getSession(payment),

//         paymentDate:
//           receipt.paymentDate ||
//           receipt.paidDate ||
//           getPaymentDate(payment) ||
//           new Date(),

//         paymentMode:
//           receipt.paymentMode ||
//           getPaymentMode(payment),

//         fees:
//           receipt.fees ||
//           receipt.fixedFees ||
//           {},

//         tuitionMonths:
//           receipt.tuitionMonths ||
//           receipt.paidMonths ||
//           [],

//         tuitionFee:
//           receipt.tuitionFee ||
//           {},

//         /*
//          * FULLY PAID STATUS:
//          * totalAmount = paidAmount
//          */

//         totalAmount:
//           receipt.totalAmount ??
//           receipt.amount ??
//           getTotalFee(payment),

//         paidAmount:
//           receipt.paidAmount ??
//           receipt.amountPaid ??
//           getPaidAmount(payment),

//         dueAmount:
//           receipt.dueAmount ??
//           getDueAmount(payment),

//         utrNumber:
//           receipt.utrNumber ||
//           receipt.utrNo ||
//           receipt.transactionId ||
//           "",

//         bankName:
//           receipt.bankName ||
//           receipt.bank ||
//           "",

//         referenceNumber:
//           receipt.referenceNumber ||
//           receipt.referenceNo ||
//           receipt.transactionReference ||
//           "",
//       };

//       navigate(
//         "/admission/fee/receipt",
//         {
//           state: {
//             receiptData,
//             autoDownload: true,
//           },
//         }
//       );
//     } catch (error) {
//       console.error(
//         "Receipt fetch error:",
//         error?.response?.data || error
//       );

//       alert(
//         error?.response?.data?.message ||
//           "Unable to load fee receipt."
//       );
//     } finally {
//       setReceiptLoading(null);
//     }
//   };

 const handleReceipt = (item) => {
  navigate("/admission/fee/receipt", {
    state: {
      receiptData: item,
    },
  });
};

  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalPayments = payments.length;

  const paidPayments = payments.filter(
    (item) =>
      getPaymentStatus(item) === "PAID"
  ).length;

  const partialPayments = payments.filter(
    (item) =>
      getPaymentStatus(item) === "PARTIAL"
  ).length;

  const pendingPayments = payments.filter(
    (item) =>
      getPaymentStatus(item) === "PENDING"
  ).length;

  const totalCollected = payments.reduce(
    (sum, item) =>
      sum + getPaidAmount(item),
    0
  );

  const totalDue = payments.reduce(
    (sum, item) =>
      sum + getDueAmount(item),
    0
  );

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mx-2 mt-2 mb-3">
        <div
          className="rounded-4 shadow overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
            border: "1px solid #dbeafe",
          }}
        >
          <div className="p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-4"
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
                  <MdOutlinePayments size={28} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Admission Fee Payments List
                  </h5>

                  <div className="text-muted small">
                    Admission &nbsp;/&nbsp; Fee Payments List
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-light border d-flex align-items-center justify-content-center gap-2 rounded-4 px-3"
                  onClick={loadPayments}
                  disabled={loading}
                >
                  <FaRedo
                    size={12}
                    className={
                      loading ? "spin" : ""
                    }
                  />

                  Refresh
                </button>

                <button
                  className="btn btn-primary d-flex align-items-center justify-content-center gap-2 rounded-4 px-4"
                  onClick={() =>
                    navigate(
                      "/admission/fee_payment/add"
                    )
                  }
                >
                  <FaMoneyBillWave size={13} />

                  Add Fee Payment
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
              Home &nbsp;›&nbsp; Admission &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Fee Payments
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 px-2">
        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaUsers />
            </div>

            <div className="stat-content">
              <span>Total Payments</span>
              <h3>{totalPayments}</h3>
              <small>
                All fee transactions
              </small>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div className="stat-content">
              <span>Paid</span>
              <h3>{paidPayments}</h3>
              <small>
                Completed payments
              </small>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <FaClock />
            </div>

            <div className="stat-content">
              <span>Partial</span>
              <h3>{partialPayments}</h3>
              <small>
                Partially paid
              </small>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-red shadow">
            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>

            <div className="stat-content">
              <span>Pending</span>
              <h3>{pendingPayments}</h3>
              <small>
                Payment pending
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          COLLECTION SUMMARY
      ===================================================== */}

      <div className="row g-3 px-2 mb-4">
        <div className="col-md-6">
          <div
            className="card border-0 shadow rounded-4 h-100"
            style={{
              background:
                "linear-gradient(135deg,#f4fff8,#e9f9ef)",
            }}
          >
            <div className="card-body py-3 px-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "#dff5e7",
                      color: "#198754",
                    }}
                  >
                    <FaRupeeSign size={18} />
                  </div>

                  <div>
                    <div className="fw-bold">
                      Total Collected
                    </div>

                    <small className="text-muted">
                      Total admission fee received
                    </small>
                  </div>
                </div>

                <div
                  className="fw-bold"
                  style={{
                    fontSize: "21px",
                    color: "#198754",
                  }}
                >
                  ₹ {formatMoney(totalCollected)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="card border-0 shadow rounded-4 h-100"
            style={{
              background:
                "linear-gradient(135deg,#fffdf5,#fff9e6)",
            }}
          >
            <div className="card-body py-3 px-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "#fff3cd",
                      color: "#997404",
                    }}
                  >
                    <FaClock size={18} />
                  </div>

                  <div>
                    <div className="fw-bold">
                      Total Due
                    </div>

                    <small className="text-muted">
                      Outstanding admission fee
                    </small>
                  </div>
                </div>

                <div
                  className="fw-bold"
                  style={{
                    fontSize: "21px",
                    color: "#997404",
                  }}
                >
                  ₹ {formatMoney(totalDue)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="ms-2 me-2 mt-4">
        <div className="card border-0 shadow rounded-4">
          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom:
                "1px solid #eef0f2",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mb-1 fw-bold">
                  <FaFilter
                    className="text-primary me-2"
                    size={14}
                  />
                  Payment Search
                </h6>

                <small className="text-muted">
                  Filter admission fee payment records
                </small>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#e9f7ef",
                  color: "#198754",
                }}
              >
                {filteredPayments.length} Records
              </span>
            </div>
          </div>

          <div className="card-body p-3">
            <div className="row g-3">
              {/* SEARCH */}

              <div className="col-12 col-sm-6 col-xl-3">
                <label className="form-label fw-semibold small">
                  Search Student
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaSearch
                      className="text-primary"
                      size={13}
                    />
                  </span>

                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Name / Admission No."
                  />
                </div>
              </div>

              {/* SESSION */}

              <div className="col-12 col-sm-6 col-xl-2">
                <label className="form-label fw-semibold small">
                  Session
                </label>

                <select
                  name="session"
                  value={filters.session}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">
                    All Sessions
                  </option>

                  {sessions.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* STANDARD */}

              <div className="col-12 col-sm-6 col-xl-2">
                <label className="form-label fw-semibold small">
                  Standard
                </label>

                <select
                  name="standard"
                  value={filters.standard}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">
                    All Standards
                  </option>

                  {standards.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* STATUS */}

              <div className="col-12 col-sm-6 col-xl-2">
                <label className="form-label fw-semibold small">
                  Payment Status
                </label>

                <select
                  name="status"
                  value={filters.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">
                    All Status
                  </option>

                  {STATUS_OPTIONS.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* DATE */}

              <div className="col-12 col-sm-6 col-xl-3">
                <label className="form-label fw-semibold small">
                  Payment Date
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaCalendarDays
                      className="text-primary"
                      size={14}
                    />
                  </span>

                  <input
                    type="date"
                    name="paymentDate"
                    value={filters.paymentDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4 flex-wrap">
              <button
                type="button"
                className="btn btn-light border px-4"
                onClick={handleReset}
              >
                <FaRedo
                  className="me-2"
                  size={13}
                />

                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PAYMENT TABLE
      ===================================================== */}

      <div className="ms-2 me-2 mt-4 mb-4">
        <div className="card border-0 shadow rounded-4 overflow-hidden">
          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom:
                "1px solid #eef0f2",
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-2 d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "#e9f7ef",
                    color: "#198754",
                  }}
                >
                  <FaReceipt size={16} />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">
                    Admission Fee Payment List
                  </h6>

                  <small className="text-muted">
                    Manage all admission fee transactions
                  </small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#f4f6f8",
                    color: "#495057",
                  }}
                >
                  Showing{" "}
                  <strong>
                    {filteredPayments.length}
                  </strong>
                </span>

                <button
                  className="btn btn-sm btn-light border d-flex align-items-center gap-1"
                  onClick={loadPayments}
                  disabled={loading}
                >
                  <FaRedo
                    size={12}
                    className={
                      loading ? "spin" : ""
                    }
                  />

                  Refresh
                </button>
              </div>
            </div>
          </div>

          <div className="card-body p-0">
            <div
              className="table-responsive"
              style={{
                maxHeight: "650px",
                overflowY: "auto",
              }}
            >
              <table
                className="table align-middle mb-0"
                style={{
                  minWidth: "1500px",
                }}
              >
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    background: "#f8f9fa",
                  }}
                >
                  <tr
                    style={{
                      borderBottom:
                        "1px solid #dee2e6",
                    }}
                  >
                    <th className="text-center table-head">
                      #
                    </th>

                    <th className="table-head">
                      STUDENT
                    </th>

                    <th className="table-head">
                      ADMISSION NO
                    </th>

                    <th className="table-head">
                      PARENT
                    </th>

                    <th className="table-head">
                      STANDARD
                    </th>

                    <th className="table-head">
                      SESSION
                    </th>

                    <th className="text-end table-head">
                      TOTAL FEE
                    </th>

                    <th className="text-end table-head">
                      PAID
                    </th>

                    <th className="text-end table-head">
                      DUE
                    </th>

                    <th className="table-head">
                      PAYMENT MODE
                    </th>

                    <th className="text-center table-head">
                      STATUS
                    </th>

                    <th className="text-center table-head">
                      PAYMENT DATE
                    </th>

                    <th className="text-center table-head">
                      ACTION
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="13"
                        className="text-center py-5"
                      >
                        <div
                          className="spinner-border text-primary"
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                          }}
                        />

                        <div className="mt-3 text-muted small">
                          Loading payment records...
                        </div>
                      </td>
                    </tr>
                  ) : filteredPayments.length ===
                    0 ? (
                    <tr>
                      <td
                        colSpan="13"
                        className="text-center py-5"
                      >
                        <div
                          className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                          style={{
                            width: "55px",
                            height: "55px",
                            background: "#f1f3f5",
                            color: "#868e96",
                          }}
                        >
                          <FaExclamationCircle
                            size={23}
                          />
                        </div>

                        <h6 className="fw-semibold text-muted mb-1">
                          No Payment Records
                        </h6>

                        <small className="text-muted">
                          No admission fee payment matches
                          the selected filters.
                        </small>
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map(
                      (item, index) => {
                        const studentName =
                          getStudentName(item);

                        const totalFee =
                          getTotalFee(item);

                        const paidAmount =
                          getPaidAmount(item);

                        const dueAmount =
                          getDueAmount(item);

                        const status =
                          getPaymentStatus(item);

                        const statusConfig =
                          getStatusConfig(status);

                        const paymentMode =
                          getPaymentMode(item);

                        const admissionNo =
                          getAdmissionNumber(item);

                        const student =
                          getStudentData(item);

                        const isReceiptLoading =
                          receiptLoading ===
                          item?.id;

                        return (
                          <tr
                            key={
                              item?.id ||
                              getAdmissionId(
                                item
                              ) ||
                              index
                            }
                            style={{
                              borderBottom:
                                "1px solid #f0f1f2",
                            }}
                          >
                            {/* NUMBER */}

                            <td className="text-center">
                              <span
                                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                style={{
                                  width: "28px",
                                  height: "28px",
                                  background:
                                    "#f4f6f8",
                                  color: "#6c757d",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              >
                                {index + 1}
                              </span>
                            </td>

                            {/* STUDENT */}

                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className="d-flex align-items-center justify-content-center rounded-circle me-2 text-primary"
                                  style={{
                                    width: "38px",
                                    height: "38px",
                                    minWidth: "38px",
                                    background:
                                      "#e9f7ef",
                                    fontWeight:
                                      "700",
                                    fontSize:
                                      "13px",
                                  }}
                                >
                                  {studentName
                                    .charAt(0)
                                    .toUpperCase()}
                                </div>

                                <div>
                                  <div
                                    className="fw-semibold"
                                    style={{
                                      fontSize:
                                        "13px",
                                    }}
                                  >
                                    {studentName}
                                  </div>

                                  <small className="text-muted">
                                    Admission Applicant
                                  </small>
                                </div>
                              </div>
                            </td>

                            {/* ADMISSION NUMBER */}

                            <td>
                              <span
                                className="fw-bold text-primary"
                                style={{
                                  fontSize:
                                    "13px",
                                }}
                              >
                                {admissionNo}
                              </span>
                            </td>

                            {/* PARENT */}

                            <td>
                              <div
                                style={{
                                  fontSize:
                                    "12px",
                                }}
                              >
                                <div className="mb-1">
                                  <span className="text-muted">
                                    Father:
                                  </span>{" "}
                                  <strong>
                                    {student.fatherName ||
                                      "N/A"}
                                  </strong>
                                </div>

                                {student.fatherMobile && (
                                  <small className="text-muted">
                                    {
                                      student.fatherMobile
                                    }
                                  </small>
                                )}
                              </div>
                            </td>

                            {/* STANDARD */}

                            <td>
                              <span
                                className="badge rounded-pill"
                                style={{
                                  background:
                                    "#f4f6f8",
                                  color: "#495057",
                                  border:
                                    "1px solid #e1e5e8",
                                  fontWeight:
                                    "600",
                                  padding:
                                    "6px 10px",
                                }}
                              >
                                {getStandard(
                                  item
                                )}
                              </span>
                            </td>

                            {/* SESSION */}

                            <td>
                              <span
                                className="badge rounded-pill text-primary"
                                style={{
                                  background:
                                    "#f1f8f4",
                                  border:
                                    "1px solid #d9eee1",
                                  fontWeight:
                                    "600",
                                  padding:
                                    "6px 10px",
                                }}
                              >
                                {getSession(item)}
                              </span>
                            </td>

                            {/* TOTAL */}

                            <td className="text-end">
                              <span
                                className="fw-semibold"
                                style={{
                                  fontSize:
                                    "13px",
                                }}
                              >
                                ₹{" "}
                                {formatMoney(
                                  totalFee
                                )}
                              </span>
                            </td>

                            {/* PAID */}

                            <td className="text-end">
                              <span
                                className="fw-bold"
                                style={{
                                  color: "#198754",
                                  fontSize:
                                    "13px",
                                }}
                              >
                                ₹{" "}
                                {formatMoney(
                                  paidAmount
                                )}
                              </span>
                            </td>

                            {/* DUE */}

                            <td className="text-end">
                              <span
                                className="fw-bold"
                                style={{
                                  color:
                                    dueAmount > 0
                                      ? "#dc3545"
                                      : "#198754",
                                  fontSize:
                                    "13px",
                                }}
                              >
                                ₹{" "}
                                {formatMoney(
                                  dueAmount
                                )}
                              </span>
                            </td>

                            {/* PAYMENT MODE */}

                            <td>
                              <span
                                className="badge rounded-pill"
                                style={{
                                  background:
                                    "#eef5ff",
                                  color:
                                    "#2563eb",
                                  border:
                                    "1px solid #dbeafe",
                                  fontWeight:
                                    "600",
                                  padding:
                                    "6px 10px",
                                }}
                              >
                                {paymentMode}
                              </span>
                            </td>

                            {/* STATUS */}

                            <td className="text-center">
                              <div
                                className="d-inline-flex align-items-center rounded-pill"
                                style={{
                                  background:
                                    statusConfig.bg,
                                  color:
                                    statusConfig.color,
                                  padding:
                                    "6px 12px",
                                  minWidth:
                                    "100px",
                                  justifyContent:
                                    "center",
                                }}
                              >
                                <span
                                  className="rounded-circle me-2"
                                  style={{
                                    width: "7px",
                                    height: "7px",
                                    minWidth:
                                      "7px",
                                    background:
                                      statusConfig.dot,
                                  }}
                                />

                                <span
                                  style={{
                                    fontWeight:
                                      "600",
                                    fontSize:
                                      "11px",
                                  }}
                                >
                                  {status}
                                </span>
                              </div>
                            </td>

                            {/* DATE */}

                            <td className="text-center">
                              <div
                                className="d-flex align-items-center justify-content-center gap-1"
                                style={{
                                  fontSize:
                                    "12px",
                                  color:
                                    "#495057",
                                  fontWeight:
                                    "500",
                                }}
                              >
                                <FaCalendarDays
                                  size={12}
                                  className="text-muted"
                                />

                                {formatDate(
                                  getPaymentDate(
                                    item
                                  )
                                )}
                              </div>
                            </td>

                            {/* ACTION */}

                            <td className="text-center">
                              <div className="d-flex align-items-center justify-content-center gap-1">
                                {/* VIEW */}

                                <button
                                  type="button"
                                  className="btn btn-sm d-inline-flex align-items-center justify-content-center"
                                  title="View Payment"
                                  onClick={() =>
                                    handleView(
                                      item
                                    )
                                  }
                                  style={{
                                    width: "34px",
                                    height: "34px",
                                    background:
                                      "#eef5ff",
                                    color:
                                      "#2563eb",
                                    border:
                                      "1px solid #dbeafe",
                                    borderRadius:
                                      "7px",
                                  }}
                                >
                                  <FaEye size={12} />
                                </button>

                                {/* EDIT */}

                                <button
                                  type="button"
                                  className="btn btn-sm d-inline-flex align-items-center justify-content-center"
                                  title="Edit Payment"
                                  onClick={() =>
                                    handleEdit(
                                      item
                                    )
                                  }
                                  style={{
                                    width: "34px",
                                    height: "34px",
                                    background:
                                      "#e9f7ef",
                                    color:
                                      "#198754",
                                    border:
                                      "1px solid #cfe8d8",
                                    borderRadius:
                                      "7px",
                                  }}
                                >
                                  <FaEdit size={12} />
                                </button>

                                {/* RECEIPT */}
<button
  type="button"
  className="btn btn-sm d-inline-flex align-items-center justify-content-center"
  title="View / Print Receipt"
  onClick={() => handleReceipt(item)}
  style={{
    width: "34px",
    height: "34px",
    background: "#fff4d6",
    color: "#997404",
    border: "1px solid #ffe69c",
    borderRadius: "7px",
  }}
>
  <FaReceipt size={12} />
</button>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* FOOTER */}

          <div
            className="card-footer bg-white p-3"
            style={{
              borderTop:
                "1px solid #eef0f2",
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <small className="text-muted">
                Showing{" "}
                <strong className="text-primary">
                  {filteredPayments.length}
                </strong>{" "}
                payment(s)
              </small>

              <div className="d-flex gap-4">
                <small className="text-muted">
                  Collected:{" "}
                  <strong
                    style={{
                      color: "#198754",
                    }}
                  >
                    ₹{" "}
                    {formatMoney(
                      totalCollected
                    )}
                  </strong>
                </small>

                <small className="text-muted">
                  Due:{" "}
                  <strong
                    style={{
                      color: "#dc3545",
                    }}
                  >
                    ₹{" "}
                    {formatMoney(totalDue)}
                  </strong>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>
        {`
          .table-head {
            padding: 14px 12px !important;
            font-size: 12px;
            color: #6c757d;
            font-weight: 700;
            white-space: nowrap;
          }

          .table tbody tr {
            transition: all 0.18s ease;
          }

          .table tbody tr:hover {
            background-color: #fbfdfc;
          }

          .form-select,
          .form-control {
            border-color: #dee2e6;
            border-radius: 7px;
            min-height: 40px;
            font-size: 13px;
          }

          .form-select:focus,
          .form-control:focus {
            border-color: #198754;
            box-shadow:
              0 0 0 0.15rem
              rgba(25, 135, 84, 0.10);
          }

          .input-group-text {
            border-color: #dee2e6;
            border-radius: 7px 0 0 7px;
          }

          .btn {
            border-radius: 7px;
            font-size: 13px;
            font-weight: 500;
          }

          .spin {
            animation:
              spin 0.8s linear infinite;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 768px) {
            .card-header {
              padding: 12px !important;
            }

            .table {
              font-size: 12px;
            }
          }
        `}
      </style>
    </>
  );
};

export default AdmissionFeePaymentList;

