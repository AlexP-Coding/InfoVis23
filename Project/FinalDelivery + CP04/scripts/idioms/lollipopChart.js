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
    svg.selectAll("Lcircle")
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
        .text("Median SPIN_T");
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
        .attr("fill", d => d3.interpolatePurples(colorScale(d.SPIN_T)));



}







