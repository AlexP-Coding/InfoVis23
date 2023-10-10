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


// Function to update the sankey chart
function updateSankey(data) {
	// TODO
}