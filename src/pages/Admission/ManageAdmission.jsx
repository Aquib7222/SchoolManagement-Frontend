

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { FaEye, FaUserEdit } from "react-icons/fa";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import axios from "../../api/axiosInstance";

// const ManageAdmission = () => {
//   const [admissions, setAdmissions] = useState([]);
//   const [openHistoryId, setOpenHistoryId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");

//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   /* ================= FETCH ADMISSIONS ================= */
//   useEffect(() => {
//     if (!user?.schoolId) return;

//     axios
//       .get(
//         `/api/admissions/school?schoolId=${user.schoolId}`,
//         { headers: { Authorization: `Bearer ${token}` } },
//       )
//       .then((res) => setAdmissions(res.data))
//       .catch(console.error);
//   }, [user?.schoolId]);

//   console.log("admission", admissions);

//   /* ================= FILTER LOGIC ================= */
//   const filteredAdmissions = admissions.filter((a) => {
//     const fullName = `${a.firstName || ""} ${a.lastName || ""}`.toLowerCase();
//     const nameMatch = fullName.includes(searchTerm.toLowerCase());

//     const statusMatch =
//       filterStatus === "all" || (a.status || "APPLIED") === filterStatus;

//     return nameMatch && statusMatch;
//   });

//   /* ================= UPDATE STATUS ================= */
//   const updateStatus = async (id, status) => {
//     await axios.put(
//       `/api/admissions/${id}/status`,
//       { status },
//       { headers: { Authorization: `Bearer ${token}` } },
//     );

//     const res = await axios.get(
//       `/api/admissions/school?schoolId=${user.schoolId}`,
//       { headers: { Authorization: `Bearer ${token}` } },
//     );
//     setAdmissions(res.data);
//   };
//    const handleEdit = (id) =>
//     navigate(`/admission/edit/${id}`);

//   return (
//     <div>
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
//           <strong>Manage Admission</strong>
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
//                 Manage Admission
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* ================= TABLE CARD ================= */}
//       <div className="mt-3 ms-2 me-2 bg-white rounded p-3 shadow table-responsive">
//         {/* ================= SEARCH & FILTER ================= */}
//         <div className="row mb-3">
//           <div className="col-md-4">
//             <input
//               type="search"
//               className="form-control"
//               placeholder="Search Student By Name"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="col-md-2 mt-2 mt-md-0">
//             <select
//               className="form-select"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="all">All</option>
//               <option value="APPLIED">Applied</option>
//               <option value="APPROVED">Approved</option>
//               <option value="REJECTED">Rejected</option>
//               <option value="ENROLLED">Enrolled</option>
//               <option value="FEE_PAID">Fee Paid</option>
//             </select>
//           </div>
//         </div>

//         {/* ================= TABLE ================= */}
//         <table className="table table-bordered table-hover">
//           <thead className="table-warning">
//             <tr>
//               <th>S.No</th>
//               <th>Name</th>
//               <th>Admission No</th>
//               <th>Class</th>
//               <th>Session</th>
//               <th>Father Name</th>
//               <th>Mother Name</th>
//               <th>Mobile No</th>
//               <th>Applied Date</th>
//               <th>Status</th>

//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredAdmissions.map((a, i) => (
//               <>
//                 <tr key={a.id}>
//                   <td>{i + 1}</td>

//                   <td>
//                     {[a.firstName, a.lastName].filter(Boolean).join(" ") || "-"}
//                   </td>

//                   <td>{a.admissionNumber || "-"}</td>
//                   <td>{a.studentClass || "-"}</td>
//                   <td>{a.academicYear || "-"}</td>
//                   <td>{a.fatherName || "-"}</td>
//                   <td>{a.motherName || "-"}</td>
//                   <td>{a.fatherMobile || "-"}</td>
//                   <td>{a.today || "-"}</td>

//                   {/* ================= STATUS DROPDOWN ================= */}
//                   <td>
//                     <td>
//                       <select
//                         className=" form-select-sm"
//                         value={(a.status || "APPLIED").toUpperCase()}
//                         disabled={["APPROVED", "ENROLLED", "FEE_PAID"].includes(
//                           (a.status || "").toUpperCase(),
//                         )}
//                         style={{
//                           backgroundColor:
//                             (a.status || "APPLIED") === "APPLIED"
//                               ? "#0d6efd" // primary
//                               : a.status === "APPROVED"
//                                 ? "#198754" // success
//                                 : a.status === "ENROLLED"
//                                   ? "#0dcaf0" // info
//                                   : a.status === "FEE_PAID"
//                                     ? "#212529" // dark
//                                     : "#dc3545", // danger
//                           color: "white",
//                           cursor: ["APPROVED", "ENROLLED", "FEE_PAID"].includes(
//                             (a.status || "").toUpperCase(),
//                           )
//                             ? "not-allowed"
//                             : "pointer",
//                         }}
//                         onChange={(e) =>
//                           updateStatus(a.id, e.target.value.toUpperCase())
//                         }
//                       >
//                         <option value="APPLIED">Applied</option>
//                         <option value="APPROVED">Approved</option>
//                         <option value="ENROLLED">Enrolled</option>
//                         <option value="FEE_PAID">Fee Paid</option>
//                         <option value="REJECTED">Rejected</option>
//                       </select>
//                     </td>
//                   </td>

//                   {/* ================= HISTORY ================= */}
//                   <td className="d-flex gap-2">
//                     <button
//                       className="btn btn-success"
//                       onClick={() => handleEdit(a.id)}
//                     >
//                       <FaUserEdit />
//                     </button>
//                     <button className="btn btn-danger">
//                       <RiDeleteBin6Fill />
//                     </button>
//                     <button className="btn btn-primary">
//                       <FaEye />
//                     </button>
//                   </td>
//                 </tr>

//                 {openHistoryId === a.id && (
//                   <tr>
//                     <td colSpan="13">
//                       <strong>Status History</strong>
//                       <ul className="mt-2">
//                         {a.statusHistory?.map((h, idx) => (
//                           <li key={idx}>
//                             <b>{h.status?.name}</b> — {h.updatedBy} (
//                             {h.updatedAt?.replace("T", " ")})
//                           </li>
//                         ))}
//                       </ul>
//                     </td>
//                   </tr>
//                 )}
//               </>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageAdmission;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaUserEdit,
  FaSearch,
  FaHistory,
  FaFilter,
} from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "../../api/axiosInstance";

const ManageAdmission = () => {
  const [admissions, setAdmissions] = useState([]);
  const [openHistoryId, setOpenHistoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  /* =====================================================
     FETCH ADMISSIONS
  ===================================================== */

  const fetchAdmissions = async () => {
    if (!user?.schoolId) return;

    try {
      setLoading(true);

      const response = await axios.get(
        `/api/admissions/school?schoolId=${user.schoolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdmissions(response.data || []);
    } catch (error) {
      console.error("Error fetching admissions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, [user?.schoolId]);

  /* =====================================================
     STATUS UPDATE
  ===================================================== */

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `/api/admissions/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchAdmissions();
    } catch (error) {
      console.error("Status update failed:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update admission status."
      );
    }
  };

  /* =====================================================
     DELETE ADMISSION
  ===================================================== */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admission?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/admissions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdmissions((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Admission deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete admission."
      );
    }
  };

  /* =====================================================
     EDIT
  ===================================================== */

  const handleEdit = (id) => {
    navigate(`/admission/edit/${id}`);
  };

  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (id) => {
    navigate(`/admission/view/${id}`);
  };

  /* =====================================================
     STATUS COLOR
  ===================================================== */

  const getStatusStyle = (status) => {
    switch ((status || "APPLIED").toUpperCase()) {
      case "APPROVED":
        return {
          backgroundColor: "#198754",
          color: "white",
        };

      case "REJECTED":
        return {
          backgroundColor: "#dc3545",
          color: "white",
        };

      case "ENROLLED":
        return {
          backgroundColor: "#0dcaf0",
          color: "#000",
        };

      case "FEE_PAID":
        return {
          backgroundColor: "#212529",
          color: "white",
        };

      case "APPLIED":
      default:
        return {
          backgroundColor: "#0d6efd",
          color: "white",
        };
    }
  };

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredAdmissions = admissions.filter((a) => {
    const fullName = `${a.firstName || ""} ${
      a.middleName || ""
    } ${a.lastName || ""}`.toLowerCase();

    const admissionNumber = (
      a.admissionNumber || ""
    ).toLowerCase();

    const fatherMobile = (
      a.fatherMobile || ""
    ).toLowerCase();

    const search = searchTerm.toLowerCase();

    const searchMatch =
      fullName.includes(search) ||
      admissionNumber.includes(search) ||
      fatherMobile.includes(search);

    const statusMatch =
      filterStatus === "all" ||
      (a.status || "APPLIED").toUpperCase() ===
        filterStatus.toUpperCase();

    return searchMatch && statusMatch;
  });

  /* =====================================================
     COUNTS
  ===================================================== */

  const totalAdmissions = admissions.length;

  const appliedCount = admissions.filter(
    (a) => (a.status || "APPLIED").toUpperCase() === "APPLIED"
  ).length;

  const approvedCount = admissions.filter(
    (a) => (a.status || "").toUpperCase() === "APPROVED"
  ).length;

  const enrolledCount = admissions.filter(
    (a) => (a.status || "").toUpperCase() === "ENROLLED"
  ).length;

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="container-fluid px-0">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="shadow"
        style={{
          backgroundColor: "#ffffff",
          margin: "10px",
          borderRadius: "6px",
          padding: "12px 15px",
          color: "#1e3a8a",
          borderLeft: "4px solid rgb(30, 58, 138)",
        }}
      >
        <h6 className="mb-1">
          <strong>Manage Admission</strong>
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

            <li className="breadcrumb-item active">
              Manage Admission
            </li>
          </ol>
        </nav>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="row g-3 mx-1 mt-2">

        <div className="col-xl-3 col-md-6">
          <div
            className="card border-0 shadow h-100"
            style={{ borderRadius: "8px" }}
          >
            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#e8f1ff",
                  color: "#0d6efd",
                  fontSize: "20px",
                }}
              >
                <FaUserEdit />
              </div>

              <div>
                <small className="text-muted">
                  Total Admissions
                </small>

                <h5 className="mb-0 fw-bold">
                  {totalAdmissions}
                </h5>
              </div>

            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div
            className="card border-0 shadow h-100"
            style={{ borderRadius: "8px" }}
          >
            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#e7f1ff",
                  color: "#0d6efd",
                  fontSize: "20px",
                }}
              >
                <FaHistory />
              </div>

              <div>
                <small className="text-muted">
                  Applied
                </small>

                <h5 className="mb-0 fw-bold">
                  {appliedCount}
                </h5>
              </div>

            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div
            className="card border-0 shadow h-100"
            style={{ borderRadius: "8px" }}
          >
            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#e8f7ee",
                  color: "#198754",
                  fontSize: "20px",
                }}
              >
                ✓
              </div>

              <div>
                <small className="text-muted">
                  Approved
                </small>

                <h5 className="mb-0 fw-bold">
                  {approvedCount}
                </h5>
              </div>

            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div
            className="card border-0 shadow h-100"
            style={{ borderRadius: "8px" }}
          >
            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#e4f8fb",
                  color: "#0dcaf0",
                  fontSize: "20px",
                }}
              >
                ✓
              </div>

              <div>
                <small className="text-muted">
                  Enrolled
                </small>

                <h5 className="mb-0 fw-bold">
                  {enrolledCount}
                </h5>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* =====================================================
          TABLE CARD
      ===================================================== */}

      <div
        className="mt-3 ms-2 me-2 bg-white rounded shadow"
        style={{
          padding: "15px",
        }}
      >

        {/* =====================================================
            FILTER HEADER
        ===================================================== */}

        <div
          className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3 pb-3"
          style={{
            borderBottom: "1px solid #e9ecef",
          }}
        >

          <div className="d-flex align-items-center gap-2">
            <div
              style={{
                backgroundColor: "#1e3a8a",
                color: "white",
                width: "36px",
                height: "36px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaFilter />
            </div>

            <div>
              <h6 className="mb-0 fw-bold">
                Admission List
              </h6>

              <small className="text-muted">
                Manage and track student admissions
              </small>
            </div>
          </div>

          <button
            className="btn text-white"
            style={{
              backgroundColor: "rgb(30, 58, 138)",
            }}
            onClick={() =>
              navigate("/admission/new_admission/add")
            }
          >
            + Add Admission
          </button>

        </div>

        {/* =====================================================
            SEARCH FILTER
        ===================================================== */}

        <div className="row g-2 mb-3">

          <div className="col-lg-5 col-md-6">
            <div className="input-group">

              <span
                className="input-group-text bg-white"
                style={{
                  borderRight: "0",
                }}
              >
                <FaSearch className="text-muted" />
              </span>

              <input
                type="search"
                className="form-control"
                placeholder="Search by name, admission no or mobile..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                style={{
                  borderLeft: "0",
                }}
              />

            </div>
          </div>

          <div className="col-lg-3 col-md-4">

            <select
              className="form-select"
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value)
              }
            >
              <option value="all">
                All Status
              </option>

              <option value="APPLIED">
                Applied
              </option>

              <option value="APPROVED">
                Approved
              </option>

              <option value="REJECTED">
                Rejected
              </option>

              <option value="ENROLLED">
                Enrolled
              </option>

              <option value="FEE_PAID">
                Fee Paid
              </option>
            </select>

          </div>

          <div className="col-lg-4 col-md-2 d-flex align-items-center">

            <span className="text-muted small">
              Showing{" "}
              <strong className="text-dark">
                {filteredAdmissions.length}
              </strong>{" "}
              of{" "}
              <strong className="text-dark">
                {admissions.length}
              </strong>{" "}
              admissions
            </span>

          </div>

        </div>

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className="table-responsive">

          <table
            className="table table-hover align-middle mb-0"
            style={{
              minWidth: "1250px",
            }}
          >

            <thead>
              <tr
                style={{
                  backgroundColor: "#1e3a8a",
                  color: "white",
                }}
              >
                <th className="text-center">
                  S.No
                </th>

                <th>
                  Student
                </th>

                <th>
                  Admission No
                </th>

                <th>
                  Class
                </th>

                <th>
                  Session
                </th>

                <th>
                  Father Name
                </th>

                <th>
                  Mother Name
                </th>

                <th>
                  Mobile
                </th>

                <th>
                  Applied Date
                </th>

                <th className="text-center">
                  Status
                </th>

                <th className="text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="11"
                    className="text-center py-5"
                  >
                    <div
                      className="spinner-border text-primary"
                      role="status"
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
              ) : filteredAdmissions.length === 0 ? (
                <tr>
                  <td
                    colSpan="11"
                    className="text-center py-5"
                  >
                    <div
                      className="text-danger fw-semibold"
                    >
                      No admission data found
                    </div>

                    <small className="text-muted">
                      Try changing your search or status
                      filter.
                    </small>
                  </td>
                </tr>
              ) : (
                filteredAdmissions.map((a, i) => {

                  const status =
                    (a.status || "APPLIED").toUpperCase();

                  const isLocked = [
                    "APPROVED",
                    "ENROLLED",
                    "FEE_PAID",
                  ].includes(status);

                  return (
                    <>

                      {/* ================= MAIN ROW ================= */}

                      <tr key={a.id}>

                        <td className="text-center fw-semibold">
                          {i + 1}
                        </td>

                        <td>
                          <div className="d-flex align-items-center">

                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center me-2"
                              style={{
                                width: "38px",
                                height: "38px",
                                backgroundColor: "#e8eefc",
                                color: "#1e3a8a",
                                fontWeight: "600",
                              }}
                            >
                              {(
                                a.firstName?.charAt(0) ||
                                "S"
                              ).toUpperCase()}
                            </div>

                            <div>

                              <div className="fw-semibold">
                                {[
                                  a.firstName,
                                  a.middleName,
                                  a.lastName,
                                ]
                                  .filter(Boolean)
                                  .join(" ") || "-"}
                              </div>

                              <small className="text-muted">
                                {a.email || "No email"}
                              </small>

                            </div>

                          </div>
                        </td>

                        <td>
                          <span
                            className="fw-semibold"
                            style={{
                              color: "#1e3a8a",
                            }}
                          >
                            {a.admissionNumber || "-"}
                          </span>
                        </td>

                        <td>
                          {a.studentClass ||
                            a.class ||
                            "-"}
                        </td>

                        <td>
                          {a.academicYear || "-"}
                        </td>

                        <td>
                          {a.fatherName || "-"}
                        </td>

                        <td>
                          {a.motherName || "-"}
                        </td>

                        <td>
                          {a.fatherMobile ||
                            a.preferredNo ||
                            "-"}
                        </td>

                        <td>
                          {a.today ||
                            a.appliedDate ||
                            "-"}
                        </td>

                        {/* ================= STATUS ================= */}

                        <td className="text-center">

                          <select
                            className="form-select form-select-sm fw-semibold"
                            value={status}
                            disabled={isLocked}
                            onChange={(e) =>
                              updateStatus(
                                a.id,
                                e.target.value
                              )
                            }
                            style={{
                              ...getStatusStyle(status),
                              border: "none",
                              minWidth: "115px",
                              cursor: isLocked
                                ? "not-allowed"
                                : "pointer",
                            }}
                          >

                            <option value="APPLIED">
                              Applied
                            </option>

                            <option value="APPROVED">
                              Approved
                            </option>

                            <option value="ENROLLED">
                              Enrolled
                            </option>

                            <option value="FEE_PAID">
                              Fee Paid
                            </option>

                            <option value="REJECTED">
                              Rejected
                            </option>

                          </select>

                        </td>

                        {/* ================= ACTIONS ================= */}

                        <td>

                          <div className="d-flex justify-content-center gap-1">

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                              onClick={() =>
                                handleView(a.id)
                              }
                            >
                              <FaEye />
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-success"
                              title="Edit"
                              onClick={() =>
                                handleEdit(a.id)
                              }
                            >
                              <FaUserEdit />
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              title="Delete"
                              onClick={() =>
                                handleDelete(a.id)
                              }
                            >
                              <RiDeleteBin6Fill />
                            </button>

                            {a.statusHistory?.length > 0 && (
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                title="Status History"
                                onClick={() =>
                                  setOpenHistoryId(
                                    openHistoryId === a.id
                                      ? null
                                      : a.id
                                  )
                                }
                              >
                                <FaHistory />
                              </button>
                            )}

                          </div>

                        </td>

                      </tr>

                      {/* ================= HISTORY ================= */}

                      {openHistoryId === a.id && (
                        <tr key={`${a.id}-history`}>
                          <td colSpan="11">

                            <div
                              className="p-3 rounded"
                              style={{
                                backgroundColor:
                                  "#f8f9fa",
                                borderLeft:
                                  "4px solid #1e3a8a",
                              }}
                            >

                              <div className="fw-bold mb-2">
                                <FaHistory className="me-2" />
                                Status History
                              </div>

                              {a.statusHistory?.length > 0 ? (
                                <div>

                                  {a.statusHistory.map(
                                    (h, idx) => (
                                      <div
                                        key={idx}
                                        className="d-flex align-items-center gap-2 mb-2"
                                      >

                                        <span
                                          className="badge"
                                          style={getStatusStyle(
                                            h.status?.name
                                          )}
                                        >
                                          {h.status?.name ||
                                            "-"}
                                        </span>

                                        <span>
                                          Updated by{" "}
                                          <strong>
                                            {h.updatedBy ||
                                              "System"}
                                          </strong>
                                        </span>

                                        <span className="text-muted">
                                          {h.updatedAt
                                            ?.replace(
                                              "T",
                                              " "
                                            ) || ""}
                                        </span>

                                      </div>
                                    )
                                  )}

                                </div>
                              ) : (
                                <span className="text-muted">
                                  No status history available.
                                </span>
                              )}

                            </div>

                          </td>
                        </tr>
                      )}

                    </>
                  );
                })
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ManageAdmission;