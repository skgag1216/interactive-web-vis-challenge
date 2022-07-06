// start by assigning a var to the url and reading in the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// read in the data with d3.json and create a function to fill in the dropdown menu
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

function optionChanged(userChosen) {  
  d3.json(url).then(function(data) { 
    var allSamples = data.samples 
    var otuIds = []; 
    var otuLabels = []; 
    var sampleValues = []; 
    allSamples.forEach(function(row) { 
      if (row.id == userChosen) { 
        otuIds = row.otu_ids; 
        otuLabels = row.otu_labels; 
        sampleValues = row.sample_values; 
      }
    });
    var allMetadata = data.metadata 
    allMetadata.forEach(function(row) {
      var demoPanel = d3.select(".panel-body");
      var numwashtest = d3.select("#washtest")
      if (row.id == userChosen){
        numWashes = parseInt(row.wfreq);
        numwashtest.html("");
        numwashtest.append("p").text(numWashes)
        demoPanel.html("");
        Object.entries(row).forEach(function([key, value]){
          demoPanel.append("p").text(`${key}: ${value}`);
        });
      }
    });

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
  //////// guage chart
    var washGauge = [{
      value: numWashes,
      type: "indicator",
      mode: "gauge+number",
      title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
      gauge: {
        axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        steps: [
          { range: [0, 1], color: "rgb(153, 0, 255)"},
          { range: [1, 2], color: "rgb(153, 51, 255)"},
          { range: [2, 3], color: "rgb(153, 102, 255)"},
          { range: [3, 4], color: "rgb(153, 153, 255)"},
          { range: [4, 5], color: "rgb(153, 204, 255)"},
          { range: [5, 6], color: "rgb(102, 204, 255)"},
          { range: [6, 7], color: "rgb(102, 255, 255)"},
          { range: [7, 8], color: "rgb(102, 255, 204)"},
          { range: [8, 9], color: "rgb(0, 255, 153)"},
          { range: [9, 10], color: "rgb(0, 255, 0)"}
        ]
      }
    }];
    var layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', washGauge, layout);

}
