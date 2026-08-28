
import axios from "axios";
import { useState, useEffect } from "react";
import {
  LuSearch,
  LuRotateCcw,
  LuEye,
  LuWalletCards,
} from "react-icons/lu";
import axiosInstance from "../../api/axiosInstance";

const StudentFeeAssignment = () => {
  const token = localStorage.getItem("token");

  const [session, setSession] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");

  const [sessions, setSessions] = useState([]);
  const [standards, setStandards] = useState([]);
  const [sections, setSections] = useState([]);

  const [students, setStudents] = useState([]);
  const [studentFees, setStudentFees] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    loadSessions();
    loadStandards();
    loadSections();
  }, []);

  const loadSessions = async () => {
    try {
      const res = await axiosInstance.get("/api/master/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSessions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadStandards = async () => {
    try {
      const res = await axiosInstance.get("/api/master/standard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStandards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadSections = async () => {
    try {
      const res = await axiosInstance.get("/api/master/section", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSections(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadStudents = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/api/student-fee", {
        params: {
          session,
          studentClass,
          section,
          admissionNumber,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data);
      setStudentFees([]);
      setSelectedStudent(null);
    } catch (err) {
      console.log(err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const loadStudentFees = async (admissionNo) => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/api/student-fee/${admissionNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudentFees(res.data);

      if (res.data.length > 0) {
        setSelectedStudent((prev) => ({
          ...prev,
          admissionNumber: admissionNo,
          studentName:
            prev?.studentName || res.data[0]?.studentName || "",
        }));
      }
    } catch (err) {
      console.log(err);
      setStudentFees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadStudents();
  };

  const handleReset = () => {
    setSession("");
    setStudentClass("");
    setSection("");
    setAdmissionNumber("");
    setStudents([]);
    setStudentFees([]);
    setSelectedStudent(null);
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    loadStudentFees(student.admissionNumber);
  };

  return (
    <div className="container-fluid px-2 px-md-3 pb-4 mt-2">

      <div
        className="bg-white shadow rounded-3 p-3 p-md-4 mb-3"
        style={{
          borderLeft: "5px solid #0d6efd",
        }}
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
          <div>
            <h4 className="mb-1 fw-bold text-dark">
              Student Fee Assignment
            </h4>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a
                    href="/"
                    className="text-decoration-none text-muted"
                  >
                    Home
                  </a>
                </li>

                <li className="breadcrumb-item active text-primary">
                  Student Fee Assignment
                </li>
              </ol>
            </nav>
          </div>

          <div className="mt-3 mt-md-0">
            <span className="badge bg-primary-subtle text-primary px-3 py-2">
              Fee Management
            </span>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow rounded-3 mb-4">
        <div className="card-header bg-white  rounded-top-3 py-3">
          <div className="d-flex align-items-center">
            <LuSearch size={20} className="me-2" />
            <strong>Search Student</strong>
          </div>
        </div>

        <div className="card-body p-3 p-md-4">
          <div className="row g-3 align-items-end">

            <div className="col-xl-3 col-lg-3 col-md-6">
              <label className="form-label fw-semibold">
                Session
              </label>

              <select
                className="form-select"
                value={session}
                onChange={(e) => setSession(e.target.value)}
              >
                <option value="">Select Session</option>

                {sessions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-6">
              <label className="form-label fw-semibold">
                Class
              </label>

              <select
                className="form-select"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
              >
                <option value="">Select Class</option>

                {standards.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-xl-2 col-lg-2 col-md-6">
              <label className="form-label fw-semibold">
                Section
              </label>

              <select
                className="form-select"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="">All Sections</option>

                {sections.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-xl-2 col-lg-2 col-md-6">
              <label className="form-label fw-semibold">
                Admission No.
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="ADM00001"
                value={admissionNumber}
                onChange={(e) =>
                  setAdmissionNumber(e.target.value)
                }
              />
            </div>

            <div className="col-xl-2 col-lg-2 col-md-12">
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary flex-grow-1"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Loading
                    </>
                  ) : (
                    <>
                      <LuSearch className="me-1" />
                      Search
                    </>
                  )}
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={handleReset}
                  title="Reset"
                >
                  <LuRotateCcw />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="card border-0 shadow rounded-3 mb-4">

        <div className="card-header bg-white  rounded-top-3 py-3">
          <div className="d-flex justify-content-between align-items-center">

            <div className="d-flex align-items-center">
              <LuWalletCards size={20} className="me-2" />
              <strong>Assigned Students</strong>
            </div>

            <span className="badge bg-white text-primary px-3 py-2">
              {students.length} Students
            </span>

          </div>
        </div>

        <div className="card-body p-0">

          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle mb-0">

              <thead className="table-light">

                <tr>
                  <th className="text-center">S.No</th>
                  <th>Admission No</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>

              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <div className="spinner-border text-primary" />

                      <div className="mt-2 text-muted">
                        Loading students...
                      </div>
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >
                      <div className="text-danger fw-semibold">
                        No Record Found
                      </div>

                      <small className="text-muted">
                        Search students using the filters above.
                      </small>
                    </td>
                  </tr>
                ) : (
                  students.map((student, index) => (
                    <tr
                      key={
                        student.studentId ||
                        student.admissionNumber ||
                        index
                      }
                    >
                      <td className="text-center">
                        {index + 1}
                      </td>

                      <td>
                        <span className="fw-semibold text-primary">
                          {student.admissionNumber}
                        </span>
                      </td>

                      <td>{student.studentName}</td>

                      <td>{student.studentClass}</td>

                      <td>{student.section}</td>

                      <td>{student.mobileNumber || "N/A"}</td>

                      <td>
                        <span
                          className={`badge ${
                            Number(student.totalDue || 0) === 0
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {Number(student.totalDue || 0) === 0
                            ? "PAID"
                            : "UNPAID"}
                        </span>
                      </td>

                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-sm px-3"
                          onClick={() => handleView(student)}
                        >
                          <LuEye className="me-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>

      {selectedStudent && (
        <div className="card border-0 shadow rounded-3">

          <div className="card-header bg-white  rounded-top-3 py-3">

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">

              <div className="d-flex align-items-center">
                <LuWalletCards size={20} className="me-2" />
                <strong>Student Fee Details</strong>
              </div>

              <div className="mt-2 mt-md-0">

                <span className="badge bg-white text-primary me-2 px-3 py-2">
                  {selectedStudent.admissionNumber}
                </span>

                <span className="badge bg-light text-dark px-3 py-2">
                  {selectedStudent.studentName}
                </span>

              </div>

            </div>

          </div>

          <div className="card-body p-0">

            <div className="table-responsive">

              <table className="table table-bordered table-hover align-middle mb-0">

                <thead className="table-light">

                  <tr>
                    <th className="text-center">S.No</th>
                    <th>Fee Code</th>
                    <th>Fee Name</th>
                    <th>Category</th>
                    <th>Batch</th>
                    <th>Amount</th>
                    <th>Paid</th>
                    <th>Due</th>
                    <th>Status</th>
                    <th>Assigned Date</th>
                  </tr>

                </thead>

                <tbody>

                  {studentFees.length === 0 ? (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center py-5"
                      >
                        <div className="text-danger fw-semibold">
                          No Fee Assigned
                        </div>

                        <small className="text-muted">
                          No fee details found for this student.
                        </small>
                      </td>
                    </tr>
                  ) : (
                    studentFees.map((fee, index) => (
                      <tr key={fee.id || index}>

                        <td className="text-center">
                          {index + 1}
                        </td>

                        <td>
                          <span className="fw-semibold text-primary">
                            {fee.feeCode}
                          </span>
                        </td>

                        <td>{fee.feeName}</td>

                        <td>{fee.feeCategory}</td>

                        <td>{fee.feeBatch}</td>

                        <td>
                          ₹ {Number(fee.amount || 0).toFixed(2)}
                        </td>

                        <td className="text-success fw-semibold">
                          ₹ {Number(fee.paidAmount || 0).toFixed(2)}
                        </td>

                        <td className="text-danger fw-semibold">
                          ₹ {Number(fee.dueAmount || 0).toFixed(2)}
                        </td>

                        <td>
                          <span
                            className={`badge ${
                              fee.status === "PAID"
                                ? "bg-success"
                                : fee.status === "PARTIAL"
                                ? "bg-warning text-dark"
                                : "bg-danger"
                            }`}
                          >
                            {fee.status}
                          </span>
                        </td>

                        <td>
                          {fee.assignDate || "-"}
                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default StudentFeeAssignment;

