(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-forgot-password-forgot-password-module"],{

/***/ "./src/app/non-authorized/pages/forgot-password/forgot-password.config.ts":
/*!********************************************************************************!*\
  !*** ./src/app/non-authorized/pages/forgot-password/forgot-password.config.ts ***!
  \********************************************************************************/
/*! exports provided: FORGOT_PASSWORD_ROUTING */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORGOT_PASSWORD_ROUTING", function() { return FORGOT_PASSWORD_ROUTING; });
var FORGOT_PASSWORD_ROUTING;
(function (FORGOT_PASSWORD_ROUTING) {
    FORGOT_PASSWORD_ROUTING["confirm"] = "confirm";
    FORGOT_PASSWORD_ROUTING["enterCode"] = "enter-code";
})(FORGOT_PASSWORD_ROUTING || (FORGOT_PASSWORD_ROUTING = {}));


/***/ }),

/***/ "./src/app/non-authorized/pages/forgot-password/forgot-password.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/non-authorized/pages/forgot-password/forgot-password.module.ts ***!
  \********************************************************************************/
/*! exports provided: ForgotPasswordPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordPageModule", function() { return ForgotPasswordPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _forgot_password_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./forgot-password.page */ "./src/app/non-authorized/pages/forgot-password/forgot-password.page.ts");
/* harmony import */ var _shared_ui_components_st_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/ui-components/st-button */ "./src/app/shared/ui-components/st-button/index.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _forgot_password_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./forgot-password.config */ "./src/app/non-authorized/pages/forgot-password/forgot-password.config.ts");










var routes = [
    {
        path: '',
        component: _forgot_password_page__WEBPACK_IMPORTED_MODULE_6__["ForgotPasswordPage"],
    },
    {
        path: _forgot_password_config__WEBPACK_IMPORTED_MODULE_9__["FORGOT_PASSWORD_ROUTING"].confirm,
        loadChildren: './pages/confirm-account/confirm-account.module#ConfirmAccountPageModule'
    },
    {
        path: _forgot_password_config__WEBPACK_IMPORTED_MODULE_9__["FORGOT_PASSWORD_ROUTING"].enterCode,
        loadChildren: './pages/enter-code/enter-code.module#EnterCodePageModule'
    },
];
var ForgotPasswordPageModule = /** @class */ (function () {
    function ForgotPasswordPageModule() {
    }
    ForgotPasswordPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _shared_ui_components_st_button__WEBPACK_IMPORTED_MODULE_7__["StButtonModule"],
                _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_8__["StHeaderModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
            ],
            declarations: [_forgot_password_page__WEBPACK_IMPORTED_MODULE_6__["ForgotPasswordPage"]],
        })
    ], ForgotPasswordPageModule);
    return ForgotPasswordPageModule;
}());



/***/ }),

/***/ "./src/app/non-authorized/pages/forgot-password/forgot-password.page.html":
/*!********************************************************************************!*\
  !*** ./src/app/non-authorized/pages/forgot-password/forgot-password.page.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-header title=\"Forgot Password\"\r\n           [isTitleShow]=\"true\"\r\n           [backButtonTitle]=\"'Login'\"\r\n           [backButtonIcon]=\"'ios-arrow-back'\"\r\n           [isToolbarShow]=\"true\"></st-header>\r\n\r\n<ion-content>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/non-authorized/pages/forgot-password/forgot-password.page.scss":
/*!********************************************************************************!*\
  !*** ./src/app/non-authorized/pages/forgot-password/forgot-password.page.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL25vbi1hdXRob3JpemVkL3BhZ2VzL2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/non-authorized/pages/forgot-password/forgot-password.page.ts":
/*!******************************************************************************!*\
  !*** ./src/app/non-authorized/pages/forgot-password/forgot-password.page.ts ***!
  \******************************************************************************/
/*! exports provided: ForgotPasswordPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordPage", function() { return ForgotPasswordPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../non-authorized.config */ "./src/app/non-authorized/non-authorized.config.ts");
/* harmony import */ var _forgot_password_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./forgot-password.config */ "./src/app/non-authorized/pages/forgot-password/forgot-password.config.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");







var ForgotPasswordPage = /** @class */ (function () {
    function ForgotPasswordPage(router, fb) {
        this.router = router;
        this.fb = fb;
    }
    ForgotPasswordPage.prototype.ngOnInit = function () {
        this.initForm();
    };
    ForgotPasswordPage.prototype.redirect = function () {
        this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_3__["ROLES"].guest, _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__["GUEST_ROUTES"].forgotPassword, _forgot_password_config__WEBPACK_IMPORTED_MODULE_5__["FORGOT_PASSWORD_ROUTING"].confirm]);
    };
    ForgotPasswordPage.prototype.redirect2 = function () {
        this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_3__["ROLES"].guest, _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__["GUEST_ROUTES"].forgotPassword, _forgot_password_config__WEBPACK_IMPORTED_MODULE_5__["FORGOT_PASSWORD_ROUTING"].enterCode]);
    };
    ForgotPasswordPage.prototype.initForm = function () {
        this.tokenForm = this.fb.group({});
    };
    ForgotPasswordPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-forgot-password',
            template: __webpack_require__(/*! ./forgot-password.page.html */ "./src/app/non-authorized/pages/forgot-password/forgot-password.page.html"),
            styles: [__webpack_require__(/*! ./forgot-password.page.scss */ "./src/app/non-authorized/pages/forgot-password/forgot-password.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"]])
    ], ForgotPasswordPage);
    return ForgotPasswordPage;
}());



/***/ }),

/***/ "./src/app/shared/ui-components/st-header/st-header.module.ts":
/*!********************************************************************!*\
  !*** ./src/app/shared/ui-components/st-header/st-header.module.ts ***!
  \********************************************************************/
/*! exports provided: StHeaderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StHeaderModule", function() { return StHeaderModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _st_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./st-header.component */ "./src/app/shared/ui-components/st-header/st-header.component.ts");





var declarations = [_st_header_component__WEBPACK_IMPORTED_MODULE_4__["StHeaderComponent"]];
var StHeaderModule = /** @class */ (function () {
    function StHeaderModule() {
    }
    StHeaderModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"]
            ],
            exports: declarations
        })
    ], StHeaderModule);
    return StHeaderModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-forgot-password-forgot-password-module.js.map