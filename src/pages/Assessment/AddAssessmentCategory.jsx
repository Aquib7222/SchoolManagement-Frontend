import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { MdAssessment, MdAssignment, MdErrorOutline } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import useMasters from "../../hooks/useMasters";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";

const AddAssessmentCategory = () => {
  const { assessmentNature } = useMasters();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;
  console.log("school id ", schoolId);
  const [formData, setFormData] = useState({
    schoolId: schoolId,
    categoryName: "",
    shortCode: "",
    nature: "",
    weightage:"",

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

      await axiosInstance.post("/api/assessment/category", formData);

      toast.success("Assessment Category Added Successfully");

      setFormData({
        schoolId: schoolId,
        categoryName: "",
        shortCode: "",
        nature: "",
        weightage:"",
        description: "",
        displayOrder: "",
        status: true,
      });
    } catch (error) {
      console.log("Status :", error.response?.status);
      console.log("Data :", error.response?.data);
      console.log("Full :", error.response);

      toast.error(error.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
          <MdAssessment /> Add Assessment Category
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
              <small>Add Assessment Category</small>
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
          <MdErrorOutline /> Create a new assessment category to organize
          different types of assessments.
        </small>
      </div>

      <div className="container-fluid mt-3 ">
        <div className="row g-2 align-items-stretch">
          <div className="col-12 col-lg-8">
            <div className="card shadow h-100">
              <div className="card-header bg-white d-flex align-items-center">
                <h6>
                  <MdAssignment size={20} /> Assessment Category Details
                </h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Assessment Category Name{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter category name"
                      name="categoryName"
                      value={formData.categoryName}
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
                    <label htmlFor="">Default Nature</label>
                    <select
                      id=""
                      className="form-select"
                      name="nature"
                      value={formData.nature}
                      onChange={handleChange}
                    >
                      <option value="">Select nature</option>
                      {assessmentNature.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Display Order <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="displayOrder"
                      value={formData.displayOrder}
                      onChange={handleChange}
                    />
                    <div className="">
                      <small className="text-muted">
                        Used to sort in dropdowns
                      </small>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="">Weightage %</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter weightage "
                      name="weightage"
                      value={formData.weightage}
                      onChange={handleChange}
                    />
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
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label htmlFor="">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select w-25"
                      name="status"
                      value={String(formData.status)}
                      onChange={handleChange}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
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
                      {loading ? " Saving..." : " Save Assessment Category"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 d-flex flex-column">
            <div className="card shadow  flex-fill mb-2 alert alert-primary ">
              <h6>
                <MdErrorOutline size={25} /> Assessment Category Information
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
                  <h6>✔ Internal Assessment</h6>
                  <h6>✔ Main Examination</h6>
                  <h6>✔ Practical Examination</h6>
                  <h6>✔ Oral Assessment</h6>
                  <h6>✔ Assignment & Project</h6>
                  <h6>✔ Co-curricular Assessment</h6>
                  <h6>✔ Skill Evaluation</h6>
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
                  <small>Category Name : {formData.categoryName || "-"}</small>
                </h6>
                <h6>
                  <small>Short Code : {formData.shortCode || "-"}</small>
                </h6>

                <h6>
                  <small>Nature : {formData.nature || "-"}</small>
                </h6>
                <h6>
                  <small>Weightage : {formData.weightage || "-"}</small>
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

export default AddAssessmentCategory;
