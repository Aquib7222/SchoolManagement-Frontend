
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaIdCard,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFileAlt,
  FaShieldAlt,
  FaGraduationCap,
  FaBriefcase,
  FaCamera,
  FaPen,
  FaSave,
} from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const AddTeacher = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(employeeId);

  const [loading, setLoading] = useState(false);

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
    pfUniversalAccount: "",
    basicPayment: "",
    bankInfo: "",
    ifscCode: "",
    certificates: "",
    schoolSponsorship: "",
    sponsorName: "",
    sponsorContact: "",

    maritalStatus: "",
    spouseName: "",
    spouseGender: "",
    spouseDOB: "",
    firstChildName: "",
    firstChildGender: "",
    firstChildDOB: "",
    secondChildName: "",
    secondChildGender: "",
    secondChildDOB: "",
    numberOfChild: "",

    religion: "",
    caste: "",

    photo: "",
    signature: "",

    qualification: "",
    degreeBoard: "",
    passingYear: "",
    percentage: "",

    active: true,
  });

  const [qualifications, setQualifications] = useState([
    {
      qualification: "",
      university: "",
      year: "",
      percentage: "",
    },
    {
      qualification: "",
      university: "",
      year: "",
      percentage: "",
    },
    {
      qualification: "",
      university: "",
      year: "",
      percentage: "",
    },
    {
      qualification: "",
      university: "",
      year: "",
      percentage: "",
    },
  ]);

  const [experiences, setExperiences] = useState([
    {
      company: "",
      designation: "",
      fromDate: "",
      toDate: "",
      totalExp: "",
    },
    {
      company: "",
      designation: "",
      fromDate: "",
      toDate: "",
      totalExp: "",
    },
    {
      company: "",
      designation: "",
      fromDate: "",
      toDate: "",
      totalExp: "",
    },
  ]);

  /* =========================
     FETCH TEACHER FOR EDIT
  ========================= */

  useEffect(() => {
    const fetchTeacher = async () => {
      if (!employeeId) return;

      try {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        const schoolId = user?.school?.id;

        const res = await axiosInstance.get("/api/teachers/search", {
          params: {
            employeeId,
            schoolId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData((prev) => ({
          ...prev,
          ...res.data,
        }));
      } catch (error) {
        console.error(
          "Teacher fetch error:",
          error.response?.data || error.message,
        );

        alert("Teacher not found");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [employeeId, navigate]);

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* =========================
     IMAGE UPLOAD
  ========================= */

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        [field]: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  /* =========================
     QUALIFICATION
  ========================= */

  const handleQualificationChange = (index, field, value) => {
    setQualifications((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  /* =========================
     EXPERIENCE
  ========================= */

  const handleExperienceChange = (index, field, value) => {
    setExperiences((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      const schoolId = loggedInUser?.school?.id;

      if (!schoolId) {
        alert("School not found");
        return;
      }

      const payload = {
        ...formData,
        qualifications,
        experiences,
      };

      if (isEditMode) {
        await axiosInstance.put(
          `/api/teachers/${employeeId}`,
          payload,
          {
            params: {
              schoolId,
            },
          },
        );

        alert("Teacher updated successfully");
      } else {
        await axiosInstance.post(
          `/api/teachers?schoolId=${schoolId}`,
          payload,
        );

        alert("Teacher added successfully");
      }

      navigate(-1);
    } catch (error) {
      console.error(
        "Teacher save error:",
        error.response?.data || error.message,
      );

      alert(
        error.response?.data?.message ||
          `Failed to ${isEditMode ? "update" : "add"} teacher`,
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     COMMON FIELD
  ========================= */

  const Field = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder = "",
    children,
    className = "",
  }) => {
    return (
      <div className={`col-12 col-md-6 col-xl-3 ${className}`}>
        <label className="form-label fw-semibold">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>

        {children ? (
          children
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name] ?? ""}
            onChange={handleChange}
            placeholder={placeholder}
            className="form-control teacher-input"
          />
        )}
      </div>
    );
  };

  /* =========================
     SELECT
  ========================= */

  const SelectField = ({
    label,
    name,
    options,
    required = false,
  }) => {
    return (
      <div className="col-12 col-md-6 col-xl-3">
        <label className="form-label fw-semibold">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>

        <select
          name={name}
          value={formData[name] ?? ""}
          onChange={handleChange}
          className="form-select teacher-input"
        >
          <option value="">Select {label}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };

  /* =========================
     SECTION HEADER
  ========================= */

  const SectionHeader = ({ icon, title, subtitle }) => (
    <div className="teacher-section-header">
      <div className="teacher-section-icon">{icon}</div>

      <div>
        <h5 className="mb-0 fw-bold">{title}</h5>
        {subtitle && (
          <small className="text-muted">{subtitle}</small>
        )}
      </div>
    </div>
  );

  if (loading && isEditMode && !formData.employeeId) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          .teacher-page {
            padding-bottom: 30px;
          }

          .teacher-breadcrumb {
            background: #fff;
            border-radius: 12px;
            padding: 18px 22px;
            margin: 10px;
            box-shadow: 0 3px 15px rgba(0,0,0,0.06);
          }

          .teacher-breadcrumb h6 {
            margin-bottom: 5px;
          }

          .teacher-card {
            background: #fff;
            border-radius: 12px;
            margin: 18px 10px;
            box-shadow: 0 4px 18px rgba(0,0,0,0.06);
            border: 1px solid #eef1f5;
            overflow: hidden;
          }

          .teacher-card-body {
            padding: 20px;
          }

          .teacher-section-header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 15px;
            margin-bottom: 20px;
            border-radius: 9px;
            background: linear-gradient(
              90deg,
              rgba(13,110,253,0.10),
              rgba(13,110,253,0.025)
            );
            border-left: 4px solid #0d6efd;
          }

          .teacher-section-icon {
            width: 38px;
            height: 38px;
            min-width: 38px;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0d6efd;
            color: #fff;
          }

          .teacher-input {
            min-height: 42px;
            border-radius: 7px;
            border: 1px solid #dfe3e8;
            font-size: 14px;
            transition: all 0.2s ease;
          }

          .teacher-input:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.15rem rgba(13,110,253,0.10);
          }

          .teacher-form-row {
            row-gap: 18px;
          }

          .teacher-photo-box {
            border: 1px dashed #cfd6df;
            border-radius: 10px;
            padding: 15px;
            background: #fafbfc;
          }

          .teacher-preview {
            width: 110px;
            height: 110px;
            object-fit: cover;
            border-radius: 10px;
            border: 1px solid #ddd;
          }

          .teacher-table th {
            background: #f7f8fa;
            font-size: 14px;
            white-space: nowrap;
          }

          .teacher-table td {
            vertical-align: middle;
          }

          .teacher-action-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            padding: 18px 20px;
            background: #fff;
            border-radius: 12px;
            margin: 18px 10px 0;
            box-shadow: 0 4px 18px rgba(0,0,0,0.06);
          }

          @media (max-width: 767px) {
            .teacher-card-body {
              padding: 14px;
            }

            .teacher-action-bar {
              flex-direction: column;
              align-items: stretch;
            }

            .teacher-action-bar button {
              width: 100%;
            }
          }
        `}
      </style>

      <div className="teacher-page ">
        

        <div className="teacher-breadcrumb shadow">
          <h6>
            <strong>
              {isEditMode ? "Edit Teacher" : "Add Teacher"}
            </strong>
          </h6>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <span
                  role="button"
                  onClick={() => navigate("/")}
                  style={{
                    cursor: "pointer",
                    color: "#555",
                  }}
                >
                  Home
                </span>
              </li>

              <li className="breadcrumb-item active">
                {isEditMode ? "Edit Teacher" : "Add Teacher"}
              </li>
            </ol>
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          

          <div className="teacher-card shadow">
            <div className="teacher-card-body">
              <SectionHeader
                icon={<FaUser />}
                title="Basic Details"
                subtitle="Teacher's personal and professional information"
              />

              <div className="row teacher-form-row">
                <Field
                  label="Employee ID"
                  name="employeeId"
                  required
                />

                <Field
                  label="First Name"
                  name="firstName"
                  required
                />

                <Field
                  label="Middle Name"
                  name="middleName"
                />

                <Field
                  label="Last Name"
                  name="lastName"
                  required
                />

                <Field
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  required
                />

                <Field
                  label="Father's Name"
                  name="fatherName"
                  required
                />

                <Field
                  label="Date of Joining"
                  name="doj"
                  type="date"
                  required
                />

                <SelectField
                  label="Status"
                  name="status"
                  required
                  options={[
                    "Working",
                    "Resign",
                    "MaternityLeave",
                    "LongLeave",
                  ]}
                />

                <SelectField
                  label="Gender"
                  name="gender"
                  required
                  options={[
                    "Male",
                    "Female",
                    "NotApplicable",
                  ]}
                />

                <SelectField
                  label="Category"
                  name="category"
                  required
                  options={[
                    "Teaching",
                    "NonTeaching",
                    "Admin",
                    "Transport",
                  ]}
                />

                <Field
                  label="Nationality"
                  name="nationality"
                  required
                />

                <SelectField
                  label="Blood Group"
                  name="bloodGroup"
                  required
                  options={[
                    "A+",
                    "A-",
                    "B+",
                    "B-",
                    "AB+",
                    "AB-",
                    "O+",
                    "O-",
                    "NA",
                  ]}
                />

                <SelectField
                  label="Department"
                  name="department"
                  required
                  options={[
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
                  ]}
                />

                <SelectField
                  label="Designation"
                  name="designation"
                  required
                  options={[
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
                  ]}
                />

                <SelectField
                  label="Teaching Level"
                  name="teachingLevel"
                  required
                  options={[
                    "Pre-Primary",
                    "Primary School",
                    "Middle School",
                    "Higher School",
                  ]}
                />

                <SelectField
                  label="Employee Type"
                  name="employeeType"
                  required
                  options={[
                    "Permanent",
                    "Temporary",
                  ]}
                />
              </div>
            </div>
          </div>

         

          <div className="teacher-card shadow">
            <div className="teacher-card-body">
              <SectionHeader
                icon={<FaPhoneAlt />}
                title="Contact Details"
                subtitle="Phone, email and emergency contact information"
              />

              <div className="row teacher-form-row">
                <Field
                  label="Phone Number"
                  name="phoneNumber"
                  required
                />

                <Field
                  label="Alternate Phone Number"
                  name="alternatePhoneNumber"
                />

                <Field
                  label="Mobile Number"
                  name="mobileNumber"
                  required
                />

                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                />

                <Field
                  label="Emergency Contact"
                  name="emergencyContact"
                  required
                />

                <SelectField
                  label="Emergency Relation"
                  name="emergencyRelation"
                  options={[
                    "Father",
                    "Mother",
                    "Sibling",
                    "Relative",
                    "Other",
                  ]}
                />
              </div>
            </div>
          </div>

          

          <div className="teacher-card shadow">
            <div className="teacher-card-body">
              <SectionHeader
                icon={<FaMapMarkerAlt />}
                title="Address Details"
                subtitle="Residential address information"
              />

              <div className="row teacher-form-row">
                <Field
                  label="Address Line 1"
                  name="addressLine1"
                  required
                />

                <Field
                  label="Address Line 2"
                  name="addressLine2"
                />

                <Field
                  label="Address Line 3"
                  name="addressLine3"
                />

                <Field
                  label="City"
                  name="city"
                  required
                />

                <Field
                  label="State"
                  name="state"
                  required
                />

                <Field
                  label="Pincode"
                  name="pincode"
                  required
                />
              </div>
            </div>
          </div>

         

          <div className="teacher-card shadow">
            <div className="teacher-card-body">
              <SectionHeader
                icon={<FaIdCard />}
                title="Documents & Payroll"
                subtitle="Identity, statutory and payment information"
              />

              <div className="row teacher-form-row">
                <Field
                  label="Biometric Card Number"
                  name="biometricCard"
                />

                <Field
                  label="PF Number"
                  name="pfNumber"
                />

                <Field
                  label="PAN Number"
                  name="panNumber"
                  required
                />

                <Field
                  label="ESI Number"
                  name="esiNumber"
                />

                <Field
                  label="Aadhar Number"
                  name="aadharNumber"
                  required
                />

                <Field
                  label="PF Universal Account"
                  name="pfUniversalAccount"
                />

                <Field
                  label="Basic Payment"
                  name="basicPayment"
                />

                <Field
                  label="Bank Account Info"
                  name="bankInfo"
                />

                <Field
                  label="IFSC Code"
                  name="ifscCode"
                />

                <Field
                  label="Sponsor Name"
                  name="sponsorName"
                />

                <Field
                  label="Sponsor Contact"
                  name="sponsorContact"
                />

                <SelectField
                  label="School Sponsorship"
                  name="schoolSponsorship"
                  options={[
                    "Father",
                    "Mother",
                    "Relative",
                    "Other",
                  ]}
                />

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">
                    Certificates Submitted
                  </label>

                  <textarea
                    name="certificates"
                    rows="3"
                    value={formData.certificates ?? ""}
                    onChange={handleChange}
                    className="form-control teacher-input"
                    placeholder="Enter certificate details"
                  />
                </div>
              </div>
            </div>
          </div>

         

          <div className="teacher-card shadow">
            <div className="teacher-card-body">
              <SectionHeader
                icon={<FaShieldAlt />}
                title="Family & Insurance Details"
                subtitle="Marital and dependent information"
              />

              <div className="row teacher-form-row">
                <SelectField
                  label="Marital Status"
                  name="maritalStatus"
                  required
                  options={[
                    "Married",
                    "UnMarried",
                    "Divorced",
                    "Widowed",
                  ]}
                />

                <Field
                  label="Spouse Name"
                  name="spouseName"
                />

                <SelectField
                  label="Spouse Gender"
                  name="spouseGender"
                  options={[
                    "Male",
                    "Female",
                    "Other",
                  ]}
                />

                <Field
                  label="Spouse DOB"
                  name="spouseDOB"
                  type="date"
                />

                <Field
                  label="First Child Name"
                  name="firstChildName"
                />

                <SelectField
                  label="First Child Gender"
                  name="firstChildGender"
                  options={[
                    "Male",
                    "Female",
                    "Other",
                  ]}
                />

                <Field
                  label="First Child DOB"
                  name="firstChildDOB"
                  type="date"
                />

                <Field
                  label="Second Child Name"
                  name="secondChildName"
                />

                <SelectField
                  label="Second Child Gender"
                  name="secondChildGender"
                  options={[
                    "Male",
                    "Female",
                    "Other",
                  ]}
                />

                <Field
                  label="Second Child DOB"
                  name="secondChildDOB"
                  type="date"
                />

                <SelectField
                  label="Number of Child"
                  name="numberOfChild"
                  options={[
                    "0",
                    "1",
                    "2",
                    "3+",
                  ]}
                />
              </div>
            </div>
          </div>

          

          <div className="teacher-card shadow">
            <div className="teacher-card-body">
              <SectionHeader
                icon={<FaUser />}
                title="Religious Details"
                subtitle="Optional demographic information"
              />

              <div className="row teacher-form-row">
                <SelectField
                  label="Religion"
                  name="religion"
                  options={[
                    "Hindu",
                    "Muslim",
                    "Christian",
                    "Sikh",
                    "Other",
                  ]}
                />

                <SelectField
                  label="Caste"
                  name="caste"
                  options={[
                    "General",
                    "OBC",
                    "SC",
                    "ST",
                  ]}
                />
              </div>
            </div>
          </div>

         

          <div className="teacher-card shadow">
            <div className="teacher-card-body">
              <SectionHeader
                icon={<FaCamera />}
                title="Teacher Photo & Signature"
                subtitle="Upload profile photo and signature"
              />

              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <div className="teacher-photo-box">
                    <label className="form-label fw-semibold">
                      Profile Photo
                    </label>

                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      className="form-control teacher-input"
                      onChange={(e) =>
                        handleFileChange(e, "photo")
                      }
                    />

                    <small className="text-muted d-block mt-2">
                      Supported: JPG, JPEG, PNG
                    </small>

                    {formData.photo && (
                      <div className="mt-3">
                        <img
                          src={formData.photo}
                          alt="Teacher Preview"
                          className="teacher-preview"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="teacher-photo-box">
                    <label className="form-label fw-semibold">
                      Teacher Signature
                    </label>

                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      className="form-control teacher-input"
                      onChange={(e) =>
                        handleFileChange(e, "signature")
                      }
                    />

                    <small className="text-muted d-block mt-2">
                      Supported: JPG, JPEG, PNG
                    </small>

                    {formData.signature && (
                      <div className="mt-3">
                        <img
                          src={formData.signature}
                          alt="Signature Preview"
                          style={{
                            width: "180px",
                            height: "70px",
                            objectFit: "contain",
                            border: "1px solid #ddd",
                            borderRadius: "7px",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          

          <div className="teacher-card shadow">
            <div className="teacher-card-body">
              <SectionHeader
                icon={<FaGraduationCap />}
                title="Qualification Details"
                subtitle="Academic qualification history"
              />

              <div className="table-responsive">
                <table className="table table-bordered teacher-table align-middle mb-0">
                  <thead>
                    <tr className="text-center">
                      <th>Qualification</th>
                      <th>University / Board</th>
                      <th>Passing Year</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>

                  <tbody>
                    {qualifications.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="form-control teacher-input"
                            value={item.qualification}
                            onChange={(e) =>
                              handleQualificationChange(
                                index,
                                "qualification",
                                e.target.value,
                              )
                            }
                          />
                        </td>

                        <td>
                          <input
                            type="text"
                            className="form-control teacher-input"
                            value={item.university}
                            onChange={(e) =>
                              handleQualificationChange(
                                index,
                                "university",
                                e.target.value,
                              )
                            }
                          />
                        </td>

                        <td>
                          <input
                            type="text"
                            className="form-control teacher-input"
                            value={item.year}
                            onChange={(e) =>
                              handleQualificationChange(
                                index,
                                "year",
                                e.target.value,
                              )
                            }
                          />
                        </td>

                        <td>
                          <input
                            type="text"
                            className="form-control teacher-input"
                            value={item.percentage}
                            onChange={(e) =>
                              handleQualificationChange(
                                index,
                                "percentage",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ================= EXPERIENCE ================= */}

          <div className="teacher-card shadow">
            <div className="teacher-card-body">
              <SectionHeader
                icon={<FaBriefcase />}
                title="Work Experience"
                subtitle="Previous employment details"
              />

              <div className="table-responsive">
                <table className="table table-bordered teacher-table align-middle mb-0">
                  <thead>
                    <tr className="text-center">
                      <th>Company Name</th>
                      <th>Designation</th>
                      <th>Duration</th>
                      <th>Total Experience</th>
                    </tr>
                  </thead>

                  <tbody>
                    {experiences.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="form-control teacher-input"
                            value={item.company}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "company",
                                e.target.value,
                              )
                            }
                          />
                        </td>

                        <td>
                          <input
                            type="text"
                            className="form-control teacher-input"
                            value={item.designation}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "designation",
                                e.target.value,
                              )
                            }
                          />
                        </td>

                        <td>
                          <div className="row g-2">
                            <div className="col-12 col-md-6">
                              <small className="text-muted">
                                From
                              </small>

                              <input
                                type="date"
                                className="form-control teacher-input"
                                value={item.fromDate}
                                onChange={(e) =>
                                  handleExperienceChange(
                                    index,
                                    "fromDate",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>

                            <div className="col-12 col-md-6">
                              <small className="text-muted">
                                To
                              </small>

                              <input
                                type="date"
                                className="form-control teacher-input"
                                value={item.toDate}
                                onChange={(e) =>
                                  handleExperienceChange(
                                    index,
                                    "toDate",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                          </div>
                        </td>

                        <td>
                          <input
                            type="text"
                            className="form-control teacher-input"
                            value={item.totalExp}
                            placeholder="e.g. 2 Years"
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "totalExp",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

       

          <div className="teacher-action-bar shadow">
            <button
              type="button"
              className="btn btn-light border px-4"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              <FaArrowLeft className="me-2" />
              Back
            </button>

            <button
              type="submit"
              className="btn btn-success px-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                  />
                  Saving...
                </>
              ) : (
                <>
                  {isEditMode ? (
                    <FaPen className="me-2" />
                  ) : (
                    <FaSave className="me-2" />
                  )}

                  {isEditMode
                    ? "Update Teacher"
                    : "Add Teacher"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTeacher;
