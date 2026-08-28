

// import React, { useEffect, useMemo, useState } from "react";
// import * as XLSX from "xlsx";
// import axios from "../../api/axiosInstance";

// const ITEMS_PER_PAGE = 5;

// const CreateAccounts = () => {
//   const [loading, setLoading] = useState(false);
//   const [students, setStudents] = useState([]);

//   const [searchAdmission, setSearchAdmission] = useState("");
//   const [selectedClass, setSelectedClass] = useState("");
//   const [sortBy, setSortBy] = useState("NAME");

//   const [currentPage, setCurrentPage] = useState(1);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   // ---------------- FETCH DATA ----------------
//   useEffect(() => {
//     if (!user?.schoolId || !token) return;

//     setLoading(true);

//     axios
//       .get(
//         `/api/admissions/school?schoolId=${user.schoolId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((res) => {
//         setStudents(res.data || []);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [user?.schoolId, token]);

//   // ---------------- FILTER + SORT ----------------
//   const filteredStudents = useMemo(() => {
//     let data = [...students];

//     // ✅ ONLY Fee paid & Enrolled
//     data = data.filter(
//       (s) => s.status === "FEE_PAID" || s.status === "ENROLLED"
//     );

//     if (searchAdmission) {
//       data = data.filter((s) =>
//         s.admissionNumber
//           ?.toLowerCase()
//           .includes(searchAdmission.toLowerCase())
//       );
//     }

//     if (selectedClass) {
//       data = data.filter((s) => s.studentClass === selectedClass);
//     }

//     if (sortBy === "NAME") {
//       data.sort((a, b) =>
//         (a.firstName || "").localeCompare(b.firstName || "")
//       );
//     } else {
//       data.sort((a, b) =>
//         (a.admissionNumber || "").localeCompare(b.admissionNumber || "")
//       );
//     }

//     return data;
//   }, [students, searchAdmission, selectedClass, sortBy]);

//   // ---------------- PAGINATION ----------------
//   const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);

//   const paginatedStudents = filteredStudents.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   // ---------------- CREATE STUDENT ----------------
//   const handleCreateStudent = (student) => {
//     if (!window.confirm("Create student account?")) return;

//     const payload = {
//       admissionId: student.id,
//       username: student.email || `${student.admissionNumber}@school.com`,
//     };

//     axios
//       .post(
//         `/api/students/create`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then(() => {
//         alert("Student created successfully");

//         setStudents((prev) =>
//           prev.map((s) =>
//             s.id === student.id ? { ...s, status: "ENROLLED" } : s
//           )
//         );
//       })
//       .catch((err) => {
//         alert(err?.response?.data?.message || "Error creating student");
//       });
//   };

//   // ---------------- EXPORT TO EXCEL ----------------
//   const exportToExcel = () => {
//     const data = filteredStudents.map((s) => ({
//       AdmissionNo: s.admissionNumber,
//       Name: `${s.firstName} ${s.lastName}`,
//       Class: s.studentClass,
//       Mobile: s.preferredNo,
//       Status: s.status,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

//     XLSX.writeFile(workbook, "Students.xlsx");
//   };

//   return (
//     <>
//       {/* ---------- HEADER ---------- */}
//       <div
//         className="row shadow"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           height: "67px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <strong>Create Accounts</strong>
//         </h6>
//         <nav aria-label="breadcrumb py-2">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                 Home
//               </a>
//             </li>
//             <li className="breadcrumb-item">
//               <a href="#" style={{ textDecoration: "none", color: "black" }}>
//                 Student & Acccount Creation
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       <div className="ms-2 me-2 p-3 rounded bg-white shadow mt-4">
//         {/* ---------- FILTERS ---------- */}
//         <div className="row">
//           <div className="col-md-4">
//             <label>Admission No</label>
//             <input
//               className="form-control"
//               value={searchAdmission}
//               onChange={(e) => setSearchAdmission(e.target.value)}
//             />
//           </div>

//           <div className="col-md-4">
//             <label>Class</label>
//             <select
//               className="form-select"
//               value={selectedClass}
//               onChange={(e) => setSelectedClass(e.target.value)}
//             >
//               <option value="">All</option>
//               {["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"].map(
//                 (c) => (
//                   <option key={c}>{c}</option>
//                 )
//               )}
//             </select>
//           </div>

//           <div className="col-md-4">
//             <label>Sort By</label>
//             <select
//               className="form-select"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option value="NAME">Name</option>
//               <option value="ADMISSION">Admission No</option>
//             </select>
//           </div>
//         </div>

//         {/* ---------- EXPORT ---------- */}
//         <div className="text-end mt-3">
//           <button className="btn btn-success btn-sm" onClick={exportToExcel}>
//             Export to Excel
//           </button>
//         </div>

//         {/* ---------- TABLE ---------- */}
//         <div className="table-responsive mt-3">
//           <h6>Student Creation & Their Accounts</h6>

//           {loading ? (
//             <div className="text-center py-3">Loading...</div>
//           ) : (
//             <table className="table table-bordered table-hover">
//               <thead className="table-secondary">
//                 <tr>
//                   <th>#</th>
//                   <th>Admission No</th>
//                   <th>Student Name</th>
//                   <th>Class</th>
//                   <th>Father Mobile</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {paginatedStudents.map((s, i) => (
//                   <tr key={s.id}>
//                     <td>{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
//                     <td>{s.admissionNumber}</td>
//                     <td>{s.firstName} {s.lastName}</td>
//                     <td>{s.studentClass}</td>
//                     <td>{s.preferredNo}</td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           s.status === "FEE_PAID"
//                             ? "bg-warning text-dark"
//                             : "bg-success"
//                         }`}
//                       >
//                         {s.status}
//                       </span>
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-primary"
//                         disabled={s.status === "ENROLLED"}
//                         onClick={() => handleCreateStudent(s)}
//                       >
//                         Create Student
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* ---------- PAGINATION ---------- */}
//         <div className="d-flex justify-content-between mt-3">
//           <button
//             className="btn btn-outline-secondary btn-sm"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => p - 1)}
//           >
//             Previous
//           </button>

//           <span>
//             Page {currentPage} of {totalPages}
//           </span>

//           <button
//             className="btn btn-outline-secondary btn-sm"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateAccounts;



import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { LuDownload, LuUserPlus, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";


const ITEMS_PER_PAGE = 5;

const CreateAccounts = () => {
  const { standards } = useMasters();

  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const [searchAdmission, setSearchAdmission] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [sortBy, setSortBy] = useState("NAME");
  const [currentPage, setCurrentPage] = useState(1);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    if (!user?.schoolId || !token) return;

    setLoading(true);

    axios
      .get(`/api/admissions/school?schoolId=${user.schoolId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStudents(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      })
      .finally(() => setLoading(false));
  }, [user?.schoolId, token]);

  /* ================= FILTER + SORT ================= */

  const filteredStudents = useMemo(() => {
    let data = [...students];

    // Only Fee Paid & Enrolled
    data = data.filter(
      (s) => s.status === "FEE_PAID" || s.status === "ENROLLED"
    );

    if (searchAdmission.trim()) {
      data = data.filter((s) =>
        s.admissionNumber
          ?.toLowerCase()
          .includes(searchAdmission.toLowerCase())
      );
    }

    if (selectedClass) {
      data = data.filter((s) => s.studentClass === selectedClass);
    }

    if (sortBy === "NAME") {
      data.sort((a, b) =>
        `${a.firstName || ""} ${a.lastName || ""}`.localeCompare(
          `${b.firstName || ""} ${b.lastName || ""}`
        )
      );
    } else {
      data.sort((a, b) =>
        (a.admissionNumber || "").localeCompare(
          b.admissionNumber || ""
        )
      );
    }

    return data;
  }, [students, searchAdmission, selectedClass, sortBy]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ================= SUMMARY ================= */

  const totalStudents = filteredStudents.length;

  const accountCreated = filteredStudents.filter(
    (s) => s.status === "ENROLLED"
  ).length;

  const pendingAccounts = filteredStudents.filter(
    (s) => s.status === "FEE_PAID"
  ).length;

  /* ================= CREATE STUDENT ================= */

  const handleCreateStudent = async (student) => {
    if (!window.confirm("Create student account?")) return;

    const payload = {
      admissionId: student.id,
      username:
        student.email ||
        `${student.admissionNumber}@school.com`,
    };

    try {
      await axios.post("/api/students/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Student account created successfully.");

      setStudents((prev) =>
        prev.map((s) =>
          s.id === student.id
            ? { ...s, status: "ENROLLED" }
            : s
        )
      );
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Error creating student account"
      );
    }
  };

  /* ================= EXPORT EXCEL ================= */

  const exportToExcel = () => {
    if (!filteredStudents.length) {
      alert("No student data available to export.");
      return;
    }

    const data = filteredStudents.map((s, index) => ({
      "S.No": index + 1,
      "Admission No": s.admissionNumber || "-",
      "Student Name":
        `${s.firstName || ""} ${s.middleName || ""} ${
          s.lastName || ""
        }`.replace(/\s+/g, " ").trim(),
      Class: s.studentClass || "-",
      "Father Mobile": s.preferredNo || "-",
      Status: s.status || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Student Accounts"
    );

    XLSX.writeFile(
      workbook,
      "Student_Accounts.xlsx"
    );
  };

  /* ================= PAGE RESET ================= */

  const handleSearchChange = (e) => {
    setSearchAdmission(e.target.value);
    setCurrentPage(1);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const PRIMARY = "rgb(30, 58, 138)";

  return (
    <>
      {/* ================= PAGE HEADER ================= */}

      <div
        className="row shadow"
        style={{
          backgroundColor: "white",
          margin: "10px",
          minHeight: "70px",
          borderRadius: "6px",
          padding: "10px 15px",
          color: "black",
          borderLeft: `4px solid ${PRIMARY}`,
        }}
      >
        <h6 className="mb-1">
          <strong>Create Accounts</strong>
        </h6>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "#555",
                }}
              >
                Home
              </a>
            </li>

            <li
              className="breadcrumb-item active"
              aria-current="page"
              style={{
                color: PRIMARY,
                fontWeight: "500",
              }}
            >
              Student & Account Creations
            </li>
          </ol>
        </nav>
      </div>

      {/* ================= MAIN CARD ================= */}

      <div className="ms-2 me-2 mt-3 mb-4">
        <div className="bg-white shadow rounded-3 p-3 p-md-4">

          {/* ================= TITLE + EXPORT ================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
            <div>
              <h5 className="mb-1 fw-semibold">
                Student Account Creation
              </h5>

              <small className="text-muted">
                Create login accounts for enrolled students
              </small>
            </div>

            <button
              className="btn btn-success d-flex align-items-center gap-2"
              onClick={exportToExcel}
            >
              <LuDownload size={17} />
              Export Excel
            </button>
          </div>

          {/* ================= SUMMARY CARDS ================= */}

          <div className="row g-3 mb-4">

            <div className="col-xl-4 col-md-6">
              <div
                className="rounded-3 p-3 h-100"
                style={{
                  background:
                    "linear-gradient(135deg, #0d6efd, #3d8bfd)",
                  color: "#fff",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="opacity-75">
                      Total Students
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {totalStudents}
                    </h3>
                  </div>

                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(255,255,255,.18)",
                    }}
                  >
                    <LuUserPlus size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div
                className="rounded-3 p-3 h-100"
                style={{
                  background:
                    "linear-gradient(135deg, #198754, #35a56f)",
                  color: "#fff",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="opacity-75">
                      Accounts Created
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {accountCreated}
                    </h3>
                  </div>

                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(255,255,255,.18)",
                    }}
                  >
                    <LuUserPlus size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div
                className="rounded-3 p-3 h-100"
                style={{
                  background:
                    "linear-gradient(135deg, #ffc107, #ffca2c)",
                  color: "#212529",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="opacity-75">
                      Pending Accounts
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {pendingAccounts}
                    </h3>
                  </div>

                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(255,255,255,.35)",
                    }}
                  >
                    <LuUserPlus size={24} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ================= FILTER SECTION ================= */}

          <div
            className="rounded-3 p-3 mb-4"
            style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #e9ecef",
            }}
          >
            <div className="row g-3">

              <div className="col-xl-4 col-md-6">
                <label className="form-label fw-semibold">
                  Admission No
                </label>

                <input
                  type="search"
                  className="form-control"
                  placeholder="Search admission number..."
                  value={searchAdmission}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="col-xl-4 col-md-6">
                <label className="form-label fw-semibold">
                  Class
                </label>

                <select
                  className="form-select"
                  value={selectedClass}
                  onChange={handleClassChange}
                >
                  <option value="">All Classes</option>

                  {standards?.length > 0
                    ? standards.map((standard) => (
                        <option
                          key={
                            standard.id ||
                            standard.value ||
                            standard
                          }
                          value={
                            standard.name ||
                            standard.value ||
                            standard
                          }
                        >
                          {standard.name ||
                            standard.label ||
                            standard.value ||
                            standard}
                        </option>
                      ))
                    : [
                        "I",
                        "II",
                        "III",
                        "IV",
                        "V",
                        "VI",
                        "VII",
                        "VIII",
                        "IX",
                        "X",
                        "XI",
                        "XII",
                      ].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                </select>
              </div>

              <div className="col-xl-4 col-md-6">
                <label className="form-label fw-semibold">
                  Sort By
                </label>

                <select
                  className="form-select"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="NAME">
                    Student Name
                  </option>

                  <option value="ADMISSION">
                    Admission No
                  </option>
                </select>
              </div>

            </div>
          </div>

          {/* ================= TABLE HEADER ================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <div>
              <h6 className="fw-semibold mb-1">
                Student Accounts
              </h6>

              <small className="text-muted">
                Showing {filteredStudents.length} student
                {filteredStudents.length !== 1 ? "s" : ""}
              </small>
            </div>
          </div>

          {/* ================= TABLE ================= */}

          <div className="table-responsive">
            <table
              className="table table-hover align-middle mb-0"
              style={{
                minWidth: "850px",
              }}
            >
              <thead
                style={{
                  backgroundColor: "#f1f5f9",
                }}
              >
                <tr>
                  <th className="px-3 py-3">#</th>
                  <th>Admission No</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Father Mobile</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-5"
                    >
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      />

                      <div className="text-muted mt-2">
                        Loading students...
                      </div>
                    </td>
                  </tr>
                ) : paginatedStudents.length > 0 ? (
                  paginatedStudents.map((s, i) => (
                    <tr key={s.id}>
                      <td className="px-3 fw-semibold text-muted">
                        {(currentPage - 1) *
                          ITEMS_PER_PAGE +
                          i +
                          1}
                      </td>

                      <td>
                        <span className="fw-semibold">
                          {s.admissionNumber || "-"}
                        </span>
                      </td>

                      <td>
                        <div className="fw-semibold">
                          {`${s.firstName || ""} ${
                            s.middleName || ""
                          } ${s.lastName || ""}`
                            .replace(/\s+/g, " ")
                            .trim() || "-"}
                        </div>
                      </td>

                      <td>
                        <span className="badge bg-light text-dark border">
                          {s.studentClass || "-"}
                        </span>
                      </td>

                      <td>
                        {s.preferredNo || "-"}
                      </td>

                      <td>
                        <span
                          className={`badge rounded-pill ${
                            s.status === "FEE_PAID"
                              ? "bg-warning text-dark"
                              : "bg-success"
                          }`}
                        >
                          {s.status === "FEE_PAID"
                            ? "FEE PAID"
                            : "ACCOUNT CREATED"}
                        </span>
                      </td>

                      <td className="text-center">
                        <button
                          className={`btn btn-sm d-inline-flex align-items-center gap-1 ${
                            s.status === "ENROLLED"
                              ? "btn-light text-muted border"
                              : "btn-primary"
                          }`}
                          disabled={
                            s.status === "ENROLLED"
                          }
                          onClick={() =>
                            handleCreateStudent(s)
                          }
                        >
                          <LuUserPlus size={15} />

                          {s.status === "ENROLLED"
                            ? "Created"
                            : "Create Account"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-5"
                    >
                      <div className="text-muted">
                        No student records found.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION ================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-2">

            <small className="text-muted">
              Page {currentPage} of {totalPages}
            </small>

            <div className="d-flex gap-2">

              <button
                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((p) => p - 1)
                }
              >
                <LuChevronLeft size={16} />
                Previous
              </button>

              <div className="d-flex gap-1">
                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    className={`btn btn-sm ${
                      currentPage === page
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() =>
                      setCurrentPage(page)
                    }
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage((p) => p + 1)
                }
              >
                Next
                <LuChevronRight size={16} />
              </button>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default CreateAccounts;

