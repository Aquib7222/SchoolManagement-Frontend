
import React, { useMemo, useState } from "react";
import {
  LuUserRound,
  LuBus,
  LuRoute,
  LuMapPin,
  LuPlus,
  LuSearch,
  LuPencil,
  LuTrash2,
  LuCircleCheck,
  LuCircleX,
  LuX,
  LuGraduationCap,
} from "react-icons/lu";
import { FaBus } from "react-icons/fa";

const StudentTransportAllocation = () => {
  // ================= STUDENTS =================

  // Only students having transportRequired = YES
  const [students] = useState([
    {
      id: 1,
      admissionNumber: "ADM00001",
      studentName: "Arman Khan",
      rollNo: "01",
      studentClass: "NURSERY",
      section: "A",
      transportRequired: "YES",
    },
    {
      id: 2,
      admissionNumber: "ADM00002",
      studentName: "Ayaan Ali",
      rollNo: "02",
      studentClass: "NURSERY",
      section: "A",
      transportRequired: "YES",
    },
    {
      id: 3,
      admissionNumber: "ADM00003",
      studentName: "Rohan Kumar",
      rollNo: "03",
      studentClass: "LKG",
      section: "B",
      transportRequired: "YES",
    },
    {
      id: 4,
      admissionNumber: "ADM00004",
      studentName: "Aarav Singh",
      rollNo: "04",
      studentClass: "UKG",
      section: "A",
      transportRequired: "YES",
    },
    {
      id: 5,
      admissionNumber: "ADM00005",
      studentName: "Zoya Khan",
      rollNo: "05",
      studentClass: "1",
      section: "A",
      transportRequired: "NO",
    },
  ]);

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
      stops: [
        {
          id: 1,
          stopName: "Kalyani",
        },
        {
          id: 2,
          stopName: "Mithanpura",
        },
        {
          id: 3,
          stopName: "Ramna",
        },
        {
          id: 4,
          stopName: "Aghoria Bazar",
        },
      ],
    },
    {
      id: 2,
      routeName: "Route 02",
      startLocation: "Brahmpura",
      endLocation: "School Campus",
      stops: [
        {
          id: 5,
          stopName: "Brahmpura",
        },
        {
          id: 6,
          stopName: "Company Bagh",
        },
        {
          id: 7,
          stopName: "Imli Chatti",
        },
        {
          id: 8,
          stopName: "Akharaghat",
        },
      ],
    },
    {
      id: 3,
      routeName: "Route 03",
      startLocation: "Ahiyapur",
      endLocation: "School Campus",
      stops: [
        {
          id: 9,
          stopName: "Ahiyapur",
        },
        {
          id: 10,
          stopName: "Zero Mile",
        },
        {
          id: 11,
          stopName: "Chandwara",
        },
        {
          id: 12,
          stopName: "Motijheel",
        },
      ],
    },
  ]);

  // ================= ALLOCATIONS =================

  const [allocations, setAllocations] = useState([
    {
      id: 1,
      studentId: 1,
      vehicleId: 1,
      routeId: 1,
      stopId: 2,
      status: "ACTIVE",
    },
    {
      id: 2,
      studentId: 2,
      vehicleId: 1,
      routeId: 1,
      stopId: 3,
      status: "ACTIVE",
    },
    {
      id: 3,
      studentId: 3,
      vehicleId: 2,
      routeId: 2,
      stopId: 6,
      status: "ACTIVE",
    },
  ]);

  // ================= FORM =================

  const emptyForm = {
    studentId: "",
    vehicleId: "",
    routeId: "",
    stopId: "",
    status: "ACTIVE",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [showModal, setShowModal] = useState(false);
  const [editAllocation, setEditAllocation] = useState(null);
  const [search, setSearch] = useState("");

  // ================= TRANSPORT STUDENTS =================

  const transportStudents = useMemo(() => {
    return students.filter(
      (student) =>
        student.transportRequired === "YES"
    );
  }, [students]);

  // ================= FILTER =================

  const filteredAllocations = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return allocations.filter((allocation) => {
      const student = students.find(
        (item) => item.id === allocation.studentId
      );

      const vehicle = vehicles.find(
        (item) => item.id === allocation.vehicleId
      );

      const route = routes.find(
        (item) => item.id === allocation.routeId
      );

      const stop = route?.stops?.find(
        (item) => item.id === allocation.stopId
      );

      const studentName =
        student?.studentName?.toLowerCase() || "";

      const admissionNumber =
        student?.admissionNumber?.toLowerCase() || "";

      const studentClass =
        student?.studentClass?.toLowerCase() || "";

      const vehicleNumber =
        vehicle?.vehicleNumber?.toLowerCase() || "";

      const routeName =
        route?.routeName?.toLowerCase() || "";

      const stopName =
        stop?.stopName?.toLowerCase() || "";

      return (
        studentName.includes(searchText) ||
        admissionNumber.includes(searchText) ||
        studentClass.includes(searchText) ||
        vehicleNumber.includes(searchText) ||
        routeName.includes(searchText) ||
        stopName.includes(searchText)
      );
    });
  }, [
    allocations,
    students,
    vehicles,
    routes,
    search,
  ]);

  // ================= FORM CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // When route changes reset stop
      if (name === "routeId") {
        updated.stopId = "";
      }

      return updated;
    });
  };

  // ================= OPEN ADD =================

  const openAddModal = () => {
    setEditAllocation(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  // ================= OPEN EDIT =================

  const openEditModal = (allocation) => {
    setEditAllocation(allocation);

    setFormData({
      studentId: String(allocation.studentId),
      vehicleId: String(allocation.vehicleId),
      routeId: String(allocation.routeId),
      stopId: String(allocation.stopId),
      status: allocation.status,
    });

    setShowModal(true);
  };

  // ================= SUBMIT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.studentId ||
      !formData.vehicleId ||
      !formData.routeId ||
      !formData.stopId
    ) {
      return;
    }

    // Prevent same student from having multiple active allocations

    const duplicateStudent = allocations.find(
      (item) =>
        item.studentId ===
          Number(formData.studentId) &&
        item.id !== editAllocation?.id
    );

    if (duplicateStudent) {
      alert(
        "This student is already allocated to transport."
      );
      return;
    }

    if (editAllocation) {
      setAllocations((prev) =>
        prev.map((item) =>
          item.id === editAllocation.id
            ? {
                ...item,
                studentId: Number(
                  formData.studentId
                ),
                vehicleId: Number(
                  formData.vehicleId
                ),
                routeId: Number(
                  formData.routeId
                ),
                stopId: Number(
                  formData.stopId
                ),
                status: formData.status,
              }
            : item
        )
      );
    } else {
      const newAllocation = {
        id: Date.now(),
        studentId: Number(formData.studentId),
        vehicleId: Number(formData.vehicleId),
        routeId: Number(formData.routeId),
        stopId: Number(formData.stopId),
        status: formData.status,
      };

      setAllocations((prev) => [
        newAllocation,
        ...prev,
      ]);
    }

    closeModal();
  };

  // ================= DELETE =================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this student's transport allocation?"
    );

    if (!confirmDelete) return;

    setAllocations((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // ================= STATUS =================

  const toggleStatus = (id) => {
    setAllocations((prev) =>
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

  // ================= CLOSE MODAL =================

  const closeModal = () => {
    setShowModal(false);
    setEditAllocation(null);
    setFormData(emptyForm);
  };

  // ================= SELECTED ROUTE =================

  const selectedRoute = routes.find(
    (route) =>
      route.id === Number(formData.routeId)
  );

  // ================= STATS =================

  const totalTransportStudents =
    transportStudents.length;

  const allocatedStudents = allocations.length;

  const unallocatedStudents =
    totalTransportStudents - allocatedStudents;

  const activeAllocations = allocations.filter(
    (item) => item.status === "ACTIVE"
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
                  <LuGraduationCap size={28} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Student Transport Allocation
                  </h5>

                  <div className="text-muted small">
                    Transport &nbsp;/&nbsp; Student
                    Transport Allocation
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary rounded-4 btn-sm px-3"
                onClick={openAddModal}
              >
                <LuPlus
                  size={19}
                  className="me-1"
                />
                Allocate Transport
              </button>
            </div>
          </div>

          <div
            className="px-4 py-2"
            style={{
              backgroundColor:
                "rgba(239,246,255,.75)",
              borderTop: "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp; Transport &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Student Transport Allocation
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="px-2">
        <div className="row g-3 mb-4 mt-2">
          {/* TRANSPORT REQUIRED */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-blue shadow">
              <div className="stat-icon">
                <LuUserRound />
              </div>

              <div className="stat-content">
                <span>Transport Required</span>

                <h3>
                  {totalTransportStudents}
                </h3>

                <small>
                  Students requiring transport
                </small>
              </div>
            </div>
          </div>

          {/* ALLOCATED */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-green shadow">
              <div className="stat-icon">
                <LuCircleCheck />
              </div>

              <div className="stat-content">
                <span>Allocated</span>

                <h3>
                  {allocatedStudents}
                </h3>

                <small>
                  Transport allocated
                </small>
              </div>
            </div>
          </div>

          {/* UNALLOCATED */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-orange shadow">
              <div className="stat-icon">
                <LuCircleX />
              </div>

              <div className="stat-content">
                <span>Unallocated</span>

                <h3>
                  {unallocatedStudents > 0
                    ? unallocatedStudents
                    : 0}
                </h3>

                <small>
                  Students awaiting allocation
                </small>
              </div>
            </div>
          </div>

          {/* ACTIVE */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-red shadow">
              <div className="stat-icon">
                <LuBus />
              </div>

              <div className="stat-content">
                <span>Active Allocations</span>

                <h3>{activeAllocations}</h3>

                <small>
                  Currently using transport
                </small>
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
                      transform:
                        "translateY(-50%)",
                    }}
                  />

                  <input
                    type="text"
                    className="form-control ps-5 rounded-3"
                    placeholder="Search student, admission no, vehicle, route..."
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
                    {filteredAllocations.length}
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {allocations.length}
                  </strong>{" "}
                  allocations
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
                    <th>Student</th>
                    <th>Class</th>
                    <th>Vehicle</th>
                    <th>Route</th>
                    <th>Pickup Stop</th>
                    <th>Status</th>
                    <th className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAllocations.length >
                  0 ? (
                    filteredAllocations.map(
                      (
                        allocation,
                        index
                      ) => {
                        const student =
                          students.find(
                            (item) =>
                              item.id ===
                              allocation.studentId
                          );

                        const vehicle =
                          vehicles.find(
                            (item) =>
                              item.id ===
                              allocation.vehicleId
                          );

                        const route =
                          routes.find(
                            (item) =>
                              item.id ===
                              allocation.routeId
                          );

                        const stop =
                          route?.stops?.find(
                            (item) =>
                              item.id ===
                              allocation.stopId
                          );

                        return (
                          <tr
                            key={
                              allocation.id
                            }
                          >
                            {/* NUMBER */}

                            <td className="px-3 text-muted">
                              {index + 1}
                            </td>

                            {/* STUDENT */}

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
                                    size={19}
                                  />
                                </div>

                                <div>
                                  <div className="fw-semibold">
                                    {
                                      student?.studentName
                                    }
                                  </div>

                                  <small className="text-muted">
                                    {
                                      student?.admissionNumber
                                    }
                                  </small>
                                </div>
                              </div>
                            </td>

                            {/* CLASS */}

                            <td>
                              <div className="small">
                                <div className="fw-semibold">
                                  {
                                    student?.studentClass
                                  }
                                </div>

                                <small className="text-muted">
                                  Section{" "}
                                  {
                                    student?.section
                                  }
                                </small>
                              </div>
                            </td>

                            {/* VEHICLE */}

                            <td>
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
                                      vehicle?.vehicleNumber
                                    }
                                  </div>

                                  <small className="text-muted">
                                    {
                                      vehicle?.vehicleType
                                    }
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

                                {
                                  route?.routeName
                                }
                              </span>
                            </td>

                            {/* STOP */}

                            <td>
                              <div className="small">
                                <div className="fw-semibold">
                                  <LuMapPin
                                    size={13}
                                    className="me-1 text-success"
                                  />

                                  {
                                    stop?.stopName
                                  }
                                </div>
                              </div>
                            </td>

                            {/* STATUS */}

                            <td>
                              {allocation.status ===
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
                                      allocation
                                    )
                                  }
                                >
                                  <LuPencil
                                    size={16}
                                  />
                                </button>

                                <button
                                  type="button"
                                  className={`btn btn-sm rounded-3 ${
                                    allocation.status ===
                                    "ACTIVE"
                                      ? "btn-light text-danger"
                                      : "btn-light text-success"
                                  }`}
                                  title={
                                    allocation.status ===
                                    "ACTIVE"
                                      ? "Deactivate"
                                      : "Activate"
                                  }
                                  onClick={() =>
                                    toggleStatus(
                                      allocation.id
                                    )
                                  }
                                >
                                  {allocation.status ===
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
                                  title="Remove"
                                  onClick={() =>
                                    handleDelete(
                                      allocation.id
                                    )
                                  }
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
                        colSpan="8"
                        className="text-center py-5"
                      >
                        <div className="text-muted">
                          <LuBus
                            size={42}
                            className="mb-2 opacity-50"
                          />

                          <div className="fw-semibold">
                            No transport allocations
                            found
                          </div>

                          <small>
                            Allocate transport to
                            students who require
                            school transport.
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
                  {allocations.length}
                </strong>{" "}
                allocations
              </small>

              <small className="text-muted">
                Active{" "}
                <strong>
                  {activeAllocations}
                </strong>{" "}
                students using transport
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
                    {editAllocation
                      ? "Edit Transport Allocation"
                      : "Allocate Student Transport"}
                  </h5>

                  <small className="text-muted">
                    Select student, vehicle, route
                    and pickup stop.
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
                    {/* STUDENT */}

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Student
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <select
                        name="studentId"
                        className="form-select rounded-3"
                        value={
                          formData.studentId
                        }
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Select Student
                        </option>

                        {transportStudents.map(
                          (student) => {
                            const alreadyAllocated =
                              allocations.some(
                                (item) =>
                                  item.studentId ===
                                    student.id &&
                                  item.id !==
                                    editAllocation?.id
                              );

                            return (
                              <option
                                key={
                                  student.id
                                }
                                value={
                                  student.id
                                }
                                disabled={
                                  alreadyAllocated
                                }
                              >
                                {
                                  student.studentName
                                }{" "}
                                —{" "}
                                {
                                  student.admissionNumber
                                }{" "}
                                — Class{" "}
                                {
                                  student.studentClass
                                }{" "}
                                {alreadyAllocated
                                  ? "(Already Allocated)"
                                  : ""}
                              </option>
                            );
                          }
                        )}
                      </select>

                      <small className="text-muted">
                        Only students with Transport
                        Required = YES are shown.
                      </small>
                    </div>

                    {/* VEHICLE */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Vehicle
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <select
                        name="vehicleId"
                        className="form-select rounded-3"
                        value={
                          formData.vehicleId
                        }
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Select Vehicle
                        </option>

                        {vehicles.map(
                          (vehicle) => (
                            <option
                              key={
                                vehicle.id
                              }
                              value={
                                vehicle.id
                              }
                            >
                              {
                                vehicle.vehicleNumber
                              }{" "}
                              —{" "}
                              {
                                vehicle.vehicleType
                              }
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* ROUTE */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Route
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <select
                        name="routeId"
                        className="form-select rounded-3"
                        value={
                          formData.routeId
                        }
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Select Route
                        </option>

                        {routes.map(
                          (route) => (
                            <option
                              key={route.id}
                              value={route.id}
                            >
                              {
                                route.routeName
                              }{" "}
                              —{" "}
                              {
                                route.startLocation
                              }{" "}
                              →{" "}
                              {
                                route.endLocation
                              }
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* STOP */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Pickup Stop
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <select
                        name="stopId"
                        className="form-select rounded-3"
                        value={
                          formData.stopId
                        }
                        onChange={handleChange}
                        required
                        disabled={
                          !formData.routeId
                        }
                      >
                        <option value="">
                          {formData.routeId
                            ? "Select Pickup Stop"
                            : "Select Route First"}
                        </option>

                        {selectedRoute?.stops?.map(
                          (stop) => (
                            <option
                              key={stop.id}
                              value={stop.id}
                            >
                              {
                                stop.stopName
                              }
                            </option>
                          )
                        )}
                      </select>

                      <small className="text-muted">
                        Pickup stop must belong to
                        selected route.
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
                    {editAllocation
                      ? "Update Allocation"
                      : "Allocate Transport"}
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

export default StudentTransportAllocation;
