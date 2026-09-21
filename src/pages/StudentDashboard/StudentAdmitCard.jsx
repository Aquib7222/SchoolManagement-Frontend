import React, { useEffect, useState } from "react";
import {
  FaDownload,
  FaFilePdf,
  FaClock,
  FaCalendarAlt,
  FaDoorOpen,
  FaUserGraduate,
  FaSchool,
} from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const StudentAdmitCard = () => {
  const [admitCard, setAdmitCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const admissionNumber = user?.admissionNumber;

  // =========================================================
  // IMAGE URL
  // =========================================================

  const getImageUrl = (path) => {
    if (!path) return null;

    if (
      path.startsWith("http://") ||
      path.startsWith("https://") ||
      path.startsWith("data:")
    ) {
      return path;
    }

    const baseURL = axiosInstance.defaults.baseURL || "";

    return `${baseURL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  };

  // =========================================================
  // FETCH STUDENT ADMIT CARD
  // =========================================================

  const fetchAdmitCard = async () => {
    try {
      setLoading(true);
      setError("");

      if (!admissionNumber) {
        setError("Admission number not found.");
        return;
      }

      const response = await axiosInstance.get(
        `/api/admit-card/student/${encodeURIComponent(admissionNumber)}`
      );

      setAdmitCard(response.data);
    } catch (error) {
      console.error("Error fetching admit card:", error);

      const message =
        error?.response?.data?.message ||
        (typeof error?.response?.data === "string"
          ? error.response.data
          : null) ||
        "Admit card is not available.";

      setError(message);
      setAdmitCard(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmitCard();
  }, [admissionNumber]);

  // =========================================================
  // DOWNLOAD / PRINT
  // =========================================================

  const handlePrint = () => {
    window.print();
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border"
            style={{ color: "#1769aa" }}
            role="status"
          ></div>

          <p
            className="mt-3 mb-0"
            style={{
              color: "#6c757d",
              fontSize: "14px",
            }}
          >
            Loading your admit card...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR / NOT AVAILABLE
  // =========================================================

  if (error || !admitCard) {
    return (
      <div className="container-fluid py-4">
        <div
          className="card border-0 shadow-sm"
          style={{
            borderRadius: "18px",
            background: "#FFFFFF",
          }}
        >
          <div
            className="card-body text-center"
            style={{ padding: "60px 20px" }}
          >
            <div
              className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "#F5F9FD",
                color: "#1769aa",
                fontSize: "28px",
              }}
            >
              <FaFilePdf />
            </div>

            <h5
              className="mb-2"
              style={{
                fontWeight: "700",
                color: "#12344d",
              }}
            >
              Admit Card Not Available
            </h5>

            <p
              className="mb-0"
              style={{
                color: "#7a8793",
                fontSize: "14px",
              }}
            >
              {error ||
                "Your admit card has not been generated yet."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // STUDENT DATA
  // =========================================================

  const student = admitCard.students?.[0];

  const studentPhoto = getImageUrl(student?.photo);

  return (
    <>
      <div className="container-fluid py-4">
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div
          className="d-flex flex-wrap justify-content-between align-items-center mb-4"
          style={{ gap: "15px" }}
        >
          <div>
            <div
              className="d-flex align-items-center mb-1"
              style={{ gap: "10px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  backgroundColor: "#F5F9FD",
                  color: "#1769aa",
                }}
              >
                <FaFilePdf />
              </div>

              <h4
                className="mb-0"
                style={{
                  color: "#12344d",
                  fontWeight: "700",
                }}
              >
                My Admit Card
              </h4>
            </div>

            <p
              className="mb-0"
              style={{
                color: "#7a8793",
                fontSize: "14px",
                marginLeft: "52px",
              }}
            >
              Your examination admit card
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="btn d-flex align-items-center"
            style={{
              backgroundColor: "#1769aa",
              color: "#fff",
              borderRadius: "10px",
              padding: "10px 18px",
              fontWeight: "600",
              border: "none",
              gap: "8px",
            }}
          >
            <FaDownload />
            Print / Download
          </button>
        </div>

        {/* =====================================================
            ADMIT CARD
        ===================================================== */}

        <div
          className="card border-0 shadow-sm admit-card-print"
          style={{
            borderRadius: "18px",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          {/* ===================================================
              SCHOOL HEADER
          =================================================== */}

          <div
            style={{
              padding: "28px 30px",
              borderBottom: "1px solid #e8eef5",
              backgroundColor: "#fff",
            }}
          >
            <div className="row align-items-center">
              {/* SCHOOL LOGO */}

              <div className="col-md-2 text-center mb-3 mb-md-0">
                {admitCard.schoolLogo || admitCard.logoUrl ? (
                  <img
                    src={getImageUrl(
                      admitCard.schoolLogo || admitCard.logoUrl
                    )}
                    alt="School Logo"
                    style={{
                      width: "85px",
                      height: "85px",
                      objectFit: "contain",
                      borderRadius: "12px",
                    }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center mx-auto"
                    style={{
                      width: "85px",
                      height: "85px",
                      borderRadius: "12px",
                      backgroundColor: "#F5F9FD",
                      color: "#1769aa",
                      fontSize: "32px",
                    }}
                  >
                    <FaSchool />
                  </div>
                )}
              </div>

              {/* SCHOOL INFORMATION */}

              <div className="col-md-8 text-center">
                <h3
                  className="mb-1"
                  style={{
                    color: "#12344d",
                    fontWeight: "800",
                  }}
                >
                  {admitCard.schoolName ||
                    user?.schoolName ||
                    user?.school?.schoolName ||
                    "ZYNTaks Education"}
                </h3>

                {admitCard.schoolAddress && (
                  <p
                    className="mb-1"
                    style={{
                      color: "#6c757d",
                      fontSize: "13px",
                    }}
                  >
                    {admitCard.schoolAddress}
                  </p>
                )}

                {admitCard.schoolEmail && (
                  <p
                    className="mb-1"
                    style={{
                      color: "#6c757d",
                      fontSize: "13px",
                    }}
                  >
                    {admitCard.schoolEmail}
                  </p>
                )}

                {admitCard.schoolMobile && (
                  <p
                    className="mb-2"
                    style={{
                      color: "#6c757d",
                      fontSize: "13px",
                    }}
                  >
                    {admitCard.schoolMobile}
                  </p>
                )}

                <span
                  className="d-inline-block"
                  style={{
                    backgroundColor: "#1769aa",
                    color: "#fff",
                    padding: "7px 20px",
                    borderRadius: "30px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.5px",
                  }}
                >
                  ADMIT CARD
                </span>
              </div>

              <div className="col-md-2"></div>
            </div>
          </div>

          {/* ===================================================
              EXAM INFORMATION
          =================================================== */}

          <div
            style={{
              padding: "25px 30px 10px",
            }}
          >
            <div className="row g-3">
              {/* EXAM TERM */}

              <div className="col-md-3 col-sm-6">
                <div
                  style={{
                    border: "1px solid #E8EEF5",
                    borderRadius: "12px",
                    padding: "15px",
                    backgroundColor: "#F9FBFD",
                    height: "100%",
                  }}
                >
                  <div
                    className="d-flex align-items-center mb-2"
                    style={{
                      gap: "8px",
                      color: "#1769aa",
                    }}
                  >
                    <FaCalendarAlt />

                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      EXAM TERM
                    </span>
                  </div>

                  <div
                    style={{
                      color: "#12344d",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    {admitCard.examTerm || "-"}
                  </div>
                </div>
              </div>

              {/* ACADEMIC YEAR */}

              <div className="col-md-3 col-sm-6">
                <div
                  style={{
                    border: "1px solid #E8EEF5",
                    borderRadius: "12px",
                    padding: "15px",
                    backgroundColor: "#F9FBFD",
                    height: "100%",
                  }}
                >
                  <div
                    className="d-flex align-items-center mb-2"
                    style={{
                      gap: "8px",
                      color: "#1769aa",
                    }}
                  >
                    <FaCalendarAlt />

                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      ACADEMIC YEAR
                    </span>
                  </div>

                  <div
                    style={{
                      color: "#12344d",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    {admitCard.academicYear || "-"}
                  </div>
                </div>
              </div>

              {/* SITTING */}

              <div className="col-md-3 col-sm-6">
                <div
                  style={{
                    border: "1px solid #E8EEF5",
                    borderRadius: "12px",
                    padding: "15px",
                    backgroundColor: "#F9FBFD",
                    height: "100%",
                  }}
                >
                  <div
                    className="d-flex align-items-center mb-2"
                    style={{
                      gap: "8px",
                      color: "#1769aa",
                    }}
                  >
                    <FaClock />

                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      SITTING
                    </span>
                  </div>

                  <div
                    style={{
                      color: "#12344d",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    {admitCard.sitting || "-"}
                  </div>
                </div>
              </div>

              {/* ROOM */}

              <div className="col-md-3 col-sm-6">
                <div
                  style={{
                    border: "1px solid #E8EEF5",
                    borderRadius: "12px",
                    padding: "15px",
                    backgroundColor: "#F9FBFD",
                    height: "100%",
                  }}
                >
                  <div
                    className="d-flex align-items-center mb-2"
                    style={{
                      gap: "8px",
                      color: "#1769aa",
                    }}
                  >
                    <FaDoorOpen />

                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      ROOM NO.
                    </span>
                  </div>

                  <div
                    style={{
                      color: "#12344d",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    {student?.roomNumber || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              STUDENT INFORMATION
          =================================================== */}

          <div
            style={{
              padding: "20px 30px",
            }}
          >
            <div
              className="d-flex align-items-center mb-3"
              style={{ gap: "10px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "#F5F9FD",
                  color: "#1769aa",
                }}
              >
                <FaUserGraduate />
              </div>

              <h5
                className="mb-0"
                style={{
                  color: "#12344d",
                  fontWeight: "700",
                }}
              >
                Student Information
              </h5>
            </div>

            <div
              style={{
                border: "1px solid #E8EEF5",
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              <div className="row g-0">
                {/* DETAILS */}

                <div className="col-md-9">
                  <div className="row g-0">
                    <div
                      className="col-md-6"
                      style={{
                        padding: "16px 20px",
                        borderBottom: "1px solid #E8EEF5",
                        borderRight: "1px solid #E8EEF5",
                      }}
                    >
                      <small
                        style={{
                          color: "#8a96a3",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Student Name
                      </small>

                      <strong
                        style={{
                          color: "#12344d",
                        }}
                      >
                        {student?.studentName ||
                          student?.name ||
                          "-"}
                      </strong>
                    </div>

                    <div
                      className="col-md-6"
                      style={{
                        padding: "16px 20px",
                        borderBottom: "1px solid #E8EEF5",
                      }}
                    >
                      <small
                        style={{
                          color: "#8a96a3",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Admission Number
                      </small>

                      <strong
                        style={{
                          color: "#12344d",
                        }}
                      >
                        {student?.admissionNumber ||
                          admissionNumber ||
                          "-"}
                      </strong>
                    </div>

                    <div
                      className="col-md-6"
                      style={{
                        padding: "16px 20px",
                        borderRight: "1px solid #E8EEF5",
                      }}
                    >
                      <small
                        style={{
                          color: "#8a96a3",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Class
                      </small>

                      <strong
                        style={{
                          color: "#12344d",
                        }}
                      >
                        {student?.studentClass ||
                          student?.className ||
                          "-"}
                      </strong>
                    </div>

                    <div
                      className="col-md-6"
                      style={{
                        padding: "16px 20px",
                      }}
                    >
                      <small
                        style={{
                          color: "#8a96a3",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Section
                      </small>

                      <strong
                        style={{
                          color: "#12344d",
                        }}
                      >
                        {student?.section || "-"}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* PHOTO */}

                <div
                  className="col-md-3 d-flex align-items-center justify-content-center"
                  style={{
                    padding: "20px",
                    backgroundColor: "#F9FBFD",
                  }}
                >
                  {studentPhoto ? (
                    <img
                      src={studentPhoto}
                      alt="Student"
                      style={{
                        width: "115px",
                        height: "135px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: "1px solid #E8EEF5",
                      }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "115px",
                        height: "135px",
                        borderRadius: "10px",
                        backgroundColor: "#F5F9FD",
                        border: "1px solid #E8EEF5",
                        color: "#1769aa",
                        fontSize: "40px",
                      }}
                    >
                      <FaUserGraduate />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              EXAM SCHEDULE
          =================================================== */}

          <div
            style={{
              padding: "0 30px 20px",
            }}
          >
            <div
              className="d-flex align-items-center mb-3"
              style={{ gap: "10px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "#F5F9FD",
                  color: "#1769aa",
                }}
              >
                <FaClock />
              </div>

              <h5
                className="mb-0"
                style={{
                  color: "#12344d",
                  fontWeight: "700",
                }}
              >
                Examination Schedule
              </h5>
            </div>

            <div
              className="row g-3"
              style={{
                border: "1px solid #E8EEF5",
                borderRadius: "14px",
                padding: "15px",
                margin: 0,
              }}
            >
              <div className="col-md-4">
                <div
                  style={{
                    backgroundColor: "#F9FBFD",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <small
                    style={{
                      color: "#8a96a3",
                      display: "block",
                      marginBottom: "5px",
                    }}
                  >
                    Exam Term
                  </small>

                  <strong style={{ color: "#12344d" }}>
                    {admitCard.examTerm || "-"}
                  </strong>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  style={{
                    backgroundColor: "#F9FBFD",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <small
                    style={{
                      color: "#8a96a3",
                      display: "block",
                      marginBottom: "5px",
                    }}
                  >
                    Start Time
                  </small>

                  <strong style={{ color: "#12344d" }}>
                    {admitCard.startTime || "-"}
                  </strong>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  style={{
                    backgroundColor: "#F9FBFD",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <small
                    style={{
                      color: "#8a96a3",
                      display: "block",
                      marginBottom: "5px",
                    }}
                  >
                    End Time
                  </small>

                  <strong style={{ color: "#12344d" }}>
                    {admitCard.endTime || "-"}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              INSTRUCTIONS
          =================================================== */}

          <div
            style={{
              margin: "0 30px 25px",
              padding: "18px 20px",
              backgroundColor: "#F9FBFD",
              border: "1px solid #E8EEF5",
              borderRadius: "14px",
            }}
          >
            <h6
              style={{
                color: "#12344d",
                fontWeight: "700",
                marginBottom: "12px",
              }}
            >
              Examination Instructions
            </h6>

            <ol
              className="mb-0"
              style={{
                color: "#667482",
                fontSize: "13px",
                lineHeight: "1.8",
                paddingLeft: "20px",
              }}
            >
              <li>
                Please carry this admit card to the examination hall.
              </li>

              <li>
                Reach the examination room before the scheduled time.
              </li>

              <li>
                Keep your admission number available for verification.
              </li>

              <li>
                Follow all instructions given by the examination
                invigilator.
              </li>
            </ol>
          </div>

          {/* ===================================================
              FOOTER
          =================================================== */}

          <div
            className="row"
            style={{
              margin: "0 30px 30px",
              paddingTop: "25px",
              borderTop: "1px solid #E8EEF5",
            }}
          >
            <div className="col-md-6 text-center mb-4 mb-md-0">
              <div
                style={{
                  width: "180px",
                  borderTop: "1px solid #12344d",
                  margin: "35px auto 8px",
                }}
              ></div>

              <small
                style={{
                  color: "#6c757d",
                }}
              >
                Student Signature
              </small>
            </div>

            <div className="col-md-6 text-center">
              <div
                style={{
                  width: "180px",
                  borderTop: "1px solid #12344d",
                  margin: "35px auto 8px",
                }}
              ></div>

              <small
                style={{
                  color: "#6c757d",
                }}
              >
                Principal / Authorized Signature
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
          PRINT CSS
      ======================================================= */}

      <style>
        {`
          @media print {

            body {
              background: #ffffff !important;
            }

            .admit-card-print {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
              border-radius: 0 !important;
            }

            button {
              display: none !important;
            }

            @page {
              size: A4;
              margin: 10mm;
            }

            .container-fluid {
              padding: 0 !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default StudentAdmitCard;