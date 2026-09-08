import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUsers, FaUserShield } from "react-icons/fa";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Schools = () => {
  const navigate = useNavigate();

  const [studentCount, setStudentCount] = useState(0);

useEffect(() => {
  axios
    .get("http://localhost:8080/api/students/count", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => setStudentCount(res.data))
    .catch((err) => console.log(err));
}, []);


  return (
    <div className="row g-3 align-items-stretch mt-1">
      {/* Total Students */}
      <div className="col-md-3">
        <div className="card stat-card blue-card h-100">
          <div className="card-body d-flex align-items-center">
            <div className="icon-circle me-3">🎓</div>
            <div>
              <h4 className="mb-0">{studentCount}</h4>
              <small>Total Students</small>
            </div>
          </div>
          <div className="card-footer text-muted small ">
            123 Main Street, Springfield, USA
          </div>
        </div>
      </div>

      {/* Super Admin */}
      <div className="col-md-3">
        <div className="card stat-card green-card h-100">
          <div className="card-body">
            <div className="d-flex align-items-center mb-2">
              <img
                src="https://i.pravatar.cc/50"
                className="rounded-circle me-2"
                alt="admin"
              />
              <div>
                <h6 className="mb-0">Ramesh Sharma</h6>
                <small>Super Admin</small>
              </div>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <small>ramesh.sharma@gyschool.com</small>
            {/* <span className="badge bg-success">📞 +1 123 456 7890</span> */}
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card stat-card white-card h-100">
          <div className="card-body d-flex justify-content-between align-items-center text-center">
            {/* Parents */}
            <div className="flex-fill">
              <h5 className="mb-0">
                <FaUsers className="me-2" size={35} />
                380
              </h5>
              <small className="text-muted">Parents</small>
            </div>

            {/* Divider */}
            <div className="vr mx-2"></div>

            {/* Staff */}
            <div className="flex-fill">
              <h5 className="mb-0">
                <FaUserShield className="me-2" size={35} />
                16
              </h5>
              <small className="text-muted">Staff</small>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="col-md-3">
        <div className="d-flex flex-column gap-3 h-100">
          <button className="btn btn-success w-100 h-100">+ Add User</button>
          <button className="btn btn-outline-secondary w-100">
            🔑 Reset Password
          </button>
        </div>
      </div>

      <div className="p-3 bg-white shadow rounded">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div style={{ minWidth: "180px", flex: 1 }}>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
            </div>
          </div>

          <div style={{ minWidth: "180px" }}>
            <select className="form-select">
              <option>Select Schools</option>
              <option>All Schools</option>
            </select>
          </div>

          <div style={{ minWidth: "150px" }}>
            <select className="form-select">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <button
            className="btn btn-success"
            onClick={() => navigate("/add/schools")}
          >
            Create Schools
          </button>

          <button className="btn btn-outline-success d-flex align-items-center">
            <HiOutlineArrowDownTray size={20} className="me-2" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default Schools;
