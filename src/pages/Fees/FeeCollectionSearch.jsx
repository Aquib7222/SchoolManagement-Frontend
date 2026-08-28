
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const FeeCollectionSearch = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    if (!selectedSession || !admissionNo.trim()) {
      alert("Please select session and enter admission number.");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      setStudent(null);

      const res = await axiosInstance.get(
        "/api/students/session-admission",
        {
          params: {
            academicYear: selectedSession,
            admissionNumber: admissionNo.trim(),
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStudent(res.data);
    } catch (error) {
      console.log(error);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedSession("");
    setAdmissionNo("");
    setStudent(null);
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
          <strong>Fee Collection</strong>
        </h4>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item">Fee</li>
            <li className="breadcrumb-item active">Fee Collection</li>
          </ol>
        </nav>
      </div>

      <div className="card shadow mb-3">
        <div className="card-header bg-white ">
          <strong>Search Student For Collection</strong>
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

      {!loading && student && (
        <div className="card shadow mt-3">
          <div className="card-header bg-white ">
            <strong>Student Details</strong>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle mb-0">
                <thead className="table-primary">
                  <tr>
                    <th>S.No</th>
                    <th>Admission No</th>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Father Name</th>
                    <th>Mother Name</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1</td>

                    <td className="fw-semibold">
                      {student.admissionNumber || "-"}
                    </td>

                    <td>
                      {student.firstName || ""}{" "}
                      {student.lastName || ""}
                    </td>

                    <td>{student.studentClass || "-"}</td>

                    <td>{student.section || "-"}</td>

                    <td>{student.fatherName || "-"}</td>

                    <td>{student.motherName || "-"}</td>

                    <td>{student.mobile || "-"}</td>

                    <td>{student.address || "-"}</td>

                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          navigate(
                            `/fee/feeCollection/${student.admissionNumber}`,
                          )
                        }
                      >
                        Collect Fee
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-end mt-3">
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleReset}
              >
                Clear Search
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && searched && !student && (
        <div className="card shadow mt-3">
          <div className="card-header bg-white text-white">
            <strong>Student Details</strong>
          </div>

          <div className="card-body text-center p-5">
            <div className="mb-3">
              <i
                className="bi bi-person-x-fill text-danger"
                style={{ fontSize: "60px" }}
              ></i>
            </div>

            <h4 className="text-danger">Student Not Found</h4>

            <p className="text-muted mb-3">
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

export default FeeCollectionSearch;

