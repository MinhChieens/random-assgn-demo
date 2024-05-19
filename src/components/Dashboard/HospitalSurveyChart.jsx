// src/HospitalSurveyChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample data
const data = [
  { month: 'Jan', surveyValue: 65 },
  { month: 'Feb', surveyValue: 59 },
  { month: 'Mar', surveyValue: 80 },
  { month: 'Apr', surveyValue: 81 },
  { month: 'May', surveyValue: 56 },
  // Add the rest of the months here
];

const HospitalSurveyChart = () => (
    <div className="flex flex-col items-center p-4 bg-gray-100">
    
  
    <LineChart
  width={730}
  height={300}
  data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
  className="bg-white rounded-lg shadow-md"
>
  
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="month" />
  <YAxis label={{ value: 'Patient', angle: -90, position: 'insideLeft' }} />
  <Tooltip />
  <Line type="monotone" dataKey="surveyValue" stroke="#8884d8" />
  <text
    x={360}
    y={280}
    textAnchor="middle"
    dominantBaseline="middle"
    className="text-lg font-bold"
  >
    Number of Patients Over Time
  </text>
</LineChart>


  </div>
  
);

export default HospitalSurveyChart;
