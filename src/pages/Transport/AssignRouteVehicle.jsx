
import React, { useEffect, useMemo, useState } from "react";
import {
  LuBus,
  LuRoute,
  LuPlus,
  LuSearch,
  LuPencil,
  LuTrash2,
  LuCircleCheck,
  LuCircleX,
  LuX,
  LuMapPin,
} from "react-icons/lu";
import { FaBus } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const AssignRouteVehicle = () => {
  const schoolId = localStorage.getItem("schoolId");

  // =====================================================
  // STATE
  // =====================================================

  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editAssignment, setEditAssignment] = useState(null);

  const emptyForm = {
    vehicleId: "",
    routeId: "",
    status: "ACTIVE",
  };

  const [formData, setFormData] = useState(emptyForm);

  // =====================================================
  // API BASE
  // =====================================================

  const BASE_URL = "/api/transport/vehicle-routes";

  // =====================================================
  // FETCH VEHICLES
  // =====================================================

  const fetchVehicles = async () => {
    if (!schoolId) return;

    try {
      const response = await axiosInstance.get(
        `/api/transport/vehicles?schoolId=${schoolId}`
      );

      setVehicles(response.data || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to load vehicles."
      );
    }
  };

  // =====================================================
  // FETCH ROUTES
  // =====================================================

  const fetchRoutes = async () => {
    if (!schoolId) return;

    try {
      const response = await axiosInstance.get(
        `/api/transport/routes?schoolId=${schoolId}`
      );

      setRoutes(response.data || []);
    } catch (error) {
      console.error("Error fetching routes:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to load routes."
      );
    }
  };

  // =====================================================
  // FETCH ASSIGNMENTS
  // =====================================================

  const fetchAssignments = async () => {
    if (!schoolId) return;

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `${BASE_URL}?schoolId=${schoolId}`
      );

      setAssignments(response.data || []);
    } catch (error) {
      console.error("Error fetching assignments:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to load route assignments."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    if (!schoolId) return;

    const loadData = async () => {
      await Promise.all([
        fetchVehicles(),
        fetchRoutes(),
        fetchAssignments(),
      ]);
    };

    loadData();
  }, [schoolId]);

  // =====================================================
  // GET VEHICLE
  // =====================================================

  const getVehicle = (vehicleId) => {
    return vehicles.find(
      (vehicle) => Number(vehicle.id) === Number(vehicleId)
    );
  };

  // =====================================================
  // GET ROUTE
  // =====================================================

  const getRoute = (routeId) => {
    return routes.find(
      (route) => Number(route.id) === Number(routeId)
    );
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredAssignments = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return assignments.filter((assignment) => {
      const vehicle = getVehicle(assignment.vehicleId);
      const route = getRoute(assignment.routeId);

      const vehicleNumber =
        vehicle?.vehicleNumber?.toLowerCase() || "";

      const vehicleType =
        vehicle?.vehicleType?.toLowerCase() || "";

      const routeName =
        route?.routeName?.toLowerCase() || "";

      const startLocation =
        route?.startLocation?.toLowerCase() || "";

      const endLocation =
        route?.endLocation?.toLowerCase() || "";

      return (
        vehicleNumber.includes(searchText) ||
        vehicleType.includes(searchText) ||
        routeName.includes(searchText) ||
        startLocation.includes(searchText) ||
        endLocation.includes(searchText)
      );
    });
  }, [assignments, vehicles, routes, search]);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddModal = () => {
    setEditAssignment(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (assignment) => {
    setEditAssignment(assignment);

    setFormData({
      vehicleId: String(assignment.vehicleId),
      routeId: String(assignment.routeId),
      status: assignment.status || "ACTIVE",
    });

    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    setShowModal(false);
    setEditAssignment(null);
    setFormData(emptyForm);
  };

  // =====================================================
  // CREATE / UPDATE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!schoolId) {
      alert("School ID not found.");
      return;
    }

    if (!formData.vehicleId || !formData.routeId) {
      alert("Please select vehicle and route.");
      return;
    }

    const vehicleId = Number(formData.vehicleId);
    const routeId = Number(formData.routeId);

    // =================================================
    // FRONTEND DUPLICATE CHECK
    // =================================================

    const vehicleDuplicate = assignments.find(
      (item) =>
        Number(item.vehicleId) === vehicleId &&
        item.id !== editAssignment?.id
    );

    if (vehicleDuplicate) {
      alert("This vehicle is already assigned to a route.");
      return;
    }

    const routeDuplicate = assignments.find(
      (item) =>
        Number(item.routeId) === routeId &&
        item.id !== editAssignment?.id
    );

    if (routeDuplicate) {
      alert("This route is already assigned to another vehicle.");
      return;
    }

    const payload = {
      vehicleId,
      routeId,
      status: formData.status,
    };

    try {
      setSaving(true);

      // =================================================
      // UPDATE
      // =================================================

      if (editAssignment) {
        const response = await axiosInstance.put(
          `${BASE_URL}/${editAssignment.id}?schoolId=${schoolId}`,
          payload
        );

        const updatedAssignment = response.data;

        setAssignments((prev) =>
          prev.map((item) =>
            item.id === editAssignment.id
              ? updatedAssignment
              : item
          )
        );

        alert("Route assignment updated successfully.");
      }

      // =================================================
      // CREATE
      // =================================================

      else {
        const response = await axiosInstance.post(
          `${BASE_URL}?schoolId=${schoolId}`,
          payload
        );

        const newAssignment = response.data;

        setAssignments((prev) => [
          newAssignment,
          ...prev,
        ]);

        alert("Route assigned to vehicle successfully.");
      }

      closeModal();
    } catch (error) {
      console.error("Error saving assignment:", error);

      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to save route assignment."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this route assignment?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await axiosInstance.delete(
        `${BASE_URL}/${id}?schoolId=${schoolId}`
      );

      setAssignments((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Route assignment removed successfully.");
    } catch (error) {
      console.error("Error deleting assignment:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to remove route assignment."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const toggleStatus = async (assignment) => {
    if (!schoolId) return;

    const newStatus =
      assignment.status === "ACTIVE"
        ? "INACTIVE"
        : "ACTIVE";

    const vehicleId = Number(assignment.vehicleId);
    const routeId = Number(assignment.routeId);

    try {
      setLoading(true);

      const payload = {
        vehicleId,
        routeId,
        status: newStatus,
      };

      const response = await axiosInstance.put(
        `${BASE_URL}/${assignment.id}?schoolId=${schoolId}`,
        payload
      );

      setAssignments((prev) =>
        prev.map((item) =>
          item.id === assignment.id
            ? response.data
            : item
        )
      );
    } catch (error) {
      console.error("Error changing assignment status:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to change assignment status."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // STATS
  // =====================================================

  const totalAssignments = assignments.length;

  const activeAssignments = assignments.filter(
    (item) => item.status === "ACTIVE"
  ).length;

  const inactiveAssignments = assignments.filter(
    (item) => item.status === "INACTIVE"
  ).length;

  const unassignedVehicles = vehicles.filter(
    (vehicle) =>
      !assignments.some(
        (item) =>
          Number(item.vehicleId) === Number(vehicle.id)
      )
  ).length;

  // =====================================================
  // UI
  // =====================================================

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
                  <LuRoute size={28} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Assign Route to Vehicle
                  </h5>

                  <div className="text-muted small">
                    Transport &nbsp;/&nbsp; Assign Route to Vehicle
                  </div>
                </div>

              </div>

              <button
                className="btn btn-primary rounded-4 btn-sm px-3"
                onClick={openAddModal}
                disabled={loading}
              >
                <LuPlus size={19} className="me-1" />
                Assign Route
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
                Assign Route to Vehicle
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="px-2">
        <div className="row g-3 mb-4 mt-2">

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-blue shadow">
              <div className="stat-icon">
                <LuRoute />
              </div>

              <div className="stat-content">
                <span>Total Assignments</span>
                <h3>{totalAssignments}</h3>
                <small>Vehicle route mappings</small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-green shadow">
              <div className="stat-icon">
                <LuCircleCheck />
              </div>

              <div className="stat-content">
                <span>Active Assignments</span>
                <h3>{activeAssignments}</h3>
                <small>Currently running</small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-orange shadow">
              <div className="stat-icon">
                <LuCircleX />
              </div>

              <div className="stat-content">
                <span>Inactive</span>
                <h3>{inactiveAssignments}</h3>
                <small>Currently inactive</small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-red shadow">
              <div className="stat-icon">
                <LuBus />
              </div>

              <div className="stat-content">
                <span>Unassigned Vehicles</span>
                <h3>{unassignedVehicles}</h3>
                <small>Available for mapping</small>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= MAIN CARD ================= */}

      <div className="px-2">
        <div className="card border-0 shadow px-2 rounded-4">

          {/* TOOLBAR */}

          <div className="card-header bg-white border-0 p-3">

            <div className="row g-2 align-items-center">

              <div className="col-lg-7 col-md-7">

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
                    placeholder="Search vehicle or route..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                </div>

              </div>

              <div className="col-lg-5 col-md-5 text-md-end">

                <span className="text-muted small">
                  Showing{" "}
                  <strong>
                    {filteredAssignments.length}
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {assignments.length}
                  </strong>{" "}
                  assignments
                </span>

              </div>

            </div>

          </div>

          {/* TABLE */}

          <div className="card-body p-0">

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead className="table-light">

                  <tr>
                    <th className="px-3">#</th>
                    <th>Vehicle</th>
                    <th>Route</th>
                    <th>Route Details</th>
                    <th>Stops</th>
                    <th>Status</th>
                    <th className="text-center">
                      Action
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {loading ? (

                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-5"
                      >
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        />

                        <div className="text-muted mt-2">
                          Loading...
                        </div>
                      </td>
                    </tr>

                  ) : filteredAssignments.length > 0 ? (

                    filteredAssignments.map(
                      (assignment, index) => {

                        const vehicle = getVehicle(
                          assignment.vehicleId
                        );

                        const route = getRoute(
                          assignment.routeId
                        );

                        return (
                          <tr key={assignment.id}>

                            {/* NUMBER */}

                            <td className="px-3 text-muted">
                              {index + 1}
                            </td>

                            {/* VEHICLE */}

                            <td>

                              <div className="d-flex align-items-center gap-2">

                                <div
                                  className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                                  style={{
                                    width: 42,
                                    height: 42,
                                  }}
                                >
                                  <FaBus size={19} />
                                </div>

                                <div>

                                  <div className="fw-semibold">
                                    {vehicle?.vehicleNumber || "—"}
                                  </div>

                                  <small className="text-muted">
                                    {vehicle?.vehicleType || "—"}
                                  </small>

                                </div>

                              </div>

                            </td>

                            {/* ROUTE */}

                            <td>

                              <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">

                                <LuRoute
                                  size={13}
                                  className="me-1"
                                />

                                {route?.routeName || "—"}

                              </span>

                            </td>

                            {/* ROUTE DETAILS */}

                            <td>

                              <div className="small">

                                <div className="fw-semibold">

                                  <LuMapPin
                                    size={13}
                                    className="me-1 text-success"
                                  />

                                  {route?.startLocation || "—"}

                                </div>

                                <div className="text-muted mt-1">
                                  ↓ {route?.endLocation || "—"}
                                </div>

                              </div>

                            </td>

                            {/* STOPS */}

                            <td style={{ minWidth: "220px" }}>

                              <small className="text-muted">

                                {Array.isArray(route?.stops)
                                  ? route.stops.join(", ")
                                  : route?.stops || "—"}

                              </small>

                            </td>

                            {/* STATUS */}

                            <td>

                              {assignment.status === "ACTIVE" ? (

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

                            {/* ACTION */}

                            <td>

                              <div className="d-flex justify-content-center gap-1">

                                <button
                                  type="button"
                                  className="btn btn-sm btn-light text-primary rounded-3"
                                  title="Edit"
                                  onClick={() =>
                                    openEditModal(
                                      assignment
                                    )
                                  }
                                >
                                  <LuPencil size={16} />
                                </button>

                                <button
                                  type="button"
                                  className={`btn btn-sm rounded-3 ${
                                    assignment.status ===
                                    "ACTIVE"
                                      ? "btn-light text-danger"
                                      : "btn-light text-success"
                                  }`}
                                  title={
                                    assignment.status ===
                                    "ACTIVE"
                                      ? "Deactivate"
                                      : "Activate"
                                  }
                                  onClick={() =>
                                    toggleStatus(
                                      assignment
                                    )
                                  }
                                >
                                  {assignment.status ===
                                  "ACTIVE" ? (
                                    <LuCircleX size={16} />
                                  ) : (
                                    <LuCircleCheck
                                      size={16}
                                    />
                                  )}
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-sm btn-light text-danger rounded-3"
                                  title="Remove"
                                  onClick={() =>
                                    handleDelete(
                                      assignment.id
                                    )
                                  }
                                >
                                  <LuTrash2 size={16} />
                                </button>

                              </div>

                            </td>

                          </tr>
                        );
                      }
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center py-5"
                      >

                        <div className="text-muted">

                          <LuRoute
                            size={42}
                            className="mb-2 opacity-50"
                          />

                          <div className="fw-semibold">
                            No route assignments found
                          </div>

                          <small>
                            Try changing your search or assign a new route.
                          </small>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* FOOTER */}

          <div className="card-footer bg-white border-0 p-3">

            <div className="d-flex justify-content-between align-items-center">

              <small className="text-muted">
                Total{" "}
                <strong>
                  {assignments.length}
                </strong>{" "}
                route assignments
              </small>

              <small className="text-muted">
                Active{" "}
                <strong>
                  {activeAssignments}
                </strong>{" "}
                routes running
              </small>

            </div>

          </div>

        </div>
      </div>

      {/* ================= MODAL ================= */}

      {showModal && (

        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            background: "rgba(0,0,0,0.45)",
          }}
        >

          <div className="modal-dialog modal-md modal-dialog-centered">

            <div className="modal-content border-0 rounded-4 shadow">

              {/* HEADER */}

              <div className="modal-header border-0 px-4 pt-4">

                <div>

                  <h5 className="fw-bold mb-1">

                    {editAssignment
                      ? "Edit Route Assignment"
                      : "Assign Route to Vehicle"}

                  </h5>

                  <small className="text-muted">
                    Select a vehicle and route to create mapping.
                  </small>

                </div>

                <button
                  type="button"
                  className="btn btn-light rounded-3"
                  onClick={closeModal}
                >
                  <LuX size={18} />
                </button>

              </div>

              {/* FORM */}

              <form onSubmit={handleSubmit}>

                <div className="modal-body px-4">

                  <div className="row g-3">

                    {/* VEHICLE */}

                    <div className="col-12">

                      <label className="form-label fw-semibold">
                        Vehicle
                        <span className="text-danger">*</span>
                      </label>

                      <select
                        name="vehicleId"
                        className="form-select rounded-3"
                        value={formData.vehicleId}
                        onChange={handleChange}
                        required
                      >

                        <option value="">
                          Select Vehicle
                        </option>

                        {vehicles.map((vehicle) => {

                          const alreadyAssigned =
                            assignments.some(
                              (item) =>
                                Number(item.vehicleId) ===
                                  Number(vehicle.id) &&
                                item.id !==
                                  editAssignment?.id
                            );

                          return (

                            <option
                              key={vehicle.id}
                              value={vehicle.id}
                              disabled={alreadyAssigned}
                            >

                              {vehicle.vehicleNumber} —{" "}
                              {vehicle.vehicleType}

                              {alreadyAssigned
                                ? " (Already Assigned)"
                                : ""}

                            </option>

                          );
                        })}

                      </select>

                    </div>

                    {/* ROUTE */}

                    <div className="col-12">

                      <label className="form-label fw-semibold">
                        Route
                        <span className="text-danger">*</span>
                      </label>

                      <select
                        name="routeId"
                        className="form-select rounded-3"
                        value={formData.routeId}
                        onChange={handleChange}
                        required
                      >

                        <option value="">
                          Select Route
                        </option>

                        {routes.map((route) => {

                          const alreadyAssigned =
                            assignments.some(
                              (item) =>
                                Number(item.routeId) ===
                                  Number(route.id) &&
                                item.id !==
                                  editAssignment?.id
                            );

                          return (

                            <option
                              key={route.id}
                              value={route.id}
                              disabled={alreadyAssigned}
                            >

                              {route.routeName} —{" "}
                              {route.startLocation} →{" "}
                              {route.endLocation}

                              {alreadyAssigned
                                ? " (Already Assigned)"
                                : ""}

                            </option>

                          );
                        })}

                      </select>

                    </div>

                    {/* STATUS */}

                    <div className="col-12">

                      <label className="form-label fw-semibold">
                        Status
                      </label>

                      <select
                        name="status"
                        className="form-select rounded-3"
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

                  </div>

                </div>

                {/* FOOTER */}

                <div className="modal-footer border-0 px-4 pb-4">

                  <button
                    type="button"
                    className="btn btn-light rounded-3 px-4"
                    onClick={closeModal}
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary rounded-3 px-4"
                    disabled={saving}
                  >

                    {saving ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                        />
                        Saving...
                      </>
                    ) : (
                      editAssignment
                        ? "Update Assignment"
                        : "Assign Route"
                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

    </>
  );
};

export default AssignRouteVehicle;
