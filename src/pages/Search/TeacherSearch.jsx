import React, { useState } from "react";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const TeacherSearch = () => {
  const [showInput, setShowInput] = useState(false);
  const [teachers, setTeachers] = useState([]);

  //   filter teachers
  const [filters, setFilters] = useState({
    employeeId: "",
    firstName: "",
    phoneNumber: "",
    email: "",
    deparment: "",
    designation: "",
  });

  //   handle reset
  const handleReset = () => {
    setFilters({
      employeeId: "",
      teacherName: "",
      phone: "",
      email: "",
      deparment: "",
      designation: "",
    });
    setShowInput(false);
  };

  //   onchange

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (!value.trim()) return;

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const schoolId = loggedInUser.school.id;

    try {
      const response = await axiosInstance.get("/api/teachers/search", {
        params: {
          schoolId,

          value: value,
        },
      });

      console.log("response teacher", response.data);

      setTeachers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("Teachers", teachers);
  ``;

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
          <strong>Teacher Search</strong>
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
                Teacher Search
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* Search form  */}

      <div className="ms-2 me-2 shadow bg-white rounded mt-4 ">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header ">Search Teacher</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <label>Employee Id:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="employeeId"
                      value={filters.employeeId}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Teacher Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={filters.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-2 mt-4">
                    <button
                      className="btn  border btn-outline-primary"
                      onClick={() => setShowInput((prev) => !prev)}
                    >
                      {showInput ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
                    </button>
                  </div>
                  <div className="col-md-2 mt-4">
                    <button
                      className="btn btn-outline-danger"
                      onClick={handleReset}
                    >
                      Reset Filters
                    </button>
                  </div>

                  {showInput && (
                    <>
                      {/* search by phone no,email,department  */}
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <label htmlFor="">Phone:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            value={filters.phoneNumber}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="">Email:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={filters.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="">Department:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="department"
                            value={filters.deparment}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* search by designation */}
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <label htmlFor="">Designation:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="designation"
                            value={filters.designation}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* teacher list  */}

      <div className="ms-2 me-2 shadow bg-white rounded mt-4">
        <div className="card">
          <div className="card-header">Employee Details</div>
          <div className="card-body">
            <div className="container-fluid table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th>S.No</th>
                            <th>Employee Id</th>
                            <th>Employee Name</th>
                            <th>Mobile</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                       {teachers.map((teacher,index)=>(
                        <tr key={teacher.id}>
                            <td>{index+1}</td>
                            <td>{teacher.employeeId}</td>
                            <td>{teacher.firstName} {teacher.lastName}</td>
                            <td>{teacher.phoneNumber}</td>
                            <td>{teacher.department}</td>
                            <td>{teacher.designation}</td>
                            <td>{teacher.email}</td>
                        </tr>
                       ))}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherSearch;
