// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";



// const useDashboardData = () => {
//   const [schools, setSchools] = useState([]);
//   const [superadmins, setSuperAdmins] = useState([]);
//   const [modules, setModules] = useState([]);
//   const [mappings, setMappings] = useState([]);
//   const [totalStudents, setTotalStudents] = useState(0);

//   console.log("all modules",modules);

//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);

//       const [
//         schoolsRes,
//         superAdminsRes,
//         modulesRes,
//         mappingsRes,
//         studentsRes,
//       ] = await Promise.all([
//         axiosInstance.get("/api/school/all"),

//         axiosInstance.get("/api/superadmin/all"),

//         axiosInstance.get("/api/module/all"),

//         axiosInstance.get("/api/user-group-mapping/all"),

//         axiosInstance.get("/api/students/count"),
//       ]);

//       // Schools
//       setSchools(schoolsRes.data || []);

//       // Super Admins
//       setSuperAdmins(superAdminsRes.data || []);

//       // Modules
//       const filteredModules = (modulesRes.data || []).filter(
//         (module) => module.hasMenu === true
//       );

//       setModules(modulesRes.data || []);

//       // Mapping
//       setMappings(mappingsRes.data || []);

//       // Students count
//       setTotalStudents(studentsRes.data || 0);

//     } catch (error) {
//       console.error("Dashboard API Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   return {
//     schools,
//     superadmins,
//     modules,
//     mappings,
//     totalStudents,
//     loading,
//     refreshDashboard: fetchDashboardData,
//   };
// };

// export default useDashboardData;

// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";

// const useDashboardData = () => {
//   const [schools, setSchools] = useState([]);
//   const [superadmins, setSuperAdmins] = useState([]);
//   const [modules, setModules] = useState([]);
//   const [mappings, setMappings] = useState([]);
//   const [totalStudents, setTotalStudents] = useState(0);
//   const [admissions,setAdmissions] = useState([]);
//   const [teacherCount,setTeacherCount] = useState(0);

//   // =========================
//   // FEE
//   // =========================
//   const [feeCollected, setFeeCollected] = useState(0);
//   const [totalFee, setTotalFee] = useState(0);
//   const [pendingFee, setPendingFee] = useState(0);

//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);

//       const [
//         schoolsRes,
//         superAdminsRes,
//         modulesRes,
//         mappingsRes,
//         studentsRes,
//         admissionRes,
//         teacherCountRes,
//         feesRes,
//       ] = await Promise.all([
//         // Schools
//         axiosInstance.get("/api/school/all"),

//         // Super Admins
//         axiosInstance.get("/api/superadmin/all"),

//         // Modules
//         axiosInstance.get("/api/module/all"),

//         // User Group Mapping
//         axiosInstance.get("/api/user-group-mapping/all"),

//         // Students
//         axiosInstance.get("/api/students/count"),
//          // admissions
//         axiosInstance.get("/api/admissions"),
//         // Teacher
//         axiosInstance.get("/api/teachers/count"),
        

//         // All Fees - All Schools
//         axiosInstance.get("/api/student-fee/all-Fee"),
//       ]);

//       // =========================================
//       // SCHOOLS
//       // =========================================

//       setSchools(schoolsRes.data || []);

//       // =========================================
//       // SUPER ADMINS
//       // =========================================

//       setSuperAdmins(superAdminsRes.data || []);

//       // =========================================
//       // MODULES
//       // =========================================

//       setModules(modulesRes.data || []);

//       // =========================================
//       // MAPPINGS
//       // =========================================

//       setMappings(mappingsRes.data || []);

//       // =========================================
//       // STUDENTS
//       // =========================================

//       setTotalStudents(
//         typeof studentsRes.data === "number"
//           ? studentsRes.data
//           : studentsRes.data?.count || 0
//       );

//       setTeacherCount(
//         typeof teacherCountRes.data === "number"
//           ? teacherCountRes.data
//           : teacherCountRes.data?.count || 0
//       );

//       setAdmissions(admissionRes.data || []);
// console.log("admission response:", admissionRes.data);
      
//       // =========================================
//       // FEES
//       // =========================================

//       const fees = Array.isArray(feesRes.data)
//         ? feesRes.data
//         : [];

//       console.log("All Fees:", fees);

//       // Total Assigned Fee
//       const totalAssigned = fees.reduce(
//         (total, fee) => total + Number(fee.amount || 0),
//         0
//       );

//       // Total Paid Fee
//       const totalPaid = fees.reduce(
//         (total, fee) => total + Number(fee.paidAmount || 0),
//         0
//       );

//       // Total Pending Fee
//       const totalPending = fees.reduce(
//         (total, fee) =>
//           total + Number(fee.dueAmount || 0),
//         0
//       );

//       setTotalFee(totalAssigned);
//       setFeeCollected(totalPaid);
//       setPendingFee(totalPending);

//     } catch (error) {
//       console.error("Dashboard API Error:", error);

//       // Optional fallback
//       setFeeCollected(0);
//       setTotalFee(0);
//       setPendingFee(0);

//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   return {
//     schools,
//     superadmins,
//     modules,
//     mappings,
//     totalStudents,
//     teacherCount,
//     admissions,
//     feeCollected,
//     totalFee,
//     pendingFee,
//     loading,
//     refreshDashboard: fetchDashboardData,
//   };
// };

// export default useDashboardData;

import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useDashboardData = () => {
  const schoolId = localStorage.getItem("schoolId");
  const [schools, setSchools] = useState([]);
  const [superadmins, setSuperAdmins] = useState([]);
  const [modules, setModules] = useState([]);
  const [mappings, setMappings] = useState([]);

  const [totalStudents, setTotalStudents] = useState(0);
  const [admissions, setAdmissions] = useState([]);
  const [teacherCount, setTeacherCount] = useState(0);

  // =========================
  // FEE
  // =========================
  const [feeCollected, setFeeCollected] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [pendingFee, setPendingFee] = useState(0);

  // =========================
  // ATTENDANCE
  // =========================
  const [attendancePercentage, setAttendancePercentage] = useState(0);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [
        schoolsRes,
        superAdminsRes,
        modulesRes,
        mappingsRes,
        studentsRes,
        admissionRes,
        teacherCountRes,
        feesRes,
      ] = await Promise.all([
        // =================================================
        // SCHOOLS
        // =================================================
        axiosInstance.get("/api/school/all"),

        // =================================================
        // SUPER ADMINS
        // =================================================
        axiosInstance.get("/api/superadmin/all"),

        // =================================================
        // MODULES
        // =================================================
        axiosInstance.get("/api/module/all"),

        // =================================================
        // USER GROUP MAPPING
        // =================================================
        axiosInstance.get("/api/user-group-mapping/all"),

        // =================================================
        // STUDENTS
        // =================================================
        axiosInstance.get("/api/students/count"),

        // =================================================
        // ADMISSIONS
        // =================================================
        axiosInstance.get("/api/admissions"),

        // =================================================
        // TEACHERS
        // =================================================
        axiosInstance.get("/api/teachers/count",{
          params:{
            schoolId,
          }
        }),

        // =================================================
        // FEES
        // =================================================
        axiosInstance.get("/api/student-fee/all-schools"),
      ]);

      // =====================================================
      // SCHOOLS
      // =====================================================

      const schoolData = Array.isArray(schoolsRes.data)
        ? schoolsRes.data
        : [];

      setSchools(schoolData);

      console.log("Dashboard Schools:", schoolData);

      // =====================================================
      // SUPER ADMINS
      // =====================================================

      const superAdminData = Array.isArray(superAdminsRes.data)
        ? superAdminsRes.data
        : [];

      setSuperAdmins(superAdminData);

      console.log("Dashboard Super Admins:", superAdminData);

      // =====================================================
      // MODULES
      // =====================================================

      const moduleData = Array.isArray(modulesRes.data)
        ? modulesRes.data
        : [];

      setModules(moduleData);

      console.log("Dashboard Modules:", moduleData);

      // =====================================================
      // MAPPINGS
      // =====================================================

      const mappingData = Array.isArray(mappingsRes.data)
        ? mappingsRes.data
        : [];

      setMappings(mappingData);

      console.log("Dashboard Mappings:", mappingData);

      // =====================================================
      // STUDENTS
      // =====================================================

      const studentCount =
        typeof studentsRes.data === "number"
          ? studentsRes.data
          : Number(
              studentsRes.data?.count ??
              studentsRes.data?.total ??
              studentsRes.data?.totalStudents ??
              0
            );

      setTotalStudents(studentCount);

      console.log("Dashboard Student Count:", studentCount);

      // =====================================================
      // TEACHERS
      // =====================================================

      const teachers =
        typeof teacherCountRes.data === "number"
          ? teacherCountRes.data
          : Number(
              teacherCountRes.data?.count ??
              teacherCountRes.data?.total ??
              teacherCountRes.data?.totalTeachers ??
              0
            );

      setTeacherCount(teachers);

      console.log("Dashboard Teacher Count:", teachers);

      // =====================================================
      // ADMISSIONS
      // =====================================================

      const admissionData = Array.isArray(admissionRes.data)
        ? admissionRes.data
        : [];

      setAdmissions(admissionData);

      console.log("Dashboard Admissions:", admissionData);

      // =====================================================
      // FEES
      // =====================================================

      const fees = Array.isArray(feesRes.data)
        ? feesRes.data
        : [];

      console.log("Dashboard All Fees:", fees);

      // Total Assigned Fee
      const totalAssigned = fees.reduce(
        (total, fee) =>
          total + Number(fee?.amount || 0),
        0
      );

      // Total Paid Fee
      const totalPaid = fees.reduce(
        (total, fee) =>
          total + Number(fee?.paidAmount || 0),
        0
      );

      // Total Pending Fee
      const totalPending = fees.reduce(
        (total, fee) =>
          total + Number(fee?.dueAmount || 0),
        0
      );

      setTotalFee(totalAssigned);
      setFeeCollected(totalPaid);
      setPendingFee(totalPending);

      console.log("Dashboard Total Fee:", totalAssigned);
      console.log("Dashboard Fee Collected:", totalPaid);
      console.log("Dashboard Pending Fee:", totalPending);

      // =====================================================
      // ATTENDANCE
      // =====================================================
      //
      // NOTE:
      // Attendance API needs schoolId.
      //
      // We use the first/current school available from
      // /api/school/all.
      //
      // If your login is school-specific, later we can
      // make this use the logged-in user's exact school.
      // =====================================================

      if (schoolData.length > 0) {
        try {
          const schoolId = schoolData[0]?.id;

          if (schoolId) {
            const attendanceRes =
              await axiosInstance.get(
                `/api/student/attendance/school?schoolId=${schoolId}`
              );

            const attendanceData = Array.isArray(
              attendanceRes.data
            )
              ? attendanceRes.data
              : [];

            console.log(
              "Dashboard Attendance:",
              attendanceData
            );

            // ---------------------------------------------
            // Calculate attendance
            // ---------------------------------------------
            //
            // PRESENT = 1
            // HALF_DAY = 0.5
            // ABSENT = 0
            // LEAVE = excluded
            //
            // ---------------------------------------------

            let totalMarked = 0;
            let presentEquivalent = 0;

            attendanceData.forEach((attendance) => {
              const status = String(
                attendance?.status || ""
              ).toUpperCase();

              if (status === "PRESENT") {
                totalMarked += 1;
                presentEquivalent += 1;
              } else if (status === "HALF_DAY") {
                totalMarked += 1;
                presentEquivalent += 0.5;
              } else if (status === "ABSENT") {
                totalMarked += 1;
              }
            });

            const percentage =
              totalMarked > 0
                ? (presentEquivalent / totalMarked) * 100
                : 0;

            setAttendancePercentage(
              Number(percentage.toFixed(2))
            );

            console.log(
              "Attendance Percentage:",
              percentage
            );
          } else {
            setAttendancePercentage(0);
          }
        } catch (attendanceError) {
          console.error(
            "Attendance Dashboard API Error:",
            attendanceError
          );

          setAttendancePercentage(0);
        }
      } else {
        setAttendancePercentage(0);
      }
    } catch (error) {
      console.error(
        "Dashboard API Error:",
        error
      );

      // ===================================================
      // FALLBACK
      // ===================================================

      setSchools([]);
      setSuperAdmins([]);
      setModules([]);
      setMappings([]);

      setTotalStudents(0);
      setAdmissions([]);
      setTeacherCount(0);

      setFeeCollected(0);
      setTotalFee(0);
      setPendingFee(0);

      setAttendancePercentage(0);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // =====================================================
  // RETURN
  // =====================================================

  return {
    schools,
    superadmins,
    modules,
    mappings,

    totalStudents,
    teacherCount,
    admissions,

    feeCollected,
    totalFee,
    pendingFee,

    attendancePercentage,

    loading,

    refreshDashboard: fetchDashboardData,
  };
};

export default useDashboardData;