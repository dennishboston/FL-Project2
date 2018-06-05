var raw_data = '' ;

function init() {
    // CODE BLOCK FOR GEO JSON
    //API call to get geojson data
    var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2016-12-30&endtime=2016-12-31&minmagnitude=5.0";
    
    
    
    d3.json(queryUrl, createMarkers);
    
    
    function createMarkers(response){
       var quakeMarkers = [];
    
       //get lat long for markee and bind popup with place and magnitude
       for(var i = 0; i < response.features.length; i++) {
           //use turf js to filter out quakes not in US
           
    
           // var quake = response.features[i].properties.place
           var quake = L.marker([response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]])
           .bindPopup("<h3>" + response.features[i].properties.place + "<h3><h3>Magnitude: " + response.features[i].properties.mag +"<h3>")
           // console.log(response.features[i].geometry.coordinates[1]);
           quakeMarkers.push(quake);
           // console.log(quakeMarkers);
       }
    
       //create map by passing layer group to function
       createMap(L.layerGroup(quakeMarkers));
    }
    
    /////
    
    
    // place, lat, long,
    
    
    // function PlotQuakes()
    
    function createMap(quakeMarkers) {
       
       var map = L.tileLayer("https://api.mapbox.com/styles/v1/toddfitzg/cjhxqbxqe10nj2snx1mljoa9o/tiles/256/{z}/{x}/{y}?" + 
                           "access_token=pk.eyJ1IjoidG9kZGZpdHpnIiwiYSI6ImNqaDlmaDV1MTBjYXEzY2xyYm00dWJteHoifQ.FOEoE5scbFuGYlpkTq_67Q"
       );
    
    
       var baseMap = {
           "Base": map
       };
    
       var quakeOverlay = {
           "Earthquakes": quakeMarkers
       };
    
       console.log(quakeOverlay);
    
       var myMap = L.map("map", {
           center :[
               37.09, -95.71
           ],
           zoom : 3,
           layers: [map, quakeMarkers]
       });
     
    
    }


    var url = "/data";
    Plotly.d3.json(url, function (error, response) {
        if (error) throw error;
        //console.log(response);
        raw_data = response;
        var globalJson = response;
        console.log(raw_data[0])
    });

    var mhi_data = []
    console.log(raw_data.lenghth)
    for (var i=0; i < raw_data.length; i++)
        mhi_data.push(raw_data[i].mhi_data)
        console.log("in for loop")
       // console.log(response[0])

    var mhp_data = []
    var vcr_data = []

    var data_scatter = [{
    x: [23,14,0,5585,1697,5064,0,0,0,0,0,0,0,0,0,0,2,970,3165,0,0,0,128,0,272,0,1673,1,0,0,0,5329,60,0,12490,1538,12979,0,7276,0,0,132,32,54096,154,0,115,0,2522,0,1684,0,],
    y: [1, 1, 1,4,5,6,7,8],
    mode: 'markers+text',
    name: 'Markers',
    text: ['AL', 'AK', 'AZ', 'AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'],
    textposition: 'top',
    type: 'scatter',
    marker: {size : 14, 
            color : 'rgba(0,0,255,0.5)',
            opacity: 0.5,
            line:{
                color: 'rgb(0,0,0,1)',
                width: 2,
                opacity: 1
            }},
    title: 'Value vs Number of Wells'
    }];

    var data_line = [{
        x: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        y: [1, 1, 1,4,5,6,7,8],
        mode: 'lines+markers+text',
        name: 'Lines, Markers and Text',
        text: ['2009', '2010', '2011', '2012','2013','2014','2015','2016'],
        textposition: 'top',
        type: 'line' 
    }];

    var layout1 = {
        height: 500,
        width: 700,
        yaxis : {
            title: 'Selected Drop Down Variable',
            size: 16
        },
        xaxis : {
            title: 'Number of Wells',
            size: 16
        },
        title: 'Socioeconomic Variable vs Number of Wells'
    };

    var layout2 ={
        height: 500,
        width: 700,
        yaxis : {
            title: 'Selected Drop Down Variable',
            size: 16
        },
        xaxis : {
            title: 'Years',
            size: 16
        },
        title: 'State Specific Socioeconimic Variable vs Years'
    };

    Plotly.plot("scatter", 
                data_scatter, 
                layout1,
    // updatemenus: [{
    //     buttons: [
    //       {method: 'animate', args: [['sine']], label: 'sine'},
    //       {method: 'animate', args: [['cosine']], label: 'cosine'},
    //       {method: 'animate', args: [['circle']], label: 'circle'}
    //     ]
    //   }]);
    )

    Plotly.plot("line",
                data_line,
                layout2);
    
    scatter.on("plotly_click", function(d) {
                var text = d.points[0].text
                console.log(text)
               //console.log(raw_data.length)

                mhi_data = raw_data.filter(function() {
                    if (text == raw_data[0].abbr){
                        return raw_data[0].mhi_data
                        console.log(mhi_data)
                        updatePlotly2()
                    }}),     

                mhp_data = raw_data.filter(function() {
                    if (text == raw_data[0].abbr){
                        return raw_data[0].mhp_data
                        console.log(mhp_data)
                        updatePlotly2()
                    }}),

                vcr_data = raw_data.filter(function() {
                    if (text == raw_data[0].abbr){     
                        return raw_data[0].vcr_data
                        console.log(vcr_data)
                        updatePlotly2()
                    }}),

                updatePlotly2();
                }      
    )
}



function getLineData2(d) {
    var name = this.innerHTML
    // need to write something to query the right points using "name"
}

function handleStateClick(d) {
    var state = d3.select("data-unformatted")
    getLineData(state)
}


function updatePlotly1(newdata) {
  var scatter = document.getElementById("scatter");
  Plotly.restyle(scatter, "y", [newdata])
        //.transition()
        //.duration(500);
}


function updatePlotly2(newdata) {
    var line = document.getElementById("line");
    Plotly.restyle(line, "y", [newdata])
}


function getScatterData(dataset) {
    var data = [];
    switch (dataset) {
    case "income":
        data = [1, 2, 3, 39,5,3,6,9];
        break;
    case "housing":
        data = [10, 20, 30, 37,1,3,5,6];
        break;
    case "crime":
        data = [100, 200, 300, 23,5,6,7,100];
        break;
    default:
        data = [30, 30, 30, 11,,500,100,40,1];
    }
    updatePlotly1(data);
}

function getLineData(d) {
    var data = [];
    switch (d) {
    case "AL":
        data = [1, 2, 3, 39,30,40,50,60];
        break;
    case "housing":
        data = [10, 20, 30, 37,4,7,1,3];
        break;
    case "crime":
        data = [100, 200, 300, 23,8,4,7,1];
        break;
    default:
        data = [30, 30, 30, 11,7,1,90,30];
    }
updatePlotly2(data);
};





// states = ['AL', 'AK', 'AZ', 'AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'],

    // scatterGraph.on("plotly_click", getLineData);


        // var pointsGroup = Plotly.d3.selectAll("g").filter(".points")
        //                             //.selectAll("g")
        //                            // .on("click", handleStateClick)
        //                             console.log(pointsGroup)
        

        // var plotTexts = Plotly.d3.selectAll("g > g > g > g > g > g");
        // var storedText = []
        // console.log(plotTexts)
        // plotTexts.forEach(d => {console.log(d)})
        // for (var i=0; plotTexts.length; i++){

        // }

        //plotTexts.addEventListener("click", getLineData2)

init();



