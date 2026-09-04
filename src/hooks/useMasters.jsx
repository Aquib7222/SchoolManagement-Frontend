import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const useMasters = () => {
  const token = localStorage.getItem("token");

  const [sessions, setSessions] = useState([]);
  const [standards, setStandards] = useState([]);
  const [sections, setSections] = useState([]);
  const [feeBatches, setFeeBatches] = useState([]);
  const [feeCategories, setFeeCategories] = useState([]);
  const [teacherDesignation, setTeacherDesignation] = useState([]);
  const [teacherDepartment, setTeacherDepartment] = useState([]);
  const [teacherCategory, setTeacherCategory] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState([]);
  const [month, setMonth] = useState([]);
  const [assessmentNature, setAssessmentNature] = useState([]);
  const [examTermType, setExamTermType] = useState([]);
  const [subjectType, setSubjectType] = useState([]);
  const [subjectCategory, setSubjectCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [schoolType, setSchoolType] = useState([]);
  const [schoolCategory, setSchoolCategory] = useState([]);
  const [affiliationBoard, setAffiliationBoard] = useState([]);
  const [subjects, setSubjects] = useState([]);

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
        assessmentNatureRes,
        examTermTypeRes,
        subjectTypeRes,
        subjectCategoryRes,
        schoolTypeRes,
        schoolCategoryRes,
        affiliationBoardRes,
        subjectsRes,
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
        axios.get("api/master/assessment/nature", { headers }),
        axios.get("api/master/exam-type", { headers }),
        axios.get("api/master/subject-type", { headers }),
        axios.get("api/master/subject-category", { headers }),
        axios.get("api/master/school-type", { headers }),
        axios.get("api/master/school-category", { headers }),
        axios.get("api/master/affiliation-board", { headers }),
        axios.get("api/master/subject", { headers }),
      ]);

      setSessions(sessionRes.data);
      setStandards(standardRes.data);
      setSections(sectionRes.data);
      setFeeBatches(batchRes.data);
      setFeeCategories(categoryRes.data);
      setSubjects(subjectsRes.data);
      setTeacherDesignation(teacherDesignationRes.data);
      setTeacherDepartment(teacherDepartmentRes.data);
      setTeacherCategory(teacherCategoryRes.data);
      setAttendanceStatus(attendanceStatusRes.data);
      setMonth(monthRes.data);
      setAssessmentNature(assessmentNatureRes.data);
      setExamTermType(examTermTypeRes.data);
      setSubjectType(subjectTypeRes.data);
      setSubjectCategory(subjectCategoryRes.data);
      setSchoolType(schoolTypeRes.data);
      setSchoolCategory(schoolCategoryRes.data);
      setAffiliationBoard(affiliationBoardRes.data);
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
    assessmentNature,
    examTermType,
    subjectType,
    subjectCategory,
    schoolType,
    schoolCategory,
    affiliationBoard,
    subjects,

  };
};

export default useMasters;
