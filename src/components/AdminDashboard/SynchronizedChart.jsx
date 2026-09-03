import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    students: 120,
    schools: 5,
  },
  {
    name: "Feb",
    students: 150,
    schools: 7,
  },
  {
    name: "Mar",
    students: 180,
    schools: 8,
  },
  {
    name: "Apr",
    students: 220,
    schools: 10,
  },
  {
    name: "May",
    students: 250,
    schools: 12,
  },
  {
    name: "Jun",
    students: 280,
    schools: 14,
  },
  {
    name: "Jul",
    students: 320,
    schools: 16,
  },
];

const SynchronizedChart = () => {
  return (
    <div className="card  border-0">
      <div className="card-body">

        <h6 className="fw-semibold mb-3">
          Students & Schools Overview
        </h6>

        <div style={{ width: "100%", height: "220px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="students"
                stroke="#0d6efd"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="schools"
                stroke="#198754"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default SynchronizedChart;