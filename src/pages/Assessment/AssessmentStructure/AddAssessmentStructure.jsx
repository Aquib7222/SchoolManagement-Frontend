import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaSearch, FaTrash, FaSave, FaEdit } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { RiResetLeftLine } from "react-icons/ri";
import { toast } from "react-toastify";

import useMasters from "../../../hooks/useMasters";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddAssessmentStructure = () => {
  const { sessions, standards } = useMasters();
  const navigate = useNavigate();

  const schoolId = JSON.parse(localStorage.getItem("schoolId"));

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedExamTerm, setSelectedExamTerm] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");

  const [examTerms, setExamTerms] = useState([]);

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  const [assessmentTypes, setAssessmentTypes] = useState([]);

  const [components, setComponents] = useState([]);

  const [loading, setLoading] = useState(false);

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

  const loadAssessmentTypes = async (examTermId) => {
    if (!examTermId) {
      setAssessmentTypes([]);
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/api/assessment/type/exam-term?schoolId=${schoolId}&examTermId=${examTermId}`,
      );

      console.log("Assessment Types:", response.data);

      setAssessmentTypes(response.data || []);
    } catch (error) {
      console.log("Assessment Type Error:", error);

      toast.error(error.response?.data || "Failed to load assessment types");
    }
  };

  const handleExamTermChange = (e) => {
    const value = e.target.value;

    setSelectedExamTerm(value);

    if (value) {
      loadAssessmentTypes(value);
    } else {
      setAssessmentTypes([]);
    }
  };

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

  const handleReset = () => {
    setSelectedSession("");
    setSelectedExamTerm("");
    setSelectedStandard("");

    setExamTerms([]);
    setSubjects([]);
    setAssessmentTypes([]);
    setSelectedSubjectId(null);
    setComponents([]);
  };

  const handleSubjectSelect = async (subject) => {
    setSelectedSubjectId(subject.id);
    setComponents([]);

    if (!selectedSession || !selectedExamTerm || !selectedStandard) {
      toast.error("Please select session, exam term and class first");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.get(`/api/assessment/structure`, {
        params: {
          schoolId: schoolId,
          academicYear: selectedSession,
          examTermId: selectedExamTerm,
          studentClass: selectedStandard,
          subjectId: subject.id,
        },
      });

      console.log("Existing Structure:", response.data);
      

      const existingComponents = response.data?.components || [];

      setComponents(
        existingComponents.map((item) => ({
          id: item.id || Date.now() + Math.random(),

          assessmentTypeId: item.assessmentTypeId || "",

          assessmentTypeName: item.assessmentTypeName || "",

          categoryName: item.categoryName || "",

          nature: item.nature || "",

          maxMarks: item.maxMarks ?? 0,

          passingMarks: item.passingMarks ?? 0,

          weightage: item.weightage ?? 0,

          displayOrder: item.displayOrder || 1,
        })),
      );

      toast.success("Assessment structure loaded");
    } catch (error) {
      console.log("Existing Structure Error:", error);

      // 404 means structure does not exist yet
      if (error.response?.status === 404) {
        setComponents([]);

        toast.info("No assessment structure found. Create a new one.");

        return;
      }

      toast.error(
        error.response?.data || "Failed to load assessment structure",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddComponent = () => {
    if (!selectedSubjectId) {
      toast.error("Please select a subject first");
      return;
    }

    setComponents((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,

        assessmentTypeId: "",

        assessmentTypeName: "",

        categoryName: "",

        nature: "",

        maxMarks: 0,

        passingMarks: 0,

        weightage: 0,

        displayOrder: prev.length + 1,
      },
    ]);
  };

  const handleAssessmentTypeChange = (index, typeId) => {
    const selectedType = assessmentTypes.find(
      (item) => String(item.id) === String(typeId),
    );

    setComponents((prev) =>
      prev.map((component, i) => {
        if (i !== index) return component;

        return {
          ...component,

          assessmentTypeId: typeId,

          assessmentTypeName: selectedType?.typeName || "",

          categoryName: selectedType?.categoryName || "",

          nature: selectedType?.nature || "",

          maxMarks: selectedType?.maxMarks || 0,

          passingMarks: selectedType?.passingMarks || 0,

          weightage: selectedType?.weightage || 0,
        };
      }),
    );
  };

  const handleComponentChange = (index, field, value) => {
    setComponents((prev) =>
      prev.map((component, i) =>
        i === index
          ? {
              ...component,
              [field]: value === "" ? "" : Number(value),
            }
          : component,
      ),
    );
  };

  const handleDeleteComponent = (index) => {
    setComponents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditComponent = (index) => {
    toast.info("Component is ready for editing");
  };

  const selectedSubject = subjects.find(
    (subject) => String(subject.id) === String(selectedSubjectId),
  );

  const totalMaxMarks = useMemo(() => {
    return components.reduce(
      (total, item) => total + Number(item.maxMarks || 0),
      0,
    );
  }, [components]);

  const totalPassingMarks = useMemo(() => {
    return components.reduce(
      (total, item) => total + Number(item.passingMarks || 0),
      0,
    );
  }, [components]);

  const totalWeightage = useMemo(() => {
    return components.reduce(
      (total, item) => total + Number(item.weightage || 0),
      0,
    );
  }, [components]);

  const handleSaveStructure = async () => {
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

    if (components.length === 0) {
      toast.error("Please add at least one component");
      return;
    }

    const invalidComponent = components.some(
      (item) =>
        !item.assessmentTypeId ||
        Number(item.maxMarks) <= 0 ||
        Number(item.passingMarks) < 0 ||
        Number(item.passingMarks) > Number(item.maxMarks),
    );

    if (invalidComponent) {
      toast.error("Please complete all component details");
      return;
    }

    if (totalWeightage !== 100) {
      toast.error(`Total weightage must be 100%. Current: ${totalWeightage}%`);
      return;
    }

    const selectedExamTermData = examTerms.find(
      (item) => String(item.id) === String(selectedExamTerm),
    );

    const payload = {
      schoolId: Number(schoolId),
      session: selectedSession,
      examTerm: selectedExamTermData?.examTerm,
      studentClass: selectedStandard,
      subjectId: Number(selectedSubjectId),

      assessmentTypes: components.map((item, index) => ({
        assessmentTypeId: Number(item.assessmentTypeId),
        maxMarks: Number(item.maxMarks),
        passingMarks: Number(item.passingMarks),
        weightage: Number(item.weightage),
        displayOrder: index + 1,
      })),
    };

    console.log("========== SUBJECT DEBUG ==========");
console.log("Selected Subject ID:", selectedSubjectId);
console.log("Selected Subject:", selectedSubject);
console.log("All Subjects:", subjects);
console.log("Payload:", payload);

    console.log("========== SAVE PAYLOAD ==========");
    console.log(JSON.stringify(payload, null, 2));
    console.log("Components:", components);
    console.log("Components length:", components.length);
    console.log("SAVE ASSESSMENT STRUCTURE:", payload);

    try {
      setLoading(true);

      const response = await axiosInstance.post(
        "/api/assessment-structure/save",
        payload,
      );

      console.log("Assessment Structure Saved:", response.data);

      toast.success("Assessment structure saved successfully");

      // backend se saved data wapas aaya hai
      if (response.data?.components) {
        setComponents(
          response.data.components.map((item) => ({
            id: item.id,

            assessmentTypeId: item.assessmentTypeId,

            assessmentTypeName: item.assessmentTypeName,

            categoryName: item.categoryName,

            nature: item.nature,

            maxMarks: item.maxMarks,

            passingMarks: item.passingMarks,

            weightage: item.weightage,

            displayOrder: item.displayOrder,
          })),
        );
      }
    } catch (error) {
      console.log("Save Structure Error:", error);

      console.log("Status:", error.response?.status);

      console.log("Response:", error.response?.data);

      toast.error(
        error.response?.data || "Failed to save assessment structure",
      );
    } finally {
      setLoading(false);
    }
  };

  console.log("exam Terms", examTerms);
  const handleAddSubject = () => {
    navigate("assessment/subject-management/master");
  };
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
          Add Assessment Structure
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
              <small>Add Assessment Structure</small>
            </li>
          </ol>
        </nav>
      </div>

      {/* =====================================================
          EXAM DETAILS
      ===================================================== */}

      <div className="ms-2 me-2 mt-3 bg-white rounded shadow p-3">
        <h6 className="mb-3">
          <span className="me-2">1.</span>
          Exam Details
        </h6>

        <div className="row g-3">
          {/* SESSION */}

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label">
              Session <span className="text-danger">*</span>
            </label>

            <select
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

          {/* EXAM TERM */}

          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-label">
              Exam Term <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={selectedExamTerm}
              onChange={handleExamTermChange}
              disabled={!selectedSession}
            >
              <option value="">Select Exam Term</option>

              {examTerms.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.examTerm}
                </option>
              ))}
            </select>
          </div>

          {/* CLASS */}

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label">
              Class <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
            >
              <option value="">Select Class</option>

              {standards?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* BUTTONS */}

          <div className="col-12 col-sm-6 col-lg-2">
            <button
              className="btn btn-outline-secondary  w-100"
              style={{ marginTop: "34px" }}
              onClick={handleReset}
            >
              <RiResetLeftLine /> Reset
            </button>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <button
              className="btn btn-primary "
              style={{ marginTop: "34px" }}
              onClick={handleLoadStructure}
              disabled={loading}
            >
              <FaSearch /> {loading ? "Loading..." : "Load Structure"}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="ms-2 me-2 mt-3">
        <div className="row g-3">
          {/* =================================================
              SUBJECTS
          ================================================= */}

          <div className="col-12 col-lg-4">
            <div className="bg-white rounded shadow p-3 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">
                  <span className="me-2">2.</span>
                  Subjects
                </h6>

                <button
                  className="btn btn-primary btn-sm"
                 onClick={() => navigate("/assessment/subject-management/master")}
                >
                  <FaPlus /> Add Subject
                </button>
              </div>

              <div
                className="alert alert-warning py-2"
                style={{ fontSize: "13px" }}
              >
                <MdErrorOutline /> Select a subject to configure its assessment
                components.
              </div>

              {subjects.length === 0 ? (
                <div className="text-center text-muted py-5">
                  <small>No subjects loaded.</small>
                </div>
              ) : (
                subjects.map((subject, index) => (
                  <div
                    key={subject.id}
                    onClick={() => handleSubjectSelect(subject)}
                    className="border rounded mb-2 p-2"
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        String(selectedSubjectId) === String(subject.id)
                          ? "#eef5ff"
                          : "white",
                      border:
                        String(selectedSubjectId) === String(subject.id)
                          ? "1px solid #0d6efd"
                          : "1px solid #dee2e6",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>
                          {index + 1}. {subject.subjectName}
                        </strong>

                        {/* <div>
                          <small className="text-muted">
                            {subject.shortCode}
                          </small>
                        </div> */}
                      </div>

                      <span className="text-success">
                        <small>Max Marks: 100</small>
                      </span>
                    </div>
                  </div>
                ))
              )}

              {subjects.length > 0 && (
                <div
                  className="alert alert-warning mt-3 mb-0"
                  style={{ fontSize: "12px" }}
                >
                  <MdErrorOutline /> Drag and drop subjects to reorder.
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              COMPONENTS
          ================================================= */}

          <div className="col-12 col-lg-8">
            <div className="bg-white rounded shadow p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="mb-1">
                    <span className="me-2">3.</span>
                    Components & Marks Distribution
                  </h6>

                  {selectedSubject && (
                    <small className="text-muted">
                      Selected Subject:{" "}
                      <strong className="text-success">
                        {selectedSubject.subjectName}
                      </strong>{" "}
                      (Max Marks: 100)
                    </small>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={handleAddComponent}
                  >
                    <FaPlus /> Add Component
                  </button>

                  {selectedSubject && (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        setSelectedSubjectId(null);
                        setComponents([]);
                      }}
                    >
                      <FaTrash /> Remove Subject
                    </button>
                  )}
                </div>
              </div>

              {!selectedSubject ? (
                <div className="text-center text-muted py-5 border rounded">
                  <small>Select a subject from the left side.</small>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th style={{ minWidth: "180px" }}>
                            Assessment Type{" "}
                            <span className="text-danger">*</span>
                          </th>
                          <th>Category</th>
                          <th>Nature</th>
                          <th>
                            Max Marks <span className="text-danger">*</span>
                          </th>
                          <th>
                            Passing Marks <span className="text-danger">*</span>
                          </th>
                          <th>
                            Weightage (%) <span className="text-danger">*</span>
                          </th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {components.length === 0 ? (
                          <tr>
                            <td
                              colSpan="8"
                              className="text-center text-muted py-4"
                            >
                              No components added. Click{" "}
                              <strong>Add Component</strong>
                            </td>
                          </tr>
                        ) : (
                          components.map((component, index) => (
                            <tr key={component.id}>
                              <td>{index + 1}</td>

                              {/* ASSESSMENT TYPE */}

                              <td>
                                <select
                                  className="form-select form-select-sm"
                                  value={component.assessmentTypeId}
                                  onChange={(e) =>
                                    handleAssessmentTypeChange(
                                      index,
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="">Select Type</option>

                                  {assessmentTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                      {type.typeName}
                                    </option>
                                  ))}
                                </select>
                              </td>

                              {/* CATEGORY */}

                              <td>
                                <span
                                  className={
                                    `badge ` +
                                    (component.categoryName || "")
                                      .toLowerCase()
                                      .includes("internal")
                                      ? "bg-success-subtle text-success"
                                      : (component.categoryName || "")
                                            .toLowerCase()
                                            .includes("external")
                                        ? "bg-primary-subtle text-primary"
                                        : "bg-secondary-subtle text-secondary"
                                  }
                                >
                                  {(component.categoryName || "-")
                                    .replace("Assessment", "")
                                    .trim()}
                                </span>
                              </td>

                              {/* NATURE */}

                              <td>
                                <span
                                  className={
                                    `badge ` +
                                    ((component.nature || "").includes(
                                      "FORMATIVE",
                                    )
                                      ? "bg-success-subtle text-success"
                                      : (component.nature || "").includes(
                                            "SUMMATIVE",
                                          )
                                        ? "bg-primary-subtle text-primary"
                                        : (component.nature || "").includes(
                                              "PRACTICAL",
                                            )
                                          ? "bg-info-subtle text-info"
                                          : (component.nature || "").includes(
                                                "ORAL",
                                              )
                                            ? "bg-warning-subtle text-warning"
                                            : "bg-secondary-subtle text-secondary")
                                  }
                                >
                                  {component.nature || "-"}
                                </span>
                              </td>

                              {/* MAX MARKS */}

                              <td>
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  value={component.maxMarks}
                                  onChange={(e) =>
                                    handleComponentChange(
                                      index,
                                      "maxMarks",
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>

                              {/* PASSING */}

                              <td>
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  value={component.passingMarks}
                                  onChange={(e) =>
                                    handleComponentChange(
                                      index,
                                      "passingMarks",
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>

                              {/* WEIGHTAGE */}

                              <td>
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  value={component.weightage}
                                  onChange={(e) =>
                                    handleComponentChange(
                                      index,
                                      "weightage",
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>

                              {/* ACTION */}

                              <td>
                                <div className="d-flex gap-2">
                                  <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => handleEditComponent(index)}
                                  >
                                    <FaEdit />
                                  </button>

                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDeleteComponent(index)}
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>

                      {components.length > 0 && (
                        <tfoot>
                          <tr>
                            <th colSpan="4" className="text-end">
                              Total
                            </th>

                            <th>{totalMaxMarks}</th>

                            <th>{totalPassingMarks}</th>

                            <th>
                              <span
                                className={
                                  totalWeightage === 100
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {totalWeightage}%
                              </span>
                            </th>

                            <th></th>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div>

                  {/* SAVE */}

                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setSelectedSubjectId(null);
                        setComponents([]);
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-success px-4"
                      onClick={handleSaveStructure}
                      disabled={loading}
                    >
                      <FaSave /> {loading ? "Saving..." : "Save Structure"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAssessmentStructure;
