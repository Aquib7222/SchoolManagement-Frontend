import React from "react";
import { FaPlus } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { MdAssessment, MdErrorOutline } from "react-icons/md";

const AssessmentSetup = () => {
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
          <MdAssessment /> Assessment Setup
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
              <small>Assessment Setup</small>
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
          <MdErrorOutline /> Create and manage assessments
          (exams,tests,quizzes,etc..) for diffenet classes and subjects.
        </small>
      </div>

      <div className="container-fluid mt-3">
        <div className="row g-2">
          <div className="col-12 col-lg-3">
            <div className="card shadow h-100">
              <div className="card-header bg-white">
                <h6>Create New Assessment</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-6"></div>
                  <div className="col-12 col-md-6"></div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6"></div>
                  <div className="col-12 col-md-6"></div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6"></div>
                  <div className="col-12 col-md-6"></div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6"></div>
                  <div className="col-12 col-md-6"></div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6"></div>
                  <div className="col-12 col-md-6"></div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6"></div>
                  <div className="col-12 col-md-6"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-9">
            <div className="card shadow h-100">
              <div className="card-header bg-white d-flex justify-content-between align-item-center">
                <h6>Existing Assessment</h6>
                <div className="d-flex gap-3">
                  <input
                    type="search"
                    name=""
                    id=""
                    className="form-control w-50"
                    placeholder="Search Assessment.."
                  />
                  <button className="btn btn-outline-success btn-sm">
                    <IoFilter /> Filter
                  </button>
                  <button className="btn btn-success btn-sm">
                    <FaPlus /> Add New
                  </button>
                </div>
              </div>
              <div className="card-body"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssessmentSetup;
