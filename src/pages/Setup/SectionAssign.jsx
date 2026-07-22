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

import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignSection = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [section, setSection] = useState("");

  /* FETCH STUDENTS */
  useEffect(() => {
    axios.get("http://localhost:8080/api/sections/students", {
      params: { schoolId: user.schoolId, studentClass: selectedClass },
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStudents(res.data));
  }, [selectedClass]);

  /* SELECT STUDENT */
  const toggleStudent = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  /* ASSIGN SECTION */
  const assignSection = () => {
    if (!section || selectedIds.length === 0) {
      alert("Select students and section");
      return;
    }

    axios.post(
      `http://localhost:8080/api/sections/assign?schoolId=${user.schoolId}`,
      { studentIds: selectedIds, section },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(() => {
      alert("Section assigned successfully");
      setSelectedIds([]);
    });
  };

  return (
    <div className="bg-white p-3 m-2 rounded shadow">
      <h6><strong>Assign Section</strong></h6>

      {/* FILTER */}
      <div className="row mt-3">
        <div className="col-md-3">
          <label>Class</label>
          <select
            className="form-select"
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
          >
            <option value="">All</option>
            {["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"]
              .map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="col-md-3">
          <label>Section</label>
          <select
            className="form-select"
            value={section}
            onChange={e => setSection(e.target.value)}
          >
            <option value="">Select</option>
            {["A","B","C","D","E"].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th></th>
            <th>Admission No</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(s.id)}
                  onChange={() => toggleStudent(s.id)}
                />
              </td>
              <td>{s.admissionNumber}</td>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.studentClass}</td>
              <td>{s.section || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary" onClick={assignSection}>
        Assign Section
      </button>
    </div>
  );
};

export default AssignSection;
