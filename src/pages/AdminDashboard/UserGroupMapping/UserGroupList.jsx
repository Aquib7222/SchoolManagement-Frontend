import React, { useEffect, useMemo, useState } from "react";
import {
  LuSearch,
  LuRefreshCw,
  LuUsers,
  LuCircleCheck,
  LuCircleX,
  LuLayers3,
  LuChevronLeft,
  LuChevronRight,
  LuPencil,
  LuTrash2,
  LuEye,
} from "react-icons/lu";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const UserGroupList = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

 

  const [groups, setGroups] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [page, setPage] = useState(1);
  const groupsPerPage = 10;

  // =====================================================
  // FETCH USER GROUPS
  // =====================================================

  const fetchGroups = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/api/user-group/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User Group Response:", res.data);

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data ||
          res.data?.content ||
          [];

      setGroups(data);
    } catch (error) {
      console.error(
        "User Group Load Error:",
        error
      );

      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchGroups();
  }, []);

  // =====================================================
  // STATUS CHECK
  // =====================================================

  const isActive = (status) => {
    if (!status) return false;

    const value = String(status).toUpperCase();

    return (
      value === "ACTIVE" ||
      value === "TRUE" ||
      value === "ENABLED"
    );
  };

  // =====================================================
  // SUMMARY COUNTS
  // =====================================================

  const totalGroups = groups.length;

  const activeGroups = useMemo(() => {
    return groups.filter((group) =>
      isActive(group?.status)
    ).length;
  }, [groups]);

  const inactiveGroups = useMemo(() => {
    return groups.filter(
      (group) => !isActive(group?.status)
    ).length;
  }, [groups]);

  const uniqueCodes = useMemo(() => {
    return new Set(
      groups
        .map((group) => group?.groupCode)
        .filter(Boolean)
    ).size;
  }, [groups]);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredGroups = useMemo(() => {
    const value = search
      .toLowerCase()
      .trim();

    return groups.filter((group) => {
      const groupName =
        group?.groupName || "";

      const groupCode =
        group?.groupCode || "";

      const status =
        group?.status || "";

      const matchesSearch =
        !value ||
        groupName
          .toLowerCase()
          .includes(value) ||
        groupCode
          .toLowerCase()
          .includes(value) ||
        status
          .toLowerCase()
          .includes(value);

      const matchesStatus =
        !statusFilter ||
        String(status).toUpperCase() ===
          String(statusFilter).toUpperCase();

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    groups,
    search,
    statusFilter,
  ]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    filteredGroups.length /
      groupsPerPage
  );

  const currentPageGroups =
    filteredGroups.slice(
      (page - 1) * groupsPerPage,
      page * groupsPerPage
    );

  useEffect(() => {
    if (
      totalPages > 0 &&
      page > totalPages
    ) {
      setPage(totalPages);
    }

    if (
      totalPages === 0 &&
      page !== 1
    ) {
      setPage(1);
    }
  }, [totalPages, page]);

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user group?")) {
    return;
  }

  try {
    await axiosInstance.delete(
      `/api/user-group/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("User Group deleted successfully");

    fetchGroups();

  } catch (error) {
    console.error("Delete Error:", error);

    alert(
      error?.response?.data?.message ||
      "Unable to delete user group"
    );
  }
};

  // =====================================================
  // RESET FILTER
  // =====================================================

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPage(1);
  };

 

  const StatusBadge = ({ status }) => {
    const active = isActive(status);

    return active ? (
      <span
        className="px-2 py-1 rounded-2 d-inline-flex align-items-center"
        style={{
          background: "#dcfce7",
          color: "#16a34a",
          fontSize: "10px",
          fontWeight: "600",
        }}
      >
        <LuCircleCheck
          size={13}
          className="me-1"
        />
        Active
      </span>
    ) : (
      <span
        className="px-2 py-1 rounded-2 d-inline-flex align-items-center"
        style={{
          background: "#fee2e2",
          color: "#dc2626",
          fontSize: "10px",
          fontWeight: "600",
        }}
      >
        <LuCircleX
          size={13}
          className="me-1"
        />
        Inactive
      </span>
    );
  };



  const SummaryCard = ({
    title,
    value,
    icon,
    background,
    color,
  }) => {
    return (
      <div className="col-xl-3 col-md-6">
        <div
          className="card shadow border-0 rounded-3 h-100"
          style={{
            minHeight: "105px",
          }}
        >
          <div className="card-body d-flex align-items-center">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 me-3"
              style={{
                width: "48px",
                height: "48px",
                background,
                color,
                flexShrink: 0,
              }}
            >
              {icon}
            </div>

            <div>
              <div
                className="text-muted mb-1"
                style={{
                  fontSize: "11px",
                  fontWeight: "500",
                }}
              >
                {title}
              </div>

              <h4
                className="fw-bold mb-0"
                style={{
                  fontSize: "23px",
                }}
              >
                {value}
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  };

  

  return (
    <>
      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div className="container-fluid px-2">
        <div
          className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
          style={{
            minHeight: "70px",
          }}
        >
          <h4 className="fw-bold mb-1">
            User Group List
          </h4>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <a
                  href="/"
                  className="text-decoration-none text-dark"
                >
                  Dashboard
                </a>
              </li>

              <li className="breadcrumb-item">
                User Management
              </li>

              <li className="breadcrumb-item active text-primary">
                User Group List
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ================================================= */}
      {/* SUMMARY CARDS */}
      {/* ================================================= */}

      <div className="container-fluid px-2">
        <div className="row g-3 mb-3">
          <SummaryCard
            title="Total User Groups"
            value={totalGroups}
            icon={<LuUsers size={23} />}
            background="#f1edff"
            color="#6f2cff"
          />

          <SummaryCard
            title="Active Groups"
            value={activeGroups}
            icon={
              <LuCircleCheck size={23} />
            }
            background="#dcfce7"
            color="#16a34a"
          />

          <SummaryCard
            title="Inactive Groups"
            value={inactiveGroups}
            icon={
              <LuCircleX size={23} />
            }
            background="#fee2e2"
            color="#dc2626"
          />

          <SummaryCard
            title="Unique Group Codes"
            value={uniqueCodes}
            icon={
              <LuLayers3 size={23} />
            }
            background="#eaf4ff"
            color="#2563eb"
          />
        </div>
      </div>

      {/* ================================================= */}
      {/* SEARCH / FILTER */}
      {/* ================================================= */}

      <div className="container-fluid px-2">
        <div className="card shadow border-0 rounded-3">
          <div className="card-header bg-white">
            <h6 className="fw-bold mb-0">
              Search User Groups
            </h6>
          </div>

          <div className="card-body">
            <div className="row g-3">
              {/* SEARCH */}

              <div className="col-lg-5 col-md-6">
                <label className="form-label">
                  <h6>Search</h6>
                </label>

                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search group name or code..."
                    value={search}
                    onChange={(e) => {
                      setSearch(
                        e.target.value
                      );
                      setPage(1);
                    }}
                    style={{
                      paddingRight: "40px",
                    }}
                  />

                  <LuSearch
                    size={17}
                    className="position-absolute text-muted"
                    style={{
                      right: "12px",
                      top: "11px",
                    }}
                  />
                </div>
              </div>

              {/* STATUS */}

              <div className="col-lg-3 col-md-6">
                <label className="form-label">
                  <h6>Status</h6>
                </label>

                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(
                      e.target.value
                    );
                    setPage(1);
                  }}
                >
                  <option value="">
                    All Status
                  </option>

                  <option value="ACTIVE">
                    Active
                  </option>

                  <option value="INACTIVE">
                    Inactive
                  </option>
                </select>
              </div>

              {/* RESET */}

              <div className="col-lg-2 col-md-6 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>

              {/* REFRESH */}

              <div className="col-lg-2 col-md-6 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={fetchGroups}
                  disabled={loading}
                >
                  <LuRefreshCw
                    size={16}
                    className="me-1"
                  />

                  {loading
                    ? "Loading..."
                    : "Refresh"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* LIST */}
      {/* ================================================= */}

      <div className="container-fluid px-2">
        <div className="card shadow border-0 rounded-3 mt-3">
          {/* HEADER */}

          <div className="card-header bg-white border-0 p-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div className="d-flex align-items-center">
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
                  style={{
                    width: "34px",
                    height: "34px",
                    background: "#f0eaff",
                  }}
                >
                  <LuUsers
                    size={18}
                    style={{
                      color: "#6f2cff",
                    }}
                  />
                </span>

                <div>
                  <h6 className="mb-0 fw-bold">
                    User Groups
                  </h6>

                  <small className="text-muted">
                    Manage system user groups
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* TABLE */}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table
                className="table align-middle mb-0"
                style={{
                  minWidth: "800px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#fafbff",
                      borderTop:
                        "1px solid #f0f0f0",
                      borderBottom:
                        "1px solid #eeeeee",
                    }}
                  >
                    <th
                      className="text-center"
                      style={{
                        width: "7%",
                        fontSize: "12px",
                        color: "#555",
                        padding:
                          "13px 10px",
                      }}
                    >
                      #
                    </th>

                    <th
                      style={{
                        width: "30%",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Group Name
                    </th>

                    <th
                      style={{
                        width: "22%",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Group Code
                    </th>

                    <th
                      style={{
                        width: "20%",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Status
                    </th>

                    <th
                      className="text-center"
                      style={{
                        width: "21%",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* LOADING */}

                  {loading && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-5"
                      >
                        <div
                          className="spinner-border text-primary"
                          style={{
                            width: "25px",
                            height: "25px",
                          }}
                        />

                        <div className="text-muted mt-2">
                          Loading user groups...
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* EMPTY */}

                  {!loading &&
                    currentPageGroups.length ===
                      0 && (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-5"
                        >
                          <LuUsers
                            size={38}
                            className="text-muted mb-2"
                          />

                          <div className="fw-semibold">
                            No user groups found
                          </div>

                          <small className="text-muted">
                            Try changing your search
                            or filter.
                          </small>
                        </td>
                      </tr>
                    )}

                  {/* DATA */}

                  {!loading &&
                    currentPageGroups.map(
                      (group, index) => (
                        <tr
                          key={
                            group?.id ||
                            index
                          }
                          style={{
                            borderBottom:
                              "1px solid #f3f3f3",
                          }}
                        >
                          {/* NUMBER */}

                          <td className="text-center">
                            <span
                              style={{
                                fontSize:
                                  "11px",
                                fontWeight:
                                  "600",
                                color:
                                  "#666",
                              }}
                            >
                              {(page - 1) *
                                groupsPerPage +
                                index +
                                1}
                            </span>
                          </td>

                          {/* GROUP NAME */}

                          <td>
                            <div className="d-flex align-items-center">
                              <span
                                className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
                                style={{
                                  width: "36px",
                                  height: "36px",
                                  background:
                                    "#f1edff",
                                  color:
                                    "#6f2cff",
                                }}
                              >
                                <LuUsers
                                  size={17}
                                />
                              </span>

                              <div>
                                <div
                                  className="fw-semibold"
                                  style={{
                                    fontSize:
                                      "12px",
                                  }}
                                >
                                  {group?.groupName ||
                                    "-"}
                                </div>

                                <small
                                  className="text-muted"
                                  style={{
                                    fontSize:
                                      "9px",
                                  }}
                                >
                                  Group ID:{" "}
                                  {group?.id ??
                                    "-"}
                                </small>
                              </div>
                            </div>
                          </td>

                          {/* CODE */}

                          <td>
                            <span
                              className="px-2 py-1 rounded-2"
                              style={{
                                background:
                                  "#eef5ff",
                                color:
                                  "#2563eb",
                                fontSize:
                                  "10px",
                                fontWeight:
                                  "600",
                              }}
                            >
                              {group?.groupCode ||
                                "-"}
                            </span>
                          </td>

                          {/* STATUS */}

                          <td>
                            <StatusBadge
                              status={
                                group?.status
                              }
                            />
                          </td>

                          {/* ACTION */}

                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              {/* VIEW */}

                              <button
                                type="button"
                                className="btn btn-sm btn-light"
                                title="View"
                                onClick={() =>
                                  console.log(
                                    "View Group:",
                                    group
                                  )
                                }
                              >
                                <LuEye
                                  size={15}
                                  style={{
                                    color:
                                      "#2563eb",
                                  }}
                                />
                              </button>

                              {/* EDIT */}

                             <button
  type="button"
  className="btn btn-sm btn-outline-primary"
  onClick={() =>
    navigate("/admin/user-group/create", {
      state: {
        groupId: group.id,
      },
    })
  }
>
                                <LuPencil
                                  size={15}
                                  style={{
                                    color:
                                      "#6f2cff",
                                  }}
                                />
                              </button>

                              {/* DELETE */}

                              <button
                                type="button"
                                className="btn btn-sm btn-light"
                                title="Delete"
                                onClick={() =>
                                  handleDelete(group.id)
                                }
                              >
                                <LuTrash2
                                  size={15}
                                  style={{
                                    color:
                                      "#dc2626",
                                  }}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          {!loading && (
            <div className="card-footer bg-white border-0">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <small className="text-muted">
                  Showing{" "}
                  <strong>
                    {currentPageGroups.length}
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {filteredGroups.length}
                  </strong>{" "}
                  groups
                </small>

                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    disabled={page === 1}
                    onClick={() =>
                      setPage((prev) =>
                        Math.max(
                          1,
                          prev - 1
                        )
                      )
                    }
                  >
                    <LuChevronLeft
                      size={16}
                    />
                  </button>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                  >
                    Page{" "}
                    {totalPages === 0
                      ? 0
                      : page}{" "}
                    of {totalPages}
                  </span>

                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    disabled={
                      page >= totalPages ||
                      totalPages === 0
                    }
                    onClick={() =>
                      setPage((prev) =>
                        Math.min(
                          totalPages,
                          prev + 1
                        )
                      )
                    }
                  >
                    <LuChevronRight
                      size={16}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserGroupList;