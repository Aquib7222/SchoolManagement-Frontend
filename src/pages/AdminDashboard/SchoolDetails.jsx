
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";

import {
  FaSchool,
  FaUserGraduate,
  FaUserTie,
  FaUserPlus,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaCalendarCheck,
  FaArrowLeft,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEdit,
  FaUsers,
} from "react-icons/fa";

import {
  MdOutlineDashboard,
  MdAssessment,
  MdPayments,
  MdPeople,
} from "react-icons/md";

import {
  LuSchool,
  LuUsers,
  LuReceipt,
  LuArrowUpRight,
  LuRefreshCw,
  LuBuilding2,
} from "react-icons/lu";

const SchoolDetails = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();

  const [school, setSchool] = useState(null);
  const [students, setStudents] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [fees, setFees] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [staff, setStaff] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [attendance, setAttendance] = useState({
    percentage: 0,
    present: 0,
    absent: 0,
    leave: 0,
  });

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {
    if (schoolId) {
      loadSchoolDetails();
    }
  }, [schoolId]);

  const loadSchoolDetails = async () => {
    try {
      setLoading(true);

      const results = await Promise.allSettled([
        axios.get(`/api/school/${schoolId}`, config),

        axios.get(
          `/api/students/school?schoolId=${schoolId}`,
          config
        ),

        axios.get(
          `/api/admissions/school?schoolId=${schoolId}`,
          config
        ),

        axios.get(
          `/api/student-fee/school/${schoolId}`,
          config
        ),

        axios.get(
          `/assessment/exams?schoolId=${schoolId}`,
          config
        ),

        axios.get(
          `/api/teachers/school?schoolId=${schoolId}`,
          config
        ),

        axios.get(
          `/staff/school?schoolId=${schoolId}`,
          config
        ),

        axios.get(
          `/student/attendance/summary?schoolId=${schoolId}`,
          config
        ),
      ]);

      // SCHOOL
      if (results[0].status === "fulfilled") {
        setSchool(results[0].value?.data || null);
      }

      // STUDENTS
      if (results[1].status === "fulfilled") {
        setStudents(
          normalizeList(results[1].value?.data, [
            "students",
          ])
        );
      } else {
        setStudents([]);
      }

      // ADMISSIONS
      if (results[2].status === "fulfilled") {
        setAdmissions(
          normalizeList(results[2].value?.data, [
            "admissions",
          ])
        );
      } else {
        setAdmissions([]);
      }

      // FEES
      if (results[3].status === "fulfilled") {
        setFees(
          normalizeList(results[3].value?.data, [
            "fees",
          ])
        );
      } else {
        setFees([]);
      }

      // ASSESSMENTS
      if (results[4].status === "fulfilled") {
        setAssessments(
          normalizeList(results[4].value?.data, [
            "assessments",
            "exams",
          ])
        );
      } else {
        setAssessments([]);
      }

      // TEACHERS
      if (results[5].status === "fulfilled") {
        setTeachers(
          normalizeList(results[5].value?.data, [
            "teachers",
          ])
        );
      } else {
        setTeachers([]);
      }

      // STAFF
      if (results[6].status === "fulfilled") {
        setStaff(
          normalizeList(results[6].value?.data, [
            "staff",
          ])
        );
      } else {
        setStaff([]);
      }

      // ATTENDANCE
      if (results[7].status === "fulfilled") {
        const data = results[7].value?.data;

        setAttendance({
          percentage: Number(
            data?.attendancePercentage ??
              data?.percentage ??
              data?.presentPercentage ??
              (typeof data === "number" ? data : 0)
          ),
          present: Number(
            data?.present ?? data?.presentCount ?? 0
          ),
          absent: Number(
            data?.absent ?? data?.absentCount ?? 0
          ),
          leave: Number(
            data?.leave ??
              data?.leaveCount ??
              data?.late ??
              0
          ),
        });
      }
    } catch (error) {
      console.error(
        "School details loading error:",
        error
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadSchoolDetails();
  };

  // =========================================================
  // NORMALIZE LIST
  // =========================================================

  const normalizeList = (data, keys = []) => {
    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data?.content)) {
      return data.content;
    }

    for (const key of keys) {
      if (Array.isArray(data?.[key])) {
        return data[key];
      }
    }

    return [];
  };

  // =========================================================
  // FEE CALCULATION
  // =========================================================

  const feeStats = useMemo(() => {
    let total = 0;
    let paid = 0;

    fees.forEach((fee) => {
      const totalAmount =
        Number(
          fee.totalAmount ??
            fee.totalFee ??
            fee.amount ??
            fee.feeAmount ??
            0
        ) || 0;

      const paidAmount =
        Number(
          fee.paidAmount ??
            fee.paidFee ??
            fee.amountPaid ??
            fee.paid ??
            0
        ) || 0;

      total += totalAmount;
      paid += paidAmount;
    });

    const pending = Math.max(total - paid, 0);

    const percentage =
      total > 0
        ? Math.min((paid / total) * 100, 100)
        : 0;

    return {
      total,
      paid,
      pending,
      percentage,
    };
  }, [fees]);

  // =========================================================
  // HELPERS
  // =========================================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStudentName = (student) => {
    return (
      student?.studentName ||
      student?.name ||
      `${student?.firstName || ""} ${
        student?.lastName || ""
      }`.trim() ||
      "-"
    );
  };

  const getAdmissionStudentName = (admission) => {
    return (
      admission?.studentName ||
      admission?.name ||
      `${admission?.firstName || ""} ${
        admission?.lastName || ""
      }`.trim() ||
      admission?.student?.studentName ||
      admission?.student?.name ||
      "-"
    );
  };

  const getFeeStudentName = (fee) => {
    return (
      fee?.studentName ||
      fee?.student?.studentName ||
      fee?.student?.name ||
      fee?.name ||
      "-"
    );
  };

  const getClassName = (item) => {
    return (
      item?.studentClass ||
      item?.className ||
      item?.class ||
      "-"
    );
  };

  const getPaymentAmount = (fee) => {
    return (
      fee?.paidAmount ??
      fee?.amountPaid ??
      fee?.paid ??
      fee?.amount ??
      0
    );
  };

  const getStatus = (status) => {
    const value = String(
      status || "ACTIVE"
    ).toUpperCase();

    if (
      ["ACTIVE", "PAID", "SUCCESS", "COMPLETED"].includes(
        value
      )
    ) {
      return {
        text: value,
        className: "school-status success",
      };
    }

    if (
      ["INACTIVE", "UNPAID", "FAILED", "REJECTED"].includes(
        value
      )
    ) {
      return {
        text: value,
        className: "school-status danger",
      };
    }

    return {
      text: value,
      className: "school-status warning",
    };
  };

  const schoolStatus = getStatus(
    school?.status || "ACTIVE"
  );

  // =========================================================
  // STAT CARD
  // =========================================================

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    type = "blue",
  }) => {
    return (
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="sd-stat-card">
          <div className={`sd-stat-icon ${type}`}>
            {icon}
          </div>

          <div className="sd-stat-content">
            <span className="sd-stat-title">
              {title}
            </span>

            <strong className="sd-stat-value">
              {value}
            </strong>

            {subtitle && (
              <small className="sd-stat-subtitle">
                {subtitle}
              </small>
            )}
          </div>

          <div className="sd-stat-arrow">
            <LuArrowUpRight />
          </div>
        </div>
      </div>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="school-details-page">
        <div className="sd-loading">
          <div className="sd-loading-card">
            <div className="spinner-border text-primary" />

            <strong>
              Loading school details
            </strong>

            <span>
              Please wait while we prepare the dashboard...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="school-details-page">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <div className="sd-top-header">

        <div className="sd-header-left">

          <button
            className="sd-back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>

          <div>
            <div className="sd-breadcrumb">
              <MdOutlineDashboard />

              <span>Dashboard</span>

              <b>/</b>

              <span>Schools</span>

              <b>/</b>

              <strong>Details</strong>
            </div>

            <h4>
              School Details
            </h4>

            <p>
              Complete overview of school activities,
              students and finances
            </p>
          </div>

        </div>

        <div className="sd-header-actions">

          <button
            className="sd-refresh-btn"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <LuRefreshCw
              className={
                refreshing
                  ? "sd-spin"
                  : ""
              }
            />

            <span>Refresh</span>
          </button>

          <button
            className="sd-school-list-btn"
            onClick={() =>
              navigate("/school-list")
            }
          >
            <LuSchool />

            <span>School List</span>
          </button>

        </div>

      </div>

      {/* =====================================================
          SCHOOL HERO
      ===================================================== */}

      <div className="sd-school-hero">

        <div className="sd-hero-pattern"></div>

        <div className="sd-hero-content">

          <div className="sd-school-logo">

            {school?.logo ? (
              <img
                src={school.logo}
                alt="School Logo"
              />
            ) : (
              <FaSchool />
            )}

          </div>

          <div className="sd-school-main">

            <div className="sd-school-title-row">

              <h2>
                {school?.schoolName ||
                  "School Name"}
              </h2>

              <span
                className={
                  schoolStatus.className
                }
              >
                <i></i>

                {schoolStatus.text}
              </span>

            </div>

            <div className="sd-school-code">
              School Code :
              <strong>
                {" "}
                {school?.schoolCode ||
                  school?.code ||
                  "-"}
              </strong>
            </div>

            <div className="sd-school-contact">

              <span>
                <FaMapMarkerAlt />

                {[
                  school?.city,
                  school?.state,
                ]
                  .filter(Boolean)
                  .join(", ") || "-"}
              </span>

              <span>
                <FaPhone />

                {school?.phone ||
                  school?.phoneNumber ||
                  "-"}
              </span>

              <span>
                <FaEnvelope />

                {school?.email || "-"}
              </span>

            </div>

          </div>

          <button
            className="sd-edit-school"
            onClick={() =>
              navigate(
                `/school-edit/${schoolId}`
              )
            }
          >
            <FaEdit />

            <span>Edit School</span>
          </button>

        </div>

      </div>

      {/* =====================================================
          SCHOOL INFORMATION + ACADEMIC SUMMARY
      ===================================================== */}

      <div className="row g-3 mb-3">

        <div className="col-12 col-xl-8">

          <div className="sd-card h-100">

            <div className="sd-card-header">

              <div className="sd-card-heading">

                <div className="sd-heading-icon blue">
                  <LuBuilding2 />
                </div>

                <div>
                  <h6>
                    School Information
                  </h6>

                  <span>
                    Basic organization details
                  </span>
                </div>

              </div>

            </div>

            <div className="sd-info-grid">

              <InfoItem
                label="Organization Name"
                value={
                  school?.schoolName
                }
              />

              <InfoItem
                label="School Type"
                value={
                  school?.schoolType
                }
              />

              <InfoItem
                label="School Category"
                value={
                  school?.schoolCategory
                }
              />

              <InfoItem
                label="Affiliation Board"
                value={
                  school?.affiliationBoard
                }
              />

              <InfoItem
                label="Established Year"
                value={
                  school?.establishedYear
                }
              />

              <InfoItem
                label="Country"
                value={
                  school?.country || "India"
                }
              />

              <InfoItem
                label="Pincode"
                value={
                  school?.pincode
                }
              />

              <InfoItem
                label="Address"
                value={
                  school?.address
                }
              />

            </div>

          </div>

        </div>

        <div className="col-12 col-xl-4">

          <div className="sd-card h-100">

            <div className="sd-card-header">

              <div className="sd-card-heading">

                <div className="sd-heading-icon purple">
                  <FaGraduationCap />
                </div>

                <div>
                  <h6>
                    Academic Summary
                  </h6>

                  <span>
                    Current statistics
                  </span>
                </div>

              </div>

            </div>

            <div className="sd-summary-list">

              <SummaryRow
                label="Students"
                value={
                  students.length
                }
                icon={
                  <FaUserGraduate />
                }
              />

              <SummaryRow
                label="Teachers"
                value={
                  teachers.length
                }
                icon={
                  <FaUserTie />
                }
              />

              <SummaryRow
                label="Staff"
                value={
                  staff.length
                }
                icon={
                  <MdPeople />
                }
              />

              <SummaryRow
                label="Assessments"
                value={
                  assessments.length
                }
                icon={
                  <MdAssessment />
                }
              />

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          MAIN STATS
      ===================================================== */}

      <div className="row g-3 mb-3">

        <StatCard
          title="Total Students"
          value={students.length.toLocaleString(
            "en-IN"
          )}
          subtitle="Currently enrolled"
          icon={<FaUserGraduate />}
          type="blue"
        />

        <StatCard
          title="Admissions"
          value={admissions.length.toLocaleString(
            "en-IN"
          )}
          subtitle="Total admissions"
          icon={<FaUserPlus />}
          type="purple"
        />

        <StatCard
          title="Teachers"
          value={teachers.length.toLocaleString(
            "en-IN"
          )}
          subtitle="Teaching staff"
          icon={<FaUserTie />}
          type="green"
        />

        <StatCard
          title="Staff"
          value={staff.length.toLocaleString(
            "en-IN"
          )}
          subtitle="Non-teaching staff"
          icon={<MdPeople />}
          type="orange"
        />

      </div>

      {/* =====================================================
          FINANCE STATS
      ===================================================== */}

      <div className="row g-3 mb-3">

        <StatCard
          title="Total Fee"
          value={formatCurrency(
            feeStats.total
          )}
          subtitle="Total fee amount"
          icon={<FaMoneyBillWave />}
          type="cyan"
        />

        <StatCard
          title="Fee Collected"
          value={formatCurrency(
            feeStats.paid
          )}
          subtitle="Successfully collected"
          icon={<FaMoneyCheckAlt />}
          type="green"
        />

        <StatCard
          title="Fee Pending"
          value={formatCurrency(
            feeStats.pending
          )}
          subtitle="Outstanding amount"
          icon={<LuReceipt />}
          type="red"
        />

        <StatCard
          title="Attendance"
          value={`${Number(
            attendance.percentage || 0
          ).toFixed(1)}%`}
          subtitle="Overall attendance"
          icon={<FaCalendarCheck />}
          type="blue"
        />

      </div>

      {/* =====================================================
          FINANCE + ATTENDANCE
      ===================================================== */}

      <div className="row g-3 mb-3">

        {/* FEE */}

        <div className="col-12 col-lg-6">

          <div className="sd-card h-100">

            <div className="sd-card-header">

              <div className="sd-card-heading">

                <div className="sd-heading-icon green">
                  <MdPayments />
                </div>

                <div>
                  <h6>
                    Fee Collection
                  </h6>

                  <span>
                    Paid versus pending fee
                  </span>
                </div>

              </div>

              <span className="sd-percent-pill">
                {feeStats.percentage.toFixed(
                  1
                )}
                %
              </span>

            </div>

            <div className="sd-finance-body">

              <div className="sd-finance-total">

                <div>
                  <span>
                    Total Fee
                  </span>

                  <strong>
                    {formatCurrency(
                      feeStats.total
                    )}
                  </strong>
                </div>

                <div className="sd-finance-icon">
                  <FaMoneyBillWave />
                </div>

              </div>

              <div className="sd-progress">

                <div
                  className="sd-progress-value"
                  style={{
                    width: `${feeStats.percentage}%`,
                  }}
                ></div>

              </div>

              <div className="sd-finance-breakdown">

                <div className="sd-finance-item">
                  <div className="sd-dot green"></div>

                  <div>
                    <span>
                      Collected
                    </span>

                    <strong>
                      {formatCurrency(
                        feeStats.paid
                      )}
                    </strong>
                  </div>
                </div>

                <div className="sd-finance-item">
                  <div className="sd-dot red"></div>

                  <div>
                    <span>
                      Pending
                    </span>

                    <strong>
                      {formatCurrency(
                        feeStats.pending
                      )}
                    </strong>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ATTENDANCE */}

        <div className="col-12 col-lg-6">

          <div className="sd-card h-100">

            <div className="sd-card-header">

              <div className="sd-card-heading">

                <div className="sd-heading-icon blue">
                  <FaCalendarCheck />
                </div>

                <div>
                  <h6>
                    Attendance Overview
                  </h6>

                  <span>
                    Overall student attendance
                  </span>
                </div>

              </div>

              <span className="sd-percent-pill blue-pill">
                {Number(
                  attendance.percentage || 0
                ).toFixed(1)}
                %
              </span>

            </div>

            <div className="sd-attendance-body">

              <div
                className="sd-attendance-circle"
                style={{
                  "--attendance": `${Math.min(
                    Number(
                      attendance.percentage || 0
                    ),
                    100
                  )}%`,
                }}
              >
                <div>

                  <strong>
                    {Number(
                      attendance.percentage || 0
                    ).toFixed(1)}
                    %
                  </strong>

                  <span>
                    Attendance
                  </span>

                </div>
              </div>

              <div className="sd-attendance-stats">

                <AttendanceItem
                  icon={
                    <FaCheckCircle />
                  }
                  label="Present"
                  value={
                    attendance.present
                  }
                  type="present"
                />

                <AttendanceItem
                  icon={
                    <FaTimesCircle />
                  }
                  label="Absent"
                  value={
                    attendance.absent
                  }
                  type="absent"
                />

                <AttendanceItem
                  icon={<FaClock />}
                  label="Leave / Late"
                  value={
                    attendance.leave
                  }
                  type="leave"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          RECENT ADMISSIONS + PAYMENTS
      ===================================================== */}

      <div className="row g-3 mb-3">

        {/* ADMISSIONS */}

        <div className="col-12 col-xl-7">

          <div className="sd-card">

            <CardHeader
              icon={<FaUserPlus />}
              iconType="purple"
              title="Recent Admissions"
              subtitle="Latest students admitted"
              buttonText="View All"
              onClick={() =>
                navigate(
                  `/admin/student-list?schoolId=${schoolId}`
                )
              }
            />

            <div className="table-responsive">

              <table className="table sd-table align-middle">

                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Admission No.</th>
                    <th>Class</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {admissions.length > 0 ? (
                    admissions
                      .slice(0, 5)
                      .map(
                        (
                          admission,
                          index
                        ) => {

                          const status =
                            getStatus(
                              admission?.status ||
                                "ACTIVE"
                            );

                          return (
                            <tr
                              key={
                                admission?.id ||
                                admission?.admissionNumber ||
                                index
                              }
                            >

                              <td>

                                <div className="sd-table-user">

                                  <div className="sd-avatar purple">
                                    <FaUserGraduate />
                                  </div>

                                  <div>

                                    <strong>
                                      {getAdmissionStudentName(
                                        admission
                                      )}
                                    </strong>

                                    <small>
                                      {admission?.gender ||
                                        "-"}
                                    </small>

                                  </div>

                                </div>

                              </td>

                              <td>
                                <span className="sd-admission-no">
                                  {admission?.admissionNumber ||
                                    "-"}
                                </span>
                              </td>

                              <td>
                                {getClassName(
                                  admission
                                )}
                              </td>

                              <td>
                                {formatDate(
                                  admission?.today ||
                                    admission?.admissionDate ||
                                    admission?.createdAt
                                )}
                              </td>

                              <td>
                                <span
                                  className={
                                    status.className
                                  }
                                >
                                  {status.text}
                                </span>
                              </td>

                            </tr>
                          );
                        }
                      )
                  ) : (
                    <EmptyRow
                      message="No admission records found"
                    />
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* PAYMENTS */}

        <div className="col-12 col-xl-5">

          <div className="sd-card">

            <CardHeader
              icon={<MdPayments />}
              iconType="green"
              title="Recent Payments"
              subtitle="Latest fee transactions"
              buttonText="View All"
              onClick={() =>
                navigate(
                  `/admin/fee-list?schoolId=${schoolId}`
                )
              }
            />

            <div className="sd-payment-list">

              {fees.length > 0 ? (
                fees
                  .slice(0, 6)
                  .map(
                    (fee, index) => {

                      const status =
                        getStatus(
                          fee?.status ||
                            "PAID"
                        );

                      return (
                        <div
                          className="sd-payment-item"
                          key={
                            fee?.id ||
                            index
                          }
                        >

                          <div className="sd-payment-icon">
                            <FaMoneyBillWave />
                          </div>

                          <div className="sd-payment-info">

                            <strong>
                              {getFeeStudentName(
                                fee
                              )}
                            </strong>

                            <span>
                              {formatDate(
                                fee?.paymentDate ||
                                  fee?.paidDate ||
                                  fee?.createdAt
                              )}
                            </span>

                          </div>

                          <div className="sd-payment-amount">

                            <strong>
                              {formatCurrency(
                                getPaymentAmount(
                                  fee
                                )
                              )}
                            </strong>

                            <span
                              className={
                                status.className
                              }
                            >
                              {status.text}
                            </span>

                          </div>

                        </div>
                      );
                    }
                  )
              ) : (
                <div className="sd-empty">
                  <MdPayments />

                  <span>
                    No fee payments found
                  </span>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          STUDENTS + ASSESSMENTS
      ===================================================== */}

      <div className="row g-3 mb-3">

        {/* STUDENTS */}

        <div className="col-12 col-xl-6">

          <div className="sd-card">

            <CardHeader
              icon={<FaUserGraduate />}
              iconType="blue"
              title="Students Overview"
              subtitle="Recently registered students"
              buttonText="View All"
              onClick={() =>
                navigate(
                  `/admin/student-list?schoolId=${schoolId}`
                )
              }
            />

            <div className="table-responsive">

              <table className="table sd-table align-middle">

                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Roll No.</th>
                    <th>Class</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {students.length > 0 ? (
                    students
                      .slice(0, 5)
                      .map(
                        (
                          student,
                          index
                        ) => {

                          const status =
                            getStatus(
                              student?.status ||
                                "ACTIVE"
                            );

                          return (
                            <tr
                              key={
                                student?.id ||
                                student?.admissionNumber ||
                                index
                              }
                            >

                              <td>

                                <div className="sd-table-user">

                                  <div className="sd-avatar blue">
                                    <FaUserGraduate />
                                  </div>

                                  <div>

                                    <strong>
                                      {getStudentName(
                                        student
                                      )}
                                    </strong>

                                    <small>
                                      {student?.admissionNumber ||
                                        "-"}
                                    </small>

                                  </div>

                                </div>

                              </td>

                              <td>
                                {student?.rollNumber ||
                                  student?.rollNo ||
                                  "-"}
                              </td>

                              <td>
                                {getClassName(
                                  student
                                )}
                              </td>

                              <td>
                                <span
                                  className={
                                    status.className
                                  }
                                >
                                  {status.text}
                                </span>
                              </td>

                            </tr>
                          );
                        }
                      )
                  ) : (
                    <EmptyRow
                      message="No students found"
                    />
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* ASSESSMENTS */}

        <div className="col-12 col-xl-6">

          <div className="sd-card">

            <CardHeader
              icon={<MdAssessment />}
              iconType="purple"
              title="Assessment & Exams"
              subtitle="Recent assessment activities"
              buttonText="View All"
              onClick={() =>
                navigate(
                  `/admin/assessment?schoolId=${schoolId}`
                )
              }
            />

            <div className="sd-assessment-list">

              {assessments.length > 0 ? (
                assessments
                  .slice(0, 6)
                  .map(
                    (
                      assessment,
                      index
                    ) => (
                      <div
                        className="sd-assessment-item"
                        key={
                          assessment?.id ||
                          index
                        }
                      >

                        <div className="sd-assessment-icon">
                          <MdAssessment />
                        </div>

                        <div className="sd-assessment-info">

                          <strong>
                            {assessment?.examTerm ||
                              assessment?.examName ||
                              assessment?.name ||
                              "Assessment"}
                          </strong>

                          <span>
                            {assessment?.session ||
                              assessment?.academicYear ||
                              "Academic Assessment"}
                          </span>

                        </div>

                        <div className="sd-assessment-date">
                          {formatDate(
                            assessment?.startDate ||
                              assessment?.examDate ||
                              assessment?.createdAt
                          )}
                        </div>

                      </div>
                    )
                  )
              ) : (
                <div className="sd-empty">
                  <MdAssessment />

                  <span>
                    No assessment records found
                  </span>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <div className="sd-quick-card">

        <div className="sd-quick-title">

          <div className="sd-quick-icon">
            <LuUsers />
          </div>

          <div>
            <h6>
              Quick Actions
            </h6>

            <span>
              Manage this school's data quickly
            </span>
          </div>

        </div>

        <div className="sd-quick-actions">

          <button
            onClick={() =>
              navigate(
                `/admin/student-list?schoolId=${schoolId}`
              )
            }
          >
            <FaUserGraduate />
            Students
          </button>

          <button
            onClick={() =>
              navigate(
                `/admin/admission-list?schoolId=${schoolId}`
              )
            }
          >
            <FaUserPlus />
            Admissions
          </button>

          <button
            onClick={() =>
              navigate(
                `/admin/fee-list?schoolId=${schoolId}`
              )
            }
          >
            <MdPayments />
            Fees
          </button>

          <button
            onClick={() =>
              navigate(
                `/admin/assessment?schoolId=${schoolId}`
              )
            }
          >
            <MdAssessment />
            Assessments
          </button>

        </div>

      </div>

      {/* =====================================================
          STYLE
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .school-details-page {
          min-height: 100vh;
          padding: 18px;
          background: #f5f7fb;
          color: #263248;
          font-family:
            "Segoe UI",
            Tahoma,
            Geneva,
            Verdana,
            sans-serif;
        }

        /* ================= HEADER ================= */

        .sd-top-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 18px;
        }

        .sd-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .sd-back-btn {
          width: 40px;
          height: 40px;
          border: 1px solid #e4e9f1;
          background: #ffffff;
          color: #667085;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: .2s ease;
          flex-shrink: 0;
        }

        .sd-back-btn:hover {
          color: #0d6efd;
          border-color: #bdd4ff;
          background: #f3f7ff;
          transform: translateX(-2px);
        }

        .sd-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: #98a2b3;
          margin-bottom: 2px;
        }

        .sd-breadcrumb svg {
          color: #0d6efd;
        }

        .sd-breadcrumb b {
          font-weight: 500;
          color: #c1c7d0;
        }

        .sd-breadcrumb strong {
          color: #667085;
          font-weight: 600;
        }

        .sd-top-header h4 {
          margin: 0;
          font-size: 20px;
          font-weight: 750;
          color: #172033;
        }

        .sd-top-header p {
          margin: 2px 0 0;
          color: #98a2b3;
          font-size: 10px;
        }

        .sd-header-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .sd-refresh-btn,
        .sd-school-list-btn {
          border-radius: 9px;
          height: 38px;
          padding: 0 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 10px;
          font-weight: 650;
          cursor: pointer;
          transition: .2s;
        }

        .sd-refresh-btn {
          background: #ffffff;
          color: #667085;
          border: 1px solid #e3e8f0;
        }

        .sd-refresh-btn:hover {
          color: #0d6efd;
          border-color: #bcd3ff;
          background: #f5f8ff;
        }

        .sd-school-list-btn {
          border: 0;
          background: #0d6efd;
          color: #ffffff;
          box-shadow: 0 5px 12px rgba(13,110,253,.16);
        }

        .sd-school-list-btn:hover {
          background: #0b5ed7;
          transform: translateY(-1px);
        }

        .sd-spin {
          animation: sdSpin 1s linear infinite;
        }

        @keyframes sdSpin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ================= SCHOOL HERO ================= */

        .sd-school-hero {
          position: relative;
          overflow: hidden;
          margin-bottom: 18px;
          border-radius: 17px;
          border: 1px solid #e2e8f2;
          background:
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f4f8ff 100%
            );
          box-shadow:
            0 7px 25px rgba(31,45,61,.055);
        }

        .sd-hero-pattern {
          position: absolute;
          right: -70px;
          top: -110px;
          width: 330px;
          height: 330px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(13,110,253,.09),
              rgba(13,110,253,0) 68%
            );
          pointer-events: none;
        }

        .sd-hero-content {
          position: relative;
          z-index: 1;
          min-height: 145px;
          padding: 22px;
          display: flex;
          align-items: center;
          gap: 17px;
        }

        .sd-school-logo {
          width: 82px;
          height: 82px;
          flex-shrink: 0;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background:
            linear-gradient(
              135deg,
              #eaf2ff,
              #f3f7ff
            );
          color: #0d6efd;
          border: 1px solid #dce8ff;
          box-shadow:
            0 7px 18px rgba(13,110,253,.09);
          font-size: 34px;
        }

        .sd-school-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sd-school-main {
          flex: 1;
          min-width: 0;
        }

        .sd-school-title-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .sd-school-title-row h2 {
          margin: 0;
          color: #172033;
          font-size: 22px;
          line-height: 1.25;
          font-weight: 750;
        }

        .school-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 8px;
          font-weight: 750;
          letter-spacing: .4px;
        }

        .school-status i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }

        .school-status.success {
          color: #198754;
          background: #eaf8ef;
        }

        .school-status.success i {
          background: #20c997;
        }

        .school-status.danger {
          color: #dc3545;
          background: #fff0f1;
        }

        .school-status.danger i {
          background: #dc3545;
        }

        .school-status.warning {
          color: #b58105;
          background: #fff8e5;
        }

        .school-status.warning i {
          background: #f0ad00;
        }

        .sd-school-code {
          margin-top: 4px;
          color: #98a2b3;
          font-size: 10px;
        }

        .sd-school-code strong {
          color: #667085;
        }

        .sd-school-contact {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 12px;
        }

        .sd-school-contact span {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #667085;
          font-size: 10px;
        }

        .sd-school-contact svg {
          color: #0d6efd;
          font-size: 11px;
        }

        .sd-edit-school {
          border: 1px solid #dbe5f5;
          background: #ffffff;
          color: #536176;
          height: 36px;
          padding: 0 12px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          font-weight: 650;
          cursor: pointer;
          transition: .2s;
          flex-shrink: 0;
        }

        .sd-edit-school:hover {
          color: #0d6efd;
          background: #f4f8ff;
          border-color: #bcd3ff;
        }

        /* ================= CARDS ================= */

        .sd-card {
          background: #ffffff;
          border: 1px solid #e6eaf1;
          border-radius: 15px;
          overflow: hidden;
          box-shadow:
            0 5px 18px rgba(31,45,61,.042);
        }

        .sd-card-header {
          min-height: 65px;
          padding: 13px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          border-bottom: 1px solid #edf0f5;
        }

        .sd-card-heading {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sd-heading-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
        }

        .sd-heading-icon.blue {
          color: #0d6efd;
          background: #eaf2ff;
        }

        .sd-heading-icon.green {
          color: #198754;
          background: #eaf8ef;
        }

        .sd-heading-icon.purple {
          color: #7650d6;
          background: #f1ebff;
        }

        .sd-card-heading h6 {
          margin: 0;
          color: #263248;
          font-size: 12px;
          font-weight: 750;
        }

        .sd-card-heading span {
          display: block;
          margin-top: 2px;
          color: #a0a8b7;
          font-size: 9px;
        }

        /* ================= INFO ================= */

        .sd-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .sd-info-item {
          padding: 12px 16px;
          border-bottom: 1px solid #f0f2f6;
        }

        .sd-info-item:nth-child(odd) {
          border-right: 1px solid #f0f2f6;
        }

        .sd-info-label {
          display: block;
          margin-bottom: 4px;
          color: #9aa4b5;
          font-size: 9px;
        }

        .sd-info-value {
          display: block;
          color: #344054;
          font-size: 11px;
          font-weight: 650;
          word-break: break-word;
        }

        /* ================= SUMMARY ================= */

        .sd-summary-list {
          padding: 4px 16px;
        }

        .sd-summary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f0f2f6;
        }

        .sd-summary-row:last-child {
          border-bottom: 0;
        }

        .sd-summary-left {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #697487;
          font-size: 10px;
        }

        .sd-summary-left svg {
          color: #0d6efd;
        }

        .sd-summary-value {
          color: #263248;
          font-size: 14px;
          font-weight: 750;
        }

        /* ================= STATS ================= */

        .sd-stat-card {
          position: relative;
          min-height: 88px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 11px;
          background: #ffffff;
          border: 1px solid #e6eaf1;
          border-radius: 14px;
          box-shadow:
            0 5px 18px rgba(31,45,61,.042);
          transition: .22s ease;
          overflow: hidden;
        }

        .sd-stat-card:hover {
          transform: translateY(-2px);
          box-shadow:
            0 10px 25px rgba(31,45,61,.075);
        }

        .sd-stat-icon {
          width: 45px;
          height: 45px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .sd-stat-icon.blue {
          color: #0d6efd;
          background: #eaf2ff;
        }

        .sd-stat-icon.purple {
          color: #7650d6;
          background: #f1ebff;
        }

        .sd-stat-icon.green {
          color: #198754;
          background: #eaf8ef;
        }

        .sd-stat-icon.orange {
          color: #fd7e14;
          background: #fff1e5;
        }

        .sd-stat-icon.cyan {
          color: #0aa2c0;
          background: #e5f9fc;
        }

        .sd-stat-icon.red {
          color: #dc3545;
          background: #fff0f1;
        }

        .sd-stat-content {
          min-width: 0;
        }

        .sd-stat-title {
          display: block;
          color: #8b95a7;
          font-size: 9px;
          font-weight: 650;
        }

        .sd-stat-value {
          display: block;
          margin-top: 2px;
          color: #263248;
          font-size: 20px;
          line-height: 1.25;
          font-weight: 750;
        }

        .sd-stat-subtitle {
          display: block;
          margin-top: 2px;
          color: #a0a8b7;
          font-size: 8px;
        }

        .sd-stat-arrow {
          position: absolute;
          top: 10px;
          right: 11px;
          color: #c5ccd7;
          font-size: 13px;
        }

        /* ================= FINANCE ================= */

        .sd-percent-pill {
          padding: 5px 8px;
          border-radius: 20px;
          color: #198754;
          background: #eaf8ef;
          font-size: 8px;
          font-weight: 750;
        }

        .sd-percent-pill.blue-pill {
          color: #0d6efd;
          background: #eaf2ff;
        }

        .sd-finance-body {
          padding: 17px;
        }

        .sd-finance-total {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 14px;
        }

        .sd-finance-total span {
          display: block;
          color: #929bad;
          font-size: 9px;
        }

        .sd-finance-total strong {
          display: block;
          margin-top: 2px;
          color: #263248;
          font-size: 21px;
          font-weight: 750;
        }

        .sd-finance-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #198754;
          background: #eaf8ef;
        }

        .sd-progress {
          height: 8px;
          overflow: hidden;
          border-radius: 20px;
          background: #edf0f5;
        }

        .sd-progress-value {
          height: 100%;
          border-radius: 20px;
          background:
            linear-gradient(
              90deg,
              #198754,
              #20c997
            );
          transition: width .5s ease;
        }

        .sd-finance-breakdown {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 17px;
        }

        .sd-finance-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sd-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .sd-dot.green {
          background: #198754;
        }

        .sd-dot.red {
          background: #dc3545;
        }

        .sd-finance-item span {
          display: block;
          color: #929bad;
          font-size: 8px;
        }

        .sd-finance-item strong {
          display: block;
          color: #344054;
          margin-top: 2px;
          font-size: 11px;
        }

        /* ================= ATTENDANCE ================= */

        .sd-attendance-body {
          min-height: 165px;
          padding: 15px 18px;
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .sd-attendance-circle {
          --attendance: 0%;
          width: 125px;
          height: 125px;
          flex-shrink: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            conic-gradient(
              #0d6efd 0 var(--attendance),
              #edf0f5 var(--attendance) 100%
            );
        }

        .sd-attendance-circle > div {
          width: 94px;
          height: 94px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }

        .sd-attendance-circle strong {
          color: #263248;
          font-size: 19px;
          font-weight: 750;
        }

        .sd-attendance-circle span {
          margin-top: 2px;
          color: #9aa4b5;
          font-size: 8px;
        }

        .sd-attendance-stats {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sd-attendance-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sd-attendance-item-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }

        .sd-attendance-item-icon.present {
          color: #198754;
          background: #eaf8ef;
        }

        .sd-attendance-item-icon.absent {
          color: #dc3545;
          background: #fff0f1;
        }

        .sd-attendance-item-icon.leave {
          color: #f0ad00;
          background: #fff8e5;
        }

        .sd-attendance-item span {
          display: block;
          color: #8b95a7;
          font-size: 8px;
        }

        .sd-attendance-item strong {
          display: block;
          color: #344054;
          margin-top: 1px;
          font-size: 11px;
        }

        /* ================= CARD HEADER ================= */

        .sd-view-all {
          padding: 0;
          border: 0;
          background: transparent;
          color: #0d6efd;
          font-size: 9px;
          font-weight: 700;
          cursor: pointer;
        }

        .sd-view-all:hover {
          text-decoration: underline;
        }

        /* ================= TABLE ================= */

        .sd-table {
          margin: 0;
        }

        .sd-table th {
          padding: 10px 14px;
          color: #8c96a7;
          background: #f8f9fc;
          border-bottom: 1px solid #e9edf4;
          font-size: 8px;
          font-weight: 750;
          white-space: nowrap;
        }

        .sd-table td {
          padding: 10px 14px;
          color: #596579;
          border-bottom: 1px solid #f0f2f6;
          font-size: 9px;
          white-space: nowrap;
        }

        .sd-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .sd-table-user {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sd-avatar {
          width: 31px;
          height: 31px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 12px;
        }

        .sd-avatar.blue {
          color: #0d6efd;
          background: #eaf2ff;
        }

        .sd-avatar.purple {
          color: #7650d6;
          background: #f1ebff;
        }

        .sd-table-user strong {
          display: block;
          color: #344054;
          font-size: 9px;
          font-weight: 700;
        }

        .sd-table-user small {
          display: block;
          margin-top: 2px;
          color: #9ba4b3;
          font-size: 8px;
        }

        .sd-admission-no {
          color: #667085;
          font-weight: 650;
        }

        .sd-table .school-status {
          font-size: 7px;
          padding: 4px 7px;
        }

        /* ================= PAYMENTS ================= */

        .sd-payment-list {
          padding: 3px 16px;
        }

        .sd-payment-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 11px 0;
          border-bottom: 1px solid #f0f2f6;
        }

        .sd-payment-item:last-child {
          border-bottom: 0;
        }

        .sd-payment-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #198754;
          background: #eaf8ef;
          flex-shrink: 0;
          font-size: 12px;
        }

        .sd-payment-info {
          flex: 1;
          min-width: 0;
        }

        .sd-payment-info strong {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #344054;
          font-size: 9px;
        }

        .sd-payment-info span {
          display: block;
          margin-top: 2px;
          color: #9ba4b3;
          font-size: 8px;
        }

        .sd-payment-amount {
          text-align: right;
        }

        .sd-payment-amount strong {
          display: block;
          color: #263248;
          font-size: 10px;
        }

        .sd-payment-amount .school-status {
          margin-top: 2px;
          padding: 0;
          background: transparent;
          font-size: 7px;
        }

        /* ================= ASSESSMENTS ================= */

        .sd-assessment-list {
          padding: 3px 16px;
        }

        .sd-assessment-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 0;
          border-bottom: 1px solid #f0f2f6;
        }

        .sd-assessment-item:last-child {
          border-bottom: 0;
        }

        .sd-assessment-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7650d6;
          background: #f1ebff;
          font-size: 15px;
          flex-shrink: 0;
        }

        .sd-assessment-info {
          flex: 1;
          min-width: 0;
        }

        .sd-assessment-info strong {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #344054;
          font-size: 9px;
        }

        .sd-assessment-info span {
          display: block;
          margin-top: 2px;
          color: #9aa4b5;
          font-size: 8px;
        }

        .sd-assessment-date {
          color: #8e98aa;
          font-size: 8px;
          white-space: nowrap;
        }

        /* ================= EMPTY ================= */

        .sd-empty {
          min-height: 150px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #a0a8b7;
          font-size: 9px;
        }

        .sd-empty svg {
          font-size: 24px;
          opacity: .35;
        }

        /* ================= QUICK ACTION ================= */

        .sd-quick-card {
          padding: 15px 17px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border: 1px solid #e3e9f3;
          border-radius: 15px;
          background:
            linear-gradient(
              135deg,
              #ffffff,
              #f5f8ff
            );
          box-shadow:
            0 5px 18px rgba(31,45,61,.04);
        }

        .sd-quick-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sd-quick-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0d6efd;
          background: #eaf2ff;
        }

        .sd-quick-title h6 {
          margin: 0;
          color: #263248;
          font-size: 11px;
          font-weight: 750;
        }

        .sd-quick-title span {
          display: block;
          margin-top: 2px;
          color: #9aa4b5;
          font-size: 8px;
        }

        .sd-quick-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 7px;
        }

        .sd-quick-actions button {
          height: 34px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #e1e7f0;
          border-radius: 8px;
          background: #ffffff;
          color: #596579;
          font-size: 9px;
          font-weight: 650;
          cursor: pointer;
          transition: .2s;
        }

        .sd-quick-actions button:hover {
          color: #0d6efd;
          border-color: #bdd4ff;
          background: #f5f8ff;
        }

        /* ================= LOADING ================= */

        .sd-loading {
          min-height: 75vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sd-loading-card {
          min-width: 270px;
          padding: 30px;
          border: 1px solid #e5e9f1;
          border-radius: 15px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          box-shadow:
            0 10px 30px rgba(31,45,61,.06);
        }

        .sd-loading-card strong {
          margin-top: 8px;
          color: #344054;
          font-size: 12px;
        }

        .sd-loading-card span {
          color: #98a2b3;
          font-size: 9px;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 992px) {

          .sd-top-header {
            align-items: flex-start;
          }

          .sd-header-actions {
            flex-wrap: wrap;
          }

          .sd-school-hero {
            overflow: visible;
          }

          .sd-hero-content {
            align-items: flex-start;
          }

          .sd-edit-school {
            margin-left: auto;
          }

          .sd-attendance-body {
            justify-content: center;
          }

        }

        @media (max-width: 768px) {

          .school-details-page {
            padding: 12px;
          }

          .sd-top-header {
            flex-direction: column;
            align-items: stretch;
          }

          .sd-header-actions {
            width: 100%;
          }

          .sd-refresh-btn,
          .sd-school-list-btn {
            flex: 1;
          }

          .sd-hero-content {
            flex-wrap: wrap;
          }

          .sd-school-main {
            width: calc(100% - 100px);
          }

          .sd-edit-school {
            width: 100%;
            justify-content: center;
            margin-left: 0;
          }

          .sd-info-grid {
            grid-template-columns: 1fr;
          }

          .sd-info-item:nth-child(odd) {
            border-right: 0;
          }

          .sd-attendance-body {
            flex-direction: column;
            gap: 20px;
          }

          .sd-attendance-stats {
            width: 100%;
            flex-direction: row;
            justify-content: space-around;
          }

          .sd-quick-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .sd-quick-actions {
            width: 100%;
            justify-content: flex-start;
          }

        }

        @media (max-width: 480px) {

          .sd-top-header h4 {
            font-size: 17px;
          }

          .sd-top-header p {
            display: none;
          }

          .sd-breadcrumb {
            font-size: 8px;
          }

          .sd-school-logo {
            width: 62px;
            height: 62px;
            border-radius: 14px;
            font-size: 26px;
          }

          .sd-school-main {
            width: calc(100% - 79px);
          }

          .sd-school-title-row h2 {
            font-size: 16px;
          }

          .sd-school-contact {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .sd-finance-breakdown {
            flex-direction: column;
            gap: 12px;
          }

          .sd-attendance-stats {
            flex-direction: column;
            align-items: center;
          }

          .sd-quick-actions button {
            flex: 1;
            justify-content: center;
          }

        }

      `}</style>
    </div>
  );
};

// =========================================================
// INFO ITEM
// =========================================================

const InfoItem = ({ label, value }) => {
  return (
    <div className="sd-info-item">
      <span className="sd-info-label">
        {label}
      </span>

      <span className="sd-info-value">
        {value || "-"}
      </span>
    </div>
  );
};

// =========================================================
// SUMMARY ROW
// =========================================================

const SummaryRow = ({
  label,
  value,
  icon,
}) => {
  return (
    <div className="sd-summary-row">

      <div className="sd-summary-left">
        {icon}
        <span>{label}</span>
      </div>

      <strong className="sd-summary-value">
        {value}
      </strong>

    </div>
  );
};

// =========================================================
// ATTENDANCE ITEM
// =========================================================

const AttendanceItem = ({
  icon,
  label,
  value,
  type,
}) => {
  return (
    <div className="sd-attendance-item">

      <div
        className={`sd-attendance-item-icon ${type}`}
      >
        {icon}
      </div>

      <div>
        <span>{label}</span>

        <strong>
          {Number(value || 0).toLocaleString(
            "en-IN"
          )}
        </strong>
      </div>

    </div>
  );
};

// =========================================================
// CARD HEADER
// =========================================================

const CardHeader = ({
  icon,
  iconType = "blue",
  title,
  subtitle,
  buttonText,
  onClick,
}) => {
  return (
    <div className="sd-card-header">

      <div className="sd-card-heading">

        <div
          className={`sd-heading-icon ${iconType}`}
        >
          {icon}
        </div>

        <div>
          <h6>{title}</h6>

          <span>{subtitle}</span>
        </div>

      </div>

      {buttonText && (
        <button
          className="sd-view-all"
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}

    </div>
  );
};

// =========================================================
// EMPTY ROW
// =========================================================

const EmptyRow = ({ message }) => {
  return (
    <tr>
      <td
        colSpan="10"
        style={{
          textAlign: "center",
          padding: "35px 10px",
          color: "#9aa4b5",
          fontSize: "10px",
        }}
      >
        {message}
      </td>
    </tr>
  );
};

export default SchoolDetails;

