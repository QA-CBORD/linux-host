(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-institutions-institutions-module"],{

/***/ "./src/app/core/facades/native-startup/native-startup.facade.service.ts":
/*!******************************************************************************!*\
  !*** ./src/app/core/facades/native-startup/native-startup.facade.service.ts ***!
  \******************************************************************************/
/*! exports provided: NativeStartupFacadeService, startupButtons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NativeStartupFacadeService", function() { return NativeStartupFacadeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startupButtons", function() { return startupButtons; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_classes_service_state_facade__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/classes/service-state-facade */ "./src/app/core/classes/service-state-facade.ts");
/* harmony import */ var _core_states_storage_storage_state_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/states/storage/storage-state.service */ "./src/app/core/states/storage/storage-state.service.ts");
/* harmony import */ var _core_service_native_startup_api_native_startup_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/service/native-startup-api/native-startup-api.service */ "./src/app/core/service/native-startup-api/native-startup-api.service.ts");
/* harmony import */ var _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");









var NativeStartupFacadeService = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](NativeStartupFacadeService, _super);
    function NativeStartupFacadeService(nativeStartupApiService, storageStateService) {
        var _this = _super.call(this) || this;
        _this.nativeStartupApiService = nativeStartupApiService;
        _this.storageStateService = storageStateService;
        _this.ttl = 600000; // 10min
        _this.digestKey = 'get_nativeStartupMessageDigest';
        return _this;
    }
    NativeStartupFacadeService.prototype.fetchNativeStartupInfo = function (institutionId, sessionId, useSessionId) {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(_capacitor_core__WEBPACK_IMPORTED_MODULE_8__["Device"].getInfo()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (deviceInfo) {
            if (deviceInfo.platform === 'web') {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
            }
            Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(_this.nativeStartupApiService.nativeStartup(institutionId, 'android', sessionId, useSessionId), _this.storageStateService.getStateEntityByKey$(_this.digestKey)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
                var NativeStartupInfo = _a[0], cachedDigest = _a[1];
                // the service call will return null if there is no Native Startup Message
                if (NativeStartupInfo != null) {
                    if (NativeStartupInfo.minSupportedVersionFailure === 1) {
                        return _this.displayMessageToUser(NativeStartupInfo.minSupportedVersionFailure, NativeStartupInfo.action === 'block', NativeStartupInfo.messageTitle, NativeStartupInfo.message);
                    }
                    else {
                        if (NativeStartupInfo.showMessage === 1) {
                            if (NativeStartupInfo.showOnce === 1) {
                                if (NativeStartupInfo.messageDigest != cachedDigest.value) {
                                    _this.storageStateService.updateStateEntity(_this.digestKey, NativeStartupInfo.messageDigest, _this.ttl);
                                    return _this.displayMessageToUser(NativeStartupInfo.minSupportedVersionFailure, NativeStartupInfo.action === 'block', NativeStartupInfo.messageTitle, NativeStartupInfo.message);
                                }
                            }
                            else {
                                return _this.displayMessageToUser(NativeStartupInfo.minSupportedVersionFailure, NativeStartupInfo.action === 'block', NativeStartupInfo.messageTitle, NativeStartupInfo.message);
                            }
                        }
                    }
                }
            }));
        }));
    };
    NativeStartupFacadeService.prototype.displayMessageToUser = function (isMinVersionFailure, isBlocking, title, message) {
        var arrOfBtns = [];
        var positiveButtonText = isMinVersionFailure
            ? startupButtons['update']
            : isBlocking
                ? startupButtons['closeApp']
                : startupButtons['ok'];
        var isNegativeButtonVisible = isMinVersionFailure && !isBlocking;
        var negativeButtonText = startupButtons['notNow'];
        arrOfBtns.push(positiveButtonText);
        isNegativeButtonVisible && arrOfBtns.push(negativeButtonText);
        return {
            title: title,
            message: message,
            arrOfBtns: arrOfBtns,
        };
    };
    NativeStartupFacadeService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_service_native_startup_api_native_startup_api_service__WEBPACK_IMPORTED_MODULE_6__["NativeStartupApiService"],
            _core_states_storage_storage_state_service__WEBPACK_IMPORTED_MODULE_5__["StorageStateService"]])
    ], NativeStartupFacadeService);
    return NativeStartupFacadeService;
}(_core_classes_service_state_facade__WEBPACK_IMPORTED_MODULE_4__["ServiceStateFacade"]));

var startupButtons = {
    update: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_7__["buttons"].OKAY, { label: 'Update' }),
    closeApp: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_7__["buttons"].CANCEL, { label: 'Close app' }),
    ok: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_7__["buttons"].OKAY, { label: 'Ok' }),
    notNow: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_7__["buttons"].CANCEL, { label: 'Not now' }),
};


/***/ }),

/***/ "./src/app/core/service/native-startup-api/native-startup-api.service.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/core/service/native-startup-api/native-startup-api.service.ts ***!
  \*******************************************************************************/
/*! exports provided: NativeStartupApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NativeStartupApiService", function() { return NativeStartupApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/interceptors/query-config.model */ "./src/app/core/interceptors/query-config.model.ts");







var Device = _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["Plugins"].Device, Capacitor = _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["Plugins"].Capacitor;
var NativeStartupApiService = /** @class */ (function () {
    function NativeStartupApiService(http) {
        this.http = http;
        this.serviceUrl = '/json/configuration';
    }
    NativeStartupApiService.prototype.nativeStartup = function (institutionId, clientType, sessionId, useSessionId) {
        var _this = this;
        if (clientType === void 0) { clientType = Capacitor.platform; }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(Device.getInfo()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (_a) {
            var appVersion = _a.appVersion;
            var params = {
                institutionId: institutionId,
                clientType: clientType,
                clientVersion: appVersion || 2,
            };
            var useSession = useSessionId === false ? useSessionId : true;
            if (sessionId) {
                params = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, params, { sessionId: sessionId });
            }
            var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_6__["RPCQueryConfig"]('nativeStartup', params, useSession);
            return _this.http.post(_this.serviceUrl, queryConfig);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    NativeStartupApiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"]])
    ], NativeStartupApiService);
    return NativeStartupApiService;
}());



/***/ }),

/***/ "./src/app/non-authorized/pages/institutions/institutions.module.ts":
/*!**************************************************************************!*\
  !*** ./src/app/non-authorized/pages/institutions/institutions.module.ts ***!
  \**************************************************************************/
/*! exports provided: InstitutionsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstitutionsPageModule", function() { return InstitutionsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _institutions_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./institutions.page */ "./src/app/non-authorized/pages/institutions/institutions.page.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _search_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./search.pipe */ "./src/app/non-authorized/pages/institutions/search.pipe.ts");









var routes = [
    {
        path: '',
        component: _institutions_page__WEBPACK_IMPORTED_MODULE_6__["InstitutionsPage"],
    },
];
var InstitutionsPageModule = /** @class */ (function () {
    function InstitutionsPageModule() {
    }
    InstitutionsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"], _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_7__["StHeaderModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)],
            declarations: [_institutions_page__WEBPACK_IMPORTED_MODULE_6__["InstitutionsPage"], _search_pipe__WEBPACK_IMPORTED_MODULE_8__["SearchPipe"]],
        })
    ], InstitutionsPageModule);
    return InstitutionsPageModule;
}());



/***/ }),

/***/ "./src/app/non-authorized/pages/institutions/institutions.page.html":
/*!**************************************************************************!*\
  !*** ./src/app/non-authorized/pages/institutions/institutions.page.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header class=\"institutions-header\" no-border>\r\n  <ion-toolbar mode=\"ios\" class=\"institutions-header__nav-toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button\r\n        class=\"institutions-header__back-btn\"\r\n        color=\"dark\"\r\n        text=\"Back\"\r\n        icon=\"ios-arrow-back\"\r\n        mode=\"ios\"\r\n      ></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title class=\"institutions-header__title\">Select Institution</ion-title>\r\n  </ion-toolbar>\r\n\r\n  <ion-toolbar class=\"institutions-header__toolbar\">\r\n    <ion-searchbar\r\n      (ionChange)=\"onSearchedValue($event)\"\r\n      (keyup.enter)=\"onEnterKeyClicked()\"\r\n      placeholder=\"Search...\"\r\n      type=\"text\"\r\n      debounce=\"500\"\r\n      mode=\"ios\"\r\n      class=\"institutions-header__searchbar\"\r\n    ></ion-searchbar>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"search-institutions\">\r\n  <ng-container *ngIf=\"isLoading; then skeleton; else institutionsList\"></ng-container>\r\n</ion-content>\r\n<ion-footer class=\"search-institutions__footer\" mode=\"ios\"></ion-footer>\r\n\r\n<ng-template #skeleton>\r\n  <ion-list class=\"search-institutions__list\" mode=\"ios\">\r\n    <div class=\"search-institutions__skeleton-item\" *ngFor=\"let i of [0,0,0,0,0,0,0,0,0]\">\r\n      <ion-skeleton-text animated class=\"search-institutions__skeleton-text\"></ion-skeleton-text>\r\n    </div>\r\n  </ion-list>\r\n</ng-template>\r\n\r\n<ng-template #institutionsList>\r\n  <ion-list class=\"search-institutions__list\" mode=\"ios\">\r\n    <ion-item\r\n      detail\r\n      button=\"true\"\r\n      class=\"search-institutions__item\"\r\n      *ngFor=\"let item of institutions | search : searchString\"\r\n      lines=\"none\"\r\n      (click)=\"selectInstitution(item.id)\"\r\n    >\r\n      <ion-label class=\"search-institutions__name\">\r\n        {{ item.name }}\r\n      </ion-label>\r\n    </ion-item>\r\n  </ion-list>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/non-authorized/pages/institutions/institutions.page.scss":
/*!**************************************************************************!*\
  !*** ./src/app/non-authorized/pages/institutions/institutions.page.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.institutions-header {\n  position: relative; }\n.institutions-header.header-md:after {\n    background-image: none; }\n.institutions-header__nav-toolbar {\n    --min-height: 27px;\n    --padding-bottom: 0;\n    --padding-top: 0; }\n@media (min-width: 1024px) {\n      .institutions-header__nav-toolbar {\n        display: none; } }\n.institutions-header__toolbar {\n    --padding-bottom: 0;\n    --padding-top: 0; }\n.institutions-header__toolbar:last-child {\n      --border-width: 0; }\n.institutions-header__back-btn {\n    --icon-font-size: 18px;\n    --margin-start: 10px;\n    --icon-padding-end: 5px;\n    font-size: 16px;\n    font-family: \"Nunito Regular\", arial, sans-serif; }\n.institutions-header__title {\n    width: 100%;\n    font-size: 20px;\n    font-family: \"Nunito Bold\", arial, sans-serif; }\n.institutions-header ion-back-button {\n    display: block;\n    --icon-font-size: 25px; }\n.institutions-header__nav-toolbar {\n    box-shadow: 0px 2px 26px rgba(0, 0, 0, 0.12), 0px 0px 12px rgba(0, 0, 0, 0.04);\n    z-index: 99;\n    --min-height: 90px;\n    margin-bottom: 25px; }\n.institutions-header__toolbar {\n    position: absolute;\n    top: 65px;\n    z-index: 99;\n    width: 90%;\n    border-radius: 8px;\n    border: 1px solid #e3e3e3;\n    height: 50px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto; }\n.institutions-header__searchbar {\n    --background: $color-white;\n    padding: 0 0 5px 0; }\n.search-institutions__list {\n  margin: 0 0 40px 0; }\n.search-institutions__item {\n  --padding-start: 0;\n  --inner-padding-end: 0;\n  display: -webkit-box;\n  display: flex;\n  height: 60px;\n  margin: 0 15px;\n  border-bottom: 1px solid #f3f3f3; }\n.search-institutions__name {\n  font-size: 16px;\n  font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.search-institutions__footer {\n  position: absolute;\n  bottom: 0px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n  -webkit-box-align: center;\n          align-items: center;\n  min-height: 60px;\n  background: -webkit-gradient(linear, left top, left bottom, from(#ffffff00), to(#fff));\n  background: linear-gradient(to bottom, #ffffff00, #fff); }\n.search-institutions__skeleton-item {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-left: 15px;\n  height: 60px; }\n.search-institutions__skeleton-text {\n  height: 20px;\n  width: 220px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbm9uLWF1dGhvcml6ZWQvcGFnZXMvaW5zdGl0dXRpb25zL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL25vbi1hdXRob3JpemVkL3BhZ2VzL2luc3RpdHV0aW9ucy9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcbm9uLWF1dGhvcml6ZWRcXHBhZ2VzXFxpbnN0aXR1dGlvbnNcXGluc3RpdHV0aW9ucy5wYWdlLnNjc3MiLCJzcmMvYXBwL25vbi1hdXRob3JpemVkL3BhZ2VzL2luc3RpdHV0aW9ucy9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9ub2RlX21vZHVsZXNcXGJyZWFrcG9pbnQtc2Fzc1xcc3R5bGVzaGVldHNcXF9icmVha3BvaW50LnNjc3MiLCJzcmMvYXBwL25vbi1hdXRob3JpemVkL3BhZ2VzL2luc3RpdHV0aW9ucy9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX2NvbW1vbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUFBO0FBQ0E7RUFDRSxjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG1DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsZ0JBQUE7RUFDQSw4QkFBc0I7RUFDdEIsdUNBQTBCO0VBQzFCLHVDQUErQjtFQUMvQixpREFBbUM7RUFDbkMsb0NBQTRCO0VBQzVCLG1DQUEyQjtFQUUzQixlQUFBO0VBQ0EsNkJBQXFCO0VBQ3JCLHNDQUF5QjtFQUN6QixzQ0FBOEI7RUFDOUIsZ0RBQWtDO0VBQ2xDLG1DQUEyQjtFQUMzQixrQ0FBMEI7RUFFMUIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLG1DQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsV0FBQTtFQUNBLHlCQUFpQjtFQUNqQixnQ0FBcUI7RUFDckIsa0NBQTBCO0VBQzFCLDRDQUE4QjtFQUM5QiwrQkFBdUI7RUFDdkIsOEJBQXNCO0VBRXRCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIscUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixZQUFBO0VBQ0EsMEJBQWtCO0VBQ2xCLG9DQUFzQjtFQUN0QixtQ0FBMkI7RUFDM0IsdUNBQStCO0VBQy9CLGdDQUF3QjtFQUN4QiwrQkFBdUIsRUFBQTtBQ3RFekI7RUEyQ0Usa0JBQWtCLEVBQUE7QUEzQ3BCO0lBRUksc0JBQXNCLEVBQUE7QUFHeEI7SUFDRSxrQkFBYTtJQUNiLG1CQUFpQjtJQUNqQixnQkFBYyxFQUFBO0FDc0RkO01EekRGO1FBTUksYUFBYSxFQUFBLEVBRWhCO0FBRUQ7SUFDRSxtQkFBaUI7SUFDakIsZ0JBQWMsRUFBQTtBQUZmO01BS0csaUJBQWUsRUFBQTtBQUluQjtJQUNFLHNCQUFpQjtJQUNqQixvQkFBZTtJQUNmLHVCQUFtQjtJRTVCckIsZUY4Qm1DO0lFMUJuQyxnREgwRXVELEVBQUE7QUM3Q3ZEO0lBQ0UsV0FBVztJRWxDYixlRm9DaUM7SUVoQ2pDLDZDSDRFa0QsRUFBQTtBQy9FcEQ7SUF1Q0ksY0FBYztJQUNkLHNCQUFpQixFQUFBO0FBSW5CO0lBQ0UsOEVBQThFO0lBQzlFLFdBQVc7SUFDWCxrQkFBYTtJQUNiLG1CQUFtQixFQUFBO0FBR3JCO0lBQ0Usa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCxXQUFXO0lBQ1gsVUFBVTtJQUNWLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsWUFBWTtJQUNaLE9BQU87SUFDUCxRQUFRO0lBQ1IsaUJBQWlCO0lBQ2pCLGtCQUFrQixFQUFBO0FBR3BCO0lBQ0UsMEJBQWE7SUFDYixrQkFBa0IsRUFBQTtBQUlwQjtFQUNFLGtCQUFrQixFQUFBO0FBR3BCO0VBQ0Usa0JBQWdCO0VBQ2hCLHNCQUFvQjtFQUVwQixvQkFBYTtFQUFiLGFBQWE7RUFDYixZQUFZO0VBQ1osY0FBYztFQUNkLGdDRGV1QixFQUFBO0FDWnpCO0VFdEZBLGVGdUZvQztFRW5GcEMsaURIMkV5RCxFQUFBO0FDV3pEO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxvQkFBYTtFQUFiLGFBQWE7RUFDYiw4QkFBNkI7VUFBN0IsNkJBQTZCO0VBQzdCLHlCQUFtQjtVQUFuQixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLHNGQUErRDtFQUEvRCx1REFBK0QsRUFBQTtBQUkvRDtFQUNFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHlCQUFtQjtVQUFuQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLFlBQVksRUFBQTtBQUdkO0VBQ0UsWUFBWTtFQUNaLFlBQVksRUFBQSIsImZpbGUiOiJzcmMvYXBwL25vbi1hdXRob3JpemVkL3BhZ2VzL2luc3RpdHV0aW9ucy9pbnN0aXR1dGlvbnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXHJcbjpyb290IHtcclxuICAvKiogcHJpbWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMDA1Y2I5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiAwLCA5MiwgMTg1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzAwNTFhMztcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XHJcblxyXG4gIC8qKiBzZWNvbmRhcnkgKiovXHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5OiAjMGNkMWU4O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDEyLCAyMDksIDIzMjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMwYmI4Y2M7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XHJcblxyXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2I6IDExMiwgNjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM2MzNjZTA7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcclxuXHJcbiAgLyoqIHN1Y2Nlc3MgKiovXHJcbiAgLS1pb24tY29sb3Itc3VjY2VzczogIzEwZGM2MDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcclxuXHJcbiAgLyoqIHdhcm5pbmcgKiovXHJcbiAgLS1pb24tY29sb3Itd2FybmluZzogI2ZmY2UwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAyMDYsIDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBiNTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcclxuXHJcbiAgLyoqIGRhbmdlciAqKi9cclxuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXJnYjogMjQ1LCA2MSwgNjE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlOiAjZDMzOTM5O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xyXG5cclxuICAvKiogZGFyayAqKi9cclxuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcclxuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XHJcblxyXG4gIC8qKiBtZWRpdW0gKiovXHJcbiAgLS1pb24tY29sb3ItbWVkaXVtOiAjOTg5YWEyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE1MiwgMTU0LCAxNjI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODY4ODhmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xyXG5cclxuICAvKiogbGlnaHQgKiovXHJcbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtcmdiOiAyNDQsIDI0NCwgMjQ0O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1zaGFkZTogI2Q3ZDhkYTtcclxuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xyXG5cclxuICAvLyAtLWlvbi1ncmlkLXdpZHRoLXNtOiAwcHg7XHJcbn1cclxuXHJcbi8vIEZPTlRTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJGZvbnQtbnVuaXRvLXJlZ3VsYXI6ICdOdW5pdG8gUmVndWxhcicsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8tc2VtaWJvbGQ6ICdOdW5pdG8gU2VtaUJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLWhlYXZ5OiAnTnVuaXRvIEJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuXHJcbi8vIENPTE9SU1xyXG5cclxuJGNvbG9yLXZlcnktbGlnaHQtZ3JheTogI2NjYztcclxuJGNvbG9yLWxpbmstd2F0ZXI6ICNkNGQ2ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZTllOWU5O1xyXG4kY29sb3ItZGFyay1ncmF5OiAjYWFhO1xyXG4kY29sb3ItZHVzdHktZ3JheTogIzk3OTc5NztcclxuJGNvbG9yLWRpbS1ncmF5OiAjNmU2ZTZlO1xyXG4kY29sb3Itc29saXR1ZGU6ICNFQ0YxRjg7XHJcbiRjb2xvci1uaWdodC1yaWRlcjogIzMzMztcclxuJGNvbG9yLW5hdnktYmx1ZTogIzAwNTZlNjtcclxuJGNvbG9yLWRlbmltOiAjMTM2MGUwO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWU6ICMxNjZkZmY7XHJcbiRjb2xvci1kb2RnZXItYmx1ZS1saWdodGVyOiAjMmQ3Y2ZmO1xyXG4kY29sb3Itd2hpdGU6ICNmZmY7XHJcbiRjb2xvci1ibGFjazogIzAwMDtcclxuJGNvbG9yLXdoaXRlLXNtb2tlOiAjZjNmM2YzO1xyXG4kY29sb3ItZGVlcC1za3ktYmx1ZTogIzAwYTBmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjOGJiN2ZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4OGM4ZmY7XHJcbiRjb2xvci1zdHJvbmctYmx1ZTogIzAwNDNiMztcclxuJGNvbG9yLWFsaWNlLWJsdWU6ICNmMGYzZjU7XHJcbiRjb2xvci1zaWx2ZXI6ICNjNGM0YzQ7XHJcbiRjb2xvci1tYXR0ZXJob3JuOiAjNTE1MTUxO1xyXG4kY29sb3ItdmVyeS1kYXJrLWdyYXk6ICM2MjYyNjI7XHJcbiRjb2xvci1tZXJjdXJ5OiAjZTdlN2U3O1xyXG4kY29sb3ItbGlnaHQtZ3JheTogI2Q4ZDhkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlYmViZWI7XHJcbiRjb2xvci1hbGl6YXJpbjogI2UyMjk0MjtcclxuJGNvbG9yLWZsYW1lLXJlZDogIzg4MTkyODtcclxuJGNvbG9yLWNoYXJjb2FsOiAjNDY0NjQ2O1xyXG4kY29sb3ItZGVlcC1zZWE6ICMxNDdkNjM7XHJcbiRjb2xvci1jYXJkaW5hbDogI2I1MjEzNTtcclxuJGNvbG9yLWdvZC1ncmF5OiAjMTYxNjE2O1xyXG4kY29sb3ItaG90LWN1cnJ5OiAjN2M1ZDIzO1xyXG4kY29sb3ItY2FzYWJsYW5jYTogI2Y3YmE0NTtcclxuJGNvbG9yLWFsYWJhc3RlcjogI2Y3ZjdmNztcclxuJHBvcmNlbGFpbjogI2U2ZTllYjtcclxuJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U6ICNEMDQzMUE7XHJcbiRjb2xvci1wYXR0ZW5zLWJsdWU6ICNlMGUzZTU7XHJcblxyXG4vLy8gU2l6ZVxyXG4kYm90dG9tLW5hdmlnYXRpb24tYmFyLWhlaWdodDogNTBweDtcclxuIiwiQGltcG9ydCAndG9vbHMnO1xyXG5cclxuLmluc3RpdHV0aW9ucy1oZWFkZXIge1xyXG4gICYuaGVhZGVyLW1kOmFmdGVyIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XHJcbiAgfVxyXG5cclxuICAmX19uYXYtdG9vbGJhciB7XHJcbiAgICAtLW1pbi1oZWlnaHQ6IDI3cHg7XHJcbiAgICAtLXBhZGRpbmctYm90dG9tOiAwO1xyXG4gICAgLS1wYWRkaW5nLXRvcDogMDtcclxuXHJcbiAgICBAaW5jbHVkZSBicC1ncmlkLWRlc2t0b3Age1xyXG4gICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJl9fdG9vbGJhciB7XHJcbiAgICAtLXBhZGRpbmctYm90dG9tOiAwO1xyXG4gICAgLS1wYWRkaW5nLXRvcDogMDtcclxuXHJcbiAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICAtLWJvcmRlci13aWR0aDogMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICZfX2JhY2stYnRuIHtcclxuICAgIC0taWNvbi1mb250LXNpemU6IDE4cHg7XHJcbiAgICAtLW1hcmdpbi1zdGFydDogMTBweDtcclxuICAgIC0taWNvbi1wYWRkaW5nLWVuZDogNXB4O1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXJlZ3VsYXIoMTZweCk7XHJcbiAgfVxyXG5cclxuICAmX190aXRsZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgyMHB4KTtcclxuICB9XHJcblxyXG4gIGlvbi1iYWNrLWJ1dHRvbiB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIC0taWNvbi1mb250LXNpemU6IDI1cHg7XHJcbiAgfVxyXG5cclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgJl9fbmF2LXRvb2xiYXIge1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDJweCAyNnB4IHJnYmEoMCwgMCwgMCwgMC4xMiksIDBweCAwcHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMDQpO1xyXG4gICAgei1pbmRleDogOTk7XHJcbiAgICAtLW1pbi1oZWlnaHQ6IDkwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyNXB4O1xyXG4gIH1cclxuXHJcbiAgJl9fdG9vbGJhciB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDY1cHg7XHJcbiAgICB6LWluZGV4OiA5OTtcclxuICAgIHdpZHRoOiA5MCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTNlM2UzO1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgbGVmdDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbiAgfVxyXG5cclxuICAmX19zZWFyY2hiYXIge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAkY29sb3Itd2hpdGU7XHJcbiAgICBwYWRkaW5nOiAwIDAgNXB4IDA7XHJcbiAgfVxyXG59XHJcbi5zZWFyY2gtaW5zdGl0dXRpb25zIHtcclxuICAmX19saXN0IHtcclxuICAgIG1hcmdpbjogMCAwIDQwcHggMDtcclxuICB9XHJcblxyXG4gICZfX2l0ZW0ge1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xyXG4gICAgLS1pbm5lci1wYWRkaW5nLWVuZDogMDtcclxuXHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgaGVpZ2h0OiA2MHB4O1xyXG4gICAgbWFyZ2luOiAwIDE1cHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGNvbG9yLXdoaXRlLXNtb2tlO1xyXG4gIH1cclxuXHJcbiAgJl9fbmFtZSB7XHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1zZW1pYm9sZCgxNnB4KTtcclxuICB9XHJcblxyXG4gICZfX2Zvb3RlciB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBib3R0b206IDBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtaW4taGVpZ2h0OiA2MHB4O1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgI2ZmZmZmZjAwLCAkY29sb3Itd2hpdGUpO1xyXG4gIH1cclxuXHJcbiAgJl9fc2tlbGV0b24ge1xyXG4gICAgJi1pdGVtIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDE1cHg7XHJcbiAgICAgIGhlaWdodDogNjBweDtcclxuICAgIH1cclxuXHJcbiAgICAmLXRleHQge1xyXG4gICAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICAgIHdpZHRoOiAyMjBweDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBEZWZhdWx0IFZhcmlhYmxlc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kQnJlYWtwb2ludC1TZXR0aW5nczogKFxuICAnZGVmYXVsdCBtZWRpYSc6IGFsbCxcbiAgJ2RlZmF1bHQgZmVhdHVyZSc6IG1pbi13aWR0aCxcbiAgJ2RlZmF1bHQgcGFpcic6IHdpZHRoLFxuXG4gICdmb3JjZSBhbGwgbWVkaWEgdHlwZSc6IGZhbHNlLFxuICAndG8gZW1zJzogZmFsc2UsXG4gICd0cmFuc2Zvcm0gcmVzb2x1dGlvbnMnOiB0cnVlLFxuXG4gICdubyBxdWVyaWVzJzogZmFsc2UsXG4gICdubyBxdWVyeSBmYWxsYmFja3MnOiBmYWxzZSxcblxuICAnYmFzZSBmb250IHNpemUnOiAxNnB4LFxuXG4gICdsZWdhY3kgc3ludGF4JzogZmFsc2Vcbik7XG5cbiRicmVha3BvaW50OiAoKSAhZGVmYXVsdDtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBJbXBvcnRzXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbkBpbXBvcnQgXCJicmVha3BvaW50L3NldHRpbmdzXCI7XG5AaW1wb3J0ICdicmVha3BvaW50L2NvbnRleHQnO1xuQGltcG9ydCAnYnJlYWtwb2ludC9oZWxwZXJzJztcbkBpbXBvcnQgJ2JyZWFrcG9pbnQvcGFyc2Vycyc7XG5AaW1wb3J0ICdicmVha3BvaW50L25vLXF1ZXJ5JztcblxuQGltcG9ydCAnYnJlYWtwb2ludC9yZXNwb25kLXRvJztcblxuQGltcG9ydCBcImJyZWFrcG9pbnQvbGVnYWN5LXNldHRpbmdzXCI7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQnJlYWtwb2ludCBNaXhpblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbkBtaXhpbiBicmVha3BvaW50KCRxdWVyeSwgJG5vLXF1ZXJ5OiBmYWxzZSkge1xuICBAaW5jbHVkZSBsZWdhY3ktc2V0dGluZ3Mtd2FybmluZztcblxuICAvLyBSZXNldCBjb250ZXh0c1xuICBAaW5jbHVkZSBwcml2YXRlLWJyZWFrcG9pbnQtcmVzZXQtY29udGV4dHMoKTtcblxuICAkYnJlYWtwb2ludDogYnJlYWtwb2ludCgkcXVlcnksIGZhbHNlKTtcblxuICAkcXVlcnktc3RyaW5nOiBtYXAtZ2V0KCRicmVha3BvaW50LCAncXVlcnknKTtcbiAgJHF1ZXJ5LWZhbGxiYWNrOiBtYXAtZ2V0KCRicmVha3BvaW50LCAnZmFsbGJhY2snKTtcblxuICAkcHJpdmF0ZS1icmVha3BvaW50LWNvbnRleHQtaG9sZGVyOiBtYXAtZ2V0KCRicmVha3BvaW50LCAnY29udGV4dCBob2xkZXInKSAhZ2xvYmFsO1xuICAkcHJpdmF0ZS1icmVha3BvaW50LXF1ZXJ5LWNvdW50OiBtYXAtZ2V0KCRicmVha3BvaW50LCAncXVlcnkgY291bnQnKSAhZ2xvYmFsO1xuXG4gIC8vIEFsbG93IGZvciBhbiBhcy1uZWVkZWQgb3ZlcnJpZGUgb3IgdXNhZ2Ugb2Ygbm8gcXVlcnkgZmFsbGJhY2suXG4gIEBpZiAkbm8tcXVlcnkgIT0gZmFsc2Uge1xuICAgICRxdWVyeS1mYWxsYmFjazogJG5vLXF1ZXJ5O1xuICB9XG5cbiAgQGlmICRxdWVyeS1mYWxsYmFjayAhPSBmYWxzZSB7XG4gICAgJGNvbnRleHQtc2V0dGVyOiBwcml2YXRlLWJyZWFrcG9pbnQtc2V0LWNvbnRleHQoJ25vLXF1ZXJ5JywgJHF1ZXJ5LWZhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFByaW50IE91dCBRdWVyeSBTdHJpbmdcbiAgQGlmIG5vdCBicmVha3BvaW50LWdldCgnbm8gcXVlcmllcycpIHtcbiAgICBAbWVkaWEgI3skcXVlcnktc3RyaW5nfSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cblxuICBAaWYgYnJlYWtwb2ludC1nZXQoJ25vIHF1ZXJ5IGZhbGxiYWNrcycpICE9IGZhbHNlIG9yIGJyZWFrcG9pbnQtZ2V0KCdubyBxdWVyaWVzJykgPT0gdHJ1ZSB7XG5cbiAgICAkdHlwZTogdHlwZS1vZihicmVha3BvaW50LWdldCgnbm8gcXVlcnkgZmFsbGJhY2tzJykpO1xuICAgICRwcmludDogZmFsc2U7XG5cbiAgICBAaWYgKCR0eXBlID09ICdib29sJykge1xuICAgICAgJHByaW50OiB0cnVlO1xuICAgIH1cbiAgICBAZWxzZSBpZiAoJHR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgIEBpZiAkcXVlcnktZmFsbGJhY2sgPT0gYnJlYWtwb2ludC1nZXQoJ25vIHF1ZXJ5IGZhbGxiYWNrcycpIHtcbiAgICAgICAgJHByaW50OiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBAZWxzZSBpZiAoJHR5cGUgPT0gJ2xpc3QnKSB7XG4gICAgICBAZWFjaCAkd3JhcHBlciBpbiBicmVha3BvaW50LWdldCgnbm8gcXVlcnkgZmFsbGJhY2tzJykge1xuICAgICAgICBAaWYgJHF1ZXJ5LWZhbGxiYWNrID09ICR3cmFwcGVyIHtcbiAgICAgICAgICAkcHJpbnQ6IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXcml0ZSBGYWxsYmFja1xuICAgIEBpZiAoJHF1ZXJ5LWZhbGxiYWNrICE9IGZhbHNlKSBhbmQgKCRwcmludCA9PSB0cnVlKSB7XG4gICAgICAkdHlwZS1mYWxsYmFjazogdHlwZS1vZigkcXVlcnktZmFsbGJhY2spO1xuXG4gICAgICBAaWYgKCR0eXBlLWZhbGxiYWNrICE9ICdib29sJykge1xuICAgICAgICAjeyRxdWVyeS1mYWxsYmFja30gJiB7XG4gICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEBlbHNlIHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQGluY2x1ZGUgcHJpdmF0ZS1icmVha3BvaW50LXJlc2V0LWNvbnRleHRzKCk7XG59XG5cblxuQG1peGluIG1xKCRxdWVyeSwgJG5vLXF1ZXJ5OiBmYWxzZSkge1xuICBAaW5jbHVkZSBicmVha3BvaW50KCRxdWVyeSwgJG5vLXF1ZXJ5KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cbiIsIkBtaXhpbiBmb250LXNpemUoJGZvbnQtc2l6ZSkge1xyXG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtZmFtaWx5KCRmb250LWZhbWlseSkge1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1yZWd1bGFyKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXJlZ3VsYXIpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tc2VtaWJvbGQoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tc2VtaWJvbGQpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8taGVhdnkoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8taGVhdnkpO1xyXG59XHJcblxyXG5AbWl4aW4gbGluay1jb2xvcigkY29sb3IpIHtcclxuICBjb2xvcjogJGNvbG9yO1xyXG5cclxuICAmOmxpbmssXHJcbiAgJjp2aXNpdGVkLFxyXG4gICY6Zm9jdXMsXHJcbiAgJjpob3ZlcixcclxuICAmOmFjdGl2ZSB7XHJcbiAgICBjb2xvcjogJGNvbG9yO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGhvdmVyIHtcclxuICAmOmhvdmVyLFxyXG4gICY6Zm9jdXMge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZGlzYWJsZWQge1xyXG4gICYuZGlzYWJsZWQsXHJcbiAgJi5kaXNhYmxlZDpmb2N1cyxcclxuICAmLmRpc2FibGVkOmhvdmVyLFxyXG4gICZbZGlzYWJsZWRdLFxyXG4gICZbZGlzYWJsZWRdOmZvY3VzLFxyXG4gICZbZGlzYWJsZWRdOmhvdmVyIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGVsbGlwc2lzIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxuXHJcbkBtaXhpbiBmbG9hdGluZy1sYWJlbCgkY29sb3IpIHtcclxuICBmb250LXNpemU6IDc1JTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDE1JSwgLTUwJSwgMCk7XHJcbiAgb3BhY2l0eTogMTtcclxuICBiYWNrZ3JvdW5kOiAkY29sb3Itd2hpdGU7XHJcbiAgcGFkZGluZzogMCAzcHg7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24oKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci13aGl0ZTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi5zdmcnKTtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICByaWdodDogMTVweDtcclxuICAgIHdpZHRoOiAxNHB4O1xyXG4gICAgaGVpZ2h0OiA5cHg7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWFjdGl2ZSgpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWFjdGl2ZS5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1lcnJvcigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWVycm9yLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/non-authorized/pages/institutions/institutions.page.ts":
/*!************************************************************************!*\
  !*** ./src/app/non-authorized/pages/institutions/institutions.page.ts ***!
  \************************************************************************/
/*! exports provided: InstitutionsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstitutionsPage", function() { return InstitutionsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_facades_institution_institution_facade_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/facades/institution/institution.facade.service */ "./src/app/core/facades/institution/institution.facade.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _non_authorized_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../non-authorized.config */ "./src/app/non-authorized/non-authorized.config.ts");
/* harmony import */ var src_app_app_global__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.global */ "./src/app/app.global.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _core_facades_native_startup_native_startup_facade_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/facades/native-startup/native-startup.facade.service */ "./src/app/core/facades/native-startup/native-startup.facade.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _shared_ui_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @shared/ui-components */ "./src/app/shared/ui-components/index.ts");
/* harmony import */ var _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @core/facades/auth/auth.facade.service */ "./src/app/core/facades/auth/auth.facade.service.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../environment */ "./src/app/environment.ts");
/* harmony import */ var _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @core/facades/identity/identity.facade.service */ "./src/app/core/facades/identity/identity.facade.service.ts");


















var Keyboard = _capacitor_core__WEBPACK_IMPORTED_MODULE_14__["Plugins"].Keyboard, IOSDevice = _capacitor_core__WEBPACK_IMPORTED_MODULE_14__["Plugins"].IOSDevice;
var InstitutionsPage = /** @class */ (function () {
    function InstitutionsPage(institutionFacadeService, settingsFacadeService, nativeStartupFacadeService, authFacadeService, loadingService, identityFacadeService, popoverCtrl, nav, cdRef) {
        this.institutionFacadeService = institutionFacadeService;
        this.settingsFacadeService = settingsFacadeService;
        this.nativeStartupFacadeService = nativeStartupFacadeService;
        this.authFacadeService = authFacadeService;
        this.loadingService = loadingService;
        this.identityFacadeService = identityFacadeService;
        this.popoverCtrl = popoverCtrl;
        this.nav = nav;
        this.cdRef = cdRef;
        this.sessionId = null;
        this.searchString = '';
        this.isLoading = true;
    }
    InstitutionsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.authFacadeService
            .getAuthSessionToken$()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (sessionId) { return (_this.sessionId = sessionId); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (sessionId) { return _this.institutionFacadeService.retrieveLookupList$(sessionId); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1))
            .subscribe(function (institutions) {
            _this.institutions = institutions;
            _this.isLoading = false;
            _this.cdRef.markForCheck();
        });
        this.setNativeEnvironment();
    };
    InstitutionsPage.prototype.onEnterKeyClicked = function () {
        Keyboard.hide();
    };
    InstitutionsPage.prototype.onSearchedValue = function (_a) {
        var value = _a.target.value;
        this.searchString = value;
    };
    InstitutionsPage.prototype.selectInstitution = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingService.showSpinner()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.identityFacadeService.logoutUser()];
                    case 2:
                        _a.sent();
                        this.settingsFacadeService.cleanCache();
                        return [4 /*yield*/, Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["zip"])(this.settingsFacadeService.fetchSettingList(src_app_app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].SettingList.FEATURES, this.sessionId, id), this.settingsFacadeService.getSettings([src_app_app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.MOBILE_HEADER_COLOR, src_app_app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.FEEDBACK_EMAIL], this.sessionId, id), this.institutionFacadeService.getInstitutionInfo$(id, this.sessionId, true), this.settingsFacadeService.getSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.PIN_ENABLED, this.sessionId, id))
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function () { return _this.identityFacadeService.determineInstitutionSelectionLoginState(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (loginState) {
                                console.log('Login State:', loginState);
                                return _this.nativeStartupFacadeService.fetchNativeStartupInfo(id, _this.sessionId, false).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (startupInfoConfig) { return ({
                                    loginState: loginState,
                                    startupInfoConfig: startupInfoConfig,
                                }); }));
                            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
                                if (data && data['startupInfoConfig']) {
                                    var _a = data['startupInfoConfig'], title = _a.title, message = _a.message, arrOfBtns = _a.arrOfBtns;
                                    _this.initModal(title, message, arrOfBtns, _this.redirectToTheStore.bind(_this));
                                }
                                switch (data['loginState']) {
                                    case _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_17__["LoginState"].HOSTED:
                                        _this.nav.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_6__["ROLES"].guest, _non_authorized_config__WEBPACK_IMPORTED_MODULE_5__["GUEST_ROUTES"].login]);
                                        break;
                                    case _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_17__["LoginState"].EXTERNAL:
                                        _this.nav.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_6__["ROLES"].guest, _non_authorized_config__WEBPACK_IMPORTED_MODULE_5__["GUEST_ROUTES"].external]);
                                        break;
                                }
                            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1))
                                .toPromise()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loadingService.closeSpinner()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InstitutionsPage.prototype.initModal = function (title, message, buttons, onSuccessCb) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: _shared_ui_components__WEBPACK_IMPORTED_MODULE_10__["StGlobalPopoverComponent"],
                            componentProps: {
                                data: {
                                    title: title,
                                    message: message,
                                    buttons: buttons,
                                },
                            },
                            animated: false,
                            backdropDismiss: true,
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (_a) {
                            var role = _a.role;
                            role === _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_11__["BUTTON_TYPE"].OKAY && onSuccessCb();
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InstitutionsPage.prototype.redirectToTheStore = function () {
        _capacitor_core__WEBPACK_IMPORTED_MODULE_14__["Device"].getInfo()
            .then(function (deviceInfo) {
            if (deviceInfo.platform === 'ios') {
                window.open('itms-apps://itunes.apple.com/app/id844091049');
            }
            else if (deviceInfo.platform === 'android') {
                window.open('https://play.google.com/store/apps/details?id=com.cbord.get');
            }
        })
            .catch(function (reason) {
            console.log('Inst Page - error redirecting to app store', reason);
        });
    };
    InstitutionsPage.prototype.setNativeEnvironment = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(_capacitor_core__WEBPACK_IMPORTED_MODULE_14__["Capacitor"].platform === 'ios')) return [3 /*break*/, 2];
                        return [4 /*yield*/, IOSDevice.setEnvironment({ env: _environment__WEBPACK_IMPORTED_MODULE_16__["Environment"].currentEnvironment })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    InstitutionsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-institutions',
            template: __webpack_require__(/*! ./institutions.page.html */ "./src/app/non-authorized/pages/institutions/institutions.page.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./institutions.page.scss */ "./src/app/non-authorized/pages/institutions/institutions.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_facades_institution_institution_facade_service__WEBPACK_IMPORTED_MODULE_2__["InstitutionFacadeService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_15__["SettingsFacadeService"],
            _core_facades_native_startup_native_startup_facade_service__WEBPACK_IMPORTED_MODULE_8__["NativeStartupFacadeService"],
            _core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_13__["AuthFacadeService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_12__["LoadingService"],
            _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_17__["IdentityFacadeService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["PopoverController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], InstitutionsPage);
    return InstitutionsPage;
}());



/***/ }),

/***/ "./src/app/non-authorized/pages/institutions/search.pipe.ts":
/*!******************************************************************!*\
  !*** ./src/app/non-authorized/pages/institutions/search.pipe.ts ***!
  \******************************************************************/
/*! exports provided: SearchPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPipe", function() { return SearchPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SearchPipe = /** @class */ (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (value, term) {
        return value.filter(function (x) { return x.name.toLowerCase().includes(term.toLowerCase()); });
    };
    SearchPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({ name: 'search' })
    ], SearchPipe);
    return SearchPipe;
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
//# sourceMappingURL=pages-institutions-institutions-module.js.map