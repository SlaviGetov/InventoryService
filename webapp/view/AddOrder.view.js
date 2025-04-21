jQuery.sap.require("inventory.utils.Constants");

const ADD_PAGE_NAME_TXT = "Add a new order";
const ADD_BUTTON_TXT = "Add order";
const ADD_CANCEL_BUTTON_TXT = "Cancel";
const ADD_INPUT_WIDTH = "33rem";
const ADD_PLACEHOLDER_QUANTITY = "Number";

sap.ui.jsview("inventory.view.AddOrder", {
    getControllerName: function () {
        return "inventory.controller.AddOrder";
    },

    createContent: function (oController) {
        return this.createPage(
            this.createForm(
                this.createInput("{/productId}", ADD_INPUT_WIDTH, true),
                this.createInput("{/warehouseName}", ADD_INPUT_WIDTH, true),
                this.createInput("{/wareHouseLocation}", ADD_INPUT_WIDTH, true),
                this.createSwitch("{/isAutomated}")
            ),
            this.createButton(oController, ADD_BUTTON_TXT, oController.onAddProductPress, sap.m.ButtonType.Emphasized),
            this.createButton(oController, ADD_CANCEL_BUTTON_TXT, oController.navigateToHome, sap.m.ButtonType.Up)
        );
    },

    createPage: function (oForm, oAddButton, oCancelButton) {
        return new sap.m.Page({
            title: ADD_PAGE_NAME_TXT,
            titleAlignment: sap.m.TitleAlignment.Center,
            content: [
                new sap.m.FlexBox({
                    alignItems: "Center",
                    justifyContent: "Start",
                    height: "100%",
                    width: "100%",
                    direction: "Column",
                    items: [oForm, oAddButton, oCancelButton],
                }),
            ],
        });
    },

    createForm: function (
        oInputProductId,
        oInputWarehouseName,
        oInputWarehouseLocation,
        oInputIsAutomated
    ) {
        return new sap.ui.layout.form.SimpleForm({
            content: [
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_PRODUCT_ID }),
                oInputProductId,
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_WAREHOUSE_NAME }),
                oInputWarehouseName,
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_WAREHOUSE_LOCATION }),
                oInputWarehouseLocation,
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_AUTOMATED_STATE }),
                oInputIsAutomated,
            ],
        });
    },

    createInput: function (oValue, sWidth, bRequired, oPlaceholder, oType) {
        return new sap.m.Input({
            value: oValue,
            width: sWidth,
            required: bRequired,
            placeholder: oPlaceholder,
            type: oType,
        });
    },

    createDatePicker: function (sValue, sWidth, sFormat, bRequired) {
        return new sap.m.DatePicker({
            value: sValue,
            width: sWidth,
            required: bRequired,
            displayFormat: sFormat,
            valueFormat: sFormat
        });
    },

    createSwitch: function (sValue) {
        return new sap.m.Switch({
            state: sValue,
            customTextOn: inventory.utils.Constants.CHECKMARK_EMOJI,
            customTextOff: inventory.utils.Constants.CROSS_EMOJI,
        });
    },

    createButton: function (oController, sText, fOnPress, oType) {
        return new sap.m.Button({
            width: "10rem",
            text: sText,
            press: [fOnPress, oController],
            type: oType,
        });
    },
});
