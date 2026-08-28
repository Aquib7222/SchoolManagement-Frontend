// import { useNavigate, useParams } from "react-router-dom";

// import schoolImage from "../../assets/icon/schoolImage.webp";
// import mother from "../../assets/icon/mother.webp";
// import father from "../../assets/icon/father.avif";
// import studentImage from "../../assets/icon/studentImage.webp";
// import { FaUser } from "react-icons/fa";
// import { FaUserGroup } from "react-icons/fa6";

// import { useEffect, useState } from "react";

// import EditStudentModal from "./EditStudentModal";
// import axios from "../../api/axiosInstance";

// const StudentDetails = () => {
//   const { admissionNumber } = useParams();
//   console.log("admission no", admissionNumber);
//   const navigate = useNavigate();
//   const [student, setStudent] = useState(null);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editStudent, setEditStudent] = useState({});
//   const [photo, setPhoto] = useState(null);

//  useEffect(() => {
//   if (!admissionNumber || !token) return;

//   axios
//     .get(
//       `/api/students/${admissionNumber}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//     .then((res) => {
//       setStudent(res.data);
//       setEditStudent(res.data);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }, [admissionNumber, token]);

//   console.log("Selected student ", student);

//   const [showStudent, setShowStudent] = useState(true);
//   const [showParent, setShowParent] = useState(false);

//   const handleParent = () => {
//     setShowParent(true);
//     setShowStudent(false);
//   };
//   const handleStudent = () => {
//     setShowParent(false);
//     setShowStudent(true);
//   };
//   //   console.log("Student Image Base64:", student?.studentImage);

//   console.log(editStudent);
//  const handleUpdate = async () => {
//   try {
//     const formData = new FormData();

//     formData.append(
//       "student",
//       new Blob([JSON.stringify(editStudent)], {
//         type: "application/json",
//       })
//     );

//     if (photo) {
//       formData.append("photo", photo);
//     }

//     console.log("Edit Student Data:", editStudent);
//     console.log("Edit Student JSON:", JSON.stringify(editStudent, null, 2));

//     const response = await axios.put(
//       `/api/students/${editStudent.admissionNumber}`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     // Main page ka data update karo
//     setStudent(response.data);

//     // Modal state bhi update karo
//     setEditStudent(response.data);

//     setShowEditModal(false);

//     alert("Student Updated Successfully");
//   } catch (error) {
//     console.log(error);
//     alert("Update Failed");
//   }
// };
//   if (!student) {
//     return (
//       <div className="text-center mt-5">
//         <h5>Loading student details...</h5>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Header */}
//       <div
//         className="row shadow-lg ms-2 me-2"
//         style={{
//           backgroundColor: "white",

//           height: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <strong>Student </strong>
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

//       {/* school image and student photo  */}
//       <div className="rounded mt-3 pb-2 shadow bg-white">
//         <img
//           src={schoolImage}
//           alt=""
//           className="w-100 "
//           style={{ height: "170px", borderRadius: "10px" }}
//         />
//         <div
//           className="d-flex justify-content-center"
//           style={{ marginTop: "-80px" }}
//         >
//           <div
//             style={{
//               borderRadius: "50%",
//               overflow: "hidden",
//               border: "5px solid white",
//               width: "200px",
//               height: "200px",
//               boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
//               backgroundColor: "white",
//             }}
//           >
//             <img
//               src=""
//               alt="student"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           </div>
//         </div>
//         <div className="d-flex justify-content-end r w-100 px-4 mt-3 pb-3">
//           <h5 className="text-uppercase text-center flex-grow-1 m-0 ms-5">
//             {/* {student.firstName} {student.lastName} */}
//           </h5>
//           <button className="btn btn-sm btn-outline-primary ms-3">
//             Change Photo
//           </button>
//         </div>

//         <div
//           className="row  mx-1  py-2"
//           style={{ backgroundColor: "rgb(30, 58, 138)" }}
//         >
//           <div className="col-md-6 ">
//             <button
//               className={`btn btn-sm p-2 text-white ${
//                 student.status === "ACTIVE" ? "bg-success" : "bg-danger"
//               }`}
//             >
//               {student.status === "ACTIVE" ? "Studying" : "Dropout"}
//             </button>
//           </div>
//           <div className="col-md-6 d-flex justify-content-end">
//             <button className="btn btn-sm btn-info p-2" onClick={handleStudent}>
//               <FaUser size={20} />{" "}
//               <span className="text-white">Student Information</span>
//             </button>
//             <button
//               className="btn btn-sm btn-info p-2 ms-2"
//               onClick={handleParent}
//             >
//               <FaUserGroup size={20} />{" "}
//               <span className="text-white">Parent Information</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {showStudent ? (
//         <div className="mt-3 ">
//           <div className="row g-3">
//             {/* Basic Info */}
//             <div className="col-md-6">
//               <div className="card shadow">
//                 <div className="card-header bg-info text-white">
//                   <strong>BASIC INFO</strong>
//                 </div>
//                 <div className="card-body shadow">
//                   <table className="table table-bordered">
//                     <tbody>
//                       <tr>
//                         <th>Name</th>
//                         <td>
//                           {student.firstName} {student.lastName}
//                         </td>
//                       </tr>
//                       <tr>
//                         <th>Username</th>
//                         <td>{student.studentUsername}</td>
//                       </tr>
//                       <tr>
//                         <th>Admission Number</th>
//                         <td>{student.admissionNumber}</td>
//                       </tr>
//                       <tr>
//                         <th>Roll Number</th>
//                         <td>{student.rollNo}</td>
//                       </tr>
//                       <tr>
//                         <th>Date of Birth</th>
//                         <td>{student.dob}</td>
//                       </tr>
//                       <tr>
//                         <th>Date of Joining</th>
//                         <td>{student.today}</td>
//                       </tr>
//                       <tr>
//                         <th>Joining Standard</th>
//                         <td>
//                           {student.studentClass} {student.section}
//                         </td>
//                       </tr>
//                       <tr>
//                         <th>Email</th>
//                         <td>{student.email}</td>
//                       </tr>
//                       <tr>
//                         <th>Caste/Religion</th>
//                         <td>
//                           {student.caste} / {student.religion}
//                         </td>
//                       </tr>
//                       <tr>
//                         <th>Category</th>
//                         <td>{student.category}</td>
//                       </tr>
//                       <tr>
//                         <th>Mother Tongue</th>
//                         <td>{student.motherTongue}</td>
//                       </tr>
//                       <tr>
//                         <th>TC No</th>
//                         <td>{student.TC}</td>
//                       </tr>
//                       <tr>
//                         <th>Section</th>
//                         <td>{student.section || "-"}</td>
//                       </tr>
//                       <tr>
//                         <th>Pan No</th>
//                         <td>{student.PanCard}</td>
//                       </tr>
//                       <tr>
//                         <th>Apaar Id</th>
//                         <td>{student.apaar}</td>
//                       </tr>
//                       <tr>
//                         <th>Gender</th>
//                         <td>{student.gender}</td>
//                       </tr>
//                       <tr>
//                         <th>Nationality</th>
//                         <td>{student.nationality}</td>
//                       </tr>
//                       <tr>
//                         <th>Address</th>
//                         <td>
//                           {student.houseNo}, {student.street}, {student.town},{" "}
//                           {student.state} - {student.zip}
//                         </td>
//                       </tr>
//                       <tr>
//                         <th>Adhar Card No</th>
//                         <td>{student.aadharNo}</td>
//                       </tr>
//                       <tr>
//                         <th>Blood Group</th>
//                         <td>{student.bloodGroup}</td>
//                       </tr>
//                       <tr>
//                         <th>Special Interest</th>
//                         <td>{student.specialInterest}</td>
//                       </tr>
//                       <tr>
//                         <th>Sports Skills</th>
//                         <td>{student.sportsSkills}</td>
//                       </tr>
//                       <tr>
//                         <th>Extra Activities</th>
//                         <td>{student.extraActivites}</td>
//                       </tr>
//                       <tr>
//                         <th>Previous School Details</th>
//                         <td>{student.previousSchool}</td>
//                       </tr>
//                       <tr>
//                         <th>Father's Income</th>
//                         <td>--</td>
//                       </tr>
//                       <tr>
//                         <th>Mother's Income</th>
//                         <td>--</td>
//                       </tr>
//                     </tbody>
//                   </table>

//                   <div className="d-flex justify-content-end">
//                     <button
//                       className="btn btn-warning px-3"
//                       onClick={() => {
//                         setEditStudent(student);
//                         setShowEditModal(true);
//                       }}
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* ID Card Row */}
//             </div>

//             {/* Class Info */}
//             <div className="col-md-6">
//               <div className="card shadow mb-3">
//                 <div className="card-header bg-info text-white">
//                   <strong>Class - Session Info</strong>
//                 </div>
//                 <div className="card-body">
//                   <p>
//                     <strong>Academic Year:</strong> {student.academicYear}
//                   </p>
//                   <p>
//                     <strong>Class - Section:</strong> {student.studentClass}-
//                     {student.section}
//                   </p>
//                 </div>
//               </div>

//               {/* House Info */}
//               <div className="card shadow mb-3">
//                 <div className="card-header bg-info text-white">
//                   <strong>House Info</strong>
//                 </div>
//                 <div className="card-body">
//                   <p>
//                     <strong>House:</strong> {student.house || "Not Assigned"}
//                   </p>

//                   <div className="d-flex justify-content-end">
//                     <button className="btn btn-warning px-3">Add</button>
//                   </div>
//                 </div>
//               </div>

//               {/* Health Condition Info */}
//               <div className="card shadow mb-3">
//                 <div className="card-header bg-info text-white">
//                   <strong>Health Condition Info</strong>
//                 </div>
//                 <div className="card-body">
//                   <table class="table">
//                     <thead>
//                       <tr>
//                         <th scope="col">Health Condition</th>
//                         <th scope="col">Emergency Steps</th>
//                         <th scope="col">Comments</th>
//                         <th scope="col">Action</th>
//                       </tr>
//                     </thead>
//                   </table>
//                   <div className="d-flex justify-content-end">
//                     <button className="btn btn-warning px-3">Add</button>
//                   </div>
//                 </div>
//               </div>
//               {/* Health Condition Info */}
//               <div className="card shadow mb-3">
//                 <div className="card-header bg-info text-white">
//                   <strong>Student Emergency Information</strong>
//                 </div>
//                 <div className="card-body">
//                   <table class="table">
//                     <thead>
//                       <tr>
//                         <th scope="col">Name</th>
//                         <th scope="col">Relation</th>
//                         <th scope="col">Contact No.</th>
//                       </tr>
//                     </thead>
//                   </table>
//                   <div className="d-flex justify-content-end">
//                     <button className="btn btn-warning px-3">Add</button>
//                   </div>
//                 </div>
//               </div>
//               {/* Health Condition Info */}
//               <div className="card shadow mb-3">
//                 <div className="card-header bg-info text-white">
//                   <strong>Transportation Information</strong>
//                 </div>
//                 <div className="card-body">
//                   <table class="table">
//                     <thead>
//                       <tr>
//                         <th scope="col">Route Name</th>
//                         <th scope="col">Stop Name</th>
//                       </tr>
//                     </thead>
//                   </table>
//                   <div className="d-flex justify-content-end">
//                     <button className="btn btn-warning px-3">Add</button>
//                   </div>
//                 </div>
//               </div>
//               {/* Health Condition Info */}
//               <div className="card shadow mb-3">
//                 <div className="card-header bg-info text-white">
//                   <strong>Health Parameter Information</strong>
//                 </div>
//                 <div className="card-body">
//                   <table class="table table-bordered">
//                     <tbody>
//                       <tr>
//                         <th scope="row">Height</th>
//                         <td>{student.height}</td>
//                       </tr>
//                       <tr>
//                         <th scope="row">Weight</th>
//                         <td>{student.weight}</td>
//                       </tr>
//                       <tr>
//                         <th scope="row">Blood Group</th>
//                         <td>{student.bloodGroup}</td>
//                       </tr>
//                       <tr>
//                         <th scope="row">Left Power</th>
//                         <td>{student.leftPower}</td>
//                       </tr>
//                       <tr>
//                         <th scope="row">Right Power</th>
//                         <td>{student.rightPower}</td>
//                       </tr>
//                       <tr>
//                         <th scope="row">Oral Hygiene</th>
//                         <td>{student.oralHygiene}</td>
//                       </tr>
//                       <tr>
//                         <th scope="row">Dental Hygiene</th>
//                         <td>{student.dentalHygiene}</td>
//                       </tr>
//                       <tr>
//                         <th scope="row">Special Ailments</th>
//                         <td>{student.specialAilments}</td>
//                       </tr>
//                       <tr>
//                         <th scope="row">Capture Date</th>
//                         <td>{student.captureDates}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <div className="d-flex justify-content-end">
//                     <button className="btn btn-warning px-3">Add</button>
//                   </div>
//                 </div>
//               </div>
//               {/* Health Condition Info */}
//               <div className="card shadow mb-3">
//                 <div className="card-header bg-info text-white">
//                   <strong>Undertaking/Special Needs Information</strong>
//                 </div>
//                 <div className="card-body">
//                   <table class="table border">
//                     <thead>
//                       <tr>
//                         <th scope="row">UnderTaking:</th>
//                       </tr>
//                       <tr>
//                         <th scope="row">Special Needs</th>
//                       </tr>
//                       <tr>
//                         <th scope="row">Special Need Documents</th>
//                       </tr>
//                     </thead>
//                   </table>
//                   <div className="d-flex justify-content-end">
//                     <button className="btn btn-warning px-3">Add</button>
//                   </div>
//                 </div>
//               </div>
//               {/* Health Condition Info */}
//               <div className="card shadow mb-3">
//                 <div className="card-header bg-info text-white">
//                   <strong>Document Download</strong>
//                 </div>
//                 <div className="card-body ">
//                   <div className="d-flex justify-content-end">
//                     <button className="btn btn-warning px-3">Upload</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         //  parents information

//         <div className="mt-3">
//           <div className="row g-3">
//             {/* Basic Info */}
//             <div className="col-md-6">
//               <div className="card shadow">
//                 <div className="card-header bg-info text-white">
//                   <strong>FATHER INFO</strong>
//                 </div>
//                 <div className="card-body shadow">
//                   <img
//                     src={father}
//                     alt=""
//                     style={{ height: "100px", width: "100px" }}
//                   />
//                   <table className="table ">
//                     <tbody>
//                       <tr>
//                         <th>Username</th>
//                         <td>{student.fatherUsername}</td>
//                       </tr>
//                       <tr>
//                         <th>Father's Name</th>
//                         <td>{student.fatherName}</td>
//                       </tr>
//                       <tr></tr>
//                       <tr>
//                         <th>Father Mobile No</th>
//                         <td>{student.mobile}</td>
//                       </tr>
//                       <tr>
//                         <th>Father Email</th>
//                         <td>{student.fatherEmail}</td>
//                       </tr>
//                       <tr>
//                         <th>Aadhar No.</th>
//                         <td>{student.fatherAadhar}</td>
//                       </tr>
//                       <tr>
//                         <th>Pan No.</th>
//                         <td>{student.standardSection}</td>
//                       </tr>
//                       <tr>
//                         <th>Contact No</th>
//                         <td>{student.mobile}</td>
//                       </tr>
//                       <tr>
//                         <th>Address</th>
//                         <td>
//                           {student.town} / {student.state}
//                         </td>
//                       </tr>
//                       <tr>
//                         <th>Pincode</th>
//                         <td>{student.zip}</td>
//                       </tr>
//                       <tr>
//                         <th>State</th>
//                         <td>{student.state}</td>
//                       </tr>
//                       <tr>
//                         <th>Parent name on fee Receipt</th>
//                         <td>{student.fatherName}</td>
//                       </tr>
//                       <tr>
//                         <th>Single Parent</th>
//                         <td>No</td>
//                       </tr>
//                       <tr>
//                         <th>Education</th>
//                         <td>{student.fatherEducation}</td>
//                       </tr>
//                       <tr>
//                         <th>Occupation</th>
//                         <td>{student.fatherOccupation}</td>
//                       </tr>
//                       <tr>
//                         <th>Designation</th>
//                         <td></td>
//                       </tr>
//                       <tr>
//                         <th>Office Name:</th>
//                         <td>{student.fatherOrganization}</td>
//                       </tr>
//                       <tr>
//                         <th>Office Address</th>
//                         <td>{student.fatherOrganizationAddress}</td>
//                       </tr>
//                     </tbody>
//                   </table>

//                   <div className="d-flex justify-content-end">
//                     <button className="btn btn-warning px-3">Edit</button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* mother information */}
//             <div className="col-md-6">
//               <div className="card shadow">
//                 <div className="card-header bg-info text-white">
//                   <strong>MOTHER INFO</strong>
//                 </div>
//                 <div className="card-body shadow">
//                   <img
//                     src={mother}
//                     alt=""
//                     style={{ height: "100px", width: "100px" }}
//                   />
//                   <table className="table ">
//                     <tbody>
//                       <tr>
//                         <th>Username</th>
//                         <td>{student.motherUsername}</td>
//                       </tr>
//                       <tr>
//                         <th>Mother's Name</th>
//                         <td>{student.motherName}</td>
//                       </tr>

//                       <tr>
//                         <th>Mother's Mobile No</th>
//                         <td>{student.motherMobile}</td>
//                       </tr>
//                       <tr>
//                         <th>Mother Email</th>
//                         <td>{student.motherEmail}</td>
//                       </tr>
//                       <tr>
//                         <th>Aadhar No.</th>
//                         <td>{student.motherAadhar}</td>
//                       </tr>
//                       <tr>
//                         <th>Pan No.</th>
//                         <td>{student.standardSection}</td>
//                       </tr>
//                       <tr>
//                         <th>Contact No</th>
//                         <td>{student.motherMobile}</td>
//                       </tr>
//                       <tr>
//                         <th>Address</th>
//                         <td>
//                           {student.town} / {student.state}
//                         </td>
//                       </tr>
//                       <tr>
//                         <th>Pincode</th>
//                         <td>{student.zip}</td>
//                       </tr>
//                       <tr>
//                         <th>State</th>
//                         <td>{student.state}</td>
//                       </tr>
//                       <tr>
//                         <th>Parent name on fee Receipt</th>
//                         <td>{student.motherName}</td>
//                       </tr>
//                       <tr>
//                         <th>Single Parent</th>
//                         <td>No</td>
//                       </tr>
//                       <tr>
//                         <th>Education</th>
//                         <td>{student.motherEducation}</td>
//                       </tr>
//                       <tr>
//                         <th>Occupation</th>
//                         <td>{student.motherOccupation}</td>
//                       </tr>
//                       <tr>
//                         <th>Designation</th>
//                         <td>{student.gender}</td>
//                       </tr>
//                       <tr>
//                         <th>Office Name:</th>
//                         <td>{student.motherOrganization}</td>
//                       </tr>
//                       <tr>
//                         <th>Office Address</th>
//                         <td>{student.motherOrganizationAddress}</td>
//                       </tr>
//                     </tbody>
//                   </table>

//                   <div className="d-flex justify-content-end">
//                     <button className="btn btn-warning px-3">Edit</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}


//       {/* modal  */}

//       <EditStudentModal
//     show={showEditModal}
//     student={editStudent}
//     setStudent={setEditStudent}
//     onClose={() => setShowEditModal(false)}
//     onSave={handleUpdate}
// />
//     </>
//   );
// };

// export default StudentDetails;



import { useNavigate, useParams } from "react-router-dom";

import schoolImage from "../../assets/icon/schoolImage.webp";
import mother from "../../assets/icon/mother.webp";
import father from "../../assets/icon/father.avif";
import { FaUser, FaArrowLeft, FaEdit } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { useEffect, useState } from "react";

import EditStudentModal from "./EditStudentModal";
import axios from "../../api/axiosInstance";

const StudentDetails = () => {
  const { admissionNumber } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editStudent, setEditStudent] = useState({});
  const [photo, setPhoto] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!admissionNumber || !token) return;

    axios
      .get(`/api/students/${admissionNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStudent(res.data);
        setEditStudent(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [admissionNumber, token]);

  const [showStudent, setShowStudent] = useState(true);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append(
        "student",
        new Blob([JSON.stringify(editStudent)], {
          type: "application/json",
        })
      );

      if (photo) {
        formData.append("photo", photo);
      }

      const response = await axios.put(
        `/api/students/${editStudent.admissionNumber}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudent(response.data);
      setEditStudent(response.data);
      setShowEditModal(false);

      alert("Student Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  if (!student) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <span className="ms-3 text-muted">
          Loading student profile...
        </span>
      </div>
    );
  }

  const fullName = `${student.firstName || ""} ${
    student.lastName || ""
  }`.trim();

  const avatar = `https://ui-avatars.com/api/?background=1e3a8a&color=fff&size=200&bold=true&name=${encodeURIComponent(
    fullName
  )}`;

  const InfoRow = ({ label, value }) => (
    <div className="row border-bottom py-2">
      <div className="col-sm-5 fw-semibold text-muted small">
        {label}
      </div>

      <div className="col-sm-7 fw-medium text-dark">
        {value || "-"}
      </div>
    </div>
  );

  const SectionCard = ({ title, children, action }) => (
    <div className="card border-0 shadow rounded-4 mb-3 overflow-hidden">
      <div
        className="card-header border-0 text-white py-3 px-3"
        style={{
          background:
            "linear-gradient(135deg, #1e3a8a, #2563eb)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold">{title}</h6>

          {action && action}
        </div>
      </div>

      <div className="card-body">{children}</div>
    </div>
  );

  return (
    <>
      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="bg-white rounded-4 shadow p-3 mb-3 mt-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h5 className="fw-bold text-primary mb-1">
              Student Profile
            </h5>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <span
                    className="text-muted"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                  >
                    Home
                  </span>
                </li>

                <li className="breadcrumb-item active">
                  Student Profile
                </li>
              </ol>
            </nav>
          </div>

          <button
            className="btn btn-outline-primary rounded-3 px-3"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" />
            Back
          </button>
        </div>
      </div>

      {/* =========================================================
          PROFILE HERO
      ========================================================= */}

      <div className="card border-0 shadow rounded-4 overflow-hidden mb-3 ">
        <div
          style={{
            height: "170px",
            background:
              "linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb)",
            position: "relative",
          }}
        >
          <img
            src={schoolImage}
            alt="School"
            className="w-100 h-100"
            style={{
              objectFit: "cover",
              opacity: 0.2,
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(15,23,42,.8), rgba(37,99,235,.5))",
            }}
          />

          <div
            className="position-absolute text-white"
            style={{
              left: "30px",
              top: "30px",
            }}
          >
            <small className="opacity-75">
              STUDENT PROFILE
            </small>

            <h4 className="fw-bold mb-1 mt-1">
              {fullName}
            </h4>

            <span className="badge bg-light text-primary">
              {student.admissionNumber}
            </span>
          </div>
        </div>

        {/* Profile Bottom */}

        <div className="px-4 pb-3 ">
          <div
            className="d-flex align-items-end flex-wrap"
            // style={{ marginTop: "-65px" }}
          >
            <div
              className="rounded-circle bg-white p-1 shadow"
              style={{
                width: "135px",
                height: "135px",
              }}
            >
              <img
                src={student.studentImage || avatar}
                alt={fullName}
                className="rounded-circle w-100 h-100"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="ms-3 mb-2 flex-grow-1">
              <h5 className="fw-bold mb-1">
                {fullName}
              </h5>

              <div className="text-muted small">
                {student.studentUsername || "Student"}
              </div>
            </div>

            <div className="mb-2">
              <span
                className={`badge rounded-pill px-3 py-2 ${
                  student.status === "ACTIVE"
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                <span className="me-1">●</span>
                {student.status === "ACTIVE"
                  ? "Studying"
                  : "Dropout"}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Navigation */}

        <div className="border-top px-3 py-2">
          <div className="d-flex flex-wrap gap-2">
            <button
              className={`btn rounded-3 px-3 ${
                showStudent
                  ? "btn-primary"
                  : "btn-light text-primary"
              }`}
              onClick={() => setShowStudent(true)}
            >
              <FaUser className="me-2" />
              Student Information
            </button>

            <button
              className={`btn rounded-3 px-3 ${
                !showStudent
                  ? "btn-primary"
                  : "btn-light text-primary"
              }`}
              onClick={() => setShowStudent(false)}
            >
              <FaUserGroup className="me-2" />
              Parent Information
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          STUDENT INFORMATION
      ========================================================= */}

      {showStudent ? (
        <div className="row g-3">
          {/* BASIC INFO */}

          <div className="col-lg-6">
            <SectionCard
              title="Basic Information"
              action={
                <button
                  className="btn btn-sm btn-light text-primary rounded-3"
                  onClick={() => {
                    setEditStudent(student);
                    setShowEditModal(true);
                  }}
                >
                  <FaEdit className="me-1" />
                  Edit
                </button>
              }
            >
              <InfoRow
                label="Full Name"
                value={fullName}
              />

              <InfoRow
                label="Username"
                value={student.studentUsername}
              />

              <InfoRow
                label="Admission Number"
                value={student.admissionNumber}
              />

              <InfoRow
                label="Roll Number"
                value={student.roll_number}
              />

              <InfoRow
                label="Date of Birth"
                value={student.dob}
              />

              <InfoRow
                label="Date of Joining"
                value={student.today}
              />

              <InfoRow
                label="Joining Standard"
                value={`${student.studentClass || "-"} ${
                  student.section || ""
                }`}
              />

              <InfoRow
                label="Email"
                value={student.email}
              />

              <InfoRow
                label="Gender"
                value={student.gender}
              />

              <InfoRow
                label="Category"
                value={student.category}
              />

              <InfoRow
                label="Caste / Religion"
                value={`${student.caste || "-"} / ${
                  student.religion || "-"
                }`}
              />

              <InfoRow
                label="Mother Tongue"
                value={student.motherTongue}
              />

              <InfoRow
                label="Nationality"
                value={student.nationality}
              />

              <InfoRow
                label="Section"
                value={student.section}
              />

              <InfoRow
                label="TC Number"
                value={student.TC}
              />

              <InfoRow
                label="PAN Number"
                value={student.PanCard}
              />

              <InfoRow
                label="APAAR ID"
                value={student.apaar}
              />

              <InfoRow
                label="Aadhar Number"
                value={student.aadharNo}
              />

              <InfoRow
                label="Blood Group"
                value={student.bloodGroup}
              />

              <InfoRow
                label="Address"
                value={`${student.houseNo || ""}, ${
                  student.street || ""
                }, ${student.town || ""}, ${
                  student.state || ""
                } - ${student.zip || ""}`}
              />
            </SectionCard>
          </div>

          {/* RIGHT SIDE */}

          <div className="col-lg-6">
            {/* CLASS */}

            <SectionCard title="Class & Session">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="bg-light rounded-4 p-3">
                    <small className="text-muted">
                      Academic Year
                    </small>

                    <h6 className="fw-bold text-primary mb-0 mt-1">
                      {student.academicYear || "-"}
                    </h6>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="bg-light rounded-4 p-3">
                    <small className="text-muted">
                      Class / Section
                    </small>

                    <h6 className="fw-bold text-primary mb-0 mt-1">
                      {student.studentClass || "-"} /{" "}
                      {student.section || "-"}
                    </h6>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* HOUSE */}

            <SectionCard
              title="House Information"
              action={
                <button className="btn btn-sm btn-light text-primary rounded-3">
                  Add
                </button>
              }
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">
                    House
                  </small>

                  <h6 className="fw-bold mb-0 mt-1">
                    {student.house || "Not Assigned"}
                  </h6>
                </div>

                <div
                  className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                  }}
                >
                  🏠
                </div>
              </div>
            </SectionCard>

            {/* HEALTH CONDITION */}

            <SectionCard
              title="Health Condition"
              action={
                <button className="btn btn-sm btn-light text-primary rounded-3">
                  Add
                </button>
              }
            >
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Condition</th>
                      <th>Emergency Steps</th>
                      <th>Comments</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-3">
                        No health condition added
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            {/* EMERGENCY */}

            <SectionCard
              title="Emergency Information"
              action={
                <button className="btn btn-sm btn-light text-primary rounded-3">
                  Add
                </button>
              }
            >
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Relation</th>
                      <th>Contact</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-3">
                        No emergency contact added
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            {/* TRANSPORTATION */}

            <SectionCard
              title="Transportation Information"
              action={
                <button className="btn btn-sm btn-light text-primary rounded-3">
                  Add
                </button>
              }
            >
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Route Name</th>
                      <th>Stop Name</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td colSpan="2" className="text-center text-muted py-3">
                        No transportation assigned
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            {/* HEALTH PARAMETERS */}

            <SectionCard
              title="Health Parameters"
              action={
                <button className="btn btn-sm btn-light text-primary rounded-3">
                  Add
                </button>
              }
            >
              <InfoRow
                label="Height"
                value={student.height}
              />

              <InfoRow
                label="Weight"
                value={student.weight}
              />

              <InfoRow
                label="Blood Group"
                value={student.bloodGroup}
              />

              <InfoRow
                label="Left Power"
                value={student.leftPower}
              />

              <InfoRow
                label="Right Power"
                value={student.rightPower}
              />

              <InfoRow
                label="Oral Hygiene"
                value={student.oralHygiene}
              />

              <InfoRow
                label="Dental Hygiene"
                value={student.dentalHygiene}
              />

              <InfoRow
                label="Special Ailments"
                value={student.specialAilments}
              />

              <InfoRow
                label="Capture Date"
                value={student.captureDates}
              />
            </SectionCard>

            {/* UNDERTAKING */}

            <SectionCard
              title="Undertaking / Special Needs"
              action={
                <button className="btn btn-sm btn-light text-primary rounded-3">
                  Add
                </button>
              }
            >
              <InfoRow
                label="Undertaking"
                value="-"
              />

              <InfoRow
                label="Special Needs"
                value="-"
              />

              <InfoRow
                label="Special Need Documents"
                value="-"
              />
            </SectionCard>

            {/* DOCUMENT */}

            <SectionCard title="Documents">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold mb-1">
                    Student Documents
                  </h6>

                  <small className="text-muted">
                    Upload or manage student documents
                  </small>
                </div>

                <button className="btn btn-primary rounded-3 px-3">
                  Upload
                </button>
              </div>
            </SectionCard>
          </div>
        </div>
      ) : (
        /* =========================================================
           PARENT INFORMATION
        ========================================================= */

        <div className="row g-3">
          {/* FATHER */}

          <div className="col-lg-6">
            <SectionCard
              title="Father Information"
              action={
                <button className="btn btn-sm btn-light text-primary rounded-3">
                  Edit
                </button>
              }
            >
              <div className="text-center mb-3">
                <img
                  src={father}
                  alt="Father"
                  className="rounded-circle shadow"
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <InfoRow
                label="Username"
                value={student.fatherUsername}
              />

              <InfoRow
                label="Father Name"
                value={student.fatherName}
              />

              <InfoRow
                label="Mobile"
                value={student.mobile}
              />

              <InfoRow
                label="Email"
                value={student.fatherEmail}
              />

              <InfoRow
                label="Aadhar"
                value={student.fatherAadhar}
              />

              <InfoRow
                label="Education"
                value={student.fatherEducation}
              />

              <InfoRow
                label="Occupation"
                value={student.fatherOccupation}
              />

              <InfoRow
                label="Organization"
                value={student.fatherOrganization}
              />

              <InfoRow
                label="Office Address"
                value={student.fatherOrganizationAddress}
              />

              <InfoRow
                label="State"
                value={student.state}
              />

              <InfoRow
                label="Pincode"
                value={student.zip}
              />
            </SectionCard>
          </div>

          {/* MOTHER */}

          <div className="col-lg-6">
            <SectionCard
              title="Mother Information"
              action={
                <button className="btn btn-sm btn-light text-primary rounded-3">
                  Edit
                </button>
              }
            >
              <div className="text-center mb-3">
                <img
                  src={mother}
                  alt="Mother"
                  className="rounded-circle shadow"
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <InfoRow
                label="Username"
                value={student.motherUsername}
              />

              <InfoRow
                label="Mother Name"
                value={student.motherName}
              />

              <InfoRow
                label="Mobile"
                value={student.motherMobile}
              />

              <InfoRow
                label="Email"
                value={student.motherEmail}
              />

              <InfoRow
                label="Aadhar"
                value={student.motherAadhar}
              />

              <InfoRow
                label="Education"
                value={student.motherEducation}
              />

              <InfoRow
                label="Occupation"
                value={student.motherOccupation}
              />

              <InfoRow
                label="Organization"
                value={student.motherOrganization}
              />

              <InfoRow
                label="Office Address"
                value={student.motherOrganizationAddress}
              />

              <InfoRow
                label="State"
                value={student.state}
              />

              <InfoRow
                label="Pincode"
                value={student.zip}
              />
            </SectionCard>
          </div>
        </div>
      )}

      {/* =========================================================
          EDIT MODAL
      ========================================================= */}

      <EditStudentModal
        show={showEditModal}
        student={editStudent}
        setStudent={setEditStudent}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdate}
      />
    </>
  );
};

export default StudentDetails;

