import React, { useEffect, useRef, useState } from 'react';
import 'chart.js/auto'; // Import 'chart.js/auto' to ensure proper initialization
import { Pie } from 'react-chartjs-2';
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);


const Charts = ({ issues }) => {
  const [severityData, setSeverityData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  })

  const [priorityData, setPriorityData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  })

  const calculateSeverity = (issues) => {
    const severityCounts = {};
    issues.forEach((issue) => {
      const severity = issue.severity;
      if (severity) {
        if (severityCounts[severity]) {
          severityCounts[severity]++;
        } else {
          severityCounts[severity] = 1;
        }
      }
    });
    return severityCounts;
  };
  
  useEffect(() => {
    setSeverityData({
      labels: Object.keys(severityCounts),
      datasets: [
        {
          data: Object.values(severityCounts),
          color: ['red', 'blue', 'green'],
          backgroundColor: ['#33b101', '#db4949', '#FFCE56', '#4BC0C0', '#9966FF'],
          options: {
            responsive: true,
            maintainAspectRatio: false,
        },
          datalabels: {
            color: 'white',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size: '24px'
                }
              },              
            }
          }
        },
      ],
    });

    setPriorityData({
      labels: Object.keys(priorityCounts),
      datasets: [
        {
          data: Object.values(priorityCounts),
          color: ['red', 'blue', 'green'],
          backgroundColor: ['#db4949', '#33b101', '#FFCE56', '#4BC0C0', '#9966FF'],
          datalabels: {
            color: 'white',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size: '24px'
                }
              },              
            }
          }
        },
      ],
    });
  }, [issues]);

  const calculatePriority = (issues) => {
    const priorityCounts = {};
    issues.forEach((issue) => {
      const priority = issue.priority;
      if (priority) {
        if (priorityCounts[priority]) {
          priorityCounts[priority]++;
        } else {
          priorityCounts[priority] = 1;
        }
      }
    });
    return priorityCounts;
  };
  const priorityCounts = calculatePriority(issues);
  const severityCounts = calculateSeverity(issues);
 
  return (
    <div className='chart-wrapper'>
        <h1 className='chart-heading'>Charts</h1>
        <div className='chart-section'>
          <h2 className='chart-title'>Severity</h2>
          {/* <Pie data={severityData} className='chart' width={300} height={300} /> */}
          <Pie data={severityData} className='chart' />

        </div>
        <br />
        <div className='chart-section'>
          <h2 className='chart-title'>Priority</h2>
          <Pie data={priorityData} className='chart'/>
        </div>
    </div>
  );
};

export default Charts;