import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../api/axiosInstance";

const NewAdmission = () => {
  const [admissions, setAdmissions] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!user?.schoolId) return;

    axios
      .get(
        `/api/admissions/school?schoolId=${user.schoolId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => setAdmissions(res.data))
      .catch(console.error);
  }, [user?.schoolId]);

  const updateStatus = async (id, status) => {
    await axios.put(
      `/api/admissions/${id}/status`,
      { status }, // send as JSON body
      { headers: { Authorization: `Bearer ${token}` } },
    );

    // reload admissions
    const res = await axios.get(
      `/api/admissions/school?schoolId=${user.schoolId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setAdmissions(res.data);
  };

  const [filters, setFilters] = useState({
    session: "",
    standard: "",
    status: "",
    appliedDate: "",
  });
  const standards = [
    "NURSERY",
    "LKG",
    "UKG",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredAdmissions = admissions.filter((item) => {
    return (
      (filters.session === "" || item.academicYear === filters.session) &&
      (filters.standard === "" || item.studentClass === filters.standard) &&
      (filters.status === "" || item.status === filters.status) &&
      (filters.appliedDate === "" || item.today === filters.appliedDate)
    );
  });

  console.log("admission in new admission", admissions);

  return (
    <div>
      {/* Header */}
      <div
        className="row shadow"
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
          <strong>New Admissions</strong>
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
                Take New Admissions
              </a>
            </li>
          </ol>
        </nav>
      </div>
      {/* Filter Form */}
      <div className=" mt-4 rounded mx-2 bg-white p-4 shadow">
        <div className="row">
          <div className="col-md-4">
            <label>Session</label>
            <select
              name="session"
              value={filters.session}
              onChange={handleChange}
              className="w-100 p-2 rounded"
            >
              <option value="">Select All</option>
              <option value="2023-24">2023-24</option>
              <option value="2024-25">2024-25</option>
              <option value="2025-26">2025-26</option>
            </select>
          </div>

          <div className="col-md-4">
            <label>Applied Standard</label>
            <select
              name="standard"
              value={filters.standard}
              onChange={handleChange}
              className="w-100 p-2 rounded"
            >
              <option value="">Select</option>
              {standards.map((std) => (
                <option key={std} value={std}>
                  {std}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Second Row */}
        <div className="row mt-3">
          <div className="col-md-4">
            <label>Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-100 p-2 rounded"
            >
              <option value="">Select</option>
              <option value="New">New</option>
              <option value="Call for Test">Call for Test</option>
              <option value="Call for Interview">Call for Interview</option>
              <option value="On Hold">On Hold</option>
              <option value="Rejected">Rejected</option>
              <option value="Waiting for Confirmation">
                Waiting for Confirmation
              </option>
            </select>
          </div>
          <div className="col-md-4">
            <label>Applied Date</label>
            <input
              type="date"
              name="appliedDate"
              value={filters.appliedDate}
              onChange={handleChange}
              className="w-100 p-2 rounded"
            />
          </div>
        </div>

        <button
          className="btn btn-primary  ms-auto me-2 mt-3"
          onClick={() => navigate("/admission/new_admission/add")}
        >
          + Add
        </button>
      </div>
      

      <div className="mt-3 ms-2 me-2 bg-white rounded p-3 shadow table-responsive">
        {/* Table Display */}

        <table className="table table-striped table-hover table-bordered">
          <thead className="table-primary">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Admission No</th>
              <th>Parents Details</th>
              <th>Mobile No</th>
              <th>Session</th>
              <th>Standard</th>
              <th>Status</th>
              <th>Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmissions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-danger">
                  No data found
                </td>
              </tr>
            ) : (
              filteredAdmissions.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="fw">
                    {item.firstName} {item.lastName}
                  </td>

                  <td>{item.admissionNumber}</td>
                  <td>{item.fatherName} {item.fatherEmail},
                    {item.motherName}{item.motherEmail}
                  </td>
                  <td>{item.fatherMobile}</td>
                  <td>{item.academicYear}</td>
                  <td>{item.studentClass}</td>
                  <td>{item.academicType}</td>
                  <td>{item.today}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewAdmission;
