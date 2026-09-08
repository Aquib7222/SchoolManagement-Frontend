

import { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import axios from "../../api/axiosInstance";

const CardHead = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  const [attendance, setAttendance] = useState({
    present: 0,
    absent: 0,
    total: 0,
    percentage: 0,
  });

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

        const [
          studentCountResponse,
          teacherResponse,
          feeResponse,
          attendanceResponse,
        ] = await Promise.all([
          // =====================================================
          // TOTAL STUDENTS
          // =====================================================

          axios.get("/api/students/count", {
            params: {
              schoolId,
            },
            ...config,
          }),

          // =====================================================
          // TOTAL WORKING TEACHERS
          // =====================================================

          axios.get("/api/teachers", {
            params: {
              schoolId,
              status: "Working",
            },
            ...config,
          }),

          // =====================================================
          // FEES
          // =====================================================

          axios.get("/api/student-fee/all", {
  params: {
    schoolId,
  },
  ...config,
}),
          // =====================================================
          // ALL SCHOOL ATTENDANCE
          // =====================================================

          axios.get("/api/student/attendance/school", {
            params: {
              schoolId,
            },
            ...config,
          }),
        ]);

        // =====================================================
        // STUDENTS
        // =====================================================

        setTotalStudents(
          Number(studentCountResponse?.data || 0)
        );

        // =====================================================
        // TEACHERS
        // =====================================================

        const teachers = Array.isArray(teacherResponse?.data)
          ? teacherResponse.data
          : [];

        setTotalTeachers(teachers.length);

        // =====================================================
        // FEES
        // =====================================================

        const fees = Array.isArray(feeResponse?.data)
          ? feeResponse.data
          : [];

          console.log("fees in card",fees);
        const pending = fees
          .filter((item) => item.status === "UNPAID")
          .reduce(
            (sum, item) =>
              sum + Number(item.amount || 0),
            0
          );

        const paid = fees
          .filter(
            (item) =>
              item.status === "PAID" ||
              item.status === "PARTIAL"
          )
          .reduce(
            (sum, item) =>
              sum + Number(item.paidAmount || 0),
            0
          );

        setPendingAmount(pending);
        setPaidAmount(paid);

        // =====================================================
        // TODAY'S ATTENDANCE
        // =====================================================

        const allAttendance = Array.isArray(
          attendanceResponse?.data
        )
          ? attendanceResponse.data
          : [];

        // Today's date
        const today = new Date();

        const year = today.getFullYear();
        const month = String(
          today.getMonth() + 1
        ).padStart(2, "0");
        const day = String(
          today.getDate()
        ).padStart(2, "0");

        const todayDate = `${year}-${month}-${day}`;

        console.log("Today Date:", todayDate);
        console.log(
          "All Attendance:",
          allAttendance
        );

        // =====================================================
        // FILTER ONLY TODAY'S ATTENDANCE
        // =====================================================

        const todayAttendance = allAttendance.filter(
          (item) => {
            const attendanceDate =
              item.attendanceDate ||
              item.date;

            return (
              attendanceDate &&
              String(attendanceDate).substring(0, 10) ===
                todayDate
            );
          }
        );

        console.log(
          "Today's Attendance:",
          todayAttendance
        );

        // =====================================================
        // PRESENT / ABSENT
        // =====================================================

        const presentCount =
          todayAttendance.filter(
            (item) =>
              String(item.status).toUpperCase() ===
                "PRESENT"
          ).length;

        const absentCount =
          todayAttendance.filter(
            (item) =>
              String(item.status).toUpperCase() ===
                "ABSENT"
          ).length;

        // =====================================================
        // TOTAL ATTENDANCE
        // =====================================================

        const totalAttendance =
          todayAttendance.length;

        // =====================================================
        // ATTENDANCE PERCENTAGE
        // =====================================================

        const attendancePercentage =
          totalAttendance > 0
            ? Math.round(
                (presentCount / totalAttendance) * 100
              )
            : 0;

        setAttendance({
          present: presentCount,
          absent: absentCount,
          total: totalAttendance,
          percentage: attendancePercentage,
        });

      } catch (error) {
        console.error(
          "Dashboard data fetch failed:",
          error
        );

        setAttendance({
          present: 0,
          absent: 0,
          total: 0,
          percentage: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  console.log("pending amount",pendingAmount);
  console.log("paid amount",paidAmount);

  // =====================================================
  // CURRENCY FORMAT
  // =====================================================

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));
  };

  return (
    <>
      <div className="row g-3 mb-4 mt-2">

        {/* =================================================
            1. TOTAL STUDENTS
        ================================================= */}

        <div className="col-12 col-sm-6 col-lg">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaUserGraduate />
            </div>

            <div className="stat-content">
              <span>Total Students</span>

              <h3>
                {loading ? "..." : totalStudents}
              </h3>

              <small>
                ↑ 10% from last month
              </small>
            </div>
          </div>
        </div>

        {/* =================================================
            2. TOTAL TEACHERS
        ================================================= */}

        <div className="col-12 col-sm-6 col-lg">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaChalkboardTeacher />
            </div>

            <div className="stat-content">
              <span>Total Teachers</span>

              <h3>
                {loading ? "..." : totalTeachers}
              </h3>

              <small>
                ↑ 5% from last month
              </small>
            </div>
          </div>
        </div>

        {/* =================================================
            3. PAID AMOUNT
        ================================================= */}

        <div className="col-12 col-sm-6 col-lg">
          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <MdPayments />
            </div>

            <div className="stat-content">
              <span>Paid Amount</span>

              <h3>
                {loading
                  ? "₹..."
                  : `₹${formatAmount(paidAmount)}`}
              </h3>

              <small>
                ↑ 8% from this month
              </small>
            </div>
          </div>
        </div>

        {/* =================================================
            4. PENDING AMOUNT
        ================================================= */}

        <div className="col-12 col-sm-6 col-lg">
          <div className="premium-stat-card stat-red shadow">
            <div className="stat-icon">
              <RiMoneyRupeeCircleFill />
            </div>

            <div className="stat-content">
              <span>Pending Amount</span>

              <h3>
                {loading
                  ? "₹..."
                  : `₹${formatAmount(pendingAmount)}`}
              </h3>

              <small>
                Pending amount
              </small>
            </div>
          </div>
        </div>

        {/* =================================================
            5. TODAY'S ATTENDANCE
        ================================================= */}

        <div className="col-12 col-sm-6 col-lg">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaCalendarCheck />
            </div>

            <div className="stat-content">
              <span>Today's Attendance</span>

              <h3>
                {loading
                  ? "..."
                  : `${attendance.percentage}%`}
              </h3>

              <small>
                {loading
                  ? "Loading..."
                  : `${attendance.present} Present • ${attendance.absent} Absent`}
              </small>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default CardHead;
