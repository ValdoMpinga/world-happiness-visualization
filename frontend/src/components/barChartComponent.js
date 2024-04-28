function createBarChart(apiData, containerId)
{
    const main = window.main;


    // Extract labels and values from the API data
    const data = apiData.map(item => ({
        label: item.Country,
        value: parseFloat(item.HappinessScore)
    }));

    // Set the dimensions of the SVG container
    const width = 1000;
    const height = 400;

    // Set the margins
    const margin = { top: 60, right: 20, bottom: 50, left: 100 };

    // Calculate the inner width and height
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create the SVG container
    const svg = d3.select(containerId)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create a group element for the chart and dropdown
    const chartGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add a dropdown for selecting the year
    const dropdown = chartGroup.append('foreignObject')
        .attr('class', 'year-dropdown')
        .attr('width', 120)
        .attr('height', 30)
        .attr('x', innerWidth - 120)
        .attr('y', -40)
        .append('xhtml:select')
        .attr('class', 'year-select')
        .on('change', function ()
        {
            console.log(main);
            const selectedYear = this.value;
            // Here you can handle the change of year and update the chart accordingly
            console.log('Selected year:', selectedYear);
            console.log(typeof (selectedYear));
            removeChart()
            setTimeout(() =>
            {
                main.buildBarChart(parseInt(selectedYear));
            }, 300)

        });

    // Add options to the dropdown
    const years = ['2015', '2016', '2017', '2018', '2019'];
    dropdown.selectAll('option')
        .data(years)
        .enter()
        .append('xhtml:option')
        .attr('value', d => d)
        .text(d => d);

    // Create a group element for the chart
    const chart = chartGroup.append('g');

    // Define the scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, innerWidth])
        .padding(0.2); // Adjust the padding between bars

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([innerHeight, 0]);

    // Create the bars
    chart.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.label))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(d.value))
        .attr('fill', 'steelblue');

    // Create the x-axis
    const xAxis = d3.axisBottom(xScale);
    chart.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-45)');

    // Create the y-axis
    const yAxis = d3.axisLeft(yScale);
    chart.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);

    // Add labels
    chart.append('text')
        .attr('class', 'x-label')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + margin.bottom / 1)
        .style('text-anchor', 'middle')
        .text('Countries');

    chart.append('text')
        .attr('class', 'y-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -innerHeight / 2)
        .attr('y', -margin.left * 0.75)
        .style('text-anchor', 'middle')
        .text('Happiness Score');

    const removeButton = svg.append('g')
        .attr('class', 'remove-button')
        .attr('transform', `translate(${width - margin.right - 80}, ${margin.top - 40})`)
        .attr('cursor', 'pointer')
        .on('click', removeChart);

    removeButton.append('rect')
        .attr('width', 70)
        .attr('height', 20)
        .attr('fill', 'red');

    // Add text to the remove button
    removeButton.append('text')
        .attr('x', 35)
        .attr('y', 15)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .text('Remove');

    // Function to remove the chart
    function removeChart()
    {
        d3.select(containerId).selectAll('svg').remove();
        window.appState = window.appState.filter(item => item.chartType !== 'bar');
        localStorage.setItem('appState', JSON.stringify(window.appState));
    }
}

export default createBarChart;
