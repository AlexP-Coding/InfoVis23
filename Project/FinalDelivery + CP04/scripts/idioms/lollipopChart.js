var xNames;
var yValues;
var width_lp;
var height_lp;
var residenceDataMap;
var xScale_p;
var allVariables;
var residenceDataMap_2;

function createLollipopChart() {
    // Function to create the lollipop chart
    //const groupedData = d3.group(currentData_CM, (d) => d.Residence);

    
    // mexer aqui para alterar o tamanho do chart!!!!!
    const margin_lp = { top: 10, right: 10, bottom: 90, left: 40 }; // Adjusted left margin_lp for labels
    width_lp = window.innerWidth - margin_lp.left - margin_lp.right; // Increased width
    height_lp = 400 - margin_lp.top - margin_lp.bottom;

    // Append the SVG object to the body of the page
    const svg = d3.select("#lollipopChart")
        .append("svg")
        .attr("width", width_lp + margin_lp.left + margin_lp.right)
        .attr("height", height_lp + margin_lp.top + margin_lp.bottom)
        .append("g")
        .attr("transform", `translate(${margin_lp.left},${margin_lp.top})`);


    const data = Array.from(countryMedian.entries()).map(([Residence, SPIN_T]) => ({ Residence, SPIN_T }));

    // X axis
    xNames = d3.scaleBand()
        .range([0, width_lp])
        .domain(data.map(d => d.Residence))
        .padding(2);


    svg.append("g")
        .attr("id","xAxis")
        .attr("transform", `translate(0, ${height_lp})`)
        .call(d3.axisBottom(xNames))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Y axis
    yValues = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.SPIN_T)])
        .range([height_lp, 0]);

    svg.append("g")
        .call(d3.axisLeft(yValues));

    // Lines
    svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", d => xNames(d.Residence) + xNames.bandwidth() / 2)
        .attr("x2", d => xNames(d.Residence) + xNames.bandwidth() / 2)
        .attr("y1", d => yValues(d.SPIN_T))
        .attr("y2", yValues(0))
        .attr("class","LollipopLine data")
        .attr("stroke", "grey")
        .on("mouseover", handleMouseOverCountry)
        .on("mouseout", handleMouseOutCountry);

    // Circles
    svg.selectAll(".Lcircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xNames(d.Residence) + xNames.bandwidth() / 2)
        .attr("cy", d => yValues(d.SPIN_T))
        .attr("r", 5)
        .attr("class", "Lollipopcircle data")
        .attr("fill", d => d3.interpolatePurples(colorScale(d.SPIN_T)))
        .on("mouseover", handleMouseOverCountry)
        .on("mouseout", handleMouseOutCountry);
        


    // Chart title
    svg.append("text")
        .attr("x", width_lp / 2)
        .attr("y", margin_lp.top)
        .attr("text-anchor", "middle")
        .text("Median SPIN_T by Residence")
        .style("font-family", "Arial, sans-serif");

    // Label for Y-axis
    svg.append("text")
        .attr("x", -height_lp / 2)
        .attr("y", -margin_lp.left + 10)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Median SPIN_T")
        .style("font-family", "Arial, sans-serif");
    
   

   //Petals-------------------------------------------------------------------------------------------------------
    
    

   allVariables = new Set(currentData_CM.map(d => d.SPIN_M));

    // Create a rollup using the set of all variables
    var SPIN_M_totals = d3.rollup(currentData_CM, 
    v => v.length, 
    d => d.Residence, 
    d => d.SPIN_M
    );
    
   // Iterate through all variables and fill in missing variables with a value of zero
   allVariables.forEach(variable => {
    SPIN_M_totals.forEach((residenceMap, residence) => {
      if (!residenceMap.has(variable)) {
        residenceMap.set(variable, 0);
      }
    });
    }); 

    //console.log(SPIN_M_totals)

    // Create a Map to store the separate data frames for each residence
    residenceDataMap = new Map();

    // Iterate through the main map (SPIN_M_totals)
    SPIN_M_totals.forEach((residenceMap, residence) => {
    // Convert each residence's data into a data frame
    const dataFrame = Array.from(residenceMap, ([variable, value]) => ({
        Variable: variable,
        Value: value,
    }));
    
    // Set the data frame as the value in the residenceDataMap with the residence as the key
    residenceDataMap.set(residence, dataFrame);
    });

    residenceDataMap_2 = residenceDataMap

    // Now, residenceDataMap will contain a Map with each residence as the key and the corresponding data frame as the value
    //console.log(residenceDataMap);

    // X scale
    xScale_p = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing ?
        .domain(residenceDataMap.get('USA').map(d => d.Variable)); // The domain of the X axis is the list of states.

    

    /*for(circle of circleInfo){

       max_value = d3.max(residenceDataMap.get(circle.Residence), d => d.Value)

       var yScale_p = d3.scaleRadial()
        .range([5, 20])   // Domain will be define later.
        .domain([0,max_value]); // Domain of Y is from 0 to the max seen in the data

        svg
        .append("g")
            .attr("id",circle.Residence.replace(/ /g, "_").replace(/&/g, "and"))
            .attr("transform", `translate(${circle.cx},${circle.cy})`)
            .selectAll("path")
            .data(residenceDataMap.get(circle.Residence))
            .join("path")
            .attr("fill", "red")
            .attr("d", d3.arc()     // imagine your doing a part of a donut plot
                .innerRadius(5)
                .outerRadius(d => yScale_p(d.Value))
                .startAngle(d => xScale_p(d.Variable))
                .endAngle(d => xScale_p(d.Variable) + xScale_p.bandwidth())
                .padAngle(2)
                .padRadius(5))

    }*/

    for (key of residenceDataMap.keys()){

        max_value = d3.max(residenceDataMap.get(key), d => d.Value)

        const correspondingObject = data.find(d => d.Residence == key)

        var yScale_p = d3.scaleRadial()
            .range([5, 20])   // Domain will be define later.
            .domain([0,max_value]); // Domain of Y is from 0 to the max seen in the data

            svg
            .append("g")
                .attr("class","Petals")
                .attr("id",key.replace(/ /g, "_").replace(/&/g, "and"))
                .attr("transform", `translate(${xNames(correspondingObject.Residence) + xNames.bandwidth() / 2},${yValues(correspondingObject.SPIN_T)})`)
                .selectAll("path")
                .data(residenceDataMap.get(key))
                .join("path")
                .attr("fill", "red")
                .attr("d", d3.arc()     // imagine your doing a part of a donut plot
                    .innerRadius(5)
                    .outerRadius(d => yScale_p(d.Value))
                    .startAngle(d => xScale_p(d.Variable))
                    .endAngle(d => xScale_p(d.Variable) + xScale_p.bandwidth())
                    .padAngle(2)
                    .padRadius(5))

    }


















    



}




function updateLollipopChart(sortingOption) {


    const data = Array.from(countryMedian.entries()).map(([Residence, SPIN_T]) => ({Residence, SPIN_T}));


    let sortedData = data;

    if (sortingOption === 'alphabetical') {
        sortedData = data.sort((a, b) => d3.ascending(a.Residence, b.Residence));
    } else if (sortingOption === 'spinT') {
        sortedData = data.sort((a, b) => d3.descending(a.SPIN_T, b.SPIN_T));
    } else if (sortingOption === 'avgHoursPlayed') {
        // Calculate the average hours played for each residence.
        const avgHoursPlayedData = Array.from(groupedData).map(([Residence, values]) => {
            const avgHoursPlayed = d3.mean(values, (d) => d.AvgHoursPlayed); // Update with the actual field name
            return { Residence, AvgHoursPlayed: avgHoursPlayed };
        });

        // Sort the data based on average hours played.
        sortedData = data.sort((a, b) => d3.descending(a.AvgHoursPlayed, b.AvgHoursPlayed));
    }


    xNames = d3.scaleBand()
        .domain(sortedData.map(d => d.Residence)).range([0, width_lp]);

    
    //yValues = d3.scaleLinear()
    //    .domain([0, d3.max(sortedData, d => d.SPIN_T)]).range([height_lp, 0]);

    d3.select("#xAxis")
        .transition()
        .duration(1000) // You can adjust the duration as needed
        .call(d3.axisBottom(xNames))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");


    // Select all lines with class "LollipopLine"
    var lines = d3.selectAll(".LollipopLine")
        .data(sortedData);

    // Transition for updating lines (lines that existed before)
    lines.transition()
        .duration(1000)
        .attr("x1", d => xNames(d.Residence) + xNames.bandwidth() / 2)
        .attr("x2", d => xNames(d.Residence) + xNames.bandwidth() / 2)
        .attr("y1", d => yValues(d.SPIN_T))
        .attr("y2", yValues(0))
        .style("display", "block"); // Show the lines

    // Enter selection for new data points
    lines.enter()
        .append("line")
        .attr("class", "LollipopLine")
        .attr("x1", d => xNames(d.Residence) + xNames.bandwidth() / 2)
        .attr("x2", d => xNames(d.Residence) + xNames.bandwidth() / 2)
        .attr("y1", d => yValues(d.SPIN_T))
        .attr("y2", yValues(0));

    // Exit selection for lines that need to be removed
    lines.exit()
        .style("display", "none"); // Hide the lines


    //circleInfo = [];
//---------------------------------------------------------------------------Circle Update


    // Select all circles with class "Lollipopcircle"
    var circles = d3.selectAll(".Lollipopcircle")
        .data(sortedData, function (d) {
            return d.Residence; // Use a key function to identify data points
        });

    // Transition for updating circles (circles that existed before)
    circles.transition()
        .duration(1000)
        .attr("cx", function (d) {
            return xNames(d.Residence) + xNames.bandwidth() / 2;
        })
        .attr("cy", d => yValues(d.SPIN_T))
        .attr("fill", d => d3.interpolatePurples(colorScale(d.SPIN_T)))
        .style("display", "block"); // Show the circles

    // Enter selection for new data points
    circles.enter()
        .append("circle")
        .attr("class", "Lollipopcircle")
        .attr("cx", function (d) {
            return xNames(d.Residence) + xNames.bandwidth() / 2;
        })
        .attr("cy", d => yValues(d.SPIN_T))
        .attr("fill", d => d3.interpolatePurples(colorScale(d.SPIN_T)));

    // Exit selection for circles that need to be removed
    circles.exit()
        .style("display", "none"); // Hide the circles



    // Now, residenceDataMap will contain a Map with each residence as the key and the corresponding data frame as the value
    //console.log(circleInfo);

   //---------------------------------Petals--------------------------------------------------------------


    // Create a rollup using the set of all variables
    var SPIN_M_totals = d3.rollup(currentData_CM, 
    v => v.length, 
    d => d.Residence, 
    d => d.SPIN_M
    );
    
   // Iterate through all variables and fill in missing variables with a value of zero
   allVariables.forEach(variable => {
    SPIN_M_totals.forEach((residenceMap, residence) => {
      if (!residenceMap.has(variable)) {
        residenceMap.set(variable, 0);
      }
    });
    }); 

    // Create a Map_2 to store the separate data frames for each residence
    residenceDataMap_2 = new Map();

    // Iterate through the main map (SPIN_M_totals)
    SPIN_M_totals.forEach((residenceMap, residence) => {
    // Convert each residence's data into a data frame
    const dataFrame = Array.from(residenceMap, ([variable, value]) => ({
        Variable: variable,
        Value: value,
    }));
    
    // Set the data frame as the value in the residenceDataMap with the residence as the key
    residenceDataMap_2.set(residence, dataFrame);
    });

    // Now, residenceDataMap will contain a Map with each residence as the key and the corresponding data frame as the value
    //console.log(residenceDataMap_2);

    for (key of residenceDataMap.keys()){

        if(residenceDataMap_2.has(key)){
        const correspondingObject = sortedData.find(d => d.Residence == key)

            x = xNames(correspondingObject.Residence) + xNames.bandwidth() / 2;
            y =  yValues(correspondingObject.SPIN_T)

            const elementId = "#"+key.replace(/ /g, "_").replace(/&/g, "and");
            const element = d3.select(elementId);
            if (element) {
                element
                .transition()
                .duration(1000)
                .attr("transform", `translate(${x},${y})`)
                .style("display", "block"); // Show the element
            }

            max_value = d3.max(residenceDataMap_2.get(key), d => d.Value)

            var yScale_p = d3.scaleRadial()
            .range([5, 20])   // Domain will be define later.
            .domain([0,max_value]); // Domain of Y is from 0 to the max seen in the data

            /*const correspondingObject = sortedData.find(d => d.Residence == key)

            const elementId = "#"+key.replace(/ /g, "_").replace(/&/g, "and");
            const element = d3.select(elementId);*/

            //console.log(residenceDataMap_2.get(key),key)

            var paths = element
                .attr("transform", `translate(${xNames(correspondingObject.Residence) + xNames.bandwidth() / 2},${yValues(correspondingObject.SPIN_T)})`)
                .selectAll("path")
                .style("display", "block")
                .data(residenceDataMap_2.get(key));

            // Exit: Remove any old paths that are not in the updated data
            paths.exit().remove();

            var enterPaths = paths.enter()
            .append("path")
            .attr("fill", "red");

            // Update: Update the attributes of existing and new paths with a transition
            paths = enterPaths.merge(paths)
                .transition() // Add a transition
                .duration(1000) // Set the duration of the transition in milliseconds
                .attr("d", d3.arc()
                    .innerRadius(5)
                    .outerRadius(d => yScale_p(d.Value))
                    .startAngle(d => xScale_p(d.Variable))
                    .endAngle(d => xScale_p(d.Variable) + xScale_p.bandwidth())
                    .padAngle(2)
                    .padRadius(5));


        }
        else{
            // Key does not exist in residenceDataMap_2, hide the element
            const elementId ="#"+key.replace(/ /g, "_").replace(/&/g, "and");
            const element = d3.select(elementId);
            if (element) {
                element.style("display", "none"); // Hide the element
            }
        }


    }

    
}







