 // create the event handler for when id is selected ("change event")
 function optionChanged(id) {
  getPlots(id);
  getDemoData(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");
  
    // read the data 
    d3.json("data/samples.json").then((data)=> {
        //console.log(data)
  
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
        getDemoData(data.names[0]);
        getPlots(data.names[0]);
    });
  }

 // call init function to get initial rendering when page loads
 init();