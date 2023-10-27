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


	select_min
		.append("circle")
		.attr("id","range_min")
		.attr("cx", (d) => xScale(range_minAge))
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
		.attr("cx", (d) => xScale(range_maxAge))
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
		.attr("x", (d) => xScale(range_minAge)-4.4)
		.attr("y", height*0.03+9)
		.text(range_min.toFixed(2));

	select_max
		.append("text")
		.attr("id","range_max_text")
		.attr("x", (d) => xScale(range_maxAge)-4.4)
		.attr("y", height*0.03+9)
		.text(range_max.toFixed(2));


}


// Function to update the scatter plot based on slider values
function updateScatterPlot() {
	function updateScatterPlot() {
		// Get the minimum and maximum age values from the range selectors
		const minAge = range_minAge;
		const maxAge = range_maxAge;

		// Filter the data based on the selected age range
		const filteredData = data.filter(d => d.MedianAge >= minAge && d.MedianAge <= maxAge);

		// Update the x-axis domain based on the selected age range
		xScale.domain([0, d3.max(filteredData, d => d.MedianHoursPlayedWeekly)]);

		// Select all circles and bind the filtered data
		const circles = svg.selectAll(".scatter-circle").data(filteredData);

		// Remove circles that are not in the filtered data
		circles.exit().remove();

		// Update existing circles
		circles
			.transition()
			.duration(500)
			.attr("cx", d => xScale(d.MedianHoursPlayedWeekly))
			.attr("cy", d => yScale(d.MedianAge));

		// Add new circles for the filtered data
		circles.enter()
			.append("circle")
			.attr("class", "scatter-circle")
			.attr("r", 7)
			.attr("stroke", "black")
			.attr("fill", d => d3.interpolatePurples(colorScale(d.Residence)))
			.attr("cx", d => xScale(d.MedianHoursPlayedWeekly))
			.attr("cy", d => yScale(d.MedianAge))
			.on("mouseover", handleMouseOverCountry)
			.on("mouseout", handleMouseOutCountry)
			.on("click", handleClickCountry);

		// Update the x-axis
		svg.select(".x-axis")
			.transition()
			.duration(500)
			.call(xAxis);

		// You may want to update other elements of the plot as needed

		// Update the range selector positions
	
		select_min.select("#range_minAge").attr("cx", xScale(minAge));
		select_max.select("#range_maxAge").attr("cx", xScale(maxAge));
	}


}

