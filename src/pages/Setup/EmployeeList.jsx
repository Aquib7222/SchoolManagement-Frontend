
import React, { useMemo, useState } from "react";
import {
  LuUsers,
  LuUserPlus,
  LuSearch,
  LuDownload,
  LuEye,
  LuPencil,
  LuTrash2,
  LuChevronLeft,
  LuChevronRight,
  LuBriefcaseBusiness,
  LuCircleCheck,
  LuClock3,
  LuBuilding2,
} from "react-icons/lu";
import { MdOutlineBadge } from "react-icons/md";
import * as XLSX from "xlsx";

const ITEMS_PER_PAGE = 5;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      employeeCode: "EMP0001",
      firstName: "Rahul",
      middleName: "",
      lastName: "Kumar",
      email: "rahul.kumar@school.com",
      phone: "9876543210",
      department: "Teaching",
      designation: "Senior Teacher",
      joiningDate: "2025-04-01",
      employmentType: "Permanent",
      status: "ACTIVE",
    },
    {
      id: 2,
      employeeCode: "EMP0002",
      firstName: "Priya",
      middleName: "",
      lastName: "Sharma",
      email: "priya.sharma@school.com",
      phone: "9876543211",
      department: "Teaching",
      designation: "Primary Teacher",
      joiningDate: "2025-04-05",
      employmentType: "Permanent",
      status: "ACTIVE",
    },
    {
      id: 3,
      employeeCode: "EMP0003",
      firstName: "Amit",
      middleName: "",
      lastName: "Singh",
      email: "amit.singh@school.com",
      phone: "9876543212",
      department: "Administration",
      designation: "Office Assistant",
      joiningDate: "2025-04-10",
      employmentType: "Permanent",
      status: "ACTIVE",
    },
    {
      id: 4,
      employeeCode: "EMP0004",
      firstName: "Neha",
      middleName: "",
      lastName: "Verma",
      email: "neha.verma@school.com",
      phone: "9876543213",
      department: "Accounts",
      designation: "Accountant",
      joiningDate: "2025-04-15",
      employmentType: "Contract",
      status: "ACTIVE",
    },
    {
      id: 5,
      employeeCode: "EMP0005",
      firstName: "Sanjay",
      middleName: "",
      lastName: "Yadav",
      email: "sanjay.yadav@school.com",
      phone: "9876543214",
      department: "Transport",
      designation: "Driver",
      joiningDate: "2025-05-01",
      employmentType: "Contract",
      status: "ACTIVE",
    },
    {
      id: 6,
      employeeCode: "EMP0006",
      firstName: "Pooja",
      middleName: "",
      lastName: "Gupta",
      email: "pooja.gupta@school.com",
      phone: "9876543215",
      department: "Teaching",
      designation: "TGT Teacher",
      joiningDate: "2025-06-01",
      employmentType: "Permanent",
      status: "ACTIVE",
    },
    {
      id: 7,
      employeeCode: "EMP0007",
      firstName: "Vikas",
      middleName: "",
      lastName: "Raj",
      email: "vikas.raj@school.com",
      phone: "9876543216",
      department: "Security",
      designation: "Security Guard",
      joiningDate: "2025-06-15",
      employmentType: "Contract",
      status: "INACTIVE",
    },
  ]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= EMPLOYEE NAME ================= */

  const getEmployeeName = (employee) => {
    return `${employee.firstName || ""} ${
      employee.middleName || ""
    } ${employee.lastName || ""}`
      .replace(/\s+/g, " ")
      .trim();
  };

  /* ================= FILTER ================= */

  const filteredEmployees = useMemo(() => {
    let data = [...employees];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter((employee) => {
        const name = getEmployeeName(employee).toLowerCase();

        return (
          name.includes(keyword) ||
          employee.employeeCode
            ?.toLowerCase()
            .includes(keyword) ||
          employee.email
            ?.toLowerCase()
            .includes(keyword) ||
          employee.phone?.includes(keyword)
        );
      });
    }

    if (department) {
      data = data.filter(
        (employee) => employee.department === department
      );
    }

    if (status) {
      data = data.filter(
        (employee) => employee.status === status
      );
    }

    if (employmentType) {
      data = data.filter(
        (employee) =>
          employee.employmentType === employmentType
      );
    }

    return data;
  }, [
    employees,
    search,
    department,
    status,
    employmentType,
  ]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredEmployees.length / ITEMS_PER_PAGE
    )
  );

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ================= SUMMARY ================= */

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "ACTIVE"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "INACTIVE"
  ).length;

  const teachingEmployees = employees.filter(
    (employee) => employee.department === "Teaching"
  ).length;

  /* ================= EXPORT ================= */

  const exportToExcel = () => {
    if (!filteredEmployees.length) {
      alert("No employee data available.");
      return;
    }

    const data = filteredEmployees.map(
      (employee, index) => ({
        "S.No": index + 1,
        "Employee Code":
          employee.employeeCode || "-",
        "Employee Name":
          getEmployeeName(employee) || "-",
        Email: employee.email || "-",
        Phone: employee.phone || "-",
        Department:
          employee.department || "-",
        Designation:
          employee.designation || "-",
        "Employment Type":
          employee.employmentType || "-",
        "Joining Date":
          employee.joiningDate || "-",
        Status: employee.status || "-",
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Employees"
    );

    XLSX.writeFile(
      workbook,
      "Employee_List.xlsx"
    );
  };

  /* ================= DELETE ================= */

  const handleDelete = (employee) => {
    const name = getEmployeeName(employee);

    if (
      !window.confirm(
        `Are you sure you want to remove ${name}?`
      )
    ) {
      return;
    }

    setEmployees((prev) =>
      prev.filter(
        (item) => item.id !== employee.id
      )
    );
  };

  /* ================= PAGE CHANGE ================= */

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  return (
    <div className="container-fluid px-2 py-2">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-3">
        <div
          className="rounded-4 shadow-sm overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
            border: "1px solid #dbeafe",
          }}
        >
          <div className="p-3 p-md-4">

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

              <div className="d-flex align-items-center gap-3">

                {/* ICON */}

                <div
                  className="d-flex align-items-center justify-content-center rounded-4"
                  style={{
                    width: "54px",
                    height: "54px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.20)",
                    flexShrink: 0,
                  }}
                >
                  <LuUsers size={27} />
                </div>

                {/* TITLE */}

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Employee List
                  </h5>

                  <div className="text-muted small">
                    HR & Payroll
                    &nbsp;/&nbsp;
                    Employees
                  </div>
                </div>
              </div>

              {/* ACTION */}

              <button
                type="button"
                className="btn d-flex align-items-center gap-2 text-white"
                onClick={() => {
                  // navigate("/setup/hr-payroll/employees/add")
                }}
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  border: "none",
                  borderRadius: "10px",
                  padding: "9px 16px",
                  boxShadow:
                    "0 6px 15px rgba(37,99,235,.18)",
                }}
              >
                <LuUserPlus size={17} />
                Add Employee
              </button>
            </div>
          </div>

          {/* BREADCRUMB */}

          <div
            className="px-4 py-2"
            style={{
              backgroundColor:
                "rgba(239,246,255,.75)",
              borderTop:
                "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home
              &nbsp;›&nbsp;
              Setup
              &nbsp;›&nbsp;
              HR & Payroll
              &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Employees
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="row g-3 mb-4">

        {/* TOTAL */}

        <div className="col-xl-3 col-md-6">
          <div
            className="h-100 rounded-4 p-3 position-relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#3b82f6,#60a5fa)",
              color: "#fff",
              boxShadow:
                "0 10px 25px rgba(37,99,235,.18)",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                background:
                  "rgba(255,255,255,.08)",
                right: "-35px",
                top: "-45px",
              }}
            />

            <div className="d-flex justify-content-between align-items-center position-relative">

              <div>
                <small style={{ opacity: .85 }}>
                  Total Employees
                </small>

                <h3 className="fw-bold mb-0 mt-1">
                  {totalEmployees}
                </h3>

                <small style={{ opacity: .75 }}>
                  Registered staff
                </small>
              </div>

              <div
                className="d-flex align-items-center justify-content-center rounded-4"
                style={{
                  width: "52px",
                  height: "52px",
                  background:
                    "rgba(255,255,255,.16)",
                }}
              >
                <LuUsers size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVE */}

        <div className="col-xl-3 col-md-6">
          <div
            className="h-100 rounded-4 p-3 position-relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg,#059669,#10b981,#34d399)",
              color: "#fff",
              boxShadow:
                "0 10px 25px rgba(5,150,105,.18)",
            }}
          >
            <div
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <small style={{ opacity: .85 }}>
                  Active Employees
                </small>

                <h3 className="fw-bold mb-0 mt-1">
                  {activeEmployees}
                </h3>

                <small style={{ opacity: .75 }}>
                  Currently working
                </small>
              </div>

              <div
                className="d-flex align-items-center justify-content-center rounded-4"
                style={{
                  width: "52px",
                  height: "52px",
                  background:
                    "rgba(255,255,255,.16)",
                }}
              >
                <LuCircleCheck size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* INACTIVE */}

        <div className="col-xl-3 col-md-6">
          <div
            className="h-100 rounded-4 p-3 position-relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg,#dc2626,#ef4444,#f87171)",
              color: "#fff",
              boxShadow:
                "0 10px 25px rgba(239,68,68,.18)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">

              <div>
                <small style={{ opacity: .85 }}>
                  Inactive
                </small>

                <h3 className="fw-bold mb-0 mt-1">
                  {inactiveEmployees}
                </h3>

                <small style={{ opacity: .75 }}>
                  Former / inactive
                </small>
              </div>

              <div
                className="d-flex align-items-center justify-content-center rounded-4"
                style={{
                  width: "52px",
                  height: "52px",
                  background:
                    "rgba(255,255,255,.16)",
                }}
              >
                <LuClock3 size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* TEACHING */}

        <div className="col-xl-3 col-md-6">
          <div
            className="h-100 rounded-4 p-3 position-relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg,#7c3aed,#8b5cf6,#a78bfa)",
              color: "#fff",
              boxShadow:
                "0 10px 25px rgba(124,58,237,.18)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">

              <div>
                <small style={{ opacity: .85 }}>
                  Teaching Staff
                </small>

                <h3 className="fw-bold mb-0 mt-1">
                  {teachingEmployees}
                </h3>

                <small style={{ opacity: .75 }}>
                  Teaching employees
                </small>
              </div>

              <div
                className="d-flex align-items-center justify-content-center rounded-4"
                style={{
                  width: "52px",
                  height: "52px",
                  background:
                    "rgba(255,255,255,.16)",
                }}
              >
                <LuBriefcaseBusiness size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div
        className="bg-white rounded-4 shadow-sm p-3 p-md-4"
        style={{
          border: "1px solid #edf2f7",
        }}
      >

        {/* TITLE + EXPORT */}

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

          <div>
            <h5
              className="mb-1 fw-bold"
              style={{ color: "#1e3a8a" }}
            >
              Employees
            </h5>

            <small className="text-muted">
              Manage all teaching and non-teaching staff
            </small>
          </div>

          <button
            type="button"
            className="btn d-flex align-items-center gap-2 text-white"
            onClick={exportToExcel}
            style={{
              background:
                "linear-gradient(135deg,#198754,#20a878)",
              border: "none",
              borderRadius: "10px",
              padding: "9px 16px",
              boxShadow:
                "0 5px 14px rgba(25,135,84,.16)",
            }}
          >
            <LuDownload size={17} />
            Export Excel
          </button>
        </div>

        {/* =================================================
            FILTER
        ================================================= */}

        <div
          className="rounded-4 p-3 p-md-4 mb-4"
          style={{
            background:
              "linear-gradient(135deg,#f8fbff,#f3f7fc)",
            border: "1px solid #e2e8f0",
          }}
        >

          <div className="d-flex align-items-center gap-2 mb-3">

            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "36px",
                height: "36px",
                background: "#eff6ff",
                color: "#2563eb",
                border: "1px solid #dbeafe",
              }}
            >
              <LuSearch size={18} />
            </div>

            <div>
              <h6 className="mb-0 fw-bold">
                Search & Filter
              </h6>

              <small className="text-muted">
                Find employees quickly
              </small>
            </div>
          </div>

          <div className="row g-3">

            {/* SEARCH */}

            <div className="col-xl-4 col-md-6">

              <label className="form-label fw-semibold">
                Search Employee
              </label>

              <div className="position-relative">

                <LuSearch
                  size={17}
                  style={{
                    position: "absolute",
                    left: "13px",
                    top: "50%",
                    transform:
                      "translateY(-50%)",
                    color: "#94a3b8",
                  }}
                />

                <input
                  type="search"
                  className="form-control"
                  placeholder="Name, code, email or phone..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    paddingLeft: "38px",
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                />
              </div>
            </div>

            {/* DEPARTMENT */}

            <div className="col-xl-3 col-md-6">

              <label className="form-label fw-semibold">
                Department
              </label>

              <select
                className="form-select"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  borderRadius: "9px",
                  border:
                    "1px solid #dbe3ef",
                }}
              >
                <option value="">
                  All Departments
                </option>
                <option value="Teaching">
                  Teaching
                </option>
                <option value="Administration">
                  Administration
                </option>
                <option value="Accounts">
                  Accounts
                </option>
                <option value="Transport">
                  Transport
                </option>
                <option value="Security">
                  Security
                </option>
              </select>
            </div>

            {/* EMPLOYMENT TYPE */}

            <div className="col-xl-2 col-md-6">

              <label className="form-label fw-semibold">
                Employment
              </label>

              <select
                className="form-select"
                value={employmentType}
                onChange={(e) => {
                  setEmploymentType(
                    e.target.value
                  );
                  setCurrentPage(1);
                }}
                style={{
                  borderRadius: "9px",
                  border:
                    "1px solid #dbe3ef",
                }}
              >
                <option value="">
                  All Types
                </option>
                <option value="Permanent">
                  Permanent
                </option>
                <option value="Contract">
                  Contract
                </option>
              </select>
            </div>

            {/* STATUS */}

            <div className="col-xl-3 col-md-6">

              <label className="form-label fw-semibold">
                Status
              </label>

              <select
                className="form-select"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  borderRadius: "9px",
                  border:
                    "1px solid #dbe3ef",
                }}
              >
                <option value="">
                  All Status
                </option>
                <option value="ACTIVE">
                  Active
                </option>
                <option value="INACTIVE">
                  Inactive
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* =================================================
            TABLE HEADER
        ================================================= */}

        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">

          <div>
            <h6 className="fw-bold mb-1">
              Employee Directory
            </h6>

            <small className="text-muted">
              Showing{" "}
              <strong>
                {filteredEmployees.length}
              </strong>{" "}
              employee
              {filteredEmployees.length !== 1
                ? "s"
                : ""}
            </small>
          </div>

          <span
            className="badge rounded-pill px-3 py-2"
            style={{
              background: "#eff6ff",
              color: "#2563eb",
              border:
                "1px solid #bfdbfe",
            }}
          >
            {filteredEmployees.length} Records
          </span>
        </div>

        {/* =================================================
            PREMIUM TABLE
        ================================================= */}

        <div
          className="table-responsive rounded-4"
          style={{
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >

          <table
            className="table table-hover align-middle mb-0"
            style={{
              minWidth: "1150px",
            }}
          >

            <thead>
              <tr
                style={{
                  background:
                    "linear-gradient(135deg,#f8fafc,#eef5ff)",
                }}
              >

                <th
                  className="px-3 py-3"
                  style={{
                    color: "#475569",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: ".3px",
                    borderBottom:
                      "1px solid #dbe5f0",
                  }}
                >
                  #
                </th>

                <th
                  style={{
                    color: "#475569",
                    fontSize: "12px",
                    fontWeight: 700,
                    borderBottom:
                      "1px solid #dbe5f0",
                  }}
                >
                  EMPLOYEE
                </th>

                <th
                  style={{
                    color: "#475569",
                    fontSize: "12px",
                    fontWeight: 700,
                    borderBottom:
                      "1px solid #dbe5f0",
                  }}
                >
                  EMPLOYEE CODE
                </th>

                <th
                  style={{
                    color: "#475569",
                    fontSize: "12px",
                    fontWeight: 700,
                    borderBottom:
                      "1px solid #dbe5f0",
                  }}
                >
                  DEPARTMENT
                </th>

                <th
                  style={{
                    color: "#475569",
                    fontSize: "12px",
                    fontWeight: 700,
                    borderBottom:
                      "1px solid #dbe5f0",
                  }}
                >
                  DESIGNATION
                </th>

                <th
                  style={{
                    color: "#475569",
                    fontSize: "12px",
                    fontWeight: 700,
                    borderBottom:
                      "1px solid #dbe5f0",
                  }}
                >
                  JOINING DATE
                </th>

                <th
                  style={{
                    color: "#475569",
                    fontSize: "12px",
                    fontWeight: 700,
                    borderBottom:
                      "1px solid #dbe5f0",
                  }}
                >
                  STATUS
                </th>

                <th
                  className="text-center"
                  style={{
                    color: "#475569",
                    fontSize: "12px",
                    fontWeight: 700,
                    borderBottom:
                      "1px solid #dbe5f0",
                  }}
                >
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>

              {paginatedEmployees.length > 0 ? (

                paginatedEmployees.map(
                  (employee, index) => {

                    const name =
                      getEmployeeName(
                        employee
                      );

                    return (
                      <tr
                        key={employee.id}
                        style={{
                          borderBottom:
                            "1px solid #f1f5f9",
                        }}
                      >

                        {/* NUMBER */}

                        <td className="px-3">
                          <span
                            className="fw-semibold text-muted"
                          >
                            {(currentPage - 1) *
                              ITEMS_PER_PAGE +
                              index +
                              1}
                          </span>
                        </td>

                        {/* EMPLOYEE */}

                        <td>

                          <div className="d-flex align-items-center gap-3">

                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle fw-bold"
                              style={{
                                width: "42px",
                                height: "42px",
                                background:
                                  "linear-gradient(135deg,#dbeafe,#eff6ff)",
                                color: "#2563eb",
                                border:
                                  "1px solid #bfdbfe",
                                flexShrink: 0,
                              }}
                            >
                              {(
                                employee.firstName ||
                                "E"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>

                              <div
                                className="fw-bold text-dark"
                                style={{
                                  fontSize:
                                    "14px",
                                }}
                              >
                                {name || "-"}
                              </div>

                              <div
                                className="text-muted"
                                style={{
                                  fontSize:
                                    "12px",
                                }}
                              >
                                {employee.email ||
                                  "-"}
                              </div>

                            </div>

                          </div>
                        </td>

                        {/* CODE */}

                        <td>
                          <span
                            className="badge rounded-3 px-3 py-2"
                            style={{
                              background:
                                "#f8fafc",
                              color:
                                "#2563eb",
                              border:
                                "1px solid #dbe3ef",
                              fontWeight: 700,
                            }}
                          >
                            <MdOutlineBadge
                              className="me-1"
                            />
                            {
                              employee.employeeCode
                            }
                          </span>
                        </td>

                        {/* DEPARTMENT */}

                        <td>

                          <div className="d-flex align-items-center gap-2">

                            <div
                              className="d-flex align-items-center justify-content-center rounded-3"
                              style={{
                                width: "30px",
                                height: "30px",
                                background:
                                  "#f1f5f9",
                                color:
                                  "#64748b",
                              }}
                            >
                              <LuBuilding2
                                size={15}
                              />
                            </div>

                            <span className="fw-semibold text-dark">
                              {
                                employee.department
                              }
                            </span>

                          </div>

                        </td>

                        {/* DESIGNATION */}

                        <td>
                          <span className="text-muted fw-semibold">
                            {
                              employee.designation
                            }
                          </span>
                        </td>

                        {/* JOINING DATE */}

                        <td>
                          <span className="text-muted">
                            {employee.joiningDate
                              ? new Date(
                                  employee.joiningDate
                                ).toLocaleDateString(
                                  "en-IN"
                                )
                              : "-"}
                          </span>
                        </td>

                        {/* STATUS */}

                        <td>

                          {employee.status ===
                          "ACTIVE" ? (

                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                background:
                                  "#ecfdf5",
                                color:
                                  "#047857",
                                border:
                                  "1px solid #a7f3d0",
                              }}
                            >
                              <LuCircleCheck
                                size={13}
                                className="me-1"
                              />
                              ACTIVE
                            </span>

                          ) : (

                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                background:
                                  "#fef2f2",
                                color:
                                  "#b91c1c",
                                border:
                                  "1px solid #fecaca",
                              }}
                            >
                              INACTIVE
                            </span>

                          )}

                        </td>

                        {/* ACTION */}

                        <td className="text-center">

                          <div className="d-flex justify-content-center gap-1">

                            <button
                              type="button"
                              title="View"
                              className="btn btn-sm d-flex align-items-center justify-content-center"
                              style={{
                                width: "34px",
                                height: "34px",
                                borderRadius:
                                  "8px",
                                background:
                                  "#eff6ff",
                                color:
                                  "#2563eb",
                                border:
                                  "1px solid #dbeafe",
                              }}
                              onClick={() => {
                                // navigate(`/setup/hr-payroll/employees/${employee.id}`)
                              }}
                            >
                              <LuEye size={16} />
                            </button>

                            <button
                              type="button"
                              title="Edit"
                              className="btn btn-sm d-flex align-items-center justify-content-center"
                              style={{
                                width: "34px",
                                height: "34px",
                                borderRadius:
                                  "8px",
                                background:
                                  "#f8fafc",
                                color:
                                  "#475569",
                                border:
                                  "1px solid #e2e8f0",
                              }}
                              onClick={() => {
                                // navigate(`/setup/hr-payroll/employees/edit/${employee.id}`)
                              }}
                            >
                              <LuPencil size={16} />
                            </button>

                            <button
                              type="button"
                              title="Delete"
                              className="btn btn-sm d-flex align-items-center justify-content-center"
                              style={{
                                width: "34px",
                                height: "34px",
                                borderRadius:
                                  "8px",
                                background:
                                  "#fff1f2",
                                color:
                                  "#e11d48",
                                border:
                                  "1px solid #fecdd3",
                              }}
                              onClick={() =>
                                handleDelete(
                                  employee
                                )
                              }
                            >
                              <LuTrash2 size={16} />
                            </button>

                          </div>

                        </td>
                      </tr>
                    );
                  }
                )

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-5"
                  >

                    <div
                      className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                      style={{
                        width: "60px",
                        height: "60px",
                        background:
                          "#f1f5f9",
                        color:
                          "#94a3b8",
                      }}
                    >
                      <LuUsers size={27} />
                    </div>

                    <h6 className="fw-bold text-muted mb-1">
                      No employees found
                    </h6>

                    <small className="text-secondary">
                      Try changing your search or filters.
                    </small>

                  </td>

                </tr>
              )}

            </tbody>
          </table>
        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-2">

          <small className="text-muted">
            Page{" "}
            <strong>
              {currentPage}
            </strong>{" "}
            of{" "}
            <strong>
              {totalPages}
            </strong>
          </small>

          <div className="d-flex align-items-center gap-2">

            <button
              type="button"
              className="btn btn-sm d-flex align-items-center gap-1"
              disabled={currentPage === 1}
              onClick={() =>
                changePage(
                  currentPage - 1
                )
              }
              style={{
                border:
                  "1px solid #dbe3ef",
                color:
                  currentPage === 1
                    ? "#94a3b8"
                    : "#2563eb",
                borderRadius: "8px",
                background: "#fff",
              }}
            >
              <LuChevronLeft size={16} />
              Previous
            </button>

            <div className="d-flex gap-1">

              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => i + 1
              ).map((page) => (

                <button
                  type="button"
                  key={page}
                  className="btn btn-sm"
                  onClick={() =>
                    changePage(page)
                  }
                  style={
                    currentPage === page
                      ? {
                          background:
                            "linear-gradient(135deg,#2563eb,#3b82f6)",
                          color: "#fff",
                          border: "none",
                          borderRadius:
                            "8px",
                          minWidth: "34px",
                        }
                      : {
                          background:
                            "#fff",
                          color:
                            "#475569",
                          border:
                            "1px solid #dbe3ef",
                          borderRadius:
                            "8px",
                          minWidth: "34px",
                        }
                  }
                >
                  {page}
                </button>

              ))}

            </div>

            <button
              type="button"
              className="btn btn-sm d-flex align-items-center gap-1"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                changePage(
                  currentPage + 1
                )
              }
              style={{
                border:
                  "1px solid #dbe3ef",
                color:
                  currentPage ===
                  totalPages
                    ? "#94a3b8"
                    : "#2563eb",
                borderRadius: "8px",
                background: "#fff",
              }}
            >
              Next
              <LuChevronRight size={16} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;

