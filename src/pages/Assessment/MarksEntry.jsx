

import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { LuNotebookText } from "react-icons/lu";
import { RiResetLeftLine } from "react-icons/ri";
import { toast } from "react-toastify";

import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";

const MarksEntry = () => {
  const schoolId = JSON.parse(localStorage.getItem("schoolId"));

  const { sessions, standards, sections } = useMasters();

  // =========================================================
  // STATES
  // =========================================================

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");

  const [examTerms, setExamTerms] = useState([]);
  const [selectedExamTerm, setSelectedExamTerm] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  const [selectedSection, setSelectedSection] = useState("");

  const [students, setStudents] = useState([]);
  const [structure, setStructure] = useState(null);

  const [studentMarks, setStudentMarks] = useState({});

  const [grades, setGrades] = useState([]);
  const [savedMarks, setSavedMarks] = useState(null);

  const [loading, setLoading] = useState(false);

  // =========================================================
  // LOAD EXAM TERMS
  // =========================================================

  const loadExamTerms = async () => {
    if (!selectedSession) {
      setExamTerms([]);
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/api/assessment/exam-term?schoolId=${schoolId}&session=${selectedSession}`,
      );

      console.log("Exam Terms:", response.data);

      setExamTerms(response.data || []);
    } catch (error) {
      console.log("Exam Term Error:", error);

      toast.error(error.response?.data || "Failed to load exam terms");
    }
  };

  useEffect(() => {
    loadExamTerms();
  }, [selectedSession]);

  // =========================================================
  // LOAD SUBJECTS
  // Session + Standard + Exam
  // =========================================================

  useEffect(() => {
    if (selectedSession && selectedStandard && selectedExamTerm?.id) {
      handleLoadStructure();
    } else {
      setSubjects([]);
      setSelectedSubjectId("");
      setStructure(null);
    }
  }, [selectedSession, selectedStandard, selectedExamTerm]);

  const handleLoadStructure = async () => {
    if (!selectedSession || !selectedStandard || !selectedExamTerm?.id) {
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        "/api/assessment/class-subject/mapped",
        {
          params: {
            schoolId: schoolId,

            academicYear: selectedSession,

            studentClass: selectedStandard,
          },
        },
      );

      console.log("Mapped Subjects:", response.data);

      setSubjects(response.data || []);
    } catch (error) {
      console.error("Load Subject Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load subjects",
      );

      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD GRADES
  // =========================================================

  const loadGrades = async () => {
    try {
      const response = await axiosInstance.get("/api/assessment/grade", {
        params: {
          schoolId: schoolId,
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

  // =========================================================
  // GET GRADE FROM FRONTEND
  // =========================================================

  const getGradeAndRemark = (percentage) => {
    if (percentage <= 0 || !grades.length) {
      return {
        grade: "-",
        remark: "Not Entered",
      };
    }

    const matchedGrade = grades.find((item) => {
      const min = Number(
        item.minPercentage ?? item.minPercent ?? item.minMarks ?? 0,
      );

      const max = Number(
        item.maxPercentage ?? item.maxPercent ?? item.maxMarks ?? 100,
      );

      return percentage >= min && percentage <= max;
    });

    if (!matchedGrade) {
      return {
        grade: "-",
        remark: "Not Defined",
      };
    }

    return {
      grade:
        matchedGrade.grade ||
        matchedGrade.gradeName ||
        matchedGrade.gradeLetter ||
        "-",

      remark:
        matchedGrade.remark ||
        matchedGrade.remarks ||
        matchedGrade.description ||
        "—",
    };
  };

  // =========================================================
  // GET SAVED MARKS
  // =========================================================

  const marksResponse = async (studentList, assessmentStructure) => {
    if (
      !selectedSession ||
      !selectedExamTerm?.id ||
      !selectedStandard ||
      !selectedSection ||
      !selectedSubjectId
    ) {
      return;
    }

    try {
      const response = await axiosInstance.get("/api/assessment/marks-entry", {
        params: {
          schoolId: schoolId,

          session: selectedSession,

          examTermId: selectedExamTerm.id,
          studentClass: selectedStandard,
          section: selectedSection,
          subjectId: Number(selectedSubjectId),
        },
      });

      console.log("Saved Marks Draft Data:", response.data);

      setSavedMarks(response.data);

      // =====================================================
      // BACKEND SAVED MARKS -> FRONTEND FORMAT
      // =====================================================

      const savedStudentMarks = {};

      if (response.data?.students && response.data.students.length > 0) {
        response.data.students.forEach((savedStudent) => {
          const componentMarks = {};

          savedStudent.components?.forEach((component) => {
            componentMarks[component.componentId] =
              component.obtainedMarks ?? 0;
          });

          savedStudentMarks[savedStudent.studentId] = {
            ...componentMarks,

            totalMarks: savedStudent.totalMarks ?? 0,

            percentage: savedStudent.percentage ?? 0,

            grade: savedStudent.grade ?? "-",

            gradePoint: savedStudent.gradePoint ?? 0,

            remark: savedStudent.remark ?? "",
          };
        });
      }

      // =====================================================
      // ALL STUDENTS
      // Saved = saved value
      // Not saved = 0
      // =====================================================

      const finalMarks = {};

      studentList.forEach((student) => {
        const saved = savedStudentMarks[student.id];

        finalMarks[student.id] = {};

        (assessmentStructure?.assessmentTypes || []).forEach((component) => {
          finalMarks[student.id][component.id] = saved?.[component.id] ?? 0;
        });

        if (saved) {
          finalMarks[student.id].totalMarks = saved.totalMarks ?? 0;

          finalMarks[student.id].percentage = saved.percentage ?? 0;

          finalMarks[student.id].grade = saved.grade ?? "-";

          finalMarks[student.id].gradePoint = saved.gradePoint ?? 0;

          finalMarks[student.id].remark = saved.remark ?? "";
        }
      });

      setStudentMarks(finalMarks);
    } catch (error) {
      console.error("Get Saved Marks Error:", error.response?.data || error);

      // =====================================================
      // NO SAVED MARKS
      // ALL STUDENTS = 0
      // =====================================================

      if (error.response?.status === 404) {
        console.log("No saved marks found. Setting all marks to 0.");

        const zeroMarks = {};

        studentList.forEach((student) => {
          zeroMarks[student.id] = {};

          (assessmentStructure?.assessmentTypes || []).forEach((component) => {
            zeroMarks[student.id][component.id] = 0;
          });

          zeroMarks[student.id].totalMarks = 0;
          zeroMarks[student.id].percentage = 0;
          zeroMarks[student.id].grade = "-";
          zeroMarks[student.id].gradePoint = 0;
          zeroMarks[student.id].remark = "";
        });

        setStudentMarks(zeroMarks);
        setSavedMarks(null);
      }
    }
  };

  // =========================================================
  // LOAD STUDENTS + STRUCTURE + SAVED MARKS
  // =========================================================

  const handleLoadStudents = async () => {
    if (!selectedSession) {
      toast.error("Please select session");
      return;
    }

    if (!selectedExamTerm?.id) {
      toast.error("Please select exam");
      return;
    }

    if (!selectedStandard) {
      toast.error("Please select class");
      return;
    }

    if (!selectedSection) {
      toast.error("Please select section");
      return;
    }

    if (!selectedSubjectId) {
      toast.error("Please select subject");
      return;
    }

    try {
      setLoading(true);

      // =====================================================
      // LOAD STUDENTS
      // =====================================================

      const studentsResponse = await axiosInstance.get("/api/students/search", {
        params: {
          academicYear: selectedSession,
          studentClass: selectedStandard,
          section: selectedSection,
        },
      });

      console.log("Students:", studentsResponse.data);

      const loadedStudents = studentsResponse.data || [];

      setStudents(loadedStudents);

      // =====================================================
      // LOAD ASSESSMENT STRUCTURE
      // =====================================================

      const structureResponse = await axiosInstance.get(
        "/api/assessment-structure/get",
        {
          params: {
            schoolId: schoolId,

            /*
             * Assessment structure ke endpoint mein
             * tum currently selectedSession use kar rahe ho.
             */
            session: selectedSession,

            examTerm: selectedExamTerm.examTerm,

            studentClass: selectedStandard,

            subjectId: Number(selectedSubjectId),
          },
        },
      );

      console.log("Assessment Structure:", structureResponse.data);

      const loadedStructure = structureResponse.data;

      setStructure(loadedStructure);

      // =====================================================
      // LOAD SAVED DRAFT MARKS
      // =====================================================

      await marksResponse(loadedStudents, loadedStructure);

      toast.success("Students and saved marks loaded");
    } catch (error) {
      console.error("Load Students Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load data",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // MARK CHANGE
  // =========================================================

  const handleMarksChange = (studentId, componentId, value) => {
    setStudentMarks((prev) => ({
      ...prev,

      [studentId]: {
        ...(prev[studentId] || {}),
        [componentId]: value,
      },
    }));
  };

  // =========================================================
  // TOTAL MARKS
  // =========================================================

  const totalMaxMarks =
    structure?.assessmentTypes?.reduce(
      (sum, item) => sum + Number(item.maxMarks || 0),
      0,
    ) || 0;

  // =========================================================
  // TOTAL PASSING MARKS
  // =========================================================

  const totalPassingMarks =
    structure?.assessmentTypes?.reduce(
      (sum, item) => sum + Number(item.passingMarks || 0),
      0,
    ) || 0;

  // =========================================================
  // SAVE DRAFT
  // =========================================================

  const handleSaveDraft = async () => {
    if (!selectedSession) {
      toast.error("Please select session");
      return;
    }

    if (!selectedExamTerm?.id) {
      toast.error("Please select exam");
      return;
    }

    if (!selectedStandard) {
      toast.error("Please select class");
      return;
    }

    if (!selectedSection) {
      toast.error("Please select section");
      return;
    }

    if (!selectedSubjectId) {
      toast.error("Please select subject");
      return;
    }

    if (!students.length) {
      toast.error("No students available");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        schoolId: schoolId,

        session: selectedSession,

        examTermId: selectedExamTerm.id,

        studentClass: selectedStandard,

        section: selectedSection,

        subjectId: Number(selectedSubjectId),

        students: students.map((student) => {
          const marks = studentMarks[student.id] || {};

          return {
            studentId: student.id,

            components: (structure?.assessmentTypes || []).map((component) => ({
              componentId: component.id,

              obtainedMarks:
                marks[component.id] !== undefined && marks[component.id] !== ""
                  ? Number(marks[component.id])
                  : 0,
            })),
          };
        }),
      };

      console.log("SAVE DRAFT PAYLOAD:", payload);

      const response = await axiosInstance.post(
        "/api/assessment/marks-entry/draft",
        payload,
      );

      console.log("Save Draft Response:", response.data);

      setSavedMarks(response.data);

      /*
       * Save ke baad backend ka latest data
       * table mein bhi load kar do.
       */

      await marksResponse(students, structure);

      toast.success("Marks saved as draft successfully");
    } catch (error) {
      console.error("Save Draft Error:", error);

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to save marks";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  

  const handleGenerateMarks = async () => {
    if (!selectedSession) {
      toast.error("Please select session");
      return;
    }

    if (!selectedExamTerm?.id) {
      toast.error("Please select exam");
      return;
    }

    if (!selectedStandard) {
      toast.error("Please select class");
      return;
    }

    if (!selectedSection) {
      toast.error("Please select section");
      return;
    }

    if (!selectedSubjectId) {
      toast.error("Please select subject");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.put(
        "/api/assessment/marks-entry/publish",
        null,
        {
          params: {
            schoolId: schoolId,

            session: selectedSession,

            examTermId: selectedExamTerm.id,

            studentClass: selectedStandard,

            section: selectedSection,

            subjectId: Number(selectedSubjectId),
          },
        },
      );

      console.log("Generate Response:", response.data);

      setSavedMarks(response.data);

      /*
       * Latest GENERATED data load
       */

      await marksResponse(students, structure);

      toast.success("Marks GENERATED successfully");
    } catch (error) {
      console.error("Generate Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to generate marks",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    setSelectedSession("");
    setSelectedStandard("");
    setSelectedExamTerm("");
    setSelectedSection("");
    setSelectedSubjectId("");

    setExamTerms([]);
    setSubjects([]);

    setStudents([]);
    setStructure(null);

    setStudentMarks({});
    setSavedMarks(null);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="row shadow"
        style={{
          backgroundColor: "white",
          margin: "10px",
          minHeight: "70px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6 className="mb-1">
          <LuNotebookText className="me-2" />
          Marks Entry
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
              <small>Marks Entry</small>
            </li>
          </ol>
        </nav>
      </div>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div className="ms-2 me-2 mt-3 p-3 rounded shadow bg-white">
        <div className="row g-2">
          {/* SESSION */}

          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-label">
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
                setSelectedSubjectId("");

                setSubjects([]);
                setStudents([]);
                setStructure(null);
                setStudentMarks({});
                setSavedMarks(null);
              }}
            >
              <option value="">Select Session</option>

              {sessions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* EXAM */}

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label">
              Exam <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              value={selectedExamTerm?.id || ""}
              onChange={(e) => {
                const selected = examTerms.find(
                  (item) => String(item.id) === e.target.value,
                );

                setSelectedExamTerm(selected || "");
              }}
            >
              <option value="">Select Exam</option>

              {examTerms.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.examTerm}
                </option>
              ))}
            </select>
          </div>

          {/* STANDARD */}

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label">
              Standard <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={selectedStandard}
              onChange={(e) => {
                setSelectedStandard(e.target.value);

                setSelectedSubjectId("");
                setStudents([]);
                setStructure(null);
                setStudentMarks({});
                setSavedMarks(null);
              }}
            >
              <option value="">Select Standard</option>

              {standards.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* SECTION */}

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label">
              Section <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);

                setStudents([]);
                setStudentMarks({});
                setSavedMarks(null);
              }}
            >
              <option value="">Select Section</option>

              {sections.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* SUBJECT */}

          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-label">
              Subject <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={selectedSubjectId}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);

                setStudents([]);
                setStructure(null);
                setStudentMarks({});
                setSavedMarks(null);
              }}
              disabled={!selectedSession || !selectedStandard || loading}
            >
              <option value="">
                {loading ? "Loading subjects..." : "Select Subject"}
              </option>

              {subjects.map((subject) => (
                <option key={subject.id} value={subject.subjectId}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* BUTTONS */}

        <div className="row g-2 mt-3">
          <div className="d-flex justify-content-end gap-2">
            <div className="col-12 col-sm-6 col-lg-2">
              <button
                className="btn btn-outline-dark w-100"
                onClick={handleReset}
              >
                <RiResetLeftLine size={20} /> Reset
              </button>
            </div>

            <div className="col-12 col-sm-6 col-lg-2">
              <button
                className="btn btn-success w-100"
                onClick={handleLoadStudents}
                disabled={loading}
              >
                <IoMdSearch size={20} />

                {loading ? "Loading..." : "Load Students"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          STRUCTURE + STUDENTS
      ===================================================== */}

      {structure && students.length > 0 && (
        <div className="mt-3 ms-2 me-2 shadow mb-3">
          {/* =================================================
              STRUCTURE CARD
          ================================================= */}

          <div className="card border-0">
            <div className="card-header">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <div>
                    <small className="text-muted">Assessment:</small>

                    <span className="fw-semibold ms-1">
                      {structure.assessmentName ||
                        structure.name ||
                        "Assessment"}
                    </span>
                  </div>

                  <span className="text-muted">|</span>

                  <div>
                    <small className="text-muted">Term:</small>

                    <span className="fw-semibold ms-1">
                      {selectedExamTerm?.examTerm || "-"}
                    </span>
                  </div>

                  <span className="text-muted">|</span>

                  <div>
                    <small className="text-muted">Max Marks:</small>

                    <span className="fw-semibold ms-1">{totalMaxMarks}</span>
                  </div>

                  <span className="text-muted">|</span>

                  <div>
                    <small className="text-muted">Passing Marks:</small>

                    <span className="fw-semibold ms-1">
                      {totalPassingMarks}
                    </span>
                  </div>

                  <span className="text-muted">|</span>

                  <div>
                    <small className="text-muted">Weightage:</small>

                    <span className="fw-semibold ms-1">
                      {structure.weightage || 100}%
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                >
                  <i className="bi bi-eye me-1"></i>
                  View Structure
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0 fw-semibold">
                  Components & Marks Distribution
                </h6>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-success"
                >
                  <i className="bi bi-pencil-square me-1"></i>
                  Edit Components
                </button>
              </div>

              <div className="row g-2">
                {(structure.assessmentTypes || []).map((component, index) => (
                  <div
                    className="col-12 col-sm-6 col-lg-2 text-center"
                    key={component.id || index}
                  >
                    <div className="border rounded p-2 h-100">
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded p-1 me-2"
                          style={{
                            backgroundColor:
                              index % 3 === 0
                                ? "#eef5ff"
                                : index % 3 === 1
                                  ? "#eefbf3"
                                  : "#f4efff",
                          }}
                        >
                          <span className="fw-bold">{index + 1}</span>
                        </div>

                        <div>
                          <div className="fw-semibold">
                            {component.assessmentTypeName ||
                              component.componentName ||
                              `Component ${index + 1}`}
                          </div>

                          <small className="text-muted">
                            {component.maxMarks || component.marks || 0} Marks
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =================================================
              MARKS TABLE
          ================================================= */}

          <div className="card shadow-sm border-0 mt-2">
            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-bordered align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th
                        rowSpan="2"
                        style={{
                          width: "40px",
                          textAlign: "center",
                        }}
                      >
                        <input type="checkbox" className="form-check-input" />
                      </th>

                      <th
                        rowSpan="2"
                        style={{
                          width: "40px",
                        }}
                      >
                        #
                      </th>

                      <th rowSpan="2">Admission No.</th>

                      <th rowSpan="2">Roll No</th>

                      <th rowSpan="2">Student Name</th>

                      {(structure.assessmentTypes || []).map(
                        (component, index) => (
                          <th
                            key={component.id || index}
                            className="text-center"
                            style={{
                              minWidth: "130px",
                            }}
                          >
                            <div className="fw-semibold">
                              {component.assessmentTypeName ||
                                component.componentName ||
                                `Component ${index + 1}`}
                            </div>

                            <small className="text-muted">
                              ({component.maxMarks || component.marks || 0})
                            </small>

                            <h6 className="fw-normal">Marks obtained</h6>
                          </th>
                        ),
                      )}

                      <th rowSpan="2" className="text-center">
                        Total
                        <br />
                        <small>({totalMaxMarks})</small>
                      </th>

                      <th rowSpan="2" className="text-center">
                        Grade
                      </th>

                      <th rowSpan="2" className="text-center">
                        Remark
                      </th>
                      <th rowSpan="2" className="text-center">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student, studentIndex) => {
                      const marks = studentMarks[student.id] || {};

                      const total = (structure.assessmentTypes || []).reduce(
                        (sum, component) => {
                          return sum + Number(marks[component.id] ?? 0);
                        },
                        0,
                      );

                      const percentage =
                        totalMaxMarks > 0 ? (total / totalMaxMarks) * 100 : 0;

                      const calculated = getGradeAndRemark(percentage);

                      const finalGrade =
                        marks.grade && marks.grade !== "-"
                          ? marks.grade
                          : calculated.grade;

                      const finalRemark =
                        marks.remark && marks.remark !== ""
                          ? marks.remark
                          : calculated.remark;

                      return (
                        <tr key={student.id || studentIndex}>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </td>

                          <td>{studentIndex + 1}</td>

                          <td className="fw-semibold">
                            {student.admissionNumber ||
                              student.admissionNo ||
                              "-"}
                          </td>

                          <td>{student.rollNumber || student.rollNo || "-"}</td>

                          <td className="fw-semibold">
                            {student.firstName || ""} {student.middleName || ""}{" "}
                            {student.lastName || ""}
                          </td>

                          {(structure.assessmentTypes || []).map(
                            (component, componentIndex) => {
                              const componentId =
                                component.id || componentIndex;

                              return (
                                <td key={componentId}>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm text-center"
                                    min="0"
                                    max={
                                      component.maxMarks ||
                                      component.marks ||
                                      100
                                    }
                                    value={
                                      marks[componentId] !== undefined
                                        ? marks[componentId]
                                        : 0
                                    }
                                    onChange={(e) =>
                                      handleMarksChange(
                                        student.id,
                                        componentId,
                                        e.target.value,
                                      )
                                    }
                                    placeholder="0"
                                  />
                                </td>
                              );
                            },
                          )}

                          {/* TOTAL */}

                          <td className="text-center">
                            <span
                              className={`fw-bold ${
                                total >= totalPassingMarks
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {total}
                            </span>
                          </td>

                          {/* GRADE */}

                          <td className="text-center">
                            <span className="badge bg-light text-dark border">
                              {finalGrade}
                            </span>
                          </td>

                          {/* REMARK */}

                          <td>
                            <select
                              className="form-select form-select-sm"
                              value={marks.remark || ""}
                              onChange={(e) =>
                                setStudentMarks((prev) => ({
                                  ...prev,

                                  [student.id]: {
                                    ...(prev[student.id] || {}),

                                    remark: e.target.value,
                                  },
                                }))
                              }
                            >
                              <option value="">{finalRemark}</option>

                              {grades.map((item) => (
                                <option
                                  key={item.id}
                                  value={
                                    item.remark ||
                                    item.remarks ||
                                    item.description ||
                                    ""
                                  }
                                >
                                  {item.remark ||
                                    item.remarks ||
                                    item.description ||
                                    "-"}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                savedMarks?.status === "GENERATED"
                                  ? "bg-success"
                                  : savedMarks?.status === "DRAFT"
                                    ? "bg-warning text-dark"
                                    : "bg-secondary"
                              }`}
                            >
                              {savedMarks?.status || "Not Saved"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-footer bg-white">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-success">
                    <i className="bi bi-file-earmark-excel me-1"></i>
                    Export Excel
                  </button>

                  <button className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-upload me-1"></i>
                    Import Excel
                  </button>

                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-chat-square-text me-1"></i>
                    Bulk Remark
                  </button>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={handleSaveDraft}
                    disabled={loading}
                  >
                    <i className="bi bi-save me-1"></i>

                    {loading ? "Saving..." : "Save as Draft"}
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={handleGenerateMarks}
                    disabled={loading}
                  >
                    <i className="bi bi-send me-1"></i>
                    Generate Marks
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <div className="row g-2 mt-2">
            <div className="col-6 col-md-4 col-lg-2">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <small className="text-muted">Total Students</small>

                  <h5 className="mb-0 fw-bold">{students.length}</h5>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <small className="text-muted">Present</small>

                  <h5 className="mb-0 text-success fw-bold">
                    {students.length}
                  </h5>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <small className="text-muted">Absent</small>

                  <h5 className="mb-0 text-danger fw-bold">0</h5>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <small className="text-muted">Average Marks</small>

                  <h5 className="mb-0 text-primary fw-bold">
                    {students.length > 0
                      ? (
                          students.reduce((sum, student) => {
                            const marks = studentMarks[student.id] || {};

                            const total = (
                              structure.assessmentTypes || []
                            ).reduce(
                              (total, component) =>
                                total + Number(marks[component.id] ?? 0),
                              0,
                            );

                            return sum + total;
                          }, 0) / students.length
                        ).toFixed(2)
                      : 0}
                  </h5>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <small className="text-muted">Highest Marks</small>

                  <h5 className="mb-0 text-success fw-bold">
                    {students.length > 0
                      ? Math.max(
                          ...students.map((student) => {
                            const marks = studentMarks[student.id] || {};

                            return (structure.assessmentTypes || []).reduce(
                              (total, component) =>
                                total + Number(marks[component.id] ?? 0),
                              0,
                            );
                          }),
                        )
                      : 0}
                  </h5>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <small className="text-muted">Lowest Marks</small>

                  <h5 className="mb-0 text-warning fw-bold">
                    {students.length > 0
                      ? Math.min(
                          ...students.map((student) => {
                            const marks = studentMarks[student.id] || {};

                            return (structure.assessmentTypes || []).reduce(
                              (total, component) =>
                                total + Number(marks[component.id] ?? 0),
                              0,
                            );
                          }),
                        )
                      : 0}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MarksEntry;
