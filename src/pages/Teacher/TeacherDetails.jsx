import React, { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

const TeacherDetails = () => {
  const { employeeId } = useParams();
  const { state } = useLocation();
  const { teacherCategory, teacherDepartment, teacherDesignation } =
    useMasters();
  const [teacher, setTeacher] = useState(state);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user.schoolId;

  console.log("schoolID", schoolId);

  console.log("teacher category", teacherCategory);
  console.log("teacher Department", teacherDepartment);
  console.log("teacher Designation", teacherDesignation);

  const normalize = (value) =>
    (value || "")
      .toLowerCase()
      .replace(/[_\s]+/g, "")
      .trim();
  useEffect(() => {
    if (teacher) {
      const department = teacherDepartment.find(
        (item) => normalize(item) === normalize(teacher.department),
      );

      const designation = teacherDesignation.find(
        (item) => normalize(item) === normalize(teacher.designation),
      );

      const category = teacherCategory.find(
        (item) => normalize(item) === normalize(teacher.category),
      );

      setSelectedDepartment(department || "");
      setSelectedDesignation(designation || "");
      setSelectedCategory(category || "");
    }
  }, [teacher, teacherDepartment, teacherDesignation, teacherCategory]);

  // 👇 Helper function yaha add karo
  const formatName = (value) => {
    return value ? value.replaceAll("_", " ") : "";
  };

  useEffect(() => {
    if (!state) {
      axiosInstance
        .get(`/api/teachers/${employeeId}`)
        .then((res) => setTeacher(res.data));
    }
  }, []);
  console.log("teacher in details", teacher);

  const navigate = useNavigate();

  const handleUpdateField = async (field, value) => {
    try {
      await axiosInstance.patch(
        `/api/teachers/field/${teacher.employeeId}`,
        {
          [field]: value,
        },
        {
          params: {
            schoolId,
          },
        },
      );

      setTeacher((prev) => ({
        ...prev,
        [field]: value,
      }));

      alert(`${field} updated successfully`);
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  const downloadTeacherPdf = async (employeeId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const schoolId = user.school.id;

      const response = await axiosInstance.get(
        `/api/teachers/download/${employeeId}`,

        {
          params: {
            schoolId,
          },

          responseType: "blob",
        },
      );

      const file = new Blob([response.data], { type: "application/pdf" });

      const fileURL = window.URL.createObjectURL(file);

      const link = document.createElement("a");

      link.href = fileURL;

      link.download = `Teacher_${employeeId}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.log(error);

      alert("PDF Download Failed");
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
          <strong>Teacher</strong>
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
                Teacher Details
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* teacher photo name */}

      <div className="ms-2 me-2 shadow rounded mt-4 bg-white">
        <div className="card">
          <div className="card-header d-flex flex-column flex-md-row align-items-center">
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              <FaLongArrowAltLeft /> Back
            </button>

            <h6 className="flex-grow-1 text-center mt-2 mt-md-0 mb-0">
              Teacher Profile
            </h6>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-2">
                <div className="">
                  <img
                    src={teacher.photo}
                    alt=""
                    className="img-fluid rounded"
                    style={{
                      maxWidth: "150px",
                      width: "100%",
                      aspectRatio: "1/1",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <h4>
                  {teacher.firstName} {teacher.lastName}
                </h4>
                <h6>Employee Id : {teacher.employeeId}</h6>
                <h6>Mobile No : {teacher.phoneNumber}</h6>
                <h6>Email : {teacher.email}</h6>
                <h6>Employee Type : {teacher.employeeType}</h6>
                <h6>
                  Status:{" "}
                  <span
                    className={`badge ${
                      teacher.status === "Working"
                        ? "bg-success"
                        : teacher.status === "Resign"
                          ? "bg-danger"
                          : teacher.status === "Maternity Leave"
                            ? "bg-warning text-dark"
                            : teacher.status === "Long Leave"
                            ? "bg-info"
                            :"bg-secondary"
                    }`}
                  >
                    {teacher.status}
                  </span>
                </h6>
              </div>
              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="">Department:</label>
                    <select
                      className="form-select"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      <option value="">Select Department</option>

                      {teacherDepartment.map((item) => (
                        <option key={item} value={item}>
                          {formatName(item)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-12">
                    <label htmlFor="">Category</label>
                    <select
                      className="form-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>

                      {teacherCategory.map((item) => (
                        <option key={item} value={item}>
                          {formatName(item)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <label htmlFor="">Designation</label>
                <select
                  className="form-select"
                  value={selectedDesignation}
                  onChange={(e) => setSelectedDesignation(e.target.value)}
                >
                  <option value="">Select Designation</option>

                  {teacherDesignation.map((item) => (
                    <option key={item} value={item}>
                      {formatName(item)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mt-3 ">
              <div className="col-md-12 ">
                <div className="row">
                  <div className="col-12 col-md-4 mb-2">
                    <button
                      className="btn btn-success w-100"
                      onClick={() =>
                        handleUpdateField("department", selectedDepartment)
                      }
                    >
                      Update Department
                    </button>
                  </div>
                  <div className="col-12 col-md-4 mb-2">
                    <button
                      className="btn btn-info w-100"
                      onClick={() =>
                        handleUpdateField("designation", selectedDesignation)
                      }
                    >
                      Update Designation
                    </button>
                  </div>
                  <div className="col-12 col-md-4 mb-2">
                    <button
                      className="btn btn-warning w-100"
                      onClick={() =>
                        handleUpdateField("category", selectedCategory)
                      }
                    >
                      Update Category
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information  */}
      <div className="ms-2 me-2 shadow rounded mt-4 bg-white">
        <div className="card border-0">
          <div className="card-header text-center bg-white">
            <h5 className="mb-0 fw-bold">Personal Information</h5>
          </div>

          <div className="card-body">
            {/* Row 1 */}
            <div className="row mb-3">
              <div className="col-12 col-md-6">
                <h6 className="text-muted mb-1">Gender</h6>
                <p className="fw-semibold mb-0">{teacher.gender}</p>
              </div>

              <div className="col-12 col-md-6 mt-3 mt-md-0">
                <h6 className="text-muted mb-1">Date of Birth</h6>
                <p className="fw-semibold mb-0">{teacher.dob}</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="row mb-3">
              <div className="col-12 col-md-6">
                <h6 className="text-muted mb-1">Phone</h6>
                <p className="fw-semibold mb-0">{teacher.phoneNumber}</p>
              </div>

              <div className="col-12 col-md-6 mt-3 mt-md-0">
                <h6 className="text-muted mb-1">Email</h6>
                <p className="fw-semibold mb-0">{teacher.email}</p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="row">
              <div className="col-12 col-md-6">
                <h6 className="text-muted mb-1">Blood Group</h6>
                <p className="fw-semibold mb-0">{teacher.bloodGroup}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Details  */}
      <div className="ms-2 me-2 shadow rounded mt-4 bg-white">
        <div className="card border-0">
          <div className="card-header text-center bg-white">
            <h5 className="mb-0 fw-bold">Professional Details</h5>
          </div>

          <div className="card-body">
            {/* Row 1 */}
            <div className="row mb-3">
              <div className="col-12 col-md-6">
                <h6 className="text-muted mb-1">Department</h6>
                <p className="fw-semibold mb-0">{teacher.department}</p>
              </div>

              <div className="col-12 col-md-6 mt-3 mt-md-0">
                <h6 className="text-muted mb-1">Designation</h6>
                <p className="fw-semibold mb-0">{teacher.designation}</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="row mb-3">
              <div className="col-12 col-md-6">
                <h6 className="text-muted mb-1">Joining</h6>
                <p className="fw-semibold mb-0">{teacher.doj}</p>
              </div>

              <div className="col-12 col-md-6 mt-3 mt-md-0">
                <h6 className="text-muted mb-1">Teaching Level</h6>
                <p className="fw-semibold mb-0">{teacher.teachingLevel}</p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="row">
              <div className="col-12 col-md-6">
                <h6 className="text-muted mb-1">Status</h6>
                <p className="fw-semibold mb-0">{teacher.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address  */}

      <div className="ms-2 me-2 shadow rounded mt-4 bg-white">
        <div className="card border-0">
          <div className="card-header text-center bg-white">
            <h5 className="mb-0 fw-bold">Address</h5>
          </div>

          <div className="card-body">
            {/* Row 1 */}
            <div className="row mb-3">
              <div className="col-12 col-md-6">
                <h6 className="text-muted mb-1">Permanent Address</h6>
              </div>

              <div className="col-12 col-md-6 mt-3 mt-md-0">
                <p className="fw-semibold mb-0">{teacher.addressLine1}</p>
                <p className="fw-semibold mb-0">
                  {teacher.pincode}, {teacher.city} ,{teacher.state}
                </p>
              </div>
            </div>
            {/* Row 2 */}
            <div className="row mb-3">
              <div className="col-12 col-md-6">
                <h6 className="text-muted mb-1">Current Address</h6>
              </div>

              <div className="col-12 col-md-6 mt-3 mt-md-0">
                <p className="fw-semibold mb-0">{teacher.addressLine1}</p>
                <p className="fw-semibold mb-0">
                  {teacher.pincode}, {teacher.city} ,{teacher.state}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Qualification  */}
      <div className="ms-2 me-2 shadow rounded mt-4 bg-white">
        <div className="card border-0">
          <div className="card-header text-center bg-white">
            <h5 className="mb-0 fw-bold">Qualification Details</h5>
          </div>

          <div className="card-body">
            {/* Row 1 */}
            <div className="row mb-3">
              <div className="col-12 col-md-3">
                <h6 className="text-muted mb-1">Degree</h6>
              </div>

              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <h6 className="text-muted mb-1">University</h6>
              </div>
              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <h6 className="text-muted mb-1">Year</h6>
              </div>
              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <h6 className="text-muted mb-1">Percentage</h6>
              </div>
            </div>
            {/* Row 2 */}
            <div className="row mb-3">
              <div className="col-12 col-md-3">
                <p className="fw-semibold mb-0">{teacher.addressLine1}</p>
              </div>

              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <p className="fw-semibold mb-0">{teacher.pincode}</p>
              </div>
              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <p className="fw-semibold mb-0">{teacher.pincode}</p>
              </div>
              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <p className="fw-semibold mb-0">{teacher.pincode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents  */}
      <div className="ms-2 me-2 shadow rounded mt-4 bg-white">
        <div className="card border-0">
          <div className="card-header text-center bg-white">
            <h5 className="mb-0 fw-bold">Documents</h5>
          </div>

          <div className="card-body">
            {/* Row 1 */}
            <div className="row mb-3">
              <div className="col-12 col-md-3">
                <h6 className="text-muted mb-1">Aadhar Card</h6>
              </div>

              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <h6 className="text-muted mb-1">Pancard</h6>
              </div>
              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <h6 className="text-muted mb-1">Resume</h6>
              </div>
              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <h6 className="text-muted mb-1">Certificates</h6>
              </div>
            </div>
            {/* Row 2 */}
            <div className="row mb-3">
              <div className="col-12 col-md-3">
                <p className="fw-semibold mb-0">{teacher.addressLine1}</p>
              </div>

              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <p className="fw-semibold mb-0">{teacher.pincode}</p>
              </div>
              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <p className="fw-semibold mb-0">{teacher.pincode}</p>
              </div>
              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <p className="fw-semibold mb-0">{teacher.pincode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons  */}
      <div className="ms-2 me-2 mt-4">
        <div className="row ">
          <div className="col-md-3 ">
            <button
              className="btn btn-warning w-100"
              onClick={() =>
                navigate(`/teacher/edit-teacher/${teacher.employeeId}`)
              }
            >
              Edit
            </button>
          </div>
          <div className="col-md-3 ">
            <button className="btn btn-info w-100">Print</button>
          </div>
          <div className="col-md-3 ">
            <button
              className="btn btn-danger w-100"
              onClick={() => downloadTeacherPdf(teacher.employeeId)}
            >
              PDF
            </button>
          </div>
          <div className="col-md-3 ">
            <button className="btn btn-danger w-100">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDetails;
