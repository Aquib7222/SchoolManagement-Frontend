
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
  FaUserGraduate,
} from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";

const AdmissionList = () => {
  const [admissionList, setAdmissionList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const PRIMARY = "#2563eb";

  
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

        const enrolled = (res.data || []).filter(
          (item) =>
            item.status?.toUpperCase() === "ENROLLED"
        );

        setAdmissionList(enrolled);
      })
      .catch((error) => {
        console.error("Admission fetch error:", error);
      })
      .finally(() => setLoading(false));
  }, [user?.schoolId, token]);


  const filteredData = admissionList.filter((adm) => {
    const searchValue = search.toLowerCase().trim();

    const fullName = `${adm.firstName || ""} ${
      adm.middleName || ""
    } ${adm.lastName || ""}`.toLowerCase();

    return (
      fullName.includes(searchValue) ||
      adm.admissionNumber
        ?.toLowerCase()
        .includes(searchValue) ||
      adm.studentClass
        ?.toLowerCase()
        .includes(searchValue) ||
      adm.fatherMobile
        ?.toLowerCase()
        .includes(searchValue)
    );
  });

  /* ================= RESET PAGE ================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(
    filteredData.length / recordsPerPage
  );

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = filteredData.slice(
    firstIndex,
    lastIndex
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  /* ================= EXCEL ================= */
  const exportExcel = () => {
    if (filteredData.length === 0) {
      alert("No admission records available to export.");
      return;
    }

    const exportData = filteredData.map((adm, index) => ({
      "S.No": index + 1,
      Name: `${adm.firstName || ""} ${
        adm.middleName || ""
      } ${adm.lastName || ""}`.trim(),
      "Admission No": adm.admissionNumber || "-",
      Class: adm.studentClass || "-",
      Session: adm.academicYear || "-",
      "Father Name": adm.fatherName || "-",
      "Mother Name": adm.motherName || "-",
      Mobile: adm.fatherMobile || "-",
      "Applied Date": adm.today || "-",
      Status: adm.status || "-",
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Admissions"
    );

    XLSX.writeFile(
      workbook,
      "Admission_List.xlsx"
    );
  };

  /* ================= PDF ================= */
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
      `Total Enrolled Admissions: ${filteredData.length}`,
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
        `${adm.firstName || ""} ${
          adm.middleName || ""
        } ${adm.lastName || ""}`.trim(),
        adm.admissionNumber || "-",
        adm.studentClass || "-",
        adm.academicYear || "-",
        adm.fatherMobile || "-",
        adm.status || "ENROLLED",
      ]),

      styles: {
        fontSize: 8,
        cellPadding: 3,
      },

      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
        fontStyle: "bold",
      },

      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
    });

    doc.save("Admission_List.pdf");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        // backgroundColor: "#f8fafc",
        paddingBottom: "30px",
      }}
    >
    
      <div className="mx-2 mt-2 mb-3">
        <div
          className="rounded-4 shadow overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
            border: "1px solid #dbeafe",
          }}
        >
          <div className="p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              {/* LEFT */}
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "52px",
                    height: "52px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaUserGraduate size={26} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Admission List
                  </h5>

                  <div className="text-muted small">
                    Admissions &nbsp;/&nbsp; Admission List
                  </div>
                </div>
              </div>

              {/* RIGHT BADGE */}
              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Admissions
                </span>
              </div>
            </div>
          </div>

          {/* BREADCRUMB */}
          <div
            className="px-4 py-2"
            style={{
              backgroundColor: "rgba(239,246,255,.75)",
              borderTop: "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp; Admissions &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Admission List
              </span>
            </small>
          </div>
        </div>
      </div>

      <div className="mx-2">
        <div
          className="bg-white rounded-4 shadow overflow-hidden"
          style={{
            border: "1px solid #e5e7eb",
          }}
        >
          {/* CARD HEADER */}
          <div
            className="p-3 p-md-4"
            style={{
              borderBottom: "1px solid #eef2f7",
            }}
          >
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div>
                <h5
                  className="mb-1 fw-bold"
                  style={{
                    color: "#1e3a8a",
                  }}
                >
                  Enrolled Admissions
                </h5>

                <small className="text-muted">
                  View and manage all enrolled student
                  admissions.
                </small>
              </div>

              <div
                className="px-3 py-2 rounded-pill"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Total: {filteredData.length}
              </div>
            </div>
          </div>

          {/* =================================================
              SEARCH / EXPORT
          ================================================= */}
          <div className="p-3 p-md-4">
            <div
              className="p-3 rounded-3"
              style={{
                backgroundColor: "#f8fbff",
                border: "1px solid #e0ecff",
              }}
            >
              <div className="row align-items-center g-3">
                {/* SEARCH */}
                <div className="col-lg-7 col-md-7">
                  <div className="position-relative">
                    <FaSearch
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        color: "#64748b",
                        zIndex: 2,
                      }}
                    />

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Name / Admission No / Class / Mobile"
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      style={{
                        height: "43px",
                        paddingLeft: "40px",
                        borderRadius: "8px",
                        border:
                          "1px solid #dbeafe",
                        boxShadow: "none",
                        fontSize: "13px",
                      }}
                    />
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="col-lg-5 col-md-5">
                  <div className="d-flex justify-content-md-end gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={exportExcel}
                      className="btn text-white"
                      style={{
                        backgroundColor: "#198754",
                        borderRadius: "7px",
                        fontSize: "13px",
                        padding:
                          "9px 15px",
                        fontWeight: "500",
                      }}
                    >
                      <FaFileExcel className="me-2" />
                      Excel
                    </button>

                    <button
                      type="button"
                      onClick={exportPDF}
                      className="btn text-white"
                      style={{
                        backgroundColor: "#dc3545",
                        borderRadius: "7px",
                        fontSize: "13px",
                        padding:
                          "9px 15px",
                        fontWeight: "500",
                      }}
                    >
                      <FaFilePdf className="me-2" />
                      PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                TABLE
            ================================================= */}
            <div className="table-responsive mt-4">
              <table
                className="table align-middle mb-0"
                style={{
                  minWidth: "1000px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background:
                        "linear-gradient(135deg,#1e3a8a,#2563eb)",
                      color: "#fff",
                    }}
                  >
                    <th
                      className="text-center"
                      style={{
                        fontSize: "12px",
                        padding: "13px 12px",
                      }}
                    >
                      S.No
                    </th>

                    <th
                      style={{
                        fontSize: "12px",
                        padding: "13px 12px",
                      }}
                    >
                      Student
                    </th>

                    <th
                      style={{
                        fontSize: "12px",
                        padding: "13px 12px",
                      }}
                    >
                      Admission No
                    </th>

                    <th
                      style={{
                        fontSize: "12px",
                        padding: "13px 12px",
                      }}
                    >
                      Class
                    </th>

                    <th
                      style={{
                        fontSize: "12px",
                        padding: "13px 12px",
                      }}
                    >
                      Session
                    </th>

                    <th
                      style={{
                        fontSize: "12px",
                        padding: "13px 12px",
                      }}
                    >
                      Father Name
                    </th>

                    <th
                      style={{
                        fontSize: "12px",
                        padding: "13px 12px",
                      }}
                    >
                      Mobile
                    </th>

                    <th
                      style={{
                        fontSize: "12px",
                        padding: "13px 12px",
                      }}
                    >
                      Applied Date
                    </th>

                    <th
                      className="text-center"
                      style={{
                        fontSize: "12px",
                        padding: "13px 12px",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* LOADING */}
                  {loading ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="text-center"
                        style={{
                          padding: "55px 10px",
                        }}
                      >
                        <div
                          className="spinner-border"
                          style={{
                            color: PRIMARY,
                            width: "30px",
                            height: "30px",
                          }}
                        />

                        <div className="mt-3 text-muted small">
                          Loading admissions...
                        </div>
                      </td>
                    </tr>
                  ) : records.length > 0 ? (
                    records.map((adm, index) => (
                      <tr
                        key={adm.id}
                        style={{
                          borderBottom:
                            "1px solid #edf2f7",
                        }}
                      >
                        {/* S.NO */}
                        <td className="text-center">
                          <span
                            className="d-inline-flex align-items-center justify-content-center rounded-circle"
                            style={{
                              width: "28px",
                              height: "28px",
                              backgroundColor:
                                "#eff6ff",
                              color: "#2563eb",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            {firstIndex +
                              index +
                              1}
                          </span>
                        </td>

                        {/* STUDENT */}
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle"
                              style={{
                                width: "38px",
                                height: "38px",
                                background:
                                  "linear-gradient(135deg,#dbeafe,#bfdbfe)",
                                color:
                                  "#2563eb",
                                flexShrink: 0,
                              }}
                            >
                              <FaUserGraduate
                                size={15}
                              />
                            </div>

                            <div>
                              <div
                                style={{
                                  color:
                                    "#1e293b",
                                  fontWeight:
                                    "600",
                                  fontSize:
                                    "13px",
                                }}
                              >
                                {[
                                  adm.firstName,
                                  adm.middleName,
                                  adm.lastName,
                                ]
                                  .filter(
                                    Boolean
                                  )
                                  .join(
                                    " "
                                  ) ||
                                  "-"}
                              </div>

                              <small
                                style={{
                                  color:
                                    "#94a3b8",
                                  fontSize:
                                    "11px",
                                }}
                              >
                                Student
                              </small>
                            </div>
                          </div>
                        </td>

                        {/* ADMISSION NUMBER */}
                        <td>
                          <span
                            style={{
                              backgroundColor:
                                "#eff6ff",
                              color:
                                "#2563eb",
                              border:
                                "1px solid #bfdbfe",
                              padding:
                                "5px 9px",
                              borderRadius:
                                "6px",
                              fontSize:
                                "12px",
                              fontWeight:
                                "600",
                            }}
                          >
                            {adm.admissionNumber ||
                              "-"}
                          </span>
                        </td>

                        {/* CLASS */}
                        <td
                          style={{
                            fontSize:
                              "13px",
                            color:
                              "#334155",
                            fontWeight:
                              "500",
                          }}
                        >
                          {adm.studentClass ||
                            "-"}
                        </td>

                        {/* SESSION */}
                        <td
                          style={{
                            fontSize:
                              "12px",
                            color:
                              "#64748b",
                          }}
                        >
                          {adm.academicYear ||
                            "-"}
                        </td>

                        {/* FATHER */}
                        <td
                          style={{
                            fontSize:
                              "13px",
                            color:
                              "#334155",
                          }}
                        >
                          {adm.fatherName ||
                            "-"}
                        </td>

                        {/* MOBILE */}
                        <td
                          style={{
                            fontSize:
                              "12px",
                            color:
                              "#475569",
                          }}
                        >
                          {adm.fatherMobile ||
                            "-"}
                        </td>

                        {/* DATE */}
                        <td
                          style={{
                            fontSize:
                              "12px",
                            color:
                              "#64748b",
                          }}
                        >
                          {adm.today || "-"}
                        </td>

                        {/* STATUS */}
                        <td className="text-center">
                          <span
                            className="badge rounded-pill px-3 py-2"
                            style={{
                              backgroundColor:
                                "#dcfce7",
                              color:
                                "#15803d",
                              border:
                                "1px solid #bbf7d0",
                              fontSize:
                                "11px",
                            }}
                          >
                            {adm.status ||
                              "ENROLLED"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="text-center"
                        style={{
                          padding: "60px 10px",
                        }}
                      >
                        <div
                          className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                          style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor:
                              "#eff6ff",
                            color:
                              "#2563eb",
                          }}
                        >
                          <FaUserGraduate
                            size={25}
                          />
                        </div>

                        <h6 className="fw-semibold text-dark">
                          No records found
                        </h6>

                        <small className="text-muted">
                          No enrolled admission
                          matches your search.
                        </small>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* =================================================
                PAGINATION
            ================================================= */}
            {!loading &&
              filteredData.length > 0 && (
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-3 pt-3 border-top">
                  <small className="text-muted">
                    Showing{" "}
                    <strong>
                      {firstIndex + 1}
                    </strong>{" "}
                    to{" "}
                    <strong>
                      {Math.min(
                        lastIndex,
                        filteredData.length
                      )}
                    </strong>{" "}
                    of{" "}
                    <strong>
                      {filteredData.length}
                    </strong>{" "}
                    records
                  </small>

                  {totalPages > 1 && (
                    <nav>
                      <ul className="pagination mb-0">
                        {/* PREVIOUS */}
                        <li
                          className={`page-item ${
                            currentPage === 1
                              ? "disabled"
                              : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              goToPage(
                                currentPage - 1
                              )
                            }
                            style={{
                              color:
                                currentPage ===
                                1
                                  ? "#cbd5e1"
                                  : PRIMARY,
                              border:
                                "1px solid #dbeafe",
                              borderRadius:
                                "7px",
                              marginRight:
                                "4px",
                            }}
                          >
                            <FaChevronLeft
                              size={10}
                            />
                          </button>
                        </li>

                        {/* NUMBERS */}
                        {[...Array(totalPages)].map(
                          (_, i) => {
                            const page = i + 1;

                            return (
                              <li
                                key={page}
                                className={`page-item ${
                                  currentPage ===
                                  page
                                    ? "active"
                                    : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    goToPage(
                                      page
                                    )
                                  }
                                  style={
                                    currentPage ===
                                    page
                                      ? {
                                          background:
                                            "linear-gradient(135deg,#2563eb,#3b82f6)",
                                          borderColor:
                                            "#2563eb",
                                          color:
                                            "#fff",
                                          borderRadius:
                                            "7px",
                                          marginRight:
                                            "4px",
                                          fontSize:
                                            "12px",
                                        }
                                      : {
                                          color:
                                            PRIMARY,
                                          border:
                                            "1px solid #dbeafe",
                                          borderRadius:
                                            "7px",
                                          marginRight:
                                            "4px",
                                          fontSize:
                                            "12px",
                                        }
                                  }
                                >
                                  {page}
                                </button>
                              </li>
                            );
                          }
                        )}

                        {/* NEXT */}
                        <li
                          className={`page-item ${
                            currentPage ===
                            totalPages
                              ? "disabled"
                              : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              goToPage(
                                currentPage + 1
                              )
                            }
                            style={{
                              color:
                                currentPage ===
                                totalPages
                                  ? "#cbd5e1"
                                  : PRIMARY,
                              border:
                                "1px solid #dbeafe",
                              borderRadius:
                                "7px",
                              fontSize:
                                "12px",
                            }}
                          >
                            <FaChevronRight
                              size={10}
                            />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionList;

