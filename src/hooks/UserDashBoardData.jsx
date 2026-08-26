import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";



const useDashboardData = () => {
  const [schools, setSchools] = useState([]);
  const [superadmins, setSuperAdmins] = useState([]);
  const [modules, setModules] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);

  console.log("all modules",modules);

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
      ] = await Promise.all([
        axiosInstance.get("/api/school/all"),

        axiosInstance.get("/api/superadmin/all"),

        axiosInstance.get("/api/module/all"),

        axiosInstance.get("/api/user-group-mapping/all"),

        axiosInstance.get("/api/students/count"),
      ]);

      // Schools
      setSchools(schoolsRes.data || []);

      // Super Admins
      setSuperAdmins(superAdminsRes.data || []);

      // Modules
      const filteredModules = (modulesRes.data || []).filter(
        (module) => module.hasMenu === true
      );

      setModules(modulesRes.data || []);

      // Mapping
      setMappings(mappingsRes.data || []);

      // Students count
      setTotalStudents(studentsRes.data || 0);

    } catch (error) {
      console.error("Dashboard API Error:", error);
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
    loading,
    refreshDashboard: fetchDashboardData,
  };
};

export default useDashboardData;