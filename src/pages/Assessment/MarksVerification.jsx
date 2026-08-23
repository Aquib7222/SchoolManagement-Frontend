// import React, { useEffect, useState } from "react";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";
// import { RiResetLeftLine } from "react-icons/ri";
// import { IoMdSearch } from "react-icons/io";
// import { LuNotebookText } from "react-icons/lu";

// const MarksVerification = () => {
//   const schoolId = JSON.parse(localStorage.getItem("schoolId"));
//   const [loading, setLoading] = useState(false);
//   const { sessions, standards, sections } = useMasters();
//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [examTerms, setExamTerms] = useState([]);
//   const [selectedExamTerm, setSelectedExamTerm] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [subjectClasswise, setSubjectClassWise] = useState([]);
//   const [marksData, setMarksData] = useState([]);

//   const loadExamTerms = async () => {
//     if (!selectedSession) {
//       setExamTerms([]);
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(
//         `/api/assessment/exam-term?schoolId=${schoolId}&session=${selectedSession}`,
//       );

//       console.log("Exam Terms:", response.data);

//       setExamTerms(response.data || []);
//     } catch (error) {
//       console.log("Exam Term Error:", error);

//       toast.error(error.response?.data || "Failed to load exam terms");
//     }
//   };

//   useEffect(() => {
//     loadExamTerms();
//   }, [selectedSession]);

//   const loadMarks = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get(
//         "/api/assessment/marks-entry/class",
//         {
//           params: {
//             schoolId,
//             session: selectedSession,
//             examTermId: selectedExamTerm.id,
//             studentClass: selectedStandard,
//             section: selectedSection,
//           },
//         },
//       );

//       console.log("Subject Wise Marks:", response.data);

//       setSubjects(
//         response.data.map((item) => ({
//           subjectId: item.subjectId,
//           subjectName: item.subjectName,
//         })),
//       );

//       const subjectWiseData = response.data;

//       console.log("subject wise data available", subjectWiseData);

//       const studentMap = {};

//       subjectWiseData.forEach((subject) => {
//         subject.students.forEach((student) => {
//           if (!studentMap[student.studentId]) {
//             studentMap[student.studentId] = {
//               studentId: student.studentId,
//               admissionNumber: student.admissionNumber,
//               studentName: student.studentName,
//               subjects: {},
//             };
//           }

//           studentMap[student.studentId].subjects[subject.subjectId] = {
//             subjectId: subject.subjectId,
//             subjectName: subject.subjectName,
//             totalMarks: student.totalMarks ?? 0,
//             percentage: student.percentage ?? 0,
//             grade: student.grade ?? "-",
//             gradePoint: student.gradePoint ?? 0,
//             remark: student.remark ?? "-",
//             status: subject.status,
//             components: student.components || [],
//           };
//         });
//       });

//       const studentWiseData = Object.values(studentMap);

//       console.log("Student Wise Data:", studentWiseData);

//       setMarksData(studentWiseData);
//     } catch (error) {
//       console.error("Error loading marks:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadSubjectClassWise = async () => {
//     if (!selectedSession || !selectedStandard || !selectedExamTerm?.id) {
//       return;
//     }
//     try {
//       const response = await axiosInstance.get(
//         "/api/assessment/class-subject/mapped",
//         {
//           params: {
//             schoolId: schoolId,

//             academicYear: selectedSession,

//             studentClass: selectedStandard,
//           },
//         },
//       );
//       setSubjectClassWise(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     if (selectedSession && selectedStandard && selectedExamTerm?.id) {
//       loadSubjectClassWise();
//     }
//   }, [selectedSession, selectedStandard, selectedExamTerm]);

//   const handleReset = async () => {
//     (setSelectedSession(""),
//       setSelectedStandard(""),
//       setSelectedExamTerm(""),
//       setSelectedSection(""),
//       setMarksData(""));
//   };
//   return (
//     <>
//       <div
//         className="row shadow"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           minHeight: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6 className="mb-1">
//           <LuNotebookText className="me-2" />
//           Marks Verification
//         </h6>

//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb mb-0">
//             <li className="breadcrumb-item">
//               <a
//                 href="/"
//                 style={{
//                   textDecoration: "none",
//                   color: "black",
//                 }}
//               >
//                 <small>Home</small>
//               </a>
//             </li>

//             <li className="breadcrumb-item">
//               <small>Assessment</small>
//             </li>

//             <li className="breadcrumb-item active">
//               <small>Marks Verification</small>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       <div className="ms-2 me-2 mt-3 p-3 rounded shadow bg-white">
//         <div className="row g-2">
//           {/* SESSION */}

//           <div className="col-12 col-sm-6 col-lg-3">
//             <label className="form-label">
//               Session <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               value={selectedSession}
//               onChange={(e) => {
//                 setSelectedSession(e.target.value);

//                 setSelectedExamTerm("");
//                 setSelectedStandard("");
//                 setSelectedSection("");
//               }}
//             >
//               <option value="">Select Session</option>

//               {sessions.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* EXAM */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label">
//               Exam <span className="text-danger">*</span>
//             </label>
//             <select
//               className="form-select"
//               value={selectedExamTerm?.id || ""}
//               onChange={(e) => {
//                 const selected = examTerms.find(
//                   (item) => String(item.id) === e.target.value,
//                 );

//                 setSelectedExamTerm(selected || "");
//               }}
//             >
//               <option value="">Select Exam</option>

//               {examTerms.map((item) => (
//                 <option key={item.id} value={item.id}>
//                   {item.examTerm}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* STANDARD */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label">
//               Standard <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               value={selectedStandard}
//               onChange={(e) => {
//                 setSelectedStandard(e.target.value);
//               }}
//             >
//               <option value="">Select Standard</option>

//               {standards.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* SECTION */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label">
//               Section <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               value={selectedSection}
//               onChange={(e) => {
//                 setSelectedSection(e.target.value);
//               }}
//             >
//               <option value="">Select Section</option>

//               {sections.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* BUTTONS */}

//         <div className="row g-2 mt-3">
//           <div className="d-flex justify-content-end gap-2">
//             <div className="col-12 col-sm-6 col-lg-2">
//               <button
//                 className="btn btn-outline-dark w-100"
//                 onClick={handleReset}
//               >
//                 <RiResetLeftLine size={20} /> Reset
//               </button>
//             </div>

//             <div className="col-12 col-sm-6 col-lg-2">
//               <button
//                 className="btn btn-success w-100"
//                 onClick={loadMarks}
//                 disabled={loading}
//               >
//                 <IoMdSearch size={20} />

//                 {loading ? "Loading..." : "Load Marks"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <div className="ms-2 me-2 mt-4 bg-white rounded shadow p-5 text-center">
//           <div
//             className="spinner-border text-success"
//             role="status"
//             style={{ width: "3rem", height: "3rem" }}
//           >
//             <span className="visually-hidden">Loading...</span>
//           </div>

//           <div className="mt-3 text-muted">Loading marks, please wait...</div>
//         </div>
//       ) : marksData.length > 0 ? (
//         <div className="ms-2 me-2 mt-4 rounded bg-white shadow p-3 table-responsive">
//           <table className="table table-bordered table-hover align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th>#</th>
//                 <th>Admission No</th>
//                 <th>Student Name</th>

//                 {subjectClasswise.map((subject) => (
//                   <th key={subject.subjectId} className="text-center">
//                     {subject.subjectName}
//                   </th>
//                 ))}
//                 <th className="text-center">
//       Total
//     </th>
//               </tr>
//             </thead>

//             <tbody>
//               {marksData.map((student, index) => (
//                 <tr key={student.studentId}>
//                   <td>{index + 1}</td>

//                   <td>{student.admissionNumber}</td>

//                   <td>
//                     <strong>{student.studentName}</strong>
//                   </td>

//                   {subjectClasswise.map((subject) => {
//                     const mark = student.subjects?.[subject.subjectId];

//                     return (
//                       <td
//                         key={subject.subjectId}
//                         className="text-center align-middle"
//                         style={{ minWidth: "180px" }}
//                       >
//                         {mark ? (
//                           <div>
//                             {/* =========================
//               TOTAL MARKS + GRADE
//           ========================= */}
//                             <div className="mb-2">
//                               <div className="fs-5 fw-bold">
//                                 {mark.totalMarks ?? 0}
//                               </div>

//                               <span className="badge bg-light text-dark border">
//                                 Grade: {mark.grade ?? "-"}
//                               </span>
//                             </div>

//                             {/* =========================
//               COMPONENT MARKS
//           ========================= */}
//                             <div className="text-start border-top border-bottom py-2 mb-2">
//                               {mark.components?.length > 0 ? (
//                                 mark.components.map((component) => (
//                                   <div
//                                     key={component.componentId}
//                                     className="d-flex justify-content-between align-items-center small mb-1"
//                                   >
//                                     <span className="text-muted">
//                                       {component.componentName}
//                                     </span>

//                                     <strong className="ms-2">
//                                       {component.obtainedMarks ?? 0}
//                                       <span className="text-muted">
//                                         /{component.maxMarks}
//                                       </span>
//                                     </strong>
//                                   </div>
//                                 ))
//                               ) : (
//                                 <small className="text-muted">
//                                   No component marks
//                                 </small>
//                               )}
//                             </div>

//                             {/* =========================
//               STATUS
//           ========================= */}
//                             <span
//                               className={`badge ${
//                                 mark.status === "GENERATED"
//                                   ? "bg-success"
//                                   : mark.status === "VERIFIED"
//                                     ? "bg-primary"
//                                     : mark.status === "PUBLISHED"
//                                       ? "bg-dark"
//                                       : "bg-warning text-dark"
//                               }`}
//                             >
//                               {mark.status ?? "DRAFT"}
//                             </span>
//                           </div>
//                         ) : (
//                           /* =========================
//            MARKS NOT ENTERED
//         ========================= */
//                           <div className="py-2">
//                             <div className="fs-5 fw-bold text-muted">0</div>

//                             <span className="badge bg-danger">
//                               Marks Not Entered
//                             </span>
//                           </div>
//                         )}
//                       </td>

//                     );
//                   })}

//                   <td className="text-center align-middle">
//   <div className="fs-5 fw-bold">
//     {subjectClasswise.reduce((total, subject) => {
//       const mark = student.subjects?.[subject.subjectId];

//       return total + (mark?.totalMarks ?? 0);
//     }, 0)}
//   </div>

//   <small className="text-muted">
//     /{" "}
//     {subjectClasswise.reduce((total, subject) => {
//       const mark = student.subjects?.[subject.subjectId];

//       if (!mark?.components) {
//         return total + 100;
//       }

//       const subjectMax = mark.components.reduce(
//         (sum, component) =>
//           sum + (Number(component.maxMarks) || 0),
//         0
//       );

//       return total + subjectMax;
//     }, 0)}
//   </small>
// </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="ms-2 me-2 mt-4 bg-white rounded shadow p-3 text-center">
//           No Data
//         </div>
//       )}
//     </>
//   );
// };

// export default MarksVerification;

import React, { useEffect, useMemo, useState } from "react";
import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";

import { toast } from "react-toastify";

import { RiResetLeftLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { LuNotebookText } from "react-icons/lu";
import { FaTrophy, FaMedal } from "react-icons/fa";

const MarksVerification = () => {
  const schoolId = JSON.parse(localStorage.getItem("schoolId"));

  const { sessions, standards, sections } = useMasters();

  /* =========================================================
     STATES
  ========================================================= */

  const [loading, setLoading] = useState(false);

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedExamTerm, setSelectedExamTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [examTerms, setExamTerms] = useState([]);

  const [subjects, setSubjects] = useState([]);
  const [subjectClasswise, setSubjectClassWise] = useState([]);

  const [marksData, setMarksData] = useState([]);

  /* =========================================================
     LOAD EXAM TERMS
  ========================================================= */

  const loadExamTerms = async () => {
    if (!selectedSession) {
      setExamTerms([]);
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/api/assessment/exam-term?schoolId=${schoolId}&session=${selectedSession}`,
      );

      setExamTerms(response.data || []);
    } catch (error) {
      console.error("Exam Term Error:", error);

      toast.error(error.response?.data || "Failed to load exam terms");
    }
  };

  useEffect(() => {
    loadExamTerms();
  }, [selectedSession]);

  /* =========================================================
     LOAD SUBJECTS
  ========================================================= */

  const loadSubjectClassWise = async () => {
    if (!selectedSession || !selectedStandard || !selectedExamTerm) {
      setSubjectClassWise([]);
      return;
    }

    try {
      const response = await axiosInstance.get(
        "/api/assessment/class-subject/mapped",
        {
          params: {
            schoolId,
            academicYear: selectedSession,
            studentClass: selectedStandard,
          },
        },
      );

      const data = response.data || [];

      setSubjectClassWise(data);

      setSubjects(
        data.map((item) => ({
          subjectId: item.subjectId,
          subjectName: item.subjectName,
        })),
      );
    } catch (error) {
      console.error("Subject Error:", error);

      toast.error(error.response?.data || "Failed to load subjects");
    }
  };

  useEffect(() => {
    loadSubjectClassWise();
  }, [selectedSession, selectedStandard, selectedExamTerm]);

  /* =========================================================
     LOAD MARKS
  ========================================================= */

  const loadMarks = async () => {
    if (!selectedSession) {
      toast.error("Please select session");
      return;
    }

    if (!selectedExamTerm) {
      toast.error("Please select exam");
      return;
    }

    if (!selectedStandard) {
      toast.error("Please select standard");
      return;
    }

    if (!selectedSection) {
      toast.error("Please select section");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        "/api/assessment/marks-entry/class",
        {
          params: {
            schoolId,
            session: selectedSession,

            examTermId: selectedExamTerm,

            studentClass: selectedStandard,

            section: selectedSection,
          },
        },
      );

      console.log("Subject Wise Marks:", response.data);

      const subjectWiseData = response.data || [];

      /* =====================================================
         SUBJECT LIST
      ===================================================== */

      setSubjects(
        subjectWiseData.map((item) => ({
          subjectId: item.subjectId,
          subjectName: item.subjectName,
        })),
      );

      /* =====================================================
         CREATE STUDENT MAP
      ===================================================== */

      const studentMap = {};

      subjectWiseData.forEach((subject) => {
        subject.students?.forEach((student) => {
          if (!studentMap[student.studentId]) {
            studentMap[student.studentId] = {
              studentId: student.studentId,

              admissionNumber: student.admissionNumber,

              studentName: student.studentName,

              subjects: {},
            };
          }

          studentMap[student.studentId].subjects[subject.subjectId] = {
            subjectId: subject.subjectId,

            subjectName: subject.subjectName,

            totalMarks: Number(student.totalMarks) || 0,

            percentage: Number(student.percentage) || 0,

            grade: student.grade || "-",

            gradePoint: Number(student.gradePoint) || 0,

            remark: student.remark || "-",

            status: subject.status || "DRAFT",

            components: student.components || [],
          };
        });
      });

      const studentWiseData = Object.values(studentMap);

      setMarksData(studentWiseData);

      if (studentWiseData.length === 0) {
        toast.info("No marks found");
      } else {
        toast.success("Marks loaded successfully");
      }
    } catch (error) {
      console.error("Error loading marks:", error);

      toast.error(error.response?.data || "Failed to load marks");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     SUBJECT MAX MARKS
  ========================================================= */

  const getSubjectMaxMarks = (subjectId) => {
    const studentWithSubject = marksData.find(
      (student) => student.subjects?.[subjectId],
    );

    const subjectMark = studentWithSubject?.subjects?.[subjectId];

    if (subjectMark?.components?.length > 0) {
      return subjectMark.components.reduce(
        (sum, component) => sum + (Number(component.maxMarks) || 0),
        0,
      );
    }

    return 100;
  };

  /* =========================================================
     GRAND TOTAL MAX MARKS
  ========================================================= */

  const grandTotalMaxMarks = useMemo(() => {
    return subjectClasswise.reduce((total, subject) => {
      return total + getSubjectMaxMarks(subject.subjectId);
    }, 0);
  }, [subjectClasswise, marksData]);

  /* =========================================================
     CALCULATE STUDENT TOTAL
  ========================================================= */

  const calculateStudentTotal = (student) => {
    return subjectClasswise.reduce((total, subject) => {
      const mark = student.subjects?.[subject.subjectId];

      return total + (Number(mark?.totalMarks) || 0);
    }, 0);
  };

  /* =========================================================
     PREPARE RANKING
  ========================================================= */

  const rankedStudents = useMemo(() => {
    const students = marksData.map((student) => ({
      ...student,

      grandTotal: calculateStudentTotal(student),

      grandTotalMax: grandTotalMaxMarks,

      percentage:
        grandTotalMaxMarks > 0
          ? (
              (calculateStudentTotal(student) / grandTotalMaxMarks) *
              100
            ).toFixed(2)
          : "0.00",
    }));

    /* Sort highest marks first */

    students.sort((a, b) => b.grandTotal - a.grandTotal);

    /* =====================================================
       COMPETITION RANKING

       1
       2
       2
       4
    ===================================================== */

    let currentRank = 0;
    let previousMarks = null;

    students.forEach((student, index) => {
      if (previousMarks === student.grandTotal) {
        student.rank = currentRank;
      } else {
        currentRank = index + 1;

        student.rank = currentRank;
      }

      previousMarks = student.grandTotal;
    });

    return students;
  }, [marksData, subjectClasswise, grandTotalMaxMarks]);

  /* =========================================================
     TOP 5
  ========================================================= */

  const topFiveStudents = useMemo(() => {
    return rankedStudents
      .filter((student) => student.rank <= 5)
      .sort((a, b) => a.rank - b.rank);
  }, [rankedStudents]);

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setSelectedSession("");
    setSelectedStandard("");
    setSelectedExamTerm("");
    setSelectedSection("");

    setExamTerms([]);
    setSubjects([]);
    setSubjectClassWise([]);
    setMarksData([]);
  };

const handleVerifyAll = async () => {
  if (!selectedSession) {
    toast.error("Please select session");
    return;
  }

  if (!selectedExamTerm) {
    toast.error("Please select exam");
    return;
  }

  if (!selectedStandard) {
    toast.error("Please select standard");
    return;
  }

  if (!selectedSection) {
    toast.error("Please select section");
    return;
  }

  if (marksData.length === 0) {
    toast.error("Please load marks first");
    return;
  }

  const confirmed = window.confirm(
    "Are you sure you want to verify marks for all subjects of this class and section?"
  );

  if (!confirmed) {
    return;
  }

  try {
    setLoading(true);

    const response = await axiosInstance.put(
      "/api/assessment/marks-entry/verify",
      null,
      {
        params: {
          schoolId,
          session: selectedSession,
          examTermId: selectedExamTerm,
          studentClass: selectedStandard,
          section: selectedSection,
        },
      }
    );

    console.log("Verify Response:", response.data);

    toast.success(
      response.data?.message ||
        "All subject marks verified successfully"
    );

    // Reload marks
    await loadMarks();

  } catch (error) {
    console.error("Verify Marks Error:", error);

    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);

    toast.error(
      error.response?.data?.message ||
        error.response?.data ||
        "Failed to verify marks"
    );
  } finally {
    setLoading(false);
  }
};

  const getStatusBadge = (status) => {
    switch (status) {
      case "GENERATED":
        return "bg-success";

      case "VERIFIED":
        return "bg-primary";

      case "PUBLISHED":
        return "bg-dark";

      default:
        return "bg-warning text-dark";
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <span className="badge bg-warning text-dark">
          <FaTrophy className="me-1" />
          1st
        </span>
      );
    }

    if (rank === 2) {
      return (
        <span className="badge bg-secondary">
          <FaMedal className="me-1" />
          2nd
        </span>
      );
    }

    if (rank === 3) {
      return (
        <span className="badge bg-info text-dark">
          <FaMedal className="me-1" />
          3rd
        </span>
      );
    }

    return <span className="badge bg-light text-dark border">{rank}th</span>;
  };

  return (
    <>
      <div
        className="row shadow-sm"
        style={{
          backgroundColor: "white",
          margin: "10px",
          minHeight: "70px",
          borderRadius: "8px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6 className="mb-1">
          <LuNotebookText className="me-2" />
          Marks Verification
        </h6>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <small>Home</small>
              </a>
            </li>

            <li className="breadcrumb-item">
              <small>Assessment</small>
            </li>

            <li className="breadcrumb-item active">
              <small>Marks Verification</small>
            </li>
          </ol>
        </nav>
      </div>

      {/* =====================================================
          FILTER
      ===================================================== */}

      <div className="ms-2 me-2 mt-3 p-3 rounded shadow-sm bg-white">
        <div className="row g-3">
          {/* SESSION */}

          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-label fw-semibold">
              Session <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={selectedSession}
              onChange={(e) => {
                setSelectedSession(e.target.value);

                setSelectedExamTerm("");
                setSelectedStandard("");
                setSelectedSection("");

                setMarksData([]);
                setSubjects([]);
                setSubjectClassWise([]);
              }}
            >
              <option value="">Select Session</option>

              {sessions?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* EXAM */}

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label fw-semibold">
              Exam <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              disabled={!selectedSession}
              value={selectedExamTerm}
              onChange={(e) => {
                setSelectedExamTerm(e.target.value);

                setSelectedStandard("");
                setSelectedSection("");
                setMarksData([]);
                setSubjects([]);
              }}
            >
              <option value="">Select Exam</option>

              {examTerms?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.examTerm}
                </option>
              ))}
            </select>
          </div>

          {/* STANDARD */}

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label fw-semibold">
              Standard <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              disabled={!selectedExamTerm}
              value={selectedStandard}
              onChange={(e) => {
                setSelectedStandard(e.target.value);

                setSelectedSection("");
                setMarksData([]);
              }}
            >
              <option value="">Select Standard</option>

              {standards?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* SECTION */}

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label fw-semibold">
              Section <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              disabled={!selectedStandard}
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);

                setMarksData([]);
              }}
            >
              <option value="">Select Section</option>

              {sections?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* BUTTONS */}

          <div className="col-12 col-lg-4 d-flex align-items-end gap-2">
            <button
              className="btn btn-outline-dark flex-fill"
              onClick={handleReset}
            >
              <RiResetLeftLine className="me-1" />
              Reset
            </button>

            <button
              className="btn btn-success flex-fill"
              onClick={loadMarks}
              disabled={loading}
            >
              <IoMdSearch size={20} className="me-1" />

              {loading ? "Loading..." : "Load Marks"}
            </button>

            <button
              className="btn btn-info flex-fill"
              onClick={handleVerifyAll}
              disabled={loading}
            >
              <i className="bi bi-patch-check-fill me-1"></i>

              {loading ? "Processing..." : "Verify All Marks"}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-5 text-center">
          <div
            className="spinner-border text-success"
            role="status"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />

          <div className="mt-3 text-muted">Loading marks, please wait...</div>
        </div>
      )}

      {/* =====================================================
          RESULT
      ===================================================== */}

      {!loading && rankedStudents.length > 0 && (
        <>
          {/* =================================================
                SUMMARY CARDS
            ================================================= */}

          <div className="ms-2 me-2 mt-4">
            <div className="row g-3">
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="bg-white rounded shadow-sm p-3">
                  <small className="text-muted">Total Students</small>

                  <h4 className="mb-0 mt-1">{rankedStudents.length}</h4>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="bg-white rounded shadow-sm p-3">
                  <small className="text-muted">Total Subjects</small>

                  <h4 className="mb-0 mt-1">{subjectClasswise.length}</h4>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="bg-white rounded shadow-sm p-3">
                  <small className="text-muted">Maximum Marks</small>

                  <h4 className="mb-0 mt-1">{grandTotalMaxMarks}</h4>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="bg-white rounded shadow-sm p-3">
                  <small className="text-muted">Topper</small>

                  <h6 className="mb-0 mt-2 text-success">
                    {rankedStudents[0]?.studentName}
                  </h6>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
                TOP 5 STUDENTS
            ================================================= */}

          <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h6 className="mb-1">
                  <FaTrophy className="me-2 text-warning" />
                  Top 5 Students
                </h6>

                <small className="text-muted">Based on total marks</small>
              </div>
            </div>

            <div className="row g-3">
              {topFiveStudents.map((student) => (
                <div
                  key={student.studentId}
                  className="col-12 col-sm-6 col-lg-4 col-xl-2"
                >
                  <div
                    className="border rounded p-3 h-100"
                    style={{
                      background: student.rank === 1 ? "#fff9e6" : "#f8f9fa",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      {getRankBadge(student.rank)}

                      <strong>
                        {student.grandTotal}/{student.grandTotalMax}
                      </strong>
                    </div>

                    <div className="mt-3">
                      <strong>{student.studentName}</strong>

                      <div>
                        <small className="text-muted">
                          {student.admissionNumber}
                        </small>
                      </div>
                    </div>

                    <div className="mt-2">
                      <span className="badge bg-success-subtle text-success">
                        {student.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
                MAIN MARKS TABLE
            ================================================= */}

          <div className="ms-2 me-2 mt-4 rounded bg-white shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h6 className="mb-1">Marks Verification</h6>

                <small className="text-muted">
                  {selectedSession}
                  {" | "}
                  {
                    examTerms.find(
                      (item) => String(item.id) === String(selectedExamTerm),
                    )?.examTerm
                  }
                  {" | "}
                  {selectedStandard}
                  {" | Section "}
                  {selectedSection}
                </small>
              </div>

              <span className="badge bg-success">
                {rankedStudents.length} Students
              </span>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th
                      className="text-center"
                      style={{
                        minWidth: "60px",
                      }}
                    >
                      Rank
                    </th>

                    <th
                      className="text-center"
                      style={{
                        minWidth: "60px",
                      }}
                    >
                      #
                    </th>

                    <th
                      style={{
                        minWidth: "130px",
                      }}
                    >
                      Admission No
                    </th>

                    <th
                      style={{
                        minWidth: "180px",
                      }}
                    >
                      Student Name
                    </th>

                    {/* SUBJECTS */}

                    {subjectClasswise.map((subject) => (
                      <th
                        key={subject.subjectId}
                        className="text-center"
                        style={{
                          minWidth: "180px",
                        }}
                      >
                        <div>
                          <strong>{subject.subjectName}</strong>
                        </div>

                        <small className="text-muted">
                          Max: {getSubjectMaxMarks(subject.subjectId)}
                        </small>
                      </th>
                    ))}

                    <th
                      className="text-center"
                      style={{
                        minWidth: "130px",
                      }}
                    >
                      Total
                    </th>

                    <th
                      className="text-center"
                      style={{
                        minWidth: "100px",
                      }}
                    >
                      %
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rankedStudents.map((student, index) => (
                    <tr
                      key={student.studentId}
                      className={student.rank <= 5 ? "table-warning" : ""}
                    >
                      {/* RANK */}

                      <td className="text-center">
                        {getRankBadge(student.rank)}
                      </td>

                      {/* SERIAL */}

                      <td className="text-center">{index + 1}</td>

                      {/* ADMISSION */}

                      <td>
                        <strong>{student.admissionNumber}</strong>
                      </td>

                      {/* STUDENT */}

                      <td>
                        <strong>{student.studentName}</strong>
                      </td>

                      {/* SUBJECT MARKS */}

                      {subjectClasswise.map((subject) => {
                        const mark = student.subjects?.[subject.subjectId];

                        const subjectMax = getSubjectMaxMarks(
                          subject.subjectId,
                        );

                        return (
                          <td
                            key={subject.subjectId}
                            className="text-center align-middle"
                          >
                            {mark ? (
                              <div>
                                {/* TOTAL */}

                                <div className="mb-2">
                                  <div className="fs-5 fw-bold">
                                    {mark.totalMarks}
                                    <span className="text-muted fs-6">
                                      /{subjectMax}
                                    </span>
                                  </div>

                                  <span className="badge bg-light text-dark border">
                                    Grade: {mark.grade}
                                  </span>
                                </div>

                                {/* COMPONENTS */}

                                <div className="border-top border-bottom py-2 mb-2 text-start">
                                  {mark.components?.length > 0 ? (
                                    mark.components.map((component) => (
                                      <div
                                        key={component.componentId}
                                        className="d-flex justify-content-between small mb-1"
                                      >
                                        <span className="text-muted">
                                          {component.componentName}
                                        </span>

                                        <strong>
                                          {component.obtainedMarks}

                                          <span className="text-muted">
                                            /{component.maxMarks}
                                          </span>
                                        </strong>
                                      </div>
                                    ))
                                  ) : (
                                    <small className="text-muted">
                                      No component marks
                                    </small>
                                  )}
                                </div>

                                {/* STATUS */}

                                <span
                                  className={`badge ${getStatusBadge(
                                    mark.status,
                                  )}`}
                                >
                                  {mark.status}
                                </span>
                              </div>
                            ) : (
                              <div>
                                <div className="fs-5 fw-bold text-muted">
                                  0
                                  <span className="text-muted fs-6">
                                    /{subjectMax}
                                  </span>
                                </div>

                                <span className="badge bg-danger">
                                  Marks Not Entered
                                </span>
                              </div>
                            )}
                          </td>
                        );
                      })}

                      {/* GRAND TOTAL */}

                      <td className="text-center">
                        <div className="fs-5 fw-bold text-success">
                          {student.grandTotal}
                        </div>

                        <small className="text-muted">
                          / {student.grandTotalMax}
                        </small>
                      </td>

                      {/* PERCENTAGE */}

                      <td className="text-center">
                        <span className="badge bg-success-subtle text-success">
                          {student.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

                {/* =================================================
                      FOOTER
                  ================================================= */}

                <tfoot className="table-light">
                  <tr>
                    <th colSpan="4" className="text-end">
                      Maximum Marks
                    </th>

                    {subjectClasswise.map((subject) => (
                      <th key={subject.subjectId} className="text-center">
                        {getSubjectMaxMarks(subject.subjectId)}
                      </th>
                    ))}

                    <th className="text-center">{grandTotalMaxMarks}</th>

                    <th className="text-center">100%</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      )}

      {/* =====================================================
          NO DATA
      ===================================================== */}

      {!loading && rankedStudents.length === 0 && (
        <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-5 text-center">
          <LuNotebookText size={45} className="text-muted mb-3" />

          <h6 className="text-muted">No Marks Data</h6>

          <small className="text-muted">
            Select Session, Exam, Standard and Section, then click{" "}
            <strong>Load Marks</strong>.
          </small>
        </div>
      )}
    </>
  );
};

export default MarksVerification;
