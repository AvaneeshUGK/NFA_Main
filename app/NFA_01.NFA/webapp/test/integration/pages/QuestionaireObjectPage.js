sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'NFA01.NFA',
            componentId: 'QuestionaireObjectPage',
            entitySet: 'Questionaire'
        },
        CustomPageDefinitions
    );
});