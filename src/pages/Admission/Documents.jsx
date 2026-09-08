// import React from 'react'

// const Documents = () => {
//   return (

//     <>
//       {/* Header */}
//       <div
//         className="row shadow"
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
//           <strong>Documents View Upload</strong>
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
//                 Documents View/Upload
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>

//      <div className='mt-3 ms-2 me-2 p-3 bg-white rounded shadow'>
//         <h5 className="text-primary">Admission Documents Upload View</h5>

//         <div className='table-responsive'>
//             <table className='table table-bordered table-hovered'>
//             <thead className='table-primary'>
//                 <tr>
//                     <th>S.No</th>
//                     <th>Admission No</th>
//                     <th>Student Name</th>
//                     <th>Parents Details</th>
//                     <th>Student Class</th>

//                     <th>Mobile No</th>
//                     <th>Address</th>
//                     <th>Documents</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                 </tr>
//             </tbody>

//         </table>
//         </div>
//      </div>
//     </>
//   )
// }

// export default Documents

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import UploadDocumentModal from "./UploadDocumentModal";

// const Documents = () => {
//   const [students, setStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!user?.schoolId) return;

//     axios
//       .get(
//         `http://localhost:8080/api/admissions/school?schoolId=${user.schoolId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((res) => setStudents(res.data))
//       .catch((err) => console.error(err));
//   }, []);
//   console.log("documents upload",students);

//   return (
//     <>
//       {/* Header */}
//       <div className="row shadow bg-white m-2 p-3 rounded">
//         <h6><strong>Documents View / Upload</strong></h6>
//       </div>

//       {/* Table */}
//       <div className="m-2 p-3 bg-white rounded shadow">
//         <h5 className="text-primary mb-3">Admission Documents</h5>

//         <div className="table-responsive">
//           <table className="table table-bordered table-hover">
//             <thead className="table-primary">
//               <tr>
//                 <th>S.No</th>
//                 <th>Admission No</th>
//                 <th>Student Name</th>
//                 <th>Class</th>
//                 <th>Mobile</th>
//                 <th>Address</th>
//                 <th>Documents</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((s, index) => (
//                 <tr key={s.id}>
//                   <td>{index + 1}</td>
//                   <td>{s.admissionNumber}</td>
//                   <td>{s.firstName} {s.lastName}</td>
//                   <td>{s.studentClass}</td>
//                   <td>{s.mobile}</td>
//                   <td>{s.address}</td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-primary"
//                       data-bs-toggle="modal"
//                       data-bs-target="#uploadModal"
//                       onClick={() => setSelectedStudent(s)}
//                     >
//                       Upload / View
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {students.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="text-center text-muted">
//                     No students found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Upload Modal */}
//       {selectedStudent && (
//         <UploadDocumentModal student={selectedStudent} />
//       )}
//     </>
//   );
// };

// export default Documents;

import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadDocumentModal from "./UploadDocumentModal";
import { useNavigate } from "react-router-dom";

const Documents = () => {
  const [admissions, setAdmissions] = useState([]);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user?.schoolId) return;

    axios
      .get(
        `http://localhost:8080/api/admissions/school?schoolId=${user.schoolId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => setAdmissions(res.data))
      .catch((err) => console.error(err));
  }, []);
console.log("user school",admissions);
console.log("user selected",selectedAdmission);
  return (
    <>
      {/* Header */}
      <div className="row shadow bg-white m-2 p-3 rounded">
        <h6>
          <strong>Documents View / Upload</strong>
        </h6>
      </div>

      {/* Table */}
      <div className="m-2 p-3 bg-white rounded shadow">
        <h5 className="text-primary mb-3">Admission Documents</h5>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-primary">
              <tr>
                <th>S.No</th>
                <th>Admission No</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Documents</th>
              </tr>
            </thead>

            <tbody>
              {admissions.map((a, index) => (
                <tr key={a.id}>
                  <td>{index + 1}</td>
                  <td>{a.admissionNumber}</td>
                  <td>
                    {a.firstName} {a.lastName}
                  </td>
                  <td>{a.studentClass}</td>
                  <td>{a.father_mobile || "-"}</td>
                  <td>{a.address || "-"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#uploadDocumentModal"
                      onClick={() => setSelectedAdmission(a)}
                    >
                      Upload / View
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() =>
                        navigate(`/admissions/${a.id}/documents`)
                      }
                    >
                      Documents
                    </button>
                  </td>
                </tr>
              ))}

              {admissions.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No admissions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔑 SEND ADMISSION TO MODAL */}
      <UploadDocumentModal admission={selectedAdmission} />
      <Documents admissionId={selectedAdmission} />

    </>
  );
};

export default Documents;
