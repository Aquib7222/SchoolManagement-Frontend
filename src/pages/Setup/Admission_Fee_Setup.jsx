
import React, { useEffect, useState } from "react";
import {
  FaGraduationCap,
  FaMoneyBillWave,
  FaSave,
  FaRedo,
  FaCalendarAlt,
  FaBook,
  FaBus,
  FaIdCard,
  FaFlask,
  FaFileInvoiceDollar,
  FaShieldAlt,
  FaClipboardCheck,
} from "react-icons/fa";

import { FaFilter } from "react-icons/fa6";

import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";

const Admission_Fee_Setup = () => {
  const { sessions = [], standards = [] } = useMasters();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [loadingStructure, setLoadingStructure] = useState(false);

  const [formData, setFormData] = useState({
    session: "",
    standard: "",
    annualCharges: "",
    examCharges: "",
    tuitionFee: "",
    sportsFee: "",
    photoCardFee: "",
    libraryLabFee: "",
    transportFee: "",
    miscCharges: "",
    registrationFee: "",
    securityMoney: "",
  });

  /* =========================================================
     FEE FIELD CONFIG
  ========================================================= */

  const FEE_FIELDS = [
    {
      name: "annualCharges",
      label: "Annual Charges",
      icon: FaCalendarAlt,
      description: "Annual school charges",
    },
    {
      name: "examCharges",
      label: "Examination Charges",
      icon: FaClipboardCheck,
      description: "Examination related charges",
    },
    {
      name: "tuitionFee",
      label: "Tuition Fee",
      icon: FaGraduationCap,
      description: "Monthly tuition fee",
    },
    {
      name: "sportsFee",
      label: "Sports Fee",
      icon: FaMoneyBillWave,
      description: "Sports & activities fee",
    },
    {
      name: "photoCardFee",
      label: "Photo & I-Card",
      icon: FaIdCard,
      description: "Student photo & identity card",
    },
    {
      name: "libraryLabFee",
      label: "Library & Lab",
      icon: FaFlask,
      description: "Library and laboratory charges",
    },
    {
      name: "transportFee",
      label: "Transport Fee",
      icon: FaBus,
      description: "School transport charges",
    },
    {
      name: "miscCharges",
      label: "Miscellaneous Charges",
      icon: FaFileInvoiceDollar,
      description: "Other miscellaneous charges",
    },
    {
      name: "registrationFee",
      label: "Registration Fee",
      icon: FaBook,
      description: "Admission registration charges",
    },
    {
      name: "securityMoney",
      label: "Security Money",
      icon: FaShieldAlt,
      description: "Refundable security amount",
    },
  ];

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    if (!schoolId) {
      console.warn("School ID not found");
    }
  }, [schoolId]);

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     SESSION / STANDARD CHANGE
  ========================================================= */

  const handleSessionClassChange = async (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedForm);

    if (!updatedForm.session || !updatedForm.standard) {
      return;
    }

    await loadFeeStructure(
      updatedForm.session,
      updatedForm.standard
    );
  };

  /* =========================================================
     LOAD FEE STRUCTURE
  ========================================================= */

  const loadFeeStructure = async (session, standard) => {
    if (!schoolId || !session || !standard) return;

    try {
      setLoadingStructure(true);

      const res = await axiosInstance.get(
        "/api/admission-fee/get",
        {
          params: {
            schoolId,
            session,
            standard,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        setFormData((prev) => ({
          ...prev,
          ...res.data,
          session,
          standard,
        }));
      } else {
        resetFeeFields(session, standard);
      }
    } catch (error) {
      console.error(
        "Fee structure loading error:",
        error?.response?.data || error
      );

      /*
       * If record is not available then simply
       * reset fee fields for new entry.
       */
      resetFeeFields(session, standard);
    } finally {
      setLoadingStructure(false);
    }
  };

  /* =========================================================
     RESET FEE FIELDS
  ========================================================= */

  const resetFeeFields = (session = "", standard = "") => {
    setFormData({
      session,
      standard,
      annualCharges: "",
      examCharges: "",
      tuitionFee: "",
      sportsFee: "",
      photoCardFee: "",
      libraryLabFee: "",
      transportFee: "",
      miscCharges: "",
      registrationFee: "",
      securityMoney: "",
    });
  };

  /* =========================================================
     RESET FORM
  ========================================================= */

  const handleReset = () => {
    resetFeeFields();
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!schoolId) {
      alert("School information not found.");
      return;
    }

    if (!formData.session) {
      alert("Please select Academic Session.");
      return;
    }

    if (!formData.standard) {
      alert("Please select Standard.");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post(
        `/api/admission-fee/save?schoolId=${schoolId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Admission Fee Saved Successfully ✅");

      /*
       * Reload saved structure so UI stays synced
       */
      await loadFeeStructure(
        formData.session,
        formData.standard
      );
    } catch (error) {
      console.error(
        "Fee save error:",
        error?.response?.data || error
      );

      alert(
        error?.response?.data?.message ||
          "Error saving admission fee ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     TOTAL FEE
  ========================================================= */

  const totalFee = FEE_FIELDS.reduce((total, item) => {
    return total + (Number(formData[item.name]) || 0);
  }, 0);

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

              {/* LEFT */}

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
                  <FaGraduationCap size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Admission Fee Setup
                  </h5>

                  <div className="text-muted small">
                    Admission &nbsp;/&nbsp; Fee Setup
                  </div>
                </div>
              </div>

              {/* RIGHT */}

              <div className="d-flex align-items-center gap-2">

                <button
                  type="button"
                  className="btn btn-light border d-flex align-items-center justify-content-center gap-2 rounded-4 px-3"
                  onClick={handleReset}
                  disabled={loading}
                >
                  <FaRedo size={12} />
                  Reset
                </button>

              </div>
            </div>
          </div>

          {/* BREADCRUMB */}

          <div
            className="px-4 py-2"
            style={{
              backgroundColor: "rgba(239,246,255,.75)",
              borderTop: "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp; Admission &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Admission Fee Setup
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 px-2">

        {/* SESSION */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">

            <div className="stat-icon">
              <FaCalendarAlt />
            </div>

            <div className="stat-content">
              <span>Academic Session</span>

              <h3
                style={{
                  fontSize:
                    formData.session ? "20px" : "25px",
                }}
              >
                {formData.session || "-"}
              </h3>

              <small>
                Selected Session
              </small>
            </div>

          </div>
        </div>

        {/* STANDARD */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow">

            <div className="stat-icon">
              <FaGraduationCap />
            </div>

            <div className="stat-content">
              <span>Standard</span>

              <h3
                style={{
                  fontSize:
                    formData.standard ? "20px" : "25px",
                }}
              >
                {formData.standard || "-"}
              </h3>

              <small>
                Selected Class
              </small>
            </div>

          </div>
        </div>

        {/* FEE COMPONENTS */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow">

            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>

            <div className="stat-content">
              <span>Fee Components</span>

              <h3>
                {FEE_FIELDS.length}
              </h3>

              <small>
                Available Charges
              </small>
            </div>

          </div>
        </div>

        {/* TOTAL */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-red shadow">

            <div className="stat-icon">
              <FaFileInvoiceDollar />
            </div>

            <div className="stat-content">
              <span>Total Fee</span>

              <h3>
                ₹{totalFee.toFixed(2)}
              </h3>

              <small>
                Current Fee Structure
              </small>
            </div>

          </div>
        </div>

      </div>

      {/* =====================================================
          MAIN FORM
      ===================================================== */}

      <div className="ms-2 me-2 mb-4">

        <div className="card border-0 shadow rounded-4 overflow-hidden">

          {/* CARD HEADER */}

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
                  <FaMoneyBillWave
                    size={16}
                    className="text-primary"
                  />
                </div>

                <div>

                  <h6 className="mb-0 fw-bold">
                    Fee Generate For Admission
                  </h6>

                  <small className="text-muted">
                    Configure class-wise admission fee structure
                  </small>

                </div>

              </div>

              {loadingStructure && (
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#e7f5ff",
                    color: "#087990",
                  }}
                >
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Loading...
                </span>
              )}

            </div>

          </div>

          <form onSubmit={handleSubmit}>

            {/* =================================================
                SESSION / STANDARD
            ================================================= */}

            <div className="card-body p-3">

              <div
                className="card border-0 rounded-4"
                style={{
                  background:
                    "linear-gradient(135deg,#f8fbff,#f1f7ff)",
                  border:
                    "1px solid #e3edfb",
                }}
              >

                <div className="card-body p-3">

                  <div className="d-flex align-items-center mb-3">

                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center me-2"
                      style={{
                        width: "34px",
                        height: "34px",
                        background: "#e9f7ef",
                        color: "#198754",
                      }}
                    >
                      <FaFilter
                        size={14}
                        className="text-primary"
                      />
                    </div>

                    <div>

                      <h6 className="mb-0 fw-bold">
                        Admission Fee Criteria
                      </h6>

                      <small className="text-muted">
                        Select session and standard to load fee structure
                      </small>

                    </div>

                  </div>

                  <div className="row g-3">

                    {/* SESSION */}

                    <div className="col-12 col-md-6 col-xl-4">

                      <label className="form-label fw-semibold small">
                        Academic Session
                        <span className="text-danger ms-1">
                          *
                        </span>
                      </label>

                      <div className="input-group">

                        <span className="input-group-text bg-white">
                          <FaCalendarAlt
                            size={13}
                            className="text-primary"
                          />
                        </span>

                        <select
                          name="session"
                          value={formData.session}
                          onChange={
                            handleSessionClassChange
                          }
                          className="form-select"
                          required
                        >

                          <option value="">
                            Select Academic Session
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

                    </div>

                    {/* STANDARD */}

                    <div className="col-12 col-md-6 col-xl-4">

                      <label className="form-label fw-semibold small">
                        Standard
                        <span className="text-danger ms-1">
                          *
                        </span>
                      </label>

                      <div className="input-group">

                        <span className="input-group-text bg-white">
                          <FaGraduationCap
                            size={13}
                            className="text-primary"
                          />
                        </span>

                        <select
                          name="standard"
                          value={formData.standard}
                          onChange={
                            handleSessionClassChange
                          }
                          className="form-select"
                          required
                        >

                          <option value="">
                            Select Standard
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

                    </div>

                    {/* STATUS */}

                    <div className="col-12 col-xl-4 d-flex align-items-end">

                      <div
                        className="w-100 rounded-3 px-3 py-2 d-flex align-items-center"
                        style={{
                          background:
                            formData.session &&
                            formData.standard
                              ? "#e8f7ee"
                              : "#f4f6f8",
                          color:
                            formData.session &&
                            formData.standard
                              ? "#198754"
                              : "#6c757d",
                          minHeight: "40px",
                        }}
                      >

                        <span
                          className="rounded-circle me-2"
                          style={{
                            width: "8px",
                            height: "8px",
                            background:
                              formData.session &&
                              formData.standard
                                ? "#198754"
                                : "#adb5bd",
                          }}
                        />

                        <small className="fw-semibold">

                          {formData.session &&
                          formData.standard
                            ? "Fee structure selected"
                            : "Select Session & Standard"}

                        </small>

                      </div>

                    </div>

                  </div>

                </div>
              </div>

              {/* =================================================
                  FEE COMPONENTS HEADER
              ================================================= */}

              <div className="d-flex justify-content-between align-items-center mt-4 mb-3 flex-wrap gap-2">

                <div>

                  <h6 className="fw-bold mb-1">
                    Fee Components
                  </h6>

                  <small className="text-muted">
                    Enter the applicable admission charges for this class
                  </small>

                </div>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#e9f7ef",
                    color: "#198754",
                  }}
                >
                  {FEE_FIELDS.length} Components
                </span>

              </div>

              {/* =================================================
                  FEE CARDS
              ================================================= */}

              <div className="row g-3">

                {FEE_FIELDS.map(
                  ({
                    name,
                    label,
                    icon: Icon,
                    description,
                  }) => (
                    <div
                      className="col-12 col-md-6 col-xl-4"
                      key={name}
                    >

                      <div
                        className="border rounded-4 p-3 h-100 fee-input-card"
                        style={{
                          background: "#ffffff",
                          borderColor:
                            "#e7eaee",
                        }}
                      >

                        <div className="d-flex align-items-center mb-3">

                          <div
                            className="d-flex align-items-center justify-content-center rounded-3 me-2"
                            style={{
                              width: "38px",
                              height: "38px",
                              background:
                                "#eef5ff",
                              color: "#2563eb",
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={16} />
                          </div>

                          <div>

                            <label className="form-label fw-bold mb-0">
                              {label}
                            </label>

                            <small className="text-muted d-block">
                              {description}
                            </small>

                          </div>

                        </div>

                        <div className="input-group">

                          <span
                            className="input-group-text bg-light fw-semibold"
                            style={{
                              color: "#495057",
                            }}
                          >
                            ₹
                          </span>

                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            name={name}
                            value={
                              formData[name] ?? ""
                            }
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter amount"
                            required
                          />

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>

              {/* =================================================
                  TOTAL SUMMARY
              ================================================= */}

              <div className="mt-4">

                <div
                  className="rounded-4 p-3 p-md-4"
                  style={{
                    background:
                      "linear-gradient(135deg,#f8fbff,#eef5ff)",
                    border:
                      "1px solid #dbeafe",
                  }}
                >

                  <div className="row align-items-center">

                    <div className="col-12 col-md-7">

                      <div className="d-flex align-items-center">

                        <div
                          className="d-flex align-items-center justify-content-center rounded-4 me-3"
                          style={{
                            width: "48px",
                            height: "48px",
                            background:
                              "linear-gradient(135deg,#2563eb,#3b82f6)",
                            color: "#fff",
                            boxShadow:
                              "0 6px 15px rgba(37,99,235,.18)",
                          }}
                        >
                          <FaMoneyBillWave size={20} />
                        </div>

                        <div>

                          <small className="text-muted">
                            Total Admission Fee
                          </small>

                          <h3 className="fw-bold text-primary mb-0">
                            ₹{totalFee.toFixed(2)}
                          </h3>

                        </div>

                      </div>

                    </div>

                    <div className="col-12 col-md-5 mt-3 mt-md-0">

                      <div className="d-flex justify-content-md-end gap-2 flex-wrap">

                        <button
                          type="button"
                          className="btn btn-light border px-4"
                          onClick={handleReset}
                          disabled={loading}
                        >
                          <FaRedo
                            className="me-2"
                            size={12}
                          />
                          Reset
                        </button>

                        <button
                          type="submit"
                          className="btn btn-primary px-4"
                          disabled={
                            loading ||
                            !formData.session ||
                            !formData.standard
                          }
                        >

                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                              />
                              Saving...
                            </>
                          ) : (
                            <>
                              <FaSave
                                className="me-2"
                                size={13}
                              />
                              Save Fee Structure
                            </>
                          )}

                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </form>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="card-footer bg-white p-3"
            style={{
              borderTop:
                "1px solid #eef0f2",
            }}
          >

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

              <small className="text-muted">

                Session:{" "}

                <strong className="text-primary">
                  {formData.session || "Not Selected"}
                </strong>

              </small>

              <small className="text-muted">

                Standard:{" "}

                <strong className="text-dark">
                  {formData.standard || "Not Selected"}
                </strong>

              </small>

              <small className="text-muted">

                Total Fee:{" "}

                <strong className="text-success">
                  ₹{totalFee.toFixed(2)}
                </strong>

              </small>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          CUSTOM CSS
      ===================================================== */}

      <style>
        {`
          .form-select,
          .form-control {
            border-color: #dee2e6;
            border-radius: 7px;
            min-height: 40px;
            font-size: 13px;
          }

          .input-group .form-control,
          .input-group .form-select {
            border-radius: 0 7px 7px 0;
          }

          .input-group-text {
            border-color: #dee2e6;
            min-height: 40px;
          }

          .form-select:focus,
          .form-control:focus {
            border-color: #2563eb;
            box-shadow:
              0 0 0 0.15rem rgba(37, 99, 235, 0.10);
          }

          .btn {
            border-radius: 7px;
            font-size: 13px;
            font-weight: 500;
          }

          .fee-input-card {
            transition:
              transform 0.18s ease,
              box-shadow 0.18s ease,
              border-color 0.18s ease;
          }

          .fee-input-card:hover {
            transform: translateY(-2px);
            box-shadow:
              0 8px 22px rgba(0, 0, 0, 0.06);
            border-color: #cfe0f5 !important;
          }

          .premium-stat-card {
            min-height: 108px;
            border-radius: 14px;
            padding: 18px;
            display: flex;
            align-items: center;
            gap: 15px;
            background: #ffffff;
            position: relative;
            overflow: hidden;
          }

          .premium-stat-card .stat-icon {
            width: 48px;
            height: 48px;
            min-width: 48px;
            border-radius: 12px;
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
            font-weight: 700;
            color: #212529;
            font-size: 24px;
            line-height: 1.2;
          }

          .premium-stat-card .stat-content small {
            display: block;
            color: #adb5bd;
            font-size: 11px;
            margin-top: 3px;
          }

          .stat-blue .stat-icon {
            background: #e7f0ff;
            color: #2563eb;
          }

          .stat-green .stat-icon {
            background: #e8f7ee;
            color: #198754;
          }

          .stat-orange .stat-icon {
            background: #fff4df;
            color: #f59f00;
          }

          .stat-red .stat-icon {
            background: #ffe9e9;
            color: #dc3545;
          }

          @media (max-width: 768px) {

            .premium-stat-card {
              min-height: 95px;
              padding: 14px;
            }

            .premium-stat-card .stat-icon {
              width: 42px;
              height: 42px;
              min-width: 42px;
            }

            .premium-stat-card .stat-content h3 {
              font-size: 20px;
            }

            .card-header {
              padding: 12px !important;
            }

          }
        `}
      </style>
    </>
  );
};

export default Admission_Fee_Setup;

