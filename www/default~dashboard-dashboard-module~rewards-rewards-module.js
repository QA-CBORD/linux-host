(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~dashboard-dashboard-module~rewards-rewards-module"],{

/***/ "./src/app/sections/rewards/rewards.config.ts":
/*!****************************************************!*\
  !*** ./src/app/sections/rewards/rewards.config.ts ***!
  \****************************************************/
/*! exports provided: LOCAL_ROUTING, CONTENT_STRINGS, ContentStringsParams, GenericContentStringsParams, OPT_IN_STATUS, PopupTypes, LEVEL_STATUS, CLAIM_STATUS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCAL_ROUTING", function() { return LOCAL_ROUTING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTENT_STRINGS", function() { return CONTENT_STRINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentStringsParams", function() { return ContentStringsParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenericContentStringsParams", function() { return GenericContentStringsParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPT_IN_STATUS", function() { return OPT_IN_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupTypes", function() { return PopupTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEVEL_STATUS", function() { return LEVEL_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLAIM_STATUS", function() { return CLAIM_STATUS; });
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app.global */ "./src/app/app.global.ts");

var LOCAL_ROUTING;
(function (LOCAL_ROUTING) {
    LOCAL_ROUTING["levels"] = "levels";
    LOCAL_ROUTING["store"] = "store";
    LOCAL_ROUTING["history"] = "history";
})(LOCAL_ROUTING || (LOCAL_ROUTING = {}));
var CONTENT_STRINGS;
(function (CONTENT_STRINGS) {
    CONTENT_STRINGS["activateBtn"] = "button_activate";
    CONTENT_STRINGS["optInToast"] = "toast_opt-in-success";
    CONTENT_STRINGS["cancelBtn"] = "button_cancel";
    CONTENT_STRINGS["closeBtn"] = "button_close";
    CONTENT_STRINGS["backBtn"] = "button_back";
    CONTENT_STRINGS["retryBtn"] = "button_retry";
    CONTENT_STRINGS["retryTitle"] = "dialog_header_retry";
    CONTENT_STRINGS["headerTitle"] = "header_title";
    CONTENT_STRINGS["optInBtn"] = "button_opt-in";
    CONTENT_STRINGS["optInFailLabel"] = "label_opt-in-failed";
    CONTENT_STRINGS["levelTabTitle"] = "tab_title_levels";
    CONTENT_STRINGS["storeTabTitle"] = "tab_title_store";
    CONTENT_STRINGS["historyTabTitle"] = "tab_title_history";
    CONTENT_STRINGS["xpAwayFromRewardLabel"] = "label_xp-to-unlock";
    CONTENT_STRINGS["activeRewardLabel"] = "label_active-reward";
    CONTENT_STRINGS["rewardClaimedLabel"] = "label_reward-claimed";
    CONTENT_STRINGS["claimRewardLabel"] = "dialog_header_claim-reward";
    CONTENT_STRINGS["noOffersLabel"] = "label_no-offers-available";
    CONTENT_STRINGS["balanceLabel"] = "label_balance";
    CONTENT_STRINGS["pointsLabel"] = "label_points";
    CONTENT_STRINGS["levelLabel"] = "label_level";
    CONTENT_STRINGS["pointsCostLabel"] = "label_point-cost";
    CONTENT_STRINGS["scanLabel"] = "label_scan";
    CONTENT_STRINGS["redeemLabel"] = "label_redeem";
    CONTENT_STRINGS["claimLabel"] = "label_claim";
    CONTENT_STRINGS["claimedLabel"] = "label_claimed";
    CONTENT_STRINGS["claimButton"] = "dialog_button_claim";
    CONTENT_STRINGS["redeemButton"] = "dialog_button_redeem";
    CONTENT_STRINGS["successTitle"] = "dialog_header_success";
    CONTENT_STRINGS["claimTitle"] = "dialog_header_claim-reward";
    CONTENT_STRINGS["redeemTitle"] = "dialog_header_redeem-reward";
    CONTENT_STRINGS["scanCodeTitle"] = "dialog_header_scan-code";
    CONTENT_STRINGS["scanCodeDescription"] = "dialog_description_scan-code";
    CONTENT_STRINGS["activeRewardsLabel"] = "label_active-reward-plural";
    CONTENT_STRINGS["claimInstructionsLabel"] = "label_claim-instructions";
    CONTENT_STRINGS["emptyHistoryListMessage"] = "label_empty-history";
})(CONTENT_STRINGS || (CONTENT_STRINGS = {}));
var ContentStringsParams = {
    category: _app_global__WEBPACK_IMPORTED_MODULE_0__["ContentString"].CATEGORIES.rewards,
    domain: _app_global__WEBPACK_IMPORTED_MODULE_0__["ContentString"].DOMAINS.patron,
};
var GenericContentStringsParams = {
    category: _app_global__WEBPACK_IMPORTED_MODULE_0__["ContentString"].CATEGORIES.core,
    domain: _app_global__WEBPACK_IMPORTED_MODULE_0__["ContentString"].DOMAINS.patron,
};
var OPT_IN_STATUS;
(function (OPT_IN_STATUS) {
    OPT_IN_STATUS[OPT_IN_STATUS["yes"] = 1] = "yes";
    OPT_IN_STATUS[OPT_IN_STATUS["no"] = 0] = "no";
})(OPT_IN_STATUS || (OPT_IN_STATUS = {}));
var PopupTypes;
(function (PopupTypes) {
    PopupTypes["REDEEM"] = "REDEEM";
    PopupTypes["SCAN"] = "SCAN";
    PopupTypes["SUCCESS"] = "SUCCESS";
    PopupTypes["CLAIM"] = "CLAIM";
    PopupTypes["RETRY"] = "RETRY";
    PopupTypes["OPT_IN"] = "OPT_IN";
    PopupTypes["CANCEL"] = "CANCEL";
})(PopupTypes || (PopupTypes = {}));
var LEVEL_STATUS;
(function (LEVEL_STATUS) {
    LEVEL_STATUS[LEVEL_STATUS["locked"] = 0] = "locked";
    LEVEL_STATUS[LEVEL_STATUS["unlocked"] = 1] = "unlocked";
    LEVEL_STATUS[LEVEL_STATUS["claimed"] = 2] = "claimed";
    LEVEL_STATUS[LEVEL_STATUS["received"] = 3] = "received";
})(LEVEL_STATUS || (LEVEL_STATUS = {}));
var CLAIM_STATUS;
(function (CLAIM_STATUS) {
    CLAIM_STATUS[CLAIM_STATUS["unearned"] = 0] = "unearned";
    CLAIM_STATUS[CLAIM_STATUS["earned"] = 1] = "earned";
    CLAIM_STATUS[CLAIM_STATUS["claimed"] = 2] = "claimed";
    CLAIM_STATUS[CLAIM_STATUS["received"] = 3] = "received";
})(CLAIM_STATUS || (CLAIM_STATUS = {}));


/***/ }),

/***/ "./src/app/sections/rewards/services/index.ts":
/*!****************************************************!*\
  !*** ./src/app/sections/rewards/services/index.ts ***!
  \****************************************************/
/*! exports provided: RewardsApiService, RewardsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rewards_api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rewards-api.service */ "./src/app/sections/rewards/services/rewards-api.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RewardsApiService", function() { return _rewards_api_service__WEBPACK_IMPORTED_MODULE_0__["RewardsApiService"]; });

/* harmony import */ var _rewards_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rewards.service */ "./src/app/sections/rewards/services/rewards.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RewardsService", function() { return _rewards_service__WEBPACK_IMPORTED_MODULE_1__["RewardsService"]; });





/***/ }),

/***/ "./src/app/sections/rewards/services/rewards-api.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/sections/rewards/services/rewards-api.service.ts ***!
  \******************************************************************/
/*! exports provided: RewardsApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsApiService", function() { return RewardsApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/interceptors/query-config.model */ "./src/app/core/interceptors/query-config.model.ts");







var RewardsApiService = /** @class */ (function () {
    function RewardsApiService(http, toastController, platform) {
        this.http = http;
        this.toastController = toastController;
        this.platform = platform;
        this.serviceUrl = '/json/rewards';
    }
    RewardsApiService.prototype.getUserRewardTrackInfo = function (headerOnly, showToastOnError) {
        if (headerOnly === void 0) { headerOnly = false; }
        if (showToastOnError === void 0) { showToastOnError = true; }
        var postParams = { headerOnly: headerOnly };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_6__["RPCQueryConfig"]('retrieveUserRewardTrackInfo', postParams, true);
        return this.http.post(this.serviceUrl, queryConfig).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response, exception = _a.exception;
            if (exception !== null) {
                throw new Error(exception);
            }
            return Array.isArray(response) && response.length ? response[0] : null;
        }), this.onErrorHandler(showToastOnError));
    };
    RewardsApiService.prototype.getUserRewardHistoryInfo = function (showToast, rewardTrackId, startDate, endDate, filters) {
        if (showToast === void 0) { showToast = true; }
        if (rewardTrackId === void 0) { rewardTrackId = null; }
        if (startDate === void 0) { startDate = null; }
        if (endDate === void 0) { endDate = null; }
        if (filters === void 0) { filters = null; }
        var postParams = {
            rewardTrackId: rewardTrackId,
            startDate: startDate,
            endDate: endDate,
            filters: filters,
        };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_6__["RPCQueryConfig"]('retrieveUserRewardHistory', postParams, true);
        return this.http.post(this.serviceUrl, queryConfig).pipe(this.parseResponse(), this.onErrorHandler(showToast));
    };
    RewardsApiService.prototype.optUserIntoRewardTrack = function (trackId, userId, showToastOnError) {
        if (showToastOnError === void 0) { showToastOnError = true; }
        var postParams = { trackId: trackId, userId: userId };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_6__["RPCQueryConfig"]('optUserIntoRewardTrack', postParams, true);
        return this.http.post(this.serviceUrl, queryConfig).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), this.parseResponse(), this.onErrorHandler(showToastOnError));
    };
    RewardsApiService.prototype.claimReward = function (rewardId, showToast) {
        if (showToast === void 0) { showToast = true; }
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_6__["RPCQueryConfig"]('claimRewardV2', { rewardId: rewardId }, true);
        return this.http.post(this.serviceUrl, queryConfig).pipe(this.parseResponse(), this.onErrorHandler(showToast));
    };
    RewardsApiService.prototype.detectPlatform = function (name) {
        return this.platform.is(name);
    };
    RewardsApiService.prototype.onErrorHandler = function (showToastOnError) {
        var _this = this;
        if (showToastOnError === void 0) { showToastOnError = true; }
        return function (source) {
            return source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
                showToastOnError && _this.presentToast();
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(err);
            }));
        };
    };
    RewardsApiService.prototype.parseResponse = function () {
        return function (source) {
            return source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
                var response = _a.response, exception = _a.exception;
                if (exception !== null) {
                    throw new Error(exception);
                }
                return response;
            }));
        };
    };
    RewardsApiService.prototype.presentToast = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var message, isNativeDevicesEnv, toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = "something went wrong, try again later";
                        isNativeDevicesEnv = this.detectPlatform('android') || this.detectPlatform('ios');
                        return [4 /*yield*/, this.toastController.create({
                                message: message,
                                duration: 3000,
                                cssClass: 'exception-toast',
                                position: isNativeDevicesEnv ? 'bottom' : 'top',
                                closeButtonText: 'DISMISS',
                                showCloseButton: true,
                            })];
                    case 1:
                        toast = _a.sent();
                        return [4 /*yield*/, toast.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RewardsApiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"]])
    ], RewardsApiService);
    return RewardsApiService;
}());



/***/ }),

/***/ "./src/app/sections/rewards/services/rewards.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/sections/rewards/services/rewards.service.ts ***!
  \**************************************************************/
/*! exports provided: RewardsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsService", function() { return RewardsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _rewards_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rewards-api.service */ "./src/app/sections/rewards/services/rewards-api.service.ts");
/* harmony import */ var _core_service_content_service_content_strings_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/service/content-service/content-strings-api.service */ "./src/app/core/service/content-service/content-strings-api.service.ts");
/* harmony import */ var _rewards_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../rewards.config */ "./src/app/sections/rewards/rewards.config.ts");







var RewardsService = /** @class */ (function () {
    function RewardsService(rewardsApi, contentService) {
        this.rewardsApi = rewardsApi;
        this.contentService = contentService;
        this.rewardTrack$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.rewardHistory$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
    }
    Object.defineProperty(RewardsService.prototype, "rewardTrack", {
        get: function () {
            return this.rewardTrack$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardsService.prototype, "rewardHistory", {
        get: function () {
            return this.rewardHistory$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardsService.prototype, "_rewardTrack", {
        set: function (rewardTrackInfo) {
            this.rewardTrackInfo = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, rewardTrackInfo);
            this.rewardTrack$.next(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.rewardTrackInfo));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardsService.prototype, "_rewardHistory", {
        set: function (rewardHistory) {
            this.rewardHistoryList = rewardHistory.slice();
            this.rewardHistory$.next(this.rewardHistoryList.slice());
        },
        enumerable: true,
        configurable: true
    });
    RewardsService.prototype.getHistoryListRewards = function () {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(this.combineAllRewards(), this.rewardHistory).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var rewards = _a[0], rewardHistory = _a[1];
            var history = _this.extractFromHistoryByStatus(rewardHistory, rewards, _rewards_config__WEBPACK_IMPORTED_MODULE_6__["CLAIM_STATUS"].received, true);
            return _this.sortByTime(history);
        }));
    };
    RewardsService.prototype.combineAllRewards = function () {
        return this.rewardTrack.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var _b = _a.trackLevels, trackLevels = _b === void 0 ? [] : _b, _c = _a.redeemableRewards, redeemableRewards = _c === void 0 ? [] : _c;
            var rewards = trackLevels.reduce(function (total, _a) {
                var userClaimableRewards = _a.userClaimableRewards;
                return total.concat(userClaimableRewards);
            }, []);
            return redeemableRewards.concat(rewards);
        }));
    };
    RewardsService.prototype.getAllData = function (showToastOnError) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(this.getUserRewardTrackInfo(showToastOnError), this.getUserRewardHistoryInfo(showToastOnError));
    };
    RewardsService.prototype.getUserRewardTrackInfo = function (showToastOnError) {
        var _this = this;
        return this.rewardsApi
            .getUserRewardTrackInfo(showToastOnError)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (trackInfo) { return (_this._rewardTrack = trackInfo); }));
    };
    RewardsService.prototype.getUserRewardHistoryInfo = function (showToastOnError) {
        var _this = this;
        return this.rewardsApi
            .getUserRewardHistoryInfo(showToastOnError)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (historyArray) { return (_this._rewardHistory = historyArray); }));
    };
    RewardsService.prototype.getUserOptInStatus = function () {
        return this.rewardTrack.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var userOptInStatus = _a.userOptInStatus;
            return userOptInStatus;
        }));
    };
    RewardsService.prototype.getRewardsTabsConfig = function () {
        var _this = this;
        return this.rewardTrack.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var hasLevels = _a.hasLevels, hasRedeemableRewards = _a.hasRedeemableRewards;
            var tabConfig = { tabs: [] };
            if (hasLevels) {
                tabConfig.tabs.push({
                    name: _this.getContentValueByName(_rewards_config__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STRINGS"].levelTabTitle) || 'Levels',
                    route: _rewards_config__WEBPACK_IMPORTED_MODULE_6__["LOCAL_ROUTING"].levels,
                    active: true,
                });
            }
            if (hasRedeemableRewards) {
                tabConfig.tabs.push({
                    name: _this.getContentValueByName(_rewards_config__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STRINGS"].storeTabTitle) || 'Store',
                    route: _rewards_config__WEBPACK_IMPORTED_MODULE_6__["LOCAL_ROUTING"].store,
                    active: !hasLevels,
                });
            }
            tabConfig.tabs.push({
                name: _this.getContentValueByName(_rewards_config__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STRINGS"].historyTabTitle) || 'History',
                route: _rewards_config__WEBPACK_IMPORTED_MODULE_6__["LOCAL_ROUTING"].history,
                active: false,
            });
            return tabConfig;
        }));
    };
    RewardsService.prototype.getTrackLevels = function () {
        var _this = this;
        return this.rewardTrack.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (userInfo) {
            var levels = _this.expandLevelInfoArray(userInfo);
            return _this.sortByLevel(levels);
        }));
    };
    RewardsService.prototype.getStoreRewards = function () {
        return this.rewardTrack.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var redeemableRewards = _a.redeemableRewards;
            return redeemableRewards;
        }));
    };
    RewardsService.prototype.getStoreActiveRewards = function () {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(this.rewardTrack, this.rewardHistory).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var redeemableRewards = _a[0].redeemableRewards, rewardHistory = _a[1];
            return _this.extractFromHistoryByStatus(rewardHistory, redeemableRewards, _rewards_config__WEBPACK_IMPORTED_MODULE_6__["CLAIM_STATUS"].claimed, false);
        }));
    };
    RewardsService.prototype.initContentStringsList = function () {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(this.contentService.retrieveContentStringListByRequest(_rewards_config__WEBPACK_IMPORTED_MODULE_6__["ContentStringsParams"]), this.contentService.retrieveContentStringListByRequest(_rewards_config__WEBPACK_IMPORTED_MODULE_6__["GenericContentStringsParams"])).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var res = _a[0], res0 = _a[1];
            var finalArray = res.concat(res0);
            _this.content = finalArray.reduce(function (init, elem) {
                var _a;
                return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, init, (_a = {}, _a[elem.name] = elem.value, _a)));
            }, {});
            return finalArray;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1));
    };
    RewardsService.prototype.getContentValueByName = function (name) {
        return this.content[name] || '';
    };
    RewardsService.prototype.extractFromHistoryByRewardId = function (rewardId) {
        return this.rewardHistoryList.find(function (item) { return item.rewardId === rewardId; });
    };
    RewardsService.prototype.extractFromHistoryByStatus = function (history, rewards, status, isHistoryTab) {
        var cash = {};
        var res = [];
        var _loop_1 = function (i) {
            if (history[i].status !== status) {
                return "continue";
            }
            var reward = void 0;
            if (!cash[history[i].rewardId]) {
                reward = rewards.find(function (reward) { return reward.id === history[i].rewardId; });
                if (!reward && isHistoryTab) {
                    reward = history[i];
                }
            }
            else {
                reward = cash[history[i].rewardId];
            }
            if (reward) {
                cash[reward.id] = reward;
                res.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, history[i], { shortDescription: reward.shortDescription, description: reward.description }));
            }
        };
        for (var i = 0; i < history.length; i++) {
            _loop_1(i);
        }
        return res;
    };
    RewardsService.prototype.expandLevelInfoArray = function (userInfo) {
        var _this = this;
        return userInfo.trackLevels.map(function (levelInfo) {
            levelInfo = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, levelInfo, { status: _this.getLevelStatus(levelInfo, userInfo.userLevel) });
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, levelInfo, { description: _this.getLevelDescription(levelInfo, userInfo) });
        });
    };
    RewardsService.prototype.getLevelStatus = function (_a, userLevel) {
        var level = _a.level, rewards = _a.userClaimableRewards;
        if (userLevel < level) {
            return _rewards_config__WEBPACK_IMPORTED_MODULE_6__["LEVEL_STATUS"].locked;
        }
        for (var i = 0; i < rewards.length; i++) {
            if (rewards[i].claimStatus === _rewards_config__WEBPACK_IMPORTED_MODULE_6__["CLAIM_STATUS"].claimed) {
                return _rewards_config__WEBPACK_IMPORTED_MODULE_6__["LEVEL_STATUS"].claimed;
            }
            if (rewards[i].claimStatus === _rewards_config__WEBPACK_IMPORTED_MODULE_6__["CLAIM_STATUS"].received) {
                return _rewards_config__WEBPACK_IMPORTED_MODULE_6__["LEVEL_STATUS"].received;
            }
        }
        return _rewards_config__WEBPACK_IMPORTED_MODULE_6__["LEVEL_STATUS"].unlocked;
    };
    RewardsService.prototype.sortByLevel = function (levelInfoArray) {
        return levelInfoArray.sort(function (_a, _b) {
            var a = _a.level;
            var b = _b.level;
            return a - b;
        });
    };
    RewardsService.prototype.getExpToNextLevel = function (levels, currentLevel, currentPoints) {
        var nextLevel = levels.find(function (_a) {
            var level = _a.level;
            return level === currentLevel;
        });
        return nextLevel.requiredPoints - currentPoints;
    };
    RewardsService.prototype.sortByTime = function (activityInfos) {
        return activityInfos.sort(function (_a, _b) {
            var a = _a.receivedTime;
            var b = _b.receivedTime;
            return Date.parse(b.toString()) - Date.parse(a.toString());
        });
    };
    RewardsService.prototype.getLevelDescription = function (_a, _b) {
        var level = _a.level, status = _a.status, rewards = _a.userClaimableRewards;
        var points = _b.userExperiencePoints, trackLevels = _b.trackLevels;
        switch (status) {
            case _rewards_config__WEBPACK_IMPORTED_MODULE_6__["LEVEL_STATUS"].locked:
                var requiredXP = this.getExpToNextLevel(trackLevels, level, points);
                return requiredXP + " " + this.getContentValueByName(_rewards_config__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STRINGS"].xpAwayFromRewardLabel);
            case _rewards_config__WEBPACK_IMPORTED_MODULE_6__["LEVEL_STATUS"].claimed:
                return "1 " + this.getContentValueByName(_rewards_config__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STRINGS"].activeRewardLabel);
            case _rewards_config__WEBPACK_IMPORTED_MODULE_6__["LEVEL_STATUS"].received:
                return this.getContentValueByName(_rewards_config__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STRINGS"].rewardClaimedLabel);
            case _rewards_config__WEBPACK_IMPORTED_MODULE_6__["LEVEL_STATUS"].unlocked:
                return rewards.length > 0
                    ? this.getContentValueByName(_rewards_config__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STRINGS"].claimRewardLabel)
                    : this.getContentValueByName(_rewards_config__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STRINGS"].noOffersLabel);
            default:
                return '';
        }
    };
    RewardsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_rewards_api_service__WEBPACK_IMPORTED_MODULE_4__["RewardsApiService"], _core_service_content_service_content_strings_api_service__WEBPACK_IMPORTED_MODULE_5__["ContentStringsApiService"]])
    ], RewardsService);
    return RewardsService;
}());



/***/ }),

/***/ "./src/app/shared/ui-components/st-progress-bar/st-progress-bar.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/shared/ui-components/st-progress-bar/st-progress-bar.module.ts ***!
  \********************************************************************************/
/*! exports provided: StProgressBarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StProgressBarModule", function() { return StProgressBarModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _st_progress_bar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./st-progress-bar.component */ "./src/app/shared/ui-components/st-progress-bar/st-progress-bar.component.ts");




var declarations = [_st_progress_bar_component__WEBPACK_IMPORTED_MODULE_3__["StProgressBarComponent"]];
var StProgressBarModule = /** @class */ (function () {
    function StProgressBarModule() {
    }
    StProgressBarModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: declarations
        })
    ], StProgressBarModule);
    return StProgressBarModule;
}());



/***/ })

}]);
//# sourceMappingURL=default~dashboard-dashboard-module~rewards-rewards-module.js.map