import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function WasteCostChart() {
  // Hardcoded data for waste cost chart
  const data = [
    { name: "Jan", cost: 4000 },
    { name: "Feb", cost: 3000 },
    { name: "Mar", cost: 2000 },
    { name: "Apr", cost: 2780 },
    { name: "May", cost: 1890 },
    { name: "Jun", cost: 2390 },
  ];

  return (
    <div className="card bg-dark text-white border-secondary shadow-sm h-100">
      <div className="card-header bg-dark border-secondary">
        <h5 className="mb-0">Waste Cost Trends</h5>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
            <Legend wrapperStyle={{ color: '#ccc' }} />
            <Bar dataKey="cost" name="Waste Cost ($)" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WasteCostChart;