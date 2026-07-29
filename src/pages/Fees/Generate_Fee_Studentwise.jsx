

import axios from "axios";
import { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const months = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];

const Generate_Fee_Studentwise = () => {
  const { admissionNumber } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ===============================
  // Loading
  // ===============================

  const [loading, setLoading] = useState(true);

  // ===============================
  // Student
  // ===============================

  const [student, setStudent] = useState(null);

  // ===============================
  // Masters
  // ===============================

  const [feeCategories, setFeeCategories] = useState([]);
  const [feeBatches, setFeeBatches] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  // ===============================
  // Assigned Fee (student_fee table)
  // ===============================

  const [assignedFees, setAssignedFees] = useState([]);

  // ===============================
  // Generated Schedule
  // (student_fee_schedule table)
  // ===============================

  const [currentSchedule, setCurrentSchedule] = useState([]);

  // ===============================
  // Checkbox
  // ===============================

  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [undoSchedule, setUndoSchedule] = useState([]);

  // ===============================
  // Initial Load
  // ===============================

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      await Promise.all([
        loadFeeCategories(),
        loadFeeBatches(),
      ]);

      await loadStudent();

    } catch (err) {
      console.log(err);
    }
  };
  console.log("Student",student);
  // =====================================
// Load Student
// =====================================

const loadStudent = async () => {
  try {
    setLoading(true);

    const res = await axiosInstance.get(
      `/api/students/${admissionNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const stu = res.data;

    setStudent(stu);

    setSelectedCategory(stu.feeCategory || "");
    setSelectedBatch(stu.feeBatch || "");

    await Promise.all([
      loadAssignedFees(stu.admissionNumber),
      loadCurrentSchedule(stu.admissionNumber),
    ]);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

// =====================================
// Fee Categories
// =====================================

const loadFeeCategories = async () => {
  try {
    const res = await axiosInstance.get(
      "/api/master/fee-category",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setFeeCategories(res.data);
  } catch (err) {
    console.log(err);
  }
};

// =====================================
// Fee Batches
// =====================================

const loadFeeBatches = async () => {
  try {
    const res = await axiosInstance.get(
      "/api/master/fee-batch",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setFeeBatches(res.data);
  } catch (err) {
    console.log(err);
  }
};

// =====================================
// Assigned Fee (student_fee table)
// =====================================

const loadAssignedFees = async (admissionNo) => {
  try {
    const res = await axiosInstance.get(
      `/api/student-fee/${admissionNo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAssignedFees(res.data);
  } catch (err) {
    console.log(err);
    setAssignedFees([]);
  }
};

// =====================================
// Current Schedule
// (student_fee_schedule table)
// =====================================

const loadCurrentSchedule = async (admissionNo) => {
  try {
    const res = await axiosInstance.get(
      `/api/student-fee/schedule/${admissionNo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCurrentSchedule(res.data);
  } catch (err) {
    console.log(err);
    setCurrentSchedule([]);
  }
};

// =====================================
// Loading Screen
// =====================================

if (loading) {
  return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary"></div>
      <h5 className="mt-3">Loading...</h5>
    </div>
  );
}

if (!student) {
  return (
    <div className="text-center mt-5">
      <h4>Student Not Found</h4>
    </div>
  );
}
// =====================================
// Already Generated Months
// =====================================

const generatedMonths = [
  ...new Set(currentSchedule.map((item) => item.month)),
];

// =====================================
// Available Months
// =====================================

const availableMonths = months.filter(
  (month) => !generatedMonths.includes(month)
);

// =====================================
// Select Schedule
// =====================================

const handleScheduleSelection = (month, fee) => {
  const exists = selectedSchedule.find(
    (item) =>
      item.month === month &&
      item.feeMasterId === fee.feeMasterId
  );

  if (exists) {
    setSelectedSchedule((prev) =>
      prev.filter(
        (item) =>
          !(
            item.month === month &&
            item.feeMasterId === fee.feeMasterId
          )
      )
    );
  } else {
    setSelectedSchedule((prev) => [
      ...prev,
      {
        month: month,

        feeMasterId: fee.feeMasterId,

        feeCode: fee.feeCode,

        feeName: fee.feeName,

        amount: fee.amount,
      },
    ]);
  }
};

// =====================================
// Undo Selection
// =====================================

const handleUndoSelection = (id) => {
  if (undoSchedule.includes(id)) {
    setUndoSchedule((prev) =>
      prev.filter((item) => item !== id)
    );
  } else {
    setUndoSchedule((prev) => [...prev, id]);
  }
};

// =====================================
// Generate Fee
// =====================================

const handleGenerateFee = async () => {
  if (selectedSchedule.length === 0) {
    alert("Please select fee schedule.");
    return;
  }

  try {
    await axios.post(
      "/api/student-fee/generate",
      {
        admissionNumber: student.admissionNumber,
        schedules: selectedSchedule,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Fee Generated Successfully");

    setSelectedSchedule([]);

    await loadCurrentSchedule(student.admissionNumber);
  } catch (err) {
    console.log(err);
    alert("Failed to generate fee.");
  }
};

// =====================================
// Undo Fee
// =====================================

const handleUndoFee = async () => {
  if (undoSchedule.length === 0) {
    alert("Please select schedule.");
    return;
  }

  try {
    await axios.delete(
      "/api/student-fee/undo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: undoSchedule,
      }
    );

    alert("Undo Successfully");

    setUndoSchedule([]);

    await loadCurrentSchedule(student.admissionNumber);
  } catch (err) {
    console.log(err);
    alert("Undo Failed");
  }
};

// =====================================
// Navigation
// =====================================

const handleLedger = () => {
  navigate(`/fee/feeledger/${student.admissionNumber}`);
};

const handleCollection = () => {
  navigate(`/fee/feeCollection/${student.admissionNumber}`);
};
return (
  <>
    {/* ===========================
        Header
    ============================ */}

    {/* ==========================================
        Header
    ========================================== */}

      <div
        className="shadow rounded p-3"
       
      >
       <div className="row">
         <div className="col-md-8">
          <h4 className="mb-1">
            <strong>Generate Fee - Student Wise</strong>
          </h4>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">Fee</li>
              <li className="breadcrumb-item active">Generate Fee</li>
            </ol>
          </nav>
        </div>

       
       </div>
      </div>

    {/* ===========================
        Student Details
    ============================ */}

    <div className="container-fluid mt-3 bg-white shadow rounded p-3">
      <div className="row">

        <div className="col-md-2 text-center">
          <img
            src={student.studentImage || ""}
            alt=""
            className="img-thumbnail"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-md-3">
          <h5>
            {student.firstName} {student.lastName}
          </h5>

          <h6>Admission No : {student.admissionNumber}</h6>

          <h6>
            Class : {student.studentClass} / {student.section}
          </h6>

          <h6>Mobile : {student.mobile}</h6>

          <h6>Session : {student.academicYear}</h6>
        </div>

        <div className="col-md-3">

          <label className="form-label">
            Fee Category
          </label>

          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value)
            }
          >
            <option value="">
              Select Category
            </option>

            {feeCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

        <div className="col-md-3">

          <label className="form-label">
            Fee Batch
          </label>

          <select
            className="form-select"
            value={selectedBatch}
            onChange={(e) =>
              setSelectedBatch(e.target.value)
            }
          >
            <option value="">
              Select Batch
            </option>

            {feeBatches.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

      </div>

      <div className="row mt-4">

        <div className="col-md-4">
          <button
            className="btn btn-success w-100"
            onClick={handleLedger}
          >
            Fee Ledger
          </button>
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-primary w-100"
            onClick={handleCollection}
          >
            Fee Collection
          </button>
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-warning w-100"
          >
            Update Batch / Category
          </button>
        </div>

      </div>
    </div>

    {/* ===========================
        Current Schedule
    ============================ */}

    <div className="container-fluid mt-4 bg-white shadow rounded p-3">

      <h5 className="text-primary">
        Current Schedule
      </h5>

      <table className="table table-bordered table-striped">

        <thead>

          <tr>

            <th width="60">Undo</th>

            <th>Month</th>

            <th>Fee Code</th>

            <th>Fee Name</th>

            <th>Amount</th>

            <th>Paid</th>

            <th>Due</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {currentSchedule.length === 0 ? (

            <tr>

              <td
                colSpan="8"
                className="text-center text-danger"
              >
                No Fee Generated
              </td>

            </tr>

          ) : (

            currentSchedule.map((fee) => (

              <tr key={fee.id}>

                <td>

                  <input
                    type="checkbox"
                    checked={undoSchedule.includes(fee.id)}
                    onChange={() =>
                      handleUndoSelection(fee.id)
                    }
                  />

                </td>

                <td>{fee.month}</td>

                <td>{fee.feeCode}</td>

                <td>{fee.feeName}</td>

                <td>₹ {fee.amount}</td>

                <td>₹ {fee.paidAmount}</td>

                <td>₹ {fee.dueAmount}</td>

                <td>

                  <span
                    className={`badge ${
                      fee.status === "PAID"
                        ? "bg-success"
                        : fee.status === "PARTIAL"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                    }`}
                  >
                    {fee.status}
                  </span>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      <div className="text-end">

        <button
          className="btn btn-danger"
          disabled={undoSchedule.length === 0}
          onClick={handleUndoFee}
        >
          <TbArrowBackUp className="me-2" />
          Undo Selected
        </button>

      </div>

    </div>
        {/* ======================================
            NEW SCHEDULE
    ======================================= */}

    <div className="container-fluid mt-4 bg-white shadow rounded p-3">

      <h5 className="text-success">
        New Schedule
      </h5>

      <table className="table table-bordered table-striped">

        <thead>

          <tr>

            <th width="60">Select</th>

            <th>Month</th>

            <th>Fee Code</th>

            <th>Fee Name</th>

            <th>Amount</th>

          </tr>

        </thead>

        <tbody>

          {availableMonths.length === 0 ? (

            <tr>
              <td
                colSpan="5"
                className="text-center text-success"
              >
                All Months Fee Already Generated
              </td>
            </tr>

          ) : (

            availableMonths.flatMap((month) =>

              assignedFees.map((fee) => (

                <tr key={`${month}-${fee.id}`}>

                  <td>

                    <input
                      type="checkbox"
                      checked={selectedSchedule.some(
                        (item) =>
                          item.month === month &&
                          item.feeMasterId === fee.feeMasterId
                      )}
                      onChange={() =>
                        handleScheduleSelection(month, fee)
                      }
                    />

                  </td>

                  <td>{month}</td>

                  <td>{fee.feeCode}</td>

                  <td>{fee.feeName}</td>

                  <td>₹ {fee.amount}</td>

                </tr>

              ))

            )

          )}

        </tbody>

      </table>

      <div className="text-end">

        <button
          className="btn btn-success btn-lg"
          disabled={selectedSchedule.length === 0}
          onClick={handleGenerateFee}
        >
          <TiTick className="me-2" />
          Generate Fee
        </button>

      </div>

    </div>

  </>
);

};

export default Generate_Fee_Studentwise;