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


	const data = Array.from(countryMedianAge.keys()).map((country) => ({
		Residence: country,
		MedianHoursPlayedWeekly: countryMedianHours.get(country),
		MedianAge: countryMedianAge.get(country),
	}));
	

	// Define the margins for the scatterplot.
	const scatterMargin = { top: 10, right: 10, bottom: 20, left: 20 };
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
		.data(data) 
		.enter()
		.append("circle")
		.attr("class", "scatter-circle")
		.attr("cx", (d) => xScale(d.MedianHoursPlayedWeekly))
		.attr("cy", (d) => yScale(d.MedianAge))
		.attr("r", 7) // Adjust the radius as needed
		.attr("class","ScatterCircle data")
		
		.attr("fill", d => d3.interpolatePurples(colorScale(countryMedian.get(d.Residence))))
		.on("mouseover", handleMouseOverCountry)
		.on("mouseout", handleMouseOutCountry);

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

	
}

// Function to update the scatterplot
function updateScatterplot() {

}

