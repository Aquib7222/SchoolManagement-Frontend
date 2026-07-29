import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

const AssignFeeToStudents = () => {
  const token = localStorage.getItem("token");

  // ==========================
  // Master Data
  // ==========================
  const [sessions, setSessions] = useState([]);
  const [standards, setStandards] = useState([]);
  const [feeCategories, setFeeCategories] = useState([]);
  const [feeBatches, setFeeBatches] = useState([]);

  // ==========================
  // Search Filters
  // ==========================
  const [selected, setSelected] = useState({
    session: "",
    standard: "",
    category: "",
    batch: "",
  });

  // ==========================
  // Tables
  // ==========================
  const [feeStructures, setFeeStructures] = useState([]);
  const [students, setStudents] = useState([]);

  // ==========================
  // Selected Checkboxes
  // ==========================
  const [selectedFees, setSelectedFees] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  // ==========================
  // Load Masters
  // ==========================
  useEffect(() => {
    loadSessions();
    loadStandards();
    loadFeeCategories();
    loadFeeBatches();
  }, []);

  // ==========================
  // Sessions
  // ==========================
  const loadSessions = async () => {
    try {
      const res = await axiosInstance.get("/api/master/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSessions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Standards
  // ==========================
  const loadStandards = async () => {
    try {
      const res = await axiosInstance.get("/api/master/standard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStandards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Fee Categories
  // ==========================
  const loadFeeCategories = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/master/fee-category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFeeCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Fee Batches
  // ==========================
  const loadFeeBatches = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/master/fee-batch",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFeeBatches(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Search
  // ==========================
  const handleSearch = async () => {
    if (
      !selected.session ||
      !selected.standard ||
      !selected.category ||
      !selected.batch
    ) {
      alert("Please select all filters.");
      return;
    }

    setLoading(true);

    try {
      await Promise.all([loadFeeStructures(), loadStudents()]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Load Fee Structures
  // ==========================
  const loadFeeStructures = async () => {
    try {
      const res = await axiosInstance.get("/api/fee-structure", {
        params: {
          session: selected.session,
          standard: selected.standard,
          category: selected.category,
          batch: selected.batch,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeeStructures(res.data);
    } catch (err) {
      console.log(err);
      setFeeStructures([]);
    }
  };

  // ==========================
  // Load Students
  // ==========================
  const loadStudents = async () => {
    try {
      const res = await axiosInstance.get("/api/students/search", {
        params: {
          academicYear: selected.session,
          studentClass: selected.standard,
          feeCategory: selected.category,
          feeBatch: selected.batch,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data);
    } catch (err) {
      console.log(err);
      setStudents([]);
    }
  };

  // ==========================
  // Fee Checkbox
  // ==========================
  const handleFeeCheckbox = (id) => {
    if (selectedFees.includes(id)) {
      setSelectedFees(selectedFees.filter((x) => x !== id));
    } else {
      setSelectedFees([...selectedFees, id]);
    }
  };

  // ==========================
  // Student Checkbox
  // ==========================
  const handleStudentCheckbox = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((x) => x !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  // ==========================
  // Select All Fees
  // ==========================
  const handleSelectAllFees = (e) => {
    if (e.target.checked) {
      setSelectedFees(feeStructures.map((fee) => fee.id));
      console.log(
        "Selected Fees:",
        feeStructures.map((fee) => fee.id),
      );
    } else {
      setSelectedFees([]);
    }
  };

  // ==========================
  // Select All Students
  // ==========================
  const handleSelectAllStudents = (e) => {
    if (e.target.checked) {
      setSelectedStudents(students.map((stu) => stu.id));
      console.log(
        "Selected Students:",
        students.map((stu) => stu.id),
      );
    } else {
      setSelectedStudents([]);
    }
  };

  // ==========================
  // Assign Fee
  // ==========================
  const handleAssign = async () => {
    if (selectedFees.length === 0) {
      alert("Please select at least one Fee.");
      return;
    }

    if (selectedStudents.length === 0) {
      alert("Please select at least one Student.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {
        feeStructureIds: selectedFees,
        studentIds: selectedStudents,
      };

      console.log(payload);

      const res = await axiosInstance.post(
        "/api/student-fee/assign",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data);

      setSelectedFees([]);
      setSelectedStudents([]);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Fee Assignment Failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {/* ==========================================
        Header
    ========================================== */}

      <div
        className=" bg-white shadow rounded p-3"
       
      >
       <div className="row">
         <div className="col-md-8">
          <h4 className="mb-1">
            <strong>Assign Fee To Student</strong>
          </h4>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">Fee</li>
              <li className="breadcrumb-item active">Assign Fee</li>
            </ol>
          </nav>
        </div>

        
       </div>
      </div>

      <div className="container mt-3 bg-white shadow rounded p-3">
        <h5>Assign Fee To Students</h5>

        <div className="row">
          <div className="col-md-3 mb-3">
            <label>Session</label>
            <select
              className="form-select"
              value={selected.session}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  session: e.target.value,
                })
              }
            >
              <option value="">Select Session</option>

              {sessions.map((item) => (
                <option key={item} value={item}>
                  {item.replaceAll("_", "-")}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <label>Standard</label>

            <select
              className="form-select"
              value={selected.standard}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  standard: e.target.value,
                })
              }
            >
              <option value="">Select Standard</option>

              {standards.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <label>Fee Category</label>

            <select
              className="form-select"
              value={selected.category}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  category: e.target.value,
                })
              }
            >
              <option value="">Select Category</option>

              {feeCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <label>Fee Batch</label>

            <select
              className="form-select"
              value={selected.batch}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  batch: e.target.value,
                })
              }
            >
              <option value="">Select Batch</option>

              {feeBatches.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-12 text-end">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary"> </div>
        </div>
      ) : (
        <>
          <div className="container mt-4 bg-white shadow rounded p-3 table-responsive">
            <h5 className="mb-3">Fee Structure</h5>

            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th width="60">
                    <input
                      type="checkbox"
                      onChange={handleSelectAllFees}
                      checked={
                        feeStructures.length > 0 &&
                        selectedFees.length === feeStructures.length
                      }
                    />
                  </th>

                  <th>Fee Code</th>

                  <th>Fee Name</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {feeStructures.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Fee Structure Found
                    </td>
                  </tr>
                ) : (
                  feeStructures.map((structure) =>
                    structure.feeDetails.map((detail) => (
                      <tr key={detail.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedFees.includes(detail.id)}
                            onChange={() => handleFeeCheckbox(detail.id)}
                          />
                        </td>

                        <td>{detail.feeMaster.feeCode}</td>

                        <td>{detail.feeMaster.feeName}</td>

                        <td>{detail.amount}</td>
                      </tr>
                    )),
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="container mt-4 bg-white shadow rounded p-3 table-responsive">
            <h5 className="mb-3">Students</h5>

            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th width="60">
                    <input
                      type="checkbox"
                      checked={
                        students.length > 0 &&
                        selectedStudents.length === students.length
                      }
                      onChange={handleSelectAllStudents}
                    />
                  </th>

                  <th>Admission No</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Category</th>
                  <th>Batch</th>
                </tr>
              </thead>

              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Students Found
                    </td>
                  </tr>
                ) : (
                  students.map((stu) => (
                    <tr key={stu.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(stu.id)}
                          onChange={() => handleStudentCheckbox(stu.id)}
                        />
                      </td>

                      <td>{stu.admissionNumber}</td>

                      <td>
                        {stu.firstName} {stu.lastName}
                      </td>

                      <td>{stu.studentClass || stu.class}</td>

                      <td>{stu.section}</td>

                      <td>{stu.feeCategory}</td>

                      <td>{stu.feeBatch}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="container mt-3 mb-5">
            <div className="text-end">
              <button
                className="btn btn-success btn-lg"
                onClick={handleAssign}
                disabled={
                  selectedFees.length === 0 || selectedStudents.length === 0
                }
              >
                Assign Fee
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AssignFeeToStudents;
