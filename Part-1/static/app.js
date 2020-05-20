console.log('Hello')

d3.json("../data/samples.json").then(function(data) {
    console.log(data[0]);
    });
