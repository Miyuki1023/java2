import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: ['red', 'blue', 'yellow'],
    }]
  };

  return (
    <div style={{ width: 400, height: 400 }}>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
