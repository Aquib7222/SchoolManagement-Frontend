import axios from "axios";
import { useState, useEffect } from "react";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Generate_Fee = () => {
  const [showInput, setShowInput] = useState(false);
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    loadStudents();
  }, []);
  console.log("students:", students);
  const loadStudents = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:8080/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ BACKEND SEARCH
  const handleFilter = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:8080/api/students/search", {
        params: {
          academicYear: filters.session || null,
          studentClass: filters.standard || null,
          section: filters.section || null,
          search:
            filters.admissionNumber ||
            filters.studentName ||
            filters.fatherName ||
            filters.motherName ||
            filters.phone ||
            null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const standards = [
    "Nursery",
    "LKG",
    "UKG",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];

  const sections = ["A", "B", "C", "D"];

  const handleView = (id) => navigate(`/fee/generate_fee/${id}`);

  return (
    <>
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
          <strong>Generate Fee - Student wise</strong>
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
                Generate Fee
              </a>
            </li>
          </ol>
        </nav>
      </div>

      <div className="ms-2 me-2 p-3 bg-white shadow rounded">
        {/* Main search inputs */}
        <div className="row">
          <div className="col-md-4">
            <label>
              <strong>Academic Year</strong>
            </label>
            <select
              name="session"
              value={filters.session}
              onChange={handleChange}
              className="w-100 rounded mt-2 p-2"
            >
              <option value="">Select</option>
              {["2026-27","2025-26", "2024-25", "2023-24", "2022-23"].map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label>
              <strong>Admission Number</strong>
            </label>
            <input
              type="text"
              name="admissionNumber"
              value={filters.admissionNumber}
              onChange={handleChange}
              className="w-100 rounded mt-2 p-2"
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-secondary border"
              style={{ marginTop: "32px" }}
              onClick={() => setShowInput((prev) => !prev)}
            >
              {showInput ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
            </button>
          </div>
        </div>

        {/* Extended inputs */}
        {showInput && (
          <div className="row mt-3">
            <div className="col-md-3">
              <label>
                <strong>Student Name</strong>
              </label>
              <input
                type="text"
                name="studentName"
                value={filters.studentName}
                onChange={handleChange}
                className="w-100 rounded mt-2 p-2"
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>Father's Name</strong>
              </label>
              <input
                type="text"
                name="fatherName"
                value={filters.fatherName}
                onChange={handleChange}
                className="w-100 rounded mt-2 p-2"
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>Mother's Name</strong>
              </label>
              <input
                type="text"
                name="motherName"
                value={filters.motherName}
                onChange={handleChange}
                className="w-100 rounded mt-2 p-2"
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>Mobile Number</strong>
              </label>
              <input
                type="text"
                name="phone"
                value={filters.phone}
                onChange={handleChange}
                className="w-100 rounded mt-2 p-2"
              />
            </div>

            <div className="col-md-3">
              <label>
                <strong>Standard</strong>
              </label>
              <select
                name="standard"
                value={filters.standard}
                onChange={handleChange}
                className="w-100 rounded mt-2 p-2"
              >
                <option value="">Select</option>
                {standards.map((std) => (
                  <option key={std} value={std}>
                    {std}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label>
                <strong>Section</strong>
              </label>
              <select
                name="section"
                value={filters.section}
                onChange={handleChange}
                className="w-100 rounded mt-2 p-2"
              >
                <option value="">Select</option>
                {sections.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3">
              <button className="btn btn-primary" onClick={handleFilter}>
                Search
              </button>
            </div>
          </div>
        )}

        {/* Student result */}
        {students.length > 0 && (
          <div className="mt-4 table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="">
                <tr>
                  <th>Admission No</th>
                  <th>Name</th>
                  {/* <th>Father</th>
                  <th>Mother</th> */}
                  <th>Phone No</th>
                  <th>Email</th>
                  <th>Standard</th>
                  <th>Section</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((stu, index) => (
                  <tr key={index}>
                    <td>{stu.admissionNumber || "N/A"}</td>
                    <td>{`${stu.firstName || ""} ${stu.middleName || ""} ${
                      stu.lastName || ""
                    }`}</td>
                    {/* <td>{stu.fatherName || "N/A"}</td>
                    <td>{stu.motherName || "N/A"}</td> */}
                    <td>{stu.fatherMobile || stu.motherMobile || "N/A"}</td>
                    <td>
                      {stu.email || stu.fatherEmail || stu.motherEmail || "N/A"}
                    </td>
                    <td>{stu.class || "N/A"}</td>
                    <td>{stu.section || "N/A"}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleView(stu.admissionNumber)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filters.session && students.length === 0 && (
          <div className="text-danger mt-3">
            No student found for selected filters.
          </div>
        )}
      </div>
    </>
  );
};

export default Generate_Fee;
