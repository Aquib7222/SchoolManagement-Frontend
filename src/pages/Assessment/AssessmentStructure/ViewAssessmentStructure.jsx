import React, { useEffect, useState } from "react";
import useMasters from "../../../hooks/useMasters";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axiosInstance";
import { FaPlus } from "react-icons/fa6";
import { RiResetLeftLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Viewstructures = () => {
  const schoolId = JSON.parse(localStorage.getItem("schoolId"));
  const navigate = useNavigate();
  const { sessions, standards } = useMasters();
  const [examTerms, setExamTerms] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedExamTerm, setSelectedExamTerm] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [structures, setStructures] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("selected exam", selectedExamTerm);
  console.log("selected session", selectedSession);
  console.log("selected standard", selectedStandard);
  console.log("selected subjectid", selectedSubjectId);

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

  const handleLoadStructure = async () => {
    if (!selectedSession) {
      toast.error("Please select session");
      return;
    }

    if (!selectedExamTerm) {
      toast.error("Please select exam term");
      return;
    }

    if (!selectedStandard) {
      toast.error("Please select class");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/api/assessment/class-subject/mapped?schoolId=${schoolId}&academicYear=${selectedSession}&studentClass=${selectedStandard}`,
      );

      console.log("Mapped Subjects:", response.data);

      setSubjects(response.data || []);

      setSelectedSubjectId(null);
      setComponents([]);

      toast.success("Subjects loaded successfully");
    } catch (error) {
      console.log("Load Structure Error:", error);

      toast.error(error.response?.data || "Failed to load structure");
    } finally {
      setLoading(false);
    }
  };
  console.log("subject", subjects);

  const handleSessionChange = (e) => {
    const value = e.target.value;

    setSelectedSession(value);
    setSelectedExamTerm("");
    setSelectedStandard("");
    setSelectedSubjectId("");

    setExamTerms([]);
    setSubjects([]);
    setStructures([]);

    if (value) {
      loadExamTerms(value);
    }
  };
  const handleStandardChange = async (e) => {
    const value = e.target.value;

    setSelectedStandard(value);
    setSelectedSubjectId("");
    setSubjects([]);
    setStructures([]);

    if (!value) return;

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/api/assessment/class-subject/mapped?schoolId=${schoolId}&academicYear=${selectedSession}&studentClass=${value}`,
      );

      console.log("Mapped Subjects:", response.data);

      setSubjects(response.data || []);
    } catch (error) {
      console.log("Subject Error:", error);

      toast.error(error.response?.data || "Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = async () => {
    if (!selectedSession) {
      toast.error("Please select session");
      return;
    }

    if (!selectedExamTerm) {
      toast.error("Please select exam term");
      return;
    }

    if (!selectedStandard) {
      toast.error("Please select class");
      return;
    }

    if (!selectedSubjectId) {
      toast.error("Please select subject");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/api/assessment-structure/get`,
        {
          params: {
            schoolId: schoolId,
            session: selectedSession,
            examTerm: selectedExamTerm,
            studentClass: selectedStandard,
            subjectId: selectedSubjectId,
          },
        },
      );

      console.log("Assessment Structure:", response.data);

      if (!response.data) {
        toast.info("No assessment structure found");
        setStructures([]);
        return;
      }

      setStructures([response.data]);

      toast.success("Assessment structure loaded successfully");
    } catch (error) {
      console.log("Search Structure Error:", error);

      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);

      toast.error(
        error.response?.data || "Failed to load assessment structure",
      );
    } finally {
      setLoading(false);
    }
  };
  console.log(" Structure:", structures);

  const handleReset = () => {
    setSelectedSession("");
    setSelectedExamTerm("");
    setSelectedStandard("");
    setSelectedSubjectId("");

    setExamTerms([]);
    setSubjects([]);
    setStructures([]);
  };

  const structure = structures?.[0];

  const selectedSubject = subjects.find(
    (subject) => String(subject.id) === String(selectedSubjectId),
  );

  const handleAddStructure = ()=>{
        navigate("/assessment/add/structure");
  }
  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="row shadow-lg"
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
          <i className="bi bi-diagram-3 me-2"></i>
          View Assessment Structure
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

            <li className="breadcrumb-item">
              <small>Assessment Structure</small>
            </li>

            <li className="breadcrumb-item active">
              <small>View Assessment Structure</small>
            </li>
          </ol>
        </nav>
      </div>

      <div className="ms-2 me-2 mt-4 bg-white rounded shadow p-3">
        <div className="row g-3">
          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-lable">Session </label>
            <select
              name=""
              id=""
              className="form-select"
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
            >
              <option value="">Select Session</option>
              {sessions?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-lable">Exam Term </label>
            <select
              className="form-select"
              disabled={!selectedSession}
              value={selectedExamTerm}
              onChange={(e) => {
                setSelectedExamTerm(e.target.value);
                setSelectedStandard("");
                setSelectedSubjectId("");
                setSubjects([]);
                setStructures([]);
              }}
            >
              <option value="">All</option>

              {examTerms.map((item) => (
                <option key={item.id} value={item.examTerm}>
                  {item.examTerm}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-lable">Standard </label>
            <select
              className="form-select"
              disabled={!selectedExamTerm}
              value={selectedStandard}
              onChange={handleStandardChange}
            >
              <option value="">All</option>

              {standards?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-lable">Subject </label>
            <select
              className="form-select"
              disabled={!selectedStandard}
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
            >
              <option value="">All</option>

              {subjects.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.subjectName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row g-3 d-flex justify-content-end mt-3">
          <div className="col-12 col-sm-4 col-lg-2">
            <button
              className="btn btn-success w-100"
              onClick={handleSearch}
              disabled={loading}
            >
              <CiSearch size={20} />
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          <div className="col-12 col-sm-4 col-lg-2">
            <button
              className="btn btn-outline-dark border w-100"
              onClick={handleReset}
            >
              <RiResetLeftLine /> Reset
            </button>
          </div>
          <div className="col-12 col-sm-4 col-lg-3">
            <button className="btn btn-success w-100"onClick={handleAddStructure}>
              <FaPlus /> Add Structure
            </button>
          </div>
        </div>
      </div>
      <div className="ms-2 me-2 mt-4 bg-white rounded shadow p-3 ">
        <div>
          <h6 className="mb-1">Assessment Structure</h6>

          {structure && (
            <small className="text-muted">
              Session: <strong>{structure.session}</strong>
              {" | "}
              Exam Term: <strong>{structure.examTerm}</strong>
              {" | "}
              Class: <strong>{structure.studentClass}</strong>
            </small>
          )}
        </div>

        {/* TABLE */}

        {!structure ? (
          <div className="text-center text-muted py-5 border rounded">
            <strong>
              Add assessment structure to view details of{" "}
              {selectedSubject?.subjectName || "this subject"}.
            </strong>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "60px" }}>#</th>
                  <th>Assessment Type</th>
                  <th>Max Marks</th>
                  <th>Passing Marks</th>
                  <th>Weightage</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {!structure.assessmentTypes ||
                structure.assessmentTypes.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No assessment components found.
                    </td>
                  </tr>
                ) : (
                  structure.assessmentTypes
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>

                        <td>
                          <strong>{item.assessmentTypeName}</strong>
                        </td>

                        <td>{item.maxMarks}</td>

                        <td>{item.passingMarks}</td>

                        <td>
                          <span className="badge bg-primary-subtle text-primary">
                            {item.weightage}%
                          </span>
                        </td>

                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary">
                              <i className="bi bi-pencil"></i>
                            </button>

                            <button className="btn btn-sm btn-outline-danger">
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>

              {/* TOTAL */}

              {structure.assessmentTypes?.length > 0 && (
                <tfoot>
                  <tr>
                    <th colSpan="2" className="text-end">
                      Total
                    </th>

                    <th>
                      {structure.assessmentTypes.reduce(
                        (total, item) => total + Number(item.maxMarks || 0),
                        0,
                      )}
                    </th>

                    <th>
                      {structure.assessmentTypes.reduce(
                        (total, item) => total + Number(item.passingMarks || 0),
                        0,
                      )}
                    </th>

                    <th>
                      {(() => {
                        const totalWeightage = structure.assessmentTypes.reduce(
                          (total, item) => total + Number(item.weightage || 0),
                          0,
                        );

                        return (
                          <span
                            className={
                              totalWeightage === 100
                                ? "text-success fw-bold"
                                : "text-danger fw-bold"
                            }
                          >
                            {totalWeightage}%
                          </span>
                        );
                      })()}
                    </th>

                    <th></th>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Viewstructures;
