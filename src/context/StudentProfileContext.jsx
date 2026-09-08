import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "../api/axiosInstance";
import { useAuth } from "./AuthContext";

const StudentProfileContext = createContext(null);

const getAcademicYear = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  if (month >= 4) {
    return `${year}-${year + 1}`;
  }

  return `${year - 1}-${year}`;
};

export const StudentProfileProvider = ({ children }) => {

  const { auth } = useAuth();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudent = useCallback(async () => {

    const user = auth?.user;

    const schoolId =
      user?.schoolId ||
      localStorage.getItem("schoolId");

    const admissionNumber =
      user?.admissionNumber;

      

    const academicYear =
      getAcademicYear();
      

    if (
      !user ||
      user?.role !== "STUDENT" ||
      !schoolId ||
      !admissionNumber
    ) {
      setStudent(null);
      setLoading(false);
      return;
    }
console.log("===== STUDENT PROFILE DEBUG =====");
console.log("User:", auth?.user);
console.log("School ID:", auth?.user?.schoolId);
console.log("Admission:", auth?.user?.admissionNumber);
console.log("Academic Year:", getAcademicYear());
console.log("================================");
    try {

      setLoading(true);
      setError("");

      const response = await axios.get(
        "/api/students/me",
        {
          params: {
            schoolId,
            academicYear,
            admissionNumber
          },
        }
      );

      setStudent(response.data);

    } catch (err) {

      console.error(
        "Student profile loading error:",
        err
      );

      setStudent(null);

      setError(
        err?.response?.data?.message ||
        "Unable to load student details"
      );

    } finally {

      setLoading(false);

    }

  }, [auth?.user]);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  const refreshStudent = async () => {
    await loadStudent();
  };

  const clearStudent = () => {
    setStudent(null);
    setError("");
  };

  return (
    <StudentProfileContext.Provider
      value={{
        student,
        loading,
        error,
        refreshStudent,
        clearStudent,
        academicYear: getAcademicYear(),
      }}
    >
      {children}
    </StudentProfileContext.Provider>
  );
};

export const useStudent = () => {

  const context = useContext(
    StudentProfileContext
  );

  if (!context) {
    throw new Error(
      "useStudent must be used inside StudentProfileProvider"
    );
  }

  return context;
};