import React, { useEffect, useState } from "react";
import {
  LuBox,
  LuEye,
  LuPencil,
  LuTrash2,
  LuSearch,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import axiosInstance from "../../../api/axiosInstance";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const images = import.meta.glob("../../../assets/icon/*", {
  eager: true,
  import: "default",
});

const imageMap = {};

Object.keys(images).forEach((path) => {
  const fileName = path.split("/").pop();
  imageMap[fileName] = images[path];
});
const ModuleList = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const navigate = useNavigate();

  // =====================================================
  // STATUS
  // =====================================================
  const isActive = (module) => {
    if (typeof module.status === "boolean") {
      return module.status;
    }

    if (typeof module.status === "string") {
      return module.status.toUpperCase() === "ACTIVE";
    }

    return true;
  };

  // =====================================================
  // FETCH MODULES
  // =====================================================
  const fetchModules = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/api/user-group-mapping/all");

      setModules(res.data || []);
    } catch (err) {
      console.log("Error fetching modules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  console.log("modules",modules);
  // =====================================================
  // FILTER
  // =====================================================
  const filteredModules = modules.filter((item) => {
    const module = item.module || {};

    const moduleName = module.moduleName || "";
    const moduleCode = module.moduleCode || module.code || "";

    const matchesSearch =
      moduleName.toLowerCase().includes(search.toLowerCase()) ||
      moduleCode.toLowerCase().includes(search.toLowerCase());

    const active = isActive(module);

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" && active) ||
      (statusFilter === "INACTIVE" && !active);

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredModules.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentModules = filteredModules.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  const handleView = (item) => {
    console.log("View module:", item);
  };

  const handleEdit = (module) => {
  const moduleId =
    module?.id || module?.moduleId;

  if (!moduleId) {
    alert("Module ID not found");
    return;
  }

  navigate(`/admin/modules/edit/${moduleId}`);
};

  const handleDelete = async (module) => {

  const moduleId =
    module?.id || module?.moduleId;

  if (!moduleId) {
    alert("Module ID not found");
    return;
  }

  const moduleName =
    module?.moduleName ||
    module?.name ||
    "this module";

  const confirmed = window.confirm(
    `Are you sure you want to delete "${moduleName}"?`
  );

  if (!confirmed) {
    return;
  }

  try {

    await axiosInstance.delete(
      `/api/module/delete/${moduleId}`
    );

    alert("Module Deleted Successfully");

    // Refresh list
    fetchModules();

  } catch (error) {

    console.error(
      "Delete module error:",
      error
    );

    console.error(
      "Backend:",
      error?.response?.data
    );

    alert(
      error?.response?.data ||
        "Unable to delete module"
    );
  }
};

  return (
    <>
      <div className="container-fluid px-2">
        <div
          className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
          style={{ minHeight: "70px" }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <h4 className="fw-bold mb-1">Module List</h4>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 small">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-decoration-none text-dark">
                      Dashboard
                    </a>
                  </li>

                  <li className="breadcrumb-item">Module Management</li>

                  <li className="breadcrumb-item active text-primary">
                    Module List
                  </li>
                </ol>
              </nav>
            </div>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft className="me-2" />
              Back to Module
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid  mt-4 mb-4">
        <div
          className="card border-0 shadow"
          style={{
            borderRadius: "8px",
          }}
        >
          <div
            className="card-header bg-white border-0"
            style={{
              padding: "16px 18px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              {/* TITLE */}
              <div className="d-flex align-items-center">
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "#f0eaff",
                  }}
                >
                  <LuBox
                    size={17}
                    style={{
                      color: "#6f2cff",
                    }}
                  />
                </span>

                <div>
                  <h6 className="mb-0 fw-bold">Module List</h6>

                  <small className="text-muted">Manage system modules</small>
                </div>
              </div>

              {/* SEARCH */}
              <div className="d-flex align-items-center gap-2 flex-wrap">
                {/* STATUS FILTER */}
                <select
                  className="form-select form-select-sm"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    width: "130px",
                    height: "36px",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  <option value="ALL">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>

                {/* SEARCH */}
                <div
                  className="position-relative"
                  style={{
                    width: "230px",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search module..."
                    value={search}
                    onChange={handleSearch}
                    style={{
                      paddingRight: "38px",
                      fontSize: "13px",
                      height: "36px",
                    }}
                  />

                  <LuSearch
                    size={17}
                    className="position-absolute text-muted"
                    style={{
                      right: "12px",
                      top: "9px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

         
          <div className="card-body p-0">
            <div className="table-responsive">
              <table
                className="table align-middle mb-0"
                style={{
                  minWidth: "850px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#fafbff",
                      borderTop: "1px solid #f0f0f0",
                      borderBottom: "1px solid #eeeeee",
                    }}
                  >
                    <th
                      className="text-center"
                      style={{
                        width: "6%",
                        fontSize: "12px",
                        color: "#555",
                        padding: "13px 10px",
                      }}
                    >
                      #
                    </th>

                    <th
                      style={{
                        width: "10%",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Icon
                    </th>

                    <th
                      style={{
                        width: "25%",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Module Name
                    </th>

                    <th
                      style={{
                        width: "18%",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Description
                    </th>

                     <th
                      style={{
                        width: "13%",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Path
                    </th>

                    <th
                      style={{
                        width: "13%",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Status
                    </th>

                    <th
                      style={{
                        width: "15%",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Created On
                    </th>

                    <th
                      className="text-center"
                      style={{
                        width: "13%",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="7" className="text-center py-5">
                        <div
                          className="spinner-border text-primary"
                          style={{
                            width: "25px",
                            height: "25px",
                          }}
                        />

                        <div
                          className="text-muted mt-2"
                          style={{
                            fontSize: "13px",
                          }}
                        >
                          Loading modules...
                        </div>
                      </td>
                    </tr>
                  )}

                  {!loading && currentModules.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-5">
                        <LuBox size={35} className="text-muted mb-2" />

                        <div className="fw-semibold">No modules found</div>

                        <small className="text-muted">
                          Try changing your search.
                        </small>
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    currentModules.map((item, index) => {
                      const module = item.module || {};

                      console.log("module baby",module);

                      const active = isActive(module);

                      return (
                        <tr
                          key={item.id || module.id || index}
                          style={{
                            borderBottom: "1px solid #f1f1f1",
                          }}
                        >
                          {/* # */}
                          <td className="text-center">
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#555",
                              }}
                            >
                              {startIndex + index + 1}
                            </span>
                          </td>

                          {/* ICON */}
                          <td>
                            <div
                              className="d-inline-flex align-items-center justify-content-center rounded-circle"
                              style={{
                                width: "38px",
                                height: "38px",
                                background: "#f1edff",
                                flexShrink: 0,
                              }}
                            >
                              {module.image && imageMap[module.image] ? (
                                <img
                                  src={imageMap[module.image]}
                                  alt={module.moduleName || "Module"}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <LuBox
                                  size={20}
                                  style={{
                                    color: "#6f2cff",
                                  }}
                                />
                              )}
                            </div>
                          </td>

                          {/* MODULE NAME */}
                          <td>
                            <span
                              className="fw-semibold"
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              {module.moduleName || "N/A"}
                            </span>
                          </td>

                          <td>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#555",
                              }}
                            >
                              {module?.description || "-"}
                            </span>
                          </td>

                          <td>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#555",
                              }}
                            >
                              {module?.path || "has menu"}
                            </span>
                          </td>

                          {/* STATUS */}
                          <td>
                            <span
                              className="px-2 py-1 rounded-2"
                              style={{
                                background: active ? "#dcfce7" : "#fee2e2",
                                color: active ? "#16a34a" : "#dc2626",
                                fontSize: "11px",
                                fontWeight: "600",
                              }}
                            >
                              {active ? "Active" : "Inactive"}
                            </span>
                          </td>

                          {/* CREATED */}
                          <td>
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#555",
                              }}
                            >
                              {formatDate(module.createdAt)}
                            </span>
                          </td>

                          {/* ACTION */}
                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              {/* VIEW */}
                              <button
                                type="button"
                                className="border-0 d-flex align-items-center justify-content-center"
                                title="View"
                                onClick={() => handleView(item)}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "6px",
                                  background: "#f1edff",
                                  color: "#6f2cff",
                                }}
                              >
                                <LuEye size={15} />
                              </button>

                              {/* EDIT */}
                             <button
  type="button"
  className="border-0 d-flex align-items-center justify-content-center"
  title="Edit"
  onClick={() => handleEdit(module)}
  style={{
    width: "29px",
    height: "29px",
    borderRadius: "6px",
    background: "#eaf3ff",
    color: "#2878e8",
  }}
>
  <LuPencil size={14} />
</button>

                              {/* DELETE */}
                             <button
  type="button"
  className="border-0 d-flex align-items-center justify-content-center"
  title="Delete"
  onClick={() => handleDelete(module)}
  style={{
    width: "29px",
    height: "29px",
    borderRadius: "6px",
    background: "#fff0f0",
    color: "#ef4444",
  }}
>
  <LuTrash2 size={14} />
</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {/* =================================================
              FOOTER / PAGINATION
          ================================================= */}
          {!loading && filteredModules.length > 0 && (
            <div
              className="card-footer bg-white border-0"
              style={{
                padding: "12px 18px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                {/* SHOWING */}
                <div
                  className="text-muted"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Showing <strong>{startIndex + 1}</strong> to{" "}
                  <strong>
                    {Math.min(
                      startIndex + itemsPerPage,
                      filteredModules.length,
                    )}
                  </strong>{" "}
                  of <strong>{filteredModules.length}</strong> entries
                </div>

                <div className="d-flex align-items-center gap-2">
                  {/* PREVIOUS */}
                  <button
                    type="button"
                    className="btn btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => goToPage(currentPage - 1)}
                    style={{
                      width: "30px",
                      height: "30px",
                      padding: 0,
                      border: "1px solid #e4e4e4",
                    }}
                  >
                    <LuChevronLeft size={15} />
                  </button>

                  {/* PAGES */}
                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, index) => (
                      <button
                        key={index}
                        type="button"
                        className="btn btn-sm"
                        onClick={() => goToPage(index + 1)}
                        style={{
                          width: "30px",
                          height: "30px",
                          padding: 0,
                          border: "1px solid #e4e4e4",
                          background:
                            currentPage === index + 1 ? "#6f2cff" : "white",
                          color: currentPage === index + 1 ? "white" : "#555",
                        }}
                      >
                        {index + 1}
                      </button>
                    ),
                  )}

                  {/* NEXT */}
                  <button
                    type="button"
                    className="btn btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => goToPage(currentPage + 1)}
                    style={{
                      width: "30px",
                      height: "30px",
                      padding: 0,
                      border: "1px solid #e4e4e4",
                    }}
                  >
                    <LuChevronRight size={15} />
                  </button>

                  {/* PER PAGE */}
                  <select
                    className="form-select form-select-sm"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    style={{
                      width: "90px",
                      fontSize: "12px",
                    }}
                  >
                    <option value={5}>5 / page</option>

                    <option value={10}>10 / page</option>

                    <option value={20}>20 / page</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModuleList;
