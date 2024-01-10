sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        uploadfun: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
