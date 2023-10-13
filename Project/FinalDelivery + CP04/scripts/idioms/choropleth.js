// Function to create the choropleth map
function createChoroplethMap() {
	// Filter the data to remove entries with missing incomeperperson values
	currentData_CM = globalData.filter(function (d) {
	  return d.Residence != "Undefined";
	});
  
	const groupedData = d3.group(currentData_CM, (d) => d.Residence);
  
	countryMedian = new Map([...groupedData].map(([key, values]) => {
	  const medianSPIN_T = d3.median(values, (d) => d.SPIN_T);
	  return [key, medianSPIN_T];
	}));
  
	// Create a title for the choropleth map
	/*const chartTitle = d3
	  .select("#choroplethTitle")
	  .append("text")
	  .attr("x", width/2+500)
	  .attr("y", margin.top-1)
	  .text("MEDIAN SPIN_T");*/
  
	// Create an SVG element to hold the map
	const svg = d3
	  .select("#choropleth")
	  .append("svg")
	  .attr("width", width)
	  .attr("height", height);
  
	// Create a group to hold the map elements
	const mapGroup = svg.append("g");
  
	// Create a color scale for the incomeperperson values
	colorScale = d3
	  .scaleLinear()
	  .domain([
		d3.min(Array.from(countryMedian.values())),
		d3.max(Array.from(countryMedian.values()))
	  ])
	  .range([0, 1]);
  
	  
  
	// Create a projection to convert geo-coordinates to pixel values
	const projection = d3
	  .geoMercator()
	  .fitSize([width, height], globalDataCountries);
  
	// Create a path generator for the map
	const path = d3.geoPath().projection(projection);
  
	// Add countries as path elements to the map
	mapGroup
	  .selectAll(".country")
	  .data(globalDataCountries.features)
	  .enter()
	  .append("path")
	  .attr("class", "country data")
	  .attr("d", path)
	  .attr("stroke", "black")
	  .on("mouseover", handleMouseOverCM) // Function to handle mouseover event
	  .on("mouseout", handleMouseOutCM)   // Function to handle mouseout 
	  .on("click" , handleClickCM)
	  .append("title")
	  .text((d) => d.properties.name);
  
	// Set the fill color of each country based on its incomeperperson value
	countryMedian.forEach((value,key) => {
	  mapGroup
		.selectAll("path")
		.filter(function (d) {
		  return d.properties.name === key;
		})
		.attr("fill", d3.interpolatePurples(colorScale(value)));
	});
  
	// Create zoom behavior for the map
	const zoom = d3
	  .zoom()
	  .scaleExtent([1, 8])
	  .translateExtent([
		[0, 0],
		[width, height],
	  ])
	  .on("zoom", zoomed);
  
	// Apply zoom behavior to the SVG element
	svg.call(zoom);
  
	// Function to handle the zoom event
	function zoomed(event) {
	  mapGroup.attr("transform", event.transform);
	}
  
	// Create a legend for the choropleth map
	const svg2 = d3
	  .select("#choroplethLabel")
	  .append("svg")
	  .attr("width", width)
	  .attr("height", height*0.24);
  
	// Create a gradient for the legend color scale
	const defs = svg2.append("defs");
	const gradient = defs
	  .append("linearGradient")
	  .attr("id", "colorScaleGradient")
	  .attr("x1", "0%")
	  .attr("y1", "0")
	  .attr("x2", "100%")
	  .attr("y2", "0");
  
	gradient
	  .append("stop")
	  .attr("offset", "0%")
	  .attr("stop-color", d3.interpolatePurples(colorScale(d3.min(Array.from(countryMedian.values())))));
  
	gradient
	  .append("stop")
	  .attr("offset", "100%")
	  .attr("stop-color", d3.interpolatePurples(colorScale(d3.max(Array.from(countryMedian.values())))));
  
	// Create the legend rectangle filled with the color scale gradient
	const legend = svg2.append("g")
		.attr("id","Legend")
		.attr("transform", `translate(25, 10)`);
	
	legendHeight = 42;
	legendWidth = width-40;
  
	legend
	  .append("rect")
	  .attr("width", legendWidth)
	  .attr("height", legendHeight)
	  .style("fill", "url(#colorScaleGradient)");
  
	// Add tick marks and labels to the legend
	for (let index = 0; index <= 1; index += 0.25) {
	  legend
		.append("text")
		.attr("x", legendWidth * index)
		.attr("y", legendHeight * 1.5)
		.text(Math.round(colorScale.invert(index)));
	}
  
	// Create x and y scales for the scatter plot
	xScale = d3
	  .scaleLinear()
	  .domain([
		d3.min(Array.from(countryMedian.values())),
		d3.max(Array.from(countryMedian.values()))
	  ])
	  .range([0, legendWidth]);
  
  
  //Add circle
  
	SPIN_T_global = d3.median(countryMedian.values())
  
  
	legend
	  .append("circle")
	  .attr("id","SPINcircle")
	  .attr("cx", (d) => xScale(SPIN_T_global))
	  .attr("cy", legendHeight*0.5)
	  .attr("r", 3.5)
	  .attr("fill", "black")
	  .attr("stroke", "black");
  
	  
	  ////RANGE SELECTOR /////
	range_min = d3.min(Array.from(countryMedian.values()));
	range_max = d3.max(Array.from(countryMedian.values()));
  
	const svg3 = d3
	  .select("#choroplethRange")
	  .append("svg")
	  .attr("width", width)
	  .attr("height", height*0.09);
  
	
	
	const rangeSelector = svg3.append("g").attr("transform", `translate(25, 10)`);
  
	rangeSelector
	  .append("rect")
	  .attr("id","selectorLine")
	  .attr("x",0)
	  .attr("y",0)
	  .attr("width", legendWidth)
	  .attr("height", 1)
	  .style("fill","black");
	
	
	const select_min = rangeSelector.append("g")
	
	const select_max = rangeSelector.append("g")
  
  
	select_min
	  .append("circle")
	  .attr("id","range_min")
	  .attr("cx", (d) => xScale(range_min))
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
		  .on("drag", handleDragMin)
		  .on("end", function (event) {
			d3.select(this).attr("fill", "black");
		  })
	  );
  
	select_max
	  .append("circle")
	  .attr("id","range_max")
	  .attr("cx", (d) => xScale(range_max))
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
		  .on("drag", handleDragMax)
		  .on("end", function (event) {
			d3.select(this).attr("fill", "black");
		  })
	  );
  
	select_min
	  .append("text")
	  .attr("id","range_min_text")
	  .attr("x", (d) => xScale(range_min)-4.4)
	  .attr("y", height*0.03+9)
	  .text(range_min);
  
	select_max
	  .append("text")
	  .attr("id","range_max_text")
	  .attr("x", (d) => xScale(range_max)-4.4)
	  .attr("y", height*0.03+9)
	  .text(range_max);
  
	
}


function updateChoropleth() {
	updateChoropleth()
}


// MapUpdate(), just renamed and moved from linked.js
function updateChoropleth(){

	
	currentData_CM_update = globalData.filter(function (d) {
	  return d.Residence != "Undefined" && d.SPIN_T >= range_min && d.SPIN_T <= range_max;
	});
  
	const groupedData = d3.group(currentData_CM_update, (d) => d.Residence);
  
  
	countryMedian = new Map([...groupedData].map(([key, values]) => {
	  const medianSPIN_T = d3.median(values, (d) => d.SPIN_T);
	  return [key, medianSPIN_T];
	}));
  
	const countriesInMap = Array.from(countryMedian.keys());
	
	d3.selectAll(".country")
	  .attr("fill", function (d) {
		// Check if the country's name is in the map, if not, paint it black
		if (countriesInMap.includes(d.properties.name)) {
		  return d3.interpolatePurples(colorScale(countryMedian.get(d.properties.name)));
		} else {
		  return "black"; // or any other color you prefer
		}
	  });
  
	SPIN_T_global = d3.median(countryMedian.values())
  
	d3.select("#SPINcircle").attr("cx",(d) => xScale(SPIN_T_global))

	for (const circles of clickedCountries){
		circles.element.attr("cx",(d) => xScale(countryMedian.get(circles.country)))
		
	}
  
  }