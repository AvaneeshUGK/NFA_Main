sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('NFA01.NFA.ext.controller.ListController', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf NFA01.NFA.ext.controller.ListController
             */
			onInit: function () { debugger
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			}, 
			onAfterRendering: function() { debugger
				var oModel = this.base.getExtensionAPI().getModel();

		},

		onBeforeRendering: function() { debugger
				var oModel = this.base.getExtensionAPI().getModel();
				var x = document.getElementById('Source_EventsList');
		},
		onloadstart
		}
	});
});
