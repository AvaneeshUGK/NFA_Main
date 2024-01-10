sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'NFA01.NFA',
            componentId: 'Source_EventsList',
            entitySet: 'Source_Events'
        },
        CustomPageDefinitions
    );
});