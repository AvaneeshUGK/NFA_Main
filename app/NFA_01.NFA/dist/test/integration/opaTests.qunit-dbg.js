sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'NFA01/NFA/test/integration/FirstJourney',
		'NFA01/NFA/test/integration/pages/Source_EventsList',
		'NFA01/NFA/test/integration/pages/Source_EventsObjectPage',
		'NFA01/NFA/test/integration/pages/QuestionaireObjectPage'
    ],
    function(JourneyRunner, opaJourney, Source_EventsList, Source_EventsObjectPage, QuestionaireObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('NFA01/NFA') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSource_EventsList: Source_EventsList,
					onTheSource_EventsObjectPage: Source_EventsObjectPage,
					onTheQuestionaireObjectPage: QuestionaireObjectPage
                }
            },
            opaJourney.run
        );
    }
);