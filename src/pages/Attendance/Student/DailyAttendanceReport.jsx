import React, { useState } from "react";
import useMasters from "../../../hooks/useMasters";
import axiosInstance from "../../../api/axiosInstance";

const DailyAttendanceReport = () => {
  const token = localStorage.getItem("token");
  const { sessions, standards, sections } = useMasters();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [classwise, setClassWise] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable,setShowTable] = useState(false);
 

  const handleSearch = async () => {
    try {
      setLoading(true);

     
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

     
      setClassWise(attendanceRes.data);
      setShowTable(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      
    }
  };
  
   console.log("classwise data", classwise);

  const counts = classwise.reduce(
    (acc, item) => {
      switch (item.status) {
        case "PRESENT":
          acc.present++;
          break;
        case "ABSENT":
          acc.absent++;
          break;
        case "LEAVE":
          acc.leave++;
          break;
        case "HALF_DAY":
          acc.halfDay++;
          break;
        default:
          break;
      }
      return acc;
    },
    {
      present: 0,
      absent: 0,
      leave: 0,
      halfDay: 0,
    },
  );

  console.log(counts);

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
          <strong>Daily Attendance Report</strong>
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>
            <li className="breadcrumb-item active">Daily Attendance Report</li>
          </ol>
        </nav>
      </div>

      {/* search card  */}

      <div className="ms-2 me-2 mt-3 bg-white rounded shadow">
        <div className="card">
          <div className="card-header">
            <h5>Daily Attendance Report</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-2 ">
                <label htmlFor="">Date:</label>
                <input
                  type="date"
                  name=""
                  className="form-control"
                  id=""
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-3 ">
                <label htmlFor="">Session:</label>
                <select
                  name=""
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
              <div className="col-12 col-md-3 ">
                <label htmlFor="">Standard:</label>
                <select
                  name=""
                  id=""
                  className="form-select"
                  value={selectedStandard}
                  onChange={(e) => setSelectedStandard(e.target.value)}
                >
                  <option value="">Select Standards</option>
                  {standards.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2 ">
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
              <div className="col-12 col-md-2 mt-4">
                <button className="btn btn-success" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
            <div className="row mt-3 gap-1 justify-content-end">
              <div className="col-6 col-md-2">
                <button className="btn btn-success w-100">Export Excel</button>
              </div>
              <div className="col-6 col-md-2">
                <button className="btn btn-danger w-100">Export PDF</button>
              </div>
              <div className="col-6 col-md-2">
                <button className="btn btn-secondary w-100">Print</button>
              </div>
            </div>
          </div>
        </div>
      </div>

     {showTable && (
        <>

         <div className="ms-2 me-2 mt-3 bg-white rounded shadow">
        <div className="card">
          <div className="card-header">Class Wise Students</div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hovered table-bordered">
                <thead className="table-primary">
                  <tr>
                    <th>Session</th>
                    <th>Standard</th>
                    <th>Section</th>
                    <th>Total</th>
                    <th>Present</th>
                    <th>Absent</th>
                    <th>Leave</th>
                    <th>Half Day</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedSession}</td>
                    <td>{selectedStandard}</td>
                    <td>{selectedSection}</td>
                    <td>{classwise.length}</td>
                    <td>{counts.present}</td>
                    <td>{counts.absent}</td>
                    <td>{counts.leave}</td>
                    <td>{counts.halfDay}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="ms-2 me-2 mt-3 bg-white rounded shadow">
        <div className="card">
          <div className="card-header">Student Attendance List </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hovered table-bordered">
                <thead className="table-primary">
                  <tr>
                    <th>Admission Number</th>
                    <th>Student Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {classwise.map((student, index) => (
                    <tr key={student.id}>
                      <td>{student.admissionNumber}</td>
                      <td>{student.studentName}</td>
                      <td>
                        {student.status === "PRESENT" && (
                          <span className="badge bg-success">Present</span>
                        )}
                        {student.status === "ABSENT" && (
                          <span className="badge bg-danger">Absent</span>
                        )}
                        {student.status === "LEAVE" && (
                          <span className="badge bg-warning text-dark">
                            Leave
                          </span>
                        )}
                        {student.status === "HALF_DAY" && (
                          <span className="badge bg-info">Half Day</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        
        </>
     )}
    </>
  );
};

export default DailyAttendanceReport;
