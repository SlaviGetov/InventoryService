jQuery.sap.require("inventory.utils.Constants");

const IS_AUTOMATED_COLUMN_TXT = "Automated";
const PRODUCT_ID_COLUMN_TXT = "Product ID";
const WAREHOUSE_NAME_COLUMN_TXT = "Warehouse Name";
const WAREHOUSE_LOCATION_COLUMN_TXT = "Warehouse Location";

sap.ui.jsview("inventory.view.OrderList", {
    getControllerName: function () {
        return "inventory.controller.OrderList";
    },

    createContent: function (oController) {
        oController.onLoadOrders();
        return this.createPage(this.createToolbar(oController), this.createProductsTable(oController));
    },

    createPage: function (oToolbar, oTable) {
        return new sap.m.Page({
            title: inventory.utils.Constants.APP_TITLE,
            titleAlignment: sap.m.TitleAlignment.Center,
            content: [
                new sap.m.FlexBox({
                    alignItems: "Center",
                    justifyContent: "Start",
                    height: "100%",
                    width: "100%",
                    direction: "Column",
                    items: [oToolbar, oTable],
                }),
            ],
        });
    },

    createToolbar: function (oController) {
        return new sap.m.Toolbar({
            content: [
                new sap.m.ToolbarSpacer({}),
                this.createButton(
                    oController,
                    "Products",
                    oController.gotoProducts,
                    "sap-icon://product",
                    "30rem",
                    sap.m.ButtonType.Emphasized
                ),
                this.createButton(
                    oController,
                    "Orders",
                    oController.gotoOrders,
                    "sap-icon://shipping-status",
                    "30rem",
                    sap.m.ButtonType.Emphasized
                ),
            ],
        });
    },

    createProductsTable: function (oController) {
        return new sap.m.Table({
            id: "order-table",
            growing: true,
            growingScrollToLoad: true,
            growingThreshold: 20,
            items: {
                path: "orderModel>/",
                template: new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({ text: "{orderModel>isAutomated}" }),
                        new sap.m.Text({ text: "{orderModel>productId}" }),
                        new sap.m.Text({ text: "{orderModel>warehouseName}" }),
                        new sap.m.Text({ text: "{orderModel>wareHouseLocation}" }),
                        new sap.m.FlexBox({
                            items: [
                                this.createButton(
                                    oController,
                                    undefined,
                                    oController.onShowOrderDetailsPress,
                                    "sap-icon://hint",
                                    "3rem"
                                ),
                                this.createGap("0.3rem"),
                                this.createButton(
                                    oController,
                                    undefined,
                                    oController.onEditOrderPress,
                                    "sap-icon://edit",
                                    "3rem"
                                ),
                                this.createGap("0.3rem"),
                                this.createButton(
                                    oController,
                                    undefined,
                                    oController.onDeleteOrderPress,
                                    "sap-icon://delete",
                                    "3rem",
                                    sap.m.ButtonType.Reject
                                ),
                            ],
                        }),
                    ],
                }),
            },
            columns: [
                new sap.m.Column({
                    header: new sap.m.Label({ text: IS_AUTOMATED_COLUMN_TXT }),
                    width: "3rem",
                }),
                new sap.m.Column({
                    header: new sap.m.Label({ text: PRODUCT_ID_COLUMN_TXT }),
                    width: "3rem",
                }),
                new sap.m.Column({
                    header: new sap.m.Label({ text: WAREHOUSE_NAME_COLUMN_TXT }),
                    width: "5rem",
                }),
                new sap.m.Column({
                    header: new sap.m.Label({ text: WAREHOUSE_LOCATION_COLUMN_TXT }),
                    width: "8rem",
                }),
                new sap.m.Column({
                    header: [
                        this.createButton(
                            oController,
                            "New order",
                            oController.onAddOrderPress,
                            "sap-icon://clinical-order",
                            "9.6rem"
                        ),
                    ],
                    width: "4rem",
                }),
            ],
        });
    },

    createButton: function (oController, sTitle, fOnPress, sIcon, sSize, oType) {
        return new sap.m.Button({
            icon: sIcon,
            text: sTitle,
            type: oType,
            width: sSize,
            press: [fOnPress, oController],
        });
    },

    createGap: function (sDimensions) {
        return new sap.ui.core.Icon({
            width: sDimensions,
            height: sDimensions,
        });
    },
});
