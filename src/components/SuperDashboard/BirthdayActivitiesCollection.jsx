// import React from 'react'
// import FeeCollectionBarChart from '../../pages/Dashboard/Charts/FeeCollectionBarChart'
// import FeeCollectionDonut from '../../pages/Dashboard/Charts/FeeCollectionDonut'
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const BirthdayActivitiesCollection = () => {
//       const tableSlider = {
//     dots: false,

//     arrows: false,

//     infinite: true,

//     vertical: true,

//     verticalSwiping: true,

//     slidesToShow: 3,

//     slidesToScroll: 1,

//     autoplay: true,

//     speed: 700,

//     autoplaySpeed: 2500,

//     pauseOnHover: true,
//   };
//   return (
//     <>

//      <div className="container-fluid px-0 mt-3">
//         <div className="row g-3">
//           {/* ================= Birthday ================= */}

//           <div className="col-lg-3">
//             <div className="card border-0 shadow rounded-4 h-100">
//               <div className="card-header bg-white border-0">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h6 className="fw-bold text-warning mb-0">
//                     🎂 Today's Birthdays
//                   </h6>

//                   <button className="btn btn-sm btn-outline-warning">
//                     View All
//                   </button>
//                 </div>
//               </div>

//               <div className="card-body">
//                 <Slider {...tableSlider}>
//                   <div>
//                     <div className="d-flex align-items-center">
//                       <img
//                         src="https://ui-avatars.com/api/?background=f59e0b&color=fff&name=Rahul"
//                         className="rounded-circle"
//                         width="45"
//                         height="45"
//                       />

//                       <div className="ms-3">
//                         <h6 className="mb-0">Rahul Kumar</h6>

//                         <small>Class VIII</small>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="d-flex align-items-center">
//                       <img
//                         src="https://ui-avatars.com/api/?background=2563eb&color=fff&name=Priya"
//                         className="rounded-circle"
//                         width="45"
//                         height="45"
//                       />

//                       <div className="ms-3">
//                         <h6 className="mb-0">Priya Singh</h6>

//                         <small>Class V</small>
//                       </div>
//                     </div>
//                   </div>
//                 </Slider>
//               </div>
//             </div>
//           </div>

//           {/* ================= Activities ================= */}

//           <div className="col-lg-3">
//             <div className="card border-0 shadow rounded-4 h-100">
//               <div className="card-header bg-white border-0">
//                 <h6 className="fw-bold text-primary">🔔 Recent Activities</h6>
//               </div>

//               <div className="card-body">
//                 <div className="border-start border-4 border-success ps-3 mb-4">
//                   <strong>Admission Completed</strong>

//                   <br />

//                   <small>2 Minutes Ago</small>
//                 </div>

//                 <div className="border-start border-4 border-primary ps-3 mb-4">
//                   <strong>Fee Received</strong>

//                   <br />

//                   <small>15 Minutes Ago</small>
//                 </div>

//                 <div className="border-start border-4 border-danger ps-3">
//                   <strong>Attendance Updated</strong>

//                   <br />

//                   <small>1 Hour Ago</small>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ================= Fee Collection ================= */}

//           <div className="col-lg-6">
//             <div className="card border-0 shadow rounded-4 h-100">
//               <div className="card-header bg-white border-0">
//                 <h6 className="fw-bold text-success">
//                   💰 Fee Collection (This Month)
//                 </h6>
//               </div>

//               <div className="card-body">
//                 <div className="row h-100">
//                   <div className="col-md-6 d-flex justify-content-center align-items-center">
//                     <FeeCollectionDonut />
//                   </div>

//                   <div className="col-md-6 d-flex justify-content-center align-items-center">
//                     <FeeCollectionBarChart />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
    
    
//     </>
//   )
// }

// export default BirthdayActivitiesCollection

import React from "react";
import FeeCollectionBarChart from "../../pages/Dashboard/Charts/FeeCollectionBarChart";
import FeeCollectionDonut from "../../pages/Dashboard/Charts/FeeCollectionDonut";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BirthdayActivitiesCollection = () => {
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

  const birthdays = [
    {
      name: "Rahul Kumar",
      className: "Class VIII",
      image:
        "https://ui-avatars.com/api/?background=f59e0b&color=fff&name=Rahul+Kumar",
    },
    {
      name: "Priya Singh",
      className: "Class V",
      image:
        "https://ui-avatars.com/api/?background=2563eb&color=fff&name=Priya+Singh",
    },
    {
      name: "Aman Khan",
      className: "Class VI",
      image:
        "https://ui-avatars.com/api/?background=16a34a&color=fff&name=Aman+Khan",
    },
  ];

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
        {/* ================= TODAY'S BIRTHDAYS ================= */}

        <div className="col-lg-3 col-md-6">
          <div
            className="card border-0 shadow rounded-4 h-100"
            style={{ minHeight: "245px" }}
          >
            {/* Header */}

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
                    <h6 className="fw-bold mb-0">Today's Birthdays</h6>

                    <small className="text-muted">Celebrate today</small>
                  </div>
                </div>

                <button className="btn btn-sm btn-light text-warning border-0 rounded-3">
                  <small>View All</small>
                </button>
              </div>
            </div>

            {/* Body */}

            <div
              className="card-body px-3 pt-2"
              style={{
                overflow: "hidden",
              }}
            >
              <Slider {...tableSlider}>
                {birthdays.map((student) => (
                  <div key={student.name}>
                    <div
                      className="d-flex align-items-center p-2 rounded-3 mb-2"
                      style={{
                        background: "#fafafa",
                        border: "1px solid #f1f1f1",
                      }}
                    >
                      <img
                        src={student.image}
                        alt={student.name}
                        className="rounded-circle"
                        width="42"
                        height="42"
                      />

                      <div className="ms-3">
                        <h6
                          className="mb-1 fw-semibold"
                          style={{ fontSize: "13px" }}
                        >
                          {student.name}
                        </h6>

                        <small className="text-muted">
                          {student.className}
                        </small>
                      </div>

                      <span
                        className="ms-auto"
                        style={{ fontSize: "17px" }}
                      >
                        🎉
                      </span>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        {/* ================= RECENT ACTIVITIES ================= */}

        <div className="col-lg-3 col-md-6">
          <div
            className="card border-0 shadow rounded-4 h-100"
            style={{ minHeight: "245px" }}
          >
            {/* Header */}

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
                  <h6 className="fw-bold mb-0">Recent Activities</h6>

                  <small className="text-muted">Latest updates</small>
                </div>
              </div>
            </div>

            {/* Body */}

            <div className="card-body px-3 pt-2">
              {activities.map((activity, index) => (
                <div
                  key={activity.title}
                  className="d-flex position-relative"
                  style={{
                    marginBottom:
                      index === activities.length - 1 ? "0" : "14px",
                  }}
                >
                  {/* Timeline */}

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

                  {/* Content */}

                  <div className="ms-3">
                    <h6
                      className="mb-1 fw-semibold"
                      style={{ fontSize: "12.5px" }}
                    >
                      {activity.title}
                    </h6>

                    <small
                      className="text-muted"
                      style={{ fontSize: "11px" }}
                    >
                      {activity.time}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= FEE COLLECTION ================= */}

        <div className="col-lg-6">
          <div
            className="card border-0 shadow rounded-4 h-100"
            style={{ minHeight: "245px" }}
          >
            {/* Header */}

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
                    <h6 className="fw-bold mb-0">Fee Collection</h6>

                    <small className="text-muted">This month's overview</small>
                  </div>
                </div>

                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                  This Month
                </span>
              </div>
            </div>

            {/* Charts */}

            <div
              className="card-body px-2 py-1"
              style={{
                overflow: "hidden",
              }}
            >
              <div className="row align-items-center h-100">
                {/* Donut */}

                <div className="col-md-5 col-12 d-flex justify-content-center align-items-center">
                  <div style={{ width: "100%", height: "190px" }}>
                    <FeeCollectionDonut />
                  </div>
                </div>

                {/* Bar Chart */}

                <div className="col-md-7 col-12 d-flex justify-content-center align-items-center">
                  <div style={{ width: "100%", height: "190px" }}>
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