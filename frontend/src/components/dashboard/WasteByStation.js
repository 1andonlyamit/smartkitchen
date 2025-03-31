import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

function WasteByStation() {
  // Hardcoded data for waste by station
  const data = [
    { name: "Main Kitchen", value: 30 },
    { name: "Prep Station", value: 25 },
    { name: "Salad Bar", value: 15 },
    { name: "Dessert Station", value: 10 },
    { name: "Grill", value: 20 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="card bg-dark text-white border-secondary shadow-sm h-100">
      <div className="card-header bg-dark border-secondary">
        <h5 className="mb-0">Waste by Station</h5>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Percentage']}
              contentStyle={{ backgroundColor: '#333', borderColor: '#555' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WasteByStation;