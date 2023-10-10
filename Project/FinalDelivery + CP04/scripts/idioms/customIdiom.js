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


// Function to update the custom idiom
function updateCustomIdiom(data) {
	// TODO
}