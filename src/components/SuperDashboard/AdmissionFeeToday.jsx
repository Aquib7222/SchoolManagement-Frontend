

// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axios from "../../api/axiosInstance";

// const AdmissionFeeToday = () => {
//   const [recentAdmissions, setRecentAdmissions] = useState([]);
//   const [pendingFee, setPendingFee] = useState([]);

//   const [loadingAdmissions, setLoadingAdmissions] = useState(true);
//   const [loadingFees, setLoadingFees] = useState(true);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;
//   const token = localStorage.getItem("token");

//   const tableSlider = {
//     dots: false,
//     arrows: false,
//     infinite: true,
//     vertical: true,
//     verticalSwiping: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 600,
//     autoplaySpeed: 2800,
//     pauseOnHover: true,
//   };

//   // =========================================================
//   // TODAY DATE
//   // =========================================================

//   const getToday = () => {
//     const date = new Date();

//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");

//     return `${year}-${month}-${day}`;
//   };

//   // =========================================================
//   // RECENT ADMISSIONS
//   // =========================================================

//   useEffect(() => {
//     if (!schoolId) return;

//     const fetchAdmissions = async () => {
//       try {
//         setLoadingAdmissions(true);

//         const res = await axios.get("/api/admissions/school", {
//           params: {
//             schoolId,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

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

//             return (
//               admissionDate >= twoMonthsAgo &&
//               admissionDate <= today
//             );
//           })
//           .sort(
//             (a, b) =>
//               new Date(b.today) - new Date(a.today)
//           );

//         setRecentAdmissions(filtered);
//       } catch (error) {
//         console.error(
//           "Admission API Error:",
//           error.response?.data || error.message
//         );
//       } finally {
//         setLoadingAdmissions(false);
//       }
//     };

//     fetchAdmissions();
//   }, [schoolId, token]);

//   // =========================================================
//   // PENDING FEE
//   // =========================================================

//  useEffect(() => {
//   if (!schoolId) return;

//   const fetchPendingFees = async () => {
//     try {
//       setLoadingFees(true);

//       const res = await axios.get(
//         "/api/student-fee/all",
//         {
//           params: {
//             schoolId,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const list = Array.isArray(res.data)
//         ? res.data
//         : [];

//       const pending = list.filter(
//         (item) => item.status === "UNPAID"
//       );

//       setPendingFee(pending);

//     } catch (error) {
//       console.error(
//         "Fee API Error:",
//         error.response?.data || error.message
//       );
//     } finally {
//       setLoadingFees(false);
//     }
//   };

//   fetchPendingFees();
// }, [schoolId, token]);

//   // =========================================================
//   // FORMAT DATE
//   // =========================================================

//   const formatDate = (date) => {
//     if (!date) return "-";

//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // =========================================================
//   // FORMAT CURRENCY
//   // =========================================================

//   const formatAmount = (amount) => {
//     return Number(amount || 0).toLocaleString("en-IN");
//   };

//   // =========================================================
//   // AVATAR
//   // =========================================================

//   const getAvatar = (name, bg = "2563eb") => {
//     return `https://ui-avatars.com/api/?background=${bg}&color=fff&bold=true&name=${encodeURIComponent(
//       name || "Student"
//     )}`;
//   };

//   return (
//     <div className="container-fluid px-0 mt-3">
//       <div className="row g-3">

//         {/* =====================================================
//             RECENT ADMISSIONS
//         ===================================================== */}

//         <div className="col-xl-5 col-lg-6">
//           <div
//             className="card border-0 shadow rounded-4 h-100 overflow-hidden"
//             style={{
//               background:
//                 "linear-gradient(145deg, #ffffff 0%, #f8fbff 100%)",
//             }}
//           >
//             {/* Header */}

//             <div className="card-header bg-transparent border-0 px-3 pt-3 pb-2">
//               <div className="d-flex justify-content-between align-items-center">

//                 <div className="d-flex align-items-center gap-2">
//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-3"
//                     style={{
//                       width: 38,
//                       height: 38,
//                       background:
//                         "linear-gradient(135deg,#dbeafe,#eff6ff)",
//                     }}
//                   >
//                     <span style={{ fontSize: 19 }}>
//                       🧑‍🎓
//                     </span>
//                   </div>

//                   <div>
//                     <h6 className="fw-bold mb-0">
//                       Recent Admissions
//                     </h6>

//                     <small className="text-muted">
//                       Last 2 months
//                     </small>
//                   </div>
//                 </div>

//                 <button
//                   className="btn btn-sm btn-light border rounded-pill px-3"
//                   style={{ fontSize: 12 }}
//                 >
//                   View All
//                 </button>
//               </div>
//             </div>

//             {/* Table Header */}

//             <div className="px-3 pt-2">
//               <div
//                 className="d-grid text-muted border-bottom pb-2"
//                 style={{
//                   gridTemplateColumns:
//                     "1fr 70px 80px",
//                   fontSize: 11,
//                   fontWeight: 600,
//                 }}
//               >
//                 <span>STUDENT</span>
//                 <span>CLASS</span>
//                 <span className="text-end">
//                   DATE
//                 </span>
//               </div>
//             </div>

//             {/* Content */}

//             <div
//               className="card-body p-0"
//               style={{
//                 minHeight: 210,
//                 overflow: "hidden",
//               }}
//             >
//               {loadingAdmissions ? (
//                 <div
//                   className="d-flex justify-content-center align-items-center"
//                   style={{ height: 210 }}
//                 >
//                   <div className="spinner-border spinner-border-sm text-primary" />
//                 </div>
//               ) : recentAdmissions.length === 0 ? (
//                 <div
//                   className="d-flex flex-column justify-content-center align-items-center text-center"
//                   style={{ height: 210 }}
//                 >
//                   <div
//                     className="rounded-circle d-flex align-items-center justify-content-center mb-2"
//                     style={{
//                       width: 45,
//                       height: 45,
//                       background: "#f1f5f9",
//                     }}
//                   >
//                     📋
//                   </div>

//                   <h6 className="mb-1">
//                     No Recent Admissions
//                   </h6>

//                   <small className="text-muted">
//                     No admission records found.
//                   </small>
//                 </div>
//               ) : (
//                 <Slider {...tableSlider}>
//                   {recentAdmissions.map((a) => {
//                     const studentName =
//                       `${a.firstName || ""} ${
//                         a.lastName || ""
//                       }`.trim();

//                     return (
//                       <div key={a.admissionId || a.id}>
//                         <div className="px-3 py-2">
//                           <div
//                             className="d-grid align-items-center"
//                             style={{
//                               gridTemplateColumns:
//                                 "1fr 70px 80px",
//                               minHeight: 52,
//                             }}
//                           >
//                             {/* Student */}

//                             <div className="d-flex align-items-center">
//                               <img
//                                 src={getAvatar(
//                                   studentName,
//                                   "2563eb"
//                                 )}
//                                 alt={studentName}
//                                 className="rounded-circle me-2"
//                                 width="38"
//                                 height="38"
//                                 loading="lazy"
//                               />

//                               <div className="overflow-hidden">
//                                 <div
//                                   className="fw-semibold text-truncate"
//                                   style={{
//                                     fontSize: 13,
//                                   }}
//                                 >
//                                   {studentName ||
//                                     "Unknown Student"}
//                                 </div>

//                                 <small
//                                   className="text-muted"
//                                   style={{
//                                     fontSize: 10,
//                                   }}
//                                 >
//                                   {a.admissionNumber}
//                                 </small>
//                               </div>
//                             </div>

//                             {/* Class */}

//                             <div>
//                               <span
//                                 className="badge rounded-pill"
//                                 style={{
//                                   background: "#eff6ff",
//                                   color: "#2563eb",
//                                   fontSize: 10,
//                                   padding:
//                                     "5px 8px",
//                                 }}
//                               >
//                                 {a.studentClass ===
//                                 "NURSERY"
//                                   ? "NUR"
//                                   : a.studentClass ||
//                                     "-"}
//                               </span>
//                             </div>

//                             {/* Date */}

//                             <div className="text-end">
//                               <small
//                                 className="text-muted"
//                                 style={{
//                                   fontSize: 10,
//                                 }}
//                               >
//                                 {formatDate(a.today)}
//                               </small>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="border-bottom mx-3" />
//                       </div>
//                     );
//                   })}
//                 </Slider>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* =====================================================
//             PENDING FEE
//         ===================================================== */}

//         <div className="col-xl-4 col-lg-6">
//           <div
//             className="card border-0 shadow rounded-4 h-100 overflow-hidden"
//             style={{
//               background:
//                 "linear-gradient(145deg,#ffffff 0%,#fffafa 100%)",
//             }}
//           >
//             {/* Header */}

//             <div className="card-header bg-transparent border-0 px-3 pt-3 pb-2">
//               <div className="d-flex justify-content-between align-items-center">

//                 <div className="d-flex align-items-center gap-2">
//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-3"
//                     style={{
//                       width: 38,
//                       height: 38,
//                       background:
//                         "linear-gradient(135deg,#fee2e2,#fff1f2)",
//                     }}
//                   >
//                     <span style={{ fontSize: 19 }}>
//                       💰
//                     </span>
//                   </div>

//                   <div>
//                     <h6 className="fw-bold mb-0">
//                       Fee Pending
//                     </h6>

//                     <small className="text-muted">
//                       Outstanding payments
//                     </small>
//                   </div>
//                 </div>

//                 <button
//                   className="btn btn-sm btn-light border rounded-pill px-3"
//                   style={{
//                     fontSize: 12,
//                     color: "#dc2626",
//                   }}
//                 >
//                   View All
//                 </button>
//               </div>
//             </div>

//             {/* Content */}

//             <div
//               className="card-body p-0"
//               style={{
//                 minHeight: 245,
//                 overflow: "hidden",
//               }}
//             >
//               {loadingFees ? (
//                 <div
//                   className="d-flex justify-content-center align-items-center"
//                   style={{ height: 245 }}
//                 >
//                   <div className="spinner-border spinner-border-sm text-danger" />
//                 </div>
//               ) : pendingFee.length === 0 ? (
//                 <div
//                   className="d-flex flex-column justify-content-center align-items-center text-center"
//                   style={{ height: 245 }}
//                 >
//                   <div
//                     className="rounded-circle d-flex align-items-center justify-content-center mb-2"
//                     style={{
//                       width: 48,
//                       height: 48,
//                       background: "#ecfdf5",
//                     }}
//                   >
//                     ✓
//                   </div>

//                   <h6 className="mb-1 text-success">
//                     All Fees Cleared
//                   </h6>

//                   <small className="text-muted">
//                     No pending fee found.
//                   </small>
//                 </div>
//               ) : (
//                 <Slider {...tableSlider}>
//                   {pendingFee.map((a) => (
//                     <div key={a.id}>
//                       <div className="px-3 py-2">
//                         <div
//                           className="d-flex align-items-center"
//                           style={{ minHeight: 58 }}
//                         >
//                           {/* Avatar */}

//                           <img
//                             src={getAvatar(
//                               a.studentName,
//                               "ef4444"
//                             )}
//                             alt={a.studentName}
//                             className="rounded-circle me-2"
//                             width="38"
//                             height="38"
//                             loading="lazy"
//                           />

//                           {/* Student */}

//                           <div className="flex-grow-1 overflow-hidden">
//                             <div
//                               className="fw-semibold text-truncate"
//                               style={{
//                                 fontSize: 13,
//                               }}
//                             >
//                               {a.studentName ||
//                                 "Unknown Student"}
//                             </div>

//                             <div
//                               className="d-flex align-items-center gap-2"
//                               style={{
//                                 fontSize: 10,
//                               }}
//                             >
//                               <span className="text-muted">
//                                 {a.admissionNumber}
//                               </span>

//                               <span
//                                 className="badge rounded-pill"
//                                 style={{
//                                   background:
//                                     "#eff6ff",
//                                   color:
//                                     "#2563eb",
//                                   fontSize: 9,
//                                 }}
//                               >
//                                 {a.studentClass ===
//                                 "NURSERY"
//                                   ? "NUR"
//                                   : a.studentClass ||
//                                     "-"}
//                               </span>
//                             </div>
//                           </div>

//                           {/* Amount */}

//                           <div className="text-end ms-2">
//                             <div
//                               className="fw-bold text-danger"
//                               style={{
//                                 fontSize: 14,
//                               }}
//                             >
//                               ₹
//                               {formatAmount(
//                                 a.amount
//                               )}
//                             </div>

//                             <small
//                               className="text-muted"
//                               style={{
//                                 fontSize: 9,
//                               }}
//                             >
//                               Pending
//                             </small>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="border-bottom mx-3" />
//                     </div>
//                   ))}
//                 </Slider>
//               )}
//             </div>

//             {/* Footer */}

//             {!loadingFees &&
//               pendingFee.length > 0 && (
//                 <div className="px-3 pb-3">
//                   <div
//                     className="rounded-3 px-3 py-2 d-flex justify-content-between align-items-center"
//                     style={{
//                       background: "#fff1f2",
//                     }}
//                   >
//                     <small className="text-danger">
//                       Total Pending
//                     </small>

//                     <strong className="text-danger">
//                       ₹
//                       {formatAmount(
//                         pendingFee.reduce(
//                           (sum, item) =>
//                             sum +
//                             Number(
//                               item.amount || 0
//                             ),
//                           0
//                         )
//                       )}
//                     </strong>
//                   </div>
//                 </div>
//               )}
//           </div>
//         </div>

//         {/* =====================================================
//             TODAY'S EVENTS
//         ===================================================== */}

//         <div className="col-xl-3 col-lg-12">
//           <div
//             className="card border-0 shadow rounded-4 h-100 overflow-hidden"
//             style={{
//               background:
//                 "linear-gradient(145deg,#ffffff 0%,#f9fffb 100%)",
//             }}
//           >
//             {/* Header */}

//             <div className="card-header bg-transparent border-0 px-3 pt-3 pb-2">
//               <div className="d-flex justify-content-between align-items-center">

//                 <div className="d-flex align-items-center gap-2">
//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-3"
//                     style={{
//                       width: 38,
//                       height: 38,
//                       background:
//                         "linear-gradient(135deg,#dcfce7,#f0fdf4)",
//                     }}
//                   >
//                     <span style={{ fontSize: 18 }}>
//                       📅
//                     </span>
//                   </div>

//                   <div>
//                     <h6 className="fw-bold mb-0">
//                       Today's Events
//                     </h6>

//                     <small className="text-muted">
//                       {getToday()}
//                     </small>
//                   </div>
//                 </div>

//                 <button
//                   className="btn btn-sm btn-light border rounded-pill px-3"
//                   style={{
//                     fontSize: 12,
//                     color: "#16a34a",
//                   }}
//                 >
//                   All
//                 </button>
//               </div>
//             </div>

//             {/* Events */}

//             <div className="card-body pt-2">

//               {/* Event 1 */}

//               <div
//                 className="d-flex position-relative mb-3"
//               >
//                 <div
//                   className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
//                   style={{
//                     width: 34,
//                     height: 34,
//                     background: "#eff6ff",
//                     color: "#2563eb",
//                     fontSize: 14,
//                   }}
//                 >
//                   🏏
//                 </div>

//                 <div className="ms-2">
//                   <div
//                     className="text-primary fw-semibold"
//                     style={{ fontSize: 11 }}
//                   >
//                     10:00 AM
//                   </div>

//                   <h6
//                     className="mb-0 mt-1"
//                     style={{ fontSize: 13 }}
//                   >
//                     Cricket Match
//                   </h6>

//                   <small
//                     className="text-muted"
//                     style={{ fontSize: 10 }}
//                   >
//                     School Ground
//                   </small>
//                 </div>
//               </div>

//               {/* Event 2 */}

//               <div
//                 className="d-flex position-relative mb-3"
//               >
//                 <div
//                   className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
//                   style={{
//                     width: 34,
//                     height: 34,
//                     background: "#ecfdf5",
//                     color: "#16a34a",
//                     fontSize: 14,
//                   }}
//                 >
//                   🎭
//                 </div>

//                 <div className="ms-2">
//                   <div
//                     className="text-success fw-semibold"
//                     style={{ fontSize: 11 }}
//                   >
//                     01:00 PM
//                   </div>

//                   <h6
//                     className="mb-0 mt-1"
//                     style={{ fontSize: 13 }}
//                   >
//                     Cultural Program
//                   </h6>

//                   <small
//                     className="text-muted"
//                     style={{ fontSize: 10 }}
//                   >
//                     Auditorium
//                   </small>
//                 </div>
//               </div>

//               {/* Event 3 */}

//               <div className="d-flex position-relative">
//                 <div
//                   className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
//                   style={{
//                     width: 34,
//                     height: 34,
//                     background: "#fffbeb",
//                     color: "#d97706",
//                     fontSize: 14,
//                   }}
//                 >
//                   🧠
//                 </div>

//                 <div className="ms-2">
//                   <div
//                     className="fw-semibold"
//                     style={{
//                       fontSize: 11,
//                       color: "#d97706",
//                     }}
//                   >
//                     03:00 PM
//                   </div>

//                   <h6
//                     className="mb-0 mt-1"
//                     style={{ fontSize: 13 }}
//                   >
//                     Quiz Competition
//                   </h6>

//                   <small
//                     className="text-muted"
//                     style={{ fontSize: 10 }}
//                   >
//                     Smart Class
//                   </small>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}

//             <div className="px-3 pb-3 mt-auto">
//               <div
//                 className="rounded-3 text-center py-2"
//                 style={{
//                   background: "#f0fdf4",
//                   color: "#16a34a",
//                   fontSize: 11,
//                   fontWeight: 600,
//                 }}
//               >
//                 {recentAdmissions.length > 0
//                   ? `${recentAdmissions.length} recent admissions`
//                   : "School activity"}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
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

  const [loadingAdmissions, setLoadingAdmissions] =
    useState(true);

  const [loadingFees, setLoadingFees] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  // =========================================================
  // SLIDER
  // =========================================================

  const tableSlider = {
    dots: false,
    arrows: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 4,
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
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

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

        const res = await axios.get(
          "/api/admissions/school",
          {
            params: {
              schoolId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const list = Array.isArray(res.data)
          ? res.data
          : [];

        const today = new Date();

        today.setHours(
          23,
          59,
          59,
          999
        );

        const twoMonthsAgo = new Date();

        twoMonthsAgo.setMonth(
          twoMonthsAgo.getMonth() - 2
        );

        twoMonthsAgo.setHours(
          0,
          0,
          0,
          0
        );

        const filtered = list
          .filter((student) => {
            if (!student.today) {
              return false;
            }

            const admissionDate =
              new Date(student.today);

            return (
              admissionDate >=
                twoMonthsAgo &&
              admissionDate <= today
            );
          })
          .sort(
            (a, b) =>
              new Date(b.today) -
              new Date(a.today)
          );

        setRecentAdmissions(filtered);
      } catch (error) {
        console.error(
          "Admission API Error:",
          error.response?.data ||
            error.message
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

        const res = await axios.get(
          "/api/student-fee/all",
          {
            params: {
              schoolId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const list = Array.isArray(
          res.data
        )
          ? res.data
          : [];

        const pending = list.filter(
          (item) =>
            item.status === "UNPAID"
        );

        setPendingFee(pending);
      } catch (error) {
        console.error(
          "Fee API Error:",
          error.response?.data ||
            error.message
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

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // FORMAT CURRENCY
  // =========================================================

  const formatAmount = (amount) => {
    return Number(
      amount || 0
    ).toLocaleString("en-IN");
  };

  // =========================================================
  // AVATAR
  // =========================================================

  const getAvatar = (
    name,
    bg = "2563eb"
  ) => {
    return `https://ui-avatars.com/api/?background=${bg}&color=fff&bold=true&name=${encodeURIComponent(
      name || "Student"
    )}`;
  };

  // =========================================================
  // TOTAL PENDING
  // =========================================================

  const totalPendingAmount =
    pendingFee.reduce(
      (sum, item) =>
        sum + Number(item.amount || 0),
      0
    );

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      <style>
        {`

        /* =====================================================
           MAIN ROW
        ====================================================== */

        .admission-dashboard-row {
          align-items: stretch;
        }

        .admission-dashboard-col {
          display: flex;
        }

        /* =====================================================
           COMMON CARD
        ====================================================== */

        .admission-premium-card {
          width: 100%;
          min-height: 370px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;

          border: 1px solid #e8eef7;
          border-radius: 20px;

          background: #ffffff;

          box-shadow:
            0 8px 28px
            rgba(31, 56, 88, 0.07);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .admission-premium-card:hover {
          transform: translateY(-3px);

          box-shadow:
            0 15px 35px
            rgba(31, 56, 88, 0.11);
        }

        /* =====================================================
           TOP COLOR LINE
        ====================================================== */

        .admission-premium-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          z-index: 2;
        }

        .admission-card::before {
          background:
            linear-gradient(
              90deg,
              #2563eb,
              #60a5fa,
              #38bdf8
            );
        }

        .fee-card::before {
          background:
            linear-gradient(
              90deg,
              #ef4444,
              #f97316,
              #fb7185
            );
        }

        .event-card::before {
          background:
            linear-gradient(
              90deg,
              #16a34a,
              #22c55e,
              #14b8a6
            );
        }

        /* =====================================================
           HEADER
        ====================================================== */

        .admission-card-header {
          min-height: 78px;
          padding: 16px 16px 11px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom:
            1px solid #edf2f7;

          background:
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f8fbff 100%
            );
        }

        .fee-card .admission-card-header {
          background:
            linear-gradient(
              135deg,
              #ffffff 0%,
              #fff8f8 100%
            );
        }

        .event-card .admission-card-header {
          background:
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f7fff9 100%
            );
        }

        .admission-card-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .admission-card-icon {
          width: 43px;
          height: 43px;
          min-width: 43px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 13px;

          font-size: 20px;

          box-shadow:
            inset 0 1px 0
            rgba(255,255,255,0.8);
        }

        .admission-icon {
          background:
            linear-gradient(
              135deg,
              #dbeafe,
              #eff6ff
            );

          border: 1px solid #cfe1fb;

          box-shadow:
            0 5px 15px
            rgba(37,99,235,0.10);
        }

        .fee-icon {
          background:
            linear-gradient(
              135deg,
              #fee2e2,
              #fff1f2
            );

          border: 1px solid #ffd5d8;

          box-shadow:
            0 5px 15px
            rgba(239,68,68,0.10);
        }

        .event-icon {
          background:
            linear-gradient(
              135deg,
              #dcfce7,
              #f0fdf4
            );

          border: 1px solid #ccefd8;

          box-shadow:
            0 5px 15px
            rgba(22,163,74,0.10);
        }

        .admission-card-title {
          margin: 0;

          color: #172b4d;

          font-size: 13px;
          line-height: 17px;

          font-weight: 800;
          letter-spacing: -0.2px;
        }

        .admission-card-subtitle {
          display: block;

          margin-top: 3px;

          color: #94a1b2;

          font-size: 9px;
          line-height: 12px;

          font-weight: 550;
        }

        /* =====================================================
           VIEW BUTTON
        ====================================================== */

        .admission-view-btn {
          border: 1px solid #dbe5f1;
          background: #ffffff;

          border-radius: 20px;

          padding: 6px 11px;

          font-size: 9px;
          font-weight: 700;

          transition: all 0.2s ease;
        }

        .admission-view-btn:hover {
          transform: translateY(-1px);
        }

        .admission-view-btn.blue {
          color: #2563eb;
        }

        .admission-view-btn.blue:hover {
          background: #eff6ff;
          border-color: #cfe1fb;
        }

        .admission-view-btn.red {
          color: #dc2626;
        }

        .admission-view-btn.red:hover {
          background: #fff1f2;
          border-color: #ffd5d8;
        }

        .admission-view-btn.green {
          color: #16a34a;
        }

        .admission-view-btn.green:hover {
          background: #f0fdf4;
          border-color: #ccefd8;
        }

        /* =====================================================
           TABLE HEADER
        ====================================================== */

        .admission-table-header {
          padding:
            9px 16px 7px;

          border-bottom:
            1px solid #edf2f7;

          background:
            linear-gradient(
              180deg,
              #fafdff,
              #ffffff
            );

          color: #9aa7b7;

          font-size: 8px;
          font-weight: 800;

          letter-spacing: 0.4px;
        }

        /* =====================================================
           CARD CONTENT
        ====================================================== */

        .admission-card-content {
          flex: 1;
          min-height: 0;

          overflow: hidden;
        }

        /* =====================================================
           ADMISSION ROW
        ====================================================== */

        .admission-row {
          min-height: 59px;

          display: grid;
          align-items: center;

          padding: 5px 16px;

          transition:
            background 0.2s ease;
        }

        .admission-row:hover {
          background: #f8fbff;
        }

        .fee-row {
          min-height: 61px;

          display: flex;
          align-items: center;

          padding: 5px 16px;

          transition:
            background 0.2s ease;
        }

        .fee-row:hover {
          background: #fffafa;
        }

        .row-divider {
          height: 1px;
          margin: 0 16px;
          background: #edf2f7;
        }

        /* =====================================================
           AVATAR
        ====================================================== */

        .premium-avatar {
          width: 38px;
          height: 38px;

          border-radius: 50%;

          object-fit: cover;

          border: 2px solid #ffffff;

          box-shadow:
            0 3px 10px
            rgba(31,56,88,0.13);
        }

        /* =====================================================
           STUDENT NAME
        ====================================================== */

        .student-name {
          color: #293b59;

          font-size: 11.5px;
          line-height: 15px;

          font-weight: 750;
        }

        .student-admission {
          color: #9aa7b7;

          font-size: 8px;
          line-height: 11px;

          font-weight: 550;
        }

        /* =====================================================
           CLASS BADGE
        ====================================================== */

        .class-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          min-width: 42px;

          padding: 4px 7px;

          border-radius: 7px;

          background:
            linear-gradient(
              135deg,
              #eff6ff,
              #f5f9ff
            );

          color: #2563eb;

          border: 1px solid #dbe8f8;

          font-size: 8px;
          font-weight: 800;
        }

        /* =====================================================
           DATE
        ====================================================== */

        .admission-date {
          color: #8392a6;

          font-size: 8.5px;
          font-weight: 600;
        }

        /* =====================================================
           FEE AMOUNT
        ====================================================== */

        .pending-amount {
          color: #dc2626;

          font-size: 12px;

          font-weight: 850;

          letter-spacing: -0.2px;
        }

        .pending-label {
          display: block;

          margin-top: 1px;

          color: #a3aebb;

          font-size: 7px;

          font-weight: 650;
        }

        /* =====================================================
           TOTAL PENDING
        ====================================================== */

        .fee-total-box {
          margin: 0 15px 14px;

          padding: 9px 12px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-radius: 11px;

          background:
            linear-gradient(
              135deg,
              #fff1f2,
              #fff7f7
            );

          border: 1px solid #ffdfe2;

          box-shadow:
            0 4px 12px
            rgba(239,68,68,0.05);
        }

        .fee-total-label {
          color: #e05252;

          font-size: 8.5px;

          font-weight: 650;
        }

        .fee-total-amount {
          color: #dc2626;

          font-size: 12px;

          font-weight: 850;
        }

        /* =====================================================
           EMPTY STATE
        ====================================================== */

        .premium-empty {
          height: 100%;

          min-height: 245px;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          text-align: center;
        }

        .empty-icon {
          width: 50px;
          height: 50px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 9px;

          border-radius: 15px;

          font-size: 20px;
        }

        .empty-icon.blue {
          background:
            linear-gradient(
              135deg,
              #eff6ff,
              #f8fbff
            );

          border: 1px solid #dceaff;
        }

        .empty-icon.green {
          background:
            linear-gradient(
              135deg,
              #ecfdf5,
              #f4fff8
            );

          border: 1px solid #d5f1e1;

          color: #16a34a;

          font-size: 22px;
          font-weight: 800;
        }

        .premium-empty-title {
          margin: 0;

          color: #344054;

          font-size: 11px;

          font-weight: 800;
        }

        .premium-empty-text {
          margin: 4px 0 0;

          color: #9aa7b7;

          font-size: 8px;
        }

        /* =====================================================
           LOADING
        ====================================================== */

        .premium-loading {
          height: 245px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .premium-loading .spinner-border {
          width: 25px;
          height: 25px;
        }

        /* =====================================================
           EVENTS
        ====================================================== */

        .event-card-body {
          flex: 1;

          padding:
            13px 16px 8px;

          overflow: hidden;
        }

        .event-item {
          display: flex;

          position: relative;

          padding-bottom: 17px;
        }

        .event-item:not(:last-child)::after {
          content: "";

          position: absolute;

          left: 16px;
          top: 36px;
          bottom: 0;

          width: 1px;

          background:
            linear-gradient(
              180deg,
              #dce8f4,
              #eef3f8
            );
        }

        .event-icon-circle {
          width: 34px;
          height: 34px;
          min-width: 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 11px;

          font-size: 14px;

          z-index: 1;
        }

        .event-blue {
          background:
            linear-gradient(
              135deg,
              #eff6ff,
              #f5f9ff
            );

          color: #2563eb;

          border: 1px solid #dceaff;
        }

        .event-green {
          background:
            linear-gradient(
              135deg,
              #ecfdf5,
              #f4fff8
            );

          color: #16a34a;

          border: 1px solid #d5f1e1;
        }

        .event-orange {
          background:
            linear-gradient(
              135deg,
              #fff7ed,
              #fffbeb
            );

          color: #d97706;

          border: 1px solid #f8e2bf;
        }

        .event-time {
          font-size: 8.5px;

          font-weight: 800;

          line-height: 11px;
        }

        .event-time.blue {
          color: #2563eb;
        }

        .event-time.green {
          color: #16a34a;
        }

        .event-time.orange {
          color: #d97706;
        }

        .event-title {
          margin: 3px 0 0;

          color: #293b59;

          font-size: 11px;
          line-height: 15px;

          font-weight: 750;
        }

        .event-location {
          display: block;

          margin-top: 1px;

          color: #9aa7b7;

          font-size: 8px;

          font-weight: 550;
        }

        /* =====================================================
           EVENT FOOTER
        ====================================================== */

        .event-footer {
          margin:
            0 15px 14px;

          padding: 9px 11px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background:
            linear-gradient(
              135deg,
              #f0fdf4,
              #f5fff8
            );

          color: #16a34a;

          border: 1px solid #d8f0e1;

          font-size: 8.5px;

          font-weight: 700;
        }

        /* =====================================================
           SLIDER FIX
        ====================================================== */

        .slick-slider,
        .slick-list,
        .slick-track {
          height: 100%;
        }

        .slick-slide > div {
          height: auto;
        }

        .slick-vertical .slick-slide {
          border: 0;
        }

        /* =====================================================
           RESPONSIVE
        ====================================================== */

        @media (max-width: 1199px) {

          .admission-premium-card {
            min-height: 365px;
          }

        }

        @media (max-width: 991px) {

          .admission-dashboard-col {
            display: flex;
          }

          .admission-premium-card {
            min-height: 365px;
          }

        }

        @media (max-width: 575px) {

          .admission-card-header {
            padding:
              14px 12px 10px;
          }

          .admission-table-header {
            padding-left: 12px;
            padding-right: 12px;
          }

          .admission-row,
          .fee-row {
            padding-left: 12px;
            padding-right: 12px;
          }

          .row-divider {
            margin-left: 12px;
            margin-right: 12px;
          }

          .admission-card-subtitle {
            display: none;
          }

          .admission-view-btn {
            padding:
              5px 9px;

            font-size: 8px;
          }

          .student-name {
            font-size: 10.5px;
          }

        }

        `}
      </style>

      <div className="container-fluid px-0 mt-3">

        <div className="row g-3 admission-dashboard-row">

          {/* =====================================================
              RECENT ADMISSIONS
          ===================================================== */}

          <div className="col-xl-5 col-lg-6 admission-dashboard-col">

            <div className="admission-premium-card admission-card shadow">

              {/* HEADER */}

              <div className="admission-card-header">

                <div className="admission-card-heading">

                  <div className="admission-card-icon admission-icon">
                    🧑‍🎓
                  </div>

                  <div>

                    <h6 className="admission-card-title">
                      Recent Admissions
                    </h6>

                    <span className="admission-card-subtitle">
                      Last 2 months
                    </span>

                  </div>

                </div>

                <button
                  className="admission-view-btn blue"
                  type="button"
                >
                  View All
                </button>

              </div>

              {/* TABLE HEADER */}

              <div className="admission-table-header">

                <div
                  className="d-grid"
                  style={{
                    gridTemplateColumns:
                      "1fr 70px 80px",
                  }}
                >
                  <span>
                    STUDENT
                  </span>

                  <span>
                    CLASS
                  </span>

                  <span className="text-end">
                    DATE
                  </span>
                </div>

              </div>

              {/* CONTENT */}

              <div className="admission-card-content">

                {loadingAdmissions ? (

                  <div className="premium-loading">
                    <div className="spinner-border text-primary" />
                  </div>

                ) : recentAdmissions.length === 0 ? (

                  <div className="premium-empty">

                    <div className="empty-icon blue">
                      📋
                    </div>

                    <h6 className="premium-empty-title">
                      No Recent Admissions
                    </h6>

                    <p className="premium-empty-text">
                      No admission records found.
                    </p>

                  </div>

                ) : (

                  <Slider {...tableSlider}>

                    {recentAdmissions.map(
                      (a) => {

                        const studentName =
                          `${a.firstName || ""} ${
                            a.lastName || ""
                          }`.trim();

                        return (

                          <div
                            key={
                              a.admissionId ||
                              a.id
                            }
                          >

                            <div
                              className="admission-row"
                              style={{
                                gridTemplateColumns:
                                  "1fr 70px 80px",
                              }}
                            >

                              {/* STUDENT */}

                              <div className="d-flex align-items-center min-w-0">

                                <img
                                  src={getAvatar(
                                    studentName,
                                    "2563eb"
                                  )}
                                  alt={
                                    studentName
                                  }
                                  className="premium-avatar me-2"
                                  width="38"
                                  height="38"
                                  loading="lazy"
                                />

                                <div className="overflow-hidden">

                                  <div className="student-name text-truncate">
                                    {studentName ||
                                      "Unknown Student"}
                                  </div>

                                  <div className="student-admission">
                                    {
                                      a.admissionNumber
                                    }
                                  </div>

                                </div>

                              </div>

                              {/* CLASS */}

                              <div>

                                <span className="class-badge">

                                  {a.studentClass ===
                                  "NURSERY"
                                    ? "NUR"
                                    : a.studentClass ||
                                      "-"}

                                </span>

                              </div>

                              {/* DATE */}

                              <div className="text-end">

                                <span className="admission-date">
                                  {formatDate(
                                    a.today
                                  )}
                                </span>

                              </div>

                            </div>

                            <div className="row-divider" />

                          </div>

                        );
                      }
                    )}

                  </Slider>

                )}

              </div>

            </div>

          </div>

          {/* =====================================================
              PENDING FEE
          ===================================================== */}

          <div className="col-xl-4 col-lg-6 admission-dashboard-col">

            <div className="admission-premium-card fee-card shadow">

              {/* HEADER */}

              <div className="admission-card-header">

                <div className="admission-card-heading">

                  <div className="admission-card-icon fee-icon">
                    💰
                  </div>

                  <div>

                    <h6 className="admission-card-title">
                      Fee Pending
                    </h6>

                    <span className="admission-card-subtitle">
                      Outstanding payments
                    </span>

                  </div>

                </div>

                <button
                  className="admission-view-btn red"
                  type="button"
                >
                  View All
                </button>

              </div>

              {/* CONTENT */}

              <div className="admission-card-content">

                {loadingFees ? (

                  <div className="premium-loading">
                    <div className="spinner-border text-danger" />
                  </div>

                ) : pendingFee.length === 0 ? (

                  <div className="premium-empty">

                    <div className="empty-icon green">
                      ✓
                    </div>

                    <h6 className="premium-empty-title text-success">
                      All Fees Cleared
                    </h6>

                    <p className="premium-empty-text">
                      No pending fee found.
                    </p>

                  </div>

                ) : (

                  <Slider {...tableSlider}>

                    {pendingFee.map(
                      (a) => (

                        <div key={a.id}>

                          <div className="fee-row">

                            {/* AVATAR */}

                            <img
                              src={getAvatar(
                                a.studentName,
                                "ef4444"
                              )}
                              alt={
                                a.studentName
                              }
                              className="premium-avatar me-2"
                              width="38"
                              height="38"
                              loading="lazy"
                            />

                            {/* STUDENT */}

                            <div className="flex-grow-1 overflow-hidden">

                              <div className="student-name text-truncate">
                                {a.studentName ||
                                  "Unknown Student"}
                              </div>

                              <div className="d-flex align-items-center gap-2">

                                <span className="student-admission">
                                  {
                                    a.admissionNumber
                                  }
                                </span>

                                <span className="class-badge">

                                  {a.studentClass ===
                                  "NURSERY"
                                    ? "NUR"
                                    : a.studentClass ||
                                      "-"}

                                </span>

                              </div>

                            </div>

                            {/* AMOUNT */}

                            <div className="text-end ms-2">

                              <div className="pending-amount">
                                ₹
                                {formatAmount(
                                  a.amount
                                )}
                              </div>

                              <span className="pending-label">
                                Pending
                              </span>

                            </div>

                          </div>

                          <div className="row-divider" />

                        </div>

                      )
                    )}

                  </Slider>

                )}

              </div>

              {/* FOOTER */}

              {!loadingFees &&
                pendingFee.length > 0 && (

                  <div className="fee-total-box">

                    <span className="fee-total-label">
                      Total Pending
                    </span>

                    <strong className="fee-total-amount">
                      ₹
                      {formatAmount(
                        totalPendingAmount
                      )}
                    </strong>

                  </div>

                )}

            </div>

          </div>

          {/* =====================================================
              TODAY'S EVENTS
          ===================================================== */}

          <div className="col-xl-3 col-lg-12 admission-dashboard-col">

            <div className="admission-premium-card event-card shadow">

              {/* HEADER */}

              <div className="admission-card-header">

                <div className="admission-card-heading">

                  <div className="admission-card-icon event-icon">
                    📅
                  </div>

                  <div>

                    <h6 className="admission-card-title">
                      Today's Events
                    </h6>

                    <span className="admission-card-subtitle">
                      {getToday()}
                    </span>

                  </div>

                </div>

                <button
                  className="admission-view-btn green"
                  type="button"
                >
                  All
                </button>

              </div>

              {/* EVENTS */}

              <div className="event-card-body">

                {/* EVENT 1 */}

                <div className="event-item">

                  <div className="event-icon-circle event-blue">
                    🏏
                  </div>

                  <div className="ms-2">

                    <div className="event-time blue">
                      10:00 AM
                    </div>

                    <h6 className="event-title">
                      Cricket Match
                    </h6>

                    <span className="event-location">
                      School Ground
                    </span>

                  </div>

                </div>

                {/* EVENT 2 */}

                <div className="event-item">

                  <div className="event-icon-circle event-green">
                    🎭
                  </div>

                  <div className="ms-2">

                    <div className="event-time green">
                      01:00 PM
                    </div>

                    <h6 className="event-title">
                      Cultural Program
                    </h6>

                    <span className="event-location">
                      Auditorium
                    </span>

                  </div>

                </div>

                {/* EVENT 3 */}

                <div className="event-item">

                  <div className="event-icon-circle event-orange">
                    🧠
                  </div>

                  <div className="ms-2">

                    <div className="event-time orange">
                      03:00 PM
                    </div>

                    <h6 className="event-title">
                      Quiz Competition
                    </h6>

                    <span className="event-location">
                      Smart Class
                    </span>

                  </div>

                </div>

              </div>

              {/* FOOTER */}

              <div className="event-footer">

                {recentAdmissions.length > 0
                  ? `${recentAdmissions.length} recent admissions`
                  : "School activity"}

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default AdmissionFeeToday;