import React, { useEffect, useMemo, useState } from "react";
import {
  LuUsers,
  LuUserCheck,
  LuUserX,
  LuSchool,
  LuSearch,
  LuRefreshCw,
  LuEye,
  LuGraduationCap,
} from "react-icons/lu";
import axiosInstance from "../../api/axiosInstance";
import { FaGraduationCap } from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";



const StudentSchoolList = () => {

  const token = localStorage.getItem("token");

  // =====================================================
  // STATES
  // =====================================================

  const [schools, setSchools] = useState([]);

  const [selectedSchool, setSelectedSchool] = useState("");

  const [students, setStudents] = useState([]);

  const [schoolStats, setSchoolStats] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);

  const [statsLoading, setStatsLoading] = useState(false);


  // =====================================================
  // CARD STATS
  // =====================================================

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });


  // =====================================================
  // FETCH SCHOOLS
  // =====================================================

  const fetchSchools = async () => {

    try {

      const response = await axiosInstance.get(
        "/api/school/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data ||
          response.data?.content ||
          [];

      setSchools(data);

    } catch (error) {

      console.error(
        "Fetch Schools Error:",
        error
      );

      setSchools([]);

    } finally {

      setInitialLoading(false);

    }
  };


  // =====================================================
  // FETCH ALL SCHOOL STATS
  // =====================================================

  const fetchAllSchoolStats = async () => {

    try {

      setStatsLoading(true);

      const activeSchools = schools || [];

      const results = await Promise.all(
        activeSchools.map(async (school) => {

          try {

            const [totalRes, activeRes] =
              await Promise.all([
                axiosInstance.get(
                  "/api/students/count",
                  {
                    params: {
                      schoolId: school.id,
                    },
                    headers: {
                      Authorization:
                        `Bearer ${token}`,
                    },
                  }
                ),

                axiosInstance.get(
                  "/api/students/count/active",
                  {
                    params: {
                      schoolId: school.id,
                    },
                    headers: {
                      Authorization:
                        `Bearer ${token}`,
                    },
                  }
                ),
              ]);

            const total =
              Number(totalRes.data) || 0;

            const active =
              Number(activeRes.data) || 0;

            const inactive =
              Math.max(
                total - active,
                0
              );

            return {
              schoolId: school.id,

              schoolName:
                school.schoolName ||
                school.name ||
                school.organizationName ||
                "-",

              total,

              active,

              inactive,
            };

          } catch (error) {

            console.error(
              `Stats error for school ${school.id}:`,
              error
            );

            return {
              schoolId: school.id,

              schoolName:
                school.schoolName ||
                school.name ||
                school.organizationName ||
                "-",

              total: 0,

              active: 0,

              inactive: 0,
            };
          }
        })
      );

      setSchoolStats(results);

    } catch (error) {

      console.error(
        "School Stats Error:",
        error
      );

      setSchoolStats([]);

    } finally {

      setStatsLoading(false);

    }
  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    fetchSchools();

  }, []);


  // =====================================================
  // LOAD SCHOOL STATS
  // =====================================================

  useEffect(() => {

    if (schools.length > 0) {

      fetchAllSchoolStats();

    }

  }, [schools]);


  // =====================================================
  // FETCH SELECTED SCHOOL STUDENTS
  // =====================================================

  const fetchStudentsBySchool = async (
    schoolId
  ) => {

    try {

      setLoading(true);

      const response =
        await axiosInstance.get(
          "/api/students/school",
          {
            params: {
              schoolId,
            },

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data = Array.isArray(
        response.data
      )
        ? response.data
        : response.data?.data ||
          response.data?.content ||
          [];

      setStudents(data);


      // =================================================
      // CALCULATE SELECTED SCHOOL STATS
      // =================================================

      const total = data.length;

      const active = data.filter(
        (student) =>
          String(student.status)
            .toUpperCase() === "ACTIVE"
      ).length;

      const inactive =
        total - active;

      setStats({
        total,
        active,
        inactive,
      });

    } catch (error) {

      console.error(
        "Fetch Students Error:",
        error
      );

      setStudents([]);

      setStats({
        total: 0,
        active: 0,
        inactive: 0,
      });

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // SCHOOL CHANGE
  // =====================================================

  const handleSchoolChange = async (e) => {

    const value = e.target.value;

    setSelectedSchool(value);

    setSearch("");

    setStudents([]);

    if (!value) {

      setStats({
        total: 0,
        active: 0,
        inactive: 0,
      });

      return;
    }

    await fetchStudentsBySchool(value);
  };


  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {

    setSelectedSchool("");

    setStudents([]);

    setSearch("");

    setStats({
      total: 0,
      active: 0,
      inactive: 0,
    });

    fetchAllSchoolStats();
  };


  // =====================================================
  // SELECTED SCHOOL NAME
  // =====================================================

  const selectedSchoolName = useMemo(() => {

    if (!selectedSchool) {
      return "All Schools";
    }

    const school = schools.find(
      (item) =>
        String(item.id) ===
        String(selectedSchool)
    );

    return (
      school?.schoolName ||
      school?.name ||
      school?.organizationName ||
      "-"
    );

  }, [
    selectedSchool,
    schools,
  ]);


  // =====================================================
  // FILTER STUDENTS
  // =====================================================

  const filteredStudents = useMemo(() => {

    const value =
      search.toLowerCase().trim();

    if (!value) {
      return students;
    }

    return students.filter(
      (student) => {

        const fullName = [
          student.firstName,
          student.middleName,
          student.lastName,
        ]
          .filter(Boolean)
          .join(" ");

        return (

          fullName
            .toLowerCase()
            .includes(value) ||

          String(
            student.admissionNumber || ""
          )
            .toLowerCase()
            .includes(value) ||

          String(
            student.rollNumber || ""
          )
            .toLowerCase()
            .includes(value) ||

          String(
            student.studentClass || ""
          )
            .toLowerCase()
            .includes(value) ||

          String(
            student.mobile || ""
          )
            .toLowerCase()
            .includes(value)

        );

      }
    );

  }, [
    students,
    search,
  ]);


  // =====================================================
  // ALL SCHOOL TOTALS
  // =====================================================

  const allSchoolTotals = useMemo(() => {

    return schoolStats.reduce(
      (acc, item) => {

        acc.total +=
          Number(item.total) || 0;

        acc.active +=
          Number(item.active) || 0;

        acc.inactive +=
          Number(item.inactive) || 0;

        return acc;

      },
      {
        total: 0,
        active: 0,
        inactive: 0,
      }
    );

  }, [schoolStats]);


  // =====================================================
  // STATUS BADGE
  // =====================================================

  const StatusBadge = ({
    status,
  }) => {

    const active =
      String(status)
        .toUpperCase() ===
      "ACTIVE";

    return active ? (

      <span
        className="px-2 py-1 rounded-4 d-inline-flex align-items-center"
        style={{
          background: "#dcfce7",
          color: "#16a34a",
          fontSize: "10px",
          fontWeight: "600",
        }}
      >
        <LuUserCheck
          size={13}
          className="me-1"
        />

        Active
      </span>

    ) : (

      <span
        className="px-2 py-1 rounded-4 d-inline-flex align-items-center"
        style={{
          background: "#fee2e2",
          color: "#dc2626",
          fontSize: "10px",
          fontWeight: "600",
        }}
      >
        <LuUserX
          size={13}
          className="me-1"
        />

        Inactive
      </span>

    );
  };


  // =====================================================
  // STAT CARD
  // =====================================================

  const StatCard = ({
    title,
    value,
    icon,
    bg,
    iconColor,
    description,
  }) => {

    return (

      <div className="col-xl-3 col-md-6">

        <div
          className="card shadow border-0 rounded-4 h-100"
        >

          <div className="card-body">

            <div className="d-flex align-items-center justify-content-between">

              <div>

                <h6
                  className="text-muted mb-2"
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {title}
                </h6>

                <h3
                  className="fw-bold mb-1"
                  style={{
                    fontSize: "24px",
                  }}
                >
                  {value}
                </h3>

                <small
                  className="text-muted"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {description}
                </small>

              </div>

              <div
                className="d-flex align-items-center justify-content-center rounded-4"
                style={{
                  width: "48px",
                  height: "48px",
                  background: bg,
                  color: iconColor,
                }}
              >
                {icon}
              </div>

            </div>

          </div>

        </div>

      </div>

    );
  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <>

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

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
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaGraduationCap size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">Student School List</h5>

                  <div className="text-muted small">
                    School &nbsp;/ &nbsp; Student List
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  School
                </span>
              </div>
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
              Home &nbsp;›&nbsp; School &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Student List
              </span>
            </small>
          </div>
        </div>
      </div>


      {/* ================================================= */}
      {/* FILTER */}
      {/* ================================================= */}

      <div className="container-fluid px-2">

        <div className="card shadow border-0 rounded-4 mb-3">

          <div className="card-header bg-white">

            <div className="d-flex align-items-center">

              <span
                className="d-inline-flex align-items-center justify-content-center rounded me-2"
                style={{
                    width: "42px",
                    height: "42px",
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
              >
                <LuSchool
                  size={17}
                  
                />
              </span>

              <div>

                <h6 className="fw-bold mb-0 small">
                  Student Search
                </h6>

                <small className="text-muted ">
                  Select school to view students
                </small>

              </div>

            </div>

          </div>


          <div className="card-body">

            <div className="row g-3">

              {/* SCHOOL */}

              <div className="col-md-5">

                <label className="form-label">

                  <h6 className="small">
                    School
                  </h6>

                </label>

                <select
                  className="form-select"
                  value={selectedSchool}
                  onChange={
                    handleSchoolChange
                  }
                  disabled={initialLoading}
                >

                  <option value="">
                    All Schools
                  </option>

                  {schools.map(
                    (school) => (

                      <option
                        key={school.id}
                        value={school.id}
                      >
                        {school.schoolName ||
                          school.name ||
                          school.organizationName}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* SEARCH */}

              <div className="col-md-5">

                <label className="form-label">

                  <h6 className="small">
                    Search Student
                  </h6>

                </label>

                <div className="position-relative">

                  <input
                    type="text"
                    className="form-control"
                    placeholder={
                      selectedSchool
                        ? "Search name, admission no, roll no..."
                        : "Select school first"
                    }
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    disabled={
                      !selectedSchool
                    }
                    style={{
                      paddingRight:
                        "40px",
                    }}
                  />

                  <LuSearch
                    size={17}
                    className="position-absolute text-muted"
                    style={{
                      right: "12px",
                      top: "10px",
                    }}
                  />

                </div>

              </div>


              {/* RESET */}

              <div className="col-md-2 d-flex align-items-end">

                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={handleReset}
                >

                  <LuRefreshCw
                    size={16}
                    className="me-2"
                  />

                  Reset

                </button>

              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* CARDS */}
        {/* ================================================= */}

        <div className="row g-3 mb-3">

          <StatCard
            title="Total Students"
            value={
              selectedSchool
                ? stats.total
                : allSchoolTotals.total
            }
            icon={
              <LuUsers size={23} />
            }
            bg="#f0eaff"
            iconColor="#6f2cff"
            description={
              selectedSchool
                ? selectedSchoolName
                : "All Schools"
            }
          />


          <StatCard
            title="Active Students"
            value={
              selectedSchool
                ? stats.active
                : allSchoolTotals.active
            }
            icon={
              <LuUserCheck
                size={23}
              />
            }
            bg="#eafaf0"
            iconColor="#16a34a"
            description="Currently active"
          />


          <StatCard
            title="Inactive Students"
            value={
              selectedSchool
                ? stats.inactive
                : allSchoolTotals.inactive
            }
            icon={
              <LuUserX size={23} />
            }
            bg="#fff0f0"
            iconColor="#dc2626"
            description="Currently inactive"
          />


          <StatCard
            title="Schools"
            value={
              selectedSchool
                ? 1
                : schools.length
            }
            icon={
              <LuSchool size={23} />
            }
            bg="#fff7e6"
            iconColor="#d97706"
            description={
              selectedSchool
                ? selectedSchoolName
                : "Registered schools"
            }
          />

        </div>


        {/* ================================================= */}
        {/* ALL SCHOOL TABLE */}
        {/* ================================================= */}

        {!selectedSchool && (

          <div className="card shadow border-0 rounded-4">

            <div className="card-header bg-white border-0 p-3">

              <div className="d-flex align-items-center">

                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-4 me-2"
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "#f0eaff",
                  }}
                >

                  <LuSchool
                    size={17}
                    color="#6f2cff"
                  />

                </span>

                <div>

                  <h6 className="fw-bold mb-0">
                    School Wise Student Summary
                  </h6>

                  <small className="text-muted">
                    Student statistics by school
                  </small>

                </div>

              </div>

            </div>


            <div className="card-body p-0">

              <div className="table-responsive">

                <table
                  className="table align-middle mb-0"
                  style={{
                    minWidth: "750px",
                  }}
                >

                  <thead>

                    <tr
                      style={{
                        background:
                          "#fafbff",
                        borderTop:
                          "1px solid #f0f0f0",
                        borderBottom:
                          "1px solid #eeeeee",
                      }}
                    >

                      <th
                        className="text-center"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        #
                      </th>

                      <th
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        School
                      </th>

                      <th
                        className="text-center"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        Total Students
                      </th>

                      <th
                        className="text-center"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        Active
                      </th>

                      <th
                        className="text-center"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        Inactive
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {statsLoading ? (

                      <tr>

                        <td
                          colSpan="5"
                          className="text-center py-5"
                        >

                          <div
                            className="spinner-border text-primary"
                            style={{
                              width: "25px",
                              height: "25px",
                            }}
                          />

                          <div className="text-muted mt-2">
                            Loading school statistics...
                          </div>

                        </td>

                      </tr>

                    ) : schoolStats.length ===
                      0 ? (

                      <tr>

                        <td
                          colSpan="5"
                          className="text-center py-5"
                        >

                          <LuSchool
                            size={35}
                            className="text-muted mb-2"
                          />

                          <div className="fw-semibold">
                            No school data found
                          </div>

                        </td>

                      </tr>

                    ) : (

                      schoolStats.map(
                        (item, index) => (

                          <tr
                            key={
                              item.schoolId
                            }
                            style={{
                              borderBottom:
                                "1px solid #f3f3f3",
                            }}
                          >

                            <td className="text-center">

                              <span
                                style={{
                                  fontSize:
                                    "12px",
                                  fontWeight:
                                    "600",
                                  color:
                                    "#666",
                                }}
                              >
                                {index + 1}
                              </span>

                            </td>


                            <td>

                              <div className="d-flex align-items-center">

                                <span
                                  className="d-inline-flex align-items-center justify-content-center rounded-4 me-2"
                                  style={{
                                    width:
                                      "36px",
                                    height:
                                      "36px",
                                    background:
                                      "#f1edff",
                                    color:
                                      "#6f2cff",
                                  }}
                                >

                                  <LuSchool
                                    size={18}
                                  />

                                </span>

                                <div>

                                  <div
                                    className="fw-semibold"
                                    style={{
                                      fontSize:
                                        "12px",
                                    }}
                                  >
                                    {
                                      item.schoolName
                                    }
                                  </div>

                                  <small
                                    className="text-muted"
                                    style={{
                                      fontSize:
                                        "10px",
                                    }}
                                  >
                                    School ID:{" "}
                                    {
                                      item.schoolId
                                    }
                                  </small>

                                </div>

                              </div>

                            </td>


                            <td className="text-center">

                              <span
                                className="px-2 py-1 rounded-4"
                                style={{
                                  background:
                                    "#f1edff",
                                  color:
                                    "#6f2cff",
                                  fontSize:
                                    "11px",
                                  fontWeight:
                                    "700",
                                }}
                              >
                                {item.total}
                              </span>

                            </td>


                            <td className="text-center">

                              <span
                                className="px-2 py-1 rounded-4"
                                style={{
                                  background:
                                    "#dcfce7",
                                  color:
                                    "#16a34a",
                                  fontSize:
                                    "11px",
                                  fontWeight:
                                    "700",
                                }}
                              >
                                {item.active}
                              </span>

                            </td>


                            <td className="text-center">

                              <span
                                className="px-2 py-1 rounded-4"
                                style={{
                                  background:
                                    "#fee2e2",
                                  color:
                                    "#dc2626",
                                  fontSize:
                                    "11px",
                                  fontWeight:
                                    "700",
                                }}
                              >
                                {item.inactive}
                              </span>

                            </td>

                          </tr>

                        )
                      )

                    )}

                  </tbody>

                </table>

              </div>

            </div>


            <div className="card-footer bg-white border-0">

              <small className="text-muted">

                Showing{" "}

                <strong>
                  {schoolStats.length}
                </strong>{" "}

                schools

              </small>

            </div>

          </div>

        )}


        {/* ================================================= */}
        {/* STUDENT TABLE */}
        {/* ================================================= */}

        {selectedSchool && (

          <div className="card shadow border-0 rounded-4">

            {/* HEADER */}

            <div
              className="card-header bg-white border-0 p-3"
            >

              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                <div className="d-flex align-items-center">

                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-4 me-2"
                    style={{
                      width: "34px",
                      height: "34px",
                      background:
                        "#f0eaff",
                    }}
                  >

                    <LuGraduationCap
                      size={18}
                      color="#6f2cff"
                    />

                  </span>

                  <div>

                    <h6 className="fw-bold mb-0">
                      Student List
                    </h6>

                    <small className="text-muted">
                      {selectedSchoolName}
                    </small>

                  </div>

                </div>


                <div>

                  <span
                    className="px-2 py-1 rounded-4"
                    style={{
                      background:
                        "#f1edff",
                      color:
                        "#6f2cff",
                      fontSize:
                        "11px",
                      fontWeight:
                        "600",
                    }}
                  >

                    {filteredStudents.length} Students

                  </span>

                </div>

              </div>

            </div>


            {/* TABLE */}

            <div className="card-body p-0">

              <div className="table-responsive">

                <table
                  className="table align-middle mb-0"
                  style={{
                    minWidth:
                      "1250px",
                  }}
                >

                  <thead>

                    <tr
                      style={{
                        background:
                          "#fafbff",
                        borderTop:
                          "1px solid #f0f0f0",
                        borderBottom:
                          "1px solid #eeeeee",
                      }}
                    >

                      <th
                        className="text-center"
                        style={{
                          fontSize:
                            "12px",
                        }}
                      >
                        #
                      </th>

                      <th
                        style={{
                          fontSize:
                            "12px",
                        }}
                      >
                        Student
                      </th>

                      <th
                        style={{
                          fontSize:
                            "12px",
                        }}
                      >
                        Admission No
                      </th>

                      <th
                        style={{
                          fontSize:
                            "12px",
                        }}
                      >
                        Roll No
                      </th>

                      <th
                        style={{
                          fontSize:
                            "12px",
                        }}
                      >
                        Class
                      </th>

                      <th
                        style={{
                          fontSize:
                            "12px",
                        }}
                      >
                        Section
                      </th>

                      <th
                        style={{
                          fontSize:
                            "12px",
                        }}
                      >
                        Mobile
                      </th>

                      <th
                        style={{
                          fontSize:
                            "12px",
                        }}
                      >
                        Academic Year
                      </th>

                      <th
                        style={{
                          fontSize:
                            "12px",
                        }}
                      >
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {loading ? (

                      <tr>

                        <td
                          colSpan="9"
                          className="text-center py-5"
                        >

                          <div
                            className="spinner-border text-primary"
                            style={{
                              width:
                                "25px",
                              height:
                                "25px",
                            }}
                          />

                          <div className="text-muted mt-2">
                            Loading students...
                          </div>

                        </td>

                      </tr>

                    ) : filteredStudents.length ===
                      0 ? (

                      <tr>

                        <td
                          colSpan="9"
                          className="text-center py-5"
                        >

                          <LuUsers
                            size={38}
                            className="text-muted mb-2"
                          />

                          <div className="fw-semibold">
                            No students found
                          </div>

                          <small className="text-muted">
                            No students available for this school.
                          </small>

                        </td>

                      </tr>

                    ) : (

                      filteredStudents.map(
                        (
                          student,
                          index
                        ) => {

                          const fullName =
                            [
                              student.firstName,
                              student.middleName,
                              student.lastName,
                            ]
                              .filter(Boolean)
                              .join(" ") ||
                            "-";

                          return (

                            <tr
                              key={
                                student.id ||
                                student.admissionNumber ||
                                index
                              }
                              style={{
                                borderBottom:
                                  "1px solid #f4f4f4",
                              }}
                            >

                              {/* # */}

                              <td className="text-center">

                                <span
                                  style={{
                                    fontSize:
                                      "11px",
                                    fontWeight:
                                      "600",
                                    color:
                                      "#666",
                                  }}
                                >
                                  {index + 1}
                                </span>

                              </td>


                              {/* STUDENT */}

                              <td>

                                <div className="d-flex align-items-center">

                                  <div
                                    className="rounded-circle d-flex align-items-center justify-content-center me-2"
                                    style={{
                                      width:
                                        "38px",
                                      height:
                                        "38px",
                                      background:
                                        "#f1edff",
                                      color:
                                        "#6f2cff",
                                      fontWeight:
                                        "700",
                                      fontSize:
                                        "12px",
                                    }}
                                  >

                                    {student.firstName
                                      ?.charAt(
                                        0
                                      )
                                      ?.toUpperCase() ||
                                      "S"}

                                  </div>

                                  <div>

                                    <div
                                      className="fw-semibold"
                                      style={{
                                        fontSize:
                                          "12px",
                                      }}
                                    >
                                      {fullName}
                                    </div>

                                    <small
                                      className="text-muted"
                                      style={{
                                        fontSize:
                                          "10px",
                                      }}
                                    >
                                      {student.gender ||
                                        "-"}
                                    </small>

                                  </div>

                                </div>

                              </td>


                              {/* ADMISSION */}

                              <td>

                                <span
                                  className="px-2 py-1 rounded-4"
                                  style={{
                                    background:
                                      "#f1edff",
                                    color:
                                      "#6f2cff",
                                    fontSize:
                                      "10px",
                                    fontWeight:
                                      "600",
                                  }}
                                >
                                  {
                                    student.admissionNumber ||
                                    "-"
                                  }
                                </span>

                              </td>


                              {/* ROLL */}

                              <td>

                                <span
                                  style={{
                                    fontSize:
                                      "12px",
                                    fontWeight:
                                      "600",
                                  }}
                                >
                                  {
                                    student.rollNumber ??
                                    "-"
                                  }
                                </span>

                              </td>


                              {/* CLASS */}

                              <td>

                                <span
                                  style={{
                                    fontSize:
                                      "12px",
                                  }}
                                >
                                  {
                                    student.studentClass ||
                                    "-"
                                  }
                                </span>

                              </td>


                              {/* SECTION */}

                              <td>

                                <span
                                  className="px-2 py-1 rounded-4"
                                  style={{
                                    background:
                                      "#f3e8ff",
                                    color:
                                      "#7e22ce",
                                    fontSize:
                                      "10px",
                                    fontWeight:
                                      "600",
                                  }}
                                >
                                  {
                                    student.section ||
                                    "-"
                                  }
                                </span>

                              </td>


                              {/* MOBILE */}

                              <td>

                                <span
                                  style={{
                                    fontSize:
                                      "11px",
                                  }}
                                >
                                  {
                                    student.mobile ||
                                    "-"
                                  }
                                </span>

                              </td>


                              {/* ACADEMIC YEAR */}

                              <td>

                                <span
                                  style={{
                                    fontSize:
                                      "11px",
                                  }}
                                >
                                  {
                                    student.academicYear ||
                                    "-"
                                  }
                                </span>

                              </td>


                              {/* STATUS */}

                              <td>

                                <StatusBadge
                                  status={
                                    student.status
                                  }
                                />

                              </td>

                            </tr>

                          );

                        }
                      )

                    )}

                  </tbody>

                </table>

              </div>

            </div>


            {/* FOOTER */}

            {!loading &&
              filteredStudents.length >
                0 && (

                <div className="card-footer bg-white border-0">

                  <div className="d-flex justify-content-between align-items-center">

                    <small className="text-muted">

                      Showing{" "}

                      <strong>
                        {filteredStudents.length}
                      </strong>{" "}

                      students

                    </small>

                    <small className="text-muted">

                      School:{" "}

                      <strong>
                        {selectedSchoolName}
                      </strong>

                    </small>

                  </div>

                </div>

              )}

          </div>

        )}

      </div>

    </>

  );
};

export default StudentSchoolList;