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
import { toast } from "react-toastify";

const AssessmentCategory = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const user =JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;

  const getAssessmentCategories = async () => {
    try {
      setLoading(true);

    //   const user = JSON.parse(localStorage.getItem("user"));
    //   const schoolId = user?.schoolId;

      const response = await axiosInstance.get("/api/assessment/category", {
        params: {
          schoolId,
        },
      });

      setCategoryList(response.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/api/assessment/category/${id}`, {
        params: {
          schoolId,
        },
      });

      toast.success("Assessment Category Deleted Successfully");

      getAssessmentCategories();
    } catch (error) {
      toast.error(error.response?.data || "Failed to delete category");
    }
  };

  useEffect(() => {
    getAssessmentCategories();
  }, []);

  console.log("category", categoryList);

  const itemsPerPage = 10;

  const handleNavigate = () => {
    navigate("/assessment/add/category");
  };

  const activeCount = categoryList.filter((item) => item.status).length;

  const inactiveCount = categoryList.filter((item) => !item.status).length;

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
          <MdAssessment /> Assessment Category Management
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
              <small>Assessment Category</small>
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
          <MdErrorOutline size={20} /> Create and manage different type of
          assessment used in this school.
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
                      Total Categories
                    </small>

                    <h4 className="fw-bold mb-0">{categoryList.length}</h4>

                    <small className="text-success">
                      Across all Assessment Type
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
                    <small className="text-muted d-block">
                      Active Categories
                    </small>

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
                    <small className="text-muted d-block">
                      Inactive Categories
                    </small>

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

                    <h4 className="fw-bold mb-0">3</h4>

                    <small className="text-success">Categories in use.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row  mt-4 me-1">
        <div className="col-12 col-lg-12 d-flex gap-4 justify-content-end">
          <input
            type="search"
            name=""
            id=""
            className="form-control w-25"
            placeholder="Search Assessment Category"
          />
          <button className="btn btn-outline-dark btn-sm">
            <IoFilterSharp size={20} /> Filter
          </button>
          <button className="btn btn-success" onClick={handleNavigate}>
            <FaPlus size={20} /> Add Category
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
                  <th>Category Name</th>
                  <th>Short Code</th>

                  <th>Description</th>
                  <th>Nature</th>
                  <th>Default Weightage(%)</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center align-middle">
                {categoryList.map((category, idx) => (
                  <tr className="">
                    <td>{idx + 1}</td>
                    <td>{category.categoryName}</td>
                    <td>{category.shortCode}</td>
                    <td style={{ width: "30%" }}>
                      <small>{category.description}</small>
                    </td>
                    <td>{category.nature}</td>
                    <td>{category.weightage}</td>
                    <td>
                      {category.status ? (
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
        className="ms-2 me-2 mt-4 alert  p-2 rounded  d-flex "
        style={{ backgroundColor: "#e6ecff" }}
      >
        <div>
          <h6>
            <MdErrorOutline size={20} /> About Assessment Category
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

export default AssessmentCategory;
