import React from "react";

const EditStudentModal = ({
  show,
  student,
  setStudent,
  onClose,
  onSave,
  setPhoto,
}) => {
  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        background: "rgba(0,0,0,.5)",
       
      }}
    >
      <div className="modal-dialog modal-xl modal-dialog-scrollable " style={{marginTop:"65px"}}>
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5>Edit Student</h5>

            <button className="btn-close btn-close-white" onClick={onClose} />
          </div>

          <div className="modal-body">
            {/* Student Information */}

            <div className="card mb-3">
              <div className="card-header bg-info text-white">
                Student Information
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>First Name</label>

                    <input
                      className="form-control"
                      name="firstName"
                      value={student.firstName || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Middle Name</label>

                    <input
                      className="form-control"
                      name="middleName"
                      value={student.middleName || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Last Name</label>

                    <input
                      className="form-control"
                      name="lastName"
                      value={student.lastName || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Date Of Birth</label>

                    <input
                      type="date"
                      className="form-control"
                      name="dob"
                      value={student.dob || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Gender</label>

                    <select
                      className="form-select"
                      name="gender"
                      value={student.gender || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Age</label>

                    <input
                      className="form-control"
                      name="age"
                      value={student.age || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Email</label>

                    <input
                      className="form-control"
                      name="email"
                      value={student.email || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Mobile</label>

                    <input
                      className="form-control"
                      name="mobile"
                      value={student.mobile || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Photo</label>

                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}

            <div className="card">
              <div className="card-header bg-success text-white">
                Academic Information
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>Admission Number</label>

                    <input
                      className="form-control"
                      value={student.admissionNumber || ""}
                      readOnly
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Academic Year</label>

                    <input
                      className="form-control"
                      name="academicYear"
                      value={student.academicYear || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Class</label>

                    <input
                      className="form-control"
                      name="studentClass"
                      value={student.studentClass || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Section</label>

                    <select
                      className="form-select"
                      name="section"
                      value={student.section || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>D</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Fee Category</label>

                    <input
                      className="form-control"
                      name="feeCategory"
                      value={student.feeCategory || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Fee Batch</label>

                    <input
                      className="form-control"
                      name="feeBatch"
                      value={student.feeBatch || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ================= Father Information ================= */}

            <div className="card mt-3">
              <div className="card-header bg-primary text-white">
                Father Information
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Father Name</label>
                    <input
                      className="form-control"
                      name="fatherName"
                      value={student.fatherName || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Father Mobile</label>
                    <input
                      className="form-control"
                      name="fatherMobile"
                      value={student.fatherMobile || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Father Email</label>
                    <input
                      className="form-control"
                      name="fatherEmail"
                      value={student.fatherEmail || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Father Occupation</label>
                    <input
                      className="form-control"
                      name="fatherOccupation"
                      value={student.fatherOccupation || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ================= Mother Information ================= */}

            <div className="card mt-3">
              <div className="card-header bg-danger text-white">
                Mother Information
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Mother Name</label>
                    <input
                      className="form-control"
                      name="motherName"
                      value={student.motherName || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Mother Mobile</label>
                    <input
                      className="form-control"
                      name="motherMobile"
                      value={student.motherMobile || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Mother Email</label>
                    <input
                      className="form-control"
                      name="motherEmail"
                      value={student.motherEmail || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Mother Occupation</label>
                    <input
                      className="form-control"
                      name="motherOccupation"
                      value={student.motherOccupation || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ================= Address Information ================= */}

            <div className="card mt-3">
              <div className="card-header bg-success text-white">
                Address Information
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label>House No</label>
                    <input
                      className="form-control"
                      name="houseNo"
                      value={student.houseNo || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label>Street</label>
                    <input
                      className="form-control"
                      name="street"
                      value={student.street || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label>Area</label>
                    <input
                      className="form-control"
                      name="area"
                      value={student.area || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label>Town</label>
                    <input
                      className="form-control"
                      name="town"
                      value={student.town || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label>City</label>
                    <input
                      className="form-control"
                      name="city"
                      value={student.city || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label>State</label>
                    <input
                      className="form-control"
                      name="state"
                      value={student.state || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label>Country</label>
                    <input
                      className="form-control"
                      name="country"
                      value={student.country || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label>Zip Code</label>
                    <input
                      className="form-control"
                      name="zip"
                      value={student.zip || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
         

          {/* ================= Personal Information ================= */}

          <div className="card mt-3">
            <div className="card-header bg-warning">Personal Information</div>

            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>Nationality</label>
                  <input
                    className="form-control"
                    name="nationality"
                    value={student.nationality || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Religion</label>
                  <input
                    className="form-control"
                    name="religion"
                    value={student.religion || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Category</label>
                  <input
                    className="form-control"
                    name="category"
                    value={student.category || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Caste</label>
                  <input
                    className="form-control"
                    name="caste"
                    value={student.caste || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Blood Group</label>
                  <input
                    className="form-control"
                    name="bloodGroup"
                    value={student.bloodGroup || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Mother Tongue</label>
                  <input
                    className="form-control"
                    name="motherTongue"
                    value={student.motherTongue || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Transport Required</label>

                  <select
                    className="form-select"
                    name="transportRequired"
                    value={student.transportRequired || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label>Status</label>

                  <select
                    className="form-select"
                    name="status"
                    value={student.status || ""}
                    onChange={handleChange}
                  >
                    <option value="CREATED">CREATED</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ================= Photo Preview ================= */}

          <div className="card mt-3">
            <div className="card-header bg-secondary text-white">
              Student Photo
            </div>

            <div className="card-body text-center">
              {student.photo && (
                <img
                  src={`http://localhost:8080/uploads/${student.photo}`}
                  alt="Student"
                  className="img-thumbnail mb-3"
                  style={{
                    width: 170,
                    height: 170,
                    objectFit: "cover",
                  }}
                />
              )}

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
          </div>

           </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button className="btn btn-success" onClick={onSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;
