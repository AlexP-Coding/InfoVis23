// Function to create the custom idiom
function createCustomIdiom() {
	// Select the #customIdiom element and append an SVG to it

	const svg = d3
		.select("#customIdiom")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${width/2},${height/2+100})`);


	currentDataRadial = globalData.filter(function (d) {
		return d.Residence != "Undefined" && d.SPIN_M != "Undefined" && d.SPIN_T != -1;
	});

	const dataBySpinRes = Array.from(
		d3.group(currentDataRadial, (d) => d.SPIN_M).entries())
		.map(([SPIN_M, data]) => ({ SPIN_M, data}));

	dataCountBySpinRes = {};
	sumPeople = 0;
	dataBySpinRes.forEach(resId => {
		nrPeople = dataBySpinRes[resId].length;
		dataCountBySpinRes[resId] = nrPeople;
		sumPeople += nrPeople;
	});

	innerRadius = 80;
	outerRadius = Math.min(width, height)/2

	const xScale = d3.scaleBand()
		.range([0, 2*Math.PI])
		.align(0)
		.domain(dataBySpinRes.map(d => d.SPIN_M));

	const yScale = d3.scaleRadial()
		.range([innerRadius, outerRadius])
		.domain([0, 100]);

	const dataCountBySpinResArray =
	Array.from(dataCountBySpinRes.entries())
		.map(([SPIN_M, count]) => ({ SPIN_M, count}));

	svg.append("g")
		.selectAll("path")
		.data(dataBySpinRes)
		.join("path")
			.attr("fill", "#69b3a2")
			.attr("d", d3.arc()     // imagine your doing a part of a donut plot
					.innerRadius(innerRadius)
					.outerRadius(d => yScale(d.count/sumPeople*100))
					.startAngle(d => xScale(d.SPIN_M))
					.endAngle(d => xScale(d.SPIN_M) + xScale.bandwidth())
					.padAngle(0.01)
					.padRadius(innerRadius))

	console.log("Yay i reached the end of create custom idiom!")
}


// Function to update the custom idiom
function updateCustomIdiom(data) {
	// TODO
}