sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/UIComponent",
        "inventory/utils/Constants",
        "inventory/utils/Http",
        "inventory/utils/Dialogs",
        "sap/m/MessageToast",
    ],
    function (Controller, JSONModel, UIComponent, Constants, Http, Dialogs, MessageToast) {
        "use strict";

        return Controller.extend("inventory.controller.OrderList", {
            onInit: function () {},

            gotoProducts: function() {
                UIComponent.getRouterFor(this).navTo("home");
            },

            gotoOrders: function() {
                UIComponent.getRouterFor(this).navTo("orderList");
            },

            onAddOrderPress: function () {
                UIComponent.getRouterFor(this).navTo("addOrder");
            },

            onEditOrderPress: function (oEvent) {
                UIComponent.getRouterFor(this).navTo("editOrder", {
                    orderId: oEvent.getSource().getBindingContext("orderModel").getProperty("id"),
                });
            },

            onLoadOrders: function () {
                Http.sendAjaxRequestWith(
                    Constants.ORDERS_URL,
                    "GET",
                    null,
                    function (data) {
                        this.getView().setModel(new JSONModel(this.getSortedModel(data)), "orderModel");
                    }.bind(this),
                    function (error) {
                        Dialogs.createErrorDialog(error.error);
                    }
                );
            },

            getSortedModel: function (oModelData) {
                oModelData
                    .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
                    .forEach(function (order) {
                        order.isAutomated = order.isAutomated ? Constants.CHECKMARK_EMOJI : Constants.CROSS_EMOJI;
                    });
                return oModelData;
            },

            onShowOrderDetailsPress: function (oEvent) {
                const oSelectedItem = oEvent.getSource().getBindingContext("orderModel").getObject();
                Dialogs.createOrderDetailsDialog(oSelectedItem);
            },

            onDeleteOrderPress: function (oEvent) {
                const that = this;
                const oView = this.getView();
                const sOrderId = oEvent.getSource().getBindingContext("orderModel").getProperty("id");
                Dialogs.createConfirmationDialog(Constants.DELETE_CONFIRMATION_MSG, function () {
                    Http.sendAjaxRequestWith(
                        `${Constants.ORDERS_URL}/${sOrderId}`,
                        "DELETE",
                        null,
                        function () {
                            that.onSuccessfulDelete(oView, sOrderId);
                        },
                        function (error) {
                            Dialogs.createErrorDialog(error.error);
                        }
                    );
                });
            },

            onSuccessfulDelete: function (oView, sOrderId) {
                this.refreshOrdersModel(oView, sOrderId);
                this.showSuccessToast(Constants.ORDER_DELETED_SUCCESS_MSG);
            },

            refreshOrdersModel: function (oView, sOrderId) {
                const oOrderModel = oView.getModel("orderModel");
                oOrderModel.setData(
                    oOrderModel.getData().filter(function (order) {
                        return order.id !== sOrderId;
                    })
                );
                sap.ui.getCore().byId("table").getBinding("items").refresh();
            },

            showSuccessToast: function (message) {
                MessageToast.show(message);
            },
        });
    }
);
