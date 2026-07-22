

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const AdmissionList = () => {
//   const [admissionList, setAdmissionList] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 5;

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!user?.schoolId || !token) return;

//     setLoading(true);

//     axios
//       .get(
//         `http://localhost:8080/api/admissions/school?schoolId=${user.schoolId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((res) => {
//         const approved = (res.data || []).filter(
//           (item) => item.status?.name === "APPROVED"
//         );
//         setAdmissionList(approved);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [user?.schoolId, token]);

//   /* ================= SEARCH ================= */
//   const filteredData = admissionList.filter(
//     (adm) =>
//       adm.firstName?.toLowerCase().includes(search.toLowerCase()) ||
//       adm.admissionNumber?.toLowerCase().includes(search.toLowerCase())
//   );

//   /* ================= PAGINATION ================= */
//   const lastIndex = currentPage * recordsPerPage;
//   const firstIndex = lastIndex - recordsPerPage;
//   const records = filteredData.slice(firstIndex, lastIndex);
//   const totalPages = Math.ceil(filteredData.length / recordsPerPage);

//   console.log("records",records);
//   /* ================= EXPORT EXCEL ================= */
//   const exportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Admissions");
//     XLSX.writeFile(workbook, "Admission_List.xlsx");
//   };

//   /* ================= EXPORT PDF ================= */
//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Admission List", 14, 15);

//     doc.autoTable({
//       startY: 20,
//       head: [["S.No", "Name", "Admission No", "Class", "Mobile"]],
//       body: filteredData.map((adm, index) => [
//         index + 1,
//         `${adm.firstName} ${adm.lastName}`,
//         adm.admissionNumber,
//         adm.className,
//         adm.mobile,
//       ]),
//     });

//     doc.save("Admission_List.pdf");
//   };

//   return (
//     <>
//           {/* Header */}
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
//           <strong>Admission List</strong>
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
//                 Admission List
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>
//     <div className="mt-3 ms-2 me-2 p-3 bg-white shadow rounded">
//         <h5 className="text-primary">Admission List</h5>

//       {/* ===== Top Controls ===== */}
//       <div className="d-flex justify-content-between mb-3">
//         <input
//           type="text"
//           className="form-control w-25"
//           placeholder="Search Name / Admission No"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <div>
//           <button className="btn btn-success me-2" onClick={exportExcel}>
//             Export Excel
//           </button>
//           <button className="btn btn-danger" onClick={exportPDF}>
//             Export PDF
//           </button>
//         </div>
//       </div>

//       {/* ===== Table ===== */}
//       <div className="table-responsive">
//         <table className="table table-bordered table-hover">
//           <thead className="table-primary">
//             <tr>
//               <th>S.No</th>
//               <th>Name</th>
//               <th>Admission No</th>
//               <th>Class</th>
//               <th>Mobile</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="6" className="text-center">Loading...</td>
//               </tr>
//             ) : records.length > 0 ? (
//               records.map((adm, index) => (
//                 <tr key={adm.id}>
//                   <td>{firstIndex + index + 1}</td>
//                   <td>{adm.firstName} {adm.lastName}</td>
//                   <td>{adm.admissionNumber}</td>
//                   <td>{adm.studentClass}</td>
//                   <td>{adm.fatherMobile}</td>
//                   <td>
//                     <span className="badge bg-success">
//                       Approved
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center">
//                   No records found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ===== Pagination ===== */}
//       <nav>
//         <ul className="pagination justify-content-end">
//           {[...Array(totalPages)].map((_, i) => (
//             <li
//               key={i}
//               className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => setCurrentPage(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>

//     </div>

    
//     </>
//   );
// };

// export default AdmissionList;

import axios from "axios";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdmissionList = () => {
  const [admissionList, setAdmissionList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user?.schoolId || !token) return;

    setLoading(true);

    axios
      .get(
        `http://localhost:8080/api/admissions/school?schoolId=${user.schoolId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // Filter only approved admissions by status name

        console.log("result",res.data);
        const approved = (res.data || []).filter(
          (item) => item.status === "APPROVED"
        );
        setAdmissionList(approved);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.schoolId, token]);

  console.log("admission list in admission",admissionList);

  /* ================= SEARCH ================= */
  const filteredData = admissionList.filter(
    (adm) =>
      adm.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      adm.admissionNumber?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= PAGINATION ================= */
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  /* ================= EXPORT EXCEL ================= */
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admissions");
    XLSX.writeFile(workbook, "Admission_List.xlsx");
  };

  /* ================= EXPORT PDF ================= */
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Admission List", 14, 15);

    doc.autoTable({
      startY: 20,
      head: [["S.No", "Name", "Admission No", "Class", "Mobile"]],
      body: filteredData.map((adm, index) => [
        index + 1,
        `${adm.firstName} ${adm.lastName}`,
        adm.admissionNumber,
        adm.studentClass,
        adm.fatherMobile,
      ]),
    });

    doc.save("Admission_List.pdf");
  };

  return (
    <>
      {/* Header */}
      <div
        className="row shadow"
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
          <strong>Admission List</strong>
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
                Admission List
              </a>
            </li>
          </ol>
        </nav>
      </div>

      <div className="mt-3 ms-2 me-2 p-3 bg-white shadow rounded">
        <h5 className="text-primary">Admission List</h5>

        {/* ===== Top Controls ===== */}
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search Name / Admission No"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div>
            <button className="btn btn-success me-2" onClick={exportExcel}>
              Export Excel
            </button>
            <button className="btn btn-danger" onClick={exportPDF}>
              Export PDF
            </button>
          </div>
        </div>

        {/* ===== Table ===== */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-primary">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Admission No</th>
                <th>Class</th>
                <th>Mobile</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : records.length > 0 ? (
                records.map((adm, index) => (
                  <tr key={adm.id}>
                    <td>{firstIndex + index + 1}</td>
                    <td>
                      {adm.firstName} {adm.lastName}
                    </td>
                    <td>{adm.admissionNumber}</td>
                    <td>{adm.studentClass}</td>
                    <td>{adm.fatherMobile}</td>
                    <td>
                      <span className="badge bg-success">APPROVED</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ===== Pagination ===== */}
        <nav>
          <ul className="pagination justify-content-end">
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdmissionList;
