sap.ui.define(['sap/ui/core/mvc/ControllerExtension','sap/ui/core/library',"sap/m/MessageToast"], function (ControllerExtension,coreLibrary,MessageToast) {
	'use strict';

	return ControllerExtension.extend('NFA01.NFA.ext.controller.List_Controller', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf NFA01.NFA.ext.controller.List_Controller
             */
			onInit: function () { debugger
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				// this.base.getExtensionAPI().attachPageDataLoaded(this._onPageDataLoaded.bind(this));
				var var1 =  this.base

			},
			// routing: {
			// 	onAfterBinding: async function (oBindingContext) { debugger
			// 		const  oExtensionAPI = this.base.getExtensionAPI(),
            // 				oModel = oExtensionAPI.getModel(),
			// 				sFunctionName = "readSrcEvents",
			// 				oFunction = oModel.bindContext(`/${sFunctionName}(...)`);

			// 		oFunction.setParameter("event_id",'Doc36329602');
			// 		await oFunction.execute();
			// 		const oContext = oFunction.getBoundContext();
			// 		let bookings = oContext.getProperty("Createdby")
			// 	}
			// },
			onAfterRendering: function() { debugger
				var oModel = this.base.getExtensionAPI().getModel();
				let successvar
				$.ajax({
					url : oModel.sServiceUrl + "Source_Events",
					type: "READ",
					success: function(result){ debugger
						successvar = result;
					}
				});
		},
		onBeforeRendering: function() { debugger
				var oModel = this.base.getExtensionAPI().getModel();
		}
		}, 
		TestButton: function(oEvent) { debugger
			const oContext = oEvent
			const oModel = oContext.getModel()
			MessageToast.show("Custom handler invoked.");
		}//,
		// _onPageDataLoaded: function(oEvent) {
		// 	const oView = this.getView()
		// 	let datav
		// 	const oModel = oView.getModel()
		// 	oModel.read('/SourceEvents', {
		// 		success: function(data) {
		// 			debugger
		// 			datav = data
		// 		}
		// 	})
		// 	console.log(datav)
		// }
	});
});
