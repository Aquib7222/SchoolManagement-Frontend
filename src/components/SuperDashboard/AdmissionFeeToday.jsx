// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axios from "../../api/axiosInstance";
// const AdmissionFeeToday = () => {
//   const tableSlider = {
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
//   const [recentAdmissions, setRecentAdmissions] = useState([]);
//   const [pendingFee, setPendingFee] = useState([]);
//   const [paidFee, setPaidFee] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;
//   const token = localStorage.getItem("token");

//   // pending fee api
//   useEffect(() => {
//     if (!schoolId) return;
//     const res = axios
//       .get("/api/student-fee/all", {
//         // params:{status:"UNPAID"},
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         const result = (res.data || []).filter(
//           (item) => item.status === "UNPAID",
//         );
//         const Paid = (res.data || []).filter(
//           (item) => item.status === "PAID" || item.status === "PARTIAL",
//         );
//         setPaidFee(Paid);
//         setPendingFee(result);
//       })

//       .catch(console.error);
//   }, [schoolId]);

//   //   ------------------Recent Admissions -----------------------
//   useEffect(() => {
//     if (!schoolId) return;

//     axios
//       .get("/api/admissions/school", {
//         params: { schoolId },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         const list = Array.isArray(res.data) ? res.data : [];

//         const today = new Date();
//         today.setHours(23, 59, 59, 999);

//         const twoMonthsAgo = new Date();
//         twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
//         twoMonthsAgo.setHours(0, 0, 0, 0);

//         const filtered = list
//           .filter((student) => {
//             if (!student.today) return false;

//             const admissionDate = new Date(student.today);

//             return admissionDate >= twoMonthsAgo && admissionDate <= today;
//           })
//           .sort((a, b) => new Date(b.today) - new Date(a.today));

//         setRecentAdmissions(filtered);
//       })
//       .catch(console.error);
//   }, [schoolId, token]);

//   return (
//     <>
//       <div className="container-fluid px-0 mt-3">
//         <div className="row g-3">
//           {/* ===================== Recent Admissions ====================== */}

//           <div className="col-lg-5">
//             <div className="card border-0 shadow rounded-4 h-100">
//               <div className="card-header bg-white border-0">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h6 className="fw-bold text-primary mb-0">
//                     🧑 Recent Admissions
//                   </h6>

//                   <button className="btn btn-sm btn-outline-primary">
//                     View All
//                   </button>
//                 </div>
//               </div>

//               <div className="card-body p-2">
//                 <table className="table table-hover align-middle">
//                   <thead>
//                     <tr>
//                       <th>Student</th>

//                       <th>Class</th>

//                       <th>Date</th>
//                     </tr>
//                   </thead>
//                 </table>

//                 <Slider {...tableSlider}>
//                   {recentAdmissions.map((a) => (
//                     <div key={a.admissionId}>
//                       <table className="table align-middle mb-0">
//                         <tbody>
//                           <tr>
//                             <td width="55">
//                               <img
//                                 src={`https://ui-avatars.com/api/?background=2563eb&color=fff&name=${a.firstName}+${a.lastName}`}
//                                 className="rounded-circle"
//                                 width="40"
//                                 height="40"
//                               />
//                             </td>

//                             <td>
//                               <strong>
//                                 {a.firstName} {a.lastName}
//                               </strong>

//                               <br />

//                               <small className="text-muted">
//                                 {a.admissionNumber}
//                               </small>
//                             </td>

//                             <td>
//                               <span className="badge bg-primary">
//                                 {a.studentClass === "NURSERY"
//                                   ? "NUR"
//                                   : a.studentClass}
//                               </span>
//                             </td>

//                             <td>
//                               <small>
//                                 {new Date(a.today).toLocaleDateString("en-IN")}
//                               </small>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   ))}
//                 </Slider>
//               </div>
//             </div>
//           </div>

//           {/* ===================== Fee Pending ====================== */}

//           <div className="col-lg-4">
//             <div className="card border-0 shadow rounded-4 h-100">
//               <div className="card-header bg-white border-0">
//                 <div className="d-flex justify-content-between">
//                   <h6 className="fw-bold text-danger">💰 Fee Pending</h6>

//                   <button className="btn btn-sm btn-outline-danger">
//                     View All
//                   </button>
//                 </div>
//               </div>

//               <div className="card-body p-2">
//                 <Slider {...tableSlider}>
//                   {pendingFee.map((a) => (
//                     <div key={a.id}>
//                       <table className="table align-middle">
//                         <tbody>
//                           <tr>
//                             <td width="55">
//                               <img
//                                 src={`https://ui-avatars.com/api/?background=ef4444&color=fff&name=${a.studentName}`}
//                                 className="rounded-circle"
//                                 width="40"
//                                 height="40"
//                               />
//                             </td>

//                             <td>
//                               <strong>{a.studentName}</strong>

//                               <br />

//                               <small>{a.admissionNumber}</small>
//                             </td>

//                             <td>
//                               <span className="badge bg-info">
//                                 {a.studentClass === "NURSERY"
//                                   ? "NUR"
//                                   : a.studentClass}
//                               </span>
//                             </td>

//                             <td>
//                               <span className="badge bg-danger">
//                                 ₹ {a.amount}
//                               </span>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   ))}
//                 </Slider>
//               </div>
//             </div>
//           </div>

//           {/* ===================== Today's Events ====================== */}

//           <div className="col-lg-3">
//             <div className="card border-0 shadow rounded-4 h-100">
//               <div className="card-header bg-white border-0">
//                 <div className="d-flex justify-content-between">
//                   <h6 className="fw-bold text-success">📅 Today's Events</h6>

//                   <button className="btn btn-sm btn-outline-success">
//                     View All
//                   </button>
//                 </div>
//               </div>

//               <div className="card-body">
//                 <div className="border-start border-4 border-primary ps-3 mb-4">
//                   <span className="badge bg-primary">10:00 AM</span>

//                   <h6 className="mt-2">Cricket Match</h6>

//                   <small>School Ground</small>
//                 </div>

//                 <div className="border-start border-4 border-success ps-3 mb-4">
//                   <span className="badge bg-success">01:00 PM</span>

//                   <h6 className="mt-2">Cultural Program</h6>

//                   <small>Auditorium</small>
//                 </div>

//                 <div className="border-start border-4 border-warning ps-3">
//                   <span className="badge bg-warning text-dark">03:00 PM</span>

//                   <h6 className="mt-2">Quiz Competition</h6>

//                   <small>Smart Class</small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdmissionFeeToday;


import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "../../api/axiosInstance";

const AdmissionFeeToday = () => {
  const [recentAdmissions, setRecentAdmissions] = useState([]);
  const [pendingFee, setPendingFee] = useState([]);

  const [loadingAdmissions, setLoadingAdmissions] = useState(true);
  const [loadingFees, setLoadingFees] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  const tableSlider = {
    dots: false,
    arrows: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 2800,
    pauseOnHover: true,
  };

  // =========================================================
  // TODAY DATE
  // =========================================================

  const getToday = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // =========================================================
  // RECENT ADMISSIONS
  // =========================================================

  useEffect(() => {
    if (!schoolId) return;

    const fetchAdmissions = async () => {
      try {
        setLoadingAdmissions(true);

        const res = await axios.get("/api/admissions/school", {
          params: {
            schoolId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const list = Array.isArray(res.data) ? res.data : [];

        const today = new Date();
        today.setHours(23, 59, 59, 999);

        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
        twoMonthsAgo.setHours(0, 0, 0, 0);

        const filtered = list
          .filter((student) => {
            if (!student.today) return false;

            const admissionDate = new Date(student.today);

            return (
              admissionDate >= twoMonthsAgo &&
              admissionDate <= today
            );
          })
          .sort(
            (a, b) =>
              new Date(b.today) - new Date(a.today)
          );

        setRecentAdmissions(filtered);
      } catch (error) {
        console.error(
          "Admission API Error:",
          error.response?.data || error.message
        );
      } finally {
        setLoadingAdmissions(false);
      }
    };

    fetchAdmissions();
  }, [schoolId, token]);

  // =========================================================
  // PENDING FEE
  // =========================================================

  useEffect(() => {
    if (!schoolId) return;

    const fetchPendingFees = async () => {
      try {
        setLoadingFees(true);

        const res = await axios.get("/api/student-fee/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const list = Array.isArray(res.data)
          ? res.data
          : [];

        const pending = list.filter(
          (item) => item.status === "UNPAID"
        );

        setPendingFee(pending);
      } catch (error) {
        console.error(
          "Fee API Error:",
          error.response?.data || error.message
        );
      } finally {
        setLoadingFees(false);
      }
    };

    fetchPendingFees();
  }, [schoolId, token]);

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // FORMAT CURRENCY
  // =========================================================

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN");
  };

  // =========================================================
  // AVATAR
  // =========================================================

  const getAvatar = (name, bg = "2563eb") => {
    return `https://ui-avatars.com/api/?background=${bg}&color=fff&bold=true&name=${encodeURIComponent(
      name || "Student"
    )}`;
  };

  return (
    <div className="container-fluid px-0 mt-3">
      <div className="row g-3">

        {/* =====================================================
            RECENT ADMISSIONS
        ===================================================== */}

        <div className="col-xl-5 col-lg-6">
          <div
            className="card border-0 shadow rounded-4 h-100 overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, #ffffff 0%, #f8fbff 100%)",
            }}
          >
            {/* Header */}

            <div className="card-header bg-transparent border-0 px-3 pt-3 pb-2">
              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: 38,
                      height: 38,
                      background:
                        "linear-gradient(135deg,#dbeafe,#eff6ff)",
                    }}
                  >
                    <span style={{ fontSize: 19 }}>
                      🧑‍🎓
                    </span>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-0">
                      Recent Admissions
                    </h6>

                    <small className="text-muted">
                      Last 2 months
                    </small>
                  </div>
                </div>

                <button
                  className="btn btn-sm btn-light border rounded-pill px-3"
                  style={{ fontSize: 12 }}
                >
                  View All
                </button>
              </div>
            </div>

            {/* Table Header */}

            <div className="px-3 pt-2">
              <div
                className="d-grid text-muted border-bottom pb-2"
                style={{
                  gridTemplateColumns:
                    "1fr 70px 80px",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                <span>STUDENT</span>
                <span>CLASS</span>
                <span className="text-end">
                  DATE
                </span>
              </div>
            </div>

            {/* Content */}

            <div
              className="card-body p-0"
              style={{
                minHeight: 210,
                overflow: "hidden",
              }}
            >
              {loadingAdmissions ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: 210 }}
                >
                  <div className="spinner-border spinner-border-sm text-primary" />
                </div>
              ) : recentAdmissions.length === 0 ? (
                <div
                  className="d-flex flex-column justify-content-center align-items-center text-center"
                  style={{ height: 210 }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                    style={{
                      width: 45,
                      height: 45,
                      background: "#f1f5f9",
                    }}
                  >
                    📋
                  </div>

                  <h6 className="mb-1">
                    No Recent Admissions
                  </h6>

                  <small className="text-muted">
                    No admission records found.
                  </small>
                </div>
              ) : (
                <Slider {...tableSlider}>
                  {recentAdmissions.map((a) => {
                    const studentName =
                      `${a.firstName || ""} ${
                        a.lastName || ""
                      }`.trim();

                    return (
                      <div key={a.admissionId || a.id}>
                        <div className="px-3 py-2">
                          <div
                            className="d-grid align-items-center"
                            style={{
                              gridTemplateColumns:
                                "1fr 70px 80px",
                              minHeight: 52,
                            }}
                          >
                            {/* Student */}

                            <div className="d-flex align-items-center">
                              <img
                                src={getAvatar(
                                  studentName,
                                  "2563eb"
                                )}
                                alt={studentName}
                                className="rounded-circle me-2"
                                width="38"
                                height="38"
                                loading="lazy"
                              />

                              <div className="overflow-hidden">
                                <div
                                  className="fw-semibold text-truncate"
                                  style={{
                                    fontSize: 13,
                                  }}
                                >
                                  {studentName ||
                                    "Unknown Student"}
                                </div>

                                <small
                                  className="text-muted"
                                  style={{
                                    fontSize: 10,
                                  }}
                                >
                                  {a.admissionNumber}
                                </small>
                              </div>
                            </div>

                            {/* Class */}

                            <div>
                              <span
                                className="badge rounded-pill"
                                style={{
                                  background: "#eff6ff",
                                  color: "#2563eb",
                                  fontSize: 10,
                                  padding:
                                    "5px 8px",
                                }}
                              >
                                {a.studentClass ===
                                "NURSERY"
                                  ? "NUR"
                                  : a.studentClass ||
                                    "-"}
                              </span>
                            </div>

                            {/* Date */}

                            <div className="text-end">
                              <small
                                className="text-muted"
                                style={{
                                  fontSize: 10,
                                }}
                              >
                                {formatDate(a.today)}
                              </small>
                            </div>
                          </div>
                        </div>

                        <div className="border-bottom mx-3" />
                      </div>
                    );
                  })}
                </Slider>
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            PENDING FEE
        ===================================================== */}

        <div className="col-xl-4 col-lg-6">
          <div
            className="card border-0 shadow rounded-4 h-100 overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg,#ffffff 0%,#fffafa 100%)",
            }}
          >
            {/* Header */}

            <div className="card-header bg-transparent border-0 px-3 pt-3 pb-2">
              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: 38,
                      height: 38,
                      background:
                        "linear-gradient(135deg,#fee2e2,#fff1f2)",
                    }}
                  >
                    <span style={{ fontSize: 19 }}>
                      💰
                    </span>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-0">
                      Fee Pending
                    </h6>

                    <small className="text-muted">
                      Outstanding payments
                    </small>
                  </div>
                </div>

                <button
                  className="btn btn-sm btn-light border rounded-pill px-3"
                  style={{
                    fontSize: 12,
                    color: "#dc2626",
                  }}
                >
                  View All
                </button>
              </div>
            </div>

            {/* Content */}

            <div
              className="card-body p-0"
              style={{
                minHeight: 245,
                overflow: "hidden",
              }}
            >
              {loadingFees ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: 245 }}
                >
                  <div className="spinner-border spinner-border-sm text-danger" />
                </div>
              ) : pendingFee.length === 0 ? (
                <div
                  className="d-flex flex-column justify-content-center align-items-center text-center"
                  style={{ height: 245 }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                    style={{
                      width: 48,
                      height: 48,
                      background: "#ecfdf5",
                    }}
                  >
                    ✓
                  </div>

                  <h6 className="mb-1 text-success">
                    All Fees Cleared
                  </h6>

                  <small className="text-muted">
                    No pending fee found.
                  </small>
                </div>
              ) : (
                <Slider {...tableSlider}>
                  {pendingFee.map((a) => (
                    <div key={a.id}>
                      <div className="px-3 py-2">
                        <div
                          className="d-flex align-items-center"
                          style={{ minHeight: 58 }}
                        >
                          {/* Avatar */}

                          <img
                            src={getAvatar(
                              a.studentName,
                              "ef4444"
                            )}
                            alt={a.studentName}
                            className="rounded-circle me-2"
                            width="38"
                            height="38"
                            loading="lazy"
                          />

                          {/* Student */}

                          <div className="flex-grow-1 overflow-hidden">
                            <div
                              className="fw-semibold text-truncate"
                              style={{
                                fontSize: 13,
                              }}
                            >
                              {a.studentName ||
                                "Unknown Student"}
                            </div>

                            <div
                              className="d-flex align-items-center gap-2"
                              style={{
                                fontSize: 10,
                              }}
                            >
                              <span className="text-muted">
                                {a.admissionNumber}
                              </span>

                              <span
                                className="badge rounded-pill"
                                style={{
                                  background:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                  fontSize: 9,
                                }}
                              >
                                {a.studentClass ===
                                "NURSERY"
                                  ? "NUR"
                                  : a.studentClass ||
                                    "-"}
                              </span>
                            </div>
                          </div>

                          {/* Amount */}

                          <div className="text-end ms-2">
                            <div
                              className="fw-bold text-danger"
                              style={{
                                fontSize: 14,
                              }}
                            >
                              ₹
                              {formatAmount(
                                a.amount
                              )}
                            </div>

                            <small
                              className="text-muted"
                              style={{
                                fontSize: 9,
                              }}
                            >
                              Pending
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className="border-bottom mx-3" />
                    </div>
                  ))}
                </Slider>
              )}
            </div>

            {/* Footer */}

            {!loadingFees &&
              pendingFee.length > 0 && (
                <div className="px-3 pb-3">
                  <div
                    className="rounded-3 px-3 py-2 d-flex justify-content-between align-items-center"
                    style={{
                      background: "#fff1f2",
                    }}
                  >
                    <small className="text-danger">
                      Total Pending
                    </small>

                    <strong className="text-danger">
                      ₹
                      {formatAmount(
                        pendingFee.reduce(
                          (sum, item) =>
                            sum +
                            Number(
                              item.amount || 0
                            ),
                          0
                        )
                      )}
                    </strong>
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* =====================================================
            TODAY'S EVENTS
        ===================================================== */}

        <div className="col-xl-3 col-lg-12">
          <div
            className="card border-0 shadow rounded-4 h-100 overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg,#ffffff 0%,#f9fffb 100%)",
            }}
          >
            {/* Header */}

            <div className="card-header bg-transparent border-0 px-3 pt-3 pb-2">
              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: 38,
                      height: 38,
                      background:
                        "linear-gradient(135deg,#dcfce7,#f0fdf4)",
                    }}
                  >
                    <span style={{ fontSize: 18 }}>
                      📅
                    </span>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-0">
                      Today's Events
                    </h6>

                    <small className="text-muted">
                      {getToday()}
                    </small>
                  </div>
                </div>

                <button
                  className="btn btn-sm btn-light border rounded-pill px-3"
                  style={{
                    fontSize: 12,
                    color: "#16a34a",
                  }}
                >
                  All
                </button>
              </div>
            </div>

            {/* Events */}

            <div className="card-body pt-2">

              {/* Event 1 */}

              <div
                className="d-flex position-relative mb-3"
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: 34,
                    height: 34,
                    background: "#eff6ff",
                    color: "#2563eb",
                    fontSize: 14,
                  }}
                >
                  🏏
                </div>

                <div className="ms-2">
                  <div
                    className="text-primary fw-semibold"
                    style={{ fontSize: 11 }}
                  >
                    10:00 AM
                  </div>

                  <h6
                    className="mb-0 mt-1"
                    style={{ fontSize: 13 }}
                  >
                    Cricket Match
                  </h6>

                  <small
                    className="text-muted"
                    style={{ fontSize: 10 }}
                  >
                    School Ground
                  </small>
                </div>
              </div>

              {/* Event 2 */}

              <div
                className="d-flex position-relative mb-3"
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: 34,
                    height: 34,
                    background: "#ecfdf5",
                    color: "#16a34a",
                    fontSize: 14,
                  }}
                >
                  🎭
                </div>

                <div className="ms-2">
                  <div
                    className="text-success fw-semibold"
                    style={{ fontSize: 11 }}
                  >
                    01:00 PM
                  </div>

                  <h6
                    className="mb-0 mt-1"
                    style={{ fontSize: 13 }}
                  >
                    Cultural Program
                  </h6>

                  <small
                    className="text-muted"
                    style={{ fontSize: 10 }}
                  >
                    Auditorium
                  </small>
                </div>
              </div>

              {/* Event 3 */}

              <div className="d-flex position-relative">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: 34,
                    height: 34,
                    background: "#fffbeb",
                    color: "#d97706",
                    fontSize: 14,
                  }}
                >
                  🧠
                </div>

                <div className="ms-2">
                  <div
                    className="fw-semibold"
                    style={{
                      fontSize: 11,
                      color: "#d97706",
                    }}
                  >
                    03:00 PM
                  </div>

                  <h6
                    className="mb-0 mt-1"
                    style={{ fontSize: 13 }}
                  >
                    Quiz Competition
                  </h6>

                  <small
                    className="text-muted"
                    style={{ fontSize: 10 }}
                  >
                    Smart Class
                  </small>
                </div>
              </div>
            </div>

            {/* Footer */}

            <div className="px-3 pb-3 mt-auto">
              <div
                className="rounded-3 text-center py-2"
                style={{
                  background: "#f0fdf4",
                  color: "#16a34a",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {recentAdmissions.length > 0
                  ? `${recentAdmissions.length} recent admissions`
                  : "School activity"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionFeeToday;
