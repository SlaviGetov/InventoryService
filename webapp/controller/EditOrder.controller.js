sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/UIComponent",
        "inventory/utils/Constants",
        "inventory/utils/Http",
        "inventory/utils/Dialogs",
    ],
    function (Controller, JSONModel, UIComponent, Constants, Http, Dialogs) {
        "use strict";

        return Controller.extend("inventory.controller.EditOrder", {
            onInit: function () {
                const oRouter = UIComponent.getRouterFor(this);
                oRouter.getRoute("editOrder").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                const sOrderId = oEvent.getParameter("arguments").orderId;
                const oView = this.getView();

                Http.sendAjaxRequestWith(
                    `${Constants.ORDERS_URL}/${sOrderId}`,
                    "GET",
                    null,
                    function (data) {
                        oView.setModel(new JSONModel(data));
                    },
                    function (error) {
                        Dialogs.createErrorDialog(error);
                    }
                );
            },

            onSaveChangesPress: function () {
                this.putProduct(this.getView().getModel().getData());
            },

            putProduct: function (oOrder) {
                const that = this;
                Http.sendAjaxRequestWith(
                    `${Constants.ORDERS_URL}/${oOrder.id}`,
                    "PUT",
                    JSON.stringify(oOrder),
                    function () {
                        that.navigateToHome();
                    },
                    function (error) {
                        Dialogs.createErrorDialog(error.error);
                    }
                );
            },

            navigateToHome: function () {
                this.getView().getModel().setData({});
                UIComponent.getRouterFor(this).navTo("orderList");
            },
        });
    }
);
