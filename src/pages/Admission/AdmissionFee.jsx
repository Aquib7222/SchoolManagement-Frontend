import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import {
  FaUserGraduate,
  FaMoneyBillWave,
  FaCheckCircle,
  FaExclamationCircle,
  FaGraduationCap,
  FaArrowLeft,
  FaCreditCard,
  FaUniversity,
  FaMobileAlt,
  FaReceipt,
} from "react-icons/fa";

import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

const MONTHS = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];

const FIXED_FEE_FIELDS = [
  {
    key: "annualCharges",
    label: "Annual Charges",
  },
  {
    key: "examCharges",
    label: "Exam Charges",
  },
  {
    key: "sportsFee",
    label: "Sports Fee",
  },
  {
    key: "photoCardFee",
    label: "Photo Card Fee",
  },
  {
    key: "libraryLabFee",
    label: "Library / Lab Fee",
  },
  {
    key: "transportFee",
    label: "Transport Fee",
  },
  {
    key: "miscCharges",
    label: "Miscellaneous Charges",
  },
  {
    key: "registrationFee",
    label: "Registration Fee",
  },
  {
    key: "securityMoney",
    label: "Security Money",
  },
];

const createEmptyFixedFee = () => ({
  amount: 0,
  discount: 0,
});

const Admission_Fee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { sessions = [], standards = [] } = useMasters();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  const [student, setStudent] = useState(null);
  const [admissionStudents, setAdmissionStudents] = useState([]);

  const [visibleMonths, setVisibleMonths] = useState(["April"]);

  const [loadingStudent, setLoadingStudent] = useState(true);
  const [loadingFee, setLoadingFee] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [feeAlreadyPaid, setFeeAlreadyPaid] = useState(false);

  const [showPaymentMode, setShowPaymentMode] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");

  /* =========================================================
     PAYMENT DETAILS
  ========================================================= */

  const [paymentDetails, setPaymentDetails] = useState({
    utrNumber: "",
    bankName: "",
    transactionNumber: "",
  });

  const [paymentError, setPaymentError] = useState("");

  const [formData, setFormData] = useState({
    session: admissionStudents.academicYear || "",
    standard: "",

    tuitionFee: {},

    annualCharges: createEmptyFixedFee(),
    examCharges: createEmptyFixedFee(),
    sportsFee: createEmptyFixedFee(),
    photoCardFee: createEmptyFixedFee(),
    libraryLabFee: createEmptyFixedFee(),
    transportFee: createEmptyFixedFee(),
    miscCharges: createEmptyFixedFee(),
    registrationFee: createEmptyFixedFee(),
    securityMoney: createEmptyFixedFee(),
  });

  /* =========================================================
     LOAD APPROVED ADMISSIONS
  ========================================================= */

  useEffect(() => {
    if (!schoolId || !token) {
      setLoadingStudent(false);
      return;
    }

    const loadStudents = async () => {
      try {
        setLoadingStudent(true);

        const res = await axios.get(
          `/api/admissions/school?schoolId=${schoolId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const approved = (res.data || []).filter(
          (item) => item.status === "APPROVED"
        );

        setAdmissionStudents(approved);
      } catch (error) {
        console.error("Admission students error:", error);
      } finally {
        setLoadingStudent(false);
      }
    };

    loadStudents();
  }, [schoolId, token]);

  /* =========================================================
     FIND SELECTED STUDENT
  ========================================================= */

  useEffect(() => {
    if (!id || admissionStudents.length === 0) return;

    const selected = admissionStudents.find(
      (item) => Number(item.id) === Number(id)
    );

    if (selected) {
      setStudent(selected);
    }
  }, [admissionStudents, id]);

  /* =========================================================
     SET SESSION + STANDARD
  ========================================================= */

  useEffect(() => {
    if (!student) return;

    setFormData((prev) => ({
      ...prev,
      session: student.academicYear || prev.session,
      standard: student.studentClass || prev.standard,
    }));
  }, [student]);

  /* =========================================================
     TRANSPORT REQUIRED
  ========================================================= */

  const hasTransport = useMemo(() => {
    return (
      String(student?.transportRequired || "").toLowerCase() ===
      "yes"
    );
  }, [student]);

  /* =========================================================
     LOAD FEE STRUCTURE
  ========================================================= */

  const loadFeeStructure = async (session, standard) => {
    if (!session || !standard || !schoolId) return;

    try {
      setLoadingFee(true);

      const res = await axios.get("/api/admission-fee/get", {
        params: {
          schoolId,
          session,
          standard,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fee = res.data || {};

      const tuitionObj = {};

      MONTHS.forEach((month) => {
        tuitionObj[month] = Number(fee.tuitionFee || 0);
      });

      setFormData((prev) => ({
        ...prev,

        session,
        standard,

        tuitionFee: tuitionObj,

        annualCharges: {
          amount: Number(fee.annualCharges ),
          discount: 0,
        },

        examCharges: {
          amount: Number(fee.examCharges || 0),
          discount: 0,
        },

        sportsFee: {
          amount: Number(fee.sportsFee || 0),
          discount: 0,
        },

        photoCardFee: {
          amount: Number(fee.photoCardFee || 0),
          discount: 0,
        },

        libraryLabFee: {
          amount: Number(fee.libraryLabFee || 0),
          discount: 0,
        },

        transportFee: {
          amount: hasTransport
            ? Number(fee.transportFee || 0)
            : 0,
          discount: 0,
        },

        miscCharges: {
          amount: Number(fee.miscCharges || 0),
          discount: 0,
        },

        registrationFee: {
          amount: Number(fee.registrationFee || 0),
          discount: 0,
        },

        securityMoney: {
          amount: Number(fee.securityMoney || 0),
          discount: 0,
        },
      }));
    } catch (error) {
      console.error("Fee structure error:", error);

      alert(
        error?.response?.data?.message ||
          "Fee setup not found for selected Session & Class"
      );
    } finally {
      setLoadingFee(false);
    }
  };

  /* =========================================================
     SESSION / CLASS CHANGE
  ========================================================= */

  const handleSessionClassChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const session =
      name === "session" ? value : formData.session;

    const standard =
      name === "standard" ? value : formData.standard;

    if (!session || !standard) return;

    await loadFeeStructure(session, standard);
  };

  /* =========================================================
     LOAD FEE WHEN STUDENT SELECTED
  ========================================================= */

  useEffect(() => {
    if (!student) return;

    const session = student.academicYear;
    const standard = student.studentClass;

    if (!session || !standard) return;

    loadFeeStructure(session, standard);
  }, [student]);

  /* =========================================================
     MONTH MANAGEMENT
  ========================================================= */

  const addNextMonth = () => {
    const nextMonth = MONTHS[visibleMonths.length];

    if (!nextMonth) return;

    setVisibleMonths((prev) => [...prev, nextMonth]);
  };

  const removeMonth = (month) => {
    setVisibleMonths((prev) => {
      const updated = prev.filter(
        (item) => item !== month
      );

      return updated.length > 0
        ? updated
        : ["April"];
    });
  };

  /* =========================================================
     FEE CHANGE
  ========================================================= */

  const handleFeeChange = (fee, field, value) => {
    const numericValue = Math.max(
      Number(value) || 0,
      0
    );

    setFormData((prev) => ({
      ...prev,

      [fee]: {
        ...prev[fee],
        [field]: numericValue,
      },
    }));
  };

  /* =========================================================
     TUITION CHANGE
  ========================================================= */

  const handleTuitionChange = (month, value) => {
    const numericValue = Math.max(
      Number(value) || 0,
      0
    );

    setFormData((prev) => ({
      ...prev,

      tuitionFee: {
        ...prev.tuitionFee,
        [month]: numericValue,
      },
    }));
  };

  /* =========================================================
     TOTAL CALCULATION
  ========================================================= */

  const totalAmount = useMemo(() => {
    let total = 0;

    FIXED_FEE_FIELDS.forEach(({ key }) => {
      if (
        key === "transportFee" &&
        !hasTransport
      ) {
        return;
      }

      const fee = formData[key] || {};

      const amount = Number(
        fee.amount || 0
      );

      const discount = Number(
        fee.discount || 0
      );

      total += Math.max(
        amount - discount,
        0
      );
    });

    visibleMonths.forEach((month) => {
      total += Number(
        formData.tuitionFee?.[month] || 0
      );
    });

    return total;
  }, [
    formData,
    visibleMonths,
    hasTransport,
  ]);

  /* =========================================================
     RESET TRANSPORT
  ========================================================= */

  useEffect(() => {
    if (!hasTransport) {
      setFormData((prev) => ({
        ...prev,

        transportFee: {
          amount: 0,
          discount: 0,
        },
      }));
    }
  }, [hasTransport]);

  /* =========================================================
     CHECK FEE ALREADY PAID
  ========================================================= */

  useEffect(() => {
    if (
      !student ||
      !formData.session ||
      !formData.standard ||
      !schoolId
    ) {
      return;
    }

    const checkFee = async () => {
      try {
        const res = await axios.get(
          "/api/admission-fee/check",
          {
            params: {
              admissionNumber:
                student.admissionNumber,

              session: formData.session,

              standard: formData.standard,

              schoolId,
            },

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFeeAlreadyPaid(
          Boolean(res.data?.alreadyPaid)
        );

        if (res.data?.alreadyPaid) {
          setShowPaymentMode(false);
          setPaymentMode("");

          setPaymentDetails({
            utrNumber: "",
            bankName: "",
            transactionNumber: "",
          });
        }
      } catch (error) {
        console.error(
          "Fee check error:",
          error
        );
      }
    };

    checkFee();
  }, [
    student,
    formData.session,
    formData.standard,
    schoolId,
    token,
  ]);

  /* =========================================================
     PAYMENT MODE CHANGE
  ========================================================= */

  const handlePaymentModeChange = (e) => {
    const value = e.target.value;

    setPaymentMode(value);
    setPaymentError("");

    setPaymentDetails({
      utrNumber: "",
      bankName: "",
      transactionNumber: "",
    });
  };

  /* =========================================================
     PAYMENT DETAILS CHANGE
  ========================================================= */

  const handlePaymentDetailsChange = (
    e
  ) => {
    const { name, value } = e.target;

    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPaymentError("");
  };

  /* =========================================================
     PAYMENT VALIDATION
  ========================================================= */

  const isPaymentDetailsValid = useMemo(() => {
    if (!paymentMode) return false;

    if (paymentMode === "Cash") {
      return true;
    }

    if (paymentMode === "UPI") {
      return (
        paymentDetails.utrNumber.trim()
          .length > 0
      );
    }

    if (paymentMode === "Net Banking") {
      return (
        paymentDetails.bankName.trim()
          .length > 0 &&
        paymentDetails.transactionNumber
          .trim().length > 0
      );
    }

    return false;
  }, [
    paymentMode,
    paymentDetails,
  ]);

  /* =========================================================
     VALIDATE PAYMENT
  ========================================================= */

  const validatePayment = () => {
    if (!paymentMode) {
      setPaymentError(
        "Please select a payment mode."
      );

      return false;
    }

    if (
      paymentMode === "UPI" &&
      !paymentDetails.utrNumber.trim()
    ) {
      setPaymentError(
        "Please enter UTR / Transaction Number."
      );

      return false;
    }

    if (
      paymentMode === "Net Banking" &&
      !paymentDetails.bankName.trim()
    ) {
      setPaymentError(
        "Please enter bank name."
      );

      return false;
    }

    if (
      paymentMode === "Net Banking" &&
      !paymentDetails.transactionNumber.trim()
    ) {
      setPaymentError(
        "Please enter transaction / reference number."
      );

      return false;
    }

    return true;
  };

  /* =========================================================
     PAYMENT
  ========================================================= */

  const handlePayFee = async () => {
    if (!student) {
      alert(
        "Student information not found."
      );

      return;
    }

    if (!validatePayment()) {
      return;
    }

    if (
      !formData.session ||
      !formData.standard
    ) {
      alert(
        "Please select Session and Class"
      );

      return;
    }

    if (totalAmount <= 0) {
      alert(
        "Fee amount must be greater than zero."
      );

      return;
    }

    if (feeAlreadyPaid) {
      alert(
        "Admission fee is already paid."
      );

      return;
    }

    /* =====================================================
       PAYMENT DETAILS PAYLOAD
    ===================================================== */

    let paymentDetailsPayload = {};

    if (paymentMode === "Cash") {
      paymentDetailsPayload = {
        paymentMode: "Cash",
      };
    }

    if (paymentMode === "UPI") {
      paymentDetailsPayload = {
        paymentMode: "UPI",
        utrNumber:
          paymentDetails.utrNumber.trim(),
      };
    }

    if (paymentMode === "Net Banking") {
      paymentDetailsPayload = {
        paymentMode: "Net Banking",
        bankName:
          paymentDetails.bankName.trim(),

        transactionNumber:
          paymentDetails.transactionNumber.trim(),
      };
    }

    const payload = {
      admission:
        student.admissionNumber,

      schoolId: Number(schoolId),

      session: formData.session,

      standard: formData.standard,

      tuitionFee:
        formData.tuitionFee,

      paidMonths: visibleMonths,

      fixedFees: {
        annualCharges:
          formData.annualCharges,

        examCharges:
          formData.examCharges,

        sportsFee:
          formData.sportsFee,

        photoCardFee:
          formData.photoCardFee,

        libraryLabFee:
          formData.libraryLabFee,

        ...(hasTransport && {
          transportFee:
            formData.transportFee,
        }),

        miscCharges:
          formData.miscCharges,

        registrationFee:
          formData.registrationFee,

        securityMoney:
          formData.securityMoney,
      },

      totalAmount,

      paymentMode,

      paymentDetails:
        paymentDetailsPayload,
    };

    try {
      setPaymentLoading(true);

      const res = await axios.post(
        "/api/admission-fee/pay",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const receiptData = {
        receiptNo: res.data?.id,

        schoolName:
          student.school?.schoolName ||
          user?.school?.schoolName ||
          "School Management System",

        studentName:
          `${student.firstName || ""} ${
            student.lastName || ""
          }`.trim(),

        admissionNumber:
          student.admissionNumber,

        standard:
          formData.standard,

        session:
          formData.session,

        paymentDate: new Date(),

        paymentMode,

        paymentDetails:
          paymentDetailsPayload,

        fees:
          payload.fixedFees,

        tuitionMonths:
          visibleMonths,

        tuitionFee:
          formData.tuitionFee,

        totalAmount,
      };

      alert(
        "Fee paid successfully ✅"
      );

      navigate(
        "/admission/fee/receipt",
        {
          state: {
            receiptData,
          },
        }
      );
    } catch (error) {
      console.error(
        "Payment error:",
        error?.response?.data ||
          error
      );

      alert(
        error?.response?.data?.message ||
          "Fee payment failed ❌"
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loadingStudent) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <span className="ms-2">
          Loading student...
        </span>
      </div>
    );
  }

  /* =========================================================
     STUDENT NOT FOUND
  ========================================================= */

  if (!student) {
    return (
      <>
        <div className="mx-2 mt-2 mb-3 px-2">
          <div
            className="rounded-4 shadow overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
              border:
                "1px solid #dbeafe",
            }}
          >
            <div className="p-3 p-md-4">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-4"
                  style={{
                    width: "52px",
                    height: "52px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                  }}
                >
                  <FaMoneyBillWave
                    size={25}
                  />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold">
                    Admission Fee Payment
                  </h5>

                  <div className="text-muted small">
                    Admission / Fee Payment
                  </div>
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
                Home &nbsp;›&nbsp; Admission
                &nbsp;›&nbsp;
                <span className="text-primary fw-semibold">
                  Fee Payment
                </span>
              </small>
            </div>
          </div>
        </div>

        <div className="m-3 p-5 bg-white shadow rounded-4 text-center">
          <FaExclamationCircle
            size={45}
            className="text-danger mb-3"
          />

          <h5>
            Student Not Found
          </h5>

          <p className="text-muted">
            Approved admission record
            could not be found.
          </p>

          <button
            className="btn btn-primary"
            onClick={() =>
              navigate(
                "/admission/fee_payment"
              )
            }
          >
            <FaArrowLeft
              className="me-2"
            />
            Back to Admission Fee
          </button>
        </div>
      </>
    );
  }

  const fullName =
    `${student.firstName || ""} ${
      student.middleName || ""
    } ${
      student.lastName || ""
    }`
      .replace(/\s+/g, " ")
      .trim();

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
            border:
              "1px solid #dbeafe",
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
                  <FaMoneyBillWave
                    size={26}
                  />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Admission Fee Payment
                  </h5>

                  <div className="text-muted small">
                    Admission &nbsp;/&nbsp;
                    Fee Payment &nbsp;/&nbsp;
                    {student.admissionNumber}
                  </div>
                </div>
              </div>

              <button
                className="btn btn-light border d-flex align-items-center gap-2 rounded-4 px-3"
                onClick={() =>
                  navigate(
                    "/admission/fee_payment"
                  )
                }
              >
                <FaArrowLeft
                  size={12}
                />
                Back
              </button>
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
              Home &nbsp;›&nbsp; Admission
              &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Admission Fee Payment
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          STUDENT SUMMARY
      ===================================================== */}

      <div className="px-2 mb-4">
        <div className="row g-3 ">

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-blue shadow">
              <div className="stat-icon">
                <FaUserGraduate />
              </div>

              <div className="stat-content">
                <span>Student</span>
                <h6 className="fw-bold mb-0">
                  {fullName || "N/A"}
                </h6>
                <small>
                  {student.admissionNumber ||
                    "N/A"}
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-green shadow">
              <div className="stat-icon">
                <FaGraduationCap />
              </div>

              <div className="stat-content">
                <span>Class</span>

                <h3
                  style={{
                    fontSize: "21px",
                  }}
                >
                  {student.studentClass ||
                    "N/A"}
                </h3>

                <small>
                  Applied Class
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-orange shadow">
              <div className="stat-icon">
                <FaReceipt />
              </div>

              <div className="stat-content">
                <span>Session</span>

                <h3
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {student.academicYear ||
                    "N/A"}
                </h3>

                <small>
                  Academic Session
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
                <span>Total Payable</span>

                <h3>
                  ₹
                  {totalAmount.toFixed(
                    2
                  )}
                </h3>

                <small>
                  Admission Fee
                </small>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="ms-2 me-2 mb-4">

        {/* ===================================================
            STUDENT INFORMATION
        =================================================== */}

        <div className="card border-0 shadow rounded-4 mb-4">

          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom:
                "1px solid #eef0f2",
            }}
          >
            <div className="d-flex align-items-center">

              <div
                className="rounded-2 d-flex align-items-center justify-content-center me-2"
                style={{
                  width: "36px",
                  height: "36px",
                  background:
                    "#e9f7ef",
                  color: "#198754",
                }}
              >
                <FaUserGraduate
                  size={16}
                  className="text-primary"
                />
              </div>

              <div>
                <h6 className="mb-0 fw-bold">
                  Student Information
                </h6>

                <small className="text-muted">
                  Verify applicant details
                  before payment
                </small>
              </div>

              {feeAlreadyPaid && (
                <span
                  className="badge rounded-pill ms-auto px-3 py-2"
                  style={{
                    background:
                      "#e8f7ee",
                    color:
                      "#198754",
                  }}
                >
                  <FaCheckCircle className="me-1" />
                  Fee Paid
                </span>
              )}
            </div>
          </div>

          <div className="card-body p-3">

            <div className="row g-3">

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold small">
                  Student Name
                </label>

                <input
                  value={
                    fullName || "-"
                  }
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold small">
                  Class
                </label>

                <input
                  value={
                    student.studentClass ||
                    "-"
                  }
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold small">
                  Admission No
                </label>

                <input
                  value={
                    student.admissionNumber ||
                    "-"
                  }
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold small">
                  Father's Name
                </label>

                <input
                  value={
                    student.fatherName ||
                    "-"
                  }
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold small">
                  Father's Mobile
                </label>

                <input
                  value={
                    student.fatherMobile ||
                    "-"
                  }
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold small">
                  Transport Required
                </label>

                <input
                  value={
                    hasTransport
                      ? "Yes"
                      : "No"
                  }
                  className="form-control"
                  disabled
                />
              </div>

            </div>
          </div>
        </div>

        {/* ===================================================
            SESSION / CLASS
        =================================================== */}

        <div className="card border-0 shadow rounded-4 mb-4">

          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom:
                "1px solid #eef0f2",
            }}
          >
            <div>
              <h6 className="mb-1 fw-bold">
                <FaGraduationCap
                  className="text-primary me-2"
                  size={14}
                />
                Fee Structure
              </h6>

              <small className="text-muted">
                Select session and class
                to load applicable fees
              </small>
            </div>
          </div>

          <div className="card-body p-3">

            <div className="row g-3">

              <div className="col-12 col-md-4">

                <label className="form-label fw-semibold small">
                  Session
                </label>

                <select
                  name="session"
                  value={
                    formData.session
                  }
                  onChange={
                    handleSessionClassChange
                  }
                  className="form-select"
                >
                  <option value="">
                    Select Session
                  </option>

                  {sessions.map(
                    (session) => (
                      <option
                        key={session}
                        value={session}
                      >
                        {session}
                      </option>
                    )
                  )}
                </select>

              </div>

              <div className="col-12 col-md-4">

                <label className="form-label fw-semibold small">
                  Class
                </label>

                <select
                  name="standard"
                  value={
                    formData.standard
                  }
                  onChange={
                    handleSessionClassChange
                  }
                  className="form-select"
                >
                  <option value="">
                    Select Class
                  </option>

                  {standards.map(
                    (standard) => (
                      <option
                        key={standard}
                        value={standard}
                      >
                        {standard}
                      </option>
                    )
                  )}
                </select>

              </div>

              {loadingFee && (
                <div className="col-12 col-md-4 d-flex align-items-end">

                  <div
                    className="rounded-3 px-3 py-2"
                    style={{
                      background:
                        "#eef6ff",
                      color:
                        "#2563eb",
                      fontSize:
                        "13px",
                    }}
                  >
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />

                    Loading fee
                    structure...
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>

        {/* ===================================================
            FEE DETAILS
        =================================================== */}

        <div className="card border-0 shadow rounded-4">

          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom:
                "1px solid #eef0f2",
            }}
          >
            <div>
              <h6 className="mb-1 fw-bold">
                <FaMoneyBillWave
                  className="text-primary me-2"
                  size={14}
                />
                Fee Details
              </h6>

              <small className="text-muted">
                Review tuition and other
                admission charges
              </small>
            </div>
          </div>

          <div className="card-body p-3">

            <div className="row g-3">

              {/* TUITION */}

              <div className="col-12 col-md-4">

                <div
                  className="border rounded-4 p-3 h-100"
                  style={{
                    borderColor:
                      "#e1e5e8",
                  }}
                >

                  <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">

                    <h6 className="fw-bold text-primary mb-0">
                      Tuition Fee
                    </h6>

                    <span
                      className="badge rounded-pill"
                      style={{
                        background:
                          "#eef6ff",
                        color:
                          "#2563eb",
                      }}
                    >
                      {visibleMonths.length} Month
                      {visibleMonths.length >
                      1
                        ? "s"
                        : ""}
                    </span>

                  </div>

                  {visibleMonths.map(
                    (
                      month,
                      index
                    ) => (
                      <div
                        key={month}
                        className="mb-3"
                      >

                        <div className="d-flex align-items-center justify-content-between">

                          <label className="form-label fw-semibold mb-1 small">
                            {month}
                          </label>

                          <div className="d-flex align-items-center">

                            {index ===
                              visibleMonths.length -
                                1 &&
                              visibleMonths.length <
                                MONTHS.length && (
                                <CiSquarePlus
                                  size={25}
                                  className="text-primary"
                                  style={{
                                    cursor:
                                      "pointer",
                                  }}
                                  onClick={
                                    addNextMonth
                                  }
                                />
                              )}

                            {visibleMonths.length >
                              1 && (
                              <CiSquareMinus
                                size={25}
                                className="text-danger ms-1"
                                style={{
                                  cursor:
                                    "pointer",
                                }}
                                onClick={() =>
                                  removeMonth(
                                    month
                                  )
                                }
                              />
                            )}

                          </div>

                        </div>

                        <div className="input-group">

                          <span className="input-group-text">
                            ₹
                          </span>

                          <input
                            type="number"
                            min="0"
                            className="form-control"
                            value={
                              formData
                                .tuitionFee?.[
                                month
                              ] ?? ""
                            }
                            onChange={(e) =>
                              handleTuitionChange(
                                month,
                                e.target
                                  .value
                              )
                            }
                          />

                        </div>
                      </div>
                    )
                  )}

                  <small className="text-muted">
                    Add months using the +
                    icon.
                  </small>

                </div>
              </div>

              {/* FIXED FEES */}

              {FIXED_FEE_FIELDS.map(
                ({
                  key,
                  label,
                }) => {

                  if (
                    key ===
                      "transportFee" &&
                    !hasTransport
                  ) {
                    return null;
                  }

                  const fee =
                    formData[key] ||
                    {};

                  return (
                    <div
                      className="col-12 col-md-4"
                      key={key}
                    >

                      <div
                        className="border rounded-4 p-3 h-100"
                        style={{
                          borderColor:
                            "#e1e5e8",
                        }}
                      >

                        <label className="form-label fw-semibold small">
                          {label}
                        </label>

                        <div className="input-group mb-2">

                          <span className="input-group-text">
                            ₹
                          </span>

                          <input
                            type="number"
                            min="0"
                            className="form-control"
                            value={
                              fee.amount ??
                              0
                            }
                            onChange={(
                              e
                            ) =>
                              handleFeeChange(
                                key,
                                "amount",
                                e.target
                                  .value
                              )
                            }
                          />

                        </div>

                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          placeholder="Discount"
                          value={
                            fee.discount ??
                            0
                          }
                          onChange={(
                            e
                          ) =>
                            handleFeeChange(
                              key,
                              "discount",
                              e.target
                                .value
                            )
                          }
                        />

                        {Number(
                          fee.discount ||
                            0
                        ) > 0 && (
                          <small className="text-success d-block mt-1">
                            Discount: ₹
                            {Number(
                              fee.discount ||
                                0
                            ).toFixed(
                              2
                            )}
                          </small>
                        )}

                      </div>
                    </div>
                  );
                }
              )}

            </div>
          </div>
        </div>

        {/* ===================================================
            PAYMENT SUMMARY
        =================================================== */}

        <div className="card border-0 shadow rounded-4 mt-4">

          <div className="card-body p-3">

            <div className="row align-items-center">

              <div className="col-12 col-md-6">

                <div
                  className="rounded-4 p-3"
                  style={{
                    background:
                      "linear-gradient(135deg,#f8fbff,#eef6ff)",
                    border:
                      "1px solid #dbeafe",
                  }}
                >

                  <div className="d-flex align-items-center gap-3">

                    <div
                      className="d-flex align-items-center justify-content-center rounded-3"
                      style={{
                        width: "45px",
                        height: "45px",
                        background:
                          "#e0edff",
                        color:
                          "#2563eb",
                      }}
                    >
                      <FaMoneyBillWave />
                    </div>

                    <div>
                      <h6 className="text-muted mb-1">
                        Total Payable Amount
                      </h6>

                      <h2 className="text-primary fw-bold mb-0">
                        ₹
                        {totalAmount.toFixed(
                          2
                        )}
                      </h2>

                      <small className="text-muted">
                        {
                          visibleMonths.length
                        }{" "}
                        tuition month
                        {visibleMonths.length >
                        1
                          ? "s"
                          : ""}{" "}
                        selected
                      </small>
                    </div>

                  </div>

                </div>
              </div>

              <div className="col-12 col-md-6 mt-3 mt-md-0 text-md-end">

                {feeAlreadyPaid ? (

                  <div>
                    <span
                      className="badge rounded-pill px-4 py-3"
                      style={{
                        background:
                          "#e8f7ee",
                        color:
                          "#198754",
                        fontSize:
                          "14px",
                      }}
                    >
                      <FaCheckCircle className="me-2" />
                      Admission Fee
                      Already Paid
                    </span>
                  </div>

                ) : (

                  <button
                    className="btn btn-success btn-lg px-5 rounded-3"
                    onClick={() =>
                      setShowPaymentMode(
                        true
                      )
                    }
                    disabled={
                      paymentLoading ||
                      totalAmount <= 0
                    }
                  >
                    <FaMoneyBillWave className="me-2" />
                    Pay ₹
                    {totalAmount.toFixed(
                      2
                    )}
                  </button>

                )}

              </div>

            </div>
          </div>
        </div>

        {/* ===================================================
            PAYMENT MODE
        =================================================== */}

        {showPaymentMode &&
          !feeAlreadyPaid && (

          <div className="card border-0 shadow rounded-4 mt-4">

            <div
              className="card-header bg-white p-3"
              style={{
                borderBottom:
                  "1px solid #eef0f2",
              }}
            >

              <div className="d-flex align-items-center">

                <div
                  className="rounded-2 d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: "36px",
                    height: "36px",
                    background:
                      "#e9f7ef",
                    color:
                      "#198754",
                  }}
                >
                  <FaCreditCard
                    size={16}
                    className="text-primary"
                  />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">
                    Payment Details
                  </h6>

                  <small className="text-muted">
                    Select payment mode and
                    enter required details
                  </small>
                </div>

              </div>
            </div>

            <div className="card-body p-3">

              <div className="row g-3">

                {/* PAYMENT MODE */}

                <div className="col-12 col-md-4">

                  <label className="form-label fw-semibold small">
                    Payment Mode
                    <span className="text-danger">
                      {" "}
                      *
                    </span>
                  </label>

                  <select
                    className="form-select"
                    value={
                      paymentMode
                    }
                    onChange={
                      handlePaymentModeChange
                    }
                  >
                    <option value="">
                      Select Payment Mode
                    </option>

                    <option value="Cash">
                      Cash
                    </option>

                    <option value="UPI">
                      UPI
                    </option>

                    <option value="Net Banking">
                      Net Banking
                    </option>
                  </select>

                </div>

                {/* CASH */}

                {paymentMode ===
                  "Cash" && (

                  <div className="col-12 col-md-8">

                    <div
                      className="h-100 rounded-4 p-3 d-flex align-items-center"
                      style={{
                        background:
                          "#f0fdf4",
                        border:
                          "1px solid #bbf7d0",
                      }}
                    >

                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle me-3"
                        style={{
                          width: "42px",
                          height: "42px",
                          background:
                            "#dcfce7",
                          color:
                            "#198754",
                        }}
                      >
                        <FaMoneyBillWave />
                      </div>

                      <div>
                        <div className="fw-bold text-success">
                          Cash Payment
                        </div>

                        <small className="text-muted">
                          Cash payment selected.
                          You can proceed directly
                          to payment.
                        </small>
                      </div>

                    </div>

                  </div>
                )}

                {/* UPI */}

                {paymentMode ===
                  "UPI" && (

                  <div className="col-12 col-md-8">

                    <label className="form-label fw-semibold small">
                      UTR / Transaction Number
                      <span className="text-danger">
                        {" "}
                        *
                      </span>
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        <FaMobileAlt className="text-primary" />
                      </span>

                      <input
                        type="text"
                        name="utrNumber"
                        value={
                          paymentDetails.utrNumber
                        }
                        onChange={
                          handlePaymentDetailsChange
                        }
                        className="form-control"
                        placeholder="Enter UTR / Transaction Number"
                      />

                    </div>

                    <small className="text-muted">
                      Enter the UTR / transaction
                      reference received after
                      the UPI payment.
                    </small>

                  </div>
                )}

                {/* NET BANKING */}

                {paymentMode ===
                  "Net Banking" && (
                  <>
                    <div className="col-12 col-md-4">

                      <label className="form-label fw-semibold small">
                        Bank Name
                        <span className="text-danger">
                          {" "}
                          *
                        </span>
                      </label>

                      <div className="input-group">

                        <span className="input-group-text bg-white">
                          <FaUniversity className="text-primary" />
                        </span>

                        <input
                          type="text"
                          name="bankName"
                          value={
                            paymentDetails.bankName
                          }
                          onChange={
                            handlePaymentDetailsChange
                          }
                          className="form-control"
                          placeholder="Enter bank name"
                        />

                      </div>

                    </div>

                    <div className="col-12 col-md-4">

                      <label className="form-label fw-semibold small">
                        Transaction / Reference No.
                        <span className="text-danger">
                          {" "}
                          *
                        </span>
                      </label>

                      <div className="input-group">

                        <span className="input-group-text bg-white">
                          <FaReceipt className="text-primary" />
                        </span>

                        <input
                          type="text"
                          name="transactionNumber"
                          value={
                            paymentDetails.transactionNumber
                          }
                          onChange={
                            handlePaymentDetailsChange
                          }
                          className="form-control"
                          placeholder="Enter reference number"
                        />

                      </div>

                    </div>
                  </>
                )}

              </div>

              {/* VALIDATION ERROR */}

              {paymentError && (
                <div className="alert alert-danger mt-3 mb-0 py-2">
                  <FaExclamationCircle className="me-2" />
                  {paymentError}
                </div>
              )}

              {/* PAYMENT ACTIONS */}

              <div
                className="d-flex justify-content-end gap-2 mt-4 pt-3"
                style={{
                  borderTop:
                    "1px solid #eef0f2",
                }}
              >

                <button
                  className="btn btn-light border px-4"
                  disabled={
                    paymentLoading
                  }
                  onClick={() => {
                    setShowPaymentMode(
                      false
                    );

                    setPaymentMode("");

                    setPaymentDetails({
                      utrNumber:
                        "",
                      bankName:
                        "",
                      transactionNumber:
                        "",
                    });

                    setPaymentError(
                      ""
                    );
                  }}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary px-4"
                  disabled={
                    paymentLoading ||
                    !isPaymentDetailsValid
                  }
                  onClick={
                    handlePayFee
                  }
                >

                  {paymentLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      />

                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="me-2" />
                      Pay ₹
                      {totalAmount.toFixed(
                        2
                      )}
                    </>
                  )}

                </button>

              </div>

            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>
        {`
          .premium-stat-card {
            position: relative;
            display: flex;
            align-items: center;
            gap: 14px;
            min-height: 105px;
            padding: 18px;
            border-radius: 16px;
            background: #ffffff;
            overflow: hidden;
          }

          .premium-stat-card .stat-icon {
            width: 48px;
            height: 48px;
            min-width: 48px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
          }

          .premium-stat-card .stat-content {
            min-width: 0;
          }

          .premium-stat-card .stat-content span {
            display: block;
            color: #6c757d;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 3px;
          }

          .premium-stat-card .stat-content h3 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            color: #212529;
          }

          .premium-stat-card .stat-content h6 {
            font-size: 15px;
            margin-bottom: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .premium-stat-card .stat-content small {
            color: #868e96;
            font-size: 11px;
          }

          .stat-blue .stat-icon {
            background: #e9f2ff;
            color: #2563eb;
          }

          .stat-green .stat-icon {
            background: #e9f7ef;
            color: #198754;
          }

          .stat-orange .stat-icon {
            background: #fff4df;
            color: #f59f00;
          }

          .stat-red .stat-icon {
            background: #fff0f0;
            color: #dc3545;
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
            box-shadow: 0 0 0 0.15rem rgba(25, 135, 84, 0.10);
          }

          .input-group-text {
            border-color: #dee2e6;
            font-size: 13px;
          }

          .btn {
            border-radius: 7px;
            font-size: 13px;
            font-weight: 500;
          }

          .card {
            transition: all 0.18s ease;
          }

          @media (max-width: 768px) {
            .premium-stat-card {
              min-height: 90px;
              padding: 14px;
            }

            .premium-stat-card .stat-icon {
              width: 42px;
              height: 42px;
              min-width: 42px;
              font-size: 17px;
            }

            .premium-stat-card .stat-content h3 {
              font-size: 20px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Admission_Fee;