(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-application-details-application-details-module~pages-contract-details-contract-details~79b0a167"],{

/***/ "./src/app/sections/housing/applications/applications-state.service.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/sections/housing/applications/applications-state.service.ts ***!
  \*****************************************************************************/
/*! exports provided: ApplicationsStateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationsStateService", function() { return ApplicationsStateService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var ApplicationsStateService = /** @class */ (function () {
    function ApplicationsStateService() {
        this._defaultState = {
            entities: {},
            applicationDetails: null,
        };
        this._applicationsStateSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](this._defaultState);
        this.applicationEntities$ = this._applicationsStateSource.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this._getEntities));
        this.applications$ = this.applicationEntities$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this._getApplications.bind(this)));
        this.applicationDetails$ = this._applicationsStateSource.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this._getApplicationDetails));
    }
    Object.defineProperty(ApplicationsStateService.prototype, "applicationsState", {
        get: function () {
            return this._applicationsStateSource.getValue();
        },
        set: function (value) {
            this._applicationsStateSource.next(value);
        },
        enumerable: true,
        configurable: true
    });
    ApplicationsStateService.prototype.setApplications = function (applications) {
        this.applicationsState = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.applicationsState, { entities: this._toApplicationEntities(applications) });
    };
    ApplicationsStateService.prototype.setApplication = function (applicationKey, applicationDetails) {
        var _a;
        var entites = this.applicationsState.entities;
        this.applicationsState = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.applicationsState, { entities: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, entites, (_a = {}, _a[applicationKey] = applicationDetails, _a)), applicationDetails: applicationDetails });
    };
    ApplicationsStateService.prototype.setApplicationDetails = function (applicationDetails) {
        this.applicationsState = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.applicationsState, { applicationDetails: applicationDetails });
    };
    ApplicationsStateService.prototype._getEntities = function (state) {
        return state.entities;
    };
    ApplicationsStateService.prototype._getApplications = function (entities) {
        return this._toApplicationsArray(entities);
    };
    ApplicationsStateService.prototype._toApplicationEntities = function (applications) {
        return applications.reduce(function (entities, application) {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, entities, (_a = {}, _a[application.applicationDefinition.key] = application, _a));
        }, {});
    };
    ApplicationsStateService.prototype._toApplicationsArray = function (entities) {
        return Object.keys(entities).map(function (key) { return entities[parseInt(key, 10)]; });
    };
    ApplicationsStateService.prototype._getApplicationDetails = function (state) {
        return state.applicationDetails;
    };
    ApplicationsStateService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        })
    ], ApplicationsStateService);
    return ApplicationsStateService;
}());



/***/ }),

/***/ "./src/app/sections/housing/applications/applications.model.ts":
/*!*********************************************************************!*\
  !*** ./src/app/sections/housing/applications/applications.model.ts ***!
  \*********************************************************************/
/*! exports provided: ApplicationStatus, ApplicationDefinition, PatronApplication, PatronAttribute, PatronPreference, ApplicationRequest, ApplicationDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationStatus", function() { return ApplicationStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationDefinition", function() { return ApplicationDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatronApplication", function() { return PatronApplication; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatronAttribute", function() { return PatronAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatronPreference", function() { return PatronPreference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationRequest", function() { return ApplicationRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationDetails", function() { return ApplicationDetails; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/app/sections/housing/utils/index.ts");
/* harmony import */ var _sections_housing_attributes_attributes_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/housing/attributes/attributes.model */ "./src/app/sections/housing/attributes/attributes.model.ts");



var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus[ApplicationStatus["New"] = 1] = "New";
    ApplicationStatus[ApplicationStatus["Pending"] = 2] = "Pending";
    ApplicationStatus[ApplicationStatus["Submitted"] = 3] = "Submitted";
    ApplicationStatus[ApplicationStatus["Accepted"] = 4] = "Accepted";
    ApplicationStatus[ApplicationStatus["Canceled"] = 5] = "Canceled";
})(ApplicationStatus || (ApplicationStatus = {}));
var ApplicationDefinition = /** @class */ (function () {
    function ApplicationDefinition(options) {
        if (options == null || typeof options !== 'object') {
            options = {};
        }
        this.key = Number(options.key);
        this.termKey = Number(options.termKey);
        this.applicationTitle = String(options.applicationTitle);
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.applicationFormJson)) {
            this.applicationFormJson = String(options.applicationFormJson);
        }
    }
    return ApplicationDefinition;
}());

var PatronApplication = /** @class */ (function () {
    function PatronApplication(options) {
        if (options == null || typeof options !== 'object') {
            options = {};
        }
        this.applicationDefinitionKey = Number(options.applicationDefinitionKey);
        this.status = options.status || ApplicationStatus.New;
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.key)) {
            this.key = Number(options.key);
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.patronKey)) {
            this.patronKey = Number(options.patronKey);
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.createdDateTime)) {
            this.createdDateTime = String(options.createdDateTime);
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.submittedDateTime)) {
            this.submittedDateTime = String(options.submittedDateTime);
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.acceptedDateTime)) {
            this.acceptedDateTime = String(options.acceptedDateTime);
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.cancelledDateTime)) {
            this.cancelledDateTime = String(options.cancelledDateTime);
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.modifiedDate)) {
            this.modifiedDate = String(options.modifiedDate);
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.isApplicationSubmitted)) {
            this.isApplicationSubmitted = Boolean(options.isApplicationSubmitted);
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.isApplicationAccepted)) {
            this.isApplicationAccepted = Boolean(options.isApplicationAccepted);
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.isApplicationCanceled)) {
            this.isApplicationCanceled = Boolean(options.isApplicationCanceled);
        }
    }
    return PatronApplication;
}());

var PatronAttribute = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PatronAttribute, _super);
    function PatronAttribute(options) {
        var _this = this;
        if (options == null || typeof options !== 'object') {
            options = {};
        }
        _this = _super.call(this, options) || this;
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.key)) {
            _this.key = Number(options.key);
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.patronKey)) {
            _this.patronKey = Number(options.patronKey);
        }
        return _this;
    }
    return PatronAttribute;
}(_sections_housing_attributes_attributes_model__WEBPACK_IMPORTED_MODULE_2__["Attribute"]));

var PatronPreference = /** @class */ (function () {
    function PatronPreference(options) {
        if (options == null || typeof options !== 'object') {
            options = {};
        }
        this.rank = Number(options.rank);
        this.facilityKey = Number(options.facilityKey);
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.key)) {
            this.key = Number(options.key);
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.preferenceKey)) {
            this.preferenceKey = Number(options.preferenceKey);
        }
    }
    return PatronPreference;
}());

var ApplicationRequest = /** @class */ (function () {
    function ApplicationRequest(options) {
        if (options == null || typeof options !== 'object') {
            options = {};
        }
        this.patronApplication = new PatronApplication(options.patronApplication);
        if (Array.isArray(options.patronAttributes)) {
            this.patronAttributes = options.patronAttributes.map(function (attribute) { return new PatronAttribute(attribute); });
        }
        if (Array.isArray(options.patronPreferences)) {
            this.patronPreferences = options.patronPreferences.map(function (preference) { return new PatronPreference(preference); });
        }
    }
    return ApplicationRequest;
}());

var ApplicationDetails = /** @class */ (function () {
    function ApplicationDetails(options) {
        if (options == null || typeof options !== 'object') {
            options = {};
        }
        this.applicationDefinition = new ApplicationDefinition(options.applicationDefinition);
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.patronApplication)) {
            this.patronApplication = new PatronApplication(options.patronApplication);
        }
        if (Array.isArray(options.patronAttributes)) {
            this.patronAttributes = options.patronAttributes.map(function (attribute) { return new PatronAttribute(attribute); });
        }
        if (Array.isArray(options.patronPreferences)) {
            this.patronPreferences = options.patronPreferences.map(function (preference) { return new PatronPreference(preference); });
        }
    }
    return ApplicationDetails;
}());



/***/ }),

/***/ "./src/app/sections/housing/applications/applications.service.ts":
/*!***********************************************************************!*\
  !*** ./src/app/sections/housing/applications/applications.service.ts ***!
  \***********************************************************************/
/*! exports provided: ApplicationsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationsService", function() { return ApplicationsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environment */ "./src/app/environment.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./src/app/sections/housing/utils/index.ts");
/* harmony import */ var _housing_proxy_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../housing-proxy.service */ "./src/app/sections/housing/housing-proxy.service.ts");
/* harmony import */ var _patron_attributes_patron_attributes_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../patron-attributes/patron-attributes.service */ "./src/app/sections/housing/patron-attributes/patron-attributes.service.ts");
/* harmony import */ var _preferences_preferences_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../preferences/preferences.service */ "./src/app/sections/housing/preferences/preferences.service.ts");
/* harmony import */ var _applications_state_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./applications-state.service */ "./src/app/sections/housing/applications/applications-state.service.ts");
/* harmony import */ var _questions_questions_storage_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../questions/questions-storage.service */ "./src/app/sections/housing/questions/questions-storage.service.ts");
/* harmony import */ var _sections_housing_questions_questions_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sections/housing/questions/questions.service */ "./src/app/sections/housing/questions/questions.service.ts");
/* harmony import */ var _applications_model__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./applications.model */ "./src/app/sections/housing/applications/applications.model.ts");
/* harmony import */ var _sections_housing_questions_questions_model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sections/housing/questions/questions.model */ "./src/app/sections/housing/questions/questions.model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");















var ApplicationsService = /** @class */ (function () {
    function ApplicationsService(_housingProxyService, _patronAttributesService, _preferencesService, _applicationsStateService, _questionsStorageService, _questionsService) {
        this._housingProxyService = _housingProxyService;
        this._patronAttributesService = _patronAttributesService;
        this._preferencesService = _preferencesService;
        this._applicationsStateService = _applicationsStateService;
        this._questionsStorageService = _questionsStorageService;
        this._questionsService = _questionsService;
        this._patronApplicationsUrl = _environment__WEBPACK_IMPORTED_MODULE_4__["Environment"].currentEnvironment.housing_aws_url + "/patron-applications/v.1.0/patron-applications";
    }
    ApplicationsService.prototype.getQuestions = function (key) {
        var _this = this;
        return this._questionsStorageService.getQuestions(key).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["withLatestFrom"])(this._applicationsStateService.applicationDetails$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var storedQuestions = _a[0], applicationDetails = _a[1];
            var pages = _this._questionsService.getQuestionsPages(applicationDetails.applicationDefinition.applicationFormJson);
            var patronApplication = applicationDetails.patronApplication;
            var status = patronApplication && patronApplication.status;
            var isSubmitted = status === _applications_model__WEBPACK_IMPORTED_MODULE_12__["ApplicationStatus"].Submitted;
            return _this._getPages(pages, storedQuestions, applicationDetails, isSubmitted);
        }));
    };
    ApplicationsService.prototype.submitApplication = function (applicationKey, application, form, isSubmitted) {
        var _this = this;
        if (isSubmitted) {
            return this._updateApplication(application, form, _applications_model__WEBPACK_IMPORTED_MODULE_12__["ApplicationStatus"].Submitted);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["forkJoin"])(this._updateCreatedDateTime(applicationKey, application.patronApplication), this._questionsStorageService.updateSubmittedDateTime(applicationKey)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (_a) {
            var createdDateTime = _a[0], submittedDateTime = _a[1];
            var applicationDetails = _this._createApplicationDetails(applicationKey, application, _applications_model__WEBPACK_IMPORTED_MODULE_12__["ApplicationStatus"].Submitted, createdDateTime, submittedDateTime);
            return _this._updateApplication(applicationDetails, form, _applications_model__WEBPACK_IMPORTED_MODULE_12__["ApplicationStatus"].Submitted);
        }));
    };
    ApplicationsService.prototype.saveApplication = function (applicationKey, application, form, isSubmitted) {
        var _this = this;
        if (isSubmitted) {
            return this._updateApplication(application, form, _applications_model__WEBPACK_IMPORTED_MODULE_12__["ApplicationStatus"].Pending);
        }
        return this._updateCreatedDateTime(applicationKey, application.patronApplication).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (createdDateTime) {
            var applicationDetails = _this._createApplicationDetails(applicationKey, application, _applications_model__WEBPACK_IMPORTED_MODULE_12__["ApplicationStatus"].Pending, createdDateTime);
            return _this._updateApplication(applicationDetails, form, _applications_model__WEBPACK_IMPORTED_MODULE_12__["ApplicationStatus"].Pending);
        }));
    };
    ApplicationsService.prototype.next = function (applicationKey, applicationDetails, formValue) {
        var _this = this;
        var patronApplication = applicationDetails.patronApplication;
        var status = patronApplication && patronApplication.status;
        return this._updateCreatedDateTime(applicationKey, patronApplication).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (createdDateTime) {
            var updatedStatus = status || _applications_model__WEBPACK_IMPORTED_MODULE_12__["ApplicationStatus"].Pending;
            var updatedPatronApplication = new _applications_model__WEBPACK_IMPORTED_MODULE_12__["PatronApplication"](tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, patronApplication, { applicationDefinitionKey: applicationKey, createdDateTime: createdDateTime, status: updatedStatus }));
            var updatedApplicationDetails = new _applications_model__WEBPACK_IMPORTED_MODULE_12__["ApplicationDetails"](tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, applicationDetails, { patronApplication: updatedPatronApplication }));
            _this._applicationsStateService.setApplication(applicationKey, updatedApplicationDetails);
            return _this._questionsStorageService.updateQuestions(applicationKey, formValue, updatedStatus);
        }));
    };
    ApplicationsService.prototype.patchApplicationsByStoredStatus = function (applications) {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["forkJoin"])(applications.map(function (application) { return _this._patchApplicationByStoredStatus(application); }));
    };
    ApplicationsService.prototype._getPages = function (pages, storedQuestions, applicationDetails, isSubmitted) {
        var _this = this;
        return pages.map(function (page) { return ({
            form: _this._toFormGroup(page, storedQuestions, applicationDetails, isSubmitted),
            questions: page,
        }); });
    };
    ApplicationsService.prototype._toFormGroup = function (questions, storedQuestions, applicationDetails, isSubmitted) {
        var _this = this;
        return this._questionsService.toFormGroup(questions, storedQuestions, function (group, question, questionName, storedValue) {
            if (question instanceof _sections_housing_questions_questions_model__WEBPACK_IMPORTED_MODULE_13__["QuestionCheckboxGroup"]) {
                group[questionName] = _this._questionsService.toQuestionCheckboxControl(storedValue, question);
            }
            else if (question instanceof _sections_housing_questions_questions_model__WEBPACK_IMPORTED_MODULE_13__["QuestionReorder"]) {
                group[questionName] = _this._toQuestionReorderControl(storedValue, question, applicationDetails.patronPreferences);
            }
            else {
                group[questionName] = _this._toFormControl(storedValue, question, applicationDetails.patronAttributes, isSubmitted);
            }
        });
    };
    ApplicationsService.prototype._toQuestionReorderControl = function (storedValue, question, preferences) {
        var values = storedValue || question.values;
        var selectedValues = values.filter(function (value) { return value.selected; });
        var controls = selectedValues
            .sort(function (current, next) {
            return _sections_housing_questions_questions_model__WEBPACK_IMPORTED_MODULE_13__["QuestionReorder"].sort(preferences, current, next, selectedValues.length);
        })
            .map(function (value) { return new _angular_forms__WEBPACK_IMPORTED_MODULE_14__["FormControl"](value); });
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_14__["FormArray"](controls);
    };
    ApplicationsService.prototype._toFormControl = function (storedValue, question, attributes, isSubmitted) {
        var value = storedValue;
        if (!Object(_utils__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(value)) {
            value = this._questionsService.getAttributeValue(attributes, question);
        }
        var validators = [];
        if (question.required) {
            validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_14__["Validators"].required);
        }
        if (question instanceof _sections_housing_questions_questions_model__WEBPACK_IMPORTED_MODULE_13__["QuestionTextbox"]) {
            this._questionsService.addDataTypeValidator(question, validators);
        }
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_14__["FormControl"]({ value: value, disabled: isSubmitted }, validators);
    };
    ApplicationsService.prototype._updateCreatedDateTime = function (key, patronApplication) {
        var createdDateTime = patronApplication && patronApplication.createdDateTime;
        return this._questionsStorageService.updateCreatedDateTime(key, createdDateTime);
    };
    ApplicationsService.prototype._updateApplication = function (applicationDetails, form, status) {
        var _this = this;
        var applicationDefinition = applicationDetails.applicationDefinition;
        var applicationKey = applicationDefinition.key;
        return this._questionsStorageService.updateQuestions(applicationKey, form, status).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (storedApplication) {
            var parsedJson = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["parseJsonToArray"])(applicationDefinition.applicationFormJson);
            var questions = storedApplication.questions;
            var patronAttributes = _this._patronAttributesService.getAttributes(applicationDetails.patronAttributes, parsedJson, questions);
            var patronPreferences = _this._preferencesService.getPreferences(applicationDetails.patronPreferences, parsedJson, questions);
            var body = new _applications_model__WEBPACK_IMPORTED_MODULE_12__["ApplicationRequest"]({
                patronApplication: applicationDetails.patronApplication,
                patronAttributes: patronAttributes,
                patronPreferences: patronPreferences,
            });
            return _this._housingProxyService.put(_this._patronApplicationsUrl, body);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { return _this._applicationsStateService.setApplication(applicationKey, applicationDetails); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (response) {
            return _this._questionsStorageService.removeApplication(applicationKey).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mapTo"])(response));
        }));
    };
    ApplicationsService.prototype._createApplicationDetails = function (applicationKey, applicationDetails, status, createdDateTime, submittedDateTime) {
        var options = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, applicationDetails.patronApplication, { applicationDefinitionKey: applicationKey, createdDateTime: createdDateTime,
            status: status });
        if (submittedDateTime) {
            options.submittedDateTime = submittedDateTime;
            options.isApplicationSubmitted = true;
        }
        var patronApplication = new _applications_model__WEBPACK_IMPORTED_MODULE_12__["PatronApplication"](options);
        return new _applications_model__WEBPACK_IMPORTED_MODULE_12__["ApplicationDetails"](tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, applicationDetails, { patronApplication: patronApplication }));
    };
    ApplicationsService.prototype._patchApplicationByStoredStatus = function (applicationDetails) {
        var patronApplication = applicationDetails.patronApplication;
        var status = patronApplication && patronApplication.status;
        if (status && status !== _applications_model__WEBPACK_IMPORTED_MODULE_12__["ApplicationStatus"].New) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(applicationDetails);
        }
        return this._questionsStorageService.getApplicationStatus(applicationDetails.applicationDefinition.key).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (storedStatus) {
            if (!storedStatus) {
                return applicationDetails;
            }
            applicationDetails.patronApplication = new _applications_model__WEBPACK_IMPORTED_MODULE_12__["PatronApplication"](tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, patronApplication, { status: storedStatus }));
            return applicationDetails;
        }));
    };
    ApplicationsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_housing_proxy_service__WEBPACK_IMPORTED_MODULE_6__["HousingProxyService"],
            _patron_attributes_patron_attributes_service__WEBPACK_IMPORTED_MODULE_7__["PatronAttributesService"],
            _preferences_preferences_service__WEBPACK_IMPORTED_MODULE_8__["PreferencesService"],
            _applications_state_service__WEBPACK_IMPORTED_MODULE_9__["ApplicationsStateService"],
            _questions_questions_storage_service__WEBPACK_IMPORTED_MODULE_10__["QuestionsStorageService"],
            _sections_housing_questions_questions_service__WEBPACK_IMPORTED_MODULE_11__["QuestionsService"]])
    ], ApplicationsService);
    return ApplicationsService;
}());



/***/ }),

/***/ "./src/app/sections/housing/attributes/attributes.model.ts":
/*!*****************************************************************!*\
  !*** ./src/app/sections/housing/attributes/attributes.model.ts ***!
  \*****************************************************************/
/*! exports provided: AttributeOptions, Attribute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeOptions", function() { return AttributeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attribute", function() { return Attribute; });
/* harmony import */ var _sections_housing_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sections/housing/utils */ "./src/app/sections/housing/utils/index.ts");

var AttributeOptions = /** @class */ (function () {
    function AttributeOptions() {
    }
    return AttributeOptions;
}());

var Attribute = /** @class */ (function () {
    function Attribute(options) {
        if (options == null || typeof options !== 'object') {
            options = {};
        }
        this.attributeConsumerKey = Number(options.attributeConsumerKey);
        this.value = Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options.value) ? String(options.value) : null;
        if (Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options.effectiveDate)) {
            this.effectiveDate = String(options.effectiveDate);
        }
        if (Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options.endDate)) {
            this.endDate = String(options.endDate);
        }
    }
    return Attribute;
}());



/***/ }),

/***/ "./src/app/sections/housing/charge-schedules/charge-schedules.model.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/sections/housing/charge-schedules/charge-schedules.model.ts ***!
  \*****************************************************************************/
/*! exports provided: ChargeScheduleFields, ChargeScheduleValue, ChargeSchedule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChargeScheduleFields", function() { return ChargeScheduleFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChargeScheduleValue", function() { return ChargeScheduleValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChargeSchedule", function() { return ChargeSchedule; });
/* harmony import */ var _sections_housing_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sections/housing/utils */ "./src/app/sections/housing/utils/index.ts");

var ChargeScheduleFields;
(function (ChargeScheduleFields) {
    ChargeScheduleFields[ChargeScheduleFields["chargeScheduleName"] = 0] = "chargeScheduleName";
    ChargeScheduleFields[ChargeScheduleFields["linkedChargeScheduleStartDate"] = 1] = "linkedChargeScheduleStartDate";
    ChargeScheduleFields[ChargeScheduleFields["linkedChargeScheduleEndDate"] = 2] = "linkedChargeScheduleEndDate";
    ChargeScheduleFields[ChargeScheduleFields["fullChargeEstimate"] = 3] = "fullChargeEstimate";
    ChargeScheduleFields[ChargeScheduleFields["remainingChargeEstimate"] = 4] = "remainingChargeEstimate";
    ChargeScheduleFields[ChargeScheduleFields["estimateReason"] = 5] = "estimateReason";
    ChargeScheduleFields[ChargeScheduleFields["scheduleType"] = 6] = "scheduleType";
    ChargeScheduleFields[ChargeScheduleFields["chargeAmount"] = 7] = "chargeAmount";
})(ChargeScheduleFields || (ChargeScheduleFields = {}));
var ChargeScheduleValue = /** @class */ (function () {
    function ChargeScheduleValue(options) {
        if (!Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options) || typeof options !== 'object') {
            options = {};
        }
        this.label = String(options.label);
        this.value = Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options.value) ? String(options.value) : null;
        this.selected = Boolean(options.selected);
        this.type = options.type;
    }
    return ChargeScheduleValue;
}());

var ChargeSchedule = /** @class */ (function () {
    function ChargeSchedule(options) {
        if (!Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options) || typeof options !== 'object') {
            options = {};
        }
        this.chargeScheduleName = String(options.chargeScheduleName);
        this.linkedChargeScheduleStartDate = String(options.linkedChargeScheduleStartDate);
        this.linkedChargeScheduleEndDate = String(options.linkedChargeScheduleEndDate);
        this.active = Boolean(options.active);
        this.fullChargeEstimate = Number(options.fullChargeEstimate);
        this.remainingChargeEstimate = Number(options.remainingChargeEstimate);
        this.estimateReason = String(options.estimateReason);
        this.scheduleType = String(options.scheduleType);
        this.chargeAmount = Number(options.chargeAmount);
    }
    return ChargeSchedule;
}());



/***/ }),

/***/ "./src/app/sections/housing/charge-schedules/charge-schedules.service.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/sections/housing/charge-schedules/charge-schedules.service.ts ***!
  \*******************************************************************************/
/*! exports provided: ChargeSchedulesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChargeSchedulesService", function() { return ChargeSchedulesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/housing/charge-schedules/charge-schedules.model */ "./src/app/sections/housing/charge-schedules/charge-schedules.model.ts");



var ChargeSchedulesService = /** @class */ (function () {
    function ChargeSchedulesService() {
    }
    ChargeSchedulesService.prototype.getChargeSchedules = function (chargeSchedules, chargeScheduleValues) {
        if (!chargeSchedules.length) {
            return [];
        }
        var availableChargeScheduleValues = this.getAvailableChargeScheduleValues(chargeScheduleValues);
        return chargeSchedules.map(function (chargeSchedule) {
            return availableChargeScheduleValues.map(function (value) {
                return new _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__["ChargeScheduleValue"]({ label: value.label, value: chargeSchedule[value.value], type: value.type });
            });
        });
    };
    ChargeSchedulesService.prototype.getAvailableChargeScheduleValues = function (chargeScheduleValues) {
        var _this = this;
        return chargeScheduleValues
            .filter(function (value) { return value.selected; })
            .map(function (value) {
            var chargeScheduleFieldEnum = parseInt(value.value, 10);
            var chargeScheduleField = _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__["ChargeScheduleFields"][chargeScheduleFieldEnum];
            var type = _this.getChargeScheduleFieldType(chargeScheduleFieldEnum);
            var csValue = new _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__["ChargeScheduleValue"]({ label: value.label, value: chargeScheduleField, type: type });
            return csValue;
        });
    };
    ChargeSchedulesService.prototype.getChargeScheduleFieldType = function (chargeScheduleField) {
        switch (chargeScheduleField) {
            case _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__["ChargeScheduleFields"].chargeAmount:
            case _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__["ChargeScheduleFields"].fullChargeEstimate:
            case _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__["ChargeScheduleFields"].remainingChargeEstimate:
                return "currency";
            case _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__["ChargeScheduleFields"].chargeScheduleName:
            case _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__["ChargeScheduleFields"].estimateReason:
            case _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__["ChargeScheduleFields"].scheduleType:
                return "string";
            case _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__["ChargeScheduleFields"].linkedChargeScheduleEndDate:
            case _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__["ChargeScheduleFields"].linkedChargeScheduleStartDate:
                return "date";
        }
    };
    ChargeSchedulesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ChargeSchedulesService);
    return ChargeSchedulesService;
}());



/***/ }),

/***/ "./src/app/sections/housing/contracts/contracts-state.service.ts":
/*!***********************************************************************!*\
  !*** ./src/app/sections/housing/contracts/contracts-state.service.ts ***!
  \***********************************************************************/
/*! exports provided: ContractsStateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractsStateService", function() { return ContractsStateService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var ContractsStateService = /** @class */ (function () {
    function ContractsStateService() {
        this._defaultState = {
            entities: {},
            contractDetails: null,
        };
        this._contractsStateSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](this._defaultState);
        this.contractEntities$ = this._contractsStateSource.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this._getEntities));
        this.contracts$ = this.contractEntities$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this._getContracts.bind(this)));
        this.contractDetails$ = this._contractsStateSource.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this._getContractDetails));
    }
    Object.defineProperty(ContractsStateService.prototype, "contractsState", {
        get: function () {
            return this._contractsStateSource.getValue();
        },
        set: function (value) {
            this._contractsStateSource.next(value);
        },
        enumerable: true,
        configurable: true
    });
    ContractsStateService.prototype.setContracts = function (contracts) {
        this.contractsState = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.contractsState, { entities: this._toContractEntities(contracts) });
    };
    ContractsStateService.prototype.setContract = function (contractKey, contractDetails) {
        var _a;
        var entites = this.contractsState.entities;
        this.contractsState = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.contractsState, { entities: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, entites, (_a = {}, _a[contractKey] = contractDetails, _a)) });
    };
    ContractsStateService.prototype.setContractDetails = function (contractDetails) {
        this.contractsState = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.contractsState, { contractDetails: contractDetails });
    };
    ContractsStateService.prototype._getEntities = function (state) {
        return state.entities;
    };
    ContractsStateService.prototype._getContracts = function (entities) {
        return this._toContractsArray(entities);
    };
    ContractsStateService.prototype._toContractEntities = function (contracts) {
        return contracts.reduce(function (entities, contract) {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, entities, (_a = {}, _a[contract.id] = contract, _a));
        }, {});
    };
    ContractsStateService.prototype._toContractsArray = function (entities) {
        return Object.keys(entities).map(function (key) { return entities[parseInt(key, 10)]; });
    };
    ContractsStateService.prototype._getContractDetails = function (state) {
        return state.contractDetails;
    };
    ContractsStateService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        })
    ], ContractsStateService);
    return ContractsStateService;
}());



/***/ }),

/***/ "./src/app/sections/housing/contracts/contracts.model.ts":
/*!***************************************************************!*\
  !*** ./src/app/sections/housing/contracts/contracts.model.ts ***!
  \***************************************************************/
/*! exports provided: ContractStatus, CONTRACT_DETAIL_KEYS, CONTRACT_DETAIL_FIELDS, ContractListDetails, ContractInfo, ContractDetails, ContractRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractStatus", function() { return ContractStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTRACT_DETAIL_KEYS", function() { return CONTRACT_DETAIL_KEYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTRACT_DETAIL_FIELDS", function() { return CONTRACT_DETAIL_FIELDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractListDetails", function() { return ContractListDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractInfo", function() { return ContractInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractDetails", function() { return ContractDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractRequest", function() { return ContractRequest; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/app/sections/housing/utils/index.ts");
/* harmony import */ var _applications_applications_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../applications/applications.model */ "./src/app/sections/housing/applications/applications.model.ts");
/* harmony import */ var _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/housing/charge-schedules/charge-schedules.model */ "./src/app/sections/housing/charge-schedules/charge-schedules.model.ts");
/* harmony import */ var _sections_housing_facility_attributes_facility_attributes_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/housing/facility-attributes/facility-attributes.model */ "./src/app/sections/housing/facility-attributes/facility-attributes.model.ts");




var ContractStatus;
(function (ContractStatus) {
    ContractStatus[ContractStatus["Preliminary"] = 1] = "Preliminary";
    ContractStatus[ContractStatus["Active"] = 2] = "Active";
    ContractStatus[ContractStatus["Suspended"] = 3] = "Suspended";
    ContractStatus[ContractStatus["Completed"] = 4] = "Completed";
    ContractStatus[ContractStatus["Expired"] = 5] = "Expired";
    ContractStatus[ContractStatus["Terminated"] = 6] = "Terminated";
    ContractStatus[ContractStatus["Canceled"] = 7] = "Canceled";
})(ContractStatus || (ContractStatus = {}));
var CONTRACT_DETAIL_KEYS;
(function (CONTRACT_DETAIL_KEYS) {
    CONTRACT_DETAIL_KEYS["ACTUAL_START"] = "ACTUAL_START";
    CONTRACT_DETAIL_KEYS["ACTUAL_END"] = "ACTUAL_END";
    CONTRACT_DETAIL_KEYS["EXPECTED_START"] = "EXPECTED_START";
    CONTRACT_DETAIL_KEYS["EXPECTED_END"] = "EXPECTED_END";
    CONTRACT_DETAIL_KEYS["ASSET_TYPE"] = "ASSET_TYPE";
    CONTRACT_DETAIL_KEYS["CONTRACT_NUMBER"] = "CONTRACT_NUMBER";
    CONTRACT_DETAIL_KEYS["CONTRACT_STATE"] = "CONTRACT_STATE";
    CONTRACT_DETAIL_KEYS["CONTRACT_ID"] = "CONTRACT_ID";
    CONTRACT_DETAIL_KEYS["COST"] = "COST";
    CONTRACT_DETAIL_KEYS["DATE_SIGNED"] = "DATE_SIGNED";
    CONTRACT_DETAIL_KEYS["EXPIRATION_DATE"] = "EXPIRATION_DATE";
    CONTRACT_DETAIL_KEYS["SCHEDULE_COST"] = "SCHEDULE_COST";
})(CONTRACT_DETAIL_KEYS || (CONTRACT_DETAIL_KEYS = {}));
var CONTRACT_DETAIL_FIELDS;
(function (CONTRACT_DETAIL_FIELDS) {
    CONTRACT_DETAIL_FIELDS["ACTUAL_START"] = "actualStartDate";
    CONTRACT_DETAIL_FIELDS["ACTUAL_END"] = "actualEndDate";
    CONTRACT_DETAIL_FIELDS["EXPECTED_START"] = "expectedStartDate";
    CONTRACT_DETAIL_FIELDS["EXPECTED_END"] = "expectedEndDate";
    CONTRACT_DETAIL_FIELDS["ASSET_TYPE"] = "assetTypeName";
    CONTRACT_DETAIL_FIELDS["CONTRACT_NUMBER"] = "contractNumber";
    CONTRACT_DETAIL_FIELDS["CONTRACT_STATE"] = "status";
    CONTRACT_DETAIL_FIELDS["CONTRACT_ID"] = "id";
    CONTRACT_DETAIL_FIELDS["COST"] = "contractCost";
    CONTRACT_DETAIL_FIELDS["DATE_SIGNED"] = "dateSigned";
    CONTRACT_DETAIL_FIELDS["EXPIRATION_DATE"] = "expirationDate";
    CONTRACT_DETAIL_FIELDS["SCHEDULE_COST"] = "scheduleCost";
})(CONTRACT_DETAIL_FIELDS || (CONTRACT_DETAIL_FIELDS = {}));
var ContractListDetails = /** @class */ (function () {
    function ContractListDetails(options) {
        if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options) || typeof options !== 'object') {
            options = {};
        }
        this.id = Number(options.id);
        this.contractElementId = Number(options.contractElementId);
        this.state = String(options.state);
        this.applicationDescription = String(options.applicationDescription);
        this.applicationFormJson = options.applicationFormJson;
        this.applicationTitle = String(options.applicationTitle);
        this.applicationTypeId = Number(options.applicationTypeId);
        this.applicationAvailableEndDateTime = String(options.applicationAvailableEndDateTime);
        this.applicationAvailableStartDateTime = String(options.applicationAvailableStartDateTime);
        this.cancellationDateTime = String(options.cancellationDateTime);
        this.expirationDateTime = String(options.expirationDateTime);
        this.expireWhenAssigned = Number(options.expireWhenAssigned);
        this.numberOfDaysToExpire = Number(options.numberOfDaysToExpire);
        this.termId = Number(options.termId);
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options.acceptedDate)) {
            this.acceptedDate = String(options.acceptedDate);
        }
    }
    ContractListDetails.toContractListDetails = function (contracts) {
        return Array.isArray(contracts) ? contracts.map(function (contract) { return new ContractListDetails(contract); }) : [];
    };
    return ContractListDetails;
}());

var ContractInfo = /** @class */ (function () {
    function ContractInfo(options) {
        if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options) || typeof options !== 'object') {
            options = {};
        }
        this.id = Number(options.id);
        this.contractName = String(options.contractName);
        this.term = Number(options.term);
        this.expectedStartDate = String(options.expectedStartDate);
        this.expectedEndDate = String(options.expectedEndDate);
        this.status = String(options.status);
        this.facilityId = Number(options.facilityId);
        this.chargedThroughDate = String(options.chargedThroughDate);
        this.expirationDate = String(options.expirationDate);
        this.actualStartDate = String(options.actualStartDate);
        this.actualEndDate = String(options.actualEndDate);
        this.depositRequired = Number(options.depositRequired);
        this.depositPaid = Number(options.depositPaid);
        this.gracePeriodBeforeStart = Number(options.gracePeriodBeforeStart);
        this.gracePeriodBeforeEnd = Number(options.gracePeriodBeforeEnd);
        this.contractNumber = String(options.contractNumber);
        this.checkInDateTime = String(options.checkInDateTime);
        this.checkOutDateTime = String(options.checkOutDateTime);
        this.linkToSpace = String(options.linkToSpace);
        this.changeRoomIn = Number(options.changeRoomIn);
        this.changeRoomOut = Number(options.changeRoomOut);
        this.note = String(options.note);
        this.assetTypeName = String(options.assetTypeName);
        this.assetTypeId = Number(options.assetTypeId);
        this.dateTimeAccepted = String(options.dateTimeAccepted);
        this.buyOut = Boolean(options.buyOut);
        this.accessStartDate = String(options.accessStartDate);
        this.accessEndDate = String(options.accessEndDate);
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options.dateTimeSigned)) {
            this.dateTimeSigned = String(options.dateTimeSigned);
        }
    }
    return ContractInfo;
}());

var ContractDetails = /** @class */ (function () {
    function ContractDetails(options) {
        if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options) || typeof options !== 'object') {
            options = {};
        }
        this.contractInfo = new ContractInfo(options.contractInfo);
        this.formJson = options.formJson;
        this.chargeSchedules = Array.isArray(options.chargeSchedules)
            ? options.chargeSchedules.map(function (schedule) { return new _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__["ChargeSchedule"](schedule); })
            : [];
        this.patronAttributes = Array.isArray(options.patronAttributes)
            ? options.patronAttributes.map(function (attribute) { return new _applications_applications_model__WEBPACK_IMPORTED_MODULE_1__["PatronAttribute"](attribute); })
            : [];
        this.facilityAttributes = Array.isArray(options.facilityAttributes)
            ? options.facilityAttributes.map(function (attribute) { return new _sections_housing_facility_attributes_facility_attributes_model__WEBPACK_IMPORTED_MODULE_3__["FacilityAttribute"](attribute); })
            : [];
    }
    return ContractDetails;
}());

var ContractRequest = /** @class */ (function () {
    function ContractRequest(options) {
        if (options == null || typeof options !== 'object') {
            options = {};
        }
        this.contractElementKey = Number(options.contractElementKey);
        this.dateSigned = String(options.dateSigned);
    }
    return ContractRequest;
}());



/***/ }),

/***/ "./src/app/sections/housing/contracts/contracts.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/sections/housing/contracts/contracts.service.ts ***!
  \*****************************************************************/
/*! exports provided: ContractsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractsService", function() { return ContractsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _sections_housing_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/housing/utils */ "./src/app/sections/housing/utils/index.ts");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../environment */ "./src/app/environment.ts");
/* harmony import */ var _housing_proxy_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../housing-proxy.service */ "./src/app/sections/housing/housing-proxy.service.ts");
/* harmony import */ var _sections_housing_questions_questions_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/housing/questions/questions.service */ "./src/app/sections/housing/questions/questions.service.ts");
/* harmony import */ var _sections_housing_questions_questions_storage_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sections/housing/questions/questions-storage.service */ "./src/app/sections/housing/questions/questions-storage.service.ts");
/* harmony import */ var _sections_housing_contracts_contracts_state_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sections/housing/contracts/contracts-state.service */ "./src/app/sections/housing/contracts/contracts-state.service.ts");
/* harmony import */ var _contracts_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contracts.model */ "./src/app/sections/housing/contracts/contracts.model.ts");
/* harmony import */ var _sections_housing_questions_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @sections/housing/questions/types */ "./src/app/sections/housing/questions/types/index.ts");
/* harmony import */ var _sections_housing_questions_types_question_facility_attributes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sections/housing/questions/types/question-facility-attributes */ "./src/app/sections/housing/questions/types/question-facility-attributes.ts");
/* harmony import */ var _sections_housing_charge_schedules_charge_schedules_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @sections/housing/charge-schedules/charge-schedules.service */ "./src/app/sections/housing/charge-schedules/charge-schedules.service.ts");















var ContractsService = /** @class */ (function () {
    function ContractsService(_housingProxyService, _questionsStorageService, _questionsService, _contractsStateService, _chargeSchedulesService) {
        this._housingProxyService = _housingProxyService;
        this._questionsStorageService = _questionsStorageService;
        this._questionsService = _questionsService;
        this._contractsStateService = _contractsStateService;
        this._chargeSchedulesService = _chargeSchedulesService;
        this._patronContractsUrl = _environment__WEBPACK_IMPORTED_MODULE_6__["Environment"].currentEnvironment.housing_aws_url + "/patron-applications/v.1.0/patron-contracts";
        this._isSigned = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](false);
        this.isSigned$ = this._isSigned.asObservable();
    }
    ContractsService.prototype.getQuestions = function (key) {
        var _this = this;
        return this._questionsStorageService.getApplication(key).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["withLatestFrom"])(this._contractsStateService.contractDetails$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var storedQuestions = _a[0], contractDetails = _a[1];
            var pages = _this._getQuestionsPages(contractDetails);
            return _this._getPages(pages, storedQuestions, contractDetails);
        }));
    };
    ContractsService.prototype.submitContract = function (contractElementKey) {
        var dateSigned = new Date().toISOString();
        var body = new _contracts_model__WEBPACK_IMPORTED_MODULE_11__["ContractRequest"]({
            contractElementKey: contractElementKey,
            dateSigned: dateSigned,
        });
        return this._housingProxyService.put(this._patronContractsUrl, body);
    };
    ContractsService.prototype.sign = function (isSigned) {
        this._isSigned.next(isSigned);
    };
    ContractsService.prototype._getQuestionsPages = function (contractDetails) {
        var _this = this;
        var questions = this._questionsService
            .getQuestions(contractDetails.formJson)
            .map(function (question) { return _this._toChargeSchedulesGroup(question, contractDetails); });
        return this._questionsService.splitByPages(questions);
    };
    ContractsService.prototype._getPages = function (pages, storedQuestions, contractDetails) {
        var _this = this;
        return pages.map(function (page) { return ({
            form: _this._toFormGroup(page, storedQuestions, contractDetails),
            questions: page,
        }); });
    };
    ContractsService.prototype._toFormGroup = function (questions, storedQuestions, contractDetails) {
        var _this = this;
        return this._questionsService.toFormGroup(questions, storedQuestions, function (group, question, questionName, storedValue) {
            if (question instanceof _sections_housing_questions_types__WEBPACK_IMPORTED_MODULE_12__["QuestionCheckboxGroup"]) {
                group[questionName] = _this._questionsService.toQuestionCheckboxControl(storedValue, question);
            }
            else {
                group[questionName] = _this._toFormControl(storedValue, question, contractDetails);
            }
        });
    };
    ContractsService.prototype._toChargeSchedulesGroup = function (question, contractDetails) {
        if (!(question instanceof _sections_housing_questions_types__WEBPACK_IMPORTED_MODULE_12__["QuestionChargeScheduleBase"])) {
            return question;
        }
        var chargeSchedulesGroup = this._chargeSchedulesService.getChargeSchedules(contractDetails.chargeSchedules, question.values);
        question = new _sections_housing_questions_types__WEBPACK_IMPORTED_MODULE_12__["QuestionChargeSchedule"](tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, question, { chargeSchedulesGroup: chargeSchedulesGroup }));
        return question;
    };
    ContractsService.prototype._toFormControl = function (storedValue, question, contractDetails) {
        var value = storedValue;
        if (!Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(value)) {
            if (question instanceof _sections_housing_questions_types__WEBPACK_IMPORTED_MODULE_12__["QuestionContractDetails"]) {
                value = this._getContractDetailValue(question, contractDetails.contractInfo);
            }
            else if (question instanceof _sections_housing_questions_types_question_facility_attributes__WEBPACK_IMPORTED_MODULE_13__["QuestionFacilityAttributes"]) {
                value = this._questionsService.getAttributeValue(contractDetails.facilityAttributes, question);
            }
            else {
                value = this._questionsService.getAttributeValue(contractDetails.patronAttributes, question) || '';
            }
        }
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: value, disabled: true });
    };
    ContractsService.prototype._getContractDetailValue = function (question, contractInfo) {
        var contractKey = _contracts_model__WEBPACK_IMPORTED_MODULE_11__["CONTRACT_DETAIL_FIELDS"][question.contractId];
        return contractInfo[contractKey] || '';
    };
    ContractsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_housing_proxy_service__WEBPACK_IMPORTED_MODULE_7__["HousingProxyService"],
            _sections_housing_questions_questions_storage_service__WEBPACK_IMPORTED_MODULE_9__["QuestionsStorageService"],
            _sections_housing_questions_questions_service__WEBPACK_IMPORTED_MODULE_8__["QuestionsService"],
            _sections_housing_contracts_contracts_state_service__WEBPACK_IMPORTED_MODULE_10__["ContractsStateService"],
            _sections_housing_charge_schedules_charge_schedules_service__WEBPACK_IMPORTED_MODULE_14__["ChargeSchedulesService"]])
    ], ContractsService);
    return ContractsService;
}());



/***/ }),

/***/ "./src/app/sections/housing/facility-attributes/facility-attributes.model.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/sections/housing/facility-attributes/facility-attributes.model.ts ***!
  \***********************************************************************************/
/*! exports provided: FacilityAttribute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacilityAttribute", function() { return FacilityAttribute; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sections_housing_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sections/housing/utils */ "./src/app/sections/housing/utils/index.ts");
/* harmony import */ var _sections_housing_attributes_attributes_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/housing/attributes/attributes.model */ "./src/app/sections/housing/attributes/attributes.model.ts");



var FacilityAttribute = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](FacilityAttribute, _super);
    function FacilityAttribute(options) {
        var _this = this;
        if (!Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options) || typeof options !== 'object') {
            options = {};
        }
        _this = _super.call(this, options) || this;
        if (Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.facilityAttributeKey)) {
            _this.facilityAttributeKey = Number(options.facilityAttributeKey);
        }
        if (Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.facilityKey)) {
            _this.facilityKey = Number(options.facilityKey);
        }
        return _this;
    }
    return FacilityAttribute;
}(_sections_housing_attributes_attributes_model__WEBPACK_IMPORTED_MODULE_2__["Attribute"]));



/***/ }),

/***/ "./src/app/sections/housing/housing-auth/housing-auth.service.ts":
/*!***********************************************************************!*\
  !*** ./src/app/sections/housing/housing-auth/housing-auth.service.ts ***!
  \***********************************************************************/
/*! exports provided: HousingAuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HousingAuthService", function() { return HousingAuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_service_auth_api_auth_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/service/auth-api/auth-api.service */ "./src/app/core/service/auth-api/auth-api.service.ts");




var HousingAuthService = /** @class */ (function () {
    function HousingAuthService(_authService) {
        this._authService = _authService;
        this._initToken();
    }
    HousingAuthService.prototype._initToken = function () {
        var _this = this;
        this.token$ = this._authService.sessionId$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function () { return _this._authService.getExternalAuthenticationToken(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1));
    };
    HousingAuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_service_auth_api_auth_api_service__WEBPACK_IMPORTED_MODULE_3__["AuthApiService"]])
    ], HousingAuthService);
    return HousingAuthService;
}());



/***/ }),

/***/ "./src/app/sections/housing/housing-proxy.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/sections/housing/housing-proxy.service.ts ***!
  \***********************************************************/
/*! exports provided: HousingProxyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HousingProxyService", function() { return HousingProxyService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _housing_auth_housing_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./housing-auth/housing-auth.service */ "./src/app/sections/housing/housing-auth/housing-auth.service.ts");





var HousingProxyService = /** @class */ (function () {
    function HousingProxyService(_http, _housingAuthService) {
        this._http = _http;
        this._housingAuthService = _housingAuthService;
    }
    HousingProxyService.prototype.request = function (apiUrl, callback) {
        return this._housingAuthService.token$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (token) {
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                Authorization: "Bearer " + token,
            });
            return callback(headers, apiUrl);
        }));
    };
    HousingProxyService.prototype.get = function (apiUrl) {
        var _this = this;
        return this.request(apiUrl, function (headers, apiUrl) {
            return _this._http
                .get(apiUrl, {
                headers: headers,
            })
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) { return response.data; }));
        });
    };
    HousingProxyService.prototype.put = function (apiUrl, body) {
        var _this = this;
        return this.request(apiUrl, function (headers, apiUrl) {
            return _this._http.put(apiUrl, body, {
                headers: headers.set('Content-Type', 'application/json'),
            });
        });
    };
    HousingProxyService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _housing_auth_housing_auth_service__WEBPACK_IMPORTED_MODULE_4__["HousingAuthService"]])
    ], HousingProxyService);
    return HousingProxyService;
}());



/***/ }),

/***/ "./src/app/sections/housing/housing.config.ts":
/*!****************************************************!*\
  !*** ./src/app/sections/housing/housing.config.ts ***!
  \****************************************************/
/*! exports provided: LOCAL_ROUTING, STORAGE_KEY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCAL_ROUTING", function() { return LOCAL_ROUTING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STORAGE_KEY", function() { return STORAGE_KEY; });
var LOCAL_ROUTING;
(function (LOCAL_ROUTING) {
    LOCAL_ROUTING["dashboard"] = "dashboard";
    LOCAL_ROUTING["applications"] = "applications";
    LOCAL_ROUTING["facilities"] = "facilities";
    LOCAL_ROUTING["contracts"] = "contracts";
    LOCAL_ROUTING["workOrders"] = "work-orders";
    LOCAL_ROUTING["units"] = "units";
})(LOCAL_ROUTING || (LOCAL_ROUTING = {}));
var STORAGE_KEY = 'housing';


/***/ }),

/***/ "./src/app/sections/housing/housing.model.ts":
/*!***************************************************!*\
  !*** ./src/app/sections/housing/housing.model.ts ***!
  \***************************************************/
/*! exports provided: DefinitionsResponse, DetailsResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefinitionsResponse", function() { return DefinitionsResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsResponse", function() { return DetailsResponse; });
/* harmony import */ var _applications_applications_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applications/applications.model */ "./src/app/sections/housing/applications/applications.model.ts");
/* harmony import */ var _contracts_contracts_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contracts/contracts.model */ "./src/app/sections/housing/contracts/contracts.model.ts");


var DefinitionsResponse = /** @class */ (function () {
    function DefinitionsResponse(options) {
        if (options == null || typeof options !== 'object') {
            options = {};
        }
        this.applicationDefinitions = Array.isArray(options.applicationDefinitions)
            ? options.applicationDefinitions.map(function (detail) { return new _applications_applications_model__WEBPACK_IMPORTED_MODULE_0__["ApplicationDetails"](detail); })
            : [];
        this.contractDetails = Array.isArray(options.contractDetails)
            ? options.contractDetails.map(function (detail) { return new _contracts_contracts_model__WEBPACK_IMPORTED_MODULE_1__["ContractListDetails"](detail); })
            : [];
    }
    return DefinitionsResponse;
}());

var DetailsResponse = /** @class */ (function () {
    function DetailsResponse(options) {
        if (options == null || typeof options !== 'object') {
            options = {};
        }
        this.applicationDetails = new _applications_applications_model__WEBPACK_IMPORTED_MODULE_0__["ApplicationDetails"](options.applicationDetails);
        this.contractDetails = new _contracts_contracts_model__WEBPACK_IMPORTED_MODULE_1__["ContractDetails"](options.contractDetails);
    }
    return DetailsResponse;
}());



/***/ }),

/***/ "./src/app/sections/housing/housing.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/sections/housing/housing.service.ts ***!
  \*****************************************************/
/*! exports provided: HousingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HousingService", function() { return HousingService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../environment */ "./src/app/environment.ts");
/* harmony import */ var _housing_proxy_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./housing-proxy.service */ "./src/app/sections/housing/housing-proxy.service.ts");
/* harmony import */ var _applications_applications_state_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./applications/applications-state.service */ "./src/app/sections/housing/applications/applications-state.service.ts");
/* harmony import */ var _contracts_contracts_state_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./contracts/contracts-state.service */ "./src/app/sections/housing/contracts/contracts-state.service.ts");
/* harmony import */ var _terms_terms_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./terms/terms.service */ "./src/app/sections/housing/terms/terms.service.ts");
/* harmony import */ var _applications_applications_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./applications/applications.service */ "./src/app/sections/housing/applications/applications.service.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _sections_housing_contracts_contracts_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @sections/housing/contracts/contracts.service */ "./src/app/sections/housing/contracts/contracts.service.ts");
/* harmony import */ var _housing_model__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./housing.model */ "./src/app/sections/housing/housing.model.ts");
















var HousingService = /** @class */ (function () {
    function HousingService(_housingProxyService, _applicationsStateService, _contractsStateService, _termsService, _applicationsService, _loadingService, _toastController, _router, _contractsService) {
        var _this = this;
        this._housingProxyService = _housingProxyService;
        this._applicationsStateService = _applicationsStateService;
        this._contractsStateService = _contractsStateService;
        this._termsService = _termsService;
        this._applicationsService = _applicationsService;
        this._loadingService = _loadingService;
        this._toastController = _toastController;
        this._router = _router;
        this._contractsService = _contractsService;
        this._patronApplicationsUrl = _environment__WEBPACK_IMPORTED_MODULE_7__["Environment"].currentEnvironment.housing_aws_url + "/patron-applications/v.1.0/patron-applications";
        this._applicationDefinitionUrl = this._patronApplicationsUrl + "/application-definition";
        this._refreshDefinitionsSource = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        this.refreshDefinitions$ = this._refreshDefinitionsSource
            .asObservable()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function () { return _this._termsService.termId$; }));
    }
    HousingService.prototype.getDefinitions = function (termId) {
        var _this = this;
        var apiUrl = this._patronApplicationsUrl + "/term/" + termId + "/patron/self";
        return this._housingProxyService.get(apiUrl).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (response) { return new _housing_model__WEBPACK_IMPORTED_MODULE_15__["DefinitionsResponse"](response); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (response) { return _this._patchDefinitionsByStore(response); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function (response) { return _this._setState(response.applicationDefinitions, response.contractDetails); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(function () { return _this._handleGetDefinitionsError(); }));
    };
    HousingService.prototype.refreshDefinitions = function () {
        this._refreshDefinitionsSource.next();
    };
    HousingService.prototype.getDetails = function (key, queryParams) {
        var _this = this;
        if (queryParams === void 0) { queryParams = []; }
        var queryString = queryParams.length ? "?" + queryParams.join('&') : '';
        var apiUrl = this._applicationDefinitionUrl + "/" + key + "/patron/self" + queryString;
        return this._housingProxyService.get(apiUrl).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (response) { return new _housing_model__WEBPACK_IMPORTED_MODULE_15__["DetailsResponse"](response); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function (details) {
            if (details.applicationDetails) {
                _this._applicationsStateService.setApplicationDetails(details.applicationDetails);
            }
            if (details.contractDetails) {
                _this._contractsStateService.setContractDetails(details.contractDetails);
            }
        }));
    };
    HousingService.prototype.getApplicationDetails = function (key) {
        return this.getDetails(key).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (response) { return response.applicationDetails; }));
    };
    HousingService.prototype.getContractDetails = function (key, queryParams) {
        var _this = this;
        if (queryParams === void 0) { queryParams = []; }
        return this.getDetails(key, queryParams)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (response) { return response.contractDetails; }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function (details) {
            if (details.contractInfo.dateTimeSigned) {
                _this._contractsService.sign(true);
            }
        }));
    };
    HousingService.prototype.handleSuccess = function () {
        var _this = this;
        this._loadingService.closeSpinner();
        this._router.navigate(['/housing/dashboard']).then(function () { return _this.refreshDefinitions(); });
    };
    HousingService.prototype.handleErrors = function (error) {
        var message = 'Something went wrong. Try again later';
        this._loadingService.closeSpinner();
        if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpErrorResponse"]) {
            var statusMessage = error.error.status.message;
            message = statusMessage || message;
        }
        this._toastController
            .create({
            message: message,
            position: 'top',
            duration: 3000,
            showCloseButton: true,
        })
            .then(function (toast) { return toast.present(); });
    };
    HousingService.prototype._patchDefinitionsByStore = function (response) {
        var applicationDefinitions = response.applicationDefinitions, contractDetails = response.contractDetails;
        var patchedApplications = applicationDefinitions.length > 0
            ? this._applicationsService.patchApplicationsByStoredStatus(applicationDefinitions)
            : Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])([]);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["forkJoin"])(patchedApplications, Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(contractDetails)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (_a) {
            var applicationDefinitions = _a[0], contractDetails = _a[1];
            return new _housing_model__WEBPACK_IMPORTED_MODULE_15__["DefinitionsResponse"]({
                applicationDefinitions: applicationDefinitions,
                contractDetails: contractDetails,
            });
        }));
    };
    HousingService.prototype._setState = function (applications, contracts) {
        this._applicationsStateService.setApplications(applications);
        this._contractsStateService.setContracts(contracts);
    };
    HousingService.prototype._handleGetDefinitionsError = function () {
        var applicationDefinitions = [];
        var contractDetails = [];
        this._setState(applicationDefinitions, contractDetails);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(new _housing_model__WEBPACK_IMPORTED_MODULE_15__["DefinitionsResponse"]({
            applicationDefinitions: applicationDefinitions,
            contractDetails: contractDetails,
        }));
    };
    HousingService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_housing_proxy_service__WEBPACK_IMPORTED_MODULE_8__["HousingProxyService"],
            _applications_applications_state_service__WEBPACK_IMPORTED_MODULE_9__["ApplicationsStateService"],
            _contracts_contracts_state_service__WEBPACK_IMPORTED_MODULE_10__["ContractsStateService"],
            _terms_terms_service__WEBPACK_IMPORTED_MODULE_11__["TermsService"],
            _applications_applications_service__WEBPACK_IMPORTED_MODULE_12__["ApplicationsService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_13__["LoadingService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _sections_housing_contracts_contracts_service__WEBPACK_IMPORTED_MODULE_14__["ContractsService"]])
    ], HousingService);
    return HousingService;
}());



/***/ }),

/***/ "./src/app/sections/housing/patron-attributes/patron-attributes.service.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/sections/housing/patron-attributes/patron-attributes.service.ts ***!
  \*********************************************************************************/
/*! exports provided: PatronAttributesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatronAttributesService", function() { return PatronAttributesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _applications_applications_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../applications/applications.model */ "./src/app/sections/housing/applications/applications.model.ts");



var PatronAttributesService = /** @class */ (function () {
    function PatronAttributesService() {
    }
    PatronAttributesService.prototype.getAttributes = function (patronAttributes, parsedJson, questionEntries) {
        var facilityControls = parsedJson.filter(function (control) { return control && control.consumerKey; });
        var questions = Object.keys(questionEntries);
        if (!facilityControls.length || !questions.length) {
            return [];
        }
        return questions
            .filter(function (questionName) {
            return facilityControls.find(function (control) { return control.name === questionName; });
        })
            .map(function (questionName) {
            var value = questionEntries[questionName];
            var foundFacility = facilityControls.find(function (control) { return control.name === questionName; });
            var attributeConsumerKey = foundFacility.consumerKey;
            var foundAttribute = patronAttributes.find(function (attribute) { return attribute.attributeConsumerKey === attributeConsumerKey; });
            if (foundAttribute) {
                var key = foundAttribute.key;
                var patronKey = foundAttribute.patronKey;
                var effectiveDate = foundAttribute.effectiveDate;
                var endDate = foundAttribute.endDate;
                return new _applications_applications_model__WEBPACK_IMPORTED_MODULE_2__["PatronAttribute"]({
                    attributeConsumerKey: attributeConsumerKey,
                    value: value,
                    key: key,
                    patronKey: patronKey,
                    effectiveDate: effectiveDate,
                    endDate: endDate,
                });
            }
            return new _applications_applications_model__WEBPACK_IMPORTED_MODULE_2__["PatronAttribute"]({ attributeConsumerKey: attributeConsumerKey, value: value });
        });
    };
    PatronAttributesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        })
    ], PatronAttributesService);
    return PatronAttributesService;
}());



/***/ }),

/***/ "./src/app/sections/housing/preferences/preferences.service.ts":
/*!*********************************************************************!*\
  !*** ./src/app/sections/housing/preferences/preferences.service.ts ***!
  \*********************************************************************/
/*! exports provided: PreferencesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferencesService", function() { return PreferencesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _applications_applications_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../applications/applications.model */ "./src/app/sections/housing/applications/applications.model.ts");



var PreferencesService = /** @class */ (function () {
    function PreferencesService() {
    }
    PreferencesService.prototype.getPreferences = function (patronPreferences, parsedJson, questions) {
        var facilityPicker = parsedJson.filter(function (control) { return control && control.facilityPicker; })[0];
        if (!facilityPicker) {
            return patronPreferences.filter(function (preference) { return preference.facilityKey; });
        }
        var facilities = facilityPicker.values
            ? facilityPicker.values.filter(function (facility) { return facility.selected; })
            : [];
        var foundQuestion = questions[facilityPicker.name];
        return patronPreferences
            .slice(0, facilityPicker.prefRank)
            .map(function (preference) {
            var rank = preference.rank - 1;
            var foundFacility = foundQuestion ? foundQuestion[rank] : facilities[rank];
            if (!foundFacility) {
                return preference;
            }
            var facilityKey = foundFacility.facilityKey;
            return new _applications_applications_model__WEBPACK_IMPORTED_MODULE_2__["PatronPreference"](tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, preference, { facilityKey: facilityKey }));
        })
            .filter(function (preference) { return preference.facilityKey; });
    };
    PreferencesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        })
    ], PreferencesService);
    return PreferencesService;
}());



/***/ }),

/***/ "./src/app/sections/housing/questions/questions-storage.service.ts":
/*!*************************************************************************!*\
  !*** ./src/app/sections/housing/questions/questions-storage.service.ts ***!
  \*************************************************************************/
/*! exports provided: QuestionsStorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionsStorageService", function() { return QuestionsStorageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _housing_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../housing.config */ "./src/app/sections/housing/housing.config.ts");
/* harmony import */ var _shared_services_observable_storage_observable_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/services/observable-storage/observable-storage.service */ "./src/app/shared/services/observable-storage/observable-storage.service.ts");
/* harmony import */ var _shared_services_observable_session_storage_observable_session_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/services/observable-session-storage/observable-session-storage.service */ "./src/app/shared/services/observable-session-storage/observable-session-storage.service.ts");








var QuestionsStorageService = /** @class */ (function () {
    function QuestionsStorageService(_platform, _observableStorageService, _observableSessionStorageService) {
        this._platform = _platform;
        this._observableStorageService = _observableStorageService;
        this._observableSessionStorageService = _observableSessionStorageService;
        this._key = _housing_config__WEBPACK_IMPORTED_MODULE_5__["STORAGE_KEY"] + "-applications";
        this._observableStorage = this._platform.is('desktop')
            ? this._observableSessionStorageService
            : this._observableStorageService;
    }
    QuestionsStorageService.prototype.getApplication = function (key) {
        return this._observableStorage.get(this._key + "-" + key);
    };
    QuestionsStorageService.prototype.getApplicationStatus = function (key) {
        return this.getApplication(key).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (storedForm) { return (storedForm ? storedForm.status : null); }));
    };
    QuestionsStorageService.prototype.removeApplication = function (key) {
        return this._observableStorage.remove(this._key + "-" + key);
    };
    QuestionsStorageService.prototype.getQuestions = function (key) {
        return this.getApplication(key).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (storedForm) { return (storedForm ? storedForm.questions : null); }));
    };
    QuestionsStorageService.prototype.updateCreatedDateTime = function (key, createdDateTime) {
        var _this = this;
        if (createdDateTime === void 0) { createdDateTime = new Date().toISOString(); }
        return this.getApplication(key).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (storedForm) {
            if (storedForm && storedForm.createdDateTime) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(storedForm.createdDateTime);
            }
            return _this._observableStorage
                .set(_this._key + "-" + key, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, storedForm, { createdDateTime: createdDateTime }))
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function () { return createdDateTime; }));
        }));
    };
    QuestionsStorageService.prototype.updateSubmittedDateTime = function (key) {
        var _this = this;
        var submittedDateTime = new Date().toISOString();
        return this.getApplication(key).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (storedForm) {
            return _this._observableStorage.set(_this._key + "-" + key, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, storedForm, { submittedDateTime: submittedDateTime }));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function () { return submittedDateTime; }));
    };
    QuestionsStorageService.prototype.updateQuestions = function (key, formValue, status) {
        var _this = this;
        return this.getApplication(key).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (storedForm) {
            var questions = storedForm && storedForm.questions ? storedForm.questions : {};
            Object.keys(formValue).forEach(function (formControlName) { return (questions[formControlName] = formValue[formControlName]); });
            return _this._observableStorage.set(_this._key + "-" + key, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, storedForm, { status: status,
                questions: questions }));
        }));
    };
    QuestionsStorageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _shared_services_observable_storage_observable_storage_service__WEBPACK_IMPORTED_MODULE_6__["ObservableStorageService"],
            _shared_services_observable_session_storage_observable_session_storage_service__WEBPACK_IMPORTED_MODULE_7__["ObservableSessionStorageService"]])
    ], QuestionsStorageService);
    return QuestionsStorageService;
}());



/***/ }),

/***/ "./src/app/sections/housing/questions/questions.model.ts":
/*!***************************************************************!*\
  !*** ./src/app/sections/housing/questions/questions.model.ts ***!
  \***************************************************************/
/*! exports provided: QUESTIONS_SOURCES, QuestionHeader, QuestionParagraph, QuestionTextbox, QuestionTextarea, QuestionDate, QuestionCheckboxGroup, QuestionDropdown, QuestionReorder, QuestionFormControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUESTIONS_SOURCES", function() { return QUESTIONS_SOURCES; });
/* harmony import */ var _types_question_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/question-header */ "./src/app/sections/housing/questions/types/question-header.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionHeader", function() { return _types_question_header__WEBPACK_IMPORTED_MODULE_0__["QuestionHeader"]; });

/* harmony import */ var _types_question_paragraph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types/question-paragraph */ "./src/app/sections/housing/questions/types/question-paragraph.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionParagraph", function() { return _types_question_paragraph__WEBPACK_IMPORTED_MODULE_1__["QuestionParagraph"]; });

/* harmony import */ var _types_question_textbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types/question-textbox */ "./src/app/sections/housing/questions/types/question-textbox.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionTextbox", function() { return _types_question_textbox__WEBPACK_IMPORTED_MODULE_2__["QuestionTextbox"]; });

/* harmony import */ var _types_question_textarea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types/question-textarea */ "./src/app/sections/housing/questions/types/question-textarea.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionTextarea", function() { return _types_question_textarea__WEBPACK_IMPORTED_MODULE_3__["QuestionTextarea"]; });

/* harmony import */ var _types_question_date__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types/question-date */ "./src/app/sections/housing/questions/types/question-date.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionDate", function() { return _types_question_date__WEBPACK_IMPORTED_MODULE_4__["QuestionDate"]; });

/* harmony import */ var _types_question_checkbox_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types/question-checkbox-group */ "./src/app/sections/housing/questions/types/question-checkbox-group.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionCheckboxGroup", function() { return _types_question_checkbox_group__WEBPACK_IMPORTED_MODULE_5__["QuestionCheckboxGroup"]; });

/* harmony import */ var _types_question_dropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types/question-dropdown */ "./src/app/sections/housing/questions/types/question-dropdown.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionDropdown", function() { return _types_question_dropdown__WEBPACK_IMPORTED_MODULE_6__["QuestionDropdown"]; });

/* harmony import */ var _types_question_reorder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./types/question-reorder */ "./src/app/sections/housing/questions/types/question-reorder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionReorder", function() { return _types_question_reorder__WEBPACK_IMPORTED_MODULE_7__["QuestionReorder"]; });

/* harmony import */ var _types_question_form_control__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./types/question-form-control */ "./src/app/sections/housing/questions/types/question-form-control.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionFormControl", function() { return _types_question_form_control__WEBPACK_IMPORTED_MODULE_8__["QuestionFormControl"]; });










var QUESTIONS_SOURCES;
(function (QUESTIONS_SOURCES) {
    QUESTIONS_SOURCES["PATRON"] = "PATRON";
    QUESTIONS_SOURCES["FACILITY"] = "FACILITY";
    QUESTIONS_SOURCES["CORE"] = "CORE";
    QUESTIONS_SOURCES["FACILITY_TYPE"] = "FACILITY_TYPE";
    QUESTIONS_SOURCES["ASSET_TYPE"] = "ASSET_TYPE";
    QUESTIONS_SOURCES["CELL_PROVIDER"] = "CELL_PROVIDER";
    QUESTIONS_SOURCES["CONTRACT_DETAILS"] = "CONTRACT_DETAILS";
})(QUESTIONS_SOURCES || (QUESTIONS_SOURCES = {}));


/***/ }),

/***/ "./src/app/sections/housing/questions/questions.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/sections/housing/questions/questions.service.ts ***!
  \*****************************************************************/
/*! exports provided: QuestionConstructorsMap, QuestionsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionConstructorsMap", function() { return QuestionConstructorsMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionsService", function() { return QuestionsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/app/sections/housing/utils/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./src/app/sections/housing/questions/types/index.ts");
/* harmony import */ var _questions_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./questions.model */ "./src/app/sections/housing/questions/questions.model.ts");
/* harmony import */ var _sections_housing_questions_types_question_facility_attributes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/housing/questions/types/question-facility-attributes */ "./src/app/sections/housing/questions/types/question-facility-attributes.ts");
/* harmony import */ var _sections_housing_questions_types_question_blockquote__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sections/housing/questions/types/question-blockquote */ "./src/app/sections/housing/questions/types/question-blockquote.ts");
/* harmony import */ var _sections_housing_contracts_contracts_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/housing/contracts/contracts.model */ "./src/app/sections/housing/contracts/contracts.model.ts");









var QuestionConstructorsMap = {
    header: _types__WEBPACK_IMPORTED_MODULE_4__["QuestionHeader"],
    paragraph: _types__WEBPACK_IMPORTED_MODULE_4__["QuestionParagraph"],
    text: _types__WEBPACK_IMPORTED_MODULE_4__["QuestionTextbox"],
    textarea: _types__WEBPACK_IMPORTED_MODULE_4__["QuestionTextarea"],
    date: _types__WEBPACK_IMPORTED_MODULE_4__["QuestionDate"],
    select: _types__WEBPACK_IMPORTED_MODULE_4__["QuestionDropdown"],
    'checkbox-group': _types__WEBPACK_IMPORTED_MODULE_4__["QuestionCheckboxGroup"],
    'radio-group': _types__WEBPACK_IMPORTED_MODULE_4__["QuestionRadioGroup"],
};
var QuestionsService = /** @class */ (function () {
    function QuestionsService() {
        this._dataTypesValidators = {
            integer: Object(_utils__WEBPACK_IMPORTED_MODULE_3__["integerValidator"])(),
            numeric: Object(_utils__WEBPACK_IMPORTED_MODULE_3__["numericValidator"])(),
        };
    }
    QuestionsService.prototype.getQuestions = function (json) {
        return this._mapToQuestions(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseJsonToArray"])(json));
    };
    QuestionsService.prototype.splitByPages = function (questions) {
        return questions.reduce(function (accumulator, current, index) {
            if (current && current instanceof _sections_housing_questions_types_question_blockquote__WEBPACK_IMPORTED_MODULE_7__["QuestionBlockquote"]) {
                return questions[index + 1] ? accumulator.concat([[]]) : accumulator.slice();
            }
            accumulator[accumulator.length - 1].push(current);
            return accumulator;
        }, [[]]);
    };
    QuestionsService.prototype.getQuestionsPages = function (json) {
        var questions = this.getQuestions(json);
        return this.splitByPages(questions);
    };
    QuestionsService.prototype.toFormGroup = function (questions, storedQuestions, iteratee) {
        var group = {};
        questions
            .filter(function (question) { return question && question.name; })
            .forEach(function (question) {
            var questionName = question.name;
            var storedValue = storedQuestions && storedQuestions[questionName];
            iteratee(group, question, questionName, storedValue);
        });
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"](group);
    };
    QuestionsService.prototype.toQuestionCheckboxControl = function (storedValue, question) {
        var values = storedValue || question.values;
        var controls = values.map(function (value) { return new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](value.selected); });
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormArray"](controls);
    };
    QuestionsService.prototype.getAttributeValue = function (attributes, question) {
        var foundAttribute = attributes.find(function (attribute) { return attribute.attributeConsumerKey === question.consumerKey; });
        return foundAttribute ? foundAttribute.value : '';
    };
    QuestionsService.prototype.addDataTypeValidator = function (question, validators) {
        var dataType = question.dataType ? question.dataType.toLowerCase() : null;
        var dataTypeValidator = this._dataTypesValidators[dataType];
        if (dataTypeValidator) {
            validators.push(dataTypeValidator);
        }
    };
    QuestionsService.prototype._mapToQuestions = function (questions) {
        return questions
            .map(function (question) {
            if (!question || !question.type) {
                return new _types__WEBPACK_IMPORTED_MODULE_4__["QuestionBase"]();
            }
            if (!QuestionConstructorsMap[question.type]) {
                return new _types__WEBPACK_IMPORTED_MODULE_4__["QuestionBase"](question);
            }
            if (question.type === 'paragraph' &&
                question.subtype === 'blockquote') {
                return new _sections_housing_questions_types_question_blockquote__WEBPACK_IMPORTED_MODULE_7__["QuestionBlockquote"](question);
            }
            else if (question.facilityPicker) {
                return new _questions_model__WEBPACK_IMPORTED_MODULE_5__["QuestionReorder"](question);
            }
            else if (question.chargeSchedule) {
                return new _types__WEBPACK_IMPORTED_MODULE_4__["QuestionChargeScheduleBase"](question);
            }
            else if (question.source) {
                if (question.source === _questions_model__WEBPACK_IMPORTED_MODULE_5__["QUESTIONS_SOURCES"].CONTRACT_DETAILS) {
                    if (question.contractId === _sections_housing_contracts_contracts_model__WEBPACK_IMPORTED_MODULE_8__["CONTRACT_DETAIL_KEYS"].DATE_SIGNED) {
                        return new _types__WEBPACK_IMPORTED_MODULE_4__["QuestionDateSigned"](question);
                    }
                    else {
                        return new _types__WEBPACK_IMPORTED_MODULE_4__["QuestionContractDetails"](question);
                    }
                }
                else if (question.source === _questions_model__WEBPACK_IMPORTED_MODULE_5__["QUESTIONS_SOURCES"].FACILITY) {
                    return new _sections_housing_questions_types_question_facility_attributes__WEBPACK_IMPORTED_MODULE_6__["QuestionFacilityAttributes"](question);
                }
            }
            return new QuestionConstructorsMap[question.type](question);
        })
            .sort(this._sortByQuestionDateSigned);
    };
    QuestionsService.prototype._sortByQuestionDateSigned = function (current, next) {
        if (current instanceof _types__WEBPACK_IMPORTED_MODULE_4__["QuestionDateSigned"]) {
            return 1;
        }
        return 0;
    };
    QuestionsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        })
    ], QuestionsService);
    return QuestionsService;
}());



/***/ }),

/***/ "./src/app/sections/housing/questions/types/index.ts":
/*!***********************************************************!*\
  !*** ./src/app/sections/housing/questions/types/index.ts ***!
  \***********************************************************/
/*! exports provided: QuestionBase, QuestionFormControl, QuestionHeader, QuestionReorder, QuestionCheckboxGroup, QuestionDate, QuestionDropdown, QuestionParagraph, QuestionRadioGroup, QuestionTextarea, QuestionTextbox, QuestionChargeScheduleBase, QuestionChargeSchedule, QuestionContractDetails, QuestionDateSigned */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _question_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./question-base */ "./src/app/sections/housing/questions/types/question-base.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionBase", function() { return _question_base__WEBPACK_IMPORTED_MODULE_0__["QuestionBase"]; });

/* harmony import */ var _question_checkbox_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./question-checkbox-group */ "./src/app/sections/housing/questions/types/question-checkbox-group.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionCheckboxGroup", function() { return _question_checkbox_group__WEBPACK_IMPORTED_MODULE_1__["QuestionCheckboxGroup"]; });

/* harmony import */ var _question_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./question-date */ "./src/app/sections/housing/questions/types/question-date.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionDate", function() { return _question_date__WEBPACK_IMPORTED_MODULE_2__["QuestionDate"]; });

/* harmony import */ var _question_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./question-dropdown */ "./src/app/sections/housing/questions/types/question-dropdown.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionDropdown", function() { return _question_dropdown__WEBPACK_IMPORTED_MODULE_3__["QuestionDropdown"]; });

/* harmony import */ var _question_form_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./question-form-control */ "./src/app/sections/housing/questions/types/question-form-control.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionFormControl", function() { return _question_form_control__WEBPACK_IMPORTED_MODULE_4__["QuestionFormControl"]; });

/* harmony import */ var _question_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./question-header */ "./src/app/sections/housing/questions/types/question-header.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionHeader", function() { return _question_header__WEBPACK_IMPORTED_MODULE_5__["QuestionHeader"]; });

/* harmony import */ var _question_paragraph__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./question-paragraph */ "./src/app/sections/housing/questions/types/question-paragraph.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionParagraph", function() { return _question_paragraph__WEBPACK_IMPORTED_MODULE_6__["QuestionParagraph"]; });

/* harmony import */ var _question_radio_group__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./question-radio-group */ "./src/app/sections/housing/questions/types/question-radio-group.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionRadioGroup", function() { return _question_radio_group__WEBPACK_IMPORTED_MODULE_7__["QuestionRadioGroup"]; });

/* harmony import */ var _question_reorder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./question-reorder */ "./src/app/sections/housing/questions/types/question-reorder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionReorder", function() { return _question_reorder__WEBPACK_IMPORTED_MODULE_8__["QuestionReorder"]; });

/* harmony import */ var _question_textarea__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./question-textarea */ "./src/app/sections/housing/questions/types/question-textarea.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionTextarea", function() { return _question_textarea__WEBPACK_IMPORTED_MODULE_9__["QuestionTextarea"]; });

/* harmony import */ var _question_textbox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./question-textbox */ "./src/app/sections/housing/questions/types/question-textbox.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionTextbox", function() { return _question_textbox__WEBPACK_IMPORTED_MODULE_10__["QuestionTextbox"]; });

/* harmony import */ var _question_charge_schedule__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./question-charge-schedule */ "./src/app/sections/housing/questions/types/question-charge-schedule.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionChargeScheduleBase", function() { return _question_charge_schedule__WEBPACK_IMPORTED_MODULE_11__["QuestionChargeScheduleBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionChargeSchedule", function() { return _question_charge_schedule__WEBPACK_IMPORTED_MODULE_11__["QuestionChargeSchedule"]; });

/* harmony import */ var _question_contract_details__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./question-contract-details */ "./src/app/sections/housing/questions/types/question-contract-details.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionContractDetails", function() { return _question_contract_details__WEBPACK_IMPORTED_MODULE_12__["QuestionContractDetails"]; });

/* harmony import */ var _question_date_signed__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./question-date-signed */ "./src/app/sections/housing/questions/types/question-date-signed.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionDateSigned", function() { return _question_date_signed__WEBPACK_IMPORTED_MODULE_13__["QuestionDateSigned"]; });

















/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-base.ts":
/*!*******************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-base.ts ***!
  \*******************************************************************/
/*! exports provided: QuestionBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionBase", function() { return QuestionBase; });
var QuestionBase = /** @class */ (function () {
    function QuestionBase(options) {
        if (options === void 0) { options = {}; }
        this.type = options.type || '';
        this.label = options.label || '';
        this.attribute = options.attribute || null;
    }
    return QuestionBase;
}());



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-blockquote.ts":
/*!*************************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-blockquote.ts ***!
  \*************************************************************************/
/*! exports provided: QuestionBlockquote */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionBlockquote", function() { return QuestionBlockquote; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sections_housing_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sections/housing/utils */ "./src/app/sections/housing/utils/index.ts");
/* harmony import */ var _question_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./question-base */ "./src/app/sections/housing/questions/types/question-base.ts");



var QuestionBlockquote = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionBlockquote, _super);
    function QuestionBlockquote(options) {
        var _this = this;
        if (!Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options) || typeof options !== 'object') {
            options = {};
        }
        _this = _super.call(this, options) || this;
        _this.subtype = options.subtype || 'blockquote';
        return _this;
    }
    return QuestionBlockquote;
}(_question_base__WEBPACK_IMPORTED_MODULE_2__["QuestionBase"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-charge-schedule.ts":
/*!******************************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-charge-schedule.ts ***!
  \******************************************************************************/
/*! exports provided: QuestionChargeScheduleBase, QuestionChargeSchedule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionChargeScheduleBase", function() { return QuestionChargeScheduleBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionChargeSchedule", function() { return QuestionChargeSchedule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./src/app/sections/housing/utils/index.ts");
/* harmony import */ var _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/housing/charge-schedules/charge-schedules.model */ "./src/app/sections/housing/charge-schedules/charge-schedules.model.ts");
/* harmony import */ var _sections_housing_questions_types_question_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/housing/questions/types/question-base */ "./src/app/sections/housing/questions/types/question-base.ts");




var QuestionChargeScheduleBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionChargeScheduleBase, _super);
    function QuestionChargeScheduleBase(options) {
        var _this = this;
        if (!Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options) || typeof options !== 'object') {
            options = {};
        }
        _this = _super.call(this, options) || this;
        _this.required = Boolean(options.required);
        _this.inline = Boolean(options.inline);
        _this.name = String(options.name);
        _this.other = Boolean(options.other);
        _this.values = Array.isArray(options.values)
            ? options.values.map(function (value) { return new _sections_housing_charge_schedules_charge_schedules_model__WEBPACK_IMPORTED_MODULE_2__["ChargeScheduleValue"](value); })
            : [];
        _this.consumerKey = Number(options.consumerKey);
        _this.chargeSchedule = Boolean(options.chargeSchedule);
        return _this;
    }
    return QuestionChargeScheduleBase;
}(_sections_housing_questions_types_question_base__WEBPACK_IMPORTED_MODULE_3__["QuestionBase"]));

var QuestionChargeSchedule = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionChargeSchedule, _super);
    function QuestionChargeSchedule(options) {
        var _this = this;
        if (!Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options) || typeof options !== 'object') {
            options = {};
        }
        _this = _super.call(this, options) || this;
        _this.type = 'charge-schedules';
        _this.chargeSchedulesGroup = Array.isArray(options.chargeSchedulesGroup) ? options.chargeSchedulesGroup : [];
        return _this;
    }
    return QuestionChargeSchedule;
}(_sections_housing_questions_types_question_base__WEBPACK_IMPORTED_MODULE_3__["QuestionBase"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-checkbox-group.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-checkbox-group.ts ***!
  \*****************************************************************************/
/*! exports provided: QuestionCheckboxGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionCheckboxGroup", function() { return QuestionCheckboxGroup; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _question_form_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./question-form-control */ "./src/app/sections/housing/questions/types/question-form-control.ts");


var counter = 0;
var QuestionCheckboxGroup = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionCheckboxGroup, _super);
    function QuestionCheckboxGroup(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.name = options.name || "checkbox-group-" + counter++;
        _this.values = options.values || [];
        return _this;
    }
    return QuestionCheckboxGroup;
}(_question_form_control__WEBPACK_IMPORTED_MODULE_1__["QuestionFormControl"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-contract-details.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-contract-details.ts ***!
  \*******************************************************************************/
/*! exports provided: QuestionContractDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionContractDetails", function() { return QuestionContractDetails; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sections_housing_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sections/housing/utils */ "./src/app/sections/housing/utils/index.ts");
/* harmony import */ var _question_form_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./question-form-control */ "./src/app/sections/housing/questions/types/question-form-control.ts");



var counter = 0;
var QuestionContractDetails = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionContractDetails, _super);
    function QuestionContractDetails(options) {
        var _this = this;
        if (!Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options) || typeof options !== 'object') {
            options = {};
        }
        _this = _super.call(this, options) || this;
        _this.type = options.type || 'text';
        _this.name = options.name || "text-" + counter++;
        _this.subtype = options.subtype || 'text';
        _this.source = String(options.source);
        _this.contractId = String(options.contractId);
        return _this;
    }
    return QuestionContractDetails;
}(_question_form_control__WEBPACK_IMPORTED_MODULE_2__["QuestionFormControl"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-date-signed.ts":
/*!**************************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-date-signed.ts ***!
  \**************************************************************************/
/*! exports provided: QuestionDateSigned */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionDateSigned", function() { return QuestionDateSigned; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sections_housing_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sections/housing/utils */ "./src/app/sections/housing/utils/index.ts");
/* harmony import */ var _sections_housing_questions_types_question_form_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/housing/questions/types/question-form-control */ "./src/app/sections/housing/questions/types/question-form-control.ts");



var QuestionDateSigned = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionDateSigned, _super);
    function QuestionDateSigned(options) {
        var _this = this;
        if (!Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options) || typeof options !== 'object') {
            options = {};
        }
        _this = _super.call(this, options) || this;
        _this.type = 'date-signed';
        return _this;
    }
    return QuestionDateSigned;
}(_sections_housing_questions_types_question_form_control__WEBPACK_IMPORTED_MODULE_2__["QuestionFormControl"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-date.ts":
/*!*******************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-date.ts ***!
  \*******************************************************************/
/*! exports provided: QuestionDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionDate", function() { return QuestionDate; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _question_form_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./question-form-control */ "./src/app/sections/housing/questions/types/question-form-control.ts");


var counter = 0;
var QuestionDate = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionDate, _super);
    function QuestionDate(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.name = options.name || "date-" + counter++;
        return _this;
    }
    return QuestionDate;
}(_question_form_control__WEBPACK_IMPORTED_MODULE_1__["QuestionFormControl"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-dropdown.ts":
/*!***********************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-dropdown.ts ***!
  \***********************************************************************/
/*! exports provided: QuestionDropdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionDropdown", function() { return QuestionDropdown; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _question_form_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./question-form-control */ "./src/app/sections/housing/questions/types/question-form-control.ts");


var counter = 0;
var QuestionDropdown = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionDropdown, _super);
    function QuestionDropdown(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.values = options.values || [];
        _this.name = options.name || "select-" + counter++;
        return _this;
    }
    return QuestionDropdown;
}(_question_form_control__WEBPACK_IMPORTED_MODULE_1__["QuestionFormControl"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-facility-attributes.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-facility-attributes.ts ***!
  \**********************************************************************************/
/*! exports provided: QuestionFacilityAttributes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionFacilityAttributes", function() { return QuestionFacilityAttributes; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sections_housing_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sections/housing/utils */ "./src/app/sections/housing/utils/index.ts");
/* harmony import */ var _question_form_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./question-form-control */ "./src/app/sections/housing/questions/types/question-form-control.ts");



var counter = 0;
var QuestionFacilityAttributes = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionFacilityAttributes, _super);
    function QuestionFacilityAttributes(options) {
        var _this = this;
        if (!Object(_sections_housing_utils__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options) || typeof options !== 'object') {
            options = {};
        }
        _this = _super.call(this, options) || this;
        _this.type = options.type || 'text';
        _this.name = options.name || "text-" + counter++;
        _this.subtype = options.subtype || 'text';
        _this.source = String(options.source);
        _this.contractId = String(options.contractId);
        return _this;
    }
    return QuestionFacilityAttributes;
}(_question_form_control__WEBPACK_IMPORTED_MODULE_2__["QuestionFormControl"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-form-control.ts":
/*!***************************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-form-control.ts ***!
  \***************************************************************************/
/*! exports provided: QuestionFormControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionFormControl", function() { return QuestionFormControl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _question_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./question-base */ "./src/app/sections/housing/questions/types/question-base.ts");


var QuestionFormControl = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionFormControl, _super);
    function QuestionFormControl(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.name = options.name;
        _this.required = !!options.required;
        _this.consumerKey = options.consumerKey >= 0 ? options.consumerKey : null;
        _this.preferenceKey = options.preferenceKey >= 0 ? options.preferenceKey : null;
        _this.facilityKey = options.facilityKey >= 0 ? options.facilityKey : null;
        if (options.dataType) {
            _this.dataType = String(options.dataType);
        }
        if (options.source) {
            _this.source = String(options.source);
        }
        return _this;
    }
    return QuestionFormControl;
}(_question_base__WEBPACK_IMPORTED_MODULE_1__["QuestionBase"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-header.ts":
/*!*********************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-header.ts ***!
  \*********************************************************************/
/*! exports provided: QuestionHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionHeader", function() { return QuestionHeader; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _question_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./question-base */ "./src/app/sections/housing/questions/types/question-base.ts");


var QuestionHeader = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionHeader, _super);
    function QuestionHeader(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.subtype = options.subtype || 'h3';
        return _this;
    }
    return QuestionHeader;
}(_question_base__WEBPACK_IMPORTED_MODULE_1__["QuestionBase"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-paragraph.ts":
/*!************************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-paragraph.ts ***!
  \************************************************************************/
/*! exports provided: QuestionParagraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionParagraph", function() { return QuestionParagraph; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _question_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./question-base */ "./src/app/sections/housing/questions/types/question-base.ts");


var QuestionParagraph = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionParagraph, _super);
    function QuestionParagraph(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.subtype = options.subtype || 'p';
        return _this;
    }
    return QuestionParagraph;
}(_question_base__WEBPACK_IMPORTED_MODULE_1__["QuestionBase"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-radio-group.ts":
/*!**************************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-radio-group.ts ***!
  \**************************************************************************/
/*! exports provided: QuestionRadioGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionRadioGroup", function() { return QuestionRadioGroup; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _question_form_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./question-form-control */ "./src/app/sections/housing/questions/types/question-form-control.ts");


var counter = 0;
var QuestionRadioGroup = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionRadioGroup, _super);
    function QuestionRadioGroup(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.name = options.name || "radio-group-" + counter++;
        _this.values = options.values || [];
        return _this;
    }
    return QuestionRadioGroup;
}(_question_form_control__WEBPACK_IMPORTED_MODULE_1__["QuestionFormControl"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-reorder.ts":
/*!**********************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-reorder.ts ***!
  \**********************************************************************/
/*! exports provided: QuestionReorder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionReorder", function() { return QuestionReorder; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./src/app/sections/housing/utils/index.ts");
/* harmony import */ var _question_form_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./question-form-control */ "./src/app/sections/housing/questions/types/question-form-control.ts");



var QuestionReorder = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionReorder, _super);
    function QuestionReorder(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.type = 'facility-picker';
        _this.inline = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["define"])(options.inline, Boolean(options.inline));
        _this.facilityPicker = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["define"])(options.facilityPicker, Boolean(options.facilityPicker));
        _this.values = options.values || [];
        _this.prefRank = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["define"])(options.prefRank, Number(options.prefRank));
        _this.values = options.values || [];
        _this.PrefKeys = options.PrefKeys || [];
        return _this;
    }
    QuestionReorder.sort = function (preferences, current, next, length) {
        var currentIndex = preferences.findIndex(function (preference) { return preference.facilityKey === current.facilityKey; });
        var nextIndex = preferences.findIndex(function (preference) { return preference.facilityKey === next.facilityKey; });
        if (currentIndex === -1) {
            currentIndex = length;
        }
        if (nextIndex === -1) {
            nextIndex = length;
        }
        return currentIndex - nextIndex;
    };
    return QuestionReorder;
}(_question_form_control__WEBPACK_IMPORTED_MODULE_2__["QuestionFormControl"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-textarea.ts":
/*!***********************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-textarea.ts ***!
  \***********************************************************************/
/*! exports provided: QuestionTextarea */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionTextarea", function() { return QuestionTextarea; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _question_textbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./question-textbox */ "./src/app/sections/housing/questions/types/question-textbox.ts");


var counter = 0;
var QuestionTextarea = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionTextarea, _super);
    function QuestionTextarea(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.type = options.type || 'textarea';
        _this.subtype = options.subtype || 'textarea';
        _this.name = options.name || "textarea-" + counter++;
        return _this;
    }
    return QuestionTextarea;
}(_question_textbox__WEBPACK_IMPORTED_MODULE_1__["QuestionTextbox"]));



/***/ }),

/***/ "./src/app/sections/housing/questions/types/question-textbox.ts":
/*!**********************************************************************!*\
  !*** ./src/app/sections/housing/questions/types/question-textbox.ts ***!
  \**********************************************************************/
/*! exports provided: QuestionTextbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionTextbox", function() { return QuestionTextbox; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _question_form_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./question-form-control */ "./src/app/sections/housing/questions/types/question-form-control.ts");


var counter = 0;
var QuestionTextbox = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QuestionTextbox, _super);
    function QuestionTextbox(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.type = options.type || 'text';
        _this.name = options.name || "text-" + counter++;
        _this.subtype = options.subtype || 'text';
        return _this;
    }
    return QuestionTextbox;
}(_question_form_control__WEBPACK_IMPORTED_MODULE_1__["QuestionFormControl"]));



/***/ }),

/***/ "./src/app/sections/housing/terms/terms.model.ts":
/*!*******************************************************!*\
  !*** ./src/app/sections/housing/terms/terms.model.ts ***!
  \*******************************************************/
/*! exports provided: Term */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Term", function() { return Term; });
var Term = /** @class */ (function () {
    function Term(options) {
        if (options == null || typeof options !== 'object') {
            options = {};
        }
        this.termId = Number(options.termId);
        this.termStartDate = String(options.termStartDate);
        this.termEndDate = String(options.termEndDate);
        this.termName = String(options.termName);
    }
    return Term;
}());



/***/ }),

/***/ "./src/app/sections/housing/terms/terms.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/sections/housing/terms/terms.service.ts ***!
  \*********************************************************/
/*! exports provided: TermsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsService", function() { return TermsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environment */ "./src/app/environment.ts");
/* harmony import */ var _housing_proxy_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../housing-proxy.service */ "./src/app/sections/housing/housing-proxy.service.ts");
/* harmony import */ var _terms_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./terms.model */ "./src/app/sections/housing/terms/terms.model.ts");







var TermsService = /** @class */ (function () {
    function TermsService(_housingProxyService) {
        this._housingProxyService = _housingProxyService;
        this._termIdSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this.termId$ = this._termIdSource.asObservable();
    }
    TermsService.prototype.getTerms = function () {
        var apiUrl = _environment__WEBPACK_IMPORTED_MODULE_4__["Environment"].currentEnvironment.housing_aws_url + "/patron-applications/v.1.0/patron-terms/patrons/self";
        return this._housingProxyService.get(apiUrl).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (terms) { return (Array.isArray(terms) ? terms.map(function (term) { return new _terms_model__WEBPACK_IMPORTED_MODULE_6__["Term"](term); }) : []); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])([]); }));
    };
    TermsService.prototype.setTermId = function (termId) {
        this._termIdSource.next(termId);
    };
    TermsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_housing_proxy_service__WEBPACK_IMPORTED_MODULE_5__["HousingProxyService"]])
    ], TermsService);
    return TermsService;
}());



/***/ }),

/***/ "./src/app/sections/housing/utils/define.ts":
/*!**************************************************!*\
  !*** ./src/app/sections/housing/utils/define.ts ***!
  \**************************************************/
/*! exports provided: define */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "define", function() { return define; });
/* harmony import */ var _is_defined__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-defined */ "./src/app/sections/housing/utils/is-defined.ts");

/**
 * Check if value is not null or undefined
 * and then set to value otherwise set to fallback
 *
 * @param value {*} - Value to check if not null or undefined
 * @param fallback {*} - Set this value if not null or undefined
 *
 * @returns {*}
 */
function define(value, fallback) {
    if (fallback === void 0) { fallback = value; }
    return Object(_is_defined__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(value) ? value : fallback;
}


/***/ }),

/***/ "./src/app/sections/housing/utils/has-value.ts":
/*!*****************************************************!*\
  !*** ./src/app/sections/housing/utils/has-value.ts ***!
  \*****************************************************/
/*! exports provided: hasValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasValue", function() { return hasValue; });
/**
 * Checking if some property or variable has value
 *
 * @param {*} value - Value to check
 *
 * @returns {Boolean}
 */
function hasValue(value) {
    return Array.isArray(value)
        ? !value.some(function (item) { return item == null || item === ''; })
        : !(value == null || value === '');
}


/***/ }),

/***/ "./src/app/sections/housing/utils/index.ts":
/*!*************************************************!*\
  !*** ./src/app/sections/housing/utils/index.ts ***!
  \*************************************************/
/*! exports provided: parseJsonToArray, hasValue, define, isDefined, trimEmptyKeys, integerValidator, numericValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parse_json_to_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse-json-to-array */ "./src/app/sections/housing/utils/parse-json-to-array.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseJsonToArray", function() { return _parse_json_to_array__WEBPACK_IMPORTED_MODULE_0__["parseJsonToArray"]; });

/* harmony import */ var _has_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./has-value */ "./src/app/sections/housing/utils/has-value.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasValue", function() { return _has_value__WEBPACK_IMPORTED_MODULE_1__["hasValue"]; });

/* harmony import */ var _define__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./define */ "./src/app/sections/housing/utils/define.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "define", function() { return _define__WEBPACK_IMPORTED_MODULE_2__["define"]; });

/* harmony import */ var _is_defined__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./is-defined */ "./src/app/sections/housing/utils/is-defined.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDefined", function() { return _is_defined__WEBPACK_IMPORTED_MODULE_3__["isDefined"]; });

/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validators */ "./src/app/sections/housing/utils/validators/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "integerValidator", function() { return _validators__WEBPACK_IMPORTED_MODULE_4__["integerValidator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "numericValidator", function() { return _validators__WEBPACK_IMPORTED_MODULE_4__["numericValidator"]; });

/* harmony import */ var _trim_empty_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./trim-empty-keys */ "./src/app/sections/housing/utils/trim-empty-keys.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trimEmptyKeys", function() { return _trim_empty_keys__WEBPACK_IMPORTED_MODULE_5__["trimEmptyKeys"]; });









/***/ }),

/***/ "./src/app/sections/housing/utils/is-defined.ts":
/*!******************************************************!*\
  !*** ./src/app/sections/housing/utils/is-defined.ts ***!
  \******************************************************/
/*! exports provided: isDefined */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDefined", function() { return isDefined; });
/**
 * Checks if value is not null or undefined
 *
 * @param value {*} - Value to check
 *
 * @returns {Boolean}
 */
function isDefined(value) {
    return value != null;
}


/***/ }),

/***/ "./src/app/sections/housing/utils/parse-json-to-array.ts":
/*!***************************************************************!*\
  !*** ./src/app/sections/housing/utils/parse-json-to-array.ts ***!
  \***************************************************************/
/*! exports provided: parseJsonToArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseJsonToArray", function() { return parseJsonToArray; });
/**
 * Tries to parse json and returns parsed array
 * or empty array
 *
 * @param json {String} - json string to parse
 *
 * @returns {Array}
 */
function parseJsonToArray(json) {
    try {
        var parsedArray = JSON.parse(json);
        return Array.isArray(parsedArray) ? parsedArray : [];
    }
    catch (error) {
        return [];
    }
}


/***/ }),

/***/ "./src/app/sections/housing/utils/trim-empty-keys.ts":
/*!***********************************************************!*\
  !*** ./src/app/sections/housing/utils/trim-empty-keys.ts ***!
  \***********************************************************/
/*! exports provided: trimEmptyKeys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimEmptyKeys", function() { return trimEmptyKeys; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _is_defined__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-defined */ "./src/app/sections/housing/utils/is-defined.ts");


/**
 * Removes properties which values are null or undefined
 *
 * @param collection {*} - Collection to trim
 *
 * @returns {*} - Trimmed collection
 */
function trimEmptyKeys(collection) {
    return Object.keys(collection)
        .filter(function (key) { return Object(_is_defined__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(collection[key]); })
        .reduce(function (accumulator, key) {
        var _a;
        return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, accumulator, (_a = {}, _a[key] = collection[key], _a)));
    }, {});
}


/***/ }),

/***/ "./src/app/sections/housing/utils/validators/index.ts":
/*!************************************************************!*\
  !*** ./src/app/sections/housing/utils/validators/index.ts ***!
  \************************************************************/
/*! exports provided: integerValidator, numericValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integer */ "./src/app/sections/housing/utils/validators/integer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "integerValidator", function() { return _integer__WEBPACK_IMPORTED_MODULE_0__["integerValidator"]; });

/* harmony import */ var _numeric__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./numeric */ "./src/app/sections/housing/utils/validators/numeric.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "numericValidator", function() { return _numeric__WEBPACK_IMPORTED_MODULE_1__["numericValidator"]; });





/***/ }),

/***/ "./src/app/sections/housing/utils/validators/integer.ts":
/*!**************************************************************!*\
  !*** ./src/app/sections/housing/utils/validators/integer.ts ***!
  \**************************************************************/
/*! exports provided: integerValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "integerValidator", function() { return integerValidator; });
function integerValidator() {
    return function (control) {
        if (control.value && control.value !== "" + parseInt(control.value, 10)) {
            return { integer: true };
        }
        return null;
    };
}


/***/ }),

/***/ "./src/app/sections/housing/utils/validators/numeric.ts":
/*!**************************************************************!*\
  !*** ./src/app/sections/housing/utils/validators/numeric.ts ***!
  \**************************************************************/
/*! exports provided: numericValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numericValidator", function() { return numericValidator; });
function numericValidator() {
    return function (control) {
        if (control.value && control.value !== "" + parseFloat(control.value)) {
            return { numeric: true };
        }
        return null;
    };
}


/***/ }),

/***/ "./src/app/shared/services/observable-session-storage/observable-session-storage.service.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/shared/services/observable-session-storage/observable-session-storage.service.ts ***!
  \**************************************************************************************************/
/*! exports provided: ObservableSessionStorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableSessionStorageService", function() { return ObservableSessionStorageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var ObservableSessionStorageService = /** @class */ (function () {
    function ObservableSessionStorageService() {
    }
    ObservableSessionStorageService.prototype.get = function (key) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subscriber) {
            var stringifiedValue = window.sessionStorage.getItem(key);
            var value = JSON.parse(stringifiedValue);
            subscriber.next(value);
            subscriber.complete();
        });
    };
    ObservableSessionStorageService.prototype.set = function (key, value) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subscriber) {
            var stringifiedValue = JSON.stringify(value);
            window.sessionStorage.setItem(key, stringifiedValue);
            subscriber.next(value);
            subscriber.complete();
        });
    };
    ObservableSessionStorageService.prototype.remove = function (key) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subscriber) {
            window.sessionStorage.removeItem(key);
            subscriber.next();
            subscriber.complete();
        });
    };
    ObservableSessionStorageService.prototype.clear = function () {
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subscriber) {
            window.sessionStorage.clear();
            subscriber.next();
            subscriber.complete();
        });
    };
    ObservableSessionStorageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        })
    ], ObservableSessionStorageService);
    return ObservableSessionStorageService;
}());



/***/ }),

/***/ "./src/app/shared/services/observable-storage/observable-storage.service.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/shared/services/observable-storage/observable-storage.service.ts ***!
  \**********************************************************************************/
/*! exports provided: ObservableStorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableStorageService", function() { return ObservableStorageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");




var ObservableStorageService = /** @class */ (function () {
    function ObservableStorageService(_storage) {
        this._storage = _storage;
    }
    ObservableStorageService.prototype.get = function (key) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this._storage.get(key));
    };
    ObservableStorageService.prototype.set = function (key, value) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this._storage.set(key, value));
    };
    ObservableStorageService.prototype.remove = function (key) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this._storage.remove(key));
    };
    ObservableStorageService.prototype.clear = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this._storage.clear());
    };
    ObservableStorageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"]])
    ], ObservableStorageService);
    return ObservableStorageService;
}());



/***/ })

}]);
//# sourceMappingURL=default~pages-application-details-application-details-module~pages-contract-details-contract-details~79b0a167.js.map