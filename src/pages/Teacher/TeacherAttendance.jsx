import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

const TeacherAttendance = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.school?.id;

  const [teachers, setTeachers] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [teacherHistory, setTeacherHistory] = useState([]);

  /* =========================
     FETCH TEACHERS
  ========================== */
  useEffect(() => {
  if (!schoolId) return;

  axiosInstance.get("/api/teachers", {
    params: {
      schoolId: schoolId,
      status: "Working"
    }
  })
  .then(res => setTeachers(res.data))
  .catch(err => console.error(err));

}, [schoolId]);
console.log("Teachers",teachers);


  /* =========================
     FETCH ATTENDANCE BY DATE
  ========================== */
  useEffect(() => {
    if (!teachers.length) return;

    axiosInstance
      .get(
        `/api/teacher-attendance?schoolId=${schoolId}&date=${selectedDate}`,
      )
      .then((res) => {
        if (res.data.length > 0) {
          setAttendanceData(
            res.data.map((a) => ({
              teacherId: a.teacher.id,
              name: `${a.teacher.firstName} ${a.teacher.lastName}`,
              status: a.status,
            })),
          );
        } else {
          setAttendanceData(
            teachers.map((t) => ({
              teacherId: t.id,
              name: `${t.firstName} ${t.lastName}`,
              status: "",
            })),
          );
        }
      })
      .catch((err) => console.error(err));
  }, [selectedDate, teachers, schoolId]);

  /* =========================
     STATUS CHANGE
  ========================== */
  const handleStatusChange = (teacherId, status) => {
    setAttendanceData((prev) =>
      prev.map((t) => (t.teacherId === teacherId ? { ...t, status } : t)),
    );
  };

  /* =========================
     MARK ALL
  ========================== */
  const handleMarkAll = (status) => {
    setAttendanceData((prev) => prev.map((t) => ({ ...t, status })));
  };

  /* =========================
     SAVE ATTENDANCE
  ========================== */
  const handleSave = async () => {
    const payload = attendanceData
      .filter((t) => t.status)
      .map((t) => ({
        teacherId: t.teacherId,
        status: t.status,
      }));

    if (!payload.length) {
      alert("Please mark attendance first");
      return;
    }

    await axiosInstance.post(
      `/api/teacher-attendance?schoolId=${schoolId}&date=${selectedDate}`,
      payload,
    );

    alert("Attendance saved successfully");
  };

  /* =========================
     INDIVIDUAL TEACHER HISTORY
  ========================== */
  useEffect(() => {
    if (!selectedTeacherId) {
      setTeacherHistory([]);
      return;
    }

    axiosInstance
      .get(
        `/api/teacher-attendance/teacher/${selectedTeacherId}`,
      )
      .then((res) => setTeacherHistory(res.data))
      .catch((err) => console.error(err));
  }, [selectedTeacherId]);

  console.log("teacher history", teacherHistory);

  /* =========================
     FILTER + COUNTS
  ========================== */
  const filteredData = attendanceData.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const countStatus = (status) =>
    attendanceData.filter((t) => t.status === status).length;

  return (
    <>
      {/* HEADER */}
      <div className="bg-white shadow p-3 rounded m-2">
        <h5>Teacher Attendance</h5>
      </div>

      {/* DAILY ATTENDANCE */}
      <div className="bg-white p-3 m-2 rounded shadow">
        <div className="d-flex flex-wrap gap-2 mb-3">
          <input
            type="date"
            className="form-control w-auto"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <input
            type="text"
            className="form-control w-auto"
            placeholder="Search teacher"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            className="btn btn-success"
            onClick={() => handleMarkAll("PRESENT")}
          >
            Mark All Present
          </button>

          <button
            className="btn btn-danger"
            onClick={() => handleMarkAll("ABSENT")}
          >
            Mark All Absent
          </button>

          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>

        <div className="mb-2">
          <strong>Total:</strong> {attendanceData.length} |{" "}
          <span className="text-success">
            Present: {countStatus("PRESENT")}
          </span>{" "}
          | <span className="text-danger">Absent: {countStatus("ABSENT")}</span>{" "}
          | <span className="text-warning">Leave: {countStatus("LEAVE")}</span>{" "}
          | Half Day: {countStatus("HALF_DAY")}
        </div>

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((t, i) => (
              <tr key={t.teacherId}>
                <td>{i + 1}</td>
                <td>{t.name}</td>
                <td>
                  <select
                    className="form-select"
                    value={t.status}
                    onChange={(e) =>
                      handleStatusChange(t.teacherId, e.target.value)
                    }
                  >
                    <option value="">--Select--</option>
                    <option value="PRESENT">Present</option>
                    <option value="ABSENT">Absent</option>
                    <option value="LEAVE">Leave</option>
                    <option value="HALF_DAY">Half Day</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* INDIVIDUAL TEACHER DATE-WISE */}
      <div className="bg-white p-3 m-2 rounded shadow">
        <h6 className="bg-secondary p-2 text-white">Teacher Attendance History</h6>

        <select
          className="form-select w-auto mb-3"
          value={selectedTeacherId}
          onChange={(e) => setSelectedTeacherId(e.target.value)}
        >
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.firstName} {t.lastName}
            </option>
          ))}
        </select>

        {teacherHistory.length ? (
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {teacherHistory.map((a, i) => (
                <tr key={i}>
                  <td>{a.attendanceDate}</td>
                  <td
                    className={
                      a.status === "PRESENT"
                        ? "text-success fw-semibold"
                        : a.status === "ABSENT"
                          ? "text-danger fw-semibold"
                          : a.status === "LEAVE"
                            ? "text-warning fw-semibold"
                            : a.status === "HALF_DAY"
                              ? "text-primary fw-semibold"
                              : ""
                    }
                  >
                    {a.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          selectedTeacherId && <p>No attendance found</p>
        )}
      </div>
    </>
  );
};

export default TeacherAttendance;
