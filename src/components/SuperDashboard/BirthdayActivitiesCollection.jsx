
// import React from "react";
// import FeeCollectionBarChart from "../../pages/Dashboard/Charts/FeeCollectionBarChart";
// import FeeCollectionDonut from "../../pages/Dashboard/Charts/FeeCollectionDonut";
// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const BirthdayActivitiesCollection = () => {
//   const tableSlider = {
//     dots: false,
//     arrows: false,
//     infinite: true,
//     vertical: true,
//     verticalSwiping: true,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 600,
//     autoplaySpeed: 2500,
//     pauseOnHover: true,
//   };

//   const birthdays = [
//     {
//       name: "Rahul Kumar",
//       className: "Class VIII",
//       image:
//         "https://ui-avatars.com/api/?background=f59e0b&color=fff&name=Rahul+Kumar",
//     },
//     {
//       name: "Priya Singh",
//       className: "Class V",
//       image:
//         "https://ui-avatars.com/api/?background=2563eb&color=fff&name=Priya+Singh",
//     },
//     {
//       name: "Aman Khan",
//       className: "Class VI",
//       image:
//         "https://ui-avatars.com/api/?background=16a34a&color=fff&name=Aman+Khan",
//     },
//   ];

//   const activities = [
//     {
//       title: "Admission Completed",
//       time: "2 Minutes Ago",
//       icon: "🎓",
//       type: "success",
//     },
//     {
//       title: "Fee Received",
//       time: "15 Minutes Ago",
//       icon: "💰",
//       type: "primary",
//     },
//     {
//       title: "Attendance Updated",
//       time: "1 Hour Ago",
//       icon: "📋",
//       type: "danger",
//     },
//   ];

//   return (
//     <div className="container-fluid px-0 mt-3">
//       <div className="row g-3">
//         {/* ================= TODAY'S BIRTHDAYS ================= */}

//         <div className="col-lg-3 col-md-6">
//           <div
//             className="card border-0 shadow rounded-4 h-100"
//             style={{ minHeight: "245px" }}
//           >
//             {/* Header */}

//             <div className="card-header bg-white border-0 px-3 pt-3 pb-2">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div className="d-flex align-items-center gap-2">
//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-3"
//                     style={{
//                       width: "34px",
//                       height: "34px",
//                       background: "#fff7e6",
//                       fontSize: "17px",
//                     }}
//                   >
//                     🎂
//                   </div>

//                   <div>
//                     <h6 className="fw-bold mb-0">Today's Birthdays</h6>

//                     <small className="text-muted">Celebrate today</small>
//                   </div>
//                 </div>

//                 <button className="btn btn-sm btn-light text-warning border-0 rounded-3">
//                   <small>View All</small>
//                 </button>
//               </div>
//             </div>

//             {/* Body */}

//             <div
//               className="card-body px-3 pt-2"
//               style={{
//                 overflow: "hidden",
//               }}
//             >
//               <Slider {...tableSlider}>
//                 {birthdays.map((student) => (
//                   <div key={student.name}>
//                     <div
//                       className="d-flex align-items-center p-2 rounded-3 mb-2"
//                       style={{
//                         background: "#fafafa",
//                         border: "1px solid #f1f1f1",
//                       }}
//                     >
//                       <img
//                         src={student.image}
//                         alt={student.name}
//                         className="rounded-circle"
//                         width="42"
//                         height="42"
//                       />

//                       <div className="ms-3">
//                         <h6
//                           className="mb-1 fw-semibold"
//                           style={{ fontSize: "13px" }}
//                         >
//                           {student.name}
//                         </h6>

//                         <small className="text-muted">
//                           {student.className}
//                         </small>
//                       </div>

//                       <span
//                         className="ms-auto"
//                         style={{ fontSize: "17px" }}
//                       >
//                         🎉
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//             </div>
//           </div>
//         </div>

//         {/* ================= RECENT ACTIVITIES ================= */}

//         <div className="col-lg-3 col-md-6">
//           <div
//             className="card border-0 shadow rounded-4 h-100"
//             style={{ minHeight: "245px" }}
//           >
//             {/* Header */}

//             <div className="card-header bg-white border-0 px-3 pt-3 pb-2">
//               <div className="d-flex align-items-center gap-2">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "34px",
//                     height: "34px",
//                     background: "#eef4ff",
//                     fontSize: "17px",
//                   }}
//                 >
//                   🔔
//                 </div>

//                 <div>
//                   <h6 className="fw-bold mb-0">Recent Activities</h6>

//                   <small className="text-muted">Latest updates</small>
//                 </div>
//               </div>
//             </div>

//             {/* Body */}

//             <div className="card-body px-3 pt-2">
//               {activities.map((activity, index) => (
//                 <div
//                   key={activity.title}
//                   className="d-flex position-relative"
//                   style={{
//                     marginBottom:
//                       index === activities.length - 1 ? "0" : "14px",
//                   }}
//                 >
//                   {/* Timeline */}

//                   <div className="d-flex flex-column align-items-center">
//                     <div
//                       className={`rounded-circle d-flex align-items-center justify-content-center bg-${activity.type}`}
//                       style={{
//                         width: "32px",
//                         height: "32px",
//                         fontSize: "13px",
//                         flexShrink: 0,
//                       }}
//                     >
//                       {activity.icon}
//                     </div>

//                     {index !== activities.length - 1 && (
//                       <div
//                         style={{
//                           width: "1px",
//                           height: "18px",
//                           background: "#e5e7eb",
//                         }}
//                       />
//                     )}
//                   </div>

//                   {/* Content */}

//                   <div className="ms-3">
//                     <h6
//                       className="mb-1 fw-semibold"
//                       style={{ fontSize: "12.5px" }}
//                     >
//                       {activity.title}
//                     </h6>

//                     <small
//                       className="text-muted"
//                       style={{ fontSize: "11px" }}
//                     >
//                       {activity.time}
//                     </small>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ================= FEE COLLECTION ================= */}

//         <div className="col-lg-6">
//           <div
//             className="card border-0 shadow rounded-4 h-100"
//             style={{ minHeight: "245px" }}
//           >
//             {/* Header */}

//             <div className="card-header bg-white border-0 px-3 pt-3 pb-2">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div className="d-flex align-items-center gap-2">
//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-3"
//                     style={{
//                       width: "34px",
//                       height: "34px",
//                       background: "#ecfdf5",
//                       fontSize: "17px",
//                     }}
//                   >
//                     💰
//                   </div>

//                   <div>
//                     <h6 className="fw-bold mb-0">Fee Collection</h6>

//                     <small className="text-muted">This month's overview</small>
//                   </div>
//                 </div>

//                 <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
//                   This Month
//                 </span>
//               </div>
//             </div>

//             {/* Charts */}

//             <div
//               className="card-body px-2 py-1"
//               style={{
//                 overflow: "hidden",
//               }}
//             >
//               <div className="row align-items-center h-100">
//                 {/* Donut */}

//                 <div className="col-md-5 col-12 d-flex justify-content-center align-items-center">
//                   <div style={{ width: "100%", height: "190px" }}>
//                     <FeeCollectionDonut />
//                   </div>
//                 </div>

//                 {/* Bar Chart */}

//                 <div className="col-md-7 col-12 d-flex justify-content-center align-items-center">
//                   <div style={{ width: "100%", height: "190px" }}>
//                     <FeeCollectionBarChart />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BirthdayActivitiesCollection;


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

  /* =========================================================
     SCHOOL ID
  ========================================================= */

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
            params: {
              schoolId: schoolId,
            },
          }
        );

        setStudents(
          Array.isArray(response.data)
            ? response.data
            : []
        );

        console.log(
          "Students for birthday:",
          response.data
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
     DATE HELPERS
  ========================================================= */

  const getValidDob = (student) => {
    const dob =
      student?.dateOfBirth ||
      student?.dob ||
      student?.dateOfbirth ||
      student?.birthDate;

    if (!dob) {
      return null;
    }

    const date = new Date(dob);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  };

  const getBirthdayThisYear = (student) => {
    const dob = getValidDob(student);

    if (!dob) {
      return null;
    }

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

    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    return students.filter((student) => {
      const dob = getValidDob(student);

      if (!dob) {
        return false;
      }

      return (
        dob.getMonth() === todayMonth &&
        dob.getDate() === todayDate
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

        if (!birthday) {
          return null;
        }

        birthday.setHours(0, 0, 0, 0);

        /*
         * Today's birthday ko upcoming me nahi dikhana.
         */
        if (birthday.getTime() === today.getTime()) {
          return null;
        }

        /*
         * Agar birthday is year me nikal chuka hai,
         * to next year ka birthday consider karo.
         */
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
     STUDENT NAME
  ========================================================= */

  const getStudentName = (student) => {
    return (
      student?.studentName ||
      student?.name ||
      [student?.firstName, student?.middleName, student?.lastName]
        .filter(Boolean)
        .join(" ") ||
      "Student"
    );
  };

  /* =========================================================
     CLASS
  ========================================================= */

  const getStudentClass = (student) => {
    return (
      student?.studentClass ||
      student?.className ||
      student?.standard ||
      student?.class ||
      "-"
    );
  };

  /* =========================================================
     IMAGE
  ========================================================= */

  const getStudentImage = (student) => {
    const name = getStudentName(student);

    return (
      student?.profileImage ||
      student?.photo ||
      student?.image ||
      `https://ui-avatars.com/api/?background=2563eb&color=fff&name=${encodeURIComponent(
        name
      )}`
    );
  };

  /* =========================================================
     FORMAT UPCOMING DATE
  ========================================================= */

  const formatBirthday = (date) => {
    if (!date) {
      return "";
    }

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
    speed: 600,
    autoplaySpeed: 2500,
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
    },
    {
      title: "Fee Received",
      time: "15 Minutes Ago",
      icon: "💰",
      type: "primary",
    },
    {
      title: "Attendance Updated",
      time: "1 Hour Ago",
      icon: "📋",
      type: "danger",
    },
  ];

  return (
    <div className="container-fluid px-0 mt-3">

      <div className="row g-3">

        {/* =====================================================
            TODAY'S BIRTHDAYS
        ===================================================== */}

        <div className="col-lg-3 col-md-6">

          <div
            className="card border-0 shadow rounded-4 h-100"
            style={{ minHeight: "245px" }}
          >

            {/* HEADER */}

            <div className="card-header bg-white border-0 px-3 pt-3 pb-2">

              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-2">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "34px",
                      height: "34px",
                      background: "#fff7e6",
                      fontSize: "17px",
                    }}
                  >
                    🎂
                  </div>

                  <div>

                    <h6 className="fw-bold mb-0">
                      Today's Birthdays
                    </h6>

                    <small className="text-muted">
                      Celebrate today
                    </small>

                  </div>

                </div>

                <span className="badge bg-warning-subtle text-warning rounded-pill px-2 py-1">
                  {todaysBirthdays.length}
                </span>

              </div>

            </div>

            {/* BODY */}

            <div
              className="card-body px-3 pt-2"
              style={{
                overflow: "hidden",
              }}
            >

              {loadingStudents ? (

                <div className="text-center py-4">

                  <div
                    className="spinner-border spinner-border-sm text-warning"
                    role="status"
                  />

                  <div className="small text-muted mt-2">
                    Loading birthdays...
                  </div>

                </div>

              ) : todaysBirthdays.length > 0 ? (

                <Slider {...tableSlider}>

                  {todaysBirthdays.map((student, index) => (

                    <div
                      key={
                        student?.id ||
                        student?.admissionNumber ||
                        index
                      }
                    >

                      <div
                        className="d-flex align-items-center p-2 rounded-3 mb-2"
                        style={{
                          background: "#fffaf0",
                          border: "1px solid #f9e8bc",
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
                          }}
                        />

                        <div className="ms-3">

                          <h6
                            className="mb-1 fw-semibold"
                            style={{
                              fontSize: "13px",
                            }}
                          >
                            {getStudentName(student)}
                          </h6>

                          <small className="text-muted">
                            {getStudentClass(student)}
                          </small>

                        </div>

                        <span
                          className="ms-auto"
                          style={{
                            fontSize: "17px",
                          }}
                        >
                          🎉
                        </span>

                      </div>

                    </div>

                  ))}

                </Slider>

              ) : (

                <div
                  className="d-flex flex-column align-items-center justify-content-center text-center"
                  style={{
                    minHeight: "155px",
                  }}
                >

                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "#fff7e6",
                      fontSize: "22px",
                    }}
                  >
                    🎂
                  </div>

                  <div className="fw-semibold mt-2">
                    No Birthday Today
                  </div>

                  <small className="text-muted">
                    No student has a birthday today.
                  </small>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* =====================================================
            UPCOMING BIRTHDAYS
        ===================================================== */}

        <div className="col-lg-3 col-md-6">

          <div
            className="card border-0 shadow rounded-4 h-100"
            style={{ minHeight: "245px" }}
          >

            {/* HEADER */}

            <div className="card-header bg-white border-0 px-3 pt-3 pb-2">

              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-2">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "34px",
                      height: "34px",
                      background: "#eef4ff",
                      fontSize: "17px",
                    }}
                  >
                    📅
                  </div>

                  <div>

                    <h6 className="fw-bold mb-0">
                      Upcoming Birthdays
                    </h6>

                    <small className="text-muted">
                      Next celebrations
                    </small>

                  </div>

                </div>

                <span className="badge bg-primary-subtle text-primary rounded-pill px-2 py-1">
                  {upcomingBirthdays.length}
                </span>

              </div>

            </div>

            {/* BODY */}

            <div
              className="card-body px-3 pt-2"
              style={{
                overflow: "hidden",
              }}
            >

              {loadingStudents ? (

                <div className="text-center py-4">

                  <div
                    className="spinner-border spinner-border-sm text-primary"
                    role="status"
                  />

                  <div className="small text-muted mt-2">
                    Loading birthdays...
                  </div>

                </div>

              ) : upcomingBirthdays.length > 0 ? (

                <Slider {...tableSlider}>

                  {upcomingBirthdays.map(
                    (student, index) => (

                      <div
                        key={
                          student?.id ||
                          student?.admissionNumber ||
                          index
                        }
                      >

                        <div
                          className="d-flex align-items-center p-2 rounded-3 mb-2"
                          style={{
                            background: "#f8fbff",
                            border: "1px solid #e4edfb",
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
                            }}
                          />

                          <div className="ms-3">

                            <h6
                              className="mb-1 fw-semibold"
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              {getStudentName(student)}
                            </h6>

                            <small className="text-muted">
                              {getStudentClass(student)}
                            </small>

                          </div>

                          <div className="ms-auto text-end">

                            <div
                              className="fw-semibold text-primary"
                              style={{
                                fontSize: "11px",
                              }}
                            >
                              {formatBirthday(
                                student.birthdayDate
                              )}
                            </div>

                            <small
                              className="text-muted"
                              style={{
                                fontSize: "9px",
                              }}
                            >
                              🎂 Birthday
                            </small>

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </Slider>

              ) : (

                <div
                  className="d-flex flex-column align-items-center justify-content-center text-center"
                  style={{
                    minHeight: "155px",
                  }}
                >

                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "#eef4ff",
                      fontSize: "22px",
                    }}
                  >
                    📅
                  </div>

                  <div className="fw-semibold mt-2">
                    No Upcoming Birthdays
                  </div>

                  <small className="text-muted">
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
            className="card border-0 shadow rounded-4 h-100"
            style={{ minHeight: "245px" }}
          >

            <div className="card-header bg-white border-0 px-3 pt-3 pb-2">

              <div className="d-flex align-items-center gap-2">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "34px",
                    height: "34px",
                    background: "#eef4ff",
                    fontSize: "17px",
                  }}
                >
                  🔔
                </div>

                <div>

                  <h6 className="fw-bold mb-0">
                    Recent Activities
                  </h6>

                  <small className="text-muted">
                    Latest updates
                  </small>

                </div>

              </div>

            </div>

            <div className="card-body px-3 pt-2">

              {activities.map((activity, index) => (

                <div
                  key={activity.title}
                  className="d-flex position-relative"
                  style={{
                    marginBottom:
                      index === activities.length - 1
                        ? "0"
                        : "14px",
                  }}
                >

                  <div className="d-flex flex-column align-items-center">

                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center bg-${activity.type}`}
                      style={{
                        width: "32px",
                        height: "32px",
                        fontSize: "13px",
                        flexShrink: 0,
                      }}
                    >
                      {activity.icon}
                    </div>

                    {index !== activities.length - 1 && (

                      <div
                        style={{
                          width: "1px",
                          height: "18px",
                          background: "#e5e7eb",
                        }}
                      />

                    )}

                  </div>

                  <div className="ms-3">

                    <h6
                      className="mb-1 fw-semibold"
                      style={{
                        fontSize: "12.5px",
                      }}
                    >
                      {activity.title}
                    </h6>

                    <small
                      className="text-muted"
                      style={{
                        fontSize: "11px",
                      }}
                    >
                      {activity.time}
                    </small>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* =====================================================
            FEE COLLECTION
        ===================================================== */}

        <div className="col-lg-3 col-md-6">

          <div
            className="card border-0 shadow rounded-4 h-100"
            style={{ minHeight: "245px" }}
          >

            <div className="card-header bg-white border-0 px-3 pt-3 pb-2">

              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-2">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "34px",
                      height: "34px",
                      background: "#ecfdf5",
                      fontSize: "17px",
                    }}
                  >
                    💰
                  </div>

                  <div>

                    <h6 className="fw-bold mb-0">
                      Fee Collection
                    </h6>

                    <small className="text-muted">
                      This month's overview
                    </small>

                  </div>

                </div>

                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                  This Month
                </span>

              </div>

            </div>

            <div
              className="card-body px-2 py-1"
              style={{
                overflow: "hidden",
              }}
            >

              <div className="row align-items-center h-100">

                <div className="col-md-5 col-12 d-flex justify-content-center align-items-center">

                  <div
                    style={{
                      width: "100%",
                      height: "190px",
                    }}
                  >
                    <FeeCollectionDonut />
                  </div>

                </div>

                <div className="col-md-7 col-12 d-flex justify-content-center align-items-center">

                  <div
                    style={{
                      width: "100%",
                      height: "190px",
                    }}
                  >
                    <FeeCollectionBarChart />
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BirthdayActivitiesCollection;

