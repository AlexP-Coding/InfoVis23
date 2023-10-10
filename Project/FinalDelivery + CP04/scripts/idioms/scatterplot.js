// Function to create the scatterplot
function createScatterplot(data) {
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


// Function to update the scatter plot
function updateScatterplot(data) {
	// TODO
}