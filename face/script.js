const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');
const eyeBrowOffSet = -70;

const g = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

const circle = g.append('circle')
    .attr('r', '200')
    .attr('fill', 'rgb(255, 255, 0')
    .attr('stroke', '#000');

const eyeG = g.append('g')
    .attr('transform', 'translate(0, -50)');

const eyeBrowsG = eyeG.append('g')
    .attr('transform', `translate(0, ${eyeBrowOffSet})`);

eyeBrowsG
    .transition().duration(2000)
        .attr('transform', `translate(0, ${eyeBrowOffSet - 50})`)
    .transition().duration(2000)
        .attr('transform' ,`translate(0, ${eyeBrowOffSet})`);

const leftEye = eyeG.append('circle')
    .attr('r', '30')
    .attr('cx', -100);

const rightEye = eyeG.append('circle')
    .attr('r', '30')
    .attr('cx', 100);

const mouth = g.append('path')
    .attr('d', d3.arc()({
        innerRadius: 0,
        outerRadius: 100,
        startAngle: Math.PI / 2,
        endAngle: 3 * Math.PI / 2
    }));

const leftEyeBrow = eyeBrowsG.append('rect')
    .attr('width', 70 )
    .attr('height', 20)
    .attr('x', -100 - 70 / 2);

const rightEyeBrow = eyeBrowsG.append('rect')
    .attr('width', 70 )
    .attr('height', 20)
    .attr('x', 100 - 70 / 2);



