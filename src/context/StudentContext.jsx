import { createContext, useContext, useState } from "react";
import axios from "../api/axiosInstance";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const schoolId = localStorage.getItem("schoolId");
  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Last loaded filter
  const [lastFilter, setLastFilter] = useState(null);

  const loadStudents = async (session, standard, section) => {
    const filter = `${session}-${standard}-${section}`;

    // Same filter => No API Call
    if (lastFilter === filter && students.length > 0) {
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get("/api/students/search", {
        params: {
          schoolId,
          academicYear: session,
          studentClass: standard,
          section: section,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data);
      setLastFilter(filter);
    } finally {
      setLoading(false);
    }
  };

  const clearStudents = () => {
    setStudents([]);
    setLastFilter(null);
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        loadStudents,
        clearStudents,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => useContext(StudentContext);