(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-cart-cart-module"],{

/***/ "./src/app/sections/ordering/pages/cart/cart.component.html":
/*!******************************************************************!*\
  !*** ./src/app/sections/ordering/pages/cart/cart.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-header [title]=\"contentStrings.labelCart | async\"\r\n           [isTitleShow]=\"true\"\r\n           [backButtonTitle]=\"''\"\r\n           [backButtonIcon]=\"'close'\"\r\n           [isToolbarShow]=\"true\">\r\n</st-header>\r\n\r\n<ion-content>\r\n  <st-order-details\r\n          [readonly]=\"false\"\r\n          [tax]=\"(order$ | async).tax\"\r\n          [discount]=\"(order$ | async).discount\"\r\n          [accInfoList]=\"accountInfoList$ | async\"\r\n          [tip]=\"(order$ | async).tip\"\r\n          [subTotal]=\"(order$ | async).subTotal\"\r\n          [pickupFee]=\"(order$ | async).pickupFee\"\r\n          [deliveryFee]=\"(order$ | async).deliveryFee\"\r\n          [total]=\"(order$ | async).total\"\r\n          [orderItems]=\"(order$ | async).orderItems\"\r\n          [orderDetailOptions]=\"orderDetailOptions$ | async\"\r\n          [orderTypes]=\"orderTypes$ | async\"\r\n          [accounts]=\"accounts$ | async\"\r\n          [applePayEnabled]=\"applePayEnabled$ | async\"\r\n          [mealBased]=\"(order$ | async).mealBased\"\r\n          [merchantSettingsList]=\"(merchant$ | async).settings.list\"\r\n          [addressModalConfig]=\"(addressModalSettings$ | async)\"\r\n          (onFormChange)=\"onCartStateFormChanged($event)\"\r\n          (onOrderItemRemovedId)=\"removeOrderItem($event)\"\r\n          (onOrderItemClicked)=\"onOrderItemClicked($event)\"\r\n          (onOrderPaymentInfoChanged)=\"onOrderPaymentInfoChanged($event)\"\r\n          (onOrderTipChanged)=\"onOrderTipChanged($event)\"\r\n  >\r\n    <st-button (onClick)=\"onSubmit()\" [isDisabled]=\"!cartFormState?.valid\">\r\n      {{(isOrderASAP | async)\r\n            ? (contentStrings.buttonPlaceOrder | async)\r\n            : (contentStrings.buttonScheduleOrder | async)}}\r\n      {{(order$ | async).total | priceUnitsResolver: (order$ | async).mealBased}}\r\n    </st-button>\r\n  </st-order-details>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/sections/ordering/pages/cart/cart.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/sections/ordering/pages/cart/cart.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL29yZGVyaW5nL3BhZ2VzL2NhcnQvY2FydC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/sections/ordering/pages/cart/cart.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/sections/ordering/pages/cart/cart.component.ts ***!
  \****************************************************************/
/*! exports provided: CartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartComponent", function() { return CartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sections_ordering_services_cart_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/ordering/services/cart.service */ "./src/app/sections/ordering/services/cart.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _sections_ordering__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/ordering */ "./src/app/sections/ordering/index.ts");
/* harmony import */ var _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/accounts/accounts.config */ "./src/app/sections/accounts/accounts.config.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sections/ordering/ordering.config */ "./src/app/sections/ordering/ordering.config.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/utils/general-helpers */ "./src/app/core/utils/general-helpers.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var _sections_ordering_pages_cart_components_success_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sections/ordering/pages/cart/components/success-modal */ "./src/app/sections/ordering/pages/cart/components/success-modal/index.ts");
/* harmony import */ var _shared_ui_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @shared/ui-components */ "./src/app/shared/ui-components/index.ts");
/* harmony import */ var _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @sections/ordering/services/ordering.service */ "./src/app/sections/ordering/services/ordering.service.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
/* harmony import */ var _core_service_external_payment_external_payment_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @core/service/external-payment/external-payment.service */ "./src/app/core/service/external-payment/external-payment.service.ts");
/* harmony import */ var _core_model_add_funds_applepay_response_model__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @core/model/add-funds/applepay-response.model */ "./src/app/core/model/add-funds/applepay-response.model.ts");




















var CartComponent = /** @class */ (function () {
    function CartComponent(cartService, merchantService, loadingService, settingsFacadeService, activatedRoute, toastController, popoverController, cdRef, router, modalController, orderingService, userFacadeService, externalPaymentService) {
        this.cartService = cartService;
        this.merchantService = merchantService;
        this.loadingService = loadingService;
        this.settingsFacadeService = settingsFacadeService;
        this.activatedRoute = activatedRoute;
        this.toastController = toastController;
        this.popoverController = popoverController;
        this.cdRef = cdRef;
        this.router = router;
        this.modalController = modalController;
        this.orderingService = orderingService;
        this.userFacadeService = userFacadeService;
        this.externalPaymentService = externalPaymentService;
        this.cartFormState = {};
        this.contentStrings = {};
    }
    CartComponent.prototype.ionViewWillEnter = function () {
        this.accounts$ = this.getAvailableAccounts();
        this.cdRef.detectChanges();
    };
    CartComponent.prototype.ngOnInit = function () {
        this.order$ = this.cartService.orderInfo$;
        this.merchant$ = this.cartService.merchant$;
        this.orderTypes$ = this.merchantService.orderTypes$;
        this.orderDetailOptions$ = this.cartService.orderDetailsOptions$;
        this.addressModalSettings$ = this.initAddressModalConfig();
        this.accountInfoList$ = this.activatedRoute.data.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (_a) {
            var _b = _a.data, accInfo = _b[1];
            return accInfo;
        }));
        this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
        this.initContentStrings();
    };
    Object.defineProperty(CartComponent.prototype, "isOrderASAP", {
        get: function () {
            return this.cartService.orderDetailsOptions$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (_a) {
                var isASAP = _a.isASAP;
                return isASAP;
            }));
        },
        enumerable: true,
        configurable: true
    });
    CartComponent.prototype.initAddressModalConfig = function () {
        var _this = this;
        this.loadingService.showSpinner();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(this.cartService.orderDetailsOptions$, this.merchantService.retrieveBuildings(), this.cartService.merchant$, this.getDeliveryLocations(), this.getPickupLocations()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (_a) {
            var _b = _a[0], defaultAddress = _b.address, orderType = _b.orderType, buildings = _a[1], merchantId = _a[2].id, deliveryAddresses = _a[3], pickupLocations = _a[4];
            return ({
                defaultAddress: defaultAddress,
                buildings: buildings,
                isOrderTypePickup: orderType === _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__["ORDER_TYPE"].PICKUP,
                pickupLocations: pickupLocations,
                deliveryAddresses: deliveryAddresses,
                merchantId: merchantId,
            });
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function () { return _this.loadingService.closeSpinner(); }));
    };
    CartComponent.prototype.onOrderItemClicked = function (_a) {
        var menuItemId = _a.menuItemId, id = _a.id;
        this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_12__["PATRON_NAVIGATION"].ordering, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__["LOCAL_ROUTING"].itemDetail], {
            queryParams: { menuItemId: menuItemId, orderItemId: id, isItemExistsInCart: true },
        });
    };
    CartComponent.prototype.onCartStateFormChanged = function (state) {
        this.cartService.updateOrderAddress(state.data[_sections_ordering__WEBPACK_IMPORTED_MODULE_4__["DETAILS_FORM_CONTROL_NAMES"].address]);
        this.cartFormState = state;
    };
    CartComponent.prototype.onOrderTipChanged = function (amount) {
        this.cartService.setOrderTip(amount);
    };
    CartComponent.prototype.onOrderPaymentInfoChanged = function (selectedValue) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var errMessage, paymentSystem;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (selectedValue instanceof Object) {
                            errMessage = 'something went wrong';
                            this.cartService.addPaymentInfoToOrder(selectedValue);
                            this.validateOrder(errMessage);
                        }
                        if (!(typeof selectedValue === 'string' && selectedValue === 'addCC')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.definePaymentSystemType()];
                    case 1:
                        paymentSystem = _a.sent();
                        if (paymentSystem === _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__["PAYMENT_SYSTEM_TYPE"].MONETRA) {
                            this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_12__["PATRON_NAVIGATION"].accounts, _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_5__["LOCAL_ROUTING"].addCreditCard]);
                            return [2 /*return*/];
                        }
                        this.addUSAePayCreditCard();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CartComponent.prototype.onSubmit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var type, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.cartFormState.valid)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.cartService.orderInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).toPromise()];
                    case 1:
                        type = (_b.sent()).type;
                        _a = type === _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__["ORDER_TYPE"].DELIVERY;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.isDeliveryAddressOutOfRange()];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (!_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.onValidateErrorToast('Delivery location is out of delivery range, please choose another location')];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, this.submitOrder()];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CartComponent.prototype.showModal = function (_a) {
        var tax = _a.tax, discount = _a.discount, total = _a.total, subTotal = _a.subTotal, accountName = _a.orderPayment[0].accountName, deliveryFee = _a.deliveryFee, pickupFee = _a.pickupFee, tip = _a.tip, checkNumber = _a.checkNumber, mealBased = _a.mealBased;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _sections_ordering_pages_cart_components_success_modal__WEBPACK_IMPORTED_MODULE_13__["SuccessModalComponent"],
                            componentProps: {
                                tax: tax,
                                discount: discount,
                                total: total,
                                subTotal: subTotal,
                                deliveryFee: deliveryFee,
                                pickupFee: pickupFee,
                                tip: tip,
                                checkNumber: checkNumber,
                                accountName: accountName,
                                mealBased: mealBased,
                            },
                        })];
                    case 1:
                        modal = _b.sent();
                        modal.onDidDismiss().then(function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_12__["PATRON_NAVIGATION"].ordering])];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CartComponent.prototype.onErrorModal = function (message, cb) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: _shared_ui_components__WEBPACK_IMPORTED_MODULE_14__["StGlobalPopoverComponent"],
                            componentProps: {
                                data: {
                                    title: 'Oooops',
                                    message: message,
                                },
                            },
                            animated: false,
                            backdropDismiss: true,
                        })];
                    case 1:
                        modal = _a.sent();
                        cb && modal.onDidDismiss().then(cb);
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CartComponent.prototype.removeOrderItem = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var removedItem, orderItems, onError;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cdRef.detach();
                        removedItem = this.cartService.removeOrderItemFromOrderById(id);
                        if (!removedItem) {
                            this.cdRef.reattach();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.cartService.orderInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).toPromise()];
                    case 1:
                        orderItems = (_a.sent()).orderItems;
                        if (!orderItems.length) {
                            this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_12__["PATRON_NAVIGATION"].ordering, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__["LOCAL_ROUTING"].fullMenu]);
                            return [2 /*return*/];
                        }
                        onError = function (message) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.onValidateErrorToast(typeof message === 'object' ? message[1] : message)];
                                    case 1:
                                        _a.sent();
                                        this.cartService.addOrderItems(removedItem);
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, this.validateOrder(onError)];
                    case 2:
                        _a.sent();
                        this.cdRef.reattach();
                        return [2 /*return*/];
                }
            });
        });
    };
    CartComponent.prototype.navigateToFullMenu = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_12__["PATRON_NAVIGATION"].ordering, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__["LOCAL_ROUTING"].fullMenu], {
                            queryParams: { openTimeSlot: true },
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CartComponent.prototype.isDeliveryAddressOutOfRange = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, latitude, longitude, id;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.orderDetailOptions$
                            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (_a) {
                            var address = _a.address;
                            return address;
                        }))
                            .toPromise()];
                    case 1:
                        _a = _b.sent(), latitude = _a.latitude, longitude = _a.longitude;
                        return [4 /*yield*/, this.cartService.merchant$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).toPromise()];
                    case 2:
                        id = (_b.sent()).id;
                        return [2 /*return*/, this.merchantService.isOutsideMerchantDeliveryArea(id, latitude, longitude).toPromise()];
                }
            });
        });
    };
    CartComponent.prototype.submitOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var accountId, orderData;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingService.showSpinner()];
                    case 1:
                        _a.sent();
                        accountId = this.cartFormState.data[_sections_ordering__WEBPACK_IMPORTED_MODULE_4__["DETAILS_FORM_CONTROL_NAMES"].paymentMethod].id;
                        this.cartService.updateOrderNote(this.cartFormState.data[_sections_ordering__WEBPACK_IMPORTED_MODULE_4__["DETAILS_FORM_CONTROL_NAMES"].note]);
                        if (!(this.cartFormState.data.paymentMethod.accountType === _app_global__WEBPACK_IMPORTED_MODULE_12__["AccountType"].APPLEPAY)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.cartService.orderInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).toPromise()];
                    case 2:
                        orderData = _a.sent();
                        return [4 /*yield*/, this.externalPaymentService.payWithApplePay(_core_model_add_funds_applepay_response_model__WEBPACK_IMPORTED_MODULE_19__["ApplePay"].ORDERS_WITH_APPLE_PAY, orderData)
                                .then(function (result) {
                                if (result.success) {
                                    accountId = result.accountId;
                                }
                                else {
                                    _this.onErrorModal(result.errorMessage);
                                }
                            })
                                .catch(function (error) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.onErrorModal('Something went wrong, please try again...')];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.cartService
                            .submitOrder(accountId, this.cartFormState.data[_sections_ordering__WEBPACK_IMPORTED_MODULE_4__["DETAILS_FORM_CONTROL_NAMES"].cvv] || null)
                            .pipe(Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["handleServerError"])(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__["ORDER_VALIDATION_ERRORS"]))
                            .toPromise()
                            .then(function (order) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.showModal(order)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })
                            .catch(function (error) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(Array.isArray(error) && +error[0] === +_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__["ORDER_ERROR_CODES"].ORDER_CAPACITY)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.onErrorModal(error[1], this.navigateToFullMenu.bind(this))];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2:
                                        if (!(typeof error === 'string')) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.onErrorModal(error)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })
                            .finally(this.loadingService.closeSpinner.bind(this.loadingService));
                        return [2 /*return*/];
                }
            });
        });
    };
    CartComponent.prototype.getDeliveryLocations = function () {
        var _this = this;
        return this.cartService.merchant$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (_a) {
            var id = _a.id;
            return _this.merchantService.retrieveDeliveryAddresses(id);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (_a) {
            var deliveryLocations = _a[1];
            return deliveryLocations;
        }));
    };
    CartComponent.prototype.getPickupLocations = function () {
        var _this = this;
        return this.cartService.merchant$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (_a) {
            var storeAddress = _a.storeAddress, settings = _a.settings;
            return _this.merchantService.retrievePickupLocations(storeAddress, settings.map[_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__["MerchantSettings"].pickupLocationsEnabled]);
        }));
    };
    CartComponent.prototype.filterCashlessAccounts = function (sourceAccounts) {
        return sourceAccounts.filter(function (account) { return account.id === 'rollup' || Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["isCashlessAccount"])(account); });
    };
    CartComponent.prototype.filterCreditAccounts = function (sourceAccounts) {
        return sourceAccounts.filter(function (account) { return Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["isCreditCardAccount"])(account); });
    };
    CartComponent.prototype.filterMealBasedAccounts = function (sourceAccounts) {
        return sourceAccounts.filter(function (account) { return Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["isMealsAccount"])(account); });
    };
    CartComponent.prototype.getAvailableAccounts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var accInfo, mealBased;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountInfoList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).toPromise()];
                    case 1:
                        accInfo = _a.sent();
                        return [4 /*yield*/, this.cartService.menuInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).toPromise()];
                    case 2:
                        mealBased = (_a.sent()).mealBased;
                        return [2 /*return*/, mealBased ? this.filterMealBasedAccounts(accInfo.accounts) : this.extractNoneMealsAccounts(accInfo)];
                }
            });
        });
    };
    CartComponent.prototype.extractNoneMealsAccounts = function (_a) {
        var cashlessAccepted = _a.cashlessAccepted, accounts = _a.accounts, creditAccepted = _a.creditAccepted;
        var res = [];
        accounts = this.filterNoneMealsAccounts(accounts);
        if (cashlessAccepted) {
            res = res.concat(this.filterCashlessAccounts(accounts));
        }
        if (creditAccepted) {
            res = res.concat(this.filterCreditAccounts(accounts));
        }
        return res;
    };
    CartComponent.prototype.filterNoneMealsAccounts = function (sourceAccounts) {
        return sourceAccounts.filter(function (sourceAccount) { return !Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["isMealsAccount"])(sourceAccount); });
    };
    CartComponent.prototype.addUSAePayCreditCard = function () {
        var _this = this;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.externalPaymentService.addUSAePayCreditCard())
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])())
            .subscribe(function (_a) {
            var success = _a.success, errorMessage = _a.errorMessage;
            if (!success) {
                return _this.onValidateErrorToast(errorMessage);
            }
            _this.loadingService.showSpinner();
            // Update user accounts for refreshing Credit Card dropdown list
            _this.accountInfoList$ = _this.cartService.merchant$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (_a) {
                var id = _a.id;
                return _this.merchantService.getMerchantPaymentAccounts(id);
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["finalize"])(function () { return _this.loadingService.closeSpinner(); }));
            _this.accounts$ = _this.getAvailableAccounts();
            _this.cdRef.markForCheck();
        });
    };
    CartComponent.prototype.definePaymentSystemType = function () {
        return this.settingsFacadeService
            .getSetting(_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.CREDIT_PAYMENT_SYSTEM_TYPE)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (_a) {
            var value = _a.value;
            return parseInt(value);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])())
            .toPromise();
    };
    CartComponent.prototype.validateOrder = function (onError) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingService.showSpinner()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.cartService
                                .validateOrder()
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])(), Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["handleServerError"])(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__["ORDER_VALIDATION_ERRORS"]))
                                .toPromise()
                                .catch(onError)
                                .finally(this.loadingService.closeSpinner.bind(this.loadingService))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CartComponent.prototype.onValidateErrorToast = function (message) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            showCloseButton: true,
                            position: 'top',
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
    CartComponent.prototype.initContentStrings = function () {
        this.contentStrings.buttonPlaceOrder = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__["ORDERING_CONTENT_STRINGS"].buttonPlaceOrder);
        this.contentStrings.labelCart = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__["ORDERING_CONTENT_STRINGS"].labelCart);
        this.contentStrings.buttonScheduleOrder = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_7__["ORDERING_CONTENT_STRINGS"].buttonScheduleOrder);
    };
    CartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-cart',
            template: __webpack_require__(/*! ./cart.component.html */ "./src/app/sections/ordering/pages/cart/cart.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./cart.component.scss */ "./src/app/sections/ordering/pages/cart/cart.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_sections_ordering_services_cart_service__WEBPACK_IMPORTED_MODULE_2__["CartService"],
            _sections_ordering__WEBPACK_IMPORTED_MODULE_4__["MerchantService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_8__["LoadingService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_17__["SettingsFacadeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_11__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_11__["PopoverController"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_11__["ModalController"],
            _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_15__["OrderingService"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_16__["UserFacadeService"],
            _core_service_external_payment_external_payment_service__WEBPACK_IMPORTED_MODULE_18__["ExternalPaymentService"]])
    ], CartComponent);
    return CartComponent;
}());



/***/ }),

/***/ "./src/app/sections/ordering/pages/cart/cart.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/sections/ordering/pages/cart/cart.module.ts ***!
  \*************************************************************/
/*! exports provided: CartModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartModule", function() { return CartModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _sections_ordering_pages_cart_cart_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/ordering/pages/cart/cart.component */ "./src/app/sections/ordering/pages/cart/cart.component.ts");
/* harmony import */ var _sections_ordering_pages_cart_cart_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/ordering/pages/cart/cart.routing.module */ "./src/app/sections/ordering/pages/cart/cart.routing.module.ts");
/* harmony import */ var _sections_ordering_shared_ui_components_order_details_order_details_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/ordering/shared/ui-components/order-details/order-details.module */ "./src/app/sections/ordering/shared/ui-components/order-details/order-details.module.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _sections_ordering_pages_cart_components_success_modal_success_modal_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/ordering/pages/cart/components/success-modal/success-modal.component */ "./src/app/sections/ordering/pages/cart/components/success-modal/success-modal.component.ts");
/* harmony import */ var _sections_ordering_shared_pipes_price_units_resolver_price_units_resolver_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module */ "./src/app/sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module.ts");
/* harmony import */ var _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @shared/ui-components/st-button/st-button.module */ "./src/app/shared/ui-components/st-button/st-button.module.ts");











var CartModule = /** @class */ (function () {
    function CartModule() {
    }
    CartModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_sections_ordering_pages_cart_cart_component__WEBPACK_IMPORTED_MODULE_3__["CartComponent"], _sections_ordering_pages_cart_components_success_modal_success_modal_component__WEBPACK_IMPORTED_MODULE_8__["SuccessModalComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _sections_ordering_pages_cart_cart_routing_module__WEBPACK_IMPORTED_MODULE_4__["CartRoutingModule"],
                _sections_ordering_shared_ui_components_order_details_order_details_module__WEBPACK_IMPORTED_MODULE_5__["OrderDetailsModule"],
                _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_6__["StHeaderModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["IonicModule"],
                _sections_ordering_shared_pipes_price_units_resolver_price_units_resolver_module__WEBPACK_IMPORTED_MODULE_9__["PriceUnitsResolverModule"],
                _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_10__["StButtonModule"]
            ],
            entryComponents: [_sections_ordering_pages_cart_components_success_modal_success_modal_component__WEBPACK_IMPORTED_MODULE_8__["SuccessModalComponent"]]
        })
    ], CartModule);
    return CartModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/pages/cart/cart.routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/sections/ordering/pages/cart/cart.routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: CartRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartRoutingModule", function() { return CartRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _sections_ordering_pages_cart_cart_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/ordering/pages/cart/cart.component */ "./src/app/sections/ordering/pages/cart/cart.component.ts");
/* harmony import */ var _sections_ordering_resolvers_cart_resolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/ordering/resolvers/cart.resolver */ "./src/app/sections/ordering/resolvers/cart.resolver.ts");





var routes = [
    {
        path: '',
        component: _sections_ordering_pages_cart_cart_component__WEBPACK_IMPORTED_MODULE_3__["CartComponent"],
        resolve: {
            data: _sections_ordering_resolvers_cart_resolver__WEBPACK_IMPORTED_MODULE_4__["CartResolver"]
        }
    }
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var CartRoutingModule = /** @class */ (function () {
    function CartRoutingModule() {
    }
    CartRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: imports,
            exports: exports
        })
    ], CartRoutingModule);
    return CartRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/pages/cart/components/success-modal/index.ts":
/*!********************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/cart/components/success-modal/index.ts ***!
  \********************************************************************************/
/*! exports provided: SuccessModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _success_modal_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./success-modal.component */ "./src/app/sections/ordering/pages/cart/components/success-modal/success-modal.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SuccessModalComponent", function() { return _success_modal_component__WEBPACK_IMPORTED_MODULE_0__["SuccessModalComponent"]; });




/***/ }),

/***/ "./src/app/sections/ordering/pages/cart/components/success-modal/success-modal.component.html":
/*!****************************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/cart/components/success-modal/success-modal.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header class=\"final-order__header\" no-border>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-button color=\"dark\" (click)=\"onClosed()\">\r\n        <ion-icon size=\"large\" slot=\"icon-only\" name=\"close\"></ion-icon>\r\n      </ion-button>\r\n    </ion-buttons>\r\n    <ion-title class=\"final-order__title\">{{ contentStrings.labelOrder | async}} #{{checkNumber}}</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"final-order__body-wrapper\">\r\n    <img src=\"/assets/images/big_check_order.svg\" alt=\"big check order\" class=\"final-order__main-img\"/>\r\n    <div class=\"final-order__sub-header\">{{ contentStrings.labelOrderPlacedTitle | async }}</div>\r\n\r\n    <div class=\"final-order__body\">\r\n      {{ contentStrings.labelOrderPlacedDescription | async }}\r\n    </div>\r\n\r\n    <div class=\"total\">\r\n      <div *ngIf=\"subTotal\" class=\"total__item\">{{ contentStrings.labelSubtotal | async }}<span\r\n              class=\"total__item-sum\">{{subTotal | priceUnitsResolver : mealBased}}</span></div>\r\n      <div *ngIf=\"tax\" class=\"total__item\">{{ contentStrings.labelTax | async }}<span\r\n              class=\"total__item-sum\">{{tax | priceUnitsResolver : mealBased}}</span></div>\r\n      <div *ngIf=\"discount\" class=\"total__item\">{{ contentStrings.labelDiscount | async }}<span\r\n              class=\"total__item-sum\">{{discount | priceUnitsResolver : mealBased}}</span></div>\r\n      <div *ngIf=\"tip\" class=\"total__item\">{{ contentStrings.labelTip | async }}<span\r\n              class=\"total__item-sum\">{{tip | priceUnitsResolver : mealBased}}</span></div>\r\n      <div *ngIf=\"deliveryFee\" class=\"total__item\">{{ contentStrings.labelDeliveryFee | async }}<span\r\n              class=\"total__item-sum\">{{deliveryFee | priceUnitsResolver : mealBased}}</span></div>\r\n      <div *ngIf=\"pickupFee\" class=\"total__item\">{{ contentStrings.labelPickupFee | async }}<span\r\n              class=\"total__item-sum\">{{pickupFee | priceUnitsResolver : mealBased}}</span></div>\r\n      <div *ngIf=\"total\" class=\"total__item total__item--bold\">{{ contentStrings.labelTotal | async }}<span\r\n              class=\"total__item-sum\">{{total | priceUnitsResolver : mealBased}}</span>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"final-order__payment-method-wrapper\">\r\n      <span>{{ contentStrings.labelPaymentMethod | async }}</span><span>{{accountName}}</span>\r\n    </div>\r\n  </div>\r\n</ion-content>\r\n<ion-footer class=\"final-order__footer\" mode=\"ios\">\r\n  <st-button (onClick)=\"onClosed()\">\r\n    {{contentStrings.buttonDone | async}}\r\n  </st-button>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/sections/ordering/pages/cart/components/success-modal/success-modal.component.scss":
/*!****************************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/cart/components/success-modal/success-modal.component.scss ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.final-order__title {\n  letter-spacing: 0;\n  text-align: center;\n  font-size: 20px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.final-order__header {\n  border-bottom: 1px solid #ebebeb; }\n.final-order__body-wrapper {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  padding: 0 20px; }\n.final-order__main-img {\n  margin: 20px 0; }\n.final-order__sub-header {\n  color: #464646;\n  text-align: center;\n  margin-bottom: 10px;\n  font-size: 24px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.final-order__body {\n  color: #464646;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n.final-order__payment-method-wrapper {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  color: #464646;\n  margin-top: 16px;\n  font-size: 14px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.final-order__footer {\n  padding: 10px 10px 10px; }\n.total {\n  margin-top: 16px;\n  background: #fff; }\n.total__item {\n    text-transform: uppercase;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: justify;\n            justify-content: space-between;\n    margin-bottom: 5px;\n    font-size: 14px;\n    font-family: \"Nunito Regular\", arial, sans-serif; }\n.total__item--bold {\n      font-size: 14px;\n      font-family: \"Nunito Bold\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvb3JkZXJpbmcvcGFnZXMvY2FydC9jb21wb25lbnRzL3N1Y2Nlc3MtbW9kYWwvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvb3JkZXJpbmcvcGFnZXMvY2FydC9jb21wb25lbnRzL3N1Y2Nlc3MtbW9kYWwvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxhcHBcXHNlY3Rpb25zXFxvcmRlcmluZ1xccGFnZXNcXGNhcnRcXGNvbXBvbmVudHNcXHN1Y2Nlc3MtbW9kYWxcXHN1Y2Nlc3MtbW9kYWwuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL29yZGVyaW5nL3BhZ2VzL2NhcnQvY29tcG9uZW50cy9zdWNjZXNzLW1vZGFsL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDcEV2QjtFQUNFLGlCQUFpQjtFQUNqQixrQkFBa0I7RUNMcEIsZURPaUM7RUNIakMsNkNGNEVrRCxFQUFBO0FDdEVsRDtFQUNFLGdDRGtHbUIsRUFBQTtBQy9GckI7RUFDRSxvQkFBYTtFQUFiLGFBQWE7RUFDYiw0QkFBc0I7RUFBdEIsNkJBQXNCO1VBQXRCLHNCQUFzQjtFQUN0QixlQUFlLEVBQUE7QUFHakI7RUFDRSxjQUFjLEVBQUE7QUFHaEI7RUFDRSxjRHVGb0I7RUN0RnBCLGtCQUFrQjtFQUNsQixtQkFBbUI7RUMzQnJCLGVENkJpQztFQ3pCakMsNkNGNEVrRCxFQUFBO0FDaERsRDtFQUNFLGNEK0VvQjtFRWhIdEIsZURtQ21DO0VDL0JuQyxnREYwRXVELEVBQUE7QUN4Q3ZEO0VBQ0Usb0JBQWE7RUFBYixhQUFhO0VBQ2IseUJBQThCO1VBQTlCLDhCQUE4QjtFQUM5QixjRHVFb0I7RUN0RXBCLGdCQUFnQjtFQzFDbEIsZUQ0Q2lDO0VDeENqQyw2Q0Y0RWtELEVBQUE7QUNqQ2xEO0VBQ0UsdUJBQXVCLEVBQUE7QUFJM0I7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JEMENnQixFQUFBO0FDeENoQjtJQUNFLHlCQUF5QjtJQUN6QixvQkFBYTtJQUFiLGFBQWE7SUFDYix5QkFBOEI7WUFBOUIsOEJBQThCO0lBQzlCLGtCQUFrQjtJQzVEcEIsZUQ4RG1DO0lDMURuQyxnREYwRXVELEVBQUE7QUNkckQ7TUNoRUYsZURpRW1DO01DN0RuQyw2Q0Y0RWtELEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zZWN0aW9ucy9vcmRlcmluZy9wYWdlcy9jYXJ0L2NvbXBvbmVudHMvc3VjY2Vzcy1tb2RhbC9zdWNjZXNzLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXHJcbjpyb290IHtcclxuICAvKiogcHJpbWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMDA1Y2I5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiAwLCA5MiwgMTg1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzAwNTFhMztcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XHJcblxyXG4gIC8qKiBzZWNvbmRhcnkgKiovXHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5OiAjMGNkMWU4O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDEyLCAyMDksIDIzMjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMwYmI4Y2M7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XHJcblxyXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2I6IDExMiwgNjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM2MzNjZTA7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcclxuXHJcbiAgLyoqIHN1Y2Nlc3MgKiovXHJcbiAgLS1pb24tY29sb3Itc3VjY2VzczogIzEwZGM2MDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcclxuXHJcbiAgLyoqIHdhcm5pbmcgKiovXHJcbiAgLS1pb24tY29sb3Itd2FybmluZzogI2ZmY2UwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAyMDYsIDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBiNTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcclxuXHJcbiAgLyoqIGRhbmdlciAqKi9cclxuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXJnYjogMjQ1LCA2MSwgNjE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlOiAjZDMzOTM5O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xyXG5cclxuICAvKiogZGFyayAqKi9cclxuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcclxuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XHJcblxyXG4gIC8qKiBtZWRpdW0gKiovXHJcbiAgLS1pb24tY29sb3ItbWVkaXVtOiAjOTg5YWEyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE1MiwgMTU0LCAxNjI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODY4ODhmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xyXG5cclxuICAvKiogbGlnaHQgKiovXHJcbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtcmdiOiAyNDQsIDI0NCwgMjQ0O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1zaGFkZTogI2Q3ZDhkYTtcclxuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xyXG5cclxuICAvLyAtLWlvbi1ncmlkLXdpZHRoLXNtOiAwcHg7XHJcbn1cclxuXHJcbi8vIEZPTlRTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJGZvbnQtbnVuaXRvLXJlZ3VsYXI6ICdOdW5pdG8gUmVndWxhcicsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8tc2VtaWJvbGQ6ICdOdW5pdG8gU2VtaUJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLWhlYXZ5OiAnTnVuaXRvIEJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuXHJcbi8vIENPTE9SU1xyXG5cclxuJGNvbG9yLXZlcnktbGlnaHQtZ3JheTogI2NjYztcclxuJGNvbG9yLWxpbmstd2F0ZXI6ICNkNGQ2ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZTllOWU5O1xyXG4kY29sb3ItZGFyay1ncmF5OiAjYWFhO1xyXG4kY29sb3ItZHVzdHktZ3JheTogIzk3OTc5NztcclxuJGNvbG9yLWRpbS1ncmF5OiAjNmU2ZTZlO1xyXG4kY29sb3Itc29saXR1ZGU6ICNFQ0YxRjg7XHJcbiRjb2xvci1uaWdodC1yaWRlcjogIzMzMztcclxuJGNvbG9yLW5hdnktYmx1ZTogIzAwNTZlNjtcclxuJGNvbG9yLWRlbmltOiAjMTM2MGUwO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWU6ICMxNjZkZmY7XHJcbiRjb2xvci1kb2RnZXItYmx1ZS1saWdodGVyOiAjMmQ3Y2ZmO1xyXG4kY29sb3Itd2hpdGU6ICNmZmY7XHJcbiRjb2xvci1ibGFjazogIzAwMDtcclxuJGNvbG9yLXdoaXRlLXNtb2tlOiAjZjNmM2YzO1xyXG4kY29sb3ItZGVlcC1za3ktYmx1ZTogIzAwYTBmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjOGJiN2ZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4OGM4ZmY7XHJcbiRjb2xvci1zdHJvbmctYmx1ZTogIzAwNDNiMztcclxuJGNvbG9yLWFsaWNlLWJsdWU6ICNmMGYzZjU7XHJcbiRjb2xvci1zaWx2ZXI6ICNjNGM0YzQ7XHJcbiRjb2xvci1tYXR0ZXJob3JuOiAjNTE1MTUxO1xyXG4kY29sb3ItdmVyeS1kYXJrLWdyYXk6ICM2MjYyNjI7XHJcbiRjb2xvci1tZXJjdXJ5OiAjZTdlN2U3O1xyXG4kY29sb3ItbGlnaHQtZ3JheTogI2Q4ZDhkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlYmViZWI7XHJcbiRjb2xvci1hbGl6YXJpbjogI2UyMjk0MjtcclxuJGNvbG9yLWZsYW1lLXJlZDogIzg4MTkyODtcclxuJGNvbG9yLWNoYXJjb2FsOiAjNDY0NjQ2O1xyXG4kY29sb3ItZGVlcC1zZWE6ICMxNDdkNjM7XHJcbiRjb2xvci1jYXJkaW5hbDogI2I1MjEzNTtcclxuJGNvbG9yLWdvZC1ncmF5OiAjMTYxNjE2O1xyXG4kY29sb3ItaG90LWN1cnJ5OiAjN2M1ZDIzO1xyXG4kY29sb3ItY2FzYWJsYW5jYTogI2Y3YmE0NTtcclxuJGNvbG9yLWFsYWJhc3RlcjogI2Y3ZjdmNztcclxuJHBvcmNlbGFpbjogI2U2ZTllYjtcclxuJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U6ICNEMDQzMUE7XHJcbiRjb2xvci1wYXR0ZW5zLWJsdWU6ICNlMGUzZTU7XHJcblxyXG4vLy8gU2l6ZVxyXG4kYm90dG9tLW5hdmlnYXRpb24tYmFyLWhlaWdodDogNTBweDtcclxuIiwiQGltcG9ydCAndG9vbHMnO1xyXG5cclxuLmZpbmFsLW9yZGVyIHtcclxuXHJcbiAgJl9fdGl0bGUge1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDA7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8taGVhdnkoMjBweCk7XHJcbiAgfVxyXG5cclxuICAmX19oZWFkZXIge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRjb2xvci13aGlzcGVyO1xyXG4gIH1cclxuXHJcbiAgJl9fYm9keS13cmFwcGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgcGFkZGluZzogMCAyMHB4O1xyXG4gIH1cclxuXHJcbiAgJl9fbWFpbi1pbWcge1xyXG4gICAgbWFyZ2luOiAyMHB4IDA7XHJcbiAgfVxyXG5cclxuICAmX19zdWItaGVhZGVyIHtcclxuICAgIGNvbG9yOiAkY29sb3ItY2hhcmNvYWw7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDI0cHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fYm9keSB7XHJcbiAgICBjb2xvcjogJGNvbG9yLWNoYXJjb2FsO1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXJlZ3VsYXIoMTZweCk7XHJcbiAgfVxyXG5cclxuICAmX19wYXltZW50LW1ldGhvZC13cmFwcGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBjb2xvcjogJGNvbG9yLWNoYXJjb2FsO1xyXG4gICAgbWFyZ2luLXRvcDogMTZweDtcclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgxNHB4KTtcclxuICB9XHJcblxyXG4gICZfX2Zvb3RlciB7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDEwcHggMTBweDtcclxuICB9XHJcbn1cclxuXHJcbi50b3RhbCB7XHJcbiAgbWFyZ2luLXRvcDogMTZweDtcclxuICBiYWNrZ3JvdW5kOiAkY29sb3Itd2hpdGU7XHJcblxyXG4gICZfX2l0ZW0ge1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tcmVndWxhcigxNHB4KTtcclxuXHJcbiAgICAmLS1ib2xkIHtcclxuICAgICAgQGluY2x1ZGUgZm9udC1udW5pdG8taGVhdnkoMTRweCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIkBtaXhpbiBmb250LXNpemUoJGZvbnQtc2l6ZSkge1xyXG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtZmFtaWx5KCRmb250LWZhbWlseSkge1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1yZWd1bGFyKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXJlZ3VsYXIpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tc2VtaWJvbGQoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tc2VtaWJvbGQpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8taGVhdnkoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8taGVhdnkpO1xyXG59XHJcblxyXG5AbWl4aW4gbGluay1jb2xvcigkY29sb3IpIHtcclxuICBjb2xvcjogJGNvbG9yO1xyXG5cclxuICAmOmxpbmssXHJcbiAgJjp2aXNpdGVkLFxyXG4gICY6Zm9jdXMsXHJcbiAgJjpob3ZlcixcclxuICAmOmFjdGl2ZSB7XHJcbiAgICBjb2xvcjogJGNvbG9yO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGhvdmVyIHtcclxuICAmOmhvdmVyLFxyXG4gICY6Zm9jdXMge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZGlzYWJsZWQge1xyXG4gICYuZGlzYWJsZWQsXHJcbiAgJi5kaXNhYmxlZDpmb2N1cyxcclxuICAmLmRpc2FibGVkOmhvdmVyLFxyXG4gICZbZGlzYWJsZWRdLFxyXG4gICZbZGlzYWJsZWRdOmZvY3VzLFxyXG4gICZbZGlzYWJsZWRdOmhvdmVyIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGVsbGlwc2lzIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxuXHJcbkBtaXhpbiBmbG9hdGluZy1sYWJlbCgkY29sb3IpIHtcclxuICBmb250LXNpemU6IDc1JTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDE1JSwgLTUwJSwgMCk7XHJcbiAgb3BhY2l0eTogMTtcclxuICBiYWNrZ3JvdW5kOiAkY29sb3Itd2hpdGU7XHJcbiAgcGFkZGluZzogMCAzcHg7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24oKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci13aGl0ZTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi5zdmcnKTtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICByaWdodDogMTVweDtcclxuICAgIHdpZHRoOiAxNHB4O1xyXG4gICAgaGVpZ2h0OiA5cHg7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWFjdGl2ZSgpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWFjdGl2ZS5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1lcnJvcigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWVycm9yLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/sections/ordering/pages/cart/components/success-modal/success-modal.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/cart/components/success-modal/success-modal.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: SuccessModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessModalComponent", function() { return SuccessModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/ordering/services/ordering.service */ "./src/app/sections/ordering/services/ordering.service.ts");
/* harmony import */ var _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/ordering/ordering.config */ "./src/app/sections/ordering/ordering.config.ts");





var SuccessModalComponent = /** @class */ (function () {
    function SuccessModalComponent(modalController, orderingService) {
        this.modalController = modalController;
        this.orderingService = orderingService;
        this.contentStrings = {};
    }
    SuccessModalComponent.prototype.ngOnInit = function () {
        this.initContentStrings();
    };
    SuccessModalComponent.prototype.onClosed = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SuccessModalComponent.prototype.initContentStrings = function () {
        this.contentStrings.buttonDone = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].buttonDone);
        this.contentStrings.labelTotal = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelTotal);
        this.contentStrings.labelTip = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelTip);
        this.contentStrings.labelTax = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelTax);
        this.contentStrings.labelSubtotal = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelSubtotal);
        this.contentStrings.labelPickupFee = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelPickupFee);
        this.contentStrings.labelDeliveryFee = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelDeliveryFee);
        this.contentStrings.labelDiscount = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelDiscount);
        this.contentStrings.labelPaymentMethod = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelPaymentMethod);
        this.contentStrings.labelOrder = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelOrder);
        this.contentStrings.labelOrderPlacedTitle = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelOrderPlacedTitle);
        this.contentStrings.labelOrderPlacedDescription = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelOrderPlacedDescription);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], SuccessModalComponent.prototype, "tax", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], SuccessModalComponent.prototype, "discount", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], SuccessModalComponent.prototype, "checkNumber", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], SuccessModalComponent.prototype, "total", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], SuccessModalComponent.prototype, "accountName", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], SuccessModalComponent.prototype, "deliveryFee", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], SuccessModalComponent.prototype, "pickupFee", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], SuccessModalComponent.prototype, "subTotal", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], SuccessModalComponent.prototype, "tip", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], SuccessModalComponent.prototype, "mealBased", void 0);
    SuccessModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-success-modal',
            template: __webpack_require__(/*! ./success-modal.component.html */ "./src/app/sections/ordering/pages/cart/components/success-modal/success-modal.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./success-modal.component.scss */ "./src/app/sections/ordering/pages/cart/components/success-modal/success-modal.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_3__["OrderingService"]])
    ], SuccessModalComponent);
    return SuccessModalComponent;
}());



/***/ })

}]);
//# sourceMappingURL=pages-cart-cart-module.js.map