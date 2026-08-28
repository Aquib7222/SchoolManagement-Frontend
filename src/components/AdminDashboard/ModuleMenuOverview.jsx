

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import useDashboardData from "../../hooks/UserDashBoardData";

const COLORS = ["#2f80ed", "#f7931e"];

const ModuleMenuOverview = () => {
  const { modules = [], mappings = [], loading } = useDashboardData();

  // Active / Inactive modules
  const activeModules = modules.filter(
    (module) => module.status === "Active",
  ).length;

  const inactiveModules = modules.filter(
    (module) => module.status === "Inactive",
  ).length;

  const moduleData = [
    {
      name: "Active Modules",
      value: activeModules,
    },
    {
      name: "Inactive Modules",
      value: inactiveModules,
    },
  ];

  const totalModules = moduleData.reduce(
    (total, item) => total + item.value,
    0,
  );

  // Total Menus
  const totalMenuMapping = mappings.reduce(
    (total, item) => total + (item.menuMappings?.length || 0),
    0,
  );

  // Total Submenus
  const totalSubMenuMapping = mappings.reduce(
    (total, item) => total + (item.subMenuMappings?.length || 0),
    0,
  );

  if (loading) {
    return (
      <div className="card border shadow rounded-3">
        <div className="card-body">Loading...</div>
      </div>
    );
  }

  return (
    <div className="card border shadow rounded-3">
      <div className="card-body">
        <h5 className="fw-semibold mb-3">Module & Menu Overview</h5>

        <div className="row align-items-center">
          {/* DONUT CHART */}
          <div className="col-12 col-md-8">
            <div
              style={{
                width: "100%",
                height: "200px",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moduleData}
                    cx="48%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {moduleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip />

                  <Legend
                    verticalAlign="middle"
                    align="right"
                    layout="vertical"
                    content={({ payload }) => (
                      <div className="d-flex flex-column gap-4">
                        {payload?.map((entry, index) => {
                          const value = entry.payload?.value || 0;

                          const percentage =
                            totalModules > 0
                              ? ((value / totalModules) * 100).toFixed(0)
                              : 0;

                          return (
                            <div
                              key={index}
                              className="d-flex align-items-center"
                            >
                              {/* Dot */}
                              <span
                                className="rounded-circle me-2"
                                style={{
                                  width: "12px",
                                  height: "12px",
                                  backgroundColor: entry.color,
                                  display: "inline-block",
                                  flexShrink: 0,
                                }}
                              />

                              {/* Name */}
                              <small className="fw-medium me-3">
                                {entry.value}
                              </small>

                              {/* Count */}
                              <small className="fw-semibold">{value}</small>

                              {/* Percentage */}
                              <small className="ms-2 text-muted">
                                ({percentage}%)
                              </small>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-12 col-md-4">
            {/* Total Menus */}
            <div className="border rounded-3 p-3 mb-3">
              <div className="text-muted mb-1">Total Menus</div>

              <h2 className="mb-0">{totalMenuMapping}</h2>
            </div>

            {/* Total Submenus */}
            <div className="border rounded-3 p-3">
              <div className="text-muted mb-1">Total Submenus</div>

              <h2 className="mb-0">{totalSubMenuMapping}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleMenuOverview;
