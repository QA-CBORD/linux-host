(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/@ionic/core/dist/esm-es5/cubic-bezier-2812fda3.js":
/*!************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/cubic-bezier-2812fda3.js ***!
  \************************************************************************/
/*! exports provided: P, g */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return Point; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getTimeGivenProgression; });
/**
 * Based on:
 * https://stackoverflow.com/questions/7348009/y-coordinate-for-a-given-x-cubic-bezier
 * https://math.stackexchange.com/questions/26846/is-there-an-explicit-form-for-cubic-b%C3%A9zier-curves
 * TODO: Reduce rounding error
 */
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
/**
 * Given a cubic-bezier curve, get the x value (time) given
 * the y value (progression).
 * Ex: cubic-bezier(0.32, 0.72, 0, 1);
 * P0: (0, 0)
 * P1: (0.32, 0.72)
 * P2: (0, 1)
 * P3: (1, 1)
 *
 * If you give a cubic bezier curve that never reaches the
 * provided progression, this function will return NaN.
 */
var getTimeGivenProgression = function (p0, p1, p2, p3, progression) {
    var tValues = solveCubicBezier(p0.y, p1.y, p2.y, p3.y, progression);
    return solveCubicParametricEquation(p0.x, p1.x, p2.x, p3.x, tValues[0]); // TODO: Add better strategy for dealing with multiple solutions
};
/**
 * Solve a cubic equation in one dimension (time)
 */
var solveCubicParametricEquation = function (p0, p1, p2, p3, t) {
    var partA = (3 * p1) * Math.pow(t - 1, 2);
    var partB = (-3 * p2 * t) + (3 * p2) + (p3 * t);
    var partC = p0 * Math.pow(t - 1, 3);
    return t * (partA + (t * partB)) - partC;
};
/**
 * Find the `t` value for a cubic bezier using Cardano's formula
 */
var solveCubicBezier = function (p0, p1, p2, p3, refPoint) {
    p0 -= refPoint;
    p1 -= refPoint;
    p2 -= refPoint;
    p3 -= refPoint;
    var roots = solveCubicEquation(p3 - 3 * p2 + 3 * p1 - p0, 3 * p2 - 6 * p1 + 3 * p0, 3 * p1 - 3 * p0, p0);
    return roots.filter(function (root) { return root >= 0 && root <= 1; });
};
var solveQuadraticEquation = function (a, b, c) {
    var discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        return [];
    }
    else {
        return [
            (-b + Math.sqrt(discriminant)) / (2 * a),
            (-b - Math.sqrt(discriminant)) / (2 * a)
        ];
    }
};
var solveCubicEquation = function (a, b, c, d) {
    if (a === 0) {
        return solveQuadraticEquation(b, c, d);
    }
    b /= a;
    c /= a;
    d /= a;
    var p = (3 * c - b * b) / 3;
    var q = (2 * b * b * b - 9 * b * c + 27 * d) / 27;
    if (p === 0) {
        return [Math.pow(-q, 1 / 3)];
    }
    else if (q === 0) {
        return [Math.sqrt(-p), -Math.sqrt(-p)];
    }
    var discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);
    if (discriminant === 0) {
        return [Math.pow(q / 2, 1 / 2) - b / 3];
    }
    else if (discriminant > 0) {
        return [Math.pow(-(q / 2) + Math.sqrt(discriminant), 1 / 3) - Math.pow((q / 2) + Math.sqrt(discriminant), 1 / 3) - b / 3];
    }
    var r = Math.sqrt(Math.pow(-(p / 3), 3));
    var phi = Math.acos(-(q / (2 * Math.sqrt(Math.pow(-(p / 3), 3)))));
    var s = 2 * Math.pow(r, 1 / 3);
    return [
        s * Math.cos(phi / 3) - b / 3,
        s * Math.cos((phi + 2 * Math.PI) / 3) - b / 3,
        s * Math.cos((phi + 4 * Math.PI) / 3) - b / 3
    ];
};



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm-es5/haptic-c8f1473e.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/haptic-c8f1473e.js ***!
  \******************************************************************/
/*! exports provided: a, b, c, h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hapticSelectionStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hapticSelectionChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hapticSelectionEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hapticSelection; });
/**
 * Check to see if the Haptic Plugin is available
 * @return Returns `true` or false if the plugin is available
 */
/**
 * Trigger a selection changed haptic event. Good for one-time events
 * (not for gestures)
 */
var hapticSelection = function () {
    var engine = window.TapticEngine;
    if (engine) {
        engine.selection();
    }
};
/**
 * Tell the haptic engine that a gesture for a selection change is starting.
 */
var hapticSelectionStart = function () {
    var engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionStart();
    }
};
/**
 * Tell the haptic engine that a selection changed during a gesture.
 */
var hapticSelectionChanged = function () {
    var engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionChanged();
    }
};
/**
 * Tell the haptic engine we are done with a gesture. This needs to be
 * called lest resources are not properly recycled.
 */
var hapticSelectionEnd = function () {
    var engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionEnd();
    }
};



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm-es5/index-3476b023.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/index-3476b023.js ***!
  \*****************************************************************/
/*! exports provided: s */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return sanitizeDOMString; });
/**
 * Does a simple sanitization of all elements
 * in an untrusted string
 */
var sanitizeDOMString = function (untrustedString) {
    try {
        if (typeof untrustedString !== 'string' || untrustedString === '') {
            return untrustedString;
        }
        /**
         * Create a document fragment
         * separate from the main DOM,
         * create a div to do our work in
         */
        var documentFragment_1 = document.createDocumentFragment();
        var workingDiv = document.createElement('div');
        documentFragment_1.appendChild(workingDiv);
        workingDiv.innerHTML = untrustedString;
        /**
         * Remove any elements
         * that are blocked
         */
        blockedTags.forEach(function (blockedTag) {
            var getElementsToRemove = documentFragment_1.querySelectorAll(blockedTag);
            for (var elementIndex = getElementsToRemove.length - 1; elementIndex >= 0; elementIndex--) {
                var element = getElementsToRemove[elementIndex];
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
                else {
                    documentFragment_1.removeChild(element);
                }
                /**
                 * We still need to sanitize
                 * the children of this element
                 * as they are left behind
                 */
                var childElements = getElementChildren(element);
                /* tslint:disable-next-line */
                for (var childIndex = 0; childIndex < childElements.length; childIndex++) {
                    sanitizeElement(childElements[childIndex]);
                }
            }
        });
        /**
         * Go through remaining elements and remove
         * non-allowed attribs
         */
        // IE does not support .children on document fragments, only .childNodes
        var dfChildren = getElementChildren(documentFragment_1);
        /* tslint:disable-next-line */
        for (var childIndex = 0; childIndex < dfChildren.length; childIndex++) {
            sanitizeElement(dfChildren[childIndex]);
        }
        // Append document fragment to div
        var fragmentDiv = document.createElement('div');
        fragmentDiv.appendChild(documentFragment_1);
        // First child is always the div we did our work in
        var getInnerDiv = fragmentDiv.querySelector('div');
        return (getInnerDiv !== null) ? getInnerDiv.innerHTML : fragmentDiv.innerHTML;
    }
    catch (err) {
        console.error(err);
        return '';
    }
};
/**
 * Clean up current element based on allowed attributes
 * and then recursively dig down into any child elements to
 * clean those up as well
 */
var sanitizeElement = function (element) {
    // IE uses childNodes, so ignore nodes that are not elements
    if (element.nodeType && element.nodeType !== 1) {
        return;
    }
    for (var i = element.attributes.length - 1; i >= 0; i--) {
        var attribute = element.attributes.item(i);
        var attributeName = attribute.name;
        // remove non-allowed attribs
        if (!allowedAttributes.includes(attributeName.toLowerCase())) {
            element.removeAttribute(attributeName);
            continue;
        }
        // clean up any allowed attribs
        // that attempt to do any JS funny-business
        var attributeValue = attribute.value;
        /* tslint:disable-next-line */
        if (attributeValue != null && attributeValue.toLowerCase().includes('javascript:')) {
            element.removeAttribute(attributeName);
        }
    }
    /**
     * Sanitize any nested children
     */
    var childElements = getElementChildren(element);
    /* tslint:disable-next-line */
    for (var i = 0; i < childElements.length; i++) {
        sanitizeElement(childElements[i]);
    }
};
/**
 * IE doesn't always support .children
 * so we revert to .childNodes instead
 */
var getElementChildren = function (el) {
    return (el.children != null) ? el.children : el.childNodes;
};
var allowedAttributes = ['class', 'id', 'href', 'src', 'name', 'slot'];
var blockedTags = ['script', 'style', 'iframe', 'meta', 'link', 'object', 'embed'];



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js ***!
  \*****************************************************************/
/*! exports provided: c, g, h, o */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createColorClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getClassMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hostContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return openURL; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var hostContext = function (selector, el) {
    return el.closest(selector) !== null;
};
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
var createColorClasses = function (color) {
    var _a;
    return (typeof color === 'string' && color.length > 0) ? (_a = {
            'ion-color': true
        },
        _a["ion-color-" + color] = true,
        _a) : undefined;
};
var getClassList = function (classes) {
    if (classes !== undefined) {
        var array = Array.isArray(classes) ? classes : classes.split(' ');
        return array
            .filter(function (c) { return c != null; })
            .map(function (c) { return c.trim(); })
            .filter(function (c) { return c !== ''; });
    }
    return [];
};
var getClassMap = function (classes) {
    var map = {};
    getClassList(classes).forEach(function (c) { return map[c] = true; });
    return map;
};
var SCHEME = /^[a-z][a-z0-9+\-.]*:/;
var openURL = function (url, ev, direction) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
    var router;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        if (url != null && url[0] !== '#' && !SCHEME.test(url)) {
            router = document.querySelector('ion-router');
            if (router) {
                if (ev != null) {
                    ev.preventDefault();
                }
                return [2 /*return*/, router.push(url, direction)];
            }
        }
        return [2 /*return*/, false];
    });
}); };



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm-es5/watch-options-2af96011.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/watch-options-2af96011.js ***!
  \*************************************************************************/
/*! exports provided: f, w */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return findCheckedOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return watchForOptions; });
var watchForOptions = function (containerEl, tagName, onChange) {
    var mutation = new MutationObserver(function (mutationList) {
        onChange(getSelectedOption(mutationList, tagName));
    });
    mutation.observe(containerEl, {
        childList: true,
        subtree: true
    });
    return mutation;
};
var getSelectedOption = function (mutationList, tagName) {
    var newOption;
    mutationList.forEach(function (mut) {
        // tslint:disable-next-line: prefer-for-of
        for (var i = 0; i < mut.addedNodes.length; i++) {
            newOption = findCheckedOption(mut.addedNodes[i], tagName) || newOption;
        }
    });
    return newOption;
};
var findCheckedOption = function (el, tagName) {
    if (el.nodeType !== 1) {
        return undefined;
    }
    var options = (el.tagName === tagName.toUpperCase())
        ? [el]
        : Array.from(el.querySelectorAll(tagName));
    return options.find(function (o) { return o.checked === true; });
};



/***/ }),

/***/ "./src/app/core/model/add-funds/applepay-response.model.ts":
/*!*****************************************************************!*\
  !*** ./src/app/core/model/add-funds/applepay-response.model.ts ***!
  \*****************************************************************/
/*! exports provided: ApplePay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplePay", function() { return ApplePay; });
var ApplePay;
(function (ApplePay) {
    ApplePay[ApplePay["ORDERS_WITH_APPLE_PAY"] = 0] = "ORDERS_WITH_APPLE_PAY";
    ApplePay[ApplePay["DEPOSITS_WITH_APPLE_PAY"] = 1] = "DEPOSITS_WITH_APPLE_PAY";
})(ApplePay || (ApplePay = {}));


/***/ }),

/***/ "./src/app/core/service/external-payment/external-payment.service.ts":
/*!***************************************************************************!*\
  !*** ./src/app/core/service/external-payment/external-payment.service.ts ***!
  \***************************************************************************/
/*! exports provided: ExternalPaymentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExternalPaymentService", function() { return ExternalPaymentService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "./node_modules/@ionic-native/in-app-browser/ngx/index.js");
/* harmony import */ var _core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/facades/auth/auth.facade.service */ "./src/app/core/facades/auth/auth.facade.service.ts");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../environment */ "./src/app/environment.ts");
/* harmony import */ var _core_facades_institution_institution_facade_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/facades/institution/institution.facade.service */ "./src/app/core/facades/institution/institution.facade.service.ts");
/* harmony import */ var _core_model_add_funds_applepay_response_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/model/add-funds/applepay-response.model */ "./src/app/core/model/add-funds/applepay-response.model.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");










var Browser = _capacitor_core__WEBPACK_IMPORTED_MODULE_8__["Plugins"].Browser, IOSDevice = _capacitor_core__WEBPACK_IMPORTED_MODULE_8__["Plugins"].IOSDevice;
var ExternalPaymentService = /** @class */ (function () {
    function ExternalPaymentService(inAppBrowser, institutionFacadeService, authFacadeService) {
        this.inAppBrowser = inAppBrowser;
        this.institutionFacadeService = institutionFacadeService;
        this.authFacadeService = authFacadeService;
    }
    /* USAePay */
    /* WKWebView is the required webview by Apple  */
    ExternalPaymentService.prototype.addUSAePayCreditCard = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var authTokenObservable = _this.authFacadeService.getAuthenticationToken$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
            var institutionInfoObservable = _this.institutionFacadeService.cachedInstitutionInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
            Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["zip"])(authTokenObservable, institutionInfoObservable).subscribe(function (_a) {
                var authToken = _a[0], institutionInfo = _a[1];
                var browser = _this.openUSAePayPage(authToken, institutionInfo.shortName);
                browser.on('loadstart').subscribe(function (event) {
                    _this.handleUSAePayResponse(event, resolve, reject, browser);
                });
                browser.on('loaderror').subscribe(function () {
                    reject('Your request failed. Please try again.');
                    browser.close();
                });
            }, function (error) {
                reject({ success: false, errorMessage: "The request failed: " + error });
            });
        });
    };
    /* Apple Pay */
    /* Safari browser is required by Aople to use Apple Pay */
    ExternalPaymentService.prototype.payWithApplePay = function (handleApplePay, queryParams) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var authTokenObservable = _this.authFacadeService.getAuthenticationToken$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
                        var institutionInfoObservable = _this.institutionFacadeService.cachedInstitutionInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
                        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["zip"])(authTokenObservable, institutionInfoObservable).subscribe(function (_a) {
                            var authToken = _a[0], institutionInfo = _a[1];
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this.openApplePayPage(queryParams, handleApplePay, authToken, institutionInfo.shortName)];
                                        case 1:
                                            _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        }, function (error) {
                            reject({ success: false, errorMessage: "The request failed: " + error });
                        });
                        _this.handleApplePayResponse(resolve, reject);
                    })];
            });
        });
    };
    ExternalPaymentService.prototype.openApplePayPage = function (queryParams, handleApplePay, authToken, shortName) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var fullURL;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullURL = this.getApplePayURL(queryParams, handleApplePay, authToken, shortName);
                        return [4 /*yield*/, Browser.open({ url: "" + fullURL })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExternalPaymentService.prototype.openUSAePayPage = function (authToken, shortName) {
        var target = '_blank';
        var url = _environment__WEBPACK_IMPORTED_MODULE_5__["Environment"].getSitesURL() + "/" + shortName + "/full/add_card_mobile.php?session_token=" + authToken;
        var options = {
            usewkwebview: 'yes',
            toolbarposition: 'top',
            closebuttoncaption: 'Back',
            location: 'no',
            hidenavigationbuttons: 'yes',
            toolbarcolor: '#ffffff',
        };
        var browser = this.inAppBrowser.create(url, target, options);
        return browser;
    };
    ExternalPaymentService.prototype.getApplePayURL = function (queryParams, handleApplePay, authToken, shortName) {
        var fullURL = '';
        var params = JSON.parse(JSON.stringify(queryParams));
        var applePayBaseURL = _environment__WEBPACK_IMPORTED_MODULE_5__["Environment"].getSitesURL() + "/" + shortName + "/full/applepay.php?";
        if (handleApplePay === _core_model_add_funds_applepay_response_model__WEBPACK_IMPORTED_MODULE_7__["ApplePay"].ORDERS_WITH_APPLE_PAY) {
            fullURL = applePayBaseURL + "order_total=" + (params.total || '') + "&session_token=" + (authToken ||
                '') + "&sub_total=" + (params.subTotal || '') + "&fee=" + (params.useFee || '') + "&tax=" + (params.tax ||
                '0.00') + "&discount=" + (params.discount || '0.00') + "&pickup_fee=" + (params.pickupFee ||
                '') + "&delivery_fee=" + (params.deliveryFee || '') + "&tip=" + (params.tip || '');
        }
        else if (handleApplePay === _core_model_add_funds_applepay_response_model__WEBPACK_IMPORTED_MODULE_7__["ApplePay"].DEPOSITS_WITH_APPLE_PAY) {
            fullURL = applePayBaseURL + "amount=" + (params.depositAmount || '') + "&select_account=" + (params.accountId ||
                '') + "&session_token=" + (authToken || '');
        }
        return fullURL;
    };
    ExternalPaymentService.prototype.handleUSAePayResponse = function (event, resolve, reject, browser) {
        if (event && event.url) {
            var url = event.url;
            if (url.includes('action_complete')) {
                if (url.includes('action_complete=1')) {
                    resolve({ success: true });
                }
                else if (url.includes('error=')) {
                    var errorMessage = new URLSearchParams(url).get('error');
                    reject("Your request failed: " + errorMessage + ". Please try again.");
                }
                browser.close();
            }
        }
    };
    ExternalPaymentService.prototype.handleApplePayResponse = function (resolve, reject) {
        var _this = this;
        var applePayEvent = IOSDevice.addListener('ApplePayEvent', function (info) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var accountId, accountName, amount;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (info.url && info.url.includes('applepay')) {
                            if (info.url.includes('status=success')) {
                                accountId = new URLSearchParams(info.url).get('accountId') || '';
                                accountName = new URLSearchParams(info.url).get('accountName') || '';
                                amount = new URLSearchParams(info.url).get('amount') || '';
                                resolve({
                                    success: true,
                                    amount: amount,
                                    selectedAccount: { accountDisplayName: accountName },
                                    accountId: accountId,
                                    sourceAcc: { accountTender: 'Apple Pay' },
                                });
                            }
                            else {
                                reject({ success: false, errorMessage: 'The request failed.' });
                            }
                        }
                        else {
                            reject({ success: false, errorMessage: 'The request failed.' });
                        }
                        return [4 /*yield*/, Browser.close().then(function () {
                                applePayEvent.remove();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ExternalPaymentService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_3__["InAppBrowser"],
            _core_facades_institution_institution_facade_service__WEBPACK_IMPORTED_MODULE_6__["InstitutionFacadeService"],
            _core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_4__["AuthFacadeService"]])
    ], ExternalPaymentService);
    return ExternalPaymentService;
}());



/***/ }),

/***/ "./src/app/sections/accounts/services/deposit.service.ts":
/*!***************************************************************!*\
  !*** ./src/app/sections/accounts/services/deposit.service.ts ***!
  \***************************************************************/
/*! exports provided: DepositService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepositService", function() { return DepositService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_core_service_commerce_commerce_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/service/commerce/commerce-api.service */ "./src/app/core/service/commerce/commerce-api.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/accounts/accounts.config */ "./src/app/sections/accounts/accounts.config.ts");
/* harmony import */ var _content_strings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../content-strings */ "./src/app/content-strings.ts");
/* harmony import */ var _core_service_content_service_content_strings_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/service/content-service/content-strings-api.service */ "./src/app/core/service/content-service/content-strings-api.service.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");









var DepositService = /** @class */ (function () {
    function DepositService(commerceApiService, contentService, settingsFacadeService) {
        this.commerceApiService = commerceApiService;
        this.contentService = contentService;
        this.settingsFacadeService = settingsFacadeService;
        this._accounts$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]([]);
        this._settings$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]([]);
    }
    Object.defineProperty(DepositService.prototype, "accounts$", {
        get: function () {
            return this._accounts$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositService.prototype, "_accounts", {
        set: function (value) {
            this._accounts$.next(value.slice());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositService.prototype, "settings$", {
        get: function () {
            return this._settings$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositService.prototype, "_settings", {
        set: function (value) {
            this._settings$.next(value.slice());
        },
        enumerable: true,
        configurable: true
    });
    DepositService.prototype.getUserAccounts = function () {
        var _this = this;
        return this.commerceApiService.getUserAccounts().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (accounts) { return (_this._accounts = accounts); }));
    };
    DepositService.prototype.getUserSettings = function (settings) {
        var _this = this;
        var requestArray = settings.map(function (setting) { return _this.settingsFacadeService.getSetting(setting); });
        return rxjs__WEBPACK_IMPORTED_MODULE_3__["zip"].apply(void 0, requestArray).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (settings) { return (_this._settings = settings); }));
    };
    DepositService.prototype.getSettingByName = function (settings, name) {
        return settings.find(function (_a) {
            var n = _a.name;
            return n === name;
        });
    };
    DepositService.prototype.filterAccountsByPaymentSystem = function (accounts) {
        return accounts.filter(function (_a) {
            var type = _a.paymentSystemType;
            return type === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_SYSTEM_TYPE"].MONETRA || type === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_SYSTEM_TYPE"].USAEPAY;
        });
    };
    DepositService.prototype.filterCreditCardDestAccounts = function (tendersId, accounts) {
        return accounts.filter(function (_a) {
            var depositAccepted = _a.depositAccepted, accountTender = _a.accountTender;
            return depositAccepted && tendersId.includes(accountTender);
        });
    };
    DepositService.prototype.filterBillmeDestAccounts = function (billmeMappingArr, accounts) {
        return accounts.filter(function (destinationAccount) {
            var destTender = destinationAccount.accountTender || null;
            var destDepositAccepted = destinationAccount.depositAccepted || false;
            /// destination account deposits accepted?
            if (destDepositAccepted && destTender) {
                /* if an account in our account array matches the source tender
                associated to the billMe map with the destination
                account as the destination tender, then we have a destination
                account with an associated source account.  This destination account is legit */
                return (billmeMappingArr
                    .filter(function (_a) {
                    var destination = _a.destination;
                    return destTender === destination;
                })
                    .filter(function (bmi) {
                    return accounts.filter(function (sourceAccount) { return sourceAccount.accountTender === bmi.source; }).length > 0;
                }).length > 0);
            }
        });
    };
    DepositService.prototype.filterBillmeSourceAccounts = function (billmeMappingArr, accounts) {
        return billmeMappingArr.reduce(function (res, _a) {
            var source = _a.source, destination = _a.destination;
            var sourceAcc = accounts.find(function (acc) {
                return acc.accountTender === source &&
                    accounts.some(function (_a) {
                        var dAccepted = _a.depositAccepted, tender = _a.accountTender;
                        return dAccepted && tender === destination;
                    });
            });
            return sourceAcc ? res.concat([sourceAcc]) : res;
        }, []);
    };
    DepositService.prototype.sourceAccForBillmeDeposit = function (selectedAccount, billmeMappingArr) {
        var _this = this;
        var filterByBillme = function (accTender) { return billmeMappingArr.find(function (billmeMap) { return billmeMap['destination'] === accTender; }); };
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(filterByBillme(selectedAccount.accountTender)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (billmeMapObj) {
            return _this.accounts$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (accounts) { return accounts.find(function (_a) {
                var accountTender = _a.accountTender;
                return billmeMapObj['source'] === accountTender;
            }); }));
        }));
    };
    DepositService.prototype.calculateDepositFee = function (fromAccountId, toAccountId, amount) {
        return this.commerceApiService.calculateDepositFee(fromAccountId, toAccountId, amount);
    };
    DepositService.prototype.deposit = function (fromAccountId, toAccountId, amount, fromAccountCvv) {
        return this.commerceApiService.deposit(fromAccountId, toAccountId, amount, fromAccountCvv);
    };
    DepositService.prototype.initContentStringsList = function () {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(this.contentService.retrieveContentStringByConfig({
            domain: _content_strings__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STINGS_DOMAINS"].patronUi,
            category: _content_strings__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STINGS_CATEGORIES"].accounts,
            name: _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].creditDepositReviewInstructions,
        }), this.contentService.retrieveContentStringByConfig({
            domain: _content_strings__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STINGS_DOMAINS"].patronUi,
            category: _content_strings__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STINGS_CATEGORIES"].accounts,
            name: _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].billMeDepositReviewInstructions,
        })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var res = _a[0], res0 = _a[1];
            var finalArray = [res, res0];
            _this.contentString = finalArray.reduce(function (init, elem) {
                var _a;
                return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, init, (_a = {}, _a[elem.name] = elem.value, _a)));
            }, {});
            return finalArray;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1));
    };
    DepositService.prototype.getContentValueByName = function (name) {
        return this.contentString[name] || '';
    };
    DepositService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_service_commerce_commerce_api_service__WEBPACK_IMPORTED_MODULE_2__["CommerceApiService"],
            _core_service_content_service_content_strings_api_service__WEBPACK_IMPORTED_MODULE_7__["ContentStringsApiService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_8__["SettingsFacadeService"]])
    ], DepositService);
    return DepositService;
}());



/***/ }),

/***/ "./src/app/sections/accounts/shared/pipes/credit-card-type/credit-card-type.module.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/pipes/credit-card-type/credit-card-type.module.ts ***!
  \********************************************************************************************/
/*! exports provided: CreditCardTypeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditCardTypeModule", function() { return CreditCardTypeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _credit_card_type_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./credit-card-type.pipe */ "./src/app/sections/accounts/shared/pipes/credit-card-type/credit-card-type.pipe.ts");




var declarations = [_credit_card_type_pipe__WEBPACK_IMPORTED_MODULE_3__["CreditCardTypePipe"]];
var CreditCardTypeModule = /** @class */ (function () {
    function CreditCardTypeModule() {
    }
    CreditCardTypeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: declarations
        })
    ], CreditCardTypeModule);
    return CreditCardTypeModule;
}());



/***/ }),

/***/ "./src/app/sections/explore/explore.config.ts":
/*!****************************************************!*\
  !*** ./src/app/sections/explore/explore.config.ts ***!
  \****************************************************/
/*! exports provided: EXPLORE_ROUTING */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPLORE_ROUTING", function() { return EXPLORE_ROUTING; });
var EXPLORE_ROUTING;
(function (EXPLORE_ROUTING) {
    EXPLORE_ROUTING["merchantDetails"] = "merchant-details";
})(EXPLORE_ROUTING || (EXPLORE_ROUTING = {}));


/***/ }),

/***/ "./src/app/sections/explore/services/explore.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/sections/explore/services/explore.service.ts ***!
  \**************************************************************/
/*! exports provided: ExploreService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExploreService", function() { return ExploreService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_facades_merchant_merchant_facade_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/facades/merchant/merchant-facade.service */ "./src/app/core/facades/merchant/merchant-facade.service.ts");
/* harmony import */ var _core_facades_favourite_merchant_favorite_merchants_facade_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/facades/favourite-merchant/favorite-merchants-facade.service */ "./src/app/core/facades/favourite-merchant/favorite-merchants-facade.service.ts");
/* harmony import */ var _core_facades_menu_merchant_menu_merchant_facade_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/facades/menu-merchant/menu-merchant-facade.service */ "./src/app/core/facades/menu-merchant/menu-merchant-facade.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var _core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/utils/general-helpers */ "./src/app/core/utils/general-helpers.ts");










var ExploreService = /** @class */ (function () {
    function ExploreService(merchantFacadeService, favoriteMerchantsFacadeService, menuMerchantFacadeService, settingsFacadeService) {
        this.merchantFacadeService = merchantFacadeService;
        this.favoriteMerchantsFacadeService = favoriteMerchantsFacadeService;
        this.menuMerchantFacadeService = menuMerchantFacadeService;
        this.settingsFacadeService = settingsFacadeService;
    }
    Object.defineProperty(ExploreService.prototype, "merchants$", {
        get: function () {
            var _this = this;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["combineLatest"])(this.merchantFacadeService.merchants$, this.favoriteMerchantsFacadeService.favoriteMerchants$, this.menuMerchantFacadeService.menuMerchants$, this.getFoodSetting()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (_a) {
                var merchants = _a[0], favMerchants = _a[1], menuMerchants = _a[2], enableFoodSetting = _a[3];
                return _this.updateMerchantInfo(merchants, favMerchants, menuMerchants, enableFoodSetting);
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExploreService.prototype, "sortedMerchants$", {
        get: function () {
            return this.merchants$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_9__["exploreMerchantSorting"]));
        },
        enumerable: true,
        configurable: true
    });
    ExploreService.prototype.getFoodSetting = function () {
        return this.settingsFacadeService.getSetting(_app_global__WEBPACK_IMPORTED_MODULE_8__["Settings"].Setting.FOOD_ENABLED);
    };
    ExploreService.prototype.getMerchantById$ = function (id) {
        return this.merchants$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (merchants) { return merchants.find(function (_a) {
            var mId = _a.id;
            return id === mId;
        }); }));
    };
    ExploreService.prototype.getInitialMerchantData$ = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["zip"])(this.merchantFacadeService.fetchMerchants$(), this.favoriteMerchantsFacadeService.fetchFavoritesMerchants$(), this.menuMerchantFacadeService.fetchMenuMerchant$());
    };
    ExploreService.prototype.updateMerchantInfo = function (merchants, favMerchants, menuMerchants, foodEnabledSetting) {
        if (merchants === void 0) { merchants = []; }
        if (favMerchants === void 0) { favMerchants = []; }
        if (menuMerchants === void 0) { menuMerchants = []; }
        var isFoodEnabled = foodEnabledSetting && Boolean(Number(foodEnabledSetting.value));
        var menuIds = menuMerchants.map(function (_a) {
            var id = _a.id;
            return id;
        });
        var favIds = favMerchants.map(function (_a) {
            var id = _a.id;
            return id;
        });
        return merchants.map(function (merchant) { return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, merchant, { isFavorite: favIds.includes(merchant.id), isAbleToOrder: menuIds.includes(merchant.id) && isFoodEnabled })); });
    };
    ExploreService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_facades_merchant_merchant_facade_service__WEBPACK_IMPORTED_MODULE_2__["MerchantFacadeService"],
            _core_facades_favourite_merchant_favorite_merchants_facade_service__WEBPACK_IMPORTED_MODULE_3__["FavoriteMerchantsFacadeService"],
            _core_facades_menu_merchant_menu_merchant_facade_service__WEBPACK_IMPORTED_MODULE_4__["MenuMerchantFacadeService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_7__["SettingsFacadeService"]])
    ], ExploreService);
    return ExploreService;
}());



/***/ }),

/***/ "./src/app/sections/ordering/components/merchant-list/merchant-list.module.ts":
/*!************************************************************************************!*\
  !*** ./src/app/sections/ordering/components/merchant-list/merchant-list.module.ts ***!
  \************************************************************************************/
/*! exports provided: MerchantListModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MerchantListModule", function() { return MerchantListModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _sections_ordering__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/ordering */ "./src/app/sections/ordering/index.ts");
/* harmony import */ var _merchant_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./merchant-item */ "./src/app/sections/ordering/components/merchant-list/merchant-item/index.ts");
/* harmony import */ var _sections_ordering_shared_ui_components_order_options_action_sheet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/ordering/shared/ui-components/order-options.action-sheet */ "./src/app/sections/ordering/shared/ui-components/order-options.action-sheet/index.ts");
/* harmony import */ var _shared_directives_stop_propogation_stop_propagation_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/directives/stop-propogation/stop-propagation.module */ "./src/app/shared/directives/stop-propogation/stop-propagation.module.ts");
/* harmony import */ var _shared_pipes_merchant_distance_merchant_distance_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shared/pipes/merchant-distance/merchant-distance.module */ "./src/app/shared/pipes/merchant-distance/merchant-distance.module.ts");
/* harmony import */ var _sections_ordering_shared_pipes_order_type_order_type_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sections/ordering/shared/pipes/order-type/order-type.module */ "./src/app/sections/ordering/shared/pipes/order-type/order-type.module.ts");










var declarations = [_sections_ordering__WEBPACK_IMPORTED_MODULE_4__["MerchantListComponent"], _merchant_item__WEBPACK_IMPORTED_MODULE_5__["MerchantItemComponent"]];
var MerchantListModule = /** @class */ (function () {
    function MerchantListModule() {
    }
    MerchantListModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            exports: [_sections_ordering__WEBPACK_IMPORTED_MODULE_4__["MerchantListComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _shared_pipes_merchant_distance_merchant_distance_module__WEBPACK_IMPORTED_MODULE_8__["MerchantDistanceModule"], _sections_ordering_shared_ui_components_order_options_action_sheet__WEBPACK_IMPORTED_MODULE_6__["OrderOptionsActionSheetModule"], _shared_directives_stop_propogation_stop_propagation_module__WEBPACK_IMPORTED_MODULE_7__["StopPropagationModule"], _sections_ordering_shared_pipes_order_type_order_type_module__WEBPACK_IMPORTED_MODULE_9__["OrderTypePipeModule"]],
        })
    ], MerchantListModule);
    return MerchantListModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/resolvers/cart.resolver.ts":
/*!**************************************************************!*\
  !*** ./src/app/sections/ordering/resolvers/cart.resolver.ts ***!
  \**************************************************************/
/*! exports provided: CartResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartResolver", function() { return CartResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _sections_ordering__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/ordering */ "./src/app/sections/ordering/index.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");








var CartResolver = /** @class */ (function () {
    function CartResolver(settingsFacadeService, loadingService, merchantService, cartService) {
        this.settingsFacadeService = settingsFacadeService;
        this.loadingService = loadingService;
        this.merchantService = merchantService;
        this.cartService = cartService;
    }
    CartResolver.prototype.resolve = function () {
        var _this = this;
        this.loadingService.showSpinner();
        var requiredSettings = [
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.DISPLAY_TENDERS,
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.DISPLAY_CREDIT_CARDS,
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.CREDIT_PAYMENT_SYSTEM_TYPE
        ];
        var accountsCall = this.cartService.merchant$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["skipWhile"])(function (merchant) { return !merchant; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (_a) {
            var id = _a.id;
            return _this.merchantService.getMerchantPaymentAccounts(id);
        }));
        var settingsCall = this.settingsFacadeService.getSettings(requiredSettings);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(settingsCall, accountsCall).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["finalize"])(function () { return _this.loadingService.closeSpinner(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])());
    };
    CartResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_7__["SettingsFacadeService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_3__["LoadingService"],
            _sections_ordering__WEBPACK_IMPORTED_MODULE_5__["MerchantService"],
            _sections_ordering__WEBPACK_IMPORTED_MODULE_5__["CartService"]])
    ], CartResolver);
    return CartResolver;
}());



/***/ }),

/***/ "./src/app/sections/ordering/resolvers/recent-orders.resolver.ts":
/*!***********************************************************************!*\
  !*** ./src/app/sections/ordering/resolvers/recent-orders.resolver.ts ***!
  \***********************************************************************/
/*! exports provided: RecentOrdersResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecentOrdersResolver", function() { return RecentOrdersResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sections_ordering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sections/ordering */ "./src/app/sections/ordering/index.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");





var RecentOrdersResolver = /** @class */ (function () {
    function RecentOrdersResolver(merchantService, loadingService) {
        this.merchantService = merchantService;
        this.loadingService = loadingService;
    }
    RecentOrdersResolver.prototype.resolve = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingService.showSpinner()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                return _this.merchantService.getRecentOrders()
                                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1))
                                    .subscribe(function (orders) { return _this.loadingService.closeSpinner().then(function () { return resolve(orders); }); }, function () { return _this.loadingService.closeSpinner().then(function () { return reject(); }); });
                            })];
                }
            });
        });
    };
    RecentOrdersResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_sections_ordering__WEBPACK_IMPORTED_MODULE_1__["MerchantService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__["LoadingService"]])
    ], RecentOrdersResolver);
    return RecentOrdersResolver;
}());



/***/ }),

/***/ "./src/app/sections/ordering/shared/pipes/order-type/order-type.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/pipes/order-type/order-type.module.ts ***!
  \********************************************************************************/
/*! exports provided: OrderTypePipeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTypePipeModule", function() { return OrderTypePipeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _order_type_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./order-type.pipe */ "./src/app/sections/ordering/shared/pipes/order-type/order-type.pipe.ts");




var declarations = [_order_type_pipe__WEBPACK_IMPORTED_MODULE_3__["OrderTypePipe"]];
var OrderTypePipeModule = /** @class */ (function () {
    function OrderTypePipeModule() {
    }
    OrderTypePipeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: declarations
        })
    ], OrderTypePipeModule);
    return OrderTypePipeModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/shared/pipes/order-type/order-type.pipe.ts":
/*!******************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/pipes/order-type/order-type.pipe.ts ***!
  \******************************************************************************/
/*! exports provided: OrderTypePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTypePipe", function() { return OrderTypePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/ordering/services/ordering.service */ "./src/app/sections/ordering/services/ordering.service.ts");
/* harmony import */ var _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/ordering/ordering.config */ "./src/app/sections/ordering/ordering.config.ts");





var OrderTypePipe = /** @class */ (function () {
    function OrderTypePipe(orderingService, cdRef) {
        this.orderingService = orderingService;
        this.cdRef = cdRef;
        this.initContentStrings();
    }
    OrderTypePipe.prototype.transform = function (value) {
        var pickup = value.pickup, delivery = value.delivery;
        if (!value || (!delivery && !pickup)) {
            return '';
        }
        if (value.delivery && value.pickup) {
            return this.labelPickup + " & " + this.labelDelivery;
        }
        return delivery ? this.labelDelivery : this.labelPickup;
    };
    OrderTypePipe.prototype.initContentStrings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.orderingService
                                .getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelPickup)
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1))
                                .toPromise()];
                    case 1:
                        _a.labelPickup = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.orderingService
                                .getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelDelivery)
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1))
                                .toPromise()];
                    case 2:
                        _b.labelDelivery = _c.sent();
                        this.cdRef.detectChanges();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderTypePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'orderTypePipe',
            pure: false,
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_3__["OrderingService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], OrderTypePipe);
    return OrderTypePipe;
}());



/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.module.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.module.ts ***!
  \**************************************************************************************************/
/*! exports provided: ConfirmPopoverModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmPopoverModule", function() { return ConfirmPopoverModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _confirm_popover_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./confirm-popover.component */ "./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component.ts");
/* harmony import */ var _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/ui-components/st-popover-layout/st-popover-layout.module */ "./src/app/shared/ui-components/st-popover-layout/st-popover-layout.module.ts");






var declarations = [_confirm_popover_component__WEBPACK_IMPORTED_MODULE_4__["ConfirmPopoverComponent"]];
var ConfirmPopoverModule = /** @class */ (function () {
    function ConfirmPopoverModule() {
    }
    ConfirmPopoverModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            exports: [_confirm_popover_component__WEBPACK_IMPORTED_MODULE_4__["ConfirmPopoverComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_5__["StPopoverLayoutModule"]],
            entryComponents: [_confirm_popover_component__WEBPACK_IMPORTED_MODULE_4__["ConfirmPopoverComponent"]],
        })
    ], ConfirmPopoverModule);
    return ConfirmPopoverModule;
}());



/***/ }),

/***/ "./src/app/shared/ui-components/st-spinner/st-spinner.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/shared/ui-components/st-spinner/st-spinner.module.ts ***!
  \**********************************************************************/
/*! exports provided: StSpinnerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StSpinnerModule", function() { return StSpinnerModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _st_spinner_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./st-spinner.component */ "./src/app/shared/ui-components/st-spinner/st-spinner.component.ts");




var declarations = [_st_spinner_component__WEBPACK_IMPORTED_MODULE_3__["StSpinnerComponent"]];
var StSpinnerModule = /** @class */ (function () {
    function StSpinnerModule() {
    }
    StSpinnerModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: declarations
        })
    ], StSpinnerModule);
    return StSpinnerModule;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map