import React, { useEffect, useState } from "react";
import { FaUsers, FaUserShield } from "react-icons/fa";
import Man from "../../assets/icon/SchoolMan.png";
import { useParams } from "react-router-dom";
import axios from "axios";

const SchoolDetailsView = () => {
  const { id } = useParams(); // 👈 school ID
  const token = localStorage.getItem("token");
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [status, setStatus] = useState("");
  const [superAdmins, setSuperAdmins] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchSuperAdmins();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:8080/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Students:", response.data);
      setStudents(response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error);
    }
  };

  console.log("Students in SchoolDetailsView:", students[0]?.school?.id);
  students.forEach((student) => {
    console.log(student.school?.id);
  });
  const [school, setSchool] = useState(null);
  useEffect(() => {
    fetchSchoolById();
  }, [id]);

  const fetchSchoolById = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/school/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSchool(res.data);
    } catch (err) {
      console.error("Failed to load school details", err);
    }
  };
  console.log("school by id", school);

  const schoolStudents = students.filter(
    (student) => student.school?.id === Number(id),
  );

  console.log("School Students:", schoolStudents);

  // filter students
  const filteredStudents = schoolStudents.filter((student) => {
    const fullName =
      `${student.firstName || ""} ${student.middleName || ""} ${student.lastName || ""}`.toLowerCase();

    const matchesSearch =
      search === "" ||
      fullName.includes(search.toLowerCase()) ||
      String(student.mobile || "").includes(search);

    const matchesClass =
      studentClass === "" || student.studentClass === studentClass;

    const matchesStatus = status === "" || student.status === status;

    return matchesSearch && matchesClass && matchesStatus;
  });

  // fetch superadmins

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
  console.log("superAdmins", superAdmins);

  const schoolSuperAdmins = superAdmins.filter(
    (admin) => admin.school?.id === Number(id),
  );
  console.log("School Super Admins:", schoolSuperAdmins);

  return (
    <>
      <div className="row g-3 align-items-stretch mt-1">
        {/* Total Students */}
        <div className="col-md-3">
          <div className="card stat-card blue-card h-100">
            <div className="card-body d-flex align-items-center">
              <div className="icon-circle me-3">🎓</div>
              <div>
                <h4 className="mb-0">{schoolStudents.length}</h4>
                <small>Total Students</small>
              </div>
            </div>
            <div className="card-footer text-muted small ">
              {school?.address}
            </div>
          </div>
        </div>

        {/* Super Admin */}
        <div className="col-md-3">
          <div className="card stat-card green-card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <img
                  src="https://i.pravatar.cc/50"
                  className="rounded-circle me-2"
                  alt="admin"
                />
                <div>
                  <h6 className="mb-0">{schoolSuperAdmins[0]?.fullName}</h6>
                  <small>Super Admin</small>
                </div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <small>{schoolSuperAdmins[0]?.email}</small>
              {/* <span className="badge bg-success">📞 +1 123 456 7890</span> */}
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card white-card h-100">
            <div className="card-body d-flex justify-content-between align-items-center text-center">
              {/* Parents */}
              <div className="flex-fill">
                <h5 className="mb-0">
                  <FaUsers className="me-2" size={35} />
                  380
                </h5>
                <small className="text-muted">Parents</small>
              </div>

              {/* Divider */}
              <div className="vr mx-2"></div>

              {/* Staff */}
              <div className="flex-fill">
                <h5 className="mb-0">
                  <FaUserShield className="me-2" size={35} />
                  16
                </h5>
                <small className="text-muted">Staff</small>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="col-md-3">
          <div className="d-flex flex-column gap-3 h-100">
            <button className="btn btn-success w-100 h-100">+ Add User</button>
            <button className="btn btn-outline-secondary w-100 h-100">
              🔑 Reset Password
            </button>
          </div>
        </div>
      </div>

      {/* school information  */}

      <div className="row mt-3">
        {/* LEFT SIDE */}
        <div className="col-md-9 d-flex flex-column">
          {/* TOP LEFT (300px) – SCHOOL INFO */}
          <div className="flex-fill mb-2">
            <div className="card school-info-card h-100 ">
              {/* Header */}
              <div className="card-header d-flex justify-content-between align-items-center bg-light">
                <h6 className="mb-0">School Information</h6>
                <div>
                  <button className="btn btn-primary btn-sm me-2">
                    ✏️ Edit
                  </button>
                  <button className="btn btn-danger btn-sm">🗑 Delete</button>
                </div>
              </div>

              {/* Body */}
              <div className="card-body">
                <div className="row h-100">
                  {/* LEFT INFO */}
                  <div className="col-md-9">
                    <table className="table table-borderless mb-0 info-table">
                      <tbody>
                        <tr>
                          <td className="label">School Name</td>
                          <td>
                            <h6>{school?.schoolName}</h6>
                          </td>
                        </tr>
                        <tr>
                          <td className="label">Address</td>
                          <td>{school?.address}</td>
                        </tr>
                        <tr>
                          <td className="label">Academic Year</td>
                          <td>{school?.academicYear}</td>
                        </tr>
                        <tr>
                          <td className="label">Created Date</td>
                          <td>{school?.createdAt}</td>
                        </tr>
                        <tr>
                          <td className="label">{school?.status}</td>
                          <td>
                            <h6 className="text-success mb-1">Active</h6>
                            <select className="form-select form-select-sm status-select">
                              <option>Active</option>
                              <option>Inactive</option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* RIGHT LOGO */}
                  <div className="col-md-3 d-flex justify-content-center">
                    <div className="logo-box text-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/167/167707.png"
                        alt="School Logo"
                      />
                      <small className="d-block mt-2">School Logo</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM LEFT (200px) – EMPTY / USER TABLE LATER */}
          <div className="flex-fill mt-2">
            {/* You can add User Account Table here later */}

          
            <div className="card mt-3">
              <div className="card-header">
                <h6 className="mb-0">
                  SuperAdmins ({schoolSuperAdmins.length})
                </h6>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-success">
                    <tr>
                      <th>#</th>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone No</th>
                      <th>Status</th>
                      <th>Role</th>
                      <th>Created At</th>
                    </tr>
                  </thead>

                  <tbody>
                    {schoolSuperAdmins.length > 0 ? (
                      schoolSuperAdmins.map((superAdmin, index) => (
                        <tr key={superAdmin.id}>
                          <td>{index + 1}</td>
                          <td>{superAdmin.id}</td>
                          <td>{superAdmin.fullName}</td>
                          <td>{superAdmin.email}</td>
                          <td>{superAdmin.phone}</td>
                          <td>{superAdmin.status}</td>
                          <td>{superAdmin.role}</td>
                           <td>{superAdmin.createdAt}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No SuperAdmins Created Yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-header">
                <div className="row g-2">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Name / Mobile"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <select
                      className="form-select"
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                    >
                      <option value="">All Classes</option>
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
                    </select>
                  </div>

                  <div className="col-md-3">
                    <select
                      className="form-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">All Status</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <button
                      className="btn btn-secondary w-100"
                      onClick={() => {
                        setSearch("");
                        setStudentClass("");
                        setStatus("");
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-header">
                <h6 className="mb-0">
                  Total Students ({filteredStudents.length})
                </h6>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-success">
                    <tr>
                      <th>#</th>
                      <th>Admission No</th>
                      <th>Name</th>
                      <th>Class</th>
                      <th>Academic Year</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student, index) => (
                        <tr key={student.id}>
                          <td>{index + 1}</td>
                          <td>{student.admissionNumber}</td>
                          <td>
                            {student.firstName} {student.middleName}{" "}
                            {student.lastName}
                          </td>
                          <td>{student.studentClass}</td>
                          <td>{student.academicYear}</td>
                          <td>{student.email}</td>
                          <td>{student.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (600px) */}
        <div className="col-md-3 d-flex">
          <div className="card fixed-card w-100 h-100">
            {/* Header */}
            <div
              className="card"
              style={{
                height: "150px",
                background: "linear-gradient(135deg, #dff0fd, #e4edf8)",
              }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <img
                    src="https://i.pravatar.cc/50"
                    className="rounded-circle me-2"
                    alt="admin"
                  />
                  <div>
                    <h6 className="mb-0">Ramesh Sharma</h6>
                    <small>Super Admin</small>
                  </div>
                </div>

                <div className="card-footer">
                  <span>ramesh@gyschool.com</span>
                  <span>+91 9876543210</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="card-body d-flex justify-content-center align-items-center">
              <img src={Man} alt="illustration" className="img-fluid fit-img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolDetailsView;
