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
	  d3.select("#range_min_text").text(range_min)
	}
  
	MapUpdate()
  
}

//Handle the drag action on the maximum value selector
  
function handleDragMax(event){
  
	const new_max_x = event.x;
	if(new_max_x > d3.select("#range_min").attr("cx") && new_max_x <= legendWidth){
	  d3.select(this).attr("cx", new_max_x);
	  d3.select("#range_max_text").attr("x",new_max_x-4.4);
  
	  range_max = xScale.invert(new_max_x)
	  d3.select("#range_max_text").text(range_max)
	}
  
	MapUpdate()
  
}

function MapUpdate(){

  console.log(range_min)
  console.log(range_max)
  currentData_CM_update = globalData.filter(function (d) {
    return d.Residence != "Undefined" && d.SPIN_T >= range_min && d.SPIN_T <= range_max;
  });

  const groupedData = d3.group(currentData_CM_update, (d) => d.Residence);



  countryMedian = new Map([...groupedData].map(([key, values]) => {
    const avgSPIN_T = d3.median(values, (d) => d.SPIN_T);
    return [key, avgSPIN_T];
  }));

  const countriesInMap = Array.from(countryMedian.keys());
  
  d3.selectAll("path")
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

}
