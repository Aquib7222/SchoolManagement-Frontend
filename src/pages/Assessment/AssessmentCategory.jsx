// import React, { useEffect, useState } from "react";
// import { BiSolidCategoryAlt } from "react-icons/bi";
// import { CiCircleCheck } from "react-icons/ci";
// import { FaRegPauseCircle } from "react-icons/fa";
// import { FaPlus, FaUserGraduate } from "react-icons/fa6";
// import { IoFilterSharp } from "react-icons/io5";
// import { MdAssessment, MdErrorOutline, MdModeEdit } from "react-icons/md";
// import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { VscThreeBars } from "react-icons/vsc";
// import UX from "../../assets/icon/ux.png";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";
// import { toast } from "react-toastify";

// const AssessmentCategory = () => {
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [categoryList, setCategoryList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const user =JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;

//   const getAssessmentCategories = async () => {
//     try {
//       setLoading(true);

//     //   const user = JSON.parse(localStorage.getItem("user"));
//     //   const schoolId = user?.schoolId;

//       const response = await axiosInstance.get("/api/assessment/category", {
//         params: {
//           schoolId,
//         },
//       });

//       setCategoryList(response.data);
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data || "Failed to load categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this category?",
//     );

//     if (!confirmDelete) return;

//     try {
//       await axiosInstance.delete(`/api/assessment/category/${id}`, {
//         params: {
//           schoolId,
//         },
//       });

//       toast.success("Assessment Category Deleted Successfully");

//       getAssessmentCategories();
//     } catch (error) {
//       toast.error(error.response?.data || "Failed to delete category");
//     }
//   };

//   useEffect(() => {
//     getAssessmentCategories();
//   }, []);

//   console.log("category", categoryList);

//   const itemsPerPage = 10;

//   const handleNavigate = () => {
//     navigate("/assessment/add/category");
//   };

//   const activeCount = categoryList.filter((item) => item.status).length;

//   const inactiveCount = categoryList.filter((item) => !item.status).length;

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
//           <MdAssessment /> Assessment Category Management
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
//               <small>Assessment Category</small>
//             </li>
//           </ol>
//           {/* <button className='btn'>View Assessment Structure</button> */}
//         </nav>
//       </div>

//       {/* alert  */}
//       <div
//         className="ms-2 me-2 mt-2 alert  p-2 rounded shadow"
//         style={{ backgroundColor: "#ebfffd" }}
//       >
//         <small>
//           <MdErrorOutline size={20} /> Create and manage different type of
//           assessment used in this school.
//         </small>
//       </div>

//       <div className="ms-2 me-2 mt-4">
//         <div className="row ">
//           <div className="col-12 col-sm-3 col-lg-3">
//             <div className="card shadow rounded">
//               <div className="card-body">
//                 <div className="d-flex align-items-center">
//                   <div
//                     className="rounded-3 d-flex align-items-center justify-content-center me-3 "
//                     style={{
//                       width: 55,
//                       height: 55,
//                       background: "#E8F1FF",
//                     }}
//                   >
//                     <PiDotsThreeOutlineVerticalLight
//                       size={26}
//                       color="#2563eb"
//                     />
//                     <VscThreeBars size={26} color="#2563eb" />
//                   </div>

//                   <div className="flex-grow-1">
//                     <small className="text-muted d-block">
//                       Total Categories
//                     </small>

//                     <h4 className="fw-bold mb-0">{categoryList.length}</h4>

//                     <small className="text-success">
//                       Across all Assessment Type
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-sm-3 col-lg-3 ">
//             {" "}
//             <div className="card shadow rounded">
//               <div className="card-body">
//                 <div className="d-flex align-items-center">
//                   <div
//                     className="rounded-3 d-flex align-items-center justify-content-center me-3"
//                     style={{
//                       width: 55,
//                       height: 55,
//                       background: "#E8F1FF",
//                     }}
//                   >
//                     <CiCircleCheck size={26} color="#2563eb" />
//                   </div>

//                   <div className="flex-grow-1">
//                     <small className="text-muted d-block">
//                       Active Categories
//                     </small>

//                     <h4 className="fw-bold mb-0">{activeCount}</h4>

//                     <small className="text-success">Currently Active</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-sm-3 col-lg-3 ">
//             <div className="card shadow rounded">
//               <div className="card-body">
//                 <div className="d-flex align-items-center">
//                   <div
//                     className="rounded-3 d-flex align-items-center justify-content-center me-3"
//                     style={{
//                       width: 55,
//                       height: 55,
//                       background: "#ffe54f",
//                     }}
//                   >
//                     <FaRegPauseCircle size={26} color="#fff2a8" />
//                   </div>

//                   <div className="flex-grow-1">
//                     <small className="text-muted d-block">
//                       Inactive Categories
//                     </small>

//                     <h4 className="fw-bold mb-0">{inactiveCount}</h4>

//                     <small className="text-success">Currently Inactive</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-sm-3 col-lg-3 ">
//             <div className="card shadow rounded">
//               <div className="card-body">
//                 <div className="d-flex align-items-center">
//                   <div
//                     className="rounded-3 d-flex align-items-center justify-content-center me-3"
//                     style={{
//                       width: 55,
//                       height: 55,
//                       background: "#E8F1FF",
//                     }}
//                   >
//                     <BiSolidCategoryAlt size={26} color="#2563eb" />
//                   </div>

//                   <div className="flex-grow-1">
//                     <small className="text-muted d-block">
//                       Used in Assessment
//                     </small>

//                     <h4 className="fw-bold mb-0">3</h4>

//                     <small className="text-success">Categories in use.</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row  mt-4 me-1">
//         <div className="col-12 col-lg-12 d-flex gap-4 justify-content-end">
//           <input
//             type="search"
//             name=""
//             id=""
//             className="form-control w-25"
//             placeholder="Search Assessment Category"
//           />
//           <button className="btn btn-outline-dark btn-sm">
//             <IoFilterSharp size={20} /> Filter
//           </button>
//           <button className="btn btn-success" onClick={handleNavigate}>
//             <FaPlus size={20} /> Add Category
//           </button>
//         </div>
//       </div>

//       <div className="ms-2 me-2 mt-4  rounded shadow ">
//         <div className="card ">
//           <div className="card-body  table-responsive ">
//             <table className="table table-bordered table-hover">
//               <thead className="table-success">
//                 <tr>
//                   <th>S.No</th>
//                   <th>Category Name</th>
//                   <th>Short Code</th>

//                   <th>Description</th>
//                   <th>Nature</th>
//                   <th>Default Weightage(%)</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody className="text-center align-middle">
//                 {categoryList.map((category, idx) => (
//                   <tr className="">
//                     <td>{idx + 1}</td>
//                     <td>{category.categoryName}</td>
//                     <td>{category.shortCode}</td>
//                     <td style={{ width: "30%" }}>
//                       <small>{category.description}</small>
//                     </td>
//                     <td>{category.nature}</td>
//                     <td>{category.weightage}</td>
//                     <td>
//                       {category.status ? (
//                         <span className="badge bg-success">Active</span>
//                       ) : (
//                         <span className="badge bg-danger">Inactive</span>
//                       )}
//                     </td>
//                     <td className="">
//                       <MdModeEdit
//                         size={20}
//                         className="text-primary me-2"
//                         style={{ cursor: "pointer" }}
//                       />
//                       <RiDeleteBin6Line
//                         size={20}
//                         className="text-danger cursor"
//                         style={{ cursor: "pointer" }}
//                         onClick={() => handleDelete(category.id)}
//                       />{" "}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         {/* </div> */}
//       </div>
//       <div className="d-flex justify-content-end mt-4">
//         <nav>
//           <ul className="pagination pagination mb-0">
//             {/* Previous */}
//             <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//               <button
//                 className="page-link"
//                 // onClick={() => setCurrentPage((prev) => prev - 1)}
//                 // disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//             </li>

//             {/* Current Page */}
//             <li className="page-item active">
//               {/* <span className="page-link">{currentPage}</span> */}
//             </li>

//             {/* Next */}
//             <li
//             //   className={`page-item ${
//             //     currentPage === totalPages ? "disabled" : ""
//             //   }`}
//             >
//               <button
//                 className="page-link"
//                 // onClick={() => setCurrentPage((prev) => prev + 1)}
//                 // disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* alert  */}
//       <div
//         className="ms-2 me-2 mt-4 alert  p-2 rounded  d-flex "
//         style={{ backgroundColor: "#e6ecff" }}
//       >
//         <div>
//           <h6>
//             <MdErrorOutline size={20} /> About Assessment Category
//           </h6>
//           <small>
//             Assessment Type help you to organize and classify different
//             evaluations.Weightage is used in calculation.You can change the
//             status to active or deactivate any assessment type.
//           </small>
//         </div>
//         <img
//           src={UX}
//           alt=""
//           className=""
//           style={{ width: "100px", height: "60px" }}
//         />
//       </div>
//     </>
//   );
// };

// export default AssessmentCategory;


import React, { useEffect, useMemo, useState } from "react";
import {
  BiSolidCategoryAlt,
} from "react-icons/bi";
import {
  FaRegPauseCircle,
  FaPlus,
} from "react-icons/fa";
import {
  IoFilterSharp,
} from "react-icons/io5";
import {
  MdAssessment,
  MdErrorOutline,
  MdModeEdit,
  MdOutlineAssessment,
  MdOutlineSchool,
} from "react-icons/md";
import {
  RiDeleteBin6Line,
} from "react-icons/ri";
import {
  PiDotsThreeOutlineVerticalLight,
} from "react-icons/pi";
import {
  VscThreeBars,
} from "react-icons/vsc";
import {
  CiCircleCheck,
} from "react-icons/ci";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import UX from "../../assets/icon/ux.png";

const AssessmentCategory = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;

  const itemsPerPage = 10;

  // ==============================
  // GET CATEGORIES
  // ==============================
  const getAssessmentCategories = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        "/api/assessment/category",
        {
          params: {
            schoolId,
          },
        }
      );

      setCategoryList(response.data || []);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data || "Failed to load categories"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // DELETE CATEGORY
  // ==============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assessment category?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(
        `/api/assessment/category/${id}`,
        {
          params: {
            schoolId,
          },
        }
      );

      toast.success(
        "Assessment Category Deleted Successfully"
      );

      getAssessmentCategories();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data ||
          "Failed to delete category"
      );
    }
  };

  // ==============================
  // LOAD DATA
  // ==============================
  useEffect(() => {
    getAssessmentCategories();
  }, []);

  // ==============================
  // COUNTS
  // ==============================
  const activeCount = categoryList.filter(
    (item) => item.status
  ).length;

  const inactiveCount = categoryList.filter(
    (item) => !item.status
  ).length;

  // ==============================
  // SEARCH + FILTER
  // ==============================
  const filteredCategories = useMemo(() => {
    return categoryList.filter((category) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        category.categoryName
          ?.toLowerCase()
          .includes(searchText) ||
        category.shortCode
          ?.toLowerCase()
          .includes(searchText) ||
        category.nature
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && category.status) ||
        (statusFilter === "INACTIVE" && !category.status);

      return matchesSearch && matchesStatus;
    });
  }, [categoryList, search, statusFilter]);

  // ==============================
  // PAGINATION
  // ==============================
  const totalPages = Math.ceil(
    filteredCategories.length / itemsPerPage
  );

  const currentData = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // ==============================
  // NAVIGATION
  // ==============================
  const handleNavigate = () => {
    navigate("/assessment/add/category");
  };

  // ==============================
  // CATEGORY BADGE
  // ==============================
  const getNatureBadge = (nature) => {
    if (!nature) {
      return "badge bg-secondary-subtle text-secondary";
    }

    const value = nature.toLowerCase();

    if (value.includes("formative")) {
      return "badge bg-primary-subtle text-primary";
    }

    if (value.includes("summative")) {
      return "badge bg-info-subtle text-info";
    }

    if (value.includes("practical")) {
      return "badge bg-warning-subtle text-dark";
    }

    if (value.includes("oral")) {
      return "badge bg-success-subtle text-success";
    }

    return "badge bg-light text-dark border";
  };

  return (
    <>
      {/* =========================================
          HEADER
      ========================================= */}
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
                         Assessment Category
                       </h5>
     
                       <div className="text-muted small">
                         Assessment Setup &nbsp;/
                         &nbsp; Assessment Category
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
                   Home &nbsp;›&nbsp; Assessment Setup
                   &nbsp;›&nbsp;
                   <span className="text-primary fw-semibold">
                     Assessment Category
                   </span>
                 </small>
               </div>
             </div>
           </div>

      {/* =========================================
          INFO ALERT
      ========================================= */}
      <div
        className="mx-2 mt-3 px-3 py-2 shadow"
        style={{
          background: "#eff6ff",
          border: "1px solid #dbeafe",
          borderRadius: "8px",
          color: "#1e40af",
        }}
      >
        <small>
          <MdErrorOutline
            size={18}
            className="me-2"
          />

          Create and manage different assessment
          categories used in your school.
        </small>
      </div>

      {/* =========================================
          STAT CARDS
      ========================================= */}
      <div className="mx-2 mt-3">
        <div className="row g-3">

          {/* TOTAL */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className="card border-0 shadow h-100"
              style={{
                borderRadius: "12px",
                borderTop: "3px solid #2563eb",
              }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center">

                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "12px",
                      background: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <PiDotsThreeOutlineVerticalLight
                        size={20}
                      />
                      <VscThreeBars size={20} />
                    </div>
                  </div>

                  <div>
                    <small className="text-muted">
                      Total Categories
                    </small>

                    <h4 className="fw-bold mb-0">
                      {categoryList.length}
                    </h4>

                    <small
                      style={{ color: "#2563eb" }}
                    >
                      All categories
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVE */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className="card border-0 shadow h-100"
              style={{
                borderRadius: "12px",
                borderTop: "3px solid #16a34a",
              }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center">

                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "12px",
                      background: "#ecfdf5",
                      color: "#16a34a",
                    }}
                  >
                    <CiCircleCheck size={29} />
                  </div>

                  <div>
                    <small className="text-muted">
                      Active Categories
                    </small>

                    <h4 className="fw-bold mb-0">
                      {activeCount}
                    </h4>

                    <small className="text-success">
                      Currently active
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INACTIVE */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className="card border-0 shadow h-100"
              style={{
                borderRadius: "12px",
                borderTop: "3px solid #f59e0b",
              }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center">

                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "12px",
                      background: "#fffbeb",
                      color: "#f59e0b",
                    }}
                  >
                    <FaRegPauseCircle size={25} />
                  </div>

                  <div>
                    <small className="text-muted">
                      Inactive Categories
                    </small>

                    <h4 className="fw-bold mb-0">
                      {inactiveCount}
                    </h4>

                    <small className="text-warning">
                      Currently inactive
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* USED */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className="card border-0 shadow h-100"
              style={{
                borderRadius: "12px",
                borderTop: "3px solid #6366f1",
              }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center">

                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "12px",
                      background: "#eef2ff",
                      color: "#4f46e5",
                    }}
                  >
                    <BiSolidCategoryAlt size={27} />
                  </div>

                  <div>
                    <small className="text-muted">
                      Used in Assessment
                    </small>

                    <h4 className="fw-bold mb-0">
                      {categoryList.length}
                    </h4>

                    <small
                      style={{ color: "#4f46e5" }}
                    >
                      Categories available
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================
          SEARCH / FILTER / ADD
      ========================================= */}
      <div className="mx-2 mt-4">
        <div
          className="bg-white shadow p-3"
          style={{
            borderRadius: "10px",
          }}
        >
          <div className="row g-2 align-items-center">

            <div className="col-12 col-lg-6">
              <div className="position-relative">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search category, code or nature..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #dbe3ef",
                    padding: "10px 14px",
                  }}
                />
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="d-flex justify-content-lg-end gap-2">

                <button
                  className={`btn ${
                    showFilter
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() =>
                    setShowFilter(!showFilter)
                  }
                >
                  <IoFilterSharp size={18} />
                  <span className="ms-1">
                    Filter
                  </span>
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleNavigate}
                  style={{
                    background: "#2563eb",
                    borderColor: "#2563eb",
                  }}
                >
                  <FaPlus size={17} />
                  <span className="ms-1">
                    Add Category
                  </span>
                </button>

              </div>
            </div>
          </div>

          {/* FILTER */}
          {showFilter && (
            <div
              className="mt-3 pt-3 border-top"
            >
              <div className="row">

                <div className="col-12 col-md-4">
                  <label className="form-label small fw-semibold">
                    Status
                  </label>

                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value)
                    }
                  >
                    <option value="ALL">
                      All Categories
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
          )}
        </div>
      </div>

      {/* =========================================
          TABLE
      ========================================= */}
      <div className="mx-2 mt-3">
        <div
          className="card border-0 shadow"
          style={{
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >

          <div
            className="card-header border-0"
            style={{
              background: "#ffffff",
              padding: "15px 18px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">

              <div>
                <h6
                  className="mb-1 fw-bold"
                  style={{ color: "#172033" }}
                >
                  Assessment Categories
                </h6>

                <small className="text-muted">
                  Manage all assessment categories
                </small>
              </div>

              <span
                className="badge"
                style={{
                  background: "#eff6ff",
                  color: "#2563eb",
                  padding: "7px 10px",
                }}
              >
                {filteredCategories.length} Records
              </span>

            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">

              <table
                className="table table-hover align-middle mb-0"
                style={{
                  minWidth: "950px",
                }}
              >

                <thead
                  style={{
                    background: "#eff6ff",
                    color: "#1e3a8a",
                  }}
                >
                  <tr>
                    <th className="px-3">S.No</th>
                    <th>Category Name</th>
                    <th>Short Code</th>
                    <th>Description</th>
                    <th>Nature</th>
                    <th>Weightage</th>
                    <th>Status</th>
                    <th className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {loading ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-5"
                      >
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        ></div>

                        <div className="mt-2 text-muted">
                          Loading categories...
                        </div>
                      </td>
                    </tr>
                  ) : currentData.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-5"
                      >
                        <BiSolidCategoryAlt
                          size={40}
                          className="text-muted"
                        />

                        <div className="mt-2 fw-semibold">
                          No assessment category found
                        </div>

                        <small className="text-muted">
                          Try changing your search or filter.
                        </small>
                      </td>
                    </tr>
                  ) : (
                    currentData.map(
                      (category, idx) => (
                        <tr key={category.id}>

                          <td className="px-3 fw-semibold text-muted">
                            {(currentPage - 1) *
                              itemsPerPage +
                              idx +
                              1}
                          </td>

                          <td>
                            <div className="fw-bold">
                              {category.categoryName}
                            </div>
                          </td>

                          <td>
                            <span
                              className="badge"
                              style={{
                                background:
                                  "#f1f5f9",
                                color: "#334155",
                                border:
                                  "1px solid #e2e8f0",
                              }}
                            >
                              {category.shortCode ||
                                "-"}
                            </span>
                          </td>

                          <td
                            style={{
                              maxWidth: "300px",
                            }}
                          >
                            <small className="text-muted">
                              {category.description ||
                                "No description"}
                            </small>
                          </td>

                          <td>
                            <span
                              className={getNatureBadge(
                                category.nature
                              )}
                              style={{
                                padding: "6px 9px",
                              }}
                            >
                              {category.nature ||
                                "-"}
                            </span>
                          </td>

                          <td>
                            <span className="fw-semibold">
                              {category.weightage ??
                                0}
                              
                            </span>
                          </td>

                          <td>
                            {category.status ? (
                              <span
                                className="badge"
                                style={{
                                  background:
                                    "#ecfdf5",
                                  color:
                                    "#15803d",
                                  border:
                                    "1px solid #bbf7d0",
                                  padding:
                                    "6px 9px",
                                }}
                              >
                                Active
                              </span>
                            ) : (
                              <span
                                className="badge"
                                style={{
                                  background:
                                    "#fef2f2",
                                  color:
                                    "#dc2626",
                                  border:
                                    "1px solid #fecaca",
                                  padding:
                                    "6px 9px",
                                }}
                              >
                                Inactive
                              </span>
                            )}
                          </td>

                          <td>
                            <div className="d-flex justify-content-center gap-2">

                              <button
                                className="btn btn-sm d-flex align-items-center justify-content-center"
                                title="Edit Category"
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  background:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                  border:
                                    "1px solid #dbeafe",
                                }}
                              >
                                <MdModeEdit
                                  size={18}
                                />
                              </button>

                              <button
                                className="btn btn-sm d-flex align-items-center justify-content-center"
                                title="Delete Category"
                                onClick={() =>
                                  handleDelete(
                                    category.id
                                  )
                                }
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  background:
                                    "#fef2f2",
                                  color:
                                    "#dc2626",
                                  border:
                                    "1px solid #fecaca",
                                }}
                              >
                                <RiDeleteBin6Line
                                  size={18}
                                />
                              </button>

                            </div>
                          </td>

                        </tr>
                      )
                    )
                  )}

                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          PAGINATION
      ========================================= */}
      {totalPages > 0 && (
        <div className="mx-2 mt-3 d-flex justify-content-between align-items-center">

          <small className="text-muted">
            Showing{" "}
            {(currentPage - 1) *
              itemsPerPage +
              1}{" "}
            to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              filteredCategories.length
            )}{" "}
            of{" "}
            {filteredCategories.length}{" "}
            categories
          </small>

          <nav>
            <ul className="pagination mb-0">

              <li
                className={`page-item ${
                  currentPage === 1
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage(
                      (prev) =>
                        Math.max(prev - 1, 1)
                    )
                  }
                >
                  Previous
                </button>
              </li>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <li
                  key={page}
                  className={`page-item ${
                    currentPage === page
                      ? "active"
                      : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage(page)
                    }
                    style={
                      currentPage === page
                        ? {
                            background:
                              "#2563eb",
                            borderColor:
                              "#2563eb",
                          }
                        : {}
                    }
                  >
                    {page}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage(
                      (prev) =>
                        Math.min(
                          prev + 1,
                          totalPages
                        )
                    )
                  }
                >
                  Next
                </button>
              </li>

            </ul>
          </nav>
        </div>
      )}

      {/* =========================================
          ABOUT CARD
      ========================================= */}
      <div
        className="mx-2 mt-4 mb-3 p-3 shadow"
        style={{
          background:
            "linear-gradient(135deg, #eff6ff, #ffffff)",
          border:
            "1px solid #dbeafe",
          borderRadius: "10px",
        }}
      >
        <div className="d-flex align-items-center justify-content-between">

          <div>
            <h6
              className="fw-bold mb-2"
              style={{
                color: "#1e3a8a",
              }}
            >
              <MdErrorOutline
                size={20}
                className="me-1"
              />
              About Assessment Category
            </h6>

            <small className="text-muted">
              Assessment categories help organize
              and classify different evaluations.
              You can create categories such as
              Internal, External and Practical and
              manage their status and weightage.
            </small>
          </div>

          <img
            src={UX}
            alt="Assessment Category"
            style={{
              width: "100px",
              height: "60px",
              objectFit: "contain",
            }}
          />

        </div>
      </div>
    </>
  );
};

export default AssessmentCategory;