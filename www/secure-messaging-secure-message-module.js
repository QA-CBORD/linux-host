(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["secure-messaging-secure-message-module"],{

/***/ "./src/app/sections/secure-messaging/secure-message-routing.module.ts":
/*!****************************************************************************!*\
  !*** ./src/app/sections/secure-messaging/secure-message-routing.module.ts ***!
  \****************************************************************************/
/*! exports provided: SecureMessageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecureMessageRoutingModule", function() { return SecureMessageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _secure_message_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./secure-message.page */ "./src/app/sections/secure-messaging/secure-message.page.ts");




var routes = [
    {
        path: '',
        component: _secure_message_page__WEBPACK_IMPORTED_MODULE_3__["SecureMessagePage"],
    },
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var SecureMessageRoutingModule = /** @class */ (function () {
    function SecureMessageRoutingModule() {
    }
    SecureMessageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({ imports: imports, exports: exports })
    ], SecureMessageRoutingModule);
    return SecureMessageRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/secure-messaging/secure-message.module.ts":
/*!********************************************************************!*\
  !*** ./src/app/sections/secure-messaging/secure-message.module.ts ***!
  \********************************************************************/
/*! exports provided: SecureMessagePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecureMessagePageModule", function() { return SecureMessagePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _secure_message_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./secure-message.page */ "./src/app/sections/secure-messaging/secure-message.page.ts");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./service */ "./src/app/sections/secure-messaging/service/index.ts");
/* harmony import */ var _secure_message_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./secure-message-routing.module */ "./src/app/sections/secure-messaging/secure-message-routing.module.ts");
/* harmony import */ var _secure_message_popover__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./secure-message-popover */ "./src/app/sections/secure-messaging/secure-message-popover/index.ts");
/* harmony import */ var _shared_directives_stop_propogation_stop_propagation_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @shared/directives/stop-propogation/stop-propagation.module */ "./src/app/shared/directives/stop-propogation/stop-propagation.module.ts");
/* harmony import */ var _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @shared/ui-components/st-popover-layout/st-popover-layout.module */ "./src/app/shared/ui-components/st-popover-layout/st-popover-layout.module.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _shared_pipes_message_date__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @shared/pipes/message-date */ "./src/app/shared/pipes/message-date/index.ts");
/* harmony import */ var _shared_pipes_conversation_date__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @shared/pipes/conversation-date */ "./src/app/shared/pipes/conversation-date/index.ts");















var declarations = [_secure_message_page__WEBPACK_IMPORTED_MODULE_5__["SecureMessagePage"], _secure_message_popover__WEBPACK_IMPORTED_MODULE_8__["SecureMessagePopoverComponent"]];
var providers = [_service__WEBPACK_IMPORTED_MODULE_6__["SecureMessagingService"], _service__WEBPACK_IMPORTED_MODULE_6__["SecureMessagingApiService"]];
var imports = [
    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
    _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
    _secure_message_routing_module__WEBPACK_IMPORTED_MODULE_7__["SecureMessageRoutingModule"],
    _shared_directives_stop_propogation_stop_propagation_module__WEBPACK_IMPORTED_MODULE_9__["StopPropagationModule"],
    _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_10__["StPopoverLayoutModule"],
    _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_11__["StHeaderModule"],
    _shared_pipes_message_date__WEBPACK_IMPORTED_MODULE_12__["MessageDatePipeModule"],
    _shared_pipes_conversation_date__WEBPACK_IMPORTED_MODULE_13__["ConversationDatePipeModule"]
];
var entryComponents = [_secure_message_popover__WEBPACK_IMPORTED_MODULE_8__["SecureMessagePopoverComponent"]];
var SecureMessagePageModule = /** @class */ (function () {
    function SecureMessagePageModule() {
    }
    SecureMessagePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({ imports: imports, providers: providers, declarations: declarations, entryComponents: entryComponents })
    ], SecureMessagePageModule);
    return SecureMessagePageModule;
}());



/***/ }),

/***/ "./src/app/shared/pipes/conversation-date/conversation-date.module.ts":
/*!****************************************************************************!*\
  !*** ./src/app/shared/pipes/conversation-date/conversation-date.module.ts ***!
  \****************************************************************************/
/*! exports provided: ConversationDatePipeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConversationDatePipeModule", function() { return ConversationDatePipeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _conversation_date_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./conversation-date.pipe */ "./src/app/shared/pipes/conversation-date/conversation-date.pipe.ts");




var declarations = [_conversation_date_pipe__WEBPACK_IMPORTED_MODULE_3__["ConversationDatePipe"]];
var ConversationDatePipeModule = /** @class */ (function () {
    function ConversationDatePipeModule() {
    }
    ConversationDatePipeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: declarations
        })
    ], ConversationDatePipeModule);
    return ConversationDatePipeModule;
}());



/***/ }),

/***/ "./src/app/shared/pipes/conversation-date/conversation-date.pipe.ts":
/*!**************************************************************************!*\
  !*** ./src/app/shared/pipes/conversation-date/conversation-date.pipe.ts ***!
  \**************************************************************************/
/*! exports provided: ConversationDatePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConversationDatePipe", function() { return ConversationDatePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");



var ConversationDatePipe = /** @class */ (function () {
    function ConversationDatePipe(datePipe) {
        this.datePipe = datePipe;
    }
    ConversationDatePipe.prototype.transform = function (_a) {
        var messages = _a.messages;
        var today = new Date();
        var sentDate = new Date(messages[messages.length - 1].sent_date);
        /// > 1 year (Full timestamp)
        if (today.getFullYear() > sentDate.getFullYear()) {
            return this.datePipe.transform(sentDate, 'y');
        }
        /// > 5 days (<monthAbbv> <date>, xx:xx AM/PM)
        if (today.getTime() - sentDate.getTime() > 432000000) {
            return this.datePipe.transform(sentDate, 'MMM d');
        }
        /// > 2 days (<dayAbbv> xx:xx AM/PM)
        if (today.getTime() - sentDate.getTime() >= 172800000) {
            return this.datePipe.transform(sentDate, 'E');
        }
        /// > 30 minutes (xx:xx AM/PM)
        if (today.getTime() - sentDate.getTime() > 1800000) {
            return this.datePipe.transform(sentDate, 'h:mm a');
        }
        /// > 1 minute (x minutes ago)
        if (today.getTime() - sentDate.getTime() > 60000) {
            var minutesAgo = Math.round((today.getTime() - sentDate.getTime()) / 60000);
            return minutesAgo.toString() + ' min';
        }
        /// < 1 minute (Now)
        return 'Now';
    };
    ConversationDatePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'conversationDate',
            pure: false,
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"]])
    ], ConversationDatePipe);
    return ConversationDatePipe;
}());



/***/ }),

/***/ "./src/app/shared/pipes/conversation-date/index.ts":
/*!*********************************************************!*\
  !*** ./src/app/shared/pipes/conversation-date/index.ts ***!
  \*********************************************************/
/*! exports provided: ConversationDatePipeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _conversation_date_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversation-date.module */ "./src/app/shared/pipes/conversation-date/conversation-date.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConversationDatePipeModule", function() { return _conversation_date_module__WEBPACK_IMPORTED_MODULE_0__["ConversationDatePipeModule"]; });




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
//# sourceMappingURL=secure-messaging-secure-message-module.js.map