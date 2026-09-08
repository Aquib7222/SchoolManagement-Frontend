import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  LuBookOpen,
  LuCalendarDays,
  LuClock3,
  LuImage,
  LuRefreshCw,
  LuSchool,
  LuClipboardCheck,
} from "react-icons/lu";
import { useStudent } from "../../context/StudentProfileContext";

const MyHomework = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
     const { student} = useStudent();
     console.log("Student",student);
  const schoolId =
    localStorage.getItem("schoolId") || user?.schoolId;

  
  const studentClass =
    student?.studentClass;

  const section =
    student?.section;

  const [academicYear, setAcademicYear] = useState("");
  const [homework, setHomework] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // CURRENT ACADEMIC YEAR
  // =========================================================

  useEffect(() => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const startYear =
      month >= 4 ? year : year - 1;

    setAcademicYear(
      `${startYear}-${startYear + 1}`
    );
  }, []);

  // =========================================================
  // LOAD HOMEWORK
  // =========================================================

  const loadHomework = async () => {
    if (
      !schoolId ||
      !studentClass ||
      !section ||
      !academicYear
    ) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.get(
        "/api/homework/class",
        {
          params: {
            schoolId: Number(schoolId),
            academicYear,
            studentClass,
            section,
          },
        }
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setHomework(data);

    } catch (err) {
      console.error(
        "Homework loading error:",
        err.response?.data || err
      );

      setHomework([]);

      setError(
        err.response?.data?.message ||
          "Unable to load homework."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD WHEN DATA READY
  // =========================================================

  useEffect(() => {
    loadHomework();
  }, [
    schoolId,
    studentClass,
    section,
    academicYear,
  ]);

  // =========================================================
  // FORMAT SUBJECT
  // =========================================================

  const formatSubject = (subject) => {
    if (!subject) return "-";

    return String(subject)
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  // =========================================================
  // IMAGE URL
  // =========================================================

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "";

    /*
     * Agar backend complete URL bhej raha hai
     */
    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {
      return imageUrl;
    }

    /*
     * Agar backend /uploads/homework/... bhej raha hai
     */
    return `http://localhost:8080${imageUrl}`;
  };

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
      return date;
    }

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

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

                {/* ICON */}

                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: 52,
                    height: 52,
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <LuBookOpen size={27} />
                </div>

                {/* TITLE */}

                <div>

                  <h5 className="mb-1 fw-bold text-dark">
                    My Homework
                  </h5>

                  <div className="text-muted small">
                    Dashboard &nbsp;/&nbsp; My Homework
                  </div>

                </div>

              </div>

              {/* RIGHT */}

              <div className="d-flex align-items-center gap-2">

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#eff6ff",
                    color: "#2563eb",
                    border:
                      "1px solid #bfdbfe",
                  }}
                >
                  {studentClass || "-"} -{" "}
                  {section || "-"}
                </span>

                <button
                  type="button"
                  onClick={loadHomework}
                  className="btn btn-sm d-flex align-items-center justify-content-center"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    border:
                      "1px solid #bfdbfe",
                    background: "#fff",
                    color: "#2563eb",
                  }}
                  title="Refresh"
                >
                  <LuRefreshCw size={17} />
                </button>

              </div>

            </div>

          </div>

          {/* BREADCRUMB */}

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
              Home &nbsp;›&nbsp; Dashboard &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                My Homework
              </span>
            </small>
          </div>

        </div>

      </div>


      {/* ===================================================== */}
      {/* MAIN */}
      {/* ===================================================== */}

      <div className="mx-2 mt-2 mb-4">

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (

          <div
            className="alert mb-3"
            style={{
              borderRadius: 12,
              border:
                "1px solid #fecaca",
              background: "#fef2f2",
              color: "#b91c1c",
            }}
          >
            {error}
          </div>

        )}


        {/* ================================================= */}
        {/* STUDENT INFO */}
        {/* ================================================= */}

        <div
          className="card border-0 rounded-4 shadow mb-3"
          style={{
            boxShadow:
              "0 6px 22px rgba(15,23,42,.07)",
          }}
        >

          <div className="card-body p-3 p-md-4">

            <div className="row g-3">

              {/* CLASS */}

              <div className="col-12 col-md-4">

                <div
                  className="d-flex align-items-center gap-3 p-3"
                  style={{
                    background: "#f8fbff",
                    border:
                      "1px solid #dbeafe",
                    borderRadius: 14,
                  }}
                >

                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <LuSchool size={21} />
                  </div>

                  <div>

                    <div
                      style={{
                        fontSize: 11,
                        color: "#64748b",
                      }}
                    >
                      Class / Section
                    </div>

                    <div
                      className="fw-bold"
                      style={{
                        color: "#334155",
                      }}
                    >
                      {studentClass || "-"} /{" "}
                      {section || "-"}
                    </div>

                  </div>

                </div>

              </div>


              {/* ACADEMIC YEAR */}

              <div className="col-12 col-md-4">

                <div
                  className="d-flex align-items-center gap-3 p-3"
                  style={{
                    background: "#f8fbff",
                    border:
                      "1px solid #dbeafe",
                    borderRadius: 14,
                  }}
                >

                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <LuCalendarDays size={21} />
                  </div>

                  <div>

                    <div
                      style={{
                        fontSize: 11,
                        color: "#64748b",
                      }}
                    >
                      Academic Year
                    </div>

                    <div
                      className="fw-bold"
                      style={{
                        color: "#334155",
                      }}
                    >
                      {academicYear || "-"}
                    </div>

                  </div>

                </div>

              </div>


              {/* TOTAL */}

              <div className="col-12 col-md-4">

                <div
                  className="d-flex align-items-center gap-3 p-3"
                  style={{
                    background: "#f8fbff",
                    border:
                      "1px solid #dbeafe",
                    borderRadius: 14,
                  }}
                >

                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <LuClipboardCheck size={21} />
                  </div>

                  <div>

                    <div
                      style={{
                        fontSize: 11,
                        color: "#64748b",
                      }}
                    >
                      Total Homework
                    </div>

                    <div
                      className="fw-bold"
                      style={{
                        color: "#334155",
                        fontSize: 20,
                      }}
                    >
                      {homework.length}
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* HOMEWORK LIST */}
        {/* ================================================= */}

        <div
          className="card border-0 rounded-4 shadow overflow-hidden"
          style={{
            boxShadow:
              "0 8px 30px rgba(15,23,42,.08)",
            border:
              "1px solid #e2e8f0",
          }}
        >

          {/* HEADER */}

          <div
            className="p-3 p-md-4 d-flex flex-wrap justify-content-between align-items-center gap-3"
            style={{
              background:
                "linear-gradient(135deg,#ffffff 0%,#f8fbff 55%,#eff6ff 100%)",
              borderBottom:
                "1px solid #e2e8f0",
            }}
          >

            <div className="d-flex align-items-center gap-3">

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                }}
              >
                <LuBookOpen size={22} />
              </div>

              <div>

                <div
                  className="fw-bold"
                  style={{
                    color: "#0f172a",
                  }}
                >
                  Homework
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "#64748b",
                  }}
                >
                  Your class homework
                </div>

              </div>

            </div>


            <span
              className="badge rounded-pill px-3 py-2"
              style={{
                background: "#eff6ff",
                color: "#2563eb",
                border:
                  "1px solid #bfdbfe",
              }}
            >
              {homework.length} Homework
            </span>

          </div>


          {/* CONTENT */}

          <div className="p-3 p-md-4">

            {loading ? (

              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary"
                  role="status"
                />

                <div
                  className="small text-muted mt-3"
                >
                  Loading homework...
                </div>

              </div>

            ) : homework.length === 0 ? (

              /* EMPTY */

              <div className="text-center py-5">

                <div
                  className="d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    background: "#eff6ff",
                    color: "#2563eb",
                  }}
                >
                  <LuBookOpen size={32} />
                </div>

                <div
                  className="fw-bold"
                  style={{
                    color: "#334155",
                  }}
                >
                  No Homework Available
                </div>

                <div
                  className="small mt-1"
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  There is no homework for your class
                  and section.
                </div>

              </div>

            ) : (

              /* HOMEWORK CARDS */

              <div className="row g-3">

                {homework.map((work, index) => (

                  <div
                    className="col-12 col-md-6 col-xl-4"
                    key={work.id || index}
                  >

                    <div
                      className="h-100"
                      style={{
                        background: "#fff",
                        border:
                          "1px solid #dbeafe",
                        borderRadius: 16,
                        boxShadow:
                          "0 5px 18px rgba(15,23,42,.06)",
                        overflow: "hidden",
                      }}
                    >

                      {/* CARD HEADER */}

                      <div
                        className="p-3"
                        style={{
                          background:
                            "linear-gradient(135deg,#f8fbff,#eff6ff)",
                          borderBottom:
                            "1px solid #dbeafe",
                        }}
                      >

                        <div className="d-flex justify-content-between align-items-start gap-2">

                          <div>

                            <span
                              className="badge rounded-pill mb-2"
                              style={{
                                background:
                                  "#dbeafe",
                                color:
                                  "#1d4ed8",
                                padding:
                                  "6px 11px",
                              }}
                            >
                              {formatSubject(
                                work.subject
                              )}
                            </span>

                            <div
                              className="fw-bold"
                              style={{
                                color:
                                  "#0f172a",
                                fontSize: 15,
                              }}
                            >
                              Homework #{index + 1}
                            </div>

                          </div>


                          {/* TYPE */}

                          <span
                            className="badge rounded-pill"
                            style={{
                              background:
                                work.homeworkType ===
                                "IMAGE"
                                  ? "#fef3c7"
                                  : "#eff6ff",

                              color:
                                work.homeworkType ===
                                "IMAGE"
                                  ? "#b45309"
                                  : "#2563eb",

                              padding:
                                "6px 10px",
                            }}
                          >
                            {work.homeworkType ===
                            "IMAGE"
                              ? "Image"
                              : "Text"}
                          </span>

                        </div>

                      </div>


                      {/* BODY */}

                      <div className="p-3">

                        {/* TEXT */}

                        {work.homeworkText && (

                          <div
                            className="mb-3"
                            style={{
                              color: "#475569",
                              fontSize: 13,
                              lineHeight: 1.65,
                              whiteSpace:
                                "pre-wrap",
                            }}
                          >
                            {work.homeworkText}
                          </div>

                        )}


                        {/* IMAGE */}

                        {work.imageUrl && (

                          <div className="mb-3">

                            <img
                              src={getImageUrl(
                                work.imageUrl
                              )}
                              alt="Homework"
                              className="w-100"
                              style={{
                                maxHeight: 260,
                                objectFit:
                                  "contain",
                                borderRadius: 12,
                                border:
                                  "1px solid #dbeafe",
                                background:
                                  "#f8fbff",
                              }}
                            />

                          </div>

                        )}


                        {/* DATES */}

                        <div
                          className="pt-3"
                          style={{
                            borderTop:
                              "1px solid #eef2f7",
                          }}
                        >

                          <div
                            className="d-flex justify-content-between gap-2 mb-2"
                          >

                            <div className="d-flex align-items-center gap-2">

                              <LuCalendarDays
                                size={16}
                                color="#2563eb"
                              />

                              <span
                                style={{
                                  fontSize: 12,
                                  color:
                                    "#64748b",
                                }}
                              >
                                Homework Date
                              </span>

                            </div>

                            <span
                              className="small fw-semibold"
                              style={{
                                color:
                                  "#334155",
                              }}
                            >
                              {formatDate(
                                work.homeworkDate
                              )}
                            </span>

                          </div>


                          <div
                            className="d-flex justify-content-between gap-2"
                          >

                            <div className="d-flex align-items-center gap-2">

                              <LuClock3
                                size={16}
                                color="#2563eb"
                              />

                              <span
                                style={{
                                  fontSize: 12,
                                  color:
                                    "#64748b",
                                }}
                              >
                                Submit By
                              </span>

                            </div>

                            <span
                              className="small fw-semibold"
                              style={{
                                color:
                                  "#334155",
                              }}
                            >
                              {formatDate(
                                work.submissionDate
                              )}
                            </span>

                          </div>

                        </div>

                      </div>


                      {/* FOOTER */}

                      <div
                        className="px-3 py-2"
                        style={{
                          background:
                            "#fafcff",
                          borderTop:
                            "1px solid #eef2f7",
                        }}
                      >

                        <div
                          className="small"
                          style={{
                            color:
                              "#94a3b8",
                          }}
                        >
                          {work.academicYear}
                          {" • "}
                          {work.studentClass}
                          {" • Section "}
                          {work.section}
                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>


      {/* ===================================================== */}
      {/* STYLE */}
      {/* ===================================================== */}

      <style>
        {`
          @media (max-width: 767px) {
            .card-body {
              padding: 12px !important;
            }
          }
        `}
      </style>

    </>
  );
};

export default MyHomework;