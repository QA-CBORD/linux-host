(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-favorite-merchants-favorite-merchants-module~pages-recent-orders-recent-orders-module~~e9715a09"],{

/***/ "./src/app/sections/ordering/pages/saved-addresses/saved-addresses.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/saved-addresses/saved-addresses.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-header\r\n        title=\"{{contentStrings.labelSavedAddresses | async}}\"\r\n        [isTitleShow]=\"true\"\r\n        [backButtonTitle]=\"''\"\r\n        [backButtonIcon]=\"'close'\"\r\n        [isToolbarShow]=\"true\"\r\n        class=\"saved-addresses__header\"\r\n></st-header>\r\n\r\n<ion-content>\r\n  <div class=\"saved-addresses__add-address-container\">\r\n    <ion-item\r\n            class=\"saved-addresses__add-address-wrapper\"\r\n            lines=\"full\"\r\n            [button]=\"true\"\r\n            [detail]=\"true\"\r\n            detailIcon=\"/assets/icon/angle-{{ addNewAdddressState ? 'up' : 'down' }}-select.svg\"\r\n            (click)=\"addNewAdddressState = !addNewAdddressState\"\r\n    >\r\n      <span class=\"saved-addresses__add-address-sign\">+</span>\r\n      <span class=\"saved-addresses__add-address-text\">{{contentStrings.labelAddNewAddress | async}}</span>\r\n    </ion-item>\r\n    <ng-container *ngIf=\"addNewAdddressState\">\r\n      <st-add-edit-addresses\r\n              [buildingsOnCampus]=\"buildings$ | async\"\r\n              [isError]=\"errorState\"\r\n              (onFormChanged)=\"onAddressFormChanged($event)\"\r\n      ></st-add-edit-addresses>\r\n\r\n      <div class=\"saved-addresses__add-address-btn-container\">\r\n        <st-button [fill]=\"'clear'\" (onClick)=\"addNewAdddressState = !addNewAdddressState\">\r\n          {{contentStrings.buttonCancel | async}}\r\n        </st-button>\r\n        <st-button (onClick)=\"addAddress()\" [isDisabled]=\"addNewAddressForm && !addNewAddressForm.valid\">\r\n          {{contentStrings.buttonSave | async}}\r\n        </st-button>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n  <div class=\"saved-addresses__add-address-divider\" *ngIf=\"addNewAdddressState\"></div>\r\n  <st-order-address-list [addresses]=\"userAddresses\"></st-order-address-list>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/sections/ordering/pages/saved-addresses/saved-addresses.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/saved-addresses/saved-addresses.component.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.saved-addresses__header {\n  border-bottom: 1px solid #ebebeb; }\n.saved-addresses__add-address-container {\n  padding: 0 20px; }\n.saved-addresses__add-address-wrapper {\n  margin-bottom: 20px;\n  font-size: 16px;\n  font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.saved-addresses__add-address-sign {\n  position: relative;\n  bottom: 2px;\n  left: 4px;\n  font-size: 24px;\n  font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.saved-addresses__add-address-text {\n  margin-left: 15px; }\n.saved-addresses__add-address-divider {\n  background: #f3f3f3;\n  height: 20px;\n  margin-top: 20px; }\n.saved-addresses__add-address-btn-container {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvb3JkZXJpbmcvcGFnZXMvc2F2ZWQtYWRkcmVzc2VzL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL29yZGVyaW5nL3BhZ2VzL3NhdmVkLWFkZHJlc3Nlcy9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXG9yZGVyaW5nXFxwYWdlc1xcc2F2ZWQtYWRkcmVzc2VzXFxzYXZlZC1hZGRyZXNzZXMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL29yZGVyaW5nL3BhZ2VzL3NhdmVkLWFkZHJlc3Nlcy9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX2NvbW1vbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUFBO0FBQ0E7RUFDRSxjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG1DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsZ0JBQUE7RUFDQSw4QkFBc0I7RUFDdEIsdUNBQTBCO0VBQzFCLHVDQUErQjtFQUMvQixpREFBbUM7RUFDbkMsb0NBQTRCO0VBQzVCLG1DQUEyQjtFQUUzQixlQUFBO0VBQ0EsNkJBQXFCO0VBQ3JCLHNDQUF5QjtFQUN6QixzQ0FBOEI7RUFDOUIsZ0RBQWtDO0VBQ2xDLG1DQUEyQjtFQUMzQixrQ0FBMEI7RUFFMUIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLG1DQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsV0FBQTtFQUNBLHlCQUFpQjtFQUNqQixnQ0FBcUI7RUFDckIsa0NBQTBCO0VBQzFCLDRDQUE4QjtFQUM5QiwrQkFBdUI7RUFDdkIsOEJBQXNCO0VBRXRCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIscUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixZQUFBO0VBQ0EsMEJBQWtCO0VBQ2xCLG9DQUFzQjtFQUN0QixtQ0FBMkI7RUFDM0IsdUNBQStCO0VBQy9CLGdDQUF3QjtFQUN4QiwrQkFBdUIsRUFBQTtBQ3JFdkI7RUFDRSxnQ0QwR21CLEVBQUE7QUN2R3JCO0VBQ0UsZUFBZSxFQUFBO0FBR2pCO0VBQ0UsbUJBQW1CO0VDWHJCLGVEYW9DO0VDVHBDLGlERjJFeUQsRUFBQTtBQy9EekQ7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFNBQVM7RUNuQlgsZURxQm9DO0VDakJwQyxpREYyRXlELEVBQUE7QUN2RHpEO0VBQ0UsaUJBQWlCLEVBQUE7QUFHbkI7RUFDRSxtQkRxRXVCO0VDcEV2QixZQUFZO0VBQ1osZ0JBQWdCLEVBQUE7QUFHbEI7RUFDRSxvQkFBYTtFQUFiLGFBQWE7RUFDYiw4QkFBNkI7VUFBN0IsNkJBQTZCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zZWN0aW9ucy9vcmRlcmluZy9wYWdlcy9zYXZlZC1hZGRyZXNzZXMvc2F2ZWQtYWRkcmVzc2VzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXHJcbjpyb290IHtcclxuICAvKiogcHJpbWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMDA1Y2I5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiAwLCA5MiwgMTg1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzAwNTFhMztcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XHJcblxyXG4gIC8qKiBzZWNvbmRhcnkgKiovXHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5OiAjMGNkMWU4O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDEyLCAyMDksIDIzMjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMwYmI4Y2M7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XHJcblxyXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2I6IDExMiwgNjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM2MzNjZTA7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcclxuXHJcbiAgLyoqIHN1Y2Nlc3MgKiovXHJcbiAgLS1pb24tY29sb3Itc3VjY2VzczogIzEwZGM2MDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcclxuXHJcbiAgLyoqIHdhcm5pbmcgKiovXHJcbiAgLS1pb24tY29sb3Itd2FybmluZzogI2ZmY2UwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAyMDYsIDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBiNTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcclxuXHJcbiAgLyoqIGRhbmdlciAqKi9cclxuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXJnYjogMjQ1LCA2MSwgNjE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlOiAjZDMzOTM5O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xyXG5cclxuICAvKiogZGFyayAqKi9cclxuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcclxuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XHJcblxyXG4gIC8qKiBtZWRpdW0gKiovXHJcbiAgLS1pb24tY29sb3ItbWVkaXVtOiAjOTg5YWEyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE1MiwgMTU0LCAxNjI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODY4ODhmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xyXG5cclxuICAvKiogbGlnaHQgKiovXHJcbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtcmdiOiAyNDQsIDI0NCwgMjQ0O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1zaGFkZTogI2Q3ZDhkYTtcclxuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xyXG5cclxuICAvLyAtLWlvbi1ncmlkLXdpZHRoLXNtOiAwcHg7XHJcbn1cclxuXHJcbi8vIEZPTlRTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJGZvbnQtbnVuaXRvLXJlZ3VsYXI6ICdOdW5pdG8gUmVndWxhcicsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8tc2VtaWJvbGQ6ICdOdW5pdG8gU2VtaUJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLWhlYXZ5OiAnTnVuaXRvIEJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuXHJcbi8vIENPTE9SU1xyXG5cclxuJGNvbG9yLXZlcnktbGlnaHQtZ3JheTogI2NjYztcclxuJGNvbG9yLWxpbmstd2F0ZXI6ICNkNGQ2ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZTllOWU5O1xyXG4kY29sb3ItZGFyay1ncmF5OiAjYWFhO1xyXG4kY29sb3ItZHVzdHktZ3JheTogIzk3OTc5NztcclxuJGNvbG9yLWRpbS1ncmF5OiAjNmU2ZTZlO1xyXG4kY29sb3Itc29saXR1ZGU6ICNFQ0YxRjg7XHJcbiRjb2xvci1uaWdodC1yaWRlcjogIzMzMztcclxuJGNvbG9yLW5hdnktYmx1ZTogIzAwNTZlNjtcclxuJGNvbG9yLWRlbmltOiAjMTM2MGUwO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWU6ICMxNjZkZmY7XHJcbiRjb2xvci1kb2RnZXItYmx1ZS1saWdodGVyOiAjMmQ3Y2ZmO1xyXG4kY29sb3Itd2hpdGU6ICNmZmY7XHJcbiRjb2xvci1ibGFjazogIzAwMDtcclxuJGNvbG9yLXdoaXRlLXNtb2tlOiAjZjNmM2YzO1xyXG4kY29sb3ItZGVlcC1za3ktYmx1ZTogIzAwYTBmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjOGJiN2ZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4OGM4ZmY7XHJcbiRjb2xvci1zdHJvbmctYmx1ZTogIzAwNDNiMztcclxuJGNvbG9yLWFsaWNlLWJsdWU6ICNmMGYzZjU7XHJcbiRjb2xvci1zaWx2ZXI6ICNjNGM0YzQ7XHJcbiRjb2xvci1tYXR0ZXJob3JuOiAjNTE1MTUxO1xyXG4kY29sb3ItdmVyeS1kYXJrLWdyYXk6ICM2MjYyNjI7XHJcbiRjb2xvci1tZXJjdXJ5OiAjZTdlN2U3O1xyXG4kY29sb3ItbGlnaHQtZ3JheTogI2Q4ZDhkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlYmViZWI7XHJcbiRjb2xvci1hbGl6YXJpbjogI2UyMjk0MjtcclxuJGNvbG9yLWZsYW1lLXJlZDogIzg4MTkyODtcclxuJGNvbG9yLWNoYXJjb2FsOiAjNDY0NjQ2O1xyXG4kY29sb3ItZGVlcC1zZWE6ICMxNDdkNjM7XHJcbiRjb2xvci1jYXJkaW5hbDogI2I1MjEzNTtcclxuJGNvbG9yLWdvZC1ncmF5OiAjMTYxNjE2O1xyXG4kY29sb3ItaG90LWN1cnJ5OiAjN2M1ZDIzO1xyXG4kY29sb3ItY2FzYWJsYW5jYTogI2Y3YmE0NTtcclxuJGNvbG9yLWFsYWJhc3RlcjogI2Y3ZjdmNztcclxuJHBvcmNlbGFpbjogI2U2ZTllYjtcclxuJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U6ICNEMDQzMUE7XHJcbiRjb2xvci1wYXR0ZW5zLWJsdWU6ICNlMGUzZTU7XHJcblxyXG4vLy8gU2l6ZVxyXG4kYm90dG9tLW5hdmlnYXRpb24tYmFyLWhlaWdodDogNTBweDtcclxuIiwiQGltcG9ydCAndG9vbHMnO1xyXG5cclxuLnNhdmVkLWFkZHJlc3NlcyB7XHJcbiAgJl9faGVhZGVyIHtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkY29sb3Itd2hpc3BlcjtcclxuICB9XHJcblxyXG4gICZfX2FkZC1hZGRyZXNzLWNvbnRhaW5lciB7XHJcbiAgICBwYWRkaW5nOiAwIDIwcHg7XHJcbiAgfVxyXG5cclxuICAmX19hZGQtYWRkcmVzcy13cmFwcGVyIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tc2VtaWJvbGQoMTZweCk7XHJcbiAgfVxyXG5cclxuICAmX19hZGQtYWRkcmVzcy1zaWduIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGJvdHRvbTogMnB4O1xyXG4gICAgbGVmdDogNHB4O1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXNlbWlib2xkKDI0cHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fYWRkLWFkZHJlc3MtdGV4dCB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTVweDtcclxuICB9XHJcblxyXG4gICZfX2FkZC1hZGRyZXNzLWRpdmlkZXIge1xyXG4gICAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlLXNtb2tlO1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxuICB9XHJcblxyXG4gICZfX2FkZC1hZGRyZXNzLWJ0bi1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/ordering/pages/saved-addresses/saved-addresses.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/saved-addresses/saved-addresses.component.ts ***!
  \**************************************************************************************/
/*! exports provided: SavedAddressesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SavedAddressesComponent", function() { return SavedAddressesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _sections_ordering_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/ordering/services */ "./src/app/sections/ordering/services/index.ts");
/* harmony import */ var _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/ordering/ordering.config */ "./src/app/sections/ordering/ordering.config.ts");
/* harmony import */ var _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sections/ordering/services/ordering.service */ "./src/app/sections/ordering/services/ordering.service.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @shared/ui-components/st-global-navigation/services/global-nav.service */ "./src/app/shared/ui-components/st-global-navigation/services/global-nav.service.ts");












var SavedAddressesComponent = /** @class */ (function () {
    function SavedAddressesComponent(loader, merchantService, orderingService, userFacadeService, settingsFacadeService, globalNav) {
        this.loader = loader;
        this.merchantService = merchantService;
        this.orderingService = orderingService;
        this.userFacadeService = userFacadeService;
        this.settingsFacadeService = settingsFacadeService;
        this.globalNav = globalNav;
        this.errorState = false;
        this.addNewAdddressState = false;
        this.addNewAddressForm = { value: null, valid: false };
        this.contentStrings = {};
    }
    SavedAddressesComponent.prototype.ngOnInit = function () {
        this.initContentStrings();
        this.globalNav.hideNavBar();
    };
    SavedAddressesComponent.prototype.ngOnDestroy = function () {
        this.globalNav.showNavBar();
    };
    SavedAddressesComponent.prototype.ionViewWillEnter = function () {
        this.buildings$ = this.merchantService.retrieveBuildings();
        this.initAddresses();
    };
    SavedAddressesComponent.prototype.onAddressFormChanged = function (event) {
        this.addNewAddressForm = event;
        this.errorState = false;
    };
    SavedAddressesComponent.prototype.addAddress = function () {
        var _this = this;
        if (!this.addNewAddressForm.valid) {
            this.errorState = true;
            return;
        }
        this.loader.showSpinner();
        this.getBuildingData$(parseInt(this.addNewAddressForm.value.campus))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function () { return _this.merchantService.updateUserAddress(_this.addNewAddressForm.value); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (addedAddress) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["iif"])(function () { return _this.addNewAddressForm.value.default; }, _this.settingsFacadeService.saveUserSetting(_app_global__WEBPACK_IMPORTED_MODULE_10__["User"].Settings.DEFAULT_ADDRESS, addedAddress['id']), Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false)), Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(addedAddress));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1))
            .subscribe(function (_a) {
            var bool = _a[0], addedAddress = _a[1];
            _this.loader.closeSpinner();
            _this.userAddresses = _this.userAddresses.concat([addedAddress]);
            _this.addNewAdddressState = !_this.addNewAdddressState;
        }, function () { return _this.loader.closeSpinner(); });
    };
    SavedAddressesComponent.prototype.getBuildingData$ = function (isOncampus) {
        var _this = this;
        if (isOncampus) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(this.buildings$, this.contentStrings.labelRoom).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (_a) {
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(true);
    };
    SavedAddressesComponent.prototype.initAddresses = function () {
        var _this = this;
        this.loader.showSpinner();
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(this.settingsFacadeService.getSetting(_app_global__WEBPACK_IMPORTED_MODULE_10__["Settings"].Setting.ADDRESS_RESTRICTION), this.userFacadeService.getUserAddresses$())
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["finalize"])(function () { return _this.loader.closeSpinner(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1))
            .subscribe(function (_a) {
            var value = _a[0].value, addresses = _a[1];
            var institutionRestriction = parseInt(value);
            var filteredByInstitution = addresses.filter(function (_a) {
                var onCampus = _a.onCampus;
                if (institutionRestriction === _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["INSTITUTION_ADDRESS_RESTRICTIONS"].onCampus) {
                    return onCampus;
                }
                if (institutionRestriction === _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["INSTITUTION_ADDRESS_RESTRICTIONS"].offCampus) {
                    return !onCampus;
                }
            });
            _this.userAddresses = !institutionRestriction ? addresses : filteredByInstitution;
        });
    };
    SavedAddressesComponent.prototype.initContentStrings = function () {
        this.contentStrings.buttonCancel = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].buttonCancel);
        this.contentStrings.buttonSave = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].buttonSave);
        this.contentStrings.labelAddNewAddress =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelAddNewAddress);
        this.contentStrings.labelSavedAddresses = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelSavedAddresses);
        this.contentStrings.labelRoom = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelRoom);
    };
    SavedAddressesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-saved-addresses',
            template: __webpack_require__(/*! ./saved-addresses.component.html */ "./src/app/sections/ordering/pages/saved-addresses/saved-addresses.component.html"),
            styles: [__webpack_require__(/*! ./saved-addresses.component.scss */ "./src/app/sections/ordering/pages/saved-addresses/saved-addresses.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__["LoadingService"],
            _sections_ordering_services__WEBPACK_IMPORTED_MODULE_5__["MerchantService"],
            _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_7__["OrderingService"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_8__["UserFacadeService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_9__["SettingsFacadeService"],
            _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_11__["GlobalNavService"]])
    ], SavedAddressesComponent);
    return SavedAddressesComponent;
}());



/***/ })

}]);
//# sourceMappingURL=default~pages-favorite-merchants-favorite-merchants-module~pages-recent-orders-recent-orders-module~~e9715a09.js.map