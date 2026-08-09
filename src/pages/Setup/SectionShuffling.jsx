import React, { useState } from "react";
import { FaArrowDown, FaRegEye, FaShuffle } from "react-icons/fa6";
import useMasters from "../../hooks/useMasters";
import { IoPrintOutline, IoSearchOutline } from "react-icons/io5";
import { TbRepeat } from "react-icons/tb";
import { useStudents } from "../../context/StudentContext";
import { HiUsers } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
import { MdArrowCircleDown, MdOutlinePictureAsPdf } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import axiosInstance from "../../api/axiosInstance";

const SectionShuffling = () => {
  // load from custom hooks
  const { sessions, standards, sections } = useMasters();
  const { students, loadStudents, loading } = useStudents();
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user.schoolId;
  console.log("school id in section shuffling", schoolId);

  //   selected usestate
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedNewSection, setSelectedNewSection] = useState("");
  const [admissionNumber, selectedAdmissionNumber] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [sectionloading, setLoading] = useState(false);

  console.log("selected Student", selectedStudents);

  //   handle search students
  const handleSearch = () => {
    if (!selectedSession || !selectedStandard || !selectedSection) {
      return;
    }

    loadStudents(selectedSession, selectedStandard, selectedSection);
  };

  console.log("students in section shuffling ", students);

  //   handle reset

  const handleReset = () => {
    setSelectedNewSection("");
    setSelectedSection("");
    setSelectedSession("");
    setSelectedStandard("");
    
  };

  const exportOptions = {
    excel: {
      label: "Export Excel",
      icon: <PiMicrosoftExcelLogoBold color="green" size={18} />,
    },

    pdf: {
      label: "Export PDF",
      icon: <MdOutlinePictureAsPdf color="red" size={18} />,
    },

    print: {
      label: "Print",
      icon: <IoPrintOutline color="#0d6efd" size={18} />,
    },
  };

  const [selectedExport, setSelectedExport] = useState(exportOptions.excel);

  const handleExport = (type) => {
    setSelectedExport(exportOptions[type]);

    switch (type) {
      case "excel":
        console.log("Export Excel");
        // exportExcel();
        break;

      case "pdf":
        console.log("Export PDF");
        // exportPDF();
        break;

      case "print":
        console.log("Print");
        // handlePrint();
        break;

      default:
        break;
    }
  };

  //   format date
  const formatDate = (date) => {
    if (!date) return "";

    return date.split("-").reverse().join("-");
  };

  //   pagination

  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 10;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  const totalPages = Math.ceil(students.length / studentsPerPage);

  //   select all students
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allAdmissionNumbers = students.map(
        (student) => student.admissionNumber,
      );

      setSelectedStudents(allAdmissionNumbers);
    } else {
      setSelectedStudents([]);
    }
  };

  // handle update section
  const handleBulkSectionUpdate = async () => {
    try {
      if (selectedStudents.length === 0) {
        alert("Please select at least one student.");
        return;
      }

      if (!selectedNewSection) {
        alert("Please select section.");
        return;
      }

      setLoading(true);

      const payload = {
        schoolId,
        admissionNumber: selectedStudents,
        section: selectedNewSection,
      };
      console.log("payload", payload);

      const response = await axiosInstance.patch(
        "/api/students/section-shuffling",
        payload,
      );

      alert(response.data);

      // Students dobara load kar lo
      fetchStudents();

      // Reset
      setSelectedStudents([]);
      setSelectedNewSection("");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to update section.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div
        className="row shadow-lg"
        style={{
          backgroundColor: "white",
          margin: "10px",
          height: "70px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6>
          <FaShuffle /> Section Shuffling
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                <small>Home</small>
              </a>
            </li>
            <li className="breadcrumb-item active">
              <small>School Management</small>
            </li>
            <li className="breadcrumb-item active">
              <small>Section Shuffling</small>
            </li>
          </ol>
        </nav>
      </div>

      {/* search bar  */}
      <div className="ms-2 me-2 mt-3 bg-white rounded shadow">
        <div className="card ">
          {/* <div className="card-header">Section Shuffling</div> */}
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-3">
                <label htmlFor="">
                  Session <span className="text-danger">*</span>
                </label>
                <select
                  name=""
                  id=""
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                >
                  <option value="">Select Session</option>
                  {sessions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-3">
                <label htmlFor="">
                  Standard <span className="text-danger">*</span>
                </label>
                <select
                  name=""
                  id=""
                  className="form-select"
                  value={selectedStandard}
                  onChange={(e) => setSelectedStandard(e.target.value)}
                >
                  <option value="">Select Standard</option>
                  {standards.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-3">
                <label htmlFor="">
                  Current Section <span className="text-danger">*</span>
                </label>
                <select
                  name=""
                  id=""
                  className="form-select"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="">Select Section</option>
                  {sections.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-3">
                <button
                  className="btn btn-success w-100 mt-4"
                  onClick={handleSearch}
                >
                  <IoSearchOutline />
                  Search Students
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-md-3">
                <label htmlFor="">
                  Next Section <span className="text-danger">*</span>
                </label>
                <select
                  name=""
                  id=""
                  className="form-select"
                  value={setSelectedNewSection}
                  onChange={(e) => setSelectedNewSection(e.target.value)}
                >
                  <option value="">Select Section</option>
                  {sections.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-4">
                <label htmlFor="">Search Student</label>
                {/* <i
                  className="bi bi-search position-absolute"
                  style={{
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6c757d",
                  }}
                ></i> */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Adm No. or Name..."
                />
              </div>
              <div className="col-12 col-md-3 mt-4">
                <button
                  className="btn border w-100 hover"
                  onClick={handleReset}
                >
                  <TbRepeat /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {students.length >= 1 && (
        <>
          {/* student table  */}
          <div className="container-fluid mt-3 px-2">
            <div className="row g-3">
              {/* Student List */}
              <div className="col-12 col-lg-9">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">Student List</div>
                  <div className="card-body">
                    {/* Student Table */}
                    <div className="d-flex justify-content-between align-items-center">
                      {/* Select All */}
                      <div className="form-check ms-3 ">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={
                            students.length > 0 &&
                            selectedStudents.length === students.length
                          }
                          onChange={handleSelectAll}
                        />
                        <label
                          htmlFor="selectAll"
                          className="form-check-label ms-2"
                        >
                          Select All
                        </label>
                      </div>

                      {/* Export Dropdown */}
                      <div className="dropdown">
                        <button
                          className="btn border dropdown-toggle d-flex align-items-center gap-2"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          {selectedExport.icon}
                          {selectedExport.label}
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <button
                              className="dropdown-item d-flex align-items-center gap-2"
                              onClick={() => handleExport("excel")}
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
                              onClick={() => handleExport("pdf")}
                            >
                              <MdOutlinePictureAsPdf color="red" size={18} />
                              Export PDF
                            </button>
                          </li>

                          <li>
                            <button
                              className="dropdown-item d-flex align-items-center gap-2"
                              onClick={() => handleExport("print")}
                            >
                              <IoPrintOutline color="#0d6efd" size={18} />
                              Print
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="container-fluid table-responsive mt-3 ">
                      <table className="table  table-hover  align-middle border">
                        <thead className="table-success">
                          <tr>
                            <th>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={
                                  students.length > 0 &&
                                  selectedStudents.length === students.length
                                }
                                onChange={handleSelectAll}
                              />
                            </th>
                            <th>Adm No.</th>
                            <th>Student Name</th>
                            <th>Gender</th>
                            <th>Class - Section</th>
                            <th>Date of Birth</th>
                            <th>Status</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentStudents.map((student, idx) => (
                            <tr>
                              <td>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={selectedStudents.includes(
                                    student.admissionNumber,
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedStudents([
                                        ...selectedStudents,
                                        student.admissionNumber,
                                      ]);
                                    } else {
                                      setSelectedStudents(
                                        selectedStudents.filter(
                                          (admissionNumber) =>
                                            admissionNumber !==
                                            student.admissionNumber,
                                        ),
                                      );
                                    }
                                  }}
                                />
                              </td>
                              <td>{student.admissionNumber}</td>
                              <td>
                                {student.firstName} {student.lastName}
                              </td>
                              <td>{student.gender}</td>
                              <td>
                                {student.studentClass}-{student.section}
                              </td>
                              <td>
                                <td>{formatDate(student.dob)}</td>
                              </td>
                              <td>
                                <span className="badge text-bg-success text-white p-1">
                                  {student.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="d-flex justify-content-end mt-3">
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            className={`btn mx-1 ${
                              currentPage === i + 1
                                ? "btn-primary"
                                : "btn-outline-primary"
                            }`}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <div className="alert bg-white border mt-3 d-flex justify-content-between py-1">
                        <span>Total Students: {students.length} </span>
                        <span>
                          Selected Students: {selectedStudents.length}
                        </span>
                      </div>

                      <div
                        className="alert  border mt-3 d-flex  py-1"
                        style={{
                          backgroundColor: "#FFF3CD",
                          color: "#664D03",
                        }}
                      >
                        <small className="fw-lighter">
                          <RiErrorWarningFill size={17} /> Note: Only Active
                          Studens are listed.Please select students and clicked
                          on "Shuffle Section" to move them to the other
                          section.
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shuffling Summary */}
              <div className="col-12 col-lg-3">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    {" "}
                    <HiUsers size={20} className=" text-success" /> Shuffling
                    Summary
                  </div>
                  <div className="card-body">
                    <div>
                      <small>Current Session</small>
                      <h6 className="text-success">{selectedSession}</h6>
                    </div>

                    <div className="mt-2">
                      <small>Current Class - Section</small>
                      <h6 className="text-success">
                        {selectedStandard}-{selectedSection}
                      </h6>
                    </div>

                    <div className="mt-2">
                      -----------
                      <span className="bg-info px-2 rounded-circle py-2">
                        <FaArrowDown size={20} className="text-white" />
                      </span>
                      -----------
                    </div>

                    {/* next section  */}
                    <div className="mt-2">
                      <small>Current Session</small>
                      <h6 className="text-success">{selectedSession}</h6>
                    </div>

                    <div className="mt-2">
                      <small>Next Class - Section</small>
                      <h6 className="text-success">
                        {selectedStandard}-{selectedNewSection}
                      </h6>
                    </div>

                    {/* alert  */}
                    <div
                      className="alert  text-center m-0 py-1"
                      style={{
                        backgroundColor: "#FFF3CD",
                        color: "#664D03",
                      }}
                    >
                      <h6>Selected Student</h6>
                      <h6>{selectedStudents.length}</h6>
                    </div>

                    {/* button  */}

                    <div className="mt-2">
                      <button
                        className="btn btn-success w-100"
                        onClick={handleBulkSectionUpdate}
                        disabled={loading}
                      >
                        {sectionloading ? "Updating..." : "Shuffle Students"}
                        {/* <FaShuffle /> Shuffle Students */}
                      </button>
                      <button
                        className="btn  w-100 mt-2"
                        style={{ border: "1px solid black" }}
                      >
                        <FaRegEye /> Preview Students
                      </button>

                      <div
                        className="alert  mt-2"
                        style={{ backgroundColor: "#def0ff" }}
                      >
                        <small>Students will be shuffle from </small>
                        <strong>
                          {selectedStandard}-{selectedSection}
                        </strong>{" "}
                        to{" "}
                        <strong>
                          {selectedStandard}-{selectedNewSection}{" "}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SectionShuffling;
