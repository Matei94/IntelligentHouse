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

/*****************************************************************************/



/*** DOCUMENT READY **********************************************************/

$(document).ready(function() {
    $('#btn_add_electricity').click(function() {
        addConsumer(gCosumerType.ELECTRICITY);
    });

    $('#btn_add_water').click(function() {
        addConsumer(gCosumerType.WATER);
    });

    $('#btn_add_gas').click(function() {
        addConsumer(gCosumerType.GAS);
    });

    $('#btn-done-electricity').click(function() {
        var name = $('#input-name-electricity').val();
        if (name.length > 0) {
            $("#consumers").append(new_consumer(gCosumerType.ELECTRICITY, name));
            $('#input-name-electricity').val('');
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

function addConsumer(type) {
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

/*****************************************************************************/