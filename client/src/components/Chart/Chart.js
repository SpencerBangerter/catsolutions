import React from 'react'
import { Bar, Pie } from 'react-chartjs-2';



export function BarChart(props) {
  const data = {
    labels: props.chart.labels,
    datasets: [
      {
        label: props.label,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: props.chart.data
      }
    ]
  };
  return (
    <div>
      <h3>{props.title}</h3>
      <Bar data={data}/>
    </div>
  )
}

export function PieChart(props) {
  const data = {
    labels: props.chart.labels,
    datasets: [{
      data: props.chart.data,
      backgroundColor: [
        '#FFCE56',
        '#36A2EB'
      ],
      hoverBackgroundColor: [
        '#FFCE56',
        '#36A2EB'
      ]
    }]
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <Pie data={data}/>
    </div>
  )
}
