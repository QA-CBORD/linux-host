(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mobile-access-mobile-access-module"],{

/***/ "./src/app/core/service/coords/coords.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/core/service/coords/coords.service.ts ***!
  \*******************************************************/
/*! exports provided: CoordsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoordsService", function() { return CoordsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");





var Geolocation = _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["Plugins"].Geolocation;
var CoordsService = /** @class */ (function () {
    function CoordsService() {
        this.fetchInterval = 5000;
        this.timestamp = 0;
        this.latestPosition = {
            timestamp: null,
            coords: {
                accuracy: null,
                latitude: null,
                longitude: null,
            },
        };
        this._location$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](undefined);
        this.emptyPosition = {
            timestamp: null,
            coords: {
                accuracy: null,
                latitude: null,
                longitude: null,
            },
        };
    }
    Object.defineProperty(CoordsService.prototype, "location$", {
        get: function () {
            return this._location$.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["skipWhile"])(function (value) { return !value; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoordsService.prototype, "_latestLocation", {
        set: function (position) {
            this.latestPosition = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, position);
            this._location$.next(this.latestPosition);
        },
        enumerable: true,
        configurable: true
    });
    CoordsService.prototype.getCoords = function () {
        var timeDiff = new Date().getTime() - this.timestamp;
        if (timeDiff > this.fetchInterval) {
            this.requestLocationFromDevice();
        }
        return this.location$;
    };
    CoordsService.prototype.requestLocationFromDevice = function () {
        var _this = this;
        var options = {
            enableHighAccuracy: true,
            timeout: 5,
        };
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(Geolocation.getCurrentPosition(options))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(_this.emptyPosition); }))
            .subscribe(function (resp) {
            /// set timestamp and set location
            _this.timestamp = new Date().getTime();
            _this._latestLocation = resp;
        }, function (error) {
            /// clear timestamp and return empty position so we can try another request
            _this.timestamp = 0;
            _this._latestLocation = _this.emptyPosition;
        });
    };
    CoordsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], CoordsService);
    return CoordsService;
}());



/***/ }),

/***/ "./src/app/sections/mobile-access/mobile-access-routing.module.ts":
/*!************************************************************************!*\
  !*** ./src/app/sections/mobile-access/mobile-access-routing.module.ts ***!
  \************************************************************************/
/*! exports provided: MobileAccessRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileAccessRoutingModule", function() { return MobileAccessRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _mobile_access_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mobile-access.page */ "./src/app/sections/mobile-access/mobile-access.page.ts");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolvers */ "./src/app/sections/mobile-access/resolvers/index.ts");
/* harmony import */ var _activate_location__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./activate-location */ "./src/app/sections/mobile-access/activate-location/index.ts");
/* harmony import */ var _mobile_acces_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mobile-acces.config */ "./src/app/sections/mobile-access/mobile-acces.config.ts");







var routes = [
    {
        path: '',
        resolve: { coords: _resolvers__WEBPACK_IMPORTED_MODULE_4__["LocationsResolverGuard"] },
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: _mobile_access_page__WEBPACK_IMPORTED_MODULE_3__["MobileAccessPage"],
                data: { preload: true },
            },
            {
                path: _mobile_acces_config__WEBPACK_IMPORTED_MODULE_6__["LOCAL_ROUTING"].activate + "/:id",
                component: _activate_location__WEBPACK_IMPORTED_MODULE_5__["ActivateLocationComponent"],
                data: { preload: true },
            },
        ],
    },
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var MobileAccessRoutingModule = /** @class */ (function () {
    function MobileAccessRoutingModule() {
    }
    MobileAccessRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({ imports: imports, exports: exports })
    ], MobileAccessRoutingModule);
    return MobileAccessRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/mobile-access/mobile-access.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/sections/mobile-access/mobile-access.module.ts ***!
  \****************************************************************/
/*! exports provided: MobileAccessPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileAccessPageModule", function() { return MobileAccessPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _mobile_access_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mobile-access.page */ "./src/app/sections/mobile-access/mobile-access.page.ts");
/* harmony import */ var _mobile_access_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mobile-access-routing.module */ "./src/app/sections/mobile-access/mobile-access-routing.module.ts");
/* harmony import */ var _location_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./location-list */ "./src/app/sections/mobile-access/location-list/index.ts");
/* harmony import */ var _location_list_location_item__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./location-list/location-item */ "./src/app/sections/mobile-access/location-list/location-item/index.ts");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./service */ "./src/app/sections/mobile-access/service/index.ts");
/* harmony import */ var _activate_location__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./activate-location */ "./src/app/sections/mobile-access/activate-location/index.ts");
/* harmony import */ var _mobile_access_popover__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mobile-access-popover */ "./src/app/sections/mobile-access/mobile-access-popover/index.ts");
/* harmony import */ var _shared_ui_components_st_activate_location_item_st_activate_location_item_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @shared/ui-components/st-activate-location-item/st-activate-location-item.module */ "./src/app/shared/ui-components/st-activate-location-item/st-activate-location-item.module.ts");
/* harmony import */ var _resolvers_locations_resolver_guard__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./resolvers/locations.resolver.guard */ "./src/app/sections/mobile-access/resolvers/locations.resolver.guard.ts");
/* harmony import */ var _shared_directives_stop_propogation_stop_propagation_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @shared/directives/stop-propogation/stop-propagation.module */ "./src/app/shared/directives/stop-propogation/stop-propagation.module.ts");
/* harmony import */ var _shared_pipes_meters_to_miles_pipe_meters_to_miles_pipe_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @shared/pipes/meters-to-miles-pipe/meters-to-miles-pipe.module */ "./src/app/shared/pipes/meters-to-miles-pipe/meters-to-miles-pipe.module.ts");
/* harmony import */ var _shared_pipes_truncate_pipe_truncate_pipe_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @shared/pipes/truncate-pipe/truncate-pipe.module */ "./src/app/shared/pipes/truncate-pipe/truncate-pipe.module.ts");
/* harmony import */ var _shared_ui_components_st_countdown_st_countdown_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @shared/ui-components/st-countdown/st-countdown.module */ "./src/app/shared/ui-components/st-countdown/st-countdown.module.ts");
/* harmony import */ var _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @shared/ui-components/st-popover-layout/st-popover-layout.module */ "./src/app/shared/ui-components/st-popover-layout/st-popover-layout.module.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _shared_ui_components_st_spinner_st_spinner_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @shared/ui-components/st-spinner/st-spinner.module */ "./src/app/shared/ui-components/st-spinner/st-spinner.module.ts");
/* harmony import */ var _shared_ui_components_st_button__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @shared/ui-components/st-button */ "./src/app/shared/ui-components/st-button/index.ts");






















var imports = [
    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
    _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
    _mobile_access_routing_module__WEBPACK_IMPORTED_MODULE_6__["MobileAccessRoutingModule"],
    _shared_directives_stop_propogation_stop_propagation_module__WEBPACK_IMPORTED_MODULE_14__["StopPropagationModule"],
    _shared_pipes_meters_to_miles_pipe_meters_to_miles_pipe_module__WEBPACK_IMPORTED_MODULE_15__["MetersToMilesPipeModule"],
    _shared_pipes_truncate_pipe_truncate_pipe_module__WEBPACK_IMPORTED_MODULE_16__["TruncatePipeModule"],
    _shared_ui_components_st_countdown_st_countdown_module__WEBPACK_IMPORTED_MODULE_17__["StCountdownModule"],
    _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_18__["StPopoverLayoutModule"],
    _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_19__["StHeaderModule"],
    _shared_ui_components_st_spinner_st_spinner_module__WEBPACK_IMPORTED_MODULE_20__["StSpinnerModule"],
    _shared_ui_components_st_activate_location_item_st_activate_location_item_module__WEBPACK_IMPORTED_MODULE_12__["StActivateLocationItemModule"],
    _shared_ui_components_st_button__WEBPACK_IMPORTED_MODULE_21__["StButtonModule"]
];
var declarations = [
    _mobile_access_page__WEBPACK_IMPORTED_MODULE_5__["MobileAccessPage"],
    _location_list__WEBPACK_IMPORTED_MODULE_7__["LocationListComponent"],
    _activate_location__WEBPACK_IMPORTED_MODULE_10__["ActivateLocationComponent"],
    _location_list_location_item__WEBPACK_IMPORTED_MODULE_8__["LocationItemComponent"],
    _mobile_access_popover__WEBPACK_IMPORTED_MODULE_11__["MobileAccessPopoverComponent"],
];
var providers = [_resolvers_locations_resolver_guard__WEBPACK_IMPORTED_MODULE_13__["LocationsResolverGuard"], _service__WEBPACK_IMPORTED_MODULE_9__["MobileAccessService"]];
var entryComponents = [_mobile_access_popover__WEBPACK_IMPORTED_MODULE_11__["MobileAccessPopoverComponent"]];
var MobileAccessPageModule = /** @class */ (function () {
    function MobileAccessPageModule() {
    }
    MobileAccessPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: imports,
            declarations: declarations,
            providers: providers,
            entryComponents: entryComponents,
        })
    ], MobileAccessPageModule);
    return MobileAccessPageModule;
}());



/***/ }),

/***/ "./src/app/sections/mobile-access/resolvers/index.ts":
/*!***********************************************************!*\
  !*** ./src/app/sections/mobile-access/resolvers/index.ts ***!
  \***********************************************************/
/*! exports provided: LocationsResolverGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _locations_resolver_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locations.resolver.guard */ "./src/app/sections/mobile-access/resolvers/locations.resolver.guard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocationsResolverGuard", function() { return _locations_resolver_guard__WEBPACK_IMPORTED_MODULE_0__["LocationsResolverGuard"]; });




/***/ }),

/***/ "./src/app/sections/mobile-access/resolvers/locations.resolver.guard.ts":
/*!******************************************************************************!*\
  !*** ./src/app/sections/mobile-access/resolvers/locations.resolver.guard.ts ***!
  \******************************************************************************/
/*! exports provided: LocationsResolverGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationsResolverGuard", function() { return LocationsResolverGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service */ "./src/app/sections/mobile-access/service/index.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _mobile_acces_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../mobile-acces.config */ "./src/app/sections/mobile-access/mobile-acces.config.ts");








var LocationsResolverGuard = /** @class */ (function () {
    function LocationsResolverGuard(mobileAccessService, router, loader) {
        this.mobileAccessService = mobileAccessService;
        this.router = router;
        this.loader = loader;
    }
    LocationsResolverGuard.prototype.resolve = function () {
        var snapshot = this.router.routerState.snapshot;
        if (!snapshot.url.includes(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_7__["LOCAL_ROUTING"].activate)) {
            return this.downloadData();
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(true);
    };
    LocationsResolverGuard.prototype.downloadData = function () {
        var _this = this;
        this.loader.showSpinner();
        this.mobileAccessService
            .initContentStringsList()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1))
            .subscribe();
        return this.mobileAccessService.getLocations().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retryWhen"])(function (errors) {
            return errors.pipe(
            //log error message
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () {
                _this.loader.closeSpinner();
                console.log('An error occurred while trying to retrieve your information.');
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (e) {
            // TODO: paste here logic with retry button
            _this.loader.closeSpinner();
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])(e);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { return _this.loader.closeSpinner(); }));
    };
    LocationsResolverGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service__WEBPACK_IMPORTED_MODULE_5__["MobileAccessService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__["LoadingService"]])
    ], LocationsResolverGuard);
    return LocationsResolverGuard;
}());



/***/ }),

/***/ "./src/app/shared/pipes/meters-to-miles-pipe/meters-to-miles-pipe.module.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/shared/pipes/meters-to-miles-pipe/meters-to-miles-pipe.module.ts ***!
  \**********************************************************************************/
/*! exports provided: MetersToMilesPipeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetersToMilesPipeModule", function() { return MetersToMilesPipeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _meters_to_miles_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./meters-to-miles.pipe */ "./src/app/shared/pipes/meters-to-miles-pipe/meters-to-miles.pipe.ts");




var declarations = [_meters_to_miles_pipe__WEBPACK_IMPORTED_MODULE_3__["MetersToMilesPipe"]];
var MetersToMilesPipeModule = /** @class */ (function () {
    function MetersToMilesPipeModule() {
    }
    MetersToMilesPipeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: declarations
        })
    ], MetersToMilesPipeModule);
    return MetersToMilesPipeModule;
}());



/***/ }),

/***/ "./src/app/shared/ui-components/st-countdown/st-countdown.module.ts":
/*!**************************************************************************!*\
  !*** ./src/app/shared/ui-components/st-countdown/st-countdown.module.ts ***!
  \**************************************************************************/
/*! exports provided: StCountdownModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StCountdownModule", function() { return StCountdownModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _st_countdown_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./st-countdown.component */ "./src/app/shared/ui-components/st-countdown/st-countdown.component.ts");




var declarations = [_st_countdown_component__WEBPACK_IMPORTED_MODULE_3__["StCountdownComponent"]];
var StCountdownModule = /** @class */ (function () {
    function StCountdownModule() {
    }
    StCountdownModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: declarations
        })
    ], StCountdownModule);
    return StCountdownModule;
}());



/***/ })

}]);
//# sourceMappingURL=mobile-access-mobile-access-module.js.map