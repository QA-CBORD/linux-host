(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~ordering-ordering-module~pages-address-edit-address-edit-module~pages-cart-cart-module~pages~2f9d709f"],{

/***/ "./src/app/sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.component.html":
/*!*************************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.component.html ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"addresses\">\r\n  <form *ngIf=\"addEditAddressesForm\"\r\n        [formGroup]=\"addEditAddressesForm\">\r\n    <ion-radio-group class=\"addresses__control\"\r\n                     [formControl]=\"campus\"\r\n                     (ionChange)=\"onCampusChanged($event)\">\r\n      <ion-item lines=\"none\"\r\n                *ngIf=\"!addressRestriction.offCampus\">\r\n        <ion-label class=\"addresses__radio-label\">{{contentStrings.labelOffCampus | async}}</ion-label>\r\n        <ion-radio mode=\"md\"\r\n                   slot=\"start\"\r\n                   value=\"offcampus\"\r\n                   class=\"addresses__radio\"\r\n                   [disabled]=\"addressRestriction.offCampus\"></ion-radio>\r\n      </ion-item>\r\n\r\n      <ion-item lines=\"none\"\r\n                *ngIf=\"!addressRestriction.onCampus\">\r\n        <ion-label class=\"addresses__radio-label\">{{contentStrings.labelOnCampus | async}}</ion-label>\r\n        <ion-radio mode=\"md\"\r\n                   slot=\"start\"\r\n                   value=\"oncampus\"\r\n                   class=\"addresses__radio\"\r\n                   [disabled]=\"addressRestriction.onCampus\"></ion-radio>\r\n      </ion-item>\r\n    </ion-radio-group>\r\n    <ng-container *ngIf=\"addEditAddressesForm.value.campus === 'oncampus' && buildings\">\r\n      <st-select-floating-label [formControlName]=\"controlsNames.buildings\"\r\n                                [control]=\"buildings\"\r\n                                [interfaceOptions]=\"customActionSheetOptions\"\r\n                                [isError]=\"\r\n                                buildings?.invalid &&\r\n                                buildings?.touched\"\r\n                                class=\"addresses__control\"\r\n                                interface=\"action-sheet\"\r\n                                [title]=\"contentStrings.selectAccount | async\"\r\n                                label=\"{{contentStrings.labelBuildings | async}}\"\r\n                                idd=\"building\">\r\n        <ng-container role=\"options\">\r\n          <ion-select-option *ngFor=\"let item of buildingsOnCampus\"\r\n                             [value]=\"item.addressInfo.building\">\r\n            {{ item.addressInfo.building }}\r\n          </ion-select-option>\r\n        </ng-container>\r\n\r\n        <ng-container role=\"error\">\r\n          <p class=\"addresses__control-error-msg\">\r\n            {{ buildings?.errors?.errorMsg }}\r\n          </p>\r\n        </ng-container>\r\n      </st-select-floating-label>\r\n      <st-input-floating-label class=\"addresses__control\"\r\n                               [formControlName]=\"controlsNames.room\"\r\n                               [control]=\"room\"\r\n                               label=\"{{contentStrings.labelRoom | async}}\"\r\n                               type=\"number\"\r\n                               idd=\"room\"\r\n                               maxlength=\"100\"\r\n                               [isError]=\"\r\n        room?.errors &&\r\n        (room?.dirty ||\r\n        room?.touched)\">\r\n        <p class=\"addresses__control-error-msg\">\r\n          {{ room?.errors?.errorMsg }}\r\n        </p>\r\n      </st-input-floating-label>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"addEditAddressesForm.value.campus === 'offcampus' && state\">\r\n      <st-input-floating-label class=\"addresses__control\"\r\n                               [control]=\"address1\"\r\n                               label=\"{{contentStrings.labelAddressLine1 | async}}\"\r\n                               type=\"text\"\r\n                               idd=\"address1\"\r\n                               maxlength=\"100\"\r\n                               [formControlName]=\"controlsNames.address1\"\r\n                               [isError]=\"\r\n                               address1.errors &&\r\n                               (address1.dirty || address1.touched)\">\r\n        <p class=\"addresses__control-error-msg\">\r\n          {{ address1.errors?.errorMsg }}\r\n        </p>\r\n      </st-input-floating-label>\r\n      <div class=\"addresses__control-optional-wrapper\">\r\n        <st-input-floating-label class=\"addresses__control\"\r\n                                 [control]=\"address2\"\r\n                                 [formControlName]=\"controlsNames.address2\"\r\n                                 label=\"{{contentStrings.labelAddressLine2 | async}}\"\r\n                                 type=\"text\"\r\n                                 idd=\"address2\"\r\n                                 maxlength=\"100\"\r\n                                 [isError]=\"address2.errors &&\r\n                                 (address2.dirty || address2.touched)\">\r\n        </st-input-floating-label>\r\n        <ng-container [ngTemplateOutlet]=\"optionalPlaceholder\"></ng-container>\r\n      </div>\r\n      <st-input-floating-label class=\"addresses__control\"\r\n                               [control]=\"city\"\r\n                               [formControlName]=\"controlsNames.city\"\r\n                               label=\"{{contentStrings.labelCity | async}}\"\r\n                               type=\"text\"\r\n                               idd=\"city\"\r\n                               maxlength=\"100\"\r\n                               [isError]=\"city.errors &&\r\n                               (city.dirty || city.touched)\">\r\n        <p class=\"addresses__control-error-msg\">\r\n          {{ city.errors?.errorMsg }}\r\n        </p>\r\n      </st-input-floating-label>\r\n      <st-select-floating-label [formControlName]=\"controlsNames.state\"\r\n                                [control]=\"state\"\r\n                                [interfaceOptions]=\"customActionSheetOptions\"\r\n                                [isError]=\"state.invalid && state.touched\"\r\n                                class=\"addresses__control\"\r\n                                interface=\"action-sheet\"\r\n                                [title]=\"contentStrings.selectAccount | async\"\r\n                                label=\"{{ contentStrings.labelState | async }}\"\r\n                                idd=\"state\">\r\n        <ng-container role=\"options\">\r\n          <ion-select-option *ngFor=\"let state of arrOfStates$ | async\"\r\n                             [value]=\"state\">\r\n            {{ state }}\r\n          </ion-select-option>\r\n        </ng-container>\r\n\r\n        <ng-container role=\"error\">\r\n          <p class=\"addresses__control-error-msg\">\r\n            {{ state.errors?.errorMsg }}\r\n          </p>\r\n        </ng-container>\r\n      </st-select-floating-label>\r\n      <div class=\"addresses__control-optional-wrapper\">\r\n        <st-input-floating-label class=\"addresses__control addresses__nickname-control\"\r\n                                 [control]=\"nickname\"\r\n                                 [formControlName]=\"controlsNames.nickname\"\r\n                                 label=\"{{contentStrings.labelNickname | async}}\"\r\n                                 type=\"text\"\r\n                                 idd=\"nickname\"\r\n                                 maxlength=\"50\"\r\n                                 [isError]=\"\r\n                                 nickname.errors &&\r\n                                 (nickname.dirty || nickname.touched)\">\r\n        </st-input-floating-label>\r\n        <ng-container [ngTemplateOutlet]=\"optionalPlaceholder\"></ng-container>\r\n      </div>\r\n    </ng-container>\r\n    <ion-item lines=\"none\">\r\n      <ion-label>{{ contentStrings.labelSetAsDefault | async }}</ion-label>\r\n      <ion-checkbox mode=\"md\"\r\n                    class=\"addresses__checkbox\"\r\n                    slot=\"start\"\r\n                    [formControl]=\"default\"></ion-checkbox>\r\n    </ion-item>\r\n  </form>\r\n</div>\r\n\r\n<ng-template #optionalPlaceholder>\r\n  <div class=\"addresses__control-optional\">\r\n    {{contentStrings.labelOptional | async}}\r\n  </div>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.component.scss":
/*!*************************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.component.scss ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.addresses__control {\n  display: block;\n  margin-bottom: 40px; }\n.addresses__control-optional-wrapper {\n  position: relative; }\n.addresses__control-optional {\n  color: #6e6e6e;\n  position: absolute;\n  left: 15px;\n  top: 55px;\n  font-size: 12px;\n  font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.addresses__nickname-control {\n  margin-bottom: 20px; }\n.addresses__checkbox {\n  --background-checked: #166dff;\n  --border-color-checked: #166dff;\n  margin: 0 10px 0 0; }\n.addresses__control-error-msg {\n  margin: 0;\n  color: #881928;\n  letter-spacing: 0;\n  min-height: 16px;\n  line-height: 16px;\n  font-size: 12px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.addresses__radio {\n  --color-checked: #166dff;\n  --color: #c4c4c4;\n  margin-right: 10px; }\n.addresses__radio-label {\n  font-size: 16px;\n  font-family: \"Nunito SemiBold\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvb3JkZXJpbmcvc2hhcmVkL3VpLWNvbXBvbmVudHMvYWRkLWVkaXQtYWRkcmVzc2VzL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL29yZGVyaW5nL3NoYXJlZC91aS1jb21wb25lbnRzL2FkZC1lZGl0LWFkZHJlc3Nlcy9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXG9yZGVyaW5nXFxzaGFyZWRcXHVpLWNvbXBvbmVudHNcXGFkZC1lZGl0LWFkZHJlc3Nlc1xcYWRkLWVkaXQtYWRkcmVzc2VzLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9vcmRlcmluZy9zaGFyZWQvdWktY29tcG9uZW50cy9hZGQtZWRpdC1hZGRyZXNzZXMvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF9jb21tb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBQTtBQUNBO0VBQ0UsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixtQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGdCQUFBO0VBQ0EsOEJBQXNCO0VBQ3RCLHVDQUEwQjtFQUMxQix1Q0FBK0I7RUFDL0IsaURBQW1DO0VBQ25DLG9DQUE0QjtFQUM1QixtQ0FBMkI7RUFFM0IsZUFBQTtFQUNBLDZCQUFxQjtFQUNyQixzQ0FBeUI7RUFDekIsc0NBQThCO0VBQzlCLGdEQUFrQztFQUNsQyxtQ0FBMkI7RUFDM0Isa0NBQTBCO0VBRTFCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixtQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFdBQUE7RUFDQSx5QkFBaUI7RUFDakIsZ0NBQXFCO0VBQ3JCLGtDQUEwQjtFQUMxQiw0Q0FBOEI7RUFDOUIsK0JBQXVCO0VBQ3ZCLDhCQUFzQjtFQUV0QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLHFDQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsWUFBQTtFQUNBLDBCQUFrQjtFQUNsQixvQ0FBc0I7RUFDdEIsbUNBQTJCO0VBQzNCLHVDQUErQjtFQUMvQixnQ0FBd0I7RUFDeEIsK0JBQXVCLEVBQUE7QUNyRXZCO0VBQ0UsY0FBYztFQUNkLG1CQUFtQixFQUFBO0FBR3JCO0VBQ0Usa0JBQWtCLEVBQUE7QUFHcEI7RUFDRSxjRDZFb0I7RUM1RXBCLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsU0FBUztFQ2ZYLGVEaUJvQztFQ2JwQyxpREYyRXlELEVBQUE7QUMzRHpEO0VBQ0UsbUJBQW1CLEVBQUE7QUFHckI7RUFDRSw2QkFBcUI7RUFDckIsK0JBQXVCO0VBRXZCLGtCQUFrQixFQUFBO0FBR3BCO0VBQ0UsU0FBUztFQUNULGNEOEVxQjtFQzdFckIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUNwQ25CLGVEc0NpQztFQ2xDakMsNkNGNEVrRCxFQUFBO0FDdkNsRDtFQUNFLHdCQUFnQjtFQUNoQixnQkFBUTtFQUVSLGtCQUFrQixFQUFBO0FBR3BCO0VDaERBLGVEaURvQztFQzdDcEMsaURGMkV5RCxFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvb3JkZXJpbmcvc2hhcmVkL3VpLWNvbXBvbmVudHMvYWRkLWVkaXQtYWRkcmVzc2VzL2FkZC1lZGl0LWFkZHJlc3Nlcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBJb25pYyBDU1MgVmFyaWFibGVzICoqL1xyXG46cm9vdCB7XHJcbiAgLyoqIHByaW1hcnkgKiovXHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeTogIzAwNWNiOTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXJnYjogMCwgOTIsIDE4NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGU6ICMwMDUxYTM7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS10aW50OiAjMWE2Y2MwO1xyXG5cclxuICAvKiogc2Vjb25kYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeTogIzBjZDFlODtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktcmdiOiAxMiwgMjA5LCAyMzI7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXNoYWRlOiAjMGJiOGNjO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS10aW50OiAjMjRkNmVhO1xyXG5cclxuICAvKiogdGVydGlhcnkgKiovXHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnk6ICM3MDQ0ZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktcmdiOiAxMTIsIDY4LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXNoYWRlOiAjNjMzY2UwO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXRpbnQ6ICM3ZTU3ZmY7XHJcblxyXG4gIC8qKiBzdWNjZXNzICoqL1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3M6ICMxMGRjNjA7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2I6IDE2LCAyMjAsIDk2O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZTogIzBlYzI1NDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXRpbnQ6ICMyOGUwNzA7XHJcblxyXG4gIC8qKiB3YXJuaW5nICoqL1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmc6ICNmZmNlMDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1yZ2I6IDI1NSwgMjA2LCAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1zaGFkZTogI2UwYjUwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXRpbnQ6ICNmZmQzMWE7XHJcblxyXG4gIC8qKiBkYW5nZXIgKiovXHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyOiAjZjA0MTQxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1yZ2I6IDI0NSwgNjEsIDYxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1zaGFkZTogI2QzMzkzOTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItdGludDogI2YyNTQ1NDtcclxuXHJcbiAgLyoqIGRhcmsgKiovXHJcbiAgLS1pb24tY29sb3ItZGFyazogIzIyMjQyODtcclxuICAtLWlvbi1jb2xvci1kYXJrLXJnYjogMzQsIDM0LCAzNDtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstc2hhZGU6ICMxZTIwMjM7XHJcbiAgLS1pb24tY29sb3ItZGFyay10aW50OiAjMzgzYTNlO1xyXG5cclxuICAvKiogbWVkaXVtICoqL1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bTogIzk4OWFhMjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tcmdiOiAxNTIsIDE1NCwgMTYyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZTogIzg2ODg4ZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tdGludDogI2EyYTRhYjtcclxuXHJcbiAgLyoqIGxpZ2h0ICoqL1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0OiAjZjRmNWY4O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXJnYjogMjQ0LCAyNDQsIDI0NDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdDogIzAwMDAwMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdC1yZ2I6IDAsIDAsIDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtc2hhZGU6ICNkN2Q4ZGE7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtdGludDogI2Y1ZjZmOTtcclxuXHJcbiAgLy8gLS1pb24tZ3JpZC13aWR0aC1zbTogMHB4O1xyXG59XHJcblxyXG4vLyBGT05UU1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiRmb250LW51bml0by1yZWd1bGFyOiAnTnVuaXRvIFJlZ3VsYXInLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLXNlbWlib2xkOiAnTnVuaXRvIFNlbWlCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1oZWF2eTogJ051bml0byBCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcblxyXG4vLyBDT0xPUlNcclxuXHJcbiRjb2xvci12ZXJ5LWxpZ2h0LWdyYXk6ICNjY2M7XHJcbiRjb2xvci1saW5rLXdhdGVyOiAjZDRkNmQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2U5ZTllOTtcclxuJGNvbG9yLWRhcmstZ3JheTogI2FhYTtcclxuJGNvbG9yLWR1c3R5LWdyYXk6ICM5Nzk3OTc7XHJcbiRjb2xvci1kaW0tZ3JheTogIzZlNmU2ZTtcclxuJGNvbG9yLXNvbGl0dWRlOiAjRUNGMUY4O1xyXG4kY29sb3ItbmlnaHQtcmlkZXI6ICMzMzM7XHJcbiRjb2xvci1uYXZ5LWJsdWU6ICMwMDU2ZTY7XHJcbiRjb2xvci1kZW5pbTogIzEzNjBlMDtcclxuJGNvbG9yLWRvZGdlci1ibHVlOiAjMTY2ZGZmO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWUtbGlnaHRlcjogIzJkN2NmZjtcclxuJGNvbG9yLXdoaXRlOiAjZmZmO1xyXG4kY29sb3ItYmxhY2s6ICMwMDA7XHJcbiRjb2xvci13aGl0ZS1zbW9rZTogI2YzZjNmMztcclxuJGNvbG9yLWRlZXAtc2t5LWJsdWU6ICMwMGEwZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzhiYjdmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjODhjOGZmO1xyXG4kY29sb3Itc3Ryb25nLWJsdWU6ICMwMDQzYjM7XHJcbiRjb2xvci1hbGljZS1ibHVlOiAjZjBmM2Y1O1xyXG4kY29sb3Itc2lsdmVyOiAjYzRjNGM0O1xyXG4kY29sb3ItbWF0dGVyaG9ybjogIzUxNTE1MTtcclxuJGNvbG9yLXZlcnktZGFyay1ncmF5OiAjNjI2MjYyO1xyXG4kY29sb3ItbWVyY3VyeTogI2U3ZTdlNztcclxuJGNvbG9yLWxpZ2h0LWdyYXk6ICNkOGQ4ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZWJlYmViO1xyXG4kY29sb3ItYWxpemFyaW46ICNlMjI5NDI7XHJcbiRjb2xvci1mbGFtZS1yZWQ6ICM4ODE5Mjg7XHJcbiRjb2xvci1jaGFyY29hbDogIzQ2NDY0NjtcclxuJGNvbG9yLWRlZXAtc2VhOiAjMTQ3ZDYzO1xyXG4kY29sb3ItY2FyZGluYWw6ICNiNTIxMzU7XHJcbiRjb2xvci1nb2QtZ3JheTogIzE2MTYxNjtcclxuJGNvbG9yLWhvdC1jdXJyeTogIzdjNWQyMztcclxuJGNvbG9yLWNhc2FibGFuY2E6ICNmN2JhNDU7XHJcbiRjb2xvci1hbGFiYXN0ZXI6ICNmN2Y3Zjc7XHJcbiRwb3JjZWxhaW46ICNlNmU5ZWI7XHJcbiRjb2xvci1oYXJsZXktZGF2aWRzb24tb3JhbmdlOiAjRDA0MzFBO1xyXG4kY29sb3ItcGF0dGVucy1ibHVlOiAjZTBlM2U1O1xyXG5cclxuLy8vIFNpemVcclxuJGJvdHRvbS1uYXZpZ2F0aW9uLWJhci1oZWlnaHQ6IDUwcHg7XHJcbiIsIkBpbXBvcnQgJ3Rvb2xzJztcclxuXHJcbi5hZGRyZXNzZXMge1xyXG4gICZfX2NvbnRyb2wge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG4gIH1cclxuXHJcbiAgJl9fY29udHJvbC1vcHRpb25hbC13cmFwcGVyIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB9XHJcblxyXG4gICZfX2NvbnRyb2wtb3B0aW9uYWwge1xyXG4gICAgY29sb3I6ICRjb2xvci1kaW0tZ3JheTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDE1cHg7XHJcbiAgICB0b3A6IDU1cHg7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tc2VtaWJvbGQoMTJweCk7XHJcbiAgfVxyXG5cclxuICAmX19uaWNrbmFtZS1jb250cm9sIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG5cclxuICAmX19jaGVja2JveCB7XHJcbiAgICAtLWJhY2tncm91bmQtY2hlY2tlZDogIzE2NmRmZjtcclxuICAgIC0tYm9yZGVyLWNvbG9yLWNoZWNrZWQ6ICMxNjZkZmY7XHJcblxyXG4gICAgbWFyZ2luOiAwIDEwcHggMCAwO1xyXG4gIH1cclxuXHJcbiAgJl9fY29udHJvbC1lcnJvci1tc2cge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgY29sb3I6ICRjb2xvci1mbGFtZS1yZWQ7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMDtcclxuICAgIG1pbi1oZWlnaHQ6IDE2cHg7XHJcbiAgICBsaW5lLWhlaWdodDogMTZweDtcclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgxMnB4KTtcclxuICB9XHJcblxyXG4gICZfX3JhZGlvIHtcclxuICAgIC0tY29sb3ItY2hlY2tlZDogIzE2NmRmZjtcclxuICAgIC0tY29sb3I6ICNjNGM0YzQ7XHJcbiAgICBcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxuICB9XHJcblxyXG4gICZfX3JhZGlvLWxhYmVsIHtcclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXNlbWlib2xkKDE2cHgpO1xyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.component.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: AddEditAddressesComponent, ADD_EDIT_ADDRESS_CONTROL_NAMES, CONTROL_ERROR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEditAddressesComponent", function() { return AddEditAddressesComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_EDIT_ADDRESS_CONTROL_NAMES", function() { return ADD_EDIT_ADDRESS_CONTROL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTROL_ERROR", function() { return CONTROL_ERROR; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _sections_ordering_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/ordering/services */ "./src/app/sections/ordering/services/index.ts");
/* harmony import */ var _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/ordering/ordering.config */ "./src/app/sections/ordering/ordering.config.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/ordering/services/ordering.service */ "./src/app/sections/ordering/services/ordering.service.ts");
/* harmony import */ var _core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/utils/general-helpers */ "./src/app/core/utils/general-helpers.ts");
/* harmony import */ var _core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/facades/content-strings/content-strings.facade.service */ "./src/app/core/facades/content-strings/content-strings.facade.service.ts");
/* harmony import */ var _content_strings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../content-strings */ "./src/app/content-strings.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../app.global */ "./src/app/app.global.ts");

var _a;













var AddEditAddressesComponent = /** @class */ (function () {
    function AddEditAddressesComponent(fb, merchantService, cdRef, loader, orderingService, contentStringsFacadeService, settingsFacadeService) {
        this.fb = fb;
        this.merchantService = merchantService;
        this.cdRef = cdRef;
        this.loader = loader;
        this.orderingService = orderingService;
        this.contentStringsFacadeService = contentStringsFacadeService;
        this.settingsFacadeService = settingsFacadeService;
        this.onFormChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.contentStrings = {};
        this.addressRestriction = { onCampus: false, offCampus: false };
        this.customActionSheetOptions = {
            cssClass: 'custom-deposit-actionSheet',
        };
        this.sourceSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subscription"]();
    }
    AddEditAddressesComponent.prototype.ngOnChanges = function (changes) {
        if (this.addEditAddressesForm) {
            var controls_1 = this.addEditAddressesForm.controls;
            if (changes.isError && changes.isError.currentValue) {
                Object.keys(controls_1).forEach(function (controlName) { return controls_1[controlName].markAsTouched(); });
            }
            else {
                Object.keys(controls_1).forEach(function (controlName) { return controls_1[controlName].markAsUntouched(); });
            }
        }
    };
    AddEditAddressesComponent.prototype.ngOnInit = function () {
        this.getSetting(_app_global__WEBPACK_IMPORTED_MODULE_13__["Settings"].Setting.ADDRESS_RESTRICTION);
        this.initContentStrings();
        this.updateFormErrorsByContentStrings();
    };
    AddEditAddressesComponent.prototype.ngOnDestroy = function () {
        this.sourceSubscription.unsubscribe();
    };
    Object.defineProperty(AddEditAddressesComponent.prototype, "controlsNames", {
        get: function () {
            return ADD_EDIT_ADDRESS_CONTROL_NAMES;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAddressesComponent.prototype, "campus", {
        get: function () {
            if (this.addEditAddressesForm) {
                return this.addEditAddressesForm.get(this.controlsNames.campus);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAddressesComponent.prototype, "address1", {
        get: function () {
            if (this.addEditAddressesForm) {
                return this.addEditAddressesForm.get(this.controlsNames.address1);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAddressesComponent.prototype, "address2", {
        get: function () {
            return this.addEditAddressesForm.get(this.controlsNames.address2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAddressesComponent.prototype, "city", {
        get: function () {
            return this.addEditAddressesForm.get(this.controlsNames.city);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAddressesComponent.prototype, "state", {
        get: function () {
            return this.addEditAddressesForm.get(this.controlsNames.state);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAddressesComponent.prototype, "nickname", {
        get: function () {
            return this.addEditAddressesForm.get(this.controlsNames.nickname);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAddressesComponent.prototype, "default", {
        get: function () {
            return this.addEditAddressesForm.get(this.controlsNames.default);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAddressesComponent.prototype, "room", {
        get: function () {
            return this.addEditAddressesForm.get(this.controlsNames.room);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAddressesComponent.prototype, "buildings", {
        get: function () {
            return this.addEditAddressesForm.get(this.controlsNames.buildings);
        },
        enumerable: true,
        configurable: true
    });
    AddEditAddressesComponent.prototype.onCampusChanged = function (_a) {
        var value = _a.detail.value;
        if (value === 'oncampus') {
            this.cleanControls(Object.keys(this.offCampusFormBlock(this.editAddress && this.editAddress.address)));
            this.addControls(this.onCampusFormBlock(this.editAddress && this.editAddress.address));
        }
        else {
            this.cleanControls(Object.keys(this.onCampusFormBlock(this.editAddress && this.editAddress.address)));
            this.addControls(this.offCampusFormBlock(this.editAddress && this.editAddress.address));
        }
    };
    AddEditAddressesComponent.prototype.getSetting = function (setting) {
        var _this = this;
        this.loader.showSpinner();
        this.settingsFacadeService
            .getSetting(setting)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1))
            .subscribe(function (_a) {
            var value = _a.value;
            _this.initForm(parseInt(value), _this.editAddress && _this.editAddress.address);
        }, null, function () { return _this.loader.closeSpinner(); });
    };
    AddEditAddressesComponent.prototype.initForm = function (addressRestriction, selectedAddress) {
        var campusBlock;
        if (selectedAddress && Object.keys(selectedAddress).length) {
            if (selectedAddress.onCampus) {
                campusBlock = this.onCampusFormBlock(selectedAddress);
                this.addressRestriction = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.addressRestriction, { offCampus: true });
            }
            else {
                campusBlock = this.offCampusFormBlock(selectedAddress);
                this.addressRestriction = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.addressRestriction, { onCampus: true });
            }
        }
        else {
            if (addressRestriction === 2 || addressRestriction === 0) {
                campusBlock = this.offCampusFormBlock(selectedAddress);
                if (addressRestriction === 2)
                    this.addressRestriction = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.addressRestriction, { onCampus: true });
            }
            else {
                campusBlock = this.onCampusFormBlock(selectedAddress);
                this.addressRestriction = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.addressRestriction, { offCampus: true });
            }
        }
        this.addEditAddressesForm = this.fb.group(campusBlock);
        this.cdRef.detectChanges();
        this.onChanges();
    };
    AddEditAddressesComponent.prototype.onChanges = function () {
        var _this = this;
        var subscription = this.addEditAddressesForm.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(500)).subscribe(function (value) {
            var id = _this.editAddress && _this.editAddress.address ? _this.editAddress.address.id : null;
            _this.onFormChanged.emit({
                value: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, value, { campus: value.campus === 'oncampus' ? '1' : '0', id: id }),
                valid: _this.addEditAddressesForm.valid,
            });
        });
        this.sourceSubscription.add(subscription);
    };
    AddEditAddressesComponent.prototype.offCampusFormBlock = function (selectedAddress) {
        var _a;
        var address1 = ADD_EDIT_ADDRESS_CONTROL_NAMES.address1, city = ADD_EDIT_ADDRESS_CONTROL_NAMES.city, state = ADD_EDIT_ADDRESS_CONTROL_NAMES.state;
        var address1Errors = [Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_9__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[address1].required)];
        var cityErrors = [Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_9__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[city].required)];
        var stateErrors = [Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_9__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[state].required)];
        var campus;
        if (selectedAddress && selectedAddress.onCampus !== null) {
            campus = selectedAddress.onCampus ? 'oncampus' : 'offcampus';
        }
        return _a = {},
            _a[this.controlsNames.campus] = [campus || 'offcampus'],
            _a[this.controlsNames.address1] = [
                selectedAddress && selectedAddress.address1 !== null ? selectedAddress.address1 : '',
                address1Errors,
            ],
            _a[this.controlsNames.address2] = [
                selectedAddress && selectedAddress.address2 !== null ? selectedAddress.address2 : '',
            ],
            _a[this.controlsNames.city] = [
                selectedAddress && selectedAddress.city !== null ? selectedAddress.city : '',
                cityErrors,
            ],
            _a[this.controlsNames.state] = [
                selectedAddress && selectedAddress.state !== null ? selectedAddress.state : '',
                stateErrors,
            ],
            _a[this.controlsNames.nickname] = [
                selectedAddress && selectedAddress.nickname !== null ? selectedAddress.nickname : '',
            ],
            _a[this.controlsNames.default] = [this.defaultAddress && selectedAddress.id === this.defaultAddress],
            _a;
    };
    AddEditAddressesComponent.prototype.onCampusFormBlock = function (selectedAddress) {
        var _a;
        var buildings = ADD_EDIT_ADDRESS_CONTROL_NAMES.buildings, room = ADD_EDIT_ADDRESS_CONTROL_NAMES.room;
        var buildingsErrors = [
            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_9__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[buildings].required),
        ];
        var roomErrors = [Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_9__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[room].required)];
        var campus;
        if (selectedAddress && selectedAddress.onCampus !== null) {
            campus = selectedAddress.onCampus ? 'oncampus' : 'offcampus';
        }
        return _a = {},
            _a[this.controlsNames.campus] = [campus || 'oncampus'],
            _a[this.controlsNames.buildings] = [
                selectedAddress && selectedAddress.building !== null
                    ? this.editAddress.activeBuilding.addressInfo.building
                    : '',
                buildingsErrors,
            ],
            _a[this.controlsNames.room] = [
                selectedAddress && selectedAddress.room !== null ? selectedAddress.room : '',
                roomErrors,
            ],
            _a[this.controlsNames.default] = [this.defaultAddress && selectedAddress.id === this.defaultAddress],
            _a;
    };
    AddEditAddressesComponent.prototype.cleanControls = function (controlNames) {
        for (var i = 0; i < controlNames.length; i++) {
            this.addEditAddressesForm.contains(controlNames[i]) && this.addEditAddressesForm.removeControl(controlNames[i]);
        }
    };
    AddEditAddressesComponent.prototype.addControls = function (controls) {
        var modifedControls = Object.entries(controls);
        for (var i = 0; i < modifedControls.length; i++) {
            this.addEditAddressesForm.addControl(modifedControls[i][0], this.fb.control(modifedControls[i][1][0], modifedControls[i][1][1]));
        }
    };
    AddEditAddressesComponent.prototype.initContentStrings = function () {
        this.contentStrings.formErrorAddress =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].formErrorAddress);
        this.contentStrings.formErrorBuilding =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].formErrorBuilding);
        this.contentStrings.formErrorCity =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].formErrorCity);
        this.contentStrings.formErrorRoom =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].formErrorRoom);
        this.contentStrings.formErrorState =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].formErrorState);
        this.contentStrings.labelState =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelState);
        this.contentStrings.labelSetAsDefault =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelSetAsDefault);
        this.contentStrings.labelOffCampus =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelOffCampus);
        this.contentStrings.labelOnCampus =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelOnCampus);
        this.contentStrings.labelRoom =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelRoom);
        this.contentStrings.labelAddressLine1 =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelAddressLine1);
        this.contentStrings.labelAddressLine2 =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelAddressLine2);
        this.contentStrings.labelBuildings =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelBuildings);
        this.contentStrings.labelCity =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelCity);
        this.contentStrings.labelNickname =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelNickname);
        this.contentStrings.labelOptional =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].labelOptional);
        this.contentStrings.selectAccount =
            this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_6__["ORDERING_CONTENT_STRINGS"].selectAccount);
        this.arrOfStates$ =
            this.contentStringsFacadeService.getContentStrings$(_content_strings__WEBPACK_IMPORTED_MODULE_11__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_11__["CONTENT_STINGS_CATEGORIES"].usStates)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (stateStrings) {
                return stateStrings.map(function (_a) {
                    var value = _a.value;
                    return value;
                });
            }));
    };
    AddEditAddressesComponent.prototype.updateFormErrorsByContentStrings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.address1];
                        return [4 /*yield*/, this.contentStrings.formErrorAddress.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).toPromise()];
                    case 1:
                        _a.required
                            = _f.sent();
                        _b = CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.buildings];
                        return [4 /*yield*/, this.contentStrings.formErrorBuilding.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).toPromise()];
                    case 2:
                        _b.required
                            = _f.sent();
                        _c = CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.room];
                        return [4 /*yield*/, this.contentStrings.formErrorRoom.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).toPromise()];
                    case 3:
                        _c.required
                            = _f.sent();
                        _d = CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.city];
                        return [4 /*yield*/, this.contentStrings.formErrorCity.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).toPromise()];
                    case 4:
                        _d.required
                            = _f.sent();
                        _e = CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.state];
                        return [4 /*yield*/, this.contentStrings.formErrorState.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).toPromise()];
                    case 5:
                        _e.required
                            = _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], AddEditAddressesComponent.prototype, "buildingsOnCampus", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], AddEditAddressesComponent.prototype, "editAddress", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], AddEditAddressesComponent.prototype, "isError", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], AddEditAddressesComponent.prototype, "defaultAddress", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], AddEditAddressesComponent.prototype, "onFormChanged", void 0);
    AddEditAddressesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-add-edit-addresses',
            template: __webpack_require__(/*! ./add-edit-addresses.component.html */ "./src/app/sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./add-edit-addresses.component.scss */ "./src/app/sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _sections_ordering_services__WEBPACK_IMPORTED_MODULE_5__["MerchantService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__["LoadingService"],
            _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_8__["OrderingService"],
            _core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_10__["ContentStringsFacadeService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_12__["SettingsFacadeService"]])
    ], AddEditAddressesComponent);
    return AddEditAddressesComponent;
}());

var ADD_EDIT_ADDRESS_CONTROL_NAMES;
(function (ADD_EDIT_ADDRESS_CONTROL_NAMES) {
    ADD_EDIT_ADDRESS_CONTROL_NAMES["campus"] = "campus";
    ADD_EDIT_ADDRESS_CONTROL_NAMES["address1"] = "address1";
    ADD_EDIT_ADDRESS_CONTROL_NAMES["address2"] = "address2";
    ADD_EDIT_ADDRESS_CONTROL_NAMES["city"] = "city";
    ADD_EDIT_ADDRESS_CONTROL_NAMES["state"] = "state";
    ADD_EDIT_ADDRESS_CONTROL_NAMES["nickname"] = "nickname";
    ADD_EDIT_ADDRESS_CONTROL_NAMES["default"] = "default";
    ADD_EDIT_ADDRESS_CONTROL_NAMES["buildings"] = "building";
    ADD_EDIT_ADDRESS_CONTROL_NAMES["room"] = "room";
})(ADD_EDIT_ADDRESS_CONTROL_NAMES || (ADD_EDIT_ADDRESS_CONTROL_NAMES = {}));
var CONTROL_ERROR = (_a = {},
    _a[ADD_EDIT_ADDRESS_CONTROL_NAMES.address1] = {
        required: 'You must enter an address.',
    },
    _a[ADD_EDIT_ADDRESS_CONTROL_NAMES.city] = {
        required: 'You must enter a city.',
    },
    _a[ADD_EDIT_ADDRESS_CONTROL_NAMES.state] = {
        required: 'You must choose a state.',
    },
    _a[ADD_EDIT_ADDRESS_CONTROL_NAMES.buildings] = {
        required: 'You must select a building.',
    },
    _a[ADD_EDIT_ADDRESS_CONTROL_NAMES.room] = {
        required: 'You must choose a room.',
    },
    _a);


/***/ }),

/***/ "./src/app/sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.modal.module.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.modal.module.ts ***!
  \**************************************************************************************************************/
/*! exports provided: AddEditAddressesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEditAddressesModule", function() { return AddEditAddressesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _add_edit_addresses_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./add-edit-addresses.component */ "./src/app/sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_ui_components_st_input_floating_label_st_input_floating_label_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/ui-components/st-input-floating-label/st-input-floating-label.module */ "./src/app/shared/ui-components/st-input-floating-label/st-input-floating-label.module.ts");
/* harmony import */ var _shared_ui_components_st_select_floating_label_st_select_floating_label_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/ui-components/st-select-floating-label/st-select-floating-label.module */ "./src/app/shared/ui-components/st-select-floating-label/st-select-floating-label.module.ts");








var declarations = [_add_edit_addresses_component__WEBPACK_IMPORTED_MODULE_4__["AddEditAddressesComponent"]];
var customModules = [_shared_ui_components_st_input_floating_label_st_input_floating_label_module__WEBPACK_IMPORTED_MODULE_6__["StInputFloatingLabelModule"], _shared_ui_components_st_select_floating_label_st_select_floating_label_module__WEBPACK_IMPORTED_MODULE_7__["StSelectFloatingLabelModule"]];
var AddEditAddressesModule = /** @class */ (function () {
    function AddEditAddressesModule() {
    }
    AddEditAddressesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            exports: [declarations],
            entryComponents: [declarations],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"]].concat(customModules),
        })
    ], AddEditAddressesModule);
    return AddEditAddressesModule;
}());



/***/ }),

/***/ "./src/app/shared/ui-components/st-input-floating-label/st-input-floating-label.module.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/shared/ui-components/st-input-floating-label/st-input-floating-label.module.ts ***!
  \************************************************************************************************/
/*! exports provided: StInputFloatingLabelModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StInputFloatingLabelModule", function() { return StInputFloatingLabelModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _st_input_floating_label_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./st-input-floating-label.component */ "./src/app/shared/ui-components/st-input-floating-label/st-input-floating-label.component.ts");




var declarations = [_st_input_floating_label_component__WEBPACK_IMPORTED_MODULE_3__["StInputFloatingLabelComponent"]];
var StInputFloatingLabelModule = /** @class */ (function () {
    function StInputFloatingLabelModule() {
    }
    StInputFloatingLabelModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: declarations
        })
    ], StInputFloatingLabelModule);
    return StInputFloatingLabelModule;
}());



/***/ }),

/***/ "./src/app/shared/ui-components/st-select-floating-label/st-select-floating-label.module.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/shared/ui-components/st-select-floating-label/st-select-floating-label.module.ts ***!
  \**************************************************************************************************/
/*! exports provided: StSelectFloatingLabelModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StSelectFloatingLabelModule", function() { return StSelectFloatingLabelModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _st_select_floating_label_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./st-select-floating-label.component */ "./src/app/shared/ui-components/st-select-floating-label/st-select-floating-label.component.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");





var declarations = [_st_select_floating_label_component__WEBPACK_IMPORTED_MODULE_3__["StSelectFloatingLabelComponent"]];
var StSelectFloatingLabelModule = /** @class */ (function () {
    function StSelectFloatingLabelModule() {
    }
    StSelectFloatingLabelModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"]
            ],
            exports: declarations
        })
    ], StSelectFloatingLabelModule);
    return StSelectFloatingLabelModule;
}());



/***/ })

}]);
//# sourceMappingURL=default~ordering-ordering-module~pages-address-edit-address-edit-module~pages-cart-cart-module~pages~2f9d709f.js.map