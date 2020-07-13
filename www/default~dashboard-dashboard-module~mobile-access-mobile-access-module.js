(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~dashboard-dashboard-module~mobile-access-mobile-access-module"],{

/***/ "./src/app/sections/mobile-access/activate-location/activate-location.component.html":
/*!*******************************************************************************************!*\
  !*** ./src/app/sections/mobile-access/activate-location/activate-location.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-header\r\n  [title]=\"contentString.headerTitleActivate\"\r\n  [backButtonTitle]=\"contentString.backBtnHeader\"\r\n  [isToolbarShow]=\"true\"\r\n  [isTitleShow]=\"true\"\r\n></st-header>\r\n<ion-content class=\"ion-padding\">\r\n  <st-activate-location-item\r\n    [userPhoto]=\"userPhoto$ | async\"\r\n    [userFullName]=\"userFullName$ | async\"\r\n    [userInfoId]=\"userInfoId$ | async\"\r\n    [institutionName]=\"(institution$ | async).name\"\r\n    [institutionPhoto]=\"institutionPhoto$ | async\"\r\n    [institutionColor]=\"institutionColor$ | async\"\r\n  >\r\n    <p class=\"user-data__location\">\r\n      <span [ngClass]=\"starClass | async\" aria-label=\"star\" role=\"img\" (click)=\"favouriteHandler()\"></span>\r\n      {{ (location$ | async)?.locationId }} - {{ (location$ | async)?.name }}\r\n    </p>\r\n    <div class=\"user-data__activate-btn-wrapper\">\r\n      <st-button \r\n        (onClick)=\"activateLocation()\"\r\n        [buttonModifier]=\"'border-less'\">\r\n        {{ contentString.activate }}\r\n      </st-button>\r\n    </div>\r\n  </st-activate-location-item>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/sections/mobile-access/activate-location/activate-location.component.scss":
/*!*******************************************************************************************!*\
  !*** ./src/app/sections/mobile-access/activate-location/activate-location.component.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n:host {\n  --ion-background-color: $color-very-light-gray;\n  --ion-color-primary: $color-black; }\n:host ion-card-header {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-align: center;\n            align-items: center;\n    padding: 10px 20px; }\n:host ion-content {\n    background: #ccc;\n    height: 100%; }\n.user-data__location-star {\n  display: inline-block;\n  width: 30px;\n  height: 30px;\n  position: relative;\n  top: 5px;\n  background-image: url(\"/assets/icon/star-outline-white.svg\");\n  background-position: center;\n  background-size: contain; }\n.user-data__location-star--active {\n    background-image: url(\"/assets/icon/star-white.svg\"); }\n.user-data__location {\n  position: relative;\n  text-align: center;\n  color: #fff;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 18px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.user-data__activate-btn-wrapper {\n  margin-top: 20px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvbW9iaWxlLWFjY2Vzcy9hY3RpdmF0ZS1sb2NhdGlvbi9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX3ZhcmlhYmxlcy5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9tb2JpbGUtYWNjZXNzL2FjdGl2YXRlLWxvY2F0aW9uL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcYXBwXFxzZWN0aW9uc1xcbW9iaWxlLWFjY2Vzc1xcYWN0aXZhdGUtbG9jYXRpb25cXGFjdGl2YXRlLWxvY2F0aW9uLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9tb2JpbGUtYWNjZXNzL2FjdGl2YXRlLWxvY2F0aW9uL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDdEV6QjtFQUNFLDhDQUF1QjtFQUN2QixpQ0FBb0IsRUFBQTtBQUZ0QjtJQUtJLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHlCQUFtQjtZQUFuQixtQkFBbUI7SUFDbkIsa0JBQWtCLEVBQUE7QUFQdEI7SUFXSSxnQkR3RXdCO0lDdkV4QixZQUFZLEVBQUE7QUFLZDtFQUNFLHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsNERBQTREO0VBQzVELDJCQUEyQjtFQUMzQix3QkFBd0IsRUFBQTtBQUV4QjtJQUNFLG9EQUFvRCxFQUFBO0FBSXhEO0VBQ0Usa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixXRDREYztFRTNDaEIsZ0JBQWdCO0VBQ2hCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUF2RG5CLGVEdUNpQztFQ25DakMsNkNGNEVrRCxFQUFBO0FDdENsRDtFQUNFLGdCQUFnQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvbW9iaWxlLWFjY2Vzcy9hY3RpdmF0ZS1sb2NhdGlvbi9hY3RpdmF0ZS1sb2NhdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBJb25pYyBDU1MgVmFyaWFibGVzICoqL1xyXG46cm9vdCB7XHJcbiAgLyoqIHByaW1hcnkgKiovXHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeTogIzAwNWNiOTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXJnYjogMCwgOTIsIDE4NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGU6ICMwMDUxYTM7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS10aW50OiAjMWE2Y2MwO1xyXG5cclxuICAvKiogc2Vjb25kYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeTogIzBjZDFlODtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktcmdiOiAxMiwgMjA5LCAyMzI7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXNoYWRlOiAjMGJiOGNjO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS10aW50OiAjMjRkNmVhO1xyXG5cclxuICAvKiogdGVydGlhcnkgKiovXHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnk6ICM3MDQ0ZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktcmdiOiAxMTIsIDY4LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXNoYWRlOiAjNjMzY2UwO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXRpbnQ6ICM3ZTU3ZmY7XHJcblxyXG4gIC8qKiBzdWNjZXNzICoqL1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3M6ICMxMGRjNjA7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2I6IDE2LCAyMjAsIDk2O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZTogIzBlYzI1NDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXRpbnQ6ICMyOGUwNzA7XHJcblxyXG4gIC8qKiB3YXJuaW5nICoqL1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmc6ICNmZmNlMDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1yZ2I6IDI1NSwgMjA2LCAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1zaGFkZTogI2UwYjUwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXRpbnQ6ICNmZmQzMWE7XHJcblxyXG4gIC8qKiBkYW5nZXIgKiovXHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyOiAjZjA0MTQxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1yZ2I6IDI0NSwgNjEsIDYxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1zaGFkZTogI2QzMzkzOTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItdGludDogI2YyNTQ1NDtcclxuXHJcbiAgLyoqIGRhcmsgKiovXHJcbiAgLS1pb24tY29sb3ItZGFyazogIzIyMjQyODtcclxuICAtLWlvbi1jb2xvci1kYXJrLXJnYjogMzQsIDM0LCAzNDtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstc2hhZGU6ICMxZTIwMjM7XHJcbiAgLS1pb24tY29sb3ItZGFyay10aW50OiAjMzgzYTNlO1xyXG5cclxuICAvKiogbWVkaXVtICoqL1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bTogIzk4OWFhMjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tcmdiOiAxNTIsIDE1NCwgMTYyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZTogIzg2ODg4ZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tdGludDogI2EyYTRhYjtcclxuXHJcbiAgLyoqIGxpZ2h0ICoqL1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0OiAjZjRmNWY4O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXJnYjogMjQ0LCAyNDQsIDI0NDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdDogIzAwMDAwMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdC1yZ2I6IDAsIDAsIDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtc2hhZGU6ICNkN2Q4ZGE7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtdGludDogI2Y1ZjZmOTtcclxuXHJcbiAgLy8gLS1pb24tZ3JpZC13aWR0aC1zbTogMHB4O1xyXG59XHJcblxyXG4vLyBGT05UU1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiRmb250LW51bml0by1yZWd1bGFyOiAnTnVuaXRvIFJlZ3VsYXInLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLXNlbWlib2xkOiAnTnVuaXRvIFNlbWlCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1oZWF2eTogJ051bml0byBCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcblxyXG4vLyBDT0xPUlNcclxuXHJcbiRjb2xvci12ZXJ5LWxpZ2h0LWdyYXk6ICNjY2M7XHJcbiRjb2xvci1saW5rLXdhdGVyOiAjZDRkNmQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2U5ZTllOTtcclxuJGNvbG9yLWRhcmstZ3JheTogI2FhYTtcclxuJGNvbG9yLWR1c3R5LWdyYXk6ICM5Nzk3OTc7XHJcbiRjb2xvci1kaW0tZ3JheTogIzZlNmU2ZTtcclxuJGNvbG9yLXNvbGl0dWRlOiAjRUNGMUY4O1xyXG4kY29sb3ItbmlnaHQtcmlkZXI6ICMzMzM7XHJcbiRjb2xvci1uYXZ5LWJsdWU6ICMwMDU2ZTY7XHJcbiRjb2xvci1kZW5pbTogIzEzNjBlMDtcclxuJGNvbG9yLWRvZGdlci1ibHVlOiAjMTY2ZGZmO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWUtbGlnaHRlcjogIzJkN2NmZjtcclxuJGNvbG9yLXdoaXRlOiAjZmZmO1xyXG4kY29sb3ItYmxhY2s6ICMwMDA7XHJcbiRjb2xvci13aGl0ZS1zbW9rZTogI2YzZjNmMztcclxuJGNvbG9yLWRlZXAtc2t5LWJsdWU6ICMwMGEwZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzhiYjdmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjODhjOGZmO1xyXG4kY29sb3Itc3Ryb25nLWJsdWU6ICMwMDQzYjM7XHJcbiRjb2xvci1hbGljZS1ibHVlOiAjZjBmM2Y1O1xyXG4kY29sb3Itc2lsdmVyOiAjYzRjNGM0O1xyXG4kY29sb3ItbWF0dGVyaG9ybjogIzUxNTE1MTtcclxuJGNvbG9yLXZlcnktZGFyay1ncmF5OiAjNjI2MjYyO1xyXG4kY29sb3ItbWVyY3VyeTogI2U3ZTdlNztcclxuJGNvbG9yLWxpZ2h0LWdyYXk6ICNkOGQ4ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZWJlYmViO1xyXG4kY29sb3ItYWxpemFyaW46ICNlMjI5NDI7XHJcbiRjb2xvci1mbGFtZS1yZWQ6ICM4ODE5Mjg7XHJcbiRjb2xvci1jaGFyY29hbDogIzQ2NDY0NjtcclxuJGNvbG9yLWRlZXAtc2VhOiAjMTQ3ZDYzO1xyXG4kY29sb3ItY2FyZGluYWw6ICNiNTIxMzU7XHJcbiRjb2xvci1nb2QtZ3JheTogIzE2MTYxNjtcclxuJGNvbG9yLWhvdC1jdXJyeTogIzdjNWQyMztcclxuJGNvbG9yLWNhc2FibGFuY2E6ICNmN2JhNDU7XHJcbiRjb2xvci1hbGFiYXN0ZXI6ICNmN2Y3Zjc7XHJcbiRwb3JjZWxhaW46ICNlNmU5ZWI7XHJcbiRjb2xvci1oYXJsZXktZGF2aWRzb24tb3JhbmdlOiAjRDA0MzFBO1xyXG4kY29sb3ItcGF0dGVucy1ibHVlOiAjZTBlM2U1O1xyXG5cclxuLy8vIFNpemVcclxuJGJvdHRvbS1uYXZpZ2F0aW9uLWJhci1oZWlnaHQ6IDUwcHg7XHJcbiIsIkBpbXBvcnQgJ3Rvb2xzJztcclxuXHJcbjpob3N0IHtcclxuICAtLWlvbi1iYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItdmVyeS1saWdodC1ncmF5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICRjb2xvci1ibGFjaztcclxuXHJcbiAgaW9uLWNhcmQtaGVhZGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gIH1cclxuXHJcbiAgaW9uLWNvbnRlbnQge1xyXG4gICAgYmFja2dyb3VuZDogJGNvbG9yLXZlcnktbGlnaHQtZ3JheTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICB9XHJcbn1cclxuXHJcbi51c2VyLWRhdGEge1xyXG4gICZfX2xvY2F0aW9uLXN0YXIge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgd2lkdGg6IDMwcHg7XHJcbiAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB0b3A6IDVweDtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL3N0YXItb3V0bGluZS13aGl0ZS5zdmcnKTtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcclxuXHJcbiAgICAmLS1hY3RpdmUge1xyXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9zdGFyLXdoaXRlLnN2ZycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJl9fbG9jYXRpb24ge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6ICRjb2xvci13aGl0ZTtcclxuXHJcbiAgICBAaW5jbHVkZSBlbGxpcHNpcztcclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDE4cHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fYWN0aXZhdGUtYnRuLXdyYXBwZXIge1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxuICB9XHJcbn1cclxuIiwiQG1peGluIGZvbnQtc2l6ZSgkZm9udC1zaXplKSB7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1mYW1pbHkoJGZvbnQtZmFtaWx5KSB7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXJlZ3VsYXIoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tcmVndWxhcik7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1zZW1pYm9sZCgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1zZW1pYm9sZCk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1oZWF2eSgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1oZWF2eSk7XHJcbn1cclxuXHJcbkBtaXhpbiBsaW5rLWNvbG9yKCRjb2xvcikge1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcblxyXG4gICY6bGluayxcclxuICAmOnZpc2l0ZWQsXHJcbiAgJjpmb2N1cyxcclxuICAmOmhvdmVyLFxyXG4gICY6YWN0aXZlIHtcclxuICAgIGNvbG9yOiAkY29sb3I7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gaG92ZXIge1xyXG4gICY6aG92ZXIsXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBkaXNhYmxlZCB7XHJcbiAgJi5kaXNhYmxlZCxcclxuICAmLmRpc2FibGVkOmZvY3VzLFxyXG4gICYuZGlzYWJsZWQ6aG92ZXIsXHJcbiAgJltkaXNhYmxlZF0sXHJcbiAgJltkaXNhYmxlZF06Zm9jdXMsXHJcbiAgJltkaXNhYmxlZF06aG92ZXIge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZWxsaXBzaXMge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxuQG1peGluIGZsb2F0aW5nLWxhYmVsKCRjb2xvcikge1xyXG4gIGZvbnQtc2l6ZTogNzUlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTUlLCAtNTAlLCAwKTtcclxuICBvcGFjaXR5OiAxO1xyXG4gIGJhY2tncm91bmQ6ICRjb2xvci13aGl0ZTtcclxuICBwYWRkaW5nOiAwIDNweDtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLnN2ZycpO1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgd2lkdGg6IDE0cHg7XHJcbiAgICBoZWlnaHQ6IDlweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgei1pbmRleDogMTtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tYWN0aXZlKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tYWN0aXZlLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWVycm9yKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tZXJyb3Iuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/sections/mobile-access/activate-location/activate-location.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/sections/mobile-access/activate-location/activate-location.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: ActivateLocationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivateLocationComponent", function() { return ActivateLocationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../service */ "./src/app/sections/mobile-access/service/index.ts");
/* harmony import */ var _sections_mobile_access_mobile_access_popover__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sections/mobile-access/mobile-access-popover */ "./src/app/sections/mobile-access/mobile-access-popover/index.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _mobile_acces_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../mobile-acces.config */ "./src/app/sections/mobile-access/mobile-acces.config.ts");
/* harmony import */ var _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var src_app_app_global__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/app.global */ "./src/app/app.global.ts");
/* harmony import */ var _core_service_commerce_commerce_api_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @core/service/commerce/commerce-api.service */ "./src/app/core/service/commerce/commerce-api.service.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_facades_institution_institution_facade_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @core/facades/institution/institution.facade.service */ "./src/app/core/facades/institution/institution.facade.service.ts");
















var ActivateLocationComponent = /** @class */ (function () {
    function ActivateLocationComponent(routerLink, mobileAccessService, popoverCtrl, toastController, nav2, institutionFacadeService, loading, sanitizer, commerceApiService, userFacadeService) {
        this.routerLink = routerLink;
        this.mobileAccessService = mobileAccessService;
        this.popoverCtrl = popoverCtrl;
        this.toastController = toastController;
        this.nav2 = nav2;
        this.institutionFacadeService = institutionFacadeService;
        this.loading = loading;
        this.sanitizer = sanitizer;
        this.commerceApiService = commerceApiService;
        this.userFacadeService = userFacadeService;
        this.toastDuration = 6000;
        this.sourceSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subscription"]();
        this.photo = null;
    }
    Object.defineProperty(ActivateLocationComponent.prototype, "userFullName$", {
        get: function () {
            return this.userFacadeService
                .getUserData$()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
                var firstName = _a.firstName, middleName = _a.middleName, lastName = _a.lastName;
                return (firstName || '') + " " + (middleName || '') + " " + (lastName || '');
            }));
        },
        enumerable: true,
        configurable: true
    });
    ActivateLocationComponent.prototype.ngOnDestroy = function () {
        this.sourceSubscription.unsubscribe();
    };
    Object.defineProperty(ActivateLocationComponent.prototype, "starClass", {
        get: function () {
            var baseClass = 'user-data__location-star';
            var active = baseClass + " " + baseClass + "--active";
            return this.location$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
                var isFavourite = _a.isFavourite;
                return "" + (isFavourite ? active : baseClass);
            }));
        },
        enumerable: true,
        configurable: true
    });
    ActivateLocationComponent.prototype.ngOnInit = function () {
        this.setContentStrings();
        this.locationId = this.routerLink.snapshot.params.id;
        this.location$ = this.mobileAccessService.getLocationById(this.locationId);
        this.setUserPhoto();
        this.setInstitutionPhoto();
        this.setInstitutionColor();
        this.userInfoId$ = this.commerceApiService.getCashlessUserId();
    };
    ActivateLocationComponent.prototype.activateLocation = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var subscription;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loading.showSpinner(this.contentString.activateLocationLoader)];
                    case 1:
                        _a.sent();
                        subscription = this.mobileAccessService.activateMobileLocation(this.locationId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (res) { return _this.loading.closeSpinner().then(function () { return _this.modalHandler(res); }); }, function () {
                            _this.loading.closeSpinner().then(function () { return _this.presentToast(_this.contentString.errorResponseActivateLocation); });
                        });
                        this.sourceSubscription.add(subscription);
                        return [2 /*return*/];
                }
            });
        });
    };
    ActivateLocationComponent.prototype.favouriteHandler = function () {
        this.mobileAccessService
            .updateFavouritesList(this.locationId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))
            .subscribe();
    };
    ActivateLocationComponent.prototype.modalHandler = function (res) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var popover;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: _sections_mobile_access_mobile_access_popover__WEBPACK_IMPORTED_MODULE_7__["MobileAccessPopoverComponent"],
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
                            if (role === _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_10__["BUTTON_TYPE"].OKAY) {
                                _this.nav2.navigateBack("/" + src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["PATRON_NAVIGATION"].mobileAccess);
                            }
                            if (role === _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_10__["BUTTON_TYPE"].RETRY) {
                                _this.activateLocation();
                            }
                        });
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ActivateLocationComponent.prototype.presentToast = function (message) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: this.toastDuration,
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ActivateLocationComponent.prototype.setInstitutionPhoto = function () {
        var _this = this;
        this.institution$ = this.institutionFacadeService.cachedInstitutionInfo$;
        this.institutionPhoto$ = this.institutionFacadeService.cachedInstitutionPhoto$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["skipWhile"])(function (d) { return !d || d === null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var data = _a.data, mimeType = _a.mimeType;
            return "data:" + mimeType + ";base64," + data;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) { return _this.sanitizer.bypassSecurityTrustResourceUrl(response); }));
    };
    ActivateLocationComponent.prototype.setContentStrings = function () {
        var activate = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STRINGS"].activateBtn);
        var header = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STRINGS"].headerTitle);
        var activateLocationLoader = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STRINGS"].activateLocationLoader);
        var errorResponseActivateLocation = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STRINGS"].errorResponseActivateLocation);
        var headerTitleActivate = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STRINGS"].headerTitleActivate);
        var backBtnHeader = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STRINGS"].backBtnHeader);
        this.contentString = {
            activate: activate,
            header: header,
            activateLocationLoader: activateLocationLoader,
            errorResponseActivateLocation: errorResponseActivateLocation,
            headerTitleActivate: headerTitleActivate,
            backBtnHeader: backBtnHeader,
        };
    };
    ActivateLocationComponent.prototype.setUserPhoto = function () {
        this.userPhoto$ = this.userFacadeService.getAcceptedPhoto$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var data = _a.data, mimeType = _a.mimeType;
            return "data:" + mimeType + ";base64," + data;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1));
    };
    ActivateLocationComponent.prototype.setInstitutionColor = function () {
        this.institutionColor$ = this.mobileAccessService
            .getInstitutionColor()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (v) { return '#' + JSON.parse(v)['native-header-bg']; }));
    };
    ActivateLocationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-activate-location',
            template: __webpack_require__(/*! ./activate-location.component.html */ "./src/app/sections/mobile-access/activate-location/activate-location.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./activate-location.component.scss */ "./src/app/sections/mobile-access/activate-location/activate-location.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _service__WEBPACK_IMPORTED_MODULE_6__["MobileAccessService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["PopoverController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"],
            _core_facades_institution_institution_facade_service__WEBPACK_IMPORTED_MODULE_15__["InstitutionFacadeService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_8__["LoadingService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__["DomSanitizer"],
            _core_service_commerce_commerce_api_service__WEBPACK_IMPORTED_MODULE_13__["CommerceApiService"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_14__["UserFacadeService"]])
    ], ActivateLocationComponent);
    return ActivateLocationComponent;
}());



/***/ }),

/***/ "./src/app/sections/mobile-access/activate-location/index.ts":
/*!*******************************************************************!*\
  !*** ./src/app/sections/mobile-access/activate-location/index.ts ***!
  \*******************************************************************/
/*! exports provided: ActivateLocationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _activate_location_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./activate-location.component */ "./src/app/sections/mobile-access/activate-location/activate-location.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ActivateLocationComponent", function() { return _activate_location_component__WEBPACK_IMPORTED_MODULE_0__["ActivateLocationComponent"]; });




/***/ }),

/***/ "./src/app/sections/mobile-access/location-list/index.ts":
/*!***************************************************************!*\
  !*** ./src/app/sections/mobile-access/location-list/index.ts ***!
  \***************************************************************/
/*! exports provided: LocationListComponent, LocationItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _location_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./location-item */ "./src/app/sections/mobile-access/location-list/location-item/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocationItemComponent", function() { return _location_item__WEBPACK_IMPORTED_MODULE_0__["LocationItemComponent"]; });

/* harmony import */ var _location_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./location-list.component */ "./src/app/sections/mobile-access/location-list/location-list.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocationListComponent", function() { return _location_list_component__WEBPACK_IMPORTED_MODULE_1__["LocationListComponent"]; });





/***/ }),

/***/ "./src/app/sections/mobile-access/location-list/location-item/index.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/sections/mobile-access/location-list/location-item/index.ts ***!
  \*****************************************************************************/
/*! exports provided: LocationItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _location_item_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./location-item.component */ "./src/app/sections/mobile-access/location-list/location-item/location-item.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocationItemComponent", function() { return _location_item_component__WEBPACK_IMPORTED_MODULE_0__["LocationItemComponent"]; });




/***/ }),

/***/ "./src/app/sections/mobile-access/location-list/location-item/location-item.component.html":
/*!*************************************************************************************************!*\
  !*** ./src/app/sections/mobile-access/location-list/location-item/location-item.component.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-item detail (click)=\"openLocation()\" button=\"true\">\r\n  <img\r\n    class=\"location__fav\"\r\n    [src]=\"starClass\"\r\n    width=\"25px\"\r\n    alt=\"star\"\r\n    appClickStopPropagation\r\n    (click)=\"triggerFavourite()\"\r\n  />\r\n  <ion-label class=\"st-label\">\r\n    <h3 class=\"title\">{{ location.locationId }} - {{ location.name }}</h3>\r\n    <p class=\"sub-title\" *ngIf=\"location.distance\">{{ location.distance | metersToMiles }}</p>\r\n  </ion-label>\r\n</ion-item>\r\n"

/***/ }),

/***/ "./src/app/sections/mobile-access/location-list/location-item/location-item.component.scss":
/*!*************************************************************************************************!*\
  !*** ./src/app/sections/mobile-access/location-list/location-item/location-item.component.scss ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n:host .st-label {\n  margin: 0; }\n:host .st-label .title {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n:host .st-label .sub-title {\n    margin-top: -5px;\n    font-size: 10px;\n    font-family: \"Nunito Regular\", arial, sans-serif; }\n.location__fav {\n  margin-right: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvbW9iaWxlLWFjY2Vzcy9sb2NhdGlvbi1saXN0L2xvY2F0aW9uLWl0ZW0vQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvbW9iaWxlLWFjY2Vzcy9sb2NhdGlvbi1saXN0L2xvY2F0aW9uLWl0ZW0vQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxhcHBcXHNlY3Rpb25zXFxtb2JpbGUtYWNjZXNzXFxsb2NhdGlvbi1saXN0XFxsb2NhdGlvbi1pdGVtXFxsb2NhdGlvbi1pdGVtLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9tb2JpbGUtYWNjZXNzL2xvY2F0aW9uLWxpc3QvbG9jYXRpb24taXRlbS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX2NvbW1vbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUFBO0FBQ0E7RUFDRSxjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG1DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsZ0JBQUE7RUFDQSw4QkFBc0I7RUFDdEIsdUNBQTBCO0VBQzFCLHVDQUErQjtFQUMvQixpREFBbUM7RUFDbkMsb0NBQTRCO0VBQzVCLG1DQUEyQjtFQUUzQixlQUFBO0VBQ0EsNkJBQXFCO0VBQ3JCLHNDQUF5QjtFQUN6QixzQ0FBOEI7RUFDOUIsZ0RBQWtDO0VBQ2xDLG1DQUEyQjtFQUMzQixrQ0FBMEI7RUFFMUIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLG1DQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsV0FBQTtFQUNBLHlCQUFpQjtFQUNqQixnQ0FBcUI7RUFDckIsa0NBQTBCO0VBQzFCLDRDQUE4QjtFQUM5QiwrQkFBdUI7RUFDdkIsOEJBQXNCO0VBRXRCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIscUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixZQUFBO0VBQ0EsMEJBQWtCO0VBQ2xCLG9DQUFzQjtFQUN0QixtQ0FBMkI7RUFDM0IsdUNBQStCO0VBQy9CLGdDQUF3QjtFQUN4QiwrQkFBdUIsRUFBQTtBQ3RFekI7RUFFSSxTQUFTLEVBQUE7QUFGYjtJQ29ERSxnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJRGhEZixpRER3RXFELEVBQUE7QUM5RTNEO0lBVU0sZ0JBQWdCO0lDWHBCLGVEWXFDO0lDUnJDLGdERjBFdUQsRUFBQTtBQzVEdkQ7RUFDRSxrQkFBa0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL21vYmlsZS1hY2Nlc3MvbG9jYXRpb24tbGlzdC9sb2NhdGlvbi1pdGVtL2xvY2F0aW9uLWl0ZW0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG46aG9zdCB7XHJcbiAgLnN0LWxhYmVsIHtcclxuICAgIG1hcmdpbjogMDtcclxuXHJcbiAgICAudGl0bGUge1xyXG4gICAgICBAaW5jbHVkZSBlbGxpcHNpcztcclxuICAgICAgZm9udC1mYW1pbHk6ICRmb250LW51bml0by1zZW1pYm9sZDtcclxuICAgIH1cclxuXHJcbiAgICAuc3ViLXRpdGxlIHtcclxuICAgICAgbWFyZ2luLXRvcDogLTVweDtcclxuICAgICAgQGluY2x1ZGUgZm9udC1udW5pdG8tcmVndWxhcigxMHB4KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5sb2NhdGlvbiB7XHJcbiAgJl9fZmF2IHtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxuICB9XHJcbn1cclxuIiwiQG1peGluIGZvbnQtc2l6ZSgkZm9udC1zaXplKSB7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1mYW1pbHkoJGZvbnQtZmFtaWx5KSB7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXJlZ3VsYXIoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tcmVndWxhcik7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1zZW1pYm9sZCgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1zZW1pYm9sZCk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1oZWF2eSgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1oZWF2eSk7XHJcbn1cclxuXHJcbkBtaXhpbiBsaW5rLWNvbG9yKCRjb2xvcikge1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcblxyXG4gICY6bGluayxcclxuICAmOnZpc2l0ZWQsXHJcbiAgJjpmb2N1cyxcclxuICAmOmhvdmVyLFxyXG4gICY6YWN0aXZlIHtcclxuICAgIGNvbG9yOiAkY29sb3I7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gaG92ZXIge1xyXG4gICY6aG92ZXIsXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBkaXNhYmxlZCB7XHJcbiAgJi5kaXNhYmxlZCxcclxuICAmLmRpc2FibGVkOmZvY3VzLFxyXG4gICYuZGlzYWJsZWQ6aG92ZXIsXHJcbiAgJltkaXNhYmxlZF0sXHJcbiAgJltkaXNhYmxlZF06Zm9jdXMsXHJcbiAgJltkaXNhYmxlZF06aG92ZXIge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZWxsaXBzaXMge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxuQG1peGluIGZsb2F0aW5nLWxhYmVsKCRjb2xvcikge1xyXG4gIGZvbnQtc2l6ZTogNzUlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTUlLCAtNTAlLCAwKTtcclxuICBvcGFjaXR5OiAxO1xyXG4gIGJhY2tncm91bmQ6ICRjb2xvci13aGl0ZTtcclxuICBwYWRkaW5nOiAwIDNweDtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLnN2ZycpO1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgd2lkdGg6IDE0cHg7XHJcbiAgICBoZWlnaHQ6IDlweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgei1pbmRleDogMTtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tYWN0aXZlKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tYWN0aXZlLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWVycm9yKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tZXJyb3Iuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/sections/mobile-access/location-list/location-item/location-item.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/sections/mobile-access/location-list/location-item/location-item.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: LocationItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationItemComponent", function() { return LocationItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var _mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mobile-acces.config */ "./src/app/sections/mobile-access/mobile-acces.config.ts");






var LocationItemComponent = /** @class */ (function () {
    function LocationItemComponent(router, nav2) {
        this.router = router;
        this.nav2 = nav2;
        this.addToFav = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    Object.defineProperty(LocationItemComponent.prototype, "starClass", {
        get: function () {
            var empty = 'star-outline';
            var filled = 'star-filled';
            var star = this.location.isFavourite ? filled : empty;
            return "./assets/icon/" + star + ".svg";
        },
        enumerable: true,
        configurable: true
    });
    LocationItemComponent.prototype.openLocation = function () {
        this.nav2.navigateForward("/" + _app_global__WEBPACK_IMPORTED_MODULE_4__["PATRON_NAVIGATION"].mobileAccess + "/" + _mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__["LOCAL_ROUTING"].activate + "/" + this.location.locationId);
    };
    LocationItemComponent.prototype.triggerFavourite = function () {
        this.addToFav.emit(this.location.locationId);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], LocationItemComponent.prototype, "location", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], LocationItemComponent.prototype, "addToFav", void 0);
    LocationItemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-location-item',
            template: __webpack_require__(/*! ./location-item.component.html */ "./src/app/sections/mobile-access/location-list/location-item/location-item.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./location-item.component.scss */ "./src/app/sections/mobile-access/location-list/location-item/location-item.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"]])
    ], LocationItemComponent);
    return LocationItemComponent;
}());



/***/ }),

/***/ "./src/app/sections/mobile-access/location-list/location-list.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/sections/mobile-access/location-list/location-list.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-location-item\r\n  *ngFor=\"let location of locations; trackBy: trackByLocationId\"\r\n  [location]=\"location\"\r\n  (addToFav)=\"favouriteHandler($event)\"\r\n>\r\n</st-location-item>\r\n\r\n<p class=\"no-data-message\" *ngIf=\"locations && !locations.length\">{{ contentString.noLocationsFound }}</p>\r\n"

/***/ }),

/***/ "./src/app/sections/mobile-access/location-list/location-list.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/sections/mobile-access/location-list/location-list.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n:host .no-data-message {\n  text-align: center;\n  margin-top: 20px;\n  height: 100vh;\n  font-family: \"Nunito SemiBold\", arial, sans-serif;\n  color: #333; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvbW9iaWxlLWFjY2Vzcy9sb2NhdGlvbi1saXN0L0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL21vYmlsZS1hY2Nlc3MvbG9jYXRpb24tbGlzdC9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXG1vYmlsZS1hY2Nlc3NcXGxvY2F0aW9uLWxpc3RcXGxvY2F0aW9uLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDdEV6QjtFQUVJLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGlERHlFdUQ7RUN4RXZELFdEb0ZvQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvbW9iaWxlLWFjY2Vzcy9sb2NhdGlvbi1saXN0L2xvY2F0aW9uLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0IFwidG9vbHNcIjtcclxuXHJcbjpob3N0IHtcclxuICAubm8tZGF0YS1tZXNzYWdlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICBoZWlnaHQ6IDEwMHZoO1xyXG4gICAgZm9udC1mYW1pbHk6ICRmb250LW51bml0by1zZW1pYm9sZDtcclxuICAgIGNvbG9yOiAkY29sb3ItbmlnaHQtcmlkZXI7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/sections/mobile-access/location-list/location-list.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/sections/mobile-access/location-list/location-list.component.ts ***!
  \*********************************************************************************/
/*! exports provided: LocationListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationListComponent", function() { return LocationListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service */ "./src/app/sections/mobile-access/service/index.ts");
/* harmony import */ var _mobile_acces_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mobile-acces.config */ "./src/app/sections/mobile-access/mobile-acces.config.ts");




var LocationListComponent = /** @class */ (function () {
    function LocationListComponent(mobileAccessService) {
        this.mobileAccessService = mobileAccessService;
        this.favouriteTrigger = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    LocationListComponent.prototype.ngOnInit = function () {
        this.setContentStrings();
    };
    LocationListComponent.prototype.trackByLocationId = function (index, _a) {
        var locationId = _a.locationId;
        return locationId;
    };
    LocationListComponent.prototype.favouriteHandler = function (event) {
        this.favouriteTrigger.emit(event);
    };
    LocationListComponent.prototype.setContentStrings = function () {
        var noLocationsFound = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_3__["CONTENT_STRINGS"].noLocationsFound);
        this.contentString = { noLocationsFound: noLocationsFound };
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('locations'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], LocationListComponent.prototype, "locations", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])('favouriteTrigger'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], LocationListComponent.prototype, "favouriteTrigger", void 0);
    LocationListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-location-list',
            template: __webpack_require__(/*! ./location-list.component.html */ "./src/app/sections/mobile-access/location-list/location-list.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./location-list.component.scss */ "./src/app/sections/mobile-access/location-list/location-list.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service__WEBPACK_IMPORTED_MODULE_2__["MobileAccessService"]])
    ], LocationListComponent);
    return LocationListComponent;
}());



/***/ }),

/***/ "./src/app/sections/mobile-access/mobile-acces.config.ts":
/*!***************************************************************!*\
  !*** ./src/app/sections/mobile-access/mobile-acces.config.ts ***!
  \***************************************************************/
/*! exports provided: LOCAL_ROUTING, CONTENT_STRINGS, MobileAccessContentStringsParams, GenericContentStringsParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCAL_ROUTING", function() { return LOCAL_ROUTING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTENT_STRINGS", function() { return CONTENT_STRINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileAccessContentStringsParams", function() { return MobileAccessContentStringsParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenericContentStringsParams", function() { return GenericContentStringsParams; });
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app.global */ "./src/app/app.global.ts");

var LOCAL_ROUTING;
(function (LOCAL_ROUTING) {
    LOCAL_ROUTING["activate"] = "activate";
})(LOCAL_ROUTING || (LOCAL_ROUTING = {}));
var CONTENT_STRINGS;
(function (CONTENT_STRINGS) {
    CONTENT_STRINGS["retryBtn"] = "button_retry";
    CONTENT_STRINGS["cancelBtn"] = "button_cancel";
    CONTENT_STRINGS["activateBtn"] = "button_activate";
    CONTENT_STRINGS["closeBtn"] = "button_close";
    CONTENT_STRINGS["errorResponseDialogHeader"] = "dialog_header_activate-response-error";
    CONTENT_STRINGS["successResponseDialogHeader"] = "dialog_header_activate-response-success";
    CONTENT_STRINGS["errorResponseActivateLocation"] = "toast_activate-response-error";
    CONTENT_STRINGS["enterCodeDialogHeader"] = "dialog_header_enter-code";
    CONTENT_STRINGS["scanBarcodeDialogHeader"] = "dialog_header_scan-barcode";
    CONTENT_STRINGS["backBtnHeader"] = "header_button_back";
    CONTENT_STRINGS["headerTitle"] = "header_title";
    CONTENT_STRINGS["headerTitleActivate"] = "header_title_activate";
    CONTENT_STRINGS["labelPullToRefresh"] = "label_pull-to-refresh-text";
    CONTENT_STRINGS["activateLocationLoader"] = "loader_activate-location";
    CONTENT_STRINGS["searchbarPlaceholder"] = "searchbar_placeholder_filter-locations";
    CONTENT_STRINGS["addFavToast"] = "toast_add-favorite";
    CONTENT_STRINGS["removeFavToast"] = "toast_remove-favorite";
    CONTENT_STRINGS["addFavErrorToast"] = "toast_add-favorite-error";
    CONTENT_STRINGS["noLocationsFound"] = "label_no-locations-found";
})(CONTENT_STRINGS || (CONTENT_STRINGS = {}));
var MobileAccessContentStringsParams = {
    category: _app_global__WEBPACK_IMPORTED_MODULE_0__["ContentString"].CATEGORIES.mobileAccess,
    domain: _app_global__WEBPACK_IMPORTED_MODULE_0__["ContentString"].DOMAINS.patron,
};
var GenericContentStringsParams = {
    category: _app_global__WEBPACK_IMPORTED_MODULE_0__["ContentString"].CATEGORIES.core,
    domain: _app_global__WEBPACK_IMPORTED_MODULE_0__["ContentString"].DOMAINS.patron,
};


/***/ }),

/***/ "./src/app/sections/mobile-access/mobile-access-popover/index.ts":
/*!***********************************************************************!*\
  !*** ./src/app/sections/mobile-access/mobile-access-popover/index.ts ***!
  \***********************************************************************/
/*! exports provided: MobileAccessPopoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mobile_access_popover_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mobile-access-popover.component */ "./src/app/sections/mobile-access/mobile-access-popover/mobile-access-popover.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MobileAccessPopoverComponent", function() { return _mobile_access_popover_component__WEBPACK_IMPORTED_MODULE_0__["MobileAccessPopoverComponent"]; });




/***/ }),

/***/ "./src/app/sections/mobile-access/mobile-access-popover/mobile-access-popover.component.html":
/*!***************************************************************************************************!*\
  !*** ./src/app/sections/mobile-access/mobile-access-popover/mobile-access-popover.component.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-popover-layout [popoverConfig]=\"popoverConfig\">\r\n  <div class=\"ma-popover__content\">\r\n    <div class=\"ma-popover__message\">\r\n      {{ popoverConfig.message }}\r\n    </div>\r\n    <st-countdown\r\n      [seconds]=\"popoverConfig.validityTime\"\r\n      (onTimeout)=\"onFinishTimeout()\"\r\n      *ngIf=\"popoverConfig.type === 'BARCODE' || popoverConfig.type === 'CODE'\"\r\n    ></st-countdown>\r\n  </div>\r\n  <div class=\"ma-popover__temp-code\" *ngIf=\"popoverConfig.type === 'CODE'\">\r\n    {{ popoverConfig.code }}\r\n  </div>\r\n  <div class=\"ma-popover__barcode\">\r\n    <canvas id=\"barcodeCanvas\" *ngIf=\"popoverConfig.type === 'BARCODE'\"></canvas>\r\n  </div>\r\n</st-popover-layout>\r\n"

/***/ }),

/***/ "./src/app/sections/mobile-access/mobile-access-popover/mobile-access-popover.component.scss":
/*!***************************************************************************************************!*\
  !*** ./src/app/sections/mobile-access/mobile-access-popover/mobile-access-popover.component.scss ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n:host .ma-popover__content {\n  display: -webkit-box;\n  display: flex;\n  margin-bottom: 10px; }\n:host .ma-popover__content .ma-popover__message {\n    flex-basis: 80%; }\n:host .ma-popover__temp-code {\n  text-align: center;\n  font-size: 36px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n:host .ma-popover__barcode {\n  text-align: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvbW9iaWxlLWFjY2Vzcy9tb2JpbGUtYWNjZXNzLXBvcG92ZXIvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvbW9iaWxlLWFjY2Vzcy9tb2JpbGUtYWNjZXNzLXBvcG92ZXIvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxhcHBcXHNlY3Rpb25zXFxtb2JpbGUtYWNjZXNzXFxtb2JpbGUtYWNjZXNzLXBvcG92ZXJcXG1vYmlsZS1hY2Nlc3MtcG9wb3Zlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvbW9iaWxlLWFjY2Vzcy9tb2JpbGUtYWNjZXNzLXBvcG92ZXIvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF9jb21tb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBQTtBQUNBO0VBQ0UsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixtQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGdCQUFBO0VBQ0EsOEJBQXNCO0VBQ3RCLHVDQUEwQjtFQUMxQix1Q0FBK0I7RUFDL0IsaURBQW1DO0VBQ25DLG9DQUE0QjtFQUM1QixtQ0FBMkI7RUFFM0IsZUFBQTtFQUNBLDZCQUFxQjtFQUNyQixzQ0FBeUI7RUFDekIsc0NBQThCO0VBQzlCLGdEQUFrQztFQUNsQyxtQ0FBMkI7RUFDM0Isa0NBQTBCO0VBRTFCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixtQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFdBQUE7RUFDQSx5QkFBaUI7RUFDakIsZ0NBQXFCO0VBQ3JCLGtDQUEwQjtFQUMxQiw0Q0FBOEI7RUFDOUIsK0JBQXVCO0VBQ3ZCLDhCQUFzQjtFQUV0QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLHFDQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsWUFBQTtFQUNBLDBCQUFrQjtFQUNsQixvQ0FBc0I7RUFDdEIsbUNBQTJCO0VBQzNCLHVDQUErQjtFQUMvQixnQ0FBd0I7RUFDeEIsK0JBQXVCLEVBQUE7QUN0RXpCO0VBR00sb0JBQWE7RUFBYixhQUFhO0VBQ2IsbUJBQW1CLEVBQUE7QUFKekI7SUFPUSxlQUFlLEVBQUE7QUFQdkI7RUFZTSxrQkFBa0I7RUNidEIsZURlbUM7RUNYbkMsNkNGNEVrRCxFQUFBO0FDL0VwRDtFQWtCTSxrQkFBa0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL21vYmlsZS1hY2Nlc3MvbW9iaWxlLWFjY2Vzcy1wb3BvdmVyL21vYmlsZS1hY2Nlc3MtcG9wb3Zlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBJb25pYyBDU1MgVmFyaWFibGVzICoqL1xyXG46cm9vdCB7XHJcbiAgLyoqIHByaW1hcnkgKiovXHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeTogIzAwNWNiOTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXJnYjogMCwgOTIsIDE4NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGU6ICMwMDUxYTM7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS10aW50OiAjMWE2Y2MwO1xyXG5cclxuICAvKiogc2Vjb25kYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeTogIzBjZDFlODtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktcmdiOiAxMiwgMjA5LCAyMzI7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXNoYWRlOiAjMGJiOGNjO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS10aW50OiAjMjRkNmVhO1xyXG5cclxuICAvKiogdGVydGlhcnkgKiovXHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnk6ICM3MDQ0ZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktcmdiOiAxMTIsIDY4LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXNoYWRlOiAjNjMzY2UwO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXRpbnQ6ICM3ZTU3ZmY7XHJcblxyXG4gIC8qKiBzdWNjZXNzICoqL1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3M6ICMxMGRjNjA7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2I6IDE2LCAyMjAsIDk2O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZTogIzBlYzI1NDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXRpbnQ6ICMyOGUwNzA7XHJcblxyXG4gIC8qKiB3YXJuaW5nICoqL1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmc6ICNmZmNlMDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1yZ2I6IDI1NSwgMjA2LCAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1zaGFkZTogI2UwYjUwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXRpbnQ6ICNmZmQzMWE7XHJcblxyXG4gIC8qKiBkYW5nZXIgKiovXHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyOiAjZjA0MTQxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1yZ2I6IDI0NSwgNjEsIDYxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1zaGFkZTogI2QzMzkzOTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItdGludDogI2YyNTQ1NDtcclxuXHJcbiAgLyoqIGRhcmsgKiovXHJcbiAgLS1pb24tY29sb3ItZGFyazogIzIyMjQyODtcclxuICAtLWlvbi1jb2xvci1kYXJrLXJnYjogMzQsIDM0LCAzNDtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstc2hhZGU6ICMxZTIwMjM7XHJcbiAgLS1pb24tY29sb3ItZGFyay10aW50OiAjMzgzYTNlO1xyXG5cclxuICAvKiogbWVkaXVtICoqL1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bTogIzk4OWFhMjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tcmdiOiAxNTIsIDE1NCwgMTYyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZTogIzg2ODg4ZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tdGludDogI2EyYTRhYjtcclxuXHJcbiAgLyoqIGxpZ2h0ICoqL1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0OiAjZjRmNWY4O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXJnYjogMjQ0LCAyNDQsIDI0NDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdDogIzAwMDAwMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdC1yZ2I6IDAsIDAsIDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtc2hhZGU6ICNkN2Q4ZGE7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtdGludDogI2Y1ZjZmOTtcclxuXHJcbiAgLy8gLS1pb24tZ3JpZC13aWR0aC1zbTogMHB4O1xyXG59XHJcblxyXG4vLyBGT05UU1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiRmb250LW51bml0by1yZWd1bGFyOiAnTnVuaXRvIFJlZ3VsYXInLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLXNlbWlib2xkOiAnTnVuaXRvIFNlbWlCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1oZWF2eTogJ051bml0byBCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcblxyXG4vLyBDT0xPUlNcclxuXHJcbiRjb2xvci12ZXJ5LWxpZ2h0LWdyYXk6ICNjY2M7XHJcbiRjb2xvci1saW5rLXdhdGVyOiAjZDRkNmQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2U5ZTllOTtcclxuJGNvbG9yLWRhcmstZ3JheTogI2FhYTtcclxuJGNvbG9yLWR1c3R5LWdyYXk6ICM5Nzk3OTc7XHJcbiRjb2xvci1kaW0tZ3JheTogIzZlNmU2ZTtcclxuJGNvbG9yLXNvbGl0dWRlOiAjRUNGMUY4O1xyXG4kY29sb3ItbmlnaHQtcmlkZXI6ICMzMzM7XHJcbiRjb2xvci1uYXZ5LWJsdWU6ICMwMDU2ZTY7XHJcbiRjb2xvci1kZW5pbTogIzEzNjBlMDtcclxuJGNvbG9yLWRvZGdlci1ibHVlOiAjMTY2ZGZmO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWUtbGlnaHRlcjogIzJkN2NmZjtcclxuJGNvbG9yLXdoaXRlOiAjZmZmO1xyXG4kY29sb3ItYmxhY2s6ICMwMDA7XHJcbiRjb2xvci13aGl0ZS1zbW9rZTogI2YzZjNmMztcclxuJGNvbG9yLWRlZXAtc2t5LWJsdWU6ICMwMGEwZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzhiYjdmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjODhjOGZmO1xyXG4kY29sb3Itc3Ryb25nLWJsdWU6ICMwMDQzYjM7XHJcbiRjb2xvci1hbGljZS1ibHVlOiAjZjBmM2Y1O1xyXG4kY29sb3Itc2lsdmVyOiAjYzRjNGM0O1xyXG4kY29sb3ItbWF0dGVyaG9ybjogIzUxNTE1MTtcclxuJGNvbG9yLXZlcnktZGFyay1ncmF5OiAjNjI2MjYyO1xyXG4kY29sb3ItbWVyY3VyeTogI2U3ZTdlNztcclxuJGNvbG9yLWxpZ2h0LWdyYXk6ICNkOGQ4ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZWJlYmViO1xyXG4kY29sb3ItYWxpemFyaW46ICNlMjI5NDI7XHJcbiRjb2xvci1mbGFtZS1yZWQ6ICM4ODE5Mjg7XHJcbiRjb2xvci1jaGFyY29hbDogIzQ2NDY0NjtcclxuJGNvbG9yLWRlZXAtc2VhOiAjMTQ3ZDYzO1xyXG4kY29sb3ItY2FyZGluYWw6ICNiNTIxMzU7XHJcbiRjb2xvci1nb2QtZ3JheTogIzE2MTYxNjtcclxuJGNvbG9yLWhvdC1jdXJyeTogIzdjNWQyMztcclxuJGNvbG9yLWNhc2FibGFuY2E6ICNmN2JhNDU7XHJcbiRjb2xvci1hbGFiYXN0ZXI6ICNmN2Y3Zjc7XHJcbiRwb3JjZWxhaW46ICNlNmU5ZWI7XHJcbiRjb2xvci1oYXJsZXktZGF2aWRzb24tb3JhbmdlOiAjRDA0MzFBO1xyXG4kY29sb3ItcGF0dGVucy1ibHVlOiAjZTBlM2U1O1xyXG5cclxuLy8vIFNpemVcclxuJGJvdHRvbS1uYXZpZ2F0aW9uLWJhci1oZWlnaHQ6IDUwcHg7XHJcbiIsIkBpbXBvcnQgJ3Rvb2xzJztcclxuXHJcbjpob3N0IHtcclxuICAubWEtcG9wb3ZlciB7XHJcbiAgICAmX19jb250ZW50IHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuXHJcbiAgICAgIC5tYS1wb3BvdmVyX19tZXNzYWdlIHtcclxuICAgICAgICBmbGV4LWJhc2lzOiA4MCU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAmX190ZW1wLWNvZGUge1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gICAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgzNnB4KTtcclxuICAgIH1cclxuXHJcbiAgICAmX19iYXJjb2RlIHtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/mobile-access/mobile-access-popover/mobile-access-popover.component.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/sections/mobile-access/mobile-access-popover/mobile-access-popover.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: MobileAccessPopoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileAccessPopoverComponent", function() { return MobileAccessPopoverComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/barcode-scanner/ngx */ "./node_modules/@ionic-native/barcode-scanner/ngx/index.js");
/* harmony import */ var bwip_angular2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bwip-angular2 */ "./node_modules/bwip-angular2/browser-bwipjs.js");
/* harmony import */ var bwip_angular2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bwip_angular2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../mobile-acces.config */ "./src/app/sections/mobile-access/mobile-acces.config.ts");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../service */ "./src/app/sections/mobile-access/service/index.ts");
/* harmony import */ var _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");








var MobileAccessPopoverComponent = /** @class */ (function () {
    function MobileAccessPopoverComponent(popoverCtrl, barcodeScanner, mobileAccessService) {
        this.popoverCtrl = popoverCtrl;
        this.mobileAccessService = mobileAccessService;
    }
    MobileAccessPopoverComponent.prototype.ngOnInit = function () {
        this.setContentStrings();
        this.initPopover();
    };
    MobileAccessPopoverComponent.prototype.ngAfterViewInit = function () {
        this.initBarcode();
    };
    MobileAccessPopoverComponent.prototype.initPopover = function () {
        var _a = this.data, message = _a.message, responseCode = _a.responseCode, showBarCode = _a.showBarCode, showTempCode = _a.showTempCode, validityTime = _a.validityTime, issuedCode = _a.issuedCode;
        if (responseCode !== null) {
            var error = responseCode !== '00' || false;
            this.popoverConfig = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.popoverConfig, { title: error ? this.contentString.errorResponseDialogHeader : this.contentString.successResponseDialogHeader, type: error ? PopupTypes.ERROR : PopupTypes.SUCCESS, buttons: this.configureButtons(!error) });
        }
        else {
            var barcodeCondition = showBarCode === 1 && showTempCode === 1;
            this.popoverConfig = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.popoverConfig, { title: barcodeCondition ? this.contentString.scanBarcodeDialogHeader : this.contentString.enterCodeDialogHeader, type: barcodeCondition ? PopupTypes.BARCODE : PopupTypes.CODE, buttons: this.configureButtons(true) });
        }
        // FOR NATIVE CODE (ANDROID, IOS ), for future:
        // const generatedBarcode =
        // this.barcodeScanner
        //   .encode(this.barcodeScanner.Encode.TEXT_TYPE, 'testText')
        //   .then(success => console.log(success), error => console.log(error));
        this.popoverConfig = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.popoverConfig, { message: message, code: issuedCode, validityTime: validityTime });
    };
    MobileAccessPopoverComponent.prototype.onFinishTimeout = function (closeModal) {
        if (closeModal === void 0) { closeModal = 'CANCEL'; }
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.dismiss(closeModal)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MobileAccessPopoverComponent.prototype.initBarcode = function () {
        bwip_angular2__WEBPACK_IMPORTED_MODULE_4___default()('barcodeCanvas', {
            bcid: 'pdf417',
            text: this.popoverConfig.code,
            includetext: false,
        }, function (err, cvs) { });
    };
    MobileAccessPopoverComponent.prototype.configureButtons = function (condition) {
        var successBtns = [tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_7__["buttons"].OKAY, { label: this.contentString.closeBtn })];
        var errorBtns = [
            tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_7__["buttons"].CANCEL, { label: this.contentString.cancelBtn }),
            tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_7__["buttons"].RETRY, { label: this.contentString.retryBtn }),
        ];
        return condition ? successBtns : errorBtns;
    };
    MobileAccessPopoverComponent.prototype.setContentStrings = function () {
        var errorResponseDialogHeader = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].errorResponseDialogHeader);
        var successResponseDialogHeader = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].successResponseDialogHeader);
        var scanBarcodeDialogHeader = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].scanBarcodeDialogHeader);
        var enterCodeDialogHeader = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].enterCodeDialogHeader);
        var closeBtn = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].closeBtn);
        var retryBtn = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].retryBtn);
        var cancelBtn = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].cancelBtn);
        this.contentString = {
            errorResponseDialogHeader: errorResponseDialogHeader,
            successResponseDialogHeader: successResponseDialogHeader,
            scanBarcodeDialogHeader: scanBarcodeDialogHeader,
            enterCodeDialogHeader: enterCodeDialogHeader,
            closeBtn: closeBtn,
            retryBtn: retryBtn,
            cancelBtn: cancelBtn,
        };
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], MobileAccessPopoverComponent.prototype, "data", void 0);
    MobileAccessPopoverComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'mobile-access-popover',
            template: __webpack_require__(/*! ./mobile-access-popover.component.html */ "./src/app/sections/mobile-access/mobile-access-popover/mobile-access-popover.component.html"),
            styles: [__webpack_require__(/*! ./mobile-access-popover.component.scss */ "./src/app/sections/mobile-access/mobile-access-popover/mobile-access-popover.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"],
            _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_3__["BarcodeScanner"],
            _service__WEBPACK_IMPORTED_MODULE_6__["MobileAccessService"]])
    ], MobileAccessPopoverComponent);
    return MobileAccessPopoverComponent;
}());

var PopupTypes;
(function (PopupTypes) {
    PopupTypes["BARCODE"] = "BARCODE";
    PopupTypes["CODE"] = "CODE";
    PopupTypes["SUCCESS"] = "SUCCESS";
    PopupTypes["ERROR"] = "ERROR";
})(PopupTypes || (PopupTypes = {}));


/***/ }),

/***/ "./src/app/sections/mobile-access/mobile-access.page.html":
/*!****************************************************************!*\
  !*** ./src/app/sections/mobile-access/mobile-access.page.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-header\r\n  [title]=\"contentString.header\"\r\n  [placeholder]=\"contentString.search\"\r\n  [backButtonTitle]=\"contentString.backBtn\"\r\n  [isBackButtonShow]=\"false\"\r\n  [isToolbarShow]=\"true\"\r\n  [isTitleShow]=\"true\"\r\n  [isSubToolbarShow]=\"true\">\r\n  <ion-searchbar\r\n          (ionChange)=\"onSearchedValue($event)\"\r\n          (keyup.enter)=\"onEnterKeyClicked()\"\r\n          [placeholder]=\"contentString.search\"\r\n          mode=\"ios\"\r\n          class=\"mobile-access__searchbar\"\r\n  ></ion-searchbar>\r\n</st-header>\r\n\r\n<ion-content>\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"refreshLocationList($event)\">\r\n    <st-spinner [refreshText]=\"contentString.pullRefreshLabel\"></st-spinner>\r\n  </ion-refresher>\r\n  <st-location-list [locations]=\"locations$ | async\" (favouriteTrigger)=\"favouriteHandler($event)\"></st-location-list>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/sections/mobile-access/mobile-access.page.scss":
/*!****************************************************************!*\
  !*** ./src/app/sections/mobile-access/mobile-access.page.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #fff; }\n\n.mobile-access__searchbar {\n  padding-top: 20px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvbW9iaWxlLWFjY2Vzcy9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXG1vYmlsZS1hY2Nlc3NcXG1vYmlsZS1hY2Nlc3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usc0JBQXNCLEVBQUE7O0FBSXRCO0VBQ0UsaUJBQWlCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zZWN0aW9ucy9tb2JpbGUtYWNjZXNzL21vYmlsZS1hY2Nlc3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbn1cclxuXHJcbi5tb2JpbGUtYWNjZXNzIHtcclxuICAmX19zZWFyY2hiYXIge1xyXG4gICAgcGFkZGluZy10b3A6IDIwcHg7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/sections/mobile-access/mobile-access.page.ts":
/*!**************************************************************!*\
  !*** ./src/app/sections/mobile-access/mobile-access.page.ts ***!
  \**************************************************************/
/*! exports provided: MobileAccessPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileAccessPage", function() { return MobileAccessPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./service */ "./src/app/sections/mobile-access/service/index.ts");
/* harmony import */ var _mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mobile-acces.config */ "./src/app/sections/mobile-access/mobile-acces.config.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_facades_institution_institution_facade_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/facades/institution/institution.facade.service */ "./src/app/core/facades/institution/institution.facade.service.ts");









var Keyboard = _capacitor_core__WEBPACK_IMPORTED_MODULE_6__["Plugins"].Keyboard;
var MobileAccessPage = /** @class */ (function () {
    function MobileAccessPage(userFacadeService, mobileAccessService, institutionFacadeService) {
        this.userFacadeService = userFacadeService;
        this.mobileAccessService = mobileAccessService;
        this.institutionFacadeService = institutionFacadeService;
        this.sourceSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subscription"]();
        this.searchString$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]('');
        this.initComponent();
    }
    MobileAccessPage.prototype.ngOnDestroy = function () {
        this.sourceSubscription.unsubscribe();
    };
    MobileAccessPage.prototype.ngOnInit = function () {
        this.setContentStrings();
        this.userInfo$ = this.userFacadeService.getUserData$();
    };
    MobileAccessPage.prototype.ngAfterViewInit = function () {
        this.setInstitutionInfo();
        this.setUserInfo();
    };
    MobileAccessPage.prototype.onEnterKeyClicked = function () {
        Keyboard.hide();
    };
    MobileAccessPage.prototype.refreshLocationList = function ($event) {
        this.mobileAccessService
            .getLocations()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1))
            .subscribe(function () {
            $event.target.complete();
        }, function () {
            $event.target.complete();
        });
    };
    MobileAccessPage.prototype.favouriteHandler = function (id) {
        this.mobileAccessService
            .updateFavouritesList(id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1))
            .subscribe();
    };
    MobileAccessPage.prototype.onSearchedValue = function (_a) {
        var value = _a.target.value;
        this.searchString$.next(value);
    };
    MobileAccessPage.prototype.setInstitutionInfo = function () {
        var _this = this;
        var subscription = this.userInfo$
            .pipe(
        //TODO: add pre download institution photo after back-end will provide this functionality
        // switchMap(({ institutionId: id }: UserInfo) => {
        //   institutionId = id;
        //   return this.institutionService.getInstitutionPhoto$(institutionId);
        // }),
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (_a) {
            var id = _a.institutionId;
            return _this.institutionFacadeService.getInstitutionInfo$(id);
        }))
            .subscribe();
        this.sourceSubscription.add(subscription);
    };
    MobileAccessPage.prototype.setContentStrings = function () {
        var header = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].headerTitle);
        var search = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].searchbarPlaceholder);
        var pullRefreshLabel = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].labelPullToRefresh);
        var backBtn = this.mobileAccessService.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].backBtnHeader);
        this.contentString = { header: header, search: search, pullRefreshLabel: pullRefreshLabel, backBtn: backBtn };
    };
    MobileAccessPage.prototype.setUserInfo = function () {
        var subscription = this.userFacadeService.getAcceptedPhoto$().subscribe();
        this.sourceSubscription.add(subscription);
    };
    MobileAccessPage.prototype.initComponent = function () {
        var _this = this;
        this.locations$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(this.mobileAccessService.locations, this.searchString$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var locations = _a[0], str = _a[1];
            return _this.filterLocationsBySearchString(str, locations);
        }));
    };
    MobileAccessPage.prototype.filterLocationsBySearchString = function (searchString, locations) {
        var _this = this;
        return locations.filter(function (_a) {
            var name = _a.name, id = _a.locationId;
            return _this.isIncludedInString(searchString, name) || _this.isIncludedInString(searchString, id);
        });
    };
    MobileAccessPage.prototype.isIncludedInString = function (searchString, sourceString) {
        return sourceString.toUpperCase().includes(searchString.toUpperCase());
    };
    MobileAccessPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-mobile-access',
            template: __webpack_require__(/*! ./mobile-access.page.html */ "./src/app/sections/mobile-access/mobile-access.page.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./mobile-access.page.scss */ "./src/app/sections/mobile-access/mobile-access.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_7__["UserFacadeService"],
            _service__WEBPACK_IMPORTED_MODULE_4__["MobileAccessService"],
            _core_facades_institution_institution_facade_service__WEBPACK_IMPORTED_MODULE_8__["InstitutionFacadeService"]])
    ], MobileAccessPage);
    return MobileAccessPage;
}());



/***/ }),

/***/ "./src/app/sections/mobile-access/service/index.ts":
/*!*********************************************************!*\
  !*** ./src/app/sections/mobile-access/service/index.ts ***!
  \*********************************************************/
/*! exports provided: MobileAccessService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mobile_access_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mobile-access.service */ "./src/app/sections/mobile-access/service/mobile-access.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MobileAccessService", function() { return _mobile_access_service__WEBPACK_IMPORTED_MODULE_0__["MobileAccessService"]; });




/***/ }),

/***/ "./src/app/sections/mobile-access/service/mobile-access.service.ts":
/*!*************************************************************************!*\
  !*** ./src/app/sections/mobile-access/service/mobile-access.service.ts ***!
  \*************************************************************************/
/*! exports provided: MobileAccessService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileAccessService", function() { return MobileAccessService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _mobile_acces_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../mobile-acces.config */ "./src/app/sections/mobile-access/mobile-acces.config.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var _core_service_coords_coords_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/service/coords/coords.service */ "./src/app/core/service/coords/coords.service.ts");
/* harmony import */ var _core_service_content_service_content_strings_api_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/service/content-service/content-strings-api.service */ "./src/app/core/service/content-service/content-strings-api.service.ts");
/* harmony import */ var _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/interceptors/query-config.model */ "./src/app/core/interceptors/query-config.model.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");













var MobileAccessService = /** @class */ (function () {
    function MobileAccessService(http, coords, contentService, toastController, settingsFacadeService, userFacadeService) {
        this.http = http;
        this.coords = coords;
        this.contentService = contentService;
        this.toastController = toastController;
        this.settingsFacadeService = settingsFacadeService;
        this.userFacadeService = userFacadeService;
        this.serviceUrl = '/json/commerce';
        this.favouritesLocationSettingsName = 'mobileaccess_favorites';
        this.locations$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]([]);
        this.locationsInfo = [];
        this.toastDuration = 6000;
    }
    Object.defineProperty(MobileAccessService.prototype, "locations", {
        get: function () {
            return this.locations$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MobileAccessService.prototype, "_locations", {
        set: function (locations) {
            this.locationsInfo = locations.slice();
            this.locations$.next(this.locationsInfo.slice());
        },
        enumerable: true,
        configurable: true
    });
    MobileAccessService.prototype.getInstitutionColor = function () {
        return this.settingsFacadeService.getSetting(_app_global__WEBPACK_IMPORTED_MODULE_7__["Settings"].Setting.MOBILE_HEADER_COLOR).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (_a) {
            var value = _a.value;
            return value;
        }));
    };
    MobileAccessService.prototype.initContentStringsList = function () {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["combineLatest"])(this.contentService.retrieveContentStringListByRequest(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_6__["MobileAccessContentStringsParams"]), this.contentService.retrieveContentStringListByRequest(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_6__["GenericContentStringsParams"])).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (_a) {
            var mobileCS = _a[0], genericCS = _a[1];
            var finalArray = mobileCS.concat(genericCS);
            _this.content = finalArray.reduce(function (init, elem) {
                var _a;
                return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, init, (_a = {}, _a[elem.name] = elem.value, _a)));
            }, {});
            return finalArray;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1));
    };
    MobileAccessService.prototype.initContentStringsListgfas = function () {
        var _this = this;
        return this.contentService
            .retrieveContentStringListByRequest(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_6__["GenericContentStringsParams"])
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (res) { return (_this.content = res.reduce(function (init, elem) {
            var _a;
            return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, init, (_a = {}, _a[elem.name] = elem.value, _a)));
        }, {})); }));
    };
    MobileAccessService.prototype.getContentValueByName = function (name) {
        return this.content[name] || '';
    };
    MobileAccessService.prototype.getMobileLocations = function () {
        var _this = this;
        var filters = ['Normal', 'TempCode', 'Attendance'];
        var postParams = { filters: filters };
        return this.coords.getCoords().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (geoData) {
            var geoParam = {
                latitude: geoData.coords.latitude,
                longitude: geoData.coords.longitude,
                accuracy: geoData.coords.accuracy,
            };
            var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_10__["RPCQueryConfig"]('getMobileLocations', tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, postParams, geoParam), true);
            return _this.http.post(_this.serviceUrl, queryConfig);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (_a) {
            var response = _a.response, exception = _a.exception;
            if (exception !== null) {
                throw new Error(exception);
            }
            return response;
        }));
    };
    MobileAccessService.prototype.getLocationById = function (locationId) {
        return this.locations.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (locations) { return locations.filter(function (location) { return location.locationId === locationId; })[0]; }));
    };
    MobileAccessService.prototype.updateFavouritesList = function (locationId) {
        var _this = this;
        this.favourites = this.handleFavouriteById(locationId, this.favourites);
        this._locations = this.getLocationsMultiSorted(this.locationsInfo, this.favourites);
        return this.saveFavourites(this.favourites).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (success) {
            if (success) {
                return success;
            }
            else {
                throw new Error('');
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function () { return _this.getLocationById(locationId); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (_a) {
            var name = _a.name, isFavourite = _a.isFavourite;
            var onAddMessage = _this.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STRINGS"].addFavToast);
            var onRemoveMessage = _this.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STRINGS"].removeFavToast);
            var message = name + " " + (isFavourite ? onAddMessage : onRemoveMessage);
            _this.presentToast(message);
        }, function () {
            var onErrorMessage = _this.getContentValueByName(_mobile_acces_config__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STRINGS"].addFavErrorToast);
            _this.errorSavingFavourites(onErrorMessage);
        }));
    };
    MobileAccessService.prototype.getLocations = function () {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["combineLatest"])(this.getMobileLocations(), this.getFavouritesLocations()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (_a) {
            var locations = _a[0], favourites = _a[1];
            return (_this._locations = _this.getLocationsMultiSorted(locations, favourites));
        }));
    };
    MobileAccessService.prototype.getFavouritesLocations = function () {
        var _this = this;
        return this.settingsFacadeService.getUserSetting(_app_global__WEBPACK_IMPORTED_MODULE_7__["User"].Settings.MOBILE_ACCESS_FAVORITES).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (_a) {
            var value = _a.value;
            return (_this.favourites = _this.parseArrayFromString(value));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function () {
            _this.favourites = [];
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])([]);
        }));
    };
    MobileAccessService.prototype.activateMobileLocation = function (locationId, sourceInfo) {
        var _this = this;
        if (sourceInfo === void 0) { sourceInfo = null; }
        return this.coords.getCoords().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (geoData) { return _this.createMobileLocationParams(locationId, geoData.coords, sourceInfo); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (postParams) {
            var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_10__["RPCQueryConfig"]('activateMobileLocation', postParams, true);
            return _this.http.post(_this.serviceUrl, queryConfig);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (_a) {
            var response = _a.response, exception = _a.exception;
            if (exception !== null) {
                throw new Error(exception);
            }
            return response;
        }));
    };
    MobileAccessService.prototype.saveFavourites = function (favourites) {
        var favouritesAsString = JSON.stringify(favourites);
        return this.settingsFacadeService
            .saveUserSetting(_app_global__WEBPACK_IMPORTED_MODULE_7__["User"].Settings.MOBILE_ACCESS_FAVORITES, favouritesAsString)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["retry"])(1));
    };
    MobileAccessService.prototype.handleFavouriteById = function (locationId, favourites) {
        var wasFavorite = this.isFavouriteLocation(locationId, favourites);
        if (wasFavorite) {
            return (favourites = favourites.filter(function (id) { return id !== locationId; }));
        }
        favourites.push(locationId);
        return favourites;
    };
    MobileAccessService.prototype.addFavouriteFieldToLocations = function (locations, favourites) {
        var _this = this;
        return locations.map(function (location) { return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, location, { isFavourite: _this.isFavouriteLocation(location.locationId, favourites) })); });
    };
    MobileAccessService.prototype.getLocationsMultiSorted = function (locations, favourites) {
        var locationListWithFavourites = this.addFavouriteFieldToLocations(locations, favourites);
        var locationsSortedByScores = locationListWithFavourites.slice().sort(this.sortByHighestScore);
        return locationsSortedByScores.sort(this.sortByFavourites);
    };
    MobileAccessService.prototype.isFavouriteLocation = function (locationId, favourites) {
        return favourites.indexOf(locationId) !== -1;
    };
    MobileAccessService.prototype.sortByHighestScore = function (_a, _b) {
        var a = _a.score;
        var b = _b.score;
        return a && b ? b - a : 0;
    };
    MobileAccessService.prototype.sortByFavourites = function (_a, _b) {
        var a = _a.isFavourite;
        var b = _b.isFavourite;
        return Number(b) - Number(a);
    };
    MobileAccessService.prototype.parseArrayFromString = function (str) {
        var array = JSON.parse(str);
        return Array.isArray(array) ? array : [];
    };
    MobileAccessService.prototype.createMobileLocationParams = function (locationId, geoData, sourceInfo) {
        var latitude = !geoData.latitude ? null : geoData.latitude;
        var longitude = !geoData.longitude ? null : geoData.longitude;
        var accuracy = !geoData.accuracy ? null : geoData.accuracy;
        var altitude = !geoData.altitude ? null : geoData.altitude;
        var altitudeAccuracy = !geoData.altitudeAccuracy ? null : geoData.altitudeAccuracy;
        var heading = !geoData.heading ? null : geoData.heading;
        var speed = !geoData.speed ? null : geoData.speed;
        return {
            locationId: locationId,
            tranDate: new Date().toISOString(),
            latitude: latitude,
            longitude: longitude,
            accuracy: accuracy,
            altitude: altitude,
            altitudeAccuracy: altitudeAccuracy,
            speed: speed,
            heading: heading,
            sourceInfo: sourceInfo,
        };
    };
    MobileAccessService.prototype.presentToast = function (message) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: this.toastDuration,
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
    MobileAccessService.prototype.errorSavingFavourites = function (message) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: this.toastDuration,
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
    MobileAccessService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _core_service_coords_coords_service__WEBPACK_IMPORTED_MODULE_8__["CoordsService"],
            _core_service_content_service_content_strings_api_service__WEBPACK_IMPORTED_MODULE_9__["ContentStringsApiService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_12__["SettingsFacadeService"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_11__["UserFacadeService"]])
    ], MobileAccessService);
    return MobileAccessService;
}());



/***/ })

}]);
//# sourceMappingURL=default~dashboard-dashboard-module~mobile-access-mobile-access-module.js.map