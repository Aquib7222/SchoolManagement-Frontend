import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const AddTeacher = () => {
  const { employeeId } = useParams();

  const isEditMode = Boolean(employeeId);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: "",
    id: "",

    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    fatherName: "",
    doj: "",
    status: "",
    gender: "",
    category: "",
    nationality: "",
    bloodGroup: "",
    department: "",
    designation: "",
    teachingLevel: "",
    employeeType: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    mobileNumber: "",
    emergencyContact: "",
    emergencyRelation: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    state: "",
    pincode: "",
    panNumber: "",
    biometricCard: "",
    esiNumber: "",
    aadharNumber: "",
    pfNumber: "",
    photo: "",
    maritalStatus:"",
    religion:"",
    caste:"",
    qualification:"",
    degreeBoard:"",
    passingYear:"",
    percentage:"",
    active: true,
  });
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        photo: reader.result, // base64 string
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchTeacher = async () => {
      if (!employeeId) return;

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        const schoolId = user?.school?.id;

        const res = await axiosInstance.get("/api/teachers/search", {
          params: {
            employeeId: employeeId,
            schoolId: schoolId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Teacher Data:", res.data);

        setFormData(res.data);

        console.log("Set Form Data:", res.data);
      } catch (error) {
        console.log(
          "Teacher fetch error:",
          error.response?.data || error.message,
        );

        alert("Teacher not found");
      }
    };

    fetchTeacher();
  }, [employeeId]);

  //   e.preventDefault();
  //   const savedData = JSON.parse(localStorage.getItem("TeacherFormData")) || [];
  //   const teacherAccounts =
  //     JSON.parse(localStorage.getItem("TeacherUserName")) || [];

  //   // Add teacher form data
  //   savedData.push(formData);

  //   // Add username/password as an object
  //   teacherAccounts.push({
  //     username: formData.username,
  //     password: formData.password,
  //   });

  //   localStorage.setItem("TeacherFormData", JSON.stringify(savedData));
  //   localStorage.setItem("TeacherUserName", JSON.stringify(teacherAccounts));

  //   alert("Teacher data saved successfully!");
  //   // You can also reset form if needed
  //   setFormData({
  //     username: "",
  //     password: "",
  //     firstName: "",
  //     middleName: "",
  //     lastName: "",
  //     dob: "",
  //     fatherName: "",
  //     doj: "",
  //     status: "",
  //     gender: "",
  //     category: "",
  //     nationality: "",
  //     bloodGroup: "",
  //     department: "",
  //     designation: "",
  //     teachingLevel: "",
  //     employeeType: "",
  //     phoneNumber: "",
  //     alternatePhoneNumber: "",
  //     mobileNumber: "",
  //     emergencyContact: "",
  //     emergencyRelation: "",
  //     email: "",
  //     addressLine1: "",
  //     addressLine2: "",
  //     addressLine3: "",
  //     city: "",
  //     state: "",
  //     pincode: "",
  //     panNumber: "",
  //     biometricCard: "",
  //     esiNumber: "",
  //     aadharNumber: "",
  //     pfNumber: "",
  //     photo: "",
  //   });
  //   navigate(-1);
  // };
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // 📸 Photo (Base64)
    if (type === "file") {
      const file = files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      console.log("school user", loggedInUser);

      const schoolId = loggedInUser.school.id;

      if (!schoolId) {
        alert("School not found");
        return;
      }
      if (isEditMode) {
        await axiosInstance.put(`/api/teachers/${employeeId}`, formData, {
          params: {
            schoolId,
          },
        });

        alert("Teacher updated successfully");
      } else {
        await axiosInstance.post(
          `/api/teachers?schoolId=${schoolId}`,
          formData,
        );

        alert("Teacher added successfully");
      }

      navigate(-1);
      navigate(-1);
    } catch (error) {
      console.error("Error adding teacher:", error);
      alert("Failed to add teacher");
    }
  };

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
          <strong>{isEditMode ? "Edit Teacher" : "Add Teacher"}</strong>
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
                {isEditMode ? "Edit Teacher" : "Add Teacher"}
              </a>
            </li>
          </ol>
        </nav>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="ms-2 me-2 rounded shadow bg-white p-3">
          <div className="row bg-primary p-1 d-flex text-center text-white ms-2 me-2">
            <strong>EduMatric Login Details</strong>
          </div>

          <div className="row bg-primary p-1 d-flex text-center text-white ms-2 me-2">
            <strong>Basic Details</strong>
          </div>

          {/* second row  */}
          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>
                  FirstName <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="firstName"
                className="w-100 rounded p-2"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Middle Name <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="middleName"
                className="w-100 rounded p-2"
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  LastName <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="lastName"
                className="w-100 rounded p-2"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Date of Birth <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="date"
                name="dob"
                className="w-100 rounded p-2"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* third row  */}
          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>
                  Father's Name <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="fatherName"
                className="w-100 rounded p-2"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Date of Joining <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="date"
                name="doj"
                className="w-100 rounded p-2"
                value={formData.doj}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Status <span className="text-danger">*</span>
                </strong>
              </label>
              <select
                name="status"
                id=""
                className="w-100 rounded p-2"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Working">Working</option>
                <option value="Resign">Resign</option>
                <option value="MaternityLeave">Maternity Leave</option>
                <option value="LongLeave">Long Leave</option>
              </select>
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Gender <span className="text-danger">*</span>
                </strong>
              </label>
              <select
                name="gender"
                id=""
                className="w-100 rounded p-2"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="NotApplicable">Not Applicable</option>
              </select>
            </div>
          </div>

          {/* fourth row  */}
          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>
                  Category <span className="text-danger">*</span>
                </strong>
              </label>
              <select
                name="category"
                id=""
                className="w-100 rounded p-2"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Teaching">Teaching</option>
                <option value="NonTeaching">Non Teaching</option>
                <option value="Admin">Admin</option>
                <option value="Transport">Transport</option>
              </select>
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Nationality <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="nationality"
                className="w-100 rounded p-2"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Blood Group <span className="text-danger">*</span>
                </strong>
              </label>
              <select
                name="bloodGroup"
                id=""
                className="w-100 rounded p-2"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "NA"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Department <span className="text-danger">*</span>
                </strong>
              </label>
              <select
                name="department"
                id=""
                className="w-100 rounded p-2"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {[
                  "ADMIN",
                  "ADMIN ASSISSTENT",
                  "ADMIN STAFF",
                  "COORDINATOR",
                  "LIBRARIAN",
                  "NON-TEACHING",
                  "PHYSICAL EDUCATION",
                  "PRINCIPAL",
                  "TEACHER",
                  "VICE PRINCIPAL",
                ].map((depart) => (
                  <option key={depart} value={depart}>
                    {depart}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* fifth row  */}
          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>
                  Designation <span className="text-danger">*</span>
                </strong>
              </label>
              <select
                name="designation"
                id=""
                className="w-100 rounded p-2"
                value={formData.designation}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {[
                  "Administrator",
                  "Admin Manager",
                  "HR Manager",
                  "Admin Assistant",
                  "Clerical Assistant",
                  "Receptionist",
                  "Office Executive",
                  "Data Entry Operator",
                  "Academic Coordinator",
                  "Discipline Coordinator",
                  "Exam Coordinator",
                  "Senior Librarian",
                  "Assistant Librarian",
                  "Peon",
                  "Cleaner",
                  "Driver",
                  "Security Guard",
                  "Bus Conductor",
                  "Physical Education Teacher",
                  "Sports Coach",
                  "Yoga Instructor",
                  "Principal",
                  "TGT (Trained Graduate Teacher)",
                  "PGT (Post Graduate Teacher)",
                  "PRT (Primary Teacher)",
                  "Subject Teacher",
                  "Computer Teacher",
                  "Vice Principal",
                ].map((designa) => (
                  <option key={designa} value={designa}>
                    {designa}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Teaching Level <span className="text-danger">*</span>
                </strong>
              </label>
              <select
                name="teachingLevel"
                id=""
                className="w-100 rounded p-2"
                value={formData.teachingLevel}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {[
                  "Pre-Primary",
                  "Primary School",
                  "Middle School",
                  "Higher School",
                ].map((teachingLvl) => (
                  <option key={teachingLvl} value={teachingLvl}>
                    {teachingLvl}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Employee Type <span className="text-danger">*</span>
                </strong>
              </label>
              <select
                name="employeeType"
                id=""
                className="w-100 rounded p-2"
                value={formData.employeeType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {["Permanent", "Temporary"].map((empLvl) => (
                  <option key={empLvl} value={empLvl}>
                    {empLvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row bg-primary p-1 text-center text-white ms-2 me-2 mt-3">
            <strong>Contact Details</strong>
          </div>

          {/* First row of contact details */}
          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>
                  Phone Number <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="w-100 rounded p-2"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>Alternate Phone Number</strong>
              </label>
              <input
                type="text"
                name="alternatePhoneNumber"
                className="w-100 rounded p-2"
                value={formData.alternatePhoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Mobile Number <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="mobileNumber"
                className="w-100 rounded p-2"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Emergency Contact <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="emergencyContact"
                className="w-100 rounded p-2 mb-1"
                placeholder="Contact No."
                value={formData.emergencyContact}
                onChange={handleChange}
              />
              <select
                className="w-100 rounded p-2"
                name="emergencyRelation"
                value={formData.emergencyRelation}
                onChange={handleChange}
              >
                <option value="">Select Relation</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Sibling">Sibling</option>
                <option value="Relative">Relative</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Second row of contact details */}
          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>
                  Email <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="email"
                name="email"
                className="w-100 rounded p-2"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Address Line 1 <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="addressLine1"
                className="w-100 rounded p-2"
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>Address Line 2</strong>
              </label>
              <input
                type="text"
                name="addressLine2"
                className="w-100 rounded p-2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>Address Line 3</strong>
              </label>
              <input
                type="text"
                name="addressLine3"
                className="w-100 rounded p-2"
                value={formData.addressLine3}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Third row of contact details */}
          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>
                  City <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="city"
                className="w-100 rounded p-2"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  State <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="state"
                className="w-100 rounded p-2"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Pincode <span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="pincode"
                className="w-100 rounded p-2"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row bg-primary p-1 text-center text-white ms-2 me-2 mt-3">
            <strong>Documents Detail</strong>
          </div>

          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3"></div>

            <div className="col-md-3">
              <label>
                <strong>Biometric Card Number:</strong>
              </label>
              <input
                type="text"
                name="biometricCard"
                className="w-100 rounded p-2"
                value={formData.biometricCard}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>PF No.:</strong>
              </label>
              <input
                type="text"
                name="pfNumber"
                className="w-100 rounded p-2"
                value={formData.pfNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  PAN No.:<span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="panNumber"
                className="w-100 rounded p-2"
                value={formData.panNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>ESI No.:</strong>
              </label>
              <input
                type="text"
                name="esiNumber"
                className="w-100 rounded p-2"
                value={formData.esiNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>
                  Aadhar Card Number:<span className="text-danger">*</span>
                </strong>
              </label>
              <input
                type="text"
                name="aadharNumber"
                className="w-100 rounded p-2"
                value={formData.aadharNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>PF Universal Account No.:</strong>
              </label>
              <input
                type="text"
                name="pfUniversalAccount"
                className="w-100 rounded p-2"
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>Basic Payment.:</strong>
              </label>
              <input
                type="text"
                name="basicPayment"
                className="w-100 rounded p-2"
              />
            </div>
          </div>

          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>Bank A/c Info:</strong>
              </label>
              <input
                type="text"
                name="bankInfo"
                className="w-100 rounded p-2"
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>IFSC Code:</strong>
              </label>
              <input
                type="text"
                name="ifscCode"
                className="w-100 rounded p-2"
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>List of Certificates submitted to HIS:</strong>
              </label>
              <textarea
                name="certificates"
                rows="2"
                className="w-100 rounded p-2"
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>Under School Sponsorship:</strong>
              </label>
              <select name="schoolSponsorship" className="w-100 rounded p-2">
                <option value="">Select Relation</option>
                <option>Father</option>
                <option>Mother</option>
                <option>Relative</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>Sponsor Name:</strong>
              </label>
              <input
                type="text"
                name="sponsorName"
                className="w-100 rounded p-2"
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>Sponsor Contact No.:</strong>
              </label>
              <input
                type="text"
                name="sponsorContact"
                className="w-100 rounded p-2"
              />
            </div>
          </div>

          {/* Mediclaim Insurance Detail */}
          <div className="row bg-primary p-1 text-center text-white ms-2 me-2 mt-3">
            <strong>Mediclaim Insurance Detail</strong>
          </div>

          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>
                  Marital Status::<span className="text-danger">*</span>
                </strong>
              </label>
              <select name="maritalStatus" className="w-100 rounded p-2"  value={formData.maritalStatus}
                onChange={handleChange}>
                <option>Select</option>
                <option value="Married">Married</option>
                <option value="UnMarried">UnMarried</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div className="col-md-3">
              <label>
                <strong>Spouse Name:</strong>
              </label>
              <input
                type="text"
                name="spouseName"
                className="w-100 rounded p-2"
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>Spouse Gender:</strong>
              </label>
              <select name="spouseGender" className="w-100 rounded p-2">
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col-md-3">
              <label>
                <strong>Spouse DOB:</strong>
              </label>
              <input
                type="date"
                name="spouseDOB"
                className="w-100 rounded p-2"
              />
            </div>
          </div>

          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>First Child Name:</strong>
              </label>
              <input
                type="text"
                name="firstChildName"
                className="w-100 rounded p-2"
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>First Child Gender::</strong>
              </label>
              <select name="firstChildGender" className="w-100 rounded p-2">
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col-md-3">
              <label>
                <strong>First Child DOB:</strong>
              </label>
              <input
                type="date"
                name="firstChildDOB"
                className="w-100 rounded p-2"
              />
            </div>
            <div className="col-md-3">
              <label>
                <strong>Second Child Name:</strong>
              </label>
              <input
                type="text"
                name="secondChildName"
                className="w-100 rounded p-2"
              />
            </div>
          </div>

          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>Second Child Gender:</strong>
              </label>
              <select name="secondChildGender" className="w-100 rounded p-2">
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col-md-3">
              <label>
                <strong>Second Child DOB:</strong>
              </label>
              <input
                type="date"
                name="secondChildDOB"
                className="w-100 rounded p-2"
              />
            </div>
          </div>

          {/* Religious Detail */}
          <div className="row bg-primary p-1 text-center text-white ms-2 me-2 mt-3">
            <strong>Religious Detail</strong>
          </div>

          <div className="row mt-2 ms-1 me-1">
            <div className="col-md-3">
              <label>
                <strong>Religion:</strong>
              </label>
              <select name="religion" className="w-100 rounded p-2" value={formData.religion} onChange={handleChange}>
                <option>--Select--</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Christian">Christian</option>
                <option value="Sikh">Sikh</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-3">
              <label>
                <strong>Caste:</strong>
              </label>
              <select name="caste" className="w-100 rounded p-2" value={formData.caste} onChange={handleChange}>
                <option>--Select--</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
            <div className="col-md-3">
              <label>
                <strong>Number of Child:</strong>
              </label>
              <select name="numberOfChild" className="w-100 rounded p-2">
                <option>--Select--</option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3+</option>
              </select>
            </div>
          </div>

          {/* Teacher Photo */}
          <div className="row bg-primary p-1 text-center text-white ms-2 me-2 mt-3">
            <strong>Teacher Photo</strong>
          </div>

          <div className="row mt-2 ms-1 me-1 mb-4">
            <div className="col-md-12 d-flex gap-2">
              <label>
                <strong>Upload Photo</strong>
              </label>
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                className="form-control w-50 h-50"
                name="photo"
                onChange={handleImageUpload}
              />
              <small className="text-muted">(jpeg, jpg, png)</small>

              {/* Preview */}
              {formData.photo && (
                <div className="mt-2">
                  <img
                    src={formData.photo}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Teacher Signature */}
          <div className="row bg-primary p-1 text-center text-white ms-2 me-2 mt-3">
            <strong>Teacher Signature</strong>
          </div>

          <div className="row mt-2 ms-1 me-1 mb-3">
            <div className="col-md-4">
              <label>
                <strong>Upload Signature</strong>
              </label>
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                className="form-control"
              />
              <small className="text-muted">(jpeg, jpg, png)</small>
            </div>
          </div>

          {/* Qualification Detail */}
          <div className="row bg-primary p-1 text-center text-white ms-2 me-2 mt-3">
            <strong>Qualification Detail</strong>
          </div>

          <div className="table-responsive mt-2 ms-1 me-1">
            <table className="table table-bordered">
              <thead className="table-light text-center">
                <tr>
                  <th>Qualification</th>
                  <th>University/Board</th>
                  <th>Passing Year</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name={`qualification_${idx}`}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name={`university_${idx}`}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name={`year_${idx}`}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name={`percentage_${idx}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Work Experience Section */}
          <div className="row bg-primary p-1 text-center text-white ms-2 me-2 mt-3">
            <strong>Work Experience</strong>
          </div>

          <div className="table-responsive mt-2 ms-1 me-1">
            <table className="table table-bordered">
              <thead className="table-light text-center">
                <tr>
                  <th>Company Name</th>
                  <th>Designation</th>
                  <th>Duration</th>
                  <th>Total Experience</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((_, idx) => (
                  <tr key={idx}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name={`company_${idx}`}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name={`designation_${idx}`}
                      />
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <input
                          type="date"
                          className="form-control mb-1"
                          name={`fromDate_${idx}`}
                        />
                        <input
                          type="date"
                          className="form-control"
                          name={`toDate_${idx}`}
                        />
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name={`totalExp_${idx}`}
                        placeholder="e.g. 2 Years"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Submit Button */}
          <div className=" my-4">
            <button className="btn btn-success px-4 py-2" type="submit">
              <strong>{isEditMode ? "Update Teacher" : "Add Teacher"}</strong>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTeacher;
