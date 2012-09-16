var map = null;
var mapMarkers = [];
var trackDetailsMap = null;
var currentTrack = null;
var userTrackListTemplate = null;

var infoWindow = new google.maps.InfoWindow({ maxWidth: 200});

var maxdistance = 5.5;

// Page stuff

$("#view_map").live("pageinit", function() {
    initMapSize("#map_tracks");
});

$("#view_map").live("pageshow", function() {
    mapMarkers = [];
    var lat = 48.128569; // default location: cS HQ
    var lon = 11.557289;
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            initTracksPage(lat, lon);
        });
    } else {
        initTracksPage(lat, lon);
    }
});

function initTracksPage(lat, lon) {
    map = initMap("map_tracks", lat, lon);
    google.maps.event.trigger(map, 'resize');
    loadTracks(lat, lon);
    addPOIs(map);
    addDragendListener();
}

$("#track_details").live("pageinit", function() {
    initTrackDetailsPage();
});

$("#track_details").live("pageshow", function() {
    trackDetailsMap = initMap("track_details_map", currentTrack.start.lat, currentTrack.start.lon);
    google.maps.event.trigger(trackDetailsMap, 'resize');
    drawTrackOnMap(currentTrack);
    addPOIs(trackDetailsMap);
    drawAltProfile(currentTrack);
});

function initTrackDetailsPage() {
    var useragent = navigator.userAgent;
    var trackDetailsPageHeight = $("#track_details").height();
    var trackDetailsPageWidth = $("#track_details").width();
    var mapdivMap = $("#track_details_map");
    var altDiv = $("#altProfile");
    if (isMobileBrowser()) {
        mapdivMap.width(trackDetailsPageWidth);
        mapdivMap.height(trackDetailsPageHeight - 100);
        altDiv.width(trackDetailsPageWidth);
        altDiv.height(100);
    } else {
        mapdivMap.width(600);
        mapdivMap.height(650);
        altDiv.width(600);
        altDiv.height(150);
    }
}

$('#view_user_tracks').live('pagecreate', function() {
    userTrackListTemplate = Tempo.prepare('userTrackListTemplate');
});


$('#view_user_tracks').live('pagebeforeshow', function() {
    var path = '../services/track/foruser';
    $.getJSON(path, function(data) {
        userTrackListTemplate.render(data);
    });
    $('#userTrackListTemplate').listview('refresh');
});

$('#view_user_tracks').live('pagehide', function() {
    userTrackListTemplate.clear();
    $('#userTrackListTemplate').listview('refresh');
});

// Backend stuff

function loadTracksInBounds(bound) {
    var lat1 = bound.getNorthEast().lat();
    var lon1 = bound.getNorthEast().lng();
    var lat2 = bound.getSouthWest().lat();
    var lon2 = bound.getSouthWest().lng();
    var path = '../services/track/get/' + lon1 + '/' + lat1 + '/' + lon2 + '/' + lat2 + '/';
    $.getJSON(path, function(data) {
        $.each(data, function(idx, track) {
            addMarker(track);
        });
    });
}

function loadTracks(lat, lon) {
    var path = '../services/track/get/' + lon + '/' + lat + '/' + maxdistance + '/';
    $.getJSON(path, function(data) {
        $.each(data, function(idx, track) {
            addMarker(track);
        });
    });
}

// Maps stuff

function initMap(id, lat,lng) {
    var myOptions = {
        zoom: 14,
        center: new google.maps.LatLng(lat,lng),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    return new google.maps.Map(document.getElementById(id), myOptions);
}

function addDragendListener() {
    google.maps.event.addListener(map, "dragend", function() {
        loadTracksInBounds(map.getBounds());
    });

    google.maps.event.addListener(map, "zoom_changed", function() {
        loadTracksInBounds(map.getBounds());
    });

}

function isMarkerAlreadyOnMap(name) {
    return  -1 != jQuery.inArray(name, mapMarkers);
}

function addMarker(track) {
    if(!isMarkerAlreadyOnMap(track.name)) {
        mapMarkers.push(track.name);
        var name = track.name;
        var user = track.user;
        var lat = track.start.lat;
        var lon = track.start.lon;
        var testmarkerpos = new google.maps.LatLng(lat, lon);

        var testmarker = new google.maps.Marker({
            position: testmarkerpos,
            map: map,
            animation: google.maps.Animation.DROP
        });
        var contentString = '<div id="content"><div id="siteNotice"><p class="info_box">' + name + '<br/> Von: '+ user +'<br/><a class="viewTrackDetails" href="#track_details" data-transition="slide">Details</a></div></div>';

        google.maps.event.addListener(testmarker, 'click', function() {
            infoWindow.setContent(contentString);
            infoWindow.open(map,testmarker);
            currentTrack = track;
        });
    }
}

function initMapSize(id) {
    var mapdivMap = $(id);
    if (isMobileBrowser()) {
        mapdivMap.height($('#view_map').height());
        mapdivMap.width($('#view_map').width());
    } else {
        mapdivMap.width('600px');
        mapdivMap.height('800px');
    }
};

// helper

function isMobileBrowser() {
    var useragent = navigator.userAgent;
    return useragent.indexOf('iPad') != -1 || useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1;
}

function drawAltProfile(track) {
    var altValues = [];
    var km = 0;
    for(var i = 0; i < track.data.length; i++) {
        var point = currentTrack.data[i];
        if(i > 0) {
            var prevPoint = currentTrack.data[i-1];
            km = km + calculateDistance(prevPoint.lat, prevPoint.lon, point.lat, point.lon);
        }
        altValues.push([km, point.ele]);
    }
    $.plot($('#altProfile'), [ {label: 'Altitude (m)', data: altValues}]);
}

function drawTrackOnMap(currentTrack) {
    var trackCoordinates = [];
    var bounds = new google.maps.LatLngBounds();

    for(var i = 0; i < currentTrack.data.length; i++) {
        var point = currentTrack.data[i];
        var latLng = new google.maps.LatLng(point.lat, point.lon);
        trackCoordinates.push(latLng);
        bounds.extend(latLng);
    }

    new google.maps.Marker({
        position: trackCoordinates[0],
        map: trackDetailsMap,
        animation: google.maps.Animation.DROP,
        title: "Start"
    });

    new google.maps.Marker({
        position: trackCoordinates[trackCoordinates.length-1],
        map: trackDetailsMap,
        animation: google.maps.Animation.DROP,
        title: "End"
    });

    var trackPoly = new google.maps.Polyline({
        path: trackCoordinates,
        strokeColor: "#0000FF",
        strokeOpacity: 0.5,
        strokeWeight: 6
    });
    trackPoly.setMap(trackDetailsMap);

//    trackDetailsMap.setCenter(trackCoordinates[0]);

    trackDetailsMap.fitBounds(bounds);

};

function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

function addPOIs(mapForPOIs) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(48.128569, 11.557289),
        map: mapForPOIs,
        animation: google.maps.Animation.DROP
    });
    var contentString = '<div id="content"><div id="siteNotice"><p class="info_box"><a href="http://careers.comsysto.com/">careers.comsysto.com</a></div></div>';

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(contentString);
        infoWindow.open(mapForPOIs,marker);
        currentTrack = track;
    });
}


