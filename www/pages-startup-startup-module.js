(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-startup-startup-module"],{

/***/ "./src/app/non-authorized/pages/startup/startup.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/non-authorized/pages/startup/startup.module.ts ***!
  \****************************************************************/
/*! exports provided: StartupPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartupPageModule", function() { return StartupPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _startup_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./startup.page */ "./src/app/non-authorized/pages/startup/startup.page.ts");







var routes = [
    {
        path: '',
        component: _startup_page__WEBPACK_IMPORTED_MODULE_6__["StartupPage"]
    }
];
var StartupPageModule = /** @class */ (function () {
    function StartupPageModule() {
    }
    StartupPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_startup_page__WEBPACK_IMPORTED_MODULE_6__["StartupPage"]]
        })
    ], StartupPageModule);
    return StartupPageModule;
}());



/***/ }),

/***/ "./src/app/non-authorized/pages/startup/startup.page.html":
/*!****************************************************************!*\
  !*** ./src/app/non-authorized/pages/startup/startup.page.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content class=\"startup__background\">\r\n  <img class=\"startup__image\" src=\"/assets/images/splash_icon_get.svg\" alt=\"GET CBORD Student Icon\" />\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/non-authorized/pages/startup/startup.page.scss":
/*!****************************************************************!*\
  !*** ./src/app/non-authorized/pages/startup/startup.page.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".startup__image {\n  margin: 0;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  width: 128px;\n  height: 128px; }\n\n.startup__background {\n  --ion-background-color: radial-gradient(121.92% 121.92% at 50% 50%, #166dff 0%, #003080 100%), #003080; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbm9uLWF1dGhvcml6ZWQvcGFnZXMvc3RhcnR1cC9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcbm9uLWF1dGhvcml6ZWRcXHBhZ2VzXFxzdGFydHVwXFxzdGFydHVwLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLFNBQVM7RUFDVCxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFNBQVM7RUFDVCx3Q0FBZ0M7VUFBaEMsZ0NBQWdDO0VBQ2hDLFlBQVk7RUFDWixhQUFhLEVBQUE7O0FBR2Y7RUFDRSxzR0FBdUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL25vbi1hdXRob3JpemVkL3BhZ2VzL3N0YXJ0dXAvc3RhcnR1cC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc3RhcnR1cCB7XHJcbiAgJl9faW1hZ2Uge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICAgIHdpZHRoOiAxMjhweDtcclxuICAgIGhlaWdodDogMTI4cHg7XHJcbiAgfVxyXG5cclxuICAmX19iYWNrZ3JvdW5kIHtcclxuICAgIC0taW9uLWJhY2tncm91bmQtY29sb3I6IHJhZGlhbC1ncmFkaWVudCgxMjEuOTIlIDEyMS45MiUgYXQgNTAlIDUwJSwgIzE2NmRmZiAwJSwgIzAwMzA4MCAxMDAlKSwgIzAwMzA4MDtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/non-authorized/pages/startup/startup.page.ts":
/*!**************************************************************!*\
  !*** ./src/app/non-authorized/pages/startup/startup.page.ts ***!
  \**************************************************************/
/*! exports provided: StartupPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartupPage", function() { return StartupPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/facades/identity/identity.facade.service */ "./src/app/core/facades/identity/identity.facade.service.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../non-authorized.config */ "./src/app/non-authorized/non-authorized.config.ts");
/* harmony import */ var _sections_section_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/section.config */ "./src/app/sections/section.config.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/facades/auth/auth.facade.service */ "./src/app/core/facades/auth/auth.facade.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");










var StartupPage = /** @class */ (function () {
    function StartupPage(router, identityFacadeService, authFacadeService) {
        this.router = router;
        this.identityFacadeService = identityFacadeService;
        this.authFacadeService = authFacadeService;
    }
    StartupPage.prototype.ngOnInit = function () { };
    StartupPage.prototype.ionViewWillEnter = function () {
        console.log('Startup Page - ViewWillEnter');
        this.doLoginChecks();
    };
    StartupPage.prototype.doLoginChecks = function () {
        var _this = this;
        var routeConfig = { replaceUrl: true };
        this.authFacadeService
            .getAuthSessionToken$()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["switchMap"])(function (sessionId) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(_this.identityFacadeService.determineFromBackgroundLoginState(sessionId));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1))
            .subscribe(function (state) {
            console.log('StartupPage - login state:', state);
            switch (state) {
                case _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_2__["LoginState"].SELECT_INSTITUTION:
                    _this.identityFacadeService.logoutUser();
                    _this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_3__["ROLES"].guest, _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__["GUEST_ROUTES"].entry], routeConfig);
                    break;
                case _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_2__["LoginState"].BIOMETRIC_LOGIN:
                    _this.loginUser(true);
                    break;
                case _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_2__["LoginState"].BIOMETRIC_SET:
                    _this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_3__["ROLES"].patron, _sections_section_config__WEBPACK_IMPORTED_MODULE_5__["PATRON_ROUTES"].dashboard], routeConfig);
                    break;
                case _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_2__["LoginState"].PIN_LOGIN:
                    _this.loginUser(false);
                    break;
                case _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_2__["LoginState"].PIN_SET:
                    _this.identityFacadeService.pinOnlyLoginSetup();
                    break;
                case _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_2__["LoginState"].HOSTED:
                    _this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_3__["ROLES"].guest, _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__["GUEST_ROUTES"].login], routeConfig);
                    break;
                case _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_2__["LoginState"].EXTERNAL:
                    _this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_3__["ROLES"].guest, _non_authorized_config__WEBPACK_IMPORTED_MODULE_4__["GUEST_ROUTES"].external], routeConfig);
                    break;
                case _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_2__["LoginState"].DONE:
                    _this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_3__["ROLES"].patron, _sections_section_config__WEBPACK_IMPORTED_MODULE_5__["PATRON_ROUTES"].dashboard], routeConfig);
                    break;
            }
        });
    };
    StartupPage.prototype.loginUser = function (useBiometric) {
        try {
            this.identityFacadeService.loginUser(useBiometric);
        }
        catch (e) {
            console.log('loginUser error: ', e);
        }
    };
    StartupPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-startup',
            template: __webpack_require__(/*! ./startup.page.html */ "./src/app/non-authorized/pages/startup/startup.page.html"),
            styles: [__webpack_require__(/*! ./startup.page.scss */ "./src/app/non-authorized/pages/startup/startup.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_2__["IdentityFacadeService"],
            _core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_8__["AuthFacadeService"]])
    ], StartupPage);
    return StartupPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-startup-startup-module.js.map