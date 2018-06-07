//inspiration for the map from Bill Morris at https://bl.ocks.org/wboykinm/dbbe50d1023f90d4e241712395c27fb3

var year = 2009;
var globalJson = '';

getHWData(year);
// console.log(json[type]);

var width = 960;
var height = 500;

var lowColor = '#f9f9f9'
var highColor = '#bc2a66'

// D3 Projection
var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2]) // translate to center of screen
  .scale([1000]); // scale things down so see entire US

// Define path generator
var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
  .projection(projection); // tell path generator to use albersUsa projection

//Create SVG element and append map to the SVG
var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
  
// Load in my states data!
function getHWData(year) {
  //d3.json("data.json", function(data) {
   
    var url = "/data";
    // Plotly.d3.json(url, function (error, response) {
    d3.json(url, function (error, response) {  
        if (error) throw error;
        //console.log(response);
        //var data = response;
        globalJson = response;
        //console.log(data.length);
        console.log(globalJson.length);
    });



    var dataArray = [];
    //console.log(data[0].hw_data[0]);
    for (var d = 0; d < globalJson.length; d++) {
      //var hw_data_points_ = JSON.parse("[" + data[d].hw_data + "]");
      //console.log(hw_data_points_);
      // if (year==2009) {   
      //   dataArray.push(parseFloat(globalJson[d].hw_data[0]));
      // } else if (year==2010) {   
      //   dataArray.push(parseFloat(globalJson[d].hw_data[1]));
      // } else if (year==2011) {   
      //   dataArray.push(parseFloat(globalJson[d].hw_data[2]));
      // } else if (year==2012) {   
      //   dataArray.push(parseFloat(globalJson[d].hw_data[3]));
      // } else if (year==2013) {   
      //   dataArray.push(parseFloat(globalJson[d].hw_data[4]));
      // } else if (year==2014) {   
      //   dataArray.push(parseFloat(globalJson[d].hw_data[5]));
      // } else if (year==2015) {   
      //   dataArray.push(parseFloat(globalJson[d].hw_data[6]));
      // } else {
      //   dataArray.push(parseFloat(globalJson[d].hw_data[7]));
      // }
      if (year==2009) {   
        dataArray.push((globalJson[d].hw_data[0]));
      } else if (year==2010) {
        if (globalJson[d].hw_data[0] == 0) {
          dataArray.push(0); 
        } else {
          dataArray.push((globalJson[d].hw_data[1]/globalJson[d].hw_data[0])-1);
        }   
      } else if (year==2011) {   
        if (globalJson[d].hw_data[0] == 0) {
          dataArray.push(0); 
        } else {
          dataArray.push((globalJson[d].hw_data[2]/globalJson[d].hw_data[0])-1);
        }
      } else if (year==2012) {   
        if (globalJson[d].hw_data[0] == 0) {
          dataArray.push(0); 
        } else {
          dataArray.push((globalJson[d].hw_data[3]/globalJson[d].hw_data[0])-1);
        }
      } else if (year==2013) {   
        if (globalJson[d].hw_data[0] == 0) {
          dataArray.push(0); 
        } else {
          dataArray.push((globalJson[d].hw_data[4]/globalJson[d].hw_data[0])-1);
        }
      } else if (year==2014) {   
        if (globalJson[d].hw_data[0] == 0) {
          dataArray.push(0); 
        } else {
          dataArray.push((globalJson[d].hw_data[5]/globalJson[d].hw_data[0])-1);
        }
      } else if (year==2015) {   
        if (globalJson[d].hw_data[0] == 0) {
          dataArray.push(0); 
        } else {
          dataArray.push((globalJson[d].hw_data[6]/globalJson[d].hw_data[0])-1);
        }
      } else {
        if (globalJson[d].hw_data[0] == 0) {
          dataArray.push(0); 
        } else {
          dataArray.push((globalJson[d].hw_data[7]/globalJson[d].hw_data[0])-1);
        }
      }
    }
      
      //console.log(dataArray);
    var minVal = 0 //d3.min(dataArray)
    var maxVal = d3.max(dataArray)
    var ramp = d3.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])
    var url = "https://raw.githubusercontent.com/kjhealy/us-county/master/data/geojson/gz_2010_us_040_00_500k.json"

    // Load GeoJSON data and merge with states data
    d3.json(url, function(json) {
      // Loop through each state data value in the .csv file
      for (var i = 0; i < globalJson.length; i++) {

        // Grab State Name
        var dataState = globalJson[i].state[0];
        //console.log(dataState);

        // Grab data value
        //var hw_data_points = JSON.parse("[" + data[i].hw_data + "]");
        
        // if (year==2009) {
        //   var dataValue = globalJson[i].hw_data[0];
        // } else if (year==2010) {
        //   var dataValue = globalJson[i].hw_data[1];
        // } else if (year==2011) {
        //   var dataValue = globalJson[i].hw_data[2];
        // } else if (year==2012) {
        //   var dataValue = globalJson[i].hw_data[3];
        // } else if (year==2013) {
        //   var dataValue = globalJson[i].hw_data[4];
        // } else if (year==2014) {
        //   var dataValue = globalJson[i].hw_data[5];
        // } else if (year==2015) {
        //   var dataValue = globalJson[i].hw_data[6];
        // } else {
        //   var dataValue = globalJson[i].hw_data[7];
        // }

        if (year==2009) {
          var dataValue = globalJson[i].hw_data[0];
        } else if (year==2010) {
          if (globalJson[i].hw_data[0] == 0) {
            var dataValue = 0; //(globalJson[i].hw_data[1]/.01)-1;
          } else { 
            var dataValue = (globalJson[i].hw_data[1]/globalJson[i].hw_data[0])-1;
          }
        } else if (year==2011) {
          if (globalJson[i].hw_data[0] == 0) {
            var dataValue = 0; //(globalJson[i].hw_data[1]/.01)-1;
          } else { 
            var dataValue = (globalJson[i].hw_data[2]/globalJson[i].hw_data[0])-1;
          }
        } else if (year==2012) {
          if (globalJson[i].hw_data[0] == 0) {
            var dataValue = 0; //(globalJson[i].hw_data[1]/.01)-1;
          } else { 
            var dataValue = (globalJson[i].hw_data[3]/globalJson[i].hw_data[0])-1;
          }
        } else if (year==2013) {
          if (globalJson[i].hw_data[0] == 0) {
            var dataValue = 0; //(globalJson[i].hw_data[1]/.01)-1;
          } else { 
            var dataValue = (globalJson[i].hw_data[4]/globalJson[i].hw_data[0])-1;
          }
        } else if (year==2014) {
          if (globalJson[i].hw_data[0] == 0) {
            var dataValue = 0; //(globalJson[i].hw_data[1]/.01)-1;
          } else { 
            var dataValue = (globalJson[i].hw_data[5]/globalJson[i].hw_data[0])-1;
          }
        } else if (year==2015) {
          if (globalJson[i].hw_data[0] == 0) {
            var dataValue = 0; //(globalJson[i].hw_data[1]/.01)-1;
          } else { 
            var dataValue = (globalJson[i].hw_data[6]/globalJson[i].hw_data[0])-1;
          }
        } else {
          if (globalJson[i].hw_data[0] == 0) {
            var dataValue = 0; //(globalJson[i].hw_data[1]/.01)-1;
          } else { 
            var dataValue = (globalJson[i].hw_data[7]/globalJson[i].hw_data[0])-1;
          }
        }



        //console.log(dataValue);
        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < json.features.length; j++) {
          var jsonState = json.features[j].properties.NAME;
          
          if (dataState == jsonState) {
            
            // Copy the data value into the JSON
            json.features[j].properties.value = dataValue;
            console.log(dataValue);      
            // Stop looking through the JSON
            break;
          }
        }
      }
      
      renderMap(year, json.features, ramp, minVal, maxVal);
    //});
  });
};

function renderMap(year, features, ramp, minVal, maxVal){
  // Update the current slider value (each time you drag the slider handle)
  d3.selectAll("path").remove();
  d3.select('body').selectAll('svg.legend').remove();
    // Bind the data to the SVG and create one path per GeoJSON feature
    svg.selectAll("path")
      .data(features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .style("fill", function(d) { return ramp(d.properties.value) });
    
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value

		// add a legend
		var w = 140, h = 300;

		var key = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h)
			.attr("class", "legend");

		var legend = key.append("defs")
			.append("svg:linearGradient")
			.attr("id", "gradient")
			.attr("x1", "100%")
			.attr("y1", "0%")
			.attr("x2", "100%")
			.attr("y2", "100%")
			.attr("spreadMethod", "pad");

		legend.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", highColor)
			.attr("stop-opacity", 1);
			
		legend.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", lowColor)
			.attr("stop-opacity", 1);

		key.append("rect")
			.attr("width", w - 100)
			.attr("height", h)
			.style("fill", "url(#gradient)")
			.attr("transform", "translate(0,10)");

		var y = d3.scaleLinear()
      .range([h, 0])
      .domain([minVal, maxVal]);

		var yAxis = d3.axisRight(y);

		key.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(41,10)")
      .call(yAxis)


    //console.log(year);
}

