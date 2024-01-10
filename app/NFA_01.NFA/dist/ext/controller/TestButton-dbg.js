sap.ui.define([
    "sap/m/MessageToast",
    'sap/ui/core/library'
], function(MessageToast,coreLibrary) {
    'use strict';

    return {
        TestButton: function(oEvent) { debugger
            var url = "/Source_Events"
            var oModel = new sap.ui.model.odata.ODataModel(url);
            const oContext = oEvent
            var datav
            oModel.read("", {
                success : function(data) {
                    console.log(data);
                    datav = data;
                }
            })
            MessageToast.show("Custom handler invoked.");
        }
    };
});
