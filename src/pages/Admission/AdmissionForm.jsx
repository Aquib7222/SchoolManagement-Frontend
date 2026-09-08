 


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheck,
  FaPlus,
  FaSave,
  FaTrash,
  FaUser,
  FaUsers,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaFileAlt,
  FaBus,
} from "react-icons/fa";
import axios from "../../api/axiosInstance";
import { LuBook } from "react-icons/lu";

/* =====================================================
   INITIAL FORM DATA
===================================================== */

const getInitialFormData = () => ({
  academicYear: "",
  academicType: "",
  invoice: "",
  today: new Date().toISOString().split("T")[0],

  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  gender: "",
  aadharNo: "",
  nationality: "",
  motherTongue: "",
  religion: "",
  category: "",
  caste: "",
  bloodGroup: "",
  transportRequired: "no",

  class: "",
  age: "",

  email: "",
  alternateNo: "",
  preferredNo: "",

  feeCategory: "",
  feeBatch: "",

  fatherName: "",
  fatherAadhar: "",
  fatherEducation: "",
  fatherEducationType: "",
  fatherEmail: "",
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
  motherJobType: "",
  motherLandline: "",
  motherMobile: "",
  motherOccupation: "",
  motherOrganization: "",
  motherOrganizationAddress: "",
  motherSpecialisation: "",

  guardianName: "",
  guardianAadhar: "",
  guardianEducation: "",
  guardianEducationType: "",
  guardianEmail: "",
  guardianJobType: "",
  guardianLandline: "",
  guardianMobile: "",
  guardianOccupation: "",
  guardianOrganization: "",
  guardianOrganizationAddress: "",
  guardianSpecialisation: "",

  houseNo: "",
  street: "",
  area: "",
  town: "",
  zip: "",
  state: "",
  city: "",
  country: "",

  permanentHouseNo: "",
  permanentStreet: "",
  permanentArea: "",
  permanentTown: "",
  permanentZip: "",
  permanentState: "",
  permanentCity: "",
  permanentCountry: "",
});

/* =====================================================
   SECTION HEADER
   IMPORTANT:
   Keep this OUTSIDE AdmissionForm
===================================================== */

const SectionHeader = ({ icon, title, subtitle }) => (
  <div className="premium-section-header">
    <div className="section-icon">
      {icon}
    </div>

    <div>
      <h5>{title}</h5>

      {subtitle && (
        <small>{subtitle}</small>
      )}
    </div>
  </div>
);

/* =====================================================
   FIELD COMPONENT
   IMPORTANT:
   Keep this OUTSIDE AdmissionForm
   This fixes input focus issue.
===================================================== */

const Field = ({
  label,
  name,
  type = "text",
  required = false,
  children,
  disabled = false,
  placeholder = "",
  formData,
  handleChange,
  ...props
}) => (
  <div className="col-xl-4 col-md-6 mb-3">

    <label className="premium-label">
      {label}

      {required && (
        <span className="text-danger ms-1">
          *
        </span>
      )}
    </label>

    {children ? (
      children
    ) : (
      <input
        type={type}
        name={name}
        value={formData[name] ?? ""}
        onChange={handleChange}
        className="form-control premium-input"
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
    )}

  </div>
);

/* =====================================================
   MAIN COMPONENT
===================================================== */

const AdmissionForm = () => {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const schoolId = user?.schoolId;

  const [formData, setFormData] = useState(
    getInitialFormData()
  );

  const [siblings, setSiblings] = useState([
    {
      siblingPresent: false,
      siblingAdm: "",
      siblingName: "",
      siblingClass: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const [sameAddress, setSameAddress] =
    useState(false);

  /* =====================================================
     BATCHES
  ===================================================== */

  const batches = [
    "Common/Private",
    "Common/Upto 5Km",
    "Common/Upto 10Km",
    "Common/Upto 10km Staff Child",
  ];

  /* =====================================================
     STANDARDS
  ===================================================== */

  const standards = [
    { value: "NURSERY", label: "Nursery" },
    { value: "LKG", label: "LKG" },
    { value: "UKG", label: "UKG" },
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
    { value: "IV", label: "IV" },
    { value: "V", label: "V" },
    { value: "VI", label: "VI" },
    { value: "VII", label: "VII" },
    { value: "VIII", label: "VIII" },
    { value: "IX", label: "IX" },
    { value: "X", label: "X" },
    { value: "XI", label: "XI" },
    { value: "XII", label: "XII" },
  ];

  /* =====================================================
     HANDLE FORM CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
            ? "yes"
            : "no"
          : value,
    }));
  };

  /* =====================================================
     SIBLING CHANGE
  ===================================================== */

  const handleSiblingChange = (index, e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setSiblings((prev) =>
      prev.map((sibling, i) =>
        i === index
          ? {
              ...sibling,

              [name]:
                type === "checkbox"
                  ? checked
                  : value,
            }
          : sibling
      )
    );
  };

  /* =====================================================
     ADD SIBLING
  ===================================================== */

  const handleAddMoreSiblings = () => {

    setSiblings((prev) => [
      ...prev,

      {
        siblingPresent: false,
        siblingAdm: "",
        siblingName: "",
        siblingClass: "",
      },
    ]);
  };

  /* =====================================================
     REMOVE SIBLING
  ===================================================== */

  const handleRemoveSibling = (index) => {

    setSiblings((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* =====================================================
     SAME ADDRESS
  ===================================================== */

  useEffect(() => {

    if (!sameAddress) {
      return;
    }

    setFormData((prev) => ({
      ...prev,

      permanentHouseNo: prev.houseNo,
      permanentStreet: prev.street,
      permanentArea: prev.area,
      permanentTown: prev.town,
      permanentZip: prev.zip,
      permanentState: prev.state,
      permanentCity: prev.city,
      permanentCountry: prev.country,
    }));

  }, [
    sameAddress,
    formData.houseNo,
    formData.street,
    formData.area,
    formData.town,
    formData.zip,
    formData.state,
    formData.city,
    formData.country,
  ]);

  /* =====================================================
     SAME ADDRESS CHECKBOX
  ===================================================== */

  const handleSameAddress = (e) => {

    const checked = e.target.checked;

    setSameAddress(checked);

    if (checked) {

      setFormData((prev) => ({
        ...prev,

        permanentHouseNo: prev.houseNo,
        permanentStreet: prev.street,
        permanentArea: prev.area,
        permanentTown: prev.town,
        permanentZip: prev.zip,
        permanentState: prev.state,
        permanentCity: prev.city,
        permanentCountry: prev.country,
      }));

    } else {

      setFormData((prev) => ({
        ...prev,

        permanentHouseNo: "",
        permanentStreet: "",
        permanentArea: "",
        permanentTown: "",
        permanentZip: "",
        permanentState: "",
        permanentCity: "",
        permanentCountry: "",
      }));

    }
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!schoolId) {

      alert(
        "School information not found. Please login again."
      );

      return;
    }

    if (!token) {

      alert(
        "Authentication token not found. Please login again."
      );

      return;
    }

    setLoading(true);

    try {

      const payload = {
        ...formData,

        schoolId: schoolId,

        studentClass: formData.class,

        siblings: siblings.filter(
          (sibling) =>
            sibling.siblingPresent ||
            sibling.siblingAdm ||
            sibling.siblingName ||
            sibling.siblingClass
        ),
      };

      delete payload.class;

      console.log(
        "Admission Payload:",
        payload
      );

      const response = await axios.post(
        "/api/admissions",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Admission Saved:",
        response.data
      );

      alert("Admission Applied 🎉");

      setFormData(
        getInitialFormData()
      );

      setSiblings([
        {
          siblingPresent: false,
          siblingAdm: "",
          siblingName: "",
          siblingClass: "",
        },
      ]);

      setSameAddress(false);

      navigate("/admission/new_admission");

    } catch (error) {

      console.error(
        "Admission Error:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Admission failed ❌";

      alert(message);

    } finally {

      setLoading(false);

    }
  };

  /* =====================================================
     COMMON CLASSES
  ===================================================== */

  const inputClass =
    "form-control premium-input";

  const selectClass =
    "form-select premium-input";

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      <style>{`

        .admission-page {
          min-height: 100vh;
          padding-bottom: 30px;
        }

        .premium-breadcrumb {
          background: #ffffff;
          border-radius: 14px;
          padding: 18px 22px;
          margin-bottom: 18px;
          border: 1px solid #e8eef7;
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.05);
          border-left: 5px solid #2563eb;
        }

        .premium-breadcrumb h4 {
          margin: 0;
          font-weight: 700;
          color: #172033;
        }

        .premium-breadcrumb p {
          margin: 5px 0 0;
          color: #64748b;
          font-size: 13px;
        }

        .premium-form-card {
          background: #ffffff;
          border: 1px solid #e5ebf4;
          border-radius: 18px;
          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
          overflow: hidden;
        }

        .premium-topbar {
          padding: 20px 24px;
          border-bottom: 1px solid #edf1f7;
          background: linear-gradient(
            135deg,
            #ffffff,
            #f8fbff
          );

          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
        }

        .premium-topbar-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .top-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #eff6ff;
          color: #2563eb;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 18px;
        }

        .premium-topbar h5 {
          margin: 0;
          font-weight: 700;
          color: #172033;
        }

        .premium-topbar small {
          color: #64748b;
        }

        .premium-section {
          padding: 24px;
          border-bottom: 1px solid #edf1f7;
        }

        .premium-section:last-child {
          border-bottom: 0;
        }

        .premium-section-header {
          display: flex;
          align-items: center;
          gap: 12px;

          padding: 13px 16px;

          border-radius: 12px;
          margin-bottom: 22px;

          background: linear-gradient(
            135deg,
            #eff6ff,
            #f8fbff
          );

          border: 1px solid #dbeafe;
        }

        .section-icon {
          width: 38px;
          height: 38px;
          min-width: 38px;

          border-radius: 10px;

          background: #2563eb;
          color: #ffffff;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .premium-section-header h5 {
          margin: 0;
          color: #1e3a8a;
          font-weight: 700;
          font-size: 16px;
        }

        .premium-section-header small {
          color: #64748b;
          font-size: 12px;
        }

        .premium-label {
          display: block;
          color: #334155;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 7px;
        }

        .premium-input {
          min-height: 43px;

          border: 1px solid #d8e0eb;
          border-radius: 9px;

          background: #ffffff;
          color: #1e293b;

          font-size: 14px;
          padding: 9px 12px;

          transition: all 0.2s ease;

          box-shadow:
            0 1px 2px rgba(15, 23, 42, 0.02);
        }

        .premium-input:hover {
          border-color: #b9c8dc;
        }

        .premium-input:focus {
          border-color: #3b82f6;

          box-shadow:
            0 0 0 3px rgba(37, 99, 235, 0.10);

          outline: none;
        }

        .premium-input:disabled {
          background: #f1f5f9;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .premium-textarea {
          min-height: 80px;
          resize: vertical;
        }

        .switch-box {
          min-height: 43px;

          display: flex;
          align-items: center;
          gap: 10px;

          padding: 7px 12px;

          border: 1px solid #d8e0eb;
          border-radius: 9px;

          background: #ffffff;
        }

        .switch-box input {
          width: 19px;
          height: 19px;

          accent-color: #2563eb;
          cursor: pointer;
        }

        .switch-label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }

        .sibling-card {
          border: 1px solid #e1e8f2;
          border-radius: 14px;

          padding: 18px;

          background: #fbfdff;

          margin-bottom: 15px;
        }

        .sibling-number {
          display: inline-flex;

          width: 30px;
          height: 30px;

          border-radius: 9px;

          background: #eff6ff;
          color: #2563eb;

          align-items: center;
          justify-content: center;

          font-weight: 700;
          font-size: 13px;

          margin-bottom: 12px;
        }

        .address-note {
          display: flex;
          align-items: center;
          gap: 8px;

          padding: 10px 13px;

          border-radius: 9px;

          background: #f0fdf4;
          color: #166534;

          border: 1px solid #bbf7d0;

          font-size: 13px;
          font-weight: 600;

          margin-bottom: 18px;
        }

        .premium-footer {
          padding: 20px 24px;

          background: #f8fafc;

          border-top: 1px solid #e7edf5;

          display: flex;
          justify-content: flex-end;

          gap: 10px;
        }

        .premium-btn {
          border-radius: 9px;

          padding: 10px 19px;

          font-weight: 600;
          font-size: 13px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          transition: all 0.2s ease;
        }

        .premium-btn-primary {
          background: #2563eb;
          color: white;

          border: 1px solid #2563eb;

          box-shadow:
            0 4px 12px rgba(37, 99, 235, 0.20);
        }

        .premium-btn-primary:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
          color: white;

          transform: translateY(-1px);
        }

        .premium-btn-secondary {
          background: #ffffff;
          color: #475569;

          border: 1px solid #cbd5e1;
        }

        .premium-btn-secondary:hover {
          background: #f8fafc;
          color: #1e293b;
        }

        .premium-btn-danger {
          background: #fff1f2;
          color: #dc2626;

          border: 1px solid #fecdd3;
        }

        .premium-btn-danger:hover {
          background: #fee2e2;
          color: #b91c1c;
        }

        .premium-btn-add {
          background: #eff6ff;
          color: #2563eb;

          border: 1px solid #bfdbfe;
        }

        .premium-btn-add:hover {
          background: #dbeafe;
        }

        .required-info {
          font-size: 12px;
          color: #64748b;
        }

        @media (max-width: 767px) {

          .admission-page {
            padding: 0 5px 20px;
          }

          .premium-section {
            padding: 16px;
          }

          .premium-topbar {
            padding: 16px;
          }

          .premium-footer {
            padding: 16px;

            flex-direction: column-reverse;
          }

          .premium-footer button {
            width: 100%;
          }

          .premium-breadcrumb {
            margin: 8px 0 15px;
          }

        }

      `}</style>

      <div className="admission-page">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mx-2 mt-2 mb-3">

          <div
            className="rounded-4 shadow overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",

              border: "1px solid #dbeafe",
            }}
          >

            <div className="p-3 p-md-4">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "52px",
                      height: "52px",

                      background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",

                      color: "#fff",

                      boxShadow:
                        "0 8px 20px rgba(37,99,235,.22)",
                    }}
                  >
                    <LuBook size={27} />
                  </div>

                  <div>

                    <h5 className="mb-1 fw-bold text-dark">
                      Add New Admissions
                    </h5>

                    <div className="text-muted small">
                      New Admissions
                      &nbsp;/&nbsp;
                      Add New Admissions
                    </div>

                  </div>

                </div>

                <div className="d-flex align-items-center gap-2">

                  <button
                    type="button"
                    className="premium-btn premium-btn-secondary rounded-4"
                    onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft />
                    Back
                  </button>

                </div>

              </div>

            </div>

            <div
              className="px-4 py-2"
              style={{
                backgroundColor:
                  "rgba(239,246,255,.75)",

                borderTop:
                  "1px solid #e0ecff",
              }}
            >

              <small className="text-muted">

                Home
                &nbsp;›&nbsp;
                New Admissions
                &nbsp;›&nbsp;

                <span className="text-primary fw-semibold">
                  Add Student
                </span>

              </small>

            </div>

          </div>

        </div>

        {/* =====================================================
            MAIN FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="px-2"
        >

          <div className="premium-form-card shadow rounded-4">

            {/* =====================================================
                TOP BAR
            ===================================================== */}

            <div className="premium-topbar">

              <div className="premium-topbar-title">

                <div className="top-icon">
                  <FaUser />
                </div>

                <div>

                  <h5>
                    Student Admission Form
                  </h5>

                  <small>
                    Enter complete student and parent information
                  </small>

                </div>

              </div>

              <span className="required-info">

                <span className="text-danger">
                  *
                </span>

                {" "}Required fields

              </span>

            </div>

            {/* =====================================================
                ADMISSION DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaFileAlt />}
                title="Admission Details"
                subtitle="Basic admission and academic information"
              />

              <div className="row">

                <Field
                  label="Joining Academic Year"
                  name="academicYear"
                  required
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="academicYear"
                    value={formData.academicYear}
                    className={selectClass}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Academic Year
                    </option>

                    <option value="2026-2027">
                      2026-2027
                    </option>

                    <option value="2025-2026">
                      2025-2026
                    </option>

                    <option value="2024-2025">
                      2024-2025
                    </option>

                    <option value="2023-2024">
                      2023-2024
                    </option>

                    <option value="2022-23">
                      2022-2023
                    </option>

                    <option value="2021-22">
                      2021-2022
                    </option>

                  </select>

                </Field>

                <Field
                  label="Enter Date"
                  name="today"
                  type="date"
                  required
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Invoice No"
                  name="invoice"
                  placeholder="Enter invoice number"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Admission Type"
                  name="academicType"
                  required
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="academicType"
                    value={formData.academicType}
                    className={selectClass}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Admission Type
                    </option>

                    <option value="NewAdmission">
                      New Admission
                    </option>

                  </select>

                </Field>

              </div>

            </div>

            {/* =====================================================
                STUDENT DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaUser />}
                title="Student Details"
                subtitle="Personal information of the student"
              />

              <div className="row">

                <Field
                  label="First Name"
                  name="firstName"
                  required
                  placeholder="Enter first name"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Middle Name"
                  name="middleName"
                  placeholder="Enter middle name"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter last name"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Gender"
                  name="gender"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="gender"
                    value={formData.gender}
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Gender
                    </option>

                    <option value="male">
                      Male
                    </option>

                    <option value="female">
                      Female
                    </option>

                    <option value="NA">
                      Not Applicable
                    </option>

                  </select>

                </Field>

                <Field
                  label="Date Of Birth"
                  name="dob"
                  type="date"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Aadhar Card No"
                  name="aadharNo"
                  maxLength={12}
                  placeholder="12 digit Aadhar number"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Nationality"
                  name="nationality"
                  placeholder="Indian"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Mother Tongue"
                  name="motherTongue"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Religion"
                  name="religion"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Category"
                  name="category"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="category"
                    value={formData.category}
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Category
                    </option>

                    <option value="obc">
                      OBC
                    </option>

                    <option value="general">
                      General
                    </option>

                    <option value="ebc">
                      EBC
                    </option>

                    <option value="sc">
                      SC
                    </option>

                    <option value="st">
                      ST
                    </option>

                  </select>

                </Field>

                <Field
                  label="Caste"
                  name="caste"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Blood Group"
                  name="bloodGroup"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Blood Group
                    </option>

                    <option value="A+">
                      A+
                    </option>

                    <option value="A-">
                      A-
                    </option>

                    <option value="AB+">
                      AB+
                    </option>

                    <option value="AB-">
                      AB-
                    </option>

                    <option value="B+">
                      B+
                    </option>

                    <option value="B-">
                      B-
                    </option>

                    <option value="O+">
                      O+
                    </option>

                    <option value="O-">
                      O-
                    </option>

                  </select>

                </Field>

                <Field
                  label="Class to which admission is sought"
                  name="class"
                  required
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="class"
                    value={formData.class}
                    className={selectClass}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Class
                    </option>

                    {standards.map((std) => (

                      <option
                        key={std.value}
                        value={std.value}
                      >
                        {std.label}
                      </option>

                    ))}

                  </select>

                </Field>

                <Field
                  label="Age as on 1st June"
                  name="age"
                  placeholder="e.g. 5 Years"
                  formData={formData}
                  handleChange={handleChange}
                />

                <div className="col-xl-4 col-md-6 mb-3">

                  <label className="premium-label">
                    Transport Required
                  </label>

                  <div className="switch-box">

                    <input
                      type="checkbox"
                      name="transportRequired"
                      checked={
                        formData.transportRequired ===
                        "yes"
                      }
                      onChange={handleChange}
                    />

                    <span className="switch-label">

                      {formData.transportRequired ===
                      "yes"
                        ? "Yes, transport required"
                        : "No, transport not required"}

                    </span>

                    <FaBus
                      className="ms-auto"
                      style={{
                        color:
                          formData.transportRequired ===
                          "yes"
                            ? "#2563eb"
                            : "#94a3b8",
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* =====================================================
                CONTACT DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaUsers />}
                title="Contact Details"
                subtitle="Student communication information"
              />

              <div className="row">

                <Field
                  label="Email For Correspondence"
                  name="email"
                  type="email"
                  placeholder="student@example.com"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Preferred Mobile No. for SMS"
                  name="preferredNo"
                  placeholder="10 digit mobile number"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Alternate Mobile No. for SMS"
                  name="alternateNo"
                  placeholder="10 digit mobile number"
                  formData={formData}
                  handleChange={handleChange}
                />

              </div>

            </div>

            {/* =====================================================
                FEE DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaMoneyBillWave />}
                title="Fee Details"
                subtitle="Fee category and batch information"
              />

              <div className="row">

                <Field
                  label="Fee Category"
                  name="feeCategory"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="feeCategory"
                    value={formData.feeCategory}
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Fee Category
                    </option>

                    <option value="General">
                      General
                    </option>

                    <option value="Concession">
                      Concession
                    </option>

                    <option value="Ex-Student">
                      Ex-Student
                    </option>

                    <option value="Staff Child">
                      Staff Child
                    </option>

                  </select>

                </Field>

                {formData.feeCategory && (

                  <Field
                    label="Fee Batch"
                    name="feeBatch"
                    formData={formData}
                    handleChange={handleChange}
                  >

                    <select
                      name="feeBatch"
                      value={formData.feeBatch}
                      onChange={handleChange}
                      className={selectClass}
                    >

                      <option value="">
                        Select Fee Batch
                      </option>

                      {batches.map((batch) => (

                        <option
                          key={batch}
                          value={batch}
                        >
                          {batch}
                        </option>

                      ))}

                    </select>

                  </Field>

                )}

              </div>

            </div>

            {/* =====================================================
                SIBLING DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaUsers />}
                title="Sibling Details"
                subtitle="Add siblings currently studying in the school"
              />

              {siblings.map(
                (sibling, index) => (

                  <div
                    className="sibling-card"
                    key={index}
                  >

                    <span className="sibling-number">
                      {index + 1}
                    </span>

                    <div className="row">

                      <div className="col-xl-3 col-md-6 mb-3">

                        <label className="premium-label">
                          Sibling In School
                        </label>

                        <div className="switch-box">

                          <input
                            type="checkbox"
                            name="siblingPresent"
                            checked={
                              sibling.siblingPresent
                            }
                            onChange={(e) =>
                              handleSiblingChange(
                                index,
                                e
                              )
                            }
                          />

                          <span className="switch-label">

                            {sibling.siblingPresent
                              ? "Yes"
                              : "No"}

                          </span>

                        </div>

                      </div>

                      <div className="col-xl-3 col-md-6 mb-3">

                        <label className="premium-label">
                          Sibling Admission No
                        </label>

                        <input
                          type="text"
                          name="siblingAdm"
                          value={
                            sibling.siblingAdm
                          }
                          className={inputClass}
                          onChange={(e) =>
                            handleSiblingChange(
                              index,
                              e
                            )
                          }
                          disabled={
                            !sibling.siblingPresent
                          }
                          placeholder="Admission number"
                        />

                      </div>

                      <div className="col-xl-3 col-md-6 mb-3">

                        <label className="premium-label">
                          Sibling Name
                        </label>

                        <input
                          type="text"
                          name="siblingName"
                          value={
                            sibling.siblingName
                          }
                          className={inputClass}
                          onChange={(e) =>
                            handleSiblingChange(
                              index,
                              e
                            )
                          }
                          disabled={
                            !sibling.siblingPresent
                          }
                          placeholder="Sibling name"
                        />

                      </div>

                      <div className="col-xl-3 col-md-6 mb-3">

                        <label className="premium-label">
                          Sibling Class
                        </label>

                        <input
                          type="text"
                          name="siblingClass"
                          value={
                            sibling.siblingClass
                          }
                          className={inputClass}
                          onChange={(e) =>
                            handleSiblingChange(
                              index,
                              e
                            )
                          }
                          disabled={
                            !sibling.siblingPresent
                          }
                          placeholder="Class"
                        />

                      </div>

                    </div>

                    {siblings.length > 1 && (

                      <button
                        type="button"
                        className="premium-btn premium-btn-danger"
                        onClick={() =>
                          handleRemoveSibling(
                            index
                          )
                        }
                      >

                        <FaTrash />
                        Remove Sibling

                      </button>

                    )}

                  </div>

                )
              )}

              <button
                type="button"
                className="premium-btn premium-btn-add"
                onClick={
                  handleAddMoreSiblings
                }
              >

                <FaPlus />
                Add More Sibling

              </button>

            </div>

            {/* =====================================================
                CORRESPONDENCE ADDRESS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaMapMarkerAlt />}
                title="Correspondence Address"
                subtitle="Current residential address of the student"
              />

              <div className="row">

                <Field
                  label="House No"
                  name="houseNo"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Street"
                  name="street"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Post / Zip Code"
                  name="zip"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Area"
                  name="area"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Town"
                  name="town"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="City"
                  name="city"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="State"
                  name="state"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Country"
                  name="country"
                  formData={formData}
                  handleChange={handleChange}
                />

              </div>

            </div>

            {/* =====================================================
                PERMANENT ADDRESS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaMapMarkerAlt />}
                title="Permanent Address"
                subtitle="Permanent residential address"
              />

              <div className="address-note">

                <FaCheck />

                <span>
                  Check the option below if permanent
                  address is same as correspondence address.
                </span>

              </div>

              <div className="row">

                <div className="col-12 mb-3">

                  <div className="switch-box">

                    <input
                      type="checkbox"
                      checked={sameAddress}
                      onChange={
                        handleSameAddress
                      }
                    />

                    <span className="switch-label">
                      Yes, permanent address is same as
                      correspondence address
                    </span>

                  </div>

                </div>

                <Field
                  label="House No"
                  name="permanentHouseNo"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Street"
                  name="permanentStreet"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Post / Zip Code"
                  name="permanentZip"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Area"
                  name="permanentArea"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Town"
                  name="permanentTown"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="City"
                  name="permanentCity"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="State"
                  name="permanentState"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Country"
                  name="permanentCountry"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

              </div>

            </div>

            {/* =====================================================
                FATHER DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaUser />}
                title="Father Details"
                subtitle="Father / primary parent information"
              />

              <div className="row">

                <Field
                  label="Father Name"
                  name="fatherName"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Landline"
                  name="fatherLandline"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Mobile"
                  name="fatherMobile"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Email"
                  name="fatherEmail"
                  type="email"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Father Aadhar Card No"
                  name="fatherAadhar"
                  maxLength={12}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Education"
                  name="fatherEducation"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Education Type"
                  name="fatherEducationType"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="fatherEducationType"
                    value={
                      formData.fatherEducationType
                    }
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="private">
                      Private
                    </option>

                    <option value="public">
                      Public
                    </option>

                    <option value="business">
                      Business
                    </option>

                  </select>

                </Field>

                <Field
                  label="Specialisation"
                  name="fatherSpecialisation"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Job Type"
                  name="fatherJobType"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Occupation"
                  name="fatherOccupation"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="fatherOccupation"
                    value={
                      formData.fatherOccupation
                    }
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Occupation
                    </option>

                    <option value="engineer">
                      Engineer
                    </option>

                    <option value="doctor">
                      Doctor
                    </option>

                    <option value="businessman">
                      Businessman
                    </option>

                    <option value="teacher">
                      Teacher
                    </option>

                    <option value="governmentJob">
                      Government Job
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </Field>

                <Field
                  label="Organization Name"
                  name="fatherOrganization"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Organization Address"
                  name="fatherOrganizationAddress"
                  formData={formData}
                  handleChange={handleChange}
                />

              </div>

            </div>

            {/* =====================================================
                MOTHER DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaUser />}
                title="Mother Details"
                subtitle="Mother / secondary parent information"
              />

              <div className="row">

                <Field
                  label="Mother Name"
                  name="motherName"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Landline"
                  name="motherLandline"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Mobile"
                  name="motherMobile"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Email"
                  name="motherEmail"
                  type="email"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Mother Aadhar Card No"
                  name="motherAadhar"
                  maxLength={12}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Education"
                  name="motherEducation"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Education Type"
                  name="motherEducationType"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="motherEducationType"
                    value={
                      formData.motherEducationType
                    }
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="private">
                      Private
                    </option>

                    <option value="public">
                      Public
                    </option>

                    <option value="business">
                      Business
                    </option>

                  </select>

                </Field>

                <Field
                  label="Specialisation"
                  name="motherSpecialisation"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Job Type"
                  name="motherJobType"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Occupation"
                  name="motherOccupation"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="motherOccupation"
                    value={
                      formData.motherOccupation
                    }
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Occupation
                    </option>

                    <option value="engineer">
                      Engineer
                    </option>

                    <option value="doctor">
                      Doctor
                    </option>

                    <option value="businessman">
                      Businessman
                    </option>

                    <option value="teacher">
                      Teacher
                    </option>

                    <option value="governmentJob">
                      Government Job
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </Field>

                <Field
                  label="Organization Name"
                  name="motherOrganization"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Organization Address"
                  name="motherOrganizationAddress"
                  formData={formData}
                  handleChange={handleChange}
                />

              </div>

            </div>

            {/* =====================================================
                GUARDIAN DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaUser />}
                title="Guardian Details"
                subtitle="Guardian information, if applicable"
              />

              <div className="row">

                <Field
                  label="Guardian Name"
                  name="guardianName"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Landline"
                  name="guardianLandline"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Mobile"
                  name="guardianMobile"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Email"
                  name="guardianEmail"
                  type="email"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Guardian Aadhar Card No"
                  name="guardianAadhar"
                  maxLength={12}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Education"
                  name="guardianEducation"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Education Type"
                  name="guardianEducationType"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="guardianEducationType"
                    value={
                      formData.guardianEducationType
                    }
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="private">
                      Private
                    </option>

                    <option value="public">
                      Public
                    </option>

                    <option value="business">
                      Business
                    </option>

                  </select>

                </Field>

                <Field
                  label="Specialisation"
                  name="guardianSpecialisation"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Job Type"
                  name="guardianJobType"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Occupation"
                  name="guardianOccupation"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="guardianOccupation"
                    value={
                      formData.guardianOccupation
                    }
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Occupation
                    </option>

                    <option value="engineer">
                      Engineer
                    </option>

                    <option value="doctor">
                      Doctor
                    </option>

                    <option value="businessman">
                      Businessman
                    </option>

                    <option value="teacher">
                      Teacher
                    </option>

                    <option value="governmentJob">
                      Government Job
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </Field>

                <Field
                  label="Organization Name"
                  name="guardianOrganization"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Organization Address"
                  name="guardianOrganizationAddress"
                  formData={formData}
                  handleChange={handleChange}
                />

              </div>

            </div>

            {/* =====================================================
                FOOTER
            ===================================================== */}

            <div className="premium-footer">

              <button
                type="button"
                className="premium-btn premium-btn-secondary"
                onClick={() => navigate(-1)}
                disabled={loading}
              >

                <FaArrowLeft />

                Cancel

              </button>

              <button
                type="submit"
                className="premium-btn premium-btn-primary"
                disabled={loading}
              >

                {loading ? (

                  <>
                    <span className="spinner-border spinner-border-sm" />

                    Submitting...
                  </>

                ) : (

                  <>
                    <FaSave />

                    Submit Admission
                  </>

                )}

              </button>

            </div>

          </div>

        </form>

      </div>
    </>
  );
};

export default AdmissionForm;

