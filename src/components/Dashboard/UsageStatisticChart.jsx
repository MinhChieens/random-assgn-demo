import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
//add sample data random
const data = [
  { date: '6/2023', logins: 2 },
  { date: '7/2023', logins: 2 },
    { date: '8/2023', logins: 3 },
    { date: '9/2023', logins: 3},
    { date: '10/2023', logins: 4 },
    { date: '11/2023', logins: 4 },
    { date: '12/2023', logins: 5 },
    { date: '1/2024', logins: 5 },
    { date: '2/2024', logins: 3 },
    { date: '3/2024', logins: 3 },
    { date: '5/2024', logins: 2 },
];

const UsageStatisticsChart = () => (
    <BarChart
    width={1000}
    height={400}
    data={data}
    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
    className="bg-white rounded-lg shadow-md"
  >
    <text
      x={500}
      y={380}
      textAnchor="middle"
      dominantBaseline="middle"
      className="text-lg font-bold"
    >
      Login Numbers Over Time
    </text>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis label={{ value: 'Login Number', angle: -90, position: 'insideLeft' }} />
    <Tooltip />
    <Bar dataKey="logins" fill="#8884d8" />
  </BarChart>
  
);

export default UsageStatisticsChart;
