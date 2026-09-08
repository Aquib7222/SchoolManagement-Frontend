// import React, { useEffect, useState } from "react";
// import {
//   FaAngleDoubleDown,
//   FaAngleDoubleUp,
//   FaSearch,
//   FaRedo,
// } from "react-icons/fa";
// import axiosInstance from "../../api/axiosInstance";

// const TeacherSearch = () => {
//   const [showInput, setShowInput] = useState(false);
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [filters, setFilters] = useState({
//     employeeId: "",
//     firstName: "",
//     phoneNumber: "",
//     email: "",
//     department: "",
//     designation: "",
//   });

//   const loggedInUser = JSON.parse(localStorage.getItem("user"));
//   const schoolId = loggedInUser?.school?.id;

//   /* =========================
//      HANDLE CHANGE
//   ========================== */
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   /* =========================
//      FETCH TEACHERS
//   ========================== */
//   const fetchTeachers = async () => {
//     if (!schoolId) return;

//     try {
//       setLoading(true);

//       const params = {
//         schoolId: schoolId,
//         employeeId: filters.employeeId || undefined,
//         firstName: filters.firstName || undefined,
//         phoneNumber: filters.phoneNumber || undefined,
//         email: filters.email || undefined,
//         department: filters.department || undefined,
//         designation: filters.designation || undefined,
//       };

//       console.log("Teacher Search Params:", params);

//       const response = await axiosInstance.get("/api/teachers", {
//         params,
//       });

//       console.log("Teacher Response:", response.data);

//       setTeachers(response.data || []);
//     } catch (error) {
//       console.error("Teacher fetch error:", error);
//       setTeachers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================
//      INITIAL LOAD
//   ========================== */
//   useEffect(() => {
//     fetchTeachers();
//   }, [schoolId]);

//   /* =========================
//      RESET
//   ========================== */
//   const handleReset = () => {
//     setFilters({
//       employeeId: "",
//       firstName: "",
//       phoneNumber: "",
//       email: "",
//       department: "",
//       designation: "",
//     });

//     setShowInput(false);

//     // Reset ke baad all teachers
//     setTimeout(() => {
//       fetchTeachers();
//     }, 0);
//   };

//   return (
//     <>
//       {/* =========================
//           HEADER
//       ========================== */}
//       <div
//         className="row shadow-lg ms-2 me-2"
//         style={{
//           backgroundColor: "white",
//           minHeight: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6 className="mb-1">
//           <strong>Teacher Search</strong>
//         </h6>

//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb mb-0">
//             <li className="breadcrumb-item">
//               <a
//                 href="/"
//                 style={{
//                   textDecoration: "none",
//                   color: "black",
//                 }}
//               >
//                 Home
//               </a>
//             </li>

//             <li className="breadcrumb-item active">
//               Teacher Search
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* =========================
//           SEARCH CARD
//       ========================== */}
//       <div className="ms-2 me-2 shadow bg-white rounded mt-4">
//         <div className="card border-0">
//           <div className="card-header">
//             <strong>Search Teacher</strong>
//           </div>

//           <div className="card-body p-3">
//             {/* FIRST ROW */}
//             <div className="row g-3 align-items-end">

//               {/* Employee ID */}
//               <div className="col-xl-4 col-md-4">
//                 <label className="form-label">
//                   Employee ID
//                 </label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   name="employeeId"
//                   placeholder="Enter employee ID"
//                   value={filters.employeeId}
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Teacher Name */}
//               <div className="col-xl-4 col-md-4">
//                 <label className="form-label">
//                   Teacher Name
//                 </label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   name="firstName"
//                   placeholder="Enter teacher name"
//                   value={filters.firstName}
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Expand */}
//               <div className="col-xl-2 col-md-2">
//                 <button
//                   type="button"
//                   className="btn btn-outline-primary w-100"
//                   onClick={() =>
//                     setShowInput((prev) => !prev)
//                   }
//                 >
//                   {showInput ? (
//                     <>
//                       <FaAngleDoubleUp /> Hide
//                     </>
//                   ) : (
//                     <>
//                       <FaAngleDoubleDown /> More
//                     </>
//                   )}
//                 </button>
//               </div>

//               {/* Reset */}
//               <div className="col-xl-2 col-md-2">
//                 <button
//                   type="button"
//                   className="btn btn-outline-danger w-100"
//                   onClick={handleReset}
//                 >
//                   <FaRedo className="me-1" />
//                   Reset
//                 </button>
//               </div>
//             </div>

//             {/* =========================
//                 ADVANCED FILTER
//             ========================== */}
//             {showInput && (
//               <div className="mt-3">

//                 <div className="row g-3">

//                   {/* Phone */}
//                   <div className="col-xl-3 col-md-6">
//                     <label className="form-label">
//                       Phone Number
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="phoneNumber"
//                       placeholder="Enter phone number"
//                       value={filters.phoneNumber}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   {/* Email */}
//                   <div className="col-xl-3 col-md-6">
//                     <label className="form-label">
//                       Email
//                     </label>

//                     <input
//                       type="email"
//                       className="form-control"
//                       name="email"
//                       placeholder="Enter email"
//                       value={filters.email}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   {/* Department */}
//                   <div className="col-xl-3 col-md-6">
//                     <label className="form-label">
//                       Department
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="department"
//                       placeholder="Enter department"
//                       value={filters.department}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   {/* Designation */}
//                   <div className="col-xl-3 col-md-6">
//                     <label className="form-label">
//                       Designation
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="designation"
//                       placeholder="Enter designation"
//                       value={filters.designation}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 {/* SEARCH BUTTON */}
//                 <div className="row mt-3">
//                   <div className="col-md-3">
//                     <button
//                       type="button"
//                       className="btn btn-primary"
//                       onClick={fetchTeachers}
//                       disabled={loading}
//                     >
//                       <FaSearch className="me-1" />

//                       {loading ? "Searching..." : "Search"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* =========================
//           TEACHER LIST
//       ========================== */}
//       <div className="ms-2 me-2 shadow bg-white rounded mt-4">
//         <div className="card border-0">

//           {/* HEADER */}
//           <div className="card-header d-flex justify-content-between align-items-center">
//             <h6 className="mb-0">
//               <strong>Employee Details</strong>
//             </h6>

//             <span className="badge bg-primary">
//               Total : {teachers.length}
//             </span>
//           </div>

//           {/* TABLE */}
//           <div className="card-body">
//             <div className="table-responsive">

//               <table className="table table-bordered table-hover table-striped align-middle text-center mb-0">

//                 <thead className="table-primary">
//                   <tr>
//                     <th>S.No</th>
//                     <th>Employee ID</th>
//                     <th>Employee Name</th>
//                     <th>Mobile</th>
//                     <th>Department</th>
//                     <th>Designation</th>
//                     <th>Email</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   {/* LOADING */}
//                   {loading ? (
//                     <tr>
//                       <td colSpan="7" className="text-center p-5">

//                         <div className="spinner-border text-primary">
//                         </div>

//                         <p className="mt-2 mb-0">
//                           Loading teachers...
//                         </p>

//                       </td>
//                     </tr>
//                   ) : teachers.length > 0 ? (

//                     /* DATA */
//                     teachers.map((teacher, index) => (
//                       <tr key={teacher.id}>

//                         <td>
//                           {index + 1}
//                         </td>

//                         <td>
//                           {teacher.employeeId || "-"}
//                         </td>

//                         <td className="fw-semibold">
//                           {teacher.firstName || ""}{" "}
//                           {teacher.lastName || ""}
//                         </td>

//                         <td>
//                           {teacher.phoneNumber || "-"}
//                         </td>

//                         <td>
//                           {teacher.department || "-"}
//                         </td>

//                         <td>
//                           {teacher.designation || "-"}
//                         </td>

//                         <td>
//                           {teacher.email || "-"}
//                         </td>

//                       </tr>
//                     ))

//                   ) : (

//                     /* EMPTY */
//                     <tr>
//                       <td
//                         colSpan="7"
//                         className="text-center text-danger fw-bold p-4"
//                       >
//                         No Teacher Found
//                       </td>
//                     </tr>

//                   )}

//                 </tbody>
//               </table>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TeacherSearch;


import React, { useEffect, useState } from "react";
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaSearch,
  FaRedo,
  FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const TeacherSearch = () => {
  const navigate = useNavigate();

  const [showInput, setShowInput] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    employeeId: "",
    firstName: "",
    phoneNumber: "",
    email: "",
    department: "",
    designation: "",
  });

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  // Support both user.school.id and user.schoolId
  const schoolId =
    loggedInUser?.school?.id || loggedInUser?.schoolId;

  /* =========================
     HANDLE CHANGE
  ========================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     FETCH TEACHERS
  ========================== */
  const fetchTeachers = async () => {
    if (!schoolId) {
      console.error("School ID not found");
      setTeachers([]);
      return;
    }

    try {
      setLoading(true);

      const params = {
        schoolId: schoolId,
        employeeId: filters.employeeId || undefined,
        firstName: filters.firstName || undefined,
        phoneNumber: filters.phoneNumber || undefined,
        email: filters.email || undefined,
        department: filters.department || undefined,
        designation: filters.designation || undefined,
      };

      console.log("Teacher Search Params:", params);

      const response = await axiosInstance.get("/api/teachers", {
        params,
      });

      console.log("Teacher Response:", response.data);

      setTeachers(response.data || []);
    } catch (error) {
      console.error("Teacher fetch error:", error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INITIAL LOAD
  ========================== */
  useEffect(() => {
    if (schoolId) {
      fetchTeachers();
    }
  }, [schoolId]);

  /* =========================
     RESET
  ========================== */
  const handleReset = () => {
    setFilters({
      employeeId: "",
      firstName: "",
      phoneNumber: "",
      email: "",
      department: "",
      designation: "",
    });

    setShowInput(false);

    // Fetch all teachers after reset
    setTimeout(() => {
      fetchTeachers();
    }, 0);
  };

  /* =========================
     VIEW TEACHER PROFILE
  ========================== */
  const handleViewProfile = (employeeId) => {
    if (!employeeId) {
      alert("Employee ID not found");
      return;
    }

    navigate(`/teacher/profile/${employeeId}`);
  };

  return (
    <>
      {/* =========================
          PAGE HEADER
      ========================== */}
      <div
        className="row shadow-lg ms-2 me-2"
        style={{
          backgroundColor: "white",
          minHeight: "70px",
          borderRadius: "8px",
          padding: "12px 15px",
          color: "black",
        }}
      >
        <h6 className="mb-1">
          <strong>Teacher Search</strong>
        </h6>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "#0d6efd",
                  fontWeight: "500",
                }}
              >
                Home
              </a>
            </li>

            <li className="breadcrumb-item active">
              Teacher Search
            </li>
          </ol>
        </nav>
      </div>

      {/* =========================
          SEARCH CARD
      ========================== */}
      <div className="ms-2 me-2 shadow bg-white rounded mt-4">
        <div className="card border-0">

          {/* CARD HEADER */}
          <div
            className="card-header text-white"
            style={{
              background:
                "linear-gradient(135deg, #0d6efd, #0b5ed7)",
              borderRadius: "6px 6px 0 0",
              padding: "12px 16px",
            }}
          >
            <strong>Search Teacher</strong>
          </div>

          <div className="card-body p-3">

            {/* =========================
                FIRST ROW
            ========================== */}
            <div className="row g-3 align-items-end">

              {/* Employee ID */}
              <div className="col-xl-4 col-md-4">
                <label className="form-label fw-semibold">
                  Employee ID
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="employeeId"
                  placeholder="Enter employee ID"
                  value={filters.employeeId}
                  onChange={handleChange}
                />
              </div>

              {/* Teacher Name */}
              <div className="col-xl-4 col-md-4">
                <label className="form-label fw-semibold">
                  Teacher Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="Enter teacher name"
                  value={filters.firstName}
                  onChange={handleChange}
                />
              </div>

              {/* More */}
              <div className="col-xl-2 col-md-2">
                <button
                  type="button"
                  className="btn btn-outline-primary w-100"
                  onClick={() =>
                    setShowInput((prev) => !prev)
                  }
                >
                  {showInput ? (
                    <>
                      <FaAngleDoubleUp className="me-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <FaAngleDoubleDown className="me-1" />
                      More
                    </>
                  )}
                </button>
              </div>

              {/* Reset */}
              <div className="col-xl-2 col-md-2">
                <button
                  type="button"
                  className="btn btn-outline-danger w-100"
                  onClick={handleReset}
                  disabled={loading}
                >
                  <FaRedo className="me-1" />
                  Reset
                </button>
              </div>
            </div>

            {/* =========================
                ADVANCED FILTER
            ========================== */}
            {showInput && (
              <div className="mt-3">

                <div className="row g-3">

                  {/* Phone */}
                  <div className="col-xl-3 col-md-6">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      placeholder="Enter phone number"
                      value={filters.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div className="col-xl-3 col-md-6">
                    <label className="form-label fw-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      value={filters.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Department */}
                  <div className="col-xl-3 col-md-6">
                    <label className="form-label fw-semibold">
                      Department
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="department"
                      placeholder="Enter department"
                      value={filters.department}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Designation */}
                  <div className="col-xl-3 col-md-6">
                    <label className="form-label fw-semibold">
                      Designation
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="designation"
                      placeholder="Enter designation"
                      value={filters.designation}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* SEARCH BUTTON */}
                <div className="row mt-3">
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={fetchTeachers}
                      disabled={loading}
                    >
                      <FaSearch className="me-1" />

                      {loading
                        ? "Searching..."
                        : "Search"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================
          TEACHER LIST
      ========================== */}
      <div className="ms-2 me-2 shadow bg-white rounded mt-4">
        <div className="card border-0">

          {/* =========================
              LIST HEADER
          ========================== */}
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: "#ffffff",
              padding: "14px 16px",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            <h6 className="mb-0 text-primary">
              <strong>Employee Details</strong>
            </h6>

            <span className="badge bg-primary px-3 py-2">
              Total : {teachers.length}
            </span>
          </div>

          {/* =========================
              TABLE
          ========================== */}
          <div className="card-body p-3">
            <div className="table-responsive">

              <table
                className="table table-bordered table-hover table-striped align-middle text-center mb-0"
                style={{
                  minWidth: "950px",
                }}
              >
                <thead className="table-primary">
                  <tr>
                    <th style={{ width: "70px" }}>
                      S.No
                    </th>

                    <th>
                      Employee ID
                    </th>

                    <th>
                      Employee Name
                    </th>

                    <th>
                      Mobile
                    </th>

                    <th>
                      Department
                    </th>

                    <th>
                      Designation
                    </th>

                    <th>
                      Email
                    </th>

                    <th style={{ width: "90px" }}>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {/* =========================
                      LOADING
                  ========================== */}
                  {loading ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center p-5"
                      >
                        <div className="spinner-border text-primary">
                        </div>

                        <p className="mt-2 mb-0 text-muted">
                          Loading teachers...
                        </p>
                      </td>
                    </tr>
                  ) : teachers.length > 0 ? (

                    /* =========================
                       DATA
                    ========================== */
                    teachers.map((teacher, index) => (
                      <tr key={teacher.id || teacher.employeeId}>

                        {/* S.NO */}
                        <td className="fw-semibold">
                          {index + 1}
                        </td>

                        {/* EMPLOYEE ID */}
                        <td>
                          <span className="fw-semibold text-primary">
                            {teacher.employeeId || "-"}
                          </span>
                        </td>

                        {/* NAME */}
                        <td className="fw-semibold">
                          {teacher.firstName || ""}{" "}
                          {teacher.lastName || ""}
                        </td>

                        {/* MOBILE */}
                        <td>
                          {teacher.phoneNumber || "-"}
                        </td>

                        {/* DEPARTMENT */}
                        <td>
                          {teacher.department || "-"}
                        </td>

                        {/* DESIGNATION */}
                        <td>
                          {teacher.designation || "-"}
                        </td>

                        {/* EMAIL */}
                        <td>
                          {teacher.email || "-"}
                        </td>

                        {/* =========================
                            VIEW BUTTON
                        ========================== */}
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            title="View Teacher Profile"
                            onClick={() =>
                              handleViewProfile(
                                teacher.employeeId
                              )
                            }
                          >
                            <FaEye />
                          </button>
                        </td>

                      </tr>
                    ))

                  ) : (

                    /* =========================
                       EMPTY
                    ========================== */
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center text-danger fw-bold p-4"
                      >
                        No Teacher Found
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherSearch;