import axios from "axios";
import { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import {
  FaArrowLeft,
  FaChalkboardTeacher,
  FaFileInvoiceDollar,
  FaMoneyCheckAlt,
  FaUserGraduate,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { MdMoney, MdOutlineSchool, MdPayments } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaMoneyBills } from "react-icons/fa6";

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

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  const [feeCategories, setFeeCategories] = useState([]);
  const [feeBatches, setFeeBatches] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  const [assignedFees, setAssignedFees] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState([]);

  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [undoSchedule, setUndoSchedule] = useState([]);

  const [generating, setGenerating] = useState(false);
  const [undoing, setUndoing] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);

      await Promise.all([loadFeeCategories(), loadFeeBatches()]);

      await loadStudent();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStudent = async () => {
    try {
      const res = await axiosInstance.get(`/api/students/${admissionNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    }
  };

  const loadFeeCategories = async () => {
    try {
      const res = await axiosInstance.get("/api/master/fee-category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeeCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadFeeBatches = async () => {
    try {
      const res = await axiosInstance.get("/api/master/fee-batch", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeeBatches(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadAssignedFees = async (admissionNo) => {
    try {
      const res = await axiosInstance.get(`/api/student-fee/${admissionNo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAssignedFees(res.data);
    } catch (err) {
      console.log(err);
      setAssignedFees([]);
    }
  };

  const loadCurrentSchedule = async (admissionNo) => {
    try {
      const res = await axiosInstance.get(
        `/api/student-fee/schedule/${admissionNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCurrentSchedule(res.data);
    } catch (err) {
      console.log(err);
      setCurrentSchedule([]);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
        ></div>
        <h5 className="mt-3 text-secondary">Loading Fee Details...</h5>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="container-fluid mt-4">
        <div className="card shadow border-0">
          <div className="card-body text-center p-5">
            <h4 className="text-danger mb-3">Student Not Found</h4>

            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              <FaArrowLeft className="me-2" />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const generatedMonths = [
    ...new Set(currentSchedule.map((item) => item.month)),
  ];

  const availableMonths = months.filter(
    (month) => !generatedMonths.includes(month),
  );

  const handleScheduleSelection = (month, fee) => {
    const exists = selectedSchedule.find(
      (item) => item.month === month && item.feeMasterId === fee.feeMasterId,
    );

    if (exists) {
      setSelectedSchedule((prev) =>
        prev.filter(
          (item) =>
            !(item.month === month && item.feeMasterId === fee.feeMasterId),
        ),
      );
    } else {
      setSelectedSchedule((prev) => [
        ...prev,
        {
          month,
          feeMasterId: fee.feeMasterId,
          feeCode: fee.feeCode,
          feeName: fee.feeName,
          amount: fee.amount,
        },
      ]);
    }
  };

  const handleUndoSelection = (id) => {
    if (undoSchedule.includes(id)) {
      setUndoSchedule((prev) => prev.filter((item) => item !== id));
    } else {
      setUndoSchedule((prev) => [...prev, id]);
    }
  };

  const handleGenerateFee = async () => {
    if (selectedSchedule.length === 0) {
      alert("Please select fee schedule.");
      return;
    }

    try {
      setGenerating(true);

      await axiosInstance.post(
        "/api/student-fee/generate",
        {
          admissionNumber: student.admissionNumber,
          schedules: selectedSchedule,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Fee Generated Successfully");

      setSelectedSchedule([]);

      await loadCurrentSchedule(student.admissionNumber);
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Failed to generate fee.");
    } finally {
      setGenerating(false);
    }
  };

  const handleUndoFee = async () => {
    if (undoSchedule.length === 0) {
      alert("Please select schedule.");
      return;
    }

    try {
      setUndoing(true);

      await axiosInstance.delete("/api/student-fee/undo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: undoSchedule,
      });

      alert("Undo Successfully");

      setUndoSchedule([]);

      await loadCurrentSchedule(student.admissionNumber);
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Undo Failed");
    } finally {
      setUndoing(false);
    }
  };

  const handleLedger = () => {
    navigate(`/fee/feeledger/${student.admissionNumber}`);
  };

  const handleCollection = () => {
    navigate(`/fee/feeCollection/${student.admissionNumber}`);
  };

  const totalCurrentFee = currentSchedule.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const totalPaid = currentSchedule.reduce(
    (sum, item) => sum + Number(item.paidAmount || 0),
    0,
  );

  const totalDue = currentSchedule.reduce(
    (sum, item) => sum + Number(item.dueAmount || 0),
    0,
  );

  return (
    <>
      <div className="mx-2 mt-2 mb-3">
        <div
          className="rounded-4 shadow overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
            border: "1px solid #dbeafe",
          }}
        >
          <div className="p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <MdMoney size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Generate Fee - Student wise
                  </h5>

                  <div className="text-muted small">
                    Fees &nbsp;/ &nbsp; Generate Fee
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Fees
                </span>
              </div>
            </div>
          </div>

          <div
            className="px-4 py-2"
            style={{
              backgroundColor: "rgba(239,246,255,.75)",
              borderTop: "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp; Fees &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Genereate Fee - Student-wise
              </span>
            </small>
          </div>
        </div>
      </div>

      <div className="px-2">
        <div className="card shadow border-0 mb-4 rounded-4 ">
          <div className="card-header bg-white py-3">
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "42px",
                  height: "42px",
                  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                }}
              >
                <FaFileInvoiceDollar size={27} />
              </div>
              <div className="d-flex flex-column ms-2">
                <h6 className="mb-0 lh-1">Student Fee Details</h6>
                <small className="lh-1 text-muted">student Details</small>
              </div>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="row align-items-center g-4 gap-4">
              <div
                className="col-xl-2 col-md-3 text-center border"
                style={{
                  width: "135px",
                  height: "135px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={student.studentImage || ""}
                  alt="Student"
                  className="img-thumbnail shadow"
                  style={{
                    width: "125px",
                    height: "125px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>

              <div className="col-xl-3 col-md-5">
                <h5 className="fw-bold mb-3">
                  {student.firstName} {student.lastName}
                </h5>

                <div className="mb-2">
                  <strong>Admission No:</strong> {student.admissionNumber}
                </div>

                <div className="mb-2">
                  <strong>Class:</strong> {student.studentClass} /{" "}
                  {student.section}
                </div>

                <div className="mb-2">
                  <strong>Mobile:</strong> {student.mobile || "-"}
                </div>

                <div>
                  <strong>Session:</strong> {student.academicYear}
                </div>
              </div>

              <div className="col-xl-3 col-md-4">
                <label className="form-label fw-semibold">Fee Category</label>

                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>

                  {feeCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-xl-3 col-md-4">
                <label className="form-label fw-semibold">Fee Batch</label>

                <select
                  className="form-select"
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                >
                  <option value="">Select Batch</option>

                  {feeBatches.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* <hr className="my-4" /> */}

            <div className="row g-3 mt-3">
              <div className="col-md-4">
                <button
                  className="btn btn-outline-success w-100 rounded-4"
                  onClick={handleLedger}
                >
                  <FaFileInvoiceDollar className="me-2" />
                  Fee Ledger
                </button>
              </div>

              <div className="col-md-4">
                <button
                  className="btn btn-primary w-100 rounded-4"
                  onClick={handleCollection}
                >
                  <FaMoneyCheckAlt className="me-2" />
                  Fee Collection
                </button>
              </div>

              <div className="col-md-4">
                <button className="btn btn-outline-warning w-100 rounded-4">
                  Update Batch / Category
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4 mt-2 px-2">
        {/* Total Amount */}

        <div className="col-xl-4 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaUserGraduate />
            </div>

            <div className="stat-content">
              <span>Generate Fee</span>

              <h3>₹{totalCurrentFee.toFixed(2)}</h3>

              <small>↑ 10% from last month</small>
            </div>
          </div>
        </div>

        {/* Collection */}

        <div className="col-xl-4 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaChalkboardTeacher />
            </div>

            <div className="stat-content">
              <span>Paid Amount</span>

              <h3>₹{totalPaid.toFixed(2)}</h3>

              <small>↑ 5% from last month</small>
            </div>
          </div>
        </div>

        {/* Discount */}

        <div className="col-xl-4 col-md-6">
          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <MdPayments />
            </div>

            <div className="stat-content">
              <span>Due Amount</span>

              <h3>₹{totalDue.toFixed(2)}</h3>

              <small>↑ 8% from this month</small>
            </div>
          </div>
        </div>

        {/* Fine */}
      </div>

      <div className="card shadow border-0 mb-4 rounded-4">
        <div className="card-header bg-white  py-3 d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-semibold">
            <FaMoneyBills />
            Current Schedule
          </h6>

          <span className="badge bg-light text-primary">
            {currentSchedule.length} Records
          </span>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table  align-middle mb-0">
              <thead className="table-primary">
                <tr>
                  <th width="70">Undo</th>
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
                    <td colSpan="8" className="text-center text-danger py-4">
                      No Fee Generated
                    </td>
                  </tr>
                ) : (
                  currentSchedule.map((fee) => (
                    <tr key={fee.id}>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={undoSchedule.includes(fee.id)}
                          onChange={() => handleUndoSelection(fee.id)}
                        />
                      </td>

                      <td>{fee.month}</td>

                      <td className="fw-semibold">{fee.feeCode}</td>

                      <td>{fee.feeName}</td>

                      <td>₹ {Number(fee.amount || 0).toFixed(2)}</td>

                      <td className="text-success fw-semibold">
                        ₹ {Number(fee.paidAmount || 0).toFixed(2)}
                      </td>

                      <td className="text-danger fw-semibold">
                        ₹ {Number(fee.dueAmount || 0).toFixed(2)}
                      </td>

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

              {currentSchedule.length > 0 && (
                <tfoot className="table-light">
                  <tr>
                    <th colSpan="4" className="text-end">
                      Total
                    </th>

                    <th>₹ {totalCurrentFee.toFixed(2)}</th>

                    <th className="text-success">₹ {totalPaid.toFixed(2)}</th>

                    <th className="text-danger">₹ {totalDue.toFixed(2)}</th>

                    <th></th>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          <div className="text-end mt-3">
            <button
              className="btn btn-danger"
              disabled={undoSchedule.length === 0 || undoing}
              onClick={handleUndoFee}
            >
              {undoing ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Undoing...
                </>
              ) : (
                <>
                  <TbArrowBackUp className="me-2" />
                  Undo Selected
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="card shadow border-0 mb-5">
        <div className="card-header bg-white  py-3 d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-semibold">New Fee Schedule</h6>

          <span className="badge bg-light text-primary">
            {selectedSchedule.length} Selected
          </span>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead className="table-primary">
                <tr>
                  <th width="70">Select</th>
                  <th>Month</th>
                  <th>Fee Code</th>
                  <th>Fee Name</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {availableMonths.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-success py-4">
                      All Months Fee Already Generated
                    </td>
                  </tr>
                ) : assignedFees.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-danger py-4">
                      No Assigned Fee Found
                    </td>
                  </tr>
                ) : (
                  availableMonths.flatMap((month) =>
                    assignedFees.map((fee) => (
                      <tr key={`${month}-${fee.id}`}>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedSchedule.some(
                              (item) =>
                                item.month === month &&
                                item.feeMasterId === fee.feeMasterId,
                            )}
                            onChange={() => handleScheduleSelection(month, fee)}
                          />
                        </td>

                        <td>
                          <span className="badge bg-light text-dark border">
                            {month}
                          </span>
                        </td>

                        <td className="fw-semibold">{fee.feeCode}</td>

                        <td>{fee.feeName}</td>

                        <td className="fw-semibold">
                          ₹ {Number(fee.amount || 0).toFixed(2)}
                        </td>
                      </tr>
                    )),
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end align-items-center mt-4">
            <div className="me-3 text-muted">
              Selected:{" "}
              <strong className="text-primary">
                {selectedSchedule.length}
              </strong>
            </div>

            <button
              className="btn btn-success btn-lg"
              disabled={selectedSchedule.length === 0 || generating}
              onClick={handleGenerateFee}
            >
              {generating ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Generating...
                </>
              ) : (
                <>
                  <TiTick className="me-2 fs-5" />
                  Generate Fee
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Generate_Fee_Studentwise;
