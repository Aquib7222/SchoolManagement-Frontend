// import React, { useState } from "react";
// import { FaRegEye } from "react-icons/fa6";
// import { IoCloseSharp } from "react-icons/io5";
// import { MdAssessment, MdAssignment, MdErrorOutline } from "react-icons/md";
// import { TbBulb } from "react-icons/tb";
// import { TiTick } from "react-icons/ti";
// import useMasters from "../../hooks/useMasters";
// import { toast } from "react-toastify";
// import axiosInstance from "../../api/axiosInstance";

// const AddAssessmentCategory = () => {
//   const { assessmentNature } = useMasters();
//   const [loading, setLoading] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;
//   console.log("school id ", schoolId);
//   const [formData, setFormData] = useState({
//     schoolId: schoolId,
//     categoryName: "",
//     shortCode: "",
//     nature: "",
//     weightage:"",

//     description: "",
//     displayOrder: "",
//     status: true,
//   });

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
//     try {
//       setLoading(true);

//       await axiosInstance.post("/api/assessment/category", formData);

//       toast.success("Assessment Category Added Successfully");

//       setFormData({
//         schoolId: schoolId,
//         categoryName: "",
//         shortCode: "",
//         nature: "",
//         weightage:"",
//         description: "",
//         displayOrder: "",
//         status: true,
//       });
//     } catch (error) {
//       console.log("Status :", error.response?.status);
//       console.log("Data :", error.response?.data);
//       console.log("Full :", error.response);

//       toast.error(error.response?.data || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

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
//           <MdAssessment /> Add Assessment Category
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
//               <small>Add Assessment Category</small>
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
//           <MdErrorOutline /> Create a new assessment category to organize
//           different types of assessments.
//         </small>
//       </div>

//       <div className="container-fluid mt-3 ">
//         <div className="row g-2 align-items-stretch">
//           <div className="col-12 col-lg-8">
//             <div className="card shadow h-100">
//               <div className="card-header bg-white d-flex align-items-center">
//                 <h6>
//                   <MdAssignment size={20} /> Assessment Category Details
//                 </h6>
//               </div>
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Assessment Category Name{" "}
//                       <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter category name"
//                       name="categoryName"
//                       value={formData.categoryName}
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
//                     <label htmlFor="">Default Nature</label>
//                     <select
//                       id=""
//                       className="form-select"
//                       name="nature"
//                       value={formData.nature}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select nature</option>
//                       {assessmentNature.map((item) => (
//                         <option key={item.name} value={item.name}>
//                           {item.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">
//                       Display Order <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="displayOrder"
//                       value={formData.displayOrder}
//                       onChange={handleChange}
//                     />
//                     <div className="">
//                       <small className="text-muted">
//                         Used to sort in dropdowns
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row mt-3">
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="">Weightage %</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter weightage "
//                       name="weightage"
//                       value={formData.weightage}
//                       onChange={handleChange}
//                     />
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
//                 <div className="row mt-3">
//                   <div className="col-md-12">
//                     <label htmlFor="">
//                       Status <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       className="form-select w-25"
//                       name="status"
//                       value={String(formData.status)}
//                       onChange={handleChange}
//                     >
//                       <option value="true">Active</option>
//                       <option value="false">Inactive</option>
//                     </select>
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
//                       {loading ? " Saving..." : " Save Assessment Category"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-lg-4 d-flex flex-column">
//             <div className="card shadow  flex-fill mb-2 alert alert-primary ">
//               <h6>
//                 <MdErrorOutline size={25} /> Assessment Category Information
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
//                   <h6>✔ Internal Assessment</h6>
//                   <h6>✔ Main Examination</h6>
//                   <h6>✔ Practical Examination</h6>
//                   <h6>✔ Oral Assessment</h6>
//                   <h6>✔ Assignment & Project</h6>
//                   <h6>✔ Co-curricular Assessment</h6>
//                   <h6>✔ Skill Evaluation</h6>
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
//                   <small>Category Name : {formData.categoryName || "-"}</small>
//                 </h6>
//                 <h6>
//                   <small>Short Code : {formData.shortCode || "-"}</small>
//                 </h6>

//                 <h6>
//                   <small>Nature : {formData.nature || "-"}</small>
//                 </h6>
//                 <h6>
//                   <small>Weightage : {formData.weightage || "-"}</small>
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

// export default AddAssessmentCategory;



import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import {
  MdAssessment,
  MdAssignment,
  MdErrorOutline,
  MdOutlineAssessment,
  MdOutlineSchool,
} from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import { FaLayerGroup, FaSave } from "react-icons/fa";
import useMasters from "../../hooks/useMasters";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddAssessmentCategory = () => {
  const { assessmentNature } = useMasters();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;

  const [formData, setFormData] = useState({
    schoolId: schoolId,
    categoryName: "",
    shortCode: "",
    nature: "",
    weightage: "",
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
            : name === "weightage"
              ? value === ""
                ? ""
                : Number(value)
              : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.categoryName.trim()) {
      toast.error("Please enter category name");
      return;
    }

    if (!formData.shortCode.trim()) {
      toast.error("Please enter short code");
      return;
    }

    if (!formData.displayOrder && formData.displayOrder !== 0) {
      toast.error("Please enter display order");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        schoolId: schoolId,
      };

      await axiosInstance.post(
        "/api/assessment/category",
        payload
      );

      toast.success("Assessment Category Added Successfully");

      setFormData({
        schoolId: schoolId,
        categoryName: "",
        shortCode: "",
        nature: "",
        weightage: "",
        description: "",
        displayOrder: "",
        status: true,
      });
    } catch (error) {
      console.log("Status :", error.response?.status);
      console.log("Data :", error.response?.data);
      console.log("Full :", error.response);

      toast.error(
        error.response?.data || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/assessment/category");
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
                         Add Assessment Category
                       </h5>
     
                       <div className="text-muted small">
                         Assessment Category &nbsp;/
                         &nbsp; Add Assessment Category
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
                       Assessment Category
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
                   Home &nbsp;›&nbsp; Assessment Category
                   &nbsp;›&nbsp;
                   <span className="text-primary fw-semibold">
                     Add Assessment Category
                   </span>
                 </small>
               </div>
             </div>
           </div>

      {/* ================= INFO ALERT ================= */}
      <div
        className="ms-2 me-2 mt-3 px-3 py-2 rounded-3 shadow"
        style={{
          background: "#eff6ff",
          border: "1px solid #dbeafe",
          color: "#1e40af",
        }}
      >
        <small className="d-flex align-items-center gap-2">
          <MdErrorOutline size={20} />
          Create a new assessment category to organize
          different types of assessments.
        </small>
      </div>

      {/* ================= MAIN ================= */}
      <div className="container-fluid mt-3">
        <div className="row g-3 align-items-stretch">

          {/* ================= LEFT FORM ================= */}
          <div className="col-12 col-lg-8">
            <div
              className="card h-100 border-0 shadow"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              {/* Card Header */}
              <div
                className="card-header bg-white py-3"
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                  <span
                    className="d-flex align-items-center justify-content-center me-2"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "8px",
                      background: "#eff6ff",
                    }}
                  >
                    <MdAssignment
                      size={19}
                      style={{ color: "#2563eb" }}
                    />
                  </span>

                  Assessment Category Details
                </h6>

                <small className="text-muted ms-5">
                  Configure category information and assessment settings
                </small>
              </div>

              <div className="card-body p-4">

                {/* Category Name + Short Code */}
                <div className="row g-3">

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Assessment Category Name
                      <span className="text-danger ms-1">*</span>
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter category name"
                      name="categoryName"
                      value={formData.categoryName}
                      onChange={handleChange}
                    />

                    <small className="text-muted">
                      Example: Internal Assessment
                    </small>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Short Code
                      <span className="text-danger ms-1">*</span>
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="shortCode"
                      value={formData.shortCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shortCode:
                            e.target.value.toUpperCase(),
                        }))
                      }
                      placeholder="Enter short code"
                    />

                    <small className="text-muted">
                      Used for quick reference
                    </small>
                  </div>
                </div>

                {/* Nature + Display Order */}
                <div className="row g-3 mt-2">

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Default Nature
                    </label>

                    <select
                      className="form-select"
                      name="nature"
                      value={formData.nature}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select nature
                      </option>

                      {assessmentNature.map((item) => (
                        <option
                          key={item.name}
                          value={item.name}
                        >
                          {item.displayName || item.name}
                        </option>
                      ))}
                    </select>

                    <small className="text-muted">
                      Default nature for this category
                    </small>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Display Order
                      <span className="text-danger ms-1">*</span>
                    </label>

                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      name="displayOrder"
                      value={formData.displayOrder}
                      onChange={handleChange}
                      placeholder="Enter display order"
                    />

                    <small className="text-muted">
                      Used to sort categories in dropdowns
                    </small>
                  </div>
                </div>

                {/* Weightage */}
                <div className="row g-3 mt-2">

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Weightage %
                    </label>

                    <div className="input-group">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="form-control"
                        placeholder="Enter weightage"
                        name="weightage"
                        value={formData.weightage}
                        onChange={handleChange}
                      />

                      <span className="input-group-text bg-light">
                        %
                      </span>
                    </div>

                    <small className="text-muted">
                      Used in result calculation
                    </small>
                  </div>

                </div>

                {/* Description */}
                <div className="row mt-3">
                  <div className="col-12">

                    <label className="form-label fw-semibold">
                      Description
                      <span className="text-muted fw-normal">
                        {" "}(Optional)
                      </span>
                    </label>

                    <textarea
                      className="form-control"
                      rows="4"
                      maxLength={255}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter description or instructions for this category..."
                    />

                    <div className="d-flex justify-content-between mt-1">
                      <small className="text-muted">
                        Maximum 255 characters
                      </small>

                      <small
                        className={
                          formData.description.length > 230
                            ? "text-danger"
                            : "text-muted"
                        }
                      >
                        {formData.description.length} / 255
                      </small>
                    </div>

                  </div>
                </div>

                {/* Status */}
                <div className="row mt-3">
                  <div className="col-12 col-md-6">

                    <label className="form-label fw-semibold">
                      Status
                      <span className="text-danger ms-1">*</span>
                    </label>

                    <select
                      className="form-select"
                      name="status"
                      value={String(formData.status)}
                      onChange={handleChange}
                    >
                      <option value="true">
                        Active
                      </option>

                      <option value="false">
                        Inactive
                      </option>
                    </select>

                  </div>
                </div>

                <hr className="my-4" />

                {/* Buttons */}
                <div className="d-flex justify-content-end gap-2">

                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm px-3"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    <IoCloseSharp size={18} />
                    {" "}Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm px-3"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                      background: "#2563eb",
                      borderColor: "#2563eb",
                    }}
                  >
                    <FaSave size={15} />
                    {" "}
                    {loading
                      ? "Saving..."
                      : "Save Assessment Category"}
                  </button>

                </div>

              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="col-12 col-lg-4 d-flex flex-column gap-3">

            {/* Information Card */}
            <div
              className="card border-0 shadow"
              style={{
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)",
              }}
            >
              <div className="card-body p-4">

                <div className="d-flex align-items-center mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center me-2"
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "9px",
                      background: "#dbeafe",
                    }}
                  >
                    <FaLayerGroup
                      size={19}
                      style={{ color: "#2563eb" }}
                    />
                  </div>

                  <div>
                    <h6 className="mb-0 fw-semibold">
                      Category Information
                    </h6>
                    <small className="text-muted">
                      Understand assessment categories
                    </small>
                  </div>
                </div>

                <p className="text-muted mb-3">
                  <small>
                    Assessment categories help organize different
                    assessment types into meaningful groups.
                  </small>
                </p>

                <h6 className="fw-semibold mb-2">
                  Common Examples
                </h6>

                <div className="d-flex flex-column gap-2">

                  {[
                    "Internal Assessment",
                    "Main Examination",
                    "Practical Examination",
                    "Oral Assessment",
                    "Assignment & Project",
                    "Co-curricular Assessment",
                    "Skill Evaluation",
                  ].map((item) => (
                    <div
                      key={item}
                      className="d-flex align-items-center"
                    >
                      <span
                        className="d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          background: "#dbeafe",
                        }}
                      >
                        <TiTick
                          size={17}
                          style={{ color: "#2563eb" }}
                        />
                      </span>

                      <small className="text-dark">
                        {item}
                      </small>
                    </div>
                  ))}

                </div>
              </div>
            </div>

            {/* Preview Card */}
            <div
              className="card border-0 shadow flex-fill"
              style={{
                borderRadius: "10px",
              }}
            >
              <div className="card-body p-4">

                <div className="d-flex align-items-center mb-2">
                  <FaRegEye
                    size={18}
                    style={{ color: "#2563eb" }}
                    className="me-2"
                  />

                  <h6 className="mb-0 fw-semibold">
                    Live Preview
                  </h6>
                </div>

                <hr />

                <div className="mb-3">
                  <small className="text-muted d-block">
                    Category Name
                  </small>

                  <span className="fw-semibold">
                    {formData.categoryName || "-"}
                  </span>
                </div>

                <div className="row g-3">

                  <div className="col-6">
                    <small className="text-muted d-block">
                      Short Code
                    </small>

                    <span className="fw-semibold">
                      {formData.shortCode || "-"}
                    </span>
                  </div>

                  <div className="col-6">
                    <small className="text-muted d-block">
                      Nature
                    </small>

                    <span className="fw-semibold">
                      {formData.nature || "-"}
                    </span>
                  </div>

                  <div className="col-6">
                    <small className="text-muted d-block">
                      Weightage
                    </small>

                    <span className="fw-semibold">
                      {formData.weightage !== ""
                        ? `${formData.weightage}%`
                        : "-"}
                    </span>
                  </div>

                  <div className="col-6">
                    <small className="text-muted d-block">
                      Display Order
                    </small>

                    <span className="fw-semibold">
                      {formData.displayOrder !== ""
                        ? formData.displayOrder
                        : "-"}
                    </span>
                  </div>

                  <div className="col-12">
                    <small className="text-muted d-block">
                      Status
                    </small>

                    {formData.status ? (
                      <span className="badge bg-success">
                        Active
                      </span>
                    ) : (
                      <span className="badge bg-danger">
                        Inactive
                      </span>
                    )}
                  </div>

                </div>

                {/* Description */}
                <div
                  className="mt-4 p-3 rounded-3"
                  style={{
                    background: "#eff6ff",
                    border: "1px solid #dbeafe",
                  }}
                >
                  <div className="d-flex align-items-start">
                    <TbBulb
                      size={20}
                      className="me-2 flex-shrink-0"
                      style={{ color: "#2563eb" }}
                    />

                    <div>
                      <small className="fw-semibold d-block">
                        Description
                      </small>

                      <small className="text-muted">
                        {formData.description || "No description added"}
                      </small>
                    </div>
                  </div>
                </div>

                {/* Bottom Note */}
                <div
                  className="mt-3 p-2 rounded-3"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <small className="text-muted">
                    <TbBulb
                      size={17}
                      className="me-1"
                      style={{ color: "#2563eb" }}
                    />
                    This category will be available when creating
                    assessment types.
                  </small>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= PAGE CSS ================= */}
      <style>
        {`
          .form-control,
          .form-select {
            border-color: #dbe2ea;
            border-radius: 7px;
            min-height: 40px;
            font-size: 14px;
          }

          .form-control:focus,
          .form-select:focus {
            border-color: #60a5fa;
            box-shadow: 0 0 0 0.15rem rgba(37, 99, 235, 0.10);
          }

          textarea.form-control {
            min-height: 100px;
          }

          .form-label {
            font-size: 14px;
            color: #334155;
            margin-bottom: 6px;
          }

          .btn {
            border-radius: 7px;
          }

          .card {
            transition: all 0.2s ease;
          }

          .card:hover {
            box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08) !important;
          }

          @media (max-width: 767px) {
            .container-fluid {
              padding-left: 8px;
              padding-right: 8px;
            }

            .card-body {
              padding: 16px !important;
            }

            .w-25 {
              width: 100% !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default AddAssessmentCategory;

