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
  
  // TODO: switch to current data rather than global once CD is the one being updated
	updateIdioms(globalData)
  
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
  
  // TODO: switch to current data rather than global once CD is the one being updated
	updateIdioms(globalData);
}
