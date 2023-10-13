// Function to create the lollipop chart
function createLollipopChart() {
    
    // mexer aqui para alterar o tamanho do chart!!!!!
    const margin = { top: 10, right: 30, bottom: 90, left: 60 }; // Adjusted left margin for labels
    const width = 2000 - margin.left - margin.right; // Increased width
    const height = 500 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
    const svg = d3.select("#lollipopChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

// Assuming you have your data in the "countryMedian" variable
    const data = Array.from(countryMedian.entries()).map(([Residence, SPIN_T]) => ({ Residence, SPIN_T }));

// X axis
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.Residence))
        .padding(1);

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

// Y axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.SPIN_T)])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

// Lines
    svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", d => x(d.Residence) + x.bandwidth() / 2)
        .attr("x2", d => x(d.Residence) + x.bandwidth() / 2)
        .attr("y1", d => y(d.SPIN_T))
        .attr("y2", y(0))
        .attr("stroke", "grey");

// Circles
    svg.selectAll("mycircle")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.Residence) + x.bandwidth() / 2)
        .attr("cy", d => y(d.SPIN_T))
        .attr("r", 5)
        .attr("fill", "purple");

// Chart title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top)
        .attr("text-anchor", "middle")
        .text("Average SPIN_T by Residence");

// Label for Y-axis
    svg.append("text")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 10)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Average SPIN_T (Median)");



}


