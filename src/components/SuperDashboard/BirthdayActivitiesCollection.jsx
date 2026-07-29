import React from 'react'
import FeeCollectionBarChart from '../../pages/Dashboard/Charts/FeeCollectionBarChart'
import FeeCollectionDonut from '../../pages/Dashboard/Charts/FeeCollectionDonut'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BirthdayActivitiesCollection = () => {
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
  return (
    <>

     <div className="container-fluid px-0 mt-3">
        <div className="row g-3">
          {/* ================= Birthday ================= */}

          <div className="col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-header bg-white border-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold text-warning mb-0">
                    🎂 Today's Birthdays
                  </h6>

                  <button className="btn btn-sm btn-outline-warning">
                    View All
                  </button>
                </div>
              </div>

              <div className="card-body">
                <Slider {...tableSlider}>
                  <div>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://ui-avatars.com/api/?background=f59e0b&color=fff&name=Rahul"
                        className="rounded-circle"
                        width="45"
                        height="45"
                      />

                      <div className="ms-3">
                        <h6 className="mb-0">Rahul Kumar</h6>

                        <small>Class VIII</small>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://ui-avatars.com/api/?background=2563eb&color=fff&name=Priya"
                        className="rounded-circle"
                        width="45"
                        height="45"
                      />

                      <div className="ms-3">
                        <h6 className="mb-0">Priya Singh</h6>

                        <small>Class V</small>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>

          {/* ================= Activities ================= */}

          <div className="col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-header bg-white border-0">
                <h6 className="fw-bold text-primary">🔔 Recent Activities</h6>
              </div>

              <div className="card-body">
                <div className="border-start border-4 border-success ps-3 mb-4">
                  <strong>Admission Completed</strong>

                  <br />

                  <small>2 Minutes Ago</small>
                </div>

                <div className="border-start border-4 border-primary ps-3 mb-4">
                  <strong>Fee Received</strong>

                  <br />

                  <small>15 Minutes Ago</small>
                </div>

                <div className="border-start border-4 border-danger ps-3">
                  <strong>Attendance Updated</strong>

                  <br />

                  <small>1 Hour Ago</small>
                </div>
              </div>
            </div>
          </div>

          {/* ================= Fee Collection ================= */}

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-header bg-white border-0">
                <h6 className="fw-bold text-success">
                  💰 Fee Collection (This Month)
                </h6>
              </div>

              <div className="card-body">
                <div className="row h-100">
                  <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <FeeCollectionDonut />
                  </div>

                  <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <FeeCollectionBarChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    
    </>
  )
}

export default BirthdayActivitiesCollection