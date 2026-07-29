import React, { useState } from "react";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import useMasters from "../../hooks/useMasters";
import api from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const StudentSearch = () => {
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();
  const {
    loading: masterLoading,
    sessions,
    standards,
    sections,
  } = useMasters();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    session: "",
    admissionNumber: "",
    studentName: "",
    standard: "",
    section: "",
    fatherName: "",
    motherName: "",
    phone: "",
  });
  const handleReset = () => {
    setFilters({
      session: "",
      admissionNumber: "",
      studentName: "",
      standard: "",
      section: "",
      fatherName: "",
      motherName: "",
      phone: "",
    });
    setShowInput(false);
  };

  console.log(filters);

  //   student search api
  const handleSearch = async () => {
    try {
      setLoading(true);
      const params = {
        academicYear: filters.session,
        studentClass: filters.standard,
        section: filters.section,
      };

      console.log(params);

      const res = await api.get("/api/students/all", {
        params: {
          academicYear: filters.session,
          admissionNumber: filters.admissionNumber,
          studentName: filters.studentName,
          fatherName: filters.fatherName,
          motherName: filters.motherName,
          mobile: filters.phone,
          studentClass: filters.standard,
          section: filters.section || null,
        },
      });

      setStudents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* Header */}
      <div
        className="row shadow-lg ms-2 me-2"
        style={{
          backgroundColor: "white",
        //   margin: "10px",
          height: "70px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6>
          <strong>Student Search</strong>
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" style={{ textDecoration: "none", color: "black" }}>
                Student Search
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* Search card  */}

      <div className="ms-2 me-2 shadow bg-white rounded mt-4">
        <div className="card">
          <div className="card-header">Search Students</div>
          <div className="card-body p-3 mt-3">
            <div className="row">
              <div className="col-md-4">
                <label>
                  <h6>Session:</h6>
                </label>
                <select
                  name=""
                  id=""
                  className="form-select"
                  value={filters.session}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      session: e.target.value,
                    })
                  }
                >
                  <option value="">Select Session</option>{" "}
                  {sessions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label>
                  <h6>Admission Number:</h6>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={filters.admissionNumber}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      admissionNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn  border btn-outline-primary"
                  style={{ marginTop: "32px" }}
                  onClick={() => setShowInput((prev) => !prev)}
                >
                  {showInput ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-outline-danger"
                  style={{ marginTop: "32px" }}
                  onClick={handleReset}
                >
                  Reset Filters
                </button>
              </div> 
            </div>

            {showInput && (
              <>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <label>Student Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={filters.studentName}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          studentName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label>Father Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={filters.fatherName}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          fatherName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label>Mother Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={filters.motherName}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          motherName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={filters.phone}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-3">
                    <label>Standard</label>
                    <select
                      name=""
                      id=""
                      className="form-select"
                      value={filters.standard}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          standard: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Standard</option>
                      {standards.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label>Section</label>
                    <select
                      name=""
                      id=""
                      className="form-select"
                      value={filters.section}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          section: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Section</option>
                      {sections.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <button
                      className="btn btn-primary mt-4"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ==============================
        Student List
================================ */}

      <div className="card shadow mt-4 ms-2 me-2">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Student List</h5>

          <span className="badge bg-primary">Total : {students.length}</span>
        </div>

        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover table-striped align-middle">
            <thead className="table-primary">
              <tr>
                <th>S.No</th>

                <th>Admission No</th>

                <th>Student Name</th>

                <th>Class</th>

                <th>Father Name</th>

                <th>Mother Name</th>

                <th>Mobile</th>

                <th>Address</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center p-5">
                    <div className="spinner-border text-primary"></div>

                    <p className="mt-2 mb-0">Loading...</p>
                  </td>
                </tr>
              ) : students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>

                    <td>{student.admissionNumber}</td>

                    <td>
                      {student.firstName} {student.lastName}
                    </td>

                    <td>
                      {student.studentClass} ({student.section})
                    </td>

                    <td>{student.fatherName}</td>

                    <td>{student.motherName}</td>

                    <td>{student.mobile}</td>

                    <td>
                      {student.houseNo}, {student.street},{student.town},{" "}
                      {student.state} - {student.zip}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          navigate(`/student/view/${student.admissionNumber}`)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center text-danger fw-bold p-4"
                  >
                    No Student Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentSearch;
