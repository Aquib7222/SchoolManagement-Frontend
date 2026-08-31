
// import React, { useEffect, useState } from "react";
// import {
//   LuUser,
//   LuGraduationCap,
//   LuUsers,
//   LuPhone,
//   LuMail,
//   LuMapPin,
//   LuCalendarDays,
//   LuBookOpen,
//   LuSchool,
//   LuIdCard,
//   LuHeart,
//   LuShieldCheck,
// } from "react-icons/lu";
// import axiosInstance from "../../api/axiosInstance";


// const MyProfile = () => {
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const schoolId = localStorage.getItem("schoolId");
//   const admissionNumber = localStorage.getItem("admissionNumber");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchStudentProfile();
//   }, []);

//   const fetchStudentProfile = async () => {
//     try {
//       setLoading(true);

//       const response = await axiosInstance.get(
//         "/api/student/profile",
//         {
//           params: {
//             schoolId,
//             admissionNumber,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setStudent(response.data);
//     } catch (error) {
//       console.error("Error fetching student profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getValue = (value) => {
//     return value !== null &&
//       value !== undefined &&
//       value !== ""
//       ? value
//       : "—";
//   };

//   if (loading) {
//     return (
//       <div className="container-fluid py-4">
//         <div className="d-flex justify-content-center align-items-center"
//           style={{ minHeight: "60vh" }}
//         >
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!student) {
//     return (
//       <div className="container-fluid py-4">
//         <div className="alert alert-danger">
//           Unable to load student profile.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="container-fluid py-3"
//       style={{
//         background: "#f6f8fb",
//         minHeight: "100vh",
//       }}
//     >

//       {/* ================= HEADER ================= */}
//       <div
//         className="d-flex justify-content-between align-items-center mb-4"
//         style={{
//           background: "linear-gradient(135deg, #0d6efd, #0b5ed7)",
//           borderRadius: "14px",
//           padding: "20px 24px",
//           color: "#fff",
//           boxShadow: "0 4px 15px rgba(13,110,253,0.15)",
//         }}
//       >
//         <div className="d-flex align-items-center gap-3">
//           <div
//             className="d-flex justify-content-center align-items-center"
//             style={{
//               width: "48px",
//               height: "48px",
//               borderRadius: "12px",
//               background: "rgba(255,255,255,0.18)",
//             }}
//           >
//             <LuUser size={26} />
//           </div>

//           <div>
//             <h4 className="mb-1 fw-bold">
//               My Profile
//             </h4>

//             <small style={{ opacity: 0.85 }}>
//               View your personal and academic information
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* ================= PROFILE CARD ================= */}
//       <div
//         className="card border-0 mb-4"
//         style={{
//           borderRadius: "14px",
//           boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
//         }}
//       >
//         <div className="card-body p-4">

//           <div className="row align-items-center">

//             {/* PROFILE IMAGE */}
//             <div className="col-lg-2 col-md-3 text-center mb-3 mb-md-0">

//               {student.photoUrl ? (
//                 <img
//                   src={student.photoUrl}
//                   alt="Student"
//                   className="rounded-circle"
//                   style={{
//                     width: "120px",
//                     height: "120px",
//                     objectFit: "cover",
//                     border: "4px solid #e9ecef",
//                   }}
//                 />
//               ) : (
//                 <div
//                   className="rounded-circle mx-auto d-flex justify-content-center align-items-center"
//                   style={{
//                     width: "120px",
//                     height: "120px",
//                     background: "#e9f2ff",
//                     color: "#0d6efd",
//                     border: "4px solid #e9ecef",
//                   }}
//                 >
//                   <LuUser size={55} />
//                 </div>
//               )}

//             </div>

//             {/* BASIC PROFILE */}
//             <div className="col-lg-7 col-md-6">

//               <h3 className="fw-bold mb-1">
//                 {getValue(student.studentName || student.name)}
//               </h3>

//               <p className="text-muted mb-3">
//                 Admission No:{" "}
//                 <strong className="text-dark">
//                   {getValue(student.admissionNumber)}
//                 </strong>
//               </p>

//               <div className="d-flex flex-wrap gap-2">

//                 <span className="badge bg-primary px-3 py-2">
//                   {getValue(student.studentClass)}
//                 </span>

//                 <span className="badge bg-secondary px-3 py-2">
//                   Section {getValue(student.section)}
//                 </span>

//                 <span className="badge bg-success px-3 py-2">
//                   Roll No. {getValue(student.rollNo)}
//                 </span>

//               </div>

//             </div>

//             {/* STATUS */}
//             <div className="col-lg-3 col-md-3 mt-3 mt-md-0">

//               <div
//                 className="p-3 rounded-3"
//                 style={{
//                   background: "#f0fff5",
//                   border: "1px solid #d7f5df",
//                 }}
//               >
//                 <div className="d-flex align-items-center gap-2 mb-2">
//                   <LuShieldCheck
//                     size={20}
//                     className="text-success"
//                   />

//                   <span className="fw-semibold">
//                     Student Status
//                   </span>
//                 </div>

//                 <span className="badge bg-success">
//                   {getValue(student.status || "ACTIVE")}
//                 </span>
//               </div>

//             </div>

//           </div>

//         </div>
//       </div>

//       {/* ================= PERSONAL INFORMATION ================= */}
//       <ProfileSection
//         title="Personal Information"
//         icon={<LuUser size={21} />}
//       >
//         <InfoItem
//           icon={<LuUser />}
//           label="Full Name"
//           value={student.studentName || student.name}
//         />

//         <InfoItem
//           icon={<LuIdCard />}
//           label="Admission Number"
//           value={student.admissionNumber}
//         />

//         <InfoItem
//           icon={<LuCalendarDays />}
//           label="Date of Birth"
//           value={student.dateOfBirth}
//         />

//         <InfoItem
//           icon={<LuUser />}
//           label="Gender"
//           value={student.gender}
//         />

//         <InfoItem
//           icon={<LuHeart />}
//           label="Blood Group"
//           value={student.bloodGroup}
//         />

//         <InfoItem
//           icon={<LuUser />}
//           label="Category"
//           value={student.category}
//         />

//       </ProfileSection>

//       {/* ================= ACADEMIC INFORMATION ================= */}
//       <ProfileSection
//         title="Academic Information"
//         icon={<LuGraduationCap size={21} />}
//       >

//         <InfoItem
//           icon={<LuSchool />}
//           label="Academic Year"
//           value={student.academicYear}
//         />

//         <InfoItem
//           icon={<LuBookOpen />}
//           label="Class"
//           value={student.studentClass}
//         />

//         <InfoItem
//           icon={<LuUsers />}
//           label="Section"
//           value={student.section}
//         />

//         <InfoItem
//           icon={<LuIdCard />}
//           label="Roll Number"
//           value={student.rollNo}
//         />

//         <InfoItem
//           icon={<LuCalendarDays />}
//           label="Admission Date"
//           value={student.admissionDate}
//         />

//         <InfoItem
//           icon={<LuShieldCheck />}
//           label="Status"
//           value={student.status}
//         />

//       </ProfileSection>

//       {/* ================= PARENT / GUARDIAN ================= */}
//       <ProfileSection
//         title="Parent / Guardian Information"
//         icon={<LuUsers size={21} />}
//       >

//         <InfoItem
//           icon={<LuUser />}
//           label="Father's Name"
//           value={student.fatherName}
//         />

//         <InfoItem
//           icon={<LuPhone />}
//           label="Father's Mobile"
//           value={student.fatherMobile}
//         />

//         <InfoItem
//           icon={<LuUser />}
//           label="Mother's Name"
//           value={student.motherName}
//         />

//         <InfoItem
//           icon={<LuPhone />}
//           label="Mother's Mobile"
//           value={student.motherMobile}
//         />

//         <InfoItem
//           icon={<LuUser />}
//           label="Guardian Name"
//           value={student.guardianName}
//         />

//         <InfoItem
//           icon={<LuPhone />}
//           label="Guardian Mobile"
//           value={student.guardianMobile}
//         />

//       </ProfileSection>

//       {/* ================= CONTACT INFORMATION ================= */}
//       <ProfileSection
//         title="Contact Information"
//         icon={<LuPhone size={21} />}
//       >

//         <InfoItem
//           icon={<LuPhone />}
//           label="Mobile Number"
//           value={student.mobileNumber}
//         />

//         <InfoItem
//           icon={<LuMail />}
//           label="Email"
//           value={student.email}
//         />

//         <InfoItem
//           icon={<LuMapPin />}
//           label="Address"
//           value={student.address}
//           fullWidth
//         />

//       </ProfileSection>

//       {/* ================= ADDITIONAL INFORMATION ================= */}
//       <ProfileSection
//         title="Additional Information"
//         icon={<LuIdCard size={21} />}
//       >

//         <InfoItem
//           icon={<LuIdCard />}
//           label="Aadhaar Number"
//           value={student.aadhaarNumber}
//         />

//         <InfoItem
//           icon={<LuIdCard />}
//           label="Nationality"
//           value={student.nationality}
//         />

//         <InfoItem
//           icon={<LuUser />}
//           label="Religion"
//           value={student.religion}
//         />

//         <InfoItem
//           icon={<LuUser />}
//           label="Mother Tongue"
//           value={student.motherTongue}
//         />

//       </ProfileSection>

//     </div>
//   );
// };


// /* =========================================================
//    PROFILE SECTION
// ========================================================= */

// const ProfileSection = ({ title, icon, children }) => {
//   return (
//     <div
//       className="card border-0 mb-4"
//       style={{
//         borderRadius: "14px",
//         boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
//       }}
//     >

//       <div
//         className="card-header bg-white border-0 px-4 py-3"
//         style={{
//           borderBottom: "1px solid #edf0f3",
//           borderRadius: "14px 14px 0 0",
//         }}
//       >

//         <div className="d-flex align-items-center gap-2">

//           <div
//             className="d-flex justify-content-center align-items-center"
//             style={{
//               width: "38px",
//               height: "38px",
//               borderRadius: "10px",
//               background: "#eaf2ff",
//               color: "#0d6efd",
//             }}
//           >
//             {icon}
//           </div>

//           <h5 className="mb-0 fw-bold">
//             {title}
//           </h5>

//         </div>

//       </div>

//       <div className="card-body px-4 py-3">

//         <div className="row">

//           {children}

//         </div>

//       </div>

//     </div>
//   );
// };


// /* =========================================================
//    INFO ITEM
// ========================================================= */

// const InfoItem = ({
//   icon,
//   label,
//   value,
//   fullWidth = false,
// }) => {

//   return (
//     <div
//       className={
//         fullWidth
//           ? "col-12 mb-3"
//           : "col-lg-4 col-md-6 col-12 mb-3"
//       }
//     >

//       <div
//         className="h-100 p-3 rounded-3"
//         style={{
//           background: "#f8f9fb",
//           border: "1px solid #edf0f3",
//         }}
//       >

//         <div className="d-flex align-items-center gap-2 mb-2">

//           <span
//             style={{
//               color: "#0d6efd",
//             }}
//           >
//             {React.cloneElement(icon, {
//               size: 17,
//             })}
//           </span>

//           <small className="text-muted fw-semibold">
//             {label}
//           </small>

//         </div>

//         <div
//           className="fw-semibold text-dark"
//           style={{
//             wordBreak: "break-word",
//           }}
//         >
//           {value !== null &&
//           value !== undefined &&
//           value !== ""
//             ? value
//             : "—"}
//         </div>

//       </div>

//     </div>
//   );
// };

// export default MyProfile;




import React, { useEffect, useState } from "react";
import {
  LuUser,
  LuGraduationCap,
  LuUsers,
  LuPhone,
  LuMail,
  LuMapPin,
  LuCalendarDays,
  LuBookOpen,
  LuSchool,
  LuIdCard,
  LuHeart,
  LuShieldCheck,
  LuMap,
  LuBus,
  LuBriefcaseBusiness,
} from "react-icons/lu";

import axiosInstance from "../../api/axiosInstance";

const MyProfile = () => {
  // =====================================================
  // USER / AUTH
  // =====================================================

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // =====================================================
  // STATE
  // =====================================================

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // AUTH CONFIG
  // =====================================================

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =====================================================
  // GET STUDENT
  // SAME API USED IN DASHBOARD
  // =====================================================

  const getStudent = async () => {
    if (!user?.admissionNumber) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/api/students/${user.admissionNumber}`,
        authConfig
      );

      console.log("Student Profile:", response.data);

      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudent();
  }, [user?.admissionNumber]);

  // =====================================================
  // HELPERS
  // =====================================================

  const getValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "—";
    }

    return value;
  };

  const fullName = [
    student?.firstName,
    student?.middleName,
    student?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  // =====================================================
  // PROFILE IMAGE
  //
  // IMPORTANT:
  // `photo` is the filename returned by backend.
  //
  // If your existing backend has a different image URL,
  // change only PHOTO_BASE_URL below.
  // =====================================================

  const PHOTO_BASE_URL = "/api/documents/";

  const profileImage = student?.photo
    ? `${PHOTO_BASE_URL}${student.photo}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        fullName || "Student"
      )}&background=random&color=fff&size=300`;

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: "70vh",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <div className="text-muted">
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // NO STUDENT
  // =====================================================

  if (!student) {
    return (
      <div className="container-fluid px-3 py-4">
        <div className="alert alert-danger rounded-3">
          Unable to load student profile.
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="container-fluid px-2 px-md-3 py-3"
      style={{
        // background: "#f6f8fb",
        minHeight: "100vh",
      }}
    >

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div
        className="rounded-4 shadow mb-4"
        style={{
          background:
            "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
          border: "1px solid #dbeafe",
          padding: "20px",
        }}
      >
        <div className="d-flex align-items-center gap-3">

          <div className="profile-header-icon">
            <LuUser size={24} />
          </div>

          <div>
            <h4 className="fw-bold mb-1">
              My Profile
            </h4>

            <div className="text-muted small">
              View your personal, academic and contact
              information
            </div>
          </div>

        </div>
      </div>


      {/* =================================================
          PROFILE OVERVIEW
      ================================================= */}

      <div
        className="card border-0 shadow rounded-4 mb-4"
      >
        <div className="card-body p-3 p-md-4">

          <div className="row align-items-center">

            {/* PROFILE IMAGE */}

            <div
              className="col-12 col-md-auto text-center mb-3 mb-md-0"
            >

              <div className="profile-image-wrapper">

                <img
                  src={profileImage}
                  alt="Student Profile"
                  className="profile-image"
                  onError={(e) => {
                    e.currentTarget.src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        fullName || "Student"
                      )}&background=random&color=fff&size=300`;
                  }}
                />

              </div>

            </div>


            {/* BASIC DETAILS */}

            <div className="col">

              <div
                className="small fw-semibold mb-1"
                style={{
                  color: "#0d6efd",
                  letterSpacing: ".5px",
                }}
              >
                STUDENT PROFILE
              </div>

              <h3 className="fw-bold text-dark mb-2">
                {fullName || "Student"}
              </h3>

              <div className="d-flex flex-wrap gap-2">

                <StudentBadge
                  label="Class"
                  value={student?.studentClass}
                />

                <StudentBadge
                  label="Section"
                  value={student?.section}
                />

                <StudentBadge
                  label="Roll No"
                  value={student?.rollNumber}
                />

                <StudentBadge
                  label="Admission No"
                  value={student?.admissionNumber}
                />

                <StudentBadge
                  label="Academic Year"
                  value={student?.academicYear}
                />

              </div>

            </div>


            {/* STATUS */}

            <div
              className="col-12 col-lg-3 mt-3 mt-lg-0"
            >

              <div className="status-box">

                <div className="d-flex align-items-center gap-2 mb-2">

                  <LuShieldCheck
                    size={19}
                    className="text-success"
                  />

                  <span className="fw-semibold">
                    Student Status
                  </span>

                </div>

                <span className="badge bg-success px-3 py-2">
                  {getValue(student?.status)}
                </span>

              </div>

            </div>

          </div>

        </div>
      </div>


      {/* =================================================
          PERSONAL INFORMATION
      ================================================= */}

      <ProfileSection
        title="Personal Information"
        icon={<LuUser />}
      >

        <InfoItem
          icon={<LuUser />}
          label="First Name"
          value={student?.firstName}
        />

        <InfoItem
          icon={<LuUser />}
          label="Middle Name"
          value={student?.middleName}
        />

        <InfoItem
          icon={<LuUser />}
          label="Last Name"
          value={student?.lastName}
        />

        <InfoItem
          icon={<LuCalendarDays />}
          label="Date of Birth"
          value={student?.dob}
        />

        <InfoItem
          icon={<LuCalendarDays />}
          label="Age"
          value={student?.age}
        />

        <InfoItem
          icon={<LuUser />}
          label="Gender"
          value={student?.gender}
        />

        <InfoItem
          icon={<LuHeart />}
          label="Blood Group"
          value={student?.bloodGroup}
        />

        <InfoItem
          icon={<LuUser />}
          label="Category"
          value={student?.category}
        />

        <InfoItem
          icon={<LuUser />}
          label="Caste"
          value={student?.caste}
        />

        <InfoItem
          icon={<LuUser />}
          label="Religion"
          value={student?.religion}
        />

        <InfoItem
          icon={<LuMap />}
          label="Nationality"
          value={student?.nationality}
        />

        <InfoItem
          icon={<LuBookOpen />}
          label="Mother Tongue"
          value={student?.motherTongue}
        />

      </ProfileSection>


      {/* =================================================
          ACADEMIC INFORMATION
      ================================================= */}

      <ProfileSection
        title="Academic Information"
        icon={<LuGraduationCap />}
      >

        <InfoItem
          icon={<LuIdCard />}
          label="Admission Number"
          value={student?.admissionNumber}
        />

        <InfoItem
          icon={<LuCalendarDays />}
          label="Academic Year"
          value={student?.academicYear}
        />

        <InfoItem
          icon={<LuSchool />}
          label="Class"
          value={student?.studentClass}
        />

        <InfoItem
          icon={<LuUsers />}
          label="Section"
          value={student?.section}
        />

        <InfoItem
          icon={<LuIdCard />}
          label="Roll Number"
          value={student?.rollNumber}
        />

        <InfoItem
          icon={<LuCalendarDays />}
          label="Fee Batch"
          value={student?.feeBatch}
        />

        <InfoItem
          icon={<LuBookOpen />}
          label="Fee Category"
          value={student?.feeCategory}
        />

        <InfoItem
          icon={<LuShieldCheck />}
          label="Status"
          value={student?.status}
        />

        <InfoItem
          icon={<LuCalendarDays />}
          label="Discontinue Date"
          value={student?.discontinueDate}
        />

      </ProfileSection>


      {/* =================================================
          PARENT / GUARDIAN INFORMATION
      ================================================= */}

      <ProfileSection
        title="Parent / Guardian Information"
        icon={<LuUsers />}
      >

        {/* FATHER */}

        <InfoItem
          icon={<LuUser />}
          label="Father's Name"
          value={student?.fatherName}
        />

        <InfoItem
          icon={<LuPhone />}
          label="Father's Mobile"
          value={student?.fatherMobile}
        />

        <InfoItem
          icon={<LuMail />}
          label="Father's Email"
          value={student?.fatherEmail}
        />

        <InfoItem
          icon={<LuBriefcaseBusiness />}
          label="Father's Occupation"
          value={student?.fatherOccupation}
        />

        {/* MOTHER */}

        <InfoItem
          icon={<LuUser />}
          label="Mother's Name"
          value={student?.motherName}
        />

        <InfoItem
          icon={<LuPhone />}
          label="Mother's Mobile"
          value={student?.motherMobile}
        />

        <InfoItem
          icon={<LuMail />}
          label="Mother's Email"
          value={student?.motherEmail}
        />

        <InfoItem
          icon={<LuBriefcaseBusiness />}
          label="Mother's Occupation"
          value={student?.motherOccupation}
        />

      </ProfileSection>


      {/* =================================================
          CONTACT INFORMATION
      ================================================= */}

      <ProfileSection
        title="Contact Information"
        icon={<LuPhone />}
      >

        <InfoItem
          icon={<LuPhone />}
          label="Mobile"
          value={student?.mobile}
        />

        <InfoItem
          icon={<LuMail />}
          label="Email"
          value={student?.email}
        />

      </ProfileSection>


      {/* =================================================
          ADDRESS INFORMATION
      ================================================= */}

      <ProfileSection
        title="Address Information"
        icon={<LuMapPin />}
      >

        <InfoItem
          icon={<LuMapPin />}
          label="House No"
          value={student?.houseNo}
        />

        <InfoItem
          icon={<LuMapPin />}
          label="Street"
          value={student?.street}
        />

        <InfoItem
          icon={<LuMapPin />}
          label="Area"
          value={student?.area}
        />

        <InfoItem
          icon={<LuMapPin />}
          label="Town"
          value={student?.town}
        />

        <InfoItem
          icon={<LuMapPin />}
          label="City"
          value={student?.city}
        />

        <InfoItem
          icon={<LuMapPin />}
          label="State"
          value={student?.state}
        />

        <InfoItem
          icon={<LuMapPin />}
          label="Country"
          value={student?.country}
        />

        <InfoItem
          icon={<LuMapPin />}
          label="PIN / ZIP Code"
          value={student?.zip}
        />

      </ProfileSection>


      {/* =================================================
          OTHER INFORMATION
      ================================================= */}

      <ProfileSection
        title="Other Information"
        icon={<LuIdCard />}
      >

        <InfoItem
          icon={<LuBus />}
          label="Transport Required"
          value={
            student?.transportRequired === null ||
            student?.transportRequired === undefined
              ? "—"
              : student?.transportRequired
                ? "Yes"
                : "No"
          }
        />

        <InfoItem
          icon={<LuCalendarDays />}
          label="Discontinue Date"
          value={student?.discontinueDate}
        />

      </ProfileSection>


      {/* =================================================
          CSS
      ================================================= */}

      <style>
        {`

          /* ============================================
             HEADER ICON
          ============================================ */

          .profile-header-icon {
            width: 48px;
            height: 48px;

            border-radius: 13px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #eaf2ff;
            color: #0d6efd;

            flex-shrink: 0;
          }


          /* ============================================
             PROFILE IMAGE
          ============================================ */

          .profile-image-wrapper {
            width: 120px;
            height: 120px;

            padding: 3px;

            border-radius: 50%;

            background:
              linear-gradient(
                135deg,
                #2563eb,
                #60a5fa
              );

            box-shadow:
              0 8px 20px
              rgba(37,99,235,.18);
          }

          .profile-image {
            width: 100%;
            height: 100%;

            border-radius: 50%;

            object-fit: cover;

            display: block;

            background: #fff;
          }


          /* ============================================
             STUDENT BADGES
          ============================================ */

          .student-info-badge {
            display: inline-flex;
            align-items: center;

            padding: 7px 10px;

            border-radius: 8px;

            background: #f8faff;

            border: 1px solid #dfe7f2;

            color: #6c757d;

            font-size: 11px;
          }

          .student-info-badge strong {
            color: #343a40;
            margin-left: 4px;
          }


          /* ============================================
             STATUS
          ============================================ */

          .status-box {
            padding: 15px;

            border-radius: 12px;

            background: #f0fff5;

            border: 1px solid #d7f5df;
          }


          /* ============================================
             RESPONSIVE
          ============================================ */

          @media (max-width: 767px) {

            .profile-image-wrapper {
              width: 100px;
              height: 100px;

              margin: auto;
            }

          }

        `}
      </style>

    </div>
  );
};


/* =====================================================
   STUDENT BADGE
===================================================== */

const StudentBadge = ({
  label,
  value,
}) => {

  return (
    <span className="student-info-badge">

      {label}:

      <strong>
        {value !== null &&
        value !== undefined &&
        value !== ""
          ? value
          : "—"}
      </strong>

    </span>
  );
};


/* =====================================================
   PROFILE SECTION
===================================================== */

const ProfileSection = ({
  title,
  icon,
  children,
}) => {

  return (
    <div
      className="card border-0 shadow rounded-4 mb-4"
    >

      {/* HEADER */}

      <div
        className="card-header bg-white border-0 px-3 px-md-4 py-3"
        style={{
          borderRadius: "16px 16px 0 0",
          borderBottom: "1px solid #edf0f3",
        }}
      >

        <div className="d-flex align-items-center gap-2">

          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              background: "#eaf2ff",
              color: "#0d6efd",
            }}
          >
            {React.cloneElement(icon, {
              size: 20,
            })}
          </div>

          <h5 className="fw-bold mb-0">
            {title}
          </h5>

        </div>

      </div>


      {/* BODY */}

      <div className="card-body px-3 px-md-4 py-3">

        <div className="row">

          {children}

        </div>

      </div>

    </div>
  );
};


/* =====================================================
   INFO ITEM
===================================================== */

const InfoItem = ({
  icon,
  label,
  value,
  fullWidth = false,
}) => {

  return (
    <div
      className={
        fullWidth
          ? "col-12 mb-3"
          : "col-lg-4 col-md-6 col-12 mb-3"
      }
    >

      <div
        className="h-100 p-3 rounded-3"
        style={{
          background: "#f8f9fb",
          border: "1px solid #edf0f3",
        }}
      >

        <div
          className="d-flex align-items-center gap-2 mb-2"
        >

          <span
            style={{
              color: "#0d6efd",
              display: "flex",
            }}
          >
            {React.cloneElement(icon, {
              size: 17,
            })}
          </span>

          <small className="text-muted fw-semibold">
            {label}
          </small>

        </div>

        <div
          className="fw-semibold text-dark"
          style={{
            wordBreak: "break-word",
          }}
        >
          {getDisplayValue(value)}
        </div>

      </div>

    </div>
  );
};


/* =====================================================
   DISPLAY VALUE
===================================================== */

const getDisplayValue = (value) => {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  return value;
};


export default MyProfile;


