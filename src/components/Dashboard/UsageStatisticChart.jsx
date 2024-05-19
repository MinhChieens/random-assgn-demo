import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
//add sample data random
const data = [
  { date: '12/2023', logins: 20 },
  { date: '11/2023', logins: 25 },
    { date: '10/2023', logins: 30 },
    { date: '9/2023', logins: 35 },
    { date: '8/2023', logins: 40 },
    { date: '7/2023', logins: 45 },
    { date: '6/2023', logins: 50 },
    { date: '5/2023', logins: 55 },
    { date: '4/2023', logins: 30 },
    { date: '3/2023', logins: 35 },
    { date: '2/2023', logins: 20 },
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
