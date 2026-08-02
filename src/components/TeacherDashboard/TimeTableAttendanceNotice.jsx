import React, { useEffect, useState } from "react";
import AttendanceChart from "../../pages/Dashboard/Charts/AttendanceChart";
import ClassWiseStudentCharts from "../../pages/Dashboard/Charts/ClassWiseStudentCharts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaBullhorn } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";

const TimeTableAttendanceNotice = () => {
  

 

  

 

  return (
    <>
      <div className="container-fluid px-0 mt-3">
        <div className="row g-3">
          {/* ================= LEFT SECTION ================= */}

          <div className="col-lg-8">
            <div className="row g-3">
              {/* Student Class Wise */}

              <div className="col-md-6">
                <div
                  className="card border-0 shadow-sm rounded-4 h-100"
                  style={{ maxHeight: "600px" }}
                >
                  <div className="card-header bg-white border-0 pt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="fw-bold mb-0">📊 Today's Timetable</h6>

                      <select
                        className="form-select form-select-sm"
                        style={{ width: "120px" }}
                       
                      >
                        <option value="">View Full</option>
                      </select>
                    </div>
                  </div>

                  <div className="card-body">
                    <div
                      className="table-responsive"
                      style={{
                        height: "250px",
                        overflow: "auto",
                      }}
                    >
                      <table className="table table-bordered table-hovered">
                        <colgroup>
                          <col style={{ width: "10%" }} />
                          <col style={{ width: "20%" }} />
                          <col style={{ width: "10%" }} />
                          <col style={{ width: "20%" }} />
                          <col style={{ width: "10%" }} />
                        </colgroup>

                        <thead className="table-primary">
                          <tr>
                            <th>Period</th>
                            <th>Time</th>
                            <th>Class</th>
                            <th>Subject</th>
                            <th>Room</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>08:30 AM - 09:15 AM</td>
                            <td>6A</td>
                            <td>Mathematics</td>
                            <td>R-201</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>09:15 AM - 10:00 AM</td>
                            <td>7B</td>
                            <td>Mathematics</td>
                            <td>R-203</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>10:20 AM - 11:05 AM</td>
                            <td>8A</td>
                            <td>Mathematics</td>
                            <td>R-202</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>11:05 AM - 11:25 AM</td>
                            <td>Break</td>
                            <td>-</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>11:20 AM - 12:05 PM</td>
                            <td>6A</td>
                            <td>Mathematics</td>
                            <td>R-201</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance */}

              <div className="col-md-6">
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-header bg-white border-0 pt-3">
                    <h6 className="fw-bold mb-0">📅 Attendance Overview</h6>
                  </div>

                  <div className="card-body" style={{ minHeight: "300px" }}>
                    <AttendanceChart />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= NOTICE BOARD ================= */}

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-header bg-white border-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold text-primary mb-0">
                    📢 Quick Actions
                  </h6>
                </div>
              </div>

              <div className="card-body ">
                <div className="row gap-2">
                  <div className="col-12 col-sm-6 col-lg alert alert-success text-center align-items-center">
                    <BsFillCalendar2CheckFill size={20} />
                    <h6>Mark Attendance</h6>
                  </div>
                  <div className="col-12 col-md-6 col-lg alert alert-info text-center align-items-center">
                    <IoBookOutline size={20} />
                    <h6>Add HomeWork</h6>
                  </div>
                  <div className="col-12 col-md-6 col-lg alert alert-primary text-center align-items-center">
                    <MdOutlineAssignment size={20} />
                    <h6>Create Assignment</h6>
                  </div>
                </div>

                <div className="row gap-2">
                  <div className="col-12 col-sm-6 col-lg alert alert-warning text-center align-items-center">
                    <BiEdit size={20} />
                    <h6>Enter Marks</h6>
                  </div>
                  <div className="col-12 col-md-6 col-lg alert alert-danger text-center align-items-center">
                    <FaBullhorn size={20} className="color-red" />
                    <h6>Notice To Class</h6>
                  </div>
                  <div className="col-12 col-md-6 col-lg alert alert-info text-center align-items-center">
                    <HiOutlineDocumentReport size={20} />
                    <h6>View Reports</h6>
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

export default TimeTableAttendanceNotice;
