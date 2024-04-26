import createBarChart from './components/barChartComponent.js';
import createPieChart from './components/pieChartComponent.js';
import createScatterPlot from './components/scatterPlotComponent.js';
import createLineChart from './components/lineChartComponent.js';
import createBubbleChart from './components/bubbleChartComponent.js';
import createStackedBarChart from './components/stackedBarChartComponent.js';
import ChartDataService from './api/ChartDataService.js';

const containerId = '#chart-container';
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





class Main{
    constructor(){
        this.chartDataServiceInstance = new ChartDataService()
    }




    // const bubbleChartData = [
    //     { x: 1, y: 10, size: 30 },
    //     { x: 2, y: 20, size: 40 },
    //     { x: 3, y: 15, size: 20 },
    //     { x: 4, y: 25, size: 35 },
    //     { x: 5, y: 18, size: 25 },
    //     { x: 6, y: 22, size: 45 },
    //     { x: 7, y: 12, size: 30 },
    //     { x: 8, y: 16, size: 25 },
    //     { x: 9, y: 28, size: 40 },
    //     { x: 10, y: 20, size: 35 }
    // ];


    async buildBarChart(year)
    {
        let barChartData = await this.chartDataServiceInstance.getBarChartData(year)
        barChartData = barChartData.slice(0, 50);
        console.log(barChartData);

        createBarChart(barChartData, containerId);
    }
    
    async buildScatterPlotChart(year)
    {
        let scatterPlotChartData = await this.chartDataServiceInstance.getScatterChartData(year)

        createScatterPlot(scatterPlotChartData,containerId)
    }


    async buildLineChart()
    {
        let lineChart = await this.chartDataServiceInstance.getLineChartData()
        console.log(lineChart.happinessByCountry);

        const transformedData = Object.entries(lineChart.happinessByCountry).map(([year, value]) => ({
            x: year, // Convert year to integer
            y: value.toFixed(2) // Keep only 2 decimal places for the value
        }));
 
        createLineChart(transformedData, containerId);
    }

    async buildStackedBarChart()
    {
        const stackedBarChartMockData = [
            { category: 'A', value1: 10, value2: 20, value3: 15 },
            { category: 'B', value1: 15, value2: 25, value3: 10 },
            { category: 'C', value1: 20, value2: 15, value3: 25 },
        ];
        stackedBarChartMockData.columns = ['category', 'value1', 'value2', 'value3'];

        let stackedBarChartData = await this.chartDataServiceInstance.getStackedChartData(2017)
        console.log(stackedBarChartData);


        createStackedBarChart(stackedBarChartMockData, containerId);
    }
    // createBarChart(data, containerId);
    // createPieChart(data, containerId);
    // createScatterPlot(scatterPlotData, containerId);
    // createLineChart(scatterPlotData, containerId);
    // createBubbleChart(bubbleChartData, containerId);
    // createStackedBarChart(stackedBarChartData, containerId);


    // buildCharts()
    // {
    //     createBarChart(data, containerId);

    // }
}

let main = new Main()
// main.buildBarChart(2017)
// main.buildScatterPlotChart(2017)
// main.buildLineChart()
main.buildStackedBarChart()
