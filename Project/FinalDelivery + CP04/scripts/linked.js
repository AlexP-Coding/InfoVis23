// This function is triggered when the mouse pointer is over an element.
function handleMouseOver(event, item) {
	// TODO
}

// This function is triggered when the mouse pointer moves out of an element (mouseout event).
function handleMouseOut(event, item) {
	// TODO
}


// TODO

//Choropleth Map Range selector

//Handle the drag action on the minimum value selector

function handleDragMin(event){

	const new_min_x = event.x;
	if(new_min_x >= 0 && new_min_x < d3.select("#range_max").attr("cx")){
	  d3.select(this).attr("cx", new_min_x);
	  d3.select("#range_min_text").attr("x",new_min_x-4.4)
    
	  range_min = xScale.invert(new_min_x)
	  d3.select("#range_min_text").text(range_min.toFixed(2))
	}
  
  // TODO: switch to current data rather than global once CD is the one being updated
	updateIdioms()
  
}

//Handle the drag action on the maximum value selector
  
function handleDragMax(event){
  
	const new_max_x = event.x;
	if(new_max_x > d3.select("#range_min").attr("cx") && new_max_x <= legendWidth){
	  d3.select(this).attr("cx", new_max_x);
	  d3.select("#range_max_text").attr("x",new_max_x-4.4);
  
	  range_max = xScale.invert(new_max_x)
	  d3.select("#range_max_text").text(range_max.toFixed(2))
	}
  
  // TODO: switch to current data rather than global once CD is the one being updated
	updateIdioms();
}

// Add new circles for clicked countries
clickedCountries = []
var new_circle_y = 0;

function handleClickCM(event,item){

  let countriesInMap = Array.from(countryMedian.keys())

  const countryMedianArray = Array.from(countryMedian, ([Residence, value]) => ({ Residence, value }));

  let existingCircleIndex = clickedCountries.findIndex((markData) => markData.country == item.properties.name);

  if(existingCircleIndex !== -1){
    const removedCircleData = clickedCountries.splice(existingCircleIndex, 1)[0];
    removedCircleData.element.remove()
  }
  else {
    if (countriesInMap.includes(item.properties.name)) {
      const filteredData = countryMedianArray.filter(function (d) {
        return d.Residence === item.properties.name;
      });
  
      const newCircle = d3.select("#Legend")
        .append("circle")
        .data(filteredData)
        .attr("class", "ChoroplethScale data")
        .attr("Residence", item.properties.name)
        .attr("cx", (d) => xScale(countryMedian.get(d.Residence)))
        .attr("cy", new_circle_y)
        .attr("r", 3.5)
        .attr("fill", "white")
        .attr("stroke", "black")
        .on("mouseover", handleMouseOverCM)
        .on("mouseout", handleMouseOutCM);
  
      clickedCountries.push({ country: item.properties.name, element: newCircle });
    }
  }
  
  //Define a new y value inside the legend to avoid overlays

  new_circle_y = new_circle_y + 7;
  if(new_circle_y > 42){
    new_circle_y=0;
  }

}

//Mouse Over Choropleth

function handleMouseOverCM(event,item){

  // Select all elements with class "data" and filter based on the item's properties
  //console.log(d3.selectAll(".data"))
  d3.selectAll(".data")
    .filter(function (d) {
      if ("properties" in item) {
        if ("properties" in d) {
          return item.properties.name == d.properties.name;
        } 
        else {
          return item.properties.name == d.Residence;
        }
      } else if ("properties" in d) {
        return item.Residence == d.properties.name;
      } else {
        return item.Residence == d.Residence;
      }
    })
    .attr("stroke", "green")
    .attr("stroke-width", 2.5); // Change the border color of the matching elements to green

}

//Mouse Out Choropleth

function handleMouseOutCM (event, item) {
  // Filter the current data to remove entries with missing incomeperperson values
  let countriesInMap = Array.from(countryMedian.keys())

  // Reset the fill color of all elements with class "country data" to black
  d3.selectAll(".country.data")
    .attr("stroke", "black")
    .attr("stroke-width",1);

  d3.selectAll(".ChoroplethScale.data")
    .attr("stroke", "black")
    .attr("stroke-width",1);

  d3.selectAll(".LollipopLine.data")
    .attr("stroke","grey")
    .attr("stroke-width",1);

  d3.selectAll(".Lollipopcircle.data")
    .attr("stroke","none")

}


//function handle
