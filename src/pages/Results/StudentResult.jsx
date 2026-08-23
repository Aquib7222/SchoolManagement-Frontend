import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

import { toast } from "react-toastify";

import { LuNotebookText } from "react-icons/lu";
import { FaDownload, FaTimes, FaTrophy } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

const StudentResult = () => {
  /* =========================================================
     LOCAL STORAGE
  ========================================================= */

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const storedSchoolId = JSON.parse(
    localStorage.getItem("schoolId") || "null"
  );

  const schoolId =
    storedUser?.schoolId ||
    storedUser?.school?.id ||
    storedSchoolId;

  const admissionNumber =
    storedUser?.admissionNumber
    ;

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


  const { sessions } = useMasters();


  const [selectedSession, setSelectedSession] = useState("");
  const [selectedExamTerm, setSelectedExamTerm] = useState("");

  const [examTerms, setExamTerms] = useState([]);

  const [result, setResult] = useState(null);

  const [loadingExamTerms, setLoadingExamTerms] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);

  const [showReportCard, setShowReportCard] = useState(false);

  

  const loadExamTerms = async (sessionValue) => {
    if (!sessionValue || !schoolId) {
      setExamTerms([]);
      return;
    }

    try {
      setLoadingExamTerms(true);

      const response = await axiosInstance.get(
        "/api/assessment/exam-term",
        {
          params: {
            schoolId,
            session: sessionValue,
          },
        }
      );

      setExamTerms(response.data || []);
    } catch (error) {
      console.error("Exam Term Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load exam terms"
      );

      setExamTerms([]);
    } finally {
      setLoadingExamTerms(false);
    }
  };

  useEffect(() => {
    if (selectedSession) {
      loadExamTerms(selectedSession);
    } else {
      setExamTerms([]);
    }

    setSelectedExamTerm("");
    setResult(null);
  }, [selectedSession]);

  

  const loadResult = async () => {
    if (!schoolId) {
      toast.error("School ID not found");
      return;
    }

    if (!admissionNumber) {
      toast.error("Admission number not found");
      return;
    }

    if (!selectedSession) {
      toast.error("Please select session");
      return;
    }

    if (!selectedExamTerm) {
      toast.error("Please select exam");
      return;
    }

    try {
      setLoadingResult(true);

      const response = await axiosInstance.get(
        "/api/assessment/result/student/admission-number",
        {
          params: {
            schoolId,
            session: selectedSession,
            examTermId: selectedExamTerm,
            admissionNumber,
          },
        }
      );

      console.log("Student Result:", response.data);

      setResult(response.data);

      toast.success("Result loaded successfully");
    } catch (error) {
      console.error("Result Error:", error);

      setResult(null);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Result not found"
      );
    } finally {
      setLoadingResult(false);
    }
  };

  /* =========================================================
     SELECTED EXAM NAME
  ========================================================= */

  const selectedExamName = useMemo(() => {
    return (
      examTerms.find(
        (item) => String(item.id) === String(selectedExamTerm)
      )?.examTerm || "-"
    );
  }, [examTerms, selectedExamTerm]);

  /* =========================================================
     SUBJECT DATA
  ========================================================= */

  const subjects = result?.subjects || [];

  /* =========================================================
     TOTAL MAX MARKS
  ========================================================= */

  const totalMaxMarks = useMemo(() => {
    if (result?.totalMaxMarks != null) {
      return Number(result.totalMaxMarks);
    }

    return subjects.reduce(
      (total, subject) => total + (Number(subject.maxMarks) || 0),
      0
    );
  }, [result, subjects]);

  /* =========================================================
     TOTAL MARKS
  ========================================================= */

  const totalMarks = useMemo(() => {
    if (result?.totalMarks != null) {
      return Number(result.totalMarks);
    }

    return subjects.reduce(
      (total, subject) => total + (Number(subject.totalMarks) || 0),
      0
    );
  }, [result, subjects]);

  /* =========================================================
     PERCENTAGE
  ========================================================= */

  const percentage = useMemo(() => {
    if (result?.percentage != null) {
      return Number(result.percentage);
    }

    if (totalMaxMarks === 0) {
      return 0;
    }

    return (totalMarks / totalMaxMarks) * 100;
  }, [result, totalMarks, totalMaxMarks]);

  /* =========================================================
     RESULT STATUS
  ========================================================= */

  const resultStatus = useMemo(() => {
    if (result?.status) {
      return result.status;
    }

    const failed = subjects.some(
      (subject) =>
        String(subject.grade || "")
          .trim()
          .toUpperCase() === "E"
    );

    return failed ? "FAIL" : "PASS";
  }, [result, subjects]);

  /* =========================================================
     DOWNLOAD / PRINT
  ========================================================= */

  const handleDownload = () => {
    setShowReportCard(true);

    setTimeout(() => {
      window.print();
    }, 500);
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setSelectedSession("");
    setSelectedExamTerm("");
    setExamTerms([]);
    setResult(null);
    setShowReportCard(false);
  };

  /* =========================================================
     COMPONENT FINDER
  ========================================================= */

  const getComponent = (subject, keyword) => {
    return (
      subject?.components?.find((component) =>
        String(component.componentName || "")
          .trim()
          .toLowerCase()
          .includes(keyword.toLowerCase())
      ) || null
    );
  };

  /* =========================================================
     REPORT CARD
  ========================================================= */

  const renderReportCard = () => {
    if (!result) {
      return null;
    }

    return (
      <div className="report-card-wrapper">
        <div className="report-card">

          {/* HEADER */}

          <div className="text-center border-bottom pb-3">

            <h2 className="fw-bold mb-1">
              {schoolName}
            </h2>

            {schoolAddress && (
              <div className="text-muted">
                {schoolAddress}
              </div>
            )}

            {schoolPhone && (
              <div className="text-muted">
                Phone: {schoolPhone}
              </div>
            )}

            <h4 className="mt-3 fw-bold">
              REPORT CARD
            </h4>

            <div className="fw-semibold">
              Academic Session: {selectedSession}
            </div>

            <div>
              Examination: {selectedExamName}
            </div>
          </div>

          {/* STUDENT INFORMATION */}

          <div className="row mt-4">

            <div className="col-6">

              <table className="table table-sm table-bordered mb-0">

                <tbody>

                  <tr>
                    <th width="40%">
                      Student Name
                    </th>

                    <td>
                      {result.studentName || "-"}
                    </td>
                  </tr>

                  <tr>
                    <th>
                      Admission No
                    </th>

                    <td>
                      {result.admissionNumber || admissionNumber}
                    </td>
                  </tr>

                  <tr>
                    <th>
                      Student ID
                    </th>

                    <td>
                      {result.studentId || "-"}
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

            <div className="col-6">

              <table className="table table-sm table-bordered mb-0">

                <tbody>

                  <tr>
                    <th width="40%">
                      Class
                    </th>

                    <td>
                      {result.studentClass || "-"}
                    </td>
                  </tr>

                  <tr>
                    <th>
                      Section
                    </th>

                    <td>
                      {result.section || "-"}
                    </td>
                  </tr>

                  <tr>
                    <th>
                      Rank
                    </th>

                    <td>
                      {result.rank || "-"}
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

          {/* ACADEMIC PERFORMANCE */}

          <div className="mt-4">

            <h6 className="fw-bold">
              Academic Performance
            </h6>

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

                    <th>Total</th>

                    <th>Max</th>

                    <th>Grade</th>

                    <th>Point</th>

                    <th>Remark</th>

                  </tr>

                </thead>

                <tbody>

                  {subjects.map((subject, index) => {

                    const written =
                      getComponent(
                        subject,
                        "written"
                      );

                    const periodic =
                      getComponent(
                        subject,
                        "periodic"
                      );

                    const project =
                      getComponent(
                        subject,
                        "project"
                      );

                    const oral =
                      getComponent(
                        subject,
                        "oral"
                      );

                    return (
                      <tr key={subject.id || index}>

                        <td>
                          {index + 1}
                        </td>

                        <td className="fw-semibold">
                          {subject.subjectName || "-"}
                        </td>

                        <td className="text-center">
                          {written
                            ? `${written.obtainedMarks}/${written.maxMarks}`
                            : "-"}
                        </td>

                        <td className="text-center">
                          {periodic
                            ? `${periodic.obtainedMarks}/${periodic.maxMarks}`
                            : "-"}
                        </td>

                        <td className="text-center">
                          {project
                            ? `${project.obtainedMarks}/${project.maxMarks}`
                            : "-"}
                        </td>

                        <td className="text-center">
                          {oral
                            ? `${oral.obtainedMarks}/${oral.maxMarks}`
                            : "-"}
                        </td>

                        <td className="text-center fw-bold">
                          {subject.totalMarks ?? 0}
                        </td>

                        <td className="text-center">
                          {subject.maxMarks ?? 0}
                        </td>

                        <td className="text-center">

                          <span className="badge bg-light text-dark border">
                            {subject.grade || "-"}
                          </span>

                        </td>

                        <td className="text-center">
                          {subject.gradePoint ?? "-"}
                        </td>

                        <td>
                          {subject.remark || "-"}
                        </td>

                      </tr>
                    );

                  })}

                </tbody>

                <tfoot>

                  <tr>

                    <th
                      colSpan="6"
                      className="text-end"
                    >
                      Grand Total
                    </th>

                    <th className="text-center">
                      {totalMarks}
                    </th>

                    <th className="text-center">
                      {totalMaxMarks}
                    </th>

                    <th colSpan="3">
                      {percentage.toFixed(2)}%
                    </th>

                  </tr>

                </tfoot>

              </table>

            </div>

          </div>

          {/* RESULT SUMMARY */}

          <div className="row g-3 mt-3">

            <div className="col-md-3">

              <div className="border rounded p-3 text-center">

                <small className="text-muted">
                  Total Marks
                </small>

                <h5 className="mb-0">
                  {totalMarks}/{totalMaxMarks}
                </h5>

              </div>

            </div>

            <div className="col-md-3">

              <div className="border rounded p-3 text-center">

                <small className="text-muted">
                  Percentage
                </small>

                <h5 className="mb-0">
                  {percentage.toFixed(2)}%
                </h5>

              </div>

            </div>

            <div className="col-md-3">

              <div className="border rounded p-3 text-center">

                <small className="text-muted">
                  Grade
                </small>

                <h5 className="mb-0">
                  {result.grade || "-"}
                </h5>

              </div>

            </div>

            <div className="col-md-3">

              <div className="border rounded p-3 text-center">

                <small className="text-muted">
                  Rank
                </small>

                <h5 className="mb-0">

                  <FaTrophy className="text-warning me-1" />

                  {result.rank || "-"}

                </h5>

              </div>

            </div>

          </div>

          {/* RESULT STATUS */}

          <div className="text-center mt-4">

            <span
              className={`badge fs-6 px-4 py-2 ${
                resultStatus === "PASS"
                  ? "bg-success"
                  : resultStatus === "FAIL"
                  ? "bg-danger"
                  : "bg-dark"
              }`}
            >
              {resultStatus}
            </span>

          </div>

          {/* REMARK */}

          <div className="mt-3">

            <strong>Overall Remark:</strong>{" "}

            {result.remark || "-"}

          </div>

          {/* SIGNATURE */}

          <div className="row mt-5 pt-4">

            <div className="col-4 text-center">

              <div className="border-top pt-2">
                Class Teacher
              </div>

            </div>

            <div className="col-4 text-center">

              <div className="border-top pt-2">
                Principal
              </div>

            </div>

            <div className="col-4 text-center">

              <div className="border-top pt-2">
                Parent / Guardian
              </div>

            </div>

          </div>

          <div className="alert alert-warning mt-4 mb-0">

            <small>

              <strong>Note:</strong>{" "}
              This report card is generated from the
              academic result recorded by the school.

            </small>

          </div>

        </div>
      </div>
    );
  };


  return (
    <>
      {/* PAGE HEADER */}

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

          My Result
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

              <small>Student</small>

            </li>

            <li className="breadcrumb-item active">

              <small>Result</small>

            </li>

          </ol>

        </nav>

      </div>

      {/* SEARCH */}

      <div className="ms-2 me-2 mt-3 p-3 rounded shadow-sm bg-white">

        <div className="row g-3 align-items-end">

          {/* ADMISSION NUMBER */}

          {/* <div className="col-12 col-md-4">

            <label className="form-label fw-semibold">
              Admission Number
            </label>

            <input
              type="text"
              className="form-control"
              value={admissionNumber}
              readOnly
            />

          </div> */}

          {/* SESSION */}

          <div className="col-12 col-md-3">

            <label className="form-label fw-semibold">
              Session
            </label>

            <select
              className="form-select"
              value={selectedSession}
              onChange={(e) =>
                setSelectedSession(e.target.value)
              }
            >

              <option value="">
                Select Session
              </option>

              {sessions?.map((item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              ))}

            </select>

          </div>

          {/* EXAM */}

          <div className="col-12 col-md-3">

            <label className="form-label fw-semibold">
              Examination
            </label>

            <select
              className="form-select"
              disabled={
                !selectedSession ||
                loadingExamTerms
              }
              value={selectedExamTerm}
              onChange={(e) =>
                setSelectedExamTerm(e.target.value)
              }
            >

              <option value="">
                {loadingExamTerms
                  ? "Loading..."
                  : "Select Exam"}
              </option>

              {examTerms?.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.examTerm}
                </option>

              ))}

            </select>

          </div>

          {/* BUTTONS */}

          <div className="col-12 col-md-2 d-flex gap-2">

            <button
              className="btn btn-outline-dark"
              onClick={handleReset}
            >
              Reset
            </button>

            <button
              className="btn btn-success flex-fill"
              onClick={loadResult}
              disabled={loadingResult}
            >

              <IoMdSearch className="me-1" />

              {loadingResult
                ? "Loading..."
                : "View Result"}

            </button>

          </div>

        </div>

      </div>

      {/* RESULT */}

      {result && !showReportCard && (

        <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-3">

          {/* RESULT HEADER */}

          <div className="d-flex justify-content-between align-items-center mb-3">

            <div>

              <h5 className="fw-bold mb-1">
                Result
              </h5>

              <small className="text-muted">

                {result.studentName} |{" "}
                {result.admissionNumber} |{" "}
                {selectedSession} |{" "}
                {selectedExamName}

              </small>

            </div>

            <div className="d-flex gap-2">

              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  setShowReportCard(true)
                }
              >
                View Report Card
              </button>

              <button
                className="btn btn-success"
                onClick={handleDownload}
              >
                <FaDownload className="me-1" />
                Download
              </button>

            </div>

          </div>

          {/* STUDENT INFO */}

          <div className="row g-3 mb-4">

            <div className="col-12 col-md-3">

              <div className="border rounded p-3">

                <small className="text-muted">
                  Student Name
                </small>

                <div className="fw-bold">
                  {result.studentName || "-"}
                </div>

              </div>

            </div>

            <div className="col-12 col-md-3">

              <div className="border rounded p-3">

                <small className="text-muted">
                  Admission Number
                </small>

                <div className="fw-bold">
                  {result.admissionNumber || "-"}
                </div>

              </div>

            </div>

            <div className="col-12 col-md-3">

              <div className="border rounded p-3">

                <small className="text-muted">
                  Class
                </small>

                <div className="fw-bold">
                  {result.studentClass || "-"}
                </div>

              </div>

            </div>

            <div className="col-12 col-md-3">

              <div className="border rounded p-3">

                <small className="text-muted">
                  Section
                </small>

                <div className="fw-bold">
                  {result.section || "-"}
                </div>

              </div>

            </div>

          </div>

          {/* SUMMARY */}

          <div className="row g-3 mb-4">

            <div className="col-6 col-lg-3">

              <div className="border rounded p-3 text-center">

                <small className="text-muted">
                  Total Marks
                </small>

                <h5 className="mb-0">
                  {totalMarks}/{totalMaxMarks}
                </h5>

              </div>

            </div>

            <div className="col-6 col-lg-3">

              <div className="border rounded p-3 text-center">

                <small className="text-muted">
                  Percentage
                </small>

                <h5 className="mb-0">
                  {percentage.toFixed(2)}%
                </h5>

              </div>

            </div>

            <div className="col-6 col-lg-3">

              <div className="border rounded p-3 text-center">

                <small className="text-muted">
                  Grade
                </small>

                <h5 className="mb-0">
                  {result.grade || "-"}
                </h5>

              </div>

            </div>

            <div className="col-6 col-lg-3">

              <div className="border rounded p-3 text-center">

                <small className="text-muted">
                  Rank
                </small>

                <h5 className="mb-0">

                  <FaTrophy className="text-warning me-1" />

                  {result.rank || "-"}

                </h5>

              </div>

            </div>

          </div>

          {/* SUBJECT TABLE */}

          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>#</th>

                  <th>Subject</th>

                  <th className="text-center">
                    Total Marks
                  </th>

                  <th className="text-center">
                    Max Marks
                  </th>

                  <th className="text-center">
                    Percentage
                  </th>

                  <th className="text-center">
                    Grade
                  </th>

                  <th className="text-center">
                    Grade Point
                  </th>

                  <th>
                    Remark
                  </th>

                </tr>

              </thead>

              <tbody>

                {subjects.map((subject, index) => (

                  <React.Fragment
                    key={subject.id || index}
                  >

                    <tr>

                      <td>
                        {index + 1}
                      </td>

                      <td className="fw-semibold">
                        {subject.subjectName}
                      </td>

                      <td className="text-center fw-bold">
                        {subject.totalMarks}
                      </td>

                      <td className="text-center">
                        {subject.maxMarks}
                      </td>

                      <td className="text-center">

                        {subject.percentage != null
                          ? `${subject.percentage}%`
                          : "-"}

                      </td>

                      <td className="text-center">

                        <span className="badge bg-light text-dark border">

                          {subject.grade || "-"}

                        </span>

                      </td>

                      <td className="text-center">

                        {subject.gradePoint ?? "-"}

                      </td>

                      <td>
                        {subject.remark || "-"}
                      </td>

                    </tr>

                    {/* COMPONENTS */}

                    {subject.components?.length > 0 && (

                      <tr>

                        <td></td>

                        <td colSpan="7">

                          <div className="table-responsive">

                            <table className="table table-sm table-bordered mb-0">

                              <thead>

                                <tr>

                                  <th>
                                    Component
                                  </th>

                                  <th className="text-center">
                                    Obtained
                                  </th>

                                  <th className="text-center">
                                    Max Marks
                                  </th>

                                  <th className="text-center">
                                    Percentage
                                  </th>

                                  <th className="text-center">
                                    Grade
                                  </th>

                                </tr>

                              </thead>

                              <tbody>

                                {subject.components.map(
                                  (component) => (

                                    <tr
                                      key={
                                        component.id
                                      }
                                    >

                                      <td>
                                        {
                                          component.componentName
                                        }
                                      </td>

                                      <td className="text-center">
                                        {
                                          component.obtainedMarks
                                        }
                                      </td>

                                      <td className="text-center">
                                        {
                                          component.maxMarks
                                        }
                                      </td>

                                      <td className="text-center">
                                        {
                                          component.percentage
                                        }
                                        %
                                      </td>

                                      <td className="text-center">
                                        {
                                          component.grade ||
                                          "-"
                                        }
                                      </td>

                                    </tr>

                                  )
                                )}

                              </tbody>

                            </table>

                          </div>

                        </td>

                      </tr>

                    )}

                  </React.Fragment>

                ))}

              </tbody>

              <tfoot>

                <tr>

                  <th
                    colSpan="2"
                    className="text-end"
                  >
                    Grand Total
                  </th>

                  <th className="text-center">
                    {totalMarks}
                  </th>

                  <th className="text-center">
                    {totalMaxMarks}
                  </th>

                  <th className="text-center">
                    {percentage.toFixed(2)}%
                  </th>

                  <th className="text-center">
                    {result.grade || "-"}
                  </th>

                  <th className="text-center">
                    {result.gradePoint || "-"}
                  </th>

                  <th>
                    {result.remark || "-"}
                  </th>

                </tr>

              </tfoot>

            </table>

          </div>

          {/* STATUS */}

          <div className="text-center mt-4">

            <span
              className={`badge fs-6 px-4 py-2 ${
                resultStatus === "PASS"
                  ? "bg-success"
                  : resultStatus === "FAIL"
                  ? "bg-danger"
                  : "bg-dark"
              }`}
            >
              {resultStatus}
            </span>

          </div>

        </div>

      )}

      {/* NO RESULT */}

      {!loadingResult &&
        !result &&
        selectedSession &&
        selectedExamTerm && (

          <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-5 text-center">

            <LuNotebookText
              size={45}
              className="text-muted mb-3"
            />

            <h6 className="text-muted">
              No Result Found
            </h6>

            <small className="text-muted">
              No result found for admission number{" "}
              <strong>{admissionNumber}</strong>.
            </small>

          </div>

        )}

      {/* REPORT CARD */}

      {showReportCard && result && (

        <div className="report-card-modal">

          <div className="report-card-toolbar">

            <button
              className="btn btn-secondary"
              onClick={() =>
                setShowReportCard(false)
              }
            >
              <FaTimes className="me-1" />
              Close
            </button>

            <button
              className="btn btn-success"
              onClick={handleDownload}
            >
              <FaDownload className="me-1" />
              Download / Print
            </button>

          </div>

          {renderReportCard()}

        </div>

      )}

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        .report-card-modal {
        //   position: fixed;
          inset: 0;
          z-index: 9999;
          background: #f1f3f5;
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
          font-size: 12px;
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

export default StudentResult;