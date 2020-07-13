(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["housing-housing-module"],{

/***/ "./src/app/sections/housing/housing.config.ts":
/*!****************************************************!*\
  !*** ./src/app/sections/housing/housing.config.ts ***!
  \****************************************************/
/*! exports provided: LOCAL_ROUTING, STORAGE_KEY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCAL_ROUTING", function() { return LOCAL_ROUTING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STORAGE_KEY", function() { return STORAGE_KEY; });
var LOCAL_ROUTING;
(function (LOCAL_ROUTING) {
    LOCAL_ROUTING["dashboard"] = "dashboard";
    LOCAL_ROUTING["applications"] = "applications";
    LOCAL_ROUTING["facilities"] = "facilities";
    LOCAL_ROUTING["contracts"] = "contracts";
    LOCAL_ROUTING["workOrders"] = "work-orders";
    LOCAL_ROUTING["units"] = "units";
})(LOCAL_ROUTING || (LOCAL_ROUTING = {}));
var STORAGE_KEY = 'housing';


/***/ }),

/***/ "./src/app/sections/housing/housing.module.ts":
/*!****************************************************!*\
  !*** ./src/app/sections/housing/housing.module.ts ***!
  \****************************************************/
/*! exports provided: HousingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HousingPageModule", function() { return HousingPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _housing_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./housing.routing.module */ "./src/app/sections/housing/housing.routing.module.ts");
/* harmony import */ var _housing_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./housing.page */ "./src/app/sections/housing/housing.page.ts");





var imports = [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"], _housing_routing_module__WEBPACK_IMPORTED_MODULE_3__["HousingRoutingModule"]];
var declarations = [_housing_page__WEBPACK_IMPORTED_MODULE_4__["HousingPage"]];
var HousingPageModule = /** @class */ (function () {
    function HousingPageModule() {
    }
    HousingPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: imports,
            declarations: declarations,
        })
    ], HousingPageModule);
    return HousingPageModule;
}());



/***/ }),

/***/ "./src/app/sections/housing/housing.page.html":
/*!****************************************************!*\
  !*** ./src/app/sections/housing/housing.page.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-router-outlet></ion-router-outlet>"

/***/ }),

/***/ "./src/app/sections/housing/housing.page.scss":
/*!****************************************************!*\
  !*** ./src/app/sections/housing/housing.page.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL2hvdXNpbmcvaG91c2luZy5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/sections/housing/housing.page.ts":
/*!**************************************************!*\
  !*** ./src/app/sections/housing/housing.page.ts ***!
  \**************************************************/
/*! exports provided: HousingPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HousingPage", function() { return HousingPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HousingPage = /** @class */ (function () {
    function HousingPage() {
    }
    HousingPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-housing',
            template: __webpack_require__(/*! ./housing.page.html */ "./src/app/sections/housing/housing.page.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./housing.page.scss */ "./src/app/sections/housing/housing.page.scss")]
        })
    ], HousingPage);
    return HousingPage;
}());



/***/ }),

/***/ "./src/app/sections/housing/housing.routing.module.ts":
/*!************************************************************!*\
  !*** ./src/app/sections/housing/housing.routing.module.ts ***!
  \************************************************************/
/*! exports provided: HousingRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HousingRoutingModule", function() { return HousingRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _housing_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./housing.config */ "./src/app/sections/housing/housing.config.ts");
/* harmony import */ var _housing_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./housing.page */ "./src/app/sections/housing/housing.page.ts");





var routes = [
    {
        path: '',
        component: _housing_page__WEBPACK_IMPORTED_MODULE_4__["HousingPage"],
        children: [
            {
                path: _housing_config__WEBPACK_IMPORTED_MODULE_3__["LOCAL_ROUTING"].dashboard,
                loadChildren: './pages/housing-dashboard/housing-dashboard.module#HousingDashboardPageModule',
            },
            {
                path: _housing_config__WEBPACK_IMPORTED_MODULE_3__["LOCAL_ROUTING"].applications + "/:applicationKey",
                loadChildren: './pages/application-details/application-details.module#ApplicationDetailsPageModule',
            },
            {
                path: _housing_config__WEBPACK_IMPORTED_MODULE_3__["LOCAL_ROUTING"].facilities + "/:facilityId",
                loadChildren: './pages/facility-details/facility-details.module#FacilityDetailsPageModule',
            },
            {
                path: _housing_config__WEBPACK_IMPORTED_MODULE_3__["LOCAL_ROUTING"].contracts + "/:contractKey/:contractElementKey",
                loadChildren: './pages/contract-details/contract-details.module#ContractDetailsPageModule',
            },
            {
                path: _housing_config__WEBPACK_IMPORTED_MODULE_3__["LOCAL_ROUTING"].workOrders + "/:workOrderId",
                loadChildren: './pages/work-order-details/work-order-details.module#WorkOrderDetailsPageModule',
            },
            {
                path: _housing_config__WEBPACK_IMPORTED_MODULE_3__["LOCAL_ROUTING"].units + "/:unitId",
                loadChildren: './pages/unit-details/unit-details.module#UnitDetailsPageModule',
            },
            {
                path: '',
                redirectTo: _housing_config__WEBPACK_IMPORTED_MODULE_3__["LOCAL_ROUTING"].dashboard,
                pathMatch: 'full',
            },
        ],
    },
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var HousingRoutingModule = /** @class */ (function () {
    function HousingRoutingModule() {
    }
    HousingRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: imports,
            exports: exports,
        })
    ], HousingRoutingModule);
    return HousingRoutingModule;
}());



/***/ })

}]);
//# sourceMappingURL=housing-housing-module.js.map