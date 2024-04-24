import createBarChart from './components/barChartComponent.js';
import createPieChart from './components/pieChartComponent.js';

const data = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 25 },
    { label: 'E', value: 18 },
    { label: 'F', value: 23 },
];

// Container id where the chart will be rendered
const containerId = '#chart-container';

// Call the createBarChart function
createBarChart(data, containerId);
createPieChart(data, containerId);
