sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onPress: function(oEvent) { debugger
            MessageToast.show("Custom handler invoked.");
        }
    };
});
