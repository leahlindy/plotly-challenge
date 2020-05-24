function getPlots(id) {
  //Read samples.json
      d3.json("data/samples.json").then (data =>{
          console.log(data)
          var samples = data.samples;
          
          var ids = samples[0].otu_ids;
          console.log(ids)
          
          var sampleValues =  samples[0].sample_values.slice(0,10).reverse();
          console.log(sampleValues)
          
          var labels =  samples[0].otu_labels.slice(0,10);
          console.log (labels)
          
      // need only top 10 (slice(0,10)) otu in reversed order 
          var OTU_top = (samples[0].otu_ids.slice(0, 10)).reverse();
      
       // get otu ID based on the top 10 OTU (return OTU #)
          var OTU_id = OTU_top.map(d => "OTU " + d);
          console.log(`OTU IDS: ${OTU_id}`)
       
          // get the top 10 labels for the plot
          var labels =  samples[0].otu_labels.slice(0,10);
          console.log(`OTU_labels: ${labels}`)
          var trace1 = {
              x: sampleValues,
              y: OTU_id,
              text: labels,
              marker: {
              color: 'lightblue'},
              type:"bar",
              orientation: "h",
          };
          // create data variable
          var data1 = [trace1];
  
          // create layout variable to set plots layout
          var layout_1 = {
              title: "Top 10 OTU",
              yaxis:{
                  tickmode:"linear",
              },
              margin: {
                  l: 100,
                  r: 100,
                  t: 100,
                  b: 30
              }
          };
  
          // create the bar plot
      Plotly.newPlot("bar", data1, layout_1);
          // The bubble chart
          var trace2 = {
              x: samples[0].otu_ids,
              y: samples[0].sample_values,
              mode: "markers",
              marker: {
                  size: samples[0].sample_values,
                  color: samples[0].otu_ids
              },
              text:  samples[0].otu_labels
  
          };
  
          // set the layout for the bubble plot
          var layout_2 = {
              xaxis:{title: "OTU ID"},
              height: 600,
              width: 1000
          };
  
          // creating data variable 
          var data2 = [trace2];
  
      // create the bubble plot
      Plotly.newPlot("bubble", data2, layout_2); 
      
      });
  }  

// create the function to get the necessary demographic data (based on selected id)
function getDemoData(id) {
  // read the json file to get data
      d3.json("data/samples.json").then((data)=> {
  
    // get the metadata info (demographic panel)
          var metadata = data.metadata;
  
          console.log(metadata)
  
        // filter meta data info by id
         var searchID = metadata.filter(meta => meta.id.toString() === id)[0];
        // select demographic panel to put data
         var demographicInfo = d3.select("#sample-metadata");
          
       // empty this field to allow for new data with each event change
         demographicInfo.html("");
  
       // append data from specific searchID to the html (all key values in search ID object)
          Object.entries(searchID).forEach((key) => {   
              demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
          });
      });
  }


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
      getDemoData(data.names[0]);
      getPlots(data.names[0]);
  });
}
// call init function to get initial rendering when page loads
init();