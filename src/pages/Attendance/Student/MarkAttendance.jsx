import React, { useState } from "react";
import useMasters from "../../../hooks/useMasters";
import axiosInstance from "../../../api/axiosInstance";

const MarkAttendance = () => {
  const {
    loading: masterLoading,
    sessions,
    standards,
    sections,
    attendanceStatus,
  } = useMasters();
  const token = localStorage.getItem("token");
  const [selectedSession, setSelectedSession] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedStandard, setSelectedStandard] = useState();
  const [selectedSection, setSelectedSection] = useState();
  const [searchLoading, setSearchLoading] = useState(false);
  const [students, setStudents] = useState([]);

  //   search student class wise
  const handleSearch = async () => {
    try {
      setSearchLoading(true);

      // Students
      const studentRes = await axiosInstance.get("/api/students/search", {
        params: {
          academicYear: selectedSession,
          studentClass: selectedStandard,
          section: selectedSection,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Attendance
      const attendanceRes = await axiosInstance.get(
        "/api/student/attendance/class",
        {
          params: {
            academicYear: selectedSession,
            studentClass: selectedStandard,
            section: selectedSection,
            attendanceDate: selectedDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const attendanceMap = {};

      attendanceRes.data.forEach((item) => {
        attendanceMap[item.studentId] = item.status;
      });

      const finalStudents = studentRes.data.map((student) => ({
        ...student,
        status: attendanceMap[student.id] || "",
      }));

      setStudents(finalStudents);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch students");
    } finally {
      setSearchLoading(false);
    }
  };

  console.log("students", students);

  //   select Status change
  const handleStatusChange = (studentId, status) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status } : student,
      ),
    );
  };

  //   mark all present

  const markAllPresent = () => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        status: "PRESENT",
      })),
    );
  };

  // mark all absent

  const markAllAbsent = () => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        status: "ABSENT",
      })),
    );
  };

  // mark all half day
  const markAllHalfDay = () => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        status: "HALF_DAY",
      })),
    );
  };

  // mark all leave

  const markAllLeave = () => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        status: "LEAVE",
      })),
    );
  };

  // handle save api
  const handleSaveAttendance = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const schoolId = user.schoolId;
      console.log("schoolId", schoolId);

      const attendancePayload = students.map((student) => ({
        studentId: student.id,
        admissionNumber: student.admissionNumber,
        status: student.status,
      }));

      const payload = {
        attendanceDate: selectedDate,
        academicYear: selectedSession,
        studentClass: selectedStandard,
        section: selectedSection,
        attendance: attendancePayload,
      };

      console.log(payload);

      await axiosInstance.post("/api/student/attendance/save", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Attendance Saved Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save attendance");
    }
  };

  const totalStudents = students.length;

const presentCount = students.filter(
  (student) => student.status === "PRESENT"
).length;

const absentCount = students.filter(
  (student) => student.status === "ABSENT"
).length;

const halfDayCount = students.filter(
  (student) => student.status === "HALF_DAY"
).length;

const leaveCount = students.filter(
  (student) => student.status === "LEAVE"
).length;

const notMarkedCount = students.filter(
  (student) => !student.status
).length;

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
          <strong>Student Attendance</strong>
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>
            <li className="breadcrumb-item active">
              Mark Attendance ClassWise
            </li>
          </ol>
        </nav>
      </div>

      {/* search section  */}

      <div className="ms-2 me-2 rounded shadow bg-white mt-3 ">
        <div className="card">
          <div className="card-header p-2">Search Student Class Wise</div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-3">
                <label htmlFor="">Session:</label>
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
                <label htmlFor="">Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  id=""
                  className="form-control"
                />
              </div>
              <div className="col-12 col-md-3">
                <label htmlFor="">Class:</label>
                <select
                  name=""
                  id=""
                  value={selectedStandard}
                  onChange={(e) => setSelectedStandard(e.target.value)}
                  className="form-select"
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
                <label htmlFor="">Section:</label>
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
            </div>

            <div className="row d-flex justify-content-end mt-3">
              <button className="btn btn-success w-25" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* alert  */}
      <div className="ms-2 me-2 rounded shadow bg-white mt-3">
        <div className="card">
          <div className="card-header">Mark Attendance</div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-2">
                <div className="alert alert-secondary gap-1">
                  <span>Total :</span> <strong>{students.length} </strong>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div className="alert alert-success">
                  <span>Present:{presentCount}</span>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div className="alert alert-danger">
                  <span>Absent:{absentCount}</span>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div className="alert alert-warning">
                  <span>Half Day:{halfDayCount}</span>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div className="alert alert-info">
                  <span>Leave:{leaveCount}</span>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div className="alert alert-dark">
                  <span>Not Marked:{notMarkedCount}</span>
                </div>
              </div>
            </div>

            {/* buttons  */}
            <div className="row mt-3 gap-0">
              <div className="col-12 col-md-3">
                <button
                  className="btn btn-success w-100"
                  onClick={markAllPresent}
                >
                  Mark All Present
                </button>
              </div>
              <div className="col-12 col-md-3">
                <button
                  className="btn btn-danger w-100"
                  onClick={markAllAbsent}
                >
                  Mark All Absent
                </button>
              </div>
              <div className="col-12 col-md-3">
                <button
                  className="btn btn-warning w-100"
                  onClick={markAllLeave}
                >
                  Mark All Leave
                </button>
              </div>
              <div className="col-12 col-md-3">
                <button className="btn btn-info w-100" onClick={markAllHalfDay}>
                  Mark All Half Day
                </button>
              </div>
            </div>

            <div className="row mt-3 mb-2 d-flex justify-content-end gap-2">
              <div className="col-6 col-md-3">
                <button className="btn btn-outline-success w-100">
                  Export To Excel
                </button>
              </div>
              <div className="col-6 col-md-3">
                <button className="btn btn-outline-danger w-100">
                  Export To PDF
                </button>
              </div>
              <div className="col-6 col-md-3">
                <button
                  className="btn btn-success w-100"
                  onClick={handleSaveAttendance}
                >
                  Save Changes
                </button>
              </div>
            </div>

            

           
          </div>
        </div>
      </div>

      {/* class wise student list  */}
       <div className="ms-2 me-2 mt-3 bg-white rounded shadow p-3 table-responsive ">

        <strong>Selected Date : {selectedDate}</strong>

              <table className="table table-bordered table-hovered">
                <thead className="table-primary">
                  <tr>
                    <th>S.No</th>
                    <th>Student Name</th>
                    <th>Admission Number</th>
                    <th>Roll No</th>
                    <th className="w-25">Status</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center text-danger">
                        No Student Founds
                      </td>
                    </tr>
                  ) : (
                    students.map((item, idx) => (
                      <tr key={item.id}>
                        <td>{idx + 1}</td>
                        <td>
                          {item.firstName} {item.lastName}
                        </td>
                        <td style={{width:"20%"}}>{item.admissionNumber}</td>
                        <td>{item.rollNumber}</td>
                        <td style={{width:"35%"}}>
                          <select
                            className="form-select"
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.value)
                            }
                          >
                            <option value="">Select Status</option>

                            {attendanceStatus.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
    </>
  );
};

export default MarkAttendance;
