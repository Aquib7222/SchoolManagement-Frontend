

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Tooltip,
  LabelList,
  Cell,
} from "recharts";
import {
  LuUsers,
  LuGraduationCap,
} from "react-icons/lu";

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
  "#f97316",
  "#14b8a6",
  "#6366f1",
  "#eab308",
];

const ClassWiseStudentCharts = ({ data }) => {

  // Same data structure as your original chart
  const chartData = useMemo(() => {
    const list = Array.isArray(data) ? data : [];

    return list
      .filter(
        (item) =>
          item?.className &&
          Number(item?.totalStudents) > 0
      )
      .sort(
        (a, b) =>
          Number(b.totalStudents) -
          Number(a.totalStudents)
      );
  }, [data]);

  const totalStudents = chartData.reduce(
    (total, item) =>
      total + Number(item.totalStudents || 0),
    0
  );

  const highestClass = chartData[0];

  if (chartData.length === 0) {
    return (
      <>
        <style>{`
          .class-funnel-empty {
            height: 220px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          .class-funnel-empty-icon {
            width: 56px;
            height: 56px;
            border-radius: 16px;
            background: #eff6ff;
            color: #2563eb;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 26px;
            margin-bottom: 10px;
          }

          .class-funnel-empty-title {
            font-size: 14px;
            font-weight: 700;
            color: #1e293b;
          }

          .class-funnel-empty-text {
            margin-top: 4px;
            font-size: 11px;
            color: #94a3b8;
          }
        `}</style>

        <div className="class-funnel-empty">
          <div className="class-funnel-empty-icon">
            <LuUsers />
          </div>

          <div className="class-funnel-empty-title">
            No Student Data
          </div>

          <div className="class-funnel-empty-text">
            Class-wise student data is not available.
          </div>
        </div>
      </>
    );
  }

  const CustomTooltip = ({
    active,
    payload,
  }) => {
    if (!active || !payload?.length) {
      return null;
    }

    const item = payload[0]?.payload;

    return (
      <div className="class-funnel-tooltip">

        <div className="class-funnel-tooltip-class">
          {item.className}
        </div>

        <div className="class-funnel-tooltip-number">
          {item.totalStudents}
        </div>

        <div className="class-funnel-tooltip-label">
          Students
        </div>

      </div>
    );
  };

  return (
    <>
      <style>{`
        .class-funnel-container {
          width: 100%;
          height: 100%;
          padding: 2px 0;
        }

        /* HEADER */

        .class-funnel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0;
        }

        .class-funnel-total {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 10px;
          background: #eff6ff;
          color: #2563eb;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 700;
        }

        .class-funnel-total svg {
          font-size: 14px;
        }

        .class-funnel-class-count {
          color: #94a3b8;
          font-size: 10px;
          font-weight: 600;
        }

        /* CHART */

        .class-funnel-chart {
          width: 100%;
          height: 205px;
        }

        /* TOOLTIP */

        .class-funnel-tooltip {
          min-width: 115px;
          padding: 10px 12px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow:
            0 10px 30px
            rgba(15, 23, 42, 0.12);
        }

        .class-funnel-tooltip-class {
          color: #64748b;
          font-size: 11px;
          font-weight: 700;
        }

        .class-funnel-tooltip-number {
          margin-top: 3px;
          color: #2563eb;
          font-size: 22px;
          line-height: 1;
          font-weight: 800;
        }

        .class-funnel-tooltip-label {
          margin-top: 4px;
          color: #94a3b8;
          font-size: 9px;
        }

        /* FOOTER */

        .class-funnel-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 7px 10px;
          background: #f8fafc;
          border: 1px solid #eef2f7;
          border-radius: 10px;
          font-size: 9px;
          color: #64748b;
          font-weight: 600;
        }

        .class-funnel-footer-left,
        .class-funnel-footer-right {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .class-funnel-footer svg {
          color: #2563eb;
          font-size: 13px;
        }

        .class-funnel-footer strong {
          color: #0f172a;
          font-weight: 800;
        }

        @media (max-width: 575px) {
          .class-funnel-class-count {
            display: none;
          }

          .class-funnel-chart {
            height: 195px;
          }
        }
      `}</style>

      <div className="class-funnel-container">

        {/* HEADER */}

        <div className="class-funnel-header">

          <div className="class-funnel-total">
            <LuUsers />
            {totalStudents} Students
          </div>

          <div className="class-funnel-class-count">
            {chartData.length} Classes
          </div>

        </div>

        {/* FUNNEL */}

        <div className="class-funnel-chart">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <FunnelChart>

              <Tooltip
                content={<CustomTooltip />}
              />

              <Funnel
                data={chartData}
                dataKey="totalStudents"
                nameKey="className"
                isAnimationActive={true}
                animationDuration={900}
                animationEasing="ease-out"
              >

                <LabelList
                  dataKey="className"
                  position="right"
                  fill="#334155"
                  stroke="none"
                  fontSize={10}
                  fontWeight={700}
                />

                {chartData.map(
                  (entry, index) => (
                    <Cell
                      key={`funnel-cell-${index}`}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Funnel>

            </FunnelChart>

          </ResponsiveContainer>

        </div>

        {/* FOOTER */}

        <div className="class-funnel-footer">

          <div className="class-funnel-footer-left">
            <LuGraduationCap />

            <span>
              Largest Class:
              {" "}
              <strong>
                {highestClass.className}
              </strong>
            </span>
          </div>

          <div className="class-funnel-footer-right">
            <LuUsers />

            <span>
              <strong>
                {highestClass.totalStudents}
              </strong>
              {" "}Students
            </span>
          </div>

        </div>

      </div>
    </>
  );
};

export default ClassWiseStudentCharts;

