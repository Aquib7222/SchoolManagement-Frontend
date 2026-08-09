import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { MdAssessment, MdAssignment, MdErrorOutline } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const AddAssessmentType = () => {
  const { sessions, assessmentNature } = useMasters();
  const schoolId = JSON.parse(localStorage.getItem("schoolId"));
  const [categories, setCategories] = useState([]);
  const [examTerms, setExamTerms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    schoolId: schoolId,
    typeName: "",
    shortCode: "",
    nature: "",
    categoryId: "",
    examTermId: "",
    session: "",
    maxMarks: "",
    passingMarks: "",
    weightage: "",
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
          : ["maxMarks", "passingMarks", "displayOrder"].includes(name)
            ? value === ""
              ? ""
              : Number(value)
            : name === "weightage"
              ? value === ""
                ? ""
                : Number(value)
              : value,
    }));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/assessment/category?schoolId=${schoolId}`,
      );
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("categories", categories);

  useEffect(() => {
    if (formData.session) {
      loadExamTerms();
    } else {
      setExamTerms([]);
    }
  }, [formData.session]);

  const loadExamTerms = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/assessment/exam-term?schoolId=${schoolId}&session=${formData.session}`,
      );

      setExamTerms(response.data);
    } catch (error) {
      console.log("Exam Term error :", error);
    }
  };

  console.log("exam Terms", examTerms);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        ...formData,
        schoolId: schoolId,
      };

      console.log("Assessment Type Payload:", payload);

      const response = await axiosInstance.post(
        "/api/assessment/type",
        payload,
      );

      console.log("Saved:", response.data);

      toast.success("Assessment Type added successfully");
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);

      toast.error(error.response?.data || "Failed to save assessment type");
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
          <MdAssessment /> Add Assessment Type
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
              <small>Add Assessment Type</small>
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
          <MdErrorOutline /> Create a new assessment type that will be available
          in assessment setup.
        </small>
      </div>

      <div className="container-fluid mt-3">
        <div className="row g-2 align-items-stretch">
          <div className="col-12 col-lg-8">
            <div className="card shadow h-100">
              <div className="card-header bg-white d-flex align-items-center">
                <h6>
                  <MdAssignment size={20} /> Assessment Type Details
                </h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Assessment Type Name{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="typeName"
                      value={formData.typeName}
                      onChange={handleChange}
                      placeholder="Enter assessment type name"
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
                        setFormData((prev) => ({
                          ...prev,
                          shortCode: e.target.value.toUpperCase(),
                        }))
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
                <div className="row mt-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Assessment Category <span className="text-danger">*</span>
                    </label>
                    <select
                      name="categoryId"
                      id="categoryId"
                      className="form-select"
                      value={formData.categoryId}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Assessment Nature <span className="text-danger">*</span>
                    </label>
                    <select
                      name="nature"
                      id="nature"
                      className="form-select"
                      value={formData.nature}
                      onChange={handleChange}
                    >
                      <option value="">Select Nature</option>
                      {assessmentNature.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Sessions <span className="text-danger">*</span>
                    </label>
                    <select
                      name="session"
                      id="session"
                      className="form-select"
                      value={formData.session}
                      onChange={handleChange}
                    >
                      <option value="">Select Session</option>
                      {sessions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Exam Term <span className="text-danger">*</span>
                    </label>
                    <select
                      name="examTermId"
                      id="examTermId"
                      className="form-select"
                      value={formData.examTermId}
                      onChange={handleChange}
                      disabled={!formData.session}
                    >
                      <option value="">
                        {formData.session
                          ? "Select Exam Term"
                          : "Select Session First"}
                      </option>

                      {examTerms.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.examTerm}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mt-3 ">
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Max Marks <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="maxMarks"
                      value={formData.maxMarks}
                      onChange={handleChange}
                      placeholder="Enter maximum marks"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="">Passing Marks (Optional)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="passingMarks"
                      value={formData.passingMarks}
                      onChange={handleChange}
                      placeholder="Enter passing marks"
                    />
                  </div>
                </div>

                <div className="row mt-3">
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
                      placeholder="Enter display order"
                    />
                    <div className="">
                      <small className="text-muted">
                        Used to sort in dropdowns
                      </small>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="">
                      Default Weightage % <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="weightage"
                      value={formData.weightage}
                      onChange={handleChange}
                      placeholder="Enter weightage percentage"
                    />
                    <div className="">
                      <small className="text-muted">
                        Used in result weightage
                      </small>
                    </div>
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
                      placeholder="Enter description/instruction for this assessment type"
                    />

                    <div className="d-flex justify-content-between mt-1">
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
                      name="status"
                      id="status"
                      className="form-select w-25"
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
                      <MdAssignment size={18} />

                      {loading ? " Saving..." : " Save assessment type"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 d-flex flex-column">
            <div className="card shadow  flex-fill mb-2 alert alert-primary ">
              <h6>
                <MdErrorOutline size={25} /> Assessment Type Information
              </h6>
              <div className="card-body mt-0">
                <p>
                  <small>
                    Assessment type are used to categorize different evaluation
                    in the school.
                  </small>{" "}
                </p>
                <h6>Examples:</h6>
                <div>
                  <h6>
                    <TiTick size={20} />
                    Unit Test{" "}
                  </h6>
                  <h6>
                    <TiTick size={20} />
                    Class Test{" "}
                  </h6>
                  <h6>
                    <TiTick size={20} />
                    Quiz{" "}
                  </h6>
                  <h6>
                    <TiTick size={20} />
                    Home work{" "}
                  </h6>
                  <h6>
                    <TiTick size={20} />
                    Mid Term Exam{" "}
                  </h6>
                  <h6>
                    <TiTick size={20} />
                    Term End Exam{" "}
                  </h6>
                  <h6>
                    <TiTick size={20} />
                    Practical Exam{" "}
                  </h6>
                  <h6>
                    <TiTick size={20} />
                    Oral / Viva{" "}
                  </h6>
                  <h6>
                    <TiTick size={20} />
                    Project / Assignment{" "}
                  </h6>
                  <h6>
                    <TiTick size={20} />
                    Etc{" "}
                  </h6>
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
                  <small>Type Name : {formData.typeName || "-"}</small>
                </h6>

                <h6>
                  <small>Short Code : {formData.shortCode || "-"}</small>
                </h6>

                <h6>
                  <small>
                    Category :{" "}
                    {categories.find(
                      (item) => String(item.id) === String(formData.categoryId),
                    )?.categoryName || "-"}
                  </small>
                </h6>

                <h6>
                  <small>
                    Nature :{" "}
                    {assessmentNature.find(
                      (item) => item.name === formData.nature,
                    )?.displayName || "-"}
                  </small>
                </h6>

                <h6>
                  <small>Session : {formData.session || "-"}</small>
                </h6>

                <h6>
                  <small>
                    Exam Term :{" "}
                    {examTerms.find(
                      (item) => String(item.id) === String(formData.examTermId),
                    )?.examTerm || "-"}
                  </small>
                </h6>

                <h6>
                  <small>Max Marks : {formData.maxMarks || "-"}</small>
                </h6>

                <h6>
                  <small>Passing Marks : {formData.passingMarks || "-"}</small>
                </h6>

                <h6>
                  <small>
                    Weightage :{" "}
                    {formData.weightage !== "" ? `${formData.weightage}%` : "-"}
                  </small>
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

                <div className="alert alert-warning p-1 mt-3">
                  <small>
                    <TbBulb size={20} /> This assessment type will be available
                    in Assessment setup once saved.
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

export default AddAssessmentType;
