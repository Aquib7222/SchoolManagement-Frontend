

import axios from "axios";
import React, { useEffect, useState } from "react";

import { FaArrowLeft, FaPaperPlane, FaRegUser } from "react-icons/fa";
import {
  FaArrowsRotate,
  FaArrowUpFromBracket,
} from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineGridView } from "react-icons/md";
import { SiAdguard } from "react-icons/si";

const SuperAdminCreation = () => {
  const token = localStorage.getItem("token");

  

  const [selectedFile, setSelectedFile] = useState(null);
  const [existingLogo, setExistingLogo] = useState(null);

  const [userGroup, setUserGroup] = useState([]);
  const [schools, setSchools] = useState([]);

  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [showEmailOtp, setShowEmailOtp] = useState(false);

  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const [sendingPhoneOtp, setSendingPhoneOtp] = useState(false);
  const [sendingEmailOtp, setSendingEmailOtp] = useState(false);

  const [verifyingPhoneOtp, setVerifyingPhoneOtp] = useState(false);
  const [verifyingEmailOtp, setVerifyingEmailOtp] = useState(false);

  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const [creatingUser, setCreatingUser] = useState(false);


  const [formData, setFormData] = useState({
    schoolId: "",

    fullName: "",
    username: "",

    email: "",
    phoneNumber: "",
    alternatePhone: "",

    dateOfBirth: "",
    gender: "",

    password: "",
    confirmPassword: "",

    securityQuestion: "",
    securityAnswer: "",

    address: "",
    languagePreference: "",
    timeZone: "",
    note: "",

    role: "",

    accountStatus: true,
    twoFactorAuthentication: false,
    loginNotification: true,

    userGroupId: "",
  });


  const permissions = [
    "All Modules Access",
    "User & Role Management",
    "System Settings",
    "School Management",
    "Reports & Analytics",
    "System Configuration",
  ];

  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first school?",
    "What is your favorite place?",
    "What was your childhood nickname?",
  ];

  const languages = [
    {
      value: "ENGLISH",
      label: "English",
    },
    {
      value: "HINDI",
      label: "Hindi",
    },
  ];

  const timeZones = [
    {
      value: "Asia/Kolkata",
      label: "India Standard Time (IST) — UTC +05:30",
    },
    {
      value: "Asia/Dubai",
      label: "Gulf Standard Time (GST) — UTC +04:00",
    },
    {
      value: "Asia/Dhaka",
      label: "Bangladesh Standard Time — UTC +06:00",
    },
    {
      value: "Asia/Singapore",
      label: "Singapore Time — UTC +08:00",
    },
    {
      value: "Asia/Tokyo",
      label: "Japan Standard Time — UTC +09:00",
    },
  ];


  useEffect(() => {
    loadUserGroup();
    loadSchools();
  }, []);


  const loadUserGroup = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/user-group/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserGroup(res.data || []);
    } catch (error) {
      console.error("User group loading failed:", error);
    }
  };


  const loadSchools = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/school/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSchools(res.data || []);
    } catch (error) {
      console.error("School loading failed:", error);
    }
  };

  
const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name === "userGroupId") {
    const selectedGroup = userGroup.find(
      (group) => String(group.id) === String(value)
    );

    const selectedRole =
      selectedGroup?.groupName ||
      selectedGroup?.name ||
      selectedGroup?.role ||
      "";

    setFormData((prev) => ({
      ...prev,
      userGroupId: value,
      role: selectedRole,
    }));

    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // 2 MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Profile picture must be less than 2MB.");
      return;
    }

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG or SVG files are allowed.");
      return;
    }

    setSelectedFile(file);
  };


  const sendPhoneOtp = async () => {
    if (formData.phoneNumber.length !== 10) {
      alert("Please enter valid 10 digit phone number.");
      return;
    }

    try {
      setSendingPhoneOtp(true);

      const response = await axios.post(
        "http://localhost:8080/api/otp/send-phone",
        {
          phone: formData.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Phone OTP:", response.data);

      setShowPhoneOtp(true);
      setPhoneOtp("");

      alert(
        "Phone OTP generated successfully.\nCheck your Spring Boot console."
      );
    } catch (error) {
      console.error("Phone OTP error:", error);

      alert(
        error.response?.data ||
          "Failed to generate phone OTP."
      );
    } finally {
      setSendingPhoneOtp(false);
    }
  };


  const verifyPhoneOtp = async () => {
    if (phoneOtp.length !== 6) {
      alert("Please enter 6 digit OTP.");
      return;
    }

    try {
      setVerifyingPhoneOtp(true);

      const response = await axios.post(
        "http://localhost:8080/api/otp/verify-phone",
        {
          phone: formData.phoneNumber,
          otp: phoneOtp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Phone verification:", response.data);

      setPhoneVerified(true);
      setShowPhoneOtp(false);
      setPhoneOtp("");

      alert("Phone number verified successfully.");
    } catch (error) {
      console.error("Phone verification error:", error);

      alert(
        error.response?.data ||
          "Invalid phone OTP."
      );
    } finally {
      setVerifyingPhoneOtp(false);
    }
  };


  const sendEmailOtp = async () => {
    if (!formData.email.trim()) {
      alert("Please enter email address.");
      return;
    }

    try {
      setSendingEmailOtp(true);

      const response = await axios.post(
        "http://localhost:8080/api/otp/send-email",
        {
          email: formData.email.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Email OTP:", response.data);

      setShowEmailOtp(true);
      setEmailOtp("");

      alert(
        "Email OTP generated successfully.\nCheck your Spring Boot console."
      );
    } catch (error) {
      console.error("Email OTP error:", error);

      alert(
        error.response?.data ||
          "Failed to generate email OTP."
      );
    } finally {
      setSendingEmailOtp(false);
    }
  };

  

  const verifyEmailOtp = async () => {
    if (emailOtp.length !== 6) {
      alert("Please enter 6 digit OTP.");
      return;
    }

    try {
      setVerifyingEmailOtp(true);

      const response = await axios.post(
        "http://localhost:8080/api/otp/verify-email",
        {
          email: formData.email.trim(),
          otp: emailOtp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Email verification:", response.data);

      setEmailVerified(true);
      setShowEmailOtp(false);
      setEmailOtp("");

      alert("Email address verified successfully.");
    } catch (error) {
      console.error("Email verification error:", error);

      alert(
        error.response?.data ||
          "Invalid email OTP."
      );
    } finally {
      setVerifyingEmailOtp(false);
    }
  };

 

const createSuperAdmin = async () => {
 

  if (!formData.schoolId) {
    alert("Please select school.");
    return;
  }

  if (!formData.fullName.trim()) {
    alert("Please enter full name.");
    return;
  }

  if (!formData.email.trim()) {
    alert("Please enter email address.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    alert("Please enter a valid email address.");
    return;
  }

  if (formData.phoneNumber.length !== 10) {
    alert("Please enter valid 10 digit phone number.");
    return;
  }

  if (!phoneVerified) {
    alert("Please verify phone number first.");
    return;
  }

  if (!emailVerified) {
    alert("Please verify email address first.");
    return;
  }

  if (!formData.dateOfBirth) {
    alert("Please select date of birth.");
    return;
  }

  if (!formData.gender) {
    alert("Please select gender.");
    return;
  }


  if (!formData.userGroupId) {
    alert("Please select role.");
    return;
  }

  const selectedUserGroup = userGroup.find(
    (group) => String(group.id) === String(formData.userGroupId)
  );

  if (!selectedUserGroup) {
    alert("Selected role not found.");
    return;
  }

 

  if (!formData.password) {
    alert("Please enter password.");
    return;
  }

  if (formData.password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  if (!formData.confirmPassword) {
    alert("Please confirm password.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Password and confirm password do not match.");
    return;
  }


  if (!formData.securityQuestion) {
    alert("Please select security question.");
    return;
  }

  if (!formData.securityAnswer.trim()) {
    alert("Please enter security answer.");
    return;
  }


  const selectedRole =
    selectedUserGroup.groupName ||
    selectedUserGroup.name ||
    selectedUserGroup.role ||
    "";

  if (!selectedRole) {
    alert("Selected role name is missing.");
    return;
  }


  const payload = {
   

    name: formData.fullName.trim(),

    fullName: formData.fullName.trim(),

    email: formData.email.trim(),

    phone: formData.phoneNumber,

    phoneNumber: formData.phoneNumber,

    alternatePhone: formData.alternatePhone.trim(),

    dateOfBirth: formData.dateOfBirth,

    gender: formData.gender,

    password: formData.password,

    confirmPassword: formData.confirmPassword,

    securityQuestion: formData.securityQuestion,

    securityAnswer: formData.securityAnswer.trim(),

    address: formData.address.trim(),

    languagePreference:
      formData.languagePreference || null,

    timeZone:
      formData.timeZone || null,

    note:
      formData.note.trim() || null,

    role: selectedRole,

    userGroupId: Number(formData.userGroupId),

    status: formData.accountStatus
      ? "Active"
      : "Inactive",

    accountStatus: formData.accountStatus,

    twoFactorAuthentication:
      formData.twoFactorAuthentication,

    loginNotification:
      formData.loginNotification,

    phoneVerified: phoneVerified,

    emailVerified: emailVerified,
  };

  console.log(
    "=========================================="
  );

  console.log(
    "CREATE SUPER ADMIN PAYLOAD:",
    payload
  );

  console.log(
    "SELECTED ROLE:",
    selectedRole
  );

  console.log(
    "SELECTED USER GROUP:",
    selectedUserGroup
  );

  console.log(
    "=========================================="
  );

  try {
    setCreatingUser(true);

    const response = await axios.post(
      `http://localhost:8080/api/superadmin/create?schoolId=${formData.schoolId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "SUPER ADMIN CREATED:",
      response.data
    );

    const generatedUsername =
      response.data?.username ||
      response.data?.user?.username ||
      response.data?.data?.username;

    if (generatedUsername) {
      alert(
        `Super Admin created successfully!\n\nUsername: ${generatedUsername}`
      );
    } else {
      alert(
        "Super Admin created successfully."
      );
    }

    resetForm();

  } catch (error) {
    console.error(
      "Create Super Admin Error:",
      error
    );

    console.error(
      "Backend Response:",
      error.response?.data
    );

    const backendMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data;

    alert(
      backendMessage ||
        "Failed to create Super Admin."
    );

  } finally {
    setCreatingUser(false);
  }
};


 const resetForm = () => {
  setFormData({
    schoolId: "",

    fullName: "",
    username: "",

    email: "",
    phoneNumber: "",
    alternatePhone: "",

    dateOfBirth: "",
    gender: "",

    password: "",
    confirmPassword: "",

    securityQuestion: "",
    securityAnswer: "",

    address: "",
    languagePreference: "",
    timeZone: "",
    note: "",

    role: "",
    userGroupId: "",

    accountStatus: true,
    twoFactorAuthentication: false,
    loginNotification: true,
  });

  setPhoneOtp("");
  setEmailOtp("");

  setShowPhoneOtp(false);
  setShowEmailOtp(false);

  setPhoneVerified(false);
  setEmailVerified(false);

  setSelectedFile(null);
  setExistingLogo(null);
};


  const SectionCard = ({
    icon,
    title,
    children,
    className = "",
  }) => {
    return (
      <div className={`section-card ${className}`}>
        {title && (
          <div className="section-header">
            <div className="section-icon">
              {icon}
            </div>

            <strong>{title}</strong>
          </div>
        )}

        <div className="section-body">
          {children}
        </div>
      </div>
    );
  };

  return (
    <>
     

      <div className="container-fluid px-2">
        <div
          className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
          style={{ minHeight: "70px" }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <h4 className="fw-bold mb-1">
                Create Super Admin
              </h4>

              <p className="text-muted mb-2">
                Add a new super administrator to
                manage the entire system.
              </p>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 small">
                  <li className="breadcrumb-item">
                    <a
                      href="/"
                      className="text-decoration-none text-dark"
                    >
                      Dashboard
                    </a>
                  </li>

                  <li className="breadcrumb-item">
                    Super Admin Management
                  </li>

                  <li className="breadcrumb-item active text-primary">
                    Create Super Admin
                  </li>
                </ol>
              </nav>
            </div>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() =>
                window.history.back()
              }
            >
              <FaArrowLeft className="me-2" />
              Back to Super Admin List
            </button>
          </div>
        </div>
      </div>

     
      <div className="container-fluid px-2 mt-4">
        <div className="admin-form-grid">

        

          <div className="personal-information-card shadow">
            <div className="card bg-white rounded-3 p-2">

              <div className="card-header bg-white border-0">
                <strong>
                  <span className="p-1 rounded-5 bg-primary me-2">
                    <FaRegUser
                      size={20}
                      className="text-white"
                    />
                  </span>

                  Personal Information
                </strong>
              </div>

              <div className="card-body">

                {/* SCHOOL */}

                <div className="row g-3">

                  <div className="col-md-4">
                    <label className="form-label">
                      <h6>
                        School{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <select
                      name="schoolId"
                      className="form-select"
                      value={formData.schoolId}
                      onChange={handleInputChange}
                    >
                      <option value="">
                        Select School
                      </option>

                      {schools.map((school) => (
                        <option
                          key={school.id}
                          value={school.id}
                        >
                          {school.schoolName ||
                            school.name ||
                            school.schoolCode}
                          {school.schoolCode
                            ? ` (${school.schoolCode})`
                            : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* FULL NAME */}

                  <div className="col-md-4">
                    <label className="form-label">
                      <h6>
                        Full Name{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* EMAIL */}

                  <div className="col-md-4">
                    <label className="form-label">
                      <h6>
                        Email Address{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <div className="otp-group">

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email address"
                        value={formData.email}
                        disabled={emailVerified}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }));

                          setEmailVerified(false);
                          setShowEmailOtp(false);
                          setEmailOtp("");
                        }}
                      />

                      <button
                        type="button"
                        className={`btn ${
                          emailVerified
                            ? "btn-success"
                            : "btn-outline-primary"
                        } otp-btn`}
                        disabled={
                          sendingEmailOtp ||
                          emailVerified ||
                          !formData.email.trim()
                        }
                        onClick={sendEmailOtp}
                      >
                        {sendingEmailOtp ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" />
                            Sending
                          </>
                        ) : emailVerified ? (
                          "Verified"
                        ) : (
                          <>
                            <FaPaperPlane
                              className="me-1"
                              size={14}
                            />
                            OTP
                          </>
                        )}
                      </button>
                    </div>

                    {/* EMAIL OTP */}

                    {showEmailOtp &&
                      !emailVerified && (
                        <div className="mt-2">

                          <div className="input-group">

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter 6-digit OTP"
                              maxLength={6}
                              value={emailOtp}
                              onChange={(e) =>
                                setEmailOtp(
                                  e.target.value.replace(
                                    /\D/g,
                                    ""
                                  )
                                )
                              }
                            />

                            <button
                              type="button"
                              className="btn btn-outline-success"
                              disabled={
                                verifyingEmailOtp ||
                                emailOtp.length !== 6
                              }
                              onClick={
                                verifyEmailOtp
                              }
                            >
                              {verifyingEmailOtp ? (
                                <span className="spinner-border spinner-border-sm" />
                              ) : (
                                "Verify"
                              )}
                            </button>

                          </div>

                          <small className="text-muted">
                            OTP expires in 5 minutes.
                          </small>

                        </div>
                      )}

                    {emailVerified && (
                      <small className="text-success d-block mt-2 fw-semibold">
                        ✓ Email address verified
                      </small>
                    )}
                  </div>

                </div>

                {/* PHONE / ALTERNATE / DOB */}

                <div className="row g-3 mt-1">

                  {/* PHONE */}

                  <div className="col-md-4">

                    <label className="form-label">
                      <h6>
                        Phone Number{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <div className="otp-group">

                      <input
                        type="text"
                        name="phoneNumber"
                        className="form-control"
                        placeholder="Enter 10 digit phone no"
                        maxLength={10}
                        value={
                          formData.phoneNumber
                        }
                        disabled={phoneVerified}
                        onChange={(e) => {

                          const value =
                            e.target.value.replace(
                              /\D/g,
                              ""
                            );

                          setFormData((prev) => ({
                            ...prev,
                            phoneNumber: value,
                          }));

                          setPhoneVerified(false);
                          setShowPhoneOtp(false);
                          setPhoneOtp("");
                        }}
                      />

                      <button
                        type="button"
                        className={`btn ${
                          phoneVerified
                            ? "btn-success"
                            : "btn-outline-primary"
                        } otp-btn`}
                        disabled={
                          sendingPhoneOtp ||
                          phoneVerified ||
                          formData.phoneNumber
                            .length !== 10
                        }
                        onClick={sendPhoneOtp}
                      >
                        {sendingPhoneOtp ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" />
                            Sending
                          </>
                        ) : phoneVerified ? (
                          "Verified"
                        ) : (
                          <>
                            <FaPaperPlane
                              className="me-1"
                              size={14}
                            />
                            OTP
                          </>
                        )}
                      </button>
                    </div>

                    {/* PHONE OTP */}

                    {showPhoneOtp &&
                      !phoneVerified && (
                        <div className="mt-2">

                          <div className="input-group">

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter 6-digit OTP"
                              maxLength={6}
                              value={phoneOtp}
                              onChange={(e) =>
                                setPhoneOtp(
                                  e.target.value.replace(
                                    /\D/g,
                                    ""
                                  )
                                )
                              }
                            />

                            <button
                              type="button"
                              className="btn btn-outline-success"
                              disabled={
                                verifyingPhoneOtp ||
                                phoneOtp.length !== 6
                              }
                              onClick={
                                verifyPhoneOtp
                              }
                            >
                              {verifyingPhoneOtp ? (
                                <span className="spinner-border spinner-border-sm" />
                              ) : (
                                "Verify"
                              )}
                            </button>

                          </div>

                          <small className="text-muted">
                            OTP expires in 5 minutes.
                          </small>

                        </div>
                      )}

                    {phoneVerified && (
                      <small className="text-success d-block mt-2 fw-semibold">
                        ✓ Phone number verified
                      </small>
                    )}
                  </div>

                  {/* ALTERNATE PHONE */}

                  <div className="col-md-4">
                    <label className="form-label">
                      <h6>
                        Alternate Phone
                      </h6>
                    </label>

                    <input
                      type="text"
                      name="alternatePhone"
                      className="form-control"
                      placeholder="Enter alternate phone"
                      value={
                        formData.alternatePhone
                      }
                      onChange={
                        handleInputChange
                      }
                    />
                  </div>

                  {/* DOB */}

                  <div className="col-md-4">
                    <label className="form-label">
                      <h6>
                        Date of Birth{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <input
                      type="date"
                      name="dateOfBirth"
                      className="form-control"
                      value={
                        formData.dateOfBirth
                      }
                      onChange={
                        handleInputChange
                      }
                    />
                  </div>

                </div>

                {/* GENDER */}

                <div className="row g-3 mt-1">

                  <div className="col-md-4">
                    <label className="form-label">
                      <h6>
                        Gender{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <select
                      name="gender"
                      className="form-select"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">
                        Select
                      </option>

                      <option value="MALE">
                        Male
                      </option>

                      <option value="FEMALE">
                        Female
                      </option>

                      <option value="OTHER">
                        Other
                      </option>
                    </select>
                  </div>

                </div>

                {/* PROFILE PICTURE */}

                <div className="row g-3 mt-2">

                  <div className="col-md-5">

                    <label className="form-label">
                      <h6>
                        Profile Picture
                      </h6>
                    </label>

                    {existingLogo &&
                      !selectedFile && (
                        <div className="text-center mb-3">

                          <img
                            src={existingLogo}
                            alt="Profile"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "contain",
                              border:
                                "1px solid #dee2e6",
                              borderRadius: "10px",
                              padding: "5px",
                            }}
                          />

                          <div className="small text-muted mt-2">
                            Current Profile Picture
                          </div>

                        </div>
                      )}

                    <div className="custom-upload-box">

                      <div className="upload-icon">
                        <FaArrowUpFromBracket />
                      </div>

                      <div className="fw-semibold">

                        <span className="text-primary">
                          Click to upload
                        </span>

                        <span className="text-muted small">
                          {" "}
                          or drag and drop
                        </span>

                      </div>

                      <div className="text-muted small">
                        Recommended size:
                        200 × 200 px
                      </div>

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                        className="custom-file-input"
                        onChange={
                          handleFileChange
                        }
                      />

                    </div>

                    {selectedFile && (
                      <div className="mt-2 small text-success">
                        ✓ {selectedFile.name}
                      </div>
                    )}

                  </div>

                </div>

              </div>
            </div>
          </div>

          <div className="role-permission-card shadow">

            <div className="card bg-white  rounded-3 p-2">

              <div className="card-header bg-white border-0">

                <strong>

                  <span className="p-1 rounded-5 bg-primary me-2">
                    <SiAdguard
                      size={20}
                      className="text-white"
                    />
                  </span>

                  Role & Permissions

                </strong>

              </div>

              <div className="card-body">

                {/* USER GROUP */}

                <div className="row">

                  <div className="col-md-12">

                    <label className="form-label">
                      <h6>
                        Assign Role{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                   <select
  name="userGroupId"
  className="form-select"
  value={formData.userGroupId}
  onChange={handleInputChange}
>
  <option value="">
    Select Role
  </option>

  {userGroup.map((usergroup) => (
    <option
      key={usergroup.id}
      value={usergroup.id}
    >
      {usergroup.groupName ||
        usergroup.name ||
        usergroup.role}
    </option>
  ))}
</select>

                    <small className="text-muted">
                      Super admin has full access
                      to entire system.
                    </small>

                  </div>

                </div>

                {/* PERMISSIONS */}

                <div className="row mt-3">

                  <div className="col-md-12">

                    <label className="form-label">
                      <h6>
                        Permissions
                      </h6>
                    </label>

                    <div className="alert alert-primary mb-0">

                      <span className="fs-6">
                        Super admin will have
                        full access to all
                        modules, menus, users,
                        and system settings.
                      </span>

                    </div>

                  </div>

                </div>

                {/* PERMISSION LIST */}

                <div className="row mt-3">

                  <div className="col-12">

                    <div className="permission-list">

                      {permissions.map(
                        (permission) => (
                          <div
                            key={permission}
                            className="d-flex align-items-center gap-2 mb-3"
                          >

                            <span className="permission-check">
                              ✓
                            </span>

                            <span>
                              {permission}
                            </span>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="account-information-card shadow">

            <div className="card bg-white  rounded-3 p-2">

              <div className="card-header bg-white border-0">

                <strong>

                  <span className="p-1 rounded-5 bg-primary me-2">
                    <FaRegUser
                      size={20}
                      className="text-white"
                    />
                  </span>

                  Account Information

                </strong>

              </div>

              <div className="card-body">

                <div className="row g-3">

                  {/* PASSWORD */}

                  <div className="col-md-6">

                    <label className="form-label">
                      <h6>
                        Password{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={
                        formData.password
                      }
                      onChange={
                        handleInputChange
                      }
                    />

                    <small className="text-muted">
                      Password must be at
                      least 8 characters long.
                    </small>

                  </div>

                  {/* CONFIRM PASSWORD */}

                  <div className="col-md-6">

                    <label className="form-label">
                      <h6>
                        Confirm Password{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm password"
                      value={
                        formData.confirmPassword
                      }
                      onChange={
                        handleInputChange
                      }
                    />

                  </div>

                </div>

                {/* SECURITY */}

                <div className="row g-3 mt-3">

                  <div className="col-md-6">

                    <label className="form-label">
                      <h6>
                        Security Question{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <select
                      name="securityQuestion"
                      className="form-select"
                      value={
                        formData.securityQuestion
                      }
                      onChange={
                        handleInputChange
                      }
                    >

                      <option value="">
                        Select security question
                      </option>

                      {securityQuestions.map(
                        (question) => (
                          <option
                            key={question}
                            value={question}
                          >
                            {question}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  <div className="col-md-6">

                    <label className="form-label">
                      <h6>
                        Security Answer{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <input
                      type="text"
                      name="securityAnswer"
                      className="form-control"
                      placeholder="Enter security answer"
                      value={
                        formData.securityAnswer
                      }
                      onChange={
                        handleInputChange
                      }
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div
            className="status-setting-card shadow"
            style={{ marginTop: "100px" }}
          >

            <div className="card bg-white  rounded-3 p-2">

              <div className="card-header bg-white border-0">

                <strong>

                  <span className="p-1 rounded-5 bg-primary me-2">
                    <IoMdSettings
                      size={20}
                      className="text-white"
                    />
                  </span>

                  Status & Settings

                </strong>

              </div>

              <div className="card-body">

                <SectionCard className="mt-3">

                  <ToggleRow
                    label="Account Status"
                    checked={
                      formData.accountStatus
                    }
                    name="accountStatus"
                    onChange={
                      handleSwitchChange
                    }
                    activeText="Active"
                    helper="Inactive accounts cannot login to the system."
                  />

                  <ToggleRow
                    label="Two Factor Authentication"
                    checked={
                      formData.twoFactorAuthentication
                    }
                    name="twoFactorAuthentication"
                    onChange={
                      handleSwitchChange
                    }
                    activeText="Enable Two Factor Authentication"
                    helper="User will need verification codes at login."
                    className="mt-4"
                  />

                  <ToggleRow
                    label="Login Notification"
                    checked={
                      formData.loginNotification
                    }
                    name="loginNotification"
                    onChange={
                      handleSwitchChange
                    }
                    activeText="Send email notification on login"
                    helper="You will receive an email on this admin's login."
                    className="mt-4"
                  />

                </SectionCard>

              </div>

            </div>

          </div>


          <div className="additional-information-card shadow">

            <div className="card bg-white rounded-3 p-2">

              <div className="card-header bg-white border-0">

                <strong>

                  <span className="p-1 rounded-5 bg-primary me-2">
                    <FaRegUser
                      size={20}
                      className="text-white"
                    />
                  </span>

                  Additional Information

                </strong>

              </div>

              <div className="card-body">

                <div className="row g-3">

                  {/* ADDRESS */}

                  <div className="col-md-8">

                    <label className="form-label">
                      <h6>
                        Address
                      </h6>
                    </label>

                    <textarea
                      name="address"
                      className="form-control"
                      placeholder="Enter address"
                      value={
                        formData.address
                      }
                      onChange={
                        handleInputChange
                      }
                    />

                  </div>

                  {/* LANGUAGE */}

                  <div className="col-md-4">

                    <label className="form-label">
                      <h6>
                        Language Preference
                      </h6>
                    </label>

                    <select
                      name="languagePreference"
                      className="form-select"
                      value={
                        formData.languagePreference
                      }
                      onChange={
                        handleInputChange
                      }
                    >

                      <option value="">
                        Select Language
                      </option>

                      {languages.map(
                        (item) => (
                          <option
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>

                <div className="row g-3 mt-3">

                  {/* TIME ZONE */}

                  <div className="col-md-7">

                    <label className="form-label">
                      <h6>
                        Time Zone
                      </h6>
                    </label>

                    <select
                      name="timeZone"
                      className="form-select"
                      value={
                        formData.timeZone
                      }
                      onChange={
                        handleInputChange
                      }
                    >

                      <option value="">
                        Select time zone
                      </option>

                      {timeZones.map(
                        (item) => (
                          <option
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* NOTE */}

                  <div className="col-md-5">

                    <label className="form-label">
                      <h6>
                        Note (Optional)
                      </h6>
                    </label>

                    <textarea
                      name="note"
                      className="form-control"
                      placeholder="Enter any additional note"
                      value={
                        formData.note
                      }
                      onChange={
                        handleInputChange
                      }
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="row mt-3 mb-4">

          <div className="d-flex justify-content-end gap-3 flex-wrap">

            {/* RESET */}

            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={resetForm}
              disabled={creatingUser}
            >
              <FaArrowsRotate
                size={15}
                className="me-1"
              />

              Reset
            </button>

            {/* CREATE */}

            <button
              type="button"
              className="btn btn-success"
              onClick={createSuperAdmin}
              disabled={
                creatingUser ||
                !phoneVerified ||
                !emailVerified
              }
            >

              {creatingUser ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1" />

                  Creating...
                </>
              ) : (
                <>
                  <MdOutlineGridView
                    size={15}
                    className="me-1"
                  />

                  Create Super Admin
                </>
              )}

            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>
        {`

        /* =====================================================
           OTP
        ===================================================== */

        .otp-group {
          display: flex;
          width: 100%;
        }

        .otp-group .form-control {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        .otp-group .otp-btn {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          min-width: 75px;
          white-space: nowrap;
        }

        /* =====================================================
           GRID
        ===================================================== */

        .admin-form-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 2fr)
            minmax(320px, 1fr);

          gap: 16px;
          align-items: start;
        }

        .personal-information-card {
          grid-column: 1;
          grid-row: 1;
        }

        .role-permission-card {
          grid-column: 2;
          grid-row: 1 / span 2;
        }

        .account-information-card {
          grid-column: 1;
          grid-row: 2;
        }

        .additional-information-card {
          grid-column: 1;
          grid-row: 3;
        }

        .status-setting-card {
          grid-column: 2;
          grid-row: 2 / span 2;
        }

        /* =====================================================
           UPLOAD
        ===================================================== */

        .custom-upload-box {
          position: relative;

          border: 2px dashed #ced4da;
          border-radius: 10px;

          min-height: 170px;

          padding: 25px;

          text-align: center;

          background-color: #f8f9fa;

          cursor: pointer;

          display: flex;
          flex-direction: column;

          justify-content: center;
          align-items: center;

          transition: all 0.2s ease;
        }

        .custom-upload-box:hover {
          border-color: #0d6efd;
          background-color: #f1f6ff;
        }

        .upload-icon {
          font-size: 32px;
          margin-bottom: 8px;
          color: #0d6efd;
        }

        .custom-file-input {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          opacity: 0;

          cursor: pointer;
        }

        /* =====================================================
           PERMISSIONS
        ===================================================== */

        .permission-list {
          border: 1px solid #e7e9ef;

          border-radius: 8px;

          padding:
            14px
            12px
            4px;
        }

        .permission-check {
          width: 16px;
          height: 16px;

          display: inline-flex;

          align-items: center;
          justify-content: center;

          border-radius: 3px;

          background: #20b26b;

          color: #fff;

          font-size: 11px;

          font-weight: 700;

          flex-shrink: 0;
        }

        /* =====================================================
           SWITCH
        ===================================================== */

        .green-switch {
          width: 35px !important;
          height: 20px !important;

          cursor: pointer;
        }

        /* =====================================================
           MOBILE / TABLET
        ===================================================== */

        @media (max-width: 1199px) {

          .admin-form-grid {
            grid-template-columns: 1fr;
          }

          .personal-information-card,
          .role-permission-card,
          .account-information-card,
          .additional-information-card,
          .status-setting-card {

            grid-column: 1;
            grid-row: auto;

          }

          .status-setting-card {
            margin-top: 0 !important;
          }
        }

        @media (max-width: 576px) {

          .otp-group {
            flex-direction: column;
          }

          .otp-group .form-control {
            border-radius: 0.375rem;
          }

          .otp-group .otp-btn {
            border-radius: 0.375rem;

            margin-top: 5px;

            width: 100%;
          }

        }

        `}
      </style>
    </>
  );
};

// =========================================================
// TOGGLE ROW
// =========================================================

const ToggleRow = ({
  label,
  checked,
  name,
  onChange,
  activeText,
  helper,
  className = "",
}) => {
  return (
    <div className={className}>

      <label className="form-label fw-semibold">
        {label}
      </label>

      <div className="d-flex align-items-center gap-2">

        <div className="form-check form-switch mb-0">

          <input
            className="form-check-input custom-switch"
            type="checkbox"
            role="switch"
            name={name}
            checked={checked}
            onChange={onChange}
          />

        </div>

        <span className="fw-semibold">
          {activeText}
        </span>

      </div>

      <small className="text-muted d-block mt-1">
        {helper}
      </small>

    </div>
  );
};

export default SuperAdminCreation;