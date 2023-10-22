var xNames;
var yValues;
var width_lp;
var height_lp;

function createLollipopChart() {
    // Function to create the lollipop chart
    const groupedData = d3.group(currentData_CM, (d) => d.Residence);

    /*countryMedian = new Map([...groupedData].map(([key, values]) => {
        const medianSPIN_T = d3.median(values, (d) => d.SPIN_T);
        return [key, medianSPIN_T];
    }));*/
    
    // mexer aqui para alterar o tamanho do chart!!!!!
    const margin_lp = { top: 10, right: 10, bottom: 90, left: 40 }; // Adjusted left margin_lp for labels
    width_lp = 1500 - margin_lp.left - margin_lp.right; // Increased width
    height_lp = 240 - margin_lp.top - margin_lp.bottom;

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
        .padding(1);


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
        .attr("stroke", "grey");

// Circles
    svg.selectAll(".Lcircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xNames(d.Residence) + xNames.bandwidth() / 2)
        .attr("cy", d => yValues(d.SPIN_T))
        .attr("r", 5)
        .attr("class", "Lollipopcircle data")
        .attr("fill", d => d3.interpolatePurples(colorScale(d.SPIN_T)));

// Chart title
    svg.append("text")
        .attr("x", width_lp / 2)
        .attr("y", margin_lp.top)
        .attr("text-anchor", "middle")
        .text("Median SPIN_T by Residence");

// Label for Y-axis
    svg.append("text")
        .attr("x", -height_lp / 2)
        .attr("y", -margin_lp.left + 10)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Average SPIN_T (Median)");

    //Petals-------------------------------------------------------------------------------------------------------

   /* const innerRadius = 5;
    const outerRadius = 10;   // the outerRadius goes from the middle of the SVG area to
    var SPIN_M_totals = d3.rollup(currentData_CM, v=> v.length, d=> d.Residence, d => d.SPIN_M)


    // X scale
    var xRound = d3.scaleBand()
    .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
    .align(0)                  // This does nothing ?
    .domain(Array.from(SPIN_M_totals.get("USA").keys())); // The domain of the X axis is the list of SPIN_M

    //for (country on
    // Y scale
    var yRound = d3.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, 35]); // Domain of Y is from 0 to the max seen in the data

    var uniqueResidences = Array.from(SPIN_M_totals.keys());*/
      

    uniqueResidences.forEach(residence => {
        svg.append("g")
            .data(SPIN_M_totals.get(residence))
            .enter()
            .attr("fill", "#69b3a2")
            .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function(d) { return y(d['Value']); })
          .startAngle(function(d) { return x(d.Country); })
          .endAngle(function(d) { return x(d.Country) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))

        d3.selectAll(".Lcircle").filter(d => d.Residence == residence)

      });
       
        
      


    



}



function updateLollipopChart(sortingOption) {

    const groupedData = d3.group(currentData_CM, (d) => d.Residence);

    /*countryMedian = new Map([...groupedData].map(([key, values]) => {
        const medianSPIN_T = d3.median(values, (d) => d.SPIN_T);
        return [key, medianSPIN_T];
    }));*/

    const data = Array.from(countryMedian.entries()).map(([Residence, SPIN_T]) => ({ Residence, SPIN_T }));


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

    
    yValues = d3.scaleLinear()
        .domain([0, d3.max(sortedData, d => d.SPIN_T)]).range([height_lp, 0]);

    d3.select("#xAxis")
        .transition()
        .duration(1000) // You can adjust the duration as needed
        .call(d3.axisBottom(xNames))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");


    d3.selectAll(".LollipopLine")
        .data(sortedData)
        .transition()
        .duration(1000)
        .attr("x1", d => xNames(d.Residence) + xNames.bandwidth() / 2)
        .attr("x2", d => xNames(d.Residence) + xNames.bandwidth() / 2)
        .attr("y1", d => yValues(d.SPIN_T))
        .attr("y2", yValues(0))


    d3.selectAll(".Lollipopcircle")
        .data(sortedData)
        .transition()
        .duration(1000)
        .attr("cx", function (d){
            return xNames(d.Residence) + xNames.bandwidth() / 2;
        })
        .attr("cy", d => yValues(d.SPIN_T))
        .attr("fill", d => d3.interpolatePurples(colorScale(d.SPIN_T)))
    
    
}







