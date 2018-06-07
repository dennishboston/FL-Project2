var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2009-01-01&endtime=2016-12-31&minmagnitude=5.0";



d3.json(queryUrl, createMarkers);


function createMarkers(response){
    var quakeMarkers = [];

    //get lat long for marker and bind popup with place and magnitude
    for(var i = 0; i < response.features.length; i++) {
        
        //use turf js to filter out quakes not in US

        var pt = turf.point([response.features[i].geometry.coordinates[1], 
                        response.features[i].geometry.coordinates[0]]);
        

        var poly = turf.polygon([[
        [24.396308,-124.848974],
        [49.384358, -124.848974],
        [49.384358, -66.885444],
        [24.396308, -66.885444],
        [24.396308, -124.848974]
        ]]);
        
        
        // console.log(turf.booleanPointInPolygon(pt, poly));


        if (turf.booleanPointInPolygon(pt, poly)){
        var quake = L.marker([response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]])
        .bindPopup("<h3>" + response.features[i].properties.place + "<h3><h3>Magnitude: " + response.features[i].properties.mag +"<h3>")
        // console.log(response.features[i].geometry.coordinates[1]);
        quakeMarkers.push(quake);
        }
        console.log(turf.booleanPointInPolygon(pt, poly));
    //     console.log(poly.geometry.coordinates[0][0][0]);
    }

    //create map by passing layer group to function
    createMap(L.layerGroup(quakeMarkers));
}


function createMap(quakeMarkers, centerCoords) {
    
    var map = L.tileLayer("https://api.mapbox.com/styles/v1/toddfitzg/cjhxqbxqe10nj2snx1mljoa9o/tiles/256/{z}/{x}/{y}?" + 
                        "access_token=pk.eyJ1IjoidG9kZGZpdHpnIiwiYSI6ImNqaDlmaDV1MTBjYXEzY2xyYm00dWJteHoifQ.FOEoE5scbFuGYlpkTq_67Q"
    );


    var baseMap = {
        "Base": map
    };

    var quakeOverlay = {
        "Earthquakes": quakeMarkers
    };


    // delete line below when integrated into Pete's function
    var centerCoords = [39.8283, -98.5795];

    var myMap = L.map("map", {
        center : centerCoords,
        zoom : 5,
        layers: [map, quakeMarkers]
    });
   

}