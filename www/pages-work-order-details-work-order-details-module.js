(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-work-order-details-work-order-details-module"],{

/***/ "./src/app/sections/housing/pages/work-order-details/work-order-details.module.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/housing/pages/work-order-details/work-order-details.module.ts ***!
  \****************************************************************************************/
/*! exports provided: WorkOrderDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkOrderDetailsPageModule", function() { return WorkOrderDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _work_order_details_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./work-order-details.routing.module */ "./src/app/sections/housing/pages/work-order-details/work-order-details.routing.module.ts");
/* harmony import */ var _work_order_details_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./work-order-details.page */ "./src/app/sections/housing/pages/work-order-details/work-order-details.page.ts");






var imports = [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _work_order_details_routing_module__WEBPACK_IMPORTED_MODULE_4__["WorkOrderDetailsRoutingModule"]];
var declarations = [_work_order_details_page__WEBPACK_IMPORTED_MODULE_5__["WorkOrderDetailsPage"]];
var WorkOrderDetailsPageModule = /** @class */ (function () {
    function WorkOrderDetailsPageModule() {
    }
    WorkOrderDetailsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: imports,
            declarations: declarations,
        })
    ], WorkOrderDetailsPageModule);
    return WorkOrderDetailsPageModule;
}());



/***/ }),

/***/ "./src/app/sections/housing/pages/work-order-details/work-order-details.page.html":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/housing/pages/work-order-details/work-order-details.page.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar color=\"primary\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"/housing/dashboard\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>Work Orders</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n  <ion-item> This is the work orders page for Id: {{ workOrderId }} </ion-item>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/sections/housing/pages/work-order-details/work-order-details.page.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/sections/housing/pages/work-order-details/work-order-details.page.ts ***!
  \**************************************************************************************/
/*! exports provided: WorkOrderDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkOrderDetailsPage", function() { return WorkOrderDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var WorkOrderDetailsPage = /** @class */ (function () {
    function WorkOrderDetailsPage(_route) {
        this._route = _route;
    }
    WorkOrderDetailsPage.prototype.ngOnInit = function () {
        this.workOrderId = parseInt(this._route.snapshot.paramMap.get('workOrderId'), 10);
    };
    WorkOrderDetailsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-work-order-details',
            template: __webpack_require__(/*! ./work-order-details.page.html */ "./src/app/sections/housing/pages/work-order-details/work-order-details.page.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], WorkOrderDetailsPage);
    return WorkOrderDetailsPage;
}());



/***/ }),

/***/ "./src/app/sections/housing/pages/work-order-details/work-order-details.routing.module.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/sections/housing/pages/work-order-details/work-order-details.routing.module.ts ***!
  \************************************************************************************************/
/*! exports provided: WorkOrderDetailsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkOrderDetailsRoutingModule", function() { return WorkOrderDetailsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _work_order_details_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./work-order-details.page */ "./src/app/sections/housing/pages/work-order-details/work-order-details.page.ts");




var routes = [{ path: '', component: _work_order_details_page__WEBPACK_IMPORTED_MODULE_3__["WorkOrderDetailsPage"] }];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var WorkOrderDetailsRoutingModule = /** @class */ (function () {
    function WorkOrderDetailsRoutingModule() {
    }
    WorkOrderDetailsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: imports,
            exports: exports,
        })
    ], WorkOrderDetailsRoutingModule);
    return WorkOrderDetailsRoutingModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-work-order-details-work-order-details-module.js.map