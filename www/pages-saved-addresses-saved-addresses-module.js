(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-saved-addresses-saved-addresses-module"],{

/***/ "./src/app/sections/ordering/pages/saved-addresses/saved-addresses.module.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/saved-addresses/saved-addresses.module.ts ***!
  \***********************************************************************************/
/*! exports provided: SavedAddressesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SavedAddressesModule", function() { return SavedAddressesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _saved_addresses_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./saved-addresses.component */ "./src/app/sections/ordering/pages/saved-addresses/saved-addresses.component.ts");
/* harmony import */ var _saved_addresses_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./saved-addresses.routing.module */ "./src/app/sections/ordering/pages/saved-addresses/saved-addresses.routing.module.ts");
/* harmony import */ var _sections_ordering_shared_ui_components_order_address_list_order_address_list_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/ordering/shared/ui-components/order-address-list/order-address-list.module */ "./src/app/sections/ordering/shared/ui-components/order-address-list/order-address-list.module.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _sections_ordering_shared_ui_components_add_edit_addresses__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/ordering/shared/ui-components/add-edit-addresses */ "./src/app/sections/ordering/shared/ui-components/add-edit-addresses/index.ts");
/* harmony import */ var _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @shared/ui-components/st-button/st-button.module */ "./src/app/shared/ui-components/st-button/st-button.module.ts");










var imports = [
    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
    _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
    _saved_addresses_routing_module__WEBPACK_IMPORTED_MODULE_5__["SavedAddressesRoutingModule"],
    _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_7__["StHeaderModule"],
    _sections_ordering_shared_ui_components_order_address_list_order_address_list_module__WEBPACK_IMPORTED_MODULE_6__["OrderAddressListModule"],
    _sections_ordering_shared_ui_components_add_edit_addresses__WEBPACK_IMPORTED_MODULE_8__["AddEditAddressesModule"],
    _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_9__["StButtonModule"]
];
var declarations = [_saved_addresses_component__WEBPACK_IMPORTED_MODULE_4__["SavedAddressesComponent"]];
var providers = [];
var entryComponents = [];
var SavedAddressesModule = /** @class */ (function () {
    function SavedAddressesModule() {
    }
    SavedAddressesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: declarations,
            imports: imports,
            providers: providers,
            entryComponents: entryComponents,
        })
    ], SavedAddressesModule);
    return SavedAddressesModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/pages/saved-addresses/saved-addresses.routing.module.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/saved-addresses/saved-addresses.routing.module.ts ***!
  \*******************************************************************************************/
/*! exports provided: SavedAddressesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SavedAddressesRoutingModule", function() { return SavedAddressesRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _saved_addresses_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./saved-addresses.component */ "./src/app/sections/ordering/pages/saved-addresses/saved-addresses.component.ts");




var routes = [
    {
        path: '',
        component: _saved_addresses_component__WEBPACK_IMPORTED_MODULE_3__["SavedAddressesComponent"],
    },
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var SavedAddressesRoutingModule = /** @class */ (function () {
    function SavedAddressesRoutingModule() {
    }
    SavedAddressesRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({ imports: imports, exports: exports })
    ], SavedAddressesRoutingModule);
    return SavedAddressesRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/add-edit-addresses/index.ts":
/*!************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/add-edit-addresses/index.ts ***!
  \************************************************************************************/
/*! exports provided: AddEditAddressesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add_edit_addresses_modal_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-edit-addresses.modal.module */ "./src/app/sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.modal.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AddEditAddressesModule", function() { return _add_edit_addresses_modal_module__WEBPACK_IMPORTED_MODULE_0__["AddEditAddressesModule"]; });




/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/order-address-list/order-address-list.module.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/order-address-list/order-address-list.module.ts ***!
  \********************************************************************************************************/
/*! exports provided: OrderAddressListModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderAddressListModule", function() { return OrderAddressListModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _shared_pipes_merchant_distance_merchant_distance_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../shared/pipes/merchant-distance/merchant-distance.module */ "./src/app/shared/pipes/merchant-distance/merchant-distance.module.ts");
/* harmony import */ var _order_address_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./order-address-list.component */ "./src/app/sections/ordering/shared/ui-components/order-address-list/order-address-list.component.ts");
/* harmony import */ var _order_address_item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./order-address-item */ "./src/app/sections/ordering/shared/ui-components/order-address-list/order-address-item/index.ts");
/* harmony import */ var _shared_pipes_address_header_format_pipe_address_header_format_pipe_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/pipes/address-header-format-pipe/address-header-format-pipe.module */ "./src/app/shared/pipes/address-header-format-pipe/address-header-format-pipe.module.ts");
/* harmony import */ var _shared_pipes_address_subheader_format_pipe_address_subheader_format_pipe_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shared/pipes/address-subheader-format-pipe/address-subheader-format-pipe.module */ "./src/app/shared/pipes/address-subheader-format-pipe/address-subheader-format-pipe.module.ts");









var declarations = [_order_address_list_component__WEBPACK_IMPORTED_MODULE_5__["OrderAddressListComponent"], _order_address_item__WEBPACK_IMPORTED_MODULE_6__["OrderAddressItemComponent"]];
var OrderAddressListModule = /** @class */ (function () {
    function OrderAddressListModule() {
    }
    OrderAddressListModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            exports: [_order_address_list_component__WEBPACK_IMPORTED_MODULE_5__["OrderAddressListComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _shared_pipes_merchant_distance_merchant_distance_module__WEBPACK_IMPORTED_MODULE_4__["MerchantDistanceModule"], _shared_pipes_address_header_format_pipe_address_header_format_pipe_module__WEBPACK_IMPORTED_MODULE_7__["AddressHeaderFormatPipeModule"], _shared_pipes_address_subheader_format_pipe_address_subheader_format_pipe_module__WEBPACK_IMPORTED_MODULE_8__["AddressSubHeaderFormatPipeModule"]],
        })
    ], OrderAddressListModule);
    return OrderAddressListModule;
}());



/***/ }),

/***/ "./src/app/shared/pipes/address-header-format-pipe/address-header-format-pipe.module.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/pipes/address-header-format-pipe/address-header-format-pipe.module.ts ***!
  \**********************************************************************************************/
/*! exports provided: AddressHeaderFormatPipeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressHeaderFormatPipeModule", function() { return AddressHeaderFormatPipeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _address_header_format_pipe_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./address-header-format-pipe.pipe */ "./src/app/shared/pipes/address-header-format-pipe/address-header-format-pipe.pipe.ts");



var AddressHeaderFormatPipeModule = /** @class */ (function () {
    function AddressHeaderFormatPipeModule() {
    }
    AddressHeaderFormatPipeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [],
            declarations: [_address_header_format_pipe_pipe__WEBPACK_IMPORTED_MODULE_2__["AddressHeaderFormatPipe"]],
            exports: [_address_header_format_pipe_pipe__WEBPACK_IMPORTED_MODULE_2__["AddressHeaderFormatPipe"]]
        })
    ], AddressHeaderFormatPipeModule);
    return AddressHeaderFormatPipeModule;
}());



/***/ }),

/***/ "./src/app/shared/pipes/address-subheader-format-pipe/address-subheader-format-pipe.module.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/shared/pipes/address-subheader-format-pipe/address-subheader-format-pipe.module.ts ***!
  \****************************************************************************************************/
/*! exports provided: AddressSubHeaderFormatPipeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressSubHeaderFormatPipeModule", function() { return AddressSubHeaderFormatPipeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _address_subheader_format_pipe_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./address-subheader-format-pipe.pipe */ "./src/app/shared/pipes/address-subheader-format-pipe/address-subheader-format-pipe.pipe.ts");



var AddressSubHeaderFormatPipeModule = /** @class */ (function () {
    function AddressSubHeaderFormatPipeModule() {
    }
    AddressSubHeaderFormatPipeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [],
            declarations: [_address_subheader_format_pipe_pipe__WEBPACK_IMPORTED_MODULE_2__["AddressSubHeaderFormatPipe"]],
            exports: [_address_subheader_format_pipe_pipe__WEBPACK_IMPORTED_MODULE_2__["AddressSubHeaderFormatPipe"]]
        })
    ], AddressSubHeaderFormatPipeModule);
    return AddressSubHeaderFormatPipeModule;
}());



/***/ }),

/***/ "./src/app/shared/pipes/address-subheader-format-pipe/address-subheader-format-pipe.pipe.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/shared/pipes/address-subheader-format-pipe/address-subheader-format-pipe.pipe.ts ***!
  \**************************************************************************************************/
/*! exports provided: AddressSubHeaderFormatPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressSubHeaderFormatPipe", function() { return AddressSubHeaderFormatPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_utils_address_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/utils/address-helper */ "./src/app/core/utils/address-helper.ts");



var AddressSubHeaderFormatPipe = /** @class */ (function () {
    function AddressSubHeaderFormatPipe() {
    }
    AddressSubHeaderFormatPipe.prototype.transform = function (address) {
        return address ? Object(_core_utils_address_helper__WEBPACK_IMPORTED_MODULE_2__["getAddressSubHeader"])(address) : 'Address misconfigured =(';
    };
    AddressSubHeaderFormatPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'addressSubHeaderFormat'
        })
    ], AddressSubHeaderFormatPipe);
    return AddressSubHeaderFormatPipe;
}());



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
//# sourceMappingURL=pages-saved-addresses-saved-addresses-module.js.map