// Declare a variable to hold the loaded JSON data.
var globalDataCapita;

// Define margins for the visualizations. 
const margin = { top: 20, right: 20, bottom: 50, left: 80 };

// Calculate the width and height of the visualizations based on the margins.
const width = 900 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;


//Função para iniciar o DashBoard
function startDashboard(){
  d3.csv("gapminder.csv")
    .then((data) => {
      // Once the data is loaded successfully, store it in the globalData variable.
      globalDataCapita = data;

      // Convert incomeperperson and alcconsumption data to numbers
      globalDataCapita.forEach(function (d) {
          d.femaleemployrate = +d.femaleemployrate;
          d.hivrate = +d.hivrate;
          d.internetuserate = +d.internetuserate;
      });

      createClevelandDotPlot();
    })
    .catch((error) => {
      // If there's an error while loading the CSV data, log the error.
      console.error("Error loading the CSV file:", error);
    });

}

//Criar o Cleveland Dot Plot

function createClevelandDotPlot(){
  // Filter the data to remove entries with missing femaleemployrate or hivrate or internetusagerate values
  currentData = globalDataCapita.filter(function (d) {
    return d.femaleemployrate != "" && d.hivrate != "" && d.internetuserate != "";
  });

  // Create a title for the ClevelandDotPlot
  const chartTitle = d3
    .select("#ClevelandTitle")
    .append("text")
    .attr("x", (width + margin.left + margin.right) / 2)
    .attr("y", margin.top)
    .text("Cleveland Dot Plot");

  //Create SVG to hold ClevelandDotPlot
  const svg = d3
    .select("#ClevelandDotPlot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  //Create X Scale
  const xScale = d3
  .scaleLinear()
  .domain([0,Math.round(d3.max(currentData, (d) => d.internetuserate))+1])
  .range([0, width]);

  //Create Y Scale
  const yScale = d3
  .scaleBand()
  .domain(currentData.map((d) => d.country))
  .range([0, height])
  .padding(0);

  // Create custom tick values for the x-axis
  var xTicks = [];
  for (let index = 0; index <= 1; index += 0.05) {
    xTicks.push(Math.round(xScale.invert(index * width)));
  }

  // Use data for custom tick values on the y-axis
  var yTicks = currentData.map((d) => d.country);

  svg
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${height})`)
  .call(
    d3
      .axisBottom(xScale)
      .tickValues(xTicks) // Set custom tick values for the x-axis
      .tickSize(-height) // Create Grid X
      //.tickFormat("") // remove labels
      //.tickSizeOuter(0)
  );

  svg
  .append("g")
  .attr("class", "y-axis")
  .call(
    d3
      .axisLeft(yScale)
      .tickSize(-width) // Create grid Y
  );

  // Add labels for the x and y axes
  svg
    .append("text")
    .attr("class", "x-axis-label")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 20)
    .style("text-anchor", "middle")
    .text("Red - Female Employ Rate, Blue - Internet Use Rate, Green - hiv Rate");

  svg
    .append("text")
    .attr("class", "y-axis-label")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 15)
    .style("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Country");

  //Add circle 1

  svg.selectAll(".circle")
    .data(currentData)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.femaleemployrate))  // Set the x-coordinate of the circle based on 'femaleemployrate' property
    .attr("cy", (d) => yScale(d.country)+ yScale.bandwidth() / 2)   // Set the y-coordinate for each country
    .attr("r", 3.5)  // Set the radius of the circle to 5 pixels
    .attr("fill", "red")  // Set the fill color of the circle to red
    .attr("stroke", "black")  // Set the stroke (border) color of the circle to black

  //Add circle 2

  svg.selectAll(".circle")
    .data(currentData)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.internetuserate))  // Set the x-coordinate of the circle based on 'internet' property
    .attr("cy", (d) => yScale(d.country)+ yScale.bandwidth() / 2)   // Set the y-coordinate for each country
    .attr("r", 3.5)  // Set the radius of the circle to 5 pixels
    .attr("fill", "blue")  // Set the fill color of the circle to blue
    .attr("stroke", "black")  // Set the stroke (border) color of the circle to black

  //Add circle 3
  svg.selectAll(".circle")
    .data(currentData)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.hivrate))  // Set the x-coordinate of the circle based on 'hivrate' property
    .attr("cy", (d) => yScale(d.country)+ yScale.bandwidth() / 2)   // Set the y-coordinate for each country
    .attr("r", 3.5)  // Set the radius of the circle to 5 pixels
    .attr("fill", "green")  // Set the fill color of the circle to green
    .attr("stroke", "black")  // Set the stroke (border) color of the circle to black

  
}

