// Declare variables to hold the loaded csv data.
var globalData;
var spinAnswersData;
var spinQuestionsData;
var spinResultsData;

// Define margins for the visualizations. 
const margin = { top: 20, right: 20, bottom: 50, left: 80 };

// Calculate the width and height of the visualizations based on the margins.
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;


// This function initiates the dashboard and loads the csv data.
function startDashboard() {
  // Load the csv data using D3.js.
  d3.csv("data/clean_data.csv")
    .then((data) => {
      // Once the data is loaded successfully, store it in the globalData variable.
      globalData = data;

      // Create different visualizations using the loaded data.
      createChoroplet(data);
      createSankey(data)
      createCustomIdiom(data);
      createScatterPlot(data);
    })
    .catch((error) => {
      // If there's an error while loading the csv data, log the error.
      console.error("Error loading the main csv file:", error);
    });

    d3.csv("data/spin_answers.csv")
    .then((spin_answers_data) => {
      // Once the data is loaded successfully, store it in the corresponding variable.
     spinAnswersData = spin_answers_data;
    })
    .catch((error) => {
      // If there's an error while loading the csv data, log the error.
      console.error("Error loading a secondary csv file:", error);
    });

    d3.csv("data/spin_questions.csv")
    .then((spin_questions_data) => {
      // Once the data is loaded successfully, store it in the corresponding variable.
     spinQuestionsData = spin_questions_data;
    })
    .catch((error) => {
      // If there's an error while loading the csv data, log the error.
      console.error("Error loading a secondary csv file:", error);
    });

    d3.csv("data/spin_results.csv")
    .then((spin_results_data) => {
      // Once the data is loaded successfully, store it in the corresponding variable.
     spinResultsData = spin_results_data;
    })
    .catch((error) => {
      // If there's an error while loading the csv data, log the error.
      console.error("Error loading a secondary csv file:", error);
    });
}


// This function updates the visualizations based on the selected data type(s).
function updateIdioms(data) {
  // Use a switch statement to check which data type is selected.
  switch (data) {
    default:
      // If no specific data type is selected, update the visualizations with all the data.
      updateChoroplet(globalData);
      updateSankey(globalData);
      updateCustomIdiom(globalData);
      updateScatterPlot(globalData);
      break;
  }
}
