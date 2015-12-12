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
});

/*****************************************************************************/



/*** FUNCTIONS ***************************************************************/

function addConsumer(type) {
    $('#add-consumer-header').html('New ' + type.name + ' consumer');
    $('#myModal').modal('show');
    $('#btn-done').click(function() {
        $("#consumers").append(new_consumer(type));
        $('#myModal').close();
    });

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


function remove(id) {
    $("#p" + id).remove();
}

/*****************************************************************************/