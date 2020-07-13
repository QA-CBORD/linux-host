(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["non-authorized-non-authorized-module"],{

/***/ "./src/app/non-authorized/non-authorized-routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/non-authorized/non-authorized-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: NonAuthorizedRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NonAuthorizedRoutingModule", function() { return NonAuthorizedRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./non-authorized.config */ "./src/app/non-authorized/non-authorized.config.ts");





var routes = [
    {
        path: '',
        redirectTo: _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__["GUEST_ROUTES"].startup,
    },
    {
        path: _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__["GUEST_ROUTES"].startup,
        loadChildren: './pages/startup/startup.module#StartupPageModule',
    },
    {
        path: _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__["GUEST_ROUTES"].entry,
        loadChildren: './pages/entry/entry.module#EntryPageModule',
    },
    {
        path: _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__["GUEST_ROUTES"].institutions,
        loadChildren: './pages/institutions/institutions.module#InstitutionsPageModule',
    },
    {
        path: _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__["GUEST_ROUTES"].login,
        loadChildren: './pages/user-pass-form/user-pass-form.module#UserPassFormPageModule',
    },
    {
        path: _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__["GUEST_ROUTES"].forgotPassword,
        loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule',
    },
];
var NonAuthorizedRoutingModule = /** @class */ (function () {
    function NonAuthorizedRoutingModule() {
    }
    NonAuthorizedRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]],
        })
    ], NonAuthorizedRoutingModule);
    return NonAuthorizedRoutingModule;
}());



/***/ }),

/***/ "./src/app/non-authorized/non-authorized.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/non-authorized/non-authorized.module.ts ***!
  \*********************************************************/
/*! exports provided: NonAuthorizedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NonAuthorizedModule", function() { return NonAuthorizedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _non_authorized_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./non-authorized-routing.module */ "./src/app/non-authorized/non-authorized-routing.module.ts");




var NonAuthorizedModule = /** @class */ (function () {
    function NonAuthorizedModule() {
    }
    NonAuthorizedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _non_authorized_routing_module__WEBPACK_IMPORTED_MODULE_3__["NonAuthorizedRoutingModule"]
            ]
        })
    ], NonAuthorizedModule);
    return NonAuthorizedModule;
}());



/***/ })

}]);
//# sourceMappingURL=non-authorized-non-authorized-module.js.map