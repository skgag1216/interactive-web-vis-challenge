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
    });

// bar chart, just a basic bar chart set up
function optionChanged(chosen) {
  d3.json(url).then(function(data) {
    var allSamples = data.samples
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

    var barChartdata = [{
      x: sampleValues.slice(0,10).reverse(),
      y: otuIds.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
      type: 'bar',
      orientation: 'h',
      text: otuLabels.slice(0,10).reverse()
     }];
    var layout = {font: {size: 14}};
    //var config = {responsive: true};
    Plotly.newPlot('bar', barChartdata, layout);

    // bubble chart, just a basic bubble chart set up
    var bubbleChartdata = [{
      x: otuIds.map(otuID => `${otuID}`),
      y: sampleValues,
      mode: 'markers',
      //marker: { 
        //size: sampleValues}
    }];
    var layout = {font: {size: 14}};
    var config = {responsive: true};
    Plotly.newPlot('bubble', bubbleChartdata, layout, config);
  });
}
