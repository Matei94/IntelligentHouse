/*** VARIABLES ***************************************************************/

var gOpenWheatherApiKey = '98c7e7ff6542a39ef0a58614185c8031';
var gPosition = null;

/*****************************************************************************/



/*** DOCUMENT READY **********************************************************/

$(document).ready(function() {
    getLocation();

    $('#locationBTN').click(function() {
        setTimeout(function() {
            showPosition(gPosition);
        }, 1000);
    });

    $('#wheatherBTN').click(function() {
        if (gPosition == null) {
            alert("Position is not available");
        } else {
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?' +
                     'lat=' + gPosition.coords.latitude +
                     '&lon=' + gPosition.coords.longitude +
                     '&APPID=' + gOpenWheatherApiKey,
                dataType: 'jsonp',
                success: function(results){
                    new PNotify({
                        title: 'Weather',
                        text: JSON.stringify(results),
                        type: 'info',
                        animate_speed: 'fast',
                        hide: true,
                        delay: 2000
                    });
                }
            });
        }
    });
});

/*****************************************************************************/



/*** FUNCTIONS ***************************************************************/

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


function setPosition(position) {
    gPosition = position;

    new PNotify({
        title: 'Location available',
        text: 'Latitude: ' + gPosition.coords.latitude +
              '\nLongitude: ' + gPosition.coords.longitude,
        type: 'success',
        animate_speed: 'fast',
        hide: true,
        delay: 2000
    });
}


function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    latlon = new google.maps.LatLng(lat, lon)
    mapholder = document.getElementById('mapholder')
    mapholder.style.height = '250px';
    mapholder.style.width = '500px';

    var myOptions = {
        center:latlon,zoom:14,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:false,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }

    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
}


function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

/*****************************************************************************/
