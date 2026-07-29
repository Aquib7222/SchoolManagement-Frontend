import { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import axios from "../../api/axiosInstance";

const CardHead = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [pendingFee, setPendingFee] = useState([]);
  const [paidFee, setPaidFee] = useState([]);

  // -------------------- Fetch Total Students Count --------------------
  useEffect(() => {
    if (!schoolId) return;

    axios
      .get(`/api/students/count`, {
        params: { schoolId },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTotalStudents(res.data))
      .catch(console.error);
  }, [schoolId, token]);

  // -------------------- Fetch Teachers --------------------
  useEffect(() => {
    if (!schoolId) return;

    axios
      .get("/api/teachers", {
        params: { schoolId, status: "Working" },
      })
      .then((res) => setTotalTeachers(res.data))
      .catch(console.error);
  }, [schoolId]);

  // -------------------- Fetch Students (NO class-wise API) --------------------
  useEffect(() => {
    if (!schoolId) return;

    axios
      .get("/api/students", {
        params: { schoolId },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setStudents(list);
        calculateClassWise(list);
      })
      .catch(console.error);
  }, [schoolId, token]);

  console.log("students", students);
  console.log("users", user);

  // pending fee api
  useEffect(() => {
    if (!schoolId) return;
    const res = axios
      .get("/api/student-fee/all", {
        // params:{status:"UNPAID"},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const result = (res.data || []).filter(
          (item) => item.status === "UNPAID",
        );
        const Paid = (res.data || []).filter(
          (item) => item.status === "PAID" || item.status === "PARTIAL",
        );
        setPaidFee(Paid);
        setPendingFee(result);
      })

      .catch(console.error);
  }, [schoolId]);

  // -------------------------Calculate pending fees --------------------

  const pendingAmount = pendingFee.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );
  console.log("Pending Amount", pendingAmount);

  // -------------------------Calculate paid fees --------------------

  const paidAmount = paidFee.reduce(
    (sum, item) => sum + Number(item.paidAmount || 0),
    0,
  );
  console.log("Paid Amount", paidAmount);

  return (
    <>
      <div className="container-fluid px-0 ">
        <div className="row g-3">
          {/* Total Students */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: 55,
                      height: 55,
                      background: "#E8F1FF",
                    }}
                  >
                    <FaUserGraduate size={26} color="#2563eb" />
                  </div>

                  <div className="flex-grow-1">
                    <small className="text-muted d-block">Total Students</small>

                    <h4 className="fw-bold mb-0">{totalStudents}</h4>

                    <small className="text-success">
                      ↑ 10% from last month
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teachers */}

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: 55,
                      height: 55,
                      background: "#EAF8EF",
                    }}
                  >
                    <FaChalkboardTeacher size={26} color="#16a34a" />
                  </div>

                  <div className="flex-grow-1">
                    <small className="text-muted d-block">Total Teachers</small>

                    <h4 className="fw-bold mb-0">{totalTeachers.length}</h4>

                    <small className="text-success">↑ 5% from last month</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Collection */}

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: 55,
                      height: 55,
                      background: "#FFF4D9",
                    }}
                  >
                    <MdPayments size={26} color="#f59e0b" />
                  </div>

                  <div className="flex-grow-1">
                    <small className="text-muted d-block">Fee Collection</small>

                    <h4 className="fw-bold mb-0 text-warning">
                      ₹ {paidAmount}
                    </h4>

                    <small className="text-success">↑ 8% this month</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pending */}

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: 55,
                      height: 55,
                      background: "#FFEAEA",
                    }}
                  >
                    <RiMoneyRupeeCircleFill size={28} color="#dc2626" />
                  </div>

                  <div className="flex-grow-1">
                    <small className="text-muted d-block">Fee Pending</small>

                    <h4 className="fw-bold mb-0 text-danger">
                      ₹ {pendingAmount}
                    </h4>

                    <small className="text-danger">Pending Collection</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHead;
