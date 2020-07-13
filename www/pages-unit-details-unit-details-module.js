(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-unit-details-unit-details-module"],{

/***/ "./src/app/sections/housing/pages/unit-details/unit-details.module.ts":
/*!****************************************************************************!*\
  !*** ./src/app/sections/housing/pages/unit-details/unit-details.module.ts ***!
  \****************************************************************************/
/*! exports provided: UnitDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitDetailsPageModule", function() { return UnitDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _unit_details_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./unit-details.routing.module */ "./src/app/sections/housing/pages/unit-details/unit-details.routing.module.ts");
/* harmony import */ var _unit_details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./unit-details.page */ "./src/app/sections/housing/pages/unit-details/unit-details.page.ts");







var imports = [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _unit_details_routing_module__WEBPACK_IMPORTED_MODULE_5__["UnitDetailsRoutingModule"]];
var declarations = [_unit_details_page__WEBPACK_IMPORTED_MODULE_6__["UnitDetailsPage"]];
var UnitDetailsPageModule = /** @class */ (function () {
    function UnitDetailsPageModule() {
    }
    UnitDetailsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: imports,
            declarations: declarations,
        })
    ], UnitDetailsPageModule);
    return UnitDetailsPageModule;
}());



/***/ }),

/***/ "./src/app/sections/housing/pages/unit-details/unit-details.page.html":
/*!****************************************************************************!*\
  !*** ./src/app/sections/housing/pages/unit-details/unit-details.page.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar color=\"primary\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button routerDirection=\"root\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>Rooms</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n  <ion-card *ngFor=\"let unit of units\">\r\n    <ion-grid class=\"ion-no-margin ion-no-padding\">\r\n      <ion-row>\r\n        <ion-col class=\"col-sm-8 col-md-8 col-lg-8\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col>\r\n                <ion-label style=\"font-size: 18px; font-weight: bold\" class=\"ion-text-capitalize\">{{\r\n                  unit.unitName\r\n                }}</ion-label>\r\n                <p style=\"font-size: 14px; color: gray; margin: 0px; margin-top:5px\">\r\n                  <b>{{ unit.unitBeds }}</b> Beds | <b>{{ unit.unitBaths }}</b> Baths\r\n                </p>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </ion-col>\r\n        <ion-col\r\n          class=\"col-sm-3 col-md-3 col-lg-3 ion-text-right\"\r\n          style=\"margin:0px; margin-left:10px; padding: 0px; padding-top: 25px\"\r\n        >\r\n          <ion-label style=\"font-size: 18px; font-weight: bolder\">${{ unit.unitRate }}</ion-label>\r\n        </ion-col>\r\n        <ion-col\r\n          class=\"col-sm-1 col-md-1 col-lg-1\"\r\n          style=\"margin: 0px; margin-left: -70px; padding: 0px; padding-top: 13px;\"\r\n        >\r\n          <ion-button class=\"button-clear ion-no-margin ion-float-right ion-text-center\">\r\n            <ion-icon name=\"star-outline\"></ion-icon>\r\n          </ion-button>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </ion-card>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/sections/housing/pages/unit-details/unit-details.page.scss":
/*!****************************************************************************!*\
  !*** ./src/app/sections/housing/pages/unit-details/unit-details.page.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL2hvdXNpbmcvcGFnZXMvdW5pdC1kZXRhaWxzL3VuaXQtZGV0YWlscy5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/sections/housing/pages/unit-details/unit-details.page.ts":
/*!**************************************************************************!*\
  !*** ./src/app/sections/housing/pages/unit-details/unit-details.page.ts ***!
  \**************************************************************************/
/*! exports provided: UnitDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitDetailsPage", function() { return UnitDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _units_units_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../units/units.service */ "./src/app/sections/housing/units/units.service.ts");





var UnitDetailsPage = /** @class */ (function () {
    function UnitDetailsPage(_route, _unitsService) {
        this._route = _route;
        this._unitsService = _unitsService;
        this._subscription = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"]();
    }
    UnitDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        var facilityId = parseInt(this._route.snapshot.paramMap.get('facilityId'), 10);
        var unitsSubscription = this._unitsService
            .getUnits(facilityId)
            .subscribe(function (units) { return (_this.units = units); });
        this._subscription.add(unitsSubscription);
    };
    UnitDetailsPage.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    UnitDetailsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-unit-details',
            template: __webpack_require__(/*! ./unit-details.page.html */ "./src/app/sections/housing/pages/unit-details/unit-details.page.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./unit-details.page.scss */ "./src/app/sections/housing/pages/unit-details/unit-details.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _units_units_service__WEBPACK_IMPORTED_MODULE_4__["UnitsService"]])
    ], UnitDetailsPage);
    return UnitDetailsPage;
}());



/***/ }),

/***/ "./src/app/sections/housing/pages/unit-details/unit-details.routing.module.ts":
/*!************************************************************************************!*\
  !*** ./src/app/sections/housing/pages/unit-details/unit-details.routing.module.ts ***!
  \************************************************************************************/
/*! exports provided: UnitDetailsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitDetailsRoutingModule", function() { return UnitDetailsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _unit_details_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./unit-details.page */ "./src/app/sections/housing/pages/unit-details/unit-details.page.ts");




var routes = [{ path: '', component: _unit_details_page__WEBPACK_IMPORTED_MODULE_3__["UnitDetailsPage"] }];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var UnitDetailsRoutingModule = /** @class */ (function () {
    function UnitDetailsRoutingModule() {
    }
    UnitDetailsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: imports,
            exports: exports,
        })
    ], UnitDetailsRoutingModule);
    return UnitDetailsRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/housing/units/units.mock.ts":
/*!******************************************************!*\
  !*** ./src/app/sections/housing/units/units.mock.ts ***!
  \******************************************************/
/*! exports provided: generateUnit, generateUnits */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUnit", function() { return generateUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUnits", function() { return generateUnits; });
/* harmony import */ var _units_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./units.model */ "./src/app/sections/housing/units/units.model.ts");

function generateUnit(_, index) {
    var id = index;
    var name = "unit " + index;
    var rate = 640 + index + "/mo";
    var beds = index;
    var baths = index;
    return new _units_model__WEBPACK_IMPORTED_MODULE_0__["Unit"](id, name, rate, beds, baths);
}
function generateUnits(amount) {
    return Array.apply(null, Array(amount)).map(generateUnit);
}


/***/ }),

/***/ "./src/app/sections/housing/units/units.model.ts":
/*!*******************************************************!*\
  !*** ./src/app/sections/housing/units/units.model.ts ***!
  \*******************************************************/
/*! exports provided: Unit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Unit", function() { return Unit; });
var Unit = /** @class */ (function () {
    function Unit(id, name, rate, beds, baths) {
        this.id = id;
        this.name = name;
        this.rate = rate;
        this.beds = beds;
        this.baths = baths;
    }
    return Unit;
}());



/***/ }),

/***/ "./src/app/sections/housing/units/units.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/sections/housing/units/units.service.ts ***!
  \*********************************************************/
/*! exports provided: UnitsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitsService", function() { return UnitsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _units_mock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./units.mock */ "./src/app/sections/housing/units/units.mock.ts");
/* harmony import */ var _units_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./units.model */ "./src/app/sections/housing/units/units.model.ts");






var UnitsService = /** @class */ (function () {
    function UnitsService() {
        this.units = Object(_units_mock__WEBPACK_IMPORTED_MODULE_4__["generateUnits"])(4);
    }
    UnitsService.prototype.getUnits = function (facilityId) {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(this.units).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (units) { return units.map(_this._toModel); }));
    };
    UnitsService.prototype._toModel = function (unit) {
        return new _units_model__WEBPACK_IMPORTED_MODULE_5__["Unit"](unit.id, unit.name, unit.rate, unit.beds, unit.baths);
    };
    UnitsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        })
    ], UnitsService);
    return UnitsService;
}());



/***/ })

}]);
//# sourceMappingURL=pages-unit-details-unit-details-module.js.map