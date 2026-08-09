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
import UX from "../../assets/icon/ux.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const AssessmentType = () => {
  const schoolId = JSON.parse(localStorage.getItem("schoolId"));
  const [loading, setLoading] = useState(false);
  const [assessmentType, setAssessmentType] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAssessmentType();
  }, []);

  const loadAssessmentType = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/assessment/type?schoolId=${schoolId}`,
      );
      setAssessmentType(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("assessment type", assessmentType);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(assessmentType.length / itemsPerPage);

  const currentData = assessmentType.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNavigate = () => {
    navigate("/assessment/add/type");
  };

  const activeCount = assessmentType.filter((item) => item.status).length;

  const inactiveCount = assessmentType.filter((item) => !item.status).length;

  const filteredTypes = assessmentType.filter((type) =>
    type.typeName.toLowerCase().includes(search.toLowerCase()),
  );

  const getCategoryClass = (categoryName) => {
    if (!categoryName) return "badge bg-secondary";

    const category = categoryName.toLowerCase();

    if (category.includes("internal")) {
      return "alert alert-success";
    }

    if (category.includes("external")) {
      return "badge bg-danger";
    }

    return "badge bg-primary";
  };

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
          <MdAssessment /> Assessment Type
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
              <small>Assessment Type</small>
            </li>
          </ol>
          {/* <button className='btn'>View Assessment Structure</button> */}
        </nav>
      </div>

      {/* alert  */}
      <div
        className="ms-2 me-2  alert  p-2 rounded shadow"
        style={{ backgroundColor: "#ebfffd" }}
      >
        <small>
          <MdErrorOutline size={20} /> Create and manage different type of
          assessment used in this school.
        </small>
      </div>

      <div className="ms-2 me-2 mt-2">
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
                      Total Assessment Type
                    </small>

                    <h4 className="fw-bold mb-0">{assessmentType.length}</h4>

                    <small className="text-success">
                      Across all categories
                    </small>
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
                    <small className="text-muted d-block">Active Types</small>

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
                    <small className="text-muted d-block">Inactive Types</small>

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
                    <small className="text-muted d-block">Total Category</small>

                    <h4 className="fw-bold mb-0">3</h4>

                    <small className="text-success">
                      Internal,External,Practical
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row  mt-3 me-1">
        <div className="col-12 col-lg-12 d-flex gap-2 justify-content-end">
          <input
            type="search"
            value={search}
            name=""
            className="form-control w-25"
            placeholder="Search Assessment Type"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline-dark btn-sm">
            <IoFilterSharp size={20} /> Filter
          </button>
          <button className="btn btn-success" onClick={handleNavigate}>
            <FaPlus size={20} /> Add Assessment Type
          </button>
        </div>
      </div>

      <div className="ms-2 me-2 mt-3  rounded shadow  bg-white">
        {/* <div className="row"> */}
        <div className="card ">
          <div className="card-body bg-white table-responsive ">
            <table className="table table-bordered table-hover">
              <thead className="table-success">
                <tr>
                  <th>S.No</th>
                  <th>Assessment Type</th>
                  <th>Code</th>
                  <th>Category</th>
                  <th>Nature</th>
                  <th>Exam Term</th>
                  <th>Max Marks</th>
                  <th>Pass Marks</th>
                  <th>Description</th>
                  <th>Default Weightage(%)</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className=" text-center align-middle">
                {/* <tr>
                  <td>1</td>
                  <td>Formative</td>
                  <td>FA</td>
                  <td>
                    <span
                      className={`badge ${
                        Internal
                          ? "bg-success"
                          : "bg-primary"
                      }`}
                    >
                      Internal
                    </span>
                    <span className="badge bg-success">Internal</span>
                  </td>
                  <td>
                    <small>
                      <p>Ongoing assessment to monitor student learning.</p>
                    </small>
                  </td>
                  <td>20%</td>
                  <td>
                    <span className="badge bg-success">Active</span>
                  </td>
                  <td className="">
                    <MdModeEdit size={20} className="text-primary cursor" />
                    <RiDeleteBin6Line
                      size={20}
                      className="text-danger cursor"
                    />{" "}
                  </td>
                </tr> */}

                {filteredTypes.map((assessment, idx) => (
                  <tr>
                    <td>{idx + 1}</td>
                    <td className="fw-bold">{assessment.typeName}</td>
                    <td>{assessment.shortCode}</td>
                    <td className="fw-semibold">
                      <span
                        className={getCategoryClass(assessment.categoryName)}
                        style={{padding:"3px"}}
                      >
                        {assessment.categoryName
                          ?.replace("Assessment", "")
                          .replace("_", " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </span>
                    </td>
                    <td className="fw-semibold">{assessment.nature}</td>
                    <td className="fw-semibold">{assessment.examTermName}</td>
                    <td>{assessment.maxMarks}</td>
                    <td>{assessment.passingMarks}</td>
                    <td>{assessment.description}</td>
                    <td>{assessment.weightage}</td>
                    <td>{assessment.displayOrder}</td>
                    <td>
                      {assessment.status ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-danger">Inactive</span>
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
                        className="text-danger cursor"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(category.id)}
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
        className="ms-2 me-2 mt-4 alert  p-2 rounded shadow d-flex "
        style={{ backgroundColor: "#e6ecff" }}
      >
        <div>
          <h6>
            <MdErrorOutline size={20} /> About Assessment Types
          </h6>
          <small>
            Assessment Type help you to organize and classify different
            evaluations.Weightage is used in calculation.You can change the
            status to active or deactivate any assessment type.
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

export default AssessmentType;
