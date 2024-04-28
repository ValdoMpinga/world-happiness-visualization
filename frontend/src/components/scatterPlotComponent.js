function createScatterPlot(data, containerId)
{
    const main = window.main;

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

    // Add a dropdown for selecting the year
    const dropdown = scatterGroup.append('foreignObject')
        .attr('class', 'year-dropdown')
        .attr('width', 120)
        .attr('height', 30)
        .attr('x', innerWidth - 150) // Adjust x position
        .attr('y', innerHeight + margin.top - 20) // Adjust y position
        .append('xhtml:select')
        .attr('class', 'year-select')
        .on('change', function ()
        {
            const selectedYear = this.value;
            // Handle the change of year and update the scatter plot accordingly
            console.log('Selected year:', selectedYear);
            removeChart()
            setTimeout(() =>
            {
                main.buildScatterPlotChart(parseInt(selectedYear));
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
