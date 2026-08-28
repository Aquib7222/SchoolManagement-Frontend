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

import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useDashboardData = () => {
  const [schools, setSchools] = useState([]);
  const [superadmins, setSuperAdmins] = useState([]);
  const [modules, setModules] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [admissions,setAdmissions] = useState([]);
  const [teacherCount,setTeacherCount] = useState(0);

  // =========================
  // FEE
  // =========================
  const [feeCollected, setFeeCollected] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [pendingFee, setPendingFee] = useState(0);

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

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
        // Schools
        axiosInstance.get("/api/school/all"),

        // Super Admins
        axiosInstance.get("/api/superadmin/all"),

        // Modules
        axiosInstance.get("/api/module/all"),

        // User Group Mapping
        axiosInstance.get("/api/user-group-mapping/all"),

        // Students
        axiosInstance.get("/api/students/count"),
         // admissions
        axiosInstance.get("/api/admissions"),
        // Teacher
        axiosInstance.get("/api/teachers/count"),
        

        // All Fees - All Schools
        axiosInstance.get("/api/student-fee/all-Fee"),
      ]);

      // =========================================
      // SCHOOLS
      // =========================================

      setSchools(schoolsRes.data || []);

      // =========================================
      // SUPER ADMINS
      // =========================================

      setSuperAdmins(superAdminsRes.data || []);

      // =========================================
      // MODULES
      // =========================================

      setModules(modulesRes.data || []);

      // =========================================
      // MAPPINGS
      // =========================================

      setMappings(mappingsRes.data || []);

      // =========================================
      // STUDENTS
      // =========================================

      setTotalStudents(
        typeof studentsRes.data === "number"
          ? studentsRes.data
          : studentsRes.data?.count || 0
      );

      setTeacherCount(
        typeof teacherCountRes.data === "number"
          ? teacherCountRes.data
          : teacherCountRes.data?.count || 0
      );

      setAdmissions(admissionRes.data || []);
console.log("admission response:", admissionRes.data);
      
      // =========================================
      // FEES
      // =========================================

      const fees = Array.isArray(feesRes.data)
        ? feesRes.data
        : [];

      console.log("All Fees:", fees);

      // Total Assigned Fee
      const totalAssigned = fees.reduce(
        (total, fee) => total + Number(fee.amount || 0),
        0
      );

      // Total Paid Fee
      const totalPaid = fees.reduce(
        (total, fee) => total + Number(fee.paidAmount || 0),
        0
      );

      // Total Pending Fee
      const totalPending = fees.reduce(
        (total, fee) =>
          total + Number(fee.dueAmount || 0),
        0
      );

      setTotalFee(totalAssigned);
      setFeeCollected(totalPaid);
      setPendingFee(totalPending);

    } catch (error) {
      console.error("Dashboard API Error:", error);

      // Optional fallback
      setFeeCollected(0);
      setTotalFee(0);
      setPendingFee(0);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

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
    loading,
    refreshDashboard: fetchDashboardData,
  };
};

export default useDashboardData;