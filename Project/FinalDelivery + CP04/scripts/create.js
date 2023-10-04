// Function to create the choroplet chart
function createChoroplet(data) {
	// Select the #choropletChart element and append an SVG to it
	const svg = d3
		.select("#choropletChart")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

		// TODO

}


// Function to create the sankey chart
function createSankey(data) {
	// Select the #sankeyChart element and append an SVG to it
	const svg = d3
	.select("#sankeyChart")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", `translate(${margin.left},${margin.top})`);

	// TODO
}


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
		
		//TODO
}


// Function to create the scatter plot
function createScatterPlot(data) {
	// Select the #scatterPlot element and append an SVG to it
	const svg = d3
		.select("#scatterPlot")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	// TODO
}