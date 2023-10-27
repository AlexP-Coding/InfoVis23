var xValues;
var yValues;
var width_scatter;
var height_scatter;
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
	const scatterMargin = { top: 40, right: 50, bottom: 80, left: 70 };
	width_scatter = 600 - scatterMargin.left - scatterMargin.right;
	height_scatter = 500 - scatterMargin.top - scatterMargin.bottom;
	

	// Create an SVG element for the scatterplot.
	const svg = d3
		.select("#scatterPlot")
		.append("svg")
		.attr("width", width_scatter + scatterMargin.left + scatterMargin.right)
		.attr("height", height_scatter + scatterMargin.top + scatterMargin.bottom)
		.append("g")
		.attr("transform", `translate(${scatterMargin.left},${scatterMargin.top})`);
	
	// Create x and y scales.
	xValues = d3
		.scaleLinear()
		.domain([0, d3.max(Array.from(countryMedianHours.values()), (d) => d)]) // Start at 0
		.range([0, width_scatter]);

	const yScale = d3
		.scaleLinear()
		.domain([0, 35]) // Start at 0
		.range([height_scatter, 0]);

	// Create the x and y axes.
	const xAxis = d3.axisBottom(xScale);
	const yAxis = d3.axisLeft(yScale);

	// Append the x axis to the scatterplot.
	svg
		.append("g")
		.attr("class", "x-axis")
		.attr("transform", `translate(0, ${height_scatter})`)
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
		.attr("stroke", "black")
		.attr("fill", d => d3.interpolatePurples(colorScale(countryMedian.get(d.Residence))))
		.on("mouseover", handleMouseOverCountry)
		.on("mouseout", handleMouseOutCountry)
		.on("click", handleClickCountry);

	// Add labels for the axes.
	svg
		.append("text")
		.attr("class", "x-label")
		.attr("text-anchor", "middle")
		.attr("x", width_scatter / 2)
		.attr("y", height_scatter + scatterMargin.top + 10) // Adjust the 'y' position
		.text("Median Hours Played Weekly")
		.style("font-family", "Arial, sans-serif");

	svg
		.append("text")
		.attr("class", "y-label")
		.attr("x", -height_scatter / 2)
		.attr("y", -scatterMargin.left + 10)
		.attr("transform", "rotate(-90)")
		.attr("text-anchor", "middle")
		.text("Median Age")
		.style("font-family", "Arial, sans-serif");

	
}

updateScatterPlot();


// Create a function to update the scatter plot

//IGNORAAAAAAAAAAAAAAAAAAAAAAAAAR
function updateScatterPlot() {


	// Create x and y sliders with min and max values, when the ranged is changed the the scatterplot is updated (remove circles)
	// scatterplot is updated with the slider from the cloroppleth map
	
	
	
	
	// Create x and y scales.
	xValues = d3
		.scaleLinear()
		.domain([0, d3.max(data, function(d) { return d.MedianHoursPlayedWeekly; })]) // Start at 0
		.range([0, width_scatter]);

	yValues = d3
		.scaleLinear()
		.domain([0, 35]) // Start at 0
		.range([height_scatter, 0]);

// Create sliders for the x and y axes.
	var xSlider = d3
		.sliderBottom(xValues)
		.min(d3.min(data, function(d) { return d.MedianHoursPlayedWeekly; }))
		.max(d3.max(data, function(d) { return d.MedianHoursPlayedWeekly; }))
		.width(width_scatter)
		.on('onchange', val => {
			// Update the scatter plot based on the selected range.
			svg.selectAll(".scatter-circle")
				.attr("opacity", function(d) {
					return (d.MedianHoursPlayedWeekly >= val[0] && d.MedianHoursPlayedWeekly <= val[1]) ? 1 : 0;
				});
		});

	var ySlider = d3
		.sliderRight(yValues)
		.min(d3.min(data, function(d) { return d.MedianAge; }))
		.max(d3.max(data, function(d) { return d.MedianAge; }))
		.height(height_scatter)
		.on('onchange', val => {
			// Update the scatter plot based on the selected range.
			svg.selectAll(".scatter-circle")
				.attr("opacity", function(d) {
					return (d.MedianAge >= val[0] && d.MedianAge <= val[1]) ? 1 : 0;
				});
		});

// Append the sliders to the SVG.
	d3.select("#xAxisSlider")
		.append('svg')
		.attr('width', width_scatter + scatterMargin.left + scatterMargin.right)
		.attr('height', 50)
		.append('g')
		.attr('transform', `translate(${scatterMargin.left},30)`)
		.call(xSlider);

	d3.select("#yAxisSlider")
		.append('svg')
		.attr('width', 50)
		.attr('height', height_scatter + scatterMargin.top + scatterMargin.bottom)
		.append('g')
		.attr('transform', `translate(30,${scatterMargin.top})`)
		.call(ySlider);

}
