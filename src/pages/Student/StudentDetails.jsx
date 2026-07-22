// import React from 'react'

// const StudentDetails = () => {
//   return (
//     <>

//      {/* Header */}
//       <div
//         className="row shadow-lg"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           height: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <strong>Student Profile</strong>
//         </h6>
//         <nav aria-label="breadcrumb py-2">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                 Home
//               </a>
//             </li>
//             <li className="breadcrumb-item">
//               <a href="#" style={{ textDecoration: "none", color: "black" }}>
//                 Student Profile
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>

//     </>
//   )
// }

// export default StudentDetails

import { useNavigate, useParams } from "react-router-dom";

import schoolImage from "../../assets/icon/schoolImage.webp";
import mother from "../../assets/icon/mother.webp";
import father from "../../assets/icon/father.avif";
import studentImage from "../../assets/icon/studentImage.webp";
import { FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

import { useEffect, useState } from "react";
import axios from "axios";

const StudentDetails = () => {
  const { admissionNumber } = useParams();
  console.log("admission no",admissionNumber);
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);


  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
  if (!user?.schoolId || !token || !admissionNumber) return;

  axios
    .get(
      `http://localhost:8080/api/admissions/school?schoolId=${user.schoolId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      const enrolledStudent = (res.data || []).find(
        (item) =>
          item.status === "ENROLLED" &&
          String(item.admissionNumber) === String(admissionNumber)
      );

      setStudent(enrolledStudent || null);
    })
    .catch(console.error);
}, [user?.schoolId, token, admissionNumber]);


  console.log("Selected student ",student);

  const [showStudent, setShowStudent] = useState(true);
  const [showParent, setShowParent] = useState(false);

  const handleParent = () => {
    setShowParent(true);
    setShowStudent(false);
  };
  const handleStudent = () => {
    setShowParent(false);
    setShowStudent(true);
  };
  //   console.log("Student Image Base64:", student?.studentImage);

  const handleEdit = (admissionNumber) => {
    navigate(`/student/studentEdit/${admissionNumber}`);
  };

  if (!student) {
  return (
    <div className="text-center mt-5">
      <h5>Loading student details...</h5>
    </div>
  );
}


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
          <strong>Student Profile</strong>
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
                Student Profile
              </a>
            </li>
          </ol>
        </nav>
      </div>

      <div
        className="mt-3 ms-2 me-2 pb-2 shadow"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          //   padding: "10px",
        }}
      >
        <img
          src={schoolImage}
          alt=""
          className="w-100 "
          style={{ height: "270px", borderRadius: "10px" }}
        />
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "-80px" }}
        >
          <div
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              border: "5px solid white",
              width: "200px",
              height: "200px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              backgroundColor: "white",
            }}
          >
            <img
              src=""
              alt="student"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end r w-100 px-4 mt-3 pb-3">
          <h5 className="text-uppercase text-center flex-grow-1 m-0 ms-5">
            {/* {student.firstName} {student.lastName} */}
          </h5>
          <button className="btn btn-sm btn-outline-primary ms-3">
            Change Photo
          </button>
        </div>

        <div
          className="row  mx-1  py-2"
          style={{ backgroundColor: "rgb(30, 58, 138)" }}
        >
          <div className="col-md-6 ">
           <button
  className={`btn btn-sm p-2 ${
    student.status === "ENROLLED" ? "bg-info" : "bg-danger"
  }`}
>
  {student.status === "ENROLLED" ? "Studying" : "Dropout"}
</button>

          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <button className="btn btn-sm btn-info p-2" onClick={handleStudent}>
              <FaUser size={20} /> Student Information
            </button>
            <button
              className="btn btn-sm btn-info p-2 ms-2"
              onClick={handleParent}
            >
              <FaUserGroup size={20} /> Parent Information
            </button>
          </div>
        </div>
      </div>

      {showStudent ? (
        <div className="container-fluid p-3">
          <div className="row g-3">
            {/* Basic Info */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-header bg-info text-white">
                  <strong>BASIC INFO</strong>
                </div>
                <div className="card-body shadow">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>
                          {student.firstName} {student.lastName}
                        </td>
                      </tr>
                      <tr>
                        <th>Username</th>
                        <td>{student.studentUsername}</td>
                      </tr>
                      <tr>
                        <th>Admission Number</th>
                        <td>{student.admissionNumber}</td>
                      </tr>
                      <tr>
                        <th>Roll Number</th>
                        <td>{student.rollNo}</td>
                      </tr>
                      <tr>
                        <th>Date of Birth</th>
                        <td>{student.dob}</td>
                      </tr>
                      <tr>
                        <th>Date of Joining</th>
                        <td>{student.today}</td>
                      </tr>
                      <tr>
                        <th>Joining Standard</th>
                        <td>
                          {student.studentClass} {student.section}
                        </td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{student.email}</td>
                      </tr>
                      <tr>
                        <th>Caste/Religion</th>
                        <td>
                          {student.caste} / {student.religion}
                        </td>
                      </tr>
                      <tr>
                        <th>Category</th>
                        <td>{student.category}</td>
                      </tr>
                      <tr>
                        <th>Mother Tongue</th>
                        <td>{student.motherTongue}</td>
                      </tr>
                      <tr>
                        <th>TC No</th>
                        <td>{student.TC}</td>
                      </tr>
                      <tr>
                        <th>Section</th>
                        <td>{student.student.section || "-"}</td>

                      </tr>
                      <tr>
                        <th>Pan No</th>
                        <td>{student.PanCard}</td>
                      </tr>
                      <tr>
                        <th>Apaar Id</th>
                        <td>{student.apaar}</td>
                      </tr>
                      <tr>
                        <th>Gender</th>
                        <td>{student.gender}</td>
                      </tr>
                      <tr>
                        <th>Nationality</th>
                        <td>{student.nationality}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>
                         {student.houseNo},{" "}
                        {student.street}, {student.town}, {student.state} -{" "}
                        {student.zip}
                        </td>
                      </tr>
                      <tr>
                        <th>Adhar Card No</th>
                        <td>{student.aadharNo}</td>
                      </tr>
                      <tr>
                        <th>Blood Group</th>
                        <td>{student.bloodGroup}</td>
                      </tr>
                      <tr>
                        <th>Special Interest</th>
                        <td>{student.specialInterest}</td>
                      </tr>
                      <tr>
                        <th>Sports Skills</th>
                        <td>{student.sportsSkills}</td>
                      </tr>
                      <tr>
                        <th>Extra Activities</th>
                        <td>{student.extraActivites}</td>
                      </tr>
                      <tr>
                        <th>Previous School Details</th>
                        <td>{student.previousSchool}</td>
                      </tr>
                      <tr>
                        <th>Father's Income</th>
                        <td>--</td>
                      </tr>
                      <tr>
                        <th>Mother's Income</th>
                        <td>--</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-warning px-3"
                      onClick={() => handleEdit(student.admissionNumber)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              {/* ID Card Row */}
              <div className="row justify-content-start gap-5 ">
                {/* Front Side of Student ID Card */}
                <div className="col-md-3 mt-3 me-4">
                  <div
                    className="card shadow-sm"
                    style={{
                      width: "240px",
                      height: "400px",
                      borderRadius: "15px",
                      overflow: "hidden",
                      margin: "auto",
                      // backgroundColor: "#f5f5f5",
                      backgroundColor: "#e3f2fd",
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        // background:
                        //   "linear-gradient(to right, #002d62, #ffc107)",
                        background:
                          "linear-gradient(to right, #0d47a1, #82b1ff)",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      <img
                        src="/logo.png"
                        alt="Logo"
                        style={{ height: "50px", marginRight: "10px" }}
                      />
                      <div>
                        <h6 className="mb-0">Iqra Public School</h6>
                        <small>Student ID Card</small>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="card-body text-center p-2 ">
                      <img
                        src=""
                        alt="Student"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          border: "2px solid #000",
                          marginTop: "10px",
                        }}
                      />
                      <h6 className="mt-2 text-uppercase">
                        {student.firstName} {student.lastName}
                      </h6>
                      <p className="mb-1">
                        <strong>DOB:</strong> {student.dob}
                      </p>
                      <p className="mb-1">
                        <strong>Card No:</strong>{" "}
                        {student.admissionNumber || "N/A"}
                      </p>
                      <p className="mb-1">
                        <strong>Issue Date:</strong> {student.today}
                      </p>
                      <p className="mb-1">
                        <strong>Expiry:</strong> August 2026
                      </p>
                      <img
                        src="/barcode.png"
                        alt="Barcode"
                        style={{ width: "150px", marginTop: "10px" }}
                      />
                      <p style={{ fontSize: "12px" }}>5201 9234 0718 4354</p>
                    </div>
                  </div>
                </div>

                {/* Back Side of Student ID Card */}
                <div className="col-md-3 mt-3 ms-5">
                  <div
                    className="card shadow-sm"
                    style={{
                      width: "240px",
                      height: "400px",
                      borderRadius: "15px",
                      overflow: "hidden",
                      margin: "auto",
                      // backgroundColor: "#fff",
                      backgroundColor: "#fff3e0",
                    }}
                  >
                    <div
                      className="card-header text-white text-center"
                      style={{ backgroundColor: "#ef6c00" }}
                    >
                      <strong>Parent & Transport Info</strong>
                    </div>
                    <div className="card-body p-3">
                      <p>
                        <strong>Father's Name:</strong> {student.fatherName}
                      </p>
                      <p>
                        <strong>Mobile No:</strong> {student.fatherMobile}
                      </p>
                      <p>
                        <strong>Address:</strong> {student.houseNo},{" "}
                        {student.street}, {student.town}, {student.state} -{" "}
                        {student.zip}
                      </p>
                      {student.transportRequired === "yes" && (
                        <p>
                          <strong>Transport Route:</strong>{" "}
                          {student.transportRoute || "N/A"}
                        </p>
                      )}

                      {student.transportRequired === "yes" && (
                        <p>
                          <strong>Bus No:</strong> {student.busNumber || "N/A"}
                        </p>
                      )}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "15px",
                          textAlign: "center",
                          width: "100%",
                          fontSize: "12px",
                        }}
                      >
                        <p className="text-muted text-center me-3">
                          If found, please return to school reception.
                        </p>
                        <p className="text-muted">Contact: 123-456-7890</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Class Info */}
            <div className="col-md-6">
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-info text-white">
                  <strong>Class - Session Info</strong>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Academic Year:</strong> {student.academicYear}
                  </p>
                  <p>
                    <strong>Class - Section:</strong> {student.studentClass}
                    -{student.student.section}
                  </p>
                </div>
              </div>

              {/* House Info */}
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-info text-white">
                  <strong>House Info</strong>
                </div>
                <div className="card-body">
                  <p>
                    <strong>House:</strong> {student.house || "Not Assigned"}
                  </p>

                  <div className="d-flex justify-content-end">
                    <button className="btn btn-warning px-3">Add</button>
                  </div>
                </div>
              </div>

              {/* Health Condition Info */}
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-info text-white">
                  <strong>Health Condition Info</strong>
                </div>
                <div className="card-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Health Condition</th>
                        <th scope="col">Emergency Steps</th>
                        <th scope="col">Comments</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-warning px-3">Add</button>
                  </div>
                </div>
              </div>
              {/* Health Condition Info */}
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-info text-white">
                  <strong>Student Emergency Information</strong>
                </div>
                <div className="card-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Relation</th>
                        <th scope="col">Contact No.</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-warning px-3">Add</button>
                  </div>
                </div>
              </div>
              {/* Health Condition Info */}
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-info text-white">
                  <strong>Transportation Information</strong>
                </div>
                <div className="card-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Route Name</th>
                        <th scope="col">Stop Name</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-warning px-3">Add</button>
                  </div>
                </div>
              </div>
              {/* Health Condition Info */}
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-info text-white">
                  <strong>Health Parameter Information</strong>
                </div>
                <div className="card-body">
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th scope="row">Height</th>
                        <td>{student.height}</td>
                      </tr>
                      <tr>
                        <th scope="row">Weight</th>
                        <td>{student.weight}</td>
                      </tr>
                      <tr>
                        <th scope="row">Blood Group</th>
                        <td>{student.bloodGroup}</td>
                      </tr>
                      <tr>
                        <th scope="row">Left Power</th>
                        <td>{student.leftPower}</td>
                      </tr>
                      <tr>
                        <th scope="row">Right Power</th>
                        <td>{student.rightPower}</td>
                      </tr>
                      <tr>
                        <th scope="row">Oral Hygiene</th>
                        <td>{student.oralHygiene}</td>
                      </tr>
                      <tr>
                        <th scope="row">Dental Hygiene</th>
                        <td>{student.dentalHygiene}</td>
                      </tr>
                      <tr>
                        <th scope="row">Special Ailments</th>
                        <td>{student.specialAilments}</td>
                      </tr>
                      <tr>
                        <th scope="row">Capture Date</th>
                        <td>{student.captureDates}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-warning px-3">Add</button>
                  </div>
                </div>
              </div>
              {/* Health Condition Info */}
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-info text-white">
                  <strong>Undertaking/Special Needs Information</strong>
                </div>
                <div className="card-body">
                  <table class="table border">
                    <thead>
                      <tr>
                        <th scope="row">UnderTaking:</th>
                      </tr>
                      <tr>
                        <th scope="row">Special Needs</th>
                      </tr>
                      <tr>
                        <th scope="row">Special Need Documents</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-warning px-3">Add</button>
                  </div>
                </div>
              </div>
              {/* Health Condition Info */}
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-info text-white">
                  <strong>Document Download</strong>
                </div>
                <div className="card-body ">
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-warning px-3">Upload</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        //  parents information

        <div className="container-fluid p-3">
          <div className="row g-3">
            {/* Basic Info */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-header bg-info text-white">
                  <strong>FATHER INFO</strong>
                </div>
                <div className="card-body shadow">
                  <img
                    src={father}
                    alt=""
                    style={{ height: "100px", width: "100px" }}
                  />
                  <table className="table ">
                    <tbody>
                      <tr>
                        <th>Username</th>
                        <td>{student.fatherUsername}</td>
                      </tr>
                      <tr>
                        <th>Father's Name</th>
                        <td>{student.fatherName}</td>
                      </tr>
                      <tr>
                        
                      </tr>
                      <tr>
                        <th>Father Mobile No</th>
                        <td>{student.fatherMobile}</td>
                      </tr>
                      <tr>
                        <th>Father Email</th>
                        <td>{student.fatherEmail}</td>
                      </tr>
                      <tr>
                        <th>Aadhar No.</th>
                        <td>{student.fatherAadhar}</td>
                      </tr>
                      <tr>
                        <th>Pan No.</th>
                        <td>{student.standardSection}</td>
                      </tr>
                      <tr>
                        <th>Contact No</th>
                        <td>{student.fatherMobile}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>
                          {student.town} / {student.state}
                        </td>
                      </tr>
                      <tr>
                        <th>Pincode</th>
                        <td>{student.zip}</td>
                      </tr>
                      <tr>
                        <th>State</th>
                        <td>{student.state}</td>
                      </tr>
                      <tr>
                        <th>Parent name on fee Receipt</th>
                        <td>{student.fatherName}</td>
                      </tr>
                      <tr>
                        <th>Single Parent</th>
                        <td>No</td>
                      </tr>
                      <tr>
                        <th>Education</th>
                        <td>{student.fatherEducation}</td>
                      </tr>
                      <tr>
                        <th>Occupation</th>
                        <td>{student.fatherOccupation}</td>
                      </tr>
                      <tr>
                        <th>Designation</th>
                        <td></td>
                      </tr>
                      <tr>
                        <th>Office Name:</th>
                        <td>{student.fatherOrganization}</td>
                      </tr>
                      <tr>
                        <th>Office Address</th>
                        <td>{student.fatherOrganizationAddress}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="d-flex justify-content-end">
                    <button className="btn btn-warning px-3">Edit</button>
                  </div>
                </div>
              </div>
            </div>

            {/* mother information */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-header bg-info text-white">
                  <strong>MOTHER INFO</strong>
                </div>
                <div className="card-body shadow">
                  <img
                    src={mother}
                    alt=""
                    style={{ height: "100px", width: "100px" }}
                  />
                  <table className="table ">
                    <tbody>
                      <tr>
                        <th>Username</th>
                        <td>{student.motherUsername}</td>
                      </tr>
                      <tr>
                        <th>Mother's Name</th>
                        <td>{student.motherName}</td>
                      </tr>

                      <tr>
                        <th>Mother's Mobile No</th>
                        <td>{student.motherMobile}</td>
                      </tr>
                      <tr>
                        <th>Mother Email</th>
                        <td>{student.motherEmail}</td>
                      </tr>
                      <tr>
                        <th>Aadhar No.</th>
                        <td>{student.motherAadhar}</td>
                      </tr>
                      <tr>
                        <th>Pan No.</th>
                        <td>{student.standardSection}</td>
                      </tr>
                      <tr>
                        <th>Contact No</th>
                        <td>{student.motherMobile}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>
                          {student.town} / {student.state}
                        </td>
                      </tr>
                      <tr>
                        <th>Pincode</th>
                        <td>{student.zip}</td>
                      </tr>
                      <tr>
                        <th>State</th>
                        <td>{student.state}</td>
                      </tr>
                      <tr>
                        <th>Parent name on fee Receipt</th>
                        <td>{student.motherName}</td>
                      </tr>
                      <tr>
                        <th>Single Parent</th>
                        <td>No</td>
                      </tr>
                      <tr>
                        <th>Education</th>
                        <td>{student.motherEducation}</td>
                      </tr>
                      <tr>
                        <th>Occupation</th>
                        <td>{student.motherOccupation}</td>
                      </tr>
                      <tr>
                        <th>Designation</th>
                        <td>{student.gender}</td>
                      </tr>
                      <tr>
                        <th>Office Name:</th>
                        <td>{student.motherOrganization}</td>
                      </tr>
                      <tr>
                        <th>Office Address</th>
                        <td>{student.motherOrganizationAddress}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="d-flex justify-content-end">
                    <button className="btn btn-warning px-3">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentDetails;
