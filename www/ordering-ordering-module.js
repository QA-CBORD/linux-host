(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ordering-ordering-module"],{

/***/ "./src/app/sections/ordering/ordering.module.ts":
/*!******************************************************!*\
  !*** ./src/app/sections/ordering/ordering.module.ts ***!
  \******************************************************/
/*! exports provided: OrderingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderingPageModule", function() { return OrderingPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ordering_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ordering.routing.module */ "./src/app/sections/ordering/ordering.routing.module.ts");
/* harmony import */ var _ordering_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ordering.page */ "./src/app/sections/ordering/ordering.page.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services */ "./src/app/sections/ordering/services/index.ts");
/* harmony import */ var _services_ordering_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/ordering.api.service */ "./src/app/sections/ordering/services/ordering.api.service.ts");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./resolvers */ "./src/app/sections/ordering/resolvers/index.ts");
/* harmony import */ var _components_merchant_list_merchant_list_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/merchant-list/merchant-list.module */ "./src/app/sections/ordering/components/merchant-list/merchant-list.module.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components */ "./src/app/sections/ordering/components/index.ts");
/* harmony import */ var _shared_ui_components_order_details_order_details_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shared/ui-components/order-details/order-details.module */ "./src/app/sections/ordering/shared/ui-components/order-details/order-details.module.ts");
/* harmony import */ var _sections_ordering_services_cart_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @sections/ordering/services/cart.service */ "./src/app/sections/ordering/services/cart.service.ts");
/* harmony import */ var _sections_ordering_resolvers_cart_resolver__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sections/ordering/resolvers/cart.resolver */ "./src/app/sections/ordering/resolvers/cart.resolver.ts");
/* harmony import */ var _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @sections/ordering/services/ordering.service */ "./src/app/sections/ordering/services/ordering.service.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
















var imports = [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _ordering_routing_module__WEBPACK_IMPORTED_MODULE_4__["OrderingRoutingModule"], _components_merchant_list_merchant_list_module__WEBPACK_IMPORTED_MODULE_9__["MerchantListModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"], _shared_ui_components_order_details_order_details_module__WEBPACK_IMPORTED_MODULE_11__["OrderDetailsModule"], _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_15__["StHeaderModule"]];
var declarations = [_ordering_page__WEBPACK_IMPORTED_MODULE_5__["OrderingPage"], _components__WEBPACK_IMPORTED_MODULE_10__["MenuOrderingComponent"]];
var providers = [_resolvers__WEBPACK_IMPORTED_MODULE_8__["OrderingResolver"], _services__WEBPACK_IMPORTED_MODULE_6__["MerchantService"], _services_ordering_api_service__WEBPACK_IMPORTED_MODULE_7__["OrderingApiService"], _sections_ordering_services_cart_service__WEBPACK_IMPORTED_MODULE_12__["CartService"], _sections_ordering_resolvers_cart_resolver__WEBPACK_IMPORTED_MODULE_13__["CartResolver"], _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_14__["OrderingService"]];
var OrderingPageModule = /** @class */ (function () {
    function OrderingPageModule() {
    }
    OrderingPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: imports,
            providers: providers,
        })
    ], OrderingPageModule);
    return OrderingPageModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/ordering.routing.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/sections/ordering/ordering.routing.module.ts ***!
  \**************************************************************/
/*! exports provided: OrderingRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderingRoutingModule", function() { return OrderingRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ordering_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ordering.page */ "./src/app/sections/ordering/ordering.page.ts");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolvers */ "./src/app/sections/ordering/resolvers/index.ts");
/* harmony import */ var _ordering_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ordering.config */ "./src/app/sections/ordering/ordering.config.ts");
/* harmony import */ var _sections_ordering_resolvers_recent_orders_resolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/ordering/resolvers/recent-orders.resolver */ "./src/app/sections/ordering/resolvers/recent-orders.resolver.ts");







var routes = [
    {
        path: '',
        component: _ordering_page__WEBPACK_IMPORTED_MODULE_3__["OrderingPage"],
        resolve: {
            data: _resolvers__WEBPACK_IMPORTED_MODULE_4__["OrderingResolver"],
        },
    },
    {
        path: _ordering_config__WEBPACK_IMPORTED_MODULE_5__["LOCAL_ROUTING"].recentOrders,
        loadChildren: './pages/recent-orders/recent-orders.module#RecentOrdersModule',
    },
    {
        path: _ordering_config__WEBPACK_IMPORTED_MODULE_5__["LOCAL_ROUTING"].savedAddresses,
        loadChildren: './pages/saved-addresses/saved-addresses.module#SavedAddressesModule',
    },
    {
        path: _ordering_config__WEBPACK_IMPORTED_MODULE_5__["LOCAL_ROUTING"].favoriteMerchants,
        loadChildren: './pages/favorite-merchants/favorite-merchants.module#FavoriteMerchantsModule',
    },
    {
        path: _ordering_config__WEBPACK_IMPORTED_MODULE_5__["LOCAL_ROUTING"].fullMenu,
        loadChildren: './pages/full-menu/full-menu.module#FullMenuModule',
    },
    {
        path: _ordering_config__WEBPACK_IMPORTED_MODULE_5__["LOCAL_ROUTING"].cart,
        loadChildren: './pages/cart/cart.module#CartModule',
    },
    {
        path: _ordering_config__WEBPACK_IMPORTED_MODULE_5__["LOCAL_ROUTING"].menuCategoryItems + "/:id",
        loadChildren: './pages/menu-category-items/menu-category-items.module#MenuCategoryItemsModule',
    },
    {
        path: "" + _ordering_config__WEBPACK_IMPORTED_MODULE_5__["LOCAL_ROUTING"].itemDetail,
        loadChildren: './pages/item-detail/item-detail.module#ItemDetailModule',
    },
    {
        path: _ordering_config__WEBPACK_IMPORTED_MODULE_5__["LOCAL_ROUTING"].addressEdit,
        loadChildren: './pages/address-edit/address-edit.module#AddressEditPageModule',
    },
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var OrderingRoutingModule = /** @class */ (function () {
    function OrderingRoutingModule() {
    }
    OrderingRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({ imports: imports, exports: exports, providers: [_sections_ordering_resolvers_recent_orders_resolver__WEBPACK_IMPORTED_MODULE_6__["RecentOrdersResolver"]] })
    ], OrderingRoutingModule);
    return OrderingRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/resolvers/index.ts":
/*!******************************************************!*\
  !*** ./src/app/sections/ordering/resolvers/index.ts ***!
  \******************************************************/
/*! exports provided: OrderingResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ordering_resolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ordering.resolver */ "./src/app/sections/ordering/resolvers/ordering.resolver.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrderingResolver", function() { return _ordering_resolver__WEBPACK_IMPORTED_MODULE_0__["OrderingResolver"]; });




/***/ }),

/***/ "./src/app/sections/ordering/resolvers/ordering.resolver.ts":
/*!******************************************************************!*\
  !*** ./src/app/sections/ordering/resolvers/ordering.resolver.ts ***!
  \******************************************************************/
/*! exports provided: OrderingResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderingResolver", function() { return OrderingResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services */ "./src/app/sections/ordering/services/index.ts");
/* harmony import */ var _core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/facades/content-strings/content-strings.facade.service */ "./src/app/core/facades/content-strings/content-strings.facade.service.ts");
/* harmony import */ var _content_strings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../content-strings */ "./src/app/content-strings.ts");
/* harmony import */ var _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/ordering/ordering.config */ "./src/app/sections/ordering/ordering.config.ts");









var OrderingResolver = /** @class */ (function () {
    function OrderingResolver(merchantService, loadingService, contentStringsFacadeService) {
        this.merchantService = merchantService;
        this.loadingService = loadingService;
        this.contentStringsFacadeService = contentStringsFacadeService;
    }
    OrderingResolver.prototype.resolve = function () {
        var _this = this;
        var orderingContentStrings = this.updateOrderValidationErrorObject();
        var favouriteMerchant = this.merchantService.getMerchantsWithFavoriteInfo();
        var statesStrings = this.contentStringsFacadeService.fetchContentStrings$(_content_strings__WEBPACK_IMPORTED_MODULE_7__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_7__["CONTENT_STINGS_CATEGORIES"].usStates);
        var weekDaysShortForm = this.contentStringsFacadeService.fetchContentStrings$(_content_strings__WEBPACK_IMPORTED_MODULE_7__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_7__["CONTENT_STINGS_CATEGORIES"].dayOfWeekAbbreviated);
        var dayMonthShortForm = this.contentStringsFacadeService.fetchContentStrings$(_content_strings__WEBPACK_IMPORTED_MODULE_7__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_7__["CONTENT_STINGS_CATEGORIES"].monthAbbreviated);
        this.loadingService.showSpinner();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(dayMonthShortForm, weekDaysShortForm, orderingContentStrings, statesStrings, favouriteMerchant).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { return _this.loadingService.closeSpinner(); }, function () { return _this.loadingService.closeSpinner(); }));
    };
    OrderingResolver.prototype.updateOrderValidationErrorObject = function () {
        var _this = this;
        var updatingConfigs = [
            { key: 9017, value: _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_8__["ORDERING_CONTENT_STRINGS"].errorMessageTimeSlotCapacityReached },
            { key: 6112, value: _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_8__["ORDERING_CONTENT_STRINGS"].errorMessageInsufficientFunds },
        ];
        return this.contentStringsFacadeService.fetchContentStrings$(_content_strings__WEBPACK_IMPORTED_MODULE_7__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_7__["CONTENT_STINGS_CATEGORIES"].ordering).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (strings) {
            return strings && _this.updateOrderValidationErrors(updatingConfigs, strings, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_8__["ORDER_VALIDATION_ERRORS"]);
        }));
    };
    OrderingResolver.prototype.updateOrderValidationErrors = function (instructions, configs, sourceObject) {
        var _loop_1 = function (i) {
            var config = configs.find(function (_a) {
                var name = _a.name;
                return name === instructions[i].value;
            });
            config && config.value && (sourceObject[instructions[i].key] = config.value);
        };
        for (var i = 0; i < instructions.length; i++) {
            _loop_1(i);
        }
    };
    OrderingResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services__WEBPACK_IMPORTED_MODULE_5__["MerchantService"],
            src_app_core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__["LoadingService"],
            _core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_6__["ContentStringsFacadeService"]])
    ], OrderingResolver);
    return OrderingResolver;
}());



/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/delivery-addresses.modal/index.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/delivery-addresses.modal/index.ts ***!
  \******************************************************************************************/
/*! exports provided: DeliveryAddressesModalModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _delivery_addresses_modal_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delivery-addresses.modal.module */ "./src/app/sections/ordering/shared/ui-components/delivery-addresses.modal/delivery-addresses.modal.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeliveryAddressesModalModule", function() { return _delivery_addresses_modal_module__WEBPACK_IMPORTED_MODULE_0__["DeliveryAddressesModalModule"]; });




/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/order-options.action-sheet/index.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/order-options.action-sheet/index.ts ***!
  \********************************************************************************************/
/*! exports provided: OrderOptionsActionSheetModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _order_options_action_sheet_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order-options.action-sheet.module */ "./src/app/sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrderOptionsActionSheetModule", function() { return _order_options_action_sheet_module__WEBPACK_IMPORTED_MODULE_0__["OrderOptionsActionSheetModule"]; });




/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.module.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.module.ts ***!
  \************************************************************************************************************************/
/*! exports provided: OrderOptionsActionSheetModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderOptionsActionSheetModule", function() { return OrderOptionsActionSheetModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _order_options_action_sheet_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./order-options.action-sheet.component */ "./src/app/sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component.ts");
/* harmony import */ var _st_date_time_picker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../st-date-time-picker */ "./src/app/sections/ordering/shared/ui-components/st-date-time-picker/index.ts");
/* harmony import */ var _delivery_addresses_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../delivery-addresses.modal */ "./src/app/sections/ordering/shared/ui-components/delivery-addresses.modal/index.ts");
/* harmony import */ var _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/ui-components/st-button/st-button.module */ "./src/app/shared/ui-components/st-button/st-button.module.ts");
/* harmony import */ var _shared_pipes_address_header_format_pipe_address_header_format_pipe_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shared/pipes/address-header-format-pipe/address-header-format-pipe.module */ "./src/app/shared/pipes/address-header-format-pipe/address-header-format-pipe.module.ts");









var declarations = [_order_options_action_sheet_component__WEBPACK_IMPORTED_MODULE_4__["OrderOptionsActionSheetComponent"]];
var OrderOptionsActionSheetModule = /** @class */ (function () {
    function OrderOptionsActionSheetModule() {
    }
    OrderOptionsActionSheetModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            exports: [_order_options_action_sheet_component__WEBPACK_IMPORTED_MODULE_4__["OrderOptionsActionSheetComponent"]],
            entryComponents: [_order_options_action_sheet_component__WEBPACK_IMPORTED_MODULE_4__["OrderOptionsActionSheetComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _delivery_addresses_modal__WEBPACK_IMPORTED_MODULE_6__["DeliveryAddressesModalModule"], _st_date_time_picker__WEBPACK_IMPORTED_MODULE_5__["StDateTimePickerModule"], _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_7__["StButtonModule"], _shared_pipes_address_header_format_pipe_address_header_format_pipe_module__WEBPACK_IMPORTED_MODULE_8__["AddressHeaderFormatPipeModule"]],
        })
    ], OrderOptionsActionSheetModule);
    return OrderOptionsActionSheetModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/st-date-time-picker/index.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/st-date-time-picker/index.ts ***!
  \*************************************************************************************/
/*! exports provided: StDateTimePickerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _st_date_time_picker_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./st-date-time-picker.module */ "./src/app/sections/ordering/shared/ui-components/st-date-time-picker/st-date-time-picker.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StDateTimePickerModule", function() { return _st_date_time_picker_module__WEBPACK_IMPORTED_MODULE_0__["StDateTimePickerModule"]; });




/***/ }),

/***/ "./src/app/shared/pipes/merchant-distance/merchant-distance.module.ts":
/*!****************************************************************************!*\
  !*** ./src/app/shared/pipes/merchant-distance/merchant-distance.module.ts ***!
  \****************************************************************************/
/*! exports provided: MerchantDistanceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MerchantDistanceModule", function() { return MerchantDistanceModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_pipes_merchant_distance_merchant_distance_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/pipes/merchant-distance/merchant-distance.pipe */ "./src/app/shared/pipes/merchant-distance/merchant-distance.pipe.ts");




var declarations = [_shared_pipes_merchant_distance_merchant_distance_pipe__WEBPACK_IMPORTED_MODULE_3__["MerchantDistancePipe"]];
var MerchantDistanceModule = /** @class */ (function () {
    function MerchantDistanceModule() {
    }
    MerchantDistanceModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: [
                declarations,
                _shared_pipes_merchant_distance_merchant_distance_pipe__WEBPACK_IMPORTED_MODULE_3__["MerchantDistancePipe"],
            ],
        })
    ], MerchantDistanceModule);
    return MerchantDistanceModule;
}());



/***/ }),

/***/ "./src/app/shared/pipes/merchant-distance/merchant-distance.pipe.ts":
/*!**************************************************************************!*\
  !*** ./src/app/shared/pipes/merchant-distance/merchant-distance.pipe.ts ***!
  \**************************************************************************/
/*! exports provided: MerchantDistancePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MerchantDistancePipe", function() { return MerchantDistancePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MerchantDistancePipe = /** @class */ (function () {
    function MerchantDistancePipe() {
    }
    MerchantDistancePipe.prototype.transform = function (value) {
        return !value ? '' : value.toFixed(2) + " mi";
    };
    MerchantDistancePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'merchantDistance',
            pure: false,
        })
    ], MerchantDistancePipe);
    return MerchantDistancePipe;
}());



/***/ })

}]);
//# sourceMappingURL=ordering-ordering-module.js.map