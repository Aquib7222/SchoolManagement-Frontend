
import { useNavigate, useParams } from "react-router-dom";

import schoolImage from "../../assets/icon/schoolImage.webp";
import mother from "../../assets/icon/mother.webp";
import father from "../../assets/icon/father.avif";

import {
  FaUser,
  FaArrowLeft,
  FaEdit,
  FaUserGraduate,
  FaUsers,
  FaSchool,
  FaHome,
  FaHeartbeat,
  FaPhoneAlt,
  FaBus,
  FaFileAlt,
  FaIdCard,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaVenusMars,
  FaTint,
} from "react-icons/fa";

import { FaUserGroup } from "react-icons/fa6";
import { MdOutlineSchool, MdFamilyRestroom } from "react-icons/md";

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
  const [showStudent, setShowStudent] = useState(true);

  const token = localStorage.getItem("token");

  // =========================================================
  // LOAD STUDENT
  // =========================================================

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
        console.error("Student Details Error:", err);
      });
  }, [admissionNumber, token]);

  console.log("students",student);

  // =========================================================
  // UPDATE STUDENT
  // =========================================================

  // const handleUpdate = async () => {
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

  //     const response = await axios.put(
  //       `/api/students/${editStudent.admissionNumber}`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     setStudent(response.data);
  //     setEditStudent(response.data);
  //     setShowEditModal(false);

  //     alert("Student Updated Successfully");
  //   } catch (error) {
  //     console.error("Update Student Error:", error);
  //     alert("Update Failed");
  //   }
  // };

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
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setStudent(response.data);
    setEditStudent(response.data);
    setPhoto(null);
    setShowEditModal(false);

    alert("Student Updated Successfully");
  } catch (error) {
    console.error("Update student error:", error);

    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      "Update Failed";

    alert(message);
  }
};


const API_BASE_URL = "http://localhost:8080";
  // =========================================================
  // LOADING
  // =========================================================

  if (!student) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="card border-0 shadow rounded-4 p-5 text-center">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
            style={{
              width: "65px",
              height: "65px",
              background: "#eff6ff",
              color: "#2563eb",
            }}
          >
            <FaUserGraduate size={28} />
          </div>

          <div
            className="spinner-border text-primary mb-3"
            role="status"
          />

          <h6 className="fw-bold mb-1">
            Loading Student Profile
          </h6>

          <small className="text-muted">
            Please wait while student information is loading...
          </small>
        </div>
      </div>
    );
  }

  const fullName = `${student.firstName || ""} ${
    student.lastName || ""
  }`.trim();

  const avatar = `https://ui-avatars.com/api/?background=2563eb&color=fff&size=200&bold=true&name=${encodeURIComponent(
    fullName
  )}`;

  // =========================================================
  // INFO ROW
  // =========================================================

  const InfoRow = ({ label, value, icon }) => (
    <div className="row align-items-center border-bottom py-2">
      <div className="col-sm-5">
        <div className="d-flex align-items-center gap-2">
          {icon && (
            <span
              className="d-flex align-items-center justify-content-center rounded-2"
              style={{
                width: "27px",
                height: "27px",
                background: "#eff6ff",
                color: "#2563eb",
                flexShrink: 0,
              }}
            >
              {icon}
            </span>
          )}

          <span className="fw-semibold text-muted small">
            {label}
          </span>
        </div>
      </div>

      <div className="col-sm-7 mt-1 mt-sm-0">
        <span className="fw-medium text-dark">
          {value || "-"}
        </span>
      </div>
    </div>
  );

  // =========================================================
  // SECTION CARD
  // =========================================================

  const SectionCard = ({ title, subtitle, icon, children, action }) => (
    <div className="card border-0 shadow rounded-4 mb-3 overflow-hidden">

      <div
        className="card-header bg-white py-3 px-3"
        style={{
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div className="d-flex justify-content-between align-items-center gap-2">

          <div className="d-flex align-items-center">

            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "42px",
                height: "42px",
                background:
                  "linear-gradient(135deg,#2563eb,#3b82f6)",
                color: "#fff",
                boxShadow:
                  "0 8px 20px rgba(37,99,235,.18)",
                flexShrink: 0,
              }}
            >
              {icon}
            </div>

            <div className="ms-2">
              <h6 className="mb-0 fw-bold">
                {title}
              </h6>

              {subtitle && (
                <small className="text-muted">
                  {subtitle}
                </small>
              )}
            </div>

          </div>

          {action}

        </div>
      </div>

      <div className="card-body p-3">
        {children}
      </div>

    </div>
  );

  return (
    <>
      {/* =========================================================
          PAGE HEADER
      ========================================================= */}

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
                  <FaUserGraduate size={26} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Student Profile
                  </h5>

                  <div className="text-muted small">
                    Students &nbsp;/&nbsp; Profile Details
                  </div>
                </div>

              </div>

              <div className="d-flex align-items-center gap-2 flex-wrap">

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Student
                </span>

                <button
                  className="btn btn-outline-primary rounded-3 px-3"
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeft className="me-2" />
                  Back
                </button>

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
              Home &nbsp;›&nbsp; Students &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Student Profile
              </span>
            </small>
          </div>

        </div>

      </div>

      {/* =========================================================
          PROFILE HERO
      ========================================================= */}

      <div className="px-2">

        <div className="card border-0 shadow rounded-4 overflow-hidden mb-4">

          {/* COVER */}

          <div
            style={{
              height: "180px",
              position: "relative",
              overflow: "hidden",
              background:
                "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
            }}
          >

            <img
              src={schoolImage}
              alt="School"
              className="w-100 h-100"
              style={{
                objectFit: "cover",
                opacity: 0.18,
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg,rgba(15,23,42,.9),rgba(37,99,235,.55))",
              }}
            />

            <div
              className="position-absolute text-white"
              style={{
                left: "30px",
                top: "30px",
              }}
            >

              <small
                className="opacity-75"
                style={{ letterSpacing: "1px" }}
              >
                STUDENT PROFILE
              </small>

              <h4 className="fw-bold mb-2 mt-1">
                {fullName}
              </h4>

              <span className="badge bg-light text-primary px-3 py-2">
                {student.admissionNumber}
              </span>

            </div>

          </div>

          {/* PROFILE DETAILS */}

          <div className="px-3 px-md-4 pb-3">

            <div className="d-flex align-items-end flex-wrap gap-3">

              {/* IMAGE */}

              <div
                className="rounded-circle bg-white p-1 shadow"
                style={{
                  width: "130px",
                  height: "130px",
                  marginTop: "-55px",
                  position: "relative",
                  zIndex: 2,
                }}
              >

              <img 
  src={
    student.photo 
      ? `${API_BASE_URL}/uploads/student/${student.photo}` 
      : "/default-student.png"
  } 
  alt={fullName} 
  className="rounded-circle w-100 h-100" 
  style={{ 
    objectFit: "cover", 
  }} 
/>

              </div>

              {/* NAME */}

              <div className="mb-2 flex-grow-1">

                <h5 className="fw-bold mb-1">
                  {fullName}
                </h5>

                <div className="text-muted small">
                  {student.studentUsername || "Student"}
                </div>

              </div>

              {/* STATUS */}

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

          {/* QUICK INFO */}

          <div
            className="px-3 px-md-4 py-3 border-top"
            style={{
              background: "#f8fafc",
            }}
          >

            <div className="row g-3">

              <div className="col-xl-3 col-md-6">

                <div className="d-flex align-items-center">

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-2"
                    style={{
                      width: "38px",
                      height: "38px",
                      background: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <MdOutlineSchool />
                  </div>

                  <div>
                    <small className="text-muted d-block">
                      Class
                    </small>

                    <strong>
                      {student.studentClass || "-"}
                      {student.section
                        ? ` / ${student.section}`
                        : ""}
                    </strong>
                  </div>

                </div>

              </div>

              <div className="col-xl-3 col-md-6">

                <div className="d-flex align-items-center">

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-2"
                    style={{
                      width: "38px",
                      height: "38px",
                      background: "#ecfdf5",
                      color: "#059669",
                    }}
                  >
                    <FaCalendarAlt />
                  </div>

                  <div>
                    <small className="text-muted d-block">
                      Academic Year
                    </small>

                    <strong>
                      {student.academicYear || "-"}
                    </strong>
                  </div>

                </div>

              </div>

              <div className="col-xl-3 col-md-6">

                <div className="d-flex align-items-center">

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-2"
                    style={{
                      width: "38px",
                      height: "38px",
                      background: "#fff7ed",
                      color: "#ea580c",
                    }}
                  >
                    <FaIdCard />
                  </div>

                  <div>
                    <small className="text-muted d-block">
                      Admission No
                    </small>

                    <strong>
                      {student.admissionNumber || "-"}
                    </strong>
                  </div>

                </div>

              </div>

              <div className="col-xl-3 col-md-6">

                <div className="d-flex align-items-center">

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-2"
                    style={{
                      width: "38px",
                      height: "38px",
                      background: "#fef2f2",
                      color: "#dc2626",
                    }}
                  >
                    <FaVenusMars />
                  </div>

                  <div>
                    <small className="text-muted d-block">
                      Gender
                    </small>

                    <strong>
                      {student.gender || "-"}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* TABS */}

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

      </div>

      {/* =========================================================
          STUDENT INFORMATION
      ========================================================= */}

      {showStudent ? (

        <div className="row g-3 px-2">

          {/* =====================================================
              LEFT
          ===================================================== */}

          <div className="col-lg-6">

            <SectionCard
              title="Basic Information"
              subtitle="Personal and identification details"
              icon={<FaUserGraduate />}
              action={
                <button
                  className="btn btn-sm btn-primary rounded-3 px-3"
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
                icon={<FaUser size={12} />}
              />

              <InfoRow
                label="Username"
                value={student.studentUsername}
                icon={<FaIdCard size={12} />}
              />

              <InfoRow
                label="Admission Number"
                value={student.admissionNumber}
                icon={<FaIdCard size={12} />}
              />

              <InfoRow
                label="Roll Number"
                value={student.roll_number}
                icon={<FaIdCard size={12} />}
              />

              <InfoRow
                label="Date of Birth"
                value={student.dob}
                icon={<FaCalendarAlt size={12} />}
              />

              <InfoRow
                label="Date of Joining"
                value={student.today}
                icon={<FaCalendarAlt size={12} />}
              />

              <InfoRow
                label="Joining Standard"
                value={`${student.studentClass || "-"} ${
                  student.section || ""
                }`}
                icon={<MdOutlineSchool size={15} />}
              />

              <InfoRow
                label="Email"
                value={student.email}
                icon={<FaFileAlt size={12} />}
              />

              <InfoRow
                label="Gender"
                value={student.gender}
                icon={<FaVenusMars size={12} />}
              />

              <InfoRow
                label="Category"
                value={student.category}
                icon={<FaUsers size={12} />}
              />

              <InfoRow
                label="Caste / Religion"
                value={`${student.caste || "-"} / ${
                  student.religion || "-"
                }`}
                icon={<FaUserGroup size={12} />}
              />

              <InfoRow
                label="Mother Tongue"
                value={student.motherTongue}
                icon={<FaUser size={12} />}
              />

              <InfoRow
                label="Nationality"
                value={student.nationality}
                icon={<FaUser size={12} />}
              />

              <InfoRow
                label="Section"
                value={student.section}
                icon={<MdOutlineSchool size={15} />}
              />

              <InfoRow
                label="TC Number"
                value={student.TC}
                icon={<FaFileAlt size={12} />}
              />

              <InfoRow
                label="PAN Number"
                value={student.PanCard}
                icon={<FaIdCard size={12} />}
              />

              <InfoRow
                label="APAAR ID"
                value={student.apaar}
                icon={<FaIdCard size={12} />}
              />

              <InfoRow
                label="Aadhar Number"
                value={student.aadharNo}
                icon={<FaIdCard size={12} />}
              />

              <InfoRow
                label="Blood Group"
                value={student.bloodGroup}
                icon={<FaTint size={12} />}
              />

              <InfoRow
                label="Address"
                value={`${student.houseNo || ""}${
                  student.street ? `, ${student.street}` : ""
                }${student.town ? `, ${student.town}` : ""}${
                  student.state ? `, ${student.state}` : ""
                }${student.zip ? ` - ${student.zip}` : ""}`}
                icon={<FaMapMarkerAlt size={12} />}
              />

            </SectionCard>

          </div>

          {/* =====================================================
              RIGHT
          ===================================================== */}

          <div className="col-lg-6">

            {/* CLASS & SESSION */}

            <SectionCard
              title="Class & Session"
              subtitle="Current academic information"
              icon={<FaSchool />}
            >

              <div className="row g-3">

                <div className="col-md-6">

                  <div
                    className="rounded-4 p-3 h-100"
                    style={{
                      background: "#eff6ff",
                      border: "1px solid #dbeafe",
                    }}
                  >

                    <div className="d-flex align-items-center mb-2">

                      <FaCalendarAlt className="text-primary me-2" />

                      <small className="text-muted">
                        Academic Year
                      </small>

                    </div>

                    <h6 className="fw-bold text-primary mb-0">
                      {student.academicYear || "-"}
                    </h6>

                  </div>

                </div>

                <div className="col-md-6">

                  <div
                    className="rounded-4 p-3 h-100"
                    style={{
                      background: "#eff6ff",
                      border: "1px solid #dbeafe",
                    }}
                  >

                    <div className="d-flex align-items-center mb-2">

                      <FaSchool className="text-primary me-2" />

                      <small className="text-muted">
                        Class / Section
                      </small>

                    </div>

                    <h6 className="fw-bold text-primary mb-0">
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
              subtitle="Student house assignment"
              icon={<FaHome />}
              action={
                <button className="btn btn-sm btn-primary rounded-3">
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
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "#eff6ff",
                    color: "#2563eb",
                  }}
                >
                  <FaHome size={20} />
                </div>

              </div>

            </SectionCard>

            {/* HEALTH CONDITION */}

            <SectionCard
              title="Health Condition"
              subtitle="Medical conditions and special notes"
              icon={<FaHeartbeat />}
              action={
                <button className="btn btn-sm btn-primary rounded-3">
                  Add
                </button>
              }
            >

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead
                    style={{
                      background: "#eff6ff",
                      color: "#1e3a8a",
                    }}
                  >
                    <tr>
                      <th>Condition</th>
                      <th>Emergency Steps</th>
                      <th>Comments</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center text-muted py-4"
                      >
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
              subtitle="Emergency contact details"
              icon={<FaPhoneAlt />}
              action={
                <button className="btn btn-sm btn-primary rounded-3">
                  Add
                </button>
              }
            >

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead
                    style={{
                      background: "#eff6ff",
                      color: "#1e3a8a",
                    }}
                  >
                    <tr>
                      <th>Name</th>
                      <th>Relation</th>
                      <th>Contact</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center text-muted py-4"
                      >
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
              subtitle="School transport assignment"
              icon={<FaBus />}
              action={
                <button className="btn btn-sm btn-primary rounded-3">
                  Add
                </button>
              }
            >

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead
                    style={{
                      background: "#eff6ff",
                      color: "#1e3a8a",
                    }}
                  >
                    <tr>
                      <th>Route Name</th>
                      <th>Stop Name</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td
                        colSpan="2"
                        className="text-center text-muted py-4"
                      >
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
              subtitle="Student health measurements"
              icon={<FaHeartbeat />}
              action={
                <button className="btn btn-sm btn-primary rounded-3">
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
              subtitle="Special requirements and documents"
              icon={<FaFileAlt />}
              action={
                <button className="btn btn-sm btn-primary rounded-3">
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

            {/* DOCUMENTS */}

            <SectionCard
              title="Documents"
              subtitle="Student document management"
              icon={<FaFileAlt />}
            >

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div className="d-flex align-items-center">

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <FaFileAlt size={20} />
                  </div>

                  <div>

                    <h6 className="fw-bold mb-1">
                      Student Documents
                    </h6>

                    <small className="text-muted">
                      Upload or manage student documents
                    </small>

                  </div>

                </div>

                <button className="btn btn-primary rounded-3 px-3">
                  <FaFileAlt className="me-2" />
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

        <div className="row g-3 px-2">

          {/* FATHER */}

          <div className="col-lg-6">

            <SectionCard
              title="Father Information"
              subtitle="Father / guardian details"
              icon={<MdFamilyRestroom />}
              action={
                <button className="btn btn-sm btn-primary rounded-3">
                  Edit
                </button>
              }
            >

              <div className="text-center mb-4">

                <div
                  className="rounded-circle bg-white p-1 shadow mx-auto"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                >

                  <img
                    src={father}
                    alt="Father"
                    className="rounded-circle w-100 h-100"
                    style={{
                      objectFit: "cover",
                    }}
                  />

                </div>

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
              subtitle="Mother / guardian details"
              icon={<MdFamilyRestroom />}
              action={
                <button className="btn btn-sm btn-primary rounded-3">
                  Edit
                </button>
              }
            >

              <div className="text-center mb-4">

                <div
                  className="rounded-circle bg-white p-1 shadow mx-auto"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                >

                  <img
                    src={mother}
                    alt="Mother"
                    className="rounded-circle w-100 h-100"
                    style={{
                      objectFit: "cover",
                    }}
                  />

                </div>

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
  setPhoto={setPhoto}
  onClose={() => {
    setShowEditModal(false);
    setPhoto(null);
  }}
  onSave={handleUpdate}
/>

      {/* =========================================================
          SMALL RESPONSIVE CSS
      ========================================================= */}

      <style>
        {`
          .table th {
            white-space: nowrap;
          }

          .table td {
            vertical-align: middle;
          }

          @media (max-width: 576px) {

            .student-profile-header {
              text-align: center;
            }

          }

          @media (max-width: 768px) {

            .profile-quick-info {
              text-align: left;
            }

          }
        `}
      </style>
    </>
  );
};

export default StudentDetails;

