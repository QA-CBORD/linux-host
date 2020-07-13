(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-favorite-merchants-favorite-merchants-module"],{

/***/ "./src/app/sections/ordering/pages/favorite-merchants/favorite-merchants.module.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/favorite-merchants/favorite-merchants.module.ts ***!
  \*****************************************************************************************/
/*! exports provided: FavoriteMerchantsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavoriteMerchantsModule", function() { return FavoriteMerchantsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _favorite_merchants_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./favorite-merchants.routing.module */ "./src/app/sections/ordering/pages/favorite-merchants/favorite-merchants.routing.module.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _resolvers_favorite_merchants_resolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resolvers/favorite-merchants.resolver */ "./src/app/sections/ordering/pages/favorite-merchants/resolvers/favorite-merchants.resolver.ts");
/* harmony import */ var _services_favorite_merchants_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/favorite-merchants.service */ "./src/app/sections/ordering/pages/favorite-merchants/services/favorite-merchants.service.ts");
/* harmony import */ var _sections_ordering_components_merchant_list_merchant_list_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/ordering/components/merchant-list/merchant-list.module */ "./src/app/sections/ordering/components/merchant-list/merchant-list.module.ts");
/* harmony import */ var _sections_ordering_pages__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sections/ordering/pages */ "./src/app/sections/ordering/pages/index.ts");
/* harmony import */ var _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @shared/ui-components/st-button/st-button.module */ "./src/app/shared/ui-components/st-button/st-button.module.ts");











var imports = [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"], _favorite_merchants_routing_module__WEBPACK_IMPORTED_MODULE_4__["FavoriteMerchantsRoutingModule"], _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_5__["StHeaderModule"], _sections_ordering_components_merchant_list_merchant_list_module__WEBPACK_IMPORTED_MODULE_8__["MerchantListModule"], _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_10__["StButtonModule"]];
var declarations = [_sections_ordering_pages__WEBPACK_IMPORTED_MODULE_9__["FavoriteMerchantsComponent"]];
var providers = [_resolvers_favorite_merchants_resolver__WEBPACK_IMPORTED_MODULE_6__["FavoriteMerchantsResolver"], _services_favorite_merchants_service__WEBPACK_IMPORTED_MODULE_7__["FavoriteMerchantsService"]];
var FavoriteMerchantsModule = /** @class */ (function () {
    function FavoriteMerchantsModule() {
    }
    FavoriteMerchantsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: declarations,
            imports: imports,
            providers: providers
        })
    ], FavoriteMerchantsModule);
    return FavoriteMerchantsModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/pages/favorite-merchants/favorite-merchants.routing.module.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/favorite-merchants/favorite-merchants.routing.module.ts ***!
  \*************************************************************************************************/
/*! exports provided: FavoriteMerchantsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavoriteMerchantsRoutingModule", function() { return FavoriteMerchantsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _sections_ordering_pages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/ordering/pages */ "./src/app/sections/ordering/pages/index.ts");
/* harmony import */ var _resolvers_favorite_merchants_resolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolvers/favorite-merchants.resolver */ "./src/app/sections/ordering/pages/favorite-merchants/resolvers/favorite-merchants.resolver.ts");





var routes = [
    {
        path: '',
        component: _sections_ordering_pages__WEBPACK_IMPORTED_MODULE_3__["FavoriteMerchantsComponent"],
        resolve: {
            data: _resolvers_favorite_merchants_resolver__WEBPACK_IMPORTED_MODULE_4__["FavoriteMerchantsResolver"],
        },
    },
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var FavoriteMerchantsRoutingModule = /** @class */ (function () {
    function FavoriteMerchantsRoutingModule() {
    }
    FavoriteMerchantsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({ imports: imports, exports: exports })
    ], FavoriteMerchantsRoutingModule);
    return FavoriteMerchantsRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/pages/favorite-merchants/resolvers/favorite-merchants.resolver.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/favorite-merchants/resolvers/favorite-merchants.resolver.ts ***!
  \*****************************************************************************************************/
/*! exports provided: FavoriteMerchantsResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavoriteMerchantsResolver", function() { return FavoriteMerchantsResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sections_ordering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sections/ordering */ "./src/app/sections/ordering/index.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_favorite_merchants_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/favorite-merchants.service */ "./src/app/sections/ordering/pages/favorite-merchants/services/favorite-merchants.service.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");







var FavoriteMerchantsResolver = /** @class */ (function () {
    function FavoriteMerchantsResolver(favoriteMerchantsService, loadingService, merchantService) {
        this.favoriteMerchantsService = favoriteMerchantsService;
        this.loadingService = loadingService;
        this.merchantService = merchantService;
    }
    FavoriteMerchantsResolver.prototype.resolve = function () {
        var _this = this;
        this.loadingService.showSpinner();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["zip"])(this.favoriteMerchantsService
            .getFavoriteMerchants(), this.merchantService.menuMerchants$)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var favoriteMerchants = _a[0], merchants = _a[1];
            return favoriteMerchants.map(function (merchant) { return merchants.find(function (_a) {
                var id = _a.id;
                return id === merchant.id;
            }); });
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function () {
            _this.loadingService.closeSpinner();
        }, function () { return _this.loadingService.closeSpinner(); }));
    };
    FavoriteMerchantsResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_favorite_merchants_service__WEBPACK_IMPORTED_MODULE_5__["FavoriteMerchantsService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__["LoadingService"],
            _sections_ordering__WEBPACK_IMPORTED_MODULE_1__["MerchantService"]])
    ], FavoriteMerchantsResolver);
    return FavoriteMerchantsResolver;
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
//# sourceMappingURL=pages-favorite-merchants-favorite-merchants-module.js.map