// import { useEffect, useState } from "react";
// import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
// import { MdPayments } from "react-icons/md";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";
// import axios from "../../api/axiosInstance";

// const CardHead = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;
//   const token = localStorage.getItem("token");

//   const [totalStudents, setTotalStudents] = useState(0);
//   const [totalTeachers, setTotalTeachers] = useState([]);
//   const [students, setStudents] = useState([]);

//   const [pendingFee, setPendingFee] = useState([]);
//   const [paidFee, setPaidFee] = useState([]);

//   // -------------------- Fetch Total Students Count --------------------
//   useEffect(() => {
//     if (!schoolId) return;

//     axios
//       .get(`/api/students/count`, {
//         params: { schoolId },
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setTotalStudents(res.data))
//       .catch(console.error);
//   }, [schoolId, token]);

//   // -------------------- Fetch Teachers --------------------
//   useEffect(() => {
//     if (!schoolId) return;

//     axios
//       .get("/api/teachers", {
//         params: { schoolId, status: "Working" },
//       })
//       .then((res) => setTotalTeachers(res.data))
//       .catch(console.error);
//   }, [schoolId]);

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

//   // -------------------------Calculate pending fees --------------------

//   const pendingAmount = pendingFee.reduce(
//     (sum, item) => sum + Number(item.amount || 0),
//     0,
//   );
//   console.log("Pending Amount", pendingAmount);

//   // -------------------------Calculate paid fees --------------------

//   const paidAmount = paidFee.reduce(
//     (sum, item) => sum + Number(item.paidAmount || 0),
//     0,
//   );
//   console.log("Paid Amount", paidAmount);

//   return (
//     <>
//       <div className="container-fluid px-0 mt-3 ">
//         <div className="row g-3">
//           {/* Total Students */}
//           <div className="col-12 col-sm-6 col-lg-3">
//             <div className="card border-0 shadow rounded-4 h-100">
//               <div className="card-body">
//                 <div className="d-flex align-items-center">
//                   <div
//                     className="rounded-3 d-flex align-items-center justify-content-center me-3"
//                     style={{
//                       width: 55,
//                       height: 55,
//                       background: "#E8F1FF",
//                     }}
//                   >
//                     <FaUserGraduate size={26} color="#2563eb" />
//                   </div>

//                   <div className="flex-grow-1">
//                     <small className="text-muted d-block">Total Students</small>

//                     <h4 className="fw-bold mb-0">{totalStudents}</h4>

//                     <small className="text-success">
//                       ↑ 10% from last month
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Teachers */}

//           <div className="col-12 col-sm-6 col-lg-3">
//             <div className="card border-0 shadow rounded-4 h-100">
//               <div className="card-body">
//                 <div className="d-flex align-items-center">
//                   <div
//                     className="rounded-3 d-flex align-items-center justify-content-center me-3"
//                     style={{
//                       width: 55,
//                       height: 55,
//                       background: "#EAF8EF",
//                     }}
//                   >
//                     <FaChalkboardTeacher size={26} color="#16a34a" />
//                   </div>

//                   <div className="flex-grow-1">
//                     <small className="text-muted d-block">Total Teachers</small>

//                     <h4 className="fw-bold mb-0">{totalTeachers.length}</h4>

//                     <small className="text-success">↑ 5% from last month</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Fee Collection */}

//           <div className="col-12 col-sm-6 col-lg-3">
//             <div className="card border-0 shadow rounded-4 h-100">
//               <div className="card-body">
//                 <div className="d-flex align-items-center">
//                   <div
//                     className="rounded-3 d-flex align-items-center justify-content-center me-3"
//                     style={{
//                       width: 55,
//                       height: 55,
//                       background: "#FFF4D9",
//                     }}
//                   >
//                     <MdPayments size={26} color="#f59e0b" />
//                   </div>

//                   <div className="flex-grow-1">
//                     <small className="text-muted d-block">Fee Collection</small>

//                     <h4 className="fw-bold mb-0 text-warning">
//                       ₹ {paidAmount}
//                     </h4>

//                     <small className="text-success">↑ 8% this month</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Pending */}

//           <div className="col-12 col-sm-6 col-lg-3">
//             <div className="card border-0 shadow rounded-4 h-100">
//               <div className="card-body">
//                 <div className="d-flex align-items-center">
//                   <div
//                     className="rounded-3 d-flex align-items-center justify-content-center me-3"
//                     style={{
//                       width: 55,
//                       height: 55,
//                       background: "#FFEAEA",
//                     }}
//                   >
//                     <RiMoneyRupeeCircleFill size={28} color="#dc2626" />
//                   </div>

//                   <div className="flex-grow-1">
//                     <small className="text-muted d-block">Fee Pending</small>

//                     <h4 className="fw-bold mb-0 text-danger">
//                       ₹ {pendingAmount}
//                     </h4>

//                     <small className="text-danger">Pending Collection</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CardHead;

import { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import axios from "../../api/axiosInstance";

const CardHead = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let user = {};

    try {
      user = JSON.parse(localStorage.getItem("user")) || {};
    } catch (error) {
      console.error("Invalid user data in localStorage");
    }

    const schoolId = user?.schoolId;
    const token = localStorage.getItem("token");

    if (!schoolId) {
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [studentCountResponse, teacherResponse, feeResponse] =
          await Promise.all([
            // Total Students
            axios.get("/api/students/count", {
              params: {
                schoolId,
              },
              ...config,
            }),

            // Total Working Teachers
            axios.get("/api/teachers", {
              params: {
                schoolId,
                status: "Working",
              },
              ...config,
            }),

            // Fees
            axios.get("/api/student-fee/all", config),
          ]);

        // ================= STUDENTS =================

        setTotalStudents(Number(studentCountResponse?.data || 0));

        // ================= TEACHERS =================

        const teachers = Array.isArray(teacherResponse?.data)
          ? teacherResponse.data
          : [];

        setTotalTeachers(teachers.length);

        // ================= FEES =================

        const fees = Array.isArray(feeResponse?.data) ? feeResponse.data : [];

        const pending = fees
          .filter((item) => item.status === "UNPAID")
          .reduce((sum, item) => sum + Number(item.amount || 0), 0);

        const paid = fees
          .filter((item) => item.status === "PAID" || item.status === "PARTIAL")
          .reduce((sum, item) => sum + Number(item.paidAmount || 0), 0);

        setPendingAmount(pending);
        setPaidAmount(paid);
      } catch (error) {
        console.error("Dashboard data fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ================= CURRENCY FORMAT =================

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));
  };

  // ================= STAT CARD =================

  const StatCard = ({
    icon,
    iconBg,
    title,
    value,
    subtitle,
    valueClass = "",
    subtitleClass = "text-success",
  }) => {
    return (
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="dashboard-stat-card shadow">
          <div className="stat-card-content">
            {/* ICON */}
            <div
              className="stat-icon"
              style={{
                backgroundColor: iconBg,
              }}
            >
              {icon}
            </div>

            {/* CONTENT */}
            <div className="stat-content">
              <div className="stat-title">{title}</div>

              {loading ? (
                <div className="stat-loading">
                  <div className="loading-value"></div>
                  <div className="loading-text"></div>
                </div>
              ) : (
                <>
                  <div className={`stat-value ${valueClass}`}>{value}</div>

                  <div className={`stat-subtitle ${subtitleClass}`}>
                    {subtitle}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Decorative circle */}
          <div className="stat-decoration"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="row g-3 mb-4 mt-2">
        {/* Total Amount */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaUserGraduate />
            </div>

            <div className="stat-content">
              <span>Total Students</span>

              <h3>₹{totalStudents}</h3>

              <small>↑ 10% from last month</small>
            </div>
          </div>
        </div>

        {/* Collection */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaChalkboardTeacher />
            </div>

            <div className="stat-content">
              <span>Total Teachers</span>

              <h3>₹{totalTeachers}</h3>

              <small>↑ 5% from last month</small>
            </div>
          </div>
        </div>

        {/* Discount */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <MdPayments />
            </div>

            <div className="stat-content">
              <span>Paid Amount</span>

              <h3>₹{paidAmount}</h3>

              <small>↑ 8% from this month</small>
            </div>
          </div>
        </div>

        {/* Fine */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-red shadow">
            <div className="stat-icon">
              <RiMoneyRupeeCircleFill />
            </div>

            <div className="stat-content">
              <span>Pending Amount</span>

              <h3>₹{pendingAmount}</h3>

              <small>Pending amount</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHead;
