(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-meal-donations-meal-donations-module"],{

/***/ "./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/confirm-donate-popover.component.html":
/*!********************************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/confirm-donate-popover.component.html ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-popover-layout [popoverConfig]=\"popoverConfig\">\r\n  <section class=\"cdp__policy-container\">\r\n    <h5 class=\"cdp__policy-title\">{{policyTitle$ | async}}</h5>\r\n    <div class=\"cdp__policy-body\">\r\n      {{policyContent$ | async}}\r\n    </div>\r\n  </section>\r\n\r\n  <section class=\"cdp__info-container\">\r\n    <div class=\"cdp__label\">\r\n      {{donateAmount$ | async}}\r\n      <span class=\"cdp__value\">{{\r\n        popoverConfig.message['amountValue'] | transactionUnits: popoverConfig.message['account'].accountType\r\n        }}</span>\r\n    </div>\r\n    <div class=\"cdp__label\">\r\n      {{account$ | async}}\r\n      <span class=\"cdp__value\">{{ popoverConfig.message['account'].accountDisplayName }}</span>\r\n    </div>\r\n  </section>\r\n</st-popover-layout>\r\n"

/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/confirm-donate-popover.component.scss":
/*!********************************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/confirm-donate-popover.component.scss ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n:host .cdp__info-container {\n  margin-top: 10px;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n:host .cdp__label {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n:host .cdp__label {\n    margin-bottom: 10px; }\n:host .cdp__value {\n  text-align: right;\n  font-size: 16px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n:host .cdp__policy-container {\n  background: #f7f7f7;\n  border-radius: 8px;\n  padding: 8px 12px; }\n:host .cdp__policy-title {\n  margin: 0;\n  font-size: 10px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n:host .cdp__policy-body {\n  font-size: 10px;\n  font-family: \"Nunito SemiBold\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvbWVhbC1kb25hdGlvbnMvY29tcG9uZW50cy9jb25maXJtLWRvbmF0ZS1wb3BvdmVyL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL21lYWwtZG9uYXRpb25zL2NvbXBvbmVudHMvY29uZmlybS1kb25hdGUtcG9wb3Zlci9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXGFjY291bnRzXFxwYWdlc1xcbWVhbC1kb25hdGlvbnNcXGNvbXBvbmVudHNcXGNvbmZpcm0tZG9uYXRlLXBvcG92ZXJcXGNvbmZpcm0tZG9uYXRlLXBvcG92ZXIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL21lYWwtZG9uYXRpb25zL2NvbXBvbmVudHMvY29uZmlybS1kb25hdGUtcG9wb3Zlci9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX2NvbW1vbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUFBO0FBQ0E7RUFDRSxjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG1DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsZ0JBQUE7RUFDQSw4QkFBc0I7RUFDdEIsdUNBQTBCO0VBQzFCLHVDQUErQjtFQUMvQixpREFBbUM7RUFDbkMsb0NBQTRCO0VBQzVCLG1DQUEyQjtFQUUzQixlQUFBO0VBQ0EsNkJBQXFCO0VBQ3JCLHNDQUF5QjtFQUN6QixzQ0FBOEI7RUFDOUIsZ0RBQWtDO0VBQ2xDLG1DQUEyQjtFQUMzQixrQ0FBMEI7RUFFMUIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLG1DQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsV0FBQTtFQUNBLHlCQUFpQjtFQUNqQixnQ0FBcUI7RUFDckIsa0NBQTBCO0VBQzFCLDRDQUE4QjtFQUM5QiwrQkFBdUI7RUFDdkIsOEJBQXNCO0VBRXRCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIscUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixZQUFBO0VBQ0EsMEJBQWtCO0VBQ2xCLG9DQUFzQjtFQUN0QixtQ0FBMkI7RUFDM0IsdUNBQStCO0VBQy9CLGdDQUF3QjtFQUN4QiwrQkFBdUIsRUFBQTtBQ3RFekI7RUFHTSxnQkFBZ0I7RUNKcEIsZURNcUM7RUNGckMsZ0RGMEV1RCxFQUFBO0FDN0V6RDtFQVNNLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHlCQUE4QjtVQUE5Qiw4QkFBOEI7RUNYbEMsZURnQnFDO0VDWnJDLGdERjBFdUQsRUFBQTtBQzdFekQ7SUFZUSxtQkFBbUIsRUFBQTtBQVozQjtFQW1CTSxpQkFBaUI7RUNwQnJCLGVEc0JtQztFQ2xCbkMsNkNGNEVrRCxFQUFBO0FDL0VwRDtFQXlCTSxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGlCQUFpQixFQUFBO0FBM0J2QjtFQStCTSxTQUFTO0VDaENiLGVEa0NtQztFQzlCbkMsNkNGNEVrRCxFQUFBO0FDL0VwRDtFQ0RFLGVEc0NzQztFQ2xDdEMsaURGMkV5RCxFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvbWVhbC1kb25hdGlvbnMvY29tcG9uZW50cy9jb25maXJtLWRvbmF0ZS1wb3BvdmVyL2NvbmZpcm0tZG9uYXRlLXBvcG92ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG46aG9zdCB7XHJcbiAgLmNkcCB7XHJcbiAgICAmX19pbmZvLWNvbnRhaW5lciB7XHJcbiAgICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcblxyXG4gICAgICBAaW5jbHVkZSBmb250LW51bml0by1yZWd1bGFyKDE2cHgpO1xyXG4gICAgfVxyXG5cclxuICAgICZfX2xhYmVsIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICAmOm5vdCgmOmxhc3QtY2hpbGQpIHtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBAaW5jbHVkZSBmb250LW51bml0by1yZWd1bGFyKDE2cHgpO1xyXG4gICAgfVxyXG5cclxuICAgICZfX3ZhbHVlIHtcclxuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcblxyXG4gICAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgxNnB4KTtcclxuICAgIH1cclxuXHJcbiAgICAmX19wb2xpY3ktY29udGFpbmVyIHtcclxuICAgICAgYmFja2dyb3VuZDogI2Y3ZjdmNztcclxuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgICBwYWRkaW5nOiA4cHggMTJweDtcclxuICAgIH1cclxuXHJcbiAgICAmX19wb2xpY3ktdGl0bGUge1xyXG4gICAgICBtYXJnaW46IDA7XHJcblxyXG4gICAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgxMHB4KTtcclxuICAgIH1cclxuXHJcbiAgICAmX19wb2xpY3ktYm9keSB7XHJcbiAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXNlbWlib2xkKDEwcHgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/confirm-donate-popover.component.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/confirm-donate-popover.component.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: ConfirmDonatePopoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmDonatePopoverComponent", function() { return ConfirmDonatePopoverComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var ConfirmDonatePopoverComponent = /** @class */ (function () {
    function ConfirmDonatePopoverComponent() {
    }
    ConfirmDonatePopoverComponent.prototype.ngOnInit = function () {
        this.initPopover();
        this.updateConfig();
    };
    ConfirmDonatePopoverComponent.prototype.initPopover = function () {
        this.popoverConfig = {
            title: 'Confirm Donate',
            type: 'SUCCESS',
            buttons: [tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, src_app_core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_2__["buttons"].CANCEL, { label: 'CANCEL' }), tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, src_app_core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_2__["buttons"].OKAY, { label: 'DONATE' })],
            message: this.data,
        };
    };
    ConfirmDonatePopoverComponent.prototype.updateConfig = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, _c;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.popoverConfig;
                        return [4 /*yield*/, this.confirmationTitle$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise()];
                    case 1:
                        _a.title = _d.sent();
                        _b = this.popoverConfig.buttons[0];
                        return [4 /*yield*/, this.buttonCancel$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise()];
                    case 2:
                        _b.label = (_d.sent()).toUpperCase();
                        _c = this.popoverConfig.buttons[1];
                        return [4 /*yield*/, this.buttonDonate$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise()];
                    case 3:
                        _c.label = (_d.sent()).toUpperCase();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ConfirmDonatePopoverComponent.prototype, "data", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], ConfirmDonatePopoverComponent.prototype, "policyTitle$", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], ConfirmDonatePopoverComponent.prototype, "policyContent$", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], ConfirmDonatePopoverComponent.prototype, "buttonDonate$", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], ConfirmDonatePopoverComponent.prototype, "buttonCancel$", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], ConfirmDonatePopoverComponent.prototype, "donateAmount$", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], ConfirmDonatePopoverComponent.prototype, "account$", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], ConfirmDonatePopoverComponent.prototype, "confirmationTitle$", void 0);
    ConfirmDonatePopoverComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'confirm-donate-popover',
            template: __webpack_require__(/*! ./confirm-donate-popover.component.html */ "./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/confirm-donate-popover.component.html"),
            styles: [__webpack_require__(/*! ./confirm-donate-popover.component.scss */ "./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/confirm-donate-popover.component.scss")]
        })
    ], ConfirmDonatePopoverComponent);
    return ConfirmDonatePopoverComponent;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/confirm-donate-popover.module.ts":
/*!***************************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/confirm-donate-popover.module.ts ***!
  \***************************************************************************************************************************/
/*! exports provided: ConfirmDonatePopoverModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmDonatePopoverModule", function() { return ConfirmDonatePopoverModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _confirm_donate_popover_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./confirm-donate-popover.component */ "./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/confirm-donate-popover.component.ts");
/* harmony import */ var _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/ui-components/st-popover-layout/st-popover-layout.module */ "./src/app/shared/ui-components/st-popover-layout/st-popover-layout.module.ts");
/* harmony import */ var _shared_pipes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/pipes */ "./src/app/shared/pipes/index.ts");
/* harmony import */ var _sections_accounts_shared_pipes_credit_card_type_credit_card_type_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sections/accounts/shared/pipes/credit-card-type/credit-card-type.module */ "./src/app/sections/accounts/shared/pipes/credit-card-type/credit-card-type.module.ts");








var ConfirmDonatePopoverModule = /** @class */ (function () {
    function ConfirmDonatePopoverModule() {
    }
    ConfirmDonatePopoverModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_5__["StPopoverLayoutModule"],
                _shared_pipes__WEBPACK_IMPORTED_MODULE_6__["TransactionUnitsPipeModule"],
                _sections_accounts_shared_pipes_credit_card_type_credit_card_type_module__WEBPACK_IMPORTED_MODULE_7__["CreditCardTypeModule"]
            ],
            providers: [],
            declarations: [_confirm_donate_popover_component__WEBPACK_IMPORTED_MODULE_4__["ConfirmDonatePopoverComponent"]],
            exports: [_confirm_donate_popover_component__WEBPACK_IMPORTED_MODULE_4__["ConfirmDonatePopoverComponent"]]
        })
    ], ConfirmDonatePopoverModule);
    return ConfirmDonatePopoverModule;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/index.ts":
/*!***************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/index.ts ***!
  \***************************************************************************************************/
/*! exports provided: ConfirmDonatePopoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _confirm_donate_popover_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./confirm-donate-popover.component */ "./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/confirm-donate-popover.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfirmDonatePopoverComponent", function() { return _confirm_donate_popover_component__WEBPACK_IMPORTED_MODULE_0__["ConfirmDonatePopoverComponent"]; });




/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/components/donate-modal/donate-modal.component.html":
/*!************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/components/donate-modal/donate-modal.component.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"deposit-modal__header\">\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-title class=\"deposit-modal__title\">{{headerTitle$ | async}}</ion-title>\r\n  </ion-toolbar>\r\n</header>\r\n\r\n<ion-content>\r\n  <div class=\"deposit-modal__img-wrapper\">\r\n    <img src=\"/assets/images/big_check_deposit.svg\" alt=\"big_check_deposit\"/>\r\n  </div>\r\n  <h1 class=\"deposit-modal__title-label\">{{ dialogLabelSuccess$ | async }}</h1>\r\n  <p class=\"deposit-modal__sub-title\">\r\n    {{ completeMessage$ | async }}\r\n  </p>\r\n  <section class=\"deposit-modal__info-container\">\r\n    <p class=\"deposit-modal__label\">\r\n      {{donateAmount$ | async}}\r\n      <span class=\"deposit-modal__value\">{{\r\n        data.amountValue | transactionUnits: data.account.accountType\r\n        }}</span>\r\n    </p>\r\n    <p class=\"deposit-modal__label\">\r\n      {{account$ | async}} <span class=\"deposit-modal__value\">{{ data.account.accountDisplayName }}</span>\r\n    </p>\r\n  </section>\r\n</ion-content>\r\n<ion-footer class=\"deposit-modal__footer\" mode=\"ios\">\r\n  <st-button (onClick)=\"onClickedDone()\">{{buttonDone$ | async}}</st-button>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/components/donate-modal/donate-modal.component.scss":
/*!************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/components/donate-modal/donate-modal.component.scss ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.deposit-modal__header {\n  border-bottom: 1px solid #ebebeb; }\n.deposit-modal__title {\n  font-size: 20px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.deposit-modal__title-label {\n  color: #464646;\n  text-align: center;\n  font-size: 32px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.deposit-modal__sub-title {\n  color: #464646;\n  text-align: center;\n  padding: 0 40px;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n.deposit-modal__img-wrapper {\n  text-align: center; }\n.deposit-modal__info-container {\n  margin: 10px 0 0;\n  background: #f7f7f7;\n  padding: 16px 20px;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n.deposit-modal__label {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n.deposit-modal__label:nth-child(1), .deposit-modal__label:nth-child(2) {\n    margin-bottom: 15px; }\n.deposit-modal__value {\n  text-align: right;\n  font-size: 16px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.deposit-modal__footer {\n  padding: 10px 10px 50px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvbWVhbC1kb25hdGlvbnMvY29tcG9uZW50cy9kb25hdGUtbW9kYWwvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvbWVhbC1kb25hdGlvbnMvY29tcG9uZW50cy9kb25hdGUtbW9kYWwvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxhcHBcXHNlY3Rpb25zXFxhY2NvdW50c1xccGFnZXNcXG1lYWwtZG9uYXRpb25zXFxjb21wb25lbnRzXFxkb25hdGUtbW9kYWxcXGRvbmF0ZS1tb2RhbC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvbWVhbC1kb25hdGlvbnMvY29tcG9uZW50cy9kb25hdGUtbW9kYWwvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF9jb21tb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBQTtBQUNBO0VBQ0UsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixtQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGdCQUFBO0VBQ0EsOEJBQXNCO0VBQ3RCLHVDQUEwQjtFQUMxQix1Q0FBK0I7RUFDL0IsaURBQW1DO0VBQ25DLG9DQUE0QjtFQUM1QixtQ0FBMkI7RUFFM0IsZUFBQTtFQUNBLDZCQUFxQjtFQUNyQixzQ0FBeUI7RUFDekIsc0NBQThCO0VBQzlCLGdEQUFrQztFQUNsQyxtQ0FBMkI7RUFDM0Isa0NBQTBCO0VBRTFCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixtQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFdBQUE7RUFDQSx5QkFBaUI7RUFDakIsZ0NBQXFCO0VBQ3JCLGtDQUEwQjtFQUMxQiw0Q0FBOEI7RUFDOUIsK0JBQXVCO0VBQ3ZCLDhCQUFzQjtFQUV0QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLHFDQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsWUFBQTtFQUNBLDBCQUFrQjtFQUNsQixvQ0FBc0I7RUFDdEIsbUNBQTJCO0VBQzNCLHVDQUErQjtFQUMvQixnQ0FBd0I7RUFDeEIsK0JBQXVCLEVBQUE7QUNyRXZCO0VBQ0UsZ0NEMEdtQixFQUFBO0FDdkdyQjtFQ05BLGVET2lDO0VDSGpDLDZDRjRFa0QsRUFBQTtBQ3RFbEQ7RUFDRSxjQUFjO0VBQ2Qsa0JBQWtCO0VDWnBCLGVEY2lDO0VDVmpDLDZDRjRFa0QsRUFBQTtBQy9EbEQ7RUFDRSxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLGVBQWU7RUNwQmpCLGVEc0JtQztFQ2xCbkMsZ0RGMEV1RCxFQUFBO0FDckR2RDtFQUNFLGtCQUFrQixFQUFBO0FBR3BCO0VBQ0UsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixrQkFBa0I7RUNoQ3BCLGVEa0NtQztFQzlCbkMsZ0RGMEV1RCxFQUFBO0FDekN2RDtFQUNFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHlCQUE4QjtVQUE5Qiw4QkFBOEI7RUN2Q2hDLGVEOENtQztFQzFDbkMsZ0RGMEV1RCxFQUFBO0FDekN0RDtJQU1HLG1CQUFtQixFQUFBO0FBTXZCO0VBQ0UsaUJBQWlCO0VDbERuQixlRG9EaUM7RUNoRGpDLDZDRjRFa0QsRUFBQTtBQ3pCbEQ7RUFDRSx1QkFBdUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL21lYWwtZG9uYXRpb25zL2NvbXBvbmVudHMvZG9uYXRlLW1vZGFsL2RvbmF0ZS1tb2RhbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBJb25pYyBDU1MgVmFyaWFibGVzICoqL1xyXG46cm9vdCB7XHJcbiAgLyoqIHByaW1hcnkgKiovXHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeTogIzAwNWNiOTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXJnYjogMCwgOTIsIDE4NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGU6ICMwMDUxYTM7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS10aW50OiAjMWE2Y2MwO1xyXG5cclxuICAvKiogc2Vjb25kYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeTogIzBjZDFlODtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktcmdiOiAxMiwgMjA5LCAyMzI7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXNoYWRlOiAjMGJiOGNjO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS10aW50OiAjMjRkNmVhO1xyXG5cclxuICAvKiogdGVydGlhcnkgKiovXHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnk6ICM3MDQ0ZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktcmdiOiAxMTIsIDY4LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXNoYWRlOiAjNjMzY2UwO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXRpbnQ6ICM3ZTU3ZmY7XHJcblxyXG4gIC8qKiBzdWNjZXNzICoqL1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3M6ICMxMGRjNjA7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2I6IDE2LCAyMjAsIDk2O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZTogIzBlYzI1NDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXRpbnQ6ICMyOGUwNzA7XHJcblxyXG4gIC8qKiB3YXJuaW5nICoqL1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmc6ICNmZmNlMDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1yZ2I6IDI1NSwgMjA2LCAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1zaGFkZTogI2UwYjUwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXRpbnQ6ICNmZmQzMWE7XHJcblxyXG4gIC8qKiBkYW5nZXIgKiovXHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyOiAjZjA0MTQxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1yZ2I6IDI0NSwgNjEsIDYxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1zaGFkZTogI2QzMzkzOTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItdGludDogI2YyNTQ1NDtcclxuXHJcbiAgLyoqIGRhcmsgKiovXHJcbiAgLS1pb24tY29sb3ItZGFyazogIzIyMjQyODtcclxuICAtLWlvbi1jb2xvci1kYXJrLXJnYjogMzQsIDM0LCAzNDtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstc2hhZGU6ICMxZTIwMjM7XHJcbiAgLS1pb24tY29sb3ItZGFyay10aW50OiAjMzgzYTNlO1xyXG5cclxuICAvKiogbWVkaXVtICoqL1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bTogIzk4OWFhMjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tcmdiOiAxNTIsIDE1NCwgMTYyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZTogIzg2ODg4ZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tdGludDogI2EyYTRhYjtcclxuXHJcbiAgLyoqIGxpZ2h0ICoqL1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0OiAjZjRmNWY4O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXJnYjogMjQ0LCAyNDQsIDI0NDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdDogIzAwMDAwMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdC1yZ2I6IDAsIDAsIDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtc2hhZGU6ICNkN2Q4ZGE7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtdGludDogI2Y1ZjZmOTtcclxuXHJcbiAgLy8gLS1pb24tZ3JpZC13aWR0aC1zbTogMHB4O1xyXG59XHJcblxyXG4vLyBGT05UU1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiRmb250LW51bml0by1yZWd1bGFyOiAnTnVuaXRvIFJlZ3VsYXInLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLXNlbWlib2xkOiAnTnVuaXRvIFNlbWlCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1oZWF2eTogJ051bml0byBCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcblxyXG4vLyBDT0xPUlNcclxuXHJcbiRjb2xvci12ZXJ5LWxpZ2h0LWdyYXk6ICNjY2M7XHJcbiRjb2xvci1saW5rLXdhdGVyOiAjZDRkNmQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2U5ZTllOTtcclxuJGNvbG9yLWRhcmstZ3JheTogI2FhYTtcclxuJGNvbG9yLWR1c3R5LWdyYXk6ICM5Nzk3OTc7XHJcbiRjb2xvci1kaW0tZ3JheTogIzZlNmU2ZTtcclxuJGNvbG9yLXNvbGl0dWRlOiAjRUNGMUY4O1xyXG4kY29sb3ItbmlnaHQtcmlkZXI6ICMzMzM7XHJcbiRjb2xvci1uYXZ5LWJsdWU6ICMwMDU2ZTY7XHJcbiRjb2xvci1kZW5pbTogIzEzNjBlMDtcclxuJGNvbG9yLWRvZGdlci1ibHVlOiAjMTY2ZGZmO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWUtbGlnaHRlcjogIzJkN2NmZjtcclxuJGNvbG9yLXdoaXRlOiAjZmZmO1xyXG4kY29sb3ItYmxhY2s6ICMwMDA7XHJcbiRjb2xvci13aGl0ZS1zbW9rZTogI2YzZjNmMztcclxuJGNvbG9yLWRlZXAtc2t5LWJsdWU6ICMwMGEwZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzhiYjdmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjODhjOGZmO1xyXG4kY29sb3Itc3Ryb25nLWJsdWU6ICMwMDQzYjM7XHJcbiRjb2xvci1hbGljZS1ibHVlOiAjZjBmM2Y1O1xyXG4kY29sb3Itc2lsdmVyOiAjYzRjNGM0O1xyXG4kY29sb3ItbWF0dGVyaG9ybjogIzUxNTE1MTtcclxuJGNvbG9yLXZlcnktZGFyay1ncmF5OiAjNjI2MjYyO1xyXG4kY29sb3ItbWVyY3VyeTogI2U3ZTdlNztcclxuJGNvbG9yLWxpZ2h0LWdyYXk6ICNkOGQ4ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZWJlYmViO1xyXG4kY29sb3ItYWxpemFyaW46ICNlMjI5NDI7XHJcbiRjb2xvci1mbGFtZS1yZWQ6ICM4ODE5Mjg7XHJcbiRjb2xvci1jaGFyY29hbDogIzQ2NDY0NjtcclxuJGNvbG9yLWRlZXAtc2VhOiAjMTQ3ZDYzO1xyXG4kY29sb3ItY2FyZGluYWw6ICNiNTIxMzU7XHJcbiRjb2xvci1nb2QtZ3JheTogIzE2MTYxNjtcclxuJGNvbG9yLWhvdC1jdXJyeTogIzdjNWQyMztcclxuJGNvbG9yLWNhc2FibGFuY2E6ICNmN2JhNDU7XHJcbiRjb2xvci1hbGFiYXN0ZXI6ICNmN2Y3Zjc7XHJcbiRwb3JjZWxhaW46ICNlNmU5ZWI7XHJcbiRjb2xvci1oYXJsZXktZGF2aWRzb24tb3JhbmdlOiAjRDA0MzFBO1xyXG4kY29sb3ItcGF0dGVucy1ibHVlOiAjZTBlM2U1O1xyXG5cclxuLy8vIFNpemVcclxuJGJvdHRvbS1uYXZpZ2F0aW9uLWJhci1oZWlnaHQ6IDUwcHg7XHJcbiIsIkBpbXBvcnQgJ3Rvb2xzJztcclxuXHJcbi5kZXBvc2l0LW1vZGFsIHtcclxuICAmX19oZWFkZXIge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRjb2xvci13aGlzcGVyO1xyXG4gIH1cclxuXHJcbiAgJl9fdGl0bGUge1xyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8taGVhdnkoMjBweCk7XHJcbiAgfVxyXG5cclxuICAmX190aXRsZS1sYWJlbCB7XHJcbiAgICBjb2xvcjogIzQ2NDY0NjtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgzMnB4KTtcclxuICB9XHJcblxyXG4gICZfX3N1Yi10aXRsZSB7XHJcbiAgICBjb2xvcjogIzQ2NDY0NjtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDAgNDBweDtcclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1yZWd1bGFyKDE2cHgpO1xyXG4gIH1cclxuXHJcbiAgJl9faW1nLXdyYXBwZXIge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgJl9faW5mby1jb250YWluZXIge1xyXG4gICAgbWFyZ2luOiAxMHB4IDAgMDtcclxuICAgIGJhY2tncm91bmQ6ICNmN2Y3Zjc7XHJcbiAgICBwYWRkaW5nOiAxNnB4IDIwcHg7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tcmVndWxhcigxNnB4KTtcclxuICB9XHJcblxyXG4gICZfX2xhYmVsIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblxyXG4gICAgJjpudGgtY2hpbGQoMSksXHJcbiAgICAmOm50aC1jaGlsZCgyKSB7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgICB9XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tcmVndWxhcigxNnB4KTtcclxuICB9XHJcblxyXG4gICZfX3ZhbHVlIHtcclxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDE2cHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fZm9vdGVye1xyXG4gICAgcGFkZGluZzogMTBweCAxMHB4IDUwcHg7XHJcbiAgfVxyXG59XHJcbiIsIkBtaXhpbiBmb250LXNpemUoJGZvbnQtc2l6ZSkge1xyXG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtZmFtaWx5KCRmb250LWZhbWlseSkge1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1yZWd1bGFyKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXJlZ3VsYXIpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tc2VtaWJvbGQoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tc2VtaWJvbGQpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8taGVhdnkoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8taGVhdnkpO1xyXG59XHJcblxyXG5AbWl4aW4gbGluay1jb2xvcigkY29sb3IpIHtcclxuICBjb2xvcjogJGNvbG9yO1xyXG5cclxuICAmOmxpbmssXHJcbiAgJjp2aXNpdGVkLFxyXG4gICY6Zm9jdXMsXHJcbiAgJjpob3ZlcixcclxuICAmOmFjdGl2ZSB7XHJcbiAgICBjb2xvcjogJGNvbG9yO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGhvdmVyIHtcclxuICAmOmhvdmVyLFxyXG4gICY6Zm9jdXMge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZGlzYWJsZWQge1xyXG4gICYuZGlzYWJsZWQsXHJcbiAgJi5kaXNhYmxlZDpmb2N1cyxcclxuICAmLmRpc2FibGVkOmhvdmVyLFxyXG4gICZbZGlzYWJsZWRdLFxyXG4gICZbZGlzYWJsZWRdOmZvY3VzLFxyXG4gICZbZGlzYWJsZWRdOmhvdmVyIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGVsbGlwc2lzIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxuXHJcbkBtaXhpbiBmbG9hdGluZy1sYWJlbCgkY29sb3IpIHtcclxuICBmb250LXNpemU6IDc1JTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDE1JSwgLTUwJSwgMCk7XHJcbiAgb3BhY2l0eTogMTtcclxuICBiYWNrZ3JvdW5kOiAkY29sb3Itd2hpdGU7XHJcbiAgcGFkZGluZzogMCAzcHg7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24oKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci13aGl0ZTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi5zdmcnKTtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICByaWdodDogMTVweDtcclxuICAgIHdpZHRoOiAxNHB4O1xyXG4gICAgaGVpZ2h0OiA5cHg7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWFjdGl2ZSgpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWFjdGl2ZS5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1lcnJvcigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWVycm9yLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/components/donate-modal/donate-modal.component.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/components/donate-modal/donate-modal.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: DonateModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DonateModalComponent", function() { return DonateModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");




var DonateModalComponent = /** @class */ (function () {
    function DonateModalComponent(modalController) {
        this.modalController = modalController;
    }
    DonateModalComponent.prototype.onClickedDone = function () {
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
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DonateModalComponent.prototype, "data", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], DonateModalComponent.prototype, "completeMessage$", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], DonateModalComponent.prototype, "headerTitle$", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], DonateModalComponent.prototype, "dialogLabelSuccess$", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], DonateModalComponent.prototype, "buttonDone$", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], DonateModalComponent.prototype, "donateAmount$", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], DonateModalComponent.prototype, "account$", void 0);
    DonateModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-donate-modal',
            template: __webpack_require__(/*! ./donate-modal.component.html */ "./src/app/sections/accounts/pages/meal-donations/components/donate-modal/donate-modal.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./donate-modal.component.scss */ "./src/app/sections/accounts/pages/meal-donations/components/donate-modal/donate-modal.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]])
    ], DonateModalComponent);
    return DonateModalComponent;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/components/donate-modal/donate-modal.module.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/components/donate-modal/donate-modal.module.ts ***!
  \*******************************************************************************************************/
/*! exports provided: DonateModalModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DonateModalModule", function() { return DonateModalModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _shared_pipes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/pipes */ "./src/app/shared/pipes/index.ts");
/* harmony import */ var _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/ui-components/st-button/st-button.module */ "./src/app/shared/ui-components/st-button/st-button.module.ts");
/* harmony import */ var _donate_modal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./donate-modal.component */ "./src/app/sections/accounts/pages/meal-donations/components/donate-modal/donate-modal.component.ts");







var DonateModalModule = /** @class */ (function () {
    function DonateModalModule() {
    }
    DonateModalModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _shared_pipes__WEBPACK_IMPORTED_MODULE_4__["TransactionUnitsPipeModule"],
                _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_5__["StButtonModule"]
            ],
            providers: [],
            declarations: [_donate_modal_component__WEBPACK_IMPORTED_MODULE_6__["DonateModalComponent"]],
            exports: [_donate_modal_component__WEBPACK_IMPORTED_MODULE_6__["DonateModalComponent"]]
        })
    ], DonateModalModule);
    return DonateModalModule;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/components/donate-modal/index.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/components/donate-modal/index.ts ***!
  \*****************************************************************************************/
/*! exports provided: DonateModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _donate_modal_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./donate-modal.component */ "./src/app/sections/accounts/pages/meal-donations/components/donate-modal/donate-modal.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DonateModalComponent", function() { return _donate_modal_component__WEBPACK_IMPORTED_MODULE_0__["DonateModalComponent"]; });




/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/meal-donations.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/meal-donations.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-header\r\n  [title]=\"contentStrings.headerTitle | async\"\r\n  [isTitleShow]=\"true\"\r\n  [backButtonIcon]=\"'ios-close'\"\r\n  [backButtonTitle]=\"''\"\r\n  [isToolbarShow]=\"true\"\r\n  class=\"meals-donate__header\"\r\n></st-header>\r\n<ion-content class=\"meals-donate__content\" *ngIf=\"showContent\">\r\n  <div class=\"meals-donate__description-wrapper\">\r\n    {{contentStrings.donationInstructions | async}}\r\n  </div>\r\n  <form class=\"request-funds__form\" *ngIf=\"(formHasBeenPrepared | async)\" [formGroup]=\"mealsForm\">\r\n    <div class=\"meals-donate__accounts\">\r\n      <st-select-floating-label\r\n        [label]=\"contentStrings.fundingAccounts | async\"\r\n        [formControlName]=\"controlsNames.account\"\r\n        [control]=\"account\"\r\n        [interfaceOptions]=\"customActionSheetOptions\"\r\n        [isError]=\"account.invalid && account.touched\"\r\n        interface=\"action-sheet\"\r\n        idd=\"account\"\r\n      >\r\n        <ng-container role=\"options\">\r\n          <ion-select-option *ngFor=\"let account of (accounts$ | async)\" [value]=\"account\">\r\n            {{ account.accountDisplayName }} ({{ account.balance | transactionUnits: account.accountType }})\r\n          </ion-select-option>\r\n        </ng-container>\r\n\r\n        <ng-container role=\"error\">\r\n          <p class=\"meals-donate__control-error-msg\">\r\n            {{ account.errors?.errorMsg }}\r\n          </p>\r\n        </ng-container>\r\n      </st-select-floating-label>\r\n    </div>\r\n\r\n    <ng-container *ngIf=\"(isFreeFormEnabled$ | async); then freeInput; else fixedInput\"></ng-container>\r\n    <ng-template #fixedInput\r\n      ><div class=\"meals-donate__amount\" (click)=\"isAccountSelected()\">\r\n        <st-select-floating-label\r\n          [label]=\"account.value.accountType | amountLabelControl | async\"\r\n          [formControlName]=\"controlsNames.amount\"\r\n          [control]=\"amount\"\r\n          [interfaceOptions]=\"customActionSheetOptions\"\r\n          [isError]=\"amount.invalid && amount.touched\"\r\n          interface=\"action-sheet\"\r\n          [isDisabled]=\"!account.value\"\r\n          idd=\"amount\"\r\n        >\r\n          <ng-container role=\"options\">\r\n            <ion-select-option [value]=\"amountItem\" *ngFor=\"let amountItem of (fixedAmounts$ | async)\">\r\n              {{ amountItem | transactionUnits: account.value.accountType }}\r\n            </ion-select-option>\r\n          </ng-container>\r\n          <ng-container role=\"error\">\r\n            <p class=\"meals-donate__control-error-msg\">\r\n              {{ amount.errors?.errorMsg }}\r\n            </p>\r\n          </ng-container>\r\n        </st-select-floating-label>\r\n      </div>\r\n    </ng-template>\r\n\r\n    <ng-template #freeInput>\r\n      <div class=\"meals-donate__amount\" (click)=\"isAccountSelected()\">\r\n        <st-input-floating-label\r\n          [label]=\"account.value.accountType | amountLabelControl | async\"\r\n          [isError]=\"amount.invalid && amount.touched\"\r\n          [control]=\"amount\"\r\n          [formControlName]=\"controlsNames.amount\"\r\n          [isDisabled]=\"!account.value\"\r\n          type=\"text\"\r\n          inputmode=\"decimal\"\r\n          idd=\"amount\"\r\n        >\r\n          <p class=\"meals-donate__control-error-msg\">\r\n            {{ amount.errors?.errorMsg }}\r\n          </p>\r\n        </st-input-floating-label>\r\n      </div>\r\n    </ng-template>\r\n  </form>\r\n</ion-content>\r\n<ion-footer mode=\"ios\" class=\"meals-donate__footer\" *ngIf=\"(formHasBeenPrepared | async)\">\r\n  <st-button (onClick)=\"onSubmit()\" [isDisabled]=\"!mealsForm.valid\">\r\n    {{contentStrings.buttonDonate| async}} {{ amount.value && (amount.value | transactionUnits: account.value.accountType) }}\r\n  </st-button>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/meal-donations.component.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/meal-donations.component.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.meals-donate__header {\n  border-bottom: 1px solid #f3f3f3; }\n.meals-donate__content {\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --padding-top: 20px;\n  --padding-bottom: 20px; }\n.meals-donate__description-wrapper {\n  margin: 10px 0;\n  font-size: 15px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.meals-donate__accounts {\n  padding: 20px 0; }\n.meals-donate__amount {\n  padding: 20px 0; }\n.meals-donate__footer {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  padding: 10px 10px 50px;\n  background-color: #fff; }\n.meals-donate__control-error-msg {\n  margin: 0;\n  color: #881928;\n  letter-spacing: 0;\n  min-height: 16px;\n  line-height: 16px;\n  font-size: 12px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvbWVhbC1kb25hdGlvbnMvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvbWVhbC1kb25hdGlvbnMvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxhcHBcXHNlY3Rpb25zXFxhY2NvdW50c1xccGFnZXNcXG1lYWwtZG9uYXRpb25zXFxtZWFsLWRvbmF0aW9ucy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvbWVhbC1kb25hdGlvbnMvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF9jb21tb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBQTtBQUNBO0VBQ0UsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixtQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGdCQUFBO0VBQ0EsOEJBQXNCO0VBQ3RCLHVDQUEwQjtFQUMxQix1Q0FBK0I7RUFDL0IsaURBQW1DO0VBQ25DLG9DQUE0QjtFQUM1QixtQ0FBMkI7RUFFM0IsZUFBQTtFQUNBLDZCQUFxQjtFQUNyQixzQ0FBeUI7RUFDekIsc0NBQThCO0VBQzlCLGdEQUFrQztFQUNsQyxtQ0FBMkI7RUFDM0Isa0NBQTBCO0VBRTFCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixtQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFdBQUE7RUFDQSx5QkFBaUI7RUFDakIsZ0NBQXFCO0VBQ3JCLGtDQUEwQjtFQUMxQiw0Q0FBOEI7RUFDOUIsK0JBQXVCO0VBQ3ZCLDhCQUFzQjtFQUV0QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLHFDQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsWUFBQTtFQUNBLDBCQUFrQjtFQUNsQixvQ0FBc0I7RUFDdEIsbUNBQTJCO0VBQzNCLHVDQUErQjtFQUMvQixnQ0FBd0I7RUFDeEIsK0JBQXVCLEVBQUE7QUNyRXZCO0VBQ0UsZ0NEK0Z1QixFQUFBO0FDNUZ6QjtFQUNFLHFCQUFnQjtFQUNoQixtQkFBYztFQUNkLG1CQUFjO0VBQ2Qsc0JBQWlCLEVBQUE7QUFHbkI7RUFDRSxjQUFjO0VDZGhCLGVEZ0JpQztFQ1pqQyw2Q0Y0RWtELEVBQUE7QUM3RGxEO0VBQ0UsZUFBZSxFQUFBO0FBR2pCO0VBQ0UsZUFBZSxFQUFBO0FBR2pCO0VBQ0Usb0JBQWE7RUFBYixhQUFhO0VBQ2Isd0JBQXVCO1VBQXZCLHVCQUF1QjtFQUN2Qix1QkFBdUI7RUFDdkIsc0JEaUVjLEVBQUE7QUM5RGhCO0VBQ0UsU0FBUztFQUNULGNEMkVxQjtFQzFFckIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUN2Q25CLGVEeUNpQztFQ3JDakMsNkNGNEVrRCxFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvbWVhbC1kb25hdGlvbnMvbWVhbC1kb25hdGlvbnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG4ubWVhbHMtZG9uYXRlIHtcclxuICAmX19oZWFkZXIge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRjb2xvci13aGl0ZS1zbW9rZTtcclxuICB9XHJcblxyXG4gICZfX2NvbnRlbnQge1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAyMHB4O1xyXG4gICAgLS1wYWRkaW5nLWVuZDogMjBweDtcclxuICAgIC0tcGFkZGluZy10b3A6IDIwcHg7XHJcbiAgICAtLXBhZGRpbmctYm90dG9tOiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgJl9fZGVzY3JpcHRpb24td3JhcHBlciB7XHJcbiAgICBtYXJnaW46IDEwcHggMDtcclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgxNXB4KTtcclxuICB9XHJcblxyXG4gICZfX2FjY291bnRzIHtcclxuICAgIHBhZGRpbmc6IDIwcHggMDtcclxuICB9XHJcblxyXG4gICZfX2Ftb3VudCB7XHJcbiAgICBwYWRkaW5nOiAyMHB4IDA7XHJcbiAgfVxyXG5cclxuICAmX19mb290ZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMTBweCAxMHB4IDUwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgfVxyXG5cclxuICAmX19jb250cm9sLWVycm9yLW1zZyB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBjb2xvcjogJGNvbG9yLWZsYW1lLXJlZDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwO1xyXG4gICAgbWluLWhlaWdodDogMTZweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxNnB4O1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDEycHgpO1xyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/meal-donations.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/meal-donations.component.ts ***!
  \************************************************************************************/
/*! exports provided: MealDonationsComponent, REQUEST_MEALS_CONTROL_NAMES, CONTROL_ERROR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MealDonationsComponent", function() { return MealDonationsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_MEALS_CONTROL_NAMES", function() { return REQUEST_MEALS_CONTROL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTROL_ERROR", function() { return CONTROL_ERROR; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _sections_accounts_pages_meal_donations_service_meal_donations_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/accounts/pages/meal-donations/service/meal-donations.service */ "./src/app/sections/accounts/pages/meal-donations/service/meal-donations.service.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/utils/general-helpers */ "./src/app/core/utils/general-helpers.ts");
/* harmony import */ var src_app_app_global__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/app.global */ "./src/app/app.global.ts");
/* harmony import */ var _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");
/* harmony import */ var _components_confirm_donate_popover__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/confirm-donate-popover */ "./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/index.ts");
/* harmony import */ var _components_donate_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/donate-modal */ "./src/app/sections/accounts/pages/meal-donations/components/donate-modal/index.ts");
/* harmony import */ var _sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sections/accounts/pages/meal-donations/meal-donation.config */ "./src/app/sections/accounts/pages/meal-donations/meal-donation.config.ts");
/* harmony import */ var _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @shared/ui-components/st-global-navigation/services/global-nav.service */ "./src/app/shared/ui-components/st-global-navigation/services/global-nav.service.ts");

var _a;














var MealDonationsComponent = /** @class */ (function () {
    function MealDonationsComponent(fb, mealDonationsService, loadingService, toastController, popoverCtrl, modalCtrl, navCtrl, cdRef, globalNav) {
        this.fb = fb;
        this.mealDonationsService = mealDonationsService;
        this.loadingService = loadingService;
        this.toastController = toastController;
        this.popoverCtrl = popoverCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.cdRef = cdRef;
        this.globalNav = globalNav;
        this.formHasBeenPrepared = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        this.customActionSheetOptions = {
            cssClass: 'custom-deposit-actionSheet',
        };
        this.contentStrings = {};
        this.sourceSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subscription"]();
    }
    MealDonationsComponent.prototype.ngOnInit = function () {
        this.globalNav.hideNavBar();
        this.initContentStrings();
        this.updateFormErrorsByContentStrings();
    };
    MealDonationsComponent.prototype.ngOnDestroy = function () {
        this.globalNav.showNavBar();
    };
    MealDonationsComponent.prototype.ionViewWillEnter = function () {
        this.accounts$ = this.mealDonationsService.getAccountsFilteredByMealsTenders();
        this.showContent = true;
        this.isFreeFormEnabled();
        this.initForm();
        this.cdRef.detectChanges();
    };
    MealDonationsComponent.prototype.ionViewWillLeave = function () {
        this.sourceSubscription.unsubscribe();
        this.deleteForm();
        this.showContent = false;
    };
    Object.defineProperty(MealDonationsComponent.prototype, "accountTypes", {
        get: function () {
            return src_app_app_global__WEBPACK_IMPORTED_MODULE_9__["AccountType"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MealDonationsComponent.prototype, "account", {
        get: function () {
            return this.mealsForm.get(this.controlsNames.account);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MealDonationsComponent.prototype, "amount", {
        get: function () {
            return this.mealsForm.get(this.controlsNames.amount);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MealDonationsComponent.prototype, "controlsNames", {
        get: function () {
            return REQUEST_MEALS_CONTROL_NAMES;
        },
        enumerable: true,
        configurable: true
    });
    MealDonationsComponent.prototype.isFreeFormEnabled = function () {
        var _this = this;
        this.isFreeFormEnabled$ = this.mealDonationsService.settings$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (settings) {
            var settingInfo = _this.mealDonationsService.getSettingByName(settings, src_app_app_global__WEBPACK_IMPORTED_MODULE_9__["Settings"].Setting.MEAL_DONATIONS_FREEFORM_ENABLED.split('.')[2]);
            return settingInfo && Boolean(Number(settingInfo.value));
        }));
    };
    MealDonationsComponent.prototype.onSubmit = function () {
        if (this.mealsForm.invalid) {
            this.onErrorRetrieve('Form is invalid');
            return;
        }
        var _a = this.mealsForm.value, account = _a.account, amount = _a.amount;
        var toDecimal = Number(amount).toFixed(2);
        var amountValue = Number(toDecimal);
        this.confirmationDepositPopover({ account: account, amountValue: amountValue });
    };
    MealDonationsComponent.prototype.confirmationDepositPopover = function (data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var popover;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: _components_confirm_donate_popover__WEBPACK_IMPORTED_MODULE_11__["ConfirmDonatePopoverComponent"],
                            componentProps: {
                                data: data,
                                policyTitle$: this.contentStrings.donationPolicyTitle,
                                policyContent$: this.contentStrings.donationPolicyContent,
                                buttonDonate$: this.contentStrings.buttonDonate,
                                buttonCancel$: this.contentStrings.buttonCancel,
                                confirmationTitle$: this.contentStrings.donationConfirmationTitle,
                                donateAmount$: this.contentStrings.donateAmount,
                                account$: this.contentStrings.labelAccount,
                            },
                            animated: false,
                            backdropDismiss: true,
                        })];
                    case 1:
                        popover = _a.sent();
                        popover.onDidDismiss().then(function (_a) {
                            var role = _a.role;
                            if (role === _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_10__["BUTTON_TYPE"].OKAY) {
                                _this.loadingService.showSpinner();
                                _this.mealDonationsService
                                    .donate(data.account.id, data.amountValue)
                                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["finalize"])(function () { return _this.loadingService.closeSpinner(); }))
                                    .subscribe(function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.showModal(data)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                }); }); }, function () { return _this.onErrorRetrieve('Something went wrong, please try again...'); });
                            }
                        });
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MealDonationsComponent.prototype.isAccountSelected = function () {
        if (!this.account.value) {
            this.onErrorRetrieve(CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.account].required);
        }
    };
    MealDonationsComponent.prototype.initForm = function () {
        var _a;
        var accountErrors = [
            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_8__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.account].required),
        ];
        this.mealsForm = this.fb.group((_a = {},
            _a[this.controlsNames.account] = ['', accountErrors],
            _a[this.controlsNames.amount] = ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            _a));
        this.accountChangesHandler();
        this.formHasBeenPrepared.next(true);
    };
    MealDonationsComponent.prototype.accountChangesHandler = function () {
        var _this = this;
        var subscription = this.account.valueChanges.subscribe(function (_a) {
            var balance = _a.balance, accountType = _a.accountType;
            _this.maxAmount = balance.toFixed(2);
            _this.setFixedAmount(accountType);
            _this.setAmountValidators(accountType);
            _this.amount.reset();
        });
        this.sourceSubscription.add(subscription);
    };
    MealDonationsComponent.prototype.setAmountValidators = function (accountType) {
        var _this = this;
        var amountError = [
            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_8__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].required),
            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_8__["formControlErrorDecorator"])(function (control) { return _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].max(_this.maxAmount)(control); }, CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].max),
            accountType === src_app_app_global__WEBPACK_IMPORTED_MODULE_9__["AccountType"].MEALS
                ? Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_8__["formControlErrorDecorator"])(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_8__["validateInteger"], CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].mealInput)
                : Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_8__["formControlErrorDecorator"])(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_8__["validateInputAmount"], CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].currency),
        ];
        this.amount.setValidators(amountError);
    };
    MealDonationsComponent.prototype.setFixedAmount = function (accountType) {
        var _this = this;
        this.fixedAmounts$ = this.mealDonationsService.settings$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (settings) {
            var settingInfo = _this.mealDonationsService.getSettingByName(settings, accountType === src_app_app_global__WEBPACK_IMPORTED_MODULE_9__["AccountType"].MEALS
                ? src_app_app_global__WEBPACK_IMPORTED_MODULE_9__["Settings"].Setting.MEAL_DONATIONS_FIXED_MEAL_AMOUNTS.split('.')[2]
                : src_app_app_global__WEBPACK_IMPORTED_MODULE_9__["Settings"].Setting.MEAL_DONATIONS_FIXED_DOLLAR_AMOUNTS.split('.')[2]);
            return settingInfo && Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_8__["parseArrayFromString"])(settingInfo.value);
        }));
    };
    MealDonationsComponent.prototype.showModal = function (data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: _components_donate_modal__WEBPACK_IMPORTED_MODULE_12__["DonateModalComponent"],
                            animated: true,
                            componentProps: {
                                data: data,
                                headerTitle$: this.contentStrings.headerTitle,
                                dialogLabelSuccess$: this.contentStrings.dialogLabelSuccess,
                                completeMessage$: this.contentStrings.completeMessage,
                                buttonDone$: this.contentStrings.buttonDone,
                                donateAmount$: this.contentStrings.donateAmount,
                                account$: this.contentStrings.labelAccount,
                            },
                            backdropDismiss: true,
                        })];
                    case 1:
                        modal = _a.sent();
                        modal
                            .onDidDismiss()
                            .then(function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.navCtrl.navigateBack([src_app_app_global__WEBPACK_IMPORTED_MODULE_9__["PATRON_NAVIGATION"].accounts])];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MealDonationsComponent.prototype.onErrorRetrieve = function (message) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: 5000,
                            position: 'top',
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    MealDonationsComponent.prototype.deleteForm = function () {
        this.mealsForm = null;
        this.formHasBeenPrepared.next(false);
    };
    MealDonationsComponent.prototype.initContentStrings = function () {
        this.contentStrings.headerTitle = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].headerTitle);
        this.contentStrings.buttonDonate = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].buttonDonate);
        this.contentStrings.buttonCancel = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].buttonCancel);
        this.contentStrings.fundingAccounts = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].fundingAccounts);
        this.contentStrings.donationInstructions = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].donationInstructions);
        this.contentStrings.donationPolicyTitle = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].donationPolicyTitle);
        this.contentStrings.donationPolicyContent = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].donationPolicyContent);
        this.contentStrings.buttonDonate = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].buttonDonate);
        this.contentStrings.donationConfirmationTitle = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].donationConfirmationTitle);
        this.contentStrings.donateAmount = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].donateAmount);
        this.contentStrings.labelAccount = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].labelAccount);
        this.contentStrings.buttonDone = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].buttonDone);
        this.contentStrings.completeMessage = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].completeMessage);
        this.contentStrings.dialogLabelSuccess = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].dialogLabelSuccess);
        //Form Error String
        this.contentStrings.formErrorEmpty = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].formErrorEmpty);
        this.contentStrings.formErrorInsufficientFunds = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].formErrorInsufficientFunds);
        this.contentStrings.formErrorInvalideFormat = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].formErrorInvalideFormat);
        this.contentStrings.formErrorSelectedAccount = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].formErrorSelectedAccount);
        this.contentStrings.formErrorMealsPositiveWhole = this.getContentStringByName(_sections_accounts_pages_meal_donations_meal_donation_config__WEBPACK_IMPORTED_MODULE_13__["MEAL_CONTENT_STRINGS"].formErrorMealsPositiveWhole);
    };
    MealDonationsComponent.prototype.getContentStringByName = function (name) {
        return this.mealDonationsService.getMealsDonationContentStringByName$(name);
    };
    MealDonationsComponent.prototype.updateFormErrorsByContentStrings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.account];
                        return [4 /*yield*/, this.contentStrings.formErrorSelectedAccount
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
                                .toPromise()];
                    case 1:
                        _a.required = _f.sent();
                        _b = CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount];
                        return [4 /*yield*/, this.contentStrings.formErrorEmpty
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
                                .toPromise()];
                    case 2:
                        _b.required = _f.sent();
                        _c = CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount];
                        return [4 /*yield*/, this.contentStrings.formErrorInsufficientFunds
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
                                .toPromise()];
                    case 3:
                        _c.max = _f.sent();
                        _d = CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount];
                        return [4 /*yield*/, this.contentStrings.formErrorMealsPositiveWhole
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
                                .toPromise()];
                    case 4:
                        _d.mealInput = _f.sent();
                        _e = CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount];
                        return [4 /*yield*/, this.contentStrings.formErrorInvalideFormat
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
                                .toPromise()];
                    case 5:
                        _e.currency = _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MealDonationsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-meal-donations',
            template: __webpack_require__(/*! ./meal-donations.component.html */ "./src/app/sections/accounts/pages/meal-donations/meal-donations.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./meal-donations.component.scss */ "./src/app/sections/accounts/pages/meal-donations/meal-donations.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _sections_accounts_pages_meal_donations_service_meal_donations_service__WEBPACK_IMPORTED_MODULE_6__["MealDonationsService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__["LoadingService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["PopoverController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_14__["GlobalNavService"]])
    ], MealDonationsComponent);
    return MealDonationsComponent;
}());

var REQUEST_MEALS_CONTROL_NAMES;
(function (REQUEST_MEALS_CONTROL_NAMES) {
    REQUEST_MEALS_CONTROL_NAMES["account"] = "account";
    REQUEST_MEALS_CONTROL_NAMES["amount"] = "amount";
})(REQUEST_MEALS_CONTROL_NAMES || (REQUEST_MEALS_CONTROL_NAMES = {}));
var CONTROL_ERROR = (_a = {},
    _a[REQUEST_MEALS_CONTROL_NAMES.account] = {
        required: 'You must choose an account.',
    },
    _a[REQUEST_MEALS_CONTROL_NAMES.amount] = {
        required: 'Please enter an amount',
        max: 'There are not enough funds in the selected account',
        mealInput: 'Please donate a whole, positive number of meals',
        currency: 'Invalid format',
    },
    _a);


/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/meal-donations.module.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/meal-donations.module.ts ***!
  \*********************************************************************************/
/*! exports provided: MealDonationsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MealDonationsModule", function() { return MealDonationsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _meal_donations_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./meal-donations.component */ "./src/app/sections/accounts/pages/meal-donations/meal-donations.component.ts");
/* harmony import */ var _meal_donations_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./meal-donations.routing.module */ "./src/app/sections/accounts/pages/meal-donations/meal-donations.routing.module.ts");
/* harmony import */ var _resolver_meal_donations_resolver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./resolver/meal-donations.resolver */ "./src/app/sections/accounts/pages/meal-donations/resolver/meal-donations.resolver.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _shared_ui_components_st_select_floating_label_st_select_floating_label_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @shared/ui-components/st-select-floating-label/st-select-floating-label.module */ "./src/app/shared/ui-components/st-select-floating-label/st-select-floating-label.module.ts");
/* harmony import */ var _shared_ui_components_st_input_floating_label_st_input_floating_label_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @shared/ui-components/st-input-floating-label/st-input-floating-label.module */ "./src/app/shared/ui-components/st-input-floating-label/st-input-floating-label.module.ts");
/* harmony import */ var _shared_pipes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @shared/pipes */ "./src/app/shared/pipes/index.ts");
/* harmony import */ var _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @shared/ui-components/st-button/st-button.module */ "./src/app/shared/ui-components/st-button/st-button.module.ts");
/* harmony import */ var _components_confirm_donate_popover__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/confirm-donate-popover */ "./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/index.ts");
/* harmony import */ var _components_confirm_donate_popover_confirm_donate_popover_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/confirm-donate-popover/confirm-donate-popover.module */ "./src/app/sections/accounts/pages/meal-donations/components/confirm-donate-popover/confirm-donate-popover.module.ts");
/* harmony import */ var _service_meal_donations_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./service/meal-donations.service */ "./src/app/sections/accounts/pages/meal-donations/service/meal-donations.service.ts");
/* harmony import */ var _components_donate_modal__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/donate-modal */ "./src/app/sections/accounts/pages/meal-donations/components/donate-modal/index.ts");
/* harmony import */ var _components_donate_modal_donate_modal_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/donate-modal/donate-modal.module */ "./src/app/sections/accounts/pages/meal-donations/components/donate-modal/donate-modal.module.ts");
/* harmony import */ var _sections_accounts_pages_meal_donations_pipes_amount_label_control_pipe__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @sections/accounts/pages/meal-donations/pipes/amount-label-control.pipe */ "./src/app/sections/accounts/pages/meal-donations/pipes/amount-label-control.pipe.ts");



















var imports = [
    _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
    _meal_donations_routing_module__WEBPACK_IMPORTED_MODULE_6__["MealDonationsRoutingModule"],
    _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_8__["StHeaderModule"],
    _shared_ui_components_st_select_floating_label_st_select_floating_label_module__WEBPACK_IMPORTED_MODULE_9__["StSelectFloatingLabelModule"],
    _shared_ui_components_st_input_floating_label_st_input_floating_label_module__WEBPACK_IMPORTED_MODULE_10__["StInputFloatingLabelModule"],
    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
    _shared_pipes__WEBPACK_IMPORTED_MODULE_11__["TransactionUnitsPipeModule"],
    _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_12__["StButtonModule"],
    _components_confirm_donate_popover_confirm_donate_popover_module__WEBPACK_IMPORTED_MODULE_14__["ConfirmDonatePopoverModule"],
    _components_donate_modal_donate_modal_module__WEBPACK_IMPORTED_MODULE_17__["DonateModalModule"]
];
var declarations = [_meal_donations_component__WEBPACK_IMPORTED_MODULE_5__["MealDonationsComponent"], _sections_accounts_pages_meal_donations_pipes_amount_label_control_pipe__WEBPACK_IMPORTED_MODULE_18__["AmountLabelControlPipe"]];
var providers = [_resolver_meal_donations_resolver__WEBPACK_IMPORTED_MODULE_7__["MealDonationsResolver"], _service_meal_donations_service__WEBPACK_IMPORTED_MODULE_15__["MealDonationsService"]];
var entryComponents = [_components_confirm_donate_popover__WEBPACK_IMPORTED_MODULE_13__["ConfirmDonatePopoverComponent"], _components_donate_modal__WEBPACK_IMPORTED_MODULE_16__["DonateModalComponent"]];
var MealDonationsModule = /** @class */ (function () {
    function MealDonationsModule() {
    }
    MealDonationsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: imports,
            providers: providers,
            entryComponents: entryComponents,
        })
    ], MealDonationsModule);
    return MealDonationsModule;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/meal-donations.routing.module.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/meal-donations.routing.module.ts ***!
  \*****************************************************************************************/
/*! exports provided: MealDonationsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MealDonationsRoutingModule", function() { return MealDonationsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _meal_donations_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./meal-donations.component */ "./src/app/sections/accounts/pages/meal-donations/meal-donations.component.ts");
/* harmony import */ var _resolver_meal_donations_resolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolver/meal-donations.resolver */ "./src/app/sections/accounts/pages/meal-donations/resolver/meal-donations.resolver.ts");





var routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _meal_donations_component__WEBPACK_IMPORTED_MODULE_3__["MealDonationsComponent"],
        resolve: { data: _resolver_meal_donations_resolver__WEBPACK_IMPORTED_MODULE_4__["MealDonationsResolver"] },
    },
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var MealDonationsRoutingModule = /** @class */ (function () {
    function MealDonationsRoutingModule() {
    }
    MealDonationsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({ imports: imports, exports: exports })
    ], MealDonationsRoutingModule);
    return MealDonationsRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/pipes/amount-label-control.pipe.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/pipes/amount-label-control.pipe.ts ***!
  \*******************************************************************************************/
/*! exports provided: AmountLabelControlPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AmountLabelControlPipe", function() { return AmountLabelControlPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sections_accounts_pages_meal_donations_service_meal_donations_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/accounts/pages/meal-donations/service/meal-donations.service */ "./src/app/sections/accounts/pages/meal-donations/service/meal-donations.service.ts");
/* harmony import */ var _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/accounts/accounts.config */ "./src/app/sections/accounts/accounts.config.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _sections_accounts_pages_meal_donations_meal_donation_config_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/accounts/pages/meal-donations/meal-donation.config.ts */ "./src/app/sections/accounts/pages/meal-donations/meal-donation.config.ts");






var AmountLabelControlPipe = /** @class */ (function () {
    function AmountLabelControlPipe(donationsService) {
        this.donationsService = donationsService;
        this.amountLabelControl$ =
            this.donationsService.getMealsDonationContentStringByName$(_sections_accounts_pages_meal_donations_meal_donation_config_ts__WEBPACK_IMPORTED_MODULE_5__["MEAL_CONTENT_STRINGS"].amountToDonate);
        this.amountMealsLabelControl$ =
            this.donationsService.getMealsDonationContentStringByName$(_sections_accounts_pages_meal_donations_meal_donation_config_ts__WEBPACK_IMPORTED_MODULE_5__["MEAL_CONTENT_STRINGS"].labelMealsToDonate);
    }
    AmountLabelControlPipe.prototype.transform = function (value) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["iif"])(function () { return Number(value) === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_3__["ACCOUNT_TYPES"].meals; }, this.amountMealsLabelControl$, this.amountLabelControl$);
    };
    AmountLabelControlPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'amountLabelControl',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_sections_accounts_pages_meal_donations_service_meal_donations_service__WEBPACK_IMPORTED_MODULE_2__["MealDonationsService"]])
    ], AmountLabelControlPipe);
    return AmountLabelControlPipe;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/resolver/meal-donations.resolver.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/resolver/meal-donations.resolver.ts ***!
  \********************************************************************************************/
/*! exports provided: MealDonationsResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MealDonationsResolver", function() { return MealDonationsResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var src_app_core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _service_meal_donations_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service/meal-donations.service */ "./src/app/sections/accounts/pages/meal-donations/service/meal-donations.service.ts");
/* harmony import */ var _sections_accounts_services_accounts_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/accounts/services/accounts.service */ "./src/app/sections/accounts/services/accounts.service.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../app.global */ "./src/app/app.global.ts");








var MealDonationsResolver = /** @class */ (function () {
    function MealDonationsResolver(loadingService, mealDonationsService, accountsService) {
        this.loadingService = loadingService;
        this.mealDonationsService = mealDonationsService;
        this.accountsService = accountsService;
    }
    MealDonationsResolver.prototype.resolve = function () {
        var _this = this;
        var requiredSettings = [
            _app_global__WEBPACK_IMPORTED_MODULE_7__["Settings"].Setting.MEAL_DONATIONS_TENDERS,
            _app_global__WEBPACK_IMPORTED_MODULE_7__["Settings"].Setting.MEAL_DONATIONS_FREEFORM_ENABLED,
            _app_global__WEBPACK_IMPORTED_MODULE_7__["Settings"].Setting.MEAL_DONATIONS_FIXED_DOLLAR_AMOUNTS,
            _app_global__WEBPACK_IMPORTED_MODULE_7__["Settings"].Setting.MEAL_DONATIONS_FIXED_MEAL_AMOUNTS
        ];
        var accountContentStrings = this.accountsService.initContentStringsList();
        var accountsCall = this.mealDonationsService.getUserAccounts();
        var settingsCall = this.mealDonationsService.getUserSettings(requiredSettings);
        var contentStrings = this.mealDonationsService.fetchMealsDonationContentStrings$();
        this.loadingService.showSpinner();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(accountsCall, settingsCall, accountContentStrings, contentStrings).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["finalize"])(function () { return _this.loadingService.closeSpinner(); }));
    };
    MealDonationsResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_3__["LoadingService"],
            _service_meal_donations_service__WEBPACK_IMPORTED_MODULE_5__["MealDonationsService"],
            _sections_accounts_services_accounts_service__WEBPACK_IMPORTED_MODULE_6__["AccountsService"]])
    ], MealDonationsResolver);
    return MealDonationsResolver;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/meal-donations/service/meal-donations.service.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/meal-donations/service/meal-donations.service.ts ***!
  \******************************************************************************************/
/*! exports provided: MealDonationsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MealDonationsService", function() { return MealDonationsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _core_service_commerce_commerce_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/service/commerce/commerce-api.service */ "./src/app/core/service/commerce/commerce-api.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/facades/content-strings/content-strings.facade.service */ "./src/app/core/facades/content-strings/content-strings.facade.service.ts");
/* harmony import */ var src_app_content_strings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/content-strings */ "./src/app/content-strings.ts");
/* harmony import */ var _core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/utils/general-helpers */ "./src/app/core/utils/general-helpers.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../app.global */ "./src/app/app.global.ts");










var MealDonationsService = /** @class */ (function () {
    function MealDonationsService(commerceApiService, contentStringFacade, settingsFacadeService) {
        this.commerceApiService = commerceApiService;
        this.contentStringFacade = contentStringFacade;
        this.settingsFacadeService = settingsFacadeService;
        this._accounts$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._settings$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
    }
    Object.defineProperty(MealDonationsService.prototype, "accounts$", {
        get: function () {
            return this._accounts$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MealDonationsService.prototype, "_accounts", {
        set: function (value) {
            this._accounts$.next(value.slice());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MealDonationsService.prototype, "settings$", {
        get: function () {
            return this._settings$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MealDonationsService.prototype, "_settings", {
        set: function (value) {
            this._settings$.next(value.slice());
        },
        enumerable: true,
        configurable: true
    });
    MealDonationsService.prototype.fetchMealsDonationContentStringByName$ = function (name) {
        return this.contentStringFacade.fetchContentString$(src_app_content_strings__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STINGS_DOMAINS"].patronUi, src_app_content_strings__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STINGS_CATEGORIES"].mealDonation, name);
    };
    MealDonationsService.prototype.getMealsDonationContentStringByName$ = function (name) {
        return this.contentStringFacade.getContentStringValue$(src_app_content_strings__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STINGS_DOMAINS"].patronUi, src_app_content_strings__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STINGS_CATEGORIES"].mealDonation, name);
    };
    MealDonationsService.prototype.fetchMealsDonationContentStrings$ = function () {
        return this.contentStringFacade.fetchContentStrings$(src_app_content_strings__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STINGS_DOMAINS"].patronUi, src_app_content_strings__WEBPACK_IMPORTED_MODULE_6__["CONTENT_STINGS_CATEGORIES"].mealDonation);
    };
    MealDonationsService.prototype.getUserAccounts = function () {
        var _this = this;
        return this.commerceApiService.getUserAccounts().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (accounts) { return (_this._accounts = accounts); }));
    };
    MealDonationsService.prototype.getSettingByName = function (settings, name) {
        return settings.find(function (_a) {
            var n = _a.name;
            return n === name;
        });
    };
    MealDonationsService.prototype.getUserSettings = function (settings) {
        var _this = this;
        var requestArray = settings.map(function (setting) { return _this.settingsFacadeService.getSetting(setting); });
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"].apply(void 0, requestArray).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (settings) { return (_this._settings = settings); }));
    };
    MealDonationsService.prototype.getAccountsFilteredByMealsTenders = function () {
        var _this = this;
        return this.settings$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (settings) {
            var settingInfo = _this.getSettingByName(settings, _app_global__WEBPACK_IMPORTED_MODULE_9__["Settings"].Setting.MEAL_DONATIONS_TENDERS.split('.')[2]);
            return _this.transformStringToArray(settingInfo.value);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (tendersId) {
            return _this.accounts$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (accounts) { return _this.filterAccountsByTenders(tendersId, accounts); }));
        }));
    };
    MealDonationsService.prototype.transformStringToArray = function (value) {
        if (value === null || !value.length)
            return [];
        var result = JSON.parse(value);
        return Array.isArray(result) ? result : [];
    };
    MealDonationsService.prototype.donate = function (accountId, amount) {
        return this.commerceApiService.donate(accountId, amount);
    };
    MealDonationsService.prototype.filterAccountsByTenders = function (accountsId, accounts) {
        return accounts.filter(function (account) { return accountsId.includes(account.accountTender) && Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_7__["isCashlessAccount"])(account); });
    };
    MealDonationsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_service_commerce_commerce_api_service__WEBPACK_IMPORTED_MODULE_3__["CommerceApiService"],
            _core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_5__["ContentStringsFacadeService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_8__["SettingsFacadeService"]])
    ], MealDonationsService);
    return MealDonationsService;
}());



/***/ }),

/***/ "./src/app/sections/accounts/shared/pipes/credit-card-type/credit-card-type.pipe.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/pipes/credit-card-type/credit-card-type.pipe.ts ***!
  \******************************************************************************************/
/*! exports provided: CreditCardTypePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditCardTypePipe", function() { return CreditCardTypePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _accounts_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../accounts.config */ "./src/app/sections/accounts/accounts.config.ts");



var CreditCardTypePipe = /** @class */ (function () {
    function CreditCardTypePipe() {
    }
    CreditCardTypePipe.prototype.transform = function (value) {
        return _accounts_config__WEBPACK_IMPORTED_MODULE_2__["CREDITCARD_TYPE"][parseInt(value) - 1];
    };
    CreditCardTypePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'creditCardType',
        })
    ], CreditCardTypePipe);
    return CreditCardTypePipe;
}());



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
//# sourceMappingURL=pages-meal-donations-meal-donations-module.js.map