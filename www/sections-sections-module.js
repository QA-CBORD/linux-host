(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sections-sections-module"],{

/***/ "./src/app/sections/sections-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/sections/sections-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: SectionsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionsRoutingModule", function() { return SectionsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _sections_section_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/section.config */ "./src/app/sections/section.config.ts");





var routes = [
    {
        path: '',
        redirectTo: _sections_section_config__WEBPACK_IMPORTED_MODULE_4__["PATRON_ROUTES"].dashboard,
    },
    {
        path: _sections_section_config__WEBPACK_IMPORTED_MODULE_4__["PATRON_ROUTES"].dashboard,
        loadChildren: './dashboard/dashboard.module#DashboardPageModule',
    },
    {
        path: _sections_section_config__WEBPACK_IMPORTED_MODULE_4__["PATRON_ROUTES"].mobileAccess,
        loadChildren: './mobile-access/mobile-access.module#MobileAccessPageModule',
    },
    {
        path: _sections_section_config__WEBPACK_IMPORTED_MODULE_4__["PATRON_ROUTES"].rewards,
        loadChildren: './rewards/rewards.module#RewardsPageModule',
    },
    {
        path: _sections_section_config__WEBPACK_IMPORTED_MODULE_4__["PATRON_ROUTES"].secureMessage,
        loadChildren: './secure-messaging/secure-message.module#SecureMessagePageModule',
    },
    {
        path: _sections_section_config__WEBPACK_IMPORTED_MODULE_4__["PATRON_ROUTES"].accounts,
        loadChildren: './accounts/accounts.module#AccountsModule',
    },
    {
        path: _sections_section_config__WEBPACK_IMPORTED_MODULE_4__["PATRON_ROUTES"].ordering,
        loadChildren: './ordering/ordering.module#OrderingPageModule',
    },
    {
        path: _sections_section_config__WEBPACK_IMPORTED_MODULE_4__["PATRON_ROUTES"].housing,
        loadChildren: './housing/housing.module#HousingPageModule',
    },
    {
        path: _sections_section_config__WEBPACK_IMPORTED_MODULE_4__["PATRON_ROUTES"].explore,
        loadChildren: './explore/explore.module#ExploreModule',
    },
    {
        path: _sections_section_config__WEBPACK_IMPORTED_MODULE_4__["PATRON_ROUTES"].biometric,
        loadChildren: './biometric-login/biometric.module#BiometricModule',
    },
];
var SectionsRoutingModule = /** @class */ (function () {
    function SectionsRoutingModule() {
    }
    SectionsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]],
        })
    ], SectionsRoutingModule);
    return SectionsRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/sections.module.ts":
/*!*********************************************!*\
  !*** ./src/app/sections/sections.module.ts ***!
  \*********************************************/
/*! exports provided: SectionsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionsModule", function() { return SectionsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _sections_sections_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/sections-routing.module */ "./src/app/sections/sections-routing.module.ts");




var SectionsModule = /** @class */ (function () {
    function SectionsModule() {
    }
    SectionsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _sections_sections_routing_module__WEBPACK_IMPORTED_MODULE_3__["SectionsRoutingModule"],
            ],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SectionsModule);
    return SectionsModule;
}());



/***/ })

}]);
//# sourceMappingURL=sections-sections-module.js.map