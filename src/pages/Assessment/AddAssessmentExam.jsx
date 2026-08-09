import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { IoArrowBack, IoCloseSharp } from "react-icons/io5";
import { MdAssessment, MdAssignment, MdErrorOutline } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { TiTick } from "react-icons/ti";

import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";
import { useNavigate } from "react-router-dom";

const AddAssessmentExam = () => {
  const { sessions, examTermType } = useMasters();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;

  const [formData, setFormData] = useState({
  schoolId: schoolId,
  examTerm: "",
  shortCode: "",
  session: "",
  examTermType: "",
  startDate: "",
  endDate: "",
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
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async () => {
  try {
    setLoading(true);

    const payload = {
      schoolId: schoolId,
      examTerm: formData.examTerm,
      shortCode: formData.shortCode,
      session: formData.session,
      examTermType: formData.examTermType,

      // LocalDateTime ke liye
      startDate: formData.startDate
        ? `${formData.startDate}T00:00:00`
        : null,

      endDate: formData.endDate
        ? `${formData.endDate}T23:59:59`
        : null,

      description: formData.description,
      displayOrder: Number(formData.displayOrder),
      status: formData.status,
    };

    console.log("Exam Term Payload :", payload);

    const response = await axiosInstance.post(
      "/api/assessment/exam-term",
      payload
    );

    console.log("Response :", response.data);

    toast.success("Exam Term added successfully");

    setFormData({
      schoolId: schoolId,
      examTerm: "",
      shortCode: "",
      session: "",
      examTermType: "",
      startDate: "",
      endDate: "",
      description: "",
      displayOrder: "",
      status: true,
    });

  } catch (error) {

    console.log("Status :", error.response?.status);
    console.log("Data :", error.response?.data);
    console.log("Full :", error.response);

    const message =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.message || "Something went wrong";

    toast.error(message);

  } finally {
    setLoading(false);
  }
};
  return (
    <>
      {/* Header */}
      <div className="row shadow-lg mx-2 mt-2 rounded bg-white p-3 align-items-center">
        {/* Left Side */}
        <div className="col-12 col-md-8">
          <h6 className="mb-2">
            <MdAssessment className="me-2" />
            Add Exam Term
          </h6>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/" style={{ textDecoration: "none", color: "black" }}>
                  <small>Home</small>
                </a>
              </li>

              <li className="breadcrumb-item active">
                <small>School Management</small>
              </li>

              <li className="breadcrumb-item active">
                <small>Add Exam Term</small>
              </li>
            </ol>
          </nav>
        </div>

        {/* Right Side */}
        <div className="col-12 col-md-4 d-flex justify-content-md-end justify-content-start mt-3 mt-md-0">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate(-1)}
          >
            <IoArrowBack className="me-1" />
            Back
          </button>
        </div>
      </div>

      {/* alert  */}
      <div
        className="ms-2 me-2 mt-3 alert  p-2 rounded shadow"
        style={{ backgroundColor: "#ebfffd" }}
      >
        <small>
          <MdErrorOutline /> Create a new exam term for the academic session.
        </small>
      </div>

      <div className="container-fluid mt-3 ">
        <div className="row g-2 align-items-stretch">
          <div className="col-12 col-lg-8">
            <div className="card shadow h-100">
              <div className="card-header bg-white d-flex align-items-center">
                <h6>
                  <MdAssignment size={20} /> Exam Term Details
                </h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Term Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter term name"
                      name="examTerm"
                      value={formData.examTerm}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Short Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="shortCode"
                      value={formData.shortCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shortCode: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="Enter short code"
                    />
                    <div className="">
                      <small className="text-muted">
                        Used for quick reference
                      </small>
                    </div>
                  </div>
                </div>

                <div className="row mt-3 ">
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Sessions <span className="text-danger">*</span>
                    </label>
                    <select
                      id=""
                      className="form-select"
                      name="session"
                      value={formData.session}
                      onChange={handleChange}
                    >
                      <option value="">Select session</option>
                      {sessions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Exam Term Type <span className="text-danger">*</span>
                    </label>
                    <select
                      id=""
                      className="form-select"
                      name="examTermType"
                      value={formData.examTermType}
                      onChange={handleChange}
                    >
                      <option value="">Select term type</option>
                      {examTermType.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <div className="">
                      <small className="text-muted">
                        e.g.Term,mid-term,final etc
                      </small>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Start Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      End Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Display Order <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter display order 1,2,3"
                      name="displayOrder"
                      value={formData.displayOrder}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select w-100"
                      name="status"
                      value={String(formData.status)}
                      onChange={handleChange}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label htmlFor="">Description (Optional) </label>
                    <textarea
                      className="form-control"
                      maxLength={255}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">Max 255 characters</small>
                      <small className="text-muted">
                        {formData.description.length} / 255
                      </small>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row mt-3 ">
                  <div className="col-md-12 d-flex justify-content-end gap-2">
                    <button className="btn btn-outline-dark btn-sm">
                      <IoCloseSharp size={20} /> Cancel
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      <MdAssignment />
                      {loading ? " Saving..." : " Save Assessment exam"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 d-flex flex-column">
            <div className="card shadow  flex-fill mb-2 alert alert-primary ">
              <h6>
                <MdErrorOutline size={25} /> Assessment exam Information
              </h6>
              <div className="card-body mt-0">
                <p>
                  <small>
                    Assessment categories help organize different assessment
                    types into meaningful groups.
                  </small>{" "}
                </p>
                <h6>Examples:</h6>
                <div>
                  <h6>✔ I Term</h6>
                  <h6>✔ II Term</h6>
                </div>
              </div>
            </div>
            {/* Bottom Card */}
            <div className="card shadow flex-fill p-3">
              <h6>
                <FaRegEye /> Preview
              </h6>
              <hr />
              <div className="card-body">
                <h6>
                  <small>Exam Term Name : {formData.examTerm || "-"}</small>
                </h6>
                <h6>
                  <small>Short Code : {formData.shortCode || "-"}</small>
                </h6>

                <h6>
                  <small>Session : {formData.session || "-"}</small>
                </h6>
                <h6>
                  <small>Exam Term Type : {formData.examTermType || "-"}</small>
                </h6>
                <h6>
                  <small>Start Date : {formData.startDate || "-"}</small>
                </h6>
                <h6>
                  <small>End Date : {formData.endDate || "-"}</small>
                </h6>
                <h6>
                  <small>Display Order : {formData.displayOrder || "-"}</small>
                </h6>
                <h6>
                  <small>
                    Status : {formData.status ? "Active" : "Inactive"}
                  </small>
                </h6>

                <div className="alert alert-warning p-1 mt-3">
                  <small>
                    <TbBulb size={20} /> Description :{" "}
                    {formData.description || "-"}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAssessmentExam;
