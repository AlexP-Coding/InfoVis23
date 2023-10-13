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
		currentData = results[1]

		//Load secondary data
		spinAnswersData = results[2];
		spinQuestionsData = results[3];
		spinResultsData = results[4];
	
		createChoroplethMap();
		createLollipopChart();
	//	createCustomIdiom();
// TODO		createSankey();
// TODO		createScatterplot();
	
	})
	.catch((error) => {
		// If there's an error while loading the csv data, log the error.
		console.error("Error loading the files:", error);
	});

	
}


// This function updates the visualizations based on the selected data type(s).
function updateIdioms(data=null) {
	updateChoropleth();
	updateLollipopChart(data);	
// TODO	updateCustomIdiom(data);
// TODO	updateSankey(data);
// TODO	updateScatterplot(data);
}
