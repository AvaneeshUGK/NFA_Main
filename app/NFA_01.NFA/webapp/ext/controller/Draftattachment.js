sap.ui.define(["sap/m/MessageBox", "sap/m/MessageToast", "sap/ui/core/UIComponent"],

    function (MessageBox, MessageToast, UIComponent) {
        "use strict";
        function _createUploadController(oExtensionAPI, Entity) {
            var oUploadDialog;
            let wsno;

            function setOkButtonEnabled(bOk) {
                oUploadDialog && oUploadDialog.getBeginButton().setEnabled(bOk);
            }

            function setDialogBusy(bBusy) {
                oUploadDialog.setBusy(bBusy)
            }

            function closeDialog() {
                oUploadDialog && oUploadDialog.close()
            }

            function showError(code, target, sMessage) {
                MessageBox.error("Upload failed", { title: "Error" })
            }

            function byId(sId) {
                return sap.ui.core.Fragment.byId("excelUploadDialog", sId);
            }

            return {
                onBeforeOpen: function (oEvent) {
                    oUploadDialog = oEvent.getSource();
                    oExtensionAPI.addDependent(oUploadDialog);
                },

                onAfterClose: function (oEvent) {
                    oExtensionAPI.removeDependent(oUploadDialog);
                    oUploadDialog.destroy();
                    oUploadDialog = undefined;
                },

                //                 onOk: function (oEvent) {
                //                     setDialogBusy(true)

                //                     var oFileUploader = byId("uploader");
                //                     var headPar = new sap.ui.unified.FileUploaderParameter();
                //                     headPar.setName('slug');
                //                     headPar.setValue(Entity);
                //                     oFileUploader.removeHeaderParameter('slug');
                //                     oFileUploader.addHeaderParameter(headPar);

                //                     var oFragment = sap.ui.xmlfragment("excelUploadDialog", "project1.ext.fragment.Pdffffffff");

                //                     // Get the FileUploader control by its ID
                //                     var oUploader = sap.ui.core.Fragment.byId("excelUploadDialog", "uploader");

                //                     var selectedFile = oUploader.getValue();
                // debugger;

                //                     var sUploadUri = oExtensionAPI._controller.extensionAPI._controller._oAppComponent.getManifestObject().resolveUri("/odata/v4/catalog/ExcelUpload/excel")
                //                     oFileUploader.setUploadUrl(sUploadUri);
                //                     oFileUploader
                //                         .checkFileReadable()
                //                         .then(function () {
                //                             oFileUploader.upload();
                //                         })
                //                         .catch(function (error) {
                //                             showError("The file cannot be read.");
                //                             setDialogBusy(false)
                //                         })
                //                 },
                _getBaseURL: function () {
                    debugger;
                    var oBaseUrl = this.getOwnerComponent().getManifestEntry("/sap.app/id").replaceAll(".", "/");
                    return jQuery.sap.getModulePath(oBaseUrl)
                },

                /**
                 * on File Change
                 */
                onFileChange: function (oEvent) {
                    var file = oEvent.getParameters("files").files[0];
                    this.file = file;
                },


                onOk: function (oEvent) {
                 debugger;
                    // let inputString = oEvent.oSource.oPropagatedProperties.oModels.pageInternal.mContexts["/pages/invoicecockpit01::NewList/controls/fe::table::tableView1::LineItem"].oModel.oData.currentCtxt.sPath;
                    let inputString1 =  oEvent.oSource.oPropagatedProperties.oModels.pageInternal.mContexts["/pages/NFA01.NFA::Source_EventsObjectPage/controls/fe::table::questionaire::LineItem::Questions"].oModel.oData.deepestPath;
                    const regex = /\/Source_Events\('([^']+)'\)/;
                    const match = inputString1.match(regex);
                    // const regex = /Source_Events\('(\d+)'\)/;
                    // const match = inputString.match(regex);
                    const invoice_no = match[1];
                     wsno = oEvent.oSource.oParent.oParent.byId('fe::ObjectPage-OPHeaderContent').getContent()[0].mAggregations.items[0].mAggregations.items[0].mAggregations.items[1].mAggregations.items[1].mProperties.text;
                    var oUploadSet = byId("__fileUploader");
                    //Upload imaged
                    var reader = new FileReader();
                    reader.onload = function (oEvent) {
                        // get an access to the content of the file
                        debugger;
                        var file = this.file;
                        this.content = oEvent.currentTarget.result;
                        this.createfile(invoice_no);
                    }.bind(this);
                    reader.readAsDataURL(this.file);

                },


                /**
                 *  Create Operation to create an entry in CAP
                 */
                createfile: function (invoice_no) {
                    debugger;
                    var that = this;
                    var invoice_no = invoice_no;

                    var file_ori = this.file;
                    var file_real = this.content;
                    var base64Content = file_real.split(',')[1];
                    var file_name = this.file.name;
                    var mime_type = this.file.type;
                    const binaryData = atob(base64Content);
                    // Create an ArrayBuffer from the binary data
                    const arrayBuffer = new ArrayBuffer(binaryData.length);
                    const uint8Array = new Uint8Array(arrayBuffer);
                    for (let i = 0; i < binaryData.length; i++) {
                        uint8Array[i] = binaryData.charCodeAt(i);
                    }
                    // Create a Blob from the ArrayBuffer
                    const blob = new Blob([arrayBuffer], { type: mime_type });

                    // Create a File from the Blob
                    const file2 = new File([blob], file_name, { type: mime_type });
                    // const file1 = base64ToFile(base64Data, file_name, mime_type);
                    debugger
                    var url = "https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/postDocument";
                    var formData = new FormData();
                    // formData.append("file", file_ori);
                    // formData.append("mime_type", mime_type);
                    // formData.append("file_name", file_name);
                    // formData.append("file_id", invoice_no);
                    var content = file_ori;
                    var mediatype = mime_type;
                    var filename = file_name;
                    var id = invoice_no;
                    debugger
                    var Data={
                        "base64Content":base64Content.toString(),
                        "filename":file_name,
                        "Srcevtname":wsno
                    }
                    console.log(base64Content);
                    debugger
                    // try{
                    // jQuery.ajax({
                    //     url: "https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/postDocument",
                    //     body: Data,
                    //     method: "POST",
                    //     success: function(data) {
                    //     // Handle success response
                    //     console.log("POST request successful", data);
                    //     },
                    //     error: function(error) {
                    //     // Handle error response
                    //     console.error("POST request failed", error);
                    //     }
                    // });
                    // }
                    // catch(err){
                    //   console.log(err);
                    // }
                    // 


                    fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(Data)
                    })
                        .then(function (data) {debugger
                            // var response = JSON.parse(data);

                            if (data.status === 200) {debugger
                                var sMsg = "File Uploaded Successfully";
                                MessageBox.success(sMsg);
                                closeDialog();
                                console.log("Success: " + response.body);

                            } else {debugger
                                var sMsg = "Failed to upload";
                                MessageBox.error("Failed to upload");
                                closeDialog();
                                console.log("Error: " + response.body);

                            }
                        })
                        .catch(function (error) {debugger
                            console.error(error);
                        })
                    // });
                        
                    debugger;
                    
                },
                onCancel: function (oEvent) {
                    closeDialog();
                },

                onTypeMismatch: function (oEvent) {
                    var sSupportedFileTypes = oEvent
                        .getSource()
                        .getFileType()
                        .map(function (sFileType) {
                            return "*." + sFileType;
                        })
                        .join(", ");

                    showError(
                        "The file type *." +
                        oEvent.getParameter("fileType") +
                        " is not supported. Choose one of the following types: " +
                        sSupportedFileTypes
                    );
                },

                onFileAllowed: function (oEvent) {
                    setOkButtonEnabled(true)
                },

                onFileEmpty: function (oEvent) {
                    setOkButtonEnabled(false)
                },

                onUploadComplete: function (oEvent) {
                    var iStatus = oEvent.getParameter("status");
                    var oFileUploader = oEvent.getSource()

                    oFileUploader.clear();
                    setOkButtonEnabled(false)
                    setDialogBusy(false)

                    if (iStatus >= 400) {
                        var oRawResponse;
                        try {
                            oRawResponse = JSON.parse(oEvent.getParameter("responseRaw"));
                        } catch (e) {
                            oRawResponse = oEvent.getParameter("responseRaw");
                        }
                        if (oRawResponse && oRawResponse.error && oRawResponse.error.message) {
                            showError(oRawResponse.error.code, oRawResponse.error.target, oRawResponse && oRawResponse.error && oRawResponse.error.message);
                        }
                    } else {
                        MessageToast.show("File uploaded successfully");
                        oExtensionAPI.refresh()
                        closeDialog();
                    }
                }
            };
        };


        return {
            upload: function (oBindingContext, aSelectedContexts) {debugger
                this.loadFragment({
                    
                    id: "excelUploadDialog",
                    name: "NFA01.NFA.ext.fragment.Draftattachment",
                    controller: _createUploadController(this, 'MediaFile')
                }).then(function (oDialog) {
                    oDialog.open();
                });
            }
        };
    });

