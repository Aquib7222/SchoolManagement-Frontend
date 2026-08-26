import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaCalendarCheck,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaRegCalendarAlt,
  FaUserGraduate,
} from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { BsFileEarmarkSlides } from "react-icons/bs";

import { MdArrowOutward, MdMessage, MdPayments } from "react-icons/md";
import { RiDraftFill, RiMoneyRupeeCircleFill } from "react-icons/ri";
import axios from "../../api/axiosInstance";
import banner from "../../assets/icon/banner_logo.png";
import axiosInstance from "../../api/axiosInstance";

const Card = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [pendingFee, setPendingFee] = useState([]);
  const [paidFee, setPaidFee] = useState([]);

  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState(null);

const loadAttendance = async () => {
  try {
    const attendanceRes = await axiosInstance.get(
      "/api/student/attendance/current",
      {
        params: {
          admissionNumber: user?.admissionNumber,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAttendance(attendanceRes.data);
  } catch (error) {
    console.log("Attendance Error:", error);
  }
};

useEffect(() => {
  if (user?.admissionNumber) {
    loadAttendance();
  }
}, [user?.admissionNumber]);

console.log("attendance", attendance);

  const getStudent = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/api/students/${user.admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  useEffect(() => {
    if (user?.admissionNumber) {
      getStudent();
    }
  }, [user?.admissionNumber]);

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

  

  return (
    <>
      <div
        className="container-fluid px-0 bg-white rounded shadow mt-2 mb-4"
        style={{
          position: "relative",
          height: "120px",
          overflow: "hidden",
        }}
      >
        <img
          src={banner}
          alt=""
          style={{
            position: "absolute",
            right: "0",
            bottom: "0",
            height: "100%",
            width: "auto",
            marginRight: "20px",
            objectFit: "contain",
          }}
        />
        <div className="row p-3 align-items-center">
          <div className="col-md-2 text-center">
            <img
              src={
                student?.profileImage ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  student?.firstName || "Student",
                )}&background=random&color=fff&size=200`
              }
              alt="Profile"
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                // border: "3px solid #f1f1f1",
              }}
            />
          </div>

          <div className="col-md-10">
            <h4 className="mb-2">
              <strong>
                {" "}
                Welcome, {student?.firstName || "Student"} {student?.lastName}👋
              </strong>
            </h4>

            <h6 className="">
              Class: {student?.studentClass}-{student?.section} | Roll No:
              {student?.rollNumber} | Admission No: {student?.admissionNumber}
            </h6>
            <h6>Academic Year: {student?.academicYear}</h6>
          </div>
        </div>
      </div>

      <div className="container-fluid px-0">
        <div className="row g-3">
          {/* 1. My Classes */}
          <div className="col-12  col-lg">
            <div className="card border-0 shadow rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{ width: 55, height: 55, background: "#E8F1FF" }}
                  >
                    <FaRegCalendarAlt size={26} color="#2563eb" />
                  </div>

                  <div className="flex-grow-1">
                    <strong className="text-muted d-block">Attendance</strong>
                    <h4 className="fw-bold mb-0">{attendance?.attendancePercentage}%</h4>
                    <small className="text-success">
                      This Month <FaArrowUp size={20} />
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Total Students */}
          <div className="col-12 col-sm-6 col-lg">
            <div className="card border-0 shadow rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{ width: 55, height: 55, background: "#EAF8EF" }}
                  >
                    <BsFileEarmarkSlides size={26} color="#16a34a" />
                  </div>

                  <div className="flex-grow-1">
                    <strong className="text-muted d-block">Total Marks</strong>
                    <h4 className="fw-bold mb-0">78.45%</h4>
                    <small className="text-success">
                      In Term I <FaArrowTrendUp size={20} />
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Today's Attendance */}
          <div className="col-12 col-sm-6 col-lg">
            <div className="card border-0 shadow rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{ width: 55, height: 55, background: "#FFF4D9" }}
                  >
                    <FaCalendarCheck size={26} color="#f59e0b" />
                  </div>

                  <div className="flex-grow-1">
                    <strong className="text-muted d-block">Fee Status</strong>
                    <h4 className="fw-bold mb-0 text-warning">2500</h4>
                    <small className="text-success">
                      {" "}
                      Due Amount <FaArrowUp size={20} className="text-danger" />
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Pending Work */}
          <div className="col-12 col-sm-6 col-lg">
            <div className="card border-0 shadow rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{ width: 55, height: 55, background: "#FFEAEA" }}
                  >
                    <MdMessage size={28} color="#dc2626" />
                  </div>

                  <div className="flex-grow-1">
                    <strong className="text-muted d-block">Message</strong>
                    <h4 className="fw-bold mb-0 text-danger">3</h4>
                    <small className="text-danger">
                      Unread <MdArrowOutward size={20} />
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Pending Evaluation */}
          <div className="col-12 col-sm-6 col-lg">
            <div className="card border-0 shadow rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{ width: 55, height: 55, background: "#F3E8FF" }}
                  >
                    <RiDraftFill size={26} color="#7c3aed" />
                  </div>

                  <div className="flex-grow-1">
                    <strong className="text-muted d-block">Notices</strong>

                    <h4 className="fw-bold mb-0 text-primary">
                      {/* {pendingEvaluation} */}2
                    </h4>

                    <small className="text-primary">
                      New <MdArrowOutward size={20} />
                    </small>
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

export default Card;
