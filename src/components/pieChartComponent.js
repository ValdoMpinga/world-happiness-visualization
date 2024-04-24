function createPieChart(data, containerId)
{
    // Set the dimensions of the SVG container
    const width = 600;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Create the color scale
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.label))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    // Create the arc generator
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Create the pie generator
    const pie = d3.pie()
        .sort(null)
        .value(d => d.value);

    // Create the SVG container
    const svg = d3.select(containerId)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Create the pie slices
    const arcs = svg.selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

    // Append paths for the slices
    arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.label))
        .attr('stroke', '#fff')
        .style('stroke-width', '2px');

    // Add labels
    arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .text(d => d.data.label);
}

export default createPieChart;
