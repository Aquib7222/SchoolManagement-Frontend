import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeeLedger = () => {
  const [sessions, setSessions] = useState([]);
  const token = localStorage.getItem("token");
  const [selectedSession, setSelectedSession] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadSessions();
  }, []);
  console.log("sessions", sessions);

  // ==========================
  // Sessions
  // ==========================
  const loadSessions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/master/sessions", {
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

    if (!admissionNo) {
      alert("Enter Admission Number");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get("http://localhost:8080/api/students/search", {
        params: {
          session: selectedSession,
          admissionNumber: admissionNo,
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

  return (
    <>
      {/* ===========================
        Header
    ============================ */}

      <div
        className="row shadow"
        style={{
          background: "#fff",
          margin: "10px",
          borderRadius: "5px",
          padding: "12px",
        }}
      >
        <h5>
          <strong>Fee Ledger</strong>
        </h5>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item active">Fee Ledger</li>
          </ol>
        </nav>
      </div>

      {/* // ============================
    // Search Student 
    // ============================ */}

      <div className="container-fluid mt-4">
        <div className="card shadow rounded">
          <div className="card-header">Search Student</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <label>Session:</label>
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
              <div className="col-md-4">
                <label>Admission No:</label>
                <input
                  type="text"
                  className="form-control"
                  value={admissionNo}
                  onChange={(e) => setAdmissionNo(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <button className="btn btn-success mt-4" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* student list table  */}

      {loading && <div className="text-center mt-3">Loading...</div>}
      {!loading && students.length > 0 && (
        <div className="container-fluid mt-4">
          <div className="card shadow">
            <div className="card-header  ">Student List</div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
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
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : students.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center text-danger">
                          No Student Found
                        </td>
                      </tr>
                    ) : (
                      students.map((student, index) => (
                        <tr key={student.id}>
                          <td>{index + 1}</td>

                          <td>{student.admissionNumber}</td>

                          <td>
                            {student.firstName} {student.lastName}
                          </td>

                          <td>{student.studentClass}</td>

                          <td>{student.section}</td>

                          <td>{student.mobile}</td>

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
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeeLedger;
