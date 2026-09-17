
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useDashboardData from "../../hooks/UserDashBoardData";

const ModuleMenuOverview = () => {
  const { modules = [], mappings = [], loading } = useDashboardData();

  const {
    chartData,
    totalModules,
    totalMenus,
    totalSubmenus,
    activeModules,
    inactiveModules,
  } = useMemo(() => {
    const safeModules = Array.isArray(modules) ? modules : [];
    const safeMappings = Array.isArray(mappings) ? mappings : [];

    const totalModules = safeModules.length;

    const totalMenus = safeMappings.reduce(
      (total, item) => total + (item?.menuMappings?.length || 0),
      0,
    );

    const totalSubmenus = safeMappings.reduce(
      (total, item) => total + (item?.subMenuMappings?.length || 0),
      0,
    );

    const activeModules = safeModules.filter(
      (module) =>
        String(module?.status || "").toLowerCase() === "active",
    ).length;

    const inactiveModules = safeModules.filter(
      (module) =>
        String(module?.status || "").toLowerCase() === "inactive",
    ).length;

    const chartData = [
      {
        name: "Modules",
        value: totalModules,
        color: "#2563eb",
        lightColor: "#dbeafe",
      },
      {
        name: "Menus",
        value: totalMenus,
        color: "#7c3aed",
        lightColor: "#ede9fe",
      },
      {
        name: "Submenus",
        value: totalSubmenus,
        color: "#f59e0b",
        lightColor: "#fef3c7",
      },
    ];

    return {
      chartData,
      totalModules,
      totalMenus,
      totalSubmenus,
      activeModules,
      inactiveModules,
    };
  }, [modules, mappings]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) {
      return null;
    }

    const data = payload[0]?.payload;

    return (
      <div className="module-overview-tooltip">
        <div className="module-overview-tooltip-title">
          <span
            className="module-overview-tooltip-dot"
            style={{
              backgroundColor: data?.color,
            }}
          />

          {data?.name}
        </div>

        <div className="module-overview-tooltip-value">
          {data?.value}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="module-overview-loading">
        <div className="module-overview-loading-spinner" />
        <span>Loading module overview...</span>
      </div>
    );
  }

  return (
    <div className="module-overview-wrapper">
      {/* ================= HEADER ================= */}
      <div className="module-overview-top">
        <div>
          <div className="module-overview-eyebrow">
            SYSTEM STRUCTURE
          </div>

          <h5 className="module-overview-title">
            Module & Menu Overview
          </h5>

          <p className="module-overview-subtitle">
            Modules, menus and submenu mapping overview
          </p>
        </div>

        <div className="module-overview-total">
          <span>Total Items</span>
          <strong>
            {totalModules + totalMenus + totalSubmenus}
          </strong>
        </div>
      </div>

      {/* ================= CHART ================= */}
      <div className="module-overview-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 10,
              right: 55,
              left: 15,
              bottom: 10,
            }}
            barCategoryGap="24%"
          >
            <CartesianGrid
              horizontal={false}
              stroke="#e9eef5"
              strokeDasharray="3 3"
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "#98a2b3",
              }}
              allowDecimals={false}
            />

            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              width={72}
              tick={{
                fontSize: 11,
                fontWeight: 700,
                fill: "#344054",
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill: "#f8fafc",
              }}
            />

            <Bar
              dataKey="value"
              radius={[0, 10, 10, 0]}
              barSize={24}
              animationDuration={900}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`bar-${index}`}
                  fill={entry.color}
                />
              ))}

              <LabelList
                dataKey="value"
                position="right"
                offset={10}
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  fill: "#1d2939",
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="module-overview-summary">
        {/* Modules */}
        <div
          className="module-overview-summary-card"
          style={{
            "--summary-color": "#2563eb",
            "--summary-bg": "#eff6ff",
          }}
        >
          <div className="module-overview-summary-icon">
            M
          </div>

          <div className="module-overview-summary-content">
            <span>Modules</span>
            <strong>{totalModules}</strong>
          </div>
        </div>

        {/* Menus */}
        <div
          className="module-overview-summary-card"
          style={{
            "--summary-color": "#7c3aed",
            "--summary-bg": "#f5f3ff",
          }}
        >
          <div className="module-overview-summary-icon">
            MN
          </div>

          <div className="module-overview-summary-content">
            <span>Menus</span>
            <strong>{totalMenus}</strong>
          </div>
        </div>

        {/* Submenus */}
        <div
          className="module-overview-summary-card"
          style={{
            "--summary-color": "#f59e0b",
            "--summary-bg": "#fffbeb",
          }}
        >
          <div className="module-overview-summary-icon">
            SM
          </div>

          <div className="module-overview-summary-content">
            <span>Submenus</span>
            <strong>{totalSubmenus}</strong>
          </div>
        </div>
      </div>

      {/* ================= MODULE STATUS ================= */}
      <div className="module-status-section">
        <div className="module-status-header">
          <span>Module Status</span>

          <span>
            {totalModules} Total
          </span>
        </div>

        <div className="module-status-bar">
          {totalModules > 0 && activeModules > 0 && (
            <div
              className="module-status-active"
              style={{
                width: `${(activeModules / totalModules) * 100}%`,
              }}
            />
          )}

          {totalModules > 0 && inactiveModules > 0 && (
            <div
              className="module-status-inactive"
              style={{
                width: `${(inactiveModules / totalModules) * 100}%`,
              }}
            />
          )}
        </div>

        <div className="module-status-legend">
          <div className="module-status-item">
            <span className="status-dot active" />
            <span>Active</span>
            <strong>{activeModules}</strong>
          </div>

          <div className="module-status-item">
            <span className="status-dot inactive" />
            <span>Inactive</span>
            <strong>{inactiveModules}</strong>
          </div>
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        .module-overview-wrapper {
          width: 100%;
          height: 100%;
          min-height: 350px;
          padding: 2px;
          background: #ffffff;
        }

        /* ================= HEADER ================= */

        .module-overview-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 8px;
        }

        .module-overview-eyebrow {
          color: #667085;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.2px;
          margin-bottom: 3px;
        }

        .module-overview-title {
          margin: 0;
          color: #101828;
          font-size: 15px;
          font-weight: 750;
          line-height: 1.25;
        }

        .module-overview-subtitle {
          margin: 3px 0 0;
          color: #98a2b3;
          font-size: 9px;
          line-height: 1.4;
        }

        .module-overview-total {
          min-width: 72px;
          padding: 7px 10px;
          text-align: center;
          background: #f8fafc;
          border: 1px solid #eaecf0;
          border-radius: 10px;
        }

        .module-overview-total span {
          display: block;
          color: #98a2b3;
          font-size: 8px;
          font-weight: 600;
          margin-bottom: 1px;
        }

        .module-overview-total strong {
          color: #1d2939;
          font-size: 17px;
          font-weight: 800;
        }

        /* ================= CHART ================= */

        .module-overview-chart {
          width: 100%;
          height: 175px;
          margin-top: 2px;
        }

        .module-overview-tooltip {
          min-width: 105px;
          padding: 9px 11px;
          background: #ffffff;
          border: 1px solid #eaecf0;
          border-radius: 10px;
          box-shadow: 0 8px 25px rgba(16, 24, 40, 0.12);
        }

        .module-overview-tooltip-title {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #475467;
          font-size: 10px;
          font-weight: 700;
        }

        .module-overview-tooltip-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
        }

        .module-overview-tooltip-value {
          margin-top: 3px;
          color: #101828;
          font-size: 16px;
          font-weight: 800;
        }

        /* ================= SUMMARY ================= */

        .module-overview-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 5px;
        }

        .module-overview-summary-card {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          padding: 8px 9px;
          background: var(--summary-bg);
          border: 1px solid color-mix(
            in srgb,
            var(--summary-color) 12%,
            #ffffff
          );
          border-radius: 10px;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .module-overview-summary-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px
            color-mix(
              in srgb,
              var(--summary-color) 10%,
              transparent
            );
        }

        .module-overview-summary-icon {
          width: 28px;
          height: 28px;
          flex: 0 0 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--summary-color);
          background: #ffffff;
          border-radius: 8px;
          font-size: 8px;
          font-weight: 900;
          box-shadow: 0 2px 5px rgba(16, 24, 40, 0.05);
        }

        .module-overview-summary-content {
          min-width: 0;
        }

        .module-overview-summary-content span {
          display: block;
          color: #667085;
          font-size: 8px;
          font-weight: 600;
          line-height: 1.2;
        }

        .module-overview-summary-content strong {
          display: block;
          margin-top: 1px;
          color: #101828;
          font-size: 14px;
          font-weight: 800;
          line-height: 1.2;
        }

        /* ================= STATUS ================= */

        .module-status-section {
          margin-top: 10px;
          padding: 8px 10px;
          background: #f8fafc;
          border: 1px solid #eaecf0;
          border-radius: 10px;
        }

        .module-status-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
          color: #475467;
          font-size: 8px;
          font-weight: 700;
        }

        .module-status-header span:last-child {
          color: #98a2b3;
          font-weight: 600;
        }

        .module-status-bar {
          width: 100%;
          height: 6px;
          display: flex;
          overflow: hidden;
          background: #eaecf0;
          border-radius: 20px;
        }

        .module-status-active {
          height: 100%;
          background: #22c55e;
          transition: width 0.5s ease;
        }

        .module-status-inactive {
          height: 100%;
          background: #cbd5e1;
          transition: width 0.5s ease;
        }

        .module-status-legend {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 6px;
        }

        .module-status-item {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #667085;
          font-size: 8px;
          font-weight: 600;
        }

        .module-status-item strong {
          color: #344054;
          font-size: 9px;
          font-weight: 800;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
        }

        .status-dot.active {
          background: #22c55e;
        }

        .status-dot.inactive {
          background: #94a3b8;
        }

        /* ================= LOADING ================= */

        .module-overview-loading {
          min-height: 350px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #98a2b3;
          font-size: 10px;
          background: #ffffff;
          border-radius: 12px;
        }

        .module-overview-loading-spinner {
          width: 22px;
          height: 22px;
          border: 2px solid #dbeafe;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: moduleOverviewSpin 0.8s linear infinite;
        }

        @keyframes moduleOverviewSpin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 767px) {
          .module-overview-top {
            align-items: center;
          }

          .module-overview-total {
            min-width: 65px;
          }

          .module-overview-chart {
            height: 165px;
          }

          .module-overview-summary {
            gap: 6px;
          }

          .module-overview-summary-card {
            padding: 7px;
            gap: 5px;
          }

          .module-overview-summary-icon {
            width: 24px;
            height: 24px;
            flex-basis: 24px;
          }

          .module-overview-summary-content strong {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .module-overview-title {
            font-size: 13px;
          }

          .module-overview-subtitle {
            font-size: 8px;
          }

          .module-overview-chart {
            height: 155px;
          }

          .module-overview-summary {
            grid-template-columns: 1fr;
          }

          .module-overview-summary-card {
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default ModuleMenuOverview;