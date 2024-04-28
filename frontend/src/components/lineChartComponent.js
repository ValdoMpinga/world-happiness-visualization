function createLineChart(data, containerId)
{
    // Set the dimensions of the SVG container
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select(containerId)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create a group for the line chart and remove button
    const lineGroup = svg.append('g')
        .attr('class', 'line-group');

    // Create scales
    const xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
        .range([margin.left, innerWidth]);


    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => parseFloat(d.y))]) // Convert y values to numbers
        .range([innerHeight, margin.top]);

    // Define the line function
    const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    // Append the line path
    lineGroup.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line);

    // Create x-axis
    const xAxis = d3.axisBottom(xScale);
    lineGroup.append('g')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xAxis);

    // Create y-axis
    const yAxis = d3.axisLeft(yScale);
    lineGroup.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxis);

    // Add labels
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - margin.bottom / 2)
        .style('text-anchor', 'middle')
        .text('X Axis Label');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', margin.left / 2)
        .style('text-anchor', 'middle')
        .text('Y Axis Label');

    // Create the remove button
    const removeButton = lineGroup.append('g')
        .attr('class', 'remove-button')
        .attr('transform', `translate(${width - margin.right - 80}, ${margin.top})`)
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
        window.appState = window.appState.filter(item => item.chartType !== 'line');
        localStorage.setItem('appState', JSON.stringify(window.appState));
    }
}

export default createLineChart;
