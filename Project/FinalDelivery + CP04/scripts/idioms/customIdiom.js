// Function to create the custom idiom
function createCustomIdiom(data) {
	// Select the #customIdiom element and append an SVG to it
	const svg = d3
		.select("#customIdiom")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	innerRadius = 80;
	outerRadius = Math.min(width, height)/2

	const xScale = d3.scaleBand()
		.range(0, 2*Math.PI)
		.align(0)
		.domain(spinResultsData.map(d => d.Meaning));

	const gamersByCountryBySPIN = d3.group(globalData, (d) => d.Residence, (d) => d.SPIN_M);

	const yScale = d3.scaleRadial()
		.range([innerRadius, outerRadius])
		.domain([0, d3.max(gamersByCountryBySPIN, d => d3.count(d.Residence && d.SPIN_M))]);

	svg.append("g")
		.selectAll("path")
		.join("path")
			.attr("d", d3.arc ()
				.innerRadius(innerRadius)
				.startAngle(d => yScale(d))
				.endAngle(d => xScale(d.Residence) + xScale.bandwidth())
				.padRadius(innerRadius)
				);	
}


// Function to update the custom idiom
function updateCustomIdiom(data) {
	// TODO
}