(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~dashboard-dashboard-module~secure-messaging-secure-message-module"],{

/***/ "./src/app/core/service/api-service/api.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/core/service/api-service/api.service.ts ***!
  \*********************************************************/
/*! exports provided: RestCallType, HttpResponseType, APIService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestCallType", function() { return RestCallType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpResponseType", function() { return HttpResponseType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APIService", function() { return APIService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs_internal_scheduler_async__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/internal/scheduler/async */ "./node_modules/rxjs/internal/scheduler/async.js");
/* harmony import */ var rxjs_internal_scheduler_async__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_scheduler_async__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var rxjs_internal_scheduler_queue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/internal/scheduler/queue */ "./node_modules/rxjs/internal/scheduler/queue.js");
/* harmony import */ var rxjs_internal_scheduler_queue__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_scheduler_queue__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var src_app_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/environment */ "./src/app/environment.ts");








var RestCallType;
(function (RestCallType) {
    RestCallType[RestCallType["get"] = 0] = "get";
    RestCallType[RestCallType["post"] = 1] = "post";
    RestCallType[RestCallType["put"] = 2] = "put";
})(RestCallType || (RestCallType = {}));
var HttpResponseType;
(function (HttpResponseType) {
    HttpResponseType[HttpResponseType["json"] = 0] = "json";
    HttpResponseType[HttpResponseType["text"] = 1] = "text";
})(HttpResponseType || (HttpResponseType = {}));
var APIService = /** @class */ (function () {
    function APIService(http) {
        this.http = http;
        this.TIMEOUT_MS = 45000;
    }
    /**
     *  GET call to AWS API Gateway
     *
     * @param url           URL of REST call
     * @param responseType  HTTP response type included in options
     * @param params        Parameters of REST call
     * @param headers       HTTP header information
     */
    APIService.prototype.get = function (url, responseType, params, headers) {
        if (responseType === void 0) { responseType = HttpResponseType.json; }
        var options = this.getOptions(responseType, params, headers);
        return this.http.get(url, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["subscribeOn"])(rxjs_internal_scheduler_async__WEBPACK_IMPORTED_MODULE_5__["async"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["observeOn"])(rxjs_internal_scheduler_queue__WEBPACK_IMPORTED_MODULE_6__["queue"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["timeout"])(this.TIMEOUT_MS));
    };
    /**
     *  PUT call to AWS API Gateway
     *
     * @param url           URL of REST call
     * @param body
     * @param responseType  HTTP response type included in options
     * @param params        Parameters of REST call
     * @param headers       HTTP header information
     */
    APIService.prototype.put = function (url, body, responseType, params, headers) {
        if (responseType === void 0) { responseType = HttpResponseType.json; }
        var options = this.getOptions(responseType, params, headers);
        return this.http.put(url, body, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["subscribeOn"])(rxjs_internal_scheduler_async__WEBPACK_IMPORTED_MODULE_5__["async"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["observeOn"])(rxjs_internal_scheduler_queue__WEBPACK_IMPORTED_MODULE_6__["queue"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["timeout"])(this.TIMEOUT_MS));
    };
    /**
     *  POST call to AWS API Gateway
     *
     * @param url           URL of REST call
     * @param body
     * @param responseType  Http response type included in options (text / json)
     * @param params        Parameters of REST call
     * @param headers       Http header information
     */
    APIService.prototype.post = function (url, body, responseType, params, headers) {
        if (responseType === void 0) { responseType = HttpResponseType.json; }
        var options = this.getOptions(responseType, params, headers);
        return this.http.post(url, body, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["subscribeOn"])(rxjs_internal_scheduler_async__WEBPACK_IMPORTED_MODULE_5__["async"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["observeOn"])(rxjs_internal_scheduler_queue__WEBPACK_IMPORTED_MODULE_6__["queue"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["timeout"])(this.TIMEOUT_MS));
    };
    /**
     * Call to REST backend (AWS API Gateway)
     *
     * @param callType      REST call type (post, put, get, etc)
     * @param resourceURL   URL of resource in API
     * @param responseType  Http response type (text / json)
     * @param body          Body of call
     * @param params        Parameters of call
     * @param headers       Http header information
     */
    APIService.prototype.authenticatedHTTPCall = function (callType, resourceURL, responseType, body, params, headers) {
        if (responseType === void 0) { responseType = HttpResponseType.json; }
        var finalURL = src_app_environment__WEBPACK_IMPORTED_MODULE_7__["Environment"].getSecureMessagingAPIURL().concat(resourceURL);
        var httpCall$;
        switch (callType) {
            case RestCallType.get:
                httpCall$ = this.get(finalURL, responseType, params, headers);
                break;
            case RestCallType.post:
                httpCall$ = this.post(finalURL, body, responseType, params, headers);
                break;
            case RestCallType.put:
                httpCall$ = this.put(finalURL, body, responseType, params, headers);
                break;
        }
        return httpCall$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])({ message: 'There was an issue with the request' }); }));
    };
    /**
   * Call to REST backend (Partner API Gateway)
   *
   * @param callType      REST call type (post, put, get, etc)
   * @param resourceURL   URL of resource in API
   * @param responseType  Http response type (text / json)
   * @param body          Body of call
   * @param params        Parameters of call
   * @param headers       Http header information
   */
    APIService.prototype.partnerHTTPCall = function (callType, resourceURL, responseType, body, params, headers) {
        if (responseType === void 0) { responseType = HttpResponseType.json; }
        var finalURL = src_app_environment__WEBPACK_IMPORTED_MODULE_7__["Environment"].getPartnerServicesURL().concat(resourceURL);
        var httpCall$;
        switch (callType) {
            case RestCallType.get:
                httpCall$ = this.get(finalURL, responseType, params, headers);
                break;
            case RestCallType.post:
                httpCall$ = this.post(finalURL, body, responseType, params, headers);
                break;
            case RestCallType.put:
                httpCall$ = this.put(finalURL, body, responseType, params, headers);
                break;
        }
        return httpCall$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])({ message: 'There was an issue with the request' }); }));
    };
    /**
     * Create options object for Rest http call
     *
     * @param responseType  Http response type included in options (text / json)
     * @param params        Parameters of REST call
     * @param headers       Http header information
     */
    APIService.prototype.getOptions = function (responseType, params, headers) {
        if (responseType === void 0) { responseType = HttpResponseType.json; }
        var options = { responseType: responseType === HttpResponseType.json ? 'json' : 'text' };
        if (params) {
            Object.assign(options, { params: params });
        }
        if (headers) {
            Object.assign(options, { headers: headers });
        }
        return options;
    };
    APIService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], APIService);
    return APIService;
}());



/***/ }),

/***/ "./src/app/sections/secure-messaging/secure-message-popover/index.ts":
/*!***************************************************************************!*\
  !*** ./src/app/sections/secure-messaging/secure-message-popover/index.ts ***!
  \***************************************************************************/
/*! exports provided: SecureMessagePopoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _secure_message_popover_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./secure-message-popover.component */ "./src/app/sections/secure-messaging/secure-message-popover/secure-message-popover.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SecureMessagePopoverComponent", function() { return _secure_message_popover_component__WEBPACK_IMPORTED_MODULE_0__["SecureMessagePopoverComponent"]; });




/***/ }),

/***/ "./src/app/sections/secure-messaging/secure-message-popover/secure-message-popover.component.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/sections/secure-messaging/secure-message-popover/secure-message-popover.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-popover-layout [popoverConfig]=\"popoverConfig\">\r\n    <div class=\"sm-popover__content\">\r\n        {{ popoverConfig.message }}\r\n    </div>\r\n</st-popover-layout>\r\n"

/***/ }),

/***/ "./src/app/sections/secure-messaging/secure-message-popover/secure-message-popover.component.scss":
/*!********************************************************************************************************!*\
  !*** ./src/app/sections/secure-messaging/secure-message-popover/secure-message-popover.component.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n:host .sm-popover__content {\n  margin-bottom: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvc2VjdXJlLW1lc3NhZ2luZy9zZWN1cmUtbWVzc2FnZS1wb3BvdmVyL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL3NlY3VyZS1tZXNzYWdpbmcvc2VjdXJlLW1lc3NhZ2UtcG9wb3Zlci9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXHNlY3VyZS1tZXNzYWdpbmdcXHNlY3VyZS1tZXNzYWdlLXBvcG92ZXJcXHNlY3VyZS1tZXNzYWdlLXBvcG92ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDdEV6QjtFQUdHLG1CQUFtQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvc2VjdXJlLW1lc3NhZ2luZy9zZWN1cmUtbWVzc2FnZS1wb3BvdmVyL3NlY3VyZS1tZXNzYWdlLXBvcG92ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG46aG9zdCB7XHJcblx0LnNtLXBvcG92ZXIge1xyXG5cdFx0Jl9fY29udGVudCB7XHJcblx0XHRcdG1hcmdpbi1ib3R0b206IDEwcHg7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/sections/secure-messaging/secure-message-popover/secure-message-popover.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/sections/secure-messaging/secure-message-popover/secure-message-popover.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: SecureMessagePopoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecureMessagePopoverComponent", function() { return SecureMessagePopoverComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");



var SecureMessagePopoverComponent = /** @class */ (function () {
    function SecureMessagePopoverComponent() {
    }
    SecureMessagePopoverComponent.prototype.ngOnInit = function () {
        // this.setContentStrings();
        this.initPopover();
    };
    SecureMessagePopoverComponent.prototype.initPopover = function () {
        var _a = this.data, message = _a.message, title = _a.title;
        this.popoverConfig = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.popoverConfig, { title: title,
            message: message, buttons: this.configureButtons() });
    };
    SecureMessagePopoverComponent.prototype.configureButtons = function () {
        return [tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_2__["buttons"].CLOSE, { label: 'CLOSE' }), tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_2__["buttons"].RETRY, { label: 'RETRY' })];
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SecureMessagePopoverComponent.prototype, "data", void 0);
    SecureMessagePopoverComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'secure-message-popover',
            template: __webpack_require__(/*! ./secure-message-popover.component.html */ "./src/app/sections/secure-messaging/secure-message-popover/secure-message-popover.component.html"),
            styles: [__webpack_require__(/*! ./secure-message-popover.component.scss */ "./src/app/sections/secure-messaging/secure-message-popover/secure-message-popover.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SecureMessagePopoverComponent);
    return SecureMessagePopoverComponent;
}());



/***/ }),

/***/ "./src/app/sections/secure-messaging/secure-message.page.html":
/*!********************************************************************!*\
  !*** ./src/app/sections/secure-messaging/secure-message.page.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-header\r\n        *ngIf=\"showToolbar()\"\r\n        title='Messages'\r\n        [isTitleShow]=\"true\"\r\n        [isToolbarShow]=\"true\"\r\n        [isBackButtonShow]=\"false\"\r\n        class=\"shadow-header\"\r\n></st-header>\r\n\r\n<ion-grid class=\"secure-message ion-no-padding\">\r\n  <!-- row for whole window -->\r\n  <ion-row class=\"secure-message__container\">\r\n    <!-- column for groups -->\r\n    <ion-col\r\n      *ngIf=\"isConversationsColumnAppear\"\r\n      size-sm=\"5\"\r\n      size-md=\"5\"\r\n      size-lg=\"4\"\r\n      size-xl=\"3\"\r\n      class=\"secure-message__conversations conversations-container\"\r\n    >\r\n      <!-- header with start convos option -->\r\n      <ion-header no-border *ngIf=\"isMainPage()\">\r\n        <ion-item button lines=\"none\" class=\"conversations-container__item\" (click)=\"onClickStartConversation()\">\r\n          <ion-avatar slot=\"start\" class=\"conversations-container__avatar-shadow primary-background\">\r\n            <ion-icon name=\"chatbubbles\" class=\"conversations-container__avatar-icon\"></ion-icon>\r\n          </ion-avatar>\r\n          <ion-label>\r\n            <h3>Start conversation</h3>\r\n          </ion-label>\r\n        </ion-item>\r\n      </ion-header>\r\n      <!-- list with available groups -->\r\n      <ion-list class=\"conversations-container__groups\" scrollY=\"true\">\r\n        <ion-item\r\n          button\r\n          lines=\"none\"\r\n          detail=\"false\"\r\n          *ngFor=\"let conversation of conversationsArray; trackBy: trackConversationsByFn\"\r\n          (click)=\"onClickConversation(conversation)\"\r\n          class=\"conversations-container__group\"\r\n          [ngClass]=\"{ 'conversations-container__group--selected' : conversation.selected }\"\r\n        >\r\n          <ion-avatar slot=\"start\" class=\"purple-background\">\r\n            <h3 class=\"conversations-container__avatar-text\">{{getConversationGroupInitial(conversation)}}</h3>\r\n          </ion-avatar>\r\n          <ion-label>\r\n            <h3>{{getConversationGroupName(conversation)}}</h3>\r\n            <p>{{getConversationDescription(conversation)}}</p>\r\n          </ion-label>\r\n          <div class=\"text-align-end\" style=\"height: 65%;\">\r\n            <p style=\"display: inline; font-size: 0.75em;\" slot=\"end\">{{ conversation | conversationDate}}</p>\r\n          </div>\r\n        </ion-item>\r\n      </ion-list>\r\n    </ion-col>\r\n    <!-- col for current conversation chat -->\r\n    <ion-col\r\n      *ngIf=\"showSelectedConversationContentColumn()\"\r\n      size-sm=\"7\"\r\n      size-md=\"7\"\r\n      size-lg=\"8\"\r\n      size-xl=\"9\"\r\n      class=\"secure-message__conversation conversation-container\"\r\n    >\r\n      <ion-header no-border *ngIf=\"checkIfOpen()\">\r\n        <ion-toolbar>\r\n          <ion-buttons class=\"btn-wrapper\" *ngIf=\"!bIsLargeScreen\" slot=\"start\">\r\n              <ion-back-button (click)=\"onClickBackConversation()\"\r\n                               class=\"btn\"\r\n                               color=\"dark\"\r\n                               [icon]=\"'ios-arrow-back'\"\r\n                               mode=\"ios\"></ion-back-button>\r\n          </ion-buttons>\r\n          <ion-title>{{getConversationGroupName(selectedConversation)}}</ion-title>\r\n        </ion-toolbar>\r\n      </ion-header>\r\n      <!-- grid for chat window -->\r\n      <div #chatScroll scrollY=\"true\" [scrollTop]=\"chatScroll.scrollHeight\" class=\"conversation-container__chat\">\r\n        <ion-grid>\r\n          <div *ngFor=\"let message of selectedConversation.messages; let i = index; trackBy: trackMessagesByFn\">\r\n            <!-- row for group -->\r\n            <ion-row *ngIf=\"message.sender.type === 'group'\">\r\n              <ion-col\r\n                size-xs=\"2\"\r\n                size-sm=\"2\"\r\n                size-md=\"2\"\r\n                size-lg=\"2\"\r\n                size-xl=\"2\"\r\n                class=\"ion-align-self-end ion-no-padding\"\r\n              >\r\n                <ion-item lines=\"none\" class=\"ion-no-padding\">\r\n                  <ion-avatar\r\n                    *ngIf=\"messageShowAvatar(selectedConversation, i, 'group')\"\r\n                    slot=\"end\"\r\n                    class=\"purple-background conversation-container__chat-avatar\"\r\n                  >\r\n                    <h3 class=\"conversation-container__avatar-text\">\r\n                      {{getConversationGroupInitial(selectedConversation)}}\r\n                    </h3>\r\n                  </ion-avatar>\r\n                </ion-item>\r\n              </ion-col>\r\n              <ion-col size-xs=\"9\" size-sm=\"9\" size-md=\"6\" size-lg=\"6\" size-xl=\"6\" class=\"ion-no-padding\">\r\n                <ion-item lines=\"none\" class=\"conversation-container__body-wrapper ion-no-padding\">\r\n                  <p class=\"conversation-container__text-bubble light-grey-background\">{{message.body}}</p>\r\n                </ion-item>\r\n                <div\r\n                  *ngIf=\"messageShowDate(selectedConversation, i, 'group')\"\r\n                  class=\"conversation-container__date-wrapper\"\r\n                >\r\n                  <p class=\"conversation-container__text-date\">{{ message | messageDate }}</p>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size-xs=\"1\" size-sm=\"1\" size-md=\"4\" size-lg=\"4\" size-xl=\"4\" class=\"ion-no-padding\"> </ion-col>\r\n            </ion-row>\r\n            <!-- row for patron -->\r\n            <ion-row class=\"ion-justify-content-end\" *ngIf=\"message.sender.type === 'patron'\">\r\n              <ion-col size-xs=\"1\" size-sm=\"1\" size-md=\"5\" size-lg=\"5\" size-xl=\"5\" class=\"ion-no-padding\"> </ion-col>\r\n              <ion-col size-xs=\"11\" size-sm=\"11\" size-md=\"6\" size-lg=\"6\" size-xl=\"6\" size=\"6\" class=\"ion-no-padding\">\r\n                <ion-item lines=\"none\" class=\"conversation-container__body-wrapper\">\r\n                  <div class=\"ion-text-end\" style=\"width: 100%;\">\r\n                    <p class=\"conversation-container__text-bubble light-blue-background\">{{message.body}}</p>\r\n                  </div>\r\n                </ion-item>\r\n                <div\r\n                  *ngIf=\"messageShowDate(selectedConversation, i, 'patron')\"\r\n                  class=\"conversation-container__date-wrapper ion-text-end\"\r\n                >\r\n                  <p class=\"conversation-container__text-date\" style=\"padding-right: 16px;\">\r\n                    {{message | messageDate}}\r\n                  </p>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size-xs=\"0\" size-sm=\"0\" size-md=\"1\" size-lg=\"1\" size-xl=\"1\" class=\"ion-no-padding\"> </ion-col>\r\n            </ion-row>\r\n          </div>\r\n        </ion-grid>\r\n      </div>\r\n      <!-- grid for text area -->\r\n      <ion-grid class=\"conversation-container__text-area-wrapper\">\r\n        <ion-row>\r\n          <ion-col size=\"1\"></ion-col>\r\n          <!-- col for text area -->\r\n          <ion-col size=\"9\">\r\n            <ion-textarea\r\n              #chatInput\r\n              [(ngModel)]=\"newMessageText\"\r\n              rows=\"2\"\r\n              [spellcheck]=\"true\"\r\n              placeholder=\"Text message\"\r\n              class=\"conversation-container__text-area\"\r\n            >\r\n            </ion-textarea>\r\n          </ion-col>\r\n          <!-- col for send button -->\r\n          <ion-col size=\"1\" class=\"ion-align-self-center\">\r\n            <ion-button\r\n              shape=\"round\"\r\n              size=\"small\"\r\n              color=\"primary\"\r\n              mode=\"md\"\r\n              (click)=\"onClickSendButton()\"\r\n              class=\"conversation-container__text-area-btn\"\r\n              appClickStopPropagation\r\n            >\r\n              <ion-icon slot=\"icon-only\" name=\"send\"></ion-icon>\r\n            </ion-button>\r\n          </ion-col>\r\n          <ion-col size=\"1\"></ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </ion-col>\r\n    <!-- col for current new conversation creation -->\r\n    <ion-col\r\n      *ngIf=\"showCreateNewConversationColumn()\"\r\n      size-sm=\"7\"\r\n      size-md=\"7\"\r\n      size-lg=\"8\"\r\n      size-xl=\"9\"\r\n      class=\"secure-message__conversation-creation conversation-creation-container\"\r\n    >\r\n      <ion-header no-border>\r\n        <ion-toolbar>\r\n          <ion-buttons *ngIf=\"!bIsLargeScreen\" slot=\"start\">\r\n            <ion-button (click)=\"onClickBackNewConversation()\">\r\n              <ion-icon name=\"arrow-back\" slot=\"icon-only\"></ion-icon>\r\n            </ion-button>\r\n          </ion-buttons>\r\n          <ion-title>New Conversation</ion-title>\r\n        </ion-toolbar>\r\n      </ion-header>\r\n      <!-- grid for available group list window -->\r\n      <!-- list with available groups -->\r\n      <ion-list class=\"conversation-creation-container__groups\" scrollY=\"true\">\r\n        <ion-list-header>\r\n          <ion-label>Contacts</ion-label>\r\n        </ion-list-header>\r\n        <ion-item\r\n          button\r\n          class=\"ion-no-padding\"\r\n          lines=\"none\"\r\n          *ngFor=\"let group of groupsArray\"\r\n          (click)=\"onClickMakeNewConversation(group)\"\r\n        >\r\n          <ion-avatar slot=\"start\" class=\"purple-background\">\r\n            <h3 class=\"conversation-creation-container__avatar-text\">{{getGroupInitial(group)}}</h3>\r\n          </ion-avatar>\r\n          <ion-label>\r\n            <h3>{{getGroupName(group)}}</h3>\r\n            <p>{{getGroupDescription(group)}}</p>\r\n          </ion-label>\r\n        </ion-item>\r\n      </ion-list>\r\n    </ion-col>\r\n  </ion-row>\r\n</ion-grid>\r\n"

/***/ }),

/***/ "./src/app/sections/secure-messaging/secure-message.page.scss":
/*!********************************************************************!*\
  !*** ./src/app/sections/secure-messaging/secure-message.page.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.secure-message {\n  height: 100%;\n  width: 100%;\n  background-color: #fff; }\n.secure-message__container {\n    height: 100%; }\n.secure-message__conversations {\n    padding: 0;\n    border-right-width: 1px;\n    border-right-style: solid;\n    border-right-color: rgba(0, 0, 0, 0.1); }\n.secure-message__conversations .conversations-container__item {\n      background-color: #fff; }\n.secure-message__conversations .conversations-container__avatar-shadow {\n      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0); }\n.secure-message__conversations .conversations-container__groups {\n      overflow: auto;\n      height: 84%;\n      background-color: #fff; }\n.secure-message__conversations .conversations-container__avatar-icon {\n      position: relative;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%);\n      color: white;\n      font-size: 1.4em; }\n.secure-message__conversations .conversations-container__avatar-text {\n      position: relative;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-20%, -50%);\n              transform: translate(-20%, -50%);\n      color: white;\n      margin: 0; }\n.secure-message__conversations .conversations-container__group--selected {\n      background-color: rgba(0, 0, 0, 0.05); }\n.secure-message__conversation {\n    height: 100%;\n    padding: 0 0 15px; }\n.secure-message__conversation .conversation-container__avatar-text {\n      position: relative;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-20%, -50%);\n              transform: translate(-20%, -50%);\n      color: white;\n      margin: 0; }\n.secure-message__conversation .conversation-container__chat {\n      top: 56px;\n      height: calc(100vh - 150px);\n      overflow: auto; }\n.secure-message__conversation .conversation-container__chat-avatar {\n      width: 2.5em;\n      height: 2.5em;\n      margin-bottom: 37px;\n      margin-left: 0; }\n.secure-message__conversation .conversation-container__text-area-wraper {\n      position: absolute;\n      width: 100%;\n      bottom: 1vh; }\n.secure-message__conversation .conversation-container__text-area {\n      background-color: rgba(0, 0, 0, 0.05);\n      border-radius: 10px;\n      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0);\n      max-height: 4rem;\n      --padding-top: 10px;\n      --padding-bottom: 10px;\n      --padding-start: 10px !important;\n      --padding-end: 10px !important; }\n.secure-message__conversation .conversation-container__text-area-btn {\n      width: 3em;\n      height: 3em;\n      z-index: 2;\n      position: relative; }\n.secure-message__conversation .conversation-container__body-wrapper {\n      padding: 0; }\n.secure-message__conversation .conversation-container__text-bubble {\n      border-radius: 10px;\n      padding: 15px;\n      margin: 0;\n      display: inline-block;\n      word-wrap: break-word;\n      white-space: pre-wrap;\n      max-width: 100%; }\n.secure-message__conversation .conversation-container__date-wrapper {\n      margin-bottom: 16px;\n      margin-top: 5px; }\n.secure-message__conversation .conversation-container__text-date {\n      margin: 0;\n      font-size: 0.9em;\n      color: rgba(0, 0, 0, 0.5);\n      opacity: 0.5; }\n.secure-message__conversation-creation {\n    height: 86%;\n    padding: 0; }\n.secure-message__conversation-creation .conversation-creation-container__groups {\n      overflow: auto;\n      height: 95%;\n      margin-left: 5%;\n      margin-bottom: 0; }\n.secure-message__conversation-creation .conversation-creation-container__avatar-text {\n      position: relative;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-20%, -50%);\n              transform: translate(-20%, -50%);\n      color: white;\n      margin: 0; }\n.light-grey-background {\n  background-color: rgba(0, 0, 0, 0.05); }\n.primary-background {\n  background-color: var(--ion-color-primary); }\n.light-blue-background {\n  background-color: rgba(0, 92, 185, 0.1); }\n.purple-background {\n  background-color: #af5cf7; }\n.item,\n.list,\n.item-content,\n.item-complex {\n  --ion-background-color: transparent !important; }\n@-moz-document url-prefix() {\n  .conversation-container__text-area {\n    --padding-bottom: 0 !important; } }\n.btn {\n  --icon-font-size: 18px;\n  --margin-start: 10px;\n  --icon-padding-end: 5px;\n  width: 70px;\n  height: 20px;\n  display: block;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n.btn-wrapper {\n  width: 75px;\n  height: 20px;\n  display: block; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvc2VjdXJlLW1lc3NhZ2luZy9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX3ZhcmlhYmxlcy5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9zZWN1cmUtbWVzc2FnaW5nL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcYXBwXFxzZWN0aW9uc1xcc2VjdXJlLW1lc3NhZ2luZ1xcc2VjdXJlLW1lc3NhZ2UucGFnZS5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9zZWN1cmUtbWVzc2FnaW5nL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDdEV6QjtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsc0JBQXNCLEVBQUE7QUFFdEI7SUFDRSxZQUFZLEVBQUE7QUFHZDtJQUNFLFVBQVU7SUFDVix1QkFBdUI7SUFDdkIseUJBQXlCO0lBQ3pCLHNDQUFzQyxFQUFBO0FBSnZDO01BUUssc0JBQXNCLEVBQUE7QUFSM0I7TUFZSywwR0FBMEcsRUFBQTtBQVovRztNQWdCSyxjQUFjO01BQ2QsV0FBVztNQUNYLHNCQUFzQixFQUFBO0FBbEIzQjtNQXNCSyxrQkFBa0I7TUFDbEIsUUFBUTtNQUNSLFNBQVM7TUFDVCx3Q0FBZ0M7Y0FBaEMsZ0NBQWdDO01BQ2hDLFlBQVk7TUFDWixnQkFBZ0IsRUFBQTtBQTNCckI7TUErQkssa0JBQWtCO01BQ2xCLFFBQVE7TUFDUixTQUFTO01BQ1Qsd0NBQWdDO2NBQWhDLGdDQUFnQztNQUNoQyxZQUFZO01BQ1osU0FBUyxFQUFBO0FBcENkO01Bd0NLLHFDQUFxQyxFQUFBO0FBSzNDO0lBQ0UsWUFBWTtJQUNaLGlCQUFpQixFQUFBO0FBRmxCO01BTUssa0JBQWtCO01BQ2xCLFFBQVE7TUFDUixTQUFTO01BQ1Qsd0NBQWdDO2NBQWhDLGdDQUFnQztNQUNoQyxZQUFZO01BQ1osU0FBUyxFQUFBO0FBWGQ7TUFlSyxTQUFTO01BQ1QsMkJBQTJCO01BQzNCLGNBQWMsRUFBQTtBQWpCbkI7TUFxQkssWUFBWTtNQUNaLGFBQWE7TUFDYixtQkFBbUI7TUFDbkIsY0FBYyxFQUFBO0FBeEJuQjtNQTRCSyxrQkFBa0I7TUFDbEIsV0FBVztNQUNYLFdBQVcsRUFBQTtBQTlCaEI7TUFrQ0sscUNBQXFDO01BQ3JDLG1CQUFtQjtNQUNuQiwwR0FBMEc7TUFDMUcsZ0JBQWdCO01BRWhCLG1CQUFjO01BQ2Qsc0JBQWlCO01BQ2pCLGdDQUFnQjtNQUNoQiw4QkFBYyxFQUFBO0FBMUNuQjtNQThDSyxVQUFVO01BQ1YsV0FBVztNQUNYLFVBQVU7TUFDVixrQkFBa0IsRUFBQTtBQWpEdkI7TUFxREssVUFBVSxFQUFBO0FBckRmO01BeURLLG1CQUFtQjtNQUNuQixhQUFhO01BQ2IsU0FBUztNQUNULHFCQUFxQjtNQUNyQixxQkFBcUI7TUFDckIscUJBQXFCO01BQ3JCLGVBQWUsRUFBQTtBQS9EcEI7TUFtRUssbUJBQW1CO01BQ25CLGVBQWUsRUFBQTtBQXBFcEI7TUF3RUssU0FBUztNQUNULGdCQUFnQjtNQUNoQix5QkFBeUI7TUFDekIsWUFBWSxFQUFBO0FBS2xCO0lBQ0UsV0FBVztJQUNYLFVBQVUsRUFBQTtBQUZYO01BTUssY0FBYztNQUNkLFdBQVc7TUFDWCxlQUFlO01BQ2YsZ0JBQWdCLEVBQUE7QUFUckI7TUFhSyxrQkFBa0I7TUFDbEIsUUFBUTtNQUNSLFNBQVM7TUFDVCx3Q0FBZ0M7Y0FBaEMsZ0NBQWdDO01BQ2hDLFlBQVk7TUFDWixTQUFTLEVBQUE7QUFNakI7RUFDRSxxQ0FBcUMsRUFBQTtBQUd2QztFQUNFLDBDQUEwQyxFQUFBO0FBRzVDO0VBQ0UsdUNBQXVDLEVBQUE7QUFHekM7RUFDRSx5QkFBeUIsRUFBQTtBQUczQjs7OztFQUlFLDhDQUF1QixFQUFBO0FBR3pCO0VBQ0U7SUFDRSw4QkFBaUIsRUFBQSxFQUNsQjtBQUVIO0VBQ0Usc0JBQWlCO0VBQ2pCLG9CQUFlO0VBQ2YsdUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxZQUFZO0VBQ1osY0FBYztFQ2pNZCxlRG1NaUM7RUMvTGpDLGdERjBFdUQsRUFBQTtBQ3VIekQ7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGNBQWMsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL3NlY3VyZS1tZXNzYWdpbmcvc2VjdXJlLW1lc3NhZ2UucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXHJcbjpyb290IHtcclxuICAvKiogcHJpbWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMDA1Y2I5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiAwLCA5MiwgMTg1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzAwNTFhMztcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XHJcblxyXG4gIC8qKiBzZWNvbmRhcnkgKiovXHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5OiAjMGNkMWU4O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDEyLCAyMDksIDIzMjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMwYmI4Y2M7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XHJcblxyXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2I6IDExMiwgNjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM2MzNjZTA7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcclxuXHJcbiAgLyoqIHN1Y2Nlc3MgKiovXHJcbiAgLS1pb24tY29sb3Itc3VjY2VzczogIzEwZGM2MDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcclxuXHJcbiAgLyoqIHdhcm5pbmcgKiovXHJcbiAgLS1pb24tY29sb3Itd2FybmluZzogI2ZmY2UwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAyMDYsIDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBiNTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcclxuXHJcbiAgLyoqIGRhbmdlciAqKi9cclxuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXJnYjogMjQ1LCA2MSwgNjE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlOiAjZDMzOTM5O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xyXG5cclxuICAvKiogZGFyayAqKi9cclxuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcclxuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XHJcblxyXG4gIC8qKiBtZWRpdW0gKiovXHJcbiAgLS1pb24tY29sb3ItbWVkaXVtOiAjOTg5YWEyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE1MiwgMTU0LCAxNjI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODY4ODhmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xyXG5cclxuICAvKiogbGlnaHQgKiovXHJcbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtcmdiOiAyNDQsIDI0NCwgMjQ0O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1zaGFkZTogI2Q3ZDhkYTtcclxuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xyXG5cclxuICAvLyAtLWlvbi1ncmlkLXdpZHRoLXNtOiAwcHg7XHJcbn1cclxuXHJcbi8vIEZPTlRTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJGZvbnQtbnVuaXRvLXJlZ3VsYXI6ICdOdW5pdG8gUmVndWxhcicsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8tc2VtaWJvbGQ6ICdOdW5pdG8gU2VtaUJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLWhlYXZ5OiAnTnVuaXRvIEJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuXHJcbi8vIENPTE9SU1xyXG5cclxuJGNvbG9yLXZlcnktbGlnaHQtZ3JheTogI2NjYztcclxuJGNvbG9yLWxpbmstd2F0ZXI6ICNkNGQ2ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZTllOWU5O1xyXG4kY29sb3ItZGFyay1ncmF5OiAjYWFhO1xyXG4kY29sb3ItZHVzdHktZ3JheTogIzk3OTc5NztcclxuJGNvbG9yLWRpbS1ncmF5OiAjNmU2ZTZlO1xyXG4kY29sb3Itc29saXR1ZGU6ICNFQ0YxRjg7XHJcbiRjb2xvci1uaWdodC1yaWRlcjogIzMzMztcclxuJGNvbG9yLW5hdnktYmx1ZTogIzAwNTZlNjtcclxuJGNvbG9yLWRlbmltOiAjMTM2MGUwO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWU6ICMxNjZkZmY7XHJcbiRjb2xvci1kb2RnZXItYmx1ZS1saWdodGVyOiAjMmQ3Y2ZmO1xyXG4kY29sb3Itd2hpdGU6ICNmZmY7XHJcbiRjb2xvci1ibGFjazogIzAwMDtcclxuJGNvbG9yLXdoaXRlLXNtb2tlOiAjZjNmM2YzO1xyXG4kY29sb3ItZGVlcC1za3ktYmx1ZTogIzAwYTBmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjOGJiN2ZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4OGM4ZmY7XHJcbiRjb2xvci1zdHJvbmctYmx1ZTogIzAwNDNiMztcclxuJGNvbG9yLWFsaWNlLWJsdWU6ICNmMGYzZjU7XHJcbiRjb2xvci1zaWx2ZXI6ICNjNGM0YzQ7XHJcbiRjb2xvci1tYXR0ZXJob3JuOiAjNTE1MTUxO1xyXG4kY29sb3ItdmVyeS1kYXJrLWdyYXk6ICM2MjYyNjI7XHJcbiRjb2xvci1tZXJjdXJ5OiAjZTdlN2U3O1xyXG4kY29sb3ItbGlnaHQtZ3JheTogI2Q4ZDhkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlYmViZWI7XHJcbiRjb2xvci1hbGl6YXJpbjogI2UyMjk0MjtcclxuJGNvbG9yLWZsYW1lLXJlZDogIzg4MTkyODtcclxuJGNvbG9yLWNoYXJjb2FsOiAjNDY0NjQ2O1xyXG4kY29sb3ItZGVlcC1zZWE6ICMxNDdkNjM7XHJcbiRjb2xvci1jYXJkaW5hbDogI2I1MjEzNTtcclxuJGNvbG9yLWdvZC1ncmF5OiAjMTYxNjE2O1xyXG4kY29sb3ItaG90LWN1cnJ5OiAjN2M1ZDIzO1xyXG4kY29sb3ItY2FzYWJsYW5jYTogI2Y3YmE0NTtcclxuJGNvbG9yLWFsYWJhc3RlcjogI2Y3ZjdmNztcclxuJHBvcmNlbGFpbjogI2U2ZTllYjtcclxuJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U6ICNEMDQzMUE7XHJcbiRjb2xvci1wYXR0ZW5zLWJsdWU6ICNlMGUzZTU7XHJcblxyXG4vLy8gU2l6ZVxyXG4kYm90dG9tLW5hdmlnYXRpb24tYmFyLWhlaWdodDogNTBweDtcclxuIiwiQGltcG9ydCBcInRvb2xzXCI7XHJcblxyXG4uc2VjdXJlLW1lc3NhZ2Uge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG5cclxuICAmX19jb250YWluZXIge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gIH1cclxuXHJcbiAgJl9fY29udmVyc2F0aW9ucyB7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAxcHg7XHJcbiAgICBib3JkZXItcmlnaHQtc3R5bGU6IHNvbGlkO1xyXG4gICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcblxyXG4gICAgLmNvbnZlcnNhdGlvbnMtY29udGFpbmVyIHtcclxuICAgICAgJl9faXRlbSB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgfVxyXG5cclxuICAgICAgJl9fYXZhdGFyLXNoYWRvdyB7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCAycHggNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjE0KSwgMCAzcHggNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCAxcHggNXB4IDAgcmdiYSgwLCAwLCAwLCAwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJl9fZ3JvdXBzIHtcclxuICAgICAgICBvdmVyZmxvdzogYXV0bztcclxuICAgICAgICBoZWlnaHQ6IDg0JTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAmX19hdmF0YXItaWNvbiB7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIHRvcDogNTAlO1xyXG4gICAgICAgIGxlZnQ6IDUwJTtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjRlbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJl9fYXZhdGFyLXRleHQge1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICB0b3A6IDUwJTtcclxuICAgICAgICBsZWZ0OiA1MCU7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTIwJSwgLTUwJSk7XHJcbiAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgJl9fZ3JvdXAtLXNlbGVjdGVkIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmX19jb252ZXJzYXRpb24ge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgcGFkZGluZzogMCAwIDE1cHg7XHJcblxyXG4gICAgLmNvbnZlcnNhdGlvbi1jb250YWluZXIge1xyXG4gICAgICAmX19hdmF0YXItdGV4dCB7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIHRvcDogNTAlO1xyXG4gICAgICAgIGxlZnQ6IDUwJTtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMjAlLCAtNTAlKTtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAmX19jaGF0IHtcclxuICAgICAgICB0b3A6IDU2cHg7XHJcbiAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTUwcHgpO1xyXG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAmX19jaGF0LWF2YXRhciB7XHJcbiAgICAgICAgd2lkdGg6IDIuNWVtO1xyXG4gICAgICAgIGhlaWdodDogMi41ZW07XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzdweDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgJl9fdGV4dC1hcmVhLXdyYXBlciB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGJvdHRvbTogMXZoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAmX190ZXh0LWFyZWEge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4wNSk7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgICAgICBib3gtc2hhZG93OiAwIDJweCA0cHggMCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwIDNweCA0cHggMCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDFweCA1cHggMCByZ2JhKDAsIDAsIDAsIDApO1xyXG4gICAgICAgIG1heC1oZWlnaHQ6IDRyZW07XHJcblxyXG4gICAgICAgIC0tcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgICAgICAgLS1wYWRkaW5nLWJvdHRvbTogMTBweDtcclxuICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDEwcHggIWltcG9ydGFudDtcclxuICAgICAgICAtLXBhZGRpbmctZW5kOiAxMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICZfX3RleHQtYXJlYS1idG4ge1xyXG4gICAgICAgIHdpZHRoOiAzZW07XHJcbiAgICAgICAgaGVpZ2h0OiAzZW07XHJcbiAgICAgICAgei1pbmRleDogMjtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICZfX2JvZHktd3JhcHBlciB7XHJcbiAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgJl9fdGV4dC1idWJibGUge1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICAgICAgcGFkZGluZzogMTVweDtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcclxuICAgICAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAmX19kYXRlLXdyYXBwZXIge1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogNXB4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAmX190ZXh0LWRhdGUge1xyXG4gICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICBmb250LXNpemU6IDAuOWVtO1xyXG4gICAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICAgICAgb3BhY2l0eTogMC41O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmX19jb252ZXJzYXRpb24tY3JlYXRpb24ge1xyXG4gICAgaGVpZ2h0OiA4NiU7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG5cclxuICAgIC5jb252ZXJzYXRpb24tY3JlYXRpb24tY29udGFpbmVyIHtcclxuICAgICAgJl9fZ3JvdXBzIHtcclxuICAgICAgICBvdmVyZmxvdzogYXV0bztcclxuICAgICAgICBoZWlnaHQ6IDk1JTtcclxuICAgICAgICBtYXJnaW4tbGVmdDogNSU7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgJl9fYXZhdGFyLXRleHQge1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICB0b3A6IDUwJTtcclxuICAgICAgICBsZWZ0OiA1MCU7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTIwJSwgLTUwJSk7XHJcbiAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLmxpZ2h0LWdyZXktYmFja2dyb3VuZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxufVxyXG5cclxuLnByaW1hcnktYmFja2dyb3VuZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG59XHJcblxyXG4ubGlnaHQtYmx1ZS1iYWNrZ3JvdW5kIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDkyLCAxODUsIDAuMSk7XHJcbn1cclxuXHJcbi5wdXJwbGUtYmFja2dyb3VuZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FmNWNmNztcclxufVxyXG5cclxuLml0ZW0sXHJcbi5saXN0LFxyXG4uaXRlbS1jb250ZW50LFxyXG4uaXRlbS1jb21wbGV4IHtcclxuICAtLWlvbi1iYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5ALW1vei1kb2N1bWVudCB1cmwtcHJlZml4KCkge1xyXG4gIC5jb252ZXJzYXRpb24tY29udGFpbmVyX190ZXh0LWFyZWEge1xyXG4gICAgLS1wYWRkaW5nLWJvdHRvbTogMCAhaW1wb3J0YW50O1xyXG4gIH1cclxufVxyXG4uYnRuIHtcclxuICAtLWljb24tZm9udC1zaXplOiAxOHB4O1xyXG4gIC0tbWFyZ2luLXN0YXJ0OiAxMHB4O1xyXG4gIC0taWNvbi1wYWRkaW5nLWVuZDogNXB4O1xyXG4gIHdpZHRoOiA3MHB4O1xyXG4gIGhlaWdodDogMjBweDtcclxuICBkaXNwbGF5OiBibG9jaztcclxuXHJcbiAgQGluY2x1ZGUgZm9udC1udW5pdG8tcmVndWxhcigxNnB4KTtcclxufVxyXG4uYnRuLXdyYXBwZXIge1xyXG4gIHdpZHRoOiA3NXB4O1xyXG4gIGhlaWdodDogMjBweDtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/secure-messaging/secure-message.page.ts":
/*!******************************************************************!*\
  !*** ./src/app/sections/secure-messaging/secure-message.page.ts ***!
  \******************************************************************/
/*! exports provided: SecureMessagePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecureMessagePage", function() { return SecureMessagePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./service */ "./src/app/sections/secure-messaging/service/index.ts");
/* harmony import */ var _core_utils_data_cache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/data-cache */ "./src/app/core/utils/data-cache.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");
/* harmony import */ var _secure_message_popover__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./secure-message-popover */ "./src/app/sections/secure-messaging/secure-message-popover/index.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var _core_provider_native_provider_native_provider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @core/provider/native-provider/native.provider */ "./src/app/core/provider/native-provider/native.provider.ts");
/* harmony import */ var _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @shared/ui-components/st-global-navigation/services/global-nav.service */ "./src/app/shared/ui-components/st-global-navigation/services/global-nav.service.ts");













var SecureMessagePage = /** @class */ (function () {
    function SecureMessagePage(platform, events, secureMessagingService, loading, popoverCtrl, nativeProvider, globalNav) {
        this.platform = platform;
        this.events = events;
        this.secureMessagingService = secureMessagingService;
        this.loading = loading;
        this.popoverCtrl = popoverCtrl;
        this.nativeProvider = nativeProvider;
        this.globalNav = globalNav;
        this.largeScreenPixelMin = 576;
        this.sourceSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"]();
        this.messagesArray = [];
        this.bIsLargeScreen = false;
        this.bCreateNewConversation = false;
        this.conversationsArray = [];
        this.groupsArray = [];
        this.selectedConversation = null;
        this.newMessageText = '';
        this.platform.ready().then(this.initComponent.bind(this));
    }
    SecureMessagePage.prototype.ngOnInit = function () {
    };
    SecureMessagePage.prototype.ngOnDestroy = function () {
        this.sourceSubscription.unsubscribe();
    };
    Object.defineProperty(SecureMessagePage.prototype, "isConversationsColumnAppear", {
        /**
         * Show grid column with current conversations
         */
        get: function () {
            return this.bIsLargeScreen === true || (this.selectedConversation == null && !this.bCreateNewConversation);
        },
        enumerable: true,
        configurable: true
    });
    SecureMessagePage.prototype.initComponent = function () {
        /// set subscription to check screen size onAddressChanged
        /// used to adjust ui layout
        this.bIsLargeScreen = this.platform.width() > this.largeScreenPixelMin;
        var subscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(window, 'resize').subscribe(this.onWindowResizeHandler.bind(this));
        this.sourceSubscription.add(subscription);
        this.initializePage();
    };
    SecureMessagePage.prototype.onWindowResizeHandler = function () {
        // const bWasPreviouslyLargeScreen = this.bIsLargeScreen;
        this.bIsLargeScreen = window.innerWidth >= this.largeScreenPixelMin;
        // if (!bWasPreviouslyLargeScreen && this.bIsLargeScreen) {
        //   /// do nothing for now
        // }
    };
    /**
     * Initial data gathering for messages and groups
     */
    SecureMessagePage.prototype.initializePage = function () {
        var _this = this;
        this.loading.showSpinner('Retrieving conversations...');
        var subscription = this.secureMessagingService
            .getInitialData()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["finalize"])(function () { return _this.loading.closeSpinner(); }))
            .subscribe(function (_a) {
            var smGroupArray = _a[0], smMessageArray = _a[1];
            _this.groupsArray = smGroupArray;
            _this.messagesArray = smMessageArray;
            _this.createConversationsFromResponse(false);
            _this.pollForData();
        }, function (error) {
            _this.modalHandler(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, error, { title: _app_global__WEBPACK_IMPORTED_MODULE_10__["Exception"].Strings.TITLE }), _this.initializePage.bind(_this));
        });
        this.sourceSubscription.add(subscription);
    };
    /**
     * Poll for updated messages and groups
     */
    SecureMessagePage.prototype.pollForData = function () {
        var _this = this;
        var subscription = this.secureMessagingService.pollForData().subscribe(function (_a) {
            var smGroupArray = _a[0], smMessageArray = _a[1];
            /// if there are new groups, update the list
            if (_this.messagesArray.length !== smGroupArray.length) {
                _this.messagesArray = smMessageArray;
            }
            /// if there are new messages, update the conversations
            if (_this.messagesArray.length !== smMessageArray.length) {
                _this.messagesArray = smMessageArray;
                _this.createConversationsFromResponse(true);
            }
        }, function (error) {
            /// only deal with connection error ?
        });
        this.sourceSubscription.add(subscription);
    };
    SecureMessagePage.prototype.sortGroups = function () {
        /// sort groups alphabetically
        this.groupsArray.sort(function (a, b) {
            if (a.name === null) {
                return -1;
            }
            if (b.name === null) {
                return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            return 0;
        });
    };
    /**
     * Handle messages and groups response and make conversations to display
     * @param bIsPollingData Is this update from polled data
     */
    SecureMessagePage.prototype.createConversationsFromResponse = function (bIsPollingData) {
        var tempConversations = [];
        this.sortGroups();
        /// create 'conversations' out of message array
        for (var _i = 0, _a = this.messagesArray; _i < _a.length; _i++) {
            var message = _a[_i];
            message.sent_date = new Date(message.sent_date).toDateString();
            var bNewConversation = true;
            /// add to existing conversation if it exists
            for (var _b = 0, tempConversations_1 = tempConversations; _b < tempConversations_1.length; _b++) {
                var convo = tempConversations_1[_b];
                if (!bNewConversation) {
                    break;
                }
                if (convo.groupIdValue &&
                    convo.groupIdValue.length &&
                    (convo.groupIdValue === message.sender.id_value || convo.groupIdValue === message.recipient.id_value)) {
                    convo.messages.push(message);
                    bNewConversation = false;
                }
            }
            /// create new conversation
            if (bNewConversation) {
                var newGroupName = '';
                var newGroupId = '';
                var newGroupDescription = '';
                if (message.sender.type === 'group') {
                    newGroupName = message.sender.name;
                    newGroupId = message.sender.id_value;
                }
                else {
                    newGroupName = message.recipient.name;
                    newGroupId = message.recipient.id_value;
                }
                newGroupDescription = message.description;
                /// try to get proper group info
                for (var _c = 0, _d = this.groupsArray; _c < _d.length; _c++) {
                    var group = _d[_c];
                    if (group.id === newGroupId) {
                        newGroupName = group.name;
                        newGroupDescription = group.description;
                    }
                }
                var conversation = {
                    institutionId: _service__WEBPACK_IMPORTED_MODULE_5__["SecureMessagingService"].GetSecureMessagesAuthInfo().institution_id,
                    groupName: newGroupName,
                    groupIdValue: newGroupId,
                    groupDescription: newGroupDescription,
                    myIdValue: _service__WEBPACK_IMPORTED_MODULE_5__["SecureMessagingService"].GetSecureMessagesAuthInfo().id_value,
                    messages: [],
                    selected: false,
                };
                conversation.messages.push(message);
                tempConversations.push(conversation);
            }
        }
        this.conversationsArray = tempConversations;
        this.sortConversations();
        if (bIsPollingData === false && (this.conversationsArray.length && this.bIsLargeScreen)) {
            /// select first conversation by default
            this.conversationsArray[0].selected = true;
            this.selectedConversation = this.conversationsArray[0];
        }
    };
    SecureMessagePage.prototype.trackConversationsByFn = function (index, _a) {
        var groupIdValue = _a.groupIdValue;
        return groupIdValue;
    };
    SecureMessagePage.prototype.trackMessagesByFn = function (index, _a) {
        var id = _a.id;
        return id;
    };
    /**
     * Helper method to scroll to bottom of chat
     */
    SecureMessagePage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.chatScroll == null) {
                return;
            }
            try {
                var scroll_1 = _this.chatScroll._scrollContent.nativeElement;
                scroll_1.scrollTop = scroll_1.scrollHeight - scroll_1.clientHeight;
            }
            catch (error) {
                /// do nothing
            }
        }, 100);
    };
    /**
     * Show grid column with messages from current selected conversation
     */
    SecureMessagePage.prototype.showSelectedConversationContentColumn = function () {
        return this.selectedConversation !== null && !this.bCreateNewConversation;
    };
    /**
     * Show grid column with groups available to start a conversation
     */
    SecureMessagePage.prototype.showCreateNewConversationColumn = function () {
        return this.bCreateNewConversation;
    };
    SecureMessagePage.prototype.showToolbar = function () {
        return !this.nativeProvider.isWeb() && !this.showSelectedConversationContentColumn() && !this.showCreateNewConversationColumn();
    };
    /**
     * click listner for Start Conversation
     */
    SecureMessagePage.prototype.onClickStartConversation = function () {
        this.bCreateNewConversation = true;
    };
    /**
     * click listner for group in 'new conversation' column
     */
    SecureMessagePage.prototype.onClickMakeNewConversation = function (_a) {
        var id = _a.id, name = _a.name, description = _a.description;
        /// check if a conversation with this group already exists
        var newConversation = null;
        for (var _i = 0, _b = this.conversationsArray; _i < _b.length; _i++) {
            var convo = _b[_i];
            if (convo.groupIdValue === id) {
                newConversation = convo;
                break;
            }
        }
        if (newConversation === null) {
            newConversation = {
                institutionId: _service__WEBPACK_IMPORTED_MODULE_5__["SecureMessagingService"].GetSecureMessagesAuthInfo().institution_id,
                groupName: name,
                groupIdValue: id,
                groupDescription: description,
                myIdValue: _service__WEBPACK_IMPORTED_MODULE_5__["SecureMessagingService"].GetSecureMessagesAuthInfo().id_value,
                messages: [],
                selected: true,
            };
        }
        this.setSelectedConversation(newConversation);
        this.bCreateNewConversation = false;
    };
    /**
     * click listener to selected current conversation to display
     */
    SecureMessagePage.prototype.onClickConversation = function (conversation) {
        this.bCreateNewConversation = false;
        if (this.selectedConversation != null && this.selectedConversation.groupIdValue === conversation.groupIdValue) {
            return;
        }
        this.setSelectedConversation(conversation);
        this.scrollToBottom();
    };
    /**
     * click listener to send message
     */
    SecureMessagePage.prototype.onClickSendButton = function () {
        if (this.newMessageText && this.newMessageText.trim().length) {
            this.sendMessage(this.createNewMessageSendBody(this.newMessageText));
        }
    };
    /**
     * click listener for backing out of conversation (small UI only)
     */
    SecureMessagePage.prototype.onClickBackConversation = function () {
        this.clearSelectedConversation();
    };
    /**
     * click listener for backing out of create conversation (small UI only)
     */
    SecureMessagePage.prototype.onClickBackNewConversation = function () {
        this.bCreateNewConversation = false;
    };
    /**
     * Create message body object for sending a new message to a group
     * @param messageBody body of new message
     */
    SecureMessagePage.prototype.createNewMessageSendBody = function (messageBody) {
        return {
            institution_id: _service__WEBPACK_IMPORTED_MODULE_5__["SecureMessagingService"].GetSecureMessagesAuthInfo().institution_id,
            sender: {
                type: 'patron',
                id_field: _service__WEBPACK_IMPORTED_MODULE_5__["SecureMessagingService"].GetSecureMessagesAuthInfo().id_field,
                id_value: _service__WEBPACK_IMPORTED_MODULE_5__["SecureMessagingService"].GetSecureMessagesAuthInfo().id_value,
                name: _core_utils_data_cache__WEBPACK_IMPORTED_MODULE_6__["DataCache"].getUserInfo().firstName + ' ' + _core_utils_data_cache__WEBPACK_IMPORTED_MODULE_6__["DataCache"].getUserInfo().lastName,
            },
            recipient: {
                type: 'group',
                id_value: this.selectedConversation.groupIdValue,
                name: this.selectedConversation.groupName,
            },
            description: '',
            body: messageBody,
            importance: null,
        };
    };
    /**
     * Send message body to group
     * @param message message body object to send for new message
     */
    SecureMessagePage.prototype.sendMessage = function (message) {
        var _this = this;
        this.newMessageText = null;
        var subscription = this.secureMessagingService.sendSecureMessage(message).subscribe(function () { return _this.addMessageToLocalConversation(message); }, function () {
            var error = { message: 'Unable to verify your user information', title: _app_global__WEBPACK_IMPORTED_MODULE_10__["Exception"].Strings.TITLE };
            _this.modalHandler(error, _this.sendMessage.bind(_this, message));
        });
        this.sourceSubscription.add(subscription);
    };
    /**
     * Add sent message to local conversation
     */
    SecureMessagePage.prototype.addMessageToLocalConversation = function (_a) {
        var body = _a.body;
        var message = {
            body: body,
            created_date: new Date().toLocaleString(),
            description: '',
            id: null,
            importance: null,
            institution_id: _service__WEBPACK_IMPORTED_MODULE_5__["SecureMessagingService"].GetSecureMessagesAuthInfo().institution_id,
            read_date: null,
            recipient: {
                created_date: new Date().toISOString(),
                id: '',
                type: 'group',
                id_field: null,
                id_value: this.selectedConversation.groupIdValue,
                name: this.selectedConversation.groupName,
                aux_user_id: null,
                version: 1,
            },
            replied_message_id: 'None',
            requires_read_receipt: null,
            sender: {
                created_date: new Date().toISOString(),
                id: '',
                type: 'patron',
                id_field: _service__WEBPACK_IMPORTED_MODULE_5__["SecureMessagingService"].GetSecureMessagesAuthInfo().id_field,
                id_value: _service__WEBPACK_IMPORTED_MODULE_5__["SecureMessagingService"].GetSecureMessagesAuthInfo().id_value,
                name: _core_utils_data_cache__WEBPACK_IMPORTED_MODULE_6__["DataCache"].getUserInfo().firstName + ' ' + _core_utils_data_cache__WEBPACK_IMPORTED_MODULE_6__["DataCache"].getUserInfo().lastName,
                aux_user_id: null,
                version: 1,
            },
            sent_date: new Date().toLocaleString(),
            state: null,
            ttl: null,
            version: 1,
        };
        this.newMessageText = null;
        this.selectedConversation.messages.push(message);
        if (this.conversationsArray.indexOf(this.selectedConversation) < 0) {
            this.conversationsArray.push(this.selectedConversation);
        }
        this.sortConversations();
    };
    /**
     * Sort conversations for display
     */
    SecureMessagePage.prototype.sortConversations = function () {
        /// sort conversations by most current
        this.conversationsArray.sort(function (a, b) {
            if (a.messages === null) {
                return 1;
            }
            if (b.messages === null) {
                return -1;
            }
            if (a.messages.length === 0) {
                return 1;
            }
            if (b.messages.length === 0) {
                return -1;
            }
            if (new Date(a.messages[a.messages.length - 1].sent_date).getTime() <
                new Date(b.messages[b.messages.length - 1].sent_date).getTime()) {
                return 1;
            }
            if (new Date(a.messages[a.messages.length - 1].sent_date).getTime() >
                new Date(b.messages[b.messages.length - 1].sent_date).getTime()) {
                return -1;
            }
            return 0;
        });
    };
    /**
     * Heler method to set selected conversation
     * @param conversation conversation to set as selected
     */
    SecureMessagePage.prototype.setSelectedConversation = function (conversation) {
        this.selectedConversation = conversation;
        for (var _i = 0, _a = this.conversationsArray; _i < _a.length; _i++) {
            var convo = _a[_i];
            convo.selected = false;
        }
        this.selectedConversation.selected = true;
    };
    /**
     * Helper method to clear selected conversation
     */
    SecureMessagePage.prototype.clearSelectedConversation = function () {
        if (this.selectedConversation.messages === null || this.selectedConversation.messages.length === 0) {
            for (var _i = 0, _a = this.conversationsArray; _i < _a.length; _i++) {
                var convo = _a[_i];
                if (convo.groupIdValue === this.selectedConversation.groupIdValue) {
                    this.conversationsArray.splice(this.conversationsArray.indexOf(convo), 1);
                }
            }
        }
        this.selectedConversation = null;
        for (var _b = 0, _c = this.conversationsArray; _b < _c.length; _b++) {
            var convo = _c[_b];
            convo.selected = false;
        }
    };
    /**
     * UI helper method to set group initial
     * @param conversation conversation to get data for ui
     */
    SecureMessagePage.prototype.getConversationGroupInitial = function (_a) {
        var groupName = _a.groupName;
        return groupName == null || groupName.length < 1 ? 'U' : groupName[0];
    };
    /**
     * UI helper method to set group name
     * @param conversation conversation to get data for ui
     */
    SecureMessagePage.prototype.getConversationGroupName = function (_a) {
        var groupName = _a.groupName;
        return groupName == null ? 'Conversation' : groupName;
    };
    /**
     * UI helper method to set description text for conversation
     * (this gets the most recently sent message)
     * @param conversation conversation to get data for ui
     */
    SecureMessagePage.prototype.getConversationDescription = function (_a) {
        var messages = _a.messages;
        var lastIMessage = messages[messages.length - 1];
        var frontText = lastIMessage.sender.type === 'patron' ? 'You: ' : '';
        return frontText + lastIMessage.body;
    };
    /**
     * UI helper method to set group initial for chat
     * @param group group to get data for ui
     */
    SecureMessagePage.prototype.getGroupInitial = function (_a) {
        var name = _a.name;
        return name == null || name.length < 1 ? 'U' : name[0];
    };
    /**
     * UI helper method to set group name
     * @param group conversation to get data for ui
     */
    SecureMessagePage.prototype.getGroupName = function (_a) {
        var name = _a.name;
        return name == null ? 'Name Unknown' : name;
    };
    /**
     * UI helper method to set group description
     * @param group group to get data for ui
     */
    SecureMessagePage.prototype.getGroupDescription = function (_a) {
        var description = _a.description;
        return description == null ? '' : description;
    };
    /**
     *
     * @param messages
     * @param messageIndex
     * @param messageType
     */
    SecureMessagePage.prototype.messageShowAvatar = function (_a, messageIndex, messageType) {
        var messages = _a.messages;
        var isNextMessageFromGroup = function () { return messages[messageIndex + 1].sender.type === messageType; };
        var isMoreThanOneMinuteBetweenMessages = function () {
            return new Date(messages[messageIndex + 1].sent_date).getTime() - new Date(messages[messageIndex].sent_date).getTime() <
                60000;
        };
        /// first message
        if (messageIndex === 0) {
            /// more than one message && next message from group as well
            return !(messages.length > 1 && isNextMessageFromGroup() && isMoreThanOneMinuteBetweenMessages());
        }
        /// not last message && more messages && next message from group as well
        return !(messages.length - 1 > messageIndex + 1 &&
            isNextMessageFromGroup() &&
            isMoreThanOneMinuteBetweenMessages());
    };
    /**
     * UI Helper method to determine if the sent date should be shown
     * (used to group messages visually)
     * @param conversation conversation data
     * @param messageIndex index of current message
     * @param messageType type of message (group or patron)
     */
    SecureMessagePage.prototype.messageShowDate = function (_a, messageIndex, messageType) {
        var messages = _a.messages;
        /// next message from group as well:
        var isNextMessageFromGroup = function () {
            //was this message sent within 1 min of the next message:
            var isMessageSentWithinMin = new Date(messages[messageIndex + 1].sent_date).getTime() -
                new Date(messages[messageIndex].sent_date).getTime() <
                60000;
            return messages[messageIndex + 1].sender.type === messageType && isMessageSentWithinMin;
        };
        /// first message
        if (messageIndex === 0) {
            /// more than one message
            return !(messages.length > 1 && isNextMessageFromGroup());
        }
        else {
            /// not first message
            /// more messages
            return !(messages.length - 1 > messageIndex + 1 && isNextMessageFromGroup());
        }
    };
    SecureMessagePage.prototype.modalHandler = function (res, cb) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var popover;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: _secure_message_popover__WEBPACK_IMPORTED_MODULE_9__["SecureMessagePopoverComponent"],
                            componentProps: {
                                data: res,
                            },
                            animated: false,
                            backdropDismiss: true,
                        })];
                    case 1:
                        popover = _a.sent();
                        popover.onDidDismiss().then(function (_a) {
                            var role = _a.role;
                            if (role === _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_8__["BUTTON_TYPE"].CLOSE) {
                                //TODO: this.platform.exitApp();
                            }
                            if (role === _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_8__["BUTTON_TYPE"].RETRY) {
                                cb();
                            }
                        });
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SecureMessagePage.prototype.checkIfOpen = function () {
        this.globalNav.hideNavBar();
        return true;
    };
    SecureMessagePage.prototype.isMainPage = function () {
        this.globalNav.showNavBar();
        return true;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('chatScroll'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SecureMessagePage.prototype, "chatScroll", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('chatInput'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SecureMessagePage.prototype, "chatInput", void 0);
    SecureMessagePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-secure-message',
            template: __webpack_require__(/*! ./secure-message.page.html */ "./src/app/sections/secure-messaging/secure-message.page.html"),
            styles: [__webpack_require__(/*! ./secure-message.page.scss */ "./src/app/sections/secure-messaging/secure-message.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _service__WEBPACK_IMPORTED_MODULE_5__["SecureMessagingService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__["LoadingService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"],
            _core_provider_native_provider_native_provider__WEBPACK_IMPORTED_MODULE_11__["NativeProvider"],
            _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_12__["GlobalNavService"]])
    ], SecureMessagePage);
    return SecureMessagePage;
}());



/***/ }),

/***/ "./src/app/sections/secure-messaging/service/index.ts":
/*!************************************************************!*\
  !*** ./src/app/sections/secure-messaging/service/index.ts ***!
  \************************************************************/
/*! exports provided: SecureMessagingService, SecureMessagingApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _secure_messaging_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./secure-messaging.service */ "./src/app/sections/secure-messaging/service/secure-messaging.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SecureMessagingService", function() { return _secure_messaging_service__WEBPACK_IMPORTED_MODULE_0__["SecureMessagingService"]; });

/* harmony import */ var _secure_messaging_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./secure-messaging-api.service */ "./src/app/sections/secure-messaging/service/secure-messaging-api.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SecureMessagingApiService", function() { return _secure_messaging_api_service__WEBPACK_IMPORTED_MODULE_1__["SecureMessagingApiService"]; });





/***/ }),

/***/ "./src/app/sections/secure-messaging/service/secure-messaging-api.service.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/sections/secure-messaging/service/secure-messaging-api.service.ts ***!
  \***********************************************************************************/
/*! exports provided: SecureMessagingApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecureMessagingApiService", function() { return SecureMessagingApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_core_service_api_service_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/service/api-service/api.service */ "./src/app/core/service/api-service/api.service.ts");




var SecureMessagingApiService = /** @class */ (function () {
    function SecureMessagingApiService(apiService) {
        this.apiService = apiService;
        this.serviceUrlSecureMessage = '/secureMessages';
        this.serviceUrlSecureMessageGroup = '/messageGroups';
    }
    SecureMessagingApiService_1 = SecureMessagingApiService;
    SecureMessagingApiService.setJWT = function (newJWT) {
        SecureMessagingApiService_1.jwt = newJWT;
    };
    SecureMessagingApiService.prototype.getSecureMessages = function (ma_type, ma_id_field, ma_id_value) {
        var url = this.serviceUrlSecureMessage + "?ma_type=" + ma_type + "&ma_id_field=" + ma_id_field + "&ma_id_value=" + ma_id_value;
        return this.apiService.authenticatedHTTPCall(src_app_core_service_api_service_api_service__WEBPACK_IMPORTED_MODULE_3__["RestCallType"].get, url, src_app_core_service_api_service_api_service__WEBPACK_IMPORTED_MODULE_3__["HttpResponseType"].json, null, null, this.getHttpHeaders());
    };
    SecureMessagingApiService.prototype.getSecureMessagesGroups = function (inst_id) {
        var url = this.serviceUrlSecureMessageGroup + "?inst_id=" + inst_id + "&with_members=0";
        return this.apiService.authenticatedHTTPCall(src_app_core_service_api_service_api_service__WEBPACK_IMPORTED_MODULE_3__["RestCallType"].get, url, src_app_core_service_api_service_api_service__WEBPACK_IMPORTED_MODULE_3__["HttpResponseType"].json, null, null, this.getHttpHeaders());
    };
    SecureMessagingApiService.prototype.postSecureMessage = function (messageInfo) {
        return this.apiService.authenticatedHTTPCall(src_app_core_service_api_service_api_service__WEBPACK_IMPORTED_MODULE_3__["RestCallType"].post, this.serviceUrlSecureMessage, src_app_core_service_api_service_api_service__WEBPACK_IMPORTED_MODULE_3__["HttpResponseType"].json, messageInfo, null, this.getHttpHeaders());
    };
    SecureMessagingApiService.prototype.replyToSecureMessage = function (messageInfo) {
        return this.apiService.authenticatedHTTPCall(src_app_core_service_api_service_api_service__WEBPACK_IMPORTED_MODULE_3__["RestCallType"].post, this.serviceUrlSecureMessage, /// does this need a msgId in the URL???
        src_app_core_service_api_service_api_service__WEBPACK_IMPORTED_MODULE_3__["HttpResponseType"].json, messageInfo, null, this.getHttpHeaders());
    };
    SecureMessagingApiService.prototype.deleteSecureMessage = function (messageID) {
        return this.apiService.authenticatedHTTPCall(src_app_core_service_api_service_api_service__WEBPACK_IMPORTED_MODULE_3__["RestCallType"].post, this.serviceUrlSecureMessage + '/' + messageID, src_app_core_service_api_service_api_service__WEBPACK_IMPORTED_MODULE_3__["HttpResponseType"].json, undefined, undefined, this.getHttpHeaders());
    };
    SecureMessagingApiService.prototype.getHttpHeaders = function () {
        return new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Authorization', SecureMessagingApiService_1.jwt);
    };
    var SecureMessagingApiService_1;
    SecureMessagingApiService = SecureMessagingApiService_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_service_api_service_api_service__WEBPACK_IMPORTED_MODULE_3__["APIService"]])
    ], SecureMessagingApiService);
    return SecureMessagingApiService;
}());



/***/ }),

/***/ "./src/app/sections/secure-messaging/service/secure-messaging.service.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/sections/secure-messaging/service/secure-messaging.service.ts ***!
  \*******************************************************************************/
/*! exports provided: SecureMessagingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecureMessagingService", function() { return SecureMessagingService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/internal/operators/switchMap */ "./node_modules/rxjs/internal/operators/switchMap.js");
/* harmony import */ var rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _secure_messaging_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./secure-messaging-api.service */ "./src/app/sections/secure-messaging/service/secure-messaging-api.service.ts");
/* harmony import */ var _core_utils_regexp_patterns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/utils/regexp-patterns */ "./src/app/core/utils/regexp-patterns.ts");
/* harmony import */ var _core_service_auth_api_auth_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/service/auth-api/auth-api.service */ "./src/app/core/service/auth-api/auth-api.service.ts");




// import { AuthService } from '@core/service/auth-service/auth-api.service';



var SecureMessagingService = /** @class */ (function () {
    function SecureMessagingService(authService, secureMessagingService) {
        this.authService = authService;
        this.secureMessagingService = secureMessagingService;
        this.ma_type = 'patron';
        this.refreshTime = 10000;
    }
    SecureMessagingService_1 = SecureMessagingService;
    SecureMessagingService.GetSecureMessagesAuthInfo = function () {
        return SecureMessagingService_1.smAuthInfo;
    };
    SecureMessagingService.prototype.getInitialData = function () {
        var _this = this;
        return this.authService.getExternalAuthenticationToken().pipe(Object(rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (response) {
            _secure_messaging_api_service__WEBPACK_IMPORTED_MODULE_4__["SecureMessagingApiService"].setJWT(response);
            SecureMessagingService_1.smAuthInfo = JSON.parse(atob(response.split('.')[1]));
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(_this.getSecureMessagesGroups(), _this.getSecureMessages());
        }));
    };
    SecureMessagingService.prototype.sendSecureMessage = function (messageInfo) {
        return this.secureMessagingService.postSecureMessage(messageInfo);
    };
    SecureMessagingService.prototype.getSecureMessages = function () {
        return this.secureMessagingService.getSecureMessages(this.ma_type, SecureMessagingService_1.smAuthInfo.id_field, SecureMessagingService_1.smAuthInfo.id_value);
    };
    SecureMessagingService.prototype.pollForData = function () {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["timer"])(this.refreshTime, this.refreshTime).pipe(Object(rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(_this.getSecureMessagesGroups(), _this.getSecureMessages()); }));
    };
    SecureMessagingService.prototype.getSecureMessagesGroups = function () {
        return this.secureMessagingService.getSecureMessagesGroups(SecureMessagingService_1.smAuthInfo.institution_id);
    };
    SecureMessagingService.prototype.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(_core_utils_regexp_patterns__WEBPACK_IMPORTED_MODULE_5__["X_Y_REGEXP"], function (c) {
            // tslint:disable-next-line:no-bitwise
            var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };
    var SecureMessagingService_1;
    SecureMessagingService = SecureMessagingService_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_service_auth_api_auth_api_service__WEBPACK_IMPORTED_MODULE_6__["AuthApiService"],
            _secure_messaging_api_service__WEBPACK_IMPORTED_MODULE_4__["SecureMessagingApiService"]])
    ], SecureMessagingService);
    return SecureMessagingService;
}());



/***/ }),

/***/ "./src/app/shared/pipes/message-date/index.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/pipes/message-date/index.ts ***!
  \****************************************************/
/*! exports provided: MessageDatePipeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _message_date_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message-date.module */ "./src/app/shared/pipes/message-date/message-date.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageDatePipeModule", function() { return _message_date_module__WEBPACK_IMPORTED_MODULE_0__["MessageDatePipeModule"]; });




/***/ }),

/***/ "./src/app/shared/pipes/message-date/message-date.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/shared/pipes/message-date/message-date.module.ts ***!
  \******************************************************************/
/*! exports provided: MessageDatePipeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageDatePipeModule", function() { return MessageDatePipeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _message_date_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./message-date.pipe */ "./src/app/shared/pipes/message-date/message-date.pipe.ts");




var declarations = [_message_date_pipe__WEBPACK_IMPORTED_MODULE_3__["MessageDatePipe"]];
var MessageDatePipeModule = /** @class */ (function () {
    function MessageDatePipeModule() {
    }
    MessageDatePipeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: declarations
        })
    ], MessageDatePipeModule);
    return MessageDatePipeModule;
}());



/***/ }),

/***/ "./src/app/shared/pipes/message-date/message-date.pipe.ts":
/*!****************************************************************!*\
  !*** ./src/app/shared/pipes/message-date/message-date.pipe.ts ***!
  \****************************************************************/
/*! exports provided: MessageDatePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageDatePipe", function() { return MessageDatePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");



var MessageDatePipe = /** @class */ (function () {
    function MessageDatePipe(datePipe) {
        this.datePipe = datePipe;
    }
    MessageDatePipe.prototype.transform = function (_a, args) {
        var sent_date = _a.sent_date;
        var today = new Date();
        var sentDate = new Date(sent_date);
        /// > 1 year (Full timestamp)
        if (today.getFullYear() > sentDate.getFullYear()) {
            return this.datePipe.transform(sentDate, 'mediumDate');
        }
        /// > 5 days (<monthAbbv> <date>, xx:xx AM/PM)
        if (today.getTime() - sentDate.getTime() > 432000000) {
            return this.datePipe.transform(sentDate, 'MMM d, h:mm a');
        }
        /// > 2 days (<dayAbbv> xx:xx AM/PM)
        if (today.getTime() - sentDate.getTime() >= 172800000) {
            return this.datePipe.transform(sentDate, 'E, h:mm a');
        }
        /// > 1 day (Yesterday at xx:xx AM/PM)
        if (today.getTime() - sentDate.getTime() >= 86400000) {
            // tslint:disable-next-line:quotemark
            return this.datePipe.transform(sentDate, "'Yesterday at ' h:mm a'");
        }
        /// > 5 minutes (xx:xx AM/PM)
        if (today.getTime() - sentDate.getTime() > 300000) {
            return this.datePipe.transform(sentDate, 'h:mm a');
        }
        /// > 1 minute (x minutes ago)
        if (today.getTime() - sentDate.getTime() > 60000) {
            var minutesAgo = Math.round((today.getTime() - sentDate.getTime()) / 60000);
            return minutesAgo.toString() + (minutesAgo === 1 ? ' minute ago' : ' minutes ago');
        }
        /// < 1 minute (Now)
        return 'Now';
    };
    MessageDatePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'messageDate',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"]])
    ], MessageDatePipe);
    return MessageDatePipe;
}());



/***/ })

}]);
//# sourceMappingURL=default~dashboard-dashboard-module~secure-messaging-secure-message-module.js.map