const svg = d3.select('svg');
const titleText = 'World Population';
const xAxisLabelText = 'Year';
const wAxisLabelText = 'Population';
  
const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    const xValue = d => d.year;
    const yValue = d => d.population;
    const margin = { top: 70, right: 40, bottom: 90, left: 150 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, yValue)])
        .range([innerHeight, 0])
        .nice();
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`); 

    const areaGenerator = d3.area()
      .x(d => xScale(xValue(d)))
      .y0(innerHeight)
      .y1(d => yScale(yValue(d)))
      .curve(d3.curveBasis);

    g.append('path')
      .attr('d', areaGenerator(data))
      .attr('fill', '#34ff15');
    
    
    const xAxis = d3.axisBottom(xScale)
      .ticks(10)
      .tickSize(-innerHeight)
      .tickPadding(15);

    const yAxisTickFormat = number => 
      d3.format('.1s')(number)
        .replace('G', 'B');
    

    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(15)
      .tickFormat(yAxisTickFormat);
    
    g.append('g')
      .call(yAxis)
      .selectAll('.domain')
        .remove();

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.select('.domain').remove();

    yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', -55)
      .attr('x', -innerWidth / 4.5)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(wAxisLabelText);
    
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();
    
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 85)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabelText);
    
    
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', 300)
        .text(titleText);
}

d3.csv('https://vizhub.com/curran/datasets/world-population-by-year-2015.csv')
    .then(data => {
        data.forEach(d => {
            d.population = +d.population;
            d.year = new Date(d.year);
        });
        render(data);
    })