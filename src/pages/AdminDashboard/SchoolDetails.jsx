import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";

import {
  FaSchool,
  FaUserGraduate,
  FaUserTie,
  FaUserPlus,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaClipboardCheck,
  FaCalendarCheck,
  FaArrowLeft,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
} from "react-icons/fa";

import {
  MdOutlineDashboard,
  MdAssessment,
  MdPayments,
  MdPeople,
} from "react-icons/md";

import { LuSchool, LuUsers, LuReceipt } from "react-icons/lu";

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

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAdmissions: 0,
    totalTeachers: 0,
    totalStaff: 0,

    totalFee: 0,
    paidFee: 0,
    unpaidFee: 0,

    attendance: 0,
    totalAssessments: 0,
  });

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =========================================================
  // LOAD ALL SCHOOL DATA
  // =========================================================

  useEffect(() => {
    if (schoolId) {
      loadSchoolDetails();
    }
  }, [schoolId]);

  const loadSchoolDetails = async () => {
    setLoading(true);

    try {
      const results = await Promise.allSettled([
        // School
        axios.get(`api/school/${schoolId}`, config),

        // Students
        axios.get(`/api/students/school?schoolId=${schoolId}`, config),

        // Admissions
        axios.get(`/api/admissions/school?schoolId=${schoolId}`, config),

        
        // Fees
axios.get(`/api/student-fee/school/${schoolId}`, config),

        // Assessments
        axios.get(
          `/assessment/exams?schoolId=${schoolId}`,
          config,
        ),

        // Teachers
        axios.get(`/api/teachers/school?schoolId=${schoolId}`, config),

        // Staff
        axios.get(`/staff/school?schoolId=${schoolId}`, config),
      ]);

      // =====================================================
      // SCHOOL
      // =====================================================

      if (results[0].status === "fulfilled") {
        setSchool(results[0].value.data);
      }

      console.log("schools data",school);
      // =====================================================
      // STUDENTS
      // =====================================================

      let studentData = [];

      if (results[1].status === "fulfilled") {
        const data = results[1].value.data;

        studentData = Array.isArray(data)
          ? data
          : data?.content || data?.students || [];

        setStudents(studentData);
      }

      // =====================================================
      // ADMISSIONS
      // =====================================================

      let admissionData = [];

      if (results[2].status === "fulfilled") {
        const data = results[2].value.data;

        admissionData = Array.isArray(data)
          ? data
          : data?.content || data?.admissions || [];

        setAdmissions(admissionData);
      }
      console.log("admission data",admissionData);

      // =====================================================
      // FEES
      // =====================================================

      let feeData = [];

      if (results[3].status === "fulfilled") {
        const data = results[3].value.data;
        console.log("data",data);
        feeData = Array.isArray(data)
          ? data
          : data?.content || data?.fees || [];

        setFees(feeData);
      }

      console.log("fee data",fees);

      // =====================================================
      // ASSESSMENTS
      // =====================================================

      let assessmentData = [];

      if (results[4].status === "fulfilled") {
        const data = results[4].value.data;

        assessmentData = Array.isArray(data)
          ? data
          : data?.content || data?.assessments || [];

        setAssessments(assessmentData);
      }

      // =====================================================
      // TEACHERS
      // =====================================================

      let teacherData = [];

      if (results[5].status === "fulfilled") {
        const data = results[5].value.data;

        teacherData = Array.isArray(data)
          ? data
          : data?.content || data?.teachers || [];

        setTeachers(teacherData);
      }

      // =====================================================
      // STAFF
      // =====================================================

      let staffData = [];

      if (results[6].status === "fulfilled") {
        const data = results[6].value.data;

        staffData = Array.isArray(data)
          ? data
          : data?.content || data?.staff || [];

        setStaff(staffData);
      }

      // =====================================================
      // FEE CALCULATION
      // =====================================================

      let totalFee = 0;
      let paidFee = 0;

      feeData.forEach((fee) => {
        const total =
          Number(
            fee.totalAmount ??
              fee.totalFee ??
              fee.amount ??
              fee.feeAmount ??
              0,
          ) || 0;

        const paid =
          Number(
            fee.paidAmount ??
              fee.paidFee ??
              fee.amountPaid ??
              0,
          ) || 0;

        totalFee += total;
        paidFee += paid;
      });

      const unpaidFee = Math.max(totalFee - paidFee, 0);

      // =====================================================
      // ATTENDANCE
      // =====================================================

      let attendance = 0;

      /*
       * Agar backend attendance summary deta hai to yahan
       * calculate kar sakte ho.
       */

      const attendanceResponse = await axios
        .get(
          `/student/attendance/summary?schoolId=${schoolId}`,
          config,
        )
        .catch(() => null);

      if (attendanceResponse?.data) {
        const data = attendanceResponse.data;

        if (typeof data === "number") {
          attendance = data;
        } else {
          attendance = Number(
            data.attendancePercentage ??
              data.percentage ??
              data.presentPercentage ??
              0,
          );
        }
      }

      // =====================================================
      // SET STATS
      // =====================================================

      setStats({
        totalStudents: studentData.length,
        totalAdmissions: admissionData.length,
        totalTeachers: teacherData.length,
        totalStaff: staffData.length,

        totalFee,
        paidFee,
        unpaidFee,

        attendance,
        totalAssessments: assessmentData.length,
      });
    } catch (error) {
      console.error("School details error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // HELPERS
  // =========================================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const getStudentName = (student) => {
    return (
      student.studentName ||
      student.name ||
      `${student.firstName || ""} ${
        student.lastName || ""
      }`.trim() ||
      "-"
    );
  };

  const getAdmissionStudentName = (admission) => {
    return (
      admission.studentName ||
      admission.name ||
      `${admission.firstName || ""} ${
        admission.lastName || ""
      }`.trim() ||
      "-"
    );
  };

  const getFeeStudentName = (fee) => {
    return (
      fee.studentName ||
      fee.student?.studentName ||
      fee.student?.name ||
      "-"
    );
  };

  const getStatusClass = (status) => {
    const value = String(status || "").toLowerCase();

    if (
      value === "active" ||
      value === "paid" ||
      value === "success" ||
      value === "completed"
    ) {
      return "bg-success-subtle text-success";
    }

    if (
      value === "inactive" ||
      value === "unpaid" ||
      value === "pending"
    ) {
      return "bg-danger-subtle text-danger";
    }

    return "bg-warning-subtle text-warning";
  };

  // =========================================================
  // STAT CARD
  // =========================================================

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    iconClass,
  }) => {
    return (
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="school-stat-card h-100">
          <div className={`school-stat-icon ${iconClass}`}>
            {icon}
          </div>

          <div className="school-stat-content">
            <div className="school-stat-title">
              {title}
            </div>

            <div className="school-stat-value">
              {value}
            </div>

            {subtitle && (
              <div className="school-stat-subtitle">
                {subtitle}
              </div>
            )}
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
        <div className="school-loading">
          <div
            className="spinner-border text-primary"
            role="status"
          />

          <div className="mt-3 text-muted">
            Loading school details...
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
          HEADER
      ===================================================== */}

      <div className="school-page-header">
        <div className="d-flex align-items-center gap-3">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>

          <div>
            <div className="page-breadcrumb">
              <MdOutlineDashboard />
              Dashboard
              <span>/</span>
              Schools
              <span>/</span>
              Details
            </div>

            <h4 className="mb-0 fw-bold">
              School Overview
            </h4>
          </div>
        </div>

        <button
          className="btn btn-primary px-3"
          onClick={() =>
            navigate(`/school-list`)
          }
        >
          <LuSchool className="me-2" />
          School List
        </button>
      </div>

      {/* =====================================================
          SCHOOL PROFILE
      ===================================================== */}

      <div className="school-profile-card">
        <div className="school-profile-left">
          <div className="school-logo-box">
            {school?.logo ? (
              <img
                src={school.logo}
                alt="School"
              />
            ) : (
              <FaSchool size={40} />
            )}
          </div>

          <div className="school-profile-info">
            <div className="school-profile-title">
              {school?.schoolName ||
                "School Name"}
            </div>

            <div className="school-code">
              School Code:{" "}
              <strong>
                {school?.schoolCode ||
                  school?.code ||
                  "-"}
              </strong>
            </div>

            <div className="school-profile-meta">
              <span>
                <FaMapMarkerAlt />
                {school?.city || "-"},{" "}
                {school?.state || "-"}
              </span>

              <span>
                <FaEnvelope />
                {school?.email || "-"}
              </span>

              <span>
                <FaPhone />
                {school?.phone ||
                  school?.phoneNumber ||
                  "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="school-profile-right">
          <div className="school-status-label">
            Status
          </div>

          <span
            className={`status-badge ${
              String(
                school?.status || "Active",
              ).toLowerCase() === "active"
                ? "status-active"
                : "status-inactive"
            }`}
          >
            <span></span>

            {school?.status || "Active"}
          </span>
        </div>
      </div>

      {/* =====================================================
          BASIC SCHOOL DETAILS
      ===================================================== */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-8">
          <div className="content-card h-100">
            <div className="content-card-header">
              <div>
                <h6>School Information</h6>
                <small>
                  Basic organization details
                </small>
              </div>

              <div className="header-icon">
                <FaSchool />
              </div>
            </div>

            <div className="school-info-grid">
              <InfoItem
                label="Organization Name"
                value={
                  school?.schoolName || "-"
                }
              />

              <InfoItem
                label="School Type"
                value={school?.schoolType || "-"}
              />

              <InfoItem
                label="School Category"
                value={
                  school?.schoolCategory || "-"
                }
              />

              <InfoItem
                label="Affiliation Board"
                value={
                  school?.affiliationBoard || "-"
                }
              />

              <InfoItem
                label="Established Year"
                value={
                  school?.establishedYear || "-"
                }
              />

              <InfoItem
                label="Pincode"
                value={school?.pincode || "-"}
              />

              <InfoItem
                label="Country"
                value={
                  school?.country || "India"
                }
              />

              <InfoItem
                label="Address"
                value={school?.address || "-"}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="content-card h-100">
            <div className="content-card-header">
              <div>
                <h6>Academic Summary</h6>
                <small>
                  Current school statistics
                </small>
              </div>

              <div className="header-icon">
                <FaGraduationCap />
              </div>
            </div>

            <div className="academic-summary">
              <SummaryRow
                label="Students"
                value={stats.totalStudents}
                icon={<FaUserGraduate />}
              />

              <SummaryRow
                label="Teachers"
                value={stats.totalTeachers}
                icon={<FaUserTie />}
              />

              <SummaryRow
                label="Staff"
                value={stats.totalStaff}
                icon={<MdPeople />}
              />

              <SummaryRow
                label="Assessments"
                value={stats.totalAssessments}
                icon={<MdAssessment />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN STAT CARDS
      ===================================================== */}

      <div className="row g-3 mb-3">
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString("en-IN")}
          subtitle="Currently enrolled"
          icon={<FaUserGraduate />}
          iconClass="blue"
        />

        <StatCard
          title="Admissions"
          value={stats.totalAdmissions.toLocaleString(
            "en-IN",
          )}
          subtitle="Total admissions"
          icon={<FaUserPlus />}
          iconClass="purple"
        />

        <StatCard
          title="Teachers"
          value={stats.totalTeachers.toLocaleString(
            "en-IN",
          )}
          subtitle="Teaching staff"
          icon={<FaUserTie />}
          iconClass="green"
        />

        <StatCard
          title="Staff"
          value={stats.totalStaff.toLocaleString(
            "en-IN",
          )}
          subtitle="Non-teaching staff"
          icon={<MdPeople />}
          iconClass="orange"
        />
      </div>

      {/* =====================================================
          FINANCE CARDS
      ===================================================== */}

      <div className="row g-3 mb-3">
        <StatCard
          title="Total Fee"
          value={formatCurrency(stats.totalFee)}
          subtitle="Total fee amount"
          icon={<FaMoneyBillWave />}
          iconClass="cyan"
        />

        <StatCard
          title="Fee Collected"
          value={formatCurrency(stats.paidFee)}
          subtitle="Successfully collected"
          icon={<FaMoneyCheckAlt />}
          iconClass="green"
        />

        <StatCard
          title="Fee Pending"
          value={formatCurrency(stats.unpaidFee)}
          subtitle="Outstanding amount"
          icon={<LuReceipt />}
          iconClass="red"
        />

        <StatCard
          title="Attendance"
          value={`${stats.attendance.toFixed(1)}%`}
          subtitle="Overall attendance"
          icon={<FaCalendarCheck />}
          iconClass="blue"
        />
      </div>

      {/* =====================================================
          FEE OVERVIEW
      ===================================================== */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-lg-6">
          <div className="content-card h-100">
            <div className="content-card-header">
              <div>
                <h6>Fee Collection Overview</h6>
                <small>
                  Paid vs pending fee
                </small>
              </div>

              <div className="header-icon green-icon">
                <MdPayments />
              </div>
            </div>

            <div className="fee-overview">
              <div className="fee-total">
                <span>Total Fee</span>
                <strong>
                  {formatCurrency(stats.totalFee)}
                </strong>
              </div>

              <div className="fee-progress">
                <div
                  className="fee-progress-bar"
                  style={{
                    width: `${
                      stats.totalFee > 0
                        ? Math.min(
                            (stats.paidFee /
                              stats.totalFee) *
                              100,
                            100,
                          )
                        : 0
                    }%`,
                  }}
                />
              </div>

              <div className="fee-breakdown">
                <div>
                  <span className="fee-dot paid"></span>

                  <div>
                    <small>Paid</small>

                    <strong>
                      {formatCurrency(
                        stats.paidFee,
                      )}
                    </strong>
                  </div>
                </div>

                <div>
                  <span className="fee-dot pending"></span>

                  <div>
                    <small>Pending</small>

                    <strong>
                      {formatCurrency(
                        stats.unpaidFee,
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
          <div className="content-card h-100">
            <div className="content-card-header">
              <div>
                <h6>Attendance Overview</h6>
                <small>
                  Overall student attendance
                </small>
              </div>

              <div className="header-icon blue-icon">
                <FaCalendarCheck />
              </div>
            </div>

            <div className="attendance-box">
              <div className="attendance-circle">
                <div>
                  <strong>
                    {stats.attendance.toFixed(1)}%
                  </strong>

                  <small>Attendance</small>
                </div>
              </div>

              <div className="attendance-details">
                <div>
                  <FaCheckCircle className="text-success" />
                  <span>Present</span>
                </div>

                <div>
                  <FaTimesCircle className="text-danger" />
                  <span>Absent</span>
                </div>

                <div>
                  <FaClock className="text-warning" />
                  <span>Leave / Late</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RECENT ADMISSIONS
      ===================================================== */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <div className="content-card">
            <div className="content-card-header">
              <div>
                <h6>Recent Admissions</h6>
                <small>
                  Latest students admitted
                </small>
              </div>

              <button
                className="view-all-btn"
                onClick={() =>
                  navigate(
                    `/admin/student-list?schoolId=${schoolId}`,
                  )
                }
              >
                View All
              </button>
            </div>

            <div className="table-responsive">
              <table className="table school-table align-middle">
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
                      .map((admission, index) => (
                        <tr
                          key={
                            admission.id ||
                            admission.admissionNumber ||
                            index
                          }
                        >
                          <td>
                            <div className="table-user">
                              <div className="table-avatar">
                                <FaUserGraduate />
                              </div>

                              <div>
                                <strong>
                                  {getAdmissionStudentName(
                                    admission,
                                  )}
                                </strong>

                                <small>
                                  {admission.gender ||
                                    "-"}
                                </small>
                              </div>
                            </div>
                          </td>

                          <td>
                            {admission.admissionNumber ||
                              "-"}
                          </td>

                          <td>
                            {admission.studentClass ||
                              admission.className ||
                              admission.class ||
                              "-"}
                          </td>

                          <td>
                            {admission.today
                              ? new Date(
                                  admission.today,
                                ).toLocaleDateString(
                                  "en-IN",
                                )
                              : "-"}
                          </td>

                          <td>
                            <span
                              className={`badge ${getStatusClass(
                                admission.status ||
                                  "Active",
                              )}`}
                            >
                              {admission.status ||
                                "Active"}
                            </span>
                          </td>
                        </tr>
                      ))
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

        {/* =================================================
            RECENT FEE PAYMENTS
        ================================================= */}

        <div className="col-12 col-xl-5">
          <div className="content-card">
            <div className="content-card-header">
              <div>
                <h6>Recent Fee Payments</h6>
                <small>
                  Latest fee transactions
                </small>
              </div>

              <button className="view-all-btn">
                View All
              </button>
            </div>

            <div className="fee-payment-list">
              {fees.length > 0 ? (
                fees.slice(0, 6).map((fee, index) => (
                  <div
                    className="fee-payment-item"
                    key={fee.id || index}
                  >
                    <div className="payment-icon">
                      <FaMoneyBillWave />
                    </div>

                    <div className="payment-info">
                      <strong>
                        {getFeeStudentName(fee)}
                      </strong>

                      <small>
                        {fee.paymentDate
                          ? new Date(
                              fee.paymentDate,
                            ).toLocaleDateString(
                              "en-IN",
                            )
                          : "Payment"}
                      </small>
                    </div>

                    <div className="payment-amount">
                      <strong>
                        {formatCurrency(
                          fee.paidAmount ??
                            fee.amountPaid ??
                            fee.amount,
                        )}
                      </strong>

                      <span>
                        {fee.status || "PAID"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  No fee payments found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          STUDENTS + ASSESSMENT
      ===================================================== */}

      <div className="row g-3">
        {/* STUDENTS */}

        <div className="col-12 col-xl-6">
          <div className="content-card">
            <div className="content-card-header">
              <div>
                <h6>Students Overview</h6>
                <small>
                  Recently registered students
                </small>
              </div>

              <button
                className="view-all-btn"
                onClick={() =>
                  navigate(
                    `/admin/student-list?schoolId=${schoolId}`,
                  )
                }
              >
                View All
              </button>
            </div>

            <div className="table-responsive">
              <table className="table school-table align-middle">
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
                      .map((student, index) => (
                        <tr
                          key={
                            student.id ||
                            student.admissionNumber ||
                            index
                          }
                        >
                          <td>
                            <div className="table-user">
                              <div className="table-avatar">
                                <FaUserGraduate />
                              </div>

                              <div>
                                <strong>
                                  {getStudentName(
                                    student,
                                  )}
                                </strong>

                                <small>
                                  {student.admissionNumber ||
                                    "-"}
                                </small>
                              </div>
                            </div>
                          </td>

                          <td>
                            {student.rollNumber ||
                              student.rollNo ||
                              "-"}
                          </td>

                          <td>
                            {student.studentClass ||
                              student.className ||
                              student.class ||
                              "-"}
                          </td>

                          <td>
                            <span className="badge bg-success-subtle text-success">
                              {student.status ||
                                "Active"}
                            </span>
                          </td>
                        </tr>
                      ))
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
          <div className="content-card">
            <div className="content-card-header">
              <div>
                <h6>Assessment & Exams</h6>
                <small>
                  Recent assessment activities
                </small>
              </div>

              <button className="view-all-btn">
                View All
              </button>
            </div>

            <div className="assessment-list">
              {assessments.length > 0 ? (
                assessments
                  .slice(0, 6)
                  .map((assessment, index) => (
                    <div
                      className="assessment-item"
                      key={
                        assessment.id || index
                      }
                    >
                      <div className="assessment-icon">
                        <MdAssessment />
                      </div>

                      <div className="assessment-info">
                        <strong>
                          {assessment.examTerm ||
                            assessment.examName ||
                            assessment.name ||
                            "Assessment"}
                        </strong>

                        <small>
                          {assessment.session ||
                            assessment.academicYear ||
                            "Academic Assessment"}
                        </small>
                      </div>

                      <div className="assessment-date">
                        {assessment.startDate
                          ? new Date(
                              assessment.startDate,
                            ).toLocaleDateString(
                              "en-IN",
                            )
                          : "-"}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="empty-state">
                  No assessment records found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <div className="quick-action-card mt-3">
        <div>
          <h6>Quick Actions</h6>

          <small>
            Manage this school's data quickly
          </small>
        </div>

        <div className="quick-actions">
          <button
            onClick={() =>
              navigate(
                `/admin/student-list?schoolId=${schoolId}`,
              )
            }
          >
            <FaUserGraduate />
            Students
          </button>

          <button>
            <FaUserPlus />
            Admissions
          </button>

          <button>
            <MdPayments />
            Fees
          </button>

          <button>
            <MdAssessment />
            Assessments
          </button>
        </div>
      </div>

      {/* =====================================================
          STYLES
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .school-details-page {
          min-height: 100vh;
          padding: 18px;
          background: #f6f8fc;
          font-family:
            "Segoe UI",
            Tahoma,
            Geneva,
            Verdana,
            sans-serif;
          color: #263248;
        }

        /* HEADER */

        .school-page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .back-button {
          width: 40px;
          height: 40px;
          border: 1px solid #e5e9f1;
          background: white;
          color: #5e6b82;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: .25s;
        }

        .back-button:hover {
          background: #0d6efd;
          color: white;
          transform: translateX(-2px);
        }

        .page-breadcrumb {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #9aa4b5;
          font-size: 11px;
          margin-bottom: 3px;
        }

        /* PROFILE */

        .school-profile-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 22px;
          margin-bottom: 18px;
          background:
            linear-gradient(
              135deg,
              #ffffff,
              #f8faff
            );
          border: 1px solid #e7ebf3;
          border-radius: 16px;
          box-shadow:
            0 6px 20px rgba(31,45,61,.06);
        }

        .school-profile-left {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }

        .school-logo-box {
          width: 72px;
          height: 72px;
          flex-shrink: 0;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eaf2ff;
          color: #0d6efd;
          overflow: hidden;
        }

        .school-logo-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .school-profile-title {
          font-size: 22px;
          font-weight: 750;
          color: #172033;
        }

        .school-code {
          margin-top: 3px;
          color: #8993a5;
          font-size: 12px;
        }

        .school-profile-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 10px;
          color: #727d90;
          font-size: 12px;
        }

        .school-profile-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .school-profile-meta svg {
          color: #0d6efd;
        }

        .school-profile-right {
          text-align: right;
        }

        .school-status-label {
          font-size: 10px;
          color: #9aa4b5;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 11px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 650;
        }

        .status-badge span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .status-active {
          color: #198754;
          background: #eaf8ef;
        }

        .status-active span {
          background: #20c997;
        }

        .status-inactive {
          color: #dc3545;
          background: #fff0f1;
        }

        .status-inactive span {
          background: #dc3545;
        }

        /* CONTENT CARD */

        .content-card {
          background: white;
          border: 1px solid #e8ecf3;
          border-radius: 15px;
          overflow: hidden;
          box-shadow:
            0 5px 18px rgba(31,45,61,.045);
        }

        .content-card-header {
          padding: 15px 17px;
          border-bottom: 1px solid #edf0f5;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .content-card-header h6 {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
          color: #263248;
        }

        .content-card-header small {
          color: #9aa4b5;
          font-size: 10px;
        }

        .header-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: #edf4ff;
          color: #0d6efd;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .green-icon {
          background: #eaf8ef;
          color: #198754;
        }

        .blue-icon {
          background: #edf4ff;
          color: #0d6efd;
        }

        /* INFO */

        .school-info-grid {
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
          gap: 0;
        }

        .info-item {
          padding: 13px 17px;
          border-bottom: 1px solid #f0f2f6;
        }

        .info-label {
          display: block;
          color: #9aa4b5;
          font-size: 10px;
          margin-bottom: 4px;
        }

        .info-value {
          color: #344054;
          font-size: 12px;
          font-weight: 600;
        }

        /* ACADEMIC */

        .academic-summary {
          padding: 6px 17px;
        }

        .summary-row {
          padding: 13px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f0f2f6;
        }

        .summary-row:last-child {
          border-bottom: 0;
        }

        .summary-left {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #687386;
          font-size: 12px;
        }

        .summary-left svg {
          color: #0d6efd;
        }

        .summary-value {
          font-size: 15px;
          font-weight: 700;
          color: #263248;
        }

        /* STAT */

        .school-stat-card {
          padding: 16px;
          background: white;
          border: 1px solid #e8ecf3;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow:
            0 5px 18px rgba(31,45,61,.045);
          transition: .25s;
        }

        .school-stat-card:hover {
          transform: translateY(-2px);
          box-shadow:
            0 10px 25px rgba(31,45,61,.08);
        }

        .school-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .school-stat-icon.blue {
          color: #0d6efd;
          background: #eaf2ff;
        }

        .school-stat-icon.purple {
          color: #7650d6;
          background: #f1ebff;
        }

        .school-stat-icon.green {
          color: #198754;
          background: #eaf8ef;
        }

        .school-stat-icon.orange {
          color: #fd7e14;
          background: #fff1e5;
        }

        .school-stat-icon.cyan {
          color: #0aa2c0;
          background: #e5f9fc;
        }

        .school-stat-icon.red {
          color: #dc3545;
          background: #fff0f1;
        }

        .school-stat-title {
          color: #8b95a7;
          font-size: 10px;
          font-weight: 600;
        }

        .school-stat-value {
          color: #263248;
          font-size: 21px;
          line-height: 1.3;
          font-weight: 750;
        }

        .school-stat-subtitle {
          color: #a0a8b7;
          font-size: 9px;
        }

        /* FEE */

        .fee-overview {
          padding: 18px;
        }

        .fee-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .fee-total span {
          color: #8d97a8;
          font-size: 11px;
        }

        .fee-total strong {
          font-size: 19px;
          color: #263248;
        }

        .fee-progress {
          height: 9px;
          background: #edf0f5;
          border-radius: 20px;
          overflow: hidden;
        }

        .fee-progress-bar {
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

        .fee-breakdown {
          display: flex;
          justify-content: space-between;
          margin-top: 17px;
        }

        .fee-breakdown > div {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .fee-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }

        .fee-dot.paid {
          background: #198754;
        }

        .fee-dot.pending {
          background: #dc3545;
        }

        .fee-breakdown small {
          display: block;
          color: #929bad;
          font-size: 9px;
        }

        .fee-breakdown strong {
          display: block;
          font-size: 12px;
          color: #344054;
        }

        /* ATTENDANCE */

        .attendance-box {
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .attendance-circle {
          width: 125px;
          height: 125px;
          flex-shrink: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            conic-gradient(
              #0d6efd
              ${Math.min(
                stats.attendance,
                100,
              )}%,
              #edf0f5 0
            );
        }

        .attendance-circle::before {
          content: "";
          position: absolute;
        }

        .attendance-circle > div {
          width: 93px;
          height: 93px;
          background: white;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .attendance-circle strong {
          font-size: 19px;
          color: #263248;
        }

        .attendance-circle small {
          color: #9aa4b5;
          font-size: 9px;
        }

        .attendance-details {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .attendance-details div {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #697487;
          font-size: 11px;
        }

        /* TABLE */

        .school-table {
          margin: 0;
        }

        .school-table th {
          background: #f8f9fc;
          color: #8c96a7;
          border-bottom: 1px solid #e9edf4;
          font-size: 10px;
          font-weight: 700;
          padding: 11px 15px;
          white-space: nowrap;
        }

        .school-table td {
          padding: 11px 15px;
          font-size: 11px;
          color: #596579;
          border-bottom: 1px solid #f0f2f6;
          white-space: nowrap;
        }

        .table-user {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .table-avatar {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: #edf4ff;
          color: #0d6efd;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .table-user strong {
          display: block;
          color: #344054;
          font-size: 11px;
        }

        .table-user small {
          display: block;
          color: #9ba4b3;
          font-size: 9px;
        }

        .school-table .badge {
          font-size: 9px;
          font-weight: 600;
          padding: 5px 8px;
        }

        .view-all-btn {
          border: 0;
          background: transparent;
          color: #0d6efd;
          font-size: 10px;
          font-weight: 650;
          cursor: pointer;
        }

        .view-all-btn:hover {
          text-decoration: underline;
        }

        /* PAYMENTS */

        .fee-payment-list {
          padding: 5px 17px;
        }

        .fee-payment-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 0;
          border-bottom: 1px solid #f0f2f6;
        }

        .fee-payment-item:last-child {
          border-bottom: 0;
        }

        .payment-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #198754;
          background: #eaf8ef;
        }

        .payment-info {
          flex: 1;
          min-width: 0;
        }

        .payment-info strong {
          display: block;
          font-size: 11px;
          color: #344054;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .payment-info small {
          color: #9ba4b3;
          font-size: 9px;
        }

        .payment-amount {
          text-align: right;
        }

        .payment-amount strong {
          display: block;
          color: #263248;
          font-size: 11px;
        }

        .payment-amount span {
          font-size: 8px;
          color: #198754;
        }

        /* ASSESSMENT */

        .assessment-list {
          padding: 5px 17px;
        }

        .assessment-item {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 12px 0;
          border-bottom: 1px solid #f0f2f6;
        }

        .assessment-item:last-child {
          border-bottom: 0;
        }

        .assessment-icon {
          width: 35px;
          height: 35px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7650d6;
          background: #f1ebff;
          font-size: 17px;
        }

        .assessment-info {
          flex: 1;
        }

        .assessment-info strong {
          display: block;
          font-size: 11px;
          color: #344054;
        }

        .assessment-info small {
          display: block;
          margin-top: 2px;
          font-size: 9px;
          color: #9aa4b5;
        }

        .assessment-date {
          font-size: 9px;
          color: #8e98aa;
        }

        /* QUICK ACTION */

        .quick-action-card {
          padding: 17px;
          border-radius: 15px;
          background:
            linear-gradient(
              135deg,
              #ffffff,
              #f5f8ff
            );
          border: 1px solid #e6ebf4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .quick-action-card h6 {
          margin: 0;
          font-size: 13px;
          font-weight: 700;
        }

        .quick-action-card small {
          color: #9aa4b5;
          font-size: 9px;
        }

        .quick-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .quick-actions button {
          border: 1px solid #e4e9f1;
          background: white;
          color: #596579;
          border-radius: 9px;
          padding: 8px 11px;
          font-size: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: .2s;
        }

        .quick-actions button:hover {
          color: #0d6efd;
          border-color: #bcd3ff;
          background: #f5f8ff;
        }

        /* EMPTY */

        .empty-state {
          text-align: center;
          color: #9aa4b5;
          padding: 30px 10px;
          font-size: 11px;
        }

        /* LOADING */

        .school-loading {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* RESPONSIVE */

        @media (max-width: 768px) {

          .school-details-page {
            padding: 12px;
          }

          .school-page-header {
            align-items: flex-start;
            gap: 10px;
          }

          .school-page-header .btn {
            font-size: 10px;
          }

          .school-profile-card {
            align-items: flex-start;
            flex-direction: column;
          }

          .school-profile-right {
            text-align: left;
          }

          .school-profile-title {
            font-size: 18px;
          }

          .school-profile-meta {
            flex-direction: column;
            gap: 6px;
          }

          .school-info-grid {
            grid-template-columns: 1fr;
          }

          .attendance-box {
            flex-direction: column;
            align-items: center;
          }

          .quick-action-card {
            align-items: flex-start;
            flex-direction: column;
          }

          .quick-actions {
            width: 100%;
          }

        }

        @media (max-width: 480px) {

          .school-profile-left {
            align-items: flex-start;
          }

          .school-logo-box {
            width: 55px;
            height: 55px;
          }

          .school-profile-title {
            font-size: 15px;
          }

          .school-stat-value {
            font-size: 18px;
          }

        }

      `}</style>
    </div>
  );
};

// =========================================================
// SMALL COMPONENTS
// =========================================================

const InfoItem = ({ label, value }) => {
  return (
    <div className="info-item">
      <span className="info-label">
        {label}
      </span>

      <span className="info-value">
        {value || "-"}
      </span>
    </div>
  );
};

const SummaryRow = ({
  label,
  value,
  icon,
}) => {
  return (
    <div className="summary-row">
      <div className="summary-left">
        {icon}
        <span>{label}</span>
      </div>

      <div className="summary-value">
        {value}
      </div>
    </div>
  );
};

const EmptyRow = ({ message }) => {
  return (
    <tr>
      <td
        colSpan="10"
        className="text-center py-4 text-muted"
      >
        {message}
      </td>
    </tr>
  );
};

export default SchoolDetails;