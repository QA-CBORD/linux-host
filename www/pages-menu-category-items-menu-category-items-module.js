(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-menu-category-items-menu-category-items-module"],{

/***/ "./src/app/sections/ordering/pages/menu-category-items/category-list/category-list.component.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/menu-category-items/category-list/category-list.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-list class=\"category-list\"\r\n          mode=\"ios\"\r\n          lines=\"none\">\r\n  <ion-item class=\"category-list__menu-item\"\r\n            *ngFor=\"let menuItem of menuCategoryItems\"\r\n            lines=\"none\"\r\n            mode=\"ios\"\r\n            (click)=\"triggerMenuItemClick(menuItem)\">\r\n    <div class=\"category-list__menu-item-container\">\r\n      <div class=\"category-list__menu-item-wrapper\">\r\n        <div class=\"category-list__menu-item-title\">{{ menuItem.menuItem.name }}</div>\r\n        <div class=\"category-list__menu-item-description\">{{ menuItem.menuItem.description }}</div>\r\n        <div class=\"category-list__menu-item-price\">{{ menuItem.menuItem.price | priceUnitsResolver: mealBased }}</div>\r\n      </div>\r\n      <img *ngIf=\"menuItem.menuItem.imageReference\" class=\"category-list__menu-item-photo\"\r\n           src=\"{{awsImageUrl + menuItem.menuItem.imageReference}}\">\r\n    </div>\r\n  </ion-item>\r\n</ion-list>\r\n"

/***/ }),

/***/ "./src/app/sections/ordering/pages/menu-category-items/category-list/category-list.component.scss":
/*!********************************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/menu-category-items/category-list/category-list.component.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.category-list {\n  padding: 31px 16px;\n  background: #f0f3f5; }\n.category-list__menu-item-wrapper {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n            justify-content: space-between; }\n.category-list__menu-item {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: justify;\n            justify-content: space-between;\n    height: 96px;\n    box-shadow: 0 0 4px 0 #0000000a,\r 0 2px 14px 0 #0000001f;\n    border-radius: 8px;\n    margin: 8px 0;\n    --padding-end: 0;\n    --padding-start: 0;\n    --inner-padding-end: 3px;\n    --inner-padding-start: 0; }\n.category-list__menu-item-container {\n    padding: 9px 0 10px 15px;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: justify;\n            justify-content: space-between;\n    width: 100%; }\n.category-list__menu-item-title {\n    font-size: 14px;\n    font-family: \"Nunito Bold\", arial, sans-serif; }\n.category-list__menu-item-description {\n    display: block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    max-height: 29px;\n    font-size: 11px;\n    font-family: \"Nunito Regular\", arial, sans-serif; }\n.category-list__menu-item-price {\n    margin: 9px 0;\n    font-size: 14px;\n    font-family: \"Nunito Regular\", arial, sans-serif; }\n.category-list__menu-item-photo {\n    border-radius: 8px;\n    height: 88px;\n    width: 88px;\n    -o-object-fit: cover;\n       object-fit: cover; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvb3JkZXJpbmcvcGFnZXMvbWVudS1jYXRlZ29yeS1pdGVtcy9jYXRlZ29yeS1saXN0L0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL29yZGVyaW5nL3BhZ2VzL21lbnUtY2F0ZWdvcnktaXRlbXMvY2F0ZWdvcnktbGlzdC9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXG9yZGVyaW5nXFxwYWdlc1xcbWVudS1jYXRlZ29yeS1pdGVtc1xcY2F0ZWdvcnktbGlzdFxcY2F0ZWdvcnktbGlzdC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvb3JkZXJpbmcvcGFnZXMvbWVudS1jYXRlZ29yeS1pdGVtcy9jYXRlZ29yeS1saXN0L2NhdGVnb3J5LWxpc3QuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL29yZGVyaW5nL3BhZ2VzL21lbnUtY2F0ZWdvcnktaXRlbXMvY2F0ZWdvcnktbGlzdC9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX2NvbW1vbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUFBO0FBQ0E7RUFDRSxjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG1DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsZ0JBQUE7RUFDQSw4QkFBc0I7RUFDdEIsdUNBQTBCO0VBQzFCLHVDQUErQjtFQUMvQixpREFBbUM7RUFDbkMsb0NBQTRCO0VBQzVCLG1DQUEyQjtFQUUzQixlQUFBO0VBQ0EsNkJBQXFCO0VBQ3JCLHNDQUF5QjtFQUN6QixzQ0FBOEI7RUFDOUIsZ0RBQWtDO0VBQ2xDLG1DQUEyQjtFQUMzQixrQ0FBMEI7RUFFMUIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLG1DQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsV0FBQTtFQUNBLHlCQUFpQjtFQUNqQixnQ0FBcUI7RUFDckIsa0NBQTBCO0VBQzFCLDRDQUE4QjtFQUM5QiwrQkFBdUI7RUFDdkIsOEJBQXNCO0VBRXRCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIscUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixZQUFBO0VBQ0EsMEJBQWtCO0VBQ2xCLG9DQUFzQjtFQUN0QixtQ0FBMkI7RUFDM0IsdUNBQStCO0VBQy9CLGdDQUF3QjtFQUN4QiwrQkFBdUIsRUFBQTtBQ3RFekI7RUFDRSxrQkFBa0I7RUFDbEIsbUJEb0d3QixFQUFBO0FDbEd4QjtJQUNFLG9CQUFhO0lBQWIsYUFBYTtJQUNiLDRCQUFzQjtJQUF0Qiw2QkFBc0I7WUFBdEIsc0JBQXNCO0lBQ3RCLHlCQUE4QjtZQUE5Qiw4QkFBOEIsRUFBQTtBQUdoQztJQUNFLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHlCQUE4QjtZQUE5Qiw4QkFBOEI7SUFDOUIsWUFBWTtJQUNaLHdEQUVrQjtJQUNsQixrQkFBYTtJQUNiLGFBQWE7SUFDYixnQkFBZTtJQUNmLGtCQUFBO0lBQ0Esd0JBQXNCO0lBR3hCLHdCQUFBLEVBQUE7QUMyREE7SUR6REUsd0JBQWE7SUFDYixvQkFBQTtJQUFBLGFBQUE7SUFDQSx5QkFDRDtZQURDLDhCQUNEO0lBRUQsV0FBQSxFQUFBO0FDeURBO0lDckZBLGVINEVrQjtJQzNDbEIsNkNBQXlCLEVBQUE7QUN1RHpCO0lEckRFLGNBQVU7SUFDVixnQkFBZTtJQUNmLHVCQUFnQjtJRXpDbEIsZ0JGMkNtQztJRXZDbkMsZUgwRW9CO0lDaENwQixnREFBbUIsRUFBQTtBQ3FEbkI7SUNuR0EsYUZpRCtCO0lFN0MvQixlSDBFb0I7SUMxQnBCLGdEQUFtQixFQUFBO0FDbURuQjtJRGpERSxrQkFBWTtJQUNaLFlBQVc7SUFDWCxXQUFVO0lDbURWLG9CQUFpQjtPQUFqQixpQkFBaUIsRUFBRSIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL29yZGVyaW5nL3BhZ2VzL21lbnUtY2F0ZWdvcnktaXRlbXMvY2F0ZWdvcnktbGlzdC9jYXRlZ29yeS1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXHJcbjpyb290IHtcclxuICAvKiogcHJpbWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMDA1Y2I5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiAwLCA5MiwgMTg1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzAwNTFhMztcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XHJcblxyXG4gIC8qKiBzZWNvbmRhcnkgKiovXHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5OiAjMGNkMWU4O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDEyLCAyMDksIDIzMjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMwYmI4Y2M7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XHJcblxyXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2I6IDExMiwgNjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM2MzNjZTA7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcclxuXHJcbiAgLyoqIHN1Y2Nlc3MgKiovXHJcbiAgLS1pb24tY29sb3Itc3VjY2VzczogIzEwZGM2MDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcclxuXHJcbiAgLyoqIHdhcm5pbmcgKiovXHJcbiAgLS1pb24tY29sb3Itd2FybmluZzogI2ZmY2UwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAyMDYsIDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBiNTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcclxuXHJcbiAgLyoqIGRhbmdlciAqKi9cclxuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXJnYjogMjQ1LCA2MSwgNjE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlOiAjZDMzOTM5O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xyXG5cclxuICAvKiogZGFyayAqKi9cclxuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcclxuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XHJcblxyXG4gIC8qKiBtZWRpdW0gKiovXHJcbiAgLS1pb24tY29sb3ItbWVkaXVtOiAjOTg5YWEyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE1MiwgMTU0LCAxNjI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODY4ODhmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xyXG5cclxuICAvKiogbGlnaHQgKiovXHJcbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtcmdiOiAyNDQsIDI0NCwgMjQ0O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1zaGFkZTogI2Q3ZDhkYTtcclxuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xyXG5cclxuICAvLyAtLWlvbi1ncmlkLXdpZHRoLXNtOiAwcHg7XHJcbn1cclxuXHJcbi8vIEZPTlRTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJGZvbnQtbnVuaXRvLXJlZ3VsYXI6ICdOdW5pdG8gUmVndWxhcicsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8tc2VtaWJvbGQ6ICdOdW5pdG8gU2VtaUJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLWhlYXZ5OiAnTnVuaXRvIEJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuXHJcbi8vIENPTE9SU1xyXG5cclxuJGNvbG9yLXZlcnktbGlnaHQtZ3JheTogI2NjYztcclxuJGNvbG9yLWxpbmstd2F0ZXI6ICNkNGQ2ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZTllOWU5O1xyXG4kY29sb3ItZGFyay1ncmF5OiAjYWFhO1xyXG4kY29sb3ItZHVzdHktZ3JheTogIzk3OTc5NztcclxuJGNvbG9yLWRpbS1ncmF5OiAjNmU2ZTZlO1xyXG4kY29sb3Itc29saXR1ZGU6ICNFQ0YxRjg7XHJcbiRjb2xvci1uaWdodC1yaWRlcjogIzMzMztcclxuJGNvbG9yLW5hdnktYmx1ZTogIzAwNTZlNjtcclxuJGNvbG9yLWRlbmltOiAjMTM2MGUwO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWU6ICMxNjZkZmY7XHJcbiRjb2xvci1kb2RnZXItYmx1ZS1saWdodGVyOiAjMmQ3Y2ZmO1xyXG4kY29sb3Itd2hpdGU6ICNmZmY7XHJcbiRjb2xvci1ibGFjazogIzAwMDtcclxuJGNvbG9yLXdoaXRlLXNtb2tlOiAjZjNmM2YzO1xyXG4kY29sb3ItZGVlcC1za3ktYmx1ZTogIzAwYTBmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjOGJiN2ZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4OGM4ZmY7XHJcbiRjb2xvci1zdHJvbmctYmx1ZTogIzAwNDNiMztcclxuJGNvbG9yLWFsaWNlLWJsdWU6ICNmMGYzZjU7XHJcbiRjb2xvci1zaWx2ZXI6ICNjNGM0YzQ7XHJcbiRjb2xvci1tYXR0ZXJob3JuOiAjNTE1MTUxO1xyXG4kY29sb3ItdmVyeS1kYXJrLWdyYXk6ICM2MjYyNjI7XHJcbiRjb2xvci1tZXJjdXJ5OiAjZTdlN2U3O1xyXG4kY29sb3ItbGlnaHQtZ3JheTogI2Q4ZDhkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlYmViZWI7XHJcbiRjb2xvci1hbGl6YXJpbjogI2UyMjk0MjtcclxuJGNvbG9yLWZsYW1lLXJlZDogIzg4MTkyODtcclxuJGNvbG9yLWNoYXJjb2FsOiAjNDY0NjQ2O1xyXG4kY29sb3ItZGVlcC1zZWE6ICMxNDdkNjM7XHJcbiRjb2xvci1jYXJkaW5hbDogI2I1MjEzNTtcclxuJGNvbG9yLWdvZC1ncmF5OiAjMTYxNjE2O1xyXG4kY29sb3ItaG90LWN1cnJ5OiAjN2M1ZDIzO1xyXG4kY29sb3ItY2FzYWJsYW5jYTogI2Y3YmE0NTtcclxuJGNvbG9yLWFsYWJhc3RlcjogI2Y3ZjdmNztcclxuJHBvcmNlbGFpbjogI2U2ZTllYjtcclxuJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U6ICNEMDQzMUE7XHJcbiRjb2xvci1wYXR0ZW5zLWJsdWU6ICNlMGUzZTU7XHJcblxyXG4vLy8gU2l6ZVxyXG4kYm90dG9tLW5hdmlnYXRpb24tYmFyLWhlaWdodDogNTBweDtcclxuIiwiQGltcG9ydCAndG9vbHMnO1xyXG5cclxuLmNhdGVnb3J5LWxpc3Qge1xyXG4gIHBhZGRpbmc6IDMxcHggMTZweDtcclxuICBiYWNrZ3JvdW5kOiAkY29sb3ItYWxpY2UtYmx1ZTtcclxuXHJcbiAgJl9fbWVudS1pdGVtLXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgfVxyXG5cclxuICAmX19tZW51LWl0ZW0ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGhlaWdodDogOTZweDtcclxuICAgIGJveC1zaGFkb3c6IDAgMCA0cHggMCAjMDAwMDAwMGEsXHJcbiAgICAwIDJweCAxNHB4IDAgIzAwMDAwMDFmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgbWFyZ2luOiA4cHggMDtcclxuICAgIC0tcGFkZGluZy1lbmQ6IDA7XHJcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDA7XHJcbiAgICAtLWlubmVyLXBhZGRpbmctZW5kOiAzcHg7XHJcbiAgICAtLWlubmVyLXBhZGRpbmctc3RhcnQ6IDA7XHJcbiAgfVxyXG5cclxuICAmX19tZW51LWl0ZW0tY29udGFpbmVyIHtcclxuICAgIHBhZGRpbmc6IDlweCAwIDEwcHggMTVweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcblxyXG4gICZfX21lbnUtaXRlbS10aXRsZSB7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8taGVhdnkoMTRweCk7XHJcbiAgfVxyXG5cclxuICAmX19tZW51LWl0ZW0tZGVzY3JpcHRpb24ge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICBtYXgtaGVpZ2h0OiAyOXB4O1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXJlZ3VsYXIoMTFweCk7XHJcbiAgfVxyXG5cclxuICAmX19tZW51LWl0ZW0tcHJpY2Uge1xyXG4gICAgbWFyZ2luOiA5cHggMDtcclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1yZWd1bGFyKDE0cHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fbWVudS1pdGVtLXBob3RvIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGhlaWdodDogODhweDtcclxuICAgIHdpZHRoOiA4OHB4O1xyXG4gICAgb2JqZWN0LWZpdDogY292ZXI7XHJcbiAgfVxyXG59XHJcbiIsIi8qKiBJb25pYyBDU1MgVmFyaWFibGVzICoqL1xuOnJvb3Qge1xuICAvKiogcHJpbWFyeSAqKi9cbiAgLS1pb24tY29sb3ItcHJpbWFyeTogIzAwNWNiOTtcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XG4gIC8qKiBzZWNvbmRhcnkgKiovXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeTogIzBjZDFlODtcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XG4gIC8qKiB0ZXJ0aWFyeSAqKi9cbiAgLS1pb24tY29sb3ItdGVydGlhcnk6ICM3MDQ0ZmY7XG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcbiAgLyoqIHN1Y2Nlc3MgKiovXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3M6ICMxMGRjNjA7XG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcbiAgLyoqIHdhcm5pbmcgKiovXG4gIC0taW9uLWNvbG9yLXdhcm5pbmc6ICNmZmNlMDA7XG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcbiAgLyoqIGRhbmdlciAqKi9cbiAgLS1pb24tY29sb3ItZGFuZ2VyOiAjZjA0MTQxO1xuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xuICAvKiogZGFyayAqKi9cbiAgLS1pb24tY29sb3ItZGFyazogIzIyMjQyODtcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XG4gIC8qKiBtZWRpdW0gKiovXG4gIC0taW9uLWNvbG9yLW1lZGl1bTogIzk4OWFhMjtcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xuICAvKiogbGlnaHQgKiovXG4gIC0taW9uLWNvbG9yLWxpZ2h0OiAjZjRmNWY4O1xuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdC1yZ2I6IDAsIDAsIDA7XG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5OyB9XG5cbi5jYXRlZ29yeS1saXN0IHtcbiAgcGFkZGluZzogMzFweCAxNnB4O1xuICBiYWNrZ3JvdW5kOiAjZjBmM2Y1OyB9XG4gIC5jYXRlZ29yeS1saXN0X19tZW51LWl0ZW0td3JhcHBlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgfVxuICAuY2F0ZWdvcnktbGlzdF9fbWVudS1pdGVtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBoZWlnaHQ6IDk2cHg7XG4gICAgYm94LXNoYWRvdzogMCAwIDRweCAwICMwMDAwMDAwYSxcciAwIDJweCAxNHB4IDAgIzAwMDAwMDFmO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBtYXJnaW46IDhweCAwO1xuICAgIC0tcGFkZGluZy1lbmQ6IDA7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAgIC0taW5uZXItcGFkZGluZy1lbmQ6IDNweDtcbiAgICAtLWlubmVyLXBhZGRpbmctc3RhcnQ6IDA7IH1cbiAgLmNhdGVnb3J5LWxpc3RfX21lbnUtaXRlbS1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDlweCAwIDEwcHggMTVweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICB3aWR0aDogMTAwJTsgfVxuICAuY2F0ZWdvcnktbGlzdF9fbWVudS1pdGVtLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC1mYW1pbHk6IFwiTnVuaXRvIEJvbGRcIiwgYXJpYWwsIHNhbnMtc2VyaWY7IH1cbiAgLmNhdGVnb3J5LWxpc3RfX21lbnUtaXRlbS1kZXNjcmlwdGlvbiB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBtYXgtaGVpZ2h0OiAyOXB4O1xuICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICBmb250LWZhbWlseTogXCJOdW5pdG8gUmVndWxhclwiLCBhcmlhbCwgc2Fucy1zZXJpZjsgfVxuICAuY2F0ZWdvcnktbGlzdF9fbWVudS1pdGVtLXByaWNlIHtcbiAgICBtYXJnaW46IDlweCAwO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LWZhbWlseTogXCJOdW5pdG8gUmVndWxhclwiLCBhcmlhbCwgc2Fucy1zZXJpZjsgfVxuICAuY2F0ZWdvcnktbGlzdF9fbWVudS1pdGVtLXBob3RvIHtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgaGVpZ2h0OiA4OHB4O1xuICAgIHdpZHRoOiA4OHB4O1xuICAgIG9iamVjdC1maXQ6IGNvdmVyOyB9XG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/ordering/pages/menu-category-items/category-list/category-list.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/menu-category-items/category-list/category-list.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: CategoryListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryListComponent", function() { return CategoryListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../environment */ "./src/app/environment.ts");



var CategoryListComponent = /** @class */ (function () {
    function CategoryListComponent() {
        this.onItemClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.awsImageUrl = _environment__WEBPACK_IMPORTED_MODULE_2__["Environment"].getImageURL();
    }
    CategoryListComponent.prototype.triggerMenuItemClick = function (_a) {
        var id = _a.menuItem.id;
        this.onItemClicked.emit(id);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], CategoryListComponent.prototype, "menuCategoryItems", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], CategoryListComponent.prototype, "mealBased", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], CategoryListComponent.prototype, "onItemClicked", void 0);
    CategoryListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-category-list',
            template: __webpack_require__(/*! ./category-list.component.html */ "./src/app/sections/ordering/pages/menu-category-items/category-list/category-list.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./category-list.component.scss */ "./src/app/sections/ordering/pages/menu-category-items/category-list/category-list.component.scss")]
        })
    ], CategoryListComponent);
    return CategoryListComponent;
}());



/***/ }),

/***/ "./src/app/sections/ordering/pages/menu-category-items/menu-category-items.component.html":
/*!************************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/menu-category-items/menu-category-items.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"searchState; then searchBlock; else menuCategoryBlock\"></ng-container>\r\n\r\n<ng-template #searchBlock>\r\n  <ion-header class=\"menu-category__search-header\" mode=\"ios\" no-border>\r\n    <ion-toolbar class=\"menu-category__search-header-toolbar\" mode=\"ios\" no-border>\r\n      <ion-searchbar\r\n              class=\"menu-category__search-header-searchbar\"\r\n              placeholder=\"{{contentStrings.labelSearch | async}}\"\r\n              mode=\"ios\"\r\n              type=\"text\"\r\n              debounce=\"500\"\r\n              show-cancel-button=\"always\"\r\n              (ionCancel)=\"onCancelClicked()\"\r\n              (ionInput)=\"onSearchItemFiltered($event)\"\r\n      ></ion-searchbar>\r\n    </ion-toolbar>\r\n  </ion-header>\r\n  <ion-content class=\"menu-category\" mode=\"ios\">\r\n    <div *ngIf=\"!filteredMenuCategoryItems.length\" class=\"menu-category__search-wrapper\">\r\n      <img class=\"menu-category__search-icon\" src=\"/assets/icon/search.svg\"/>\r\n      <div class=\"menu-category__search-text\">{{contentStrings.labelEmptySearch | async}}</div>\r\n    </div>\r\n    <st-category-list\r\n            [mealBased]=\"(menuInfo$ | async).mealBased\"\r\n            [menuCategoryItems]=\"filteredMenuCategoryItems\"\r\n            (onItemClicked)=\"triggerMenuItemClick($event)\"\r\n    ></st-category-list>\r\n  </ion-content>\r\n</ng-template>\r\n\r\n<ng-template #menuCategoryBlock>\r\n  <ion-header class=\"menu-category__header\" mode=\"ios\">\r\n    <ion-toolbar mode=\"ios\" class=\"menu-category__header-toolbar\">\r\n      <ion-buttons slot=\"start\">\r\n        <ion-back-button\r\n                class=\"menu-category__header-back-btn\"\r\n                color=\"dark\"\r\n                [text]=\"contentStrings.labelFullMenu | async\"\r\n                [icon]=\"'ios-arrow-back'\"\r\n                mode=\"ios\"\r\n                (click)=\"onBackBtnClicked()\"\r\n        >\r\n        </ion-back-button>\r\n      </ion-buttons>\r\n      <ion-buttons slot=\"end\">\r\n        <ion-button class=\"menu-category__header-search-btn\" color=\"dark\" mode=\"ios\" (click)=\"onSearchClick()\">\r\n          <ion-icon class=\"menu-category__header-search-btn-icon\" name=\"search\"></ion-icon>\r\n        </ion-button>\r\n      </ion-buttons>\r\n      <ion-title class=\"menu-category__header-title\">\r\n        {{ menuCategory.name }}\r\n      </ion-title>\r\n    </ion-toolbar>\r\n  </ion-header>\r\n  <ion-content class=\"menu-category\" mode=\"ios\">\r\n    <st-category-list\r\n            [mealBased]=\"(menuInfo$ | async).mealBased\"\r\n            [menuCategoryItems]=\"menuCategory.menuCategoryItems\"\r\n            (onItemClicked)=\"triggerMenuItemClick($event)\"\r\n    ></st-category-list>\r\n  </ion-content>\r\n</ng-template>\r\n<ion-footer mode=\"ios\" class=\"menu-category__footer\" *ngIf=\"(menuItems$ | async)\">\r\n  <st-view-cart [menuItemsCount]=\"menuItems$ | async\" (click)=\"redirectToCart()\"></st-view-cart>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/sections/ordering/pages/menu-category-items/menu-category-items.component.scss":
/*!************************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/menu-category-items/menu-category-items.component.scss ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.menu-category {\n  width: 100%;\n  height: 100%;\n  --background: #f0f3f5; }\n.menu-category__header-toolbar {\n    padding: 5px 15px 5px 10px; }\n.menu-category__header-back-btn {\n    display: block;\n    --icon-font-size: 20px;\n    --icon-margin-end: 5px; }\n.menu-category__header-search-btn {\n    height: 36px;\n    width: 36px;\n    border: 2px solid #f3f3f3;\n    border-radius: 50%; }\n.menu-category__header-search-btn-icon {\n    font-size: 20px; }\n.menu-category__header-title {\n    padding-left: 105px;\n    font-size: 20px;\n    font-family: \"Nunito Bold\", arial, sans-serif; }\n.menu-category__search-header {\n    --background: #fff; }\n.menu-category__search-header-searchbar {\n    margin-top: 15px;\n    --icon-color: #000; }\n.menu-category__search-wrapper {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n            flex-direction: column;\n    -webkit-box-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n            align-items: center;\n    margin-top: 97px; }\n.menu-category__search-text {\n    text-align: center;\n    color: #00000099;\n    margin: 19px 72px 0;\n    font-size: 16px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.menu-category__footer {\n    background-color: #f0f3f5; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvb3JkZXJpbmcvcGFnZXMvbWVudS1jYXRlZ29yeS1pdGVtcy9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX3ZhcmlhYmxlcy5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9vcmRlcmluZy9wYWdlcy9tZW51LWNhdGVnb3J5LWl0ZW1zL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcYXBwXFxzZWN0aW9uc1xcb3JkZXJpbmdcXHBhZ2VzXFxtZW51LWNhdGVnb3J5LWl0ZW1zXFxtZW51LWNhdGVnb3J5LWl0ZW1zLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9vcmRlcmluZy9wYWdlcy9tZW51LWNhdGVnb3J5LWl0ZW1zL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDdEV6QjtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oscUJBQWEsRUFBQTtBQUViO0lBQ0UsMEJBQTBCLEVBQUE7QUFHNUI7SUFDRSxjQUFjO0lBQ2Qsc0JBQWlCO0lBQ2pCLHNCQUFrQixFQUFBO0FBR3BCO0lBQ0UsWUFBWTtJQUNaLFdBQVc7SUFDWCx5QkQrRXVCO0lDOUV2QixrQkFBa0IsRUFBQTtBQUdwQjtJQUNFLGVBQWUsRUFBQTtBQUdqQjtJQUNFLG1CQUFtQjtJQzVCckIsZUQ4QmlDO0lDMUJqQyw2Q0Y0RWtELEVBQUE7QUMvQ2xEO0lBQ0Usa0JBQWEsRUFBQTtBQUdmO0lBQ0UsZ0JBQWdCO0lBQ2hCLGtCQUFhLEVBQUE7QUFHZjtJQUNFLG9CQUFhO0lBQWIsYUFBYTtJQUNiLDRCQUFzQjtJQUF0Qiw2QkFBc0I7WUFBdEIsc0JBQXNCO0lBQ3RCLHdCQUF1QjtZQUF2Qix1QkFBdUI7SUFDdkIseUJBQW1CO1lBQW5CLG1CQUFtQjtJQUNuQixnQkFBZ0IsRUFBQTtBQUdsQjtJQUNFLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsbUJBQW1CO0lDckRyQixlRHVEb0M7SUNuRHBDLGlERjJFeUQsRUFBQTtBQ3JCekQ7SUFDRSx5QkQ0Q3NCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zZWN0aW9ucy9vcmRlcmluZy9wYWdlcy9tZW51LWNhdGVnb3J5LWl0ZW1zL21lbnUtY2F0ZWdvcnktaXRlbXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG4ubWVudS1jYXRlZ29yeSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIC0tYmFja2dyb3VuZDogI2YwZjNmNTtcclxuICBcclxuICAmX19oZWFkZXItdG9vbGJhciB7XHJcbiAgICBwYWRkaW5nOiA1cHggMTVweCA1cHggMTBweDtcclxuICB9XHJcblxyXG4gICZfX2hlYWRlci1iYWNrLWJ0biB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIC0taWNvbi1mb250LXNpemU6IDIwcHg7XHJcbiAgICAtLWljb24tbWFyZ2luLWVuZDogNXB4O1xyXG4gIH1cclxuXHJcbiAgJl9faGVhZGVyLXNlYXJjaC1idG4ge1xyXG4gICAgaGVpZ2h0OiAzNnB4O1xyXG4gICAgd2lkdGg6IDM2cHg7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCAkY29sb3Itd2hpdGUtc21va2U7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgfVxyXG5cclxuICAmX19oZWFkZXItc2VhcmNoLWJ0bi1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICB9XHJcblxyXG4gICZfX2hlYWRlci10aXRsZSB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwNXB4O1xyXG4gICAgXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgyMHB4KTtcclxuICB9XHJcblxyXG4gICZfX3NlYXJjaC1oZWFkZXIge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIH1cclxuXHJcbiAgJl9fc2VhcmNoLWhlYWRlci1zZWFyY2hiYXIge1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxuICAgIC0taWNvbi1jb2xvcjogIzAwMDtcclxuICB9XHJcblxyXG4gICZfX3NlYXJjaC13cmFwcGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogOTdweDtcclxuICB9XHJcblxyXG4gICZfX3NlYXJjaC10ZXh0IHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjMDAwMDAwOTk7XHJcbiAgICBtYXJnaW46IDE5cHggNzJweCAwO1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXNlbWlib2xkKDE2cHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fZm9vdGVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1hbGljZS1ibHVlO1xyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/ordering/pages/menu-category-items/menu-category-items.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/menu-category-items/menu-category-items.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: MenuCategoryItemsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuCategoryItemsComponent", function() { return MenuCategoryItemsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/app.global */ "./src/app/app.global.ts");
/* harmony import */ var _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/ordering/ordering.config */ "./src/app/sections/ordering/ordering.config.ts");
/* harmony import */ var _sections_ordering_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/ordering/services */ "./src/app/sections/ordering/services/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/utils/general-helpers */ "./src/app/core/utils/general-helpers.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sections/ordering/services/ordering.service */ "./src/app/sections/ordering/services/ordering.service.ts");












var MenuCategoryItemsComponent = /** @class */ (function () {
    function MenuCategoryItemsComponent(router, cartService, activatedRoute, cdRef, loadingService, toastController, orderingService, alertController) {
        this.router = router;
        this.cartService = cartService;
        this.activatedRoute = activatedRoute;
        this.cdRef = cdRef;
        this.loadingService = loadingService;
        this.toastController = toastController;
        this.orderingService = orderingService;
        this.alertController = alertController;
        this.searchState = false;
        this.filteredMenuCategoryItems = [];
        this.contentStrings = {};
    }
    MenuCategoryItemsComponent.prototype.ionViewWillEnter = function () {
        this.menuItems$ = this.cartService.menuItems$;
        this.initContentStrings();
        this.cdRef.detectChanges();
    };
    MenuCategoryItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuInfo$ = this.cartService.menuInfo$;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["zip"])(this.cartService.menuInfo$, this.activatedRoute.params)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1))
            .subscribe(function (_a) {
            var menu = _a[0], id = _a[1].id;
            _this.menuCategory = menu.menuCategories.find(function (category) { return category.id === id; });
        });
    };
    MenuCategoryItemsComponent.prototype.onBackBtnClicked = function () {
        this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_3__["PATRON_NAVIGATION"].ordering, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["LOCAL_ROUTING"].fullMenu]);
    };
    MenuCategoryItemsComponent.prototype.onSearchClick = function () {
        this.searchState = !this.searchState;
    };
    MenuCategoryItemsComponent.prototype.onSearchItemFiltered = function (_a) {
        var target = _a.target;
        var value = target.value.trim().toLowerCase();
        if (!value)
            return (this.filteredMenuCategoryItems = []);
        this.filteredMenuCategoryItems = this.menuCategory.menuCategoryItems.filter(function (_a) {
            var _b = _a.menuItem, name = _b.name, description = _b.description;
            return name.toLowerCase().indexOf(value) > -1 || (description && description.toLowerCase().indexOf(value) > -1);
        });
    };
    MenuCategoryItemsComponent.prototype.onCancelClicked = function () {
        this.searchState = !this.searchState;
        this.filteredMenuCategoryItems = [];
    };
    MenuCategoryItemsComponent.prototype.triggerMenuItemClick = function (menuItemId) {
        this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_3__["PATRON_NAVIGATION"].ordering, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["LOCAL_ROUTING"].itemDetail], {
            queryParams: { menuItemId: menuItemId },
        });
    };
    MenuCategoryItemsComponent.prototype.redirectToCart = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.cartService.cartsErrorMessage !== null) {
                            this.presentPopup(this.cartService.cartsErrorMessage);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.loadingService.showSpinner()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.cartService
                                .validateOrder()
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])(), Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_8__["handleServerError"])(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDER_VALIDATION_ERRORS"]))
                                .toPromise()
                                .then(function () { return _this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_3__["PATRON_NAVIGATION"].ordering, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["LOCAL_ROUTING"].cart]); })
                                .catch(function (error) { return _this.failedValidateOrder(error); })
                                .finally(function () { return _this.loadingService.closeSpinner(); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuCategoryItemsComponent.prototype.presentPopup = function (message) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: message,
                            buttons: [{ text: 'Ok' }],
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuCategoryItemsComponent.prototype.failedValidateOrder = function (message) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: 3000,
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
    MenuCategoryItemsComponent.prototype.initContentStrings = function () {
        this.contentStrings.labelSearch = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelSearch);
        this.contentStrings.labelEmptySearch = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelEmptySearch);
        this.contentStrings.labelFullMenu = this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelFullMenu);
    };
    MenuCategoryItemsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-menu-category-items',
            template: __webpack_require__(/*! ./menu-category-items.component.html */ "./src/app/sections/ordering/pages/menu-category-items/menu-category-items.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./menu-category-items.component.scss */ "./src/app/sections/ordering/pages/menu-category-items/menu-category-items.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _sections_ordering_services__WEBPACK_IMPORTED_MODULE_5__["CartService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_10__["LoadingService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ToastController"],
            _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_11__["OrderingService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"]])
    ], MenuCategoryItemsComponent);
    return MenuCategoryItemsComponent;
}());



/***/ }),

/***/ "./src/app/sections/ordering/pages/menu-category-items/menu-category-items.module.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/menu-category-items/menu-category-items.module.ts ***!
  \*******************************************************************************************/
/*! exports provided: MenuCategoryItemsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuCategoryItemsModule", function() { return MenuCategoryItemsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _menu_category_items_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu-category-items.routing.module */ "./src/app/sections/ordering/pages/menu-category-items/menu-category-items.routing.module.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _menu_category_items_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menu-category-items.component */ "./src/app/sections/ordering/pages/menu-category-items/menu-category-items.component.ts");
/* harmony import */ var _category_list_category_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./category-list/category-list.component */ "./src/app/sections/ordering/pages/menu-category-items/category-list/category-list.component.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _sections_ordering_shared_ui_components_view_cart__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/ordering/shared/ui-components/view-cart */ "./src/app/sections/ordering/shared/ui-components/view-cart/index.ts");
/* harmony import */ var _sections_ordering_shared_pipes_price_units_resolver_price_units_resolver_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module */ "./src/app/sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module.ts");










var imports = [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["IonicModule"], _menu_category_items_routing_module__WEBPACK_IMPORTED_MODULE_3__["MenuCategoryItemsRoutingModule"], _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_4__["StHeaderModule"], _sections_ordering_shared_ui_components_view_cart__WEBPACK_IMPORTED_MODULE_8__["ViewCartModule"], _sections_ordering_shared_pipes_price_units_resolver_price_units_resolver_module__WEBPACK_IMPORTED_MODULE_9__["PriceUnitsResolverModule"]];
var declarations = [_menu_category_items_component__WEBPACK_IMPORTED_MODULE_5__["MenuCategoryItemsComponent"], _category_list_category_list_component__WEBPACK_IMPORTED_MODULE_6__["CategoryListComponent"], _category_list_category_list_component__WEBPACK_IMPORTED_MODULE_6__["CategoryListComponent"]];
var MenuCategoryItemsModule = /** @class */ (function () {
    function MenuCategoryItemsModule() {
    }
    MenuCategoryItemsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: imports,
        })
    ], MenuCategoryItemsModule);
    return MenuCategoryItemsModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/pages/menu-category-items/menu-category-items.routing.module.ts":
/*!***************************************************************************************************!*\
  !*** ./src/app/sections/ordering/pages/menu-category-items/menu-category-items.routing.module.ts ***!
  \***************************************************************************************************/
/*! exports provided: MenuCategoryItemsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuCategoryItemsRoutingModule", function() { return MenuCategoryItemsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _menu_category_items_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu-category-items.component */ "./src/app/sections/ordering/pages/menu-category-items/menu-category-items.component.ts");




var routes = [
    {
        path: '',
        component: _menu_category_items_component__WEBPACK_IMPORTED_MODULE_3__["MenuCategoryItemsComponent"],
    },
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var MenuCategoryItemsRoutingModule = /** @class */ (function () {
    function MenuCategoryItemsRoutingModule() {
    }
    MenuCategoryItemsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({ imports: imports, exports: exports })
    ], MenuCategoryItemsRoutingModule);
    return MenuCategoryItemsRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module.ts ***!
  \****************************************************************************************************/
/*! exports provided: PriceUnitsResolverModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriceUnitsResolverModule", function() { return PriceUnitsResolverModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _price_units_resolver_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./price-units-resolver.pipe */ "./src/app/sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe.ts");




var PriceUnitsResolverModule = /** @class */ (function () {
    function PriceUnitsResolverModule() {
    }
    PriceUnitsResolverModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_price_units_resolver_pipe__WEBPACK_IMPORTED_MODULE_3__["PriceUnitsResolverPipe"]],
            exports: [
                _price_units_resolver_pipe__WEBPACK_IMPORTED_MODULE_3__["PriceUnitsResolverPipe"],
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            ],
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CurrencyPipe"]]
        })
    ], PriceUnitsResolverModule);
    return PriceUnitsResolverModule;
}());



/***/ }),

/***/ "./src/app/sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe.ts ***!
  \**************************************************************************************************/
/*! exports provided: PriceUnitsResolverPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriceUnitsResolverPipe", function() { return PriceUnitsResolverPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/ordering/services/ordering.service */ "./src/app/sections/ordering/services/ordering.service.ts");
/* harmony import */ var _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/ordering/ordering.config */ "./src/app/sections/ordering/ordering.config.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var PriceUnitsResolverPipe = /** @class */ (function () {
    function PriceUnitsResolverPipe(currencyPipe, orderingService) {
        this.currencyPipe = currencyPipe;
        this.orderingService = orderingService;
        this.singleMealUnit = 'meal';
        this.pluralMealUnit = 'meals';
        this.updateMealStringUnits();
    }
    PriceUnitsResolverPipe.prototype.transform = function (value, mealBased) {
        if (mealBased === void 0) { mealBased = false; }
        return mealBased
            ? value + " " + (value === 1 ? this.singleMealUnit : this.pluralMealUnit)
            : this.currencyPipe.transform(value);
    };
    PriceUnitsResolverPipe.prototype.updateMealStringUnits = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].labelMealSuffix)
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).toPromise()];
                    case 1:
                        _a.singleMealUnit =
                            _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.orderingService.getContentStringByName(_sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDERING_CONTENT_STRINGS"].mealSuffixPlural)
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).toPromise()];
                    case 2:
                        _b.pluralMealUnit =
                            _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PriceUnitsResolverPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'priceUnitsResolver',
            pure: false,
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CurrencyPipe"],
            _sections_ordering_services_ordering_service__WEBPACK_IMPORTED_MODULE_3__["OrderingService"]])
    ], PriceUnitsResolverPipe);
    return PriceUnitsResolverPipe;
}());



/***/ })

}]);
//# sourceMappingURL=pages-menu-category-items-menu-category-items-module.js.map