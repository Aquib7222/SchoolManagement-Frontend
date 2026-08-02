import React, { useState } from "react";
import useMasters from "../../../hooks/useMasters";
import axiosInstance from "../../../api/axiosInstance";

const AttendanceView = () => {
  const {
    loading: masterLoading,
    sessions,
    standards,
    sections,
    month,
  } = useMasters();

  const token = localStorage.getItem("token");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState(false);
  const [students, setStudents] = useState([]);
  

  //   split session to year like 2026-2027 to 2026
  const year = Number(selectedSession?.split("-")[0]);

  //   map month string to number
  const monthMap = {
    JANUARY: 1,
    FEBRUARY: 2,
    MARCH: 3,
    APRIL: 4,
    MAY: 5,
    JUNE: 6,
    JULY: 7,
    AUGUST: 8,
    SEPTEMBER: 9,
    OCTOBER: 10,
    NOVEMBER: 11,
    DECEMBER: 12,
  };

  const monthNumber = monthMap[selectedMonth];

  //   get how many days in a month
  const getDaysInMonth = (year, monthNumber) =>
    new Date(year, monthNumber, 0).getDate();

  //   how many sundays in a month
  const getSundays = (year, monthNumber) => {
    const sundays = [];
    const totalDays = getDaysInMonth(year, monthNumber);
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, monthNumber - 1, day);
      if (date.getDay() === 0) sundays.push(day);
    }
    return sundays;

    console.log("sundays", sundays);
  };

  const sundays = year && monthNumber ? getSundays(year, monthNumber) : [];

  if (year && monthNumber) {
    console.log(getDaysInMonth(year, monthNumber));
    console.log(getSundays(year, monthNumber));
  }

  const totalDays = year && monthNumber ? getDaysInMonth(year, monthNumber) : 0;

  const workingDays =
    year && monthNumber ? totalDays - getSundays(year, monthNumber).length : 0;

  //  search student attendance monthly wise

  const handleSearch = async () => {
    try {
      if (
        !selectedSession ||
        !selectedStandard ||
        !selectedSection ||
        !selectedMonth
      ) {
        alert("Please select Session, Standard, Section and Month");
        return;
      }

      setSearchLoading(true);

      // Attendance
      const attendanceRes = await axiosInstance.get(
        "/api/student/attendance/monthly",
        {
          params: {
            academicYear: selectedSession,
            studentClass: selectedStandard,
            section: selectedSection,
            month: selectedMonth,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStudents(attendanceRes.data);
      setInput(true);
    } catch (error) {
      console.log(error);
      alert("Student attendance not found");
    } finally {
      setSearchLoading(false);
    }
  };
  console.log("Students", students);

  //   filter student or search students
  const filterStudents = students.filter((student) => {
    const keyword = search.toLowerCase();

    return (
      student.studentName?.toLowerCase().includes(keyword) ||
      student.admissionNumber?.toLowerCase().includes(keyword)
    );
  });

  console.log("filterStudents", filterStudents);
  console.log("filterStudents length", filterStudents.length);

  const statusMap = {
    PRESENT: "P",
    ABSENT: "A",
    LEAVE: "L",
    HALF_DAY: "HD",
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
          <strong>Student Attendance View</strong>
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>
            <li className="breadcrumb-item active">
              View Attendance ClassWise
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
                <label htmlFor="">Standard:</label>
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
              <div className="col-12 col-md-3">
                <label htmlFor="">Month:</label>
                <select
                  name=""
                  id=""
                  className="form-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {month.map((item) => (
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

      {input && (
        <>
          {/* search by admission no and name   */}

          <div className="ms-2 me-2 bg-white rounded shadow mt-3 p-3">
            <div className="row ">
              <div className="col-12 col-md-4">
                <input
                  type="search"
                  name=""
                  className="form-control"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by Name and Admission No"
                />
              </div>

              <div className="col-6 col-md-2">
                <button className="btn btn-outline-success w-100">
                  Export Excel
                </button>
              </div>
              <div className="col-6 col-md-2">
                <button className="btn btn-outline-danger w-100">
                  Export PDF
                </button>
              </div>
            </div>
          </div>

          {/* attendance Table  */}
          <div className="ms-2 me-2 bg-white rounded shadow mt-3">
            <div className="card">
              <div className="card-header">
                <h6 className="mb-2">
                  {filterStudents.length === 1
                    ? `Attendance Summary for ${filterStudents[0].studentName}`
                    : `Attendance Summary for ${selectedStandard} ${selectedSection}`}
                </h6>

                <div className="d-flex gap-5 mt-1">
                  {filterStudents.length === 1 && (
                    <>
                      <h6>
                        Present: <strong>{filterStudents[0].present}</strong>
                      </h6>
                      <h6>
                        Absent: <strong>{filterStudents[0].absent}</strong>
                      </h6>
                      <h6>
                        Leave: <strong>{filterStudents[0].leave}</strong>
                      </h6>
                      <h6>
                        Half Day: <strong>{filterStudents[0].halfDay}</strong>
                      </h6>
                    </>
                  )}

                  <h6>Total Students: <strong>{filterStudents.length}</strong></h6>

                  <h6>
                    Working Days: <strong>{workingDays}</strong>
                  </h6>
                </div>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table  table-bordered table-hovered">
                    <thead className="table-primary">
                      <tr>
                        <th>S.No</th>
                        <th>Student Name</th>
                        <th>Admission Number</th>

                        {Array.from({ length: totalDays }, (_, i) => (
                          <th key={i + 1}>{i + 1}</th>
                        ))}
                        <th>P</th>
                        <th>A</th>
                        <th>L</th>
                        <th>HD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterStudents.map((student, index) => (
                        <tr key={student.studentId}>
                          <td>{index + 1}</td>
                          <td>{student.studentName}</td>
                          <td>{student.admissionNumber}</td>

                          {Array.from({ length: totalDays }, (_, i) => {
                            const day = i + 1;

                            // Agar Sunday hai to H dikhao
                            if (sundays.includes(day)) {
                              return (
                                <td
                                  key={day}
                                  className="bg-light text-danger fw-bold text-center"
                                >
                                  H
                                </td>
                              );
                            }

                            return (
                              <td key={day} className="text-center">
                                {statusMap[student.attendance[day]] || "-"}
                              </td>
                            );
                          })}

                          <td>
                            <strong>
                              {student.present} / {workingDays}
                            </strong>
                          </td>
                          <td>{student.absent}</td>
                          <td>{student.leave}</td>
                          <td>{student.halfDay}</td>
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

export default AttendanceView;
