// start by assigning a var to the url and reading in the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// read in the datat with d3 and .json and create a function to fill in the dropdown menu
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

// // * denotes what was entered first, // ** is what's added second after function works with both charts
function optionChanged(userChosen) {  //*
  d3.json(url).then(function(data) { // *
    var allSamples = data.samples // * 
    var otuIds = []; // *
    var otuLabels = []; // *
    var sampleValues = []; // *
    allSamples.forEach(function(row) { // *
      if (row.id == userChosen) { // *
        otuIds = row.otu_ids; // *
        otuLabels = row.otu_labels; // *
        sampleValues = row.sample_values; // *
      }
    });
    var allMetadata = data.metadata // **
    // var age = [];
    // var bbtype = [];
    // var ethnicity = [];
    // var gender = [];
    // var id = [];
    // var location = [];
    // var wfreq = [];
      allMetadata.forEach(function(row) { // **
        if (row.id == userChosen)
          console.log(d3.keys(row),
          console.log(d3.values(row))) // ** 
      });// **

// bar chart, just a basic bar chart set up to fill in
    var barChartdata = [{
      x: sampleValues.slice(0,10).reverse(),
      y: otuIds.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
      type: 'bar',
      orientation: 'h',
      text: otuLabels.slice(0,10).reverse()
     }];
    var layout = {font: {size: 14},
    title: {
      text: 'Top 10 OTUs',
      font: {
        family: 'Arial, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05
    }};
    Plotly.newPlot('bar', barChartdata, layout);
    // bubble chart, just a basic bubble chart set up to fill in
    var bubbleChartdata = [{
      x: otuIds.map(otuID => `${otuID}`),
      y: sampleValues,
      mode: 'markers',
      marker: { 
        size: sampleValues,
        color: otuIds },
      text: otuLabels
    }];
    var layout = {font: {size: 14},
    title: {
      text:'All OTU Sample Data',
      font: {
        family: 'Arial, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      title: {
        text: 'OTU ID #',
        font: {
          family: 'Arial, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
    },
    yaxis: {
      title: {
        text: 'Amount in Sample',
        font: {
          family: 'Arial, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    }};
    Plotly.newPlot('bubble', bubbleChartdata, layout);
  });
}
