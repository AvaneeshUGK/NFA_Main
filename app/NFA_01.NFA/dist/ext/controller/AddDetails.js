sap.ui.define(["sap/m/MessageToast","sap/m/Column","sap/m/ColumnListItem"],function(e,t,n){"use strict";return{AddDetails:function(t){debugger;if(!this.event_id){this.event_id=t.sPath.replace(/[^0-9]/g,"");this.event_id="Doc"+this.event_id}this.dDialog=new sap.m.Dialog({title:"Add Details",contentWidth:"600px",contentHeight:"500px",resizable:true,draggable:true,beginButton:new sap.m.Button({text:"Add Details",type:"Emphasized",icon:"sap-icon://add",press:function(t){debugger;var n=this.dDialog.getContent()[0];var a=n.getItems();var i=[];var s={};let o=false;a.forEach(function(t){var n=t.getValue();if(n==""||n==null||n==undefined){e.show("Please fill in every entry");o=true}var a=t.getPlaceholder();s[a]=n;i.push(new sap.m.Text({text:n}))});if(o){return}var d=new sap.m.BusyDialog;d.open();let l=this.byId("fe::table::questionaire::LineItem::Details::Table");let r=l.getContent().mAggregations._content;r.destroyItems();r.destroyColumns();var u="https://nfa_app-grateful-duiker-kc.cfapps.us20.hana.ondemand.com/dev/GetSupplierBidsv1?event_id="+this.event_id;$.ajax({type:"POST",url:u,data:JSON.stringify(s),contentType:"application/json",dataType:"json",success:function(e){debugger},error:function(e){d.close()}});function g(){debugger;location.reload()}g();e.show("Details Added");this.dDialog.close()}.bind(this)}),endButton:new sap.m.Button({text:"Cancel",type:"Negative",press:function(){this.dDialog.close()}.bind(this)}),afterClose:function(){var e=this.dDialog.getContent()[0];var t=e.getItems();t.forEach(function(e){if(e instanceof sap.m.Input){e.setValue("")}})}.bind(this)});this.dDialog.addStyleClass("myCustomDialog");let n=this.byId("fe::table::questionaire::LineItem::Details::Table");let a=n.getContent().mAggregations._content;var i=a.getColumns();var s=new sap.m.VBox;for(var o=0;o<i.length;o++){debugger;var d=i[o].getHeader().getText();if(d!=""&&d!="Edit/Delete"){var l=new sap.m.Input({width:"80%",placeholder:d});l.setRequired(true);s.addItem(l)}}this.dDialog.addContent(s);this.dDialog.open()}}});
//# sourceMappingURL=AddDetails.js.map