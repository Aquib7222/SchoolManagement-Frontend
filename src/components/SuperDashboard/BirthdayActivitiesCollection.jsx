


import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import FeeCollectionBarChart from "../../pages/Dashboard/Charts/FeeCollectionBarChart";
import FeeCollectionDonut from "../../pages/Dashboard/Charts/FeeCollectionDonut";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BirthdayActivitiesCollection = () => {
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const [feeRecords, setFeeRecords] = useState([]);
  const [loadingFees, setLoadingFees] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);
const [loadingActivities, setLoadingActivities] = useState(false);


  

  
const schoolId = JSON.parse(localStorage.getItem("schoolId"));

  

  useEffect(() => {
    const fetchStudents = async () => {
      if (!schoolId) {
        console.warn("School ID not found");
        return;
      }

      try {
        setLoadingStudents(true);

        const response = await axiosInstance.get(
          "/api/students/school",
          {
            params: { schoolId },
          }
        );

        setStudents(
          Array.isArray(response.data)
            ? response.data
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load students:",
          error
        );

        setStudents([]);
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchStudents();
  }, [schoolId]);


  useEffect(() => {
    const fetchFees = async () => {
      if (!schoolId) {
        console.warn("School ID not found for fees");
        return;
      }

      try {
        setLoadingFees(true);

        const response = await axiosInstance.get(
          "/api/student-fee/all",
          {
            params: { schoolId },
          }
        );

        let records = [];

        if (Array.isArray(response.data)) {
          records = response.data;
        } else if (
          Array.isArray(response.data?.content)
        ) {
          records = response.data.content;
        } else if (
          Array.isArray(response.data?.data)
        ) {
          records = response.data.data;
        } else if (
          Array.isArray(response.data?.students)
        ) {
          records = response.data.students;
        }

        setFeeRecords(records);
      } catch (error) {
        console.error(
          "Failed to load fee collection:",
          error
        );

        setFeeRecords([]);
      } finally {
        setLoadingFees(false);
      }
    };

    fetchFees();
  }, [schoolId]);

useEffect(() => {
  const fetchAuditLogs = async () => {
    if (!schoolId) {
      console.warn("School ID not found");
      setAuditLogs([]);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Token not found");
      setAuditLogs([]);
      return;
    }

    try {
      setLoadingActivities(true);

      const response = await axiosInstance.get(
        "/api/audit-logs?page=0&size=50&sort=createdAt,desc",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      let logs = [];

      if (Array.isArray(data)) {
        logs = data;
      } else if (Array.isArray(data?.content)) {
        logs = data.content;
      } else if (Array.isArray(data?.data)) {
        logs = data.data;
      }

      const currentSchoolId = String(schoolId);

      const schoolLogs = logs.filter((log) => {
        // Primary check
        if (log?.schoolId != null) {
          return String(log.schoolId) === currentSchoolId;
        }

        // Fallback for old audit records
        if (log?.details) {
          try {
            const details =
              typeof log.details === "string"
                ? JSON.parse(log.details)
                : log.details;

            return String(details?.schoolId) === currentSchoolId;
          } catch (error) {
            console.warn(
              "Invalid audit details JSON:",
              error
            );

            return false;
          }
        }

        return false;
      });

      // Latest first + only 3 activities
      const latestThree = schoolLogs
        .sort(
          (a, b) =>
            new Date(b?.createdAt || 0).getTime() -
            new Date(a?.createdAt || 0).getTime()
        )
        .slice(0, 3);

      console.log(
        "Current School ID:",
        currentSchoolId
      );

      console.log(
        "Latest 3 School Audit Logs:",
        latestThree
      );

      setAuditLogs(latestThree);
    } catch (error) {
      console.error(
        "Failed to load audit logs:",
        error
      );

      setAuditLogs([]);
    } finally {
      setLoadingActivities(false);
    }
  };

  fetchAuditLogs();
}, [schoolId]);
console.log("audit logs details",auditLogs);


const getActivityDetails = (log) => {
  if (!log?.details) {
    return {};
  }

  try {
    return typeof log.details === "string"
      ? JSON.parse(log.details)
      : log.details;
  } catch (error) {
    return {};
  }
};


const getActivityIcon = (action) => {
  switch (String(action || "").toUpperCase()) {
    case "CREATE":
      return "➕";

    case "UPDATE":
      return "✏️";

    case "DELETE":
      return "🗑️";

    case "LOGIN":
      return "🔐";

    case "LOGOUT":
      return "🚪";

    case "EXPORT":
      return "📤";

    case "PRINT":
      return "🖨️";

    case "REJECT":
      return "❌";

    case "DEACTIVATE":
      return "⛔";

    default:
      return "🔔";
  }
};


const getActivityStyle = (action) => {
  switch (String(action || "").toUpperCase()) {
    case "CREATE":
      return {
        bg: "#ecfdf5",
        color: "#059669",
      };

    case "UPDATE":
      return {
        bg: "#eff6ff",
        color: "#2563eb",
      };

    case "DELETE":
      return {
        bg: "#fff1f2",
        color: "#e11d48",
      };

    case "LOGIN":
      return {
        bg: "#f5f3ff",
        color: "#7c3aed",
      };

    case "LOGOUT":
      return {
        bg: "#fff7ed",
        color: "#ea580c",
      };

    case "REJECT":
      return {
        bg: "#fff1f2",
        color: "#dc2626",
      };

    case "DEACTIVATE":
      return {
        bg: "#fff7ed",
        color: "#c2410c",
      };

    default:
      return {
        bg: "#f8fafc",
        color: "#64748b",
      };
  }
};


const formatActivityTime = (createdAt) => {
  if (!createdAt) {
    return "";
  }

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();

  const diffMs =
    now.getTime() - date.getTime();

  const diffMinutes = Math.floor(
    diffMs / (1000 * 60)
  );

  if (diffMinutes < 1) {
    return "Just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} ${
      diffMinutes === 1
        ? "Minute"
        : "Minutes"
    } Ago`;
  }

  const diffHours = Math.floor(
    diffMinutes / 60
  );

  if (diffHours < 24) {
    return `${diffHours} ${
      diffHours === 1
        ? "Hour"
        : "Hours"
    } Ago`;
  }

  const diffDays = Math.floor(
    diffHours / 24
  );

  if (diffDays < 7) {
    return `${diffDays} ${
      diffDays === 1
        ? "Day"
        : "Days"
    } Ago`;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const getActivityTitle = (log) => {
  const details = getActivityDetails(log);

  const action = String(
    log?.action || details?.action || ""
  ).toUpperCase();

  const module = String(
    log?.module || details?.module || ""
  ).toUpperCase();

  const targetType = String(
    log?.targetType ||
      details?.targetType ||
      ""
  ).toLowerCase();

  const targetName =
    log?.targetName ||
    details?.targetName ||
    "";

  const performedByName =
    log?.username ||
    details?.performedBy?.name ||
    details?.performedBy?.username ||
    "User";

  // =========================
  // LOGIN
  // =========================
  if (action === "LOGIN") {
    return `${performedByName} logged in`;
  }

  // =========================
  // LOGOUT
  // =========================
  if (action === "LOGOUT") {
    return `${performedByName} logged out`;
  }

  // =========================
  // ATTENDANCE
  // =========================
  if (
    module === "ATTENDANCE" ||
    targetType.includes("attendance")
  ) {
    const studentClass =
      details?.studentClass ||
      details?.class ||
      details?.student?.studentClass;

    const section =
      details?.section ||
      details?.student?.section;

    const total =
      details?.totalStudents ??
      details?.studentCount ??
      details?.attendanceCount;

    const present =
      details?.presentCount;

    const absent =
      details?.absentCount;

    const leave =
      details?.leaveCount;

    if (studentClass || section) {
      let title = `Attendance updated`;

      if (studentClass || section) {
        title += ` • Class ${studentClass || ""}${
          section ? `-${section}` : ""
        }`;
      }

      if (total != null) {
        title += ` • ${total} Students`;
      }

      return title;
    }

    return "Attendance updated";
  }

  // =========================
  // FEE
  // =========================
  if (
    module === "FEE" ||
    module === "STUDENT FEE" ||
    targetType.includes("fee")
  ) {
    const paidAmount =
      details?.paidAmount ??
      details?.payingAmount ??
      details?.response?.paidAmount ??
      details?.amount;

    if (paidAmount != null) {
      return `Fee ₹${toNumber(
        paidAmount
      ).toLocaleString("en-IN")} collected`;
    }

    return "Fee payment updated";
  }

  // =========================
  // ADMISSION
  // =========================
  if (
    module === "ADMISSION" ||
    targetType.includes("admission")
  ) {
    if (targetName) {
      return `Admission updated for ${targetName}`;
    }

    return "Admission updated";
  }

  // =========================
  // STUDENT
  // =========================
  if (
    module === "STUDENT" ||
    targetType.includes("student")
  ) {
    if (action === "CREATE") {
      return targetName
        ? `New student ${targetName} added`
        : "New student added";
    }

    if (action === "UPDATE") {
      return targetName
        ? `${targetName} profile updated`
        : "Student profile updated";
    }

    if (action === "DELETE") {
      return targetName
        ? `${targetName} deleted`
        : "Student deleted";
    }

    return targetName
      ? `Student ${targetName} updated`
      : "Student record updated";
  }

  // =========================
  // TEACHER
  // =========================
  if (
    module === "TEACHER" ||
    targetType.includes("teacher")
  ) {
    if (action === "CREATE") {
      return targetName
        ? `New teacher ${targetName} added`
        : "New teacher added";
    }

    if (action === "UPDATE") {
      return targetName
        ? `${targetName} profile updated`
        : "Teacher profile updated";
    }

    if (action === "DELETE") {
      return targetName
        ? `${targetName} deleted`
        : "Teacher deleted";
    }

    return "Teacher record updated";
  }

  // =========================
  // RESULT / ASSESSMENT
  // =========================
  if (
    module === "RESULT" ||
    module === "ASSESSMENT" ||
    targetType.includes("result")
  ) {
    return action === "CREATE"
      ? "Result created"
      : "Result updated";
  }

  // =========================
  // TRANSPORT
  // =========================
  if (
    module === "TRANSPORT" ||
    targetType.includes("vehicle")
  ) {
    if (action === "CREATE") {
      return "Vehicle added";
    }

    if (action === "UPDATE") {
      return "Vehicle updated";
    }

    if (action === "DELETE") {
      return "Vehicle deleted";
    }

    return "Transport updated";
  }

  // =========================
  // GENERIC
  // =========================
  if (log?.description) {
    let description = log.description;

    description = description
      .replace(
        /\s+in school\s+"[^"]+"/gi,
        ""
      )
      .replace(
        /\s+by\s+anonymousUser/gi,
        ""
      )
      .trim();

    return description;
  }

  return `${action || "Activity"} ${
    targetName || ""
  }`.trim();
};

const getActivitySubtitle = (log) => {
  const details = getActivityDetails(log);

  const action = String(
    log?.action || details?.action || ""
  ).toUpperCase();

  const module = String(
    log?.module || details?.module || ""
  ).toUpperCase();

  const status = String(
    log?.status ||
      details?.status ||
      "SUCCESS"
  ).toUpperCase();

  // =========================
  // PERFORMED BY
  // =========================
  const performedBy =
    log?.username ||
    details?.performedBy?.name ||
    details?.performedBy?.username ||
    "User";

  const role =
    log?.role ||
    details?.performedBy?.role ||
    "";

  // =========================
  // LOGIN / LOGOUT
  // =========================
  if (
    action === "LOGIN" ||
    action === "LOGOUT"
  ) {
    return `${role || "USER"} • ${status} • ${formatActivityTime(
      log?.createdAt
    )}`;
  }

  // =========================
  // ATTENDANCE
  // =========================
  if (module === "ATTENDANCE") {
    const parts = [];

    const studentClass =
      details?.studentClass ||
      details?.class ||
      details?.student?.studentClass;

    const section =
      details?.section ||
      details?.student?.section;

    const total =
      details?.totalStudents ??
      details?.studentCount;

    const present =
      details?.presentCount;

    const absent =
      details?.absentCount;

    const leave =
      details?.leaveCount;

    const attendanceDate =
      details?.attendanceDate ||
      details?.date;

    if (studentClass || section) {
      parts.push(
        `Class ${studentClass || ""}${
          section ? `-${section}` : ""
        }`
      );
    }

    if (total != null) {
      parts.push(`${total} Students`);
    }

    if (present != null) {
      parts.push(`${present} Present`);
    }

    if (absent != null) {
      parts.push(`${absent} Absent`);
    }

    if (leave != null) {
      parts.push(`${leave} Leave`);
    }

    if (attendanceDate) {
      parts.push(
        new Date(attendanceDate).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      );
    }

    parts.push(status);

    return parts.join(" • ");
  }

  // =========================
  // FEE
  // =========================
  if (
    module === "FEE" ||
    module === "STUDENT FEE"
  ) {
    const parts = [];

    const studentName =
      details?.studentName ||
      details?.student?.name;

    const studentClass =
      details?.studentClass ||
      details?.student?.studentClass;

    const section =
      details?.section ||
      details?.student?.section;

    const receiptNo =
      details?.receiptNo ||
      details?.response?.receiptNo;

    const paymentMode =
      details?.paymentMode ||
      details?.response?.paymentMode;

    const paidAmount =
      details?.paidAmount ??
      details?.payingAmount ??
      details?.response?.paidAmount;

    if (studentName) {
      parts.push(studentName);
    }

    if (studentClass || section) {
      parts.push(
        `Class ${studentClass || ""}${
          section ? `-${section}` : ""
        }`
      );
    }

    if (receiptNo) {
      parts.push(`Receipt ${receiptNo}`);
    }

    if (paidAmount != null) {
      parts.push(
        `₹${toNumber(
          paidAmount
        ).toLocaleString("en-IN")}`
      );
    }

    if (paymentMode) {
      parts.push(paymentMode);
    }

    parts.push(status);

    return parts.join(" • ");
  }

  // =========================
  // STUDENT / ADMISSION
  // =========================
  if (
    module === "STUDENT" ||
    module === "ADMISSION"
  ) {
    const parts = [];

    const studentName =
      details?.studentName ||
      details?.student?.name;

    const admissionNumber =
      details?.admissionNumber ||
      details?.student?.admissionNumber;

    const studentClass =
      details?.studentClass ||
      details?.student?.studentClass;

    const section =
      details?.section ||
      details?.student?.section;

    if (studentName) {
      parts.push(studentName);
    }

    if (admissionNumber) {
      parts.push(admissionNumber);
    }

    if (studentClass || section) {
      parts.push(
        `Class ${studentClass || ""}${
          section ? `-${section}` : ""
        }`
      );
    }

    parts.push(status);

    return parts.join(" • ");
  }

  // =========================
  // GENERIC
  // =========================
  const parts = [];

  if (performedBy) {
    parts.push(`By ${performedBy}`);
  }

  if (role) {
    parts.push(role);
  }

  if (log?.targetType) {
    parts.push(log.targetType);
  }

  parts.push(status);

  return parts.join(" • ");
};

  const toNumber = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return 0;
    }

    if (typeof value === "number") {
      return Number.isFinite(value) ? value : 0;
    }

    const number = Number(
      String(value).replace(/,/g, "")
    );

    return Number.isFinite(number) ? number : 0;
  };

  const getPaidAmount = (fee) => {
    const value =
      fee?.paidAmount ;

    return toNumber(value);
  };

  const getTotalAmount = (fee) => {
    const value =
      
      fee?.totalAmount;

    return toNumber(value);
  };

  const getDueAmount = (fee) => {
    const explicitDue =
      fee?.dueAmount;

    if (
      explicitDue !== undefined &&
      explicitDue !== null &&
      explicitDue !== ""
    ) {
      return Math.max(0, toNumber(explicitDue));
    }

    const total = getTotalAmount(fee);
    const paid = getPaidAmount(fee);

    return Math.max(0, total - paid);
  };


  const feeSummary = useMemo(() => {
    let paid = 0;
    let due = 0;

    feeRecords.forEach((fee) => {
      paid += getPaidAmount(fee);
      due += getDueAmount(fee);
    });

    return {
      paid,
      due,
      total: paid + due,
    };
  }, [feeRecords]);

  

  const getFeeClass = (fee) => {
    return (
      fee?.studentClass
    );
  };



  const classWiseFee = useMemo(() => {
    const classMap = {};

    feeRecords.forEach((fee) => {
      const className = getFeeClass(fee);
      const paid = getPaidAmount(fee);

      if (!classMap[className]) {
        classMap[className] = 0;
      }

      classMap[className] += paid;
    });

    return Object.entries(classMap)
      .map(([className, fee]) => ({
        class: className,
        fee,
      }))
      .sort((a, b) => b.fee - a.fee)
      .slice(0, 8);
  }, [feeRecords]);



  const getValidDob = (student) => {
    const dob =
      
      student?.dob ;

    if (!dob) return null;

    const date = new Date(dob);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  };

  const getBirthdayThisYear = (student) => {
    const dob = getValidDob(student);

    if (!dob) return null;

    const today = new Date();

    return new Date(
      today.getFullYear(),
      dob.getMonth(),
      dob.getDate()
    );
  };


  const todaysBirthdays = useMemo(() => {
    const today = new Date();

    return students.filter((student) => {
      const dob = getValidDob(student);

      if (!dob) return false;

      return (
        dob.getMonth() === today.getMonth() &&
        dob.getDate() === today.getDate()
      );
    });
  }, [students]);

 
  const upcomingBirthdays = useMemo(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return students
      .map((student) => {
        const birthday = getBirthdayThisYear(student);

        if (!birthday) return null;

        birthday.setHours(0, 0, 0, 0);

        if (birthday.getTime() === today.getTime()) {
          return null;
        }

        if (birthday < today) {
          birthday.setFullYear(
            today.getFullYear() + 1
          );
        }

        return {
          ...student,
          birthdayDate: birthday,
        };
      })
      .filter(Boolean)
      .sort(
        (a, b) =>
          a.birthdayDate.getTime() -
          b.birthdayDate.getTime()
      );
  }, [students]);

 

  const birthdayList = useMemo(() => {
    const todayList = todaysBirthdays.map(
      (student) => ({
        ...student,
        isToday: true,
        birthdayDate: new Date(),
      })
    );

    const upcomingList = upcomingBirthdays.map(
      (student) => ({
        ...student,
        isToday: false,
      })
    );

    return [...todayList, ...upcomingList];
  }, [
    todaysBirthdays,
    upcomingBirthdays,
  ]);


  const getStudentName = (student) => {
    return (
     
      [
        student?.firstName,
        student?.middleName,
        student?.lastName,
      ]
        .filter(Boolean)
        .join(" ") ||
      "Student"
    );
  };

  const getStudentClass = (student) => {
    return (
      student?.studentClass||
      "-"
    );
  };

  const getStudentImage = (student) => {
    const name = getStudentName(student);

    return (
      student?.profileImage ||
      student?.photo ||
      student?.image ||
      `https://ui-avatars.com/api/?background=2563eb&color=fff&bold=true&name=${encodeURIComponent(
        name
      )}`
    );
  };

  const formatBirthday = (date) => {
    if (!date) return "";

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

 

  const tableSlider = {
    dots: false,
    arrows: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 650,
    autoplaySpeed: 2600,
    pauseOnHover: true,
  };

 
  return (
    <>
      <style>
        {`
          .dashboard-color-card {
            position: relative;
            border: 1px solid rgba(226,232,240,.8) !important;
            // box-shadow: 0 8px 28px rgba(15,23,42,.055) !important;
            transition: all .25s ease;
            overflow: hidden;
          }

          .dashboard-color-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 14px 34px rgba(15,23,42,.09) !important;
          }

          .dashboard-color-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(
              90deg,
              var(--card-start),
              var(--card-end)
            );
          }

          .dashboard-card-header {
            background: rgba(255,255,255,.72) !important;
            border-bottom: 1px solid rgba(226,232,240,.7) !important;
            backdrop-filter: blur(8px);
          }

          .dashboard-icon-box {
            width: 40px;
            height: 40px;
            border-radius: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 19px;
            flex-shrink: 0;
            box-shadow: inset 0 0 0 1px rgba(255,255,255,.7);
          }

          .birthday-student-row {
            transition: all .22s ease;
            cursor: default;
          }

          .birthday-student-row:hover {
            transform: translateX(3px);
            box-shadow: 0 5px 14px rgba(37,99,235,.08);
          }

          .activity-item {
            transition: all .2s ease;
            padding: 5px 7px;
            border-radius: 12px;
          }

          .activity-item:hover {
            background: #f8fafc;
          }

          .activity-line {
            width: 2px;
            height: 18px;
            background: linear-gradient(
              to bottom,
              #cbd5e1,
              #eef2f7
            );
          }

          .fee-stat-pill {
            border-radius: 10px;
            padding: 7px 11px;
            font-size: 10px;
            font-weight: 700;
          }

          @media (max-width: 991px) {
            .dashboard-color-card {
              min-height: 250px !important;
            }
          }

          @media (max-width: 575px) {
            .dashboard-icon-box {
              width: 36px;
              height: 36px;
              font-size: 17px;
            }

            .dashboard-card-title {
              font-size: 13px !important;
            }
          }
        `}
      </style>

      <div className="container-fluid px-0 mt-3 mb-2">
        <div className="row g-3">

          {/* =====================================================
              BIRTHDAYS
          ===================================================== */}

          <div className="col-lg-3 col-md-6">
            <div
              className="card rounded-4 h-100 dashboard-color-card shadow"
              style={{
                minHeight: "260px",
                background:
                  "linear-gradient(145deg,#ffffff 0%,#fffaf0 100%)",
                "--card-start": "#f59e0b",
                "--card-end": "#f97316",
              }}
            >
              <div className="card-header dashboard-card-header border-0 px-3 pt-3 pb-2">
                <div className="d-flex justify-content-between align-items-center">

                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="dashboard-icon-box"
                      style={{
                        background:
                          "linear-gradient(135deg,#fff7d6,#ffedd5)",
                      }}
                    >
                      🎂
                    </div>

                    <div>
                      <h6 className="fw-bold mb-0 dashboard-card-title">
                        Birthdays
                      </h6>

                      <small
                        className="text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        Today & Upcoming
                      </small>
                    </div>
                  </div>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background: "#fff3cd",
                      color: "#b45309",
                      fontSize: "10px",
                    }}
                  >
                    {birthdayList.length}
                  </span>
                </div>
              </div>

              <div
                className="card-body px-3 pt-2"
                style={{ overflow: "hidden" }}
              >
                {loadingStudents ? (
                  <div className="text-center py-4">
                    <div
                      className="spinner-border spinner-border-sm"
                      style={{ color: "#f59e0b" }}
                    />

                    <div className="small text-muted mt-2">
                      Loading birthdays...
                    </div>
                  </div>
                ) : birthdayList.length > 0 ? (
                  <Slider {...tableSlider}>
                    {birthdayList
                      .slice(0, 10)
                      .map((student, index) => (
                        <div
                          key={
                            student?.id ||
                            student?.admissionNumber ||
                            index
                          }
                        >
                          <div
                            className="birthday-student-row d-flex align-items-center p-2 rounded-3 mb-2"
                            style={{
                              background: student.isToday
                                ? "linear-gradient(135deg,#fff9eb,#fff4d6)"
                                : "#f8fbff",
                              border: student.isToday
                                ? "1px solid #fde68a"
                                : "1px solid #e2e8f0",
                            }}
                          >
                            <img
                              src={getStudentImage(student)}
                              alt={getStudentName(student)}
                              className="rounded-circle"
                              width="42"
                              height="42"
                              style={{
                                objectFit: "cover",
                                border: student.isToday
                                  ? "2px solid #fbbf24"
                                  : "2px solid #dbeafe",
                              }}
                            />

                            <div className="ms-2">
                              <h6
                                className="mb-1 fw-semibold"
                                style={{ fontSize: "12px" }}
                              >
                                {getStudentName(student)}
                              </h6>

                              <span
                                className="badge rounded-pill"
                                style={{
                                  fontSize: "8px",
                                  background: "#e0ecff",
                                  color: "#2563eb",
                                }}
                              >
                                {getStudentClass(student)}
                              </span>
                            </div>

                            <div className="ms-auto text-end">
                              {student.isToday ? (
                                <>
                                  <div
                                    className="fw-bold"
                                    style={{
                                      fontSize: "11px",
                                      color: "#d97706",
                                    }}
                                  >
                                    Today
                                  </div>

                                  <small
                                    style={{
                                      fontSize: "9px",
                                      color: "#b45309",
                                    }}
                                  >
                                    🎉 Birthday
                                  </small>
                                </>
                              ) : (
                                <>
                                  <div
                                    className="fw-bold"
                                    style={{
                                      fontSize: "11px",
                                      color: "#2563eb",
                                    }}
                                  >
                                    {formatBirthday(
                                      student.birthdayDate
                                    )}
                                  </div>

                                  <small
                                    className="text-muted"
                                    style={{ fontSize: "9px" }}
                                  >
                                    🎂 Upcoming
                                  </small>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </Slider>
                ) : (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center text-center"
                    style={{ minHeight: "165px" }}
                  >
                    <div
                      className="dashboard-icon-box"
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg,#fff7d6,#ffedd5)",
                        fontSize: "23px",
                      }}
                    >
                      🎂
                    </div>

                    <div className="fw-semibold mt-2">
                      No Birthdays
                    </div>

                    <small
                      className="text-muted"
                      style={{ fontSize: "10px" }}
                    >
                      No upcoming birthdays found.
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =====================================================
              RECENT ACTIVITIES
          ===================================================== */}

          <div className="col-lg-3 col-md-6">
            <div
              className="card rounded-4 h-100 dashboard-color-card shadow rounded-4"
              style={{
                minHeight: "260px",
                background:
                  "linear-gradient(145deg,#ffffff 0%,#f5f8ff 100%)",
                "--card-start": "#2563eb",
                "--card-end": "#8b5cf6",
              }}
            >
              <div className="card-header dashboard-card-header border-0 px-3 pt-3 pb-2">
                <div className="d-flex align-items-center gap-2">

                  <div
                    className="dashboard-icon-box"
                    style={{
                      background:
                        "linear-gradient(135deg,#eaf2ff,#f3e8ff)",
                    }}
                  >
                    🔔
                  </div>

                  <div>
                    <h6 className="fw-bold mb-0 dashboard-card-title">
                      Recent Activities
                    </h6>

                    <small
                      className="text-muted"
                      style={{ fontSize: "10px" }}
                    >
                      Latest updates
                    </small>
                  </div>

                </div>
              </div>
<div className="card-body px-3 pt-3">
  {loadingActivities ? (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "170px",
      }}
    >
      <div
        className="spinner-border spinner-border-sm"
        style={{
          color: "#2563eb",
        }}
      />

      <small
        className="text-muted mt-2"
        style={{
          fontSize: "10px",
        }}
      >
        Loading activities...
      </small>
    </div>
  ) : auditLogs.length > 0 ? (
    <>
      {auditLogs.map((log, index) => {
        const style = getActivityStyle(
          log?.action
        );

        const isLast =
          index === auditLogs.length - 1;

        return (
          <div
            key={
              log?.id ||
              `${log?.createdAt}-${index}`
            }
            className="d-flex activity-item position-relative"
            style={{
              marginBottom: isLast
                ? "0"
                : "12px",
              cursor: "default",
            }}
          >
            {/* ICON + LINE */}
            <div className="d-flex flex-column align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "34px",
                  height: "34px",
                  background: style.bg,
                  color: style.color,
                  border: `1px solid ${style.color}20`,
                  fontSize: "14px",
                  flexShrink: 0,
                }}
              >
                {getActivityIcon(
                  log?.action
                )}
              </div>

              {!isLast && (
                <div
                  className="activity-line"
                  style={{
                    height: "22px",
                  }}
                />
              )}
            </div>


            {/* ACTIVITY CONTENT */}
            <div
              className="ms-3 pt-1 pe-1"
              style={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <div
                className="fw-semibold"
                style={{
                  fontSize: "11px",
                  lineHeight: "1.35",
                  color: "#1e293b",
                  wordBreak: "break-word",
                }}
              >
                {getActivityTitle(log)}
              </div>

              <div
                className="mt-1"
                style={{
                  fontSize: "9px",
                  color: "#64748b",
                  lineHeight: "1.4",
                }}
              >
                {getActivitySubtitle(log)}
              </div>

              <div
                className="mt-1"
                style={{
                  fontSize: "8px",
                  color: "#94a3b8",
                }}
              >
                {formatActivityTime(
                  log?.createdAt
                )}
              </div>
            </div>


            {/* STATUS DOT */}
            <div
              className="pt-2"
              style={{
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  display: "block",
                  borderRadius: "50%",
                  background: style.color,
                }}
              />
            </div>
          </div>
        );
      })}


      {/* FOOTER */}
      <div
        className="mt-3 p-2 rounded-3 text-center"
        style={{
          background:
            "linear-gradient(135deg,#eff6ff,#f5f3ff)",
          border: "1px solid #e0e7ff",
        }}
      >
        <small
          className="fw-semibold"
          style={{
            fontSize: "9px",
            color: "#4f46e5",
          }}
        >
          ✨ Latest 3 school activities
        </small>
      </div>
    </>
  ) : (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{
        minHeight: "170px",
      }}
    >
      <div
        className="dashboard-icon-box"
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg,#eaf2ff,#f3e8ff)",
          fontSize: "22px",
        }}
      >
        🔔
      </div>

      <div className="fw-semibold mt-2">
        No Recent Activities
      </div>

      <small
        className="text-muted"
        style={{
          fontSize: "10px",
        }}
      >
        No activity found for this school.
      </small>
    </div>
  )}
</div>
            </div>
          </div>

          {/* =====================================================
              FEE COLLECTION
          ===================================================== */}

          <div className="col-lg-6 col-md-12">
            <div
              className="card rounded-4 h-100 dashboard-color-card shadow rounded-4"
              style={{
                minHeight: "260px",
                background:
                  "linear-gradient(145deg,#ffffff 0%,#f2fff9 100%)",
                "--card-start": "#10b981",
                "--card-end": "#06b6d4",
              }}
            >
              <div className="card-header dashboard-card-header border-0 px-3 pt-3 pb-2">
                <div className="d-flex justify-content-between align-items-center">

                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="dashboard-icon-box"
                      style={{
                        background:
                          "linear-gradient(135deg,#dcfce7,#cffafe)",
                      }}
                    >
                      💰
                    </div>

                    <div>
                      <h6 className="fw-bold mb-0 dashboard-card-title">
                        Fee Collection
                      </h6>

                      <small
                        className="text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        Collection & class-wise overview
                      </small>
                    </div>
                  </div>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background: "#dcfce7",
                      color: "#047857",
                      fontSize: "9px",
                    }}
                  >
                    ● This Month
                  </span>
                </div>
              </div>

              <div
                className="card-body px-2 py-1"
                style={{ overflow: "hidden" }}
              >
                {loadingFees ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "210px" }}
                  >
                    <div className="text-center">
                      <div
                        className="spinner-border spinner-border-sm"
                        style={{ color: "#10b981" }}
                      />

                      <div className="small text-muted mt-2">
                        Loading fee collection...
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row align-items-center h-100">

                      {/* DONUT */}
                      <div className="col-md-5 col-12 d-flex justify-content-center align-items-center">
                        <div
                          style={{
                            width: "100%",
                            height: "220px",
                          }}
                        >
                          <FeeCollectionDonut
                            paid={feeSummary.paid}
                            due={feeSummary.due}
                          />
                        </div>
                      </div>

                      {/* BAR */}
                      <div className="col-md-7 col-12 d-flex justify-content-center align-items-center">
                        <div
                          style={{
                            width: "100%",
                            height: "220px",
                          }}
                        >
                          <FeeCollectionBarChart
                            data={classWiseFee}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center gap-2 flex-wrap pb-2">
                      <div
                        className="fee-stat-pill"
                        style={{
                          background: "#ecfdf5",
                          color: "#047857",
                        }}
                      >
                        ✓ Paid ₹
                        {feeSummary.paid.toLocaleString(
                          "en-IN"
                        )}
                      </div>

                      <div
                        className="fee-stat-pill"
                        style={{
                          background: "#fff1f2",
                          color: "#be123c",
                        }}
                      >
                        ! Due ₹
                        {feeSummary.due.toLocaleString(
                          "en-IN"
                        )}
                      </div>

                      <div
                        className="fee-stat-pill"
                        style={{
                          background: "#eff6ff",
                          color: "#1d4ed8",
                        }}
                      >
                        Σ Total ₹
                        {feeSummary.total.toLocaleString(
                          "en-IN"
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default BirthdayActivitiesCollection;

