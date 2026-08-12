// import React from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import useDashboardData from "../../hooks/UserDashBoardData";

// const RecentSchoolActivitySummary = () => {
//   const { schools } = useDashboardData();
//   const schoolData = schools.slice(0, 4);
//   console.log("schools", schools);
//   return (
//     <>
//       <div className="container-fluid px-2 mt-3">
//         <div className="row g-3">
//           <div className="col-12 col-sm-4 col-md-6 col-lg">
//             <div className="card">
//               <div className="card-header bg-white d-flex justify-content-between">
//                 <h6>Recent School</h6>
//                 <span>
//                   <button className="btn btn-sm btn-outline-primary">
//                     View All
//                   </button>
//                 </span>
//               </div>
//               <div className="card-body">
//                 <div className="table-responsive">
//                   <table className="table">
//                     <thead className="table-primary">
//                       <tr>
//                         <th>School Name</th>
//                         <th>Created On</th>
//                         <th>Status</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {schoolData.map((school, idx) => (
//                         <tr key={school.id || idx}>
//                           <td>{school.schoolName}</td>
//                           <td>{school.createdAt?.split("T")[0]}</td>
//                           <td>
//                             <span
//                               className={`badge ${
//                                 school.status === "Active"
//                                   ? "bg-success"
//                                   : "bg-danger"
//                               }`}
//                             >
//                               {school.status}
//                             </span>
//                           </td>
//                           <td>
//                             <BsThreeDotsVertical size={25} />
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-sm-4 col-md-6 col-lg"></div>
//           <div className="col-12 col-sm-4 col-md-6 col-lg"></div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RecentSchoolActivitySummary;


// import React from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import {
//   FaSchool,
//   FaUserPlus,
//   FaUserShield,
//   FaPlusCircle,
// } from "react-icons/fa";
// import { MdOutlineUpdate, MdAssessment } from "react-icons/md";
// import useDashboardData from "../../hooks/UserDashBoardData";

// const RecentSchoolActivitySummary = () => {
//   const { schools = [] } = useDashboardData();

//   const schoolData = schools.slice(0, 4);

//   // Demo recent activities
//   const recentActivities = [
//     {
//       icon: <FaSchool />,
//       text: "New school created",
//       time: "10 min ago",
//       color: "text-primary",
//     },
//     {
//       icon: <FaUserPlus />,
//       text: "New user registered",
//       time: "25 min ago",
//       color: "text-success",
//     },
//     {
//       icon: <FaUserShield />,
//       text: "Superadmin added",
//       time: "1 hour ago",
//       color: "text-warning",
//     },
//     {
//       icon: <MdOutlineUpdate />,
//       text: "Module updated",
//       time: "2 hours ago",
//       color: "text-info",
//     },
//   ];

//   return (
//     <div className="container-fluid px-2 mt-3">
//       <div className="row g-3">

//         {/* ================= RECENT SCHOOL ================= */}
//         <div className="col-12 col-lg-5">
//           <div className="card h-100">

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
//                     {schoolData.map((school, idx) => (
//                       <tr key={school.id || idx}>

//                         <td>
//                           {school.schoolName}
//                         </td>

//                         <td>
//                           {school.createdAt?.split("T")[0]}
//                         </td>

//                         <td>
//                           <span
//                             className={`badge ${
//                               school.status === "Active"
//                                 ? "bg-success"
//                                 : "bg-danger"
//                             }`}
//                           >
//                             {school.status}
//                           </span>
//                         </td>

//                         <td>
//                           <BsThreeDotsVertical size={20} />
//                         </td>

//                       </tr>
//                     ))}

//                     {schoolData.length === 0 && (
//                       <tr>
//                         <td
//                           colSpan="4"
//                           className="text-center text-muted"
//                         >
//                           No school found
//                         </td>
//                       </tr>
//                     )}

//                   </tbody>

//                 </table>
//               </div>

//             </div>
//           </div>
//         </div>


//         {/* ================= RECENT ACTIVITIES ================= */}
//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="card h-100">

//             <div className="card-header bg-white d-flex justify-content-between align-items-center">
//               <h6 className="mb-0">Recent Activities</h6>

//               <button className="btn btn-sm btn-outline-primary">
//                 View All
//               </button>
//             </div>

//             <div className="card-body">

//               <div className="d-flex flex-column gap-3">

//                 {recentActivities.map((activity, index) => (
//                   <div
//                     key={index}
//                     className="d-flex align-items-center"
//                   >

//                     {/* Icon */}
//                     <div
//                       className={`bg-light rounded-circle p-2 me-3 ${activity.color}`}
//                     >
//                       {activity.icon}
//                     </div>

//                     {/* Activity */}
//                     <div className="flex-grow-1">
//                       <div className="fw-medium">
//                         {activity.text}
//                       </div>

//                       <small className="text-muted">
//                         {activity.time}
//                       </small>
//                     </div>

//                   </div>
//                 ))}

//               </div>

//             </div>
//           </div>
//         </div>


//         {/* ================= SYSTEM SUMMARY ================= */}
//         <div className="col-12 col-md-6 col-lg-3">
//           <div className="card h-100">

//             <div className="card-header bg-white">
//               <h6 className="mb-0">System Summary</h6>
//             </div>

//             <div className="card-body">

//               <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
//                 <div>
//                   <small className="text-muted">
//                     System Status
//                   </small>

//                   <div className="fw-semibold text-success">
//                     Operational
//                   </div>
//                 </div>

//                 <span className="badge bg-success">
//                   Active
//                 </span>
//               </div>


//               <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
//                 <div>
//                   <small className="text-muted">
//                     Last Backup
//                   </small>

//                   <div className="fw-semibold">
//                     Today
//                   </div>
//                 </div>

//                 <MdAssessment
//                   size={25}
//                   className="text-primary"
//                 />
//               </div>


//               <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
//                 <div>
//                   <small className="text-muted">
//                     Active Users
//                   </small>

//                   <div className="fw-semibold">
//                     24
//                   </div>
//                 </div>

//                 <FaUserPlus
//                   size={22}
//                   className="text-info"
//                 />
//               </div>


//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <small className="text-muted">
//                     Pending Tasks
//                   </small>

//                   <div className="fw-semibold">
//                     5
//                   </div>
//                 </div>

//                 <FaPlusCircle
//                   size={22}
//                   className="text-warning"
//                 />
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

import useDashboardData from "../../hooks/UserDashBoardData";


const RecentSchoolActivitySummary = () => {

  const { schools = [] } = useDashboardData();

  const [recentActivities, setRecentActivities] = useState([]);

  const [loadingActivities, setLoadingActivities] =
    useState(true);


  const schoolData = schools.slice(0, 4);


  // =====================================================
  // GET RECENT AUDIT LOGS
  // =====================================================

  useEffect(() => {

    const fetchRecentActivities = async () => {

      try {

        const token =
          localStorage.getItem("AdminToken");

        const response = await fetch(
          "http://localhost:8080/api/audit-logs?page=0&size=4&sort=createdAt,desc",
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${token}`,
            },
          }
        );


        if (!response.ok) {

          throw new Error(
            "Failed to fetch audit logs"
          );
        }


        const data = await response.json();


        const logs = data.content || [];


        setRecentActivities(logs);

      } catch (error) {

        console.error(
          "Recent activities error:",
          error
        );

        setRecentActivities([]);

      } finally {

        setLoadingActivities(false);
      }
    };


    fetchRecentActivities();

  }, []);

  console.log("recent activities",recentActivities);


  // =====================================================
  // GET ICON
  // =====================================================

  const getActivityIcon = (module, action) => {

    const moduleName =
      module?.toUpperCase();


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
  // GET ICON COLOR
  // =====================================================

  const getActivityColor = (module) => {

    const moduleName =
      module?.toUpperCase();


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


    const createdDate =
      new Date(date);

    const now =
      new Date();


    const difference =
      Math.floor(
        (now - createdDate) / 1000
      );


    if (difference < 60) {

      return "Just now";
    }


    const minutes =
      Math.floor(
        difference / 60
      );


    if (minutes < 60) {

      return `${minutes} min ago`;
    }


    const hours =
      Math.floor(
        minutes / 60
      );


    if (hours < 24) {

      return `${hours} hour${
        hours > 1 ? "s" : ""
      } ago`;
    }


    const days =
      Math.floor(
        hours / 24
      );


    return `${days} day${
      days > 1 ? "s" : ""
    } ago`;
  };


  return (

    <div className="container-fluid px-2 mt-3">

      <div className="row g-3">


        {/* =====================================================
            RECENT SCHOOL
        ===================================================== */}

        <div className="col-12 col-lg-5">

          <div className="card h-100">

            <div className="card-header bg-white d-flex justify-content-between align-items-center">

              <h6 className="mb-0">
                Recent School
              </h6>


              <button className="btn btn-sm btn-outline-primary">
                View All
              </button>

            </div>


            <div className="card-body">

              <div className="table-responsive">

                <table className="table align-middle mb-0">

                  <thead className="table-primary">

                    <tr>

                      <th>
                        School Name
                      </th>

                      <th>
                        Created On
                      </th>

                      <th>
                        Status
                      </th>

                      <th></th>

                    </tr>

                  </thead>


                  <tbody>

                    {schoolData.map(
                      (school, idx) => (

                        <tr
                          key={
                            school.id || idx
                          }
                        >

                          <td>
                            {school.schoolName}
                          </td>


                          <td>
                            {
                              school.createdAt
                                ?.split("T")[0]
                            }
                          </td>


                          <td>

                            <span
                              className={`badge ${
                                school.status ===
                                "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >

                              {school.status}

                            </span>

                          </td>


                          <td>

                            <BsThreeDotsVertical
                              size={20}
                            />

                          </td>

                        </tr>

                      )
                    )}


                    {schoolData.length === 0 && (

                      <tr>

                        <td
                          colSpan="4"
                          className="text-center text-muted"
                        >
                          No school found
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>



        {/* =====================================================
            RECENT ACTIVITIES
        ===================================================== */}

        <div className="col-12 col-md-6 col-lg-4">

          <div className="card h-100">


            <div className="card-header bg-white d-flex justify-content-between align-items-center">

              <h6 className="mb-0">
                Recent Activities
              </h6>


              <button className="btn btn-sm btn-outline-primary">
                View All
              </button>

            </div>


            <div className="card-body">


              {/* LOADING */}

              {loadingActivities && (

                <div className="text-center text-muted py-4">

                  Loading activities...

                </div>

              )}



              {/* NO ACTIVITIES */}

              {!loadingActivities &&
                recentActivities.length === 0 && (

                  <div className="text-center text-muted py-4">

                    No recent activities

                  </div>

                )}



              {/* ACTIVITIES */}

              {!loadingActivities &&
                recentActivities.length > 0 && (

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

                            <div className="fw-medium">

                              {activity.description ||
                                `${activity.action} ${activity.module}`}

                            </div>


                            <small className="text-muted">

                              {getTimeAgo(
                                activity.createdAt
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



        {/* =====================================================
            SYSTEM SUMMARY
        ===================================================== */}

        <div className="col-12 col-md-6 col-lg-3">

          <div className="card h-100">


            <div className="card-header bg-white">

              <h6 className="mb-0">
                System Summary
              </h6>

            </div>


            <div className="card-body">


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