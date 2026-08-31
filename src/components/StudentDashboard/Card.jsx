

import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaCalendarCheck,
  FaRegCalendarAlt,
  FaUserGraduate,
} from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { BsFileEarmarkSlides } from "react-icons/bs";
import { MdArrowOutward, MdMessage } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";

import axiosInstance from "../../api/axiosInstance";
import banner from "../../assets/icon/banner_logo.png";

const Card = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  // =====================================================
  // STATE
  // =====================================================

  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState(null);

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState([]);

  const [students, setStudents] = useState([]);

  const [pendingFee, setPendingFee] = useState([]);
  const [paidFee, setPaidFee] = useState([]);

  // =====================================================
  // AUTH CONFIG
  // =====================================================

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =====================================================
  // GET STUDENT
  // =====================================================

  const getStudent = async () => {
    if (!user?.admissionNumber) return;

    try {
      const response = await axiosInstance.get(
        `/api/students/${user.admissionNumber}`,
        authConfig
      );

      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  // =====================================================
  // GET CURRENT ATTENDANCE
  // =====================================================

  const loadAttendance = async () => {
    if (!user?.admissionNumber) return;

    try {
      const attendanceRes = await axiosInstance.get(
        "/api/student/attendance/current",
        {
          params: {
            admissionNumber: user.admissionNumber,
          },
          ...authConfig,
        }
      );

      setAttendance(attendanceRes.data);
    } catch (error) {
      console.error("Attendance Error:", error);
    }
  };

  // =====================================================
  // LOAD STUDENT
  // =====================================================

  useEffect(() => {
    if (user?.admissionNumber) {
      getStudent();
      loadAttendance();
    }
  }, [user?.admissionNumber]);

  // =====================================================
  // TOTAL STUDENTS
  // =====================================================

  useEffect(() => {
    if (!schoolId) return;

    axiosInstance
      .get("/api/students/count", {
        params: {
          schoolId,
        },
        ...authConfig,
      })
      .then((res) => {
        setTotalStudents(res.data || 0);
      })
      .catch((error) => {
        console.error("Total Students Error:", error);
      });
  }, [schoolId, token]);

  // =====================================================
  // TEACHERS
  // =====================================================

  useEffect(() => {
    if (!schoolId) return;

    axiosInstance
      .get("/api/teachers", {
        params: {
          schoolId,
          status: "Working",
        },
        ...authConfig,
      })
      .then((res) => {
        setTotalTeachers(
          Array.isArray(res.data) ? res.data : []
        );
      })
      .catch((error) => {
        console.error("Teachers Error:", error);
      });
  }, [schoolId, token]);

  // =====================================================
  // STUDENTS
  // =====================================================

  useEffect(() => {
    if (!schoolId) return;

    axiosInstance
      .get("/api/students", {
        params: {
          schoolId,
        },
        ...authConfig,
      })
      .then((res) => {
        const list = Array.isArray(res.data)
          ? res.data
          : [];

        setStudents(list);
      })
      .catch((error) => {
        console.error("Students Error:", error);
      });
  }, [schoolId, token]);

  // =====================================================
  // FEE
  // =====================================================

  useEffect(() => {
    if (!schoolId) return;

    axiosInstance
      .get("/api/student-fee/all", authConfig)
      .then((res) => {
        const list = Array.isArray(res.data)
          ? res.data
          : [];

        const unpaid = list.filter(
          (item) => item.status === "UNPAID"
        );

        const paid = list.filter(
          (item) =>
            item.status === "PAID" ||
            item.status === "PARTIAL"
        );

        setPendingFee(unpaid);
        setPaidFee(paid);
      })
      .catch((error) => {
        console.error("Fee Error:", error);
      });
  }, [schoolId, token]);

  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const profileImage =
    student?.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      `${student?.firstName || "Student"} ${
        student?.lastName || ""
      }`
    )}&background=random&color=fff&size=200`;

  // =====================================================
  // FEE DUE AMOUNT
  // =====================================================

  const dueAmount = pendingFee.reduce(
    (sum, item) => {
      const amount =
        Number(item.amount || item.totalAmount || 0);

      const paid =
        Number(item.paidAmount || 0);

      return sum + Math.max(amount - paid, 0);
    },
    0
  );

  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatAmount = (amount) => {
    return `₹ ${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  // =====================================================
  // ATTENDANCE
  // =====================================================

  const attendancePercentage =
    attendance?.attendancePercentage ?? 0;

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* =====================================================
          STUDENT WELCOME HEADER
      ===================================================== */}

      <div className="mx-2 mt-2 mb-4">
        <div
          className="rounded-4 shadow overflow-hidden"
          style={{
            position: "relative",
            minHeight: "145px",
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
            border: "1px solid #dbeafe",
          }}
        >
          {/* Banner */}

          <img
            src={banner}
            alt=""
            style={{
              position: "absolute",
              right: "0",
              bottom: "0",
              height: "100%",
              width: "auto",
              maxWidth: "45%",
              marginRight: "20px",
              objectFit: "contain",
              opacity: 0.9,
            }}
          />

          <div
            className="row p-3 p-md-4 align-items-center"
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* STUDENT IMAGE */}

            <div className="col-auto">
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  padding: "3px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,#2563eb,#60a5fa)",
                  boxShadow:
                    "0 8px 20px rgba(37,99,235,.20)",
                }}
              >
                <img
                  src={profileImage}
                  alt="Student Profile"
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                    background: "#fff",
                  }}
                />
              </div>
            </div>

            {/* STUDENT DETAILS */}

            <div className="col">
              <div className="mb-1">
                <span
                  className="small fw-semibold"
                  style={{
                    color: "#0d6efd",
                  }}
                >
                  STUDENT DASHBOARD
                </span>
              </div>

              <h4 className="mb-2 fw-bold text-dark">
                Welcome,{" "}
                {student?.firstName || "Student"}{" "}
                {student?.lastName || ""} 👋
              </h4>

              <div className="d-flex flex-wrap gap-2">
                <span className="student-info-badge">
                  Class:{" "}
                  <strong>
                    {student?.studentClass || "-"}
                  </strong>
                </span>

                <span className="student-info-badge">
                  Section:{" "}
                  <strong>
                    {student?.section || "-"}
                  </strong>
                </span>

                <span className="student-info-badge">
                  Roll No:{" "}
                  <strong>
                    {student?.rollNumber || "-"}
                  </strong>
                </span>

                <span className="student-info-badge">
                  Admission No:{" "}
                  <strong>
                    {student?.admissionNumber || "-"}
                  </strong>
                </span>

                <span className="student-info-badge">
                  Academic Year:{" "}
                  <strong>
                    {student?.academicYear || "-"}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PREMIUM STAT CARDS
      ===================================================== */}

      <div className="container-fluid px-0">
        <div className="row g-3">

          {/* =================================================
              1. ATTENDANCE
          ================================================= */}

          <div className="col-12 col-sm-6 col-lg ">
            <div className="premium-stat-card shadow stat-blue h-100">
              <div className="stat-icon">
                <FaRegCalendarAlt />
              </div>

              <div className="stat-content">
                <span>Attendance</span>

                <h3>
                  {attendancePercentage}%
                </h3>

                <small>
                  This Month{" "}
                  <FaArrowUp
                    size={11}
                    className="ms-1"
                  />
                </small>
              </div>
            </div>
          </div>

          {/* =================================================
              2. TOTAL MARKS
          ================================================= */}

          <div className="col-12 col-sm-6 col-lg">
            <div className="premium-stat-card shadow stat-green h-100">
              <div className="stat-icon">
                <BsFileEarmarkSlides />
              </div>

              <div className="stat-content">
                <span>Total Marks</span>

                <h3>
                  78.45%
                </h3>

                <small>
                  In Term I{" "}
                  <FaArrowTrendUp
                    size={11}
                    className="ms-1"
                  />
                </small>
              </div>
            </div>
          </div>

          {/* =================================================
              3. FEE STATUS
          ================================================= */}

          <div className="col-12 col-sm-6 col-lg">
            <div className="premium-stat-card shadow stat-orange h-100">
              <div className="stat-icon">
                <FaCalendarCheck />
              </div>

              <div className="stat-content">
                <span>Fee Status</span>

                <h3>
                  {formatAmount(dueAmount)}
                </h3>

                <small>
                  Due Amount{" "}
                  <FaArrowTrendUp
                    size={11}
                    className="ms-1"
                  />
                </small>
              </div>
            </div>
          </div>

          {/* =================================================
              4. MESSAGE
          ================================================= */}

          <div className="col-12 col-sm-6 col-lg">
            <div className="premium-stat-card shadow stat-red h-100">
              <div className="stat-icon">
                <MdMessage />
              </div>

              <div className="stat-content">
                <span>Messages</span>

                <h3>
                  3
                </h3>

                <small>
                  Unread{" "}
                  <MdArrowOutward
                    size={13}
                    className="ms-1"
                  />
                </small>
              </div>
            </div>
          </div>

          {/* =================================================
              5. NOTICES
          ================================================= */}

          <div className="col-12 col-sm-6 col-lg">
            <div className="premium-stat-card shadow stat-blue h-100">
              <div className="stat-icon">
                <RiDraftFill />
              </div>

              <div className="stat-content">
                <span>Notices</span>

                <h3>
                  2
                </h3>

                <small>
                  New{" "}
                  <MdArrowOutward
                    size={13}
                    className="ms-1"
                  />
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
            // box-shadow: 0 5px 18px rgba(0,0,0,.05);
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
            position: relative;
            z-index: 2;
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

          .stat-content {
            min-width: 0;
            position: relative;
            z-index: 2;
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
            white-space: nowrap;
          }

          .stat-content small {
            color: #9aa1aa;
            font-size: 11px;
          }

          .student-info-badge {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            border-radius: 8px;
            background: rgba(255,255,255,.85);
            border: 1px solid #dfe7f2;
            color: #6c757d;
            font-size: 11px;
          }

          .student-info-badge strong {
            color: #343a40;
            margin-left: 3px;
          }

          @media (max-width: 992px) {
            .premium-stat-card {
              min-height: 105px;
            }
          }

          @media (max-width: 576px) {
            .premium-stat-card {
              padding: 16px;
            }

            .stat-icon {
              min-width: 46px;
              width: 46px;
              height: 46px;
              font-size: 18px;
            }

            .stat-content h3 {
              font-size: 21px;
            }

            .student-info-badge {
              font-size: 10px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Card;