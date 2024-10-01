import React from 'react';
import { Line } from 'react-chartjs-2';
import './HealthMetrics.css'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HealthMetrics = () => {
    // Static data for demonstration
    const pulseRateData = [72, 75, 78, 70, 74, 80, 73];
    const bloodPressureData = [120, 118, 119, 121, 122, 115, 116];
    const bloodSugarData = [90, 95, 92, 88, 91, 87, 90];
    const oxygenSaturationData = [95, 96, 94, 95, 97, 95, 96];

    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']; // Example labels for a week

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Pulse Rate (bpm)',
                data: pulseRateData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
            {
                label: 'Blood Pressure (mmHg)',
                data: bloodPressureData,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
            {
                label: 'Blood Sugar (mg/dL)',
                data: bloodSugarData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: 'Oxygen Saturation (%)',
                data: oxygenSaturationData,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div className="health-metrics-container" id="healthMetricsContainer">
            <h2 className="health-metrics-title" id="healthMetricsTitle">Health Metrics</h2>
            <div className="chart-container" id="chartContainer">
                <Line data={data} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default HealthMetrics;
