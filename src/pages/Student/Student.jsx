import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Students = () => {
  const navigate = useNavigate();

  const [academicYear, setAcademicYear] = useState("");
  const [standard, setStandard] = useState("");
  const [section, setSection] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleAdd = () => {
    navigate("/student/add_students");
  };

  const handleView = (admissionNumber) => {
    navigate(`/student/view/${admissionNumber}`);
  };

  // ✅ BACKEND SEARCH
  const handleFilter = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:8080/api/students/search", {
        params: {
          academicYear: academicYear || null,
          studentClass: standard ? standard.toLowerCase() : null,
          section: section || null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  console.log(students);

  return (
    <>
       {/* Header */}
      <div
        className="row shadow-lg"
        style={{
          backgroundColor: "white",
          margin: "10px",
          height: "70px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6>
          <strong>Students Standard Section wise</strong>
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
                Students Standard Section wise
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* Filters */}
      <div className="mt-3 ms-2 me-2 bg-white rounded p-3 shadow">
        <div className="row">
          <div className="col-md-3">
            <h6>
              <strong>Academic Year</strong>
            </h6>
            <select
              className="form-select"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
            >
              <option value="">All</option>
              <option value="2026-27">2026-27</option>
              <option value="2025-26">2025-26</option>
              <option value="2024-25">2024-25</option>
              <option value="2023-24">2023-24</option>
            </select>
          </div>

          <div className="col-md-3">
            <h6>
              <strong>Standard</strong>
            </h6>
            <select
              className="form-select"
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
            >
              <option value="">All</option>
              <option value="NURSERY">Nursery</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
              <option value="IX">IX</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>
          </div>

          <div className="col-md-3">
            <h6>
              <strong>Section</strong>
            </h6>
            <select
              className="form-select"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="">All</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div className="col-md-3 d-flex align-items-end">
            <button className="btn btn-primary me-2" onClick={handleFilter}>
              Search
            </button>
            {/* <button className="btn btn-success" onClick={handleAdd}>
              + Add
            </button> */}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-3 p-3 ms-2 me-2 bg-white rounded shadow">
        <table className="table table-bordered table-hover">
          <thead className="table-primary">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Admission No</th>
              <th>Student Standard</th>
              <th>Address</th>
              <th>Gender</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : students.length > 0 ? (
              students.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>
                    {s.firstName} {s.lastName}
                  </td>
                  <td>{s.admissionNumber}</td>
                  <td>{s.studentClass}/{s.section}</td>
                  <td> {s.houseNo},{" "}
                        {s.street}, {s.town}, {s.state} -{" "}
                        {s.zip}</td>
                  <td>{s.gender}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleView(s.admissionNumber)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Students;
