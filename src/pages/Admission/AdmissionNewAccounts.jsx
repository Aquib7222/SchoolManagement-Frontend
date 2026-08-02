import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoSearchSharp } from "react-icons/io5";
import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";
import { FaRegEye, FaShieldAlt, FaUserCircle } from "react-icons/fa";
import emblem from "../../assets/icon/emblem.png";
import { IoMdClose, IoMdCloseCircleOutline } from "react-icons/io";

const AdmissionNewAccounts = () => {
  const { sessions, standards } = useMasters();
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [SearchLoading, setSearchLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const slipRef = useRef(null);

  const studentsPerPage = 5;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  const totalPages = Math.ceil(students.length / studentsPerPage);

  // ✅ BACKEND SEARCH
  const handleSearch = async () => {
    try {
      setSearchLoading(true);

      const res = await axiosInstance.get("/api/students/search", {
        params: {
          academicYear: selectedSession || null,
          studentClass: selectedStandard || null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch students");
    } finally {
      setSearchLoading(false);
    }
  };

  // download pdf
  const downloadPDF = async () => {
    const element = slipRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(
      `${selectedStudent.firstName}_${selectedStudent.admissionNumber}.pdf`,
    );
  };

  console.log(students);
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
          <strong>Students New Accounts</strong>
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>
            <li className="breadcrumb-item active">New Accounts</li>
          </ol>
        </nav>
      </div>

      <div className="d-flex gap-3 ms-2 me-2 mt-3 align-items-stretch">
        {/* Left Side */}
        <div
          style={{
            width: selectedStudent ? "50%" : "100%",
            transition: "all .3s ease",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Search Card */}
          <div className="bg-white rounded shadow">
            <div className="card p-3">
              <div className="card-header gap-0 p-2">
                <h6>
                  <IoSearchSharp size={25} /> Search Students for for Accounts
                </h6>
                <small>
                  Find students by Admission Number or Name and generate
                  accounts slip
                </small>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <label>
                      <h6>Search Students:</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by Admission Number or Name"
                    />
                  </div>
                  <div className="col-6 col-md-2">
                    <label>
                      <h6>Session:</h6>
                    </label>
                    <select
                      className="form-select"
                      value={selectedSession}
                      onChange={(e) => setSelectedSession(e.target.value)}
                    >
                      <option value="">Select Session</option>
                      {sessions.map((session) => (
                        <option key={session} value={session}>
                          {session}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6 col-md-2">
                    <label>
                      <h6>Standard:</h6>
                    </label>
                    <select
                      className="form-select"
                      value={selectedStandard}
                      onChange={(e) => setSelectedStandard(e.target.value)}
                    >
                      <option value="">Select Standard</option>
                      {standards.map((standard) => (
                        <option key={standard} value={standard}>
                          {standard}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-primary mt-4"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student List */}
          <div className="bg-white rounded shadow mt-3">
            <div className="card">
              <div className="card-header">
                <h6>Student List</h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover   rounded">
                    <thead className="table-info">
                      <tr>
                        <th>#</th>
                        <th>Admission Number</th>
                        <th>Student Name</th>
                        <th>Class</th>
                        <th>Section</th>

                        <th>Father Name</th>
                        <th>Mobile</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudents.map((student, index) => (
                        <tr key={student.id}>
                          <td>{index + 1}</td>
                          <td>{student.admissionNumber}</td>
                          <td>
                            {student.firstName} {student.lastName}
                          </td>
                          <td>{student.studentClass}</td>
                          <td>{student.section}</td>

                          <td>{student.fatherName}</td>
                          <td>{student.mobile}</td>
                          <td>
                            {student.status === "ACTIVE" ? (
                              <span className="badge bg-success d-inline-flex align-items-center gap-1">
                                <FaShieldAlt size={12} />
                                Enrolled
                              </span>
                            ) : (
                              <span className="badge bg-danger">
                                {student.status}
                              </span>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => setSelectedStudent(student)}
                            >
                              <FaRegEye /> View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button
                    className="btn btn-outline-secondary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>

                  <span>
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    className="btn btn-outline-secondary"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {selectedStudent && (
            <>
              <div className="ms-2 me-2 mt-3 rounded shadow bg-white p-3">
                <div className="row justify-content-center">
                  <div className="col-12 ">
                    <div className="card border-0 mt-3 mb-3">
                      <div className="card-header w-100 bg-info d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 text-white">Student Information</h5>
                        <IoMdCloseCircleOutline
                          size={25}
                          className="color-white"
                          onClick={() => setSelectedStudent(null)}
                        />
                      </div>

                      <div className="card-body ">
                        <div className="row align-items-center">
                          <div
                            className="col-md-7 text-center"
                            style={{
                              borderRight: "1px solid #ddd",
                            }}
                          >
                            <p>
                              <h5>
                                <strong>
                                  {selectedStudent.firstName}{" "}
                                  {selectedStudent.lastName}
                                </strong>
                              </h5>
                            </p>
                            <p>
                              <strong>Admission Number: </strong>
                              {selectedStudent.admissionNumber}
                            </p>

                            <p>
                              <strong>Class / Section: </strong>
                              {selectedStudent.studentClass} /{" "}
                              {selectedStudent.section}
                            </p>
                            <p>
                              <strong>Session: </strong>
                              {selectedStudent.academicYear}
                            </p>

                            <div className="d-flex justify-content-center mt-3 w-100">
                              <button
                                className="btn btn-success"
                                onClick={downloadPDF}
                              >
                                Print Account Slip
                              </button>
                            </div>
                          </div>
                          <div className="col-md-5 ps-4">
                            <h6 className="fw-bold text-success mb-2">
                              <strong>Account Information</strong>
                            </h6>
                            <p className="mb-1">
                              <strong>User Id: </strong>
                              {selectedStudent.email}
                            </p>
                            <p className="mb-1">
                              <strong>Password: </strong>
                              1234
                            </p>
                            <p className="mb-1">
                              <strong>Role: </strong>
                              STUDENT
                            </p>
                            <p className="mb-1">
                              <strong>User Group: </strong>
                              STUDENT USER
                            </p>
                            <p className="mb-1">
                              <strong>Status: </strong>
                              <span className="badge bg-success">
                                {selectedStudent.status}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Side */}
        {selectedStudent && (
          <div
            ref={slipRef}
            style={{
              width: "48%",
              maxWidth: "48%",
              transition: "all .3s ease",
              flexDirection: "column",

              // overflowY: "auto",
            }}
          >
            <div
              className="bg-white rounded shadow p-3 account-slip"
              style={{
                // position: "sticky",
                top: "80px",
              }}
            >
              <div className="d-flex align-items-center justify-content-center  pb-3">
                {/* Left Side Logo */}
                <div className="me-3">
                  <img src={emblem} alt="School Logo" width={75} height={75} />
                </div>

                {/* Right Side School Details */}
                <div>
                  <h3
                    className="fw-bold mb-1"
                    style={{
                      color: "#0B6B53",
                      letterSpacing: "1px",
                    }}
                  >
                    ABC PUBLIC SCHOOL
                  </h3>
                  <h6
                    className="ms-4"
                    style={{
                      color: "#0B6B53",
                      letterSpacing: "1px",
                    }}
                  >
                    Knowledge . Excellence . Integrity
                  </h6>

                  <p className="mb-1 ms-5">
                    Station Road, Siwan, Bihar - 841226
                  </p>

                  <small className="d-block">
                    📞 +91-9876543210 | ✉ abcpublicschool@gmail.com
                  </small>
                </div>
              </div>
              <h6
                className="mt-2 fw-bold bg-success rounded text-white text-center mx-auto"
                style={{
                  width: "260px",
                  padding: "8px",
                }}
              >
                STUDENT ACCOUNT DETAILS
              </h6>

              <h6 className="text-end">
                Date: {new Date().toLocaleDateString()}
              </h6>

              <div className="card border-0 mt-3 mb-3">
                <div
                  className="card-header w-50"
                  style={{
                    background: "#0B6B53",
                    color: "white",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    borderBottomLeftRadius: "0",
                    borderBottomRightRadius: "0",
                  }}
                >
                  <h6 className="mb-0 text-center">Student Information</h6>
                </div>

                <div
                  className="card-body border border-dark"
                  style={{
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "8px",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    marginTop: "-1px", // header aur body ka border join ho jayega
                  }}
                >
                  <div className="row">
                    <div
                      className="col-md-6"
                      style={{ borderRight: "1px solid #bebbbb" }}
                    >
                      <p>
                        <strong>Admission Number: </strong>
                        {selectedStudent.admissionNumber}
                      </p>
                      <p>
                        <strong>Student Name: </strong>
                        {selectedStudent.firstName} {selectedStudent.lastName}
                      </p>
                      <p>
                        <strong>Class / Section: </strong>
                        {selectedStudent.studentClass} /{" "}
                        {selectedStudent.section}
                      </p>
                      <p>
                        <strong>Father's Name: </strong>
                        {selectedStudent.fatherName}
                      </p>
                      <p>
                        <strong>Mother's Name: </strong>
                        {selectedStudent.motherName}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <strong>Roll Number: </strong>
                        {selectedStudent.admissionNumber}
                      </p>
                      <p>
                        <strong>Session: </strong>
                        {selectedStudent.academicYear}
                      </p>
                      <p>
                        <strong>Gender: </strong>
                        {selectedStudent.gender}
                      </p>
                      <p>
                        <strong>Contact: </strong>
                        {selectedStudent.mobile}
                      </p>
                    </div>
                    <div className="col-md-2">
                      <img
                        className="rounded-circle border border-dark"
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                        src={selectedStudent.photo}
                        alt="Student Photo"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 mt-3 mb-3">
                <div
                  className="card-header w-50"
                  style={{
                    background: "#0B6B53",
                    color: "white",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    borderBottomLeftRadius: "0",
                    borderBottomRightRadius: "0",
                  }}
                >
                  <h6 className="mb-0 text-center">Login Credentials</h6>
                </div>

                <div
                  className="card-body border border-dark"
                  style={{
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "8px",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    marginTop: "-1px", // header aur body ka border join ho jayega
                  }}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>User Id: </strong>
                        {selectedStudent.email}
                      </p>
                      <p>
                        <strong>Password: </strong>
                        1234
                      </p>
                      <p>
                        <strong> </strong>
                        Change after first login
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <strong>Role: </strong>
                        STUDENT
                      </p>
                      <p>
                        <strong>User Group: </strong>
                        STUDENT USER
                      </p>
                      <p>
                        <strong>Status: </strong>
                        {selectedStudent.status}
                      </p>
                    </div>
                    <div className="col-md-2"></div>
                  </div>
                </div>
              </div>

              <div className="card border-0 mt-3 mb-3">
                <div
                  className="card-header w-50"
                  style={{
                    background: "#0B6B53",
                    color: "white",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    borderBottomLeftRadius: "0",
                    borderBottomRightRadius: "0",
                  }}
                >
                  <h6 className="mb-0 text-center">Terms & Conditions</h6>
                </div>

                <div
                  className="card-body border border-dark py-2 px-3"
                  style={{
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "8px",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    marginTop: "-1px", // header aur body ka border join ho jayega
                  }}
                >
                  <div className="row">
                    <ul
                      style={{
                        fontSize: "12px",
                        lineHeight: "1.4",
                        paddingLeft: "18px",
                        marginBottom: "8px",
                      }}
                    >
                      <li>Use this account only for School ERP Portal.</li>

                      <li>Do not share your User ID and Password.</li>

                      <li>Change your password after first login.</li>

                      <li>Contact school administration for support.</li>

                      <li>School is not responsible for account misuse.</li>

                      <li>Valid only for current academic session.</li>
                    </ul>

                    <div className="alert alert-info py-2 mb-0">
                      I agree to the above terms & conditions.
                    </div>
                  </div>
                </div>
              </div>

              <p
                className="text-center mt-2 mb-0"
                style={{
                  fontSize: "12px",
                }}
              >
                "Education is most powerfull weapon which can you use to change
                the world."
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Student Details Card */}
    </>
  );
};

export default AdmissionNewAccounts;
