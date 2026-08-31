
import React from "react";
import {
  FaListUl,
  FaSchool,
  FaUserTie,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaUserPlus,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaFileInvoiceDollar,
} from "react-icons/fa";

import { MdViewInAr } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";

import useDashboardData from "../../hooks/UserDashBoardData";

const Card = () => {
  const {
    schools = [],
    superadmins = [],
    modules = [],
    mappings = [],
    totalStudents = 0,

    // Future/API data
    teacherCount = 0,
    totalStaff = 0,
    admissions = [],
    feeCollected = 0,
    attendancePercentage = 0,
    pendingFee = 0,

    loading,
  } = useDashboardData();

  /* ===============================
     MAPPING COUNTS
  =============================== */

  const totalMenuMapping = mappings.reduce(
    (total, item) => total + (item.menuMappings?.length || 0),
    0,
  );

  const totalSubMenuMapping = mappings.reduce(
    (total, item) => total + (item.subMenuMappings?.length || 0),
    0,
  );

  /* ===============================
     SCHOOL STATUS
  =============================== */

  const activeSchools = schools.filter(
    (school) => school.status === "Active",
  ).length;

  const inactiveSchools = schools.filter(
    (school) => school.status === "Inactive",
  ).length;

  /* ===============================
     SUPER ADMIN STATUS
  =============================== */

  const activeSuperadmins = superadmins.filter(
    (admin) => admin.status === "Active",
  ).length;

  const inactiveSuperadmins = superadmins.filter(
    (admin) => admin.status === "Inactive",
  ).length;

  /* ===============================
     MODULE STATUS
  =============================== */

  const activeModules = modules.filter(
    (module) => module.status === "Active",
  ).length;

  const inactiveModules = modules.filter(
    (module) => module.status === "Inactive",
  ).length;

  /* ===============================
     CURRENCY FORMAT
  =============================== */

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="container-fluid px-2 mt-3">
        <div className="row g-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={item}
            >
              <div
                className="card shadow-sm border-0"
                style={{ minHeight: "125px" }}
              >
                <div className="card-body d-flex align-items-center">
                  <div
                    className="placeholder rounded-circle"
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                  />

                  <div className="ms-3 flex-grow-1">
                    <div className="placeholder col-7 mb-2"></div>
                    <div className="placeholder col-4"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-2 mt-3">
      <div className="row g-3">

        {/* =====================================================
            1. TOTAL SCHOOLS
        ===================================================== */}

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100 shadow border-0">
            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                style={{
                  backgroundColor: "#f8d9fc",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaSchool color="purple" size={30} />
              </div>

              <div className="flex-grow-1">

                <h6 className="mb-1 text-muted">
                  Total Schools
                </h6>

                <strong className="fs-4 d-block">
                  {schools.length}
                </strong>

                <div className="d-flex gap-2 flex-wrap">

                  <small className="text-success">
                    Active: {activeSchools}
                  </small>

                  <small className="text-danger">
                    Inactive: {inactiveSchools}
                  </small>

                </div>

              </div>
            </div>
          </div>
        </div>


        {/* =====================================================
            2. TOTAL STUDENTS
        ===================================================== */}

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">

          <div className="card h-100 shadow border-0">

            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                style={{
                  backgroundColor: "#d9e8fc",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaUserGraduate
                  color="#0d6efd"
                  size={30}
                />
              </div>

              <div className="flex-grow-1">

                <h6 className="mb-1 text-muted">
                  Total Students
                </h6>

                <strong className="fs-4 d-block">
                  {Number(totalStudents).toLocaleString("en-IN")}
                </strong>

                <small className="text-muted">
                  All Schools
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            3. TOTAL TEACHERS
        ===================================================== */}

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">

          <div className="card h-100 shadow border-0">

            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                style={{
                  backgroundColor: "#d9fce5",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaChalkboardTeacher
                  color="green"
                  size={30}
                />
              </div>

              <div className="flex-grow-1">

                <h6 className="mb-1 text-muted">
                  Total Teachers
                </h6>

                <strong className="fs-4 d-block">
                  {Number(teacherCount).toLocaleString("en-IN")}
                </strong>

                <small className="text-muted">
                  All Schools
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            4. TOTAL STAFF
        ===================================================== */}

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">

          <div className="card h-100 shadow border-0">

            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                style={{
                  backgroundColor: "#fce9d9",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaUsers
                  color="orange"
                  size={30}
                />
              </div>

              <div className="flex-grow-1">

                <h6 className="mb-1 text-muted">
                  Total Staff
                </h6>

                <strong className="fs-4 d-block">
                  {Number(totalStaff).toLocaleString("en-IN")}
                </strong>

                <small className="text-muted">
                  All Schools
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            5. ADMISSIONS
        ===================================================== */}

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">

          <div className="card h-100 shadow border-0">

            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                style={{
                  backgroundColor: "#eee0fc",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaUserPlus
                  color="#8e44ad"
                  size={30}
                />
              </div>

              <div className="flex-grow-1">

                <h6 className="mb-1 text-muted">
                  Admissions
                </h6>

                <strong className="fs-4 d-block">
                  {/* {Number(totalAdmissions).toLocaleString("en-IN")} */}
                  {admissions.length} 
                </strong>

                <small className="text-muted">
                  Total Admissions
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            6. FEE COLLECTED
        ===================================================== */}

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">

          <div className="card h-100 shadow border-0">

            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                style={{
                  backgroundColor: "#d9f9fc",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaMoneyBillWave
                  color="#0dcaf0"
                  size={30}
                />
              </div>

              <div className="flex-grow-1">

                <h6 className="mb-1 text-muted">
                  Fee Collected
                </h6>

                <strong
                  className="fs-5 d-block"
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatCurrency(feeCollected)}
                </strong>

                <small className="text-success">
                  Collected
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            7. ATTENDANCE
        ===================================================== */}

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">

          <div className="card h-100 shadow border-0">

            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                style={{
                  backgroundColor: "#e0f8e7",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaCalendarCheck
                  color="#198754"
                  size={30}
                />
              </div>

              <div className="flex-grow-1">

                <h6 className="mb-1 text-muted">
                  Attendance
                </h6>

                <strong className="fs-4 d-block">
                  {Number(attendancePercentage).toFixed(1)}%
                </strong>

                <small className="text-success">
                  Overall Attendance
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            8. PENDING FEES
        ===================================================== */}

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">

          <div className="card h-100 shadow border-0">

            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                style={{
                  backgroundColor: "#fce0e0",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaFileInvoiceDollar
                  color="#dc3545"
                  size={30}
                />
              </div>

              <div className="flex-grow-1">

                <h6 className="mb-1 text-muted">
                  Pending Fees
                </h6>

                <strong
                  className="fs-5 d-block"
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatCurrency(pendingFee)}
                </strong>

                <small className="text-danger">
                  Outstanding
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            9. SUPER ADMINS
        ===================================================== */}

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">

          <div className="card h-100 shadow border-0">

            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                style={{
                  backgroundColor: "#d9e0fc",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <RiShieldUserFill
                  color="blue"
                  size={30}
                />
              </div>

              <div className="flex-grow-1">

                <h6 className="mb-1 text-muted">
                  Super Admins
                </h6>

                <strong className="fs-4 d-block">
                  {superadmins.length}
                </strong>

                <div className="d-flex gap-2 flex-wrap">

                  <small className="text-success">
                    Active: {activeSuperadmins}
                  </small>

                  <small className="text-danger">
                    Inactive: {inactiveSuperadmins}
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            10. MODULES
        ===================================================== */}

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">

          <div className="card h-100 shadow border-0">

            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                style={{
                  backgroundColor: "#d9fce5",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <MdViewInAr
                  color="green"
                  size={32}
                />
              </div>

              <div className="flex-grow-1">

                <h6 className="mb-1 text-muted">
                  Total Modules
                </h6>

                <strong className="fs-4 d-block">
                  {modules.length}
                </strong>

                <div className="d-flex gap-2 flex-wrap">

                  <small className="text-success">
                    Active: {activeModules}
                  </small>

                  <small className="text-danger">
                    Inactive: {inactiveModules}
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            11. MENUS
        ===================================================== */}

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">

          <div className="card h-100 shadow border-0">

            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                style={{
                  backgroundColor: "#fce9d9",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaListUl
                  color="orange"
                  size={30}
                />
              </div>

              <div className="flex-grow-1">

                <h6 className="mb-1 text-muted">
                  Total Menus
                </h6>

                <strong className="fs-4 d-block">
                  {totalMenuMapping}
                </strong>

                <small className="text-muted">
                  Submenus: {totalSubMenuMapping}
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            12. TOTAL USERS
        ===================================================== */}

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">

          <div className="card h-100 shadow border-0">

            <div className="card-body d-flex align-items-center">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                style={{
                  backgroundColor: "#d9f9fc",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaUserTie
                  color="skyblue"
                  size={30}
                />
              </div>

              <div className="flex-grow-1">

                <h6 className="mb-1 text-muted">
                  Total Users
                </h6>

                <strong className="fs-4 d-block">
                  {(
                    Number(superadmins.length) +
                    Number(totalStudents) +
                    Number(teacherCount) +
                    Number(totalStaff)
                  ).toLocaleString("en-IN")}
                </strong>

                <small className="text-muted">
                  All System Users
                </small>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Card;