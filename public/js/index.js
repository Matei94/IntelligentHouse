/*** VARIABLES ***************************************************************/

var gCosumerType = {
    ELECTRICITY: 0,
    WATER:       1,
    GAS:         2,
}

/*****************************************************************************/



/*** DOCUMENT READY **********************************************************/

$(document).ready(function() {
    $('#btn_add_electricity').click(function() {
      on_click(gCosumerType.ELECTRICITY);
    });
});

$(document).ready(function() {
    $('#btn_add_water').click(function() {
      on_click(gCosumerType.WATER);
    });
});

$(document).ready(function() {
    $('#btn_add_gas').click(function() {
      on_click(gCosumerType.GAS);
    });
});

/*****************************************************************************/



/*** FUNCTIONS ***************************************************************/

function on_click(type) {
    $("#consumers").append(new_consumer(type));
}

function new_consumer(type) {
    return "<p>" + type + "</p";
}

/*****************************************************************************/