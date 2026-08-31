import React, { useMemo, useState } from "react";
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
import { MdOutlineSchool } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const VehicleManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      vehicleNumber: "BR06PA1234",
      vehicleType: "School Bus",
      model: "Tata Starbus",
      capacity: 40,
      driverName: "Ramesh Kumar",
      driverPhone: "9876543210",
      route: "Route 01",
      status: "ACTIVE",
    },
    {
      id: 2,
      vehicleNumber: "BR06PB5678",
      vehicleType: "School Bus",
      model: "Ashok Leyland",
      capacity: 45,
      driverName: "Sanjay Kumar",
      driverPhone: "9876543211",
      route: "Route 02",
      status: "ACTIVE",
    },
    {
      id: 3,
      vehicleNumber: "BR06PC9012",
      vehicleType: "Van",
      model: "Force Traveller",
      capacity: 20,
      driverName: "Amit Kumar",
      driverPhone: "9876543212",
      route: "Route 03",
      status: "INACTIVE",
    },
    {
      id: 4,
      vehicleNumber: "BR06PD3456",
      vehicleType: "School Bus",
      model: "Tata Starbus",
      capacity: 40,
      driverName: "Vijay Kumar",
      driverPhone: "9876543213",
      route: "Route 04",
      status: "ACTIVE",
    },
  ]);

  const emptyForm = {
    vehicleNumber: "",
    vehicleType: "School Bus",
    model: "",
    capacity: "",
    status: "ACTIVE",
  };

  const [formData, setFormData] = useState(emptyForm);

  // ---------------- FILTER ----------------

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        vehicle.vehicleNumber.toLowerCase().includes(searchText) ||
        vehicle.vehicleType.toLowerCase().includes(searchText) 
        

      const matchesStatus =
        statusFilter === "ALL" || vehicle.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [vehicles, search, statusFilter]);

  // ---------------- FORM ----------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditVehicle(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (vehicle) => {
    setEditVehicle(vehicle);
    setFormData({
      vehicleNumber: vehicle.vehicleNumber,
      vehicleType: vehicle.vehicleType,
      model: vehicle.model,
      capacity: vehicle.capacity,
     
      status: vehicle.status,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editVehicle) {
      setVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle.id === editVehicle.id
            ? {
                ...vehicle,
                ...formData,
                capacity: Number(formData.capacity),
              }
            : vehicle,
        ),
      );
    } else {
      const newVehicle = {
        id: Date.now(),
        ...formData,
        capacity: Number(formData.capacity),
      };

      setVehicles((prev) => [newVehicle, ...prev]);
    }

    setShowModal(false);
    setEditVehicle(null);
    setFormData(emptyForm);
  };

  // ---------------- DELETE ----------------

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?",
    );

    if (!confirmDelete) return;

    setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
  };

  // ---------------- STATUS ----------------

  const toggleStatus = (id) => {
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === id
          ? {
              ...vehicle,
              status: vehicle.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
            }
          : vehicle,
      ),
    );
  };

  // ---------------- STATS ----------------

  const totalVehicles = vehicles.length;

  const activeVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "ACTIVE",
  ).length;

  const inactiveVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "INACTIVE",
  ).length;

  const totalCapacity = vehicles
    .filter((vehicle) => vehicle.status === "ACTIVE")
    .reduce((total, vehicle) => total + Number(vehicle.capacity || 0), 0);

  return (
    <>
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
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaBus size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">Vehicle Management</h5>

                  <div className="text-muted small">
                    Transport &nbsp;/ &nbsp; Vehicle Management
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
               
                  {/* <MdOutlineSchool className="me-1" /> */}
                  <button className=" btn btn-sm btn-primary rounded-4" onClick={openAddModal}>
                    <LuPlus className="me-1" size={20}/> Add Vehicle
                  </button>
                {/* </span> */}
              </div>
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
                Vehicle Management
              </span>
            </small>
          </div>
        </div>
      </div>

      <div className="px-2">
        <div className="row g-3 mb-4 mt-2">
          {/* Total Amount */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-blue shadow">
              <div className="stat-icon">
                <LuBus />
              </div>

              <div className="stat-content">
                <span>Total Vehicles</span>

                <h3>{totalVehicles}</h3>

                <small>↑ 10% from last month</small>
              </div>
            </div>
          </div>

          {/* Collection */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-green shadow">
              <div className="stat-icon">
                <LuCircleCheck />
              </div>

              <div className="stat-content">
                <span>Active Vehicles</span>

                <h3>{activeVehicles}</h3>

                <small>↑ 5% from last month</small>
              </div>
            </div>
          </div>

          {/* Discount */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-orange shadow">
              <div className="stat-icon">
                <LuCircleX />
              </div>

              <div className="stat-content">
                <span>Inactive Vehicles</span>

                <h3>{inactiveVehicles}</h3>

                <small>↑ 8% from this month</small>
              </div>
            </div>
          </div>

          {/* Fine */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-red shadow">
              <div className="stat-icon">
                <LuUsers />
              </div>

              <div className="stat-content">
                <span>Total Capacity</span>

                <h3>{totalCapacity}</h3>

                <small>Seats</small>
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
                  placeholder="Search vehicle..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Status */}

            <div className="col-lg-3 col-md-3 ms-auto">
              <select
                className="form-select rounded-3"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
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
                  <th>Vehicle</th>
                  <th>Type / Model</th>
                  <th>Capacity</th>
                  <th>Driver</th>
                  <th>Route</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle, index) => (
                    <tr key={vehicle.id}>
                      {/* Number */}

                      <td className="px-3 text-muted">{index + 1}</td>

                      {/* Vehicle */}

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
                              Vehicle ID: {vehicle.id}
                            </small>
                          </div>
                        </div>
                      </td>

                      {/* Type */}

                      <td>
                        <div className="fw-semibold">{vehicle.vehicleType}</div>

                        <small className="text-muted">
                          {vehicle.model || "—"}
                        </small>
                      </td>

                      {/* Capacity */}

                      <td>
                        <span className="fw-semibold">{vehicle.capacity}</span>

                        <small className="text-muted ms-1">seats</small>
                      </td>

                      {/* Driver */}

                      <td>
                        <div className="fw-semibold">{vehicle.driverName}</div>

                        <small className="text-muted">
                          {vehicle.driverPhone}
                        </small>
                      </td>

                      {/* Route */}

                      <td>
                        <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                          {vehicle.route}
                        </span>
                      </td>

                      {/* Status */}

                      <td>
                        {vehicle.status === "ACTIVE" ? (
                          <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                            <LuCircleCheck size={13} className="me-1" />
                            Active
                          </span>
                        ) : (
                          <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
                            <LuCircleX size={13} className="me-1" />
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Actions */}

                      <td>
                        <div className="d-flex justify-content-center gap-1">
                          <button
                            type="button"
                            className="btn btn-sm btn-light rounded-3"
                            title="View"
                          >
                            <LuEye size={16} />
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-light text-primary rounded-3"
                            title="Edit"
                            onClick={() => openEditModal(vehicle)}
                          >
                            <LuPencil size={16} />
                          </button>

                          <button
                            type="button"
                            className={`btn btn-sm rounded-3 ${
                              vehicle.status === "ACTIVE"
                                ? "btn-light text-danger"
                                : "btn-light text-success"
                            }`}
                            title={
                              vehicle.status === "ACTIVE"
                                ? "Deactivate"
                                : "Activate"
                            }
                            onClick={() => toggleStatus(vehicle.id)}
                          >
                            {vehicle.status === "ACTIVE" ? (
                              <LuCircleX size={16} />
                            ) : (
                              <LuCircleCheck size={16} />
                            )}
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-light text-danger rounded-3"
                            title="Delete"
                            onClick={() => handleDelete(vehicle.id)}
                          >
                            <LuTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <div className="text-muted">
                        <LuBus size={40} className="mb-2 opacity-50" />

                        <div className="fw-semibold">No vehicles found</div>

                        <small>Try changing your search or filter.</small>
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
              Showing <strong>{filteredVehicles.length}</strong> of{" "}
              <strong>{vehicles.length}</strong> vehicles
            </small>

            <small className="text-muted">
              Total active capacity: <strong>{totalCapacity}</strong> seats
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
                <div>
                  <h5 className="fw-bold mb-1">
                    {editVehicle ? "Edit Vehicle" : "Add New Vehicle"}
                  </h5>

                  <small className="text-muted">
                    Enter vehicle
                  </small>
                </div>

                <button
                  type="button"
                  className="btn btn-light rounded-3"
                  onClick={() => setShowModal(false)}
                >
                  <LuX size={18} />
                </button>
              </div>

              {/* Form */}

              <form onSubmit={handleSubmit}>
                <div className="modal-body px-4">
                  <div className="row g-3">
                    {/* Vehicle Number */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Vehicle Number
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        type="text"
                        name="vehicleNumber"
                        className="form-control"
                        placeholder="e.g. BR06PA1234"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Vehicle Type */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Vehicle Type
                        <span className="text-danger">*</span>
                      </label>

                      <select
                        name="vehicleType"
                        className="form-select"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        required
                      >
                        <option value="School Bus">School Bus</option>

                        <option value="Van">Van</option>

                        <option value="Mini Bus">Mini Bus</option>
                      </select>
                    </div>

                    {/* Model */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Vehicle Model
                      </label>

                      <input
                        type="text"
                        name="model"
                        className="form-control"
                        placeholder="e.g. Tata Starbus"
                        value={formData.model}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Capacity */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Seating Capacity
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        type="number"
                        name="capacity"
                        className="form-control"
                        placeholder="e.g. 40"
                        min="1"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    


                    

                    {/* Status */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Status</label>

                      <select
                        name="status"
                        className="form-select"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="ACTIVE">Active</option>

                        <option value="INACTIVE">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}

                <div className="modal-footer border-0 px-4 pb-4">
                  <button
                    type="button"
                    className="btn btn-light rounded-3 px-4"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary rounded-3 px-4"
                  >
                    {editVehicle ? "Update Vehicle" : "Save Vehicle"}
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

export default VehicleManagement;
