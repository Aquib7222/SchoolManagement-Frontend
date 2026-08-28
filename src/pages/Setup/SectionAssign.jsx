// import React from 'react'

// const SectionAssign = () => {
//   return (
//     <>
    
//        {/* Header */}
//       <div
//         className="row shadow-lg"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           height: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <strong>Section Assign</strong>
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
//                 Students Section Assign
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>
    
    
//     </>
//   )
// }

// export default SectionAssign

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AssignSection = () => {

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const [students, setStudents] = useState([]);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [section, setSection] = useState("");

//   /* FETCH STUDENTS */
//   useEffect(() => {
//     axios.get("http://localhost:8080/api/sections/students", {
//       params: { schoolId: user.schoolId, studentClass: selectedClass },
//       headers: { Authorization: `Bearer ${token}` }
//     }).then(res => setStudents(res.data));
//   }, [selectedClass]);

//   /* SELECT STUDENT */
//   const toggleStudent = (id) => {
//     setSelectedIds(prev =>
//       prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
//     );
//   };

//   /* ASSIGN SECTION */
//   const assignSection = () => {
//     if (!section || selectedIds.length === 0) {
//       alert("Select students and section");
//       return;
//     }

//     axios.post(
//       `http://localhost:8080/api/sections/assign?schoolId=${user.schoolId}`,
//       { studentIds: selectedIds, section },
//       { headers: { Authorization: `Bearer ${token}` } }
//     ).then(() => {
//       alert("Section assigned successfully");
//       setSelectedIds([]);
//     });
//   };

//   return (
//     <div className="bg-white p-3 m-2 rounded shadow">
//       <h6><strong>Assign Section</strong></h6>

//       {/* FILTER */}
//       <div className="row mt-3">
//         <div className="col-md-3">
//           <label>Class</label>
//           <select
//             className="form-select"
//             value={selectedClass}
//             onChange={e => setSelectedClass(e.target.value)}
//           >
//             <option value="">All</option>
//             {["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"]
//               .map(c => <option key={c}>{c}</option>)}
//           </select>
//         </div>

//         <div className="col-md-3">
//           <label>Section</label>
//           <select
//             className="form-select"
//             value={section}
//             onChange={e => setSection(e.target.value)}
//           >
//             <option value="">Select</option>
//             {["A","B","C","D","E"].map(s => (
//               <option key={s}>{s}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* TABLE */}
//       <table className="table table-bordered mt-3">
//         <thead>
//           <tr>
//             <th></th>
//             <th>Admission No</th>
//             <th>Name</th>
//             <th>Class</th>
//             <th>Section</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map(s => (
//             <tr key={s.id}>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={selectedIds.includes(s.id)}
//                   onChange={() => toggleStudent(s.id)}
//                 />
//               </td>
//               <td>{s.admissionNumber}</td>
//               <td>{s.firstName} {s.lastName}</td>
//               <td>{s.studentClass}</td>
//               <td>{s.section || "-"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button className="btn btn-primary" onClick={assignSection}>
//         Assign Section
//       </button>
//     </div>
//   );
// };

// export default AssignSection;



import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaCheck,
  FaArrowRight,
  FaUserCheck,
} from "react-icons/fa";
import {
  IoSearchOutline,
  IoPrintOutline,
} from "react-icons/io5";
import {
  TbRepeat,
} from "react-icons/tb";
import {
  PiMicrosoftExcelLogoBold,
} from "react-icons/pi";
import {
  MdOutlinePictureAsPdf,
} from "react-icons/md";
import {
  RiErrorWarningFill,
} from "react-icons/ri";
import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AssignSection = () => {
  const { sessions, standards, sections } = useMasters();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const schoolId = user?.schoolId;

  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  /* --------------------------------
     FETCH STUDENTS
  -------------------------------- */
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        "/api/sections/students",
        {
          params: {
            schoolId,
            academicYear: selectedSession || undefined,
            studentClass: selectedClass || undefined,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(response.data || []);
      setSelectedIds([]);
      setCurrentPage(1);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      alert(
        error.response?.data?.message ||
          "Failed to load students."
      );
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------------
     SEARCH
  -------------------------------- */
  const handleSearch = () => {
    fetchStudents();
  };

  /* --------------------------------
     RESET
  -------------------------------- */
  const handleReset = () => {
    setSelectedSession("");
    setSelectedClass("");
    setSelectedSection("");
    setSearchText("");
    setSelectedIds([]);
    setStudents([]);
    setCurrentPage(1);
  };

  /* --------------------------------
     FILTER STUDENTS
  -------------------------------- */
  const filteredStudents = students.filter((student) => {
    const search = searchText.toLowerCase().trim();

    if (!search) return true;

    const name =
      `${student.firstName || ""} ${student.lastName || ""}`
        .toLowerCase();

    const admissionNumber =
      String(student.admissionNumber || "").toLowerCase();

    return (
      name.includes(search) ||
      admissionNumber.includes(search)
    );
  });

  /* --------------------------------
     PAGINATION
  -------------------------------- */
  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  const indexOfLastStudent =
    currentPage * studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  /* --------------------------------
     SELECT STUDENT
  -------------------------------- */
  const toggleStudent = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  /* --------------------------------
     SELECT ALL
  -------------------------------- */
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const ids = currentStudents.map(
        (student) => student.id
      );

      setSelectedIds((prev) => [
        ...new Set([...prev, ...ids]),
      ]);
    } else {
      const currentIds = currentStudents.map(
        (student) => student.id
      );

      setSelectedIds((prev) =>
        prev.filter(
          (id) => !currentIds.includes(id)
        )
      );
    }
  };

  const isAllCurrentSelected =
    currentStudents.length > 0 &&
    currentStudents.every((student) =>
      selectedIds.includes(student.id)
    );

  /* --------------------------------
     ASSIGN SECTION
  -------------------------------- */
  const assignSection = async () => {
    if (!selectedSection) {
      alert("Please select a section.");
      return;
    }

    if (selectedIds.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post(
        `/api/sections/assign?schoolId=${schoolId}`,
        {
          studentIds: selectedIds,
          section: selectedSection,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Section assigned successfully ✅");

      setSelectedIds([]);

      fetchStudents();
    } catch (error) {
      console.error("Assign section error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to assign section."
      );
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------------
     EXPORT EXCEL
  -------------------------------- */
  const exportExcel = () => {
    if (filteredStudents.length === 0) {
      alert("No students available to export.");
      return;
    }

    const data = filteredStudents.map(
      (student, index) => ({
        "Sl No": index + 1,
        "Admission No": student.admissionNumber,
        "Student Name":
          `${student.firstName || ""} ${
            student.lastName || ""
          }`.trim(),
        Class: student.studentClass,
        Section: student.section || "-",
        Gender: student.gender || "-",
        "Date of Birth": student.dob || "-",
        Status: student.status || "-",
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    worksheet["!cols"] = [
      { wch: 8 },
      { wch: 18 },
      { wch: 28 },
      { wch: 15 },
      { wch: 12 },
      { wch: 12 },
      { wch: 18 },
      { wch: 15 },
    ];

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Students"
    );

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      "Assign_Section_Students.xlsx"
    );
  };

  /* --------------------------------
     PRINT
  -------------------------------- */
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <div
        className="row shadow-lg"
        style={{
          backgroundColor: "white",
          margin: "10px",
          minHeight: "70px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6 className="mb-1">
          <strong>
            <FaUserCheck className="me-2 text-success" />
            Assign Section
          </strong>
        </h6>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <small>Home</small>
              </a>
            </li>

            <li className="breadcrumb-item">
              <small>School Management</small>
            </li>

            <li className="breadcrumb-item active">
              <small>Assign Section</small>
            </li>
          </ol>
        </nav>
      </div>

      {/* ================= FILTER CARD ================= */}
      <div className="ms-2 me-2 mt-3 bg-white rounded shadow">
        <div className="card border-0">
          <div className="card-header bg-white">
            <strong>Assign Section</strong>
          </div>

          <div className="card-body">
            <div className="row g-3">

              {/* SESSION */}
              <div className="col-12 col-md-3">
                <label className="form-label">
                  Session
                  <span className="text-danger"> *</span>
                </label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) =>
                    setSelectedSession(e.target.value)
                  }
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
              </div>

              {/* CLASS */}
              <div className="col-12 col-md-3">
                <label className="form-label">
                  Class
                  <span className="text-danger"> *</span>
                </label>

                <select
                  className="form-select"
                  value={selectedClass}
                  onChange={(e) =>
                    setSelectedClass(e.target.value)
                  }
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

              {/* SECTION */}
              <div className="col-12 col-md-3">
                <label className="form-label">
                  Assign Section
                  <span className="text-danger"> *</span>
                </label>

                <select
                  className="form-select"
                  value={selectedSection}
                  onChange={(e) =>
                    setSelectedSection(e.target.value)
                  }
                >
                  <option value="">
                    Select Section
                  </option>

                  {sections.map((section) => (
                    <option
                      key={section}
                      value={section}
                    >
                      {section}
                    </option>
                  ))}
                </select>
              </div>

              {/* SEARCH BUTTON */}
              <div className="col-12 col-md-3">
                <button
                  className="btn btn-success w-100 mt-md-4"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  <IoSearchOutline className="me-1" />
                  {loading
                    ? "Loading..."
                    : "Search Students"}
                </button>
              </div>
            </div>

            {/* SECOND ROW */}
            <div className="row mt-3 g-3">

              <div className="col-12 col-md-5">
                <label className="form-label">
                  Search Student
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <IoSearchOutline />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Adm No. or Name..."
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              <div className="col-12 col-md-3">
                <button
                  className="btn border w-100 mt-md-4"
                  onClick={handleReset}
                >
                  <TbRepeat className="me-1" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      {students.length > 0 && (
        <div className="container-fluid mt-3 px-2">
          <div className="row g-3">

            {/* ================= STUDENT LIST ================= */}
            <div className="col-12 col-lg-9">
              <div className="card shadow h-100 border-0">

                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <strong>
                    <FaUsers className="me-2 text-success" />
                    Student List
                  </strong>

                  {/* EXPORT */}
                  <div className="dropdown">
                    <button
                      className="btn border dropdown-toggle d-flex align-items-center gap-2"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <PiMicrosoftExcelLogoBold
                        color="green"
                        size={18}
                      />
                      Export
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">

                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center gap-2"
                          onClick={exportExcel}
                        >
                          <PiMicrosoftExcelLogoBold
                            color="green"
                            size={18}
                          />
                          Export Excel
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center gap-2"
                          onClick={() =>
                            alert(
                              "PDF export can be added here."
                            )
                          }
                        >
                          <MdOutlinePictureAsPdf
                            color="red"
                            size={18}
                          />
                          Export PDF
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center gap-2"
                          onClick={handlePrint}
                        >
                          <IoPrintOutline
                            color="#0d6efd"
                            size={18}
                          />
                          Print
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card-body">

                  {/* SELECT ALL */}
                  <div className="d-flex justify-content-between align-items-center mb-3">

                    <div className="form-check ms-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isAllCurrentSelected}
                        onChange={handleSelectAll}
                      />

                      <label className="form-check-label ms-2">
                        Select All
                      </label>
                    </div>

                    <span className="badge bg-success">
                      {filteredStudents.length} Students
                    </span>
                  </div>

                  {/* TABLE */}
                  <div className="table-responsive">
                    <table className="table table-hover align-middle border">
                      <thead className="table-success">
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                isAllCurrentSelected
                              }
                              onChange={handleSelectAll}
                            />
                          </th>

                          <th>Adm No.</th>
                          <th>Student Name</th>
                          <th>Gender</th>
                          <th>Class</th>
                          <th>Current Section</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentStudents.length > 0 ? (
                          currentStudents.map(
                            (student) => (
                              <tr key={student.id}>
                                <td>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={selectedIds.includes(
                                      student.id
                                    )}
                                    onChange={() =>
                                      toggleStudent(
                                        student.id
                                      )
                                    }
                                  />
                                </td>

                                <td>
                                  <strong>
                                    {
                                      student.admissionNumber
                                    }
                                  </strong>
                                </td>

                                <td>
                                  {student.firstName}{" "}
                                  {student.lastName || ""}
                                </td>

                                <td>
                                  {student.gender || "-"}
                                </td>

                                <td>
                                  {student.studentClass ||
                                    "-"}
                                </td>

                                <td>
                                  <span className="badge bg-light text-dark border">
                                    {student.section ||
                                      "-"}
                                  </span>
                                </td>

                                <td>
                                  <span className="badge bg-success">
                                    {student.status ||
                                      "ACTIVE"}
                                  </span>
                                </td>
                              </tr>
                            )
                          )
                        ) : (
                          <tr>
                            <td
                              colSpan="7"
                              className="text-center py-4"
                            >
                              No students found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* PAGINATION */}
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-end mt-3">
                      {[...Array(totalPages)].map(
                        (_, index) => (
                          <button
                            key={index}
                            className={`btn mx-1 ${
                              currentPage === index + 1
                                ? "btn-primary"
                                : "btn-outline-primary"
                            }`}
                            onClick={() =>
                              setCurrentPage(index + 1)
                            }
                          >
                            {index + 1}
                          </button>
                        )
                      )}
                    </div>
                  )}

                  {/* SUMMARY */}
                  <div className="alert bg-white border mt-3 d-flex justify-content-between py-2 mb-0">
                    <span>
                      Total Students:{" "}
                      <strong>
                        {filteredStudents.length}
                      </strong>
                    </span>

                    <span>
                      Selected Students:{" "}
                      <strong className="text-success">
                        {selectedIds.length}
                      </strong>
                    </span>
                  </div>

                  {/* NOTE */}
                  <div
                    className="alert border mt-3 d-flex py-2 mb-0"
                    style={{
                      backgroundColor: "#FFF3CD",
                      color: "#664D03",
                    }}
                  >
                    <small>
                      <RiErrorWarningFill
                        size={17}
                        className="me-1"
                      />
                      Select students from the list and
                      choose the section from the right
                      panel to assign them.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= SUMMARY ================= */}
            <div className="col-12 col-lg-3">
              <div className="card shadow h-100 border-0">

                <div className="card-header bg-white">
                  <FaUserCheck
                    className="text-success me-2"
                  />
                  <strong>
                    Assign Section Summary
                  </strong>
                </div>

                <div className="card-body">

                  {/* SESSION */}
                  <div>
                    <small className="text-muted">
                      Session
                    </small>

                    <h6 className="text-success mt-1">
                      {selectedSession || "-"}
                    </h6>
                  </div>

                  {/* CLASS */}
                  <div className="mt-3">
                    <small className="text-muted">
                      Class
                    </small>

                    <h6 className="text-success mt-1">
                      {selectedClass || "-"}
                    </h6>
                  </div>

                  {/* ARROW */}
                  <div className="text-center my-4">
                    <span
                      className="bg-info px-3 py-2 rounded-circle d-inline-flex"
                    >
                      <FaArrowRight
                        className="text-white"
                      />
                    </span>
                  </div>

                  {/* NEW SECTION */}
                  <div>
                    <small className="text-muted">
                      Assign Section
                    </small>

                    <h5 className="text-success mt-1">
                      {selectedSection || "-"}
                    </h5>
                  </div>

                  {/* SELECTED */}
                  <div
                    className="alert text-center mt-4 mb-3"
                    style={{
                      backgroundColor: "#FFF3CD",
                      color: "#664D03",
                    }}
                  >
                    <small>
                      Selected Students
                    </small>

                    <h4 className="mb-0">
                      {selectedIds.length}
                    </h4>
                  </div>

                  {/* ASSIGN BUTTON */}
                  <button
                    className="btn btn-success w-100"
                    onClick={assignSection}
                    disabled={
                      loading ||
                      selectedIds.length === 0 ||
                      !selectedSection
                    }
                  >
                    <FaCheck className="me-2" />

                    {loading
                      ? "Assigning..."
                      : "Assign Section"}
                  </button>

                  {/* INFO */}
                  <div
                    className="alert mt-3 mb-0"
                    style={{
                      backgroundColor: "#def0ff",
                    }}
                  >
                    <small>
                      Selected students will be assigned
                      to{" "}
                      <strong>
                        {selectedClass || "-"}-
                        {selectedSection || "-"}
                      </strong>
                      .
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignSection;

