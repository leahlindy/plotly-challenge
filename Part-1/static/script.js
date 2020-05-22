// code for number of test subject in form selection
d3.json("../data/samples.json").then((importedData) => {
    
    var data = importedData;
    var length = data.names.length;
    console.log(length);
    
    for (i=0;i<length;i++){
        d3.selectAll(".form-control")
        .append("option")
        .text(i+1);}
});
