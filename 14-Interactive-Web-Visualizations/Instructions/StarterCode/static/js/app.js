const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
    console.log(data);  
  });

  // start for changing selection in dropdown menu
  //d3.selectAll("#selDataset").on("change", updatePlotly);

// bar chart, just a basic bar chart set up
function initBarchart() {
  var barChartData = [{
    x: [0, 10, 20, 30, 40, 50],
    y: [0, 10, 20, 30, 40, 50],
    type: 'bar',
    orientation: 'h'}];
  var layout = {font: {size: 18}};
  var config = {responsive: true};
  Plotly.newPlot('bar', barChartData, layout, config);
}
initBarchart();

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