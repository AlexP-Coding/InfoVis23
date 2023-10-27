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

function handleClickCountry(event,item){

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
        .on("mouseover", handleMouseOverCountry)
        .on("mouseout", handleMouseOutCountry);
  
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

function handleMouseOverCountry(event,item){

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
  
    
  Tooltip
    .style("opacity", 1)
    .style("left", event.pageX + 10 + "px")
    .style("top", event.pageY + 10 + "px")
  if ("properties" in item)
  {
    const linkedMap = residenceDataMap_2.get(item.properties.name);
    Tooltip.html(`<div>Country: ${item.properties.name}</div>`);

    function addDataLine(variableName) {
        const entry = linkedMap.find(entry => entry.Variable === variableName);
        if (entry) {
            Tooltip.html(Tooltip.html() + `<div>${variableName}: ${entry.Value}</div>`);
        }
    }

    // Add lines for "Very Severe" to "Undefined" conditionally
    addDataLine('Very severe');
    addDataLine('Severe');
    addDataLine('Moderate');
    addDataLine('Mild');
    addDataLine('None');
    addDataLine('Undefined');
  }
  else
  {
    const linkedMap = residenceDataMap_2.get(item.Residence);
    Tooltip.html(`<div>Country: ${item.Residence}</div>`);

    function addDataLine(variableName) {
        const entry = linkedMap.find(entry => entry.Variable === variableName);
        if (entry) {
            Tooltip.html(Tooltip.html() + `<div>${variableName}: ${entry.Value}</div>`);
        }
    }

    // Add lines for "Very Severe" to "Undefined" conditionally
    addDataLine('Very severe');
    addDataLine('Severe');
    addDataLine('Moderate');
    addDataLine('Mild');
    addDataLine('None');
    addDataLine('Undefined');
  }
}

//Mouse Out Choropleth

function handleMouseOutCountry (event, item) {
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

  Tooltip
    .style("opacity", 0)
  d3.selectAll(this)
    .style("stroke", "none")
    .style("opacity", 0.8)

}

function handleMouseOverSankey (evnet,item){

  //console.log(item.sourceLinks)
  
  item.sourceLinks.forEach(e => {
    //console.log(e)
    d3.selectAll(`path.trajectory_${e.index}`)
      .attr('stroke-opacity', 1)
      .attr('stroke', 'green');
  });

  /*item.targetLinks.forEach(e => {
    d3.selectAll(`path.trajectory_${e.index}`)
      .attr('stroke-opacity', 1)
      .attr('stroke', 'green');
  });*/
  

}

function handleMouseOutSankey(event,item){

  item.sourceLinks.forEach(e => {
    const path = d3.selectAll(`path.trajectory_${e.index}`)
    if (!doesClassIDPairExist(item.class,item.id)){
      path.attr('stroke-opacity', 0.5)
      .attr('stroke', 'grey');
    }
  })

  /*item.targetLinks.forEach(e => {
    const path = d3.selectAll(`path.trajectory_${e.index}`)
    if (!doesClassIDPairExist(item.class,item.id)){
      path.attr('stroke-opacity', 0.5)
      .attr('stroke', 'grey');
    }
  });*/
}

var clicked_classes_id = []

function handleClickSankey(event,item){

    //console.log(item);

    if (!doesClassIDPairExist(item.class,item.id)) {

        console.log(item.id);

        var class_id_pair = {
            class: item.class,
            id: item.id
        };

        clicked_classes_id.push(class_id_pair);

        console.log(clicked_classes_id)

        item.sourceLinks.forEach(e => {
            
            d3.selectAll(`path.trajectory_${e.index}`)
              .attr('stroke-opacity', 1)
              .attr('stroke', 'green');
        });
    }else if(doesClassIDPairExist(item.class,item.id)) {
        
        clicked_classes_id = clicked_classes_id.filter(pair => !(pair.class === item.class && pair.id === item.id));

        console.log(clicked_classes_id)

        item.sourceLinks.forEach(e => {
            d3.selectAll(`path.trajectory_${e.index}`)
              .attr('stroke-opacity', 0.5)
              .attr('stroke', 'grey');
            
        })

    }

    updateIdioms();

}
//function handle

function doesClassIDPairExist(classToFind, valueToFind) {
    return clicked_classes_id.some(pair => pair.class === classToFind && pair.id === valueToFind);
}

function handleDragSankey(event){

    
    const new_x = event.x;
    if(new_x > 0 && new_x < width + margin.left + margin.right){

        d3.select(this).attr("x", new_x);

        text_sector = d3.select("#"+d3.select(this).data())
    
        text_sector.attr("x", new_x+(rectangleWidth-40) / 2);

        const rectangleData = [];

        d3.selectAll(".rectangle-text").each(function() {
            const name = d3.select(this).data()[0];
            const x = parseFloat(d3.select(this).attr("x"));
            console.log(x)
            rectangleData.push({ name, x });
        });

    //console.log(rectangleData)

    // Sort the array by 'x' in ascending order
    const sortedData = rectangleData.slice().sort((a, b) => a.x - b.x);

    // Extract the sorted names into a separate array
    const sortedNames = sortedData.map(item => item.name);

    Sankey_order = sortedNames;

    updateSankey();

    }
    



}
