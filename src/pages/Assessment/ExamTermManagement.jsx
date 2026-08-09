import React, { useEffect, useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegPauseCircle } from "react-icons/fa";
import { FaPlus, FaUserGraduate } from "react-icons/fa6";
import { IoFilterSharp } from "react-icons/io5";
import { MdAssessment, MdErrorOutline, MdModeEdit } from "react-icons/md";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscThreeBars } from "react-icons/vsc";
import UX from "../../assets/icon/schedule.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import useMasters from "../../hooks/useMasters";

const ExamTermManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [examTermList, setExamTermList] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;
  const [selectedSession, setSelectedSession] = useState("2026-2027");
  const { sessions } = useMasters();
  const [search, setSearch] = useState("");

  const getExamTerm = async () => {
    try {
      setLoading(true);

      //   const user = JSON.parse(localStorage.getItem("user"));
      //   const schoolId = user?.schoolId;

      const response = await axiosInstance.get("/api/assessment/exam-term", {
        params: {
          schoolId,
          session: selectedSession,
        },
      });

      setExamTermList(response.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data || "Failed to load exam term");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this exam?",
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/api/assessment/exam-term/${id}`, {
        params: {
          schoolId,
        },
      });

      toast.success("Exam Term Deleted Successfully");

      getExamTerm();
    } catch (error) {
      toast.error(error.response?.data || "Failed to delete exam term");
    }
  };

  useEffect(() => {
    if (selectedSession) {
      getExamTerm();
    }
  }, [selectedSession]);

  console.log("exam term", examTermList);

  const itemsPerPage = 10;

  const handleNavigate = () => {
    navigate("/assessment/add/exam");
  };

  const activeCount = examTermList.filter((item) => item.status).length;

  const inactiveCount = examTermList.filter((item) => !item.status).length;
  const formatDate = (dateTime) => {
    if (!dateTime) return "";

    const [date] = dateTime.split("T");
    const [year, month, day] = date.split("-");

    return `${day}-${month}-${year}`;
  };

  const filteredTerms = examTermList.filter((term) =>
  term.examTerm.toLowerCase().includes(search.toLowerCase())
);

  return (
    <>
      {/* Header */}
      <div
        className="row shadow-lg"
        style={{
          backgroundColor: "white",
          margin: "10px",
          height: "70px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6>
          <MdAssessment /> Exam Term Management
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                <small>Home</small>
              </a>
            </li>
            <li className="breadcrumb-item active">
              <small>School Management</small>
            </li>
            <li className="breadcrumb-item active">
              <small>Exam Term Management</small>
            </li>
          </ol>
          {/* <button className='btn'>View Assessment Structure</button> */}
        </nav>
      </div>

      {/* alert  */}
      <div
        className="ms-2 me-2 mt-2 alert  p-2 rounded shadow"
        style={{ backgroundColor: "#ebfffd" }}
      >
        <small>
          <MdErrorOutline size={20} /> Create and manage Exam Terms (e.g.,Term
          1,Mid Term,Final Term) for different academic Sessions.
        </small>
      </div>

      <div className="ms-2 me-2 mt-4">
        <div className="row ">
          <div className="col-12 col-sm-3 col-lg-3">
            <div className="card shadow rounded">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3 "
                    style={{
                      width: 55,
                      height: 55,
                      background: "#E8F1FF",
                    }}
                  >
                    <PiDotsThreeOutlineVerticalLight
                      size={26}
                      color="#2563eb"
                    />
                    <VscThreeBars size={26} color="#2563eb" />
                  </div>

                  <div className="flex-grow-1">
                    <small className="text-muted d-block">
                      Total Exam Terms
                    </small>

                    <h4 className="fw-bold mb-0">{examTermList.length}</h4>

                    <small className="text-success">Across all Exam Term</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-3 col-lg-3 ">
            {" "}
            <div className="card shadow rounded">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: 55,
                      height: 55,
                      background: "#E8F1FF",
                    }}
                  >
                    <CiCircleCheck size={26} color="#2563eb" />
                  </div>

                  <div className="flex-grow-1">
                    <small className="text-muted d-block">Active Terms</small>

                    <h4 className="fw-bold mb-0">{activeCount}</h4>

                    <small className="text-success">Currently Active</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-3 col-lg-3 ">
            <div className="card shadow rounded">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: 55,
                      height: 55,
                      background: "#ffe54f",
                    }}
                  >
                    <FaRegPauseCircle size={26} color="#fff2a8" />
                  </div>

                  <div className="flex-grow-1">
                    <small className="text-muted d-block">Inactive Terms</small>

                    <h4 className="fw-bold mb-0">{inactiveCount}</h4>

                    <small className="text-success">Currently Inactive</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-3 col-lg-3 ">
            <div className="card shadow rounded">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: 55,
                      height: 55,
                      background: "#E8F1FF",
                    }}
                  >
                    <BiSolidCategoryAlt size={26} color="#2563eb" />
                  </div>

                  <div className="flex-grow-1">
                    <small className="text-muted d-block">
                      Used in Assessment
                    </small>

                    <h4 className="fw-bold mb-0">0</h4>

                    <small className="text-success">Terms in use.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row ms-1 mt-4 me-1">
        <div className="col-12 col-lg-4 ">
          <select
            name=""
            id=""
            className="form-select"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
          >
            <option value="">Select Session</option>
            {sessions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-lg-8 d-flex gap-4 justify-content-end">
          <input
            type="search"
            name=""
            value={search}
            className="form-control w-25"
            placeholder="Search Exam Term"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline-dark btn-sm">
            <IoFilterSharp size={20} /> Filter
          </button>
          <button className="btn btn-success" onClick={handleNavigate}>
            <FaPlus size={20} /> Add Exam Term
          </button>
        </div>
      </div>

      <div className="ms-2 me-2 mt-4  rounded shadow ">
        <div className="card ">
          <div className="card-body  table-responsive ">
            <table className="table table-bordered table-hover">
              <thead className="table-success">
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
                {filteredTerms.map((exam, idx) => (
                  <tr className="">
                    <td>{idx + 1}</td>
                    <td>
                      <strong>{exam.examTerm}</strong>
                    </td>
                    <td>{exam.shortCode}</td>
                    <td style={{ width: "30%" }}>
                      <small>{exam.description}</small>
                    </td>
                    <td >
                     
                       <strong>{exam.examTermType}</strong>
                    </td>
                    <td>{exam.session}</td>
                    <td>{formatDate(exam.startDate)}</td>
                    <td>{formatDate(exam.endDate)}</td>
                    <td>
                      {exam.status ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-danger">Inactive</span>
                      )}
                    </td>
                    <td className="">
                      <MdModeEdit
                        size={20}
                        className="text-primary me-2"
                        style={{ cursor: "pointer" }}
                      />
                      <RiDeleteBin6Line
                        size={20}
                        className="text-danger cursor"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(exam.id)}
                      />{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* </div> */}
      </div>
      <div className="d-flex justify-content-end mt-4">
        <nav>
          <ul className="pagination pagination mb-0">
            {/* Previous */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                // onClick={() => setCurrentPage((prev) => prev - 1)}
                // disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {/* Current Page */}
            <li className="page-item active">
              {/* <span className="page-link">{currentPage}</span> */}
            </li>

            {/* Next */}
            <li
            //   className={`page-item ${
            //     currentPage === totalPages ? "disabled" : ""
            //   }`}
            >
              <button
                className="page-link"
                // onClick={() => setCurrentPage((prev) => prev + 1)}
                // disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* alert  */}
      <div
        className="ms-2 me-2 mt-4 alert  p-2 rounded  d-flex "
        style={{ backgroundColor: "#e6ecff" }}
      >
        <div>
          <h6>
            <MdErrorOutline size={20} /> About Exam Terms
          </h6>
          <small>
            Exam Terms helps you to organize assessments into specific periods
            like Term 1,Mid Term,Final Term, etc.These terms will be used while
            creating assessments and calculating results.
          </small>
        </div>
        <img
          src={UX}
          alt=""
          className=""
          style={{ width: "100px", height: "60px" }}
        />
      </div>
    </>
  );
};

export default ExamTermManagement;
