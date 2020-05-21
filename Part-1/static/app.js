

d3.json("../data/samples.json").then((importedData) => {
        console.log(importedData);
        // Declare variables for objects in imported data
        var data = importedData;
        
        var names = importedData.names;
        var metadata = importedData.metadata;
        var samples = importedData.samples;

        // sample ids (153)-- of each 153 need to sort top 10 otu_id within each
        // create empty list to hold variables 
        labels=[];
        values=[];
        hovers=[];

        for(i=0; i<10; i++){
            var value = samples[i].sample_values;
            values.push(value);

            var label = samples[i].otu_ids;
            labels.push(label);

            var hover = samples[i].otu_labels;
            hovers.push(hover);
        };
        console.log(values);
        console.log(labels);
        console.log(hovers);


        

        var trace1 = {
            x: values,
            y: labels,
            text: hovers,
            name: "Samples",
            type: "bar",
            orientation: "h"
          };
        var data =[trace1];
        var layout = {
            title: "Sample information",
            margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 100
            }
          };
          
          // Render the plot to the div tag with id "bar"
          Plotly.newPlot("bar", data, layout);
    });
