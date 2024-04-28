import createBarChart from './components/barChartComponent.js';
import createScatterPlot from './components/scatterPlotComponent.js';
import createLineChart from './components/lineChartComponent.js';
import createBubbleChart from './components/bubbleChartComponent.js';
import createStackedBarChart from './components/stackedBarChartComponent.js';
import ChartDataService from './api/ChartDataService.js';
import localStorageHelper from './helpers/localStorageHelper.js';

const containerId = '#chart-container';

class Main
{
    constructor()
    {
        this.chartDataServiceInstance = new ChartDataService()
    }

    async buildBarChart(year)
    {
        let barChartData = await this.chartDataServiceInstance.getBarChartData(year)
        barChartData = barChartData.slice(0, 50);

        createBarChart(barChartData, containerId);
    }

    async buildScatterPlotChart(year)
    {
        let scatterPlotChartData = await this.chartDataServiceInstance.getScatterChartData(year)

        createScatterPlot(scatterPlotChartData, containerId)
    }

    async buildLineChart()
    {
        let lineChart = await this.chartDataServiceInstance.getLineChartData()

        const transformedData = Object.entries(lineChart.happinessByCountry).map(([year, value]) => ({
            x: year, // Convert year to integer
            y: value.toFixed(2) // Keep only 2 decimal places for the value
        }));

        createLineChart(transformedData, containerId);
    }

    async buildStackedBarChart(year)
    {
        const stackedBarChartMockData = [
            { category: 'A', value1: 10, value2: 20, value3: 15 },
            { category: 'B', value1: 15, value2: 25, value3: 10 },
            { category: 'C', value1: 20, value2: 15, value3: 25 },
        ];
        stackedBarChartMockData.columns = ['category', 'value1', 'value2', 'value3'];

        let stackedBarChartData = await this.chartDataServiceInstance.getStackedChartData(year)
        stackedBarChartData = stackedBarChartData.slice(0, 40);

        createStackedBarChart(stackedBarChartData, containerId);
    }

    async buildBubbleChart()
    {
        let bubbleChartData = await this.chartDataServiceInstance.getBubbleChartData(2017)
        bubbleChartData = bubbleChartData.slice(0, 150);

        createBubbleChart(bubbleChartData, containerId);
    }
}

let main = new Main()
window.main = main; 
