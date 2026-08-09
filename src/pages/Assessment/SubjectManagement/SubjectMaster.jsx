import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { LuNotebookText } from "react-icons/lu";
import { MdAssessment, MdErrorOutline } from "react-icons/md";
import { RiResetLeftLine } from "react-icons/ri";
import useMasters from "../../../hooks/useMasters";

const SubjectMaster = () => {
  const { subjectType ,subjectCategory} = useMasters();
  const [showAddSubject, setShowAddSubject] = useState(false);
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
          <LuNotebookText /> Subject Management
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
              <small>Subject Master</small>
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
          <MdErrorOutline size={20} /> Manage all subjects offered in this
          school.These subjects will be used in assessment structure and mark
          entry.
        </small>
      </div>

      <div className="ms-2 me-2 mt-3 rounded shadow bg-white p-3">
        <div className="row g-3">
          <div className="col-12 col-sm-6 col-lg-2">
            <label htmlFor="">Subject Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter subject name"
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-2">
            <label htmlFor="">Subject Code</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter subject code"
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-2">
            <label htmlFor="">Subject Type</label>
            <select name="" id="" className="form-control mt-1">
              <option value="">All</option>
              {subjectType.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-sm-6 col-lg-2">
            <label htmlFor="">Status</label>
            <select name="" id="" className="form-control mt-1">
              <option value="">All</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 col-lg-2 ">
            <button className="btn  btn-outline-secondary mt-4">
              <RiResetLeftLine /> Reset
            </button>
          </div>
          <div className="col-12 col-sm-6 col-lg-2 ">
            <button
              className="btn btn-success mt-4"
              onClick={() => setShowAddSubject(true)}
            >
              <FaPlus /> Add Subject
            </button>
          </div>
        </div>
      </div>

      <div className="ms-2 me-2 bg-white mt-3 rounded shadow p-3">
        <div className="row g-3">
          {/* Subject List */}
          <div className={showAddSubject ? "col-12 col-lg-8" : "col-12"}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">
                <LuNotebookText /> Subject List
              </h6>

              {showAddSubject && (
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setShowAddSubject(false)}
                >
                  Close
                </button>
              )}
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead >
                  <tr >
                    <th className="fw-medium">#</th>
                    <th className="fw-medium">Subject Name</th>
                    <th className="fw-medium">Short Code</th>
                    <th className="fw-medium">Subject Type</th>
                    <th className="fw-medium">Subject Category</th>
                    <th className="fw-medium">Display Order</th>
                    <th className="fw-medium">Status</th>
                    <th className="fw-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Subject Form */}
          {showAddSubject && (
            <div className="col-12 col-lg-4">
              <div className="border rounded p-3 h-100 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">
                    <FaPlus /> Add Subject
                  </h6>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddSubject(false)}
                  ></button>
                </div>

                <hr />

                {/* Form yahan aayega */}
                <div className="mb-3">
                  <label className="form-label">
                    Subject Name <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter subject name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Short Code <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. ENG"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Subject Type <span className="text-danger">*</span>
                  </label>

                  <select className="form-select">
                    <option value="">Select Type</option>

                    {subjectType.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Subject Category <span className="text-danger">*</span>
                  </label>

                  <select className="form-select">
                    <option value="">Select Category</option>
                    {subjectCategory.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Display Order</label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 1"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>

                  <select className="form-select">
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowAddSubject(false)}
                  >
                    Cancel
                  </button>

                  <button type="button" className="btn btn-success">
                    <FaPlus /> Save Subject
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SubjectMaster;
