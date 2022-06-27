const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
    console.log(data);
    
  });

// bar chart
var sampleData = [{
  x: [0, 10, 20, 30, 40, 50],
  y: [0, 10, 20, 30, 40, 50],
  type: 'bar'}];
var layout = {font: {size: 18}};
var config = {responsive: true};
Plotly.newPlot('bar', sampleData, layout, config);

// bubble chart
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
// Plotly.newPlot('bubble', data, layout, config);