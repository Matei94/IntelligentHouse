/*** VARIABLES ***************************************************************/

var gOpenWheatherApiKey = '98c7e7ff6542a39ef0a58614185c8031';

/*****************************************************************************/



/*** DOCUMENT READY **********************************************************/

$(document).ready(function() {
    getLocation();
});

/*****************************************************************************/



/*** FUNCTIONS ***************************************************************/

function getLocation() {
    var x = document.getElementById("demo");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon +
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
    var x = document.getElementById("demo");

    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

/*****************************************************************************/
