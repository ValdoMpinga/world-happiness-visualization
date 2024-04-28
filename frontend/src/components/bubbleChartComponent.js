function createBubbleChart(data, containerId)
{
    const main = window.main;

    // Set the dimensions of the SVG container
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select(containerId)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create a group for the chart and dropdown
    const chartGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add a dropdown for selecting the year
    const dropdown = chartGroup.append('foreignObject')
        .attr('class', 'year-dropdown')
        .attr('width', 120)
        .attr('height', 30)
        .attr('x', innerWidth - 150) // Adjust x position
        .attr('y', innerHeight + margin.top) // Position below the chart
        .append('xhtml:select')
        .attr('class', 'year-select')
        .on('change', function ()
        {
            const selectedYear = this.value;
            // Handle the change of year and update the stacked bar chart accordingly
            console.log('Selected year:', selectedYear);
            removeChart()
            setTimeout(() =>
            {
                main.buildBubbleChart(parseInt(selectedYear));
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
    
    // Create scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Freedom)]) // Adjust to use Freedom for x-axis
        .range([margin.left, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.SocialSupport)]) // Adjust to use SocialSupport for y-axis
        .range([innerHeight, margin.top]);

    // Define the scale for the size of bubbles
    const rScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.size)]) // Adjust to use size for bubble size
        .range([3, 30]); // Adjust the range of bubble sizes as needed

    // Create circles for each data point (bubbles)
    chartGroup.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.Freedom)) // Adjust to use Freedom for x-coordinate
        .attr('cy', d => yScale(d.SocialSupport)) // Adjust to use SocialSupport for y-coordinate
        .attr('r', d => rScale(d.size)) // Set the radius based on the size property
        .attr('fill', 'steelblue')
        .attr('opacity', 0.7);

    // Create x-axis
    const xAxis = d3.axisBottom(xScale);
    chartGroup.append('g')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xAxis);

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
        .text('Freedom'); // Adjust x-axis label

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', margin.left / 2)
        .style('text-anchor', 'middle')
        .text('Social Support'); // Adjust y-axis label

    // Create the remove button
    const removeButton = svg.append('g')
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
        window.appState = window.appState.filter(item => item.chartType !== 'bubble');
        localStorage.setItem('appState', JSON.stringify(window.appState));
    }
}

export default createBubbleChart;
