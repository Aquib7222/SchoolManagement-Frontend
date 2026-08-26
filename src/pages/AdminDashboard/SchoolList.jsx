import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSchool,
  FaEye,
  FaEdit,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaSearch,
  FaPlus,
  FaRegPauseCircle,
  FaPauseCircle,
  FaUserGraduate,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SiAdguard } from "react-icons/si";

const SchoolList = () => {
  const navigate = useNavigate();

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

  const getLogoUrl = (logoUrl) => {
    if (!logoUrl) {
      return "/images/default-school.png";
    }

    if (logoUrl.startsWith("http")) {
      return logoUrl;
    }

    return `http://localhost:8080${logoUrl}`;
  };

  

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("AdminToken") || localStorage.getItem("token");

      const response = await axios.get("http://localhost:8080/api/school/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSchools(response.data || []);
    } catch (error) {
      console.error("Failed to fetch schools:", error);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  

  const filteredSchools = schools.filter((school) => {
    const searchText = search.toLowerCase();

    return (
      school.schoolName?.toLowerCase().includes(searchText) ||
      school.schoolCode?.toLowerCase().includes(searchText) ||
      school.city?.toLowerCase().includes(searchText) ||
      school.state?.toLowerCase().includes(searchText) ||
      school.email?.toLowerCase().includes(searchText)
    );
  });

  console.log("filteredSchools", filteredSchools);

  const getStatus = (school) => {
    return school.active === true ? "Active" : "Inactive";
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this school?",
    );

    if (!confirmDelete) return;

    try {
      const token =
        localStorage.getItem("AdminToken") || localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/api/school/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSchools((prev) => prev.filter((school) => school.id !== id));
    } catch (error) {
      console.error("Delete school failed:", error);

      alert("Unable to delete school.");
    }
  };

  return (
    <div className="container-fluid px-2 py-3">
     

      <div className="card border-0 shadow mb-3">
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "48px",
                  height: "48px",
                  background: "#e7f0ff",
                }}
              >
                <FaSchool size={23} className="text-primary" />
              </div>

              <div>
                <h4 className="mb-1 fw-semibold">School List</h4>

                <small className="text-muted">
                  Manage and view all registered schools
                </small>
              </div>
            </div>

            <button
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={() => navigate("/add/schools")}
            >
              <FaPlus />
              Add School
            </button>
          </div>
        </div>
      </div>

     

      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6 col-md-4 col-lg">
          <div
            className="card h-100 border shadow"
            style={{ backgroundColor: "#fdf2ff" }}
          >
            <div className="card-body d-flex align-items-center">
              <div
                className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
                style={{
                  backgroundColor: "#f8d9fc",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaSchool color="purple" size={32} />
              </div>

              <div className="flex-grow-1">
                <h6 className="mb-1">Total Schools</h6>

                <strong className="fs-4 d-block">{schools.length}</strong>

                <div className="d-flex gap-2 flex-wrap">
                  <small>
                    Active:{" "}
                    {schools.filter((school) => school.active === true).length}
                  </small>
                  <small>
                    Inactive:{" "}
                    {schools.filter((school) => school.active !== true).length}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            className="card border shadow h-100 "
            style={{ backgroundColor: "#f2fbff" }}
          >
            <div className="card-body d-flex align-items-center">
              <div
                className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2 "
                style={{
                  backgroundColor: "#caecfc",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <SiAdguard className="text-info" size={32} />
              </div>

              <div className="flex-grow-1">
                <h6 className="mb-1">Active Schools</h6>

                <strong className="fs-4 d-block">
                  {schools.filter((school) => school.active === true).length}
                </strong>

                <div className="d-flex gap-2 flex-wrap">
                  <small>
                    This Month:{" "}
                    {schools.filter((school) => school.active === true).length}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            className="card border shadow h-100"
            style={{ backgroundColor: "#f2fffb" }}
          >
            <div className="card-body d-flex align-items-center">
              <div
                className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
                style={{
                  backgroundColor: "#d9faef",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaPauseCircle color="green" size={32} />
              </div>

              <div className="flex-grow-1">
                <h6 className="mb-1">InActive Schools</h6>

                <strong className="fs-4 d-block">
                  {schools.filter((school) => school.active !== true).length}
                </strong>

                <div className="d-flex gap-2 flex-wrap">
                  <small>
                    This Month:{" "}
                    {schools.filter((school) => school.active !== true).length}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            className="card border shadow h-100"
            style={{ backgroundColor: "#fcf8e6" }}
          >
            <div className="card-body d-flex align-items-center">
              <div
                className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
                style={{
                  backgroundColor: "#fcf5d4",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaUserGraduate color="orange" size={32} />
              </div>

              <div className="flex-grow-1">
                <h6 className="mb-1">Total Students</h6>

                <strong className="fs-4 d-block">
                  {schools.reduce(
                    (total, school) => total + (school.totalStudents || 0),
                    0,
                  )}
                </strong>

                <div className="d-flex gap-2 flex-wrap">
                  {/* <small>
                    This Month:{" "}
                    {schools.filter((school) => school.active !== true).length}
                  </small> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCHOOL TABLE
      ===================================================== */}

      <div className="card border-0 shadow">
        <div className="card-header bg-white py-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <h5 className="mb-0 fw-semibold">All Schools</h5>

            {/* SEARCH */}

            <div className="input-group" style={{ maxWidth: "350px" }}>
              <span className="input-group-text bg-white">
                <FaSearch />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Search school..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="card-body p-3">
          <div
            className="table-responsive"
            style={{
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            <table className="table table-hover align-middle mb-0">
              <thead
                className="table-primary"
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <tr>
                  <th>#</th>

                  <th>School Name</th>

                  <th>Code</th>

                  <th>Contact Person</th>

                  <th>Phone </th>

                  <th>Email</th>
                  <th>City</th>
                  <th>State</th>

                  <th>Students</th>

                  <th>Board</th>
                  <th>Created On</th>

                  <th>Status</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {/* LOADING */}

                {loading && (
                  <tr>
                    <td colSpan="9" className="text-center py-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      />

                      <div className="mt-2 text-muted">Loading schools...</div>
                    </td>
                  </tr>
                )}

                {/* NO DATA */}

                {!loading && filteredSchools.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center py-5 text-muted">
                      <FaSchool size={35} className="mb-2" />

                      <div>No schools found</div>
                    </td>
                  </tr>
                )}

                {/* DATA */}

                {!loading &&
                  filteredSchools.map((school, index) => (
                    <tr key={school.id}>
                      {/* NUMBER */}

                      <td>{index + 1}</td>

                      {/* SCHOOL */}

                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center me-2"
                            style={{
                              width: "45px",
                              height: "45px",
                              background: "#f1f5f9",
                            }}
                          >
                            {/* {school.logoUrl ? (
                              <img
                                src={school.logoUrl}
                                alt={school.schoolName}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <FaSchool className="text-primary" size={20} />
                            )} */}
                            <img
                              src={getLogoUrl(school.logoUrl)}
                              alt={school.schoolName}
                              style={{
                                width: "70px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                border: "1px solid #dee2e6",
                                padding: "8px",
                              }}
                            />
                          </div>

                          <div>
                            <div className="fw-semibold">
                              {school.schoolName}
                            </div>

                            {/* <small className="text-muted">
                              {school.organizationName || "—"}
                            </small> */}
                          </div>
                        </div>
                      </td>

                      {/* CODE */}

                      <td>
                        <span className="badge bg-light text-dark border">
                          {school.schoolCode || "—"}
                        </span>
                      </td>

                      {/* CONTACT */}

                      <td>
                        <div className="small">
                          <div>{school.contactPerson}</div>
                        </div>
                      </td>

                      {/* LOCATION */}

                      <td>{school.phoneNumber}</td>
                      <td>{school.email}</td>
                      <td>{school.city}</td>
                      <td>{school.state}</td>

                      {/* STUDENTS */}

                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <FaUsers className="text-primary" />

                          <span>{school.totalStudents || 0}</span>
                        </div>
                      </td>

                      {/* BOARD */}

                      <td>{school.affiliationBoard || "—"}</td>

                     <td>{formatDate(school.createdAt)}</td>

                      {/* STATUS */}



                      <td>
                        <span
                          className={`badge ${
                            school.active ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {getStatus(school)}
                        </span>
                      </td>

                      {/* ACTION */}

                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            title="View"
                            onClick={() =>
                              navigate(`/school/view/${school.id}`)
                            }
                          >
                            <FaEye />
                          </button>

                          {/* <button
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                              onClick={() =>
                                navigate(
                                  `/school/edit/${school.id}`
                                )
                              }
                            >
                              
                            </button> */}

                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              navigate(`/school-edit/${school.id}`)
                            }
                          >
                            <FaEdit />
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Delete"
                            onClick={() => handleDelete(school.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolList;
