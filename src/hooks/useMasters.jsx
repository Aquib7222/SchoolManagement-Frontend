import { useEffect, useState } from "react";
// import axios from "axios";
import axios from "../api/axiosInstance";

const useMasters = () => {
  const token = localStorage.getItem("token");

  const [sessions, setSessions] = useState([]);
  const [standards, setStandards] = useState([]);
  const [sections, setSections] = useState([]);
  const [feeBatches, setFeeBatches] = useState([]);
  const [feeCategories, setFeeCategories] = useState([]);
  const [teacherDesignation,setTeacherDesignation] =useState([]);
  const [teacherDepartment,setTeacherDepartment] = useState([]);
  const [teacherCategory,setTeacherCategory] = useState([]);
  const [attendanceStatus,setAttendanceStatus] = useState([]);
  const [month,setMonth] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMasters();
  }, []);

  const loadMasters = async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        sessionRes,
        standardRes,
        sectionRes,
        batchRes,
        categoryRes,
        teacherDesignationRes,
        teacherDepartmentRes,
        teacherCategoryRes,
        attendanceStatusRes,
        monthRes,
      ] = await Promise.all([
        axios.get("api/master/sessions", { headers }),
        axios.get("api/master/standard", { headers }),
        axios.get("api/master/section", { headers }),
        axios.get("api/master/fee-batch", { headers }),
        axios.get("api/master/fee-category", { headers }),
        axios.get("api/master/teacherDesignation", { headers }),
        axios.get("api/master/teacherDepartment", { headers }),
        axios.get("api/master/teacherCategory", { headers }),
        axios.get("api/master/attendanceStatus", { headers }),
        axios.get("api/master/month", { headers }),
      ]);

      setSessions(sessionRes.data);
      setStandards(standardRes.data);
      setSections(sectionRes.data);
      setFeeBatches(batchRes.data);
      setFeeCategories(categoryRes.data);
      setTeacherDesignation(teacherDesignationRes.data);
      setTeacherDepartment(teacherDepartmentRes.data);
      setTeacherCategory(teacherCategoryRes.data);
      setAttendanceStatus(attendanceStatusRes.data);
      setMonth(monthRes.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sessions,
    standards,
    sections,
    feeBatches,
    feeCategories,
    refreshMasters: loadMasters,
    teacherCategory,
    teacherDepartment,
    teacherDesignation,
    attendanceStatus,
    month,
  };
};

export default useMasters;