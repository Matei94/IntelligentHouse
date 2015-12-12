/*** VARIABLES ***************************************************************/

var gCosumerType = {
    ELECTRICITY: {
        bg: "bg-warning",
        glyphicon: "glyphicon-flash"
    },

    WATER: {
        bg: "bg-primary",
        glyphicon: "glyphicon-tint"
    },

    GAS: {
        bg: "bg-danger",
        glyphicon: "glyphicon-fire"
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
});

/*****************************************************************************/



/*** FUNCTIONS ***************************************************************/

function addConsumer(type) {
    $("#consumers").append(new_consumer(type));
}

function new_consumer(type) {
    var result = '<p id="pmyid' + gNumConsumers + '" class="' + type.bg + '">' +
        '<span class="glyphicon ' + type.glyphicon + '"></span>' +
        ' name ' + gNumConsumers +
        '<span id="myid' + gNumConsumers + '" class="glyphicon glyphicon-remove pull-right" onclick="remove(this.id)"></span>' +
        '</p>';

    gNumConsumers += 1;

    return result;
}

function remove(arg) {
    $("#p" + arg).remove();
}

/*****************************************************************************/