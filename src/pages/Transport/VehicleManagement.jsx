
import React, { useEffect, useMemo, useState } from "react";
import { FaBus } from "react-icons/fa";
import {
  LuBus,
  LuPlus,
  LuSearch,
  LuPencil,
  LuTrash2,
  LuEye,
  LuCircleCheck,
  LuCircleX,
  LuUsers,
  LuX,
} from "react-icons/lu";
import axiosInstance from "../../api/axiosInstance";

const VehicleManagement = () => {
  const schoolId = localStorage.getItem("schoolId");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editVehicle, setEditVehicle] = useState(null);
  const [viewVehicle, setViewVehicle] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [vehicles, setVehicles] = useState([]);

  const emptyForm = {
    vehicleNumber: "",
    vehicleType: "School Bus",
    vehicleModel: "",
    vehicleCapacity: "",
    status: "ACTIVE",
  };

  const [formData, setFormData] = useState(emptyForm);

  // =========================================================
  // GET ALL VEHICLES
  // =========================================================

  const fetchVehicles = async () => {
    if (!schoolId) return;

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/api/transport/vehicles?schoolId=${schoolId}`
      );

      setVehicles(response.data || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to fetch vehicles."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [schoolId]);

  // =========================================================
  // FILTER
  // =========================================================

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        (vehicle.vehicleNumber || "")
          .toLowerCase()
          .includes(searchText) ||
        (vehicle.vehicleType || "")
          .toLowerCase()
          .includes(searchText) ||
        (vehicle.vehicleModel || "")
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" ||
        vehicle.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [vehicles, search, statusFilter]);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // OPEN ADD MODAL
  // =========================================================

  const openAddModal = () => {
    setEditVehicle(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const openEditModal = (vehicle) => {
    setEditVehicle(vehicle);

    setFormData({
      vehicleNumber: vehicle.vehicleNumber || "",
      vehicleType: vehicle.vehicleType || "School Bus",
      vehicleModel: vehicle.vehicleModel || "",
      vehicleCapacity: vehicle.vehicleCapacity || "",
      status: vehicle.status || "ACTIVE",
    });

    setShowModal(true);
  };

  // =========================================================
  // GET VEHICLE BY ID
  // =========================================================

  const handleView = async (id) => {
    if (!schoolId) return;

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/api/transport/vehicles/${id}?schoolId=${schoolId}`
      );

      setViewVehicle(response.data);
      setShowViewModal(true);
    } catch (error) {
      console.error("Error fetching vehicle:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to fetch vehicle details."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!schoolId) {
      alert("School ID not found.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        schoolId: Number(schoolId),
        vehicleNumber: formData.vehicleNumber.trim(),
        vehicleType: formData.vehicleType,
        vehicleModel: formData.vehicleModel.trim(),
        vehicleCapacity: Number(formData.vehicleCapacity),
        status: formData.status,
      };

      // =====================================================
      // UPDATE
      // =====================================================

      if (editVehicle) {
        const response = await axiosInstance.put(
          `/api/transport/vehicles/${editVehicle.id}?schoolId=${schoolId}`,
          payload
        );

        const updatedVehicle = response.data;

        setVehicles((prev) =>
          prev.map((vehicle) =>
            vehicle.id === editVehicle.id
              ? updatedVehicle
              : vehicle
          )
        );

        alert("Vehicle updated successfully.");
      }

      // =====================================================
      // CREATE
      // =====================================================

      else {
        const response = await axiosInstance.post(
          `/api/transport/vehicles`,
          payload
        );

        const newVehicle = response.data;

        setVehicles((prev) => [
          newVehicle,
          ...prev,
        ]);

        alert("Vehicle created successfully.");
      }

      setShowModal(false);
      setEditVehicle(null);
      setFormData(emptyForm);

    } catch (error) {
      console.error("Error saving vehicle:", error);

      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to save vehicle."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE VEHICLE
  // =========================================================

  const handleDelete = async (id) => {
    if (!schoolId) {
      alert("School ID not found.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await axiosInstance.delete(
        `/api/transport/vehicles/${id}?schoolId=${schoolId}`
      );

      setVehicles((prev) =>
        prev.filter((vehicle) => vehicle.id !== id)
      );

      alert("Vehicle deleted successfully.");

    } catch (error) {
      console.error("Error deleting vehicle:", error);

      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to delete vehicle."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // TOGGLE STATUS
  // =========================================================

  const toggleStatus = async (vehicle) => {
    if (!schoolId) {
      alert("School ID not found.");
      return;
    }

    const newStatus =
      vehicle.status === "ACTIVE"
        ? "INACTIVE"
        : "ACTIVE";

    try {
      setLoading(true);

      const payload = {
        schoolId: Number(schoolId),
        vehicleNumber: vehicle.vehicleNumber,
        vehicleType: vehicle.vehicleType,
        vehicleModel: vehicle.vehicleModel || "",
        vehicleCapacity: Number(
          vehicle.vehicleCapacity || 0
        ),
        status: newStatus,
      };

      const response = await axiosInstance.put(
        `/api/transport/vehicles/${vehicle.id}?schoolId=${schoolId}`,
        payload
      );

      const updatedVehicle = response.data;

      setVehicles((prev) =>
        prev.map((item) =>
          item.id === vehicle.id
            ? updatedVehicle
            : item
        )
      );

    } catch (error) {
      console.error("Error updating vehicle status:", error);

      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to update vehicle status."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // STATS
  // =========================================================

  const totalVehicles = vehicles.length;

  const activeVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "ACTIVE"
  ).length;

  const inactiveVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "INACTIVE"
  ).length;

  const totalCapacity = vehicles
    .filter(
      (vehicle) => vehicle.status === "ACTIVE"
    )
    .reduce(
      (total, vehicle) =>
        total +
        Number(vehicle.vehicleCapacity || 0),
      0
    );

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    setShowModal(false);
    setEditVehicle(null);
    setFormData(emptyForm);
  };

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

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
                  <FaBus size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Vehicle Management
                  </h5>

                  <div className="text-muted small">
                    Transport &nbsp;/ &nbsp;
                    Vehicle Management
                  </div>
                </div>

              </div>

              <button
                className="btn btn-sm btn-primary rounded-4"
                onClick={openAddModal}
                disabled={loading || saving}
              >
                <LuPlus
                  className="me-1"
                  size={20}
                />
                Add Vehicle
              </button>

            </div>
          </div>

          <div
            className="px-4 py-2"
            style={{
              backgroundColor:
                "rgba(239,246,255,.75)",
              borderTop:
                "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp;
              Transport &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Vehicle Management
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="px-2">
        <div className="row g-3 mb-4 mt-2">

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-blue shadow">
              <div className="stat-icon">
                <LuBus />
              </div>

              <div className="stat-content">
                <span>Total Vehicles</span>
                <h3>{totalVehicles}</h3>
                <small>Total registered vehicles</small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-green shadow">
              <div className="stat-icon">
                <LuCircleCheck />
              </div>

              <div className="stat-content">
                <span>Active Vehicles</span>
                <h3>{activeVehicles}</h3>
                <small>Currently active</small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-orange shadow">
              <div className="stat-icon">
                <LuCircleX />
              </div>

              <div className="stat-content">
                <span>Inactive Vehicles</span>
                <h3>{inactiveVehicles}</h3>
                <small>Currently inactive</small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-red shadow">
              <div className="stat-icon">
                <LuUsers />
              </div>

              <div className="stat-content">
                <span>Total Capacity</span>
                <h3>{totalCapacity}</h3>
                <small>Active vehicle seats</small>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="px-2">
        <div className="card border-0 shadow px-2 rounded-4">

          {/* TOOLBAR */}

          <div className="card-header bg-white border-0 p-3">
            <div className="row g-2 align-items-center">

              <div className="col-lg-6 col-md-6">
                <div className="position-relative">

                  <LuSearch
                    size={18}
                    className="position-absolute text-muted"
                    style={{
                      left: 12,
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                    }}
                  />

                  <input
                    type="text"
                    className="form-control ps-5 rounded-3"
                    placeholder="Search vehicle..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                </div>
              </div>

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

          {/* TABLE */}

          <div className="card-body p-0">

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead className="table-light">

                  <tr>
                    <th className="px-3">#</th>
                    <th>Vehicle</th>
                    <th>Type / Model</th>
                    <th>Capacity</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th className="text-center">
                      Action
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {loading && vehicles.length === 0 ? (

                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-5"
                      >
                        <div className="spinner-border text-primary mb-2" />
                        <div className="text-muted">
                          Loading vehicles...
                        </div>
                      </td>
                    </tr>

                  ) : filteredVehicles.length > 0 ? (

                    filteredVehicles.map(
                      (vehicle, index) => (

                        <tr key={vehicle.id}>

                          <td className="px-3 text-muted">
                            {index + 1}
                          </td>

                          {/* VEHICLE */}

                          <td>

                            <div className="d-flex align-items-center gap-2">

                              <div
                                className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                                style={{
                                  width: 40,
                                  height: 40,
                                }}
                              >
                                <LuBus size={20} />
                              </div>

                              <div>

                                <div className="fw-semibold">
                                  {vehicle.vehicleNumber}
                                </div>

                                <small className="text-muted">
                                  Vehicle ID:{" "}
                                  {vehicle.id}
                                </small>

                              </div>

                            </div>

                          </td>

                          {/* TYPE / MODEL */}

                          <td>

                            <div className="fw-semibold">
                              {vehicle.vehicleType}
                            </div>

                            <small className="text-muted">
                              {vehicle.vehicleModel ||
                                "—"}
                            </small>

                          </td>

                          {/* CAPACITY */}

                          <td>

                            <span className="fw-semibold">
                              {vehicle.vehicleCapacity}
                            </span>

                            <small className="text-muted ms-1">
                              seats
                            </small>

                          </td>

                          {/* CREATED */}

                          <td>
                            <div className="fw-semibold">
                              {vehicle.createdAt ||
                                "—"}
                            </div>
                          </td>

                          {/* STATUS */}

                          <td>

                            {vehicle.status ===
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

                              {/* VIEW */}

                              <button
                                type="button"
                                className="btn btn-sm btn-light rounded-3"
                                title="View"
                                onClick={() =>
                                  handleView(
                                    vehicle.id
                                  )
                                }
                              >
                                <LuEye size={16} />
                              </button>

                              {/* EDIT */}

                              <button
                                type="button"
                                className="btn btn-sm btn-light text-primary rounded-3"
                                title="Edit"
                                onClick={() =>
                                  openEditModal(
                                    vehicle
                                  )
                                }
                              >
                                <LuPencil size={16} />
                              </button>

                              {/* STATUS */}

                              <button
                                type="button"
                                className={`btn btn-sm rounded-3 ${
                                  vehicle.status ===
                                  "ACTIVE"
                                    ? "btn-light text-danger"
                                    : "btn-light text-success"
                                }`}
                                title={
                                  vehicle.status ===
                                  "ACTIVE"
                                    ? "Deactivate"
                                    : "Activate"
                                }
                                onClick={() =>
                                  toggleStatus(
                                    vehicle
                                  )
                                }
                                disabled={loading}
                              >
                                {vehicle.status ===
                                "ACTIVE" ? (
                                  <LuCircleX
                                    size={16}
                                  />
                                ) : (
                                  <LuCircleCheck
                                    size={16}
                                  />
                                )}
                              </button>

                              {/* DELETE */}

                              <button
                                type="button"
                                className="btn btn-sm btn-light text-danger rounded-3"
                                title="Delete"
                                onClick={() =>
                                  handleDelete(
                                    vehicle.id
                                  )
                                }
                                disabled={loading}
                              >
                                <LuTrash2 size={16} />
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center py-5"
                      >

                        <div className="text-muted">

                          <LuBus
                            size={40}
                            className="mb-2 opacity-50"
                          />

                          <div className="fw-semibold">
                            No vehicles found
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

          {/* FOOTER */}

          <div className="card-footer bg-white border-0 p-3">

            <div className="d-flex justify-content-between align-items-center">

              <small className="text-muted">
                Showing{" "}
                <strong>
                  {filteredVehicles.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {vehicles.length}
                </strong>{" "}
                vehicles
              </small>

              <small className="text-muted">
                Total active capacity:{" "}
                <strong>
                  {totalCapacity}
                </strong>{" "}
                seats
              </small>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            background:
              "rgba(0,0,0,0.45)",
          }}
        >

          <div className="modal-dialog modal-lg modal-dialog-centered">

            <div className="modal-content border-0 rounded-4 shadow">

              {/* HEADER */}

              <div className="modal-header border-0 px-4 pt-4">

                <div>

                  <h5 className="fw-bold mb-1">
                    {editVehicle
                      ? "Edit Vehicle"
                      : "Add New Vehicle"}
                  </h5>

                  <small className="text-muted">
                    {editVehicle
                      ? "Update vehicle information"
                      : "Enter vehicle information"}
                  </small>

                </div>

                <button
                  type="button"
                  className="btn btn-light rounded-3"
                  onClick={closeModal}
                  disabled={saving}
                >
                  <LuX size={18} />
                </button>

              </div>

              {/* FORM */}

              <form onSubmit={handleSubmit}>

                <div className="modal-body px-4">

                  <div className="row g-3">

                    {/* VEHICLE NUMBER */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Vehicle Number
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        name="vehicleNumber"
                        className="form-control"
                        placeholder="e.g. BR06PA1234"
                        value={
                          formData.vehicleNumber
                        }
                        onChange={handleChange}
                        required
                      />

                    </div>

                    {/* VEHICLE TYPE */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Vehicle Type
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <select
                        name="vehicleType"
                        className="form-select"
                        value={
                          formData.vehicleType
                        }
                        onChange={handleChange}
                        required
                      >

                        <option value="School Bus">
                          School Bus
                        </option>

                        <option value="Van">
                          Van
                        </option>

                        <option value="Mini Bus">
                          Mini Bus
                        </option>

                      </select>

                    </div>

                    {/* MODEL */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Vehicle Model
                      </label>

                      <input
                        type="text"
                        name="vehicleModel"
                        className="form-control"
                        placeholder="e.g. Tata Starbus"
                        value={
                          formData.vehicleModel
                        }
                        onChange={handleChange}
                      />

                    </div>

                    {/* CAPACITY */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Seating Capacity
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <input
                        type="number"
                        name="vehicleCapacity"
                        className="form-control"
                        placeholder="e.g. 40"
                        min="1"
                        value={
                          formData.vehicleCapacity
                        }
                        onChange={handleChange}
                        required
                      />

                    </div>

                    {/* STATUS */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Status
                      </label>

                      <select
                        name="status"
                        className="form-select"
                        value={
                          formData.status
                        }
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
                    ) : editVehicle ? (
                      "Update Vehicle"
                    ) : (
                      "Save Vehicle"
                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          VIEW VEHICLE MODAL
      ===================================================== */}

      {showViewModal && viewVehicle && (

        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            background:
              "rgba(0,0,0,0.45)",
          }}
        >

          <div className="modal-dialog modal-md modal-dialog-centered">

            <div className="modal-content border-0 rounded-4 shadow">

              <div className="modal-header border-0 px-4 pt-4">

                <div>

                  <h5 className="fw-bold mb-1">
                    Vehicle Details
                  </h5>

                  <small className="text-muted">
                    Complete vehicle information
                  </small>

                </div>

                <button
                  type="button"
                  className="btn btn-light rounded-3"
                  onClick={() => {
                    setShowViewModal(false);
                    setViewVehicle(null);
                  }}
                >
                  <LuX size={18} />
                </button>

              </div>

              <div className="modal-body px-4">

                <div className="text-center mb-4">

                  <div
                    className="mx-auto rounded-4 bg-primary-subtle text-primary d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: 70,
                      height: 70,
                    }}
                  >
                    <LuBus size={34} />
                  </div>

                  <h5 className="fw-bold mb-1">
                    {viewVehicle.vehicleNumber}
                  </h5>

                  <span
                    className={`badge rounded-pill px-3 py-2 ${
                      viewVehicle.status ===
                      "ACTIVE"
                        ? "bg-success-subtle text-success"
                        : "bg-danger-subtle text-danger"
                    }`}
                  >
                    {viewVehicle.status ===
                    "ACTIVE" ? (
                      <LuCircleCheck
                        size={13}
                        className="me-1"
                      />
                    ) : (
                      <LuCircleX
                        size={13}
                        className="me-1"
                      />
                    )}

                    {viewVehicle.status}
                  </span>

                </div>

                <div className="row g-3">

                  <div className="col-6">
                    <small className="text-muted">
                      Vehicle ID
                    </small>

                    <div className="fw-semibold">
                      {viewVehicle.id}
                    </div>
                  </div>

                  <div className="col-6">
                    <small className="text-muted">
                      Vehicle Type
                    </small>

                    <div className="fw-semibold">
                      {viewVehicle.vehicleType ||
                        "—"}
                    </div>
                  </div>

                  <div className="col-6">
                    <small className="text-muted">
                      Vehicle Model
                    </small>

                    <div className="fw-semibold">
                      {viewVehicle.vehicleModel ||
                        "—"}
                    </div>
                  </div>

                  <div className="col-6">
                    <small className="text-muted">
                      Capacity
                    </small>

                    <div className="fw-semibold">
                      {viewVehicle.vehicleCapacity ||
                        0}{" "}
                      Seats
                    </div>
                  </div>

                  <div className="col-6">
                    <small className="text-muted">
                      Created At
                    </small>

                    <div className="fw-semibold">
                      {viewVehicle.createdAt ||
                        "—"}
                    </div>
                  </div>

                  <div className="col-6">
                    <small className="text-muted">
                      Updated At
                    </small>

                    <div className="fw-semibold">
                      {viewVehicle.updatedAt ||
                        "—"}
                    </div>
                  </div>

                </div>

              </div>

              <div className="modal-footer border-0 px-4 pb-4">

                <button
                  type="button"
                  className="btn btn-light rounded-3 px-4"
                  onClick={() => {
                    setShowViewModal(false);
                    setViewVehicle(null);
                  }}
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

export default VehicleManagement;

