(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-request-funds-page-request-funds-module"],{

/***/ "./src/app/sections/accounts/pages/request-funds-page/popover/popover.component.html":
/*!*******************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/request-funds-page/popover/popover.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-popover-layout [popoverConfig]=\"config\">\r\n  <img class=\"success-image\" src=\"/assets/images/big-check-reward.svg\" alt=\"success image\">\r\n  <h3 class=\"title\">{{data.title}}</h3>\r\n  <p class=\"message\">{{data.message}}</p>\r\n</st-popover-layout>\r\n"

/***/ }),

/***/ "./src/app/sections/accounts/pages/request-funds-page/popover/popover.component.scss":
/*!*******************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/request-funds-page/popover/popover.component.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.success-image {\n  -o-object-fit: none;\n     object-fit: none; }\n.title {\n  line-height: 32px;\n  letter-spacing: 0;\n  color: #464646;\n  margin: 0 0 10px 0;\n  font-size: 32px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.message {\n  margin: 0 0 10px 0;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvcmVxdWVzdC1mdW5kcy1wYWdlL3BvcG92ZXIvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvcmVxdWVzdC1mdW5kcy1wYWdlL3BvcG92ZXIvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxhcHBcXHNlY3Rpb25zXFxhY2NvdW50c1xccGFnZXNcXHJlcXVlc3QtZnVuZHMtcGFnZVxccG9wb3ZlclxccG9wb3Zlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvcmVxdWVzdC1mdW5kcy1wYWdlL3BvcG92ZXIvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF9jb21tb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBQTtBQUNBO0VBQ0UsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixtQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGdCQUFBO0VBQ0EsOEJBQXNCO0VBQ3RCLHVDQUEwQjtFQUMxQix1Q0FBK0I7RUFDL0IsaURBQW1DO0VBQ25DLG9DQUE0QjtFQUM1QixtQ0FBMkI7RUFFM0IsZUFBQTtFQUNBLDZCQUFxQjtFQUNyQixzQ0FBeUI7RUFDekIsc0NBQThCO0VBQzlCLGdEQUFrQztFQUNsQyxtQ0FBMkI7RUFDM0Isa0NBQTBCO0VBRTFCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixtQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFdBQUE7RUFDQSx5QkFBaUI7RUFDakIsZ0NBQXFCO0VBQ3JCLGtDQUEwQjtFQUMxQiw0Q0FBOEI7RUFDOUIsK0JBQXVCO0VBQ3ZCLDhCQUFzQjtFQUV0QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLHFDQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsWUFBQTtFQUNBLDBCQUFrQjtFQUNsQixvQ0FBc0I7RUFDdEIsbUNBQTJCO0VBQzNCLHVDQUErQjtFQUMvQixnQ0FBd0I7RUFDeEIsK0JBQXVCLEVBQUE7QUN0RXpCO0VBQ0UsbUJBQWdCO0tBQWhCLGdCQUFnQixFQUFBO0FBR2xCO0VBQ0UsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixjRHdHc0I7RUN2R3RCLGtCQUFrQjtFQ1RsQixlRFcrQjtFQ1AvQiw2Q0Y0RWtELEVBQUE7QUNsRXBEO0VBQ0Usa0JBQWtCO0VDZmxCLGVEaUJpQztFQ2JqQyxnREYwRXVELEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zZWN0aW9ucy9hY2NvdW50cy9wYWdlcy9yZXF1ZXN0LWZ1bmRzLXBhZ2UvcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXHJcbjpyb290IHtcclxuICAvKiogcHJpbWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMDA1Y2I5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiAwLCA5MiwgMTg1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzAwNTFhMztcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XHJcblxyXG4gIC8qKiBzZWNvbmRhcnkgKiovXHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5OiAjMGNkMWU4O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDEyLCAyMDksIDIzMjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMwYmI4Y2M7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XHJcblxyXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2I6IDExMiwgNjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM2MzNjZTA7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcclxuXHJcbiAgLyoqIHN1Y2Nlc3MgKiovXHJcbiAgLS1pb24tY29sb3Itc3VjY2VzczogIzEwZGM2MDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcclxuXHJcbiAgLyoqIHdhcm5pbmcgKiovXHJcbiAgLS1pb24tY29sb3Itd2FybmluZzogI2ZmY2UwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAyMDYsIDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBiNTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcclxuXHJcbiAgLyoqIGRhbmdlciAqKi9cclxuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXJnYjogMjQ1LCA2MSwgNjE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlOiAjZDMzOTM5O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xyXG5cclxuICAvKiogZGFyayAqKi9cclxuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcclxuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XHJcblxyXG4gIC8qKiBtZWRpdW0gKiovXHJcbiAgLS1pb24tY29sb3ItbWVkaXVtOiAjOTg5YWEyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE1MiwgMTU0LCAxNjI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODY4ODhmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xyXG5cclxuICAvKiogbGlnaHQgKiovXHJcbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtcmdiOiAyNDQsIDI0NCwgMjQ0O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1zaGFkZTogI2Q3ZDhkYTtcclxuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xyXG5cclxuICAvLyAtLWlvbi1ncmlkLXdpZHRoLXNtOiAwcHg7XHJcbn1cclxuXHJcbi8vIEZPTlRTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJGZvbnQtbnVuaXRvLXJlZ3VsYXI6ICdOdW5pdG8gUmVndWxhcicsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8tc2VtaWJvbGQ6ICdOdW5pdG8gU2VtaUJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLWhlYXZ5OiAnTnVuaXRvIEJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuXHJcbi8vIENPTE9SU1xyXG5cclxuJGNvbG9yLXZlcnktbGlnaHQtZ3JheTogI2NjYztcclxuJGNvbG9yLWxpbmstd2F0ZXI6ICNkNGQ2ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZTllOWU5O1xyXG4kY29sb3ItZGFyay1ncmF5OiAjYWFhO1xyXG4kY29sb3ItZHVzdHktZ3JheTogIzk3OTc5NztcclxuJGNvbG9yLWRpbS1ncmF5OiAjNmU2ZTZlO1xyXG4kY29sb3Itc29saXR1ZGU6ICNFQ0YxRjg7XHJcbiRjb2xvci1uaWdodC1yaWRlcjogIzMzMztcclxuJGNvbG9yLW5hdnktYmx1ZTogIzAwNTZlNjtcclxuJGNvbG9yLWRlbmltOiAjMTM2MGUwO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWU6ICMxNjZkZmY7XHJcbiRjb2xvci1kb2RnZXItYmx1ZS1saWdodGVyOiAjMmQ3Y2ZmO1xyXG4kY29sb3Itd2hpdGU6ICNmZmY7XHJcbiRjb2xvci1ibGFjazogIzAwMDtcclxuJGNvbG9yLXdoaXRlLXNtb2tlOiAjZjNmM2YzO1xyXG4kY29sb3ItZGVlcC1za3ktYmx1ZTogIzAwYTBmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjOGJiN2ZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4OGM4ZmY7XHJcbiRjb2xvci1zdHJvbmctYmx1ZTogIzAwNDNiMztcclxuJGNvbG9yLWFsaWNlLWJsdWU6ICNmMGYzZjU7XHJcbiRjb2xvci1zaWx2ZXI6ICNjNGM0YzQ7XHJcbiRjb2xvci1tYXR0ZXJob3JuOiAjNTE1MTUxO1xyXG4kY29sb3ItdmVyeS1kYXJrLWdyYXk6ICM2MjYyNjI7XHJcbiRjb2xvci1tZXJjdXJ5OiAjZTdlN2U3O1xyXG4kY29sb3ItbGlnaHQtZ3JheTogI2Q4ZDhkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlYmViZWI7XHJcbiRjb2xvci1hbGl6YXJpbjogI2UyMjk0MjtcclxuJGNvbG9yLWZsYW1lLXJlZDogIzg4MTkyODtcclxuJGNvbG9yLWNoYXJjb2FsOiAjNDY0NjQ2O1xyXG4kY29sb3ItZGVlcC1zZWE6ICMxNDdkNjM7XHJcbiRjb2xvci1jYXJkaW5hbDogI2I1MjEzNTtcclxuJGNvbG9yLWdvZC1ncmF5OiAjMTYxNjE2O1xyXG4kY29sb3ItaG90LWN1cnJ5OiAjN2M1ZDIzO1xyXG4kY29sb3ItY2FzYWJsYW5jYTogI2Y3YmE0NTtcclxuJGNvbG9yLWFsYWJhc3RlcjogI2Y3ZjdmNztcclxuJHBvcmNlbGFpbjogI2U2ZTllYjtcclxuJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U6ICNEMDQzMUE7XHJcbiRjb2xvci1wYXR0ZW5zLWJsdWU6ICNlMGUzZTU7XHJcblxyXG4vLy8gU2l6ZVxyXG4kYm90dG9tLW5hdmlnYXRpb24tYmFyLWhlaWdodDogNTBweDtcclxuIiwiQGltcG9ydCBcInRvb2xzXCI7XHJcblxyXG4uc3VjY2Vzcy1pbWFnZSB7XHJcbiAgb2JqZWN0LWZpdDogbm9uZTtcclxufVxyXG5cclxuLnRpdGxlIHtcclxuICBsaW5lLWhlaWdodDogMzJweDtcclxuICBsZXR0ZXItc3BhY2luZzogMDtcclxuICBjb2xvcjogJGNvbG9yLWNoYXJjb2FsO1xyXG4gIG1hcmdpbjogMCAwIDEwcHggMDtcclxuXHJcbiAgQGluY2x1ZGUgZm9udC1udW5pdG8taGVhdnkoMzJweCk7XHJcbn1cclxuXHJcbi5tZXNzYWdlIHtcclxuICBtYXJnaW46IDAgMCAxMHB4IDA7XHJcblxyXG4gIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXJlZ3VsYXIoMTZweCk7XHJcbn1cclxuIiwiQG1peGluIGZvbnQtc2l6ZSgkZm9udC1zaXplKSB7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1mYW1pbHkoJGZvbnQtZmFtaWx5KSB7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXJlZ3VsYXIoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tcmVndWxhcik7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1zZW1pYm9sZCgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1zZW1pYm9sZCk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1oZWF2eSgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1oZWF2eSk7XHJcbn1cclxuXHJcbkBtaXhpbiBsaW5rLWNvbG9yKCRjb2xvcikge1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcblxyXG4gICY6bGluayxcclxuICAmOnZpc2l0ZWQsXHJcbiAgJjpmb2N1cyxcclxuICAmOmhvdmVyLFxyXG4gICY6YWN0aXZlIHtcclxuICAgIGNvbG9yOiAkY29sb3I7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gaG92ZXIge1xyXG4gICY6aG92ZXIsXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBkaXNhYmxlZCB7XHJcbiAgJi5kaXNhYmxlZCxcclxuICAmLmRpc2FibGVkOmZvY3VzLFxyXG4gICYuZGlzYWJsZWQ6aG92ZXIsXHJcbiAgJltkaXNhYmxlZF0sXHJcbiAgJltkaXNhYmxlZF06Zm9jdXMsXHJcbiAgJltkaXNhYmxlZF06aG92ZXIge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZWxsaXBzaXMge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxuQG1peGluIGZsb2F0aW5nLWxhYmVsKCRjb2xvcikge1xyXG4gIGZvbnQtc2l6ZTogNzUlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTUlLCAtNTAlLCAwKTtcclxuICBvcGFjaXR5OiAxO1xyXG4gIGJhY2tncm91bmQ6ICRjb2xvci13aGl0ZTtcclxuICBwYWRkaW5nOiAwIDNweDtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLnN2ZycpO1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgd2lkdGg6IDE0cHg7XHJcbiAgICBoZWlnaHQ6IDlweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgei1pbmRleDogMTtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tYWN0aXZlKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tYWN0aXZlLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWVycm9yKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tZXJyb3Iuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/sections/accounts/pages/request-funds-page/popover/popover.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/request-funds-page/popover/popover.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: PopoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverComponent", function() { return PopoverComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sections_rewards_rewards_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/rewards/rewards.config */ "./src/app/sections/rewards/rewards.config.ts");
/* harmony import */ var _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");




var PopoverComponent = /** @class */ (function () {
    function PopoverComponent() {
    }
    PopoverComponent.prototype.ngOnInit = function () {
        this.config = {
            type: _sections_rewards_rewards_config__WEBPACK_IMPORTED_MODULE_2__["PopupTypes"].CANCEL,
            title: null,
            buttons: [tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_3__["buttons"].CLOSE, { label: 'done' })],
            message: '',
            code: 'center',
        };
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PopoverComponent.prototype, "data", void 0);
    PopoverComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-popover',
            template: __webpack_require__(/*! ./popover.component.html */ "./src/app/sections/accounts/pages/request-funds-page/popover/popover.component.html"),
            styles: [__webpack_require__(/*! ./popover.component.scss */ "./src/app/sections/accounts/pages/request-funds-page/popover/popover.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PopoverComponent);
    return PopoverComponent;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/request-funds-page/request-funds-page.component.html":
/*!**********************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/request-funds-page/request-funds-page.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-header title=\"Request funds\"\r\n           [isTitleShow]=\"true\"\r\n           [backButtonIcon]=\"'ios-close'\"\r\n           [backButtonTitle]=\"''\"\r\n           [isToolbarShow]=\"true\"></st-header>\r\n\r\n<ion-content class=\"request-funds ion-padding\">\r\n  <ng-container *ngIf=\"(accounts$ | async).length; else emptyContent\">\r\n    <p class=\"request-funds__info-msg\">Email a friend or family member to request a deposit to your account.</p>\r\n\r\n    <form class=\"request-funds__form\"\r\n          [formGroup]=\"requestFundsForm\"\r\n          novalidate>\r\n      <st-input-floating-label [isError]=\"name.invalid && name.touched\"\r\n                               [control]=\"name\"\r\n                               [formControlName]=\"controlsNames.name\"\r\n                               title=\"Enter name\"\r\n                               class=\"request-funds__control\"\r\n                               type=\"text\"\r\n                               idd=\"name\"\r\n                               label=\"Name\">\r\n        <p class=\"request-funds__control-error-msg\">\r\n          {{ name.errors?.errorMsg }}\r\n        </p>\r\n      </st-input-floating-label>\r\n\r\n      <st-input-floating-label [isError]=\"email.invalid && email.touched\"\r\n                               [control]=\"email\"\r\n                               [formControlName]=\"controlsNames.email\"\r\n                               title=\"Enter email\"\r\n                               class=\"request-funds__control\"\r\n                               type=\"email\"\r\n                               idd=\"email\"\r\n                               label=\"Email Address\">\r\n        <p class=\"request-funds__control-error-msg\">\r\n          {{ email.errors?.errorMsg }}\r\n        </p>\r\n      </st-input-floating-label>\r\n\r\n      <st-select-floating-label (focus)=\"onFocus()\"\r\n                                [formControlName]=\"controlsNames.account\"\r\n                                [control]=\"accounts\"\r\n                                [interfaceOptions]=\"customActionSheetOptions\"\r\n                                [isError]=\"accounts.invalid && accounts.touched\"\r\n                                class=\"request-funds__control\"\r\n                                interface=\"action-sheet\"\r\n                                title=\"Choose an account from a dropdown list below\"\r\n                                label=\"Select Your Account\"\r\n                                idd=\"accounts\">\r\n        <ng-container role=\"options\">\r\n          <ion-select-option *ngFor=\"let account of (accounts$ | async); trackBy: accountTrack\"\r\n                             [value]=\"account.id\">\r\n            {{ account.accountDisplayName }} ({{ account.balance | transactionUnits: account.accountType }})\r\n          </ion-select-option>\r\n        </ng-container>\r\n\r\n        <ng-container role=\"error\">\r\n          <p class=\"request-funds__control-error-msg\">\r\n            {{ accounts.errors?.errorMsg }}\r\n          </p>\r\n        </ng-container>\r\n      </st-select-floating-label>\r\n\r\n      <st-textarea-floating-label [control]=\"message\"\r\n                                  [isError]=\"message.invalid && message.touched\"\r\n                                  [formControlName]=\"controlsNames.message\"\r\n                                  class=\"request-funds__control\"\r\n                                  idd=\"message\"\r\n                                  label=\"Message\"\r\n                                  rows=\"3\">\r\n        <p class=\"request-funds__control-error-msg\">\r\n          {{ message.errors?.errorMsg }}\r\n        </p>\r\n      </st-textarea-floating-label>\r\n    </form>\r\n  </ng-container>\r\n</ion-content>\r\n\r\n<ion-footer class=\"request-funds__footer\"\r\n            mode=\"ios\">\r\n  <ng-container *ngIf=\"(accounts$ | async).length; else emptyFooterBtn\">\r\n    <st-button (onClick)=\"onSubmit()\"\r\n               [isDisabled]=\"requestFundsForm.invalid\">\r\n      send request\r\n    </st-button>\r\n  </ng-container>\r\n</ion-footer>\r\n\r\n<ng-template #emptyContent>\r\n  <div class=\"request-funds__empty-container\">\r\n    <img class=\"request-funds__empty-image\"\r\n         src=\"/assets/images/transfer_illustration.svg\"\r\n         alt=\"money transfer image\" />\r\n    <p class=\"request-funds__empty-message\">\r\n      No compatible accounts. You can only request funds for deposit accounts.\r\n    </p>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #emptyFooterBtn>\r\n  <st-button (onClick)=\"back()\">\r\n    back to accounts\r\n  </st-button>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/sections/accounts/pages/request-funds-page/request-funds-page.component.scss":
/*!**********************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/request-funds-page/request-funds-page.component.scss ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.request-funds {\n  padding: 0 10px; }\n.request-funds__info-msg {\n    letter-spacing: 0;\n    font-size: 16px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.request-funds__control {\n    display: block;\n    margin-top: 30px; }\n.request-funds__empty-container {\n    margin-top: 130px; }\n.request-funds__empty-image {\n    display: block;\n    margin: 0 auto; }\n.request-funds__empty-message {\n    color: #515151;\n    text-align: center;\n    padding: 0 40px;\n    font-size: 16px;\n    font-family: \"Nunito Bold\", arial, sans-serif; }\n.request-funds__footer {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    padding: 10px 10px 50px;\n    background-color: #fff; }\n.request-funds__control-error-msg {\n    margin: 0;\n    color: #881928;\n    letter-spacing: 0;\n    min-height: 16px;\n    line-height: 16px;\n    font-size: 12px;\n    font-family: \"Nunito Bold\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvcmVxdWVzdC1mdW5kcy1wYWdlL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL3JlcXVlc3QtZnVuZHMtcGFnZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXGFjY291bnRzXFxwYWdlc1xccmVxdWVzdC1mdW5kcy1wYWdlXFxyZXF1ZXN0LWZ1bmRzLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL3JlcXVlc3QtZnVuZHMtcGFnZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX2NvbW1vbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUFBO0FBQ0E7RUFDRSxjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG1DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsZ0JBQUE7RUFDQSw4QkFBc0I7RUFDdEIsdUNBQTBCO0VBQzFCLHVDQUErQjtFQUMvQixpREFBbUM7RUFDbkMsb0NBQTRCO0VBQzVCLG1DQUEyQjtFQUUzQixlQUFBO0VBQ0EsNkJBQXFCO0VBQ3JCLHNDQUF5QjtFQUN6QixzQ0FBOEI7RUFDOUIsZ0RBQWtDO0VBQ2xDLG1DQUEyQjtFQUMzQixrQ0FBMEI7RUFFMUIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLG1DQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsV0FBQTtFQUNBLHlCQUFpQjtFQUNqQixnQ0FBcUI7RUFDckIsa0NBQTBCO0VBQzFCLDRDQUE4QjtFQUM5QiwrQkFBdUI7RUFDdkIsOEJBQXNCO0VBRXRCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIscUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixZQUFBO0VBQ0EsMEJBQWtCO0VBQ2xCLG9DQUFzQjtFQUN0QixtQ0FBMkI7RUFDM0IsdUNBQStCO0VBQy9CLGdDQUF3QjtFQUN4QiwrQkFBdUIsRUFBQTtBQ3RFekI7RUFDRSxlQUFlLEVBQUE7QUFFZjtJQUNFLGlCQUFpQjtJQ0xuQixlRE9vQztJQ0hwQyxpREYyRXlELEVBQUE7QUNyRXpEO0lBQ0UsY0FBYztJQUNkLGdCQUFnQixFQUFBO0FBR2xCO0lBQ0UsaUJBQWlCLEVBQUE7QUFHbkI7SUFDRSxjQUFjO0lBQ2QsY0FBYyxFQUFBO0FBR2hCO0lBQ0UsY0RnRnNCO0lDL0V0QixrQkFBa0I7SUFDbEIsZUFBZTtJQzNCakIsZUQ2QmlDO0lDekJqQyw2Q0Y0RWtELEVBQUE7QUNoRGxEO0lBQ0Usb0JBQWE7SUFBYixhQUFhO0lBQ2Isd0JBQXVCO1lBQXZCLHVCQUF1QjtJQUN2Qix1QkFBdUI7SUFDdkIsc0JENERjLEVBQUE7QUN6RGhCO0lBQ0UsU0FBUztJQUNULGNEc0VxQjtJQ3JFckIsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixpQkFBaUI7SUM1Q25CLGVEOENpQztJQzFDakMsNkNGNEVrRCxFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvcmVxdWVzdC1mdW5kcy1wYWdlL3JlcXVlc3QtZnVuZHMtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBJb25pYyBDU1MgVmFyaWFibGVzICoqL1xyXG46cm9vdCB7XHJcbiAgLyoqIHByaW1hcnkgKiovXHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeTogIzAwNWNiOTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXJnYjogMCwgOTIsIDE4NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGU6ICMwMDUxYTM7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS10aW50OiAjMWE2Y2MwO1xyXG5cclxuICAvKiogc2Vjb25kYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeTogIzBjZDFlODtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktcmdiOiAxMiwgMjA5LCAyMzI7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXNoYWRlOiAjMGJiOGNjO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS10aW50OiAjMjRkNmVhO1xyXG5cclxuICAvKiogdGVydGlhcnkgKiovXHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnk6ICM3MDQ0ZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktcmdiOiAxMTIsIDY4LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXNoYWRlOiAjNjMzY2UwO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXRpbnQ6ICM3ZTU3ZmY7XHJcblxyXG4gIC8qKiBzdWNjZXNzICoqL1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3M6ICMxMGRjNjA7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2I6IDE2LCAyMjAsIDk2O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZTogIzBlYzI1NDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXRpbnQ6ICMyOGUwNzA7XHJcblxyXG4gIC8qKiB3YXJuaW5nICoqL1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmc6ICNmZmNlMDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1yZ2I6IDI1NSwgMjA2LCAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1zaGFkZTogI2UwYjUwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXRpbnQ6ICNmZmQzMWE7XHJcblxyXG4gIC8qKiBkYW5nZXIgKiovXHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyOiAjZjA0MTQxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1yZ2I6IDI0NSwgNjEsIDYxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1zaGFkZTogI2QzMzkzOTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItdGludDogI2YyNTQ1NDtcclxuXHJcbiAgLyoqIGRhcmsgKiovXHJcbiAgLS1pb24tY29sb3ItZGFyazogIzIyMjQyODtcclxuICAtLWlvbi1jb2xvci1kYXJrLXJnYjogMzQsIDM0LCAzNDtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstc2hhZGU6ICMxZTIwMjM7XHJcbiAgLS1pb24tY29sb3ItZGFyay10aW50OiAjMzgzYTNlO1xyXG5cclxuICAvKiogbWVkaXVtICoqL1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bTogIzk4OWFhMjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tcmdiOiAxNTIsIDE1NCwgMTYyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZTogIzg2ODg4ZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tdGludDogI2EyYTRhYjtcclxuXHJcbiAgLyoqIGxpZ2h0ICoqL1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0OiAjZjRmNWY4O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXJnYjogMjQ0LCAyNDQsIDI0NDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdDogIzAwMDAwMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdC1yZ2I6IDAsIDAsIDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtc2hhZGU6ICNkN2Q4ZGE7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtdGludDogI2Y1ZjZmOTtcclxuXHJcbiAgLy8gLS1pb24tZ3JpZC13aWR0aC1zbTogMHB4O1xyXG59XHJcblxyXG4vLyBGT05UU1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiRmb250LW51bml0by1yZWd1bGFyOiAnTnVuaXRvIFJlZ3VsYXInLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLXNlbWlib2xkOiAnTnVuaXRvIFNlbWlCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1oZWF2eTogJ051bml0byBCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcblxyXG4vLyBDT0xPUlNcclxuXHJcbiRjb2xvci12ZXJ5LWxpZ2h0LWdyYXk6ICNjY2M7XHJcbiRjb2xvci1saW5rLXdhdGVyOiAjZDRkNmQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2U5ZTllOTtcclxuJGNvbG9yLWRhcmstZ3JheTogI2FhYTtcclxuJGNvbG9yLWR1c3R5LWdyYXk6ICM5Nzk3OTc7XHJcbiRjb2xvci1kaW0tZ3JheTogIzZlNmU2ZTtcclxuJGNvbG9yLXNvbGl0dWRlOiAjRUNGMUY4O1xyXG4kY29sb3ItbmlnaHQtcmlkZXI6ICMzMzM7XHJcbiRjb2xvci1uYXZ5LWJsdWU6ICMwMDU2ZTY7XHJcbiRjb2xvci1kZW5pbTogIzEzNjBlMDtcclxuJGNvbG9yLWRvZGdlci1ibHVlOiAjMTY2ZGZmO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWUtbGlnaHRlcjogIzJkN2NmZjtcclxuJGNvbG9yLXdoaXRlOiAjZmZmO1xyXG4kY29sb3ItYmxhY2s6ICMwMDA7XHJcbiRjb2xvci13aGl0ZS1zbW9rZTogI2YzZjNmMztcclxuJGNvbG9yLWRlZXAtc2t5LWJsdWU6ICMwMGEwZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzhiYjdmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjODhjOGZmO1xyXG4kY29sb3Itc3Ryb25nLWJsdWU6ICMwMDQzYjM7XHJcbiRjb2xvci1hbGljZS1ibHVlOiAjZjBmM2Y1O1xyXG4kY29sb3Itc2lsdmVyOiAjYzRjNGM0O1xyXG4kY29sb3ItbWF0dGVyaG9ybjogIzUxNTE1MTtcclxuJGNvbG9yLXZlcnktZGFyay1ncmF5OiAjNjI2MjYyO1xyXG4kY29sb3ItbWVyY3VyeTogI2U3ZTdlNztcclxuJGNvbG9yLWxpZ2h0LWdyYXk6ICNkOGQ4ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZWJlYmViO1xyXG4kY29sb3ItYWxpemFyaW46ICNlMjI5NDI7XHJcbiRjb2xvci1mbGFtZS1yZWQ6ICM4ODE5Mjg7XHJcbiRjb2xvci1jaGFyY29hbDogIzQ2NDY0NjtcclxuJGNvbG9yLWRlZXAtc2VhOiAjMTQ3ZDYzO1xyXG4kY29sb3ItY2FyZGluYWw6ICNiNTIxMzU7XHJcbiRjb2xvci1nb2QtZ3JheTogIzE2MTYxNjtcclxuJGNvbG9yLWhvdC1jdXJyeTogIzdjNWQyMztcclxuJGNvbG9yLWNhc2FibGFuY2E6ICNmN2JhNDU7XHJcbiRjb2xvci1hbGFiYXN0ZXI6ICNmN2Y3Zjc7XHJcbiRwb3JjZWxhaW46ICNlNmU5ZWI7XHJcbiRjb2xvci1oYXJsZXktZGF2aWRzb24tb3JhbmdlOiAjRDA0MzFBO1xyXG4kY29sb3ItcGF0dGVucy1ibHVlOiAjZTBlM2U1O1xyXG5cclxuLy8vIFNpemVcclxuJGJvdHRvbS1uYXZpZ2F0aW9uLWJhci1oZWlnaHQ6IDUwcHg7XHJcbiIsIkBpbXBvcnQgJ3Rvb2xzJztcclxuXHJcbi5yZXF1ZXN0LWZ1bmRzIHtcclxuICBwYWRkaW5nOiAwIDEwcHg7XHJcblxyXG4gICZfX2luZm8tbXNnIHtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwO1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXNlbWlib2xkKDE2cHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fY29udHJvbCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgfVxyXG5cclxuICAmX19lbXB0eS1jb250YWluZXIge1xyXG4gICAgbWFyZ2luLXRvcDogMTMwcHg7XHJcbiAgfVxyXG5cclxuICAmX19lbXB0eS1pbWFnZSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gIH1cclxuXHJcbiAgJl9fZW1wdHktbWVzc2FnZSB7XHJcbiAgICBjb2xvcjogJGNvbG9yLW1hdHRlcmhvcm47XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAwIDQwcHg7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8taGVhdnkoMTZweCk7XHJcbiAgfVxyXG5cclxuICAmX19mb290ZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMTBweCAxMHB4IDUwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgfVxyXG5cclxuICAmX19jb250cm9sLWVycm9yLW1zZyB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBjb2xvcjogJGNvbG9yLWZsYW1lLXJlZDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwO1xyXG4gICAgbWluLWhlaWdodDogMTZweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxNnB4O1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDEycHgpO1xyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/accounts/pages/request-funds-page/request-funds-page.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/request-funds-page/request-funds-page.component.ts ***!
  \********************************************************************************************/
/*! exports provided: RequestFundsPageComponent, REQUEST_FUNDS_CONTROL_NAMES, CONTROL_ERROR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestFundsPageComponent", function() { return RequestFundsPageComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_FUNDS_CONTROL_NAMES", function() { return REQUEST_FUNDS_CONTROL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTROL_ERROR", function() { return CONTROL_ERROR; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _popover_popover_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./popover/popover.component */ "./src/app/sections/accounts/pages/request-funds-page/popover/popover.component.ts");
/* harmony import */ var _sections_accounts_services_accounts_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sections/accounts/services/accounts.service */ "./src/app/sections/accounts/services/accounts.service.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var src_app_app_global__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/app.global */ "./src/app/app.global.ts");
/* harmony import */ var _core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/utils/general-helpers */ "./src/app/core/utils/general-helpers.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
/* harmony import */ var _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @shared/ui-components/st-global-navigation/services/global-nav.service */ "./src/app/shared/ui-components/st-global-navigation/services/global-nav.service.ts");

var _a;














var Keyboard = _capacitor_core__WEBPACK_IMPORTED_MODULE_11__["Plugins"].Keyboard;
var RequestFundsPageComponent = /** @class */ (function () {
    function RequestFundsPageComponent(fb, accountService, loadingService, toastController, popoverCtrl, userFacadeService, settingsFacadeService, nav, globalNav) {
        this.fb = fb;
        this.accountService = accountService;
        this.loadingService = loadingService;
        this.toastController = toastController;
        this.popoverCtrl = popoverCtrl;
        this.userFacadeService = userFacadeService;
        this.settingsFacadeService = settingsFacadeService;
        this.nav = nav;
        this.globalNav = globalNav;
        this.customActionSheetOptions = {
            cssClass: 'custom-deposit-actionSheet',
        };
    }
    Object.defineProperty(RequestFundsPageComponent.prototype, "email", {
        get: function () {
            return this.requestFundsForm.get(this.controlsNames.email);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestFundsPageComponent.prototype, "name", {
        get: function () {
            return this.requestFundsForm.get(this.controlsNames.name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestFundsPageComponent.prototype, "message", {
        get: function () {
            return this.requestFundsForm.get(this.controlsNames.message);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestFundsPageComponent.prototype, "accounts", {
        get: function () {
            return this.requestFundsForm.get(this.controlsNames.account);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestFundsPageComponent.prototype, "controlsNames", {
        get: function () {
            return REQUEST_FUNDS_CONTROL_NAMES;
        },
        enumerable: true,
        configurable: true
    });
    RequestFundsPageComponent.prototype.ngOnInit = function () {
        this.globalNav.hideNavBar();
        this.accounts$ = this.accountService
            .getAccountsFilteredByDepositTenders()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (accounts) { return accounts.filter(function (account) { return account.depositAccepted; }); }));
        this.initForm();
    };
    RequestFundsPageComponent.prototype.ngOnDestroy = function () {
        this.globalNav.showNavBar();
    };
    RequestFundsPageComponent.prototype.accountTrack = function (n, _a) {
        var id = _a.id;
        return id;
    };
    RequestFundsPageComponent.prototype.onSubmit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, n, _c, e, _d, m, _e, a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (this.requestFundsForm.invalid) {
                            return [2 /*return*/];
                        }
                        _a = this.requestFundsForm.getRawValue(), _b = this.controlsNames.name, n = _a[_b], _c = this.controlsNames.email, e = _a[_c], _d = this.controlsNames.message, m = _a[_d], _e = this.controlsNames.account, a = _a[_e];
                        return [4 /*yield*/, this.loadingService.showSpinner()];
                    case 1:
                        _f.sent();
                        this.settingsFacadeService
                            .getUserSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_9__["User"].Settings.QUICK_AMOUNT)
                            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (_a) {
                            var v = _a.value;
                            return _this.userFacadeService.requestDeposit$(n, e, m, a, v);
                        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
                            .subscribe(function (_a) {
                            var response = _a.response;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this.loadingService.closeSpinner()];
                                        case 1:
                                            _b.sent();
                                            response ? this.showModal() : this.showToast();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        }, function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.loadingService.closeSpinner()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    RequestFundsPageComponent.prototype.back = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nav.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_9__["PATRON_NAVIGATION"].accounts])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RequestFundsPageComponent.prototype.initForm = function () {
        var _a;
        var nameErrors = [
            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.name].required),
            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2), CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.name].minlength),
            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(255), CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.name].maxlength),
        ];
        var emailErrors = [
            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.email].required),
            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["formControlErrorDecorator"])(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["validateEmail"], CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.email].incorrect),
            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(255), CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.email].maxlength),
        ];
        var accountErrors = [
            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.account].required),
        ];
        var messageErrors = [
            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.message].required),
        ];
        this.requestFundsForm = this.fb.group((_a = {},
            _a[this.controlsNames.name] = ['', nameErrors],
            _a[this.controlsNames.email] = ['', emailErrors],
            _a[this.controlsNames.account] = ['', accountErrors],
            _a[this.controlsNames.message] = ['', messageErrors],
            _a));
    };
    RequestFundsPageComponent.prototype.showToast = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Something went wrong...',
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
    RequestFundsPageComponent.prototype.showModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: _popover_popover_component__WEBPACK_IMPORTED_MODULE_6__["PopoverComponent"],
                            componentProps: {
                                data: { title: 'Request Sent!', message: 'Yor request for funds was sent successfully.' },
                            },
                            animated: false,
                            backdropDismiss: true,
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.back()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        modal.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    RequestFundsPageComponent.prototype.onFocus = function () {
        Keyboard.hide();
    };
    RequestFundsPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-request-funds-page',
            template: __webpack_require__(/*! ./request-funds-page.component.html */ "./src/app/sections/accounts/pages/request-funds-page/request-funds-page.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./request-funds-page.component.scss */ "./src/app/sections/accounts/pages/request-funds-page/request-funds-page.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _sections_accounts_services_accounts_service__WEBPACK_IMPORTED_MODULE_7__["AccountsService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_8__["LoadingService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["PopoverController"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_12__["UserFacadeService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_13__["SettingsFacadeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_14__["GlobalNavService"]])
    ], RequestFundsPageComponent);
    return RequestFundsPageComponent;
}());

var REQUEST_FUNDS_CONTROL_NAMES;
(function (REQUEST_FUNDS_CONTROL_NAMES) {
    REQUEST_FUNDS_CONTROL_NAMES["name"] = "name";
    REQUEST_FUNDS_CONTROL_NAMES["email"] = "email";
    REQUEST_FUNDS_CONTROL_NAMES["account"] = "account";
    REQUEST_FUNDS_CONTROL_NAMES["message"] = "message";
})(REQUEST_FUNDS_CONTROL_NAMES || (REQUEST_FUNDS_CONTROL_NAMES = {}));
var CONTROL_ERROR = (_a = {},
    _a[REQUEST_FUNDS_CONTROL_NAMES.name] = {
        required: 'You must enter a name.',
        minlength: 'Name should be more than 2 symbols.',
        maxlength: 'Name should be shorten than 255 symbols.',
    },
    _a[REQUEST_FUNDS_CONTROL_NAMES.email] = {
        required: 'You must enter an email address.',
        incorrect: 'Please enter valid email.',
        maxlength: 'Email should be shorten than 255 symbols.',
    },
    _a[REQUEST_FUNDS_CONTROL_NAMES.account] = {
        required: 'You must choose an account.',
    },
    _a[REQUEST_FUNDS_CONTROL_NAMES.message] = {
        required: 'Please enter a message.',
    },
    _a);


/***/ }),

/***/ "./src/app/sections/accounts/pages/request-funds-page/request-funds.module.ts":
/*!************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/request-funds-page/request-funds.module.ts ***!
  \************************************************************************************/
/*! exports provided: RequestFundsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestFundsModule", function() { return RequestFundsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _request_funds_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./request-funds.routing.module */ "./src/app/sections/accounts/pages/request-funds-page/request-funds.routing.module.ts");
/* harmony import */ var _request_funds_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./request-funds-page.component */ "./src/app/sections/accounts/pages/request-funds-page/request-funds-page.component.ts");
/* harmony import */ var _popover_popover_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popover/popover.component */ "./src/app/sections/accounts/pages/request-funds-page/popover/popover.component.ts");
/* harmony import */ var _shared_pipes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shared/pipes */ "./src/app/shared/pipes/index.ts");
/* harmony import */ var _shared_ui_components_st_textarea_floating_label_st_textarea_floating_label_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module */ "./src/app/shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module.ts");
/* harmony import */ var _shared_ui_components_st_input_floating_label_st_input_floating_label_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @shared/ui-components/st-input-floating-label/st-input-floating-label.module */ "./src/app/shared/ui-components/st-input-floating-label/st-input-floating-label.module.ts");
/* harmony import */ var _shared_ui_components_st_select_floating_label_st_select_floating_label_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @shared/ui-components/st-select-floating-label/st-select-floating-label.module */ "./src/app/shared/ui-components/st-select-floating-label/st-select-floating-label.module.ts");
/* harmony import */ var _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @shared/ui-components/st-popover-layout/st-popover-layout.module */ "./src/app/shared/ui-components/st-popover-layout/st-popover-layout.module.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _shared_ui_components_st_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @shared/ui-components/st-button */ "./src/app/shared/ui-components/st-button/index.ts");















var declarations = [_request_funds_page_component__WEBPACK_IMPORTED_MODULE_6__["RequestFundsPageComponent"], _popover_popover_component__WEBPACK_IMPORTED_MODULE_7__["PopoverComponent"]];
var imports = [
    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
    _shared_ui_components_st_textarea_floating_label_st_textarea_floating_label_module__WEBPACK_IMPORTED_MODULE_9__["StTextareaFloatingLabelModule"],
    _shared_ui_components_st_input_floating_label_st_input_floating_label_module__WEBPACK_IMPORTED_MODULE_10__["StInputFloatingLabelModule"],
    _shared_ui_components_st_select_floating_label_st_select_floating_label_module__WEBPACK_IMPORTED_MODULE_11__["StSelectFloatingLabelModule"],
    _request_funds_routing_module__WEBPACK_IMPORTED_MODULE_5__["RequestFundsRoutingModule"],
    _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_12__["StPopoverLayoutModule"],
    _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_13__["StHeaderModule"],
    _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"].forRoot({
        scrollPadding: false,
        scrollAssist: true,
    }),
    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
    _shared_pipes__WEBPACK_IMPORTED_MODULE_8__["TransactionUnitsPipeModule"],
    _shared_ui_components_st_button__WEBPACK_IMPORTED_MODULE_14__["StButtonModule"]
];
var entryComponents = [_popover_popover_component__WEBPACK_IMPORTED_MODULE_7__["PopoverComponent"]];
var RequestFundsModule = /** @class */ (function () {
    function RequestFundsModule() {
    }
    RequestFundsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                imports,
            ],
            entryComponents: entryComponents,
        })
    ], RequestFundsModule);
    return RequestFundsModule;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/request-funds-page/request-funds.routing.module.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/request-funds-page/request-funds.routing.module.ts ***!
  \********************************************************************************************/
/*! exports provided: RequestFundsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestFundsRoutingModule", function() { return RequestFundsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _request_funds_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./request-funds-page.component */ "./src/app/sections/accounts/pages/request-funds-page/request-funds-page.component.ts");




var routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _request_funds_page_component__WEBPACK_IMPORTED_MODULE_3__["RequestFundsPageComponent"],
    },
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var RequestFundsRoutingModule = /** @class */ (function () {
    function RequestFundsRoutingModule() {
    }
    RequestFundsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({ imports: imports, exports: exports })
    ], RequestFundsRoutingModule);
    return RequestFundsRoutingModule;
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



/***/ }),

/***/ "./src/app/shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module.ts ***!
  \******************************************************************************************************/
/*! exports provided: StTextareaFloatingLabelModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StTextareaFloatingLabelModule", function() { return StTextareaFloatingLabelModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _st_textarea_floating_label_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./st-textarea-floating-label.component */ "./src/app/shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.component.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");





var declarations = [_st_textarea_floating_label_component__WEBPACK_IMPORTED_MODULE_3__["StTextareaFloatingLabelComponent"]];
var StTextareaFloatingLabelModule = /** @class */ (function () {
    function StTextareaFloatingLabelModule() {
    }
    StTextareaFloatingLabelModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"]
            ],
            exports: declarations
        })
    ], StTextareaFloatingLabelModule);
    return StTextareaFloatingLabelModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-request-funds-page-request-funds-module.js.map