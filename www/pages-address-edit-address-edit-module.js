(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-address-edit-address-edit-module"],{

/***/ "./src/app/sections/ordering/pages/address-edit/address-edit.module.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/address-edit/address-edit.module.ts ***!
  \*****************************************************************************/
/*! exports provided: AddressEditPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressEditPageModule", function() { return AddressEditPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _address_edit_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./address-edit.page */ "./src/app/sections/ordering/pages/address-edit/address-edit.page.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _sections_ordering_shared_ui_components_add_edit_addresses_add_edit_addresses_modal_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.modal.module */ "./src/app/sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.modal.module.ts");
/* harmony import */ var _sections_ordering_shared_ui_components_confirm_popover_confirm_popover_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sections/ordering/shared/ui-components/confirm-popover/confirm-popover.module */ "./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.module.ts");
/* harmony import */ var _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @shared/ui-components/st-button/st-button.module */ "./src/app/shared/ui-components/st-button/st-button.module.ts");







// import { AddressEditModule } from '@sections/ordering/shared/ui-components/address-edit/address-edit.module';




var routes = [
    {
        path: '',
        component: _address_edit_page__WEBPACK_IMPORTED_MODULE_6__["AddressEditPage"]
    }
];
var AddressEditPageModule = /** @class */ (function () {
    function AddressEditPageModule() {
    }
    AddressEditPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                // AddressEditModule,
                _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_7__["StHeaderModule"],
                _sections_ordering_shared_ui_components_add_edit_addresses_add_edit_addresses_modal_module__WEBPACK_IMPORTED_MODULE_8__["AddEditAddressesModule"],
                _sections_ordering_shared_ui_components_confirm_popover_confirm_popover_module__WEBPACK_IMPORTED_MODULE_9__["ConfirmPopoverModule"],
                _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_10__["StButtonModule"]
            ],
            declarations: [_address_edit_page__WEBPACK_IMPORTED_MODULE_6__["AddressEditPage"]]
        })
    ], AddressEditPageModule);
    return AddressEditPageModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/pages/address-edit/address-edit.page.html":
/*!*****************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/address-edit/address-edit.page.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header class=\"address-edit__header\" mode=\"ios\" no-border>\r\n  <ion-toolbar mode=\"ios\" class=\"address-edit__header-toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button\r\n              class=\"address-edit__header-back-btn\"\r\n              color=\"dark\"\r\n              [text]=\"'Back'\"\r\n              [icon]=\"'ios-arrow-back'\"\r\n              mode=\"ios\"\r\n              (click)=\"onBack()\"\r\n      >\r\n      </ion-back-button>\r\n    </ion-buttons>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button class=\"address-edit__header-remove-btn\" mode=\"ios\" (click)=\"onRemove()\">\r\n        Remove\r\n      </ion-button>\r\n    </ion-buttons>\r\n    <ion-title class=\"address-edit__header-title\">\r\n      Edit Address\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"address-edit__add-address-container\">\r\n    <ng-container *ngIf=\"addressData\">\r\n      <st-add-edit-addresses\r\n              [editAddress]=\"addressData\"\r\n              [buildingsOnCampus]=\"buildings$ | async\"\r\n              [defaultAddress]=\"defaultAddress$ | async\"\r\n              (onFormChanged)=\"onAddressFormChanged($event)\"\r\n      ></st-add-edit-addresses>\r\n    </ng-container>\r\n\r\n    <st-button (onClick)=\"addAddress()\">\r\n      {{contentStrings.buttonSave | async}}\r\n    </st-button>\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/sections/ordering/pages/address-edit/address-edit.page.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/address-edit/address-edit.page.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.address-edit__header {\n  border-bottom: 1px solid #ebebeb; }\n.address-edit__header-title {\n  font-size: 20px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.address-edit__header-back-btn {\n  --color: #000 !important;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n.address-edit__header-remove-btn {\n  --color: #e22942 !important;\n  font-size: 16px;\n  font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.address-edit__add-address-container {\n  padding: 25px 20px 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvb3JkZXJpbmcvcGFnZXMvYWRkcmVzcy1lZGl0L0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL29yZGVyaW5nL3BhZ2VzL2FkZHJlc3MtZWRpdC9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXG9yZGVyaW5nXFxwYWdlc1xcYWRkcmVzcy1lZGl0XFxhZGRyZXNzLWVkaXQucGFnZS5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9vcmRlcmluZy9wYWdlcy9hZGRyZXNzLWVkaXQvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF9jb21tb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBQTtBQUNBO0VBQ0UsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixtQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGdCQUFBO0VBQ0EsOEJBQXNCO0VBQ3RCLHVDQUEwQjtFQUMxQix1Q0FBK0I7RUFDL0IsaURBQW1DO0VBQ25DLG9DQUE0QjtFQUM1QixtQ0FBMkI7RUFFM0IsZUFBQTtFQUNBLDZCQUFxQjtFQUNyQixzQ0FBeUI7RUFDekIsc0NBQThCO0VBQzlCLGdEQUFrQztFQUNsQyxtQ0FBMkI7RUFDM0Isa0NBQTBCO0VBRTFCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixtQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFdBQUE7RUFDQSx5QkFBaUI7RUFDakIsZ0NBQXFCO0VBQ3JCLGtDQUEwQjtFQUMxQiw0Q0FBOEI7RUFDOUIsK0JBQXVCO0VBQ3ZCLDhCQUFzQjtFQUV0QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLHFDQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsWUFBQTtFQUNBLDBCQUFrQjtFQUNsQixvQ0FBc0I7RUFDdEIsbUNBQTJCO0VBQzNCLHVDQUErQjtFQUMvQixnQ0FBd0I7RUFDeEIsK0JBQXVCLEVBQUE7QUNyRXZCO0VBQ0UsZ0NEMEdtQixFQUFBO0FDdkdyQjtFQ05BLGVET2lDO0VDSGpDLDZDRjRFa0QsRUFBQTtBQ3RFbEQ7RUFDRSx3QkFBUTtFQ1hWLGVEYW1DO0VDVG5DLGdERjBFdUQsRUFBQTtBQzlEdkQ7RUFDRSwyQkFBUTtFQ2pCVixlRG1Cb0M7RUNmcEMsaURGMkV5RCxFQUFBO0FDekR6RDtFQUNFLG9CQUFvQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvb3JkZXJpbmcvcGFnZXMvYWRkcmVzcy1lZGl0L2FkZHJlc3MtZWRpdC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG4uYWRkcmVzcy1lZGl0IHtcclxuICAmX19oZWFkZXIge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRjb2xvci13aGlzcGVyO1xyXG4gIH1cclxuXHJcbiAgJl9faGVhZGVyLXRpdGxlIHtcclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDIwcHgpO1xyXG4gIH1cclxuXHJcbiAgJl9faGVhZGVyLWJhY2stYnRuIHtcclxuICAgIC0tY29sb3I6ICMwMDAgIWltcG9ydGFudDtcclxuIFxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tcmVndWxhcigxNnB4KTtcclxuICB9XHJcblxyXG4gICZfX2hlYWRlci1yZW1vdmUtYnRuIHtcclxuICAgIC0tY29sb3I6ICNlMjI5NDIgIWltcG9ydGFudDtcclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1zZW1pYm9sZCgxNnB4KTtcclxuICB9XHJcblxyXG4gICZfX2FkZC1hZGRyZXNzLWNvbnRhaW5lciB7XHJcbiAgICBwYWRkaW5nOiAyNXB4IDIwcHggMDtcclxuICB9XHJcbn1cclxuIiwiQG1peGluIGZvbnQtc2l6ZSgkZm9udC1zaXplKSB7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1mYW1pbHkoJGZvbnQtZmFtaWx5KSB7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXJlZ3VsYXIoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tcmVndWxhcik7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1zZW1pYm9sZCgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1zZW1pYm9sZCk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1oZWF2eSgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1oZWF2eSk7XHJcbn1cclxuXHJcbkBtaXhpbiBsaW5rLWNvbG9yKCRjb2xvcikge1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcblxyXG4gICY6bGluayxcclxuICAmOnZpc2l0ZWQsXHJcbiAgJjpmb2N1cyxcclxuICAmOmhvdmVyLFxyXG4gICY6YWN0aXZlIHtcclxuICAgIGNvbG9yOiAkY29sb3I7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gaG92ZXIge1xyXG4gICY6aG92ZXIsXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBkaXNhYmxlZCB7XHJcbiAgJi5kaXNhYmxlZCxcclxuICAmLmRpc2FibGVkOmZvY3VzLFxyXG4gICYuZGlzYWJsZWQ6aG92ZXIsXHJcbiAgJltkaXNhYmxlZF0sXHJcbiAgJltkaXNhYmxlZF06Zm9jdXMsXHJcbiAgJltkaXNhYmxlZF06aG92ZXIge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZWxsaXBzaXMge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxuQG1peGluIGZsb2F0aW5nLWxhYmVsKCRjb2xvcikge1xyXG4gIGZvbnQtc2l6ZTogNzUlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTUlLCAtNTAlLCAwKTtcclxuICBvcGFjaXR5OiAxO1xyXG4gIGJhY2tncm91bmQ6ICRjb2xvci13aGl0ZTtcclxuICBwYWRkaW5nOiAwIDNweDtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLnN2ZycpO1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgd2lkdGg6IDE0cHg7XHJcbiAgICBoZWlnaHQ6IDlweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgei1pbmRleDogMTtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tYWN0aXZlKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tYWN0aXZlLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWVycm9yKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tZXJyb3Iuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/sections/ordering/pages/address-edit/address-edit.page.ts":
/*!***************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/address-edit/address-edit.page.ts ***!
  \***************************************************************************/
/*! exports provided: AddressEditPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressEditPage", function() { return AddressEditPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _sections_ordering_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/ordering/services */ "./src/app/sections/ordering/services/index.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/internal/operators/switchMap */ "./node_modules/rxjs/internal/operators/switchMap.js");
/* harmony import */ var rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var src_app_app_global__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/app.global */ "./src/app/app.global.ts");
/* harmony import */ var _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sections/ordering/ordering.config */ "./src/app/sections/ordering/ordering.config.ts");
/* harmony import */ var _sections_ordering_shared_ui_components_confirm_popover_confirm_popover_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component */ "./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component.ts");
/* harmony import */ var _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sections/ordering/services/ordering.service */ "./src/app/sections/ordering/services/ordering.service.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
















var AddressEditPage = /** @class */ (function () {
    function AddressEditPage(router, merchantService, loadingService, popoverCtrl, orderingService, userFacadeService, settingsFacadeService) {
        this.router = router;
        this.merchantService = merchantService;
        this.loadingService = loadingService;
        this.popoverCtrl = popoverCtrl;
        this.orderingService = orderingService;
        this.userFacadeService = userFacadeService;
        this.settingsFacadeService = settingsFacadeService;
        this.addNewAdddressState = false;
        this.addNewAddressForm = { value: null, valid: false };
        this.contentStrings = {};
    }
    AddressEditPage.prototype.ngOnInit = function () {
        this.initContentStrings();
    };
    AddressEditPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.buildings$ = this.merchantService.retrieveBuildings();
        this.defaultAddress$ = this.merchantService.getDefaultAddress().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (_a) {
            var value = _a.value;
            return value;
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["zip"])(this.buildings$, this.merchantService.selectedAddress$)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (_a) {
            var buildings = _a[0], address = _a[1];
            var activeBuilding = buildings.find(function (_a) {
                var addressInfo = _a.addressInfo;
                return addressInfo.building === address.building;
            });
            return {
                activeBuilding: activeBuilding,
                address: address,
            };
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
            .subscribe(function (address) {
            _this.addressData = address;
        });
    };
    AddressEditPage.prototype.onBack = function () {
        this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_8__["PATRON_NAVIGATION"].ordering, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_9__["LOCAL_ROUTING"].savedAddresses]);
    };
    AddressEditPage.prototype.onRemove = function () {
        this.presentAlert();
    };
    AddressEditPage.prototype.presentAlert = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var addressData, address, modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addressData = this.addressData.address;
                        address = addressData.address1 + ", " + addressData.city + ", " + addressData.state;
                        return [4 /*yield*/, this.popoverCtrl.create({
                                component: _sections_ordering_shared_ui_components_confirm_popover_confirm_popover_component__WEBPACK_IMPORTED_MODULE_10__["ConfirmPopoverComponent"],
                                componentProps: {
                                    data: {
                                        message: "Are you sure you want to remove: " + address,
                                        title: 'Remove Address?',
                                        buttons: [tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_11__["buttons"].CANCEL, { label: 'CANCEL' }), tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_11__["buttons"].REMOVE, { label: 'REMOVE' })],
                                    },
                                },
                                animated: false,
                                backdropDismiss: true,
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (_a) {
                            var role = _a.role;
                            role === _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_11__["BUTTON_TYPE"].REMOVE &&
                                _this.merchantService
                                    .removeAddress(addressData.id)
                                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
                                    .subscribe(function () { return _this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_8__["PATRON_NAVIGATION"].ordering, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_9__["LOCAL_ROUTING"].savedAddresses]); });
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddressEditPage.prototype.onAddressFormChanged = function (event) {
        this.addNewAddressForm = event;
    };
    AddressEditPage.prototype.addAddress = function () {
        var _this = this;
        if (this.addNewAddressForm && this.addNewAddressForm.value && !this.addNewAddressForm.valid) {
            return;
        }
        if (this.addNewAddressForm && !this.addNewAddressForm.value && !this.addNewAddressForm.valid) {
            this.onBack();
            return;
        }
        this.loadingService.showSpinner();
        this.getBuildingData$(parseInt(this.addNewAddressForm.value.campus))
            .pipe(Object(rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_7__["switchMap"])(function () { return _this.merchantService.updateUserAddress(_this.addNewAddressForm.value); }), Object(rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_7__["switchMap"])(function (addedAddress) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["zip"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["iif"])(function () { return _this.addNewAddressForm.value.default; }, _this.settingsFacadeService.saveUserSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_8__["User"].Settings.DEFAULT_ADDRESS, addedAddress.id), Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(false)), Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(addedAddress));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
            .subscribe(function () {
            _this.merchantService.selectedAddress = null;
            _this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_8__["PATRON_NAVIGATION"].ordering, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_9__["LOCAL_ROUTING"].savedAddresses]);
            _this.addNewAdddressState = !_this.addNewAdddressState;
        }, null, function () { return _this.loadingService.closeSpinner(); });
    };
    AddressEditPage.prototype.getBuildingData$ = function (isOncampus) {
        var _this = this;
        if (isOncampus) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["zip"])(this.buildings$, this.contentStrings.labelRoom).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (_a) {
                var buildings = _a[0], labelRoom = _a[1];
                var activeBuilding = buildings.find(function (_a) {
                    var building = _a.addressInfo.building;
                    return building === _this.addNewAddressForm.value.building;
                });
                var _b = activeBuilding.addressInfo, address1 = _b.address1, address2 = _b.address2, city = _b.city, state = _b.state, latitude = _b.latitude, longitude = _b.longitude;
                _this.addNewAddressForm.value = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.addNewAddressForm.value, { address1: address1,
                    address2: address2,
                    city: city,
                    state: state,
                    latitude: latitude,
                    longitude: longitude, nickname: _this.addNewAddressForm.value.building + ", " + labelRoom + " " + _this.addNewAddressForm.value.room });
            }));
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(true);
    };
    AddressEditPage.prototype.initContentStrings = function () {
        this.contentStrings.buttonSave = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_9__["ORDERING_CONTENT_STRINGS"].buttonSave);
        this.contentStrings.labelRoom = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_9__["ORDERING_CONTENT_STRINGS"].labelRoom);
    };
    AddressEditPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-address-edit-page',
            template: __webpack_require__(/*! ./address-edit.page.html */ "./src/app/sections/ordering/pages/address-edit/address-edit.page.html"),
            styles: [__webpack_require__(/*! ./address-edit.page.scss */ "./src/app/sections/ordering/pages/address-edit/address-edit.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _sections_ordering_services__WEBPACK_IMPORTED_MODULE_3__["MerchantService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__["LoadingService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_12__["PopoverController"],
            _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_13__["OrderingService"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_14__["UserFacadeService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_15__["SettingsFacadeService"]])
    ], AddressEditPage);
    return AddressEditPage;
}());



/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component.html":
/*!*******************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-popover-layout [popoverConfig]=\"config\">\r\n  <p>{{data.message}}</p>\r\n</st-popover-layout>\r\n"

/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component.scss":
/*!*******************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component.scss ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL29yZGVyaW5nL3NoYXJlZC91aS1jb21wb25lbnRzL2NvbmZpcm0tcG9wb3Zlci9jb25maXJtLXBvcG92ZXIuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: ConfirmPopoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmPopoverComponent", function() { return ConfirmPopoverComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sections_rewards_rewards_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/rewards/rewards.config */ "./src/app/sections/rewards/rewards.config.ts");



var ConfirmPopoverComponent = /** @class */ (function () {
    function ConfirmPopoverComponent() {
    }
    ConfirmPopoverComponent.prototype.ngOnInit = function () {
        this.config = {
            type: _sections_rewards_rewards_config__WEBPACK_IMPORTED_MODULE_2__["PopupTypes"].CANCEL,
            title: '',
            buttons: [],
            message: '',
            code: '',
            closeBtn: true,
        };
        this.config = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.config, this.data);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ConfirmPopoverComponent.prototype, "data", void 0);
    ConfirmPopoverComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-confirm-popover',
            template: __webpack_require__(/*! ./confirm-popover.component.html */ "./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component.html"),
            styles: [__webpack_require__(/*! ./confirm-popover.component.scss */ "./src/app/sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ConfirmPopoverComponent);
    return ConfirmPopoverComponent;
}());



/***/ }),

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


/***/ })

}]);
//# sourceMappingURL=pages-address-edit-address-edit-module.js.map