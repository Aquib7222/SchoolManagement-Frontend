
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  FaSchool,
  FaUserPlus,
  FaUserShield,
  FaPlusCircle,
} from "react-icons/fa";

import { MdOutlineUpdate, MdAssessment } from "react-icons/md";

import axios from "axios";

const RecentSchoolActivitySummary = () => {
  const [schools, setSchools] = useState([]);

  const [audits, setAudits] = useState({
    content: [],
    totalElements: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);

  // =====================================================
  // FETCH SCHOOLS + AUDIT LOGS
  // =====================================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setLoadingActivities(true);

        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("AdminToken");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [schoolResponse, auditResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/school/all", {
            headers,
          }),

          axios.get(
            "http://localhost:8080/api/audit-logs?page=0&size=20&sort=createdAt,desc",
            {
              headers,
            }
          ),
        ]);

        // =================================================
        // SCHOOLS
        // =================================================

        const schoolData = Array.isArray(schoolResponse.data)
          ? schoolResponse.data
          : schoolResponse.data?.data ||
            schoolResponse.data?.content ||
            [];

        setSchools(schoolData);

        // =================================================
        // AUDIT LOGS
        // =================================================

        const auditData = auditResponse.data || {};

        setAudits({
          content: auditData.content || [],
          totalElements: auditData.totalElements || 0,
        });

        setRecentActivities(
          (auditData.content || []).slice(0, 4)
        );
      } catch (error) {
        console.error(
          "Dashboard data fetch failed:",
          error
        );

        setSchools([]);

        setAudits({
          content: [],
          totalElements: 0,
        });

        setRecentActivities([]);
      } finally {
        setLoading(false);
        setLoadingActivities(false);
      }
    };

    fetchDashboardData();
  }, []);

  // =====================================================
  // GET SCHOOL NAME
  // =====================================================

  const getSchoolName = (schoolId) => {
    if (!schoolId || !schools?.length) {
      return "-";
    }

    const school = schools.find(
      (school) =>
        Number(school.id) === Number(schoolId)
    );

    return (
      school?.schoolName ||
      school?.name ||
      school?.organizationName ||
      "-"
    );
  };

  // =====================================================
  // ACTIVITY ICON
  // =====================================================

  const getActivityIcon = (module) => {
    const moduleName = module?.toUpperCase();

    if (moduleName === "SCHOOL") {
      return <FaSchool />;
    }

    if (
      moduleName === "USER" ||
      moduleName === "USER_MAPPING"
    ) {
      return <FaUserPlus />;
    }

    if (
      moduleName === "SUPERADMIN" ||
      moduleName === "SUPER_ADMIN"
    ) {
      return <FaUserShield />;
    }

    if (
      moduleName === "MODULE" ||
      moduleName === "MENU"
    ) {
      return <MdOutlineUpdate />;
    }

    return <FaPlusCircle />;
  };

  // =====================================================
  // ACTIVITY THEME
  // =====================================================

  const getActivityTheme = (module) => {
    const moduleName = module?.toUpperCase();

    if (moduleName === "SCHOOL") {
      return "activity-blue";
    }

    if (moduleName === "USER") {
      return "activity-green";
    }

    if (
      moduleName === "SUPERADMIN" ||
      moduleName === "SUPER_ADMIN"
    ) {
      return "activity-orange";
    }

    if (
      moduleName === "MODULE" ||
      moduleName === "MENU"
    ) {
      return "activity-purple";
    }

    return "activity-gray";
  };

  // =====================================================
  // TIME AGO
  // =====================================================

  const getTimeAgo = (date) => {
    if (!date) {
      return "";
    }

    const createdDate = new Date(date);
    const now = new Date();

    const difference = Math.floor(
      (now - createdDate) / 1000
    );

    if (difference < 60) {
      return "Just now";
    }

    const minutes = Math.floor(
      difference / 60
    );

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(
      minutes / 60
    );

    if (hours < 24) {
      return `${hours} hour${
        hours > 1 ? "s" : ""
      } ago`;
    }

    const days = Math.floor(
      hours / 24
    );

    return `${days} day${
      days > 1 ? "s" : ""
    } ago`;
  };

  // =====================================================
  // RECENT SCHOOL LOGS
  // =====================================================

  const recentSchoolLogs = (
    audits?.content || []
  )
    .filter(
      (audit) =>
        audit.targetType?.toUpperCase() ===
          "SCHOOL" &&
        audit.action?.toUpperCase() ===
          "CREATE"
    )
    .slice(0, 4);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <div className="container-fluid px-2 mt-3">
        <div className="row g-3">

          {/* =================================================
              RECENT SCHOOL
          ================================================= */}

          <div className="col-12 col-lg-5">
            <div className="dashboard-card shadow h-100">

              {/* HEADER */}

              <div className="dashboard-card-header">
                <div>
                  <span className="dashboard-section-label">
                    SCHOOL MANAGEMENT
                  </span>

                  <h6 className="dashboard-title">
                    Recent Schools
                  </h6>
                </div>

                <button className="premium-outline-btn">
                  View All
                </button>
              </div>

              {/* BODY */}

              <div className="dashboard-card-body">

                {loading ? (
                  <div className="empty-dashboard-state">
                    <div className="dashboard-loader"></div>

                    <span>
                      Loading schools...
                    </span>
                  </div>
                ) : recentSchoolLogs.length === 0 ? (
                  <div className="empty-dashboard-state">
                    <div className="empty-icon">
                      <FaSchool />
                    </div>

                    <span>
                      No recent school activity
                    </span>
                  </div>
                ) : (
                  <div className="table-responsive">

                    <table className="table premium-table align-middle mb-0">

                      <thead>
                        <tr>
                          <th>School Name</th>
                          <th>Created On</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {recentSchoolLogs.map(
                          (audit, idx) => (
                            <tr
                              key={
                                audit.id || idx
                              }
                            >

                              {/* SCHOOL */}

                              <td>
                                <div className="d-flex align-items-center gap-2">

                                  <div className="school-icon-box">
                                    <FaSchool />
                                  </div>

                                  <div>
                                    <div className="school-name">
                                      {getSchoolName(
                                        audit.targetId
                                      )}
                                    </div>

                                    <small className="school-id">
                                      ID:{" "}
                                      {
                                        audit.targetId
                                      }
                                    </small>
                                  </div>

                                </div>
                              </td>

                              {/* DATE */}

                              <td>
                                <span className="date-text">
                                  {audit.createdAt
                                    ? new Date(
                                        audit.createdAt
                                      ).toLocaleDateString(
                                        "en-IN",
                                        {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        }
                                      )
                                    : "-"}
                                </span>
                              </td>

                              {/* STATUS */}

                              <td>
                                <span
                                  className={`status-pill ${
                                    audit.status ===
                                    "SUCCESS"
                                      ? "status-success"
                                      : "status-danger"
                                  }`}
                                >
                                  <span className="status-dot"></span>

                                  {audit.status}
                                </span>
                              </td>

                              {/* MENU */}

                              <td>
                                <button className="more-btn">
                                  <BsThreeDotsVertical />
                                </button>
                              </td>

                            </tr>
                          )
                        )}
                      </tbody>

                    </table>

                  </div>
                )}
              </div>

            </div>
          </div>


          {/* =================================================
              RECENT ACTIVITIES
          ================================================= */}

          <div className="col-12 col-md-6 col-lg-4">

            <div className="dashboard-card shadow h-100">

              {/* HEADER */}

              <div className="dashboard-card-header">

                <div>
                  <span className="dashboard-section-label">
                    SYSTEM LOG
                  </span>

                  <h6 className="dashboard-title">
                    Recent Activities
                  </h6>
                </div>

                <button className="premium-outline-btn">
                  View All
                </button>

              </div>


              {/* BODY */}

              <div className="dashboard-card-body">

                {loadingActivities && (
                  <div className="empty-dashboard-state">

                    <div className="dashboard-loader"></div>

                    <span>
                      Loading activities...
                    </span>

                  </div>
                )}

                {!loadingActivities &&
                  recentActivities.length === 0 && (
                    <div className="empty-dashboard-state">

                      <div className="empty-icon">
                        <MdOutlineUpdate />
                      </div>

                      <span>
                        No recent activities
                      </span>

                    </div>
                  )}

                {!loadingActivities &&
                  recentActivities.length > 0 && (

                    <div className="activity-list">

                      {recentActivities.map(
                        (activity, index) => (

                          <div
                            key={activity.id}
                            className="activity-item"
                          >

                            {/* TIMELINE */}

                            <div className="activity-timeline">

                              <div
                                className={`activity-icon ${getActivityTheme(
                                  activity.module
                                )}`}
                              >
                                {getActivityIcon(
                                  activity.module
                                )}
                              </div>

                              {index !==
                                recentActivities.length -
                                  1 && (
                                <div className="activity-line"></div>
                              )}

                            </div>


                            {/* CONTENT */}

                            <div className="activity-content">

                              <div className="activity-top">

                                <div className="activity-description">
                                  {activity.description ||
                                    `${activity.action} ${activity.module}`}
                                </div>

                                <small className="activity-time">
                                  {getTimeAgo(
                                    activity.createdAt
                                  )}
                                </small>

                              </div>

                              <div className="activity-school">
                                <FaSchool
                                  size={10}
                                  className="me-1"
                                />

                                {getSchoolName(
                                  activity.targetId
                                )}
                              </div>

                            </div>

                          </div>
                        )
                      )}

                    </div>
                  )}

              </div>

            </div>

          </div>


          {/* =================================================
              SYSTEM SUMMARY
          ================================================= */}

          <div className="col-12 col-md-6 col-lg-3">

            <div className="dashboard-card shadow h-100">

              {/* HEADER */}

              <div className="dashboard-card-header">

                <div>
                  <span className="dashboard-section-label">
                    OVERVIEW
                  </span>

                  <h6 className="dashboard-title">
                    System Summary
                  </h6>
                </div>

              </div>


              {/* BODY */}

              <div className="dashboard-card-body">

                {/* SYSTEM STATUS */}

                <div className="summary-item">

                  <div className="summary-left">

                    <div className="summary-icon summary-green">
                      <FaSchool />
                    </div>

                    <div>
                      <small>
                        System Status
                      </small>

                      <strong className="text-success">
                        Operational
                      </strong>
                    </div>

                  </div>

                  <span className="status-pill status-success">
                    <span className="status-dot"></span>
                    Active
                  </span>

                </div>


                {/* BACKUP */}

                <div className="summary-item">

                  <div className="summary-left">

                    <div className="summary-icon summary-blue">
                      <MdAssessment />
                    </div>

                    <div>
                      <small>
                        Last Backup
                      </small>

                      <strong>
                        Today
                      </strong>
                    </div>

                  </div>

                </div>


                {/* USERS */}

                <div className="summary-item">

                  <div className="summary-left">

                    <div className="summary-icon summary-purple">
                      <FaUserPlus />
                    </div>

                    <div>
                      <small>
                        Active Users
                      </small>

                      <strong>
                        24
                      </strong>
                    </div>

                  </div>

                </div>


                {/* TASKS */}

                <div className="summary-item border-0">

                  <div className="summary-left">

                    <div className="summary-icon summary-orange">
                      <FaPlusCircle />
                    </div>

                    <div>
                      <small>
                        Pending Tasks
                      </small>

                      <strong>
                        5
                      </strong>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>


      {/* =====================================================
          PREMIUM DASHBOARD CSS
      ===================================================== */}

      <style>
        {`
          /* ============================================
             MAIN CARD
          ============================================ */

          .dashboard-card {
            position: relative;
            overflow: hidden;
            background: #ffffff;
            border: 1px solid #edf0f5;
            border-radius: 15px;
            // box-shadow: 0 5px 18px rgba(0,0,0,.05);
            transition: all .25s ease;
          }

          .dashboard-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,.07);
          }


          /* ============================================
             HEADER
          ============================================ */

          .dashboard-card-header {
            min-height: 70px;
            padding: 15px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            border-bottom: 1px solid #edf0f5;
            background: #ffffff;
          }

          .dashboard-section-label {
            display: block;
            margin-bottom: 3px;
            color: #0d6efd;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: .8px;
          }

          .dashboard-title {
            margin: 0;
            color: #212529;
            font-size: 15px;
            font-weight: 700;
          }


          /* ============================================
             BODY
          ============================================ */

          .dashboard-card-body {
            padding: 15px 18px;
          }


          /* ============================================
             VIEW ALL BUTTON
          ============================================ */

          .premium-outline-btn {
            border: 1px solid #dbe5f2;
            background: #ffffff;
            color: #0d6efd;
            border-radius: 8px;
            padding: 5px 10px;
            font-size: 11px;
            font-weight: 600;
            transition: all .2s ease;
            white-space: nowrap;
          }

          .premium-outline-btn:hover {
            background: #eaf2ff;
            border-color: #bcd3f7;
          }


          /* ============================================
             TABLE
          ============================================ */

          .premium-table {
            min-width: 620px;
          }

          .premium-table thead th {
            background: #f4f8ff;
            color: #667085;
            border-bottom: 1px solid #e3eaf3;
            padding: 10px 9px;
            font-size: 10px;
            font-weight: 700;
            white-space: nowrap;
          }

          .premium-table tbody td {
            padding: 11px 9px;
            border-bottom: 1px solid #f0f2f5;
            color: #343a40;
            font-size: 11px;
          }

          .premium-table tbody tr:last-child td {
            border-bottom: none;
          }

          .premium-table tbody tr {
            transition: background .2s ease;
          }

          .premium-table tbody tr:hover {
            background: #fafcff;
          }


          /* ============================================
             SCHOOL ICON
          ============================================ */

          .school-icon-box {
            width: 36px;
            height: 36px;
            min-width: 36px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #eaf2ff;
            color: #0d6efd;
            font-size: 15px;
          }

          .school-name {
            color: #212529;
            font-size: 11px;
            font-weight: 700;
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .school-id {
            color: #9aa1aa;
            font-size: 9px;
          }

          .date-text {
            color: #667085;
            font-size: 10px;
            white-space: nowrap;
          }


          /* ============================================
             STATUS
          ============================================ */

          .status-pill {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 4px 8px;
            border-radius: 20px;
            font-size: 9px;
            font-weight: 700;
            white-space: nowrap;
          }

          .status-success {
            background: #eaf8f0;
            color: #198754;
          }

          .status-danger {
            background: #ffeded;
            color: #dc3545;
          }

          .status-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: currentColor;
          }


          /* ============================================
             MORE BUTTON
          ============================================ */

          .more-btn {
            border: none;
            background: transparent;
            color: #98a2b3;
            width: 30px;
            height: 30px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .2s ease;
          }

          .more-btn:hover {
            background: #f2f4f7;
            color: #344054;
          }


          /* ============================================
             ACTIVITY
          ============================================ */

          .activity-list {
            display: flex;
            flex-direction: column;
          }

          .activity-item {
            display: flex;
            gap: 11px;
            min-height: 62px;
          }

          .activity-timeline {
            position: relative;
            display: flex;
            justify-content: center;
            width: 35px;
            min-width: 35px;
          }

          .activity-icon {
            position: relative;
            z-index: 2;
            width: 34px;
            height: 34px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
          }

          .activity-blue {
            background: #eaf2ff;
            color: #0d6efd;
          }

          .activity-green {
            background: #eaf8f0;
            color: #198754;
          }

          .activity-orange {
            background: #fff8df;
            color: #d99a00;
          }

          .activity-purple {
            background: #f1eaff;
            color: #7950f2;
          }

          .activity-gray {
            background: #f2f4f7;
            color: #667085;
          }

          .activity-line {
            position: absolute;
            top: 34px;
            bottom: -12px;
            width: 1px;
            background: #e7ebf0;
          }

          .activity-content {
            flex-grow: 1;
            min-width: 0;
            padding-top: 1px;
            padding-bottom: 10px;
          }

          .activity-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 8px;
          }

          .activity-description {
            color: #344054;
            font-size: 11px;
            font-weight: 600;
            line-height: 1.4;
          }

          .activity-time {
            color: #98a2b3;
            font-size: 9px;
            white-space: nowrap;
          }

          .activity-school {
            margin-top: 4px;
            color: #98a2b3;
            font-size: 9px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }


          /* ============================================
             SYSTEM SUMMARY
          ============================================ */

          .summary-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            padding: 12px 0;
            border-bottom: 1px solid #edf0f5;
          }

          .summary-left {
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 0;
          }

          .summary-left > div:last-child {
            display: flex;
            flex-direction: column;
            min-width: 0;
          }

          .summary-left small {
            color: #98a2b3;
            font-size: 9px;
            margin-bottom: 2px;
          }

          .summary-left strong {
            color: #344054;
            font-size: 11px;
            font-weight: 700;
          }

          .summary-icon {
            width: 35px;
            height: 35px;
            min-width: 35px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
          }

          .summary-green {
            background: #eaf8f0;
            color: #198754;
          }

          .summary-blue {
            background: #eaf2ff;
            color: #0d6efd;
          }

          .summary-purple {
            background: #f1eaff;
            color: #7950f2;
          }

          .summary-orange {
            background: #fff8df;
            color: #d99a00;
          }


          /* ============================================
             EMPTY STATE
          ============================================ */

          .empty-dashboard-state {
            min-height: 180px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            color: #98a2b3;
            font-size: 11px;
          }

          .empty-icon {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f4f8ff;
            color: #0d6efd;
            font-size: 17px;
          }

          .dashboard-loader {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            border: 3px solid #e8eef7;
            border-top-color: #0d6efd;
            animation: dashboardSpin .8s linear infinite;
          }

          @keyframes dashboardSpin {
            to {
              transform: rotate(360deg);
            }
          }


          /* ============================================
             TABLET
          ============================================ */

          @media (max-width: 992px) {

            .dashboard-card-header {
              padding: 14px 16px;
            }

            .dashboard-card-body {
              padding: 14px 16px;
            }

            .premium-table {
              min-width: 580px;
            }

          }


          /* ============================================
             MOBILE
          ============================================ */

          @media (max-width: 576px) {

            .dashboard-card {
              border-radius: 13px;
            }

            .dashboard-card-header {
              min-height: 64px;
              padding: 13px 14px;
            }

            .dashboard-card-body {
              padding: 13px 14px;
            }

            .dashboard-section-label {
              font-size: 8px;
            }

            .dashboard-title {
              font-size: 14px;
            }

            .premium-outline-btn {
              padding: 5px 8px;
              font-size: 10px;
            }

            .activity-item {
              min-height: 58px;
            }

            .activity-icon {
              width: 32px;
              height: 32px;
            }

            .activity-timeline {
              width: 32px;
              min-width: 32px;
            }

            .activity-description {
              font-size: 10px;
            }

            .activity-time {
              font-size: 8px;
            }

            .summary-item {
              padding: 10px 0;
            }

          }
        `}
      </style>
    </>
  );
};

export default RecentSchoolActivitySummary;

