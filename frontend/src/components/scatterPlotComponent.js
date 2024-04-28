function createScatterPlot(data, containerId)
{
    // Set the dimensions of the SVG container
    const width = 1000;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select(containerId)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create a group for the scatter plot and remove button
    const scatterGroup = svg.append('g')
        .attr('class', 'scatter-group');

    // Create scales for x and y axes
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => parseFloat(d.GDPerCapita))])
        .range([margin.left, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => parseFloat(d.HappinessScore))])
        .range([innerHeight, margin.top]);

    // Create circles for each data point
    scatterGroup.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(parseFloat(d.GDPerCapita)))
        .attr('cy', d => yScale(parseFloat(d.HappinessScore)))
        .attr('r', 5)
        .attr('fill', 'steelblue');

    // Create x-axis
    const xAxis = d3.axisBottom(xScale);
    scatterGroup.append('g')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xAxis);

    // Create y-axis
    const yAxis = d3.axisLeft(yScale);
    scatterGroup.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxis);

    // Add labels
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - margin.bottom / 2)
        .style('text-anchor', 'middle')
        .text('GDP per Capita');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', margin.left / 2)
        .style('text-anchor', 'middle')
        .text('Happiness Score');

    // Create the remove button
    const removeButton = scatterGroup.append('g')
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
        window.appState = window.appState.filter(item => item.chartType !== 'scatter');
        localStorage.setItem('appState', JSON.stringify(window.appState));
    }
}

export default createScatterPlot;
