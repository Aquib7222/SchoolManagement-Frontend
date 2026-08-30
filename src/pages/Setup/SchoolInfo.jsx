import React, { useEffect, useState } from "react";
import {
  LuSchool,
  LuMapPin,
  LuPhone,
  LuMail,
  LuGlobe,
  LuCalendarDays,
  LuUser,
  LuBookOpen,
  LuBuilding2,
  LuBadgeCheck,
  LuFileText,
  LuHash,
  LuLandmark,
  LuLoaderCircle,
  LuPencil,
} from "react-icons/lu";
import { MdOutlineSchool } from "react-icons/md";
import axios from "../../api/axiosInstance";

const SchoolInfo = () => {
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const schoolId = user?.schoolId;

  /* =====================================================
     FETCH SCHOOL
  ===================================================== */

  useEffect(() => {
    const fetchSchool = async () => {
      if (!schoolId || !token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/api/school/${schoolId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSchool(response.data);
      } catch (error) {
        console.error(
          "Error fetching school information:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [schoolId, token]);

  /* =====================================================
     HELPERS
  ===================================================== */
console.log("school",school);
  const value = (data) => {
    if (
      data === null ||
      data === undefined ||
      data === ""
    ) {
      return "-";
    }

    return data;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return "-";
    }
  };

  const getFullAddress = () => {
    if (!school) return "-";

    return [
      school.address,
      school.street,
      school.area,
      school.city,
      school.state,
      school.country,
      school.zip,
      school.pincode,
    ]
      .filter(Boolean)
      .join(", ") || "-";
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="text-center">
          <div
            className="spinner-border"
            style={{
              width: "35px",
              height: "35px",
              color: "#2563eb",
            }}
          />

          <div className="text-muted mt-2">
            Loading school information...
          </div>
        </div>
      </div>
    );
  }

  /* =====================================================
     NO DATA
  ===================================================== */

  if (!school) {
    return (
      <div className="mx-2 mt-3">
        <div
          className="alert alert-warning rounded-4"
          role="alert"
        >
          School information not found.
        </div>
      </div>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}


      {/* =====================================================
          SCHOOL PROFILE HERO
      ===================================================== */}

      <div className="mx-2 mb-3">
        <div
          className="rounded-4 shadow overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#1e3a8a,#2563eb,#3b82f6)",
          }}
        >
          <div className="p-4">
            <div className="row align-items-center g-4">

              {/* LOGO */}

              <div className="col-md-auto">
                <div
                  className="d-flex align-items-center justify-content-center rounded-4"
                  style={{
                    width: "115px",
                    height: "115px",
                    background:
                      "rgba(255,255,255,.15)",
                    border:
                      "1px solid rgba(255,255,255,.3)",
                    backdropFilter:
                      "blur(8px)",
                  }}
                >
                  {school.logo ||
                  school.logoUrl ? (
                    <img
                      src={
                        school.logo ||
                        school.logoUrl
                      }
                      alt="School Logo"
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "contain",
                        background: "#fff",
                        borderRadius: "12px",
                        padding: "5px",
                      }}
                    />
                  ) : (
                    <LuSchool
                      size={55}
                      color="#fff"
                    />
                  )}
                </div>
              </div>

              {/* SCHOOL NAME */}

              <div className="col">
                <div
                  className="text-white"
                  style={{
                    fontSize: "27px",
                    fontWeight: "700",
                  }}
                >
                  {value(
                    school.schoolName ||
                      school.name
                  )}
                </div>

                <div
                  className="mt-1"
                  style={{
                    color:
                      "rgba(255,255,255,.8)",
                    fontSize: "14px",
                  }}
                >
                  {value(
                    school.tagline ||
                      "School Management System"
                  )}
                </div>

                <div className="d-flex flex-wrap gap-2 mt-3">

                  {school.affiliationBoard && (
                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{
                        background:
                          "rgba(255,255,255,.15)",
                        color: "#fff",
                        border:
                          "1px solid rgba(255,255,255,.25)",
                      }}
                    >
                      <LuBadgeCheck className="me-1" />
                      {school.affiliationBoard}
                    </span>
                  )}

                  {school.schoolType && (
                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{
                        background:
                          "rgba(255,255,255,.15)",
                        color: "#fff",
                        border:
                          "1px solid rgba(255,255,255,.25)",
                      }}
                    >
                      {school.schoolType}
                    </span>
                  )}
                </div>
              </div>

              {/* SCHOOL ID */}

              <div className="col-md-auto">
                <div
                  className="text-white text-md-end"
                >
                  <small
                    style={{
                      opacity: ".7",
                    }}
                  >
                    School ID
                  </small>

                  <div
                    className="fw-bold mt-1"
                    style={{
                      fontSize: "18px",
                    }}
                  >
                    #{value(school.id)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BASIC INFORMATION
      ===================================================== */}

      <div className="mx-2 mb-3">
        <InfoSection
          icon={<LuSchool />}
          title="Basic School Information"
        >
          <div className="row g-3">

            <InfoItem
              icon={<LuSchool />}
              label="School Name"
              value={
                school.schoolName ||
                school.name
              }
            />

            <InfoItem
              icon={<LuHash />}
              label="School Code"
              value={
                school.schoolCode ||
                school.code
              }
            />

            <InfoItem
              icon={<LuBuilding2 />}
              label="School Type"
              value={school.schoolType}
            />

            <InfoItem
              icon={<LuBookOpen />}
              label="School Category"
              value={
                school.schoolCategory ||
                school.category
              }
            />

            <InfoItem
              icon={<LuLandmark />}
              label="Affiliation Board"
              value={
                school.affiliationBoard ||
                school.board
              }
            />

            <InfoItem
              icon={<LuCalendarDays />}
              label="Established Date"
              value={formatDate(
                school.establishedYear ||
                  school.establishmentDate
              )}
            />
          </div>
        </InfoSection>
      </div>

      {/* =====================================================
          CONTACT INFORMATION
      ===================================================== */}

      <div className="mx-2 mb-3">
        <InfoSection
          icon={<LuPhone />}
          title="Contact Information"
        >
          <div className="row g-3">

            <InfoItem
              icon={<LuPhone />}
              label="Phone"
              value={
                school.phone ||
                school.contactPersonNumber ||
                school.phoneNumber
              }
            />

            <InfoItem
              icon={<LuMail />}
              label="Email"
              value={school.email}
            />

            <InfoItem
              icon={<LuGlobe />}
              label="Website"
              value={school.website}
            />

            <InfoItem
              icon={<LuPhone />}
              label="Alternate Phone"
              value={
                school.alternatePhone ||
                school.alternateContact
              }
            />
          </div>
        </InfoSection>
      </div>

      {/* =====================================================
          ADDRESS
      ===================================================== */}

      <div className="mx-2 mb-3">
        <InfoSection
          icon={<LuMapPin />}
          title="School Address"
        >
          <div className="row g-3">

            <InfoItem
              icon={<LuBuilding2 />}
              label="Address"
              value={school.addressLine1}
              full
            />

            <InfoItem
              icon={<LuMapPin />}
              label="City"
              value={school.city}
            />

            <InfoItem
              icon={<LuMapPin />}
              label="State"
              value={school.state}
            />

            <InfoItem
              icon={<LuMapPin />}
              label="Country"
              value={school.country}
            />

            <InfoItem
              icon={<LuHash />}
              label="PIN / ZIP Code"
              value={
                school.zip ||
                school.pincode
              }
            />
          </div>
        </InfoSection>
      </div>

      {/* =====================================================
          MANAGEMENT INFORMATION
      ===================================================== */}

      <div className="mx-2 mb-3">
        <InfoSection
          icon={<LuUser />}
          title="Management Information"
        >
          <div className="row g-3">

            <InfoItem
              icon={<LuUser />}
              label="Principal / Head"
              value={
                school.principalName ||
                school.contactPerson
              }
            />

            <InfoItem
              icon={<LuPhone />}
              label="Principal Contact"
              value={
                school.principalPhone ||
                school.phoneNumber
              }
            />

            <InfoItem
              icon={<LuMail />}
              label="Principal Email"
              value={
                school.principalEmail
              }
            />

            <InfoItem
              icon={<LuUser />}
              label="Administrator"
              value={
                school.adminName ||
                school.administratorName
              }
            />
          </div>
        </InfoSection>
      </div>

      {/* =====================================================
          ADDITIONAL INFORMATION
      ===================================================== */}

      <div className="mx-2 mb-4">
        <InfoSection
          icon={<LuFileText />}
          title="Additional Information"
        >
          <div className="row g-3">

            <InfoItem
              icon={<LuCalendarDays />}
              label="Academic Session"
              value={
                school.academic_Year ||
                school.session
              }
            />

            <InfoItem
              icon={<LuBadgeCheck />}
              label="Registration Number"
              value={
                school.registrationNumber ||
                school.registrationNo
              }
            />

            <InfoItem
              icon={<LuFileText />}
              label="Affiliation Number"
              value={
                school.affiliationNumber ||
                school.affiliationNo
              }
            />

            <InfoItem
              icon={<LuBadgeCheck />}
              label="Status"
              value={school.status}
              status
            />
          </div>
        </InfoSection>
      </div>
    </>
  );
};

/* =========================================================
   INFO SECTION
========================================================= */

const InfoSection = ({
  icon,
  title,
  children,
}) => {
  return (
    <div
      className="bg-white rounded-4 shadow overflow-hidden"
      style={{
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        className="d-flex align-items-center gap-2 px-3 py-3"
        style={{
          background:
            "linear-gradient(135deg,#f8fbff,#f1f5ff)",
          borderBottom:
            "1px solid #e2e8f0",
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center rounded-3"
          style={{
            width: "36px",
            height: "36px",
            background: "#eff6ff",
            color: "#2563eb",
            border:
              "1px solid #dbeafe",
          }}
        >
          {icon}
        </div>

        <h6 className="mb-0 fw-bold text-dark">
          {title}
        </h6>
      </div>

      <div className="p-3 p-md-4">
        {children}
      </div>
    </div>
  );
};

/* =========================================================
   INFO ITEM
========================================================= */

const InfoItem = ({
  icon,
  label,
  value,
  full = false,
  status = false,
}) => {
  return (
    <div
      className={
        full
          ? "col-12"
          : "col-xl-4 col-md-6"
      }
    >
      <div
        className="h-100 rounded-3 p-3"
        style={{
          background: "#f8fafc",
          border:
            "1px solid #e2e8f0",
        }}
      >
        <div className="d-flex align-items-start gap-2">

          <div
            className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
            style={{
              width: "32px",
              height: "32px",
              background: "#eff6ff",
              color: "#2563eb",
            }}
          >
            {React.cloneElement(icon, {
              size: 16,
            })}
          </div>

          <div
            className="flex-grow-1"
            style={{
              minWidth: 0,
            }}
          >
            <div
              className="text-muted mb-1"
              style={{
                fontSize: "11px",
                fontWeight: "600",
                textTransform:
                  "uppercase",
                letterSpacing:
                  ".4px",
              }}
            >
              {label}
            </div>

            {status ? (
              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background:
                    value === "ACTIVE" ||
                    value === "Active"
                      ? "#ecfdf5"
                      : "#fef2f2",
                  color:
                    value === "ACTIVE" ||
                    value === "Active"
                      ? "#047857"
                      : "#dc2626",
                  border:
                    value === "ACTIVE" ||
                    value === "Active"
                      ? "1px solid #a7f3d0"
                      : "1px solid #fecaca",
                }}
              >
                {value || "-"}
              </span>
            ) : (
              <div
                className="fw-semibold text-dark"
                style={{
                  fontSize: "14px",
                  wordBreak:
                    "break-word",
                }}
              >
                {value || "-"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolInfo;