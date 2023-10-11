// Function to handle mouseover event
function handleMouseOver(event, item) {
  // Select all elements with class "data" and filter based on the item's properties
  d3.selectAll(".data")
    .filter(function (d) {
      // Check if "properties" exist in both item and d objects
      if ("properties" in item) {
        if ("properties" in d) {
          return item.properties.name == d.properties.name;
        } 
        else {
          return item.properties.name == d.country;
        }
      } else if ("properties" in d) {
        return item.country == d.properties.name;
      } else {
        return item.country == d.country;
      }
    })
    .attr("fill", "red"); // Change the fill color of the matching elements to red
  
  linkData = globalDataCapita.filter(function (d) {
    return d.incomeperperson != "" && d.alcconsumption != "";
  });
  
  Tooltip
    .style("opacity", 1)
    .style("left", event.pageX + 10 + "px")
    .style("top", event.pageY + 10 + "px")
  if ("properties" in item)
  {
    const linkedItem = linkData.find(d => d.country == item.properties.name);
    Tooltip.html(`<div>Income per person: ${linkedItem.incomeperperson}</div>`
    + `<div>Alcohol Comsuption: ${linkedItem.alcconsumption}</div>`
    + `<div>Employ rate: ${linkedItem.employrate}</div>`)
  }
  else
  {
    Tooltip.html(`<div>Income per person: ${item.incomeperperson}</div>`
    + `<div>Alcohol Comsuption: ${item.alcconsumption}</div>`
    + `<div>Employ rate: ${item.employrate}</div>`)
  }
  d3.select(this)
    .style("stroke", "black")
    .style("opacity", 1)
      
}



// Function to handle mouseout event
function handleMouseOut(event, item) {
  // Filter the current data to remove entries with missing incomeperperson values
  currentData = globalDataCapita.filter(function (d) {
    return d.incomeperperson != "";
  });

  // Create a color scale for the incomeperperson values
  const colorScale = d3
    .scaleLog()
    .domain([
      d3.min(currentData, (d) => d.incomeperperson),
      d3.max(currentData, (d) => d.incomeperperson),
    ])
    .range([0, 1]);

  // Reset the fill color of all elements with class "country data" to black
  d3.selectAll(".country.data").attr("fill", "black");

  // Set the fill color of each country based on its incomeperperson value
  currentData.forEach((element) => {
    d3.selectAll(".country.data")
      .filter(function (d) {
        return d.properties.name == element.country;
      })
      .attr("fill", d3.interpolateBlues(colorScale(element.incomeperperson)));
  });

  // Reset the fill color of all elements with class "circle data" to steelblue
  d3.selectAll("circle.data").attr("fill", "steelblue");

  Tooltip
    .style("opacity", 0)
  d3.selectAll(this)
    .style("stroke", "none")
    .style("opacity", 0.8)

}


// Function to handle clicks

clickedMarks = []
//labels = []
grid_coordinates = []
let currentX = 10; // Initial X position
let currentY = 10; // Initial Y position
const rowHeight = 50; // Height of each row
const spacingX = 10; // Horizontal spacing between rectangles
rectW = 100;
const range_x = Math.floor((svgWidth-10)/(rectW+spacingX))

//Define the grid of coordinates

for(let j = 0; j < 2; j++){
  for (let i = 0; i < range_x; i++){
    grid_coordinates.push({ x: 10+(rectW+spacingX)*i, y: 10+50*j });
  } 
}


let existingMarkIndex;
function handleClick(event,item) {



  if ("properties" in item){
    existingMarkIndex = clickedMarks.findIndex((markData) => markData.country == item.properties.name);
  }
  else{
    existingMarkIndex = clickedMarks.findIndex((markData) => markData.country === item.country)
  }
  


  if (existingMarkIndex !== -1) {
    // If a Mark exists, remove it and remove its data from the array
    const removedMarkData = clickedMarks.splice(existingMarkIndex, 1)[0];
    
    const xValue = removedMarkData.x; // Assuming x is a property in removedMarkData
    const yValue = removedMarkData.y; // Assuming y is a property in removedMarkData

    grid_coordinates.push({x:xValue, y:yValue});

    // Remove the rectangle from the SVG
    removedMarkData.groupElement.remove();

    grid_coordinates.sort((a, b) => a.y - b.y);
    grid_coordinates.sort((a, b) => a.x - b.x);


  } else {

    const group = d3.select("#mySVG").append("g")

    // Create a new rectangle with the calculated position
    const newRectangle = group.append("rect")
      .attr("x", grid_coordinates[0].x) // specify the X coordinate of the rectangle
      .attr("y", grid_coordinates[0].y) // specify the Y coordinate of the rectangle
      .attr("width", rectW) // specify the width of the rectangle
      .attr("height", 20) // specify the height of the rectangle
      .attr("fill", "#a1a1a1") // specify the fill color (customize as needed)
      .on("click",(event) => handleClickRectangle(event, item));

    const newText = group.append("text")
      .attr("x", parseFloat(newRectangle.attr("x"))+5) // Adjust the X position as needed
      .attr("y", parseFloat(newRectangle.attr("y")) + 15) // Adjust the Y position as needed
    
    if ("properties" in item) {
      newText.text(item.properties.name);
    } else {
      newText.text(item.country);
    }

    grid_coordinates.splice(0, 1)//Remove those coordinates from grid
      
    grid_coordinates.sort((a, b) => a.y - b.y);
    grid_coordinates.sort((a, b) => a.x - b.x);

    // Store data about the clicked element and its associated rectangle
    if ("properties" in item){
    clickedMarks.push({ 
      groupElement: group, 
      country: item.properties.name, 
      x: newRectangle.attr("x"), 
      y: newRectangle.attr("y")
    }); // Store the mark type as "rectangle"
    }
    else{
    clickedMarks.push({ 
      groupElement: group,  
      country: item.country, 
      x: newRectangle.attr("x"), 
      y: newRectangle.attr("y")}); // Store the mark type as "rectangle"
    }
  
  }
 
}

function handleClickRectangle(event,item){
  
  if ("properties" in item){
    existingMarkIndex = clickedMarks.findIndex((markData) => markData.country == item.properties.name);
  }
  else{
    existingMarkIndex = clickedMarks.findIndex((markData) => markData.country === item.country)
  }

  if (existingMarkIndex !== -1) {
    // If a Mark exists, remove it and remove its data from the array
    const removedMarkData = clickedMarks.splice(existingMarkIndex, 1)[0];
    
    const xValue = removedMarkData.x; // Assuming x is a property in removedMarkData
    const yValue = removedMarkData.y; // Assuming y is a property in removedMarkData

    grid_coordinates.push({x:xValue, y:yValue});

    // Remove the rectangle from the SVG
    removedMarkData.groupElement.remove();

    grid_coordinates.sort((a, b) => a.y - b.y);
    grid_coordinates.sort((a, b) => a.x - b.x);
  }
    
}


