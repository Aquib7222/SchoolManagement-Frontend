
import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChild,
  FaClipboardCheck,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhone,
  FaRedo,
  FaSave,
  FaSchool,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { FaEnvelope, FaFilter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import useMasters from "../../../hooks/useMasters";

const AddEnquiry = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const schoolId = user?.schoolId;

  const [loading, setLoading] = useState(false);
  const {sessions,standards} = useMasters();

  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    gender: "",
    applyingFor: "",
    academicYear: "",

    fatherName: "",
    motherName: "",
    guardianName: "",

    mobile: "",
    alternateMobile: "",
    email: "",

    address: "",
    city: "",
    state: "",
    pinCode: "",

    previousSchool: "",
    previousClass: "",

    enquirySource: "",
    enquiryDate: new Date().toISOString().split("T")[0],
    followUpDate: "",

    remarks: "",
  });

  const [errors, setErrors] = useState({});

  /* =========================================================
     MASTER DATA
  ========================================================= */

  



  const genders = [
    "MALE",
    "FEMALE",
    "OTHER",
  ];

  const enquirySources = [
    "WALK_IN",
    "PHONE",
    "WEBSITE",
    "REFERENCE",
    "ADVERTISEMENT",
    "SOCIAL_MEDIA",
    "OTHER",
  ];

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = "Student name is required";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!formData.applyingFor) {
      newErrors.applyingFor = "Please select standard";
    }

    if (!formData.academicYear) {
      newErrors.academicYear = "Please select session";
    }

    if (!formData.fatherName.trim() && !formData.motherName.trim()) {
      newErrors.parent = "Father or mother name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid 10 digit mobile number";
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter valid email address";
    }

    if (!formData.enquiryDate) {
      newErrors.enquiryDate = "Enquiry date is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     SAVE ENQUIRY
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    if (!schoolId || !token) {
      alert("School information not found. Please login again.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        schoolId: schoolId,

        studentName: formData.studentName.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        studentClass: formData.applyingFor,
        academicYear: formData.academicYear,

        fatherName: formData.fatherName.trim(),
        motherName: formData.motherName.trim(),
        guardianName: formData.guardianName.trim(),

        phone: formData.mobile.trim(),
        alternatePhone: formData.alternateMobile.trim(),
        email: formData.email.trim(),

        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pinCode: formData.pinCode.trim(),

        previousSchool: formData.previousSchool.trim(),
        previousClass: formData.previousClass,

        enquirySource: formData.enquirySource,
        enquiryDate: formData.enquiryDate,
        followUpDate: formData.followUpDate,

        remarks: formData.remarks.trim(),
      };

      console.log("Admission enquiry payload:", payload);

      await axiosInstance.post(
        "/api/admission-enquiry",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Admission enquiry created successfully.");

      handleReset();

      // Agar enquiry list page hai to yahan redirect kar sakte ho
      // navigate("/admission/enquiry-list");

    } catch (error) {
      console.error("Admission enquiry error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to create admission enquiry.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setFormData({
      studentName: "",
      dateOfBirth: "",
      gender: "",
      applyingFor: "",
      academicYear: "",

      fatherName: "",
      motherName: "",
      guardianName: "",

      mobile: "",
      alternateMobile: "",
      email: "",

      address: "",
      city: "",
      state: "",
      pinCode: "",

      previousSchool: "",
      previousClass: "",

      enquirySource: "",
      enquiryDate: new Date().toISOString().split("T")[0],
      followUpDate: "",

      remarks: "",
    });

    setErrors({});
  };

  /* =========================================================
     INPUT CLASS
  ========================================================= */

  const inputClass = (field) =>
    `form-control ${errors[field] ? "is-invalid" : ""}`;

  const selectClass = (field) =>
    `form-select ${errors[field] ? "is-invalid" : ""}`;

  /* =========================================================
     UI
  ========================================================= */

  return (
    <>
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
                  className="d-flex align-items-center justify-content-center rounded-4"
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
                  <FaClipboardCheck size={26} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Add Admission Enquiry
                  </h5>

                  <div className="text-muted small">
                    Admission &nbsp;/&nbsp; Enquiry
                  </div>
                </div>

              </div>

              <div>
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#eaf2ff",
                    color: "#2563eb",
                    border: "1px solid #d5e5ff",
                  }}
                >
                  <FaClipboardCheck className="me-1" />
                  New Enquiry
                </span>
              </div>

            </div>
          </div>

          <div
            className="px-4 py-2"
            style={{
              backgroundColor: "rgba(239,246,255,.75)",
              borderTop: "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp;
              Admission &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Add Admission Enquiry
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <div className="mx-2 mb-4">
        <form onSubmit={handleSubmit}>

          {/* =================================================
              STUDENT DETAILS
          ================================================= */}

          <div className="card border-0 shadow rounded-4 mb-4">

            <div
              className="card-header bg-white p-3"
              style={{
                borderBottom: "1px solid #eef0f2",
              }}
            >
              <div className="d-flex align-items-center">

                <div
                  className="section-icon me-2"
                >
                  <FaChild />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">
                    Student Details
                  </h6>

                  <small className="text-muted">
                    Basic information of the student
                  </small>
                </div>

              </div>
            </div>

            <div className="card-body p-3 p-md-4">

              <div className="row g-3">

                {/* STUDENT NAME */}

                <div className="col-12 col-md-6 col-xl-4">
                  <label className="form-label">
                    Student Name
                    <span className="text-danger">*</span>
                  </label>

                  <div className="input-icon">
                    <FaUser />

                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      className={inputClass("studentName")}
                      placeholder="Enter student name"
                    />
                  </div>

                  {errors.studentName && (
                    <div className="invalid-feedback d-block">
                      {errors.studentName}
                    </div>
                  )}
                </div>

                {/* DOB */}

                <div className="col-12 col-md-6 col-xl-4">
                  <label className="form-label">
                    Date of Birth
                    <span className="text-danger">*</span>
                  </label>

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={inputClass("dateOfBirth")}
                  />

                  {errors.dateOfBirth && (
                    <div className="invalid-feedback d-block">
                      {errors.dateOfBirth}
                    </div>
                  )}
                </div>

                {/* GENDER */}

                <div className="col-12 col-md-6 col-xl-4">
                  <label className="form-label">
                    Gender
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={selectClass("gender")}
                  >
                    <option value="">
                      Select Gender
                    </option>

                    {genders.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>

                  {errors.gender && (
                    <div className="invalid-feedback d-block">
                      {errors.gender}
                    </div>
                  )}
                </div>

                {/* APPLYING FOR */}

                <div className="col-12 col-md-6 col-xl-4">
                  <label className="form-label">
                    Applying For
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    name="applyingFor"
                    value={formData.applyingFor}
                    onChange={handleChange}
                    className={selectClass("applyingFor")}
                  >
                    <option value="">
                      Select Standard
                    </option>

                    {standards.map((standard) => (
                      <option
                        key={standard}
                        value={standard}
                      >
                        {standard}
                      </option>
                    ))}
                  </select>

                  {errors.applyingFor && (
                    <div className="invalid-feedback d-block">
                      {errors.applyingFor}
                    </div>
                  )}
                </div>

                {/* SESSION */}

                <div className="col-12 col-md-6 col-xl-4">
                  <label className="form-label">
                    Academic Session
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleChange}
                    className={selectClass("academicYear")}
                  >
                    <option value="">
                      Select Session
                    </option>

                    {sessions.map((session) => (
                      <option
                        key={session}
                        value={session}
                      >
                        {session}
                      </option>
                    ))}
                  </select>

                  {errors.academicYear && (
                    <div className="invalid-feedback d-block">
                      {errors.academicYear}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* =================================================
              PARENT DETAILS
          ================================================= */}

          <div className="card border-0 shadow rounded-4 mb-4">

            <div
              className="card-header bg-white p-3"
              style={{
                borderBottom: "1px solid #eef0f2",
              }}
            >
              <div className="d-flex align-items-center">

                <div className="section-icon me-2">
                  <FaUsers />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">
                    Parent / Guardian Details
                  </h6>

                  <small className="text-muted">
                    Parent and guardian information
                  </small>
                </div>

              </div>
            </div>

            <div className="card-body p-3 p-md-4">

              <div className="row g-3">

                <div className="col-12 col-md-6 col-xl-4">

                  <label className="form-label">
                    Father's Name
                  </label>

                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.parent ? "is-invalid" : ""
                    }`}
                    placeholder="Enter father's name"
                  />

                </div>

                <div className="col-12 col-md-6 col-xl-4">

                  <label className="form-label">
                    Mother's Name
                  </label>

                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.parent ? "is-invalid" : ""
                    }`}
                    placeholder="Enter mother's name"
                  />

                </div>

                <div className="col-12 col-md-6 col-xl-4">

                  <label className="form-label">
                    Guardian Name
                  </label>

                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter guardian name"
                  />

                </div>

                {errors.parent && (
                  <div className="col-12">
                    <div className="text-danger small">
                      {errors.parent}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* =================================================
              CONTACT DETAILS
          ================================================= */}

          <div className="card border-0 shadow rounded-4 mb-4">

            <div
              className="card-header bg-white p-3"
              style={{
                borderBottom: "1px solid #eef0f2",
              }}
            >
              <div className="d-flex align-items-center">

                <div className="section-icon me-2">
                  <FaPhone />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">
                    Contact Details
                  </h6>

                  <small className="text-muted">
                    Contact and residential information
                  </small>
                </div>

              </div>
            </div>

            <div className="card-body p-3 p-md-4">

              <div className="row g-3">

                {/* MOBILE */}

                <div className="col-12 col-md-6 col-xl-3">

                  <label className="form-label">
                    Mobile Number
                    <span className="text-danger">*</span>
                  </label>

                  <div className="input-icon">
                    <FaPhone />

                    <input
                      type="tel"
                      name="mobile"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={handleChange}
                      className={inputClass("mobile")}
                      placeholder="10 digit mobile"
                    />
                  </div>

                  {errors.mobile && (
                    <div className="invalid-feedback d-block">
                      {errors.mobile}
                    </div>
                  )}

                </div>

                {/* ALTERNATE */}

                <div className="col-12 col-md-6 col-xl-3">

                  <label className="form-label">
                    Alternate Mobile
                  </label>

                  <input
                    type="tel"
                    name="alternateMobile"
                    maxLength={10}
                    value={formData.alternateMobile}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Alternate mobile"
                  />

                </div>

                {/* EMAIL */}

                <div className="col-12 col-md-6 col-xl-3">

                  <label className="form-label">
                    Email
                  </label>

                  <div className="input-icon">
                    <FaEnvelope />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass("email")}
                      placeholder="example@email.com"
                    />
                  </div>

                  {errors.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}

                </div>

                {/* CITY */}

                <div className="col-12 col-md-6 col-xl-3">

                  <label className="form-label">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter city"
                  />

                </div>

                {/* ADDRESS */}

                <div className="col-12">

                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                    rows="2"
                    placeholder="Enter complete residential address"
                  />

                </div>

                {/* STATE */}

                <div className="col-12 col-md-6 col-xl-4">

                  <label className="form-label">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter state"
                  />

                </div>

                {/* PIN */}

                <div className="col-12 col-md-6 col-xl-4">

                  <label className="form-label">
                    PIN Code
                  </label>

                  <input
                    type="text"
                    name="pinCode"
                    maxLength={6}
                    value={formData.pinCode}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter PIN code"
                  />

                </div>

              </div>
            </div>
          </div>

          {/* =================================================
              PREVIOUS SCHOOL
          ================================================= */}

          <div className="card border-0 shadow rounded-4 mb-4">

            <div
              className="card-header bg-white p-3"
              style={{
                borderBottom: "1px solid #eef0f2",
              }}
            >
              <div className="d-flex align-items-center">

                <div className="section-icon me-2">
                  <FaSchool />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">
                    Previous School Details
                  </h6>

                  <small className="text-muted">
                    Previous academic information
                  </small>
                </div>

              </div>
            </div>

            <div className="card-body p-3 p-md-4">

              <div className="row g-3">

                <div className="col-12 col-md-8">

                  <label className="form-label">
                    Previous School
                  </label>

                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter previous school name"
                  />

                </div>

                <div className="col-12 col-md-4">

                  <label className="form-label">
                    Previous Class
                  </label>

                  <select
                    name="previousClass"
                    value={formData.previousClass}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">
                      Select Class
                    </option>

                    {standards.map((standard) => (
                      <option
                        key={standard}
                        value={standard}
                      >
                        {standard}
                      </option>
                    ))}
                  </select>

                </div>

              </div>
            </div>
          </div>

          {/* =================================================
              ENQUIRY DETAILS
          ================================================= */}

          <div className="card border-0 shadow rounded-4 mb-4">

            <div
              className="card-header bg-white p-3"
              style={{
                borderBottom: "1px solid #eef0f2",
              }}
            >
              <div className="d-flex align-items-center">

                <div className="section-icon me-2">
                  <FaFilter />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">
                    Enquiry Details
                  </h6>

                  <small className="text-muted">
                    Enquiry and follow-up information
                  </small>
                </div>

              </div>
            </div>

            <div className="card-body p-3 p-md-4">

              <div className="row g-3">

                {/* ENQUIRY DATE */}

                <div className="col-12 col-md-6 col-xl-3">

                  <label className="form-label">
                    Enquiry Date
                    <span className="text-danger">*</span>
                  </label>

                  <div className="input-icon">
                    <FaCalendarAlt />

                    <input
                      type="date"
                      name="enquiryDate"
                      value={formData.enquiryDate}
                      onChange={handleChange}
                      className={inputClass("enquiryDate")}
                    />
                  </div>

                </div>

                {/* FOLLOW UP */}

                <div className="col-12 col-md-6 col-xl-3">

                  <label className="form-label">
                    Follow-up Date
                  </label>

                  <input
                    type="date"
                    name="followUpDate"
                    value={formData.followUpDate}
                    onChange={handleChange}
                    className="form-control"
                  />

                </div>

                {/* SOURCE */}

                <div className="col-12 col-md-6 col-xl-3">

                  <label className="form-label">
                    Enquiry Source
                  </label>

                  <select
                    name="enquirySource"
                    value={formData.enquirySource}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">
                      Select Source
                    </option>

                    {enquirySources.map((source) => (
                      <option
                        key={source}
                        value={source}
                      >
                        {source.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>

                </div>

                {/* REMARKS */}

                <div className="col-12 col-md-6 col-xl-3">

                  <label className="form-label">
                    Remarks
                  </label>

                  <input
                    type="text"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Short remarks"
                  />

                </div>

              </div>
            </div>
          </div>

          {/* =================================================
              ACTION BAR
          ================================================= */}

          <div className="card border-0 shadow rounded-4">

            <div className="card-body p-3">

              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                <button
                  type="button"
                  className="btn btn-light border px-4"
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeft
                    className="me-2"
                    size={13}
                  />
                  Back
                </button>

                <div className="d-flex gap-2">

                  <button
                    type="button"
                    className="btn btn-light border px-4"
                    onClick={handleReset}
                    disabled={loading}
                  >
                    <FaRedo
                      className="me-2"
                      size={13}
                    />
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave
                          className="me-2"
                          size={13}
                        />
                        Save Enquiry
                      </>
                    )}
                  </button>

                </div>

              </div>

            </div>
          </div>

        </form>
      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>
        {`
          .form-label {
            font-size: 13px;
            font-weight: 600;
            color: #343a40;
            margin-bottom: 7px;
          }

          .form-control,
          .form-select {
            min-height: 42px;
            border-radius: 8px;
            border-color: #dee2e6;
            font-size: 13px;
          }

          textarea.form-control {
            min-height: auto;
          }

          .form-control:focus,
          .form-select:focus {
            border-color: #2563eb;
            box-shadow:
              0 0 0 0.15rem
              rgba(37, 99, 235, 0.10);
          }

          .input-icon {
            position: relative;
          }

          .input-icon > svg {
            position: absolute;
            left: 13px;
            top: 50%;
            transform: translateY(-50%);
            color: #6c757d;
            font-size: 13px;
            z-index: 2;
          }

          .input-icon .form-control {
            padding-left: 36px;
          }

          .section-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #eaf2ff;
            color: #2563eb;
            font-size: 15px;
          }

          .card {
            overflow: hidden;
          }

          .btn {
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            min-height: 40px;
          }

          @media (max-width: 768px) {
            .card-header {
              padding: 12px !important;
            }

            .card-body {
              padding: 14px !important;
            }

            .btn {
              width: auto;
            }
          }
        `}
      </style>
    </>
  );
};

export default AddEnquiry;

