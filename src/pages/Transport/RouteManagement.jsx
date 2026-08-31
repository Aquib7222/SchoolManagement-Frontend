
import React, { useMemo, useState } from "react";
import {
  LuRoute,
  LuPlus,
  LuSearch,
  LuPencil,
  LuTrash2,
  LuEye,
  LuCircleCheck,
  LuCircleX,
  LuMapPin,
  LuMapPinned,
  LuX,
  LuBus,
} from "react-icons/lu";

const RouteManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editRoute, setEditRoute] = useState(null);
  const [viewRoute, setViewRoute] = useState(null);

  const [routes, setRoutes] = useState([
    {
      id: 1,
      routeName: "Route 01",
      startLocation: "Muzaffarpur",
      endLocation: "School Campus",
      stops: [
        "Brahampura",
        "Company Bagh",
        "Mithanpura",
        "Ramdayalu",
      ],
      status: "ACTIVE",
    },
    {
      id: 2,
      routeName: "Route 02",
      startLocation: "Kanti",
      endLocation: "School Campus",
      stops: [
        "Kanti Chowk",
        "Madhopur",
        "Bakhri",
        "Ahiyapur",
      ],
      status: "ACTIVE",
    },
    {
      id: 3,
      routeName: "Route 03",
      startLocation: "Motipur",
      endLocation: "School Campus",
      stops: [
        "Motipur Chowk",
        "Paharpur",
        "Sarafuddinpur",
      ],
      status: "INACTIVE",
    },
    {
      id: 4,
      routeName: "Route 04",
      startLocation: "Mushahari",
      endLocation: "School Campus",
      stops: [
        "Mushahari",
        "Zero Mile",
        "Akharaghat",
      ],
      status: "ACTIVE",
    },
  ]);

  const emptyForm = {
    routeName: "",
    startLocation: "",
    endLocation: "",
    stops: "",
    status: "ACTIVE",
  };

  const [formData, setFormData] = useState(emptyForm);

  // ================= FILTER =================

  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        route.routeName.toLowerCase().includes(searchText) ||
        route.startLocation.toLowerCase().includes(searchText) ||
        route.endLocation.toLowerCase().includes(searchText) ||
        route.stops.some((stop) =>
          stop.toLowerCase().includes(searchText),
        );

      const matchesStatus =
        statusFilter === "ALL" || route.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [routes, search, statusFilter]);

  // ================= FORM =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditRoute(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (route) => {
    setEditRoute(route);

    setFormData({
      routeName: route.routeName,
      startLocation: route.startLocation,
      endLocation: route.endLocation,
      stops: route.stops.join(", "),
      status: route.status,
    });

    setShowModal(true);
  };

  // ================= SUBMIT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    const stopsArray = formData.stops
      .split(",")
      .map((stop) => stop.trim())
      .filter(Boolean);

    const routeData = {
      routeName: formData.routeName.trim(),
      startLocation: formData.startLocation.trim(),
      endLocation: formData.endLocation.trim(),
      stops: stopsArray,
      status: formData.status,
    };

    if (editRoute) {
      setRoutes((prev) =>
        prev.map((route) =>
          route.id === editRoute.id
            ? {
                ...route,
                ...routeData,
              }
            : route,
        ),
      );
    } else {
      const newRoute = {
        id: Date.now(),
        ...routeData,
      };

      setRoutes((prev) => [newRoute, ...prev]);
    }

    setShowModal(false);
    setEditRoute(null);
    setFormData(emptyForm);
  };

  // ================= DELETE =================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?",
    );

    if (!confirmDelete) return;

    setRoutes((prev) => prev.filter((route) => route.id !== id));
  };

  // ================= STATUS =================

  const toggleStatus = (id) => {
    setRoutes((prev) =>
      prev.map((route) =>
        route.id === id
          ? {
              ...route,
              status:
                route.status === "ACTIVE"
                  ? "INACTIVE"
                  : "ACTIVE",
            }
          : route,
      ),
    );
  };

  // ================= VIEW =================

  const openViewModal = (route) => {
    setViewRoute(route);
    setShowViewModal(true);
  };

  // ================= STATS =================

  const totalRoutes = routes.length;

  const activeRoutes = routes.filter(
    (route) => route.status === "ACTIVE",
  ).length;

  const inactiveRoutes = routes.filter(
    (route) => route.status === "INACTIVE",
  ).length;

  const totalStops = routes.reduce(
    (total, route) => total + route.stops.length,
    0,
  );

  return (
    <>
      {/* ================= HEADER ================= */}

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
                  <LuRoute size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Route Management
                  </h5>

                  <div className="text-muted small">
                    Transport &nbsp;/ &nbsp; Route Management
                  </div>
                </div>

              </div>

              <button
                className="btn btn-sm btn-primary rounded-4 px-3"
                onClick={openAddModal}
              >
                <LuPlus
                  className="me-1"
                  size={20}
                />
                Add Route
              </button>

            </div>
          </div>

          <div
            className="px-4 py-2"
            style={{
              backgroundColor: "rgba(239,246,255,.75)",
              borderTop: "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp; Transport &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Route Management
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="px-2">
        <div className="row g-3 mb-4 mt-2">

          {/* Total Routes */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-blue shadow">
              <div className="stat-icon">
                <LuRoute />
              </div>

              <div className="stat-content">
                <span>Total Routes</span>
                <h3>{totalRoutes}</h3>
                <small>All registered routes</small>
              </div>
            </div>
          </div>

          {/* Active */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-green shadow">
              <div className="stat-icon">
                <LuCircleCheck />
              </div>

              <div className="stat-content">
                <span>Active Routes</span>
                <h3>{activeRoutes}</h3>
                <small>Currently active</small>
              </div>
            </div>
          </div>

          {/* Inactive */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-orange shadow">
              <div className="stat-icon">
                <LuCircleX />
              </div>

              <div className="stat-content">
                <span>Inactive Routes</span>
                <h3>{inactiveRoutes}</h3>
                <small>Currently inactive</small>
              </div>
            </div>
          </div>

          {/* Stops */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-red shadow">
              <div className="stat-icon">
                <LuMapPin />
              </div>

              <div className="stat-content">
                <span>Total Stops</span>
                <h3>{totalStops}</h3>
                <small>Across all routes</small>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= MAIN CARD ================= */}

      <div className="px-2">
        <div className="card border-0 shadow px-2 rounded-4">

          {/* Toolbar */}

          <div className="card-header bg-white border-0 p-3">
            <div className="row g-2 align-items-center">

              {/* Search */}

              <div className="col-lg-6 col-md-6">
                <div className="position-relative">

                  <LuSearch
                    size={18}
                    className="position-absolute text-muted"
                    style={{
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />

                  <input
                    type="text"
                    className="form-control ps-5 rounded-3"
                    placeholder="Search route..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                </div>
              </div>

              {/* Status */}

              <div className="col-lg-3 col-md-3 ms-auto">

                <select
                  className="form-select rounded-3"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                >
                  <option value="ALL">
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

            </div>
          </div>

          {/* ================= TABLE ================= */}

          <div className="card-body p-0">

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead className="table-light">
                  <tr>
                    <th className="px-3">#</th>
                    <th>Route</th>
                    <th>Start Location</th>
                    <th>End Location</th>
                    <th>Stops</th>
                    <th>Status</th>
                    <th className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {filteredRoutes.length > 0 ? (
                    filteredRoutes.map((route, index) => (

                      <tr key={route.id}>

                        {/* Number */}

                        <td className="px-3 text-muted">
                          {index + 1}
                        </td>

                        {/* Route */}

                        <td>
                          <div className="d-flex align-items-center gap-2">

                            <div
                              className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                              style={{
                                width: 40,
                                height: 40,
                              }}
                            >
                              <LuRoute size={20} />
                            </div>

                            <div>
                              <div className="fw-semibold">
                                {route.routeName}
                              </div>

                              <small className="text-muted">
                                Route ID: {route.id}
                              </small>
                            </div>

                          </div>
                        </td>

                        {/* Start */}

                        <td>
                          <div className="d-flex align-items-center gap-2">

                            <LuMapPin
                              size={17}
                              className="text-success"
                            />

                            <span className="fw-semibold">
                              {route.startLocation}
                            </span>

                          </div>
                        </td>

                        {/* End */}

                        <td>
                          <div className="d-flex align-items-center gap-2">

                            <LuMapPinned
                              size={17}
                              className="text-danger"
                            />

                            <span className="fw-semibold">
                              {route.endLocation}
                            </span>

                          </div>
                        </td>

                        {/* Stops */}

                        <td style={{ minWidth: "280px" }}>

                          <div className="d-flex flex-wrap gap-1">

                            {route.stops.length > 0 ? (
                              route.stops.map(
                                (stop, stopIndex) => (
                                  <span
                                    key={`${route.id}-${stopIndex}`}
                                    className="badge bg-primary-subtle text-primary rounded-pill"
                                  >
                                    {stop}
                                  </span>
                                ),
                              )
                            ) : (
                              <span className="text-muted">
                                —
                              </span>
                            )}

                          </div>

                        </td>

                        {/* Status */}

                        <td>

                          {route.status === "ACTIVE" ? (

                            <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                              <LuCircleCheck
                                size={13}
                                className="me-1"
                              />
                              Active
                            </span>

                          ) : (

                            <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
                              <LuCircleX
                                size={13}
                                className="me-1"
                              />
                              Inactive
                            </span>

                          )}

                        </td>

                        {/* Actions */}

                        <td>

                          <div className="d-flex justify-content-center gap-1">

                            {/* View */}

                            <button
                              type="button"
                              className="btn btn-sm btn-light rounded-3"
                              title="View"
                              onClick={() =>
                                openViewModal(route)
                              }
                            >
                              <LuEye size={16} />
                            </button>

                            {/* Edit */}

                            <button
                              type="button"
                              className="btn btn-sm btn-light text-primary rounded-3"
                              title="Edit"
                              onClick={() =>
                                openEditModal(route)
                              }
                            >
                              <LuPencil size={16} />
                            </button>

                            {/* Status */}

                            <button
                              type="button"
                              className={`btn btn-sm rounded-3 ${
                                route.status === "ACTIVE"
                                  ? "btn-light text-danger"
                                  : "btn-light text-success"
                              }`}
                              title={
                                route.status === "ACTIVE"
                                  ? "Deactivate"
                                  : "Activate"
                              }
                              onClick={() =>
                                toggleStatus(route.id)
                              }
                            >
                              {route.status === "ACTIVE" ? (
                                <LuCircleX size={16} />
                              ) : (
                                <LuCircleCheck size={16} />
                              )}
                            </button>

                            {/* Delete */}

                            <button
                              type="button"
                              className="btn btn-sm btn-light text-danger rounded-3"
                              title="Delete"
                              onClick={() =>
                                handleDelete(route.id)
                              }
                            >
                              <LuTrash2 size={16} />
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))
                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center py-5"
                      >

                        <div className="text-muted">

                          <LuRoute
                            size={40}
                            className="mb-2 opacity-50"
                          />

                          <div className="fw-semibold">
                            No routes found
                          </div>

                          <small>
                            Try changing your search
                            or filter.
                          </small>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* Footer */}

          <div className="card-footer bg-white border-0 p-3">

            <div className="d-flex justify-content-between align-items-center">

              <small className="text-muted">
                Showing{" "}
                <strong>
                  {filteredRoutes.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {routes.length}
                </strong>{" "}
                routes
              </small>

              <small className="text-muted">
                Total stops:{" "}
                <strong>{totalStops}</strong>
              </small>

            </div>

          </div>

        </div>
      </div>

      {/* ================= ADD / EDIT MODAL ================= */}

      {showModal && (

        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            background: "rgba(0,0,0,0.45)",
          }}
        >

          <div className="modal-dialog modal-lg modal-dialog-centered">

            <div className="modal-content border-0 rounded-4 shadow">

              {/* Modal Header */}

              <div className="modal-header border-0 px-4 pt-4">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                    style={{
                      width: 44,
                      height: 44,
                    }}
                  >
                    <LuRoute size={22} />
                  </div>

                  <div>

                    <h5 className="fw-bold mb-1">
                      {editRoute
                        ? "Edit Route"
                        : "Add New Route"}
                    </h5>

                    <small className="text-muted">
                      Enter route details
                    </small>

                  </div>

                </div>

                <button
                  type="button"
                  className="btn btn-light rounded-3"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  <LuX size={18} />
                </button>

              </div>

              {/* Form */}

              <form onSubmit={handleSubmit}>

                <div className="modal-body px-4">

                  <div className="row g-3">

                    {/* Route Name */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Route Name
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        name="routeName"
                        className="form-control"
                        placeholder="e.g. Route 01"
                        value={formData.routeName}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    {/* Start Location */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Start Location
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        name="startLocation"
                        className="form-control"
                        placeholder="e.g. Muzaffarpur"
                        value={
                          formData.startLocation
                        }
                        onChange={handleChange}
                        required
                      />

                    </div>

                    {/* End Location */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        End Location
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        name="endLocation"
                        className="form-control"
                        placeholder="e.g. School Campus"
                        value={
                          formData.endLocation
                        }
                        onChange={handleChange}
                        required
                      />

                    </div>

                    {/* Status */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Status
                      </label>

                      <select
                        name="status"
                        className="form-select"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="ACTIVE">
                          Active
                        </option>

                        <option value="INACTIVE">
                          Inactive
                        </option>
                      </select>

                    </div>

                    {/* Stops */}

                    <div className="col-12">

                      <label className="form-label fw-semibold">
                        Stops
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <textarea
                        name="stops"
                        className="form-control"
                        rows="4"
                        placeholder="e.g. Brahampura, Company Bagh, Mithanpura, Ramdayalu"
                        value={formData.stops}
                        onChange={handleChange}
                        required
                      />

                      <small className="text-muted">
                        Enter multiple stops separated by
                        commas.
                      </small>

                    </div>

                  </div>

                </div>

                {/* Footer */}

                <div className="modal-footer border-0 px-4 pb-4">

                  <button
                    type="button"
                    className="btn btn-light rounded-3 px-4"
                    onClick={() =>
                      setShowModal(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary rounded-3 px-4"
                  >
                    {editRoute
                      ? "Update Route"
                      : "Save Route"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

      {/* ================= VIEW MODAL ================= */}

      {showViewModal && viewRoute && (

        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            background: "rgba(0,0,0,0.45)",
          }}
        >

          <div className="modal-dialog modal-lg modal-dialog-centered">

            <div className="modal-content border-0 rounded-4 shadow">

              {/* Header */}

              <div className="modal-header border-0 px-4 pt-4">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                    style={{
                      width: 46,
                      height: 46,
                    }}
                  >
                    <LuRoute size={23} />
                  </div>

                  <div>

                    <h5 className="fw-bold mb-1">
                      {viewRoute.routeName}
                    </h5>

                    <small className="text-muted">
                      Route Details
                    </small>

                  </div>

                </div>

                <button
                  type="button"
                  className="btn btn-light rounded-3"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                >
                  <LuX size={18} />
                </button>

              </div>

              {/* Body */}

              <div className="modal-body px-4">

                <div className="row g-3">

                  {/* Start */}

                  <div className="col-md-6">

                    <div className="p-3 rounded-3 bg-light">

                      <small className="text-muted d-block mb-1">
                        Start Location
                      </small>

                      <div className="fw-semibold d-flex align-items-center gap-2">
                        <LuMapPin
                          className="text-success"
                        />
                        {viewRoute.startLocation}
                      </div>

                    </div>

                  </div>

                  {/* End */}

                  <div className="col-md-6">

                    <div className="p-3 rounded-3 bg-light">

                      <small className="text-muted d-block mb-1">
                        End Location
                      </small>

                      <div className="fw-semibold d-flex align-items-center gap-2">
                        <LuMapPinned
                          className="text-danger"
                        />
                        {viewRoute.endLocation}
                      </div>

                    </div>

                  </div>

                  {/* Status */}

                  <div className="col-md-6">

                    <div className="p-3 rounded-3 bg-light">

                      <small className="text-muted d-block mb-1">
                        Status
                      </small>

                      {viewRoute.status ===
                      "ACTIVE" ? (

                        <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                          <LuCircleCheck
                            size={13}
                            className="me-1"
                          />
                          Active
                        </span>

                      ) : (

                        <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
                          <LuCircleX
                            size={13}
                            className="me-1"
                          />
                          Inactive
                        </span>

                      )}

                    </div>

                  </div>

                  {/* Total Stops */}

                  <div className="col-md-6">

                    <div className="p-3 rounded-3 bg-light">

                      <small className="text-muted d-block mb-1">
                        Total Stops
                      </small>

                      <div className="fw-semibold">
                        {viewRoute.stops.length}
                      </div>

                    </div>

                  </div>

                  {/* Stops */}

                  <div className="col-12">

                    <div className="p-3 rounded-3 bg-light">

                      <small className="text-muted d-block mb-2">
                        Route Stops
                      </small>

                      <div className="d-flex flex-wrap gap-2">

                        {viewRoute.stops.map(
                          (stop, index) => (

                            <span
                              key={index}
                              className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2"
                            >
                              {index + 1}. {stop}
                            </span>

                          ),
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Footer */}

              <div className="modal-footer border-0 px-4 pb-4">

                <button
                  type="button"
                  className="btn btn-primary rounded-3 px-4"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}
    </>
  );
};

export default RouteManagement;

