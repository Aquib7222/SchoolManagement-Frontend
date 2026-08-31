
import React, { useMemo, useState } from "react";
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

const AssignRouteVehicle = () => {
  // ================= VEHICLES =================

  const [vehicles] = useState([
    {
      id: 1,
      vehicleNumber: "BR06PA1234",
      vehicleType: "School Bus",
    },
    {
      id: 2,
      vehicleNumber: "BR06PB5678",
      vehicleType: "School Bus",
    },
    {
      id: 3,
      vehicleNumber: "BR06PC9012",
      vehicleType: "Van",
    },
    {
      id: 4,
      vehicleNumber: "BR06PD3456",
      vehicleType: "School Bus",
    },
  ]);

  // ================= ROUTES =================

  const [routes] = useState([
    {
      id: 1,
      routeName: "Route 01",
      startLocation: "Muzaffarpur",
      endLocation: "School Campus",
      stops: "Kalyani, Mithanpura, Ramna, Aghoria Bazar",
    },
    {
      id: 2,
      routeName: "Route 02",
      startLocation: "Brahmpura",
      endLocation: "School Campus",
      stops: "Brahmpura, Company Bagh, Imli Chatti, Akharaghat",
    },
    {
      id: 3,
      routeName: "Route 03",
      startLocation: "Ahiyapur",
      endLocation: "School Campus",
      stops: "Ahiyapur, Zero Mile, Chandwara, Motijheel",
    },
    {
      id: 4,
      routeName: "Route 04",
      startLocation: "Kanti",
      endLocation: "School Campus",
      stops: "Kanti, Medical Chowk, Bhagwanpur, MIT",
    },
  ]);

  // ================= ASSIGNMENTS =================

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      vehicleId: 1,
      routeId: 1,
      status: "ACTIVE",
    },
    {
      id: 2,
      vehicleId: 2,
      routeId: 2,
      status: "ACTIVE",
    },
    {
      id: 3,
      vehicleId: 3,
      routeId: 3,
      status: "ACTIVE",
    },
  ]);

  const emptyForm = {
    vehicleId: "",
    routeId: "",
    status: "ACTIVE",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [showModal, setShowModal] = useState(false);
  const [editAssignment, setEditAssignment] = useState(null);
  const [search, setSearch] = useState("");

  // ================= FILTER =================

  const filteredAssignments = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return assignments.filter((assignment) => {
      const vehicle = vehicles.find(
        (item) => item.id === assignment.vehicleId
      );

      const route = routes.find(
        (item) => item.id === assignment.routeId
      );

      const vehicleNumber = vehicle?.vehicleNumber?.toLowerCase() || "";
      const vehicleType = vehicle?.vehicleType?.toLowerCase() || "";
      const routeName = route?.routeName?.toLowerCase() || "";

      return (
        vehicleNumber.includes(searchText) ||
        vehicleType.includes(searchText) ||
        routeName.includes(searchText)
      );
    });
  }, [assignments, vehicles, routes, search]);

  // ================= FORM =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditAssignment(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (assignment) => {
    setEditAssignment(assignment);

    setFormData({
      vehicleId: String(assignment.vehicleId),
      routeId: String(assignment.routeId),
      status: assignment.status,
    });

    setShowModal(true);
  };

  // ================= SUBMIT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.vehicleId || !formData.routeId) {
      return;
    }

    // Prevent same vehicle from being assigned to another route
    const duplicate = assignments.find(
      (item) =>
        item.vehicleId === Number(formData.vehicleId) &&
        item.id !== editAssignment?.id
    );

    if (duplicate) {
      alert("This vehicle is already assigned to a route.");
      return;
    }

    // Prevent same route from being assigned to another vehicle
    const routeDuplicate = assignments.find(
      (item) =>
        item.routeId === Number(formData.routeId) &&
        item.id !== editAssignment?.id
    );

    if (routeDuplicate) {
      alert("This route is already assigned to another vehicle.");
      return;
    }

    if (editAssignment) {
      setAssignments((prev) =>
        prev.map((item) =>
          item.id === editAssignment.id
            ? {
                ...item,
                vehicleId: Number(formData.vehicleId),
                routeId: Number(formData.routeId),
                status: formData.status,
              }
            : item
        )
      );
    } else {
      const newAssignment = {
        id: Date.now(),
        vehicleId: Number(formData.vehicleId),
        routeId: Number(formData.routeId),
        status: formData.status,
      };

      setAssignments((prev) => [newAssignment, ...prev]);
    }

    closeModal();
  };

  // ================= DELETE =================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this route assignment?"
    );

    if (!confirmDelete) return;

    setAssignments((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // ================= STATUS =================

  const toggleStatus = (id) => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "ACTIVE"
                  ? "INACTIVE"
                  : "ACTIVE",
            }
          : item
      )
    );
  };

  // ================= MODAL CLOSE =================

  const closeModal = () => {
    setShowModal(false);
    setEditAssignment(null);
    setFormData(emptyForm);
  };

  // ================= STATS =================

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
        (item) => item.vehicleId === vehicle.id
      )
  ).length;

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

          {/* ================= TABLE ================= */}

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

                  {filteredAssignments.length > 0 ? (

                    filteredAssignments.map(
                      (assignment, index) => {

                        const vehicle =
                          vehicles.find(
                            (item) =>
                              item.id ===
                              assignment.vehicleId
                          );

                        const route =
                          routes.find(
                            (item) =>
                              item.id ===
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
                                    {vehicle?.vehicleNumber ||
                                      "—"}
                                  </div>

                                  <small className="text-muted">
                                    {vehicle?.vehicleType ||
                                      "—"}
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
                                  {route?.startLocation ||
                                    "—"}
                                </div>

                                <div className="text-muted mt-1">
                                  ↓{" "}
                                  {route?.endLocation ||
                                    "—"}
                                </div>

                              </div>

                            </td>

                            {/* STOPS */}

                            <td style={{ minWidth: "220px" }}>

                              <small className="text-muted">
                                {route?.stops || "—"}
                              </small>

                            </td>

                            {/* STATUS */}

                            <td>

                              {assignment.status ===
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
                                      assignment.id
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
                            Try changing your search or
                            assign a new route.
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
                    Select a vehicle and route to
                    create mapping.
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
                        <span className="text-danger">
                          *
                        </span>

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
                                item.vehicleId ===
                                  vehicle.id &&
                                item.id !==
                                  editAssignment?.id
                            );

                          return (
                            <option
                              key={vehicle.id}
                              value={vehicle.id}
                              disabled={
                                alreadyAssigned
                              }
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
                        <span className="text-danger">
                          *
                        </span>

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
                                item.routeId ===
                                  route.id &&
                                item.id !==
                                  editAssignment?.id
                            );

                          return (
                            <option
                              key={route.id}
                              value={route.id}
                              disabled={
                                alreadyAssigned
                              }
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
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary rounded-3 px-4"
                  >

                    {editAssignment
                      ? "Update Assignment"
                      : "Assign Route"}

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

