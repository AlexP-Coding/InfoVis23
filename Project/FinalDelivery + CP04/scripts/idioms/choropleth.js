// Function to create the choropleth chart
function createChoropleth(data) {
	// Select the #choropletChart element and append an SVG to it
	const svg = d3
		.select("#choroplethChart")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	// TODO
}


// Function to update the choropleth chart
function updateChoropleth(data) {
	// TODO
}