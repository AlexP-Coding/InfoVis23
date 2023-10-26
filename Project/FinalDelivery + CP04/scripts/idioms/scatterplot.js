function createScatterplot() {
	// Filter the data to remove entries with missing values
	const currentData_CM = globalData.filter(function (d) {
		return d.Residence != "Undefined";
	});

	// Group the data by country
	const groupedData = d3.group(currentData_CM, d => d.Residence);

	// Calculate median age and median hours for each country
	const countryMedianAge = new Map([...groupedData].map(([country, values]) => {
		const medianAge = d3.median(values, d => d.Age);
		return [country, medianAge];
	}));

	const countryMedianHours = new Map([...groupedData].map(([country, values]) => {
		const medianHours = d3.median(values, d => d.Hours);
		return [country, medianHours];
	}));

	countryMedian = new Map([...groupedData].map(([key, values]) => {
		const medianSPIN_T = d3.median(values, (d) => d.SPIN_T);
		return [key, medianSPIN_T];
	}));


	// Define the margins for the scatterplot.
	const scatterMargin = { top: 20, right: 20, bottom: 40, left: 40 };
	const scatterWidth = 600 - scatterMargin.left - scatterMargin.right;
	const scatterHeight = 400 - scatterMargin.top - scatterMargin.bottom;
	

	// Create an SVG element for the scatterplot.
	const svg = d3
		.select("#scatterPlot")
		.append("svg")
		.attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
		.attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
		.append("g")
		.attr("transform", `translate(${scatterMargin.left},${scatterMargin.top})`);
	
	// Create x and y scales.
	const xScale = d3
		.scaleLinear()
		.domain([0, d3.max(Array.from(countryMedianHours.values()), (d) => d)]) // Start at 0
		.range([0, scatterWidth]);

	const yScale = d3
		.scaleLinear()
		.domain([0, d3.max(Array.from(countryMedianAge.values()), (d) => d)]) // Start at 0
		.range([scatterHeight, 0]);

	// Create the x and y axes.
	const xAxis = d3.axisBottom(xScale);
	const yAxis = d3.axisLeft(yScale);

	// Append the x axis to the scatterplot.
	svg
		.append("g")
		.attr("class", "x-axis")
		.attr("transform", `translate(0, ${scatterHeight})`)
		.call(xAxis);

	// Append the y axis to the scatterplot.
	svg
		.append("g")
		.attr("class", "y-axis")
		.call(yAxis);

	// Create circles for each country.

	svg
		.selectAll(".scatter-circle")
		.data(Array.from(countryMedianHours.entries())) // Use countryMedianHours
		.enter()
		.append("circle")
		.attr("class", "scatter-circle")
		.attr("cx", (d) => xScale(d[1])) // X-coordinate: Median Hours Played Weekly
		.attr("cy", (d) => yScale(countryMedianAge.get(d[0]))) // Y-coordinate: Median Age
		.attr("r", 5) // Adjust the radius as needed
		.attr("fill", d => d3.interpolatePurples(colorScale(countryMedian.get(d[0])))); // 

	// Add labels for the axes.
	svg
		.append("text")
		.attr("class", "x-label")
		.attr("text-anchor", "middle")
		.attr("x", scatterWidth / 2)
		.attr("y", scatterHeight + scatterMargin.bottom)
		.text("Median Hours Played Weekly");

	svg
		.append("text")
		.attr("class", "y-label")
		.attr("text-anchor", "middle")
		.attr("x", -scatterHeight / 2)
		.attr("y", -scatterMargin.left)
		.attr("transform", "rotate(-90)")
		.text("Median Age");

	// Function to handle mouseover event for the circles.
	function handleMouseOverCircle(event, d) {
		// Add code to display a tooltip or any other interaction you want on mouseover.
	}

	// Function to handle mouseout event for the circles.
	function handleMouseOutCircle(event, d) {
		// Add code to hide the tooltip or reset any interaction on mouseout.
	}
}
