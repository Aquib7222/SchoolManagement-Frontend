// import React from "react";
// import { FaPlus, FaRegEye } from "react-icons/fa6";
// import { IoCloseSharp } from "react-icons/io5";
// import {
//   MdAssessment,
//   MdAssignment,
//   MdErrorOutline,
//   MdModeEdit,
// } from "react-icons/md";
// import { TbBulb } from "react-icons/tb";
// import { TiTick } from "react-icons/ti";
// import UX from "../../assets/icon/ux.png";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import useMasters from "../../hooks/useMasters";

// const AssessmentNature = () => {
//   const { assessmentNature } = useMasters();
//   console.log("assessment Nature", assessmentNature);
//   return (
//     <>
//       {/* Header */}
//       <div
//         className="row shadow-lg"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           height: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <MdAssessment /> Assessment Nature Management
//         </h6>
//         <nav aria-label="breadcrumb py-2">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                 <small>Home</small>
//               </a>
//             </li>
//             <li className="breadcrumb-item active">
//               <small>School Management</small>
//             </li>
//             <li className="breadcrumb-item active">
//               <small>Nature</small>
//             </li>
//           </ol>
//           {/* <button className='btn'>View Assessment Structure</button> */}
//         </nav>
//       </div>

//       {/* alert  */}
//       <div
//         className="ms-2 me-2  alert  p-2 rounded shadow"
//         style={{ backgroundColor: "#ebfffd" }}
//       >
//         <small>
//           <MdErrorOutline /> Create and manage assessment nature to classify the
//           purpose or behaviour of assessments.
//         </small>
//       </div>

//       <div className="container-fluid mt-3">
//         <div className="row g-2 align-items-stretch">
//           <div className="col-12 col-lg-4">
//             <div className="card shadow h-100">
//               <div className="card-header bg-white d-flex align-items-center">
//                 <h6>
//                   <MdAssignment size={20} /> Add Assessment Nature
//                 </h6>
//               </div>
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Nature Name <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter nature name"
//                     />
//                     <div className="">
//                       <small className="text-muted">
//                         e.g.Formative,Summative
//                       </small>
//                     </div>
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Short Code <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter short code (e.g.FA)"
//                     />
//                     <div className="">
//                       <small className="text-muted">
//                         Used for quick reference
//                       </small>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row mt-3">
//                   <div className="col-md-12">
//                     <label htmlFor="">Description (Optional) </label>
//                     <textarea
//                       name=""
//                       id=""
//                       className="form-control"
//                       placeholder="Enter description about this nature"
//                     ></textarea>
//                     <div className="d-flex justify-content-between mt-1">
//                       <small className="text-muted">Max 255 characters</small>
//                       <small className="text-muted">0 / 255</small>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row mt-3">
//                   <div className="col-md-12">
//                     <label htmlFor="">
//                       Status <span className="text-danger">*</span>
//                     </label>
//                     <select name="" id="" className="form-select w-25">
//                       <option value="">Select Status</option>
//                       <option value="">Active</option>
//                       <option value="">Inactive</option>
//                     </select>
//                   </div>
//                 </div>
//                 <hr />
//                 <div className="row mt-3 ">
//                   <div className="col-md-12 d-flex justify-content-end gap-2">
//                     <button className="btn btn-outline-dark btn-sm">
//                       <IoCloseSharp size={20} /> Reset
//                     </button>
//                     <button className="btn btn-success btn-sm">
//                       <MdAssignment size={20} /> Save Nature
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-lg-8 d-flex flex-column">
//             <div className="card shadow  flex-fill mb-2 ">
//               <div className="d-flex justify-content-between p-2">
//                 <h6>
//                   <MdErrorOutline size={25} /> Existing Nature
//                 </h6>
//                 {/* <button className="btn btn-success">
//                   {" "}
//                   <FaPlus />
//                   Add Nature
//                 </button> */}
//               </div>

//               <div className="card-body mt-0 table-responsive">
//                 <table className="table table-bordered table-hover">
//                   <thead className="table-primary">
//                     <tr>
//                       <th>#</th>
//                       <th>Nature Name</th>
//                       <th>Short Code</th>
//                       <th>Description</th>
//                       <th>Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {assessmentNature.map((nature, idx) => (
//                       <tr>
//                         <td>{idx + 1}</td>
//                         <td>{nature.name}</td>
//                         <td>{nature.shortCode}</td>
//                         <td>{nature.description}</td>
//                         <td>{nature.status}</td>
//                         <td>
//                           <MdModeEdit
//                             size={20}
//                             className="text-primary me-2"
//                             style={{ cursor: "pointer" }}
//                           />
//                           <RiDeleteBin6Line
//                             size={20}
//                             style={{ cursor: "pointer" }}
//                             className="text-danger"
//                           />{" "}
//                         </td>
//                       </tr>
//                     ))}
//                     {/* <tr>
//                       <td></td>
//                       <td></td>
//                       <td></td>
//                       <td></td>
//                       <td>
//                         <MdModeEdit
//                           size={20}
//                           className="text-primary me-2"
//                           style={{ cursor: "pointer" }}
//                         />
//                         <RiDeleteBin6Line
//                           size={20}
//                           style={{ cursor: "pointer" }}
//                           className="text-danger ms-2"
//                         />{" "}
//                       </td>
//                     </tr> */}
//                   </tbody>
//                 </table>{" "}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* alert  */}
//       <div
//         className="ms-2 me-2 mt-4 alert  p-2 rounded shadow d-flex "
//         style={{ backgroundColor: "#e6ecff" }}
//       >
//         <div>
//           <h6>
//             <MdErrorOutline size={20} /> About Assessment Nature
//           </h6>
//           <small>
//             Assessment nature helps in classifyling assessments based on their
//             purpose and approach.It is used in reports,analysis and result
//             calculations.
//           </small>
//         </div>
//         <img
//           src={UX}
//           alt=""
//           className="ms-5"
//           style={{ width: "100px", height: "60px" }}
//         />
//       </div>
//     </>
//   );
// };

// export default AssessmentNature;


import React from "react";
import { FaRegEye } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import {
  MdAssessment,
  MdAssignment,
  MdErrorOutline,
  MdModeEdit,
  MdOutlineAssessment,
  MdOutlineSchool,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import UX from "../../assets/icon/ux.png";
import useMasters from "../../hooks/useMasters";

const AssessmentNature = () => {
  const { assessmentNature } = useMasters();

  console.log("assessment Nature", assessmentNature);

  return (
    <>
      {/* ================= HEADER ================= */}
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
                      <MdOutlineAssessment
                        size={27}
                      />
                    </div>
    
                    <div>
                      <h5 className="mb-1 fw-bold text-dark">
                        Assessment Nature
                      </h5>
    
                      <div className="text-muted small">
                        Assessment Setup &nbsp;/
                        &nbsp; Assessment Nature
                      </div>
                    </div>
                  </div>
    
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{
                        backgroundColor:
                          "#eff6ff",
                        color: "#2563eb",
                        border:
                          "1px solid #bfdbfe",
                      }}
                    >
                      <MdOutlineSchool className="me-1" />
                      Assessment Setup
                    </span>
    
                  </div>
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
                  Home &nbsp;›&nbsp; Assessment Setup
                  &nbsp;›&nbsp;
                  <span className="text-primary fw-semibold">
                    Assessment Nature
                  </span>
                </small>
              </div>
            </div>
          </div>

      {/* ================= INFO ALERT ================= */}
      <div
        className="mx-2 mt-3 rounded-3 shadow p-2"
        style={{
          background: "#eef5ff",
          border: "1px solid #d7e6ff",
          color: "#1e40af",
        }}
      >
        <small>
          <MdErrorOutline size={19} className="me-1" />
          Create and manage assessment nature to classify the purpose or
          behaviour of assessments.
        </small>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="container-fluid mt-3">
        <div className="row g-3 align-items-stretch">
          {/* ================= ADD NATURE ================= */}
          <div className="col-12 col-lg-4">
            <div
              className="card shadow border-0 rounded-3 h-100"
              style={{
                borderTop: "3px solid #2563eb",
              }}
            >
              <div
                className="card-header bg-white d-flex align-items-center"
                style={{
                  borderBottom: "1px solid #e9eef7",
                }}
              >
                <h6 className="mb-0 fw-semibold">
                  <MdAssignment
                    size={20}
                    className="me-2"
                    style={{ color: "#2563eb" }}
                  />
                  Add Assessment Nature
                </h6>
              </div>

              <div className="card-body">
                {/* Nature Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Nature Name <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter nature name"
                  />

                  <small className="text-muted">
                    e.g. Formative, Summative
                  </small>
                </div>

                {/* Short Code */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Short Code <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter short code (e.g. FA)"
                  />

                  <small className="text-muted">
                    Used for quick reference
                  </small>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Description <span className="text-muted">(Optional)</span>
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    maxLength={255}
                    placeholder="Enter description about this nature"
                  />

                  <div className="d-flex justify-content-between mt-1">
                    <small className="text-muted">
                      Max 255 characters
                    </small>

                    <small className="text-muted">0 / 255</small>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Status <span className="text-danger">*</span>
                  </label>

                  <select className="form-select">
                    <option value="">Select Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>

                <hr />

                {/* Buttons */}
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-outline-secondary btn-sm">
                    <IoCloseSharp size={19} className="me-1" />
                    Reset
                  </button>

                  <button
                    className="btn btn-sm text-white"
                    style={{
                      background: "#2563eb",
                      borderColor: "#2563eb",
                    }}
                  >
                    <MdAssignment size={19} className="me-1" />
                    Save Nature
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ================= EXISTING NATURE ================= */}
          <div className="col-12 col-lg-8">
            <div
              className="card shadow border-0 rounded-3 h-100"
              style={{
                borderTop: "3px solid #2563eb",
              }}
            >
              <div
                className="d-flex justify-content-between align-items-center p-3"
                style={{
                  borderBottom: "1px solid #e9eef7",
                }}
              >
                <h6 className="mb-0 fw-semibold">
                  <MdErrorOutline
                    size={22}
                    className="me-2"
                    style={{ color: "#2563eb" }}
                  />
                  Existing Nature
                </h6>
              </div>

              <div className="card-body table-responsive">
                <table className="table table-hover table-bordered align-middle mb-0">
                  <thead>
                    <tr
                      style={{
                        background: "#eef5ff",
                        color: "#1e40af",
                      }}
                    >
                      <th>#</th>
                      <th>Nature Name</th>
                      <th>Short Code</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody className="text-center">
                    {assessmentNature?.length > 0 ? (
                      assessmentNature.map((nature, idx) => (
                        <tr key={nature.name || idx}>
                          <td>{idx + 1}</td>

                          <td>
                            <strong>{nature.name}</strong>
                          </td>

                          <td>
                            <span
                              className="badge"
                              style={{
                                background: "#e8f1ff",
                                color: "#2563eb",
                              }}
                            >
                              {nature.shortCode}
                            </span>
                          </td>

                          <td>
                            <small className="text-muted">
                              {nature.description || "-"}
                            </small>
                          </td>

                          <td>
                            {nature.status === true ||
                            nature.status === "ACTIVE" ||
                            nature.status === "Active" ? (
                              <span className="badge bg-success">
                                Active
                              </span>
                            ) : (
                              <span className="badge bg-danger">
                                Inactive
                              </span>
                            )}
                          </td>

                          <td>
                            <MdModeEdit
                              size={20}
                              className="text-primary me-2"
                              style={{ cursor: "pointer" }}
                            />

                            <RiDeleteBin6Line
                              size={20}
                              className="text-danger"
                              style={{ cursor: "pointer" }}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-4 text-muted">
                          No assessment nature found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <div
        className="mx-2 mt-4 rounded-3 shadow p-3 d-flex justify-content-between align-items-center"
        style={{
          background: "#eef5ff",
          border: "1px solid #d7e6ff",
        }}
      >
        <div>
          <h6 className="fw-semibold mb-2 text-dark">
            <MdErrorOutline
              size={20}
              className="me-1"
              style={{ color: "#2563eb" }}
            />
            About Assessment Nature
          </h6>

          <small className="text-muted">
            Assessment nature helps in classifying assessments based on their
            purpose and approach. It is used in reports, analysis and result
            calculations.
          </small>
        </div>

        <img
          src={UX}
          alt="Assessment Nature"
          className="ms-3 d-none d-md-block"
          style={{
            width: "100px",
            height: "60px",
            objectFit: "contain",
          }}
        />
      </div>
    </>
  );
};

export default AssessmentNature;

