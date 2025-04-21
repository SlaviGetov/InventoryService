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

        return Controller.extend("inventory.controller.AddOrder", {
            onInit: function () {
                this.getView().setModel(new JSONModel({}));
            },

            onAddProductPress: function () {
                const oOrder = this.getModelData();
                this.postProduct(
                    JSON.stringify({
                        productId: oOrder.productId,
                        isAutomated: oOrder.isAutomated,
                        warehouseName: oOrder.warehouseName,
                        wareHouseLocation: oOrder.wareHouseLocation,
                    })
                );
            },

            dateToTimestamp: function (sDate) {
                if (!sDate) return;

                const parts = sDate.split("-");
                return new Date(
                    parseInt(parts[0], 10),
                    parseInt(parts[1], 10),
                    parseInt(parts[2], 10)
                ).getTime();
            },

            getModelData: function () {
                return this.getView().getModel().getData();
            },

            postProduct: function (oOrder) {
                const that = this;
                Http.sendAjaxRequestWith(
                    Constants.ORDERS_URL,
                    "POST",
                    oOrder,
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
