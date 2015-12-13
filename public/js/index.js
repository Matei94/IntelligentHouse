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
var gCost_kWh = 0.5644;

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
        if (name.length > 0) {
            $("#consumers").append(new_consumer(gCosumerType.WATER, name));
            $('#input-name-water').val('');
        } else {
            return false;
        }
    });

    $('#btn-done-gas').click(function() {
        var name = $('#input-name-gas').val();
        if (name.length > 0) {
            $("#consumers").append(new_consumer(gCosumerType.GAS, name));
            $('#input-name-gas').val('');
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
    if (type == gCosumerType.ELECTRICITY) {
        var power = parseInt(a);
        var usage = parseInt(b);
        var cost_day = gCost_kWh * (power / 1000) * usage;
        var cost_month = cost_day * 30;
        var cost_year = cost_day * 365;

        $('#electricity-day').html((parseFloat($('#electricity-day').html()) + cost_day).toFixed(2));
        $('#electricity-month').html((parseFloat($('#electricity-month').html()) + cost_month).toFixed(2));
        $('#electricity-year').html((parseFloat($('#electricity-year').html()) + cost_year).toFixed(2));
        $('#electricity-number').html((parseInt($('#electricity-number').html()) + 1).toString());
    }
}

/*****************************************************************************/