
// // import React, { useMemo, useState } from "react";
// // import {
// //   LuSearch,
// //   LuMapPin,
// //   LuRoute,
// //   LuBus,
// //   LuUserRound,
// //   LuPhone,
// //   LuCircleCheck,
// //   LuCircleX,
// //   LuX,
// //   LuEye,
// // } from "react-icons/lu";

// // const StopManagement = () => {
// //   const [search, setSearch] = useState("");
// //   const [selectedStop, setSelectedStop] = useState(null);
// //   const [showModal, setShowModal] = useState(false);

// //   // =========================================================
// //   // DEMO ROUTE + BUS DATA
// //   // Later this data can come from API
// //   // =========================================================

// //   const stopData = [
// //     {
// //       id: 1,
// //       stopName: "Brahampura",
// //       location: "Brahampura, Muzaffarpur",
// //       routes: [
// //         {
// //           routeName: "Route 01",
// //           busNumber: "BR06PA1234",
// //           busType: "School Bus",
// //           driverName: "Ramesh Kumar",
// //           driverPhone: "9876543210",
// //           status: "ACTIVE",
// //         },
// //       ],
// //     },

// //     {
// //       id: 2,
// //       stopName: "Company Bagh",
// //       location: "Company Bagh, Muzaffarpur",
// //       routes: [
// //         {
// //           routeName: "Route 01",
// //           busNumber: "BR06PA1234",
// //           busType: "School Bus",
// //           driverName: "Ramesh Kumar",
// //           driverPhone: "9876543210",
// //           status: "ACTIVE",
// //         },
// //         {
// //           routeName: "Route 04",
// //           busNumber: "BR06PD3456",
// //           busType: "School Bus",
// //           driverName: "Vijay Kumar",
// //           driverPhone: "9876543213",
// //           status: "ACTIVE",
// //         },
// //       ],
// //     },

// //     {
// //       id: 3,
// //       stopName: "Mithanpura",
// //       location: "Mithanpura, Muzaffarpur",
// //       routes: [
// //         {
// //           routeName: "Route 01",
// //           busNumber: "BR06PA1234",
// //           busType: "School Bus",
// //           driverName: "Ramesh Kumar",
// //           driverPhone: "9876543210",
// //           status: "ACTIVE",
// //         },
// //       ],
// //     },

// //     {
// //       id: 4,
// //       stopName: "Ramdayalu",
// //       location: "Ramdayalu Nagar, Muzaffarpur",
// //       routes: [
// //         {
// //           routeName: "Route 01",
// //           busNumber: "BR06PA1234",
// //           busType: "School Bus",
// //           driverName: "Ramesh Kumar",
// //           driverPhone: "9876543210",
// //           status: "ACTIVE",
// //         },
// //         {
// //           routeName: "Route 02",
// //           busNumber: "BR06PB5678",
// //           busType: "School Bus",
// //           driverName: "Sanjay Kumar",
// //           driverPhone: "9876543211",
// //           status: "ACTIVE",
// //         },
// //       ],
// //     },

// //     {
// //       id: 5,
// //       stopName: "Kanti Chowk",
// //       location: "Kanti, Muzaffarpur",
// //       routes: [
// //         {
// //           routeName: "Route 02",
// //           busNumber: "BR06PB5678",
// //           busType: "School Bus",
// //           driverName: "Sanjay Kumar",
// //           driverPhone: "9876543211",
// //           status: "ACTIVE",
// //         },
// //       ],
// //     },

// //     {
// //       id: 6,
// //       stopName: "Madhopur",
// //       location: "Madhopur, Muzaffarpur",
// //       routes: [
// //         {
// //           routeName: "Route 02",
// //           busNumber: "BR06PB5678",
// //           busType: "School Bus",
// //           driverName: "Sanjay Kumar",
// //           driverPhone: "9876543211",
// //           status: "ACTIVE",
// //         },
// //       ],
// //     },

// //     {
// //       id: 7,
// //       stopName: "Bakhri",
// //       location: "Bakhri, Muzaffarpur",
// //       routes: [
// //         {
// //           routeName: "Route 02",
// //           busNumber: "BR06PB5678",
// //           busType: "School Bus",
// //           driverName: "Sanjay Kumar",
// //           driverPhone: "9876543211",
// //           status: "ACTIVE",
// //         },
// //       ],
// //     },

// //     {
// //       id: 8,
// //       stopName: "Ahiyapur",
// //       location: "Ahiyapur, Muzaffarpur",
// //       routes: [
// //         {
// //           routeName: "Route 02",
// //           busNumber: "BR06PB5678",
// //           busType: "School Bus",
// //           driverName: "Sanjay Kumar",
// //           driverPhone: "9876543211",
// //           status: "ACTIVE",
// //         },
// //       ],
// //     },

// //     {
// //       id: 9,
// //       stopName: "Zero Mile",
// //       location: "Zero Mile, Muzaffarpur",
// //       routes: [
// //         {
// //           routeName: "Route 04",
// //           busNumber: "BR06PD3456",
// //           busType: "School Bus",
// //           driverName: "Vijay Kumar",
// //           driverPhone: "9876543213",
// //           status: "ACTIVE",
// //         },
// //       ],
// //     },

// //     {
// //       id: 10,
// //       stopName: "Akharaghat",
// //       location: "Akharaghat, Muzaffarpur",
// //       routes: [
// //         {
// //           routeName: "Route 04",
// //           busNumber: "BR06PD3456",
// //           busType: "School Bus",
// //           driverName: "Vijay Kumar",
// //           driverPhone: "9876543213",
// //           status: "ACTIVE",
// //         },
// //       ],
// //     },
// //   ];

// //   // =========================================================
// //   // SEARCH
// //   // =========================================================

// //   const filteredStops = useMemo(() => {
// //     const searchText = search.toLowerCase().trim();

// //     if (!searchText) {
// //       return stopData;
// //     }

// //     return stopData.filter((stop) => {
// //       const stopMatch =
// //         stop.stopName.toLowerCase().includes(searchText) ||
// //         stop.location.toLowerCase().includes(searchText);

// //       const routeMatch = stop.routes.some(
// //         (route) =>
// //           route.routeName
// //             .toLowerCase()
// //             .includes(searchText) ||
// //           route.busNumber
// //             .toLowerCase()
// //             .includes(searchText) ||
// //           route.driverName
// //             .toLowerCase()
// //             .includes(searchText),
// //       );

// //       return stopMatch || routeMatch;
// //     });
// //   }, [search]);

// //   // =========================================================
// //   // STATS
// //   // =========================================================

// //   const totalStops = stopData.length;

// //   const totalRoutes = new Set(
// //     stopData.flatMap((stop) =>
// //       stop.routes.map((route) => route.routeName),
// //     ),
// //   ).size;

// //   const totalBuses = new Set(
// //     stopData.flatMap((stop) =>
// //       stop.routes.map((route) => route.busNumber),
// //     ),
// //   ).size;

// //   const activeBuses = new Set(
// //     stopData.flatMap((stop) =>
// //       stop.routes
// //         .filter((route) => route.status === "ACTIVE")
// //         .map((route) => route.busNumber),
// //     ),
// //   ).size;

// //   // =========================================================
// //   // VIEW STOP
// //   // =========================================================

// //   const openStopDetails = (stop) => {
// //     setSelectedStop(stop);
// //     setShowModal(true);
// //   };

// //   return (
// //     <>
// //       {/* =====================================================
// //           HEADER
// //       ===================================================== */}

// //       <div className="mx-2 mt-2 mb-3">
// //         <div
// //           className="rounded-4 shadow overflow-hidden"
// //           style={{
// //             background:
// //               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
// //             border: "1px solid #dbeafe",
// //           }}
// //         >
// //           <div className="p-3 p-md-4">
// //             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

// //               <div className="d-flex align-items-center gap-3">

// //                 <div
// //                   className="d-flex align-items-center justify-content-center rounded-3"
// //                   style={{
// //                     width: "52px",
// //                     height: "52px",
// //                     background:
// //                       "linear-gradient(135deg,#2563eb,#3b82f6)",
// //                     color: "#fff",
// //                     boxShadow:
// //                       "0 8px 20px rgba(37,99,235,.22)",
// //                   }}
// //                 >
// //                   <LuMapPin size={27} />
// //                 </div>

// //                 <div>
// //                   <h5 className="mb-1 fw-bold text-dark">
// //                     Stop Management
// //                   </h5>

// //                   <div className="text-muted small">
// //                     Transport &nbsp;/&nbsp; Stop Management
// //                   </div>
// //                 </div>

// //               </div>

// //             </div>
// //           </div>

// //           <div
// //             className="px-4 py-2"
// //             style={{
// //               backgroundColor: "rgba(239,246,255,.75)",
// //               borderTop: "1px solid #e0ecff",
// //             }}
// //           >
// //             <small className="text-muted">
// //               Home &nbsp;›&nbsp; Transport &nbsp;›&nbsp;
// //               <span className="text-primary fw-semibold">
// //                 Stop Management
// //               </span>
// //             </small>
// //           </div>
// //         </div>
// //       </div>

// //       {/* =====================================================
// //           STATS
// //       ===================================================== */}

// //       <div className="px-2">

// //         <div className="row g-3 mb-4 mt-2">

// //           {/* Total Stops */}

// //           <div className="col-xl-3 col-md-6">

// //             <div className="premium-stat-card stat-blue shadow">

// //               <div className="stat-icon">
// //                 <LuMapPin />
// //               </div>

// //               <div className="stat-content">

// //                 <span>Total Stops</span>

// //                 <h3>{totalStops}</h3>

// //                 <small>Registered transport stops</small>

// //               </div>

// //             </div>

// //           </div>

// //           {/* Total Routes */}

// //           <div className="col-xl-3 col-md-6">

// //             <div className="premium-stat-card stat-green shadow">

// //               <div className="stat-icon">
// //                 <LuRoute />
// //               </div>

// //               <div className="stat-content">

// //                 <span>Total Routes</span>

// //                 <h3>{totalRoutes}</h3>

// //                 <small>Connected routes</small>

// //               </div>

// //             </div>

// //           </div>

// //           {/* Total Buses */}

// //           <div className="col-xl-3 col-md-6">

// //             <div className="premium-stat-card stat-orange shadow">

// //               <div className="stat-icon">
// //                 <LuBus />
// //               </div>

// //               <div className="stat-content">

// //                 <span>Total Buses</span>

// //                 <h3>{totalBuses}</h3>

// //                 <small>Assigned buses</small>

// //               </div>

// //             </div>

// //           </div>

// //           {/* Active Buses */}

// //           <div className="col-xl-3 col-md-6">

// //             <div className="premium-stat-card stat-red shadow">

// //               <div className="stat-icon">
// //                 <LuCircleCheck />
// //               </div>

// //               <div className="stat-content">

// //                 <span>Active Buses</span>

// //                 <h3>{activeBuses}</h3>

// //                 <small>Currently running</small>

// //               </div>

// //             </div>

// //           </div>

// //         </div>

// //       </div>

// //       {/* =====================================================
// //           SEARCH CARD
// //       ===================================================== */}

// //       <div className="px-2">

// //         <div className="card border-0 shadow rounded-4">

// //           <div className="card-header bg-white border-0 p-3">

// //             <div className="row align-items-center g-3">

// //               <div className="col-lg-7">

// //                 <div className="position-relative">

// //                   <LuSearch
// //                     size={19}
// //                     className="position-absolute text-muted"
// //                     style={{
// //                       left: 13,
// //                       top: "50%",
// //                       transform:
// //                         "translateY(-50%)",
// //                     }}
// //                   />

// //                   <input
// //                     type="text"
// //                     className="form-control ps-5 rounded-3"
// //                     placeholder="Search stop, route, bus number or driver..."
// //                     value={search}
// //                     onChange={(e) =>
// //                       setSearch(e.target.value)
// //                     }
// //                   />

// //                 </div>

// //               </div>

// //               <div className="col-lg-5">

// //                 <div className="text-lg-end text-muted small">

// //                   Search any stop to see its
// //                   <strong className="text-primary ms-1">
// //                     route & bus details
// //                   </strong>

// //                 </div>

// //               </div>

// //             </div>

// //           </div>

// //           {/* =================================================
// //               TABLE
// //           ================================================= */}

// //           <div className="card-body p-0">

// //             <div className="table-responsive">

// //               <table className="table align-middle mb-0">

// //                 <thead className="table-light">

// //                   <tr>

// //                     <th className="px-3">
// //                       #
// //                     </th>

// //                     <th>
// //                       Stop
// //                     </th>

// //                     <th>
// //                       Routes
// //                     </th>

// //                     <th>
// //                       Buses
// //                     </th>

// //                     <th>
// //                       Drivers
// //                     </th>

// //                     <th>
// //                       Status
// //                     </th>

// //                     <th className="text-center">
// //                       Action
// //                     </th>

// //                   </tr>

// //                 </thead>

// //                 <tbody>

// //                   {filteredStops.length > 0 ? (

// //                     filteredStops.map(
// //                       (stop, index) => (

// //                         <tr key={stop.id}>

// //                           {/* Number */}

// //                           <td className="px-3 text-muted">
// //                             {index + 1}
// //                           </td>

// //                           {/* Stop */}

// //                           <td>

// //                             <div className="d-flex align-items-center gap-2">

// //                               <div
// //                                 className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
// //                                 style={{
// //                                   width: 42,
// //                                   height: 42,
// //                                 }}
// //                               >
// //                                 <LuMapPin
// //                                   size={21}
// //                                 />
// //                               </div>

// //                               <div>

// //                                 <div className="fw-semibold">
// //                                   {stop.stopName}
// //                                 </div>

// //                                 <small className="text-muted">
// //                                   {stop.location}
// //                                 </small>

// //                               </div>

// //                             </div>

// //                           </td>

// //                           {/* Routes */}

// //                           <td>

// //                             <div className="d-flex flex-wrap gap-1">

// //                               {stop.routes.map(
// //                                 (route, routeIndex) => (

// //                                   <span
// //                                     key={`${stop.id}-route-${routeIndex}`}
// //                                     className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2"
// //                                   >
// //                                     <LuRoute
// //                                       size={12}
// //                                       className="me-1"
// //                                     />

// //                                     {route.routeName}

// //                                   </span>

// //                                 ),
// //                               )}

// //                             </div>

// //                           </td>

// //                           {/* Buses */}

// //                           <td>

// //                             <div className="d-flex flex-column gap-1">

// //                               {stop.routes.map(
// //                                 (route, routeIndex) => (

// //                                   <div
// //                                     key={`${stop.id}-bus-${routeIndex}`}
// //                                     className="d-flex align-items-center gap-2"
// //                                   >

// //                                     <LuBus
// //                                       size={16}
// //                                       className="text-primary"
// //                                     />

// //                                     <span className="fw-semibold">
// //                                       {route.busNumber}
// //                                     </span>

// //                                   </div>

// //                                 ),
// //                               )}

// //                             </div>

// //                           </td>

// //                           {/* Drivers */}

// //                           <td>

// //                             <div className="d-flex flex-column gap-1">

// //                               {stop.routes.map(
// //                                 (route, routeIndex) => (

// //                                   <div
// //                                     key={`${stop.id}-driver-${routeIndex}`}
// //                                   >

// //                                     <div className="fw-semibold">
// //                                       {route.driverName}
// //                                     </div>

// //                                     <small className="text-muted">
// //                                       {route.driverPhone}
// //                                     </small>

// //                                   </div>

// //                                 ),
// //                               )}

// //                             </div>

// //                           </td>

// //                           {/* Status */}

// //                           <td>

// //                             {stop.routes.every(
// //                               (route) =>
// //                                 route.status ===
// //                                 "ACTIVE",
// //                             ) ? (

// //                               <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">

// //                                 <LuCircleCheck
// //                                   size={13}
// //                                   className="me-1"
// //                                 />

// //                                 Active

// //                               </span>

// //                             ) : (

// //                               <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">

// //                                 <LuCircleX
// //                                   size={13}
// //                                   className="me-1"
// //                                 />

// //                                 Inactive

// //                               </span>

// //                             )}

// //                           </td>

// //                           {/* Action */}

// //                           <td>

// //                             <div className="d-flex justify-content-center">

// //                               <button
// //                                 type="button"
// //                                 className="btn btn-sm btn-light text-primary rounded-3"
// //                                 title="View Stop Details"
// //                                 onClick={() =>
// //                                   openStopDetails(
// //                                     stop,
// //                                   )
// //                                 }
// //                               >
// //                                 <LuEye
// //                                   size={17}
// //                                 />
// //                               </button>

// //                             </div>

// //                           </td>

// //                         </tr>

// //                       ),
// //                     )

// //                   ) : (

// //                     <tr>

// //                       <td
// //                         colSpan="7"
// //                         className="text-center py-5"
// //                       >

// //                         <div className="text-muted">

// //                           <LuMapPin
// //                             size={42}
// //                             className="mb-2 opacity-50"
// //                           />

// //                           <div className="fw-semibold">
// //                             No stop found
// //                           </div>

// //                           <small>
// //                             Try searching with
// //                             another stop name,
// //                             route or bus number.
// //                           </small>

// //                         </div>

// //                       </td>

// //                     </tr>

// //                   )}

// //                 </tbody>

// //               </table>

// //             </div>

// //           </div>

// //           {/* Footer */}

// //           <div className="card-footer bg-white border-0 p-3">

// //             <div className="d-flex justify-content-between align-items-center">

// //               <small className="text-muted">

// //                 Showing{" "}

// //                 <strong>
// //                   {filteredStops.length}
// //                 </strong>{" "}

// //                 of{" "}

// //                 <strong>
// //                   {totalStops}
// //                 </strong>{" "}

// //                 stops

// //               </small>

// //               <small className="text-muted">

// //                 Total routes:{" "}

// //                 <strong>
// //                   {totalRoutes}
// //                 </strong>

// //               </small>

// //             </div>

// //           </div>

// //         </div>

// //       </div>

// //       {/* =====================================================
// //           VIEW STOP MODAL
// //       ===================================================== */}

// //       {showModal && selectedStop && (

// //         <div
// //           className="modal d-block"
// //           tabIndex="-1"
// //           style={{
// //             background:
// //               "rgba(0,0,0,0.45)",
// //           }}
// //         >

// //           <div className="modal-dialog modal-lg modal-dialog-centered">

// //             <div className="modal-content border-0 rounded-4 shadow">

// //               {/* Header */}

// //               <div className="modal-header border-0 px-4 pt-4">

// //                 <div className="d-flex align-items-center gap-3">

// //                   <div
// //                     className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
// //                     style={{
// //                       width: 46,
// //                       height: 46,
// //                     }}
// //                   >
// //                     <LuMapPin
// //                       size={23}
// //                     />
// //                   </div>

// //                   <div>

// //                     <h5 className="fw-bold mb-1">
// //                       {selectedStop.stopName}
// //                     </h5>

// //                     <small className="text-muted">
// //                       {selectedStop.location}
// //                     </small>

// //                   </div>

// //                 </div>

// //                 <button
// //                   type="button"
// //                   className="btn btn-light rounded-3"
// //                   onClick={() =>
// //                     setShowModal(false)
// //                   }
// //                 >
// //                   <LuX size={18} />
// //                 </button>

// //               </div>

// //               {/* Body */}

// //               <div className="modal-body px-4">

// //                 {/* Summary */}

// //                 <div className="row g-3 mb-3">

// //                   <div className="col-md-4">

// //                     <div className="p-3 rounded-3 bg-primary-subtle">

// //                       <small className="text-muted">
// //                         Routes
// //                       </small>

// //                       <h5 className="fw-bold text-primary mb-0 mt-1">
// //                         {selectedStop.routes.length}
// //                       </h5>

// //                     </div>

// //                   </div>

// //                   <div className="col-md-4">

// //                     <div className="p-3 rounded-3 bg-success-subtle">

// //                       <small className="text-muted">
// //                         Buses
// //                       </small>

// //                       <h5 className="fw-bold text-success mb-0 mt-1">
// //                         {
// //                           new Set(
// //                             selectedStop.routes.map(
// //                               (route) =>
// //                                 route.busNumber,
// //                             ),
// //                           ).size
// //                         }
// //                       </h5>

// //                     </div>

// //                   </div>

// //                   <div className="col-md-4">

// //                     <div className="p-3 rounded-3 bg-warning-subtle">

// //                       <small className="text-muted">
// //                         Drivers
// //                       </small>

// //                       <h5 className="fw-bold text-warning mb-0 mt-1">
// //                         {
// //                           new Set(
// //                             selectedStop.routes.map(
// //                               (route) =>
// //                                 route.driverName,
// //                             ),
// //                           ).size
// //                         }
// //                       </h5>

// //                     </div>

// //                   </div>

// //                 </div>

// //                 {/* Route Details */}

// //                 <h6 className="fw-bold mb-3">
// //                   Routes & Bus Details
// //                 </h6>

// //                 <div className="row g-3">

// //                   {selectedStop.routes.map(
// //                     (route, index) => (

// //                       <div
// //                         className="col-12"
// //                         key={index}
// //                       >

// //                         <div
// //                           className="border rounded-4 p-3"
// //                           style={{
// //                             background:
// //                               "#f8fbff",
// //                           }}
// //                         >

// //                           <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">

// //                             <div className="d-flex align-items-center gap-2">

// //                               <div
// //                                 className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
// //                                 style={{
// //                                   width: 40,
// //                                   height: 40,
// //                                 }}
// //                               >
// //                                 <LuRoute
// //                                   size={20}
// //                                 />
// //                               </div>

// //                               <div>

// //                                 <div className="fw-bold">
// //                                   {route.routeName}
// //                                 </div>

// //                                 <small className="text-muted">
// //                                   Route
// //                                 </small>

// //                               </div>

// //                             </div>

// //                             {route.status ===
// //                             "ACTIVE" ? (

// //                               <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">

// //                                 <LuCircleCheck
// //                                   size={13}
// //                                   className="me-1"
// //                                 />

// //                                 Active

// //                               </span>

// //                             ) : (

// //                               <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">

// //                                 <LuCircleX
// //                                   size={13}
// //                                   className="me-1"
// //                                 />

// //                                 Inactive

// //                               </span>

// //                             )}

// //                           </div>

// //                           <div className="row g-3">

// //                             {/* Bus */}

// //                             <div className="col-md-4">

// //                               <div className="d-flex align-items-center gap-2">

// //                                 <div
// //                                   className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
// //                                   style={{
// //                                     width: 38,
// //                                     height: 38,
// //                                   }}
// //                                 >
// //                                   <LuBus
// //                                     size={18}
// //                                   />
// //                                 </div>

// //                                 <div>

// //                                   <small className="text-muted d-block">
// //                                     Bus Number
// //                                   </small>

// //                                   <span className="fw-semibold">
// //                                     {route.busNumber}
// //                                   </span>

// //                                 </div>

// //                               </div>

// //                             </div>

// //                             {/* Driver */}

// //                             <div className="col-md-4">

// //                               <div className="d-flex align-items-center gap-2">

// //                                 <div
// //                                   className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center"
// //                                   style={{
// //                                     width: 38,
// //                                     height: 38,
// //                                   }}
// //                                 >
// //                                   <LuUserRound
// //                                     size={18}
// //                                   />
// //                                 </div>

// //                                 <div>

// //                                   <small className="text-muted d-block">
// //                                     Driver
// //                                   </small>

// //                                   <span className="fw-semibold">
// //                                     {route.driverName}
// //                                   </span>

// //                                 </div>

// //                               </div>

// //                             </div>

// //                             {/* Phone */}

// //                             <div className="col-md-4">

// //                               <div className="d-flex align-items-center gap-2">

// //                                 <div
// //                                   className="rounded-3 bg-warning-subtle text-warning d-flex align-items-center justify-content-center"
// //                                   style={{
// //                                     width: 38,
// //                                     height: 38,
// //                                   }}
// //                                 >
// //                                   <LuPhone
// //                                     size={18}
// //                                   />
// //                                 </div>

// //                                 <div>

// //                                   <small className="text-muted d-block">
// //                                     Driver Phone
// //                                   </small>

// //                                   <span className="fw-semibold">
// //                                     {route.driverPhone}
// //                                   </span>

// //                                 </div>

// //                               </div>

// //                             </div>

// //                           </div>

// //                         </div>

// //                       </div>

// //                     ),
// //                   )}

// //                 </div>

// //               </div>

// //               {/* Footer */}

// //               <div className="modal-footer border-0 px-4 pb-4">

// //                 <button
// //                   type="button"
// //                   className="btn btn-primary rounded-3 px-4"
// //                   onClick={() =>
// //                     setShowModal(false)
// //                   }
// //                 >
// //                   Close
// //                 </button>

// //               </div>

// //             </div>

// //           </div>

// //         </div>

// //       )}

// //     </>
// //   );
// // };

// // export default StopManagement;




// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import {
//   LuSearch,
//   LuMapPin,
//   LuRoute,
//   LuBus,
//   LuUserRound,
//   LuPhone,
//   LuCircleCheck,
//   LuCircleX,
//   LuX,
//   LuEye,
//   LuLoaderCircle,
// } from "react-icons/lu";

// const StopManagement = () => {
//   // =========================================================
//   // STATE
//   // =========================================================

//   const [search, setSearch] = useState("");
//   const [selectedStop, setSelectedStop] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const [stopResults, setStopResults] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [error, setError] = useState("");

//   // =========================================================
//   // SCHOOL + TOKEN
//   // =========================================================

//   const schoolId =
//     localStorage.getItem("schoolId") ||
//     sessionStorage.getItem("schoolId");

//   const token =
//     localStorage.getItem("token") ||
//     sessionStorage.getItem("token");

//   // =========================================================
//   // API
//   // =========================================================

//   const API_URL = "/api/transport/vehicle-routes";

//   // =========================================================
//   // LOAD ALL ROUTE MAPPINGS
//   // =========================================================
//   // This is used initially so that all stops can be displayed.
//   //
//   // IMPORTANT:
//   // Stop itself is NOT stored separately.
//   // We extract stops from RouteManagement.stops.
//   // =========================================================

//   const loadAllMappings = async () => {
//     if (!schoolId) {
//       setError("School ID not found.");
//       setInitialLoading(false);
//       return;
//     }

//     try {
//       setInitialLoading(true);
//       setError("");

//       const response = await axios.get(API_URL, {
//         params: {
//           schoolId: schoolId,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setStopResults(response.data || []);
//     } catch (err) {
//       console.error("Error loading transport mappings:", err);

//       setError(
//         err?.response?.data?.message ||
//           "Unable to load transport stop details.",
//       );

//       setStopResults([]);
//     } finally {
//       setInitialLoading(false);
//     }
//   };

//   // =========================================================
//   // SEARCH STOP
//   // =========================================================
//   //
//   // Backend:
//   //
//   // GET
//   // /api/transport/vehicle-routes/search
//   //
//   // ?schoolId=1
//   // &stop=Kankarbagh
//   //
//   // =========================================================

//   const searchStop = async (stopText) => {
//     if (!schoolId) {
//       setError("School ID not found.");
//       return;
//     }

//     const value = stopText.trim();

//     // Empty search => load all
//     if (!value) {
//       loadAllMappings();
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const response = await axios.get(
//         `${API_URL}/search`,
//         {
//           params: {
//             schoolId: schoolId,
//             stop: value,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setStopResults(response.data || []);
//     } catch (err) {
//       console.error("Error searching stop:", err);

//       setError(
//         err?.response?.data?.message ||
//           "Unable to search stop.",
//       );

//       setStopResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================================================
//   // INITIAL LOAD
//   // =========================================================

//   useEffect(() => {
//     loadAllMappings();
//   }, [schoolId]);

//   // =========================================================
//   // SEARCH HANDLER
//   // =========================================================
//   //
//   // Backend search is used.
//   // A small local filtering is also kept for route/bus/driver
//   // so the search box remains useful for all transport details.
//   //
//   // =========================================================

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       searchStop(search);
//     }, 400);

//     return () => clearTimeout(timer);
//   }, [search]);

//   // =========================================================
//   // NORMALIZE API DATA
//   // =========================================================
//   //
//   // Backend response can directly be used.
//   // We normalize a few possible field names to keep JSX safe.
//   // =========================================================

//   const normalizedResults = useMemo(() => {
//     return (stopResults || []).map((item, index) => ({
//       ...item,

//       mappingId:
//         item.mappingId ??
//         item.id ??
//         index,

//       routeId:
//         item.routeId,

//       routeName:
//         item.routeName ||
//         "Route",

//       startLocation:
//         item.startLocation || "",

//       endLocation:
//         item.endLocation || "",

//       stops:
//         item.stops || "",

//       routeStatus:
//         item.routeStatus ||
//         item.status ||
//         "INACTIVE",

//       vehicleId:
//         item.vehicleId,

//       vehicleNumber:
//         item.vehicleNumber ||
//         "-",

//       vehicleType:
//         item.vehicleType ||
//         "-",

//       vehicleModel:
//         item.vehicleModel ||
//         "-",

//       vehicleCapacity:
//         item.vehicleCapacity ??
//         "-",

//       driverId:
//         item.driverId,

//       driverName:
//         item.driverName ||
//         "Driver Not Assigned",

//       driverPhone:
//         item.driverPhone ||
//         "-",

//       driverStatus:
//         item.driverStatus ||
//         "INACTIVE",

//       mappingStatus:
//         item.mappingStatus ||
//         item.status ||
//         "INACTIVE",
//     }));
//   }, [stopResults]);

//   // =========================================================
//   // BUILD STOP-WISE DATA
//   // =========================================================
//   //
//   // Same stop can exist in multiple routes.
//   //
//   // Example:
//   //
//   // Company Bagh
//   //   Route 01 -> Bus A -> Driver A
//   //   Route 04 -> Bus B -> Driver B
//   //
//   // So we group the API results by individual stop.
//   // =========================================================

//   const stopData = useMemo(() => {
//     const stopMap = new Map();

//     normalizedResults.forEach((mapping) => {
//       if (!mapping.stops) {
//         return;
//       }

//       const stopsArray = mapping.stops
//         .split(",")
//         .map((stop) => stop.trim())
//         .filter(Boolean);

//       stopsArray.forEach((stopName, stopIndex) => {
//         const key = stopName.toLowerCase();

//         if (!stopMap.has(key)) {
//           stopMap.set(key, {
//             id: `${mapping.routeId}-${stopIndex}-${key}`,
//             stopName: stopName,
//             location: stopName,
//             routes: [],
//           });
//         }

//         const stopObject = stopMap.get(key);

//         // Avoid duplicate same route mapping
//         const alreadyExists = stopObject.routes.some(
//           (route) =>
//             route.routeId === mapping.routeId &&
//             route.vehicleId === mapping.vehicleId,
//         );

//         if (!alreadyExists) {
//           stopObject.routes.push({
//             mappingId: mapping.mappingId,

//             routeId: mapping.routeId,
//             routeName: mapping.routeName,

//             startLocation: mapping.startLocation,
//             endLocation: mapping.endLocation,

//             busNumber: mapping.vehicleNumber,
//             busType: mapping.vehicleType,
//             busModel: mapping.vehicleModel,
//             vehicleCapacity: mapping.vehicleCapacity,

//             vehicleId: mapping.vehicleId,

//             driverId: mapping.driverId,
//             driverName: mapping.driverName,
//             driverPhone: mapping.driverPhone,
//             driverStatus: mapping.driverStatus,

//             routeStatus: mapping.routeStatus,
//             status: mapping.mappingStatus,
//           });
//         }
//       });
//     });

//     return Array.from(stopMap.values());
//   }, [normalizedResults]);

//   // =========================================================
//   // LOCAL SEARCH
//   // =========================================================
//   //
//   // Backend searches stops.
//   // This additional filtering allows:
//   //
//   // route name
//   // bus number
//   // driver name
//   // driver phone
//   //
//   // =========================================================

//  const filteredStops = useMemo(() => {
//   const results = Array.isArray(stopResults)
//     ? stopResults
//     : Array.isArray(stopResults?.content)
//       ? stopResults.content
//       : Array.isArray(stopResults?.data)
//         ? stopResults.data
//         : Array.isArray(stopResults?.result)
//           ? stopResults.result
//           : [];

//   const searchText = search.toLowerCase().trim();

//   if (!searchText) {
//     return results;
//   }

//   return results.filter((stop) => {
//     const stopName = String(
//       stop?.stopName ||
//       stop?.name ||
//       stop?.stop ||
//       ""
//     ).toLowerCase();

//     const location = String(
//       stop?.location ||
//       ""
//     ).toLowerCase();

//     const routeName = String(
//       stop?.routeName ||
//       ""
//     ).toLowerCase();

//     const vehicleNumber = String(
//       stop?.vehicleNumber ||
//       stop?.busNumber ||
//       ""
//     ).toLowerCase();

//     const driverName = String(
//       stop?.driverName ||
//       ""
//     ).toLowerCase();

//     return (
//       stopName.includes(searchText) ||
//       location.includes(searchText) ||
//       routeName.includes(searchText) ||
//       vehicleNumber.includes(searchText) ||
//       driverName.includes(searchText)
//     );
//   });
// }, [stopResults, search]);

//   // =========================================================
//   // STATS
//   // =========================================================

//   const totalStops = stopData.length;

//   const totalRoutes = new Set(
//     normalizedResults
//       .map((item) => item.routeId)
//       .filter(Boolean),
//   ).size;

//   const totalBuses = new Set(
//     normalizedResults
//       .map((item) => item.vehicleId)
//       .filter(Boolean),
//   ).size;

//   const activeBuses = new Set(
//     normalizedResults
//       .filter(
//         (item) =>
//           item.mappingStatus === "ACTIVE" &&
//           item.routeStatus === "ACTIVE",
//       )
//       .map((item) => item.vehicleId)
//       .filter(Boolean),
//   ).size;

//   // =========================================================
//   // VIEW STOP
//   // =========================================================

//   const openStopDetails = (stop) => {
//     setSelectedStop(stop);
//     setShowModal(true);
//   };

//   // =========================================================
//   // CLOSE MODAL
//   // =========================================================

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedStop(null);
//   };

//   // =========================================================
//   // LOADING
//   // =========================================================

//   if (initialLoading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center py-5">
//         <div className="text-center text-muted">
//           <LuLoaderCircle
//             size={35}
//             className="mb-2"
//             style={{
//               animation: "spin 1s linear infinite",
//             }}
//           />

//           <div className="fw-semibold">
//             Loading transport stops...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="mx-2 mt-2 mb-3">
//         <div
//           className="rounded-4 shadow overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
//             border: "1px solid #dbeafe",
//           }}
//         >
//           <div className="p-3 p-md-4">
//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//               <div className="d-flex align-items-center gap-3">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <LuMapPin size={27} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     Stop Management
//                   </h5>

//                   <div className="text-muted small">
//                     Transport &nbsp;/&nbsp; Stop Management
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div
//             className="px-4 py-2"
//             style={{
//               backgroundColor: "rgba(239,246,255,.75)",
//               borderTop: "1px solid #e0ecff",
//             }}
//           >
//             <small className="text-muted">
//               Home &nbsp;›&nbsp; Transport &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Stop Management
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           ERROR
//       ===================================================== */}

//       {error && (
//         <div className="px-2 mb-3">
//           <div className="alert alert-danger rounded-3 mb-0">
//             {error}
//           </div>
//         </div>
//       )}

//       {/* =====================================================
//           STATS
//       ===================================================== */}

//       <div className="px-2">
//         <div className="row g-3 mb-4 mt-2">
//           {/* Total Stops */}

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-blue shadow">
//               <div className="stat-icon">
//                 <LuMapPin />
//               </div>

//               <div className="stat-content">
//                 <span>Total Stops</span>

//                 <h3>{totalStops}</h3>

//                 <small>
//                   Stops available in routes
//                 </small>
//               </div>
//             </div>
//           </div>

//           {/* Total Routes */}

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-green shadow">
//               <div className="stat-icon">
//                 <LuRoute />
//               </div>

//               <div className="stat-content">
//                 <span>Total Routes</span>

//                 <h3>{totalRoutes}</h3>

//                 <small>
//                   Transport routes
//                 </small>
//               </div>
//             </div>
//           </div>

//           {/* Total Buses */}

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-orange shadow">
//               <div className="stat-icon">
//                 <LuBus />
//               </div>

//               <div className="stat-content">
//                 <span>Total Buses</span>

//                 <h3>{totalBuses}</h3>

//                 <small>
//                   Route assigned buses
//                 </small>
//               </div>
//             </div>
//           </div>

//           {/* Active Buses */}

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-red shadow">
//               <div className="stat-icon">
//                 <LuCircleCheck />
//               </div>

//               <div className="stat-content">
//                 <span>Active Buses</span>

//                 <h3>{activeBuses}</h3>

//                 <small>
//                   Currently active
//                 </small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           SEARCH CARD
//       ===================================================== */}

//       <div className="px-2">
//         <div className="card border-0 shadow rounded-4">
//           <div className="card-header bg-white border-0 p-3">
//             <div className="row align-items-center g-3">
//               <div className="col-lg-7">
//                 <div className="position-relative">
//                   <LuSearch
//                     size={19}
//                     className="position-absolute text-muted"
//                     style={{
//                       left: 13,
//                       top: "50%",
//                       transform:
//                         "translateY(-50%)",
//                     }}
//                   />

//                   <input
//                     type="text"
//                     className="form-control ps-5 rounded-3"
//                     placeholder="Search stop, route, bus number or driver..."
//                     value={search}
//                     onChange={(e) =>
//                       setSearch(e.target.value)
//                     }
//                   />

//                   {loading && (
//                     <LuLoaderCircle
//                       size={18}
//                       className="position-absolute text-primary"
//                       style={{
//                         right: 13,
//                         top: "50%",
//                         transform:
//                           "translateY(-50%)",
//                         animation:
//                           "spin 1s linear infinite",
//                       }}
//                     />
//                   )}
//                 </div>
//               </div>

//               <div className="col-lg-5">
//                 <div className="text-lg-end text-muted small">
//                   Search a stop to see its
//                   <strong className="text-primary ms-1">
//                     route, bus & driver details
//                   </strong>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               TABLE
//           ================================================= */}

//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table className="table align-middle mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th className="px-3">#</th>

//                     <th>Stop</th>

//                     <th>Routes</th>

//                     <th>Buses</th>

//                     <th>Drivers</th>

//                     <th>Status</th>

//                     <th className="text-center">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filteredStops.length > 0 ? (
//                     filteredStops.map(
//                       (stop, index) => (
//                         <tr key={stop.id}>
//                           {/* Number */}

//                           <td className="px-3 text-muted">
//                             {index + 1}
//                           </td>

//                           {/* Stop */}

//                           <td>
//                             <div className="d-flex align-items-center gap-2">
//                               <div
//                                 className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
//                                 style={{
//                                   width: 42,
//                                   height: 42,
//                                 }}
//                               >
//                                 <LuMapPin
//                                   size={21}
//                                 />
//                               </div>

//                               <div>
//                                 <div className="fw-semibold">
//                                   {stop.stopName}
//                                 </div>

//                                 <small className="text-muted">
//                                   Stop
//                                 </small>
//                               </div>
//                             </div>
//                           </td>

//                           {/* Routes */}

//                           <td>
//                             <div className="d-flex flex-wrap gap-1">
//                               {stop.routes.map(
//                                 (route) => (
//                                   <span
//                                     key={`${stop.id}-${route.routeId}-${route.vehicleId}`}
//                                     className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2"
//                                   >
//                                     <LuRoute
//                                       size={12}
//                                       className="me-1"
//                                     />

//                                     {route.routeName}
//                                   </span>
//                                 ),
//                               )}
//                             </div>
//                           </td>

//                           {/* Buses */}

//                           <td>
//                             <div className="d-flex flex-column gap-2">
//                               {stop.routes.map(
//                                 (route) => (
//                                   <div
//                                     key={`${stop.id}-bus-${route.vehicleId}`}
//                                     className="d-flex align-items-center gap-2"
//                                   >
//                                     <LuBus
//                                       size={16}
//                                       className="text-primary"
//                                     />

//                                     <div>
//                                       <div className="fw-semibold">
//                                         {
//                                           route.busNumber
//                                         }
//                                       </div>

//                                       <small className="text-muted">
//                                         {
//                                           route.busType
//                                         }
//                                       </small>
//                                     </div>
//                                   </div>
//                                 ),
//                               )}
//                             </div>
//                           </td>

//                           {/* Drivers */}

//                           <td>
//                             <div className="d-flex flex-column gap-2">
//                               {stop.routes.map(
//                                 (route) => (
//                                   <div
//                                     key={`${stop.id}-driver-${route.driverId || route.vehicleId}`}
//                                   >
//                                     <div className="d-flex align-items-center gap-2">
//                                       <LuUserRound
//                                         size={16}
//                                         className="text-success"
//                                       />

//                                       <span className="fw-semibold">
//                                         {
//                                           route.driverName
//                                         }
//                                       </span>
//                                     </div>

//                                     <small className="text-muted ms-4">
//                                       {
//                                         route.driverPhone
//                                       }
//                                     </small>
//                                   </div>
//                                 ),
//                               )}
//                             </div>
//                           </td>

//                           {/* Status */}

//                           <td>
//                             {stop.routes.every(
//                               (route) =>
//                                 route.status ===
//                                   "ACTIVE" &&
//                                 route.routeStatus ===
//                                   "ACTIVE",
//                             ) ? (
//                               <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
//                                 <LuCircleCheck
//                                   size={13}
//                                   className="me-1"
//                                 />
//                                 Active
//                               </span>
//                             ) : (
//                               <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
//                                 <LuCircleX
//                                   size={13}
//                                   className="me-1"
//                                 />
//                                 Inactive
//                               </span>
//                             )}
//                           </td>

//                           {/* Action */}

//                           <td>
//                             <div className="d-flex justify-content-center">
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-light text-primary rounded-3"
//                                 title="View Stop Details"
//                                 onClick={() =>
//                                   openStopDetails(
//                                     stop,
//                                   )
//                                 }
//                               >
//                                 <LuEye size={17} />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ),
//                     )
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="7"
//                         className="text-center py-5"
//                       >
//                         <div className="text-muted">
//                           <LuMapPin
//                             size={42}
//                             className="mb-2 opacity-50"
//                           />

//                           <div className="fw-semibold">
//                             No stop found
//                           </div>

//                           <small>
//                             Try another stop,
//                             route, bus number or
//                             driver name.
//                           </small>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* =================================================
//               FOOTER
//           ================================================= */}

//           <div className="card-footer bg-white border-0 p-3">
//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//               <small className="text-muted">
//                 Showing{" "}
//                 <strong>
//                   {filteredStops.length}
//                 </strong>{" "}
//                 stops
//               </small>

//               <small className="text-muted">
//                 Routes:{" "}
//                 <strong>{totalRoutes}</strong>
//                 {" | "}
//                 Buses:{" "}
//                 <strong>{totalBuses}</strong>
//               </small>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           VIEW STOP MODAL
//       ===================================================== */}

//       {showModal && selectedStop && (
//         <div
//           className="modal d-block"
//           tabIndex="-1"
//           style={{
//             background: "rgba(0,0,0,0.45)",
//           }}
//           onClick={closeModal}
//         >
//           <div
//             className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
//             onClick={(e) =>
//               e.stopPropagation()
//             }
//           >
//             <div className="modal-content border-0 rounded-4 shadow">
//               {/* Header */}

//               <div className="modal-header border-0 px-4 pt-4">
//                 <div className="d-flex align-items-center gap-3">
//                   <div
//                     className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
//                     style={{
//                       width: 46,
//                       height: 46,
//                     }}
//                   >
//                     <LuMapPin size={23} />
//                   </div>

//                   <div>
//                     <h5 className="fw-bold mb-1">
//                       {selectedStop.stopName}
//                     </h5>

//                     <small className="text-muted">
//                       Transport Stop Details
//                     </small>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   className="btn btn-light rounded-3"
//                   onClick={closeModal}
//                 >
//                   <LuX size={18} />
//                 </button>
//               </div>

//               {/* Body */}

//               <div className="modal-body px-4">
//                 {/* Summary */}

//                 <div className="row g-3 mb-4">
//                   <div className="col-md-4">
//                     <div className="p-3 rounded-3 bg-primary-subtle">
//                       <small className="text-muted">
//                         Routes
//                       </small>

//                       <h5 className="fw-bold text-primary mb-0 mt-1">
//                         {
//                           selectedStop.routes
//                             .length
//                         }
//                       </h5>
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className="p-3 rounded-3 bg-success-subtle">
//                       <small className="text-muted">
//                         Buses
//                       </small>

//                       <h5 className="fw-bold text-success mb-0 mt-1">
//                         {
//                           new Set(
//                             selectedStop.routes.map(
//                               (route) =>
//                                 route.vehicleId,
//                             ),
//                           ).size
//                         }
//                       </h5>
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className="p-3 rounded-3 bg-warning-subtle">
//                       <small className="text-muted">
//                         Drivers
//                       </small>

//                       <h5 className="fw-bold text-warning mb-0 mt-1">
//                         {
//                           new Set(
//                             selectedStop.routes
//                               .map(
//                                 (route) =>
//                                   route.driverId,
//                               )
//                               .filter(Boolean),
//                           ).size
//                         }
//                       </h5>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Route Details */}

//                 <h6 className="fw-bold mb-3">
//                   Routes & Bus Details
//                 </h6>

//                 <div className="row g-3">
//                   {selectedStop.routes.map(
//                     (route) => (
//                       <div
//                         className="col-12"
//                         key={`${route.routeId}-${route.vehicleId}`}
//                       >
//                         <div
//                           className="border rounded-4 p-3"
//                           style={{
//                             background:
//                               "#f8fbff",
//                           }}
//                         >
//                           {/* Route Header */}

//                           <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
//                             <div className="d-flex align-items-center gap-2">
//                               <div
//                                 className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
//                                 style={{
//                                   width: 40,
//                                   height: 40,
//                                 }}
//                               >
//                                 <LuRoute
//                                   size={20}
//                                 />
//                               </div>

//                               <div>
//                                 <div className="fw-bold">
//                                   {
//                                     route.routeName
//                                   }
//                                 </div>

//                                 <small className="text-muted">
//                                   {route.startLocation ||
//                                     "Start"}{" "}
//                                   →{" "}
//                                   {route.endLocation ||
//                                     "End"}
//                                 </small>
//                               </div>
//                             </div>

//                             {route.status ===
//                                 "ACTIVE" &&
//                             route.routeStatus ===
//                               "ACTIVE" ? (
//                               <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
//                                 <LuCircleCheck
//                                   size={13}
//                                   className="me-1"
//                                 />
//                                 Active
//                               </span>
//                             ) : (
//                               <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
//                                 <LuCircleX
//                                   size={13}
//                                   className="me-1"
//                                 />
//                                 Inactive
//                               </span>
//                             )}
//                           </div>

//                           {/* Route Stops */}

//                           <div className="mb-3 p-3 bg-white rounded-3 border">
//                             <small className="text-muted d-block mb-1">
//                               Route Stops
//                             </small>

//                             <div className="small fw-semibold">
//                               {route.startLocation ||
//                                 "-"}{" "}
//                               →{" "}
//                               {route.endLocation ||
//                                 "-"}
//                             </div>
//                           </div>

//                           <div className="row g-3">
//                             {/* Bus */}

//                             <div className="col-md-4">
//                               <div className="d-flex align-items-center gap-2">
//                                 <div
//                                   className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
//                                   style={{
//                                     width: 38,
//                                     height: 38,
//                                   }}
//                                 >
//                                   <LuBus
//                                     size={18}
//                                   />
//                                 </div>

//                                 <div>
//                                   <small className="text-muted d-block">
//                                     Bus Number
//                                   </small>

//                                   <span className="fw-semibold">
//                                     {
//                                       route.busNumber
//                                     }
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Vehicle Type */}

//                             <div className="col-md-4">
//                               <div className="d-flex align-items-center gap-2">
//                                 <div
//                                   className="rounded-3 bg-info-subtle text-info d-flex align-items-center justify-content-center"
//                                   style={{
//                                     width: 38,
//                                     height: 38,
//                                   }}
//                                 >
//                                   <LuBus
//                                     size={18}
//                                   />
//                                 </div>

//                                 <div>
//                                   <small className="text-muted d-block">
//                                     Vehicle
//                                   </small>

//                                   <span className="fw-semibold">
//                                     {
//                                       route.busType
//                                     }
//                                     {route.busModel &&
//                                       ` • ${route.busModel}`}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Capacity */}

//                             <div className="col-md-4">
//                               <div className="d-flex align-items-center gap-2">
//                                 <div
//                                   className="rounded-3 bg-warning-subtle text-warning d-flex align-items-center justify-content-center"
//                                   style={{
//                                     width: 38,
//                                     height: 38,
//                                   }}
//                                 >
//                                   <LuBus
//                                     size={18}
//                                   />
//                                 </div>

//                                 <div>
//                                   <small className="text-muted d-block">
//                                     Capacity
//                                   </small>

//                                   <span className="fw-semibold">
//                                     {
//                                       route.vehicleCapacity
//                                     }
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Driver */}

//                             <div className="col-md-6">
//                               <div className="d-flex align-items-center gap-2">
//                                 <div
//                                   className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center"
//                                   style={{
//                                     width: 38,
//                                     height: 38,
//                                   }}
//                                 >
//                                   <LuUserRound
//                                     size={18}
//                                   />
//                                 </div>

//                                 <div>
//                                   <small className="text-muted d-block">
//                                     Driver
//                                   </small>

//                                   <span className="fw-semibold">
//                                     {
//                                       route.driverName
//                                     }
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Phone */}

//                             <div className="col-md-6">
//                               <div className="d-flex align-items-center gap-2">
//                                 <div
//                                   className="rounded-3 bg-warning-subtle text-warning d-flex align-items-center justify-content-center"
//                                   style={{
//                                     width: 38,
//                                     height: 38,
//                                   }}
//                                 >
//                                   <LuPhone
//                                     size={18}
//                                   />
//                                 </div>

//                                 <div>
//                                   <small className="text-muted d-block">
//                                     Driver Phone
//                                   </small>

//                                   <span className="fw-semibold">
//                                     {
//                                       route.driverPhone
//                                     }
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ),
//                   )}
//                 </div>
//               </div>

//               {/* Footer */}

//               <div className="modal-footer border-0 px-4 pb-4">
//                 <button
//                   type="button"
//                   className="btn btn-primary rounded-3 px-4"
//                   onClick={closeModal}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =====================================================
//           SPIN ANIMATION
//       ===================================================== */}

//       <style>
//         {`
//           @keyframes spin {
//             from {
//               transform: rotate(0deg);
//             }
//             to {
//               transform: rotate(360deg);
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default StopManagement;


// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import {
//   LuSearch,
//   LuMapPin,
//   LuRoute,
//   LuBus,
//   LuUserRound,
//   LuPhone,
//   LuCircleCheck,
//   LuCircleX,
//   LuX,
//   LuEye,
//   LuRefreshCw,
//   LuLoaderCircle,
//   LuCar,
// } from "react-icons/lu";

// const StopManagement = () => {
//   // =========================================================
//   // AUTH / SCHOOL
//   // =========================================================

//   const token = localStorage.getItem("token");

//   const schoolId =
//     localStorage.getItem("schoolId") ||
//     localStorage.getItem("schoolID");

//   // =========================================================
//   // STATES
//   // =========================================================

//   const [search, setSearch] = useState("");

//   const [stopResults, setStopResults] = useState([]);

//   const [selectedStop, setSelectedStop] = useState(null);

//   const [showModal, setShowModal] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState("");

//   // =========================================================
//   // SEARCH API
//   // =========================================================

//   const searchStops = async (searchValue) => {
//     const value = searchValue.trim();

//     // Empty search
//     if (!value) {
//       setStopResults([]);
//       setError("");
//       return;
//     }

//     if (!schoolId) {
//       setError("School ID not found.");
//       setStopResults([]);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const response = await axios.get(
//         "/api/transport/vehicle-routes/search",
//         {
//           params: {
//             schoolId: schoolId,
//             stop: value,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // =====================================================
//       // IMPORTANT
//       // Backend returns List<StopSearchResponse>
//       // So response.data should be an ARRAY
//       // =====================================================

//       if (Array.isArray(response.data)) {
//         setStopResults(response.data);
//       } else {
//         setStopResults([]);
//         console.error(
//           "Unexpected search response:",
//           response.data
//         );
//       }
//     } catch (err) {
//       console.error(
//         "Error searching stop:",
//         err
//       );

//       setStopResults([]);

//       setError(
//         err?.response?.data?.message ||
//           "Failed to search stop."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log("Stop Results:", stopResults);

//   // =========================================================
//   // DEBOUNCED SEARCH
//   // =========================================================

//   useEffect(() => {
//     const value = search.trim();

//     if (!value) {
//       setStopResults([]);
//       setError("");
//       setLoading(false);
//       return;
//     }

//     const timer = setTimeout(() => {
//       searchStops(value);
//     }, 400);

//     return () => clearTimeout(timer);
//   }, [search]);

//   // =========================================================
//   // SAFE RESULTS
//   // =========================================================

//   const safeResults = useMemo(() => {
//     return Array.isArray(stopResults)
//       ? stopResults
//       : [];
//   }, [stopResults]);

//   // =========================================================
//   // UNIQUE STATS
//   // =========================================================

//   const totalStops = useMemo(() => {
//     return new Set(
//       safeResults
//         .map((item) => item?.stopName)
//         .filter(Boolean)
//     ).size;
//   }, [safeResults]);

//   const totalRoutes = useMemo(() => {
//     return new Set(
//       safeResults
//         .map((item) => item?.routeId)
//         .filter(Boolean)
//     ).size;
//   }, [safeResults]);

//   const totalBuses = useMemo(() => {
//     return new Set(
//       safeResults
//         .map((item) => item?.vehicleId)
//         .filter(Boolean)
//     ).size;
//   }, [safeResults]);

//   const activeBuses = useMemo(() => {
//     return new Set(
//       safeResults
//         .filter(
//           (item) =>
//             item?.mappingStatus === "ACTIVE" &&
//             item?.vehicleStatus === "ACTIVE"
//         )
//         .map((item) => item?.vehicleId)
//         .filter(Boolean)
//     ).size;
//   }, [safeResults]);

//   // =========================================================
//   // OPEN MODAL
//   // =========================================================

//   const openStopDetails = (stop) => {
//     setSelectedStop(stop);
//     setShowModal(true);
//   };

//   // =========================================================
//   // CLOSE MODAL
//   // =========================================================

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedStop(null);
//   };

//   // =========================================================
//   // CLEAR SEARCH
//   // =========================================================

//   const clearSearch = () => {
//     setSearch("");
//     setStopResults([]);
//     setError("");
//   };

//   // =========================================================
//   // REFRESH SEARCH
//   // =========================================================

//   const refreshSearch = () => {
//     if (search.trim()) {
//       searchStops(search);
//     }
//   };

//   // =========================================================
//   // STATUS HELPERS
//   // =========================================================

//   const isActive = (stop) => {
//     return (
//       stop?.mappingStatus === "ACTIVE" &&
//       stop?.vehicleStatus === "ACTIVE" &&
//       stop?.routeStatus === "ACTIVE"
//     );
//   };

//   const getDriverStatusClass = (status) => {
//     if (status === "ACTIVE") {
//       return "bg-success-subtle text-success";
//     }

//     return "bg-danger-subtle text-danger";
//   };

//   return (
//     <>
//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="mx-2 mt-2 mb-3">
//         <div
//           className="rounded-4 shadow overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
//             border: "1px solid #dbeafe",
//           }}
//         >
//           <div className="p-3 p-md-4">
//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//               <div className="d-flex align-items-center gap-3">
//                 {/* ICON */}

//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <LuMapPin size={27} />
//                 </div>

//                 {/* TITLE */}

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     Stop Management
//                   </h5>

//                   <div className="text-muted small">
//                     Transport &nbsp;/&nbsp; Stop Management
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* BREADCRUMB */}

//           <div
//             className="px-4 py-2"
//             style={{
//               backgroundColor:
//                 "rgba(239,246,255,.75)",
//               borderTop: "1px solid #e0ecff",
//             }}
//           >
//             <small className="text-muted">
//               Home &nbsp;›&nbsp; Transport &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Stop Management
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           STATS
//       ===================================================== */}

//       <div className="px-2">
//         <div className="row g-3 mb-4 mt-2">
//           {/* TOTAL STOPS */}

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-blue shadow">
//               <div className="stat-icon">
//                 <LuMapPin />
//               </div>

//               <div className="stat-content">
//                 <span>
//                   {search
//                     ? "Matching Stops"
//                     : "Stops Found"}
//                 </span>

//                 <h3>{totalStops}</h3>

//                 <small>
//                   Stops matching your search
//                 </small>
//               </div>
//             </div>
//           </div>

//           {/* ROUTES */}

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-green shadow">
//               <div className="stat-icon">
//                 <LuRoute />
//               </div>

//               <div className="stat-content">
//                 <span>Routes</span>

//                 <h3>{totalRoutes}</h3>

//                 <small>
//                   Routes passing through stop
//                 </small>
//               </div>
//             </div>
//           </div>

//           {/* BUSES */}

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-orange shadow">
//               <div className="stat-icon">
//                 <LuBus />
//               </div>

//               <div className="stat-content">
//                 <span>Buses</span>

//                 <h3>{totalBuses}</h3>

//                 <small>
//                   Buses assigned to routes
//                 </small>
//               </div>
//             </div>
//           </div>

//           {/* ACTIVE BUSES */}

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-red shadow">
//               <div className="stat-icon">
//                 <LuCircleCheck />
//               </div>

//               <div className="stat-content">
//                 <span>Active Buses</span>

//                 <h3>{activeBuses}</h3>

//                 <small>
//                   Currently active
//                 </small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           SEARCH CARD
//       ===================================================== */}

//       <div className="px-2">
//         <div className="card border-0 shadow rounded-4">
//           {/* HEADER */}

//           <div className="card-header bg-white border-0 p-3">
//             <div className="row align-items-center g-3">
//               {/* SEARCH */}

//               <div className="col-lg-7">
//                 <div className="position-relative">
//                   <LuSearch
//                     size={19}
//                     className="position-absolute text-muted"
//                     style={{
//                       left: 13,
//                       top: "50%",
//                       transform:
//                         "translateY(-50%)",
//                     }}
//                   />

//                   <input
//                     type="text"
//                     className="form-control ps-5 pe-5 rounded-3"
//                     placeholder="Search stop name..."
//                     value={search}
//                     onChange={(e) =>
//                       setSearch(e.target.value)
//                     }
//                   />

//                   {/* LOADING */}

//                   {loading && (
//                     <LuLoaderCircle
//                       size={18}
//                       className="position-absolute text-primary"
//                       style={{
//                         right: 42,
//                         top: "50%",
//                         transform:
//                           "translateY(-50%)",
//                         animation:
//                           "spin 1s linear infinite",
//                       }}
//                     />
//                   )}

//                   {/* CLEAR */}

//                   {search && !loading && (
//                     <button
//                       type="button"
//                       className="btn btn-sm p-0 border-0 position-absolute text-muted"
//                       style={{
//                         right: 13,
//                         top: "50%",
//                         transform:
//                           "translateY(-50%)",
//                       }}
//                       onClick={clearSearch}
//                     >
//                       <LuX size={17} />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* RIGHT INFO */}

//               <div className="col-lg-5">
//                 <div className="d-flex justify-content-lg-end align-items-center gap-2">
//                   {search && (
//                     <button
//                       type="button"
//                       className="btn btn-light btn-sm rounded-3"
//                       onClick={refreshSearch}
//                       disabled={loading}
//                       title="Refresh search"
//                     >
//                       <LuRefreshCw
//                         size={15}
//                         className={
//                           loading
//                             ? "spin-animation"
//                             : ""
//                         }
//                       />
//                     </button>
//                   )}

//                   <div className="text-lg-end text-muted small">
//                     Search any stop to see its
//                     <strong className="text-primary ms-1">
//                       route & bus details
//                     </strong>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ERROR */}

//           {error && (
//             <div className="px-3 pb-3">
//               <div className="alert alert-danger mb-0 rounded-3 d-flex align-items-center gap-2">
//                 <LuCircleX size={18} />

//                 <span>{error}</span>
//               </div>
//             </div>
//           )}

//           {/* =================================================
//               TABLE
//           ================================================= */}

//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table className="table align-middle mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th className="px-3">
//                       #
//                     </th>

//                     <th>
//                       Stop
//                     </th>

//                     <th>
//                       Route
//                     </th>

//                     <th>
//                       Bus
//                     </th>

//                     <th>
//                       Driver
//                     </th>

//                     <th>
//                       Status
//                     </th>

//                     <th className="text-center">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {/* =================================================
//                       LOADING
//                   ================================================= */}

//                   {loading && (
//                     <tr>
//                       <td
//                         colSpan="7"
//                         className="text-center py-5"
//                       >
//                         <div className="d-flex flex-column align-items-center text-muted">
//                           <LuLoaderCircle
//                             size={38}
//                             className="text-primary mb-2 spin-animation"
//                           />

//                           <div className="fw-semibold">
//                             Searching stop...
//                           </div>

//                           <small>
//                             Please wait
//                           </small>
//                         </div>
//                       </td>
//                     </tr>
//                   )}

//                   {/* =================================================
//                       RESULTS
//                   ================================================= */}

//                   {!loading &&
//                     safeResults.length > 0 &&
//                     safeResults.map(
//                       (stop, index) => (
//                         <tr
//                           key={`${stop.routeId}-${stop.vehicleId}-${stop.stopName}-${index}`}
//                         >
//                           {/* NUMBER */}

//                           <td className="px-3 text-muted">
//                             {index + 1}
//                           </td>

//                           {/* STOP */}

//                           <td>
//                             <div className="d-flex align-items-center gap-2">
//                               <div
//                                 className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
//                                 style={{
//                                   width: 42,
//                                   height: 42,
//                                 }}
//                               >
//                                 <LuMapPin
//                                   size={21}
//                                 />
//                               </div>

//                               <div>
//                                 <div className="fw-semibold">
//                                   {stop.stopName ||
//                                     "-"}
//                                 </div>

//                                 <small className="text-muted">
//                                   {stop.location ||
//                                     stop.stopName ||
//                                     "-"}
//                                 </small>
//                               </div>
//                             </div>
//                           </td>

//                           {/* ROUTE */}

//                           <td>
//                             <div className="d-flex align-items-center gap-2">
//                               <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
//                                 <LuRoute
//                                   size={12}
//                                   className="me-1"
//                                 />

//                                 {stop.routeName ||
//                                   "-"}
//                               </span>
//                             </div>
//                           </td>

//                           {/* BUS */}

//                           <td>
//                             <div className="d-flex align-items-center gap-2">
//                               <div
//                                 className="rounded-3 bg-warning-subtle text-warning d-flex align-items-center justify-content-center"
//                                 style={{
//                                   width: 38,
//                                   height: 38,
//                                 }}
//                               >
//                                 <LuBus
//                                   size={18}
//                                 />
//                               </div>

//                               <div>
//                                 <div className="fw-semibold">
//                                   {stop.vehicleNumber ||
//                                     "-"}
//                                 </div>

//                                 <small className="text-muted">
//                                   {stop.vehicleType ||
//                                     "-"}
//                                 </small>
//                               </div>
//                             </div>
//                           </td>

//                           {/* DRIVER */}

//                           <td>
//                             {stop.driverName ? (
//                               <div className="d-flex align-items-center gap-2">
//                                 <div
//                                   className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center"
//                                   style={{
//                                     width: 38,
//                                     height: 38,
//                                   }}
//                                 >
//                                   <LuUserRound
//                                     size={18}
//                                   />
//                                 </div>

//                                 <div>
//                                   <div className="fw-semibold">
//                                     {
//                                       stop.driverName
//                                     }
//                                   </div>

//                                   <small className="text-muted">
//                                     {
//                                       stop.driverPhone
//                                     }
//                                   </small>
//                                 </div>
//                               </div>
//                             ) : (
//                               <span className="text-muted small">
//                                 No driver assigned
//                               </span>
//                             )}
//                           </td>

//                           {/* STATUS */}

//                           <td>
//                             {isActive(stop) ? (
//                               <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
//                                 <LuCircleCheck
//                                   size={13}
//                                   className="me-1"
//                                 />

//                                 Active
//                               </span>
//                             ) : (
//                               <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
//                                 <LuCircleX
//                                   size={13}
//                                   className="me-1"
//                                 />

//                                 Inactive
//                               </span>
//                             )}
//                           </td>

//                           {/* ACTION */}

//                           <td>
//                             <div className="d-flex justify-content-center">
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-light text-primary rounded-3"
//                                 title="View Stop Details"
//                                 onClick={() =>
//                                   openStopDetails(
//                                     stop
//                                   )
//                                 }
//                               >
//                                 <LuEye
//                                   size={17}
//                                 />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       )
//                     )}

//                   {/* =================================================
//                       EMPTY
//                   ================================================= */}

//                   {!loading &&
//                     safeResults.length === 0 && (
//                       <tr>
//                         <td
//                           colSpan="7"
//                           className="text-center py-5"
//                         >
//                           <div className="text-muted">
//                             <LuMapPin
//                               size={42}
//                               className="mb-2 opacity-50"
//                             />

//                             <div className="fw-semibold">
//                               {search
//                                 ? "No stop found"
//                                 : "Search a stop"}
//                             </div>

//                             <small>
//                               {search
//                                 ? "Try another stop name."
//                                 : "Enter a stop name to see route, bus and driver details."}
//                             </small>
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* =====================================================
//               FOOTER
//           ===================================================== */}

//           <div className="card-footer bg-white border-0 p-3">
//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
//               <small className="text-muted">
//                 Showing{" "}
//                 <strong>
//                   {safeResults.length}
//                 </strong>{" "}
//                 result
//                 {safeResults.length !== 1
//                   ? "s"
//                   : ""}
//               </small>

//               {search && (
//                 <small className="text-muted">
//                   Search:{" "}
//                   <strong className="text-primary">
//                     "{search}"
//                   </strong>
//                 </small>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           VIEW STOP MODAL
//       ===================================================== */}

//       {showModal && selectedStop && (
//         <div
//           className="modal d-block"
//           tabIndex="-1"
//           style={{
//             background:
//               "rgba(0,0,0,0.45)",
//           }}
//         >
//           <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
//             <div className="modal-content border-0 rounded-4 shadow">
//               {/* =================================================
//                   MODAL HEADER
//               ================================================= */}

//               <div className="modal-header border-0 px-4 pt-4">
//                 <div className="d-flex align-items-center gap-3">
//                   <div
//                     className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
//                     style={{
//                       width: 46,
//                       height: 46,
//                     }}
//                   >
//                     <LuMapPin size={23} />
//                   </div>

//                   <div>
//                     <h5 className="fw-bold mb-1">
//                       {selectedStop.stopName ||
//                         "Stop Details"}
//                     </h5>

//                     <small className="text-muted">
//                       {selectedStop.location ||
//                         selectedStop.stopName ||
//                         "-"}
//                     </small>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   className="btn btn-light rounded-3"
//                   onClick={closeModal}
//                 >
//                   <LuX size={18} />
//                 </button>
//               </div>

//               {/* =================================================
//                   MODAL BODY
//               ================================================= */}

//               <div className="modal-body px-4">
//                 {/* SUMMARY */}

//                 <div className="row g-3 mb-4">
//                   {/* ROUTE */}

//                   <div className="col-md-4">
//                     <div className="p-3 rounded-3 bg-primary-subtle h-100">
//                       <div className="d-flex align-items-center gap-2">
//                         <LuRoute
//                           size={18}
//                           className="text-primary"
//                         />

//                         <small className="text-muted">
//                           Route
//                         </small>
//                       </div>

//                       <h6 className="fw-bold text-primary mb-0 mt-2">
//                         {selectedStop.routeName ||
//                           "-"}
//                       </h6>
//                     </div>
//                   </div>

//                   {/* BUS */}

//                   <div className="col-md-4">
//                     <div className="p-3 rounded-3 bg-warning-subtle h-100">
//                       <div className="d-flex align-items-center gap-2">
//                         <LuBus
//                           size={18}
//                           className="text-warning"
//                         />

//                         <small className="text-muted">
//                           Bus
//                         </small>
//                       </div>

//                       <h6 className="fw-bold text-warning mb-0 mt-2">
//                         {selectedStop.vehicleNumber ||
//                           "-"}
//                       </h6>
//                     </div>
//                   </div>

//                   {/* DRIVER */}

//                   <div className="col-md-4">
//                     <div className="p-3 rounded-3 bg-success-subtle h-100">
//                       <div className="d-flex align-items-center gap-2">
//                         <LuUserRound
//                           size={18}
//                           className="text-success"
//                         />

//                         <small className="text-muted">
//                           Driver
//                         </small>
//                       </div>

//                       <h6 className="fw-bold text-success mb-0 mt-2">
//                         {selectedStop.driverName ||
//                           "Not Assigned"}
//                       </h6>
//                     </div>
//                   </div>
//                 </div>

//                 {/* =================================================
//                     ROUTE DETAILS
//                 ================================================= */}

//                 <h6 className="fw-bold mb-3">
//                   Route Details
//                 </h6>

//                 <div
//                   className="border rounded-4 p-3 mb-4"
//                   style={{
//                     background: "#f8fbff",
//                   }}
//                 >
//                   <div className="row g-3">
//                     {/* ROUTE NAME */}

//                     <div className="col-md-4">
//                       <small className="text-muted d-block">
//                         Route Name
//                       </small>

//                       <span className="fw-semibold">
//                         {selectedStop.routeName ||
//                           "-"}
//                       </span>
//                     </div>

//                     {/* STOP */}

//                     <div className="col-md-4">
//                       <small className="text-muted d-block">
//                         Matching Stop
//                       </small>

//                       <span className="fw-semibold">
//                         {selectedStop.stopName ||
//                           "-"}
//                       </span>
//                     </div>

//                     {/* ROUTE STATUS */}

//                     <div className="col-md-4">
//                       <small className="text-muted d-block mb-1">
//                         Route Status
//                       </small>

//                       {selectedStop.routeStatus ===
//                       "ACTIVE" ? (
//                         <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
//                           <LuCircleCheck
//                             size={13}
//                             className="me-1"
//                           />
//                           Active
//                         </span>
//                       ) : (
//                         <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
//                           <LuCircleX
//                             size={13}
//                             className="me-1"
//                           />
//                           Inactive
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* =================================================
//                     BUS DETAILS
//                 ================================================= */}

//                 <h6 className="fw-bold mb-3">
//                   Bus Details
//                 </h6>

//                 <div
//                   className="border rounded-4 p-3 mb-4"
//                   style={{
//                     background: "#fffaf2",
//                   }}
//                 >
//                   <div className="row g-3">
//                     {/* BUS NUMBER */}

//                     <div className="col-md-4">
//                       <div className="d-flex align-items-center gap-2">
//                         <div
//                           className="rounded-3 bg-warning-subtle text-warning d-flex align-items-center justify-content-center"
//                           style={{
//                             width: 38,
//                             height: 38,
//                           }}
//                         >
//                           <LuBus size={18} />
//                         </div>

//                         <div>
//                           <small className="text-muted d-block">
//                             Bus Number
//                           </small>

//                           <span className="fw-semibold">
//                             {selectedStop.vehicleNumber ||
//                               "-"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* VEHICLE TYPE */}

//                     <div className="col-md-4">
//                       <div className="d-flex align-items-center gap-2">
//                         <div
//                           className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
//                           style={{
//                             width: 38,
//                             height: 38,
//                           }}
//                         >
//                           <LuCar size={18} />
//                         </div>

//                         <div>
//                           <small className="text-muted d-block">
//                             Vehicle Type
//                           </small>

//                           <span className="fw-semibold">
//                             {selectedStop.vehicleType ||
//                               "-"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* MODEL */}

//                     <div className="col-md-4">
//                       <div>
//                         <small className="text-muted d-block">
//                           Vehicle Model
//                         </small>

//                         <span className="fw-semibold">
//                           {selectedStop.vehicleModel ||
//                             "-"}
//                         </span>
//                       </div>
//                     </div>

//                     {/* VEHICLE STATUS */}

//                     <div className="col-md-4">
//                       <div>
//                         <small className="text-muted d-block mb-1">
//                           Vehicle Status
//                         </small>

//                         {selectedStop.vehicleStatus ===
//                         "ACTIVE" ? (
//                           <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
//                             <LuCircleCheck
//                               size={13}
//                               className="me-1"
//                             />
//                             Active
//                           </span>
//                         ) : (
//                           <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
//                             <LuCircleX
//                               size={13}
//                               className="me-1"
//                             />
//                             Inactive
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* MAPPING STATUS */}

//                     <div className="col-md-4">
//                       <div>
//                         <small className="text-muted d-block mb-1">
//                           Route Assignment
//                         </small>

//                         {selectedStop.mappingStatus ===
//                         "ACTIVE" ? (
//                           <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
//                             <LuCircleCheck
//                               size={13}
//                               className="me-1"
//                             />
//                             Active
//                           </span>
//                         ) : (
//                           <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
//                             <LuCircleX
//                               size={13}
//                               className="me-1"
//                             />
//                             Inactive
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* =================================================
//                     DRIVER DETAILS
//                 ================================================= */}

//                 <h6 className="fw-bold mb-3">
//                   Driver Details
//                 </h6>

//                 <div
//                   className="border rounded-4 p-3"
//                   style={{
//                     background: "#f5fff8",
//                   }}
//                 >
//                   {selectedStop.driverName ? (
//                     <div className="row g-3">
//                       {/* NAME */}

//                       <div className="col-md-4">
//                         <div className="d-flex align-items-center gap-2">
//                           <div
//                             className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center"
//                             style={{
//                               width: 38,
//                               height: 38,
//                             }}
//                           >
//                             <LuUserRound
//                               size={18}
//                             />
//                           </div>

//                           <div>
//                             <small className="text-muted d-block">
//                               Driver Name
//                             </small>

//                             <span className="fw-semibold">
//                               {
//                                 selectedStop.driverName
//                               }
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* PHONE */}

//                       <div className="col-md-4">
//                         <div className="d-flex align-items-center gap-2">
//                           <div
//                             className="rounded-3 bg-warning-subtle text-warning d-flex align-items-center justify-content-center"
//                             style={{
//                               width: 38,
//                               height: 38,
//                             }}
//                           >
//                             <LuPhone size={18} />
//                           </div>

//                           <div>
//                             <small className="text-muted d-block">
//                               Phone
//                             </small>

//                             <span className="fw-semibold">
//                               {
//                                 selectedStop.driverPhone
//                               }
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* STATUS */}

//                       <div className="col-md-4">
//                         <div>
//                           <small className="text-muted d-block mb-1">
//                             Driver Status
//                           </small>

//                           <span
//                             className={`badge ${getDriverStatusClass(
//                               selectedStop.driverStatus
//                             )} rounded-pill px-3 py-2`}
//                           >
//                             {selectedStop.driverStatus ===
//                             "ACTIVE" ? (
//                               <>
//                                 <LuCircleCheck
//                                   size={13}
//                                   className="me-1"
//                                 />
//                                 Active
//                               </>
//                             ) : (
//                               <>
//                                 <LuCircleX
//                                   size={13}
//                                   className="me-1"
//                                 />
//                                 Inactive
//                               </>
//                             )}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="text-center py-3 text-muted">
//                       <LuUserRound
//                         size={35}
//                         className="mb-2 opacity-50"
//                       />

//                       <div className="fw-semibold">
//                         No Driver Assigned
//                       </div>

//                       <small>
//                         No driver is currently
//                         assigned to this vehicle.
//                       </small>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* =================================================
//                   MODAL FOOTER
//               ================================================= */}

//               <div className="modal-footer border-0 px-4 pb-4">
//                 <button
//                   type="button"
//                   className="btn btn-primary rounded-3 px-4"
//                   onClick={closeModal}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =====================================================
//           INLINE STYLES
//       ===================================================== */}

//       <style>
//         {`
//           .spin-animation {
//             animation: stopManagementSpin 1s linear infinite;
//           }

//           @keyframes stopManagementSpin {
//             from {
//               transform: rotate(0deg);
//             }

//             to {
//               transform: rotate(360deg);
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default StopManagement;



import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
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
  LuRefreshCw,
  LuLoaderCircle,
  LuCar,
} from "react-icons/lu";

const StopManagement = () => {
  // =========================================================
  // AUTH / SCHOOL
  // =========================================================

  const token = localStorage.getItem("token");

  const schoolId =
    localStorage.getItem("schoolId") ||
    localStorage.getItem("schoolID");

  // =========================================================
  // STATES
  // =========================================================

  const [search, setSearch] = useState("");

  const [mappings, setMappings] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedStop, setSelectedStop] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // =========================================================
  // API CONFIG
  // =========================================================

  const apiConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =========================================================
  // LOAD VEHICLE ROUTE MAPPINGS + DRIVERS
  // =========================================================

  const loadData = async () => {
    if (!schoolId) {
      setError("School ID not found.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const [mappingResponse, driverResponse] =
        await Promise.all([
          axios.get(
            "http://localhost:8080/api/transport/vehicle-routes",
            {
              params: {
                schoolId: schoolId,
              },
              ...apiConfig,
            }
          ),

          axios.get(
            "http://localhost:8080/api/transport/drivers",
            {
              params: {
                schoolId: schoolId,
              },
              ...apiConfig,
            }
          ),
        ]);

      // =====================================================
      // VEHICLE ROUTE DATA
      // =====================================================

      const mappingData = Array.isArray(mappingResponse.data)
        ? mappingResponse.data
        : [];

      // =====================================================
      // DRIVER DATA
      // =====================================================

      const driverData = Array.isArray(driverResponse.data)
        ? driverResponse.data
        : [];

      setMappings(mappingData);
      setDrivers(driverData);

      console.log("Vehicle Route Mappings:", mappingData);
      console.log("Drivers:", driverData);
    } catch (err) {
      console.error("Transport data loading error:", err);

      setMappings([]);
      setDrivers([]);

      setError(
        err?.response?.data?.message ||
          "Failed to load transport data."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadData();
  }, [schoolId]);

  // =========================================================
  // BUILD STOP ROWS
  // =========================================================

  const allStopRows = useMemo(() => {
    const rows = [];

    mappings.forEach((mapping) => {
      if (!mapping) return;

      // -----------------------------------------------------
      // FIND DRIVER BY VEHICLE ID
      // -----------------------------------------------------

      const driver = drivers.find(
        (item) =>
          String(item?.vehicleId) ===
          String(mapping?.vehicleId)
      );

      // -----------------------------------------------------
      // SPLIT STOPS
      // -----------------------------------------------------

      const stops = String(mapping?.stops || "")
        .split(",")
        .map((stop) => stop.trim())
        .filter(Boolean);

      // -----------------------------------------------------
      // IF NO STOP
      // -----------------------------------------------------

      if (stops.length === 0) {
        rows.push({
          rowId: `${mapping.id}-no-stop`,

          mappingId: mapping.id,

          schoolId: mapping.schoolId,

          vehicleId: mapping.vehicleId,
          vehicleNumber: mapping.vehicleNumber,

          routeId: mapping.routeId,
          routeName: mapping.routeName,

          startLocation: mapping.startLocation,
          endLocation: mapping.endLocation,

          stopName: "-",
          location: "-",

          vehicleType: driver?.vehicleType || null,
          vehicleModel: null,

          driverId: driver?.id || null,
          driverName: driver?.driverName || null,
          driverPhone: driver?.mobileNumber || null,
          driverStatus: driver?.status || null,

          routeStatus: mapping.status || null,
          vehicleStatus: driver?.status || null,
          mappingStatus: mapping.status || null,

          assignedAt: mapping.assignedAt,
          updatedAt: mapping.updatedAt,
        });

        return;
      }

      // -----------------------------------------------------
      // CREATE ONE ROW PER STOP
      // -----------------------------------------------------

      stops.forEach((stop, index) => {
        rows.push({
          rowId: `${mapping.id}-${mapping.vehicleId}-${mapping.routeId}-${index}`,

          mappingId: mapping.id,

          schoolId: mapping.schoolId,

          vehicleId: mapping.vehicleId,
          vehicleNumber: mapping.vehicleNumber,

          routeId: mapping.routeId,
          routeName: mapping.routeName,

          startLocation: mapping.startLocation,
          endLocation: mapping.endLocation,

          stopName: stop,
          location: stop,

          vehicleType: driver?.vehicleType || null,
          vehicleModel: null,

          driverId: driver?.id || null,
          driverName: driver?.driverName || null,
          driverPhone: driver?.mobileNumber || null,
          driverStatus: driver?.status || null,

          routeStatus: mapping.status || null,
          vehicleStatus: driver?.status || null,
          mappingStatus: mapping.status || null,

          assignedAt: mapping.assignedAt,
          updatedAt: mapping.updatedAt,
        });
      });
    });

    return rows;
  }, [mappings, drivers]);

  // =========================================================
  // FILTER BY SEARCH
  // =========================================================

  const filteredRows = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return allStopRows;
    }

    return allStopRows.filter((item) => {
      return (
        String(item?.stopName || "")
          .toLowerCase()
          .includes(value) ||

        String(item?.routeName || "")
          .toLowerCase()
          .includes(value) ||

        String(item?.vehicleNumber || "")
          .toLowerCase()
          .includes(value) ||

        String(item?.driverName || "")
          .toLowerCase()
          .includes(value) ||

        String(item?.startLocation || "")
          .toLowerCase()
          .includes(value) ||

        String(item?.endLocation || "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [allStopRows, search]);

  // =========================================================
  // STATS
  // =========================================================

  const totalStops = useMemo(() => {
    return new Set(
      allStopRows
        .map((item) => item?.stopName)
        .filter(
          (stop) => stop && stop !== "-"
        )
    ).size;
  }, [allStopRows]);

  const totalRoutes = useMemo(() => {
    return new Set(
      allStopRows
        .map((item) => item?.routeId)
        .filter(Boolean)
    ).size;
  }, [allStopRows]);

  const totalBuses = useMemo(() => {
    return new Set(
      allStopRows
        .map((item) => item?.vehicleId)
        .filter(Boolean)
    ).size;
  }, [allStopRows]);

  const activeBuses = useMemo(() => {
    return new Set(
      allStopRows
        .filter(
          (item) =>
            item?.mappingStatus === "ACTIVE" &&
            item?.vehicleStatus === "ACTIVE"
        )
        .map((item) => item?.vehicleId)
        .filter(Boolean)
    ).size;
  }, [allStopRows]);

  // =========================================================
  // STATUS
  // =========================================================

  const isActive = (item) => {
    return (
      item?.mappingStatus === "ACTIVE" &&
      item?.routeStatus === "ACTIVE" &&
      item?.vehicleStatus === "ACTIVE"
    );
  };

  const getDriverStatusClass = (status) => {
    if (status === "ACTIVE") {
      return "bg-success-subtle text-success";
    }

    return "bg-danger-subtle text-danger";
  };

  // =========================================================
  // MODAL
  // =========================================================

  const openStopDetails = (stop) => {
    setSelectedStop(stop);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStop(null);
  };

  // =========================================================
  // CLEAR SEARCH
  // =========================================================

  const clearSearch = () => {
    setSearch("");
  };

  // =========================================================
  // REFRESH
  // =========================================================

  const refreshData = () => {
    loadData();
  };

  // =========================================================
  // RENDER
  // =========================================================

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
            <div className="d-flex justify-content-between align-items-center">
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
                    Transport&nbsp;/&nbsp;Stop Management
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-light rounded-3"
                onClick={refreshData}
                disabled={loading}
                title="Refresh"
              >
                <LuRefreshCw
                  size={17}
                  className={
                    loading
                      ? "spin-animation"
                      : ""
                  }
                />
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
              Home&nbsp;›&nbsp;Transport&nbsp;›&nbsp;
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

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-blue shadow">
              <div className="stat-icon">
                <LuMapPin />
              </div>

              <div className="stat-content">
                <span>Stops</span>
                <h3>{totalStops}</h3>
                <small>
                  Total stops configured
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-green shadow">
              <div className="stat-icon">
                <LuRoute />
              </div>

              <div className="stat-content">
                <span>Routes</span>
                <h3>{totalRoutes}</h3>
                <small>
                  Routes with assigned vehicles
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-orange shadow">
              <div className="stat-icon">
                <LuBus />
              </div>

              <div className="stat-content">
                <span>Buses</span>
                <h3>{totalBuses}</h3>
                <small>
                  Assigned route vehicles
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-red shadow">
              <div className="stat-icon">
                <LuCircleCheck />
              </div>

              <div className="stat-content">
                <span>Active Buses</span>
                <h3>{activeBuses}</h3>
                <small>
                  Currently active buses
                </small>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="px-2">
        <div className="card border-0 shadow rounded-4">

          {/* =================================================
              SEARCH HEADER
          ================================================= */}

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
                    className="form-control ps-5 pe-5 rounded-3"
                    placeholder="Search stop, route, bus or driver..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                  {search && (
                    <button
                      type="button"
                      className="btn btn-sm p-0 border-0 position-absolute text-muted"
                      style={{
                        right: 13,
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                      }}
                      onClick={clearSearch}
                    >
                      <LuX size={17} />
                    </button>
                  )}
                </div>
              </div>

              <div className="col-lg-5">
                <div className="d-flex justify-content-lg-end align-items-center gap-2">

                  <small className="text-muted">
                    {search
                      ? `Showing ${filteredRows.length} matching result(s)`
                      : `Showing all ${allStopRows.length} stop row(s)`}
                  </small>

                </div>
              </div>

            </div>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="px-3 pb-3">
              <div className="alert alert-danger mb-0 rounded-3 d-flex align-items-center gap-2">
                <LuCircleX size={18} />
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="card-body p-0">
            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead className="table-light">
                  <tr>
                    <th className="px-3">#</th>
                    <th>Stop</th>
                    <th>Route</th>
                    <th>Bus</th>
                    <th>Driver</th>
                    <th>Status</th>
                    <th className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {/* =================================================
                      LOADING
                  ================================================= */}

                  {loading && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-5"
                      >
                        <div className="d-flex flex-column align-items-center text-muted">

                          <LuLoaderCircle
                            size={38}
                            className="text-primary mb-2 spin-animation"
                          />

                          <div className="fw-semibold">
                            Loading transport data...
                          </div>

                          <small>
                            Loading routes, stops and drivers
                          </small>

                        </div>
                      </td>
                    </tr>
                  )}

                  {/* =================================================
                      DATA
                  ================================================= */}

                  {!loading &&
                    filteredRows.length > 0 &&
                    filteredRows.map(
                      (stop, index) => (
                        <tr key={stop.rowId}>

                          {/* NUMBER */}

                          <td className="px-3 text-muted">
                            {index + 1}
                          </td>

                          {/* STOP */}

                          <td>
                            <div className="d-flex align-items-center gap-2">

                              <div
                                className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                                style={{
                                  width: 42,
                                  height: 42,
                                }}
                              >
                                <LuMapPin size={21} />
                              </div>

                              <div>
                                <div className="fw-semibold">
                                  {stop.stopName || "-"}
                                </div>

                                <small className="text-muted">
                                  {stop.location || "-"}
                                </small>
                              </div>

                            </div>
                          </td>

                          {/* ROUTE */}

                          <td>
                            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">

                              <LuRoute
                                size={12}
                                className="me-1"
                              />

                              {stop.routeName || "-"}
                            </span>

                            <small className="d-block text-muted mt-1">
                              {stop.startLocation}
                              {" → "}
                              {stop.endLocation}
                            </small>
                          </td>

                          {/* BUS */}

                          <td>
                            <div className="d-flex align-items-center gap-2">

                              <div
                                className="rounded-3 bg-warning-subtle text-warning d-flex align-items-center justify-content-center"
                                style={{
                                  width: 38,
                                  height: 38,
                                }}
                              >
                                <LuBus size={18} />
                              </div>

                              <div>

                                <div className="fw-semibold">
                                  {stop.vehicleNumber || "-"}
                                </div>

                                <small className="text-muted">
                                  {stop.vehicleType || "Vehicle"}
                                </small>

                              </div>

                            </div>
                          </td>

                          {/* DRIVER */}

                          <td>

                            {stop.driverName ? (
                              <div className="d-flex align-items-center gap-2">

                                <div
                                  className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center"
                                  style={{
                                    width: 38,
                                    height: 38,
                                  }}
                                >
                                  <LuUserRound size={18} />
                                </div>

                                <div>

                                  <div className="fw-semibold">
                                    {stop.driverName}
                                  </div>

                                  <small className="text-muted">
                                    {stop.driverPhone || "-"}
                                  </small>

                                </div>

                              </div>
                            ) : (
                              <span className="text-muted small">
                                No driver assigned
                              </span>
                            )}

                          </td>

                          {/* STATUS */}

                          <td>

                            {isActive(stop) ? (
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
                            <div className="d-flex justify-content-center">

                              <button
                                type="button"
                                className="btn btn-sm btn-light text-primary rounded-3"
                                title="View Stop Details"
                                onClick={() =>
                                  openStopDetails(stop)
                                }
                              >
                                <LuEye size={17} />
                              </button>

                            </div>
                          </td>

                        </tr>
                      )
                    )}

                  {/* =================================================
                      EMPTY
                  ================================================= */}

                  {!loading &&
                    filteredRows.length === 0 && (
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
                              {search
                                ? "No matching stop found"
                                : "No transport data found"}
                            </div>

                            <small>
                              {search
                                ? "Try another stop, route, bus or driver name."
                                : "Assign a vehicle to a route to see stop details here."}
                            </small>

                          </div>

                        </td>
                      </tr>
                    )}

                </tbody>

              </table>

            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="card-footer bg-white border-0 p-3">

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">

              <small className="text-muted">
                Showing{" "}
                <strong>
                  {filteredRows.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {allStopRows.length}
                </strong>{" "}
                stop rows
              </small>

              {search && (
                <small className="text-muted">
                  Filter:{" "}
                  <strong className="text-primary">
                    "{search}"
                  </strong>
                </small>
              )}

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          VIEW MODAL
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

          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">

            <div className="modal-content border-0 rounded-4 shadow">

              {/* MODAL HEADER */}

              <div className="modal-header border-0 px-4 pt-4">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                    style={{
                      width: 46,
                      height: 46,
                    }}
                  >
                    <LuMapPin size={23} />
                  </div>

                  <div>

                    <h5 className="fw-bold mb-1">
                      {selectedStop.stopName}
                    </h5>

                    <small className="text-muted">
                      {selectedStop.routeName}
                    </small>

                  </div>

                </div>

                <button
                  type="button"
                  className="btn btn-light rounded-3"
                  onClick={closeModal}
                >
                  <LuX size={18} />
                </button>

              </div>

              {/* MODAL BODY */}

              <div className="modal-body px-4">

                {/* SUMMARY */}

                <div className="row g-3 mb-4">

                  <div className="col-md-4">
                    <div className="p-3 rounded-3 bg-primary-subtle h-100">

                      <div className="d-flex align-items-center gap-2">
                        <LuRoute
                          size={18}
                          className="text-primary"
                        />

                        <small className="text-muted">
                          Route
                        </small>
                      </div>

                      <h6 className="fw-bold text-primary mb-0 mt-2">
                        {selectedStop.routeName || "-"}
                      </h6>

                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="p-3 rounded-3 bg-warning-subtle h-100">

                      <div className="d-flex align-items-center gap-2">
                        <LuBus
                          size={18}
                          className="text-warning"
                        />

                        <small className="text-muted">
                          Bus
                        </small>
                      </div>

                      <h6 className="fw-bold text-warning mb-0 mt-2">
                        {selectedStop.vehicleNumber || "-"}
                      </h6>

                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="p-3 rounded-3 bg-success-subtle h-100">

                      <div className="d-flex align-items-center gap-2">
                        <LuUserRound
                          size={18}
                          className="text-success"
                        />

                        <small className="text-muted">
                          Driver
                        </small>
                      </div>

                      <h6 className="fw-bold text-success mb-0 mt-2">
                        {selectedStop.driverName ||
                          "Not Assigned"}
                      </h6>

                    </div>
                  </div>

                </div>

                {/* ROUTE DETAILS */}

                <h6 className="fw-bold mb-3">
                  Route Details
                </h6>

                <div
                  className="border rounded-4 p-3 mb-4"
                  style={{
                    background: "#f8fbff",
                  }}
                >

                  <div className="row g-3">

                    <div className="col-md-4">
                      <small className="text-muted d-block">
                        Route Name
                      </small>

                      <span className="fw-semibold">
                        {selectedStop.routeName || "-"}
                      </span>
                    </div>

                    <div className="col-md-4">
                      <small className="text-muted d-block">
                        Stop
                      </small>

                      <span className="fw-semibold">
                        {selectedStop.stopName || "-"}
                      </span>
                    </div>

                    <div className="col-md-4">
                      <small className="text-muted d-block">
                        Start Location
                      </small>

                      <span className="fw-semibold">
                        {selectedStop.startLocation || "-"}
                      </span>
                    </div>

                    <div className="col-md-4">
                      <small className="text-muted d-block">
                        End Location
                      </small>

                      <span className="fw-semibold">
                        {selectedStop.endLocation || "-"}
                      </span>
                    </div>

                    <div className="col-md-4">

                      <small className="text-muted d-block mb-1">
                        Route Status
                      </small>

                      {selectedStop.routeStatus ===
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

                </div>

                {/* BUS DETAILS */}

                <h6 className="fw-bold mb-3">
                  Bus Details
                </h6>

                <div
                  className="border rounded-4 p-3 mb-4"
                  style={{
                    background: "#fffaf2",
                  }}
                >

                  <div className="row g-3">

                    <div className="col-md-4">

                      <div className="d-flex align-items-center gap-2">

                        <div
                          className="rounded-3 bg-warning-subtle text-warning d-flex align-items-center justify-content-center"
                          style={{
                            width: 38,
                            height: 38,
                          }}
                        >
                          <LuBus size={18} />
                        </div>

                        <div>

                          <small className="text-muted d-block">
                            Bus Number
                          </small>

                          <span className="fw-semibold">
                            {selectedStop.vehicleNumber || "-"}
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="col-md-4">

                      <div className="d-flex align-items-center gap-2">

                        <div
                          className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                          style={{
                            width: 38,
                            height: 38,
                          }}
                        >
                          <LuCar size={18} />
                        </div>

                        <div>

                          <small className="text-muted d-block">
                            Vehicle Type
                          </small>

                          <span className="fw-semibold">
                            {selectedStop.vehicleType || "-"}
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="col-md-4">

                      <small className="text-muted d-block">
                        Vehicle ID
                      </small>

                      <span className="fw-semibold">
                        {selectedStop.vehicleId || "-"}
                      </span>

                    </div>

                    <div className="col-md-4">

                      <small className="text-muted d-block mb-1">
                        Vehicle Status
                      </small>

                      {selectedStop.vehicleStatus ===
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

                    <div className="col-md-4">

                      <small className="text-muted d-block mb-1">
                        Route Assignment
                      </small>

                      {selectedStop.mappingStatus ===
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

                </div>

                {/* DRIVER DETAILS */}

                <h6 className="fw-bold mb-3">
                  Driver Details
                </h6>

                <div
                  className="border rounded-4 p-3"
                  style={{
                    background: "#f5fff8",
                  }}
                >

                  {selectedStop.driverName ? (
                    <div className="row g-3">

                      <div className="col-md-4">

                        <div className="d-flex align-items-center gap-2">

                          <div
                            className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center"
                            style={{
                              width: 38,
                              height: 38,
                            }}
                          >
                            <LuUserRound size={18} />
                          </div>

                          <div>

                            <small className="text-muted d-block">
                              Driver Name
                            </small>

                            <span className="fw-semibold">
                              {selectedStop.driverName}
                            </span>

                          </div>

                        </div>

                      </div>

                      <div className="col-md-4">

                        <div className="d-flex align-items-center gap-2">

                          <div
                            className="rounded-3 bg-warning-subtle text-warning d-flex align-items-center justify-content-center"
                            style={{
                              width: 38,
                              height: 38,
                            }}
                          >
                            <LuPhone size={18} />
                          </div>

                          <div>

                            <small className="text-muted d-block">
                              Phone
                            </small>

                            <span className="fw-semibold">
                              {selectedStop.driverPhone || "-"}
                            </span>

                          </div>

                        </div>

                      </div>

                      <div className="col-md-4">

                        <small className="text-muted d-block mb-1">
                          Driver Status
                        </small>

                        <span
                          className={`badge ${getDriverStatusClass(
                            selectedStop.driverStatus
                          )} rounded-pill px-3 py-2`}
                        >
                          {selectedStop.driverStatus ===
                          "ACTIVE" ? (
                            <>
                              <LuCircleCheck
                                size={13}
                                className="me-1"
                              />
                              Active
                            </>
                          ) : (
                            <>
                              <LuCircleX
                                size={13}
                                className="me-1"
                              />
                              Inactive
                            </>
                          )}
                        </span>

                      </div>

                    </div>
                  ) : (
                    <div className="text-center py-3 text-muted">

                      <LuUserRound
                        size={35}
                        className="mb-2 opacity-50"
                      />

                      <div className="fw-semibold">
                        No Driver Assigned
                      </div>

                      <small>
                        No driver is assigned to this vehicle.
                      </small>

                    </div>
                  )}

                </div>

              </div>

              {/* MODAL FOOTER */}

              <div className="modal-footer border-0 px-4 pb-4">

                <button
                  type="button"
                  className="btn btn-primary rounded-3 px-4"
                  onClick={closeModal}
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          STYLES
      ===================================================== */}

      <style>
        {`
          .spin-animation {
            animation: stopManagementSpin 1s linear infinite;
          }

          @keyframes stopManagementSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};

export default StopManagement;
