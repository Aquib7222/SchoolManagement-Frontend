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

// const AssessmentType = () => {
//   const schoolId = JSON.parse(localStorage.getItem("schoolId"));
//   const [loading, setLoading] = useState(false);
//   const [assessmentType, setAssessmentType] = useState([]);
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     loadAssessmentType();
//   }, []);

//   const loadAssessmentType = async () => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/assessment/type?schoolId=${schoolId}`,
//       );
//       setAssessmentType(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log("assessment type", assessmentType);

//   const itemsPerPage = 10;
//   const totalPages = Math.ceil(assessmentType.length / itemsPerPage);

//   const currentData = assessmentType.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   const handleNavigate = () => {
//     navigate("/assessment/add/type");
//   };

//   const activeCount = assessmentType.filter((item) => item.status).length;

//   const inactiveCount = assessmentType.filter((item) => !item.status).length;

//   const filteredTypes = assessmentType.filter((type) =>
//     type.typeName.toLowerCase().includes(search.toLowerCase()),
//   );

//   const getCategoryClass = (categoryName) => {
//     if (!categoryName) return "badge bg-secondary";

//     const category = categoryName.toLowerCase();

//     if (category.includes("internal")) {
//       return "alert alert-success";
//     }

//     if (category.includes("external")) {
//       return "badge bg-danger";
//     }

//     return "badge bg-primary";
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
//           <MdAssessment /> Assessment Type
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
//               <small>Assessment Type</small>
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
//           <MdErrorOutline size={20} /> Create and manage different type of
//           assessment used in this school.
//         </small>
//       </div>

//       <div className="ms-2 me-2 mt-2">
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
//                       Total Assessment Type
//                     </small>

//                     <h4 className="fw-bold mb-0">{assessmentType.length}</h4>

//                     <small className="text-success">
//                       Across all categories
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
//                     <small className="text-muted d-block">Active Types</small>

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
//                     <small className="text-muted d-block">Inactive Types</small>

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
//                     <small className="text-muted d-block">Total Category</small>

//                     <h4 className="fw-bold mb-0">3</h4>

//                     <small className="text-success">
//                       Internal,External,Practical
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row  mt-3 me-1">
//         <div className="col-12 col-lg-12 d-flex gap-2 justify-content-end">
//           <input
//             type="search"
//             value={search}
//             name=""
//             className="form-control w-25"
//             placeholder="Search Assessment Type"
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button className="btn btn-outline-dark btn-sm">
//             <IoFilterSharp size={20} /> Filter
//           </button>
//           <button className="btn btn-success" onClick={handleNavigate}>
//             <FaPlus size={20} /> Add Assessment Type
//           </button>
//         </div>
//       </div>

//       <div className="ms-2 me-2 mt-3  rounded shadow  bg-white">
//         {/* <div className="row"> */}
//         <div className="card ">
//           <div className="card-body bg-white table-responsive ">
//             <table className="table table-bordered table-hover">
//               <thead className="table-success">
//                 <tr>
//                   <th>S.No</th>
//                   <th>Assessment Type</th>
//                   <th>Code</th>
//                   <th>Category</th>
//                   <th>Nature</th>
//                   <th>Exam Term</th>
//                   <th>Max Marks</th>
//                   <th>Pass Marks</th>
//                   <th>Description</th>
//                   <th>Default Weightage(%)</th>
//                   <th>Order</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody className=" text-center align-middle">
//                 {/* <tr>
//                   <td>1</td>
//                   <td>Formative</td>
//                   <td>FA</td>
//                   <td>
//                     <span
//                       className={`badge ${
//                         Internal
//                           ? "bg-success"
//                           : "bg-primary"
//                       }`}
//                     >
//                       Internal
//                     </span>
//                     <span className="badge bg-success">Internal</span>
//                   </td>
//                   <td>
//                     <small>
//                       <p>Ongoing assessment to monitor student learning.</p>
//                     </small>
//                   </td>
//                   <td>20%</td>
//                   <td>
//                     <span className="badge bg-success">Active</span>
//                   </td>
//                   <td className="">
//                     <MdModeEdit size={20} className="text-primary cursor" />
//                     <RiDeleteBin6Line
//                       size={20}
//                       className="text-danger cursor"
//                     />{" "}
//                   </td>
//                 </tr> */}

//                 {filteredTypes.map((assessment, idx) => (
//                   <tr>
//                     <td>{idx + 1}</td>
//                     <td className="fw-bold">{assessment.typeName}</td>
//                     <td>{assessment.shortCode}</td>
//                     <td className="fw-semibold">
//                       <span
//                         className={getCategoryClass(assessment.categoryName)}
//                         style={{padding:"3px"}}
//                       >
//                         {assessment.categoryName
//                           ?.replace("Assessment", "")
//                           .replace("_", " ")
//                           .replace(/\b\w/g, (char) => char.toUpperCase())}
//                       </span>
//                     </td>
//                     <td className="fw-semibold">{assessment.nature}</td>
//                     <td className="fw-semibold">{assessment.examTermName}</td>
//                     <td>{assessment.maxMarks}</td>
//                     <td>{assessment.passingMarks}</td>
//                     <td>{assessment.description}</td>
//                     <td>{assessment.weightage}</td>
//                     <td>{assessment.displayOrder}</td>
//                     <td>
//                       {assessment.status ? (
//                         <span className="badge bg-success">Active</span>
//                       ) : (
//                         <span className="badge bg-danger">Inactive</span>
//                       )}
//                     </td>
//                     <td>
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
//         className="ms-2 me-2 mt-4 alert  p-2 rounded shadow d-flex "
//         style={{ backgroundColor: "#e6ecff" }}
//       >
//         <div>
//           <h6>
//             <MdErrorOutline size={20} /> About Assessment Types
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

// export default AssessmentType;

import React, { useEffect, useMemo, useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { CiCircleCheck } from "react-icons/ci";
import { FaPlus, FaRegPauseCircle } from "react-icons/fa";
import { IoFilterSharp, IoSearchOutline } from "react-icons/io5";
import {
  MdAssessment,
  MdErrorOutline,
  MdModeEditOutline,
  MdOutlineAssessment,
  MdOutlineSchool,
} from "react-icons/md";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscThreeBars } from "react-icons/vsc";
import { LuRefreshCw } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstance from "../../api/axiosInstance";
import UX from "../../assets/icon/ux.png";

const AssessmentType = () => {
  const navigate = useNavigate();

  const schoolId = JSON.parse(localStorage.getItem("schoolId")) || null;

  const [assessmentType, setAssessmentType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const itemsPerPage = 10;

  /* =========================================================
     LOAD ASSESSMENT TYPES
  ========================================================= */

  const loadAssessmentType = async () => {
    if (!schoolId) {
      toast.error("School ID not found");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.get("/api/assessment/type", {
        params: {
          schoolId,
        },
      });

      setAssessmentType(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Assessment Type Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load assessment types",
      );

      setAssessmentType([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssessmentType();
  }, []);

  /* =========================================================
     COUNTS
  ========================================================= */

  const activeCount = useMemo(
    () => assessmentType.filter((item) => item.status === true).length,
    [assessmentType],
  );

  const inactiveCount = useMemo(
    () => assessmentType.filter((item) => item.status === false).length,
    [assessmentType],
  );

  const categoryCount = useMemo(() => {
    return new Set(
      assessmentType.map((item) => item.categoryName).filter(Boolean),
    ).size;
  }, [assessmentType]);

  /* =========================================================
     CATEGORY LIST
  ========================================================= */

  const categories = useMemo(() => {
    return [
      ...new Set(
        assessmentType.map((item) => item.categoryName).filter(Boolean),
      ),
    ];
  }, [assessmentType]);

  /* =========================================================
     FORMAT CATEGORY
  ========================================================= */

  const formatCategory = (categoryName) => {
    if (!categoryName) return "-";

    return categoryName
      .replace("Assessment", "")
      .replaceAll("_", " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  /* =========================================================
     CATEGORY BADGE
  ========================================================= */

  const getCategoryClass = (categoryName) => {
    if (!categoryName) {
      return "badge rounded-pill bg-secondary-subtle text-secondary";
    }

    const category = categoryName.toLowerCase();

    if (category.includes("internal")) {
      return "badge rounded-pill bg-success-subtle text-success";
    }

    if (category.includes("external")) {
      return "badge rounded-pill bg-primary-subtle text-primary";
    }

    if (category.includes("practical")) {
      return "badge rounded-pill bg-warning-subtle text-dark";
    }

    return "badge rounded-pill bg-info-subtle text-info";
  };

  /* =========================================================
     FILTER DATA
  ========================================================= */

  const filteredTypes = useMemo(() => {
    return assessmentType.filter((type) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        String(type.typeName || "")
          .toLowerCase()
          .includes(searchText) ||
        String(type.shortCode || "")
          .toLowerCase()
          .includes(searchText) ||
        String(type.categoryName || "")
          .toLowerCase()
          .includes(searchText) ||
        String(type.nature || "")
          .toLowerCase()
          .includes(searchText) ||
        String(type.examTermName || "")
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && type.status === true) ||
        (statusFilter === "INACTIVE" && type.status === false);

      const matchesCategory =
        categoryFilter === "ALL" || type.categoryName === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [assessmentType, search, statusFilter, categoryFilter]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTypes.length / itemsPerPage),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const currentData = filteredTypes.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, categoryFilter]);

  /* =========================================================
     NAVIGATE ADD
  ========================================================= */

  const handleNavigate = () => {
    navigate("/assessment/add/type");
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Assessment Type ID not found");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this assessment type?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await axiosInstance.delete(`/api/assessment/type/${id}`, {
        params: {
          schoolId,
        },
      });

      toast.success("Assessment type deleted successfully");

      loadAssessmentType();
    } catch (error) {
      console.error("Delete Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to delete assessment type",
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = (id) => {
    navigate(`/assessment/edit/type/${id}`);
  };

  /* =========================================================
     RESET FILTER
  ========================================================= */

  const handleReset = () => {
    setSearch("");
    setStatusFilter("ALL");
    setCategoryFilter("ALL");
    setCurrentPage(1);
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
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <MdOutlineAssessment size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">Assessment Type</h5>

                  <div className="text-muted small">
                    Assessment Setup &nbsp;/ &nbsp; Assessment Type
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Assessment Type
                </span>
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
              Home &nbsp;›&nbsp; Assessment Setup &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">Assessment Type</span>
            </small>
          </div>
        </div>
      </div>

      <div className="mx-2 mb-3">
        <div
          className="rounded-3 p-3 d-flex align-items-start gap-3"
          style={{
            background: "linear-gradient(90deg,#eff6ff,#f8fbff)",
            border: "1px solid #dbeafe",
          }}
        >
          <div
            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: "34px",
              height: "34px",
              backgroundColor: "#dbeafe",
              color: "#2563eb",
            }}
          >
            <MdErrorOutline size={20} />
          </div>

          <div>
            <div className="fw-semibold text-dark small">
              Assessment Type Workspace
            </div>

            <small className="text-muted">
              Create and manage different types of assessments used in your
              school.
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="ms-2 me-2 mt-3">
        <div className="row g-3">
          {/* TOTAL */}

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow rounded-3 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: 52,
                      height: 52,
                      background: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <VscThreeBars size={24} />
                  </div>

                  <div>
                    <small className="text-muted">Total Assessment Types</small>

                    <h4 className="fw-bold mb-0">{assessmentType.length}</h4>

                    <small
                      style={{
                        color: "#2563eb",
                      }}
                    >
                      Across all categories
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVE */}

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow rounded-3 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: 52,
                      height: 52,
                      background: "#ecfdf5",
                      color: "#16a34a",
                    }}
                  >
                    <CiCircleCheck size={28} />
                  </div>

                  <div>
                    <small className="text-muted">Active Types</small>

                    <h4 className="fw-bold mb-0">{activeCount}</h4>

                    <small className="text-success">Currently Active</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INACTIVE */}

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow rounded-3 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: 52,
                      height: 52,
                      background: "#fff7ed",
                      color: "#f97316",
                    }}
                  >
                    <FaRegPauseCircle size={24} />
                  </div>

                  <div>
                    <small className="text-muted">Inactive Types</small>

                    <h4 className="fw-bold mb-0">{inactiveCount}</h4>

                    <small
                      style={{
                        color: "#f97316",
                      }}
                    >
                      Currently Inactive
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CATEGORY */}

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow rounded-3 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: 52,
                      height: 52,
                      background: "#f5f3ff",
                      color: "#7c3aed",
                    }}
                  >
                    <BiSolidCategoryAlt size={25} />
                  </div>

                  <div>
                    <small className="text-muted">Total Categories</small>

                    <h4 className="fw-bold mb-0">{categoryCount}</h4>

                    <small
                      style={{
                        color: "#7c3aed",
                      }}
                    >
                      Assessment Categories
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH / FILTER / ADD
      ===================================================== */}

      <div className="ms-2 me-2 mt-4">
        <div className="card border-0 shadow rounded-3">
          <div className="card-body">
            <div className="row g-2 align-items-center">
              {/* SEARCH */}

              <div className="col-12 col-lg-5">
                <div
                  className="input-group"
                  style={{
                    height: "42px",
                  }}
                >
                  <span
                    className="input-group-text bg-white"
                    style={{
                      borderRight: "0",
                      color: "#6b7280",
                    }}
                  >
                    <IoSearchOutline size={20} />
                  </span>

                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search assessment type, code, category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      borderLeft: "0",
                      boxShadow: "none",
                    }}
                  />
                </div>
              </div>

              {/* FILTER */}

              <div className="col-6 col-lg-2">
                <button
                  className="btn btn-outline-primary w-100"
                  style={{
                    height: "42px",
                  }}
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <IoFilterSharp size={18} className="me-1" />
                  Filter
                </button>
              </div>

              {/* REFRESH */}

              <div className="col-6 col-lg-2">
                <button
                  className="btn btn-outline-secondary w-100"
                  style={{
                    height: "42px",
                  }}
                  onClick={loadAssessmentType}
                  disabled={loading}
                >
                  <LuRefreshCw
                    size={17}
                    className={`me-1 ${loading ? "spin" : ""}`}
                  />
                  Refresh
                </button>
              </div>

              {/* ADD */}

              <div className="col-12 col-lg-3">
                <button
                  className="btn btn-primary w-100"
                  style={{
                    height: "42px",
                  }}
                  onClick={handleNavigate}
                >
                  <FaPlus size={16} className="me-1" />
                  Add Assessment Type
                </button>
              </div>
            </div>

            {/* FILTER PANEL */}

            {showFilter && (
              <div
                className="mt-3 p-3 rounded-3"
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Status</label>

                    <select
                      className="form-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="ALL">All Status</option>

                      <option value="ACTIVE">Active</option>

                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Category</label>

                    <select
                      className="form-select"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="ALL">All Categories</option>

                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {formatCategory(category)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-4 d-flex align-items-end">
                    <button
                      className="btn btn-outline-dark w-100"
                      onClick={handleReset}
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="ms-2 me-2 mt-3">
        <div className="card border-0 shadow rounded-3">
          <div className="card-header bg-white border-0 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-1">Assessment Types</h6>

                <small className="text-muted">
                  Manage all assessment types configured for your school
                </small>
              </div>

              <span
                className="badge rounded-pill"
                style={{
                  background: "#eff6ff",
                  color: "#2563eb",
                  padding: "8px 12px",
                }}
              >
                {filteredTypes.length} Records
              </span>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-bordered mb-0 align-middle">
                <thead
                  style={{
                    background: "#eff6ff",
                    color: "#1e3a8a",
                  }}
                >
                  <tr>
                    <th className="text-center">S.No</th>

                    <th>Assessment Type</th>

                    <th>Code</th>

                    <th>Category</th>

                    <th>Nature</th>

                    <th>Exam Term</th>

                    <th className="text-center">Max Marks</th>

                    <th className="text-center">Pass Marks</th>

                    <th className="text-center">Weightage</th>

                    <th className="text-center">Order</th>

                    <th className="text-center">Status</th>

                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="12" className="text-center py-5">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        />

                        <div className="mt-2 text-muted">
                          Loading assessment types...
                        </div>
                      </td>
                    </tr>
                  ) : currentData.length === 0 ? (
                    <tr>
                      <td colSpan="12" className="text-center py-5">
                        <div
                          className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                          style={{
                            width: 60,
                            height: 60,
                            background: "#eff6ff",
                            color: "#2563eb",
                          }}
                        >
                          <MdAssessment size={30} />
                        </div>

                        <h6 className="fw-bold">No Assessment Type Found</h6>

                        <small className="text-muted">
                          Try changing your search or filter.
                        </small>
                      </td>
                    </tr>
                  ) : (
                    currentData.map((assessment, idx) => (
                      <tr key={assessment.id || idx}>
                        <td className="text-center fw-semibold">
                          {(safeCurrentPage - 1) * itemsPerPage + idx + 1}
                        </td>

                        <td>
                          <div className="fw-bold">
                            {assessment.typeName || "-"}
                          </div>
                        </td>

                        <td>
                          <span
                            className="badge rounded-pill"
                            style={{
                              background: "#f1f5f9",
                              color: "#334155",
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            {assessment.shortCode || "-"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={getCategoryClass(
                              assessment.categoryName,
                            )}
                            style={{
                              padding: "6px 10px",
                            }}
                          >
                            {formatCategory(assessment.categoryName)}
                          </span>
                        </td>

                        <td>
                          <span className="fw-semibold">
                            {assessment.nature || "-"}
                          </span>
                        </td>

                        <td>{assessment.examTermName || "-"}</td>

                        <td className="text-center fw-semibold">
                          {assessment.maxMarks ?? "-"}
                        </td>

                        <td className="text-center">
                          {assessment.passingMarks ?? "-"}
                        </td>

                        <td className="text-center">
                          {assessment.weightage != null
                            ? `${assessment.weightage}%`
                            : "-"}
                        </td>

                        <td className="text-center">
                          {assessment.displayOrder ?? "-"}
                        </td>

                        <td className="text-center">
                          {assessment.status ? (
                            <span className="badge rounded-pill bg-success-subtle text-success">
                              Active
                            </span>
                          ) : (
                            <span className="badge rounded-pill bg-danger-subtle text-danger">
                              Inactive
                            </span>
                          )}
                        </td>

                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-light border me-1"
                            title="Edit"
                            onClick={() => handleEdit(assessment.id)}
                          >
                            <MdModeEditOutline
                              size={18}
                              className="text-primary"
                            />
                          </button>

                          <button
                            className="btn btn-sm btn-light border"
                            title="Delete"
                            disabled={deletingId === assessment.id}
                            onClick={() => handleDelete(assessment.id)}
                          >
                            {deletingId === assessment.id ? (
                              <span className="spinner-border spinner-border-sm text-danger" />
                            ) : (
                              <RiDeleteBin6Line
                                size={18}
                                className="text-danger"
                              />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          {filteredTypes.length > 0 && (
            <div className="card-footer bg-white border-0">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <small className="text-muted">
                  Showing{" "}
                  <strong>{(safeCurrentPage - 1) * itemsPerPage + 1}</strong> to{" "}
                  <strong>
                    {Math.min(
                      safeCurrentPage * itemsPerPage,
                      filteredTypes.length,
                    )}
                  </strong>{" "}
                  of <strong>{filteredTypes.length}</strong> records
                </small>

                <nav>
                  <ul className="pagination mb-0">
                    <li
                      className={`page-item ${
                        safeCurrentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                      >
                        Previous
                      </button>
                    </li>

                    {Array.from(
                      {
                        length: totalPages,
                      },
                      (_, index) => index + 1,
                    ).map((page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          safeCurrentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}

                    <li
                      className={`page-item ${
                        safeCurrentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1),
                          )
                        }
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          ABOUT SECTION
      ===================================================== */}

      <div
        className="ms-2 me-2 mt-4 mb-3 rounded-3 shadow p-3"
        style={{
          background: "linear-gradient(90deg, #eff6ff, #ffffff)",
          border: "1px solid #dbeafe",
        }}
      >
        <div className="row align-items-center">
          <div className="col-12 col-md-8">
            <h6
              className="fw-bold"
              style={{
                color: "#1e3a8a",
              }}
            >
              <MdErrorOutline size={20} className="me-1" />
              About Assessment Types
            </h6>

            <small className="text-muted">
              Assessment Types help you organize and classify different
              evaluations. Weightage is used during result calculation. You can
              activate or deactivate an assessment type whenever required.
            </small>
          </div>

          <div className="col-12 col-md-4 text-end mt-3 mt-md-0">
            <img
              src={UX}
              alt="Assessment"
              style={{
                width: "130px",
                height: "75px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          CUSTOM CSS
      ===================================================== */}

      <style>{`

        .table th {
          white-space: nowrap;
          font-size: 13px;
          font-weight: 600;
          padding: 12px 10px;
        }

        .table td {
          font-size: 13px;
          padding: 11px 10px;
        }

        .table tbody tr:hover {
          background-color: #f8fbff;
        }

        .page-link {
          color: #2563eb;
        }

        .page-item.active .page-link {
          background-color: #2563eb;
          border-color: #2563eb;
        }

        .page-link:focus {
          box-shadow: none;
        }

        .form-control:focus,
        .form-select:focus {
          border-color: #93c5fd;
          box-shadow: 0 0 0 0.15rem rgba(37, 99, 235, 0.10);
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {

          .card-body {
            padding: 12px;
          }

          .table th,
          .table td {
            font-size: 12px;
          }

        }

      `}</style>
    </>
  );
};

export default AssessmentType;
