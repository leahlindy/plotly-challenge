// code for number of test subject in form selection
d3.json("data/samples.json").then((importedData) => {
    
    var data = importedData;
    var length = data.names.length;
    
    var form = d3.select("#selDataset");
    
    for (i=0;i<length;i++){
        form.append("option")
        .attr("class","testSubject")
        .text(i+1);
    }
});

    

// function onchange() {
// 	selectValue = d3.select('select').property('value')
// 	d3.select('body')
// 		.append('p')
// 		.text(selectValue + ' is the last selected option.')
// };
// function optionChanged() {
//     console.log("a button was clicked");
//     var selectID = d3.select(".selDataset").node().value;
    
//     console.log(selectID);}

// var button = d3.selectAll("selDataset");
// button.on("click", optionChanged);