const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
    console.log(data);
    var names = data.names;
    d3.select("#selDataset")
    .selectAll('options')
     	.data(names)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      // .attr("value", function (d) { return d; }) // corresponding value returned by the button
    });

// bar chart, just a basic bar chart set up
function optionChanged(chosen) {
  d3.json(url).then(function(data) {
    var allSamples = data.samples;
    var otuIds = [];
    var otuLabels = [];
    var sampleValues = [];
    allSamples.forEach(function(row) {
      if (row.id == chosen) {
        otuIds = row.otu_ids;
        otuLabels = row.otu_labels;
        sampleValues = row.sample_values;
      }
    });

    var barChartData = [{
      x: sampleValues,
      y: otuIds,
      type: 'bar',
      orientation: 'h',
      text: otuLabels
     }];
    var layout = {font: {size: 18}};
    var config = {responsive: true};
    Plotly.newPlot('bar', barChartData, layout, config);
  });
}


// bubble chart, just a basic bubble chart set up
// var sampleData = [{
//   x: [0, 1, 2, 3, 4, 5],
//   y: [0, 1, 15, 20, 30, 40],
//   mode: 'markers',
//   marker: {
//     color: ['red', 'black',  'blue', 'grey', 'red'],
//     size: [50, 100, 150, 50, 50]
//   }
// }];
// var layout = {font: {size: 18}};
// var config = {
//     responsive: true
// };
// Plotly.newPlot('bubble', sampleData, layout, config);