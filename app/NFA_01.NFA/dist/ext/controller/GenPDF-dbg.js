// sap.ui.define([
//     "sap/m/MessageToast"
// ], function(MessageToast) {
//     'use strict';

//     return {
//         GenPDF: async function(oEvent) { debugger
//             const oModel = this.getModel();
//             const sFunctionName = "generatePdf"
//             const oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
//             await oFunction.execute();
//             const oContext = oFunction.getBoundContext();
// 			let pdfURL = oContext.getObject();
//             const trueurl = pdfURL.value;
//             if (!this._PDFViewer) {
//                     this._PDFViewer = new sap.m.PDFViewer({
//                         width: "auto",
//                         source: trueurl, // my blob url
//                         showDownloadButton: false
//                     });
//             }
//             this._PDFViewer.open();

//     },
//     Generate: function() {
//         MessageToast.show("Custom handler invoked.");
//     }
//     };
// });

sap.ui.define([
    "sap/m/MessageBox",
    "sap/ui/core/library",
    'sap/ui/core/BusyIndicator',
], (MessageBox, coreLibrary, BusyIndicator) => {
    "use strict";

    return {
        Generate: function (oContext) { debugger
           
            // var previewButton = this.byId("fe::DataFieldForIntentBasedNavigation::PreviewAppHeaderDisplay::display");
            // previewButton.setVisible(false);

            // var versionButton = this.byId("fe::DataFieldForIntentBasedNavigation::VersionAssociationDisplay::display");
            // versionButton.setVisible(false);

            var generatePdf = this.byId("fe::CustomAction::Generate");
            generatePdf.setVisible(false);

            // var shareButtons =  sap.ui.getCore().byId("__button6-internalBtn-img");
            // shareButtons.setVisible(false);

            // var sharebut =  sap.ui.getCore().byId("__title4-_actionsToolbar-overflowButtonClone-img");
            // sharebut.setVisible(false);

            

            //hide add button of ques
           
            var addButton =this.byId("fe::table::questionaire::LineItem::Questions::Table");
            
            var addButt = addButton.getContent().getActions();
            var innerButton = addButt[1].mAggregations.action;
            innerButton.setVisible(false);

            // hide search bar of ques 
            var searchBar = addButt[0].mAggregations.action;
            searchBar.setVisible(false);

            // copy button of ques
            var copyButton = sap.ui.getCore().byId("fe::table::questionaire::LineItem::Questions-copy");
            copyButton.setVisible(false);

            // settings button of ques
            var sett1 = this.byId("fe::table::questionaire::LineItem::Questions-settings-img");
            sett1.setVisible(false);

            // share button of ques
            var share1 = this.byId("fe::table::questionaire::LineItem::Questions-export-internalSplitBtn-textButton")
            share1.setVisible(false)

            // hide shareButton of details
            var shareButton = this.byId("fe::table::questionaire::LineItem::Details-export-internalSplitBtn-textButton");
            shareButton.setVisible(false);

            // copy button of details
            var copyButton1 = sap.ui.getCore().byId("fe::table::questionaire::LineItem::Details-copy");
            copyButton1.setVisible(false);

            // add button of details
            var add1= sap.ui.getCore().byId("fe::table::questionaire::LineItem::Details::CustomAction::AddDetails");
            add1.setVisible(false);

            // hide search bar of details
            var toolBar = sap.ui.getCore().byId("__field1");
            toolBar.setVisible(false);

            var sett = this.byId("fe::table::questionaire::LineItem::Details-settings-img");
            sett.setVisible(false);       

            $.ajax({
                method: "GET",
                url: "",
                success: function () {
                    debugger
                    window.print();
                    sett.setVisible(true);
                    previewButton.setVisible(true);
                    versionButton.setVisible(true);
                    generatePdf.setVisible(true);
                    shareButtons.setVisible(true);
                    searchBar.setVisible(true);
                    addButton.setVisible(true);
                    copyButton.setVisible(true);
                    sett1.setVisible(true);
                    share1.setVisible(true);
                    shareButton.setVisible(true);
                    copyButton1.setVisible(true);
                    add1.setVisible(true);
                    toolBar.setVisible(true);

                }
            })

        }
    };
});


