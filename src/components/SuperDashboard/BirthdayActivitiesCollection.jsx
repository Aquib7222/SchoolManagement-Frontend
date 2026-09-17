


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

  const storedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const storedSchoolId = JSON.parse(
    localStorage.getItem("schoolId") || "null"
  );

  const schoolId =
    storedUser?.schoolId ||
    storedUser?.school?.id ||
    storedSchoolId;

  /* =========================================================
     GET ALL STUDENTS
  ========================================================= */

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

  /* =========================================================
     GET FEE COLLECTION
  ========================================================= */

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

  /* =========================================================
     NUMBER HELPER
  ========================================================= */

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

  /* =========================================================
     FEE HELPERS
  ========================================================= */

  const getPaidAmount = (fee) => {
    const value =
      fee?.paidAmount ??
      fee?.amountPaid ??
      fee?.paidFee ??
      fee?.totalPaid ??
      fee?.paid ??
      fee?.paymentAmount ??
      fee?.receivedAmount;

    return toNumber(value);
  };

  const getTotalAmount = (fee) => {
    const value =
      fee?.totalFee ??
      fee?.totalAmount ??
      fee?.feeAmount ??
      fee?.amount ??
      fee?.netAmount ??
      fee?.payableAmount;

    return toNumber(value);
  };

  const getDueAmount = (fee) => {
    const explicitDue =
      fee?.dueAmount ??
      fee?.pendingAmount ??
      fee?.remainingAmount ??
      fee?.balanceDue ??
      fee?.due ??
      fee?.pending;

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

  /* =========================================================
     FEE SUMMARY
  ========================================================= */

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

  /* =========================================================
     CLASS NAME
  ========================================================= */

  const getFeeClass = (fee) => {
    return (
      fee?.studentClass ||
      fee?.className ||
      fee?.standard ||
      fee?.class ||
      fee?.student?.studentClass ||
      fee?.student?.className ||
      fee?.student?.standard ||
      "Other"
    );
  };

  /* =========================================================
     CLASS WISE FEE
  ========================================================= */

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

  /* =========================================================
     DATE HELPERS
  ========================================================= */

  const getValidDob = (student) => {
    const dob =
      student?.dateOfBirth ||
      student?.dob ||
      student?.dateOfbirth ||
      student?.birthDate;

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

  /* =========================================================
     TODAY'S BIRTHDAYS
  ========================================================= */

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

  /* =========================================================
     UPCOMING BIRTHDAYS
  ========================================================= */

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

  /* =========================================================
     COMBINED BIRTHDAYS
  ========================================================= */

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

  /* =========================================================
     STUDENT HELPERS
  ========================================================= */

  const getStudentName = (student) => {
    return (
      student?.studentName ||
      student?.name ||
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
      student?.studentClass ||
      student?.className ||
      student?.standard ||
      student?.class ||
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

  /* =========================================================
     FORMAT BIRTHDAY
  ========================================================= */

  const formatBirthday = (date) => {
    if (!date) return "";

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  /* =========================================================
     SLIDER
  ========================================================= */

  const tableSlider = {
    dots: false,
    arrows: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 650,
    autoplaySpeed: 2600,
    pauseOnHover: true,
  };

  /* =========================================================
     ACTIVITIES
  ========================================================= */

  const activities = [
    {
      title: "Admission Completed",
      time: "2 Minutes Ago",
      icon: "🎓",
      type: "success",
      bg: "#ecfdf5",
      color: "#059669",
    },
    {
      title: "Fee Received",
      time: "15 Minutes Ago",
      icon: "💰",
      type: "primary",
      bg: "#eff6ff",
      color: "#2563eb",
    },
    {
      title: "Attendance Updated",
      time: "1 Hour Ago",
      icon: "📋",
      type: "danger",
      bg: "#fff1f2",
      color: "#e11d48",
    },
  ];

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
                {activities.map((activity, index) => (
                  <div
                    key={activity.title}
                    className="d-flex activity-item position-relative"
                    style={{
                      marginBottom:
                        index === activities.length - 1
                          ? "0"
                          : "10px",
                    }}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "34px",
                          height: "34px",
                          background: activity.bg,
                          color: activity.color,
                          border: `1px solid ${activity.color}20`,
                          fontSize: "14px",
                          flexShrink: 0,
                        }}
                      >
                        {activity.icon}
                      </div>

                      {index !== activities.length - 1 && (
                        <div className="activity-line" />
                      )}
                    </div>

                    <div className="ms-3 pt-1">
                      <h6
                        className="mb-1 fw-semibold"
                        style={{ fontSize: "12px" }}
                      >
                        {activity.title}
                      </h6>

                      <small
                        className="text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {activity.time}
                      </small>
                    </div>

                    <div className="ms-auto pt-2">
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          display: "block",
                          borderRadius: "50%",
                          background: activity.color,
                        }}
                      />
                    </div>
                  </div>
                ))}

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
                    ✨ School activity is running smoothly
                  </small>
                </div>
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

