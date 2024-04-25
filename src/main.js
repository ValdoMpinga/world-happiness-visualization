import createBarChart from './components/barChartComponent.js';
import createPieChart from './components/pieChartComponent.js';
import createScatterPlot from './components/scatterPlotComponent.js';
import createLineChart from './components/lineChartComponent.js';

const data = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 25 },
    { label: 'E', value: 18 },
    { label: 'F', value: 23 },
];

const scatterPlotData = [
    { x: 1, y: 1 },
    { x: 2, y: 5 },
    { x: 3, y: 15 },
    { x: 4, y: 10 },
    { x: 5, y: 18 },
    { x: 6, y: 20 },
    { x: 7, y: 27 },
    { x: 8, y: 27 },
    { x: 9, y: 12 },
    { x: 10, y: 28 },
    { x: 11, y: 14 },
    { x: 12, y: 24 },
    { x: 13, y: 19 },
    { x: 14, y: 23 },
    { x: 15, y: 16 }
];



// Container id where the chart will be rendered
const containerId = '#chart-container';

// Call the createBarChart function
createBarChart(data, containerId);
createPieChart(data, containerId);
createScatterPlot(scatterPlotData, containerId);
createLineChart(scatterPlotData, containerId);
