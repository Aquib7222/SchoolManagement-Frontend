// import React, { useEffect, useState } from "react";
// import AttendanceChart from "../../pages/Dashboard/Charts/AttendanceChart";
// import ClassWiseStudentCharts from "../../pages/Dashboard/Charts/ClassWiseStudentCharts";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axios from "../../api/axiosInstance";
// import useMasters from "../../hooks/useMasters";
// import { LuBell, LuClipboardCheck, LuSchool } from "react-icons/lu";

// const StudentAttendanceNotice = () => {
//   const { standards } = useMasters();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;
//   const token = localStorage.getItem("token");

//   const [classWiseStudents, setClassWiseStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [students, setStudents] = useState([]);

//   const sliderSettings = {
//     dots: false,
//     infinite: true,
//     vertical: true,
//     verticalSwiping: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     speed: 700,
//     arrows: false,
//     pauseOnHover: true,
//   };

//   // -------------------- Fetch Students (NO class-wise API) --------------------
//   useEffect(() => {
//     if (!schoolId) return;

//     axios
//       .get("/api/students", {
//         params: { schoolId },
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         const list = Array.isArray(res.data) ? res.data : [];
//         setStudents(list);
//         calculateClassWise(list);
//       })
//       .catch(console.error);
//   }, [schoolId, token]);

//   console.log("students", students);
//   console.log("users", user);

//   // -------------------- Class-wise Calculation --------------------
//   const calculateClassWise = (list) => {
//     const map = {};

//     list.forEach((s) => {
//       const cls = s.studentClass; // 🔴 adjust if backend key differs
//       if (!cls) return;
//       map[cls] = (map[cls] || 0) + 1;
//     });

//     const chartData = Object.keys(map).map((cls) => ({
//       className: cls,
//       totalStudents: map[cls],
//     }));

//     setClassWiseStudents(chartData);
//   };

//   // -------------------- Dropdown Filter --------------------
//   useEffect(() => {
//     if (selectedClass) {
//       calculateClassWise(
//         students.filter((s) => s.studentClass === selectedClass),
//       );
//     } else {
//       calculateClassWise(students);
//     }
//   }, [selectedClass]);

//   return (
//     <>
//       <div className="container-fluid px-0 mt-3">
//         <div className="row g-3">
//           {/* ================= LEFT SECTION ================= */}

//           <div className="col-lg-8">
//             <div className="row g-3">
//               {/* Student Class Wise */}

//               <div className="col-md-6">
//                 <div className="card border-0 shadow rounded-4 h-100">
//                   <div className="card-header bg-white border-0 pt-3">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
//                         <span
//                           className="d-inline-flex align-items-center justify-content-center rounded-4-circle bg-primary-subtle text-primary"
//                           style={{
//                             width: "40px",
//                             height: "40px",
//                           }}
//                         >
//                           <LuSchool size={22} />
//                         </span>
//                         Student Overview
//                       </h6>

//                       <select
//                         className="form-select form-select-sm "
//                         style={{
//                           width: "120px",
//                           borderColor: "#0d6efd",
//                           outlineColor: "#0d6efd",
//                         }}
//                         value={selectedClass}
//                         onChange={(e) => setSelectedClass(e.target.value)}
//                       >
//                         <option value="">All</option>

//                         {standards.map((item) => (
//                           <option key={item} value={item}>
//                             {item}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div
//                     className="card-body d-flex justify-content-center align-items-center"
//                     style={{ height: 260 }}
//                   >
//                     <ClassWiseStudentCharts data={classWiseStudents} />
//                   </div>
//                 </div>
//               </div>

//               {/* Attendance */}

//               <div className="col-md-6">
//                 <div className="card border-0 shadow rounded-4 h-100">
//                   <div className="card-header bg-white border-0 pt-3">
//                     <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
//                       <span
//                         className="d-inline-flex align-items-center justify-content-center rounded-4-circle bg-primary-subtle text-primary"
//                         style={{
//                           width: "40px",
//                           height: "40px",
//                         }}
//                       >
//                         <LuClipboardCheck size={22} />
//                       </span>
//                       Attendance Overview
//                     </h6>
//                   </div>

//                   <div className="card-body" style={{ minHeight: "300px" }}>
//                     <AttendanceChart />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ================= NOTICE BOARD ================= */}

//           <div className="col-lg-4">
//             <div className="card border-0 shadow rounded-4 h-100">
//               <div className="card-header bg-white border-0">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
//                     <span
//                       className="d-inline-flex align-items-center justify-content-center rounded-4-circle bg-primary-subtle text-primary"
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                       }}
//                     >
//                       <LuBell size={22} />
//                     </span>
//                     Notice Board
//                   </h6>

//                   <button className="btn btn-sm btn-outline-primary">
//                     View All
//                   </button>
//                 </div>
//               </div>

//               <div
//                 className="card-body"
//                 style={{
//                   height: 260,
//                   overflow: "hidden",
//                 }}
//               >
//                 <Slider {...sliderSettings}>
//                   <div>
//                     <div className="alert alert-primary">
//                       <h6>School Closed</h6>
//                       Sunday will remain holiday.
//                     </div>
//                   </div>

//                   <div>
//                     <div className="alert alert-warning">
//                       <h6>Fee Reminder</h6>
//                       Deposit fee before 30 July.
//                     </div>
//                   </div>

//                   <div>
//                     <div className="alert alert-success">
//                       <h6>Parent Meeting</h6>
//                       Friday 11:00 AM
//                     </div>
//                   </div>

//                   <div>
//                     <div className="alert alert-info">
//                       <h6>Sports Week</h6>
//                       Starts next Monday.
//                     </div>
//                   </div>
//                 </Slider>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default StudentAttendanceNotice;



import React, { useEffect, useState } from "react";
import AttendanceChart from "../../pages/Dashboard/Charts/AttendanceChart";
import ClassWiseStudentCharts from "../../pages/Dashboard/Charts/ClassWiseStudentCharts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";
import {
  LuBell,
  LuClipboardCheck,
  LuSchool,
} from "react-icons/lu";

const StudentAttendanceNotice = () => {
  const { standards } = useMasters();

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  const [classWiseStudents, setClassWiseStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const [students, setStudents] = useState([]);

  // Separate class selection for attendance
  const [attendanceClass, setAttendanceClass] = useState("");

  const sliderSettings = {
    dots: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 700,
    arrows: false,
    pauseOnHover: true,
  };

  // --------------------------------------------------
  // Fetch Students
  // --------------------------------------------------

  useEffect(() => {
    if (!schoolId) return;

    axios
      .get("/api/students/school", {
        params: {
          schoolId: schoolId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];

        setStudents(list);
        calculateClassWise(list);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setStudents([]);
        setClassWiseStudents([]);
      });
  }, [schoolId, token]);

  // --------------------------------------------------
  // Class-wise Student Calculation
  // --------------------------------------------------

  const calculateClassWise = (list) => {
    const map = {};

    list.forEach((student) => {
      const cls = student.studentClass;

      if (!cls) return;

      map[cls] = (map[cls] || 0) + 1;
    });

    const chartData = Object.keys(map).map((cls) => ({
      className: cls,
      totalStudents: map[cls],
    }));

    setClassWiseStudents(chartData);
  };

  // --------------------------------------------------
  // Student Overview Filter
  // --------------------------------------------------

  useEffect(() => {
    if (selectedClass) {
      const filteredStudents = students.filter(
        (student) => student.studentClass === selectedClass
      );

      calculateClassWise(filteredStudents);
    } else {
      calculateClassWise(students);
    }
  }, [selectedClass, students]);

  // --------------------------------------------------
  // Filtered students for attendance
  // --------------------------------------------------

  const attendanceStudents = attendanceClass
    ? students.filter(
        (student) => student.studentClass === attendanceClass
      )
    : students;

  return (
    <>
      <div className="container-fluid px-0 mt-3">
        <div className="row g-3">

          {/* =====================================================
              LEFT SECTION
          ===================================================== */}

          <div className="col-lg-8">
            <div className="row g-3">

              {/* =================================================
                  STUDENT OVERVIEW
              ================================================= */}

              <div className="col-md-6">
                <div className="card border-0 shadow rounded-4 h-100">

                  <div className="card-header bg-white border-0 pt-3">
                    <div className="d-flex justify-content-between align-items-center">

                      <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">

                        <span
                          className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
                          style={{
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          <LuSchool size={22} />
                        </span>

                        Student Overview
                      </h6>

                      <select
                        className="form-select form-select-sm"
                        style={{
                          width: "120px",
                          borderColor: "#0d6efd",
                          outlineColor: "#0d6efd",
                        }}
                        value={selectedClass}
                        onChange={(e) =>
                          setSelectedClass(e.target.value)
                        }
                      >
                        <option value="">All</option>

                        {standards.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>

                    </div>
                  </div>

                  <div
                    className="card-body d-flex justify-content-center align-items-center"
                    style={{ height: 260 }}
                  >
                    <ClassWiseStudentCharts
                      data={classWiseStudents}
                    />
                  </div>

                </div>
              </div>

              {/* =================================================
                  ATTENDANCE OVERVIEW
              ================================================= */}

              <div className="col-md-6">
                <div className="card border-0 shadow rounded-4 h-100">

                  {/* Header */}

                  <div className="card-header bg-white border-0 pt-3">

                    <div className="d-flex justify-content-between align-items-center">

                      <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">

                        <span
                          className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
                          style={{
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          <LuClipboardCheck size={22} />
                        </span>

                        Attendance Overview

                      </h6>

                      {/* Attendance Class Filter */}

                      <select
                        className="form-select form-select-sm"
                        style={{
                          width: "120px",
                          borderColor: "#0d6efd",
                          outlineColor: "#0d6efd",
                        }}
                        value={attendanceClass}
                        onChange={(e) =>
                          setAttendanceClass(e.target.value)
                        }
                      >

                        <option value="">
                          All
                        </option>

                        {standards.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}

                      </select>

                    </div>

                  </div>

                  {/* Attendance Chart */}

                  <div
                    className="card-body"
                    style={{
                      minHeight: "300px",
                    }}
                  >
                    <AttendanceChart
                      schoolId={schoolId}
                      studentClass={attendanceClass}
                      students={attendanceStudents}
                    />
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* =====================================================
              NOTICE BOARD
          ===================================================== */}

          <div className="col-lg-4">

            <div className="card border-0 shadow rounded-4 h-100">

              <div className="card-header bg-white border-0">

                <div className="d-flex justify-content-between align-items-center">

                  <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">

                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      <LuBell size={22} />
                    </span>

                    Notice Board

                  </h6>

                  <button className="btn btn-sm btn-outline-primary">
                    View All
                  </button>

                </div>

              </div>

              <div
                className="card-body"
                style={{
                  height: 260,
                  overflow: "hidden",
                }}
              >

                <Slider {...sliderSettings}>

                  <div>
                    <div className="alert alert-primary">
                      <h6>School Closed</h6>
                      Sunday will remain holiday.
                    </div>
                  </div>

                  <div>
                    <div className="alert alert-warning">
                      <h6>Fee Reminder</h6>
                      Deposit fee before 30 July.
                    </div>
                  </div>

                  <div>
                    <div className="alert alert-success">
                      <h6>Parent Meeting</h6>
                      Friday 11:00 AM
                    </div>
                  </div>

                  <div>
                    <div className="alert alert-info">
                      <h6>Sports Week</h6>
                      Starts next Monday.
                    </div>
                  </div>

                </Slider>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default StudentAttendanceNotice;
