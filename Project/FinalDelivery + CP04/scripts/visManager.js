// Declare variables to hold the loaded csv data.
var globalData;
var currentData;
var spinAnswersData;
var spinQuestionsData;
var spinResultsData;
var globalDataCountries;

//Variables used in Choropleth

var currentData_CM;
var currentData_CM_update;
var countryMedian;
var SPIN_T_global;
var range_min;
var range_max;
var xScale;
var legendWidth;
var legendHeight;
var colorScale;
var clickedCountries;
var teste_mouse_over;
var groupedData;

//Variables used in Scatter Chart
var range_minAge;
var range_maxAge;

//Tooltip

var Tooltip

// Define margins for the visualizations. 
const margin = { top: 20, right: 20, bottom: 20, left: 20 };

// Calculate the width and height of the visualizations based on the margins.
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;


// This function initiates the dashboard and loads the csv data.
function startDashboard() {

	// Helper functions to load JSON and CSV files using D3's d3.json and d3.csv
	function loadJSON(file) {
		return d3.json(file);
	  }
	  function loadCSV(file) {
		return d3.csv(file);
	}

	// Function to import all files using Promise.all
	function importFiles(json1, csv1, csv2, csv3, csv4){
		return Promise.all([loadJSON(json1), loadCSV(csv1), loadCSV(csv2), loadCSV(csv3), loadCSV(csv4)]);
	}

	//File names
	const json1 = "data/data.json"
	const csv1 = "data/clean_data.csv"
	const csv2 = "data/spin_answers.csv"
	const csv3 = "data/spin_questions.csv"
	const csv4 = "data/spin_results.csv"

	importFiles(json1, csv1, csv2, csv3, csv4).then(function (results) {
		// Store the JSON data into globalDataCountries using topojson.feature
		globalDataCountries = topojson.feature(results[0], results[0].objects.countries);
		
		// Store the main data into globalDataCapita
		globalData = results[1];
		currentData = results[1];
		// TODO: Cast da coluna Residence para string OU usar o Unicode do país

		//Load secondary data
		spinAnswersData = results[2];
		spinQuestionsData = results[3];
		spinResultsData = results[4];
	
		createChoroplethMap();
		createLollipopChart();
		Tooltip = createTooltip();
		createSankey();
		createScatterplot();
	
	
	})
	.catch((error) => {
		// If there's an error while loading the csv data, log the error.
		console.error("Error loading the files:", error);
	});

	
}


// This function updates the visualizations based on the selected data type(s).
function updateIdioms() {

	currentData_CM = globalData.filter(function (d) {
		return d.Residence != "Undefined" && d.SPIN_T >= range_min && d.SPIN_T <= range_max;
	});

	// Iterate through the clicked_classes_id array and apply filters for each class_id_pair
    clicked_classes_id.forEach(function (class_id_pair) {
        currentData_CM = currentData_CM.filter(function (d) {
            return d[class_id_pair.class] === class_id_pair.id;
        });
    });

	groupedData = d3.group(currentData_CM, (d) => d.Residence);
	
	
	countryMedian = new Map([...groupedData].map(([key, values]) => {
		const medianSPIN_T = d3.median(values, (d) => d.SPIN_T);
		return [key, medianSPIN_T];
	}));

	updateChoropleth();
	updateLollipopChart();	
  updateSankey();
  updateScatterPlot();
}

function createTooltip(){

	var Tooltip = d3
	  .select("body")
	  .append("div")
	  .style("opacity", 0)
	  .attr("class", "d3-tooltip")
	  .style("background-color", "white")
	  .style("border", "solid")
	  .style("border-width", "2px")
	  .style("border-radius", "5px")
	  .style("padding", "5px")
	  .style("position", "absolute") // Set the position to "absolute"
	  .style("left", "0px") // Set the initial left position (modify as needed)
	  .style("top", "0px"); // Set the initial top position (modify as needed)
	  // Return the tooltip reference
	return Tooltip;
  }
