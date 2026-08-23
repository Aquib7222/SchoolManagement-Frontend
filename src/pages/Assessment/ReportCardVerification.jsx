// import React, { useEffect, useState } from "react";
// import { IoMdSearch } from "react-icons/io";
// import { LuNotebookText } from "react-icons/lu";
// import { RiResetLeftLine } from "react-icons/ri";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";

// const ReportCardVerification = () => {
//      const schoolId = JSON.parse(localStorage.getItem("schoolId"));
//   const { sessions, standards, sections } = useMasters();
//   const [loading, setLoading] = useState(false);

//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedExamTerm, setSelectedExamTerm] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");

//   const [examTerms, setExamTerms] = useState([]);

//   const loadExamTerms = async () => {
//       if (!selectedSession) {
//         setExamTerms([]);
//         return;
//       }

//       try {
//         const response = await axiosInstance.get(
//           `/api/assessment/exam-term?schoolId=${schoolId}&session=${selectedSession}`,
//         );

//         setExamTerms(response.data || []);
//       } catch (error) {
//         console.error("Exam Term Error:", error);

//         toast.error(error.response?.data || "Failed to load exam terms");
//       }
//     };

//     useEffect(() => {
//       loadExamTerms();
//     }, [selectedSession]);
//   return (
//     <>
//       <div
//         className="row shadow-sm"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           minHeight: "70px",
//           borderRadius: "8px",
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

//       <div className="ms-2 me-2 mt-3 p-3 rounded shadow-sm bg-white">
//         <div className="row g-3">
//           {/* SESSION */}

//           <div className="col-12 col-sm-6 col-lg-3">
//             <label className="form-label fw-semibold">
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

//                 setMarksData([]);
//                 setSubjects([]);
//                 setSubjectClassWise([]);
//               }}
//             >
//               <option value="">Select Session</option>

//               {sessions?.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* EXAM */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label fw-semibold">
//               Exam <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               disabled={!selectedSession}
//               value={selectedExamTerm}
//               onChange={(e) => {
//                 setSelectedExamTerm(e.target.value);

//                 setSelectedStandard("");
//                 setSelectedSection("");
//                 // setMarksData([]);
//                 // setSubjects([]);
//               }}
//             >
//               <option value="">Select Exam</option>

//               {examTerms?.map((item) => (
//                 <option key={item.id} value={item.id}>
//                   {item.examTerm}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* STANDARD */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label fw-semibold">
//               Standard <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               disabled={!selectedExamTerm}
//               value={selectedStandard}
//               onChange={(e) => {
//                 setSelectedStandard(e.target.value);

//                 setSelectedSection("");
//                 setMarksData([]);
//               }}
//             >
//               <option value="">Select Standard</option>

//               {standards?.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* SECTION */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label fw-semibold">
//               Section <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               disabled={!selectedStandard}
//               value={selectedSection}
//               onChange={(e) => {
//                 setSelectedSection(e.target.value);

//                 setMarksData([]);
//               }}
//             >
//               <option value="">Select Section</option>

//               {sections?.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* BUTTONS */}

//           <div className="col-12 col-lg-3 d-flex align-items-end gap-2">
//             <button
//               className="btn btn-outline-dark flex-fill"
//               //   onClick={handleReset}
//             >
//               <RiResetLeftLine className="me-1" />
//               Reset
//             </button>

//             <button
//               className="btn btn-success flex-fill"
//               //   onClick={loadMarks}
//               disabled={loading}
//             >
//               <IoMdSearch size={20} className="me-1" />

//               {loading ? "Loading..." : "Load Report"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReportCardVerification;

import React, { useEffect, useMemo, useRef, useState } from "react";
import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";

import { toast } from "react-toastify";

import { RiResetLeftLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { LuNotebookText } from "react-icons/lu";
import {
  FaEye,
  FaDownload,
  FaTimes,
  FaCheckCircle,
  FaTrophy,
} from "react-icons/fa";

const ReportCardVerification = () => {
  const schoolId = JSON.parse(localStorage.getItem("schoolId"));

  /*
   * =========================================================
   * USER / SCHOOL DATA FROM LOCAL STORAGE
   * =========================================================
   */

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const schoolName =
    storedUser?.schoolName ||
    storedUser?.school?.schoolName ||
    localStorage.getItem("schoolName") ||
    "School Name";

  const schoolAddress =
    storedUser?.schoolAddress ||
    storedUser?.school?.address ||
    localStorage.getItem("schoolAddress") ||
    "";

  const schoolPhone =
    storedUser?.schoolPhone ||
    storedUser?.school?.phone ||
    localStorage.getItem("schoolPhone") ||
    "";

  /*
   * =========================================================
   * MASTERS
   * =========================================================
   */

  const { sessions, standards, sections } = useMasters();

  /*
   * =========================================================
   * STATES
   * =========================================================
   */

  const [loading, setLoading] = useState(false);

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedExamTerm, setSelectedExamTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [examTerms, setExamTerms] = useState([]);

  const [subjectClasswise, setSubjectClassWise] = useState([]);
  const [marksData, setMarksData] = useState([]);

  const [grades, setGrades] = useState([]);

  /*
   * =========================================================
   * REPORT CARD MODAL
   * =========================================================
   */

  const [selectedStudent, setSelectedStudent] = useState(null);

  const reportCardRef = useRef(null);

  /*
   * =========================================================
   * LOAD EXAM TERMS
   * =========================================================
   */

  const loadExamTerms = async () => {
    if (!selectedSession) {
      setExamTerms([]);
      return;
    }

    try {
      const response = await axiosInstance.get("/api/assessment/exam-term", {
        params: {
          schoolId,
          session: selectedSession,
        },
      });

      setExamTerms(response.data || []);
    } catch (error) {
      console.error("Exam Term Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load exam terms",
      );
    }
  };

  useEffect(() => {
    loadExamTerms();
  }, [selectedSession]);

  /*
   * =========================================================
   * LOAD GRADES
   * =========================================================
   */

  const loadGrades = async () => {
    try {
      const response = await axiosInstance.get("/api/assessment/grade", {
        params: {
          schoolId,
        },
      });

      console.log("Grades:", response.data);

      setGrades(response.data || []);
    } catch (error) {
      console.error("Get Grades Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load grades",
      );
    }
  };

  useEffect(() => {
    loadGrades();
  }, []);

  /*
   * =========================================================
   * LOAD SUBJECT CLASS WISE
   * =========================================================
   */

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
    } catch (error) {
      console.error("Subject Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load subjects",
      );
    }
  };

  useEffect(() => {
    loadSubjectClassWise();
  }, [selectedSession, selectedStandard, selectedExamTerm]);

  /*
   * =========================================================
   * LOAD MARKS
   * =========================================================
   */

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

      console.log("Report Card Subject Wise Marks:", response.data);

      const subjectWiseData = response.data || [];

      /*
       * =====================================================
       * CREATE STUDENT MAP
       * =====================================================
       */

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
        toast.success("Report card data loaded successfully");
      }
    } catch (error) {
      console.error("Report Card Marks Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load marks",
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================================
   * SUBJECT MAX MARKS
   * =========================================================
   */

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

  /*
   * =========================================================
   * GRAND TOTAL MAX
   * =========================================================
   */

  const grandTotalMaxMarks = useMemo(() => {
    return subjectClasswise.reduce((total, subject) => {
      return total + getSubjectMaxMarks(subject.subjectId);
    }, 0);
  }, [subjectClasswise, marksData]);

  /*
   * =========================================================
   * STUDENT TOTAL
   * =========================================================
   */

  const calculateStudentTotal = (student) => {
    return subjectClasswise.reduce((total, subject) => {
      const mark = student.subjects?.[subject.subjectId];

      return total + (Number(mark?.totalMarks) || 0);
    }, 0);
  };

  /*
   * =========================================================
   * RANKING
   * =========================================================
   */

  const rankedStudents = useMemo(() => {
    const students = marksData.map((student) => {
      const grandTotal = calculateStudentTotal(student);

      return {
        ...student,

        grandTotal,

        grandTotalMax: grandTotalMaxMarks,

        percentage:
          grandTotalMaxMarks > 0
            ? ((grandTotal / grandTotalMaxMarks) * 100).toFixed(2)
            : "0.00",
      };
    });

    students.sort((a, b) => b.grandTotal - a.grandTotal);

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

  /*
   * =========================================================
   * FIND GRADE FROM GRADE MASTER
   * =========================================================
   */

  const getOverallGrade = (percentage) => {
    const value = Number(percentage);

    const grade = grades.find(
      (item) =>
        value >= Number(item.minPercentage) &&
        value <= Number(item.maxPercentage),
    );

    return grade || null;
  };

  /*
   * =========================================================
   * RESULT STATUS
   * =========================================================
   */

  const getResultStatus = (student) => {
    const hasEGrade = Object.values(student.subjects || {}).some(
      (subject) =>
        String(subject.grade || "")
          .trim()
          .toUpperCase() === "E",
    );

    return hasEGrade ? "FAIL" : "PASS";
  };

  const reportCardStudents = useMemo(() => {
    return rankedStudents.map((student) => ({
      ...student,
      resultStatus: getResultStatus(student),
    }));
  }, [rankedStudents]);

  /*
   * =========================================================
   * RESET
   * =========================================================
   */

  const handleReset = () => {
    setSelectedSession("");
    setSelectedStandard("");
    setSelectedExamTerm("");
    setSelectedSection("");

    setExamTerms([]);
    setSubjectClassWise([]);
    setMarksData([]);
    setSelectedStudent(null);
  };

  /*
   * =========================================================
   * OPEN REPORT CARD
   * =========================================================
   */

  const handleViewReportCard = (student) => {
    setSelectedStudent(student);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  /*
   * =========================================================
   * CLOSE REPORT CARD
   * =========================================================
   */

  const handleCloseReportCard = () => {
    setSelectedStudent(null);
  };

  /*
   * =========================================================
   * DOWNLOAD REPORT CARD
   * =========================================================
   */

  const handleDownloadReportCard = (student) => {
    setSelectedStudent(student);

    setTimeout(() => {
      window.print();
    }, 500);
  };

  /*
   * =========================================================
   * STATUS
   * =========================================================
   */

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

  /*
   * =========================================================
   * REPORT CARD
   * =========================================================
   */

  const renderReportCard = () => {
    if (!selectedStudent) {
      return null;
    }

    const overallGrade = getOverallGrade(selectedStudent.percentage);

    const resultStatus = getResultStatus(selectedStudent);

    return (
      <div className="report-card-wrapper">
        <div
          className="report-card"
          ref={reportCardRef}
          style={{
            minHeight: "1123px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* HEADER */}

          <div className="text-center border-bottom pb-3">
            <h2 className="fw-bold mb-1">{schoolName}</h2>

            {schoolAddress && <div className="text-muted">{schoolAddress}</div>}

            {schoolPhone && (
              <div className="text-muted">Phone: {schoolPhone}</div>
            )}

            <h4 className="mt-3 fw-bold">REPORT CARD</h4>

            <div className="fw-semibold">
              Academic Session: {selectedSession}
            </div>

            <div>
              Examination:{" "}
              {
                examTerms.find(
                  (item) => String(item.id) === String(selectedExamTerm),
                )?.examTerm
              }
            </div>
          </div>

          {/* STUDENT INFORMATION */}

          <div className="row mt-4">
            <div className="col-6">
              <table className="table table-sm table-bordered mb-0">
                <tbody>
                  <tr>
                    <th width="40%">Student Name</th>

                    <td>{selectedStudent.studentName}</td>
                  </tr>

                  <tr>
                    <th>Admission No</th>

                    <td>{selectedStudent.admissionNumber}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-6">
              <table className="table table-sm table-bordered mb-0">
                <tbody>
                  <tr>
                    <th width="40%">Class</th>

                    <td>{selectedStandard}</td>
                  </tr>

                  <tr>
                    <th>Section</th>

                    <td>{selectedSection}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SUBJECT MARKS */}

          <div className="mt-4">
            <h6 className="fw-bold">Academic Performance</h6>

            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject</th>

                    <th>Written</th>
                    <th>Periodic</th>
                    <th>Project</th>
                    <th>Oral</th>

                    <th>Total 100</th>

                    <th>Grade</th>
                    <th>Grade Point</th>
                    <th>Remark</th>
                  </tr>
                </thead>

                <tbody>
                  {subjectClasswise.map((subject, index) => {
                    const mark = selectedStudent.subjects?.[subject.subjectId];

                    return (
                      <React.Fragment key={subject.subjectId}>
                        <tr>
                          <td>{index + 1}</td>

                          <td className="fw-semibold">{subject.subjectName}</td>

                          <td className="text-center">
                            {(() => {
                              const component = mark?.components?.find(
                                (item) =>
                                  String(item.componentName || "")
                                    .trim()
                                    .toLowerCase() === "written exam",
                              );

                              return component
                                ? `${component.obtainedMarks}/${component.maxMarks}`
                                : "-";
                            })()}
                          </td>
                          <td className="text-center">
                            {(() => {
                              const component = mark?.components?.find(
                                (item) =>
                                  String(item.componentName || "")
                                    .trim()
                                    .toLowerCase() === "periodic test",
                              );

                              return component
                                ? `${component.obtainedMarks}/${component.maxMarks}`
                                : "-";
                            })()}
                          </td>
                          <td className="text-center">
                            {(() => {
                              const component = mark?.components?.find(
                                (item) =>
                                  String(item.componentName || "")
                                    .trim()
                                    .toLowerCase() === "project / assignement",
                              );

                              return component
                                ? `${component.obtainedMarks}/${component.maxMarks}`
                                : "-";
                            })()}
                          </td>
                          <td className="text-center">
                            {(() => {
                              const component = mark?.components?.find(
                                (item) =>
                                  String(item.componentName || "")
                                    .trim()
                                    .toLowerCase() === "oral / viva",
                              );

                              return component
                                ? `${component.obtainedMarks}/${component.maxMarks}`
                                : "-";
                            })()}
                          </td>

                          <td className="text-center fw-bold">
                            {mark?.totalMarks || 0}
                            {/* {getSubjectMaxMarks(subject.subjectId)} */}
                          </td>

                          <td className="text-center">
                            <span className="badge bg-light text-dark border">
                              {mark?.grade || "-"}
                            </span>
                          </td>

                          <td className="text-center">
                            {mark?.gradePoint || "-"}
                          </td>

                          <td>{mark?.remark || "-"}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>

                <tfoot>
                  <tr>
                    <th colSpan="6" className="text-end">
                      Grand Total
                    </th>

                    <th className="text-center">
                      {selectedStudent.grandTotal}/
                      {selectedStudent.grandTotalMax}
                    </th>

                    {/* <th className="text-center">
                      {selectedStudent.percentage}%
                    </th> */}

                    <th className="text-center">
                      {overallGrade?.grade || "-"}
                    </th>

                    <th className="text-center">
                      {overallGrade?.gradePoint || "-"}
                    </th>

                    <th>{overallGrade?.remarks || "-"}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* RESULT SUMMARY */}

          <div className="row g-3 mt-3">
            <div className="col-md-3">
              <div className="border rounded p-3 text-center">
                <small className="text-muted">Total Marks</small>

                <h5 className="mb-0">
                  {selectedStudent.grandTotal}/{selectedStudent.grandTotalMax}
                </h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="border rounded p-3 text-center">
                <small className="text-muted">Percentage</small>

                <h5 className="mb-0">{selectedStudent.percentage}%</h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="border rounded p-3 text-center">
                <small className="text-muted">Grade</small>

                <h5 className="mb-0">{overallGrade?.grade || "-"}</h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="border rounded p-3 text-center">
                <small className="text-muted">Rank</small>

                <h5 className="mb-0">
                  <FaTrophy className="text-warning me-1" />

                  {selectedStudent.rank}
                </h5>
              </div>
            </div>
          </div>

          {/* RESULT */}

          <div className="text-center mt-4">
            <span
              className={`badge fs-6 px-4 py-2 ${
                resultStatus === "PASS" ? "bg-success" : "bg-danger"
              }`}
            >
              {resultStatus}
            </span>
          </div>

          <div className="mt-3">
            <small>
              This report card presents the student's subject-wise academic
              performance, including component marks, total marks, percentage,
              grade, remarks, and overall result for the selected examination.
            </small>
          </div>

          {/* SIGNATURE */}

          <div className="row mt-5 pt-4">
            <div className="col-4 text-center">
              <div className="border-top pt-2">Class Teacher</div>
            </div>

            <div className="col-4 text-center">
              <div className="border-top pt-2">Principal</div>
            </div>

            <div className="col-4 text-center">
              <div className="border-top pt-2">Parent / Guardian</div>
            </div>
          </div>

          <div className="alert bg-warning mt-4 text-white mb-0 mt-auto">
            <small>
              {" "}
             <strong> Note</strong>: The result shown in this report card is based on the marks
              verified by the school. Any correction or discrepancy should be
              brought to the attention of the school administration.
            </small>
          </div>
        </div>
      </div>
    );
  };

  const resultSummary = useMemo(() => {
    let totalPass = 0;
    let totalFail = 0;

    rankedStudents.forEach((student) => {
      const isFail = Object.values(student.subjects || {}).some(
        (subject) =>
          String(subject.grade || "")
            .trim()
            .toUpperCase() === "E",
      );

      if (isFail) {
        totalFail++;
      } else {
        totalPass++;
      }
    });

    return {
      totalPass,
      totalFail,
    };
  }, [rankedStudents]);

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
          Report Card Verification
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
              <small>Report Card Verification</small>
            </li>
          </ol>
        </nav>
      </div>

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

          <div className="col-12 col-lg-3 d-flex align-items-end gap-2">
            <button className="btn btn-outline-dark" onClick={handleReset}>
              <RiResetLeftLine className="me-1" />
              Reset
            </button>

            <button
              className="btn btn-success flex-fill"
              onClick={loadMarks}
              disabled={loading}
            >
              <IoMdSearch size={20} className="me-1" />

              {loading ? "Loading..." : "Load Students"}
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-5 text-center">
          <div className="spinner-border text-success" role="status" />

          <div className="mt-3 text-muted">Loading report cards...</div>
        </div>
      )}

      {!loading && rankedStudents.length > 0 && (
        <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1">
                <LuNotebookText className="me-2" />
                Student Report Cards
              </h6>

              <small className="text-muted">
                {selectedSession} |{" "}
                {
                  examTerms.find(
                    (item) => String(item.id) === String(selectedExamTerm),
                  )?.examTerm
                }{" "}
                | {selectedStandard} | Section {selectedSection}
              </small>
            </div>
          </div>
          <div className="row mt-4 mb-4">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-white rounded shadow p-3">
                <h6 className="text-muted">Total Students</h6>

                <h4 className="mb-0 mt-1 text-danger">
                  {rankedStudents.length}
                </h4>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-white rounded shadow p-3">
                <h6 className="text-muted">Total Pass</h6>

                <h4 className="mb-0 mt-1 text-success">
                  {resultSummary.totalPass}
                </h4>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-white rounded shadow p-3">
                <h6 className="text-muted">Total Fail</h6>

                <h4 className="mb-0 mt-1 text-danger">
                  {resultSummary.totalFail}
                </h4>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th className="text-center">#</th>

                  <th>Admission No</th>

                  <th>Student Name</th>

                  <th className="text-center">Total</th>

                  <th className="text-center">Percentage</th>

                  <th className="text-center">Grade</th>

                  <th className="text-center">Rank</th>

                  <th className="text-center">Status</th>

                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {rankedStudents.map((student, index) => {
                  const grade = getOverallGrade(student.percentage);

                  const result = getResultStatus(student);

                  return (
                    <tr key={student.studentId}>
                      <td className="text-center">{index + 1}</td>

                      <td>
                        <strong>{student.admissionNumber}</strong>
                      </td>

                      <td>
                        <strong>{student.studentName}</strong>
                      </td>

                      <td className="text-center">
                        <strong>{student.grandTotal}</strong>/
                        {student.grandTotalMax}
                      </td>

                      <td className="text-center">
                        <span className="badge bg-success-subtle text-success">
                          {student.percentage}%
                        </span>
                      </td>

                      <td className="text-center">
                        <span className="badge bg-light text-dark border">
                          {grade?.grade || "-"}
                        </span>
                      </td>

                      <td className="text-center">
                        <span className="badge bg-warning text-dark">
                          <FaTrophy className="me-1" />
                          {student.rank}
                        </span>
                      </td>

                      <td className="text-center">
                        <span
                          className={`badge ${
                            result === "PASS" ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {result}
                        </span>
                      </td>

                      <td className="text-center">
                        {Object.values(student.subjects || {}).every(
                          (subject) => subject.status === "VERIFIED",
                        ) ? (
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleViewReportCard(student)}
                            >
                              <i className="bi bi-eye-fill me-1"></i>
                              View
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-success"
                              onClick={() => handleDownloadReportCard(student)}
                            >
                              <i className="bi bi-download me-1"></i>
                              Download
                            </button>
                          </div>
                        ) : (
                          <span className="badge bg-warning text-dark">
                            <i className="bi bi-clock me-1"></i>
                            Not Verified
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================
          NO DATA
      ===================================================== */}

      {!loading && rankedStudents.length === 0 && (
        <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-5 text-center">
          <LuNotebookText size={45} className="text-muted mb-3" />

          <h6 className="text-muted">No Students Found</h6>

          <small className="text-muted">
            Select Session, Exam, Standard and Section, then click{" "}
            <strong>Load Students</strong>.
          </small>
        </div>
      )}

      {selectedStudent && (
        <div className="report-card-modal">
          <div className="report-card-toolbar">
            <button
              className="btn btn-secondary"
              onClick={handleCloseReportCard}
            >
              <FaTimes className="me-1" />
              Close
            </button>

            <button
              className="btn btn-success"
              onClick={() => handleDownloadReportCard(selectedStudent)}
            >
              <FaDownload className="me-1" />
              Download / Print
            </button>
          </div>

          {renderReportCard()}
        </div>
      )}

      {/* =====================================================
          PRINT CSS
      ===================================================== */}

      <style>{`
        .report-card-modal {
        //   position: sticky;
       
          inset: 0;
          z-index: 9999;
        //   background: #f1f3f5;
          overflow-y: auto;
          padding: 20px;
        }

        .report-card-toolbar {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          background: white;
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,.12);
          margin-bottom: 20px;
        }

        .report-card-wrapper {
          display: flex;
          justify-content: center;
        }

        .report-card {
          width: 210mm;
          min-height: 297mm;
          background: white;
          padding: 7mm;
          box-shadow: 0 2px 12px rgba(0,0,0,.15);
        }

        .report-card table {
          font-size: 13px;
        }

        @media (max-width: 768px) {
          .report-card-modal {
            padding: 8px;
          }

          .report-card {
            width: 100%;
            min-height: auto;
            padding: 12px;
          }

          .report-card-toolbar {
            position: sticky;
          }
        }

        @media print {
          body * {
            visibility: hidden !important;
          }

          .report-card,
          .report-card * {
            visibility: visible !important;
          }

          .report-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            min-height: 297mm;
            box-shadow: none;
            margin: 0;
          }

          .report-card-toolbar {
            display: none !important;
          }

          .report-card-modal {
            position: static;
            background: white;
            padding: 0;
          }

          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
};

export default ReportCardVerification;
