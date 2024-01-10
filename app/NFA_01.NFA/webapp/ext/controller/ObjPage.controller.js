sap.ui.define(['sap/ui/core/mvc/ControllerExtension',"sap/m/Column","sap/m/ColumnListItem"], function (ControllerExtension,Column,ColumnListItem) {
	'use strict';

	return ControllerExtension.extend('NFA01.NFA.ext.controller.ObjPage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf NFA01.NFA.ext.controller.ObjPage
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			viewstate: {
				onBeforeStateApplied: async function(oBindingContext) {
					debugger
				}
			}
			,
			routing: {
				onAfterBinding: async function (oBindingContext) {
					const  oExtensionAPI = this.base.getExtensionAPI(),
            				oModel = oExtensionAPI.getModel(),
							sFunctionName = "readSrcEvents",
							oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
							let oCell
							let event_id = oBindingContext.sPath.replace(/[^0-9]/g, "")
							event_id = "Doc" + event_id;
							// this.event_id = event_id;
					let detailsColumns = ["Itemname","Description","Quantity","Unit"];
					let questionsColumns = ["question"];
					debugger
					
					// await oFunction.execute();
					// const oContext = oFunction.getBoundContext();
					// let bookings = oContext.getObject();
					// let keyval = Object.keys(bookings);
					// let valVal = Object.values(bookings);
					

					sap.ui.core.BusyIndicator.show(0);
					$.ajax({
						url: `https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/GetSupplierBidsv1?event_id=${event_id}`,
						type: "GET",
						success: function(data){ debugger

							let oTableP = oExtensionAPI.byId('fe::table::questionaire::LineItem::Questions::Table');
							let oTableDP = oExtensionAPI.byId('fe::table::questionaire::LineItem::Details::Table');
							let oTable = oTableP.getContent().mAggregations._content;
							let oTableD = oTableDP.getContent().mAggregations._content;
							

							oTable.destroyItems();
							oTableD.destroyItems();
							oTable.destroyColumns();
							oTableD.destroyColumns();
							oFunction.setParameter("event_id",'Doc33123002');
							//  Questions table
							let colArray = ['id'];
							let ques = data?.qns?.qns_data;
							data?.qns?.qns_data.forEach(quest => {
								let keyval = Object.keys(quest);
								let valVal = Object.values(quest);
								questionsColumns.forEach(col => {
									if(!colArray.includes(col)){
										var oColumn = new Column({
											header: new sap.m.Label({
												text: col
											})
										});
										oTable.addColumn(oColumn);
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
										oTable.addColumn(oColumn);
										colArray.push(key)
									}
								})
								let Qcheck = quest?.id;
								if(!colArray.includes('Edit/Delete') && Qcheck != undefined  ) {debugger
									var oColumn = new Column({
										header: new sap.m.Label({
											text: 'Edit/Delete'
										}),
										// visible: false,
									});
									oTable.addColumn(oColumn);
									colArray.push('Edit/Delete');
								}
								
								// var oCells = [];
								// valVal.forEach(value => {
								// 		oCell = new sap.m.Text({
								// 		text: value
						  		// 	});
								// oCells.push(oCell);
								// })
								// var oRow = new ColumnListItem({
								// 	cells: oCells
								//   });
								// oTable.addItem(oRow);
							});

							// Details Table
							colArray = ['id'];
							let det = data?.data?.items?.bidding_data;
							data?.data?.items?.bidding_data.forEach(quest => {
								let keyval = Object.keys(quest);
								let valVal = Object.values(quest);
								detailsColumns.forEach(col => {
									if(!colArray.includes(col)){
										var oColumn = new Column({
											header: new sap.m.Label({
												text: col
											}),
											// width: "100px"
										});
										oTableD.addColumn(oColumn);
										colArray.push(col)
									}
								})
								keyval.forEach(key => {
									if(!colArray.includes(key)){
										var oColumn = new Column({
											header: new sap.m.Label({
												text: key
											}),
											// width: "100px"
										});
										oTableD.addColumn(oColumn);
										colArray.push(key)
									}
								})
								let Dcheck = quest?.id;
								if(!colArray.includes('Edit/Delete') && Dcheck != undefined) {
									var oColumn = new Column({
										header: new sap.m.Label({
											text: 'Edit/Delete'
										})
									});
									oTableD.addColumn(oColumn);
									colArray.push('Edit/Delete');
								}

								// var oCells = [];
								// valVal.forEach(value => {
								// 		oCell = new sap.m.Text({
								// 		text: value
						  		// 	});
								// oCells.push(oCell);
								// })
								// var oRow = new ColumnListItem({
								// 	cells: oCells
								//   });
								// oTableD.addItem(oRow);
							});

							// Questions row insert
							
							let oCells = [];
							let oRow
							let tempvals

							if(ques != undefined){
								for(let i = 0; i < ques.length; i++){
									for(let j = 0; j < questionsColumns.length; j++){
										oCell = new sap.m.Text({
											text: ques[i][questionsColumns[j]]
										});
									oCells.push(oCell);
									delete ques[i][questionsColumns[j]]
									}
								let check = ques[i]?.id;
								if (check != undefined){
									delete ques[i].id
								}
								tempvals = Object.values(ques[i]);
								tempvals.forEach(val => {
									oCell = new sap.m.Text({
										text: val
									});
								oCells.push(oCell);
								})
								
								if (check != undefined){
									var oButtonsColumn = new sap.m.HBox();
									oButtonsColumn.addItem(
										new sap.m.Button({
										  icon: "sap-icon://edit",
										  type: "Emphasized",
										  press: [function(oEvent){
											debugger
											var oRow = oEvent.getSource().getParent().getParent();
											var oCells = oRow.getCells();
											let Columns = oEvent.getSource().getParent().getParent().getParent().mAggregations.columns
											// Columns.splice(Columns.length - 1 , 1);
											let headers = [];
											let values = [];
											let prevdata = {};
											Columns.forEach(column => {
												headers.push(column.mAggregations.header.mProperties.text);
											});
											headers.splice(headers.length - 1, 1)
											oCells.forEach((cell,index) => {
														if (index < oCells.length - 1){
															values.push(cell.getText());
														} 
											})

											headers.forEach((header,index) => {                           
												prevdata[`${header}`] = values[index];
											})
											// Open the edit dialog and populate it with data
											
			  
											var aInputFields = [];
				
											this.editDialog = new sap.m.Dialog({
											  title: "Edit Question",
											  contentWidth: "400px",
											  contentHeight: "500px",
											  resizable: true,
											  draggable: true,
											  beginButton: new sap.m.Button({
												text: "Save",
												type: "Success",
												icon: "sap-icon://save",
												press: function (oEvent) {
												  debugger
												  
												  var oController = this;
												  var postData = {}; // Create an object to hold the updated post data
												  
												  let currentdata = {};
												  // Update the data in the actual table row based on the input values
												  oCells.forEach(function (oCell, index) {
													if (index !== oCells.length - 1) {
													  // Skip the last column (Actions column)
													  var oInput = aInputFields[index];
													  var sInputValue = oInput.getValue();
													  oCell.setText(sInputValue);
									
													  // Populate the updated postData object
													  var cellPlaceholder = oInput.getPlaceholder();
													  currentdata[headers[index]] = sInputValue;
													}
												  });
												  postData.prevdata = prevdata;
												  postData.currentdata = currentdata;

												  var patchUrl =
                            						"https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/postQuestion?event_id=" +
                                    					event_id;

														$.ajax({
															type: "PATCH",
															url: patchUrl,
															data: JSON.stringify(postData),
															contentType: "application/json",
															dataType: "json",
															success: function(data){
																location.reload();
															}
														});
									
												  // Close the dialog after saving
												  this.editDialog.close();
									
												  // Make the POST call to update the data on the server
												  // var postUrl3 =
												  //   "https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/updateQuestion?";
									
												  // sap.ui.require(["sap/ui/core/Fragment"], function (Fragment) {
												  //   debugger;
												  //   var busyDialog = new sap.m.BusyDialog();
												  //   busyDialog.open();
									
												  //   jQuery.ajax({
												  //     type: "POST",
												  //     url: postUrl3,
												  //     data: JSON.stringify(postData),
												  //     contentType: "application/json",
												  //     dataType: "json",
												  //     success: function (data) {
												  //       // Handle success
												  //       busyDialog.close();
												  //       MessageToast.show("Question Updated");
												  //     },
												  //     error: function (error) {
												  //       // Handle error
												  //       busyDialog.close();
												  //       MessageToast.show("Question Updated");
												  //       console.error("Error:", error);
												  //     },
												  //   });
												  // });
												}.bind(this),
											  }),
											  // ... (rest of the dialog properties)
											});
									
											var oDialogContent1 = new sap.m.VBox();
									
											oCells.forEach(function (oCell, index) {
											  if (index !== oCells.length - 1) {
												// Skip the last column (Actions column)
												var oInput = new sap.m.Input({
												  width: "100%",
												  placeholder: oCell.getText(), // Set the placeholder as the current cell value
												});
												oDialogContent1.addItem(oInput);
												aInputFields.push(oInput); // Store the input field in the array
											  }
											});
									
											this.editDialog.addContent(oDialogContent1);
											// this.getView().addDependent(this.editDialog);
									
											// Set the values for the input fields from the current row
											oCells.forEach(function (oCell, index) {
											  if (index !== oCells.length - 1) {
												// Skip the last column (Actions column)
												aInputFields[index].setValue(oCell.getText());
											  }
											});
									
											this.editDialog.open();
			  
			  
										  }, this],
										})
									);

									oButtonsColumn.addItem(new sap.m.ToolbarSpacer({ width: "10px" }));

									oButtonsColumn.addItem(
										new sap.m.Button({
										  icon: "sap-icon://delete",
										  type: "Negative",
										  press: [function(oEvent){
											debugger
											var delUrl =
													  "https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/postQuestion?event_id=" +
														event_id;
											let Columns = oEvent.getSource().getParent().getParent().getParent().mAggregations.columns;
											var oButton = oEvent.getSource();
											var oRow = oButton.getParent().getParent(); // Get the parent row of the button
											let cells = oRow.getCells();
											Columns.splice(Columns.length - 1 , 1);
											cells.splice(cells.length - 1 , 1);
											
											let headers = [];
											let values = [];
											
											Columns.forEach(column => {
											  headers.push(column.mAggregations.header.mProperties.text);
											});
											cells.forEach(cell => {
											  values.push(cell.getText());
											})
			  
											let delData = {};
											headers.forEach((header,index) => {
											 
											delData[`${header}`] = values[index];
											})
			  
											let that = this;
											let destination = location;
											$.ajax({
											  type: "DELETE",
											  url: delUrl,
											  data: JSON.stringify(delData),
											  contentType: "application/json",
											  dataType: "json",
											  success: function(data) { debugger
												// let oTable2D = that.byId('fe::table::questionaire::LineItem::Questions::Table');
												// let oTable2 = oTable2D.getContent().mAggregations._content;
												// oTable2.removeItem(oRow);
												// MessageToast.show("Row Deleted");
												destination.reload();

											  }
											});
											
											
			  
			  
										  }, this],
										})
									  );
									
									oCells.push(oButtonsColumn);
								}
								
								oRow = new ColumnListItem({
									cells: oCells
								  });
								oTable.addItem(oRow);
								oCells = [];
								}
							}

							// Details row insert
							
							if(det != undefined){
								for(let i = 0; i < det.length; i++){
									for(let j = 0; j < detailsColumns.length; j++){
										oCell = new sap.m.Text({
											text: det[i][detailsColumns[j]]
										});
									oCells.push(oCell);
									delete det[i][detailsColumns[j]]
									}
								let DIcheck = det[i]?.id;
								if (DIcheck != undefined){
									delete det[i].id
								}
								tempvals = Object.values(det[i]);
								tempvals.forEach(val => {
									oCell = new sap.m.Text({
										text: val
									});

									
								oCells.push(oCell);
								})

								if (DIcheck != undefined){
									var oButtonsColumn = new sap.m.HBox();
									oButtonsColumn.addItem(
										new sap.m.Button({
										  icon: "sap-icon://edit",
										  type: "Emphasized",
										  press: [function(oEvent){
											debugger
											var oRow = oEvent.getSource().getParent().getParent();
											var oCells = oRow.getCells();
											let Columns = oEvent.getSource().getParent().getParent().getParent().mAggregations.columns
											// Columns.splice(Columns.length - 1 , 1);
											let headers = [];
											let values = [];
											let prevdata = {};
											Columns.forEach(column => {
												headers.push(column.mAggregations.header.mProperties.text);
											});
											headers.splice(headers.length - 1, 1)
											oCells.forEach((cell,index) => {
														if (index < oCells.length - 1){
															values.push(cell.getText());
														} 
											})

											headers.forEach((header,index) => {                           
												prevdata[`${header}`] = values[index];
											})
											// Open the edit dialog and populate it with data
											
			  
											var aInputFields = [];
				
											this.editDialog = new sap.m.Dialog({
											  title: "Edit Question",
											  contentWidth: "400px",
											  contentHeight: "500px",
											  resizable: true,
											  draggable: true,
											  beginButton: new sap.m.Button({
												text: "Save",
												type: "Success",
												icon: "sap-icon://save",
												press: function (oEvent) {
												  debugger
												  
												  var oController = this;
												  var postData = {}; // Create an object to hold the updated post data
												  
												  let currentdata = {};
												  // Update the data in the actual table row based on the input values
												  oCells.forEach(function (oCell, index) {
													if (index !== oCells.length - 1) {
													  // Skip the last column (Actions column)
													  var oInput = aInputFields[index];
													  var sInputValue = oInput.getValue();
													  oCell.setText(sInputValue);
									
													  // Populate the updated postData object
													  var cellPlaceholder = oInput.getPlaceholder();
													  currentdata[headers[index]] = sInputValue;
													}
												  });
												  postData.prevdata = prevdata;
												  postData.currentdata = currentdata;

												  var patchUrl =
													"https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/GetSupplierBidsv1?event_id=" +
														event_id;

														$.ajax({
															type: "PATCH",
															url: patchUrl,
															data: JSON.stringify(postData),
															contentType: "application/json",
															dataType: "json",
															success: function(data){
																location.reload();
															}
														});
									
												  // Close the dialog after saving
												  this.editDialog.close();
									
												  // Make the POST call to update the data on the server
												  // var postUrl3 =
												  //   "https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/updateQuestion?";
									
												  // sap.ui.require(["sap/ui/core/Fragment"], function (Fragment) {
												  //   debugger;
												  //   var busyDialog = new sap.m.BusyDialog();
												  //   busyDialog.open();
									
												  //   jQuery.ajax({
												  //     type: "POST",
												  //     url: postUrl3,
												  //     data: JSON.stringify(postData),
												  //     contentType: "application/json",
												  //     dataType: "json",
												  //     success: function (data) {
												  //       // Handle success
												  //       busyDialog.close();
												  //       MessageToast.show("Question Updated");
												  //     },
												  //     error: function (error) {
												  //       // Handle error
												  //       busyDialog.close();
												  //       MessageToast.show("Question Updated");
												  //       console.error("Error:", error);
												  //     },
												  //   });
												  // });
												}.bind(this),
											  }),
											  // ... (rest of the dialog properties)
											});
									
											var oDialogContent1 = new sap.m.VBox();
									
											oCells.forEach(function (oCell, index) {
											  if (index !== oCells.length - 1) {
												// Skip the last column (Actions column)
												var oInput = new sap.m.Input({
												  width: "100%",
												  placeholder: oCell.getText(), // Set the placeholder as the current cell value
												});
												oDialogContent1.addItem(oInput);
												aInputFields.push(oInput); // Store the input field in the array
											  }
											});
									
											this.editDialog.addContent(oDialogContent1);
											// this.getView().addDependent(this.editDialog);
									
											// Set the values for the input fields from the current row
											oCells.forEach(function (oCell, index) {
											  if (index !== oCells.length - 1) {
												// Skip the last column (Actions column)
												aInputFields[index].setValue(oCell.getText());
											  }
											});
									
											this.editDialog.open();
			  
			  
										  }, this],
										})
									);

									oButtonsColumn.addItem(new sap.m.ToolbarSpacer({ width: "10px" }));

									oButtonsColumn.addItem(
										new sap.m.Button({
										  icon: "sap-icon://delete",
										  type: "Negative",
										  press: [function(oEvent){
											debugger
											var delUrl =
													  "https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/GetSupplierBidsv1?event_id=" +
														event_id;
											let Columns = oEvent.getSource().getParent().getParent().getParent().mAggregations.columns;
											var oButton = oEvent.getSource();
											var oRow = oButton.getParent().getParent(); // Get the parent row of the button
											let cells = oRow.getCells();
											Columns.splice(Columns.length - 1 , 1);
											cells.splice(cells.length - 1 , 1);
											
											let headers = [];
											let values = [];
											
											Columns.forEach(column => {
											  headers.push(column.mAggregations.header.mProperties.text);
											});
											cells.forEach(cell => {
											  values.push(cell.getText());
											})
			  
											let delData = {};
											headers.forEach((header,index) => {
											 
											delData[`${header}`] = values[index];
											})
			  
											let that = this;
											let destination = location;
											$.ajax({
											  type: "DELETE",
											  url: delUrl,
											  data: JSON.stringify(delData),
											  contentType: "application/json",
											  dataType: "json",
											  success: function(data) { debugger
												// let oTable2D = that.byId('fe::table::questionaire::LineItem::Questions::Table');
												// let oTable2 = oTable2D.getContent().mAggregations._content;
												// oTable2.removeItem(oRow);
												// MessageToast.show("Row Deleted");
												destination.reload();

											  }
											});
											
											
			  
			  
										  }, this],
										})
									  );
									
									oCells.push(oButtonsColumn);
								}

								oRow = new ColumnListItem({
									cells: oCells
								  });
								oTableD.addItem(oRow);
								oCells = [];
								}
							}
							
							sap.ui.core.BusyIndicator.hide();
						},
						error: function(err) {
							sap.ui.core.BusyIndicator.hide();
						}
					})
					
				} 
			}
		}
	});
});
