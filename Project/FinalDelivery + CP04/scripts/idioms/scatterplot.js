var xValues;
var yValues_scat;
var width_scatter;
var height_scatter;
function createScatterplot() {

	const currentData_CM = globalData.filter(function (d) {
	  return d.Residence != "Undefined"&& d.SPIN_T >= range_min && d.SPIN_T <= range_max;
	});
  
	const groupedData = d3.group(currentData_CM, (d) => d.Residence);
  
	const countryMedian = new Map([...groupedData].map(([key, values]) => {
	  const medianSPIN_T = d3.median(values, (d) => d.SPIN_T);
	  return [key, medianSPIN_T];
	}));

	// Calculate median age and median hours for each country
	var countryMedianAge = new Map([...groupedData].map(([country, values]) => {
		const medianAge = d3.median(values, d => d.Age);
		return [country, medianAge];
	}));

	var countryMedianHours = new Map([...groupedData].map(([country, values]) => {
		const medianHours = d3.median(values, d => d.Hours);
		return [country, medianHours];
	}));


	var data = Array.from(countryMedianAge.keys()).map((country) => ({
		Residence: country,
		MedianHoursPlayedWeekly: countryMedianHours.get(country),
		MedianAge: countryMedianAge.get(country),
	}));
	
	
	console.log(countryMedianHours)

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
		.domain([0, 55]) // Start at 0
		.range([0, width_scatter]);

	yValues_scat = d3
		.scaleLinear()
		.domain([0, 35]) // Start at 0
		.range([height_scatter, 0]);

	// Create the x and y axes.
	const xAxis = d3.axisBottom(xValues);
	const yAxis = d3.axisLeft(yValues_scat);

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
		.attr("cx", (d) => xValues(d.MedianHoursPlayedWeekly))
		.attr("cy", (d) => yValues_scat(d.MedianAge))
		.attr("r", 7) // Adjust the radius as needed
		.attr("class","scatter-circle data")
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

	////RANGE SELECTOR /////

	
	range_minAge = d3.min(data, d => d.MedianAge);
	range_maxAge = d3.max(data, d => d.MedianAge);

	const svg3 = d3
		.select("#ScatterAgeRange")
		.append("svg")
		.attr("width", width)
		.attr("height", height*0.09);



	const rangeSelectorScatter = svg3.append("g").attr("transform", `translate(25, 10)`);

	rangeSelectorScatter
		.append("rect")
		.attr("id","selectorLine")
		.attr("x",0)
		.attr("y",0)
		.attr("width", legendWidth)
		.attr("height", 1)
		.style("fill","black");


	const select_min = rangeSelectorScatter.append("g")

	const select_max = rangeSelectorScatter.append("g")


	y_axis
		.append("g")
		.append("circle")
		.attr("id","range_min")
		.attr("cx", (d) => xValues(range_minAge))
		.attr("cy",0.5)
		.attr("r", 5)
		.attr("fill", "black")
		.attr("stroke", "black")
		.call(
			d3
				.drag()
				.on("start", function (event) {
					d3.select(this).attr("fill", "grey");
				})
				.on("drag", handleDragMinScatter)
				.on("end", function (event) {
					d3.select(this).attr("fill", "black");
				})
		);

	select_max
		.append("circle")
		.attr("id","range_max")
		.attr("cx", (d) => xValues(range_maxAge))
		.attr("cy",0.5)
		.attr("r", 5)
		.attr("fill", "black")
		.attr("stroke", "black")
		.call(
			d3
				.drag()
				.on("start", function (event) {
					d3.select(this).attr("fill", "grey");
				})
				.on("drag", handleDragMaxScatter)
				.on("end", function (event) {
					d3.select(this).attr("fill", "black");
				})
		);

	select_min
		.append("text")
		.attr("id","range_min_text")
		.attr("x", (d) => xValues(range_minAge)-4.4)
		.attr("y", height*0.03+9)
		.text(range_min.toFixed(2));

	select_max
		.append("text")
		.attr("id","range_max_text")
		.attr("x", (d) => xValues(range_maxAge)-4.4)
		.attr("y", height*0.03+9)
		.text(range_max.toFixed(2));


}


// Function to update the scatter plot based on slider values
function updateScatterPlot() {
	
	// Calculate median age and median hours for each country
	var countryMedianAge = new Map([...groupedData].map(([country, values]) => {
		const medianAge = d3.median(values, d => d.Age);
		return [country, medianAge];
	}));

	var countryMedianHours = new Map([...groupedData].map(([country, values]) => {
		const medianHours = d3.median(values, d => d.Hours);
		return [country, medianHours];
	}));

	var data = Array.from(countryMedianAge.keys()).map((country) => ({
		Residence: country,
		MedianHoursPlayedWeekly: countryMedianHours.get(country),
		MedianAge: countryMedianAge.get(country),
	}));
	
	console.log(countryMedianHours)
	
	var circles = d3.selectAll(".scatter-circle")
	.data(data);
	

	// Update existing circles
	circles
	.transition()
	.duration(1000)
	.attr("cx", (d) => xValues(d.MedianHoursPlayedWeekly))
	.attr("cy", (d) => yValues_scat(d.MedianAge))
	.attr("fill", d => d3.interpolatePurples(colorScale(countryMedian.get(d.Residence))))
	.style("display", "block"); // Show the circles

	// Create new circles for any new data points
	circles.enter()
	.append("circle")
	.attr("class", "scatter-circle")
	.attr("cx", (d) => xValues(d.MedianHoursPlayedWeekly))
	.attr("cy", (d) => yValues_scat(d.MedianAge))
	.attr("r", 7) // Adjust the radius as needed
	.attr("stroke", "black")
	.attr("fill", d => d3.interpolatePurples(colorScale(countryMedian.get(d.Residence))))
	.on("mouseover", handleMouseOverCountry)
	.on("mouseout", handleMouseOutCountry)
	.on("click", handleClickCountry);

	// Remove any circles that are no longer in the new data
	circles.exit().style("display", "none"); // Hide the circles


	


}

