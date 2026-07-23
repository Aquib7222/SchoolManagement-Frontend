import axios from "axios";
import React, { useEffect, useState } from "react";

const StudentFeeAssignment = () => {

  const token = localStorage.getItem("token");

  //===========================
  // Filters
  //===========================

  const [session, setSession] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");

  //===========================
  // Masters
  //===========================

  const [sessions, setSessions] = useState([]);
  const [standards, setStandards] = useState([]);
  const [sections, setSections] = useState([]);

  //===========================
  // Tables
  //===========================

  const [students, setStudents] = useState([]);
  const [studentFees, setStudentFees] = useState([]);

  //===========================
  // Others
  //===========================

  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    loadSessions();
    loadStandards();
    loadSections();
  }, []);

  console.log("students",students);
  console.log("student fee",studentFees);
  //===========================
  // Sessions
  //===========================

  const loadSessions = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/api/master/sessions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSessions(res.data);

    } catch (err) {
      console.log(err);
    }

  };

  //===========================
  // Standards
  //===========================

  const loadStandards = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/api/master/standard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStandards(res.data);

    } catch (err) {
      console.log(err);
    }

  };

  //===========================
  // Sections
  //===========================

  const loadSections = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/api/master/section",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSections(res.data);

    } catch (err) {
      console.log(err);
    }

  };
    //=====================================
  // Load All Assigned Students
  //=====================================

  const loadStudents = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:8080/api/student-fee",
        {
          params: {
            session,
            studentClass,
            section,
            admissionNumber,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(res.data);

      // New Search -> old fee details clear
      setStudentFees([]);
      setSelectedStudent(null);

    } catch (err) {
      console.log(err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  //=====================================
  // Load One Student Fee Details
  //=====================================

  const loadStudentFees = async (admissionNo) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:8080/api/student-fee/${admissionNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudentFees(res.data);

      if (res.data.length > 0) {
        setSelectedStudent(res.data[0]);
      }

    } catch (err) {
      console.log(err);
      setStudentFees([]);
      setSelectedStudent(null);
    } finally {
      setLoading(false);
    }
  };

  //=====================================
  // Search Button
  //=====================================

  const handleSearch = () => {
    loadStudents();
  };

  //=====================================
  // Reset
  //=====================================

  const handleReset = () => {

    setSession("");
    setStudentClass("");
    setSection("");
    setAdmissionNumber("");

    setStudents([]);
    setStudentFees([]);
    setSelectedStudent(null);

  };

  //=====================================
  // View Button
  //=====================================

  const handleView = (student) => {

    setSelectedStudent(student);

    loadStudentFees(student.admissionNumber);

  };

    return (
    <>
      {/* Header */}
      <div className="container mt-3 bg-white shadow rounded p-3">
        <h5>Student Fee Assignment</h5>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item active">
              Student Fee Assignment
            </li>
          </ol>
        </nav>
      </div>

      {/* Search Filters */}
      <div className="container mt-3 bg-white shadow rounded p-4">

        <div className="row">

          <div className="col-md-3 mb-3">
            <label>Session</label>

            <select
              className="form-select"
              value={session}
              onChange={(e) => setSession(e.target.value)}
            >
              <option value="">Select Session</option>

              {sessions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}

            </select>
          </div>

          <div className="col-md-3 mb-3">

            <label>Class</label>

            <select
              className="form-select"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
            >

              <option value="">Select Class</option>

              {standards.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}

            </select>

          </div>

          <div className="col-md-2 mb-3">

            <label>Section</label>

            <select
              className="form-select"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >

              <option value="">All</option>

              {sections.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}

            </select>

          </div>

          <div className="col-md-2 mb-3">

            <label>Admission No.</label>

            <input
              type="text"
              className="form-control"
              placeholder="ADM00001"
              value={admissionNumber}
              onChange={(e) => setAdmissionNumber(e.target.value)}
            />

          </div>

          <div className="col-md-2 d-flex align-items-end">

            <button
              className="btn btn-primary me-2"
              onClick={handleSearch}
            >
              Search
            </button>

            <button
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>

          </div>

        </div>

      </div>

      {/* Students Table */}

      <div className="container mt-4 bg-white shadow rounded p-3">

        <h5 className="mb-3">
          Assigned Students
        </h5>

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-primary">

              <tr>

                <th>S.No</th>

                <th>Admission No</th>

                <th>Student Name</th>

                <th>Class</th>

                <th>Section</th>

                <th>Mobile</th>

                {/* <th>Total Fee</th> */}

                {/* <th>Due Fee</th> */}

                <th>Status</th>

                <th width="100">Action</th>

              </tr>

            </thead>

            <tbody>

              {students.length === 0 ? (

                <tr>

                  <td
                    colSpan="10"
                    className="text-center"
                  >
                    No Record Found
                  </td>

                </tr>

              ) : (

                students.map((student, index) => (

                  <tr key={student.studentId}>

                    <td>{index + 1}</td>

                    <td>{student.admissionNumber}</td>

                    <td>{student.studentName}</td>

                    <td>{student.studentClass}</td>

                    <td>{student.section}</td>

                    <td>{student.mobileNumber}</td>

                    {/* <td>₹ {student.totalAmount}</td> */}

                    {/* <td>₹ {student.totalDue}</td> */}

                    <td>

                      <span
                        className={`badge ${
                          student.totalDue === 0
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {student.totalDue === 0
                          ? "PAID"
                          : "UNPAID"}
                      </span>

                    </td>

                    <td>

                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleView(student)}
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

            {/* Student Fee Details */}

      {selectedStudent && (
        <div className="container mt-4 bg-white shadow rounded p-3">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5>Student Fee Details</h5>

            <div>

              <strong>Admission No :</strong> {selectedStudent.admissionNumber}

              &nbsp;&nbsp;&nbsp;

              <strong>Name :</strong> {selectedStudent.studentName}

            </div>

          </div>

          <div className="table-responsive">

            <table className="table table-bordered table-striped">

              <thead className="table-success">

                <tr>

                  <th>S.No</th>

                  <th>Fee Code</th>

                  <th>Fee Name</th>

                  <th>Category</th>

                  <th>Batch</th>

                  <th>Amount</th>

                  <th>Paid</th>

                  <th>Due</th>

                  <th>Status</th>

                  <th>Assigned Date</th>

                </tr>

              </thead>

              <tbody>

                {studentFees.length === 0 ? (

                  <tr>

                    <td colSpan="10" className="text-center">
                      No Fee Assigned
                    </td>

                  </tr>

                ) : (

                  studentFees.map((fee, index) => (

                    <tr key={fee.id}>

                      <td>{index + 1}</td>

                      <td>{fee.feeCode}</td>

                      <td>{fee.feeName}</td>

                      <td>{fee.feeCategory}</td>

                      <td>{fee.feeBatch}</td>

                      <td>₹ {fee.amount}</td>

                      <td>₹ {fee.paidAmount}</td>

                      <td>₹ {fee.dueAmount}</td>

                      <td>
                        <span
                          className={`badge ${
                            fee.status === "PAID"
                              ? "bg-success"
                              : fee.status === "PARTIAL"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                        >
                          {fee.status}
                        </span>
                      </td>

                      <td>{fee.assignDate}</td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </>
  );

};

export default StudentFeeAssignment;