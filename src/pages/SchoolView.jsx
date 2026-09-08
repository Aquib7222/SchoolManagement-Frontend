import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaSchool,
  FaArrowLeft,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaUserTie,
  FaGlobe,
  FaCalendarAlt,
  FaLanguage,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaBuilding,
} from "react-icons/fa";

const SchoolView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH SCHOOL
  // =====================================================

  useEffect(() => {
    fetchSchool();
  }, [id]);

  const fetchSchool = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("AdminToken") || localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/api/school/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSchool(response.data);
    } catch (error) {
      console.error("Failed to fetch school:", error);
      setSchool(null);
    } finally {
      setLoading(false);
    }
  };

  const getLogoUrl = (logoUrl) => {
    if (!logoUrl) {
      return "/images/default-school.png";
    }

    if (logoUrl.startsWith("http")) {
      return logoUrl;
    }

    return `http://localhost:8080${logoUrl}`;
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="container-fluid py-5 text-center">
        <div className="spinner-border text-primary" role="status" />

        <div className="mt-2 text-muted">Loading school details...</div>
      </div>
    );
  }

  // =====================================================
  // NOT FOUND
  // =====================================================

  if (!school) {
    return (
      <div className="container-fluid py-5">
        <div className="card border-0 shadow">
          <div className="card-body text-center py-5">
            <FaSchool size={50} className="text-muted mb-3" />

            <h5>School not found</h5>

            <button
              className="btn btn-primary mt-2"
              onClick={() => navigate("/school-list")}
            >
              Back to School List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-2 py-3">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="card border-0 shadow mb-3">
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-light me-3"
                onClick={() => navigate("/school-list")}
              >
                <FaArrowLeft />
              </button>

              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "50px",
                  height: "50px",
                  background: "#e7f0ff",
                }}
              >
                <FaSchool size={24} className="text-primary" />
              </div>

              <div>
                <h4 className="mb-1 fw-semibold">{school.schoolName}</h4>

                <small className="text-muted">
                  School Code: {school.schoolCode}
                </small>
              </div>
            </div>

            <div className="d-flex gap-2">
              <span
                className={`badge d-flex align-items-center px-3 ${
                  school.active ? "bg-success" : "bg-danger"
                }`}
              >
                {school.active ? (
                  <>
                    <FaCheckCircle className="me-1" />
                    Active
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="me-1" />
                    Inactive
                  </>
                )}
              </span>

              <button
                className="btn btn-outline-warning d-flex align-items-center gap-2"
                onClick={() => navigate(`/school/edit/${school.id}`)}
              >
                <FaEdit />
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCHOOL OVERVIEW
      ===================================================== */}

      <div className="row g-3 mb-3">
        {/* LOGO */}

        <div className="col-12 col-lg-3">
          <div className="card border-0 shadow h-100">
            <div className="card-body text-center">
              <div
                className="mx-auto rounded-3 overflow-hidden d-flex align-items-center justify-content-center"
                style={{
                  width: "150px",
                  height: "150px",
                  background: "#f1f5f9",
                }}
              >
                {school.logoUrl ? (
                  <img
                    src={getLogoUrl(school.logoUrl)}
                    alt={school.schoolName}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #dee2e6",
                      padding: "8px",
                    }}
                  />
                ) : (
                  <FaSchool size={60} className="text-primary" />
                )}
              </div>

              <h5 className="mt-3 mb-1">{school.schoolName}</h5>

              <small className="text-muted">
                {school.organizationName || "School"}
              </small>
            </div>
          </div>
        </div>

        {/* BASIC INFO */}

        <div className="col-12 col-lg-9">
          <div className="card border-0 shadow h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0 fw-semibold">Basic Information</h5>
            </div>

            <div className="card-body">
              <div className="row g-3">
                <Info
                  label="School Name"
                  value={school.schoolName}
                  icon={<FaSchool />}
                />

                <Info
                  label="School Code"
                  value={school.schoolCode}
                  icon={<FaBuilding />}
                />

                <Info
                  label="Organization"
                  value={school.organizationName}
                  icon={<FaBuilding />}
                />

                <Info
                  label="School Type"
                  value={school.schoolType}
                  icon={<FaSchool />}
                />

                <Info
                  label="School Category"
                  value={school.schoolCategory}
                  icon={<FaSchool />}
                />

                <Info
                  label="Affiliation Board"
                  value={school.affiliationBoard}
                  icon={<FaSchool />}
                />

                <Info
                  label="Established Year"
                  value={school.establishedYear}
                  icon={<FaCalendarAlt />}
                />

                <Info
                  label="Total Classes"
                  value={school.totalClasses}
                  icon={<FaBuilding />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTACT + ADDRESS
      ===================================================== */}

      <div className="row g-3 mb-3">
        {/* CONTACT */}

        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0 fw-semibold">Contact Information</h5>
            </div>

            <div className="card-body">
              <DetailRow
                icon={<FaUserTie />}
                label="Contact Person"
                value={school.contactPerson}
              />

              <DetailRow
                icon={<FaUserTie />}
                label="Designation"
                value={school.designation}
              />

              <DetailRow
                icon={<FaEnvelope />}
                label="Email"
                value={school.email}
              />

              <DetailRow
                icon={<FaPhone />}
                label="Phone Number"
                value={school.phoneNumber}
              />

              <DetailRow
                icon={<FaPhone />}
                label="Alternate Phone"
                value={school.alternatePhone}
              />
            </div>
          </div>
        </div>

        {/* ADDRESS */}

        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0 fw-semibold">Address</h5>
            </div>

            <div className="card-body">
              <DetailRow
                icon={<FaMapMarkerAlt />}
                label="Address Line 1"
                value={school.addressLine1}
              />

              <DetailRow
                icon={<FaMapMarkerAlt />}
                label="Address Line 2"
                value={school.addressLine2}
              />

              <DetailRow
                icon={<FaMapMarkerAlt />}
                label="City"
                value={school.city}
              />

              <DetailRow
                icon={<FaMapMarkerAlt />}
                label="State"
                value={school.state}
              />

              <DetailRow
                icon={<FaMapMarkerAlt />}
                label="Country"
                value={school.country}
              />

              <DetailRow
                icon={<FaMapMarkerAlt />}
                label="Pincode"
                value={school.pincode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ACADEMIC + SETTINGS
      ===================================================== */}

      <div className="row g-3 mb-3">
        {/* ACADEMIC */}

        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0 fw-semibold">Academic Information</h5>
            </div>

            <div className="card-body">
              <DetailRow
                icon={<FaCalendarAlt />}
                label="Session Start Month"
                value={school.academicSessionStartMonth}
              />

              <DetailRow
                icon={<FaCalendarAlt />}
                label="Session Format"
                value={school.academicSessionFormat}
              />

              <DetailRow
                icon={<FaLanguage />}
                label="Default Language"
                value={school.defaultLanguage}
              />

              <DetailRow
                icon={<FaMoneyBillWave />}
                label="Currency"
                value={school.currency}
              />

              <DetailRow
                icon={<FaUsers />}
                label="Total Students"
                value={school.totalStudents}
              />
            </div>
          </div>
        </div>

        {/* SETTINGS */}

        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0 fw-semibold">School Settings</h5>
            </div>

            <div className="card-body">
              <SettingRow label="School Status" value={school.active} />

              <SettingRow
                label="Parent Login"
                value={school.allowParentLogin}
              />

              <SettingRow
                label="Student Login"
                value={school.allowStudentLogin}
              />

              <DetailRow
                icon={<FaGlobe />}
                label="Time Zone"
                value={school.timeZone}
              />

              <DetailRow
                icon={<FaCalendarAlt />}
                label="Date Format"
                value={school.dateFormat}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <div className="card border-0 shadow mb-3">
        <div className="card-header bg-white">
          <h5 className="mb-0 fw-semibold">Description</h5>
        </div>

        <div className="card-body">
          <p className="text-muted mb-0">
            {school.description || "No description available."}
          </p>
        </div>
      </div>

      {/* =====================================================
          SYSTEM INFORMATION
      ===================================================== */}

      <div className="card border-0 shadow">
        <div className="card-header bg-white">
          <h5 className="mb-0 fw-semibold">System Information</h5>
        </div>

        <div className="card-body">
          <div className="row g-3">
            <Info label="School ID" value={school.id} />

            <Info
              label="Created At"
              value={
                school.createdAt
                  ? new Date(school.createdAt).toLocaleString()
                  : "—"
              }
            />

            <Info
              label="Updated At"
              value={
                school.updatedAt
                  ? new Date(school.updatedAt).toLocaleString()
                  : "—"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// INFO COMPONENT
// =====================================================

const Info = ({ label, value, icon }) => {
  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className="border rounded-3 p-3 h-100">
        {icon && <div className="text-primary mb-2">{icon}</div>}

        <small className="text-muted d-block">{label}</small>

        <div className="fw-semibold mt-1">{value || "—"}</div>
      </div>
    </div>
  );
};

// =====================================================
// DETAIL ROW
// =====================================================

const DetailRow = ({ icon, label, value }) => {
  return (
    <div className="d-flex align-items-start border-bottom py-3">
      <div
        className="text-primary me-3"
        style={{
          width: "25px",
        }}
      >
        {icon}
      </div>

      <div className="flex-grow-1">
        <small className="text-muted d-block">{label}</small>

        <div className="fw-semibold">{value || "—"}</div>
      </div>
    </div>
  );
};

// =====================================================
// SETTING ROW
// =====================================================

const SettingRow = ({ label, value }) => {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-3">
      <span className="fw-medium">{label}</span>

      {value ? (
        <span className="badge bg-success">Enabled</span>
      ) : (
        <span className="badge bg-secondary">Disabled</span>
      )}
    </div>
  );
};

export default SchoolView;
