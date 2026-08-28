
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const FeeLedger = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    loadSessions();
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

  const handleSearch = async () => {
    if (!selectedSession) {
      alert("Select Session");
      return;
    }

    if (!admissionNo.trim()) {
      alert("Enter Admission Number");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      setStudents([]);

      const res = await axiosInstance.get("/api/students/search", {
        params: {
          session: selectedSession,
          admissionNumber: admissionNo.trim(),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data);
    } catch (err) {
      console.log(err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedSession("");
    setAdmissionNo("");
    setStudents([]);
    setSearched(false);
  };

  return (
    <>
      <div
        className="bg-white shadow rounded p-3 mb-3 mt-3"
        style={{
          borderLeft: "5px solid #0d6efd",
        }}
      >
        <h4 className="mb-1">
          <strong>Fee Ledger</strong>
        </h4>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item">Fee</li>
            <li className="breadcrumb-item active">Fee Ledger</li>
          </ol>
        </nav>
      </div>

      <div className="card shadow">
        <div className="card-header bg-white p-3 ">
          <strong>Search Student</strong>
        </div>

        <div className="card-body">
          <div className="row align-items-end">
            <div className="col-md-5 mb-3 mb-md-0">
              <label className="form-label fw-bold">
                Select Session <span className="text-danger">*</span>
              </label>

              <select
                className="form-select"
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
              >
                <option value="">Select Session</option>

                {sessions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-5 mb-3 mb-md-0">
              <label className="form-label fw-bold">
                Admission Number <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Admission Number"
                value={admissionNo}
                onChange={(e) => setAdmissionNo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-primary w-100"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="card shadow mt-3">
          <div
            className="card-body text-center"
            style={{ padding: "60px" }}
          >
            <div
              className="spinner-border text-primary"
              style={{
                width: "4rem",
                height: "4rem",
              }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>

            <h5 className="mt-3">Searching Student...</h5>

            <p className="text-muted mb-0">
              Please wait while fetching student details.
            </p>
          </div>
        </div>
      )}

      {!loading && searched && students.length > 0 && (
        <div className="card shadow mt-3">
          <div className="card-header bg-white ">
            <strong>Student List</strong>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle mb-0">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
                    <th>Admission No</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Mobile</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id || student.admissionNumber}>
                      <td>{index + 1}</td>

                      <td className="fw-semibold">
                        {student.admissionNumber || "-"}
                      </td>

                      <td>
                        {student.firstName || ""}{" "}
                        {student.lastName || ""}
                      </td>

                      <td>{student.studentClass || "-"}</td>

                      <td>{student.section || "-"}</td>

                      <td>{student.mobile || "-"}</td>

                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            navigate(
                              `/fee/feeledger/${student.admissionNumber}`,
                            )
                          }
                        >
                          View Ledger
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {!loading && searched && students.length === 0 && (
        <div className="card shadow mt-3">
          <div className="card-header bg-white ">
            <strong>Student List</strong>
          </div>

          <div className="card-body text-center p-5">
            <i
              className="bi bi-person-x-fill text-danger"
              style={{ fontSize: "60px" }}
            ></i>

            <h4 className="text-danger mt-3">Student Not Found</h4>

            <p className="text-muted">
              No student found for the selected session and admission number.
            </p>

            <button
              className="btn btn-secondary btn-sm"
              onClick={handleReset}
            >
              Search Again
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeeLedger;

