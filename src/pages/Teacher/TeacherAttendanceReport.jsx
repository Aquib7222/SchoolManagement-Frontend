import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const TeacherAttendanceReport = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.school?.id;

  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [reportData, setReportData] = useState([]);

  /* =========================
     FETCH MONTHLY DATA
  ========================== */
  useEffect(() => {
    if (!schoolId) return;

    axios
      .get(
        `http://localhost:8080/api/teacher-attendance/monthly?schoolId=${schoolId}&month=${month}`
      )
      .then(res => setReportData(res.data))
      .catch(err => console.error(err));
  }, [month, schoolId]);

  /* =========================
     PDF EXPORT
  ========================== */
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Teacher Attendance Monthly Report", 14, 15);

    const tableData = reportData.map((t, i) => [
      i + 1,
      t.teacherName,
      t.present,
      t.absent,
      t.leave,
      t.halfDay,
      t.total
    ]);

    doc.autoTable({
      head: [
        [
          "#",
          "Teacher",
          "Present",
          "Absent",
          "Leave",
          "Half Day",
          "Total Days"
        ]
      ],
      body: tableData,
      startY: 20
    });

    doc.save(`Teacher_Attendance_${month}.pdf`);
  };

  /* =========================
     EXCEL EXPORT
  ========================== */
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      reportData.map(t => ({
        Teacher: t.teacherName,
        Present: t.present,
        Absent: t.absent,
        Leave: t.leave,
        HalfDay: t.halfDay,
        Total: t.total
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    saveAs(
      new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }),
      `Teacher_Attendance_${month}.xlsx`
    );
  };

  return (
    <>
      <div className="bg-white p-3 m-2 shadow rounded">
        <h5>Teacher Attendance Report</h5>
      </div>

      <div className="bg-white p-3 m-2 shadow rounded">
        <div className="d-flex flex-wrap gap-2 mb-3">
          <input
            type="month"
            className="form-control w-auto"
            value={month}
            onChange={e => setMonth(e.target.value)}
          />

          <button className="btn btn-danger" onClick={exportPDF}>
            Export PDF
          </button>

          <button className="btn btn-success" onClick={exportExcel}>
            Export Excel
          </button>
        </div>

        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Teacher Name</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Leave</th>
              <th>Half Day</th>
              <th>Total Days</th>
            </tr>
          </thead>
          <tbody>
            {reportData.length ? (
              reportData.map((t, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{t.teacherName}</td>
                  <td className="text-success">{t.present}</td>
                  <td className="text-danger">{t.absent}</td>
                  <td className="text-warning">{t.leave}</td>
                  <td>{t.halfDay}</td>
                  <td>
                    <strong>{t.total}</strong>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeacherAttendanceReport;
