import React, { useEffect, useMemo, useState } from "react";
import {
  LuSearch,
  LuUpload,
  LuEye,
  LuDownload,
  LuTrash2,
  LuFileText,
  LuFiles,
  LuUsers,
  LuCircleCheck,
  LuClock3,
  LuChevronLeft,
  LuChevronRight,
  LuX,
  LuUser,
  LuFolderOpen,
  LuPlus,
} from "react-icons/lu";
import { MdOutlineSchool, MdOutlineDescription } from "react-icons/md";
import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

const ITEMS_PER_PAGE = 5;

const DOCUMENT_TYPES = [
  "Birth Certificate",
  "Aadhaar Card",
  "Transfer Certificate",
  "Previous Marksheet",
  "Address Proof",
  "Passport",
  "Student Photo",
  "Father ID Proof",
  "Mother ID Proof",
  "Other",
];

const StudentDocuments = () => {
  const {
    standards = [],
    sections = [],
    sessions = [],
  } = useMasters();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [documentLoading, setDocumentLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  /* =====================================================
     FETCH STUDENTS
  ===================================================== */

  useEffect(() => {
    if (!user?.schoolId || !token) return;

    fetchStudents();
  }, [user?.schoolId, token]);

  const fetchStudents = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `/api/students/school?schoolId=${user.schoolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(response.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);

      /*
       * Fallback:
       * If your project currently gets students from admissions,
       * this endpoint can be changed to:
       *
       * /api/admissions/school?schoolId=${user.schoolId}
       */

      try {
        const response = await axios.get(
          `/api/admissions/school?schoolId=${user.schoolId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudents(response.data || []);
      } catch (err) {
        console.error("Fallback student API error:", err);
        setStudents([]);
      }
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     FETCH DOCUMENTS
  ===================================================== */

  useEffect(() => {
    if (!user?.schoolId || !token) return;

    fetchDocuments();
  }, [user?.schoolId, token]);

  const fetchDocuments = async () => {
    setDocumentLoading(true);

    try {
      const response = await axios.get(
        `/api/documents/school?schoolId=${user.schoolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDocuments(response.data || []);
    } catch (error) {
      console.error("Error fetching documents:", error);

      /*
       * If your backend endpoint is different,
       * change only this API.
       */
      setDocuments([]);
    } finally {
      setDocumentLoading(false);
    }
  };

  /* =====================================================
     NORMALIZE STUDENT DOCUMENT DATA
  ===================================================== */

  const getStudentDocuments = (student) => {
    if (!student) return [];

    return documents.filter((doc) => {
      const studentId =
        doc.studentId ??
        doc.student?.id ??
        doc.student?.studentId;

      return String(studentId) === String(student.id);
    });
  };

  const hasDocuments = (student) => {
    return getStudentDocuments(student).length > 0;
  };

  /* =====================================================
     FILTER STUDENTS
  ===================================================== */

  const filteredStudents = useMemo(() => {
    let data = [...students];

    if (search.trim()) {
      const searchValue = search.toLowerCase();

      data = data.filter((student) => {
        const fullName =
          `${student.firstName || ""} ${
            student.middleName || ""
          } ${student.lastName || ""}`
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();

        return (
          student.admissionNumber
            ?.toLowerCase()
            .includes(searchValue) ||
          fullName.includes(searchValue)
        );
      });
    }

    if (selectedClass) {
      data = data.filter(
        (student) =>
          student.studentClass === selectedClass
      );
    }

    if (selectedSection) {
      data = data.filter(
        (student) =>
          student.section === selectedSection
      );
    }

    if (selectedSession) {
      data = data.filter(
        (student) =>
          student.academicYear === selectedSession ||
          student.session === selectedSession
      );
    }

    if (statusFilter === "UPLOADED") {
      data = data.filter((student) =>
        hasDocuments(student)
      );
    }

    if (statusFilter === "PENDING") {
      data = data.filter(
        (student) => !hasDocuments(student)
      );
    }

    data.sort((a, b) =>
      `${a.firstName || ""} ${a.lastName || ""}`.localeCompare(
        `${b.firstName || ""} ${b.lastName || ""}`
      )
    );

    return data;
  }, [
    students,
    documents,
    search,
    selectedClass,
    selectedSection,
    selectedSession,
    statusFilter,
  ]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length / ITEMS_PER_PAGE
    )
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* =====================================================
     SUMMARY
  ===================================================== */

  const totalStudents = students.length;

  const studentsWithDocuments = students.filter(
    (student) => hasDocuments(student)
  ).length;

  const studentsPending = Math.max(
    0,
    totalStudents - studentsWithDocuments
  );

  const totalDocuments = documents.length;

  /* =====================================================
     OPEN DOCUMENTS
  ===================================================== */

  const handleViewDocuments = (student) => {
    setSelectedStudent(student);
    setShowDocumentsModal(true);
  };

  /* =====================================================
     OPEN UPLOAD
  ===================================================== */

  const handleOpenUpload = (student) => {
    setSelectedStudent(student);
    setSelectedDocumentType("");
    setSelectedFile(null);
    setShowUploadModal(true);
  };

  /* =====================================================
     FILE CHANGE
  ===================================================== */

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("File size should not exceed 5 MB.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  /* =====================================================
     UPLOAD DOCUMENT
  ===================================================== */

  const handleUploadDocument = async () => {
    if (!selectedStudent) {
      alert("Please select a student.");
      return;
    }

    if (!selectedDocumentType) {
      alert("Please select document type.");
      return;
    }

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();

    formData.append(
      "file",
      selectedFile
    );

    formData.append(
      "studentId",
      selectedStudent.id
    );

    formData.append(
      "schoolId",
      user.schoolId
    );

    formData.append(
      "documentType",
      selectedDocumentType
    );

    setUploadLoading(true);

    try {
      await axios.post(
        "/api/documents/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Student document uploaded successfully."
      );

      setShowUploadModal(false);
      setSelectedFile(null);
      setSelectedDocumentType("");

      await fetchDocuments();
    } catch (error) {
      console.error(
        "Document upload error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Unable to upload document."
      );
    } finally {
      setUploadLoading(false);
    }
  };

  /* =====================================================
     DOWNLOAD DOCUMENT
  ===================================================== */

  const handleDownload = async (document) => {
    try {
      const response = await axios.get(
        `/api/documents/download/${document.id}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const blob = new Blob([
        response.data,
      ]);

      const url =
        window.URL.createObjectURL(blob);

      const link =
        window.document.createElement("a");

      link.href = url;

      link.download =
        document.fileName ||
        document.originalFileName ||
        "student-document";

      window.document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Download error:",
        error
      );

      alert("Unable to download document.");
    }
  };

  /* =====================================================
     VIEW DOCUMENT
  ===================================================== */

  const handleViewDocument = (document) => {
    if (
      document.fileUrl ||
      document.url
    ) {
      window.open(
        document.fileUrl ||
          document.url,
        "_blank"
      );

      return;
    }

    alert(
      "Document preview URL is not available."
    );
  };

  /* =====================================================
     DELETE DOCUMENT
  ===================================================== */

  const handleDeleteDocument = async (
    document
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `/api/documents/${document.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Document deleted successfully.");

      await fetchDocuments();
    } catch (error) {
      console.error(
        "Delete document error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Unable to delete document."
      );
    }
  };

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setSelectedClass("");
    setSelectedSection("");
    setSelectedSession("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  /* =====================================================
     HELPERS
  ===================================================== */

  const getStudentName = (student) => {
    return (
      `${student?.firstName || ""} ${
        student?.middleName || ""
      } ${student?.lastName || ""}`
        .replace(/\s+/g, " ")
        .trim() || "-"
    );
  };

  const getDocumentCount = (student) => {
    return getStudentDocuments(student).length;
  };

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mx-2 mt-2 mb-3">
        <div
          className="rounded-4 shadow overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f9ff 55%,#eaf3ff 100%)",
            border: "1px solid #dbeafe",
          }}
        >
          <div className="p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

              <div className="d-flex align-items-center gap-3">

                <div
                  className="d-flex align-items-center justify-content-center rounded-4"
                  style={{
                    width: "54px",
                    height: "54px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 22px rgba(37,99,235,.22)",
                  }}
                >
                  <MdOutlineDescription
                    size={28}
                  />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Student Documents
                  </h5>

                  <div className="text-muted small">
                    Student Management&nbsp; / &nbsp;
                    Documents
                  </div>
                </div>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border:
                    "1px solid #bfdbfe",
                  fontSize: "12px",
                }}
              >
                <MdOutlineSchool
                  className="me-1"
                />
                Student Documents
              </span>
            </div>
          </div>

          <div
            className="px-4 py-2"
            style={{
              backgroundColor:
                "rgba(239,246,255,.75)",
              borderTop:
                "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home&nbsp; › &nbsp;Student Management
              &nbsp; › &nbsp;
              <span className="text-primary fw-semibold">
                Student Documents
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="mx-2 mb-4">
        <div
          className="bg-white rounded-4 shadow p-3 p-md-4"
          style={{
            border:
              "1px solid #edf2f7",
          }}
        >

          {/* TITLE */}

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

            <div>
              <h5
                className="mb-1 fw-bold"
                style={{
                  color: "#1e3a8a",
                }}
              >
                Student Document Management
              </h5>

              <small className="text-muted">
                Manage and maintain student
                documents securely
              </small>
            </div>

            <button
              type="button"
              className="btn d-flex align-items-center gap-2 text-white"
              onClick={() => {
                if (!selectedStudent) {
                  alert(
                    "Please select a student from the table."
                  );
                  return;
                }

                handleOpenUpload(
                  selectedStudent
                );
              }}
              style={{
                background:
                  "linear-gradient(135deg,#2563eb,#3b82f6)",
                border: "none",
                borderRadius: "10px",
                padding: "9px 16px",
                boxShadow:
                  "0 5px 14px rgba(37,99,235,.18)",
              }}
            >
              <LuPlus size={17} />
              Upload Document
            </button>
          </div>

          {/* =====================================================
              SUMMARY CARDS
          ===================================================== */}

          <div className="row g-3 mb-4">

            {/* TOTAL */}

            <div className="col-xl-3 col-md-6">
              <div
                className="h-100 rounded-4 p-3 position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6,#60a5fa)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(37,99,235,.18)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background:
                      "rgba(255,255,255,.08)",
                    right: "-25px",
                    top: "-35px",
                  }}
                />

                <div className="d-flex justify-content-between align-items-center position-relative">
                  <div>
                    <small style={{ opacity: .85 }}>
                      Total Students
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {totalStudents}
                    </h3>

                    <small style={{ opacity: .75 }}>
                      Registered students
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "rgba(255,255,255,.16)",
                    }}
                  >
                    <LuUsers size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* WITH DOCUMENT */}

            <div className="col-xl-3 col-md-6">
              <div
                className="h-100 rounded-4 p-3 position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#059669,#10b981,#34d399)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(5,150,105,.18)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center position-relative">
                  <div>
                    <small style={{ opacity: .85 }}>
                      Documents Available
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {studentsWithDocuments}
                    </h3>

                    <small style={{ opacity: .75 }}>
                      Students with documents
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "rgba(255,255,255,.16)",
                    }}
                  >
                    <LuCircleCheck size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* PENDING */}

            <div className="col-xl-3 col-md-6">
              <div
                className="h-100 rounded-4 p-3 position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#d97706,#f59e0b,#fbbf24)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(245,158,11,.18)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center position-relative">
                  <div>
                    <small style={{ opacity: .9 }}>
                      Pending
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {studentsPending}
                    </h3>

                    <small style={{ opacity: .8 }}>
                      No documents uploaded
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "rgba(255,255,255,.17)",
                    }}
                  >
                    <LuClock3 size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* DOCUMENTS */}

            <div className="col-xl-3 col-md-6">
              <div
                className="h-100 rounded-4 p-3 position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#7c3aed,#8b5cf6,#a78bfa)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(124,58,237,.18)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center position-relative">
                  <div>
                    <small style={{ opacity: .85 }}>
                      Total Documents
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {totalDocuments}
                    </h3>

                    <small style={{ opacity: .75 }}>
                      Uploaded files
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "rgba(255,255,255,.16)",
                    }}
                  >
                    <LuFiles size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              FILTER
          ===================================================== */}

          <div
            className="rounded-4 p-3 p-md-4 mb-4"
            style={{
              background:
                "linear-gradient(135deg,#f8fbff,#f3f7fc)",
              border:
                "1px solid #e2e8f0",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">

              <div className="d-flex align-items-center gap-2">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "#eff6ff",
                    color: "#2563eb",
                  }}
                >
                  <LuSearch size={18} />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">
                    Search & Filter
                  </h6>

                  <small className="text-muted">
                    Find students and their documents
                  </small>
                </div>
              </div>

              {(search ||
                selectedClass ||
                selectedSection ||
                selectedSession ||
                statusFilter) && (
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={clearFilters}
                  style={{
                    border:
                      "1px solid #dbe3ef",
                    borderRadius: "8px",
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="row g-3">

              {/* SEARCH */}

              <div className="col-xl-4 col-lg-6">
                <label className="form-label fw-semibold">
                  Search Student
                </label>

                <div className="position-relative">
                  <LuSearch
                    size={17}
                    style={{
                      position:
                        "absolute",
                      left: "13px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      color: "#94a3b8",
                    }}
                  />

                  <input
                    type="search"
                    className="form-control"
                    placeholder="Admission no. or student name..."
                    value={search}
                    onChange={(e) => {
                      setSearch(
                        e.target.value
                      );
                      setCurrentPage(1);
                    }}
                    style={{
                      paddingLeft: "38px",
                      borderRadius: "9px",
                      border:
                        "1px solid #dbe3ef",
                    }}
                  />
                </div>
              </div>

              {/* CLASS */}

              <div className="col-xl-2 col-lg-6">
                <label className="form-label fw-semibold">
                  Class
                </label>

                <select
                  className="form-select"
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(
                      e.target.value
                    );
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                >
                  <option value="">
                    All Classes
                  </option>

                  {standards.length > 0
                    ? standards.map(
                        (standard) => (
                          <option
                            key={
                              standard.id ||
                              standard.value ||
                              standard.name
                            }
                            value={
                              standard.name ||
                              standard.value
                            }
                          >
                            {standard.label ||
                              standard.name ||
                              standard.value}
                          </option>
                        )
                      )
                    : null}
                </select>
              </div>

              {/* SECTION */}

              <div className="col-xl-2 col-lg-6">
                <label className="form-label fw-semibold">
                  Section
                </label>

                <select
                  className="form-select"
                  value={selectedSection}
                  onChange={(e) => {
                    setSelectedSection(
                      e.target.value
                    );
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                >
                  <option value="">
                    All Sections
                  </option>

                  {sections.length > 0
                    ? sections.map(
                        (section) => (
                          <option
                            key={
                              section.id ||
                              section.value ||
                              section.name
                            }
                            value={
                              section.name ||
                              section.value
                            }
                          >
                            {section.label ||
                              section.name ||
                              section.value}
                          </option>
                        )
                      )
                    : null}
                </select>
              </div>

              {/* SESSION */}

              <div className="col-xl-2 col-lg-6">
                <label className="form-label fw-semibold">
                  Session
                </label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) => {
                    setSelectedSession(
                      e.target.value
                    );
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                >
                  <option value="">
                    All Sessions
                  </option>

                  {sessions.length > 0
                    ? sessions.map(
                        (session) => (
                          <option
                            key={
                              session.id ||
                              session.value ||
                              session.name
                            }
                            value={
                              session.name ||
                              session.value
                            }
                          >
                            {session.label ||
                              session.name ||
                              session.value}
                          </option>
                        )
                      )
                    : null}
                </select>
              </div>

              {/* STATUS */}

              <div className="col-xl-2 col-lg-6">
                <label className="form-label fw-semibold">
                  Document Status
                </label>

                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(
                      e.target.value
                    );
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                >
                  <option value="">
                    All Status
                  </option>

                  <option value="UPLOADED">
                    Documents Available
                  </option>

                  <option value="PENDING">
                    Pending
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* =====================================================
              TABLE HEADER
          ===================================================== */}

          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">

            <div>
              <h6
                className="fw-bold mb-1"
                style={{
                  color: "#1e293b",
                }}
              >
                Student Documents
              </h6>

              <small className="text-muted">
                Showing{" "}
                <strong>
                  {filteredStudents.length}
                </strong>{" "}
                student
                {filteredStudents.length !== 1
                  ? "s"
                  : ""}
              </small>
            </div>

            <span
              className="badge rounded-pill px-3 py-2"
              style={{
                backgroundColor: "#eff6ff",
                color: "#2563eb",
                border:
                  "1px solid #bfdbfe",
              }}
            >
              {filteredStudents.length} Records
            </span>
          </div>

          {/* =====================================================
              PREMIUM TABLE
          ===================================================== */}

          <div
            className="table-responsive rounded-4"
            style={{
              border:
                "1px solid #dfe7f1",
              boxShadow:
                "0 5px 18px rgba(15,23,42,.05)",
              overflow: "hidden",
            }}
          >
            <table
              className="table table-hover align-middle mb-0"
              style={{
                minWidth: "1000px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(135deg,#eef4ff,#f8fafc)",
                    borderBottom:
                      "1px solid #dbe5f0",
                  }}
                >
                  <th
                    className="px-3 py-3"
                    style={{
                      width: "55px",
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        ".04em",
                    }}
                  >
                    #
                  </th>

                  <th
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform:
                        "uppercase",
                    }}
                  >
                    Student
                  </th>

                  <th
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform:
                        "uppercase",
                    }}
                  >
                    Admission No
                  </th>

                  <th
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform:
                        "uppercase",
                    }}
                  >
                    Class
                  </th>

                  <th
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform:
                        "uppercase",
                    }}
                  >
                    Section
                  </th>

                  <th
                    className="text-center"
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform:
                        "uppercase",
                    }}
                  >
                    Documents
                  </th>

                  <th
                    className="text-center"
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform:
                        "uppercase",
                    }}
                  >
                    Status
                  </th>

                  <th
                    className="text-center"
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform:
                        "uppercase",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >
                      <div
                        className="spinner-border"
                        style={{
                          color: "#2563eb",
                          width: "28px",
                          height: "28px",
                        }}
                      />

                      <div className="text-muted mt-2">
                        Loading students...
                      </div>
                    </td>
                  </tr>
                ) : paginatedStudents.length >
                  0 ? (
                  paginatedStudents.map(
                    (student, index) => {
                      const docCount =
                        getDocumentCount(
                          student
                        );

                      const uploaded =
                        docCount > 0;

                      return (
                        <tr
                          key={
                            student.id ||
                            student.admissionNumber
                          }
                          style={{
                            borderBottom:
                              "1px solid #eef2f7",
                          }}
                        >
                          <td className="px-3">
                            <span
                              className="d-inline-flex align-items-center justify-content-center rounded-circle"
                              style={{
                                width: "30px",
                                height: "30px",
                                background:
                                  "#f1f5f9",
                                color:
                                  "#64748b",
                                fontSize:
                                  "12px",
                                fontWeight: 700,
                              }}
                            >
                              {(currentPage -
                                1) *
                                ITEMS_PER_PAGE +
                                index +
                                1}
                            </span>
                          </td>

                          {/* STUDENT */}

                          <td>
                            <div className="d-flex align-items-center gap-2">

                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle"
                                style={{
                                  width:
                                    "38px",
                                  height:
                                    "38px",
                                  background:
                                    "linear-gradient(135deg,#eff6ff,#dbeafe)",
                                  color:
                                    "#2563eb",
                                  flexShrink: 0,
                                }}
                              >
                                <LuUser
                                  size={17}
                                />
                              </div>

                              <div>
                                <div
                                  className="fw-bold"
                                  style={{
                                    color:
                                      "#1e293b",
                                  }}
                                >
                                  {getStudentName(
                                    student
                                  )}
                                </div>

                                <small className="text-muted">
                                  {student.email ||
                                    student.preferredNo ||
                                    "-"}
                                </small>
                              </div>
                            </div>
                          </td>

                          {/* ADMISSION */}

                          <td>
                            <span
                              className="fw-bold"
                              style={{
                                color:
                                  "#2563eb",
                              }}
                            >
                              {student.admissionNumber ||
                                "-"}
                            </span>
                          </td>

                          {/* CLASS */}

                          <td>
                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                background:
                                  "#f8fafc",
                                color:
                                  "#475569",
                                border:
                                  "1px solid #e2e8f0",
                              }}
                            >
                              {student.studentClass ||
                                "-"}
                            </span>
                          </td>

                          {/* SECTION */}

                          <td>
                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                background:
                                  "#f5f3ff",
                                color:
                                  "#6d28d9",
                                border:
                                  "1px solid #ddd6fe",
                              }}
                            >
                              {student.section ||
                                "-"}
                            </span>
                          </td>

                          {/* DOCUMENT COUNT */}

                          <td className="text-center">
                            <span
                              className="d-inline-flex align-items-center gap-1 px-3 py-2 rounded-pill"
                              style={{
                                background:
                                  uploaded
                                    ? "#ecfdf5"
                                    : "#fff7ed",
                                color:
                                  uploaded
                                    ? "#047857"
                                    : "#c2410c",
                                border:
                                  uploaded
                                    ? "1px solid #a7f3d0"
                                    : "1px solid #fed7aa",
                                fontWeight: 600,
                                fontSize:
                                  "12px",
                              }}
                            >
                              <LuFiles
                                size={14}
                              />
                              {docCount} Files
                            </span>
                          </td>

                          {/* STATUS */}

                          <td className="text-center">
                            {uploaded ? (
                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  background:
                                    "#ecfdf5",
                                  color:
                                    "#047857",
                                  border:
                                    "1px solid #a7f3d0",
                                }}
                              >
                                DOCUMENTED
                              </span>
                            ) : (
                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  background:
                                    "#fff7ed",
                                  color:
                                    "#c2410c",
                                  border:
                                    "1px solid #fed7aa",
                                }}
                              >
                                PENDING
                              </span>
                            )}
                          </td>

                          {/* ACTION */}

                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-1">

                              <button
                                type="button"
                                title="View Documents"
                                className="btn btn-sm d-flex align-items-center justify-content-center"
                                onClick={() =>
                                  handleViewDocuments(
                                    student
                                  )
                                }
                                style={{
                                  width:
                                    "34px",
                                  height:
                                    "34px",
                                  borderRadius:
                                    "8px",
                                  background:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                  border:
                                    "1px solid #dbeafe",
                                }}
                              >
                                <LuEye
                                  size={16}
                                />
                              </button>

                              <button
                                type="button"
                                title="Upload Document"
                                className="btn btn-sm d-flex align-items-center justify-content-center"
                                onClick={() =>
                                  handleOpenUpload(
                                    student
                                  )
                                }
                                style={{
                                  width:
                                    "34px",
                                  height:
                                    "34px",
                                  borderRadius:
                                    "8px",
                                  background:
                                    "#f0fdf4",
                                  color:
                                    "#15803d",
                                  border:
                                    "1px solid #bbf7d0",
                                }}
                              >
                                <LuUpload
                                  size={16}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >
                      <div
                        className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                        style={{
                          width: "60px",
                          height: "60px",
                          background:
                            "#f1f5f9",
                          color:
                            "#94a3b8",
                        }}
                      >
                        <LuFolderOpen
                          size={28}
                        />
                      </div>

                      <h6 className="text-muted mb-1">
                        No student records found
                      </h6>

                      <small className="text-secondary">
                        Try changing your
                        search or filters.
                      </small>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* =====================================================
              PAGINATION
          ===================================================== */}

          <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-2">

            <small className="text-muted">
              Page{" "}
              <strong>
                {currentPage}
              </strong>{" "}
              of{" "}
              <strong>
                {totalPages}
              </strong>
            </small>

            <div className="d-flex align-items-center gap-2">

              <button
                type="button"
                className="btn btn-sm d-flex align-items-center gap-1"
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    (p) => p - 1
                  )
                }
                style={{
                  border:
                    "1px solid #dbe3ef",
                  color:
                    currentPage === 1
                      ? "#94a3b8"
                      : "#2563eb",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              >
                <LuChevronLeft
                  size={16}
                />
                Previous
              </button>

              <div className="d-flex gap-1">
                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className="btn btn-sm"
                    onClick={() =>
                      setCurrentPage(
                        page
                      )
                    }
                    style={
                      currentPage === page
                        ? {
                            background:
                              "linear-gradient(135deg,#2563eb,#3b82f6)",
                            color: "#fff",
                            border:
                              "none",
                            borderRadius:
                              "8px",
                            minWidth:
                              "34px",
                          }
                        : {
                            background:
                              "#fff",
                            color:
                              "#475569",
                            border:
                              "1px solid #dbe3ef",
                            borderRadius:
                              "8px",
                            minWidth:
                              "34px",
                          }
                    }
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="btn btn-sm d-flex align-items-center gap-1"
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (p) => p + 1
                  )
                }
                style={{
                  border:
                    "1px solid #dbe3ef",
                  color:
                    currentPage ===
                    totalPages
                      ? "#94a3b8"
                      : "#2563eb",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              >
                Next
                <LuChevronRight
                  size={16}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          DOCUMENT LIST MODAL
      ===================================================== */}

      {showDocumentsModal &&
        selectedStudent && (
          <div
            className="modal d-block"
            tabIndex="-1"
            style={{
              background:
                "rgba(15,23,42,.55)",
              backdropFilter:
                "blur(4px)",
            }}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
            >
              <div
                className="modal-content border-0 rounded-4 overflow-hidden"
                style={{
                  boxShadow:
                    "0 25px 70px rgba(15,23,42,.25)",
                }}
              >

                {/* MODAL HEADER */}

                <div
                  className="modal-header border-0"
                  style={{
                    background:
                      "linear-gradient(135deg,#eff6ff,#f8fafc)",
                  }}
                >
                  <div>
                    <h5 className="modal-title fw-bold">
                      Student Documents
                    </h5>

                    <small className="text-muted">
                      {getStudentName(
                        selectedStudent
                      )}
                      {" • "}
                      {selectedStudent.admissionNumber ||
                        "-"}
                    </small>
                  </div>

                  <button
                    type="button"
                    className="btn btn-light rounded-circle"
                    onClick={() =>
                      setShowDocumentsModal(
                        false
                      )
                    }
                  >
                    <LuX size={18} />
                  </button>
                </div>

                {/* STUDENT INFO */}

                <div className="px-4 pt-3">
                  <div
                    className="rounded-4 p-3"
                    style={{
                      background:
                        "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  >
                    <div className="row g-3">

                      <div className="col-md-4">
                        <small className="text-muted d-block">
                          Student
                        </small>

                        <strong>
                          {getStudentName(
                            selectedStudent
                          )}
                        </strong>
                      </div>

                      <div className="col-md-4">
                        <small className="text-muted d-block">
                          Admission No
                        </small>

                        <strong
                          style={{
                            color:
                              "#2563eb",
                          }}
                        >
                          {selectedStudent.admissionNumber ||
                            "-"}
                        </strong>
                      </div>

                      <div className="col-md-4">
                        <small className="text-muted d-block">
                          Class / Section
                        </small>

                        <strong>
                          {selectedStudent.studentClass ||
                            "-"}
                          {" / "}
                          {selectedStudent.section ||
                            "-"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DOCUMENT LIST */}

                <div className="modal-body">

                  {getStudentDocuments(
                    selectedStudent
                  ).length > 0 ? (
                    <div className="d-flex flex-column gap-2">

                      {getStudentDocuments(
                        selectedStudent
                      ).map((doc) => (
                        <div
                          key={doc.id}
                          className="d-flex flex-wrap justify-content-between align-items-center gap-3 p-3 rounded-4"
                          style={{
                            border:
                              "1px solid #e2e8f0",
                            background:
                              "#fff",
                          }}
                        >
                          <div className="d-flex align-items-center gap-3">

                            <div
                              className="d-flex align-items-center justify-content-center rounded-3"
                              style={{
                                width:
                                  "44px",
                                height:
                                  "44px",
                                background:
                                  "#eff6ff",
                                color:
                                  "#2563eb",
                              }}
                            >
                              <LuFileText
                                size={21}
                              />
                            </div>

                            <div>
                              <div className="fw-bold">
                                {doc.documentType ||
                                  doc.type ||
                                  "Document"}
                              </div>

                              <small className="text-muted">
                                {doc.fileName ||
                                  doc.originalFileName ||
                                  "Uploaded document"}
                              </small>
                            </div>
                          </div>

                          <div className="d-flex gap-2">

                            <button
                              type="button"
                              className="btn btn-sm d-flex align-items-center gap-1"
                              onClick={() =>
                                handleViewDocument(
                                  doc
                                )
                              }
                              style={{
                                border:
                                  "1px solid #dbeafe",
                                background:
                                  "#eff6ff",
                                color:
                                  "#2563eb",
                                borderRadius:
                                  "8px",
                              }}
                            >
                              <LuEye
                                size={15}
                              />
                              View
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm d-flex align-items-center gap-1"
                              onClick={() =>
                                handleDownload(
                                  doc
                                )
                              }
                              style={{
                                border:
                                  "1px solid #bbf7d0",
                                background:
                                  "#f0fdf4",
                                color:
                                  "#15803d",
                                borderRadius:
                                  "8px",
                              }}
                            >
                              <LuDownload
                                size={15}
                              />
                              Download
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm d-flex align-items-center justify-content-center"
                              onClick={() =>
                                handleDeleteDocument(
                                  doc
                                )
                              }
                              style={{
                                width:
                                  "34px",
                                border:
                                  "1px solid #fecaca",
                                background:
                                  "#fef2f2",
                                color:
                                  "#dc2626",
                                borderRadius:
                                  "8px",
                              }}
                            >
                              <LuTrash2
                                size={15}
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5">

                      <div
                        className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                        style={{
                          width: "65px",
                          height: "65px",
                          background:
                            "#f1f5f9",
                          color:
                            "#94a3b8",
                        }}
                      >
                        <LuFiles
                          size={28}
                        />
                      </div>

                      <h6 className="fw-bold text-muted">
                        No Documents Uploaded
                      </h6>

                      <p className="text-muted small mb-3">
                        Upload documents for this
                        student to see them here.
                      </p>

                      <button
                        type="button"
                        className="btn text-white"
                        onClick={() => {
                          setShowDocumentsModal(
                            false
                          );

                          handleOpenUpload(
                            selectedStudent
                          );
                        }}
                        style={{
                          background:
                            "linear-gradient(135deg,#2563eb,#3b82f6)",
                          border: "none",
                          borderRadius:
                            "9px",
                        }}
                      >
                        <LuUpload
                          size={16}
                          className="me-1"
                        />
                        Upload Document
                      </button>
                    </div>
                  )}
                </div>

                {/* FOOTER */}

                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() =>
                      setShowDocumentsModal(
                        false
                      )
                    }
                    style={{
                      borderRadius:
                        "9px",
                    }}
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    className="btn text-white"
                    onClick={() => {
                      setShowDocumentsModal(
                        false
                      );

                      handleOpenUpload(
                        selectedStudent
                      );
                    }}
                    style={{
                      background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",
                      border: "none",
                      borderRadius:
                        "9px",
                    }}
                  >
                    <LuUpload
                      size={15}
                      className="me-1"
                    />
                    Upload More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* =====================================================
          UPLOAD MODAL
      ===================================================== */}

      {showUploadModal &&
        selectedStudent && (
          <div
            className="modal d-block"
            tabIndex="-1"
            style={{
              background:
                "rgba(15,23,42,.55)",
              backdropFilter:
                "blur(4px)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div
                className="modal-content border-0 rounded-4 overflow-hidden"
                style={{
                  boxShadow:
                    "0 25px 70px rgba(15,23,42,.25)",
                }}
              >

                <div
                  className="modal-header border-0"
                  style={{
                    background:
                      "linear-gradient(135deg,#eff6ff,#f8fafc)",
                  }}
                >
                  <div>
                    <h5 className="modal-title fw-bold">
                      Upload Student Document
                    </h5>

                    <small className="text-muted">
                      {getStudentName(
                        selectedStudent
                      )}
                    </small>
                  </div>

                  <button
                    type="button"
                    className="btn btn-light rounded-circle"
                    onClick={() =>
                      setShowUploadModal(
                        false
                      )
                    }
                  >
                    <LuX size={18} />
                  </button>
                </div>

                <div className="modal-body">

                  {/* STUDENT */}

                  <div
                    className="d-flex align-items-center gap-3 p-3 rounded-4 mb-3"
                    style={{
                      background:
                        "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: "44px",
                        height: "44px",
                        background:
                          "#dbeafe",
                        color:
                          "#2563eb",
                      }}
                    >
                      <LuUser size={20} />
                    </div>

                    <div>
                      <div className="fw-bold">
                        {getStudentName(
                          selectedStudent
                        )}
                      </div>

                      <small className="text-muted">
                        {selectedStudent.admissionNumber ||
                          "-"}
                        {" • "}
                        {selectedStudent.studentClass ||
                          "-"}
                        {" / "}
                        {selectedStudent.section ||
                          "-"}
                      </small>
                    </div>
                  </div>

                  {/* DOCUMENT TYPE */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Document Type
                    </label>

                    <select
                      className="form-select"
                      value={
                        selectedDocumentType
                      }
                      onChange={(e) =>
                        setSelectedDocumentType(
                          e.target.value
                        )
                      }
                      style={{
                        borderRadius:
                          "9px",
                        border:
                          "1px solid #dbe3ef",
                      }}
                    >
                      <option value="">
                        Select document type
                      </option>

                      {DOCUMENT_TYPES.map(
                        (type) => (
                          <option
                            key={type}
                            value={type}
                          >
                            {type}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* FILE */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Select File
                    </label>

                    <div
                      className="rounded-4 p-4 text-center"
                      style={{
                        border:
                          "2px dashed #bfdbfe",
                        background:
                          "#f8fbff",
                      }}
                    >
                      <LuUpload
                        size={28}
                        style={{
                          color:
                            "#2563eb",
                        }}
                      />

                      <div className="fw-semibold mt-2">
                        Choose student document
                      </div>

                      <small className="text-muted d-block mb-3">
                        PDF, JPG, JPEG, PNG •
                        Maximum 5 MB
                      </small>

                      <input
                        type="file"
                        className="form-control"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={
                          handleFileChange
                        }
                      />

                      {selectedFile && (
                        <div
                          className="mt-3 small fw-semibold"
                          style={{
                            color:
                              "#047857",
                          }}
                        >
                          Selected:{" "}
                          {
                            selectedFile.name
                          }
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="alert alert-info py-2 px-3 mb-0"
                    style={{
                      borderRadius:
                        "9px",
                      fontSize: "12px",
                    }}
                  >
                    <strong>
                      Note:
                    </strong>{" "}
                    Upload a clear and readable
                    document. Maximum file size is
                    5 MB.
                  </div>
                </div>

                <div className="modal-footer border-0">

                  <button
                    type="button"
                    className="btn btn-light"
                    disabled={uploadLoading}
                    onClick={() =>
                      setShowUploadModal(
                        false
                      )
                    }
                    style={{
                      borderRadius:
                        "9px",
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn text-white d-flex align-items-center gap-2"
                    disabled={
                      uploadLoading
                    }
                    onClick={
                      handleUploadDocument
                    }
                    style={{
                      background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",
                      border: "none",
                      borderRadius:
                        "9px",
                    }}
                  >
                    {uploadLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                        />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <LuUpload
                          size={16}
                        />
                        Upload Document
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default StudentDocuments;