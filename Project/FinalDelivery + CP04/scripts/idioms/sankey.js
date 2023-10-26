var sankeyData
var sankeyClasses = ['Work','Relation','Online','Gender','Multiplayer']
var sankeyData_used
var Sankey_order
var sankey
var rect;
var link;
var labels;
var color;
var format;

// Function to create the sankey chart
function createSankey() {
   // Select the #sankeyChart element and append an SVG to it
    const svg = d3
        .select("#sankeyChart")
        .append("svg")
        .attr("id", "mySankeySVG") // Add an id attribute to the svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    sankeyData = {
        nodes: [],
        links: []
    };

    // Function to check if a node with a specific ID already exists in sankeyData.nodes
    function isNodeInSankeyData(nodeId) {
        return sankeyData.nodes.some(function (node) {
            return node.name === name;
        });
    }

    function isLinkInSankeyData(sourceNodeId, targetNodeId) {
        return sankeyData.links.some(function (link) {
            return link.source === sourceNodeId && link.target === targetNodeId;
        });
    }

    //Criar o conjunto de dados necessário para o sankey ------------------

    for (const item of currentData_CM){

        for (const columnName of sankeyClasses){

            var nodeId = item[columnName];

            //console.log(nodeId)

            var name = `${columnName}: ${nodeId}`
            

            if (!isNodeInSankeyData(name)){
                sankeyData.nodes.push({
                    id: nodeId,
                    name: name,
                    class: columnName
                });
            }

            for (const otherClass of sankeyClasses) {
                if (otherClass !== columnName) {

                    var nodeID_t = item[otherClass]
                    var targetID = `${otherClass}: ${nodeID_t}`
                    
                    if(!isLinkInSankeyData(name,targetID)){
                        
                        sankeyData.links.push({
                            source: name,
                            target: targetID,
                            value: 1
                        });
                    }
                    else{

                        var linkToModify = sankeyData.links.find(function (link) {
                            return link.source === name && link.target === targetID;

                        });
                        
                        linkToModify.value = linkToModify.value+1; // Set the new value
                    }

                }
            }
        }
    }

    Sankey_order = ['Work','Online','Relation','Gender','Multiplayer']

    sankeyData_used =  {
        nodes: [],
        links: []
    };

    sankeyData_used.nodes = sankeyData.nodes
    
    function getClassOfNode(nodeId) {
        const node = sankeyData.nodes.find(node => node.name === nodeId);
        return node ? node.class : null;
    }

    for (var j = 0; j < Sankey_order.length-1; j++){

        const matchingLinks = sankeyData.links.filter(link => {
            const sourceClass = getClassOfNode(link.source);
            const targetClass = getClassOfNode(link.target);
            return sourceClass === Sankey_order[j] && targetClass === Sankey_order[j+1];
        });

        sankeyData_used.links = sankeyData_used.links.concat(matchingLinks)

    }

    console.log(sankeyData_used);
    
    //---------------------------------------------------------------------------------------------------------------------
    format = d3.format(",.0f");

     // Constructs and configures a Sankey generator.
    sankey = d3.sankey()
        .nodeId(d => d.name)
        .nodeAlign(d3.sankeyLeft) // d3.sankeyLeft, etc.
        .nodeWidth(15)
        .nodePadding(10)
        .extent([[1, 5], [width - 1, height - 5]]);

    // Applies it to the data. We make a copy of the nodes and links objects
    // so as to avoid mutating the original.
    const {nodes, links} = sankey({
        nodes: sankeyData_used.nodes.map(d => Object.assign({}, d)),
        links: sankeyData_used.links.map(d => Object.assign({}, d))
    });

    // Defines a color scale.
    color = d3.scaleOrdinal(d3.schemeCategory10);

    // Creates the rects that represent the nodes.
    rect = svg.append("g")
        .attr("stroke", "#000")
        .selectAll()
        .data(nodes)
        .join("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("fill", d => color(d.class));

    // Adds a title on the nodes.
    rect.append("title")
        .text(d => `${d.name}\n${format(d.value)} TWh`);

    // Creates the paths that represent the links.
    link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.5)
        .selectAll()
        .data(links)
        .join("g")
        .style("mix-blend-mode", "multiply");

    link.append("path")
        .attr("class","pathSankey")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", "grey")
        .attr("stroke-width", d => Math.max(1, d.width));

    link.append("title")
        .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)} TWh`);

    // Adds labels on the nodes.
    labels = svg.append("g")
        .selectAll()
        .data(nodes)
        .join("text")
        .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
        .attr("y", d => (d.y1 + d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
        .text(d => d.id);


}


// Function to update the sankey chart-----------------------------------------------------------------------------
function updateSankey() {
    
    sankeyData = {
        nodes: [],
        links: []
    };

    // Function to check if a node with a specific ID already exists in sankeyData.nodes
    function isNodeInSankeyData(nodeId) {
        return sankeyData.nodes.some(function (node) {
            return node.name === name;
        });
    }

    function isLinkInSankeyData(sourceNodeId, targetNodeId) {
        return sankeyData.links.some(function (link) {
            return link.source === sourceNodeId && link.target === targetNodeId;
        });
    }

    //Criar o conjunto de dados necessário para o sankey ------------------

    for (const item of currentData_CM){

        for (const columnName of sankeyClasses){

            var nodeId = item[columnName];

            //console.log(nodeId)

            var name = `${columnName}: ${nodeId}`
            

            if (!isNodeInSankeyData(name)){
                sankeyData.nodes.push({
                    id: nodeId,
                    name: name,
                    class: columnName
                });
            }

            for (const otherClass of sankeyClasses) {
                if (otherClass !== columnName) {

                    var nodeID_t = item[otherClass]
                    var targetID = `${otherClass}: ${nodeID_t}`
                    
                    if(!isLinkInSankeyData(name,targetID)){
                        
                        sankeyData.links.push({
                            source: name,
                            target: targetID,
                            value: 1
                        });
                    }
                    else{

                        var linkToModify = sankeyData.links.find(function (link) {
                            return link.source === name && link.target === targetID;

                        });
                        
                        linkToModify.value = linkToModify.value+1; // Set the new value
                    }

                }
            }
        }
    }

    Sankey_order = ['Work','Online','Relation','Gender','Multiplayer']

    sankeyData_used =  {
        nodes: [],
        links: []
    };

    sankeyData_used.nodes = sankeyData.nodes
    
    function getClassOfNode(nodeId) {
        const node = sankeyData.nodes.find(node => node.name === nodeId);
        return node ? node.class : null;
    }

    for (var j = 0; j < Sankey_order.length-1; j++){

        const matchingLinks = sankeyData.links.filter(link => {
            const sourceClass = getClassOfNode(link.source);
            const targetClass = getClassOfNode(link.target);
            return sourceClass === Sankey_order[j] && targetClass === Sankey_order[j+1];
        });

        sankeyData_used.links = sankeyData_used.links.concat(matchingLinks)

    }

    //console.log(sankeyData_used)

    const {nodes, links} = sankey({
        nodes: sankeyData_used.nodes.map(d => Object.assign({}, d)),
        links: sankeyData_used.links.map(d => Object.assign({}, d))
    });

    rect.remove();
    link.remove();
    labels.remove();

    // Creates the rects that represent the nodes.
    rect = d3.select("#mySankeySVG").append("g")
        .attr("stroke", "#000")
        .selectAll()
        .data(nodes)
        .join("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("fill", d => color(d.class));

    // Adds a title on the nodes.
    rect.append("title")
        .text(d => `${d.name}\n${format(d.value)} TWh`);

    // Creates the paths that represent the links.
    link = d3.select("#mySankeySVG").append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.5)
        .selectAll()
        .data(links)
        .join("g")
        .style("mix-blend-mode", "multiply");

    link.append("path")
        .attr("class","pathSankey")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", "grey")
        .attr("stroke-width", d => Math.max(1, d.width));

    link.append("title")
        .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)} TWh`);

    // Adds labels on the nodes.
    labels = d3.select("#mySankeySVG").append("g")
        .selectAll()
        .data(nodes)
        .join("text")
        .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
        .attr("y", d => (d.y1 + d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
        .text(d => d.id);



}