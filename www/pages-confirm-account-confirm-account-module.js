(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-confirm-account-confirm-account-module"],{

/***/ "./src/app/non-authorized/pages/forgot-password/pages/confirm-account/confirm-account.module.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/non-authorized/pages/forgot-password/pages/confirm-account/confirm-account.module.ts ***!
  \******************************************************************************************************/
/*! exports provided: ConfirmAccountPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmAccountPageModule", function() { return ConfirmAccountPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _confirm_account_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./confirm-account.page */ "./src/app/non-authorized/pages/forgot-password/pages/confirm-account/confirm-account.page.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");








var routes = [
    {
        path: '',
        component: _confirm_account_page__WEBPACK_IMPORTED_MODULE_6__["ConfirmAccountPage"]
    }
];
var ConfirmAccountPageModule = /** @class */ (function () {
    function ConfirmAccountPageModule() {
    }
    ConfirmAccountPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_7__["StHeaderModule"],
            ],
            declarations: [_confirm_account_page__WEBPACK_IMPORTED_MODULE_6__["ConfirmAccountPage"]]
        })
    ], ConfirmAccountPageModule);
    return ConfirmAccountPageModule;
}());



/***/ }),

/***/ "./src/app/non-authorized/pages/forgot-password/pages/confirm-account/confirm-account.page.html":
/*!******************************************************************************************************!*\
  !*** ./src/app/non-authorized/pages/forgot-password/pages/confirm-account/confirm-account.page.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-header title=\"Confirm Your Account\"\r\n           [isTitleShow]=\"true\"\r\n           [backButtonTitle]=\"'Find Account'\"\r\n           [backButtonIcon]=\"'ios-arrow-back'\"\r\n           [isToolbarShow]=\"true\"></st-header>\r\n\r\n<ion-content>\r\n\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/non-authorized/pages/forgot-password/pages/confirm-account/confirm-account.page.scss":
/*!******************************************************************************************************!*\
  !*** ./src/app/non-authorized/pages/forgot-password/pages/confirm-account/confirm-account.page.scss ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL25vbi1hdXRob3JpemVkL3BhZ2VzL2ZvcmdvdC1wYXNzd29yZC9wYWdlcy9jb25maXJtLWFjY291bnQvY29uZmlybS1hY2NvdW50LnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/non-authorized/pages/forgot-password/pages/confirm-account/confirm-account.page.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/non-authorized/pages/forgot-password/pages/confirm-account/confirm-account.page.ts ***!
  \****************************************************************************************************/
/*! exports provided: ConfirmAccountPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmAccountPage", function() { return ConfirmAccountPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ConfirmAccountPage = /** @class */ (function () {
    function ConfirmAccountPage() {
    }
    ConfirmAccountPage.prototype.ngOnInit = function () {
    };
    ConfirmAccountPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-confirm-account',
            template: __webpack_require__(/*! ./confirm-account.page.html */ "./src/app/non-authorized/pages/forgot-password/pages/confirm-account/confirm-account.page.html"),
            styles: [__webpack_require__(/*! ./confirm-account.page.scss */ "./src/app/non-authorized/pages/forgot-password/pages/confirm-account/confirm-account.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ConfirmAccountPage);
    return ConfirmAccountPage;
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
//# sourceMappingURL=pages-confirm-account-confirm-account-module.js.map