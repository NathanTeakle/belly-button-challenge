// Function to update the plots and metadata panel
function updatePlots(sampleId, data) {
    // Get the selected sample from the data
    var sample = data.samples.find(d => d.id === sampleId);
  
    // Create the trace for the bar chart
    var barTrace = {
      x: sample.sample_values.slice(0, 10).reverse(),
      y: sample.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`),
      text: sample.otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };
  
    // Create the data array for the bar chart
    var barData = [barTrace];
  
    // Define the layout for the bar chart
    var barLayout = {
      title: "Top 10 OTUs Found in Individual",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU ID" }
    };
  
    // Plot the bar chart to a div tag with id "bar"
    Plotly.newPlot("bar", barData, barLayout);
  
    // Create the trace for the bubble chart
    var bubbleTrace = {
      x: sample.otu_ids,
      y: sample.sample_values,
      text: sample.otu_labels,
      mode: "markers",
      marker: {
        size: sample.sample_values,
        color: sample.otu_ids
      }
    };
  
    // Create the data array for the bubble chart
    var bubbleData = [bubbleTrace];
  
    // Define the layout for the bubble chart
    var bubbleLayout = {
      title: "OTU ID vs Sample Values",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" }
    };
  
    // Plot the bubble chart to a div tag with id "bubble"
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  
    // Get the metadata for the selected sample
    var metadata = data.metadata.find(d => d.id === parseInt(sampleId));
  
    // Select the panel with id "sample-metadata"
    var panel = d3.select("#sample-metadata");
  
    // Clear any existing metadata
    panel.html("");
  
    // Add each key-value pair to the panel
    Object.entries(metadata).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  }
  
  // Use D3 to read in samples.json
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      // Get all sample names from the data
      var names = data.names;
  
      // Select the dropdown menu with id "selDataset"
      var dropdownMenu = d3.select("#selDataset");
  
      // Add each name as an option to the dropdown menu
      names.forEach((name) => {
          dropdownMenu.append("option").text(name).property("value", name);
      });
  
      // Get the first sample from the data
      var firstSample = data.samples[0].id;
  
      // Update the plots and metadata panel with the first sample
      updatePlots(firstSample, data);
  });
  
  // Function to handle change event on dropdown menu
  function optionChanged(newSample) {
      // Use D3 to read in samples.json
      d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
          // Update the plots and metadata panel with the selected sample
          updatePlots(newSample, data);
      });
  };