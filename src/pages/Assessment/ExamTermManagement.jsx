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
// import useMasters from "../../hooks/useMasters";

// const ExamTermManagement = () => {
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [examTermList, setExamTermList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;
//   const [selectedSession, setSelectedSession] = useState("2026-2027");
//   const { sessions } = useMasters();
//   const [search, setSearch] = useState("");

//   const getExamTerm = async () => {
//     try {
//       setLoading(true);

//       //   const user = JSON.parse(localStorage.getItem("user"));
//       //   const schoolId = user?.schoolId;

//       const response = await axiosInstance.get("/api/assessment/exam-term", {
//         params: {
//           schoolId,
//           session: selectedSession,
//         },
//       });

//       setExamTermList(response.data);
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data || "Failed to load exam term");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this exam?",
//     );

//     if (!confirmDelete) return;

//     try {
//       await axiosInstance.delete(`/api/assessment/exam-term/${id}`, {
//         params: {
//           schoolId,
//         },
//       });

//       toast.success("Exam Term Deleted Successfully");

//       getExamTerm();
//     } catch (error) {
//       toast.error(error.response?.data || "Failed to delete exam term");
//     }
//   };

//   useEffect(() => {
//     if (selectedSession) {
//       getExamTerm();
//     }
//   }, [selectedSession]);

//   console.log("exam term", examTermList);

//   const itemsPerPage = 10;

//   const handleNavigate = () => {
//     navigate("/assessment/add/exam");
//   };

//   const activeCount = examTermList.filter((item) => item.status).length;

//   const inactiveCount = examTermList.filter((item) => !item.status).length;
//   const formatDate = (dateTime) => {
//     if (!dateTime) return "";

//     const [date] = dateTime.split("T");
//     const [year, month, day] = date.split("-");

//     return `${day}-${month}-${year}`;
//   };

//   const filteredTerms = examTermList.filter((term) =>
//   term.examTerm.toLowerCase().includes(search.toLowerCase())
// );

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
//           <MdAssessment /> Exam Term Management
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
//               <small>Exam Term Management</small>
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
//           <MdErrorOutline size={20} /> Create and manage Exam Terms (e.g.,Term
//           1,Mid Term,Final Term) for different academic Sessions.
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
//                       Total Exam Terms
//                     </small>

//                     <h4 className="fw-bold mb-0">{examTermList.length}</h4>

//                     <small className="text-success">Across all Exam Term</small>
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
//                     <small className="text-muted d-block">Active Terms</small>

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
//                     <small className="text-muted d-block">Inactive Terms</small>

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

//                     <h4 className="fw-bold mb-0">0</h4>

//                     <small className="text-success">Terms in use.</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row ms-1 mt-4 me-1">
//         <div className="col-12 col-lg-4 ">
//           <select
//             name=""
//             id=""
//             className="form-select"
//             value={selectedSession}
//             onChange={(e) => setSelectedSession(e.target.value)}
//           >
//             <option value="">Select Session</option>
//             {sessions.map((item) => (
//               <option key={item} value={item}>
//                 {item}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-12 col-lg-8 d-flex gap-4 justify-content-end">
//           <input
//             type="search"
//             name=""
//             value={search}
//             className="form-control w-25"
//             placeholder="Search Exam Term"
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button className="btn btn-outline-dark btn-sm">
//             <IoFilterSharp size={20} /> Filter
//           </button>
//           <button className="btn btn-success" onClick={handleNavigate}>
//             <FaPlus size={20} /> Add Exam Term
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
//                   <th>Term Name</th>
//                   <th>Short Code</th>

//                   <th>Description</th>
//                   <th>Exam Type</th>
//                   <th>Session</th>
//                   <th>Start Date</th>
//                   <th>End Date</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody className="text-center align-middle">
//                 {filteredTerms.map((exam, idx) => (
//                   <tr className="">
//                     <td>{idx + 1}</td>
//                     <td>
//                       <strong>{exam.examTerm}</strong>
//                     </td>
//                     <td>{exam.shortCode}</td>
//                     <td style={{ width: "30%" }}>
//                       <small>{exam.description}</small>
//                     </td>
//                     <td >
                     
//                        <strong>{exam.examTermType}</strong>
//                     </td>
//                     <td>{exam.session}</td>
//                     <td>{formatDate(exam.startDate)}</td>
//                     <td>{formatDate(exam.endDate)}</td>
//                     <td>
//                       {exam.status ? (
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
//                         onClick={() => handleDelete(exam.id)}
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
//             <MdErrorOutline size={20} /> About Exam Terms
//           </h6>
//           <small>
//             Exam Terms helps you to organize assessments into specific periods
//             like Term 1,Mid Term,Final Term, etc.These terms will be used while
//             creating assessments and calculating results.
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

// export default ExamTermManagement;



import React, { useEffect, useState } from "react";
import {
  BiSolidCategoryAlt,
} from "react-icons/bi";
import {
  CiCircleCheck,
} from "react-icons/ci";
import {
  FaRegPauseCircle,
  FaPlus,
  FaCalendarAlt,
  FaSave,
} from "react-icons/fa";
import {
  IoFilterSharp,
} from "react-icons/io5";
import {
  MdAssessment,
  MdErrorOutline,
  MdModeEdit,
  MdEvent,
  MdOutlineAssessment,
  MdOutlineSchool,
} from "react-icons/md";
import {
  PiDotsThreeOutlineVerticalLight,
} from "react-icons/pi";
import {
  RiDeleteBin6Line,
} from "react-icons/ri";
import {
  VscThreeBars,
} from "react-icons/vsc";
import UX from "../../assets/icon/ux.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import useMasters from "../../hooks/useMasters";

const ExamTermManagement = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [examTermList, setExamTermList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;

  const [selectedSession, setSelectedSession] = useState("2026-2027");

  const { sessions } = useMasters();

  const itemsPerPage = 10;

  // ================= GET EXAM TERMS =================
  const getExamTerm = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        "/api/assessment/exam-term",
        {
          params: {
            schoolId,
            session: selectedSession,
          },
        }
      );

      setExamTermList(response.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data || "Failed to load exam terms"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this exam term?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await axiosInstance.delete(
        `/api/assessment/exam-term/${id}`,
        {
          params: {
            schoolId,
          },
        }
      );

      toast.success(
        "Exam Term Deleted Successfully"
      );

      await getExamTerm();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data ||
          "Failed to delete exam term"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD DATA =================
  useEffect(() => {
    if (selectedSession) {
      setCurrentPage(1);
      getExamTerm();
    } else {
      setExamTermList([]);
    }
  }, [selectedSession]);

  // ================= DATE FORMAT =================
  const formatDate = (dateTime) => {
    if (!dateTime) return "-";

    const [date] = dateTime.split("T");

    const [year, month, day] = date.split("-");

    return `${day}-${month}-${year}`;
  };

  // ================= SEARCH =================
  const filteredTerms = examTermList.filter((term) => {
    const searchValue = search.toLowerCase();

    return (
      term.examTerm
        ?.toLowerCase()
        .includes(searchValue) ||
      term.shortCode
        ?.toLowerCase()
        .includes(searchValue) ||
      term.examTermType
        ?.toLowerCase()
        .includes(searchValue)
    );
  });

  // ================= PAGINATION =================
  const totalPages = Math.ceil(
    filteredTerms.length / itemsPerPage
  );

  const currentData = filteredTerms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeCount = examTermList.filter(
    (item) => item.status
  ).length;

  const inactiveCount = examTermList.filter(
    (item) => !item.status
  ).length;

  const handleNavigate = () => {
    navigate("/assessment/add/exam");
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // ================= TERM TYPE BADGE =================
  const getExamTypeClass = (type) => {
    if (!type) return "badge bg-secondary";

    const value = type.toLowerCase();

    if (
      value.includes("final") ||
      value.includes("board")
    ) {
      return "badge bg-primary";
    }

    if (
      value.includes("mid") ||
      value.includes("periodic")
    ) {
      return "badge bg-info text-dark";
    }

    if (value.includes("practical")) {
      return "badge bg-warning text-dark";
    }

    return "badge bg-secondary";
  };

  return (
    <>
      {/* =====================================================
          HEADER
      ====================================================== */}
    

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
                          Exam Setup
                        </h5>
      
                        <div className="text-muted small">
                          Assessment Setup &nbsp;/
                          &nbsp; Exam Setup
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
                         Exam Setup
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
                      Exam Term
                    </span>
                  </small>
                </div>
              </div>
            </div>

      {/* =====================================================
          INFO ALERT
      ====================================================== */}
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

          Create and manage Exam Terms such as Term 1,
          Mid Term and Final Term for different academic
          sessions.
        </small>
      </div>

      {/* =====================================================
          STAT CARDS
      ====================================================== */}
      <div className="ms-2 me-2 mt-4">
        <div className="row g-3">

          {/* TOTAL */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">

                  <div
                    className="stat-icon me-3"
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <PiDotsThreeOutlineVerticalLight size={23} />
                    <VscThreeBars size={23} />
                  </div>

                  <div>
                    <small className="text-muted d-block">
                      Total Exam Terms
                    </small>

                    <h4 className="fw-bold mb-0">
                      {examTermList.length}
                    </h4>

                    <small
                      style={{ color: "#2563eb" }}
                    >
                      Current Session
                    </small>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* ACTIVE */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">

                  <div
                    className="stat-icon me-3"
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <CiCircleCheck size={27} />
                  </div>

                  <div>
                    <small className="text-muted d-block">
                      Active Terms
                    </small>

                    <h4 className="fw-bold mb-0">
                      {activeCount}
                    </h4>

                    <small className="text-success">
                      Currently Active
                    </small>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* INACTIVE */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">

                  <div
                    className="stat-icon me-3"
                    style={{
                      background: "#fff7ed",
                      color: "#f97316",
                    }}
                  >
                    <FaRegPauseCircle size={23} />
                  </div>

                  <div>
                    <small className="text-muted d-block">
                      Inactive Terms
                    </small>

                    <h4 className="fw-bold mb-0">
                      {inactiveCount}
                    </h4>

                    <small className="text-danger">
                      Currently Inactive
                    </small>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* USED */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">

                  <div
                    className="stat-icon me-3"
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <BiSolidCategoryAlt size={25} />
                  </div>

                  <div>
                    <small className="text-muted d-block">
                      Used in Assessment
                    </small>

                    <h4 className="fw-bold mb-0">
                      0
                    </h4>

                    <small
                      style={{ color: "#2563eb" }}
                    >
                      Terms in use
                    </small>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          FILTER / SEARCH
      ====================================================== */}
      <div className="row ms-1 me-1 mt-4 g-2">

        {/* SESSION */}
        <div className="col-12 col-md-4 col-lg-3">
          <label className="form-label fw-semibold mb-1">
            Academic Session
          </label>

          <div className="input-group">
            <span className="input-group-text bg-white">
              <FaCalendarAlt
                style={{ color: "#2563eb" }}
              />
            </span>

            <select
              className="form-select"
              value={selectedSession}
              onChange={(e) =>
                setSelectedSession(e.target.value)
              }
            >
              <option value="">
                Select Session
              </option>

              {sessions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SEARCH + BUTTONS */}
        <div className="col-12 col-md-8 col-lg-9 d-flex align-items-end justify-content-md-end gap-2">

          <div
            style={{
              width: "280px",
            }}
          >
            <label className="form-label fw-semibold mb-1">
              Search
            </label>

            <input
              type="search"
              value={search}
              className="form-control"
              placeholder="Search exam term..."
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button
            className="btn btn-outline-primary"
            style={{
              height: "40px",
            }}
          >
            <IoFilterSharp size={18} />
            {" "}Filter
          </button>

          <button
            className="btn btn-primary"
            onClick={handleNavigate}
            style={{
              height: "40px",
              background: "#2563eb",
              borderColor: "#2563eb",
            }}
          >
            <FaPlus size={16} />
            {" "}Add Exam Term
          </button>

        </div>
      </div>

      {/* =====================================================
          TABLE
      ====================================================== */}
      <div className="ms-2 me-2 mt-4">

        <div
          className="card border-0 shadow"
          style={{
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >

          {/* TABLE HEADER */}
          <div
            className="card-header bg-white d-flex justify-content-between align-items-center py-3"
            style={{
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div>
              <h6 className="mb-0 fw-semibold">
                <MdEvent
                  className="me-2"
                  style={{ color: "#2563eb" }}
                />
                Exam Terms
              </h6>

              <small className="text-muted">
                {selectedSession
                  ? `Exam terms for ${selectedSession}`
                  : "Select an academic session"}
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
              {filteredTerms.length} Terms
            </span>
          </div>

          <div className="card-body p-0">

            <div className="table-responsive p-3">

              <table className="table table-hover table-bordered mb-0">

                <thead
                  style={{
                    background: "#eff6ff",
                    color: "#1e3a8a",
                  }}
                >
                  <tr>
                    <th>S.No</th>
                    <th>Term Name</th>
                    <th>Short Code</th>
                    <th>Description</th>
                    <th>Exam Type</th>
                    <th>Session</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody className="text-center align-middle">

                  {loading ? (
                    <tr>
                      <td
                        colSpan="10"
                        className="py-5"
                      >
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">
                            Loading...
                          </span>
                        </div>

                        <div className="mt-2 text-muted">
                          Loading exam terms...
                        </div>
                      </td>
                    </tr>
                  ) : currentData.length === 0 ? (
                    <tr>
                      <td
                        colSpan="10"
                        className="py-5"
                      >
                        <div className="text-muted">
                          <MdErrorOutline
                            size={35}
                            className="mb-2"
                          />

                          <div className="fw-semibold">
                            No Exam Terms Found
                          </div>

                          <small>
                            Try another session or search term.
                          </small>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentData.map((exam, idx) => (
                      <tr key={exam.id}>

                        <td>
                          {(currentPage - 1) *
                            itemsPerPage +
                            idx +
                            1}
                        </td>

                        <td>
                          <strong className="text-dark">
                            {exam.examTerm}
                          </strong>
                        </td>

                        <td>
                          <span
                            className="badge"
                            style={{
                              background: "#f1f5f9",
                              color: "#334155",
                            }}
                          >
                            {exam.shortCode}
                          </span>
                        </td>

                        <td
                          style={{
                            minWidth: "220px",
                            maxWidth: "320px",
                          }}
                        >
                          <small className="text-muted">
                            {exam.description || "-"}
                          </small>
                        </td>

                        <td>
                          <span
                            className={getExamTypeClass(
                              exam.examTermType
                            )}
                          >
                            {exam.examTermType || "-"}
                          </span>
                        </td>

                        <td>
                          <span className="fw-semibold">
                            {exam.session}
                          </span>
                        </td>

                        <td>
                          {formatDate(exam.startDate)}
                        </td>

                        <td>
                          {formatDate(exam.endDate)}
                        </td>

                        <td>
                          {exam.status ? (
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
                          <button
                            className="btn btn-sm btn-light me-1"
                            title="Edit"
                            style={{
                              color: "#2563eb",
                              border:
                                "1px solid #dbeafe",
                            }}
                          >
                            <MdModeEdit size={18} />
                          </button>

                          <button
                            className="btn btn-sm btn-light"
                            title="Delete"
                            style={{
                              color: "#dc2626",
                              border:
                                "1px solid #fee2e2",
                            }}
                            onClick={() =>
                              handleDelete(exam.id)
                            }
                            disabled={loading}
                          >
                            <RiDeleteBin6Line
                              size={18}
                            />
                          </button>
                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          PAGINATION
      ====================================================== */}
      {totalPages > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-3 ms-2 me-2">

          <small className="text-muted">
            Showing{" "}
            {(currentPage - 1) *
              itemsPerPage +
              1}{" "}
            to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              filteredTerms.length
            )}{" "}
            of {filteredTerms.length} terms
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
                    handlePageChange(
                      currentPage - 1
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
                      handlePageChange(page)
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
                    handlePageChange(
                      currentPage + 1
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

      {/* =====================================================
          ABOUT SECTION
      ====================================================== */}
      <div
        className="ms-2 me-2 mt-4 p-3 shadow rounded-3 d-flex justify-content-between align-items-center"
        style={{
          background:
            "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)",
          border: "1px solid #dbeafe",
        }}
      >
        <div>

          <h6 className="fw-semibold">
            <MdErrorOutline
              size={20}
              className="me-1"
              style={{ color: "#2563eb" }}
            />
            About Exam Terms
          </h6>

          <small className="text-muted">
            Exam Terms help organize assessments into
            specific periods such as Term 1, Mid Term
            and Final Term. These terms are used while
            creating assessments and calculating student
            results.
          </small>

        </div>

        <img
          src={UX}
          alt="Assessment"
          style={{
            width: "100px",
            height: "60px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* =====================================================
          CSS
      ====================================================== */}
      <style>
        {`
          .stat-icon {
            width: 55px;
            height: 55px;
            min-width: 55px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }

          .stat-icon svg + svg {
            margin-left: -7px;
          }

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
            box-shadow:
              0 0 0 0.15rem
              rgba(37, 99, 235, 0.10);
          }

          .input-group-text {
            border-color: #dbe2ea;
          }

          .btn {
            border-radius: 7px;
          }

          .table {
            font-size: 14px;
          }

          .table thead th {
            white-space: nowrap;
            font-weight: 600;
            padding: 12px 10px;
          }

          .table tbody td {
            padding: 11px 10px;
          }

          .table-hover tbody tr:hover {
            background-color: #f8fbff;
          }

          .pagination .page-link {
            color: #2563eb;
          }

          .pagination .active .page-link {
            background-color: #2563eb;
            border-color: #2563eb;
            color: white;
          }

          @media (max-width: 767px) {

            .col-md-8.d-flex {
              flex-direction: column;
              align-items: stretch !important;
            }

            .col-md-8.d-flex > div {
              width: 100% !important;
            }

            .col-md-8.d-flex .btn {
              width: 100%;
            }

            .pagination {
              flex-wrap: wrap;
            }

            .ms-2.me-2 {
              margin-left: 8px !important;
              margin-right: 8px !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default ExamTermManagement;

