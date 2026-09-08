
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  LuUserRound,
  LuPlus,
  LuSearch,
  LuPencil,
  LuTrash2,
  LuCircleCheck,
  LuCircleX,
  LuX,
  LuPhone,
  LuCreditCard,
  LuCalendarDays,
} from "react-icons/lu";
import { FaBus } from "react-icons/fa";

const DriverManagement = () => {
  // =====================================================
  // CONFIG
  // =====================================================

  const token = localStorage.getItem("token");
  const schoolId = localStorage.getItem("schoolId");

  const API_URL = "http://localhost:8080/api/transport/drivers";
  const VEHICLE_API_URL = "http://localhost:8080/api/transport/vehicles";

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =====================================================
  // SAFE ARRAY EXTRACTOR
  // =====================================================

  const extractArray = (response) => {
    const data = response?.data;

    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data?.data)) {
      return data.data;
    }

    if (Array.isArray(data?.content)) {
      return data.content;
    }

    if (Array.isArray(data?.drivers)) {
      return data.drivers;
    }

    if (Array.isArray(data?.vehicles)) {
      return data.vehicles;
    }

    return [];
  };

  // =====================================================
  // VEHICLES
  // =====================================================

  const [vehicles, setVehicles] = useState([]);

  const [loadingVehicles, setLoadingVehicles] = useState(false);

  // =====================================================
  // DRIVERS
  // =====================================================

  const [drivers, setDrivers] = useState([]);

  const [loadingDrivers, setLoadingDrivers] = useState(false);

  const [saving, setSaving] = useState(false);

  // =====================================================
  // FORM
  // =====================================================

  const emptyForm = {
    driverName: "",
    mobileNumber: "",
    alternateMobile: "",
    licenseNumber: "",
    licenseType: "HMV",
    licenseExpiryDate: "",
    address: "",
    vehicleId: "",
    status: "ACTIVE",
  };

  const [formData, setFormData] = useState(emptyForm);

  const [showModal, setShowModal] = useState(false);

  const [editDriver, setEditDriver] = useState(null);

  const [search, setSearch] = useState("");

  // =====================================================
  // GET VEHICLES
  // =====================================================

  const fetchVehicles = async () => {
    if (!schoolId) {
      console.warn("schoolId not found in localStorage");
      setVehicles([]);
      return;
    }

    try {
      setLoadingVehicles(true);

      const response = await axios.get(
        VEHICLE_API_URL,
        {
          params: {
            schoolId: schoolId,
          },
          ...authConfig,
        }
      );

      const vehicleList = extractArray(response);

      setVehicles(vehicleList);
    } catch (error) {
      console.error(
        "Error loading vehicles:",
        error
      );

      setVehicles([]);

      const message =
        error?.response?.data?.message ||
        "Failed to load vehicles.";

      console.error(message);
    } finally {
      setLoadingVehicles(false);
    }
  };
console.log("Vehicles:", vehicles);
  // =====================================================
  // GET DRIVERS
  // =====================================================

  const fetchDrivers = async () => {
    if (!schoolId) {
      console.warn("schoolId not found in localStorage");
      setDrivers([]);
      return;
    }

    try {
      setLoadingDrivers(true);

      const response = await axios.get(
        API_URL,
        {
          params: {
            schoolId: schoolId,
          },
          ...authConfig,
        }
      );

      console.log(
        "Driver API response:",
        response.data
      );

      const driverList = extractArray(response);

      setDrivers(driverList);
    } catch (error) {
      console.error(
        "Error loading drivers:",
        error
      );

      setDrivers([]);

      const message =
        error?.response?.data?.message ||
        "Failed to load drivers.";

      alert(message);
    } finally {
      setLoadingDrivers(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    if (schoolId) {
      fetchVehicles();
      fetchDrivers();
    }
  }, [schoolId]);

  // =====================================================
  // VEHICLE ID NORMALIZER
  // =====================================================

  const getVehicleId = (driver) => {
    if (!driver) return null;

    return (
      driver.vehicleId ??
      driver.vehicle?.id ??
      null
    );
  };

  // =====================================================
  // VEHICLE FIND
  // =====================================================

  const getVehicle = (vehicleId) => {
    if (!vehicleId) return null;

    return vehicles.find(
      (vehicle) =>
        Number(vehicle.id) === Number(vehicleId)
    );
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredDrivers = useMemo(() => {
    // Safety check
    if (!Array.isArray(drivers)) {
      return [];
    }

    const searchText =
      search.toLowerCase().trim();

    if (!searchText) {
      return drivers;
    }

    return drivers.filter((driver) => {
      const vehicleId =
        getVehicleId(driver);

      const vehicle =
        getVehicle(vehicleId);

      const driverName =
        driver?.driverName
          ?.toLowerCase() || "";

      const mobileNumber =
        driver?.mobileNumber
          ?.toLowerCase() || "";

      const alternateMobile =
        driver?.alternateMobile
          ?.toLowerCase() || "";

      const licenseNumber =
        driver?.licenseNumber
          ?.toLowerCase() || "";

      const licenseType =
        driver?.licenseType
          ?.toLowerCase() || "";

      const address =
        driver?.address
          ?.toLowerCase() || "";

      const vehicleNumber =
        vehicle?.vehicleNumber
          ?.toLowerCase() || "";

      return (
        driverName.includes(searchText) ||
        mobileNumber.includes(searchText) ||
        alternateMobile.includes(searchText) ||
        licenseNumber.includes(searchText) ||
        licenseType.includes(searchText) ||
        address.includes(searchText) ||
        vehicleNumber.includes(searchText)
      );
    });
  }, [drivers, vehicles, search]);

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
  // ADD MODAL
  // =====================================================

  const openAddModal = () => {
    setEditDriver(null);
    setFormData({
      ...emptyForm,
    });

    setShowModal(true);
  };

  // =====================================================
  // EDIT MODAL
  // =====================================================

  const openEditModal = (driver) => {
    setEditDriver(driver);

    setFormData({
      driverName:
        driver?.driverName || "",

      mobileNumber:
        driver?.mobileNumber || "",

      alternateMobile:
        driver?.alternateMobile || "",

      licenseNumber:
        driver?.licenseNumber || "",

      licenseType:
        driver?.licenseType || "HMV",

      licenseExpiryDate:
        driver?.licenseExpiryDate || "",

      address:
        driver?.address || "",

      vehicleId:
        getVehicleId(driver)
          ? String(getVehicleId(driver))
          : "",

      status:
        driver?.status || "ACTIVE",
    });

    setShowModal(true);
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!schoolId) {
      alert("School ID not found.");
      return;
    }

    if (
      !formData.driverName.trim() ||
      !formData.mobileNumber.trim() ||
      !formData.licenseNumber.trim() ||
      !formData.licenseExpiryDate
    ) {
      alert(
        "Please fill all required fields."
      );

      return;
    }

    // =================================================
    // DUPLICATE LICENSE
    // =================================================

    const duplicateLicense =
      drivers.find(
        (item) =>
          item?.licenseNumber
            ?.toLowerCase()
            .trim() ===
            formData.licenseNumber
              .toLowerCase()
              .trim() &&
          Number(item.id) !==
            Number(editDriver?.id)
      );

    if (duplicateLicense) {
      alert(
        "This license number is already registered."
      );

      return;
    }

    // =================================================
    // DUPLICATE VEHICLE
    // =================================================

    if (formData.vehicleId) {
      const duplicateVehicle =
        drivers.find((item) => {
          const itemVehicleId =
            getVehicleId(item);

          return (
            Number(itemVehicleId) ===
              Number(formData.vehicleId) &&
            Number(item.id) !==
              Number(editDriver?.id)
          );
        });

      if (duplicateVehicle) {
        alert(
          "This vehicle is already assigned to another driver."
        );

        return;
      }
    }

    // =================================================
    // PAYLOAD
    // =================================================

    const payload = {
      schoolId: Number(schoolId),

      driverName:
        formData.driverName.trim(),

      mobileNumber:
        formData.mobileNumber.trim(),

      alternateMobile:
        formData.alternateMobile.trim() ||
        null,

      licenseNumber:
        formData.licenseNumber.trim(),

      licenseType:
        formData.licenseType,

      licenseExpiryDate:
        formData.licenseExpiryDate,

      address:
        formData.address.trim() || null,

      vehicleId:
        formData.vehicleId
          ? Number(formData.vehicleId)
          : null,

      status:
        formData.status,
    };

    try {
      setSaving(true);

      // =================================================
      // UPDATE
      // =================================================

      if (editDriver) {
        const response =
          await axios.put(
            `${API_URL}/${editDriver.id}`,
            payload,
            authConfig
          );

        console.log(
          "Driver updated:",
          response.data
        );

        alert(
          "Driver updated successfully."
        );
      }

      // =================================================
      // CREATE
      // =================================================

      else {
        const response =
          await axios.post(
            API_URL,
            payload,
            authConfig
          );

        console.log(
          "Driver created:",
          response.data
        );

        alert(
          "Driver added successfully."
        );
      }

      closeModal();

      await fetchDrivers();
    } catch (error) {
      console.error(
        "Error saving driver:",
        error
      );

      console.error(
        "Response:",
        error?.response?.data
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to save driver.";

      alert(message);
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this driver?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      setSaving(true);

      await axios.delete(
        `${API_URL}/${id}`,
        {
          params: {
            schoolId: schoolId,
          },
          ...authConfig,
        }
      );

      alert(
        "Driver deleted successfully."
      );

      await fetchDrivers();
    } catch (error) {
      console.error(
        "Error deleting driver:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to delete driver.";

      alert(message);
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const toggleStatus = async (driver) => {
    if (!driver?.id) {
      return;
    }

    const newStatus =
      driver.status === "ACTIVE"
        ? "INACTIVE"
        : "ACTIVE";

    try {
      setSaving(true);

      const payload = {
        schoolId: Number(schoolId),

        driverName:
          driver.driverName,

        mobileNumber:
          driver.mobileNumber,

        alternateMobile:
          driver.alternateMobile || null,

        licenseNumber:
          driver.licenseNumber,

        licenseType:
          driver.licenseType,

        licenseExpiryDate:
          driver.licenseExpiryDate,

        address:
          driver.address || null,

        vehicleId:
          getVehicleId(driver),

        status:
          newStatus,
      };

      await axios.put(
        `${API_URL}/${driver.id}`,
        payload,
        authConfig
      );

      await fetchDrivers();
    } catch (error) {
      console.error(
        "Error changing driver status:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to update driver status.";

      alert(message);
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    setShowModal(false);

    setEditDriver(null);

    setFormData({
      ...emptyForm,
    });
  };

  // =====================================================
  // STATS
  // =====================================================

  const totalDrivers =
    Array.isArray(drivers)
      ? drivers.length
      : 0;

  const activeDrivers =
    Array.isArray(drivers)
      ? drivers.filter(
          (item) =>
            item?.status === "ACTIVE"
        ).length
      : 0;

  const inactiveDrivers =
    Array.isArray(drivers)
      ? drivers.filter(
          (item) =>
            item?.status === "INACTIVE"
        ).length
      : 0;

  const assignedDrivers =
    Array.isArray(drivers)
      ? drivers.filter(
          (item) =>
            getVehicleId(item)
        ).length
      : 0;

  const unassignedDrivers =
    totalDrivers - assignedDrivers;

  // =====================================================
  // LICENSE EXPIRY
  // =====================================================

  const getLicenseExpiryStatus = (
    date
  ) => {
    if (!date) {
      return "normal";
    }

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const expiry = new Date(date);

    expiry.setHours(
      0,
      0,
      0,
      0
    );

    const diff =
      (expiry - today) /
      (1000 * 60 * 60 * 24);

    if (diff < 0) {
      return "expired";
    }

    if (diff <= 30) {
      return "warning";
    }

    return "normal";
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mx-2 mt-2 mb-3">
        <div
          className="rounded-4 shadow overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
            border:
              "1px solid #dbeafe",
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
                  <LuUserRound
                    size={28}
                  />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Driver Management
                  </h5>

                  <div className="text-muted small">
                    Transport &nbsp;/&nbsp;
                    Driver Management
                  </div>
                </div>

              </div>

              <button
                className="btn btn-primary rounded-4 btn-sm px-3"
                onClick={
                  openAddModal
                }
                disabled={saving}
              >
                <LuPlus
                  size={19}
                  className="me-1"
                />

                Add Driver
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
                Driver Management
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =================================================
          STATS
      ================================================= */}

      <div className="px-2">
        <div className="row g-3 mb-4 mt-2">

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-blue shadow">
              <div className="stat-icon">
                <LuUserRound />
              </div>

              <div className="stat-content">
                <span>
                  Total Drivers
                </span>

                <h3>
                  {totalDrivers}
                </h3>

                <small>
                  Registered drivers
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-green shadow">
              <div className="stat-icon">
                <LuCircleCheck />
              </div>

              <div className="stat-content">
                <span>
                  Active Drivers
                </span>

                <h3>
                  {activeDrivers}
                </h3>

                <small>
                  Currently active
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-orange shadow">
              <div className="stat-icon">
                <LuCircleX />
              </div>

              <div className="stat-content">
                <span>
                  Inactive Drivers
                </span>

                <h3>
                  {inactiveDrivers}
                </h3>

                <small>
                  Currently inactive
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-red shadow">
              <div className="stat-icon">
                <FaBus />
              </div>

              <div className="stat-content">
                <span>
                  Vehicle Assigned
                </span>

                <h3>
                  {assignedDrivers}
                </h3>

                <small>
                  {unassignedDrivers} driver
                  {unassignedDrivers !== 1
                    ? "s"
                    : ""}{" "}
                  unassigned
                </small>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =================================================
          MAIN CARD
      ================================================= */}

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
                      transform:
                        "translateY(-50%)",
                    }}
                  />

                  <input
                    type="text"
                    className="form-control ps-5 rounded-3"
                    placeholder="Search driver, mobile, license or vehicle..."
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              <div className="col-lg-5 col-md-5 text-md-end">

                <span className="text-muted small">

                  Showing{" "}

                  <strong>
                    {
                      filteredDrivers.length
                    }
                  </strong>{" "}

                  of{" "}

                  <strong>
                    {totalDrivers}
                  </strong>{" "}

                  drivers

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
                    <th className="px-3">
                      #
                    </th>

                    <th>
                      Driver
                    </th>

                    <th>
                      Contact
                    </th>

                    <th>
                      License
                    </th>

                    <th>
                      Vehicle
                    </th>

                    <th>
                      Status
                    </th>

                    <th className="text-center">
                      Action
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {loadingDrivers ? (

                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-5"
                      >
                        <div className="spinner-border text-primary" />
                        <div className="small text-muted mt-2">
                          Loading drivers...
                        </div>
                      </td>
                    </tr>

                  ) : filteredDrivers.length >
                    0 ? (

                    filteredDrivers.map(
                      (driver, index) => {

                        const vehicleId =
                          getVehicleId(
                            driver
                          );

                        const vehicle =
                          getVehicle(
                            vehicleId
                          );

                        const expiryStatus =
                          getLicenseExpiryStatus(
                            driver?.licenseExpiryDate
                          );

                        return (
                          <tr
                            key={
                              driver?.id ||
                              index
                            }
                          >

                            {/* NUMBER */}

                            <td className="px-3 text-muted">
                              {index + 1}
                            </td>

                            {/* DRIVER */}

                            <td>

                              <div className="d-flex align-items-center gap-2">

                                <div
                                  className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                                  style={{
                                    width: 42,
                                    height: 42,
                                  }}
                                >
                                  <LuUserRound
                                    size={20}
                                  />
                                </div>

                                <div>

                                  <div className="fw-semibold">
                                    {
                                      driver?.driverName ||
                                      "—"
                                    }
                                  </div>

                                  <small className="text-muted">
                                    {
                                      driver?.address ||
                                      "Address not available"
                                    }
                                  </small>

                                </div>

                              </div>

                            </td>

                            {/* CONTACT */}

                            <td>

                              <div className="small">

                                <div className="fw-semibold">

                                  <LuPhone
                                    size={13}
                                    className="me-1 text-primary"
                                  />

                                  {
                                    driver?.mobileNumber ||
                                    "—"
                                  }

                                </div>

                                {driver?.alternateMobile && (
                                  <div className="text-muted mt-1">
                                    Alt:{" "}
                                    {
                                      driver.alternateMobile
                                    }
                                  </div>
                                )}

                              </div>

                            </td>

                            {/* LICENSE */}

                            <td>

                              <div className="small">

                                <div className="fw-semibold">

                                  <LuCreditCard
                                    size={13}
                                    className="me-1 text-primary"
                                  />

                                  {
                                    driver?.licenseNumber ||
                                    "—"
                                  }

                                </div>

                                <div className="mt-1">

                                  <span className="badge bg-secondary-subtle text-secondary rounded-pill px-2 py-1">

                                    {
                                      driver?.licenseType ||
                                      "—"
                                    }

                                  </span>

                                </div>

                                <div
                                  className={`mt-1 ${
                                    expiryStatus ===
                                    "expired"
                                      ? "text-danger"
                                      : expiryStatus ===
                                        "warning"
                                      ? "text-warning"
                                      : "text-muted"
                                  }`}
                                >

                                  <LuCalendarDays
                                    size={12}
                                    className="me-1"
                                  />

                                  Exp:{" "}

                                  {
                                    driver?.licenseExpiryDate ||
                                    "—"
                                  }

                                  {expiryStatus ===
                                    "expired" && (
                                    <span className="ms-1 fw-semibold">
                                      Expired
                                    </span>
                                  )}

                                  {expiryStatus ===
                                    "warning" && (
                                    <span className="ms-1 fw-semibold">
                                      Expiring Soon
                                    </span>
                                  )}

                                </div>

                              </div>

                            </td>

                            {/* VEHICLE */}

                            <td>

                              {vehicle ? (

                                <div className="d-flex align-items-center gap-2">

                                  <div
                                    className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center"
                                    style={{
                                      width: 40,
                                      height: 40,
                                    }}
                                  >
                                    <FaBus
                                      size={17}
                                    />
                                  </div>

                                  <div>

                                    <div className="fw-semibold">
                                      {
                                        vehicle.vehicleNumber
                                      }
                                    </div>

                                    <small className="text-muted">
                                      {
                                        vehicle.vehicleType
                                      }
                                    </small>

                                  </div>

                                </div>

                              ) : (

                                <span className="badge bg-warning-subtle text-warning rounded-pill px-3 py-2">
                                  Not Assigned
                                </span>

                              )}

                            </td>

                            {/* STATUS */}

                            <td>

                              {driver?.status ===
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
                                      driver
                                    )
                                  }
                                  disabled={saving}
                                >
                                  <LuPencil
                                    size={16}
                                  />
                                </button>

                                <button
                                  type="button"
                                  className={`btn btn-sm rounded-3 ${
                                    driver?.status ===
                                    "ACTIVE"
                                      ? "btn-light text-danger"
                                      : "btn-light text-success"
                                  }`}
                                  title={
                                    driver?.status ===
                                    "ACTIVE"
                                      ? "Deactivate"
                                      : "Activate"
                                  }
                                  onClick={() =>
                                    toggleStatus(
                                      driver
                                    )
                                  }
                                  disabled={saving}
                                >
                                  {driver?.status ===
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

                                <button
                                  type="button"
                                  className="btn btn-sm btn-light text-danger rounded-3"
                                  title="Delete"
                                  onClick={() =>
                                    handleDelete(
                                      driver.id
                                    )
                                  }
                                  disabled={saving}
                                >
                                  <LuTrash2
                                    size={16}
                                  />
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

                          <LuUserRound
                            size={42}
                            className="mb-2 opacity-50"
                          />

                          <div className="fw-semibold">
                            No drivers found
                          </div>

                          <small>
                            Try changing your
                            search or add a
                            new driver.
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
                  {totalDrivers}
                </strong>{" "}

                drivers

              </small>

              <small className="text-muted">

                <strong>
                  {assignedDrivers}
                </strong>{" "}

                vehicles assigned

              </small>

            </div>

          </div>

        </div>
      </div>

      {/* =================================================
          MODAL
      ================================================= */}

      {showModal && (

        <div
          className="modal d-block mt-4"
          tabIndex="-1"
          style={{
            background:
              "rgba(0,0,0,0.45)",
          }}
        >

          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">

            <div className="modal-content border-0 rounded-4 shadow">

              {/* HEADER */}

              <div className="modal-header border-0 px-4 pt-4 d-flex justify-content-between align-items-center">

                <div>

                  <h5 className="fw-bold mb-1">

                    {editDriver
                      ? "Edit Driver"
                      : "Add Driver"}

                  </h5>

                  <small className="text-muted">
                    Add driver details and
                    assign a vehicle.
                  </small>

                </div>

                <button
                  type="button"
                  className="btn btn-light rounded-3 align-self-start px-3 py-2 ms-2 "
                  onClick={
                    closeModal
                  }
                  disabled={saving}
                >
                  <LuX
                    size={18}
                  />
                </button>

              </div>

              {/* FORM */}

              <form
                onSubmit={
                  handleSubmit
                }
              >

                <div className="modal-body px-4">

                  <div className="row g-3">

                    {/* DRIVER NAME */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">

                        Driver Name

                        <span className="text-danger">
                          *
                        </span>

                      </label>

                      <input
                        type="text"
                        name="driverName"
                        className="form-control rounded-3"
                        placeholder="Enter driver name"
                        value={
                          formData.driverName
                        }
                        onChange={
                          handleChange
                        }
                        required
                      />

                    </div>

                    {/* MOBILE */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">

                        Mobile Number

                        <span className="text-danger">
                          *
                        </span>

                      </label>

                      <input
                        type="tel"
                        name="mobileNumber"
                        className="form-control rounded-3"
                        placeholder="Enter mobile number"
                        value={
                          formData.mobileNumber
                        }
                        onChange={
                          handleChange
                        }
                        maxLength="10"
                        required
                      />

                    </div>

                    {/* ALTERNATE */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Alternate Mobile
                      </label>

                      <input
                        type="tel"
                        name="alternateMobile"
                        className="form-control rounded-3"
                        placeholder="Enter alternate mobile"
                        value={
                          formData.alternateMobile
                        }
                        onChange={
                          handleChange
                        }
                        maxLength="10"
                      />

                    </div>

                    {/* LICENSE */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">

                        License Number

                        <span className="text-danger">
                          *
                        </span>

                      </label>

                      <input
                        type="text"
                        name="licenseNumber"
                        className="form-control rounded-3"
                        placeholder="Enter license number"
                        value={
                          formData.licenseNumber
                        }
                        onChange={
                          handleChange
                        }
                        required
                      />

                    </div>

                    {/* LICENSE TYPE */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">

                        License Type

                        <span className="text-danger">
                          *
                        </span>

                      </label>

                      <select
                        name="licenseType"
                        className="form-select rounded-3"
                        value={
                          formData.licenseType
                        }
                        onChange={
                          handleChange
                        }
                        required
                      >

                        <option value="">
                          Select License Type
                        </option>

                        <option value="LMV">
                          LMV
                        </option>

                        <option value="HMV">
                          HMV
                        </option>

                        <option value="TRANSPORT">
                          Transport
                        </option>

                        <option value="OTHER">
                          Other
                        </option>

                      </select>

                    </div>

                    {/* EXPIRY */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">

                        License Expiry Date

                        <span className="text-danger">
                          *
                        </span>

                      </label>

                      <input
                        type="date"
                        name="licenseExpiryDate"
                        className="form-control rounded-3"
                        value={
                          formData.licenseExpiryDate
                        }
                        onChange={
                          handleChange
                        }
                        required
                      />

                    </div>

                    {/* VEHICLE */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Assign Vehicle
                      </label>

                      <select
                        name="vehicleId"
                        className="form-select rounded-3"
                        value={
                          formData.vehicleId
                        }
                        onChange={
                          handleChange
                        }
                        disabled={
                          loadingVehicles
                        }
                      >

                        <option value="">
                          No Vehicle / Later
                        </option>

                        {vehicles.map(
                          (vehicle) => {

                            const alreadyAssigned =
                              drivers.some(
                                (item) =>
                                  Number(
                                    getVehicleId(
                                      item
                                    )
                                  ) ===
                                    Number(
                                      vehicle.id
                                    ) &&
                                  Number(
                                    item.id
                                  ) !==
                                    Number(
                                      editDriver?.id
                                    )
                              );

                            return (
                              <option
                                key={
                                  vehicle.id
                                }
                                value={
                                  vehicle.id
                                }
                                disabled={
                                  alreadyAssigned
                                }
                              >

                                {
                                  vehicle.vehicleNumber
                                }

                                {" — "}

                                {
                                  vehicle.vehicleType
                                }

                                {alreadyAssigned
                                  ? " (Already Assigned)"
                                  : ""}

                              </option>
                            );
                          }
                        )}

                      </select>

                      <small className="text-muted">

                        A vehicle can be
                        assigned to only
                        one driver.

                      </small>

                    </div>

                    {/* STATUS */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Status
                      </label>

                      <select
                        name="status"
                        className="form-select rounded-3"
                        value={
                          formData.status
                        }
                        onChange={
                          handleChange
                        }
                      >

                        <option value="ACTIVE">
                          Active
                        </option>

                        <option value="INACTIVE">
                          Inactive
                        </option>

                      </select>

                    </div>

                    {/* ADDRESS */}

                    <div className="col-12">

                      <label className="form-label fw-semibold">
                        Address
                      </label>

                      <textarea
                        name="address"
                        className="form-control rounded-3"
                        rows="3"
                        placeholder="Enter driver address"
                        value={
                          formData.address
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>

                  </div>

                </div>

                {/* FOOTER */}

                <div className="modal-footer border-0 px-4 pb-4">

                  <button
                    type="button"
                    className="btn btn-light rounded-3 px-4"
                    onClick={
                      closeModal
                    }
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
                      editDriver
                        ? "Update Driver"
                        : "Add Driver"
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

export default DriverManagement;

