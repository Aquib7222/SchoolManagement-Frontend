import React, { useEffect, useMemo, useState } from "react";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import axiosInstance from "../../api/axiosInstance";

import {
  FaSchool,
  FaUsers,
} from "react-icons/fa";


const SchoolGrowthChart = () => {

  const [schools, setSchools] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);


  /* =========================================================
     FETCH ACTUAL SCHOOL DATA
  ========================================================= */

  useEffect(() => {

    const fetchSchools = async () => {

      try {

        setLoading(true);
        setError(false);

        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("AdminToken");


        const response = await axiosInstance.get(
          "/api/school/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const data = Array.isArray(response?.data)
          ? response.data
          : response?.data?.data ||
            response?.data?.content ||
            [];


        setSchools(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.error(
          "School Growth API Error:",
          err
        );

        setSchools([]);

        setError(true);

      } finally {

        setLoading(false);

      }

    };


    fetchSchools();

  }, []);


  /* =========================================================
     CREATE MONTHLY CHART DATA
  ========================================================= */

  const chartData = useMemo(() => {

    if (!schools.length) {
      return [];
    }


    const monthMap = {};


    schools.forEach((school) => {

      if (!school?.createdAt) {
        return;
      }


      const date =
        new Date(school.createdAt);


      if (Number.isNaN(date.getTime())) {
        return;
      }


      const year =
        date.getFullYear();


      const month =
        date.getMonth();


      const key =
        `${year}-${String(
          month + 1
        ).padStart(2, "0")}`;


      if (!monthMap[key]) {

        monthMap[key] = {

          date: new Date(
            year,
            month,
            1
          ),

          schools: 0,

          students: 0,

        };

      }


      /* New school */

      monthMap[key].schools += 1;


      /* Students belonging to that school */

      monthMap[key].students +=
        Number(
          school?.totalStudents || 0
        );

    });


    /* Sort months */

    const sorted =
      Object.values(monthMap)
        .sort(
          (a, b) =>
            a.date.getTime() -
            b.date.getTime()
        );


    /* Cumulative growth */

    let totalSchools = 0;

    let totalStudents = 0;


    return sorted.map((item) => {

      totalSchools +=
        item.schools;


      totalStudents +=
        item.students;


      return {

        name:
          item.date.toLocaleDateString(
            "en-IN",
            {
              month: "short",
              year: "2-digit",
            }
          ),

        schools:
          totalSchools,

        students:
          totalStudents,

        newSchools:
          item.schools,

        newStudents:
          item.students,

      };

    });

  }, [schools]);


  /* =========================================================
     TOOLTIP
  ========================================================= */

  const CustomTooltip = ({
    active,
    payload,
    label,
  }) => {

    if (
      !active ||
      !payload ||
      payload.length === 0
    ) {
      return null;
    }


    const schoolValue =
      payload.find(
        (item) =>
          item.dataKey === "schools"
      )?.value || 0;


    const studentValue =
      payload.find(
        (item) =>
          item.dataKey === "students"
      )?.value || 0;


    return (

      <div className="school-growth-tooltip">

        <div className="growth-tooltip-heading">
          {label}
        </div>


        <div className="growth-tooltip-item">

          <span className="tooltip-indicator school-indicator"></span>

          <span>
            Schools
          </span>

          <strong>
            {schoolValue}
          </strong>

        </div>


        <div className="growth-tooltip-item">

          <span className="tooltip-indicator student-indicator"></span>

          <span>
            Students
          </span>

          <strong>
            {Number(
              studentValue
            ).toLocaleString("en-IN")}
          </strong>

        </div>

      </div>

    );

  };


  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {

    return (

      <div className="school-growth-state">

        <div className="growth-spinner"></div>

        <span>
          Loading school growth...
        </span>

      </div>

    );

  }


  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {

    return (

      <div className="school-growth-state">

        <div className="growth-state-icon">
          <FaSchool />
        </div>

        <strong>
          Unable to load chart
        </strong>

        <span>
          Please try again later
        </span>

      </div>

    );

  }


  /* =========================================================
     EMPTY
  ========================================================= */

  if (!chartData.length) {

    return (

      <div className="school-growth-state">

        <div className="growth-state-icon">
          <FaSchool />
        </div>

        <strong>
          No school data available
        </strong>

        <span>
          Create a school to see growth
        </span>

      </div>

    );

  }


  /* =========================================================
     CHART
  ========================================================= */

  return (

    <div className="school-growth-chart">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <AreaChart
          data={chartData}

          margin={{
            top: 15,
            right: 15,
            left: -15,
            bottom: 5,
          }}
        >

          {/* =================================================
              GRADIENTS
          ================================================= */}

          <defs>

            <linearGradient
              id="schoolAreaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#2563eb"
                stopOpacity={0.38}
              />

              <stop
                offset="55%"
                stopColor="#3b82f6"
                stopOpacity={0.15}
              />

              <stop
                offset="100%"
                stopColor="#60a5fa"
                stopOpacity={0.02}
              />

            </linearGradient>


            <linearGradient
              id="studentAreaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#8b5cf6"
                stopOpacity={0.32}
              />

              <stop
                offset="55%"
                stopColor="#a78bfa"
                stopOpacity={0.12}
              />

              <stop
                offset="100%"
                stopColor="#c4b5fd"
                stopOpacity={0.02}
              />

            </linearGradient>

          </defs>


          {/* =================================================
              GRID
          ================================================= */}

          <CartesianGrid
            stroke="#edf0f5"
            strokeDasharray="4 5"
            vertical={false}
          />


          {/* =================================================
              X AXIS
          ================================================= */}

          <XAxis
            dataKey="name"

            axisLine={false}
            tickLine={false}

            tick={{
              fontSize: 9,
              fill: "#94a3b8",
            }}

            dy={7}
          />


          {/* =================================================
              Y AXIS
          ================================================= */}

          <YAxis
            axisLine={false}
            tickLine={false}

            tick={{
              fontSize: 9,
              fill: "#94a3b8",
            }}

            width={32}
          />


          {/* =================================================
              TOOLTIP
          ================================================= */}

          <Tooltip
            content={<CustomTooltip />}

            cursor={{
              stroke: "#cbd5e1",
              strokeDasharray: "4 4",
            }}
          />


          {/* =================================================
              LEGEND
          ================================================= */}

          <Legend
            verticalAlign="top"
            align="right"

            height={30}

            iconType="circle"

            wrapperStyle={{
              fontSize: "9px",
              color: "#64748b",
            }}
          />


          {/* =================================================
              SCHOOL AREA
          ================================================= */}

          <Area
            type="monotone"

            dataKey="schools"

            name="Schools"

            stroke="#2563eb"

            strokeWidth={3}

            fill="url(#schoolAreaGradient)"

            activeDot={{
              r: 6,
              strokeWidth: 2,
              stroke: "#ffffff",
            }}

            dot={{
              r: 3,
              fill: "#2563eb",
              strokeWidth: 0,
            }}

            animationDuration={1000}
          />


          {/* =================================================
              STUDENT AREA
          ================================================= */}

          <Area
            type="monotone"

            dataKey="students"

            name="Students"

            stroke="#8b5cf6"

            strokeWidth={3}

            fill="url(#studentAreaGradient)"

            activeDot={{
              r: 6,
              strokeWidth: 2,
              stroke: "#ffffff",
            }}

            dot={{
              r: 3,
              fill: "#8b5cf6",
              strokeWidth: 0,
            }}

            animationDuration={1200}
          />

        </AreaChart>

      </ResponsiveContainer>


      {/* =====================================================
          CHART CSS
      ===================================================== */}

      <style>
        {`

          .school-growth-chart {
            width: 100%;
            height: 285px;
          }


          /* ================================================
             TOOLTIP
          ================================================= */

          .school-growth-tooltip {
            min-width: 150px;

            padding: 10px 11px;

            background: #ffffff;

            border: 1px solid #edf0f5;

            border-radius: 10px;

            box-shadow:
              0 10px 30px
              rgba(15, 23, 42, .12);
          }


          .growth-tooltip-heading {
            padding-bottom: 7px;

            margin-bottom: 6px;

            border-bottom:
              1px solid #f0f2f5;

            color: #334155;

            font-size: 9px;
            font-weight: 800;
          }


          .growth-tooltip-item {
            display: flex;
            align-items: center;

            gap: 6px;

            margin-top: 5px;

            color: #64748b;

            font-size: 9px;
          }


          .growth-tooltip-item strong {
            margin-left: auto;

            color: #1f2937;

            font-size: 10px;
            font-weight: 800;
          }


          .tooltip-indicator {
            width: 7px;
            height: 7px;

            border-radius: 50%;
          }


          .school-indicator {
            background: #2563eb;
          }


          .student-indicator {
            background: #8b5cf6;
          }


          /* ================================================
             LOADING / EMPTY
          ================================================= */

          .school-growth-state {
            width: 100%;
            height: 300px;

            display: flex;
            flex-direction: column;

            align-items: center;
            justify-content: center;

            gap: 6px;

            text-align: center;

            color: #94a3b8;
          }


          .school-growth-state strong {
            color: #475569;

            font-size: 11px;
          }


          .school-growth-state span {
            color: #94a3b8;

            font-size: 9px;
          }


          .growth-state-icon {
            width: 45px;
            height: 45px;

            margin-bottom: 5px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 12px;

            background: #eff6ff;

            color: #2563eb;

            font-size: 18px;
          }


          /* ================================================
             SPINNER
          ================================================= */

          .growth-spinner {
            width: 26px;
            height: 26px;

            border: 3px solid #e5edff;

            border-top-color: #2563eb;

            border-radius: 50%;

            animation:
              growthSpin
              .8s linear infinite;
          }


          @keyframes growthSpin {

            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }

          }


          /* ================================================
             MOBILE
          ================================================= */

          @media (max-width: 576px) {

            .school-growth-chart {
              height: 260px;
            }


            .school-growth-state {
              height: 270px;
            }

          }

        `}
      </style>

    </div>

  );

};


export default SchoolGrowthChart;