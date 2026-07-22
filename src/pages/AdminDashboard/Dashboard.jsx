import React, { useEffect, useState } from "react";
import axios from "axios";
import SchoolAddForm from "./SchoolAddForm";
import SuperAdminCreation from "./SuperAdminCreation";
import { FaBuilding, FaUsers, FaUserFriends } from "react-icons/fa";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import schoolIcon from "../../assets/icon/schoolIcon.png";
import userIcon from "../../assets/icon/profile.png";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [schools, setSchools] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [superadmins, setSuperAdmins] = useState([]);
  const [totalStudents, setTotalStudents] = useState([]);
  const [activeStudentCount, setActiveStudentCount] = useState({});

  console.log("schools", schools);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const Admin = JSON.parse(localStorage.getItem("user"));
  console.log("admin", Admin);

  // 🔹 Load schools & super admins
  useEffect(() => {
    fetchSchools();
    fetchSuperAdmins();
    fetchStudentsCount();
    fetchActiveStudentsBySchool();
  }, []);

  // Fetch students
  const fetchStudentsCount = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/students/count", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("student count", res);
      setTotalStudents(res.data);
    } catch (err) {
      console.log("Failed to load Students", err);
    }
  };
  console.log("Total Students count", totalStudents);

  const fetchActiveStudentsBySchool = async (schoolId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/students/count/active?schoolId=${schoolId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setActiveStudentCount((prev) => ({
        ...prev,
        [schoolId]: res.data,
      }));
    } catch (err) {
      console.error("Failed to load active students", err);
    }
  };

  // 🔹 Fetch super admins
  const fetchSuperAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/superadmin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("res", res);
      setSuperAdmins(res.data);
    } catch (err) {
      console.error("Failed to load super admins", err);
    }
  };
  console.log("super count", superadmins.length);
  console.log("schools", schools);

  const fetchSchools = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/school/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchools(res.data);

      // 🔥 fetch active students per school
      res.data.forEach((school) => {
        fetchActiveStudentsBySchool(school.id);
      });
    } catch (err) {
      console.error("Error fetching schools", err);
    }
  };

  // inside the Dashboard component, after fetching superadmins
  const getSuperAdminNames = (schoolId) => {
    // filter superadmins who belong to this school
    const admins = superadmins.filter((admin) => admin.school?.id === schoolId);
    // return names joined by comma
    return (
      admins.map((a) => a.fullName).join(", ") || "Super Admin not Created Yet"
    ); // show — if no superadmin
  };

  console.log("school Id", schools);

  // Delete school
  const deleteSchool = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/school/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchools(schools.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Toggle Active / Inactive
  const toggleStatus = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/school/toggle/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSchools((prev) => prev.map((s) => (s.id === id ? res.data : s)));
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  // Cards data with gradients and icons
  const cards = [
    {
      title: "Total Schools",
      subtitle: schools.length, // dynamic count
      gradient:
        "linear-gradient(135deg, #0d4e86ff 0%, #42a5f5 50%, #90caf9 100%)",
      icon: <FaBuilding />,
    },
    {
      title: "Superadmins",
      subtitle: superadmins.length, // replace with dynamic value if you have
      gradient:
        "linear-gradient(135deg, #06af0eff 0%, #3ece46ff 50%, #a5d6a7 100%)",
      icon: <FaUsers />,
    },
    {
      title: "Total Users",
      subtitle: totalStudents, // replace with dynamic value if you have
      gradient:
        "linear-gradient(135deg, #c6d8e6ff 0%, #b7c1ccff 60%, #ffffff 100%)",
      icon: <FaUserFriends />,
      iconColor: "#1e88e5",
      textColor: "#1e88e5",
    },
    {
      title: "Create School",
      subtitle: null,
      gradient:
        "linear-gradient(135deg, #06af0eff 0%, #3ece46ff 50%, #a5d6a7 100%)",
      icon: <FaUsers />,
    },
  ];

  const handleView = (id) => {
    navigate(`/schools/${id}`);
  };

  return (
    <div className="container">
      {/* <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">DashBoard</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page"></li>
        </ol>
      </nav> */}

      {/* Cards Row */}
      <div className="row w-100  mt-4 ">
        {cards.map((card, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div
              className="card h-75 shadow dashboard-card text-white pb-3"
              style={{
                background: card.gradient,
                color: card.textColor || "#fff",
                cursor: card.title === "Create School" ? "pointer" : "default",
              }}
              onClick={() => {
                if (card.title === "Create School") navigate("/add/schools");
              }}
            >
              <div className="card-body d-flex align-items-center">
                <div
                  className="me-3"
                  style={{
                    fontSize: "26px",
                    color: card.iconColor || "#fff",
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <h5 className="mb-1 " style={{ fontSize: "20px" }}>
                    {card.title}
                  </h5>
                  {card.subtitle !== null && (
                    <h6 className="mb-0">{card.subtitle}</h6>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className=" p-3 bg-white shadow rounded">
        <div className="row">
          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text" id="search-addon">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="search-addon"
              />
            </div>
          </div>
          <div className="col-md-3">
            <select name="" id="" className="form-select w-100">
              <option value="">All Superadmins</option>
              <option value=""></option>
            </select>
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-success w-100"
              onClick={() => navigate("/add/superadmins")}
            >
              Create SuperAdmins
            </button>
          </div>
          <div className="col-md-3 d-flex justify-content-end">
            <button className="btn btn-outline-success d-flex align-items-center">
              <HiOutlineArrowDownTray size={20} className="me-2" />{" "}
              {/* icon with margin */}
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 bg-white shadow rounded mt-3 table-responsive">
        <table className="table table-bordered table-hover align-middle ">
          <thead className="table-secondary">
            <tr>
              <th>S.No</th>
              <th>School Name</th>
              <th>Super Admin</th>
              {/* <th>Teachers</th> */}
              <th>Total Users</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.length > 0 ? (
              schools.map((school) => (
                <tr key={school.id}>
                  <td>{school.id}</td>
                  <td style={{ fontWeight: "600" }}>
                    <img
                      src={schoolIcon}
                      style={{
                        height: "30px",
                        width: "35px",
                        marginRight: "5px",
                      }}
                      alt=""
                    />
                    {school.schoolName}
                  </td>
                  <td>
                    <img
                      src={userIcon}
                      style={{
                        height: "30px",
                        width: "35px",
                        marginRight: "5px",
                      }}
                      alt=""
                    />
                    {getSuperAdminNames(school.id)}
                  </td>
                  <td>{activeStudentCount[school.id] ?? "—"}</td>
                  {/* <td></td> */}
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={school.status === "Active"}
                        onChange={() => toggleStatus(school.id)}
                      />
                      <label className="form-check-label">
                        {school.status}
                      </label>
                    </div>
                  </td>
                  <td className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleView(school.id)}
                    >
                      View
                    </button>{" "}
                    <button className="btn btn-outline-secondary btn-sm">
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteSchool(school.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No Schools Found
                </td>
              </tr>
            )}

            {/* Repeat rows dynamically as needed */}
          </tbody>
        </table>
      </div>

      {/* {!showForm ? (
        <>
          <div className="mt-4 border p-3 rounded shadow-sm table-responsive">
            <h4>School Management</h4>

            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>School Name</th>
                  <th>School Code</th>
                  <th>Estd Year</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Principal</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {schools.length > 0 ? (
                  schools.map((school) => (
                    <tr key={school.id}>
                      <td className="fw-bold">{school.schoolName}</td>
                      <td>{school.schoolCode}</td>
                      <td>{school.year}</td>
                      <td>{school.address}</td>
                      <td>{school.phone}</td>
                      <td>{school.principal}</td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={school.status === "Active"}
                            onChange={() => toggleStatus(school.id)}
                          />
                          <label className="form-check-label">
                            {school.status}
                          </label>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteSchool(school.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No Schools Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <button
            className="btn btn-success mt-3"
            onClick={() => setShowForm(true)}
          >
            ➕ Add School
          </button>
        </>
      ) : (
        <SchoolAddForm setShowForm={setShowForm} setSchools={setSchools} />
      )} */}

      {/* <SuperAdminCreation /> */}

      <Outlet />
    </div>
  );
};

export default Dashboard;
