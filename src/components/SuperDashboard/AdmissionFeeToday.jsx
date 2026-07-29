import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "../../api/axiosInstance";
const AdmissionFeeToday = () => {
  const tableSlider = {
    dots: false,

    arrows: false,

    infinite: true,

    vertical: true,

    verticalSwiping: true,

    slidesToShow: 3,

    slidesToScroll: 1,

    autoplay: true,

    speed: 700,

    autoplaySpeed: 2500,

    pauseOnHover: true,
  };
  const [recentAdmissions, setRecentAdmissions] = useState([]);
  const [pendingFee, setPendingFee] = useState([]);
  const [paidFee, setPaidFee] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

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

  //   ------------------Recent Admissions -----------------------
  useEffect(() => {
    if (!schoolId) return;

    axios
      .get("/api/admissions/school", {
        params: { schoolId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];

        const today = new Date();
        today.setHours(23, 59, 59, 999);

        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
        twoMonthsAgo.setHours(0, 0, 0, 0);

        const filtered = list
          .filter((student) => {
            if (!student.today) return false;

            const admissionDate = new Date(student.today);

            return admissionDate >= twoMonthsAgo && admissionDate <= today;
          })
          .sort((a, b) => new Date(b.today) - new Date(a.today));

        setRecentAdmissions(filtered);
      })
      .catch(console.error);
  }, [schoolId, token]);

  return (
    <>
      <div className="container-fluid px-0 mt-3">
        <div className="row g-3">
          {/* ===================== Recent Admissions ====================== */}

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-header bg-white border-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold text-primary mb-0">
                    🧑 Recent Admissions
                  </h6>

                  <button className="btn btn-sm btn-outline-primary">
                    View All
                  </button>
                </div>
              </div>

              <div className="card-body p-2">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Student</th>

                      <th>Class</th>

                      <th>Date</th>
                    </tr>
                  </thead>
                </table>

                <Slider {...tableSlider}>
                  {recentAdmissions.map((a) => (
                    <div key={a.admissionId}>
                      <table className="table align-middle mb-0">
                        <tbody>
                          <tr>
                            <td width="55">
                              <img
                                src={`https://ui-avatars.com/api/?background=2563eb&color=fff&name=${a.firstName}+${a.lastName}`}
                                className="rounded-circle"
                                width="40"
                                height="40"
                              />
                            </td>

                            <td>
                              <strong>
                                {a.firstName} {a.lastName}
                              </strong>

                              <br />

                              <small className="text-muted">
                                {a.admissionNumber}
                              </small>
                            </td>

                            <td>
                              <span className="badge bg-primary">
                                {a.studentClass === "NURSERY"
                                  ? "NUR"
                                  : a.studentClass}
                              </span>
                            </td>

                            <td>
                              <small>
                                {new Date(a.today).toLocaleDateString("en-IN")}
                              </small>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* ===================== Fee Pending ====================== */}

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-header bg-white border-0">
                <div className="d-flex justify-content-between">
                  <h6 className="fw-bold text-danger">💰 Fee Pending</h6>

                  <button className="btn btn-sm btn-outline-danger">
                    View All
                  </button>
                </div>
              </div>

              <div className="card-body p-2">
                <Slider {...tableSlider}>
                  {pendingFee.map((a) => (
                    <div key={a.id}>
                      <table className="table align-middle">
                        <tbody>
                          <tr>
                            <td width="55">
                              <img
                                src={`https://ui-avatars.com/api/?background=ef4444&color=fff&name=${a.studentName}`}
                                className="rounded-circle"
                                width="40"
                                height="40"
                              />
                            </td>

                            <td>
                              <strong>{a.studentName}</strong>

                              <br />

                              <small>{a.admissionNumber}</small>
                            </td>

                            <td>
                              <span className="badge bg-info">
                                {a.studentClass === "NURSERY"
                                  ? "NUR"
                                  : a.studentClass}
                              </span>
                            </td>

                            <td>
                              <span className="badge bg-danger">
                                ₹ {a.amount}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* ===================== Today's Events ====================== */}

          <div className="col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-header bg-white border-0">
                <div className="d-flex justify-content-between">
                  <h6 className="fw-bold text-success">📅 Today's Events</h6>

                  <button className="btn btn-sm btn-outline-success">
                    View All
                  </button>
                </div>
              </div>

              <div className="card-body">
                <div className="border-start border-4 border-primary ps-3 mb-4">
                  <span className="badge bg-primary">10:00 AM</span>

                  <h6 className="mt-2">Cricket Match</h6>

                  <small>School Ground</small>
                </div>

                <div className="border-start border-4 border-success ps-3 mb-4">
                  <span className="badge bg-success">01:00 PM</span>

                  <h6 className="mt-2">Cultural Program</h6>

                  <small>Auditorium</small>
                </div>

                <div className="border-start border-4 border-warning ps-3">
                  <span className="badge bg-warning text-dark">03:00 PM</span>

                  <h6 className="mt-2">Quiz Competition</h6>

                  <small>Smart Class</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmissionFeeToday;
