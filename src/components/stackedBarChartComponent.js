function createStackedBarChart(data, containerId)
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

    // Define the stack generator
    const stack = d3.stack()
        .keys(Object.keys(data[0]).slice(1)) // Exclude the first column (assuming it's the x-axis label)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

    // Stack the data
    const series = stack(data);

    // Create scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d[data.columns[0]])) // Assuming the first column contains x-axis labels
        .range([margin.left, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
        .nice()
        .range([innerHeight, margin.top]);

    // Create color scale
    const color = d3.scaleOrdinal()
        .domain(series.map((d, i) => i))
        .range(d3.schemeCategory10);

    // Create groups for each series
    const groups = svg.selectAll('g')
        .data(series)
        .enter()
        .append('g')
        .style('fill', (d, i) => color(i));

    // Create rectangles for each segment
    groups.selectAll('rect')
        .data(d => d)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.data[data.columns[0]]))
        .attr('y', d => yScale(d[1]))
        .attr('height', d => yScale(d[0]) - yScale(d[1]))
        .attr('width', xScale.bandwidth());

    // Create x-axis
    const xAxis = d3.axisBottom(xScale);
    svg.append('g')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xAxis);

    // Create y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
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
}

// Export the function
export default createStackedBarChart;
