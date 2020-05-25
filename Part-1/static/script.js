function getPlots(id) {
    //Read samples.json
        d3.json("data/samples.json").then (data =>{
            console.log(data)
            var samples = data.samples;
            
            var id = d3.select("#selDataset")
                    .property("value");
            console.log(id);
            
            // filter sample data id (dynamic plot)
            var searchID = samples.filter(sample => sample.id.toString() === id)[0];
            console.log(searchID);
            
            var ids = searchID.otu_ids;
            console.log(ids);

            var sampleValues =  searchID.sample_values.slice(0,10).reverse();
            console.log(sampleValues);
            
            var labels =  searchID.otu_labels.slice(0,10);
            console.log (labels);
            
        // need only top 10 (slice(0,10)) otu in reversed order 
            var OTU_top = (searchID.otu_ids.slice(0, 10)).reverse();
        
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
                x: ids,
                y: searchID.sample_values,
                mode: "markers",
                marker: {
                    size: searchID.sample_values,
                    color: ids
                },
                text: labels
    
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
 