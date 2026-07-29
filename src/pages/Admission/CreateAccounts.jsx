

import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import axios from "../../api/axiosInstance";

const ITEMS_PER_PAGE = 5;

const CreateAccounts = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const [searchAdmission, setSearchAdmission] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [sortBy, setSortBy] = useState("NAME");

  const [currentPage, setCurrentPage] = useState(1);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    if (!user?.schoolId || !token) return;

    setLoading(true);

    axios
      .get(
        `/api/admissions/school?schoolId=${user.schoolId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setStudents(res.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.schoolId, token]);

  // ---------------- FILTER + SORT ----------------
  const filteredStudents = useMemo(() => {
    let data = [...students];

    // ✅ ONLY Fee paid & Enrolled
    data = data.filter(
      (s) => s.status === "FEE_PAID" || s.status === "ENROLLED"
    );

    if (searchAdmission) {
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
        (a.firstName || "").localeCompare(b.firstName || "")
      );
    } else {
      data.sort((a, b) =>
        (a.admissionNumber || "").localeCompare(b.admissionNumber || "")
      );
    }

    return data;
  }, [students, searchAdmission, selectedClass, sortBy]);

  // ---------------- PAGINATION ----------------
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ---------------- CREATE STUDENT ----------------
  const handleCreateStudent = (student) => {
    if (!window.confirm("Create student account?")) return;

    const payload = {
      admissionId: student.id,
      username: student.email || `${student.admissionNumber}@school.com`,
    };

    axios
      .post(
        `/api/students/create`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Student created successfully");

        setStudents((prev) =>
          prev.map((s) =>
            s.id === student.id ? { ...s, status: "ENROLLED" } : s
          )
        );
      })
      .catch((err) => {
        alert(err?.response?.data?.message || "Error creating student");
      });
  };

  // ---------------- EXPORT TO EXCEL ----------------
  const exportToExcel = () => {
    const data = filteredStudents.map((s) => ({
      AdmissionNo: s.admissionNumber,
      Name: `${s.firstName} ${s.lastName}`,
      Class: s.studentClass,
      Mobile: s.preferredNo,
      Status: s.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "Students.xlsx");
  };

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <div
        className="row shadow"
        style={{
          backgroundColor: "white",
          margin: "10px",
          height: "67px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6>
          <strong>Create Accounts</strong>
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" style={{ textDecoration: "none", color: "black" }}>
                Student & Acccount Creation
              </a>
            </li>
          </ol>
        </nav>
      </div>

      <div className="ms-2 me-2 p-3 rounded bg-white shadow mt-4">
        {/* ---------- FILTERS ---------- */}
        <div className="row">
          <div className="col-md-4">
            <label>Admission No</label>
            <input
              className="form-control"
              value={searchAdmission}
              onChange={(e) => setSearchAdmission(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label>Class</label>
            <select
              className="form-select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">All</option>
              {["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"].map(
                (c) => (
                  <option key={c}>{c}</option>
                )
              )}
            </select>
          </div>

          <div className="col-md-4">
            <label>Sort By</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="NAME">Name</option>
              <option value="ADMISSION">Admission No</option>
            </select>
          </div>
        </div>

        {/* ---------- EXPORT ---------- */}
        <div className="text-end mt-3">
          <button className="btn btn-success btn-sm" onClick={exportToExcel}>
            Export to Excel
          </button>
        </div>

        {/* ---------- TABLE ---------- */}
        <div className="table-responsive mt-3">
          <h6>Student Creation & Their Accounts</h6>

          {loading ? (
            <div className="text-center py-3">Loading...</div>
          ) : (
            <table className="table table-bordered table-hover">
              <thead className="table-secondary">
                <tr>
                  <th>#</th>
                  <th>Admission No</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Father Mobile</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedStudents.map((s, i) => (
                  <tr key={s.id}>
                    <td>{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                    <td>{s.admissionNumber}</td>
                    <td>{s.firstName} {s.lastName}</td>
                    <td>{s.studentClass}</td>
                    <td>{s.preferredNo}</td>
                    <td>
                      <span
                        className={`badge ${
                          s.status === "FEE_PAID"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        disabled={s.status === "ENROLLED"}
                        onClick={() => handleCreateStudent(s)}
                      >
                        Create Student
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ---------- PAGINATION ---------- */}
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateAccounts;
