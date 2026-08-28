// import React, { useState } from "react";
// import { FaRegEye } from "react-icons/fa6";
// import { IoArrowBack, IoCloseSharp } from "react-icons/io5";
// import { MdAssessment, MdAssignment, MdErrorOutline } from "react-icons/md";
// import { TbBulb } from "react-icons/tb";
// import { TiTick } from "react-icons/ti";

// import { toast } from "react-toastify";
// import axiosInstance from "../../api/axiosInstance";
// import useMasters from "../../hooks/useMasters";
// import { useNavigate } from "react-router-dom";

// const AddAssessmentExam = () => {
//   const { sessions, examTermType } = useMasters();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;

//   const [formData, setFormData] = useState({
//   schoolId: schoolId,
//   examTerm: "",
//   shortCode: "",
//   session: "",
//   examTermType: "",
//   startDate: "",
//   endDate: "",
//   description: "",
//   displayOrder: "",
//   status: true,
// });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "status"
//           ? value === "true"
//           : name === "displayOrder"
//             ? Number(value)
//             : value,
//     }));
//   };

//   const handleSubmit = async () => {
//   try {
//     setLoading(true);

//     const payload = {
//       schoolId: schoolId,
//       examTerm: formData.examTerm,
//       shortCode: formData.shortCode,
//       session: formData.session,
//       examTermType: formData.examTermType,

//       // LocalDateTime ke liye
//       startDate: formData.startDate
//         ? `${formData.startDate}T00:00:00`
//         : null,

//       endDate: formData.endDate
//         ? `${formData.endDate}T23:59:59`
//         : null,

//       description: formData.description,
//       displayOrder: Number(formData.displayOrder),
//       status: formData.status,
//     };

//     console.log("Exam Term Payload :", payload);

//     const response = await axiosInstance.post(
//       "/api/assessment/exam-term",
//       payload
//     );

//     console.log("Response :", response.data);

//     toast.success("Exam Term added successfully");

//     setFormData({
//       schoolId: schoolId,
//       examTerm: "",
//       shortCode: "",
//       session: "",
//       examTermType: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//       displayOrder: "",
//       status: true,
//     });

//   } catch (error) {

//     console.log("Status :", error.response?.status);
//     console.log("Data :", error.response?.data);
//     console.log("Full :", error.response);

//     const message =
//       typeof error.response?.data === "string"
//         ? error.response.data
//         : error.response?.data?.message || "Something went wrong";

//     toast.error(message);

//   } finally {
//     setLoading(false);
//   }
// };
//   return (
//     <>
//       {/* Header */}
//       <div className="row shadow-lg mx-2 mt-2 rounded bg-white p-3 align-items-center">
//         {/* Left Side */}
//         <div className="col-12 col-md-8">
//           <h6 className="mb-2">
//             <MdAssessment className="me-2" />
//             Add Exam Term
//           </h6>

//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb mb-0">
//               <li className="breadcrumb-item">
//                 <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                   <small>Home</small>
//                 </a>
//               </li>

//               <li className="breadcrumb-item active">
//                 <small>School Management</small>
//               </li>

//               <li className="breadcrumb-item active">
//                 <small>Add Exam Term</small>
//               </li>
//             </ol>
//           </nav>
//         </div>

//         {/* Right Side */}
//         <div className="col-12 col-md-4 d-flex justify-content-md-end justify-content-start mt-3 mt-md-0">
//           <button
//             className="btn btn-outline-secondary btn-sm"
//             onClick={() => navigate(-1)}
//           >
//             <IoArrowBack className="me-1" />
//             Back
//           </button>
//         </div>
//       </div>

//       {/* alert  */}
//       <div
//         className="ms-2 me-2 mt-3 alert  p-2 rounded shadow"
//         style={{ backgroundColor: "#ebfffd" }}
//       >
//         <small>
//           <MdErrorOutline /> Create a new exam term for the academic session.
//         </small>
//       </div>

//       <div className="container-fluid mt-3 ">
//         <div className="row g-2 align-items-stretch">
//           <div className="col-12 col-lg-8">
//             <div className="card shadow h-100">
//               <div className="card-header bg-white d-flex align-items-center">
//                 <h6>
//                   <MdAssignment size={20} /> Exam Term Details
//                 </h6>
//               </div>
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Term Name <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter term name"
//                       name="examTerm"
//                       value={formData.examTerm}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Short Code <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="shortCode"
//                       value={formData.shortCode}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           shortCode: e.target.value.toUpperCase(),
//                         })
//                       }
//                       placeholder="Enter short code"
//                     />
//                     <div className="">
//                       <small className="text-muted">
//                         Used for quick reference
//                       </small>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row mt-3 ">
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Sessions <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       id=""
//                       className="form-select"
//                       name="session"
//                       value={formData.session}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select session</option>
//                       {sessions.map((item) => (
//                         <option key={item} value={item}>
//                           {item}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Exam Term Type <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       id=""
//                       className="form-select"
//                       name="examTermType"
//                       value={formData.examTermType}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select term type</option>
//                       {examTermType.map((item) => (
//                         <option key={item} value={item}>
//                           {item}
//                         </option>
//                       ))}
//                     </select>
//                     <div className="">
//                       <small className="text-muted">
//                         e.g.Term,mid-term,final etc
//                       </small>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row mt-3">
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Start Date <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="startDate"
//                       value={formData.startDate}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       End Date <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="endDate"
//                       value={formData.endDate}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="row mt-3">
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Display Order <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter display order 1,2,3"
//                       name="displayOrder"
//                       value={formData.displayOrder}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Status <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       className="form-select w-100"
//                       name="status"
//                       value={String(formData.status)}
//                       onChange={handleChange}
//                     >
//                       <option value="true">Active</option>
//                       <option value="false">Inactive</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="row mt-3">
//                   <div className="col-md-12">
//                     <label htmlFor="">Description (Optional) </label>
//                     <textarea
//                       className="form-control"
//                       maxLength={255}
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                     />
//                     <div className="d-flex justify-content-between">
//                       <small className="text-muted">Max 255 characters</small>
//                       <small className="text-muted">
//                         {formData.description.length} / 255
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//                 <hr />
//                 <div className="row mt-3 ">
//                   <div className="col-md-12 d-flex justify-content-end gap-2">
//                     <button className="btn btn-outline-dark btn-sm">
//                       <IoCloseSharp size={20} /> Cancel
//                     </button>
//                     <button
//                       className="btn btn-success btn-sm"
//                       onClick={handleSubmit}
//                       disabled={loading}
//                     >
//                       <MdAssignment />
//                       {loading ? " Saving..." : " Save Assessment exam"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-lg-4 d-flex flex-column">
//             <div className="card shadow  flex-fill mb-2 alert alert-primary ">
//               <h6>
//                 <MdErrorOutline size={25} /> Assessment exam Information
//               </h6>
//               <div className="card-body mt-0">
//                 <p>
//                   <small>
//                     Assessment categories help organize different assessment
//                     types into meaningful groups.
//                   </small>{" "}
//                 </p>
//                 <h6>Examples:</h6>
//                 <div>
//                   <h6>✔ I Term</h6>
//                   <h6>✔ II Term</h6>
//                 </div>
//               </div>
//             </div>
//             {/* Bottom Card */}
//             <div className="card shadow flex-fill p-3">
//               <h6>
//                 <FaRegEye /> Preview
//               </h6>
//               <hr />
//               <div className="card-body">
//                 <h6>
//                   <small>Exam Term Name : {formData.examTerm || "-"}</small>
//                 </h6>
//                 <h6>
//                   <small>Short Code : {formData.shortCode || "-"}</small>
//                 </h6>

//                 <h6>
//                   <small>Session : {formData.session || "-"}</small>
//                 </h6>
//                 <h6>
//                   <small>Exam Term Type : {formData.examTermType || "-"}</small>
//                 </h6>
//                 <h6>
//                   <small>Start Date : {formData.startDate || "-"}</small>
//                 </h6>
//                 <h6>
//                   <small>End Date : {formData.endDate || "-"}</small>
//                 </h6>
//                 <h6>
//                   <small>Display Order : {formData.displayOrder || "-"}</small>
//                 </h6>
//                 <h6>
//                   <small>
//                     Status : {formData.status ? "Active" : "Inactive"}
//                   </small>
//                 </h6>

//                 <div className="alert alert-warning p-1 mt-3">
//                   <small>
//                     <TbBulb size={20} /> Description :{" "}
//                     {formData.description || "-"}
//                   </small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddAssessmentExam;


import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { IoArrowBack, IoCloseSharp } from "react-icons/io5";
import { MdAssessment, MdAssignment, MdErrorOutline, MdOutlineAssessment, MdOutlineSchool } from "react-icons/md";
import { TbBulb } from "react-icons/tb";

import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";
import { useNavigate } from "react-router-dom";

const AddAssessmentExam = () => {
  const { sessions, examTermType } = useMasters();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;

  const [formData, setFormData] = useState({
    schoolId: schoolId,
    examTerm: "",
    shortCode: "",
    session: "",
    examTermType: "",
    startDate: "",
    endDate: "",
    description: "",
    displayOrder: "",
    status: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "status"
          ? value === "true"
          : name === "displayOrder"
            ? value === ""
              ? ""
              : Number(value)
            : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        schoolId: schoolId,
        examTerm: formData.examTerm,
        shortCode: formData.shortCode,
        session: formData.session,
        examTermType: formData.examTermType,

        startDate: formData.startDate
          ? `${formData.startDate}T00:00:00`
          : null,

        endDate: formData.endDate
          ? `${formData.endDate}T23:59:59`
          : null,

        description: formData.description,
        displayOrder:
          formData.displayOrder === ""
            ? null
            : Number(formData.displayOrder),
        status: formData.status,
      };

      console.log("Exam Term Payload :", payload);

      const response = await axiosInstance.post(
        "/api/assessment/exam-term",
        payload,
      );

      console.log("Response :", response.data);

      toast.success("Exam Term added successfully");

      setFormData({
        schoolId: schoolId,
        examTerm: "",
        shortCode: "",
        session: "",
        examTermType: "",
        startDate: "",
        endDate: "",
        description: "",
        displayOrder: "",
        status: true,
      });
    } catch (error) {
      console.log("Status :", error.response?.status);
      console.log("Data :", error.response?.data);
      console.log("Full :", error.response);

      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

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
                         Add Exam Term
                        </h5>
      
                        <div className="text-muted small">
                          Exam Term &nbsp;/
                          &nbsp; Add Exam Term
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
                        Add Exam Term
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
                    Home &nbsp;›&nbsp; Exam Term
                    &nbsp;›&nbsp;
                    <span className="text-primary fw-semibold">
                     Add Exam Term
                    </span>
                  </small>
                </div>
              </div>
            </div>

      {/* ================= INFO ALERT ================= */}
      <div
        className="mx-2 mt-3 p-2 rounded-3 shadow"
        style={{
          background: "#eff6ff",
          border: "1px solid #dbeafe",
          color: "#1e40af",
        }}
      >
        <small>
          <MdErrorOutline size={20} className="me-1" />
          Create a new exam term for the academic session.
        </small>
      </div>

      {/* ================= MAIN ================= */}
      <div className="container-fluid mt-3">
        <div className="row g-3 align-items-stretch">

          {/* ================= FORM ================= */}
          <div className="col-12 col-lg-8">
            <div
              className="card border-0 shadow h-100"
              style={{
                borderTop: "3px solid #2563eb",
              }}
            >
              <div
                className="card-header bg-white py-3"
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <h6 className="mb-0 fw-semibold">
                  <MdAssignment
                    size={20}
                    className="me-2"
                    style={{ color: "#2563eb" }}
                  />
                  Exam Term Details
                </h6>
              </div>

              <div className="card-body">

                {/* ROW 1 */}
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Term Name{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter term name"
                      name="examTerm"
                      value={formData.examTerm}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Short Code{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="shortCode"
                      value={formData.shortCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shortCode: e.target.value.toUpperCase(),
                        }))
                      }
                      placeholder="Enter short code"
                    />

                    <small className="text-muted">
                      Used for quick reference
                    </small>
                  </div>
                </div>

                {/* ROW 2 */}
                <div className="row g-3 mt-1">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Session{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <select
                      className="form-select"
                      name="session"
                      value={formData.session}
                      onChange={handleChange}
                    >
                      <option value="">Select session</option>

                      {sessions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Exam Term Type{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <select
                      className="form-select"
                      name="examTermType"
                      value={formData.examTermType}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select term type
                      </option>

                      {examTermType.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <small className="text-muted">
                      e.g. Term, Mid-Term, Final
                    </small>
                  </div>
                </div>

                {/* ROW 3 */}
                <div className="row g-3 mt-1">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Start Date{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      End Date{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* ROW 4 */}
                <div className="row g-3 mt-1">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Display Order{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      placeholder="Enter display order 1, 2, 3"
                      name="displayOrder"
                      value={formData.displayOrder}
                      onChange={handleChange}
                    />

                    <small className="text-muted">
                      Used to sort exam terms
                    </small>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Status{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <select
                      className="form-select"
                      name="status"
                      value={String(formData.status)}
                      onChange={handleChange}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="row mt-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Description{" "}
                      <span className="text-muted fw-normal">
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      className="form-control"
                      rows="4"
                      maxLength={255}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter description or instructions for this exam term"
                    />

                    <div className="d-flex justify-content-between mt-1">
                      <small className="text-muted">
                        Maximum 255 characters
                      </small>

                      <small className="text-muted">
                        {formData.description.length} / 255
                      </small>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* BUTTONS */}
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => navigate(-1)}
                  >
                    <IoCloseSharp size={19} />
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    style={{
                      backgroundColor: "#2563eb",
                      borderColor: "#2563eb",
                    }}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    <MdAssignment className="me-1" />

                    {loading
                      ? "Saving..."
                      : "Save Assessment Exam"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="col-12 col-lg-4 d-flex flex-column">

            {/* INFORMATION CARD */}
            <div
              className="card border-0 shadow mb-3"
              style={{
                background: "#eff6ff",
                borderLeft: "4px solid #2563eb",
              }}
            >
              <div className="card-body">
                <h6
                  className="fw-semibold"
                  style={{ color: "#1e40af" }}
                >
                  <MdErrorOutline
                    size={23}
                    className="me-1"
                  />
                  Exam Term Information
                </h6>

                <p className="mb-3">
                  <small className="text-muted">
                    Exam terms help organize assessments into
                    specific academic periods and are used while
                    creating assessments and calculating results.
                  </small>
                </p>

                <h6 className="fw-semibold">
                  Common Examples
                </h6>

                <div className="mt-3">
                  {[
                    "I Term",
                    "II Term",
                    "Mid Term",
                    "Final Term",
                    "Annual Examination",
                    "Periodic Test",
                    "Practical Examination",
                  ].map((item) => (
                    <div
                      key={item}
                      className="d-flex align-items-center mb-2"
                    >
                      <span
                        className="d-flex align-items-center justify-content-center me-2 rounded-circle"
                        style={{
                          width: 22,
                          height: 22,
                          background: "#dbeafe",
                          color: "#2563eb",
                          fontSize: 13,
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </span>

                      <small>{item}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PREVIEW CARD */}
            <div className="card border-0 shadow flex-fill">
              <div className="card-body">

                <h6 className="fw-semibold mb-0">
                  <FaRegEye
                    className="me-2"
                    style={{ color: "#2563eb" }}
                  />
                  Preview
                </h6>

                <hr />

                <div className="mb-3">
                  <small className="text-muted d-block">
                    Exam Term Name
                  </small>
                  <strong>
                    {formData.examTerm || "-"}
                  </strong>
                </div>

                <div className="mb-3">
                  <small className="text-muted d-block">
                    Short Code
                  </small>
                  <strong>
                    {formData.shortCode || "-"}
                  </strong>
                </div>

                <div className="mb-3">
                  <small className="text-muted d-block">
                    Session
                  </small>
                  <strong>
                    {formData.session || "-"}
                  </strong>
                </div>

                <div className="mb-3">
                  <small className="text-muted d-block">
                    Exam Term Type
                  </small>
                  <strong>
                    {formData.examTermType || "-"}
                  </strong>
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <small className="text-muted d-block">
                      Start Date
                    </small>
                    <strong>
                      {formData.startDate || "-"}
                    </strong>
                  </div>

                  <div className="col-6 mb-3">
                    <small className="text-muted d-block">
                      End Date
                    </small>
                    <strong>
                      {formData.endDate || "-"}
                    </strong>
                  </div>
                </div>

                <div className="mb-3">
                  <small className="text-muted d-block">
                    Display Order
                  </small>
                  <strong>
                    {formData.displayOrder || "-"}
                  </strong>
                </div>

                <div className="mb-3">
                  <small className="text-muted d-block">
                    Status
                  </small>

                  {formData.status ? (
                    <span className="badge bg-primary">
                      Active
                    </span>
                  ) : (
                    <span className="badge bg-secondary">
                      Inactive
                    </span>
                  )}
                </div>

                {/* DESCRIPTION */}
                <div
                  className="p-2 rounded-3 mt-3"
                  style={{
                    background: "#eff6ff",
                    border: "1px solid #dbeafe",
                  }}
                >
                  <small
                    style={{ color: "#1e40af" }}
                  >
                    <TbBulb size={19} className="me-1" />

                    <strong>Description:</strong>{" "}
                    {formData.description || "-"}
                  </small>
                </div>

                {/* INFO */}
                <div
                  className="p-2 rounded-3 mt-3"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <small className="text-muted">
                    <MdErrorOutline
                      size={18}
                      className="me-1"
                      style={{ color: "#2563eb" }}
                    />

                    This exam term will be available while
                    creating assessments for the selected
                    academic session.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAssessmentExam;
