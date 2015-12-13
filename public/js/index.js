/*** VARIABLES ***************************************************************/

var gCosumerType = {
    ELECTRICITY: {
        bg: "bg-warning",
        glyphicon: "glyphicon-flash",
        name: "electricity"
    },

    WATER: {
        bg: "bg-primary",
        glyphicon: "glyphicon-tint",
        name: "water"
    },

    GAS: {
        bg: "bg-danger",
        glyphicon: "glyphicon-fire",
        name: "gas"
    },
}

var gNumConsumers = 0;

var gCostElectricity = 0.57;
var gCostWater       = 1.28;
var gCostGas         = 1.69;

/*****************************************************************************/



/*** DOCUMENT READY **********************************************************/

$(document).ready(function() {
    $('#btn_add_electricity').click(function() {
        addConsumerForm(gCosumerType.ELECTRICITY);
    });

    $('#btn_add_water').click(function() {
        addConsumerForm(gCosumerType.WATER);
    });

    $('#btn_add_gas').click(function() {
        addConsumerForm(gCosumerType.GAS);
    });

    $('#btn-done-electricity').click(function() {
        var name = $('#input-name-electricity').val();
        var power = $('#input-power').val();
        var usage = $('#input-usage-electricity').val();
        if (name.length > 0 && power.length > 0 && usage.length > 0) {
            // $("#consumers").append(new_consumer(gCosumerType.ELECTRICITY, name));
            updateStatistics(gCosumerType.ELECTRICITY, name, power, usage);

            $('#input-name-electricity').val('');
            $('#input-power').val('');
            $('#input-usage-electricity').val('');
        } else {
            return false;
        }
    });

    $('#btn-done-water').click(function() {
        var name = $('#input-name-water').val();
        var usage = $('#input-usage-water').val();
        if (name.length > 0 && usage.length > 0) {
            // $("#consumers").append(new_consumer(gCosumerType.WATER, name));
            updateStatistics(gCosumerType.WATER, name, usage);

            $('#input-name-water').val('');
            $('#input-usage-water').val('');
        } else {
            return false;
        }
    });

    $('#btn-done-gas').click(function() {
        var name = $('#input-name-gas').val();
        var usage = $('#input-usage-gas').val();

        if (name.length > 0 && usage.length > 0) {
            // $("#consumers").append(new_consumer(gCosumerType.GAS, name));
            updateStatistics(gCosumerType.GAS, name, usage);

            $('#input-name-gas').val('');
            $('#input-usage-gas').val('');
        } else {
            return false;
        }
    });

    getLocation();
});

/*****************************************************************************/



/*** FUNCTIONS ***************************************************************/

function addConsumerForm(type) {
    $('#modal-' + type.name).modal('show');
}


function new_consumer(type, name, cost) {
    var result = '<p id="pmyid' + gNumConsumers + '" class="' + type.bg + '" cost="' + cost + '" type="' + type.name + '">' +
        '<span class="glyphicon ' + type.glyphicon + '"></span> ' + name +
        '<span id="myid' + gNumConsumers + '" class="glyphicon glyphicon-remove pull-right" onclick="remove(this.id)"></span>' +
        '</p>';

    gNumConsumers += 1;

    return result;
}


function remove(id) {
    var cost_day   = parseFloat($("#p" + id).attr('cost'));
    var cost_month = parseFloat((cost_day * 30).toFixed(2));
    var cost_year  = parseFloat((cost_day * 365).toFixed(2));

    var type = $("#p" + id).attr('type');

    $('#' + type + '-day').html(    (parseFloat($('#' + type + '-day').html())    - cost_day).toFixed(2));
    $('#' + type + '-month').html(  (parseFloat($('#' + type + '-month').html())  - cost_month).toFixed(2));
    $('#' + type + '-year').html(   (parseFloat($('#' + type + '-year').html())   - cost_year).toFixed(2));
    $('#' + type + '-number').html( (parseInt(  $('#' + type + '-number').html()) - 1).toString());

    $('#total-day').html(    (parseFloat($('#total-day').html())    - cost_day).toFixed(2));
    $('#total-month').html(  (parseFloat($('#total-month').html())  - cost_month).toFixed(2));
    $('#total-year').html(   (parseFloat($('#total-year').html())   - cost_year).toFixed(2));
    $('#total-number').html( (parseInt(  $('#total-number').html()) - 1).toString());

    $("#p" + id).remove();
}


function updateStatistics(type, name, a, b) {
    var cost_day;

    if (type == gCosumerType.ELECTRICITY) {
        var power = parseFloat(a);
        var usage = parseFloat(b);
        cost_day = parseFloat((gCostElectricity * (power / 1000) * usage).toFixed(2));
    }

    else if (type == gCosumerType.WATER) {
        var usage = parseFloat(a);
        cost_day = parseFloat((gCostWater * usage).toFixed(2));
    }

    else if (type == gCosumerType.GAS) {
        var usage = parseFloat(a);
        cost_day = parseFloat((gCostGas * usage).toFixed(2));
    }

    var cost_month = parseFloat((cost_day * 30).toFixed(2));
    var cost_year  = parseFloat((cost_day * 365).toFixed(2));

    $('#' + type.name + '-day').html(    (parseFloat($('#' + type.name + '-day').html())    + cost_day).toFixed(2));
    $('#' + type.name + '-month').html(  (parseFloat($('#' + type.name + '-month').html())  + cost_month).toFixed(2));
    $('#' + type.name + '-year').html(   (parseFloat($('#' + type.name + '-year').html())   + cost_year).toFixed(2));
    $('#' + type.name + '-number').html( (parseInt(  $('#' + type.name + '-number').html()) + 1).toString());

    $('#total-day').html(    (parseFloat($('#total-day').html())    + cost_day).toFixed(2));
    $('#total-month').html(  (parseFloat($('#total-month').html())  + cost_month).toFixed(2));
    $('#total-year').html(   (parseFloat($('#total-year').html())   + cost_year).toFixed(2));
    $('#total-number').html( (parseInt(  $('#total-number').html()) + 1).toString());

    $("#consumers").append(new_consumer(type, name, cost_day.toString()));
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        $('#mapholder').html("Geolocation is not supported by this browser.")
    }
}


function showPosition(position) {
    // var latlon = position.coords.latitude + "," + position.coords.longitude;

    // var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
    // +latlon+"&zoom=14&size=" + $('#mapholder').width() + "x" + $('#mapholder').height() + "&sensor=false";
    // $('#mapholder').html("<img src='"+img_url+"'>");

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    latlon = new google.maps.LatLng(lat, lon)
    mapholder = document.getElementById('mapholder')
    mapholder.style.height = '200px';
    mapholder.style.width = ($('#mapholder').width()) + 'px';

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
            $('#mapholder').html("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            $('#mapholder').html("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            $('#mapholder').html("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            $('#mapholder').html("An unknown error occurred.");
            break;
    }
}

/*****************************************************************************/