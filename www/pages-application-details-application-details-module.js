(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-application-details-application-details-module"],{

/***/ "./src/app/sections/housing/pages/application-details/application-details.module.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/sections/housing/pages/application-details/application-details.module.ts ***!
  \******************************************************************************************/
/*! exports provided: ApplicationDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationDetailsPageModule", function() { return ApplicationDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _application_details_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./application-details.routing.module */ "./src/app/sections/housing/pages/application-details/application-details.routing.module.ts");
/* harmony import */ var _questions_questions_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../questions/questions.module */ "./src/app/sections/housing/questions/questions.module.ts");
/* harmony import */ var _stepper_stepper_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../stepper/stepper.module */ "./src/app/sections/housing/stepper/stepper.module.ts");
/* harmony import */ var _application_details_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./application-details.page */ "./src/app/sections/housing/pages/application-details/application-details.page.ts");









var imports = [
    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
    _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
    _questions_questions_module__WEBPACK_IMPORTED_MODULE_6__["QuestionsModule"],
    _stepper_stepper_module__WEBPACK_IMPORTED_MODULE_7__["StepperModule"],
    _application_details_routing_module__WEBPACK_IMPORTED_MODULE_5__["ApplicationDetailsRoutingModule"],
];
var declarations = [_application_details_page__WEBPACK_IMPORTED_MODULE_8__["ApplicationDetailsPage"]];
var ApplicationDetailsPageModule = /** @class */ (function () {
    function ApplicationDetailsPageModule() {
    }
    ApplicationDetailsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: imports,
            declarations: declarations,
        })
    ], ApplicationDetailsPageModule);
    return ApplicationDetailsPageModule;
}());



/***/ }),

/***/ "./src/app/sections/housing/pages/application-details/application-details.page.html":
/*!******************************************************************************************!*\
  !*** ./src/app/sections/housing/pages/application-details/application-details.page.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content\r\n  class=\"ion-padding application-details__content\"\r\n  *ngIf=\"(applicationDetails$ | async) as applicationDetails\"\r\n  #content\r\n>\r\n  <div class=\"application-details__actions\">\r\n    <ion-button\r\n      class=\"btn application-details__page-back\"\r\n      [routerLink]=\"['/housing/dashboard']\"\r\n      routerDirection=\"back\"\r\n      mode=\"ios\"\r\n      fill=\"clear\"\r\n    >\r\n      Cancel\r\n    </ion-button>\r\n    <ion-button class=\"btn application-details__save\" mode=\"ios\" fill=\"clear\" (click)=\"save(applicationDetails)\">\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n\r\n  <h2 class=\"application-details__title\">{{ applicationDetails.applicationDefinition.applicationTitle }}</h2>\r\n\r\n  <div class=\"application-details__card\">\r\n    <st-stepper class=\"stepper--white\">\r\n      <st-step\r\n        *ngFor=\"let page of (pages$ | async); last as isLastPage; first as isFirstPage\"\r\n        [stepControl]=\"page.form\"\r\n      >\r\n        <form [formGroup]=\"page.form\" (ngSubmit)=\"submit(applicationDetails, page.form, isLastPage)\">\r\n          <ng-container *ngFor=\"let question of page.questions; first as isFirstQuestion\">\r\n            <st-question\r\n              *ngIf=\"question\"\r\n              [parentGroup]=\"page.form\"\r\n              [question]=\"question\"\r\n              [name]=\"$any(question).name\"\r\n              [class.question--first]=\"isFirstQuestion\"\r\n              [isSubmitted]=\"isSubmitted\"\r\n            ></st-question>\r\n          </ng-container>\r\n\r\n          <st-stepper-footer>\r\n            <ion-button\r\n              *ngIf=\"!isFirstPage\"\r\n              class=\"btn application-details__back\"\r\n              type=\"button\"\r\n              fill=\"clear\"\r\n              mode=\"ios\"\r\n              stepperBack\r\n              (back)=\"content.scrollToTop()\"\r\n              >Back</ion-button\r\n            >\r\n\r\n            <ion-button\r\n              class=\"btn application-details__next\"\r\n              [class.stepper-footer__button--right]=\"isFirstPage\"\r\n              mode=\"ios\"\r\n              fill=\"outline\"\r\n              type=\"submit\"\r\n              *ngIf=\"!isLastPage\"\r\n            >\r\n              Next\r\n            </ion-button>\r\n\r\n            <ion-button\r\n              class=\"btn application-details__submit\"\r\n              mode=\"ios\"\r\n              type=\"submit\"\r\n              *ngIf=\"isLastPage\"\r\n              [class.stepper-footer__button--right]=\"isFirstPage\"\r\n            >\r\n              Submit\r\n            </ion-button>\r\n          </st-stepper-footer>\r\n        </form>\r\n      </st-step>\r\n    </st-stepper>\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/sections/housing/pages/application-details/application-details.page.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/sections/housing/pages/application-details/application-details.page.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.application-details__content {\n  --background: #e6e9eb;\n  --padding-top: 8px;\n  --padding-start: 8px;\n  --padding-end: 8px; }\n.application-details__actions {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  margin-bottom: 15px; }\n.application-details__title {\n  font-family: \"Nunito Bold\", arial, sans-serif;\n  font-size: 20px;\n  color: #333;\n  text-align: center;\n  margin-top: 0;\n  margin-bottom: 10px; }\n.application-details__page-back {\n  font-family: \"Nunito Regular\", arial, sans-serif;\n  --color: rgba(0, 0, 0, 0.9); }\n.application-details__save {\n  font-family: \"Nunito Bold\", arial, sans-serif;\n  --color: #166dff; }\n.application-details__card {\n  background-color: #fff;\n  border-radius: 16px;\n  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.04), 0 2px 14px 0 rgba(0, 0, 0, 0.12);\n  padding: 16px; }\n.application-details__back {\n  font-family: \"Nunito Bold\", arial, sans-serif;\n  --color: #166dff;\n  min-width: 80px; }\n.application-details__next,\n.application-details__submit {\n  font-family: \"Nunito Bold\", arial, sans-serif;\n  --border-radius: 8px;\n  width: 150px;\n  font-size: 14px;\n  text-transform: uppercase; }\n.application-details__next {\n  --background-activated: #166dff;\n  --border-color: #166dff;\n  --border-width: 2px;\n  --color: #166dff; }\n.application-details__submit {\n  --background: #166dff; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvaG91c2luZy9wYWdlcy9hcHBsaWNhdGlvbi1kZXRhaWxzL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2hvdXNpbmcvcGFnZXMvYXBwbGljYXRpb24tZGV0YWlscy9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXGhvdXNpbmdcXHBhZ2VzXFxhcHBsaWNhdGlvbi1kZXRhaWxzXFxhcHBsaWNhdGlvbi1kZXRhaWxzLnBhZ2Uuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvaG91c2luZy9wYWdlcy9hcHBsaWNhdGlvbi1kZXRhaWxzL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDdEV6QjtFQUNFLHFCQUFhO0VBQ2Isa0JBQWM7RUFDZCxvQkFBZ0I7RUFDaEIsa0JBQWMsRUFBQTtBQUdoQjtFQUNFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHlCQUE4QjtVQUE5Qiw4QkFBOEI7RUFDOUIsbUJBQW1CLEVBQUE7QUFHckI7RUNWRSw2Q0Y0RWtEO0VDL0RsRCxlQUFlO0VBQ2YsV0R5RXNCO0VDeEV0QixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLG1CQUFtQixFQUFBO0FBR3JCO0VDcEJFLGdERjBFdUQ7RUNuRHZELDJCQUFRLEVBQUE7QUFHVjtFQzFCRSw2Q0Y0RWtEO0VDL0NsRCxnQkFBUSxFQUFBO0FBR1Y7RUFDRSxzQkQyRGdCO0VDMURoQixtQkFBbUI7RUFDbkIsMkVEMERnQjtFQ3pEaEIsYUFBYSxFQUFBO0FBR2Y7RUN2Q0UsNkNGNEVrRDtFQ2xDbEQsZ0JBQVE7RUFFUixlQUFlLEVBQUE7QUFHakI7O0VDL0NFLDZDRjRFa0Q7RUN6QmxELG9CQUFnQjtFQUNoQixZQUFZO0VBQ1osZUFBZTtFQUNmLHlCQUF5QixFQUFBO0FBRzNCO0VBQ0UsK0JBQXVCO0VBQ3ZCLHVCQUFlO0VBQ2YsbUJBQWU7RUFDZixnQkFBUSxFQUFBO0FBR1Y7RUFDRSxxQkFBYSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvaG91c2luZy9wYWdlcy9hcHBsaWNhdGlvbi1kZXRhaWxzL2FwcGxpY2F0aW9uLWRldGFpbHMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXHJcbjpyb290IHtcclxuICAvKiogcHJpbWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMDA1Y2I5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiAwLCA5MiwgMTg1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzAwNTFhMztcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XHJcblxyXG4gIC8qKiBzZWNvbmRhcnkgKiovXHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5OiAjMGNkMWU4O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDEyLCAyMDksIDIzMjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMwYmI4Y2M7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XHJcblxyXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2I6IDExMiwgNjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM2MzNjZTA7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcclxuXHJcbiAgLyoqIHN1Y2Nlc3MgKiovXHJcbiAgLS1pb24tY29sb3Itc3VjY2VzczogIzEwZGM2MDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcclxuXHJcbiAgLyoqIHdhcm5pbmcgKiovXHJcbiAgLS1pb24tY29sb3Itd2FybmluZzogI2ZmY2UwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAyMDYsIDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBiNTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcclxuXHJcbiAgLyoqIGRhbmdlciAqKi9cclxuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXJnYjogMjQ1LCA2MSwgNjE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlOiAjZDMzOTM5O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xyXG5cclxuICAvKiogZGFyayAqKi9cclxuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcclxuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XHJcblxyXG4gIC8qKiBtZWRpdW0gKiovXHJcbiAgLS1pb24tY29sb3ItbWVkaXVtOiAjOTg5YWEyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE1MiwgMTU0LCAxNjI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODY4ODhmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xyXG5cclxuICAvKiogbGlnaHQgKiovXHJcbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtcmdiOiAyNDQsIDI0NCwgMjQ0O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1zaGFkZTogI2Q3ZDhkYTtcclxuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xyXG5cclxuICAvLyAtLWlvbi1ncmlkLXdpZHRoLXNtOiAwcHg7XHJcbn1cclxuXHJcbi8vIEZPTlRTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJGZvbnQtbnVuaXRvLXJlZ3VsYXI6ICdOdW5pdG8gUmVndWxhcicsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8tc2VtaWJvbGQ6ICdOdW5pdG8gU2VtaUJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLWhlYXZ5OiAnTnVuaXRvIEJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuXHJcbi8vIENPTE9SU1xyXG5cclxuJGNvbG9yLXZlcnktbGlnaHQtZ3JheTogI2NjYztcclxuJGNvbG9yLWxpbmstd2F0ZXI6ICNkNGQ2ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZTllOWU5O1xyXG4kY29sb3ItZGFyay1ncmF5OiAjYWFhO1xyXG4kY29sb3ItZHVzdHktZ3JheTogIzk3OTc5NztcclxuJGNvbG9yLWRpbS1ncmF5OiAjNmU2ZTZlO1xyXG4kY29sb3Itc29saXR1ZGU6ICNFQ0YxRjg7XHJcbiRjb2xvci1uaWdodC1yaWRlcjogIzMzMztcclxuJGNvbG9yLW5hdnktYmx1ZTogIzAwNTZlNjtcclxuJGNvbG9yLWRlbmltOiAjMTM2MGUwO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWU6ICMxNjZkZmY7XHJcbiRjb2xvci1kb2RnZXItYmx1ZS1saWdodGVyOiAjMmQ3Y2ZmO1xyXG4kY29sb3Itd2hpdGU6ICNmZmY7XHJcbiRjb2xvci1ibGFjazogIzAwMDtcclxuJGNvbG9yLXdoaXRlLXNtb2tlOiAjZjNmM2YzO1xyXG4kY29sb3ItZGVlcC1za3ktYmx1ZTogIzAwYTBmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjOGJiN2ZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4OGM4ZmY7XHJcbiRjb2xvci1zdHJvbmctYmx1ZTogIzAwNDNiMztcclxuJGNvbG9yLWFsaWNlLWJsdWU6ICNmMGYzZjU7XHJcbiRjb2xvci1zaWx2ZXI6ICNjNGM0YzQ7XHJcbiRjb2xvci1tYXR0ZXJob3JuOiAjNTE1MTUxO1xyXG4kY29sb3ItdmVyeS1kYXJrLWdyYXk6ICM2MjYyNjI7XHJcbiRjb2xvci1tZXJjdXJ5OiAjZTdlN2U3O1xyXG4kY29sb3ItbGlnaHQtZ3JheTogI2Q4ZDhkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlYmViZWI7XHJcbiRjb2xvci1hbGl6YXJpbjogI2UyMjk0MjtcclxuJGNvbG9yLWZsYW1lLXJlZDogIzg4MTkyODtcclxuJGNvbG9yLWNoYXJjb2FsOiAjNDY0NjQ2O1xyXG4kY29sb3ItZGVlcC1zZWE6ICMxNDdkNjM7XHJcbiRjb2xvci1jYXJkaW5hbDogI2I1MjEzNTtcclxuJGNvbG9yLWdvZC1ncmF5OiAjMTYxNjE2O1xyXG4kY29sb3ItaG90LWN1cnJ5OiAjN2M1ZDIzO1xyXG4kY29sb3ItY2FzYWJsYW5jYTogI2Y3YmE0NTtcclxuJGNvbG9yLWFsYWJhc3RlcjogI2Y3ZjdmNztcclxuJHBvcmNlbGFpbjogI2U2ZTllYjtcclxuJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U6ICNEMDQzMUE7XHJcbiRjb2xvci1wYXR0ZW5zLWJsdWU6ICNlMGUzZTU7XHJcblxyXG4vLy8gU2l6ZVxyXG4kYm90dG9tLW5hdmlnYXRpb24tYmFyLWhlaWdodDogNTBweDtcclxuIiwiQGltcG9ydCAndG9vbHMnO1xyXG5cclxuLmFwcGxpY2F0aW9uLWRldGFpbHNfX2NvbnRlbnQge1xyXG4gIC0tYmFja2dyb3VuZDogI3skcG9yY2VsYWlufTtcclxuICAtLXBhZGRpbmctdG9wOiA4cHg7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XHJcbiAgLS1wYWRkaW5nLWVuZDogOHB4O1xyXG59XHJcblxyXG4uYXBwbGljYXRpb24tZGV0YWlsc19fYWN0aW9ucyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxufVxyXG5cclxuLmFwcGxpY2F0aW9uLWRldGFpbHNfX3RpdGxlIHtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8taGVhdnkpO1xyXG5cclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgY29sb3I6ICRjb2xvci1uaWdodC1yaWRlcjtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWFyZ2luLXRvcDogMDtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uYXBwbGljYXRpb24tZGV0YWlsc19fcGFnZS1iYWNrIHtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tcmVndWxhcik7XHJcblxyXG4gIC0tY29sb3I6ICN7cmdiYSgkY29sb3ItYmxhY2ssIDAuOSl9O1xyXG59XHJcblxyXG4uYXBwbGljYXRpb24tZGV0YWlsc19fc2F2ZSB7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxuXHJcbiAgLS1jb2xvcjogI3skY29sb3ItZG9kZ2VyLWJsdWV9O1xyXG59XHJcblxyXG4uYXBwbGljYXRpb24tZGV0YWlsc19fY2FyZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XHJcbiAgYm94LXNoYWRvdzogMCAwIDRweCAwIHJnYmEoJGNvbG9yLWJsYWNrLCAwLjA0KSwgMCAycHggMTRweCAwIHJnYmEoJGNvbG9yLWJsYWNrLCAwLjEyKTtcclxuICBwYWRkaW5nOiAxNnB4O1xyXG59XHJcblxyXG4uYXBwbGljYXRpb24tZGV0YWlsc19fYmFjayB7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxuXHJcbiAgLS1jb2xvcjogI3skY29sb3ItZG9kZ2VyLWJsdWV9O1xyXG5cclxuICBtaW4td2lkdGg6IDgwcHg7XHJcbn1cclxuXHJcbi5hcHBsaWNhdGlvbi1kZXRhaWxzX19uZXh0LFxyXG4uYXBwbGljYXRpb24tZGV0YWlsc19fc3VibWl0IHtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8taGVhdnkpO1xyXG5cclxuICAtLWJvcmRlci1yYWRpdXM6IDhweDtcclxuICB3aWR0aDogMTUwcHg7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbn1cclxuXHJcbi5hcHBsaWNhdGlvbi1kZXRhaWxzX19uZXh0IHtcclxuICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiAjeyRjb2xvci1kb2RnZXItYmx1ZX07XHJcbiAgLS1ib3JkZXItY29sb3I6ICN7JGNvbG9yLWRvZGdlci1ibHVlfTtcclxuICAtLWJvcmRlci13aWR0aDogMnB4O1xyXG4gIC0tY29sb3I6ICN7JGNvbG9yLWRvZGdlci1ibHVlfTtcclxufVxyXG5cclxuLmFwcGxpY2F0aW9uLWRldGFpbHNfX3N1Ym1pdCB7XHJcbiAgLS1iYWNrZ3JvdW5kOiAjeyRjb2xvci1kb2RnZXItYmx1ZX07XHJcbn1cclxuIiwiQG1peGluIGZvbnQtc2l6ZSgkZm9udC1zaXplKSB7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1mYW1pbHkoJGZvbnQtZmFtaWx5KSB7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXJlZ3VsYXIoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tcmVndWxhcik7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1zZW1pYm9sZCgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1zZW1pYm9sZCk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1oZWF2eSgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1oZWF2eSk7XHJcbn1cclxuXHJcbkBtaXhpbiBsaW5rLWNvbG9yKCRjb2xvcikge1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcblxyXG4gICY6bGluayxcclxuICAmOnZpc2l0ZWQsXHJcbiAgJjpmb2N1cyxcclxuICAmOmhvdmVyLFxyXG4gICY6YWN0aXZlIHtcclxuICAgIGNvbG9yOiAkY29sb3I7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gaG92ZXIge1xyXG4gICY6aG92ZXIsXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBkaXNhYmxlZCB7XHJcbiAgJi5kaXNhYmxlZCxcclxuICAmLmRpc2FibGVkOmZvY3VzLFxyXG4gICYuZGlzYWJsZWQ6aG92ZXIsXHJcbiAgJltkaXNhYmxlZF0sXHJcbiAgJltkaXNhYmxlZF06Zm9jdXMsXHJcbiAgJltkaXNhYmxlZF06aG92ZXIge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZWxsaXBzaXMge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxuQG1peGluIGZsb2F0aW5nLWxhYmVsKCRjb2xvcikge1xyXG4gIGZvbnQtc2l6ZTogNzUlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTUlLCAtNTAlLCAwKTtcclxuICBvcGFjaXR5OiAxO1xyXG4gIGJhY2tncm91bmQ6ICRjb2xvci13aGl0ZTtcclxuICBwYWRkaW5nOiAwIDNweDtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLnN2ZycpO1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgd2lkdGg6IDE0cHg7XHJcbiAgICBoZWlnaHQ6IDlweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgei1pbmRleDogMTtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tYWN0aXZlKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tYWN0aXZlLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWVycm9yKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tZXJyb3Iuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/sections/housing/pages/application-details/application-details.page.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/housing/pages/application-details/application-details.page.ts ***!
  \****************************************************************************************/
/*! exports provided: ApplicationDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationDetailsPage", function() { return ApplicationDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _applications_applications_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../applications/applications.service */ "./src/app/sections/housing/applications/applications.service.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _housing_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../housing.service */ "./src/app/sections/housing/housing.service.ts");
/* harmony import */ var _stepper_stepper_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../stepper/stepper.component */ "./src/app/sections/housing/stepper/stepper.component.ts");
/* harmony import */ var _questions_question_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../questions/question.component */ "./src/app/sections/housing/questions/question.component.ts");
/* harmony import */ var _applications_applications_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../applications/applications.model */ "./src/app/sections/housing/applications/applications.model.ts");












var ApplicationDetailsPage = /** @class */ (function () {
    function ApplicationDetailsPage(_route, _applicationsService, _router, _toastController, _loadingService, _housingService) {
        this._route = _route;
        this._applicationsService = _applicationsService;
        this._router = _router;
        this._toastController = _toastController;
        this._loadingService = _loadingService;
        this._housingService = _housingService;
        this._subscription = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subscription"]();
    }
    ApplicationDetailsPage.prototype.ngOnInit = function () {
        this.applicationKey = parseInt(this._route.snapshot.paramMap.get('applicationKey'), 10);
        this._initApplicationDetailsObservable();
        this._initPagesObservable();
    };
    ApplicationDetailsPage.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    ApplicationDetailsPage.prototype.save = function (applicationDetails) {
        this._touch();
        var selectedStep = this.stepper.selected;
        var formValue = selectedStep.stepControl.value;
        this._update('save', this.applicationKey, applicationDetails, formValue);
        return false;
    };
    ApplicationDetailsPage.prototype.submit = function (applicationDetails, form, isLastPage) {
        this._touch();
        if (!this.isSubmitted && !form.valid) {
            return;
        }
        if (!isLastPage) {
            this._next(applicationDetails, form.value);
        }
        else {
            this._update('submit', this.applicationKey, applicationDetails, form.value);
        }
    };
    ApplicationDetailsPage.prototype._touch = function () {
        this.questions.forEach(function (question) { return question.touch(); });
    };
    ApplicationDetailsPage.prototype._update = function (type, applicationKey, applicationDetails, formValue) {
        var _this = this;
        this._loadingService.showSpinner();
        var subscription = this._applicationsService[type + "Application"](applicationKey, applicationDetails, formValue, this.isSubmitted).subscribe({
            next: function () { return _this._handleSuccess(); },
            error: function (error) { return _this._handleErrors(error); },
        });
        this._subscription.add(subscription);
    };
    ApplicationDetailsPage.prototype._initApplicationDetailsObservable = function () {
        var _this = this;
        this._loadingService.showSpinner();
        this.applicationDetails$ = this._housingService.getApplicationDetails(this.applicationKey).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (applicationDetails) {
            var patronApplication = applicationDetails.patronApplication;
            var status = patronApplication && patronApplication.status;
            _this.isSubmitted = status === _applications_applications_model__WEBPACK_IMPORTED_MODULE_11__["ApplicationStatus"].Submitted;
            _this._loadingService.closeSpinner();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function (error) {
            _this._loadingService.closeSpinner();
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])(error);
        }));
    };
    ApplicationDetailsPage.prototype._initPagesObservable = function () {
        this.pages$ = this._applicationsService.getQuestions(this.applicationKey);
    };
    ApplicationDetailsPage.prototype._next = function (applicationDetails, formValue) {
        var _this = this;
        if (this.isSubmitted) {
            return this.stepper.next();
        }
        var nextSubscription = this._applicationsService
            .next(this.applicationKey, applicationDetails, formValue)
            .subscribe({
            next: function () { return _this.stepper.next(); },
        });
        this._subscription.add(nextSubscription);
    };
    ApplicationDetailsPage.prototype._handleSuccess = function () {
        this._housingService.handleSuccess();
    };
    ApplicationDetailsPage.prototype._handleErrors = function (error) {
        this._housingService.handleErrors(error);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_stepper_stepper_component__WEBPACK_IMPORTED_MODULE_9__["StepperComponent"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _stepper_stepper_component__WEBPACK_IMPORTED_MODULE_9__["StepperComponent"])
    ], ApplicationDetailsPage.prototype, "stepper", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChildren"])(_questions_question_component__WEBPACK_IMPORTED_MODULE_10__["QuestionComponent"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"])
    ], ApplicationDetailsPage.prototype, "questions", void 0);
    ApplicationDetailsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-application-details',
            template: __webpack_require__(/*! ./application-details.page.html */ "./src/app/sections/housing/pages/application-details/application-details.page.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./application-details.page.scss */ "./src/app/sections/housing/pages/application-details/application-details.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _applications_applications_service__WEBPACK_IMPORTED_MODULE_6__["ApplicationsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__["LoadingService"],
            _housing_service__WEBPACK_IMPORTED_MODULE_8__["HousingService"]])
    ], ApplicationDetailsPage);
    return ApplicationDetailsPage;
}());



/***/ }),

/***/ "./src/app/sections/housing/pages/application-details/application-details.routing.module.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/sections/housing/pages/application-details/application-details.routing.module.ts ***!
  \**************************************************************************************************/
/*! exports provided: ApplicationDetailsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationDetailsRoutingModule", function() { return ApplicationDetailsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _application_details_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./application-details.page */ "./src/app/sections/housing/pages/application-details/application-details.page.ts");




var routes = [{ path: '', component: _application_details_page__WEBPACK_IMPORTED_MODULE_3__["ApplicationDetailsPage"] }];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var ApplicationDetailsRoutingModule = /** @class */ (function () {
    function ApplicationDetailsRoutingModule() {
    }
    ApplicationDetailsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: imports,
            exports: exports,
        })
    ], ApplicationDetailsRoutingModule);
    return ApplicationDetailsRoutingModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-application-details-application-details-module.js.map