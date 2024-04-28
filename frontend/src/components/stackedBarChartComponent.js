function createStackedBarChart(data, containerId)
{
    // Set the dimensions of the SVG container
    const width = 1000;
    const height = 400;
    const margin = { top: 20, right: 150, bottom: 100, left: 50 }; // Increased right margin for legends
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select(containerId)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create a group for the chart and remove button
    const chartGroup = svg.append('g')
        .attr('class', 'chart-group');

    // Extract the keys for stacked bars (excluding "Country" and "HealthyLife")
    const keys = Object.keys(data[0]).filter(key => key !== 'Country' && key !== 'HealthyLife');

    // Define the stack generator
    const stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

    // Stack the data
    const series = stack(data);

    // Create scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Country))
        .range([margin.left, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
        .nice()
        .range([innerHeight, margin.top]);

    // Create color scale
    const color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeCategory10);

    // Create groups for each series
    const groups = chartGroup.selectAll('g')
        .data(series)
        .enter()
        .append('g')
        .style('fill', (d, i) => color(i));

    // Create rectangles for each segment
    groups.selectAll('rect')
        .data(d => d)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.data.Country))
        .attr('y', d => yScale(d[1]))
        .attr('height', d => yScale(d[0]) - yScale(d[1]))
        .attr('width', xScale.bandwidth());

    // Create x-axis
    const xAxis = d3.axisBottom(xScale);
    chartGroup.append('g')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-45)');

    // Create y-axis
    const yAxis = d3.axisLeft(yScale);
    chartGroup.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxis);

    // Add labels
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - margin.bottom / 2)
        .style('text-anchor', 'middle')
        .text('Country');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', margin.left / 2)
        .style('text-anchor', 'middle')
        .text('Healthy Life');

    // Add legend
    const legend = svg.append('g')
        .attr('transform', `translate(${innerWidth - 10}, 20)`)
        .selectAll('g')
        .data(keys.slice().reverse())
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`);

    legend.append('rect')
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', color);

    legend.append('text')
        .attr('x', 24)
        .attr('y', 9)
        .attr('dy', '.35em')
        .text(d => d);

    // Create the remove button
    const removeButton = chartGroup.append('g')
        .attr('class', 'remove-button')
        .attr('transform', `translate(${width - margin.right - 140}, ${margin.top})`)
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
        svg.remove();
        window.appState = window.appState.filter(item => item.chartType !== 'stacked');
        // localStorage.setItem('appState', JSON.stringify(window.appState));
    }
}

// Export the function
export default createStackedBarChart;
