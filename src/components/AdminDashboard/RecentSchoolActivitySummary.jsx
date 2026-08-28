// import React, { useEffect, useState } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";

// import {
//   FaSchool,
//   FaUserPlus,
//   FaUserShield,
//   FaPlusCircle,
// } from "react-icons/fa";

// import { MdOutlineUpdate, MdAssessment } from "react-icons/md";

// import useDashboardData from "../../hooks/UserDashBoardData";
// import axios from "axios";

// const RecentSchoolActivitySummary = () => {
//   const { schools = [] } = useDashboardData();

//   const [audits, setAudits] = useState({
//     content: [],
//   });

//   useEffect(() => {
//     const fetchAudits = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/api/audit-logs",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           },
//         );
//         console.log("audit response", response.data);
//         setAudits(response.data);
//       } catch (error) {
//         console.error("Audit fetch failed:", error);
//       }
//     };

//     fetchAudits();
//   }, []);

//   console.log("audit", audits);

//   const [recentActivities, setRecentActivities] = useState([]);

//   const [loadingActivities, setLoadingActivities] = useState(true);

//   const schoolData = schools.slice(0, 4);

//   useEffect(() => {
//     const fetchRecentActivities = async () => {
//       try {
//         const token = localStorage.getItem("AdminToken");

//         const response = await fetch(
//           "http://localhost:8080/api/audit-logs",
//           {
//             method: "GET",

//             headers: {
//               "Content-Type": "application/json",

//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch audit logs");
//         }

//         const data = await response.json();

//         const logs = data.content || [];

//         setRecentActivities(logs);
//       } catch (error) {
//         console.error("Recent activities error:", error);

//         setRecentActivities([]);
//       } finally {
//         setLoadingActivities(false);
//       }
//     };

//     fetchRecentActivities();
//   }, []);

//   console.log("recent activities", recentActivities);

//   const getActivityIcon = (module, action) => {
//     const moduleName = module?.toUpperCase();

//     if (moduleName === "SCHOOL") {
//       return <FaSchool />;
//     }

//     if (moduleName === "USER" || moduleName === "USER_MAPPING") {
//       return <FaUserPlus />;
//     }

//     if (moduleName === "SUPERADMIN" || moduleName === "SUPER_ADMIN") {
//       return <FaUserShield />;
//     }

//     if (moduleName === "MODULE" || moduleName === "MENU") {
//       return <MdOutlineUpdate />;
//     }

//     return <FaPlusCircle />;
//   };

//   const getActivityColor = (module) => {
//     const moduleName = module?.toUpperCase();

//     if (moduleName === "SCHOOL") {
//       return "text-primary";
//     }

//     if (moduleName === "USER") {
//       return "text-success";
//     }

//     if (moduleName === "SUPERADMIN" || moduleName === "SUPER_ADMIN") {
//       return "text-warning";
//     }

//     if (moduleName === "MODULE" || moduleName === "MENU") {
//       return "text-info";
//     }

//     return "text-secondary";
//   };

//   const getTimeAgo = (date) => {
//     if (!date) {
//       return "";
//     }

//     const createdDate = new Date(date);

//     const now = new Date();

//     const difference = Math.floor((now - createdDate) / 1000);

//     if (difference < 60) {
//       return "Just now";
//     }

//     const minutes = Math.floor(difference / 60);

//     if (minutes < 60) {
//       return `${minutes} min ago`;
//     }

//     const hours = Math.floor(minutes / 60);

//     if (hours < 24) {
//       return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//     }

//     const days = Math.floor(hours / 24);

//     return `${days} day${days > 1 ? "s" : ""} ago`;
//   };

//   const getSchoolName = (schoolId) => {
//     if (!schoolId || !schools?.length) {
//       return "-";
//     }

//     const school = schools.find(
//       (school) => Number(school.id) === Number(schoolId),
//     );

//     return (
//       school?.schoolName || school?.name || school?.organizationName || "-"
//     );
//   };

//   return (
//     <div className="container-fluid px-2 mt-3">
//       <div className="row g-3">
//         <div className="col-12 col-lg-5">
//           <div className="card shadow h-100">
//             <div className="card-header bg-white d-flex justify-content-between align-items-center">
//               <h6 className="mb-0">Recent School</h6>

//               <button className="btn btn-sm btn-outline-primary">
//                 View All
//               </button>
//             </div>

//             <div className="card-body">
//               <div className="table-responsive">
//                 <table className="table align-middle mb-0">
//                   <thead className="table-primary">
//                     <tr>
//                       <th>School Name</th>

//                       <th>Created On</th>

//                       <th>Status</th>

//                       <th></th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {audits?.content
//                       ?.filter(
//                         (audit) =>
//                           audit.targetType === "SCHOOL" &&
//                           audit.action === "CREATE",
//                       )
//                       .slice(0, 4)
//                       .map((audit, idx) => (
//                         <tr key={audit.id || idx}>
//                           <td>
//                             <div className="d-flex align-items-center gap-2">
//                               <div
//                                 className="bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center"
//                                 style={{
//                                   width: "36px",
//                                   height: "36px",
//                                 }}
//                               >
//                                 <FaSchool className="text-primary" />
//                               </div>

//                               <div>
//                                 <div className="fw-semibold">
//                                   {getSchoolName(audit.targetId)}
//                                 </div>

//                                 <small className="text-muted">
//                                   ID: {audit.targetId}
//                                 </small>
//                               </div>
//                             </div>
//                           </td>

//                           <td>
//                             {audit.createdAt
//                               ? new Date(audit.createdAt).toLocaleDateString(
//                                   "en-IN",
//                                   {
//                                     day: "2-digit",
//                                     month: "short",
//                                     year: "numeric",
//                                   },
//                                 )
//                               : "-"}
//                           </td>

//                           <td>
//                             <span
//                               className={`badge ${
//                                 audit.status === "SUCCESS"
//                                   ? "bg-success"
//                                   : "bg-danger"
//                               }`}
//                             >
//                               {audit.status}
//                             </span>
//                           </td>

//                           <td>
//                             <BsThreeDotsVertical size={20} />
//                           </td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="card shadow h-100">
//             <div className="card-header bg-white d-flex justify-content-between align-items-center">
//               <h6 className="mb-0">Recent Activities</h6>

//               <button className="btn btn-sm btn-outline-primary">
//                 View All
//               </button>
//             </div>

//             <div className="card-body">
//               {/* LOADING */}

//               {loadingActivities && (
//                 <div className="text-center text-muted py-4">
//                   Loading activities...
//                 </div>
//               )}

//               {/* NO ACTIVITIES */}

//               {!loadingActivities && recentActivities.length === 0 && (
//                 <div className="text-center text-muted py-4">
//                   No recent activities
//                 </div>
//               )}

//               {/* ACTIVITIES */}

//               {!loadingActivities && recentActivities.length > 0 && (
//                 <div className="d-flex flex-column gap-3">
//                   {recentActivities.map((activity) => (
//                     <div
//                       key={activity.id}
//                       className="d-flex align-items-center"
//                     >
//                       {/* ICON */}

//                       <div
//                         className={`bg-light rounded-circle p-2 me-3 ${getActivityColor(
//                           activity.module,
//                         )}`}
//                       >
//                         {getActivityIcon(activity.module, activity.action)}
//                       </div>

//                       {/* ACTIVITY */}

//                       <div className="flex-grow-1">
//                         <div className="fw-medium">
//                           {activity.description ||
//                             `${activity.action} ${activity.module}`}
//                         </div>

//                         <small className="text-muted">
//                           {getTimeAgo(activity.createdAt)}
//                         </small>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 col-lg-3">
//           <div className="card shadow h-100">
//             <div className="card-header bg-white">
//               <h6 className="mb-0">System Summary</h6>
//             </div>

//             <div className="card-body">
//               <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
//                 <div>
//                   <small className="text-muted">System Status</small>

//                   <div className="fw-semibold text-success">Operational</div>
//                 </div>

//                 <span className="badge bg-success">Active</span>
//               </div>

//               <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
//                 <div>
//                   <small className="text-muted">Last Backup</small>

//                   <div className="fw-semibold">Today</div>
//                 </div>

//                 <MdAssessment size={25} className="text-primary" />
//               </div>

//               <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
//                 <div>
//                   <small className="text-muted">Active Users</small>

//                   <div className="fw-semibold">24</div>
//                 </div>

//                 <FaUserPlus size={22} className="text-info" />
//               </div>

//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <small className="text-muted">Pending Tasks</small>

//                   <div className="fw-semibold">5</div>
//                 </div>

//                 <FaPlusCircle size={22} className="text-warning" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecentSchoolActivitySummary;


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
  // FETCH SCHOOLS + AUDIT LOGS TOGETHER
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

  console.log("recent activites",recentActivities);
  // =====================================================
  // GET SCHOOL NAME BY ID
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

  const getActivityIcon = (module, action) => {
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
  // ACTIVITY COLOR
  // =====================================================

  const getActivityColor = (module) => {
    const moduleName = module?.toUpperCase();

    if (moduleName === "SCHOOL") {
      return "text-primary";
    }

    if (moduleName === "USER") {
      return "text-success";
    }

    if (
      moduleName === "SUPERADMIN" ||
      moduleName === "SUPER_ADMIN"
    ) {
      return "text-warning";
    }

    if (
      moduleName === "MODULE" ||
      moduleName === "MENU"
    ) {
      return "text-info";
    }

    return "text-secondary";
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
    <div className="container-fluid px-2 mt-3">
      <div className="row g-3">

        {/* ================================================= */}
        {/* RECENT SCHOOL */}
        {/* ================================================= */}

        <div className="col-12 col-lg-5">
          <div className="card shadow h-100">

            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h6 className="mb-0">
                Recent School
              </h6>

              <button className="btn btn-sm btn-outline-primary">
                View All
              </button>
            </div>

            <div className="card-body">

              {loading ? (
                <div className="text-center text-muted py-4">
                  Loading schools...
                </div>
              ) : recentSchoolLogs.length === 0 ? (
                <div className="text-center text-muted py-4">
                  No recent school activity
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0">

                    <thead className="table-primary">
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

                            {/* SCHOOL NAME */}

                            <td>
                              <div className="d-flex align-items-center gap-2">

                                <div
                                  className="bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center"
                                  style={{
                                    width: "36px",
                                    height: "36px",
                                  }}
                                >
                                  <FaSchool className="text-primary" />
                                </div>

                                <div>

                                  <div className="fw-semibold">
                                    {getSchoolName(
                                      audit.targetId
                                    )}
                                  </div>

                                  <small className="text-muted">
                                    ID:{" "}
                                    {
                                      audit.targetId
                                    }
                                  </small>

                                </div>

                              </div>
                            </td>

                            {/* CREATED */}

                            <td>
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
                            </td>

                            {/* STATUS */}

                            <td>
                              <span
                                className={`badge ${
                                  audit.status ===
                                  "SUCCESS"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {
                                  audit.status
                                }
                              </span>
                            </td>

                            {/* MENU */}

                            <td>
                              <BsThreeDotsVertical
                                size={20}
                              />
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

        {/* ================================================= */}
        {/* RECENT ACTIVITIES */}
        {/* ================================================= */}

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow h-100">

            <div className="card-header bg-white d-flex justify-content-between align-items-center">

              <h6 className="mb-0">
                Recent Activities
              </h6>

              <button className="btn btn-sm btn-outline-primary">
                View All
              </button>

            </div>

            <div className="card-body">

              {loadingActivities && (
                <div className="text-center text-muted py-4">
                  Loading activities...
                </div>
              )}

              {!loadingActivities &&
                recentActivities.length ===
                  0 && (
                  <div className="text-center text-muted py-4">
                    No recent activities
                  </div>
                )}

              {!loadingActivities &&
                recentActivities.length >
                  0 && (
                  <div className="d-flex flex-column gap-3">

                    {recentActivities.map(
                      (activity) => (

                        <div
                          key={activity.id}
                          className="d-flex align-items-center"
                        >

                          {/* ICON */}

                          <div
                            className={`bg-light rounded-circle p-2 me-3 ${getActivityColor(
                              activity.module
                            )}`}
                          >
                            {getActivityIcon(
                              activity.module,
                              activity.action
                            )}
                          </div>

                          {/* ACTIVITY */}

                          <div className="flex-grow-1">

                            <div className="fw-medium d-flex justify-content-between">

                              {activity.description ||
                                `${activity.action} ${activity.module}`}
                               <small className="text-muted">
                              {getTimeAgo(
                                activity.createdAt
                              )}
                            </small>

                            </div>

                            
                            <small>
                               {getSchoolName(
                                      activity.targetId
                                    )}
                            </small>

                           
                          </div>

                        </div>
                      )
                    )}

                  </div>
                )}

            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* SYSTEM SUMMARY */}
        {/* ================================================= */}

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow h-100">

            <div className="card-header bg-white">
              <h6 className="mb-0">
                System Summary
              </h6>
            </div>

            <div className="card-body">

              {/* SYSTEM STATUS */}

              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">

                <div>
                  <small className="text-muted">
                    System Status
                  </small>

                  <div className="fw-semibold text-success">
                    Operational
                  </div>
                </div>

                <span className="badge bg-success">
                  Active
                </span>

              </div>

              {/* LAST BACKUP */}

              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">

                <div>
                  <small className="text-muted">
                    Last Backup
                  </small>

                  <div className="fw-semibold">
                    Today
                  </div>
                </div>

                <MdAssessment
                  size={25}
                  className="text-primary"
                />

              </div>

              {/* ACTIVE USERS */}

              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">

                <div>
                  <small className="text-muted">
                    Active Users
                  </small>

                  <div className="fw-semibold">
                    24
                  </div>
                </div>

                <FaUserPlus
                  size={22}
                  className="text-info"
                />

              </div>

              {/* PENDING TASKS */}

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <small className="text-muted">
                    Pending Tasks
                  </small>

                  <div className="fw-semibold">
                    5
                  </div>
                </div>

                <FaPlusCircle
                  size={22}
                  className="text-warning"
                />

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecentSchoolActivitySummary;