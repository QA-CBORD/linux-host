(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-recent-orders-recent-orders-module"],{

/***/ "./src/app/sections/ordering/pages/recent-orders/recent-orders.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/recent-orders/recent-orders.module.ts ***!
  \*******************************************************************************/
/*! exports provided: RecentOrdersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecentOrdersModule", function() { return RecentOrdersModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _recent_orders_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./recent-orders.routing.module */ "./src/app/sections/ordering/pages/recent-orders/recent-orders.routing.module.ts");
/* harmony import */ var _sections_ordering_shared_ui_components_recent_oders_list_recent_orders_list_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list.module */ "./src/app/sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list.module.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _sections_ordering_pages__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sections/ordering/pages */ "./src/app/sections/ordering/pages/index.ts");
/* harmony import */ var _sections_ordering_pages_recent_orders_components_recent_order_recent_order_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/ordering/pages/recent-orders/components/recent-order/recent-order.component */ "./src/app/sections/ordering/pages/recent-orders/components/recent-order/recent-order.component.ts");
/* harmony import */ var _sections_ordering_shared_ui_components_order_details_order_details_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sections/ordering/shared/ui-components/order-details/order-details.module */ "./src/app/sections/ordering/shared/ui-components/order-details/order-details.module.ts");
/* harmony import */ var _sections_ordering_shared_ui_components_order_options_action_sheet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sections/ordering/shared/ui-components/order-options.action-sheet */ "./src/app/sections/ordering/shared/ui-components/order-options.action-sheet/index.ts");
/* harmony import */ var _sections_ordering_shared_ui_components_confirm_popover_confirm_popover_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sections/ordering/shared/ui-components/confirm-popover/confirm-popover.module */ "./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.module.ts");
/* harmony import */ var _shared_ui_components_st_spinner_st_spinner_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @shared/ui-components/st-spinner/st-spinner.module */ "./src/app/shared/ui-components/st-spinner/st-spinner.module.ts");
/* harmony import */ var _shared_ui_components_st_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @shared/ui-components/st-button */ "./src/app/shared/ui-components/st-button/index.ts");














var imports = [
    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
    _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
    _recent_orders_routing_module__WEBPACK_IMPORTED_MODULE_4__["RecentOrdersRoutingModule"],
    _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_6__["StHeaderModule"],
    _sections_ordering_shared_ui_components_recent_oders_list_recent_orders_list_module__WEBPACK_IMPORTED_MODULE_5__["RecentOrdersListModule"],
    _sections_ordering_shared_ui_components_order_details_order_details_module__WEBPACK_IMPORTED_MODULE_9__["OrderDetailsModule"],
    _sections_ordering_shared_ui_components_order_options_action_sheet__WEBPACK_IMPORTED_MODULE_10__["OrderOptionsActionSheetModule"],
    _sections_ordering_shared_ui_components_confirm_popover_confirm_popover_module__WEBPACK_IMPORTED_MODULE_11__["ConfirmPopoverModule"],
    _sections_ordering_shared_ui_components_order_options_action_sheet__WEBPACK_IMPORTED_MODULE_10__["OrderOptionsActionSheetModule"],
    _shared_ui_components_st_button__WEBPACK_IMPORTED_MODULE_13__["StButtonModule"],
    _shared_ui_components_st_spinner_st_spinner_module__WEBPACK_IMPORTED_MODULE_12__["StSpinnerModule"]
];
var declarations = [_sections_ordering_pages__WEBPACK_IMPORTED_MODULE_7__["RecentOrdersComponent"], _sections_ordering_pages_recent_orders_components_recent_order_recent_order_component__WEBPACK_IMPORTED_MODULE_8__["RecentOrderComponent"]];
var RecentOrdersModule = /** @class */ (function () {
    function RecentOrdersModule() {
    }
    RecentOrdersModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: declarations,
            imports: imports,
        })
    ], RecentOrdersModule);
    return RecentOrdersModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/pages/recent-orders/recent-orders.routing.module.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/recent-orders/recent-orders.routing.module.ts ***!
  \***************************************************************************************/
/*! exports provided: RecentOrdersRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecentOrdersRoutingModule", function() { return RecentOrdersRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _sections_ordering_pages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/ordering/pages */ "./src/app/sections/ordering/pages/index.ts");
/* harmony import */ var _sections_ordering_resolvers_recent_orders_resolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/ordering/resolvers/recent-orders.resolver */ "./src/app/sections/ordering/resolvers/recent-orders.resolver.ts");






var routes = [
    {
        path: '',
        component: _sections_ordering_pages__WEBPACK_IMPORTED_MODULE_3__["RecentOrdersComponent"],
        resolve: { recentOrders: _sections_ordering_resolvers_recent_orders_resolver__WEBPACK_IMPORTED_MODULE_4__["RecentOrdersResolver"] }
    }, {
        path: ':id',
        component: _sections_ordering_pages__WEBPACK_IMPORTED_MODULE_3__["RecentOrderComponent"],
    },
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var RecentOrdersRoutingModule = /** @class */ (function () {
    function RecentOrdersRoutingModule() {
    }
    RecentOrdersRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({ imports: imports, exports: exports })
    ], RecentOrdersRoutingModule);
    return RecentOrdersRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/shared/pipes/order-items-summary/order-items-summary.module.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/pipes/order-items-summary/order-items-summary.module.ts ***!
  \**************************************************************************************************/
/*! exports provided: OrderItemsSummaryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderItemsSummaryModule", function() { return OrderItemsSummaryModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _order_items_summary_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./order-items-summary.pipe */ "./src/app/sections/ordering/shared/pipes/order-items-summary/order-items-summary.pipe.ts");




var declarations = [_order_items_summary_pipe__WEBPACK_IMPORTED_MODULE_3__["OrderItemsSummaryPipe"]];
var OrderItemsSummaryModule = /** @class */ (function () {
    function OrderItemsSummaryModule() {
    }
    OrderItemsSummaryModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
            exports: declarations,
        })
    ], OrderItemsSummaryModule);
    return OrderItemsSummaryModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list.module.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list.module.ts ***!
  \*******************************************************************************************************/
/*! exports provided: RecentOrdersListModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecentOrdersListModule", function() { return RecentOrdersListModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _recent_orders_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./recent-orders-list.component */ "./src/app/sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list.component.ts");
/* harmony import */ var _recent_orders_list_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./recent-orders-list-item */ "./src/app/sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/index.ts");
/* harmony import */ var _pipes_order_items_summary_order_items_summary_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pipes/order-items-summary/order-items-summary.module */ "./src/app/sections/ordering/shared/pipes/order-items-summary/order-items-summary.module.ts");







var declarations = [_recent_orders_list_component__WEBPACK_IMPORTED_MODULE_4__["RecentOrdersListComponent"], _recent_orders_list_item__WEBPACK_IMPORTED_MODULE_5__["RecentOrdersListItemComponent"]];
var RecentOrdersListModule = /** @class */ (function () {
    function RecentOrdersListModule() {
    }
    RecentOrdersListModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            exports: [_recent_orders_list_component__WEBPACK_IMPORTED_MODULE_4__["RecentOrdersListComponent"]],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _pipes_order_items_summary_order_items_summary_module__WEBPACK_IMPORTED_MODULE_6__["OrderItemsSummaryModule"],],
        })
    ], RecentOrdersListModule);
    return RecentOrdersListModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-recent-orders-recent-orders-module.js.map