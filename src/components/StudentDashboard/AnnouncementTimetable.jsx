import React from "react";

const AnnouncementTimetable = () => {
  return (
    <div className="container-fluid px-0 mt-3">
      <div className="row g-3">
        {/* ================= ANNOUNCEMENT ================= */}
        <div className="col-lg-6">
          <div className="card border-0 shadow rounded-4 h-100">
            <div className="card-header bg-white border-0 pt-3">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">📢 Announcement</h6>

                <button className="btn btn-sm btn-outline-primary">
                  View All
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="border rounded-3 p-1 mb-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-semibold mb-1">Parent-Teacher Meeting</h6>

                    <p className="text-muted small mb-1">
                      Parent-Teacher meeting will be conducted this Saturday.
                    </p>

                    <small className="text-muted">📅 24 August 2026</small>
                  </div>

                  <span className="badge bg-primary">Important</span>
                </div>
              </div>

              <div className="border rounded-3 p-1 mb-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-semibold mb-1">
                      Independence Day Holiday
                    </h6>

                    <p className="text-muted small mb-1">
                      School will remain closed on the occasion of Independence
                      Day.
                    </p>

                    <small className="text-muted">📅 15 August 2026</small>
                  </div>

                  <span className="badge bg-warning text-dark">Holiday</span>
                </div>
              </div>

              <div className="border rounded-3 p-1">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-semibold mb-1">Unit Test Schedule</h6>

                    <p className="text-muted small mb-1">
                      Unit test schedule has been published for all classes.
                    </p>

                    <small className="text-muted">📅 20 August 2026</small>
                  </div>

                  <span className="badge bg-success">New</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TIMETABLE ================= */}
        <div className="col-lg-6">
          <div className="card border-0 shadow rounded-4 h-100">
            <div className="card-header bg-white border-0 pt-3">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">🕐 Today's Timetable</h6>

                <button className="btn btn-sm btn-outline-primary">
                  View Full
                </button>
              </div>
            </div>

            <div className="card-body">
              <div
                className="table-responsive"
                style={{
                  maxHeight: "320px",
                  overflowY: "auto",
                }}
              >
                <table className="table table-bordered table-hover align-middle mb-0">
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
                      <td>08:30 - 09:15</td>
                      <td>6A</td>
                      <td>Mathematics</td>
                      <td>R-201</td>
                    </tr>

                    <tr>
                      <td>2</td>
                      <td>09:15 - 10:00</td>
                      <td>7B</td>
                      <td>Science</td>
                      <td>R-203</td>
                    </tr>

                    <tr>
                      <td>3</td>
                      <td>10:00 - 10:45</td>
                      <td>8A</td>
                      <td>English</td>
                      <td>R-202</td>
                    </tr>

                    <tr className="table-warning">
                      <td>4</td>
                      <td>10:45 - 11:05</td>
                      <td>—</td>
                      <td>
                        <strong>Break</strong>
                      </td>
                      <td>—</td>
                    </tr>

                    <tr>
                      <td>5</td>
                      <td>11:05 - 11:50</td>
                      <td>6A</td>
                      <td>Social Science</td>
                      <td>R-201</td>
                    </tr>

                    <tr>
                      <td>6</td>
                      <td>11:50 - 12:35</td>
                      <td>7B</td>
                      <td>Computer</td>
                      <td>Lab-1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTimetable;
