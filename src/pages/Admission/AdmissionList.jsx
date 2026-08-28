

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


// import React, { useEffect, useState } from "react";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import axios from "../../api/axiosInstance";

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
//         `/api/admissions/school?schoolId=${user.schoolId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((res) => {
//         // Filter only approved admissions by status name

//         console.log("result",res.data);
//         const approved = (res.data || []).filter(
//           (item) => item.status === "APPROVED"
//         );
//         setAdmissionList(approved);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [user?.schoolId, token]);

//   console.log("admission list in admission",admissionList);

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
//         adm.studentClass,
//         adm.fatherMobile,
//       ]),
//     });

//     doc.save("Admission_List.pdf");
//   };

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

//       <div className="mt-3 ms-2 me-2 p-3 bg-white shadow rounded">
//         <h5 className="text-primary">Admission List</h5>

//         {/* ===== Top Controls ===== */}
//         <div className="d-flex justify-content-between mb-3">
//           <input
//             type="text"
//             className="form-control w-25"
//             placeholder="Search Name / Admission No"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <div>
//             <button className="btn btn-success me-2" onClick={exportExcel}>
//               Export Excel
//             </button>
//             <button className="btn btn-danger" onClick={exportPDF}>
//               Export PDF
//             </button>
//           </div>
//         </div>

//         {/* ===== Table ===== */}
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover">
//             <thead className="table-primary">
//               <tr>
//                 <th>S.No</th>
//                 <th>Name</th>
//                 <th>Admission No</th>
//                 <th>Class</th>
//                 <th>Mobile</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : records.length > 0 ? (
//                 records.map((adm, index) => (
//                   <tr key={adm.id}>
//                     <td>{firstIndex + index + 1}</td>
//                     <td>
//                       {adm.firstName} {adm.lastName}
//                     </td>
//                     <td>{adm.admissionNumber}</td>
//                     <td>{adm.studentClass}</td>
//                     <td>{adm.fatherMobile}</td>
//                     <td>
//                       <span className="badge bg-success">APPROVED</span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center">
//                     No records found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* ===== Pagination ===== */}
//         <nav>
//           <ul className="pagination justify-content-end">
//             {[...Array(totalPages)].map((_, i) => (
//               <li
//                 key={i}
//                 className={`page-item ${
//                   currentPage === i + 1 ? "active" : ""
//                 }`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default AdmissionList;



import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "../../api/axiosInstance";
import {
  FaFileExcel,
  FaFilePdf,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const AdmissionList = () => {
  const [admissionList, setAdmissionList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const PRIMARY = "rgb(30, 58, 138)";

  /* ================= FETCH ADMISSIONS ================= */
  useEffect(() => {
    if (!user?.schoolId || !token) return;

    setLoading(true);

    axios
      .get(`/api/admissions/school?schoolId=${user.schoolId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Admission result:", res.data);

        // Only APPROVED admissions
        const approved = (res.data || []).filter(
          (item) => item.status?.toUpperCase() === "ENROLLED"
        );

        setAdmissionList(approved);
      })
      .catch((error) => {
        console.error("Admission fetch error:", error);
      })
      .finally(() => setLoading(false));
  }, [user?.schoolId, token]);

  /* ================= SEARCH ================= */
  const filteredData = admissionList.filter((adm) => {
    const searchValue = search.toLowerCase();

    const fullName = `${adm.firstName || ""} ${
      adm.middleName || ""
    } ${adm.lastName || ""}`.toLowerCase();

    return (
      fullName.includes(searchValue) ||
      adm.admissionNumber?.toLowerCase().includes(searchValue) ||
      adm.studentClass?.toLowerCase().includes(searchValue) ||
      adm.fatherMobile?.toLowerCase().includes(searchValue)
    );
  });

  /* ================= RESET PAGE ON SEARCH ================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = filteredData.slice(firstIndex, lastIndex);

  /* ================= EXPORT EXCEL ================= */
  const exportExcel = () => {
    if (filteredData.length === 0) {
      alert("No admission records available to export.");
      return;
    }

    const exportData = filteredData.map((adm, index) => ({
      "S.No": index + 1,
      Name: `${adm.firstName || ""} ${adm.middleName || ""} ${
        adm.lastName || ""
      }`.trim(),
      "Admission No": adm.admissionNumber || "-",
      Class: adm.studentClass || "-",
      Session: adm.academicYear || "-",
      "Father Name": adm.fatherName || "-",
      "Mother Name": adm.motherName || "-",
      Mobile: adm.fatherMobile || "-",
      "Applied Date": adm.today || "-",
      Status: adm.status || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Admissions");

    XLSX.writeFile(workbook, "Admission_List.xlsx");
  };

  /* ================= EXPORT PDF ================= */
  const exportPDF = () => {
    if (filteredData.length === 0) {
      alert("No admission records available to export.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Admission List", 14, 15);

    doc.setFontSize(9);
    doc.text(
      `Total Approved Admissions: ${filteredData.length}`,
      14,
      22
    );

    doc.autoTable({
      startY: 28,

      head: [
        [
          "S.No",
          "Name",
          "Admission No",
          "Class",
          "Session",
          "Mobile",
          "Status",
        ],
      ],

      body: filteredData.map((adm, index) => [
        index + 1,
        `${adm.firstName || ""} ${adm.middleName || ""} ${
          adm.lastName || ""
        }`.trim(),
        adm.admissionNumber || "-",
        adm.studentClass || "-",
        adm.academicYear || "-",
        adm.fatherMobile || "-",
        "APPROVED",
      ]),

      styles: {
        fontSize: 8,
        cellPadding: 3,
      },

      headStyles: {
        fillColor: [30, 58, 138],
        textColor: 255,
        fontStyle: "bold",
      },

      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
    });

    doc.save("Admission_List.pdf");
  };

  /* ================= PAGE CHANGE ================= */
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div
        className="row shadow"
        style={{
          backgroundColor: "white",
          margin: "10px",
          minHeight: "70px",
          borderRadius: "6px",
          padding: "10px 15px",
          color: "black",
          borderLeft: `4px solid ${PRIMARY}`,
        }}
      >
        <h6 className="mb-1">
          <strong>Admission List</strong>
        </h6>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "#555",
                }}
              >
                Home
              </a>
            </li>

            <li
              className="breadcrumb-item active"
              aria-current="page"
              style={{
                color: PRIMARY,
                fontWeight: "500",
              }}
            >
              Admission List
            </li>
          </ol>
        </nav>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div
        className="mt-3 mx-2 bg-white rounded shadow p-3"
        style={{
          borderTop: `3px solid ${PRIMARY}`,
        }}
      >
        {/* ================= TITLE ================= */}
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <div>
            <h5
              className="mb-1"
              style={{
                color: PRIMARY,
                fontWeight: "600",
              }}
            >
              Approved Admissions
            </h5>

            <small className="text-muted">
              List of students whose admission has been approved
            </small>
          </div>

          <span
            className="badge rounded-pill px-3 py-2 mt-2 mt-md-0"
            style={{
              backgroundColor: "#e8eefc",
              color: PRIMARY,
              fontSize: "13px",
            }}
          >
            Total: {filteredData.length}
          </span>
        </div>

        {/* ================= TOP CONTROLS ================= */}
        <div
          className="p-3 rounded mb-3"
          style={{
            backgroundColor: "#f8f9fc",
            border: "1px solid #e9ecef",
          }}
        >
          <div className="row align-items-center g-2">
            {/* SEARCH */}
            <div className="col-lg-5 col-md-6">
              <div className="position-relative">
                <FaSearch
                  style={{
                    position: "absolute",
                    left: "13px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#777",
                  }}
                />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Name / Admission No / Class / Mobile"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    paddingLeft: "38px",
                    borderRadius: "6px",
                  }}
                />
              </div>
            </div>

            {/* EXPORT BUTTONS */}
            <div className="col-lg-7 col-md-6">
              <div className="d-flex justify-content-md-end gap-2 flex-wrap">
                <button
                  type="button"
                  className="btn text-white"
                  onClick={exportExcel}
                  style={{
                    backgroundColor: "#198754",
                    borderRadius: "5px",
                  }}
                >
                  <FaFileExcel className="me-2" />
                  Export Excel
                </button>

                <button
                  type="button"
                  className="btn text-white"
                  onClick={exportPDF}
                  style={{
                    backgroundColor: "#dc3545",
                    borderRadius: "5px",
                  }}
                >
                  <FaFilePdf className="me-2" />
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="table-responsive">
          <table
            className="table table-bordered table-hover align-middle mb-0"
            style={{
              minWidth: "900px",
            }}
          >
            <thead
              style={{
                backgroundColor: PRIMARY,
                color: "white",
              }}
            >
              <tr>
                <th className="text-center">S.No</th>
                <th>Name</th>
                <th>Admission No</th>
                <th>Class</th>
                <th>Session</th>
                <th>Father Name</th>
                <th>Mobile</th>
                <th>Applied Date</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    <div
                      className="spinner-border"
                      role="status"
                      style={{
                        color: PRIMARY,
                        width: "25px",
                        height: "25px",
                      }}
                    >
                      <span className="visually-hidden">
                        Loading...
                      </span>
                    </div>

                    <div className="mt-2 text-muted">
                      Loading admissions...
                    </div>
                  </td>
                </tr>
              ) : records.length > 0 ? (
                records.map((adm, index) => (
                  <tr key={adm.id}>
                    <td className="text-center fw-semibold">
                      {firstIndex + index + 1}
                    </td>

                    <td>
                      <div className="fw-semibold">
                        {[adm.firstName, adm.middleName, adm.lastName]
                          .filter(Boolean)
                          .join(" ") || "-"}
                      </div>
                    </td>

                    <td>
                      <span
                        style={{
                          color: PRIMARY,
                          fontWeight: "600",
                        }}
                      >
                        {adm.admissionNumber || "-"}
                      </span>
                    </td>

                    <td>{adm.studentClass || "-"}</td>

                    <td>{adm.academicYear || "-"}</td>

                    <td>{adm.fatherName || "-"}</td>

                    <td>{adm.fatherMobile || "-"}</td>

                    <td>{adm.today || "-"}</td>

                    <td className="text-center">
                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          backgroundColor: "#d1e7dd",
                          color: "#146c43",
                          fontWeight: "600",
                        }}
                      >
                        {adm.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    <div
                      className="mb-2"
                      style={{
                        fontSize: "35px",
                        color: "#adb5bd",
                      }}
                    >
                      📋
                    </div>

                    <h6 className="text-muted mb-1">
                      No records found
                    </h6>

                    <small className="text-secondary">
                      No approved admission matches your search.
                    </small>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= FOOTER ================= */}
        {!loading && filteredData.length > 0 && (
          <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
            <small className="text-muted mb-2 mb-md-0">
              Showing{" "}
              <strong>{firstIndex + 1}</strong> to{" "}
              <strong>
                {Math.min(lastIndex, filteredData.length)}
              </strong>{" "}
              of <strong>{filteredData.length}</strong> records
            </small>

            {/* ================= PAGINATION ================= */}
            {totalPages > 1 && (
              <nav>
                <ul className="pagination mb-0">
                  {/* PREVIOUS */}
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => goToPage(currentPage - 1)}
                      style={{
                        color:
                          currentPage === 1 ? "#aaa" : PRIMARY,
                      }}
                    >
                      <FaChevronLeft size={11} />
                    </button>
                  </li>

                  {/* PAGE NUMBERS */}
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;

                    return (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => goToPage(page)}
                          style={
                            currentPage === page
                              ? {
                                  backgroundColor: PRIMARY,
                                  borderColor: PRIMARY,
                                  color: "white",
                                }
                              : {
                                  color: PRIMARY,
                                }
                          }
                        >
                          {page}
                        </button>
                      </li>
                    );
                  })}

                  {/* NEXT */}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => goToPage(currentPage + 1)}
                      style={{
                        color:
                          currentPage === totalPages
                            ? "#aaa"
                            : PRIMARY,
                      }}
                    >
                      <FaChevronRight size={11} />
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionList;
