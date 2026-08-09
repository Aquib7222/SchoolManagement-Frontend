import React from "react";
import { FaPlus, FaRegEye } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import {
  MdAssessment,
  MdAssignment,
  MdErrorOutline,
  MdModeEdit,
} from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import UX from "../../assets/icon/ux.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import useMasters from "../../hooks/useMasters";

const AssessmentNature = () => {
  const { assessmentNature } = useMasters();
  console.log("assessment Nature", assessmentNature);
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
          <MdAssessment /> Assessment Nature Management
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
              <small>Nature</small>
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
          <MdErrorOutline /> Create and manage assessment nature to classify the
          purpose or behaviour of assessments.
        </small>
      </div>

      <div className="container-fluid mt-3">
        <div className="row g-2 align-items-stretch">
          <div className="col-12 col-lg-4">
            <div className="card shadow h-100">
              <div className="card-header bg-white d-flex align-items-center">
                <h6>
                  <MdAssignment size={20} /> Add Assessment Nature
                </h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Nature Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter nature name"
                    />
                    <div className="">
                      <small className="text-muted">
                        e.g.Formative,Summative
                      </small>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Short Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter short code (e.g.FA)"
                    />
                    <div className="">
                      <small className="text-muted">
                        Used for quick reference
                      </small>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-12">
                    <label htmlFor="">Description (Optional) </label>
                    <textarea
                      name=""
                      id=""
                      className="form-control"
                      placeholder="Enter description about this nature"
                    ></textarea>
                    <div className="d-flex justify-content-between mt-1">
                      <small className="text-muted">Max 255 characters</small>
                      <small className="text-muted">0 / 255</small>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label htmlFor="">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select name="" id="" className="form-select w-25">
                      <option value="">Select Status</option>
                      <option value="">Active</option>
                      <option value="">Inactive</option>
                    </select>
                  </div>
                </div>
                <hr />
                <div className="row mt-3 ">
                  <div className="col-md-12 d-flex justify-content-end gap-2">
                    <button className="btn btn-outline-dark btn-sm">
                      <IoCloseSharp size={20} /> Reset
                    </button>
                    <button className="btn btn-success btn-sm">
                      <MdAssignment size={20} /> Save Nature
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8 d-flex flex-column">
            <div className="card shadow  flex-fill mb-2 ">
              <div className="d-flex justify-content-between p-2">
                <h6>
                  <MdErrorOutline size={25} /> Existing Nature
                </h6>
                {/* <button className="btn btn-success">
                  {" "}
                  <FaPlus />
                  Add Nature
                </button> */}
              </div>

              <div className="card-body mt-0 table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>Nature Name</th>
                      <th>Short Code</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessmentNature.map((nature, idx) => (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{nature.name}</td>
                        <td>{nature.shortCode}</td>
                        <td>{nature.description}</td>
                        <td>{nature.status}</td>
                        <td>
                          <MdModeEdit
                            size={20}
                            className="text-primary me-2"
                            style={{ cursor: "pointer" }}
                          />
                          <RiDeleteBin6Line
                            size={20}
                            style={{ cursor: "pointer" }}
                            className="text-danger"
                          />{" "}
                        </td>
                      </tr>
                    ))}
                    {/* <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <MdModeEdit
                          size={20}
                          className="text-primary me-2"
                          style={{ cursor: "pointer" }}
                        />
                        <RiDeleteBin6Line
                          size={20}
                          style={{ cursor: "pointer" }}
                          className="text-danger ms-2"
                        />{" "}
                      </td>
                    </tr> */}
                  </tbody>
                </table>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* alert  */}
      <div
        className="ms-2 me-2 mt-4 alert  p-2 rounded shadow d-flex "
        style={{ backgroundColor: "#e6ecff" }}
      >
        <div>
          <h6>
            <MdErrorOutline size={20} /> About Assessment Nature
          </h6>
          <small>
            Assessment nature helps in classifyling assessments based on their
            purpose and approach.It is used in reports,analysis and result
            calculations.
          </small>
        </div>
        <img
          src={UX}
          alt=""
          className="ms-5"
          style={{ width: "100px", height: "60px" }}
        />
      </div>
    </>
  );
};

export default AssessmentNature;
