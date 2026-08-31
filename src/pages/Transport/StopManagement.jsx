
import React, { useMemo, useState } from "react";
import {
  LuSearch,
  LuMapPin,
  LuRoute,
  LuBus,
  LuUserRound,
  LuPhone,
  LuCircleCheck,
  LuCircleX,
  LuX,
  LuEye,
} from "react-icons/lu";

const StopManagement = () => {
  const [search, setSearch] = useState("");
  const [selectedStop, setSelectedStop] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // =========================================================
  // DEMO ROUTE + BUS DATA
  // Later this data can come from API
  // =========================================================

  const stopData = [
    {
      id: 1,
      stopName: "Brahampura",
      location: "Brahampura, Muzaffarpur",
      routes: [
        {
          routeName: "Route 01",
          busNumber: "BR06PA1234",
          busType: "School Bus",
          driverName: "Ramesh Kumar",
          driverPhone: "9876543210",
          status: "ACTIVE",
        },
      ],
    },

    {
      id: 2,
      stopName: "Company Bagh",
      location: "Company Bagh, Muzaffarpur",
      routes: [
        {
          routeName: "Route 01",
          busNumber: "BR06PA1234",
          busType: "School Bus",
          driverName: "Ramesh Kumar",
          driverPhone: "9876543210",
          status: "ACTIVE",
        },
        {
          routeName: "Route 04",
          busNumber: "BR06PD3456",
          busType: "School Bus",
          driverName: "Vijay Kumar",
          driverPhone: "9876543213",
          status: "ACTIVE",
        },
      ],
    },

    {
      id: 3,
      stopName: "Mithanpura",
      location: "Mithanpura, Muzaffarpur",
      routes: [
        {
          routeName: "Route 01",
          busNumber: "BR06PA1234",
          busType: "School Bus",
          driverName: "Ramesh Kumar",
          driverPhone: "9876543210",
          status: "ACTIVE",
        },
      ],
    },

    {
      id: 4,
      stopName: "Ramdayalu",
      location: "Ramdayalu Nagar, Muzaffarpur",
      routes: [
        {
          routeName: "Route 01",
          busNumber: "BR06PA1234",
          busType: "School Bus",
          driverName: "Ramesh Kumar",
          driverPhone: "9876543210",
          status: "ACTIVE",
        },
        {
          routeName: "Route 02",
          busNumber: "BR06PB5678",
          busType: "School Bus",
          driverName: "Sanjay Kumar",
          driverPhone: "9876543211",
          status: "ACTIVE",
        },
      ],
    },

    {
      id: 5,
      stopName: "Kanti Chowk",
      location: "Kanti, Muzaffarpur",
      routes: [
        {
          routeName: "Route 02",
          busNumber: "BR06PB5678",
          busType: "School Bus",
          driverName: "Sanjay Kumar",
          driverPhone: "9876543211",
          status: "ACTIVE",
        },
      ],
    },

    {
      id: 6,
      stopName: "Madhopur",
      location: "Madhopur, Muzaffarpur",
      routes: [
        {
          routeName: "Route 02",
          busNumber: "BR06PB5678",
          busType: "School Bus",
          driverName: "Sanjay Kumar",
          driverPhone: "9876543211",
          status: "ACTIVE",
        },
      ],
    },

    {
      id: 7,
      stopName: "Bakhri",
      location: "Bakhri, Muzaffarpur",
      routes: [
        {
          routeName: "Route 02",
          busNumber: "BR06PB5678",
          busType: "School Bus",
          driverName: "Sanjay Kumar",
          driverPhone: "9876543211",
          status: "ACTIVE",
        },
      ],
    },

    {
      id: 8,
      stopName: "Ahiyapur",
      location: "Ahiyapur, Muzaffarpur",
      routes: [
        {
          routeName: "Route 02",
          busNumber: "BR06PB5678",
          busType: "School Bus",
          driverName: "Sanjay Kumar",
          driverPhone: "9876543211",
          status: "ACTIVE",
        },
      ],
    },

    {
      id: 9,
      stopName: "Zero Mile",
      location: "Zero Mile, Muzaffarpur",
      routes: [
        {
          routeName: "Route 04",
          busNumber: "BR06PD3456",
          busType: "School Bus",
          driverName: "Vijay Kumar",
          driverPhone: "9876543213",
          status: "ACTIVE",
        },
      ],
    },

    {
      id: 10,
      stopName: "Akharaghat",
      location: "Akharaghat, Muzaffarpur",
      routes: [
        {
          routeName: "Route 04",
          busNumber: "BR06PD3456",
          busType: "School Bus",
          driverName: "Vijay Kumar",
          driverPhone: "9876543213",
          status: "ACTIVE",
        },
      ],
    },
  ];

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredStops = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return stopData;
    }

    return stopData.filter((stop) => {
      const stopMatch =
        stop.stopName.toLowerCase().includes(searchText) ||
        stop.location.toLowerCase().includes(searchText);

      const routeMatch = stop.routes.some(
        (route) =>
          route.routeName
            .toLowerCase()
            .includes(searchText) ||
          route.busNumber
            .toLowerCase()
            .includes(searchText) ||
          route.driverName
            .toLowerCase()
            .includes(searchText),
      );

      return stopMatch || routeMatch;
    });
  }, [search]);

  // =========================================================
  // STATS
  // =========================================================

  const totalStops = stopData.length;

  const totalRoutes = new Set(
    stopData.flatMap((stop) =>
      stop.routes.map((route) => route.routeName),
    ),
  ).size;

  const totalBuses = new Set(
    stopData.flatMap((stop) =>
      stop.routes.map((route) => route.busNumber),
    ),
  ).size;

  const activeBuses = new Set(
    stopData.flatMap((stop) =>
      stop.routes
        .filter((route) => route.status === "ACTIVE")
        .map((route) => route.busNumber),
    ),
  ).size;

  // =========================================================
  // VIEW STOP
  // =========================================================

  const openStopDetails = (stop) => {
    setSelectedStop(stop);
    setShowModal(true);
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
                  <LuMapPin size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Stop Management
                  </h5>

                  <div className="text-muted small">
                    Transport &nbsp;/&nbsp; Stop Management
                  </div>
                </div>

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
                Stop Management
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

          {/* Total Stops */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-blue shadow">

              <div className="stat-icon">
                <LuMapPin />
              </div>

              <div className="stat-content">

                <span>Total Stops</span>

                <h3>{totalStops}</h3>

                <small>Registered transport stops</small>

              </div>

            </div>

          </div>

          {/* Total Routes */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-green shadow">

              <div className="stat-icon">
                <LuRoute />
              </div>

              <div className="stat-content">

                <span>Total Routes</span>

                <h3>{totalRoutes}</h3>

                <small>Connected routes</small>

              </div>

            </div>

          </div>

          {/* Total Buses */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-orange shadow">

              <div className="stat-icon">
                <LuBus />
              </div>

              <div className="stat-content">

                <span>Total Buses</span>

                <h3>{totalBuses}</h3>

                <small>Assigned buses</small>

              </div>

            </div>

          </div>

          {/* Active Buses */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-red shadow">

              <div className="stat-icon">
                <LuCircleCheck />
              </div>

              <div className="stat-content">

                <span>Active Buses</span>

                <h3>{activeBuses}</h3>

                <small>Currently running</small>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          SEARCH CARD
      ===================================================== */}

      <div className="px-2">

        <div className="card border-0 shadow rounded-4">

          <div className="card-header bg-white border-0 p-3">

            <div className="row align-items-center g-3">

              <div className="col-lg-7">

                <div className="position-relative">

                  <LuSearch
                    size={19}
                    className="position-absolute text-muted"
                    style={{
                      left: 13,
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                    }}
                  />

                  <input
                    type="text"
                    className="form-control ps-5 rounded-3"
                    placeholder="Search stop, route, bus number or driver..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                </div>

              </div>

              <div className="col-lg-5">

                <div className="text-lg-end text-muted small">

                  Search any stop to see its
                  <strong className="text-primary ms-1">
                    route & bus details
                  </strong>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="card-body p-0">

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead className="table-light">

                  <tr>

                    <th className="px-3">
                      #
                    </th>

                    <th>
                      Stop
                    </th>

                    <th>
                      Routes
                    </th>

                    <th>
                      Buses
                    </th>

                    <th>
                      Drivers
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

                  {filteredStops.length > 0 ? (

                    filteredStops.map(
                      (stop, index) => (

                        <tr key={stop.id}>

                          {/* Number */}

                          <td className="px-3 text-muted">
                            {index + 1}
                          </td>

                          {/* Stop */}

                          <td>

                            <div className="d-flex align-items-center gap-2">

                              <div
                                className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                                style={{
                                  width: 42,
                                  height: 42,
                                }}
                              >
                                <LuMapPin
                                  size={21}
                                />
                              </div>

                              <div>

                                <div className="fw-semibold">
                                  {stop.stopName}
                                </div>

                                <small className="text-muted">
                                  {stop.location}
                                </small>

                              </div>

                            </div>

                          </td>

                          {/* Routes */}

                          <td>

                            <div className="d-flex flex-wrap gap-1">

                              {stop.routes.map(
                                (route, routeIndex) => (

                                  <span
                                    key={`${stop.id}-route-${routeIndex}`}
                                    className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2"
                                  >
                                    <LuRoute
                                      size={12}
                                      className="me-1"
                                    />

                                    {route.routeName}

                                  </span>

                                ),
                              )}

                            </div>

                          </td>

                          {/* Buses */}

                          <td>

                            <div className="d-flex flex-column gap-1">

                              {stop.routes.map(
                                (route, routeIndex) => (

                                  <div
                                    key={`${stop.id}-bus-${routeIndex}`}
                                    className="d-flex align-items-center gap-2"
                                  >

                                    <LuBus
                                      size={16}
                                      className="text-primary"
                                    />

                                    <span className="fw-semibold">
                                      {route.busNumber}
                                    </span>

                                  </div>

                                ),
                              )}

                            </div>

                          </td>

                          {/* Drivers */}

                          <td>

                            <div className="d-flex flex-column gap-1">

                              {stop.routes.map(
                                (route, routeIndex) => (

                                  <div
                                    key={`${stop.id}-driver-${routeIndex}`}
                                  >

                                    <div className="fw-semibold">
                                      {route.driverName}
                                    </div>

                                    <small className="text-muted">
                                      {route.driverPhone}
                                    </small>

                                  </div>

                                ),
                              )}

                            </div>

                          </td>

                          {/* Status */}

                          <td>

                            {stop.routes.every(
                              (route) =>
                                route.status ===
                                "ACTIVE",
                            ) ? (

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

                          {/* Action */}

                          <td>

                            <div className="d-flex justify-content-center">

                              <button
                                type="button"
                                className="btn btn-sm btn-light text-primary rounded-3"
                                title="View Stop Details"
                                onClick={() =>
                                  openStopDetails(
                                    stop,
                                  )
                                }
                              >
                                <LuEye
                                  size={17}
                                />
                              </button>

                            </div>

                          </td>

                        </tr>

                      ),
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center py-5"
                      >

                        <div className="text-muted">

                          <LuMapPin
                            size={42}
                            className="mb-2 opacity-50"
                          />

                          <div className="fw-semibold">
                            No stop found
                          </div>

                          <small>
                            Try searching with
                            another stop name,
                            route or bus number.
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
                  {filteredStops.length}
                </strong>{" "}

                of{" "}

                <strong>
                  {totalStops}
                </strong>{" "}

                stops

              </small>

              <small className="text-muted">

                Total routes:{" "}

                <strong>
                  {totalRoutes}
                </strong>

              </small>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          VIEW STOP MODAL
      ===================================================== */}

      {showModal && selectedStop && (

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
                    <LuMapPin
                      size={23}
                    />
                  </div>

                  <div>

                    <h5 className="fw-bold mb-1">
                      {selectedStop.stopName}
                    </h5>

                    <small className="text-muted">
                      {selectedStop.location}
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

              {/* Body */}

              <div className="modal-body px-4">

                {/* Summary */}

                <div className="row g-3 mb-3">

                  <div className="col-md-4">

                    <div className="p-3 rounded-3 bg-primary-subtle">

                      <small className="text-muted">
                        Routes
                      </small>

                      <h5 className="fw-bold text-primary mb-0 mt-1">
                        {selectedStop.routes.length}
                      </h5>

                    </div>

                  </div>

                  <div className="col-md-4">

                    <div className="p-3 rounded-3 bg-success-subtle">

                      <small className="text-muted">
                        Buses
                      </small>

                      <h5 className="fw-bold text-success mb-0 mt-1">
                        {
                          new Set(
                            selectedStop.routes.map(
                              (route) =>
                                route.busNumber,
                            ),
                          ).size
                        }
                      </h5>

                    </div>

                  </div>

                  <div className="col-md-4">

                    <div className="p-3 rounded-3 bg-warning-subtle">

                      <small className="text-muted">
                        Drivers
                      </small>

                      <h5 className="fw-bold text-warning mb-0 mt-1">
                        {
                          new Set(
                            selectedStop.routes.map(
                              (route) =>
                                route.driverName,
                            ),
                          ).size
                        }
                      </h5>

                    </div>

                  </div>

                </div>

                {/* Route Details */}

                <h6 className="fw-bold mb-3">
                  Routes & Bus Details
                </h6>

                <div className="row g-3">

                  {selectedStop.routes.map(
                    (route, index) => (

                      <div
                        className="col-12"
                        key={index}
                      >

                        <div
                          className="border rounded-4 p-3"
                          style={{
                            background:
                              "#f8fbff",
                          }}
                        >

                          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">

                            <div className="d-flex align-items-center gap-2">

                              <div
                                className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                                style={{
                                  width: 40,
                                  height: 40,
                                }}
                              >
                                <LuRoute
                                  size={20}
                                />
                              </div>

                              <div>

                                <div className="fw-bold">
                                  {route.routeName}
                                </div>

                                <small className="text-muted">
                                  Route
                                </small>

                              </div>

                            </div>

                            {route.status ===
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

                          <div className="row g-3">

                            {/* Bus */}

                            <div className="col-md-4">

                              <div className="d-flex align-items-center gap-2">

                                <div
                                  className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                                  style={{
                                    width: 38,
                                    height: 38,
                                  }}
                                >
                                  <LuBus
                                    size={18}
                                  />
                                </div>

                                <div>

                                  <small className="text-muted d-block">
                                    Bus Number
                                  </small>

                                  <span className="fw-semibold">
                                    {route.busNumber}
                                  </span>

                                </div>

                              </div>

                            </div>

                            {/* Driver */}

                            <div className="col-md-4">

                              <div className="d-flex align-items-center gap-2">

                                <div
                                  className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center"
                                  style={{
                                    width: 38,
                                    height: 38,
                                  }}
                                >
                                  <LuUserRound
                                    size={18}
                                  />
                                </div>

                                <div>

                                  <small className="text-muted d-block">
                                    Driver
                                  </small>

                                  <span className="fw-semibold">
                                    {route.driverName}
                                  </span>

                                </div>

                              </div>

                            </div>

                            {/* Phone */}

                            <div className="col-md-4">

                              <div className="d-flex align-items-center gap-2">

                                <div
                                  className="rounded-3 bg-warning-subtle text-warning d-flex align-items-center justify-content-center"
                                  style={{
                                    width: 38,
                                    height: 38,
                                  }}
                                >
                                  <LuPhone
                                    size={18}
                                  />
                                </div>

                                <div>

                                  <small className="text-muted d-block">
                                    Driver Phone
                                  </small>

                                  <span className="fw-semibold">
                                    {route.driverPhone}
                                  </span>

                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                    ),
                  )}

                </div>

              </div>

              {/* Footer */}

              <div className="modal-footer border-0 px-4 pb-4">

                <button
                  type="button"
                  className="btn btn-primary rounded-3 px-4"
                  onClick={() =>
                    setShowModal(false)
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

export default StopManagement;

