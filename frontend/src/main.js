import createBarChart from './components/barChartComponent.js';
import createScatterPlot from './components/scatterPlotComponent.js';
import createLineChart from './components/lineChartComponent.js';
import createBubbleChart from './components/bubbleChartComponent.js';
import createStackedBarChart from './components/stackedBarChartComponent.js';
import ChartDataService from './api/ChartDataService.js';

const barChartContainerId = '#bar-chart-container';
const bubbleChartContainerId = '#bubble-chart-container';
const lineChartContainerId = '#line-chart-container';
const scatterChartContainerId = '#scatter-chart-container';
const stackedContainerId = '#stacked-chart-container';

class Main
{
    constructor()
    {
        this.chartDataServiceInstance = new ChartDataService()
    }

    shuffleData(data)
    {
        for (let i = data.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        }
        return data;
    }

    async buildBarChart(year)
    {
        let barChartData = await this.chartDataServiceInstance.getBarChartData(year)
        barChartData = this.shuffleData(barChartData).slice(0, 50);

        createBarChart(barChartData, barChartContainerId);
    }

    async buildScatterPlotChart(year)
    {
        let scatterPlotChartData = await this.chartDataServiceInstance.getScatterChartData(year)

        createScatterPlot(scatterPlotChartData, scatterChartContainerId)
    }

    async buildLineChart()
    {
        let lineChart = await this.chartDataServiceInstance.getLineChartData()

        const transformedData = Object.entries(lineChart.happinessByCountry).map(([year, value]) => ({
            x: year, 
            y: value.toFixed(2)
        }));

        createLineChart(transformedData, lineChartContainerId);
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
        stackedBarChartData = this.shuffleData(stackedBarChartData).slice(0, 50);

        createStackedBarChart(stackedBarChartData, stackedContainerId);
    }

    async buildBubbleChart()
    {
        let bubbleChartData = await this.chartDataServiceInstance.getBubbleChartData(2017)

        createBubbleChart(bubbleChartData, bubbleChartContainerId);
    }
}

let main = new Main()
window.main = main; 
