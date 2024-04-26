class ChartDataService
{
    constructor() { }

    async getBarChartData(year)
    {
        try
        {
            const response = await fetch(`http://localhost:3000/bar-chart-data?year=${year}`);
            if (!response.ok)
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error)
        {
            console.error('Error fetching bar chart data:', error);
            throw error;
        }
    }

    async getScatterChartData(year)
    {
        try
        {
            const response = await fetch(`http://localhost:3000/scatter-chart-data?year=${year}`);
            if (!response.ok)
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error)
        {
            console.error('Error fetching scatter chart data:', error);
            throw error;
        }
    }

    async getLineChartData()
    {
        try
        {
            const response = await fetch('http://localhost:3000/line-chart-data');
            if (!response.ok)
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error)
        {
            console.error('Error fetching line chart data:', error);
            throw error;
        }
    }

    async getBubbleChartData(year)
    {
        try
        {
            const response = await fetch(`http://localhost:3000/bubble-chart-data?year=${year}`);
            if (!response.ok)
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error)
        {
            console.error('Error fetching bubble chart data:', error);
            throw error;
        }
    }

    async getStackedChartData(year)
    {
        try
        {
            const response = await fetch(`http://localhost:3000/stacked-chart-data?year=${year}`);
            if (!response.ok)
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error)
        {
            console.error('Error fetching stacked chart data:', error);
            throw error;
        }
    }
}

export default ChartDataService;
