

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaEye, FaUserEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "../../api/axiosInstance";

const ManageAdmission = () => {
  const [admissions, setAdmissions] = useState([]);
  const [openHistoryId, setOpenHistoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  /* ================= FETCH ADMISSIONS ================= */
  useEffect(() => {
    if (!user?.schoolId) return;

    axios
      .get(
        `/api/admissions/school?schoolId=${user.schoolId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => setAdmissions(res.data))
      .catch(console.error);
  }, [user?.schoolId]);

  console.log("admission", admissions);

  /* ================= FILTER LOGIC ================= */
  const filteredAdmissions = admissions.filter((a) => {
    const fullName = `${a.firstName || ""} ${a.lastName || ""}`.toLowerCase();
    const nameMatch = fullName.includes(searchTerm.toLowerCase());

    const statusMatch =
      filterStatus === "all" || (a.status || "APPLIED") === filterStatus;

    return nameMatch && statusMatch;
  });

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    await axios.put(
      `/api/admissions/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const res = await axios.get(
      `/api/admissions/school?schoolId=${user.schoolId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setAdmissions(res.data);
  };
   const handleEdit = (id) =>
    navigate(`/admission/edit/${id}`);

  return (
    <div>
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
          <strong>Manage Admission</strong>
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
                Manage Admission
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="mt-3 ms-2 me-2 bg-white rounded p-3 shadow table-responsive">
        {/* ================= SEARCH & FILTER ================= */}
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="search"
              className="form-control"
              placeholder="Search Student By Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-2 mt-2 mt-md-0">
            <select
              className="form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="APPLIED">Applied</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="ENROLLED">Enrolled</option>
              <option value="FEE_PAID">Fee Paid</option>
            </select>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <table className="table table-bordered table-hover">
          <thead className="table-warning">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Admission No</th>
              <th>Class</th>
              <th>Session</th>
              <th>Father Name</th>
              <th>Mother Name</th>
              <th>Mobile No</th>
              <th>Applied Date</th>
              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAdmissions.map((a, i) => (
              <>
                <tr key={a.id}>
                  <td>{i + 1}</td>

                  <td>
                    {[a.firstName, a.lastName].filter(Boolean).join(" ") || "-"}
                  </td>

                  <td>{a.admissionNumber || "-"}</td>
                  <td>{a.studentClass || "-"}</td>
                  <td>{a.academicYear || "-"}</td>
                  <td>{a.fatherName || "-"}</td>
                  <td>{a.motherName || "-"}</td>
                  <td>{a.fatherMobile || "-"}</td>
                  <td>{a.today || "-"}</td>

                  {/* ================= STATUS DROPDOWN ================= */}
                  <td>
                    <td>
                      <select
                        className=" form-select-sm"
                        value={(a.status || "APPLIED").toUpperCase()}
                        disabled={["APPROVED", "ENROLLED", "FEE_PAID"].includes(
                          (a.status || "").toUpperCase(),
                        )}
                        style={{
                          backgroundColor:
                            (a.status || "APPLIED") === "APPLIED"
                              ? "#0d6efd" // primary
                              : a.status === "APPROVED"
                                ? "#198754" // success
                                : a.status === "ENROLLED"
                                  ? "#0dcaf0" // info
                                  : a.status === "FEE_PAID"
                                    ? "#212529" // dark
                                    : "#dc3545", // danger
                          color: "white",
                          cursor: ["APPROVED", "ENROLLED", "FEE_PAID"].includes(
                            (a.status || "").toUpperCase(),
                          )
                            ? "not-allowed"
                            : "pointer",
                        }}
                        onChange={(e) =>
                          updateStatus(a.id, e.target.value.toUpperCase())
                        }
                      >
                        <option value="APPLIED">Applied</option>
                        <option value="APPROVED">Approved</option>
                        <option value="ENROLLED">Enrolled</option>
                        <option value="FEE_PAID">Fee Paid</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                    </td>
                  </td>

                  {/* ================= HISTORY ================= */}
                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-success"
                      onClick={() => handleEdit(a.id)}
                    >
                      <FaUserEdit />
                    </button>
                    <button className="btn btn-danger">
                      <RiDeleteBin6Fill />
                    </button>
                    <button className="btn btn-primary">
                      <FaEye />
                    </button>
                  </td>
                </tr>

                {openHistoryId === a.id && (
                  <tr>
                    <td colSpan="13">
                      <strong>Status History</strong>
                      <ul className="mt-2">
                        {a.statusHistory?.map((h, idx) => (
                          <li key={idx}>
                            <b>{h.status?.name}</b> — {h.updatedBy} (
                            {h.updatedAt?.replace("T", " ")})
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAdmission;
