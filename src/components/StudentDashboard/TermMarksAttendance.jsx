// // TermMarksAttendance.jsx

// import React, { useEffect, useState } from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";
// import axiosInstance from "../../api/axiosInstance";

// const TermMarksAttendance = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [attendance, setAttendance] = useState(null);

//   const loadAttendance = async () => {
//     try {
//       const attendanceRes = await axiosInstance.get(
//         "/api/student/attendance/current",
//         {
//           params: {
//             admissionNumber: user?.admissionNumber,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setAttendance(attendanceRes.data);
//     } catch (error) {
//       console.log("Attendance Error:", error);
//     }
//   };

//   useEffect(() => {
//     if (user?.admissionNumber) {
//       loadAttendance();
//     }
//   }, [user?.admissionNumber]);
//   const marksData = [
//     {
//       subject: "English",
//       marks: 78,
//     },
//     {
//       subject: "Hindi",
//       marks: 85,
//     },
//     {
//       subject: "Math",
//       marks: 92,
//     },
//     {
//       subject: "Science",
//       marks: 74,
//     },
//     {
//       subject: "Social Science",
//       marks: 88,
//     },
//     {
//       subject: "Computer",
//       marks: 95,
//     },
//   ];

//   // ================= ATTENDANCE =================
//   const attendanceData = {
//     present: {attendance?.present},
//     absent: {attendance?.absent},
//     leave: {attendance?.leave},
//   };

//   return (
//     <div className="container-fluid px-0 mt-3">
//       <div className="row g-3">
//         {/* =====================================================
//             TERM 1 SUBJECT WISE MARKS
//         ====================================================== */}
//         <div className="col-lg-6">
//           <div className="card border-0 shadow rounded-4 h-100">
//             <div className="card-header bg-white border-0 pt-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h6 className="fw-bold mb-1">📊 Subject Wise Marks</h6>

//                   <small className="text-muted">Term 1 Performance</small>
//                 </div>

//                 <span className="badge bg-primary">Term 1</span>
//               </div>
//             </div>

//             <div className="card-body">
//               <div style={{ width: "100%", height: "300px" }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={marksData}
//                     margin={{
//                       top: 10,
//                       right: 10,
//                       left: -15,
//                       bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />

//                     <XAxis
//                       dataKey="subject"
//                       tick={{ fontSize: 11 }}
//                       interval={0}
//                     />

//                     <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />

//                     <Tooltip />

//                     <Bar
//                       dataKey="marks"
//                       name="Marks"
//                       radius={[8, 8, 0, 0]}
//                       barSize={32}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* =====================================================
//             ATTENDANCE OVERVIEW
//         ====================================================== */}
//         <div className="col-lg-6">
//           <div className="card border-0 shadow rounded-4 h-100">
//             <div className="card-header bg-white border-0 pt-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h6 className="fw-bold mb-1">📅 Attendance Overview</h6>

//                   <small className="text-muted">Current Academic Session</small>
//                 </div>

//                 <span className="badge bg-success">82% Present</span>
//               </div>
//             </div>

//             <div className="card-body">
//               {/* ================= PRESENT ================= */}
//               <div className="mb-4">
//                 <div className="d-flex justify-content-between mb-2">
//                   <span className="fw-semibold">Present</span>

//                   <span className="fw-bold text-success">
//                     {attendanceData.present}%
//                   </span>
//                 </div>

//                 <div
//                   className="progress"
//                   style={{
//                     height: "12px",
//                     borderRadius: "20px",
//                     backgroundColor: "#e9ecef",
//                   }}
//                 >
//                   <div
//                     className="progress-bar bg-success"
//                     style={{
//                       width: `${attendanceData.present}%`,
//                       borderRadius: "20px",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* ================= ABSENT ================= */}
//               <div className="mb-4">
//                 <div className="d-flex justify-content-between mb-2">
//                   <span className="fw-semibold">Absent</span>

//                   <span className="fw-bold text-danger">
//                     {attendanceData.absent}%
//                   </span>
//                 </div>

//                 <div
//                   className="progress"
//                   style={{
//                     height: "12px",
//                     borderRadius: "20px",
//                     backgroundColor: "#e9ecef",
//                   }}
//                 >
//                   <div
//                     className="progress-bar bg-danger"
//                     style={{
//                       width: `${attendanceData.absent}%`,
//                       borderRadius: "20px",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* ================= LEAVE ================= */}
//               <div className="mb-4">
//                 <div className="d-flex justify-content-between mb-2">
//                   <span className="fw-semibold">Leave</span>

//                   <span className="fw-bold text-warning">
//                     {attendanceData.leave}%
//                   </span>
//                 </div>

//                 <div
//                   className="progress"
//                   style={{
//                     height: "12px",
//                     borderRadius: "20px",
//                     backgroundColor: "#e9ecef",
//                   }}
//                 >
//                   <div
//                     className="progress-bar bg-warning"
//                     style={{
//                       width: `${attendanceData.leave}%`,
//                       borderRadius: "20px",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* ================= SUMMARY ================= */}
//               <div className="row g-2 mt-4">
//                 <div className="col-4">
//                   <div className="text-center p-3 bg-light rounded-3">
//                     <h5 className="fw-bold text-success mb-1">
//                       {attendanceData.present}%
//                     </h5>

//                     <small className="text-muted">Present</small>
//                   </div>
//                 </div>

//                 <div className="col-4">
//                   <div className="text-center p-3 bg-light rounded-3">
//                     <h5 className="fw-bold text-danger mb-1">
//                       {attendanceData.absent}%
//                     </h5>

//                     <small className="text-muted">Absent</small>
//                   </div>
//                 </div>

//                 <div className="col-4">
//                   <div className="text-center p-3 bg-light rounded-3">
//                     <h5 className="fw-bold text-warning mb-1">
//                       {attendanceData.leave}%
//                     </h5>

//                     <small className="text-muted">Leave</small>
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

// export default TermMarksAttendance;


import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import axiosInstance from "../../api/axiosInstance";

const TermMarksAttendance = () => {

  // ================= USER =================
  const user = JSON.parse(localStorage.getItem("user"));

  const token = localStorage.getItem("token");

  // ================= ATTENDANCE STATE =================
  const [attendance, setAttendance] = useState(null);

  // ================= LOAD ATTENDANCE =================
  const loadAttendance = async () => {
    try {
      const attendanceRes = await axiosInstance.get(
        "/api/student/attendance/current",
        {
          params: {
            admissionNumber: user?.admissionNumber,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAttendance(attendanceRes.data);

    } catch (error) {
      console.log("Attendance Error:", error);
    }
  };

  useEffect(() => {

    if (user?.admissionNumber && token) {
      loadAttendance();
    }

  }, [user?.admissionNumber, token]);


  // =====================================================
  // TERM 1 MARKS
  // =====================================================

  const marksData = [
    {
      subject: "English",
      marks: 78,
    },
    {
      subject: "Hindi",
      marks: 85,
    },
    {
      subject: "Math",
      marks: 92,
    },
    {
      subject: "Science",
      marks: 74,
    },
    {
      subject: "Social Science",
      marks: 88,
    },
    {
      subject: "Computer",
      marks: 95,
    },
  ];


  // =====================================================
  // ATTENDANCE CALCULATION
  // =====================================================

  const present = attendance?.present || 0;
  const absent = attendance?.absent || 0;
  const leave = attendance?.leave || 0;
  const halfDay = attendance?.halfDay || 0;

  const totalDays =
    present +
    absent +
    leave +
    halfDay;

  // Backend se percentage aa raha hai
  const attendancePercentage =
    attendance?.attendancePercentage || 0;


  // Present percentage
  const presentPercentage =
    totalDays > 0
      ? ((present + halfDay * 0.5) / totalDays) * 100
      : 0;


  // Absent percentage
  const absentPercentage =
    totalDays > 0
      ? (absent / totalDays) * 100
      : 0;


  // Leave percentage
  const leavePercentage =
    totalDays > 0
      ? (leave / totalDays) * 100
      : 0;


  // Half Day percentage
  const halfDayPercentage =
    totalDays > 0
      ? (halfDay / totalDays) * 100
      : 0;


  return (
    <div className="container-fluid px-0 mt-3">

      <div className="row g-3">

        {/* =====================================================
            TERM 1 SUBJECT WISE MARKS
        ====================================================== */}

        <div className="col-lg-6">

          <div className="card border-0 shadow rounded-4 h-100">

            {/* HEADER */}

            <div className="card-header bg-white border-0 pt-3">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6 className="fw-bold mb-1">
                    📊 Subject Wise Marks
                  </h6>

                  <small className="text-muted">
                    Term 1 Performance
                  </small>

                </div>

                <span className="badge bg-primary">
                  Term 1
                </span>

              </div>

            </div>


            {/* BODY */}

            <div className="card-body">

              <div
                style={{
                  width: "100%",
                  height: "300px",
                }}
              >

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={marksData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -15,
                      bottom: 5,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="subject"
                      tick={{
                        fontSize: 11,
                      }}
                      interval={0}
                    />

                    <YAxis
                      domain={[0, 100]}
                      tick={{
                        fontSize: 11,
                      }}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="marks"
                      name="Marks"
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
                      barSize={32}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            ATTENDANCE OVERVIEW
        ====================================================== */}

        <div className="col-lg-6">

          <div className="card border-0 shadow rounded-4 h-100">

            {/* HEADER */}

            <div className="card-header bg-white border-0 pt-3">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6 className="fw-bold mb-1">
                    📅 Attendance Overview
                  </h6>

                  <small className="text-muted">

                    {attendance?.studentName || "Student"}

                    {" • "}

                    {attendance?.month || "Current Month"}

                  </small>

                </div>


                <span className="badge bg-success">

                  {attendancePercentage}%

                </span>

              </div>

            </div>


            {/* BODY */}

            <div className="card-body">


              {/* ================= PRESENT ================= */}

              <div className="mb-4">

                <div className="d-flex justify-content-between mb-2">

                  <span className="fw-semibold">
                    Present
                  </span>

                  <span className="fw-bold text-success">

                    {present}

                    {" "}

                    <small>
                      ({presentPercentage.toFixed(1)}%)
                    </small>

                  </span>

                </div>


                <div
                  className="progress"
                  style={{
                    height: "12px",
                    borderRadius: "20px",
                    backgroundColor: "#e9ecef",
                  }}
                >

                  <div
                    className="progress-bar bg-success"
                    style={{
                      width: `${presentPercentage}%`,
                      borderRadius: "20px",
                    }}
                  />

                </div>

              </div>


              {/* ================= ABSENT ================= */}

              <div className="mb-4">

                <div className="d-flex justify-content-between mb-2">

                  <span className="fw-semibold">
                    Absent
                  </span>

                  <span className="fw-bold text-danger">

                    {absent}

                    {" "}

                    <small>
                      ({absentPercentage.toFixed(1)}%)
                    </small>

                  </span>

                </div>


                <div
                  className="progress"
                  style={{
                    height: "12px",
                    borderRadius: "20px",
                    backgroundColor: "#e9ecef",
                  }}
                >

                  <div
                    className="progress-bar bg-danger"
                    style={{
                      width: `${absentPercentage}%`,
                      borderRadius: "20px",
                    }}
                  />

                </div>

              </div>


              {/* ================= LEAVE ================= */}

              <div className="mb-4">

                <div className="d-flex justify-content-between mb-2">

                  <span className="fw-semibold">
                    Leave
                  </span>

                  <span className="fw-bold text-warning">

                    {leave}

                    {" "}

                    <small>
                      ({leavePercentage.toFixed(1)}%)
                    </small>

                  </span>

                </div>


                <div
                  className="progress"
                  style={{
                    height: "12px",
                    borderRadius: "20px",
                    backgroundColor: "#e9ecef",
                  }}
                >

                  <div
                    className="progress-bar bg-warning"
                    style={{
                      width: `${leavePercentage}%`,
                      borderRadius: "20px",
                    }}
                  />

                </div>

              </div>


              {/* ================= HALF DAY ================= */}

              <div className="mb-4">

                <div className="d-flex justify-content-between mb-2">

                  <span className="fw-semibold">
                    Half Day
                  </span>

                  <span className="fw-bold text-info">

                    {halfDay}

                    {" "}

                    <small>
                      ({halfDayPercentage.toFixed(1)}%)
                    </small>

                  </span>

                </div>


                <div
                  className="progress"
                  style={{
                    height: "12px",
                    borderRadius: "20px",
                    backgroundColor: "#e9ecef",
                  }}
                >

                  <div
                    className="progress-bar bg-info"
                    style={{
                      width: `${halfDayPercentage}%`,
                      borderRadius: "20px",
                    }}
                  />

                </div>

              </div>


              {/* ================= SUMMARY ================= */}

              <div className="row g-2 mt-4">

                {/* PRESENT */}

                <div className="col-3">

                  <div className="text-center p-2 bg-light rounded-3">

                    <h5 className="fw-bold text-success mb-1">
                      {present}
                    </h5>

                    <small className="text-muted">
                      Present
                    </small>

                  </div>

                </div>


                {/* ABSENT */}

                <div className="col-3">

                  <div className="text-center p-2 bg-light rounded-3">

                    <h5 className="fw-bold text-danger mb-1">
                      {absent}
                    </h5>

                    <small className="text-muted">
                      Absent
                    </small>

                  </div>

                </div>


                {/* LEAVE */}

                <div className="col-3">

                  <div className="text-center p-2 bg-light rounded-3">

                    <h5 className="fw-bold text-warning mb-1">
                      {leave}
                    </h5>

                    <small className="text-muted">
                      Leave
                    </small>

                  </div>

                </div>


                {/* HALF DAY */}

                <div className="col-3">

                  <div className="text-center p-2 bg-light rounded-3">

                    <h5 className="fw-bold text-info mb-1">
                      {halfDay}
                    </h5>

                    <small className="text-muted">
                      Half Day
                    </small>

                  </div>

                </div>

              </div>


              {/* ================= TOTAL DAYS ================= */}

              <div className="text-center mt-3">

                <small className="text-muted">

                  Total Working Days:{" "}

                  <strong>
                    {attendance?.totalDays || totalDays}
                  </strong>

                </small>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TermMarksAttendance;