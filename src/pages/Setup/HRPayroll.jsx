
import React, { useState } from "react";
import {
  LuUsers,
  LuUserPlus,
  LuBuilding2,
  LuBriefcaseBusiness,
  LuCalendarDays,
  LuClock3,
  LuWalletCards,
  LuFileText,
  LuCircleDollarSign,
  LuSettings2,
  LuChevronRight,
  LuSearch,
} from "react-icons/lu";

const HRPayroll = () => {
  const [search, setSearch] = useState("");

  const modules = [
    {
      title: "Employees",
      description: "Manage all school employees and staff",
      icon: <LuUsers size={25} />,
      count: "Manage",
      path: "/setup/hr_payroll/employees",
      bg: "#eff6ff",
      color: "#2563eb",
    },
    {
      title: "Add Employee",
      description: "Create a new employee profile",
      icon: <LuUserPlus size={25} />,
      count: "Create",
      path: "/setup/hr-payroll/employees/add",
      bg: "#ecfdf5",
      color: "#059669",
    },
    {
      title: "Departments",
      description: "Manage employee departments",
      icon: <LuBuilding2 size={25} />,
      count: "Setup",
      path: "/setup/hr-payroll/departments",
      bg: "#fff7ed",
      color: "#ea580c",
    },
    {
      title: "Designations",
      description: "Manage staff designations and positions",
      icon: <LuBriefcaseBusiness size={25} />,
      count: "Setup",
      path: "/setup/hr-payroll/designations",
      bg: "#f5f3ff",
      color: "#7c3aed",
    },
    {
      title: "Staff Attendance",
      description: "Track daily employee attendance",
      icon: <LuCalendarDays size={25} />,
      count: "Attendance",
      path: "/setup/hr-payroll/attendance",
      bg: "#ecfeff",
      color: "#0891b2",
    },
    {
      title: "Staff Leave",
      description: "Manage employee leave and approvals",
      icon: <LuClock3 size={25} />,
      count: "Leave",
      path: "/setup/hr-payroll/leave",
      bg: "#fef2f2",
      color: "#dc2626",
    },
    {
      title: "Salary Structure",
      description: "Configure salary components and deductions",
      icon: <LuWalletCards size={25} />,
      count: "Configure",
      path: "/setup/hr-payroll/salary-structure",
      bg: "#f0fdf4",
      color: "#16a34a",
    },
    {
      title: "Payroll",
      description: "Process monthly employee payroll",
      icon: <LuCircleDollarSign size={25} />,
      count: "Process",
      path: "/setup/hr-payroll/payroll",
      bg: "#eff6ff",
      color: "#1d4ed8",
    },
    {
      title: "Payslips",
      description: "Generate and view employee payslips",
      icon: <LuFileText size={25} />,
      count: "Reports",
      path: "/setup/hr-payroll/payslips",
      bg: "#fdf4ff",
      color: "#a21caf",
    },
    {
      title: "Payroll Settings",
      description: "Configure payroll rules and preferences",
      icon: <LuSettings2 size={25} />,
      count: "Settings",
      path: "/setup/hr-payroll/settings",
      bg: "#f8fafc",
      color: "#475569",
    },
  ];

  const filteredModules = modules.filter((item) =>
    `${item.title} ${item.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      {/* ================= PAGE HEADER ================= */}
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
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                    flexShrink: 0,
                  }}
                >
                  <LuUsers size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    HR & Payroll
                  </h5>

                  <div className="text-muted small">
                    Setup &nbsp;/&nbsp; HR & Payroll
                  </div>
                </div>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                }}
              >
                <LuWalletCards className="me-1" />
                Human Resources
              </span>
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
              Home &nbsp;›&nbsp; Setup &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                HR & Payroll
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="mx-2 mb-4">
        <div
          className="bg-white rounded-4 shadow p-3 p-md-4"
          style={{
            border: "1px solid #edf2f7",
          }}
        >
          {/* ================= TITLE ================= */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h5
                className="mb-1 fw-bold"
                style={{ color: "#1e3a8a" }}
              >
                Human Resources & Payroll
              </h5>

              <small className="text-muted">
                Manage employees, attendance, leave and payroll
                operations
              </small>
            </div>

            <div
              className="position-relative"
              style={{ minWidth: "250px" }}
            >
              <LuSearch
                size={17}
                style={{
                  position: "absolute",
                  left: "13px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                }}
              />

              <input
                type="search"
                className="form-control"
                placeholder="Search HR & Payroll..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  paddingLeft: "38px",
                  borderRadius: "10px",
                  border: "1px solid #dbe3ef",
                }}
              />
            </div>
          </div>

          {/* ================= QUICK SUMMARY ================= */}
          <div className="row g-3 mb-4">
            <div className="col-xl-3 col-md-6">
              <div
                className="rounded-4 p-3"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  boxShadow:
                    "0 8px 20px rgba(37,99,235,.16)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small style={{ opacity: 0.85 }}>
                      Employees
                    </small>
                    <h3 className="fw-bold mb-0 mt-1">
                      0
                    </h3>
                    <small style={{ opacity: 0.75 }}>
                      Total staff
                    </small>
                  </div>

                  <LuUsers size={28} />
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div
                className="rounded-4 p-3"
                style={{
                  background:
                    "linear-gradient(135deg,#059669,#10b981)",
                  color: "#fff",
                  boxShadow:
                    "0 8px 20px rgba(5,150,105,.16)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small style={{ opacity: 0.85 }}>
                      Present Today
                    </small>
                    <h3 className="fw-bold mb-0 mt-1">
                      0
                    </h3>
                    <small style={{ opacity: 0.75 }}>
                      Staff attendance
                    </small>
                  </div>

                  <LuCalendarDays size={28} />
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div
                className="rounded-4 p-3"
                style={{
                  background:
                    "linear-gradient(135deg,#d97706,#f59e0b)",
                  color: "#fff",
                  boxShadow:
                    "0 8px 20px rgba(245,158,11,.16)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small style={{ opacity: 0.9 }}>
                      On Leave
                    </small>
                    <h3 className="fw-bold mb-0 mt-1">
                      0
                    </h3>
                    <small style={{ opacity: 0.8 }}>
                      Today
                    </small>
                  </div>

                  <LuClock3 size={28} />
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div
                className="rounded-4 p-3"
                style={{
                  background:
                    "linear-gradient(135deg,#7c3aed,#8b5cf6)",
                  color: "#fff",
                  boxShadow:
                    "0 8px 20px rgba(124,58,237,.16)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small style={{ opacity: 0.9 }}>
                      Payroll
                    </small>
                    <h3 className="fw-bold mb-0 mt-1">
                      —
                    </h3>
                    <small style={{ opacity: 0.8 }}>
                      Current month
                    </small>
                  </div>

                  <LuCircleDollarSign size={28} />
                </div>
              </div>
            </div>
          </div>

          {/* ================= SECTION TITLE ================= */}
          <div className="mb-3">
            <h6 className="fw-bold mb-1 text-dark">
              HR & Payroll Management
            </h6>

            <small className="text-muted">
              Select a section to manage your school's
              employee operations
            </small>
          </div>

          {/* ================= MODULE CARDS ================= */}
          <div className="row g-3">
            {filteredModules.map((item) => (
              <div
                className="col-xl-4 col-lg-6 col-md-6"
                key={item.title}
              >
                <div
                  className="h-100 rounded-4 p-3"
                  role="button"
                  onClick={() =>
                    (window.location.href = item.path)
                  }
                  style={{
                    border: "1px solid #e5e7eb",
                    background: "#fff",
                    transition:
                      "all .2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(15,23,42,.08)";
                    e.currentTarget.style.borderColor =
                      "#bfdbfe";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "none";
                    e.currentTarget.style.borderColor =
                      "#e5e7eb";
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-4"
                      style={{
                        width: "52px",
                        height: "52px",
                        background: item.bg,
                        color: item.color,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>

                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center gap-2">
                        <h6 className="fw-bold mb-1 text-dark">
                          {item.title}
                        </h6>

                        <LuChevronRight
                          size={18}
                          color="#94a3b8"
                        />
                      </div>

                      <p
                        className="text-muted mb-2"
                        style={{
                          fontSize: "13px",
                          lineHeight: "1.4",
                        }}
                      >
                        {item.description}
                      </p>

                      <span
                        className="badge rounded-pill"
                        style={{
                          background: item.bg,
                          color: item.color,
                          border:
                            `1px solid ${item.color}22`,
                          fontSize: "11px",
                        }}
                      >
                        {item.count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= EMPTY ================= */}
          {filteredModules.length === 0 && (
            <div className="text-center py-5">
              <div
                className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                style={{
                  width: "60px",
                  height: "60px",
                  background: "#f1f5f9",
                  color: "#94a3b8",
                }}
              >
                <LuSearch size={25} />
              </div>

              <h6 className="text-muted">
                No HR & Payroll section found
              </h6>

              <small className="text-secondary">
                Try searching with another keyword.
              </small>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HRPayroll;

