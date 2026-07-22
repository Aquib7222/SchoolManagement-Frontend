// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const AdmissionEdit = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     studentClass: "",
//     academicYear: "",
//     academicType: "",
//     gender: "",
//     mobile: "",
//   });

//   // 🔁 Fetch admission
//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/api/admissions/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => setFormData(res.data))
//       .catch(() => alert("Failed to load admission"));
//   }, [id]);

//   // ✏️ Handle input
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // 🔄 Update admission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.put(
//         `http://localhost:8080/api/admissions/${id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Admission updated successfully");
//       navigate("/admissions");
//     } catch (err) {
//       alert(err.response?.data || "Update failed");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Edit Admission</h3>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           placeholder="First Name"
//           className="form-control mb-2"
//         />

//         <input
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           placeholder="Last Name"
//           className="form-control mb-2"
//         />

//         <input
//           name="studentClass"
//           value={formData.studentClass}
//           onChange={handleChange}
//           placeholder="Class"
//           className="form-control mb-2"
//         />

//         <input
//           name="academicYear"
//           value={formData.academicYear}
//           onChange={handleChange}
//           placeholder="Academic Year"
//           className="form-control mb-2"
//         />

//         <select
//           name="academicType"
//           value={formData.academicType}
//           onChange={handleChange}
//           className="form-control mb-2"
//         >
//           <option value="">Select Type</option>
//           <option value="CBSE">CBSE</option>
//           <option value="ICSE">ICSE</option>
//           <option value="STATE">STATE</option>
//         </select>

//         <input
//           name="mobile"
//           value={formData.mobile}
//           onChange={handleChange}
//           placeholder="Mobile"
//           className="form-control mb-2"
//         />

//         <button className="btn btn-primary">Update Admission</button>
//       </form>
//     </div>
//   );
// };

// export default AdmissionEdit;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditAdmissionForm = () => {
  const { id } = useParams();
  console.log("ID",id);
  const navigate = useNavigate();
  const token =localStorage.getItem("token");

  const [formData, setFormData] = useState({
    academicYear: "",
    academicType: "",
    invoice: "",
    today: "",
    firstName: "",
    lastName: "",
    middleName: "",
    dob: "",
    gender: "",
    aadharNo: "",
    nationality: "",
    motherTongue: "",
    religion: "",
    category: "",
    caste: "",
    bloodGroup: "",
    transportRequired: "",
    class: "",
    section: "",
    age: "",
    alternateNo: "",
    email: "",
    feeCategory: "",
    preferredNo: "",
    siblingAdm: "",
    siblingPresent: "",
    siblingClass: "",
    fatherName: "",
    fatherAadhar: "",
    fatherEducation: "",
    fatherEducationType: "",
    fatherEmail: "",
    fatherImage: "",
    fatherJobType: "",
    fatherLandline: "",
    fatherMobile: "",
    fatherOccupation: "",
    fatherOrganization: "",
    fatherOrganizationAddress: "",
    fatherSpecialisation: "",
    motherName: "",
    motherAadhar: "",
    motherEducation: "",
    motherEducationType: "",
    motherEmail: "",
    motherImage: "",
    motherJobType: "",
    motherLandline: "",
    motherMobile: "",
    motherOccupation: "",
    motherOrganization: "",
    motherOrganizationAddress: "",
    motherSpecialisation: "",
    studentImage: "",
    guardianImage: "",
  });

  const [siblings, setSiblings] = useState([
    {
      siblingPresent: false,
      siblingAdm: "",
      siblingName: "",
      siblingClass: "",
    },
  ]);

  const handleAddMoreSiblings = () => {
    setSiblings([
      ...siblings,
      {
        siblingAdm: "",
        siblingName: "",
        siblingClass: "",
      },
    ]);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData((prev) => ({
          ...prev,
          [name]: base64String,
        }));
        // Optional: save to localStorage
        localStorage.setItem(name, base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  // 🔁 Fetch admission
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admissions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setFormData(res.data))
      .catch(() => alert("Failed to load admission"));
  });

  console.log("Form",formData);
  // ✏️ Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔄 Update admission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/api/admissions/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Admission updated successfully");
      navigate("/admissions");
    } catch (err) {
      alert(err.response?.data || "Update failed");
    }
  };

  return (
    <>
      <div
        className="row shadow-lg"
        style={{
          backgroundColor: "white",
          margin: "10px",
          height: "67px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6>
          <strong>Edit Admission Details</strong>
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
                Edit Admission Details
              </a>
            </li>
          </ol>
        </nav>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className=" mt-4 rounded ms-2 p-4 mb-3 me-2"
          style={{ backgroundColor: "white" }}
        >
          <div className="row d-flex justify-content-center">
            <div className="col-md-4 ">
              <label>Joining Academic Year</label>
              <select
                name="academicYear"
                value={formData.academicYear}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="2025-26">2025-2026</option>
                <option value="2024-23">2024-2023</option>
                <option value="2023-22">2023-2022</option>
                <option value="2022-21">2022-2021</option>
                <option value="2021-20">2021-2020</option>
              </select>
            </div>
          </div>
          {/* second row */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Enter Date</label>
              <input
                type="date"
                name="today"
                id=""
                className="w-100 p-2 rounded"
                value={formData.today}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 ">
              <label>Invoice No</label>
              <input
                type="text"
                name="invoice"
                className="w-100 p-2 rounded"
                value={formData.invoice}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 ">
              <label>Admission Type</label>
              <select
                name="academicType"
                value={formData.academicType}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="newAdmission">New Admission</option>
              </select>
            </div>
          </div>
          {/* third row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                id=""
                className="w-100 p-2 rounded"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 ">
              <label>Middle Name</label>
              <input
                type="text"
                name="middleName"
                className="w-100 p-2 rounded"
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 ">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-100 p-2 rounded"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* fourth row */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Gender</label>
              <select
                name="gender"
                id=""
                className="w-100 p-2 rounded"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="NA">Not Applicable</option>
              </select>
            </div>
            <div className="col-md-4 ">
              <label>Date Of Birth</label>
              <input
                type="date"
                name="dob"
                id=""
                className="w-100 p-2 rounded"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 ">
              <label>Adhar Card No</label>
              <input
                type="text"
                name="aadharNo"
                className="w-100 p-2 rounded"
                value={formData.aadharNo}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* fifth row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Nationality</label>
              <input
                type="text"
                name="nationality"
                id=""
                className="w-100 p-2 rounded"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 ">
              <label>Mother Tongue</label>
              <input
                type="text"
                className="w-100 p-2 rounded"
                name="motherTongue"
                value={formData.motherTongue}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 ">
              <label>Religion</label>
              <input
                type="text"
                name="religion"
                className="w-100 p-2 rounded"
                value={formData.religion}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* sixth row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Category</label>
              <select
                name="category"
                id=""
                className="w-100 p-2 rounded"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="obc">OBC</option>
                <option value="general">General</option>
                <option value="ebc">EBC</option>
                <option value="sc">SC</option>
                <option value="st">ST</option>
              </select>
            </div>
            <div className="col-md-4 ">
              <label>Caste</label>

              <input
                type="text"
                name="caste"
                className="w-100 p-2 rounded"
                value={formData.caste}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 ">
              <label>Blood Group</label>
              <select
                name="bloodGroup"
                id=""
                className="w-100 p-2 rounded"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          {/* seventh row */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Transport Required</label>
              {/* <select name="transportRequired" value={formData.transportRequired} id="" className="w-100 p-2 rounded">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select> */}
              <input
                type="checkbox"
                name="transportRequired"
                checked={formData.transportRequired === "yes"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    transportRequired: e.target.checked ? "yes" : "no",
                  })
                }
              />
            </div>
            <div className="col-md-4 ">
              <label>Class to which admission is sought</label>
              <select
                name="class"
                value={formData.class}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Nursery">Nursery</option>
                <option value="Lkg">LKG</option>
                <option value="Ukg">UKG</option>
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
                <option value="XI">XI</option>
                <option value="XII">XII</option>
              </select>
            </div>

            {/* section assign  */}
            <div className="col-md-4 ">
              <label>Section</label>
              <select
                name="section"
                value={formData.section}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">C</option>
                <option value="E">D</option>
                <option value="F">E</option>
              </select>
            </div>
          </div>

          {/* eighth row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Email For Correspondence</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 ">
              <label>Alternate Mobile No. for SMS: </label>
              <input
                type="text"
                name="alternateNo"
                value={formData.alternateNo}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 ">
              <label>Preferred Mobile No. for SMS: </label>
              <input
                type="text"
                name="preferredNo"
                value={formData.preferredNo}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* ninth row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Fee Category</label>
              <select
                name="feeCategory"
                value={formData.feeCategory}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="General">General</option>
                <option value="Concession">Concession</option>
                <option value="Ex-Student">Ex-Student</option>
                <option value="Staff Child">Staff Child</option>
              </select>
            </div>
            <div className="col-md-4 ">
              <label>Age as on 1st June, 2025</label>
              <input
                type="text"
                name="age"
                className="w-100 p-2 rounded"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 10th row sibling details  */}
          <div
            className="row mt-3 text-center mx-1 text-white"
            style={{ backgroundColor: "rgb(30, 58, 138)" }}
          >
            <h5>Sibling Detail</h5>
          </div>

          {/* 11th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Sibling In School</label>
              <input
                type="checkbox"
                name="siblingPresent"
                id=""
                className="w-100 p-2 rounded"
                value={formData.siblingPresent}
                onChange={handleChange}
                checked={siblings.siblingPresent}
              />
            </div>
          </div>

          {/* 12th row  */}
          <div className="row mt-2">
            <div className="col-md-3 ">
              <label>Sibling Admission No</label>
              <input
                type="text"
                name="siblingAdm"
                value={formData.siblingAdm}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
                disabled={!siblings.siblingPresent}
              />
            </div>
            <div className="col-md-3 ">
              <label>Sibling Name</label>
              <input
                type="text"
                name="siblingName"
                value={formData.siblingName}
                className="w-100 p-2 rounded"
                onChange={handleChange}
                disabled={!siblings.siblingPresent}
              />
            </div>

            <div className="col-md-3 ">
              <label>Sibling Class</label>
              <input
                type="text"
                name="siblingClass"
                value={formData.siblingClass}
                className="w-100 p-2 rounded"
                disabled={!siblings.siblingPresent}
              />
            </div>
            <div className="col-md-3">
              <button
                className="w-50 mt-4 p-2 rounded btn btn-info"
                onClick={handleAddMoreSiblings}
              >
                + Add More
              </button>
            </div>
          </div>

          {/* 14th row  Corresponse Address*/}
          <div
            className="row mt-3 text-center mx-1 text-white"
            style={{ backgroundColor: "rgb(30, 58, 138)" }}
          >
            <h5>Correspondence Address</h5>
          </div>

          {/* 15th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>House No</label>
              <input
                type="text"
                name="houseNo"
                value={formData.houseNo}
                onChange={handleChange}
                id=""
                className="w-100 p-2 rounded"
              />
            </div>
            <div className="col-md-4 ">
              <label>Post/Zip Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="w-100 p-2 rounded"
              />
            </div>

            <div className="col-md-4 ">
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-100 p-2 rounded"
              />
            </div>
          </div>
          {/* 13th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Area</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                id=""
                className="w-100 p-2 rounded"
              />
            </div>
            <div className="col-md-4 ">
              <label>Town</label>
              <input
                type="text"
                name="town"
                value={formData.town}
                onChange={handleChange}
                className="w-100 p-2 rounded"
              />
            </div>

            <div className="col-md-4 ">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-100 p-2 rounded"
              />
            </div>
          </div>
          {/* 13th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                id=""
                className="w-100 p-2 rounded"
              />
            </div>
            <div className="col-md-4 ">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-100 p-2 rounded"
              />
            </div>
          </div>

          {/* 14th row Permanent Address */}
          <div
            className="row mt-3 text-center mx-1 text-white"
            style={{ backgroundColor: "rgb(30, 58, 138)" }}
          >
            <h5>Permanent Address</h5>
          </div>

          {/* 15th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>House No</label>
              <input
                type="text"
                name="houseNo"
                value={formData.houseNo}
                onChange={handleChange}
                id=""
                className="w-100 p-2 rounded"
              />
            </div>
            <div className="col-md-4 ">
              <label>Post/Zip Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="w-100 p-2 rounded"
              />
            </div>

            <div className="col-md-4 ">
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-100 p-2 rounded"
              />
            </div>
          </div>
          {/* 13th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Area</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                id=""
                className="w-100 p-2 rounded"
              />
            </div>
            <div className="col-md-4 ">
              <label>Town</label>
              <input
                type="text"
                name="town"
                value={formData.town}
                onChange={handleChange}
                className="w-100 p-2 rounded"
              />
            </div>

            <div className="col-md-4 ">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-100 p-2 rounded"
              />
            </div>
          </div>
          {/* 13th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                id=""
                className="w-100 p-2 rounded"
              />
            </div>
            <div className="col-md-4 ">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-100 p-2 rounded"
              />
            </div>
          </div>

          {/* 14th row Father details */}
          <div
            className="row mt-3 text-center mx-1 text-white"
            style={{ backgroundColor: "rgb(30, 58, 138)" }}
          >
            <h5>Father Details</h5>
          </div>

          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Father Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 ">
              <label>Landline</label>
              <input
                type="text"
                name="fatherLandline"
                value={formData.fatherLandline}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 ">
              <label>Mobile</label>
              <input
                type="text"
                name="fatherMobile"
                value={formData.fatherMobile}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* 13th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Email</label>
              <input
                type="text"
                name="fatherEmail"
                value={formData.fatherEmail}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 ">
              <label>Father Adhar Card No</label>
              <input
                type="text"
                name="fatherAadhar"
                value={formData.fatherAadhar}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 ">
              <label>Education</label>
              <input
                type="text"
                name="fatherEducation"
                value={formData.fatherEducation}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* 13th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Education Type</label>
              <select
                name="fatherEducationType"
                value={formData.fatherEducationType}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div className="col-md-4 ">
              <label>Specialisation</label>
              <input
                type="text"
                name="fatherSpecialisation"
                value={formData.fatherSpecialisation}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 ">
              <label>Job Type</label>
              <input
                type="text"
                name="fatherJobType"
                value={formData.fatherJobType}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* 13th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Occupation</label>
              <select
                name="fatherOccupation"
                value={formData.fatherOccupation}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="engineer">Engineer</option>
                <option value="doctor">Doctor</option>
                <option value="Businessman">Businessman</option>
                <option value="teacher">Teacher</option>
                <option value="governmentJob">Government Job</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-md-4 ">
              <label>Organization Name</label>
              <input
                type="text"
                name="fatherOrganization"
                value={formData.fatherOrganization}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 ">
              <label>Organization Address</label>
              <input
                type="text"
                name="fatherOrganizationAddress"
                value={formData.fatherOrganizationAddress}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 14th row Father details */}
          <div
            className="row mt-3 text-center mx-1 text-white"
            style={{ backgroundColor: "rgb(30, 58, 138)" }}
          >
            <h5>Mother Details</h5>
          </div>

          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Mother Name</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 ">
              <label>Landline</label>
              <input
                type="text"
                name="motherLandline"
                value={formData.motherLandline}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 ">
              <label>Mobile</label>
              <input
                type="text"
                name="motherMobile"
                value={formData.motherMobile}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* 13th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Email</label>
              <input
                type="text"
                name="motherEmail"
                value={formData.motherEmail}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 ">
              <label>Mother Adhar Card No</label>
              <input
                type="text"
                name="motherAadhar"
                value={formData.motherAadhar}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 ">
              <label>Education</label>
              <input
                type="text"
                name="motherEducation"
                value={formData.motherEducation}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* 13th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Education Type</label>
              <select
                name="motherEducationType"
                value={formData.motherEducationType}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div className="col-md-4 ">
              <label>Specialisation</label>
              <input
                type="text"
                name="motherSpecialisation"
                value={formData.motherSpecialisation}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 ">
              <label>Job Type</label>
              <input
                type="text"
                name="motherJobType"
                value={formData.motherJobType}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* 13th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Occupation</label>
              <select
                name="motherOccupation"
                value={formData.motherOccupation}
                id=""
                className="w-100 p-2 rounded"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="engineer">Engineer</option>
                <option value="doctor">Doctor</option>
                <option value="businessman">Businessman</option>
                <option value="teacher">Teacher</option>
                <option value="governamentJob">Government Job</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-md-4 ">
              <label>Organization Name</label>
              <input
                type="text"
                name="motherOrganization"
                value={formData.motherOrganization}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 ">
              <label>Organization Address</label>
              <input
                type="text"
                name="motherOrganizationAddress"
                value={formData.motherOrganizationAddress}
                className="w-100 p-2 rounded"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 14th row Father details */}
          <div
            className="row mt-3 text-center mx-1 text-white"
            style={{ backgroundColor: "rgb(30, 58, 138)" }}
          >
            <h5>Guardian Details</h5>
          </div>

          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Name</label>
              <input type="text" name="" id="" className="w-100 p-2 rounded" />
            </div>
            <div className="col-md-4 ">
              <label>Landline</label>
              <input type="text" className="w-100 p-2 rounded" />
            </div>

            <div className="col-md-4 ">
              <label>Mobile</label>
              <input type="text" className="w-100 p-2 rounded" />
            </div>
          </div>
          {/* 13th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Email</label>
              <input type="text" name="" id="" className="w-100 p-2 rounded" />
            </div>
            <div className="col-md-4 ">
              <label>Guardian Adhar Card No</label>
              <input type="text" className="w-100 p-2 rounded" />
            </div>

            <div className="col-md-4 ">
              <label>Education</label>
              <input type="text" className="w-100 p-2 rounded" />
            </div>
          </div>
          {/* 13th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Education Type</label>
              <select name="" id="" className="w-100 p-2 rounded">
                <option value="">Select</option>
                <option value="">Private</option>
                <option value="">Public</option>
                <option value="">Business</option>
              </select>
            </div>
            <div className="col-md-4 ">
              <label>Specialisation</label>
              <input type="text" className="w-100 p-2 rounded" />
            </div>

            <div className="col-md-4 ">
              <label>Job Type</label>
              <input type="text" className="w-100 p-2 rounded" />
            </div>
          </div>
          {/* 13th row  */}
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>Occupation</label>
              <select name="" id="" className="w-100 p-2 rounded">
                <option value="">Select</option>
                <option value="">Engineer</option>
                <option value="">Doctor</option>
                <option value="">Businessman</option>
                <option value="">Teacher</option>
                <option value="">Government Job</option>
                <option value="">Other</option>
              </select>
            </div>
            <div className="col-md-4 ">
              <label>Organization Name</label>
              <input type="text" className="w-100 p-2 rounded" />
            </div>

            <div className="col-md-4 ">
              <label>Organization Address</label>
              <input type="text" className="w-100 p-2 rounded" />
            </div>
          </div>

          {/* 14th row Father details */}
          <div
            className="row mt-3 text-center mx-1 text-white"
            style={{ backgroundColor: "rgb(30, 58, 138)" }}
          >
            <h5>Photographs</h5>
          </div>
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>
                <strong>Student</strong>
              </label>
              <input
                type="file"
                name="studentImage"
                id=""
                // value={formData.studentImage}
                accept="image/*"
                onChange={handleImageChange}
                className="w-100 p-2 rounded border"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>
                <strong>Father</strong>
              </label>
              <input
                type="file"
                name="fatherImage"
                id=""
                // value={formData.fatherImage}
                accept="image/*"
                onChange={handleImageChange}
                className="w-100 p-2 rounded border"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>
                <strong>Mother</strong>
              </label>
              <input
                type="file"
                name="motherImage"
                id=""
                // value={formData.motherImage}
                accept="image/*"
                onChange={handleImageChange}
                className="w-100 p-2 rounded border"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-4 ">
              <label>
                <strong>Guardian</strong>
              </label>
              <input
                type="file"
                name="guardianImage"
                id=""
                // value={formData.guardianImage}
                accept="image/*"
                onChange={handleImageChange}
                className="w-100 p-2 rounded border"
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-4 ">
              <button
                className="w-50 p-2 rounded border text-white"
                style={{ backgroundColor: "rgb(30, 58, 138)" }}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditAdmissionForm;
