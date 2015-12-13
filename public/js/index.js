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
var gCostWater       = 5.75;
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
            $("#consumers").append(new_consumer(gCosumerType.ELECTRICITY, name));
            updateStatistics(gCosumerType.ELECTRICITY, power, usage);

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
            $("#consumers").append(new_consumer(gCosumerType.WATER, name));
            updateStatistics(gCosumerType.WATER, usage);

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
            $("#consumers").append(new_consumer(gCosumerType.GAS, name));
            updateStatistics(gCosumerType.GAS, usage);

            $('#input-name-gas').val('');
            $('#input-usage-gas').val('');
        } else {
            return false;
        }
    });
});

/*****************************************************************************/



/*** FUNCTIONS ***************************************************************/

function addConsumerForm(type) {
    $('#modal-' + type.name).modal('show');
}


function new_consumer(type, name) {
    var result = '<p id="pmyid' + gNumConsumers + '" class="' + type.bg + '">' +
        '<span class="glyphicon ' + type.glyphicon + '"></span> ' + name +
        '<span id="myid' + gNumConsumers + '" class="glyphicon glyphicon-remove pull-right" onclick="remove(this.id)"></span>' +
        '</p>';

    gNumConsumers += 1;

    return result;
}


function remove(id) {
    $("#p" + id).remove();
}


function updateStatistics(type, a, b) {
    var cost_day;

    if (type == gCosumerType.ELECTRICITY) {
        var power = parseInt(a);
        var usage = parseInt(b);
        cost_day = gCostElectricity * (power / 1000) * usage;
    }

    else if (type == gCosumerType.WATER) {
        var usage = parseInt(a);
        cost_day = gCostWater * usage;
    }

    else if (type == gCosumerType.GAS) {
        var usage = parseInt(a);
        cost_day = gCostGas * usage;
    }

    var cost_month = cost_day * 30;
    var cost_year = cost_day * 365;

    $('#' + type.name + '-day').html(    (parseFloat($('#' + type.name + '-day').html())    + cost_day).toFixed(2));
    $('#' + type.name + '-month').html(  (parseFloat($('#' + type.name + '-month').html())  + cost_month).toFixed(2));
    $('#' + type.name + '-year').html(   (parseFloat($('#' + type.name + '-year').html())   + cost_year).toFixed(2));
    $('#' + type.name + '-number').html( (parseInt(  $('#' + type.name + '-number').html()) + 1).toString());

    $('#total-day').html(    (parseFloat($('#total-day').html())    + cost_day).toFixed(2));
    $('#total-month').html(  (parseFloat($('#total-month').html())  + cost_month).toFixed(2));
    $('#total-year').html(   (parseFloat($('#total-year').html())   + cost_year).toFixed(2));
    $('#total-number').html( (parseInt(  $('#total-number').html()) + 1).toString());
}

/*****************************************************************************/