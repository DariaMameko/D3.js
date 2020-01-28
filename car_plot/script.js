const titleText = 'Cars: HorsePower vs Weight';
const xAxisLabelText = 'Horsepower';
const wAxisLabelText = 'Weight';
  
const svg = d3.select('svg');
  
const width = +svg.attr('width');
const height = +svg.attr('height');
  
const render = data => {
    const xValue = d => d.horsepower;
    const yValue = d => d.weight;
    const circle_radius = 10;
    const margin = { top: 70, right: 40, bottom: 90, left: 150 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([0, innerHeight])
        .nice();
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`); 
    
    
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);

    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(15);
    
    g.append('g')
      .call(yAxis)
      .selectAll('.domain')
        .remove();

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.select('.domain').remove();

    yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', -95)
      .attr('x', -innerWidth / 3.3)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(wAxisLabelText);
    
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();
    
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabelText);
    
    g.selectAll('circle').data(data)
      .enter().append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circle_radius);
    
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', 40)
        .text(titleText);
  };
  
d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv')
    .then(data => {
        data.forEach(d => {
            d.mpg = +d.mpg;
            d.cylinders = +d.cylinders;
            d.displacement = +d.displacement;
            d.horsepower = +d.horsepower;
            d.weight = +d.weight;
            d.acceleration = +d.acceleration;
            d.year = +d.year;
        });
        render(data);
});