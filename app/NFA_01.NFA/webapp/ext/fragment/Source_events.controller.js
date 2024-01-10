sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onPress: function(oEvent) { debugger
            const oContext = oEvent
            const path = oContext.getSource();
            const paras = oContext.getParameters();
            const eta = oContext.oSource.oPropagatedProperties.oModels.viewData.observeData();
            MessageToast.show("Custom handler invoked.");
        }
    };
});
