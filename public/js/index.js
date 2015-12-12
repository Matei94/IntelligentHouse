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
    return '<p class="' + type.bg + '">' +
        '<span class="glyphicon ' + type.glyphicon + '"></span>' +
        ' name ' +
        '<span class="glyphicon glyphicon-remove pull-right"></span>' +
        '</p>';
}

/*****************************************************************************/