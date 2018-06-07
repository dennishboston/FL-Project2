var raw_data = '' ; // bring json data outside init function

function init() {
    // CODE BLOCK FOR GEO JSON - TODD
    // function toddCode(centerCoords){
    //     var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2009-01-01&endtime=2016-12-31&minmagnitude=5.0";
        
        
        
    //     d3.json(queryUrl, createMarkers);
        
        
    //     function createMarkers(response){
    //         var quakeMarkers = [];
        
    //         //get lat long for marker and bind popup with place and magnitude
    //         for(var i = 0; i < response.features.length; i++) {
                
    //             //use turf js to filter out quakes not in US
        
    //             var pt = turf.point([response.features[i].geometry.coordinates[1], 
    //                             response.features[i].geometry.coordinates[0]]);
                
        
    //             var poly = turf.polygon([[
    //             [24.396308,-124.848974],
    //             [49.384358, -124.848974],
    //             [49.384358, -66.885444],
    //             [24.396308, -66.885444],
    //             [24.396308, -124.848974]
    //             ]]);
                
                
    //             // console.log(turf.booleanPointInPolygon(pt, poly));
        
        
    //             if (turf.booleanPointInPolygon(pt, poly)){
    //             var quake = L.marker([response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]])
    //             .bindPopup("<h3>" + response.features[i].properties.place + "<h3><h3>Magnitude: " + response.features[i].properties.mag +"<h3>")
    //             // console.log(response.features[i].geometry.coordinates[1]);
    //             quakeMarkers.push(quake);
    //             }
    //             console.log(turf.booleanPointInPolygon(pt, poly));
    //         //     console.log(poly.geometry.coordinates[0][0][0]);
    //         }
        
    //         //create map by passing layer group to function
    //         createMap(L.layerGroup(quakeMarkers));
    //     }
        
        
    //     function createMap(quakeMarkers, centerCoords) {
            
    //         var map = L.tileLayer("https://api.mapbox.com/styles/v1/toddfitzg/cjhxqbxqe10nj2snx1mljoa9o/tiles/256/{z}/{x}/{y}?" + 
    //                             "access_token=pk.eyJ1IjoidG9kZGZpdHpnIiwiYSI6ImNqaDlmaDV1MTBjYXEzY2xyYm00dWJteHoifQ.FOEoE5scbFuGYlpkTq_67Q"
    //         );
        
        
    //         var baseMap = {
    //             "Base": map
    //         };
        
    //         var quakeOverlay = {
    //             "Earthquakes": quakeMarkers
    //         };
        
        
    //         // delete line below when integrated into Pete's function
    //         var centerCoords = [39.8283, -98.5795];
        
    //         var myMap = L.map("map", {
    //             center : centerCoords,
    //             zoom : 5,
    //             layers: [map, quakeMarkers]
    //         });
        
        
    //     }
    // }


    // PETES CODE

    // bring in json data from Flask App

    var url = "/data";
    Plotly.d3.json(url, function (error, response) {
        if (error) throw error;
        //console.log(response);
        raw_data = response;
        var globalJson = response;
        console.log(raw_data[0])
    });

    // var mhi_data = []
    // console.log(raw_data.length)
    // for (var i=0; i < raw_data.length; i++)
    //     mhi_data.push(raw_data[i].mhi_data)
    //     console.log("in for loop")
    //    // console.log(response[0])

    // var mhp_data = []
    // var vcr_data = []

    // inital scatter plot - x values are hard-coded since they will never change (admittedly should probably be stored as a variable thats pulled from json response)
    //                      - same goes for initial y values

    var data_scatter = [{
    x: [23,14,0,5585,1697,5064,0,0,0,0,0,0,0,0,0,0,2,970,3165,0,0,0,128,0,272,0,1673,1,0,0,0,5329,60,0,12490,1538,12979,0,7276,0,0,132,32,54096,154,0,115,0,2522,0,1684,0,],
    y: [44758,74444,51340,42336,63783,62520,71755,61017,72935,48900,51037,71977,49174,
        59196,
        50433,
        54570,
        53571,
        44811,
        45652,
        50826,
        76067,
        70954,
        50803,
        63217,
        40528,
        49593,
        48380,
        54384,
        53094,
        68485,
        73702,
        45674,
        60741,
        48256,
        59114,
        50674,
        48038,
        53270,
        54895,
        58387,
        46898,
        52078,
        46574,
        54727,
        62518,
        56104,
        66149,
        62848,
        42644,
        54610,
        59143,
        ],
    mode: 'markers+text',
    name: 'Markers',
    text: ['AL', 'AK', 'AZ', 'AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'],
    textposition: 'left',
    type: 'scatter',
    marker: {size : 8, 
            color : 'rgba(0,0,255,0.5)',
            opacity: 0.5,
            line:{
                color: 'rgb(0,0,0,1)',
                width: 2,
                opacity: 1
            }},
    title: 'Value vs Number of Wells in 2016'
    }];

//  Initial code for line graph - creates no graph until state is selected

    var data_line = [{
        x: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        y: [0,0,0,0,0,0,0,0],
        mode: 'lines+markers+text',
        name: 'Lines, Markers and Text',
        text: ['2009', '2010', '2011', '2012','2013','2014','2015','2016'],
        textposition: 'top',
        type: 'line' 
    }];

// layout for scatter graph 

    var layout1 = {
        height: 500,
        width: 700,
        yaxis : {
            title: 'Selected Drop Down Variable',
            size: 16
        },
        xaxis : {
            title: 'Number of Wells',
            size: 16,
            type: 'log',
            autorange: true
        },
        title: 'Socioeconomic Variable vs Number of Wells in 2016'
    };

// layout for line graph

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

// plot scatter graph using inital data/layout

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

// plot line graph using initial data/layout

    Plotly.plot("line",
                data_line,
                layout2);
    
// "on" function used to apply listeners to scatter points - first extracts text value of point, then uses that point to match data records in json
// currently will update line graph with mhi data only -- working to allow drop down to also alter chart rendering
var current_state = ''
var centerCoords = []
var mhp_data = [];
var mhi_data = [];
var vcr_data = [];
console.log(current_state)
console.log(centerCoords)
    scatter.on("plotly_click", function(d) {
                var text = d.points[0].text;
                console.log(text);
                console.log(raw_data.length)
                console.log(raw_data[0]);
                window.current_state = text
                console.log(current_state)
                console.log(drop_down)
                if (drop_down == "Median Household Income [$]"){
                    //window.centerCoords = pulledCenterCoords
                    var centerCoords = [];
                    var mhi_data = []
                    console.log(raw_data.length)
                    for (var i=0; i < raw_data.length; i++)
                        if (text == raw_data[i].abbr){
                            mhi_data.push(raw_data[i].mhi_data)
                            centerCoords.push(raw_data[i].lat[0])
                            centerCoords.push(raw_data[i].lon[0])
                            console.log("in mhi for loop")
                            console.log("in mhi loop: " + mhi_data[0])
                            updatePlotly2(mhi_data[0])
                            console.log(centerCoords)
                            //toddCode(centerCoords)
                    }
                }
                else if (drop_down == "Median Housing Prices [$]"){
                    var mhp_data = []
                    for (var i=0; i < raw_data.length; i++)
                        if (text == raw_data[i].abbr){
                            mhp_data.push(raw_data[i].mhp_data)
                            console.log("in mhp for loop")
                            console.log("mhp loop: " + mhp_data[0])
                            updatePlotly2(mhp_data[0])
                    }
                }
                else if (drop_down == "Violent Crimes Per 100,000 People"){
                    var vcr_data = []
                    for (var i=0; i < raw_data.length; i++)
                        if (text == raw_data[i].abbr){
                            vcr_data.push(raw_data[i].vcr_data)
                            console.log("in vcr for loop")
                            console.log("vcr loop: " + vcr_data[0])
                            updatePlotly2(vcr_data[0])
                    }
                }
            //     //mhi_data = raw_data.filter(function() {
            //         if (text == raw_data[0].abbr){
            //             return raw_data[0].mhi_data;
            //             console.log(mhi_data);
            //             updatePlotly2();
            //         }}); 

            //    // mhp_data = raw_data.filter(function() {
            //         if (text == raw_data[0].abbr){
            //             return raw_data[0].mhp_data
            //             console.log(mhp_data)
            //             updatePlotly2()
            //         }});

            //     //vcr_data = raw_data.filter(function() {
            //         if (text == raw_data[0].abbr){     
            //             return raw_data[0].vcr_data
            //             console.log(vcr_data)
            //             updatePlotly2()
            //         }});

               // updatePlotly2(mhp_data[0]);
                }      
    )
    toddCode()
}

// function to update scatter graph based on drop down menu

function updatePlotly1(newdata) {
  var scatter = document.getElementById("scatter");
  Plotly.restyle(scatter, "y", [newdata])
  Plotly.relayout(scatter, "title" , drop_down + " vs # of Wells in 2016")
  Plotly.relayout(scatter, "yaxis.title", drop_down)
  console.log(drop_down)
        //.transition()
        //.duration(500);
}

// function to update line graph

function updatePlotly2(newdata) {
    var line = document.getElementById("line");
    Plotly.restyle(line, "y", [newdata])
    Plotly.relayout(line, "title" , (current_state + ": " + drop_down + " vs Years"))
    Plotly.relayout(line, "yaxis.title", drop_down)
    //console.log(raw_data)
}
function updatePlotly3(socio_data) {
    var line = document.getElementById("line");
    Plotly.restyle(line, "y", [socio_data])
    Plotly.relayout(line, "title" , (current_state + ": " + drop_down + " vs Years"))
    Plotly.relayout(line, "yaxis.title", drop_down)
    console.log(socio_data)
}

function getScatterData(dataset) {
    var data = [];
    switch (dataset) {
    case "income":
        data = [44758,74444,51340,42336,63783,62520,71755,61017,72935,48900,51037,71977,49174,59196,50433,54570,53571,44811,45652,50826,76067,70954,
        50803,
        63217,
        40528,
        49593,
        48380,
        54384,
        53094,
        68485,
        73702,
        45674,
        60741,
        48256,
        59114,
        50674,
        48038,
        53270,
        54895,
        58387,
        46898,
        52078,
        46574,
        54727,
        62518,
        56104,
        66149,
        62848,
        42644,
        54610,
        59143,
        ]
        window.drop_down = "Median Household Income [$]";
        var centerCoords = [];
        var mhi_data = []
        console.log(raw_data.length)
        for (var i=0; i < raw_data.length; i++)
            if (current_state == raw_data[i].abbr){
                mhi_data.push(raw_data[i].mhi_data)
                centerCoords.push(raw_data[i].lat[0])
                centerCoords.push(raw_data[i].lon[0])
                console.log("in mhi for loop")
                console.log("in mhi loop: " + mhi_data[0])
                updatePlotly2(mhi_data[0])
            }

        
        break;
    case "housing":
        data = [128500,
            257100,
            176900,
            114700,
            409300,
            264600,
            269300,
            233100,
            506100,
            166800,
            152400,
            538400,
            167900,
            174800,
            126500,
            132800,
            135300,
            126100,
            148300,
            176000,
            290400,
            341000,
            127800,
            191500,
            105700,
            141200,
            199700,
            137300,
            191600,
            239700,
            316400,
            161600,
            286300,
            157100,
            164000,
            131900,
            121300,
            247200,
            167700,
            238200,
            143600,
            146700,
            146000,
            142700,
            224600,
            218900,
            248400,
            269300,
            107400,
            167000,
            199900,
            ]
            window.drop_down = "Median Housing Prices [$]"
                
            var mhp_data = []
            for (var i=0; i < raw_data.length; i++)
                if (current_state == raw_data[i].abbr){
                    mhp_data.push(raw_data[i].mhp_data)
                    console.log("in mhp for loop")
                    console.log("mhp loop: " + mhp_data[0])
                    updatePlotly2(mhp_data[0])
            }   
        break;
    case "crime":
        data = [532.3,
            804.2,
            470.1,
            550.9,
            445.3,
            342.6,
            227.1,
            508.8,
            1205.9,
            430.3,
            397.6,
            309.2,
            230.3,
            436.3,
            404.7,
            290.6,
            380.4,
            232.3,
            566.1,
            123.8,
            472,
            376.9,
            459,
            242.6,
            280.5,
            519.4,
            368.3,
            291,
            678.1,
            197.6,
            245,
            702.5,
            376.2,
            372.2,
            251.1,
            300.3,
            449.8,
            264.6,
            316.4,
            238.9,
            501.8,
            418.4,
            632.9,
            434.4,
            242.8,
            158.3,
            217.6,
            302.2,
            358.1,
            305.9,
            244.2,
            ]
            window.drop_down = "Violent Crimes Per 100,000 People"
            //socio_data = window.vcr_data
            var vcr_data = []
            for (var i=0; i < raw_data.length; i++)
                if (current_state == raw_data[i].abbr){
                    vcr_data.push(raw_data[i].vcr_data)
                    console.log("in vcr for loop")
                    console.log("vcr loop: " + vcr_data[0])
                    updatePlotly2(vcr_data[0])
            }
        break;
    default:
    data = [44758,74444,51340,42336,63783,62520,71755,61017,72935,48900,51037,
        71977,
        49174,
        59196,
        50433,
        54570,
        53571,
        44811,
        45652,
        50826,
        76067,
        70954,
        50803,
        63217,
        40528,
        49593,
        48380,
        54384,
        53094,
        68485,
        73702,
        45674,
        60741,
        48256,
        59114,
        50674,
        48038,
        53270,
        54895,
        58387,
        46898,
        52078,
        46574,
        54727,
        62518,
        56104,
        66149,
        62848,
        42644,
        54610,
        59143,
        ];
    }
    updatePlotly1(data);
    //updatePlotly2(socio_data)
}

init();



