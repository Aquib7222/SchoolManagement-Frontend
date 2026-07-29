import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useMasters from "../../hooks/useMasters";
import axios from "../../api/axiosInstance";

const Students = () => {
  const { loading: masterLoading, sessions, standards, sections } = useMasters();
  const navigate = useNavigate();
  const [sessionList, setSessionList] = useState([]);
  const [standardList, setStandardList] = useState([]);

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [students, setStudents] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  // const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ==========================
  // Load Masters
  // ==========================
  // useEffect(() => {
  //   // loadSessions();
  //   loadStandards();
  // }, []);

  // // ==========================
  // // Sessions
  // // ==========================
  // const loadSessions = async () => {
  //   try {
  //     const res = await axios.get("/api/master/sessions", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setSessionList(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // // ==========================
  // // Standards
  // // ==========================
  // const loadStandards = async () => {
  //   try {
  //     const res = await axios.get("/api/master/standard", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setStandardList(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleAdd = () => {
    navigate("/student/add_students");
  };

  const handleView = (admissionNumber) => {
    navigate(`/student/view/${admissionNumber}`);
  };

  // ✅ BACKEND SEARCH
  const handleFilter = async () => {
    try {
      setSearchLoading(true);

      const res = await axios.get("/api/students/search", {
        params: {
          academicYear: selectedSession || null,
          studentClass: selectedStandard || null,
          section: selectedSection || null,
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
      setSearchLoading(false);
    }
  };

  console.log(students);

  return (
    <>
      {/* Header */}
      <div
        className="rounded mt-3 p-2 bg-white shadow-lg"
       
      >
        <div className="row"><h6>
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
        </nav></div>
      </div>

      {/* Filters */}
      <div className=" bg-white rounded p-3 shadow mt-3">
        <div className="row">
          <div className="col-md-3">
            <h6>
              <strong>Academic Year</strong>
            </h6>
            <select
              className="form-select"
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
            >
              <option value="">All</option>

              {sessions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <h6>
              <strong>Standard</strong>
            </h6>
            <select
              className="form-select"
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
            >
              <option value="">All</option>

              {standards.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <h6>
              <strong>Section</strong>
            </h6>
            <select
              className="form-select"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
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
      <div className="mt-3 p-2 bg-white rounded shadow table-responsive">
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
            {searchLoading  ? (
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
                  <td>
                    {s.studentClass}/{s.section}
                  </td>
                  <td>
                    {" "}
                    {s.houseNo}, {s.street}, {s.town}, {s.state} - {s.zip}
                  </td>
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
