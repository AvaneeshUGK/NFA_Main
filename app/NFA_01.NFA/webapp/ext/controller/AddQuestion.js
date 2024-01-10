sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Column"
], function(MessageToast,Column) {
    'use strict';

    return {
        AddQuestion: function(oEvent) { debugger
          if(!this.event_id){
            this.event_id = oEvent.sPath.replace(/[^0-9]/g, "")
            this.event_id = "Doc" + this.event_id;
        }
            // if (!this.oDialog) {
                this.oDialog = new sap.m.Dialog({
                  title: "Add Question",
                  contentWidth: "600px",
                  contentHeight: "500px",
                  resizable: true,
                  draggable: true,

                  beginButton: new sap.m.Button({
                    text: "Add Question",
                    type: "Emphasized",
                    icon: "sap-icon://add",
                    press: function() { debugger

                        // let check = false;
                        var oDialogContent1 = this.oDialog.getContent()[0];
                        var oInputs = oDialogContent1.getItems();                        
                        // oInputs.forEach(input => {
                        //   let c = input.getPlaceholder();
                        //   if (c == 'Edit/Delete'){
                        //     check = true;
                        //   }
                        // })
                        // if (check){
                        //   oInputs.splice(oInputs.length - 1, 1)
                        // }
                        var aCellValues = [];
                        let returnflag = false;
                        var postData = {};
                        oInputs.forEach(function (oInput) {
                            var inputValue = oInput.getValue();
                            var inputPlaceholder = oInput.getPlaceholder();
                            if (inputValue == "" || inputValue == null || inputValue == undefined){
                                MessageToast.show("Please fill in every entry");
                                returnflag = true;
                              }
                            postData[inputPlaceholder] = inputValue; // Populate the postData object
                            aCellValues.push(new sap.m.Text({ text: inputValue }));
                        });

                        if (returnflag){
                            return;
                          }

                        var busyDialog = new sap.m.BusyDialog();
                        busyDialog.open();
                        let oTableDD = this.byId('fe::table::questionaire::LineItem::Questions::Table');
                        let oTableDDD = oTableDD.getContent().mAggregations._content;
                        // oTableDDD.destroyItems();
                        const that = this;
                        // oTableDDD.destroyColumns();

                        var postUrl =
                            "https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/postQuestion?event_id=" +
                                    this.event_id;
                        var getUrl = "https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/GetSupplierBidsv1?event_id=$" +
                                      this. event_id;

                                    $.ajax({
                                      type: "POST",
                                      url: postUrl,
                                      data: JSON.stringify(postData),
                                      contentType: "application/json",
                                      dataType: "json",
                                      success: function(data) { debugger
          
                                          $.ajax({
                                              type: "GET",
                                              url: getUrl,
                                              success: function(data){ debugger
                                                let oTableDD = that.byId('fe::table::questionaire::LineItem::Questions::Table');
                                                let oTableDDD = oTableDD.getContent().mAggregations._content;
                                                  let colArray = [];
                                                  let detailsColumns = ["Itemname","Description","Quantity","Unit"];
                                                  // oTableDDD.destroyColumns();
                                                  let det = data?.data?.items?.bidding_data;
                                                  data?.data?.items?.bidding_data.forEach(quest => {
                                                      let keyval = Object.keys(quest);
                                                      let valVal = Object.values(quest);
                                                      detailsColumns.forEach(col => {
                                                          if(!colArray.includes(col)){
                                                              var oColumn = new Column({
                                                                  header: new sap.m.Label({
                                                                      text: col
                                                                  })
                                                              });
                                                              oTableDDD.addColumn(oColumn);
                                                              colArray.push(col)
                                                          }
                                                      })
                                                      keyval.forEach(key => {
                                                          if(!colArray.includes(key)){
                                                              var oColumn = new Column({
                                                                  header: new sap.m.Label({
                                                                      text: key
                                                                  })
                                                              });
                                                              oTableDDD.addColumn(oColumn);
                                                              colArray.push(key)
                                                          }
                                                      })
                      
                                                      if(!colArray.includes('Edit/Delete')) {
                                                          var oColumn = new Column({
                                                              header: new sap.m.Label({
                                                                  text: 'Edit/Delete'
                                                              }),
                                                              visible: false,
                                                          });
                                                          oTableDDD.addColumn(oColumn);
                                                          colArray.push('Edit/Delete');
                                                      }
                                                  });
          
                                                  let oCells = [];
                                                  let oRow
                                                  let tempvals
                                                  let oCell
          
                                                  if(det != undefined){
                                                      for(let i = 0; i < det.length; i++){
                                                          for(let j = 0; j < detailsColumns.length; j++){
                                                              oCell = new sap.m.Text({
                                                                  text: det[i][detailsColumns[j]]
                                                              });
                                                          oCells.push(oCell);
                                                          delete det[i][detailsColumns[j]]
                                                          }
                                                      tempvals = Object.values(det[i]);
                                                      tempvals.forEach(val => {
                                                          oCell = new sap.m.Text({
                                                              text: val
                                                          });
                                                      oCells.push(oCell);
                                                      })
                                                      oRow = new ColumnListItem({
                                                          cells: oCells
                                                        });
                                                      oTableDDD.addItem(oRow);
                                                      oCells = [];
                                                      debugger
                                                      }
                                                  }
                                                  busyDialog.close();
                                              },
                                              error: function(error){
                                                  busyDialog.close();
                                              }
                                          })
                                          
          
          
                                      },
                                      error: function(error){
                                          busyDialog.close();
                                      }
                                  })

                        // var oButtonsColumn = new sap.m.HBox();
                        // oButtonsColumn.addItem(
                        //   new sap.m.Button({
                        //     icon: "sap-icon://edit",
                        //     type: "Emphasized",
                        //     press: [function(oEvent){
                        //       debugger
                        //       var oRow = oEvent.getSource().getParent().getParent();
                        //       var oCells = oRow.getCells();
  
                        //       // Open the edit dialog and populate it with data
                              

                        //       var aInputFields = [];
  
                        //       this.editDialog = new sap.m.Dialog({
                        //         title: "Edit Question",
                        //         contentWidth: "400px",
                        //         contentHeight: "500px",
                        //         resizable: true,
                        //         draggable: true,
                        //         beginButton: new sap.m.Button({
                        //           text: "Save",
                        //           type: "Success",
                        //           icon: "sap-icon://save",
                        //           press: function (oEvent) {
                        //             debugger
                        //             var oController = this;
                        //             var postData = {}; // Create an object to hold the updated post data
                      
                        //             // Update the data in the actual table row based on the input values
                        //             oCells.forEach(function (oCell, index) {
                        //               if (index !== oCells.length - 1) {
                        //                 // Skip the last column (Actions column)
                        //                 var oInput = aInputFields[index];
                        //                 var sInputValue = oInput.getValue();
                        //                 oCell.setText(sInputValue);
                      
                        //                 // Populate the updated postData object
                        //                 var cellPlaceholder = oInput.getPlaceholder();
                        //                 postData[cellPlaceholder] = sInputValue;
                        //               }
                        //             });
                      
                        //             // Close the dialog after saving
                        //             this.editDialog.close();
                      
                        //             // Make the POST call to update the data on the server
                        //             // var postUrl3 =
                        //             //   "https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/updateQuestion?";
                      
                        //             // sap.ui.require(["sap/ui/core/Fragment"], function (Fragment) {
                        //             //   debugger;
                        //             //   var busyDialog = new sap.m.BusyDialog();
                        //             //   busyDialog.open();
                      
                        //             //   jQuery.ajax({
                        //             //     type: "POST",
                        //             //     url: postUrl3,
                        //             //     data: JSON.stringify(postData),
                        //             //     contentType: "application/json",
                        //             //     dataType: "json",
                        //             //     success: function (data) {
                        //             //       // Handle success
                        //             //       busyDialog.close();
                        //             //       MessageToast.show("Question Updated");
                        //             //     },
                        //             //     error: function (error) {
                        //             //       // Handle error
                        //             //       busyDialog.close();
                        //             //       MessageToast.show("Question Updated");
                        //             //       console.error("Error:", error);
                        //             //     },
                        //             //   });
                        //             // });
                        //           }.bind(this),
                        //         }),
                        //         // ... (rest of the dialog properties)
                        //       });
                      
                        //       var oDialogContent1 = new sap.m.VBox();
                      
                        //       oCells.forEach(function (oCell, index) {
                        //         if (index !== oCells.length - 1) {
                        //           // Skip the last column (Actions column)
                        //           var oInput = new sap.m.Input({
                        //             width: "100%",
                        //             placeholder: oCell.getText(), // Set the placeholder as the current cell value
                        //           });
                        //           oDialogContent1.addItem(oInput);
                        //           aInputFields.push(oInput); // Store the input field in the array
                        //         }
                        //       });
                      
                        //       this.editDialog.addContent(oDialogContent1);
                        //       // this.getView().addDependent(this.editDialog);
                      
                        //       // Set the values for the input fields from the current row
                        //       oCells.forEach(function (oCell, index) {
                        //         if (index !== oCells.length - 1) {
                        //           // Skip the last column (Actions column)
                        //           aInputFields[index].setValue(oCell.getText());
                        //         }
                        //       });
                      
                        //       this.editDialog.open();


                        //     }, this],
                        //   })
                        // );
                        // oButtonsColumn.addItem(new sap.m.ToolbarSpacer({ width: "10px" }));
                
                        // oButtonsColumn.addItem(
                        //   new sap.m.Button({
                        //     icon: "sap-icon://delete",
                        //     type: "Negative",
                        //     press: [function(oEvent){
                        //       debugger
                        //       var delUrl =
                        //                 "https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/postQuestion?event_id=" +
                        //                   this.event_id;
                        //       let Columns = oEvent.getSource().getParent().getParent().getParent().mAggregations.columns;
                        //       var oButton = oEvent.getSource();
                        //       var oRow = oButton.getParent().getParent(); // Get the parent row of the button
                        //       let cells = oRow.getCells();
                        //       Columns.splice(Columns.length - 1 , 1);
                        //       cells.splice(cells.length - 1 , 1);
                              
                        //       let headers = [];
                        //       let values = [];
                              
                        //       Columns.forEach(column => {
                        //         headers.push(column.mAggregations.header.mProperties.text);
                        //       });
                        //       cells.forEach(cell => {
                        //         values.push(cell.getText());
                        //       })

                        //       let delData = {};
                        //       headers.forEach((header,index) => {
                               
                        //       delData[`${header}`] = values[index];
                        //       })

                        //       let that = this;

                        //       $.ajax({
                        //         type: "DELETE",
                        //         url: delUrl,
                        //         data: JSON.stringify(delData),
                        //         contentType: "application/json",
                        //         dataType: "json",
                        //         success: function(data) { debugger
                        //           let oTable2D = that.byId('fe::table::questionaire::LineItem::Questions::Table');
                        //           let oTable2 = oTable2D.getContent().mAggregations._content;
                        //           oTable2.removeItem(oRow);
                        //           MessageToast.show("Row Deleted");
                        //         }
                        //       });
                              
                              


                        //     }, this],
                        //   })
                        // );
                        // aCellValues.push(oButtonsColumn);
                        debugger
                        let oTableD = this.byId('fe::table::questionaire::LineItem::Questions::Table');
                        let oTable = oTableD.getContent().mAggregations._content;

                        var oNewRow = new sap.m.ColumnListItem({
                            cells: aCellValues,
                        });


                        MessageToast.show("Question Added");
                        oTable.getColumns()[oTable.getColumns().length - 1].setVisible(true);

                          // Add the new row to the table
                        oTable.addItem(oNewRow);
                        
                        
                        function reloadPage() {debugger
                          // Reload the current page
                          location.reload();
                        }
                        
                        // Call this function wherever you need to reload the page
                        reloadPage();

                        MessageToast.show("Questions Added");
                        this.oDialog.close();

                    }.bind(this),
                  }),

                  endButton: new sap.m.Button({
                    text: "Cancel",
                    type: "Negative",
                    press: function(){
                        this.oDialog.close();
                    }.bind(this),
                  }),

                  afterClose: function () {
                    var oDialogContent = this.oDialog.getContent()[0];
                    var oInputs = oDialogContent.getItems();

                    // Clear input fields after dialog is closed

                    oInputs.forEach(function (oInput) {
                    if (oInput instanceof sap.m.Input) {
                        oInput.setValue(""); // Clear the input value
                    }
        });; 
                  }.bind(this),
                });



                this.oDialog.addStyleClass("myCustomDialog");
                let oTableD = this.byId('fe::table::questionaire::LineItem::Questions::Table');
                let oTable = oTableD.getContent().mAggregations._content;
                var oColumns = oTable.getColumns();
                var oDialogContent1 = new sap.m.VBox();

                for (var i = 0; i < oColumns.length ; i++) {
                    var sHeaderText = oColumns[i].getHeader().getText();
                    if (sHeaderText != "" && sHeaderText != "Edit/Delete") {
                      var oInput = new sap.m.Input({
                        width: "80%",
                        placeholder: sHeaderText,
                      });
                      oInput.setRequired(true);
                      oDialogContent1.addItem(oInput);
                    }
                    
                  }
        
                  this.oDialog.addContent(oDialogContent1);
            // }
            this.oDialog.open();
        },
        onAddQuestion: function() {

        }
    };
});
