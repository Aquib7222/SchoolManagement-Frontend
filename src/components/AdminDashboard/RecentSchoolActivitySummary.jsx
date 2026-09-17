import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  FaSchool,
  FaUserPlus,
  FaUserShield,
  FaPlusCircle,
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import { MdOutlineUpdate, MdAssessment } from "react-icons/md";

import axiosInstance from "../../api/axiosInstance";

// import "./RecentSchoolActivitySummary.css";

const RecentSchoolActivitySummary = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [schools, setSchools] = useState([]);

  const [audits, setAudits] = useState({
    content: [],
    totalElements: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingActivities, setLoadingActivities] =
    useState(true);

  const [systemOperation, setSystemOperation] = useState({
    systemStatus: "ONLINE",
    totalOperations: 0,
    createOperations: 0,
    updateOperations: 0,
    deleteOperations: 0,
    failedOperations: 0,
    activeSchools: 0,
    activeUsers: 0,
    lastOperation: "No operation yet",
    lastOperationUser: "-",
    lastOperationSchool: "-",
    lastOperationTime: "-",
    databaseStatus: "CONNECTED",
  });

  // =========================================================
  // FETCH DASHBOARD DATA
  // =========================================================

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

        const [
          schoolResponse,
          auditResponse,
          systemOperationResponse,
        ] = await Promise.all([
          // ---------------------------------------------------
          // SCHOOLS
          // ---------------------------------------------------
          axiosInstance.get("/api/school/all", {
            headers,
          }),

          // ---------------------------------------------------
          // AUDIT LOGS
          // ---------------------------------------------------
          axiosInstance.get(
            "/api/audit-logs?page=0&size=20&sort=createdAt,desc",
            {
              headers,
            }
          ),

          // ---------------------------------------------------
          // SYSTEM OPERATION
          // ---------------------------------------------------
          axiosInstance.get(
            "/api/dashboard/system-operation",
            {
              headers,
            }
          ),
        ]);

        // =====================================================
        // SCHOOL DATA
        // =====================================================

        const schoolData = Array.isArray(
          schoolResponse?.data
        )
          ? schoolResponse.data
          : schoolResponse?.data?.data ||
            schoolResponse?.data?.content ||
            [];

        setSchools(schoolData);

        // =====================================================
        // AUDIT DATA
        // =====================================================

        const auditData = auditResponse?.data || {};

        const auditContent = Array.isArray(
          auditData?.content
        )
          ? auditData.content
          : [];

        setAudits({
          content: auditContent,
          totalElements:
            auditData?.totalElements || 0,
        });

        // Latest 20 activities
        setRecentActivities(
          auditContent.slice(0, 20)
        );

        // =====================================================
        // SYSTEM OPERATION DATA
        // =====================================================

        const systemData =
          systemOperationResponse?.data;

        console.log(
          "SYSTEM OPERATION API RESPONSE:",
          systemData
        );

        if (systemData) {
          setSystemOperation({
            systemStatus:
              systemData.systemStatus ||
              "ONLINE",

            totalOperations:
              systemData.totalOperations || 0,

            createOperations:
              systemData.createOperations || 0,

            updateOperations:
              systemData.updateOperations || 0,

            deleteOperations:
              systemData.deleteOperations || 0,

            failedOperations:
              systemData.failedOperations || 0,

            activeSchools:
              systemData.activeSchools || 0,

            activeUsers:
              systemData.activeUsers || 0,

            lastOperation:
              systemData.lastOperation ||
              "No operation yet",

            lastOperationUser:
              systemData.lastOperationUser ||
              "-",

            lastOperationSchool:
              systemData.lastOperationSchool ||
              "-",

            lastOperationTime:
              systemData.lastOperationTime ||
              "-",

            databaseStatus:
              systemData.databaseStatus ||
              "UNKNOWN",
          });
        }
      } catch (error) {
        console.error(
          "Dashboard data fetch failed:",
          error
        );

        console.error(
          "Error response:",
          error?.response?.data
        );

        console.error(
          "Error status:",
          error?.response?.status
        );

        setSchools([]);

        setAudits({
          content: [],
          totalElements: 0,
        });

        setRecentActivities([]);

        setSystemOperation({
          systemStatus: "OFFLINE",
          totalOperations: 0,
          createOperations: 0,
          updateOperations: 0,
          deleteOperations: 0,
          failedOperations: 0,
          activeSchools: 0,
          activeUsers: 0,
          lastOperation: "Unable to load",
          lastOperationUser: "-",
          lastOperationSchool: "-",
          lastOperationTime: "-",
          databaseStatus: "UNKNOWN",
        });
      } finally {
        setLoading(false);
        setLoadingActivities(false);
      }
    };

    fetchDashboardData();
  }, []);
console.log("audit",audits);
  // =========================================================
  // GET RECENT SCHOOLS DIRECTLY FROM SCHOOL DATA
  // =========================================================

  const recentSchools = [...schools]
    .filter((school) => school?.createdAt)
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 4);

  // =========================================================
  // GET SCHOOL NAME FOR AUDIT ACTIVITY
  // =========================================================

  const getSchoolName = (activity) => {
    if (activity?.schoolName) {
      return activity.schoolName;
    }

    if (activity?.schoolId) {
      const school = schools.find(
        (item) =>
          Number(item?.id) ===
          Number(activity.schoolId)
      );

      if (school?.schoolName) {
        return school.schoolName;
      }
    }

    return "System";
  };

  // =========================================================
  // GET ACTION
  // =========================================================

  const getAction = (activity) => {
    return (
      activity?.action ||
      activity?.operation ||
      "ACTION"
    ).toUpperCase();
  };

  // =========================================================
  // ACTION LABEL
  // =========================================================

  const getActionLabel = (activity) => {
    const action = getAction(activity);

    switch (action) {
      case "CREATE":
        return "Created";

      case "UPDATE":
        return "Updated";

      case "DELETE":
        return "Deleted";

      case "LOGIN":
        return "Logged in";

      case "LOGOUT":
        return "Logged out";

      case "VERIFY":
        return "Verified";

      case "FAILED":
        return "Failed";

      default:
        return (
          action.charAt(0) +
          action.slice(1).toLowerCase()
        );
    }
  };

  // =========================================================
  // ACTION ICON
  // =========================================================

  const getActionIcon = (activity) => {
    const action = getAction(activity);

    switch (action) {
      case "CREATE":
        return <FaPlusCircle />;

      case "UPDATE":
        return <FaEdit />;

      case "DELETE":
        return <FaTrash />;

      case "VERIFY":
        return <FaCheckCircle />;

      case "FAILED":
        return <FaExclamationCircle />;

      default:
        return <MdOutlineUpdate />;
    }
  };

  // =========================================================
  // ACTION THEME
  // =========================================================

  const getActionTheme = (activity) => {
    const action = getAction(activity);

    switch (action) {
      case "CREATE":
        return "create";

      case "UPDATE":
        return "update";

      case "DELETE":
        return "delete";

      case "VERIFY":
        return "success";

      case "FAILED":
        return "failed";

      default:
        return "default";
    }
  };

  // =========================================================
  // MODULE ICON
  // =========================================================

  const getModuleIcon = (activity) => {
    const moduleName = (
      activity?.module ||
      activity?.targetType ||
      ""
    ).toUpperCase();

    if (moduleName.includes("SCHOOL")) {
      return <FaSchool />;
    }

    if (
      moduleName.includes("USER") ||
      moduleName.includes("USER_MANAGEMENT")
    ) {
      return <FaUserPlus />;
    }

    if (
      moduleName.includes("SUPERADMIN") ||
      moduleName.includes("SUPER_ADMIN")
    ) {
      return <FaUserShield />;
    }

    if (
      moduleName.includes("ASSESSMENT") ||
      moduleName.includes("EXAM")
    ) {
      return <MdAssessment />;
    }

    return <MdOutlineUpdate />;
  };

  // =========================================================
  // FORMAT MODULE
  // =========================================================

  const formatModule = (activity) => {
    const moduleName =
      activity?.module ||
      activity?.targetType ||
      "SYSTEM";

    return moduleName
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  // =========================================================
  // ACTIVITY DESCRIPTION
  // =========================================================

  const getActivityDescription = (activity) => {
    if (activity?.description) {
      return activity.description;
    }

    const actionLabel = getActionLabel(activity);

    const targetName =
      activity?.targetName ||
      activity?.targetId ||
      formatModule(activity);

    return `${actionLabel} ${targetName}`;
  };

  // =========================================================
  // TIME AGO
  // =========================================================

  const getTimeAgo = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    const now = new Date();

    const difference = Math.floor(
      (now.getTime() - date.getTime()) / 1000
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
      return `${hours} hr ago`;
    }

    const days = Math.floor(
      hours / 24
    );

    if (days < 7) {
      return `${days} day${
        days > 1 ? "s" : ""
      } ago`;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="row g-3 p-2 m-1">

        <div className="col-12 col-lg-5">
          <div className="dashboard-card shadow dashboard-fixed-card">
            <div className="dashboard-card-body loading-state">
              <div className="spinner-border text-primary">
                <span className="visually-hidden">
                  Loading...
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="dashboard-card shadow dashboard-fixed-card">
            <div className="dashboard-card-body loading-state">
              <div className="spinner-border text-primary">
                <span className="visually-hidden">
                  Loading...
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="dashboard-card shadow dashboard-fixed-card">
            <div className="dashboard-card-body loading-state">
              <div className="spinner-border text-primary">
                <span className="visually-hidden">
                  Loading...
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

  // =========================================================
  // MAIN JSX
  // =========================================================

  return (
   <>

    <div className="row g-3 p-2 mt-1">

      {/* =====================================================
          RECENT SCHOOLS
      ====================================================== */}

     {/* ================= RECENT SCHOOLS ================= */}
<div className="col-12 col-lg-5">
  <div className="dashboard-card dashboard-fixed-card recent-schools-card shadow">

    <div className="dashboard-card-header">
      <div className="dashboard-card-title">
        <div className="dashboard-card-icon school-icon">
          <FaSchool />
        </div>

        <div>
          <h6>Recent Schools</h6>
          <small>Recently registered schools</small>
        </div>
      </div>

      <BsThreeDotsVertical className="dashboard-more-icon" />
    </div>

    <div className="dashboard-card-body recent-schools-body ">

      {loading ? (
        <div className="loading-state">
          <span>Loading...</span>
        </div>
      ) : recentSchools.length === 0 ? (

        <div className="empty-state">
          <FaSchool />
          <p>No recent schools found</p>
        </div>

      ) : (

        <div className="recent-schools-table-wrapper">

          <table className="recent-schools-table">

            <thead>
              <tr>
                <th>School</th>
                <th>Code</th>
                <th>Board</th>
                <th>Students</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>

              {recentSchools.map((school) => {

                const isActive = school?.active === true;

                return (
                  <tr key={school.id}>

                    {/* SCHOOL */}
                    <td>
                      <div className="school-table-name">

                        <div className="school-table-icon">
                          <FaSchool />
                        </div>

                        <div>
                          <strong>
                            {school?.schoolName || "Unnamed School"}
                          </strong>

                          <span>
                            {school?.organizationName || "School"}
                          </span>
                        </div>

                      </div>
                    </td>

                    {/* SCHOOL CODE */}
                    <td>
                      <span className="school-code">
                        {school?.schoolCode || "-"}
                      </span>
                    </td>

                    {/* BOARD */}
                    <td>
                      <span className="school-board">
                        {school?.affiliationBoard || "-"}
                      </span>
                    </td>

                    {/* STUDENTS */}
                    <td>
                      <strong className="student-count">
                        {school?.totalStudents ?? 0}
                      </strong>
                    </td>

                    {/* TYPE */}
                    <td>
                      <span className="school-type">
                        {school?.schoolType || "-"}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`school-status ${
                          isActive ? "active" : "inactive"
                        }`}
                      >
                        <span className="status-dot"></span>

                        {isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* CREATED */}
                    <td>
                      <span className="school-created">
                        {getTimeAgo(school?.createdAt)}
                      </span>
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      )}

    </div>

  </div>
</div>

      {/* =====================================================
          RECENT ACTIVITIES
      ====================================================== */}

      <div className="col-12 col-md-6 col-lg-4">

        <div className="dashboard-card shadow dashboard-fixed-card">

          <div className="dashboard-card-header">

            <div className="dashboard-card-title">

              <div className="dashboard-card-icon activity-icon">
                <MdOutlineUpdate />
              </div>

              <div>
                <h6>
                  Recent Activities
                </h6>

                <small>
                  Latest system activities
                </small>
              </div>

            </div>

            <BsThreeDotsVertical />

          </div>


          <div className="dashboard-card-body">

            {loadingActivities ? (

              <div className="empty-state">

                <div className="spinner-border text-primary">
                  <span className="visually-hidden">
                    Loading...
                  </span>
                </div>

              </div>

            ) : recentActivities.length === 0 ? (

              <div className="empty-state">

                <MdOutlineUpdate />

                <p>
                  No recent activities
                </p>

              </div>

            ) : (

              <div className="activity-list">

                {recentActivities.map(
                  (activity, index) => {

                    const actionTheme =
                      getActionTheme(
                        activity
                      );

                    return (
                      <div
                        className="activity-item"
                        key={
                          activity?.id ||
                          `activity-${index}`
                        }
                      >

                        <div
                          className={`activity-item-icon ${actionTheme}`}
                        >
                          {getActionIcon(
                            activity
                          )}
                        </div>


                        <div className="activity-item-content">

                          <div className="activity-item-top">

                            <span
                              className={`activity-action ${actionTheme}`}
                            >
                              {getActionLabel(
                                activity
                              )}
                            </span>

                            <span className="activity-time">
                              {getTimeAgo(
                                activity?.createdAt
                              )}
                            </span>

                          </div>


                          <h6>
                            {getActivityDescription(
                              activity
                            )}
                          </h6>


                          <div className="activity-meta">

                            <span>
                              {getModuleIcon(
                                activity
                              )}

                              {formatModule(
                                activity
                              )}
                            </span>

                            <span>
                              👤{" "}
                              {activity?.username ||
                                "-"}
                            </span>

                          </div>


                          <div className="activity-school">

                            <FaSchool />

                            <span>
                              {getSchoolName(
                                activity
                              )}
                            </span>

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            )}

          </div>

        </div>

      </div>


      {/* =====================================================
          SYSTEM OPERATION
      ====================================================== */}

      <div className="col-12 col-md-6 col-lg-3">

        <div className="dashboard-card shadow dashboard-fixed-card system-operation-card">

          <div className="dashboard-card-header">

            <div className="dashboard-card-title">

              <div className="dashboard-card-icon system-icon">
                ⚙️
              </div>

              <div>
                <h6>
                  System Operation
                </h6>

                <small>
                  Today's platform activity
                </small>
              </div>

            </div>


            <div
              className={`system-online-badge ${
                systemOperation.systemStatus ===
                "ONLINE"
                  ? "system-online"
                  : "system-offline"
              }`}
            >

              <span className="system-status-dot"></span>

              {systemOperation.systemStatus}

            </div>

          </div>


          <div className="dashboard-card-body">

            {/* TOTAL OPERATIONS */}

            <div className="system-total-operation">

              <div className="system-total-label">

                <span>
                  Total Operations
                </span>

                <small>
                  Today
                </small>

              </div>

              <strong>
                {Number(
                  systemOperation.totalOperations ||
                    0
                ).toLocaleString()}
              </strong>

            </div>


            {/* OPERATION GRID */}

            <div className="system-operation-grid">

              <div className="system-operation-item create">

                <span className="operation-label">
                  CREATE
                </span>

                <strong>
                  {systemOperation.createOperations ||
                    0}
                </strong>

              </div>


              <div className="system-operation-item update">

                <span className="operation-label">
                  UPDATE
                </span>

                <strong>
                  {systemOperation.updateOperations ||
                    0}
                </strong>

              </div>


              <div className="system-operation-item delete">

                <span className="operation-label">
                  DELETE
                </span>

                <strong>
                  {systemOperation.deleteOperations ||
                    0}
                </strong>

              </div>


              <div className="system-operation-item failed">

                <span className="operation-label">
                  FAILED
                </span>

                <strong>
                  {systemOperation.failedOperations ||
                    0}
                </strong>

              </div>

            </div>


            {/* SYSTEM STATS */}

            <div className="system-stats">

              <div className="system-stat-row">

                <span>
                  Active Schools
                </span>

                <strong>
                  {systemOperation.activeSchools ||
                    0}
                </strong>

              </div>


              <div className="system-stat-row">

                <span>
                  Active Users
                </span>

                <strong>
                  {systemOperation.activeUsers ||
                    0}
                </strong>

              </div>


              <div className="system-stat-row">

                <span>
                  Database
                </span>

                <strong
                  className={
                    systemOperation.databaseStatus ===
                    "CONNECTED"
                      ? "database-connected"
                      : "database-disconnected"
                  }
                >

                  <span></span>

                  {systemOperation.databaseStatus ||
                    "UNKNOWN"}

                </strong>

              </div>

            </div>


            {/* LAST OPERATION */}

            <div className="last-system-operation">

              <div className="last-operation-title">
                Last Operation
              </div>

              <div className="last-operation-name">
                {systemOperation.lastOperation ||
                  "No operation yet"}
              </div>

              <div className="last-operation-meta">

                <span>
                  👤{" "}
                  {systemOperation.lastOperationUser ||
                    "-"}
                </span>

                <span>
                  🏫{" "}
                  {systemOperation.lastOperationSchool ||
                    "-"}
                </span>

              </div>

              <div className="last-operation-time">
                {systemOperation.lastOperationTime ||
                  "-"}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
   <style>{`
    /* =========================================================
   DASHBOARD CARD
========================================================= */

/* =========================================
   RECENT SCHOOLS TABLE
========================================= */

.recent-schools-card {
  overflow: hidden;
}

.recent-schools-body {
  padding: 0 !important;
  overflow: hidden;
}

.recent-schools-table-wrapper {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
}

.recent-schools-table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
  table-layout: fixed;
}

/* =========================================
   TABLE HEADER
========================================= */

.recent-schools-table thead {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #f8fafc;
}

.recent-schools-table th {
  padding: 12px 9px;
  text-align: left;

  font-size: 8px;
  font-weight: 700;

  color: #64748b;

  text-transform: uppercase;
  letter-spacing: 0.35px;

  border-bottom: 1px solid #edf0f5;

  white-space: nowrap;
}

/* =========================================
   TABLE BODY
========================================= */

.recent-schools-table td {
  padding: 11px 9px;

  font-size: 9px;
  color: #475569;

  border-bottom: 1px solid #f1f3f5;

  vertical-align: middle;
}

.recent-schools-table tbody tr {
  transition: background 0.2s ease;
}

.recent-schools-table tbody tr:hover {
  background: #f8fbff;
}

.recent-schools-table tbody tr:last-child td {
  border-bottom: none;
}

/* =========================================
   SCHOOL NAME
========================================= */

.school-table-name {
  display: flex;
  align-items: center;

  gap: 8px;

  min-width: 0;
}

.school-table-icon {
  width: 32px;
  height: 32px;

  min-width: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  color: #2563eb;
  background: #eff6ff;

  font-size: 12px;
}

.school-table-name > div:last-child {
  min-width: 0;
}

.school-table-name strong {
  display: block;

  max-width: 130px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 10px;
  font-weight: 700;

  color: #263244;
}

.school-table-name span {
  display: block;

  margin-top: 2px;

  max-width: 130px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 8px;
  color: #94a3b8;
}

/* =========================================
   SCHOOL CODE
========================================= */

.school-code {
  display: inline-block;

  padding: 4px 6px;

  border-radius: 5px;

  background: #f8fafc;

  color: #475569;

  font-size: 8px;
  font-weight: 700;

  white-space: nowrap;
}

/* =========================================
   BOARD
========================================= */

.school-board {
  font-size: 8px;
  font-weight: 600;

  color: #475569;

  white-space: nowrap;
}

/* =========================================
   STUDENTS
========================================= */

.student-count {
  font-size: 11px;
  font-weight: 800;

  color: #2563eb;
}

/* =========================================
   SCHOOL TYPE
========================================= */

.school-type {
  font-size: 8px;
  font-weight: 600;

  color: #64748b;

  white-space: nowrap;
}

/* =========================================
   STATUS
========================================= */

.school-status {
  display: inline-flex;
  align-items: center;

  gap: 5px;

  padding: 4px 7px;

  border-radius: 20px;

  font-size: 8px;
  font-weight: 700;

  white-space: nowrap;
}

.school-status.active {
  color: #15803d;
  background: #f0fdf4;
}

.school-status.inactive {
  color: #dc2626;
  background: #fef2f2;
}

.status-dot {
  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: currentColor;
}

/* =========================================
   CREATED
========================================= */

.school-created {
  font-size: 8px;

  color: #94a3b8;

  white-space: nowrap;
}

/* =========================================
   SCROLLBAR
========================================= */

.recent-schools-table-wrapper::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.recent-schools-table-wrapper::-webkit-scrollbar-track {
  background: #f1f3f5;
}

.recent-schools-table-wrapper::-webkit-scrollbar-thumb {
  background: #c7ced8;
  border-radius: 10px;
}

.recent-schools-table-wrapper {
  scrollbar-width: thin;
  scrollbar-color: #c7ced8 #f1f3f5;
}

/* =========================================
   MOBILE
========================================= */

@media (max-width: 768px) {

  .recent-schools-table {
    min-width: 760px;
  }

  .recent-schools-table th,
  .recent-schools-table td {
    padding: 10px 8px;
  }
}

.dashboard-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #edf0f5;
  border-radius: 15px;
  transition: all 0.25s ease;
}

.dashboard-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07) !important;
}


/* =========================================================
   SAME HEIGHT - ALL THREE CARDS
========================================================= */

.dashboard-fixed-card {
  height: 480px !important;
  min-height: 480px !important;
  max-height: 480px !important;

  display: flex;
  flex-direction: column;

  overflow: hidden;
}


/* =========================================================
   CARD HEADER
========================================================= */

.dashboard-card-header {
  min-height: 70px;
  padding: 14px 18px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;

  background: #ffffff;
  border-bottom: 1px solid #f0f2f5;

  flex-shrink: 0;
}

.dashboard-card-title {
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 11px;
}

.dashboard-card-title h6 {
  margin: 0;

  font-size: 14px;
  font-weight: 700;

  line-height: 1.3;

  color: #1f2937;
}

.dashboard-card-title small {
  display: block;

  margin-top: 3px;

  font-size: 11px;

  line-height: 1.3;

  color: #8a94a6;
}


/* =========================================================
   CARD ICON
========================================================= */

.dashboard-card-icon {
  width: 40px;
  height: 40px;
  min-width: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 11px;

  font-size: 17px;
}

.school-icon {
  color: #2563eb;
  background: #eff6ff;
}

.activity-icon {
  color: #7c3aed;
  background: #f5f3ff;
}

.system-icon {
  color: #0f766e;
  background: #ecfdf5;
}


/* =========================================================
   CARD BODY
========================================================= */

.dashboard-fixed-card .dashboard-card-body {
  flex: 1;
  min-height: 0;

  padding: 15px 18px;
}


/* =========================================================
   LOADING
========================================================= */

.loading-state {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}


/* =========================================================
   EMPTY STATE
========================================================= */

.empty-state {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  color: #9aa4b2;
}

.empty-state svg {
  margin-bottom: 10px;

  font-size: 30px;

  opacity: 0.65;
}

.empty-state p {
  margin: 0;

  font-size: 13px;

  color: #8a94a6;
}


/* =========================================================
   RECENT SCHOOLS
========================================================= */

.school-list {
  display: flex;
  flex-direction: column;

  gap: 10px;
}

.school-item {
  min-height: 76px;

  display: flex;
  align-items: center;

  gap: 11px;

  padding: 11px 12px;

  background: #ffffff;

  border: 1px solid #edf0f5;
  border-radius: 11px;

  transition: all 0.2s ease;
}

.school-item:hover {
  background: #f8fbff;
  border-color: #dbeafe;
}

.school-item-icon {
  width: 38px;
  height: 38px;
  min-width: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  color: #2563eb;
  background: #eff6ff;

  font-size: 15px;
}

.school-item-content {
  min-width: 0;
  flex: 1;
}

.school-item-content h6 {
  margin: 0 0 3px;

  font-size: 12px;
  font-weight: 700;

  color: #263244;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.school-item-content span {
  display: block;

  font-size: 10px;

  color: #8a94a6;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.school-item-time {
  flex-shrink: 0;

  font-size: 9px;

  color: #9aa4b2;

  white-space: nowrap;
}


/* =========================================================
   RECENT ACTIVITIES
========================================================= */

.activity-card-fixed {
  overflow: hidden;
}

.activity-card-fixed .dashboard-card-body {
  overflow: hidden;
}

.activity-list {
  width: 100%;
  height: 100%;
  max-height: 100%;

  overflow-y: auto;
  overflow-x: hidden;

  padding-right: 6px;

  box-sizing: border-box;
}


/* =========================================================
   ACTIVITY SCROLLBAR
========================================================= */

.activity-list::-webkit-scrollbar {
  width: 5px;
}

.activity-list::-webkit-scrollbar-track {
  background: #f1f3f5;
  border-radius: 10px;
}

.activity-list::-webkit-scrollbar-thumb {
  background: #c7ced8;
  border-radius: 10px;
}

.activity-list::-webkit-scrollbar-thumb:hover {
  background: #9ca6b5;
}

.activity-list {
  scrollbar-width: thin;
  scrollbar-color: #c7ced8 #f1f3f5;
}


/* =========================================================
   ACTIVITY ITEM
========================================================= */

.activity-item {
  min-height: 100px;

  display: flex;
  align-items: flex-start;

  gap: 10px;

  padding: 12px 8px 12px 3px;

  border-bottom: 1px solid #f0f2f5;
}

.activity-item:last-child {
  border-bottom: none;
}


/* =========================================================
   ACTIVITY ICON
========================================================= */

.activity-item-icon {
  width: 34px;
  height: 34px;
  min-width: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  font-size: 13px;
}

.activity-item-icon.create {
  color: #16a34a;
  background: #f0fdf4;
}

.activity-item-icon.update {
  color: #2563eb;
  background: #eff6ff;
}

.activity-item-icon.delete {
  color: #dc2626;
  background: #fef2f2;
}

.activity-item-icon.success {
  color: #059669;
  background: #ecfdf5;
}

.activity-item-icon.failed {
  color: #dc2626;
  background: #fef2f2;
}

.activity-item-icon.default {
  color: #64748b;
  background: #f1f5f9;
}


/* =========================================================
   ACTIVITY CONTENT
========================================================= */

.activity-item-content {
  flex: 1;
  min-width: 0;
}

.activity-item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 8px;

  margin-bottom: 4px;
}

.activity-action {
  font-size: 9px;
  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.3px;
}

.activity-action.create {
  color: #16a34a;
}

.activity-action.update {
  color: #2563eb;
}

.activity-action.delete {
  color: #dc2626;
}

.activity-action.success {
  color: #059669;
}

.activity-action.failed {
  color: #dc2626;
}

.activity-action.default {
  color: #64748b;
}

.activity-time {
  flex-shrink: 0;

  font-size: 9px;

  color: #9aa4b2;

  white-space: nowrap;
}

.activity-item-content h6 {
  margin: 0 0 7px;

  font-size: 11px;
  font-weight: 600;

  line-height: 1.45;

  color: #263244;
}


/* =========================================================
   ACTIVITY META
========================================================= */

.activity-meta {
  display: flex;
  align-items: center;

  gap: 9px;

  margin-bottom: 5px;

  font-size: 9px;

  color: #8a94a6;
}

.activity-meta span {
  display: inline-flex;
  align-items: center;

  gap: 4px;
}

.activity-meta svg {
  font-size: 10px;
}


/* =========================================================
   ACTIVITY SCHOOL
========================================================= */

.activity-school {
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 5px;

  font-size: 9px;

  color: #64748b;
}

.activity-school svg {
  flex-shrink: 0;

  color: #2563eb;

  font-size: 9px;
}

.activity-school span {
  min-width: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* =========================================================
   SYSTEM OPERATION
========================================================= */

.system-operation-card .dashboard-card-body {
  overflow-y: auto;
  overflow-x: hidden;

  padding: 14px 16px;
}


/* =========================================================
   SYSTEM STATUS
========================================================= */

.system-online-badge {
  display: inline-flex;
  align-items: center;

  gap: 5px;

  padding: 5px 8px;

  border-radius: 20px;

  font-size: 8px;
  font-weight: 700;

  letter-spacing: 0.3px;
}

.system-online {
  color: #15803d;
  background: #f0fdf4;
}

.system-offline {
  color: #dc2626;
  background: #fef2f2;
}

.system-status-dot {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: currentColor;
}


/* =========================================================
   TOTAL OPERATIONS
========================================================= */

.system-total-operation {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 13px 14px;

  margin-bottom: 12px;

  border-radius: 11px;

  background: linear-gradient(
    135deg,
    #eff6ff,
    #f8fbff
  );

  border: 1px solid #dbeafe;
}

.system-total-label {
  display: flex;
  flex-direction: column;

  gap: 2px;
}

.system-total-label span {
  font-size: 10px;
  font-weight: 600;

  color: #64748b;
}

.system-total-label small {
  font-size: 8px;

  color: #94a3b8;
}

.system-total-operation > strong {
  font-size: 22px;
  font-weight: 800;

  color: #2563eb;
}


/* =========================================================
   OPERATION GRID
========================================================= */

.system-operation-grid {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 8px;

  margin-bottom: 12px;
}

.system-operation-item {
  padding: 9px 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 9px;

  border: 1px solid #edf0f5;

  background: #ffffff;
}

.operation-label {
  font-size: 8px;
  font-weight: 700;

  letter-spacing: 0.4px;
}

.system-operation-item strong {
  font-size: 14px;
  font-weight: 800;
}

.system-operation-item.create {
  background: #f0fdf4;
  border-color: #dcfce7;
}

.system-operation-item.create .operation-label,
.system-operation-item.create strong {
  color: #16a34a;
}

.system-operation-item.update {
  background: #eff6ff;
  border-color: #dbeafe;
}

.system-operation-item.update .operation-label,
.system-operation-item.update strong {
  color: #2563eb;
}

.system-operation-item.delete {
  background: #fef2f2;
  border-color: #fee2e2;
}

.system-operation-item.delete .operation-label,
.system-operation-item.delete strong {
  color: #dc2626;
}

.system-operation-item.failed {
  background: #fff7ed;
  border-color: #fed7aa;
}

.system-operation-item.failed .operation-label,
.system-operation-item.failed strong {
  color: #ea580c;
}


/* =========================================================
   SYSTEM STATS
========================================================= */

.system-stats {
  margin-bottom: 12px;

  border-top: 1px solid #edf0f5;
  border-bottom: 1px solid #edf0f5;
}

.system-stat-row {
  min-height: 34px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #f1f3f5;
}

.system-stat-row:last-child {
  border-bottom: none;
}

.system-stat-row > span {
  font-size: 10px;

  color: #64748b;
}

.system-stat-row > strong {
  font-size: 11px;
  font-weight: 700;

  color: #334155;
}


/* =========================================================
   DATABASE
========================================================= */

.database-connected,
.database-disconnected {
  display: inline-flex;
  align-items: center;

  gap: 5px;
}

.database-connected {
  color: #16a34a !important;
}

.database-disconnected {
  color: #dc2626 !important;
}

.database-connected > span,
.database-disconnected > span {
  width: 6px;
  height: 6px;

  display: inline-block;

  border-radius: 50%;
}

.database-connected > span {
  background: #22c55e;
}

.database-disconnected > span {
  background: #ef4444;
}


/* =========================================================
   LAST OPERATION
========================================================= */

.last-system-operation {
  padding: 11px 12px;

  border-radius: 10px;

  background: #f8fafc;

  border: 1px solid #edf0f5;
}

.last-operation-title {
  margin-bottom: 4px;

  font-size: 8px;
  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.5px;

  color: #94a3b8;
}

.last-operation-name {
  margin-bottom: 7px;

  font-size: 10px;
  font-weight: 700;

  line-height: 1.4;

  color: #334155;

  word-break: break-word;
}

.last-operation-meta {
  display: flex;
  flex-direction: column;

  gap: 4px;

  margin-bottom: 6px;
}

.last-operation-meta span {
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 4px;

  font-size: 8px;

  color: #64748b;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.last-operation-time {
  font-size: 8px;

  color: #94a3b8;
}


/* =========================================================
   SYSTEM SCROLLBAR
========================================================= */

.system-operation-card
  .dashboard-card-body::-webkit-scrollbar {
  width: 4px;
}

.system-operation-card
  .dashboard-card-body::-webkit-scrollbar-track {
  background: #f1f3f5;
}

.system-operation-card
  .dashboard-card-body::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 768px) {

  .dashboard-fixed-card {
    height: auto !important;
    min-height: 480px !important;
    max-height: none !important;
  }

  .dashboard-card-header {
    min-height: 66px;

    padding: 12px 15px;
  }

  .dashboard-fixed-card
    .dashboard-card-body {
    padding: 13px 15px;
  }

  .activity-list {
    overflow-y: auto;
  }

  .system-operation-card
    .dashboard-card-body {
    overflow-y: auto;
  }

}


/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 480px) {

  .dashboard-card-icon {
    width: 36px;
    height: 36px;
    min-width: 36px;

    font-size: 15px;
  }

  .dashboard-card-title h6 {
    font-size: 13px;
  }

  .dashboard-card-title small {
    font-size: 10px;
  }

  .school-item {
    padding: 10px;
  }

  .activity-item {
    padding-left: 2px;
  }

  .system-total-operation > strong {
    font-size: 20px;
  }

}
   
   `}</style>
   
   </>
  );
};

export default RecentSchoolActivitySummary;