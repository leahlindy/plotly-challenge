
// function optionChanged() {
//   var selectID = d3.select("#selDataset").node.value();
//   console.log(selectID);}

//   d3.json("data/samples.json").then((importedData) => {
//     console.log(importedData);
//     // Declare variables for objects in imported data
//     var data = importedData;
    
//     var names = importedData.names;
//     var metadata = importedData.metadata;
//     var samples = importedData.samples;
    
//     // sample ids (153)-- of each 153 need to sort top 10 otu_id within each
//     // create empty list to hold variables 
//     labels=[];
//     values=[];
//     hovers=[];

//     // id needs to be selected first (i= selected individual (samples.id))
//     for(i=0; i<10; i++){
//         var value = samples[i].sample_values;
//         values.push(value);

//         var label = samples[i].otu_ids;
//         labels.push(label);

//         var hover = samples[i].otu_labels;
//         hovers.push(hover);
//     };
//     console.log(values);
//     console.log(labels);
//     console.log(hovers);


//     var trace1 = {
//         x: values,
//         y: labels,
//         text: hovers,
//         name: "Samples",
//         type: "bar",
//         orientation: "h"
//       };
//     var data =[trace1];
//     var layout = {
//         title: "Sample information",
//         margin: {
//           l: 100,
//           r: 100,
//           t: 100,
//           b: 100
//         }
//       };
      
//       // Render the plot to the div tag with id "bar"
//       Plotly.newPlot("bar", data, layout);
// });


// optionChanged();

// // function to get necessary data based on id selected
// function getData(id) {
//   var dropdownMenu = d3.select("#selDataset"); //the id of dropdown
//   var dataset = dropdownMenu.property("value"); // value to the menu options
//   var data =[]; //empty array for countrys data (each option):
//   console.log(dataset);

//   // use case to define which data will be used for updatePlotly (153 ids)
  
//   //updatePlotly(data); // now update the call function given the data selected
//   }

// form = d3.selectAll("#selDataset"); // define the form (ID selection)
// form.on("change", getData); // event triggers get Data event handler

// create the event handler for when id is selected ("change event")
function optionChanged(id) {
  updatePlotly(id);
  getData(id);
}

// create the function for the initial data rendering
function init() {
  // select dropdown menu 
  var dropdown = d3.select("#selDataset");

  // read the data 
  d3.json("data/samples.json").then((data)=> {
      console.log(data)

      // get the id data to the dropdwown menu
      data.names.forEach(function(name) {
          dropdown
          .append("option")
          .attr("class","testSubject")
          .text(name)
          .property("value");
      });

      // call the functions to display the data and the plots to the page
      //updatePlotly(data.names[0]);
      getData(data.names[0]);
  });
}
// call init function to get initial rendering when page loads
init();