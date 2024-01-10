// sap.ui.define([
//     "sap/m/MessageToast"
// ], function(MessageToast) {
//     'use strict';

//     return {
//         generatefunc:function() { 
//           debugger

//           domtoimage.toPng(document.body).then(function (dataUrl) 
//           {     
//               var doc = new jsPDF(
//               {
//                   orientation:'landscape',
//               })
//               doc.addImage(dataUrl,'PNG',25,25,250,150)
//               doc.save('applicationview.pdf')
//           })

//           sap.ui.define([
//     "sap/m/MessageToast",
//     "dom-to-image",
//     "jspdf"
// ], function(MessageToast, domtoimage, jsPDF) {
//     'use strict';

//     return {
//         generatefunc: function() {
//             debugger;

//             domtoimage.toPng(document.body).then(function(dataUrl) {
//                 var doc = new jsPDF({
//                     orientation: 'landscape',
//                 });
//                 doc.addImage(dataUrl, 'PNG', 25, 25, 250, 150);
//                 doc.save('applicationview.pdf');
//             });
//         },
//     };
// });



//           },
          
//     };
// });
sap.ui.define([
     "sap/m/MessageToast"
 ], function(MessageToast) {
     'use strict';
 
     return {
         generatefunc: function() {
             debugger;
    
            //  let oTableP = this.byId('fe::table::questionaire::LineItem::Questions::Table').mAggregations.content.mAggregations._content.mAggregations.columns;
            //             oTableP.forEach(input=>{
            //                 let value = input.mAggregations.header.mProperties.text;
                            
                           
            //                    if(value == 'Edit/Delete'){debugger
            //                         input.setVisible(false);
            //                         // console.log("success");
            //                         // this.byId(oTableP)[colid].setVisible(false);
                                    
            //                     }                              
            //                });

            //                function print(){
            //                var printWindow = window.open('print','_page');
            //                var hdrs = document.getElementById('NFA01.NFA::Source_EventsObjectPage--fe::ObjectPage-OPHeaderContent').innerHTML;
            //                var questionnaire = document.getElementById('NFA01.NFA::Source_EventsObjectPage--fe::table::questionaire::LineItem::Questions-innerTable-listUl').innerHTML;
            //                var details = document.getElementById('NFA01.NFA::Source_EventsObjectPage--fe::table::questionaire::LineItem::Details-innerTable-listUl').innerHTML;
            //                var print = printWindow.document.write( '<!DOCTYPE html><html><h3>'+ hdrs+'</h3><h2>Questionnaire</h2><table><tr><div>'+ questionnaire +'</div></tr></table><br></br><h2>Details</h2><table><tr>' +  details + '</tr></table></html>');
                           
            //                            //  var print = printWindow.document.write('<!DOCTYPE html><html><head>' + hdrs + '</head><body>' +  printContent + '</body></html>');
            //                            printWindow.document.close();
            //                            printWindow.print();
                                       // console.log(print);
                       //    input.setVisible(true);
                        //    }

                        // print();

                        

                      
			// 				let oTableDP = oExtensionAPI.byId('fe::table::questionaire::LineItem::Details::Table');
			// 				let oTable = oTableP.getContent().mAggregations._content;
			// 				let oTableD = oTableDP.getContent().mAggregations._content;

                    
    //  var hdrs = document.getElementById('NFA01.NFA::Source_EventsObjectPage--fe::ObjectPage-OPHeaderContent').innerHTML;
            //  var printContent = document.getElementById('canvas').innerHTML;
    //  var printContent = document.getElementById('NFA01.NFA::Source_EventsObjectPage--fe::ObjectPage-sectionsContainer').innerHTML;
    // var printContentHead = document.getElementsByTagName('head').innerHTML;
    var printWindow = window.open('print','_page');
    var hdrs = document.getElementById('NFA01.NFA::Source_EventsObjectPage--fe::HeaderContentContainer').innerHTML;
    var questionnaire = document.getElementById('NFA01.NFA::Source_EventsObjectPage--fe::table::questionaire::LineItem::Questions-innerTable-listUl').innerHTML;

    function replace(inputString) {
        // Define the pattern to match
        var pattern = "Edit/Delete";
        var result = inputString.replace(pattern, "");    
        return result;
    }
    questionnaire = replace(questionnaire);
    
        function replacePattern(inputString) {
        // Define the pattern to match
        var pattern = /<td.*?>.*?<\/td><td.*?>.*?<\/td><\/tr>/g;
        var matches = inputString.match(pattern);
        if (matches && matches.length >= 2) {
            var lastTwoOccurrences = matches.slice(-2);
    
            // Replace the content in the original string
            lastTwoOccurrences.forEach(function (match) {
                inputString = inputString.replace(match, '</tr>');
            });
        }
        return inputString;
    }
    questionnaire = replacePattern(questionnaire);
    var details = document.getElementById('NFA01.NFA::Source_EventsObjectPage--fe::table::questionaire::LineItem::Details-innerTable-listUl').innerHTML;
    function replacedet(inputString) {
        // Define the pattern to match
        var pattern = "Edit/Delete";
        var result = inputString.replace(pattern, "");    
        return result;
    }

    details = replacedet(details);
    
        function replacedetails(inputString) {
        // Define the pattern to match
        // var pattern = /<td.*?><\/td><td.*?><\/td><\/tr>/g;
        // var matches = inputString.match(pattern);
        // if (matches && matches.length >= 3) {
        //     var lastTwoOccurrences = matches.slice();
    
        //     // Replace the content in the original string
        //     lastTwoOccurrences.forEach(function (match) {
        //         inputString = inputString.replace(match, '</tr>');
        //     });
        // }
        // return inputString;
        var pattern = /<button.*?>.*?<\/button>/g;
        var result = inputString.replace(pattern, "");    
        return result;
    }
    details = replacedetails(details);

    var print = printWindow.document.write(
        '<!DOCTYPE html><html><h3>'+ hdrs+'</h3><h2>Questionnaire</h2><table><tr><div>'+ questionnaire +'</div></tr></table><br></br><h2>Details</h2><table><tr>' +  details + '</tr></table></html>');

            //  var print = printWindow.document.write('<!DOCTYPE html><html><head>' + hdrs + '</head><body>' +  printContent + '</body></html>');
             printWindow.document.close();
             printWindow.print();
             console.log(print);
             
           
         },
     };
 });
 