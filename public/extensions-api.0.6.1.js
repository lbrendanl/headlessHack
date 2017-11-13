(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tableau"] = factory();
	else
		root["tableau"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	// Due to the way we configured webpack, we should be exporting things which will be under
	// a global variable called "tableau". Export everything we want to be visible under tableau
	// from this file.
	var ExtensionsImpl_1 = __webpack_require__(1);
	var Extensions_1 = __webpack_require__(79);
	var api_shared_1 = __webpack_require__(8);
	api_shared_1.VersionNumber.SetVersionNumber(("0.6.1"));
	var extensionImpl = new ExtensionsImpl_1.ExtensionsImpl();
	exports.extensions = new Extensions_1.Extensions(extensionImpl);
	// Export Enums
	// These show up under the tableau object. I.e. tableau.ExtensionContext.Server
	var api_external_contract_1 = __webpack_require__(64);
	exports.ExtensionContext = api_external_contract_1.ExtensionContext;
	exports.ExtensionMode = api_external_contract_1.ExtensionMode;
	exports.AnalyticsObjectType = api_external_contract_1.AnalyticsObjectType;
	exports.ColumnType = api_external_contract_1.ColumnType;
	exports.DashboardObjectType = api_external_contract_1.DashboardObjectType;
	exports.DataType = api_external_contract_1.DataType;
	exports.DateRangeType = api_external_contract_1.DateRangeType;
	exports.DialogEventType = api_external_contract_1.DialogEventType;
	exports.EncodingType = api_external_contract_1.EncodingType;
	exports.ErrorCodes = api_external_contract_1.ErrorCodes;
	exports.FieldAggregationType = api_external_contract_1.FieldAggregationType;
	exports.FieldRoleType = api_external_contract_1.FieldRoleType;
	exports.FilterDomainType = api_external_contract_1.FilterDomainType;
	exports.FilterType = api_external_contract_1.FilterType;
	exports.FilterUpdateType = api_external_contract_1.FilterUpdateType;
	exports.FilterNullOption = api_external_contract_1.FilterNullOption;
	exports.MarkType = api_external_contract_1.MarkType;
	exports.ParameterValueType = api_external_contract_1.ParameterValueType;
	exports.PeriodType = api_external_contract_1.PeriodType;
	exports.QuickTableCalcType = api_external_contract_1.QuickTableCalcType;
	exports.SelectionUpdateType = api_external_contract_1.SelectionUpdateType;
	exports.SheetType = api_external_contract_1.SheetType;
	exports.SortDirection = api_external_contract_1.SortDirection;
	exports.TableauEventType = api_external_contract_1.TableauEventType;
	exports.TrendLineModelType = api_external_contract_1.TrendLineModelType;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_internal_contract_1 = __webpack_require__(2);
	var api_shared_1 = __webpack_require__(8);
	var api_utils_1 = __webpack_require__(52);
	var Dashboard_1 = __webpack_require__(53);
	var DashboardContent_1 = __webpack_require__(55);
	var Environment_1 = __webpack_require__(56);
	var Settings_1 = __webpack_require__(57);
	var UI_1 = __webpack_require__(58);
	var RegisterAllExtensionsServices_1 = __webpack_require__(59);
	var DashboardImpl_1 = __webpack_require__(63);
	var SettingsImpl_1 = __webpack_require__(75);
	var UIImpl_1 = __webpack_require__(76);
	var ExtensionsImpl = (function () {
	    function ExtensionsImpl() {
	    }
	    ExtensionsImpl.prototype.initializeAsync = function () {
	        var _this = this;
	        if (!this._initializationPromise) {
	            this._initializationPromise = new Promise(function (resolve, reject) {
	                // First thing we want to do is check to see if there is a desktop dispatcher already registered for us
	                if (api_internal_contract_1.InternalApiDispatcherHolder.hasDesktopApiDispatcherPromise()) {
	                    // Running in desktop, use this promise
	                    var desktopDispatcherPromise = api_internal_contract_1.InternalApiDispatcherHolder.getDesktopDispatcherPromise();
	                    desktopDispatcherPromise.then(_this.onDispatcherReceived.bind(_this)).then(function () { resolve(); });
	                }
	                else {
	                    // We must be running in server, so we should try to kick of the server dispatcher bootstrapping
	                    api_shared_1.doCrossFrameBootstrap(window, api_shared_1.VersionNumber.Instance).then(_this.onDispatcherReceived.bind(_this)).then(function () { resolve(); });
	                }
	            });
	        }
	        return this._initializationPromise;
	    };
	    ExtensionsImpl.prototype.onDispatcherReceived = function (dispatcher) {
	        var _this = this;
	        dispatcher.setVersionNumber(api_shared_1.VersionNumber.Instance);
	        // Call to register all the services which will use the newly initialized dispatcher
	        api_shared_1.registerAllSharedServices(dispatcher);
	        RegisterAllExtensionsServices_1.registerAllExtensionsServices(dispatcher);
	        // Get the initialization service and initialize this extension
	        var initializationService = api_shared_1.ApiServiceRegistry.instance.getService("InitializationService" /* InitializationService */);
	        return initializationService.initializeDashboardExtensionsAsync().then(function (result) {
	            if (!result.extensionInstance.locator.dashboardPath) {
	                throw api_utils_1.TableauException.isUndefined(['DashboardPath']);
	            }
	            _this.dashboardContent = _this.initializeDashboardContent(result.extensionDashboardInfo, result.extensionInstance.locator.dashboardPath);
	            _this.environment = new Environment_1.Environment(result.extensionEnvironment);
	            _this.settings = _this.initializeSettings(result.extensionSettingsInfo);
	            _this.ui = new UI_1.UI(new UIImpl_1.UIImpl());
	        });
	    };
	    ExtensionsImpl.prototype.initializeDashboardContent = function (info, sheetPath) {
	        var dashboardImpl = new DashboardImpl_1.DashboardImpl(info, sheetPath);
	        var dashboard = new Dashboard_1.Dashboard(dashboardImpl);
	        return new DashboardContent_1.DashboardContent(dashboard);
	    };
	    ExtensionsImpl.prototype.initializeSettings = function (settingsInfo) {
	        var settingsImpl = new SettingsImpl_1.SettingsImpl(settingsInfo);
	        return new Settings_1.Settings(settingsImpl);
	    };
	    return ExtensionsImpl;
	}());
	exports.ExtensionsImpl = ExtensionsImpl;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(3));
	__export(__webpack_require__(4));
	__export(__webpack_require__(5));
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ExtensionContext;
	(function (ExtensionContext) {
	    ExtensionContext["Desktop"] = "desktop";
	    ExtensionContext["Server"] = "server";
	    ExtensionContext["Unknown"] = "unknown";
	})(ExtensionContext = exports.ExtensionContext || (exports.ExtensionContext = {}));
	var ExtensionMode;
	(function (ExtensionMode) {
	    ExtensionMode["Authoring"] = "authoring";
	    ExtensionMode["Viewing"] = "viewing";
	    ExtensionMode["Unknown"] = "unknown";
	})(ExtensionMode = exports.ExtensionMode || (exports.ExtensionMode = {}));
	var ColumnType;
	(function (ColumnType) {
	    ColumnType["Discrete"] = "discrete";
	    ColumnType["Continuous"] = "continuous";
	})(ColumnType = exports.ColumnType || (exports.ColumnType = {}));
	var DashboardObjectType;
	(function (DashboardObjectType) {
	    DashboardObjectType["Blank"] = "blank";
	    DashboardObjectType["Worksheet"] = "worksheet";
	    DashboardObjectType["QuickFilter"] = "quick-filter";
	    DashboardObjectType["ParameterControl"] = "parameter-control";
	    DashboardObjectType["PageFilter"] = "page-filter";
	    DashboardObjectType["Legend"] = "legend";
	    DashboardObjectType["Title"] = "title";
	    DashboardObjectType["Text"] = "text";
	    DashboardObjectType["Image"] = "image";
	    DashboardObjectType["WebPage"] = "web-page";
	    DashboardObjectType["Extension"] = "extension";
	})(DashboardObjectType = exports.DashboardObjectType || (exports.DashboardObjectType = {}));
	var DataType;
	(function (DataType) {
	    DataType["String"] = "string";
	    DataType["Int"] = "int";
	    DataType["Float"] = "float";
	    DataType["Bool"] = "bool";
	    DataType["Date"] = "date";
	    DataType["DateTime"] = "date-time";
	    DataType["Spatial"] = "spatial";
	})(DataType = exports.DataType || (exports.DataType = {}));
	var EncodedDataType;
	(function (EncodedDataType) {
	    EncodedDataType["Number"] = "number";
	    EncodedDataType["String"] = "string";
	    EncodedDataType["Date"] = "date";
	    EncodedDataType["Boolean"] = "boolean";
	})(EncodedDataType = exports.EncodedDataType || (exports.EncodedDataType = {}));
	var ErrorCode;
	(function (ErrorCode) {
	    ErrorCode["ServerError"] = "server-error";
	    ErrorCode["InvalidAggregationFieldName"] = "invalid-aggregation-field-name";
	    ErrorCode["InvalidFilterFieldName"] = "invalid-filter-fieldname";
	    ErrorCode["InvalidFilterFieldValue"] = "invalid-filter-field-value";
	})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
	var FieldAggregationType;
	(function (FieldAggregationType) {
	    FieldAggregationType["Sum"] = "sum";
	    FieldAggregationType["Avg"] = "avg";
	    FieldAggregationType["Min"] = "min";
	    FieldAggregationType["Max"] = "max";
	    FieldAggregationType["Stdev"] = "stdev";
	    FieldAggregationType["Stdevp"] = "stdevp";
	    FieldAggregationType["Var"] = "var";
	    FieldAggregationType["Varp"] = "varp";
	    FieldAggregationType["Count"] = "count";
	    FieldAggregationType["Countd"] = "countd";
	    FieldAggregationType["Median"] = "median";
	    FieldAggregationType["Attr"] = "attr";
	    FieldAggregationType["None"] = "none";
	    FieldAggregationType["Year"] = "year";
	    FieldAggregationType["Qtr"] = "qtr";
	    FieldAggregationType["Month"] = "month";
	    FieldAggregationType["Day"] = "day";
	    FieldAggregationType["Hour"] = "hour";
	    FieldAggregationType["Minute"] = "minute";
	    FieldAggregationType["Second"] = "second";
	    FieldAggregationType["Week"] = "week";
	    FieldAggregationType["Weekday"] = "weekday";
	    FieldAggregationType["MonthYear"] = "month-year";
	    FieldAggregationType["Mdy"] = "mdy";
	    FieldAggregationType["End"] = "end";
	    FieldAggregationType["TruncYear"] = "trunc-year";
	    FieldAggregationType["TruncQtr"] = "trunc-qtr";
	    FieldAggregationType["TruncMonth"] = "trunc-month";
	    FieldAggregationType["TruncWeek"] = "trunc-week";
	    FieldAggregationType["TruncDay"] = "trunc-day";
	    FieldAggregationType["TruncHour"] = "trunc-hour";
	    FieldAggregationType["TruncMinute"] = "trunc-minute";
	    FieldAggregationType["TruncSecond"] = "trunc-second";
	    FieldAggregationType["Quart1"] = "quart1";
	    FieldAggregationType["Quart3"] = "quart3";
	    FieldAggregationType["Skewness"] = "skewness";
	    FieldAggregationType["Kurtosis"] = "kurtosis";
	    FieldAggregationType["InOut"] = "in-out";
	    FieldAggregationType["User"] = "user";
	})(FieldAggregationType = exports.FieldAggregationType || (exports.FieldAggregationType = {}));
	var FieldRoleType;
	(function (FieldRoleType) {
	    FieldRoleType["Dimension"] = "dimension";
	    FieldRoleType["Measure"] = "measure";
	    FieldRoleType["Unknown"] = "unknown";
	})(FieldRoleType = exports.FieldRoleType || (exports.FieldRoleType = {}));
	/**
	 *  The different update types for applying filter.
	 */
	var FilterUpdateType;
	(function (FilterUpdateType) {
	    FilterUpdateType["Add"] = "add";
	    FilterUpdateType["All"] = "all";
	    FilterUpdateType["Replace"] = "replace";
	    FilterUpdateType["Remove"] = "remove";
	})(FilterUpdateType = exports.FilterUpdateType || (exports.FilterUpdateType = {}));
	var SheetType;
	(function (SheetType) {
	    SheetType["Dashboard"] = "dashboard";
	    SheetType["Story"] = "story";
	    SheetType["Worksheet"] = "worksheet";
	})(SheetType = exports.SheetType || (exports.SheetType = {}));
	var DomainRestrictionType;
	(function (DomainRestrictionType) {
	    DomainRestrictionType["All"] = "all";
	    DomainRestrictionType["List"] = "list";
	    DomainRestrictionType["Range"] = "range";
	})(DomainRestrictionType = exports.DomainRestrictionType || (exports.DomainRestrictionType = {}));
	var DateStepPeriod;
	(function (DateStepPeriod) {
	    DateStepPeriod["Years"] = "years";
	    DateStepPeriod["Quarters"] = "quarters";
	    DateStepPeriod["Months"] = "months";
	    DateStepPeriod["Weeks"] = "weeks";
	    DateStepPeriod["Days"] = "days";
	    DateStepPeriod["Hours"] = "hours";
	    DateStepPeriod["Minutes"] = "minutes";
	    DateStepPeriod["Seconds"] = "seconds";
	})(DateStepPeriod = exports.DateStepPeriod || (exports.DateStepPeriod = {}));
	/**
	 * The option for specifying which values to include for filtering.
	 */
	var FilterNullOption;
	(function (FilterNullOption) {
	    FilterNullOption["NullValues"] = "nullvalues";
	    FilterNullOption["NonNullValues"] = "nonnullvalues";
	    FilterNullOption["AllValues"] = "allvalues";
	})(FilterNullOption = exports.FilterNullOption || (exports.FilterNullOption = {}));
	/**
	 * The type of filter domain
	 */
	var FilterDomainType;
	(function (FilterDomainType) {
	    FilterDomainType["Relevant"] = "relevant";
	    FilterDomainType["Database"] = "database";
	})(FilterDomainType = exports.FilterDomainType || (exports.FilterDomainType = {}));
	/**
	 * Internal enum for specifying the selection type for select marks api.
	 */
	var SelectionUpdateType;
	(function (SelectionUpdateType) {
	    SelectionUpdateType["Replace"] = "select-replace";
	    SelectionUpdateType["Add"] = "select-add";
	    SelectionUpdateType["Remove"] = "select-remove";
	})(SelectionUpdateType = exports.SelectionUpdateType || (exports.SelectionUpdateType = {}));
	/**
	 * Internal enum for specifying the included values type for range selection.
	 */
	var QuantitativeIncludedValues;
	(function (QuantitativeIncludedValues) {
	    QuantitativeIncludedValues["IncludeNull"] = "include-null";
	    QuantitativeIncludedValues["IncludeNonNull"] = "include-non-null";
	    QuantitativeIncludedValues["IncludeAll"] = "include-all";
	})(QuantitativeIncludedValues = exports.QuantitativeIncludedValues || (exports.QuantitativeIncludedValues = {}));
	/**
	 * Type of mark for a given marks card in a viz.
	 */
	var MarkType;
	(function (MarkType) {
	    MarkType["Bar"] = "bar";
	    MarkType["Line"] = "line";
	    MarkType["Area"] = "area";
	    MarkType["Square"] = "square";
	    MarkType["Circle"] = "circle";
	    MarkType["Shape"] = "shape";
	    MarkType["Text"] = "text";
	    MarkType["Map"] = "map";
	    MarkType["Pie"] = "pie";
	    MarkType["GanttBar"] = "gantt-bar";
	    MarkType["Polygon"] = "polygon";
	})(MarkType = exports.MarkType || (exports.MarkType = {}));
	/**
	 * Internal enum for specifying the type of filter
	 */
	var FilterType;
	(function (FilterType) {
	    FilterType["Categorical"] = "categorical";
	    FilterType["Range"] = "range";
	    FilterType["RelativeDate"] = "relativeDate";
	    FilterType["Hierarchical"] = "hierarchical";
	})(FilterType = exports.FilterType || (exports.FilterType = {}));
	/**
	 * Internal enum for specifying the DateRangeType of a relative date filter
	 */
	var DateRangeType;
	(function (DateRangeType) {
	    /**
	     * Refers to the last day, week, month, etc. of the date period.
	     */
	    DateRangeType["Last"] = "last";
	    /**
	     * Refers to the last N days, weeks, months, etc. of the date period.
	     */
	    DateRangeType["LastN"] = "lastN";
	    /**
	     * Refers to the next day, week, month, etc. of the date period.
	     */
	    DateRangeType["Next"] = "next";
	    /**
	     * Refers to the next N days, weeks, months, etc. of the date period.
	     */
	    DateRangeType["NextN"] = "nextN";
	    /**
	     * Refers to the current day, week, month, etc. of the date period.
	     */
	    DateRangeType["Current"] = "current";
	    /**
	     * Refers to everything up to and including the current day, week, month, etc. of the date period.
	     */
	    DateRangeType["ToDate"] = "toDate";
	})(DateRangeType = exports.DateRangeType || (exports.DateRangeType = {}));


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var InternalApiDispatcherHolder;
	(function (InternalApiDispatcherHolder) {
	    function getDesktopDispatcherPromise() {
	        return window.__tableauDesktopDispatcher;
	    }
	    InternalApiDispatcherHolder.getDesktopDispatcherPromise = getDesktopDispatcherPromise;
	    function hasDesktopApiDispatcherPromise() {
	        return !!InternalApiDispatcherHolder.getDesktopDispatcherPromise();
	    }
	    InternalApiDispatcherHolder.hasDesktopApiDispatcherPromise = hasDesktopApiDispatcherPromise;
	    function setDesktopDispatcherPromise(dispatcher) {
	        window.__tableauDesktopDispatcher = dispatcher;
	    }
	    InternalApiDispatcherHolder.setDesktopDispatcherPromise = setDesktopDispatcherPromise;
	})(InternalApiDispatcherHolder = exports.InternalApiDispatcherHolder || (exports.InternalApiDispatcherHolder = {}));


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var NotificationId;
	(function (NotificationId) {
	    NotificationId["SelectedMarksChanged"] = "selected-marks-changed";
	    NotificationId["ParameterChanged"] = "parameter-changed";
	    NotificationId["FilterChanged"] = "filter-changed";
	    NotificationId["UIMessage"] = "ui-message";
	})(NotificationId = exports.NotificationId || (exports.NotificationId = {}));


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ParameterId;
	(function (ParameterId) {
	    ParameterId["ExtensionLocator"] = "extension-locator";
	    ParameterId["ExtensionBootstrapInfo"] = "extension-bootstrap-info";
	    ParameterId["ExtensionSettingsInfo"] = "extension-settings-info";
	    ParameterId["VisualId"] = "visual-id";
	    ParameterId["SheetPath"] = "sheet-path";
	    ParameterId["IgnoreAliases"] = "ignore-aliases";
	    ParameterId["IgnoreSelection"] = "ignore-selection";
	    ParameterId["IncludeAllColumns"] = "include-all-columns";
	    ParameterId["MaxRows"] = "max-rows";
	    ParameterId["UnderlyingDataTable"] = "underlying-data-table";
	    ParameterId["UnderlyingSummaryDataTable"] = "underlying-summary-data-table";
	    ParameterId["DataSourceDataTable"] = "data-source-data-table";
	    ParameterId["SettingsValues"] = "settings-values";
	    ParameterId["SelectedData"] = "selected-data";
	    ParameterId["HighlightedData"] = "highlighted-data";
	    // Filter Params
	    ParameterId["FieldName"] = "field-name";
	    ParameterId["FilterValues"] = "filter-values";
	    ParameterId["FilterUpdateType"] = "filter-update-type";
	    ParameterId["IsExcludeMode"] = "is-exclude";
	    ParameterId["FilterRangeMin"] = "filter-range-min";
	    ParameterId["FilterRangeMax"] = "filter-range-max";
	    ParameterId["FilterRangeNullOption"] = "filter-range-null-option";
	    ParameterId["WorksheetFilters"] = "worksheet-filters";
	    ParameterId["FieldId"] = "field-id";
	    ParameterId["DomainType"] = "domain-type";
	    ParameterId["CategoricalDomain"] = "categorical-domain";
	    ParameterId["QuantitativeDomain"] = "quantitative-dmain";
	    ParameterId["WorksheetName"] = "worksheet-name";
	    ParameterId["DashboardName"] = "dashboard";
	    ParameterId["ParameterInfo"] = "parameter-info";
	    ParameterId["ParameterInfos"] = "parameter-infos";
	    ParameterId["ParameterCaption"] = "paremeter-caption";
	    ParameterId["ParameterFieldName"] = "parameter-field-name";
	    ParameterId["ParameterValue"] = "parameter-value";
	    ParameterId["Selection"] = "selection";
	    ParameterId["SelectionUpdateType"] = "selectionUpdateType";
	    ParameterId["HierValSelectionModels"] = "hierarchicalValueSelectionModels";
	    ParameterId["QuantRangeSelectionModels"] = "quantativeRangeSelectionModels";
	    ParameterId["DimValSelectionModels"] = "dimensionValueSelectionModels";
	    ParameterId["DataSourceId"] = "data-source-id";
	    ParameterId["DataSchema"] = "data-schema";
	    ParameterId["DataSourceName"] = "data-source-name";
	    ParameterId["ColumnsToInclude"] = "columns-to-include";
	    ParameterId["JoinDescription"] = "join-description";
	    ParameterId["DialogUrl"] = "dialog-url";
	    ParameterId["DialogMessage"] = "dialog-message";
	})(ParameterId = exports.ParameterId || (exports.ParameterId = {}));


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// Declare this key type and export the NotificationId to make this behave like a string enum
	var VerbId;
	(function (VerbId) {
	    VerbId["ApplyCategoricalFilter"] = "categorical-filter";
	    VerbId["ApplyRangeFilter"] = "range-filter";
	    VerbId["ClearFilter"] = "clear-filter";
	    VerbId["InitializeExtension"] = "initialize-extension";
	    VerbId["GetDataSummaryData"] = "get-summary-data";
	    VerbId["GetUnderlyingData"] = "get-underlying-data";
	    VerbId["GetDataSourceData"] = "get-datasource-data";
	    VerbId["SaveExtensionSettings"] = "save-extension-settings";
	    VerbId["GetSelectedMarks"] = "get-selected-marks";
	    VerbId["GetHighlightedMarks"] = "get-highlighted-marks";
	    VerbId["GetParametersForSheet"] = "get-parameters-for-sheet";
	    VerbId["FindParameter"] = "find-parameter";
	    VerbId["ChangeParameterValue"] = "change-parameter-value";
	    VerbId["ClearSelectedMarks"] = "clear-selected-marks";
	    VerbId["SelectByValue"] = "select-by-value";
	    VerbId["GetDataSources"] = "get-data-sources";
	    VerbId["RefreshDataSource"] = "refresh-data-source";
	    VerbId["GetFilters"] = "get-filters";
	    VerbId["GetCategoricalDomain"] = "get-categorical-domain";
	    VerbId["GetRangeDomain"] = "get-range-domain";
	    VerbId["GetJoinDescription"] = "get-join-description";
	    VerbId["DisplayDialog"] = "display-dialog";
	    VerbId["CloseDialog"] = "close-dialog";
	    VerbId["SendMessage"] = "send-message";
	})(VerbId = exports.VerbId || (exports.VerbId = {}));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(9));
	__export(__webpack_require__(14));
	var Point_1 = __webpack_require__(15);
	exports.Point = Point_1.Point;
	var Size_1 = __webpack_require__(16);
	exports.Size = Size_1.Size;
	__export(__webpack_require__(17));
	__export(__webpack_require__(18));
	__export(__webpack_require__(19));
	__export(__webpack_require__(25));
	__export(__webpack_require__(24));
	__export(__webpack_require__(23));
	__export(__webpack_require__(22));
	__export(__webpack_require__(26));
	__export(__webpack_require__(27));
	__export(__webpack_require__(28));
	__export(__webpack_require__(35));
	__export(__webpack_require__(33));
	__export(__webpack_require__(43));
	__export(__webpack_require__(51));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_utils_1 = __webpack_require__(10);
	/**
	 * Class designed to register and unregister handlers from a user. Only those events
	 * which are added via AddNewEventType will be supported by this instance
	 */
	var EventListenerManager = (function () {
	    function EventListenerManager() {
	        this._eventListenerManagers = {};
	    }
	    EventListenerManager.prototype.addEventListener = function (eventType, handler) {
	        if (!this._eventListenerManagers.hasOwnProperty(eventType)) {
	            throw api_utils_1.TableauException.error(EventListenerManager.UNSUPPORTED_EVENT, [eventType]);
	        }
	        return this._eventListenerManagers[eventType].addEventListener(handler);
	    };
	    EventListenerManager.prototype.removeEventListener = function (eventType, handler) {
	        if (!this._eventListenerManagers.hasOwnProperty(eventType)) {
	            throw api_utils_1.TableauException.error(EventListenerManager.UNSUPPORTED_EVENT, [eventType]);
	        }
	        return this._eventListenerManagers[eventType].removeEventListener(handler);
	    };
	    EventListenerManager.prototype.addNewEventType = function (eventManager) {
	        this._eventListenerManagers[eventManager.eventType] = eventManager;
	    };
	    EventListenerManager.UNSUPPORTED_EVENT = 'Unsupported event type : %1';
	    return EventListenerManager;
	}());
	exports.EventListenerManager = EventListenerManager;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	var EnumConverter_1 = __webpack_require__(11);
	exports.EnumConverter = EnumConverter_1.EnumConverter;
	var Param_1 = __webpack_require__(13);
	exports.Param = Param_1.Param;
	var TableauException_1 = __webpack_require__(12);
	exports.TableauException = TableauException_1.TableauException;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauException_1 = __webpack_require__(12);
	/**
	 * This class converts from a source enum value to destination enum
	 * value given a mapping from source to destination when constructed.
	 */
	var EnumConverter = (function () {
	    function EnumConverter(_mappings, _defaultVal) {
	        this._mappings = _mappings;
	        this._defaultVal = _defaultVal;
	    }
	    EnumConverter.prototype.convert = function (enumVal, throwIfMissing) {
	        if (this._mappings.hasOwnProperty(enumVal)) {
	            return this._mappings[enumVal];
	        }
	        if (this._defaultVal !== undefined && !throwIfMissing) {
	            return this._defaultVal;
	        }
	        throw TableauException_1.TableauException.error(EnumConverter.MAPPING_NOT_FOUND, [enumVal]);
	    };
	    EnumConverter.MAPPING_NOT_FOUND = 'Mapping not found for %1';
	    return EnumConverter;
	}());
	exports.EnumConverter = EnumConverter;


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauException = (function () {
	    function TableauException() {
	    }
	    TableauException.apiNotImplemented = function (params) {
	        var message = TableauException.format(TableauException.API_NOT_IMPLEMENTED, params);
	        return new Error(message);
	    };
	    TableauException.isUndefined = function (params) {
	        var message = TableauException.format(TableauException.UNDEFINED, params);
	        return new Error(message);
	    };
	    TableauException.isNull = function (params) {
	        var message = TableauException.format(TableauException.IS_NULL, params);
	        return new Error(message);
	    };
	    TableauException.invalidParamValue = function (params) {
	        var message = TableauException.format(TableauException.INVALID_PARAMETER_VALUE, params);
	        return new Error(message);
	    };
	    TableauException.invalidParamType = function (params) {
	        var message = TableauException.format(TableauException.INVALID_PARAMETER_TYPE, params);
	        return new Error(message);
	    };
	    TableauException.missingParameter = function (params) {
	        var message = TableauException.format(TableauException.MISSING_PARAMETER, params);
	        return new Error(message);
	    };
	    TableauException.invalid = function (params) {
	        var message = TableauException.format(TableauException.INVALID, params);
	        return new Error(message);
	    };
	    TableauException.internalError = function (params) {
	        var message = TableauException.format(TableauException.INTERNAL_ERROR, params);
	        return new Error(message);
	    };
	    TableauException.error = function (message, params) {
	        var result;
	        if (params) {
	            result = TableauException.format(message, params);
	        }
	        else {
	            result = message;
	        }
	        return new Error(result);
	    };
	    TableauException.format = function (message, params) {
	        for (var i = 0; i < params.length; i++) {
	            var match = '%' + (i + 1);
	            message = message.replace(new RegExp(match, 'g'), params[i]);
	        }
	        message = message.replace(new RegExp('%[0-9]+', 'g'), '');
	        message = message.trim();
	        return message;
	    };
	    TableauException.API_NOT_IMPLEMENTED = '%1 API not yet implemented.';
	    TableauException.UNDEFINED = '%1 is undefined.';
	    TableauException.INVALID_PARAMETER_VALUE = 'Invalid value for parameter: %1. %2';
	    TableauException.INVALID_PARAMETER_TYPE = 'Invalid type for parameter: %1. %2';
	    TableauException.MISSING_PARAMETER = 'Missing Parameter: %1.';
	    TableauException.UNKNOWN_ERROR = 'Unknown error.';
	    TableauException.INTERNAL_ERROR = 'Internal error: %1.';
	    TableauException.INVALID = 'Invalid: %1. %2';
	    TableauException.IS_NULL = '%1 is null.';
	    return TableauException;
	}());
	exports.TableauException = TableauException;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauException_1 = __webpack_require__(12);
	var Param = (function () {
	    function Param() {
	    }
	    /**
	     * Verifies that an incoming parameter is 'truthy' and throws
	     * an error if it's not. This will throw an error if the value
	     * is null, undefined, NaN, the empty string, 0, or false.
	     *
	     * @param argumentValue value to verify
	     * @param argumentName name of argument to verify
	     */
	    /*tslint:disable-next-line */
	    Param.verifyValue = function (argumentValue, argumentName) {
	        if (!argumentValue) {
	            throw TableauException_1.TableauException.invalidParamValue([argumentName]);
	        }
	    };
	    /**
	     * Verifies that a string is valid.  Throws an error if the string is
	     * null, undefined, or NaN.
	     *
	     * @param argumentValue value to verify
	     * @param argumentName name of argument to verify
	     */
	    Param.verifyString = function (argumentValue, argumentName) {
	        if (argumentValue === null || argumentValue === undefined) {
	            throw TableauException_1.TableauException.invalidParamValue([argumentName]);
	        }
	    };
	    /**
	     * Verifies the value is part of the Enum
	     *
	     * String enums are {string : string} dictionaries which are not reverse mappable
	     * This is an ugly workaround
	     * @param value value to verify
	     * @param enumType enum to verify against
	     */
	    /* tslint:disable:no-any */
	    Param.isValidEnumValue = function (value, enumType) {
	        var isValid = false;
	        Object.keys(enumType).forEach(function (enumKey) {
	            if (enumType[enumKey] === value.toString()) {
	                isValid = true;
	            }
	        });
	        return isValid;
	    };
	    /* tslint:enable:no-any */
	    /**
	     * serializes the date into the format that the server expects.
	     * @param date the date to serialize
	     */
	    Param.serializeDateForPlatform = function (date) {
	        var year = date.getUTCFullYear();
	        var month = date.getUTCMonth() + 1;
	        var day = date.getUTCDate();
	        var hh = date.getUTCHours();
	        var mm = date.getUTCMinutes();
	        var sec = date.getUTCSeconds();
	        return year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + sec;
	    };
	    Param.serializeBooleanForPlatform = function (bool) {
	        return bool ? 'true' : 'false';
	    };
	    Param.serializeNumberForPlatform = function (num) {
	        return num.toString(10);
	    };
	    /**
	     * Verifies the params min and max for applying range filter
	     * @param min range min
	     * @param max range max
	     */
	    /* tslint:disable:no-any */
	    Param.verifyRangeParamType = function (min, max) {
	        /* tslint:enable:no-any */
	        if (!min && !max) {
	            throw TableauException_1.TableauException.invalidParamValue(['Range parameters', 'At least one of min or max is required.']);
	        }
	        if (!Param.isTypeNumber(min) && !Param.isTypeDate(min)) {
	            throw TableauException_1.TableauException.invalidParamType(['Range parameters', 'Only Date and number are allowed for parameter min.']);
	        }
	        if (!Param.isTypeNumber(max) && !Param.isTypeDate(max)) {
	            throw TableauException_1.TableauException.invalidParamType(['Range parameters', 'Only Date and number are allowed for parameter max.']);
	        }
	        if (typeof (min) !== typeof (max)) {
	            throw TableauException_1.TableauException.invalidParamType(['Range parameters', 'Parameters min and max should be of the same type.']);
	        }
	    };
	    /**
	     * Verifies the input is a number
	     */
	    /* tslint:disable:no-any */
	    Param.isTypeNumber = function (input) {
	        return typeof (input) === 'number' || input instanceof Number;
	    };
	    /* tslint:enable:no-any */
	    /**
	     * Verifies the input is a Date
	     */
	    /* tslint:disable:no-any */
	    Param.isTypeDate = function (input) {
	        return input instanceof Date;
	    };
	    /* tslint:enable:no-any */
	    /* tslint:disable-next-line:no-any */
	    Param.isTypeString = function (input) {
	        return typeof (input) === 'string' || input instanceof String;
	    };
	    /* tslint:disable-next-line:no-any */
	    Param.isTypeBool = function (input) {
	        return typeof (input) === 'boolean' || input instanceof Boolean;
	    };
	    /* tslint:disable-next-line:no-any */
	    Param.serializeParamterValue = function (value) {
	        if (Param.isTypeNumber(value)) {
	            return Param.serializeNumberForPlatform(value);
	        }
	        else if (Param.isTypeDate(value)) {
	            return Param.serializeDateForPlatform(value);
	        }
	        else if (Param.isTypeBool(value)) {
	            return Param.serializeBooleanForPlatform(value);
	        }
	        else if (Param.isTypeString(value)) {
	            return value;
	        }
	        else {
	            throw TableauException_1.TableauException.invalidParamValue(['value']);
	        }
	    };
	    return Param;
	}());
	exports.Param = Param;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var EventListenerManager_1 = __webpack_require__(9);
	/**
	 * Implementation of the Parameter contract. Calls down to the impl
	 * class for almost all of the work it does.
	 */
	var Parameter = (function (_super) {
	    __extends(Parameter, _super);
	    function Parameter(parameterImpl, sheet) {
	        var _this = _super.call(this) || this;
	        _this.parameterImpl = parameterImpl;
	        // Initialize our event handling for this class
	        _this.parameterImpl.initializeEvents(sheet).forEach(function (e) { return _this.addNewEventType(e); });
	        return _this;
	    }
	    Object.defineProperty(Parameter.prototype, "name", {
	        get: function () {
	            return this.parameterImpl.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Parameter.prototype, "currentValue", {
	        get: function () {
	            return this.parameterImpl.currentValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Parameter.prototype, "dataType", {
	        get: function () {
	            return this.parameterImpl.dataType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Parameter.prototype, "allowableValues", {
	        get: function () {
	            return this.parameterImpl.allowableValues;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Parameter.prototype, "id", {
	        get: function () {
	            return this.parameterImpl.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Parameter.prototype.changeValueAsync = function (newValue) {
	        return this.parameterImpl.changeValueAsync(newValue);
	    };
	    return Parameter;
	}(EventListenerManager_1.EventListenerManager));
	exports.Parameter = Parameter;


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Point = (function () {
	    function Point(_x, _y) {
	        this._x = _x;
	        this._y = _y;
	    }
	    Object.defineProperty(Point.prototype, "x", {
	        get: function () {
	            return this._x;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Point.prototype, "y", {
	        get: function () {
	            return this._y;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Point;
	}());
	exports.Point = Point;


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Size = (function () {
	    function Size(_height, _width) {
	        this._height = _height;
	        this._width = _width;
	    }
	    Object.defineProperty(Size.prototype, "height", {
	        get: function () {
	            return this._height;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Size.prototype, "width", {
	        get: function () {
	            return this._width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Size;
	}());
	exports.Size = Size;


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var DataTable = (function () {
	    function DataTable(_data, _columns, _totalRowCount, _isSummaryData, _marksInfo) {
	        this._data = _data;
	        this._columns = _columns;
	        this._totalRowCount = _totalRowCount;
	        this._isSummaryData = _isSummaryData;
	        this._marksInfo = _marksInfo;
	        // TODO: get rid of this in redesign.
	        this._name = _isSummaryData ? 'Summary Data Table' : 'Underlying Data Table';
	    }
	    Object.defineProperty(DataTable.prototype, "name", {
	        get: function () {
	            return this._name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataTable.prototype, "data", {
	        get: function () {
	            return this._data;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataTable.prototype, "columns", {
	        get: function () {
	            return this._columns;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataTable.prototype, "marksInfo", {
	        get: function () {
	            return this._marksInfo;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataTable.prototype, "totalRowCount", {
	        get: function () {
	            return this._totalRowCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataTable.prototype, "isSummaryData", {
	        get: function () {
	            return this._isSummaryData;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return DataTable;
	}());
	exports.DataTable = DataTable;
	var MarkInfo = (function () {
	    function MarkInfo(_type, _color, _tupleId) {
	        this._type = _type;
	        this._color = _color;
	        this._tupleId = _tupleId;
	    }
	    Object.defineProperty(MarkInfo.prototype, "type", {
	        get: function () {
	            return this._type;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MarkInfo.prototype, "color", {
	        get: function () {
	            return this._color;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MarkInfo.prototype, "tupleId", {
	        get: function () {
	            return this._tupleId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MarkInfo;
	}());
	exports.MarkInfo = MarkInfo;
	var Column = (function () {
	    function Column(_fieldName, _dataType, // TODO: this shoudl be an enum type
	        _isReferenced, _index) {
	        this._fieldName = _fieldName;
	        this._dataType = _dataType;
	        this._isReferenced = _isReferenced;
	        this._index = _index;
	    }
	    Object.defineProperty(Column.prototype, "fieldName", {
	        get: function () {
	            return this._fieldName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Column.prototype, "dataType", {
	        get: function () {
	            return this._dataType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Column.prototype, "isReferenced", {
	        get: function () {
	            return this._isReferenced;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Column.prototype, "index", {
	        get: function () {
	            return this._index;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Column;
	}());
	exports.Column = Column;
	var DataValue = (function () {
	    /* tslint:disable:no-any */
	    function DataValue(_value, _formattedValue) {
	        this._value = _value;
	        this._formattedValue = _formattedValue;
	    }
	    Object.defineProperty(DataValue.prototype, "value", {
	        get: function () {
	            return this._value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataValue.prototype, "formattedValue", {
	        get: function () {
	            return this._formattedValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return DataValue;
	}());
	exports.DataValue = DataValue;


/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauExceptions = (function () {
	    function TableauExceptions() {
	    }
	    return TableauExceptions;
	}());
	exports.TableauExceptions = TableauExceptions;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var api_utils_1 = __webpack_require__(10);
	var TableauWorksheetEvent_1 = __webpack_require__(22);
	var FilterChangedEvent = (function (_super) {
	    __extends(FilterChangedEvent, _super);
	    function FilterChangedEvent(worksheet, _fieldName) {
	        var _this = _super.call(this, Contract.TableauEventType.FilterChanged, worksheet) || this;
	        _this._fieldName = _fieldName;
	        return _this;
	    }
	    Object.defineProperty(FilterChangedEvent.prototype, "fieldName", {
	        get: function () {
	            return this._fieldName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FilterChangedEvent.prototype.getFilterAsync = function () {
	        var _this = this;
	        return this._worksheet.getFiltersAsync().then(function (filters) {
	            // TODO: Filtering of the filters should eventually be done platform side.
	            var eventedFilter = filters.find(function (filter) { return (filter.fieldName === _this._fieldName); });
	            if (!eventedFilter) {
	                // We shouldn't hit this unless the filter was removed from the worksheet
	                // after the event was raised.
	                throw api_utils_1.TableauException.internalError(['Filter no longer found in worksheet.']);
	            }
	            return eventedFilter;
	        });
	    };
	    return FilterChangedEvent;
	}(TableauWorksheetEvent_1.TableauWorksheetEvent));
	exports.FilterChangedEvent = FilterChangedEvent;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(21));


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	// All enum values made available to Extensions developers.
	// Enums should be kept in alphabetical order.
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * The context in which the Extensions is currently running.
	 */
	var ExtensionContext;
	(function (ExtensionContext) {
	    ExtensionContext["Desktop"] = "desktop";
	    ExtensionContext["Server"] = "server";
	})(ExtensionContext = exports.ExtensionContext || (exports.ExtensionContext = {}));
	/**
	 * The mode in which the Extensions is currently running.
	 */
	var ExtensionMode;
	(function (ExtensionMode) {
	    ExtensionMode["Authoring"] = "authoring";
	    ExtensionMode["Viewing"] = "viewing";
	})(ExtensionMode = exports.ExtensionMode || (exports.ExtensionMode = {}));
	var AnalyticsObjectType;
	(function (AnalyticsObjectType) {
	    AnalyticsObjectType["Cluster"] = "cluster";
	    AnalyticsObjectType["Forecast"] = "forecast";
	    AnalyticsObjectType["TrendLine"] = "trend-line";
	})(AnalyticsObjectType = exports.AnalyticsObjectType || (exports.AnalyticsObjectType = {}));
	var ColumnType;
	(function (ColumnType) {
	    ColumnType["Discrete"] = "discrete";
	    ColumnType["Continuous"] = "continuous";
	})(ColumnType = exports.ColumnType || (exports.ColumnType = {}));
	/**
	 * What the object represents in a dashboard.
	 */
	var DashboardObjectType;
	(function (DashboardObjectType) {
	    DashboardObjectType["Blank"] = "blank";
	    DashboardObjectType["Worksheet"] = "worksheet";
	    DashboardObjectType["QuickFilter"] = "quick-filter";
	    DashboardObjectType["ParameterControl"] = "parameter-control";
	    DashboardObjectType["PageFilter"] = "page-filter";
	    DashboardObjectType["Legend"] = "legend";
	    DashboardObjectType["Title"] = "title";
	    DashboardObjectType["Text"] = "text";
	    DashboardObjectType["Image"] = "image";
	    DashboardObjectType["WebPage"] = "web-page";
	    DashboardObjectType["Extension"] = "extension";
	})(DashboardObjectType = exports.DashboardObjectType || (exports.DashboardObjectType = {}));
	/**
	 * The different types of data a value can have
	 */
	var DataType;
	(function (DataType) {
	    DataType["String"] = "string";
	    DataType["Int"] = "int";
	    DataType["Float"] = "float";
	    DataType["Bool"] = "bool";
	    DataType["Date"] = "date";
	    DataType["DateTime"] = "date-time";
	    DataType["Spatial"] = "spatial";
	})(DataType = exports.DataType || (exports.DataType = {}));
	/**
	 * Valid date ranges for a relative date filter.
	 */
	var DateRangeType;
	(function (DateRangeType) {
	    DateRangeType["Last"] = "last";
	    DateRangeType["LastN"] = "last-n";
	    DateRangeType["Next"] = "next";
	    DateRangeType["NextN"] = "next-n";
	    DateRangeType["Current"] = "current";
	    DateRangeType["ToDate"] = "to-date";
	})(DateRangeType = exports.DateRangeType || (exports.DateRangeType = {}));
	/**
	 * Types of dialog event for event listening between a parent Extensions and a popup dialog.
	 */
	var DialogEventType;
	(function (DialogEventType) {
	    DialogEventType["DialogMessage"] = "dialog-message";
	    DialogEventType["DialogEvent"] = "dialog-event";
	})(DialogEventType = exports.DialogEventType || (exports.DialogEventType = {}));
	var EncodingType;
	(function (EncodingType) {
	    EncodingType["Column"] = "column";
	    EncodingType["Row"] = "row";
	    EncodingType["Page"] = "page";
	    EncodingType["Filter"] = "filter";
	    EncodingType["MarksType"] = "marks-type";
	    EncodingType["MeasureValues"] = "measure-values";
	    EncodingType["Color"] = "color";
	    EncodingType["Size"] = "size";
	    EncodingType["Label"] = "label";
	    EncodingType["Detail"] = "detail";
	    EncodingType["Tooltip"] = "tooltip";
	    EncodingType["Shape"] = "shape";
	    EncodingType["Path"] = "path";
	    EncodingType["Angle"] = "angle";
	})(EncodingType = exports.EncodingType || (exports.EncodingType = {}));
	/**
	 * All error codes used by the Extensions API.
	 */
	var ErrorCodes;
	(function (ErrorCodes) {
	    /**
	     * Only one dialog can be opened at time with the UI namespace functionality.
	     */
	    ErrorCodes["DialogAlreadyOpen"] = "dialog-already-open";
	    /**
	     * The open dialog was closed by the user.
	     */
	    ErrorCodes["DialogClosedByUser"] = "dialog-closed-by-user";
	    /**
	     * An error occurred while attempting to perform a filter operation.
	     */
	    ErrorCodes["FilterCannotBePerformed"] = "filter-cannot-be-performed";
	    /**
	     * An error occurred within the Tableau Extensions API. Contact Tableau Support.
	     */
	    ErrorCodes["InternalError"] = "internal-error";
	    /**
	     * An invalid aggregation was specified for the filter, such as setting a range filter to "SUM(Sales)" instead of "Sales".
	     */
	    ErrorCodes["InvalidAggregationFieldName"] = "invalid-aggregation-field-name";
	    /**
	     * A dialog must first launch to, and send messages from, the same domain as the parent Extensions.
	     */
	    ErrorCodes["InvalidDomainDialog"] = "invalid-dialog-domain";
	    /**
	     * An invalid date was specified in a method that required a date parameter.
	     */
	    ErrorCodes["InvalidDateParameter"] = "invalid-date-parameter";
	    /**
	     * A filter operation was attempted on a field that does not exist in the data source.
	     */
	    ErrorCodes["InvalidFilterFieldName"] = "invalid-filter-field-name";
	    /**
	     * A filter operation was attempted using a value that is the wrong data type or format.
	     */
	    ErrorCodes["InvalidFilterFieldValue"] = "invalid-filter-field-value";
	    /**
	     * A parameter is not the correct data type or format. The name of the parameter is specified in the Error.message field.
	     */
	    ErrorCodes["InvalidParameter"] = "invalid-parameter";
	    /**
	     * An invalid date value was specified in a Sheet.selectMarksAsync() call for a date field.
	     */
	    ErrorCodes["InvalidSelectionDate"] = "invalid-selection-date";
	    /**
	     * A field was specified in a Sheet.selectMarksAsync() call that does not exist in the data source.
	     */
	    ErrorCodes["InvalidSelectionFieldName"] = "invalid-selection-field-name";
	    /**
	     * An invalid value was specified in a Sheet.selectMarksAsync() call.
	     */
	    ErrorCodes["InvalidSelectionValue"] = "invalid-selection-value";
	    /**
	     * A required parameter was not specified, null, or an empty string/array.
	     */
	    ErrorCodes["NullOrEmptyParameter"] = "null-or-empty-parameter";
	    /**
	     * An unknown event name was specified in the call to Viz.addEventListeneror Viz.removeEventListener.
	     */
	    ErrorCodes["UnsupportedEventName"] = "unsupported-event-name";
	    /**
	     * A method was used for a type of datasource that doesn't support that method (see getActiveTablesAsync for an example)
	     */
	    ErrorCodes["UnsupportedMethodForDataSourceType"] = "unsupported-method-for-data-source-type";
	})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
	/**
	 *  Type of aggregation on a field.
	 */
	var FieldAggregationType;
	(function (FieldAggregationType) {
	    FieldAggregationType["Sum"] = "sum";
	    FieldAggregationType["Avg"] = "avg";
	    FieldAggregationType["Min"] = "min";
	    FieldAggregationType["Max"] = "max";
	    FieldAggregationType["Stdev"] = "stdev";
	    FieldAggregationType["Stdevp"] = "stdevp";
	    FieldAggregationType["Var"] = "var";
	    FieldAggregationType["Varp"] = "varp";
	    FieldAggregationType["Count"] = "count";
	    FieldAggregationType["Countd"] = "countd";
	    FieldAggregationType["Median"] = "median";
	    FieldAggregationType["Attr"] = "attr";
	    FieldAggregationType["None"] = "none";
	    FieldAggregationType["Year"] = "year";
	    FieldAggregationType["Qtr"] = "qtr";
	    FieldAggregationType["Month"] = "month";
	    FieldAggregationType["Day"] = "day";
	    FieldAggregationType["Hour"] = "hour";
	    FieldAggregationType["Minute"] = "minute";
	    FieldAggregationType["Second"] = "second";
	    FieldAggregationType["Week"] = "week";
	    FieldAggregationType["Weekday"] = "weekday";
	    FieldAggregationType["MonthYear"] = "month-year";
	    FieldAggregationType["Mdy"] = "mdy";
	    FieldAggregationType["End"] = "end";
	    FieldAggregationType["TruncYear"] = "trunc-year";
	    FieldAggregationType["TruncQtr"] = "trunc-qtr";
	    FieldAggregationType["TruncMonth"] = "trunc-month";
	    FieldAggregationType["TruncWeek"] = "trunc-week";
	    FieldAggregationType["TruncDay"] = "trunc-day";
	    FieldAggregationType["TruncHour"] = "trunc-hour";
	    FieldAggregationType["TruncMinute"] = "trunc-minute";
	    FieldAggregationType["TruncSecond"] = "trunc-second";
	    FieldAggregationType["Quart1"] = "quart1";
	    FieldAggregationType["Quart3"] = "quart3";
	    FieldAggregationType["Skewness"] = "skewness";
	    FieldAggregationType["Kurtosis"] = "kurtosis";
	    FieldAggregationType["InOut"] = "in-out";
	    FieldAggregationType["User"] = "user";
	})(FieldAggregationType = exports.FieldAggregationType || (exports.FieldAggregationType = {}));
	/**
	 * Role of a field.
	 */
	var FieldRoleType;
	(function (FieldRoleType) {
	    FieldRoleType["Dimension"] = "dimension";
	    FieldRoleType["Measure"] = "measure";
	    FieldRoleType["Unknown"] = "unknown";
	})(FieldRoleType = exports.FieldRoleType || (exports.FieldRoleType = {}));
	/**
	 * An enumeration of the valid types of filters that can be applied.
	 */
	var FilterType;
	(function (FilterType) {
	    FilterType["Categorical"] = "categorical";
	    FilterType["Range"] = "range";
	    FilterType["Hierarchical"] = "hierarchical";
	    FilterType["RelativeDate"] = "relative-date";
	})(FilterType = exports.FilterType || (exports.FilterType = {}));
	/**
	 * The different update types for applying filter
	 */
	var FilterUpdateType;
	(function (FilterUpdateType) {
	    FilterUpdateType["Add"] = "add";
	    FilterUpdateType["All"] = "all";
	    FilterUpdateType["Replace"] = "replace";
	    FilterUpdateType["Remove"] = "remove";
	})(FilterUpdateType = exports.FilterUpdateType || (exports.FilterUpdateType = {}));
	/**
	 * The domain type for a filter
	 */
	var FilterDomainType;
	(function (FilterDomainType) {
	    /**
	     * The domain values that are relevant to the specified filter
	     * i.e. the domain is restricted by a previous filter
	     */
	    FilterDomainType["Relevant"] = "relevant";
	    /**
	     * list of all possible domain values from database
	     */
	    FilterDomainType["Database"] = "database";
	})(FilterDomainType = exports.FilterDomainType || (exports.FilterDomainType = {}));
	/**
	 * The option for specifying which values to include for filtering
	 * Indicates what to do with null values for a given filter or mark selection call.
	 */
	var FilterNullOption;
	(function (FilterNullOption) {
	    FilterNullOption["NullValues"] = "null-values";
	    FilterNullOption["NonNullValues"] = "non-null-values";
	    FilterNullOption["AllValues"] = "all-values";
	})(FilterNullOption = exports.FilterNullOption || (exports.FilterNullOption = {}));
	/**
	 * Type of mark for a given marks card in a viz.
	 */
	var MarkType;
	(function (MarkType) {
	    MarkType["Bar"] = "bar";
	    MarkType["Line"] = "line";
	    MarkType["Area"] = "area";
	    MarkType["Square"] = "square";
	    MarkType["Circle"] = "circle";
	    MarkType["Shape"] = "shape";
	    MarkType["Text"] = "text";
	    MarkType["Map"] = "map";
	    MarkType["Pie"] = "pie";
	    MarkType["GanttBar"] = "gantt-bar";
	    MarkType["Polygon"] = "polygon";
	})(MarkType = exports.MarkType || (exports.MarkType = {}));
	/**
	 * An enumeration describing the different types of allowable values.
	 * This is used for restricting the domain of a parameter
	 */
	var ParameterValueType;
	(function (ParameterValueType) {
	    ParameterValueType["All"] = "all";
	    ParameterValueType["List"] = "list";
	    ParameterValueType["Range"] = "range";
	})(ParameterValueType = exports.ParameterValueType || (exports.ParameterValueType = {}));
	/**
	 * Date period used in filters and in parameters.
	 */
	var PeriodType;
	(function (PeriodType) {
	    PeriodType["Years"] = "years";
	    PeriodType["Quarters"] = "quarters";
	    PeriodType["Months"] = "months";
	    PeriodType["Weeks"] = "weeks";
	    PeriodType["Days"] = "days";
	    PeriodType["Hours"] = "hours";
	    PeriodType["Minutes"] = "minutes";
	    PeriodType["Seconds"] = "seconds";
	})(PeriodType = exports.PeriodType || (exports.PeriodType = {}));
	var QuickTableCalcType;
	(function (QuickTableCalcType) {
	    QuickTableCalcType["RunningTotal"] = "running-total";
	    QuickTableCalcType["Difference"] = "difference";
	    QuickTableCalcType["PercentDifference"] = "percent-difference";
	    QuickTableCalcType["PercentOfTotal"] = "percent-of-total";
	    QuickTableCalcType["Rank"] = "rank";
	    QuickTableCalcType["Percentile"] = "percentile";
	    QuickTableCalcType["MovingAverage"] = "moving-average";
	    QuickTableCalcType["YTDTotal"] = "ytd-total";
	    QuickTableCalcType["CompoundGrowthRate"] = "compound-growth-rate";
	    QuickTableCalcType["YearOverYearGrowth"] = "year-over-year-growth";
	    QuickTableCalcType["YTDGrowth"] = "ytd-growth";
	    QuickTableCalcType["Undefined"] = "undefined";
	})(QuickTableCalcType = exports.QuickTableCalcType || (exports.QuickTableCalcType = {}));
	/**
	 * Enum for specifying the selection type for select marks api.
	 */
	var SelectionUpdateType;
	(function (SelectionUpdateType) {
	    SelectionUpdateType["Replace"] = "select-replace";
	    SelectionUpdateType["Add"] = "select-add";
	    SelectionUpdateType["Remove"] = "select-remove";
	})(SelectionUpdateType = exports.SelectionUpdateType || (exports.SelectionUpdateType = {}));
	/**
	 * The type of sheet a Sheet object represents
	 */
	var SheetType;
	(function (SheetType) {
	    SheetType["Dashboard"] = "dashboard";
	    SheetType["Story"] = "story";
	    SheetType["Worksheet"] = "worksheet";
	})(SheetType = exports.SheetType || (exports.SheetType = {}));
	var SortDirection;
	(function (SortDirection) {
	    SortDirection["Increasing"] = "increasing";
	    SortDirection["Decreasing"] = "decreasing";
	})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
	/**
	 * Represents a certain type of event which can be listened for
	 */
	var TableauEventType;
	(function (TableauEventType) {
	    /** Raised when any filter has changed state.*/
	    TableauEventType["FilterChanged"] = "filter-changed";
	    /** The selected marks on a visualization has changed */
	    TableauEventType["MarkSelectionChanged"] = "mark-selection-changed";
	    /** A parameter has had its value modified */
	    TableauEventType["ParameterChanged"] = "parameter-changed";
	})(TableauEventType = exports.TableauEventType || (exports.TableauEventType = {}));
	var TrendLineModelType;
	(function (TrendLineModelType) {
	    TrendLineModelType["Linear"] = "linear";
	    TrendLineModelType["Logarithmic"] = "logarithmic";
	    TrendLineModelType["Exponential"] = "exponential";
	    TrendLineModelType["Polynomial"] = "polynomial";
	})(TrendLineModelType = exports.TrendLineModelType || (exports.TrendLineModelType = {}));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauSheetEvent_1 = __webpack_require__(23);
	var TableauWorksheetEvent = (function (_super) {
	    __extends(TableauWorksheetEvent, _super);
	    function TableauWorksheetEvent(type, _worksheet) {
	        var _this = _super.call(this, type, _worksheet) || this;
	        _this._worksheet = _worksheet;
	        return _this;
	    }
	    Object.defineProperty(TableauWorksheetEvent.prototype, "worksheet", {
	        get: function () {
	            return this._worksheet;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return TableauWorksheetEvent;
	}(TableauSheetEvent_1.TableauSheetEvent));
	exports.TableauWorksheetEvent = TableauWorksheetEvent;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauEvent_1 = __webpack_require__(24);
	var TableauSheetEvent = (function (_super) {
	    __extends(TableauSheetEvent, _super);
	    function TableauSheetEvent(type, sheet) {
	        var _this = _super.call(this, type) || this;
	        _this._sheet = sheet;
	        return _this;
	    }
	    Object.defineProperty(TableauSheetEvent.prototype, "sheet", {
	        get: function () {
	            return this._sheet;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return TableauSheetEvent;
	}(TableauEvent_1.TableauEvent));
	exports.TableauSheetEvent = TableauSheetEvent;


/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauEvent = (function () {
	    function TableauEvent(type) {
	        this._type = type;
	    }
	    Object.defineProperty(TableauEvent.prototype, "type", {
	        get: function () {
	            return this._type;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return TableauEvent;
	}());
	exports.TableauEvent = TableauEvent;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var TableauWorksheetEvent_1 = __webpack_require__(22);
	var MarksSelectedEvent = (function (_super) {
	    __extends(MarksSelectedEvent, _super);
	    function MarksSelectedEvent(worksheet) {
	        return _super.call(this, Contract.TableauEventType.MarkSelectionChanged, worksheet) || this;
	    }
	    MarksSelectedEvent.prototype.getMarksAsync = function () {
	        return this.worksheet.getSelectedMarksAsync();
	    };
	    return MarksSelectedEvent;
	}(TableauWorksheetEvent_1.TableauWorksheetEvent));
	exports.MarksSelectedEvent = MarksSelectedEvent;


/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * This class implements the SingleEventManager interface for a single type of Tableau event
	 *
	 * @template TEventType The Tableau event type this class specializes
	 */
	var SingleEventManagerImpl = (function () {
	    function SingleEventManagerImpl(eventType) {
	        this._eventType = eventType;
	        this._handlers = [];
	    }
	    Object.defineProperty(SingleEventManagerImpl.prototype, "eventType", {
	        get: function () {
	            return this._eventType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SingleEventManagerImpl.prototype.addEventListener = function (handler) {
	        var _this = this;
	        this._handlers.push(handler);
	        return function () { return _this.removeEventListener(handler); };
	    };
	    SingleEventManagerImpl.prototype.removeEventListener = function (handler) {
	        var beforeCount = this._handlers.length;
	        this._handlers = this._handlers.filter(function (h) { return h !== handler; });
	        return beforeCount > this._handlers.length;
	    };
	    SingleEventManagerImpl.prototype.triggerEvent = function (eventGenerator) {
	        for (var _i = 0, _a = this._handlers; _i < _a.length; _i++) {
	            var handler = _a[_i];
	            try {
	                var eventModel = eventGenerator();
	                handler(eventModel);
	            }
	            catch (e) {
	                // Since this handler could be outside our control, just catch anything it throws and continue on
	                continue;
	            }
	        }
	    };
	    return SingleEventManagerImpl;
	}());
	exports.SingleEventManagerImpl = SingleEventManagerImpl;


/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Defines which type of getData call to make.
	 */
	var GetDataType;
	(function (GetDataType) {
	    GetDataType["Summary"] = "summary";
	    GetDataType["Underlying"] = "underlying";
	})(GetDataType = exports.GetDataType || (exports.GetDataType = {}));


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var DataSourceServiceImpl_1 = __webpack_require__(29);
	var FilterServiceImpl_1 = __webpack_require__(31);
	var GetDataServiceImpl_1 = __webpack_require__(36);
	var NotificationServiceImpl_1 = __webpack_require__(37);
	var ParametersServiceImpl_1 = __webpack_require__(38);
	var SelectionServiceImpl_1 = __webpack_require__(41);
	var ServiceRegistry_1 = __webpack_require__(35);
	function registerAllSharedServices(dispatcher) {
	    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new DataSourceServiceImpl_1.DataSourceServiceImpl(dispatcher));
	    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new GetDataServiceImpl_1.GetDataServiceImpl(dispatcher));
	    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new FilterServiceImpl_1.FilterServiceImpl(dispatcher));
	    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new NotificationServiceImpl_1.NotificationServiceImpl(dispatcher));
	    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new ParametersServiceImpl_1.ParametersServiceImpl(dispatcher));
	    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new SelectionServiceImpl_1.SelectionServiceImpl(dispatcher));
	}
	exports.registerAllSharedServices = registerAllSharedServices;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_external_contract_1 = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	var DataSourceServiceImpl = (function () {
	    function DataSourceServiceImpl(_dispatcher) {
	        this._dispatcher = _dispatcher;
	    }
	    Object.defineProperty(DataSourceServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "data-source-service" /* DataSourceService */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DataSourceServiceImpl.prototype.refreshAsync = function (dataSourceId) {
	        var parameters = (_a = {}, _a[api_internal_contract_1.ParameterId.DataSourceId] = dataSourceId, _a);
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.RefreshDataSource, parameters).then(function (response) {
	            return;
	        });
	        var _a;
	    };
	    DataSourceServiceImpl.prototype.getActiveTablesAsync = function (dataSourceId) {
	        var joinParameters = (_a = {}, _a[api_internal_contract_1.ParameterId.DataSourceId] = dataSourceId, _a);
	        // Get the description of the tables used by this connection
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.GetJoinDescription, joinParameters).then(function (joinResponse) {
	            var joinDescription = joinResponse.result;
	            // getActiveTables is unsupported for cubes and GA. We do not have a connection type property
	            // available from the platform (intentionally, to reduce code churn as new connections are added).
	            // Instead,just check if any tables are returned. This array will be empty for any non-table based datasource.
	            if (joinDescription.tables.length === 0) {
	                throw api_utils_1.TableauException.error('getActiveTablesAsync is unsupported for DataSource.', [api_external_contract_1.ErrorCodes.UnsupportedMethodForDataSourceType]);
	            }
	            return joinDescription.tables;
	        });
	        var _a;
	    };
	    DataSourceServiceImpl.prototype.getDataSourcesAsync = function () {
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.GetDataSources, {}).then(function (response) {
	            var dataSchema = response.result;
	            return dataSchema;
	        });
	    };
	    return DataSourceServiceImpl;
	}());
	exports.DataSourceServiceImpl = DataSourceServiceImpl;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(3));
	__export(__webpack_require__(4));
	__export(__webpack_require__(5));
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	var ExternalToInternalEnumMappings_1 = __webpack_require__(32);
	var InternalToExternalEnumMappings_1 = __webpack_require__(33);
	var FilterModels_1 = __webpack_require__(34);
	var GetDataModels_1 = __webpack_require__(17);
	var FilterServiceImpl = (function () {
	    function FilterServiceImpl(dispatcher) {
	        this._dispatcher = dispatcher;
	    }
	    Object.defineProperty(FilterServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "filter-service" /* Filter */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FilterServiceImpl.prototype.applyFilterAsync = function (visualId, fieldName, values, updateType, filterOptions) {
	        if (!api_utils_1.Param.isValidEnumValue(updateType, Contract.FilterUpdateType)) {
	            throw api_utils_1.TableauException.invalidParamValue(['FilterUpdateType']);
	        }
	        var verb = api_internal_contract_1.VerbId.ApplyCategoricalFilter;
	        var parameters = {};
	        parameters[api_internal_contract_1.ParameterId.VisualId] = visualId;
	        parameters[api_internal_contract_1.ParameterId.FieldName] = fieldName;
	        parameters[api_internal_contract_1.ParameterId.FilterValues] = values;
	        parameters[api_internal_contract_1.ParameterId.FilterUpdateType] = updateType;
	        parameters[api_internal_contract_1.ParameterId.IsExcludeMode] =
	            (filterOptions === undefined || filterOptions.isExcludeMode === undefined) ? false : filterOptions.isExcludeMode;
	        return this._dispatcher.execute(verb, parameters).then(function (response) {
	            var error = response.result;
	            if (!(error.errorCode === null || error.errorCode === undefined)) {
	                // TODO: come back and implement error handling logic
	                throw api_utils_1.TableauException.error(FilterServiceImpl.FILTER_ERROR, [error.errorCode]);
	            }
	            return fieldName;
	        });
	    };
	    FilterServiceImpl.prototype.applyRangeFilterAsync = function (visualId, fieldName, filterOptions) {
	        if (!filterOptions) {
	            throw api_utils_1.TableauException.missingParameter(['RangeFilterOptions']);
	        }
	        api_utils_1.Param.verifyRangeParamType(filterOptions.min, filterOptions.max);
	        var verb = api_internal_contract_1.VerbId.ApplyRangeFilter;
	        var parameters = {};
	        if (filterOptions.min) {
	            var min = void 0;
	            if (filterOptions.min instanceof Date) {
	                min = api_utils_1.Param.serializeDateForPlatform(filterOptions.min);
	            }
	            else {
	                min = filterOptions.min;
	            }
	            parameters[api_internal_contract_1.ParameterId.FilterRangeMin] = min;
	        }
	        if (filterOptions.max) {
	            var max = void 0;
	            if (filterOptions.max instanceof Date) {
	                max = api_utils_1.Param.serializeDateForPlatform(filterOptions.max);
	            }
	            else {
	                max = filterOptions.max;
	            }
	            parameters[api_internal_contract_1.ParameterId.FilterRangeMax] = max;
	        }
	        if (filterOptions.nullOption) {
	            if (!api_utils_1.Param.isValidEnumValue(filterOptions.nullOption, Contract.FilterNullOption)) {
	                throw api_utils_1.TableauException.invalidParamValue(['NullOption']);
	            }
	            parameters[api_internal_contract_1.ParameterId.FilterRangeNullOption] = ExternalToInternalEnumMappings_1.ExternalToInternalEnumMappings.nullOptions.convert(filterOptions.nullOption);
	        }
	        parameters[api_internal_contract_1.ParameterId.FieldName] = fieldName;
	        parameters[api_internal_contract_1.ParameterId.VisualId] = visualId;
	        return this._dispatcher.execute(verb, parameters).then(function (response) {
	            return fieldName;
	        });
	    };
	    FilterServiceImpl.prototype.clearFilterAsync = function (visualId, fieldName) {
	        var verb = api_internal_contract_1.VerbId.ClearFilter;
	        var parameters = {};
	        parameters[api_internal_contract_1.ParameterId.VisualId] = visualId;
	        parameters[api_internal_contract_1.ParameterId.FieldName] = fieldName;
	        return this._dispatcher.execute(verb, parameters).then(function (resposne) {
	            return fieldName;
	        });
	    };
	    FilterServiceImpl.prototype.getFiltersAsync = function (visualId) {
	        var _this = this;
	        var verb = api_internal_contract_1.VerbId.GetFilters;
	        var parameters = {};
	        parameters[api_internal_contract_1.ParameterId.VisualId] = visualId;
	        return this._dispatcher.execute(verb, parameters).then(function (response) {
	            var filters = response.result;
	            return _this.convertDomainFilters(filters);
	        });
	    };
	    FilterServiceImpl.prototype.getCategoricalDomainAsync = function (worksheetName, fieldId, domainType) {
	        var _this = this;
	        if (!api_utils_1.Param.isValidEnumValue(domainType, Contract.FilterDomainType)) {
	            throw new Error('Invalid value for parameter FilterDomainType');
	        }
	        var verb = api_internal_contract_1.VerbId.GetCategoricalDomain;
	        var parameters = {};
	        parameters[api_internal_contract_1.ParameterId.VisualId] = {
	            worksheet: worksheetName
	        };
	        parameters[api_internal_contract_1.ParameterId.FieldId] = fieldId;
	        parameters[api_internal_contract_1.ParameterId.DomainType] = domainType;
	        return this._dispatcher.execute(verb, parameters).then(function (response) {
	            var domain = response.result;
	            return _this.convertCategoricalDomain(domain, domainType);
	        });
	    };
	    FilterServiceImpl.prototype.getRangeDomainAsync = function (worksheetName, fieldId, domainType) {
	        var _this = this;
	        if (!api_utils_1.Param.isValidEnumValue(domainType, Contract.FilterDomainType)) {
	            throw new Error('Invalid value for parameter FilterDomainType');
	        }
	        var verb = api_internal_contract_1.VerbId.GetRangeDomain;
	        var parameters = {};
	        parameters[api_internal_contract_1.ParameterId.VisualId] = {
	            worksheet: worksheetName
	        };
	        parameters[api_internal_contract_1.ParameterId.FieldId] = fieldId;
	        parameters[api_internal_contract_1.ParameterId.DomainType] = ExternalToInternalEnumMappings_1.ExternalToInternalEnumMappings.filterDomainType.convert(domainType);
	        return this._dispatcher.execute(verb, parameters).then(function (response) {
	            var domain = response.result;
	            return _this.convertRangeDomain(domain, domainType);
	        });
	    };
	    // Helper Methods
	    FilterServiceImpl.prototype.convertDomainFilters = function (domainFilters) {
	        var _this = this;
	        var filters = [];
	        domainFilters.forEach(function (domainFilter) {
	            switch (domainFilter.filterType) {
	                case api_internal_contract_1.FilterType.Categorical: {
	                    var filter = domainFilter;
	                    if (filter) {
	                        filters.push(_this.convertCategoricalFilter(filter));
	                    }
	                    else {
	                        throw new Error('Invalid Categorical Filter');
	                    }
	                    break;
	                }
	                case api_internal_contract_1.FilterType.Range: {
	                    var filter = domainFilter;
	                    if (filter) {
	                        filters.push(_this.convertRangeFilter(filter));
	                    }
	                    else {
	                        throw new Error('Invalid Range Filter');
	                    }
	                    break;
	                }
	                case api_internal_contract_1.FilterType.RelativeDate: {
	                    var filter = domainFilter;
	                    if (filter) {
	                        filters.push(_this.convertRelativeDateFilter(filter));
	                    }
	                    else {
	                        throw new Error('Invalid Relative Date Filter');
	                    }
	                    break;
	                }
	                default: {
	                    break;
	                }
	            }
	        });
	        return filters;
	    };
	    FilterServiceImpl.prototype.convertCategoricalFilter = function (domainFilter) {
	        var appliedValues = domainFilter.values.map(function (dv) {
	            return new GetDataModels_1.DataValue(dv.value, dv.formattedValue);
	        });
	        return new FilterModels_1.CategoricalFilter(domainFilter.visualId.worksheet, domainFilter.fieldCaption, domainFilter.fieldName, Contract.FilterType.Categorical, appliedValues, domainFilter.isExclude);
	    };
	    FilterServiceImpl.prototype.convertRangeFilter = function (domainFilter) {
	        var minValue = new GetDataModels_1.DataValue(domainFilter.min.value, domainFilter.min.formattedValue);
	        var maxValue = new GetDataModels_1.DataValue(domainFilter.max.value, domainFilter.max.formattedValue);
	        return new FilterModels_1.RangeFilter(domainFilter.visualId.worksheet, domainFilter.fieldCaption, domainFilter.fieldName, Contract.FilterType.Range, minValue, maxValue, domainFilter.includeNullValues);
	    };
	    FilterServiceImpl.prototype.convertRelativeDateFilter = function (domainFilter) {
	        var anchorDateValue = new GetDataModels_1.DataValue(domainFilter.anchorDate.value, domainFilter.anchorDate.formattedValue);
	        return new FilterModels_1.RelativeDateFilter(domainFilter.visualId.worksheet, domainFilter.fieldCaption, domainFilter.fieldName, Contract.FilterType.RelativeDate, anchorDateValue, InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.dateStepPeriod.convert(domainFilter.periodType), InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.dateRangeType.convert(domainFilter.rangeType), domainFilter.rangeN);
	    };
	    FilterServiceImpl.prototype.convertCategoricalDomain = function (domain, domainType) {
	        var values = domain.values.map(function (domainDv) {
	            return new GetDataModels_1.DataValue(domainDv.value, domainDv.formattedValue);
	        });
	        return new FilterModels_1.CategoricalDomain(values, domainType);
	    };
	    FilterServiceImpl.prototype.convertRangeDomain = function (domain, domainType) {
	        var min = new GetDataModels_1.DataValue(domain.min.value, domain.min.formattedValue);
	        var max = new GetDataModels_1.DataValue(domain.max.value, domain.max.formattedValue);
	        return new FilterModels_1.RangeDomain(min, max, domainType);
	    };
	    FilterServiceImpl.FILTER_ERROR = 'Error Applying Filter: %1';
	    return FilterServiceImpl;
	}());
	exports.FilterServiceImpl = FilterServiceImpl;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_external_contract_1 = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	/* tslint:disable:typedef - Disable this to make declaring these classes a bit easier */
	/**
	 * Maps enums used by the external-api-contract to the enums used
	 * in the internal-api-contract, which developers code against.
	 */
	var ExternalToInternalEnumMappings = (function () {
	    function ExternalToInternalEnumMappings() {
	    }
	    ExternalToInternalEnumMappings.nullOptions = new api_utils_1.EnumConverter((_a = {},
	        _a[api_external_contract_1.FilterNullOption.AllValues] = api_internal_contract_1.FilterNullOption.AllValues,
	        _a[api_external_contract_1.FilterNullOption.NonNullValues] = api_internal_contract_1.FilterNullOption.NonNullValues,
	        _a[api_external_contract_1.FilterNullOption.NonNullValues] = api_internal_contract_1.FilterNullOption.NullValues,
	        _a));
	    ExternalToInternalEnumMappings.filterDomainType = new api_utils_1.EnumConverter((_b = {},
	        _b[api_external_contract_1.FilterDomainType.Relevant] = api_internal_contract_1.FilterDomainType.Relevant,
	        _b[api_external_contract_1.FilterDomainType.Database] = api_internal_contract_1.FilterDomainType.Database,
	        _b));
	    return ExternalToInternalEnumMappings;
	}());
	exports.ExternalToInternalEnumMappings = ExternalToInternalEnumMappings;
	var _a, _b;
	/* tslint:enable:typedef */


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_external_contract_1 = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	/* tslint:disable:typedef - Disable this to make declaring these classes a bit easier */
	/**
	 * Maps enums used by the internal-api-contract to the enums used
	 * in the external-api-contract, which developers code against.
	 */
	var InternalToExternalEnumMappings = (function () {
	    function InternalToExternalEnumMappings() {
	    }
	    InternalToExternalEnumMappings.extensionContext = new api_utils_1.EnumConverter((_a = {},
	        _a[api_internal_contract_1.ExtensionContext.Desktop] = api_external_contract_1.ExtensionContext.Desktop,
	        _a[api_internal_contract_1.ExtensionContext.Server] = api_external_contract_1.ExtensionContext.Server,
	        _a));
	    InternalToExternalEnumMappings.extensionMode = new api_utils_1.EnumConverter((_b = {},
	        _b[api_internal_contract_1.ExtensionMode.Authoring] = api_external_contract_1.ExtensionMode.Authoring,
	        _b[api_internal_contract_1.ExtensionMode.Viewing] = api_external_contract_1.ExtensionMode.Viewing,
	        _b));
	    InternalToExternalEnumMappings.columnType = new api_utils_1.EnumConverter((_c = {},
	        _c[api_internal_contract_1.ColumnType.Continuous] = api_external_contract_1.ColumnType.Continuous,
	        _c[api_internal_contract_1.ColumnType.Discrete] = api_external_contract_1.ColumnType.Discrete,
	        _c));
	    InternalToExternalEnumMappings.fieldAggregationType = new api_utils_1.EnumConverter((_d = {},
	        _d[api_internal_contract_1.FieldAggregationType.Attr] = api_external_contract_1.FieldAggregationType.Attr,
	        _d[api_internal_contract_1.FieldAggregationType.Avg] = api_external_contract_1.FieldAggregationType.Avg,
	        _d[api_internal_contract_1.FieldAggregationType.Count] = api_external_contract_1.FieldAggregationType.Count,
	        _d[api_internal_contract_1.FieldAggregationType.Countd] = api_external_contract_1.FieldAggregationType.Countd,
	        _d[api_internal_contract_1.FieldAggregationType.Day] = api_external_contract_1.FieldAggregationType.Day,
	        _d[api_internal_contract_1.FieldAggregationType.End] = api_external_contract_1.FieldAggregationType.End,
	        _d[api_internal_contract_1.FieldAggregationType.Hour] = api_external_contract_1.FieldAggregationType.Hour,
	        _d[api_internal_contract_1.FieldAggregationType.InOut] = api_external_contract_1.FieldAggregationType.InOut,
	        _d[api_internal_contract_1.FieldAggregationType.Kurtosis] = api_external_contract_1.FieldAggregationType.Kurtosis,
	        _d[api_internal_contract_1.FieldAggregationType.Max] = api_external_contract_1.FieldAggregationType.Max,
	        _d[api_internal_contract_1.FieldAggregationType.Mdy] = api_external_contract_1.FieldAggregationType.Mdy,
	        _d[api_internal_contract_1.FieldAggregationType.Median] = api_external_contract_1.FieldAggregationType.Median,
	        _d[api_internal_contract_1.FieldAggregationType.Min] = api_external_contract_1.FieldAggregationType.Min,
	        _d[api_internal_contract_1.FieldAggregationType.Minute] = api_external_contract_1.FieldAggregationType.Minute,
	        _d[api_internal_contract_1.FieldAggregationType.MonthYear] = api_external_contract_1.FieldAggregationType.MonthYear,
	        _d[api_internal_contract_1.FieldAggregationType.None] = api_external_contract_1.FieldAggregationType.None,
	        _d[api_internal_contract_1.FieldAggregationType.Qtr] = api_external_contract_1.FieldAggregationType.Qtr,
	        _d[api_internal_contract_1.FieldAggregationType.Quart1] = api_external_contract_1.FieldAggregationType.Quart1,
	        _d[api_internal_contract_1.FieldAggregationType.Quart3] = api_external_contract_1.FieldAggregationType.Quart3,
	        _d[api_internal_contract_1.FieldAggregationType.Second] = api_external_contract_1.FieldAggregationType.Second,
	        _d[api_internal_contract_1.FieldAggregationType.Skewness] = api_external_contract_1.FieldAggregationType.Skewness,
	        _d[api_internal_contract_1.FieldAggregationType.Stdev] = api_external_contract_1.FieldAggregationType.Stdev,
	        _d[api_internal_contract_1.FieldAggregationType.Stdevp] = api_external_contract_1.FieldAggregationType.Stdevp,
	        _d[api_internal_contract_1.FieldAggregationType.Sum] = api_external_contract_1.FieldAggregationType.Sum,
	        _d[api_internal_contract_1.FieldAggregationType.TruncDay] = api_external_contract_1.FieldAggregationType.TruncDay,
	        _d[api_internal_contract_1.FieldAggregationType.TruncHour] = api_external_contract_1.FieldAggregationType.TruncHour,
	        _d[api_internal_contract_1.FieldAggregationType.TruncMinute] = api_external_contract_1.FieldAggregationType.TruncMinute,
	        _d[api_internal_contract_1.FieldAggregationType.TruncMonth] = api_external_contract_1.FieldAggregationType.TruncMonth,
	        _d[api_internal_contract_1.FieldAggregationType.TruncQtr] = api_external_contract_1.FieldAggregationType.TruncQtr,
	        _d[api_internal_contract_1.FieldAggregationType.TruncSecond] = api_external_contract_1.FieldAggregationType.TruncSecond,
	        _d[api_internal_contract_1.FieldAggregationType.TruncWeek] = api_external_contract_1.FieldAggregationType.TruncWeek,
	        _d[api_internal_contract_1.FieldAggregationType.TruncYear] = api_external_contract_1.FieldAggregationType.TruncYear,
	        _d[api_internal_contract_1.FieldAggregationType.User] = api_external_contract_1.FieldAggregationType.User,
	        _d[api_internal_contract_1.FieldAggregationType.Var] = api_external_contract_1.FieldAggregationType.Var,
	        _d[api_internal_contract_1.FieldAggregationType.Varp] = api_external_contract_1.FieldAggregationType.Varp,
	        _d[api_internal_contract_1.FieldAggregationType.Week] = api_external_contract_1.FieldAggregationType.Week,
	        _d[api_internal_contract_1.FieldAggregationType.Weekday] = api_external_contract_1.FieldAggregationType.Weekday,
	        _d[api_internal_contract_1.FieldAggregationType.Year] = api_external_contract_1.FieldAggregationType.Year,
	        _d));
	    InternalToExternalEnumMappings.fieldRoleType = new api_utils_1.EnumConverter((_e = {},
	        _e[api_internal_contract_1.FieldRoleType.Dimension] = api_external_contract_1.FieldRoleType.Dimension,
	        _e[api_internal_contract_1.FieldRoleType.Measure] = api_external_contract_1.FieldRoleType.Measure,
	        _e[api_internal_contract_1.FieldRoleType.Unknown] = api_external_contract_1.FieldRoleType.Unknown,
	        _e));
	    InternalToExternalEnumMappings.sheetType = new api_utils_1.EnumConverter((_f = {},
	        _f[api_internal_contract_1.SheetType.Dashboard] = api_external_contract_1.SheetType.Dashboard,
	        _f[api_internal_contract_1.SheetType.Story] = api_external_contract_1.SheetType.Story,
	        _f[api_internal_contract_1.SheetType.Worksheet] = api_external_contract_1.SheetType.Worksheet,
	        _f));
	    InternalToExternalEnumMappings.dashboardObjectType = new api_utils_1.EnumConverter((_g = {},
	        _g[api_internal_contract_1.DashboardObjectType.Extension] = api_external_contract_1.DashboardObjectType.Extension,
	        _g[api_internal_contract_1.DashboardObjectType.Blank] = api_external_contract_1.DashboardObjectType.Blank,
	        _g[api_internal_contract_1.DashboardObjectType.Image] = api_external_contract_1.DashboardObjectType.Image,
	        _g[api_internal_contract_1.DashboardObjectType.Legend] = api_external_contract_1.DashboardObjectType.Legend,
	        _g[api_internal_contract_1.DashboardObjectType.PageFilter] = api_external_contract_1.DashboardObjectType.PageFilter,
	        _g[api_internal_contract_1.DashboardObjectType.ParameterControl] = api_external_contract_1.DashboardObjectType.ParameterControl,
	        _g[api_internal_contract_1.DashboardObjectType.QuickFilter] = api_external_contract_1.DashboardObjectType.QuickFilter,
	        _g[api_internal_contract_1.DashboardObjectType.Text] = api_external_contract_1.DashboardObjectType.Text,
	        _g[api_internal_contract_1.DashboardObjectType.Title] = api_external_contract_1.DashboardObjectType.Title,
	        _g[api_internal_contract_1.DashboardObjectType.WebPage] = api_external_contract_1.DashboardObjectType.WebPage,
	        _g[api_internal_contract_1.DashboardObjectType.Worksheet] = api_external_contract_1.DashboardObjectType.Worksheet,
	        _g));
	    InternalToExternalEnumMappings.dataType = new api_utils_1.EnumConverter((_h = {},
	        _h[api_internal_contract_1.DataType.Bool] = api_external_contract_1.DataType.Bool,
	        _h[api_internal_contract_1.DataType.Date] = api_external_contract_1.DataType.Date,
	        _h[api_internal_contract_1.DataType.DateTime] = api_external_contract_1.DataType.DateTime,
	        _h[api_internal_contract_1.DataType.Float] = api_external_contract_1.DataType.Float,
	        _h[api_internal_contract_1.DataType.Int] = api_external_contract_1.DataType.Int,
	        _h[api_internal_contract_1.DataType.String] = api_external_contract_1.DataType.String,
	        _h));
	    InternalToExternalEnumMappings.filterUpdateType = new api_utils_1.EnumConverter((_j = {},
	        _j[api_internal_contract_1.FilterUpdateType.Add] = api_external_contract_1.FilterUpdateType.Add,
	        _j[api_internal_contract_1.FilterUpdateType.All] = api_external_contract_1.FilterUpdateType.All,
	        _j[api_internal_contract_1.FilterUpdateType.Remove] = api_external_contract_1.FilterUpdateType.Remove,
	        _j[api_internal_contract_1.FilterUpdateType.Replace] = api_external_contract_1.FilterUpdateType.Replace,
	        _j));
	    InternalToExternalEnumMappings.allowableValues = new api_utils_1.EnumConverter((_k = {},
	        _k[api_internal_contract_1.DomainRestrictionType.All] = api_external_contract_1.ParameterValueType.All,
	        _k[api_internal_contract_1.DomainRestrictionType.List] = api_external_contract_1.ParameterValueType.List,
	        _k[api_internal_contract_1.DomainRestrictionType.Range] = api_external_contract_1.ParameterValueType.Range,
	        _k));
	    InternalToExternalEnumMappings.dateStepPeriod = new api_utils_1.EnumConverter((_l = {},
	        _l[api_internal_contract_1.DateStepPeriod.Years] = api_external_contract_1.PeriodType.Years,
	        _l[api_internal_contract_1.DateStepPeriod.Quarters] = api_external_contract_1.PeriodType.Quarters,
	        _l[api_internal_contract_1.DateStepPeriod.Months] = api_external_contract_1.PeriodType.Months,
	        _l[api_internal_contract_1.DateStepPeriod.Weeks] = api_external_contract_1.PeriodType.Weeks,
	        _l[api_internal_contract_1.DateStepPeriod.Days] = api_external_contract_1.PeriodType.Days,
	        _l[api_internal_contract_1.DateStepPeriod.Hours] = api_external_contract_1.PeriodType.Hours,
	        _l[api_internal_contract_1.DateStepPeriod.Minutes] = api_external_contract_1.PeriodType.Minutes,
	        _l[api_internal_contract_1.DateStepPeriod.Seconds] = api_external_contract_1.PeriodType.Seconds,
	        _l));
	    InternalToExternalEnumMappings.dateRangeType = new api_utils_1.EnumConverter((_m = {},
	        _m[api_internal_contract_1.DateRangeType.Current] = api_external_contract_1.DateRangeType.Current,
	        _m[api_internal_contract_1.DateRangeType.Last] = api_external_contract_1.DateRangeType.Last,
	        _m[api_internal_contract_1.DateRangeType.LastN] = api_external_contract_1.DateRangeType.LastN,
	        _m[api_internal_contract_1.DateRangeType.Next] = api_external_contract_1.DateRangeType.Next,
	        _m[api_internal_contract_1.DateRangeType.NextN] = api_external_contract_1.DateRangeType.NextN,
	        _m[api_internal_contract_1.DateRangeType.ToDate] = api_external_contract_1.DateRangeType.ToDate,
	        _m));
	    InternalToExternalEnumMappings.filterType = new api_utils_1.EnumConverter((_o = {},
	        _o[api_internal_contract_1.FilterType.Categorical] = api_external_contract_1.FilterType.Categorical,
	        _o[api_internal_contract_1.FilterType.Range] = api_external_contract_1.FilterType.Range,
	        _o[api_internal_contract_1.FilterType.RelativeDate] = api_external_contract_1.FilterType.RelativeDate,
	        _o[api_internal_contract_1.FilterType.Hierarchical] = api_external_contract_1.FilterType.Hierarchical,
	        _o));
	    return InternalToExternalEnumMappings;
	}());
	exports.InternalToExternalEnumMappings = InternalToExternalEnumMappings;
	var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
	/* tslint:enable:typedef */


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var ServiceRegistry_1 = __webpack_require__(35);
	var Filter = (function () {
	    function Filter(_worksheetName, _fieldName, _filterType, _fieldId) {
	        this._worksheetName = _worksheetName;
	        this._fieldName = _fieldName;
	        this._filterType = _filterType;
	        this._fieldId = _fieldId;
	    }
	    Object.defineProperty(Filter.prototype, "worksheetName", {
	        get: function () {
	            return this._worksheetName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Filter.prototype, "fieldName", {
	        get: function () {
	            return this._fieldName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Filter.prototype, "fieldId", {
	        get: function () {
	            return this._fieldId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Filter.prototype, "filterType", {
	        get: function () {
	            return this._filterType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Filter.prototype.getFieldAsync = function () {
	        throw new Error('Method not implemented');
	    };
	    return Filter;
	}());
	exports.Filter = Filter;
	var CategoricalFilter = (function (_super) {
	    __extends(CategoricalFilter, _super);
	    function CategoricalFilter(worksheetName, fieldName, fieldId, filterType, _appliedValues, _isExcludeMode) {
	        var _this = _super.call(this, worksheetName, fieldName, filterType, fieldId) || this;
	        _this._appliedValues = _appliedValues;
	        _this._isExcludeMode = _isExcludeMode;
	        return _this;
	    }
	    Object.defineProperty(CategoricalFilter.prototype, "appliedValues", {
	        get: function () {
	            return this._appliedValues;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CategoricalFilter.prototype, "isExcludeMode", {
	        get: function () {
	            return this._isExcludeMode;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CategoricalFilter.prototype.getDomainAsync = function (domainType) {
	        if (!domainType) {
	            domainType = Contract.FilterDomainType.Relevant;
	        }
	        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
	        return service.getCategoricalDomainAsync(this._worksheetName, this._fieldId, domainType);
	    };
	    return CategoricalFilter;
	}(Filter));
	exports.CategoricalFilter = CategoricalFilter;
	var RangeFilter = (function (_super) {
	    __extends(RangeFilter, _super);
	    function RangeFilter(worksheetName, fieldName, fieldId, filterType, _min, _max, _includeNullValues) {
	        var _this = _super.call(this, worksheetName, fieldName, filterType, fieldId) || this;
	        _this._min = _min;
	        _this._max = _max;
	        _this._includeNullValues = _includeNullValues;
	        return _this;
	    }
	    Object.defineProperty(RangeFilter.prototype, "minValue", {
	        get: function () {
	            return this._min;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeFilter.prototype, "maxValue", {
	        get: function () {
	            return this._max;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeFilter.prototype, "includeNullValues", {
	        get: function () {
	            return this._includeNullValues;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RangeFilter.prototype.getDomainAsync = function (domainType) {
	        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
	        if (!domainType) {
	            domainType = Contract.FilterDomainType.Relevant;
	        }
	        return service.getRangeDomainAsync(this._worksheetName, this._fieldId, domainType);
	    };
	    return RangeFilter;
	}(Filter));
	exports.RangeFilter = RangeFilter;
	var RelativeDateFilter = (function (_super) {
	    __extends(RelativeDateFilter, _super);
	    function RelativeDateFilter(worksheetName, fieldName, fieldId, filterType, _anchorDate, _periodType, _rangeType, _rangeN) {
	        var _this = _super.call(this, worksheetName, fieldName, filterType, fieldId) || this;
	        _this._anchorDate = _anchorDate;
	        _this._periodType = _periodType;
	        _this._rangeType = _rangeType;
	        _this._rangeN = _rangeN;
	        return _this;
	    }
	    Object.defineProperty(RelativeDateFilter.prototype, "anchorDate", {
	        get: function () {
	            return this._anchorDate;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RelativeDateFilter.prototype, "periodType", {
	        get: function () {
	            return this._periodType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RelativeDateFilter.prototype, "rangeType", {
	        get: function () {
	            return this._rangeType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RelativeDateFilter.prototype, "rangeN", {
	        get: function () {
	            return this._rangeN;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return RelativeDateFilter;
	}(Filter));
	exports.RelativeDateFilter = RelativeDateFilter;
	var CategoricalDomain = (function () {
	    function CategoricalDomain(_values, _domainType) {
	        this._values = _values;
	        this._domainType = _domainType;
	    }
	    Object.defineProperty(CategoricalDomain.prototype, "values", {
	        get: function () {
	            return this._values;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CategoricalDomain.prototype, "type", {
	        get: function () {
	            return this._domainType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CategoricalDomain;
	}());
	exports.CategoricalDomain = CategoricalDomain;
	var RangeDomain = (function () {
	    function RangeDomain(_min, _max, _domainType) {
	        this._min = _min;
	        this._max = _max;
	        this._domainType = _domainType;
	    }
	    Object.defineProperty(RangeDomain.prototype, "type", {
	        get: function () {
	            return this._domainType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeDomain.prototype, "min", {
	        get: function () {
	            return this._min;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeDomain.prototype, "max", {
	        get: function () {
	            return this._max;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return RangeDomain;
	}());
	exports.RangeDomain = RangeDomain;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_utils_1 = __webpack_require__(10);
	var ServiceRegistryImpl = (function () {
	    function ServiceRegistryImpl() {
	        this._services = {};
	    }
	    ServiceRegistryImpl.prototype.registerService = function (service) {
	        this._services[service.serviceName] = service;
	    };
	    ServiceRegistryImpl.prototype.getService = function (serviceName) {
	        if (!this._services.hasOwnProperty(serviceName)) {
	            throw api_utils_1.TableauException.error(ServiceRegistryImpl.SERVICE_NOT_REGISTERED, [serviceName]);
	        }
	        return this._services[serviceName];
	    };
	    ServiceRegistryImpl.SERVICE_NOT_REGISTERED = 'No Service %1 is registered';
	    return ServiceRegistryImpl;
	}());
	/**
	 * static class used for getting access to the single instance
	 * of the ApiServiceRegistry
	 */
	var ApiServiceRegistry = (function () {
	    // Private to avoid anyone constructing this
	    function ApiServiceRegistry() {
	    }
	    Object.defineProperty(ApiServiceRegistry, "instance", {
	        /**
	         * Gets the singleton instance of the ServiceRegistry
	         */
	        get: function () {
	            if (!window.__tableauApiServiceRegistry) {
	                ApiServiceRegistry.setInstance(new ServiceRegistryImpl());
	            }
	            if (!window.__tableauApiServiceRegistry) {
	                throw api_utils_1.TableauException.error(ApiServiceRegistry.SERVICE_REGISTRY_FAILED);
	            }
	            return window.__tableauApiServiceRegistry;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Helper method to override the registry instance. Can be used by unit tests
	     *
	     * @param {ServiceRegistry} serviceRegistry The new registry
	     */
	    ApiServiceRegistry.setInstance = function (serviceRegistry) {
	        window.__tableauApiServiceRegistry = serviceRegistry;
	    };
	    ApiServiceRegistry.SERVICE_REGISTRY_FAILED = 'Assigning service registry failed';
	    return ApiServiceRegistry;
	}());
	exports.ApiServiceRegistry = ApiServiceRegistry;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var GetDataModels_1 = __webpack_require__(17);
	var GetDataService_1 = __webpack_require__(27);
	var GetDataServiceImpl = (function () {
	    function GetDataServiceImpl(dispatcher) {
	        this._dispatcher = dispatcher;
	    }
	    Object.defineProperty(GetDataServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "get-data-service" /* GetData */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GetDataServiceImpl.prototype.getUnderlyingDataAsync = function (visualId, getType, ignoreAliases, ignoreSelection, includeAllColumns, maxRows) {
	        var _this = this;
	        // Create all of our parameters
	        var verb = getType === GetDataService_1.GetDataType.Summary ? api_internal_contract_1.VerbId.GetDataSummaryData : api_internal_contract_1.VerbId.GetUnderlyingData;
	        var parameters = {};
	        parameters[api_internal_contract_1.ParameterId.VisualId] = visualId;
	        parameters[api_internal_contract_1.ParameterId.IgnoreAliases] = ignoreAliases;
	        parameters[api_internal_contract_1.ParameterId.IgnoreSelection] = ignoreSelection;
	        parameters[api_internal_contract_1.ParameterId.IncludeAllColumns] = includeAllColumns;
	        parameters[api_internal_contract_1.ParameterId.MaxRows] = maxRows;
	        return this._dispatcher.execute(verb, parameters).then(function (response) {
	            var responseData = response.result;
	            return _this.processResultsTable(responseData.data, responseData.isSummary);
	        });
	    };
	    GetDataServiceImpl.prototype.getSelectedMarksAsync = function (visualId) {
	        var _this = this;
	        var parameters = (_a = {}, _a[api_internal_contract_1.ParameterId.VisualId] = visualId, _a);
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.GetSelectedMarks, parameters).then(function (response) {
	            var responseData = response.result;
	            return {
	                data: responseData.data.map(function (table) { return _this.processResultsTable(table, true); })
	            };
	        });
	        var _a;
	    };
	    GetDataServiceImpl.prototype.getHighlightedMarksAsync = function (visualId) {
	        var _this = this;
	        var parameters = (_a = {}, _a[api_internal_contract_1.ParameterId.VisualId] = visualId, _a);
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.GetHighlightedMarks, parameters).then(function (response) {
	            var responseData = response.result;
	            return {
	                data: responseData.data.map(function (table) { return _this.processResultsTable(table, true); })
	            };
	        });
	        var _a;
	    };
	    GetDataServiceImpl.prototype.getDataSourceDataAsync = function (dataSourceId, ignoreAliases, maxRows, columnsToInclude) {
	        var _this = this;
	        var parameters = (_a = {},
	            _a[api_internal_contract_1.ParameterId.DataSourceId] = dataSourceId,
	            _a[api_internal_contract_1.ParameterId.IgnoreAliases] = ignoreAliases,
	            _a[api_internal_contract_1.ParameterId.MaxRows] = maxRows,
	            _a[api_internal_contract_1.ParameterId.ColumnsToInclude] = columnsToInclude,
	            _a);
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.GetDataSourceData, parameters).then(function (response) {
	            var responseData = response.result;
	            return _this.processResultsTable(responseData.data, false);
	        });
	        var _a;
	    };
	    GetDataServiceImpl.prototype.processResultsTable = function (responseData, isSummary) {
	        var headers = responseData.headers.map(function (h) { return new GetDataModels_1.Column(h.fieldCaption, Contract.DataType.String /*h.DataType*/, h.isReferenced, h.index); });
	        // TODO This should be controlled by a flag indicating whether this api will respond marks info or not
	        var marks;
	        if (responseData.marks) {
	            marks = responseData.marks.map(function (h) { return new GetDataModels_1.MarkInfo(h.type, h.color, h.tupleId); });
	        }
	        var table = responseData.dataTable.map(function (row) {
	            return row.map(function (cell) {
	                return new GetDataModels_1.DataValue(cell.value, cell.formattedValue);
	            });
	        });
	        if (marks) {
	            return new GetDataModels_1.DataTable(table, headers, table.length, isSummary, marks);
	        }
	        return new GetDataModels_1.DataTable(table, headers, table.length, isSummary);
	    };
	    return GetDataServiceImpl;
	}());
	exports.GetDataServiceImpl = GetDataServiceImpl;


/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Registration = (function () {
	    function Registration(_filterFn, _callbackFn) {
	        this._filterFn = _filterFn;
	        this._callbackFn = _callbackFn;
	        // Nothing Here
	    }
	    Registration.prototype.onNotification = function (notificationModel) {
	        if (this._filterFn(notificationModel)) {
	            this._callbackFn(notificationModel);
	        }
	    };
	    return Registration;
	}());
	var NotificationServiceImpl = (function () {
	    function NotificationServiceImpl(dispatcher) {
	        this.dispatcher = dispatcher;
	        this._handlers = {};
	        this.dispatcher.registerNotificationHandler(this.onNotification.bind(this));
	    }
	    Object.defineProperty(NotificationServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "notification-service" /* Notification */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    NotificationServiceImpl.prototype.registerHandler = function (id, filterFn, handler) {
	        var _this = this;
	        var handlers = this._handlers[id] || new Array();
	        var registration = new Registration(filterFn, handler);
	        handlers.push(registration);
	        this._handlers[id] = handlers;
	        return function () { return _this.removeRegistration(id, registration); };
	    };
	    NotificationServiceImpl.prototype.hasHandlersForNotificationType = function (id) {
	        return this._handlers.hasOwnProperty(id);
	    };
	    NotificationServiceImpl.prototype.onNotification = function (notification) {
	        if (!this.hasHandlersForNotificationType(notification.notificationId)) {
	            return;
	        }
	        // Go through and check for all the handlers of this particular notification
	        this._handlers[notification.notificationId].forEach(function (h) { return h.onNotification(notification.data); });
	    };
	    NotificationServiceImpl.prototype.removeRegistration = function (id, registration) {
	        if (!this.hasHandlersForNotificationType(id)) {
	            return;
	        }
	        this._handlers[id] = this._handlers[id].filter(function (reg) { return reg !== registration; });
	    };
	    return NotificationServiceImpl;
	}());
	exports.NotificationServiceImpl = NotificationServiceImpl;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	var ParameterImpl_1 = __webpack_require__(39);
	var Parameter_1 = __webpack_require__(14);
	var ParametersServiceImpl = (function () {
	    function ParametersServiceImpl(dispatcher) {
	        this.dispatcher = dispatcher;
	    }
	    Object.defineProperty(ParametersServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "parameters-service" /* Parameters */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ParametersServiceImpl.prototype.getParametersForSheetAsync = function (sheetPath, sheet) {
	        var parameters = (_a = {},
	            _a[api_internal_contract_1.ParameterId.SheetPath] = sheetPath,
	            _a);
	        return this.dispatcher.execute(api_internal_contract_1.VerbId.GetParametersForSheet, parameters).then(function (response) {
	            // TODO - Check for error
	            var result = response.result;
	            return result.map(function (parameterInfo) {
	                var impl = new ParameterImpl_1.ParameterImpl(parameterInfo);
	                return new Parameter_1.Parameter(impl, sheet);
	            });
	        });
	        var _a;
	    };
	    ParametersServiceImpl.prototype.changeParameterValueAsync = function (fieldName, newValue) {
	        var parameters = (_a = {},
	            _a[api_internal_contract_1.ParameterId.ParameterFieldName] = fieldName,
	            _a[api_internal_contract_1.ParameterId.ParameterValue] = newValue,
	            _a);
	        return this.dispatcher.execute(api_internal_contract_1.VerbId.ChangeParameterValue, parameters).then(function (response) {
	            var result = response.result;
	            return result;
	        });
	        var _a;
	    };
	    ParametersServiceImpl.prototype.findParameterByNameAsync = function (name, sheet) {
	        return this.findParameterAsync(sheet, name, undefined);
	    };
	    ParametersServiceImpl.prototype.findParameterByGlobalFieldNameAsync = function (fieldName, sheet) {
	        return this.findParameterAsync(sheet, undefined, fieldName);
	    };
	    ParametersServiceImpl.prototype.findParameterAsync = function (sheet, name, fieldName) {
	        var parameters = {};
	        if (name !== undefined) {
	            parameters[api_internal_contract_1.ParameterId.ParameterCaption] = name;
	        }
	        else if (fieldName !== undefined) {
	            parameters[api_internal_contract_1.ParameterId.ParameterFieldName] = fieldName;
	        }
	        else {
	            throw api_utils_1.TableauException.missingParameter(['field name or caption']);
	        }
	        return this.dispatcher.execute(api_internal_contract_1.VerbId.FindParameter, parameters).then(function (response) {
	            var instanceOfParameterInfo = function (object) {
	                return 'fieldName' in object;
	            };
	            // We need to check to see if we got a valid response back again
	            if (instanceOfParameterInfo(response.result)) {
	                var result = response.result;
	                var impl = new ParameterImpl_1.ParameterImpl(result);
	                return new Parameter_1.Parameter(impl, sheet);
	            }
	            else {
	                return undefined;
	            }
	        });
	    };
	    return ParametersServiceImpl;
	}());
	exports.ParametersServiceImpl = ParametersServiceImpl;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	var InternalToExternalEnumMappings_1 = __webpack_require__(33);
	var ParameterChangedEvent_1 = __webpack_require__(40);
	var GetDataModels_1 = __webpack_require__(17);
	var ServiceRegistry_1 = __webpack_require__(35);
	var SingleEventManagerImpl_1 = __webpack_require__(26);
	var ParameterImpl = (function () {
	    function ParameterImpl(parameterInfo) {
	        this.setParameterInfo(parameterInfo);
	    }
	    Object.defineProperty(ParameterImpl.prototype, "name", {
	        get: function () {
	            return this._parameterInfo.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ParameterImpl.prototype, "currentValue", {
	        get: function () {
	            return new GetDataModels_1.DataValue(this._parameterInfo.currentValue.value, this._parameterInfo.currentValue.formattedValue);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ParameterImpl.prototype, "dataType", {
	        get: function () {
	            return InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.dataType.convert(this._parameterInfo.dataType);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ParameterImpl.prototype, "id", {
	        get: function () {
	            return this._globalFieldName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ParameterImpl.prototype, "allowableValues", {
	        get: function () {
	            return this._allowableValues;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ParameterImpl.prototype.changeValueAsync = function (newValue) {
	        var _this = this;
	        var coercedValue = api_utils_1.Param.serializeParamterValue(newValue);
	        var parametersService = ServiceRegistry_1.ApiServiceRegistry.instance.getService("parameters-service" /* Parameters */);
	        return parametersService.changeParameterValueAsync(this._globalFieldName, coercedValue).then(function (parameterInfo) {
	            _this.setParameterInfo(parameterInfo);
	            return _this.currentValue;
	        });
	    };
	    /**
	     * Helper method which goes through and registers each event type this impl knows about
	     * with the NotificationService. It returns an array of SingleEventManager objects which
	     * can then be passed to an EventListenerManager to handle user registration / unregistration.
	     *
	     * @param sheet The sheet object which will be included with the event notifications
	     * @returns {Array<SingleEventManager>} Collection of event managers to pass to an EventListenerManager
	     */
	    ParameterImpl.prototype.initializeEvents = function (sheet) {
	        var _this = this;
	        var results = new Array();
	        var notificationService;
	        try {
	            notificationService = ServiceRegistry_1.ApiServiceRegistry.instance.getService("notification-service" /* Notification */);
	        }
	        catch (e) {
	            // If we don't have this service registered, just return
	            return results;
	        }
	        // Initialize all of the event managers we'll need (one for each event type)
	        var parameterEvent = new SingleEventManagerImpl_1.SingleEventManagerImpl(Contract.TableauEventType.ParameterChanged);
	        notificationService.registerHandler(api_internal_contract_1.NotificationId.ParameterChanged, function (model) {
	            var fieldName = model;
	            return fieldName === _this._globalFieldName;
	        }, function (fieldName) {
	            parameterEvent.triggerEvent(function () { return new ParameterChangedEvent_1.ParameterChangedEvent(fieldName, sheet); });
	        });
	        results.push(parameterEvent);
	        return results;
	    };
	    ParameterImpl.prototype.setParameterInfo = function (parameterInfo) {
	        this._parameterInfo = parameterInfo;
	        this._globalFieldName = parameterInfo.fieldName;
	        var type = InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.allowableValues.convert(parameterInfo.allowableValuesType);
	        var listValues;
	        var minValue;
	        var maxValue;
	        var stepSize;
	        var dateStepPeriod;
	        if (type === Contract.ParameterValueType.List) {
	            var values = parameterInfo.allowableValues || [];
	            listValues = values.map(function (val) { return new GetDataModels_1.DataValue(val.value, val.formattedValue); });
	        }
	        else if (type === Contract.ParameterValueType.Range) {
	            minValue = parameterInfo.minValue && new GetDataModels_1.DataValue(parameterInfo.minValue.value, parameterInfo.minValue.formattedValue);
	            maxValue = parameterInfo.maxValue && new GetDataModels_1.DataValue(parameterInfo.maxValue.value, parameterInfo.maxValue.formattedValue);
	            stepSize = parameterInfo.stepSize;
	            dateStepPeriod = parameterInfo.dateStepPeriod &&
	                InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.dateStepPeriod.convert(parameterInfo.dateStepPeriod);
	        }
	        this._allowableValues = {
	            type: type,
	            allowableValues: listValues,
	            minValue: minValue,
	            maxValue: maxValue,
	            stepSize: stepSize,
	            dateStepPeriod: dateStepPeriod
	        };
	    };
	    return ParameterImpl;
	}());
	exports.ParameterImpl = ParameterImpl;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var api_utils_1 = __webpack_require__(10);
	var ServiceRegistry_1 = __webpack_require__(35);
	var TableauSheetEvent_1 = __webpack_require__(23);
	var ParameterChangedEvent = (function (_super) {
	    __extends(ParameterChangedEvent, _super);
	    function ParameterChangedEvent(_globalFieldName, sheet) {
	        var _this = _super.call(this, Contract.TableauEventType.ParameterChanged, sheet) || this;
	        _this._globalFieldName = _globalFieldName;
	        return _this;
	    }
	    ParameterChangedEvent.prototype.getParameterAsync = function () {
	        // Call down to our service to get the parameter back via its field name
	        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("parameters-service" /* Parameters */);
	        return service.findParameterByGlobalFieldNameAsync(this._globalFieldName, this.sheet).then(function (parameter) {
	            if (parameter === undefined) {
	                throw api_utils_1.TableauException.error(ParameterChangedEvent.PARAM_NOT_FOUND);
	            }
	            return parameter;
	        });
	    };
	    ParameterChangedEvent.PARAM_NOT_FOUND = 'Unable to find parameter';
	    return ParameterChangedEvent;
	}(TableauSheetEvent_1.TableauSheetEvent));
	exports.ParameterChangedEvent = ParameterChangedEvent;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	var SelectionModels_1 = __webpack_require__(42);
	var SelectionServiceImpl = (function () {
	    function SelectionServiceImpl(dispatcher) {
	        this._dispatcher = dispatcher;
	    }
	    Object.defineProperty(SelectionServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "selection-service" /* Selection */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Method to clear all the selected marks for the given worksheet.
	     *
	     * @param visualId
	     */
	    SelectionServiceImpl.prototype.clearSelectedMarksAsync = function (visualId) {
	        var parameters = (_a = {}, _a[api_internal_contract_1.ParameterId.VisualId] = visualId, _a);
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.ClearSelectedMarks, parameters).then(function (response) {
	            return; // Expecting an empty model and hence the void response.
	        });
	        var _a;
	    };
	    /**
	     * Method to select marks for the given worksheet.
	     *
	     * @param visualId
	     * @param selectionCriteria
	     * @param selectionUpdateType
	     */
	    SelectionServiceImpl.prototype.selectMarksByValueAsync = function (visualId, selectionCriterias, selectionUpdateType) {
	        if (selectionCriterias.length === 0) {
	            throw api_utils_1.TableauException.invalid(['Selection criteria', 'Selections missing.']);
	        }
	        var selectionType = this.validateSelectionUpdateType(selectionUpdateType);
	        var selectionCriteriaType = this.validateSelectionCriteria(selectionCriterias[0]);
	        var selectionModelContainer = this.parseSelectionMarks(selectionCriterias, selectionCriteriaType);
	        var parameters = (_a = {},
	            _a[api_internal_contract_1.ParameterId.VisualId] = visualId,
	            _a[api_internal_contract_1.ParameterId.SelectionUpdateType] = selectionType,
	            _a);
	        switch (selectionCriteriaType) {
	            case SelectionCriteriaType.HierarchicalType: {
	                parameters[api_internal_contract_1.ParameterId.HierValSelectionModels] = selectionModelContainer.hierModelArr;
	                break;
	            }
	            case SelectionCriteriaType.RangeType: {
	                parameters[api_internal_contract_1.ParameterId.QuantRangeSelectionModels] = selectionModelContainer.quantModelArr;
	                break;
	            }
	            case SelectionCriteriaType.DimensionType: {
	                parameters[api_internal_contract_1.ParameterId.DimValSelectionModels] = selectionModelContainer.dimModelArr;
	                break;
	            }
	            default:
	                break;
	        }
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.SelectByValue, parameters).then(function (response) {
	            // Expecting an empty model and hence the void response.
	            return;
	            // TODO Investigate the error response with multiple output params and throw error accordingly.
	        });
	        var _a;
	    };
	    /**
	   * Method to select marks for the given worksheet.
	   *
	   * @param visualId
	   * @param MarkInfo
	   * @param selectionUpdateType
	   */
	    SelectionServiceImpl.prototype.selectMarksByIdAsync = function (visualId, marks, selectionUpdateType) {
	        if (marks.length === 0) {
	            throw api_utils_1.TableauException.invalid(['Selection', 'Marks info missing.']);
	        }
	        var selectionType = this.validateSelectionUpdateType(selectionUpdateType);
	        var selectionModelContainer = this.parseSelectionIds(marks);
	        var parameters = (_a = {},
	            _a[api_internal_contract_1.ParameterId.VisualId] = visualId,
	            _a[api_internal_contract_1.ParameterId.SelectionUpdateType] = selectionType,
	            _a[api_internal_contract_1.ParameterId.Selection] = selectionModelContainer.selection,
	            _a);
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.SelectByValue, parameters).then(function (response) {
	            // Expecting an empty model and hence the void response.
	            return;
	            // TODO Investigate the error response with multiple output params and throw error accordingly.
	        });
	        var _a;
	    };
	    /**
	     * Method to prepare the pres models for selection by MarksInfo
	     * @param marks
	     */
	    SelectionServiceImpl.prototype.parseSelectionIds = function (marks) {
	        var ids = [];
	        var selectionModelContainer = new SelectionModels_1.SelectionModelsContainer();
	        for (var i = 0; i < marks.length; i++) {
	            var tupleId = marks[i].tupleId;
	            if (tupleId !== undefined && tupleId !== null) {
	                ids.push(tupleId.toString()); // collect the tuple ids
	            }
	            else {
	                throw api_utils_1.TableauException.invalid(['tupleId']);
	            }
	        }
	        if (ids.length !== 0) {
	            var tupleSelectionModel = new SelectionModels_1.TupleSelectionModel();
	            tupleSelectionModel.selectionType = 'tuples';
	            tupleSelectionModel.objectIds = ids;
	            selectionModelContainer.selection = tupleSelectionModel;
	        }
	        return selectionModelContainer;
	    };
	    /**
	     * Method to prepare the pres models for selection by values.
	     *
	     * Supports 3 types for selection:
	     * 1) hierarchical value based selection
	     * 2) range value based selection
	     * 3) Dimension value based selection
	     *
	     * @param marks
	     * @param hierModelArr
	     * @param dimModelArr
	     * @param quantModelArr
	     * @param selection
	     */
	    SelectionServiceImpl.prototype.parseSelectionMarks = function (selectionCriterias, selectionType) {
	        var selectionModelContainer = new SelectionModels_1.SelectionModelsContainer();
	        var mixedSelectionsError = false;
	        for (var i = 0; i < selectionCriterias.length; i++) {
	            var st = selectionCriterias[i];
	            if (st.fieldName && (st.value !== undefined && st.value !== null)) {
	                var catRegex = new RegExp('(\[[A-Za-z0-9]+]).*', 'g');
	                var rangeOption = st.value;
	                if (catRegex.test(st.fieldName)) {
	                    if (selectionType === SelectionCriteriaType.HierarchicalType) {
	                        var hierModel = this.addToParamsList(st.fieldName, st.value);
	                        selectionModelContainer.hierModelArr.push(hierModel);
	                    }
	                    else {
	                        mixedSelectionsError = true;
	                        break;
	                    }
	                }
	                else if (rangeOption.min !== undefined
	                    && rangeOption.max !== undefined) {
	                    if (selectionType === SelectionCriteriaType.RangeType) {
	                        var quantModel = this.addToRangeParamsList(st.fieldName, rangeOption);
	                        selectionModelContainer.quantModelArr.push(quantModel);
	                    }
	                    else {
	                        mixedSelectionsError = true;
	                        break;
	                    }
	                }
	                else {
	                    if (selectionType === SelectionCriteriaType.DimensionType) {
	                        var dimModel = this.addToParamsList(st.fieldName, st.value);
	                        selectionModelContainer.dimModelArr.push(dimModel);
	                    }
	                    else {
	                        mixedSelectionsError = true;
	                        break;
	                    }
	                }
	            }
	        }
	        if (mixedSelectionsError) {
	            throw api_utils_1.TableauException.invalid(['Selection Criteria', 'Different types of selection criterias provided.']);
	        }
	        return selectionModelContainer;
	    };
	    /**
	     *
	     * @param selectionCriterias Validate and determine the selection criterias type.
	     */
	    SelectionServiceImpl.prototype.validateSelectionCriteria = function (selectionCriteria) {
	        var selectionType;
	        // Determine the type of selection, this command is by looking at the first selection
	        var crit = selectionCriteria;
	        var catRegex = new RegExp('(\[[A-Za-z0-9]+]).*', 'g');
	        var rangeOption = crit.value;
	        if (crit.fieldName && (crit.value !== undefined && crit.value !== null)) {
	            if (catRegex.test(crit.fieldName)) {
	                selectionType = SelectionCriteriaType.HierarchicalType;
	            }
	            else if (rangeOption.min !== undefined
	                && rangeOption.max !== undefined) {
	                selectionType = SelectionCriteriaType.RangeType;
	            }
	            else {
	                selectionType = SelectionCriteriaType.DimensionType;
	            }
	        }
	        else {
	            throw api_utils_1.TableauException.invalid(['Selection', 'Criteria format.']);
	        }
	        return selectionType;
	    };
	    /**
	     * Method to transform the key value pair into value based pres model object.
	     *
	     * @param valueSelectionModel
	     * @param fieldName
	     * @param value
	     */
	    SelectionServiceImpl.prototype.addToParamsList = function (fieldName, value) {
	        var valueSelectionModel = new SelectionModels_1.ValueSelectionModel();
	        var markValues = [];
	        if (value instanceof Array) {
	            var valueArr = value;
	            for (var i = 0; i < valueArr.length; i++) {
	                markValues.push(valueArr[i].toString());
	            }
	        }
	        else {
	            markValues.push(value.toString());
	        }
	        valueSelectionModel.qualifiedFieldCaption = fieldName;
	        valueSelectionModel.selectValues = markValues;
	        return valueSelectionModel;
	    };
	    /**
	     * Method to transform the key value pair into range based selection pres model.
	     *
	     * TODO: Need to handle the parsing of date type values.
	     *
	     * @param valueSelectionModel
	     * @param fieldName
	     * @param value
	     */
	    SelectionServiceImpl.prototype.addToRangeParamsList = function (fieldName, value) {
	        var rangeSelectionModel = new SelectionModels_1.RangeSelectionModel();
	        rangeSelectionModel.qualifiedFieldCaption = fieldName;
	        if (value.max !== undefined && value.max !== null) {
	            rangeSelectionModel.maxValue = value.max.toString();
	        }
	        if (value.min !== undefined && value.min !== null) {
	            rangeSelectionModel.minValue = value.min.toString();
	        }
	        rangeSelectionModel.included = this.validateNullOptionType(value.nullOption);
	        return rangeSelectionModel;
	    };
	    /**
	     * Method to validate the selection update type.
	     *
	     * @param selectionUpdateType
	     */
	    SelectionServiceImpl.prototype.validateSelectionUpdateType = function (selectionUpdateType) {
	        if (selectionUpdateType === Contract.SelectionUpdateType.Replace) {
	            return api_internal_contract_1.SelectionUpdateType.Replace;
	        }
	        else if (selectionUpdateType === Contract.SelectionUpdateType.Add) {
	            return api_internal_contract_1.SelectionUpdateType.Add;
	        }
	        else if (selectionUpdateType === Contract.SelectionUpdateType.Remove) {
	            return api_internal_contract_1.SelectionUpdateType.Remove;
	        }
	        return api_internal_contract_1.SelectionUpdateType.Replace;
	    };
	    /**
	     * Method to validate the include type for range selection.
	     *
	     * @param nullOption
	     */
	    SelectionServiceImpl.prototype.validateNullOptionType = function (nullOption) {
	        if (nullOption) {
	            if (nullOption === Contract.FilterNullOption.NullValues) {
	                return api_internal_contract_1.QuantitativeIncludedValues.IncludeNull;
	            }
	            else if (nullOption === Contract.FilterNullOption.NonNullValues) {
	                return api_internal_contract_1.QuantitativeIncludedValues.IncludeNonNull;
	            }
	            else if (nullOption === Contract.FilterNullOption.AllValues) {
	                return api_internal_contract_1.QuantitativeIncludedValues.IncludeAll;
	            }
	        }
	        return api_internal_contract_1.QuantitativeIncludedValues.IncludeAll;
	    };
	    return SelectionServiceImpl;
	}());
	exports.SelectionServiceImpl = SelectionServiceImpl;
	/**
	 * Enum for the different selection criteria types.
	 */
	var SelectionCriteriaType;
	(function (SelectionCriteriaType) {
	    SelectionCriteriaType[SelectionCriteriaType["HierarchicalType"] = 1] = "HierarchicalType";
	    SelectionCriteriaType[SelectionCriteriaType["RangeType"] = 2] = "RangeType";
	    SelectionCriteriaType[SelectionCriteriaType["DimensionType"] = 3] = "DimensionType";
	    SelectionCriteriaType[SelectionCriteriaType["TuplesType"] = 4] = "TuplesType";
	})(SelectionCriteriaType || (SelectionCriteriaType = {}));


/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Selection Model.
	 */
	var SelectionModel = (function () {
	    function SelectionModel() {
	    }
	    return SelectionModel;
	}());
	exports.SelectionModel = SelectionModel;
	/**
	 * Value based selection model. Meant for hierarchical, range and categorical selections.
	 */
	var ValueSelectionModel = (function (_super) {
	    __extends(ValueSelectionModel, _super);
	    function ValueSelectionModel() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.selectValues = [];
	        return _this;
	    }
	    return ValueSelectionModel;
	}(SelectionModel));
	exports.ValueSelectionModel = ValueSelectionModel;
	/**
	 * Hierarchical value selection model
	 */
	var HierarchicalSelectionModel = (function (_super) {
	    __extends(HierarchicalSelectionModel, _super);
	    function HierarchicalSelectionModel() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return HierarchicalSelectionModel;
	}(ValueSelectionModel));
	exports.HierarchicalSelectionModel = HierarchicalSelectionModel;
	/**
	 * Range based value selection model
	 */
	var RangeSelectionModel = (function (_super) {
	    __extends(RangeSelectionModel, _super);
	    function RangeSelectionModel() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return RangeSelectionModel;
	}(SelectionModel));
	exports.RangeSelectionModel = RangeSelectionModel;
	/**
	 * Dimension value selection model
	 */
	var DimensionSelectionModel = (function (_super) {
	    __extends(DimensionSelectionModel, _super);
	    function DimensionSelectionModel() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return DimensionSelectionModel;
	}(ValueSelectionModel));
	exports.DimensionSelectionModel = DimensionSelectionModel;
	/**
	 * Tuple based selection model
	 */
	var TupleSelectionModel = (function () {
	    function TupleSelectionModel() {
	        this.objectIds = [];
	    }
	    return TupleSelectionModel;
	}());
	exports.TupleSelectionModel = TupleSelectionModel;
	/**
	 * Container class to populate all the selection models when parsing input
	 */
	var SelectionModelsContainer = (function () {
	    function SelectionModelsContainer() {
	        this.hierModelArr = [];
	        this.dimModelArr = [];
	        this.quantModelArr = [];
	    }
	    return SelectionModelsContainer;
	}());
	exports.SelectionModelsContainer = SelectionModelsContainer;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_messaging_1 = __webpack_require__(44);
	var CrossFrameDispatcher_1 = __webpack_require__(50);
	// Checks to see if we are running in an iframe currently: https://stackoverflow.com/a/326076/8821153
	function inIframe(thisWindow) {
	    try {
	        return thisWindow.self !== thisWindow.parent;
	    }
	    catch (e) {
	        return true;
	    }
	}
	/**
	 * Attempts to bootstrap the extension with a cross-frame parent where Tableau is running
	 *
	 * @param thisWindow The window which we are running in (injected for unit testing purposes)
	 * @param versionNumber The version number of our API to include in the initialization message
	 * @returns A promise which is doing the actual bootstrapping
	 */
	function doCrossFrameBootstrap(thisWindow, versionNumber) {
	    return new Promise(function (resolve, reject) {
	        // Check to make sure we're in an iframe and have a parent to communicate with
	        if (!inIframe(thisWindow)) {
	            reject('This extension is not running inside an iframe or desktop. Initialization failed.');
	        }
	        // Create the messenger which will do he communication between this window and our parent
	        // Since we don't know where we are running yet, we have to make this initial origin '*'. Once
	        // we have successfully initialized our extension, we will limit where we send messages
	        var messenger = new api_messaging_1.CrossFrameMessenger(thisWindow, thisWindow.parent, '*');
	        // Prepare to send an initialization message to the parent frame
	        var initializationMessage = messenger.prepareInitializationMessage(versionNumber, api_messaging_1.VERSION);
	        // When we receive a response back from the parent, we check to make sure the guids match and then we know
	        // that the parent is aware of us and we can start communicating
	        messenger.setCommandResponseMessageHandler(function (msg) {
	            // Verify we are getting a response from our initialize message
	            if (msg.commandGuid === initializationMessage.messageGuid) {
	                var dispatcher = new CrossFrameDispatcher_1.CrossFrameDispatcher(messenger);
	                resolve(dispatcher);
	            }
	        });
	        // Now that our handlers are ready, start listening and send our initialization message
	        messenger.startListening();
	        initializationMessage.send();
	    });
	}
	exports.doCrossFrameBootstrap = doCrossFrameBootstrap;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(45));
	__export(__webpack_require__(48));
	// Export the version number of messaging for consumers to use.
	// Be very careful making any updates to this contract which break version compatibility.
	exports.VERSION = {
	    major: 1,
	    minor: 0,
	    fix: 0
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var guid_1 = __webpack_require__(46);
	var CrossFramePreparedMessage_1 = __webpack_require__(47);
	var MessageTypes_1 = __webpack_require__(48);
	var MessageTypeChecks_1 = __webpack_require__(49);
	/**
	 * The CrossFrameMessenger is the primary export from the api-messaging module. An instance of
	 * this class can be instantiated on both sides of a frame boundary to facilitate communication
	 * in both directions between the frames. This class implements both the dispatcher and the listener
	 * portions, but doesn't require callers to care about both.
	 */
	var CrossFrameMessenger = (function () {
	    /**
	     * Creates an instance of CrossFrameMessenger. If you would like to use the CrossFrameMessenger as a MessageListener,
	     * be sure to call StartListening and register message handlers.
	     * @param thisWindow The window object which the CrossFrameMessenger lives. An onMessage listener will be added here.
	     * @param [otherWindow] Optional otherWindow which messages will be posted to.
	     *                      If defined, incoming messages must originate from otherWindow to be passed on
	     * @param [otherWindowOrigin] The target origin which otherWindow must have in order to receive dispatched messages.
	     *                            This value will be sent as the targetOrigin of a postMessage
	     *                            (https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
	     */
	    function CrossFrameMessenger(thisWindow, otherWindow, otherWindowOrigin) {
	        this.thisWindow = thisWindow;
	        this.otherWindow = otherWindow;
	        this.otherWindowOrigin = otherWindowOrigin;
	        // Make sure to call StartListening
	    }
	    ///// MessageListener Implementation
	    CrossFrameMessenger.prototype.startListening = function () {
	        var _this = this;
	        // Check if we already are listening, if not, hook up a message listener
	        if (!this.unregisterFunction) {
	            var boundHandler_1 = this.onMessageReceived.bind(this);
	            this.thisWindow.addEventListener('message', boundHandler_1, true);
	            this.unregisterFunction = function () { return _this.thisWindow.removeEventListener('message', boundHandler_1, true); };
	        }
	    };
	    CrossFrameMessenger.prototype.stopListening = function () {
	        // Stop listening if we have started listening
	        if (this.unregisterFunction) {
	            this.unregisterFunction();
	            this.unregisterFunction = undefined;
	        }
	    };
	    CrossFrameMessenger.prototype.setInitializeMessageHandler = function (handler) {
	        this.initializeMessageHandler = handler;
	    };
	    CrossFrameMessenger.prototype.setCommandResponseMessageHandler = function (handler) {
	        this.commandResponseMessageHandler = handler;
	    };
	    CrossFrameMessenger.prototype.setCommandMessageHandler = function (handler) {
	        this.commandMessageHandler = handler;
	    };
	    CrossFrameMessenger.prototype.setNotificationMessageHandler = function (handler) {
	        this.notificationMessageHandler = handler;
	    };
	    ///// MessageDispatcher Implementation
	    CrossFrameMessenger.prototype.prepareInitializationMessage = function (apiVersion, crossFrameVersion) {
	        var message = {
	            msgGuid: guid_1.Guid.create().formattedValue,
	            msgType: MessageTypes_1.MessageType.Initialize,
	            crossFrameVersion: crossFrameVersion,
	            apiVersion: apiVersion
	        };
	        return this.prepareMessage(message);
	    };
	    CrossFrameMessenger.prototype.prepareCommandMessage = function (verbId, parameters) {
	        var message = {
	            msgGuid: guid_1.Guid.create().formattedValue,
	            msgType: MessageTypes_1.MessageType.Command,
	            verbId: verbId,
	            parameters: parameters
	        };
	        return this.prepareMessage(message);
	    };
	    CrossFrameMessenger.prototype.prepareCommandResponseMessage = function (commandGuid, data, error) {
	        var message = {
	            msgGuid: guid_1.Guid.create().formattedValue,
	            msgType: MessageTypes_1.MessageType.CommandResponse,
	            commandGuid: commandGuid,
	            data: data,
	            error: error
	        };
	        return this.prepareMessage(message);
	    };
	    CrossFrameMessenger.prototype.prepareNotificationMessage = function (notificationId, data) {
	        var message = {
	            msgGuid: guid_1.Guid.create().formattedValue,
	            msgType: MessageTypes_1.MessageType.Notification,
	            notificationId: notificationId,
	            data: data
	        };
	        return this.prepareMessage(message);
	    };
	    /**
	     * Prepares a pending message for sending and returns the prepared message
	     *
	     * @param msg The message to be sent to this.otherWindow
	     * @returns The prepared message
	     */
	    CrossFrameMessenger.prototype.prepareMessage = function (msg) {
	        if (!this.otherWindow || !this.otherWindowOrigin) {
	            throw 'Other window not initialized, cannot dispatch messages';
	        }
	        var preparedMessage = new CrossFramePreparedMessage_1.CrossFramePreparedMessage(msg, this.otherWindow, this.otherWindowOrigin);
	        return preparedMessage;
	    };
	    /**
	     * Called when a message is received. Does some validation of the message, and then
	     * calls an appropriate message handler if one is defined
	     *
	     * @param event The incoming MessageEvent
	     */
	    CrossFrameMessenger.prototype.onMessageReceived = function (event) {
	        // If we have an otherWindow defined, make sure the message is coming from there
	        if (this.otherWindow && event.source !== this.otherWindow) {
	            return;
	        }
	        // Do some validation on event.data to make sure that we have received a real message
	        if (!event.data) {
	            return;
	        }
	        var message = event.data;
	        if (!MessageTypeChecks_1.isMessage(message)) {
	            return;
	        }
	        // Check the declared message type, validate the message, and call an appropriate hander if one exists
	        switch (message.msgType) {
	            case MessageTypes_1.MessageType.Initialize: {
	                if (!MessageTypeChecks_1.isInitMessage(message) || !this.initializeMessageHandler) {
	                    return;
	                }
	                this.initializeMessageHandler(message, event.source);
	                break;
	            }
	            case MessageTypes_1.MessageType.CommandResponse: {
	                if (!MessageTypeChecks_1.isCommandResponseMessage(message) || !this.commandResponseMessageHandler) {
	                    return;
	                }
	                this.commandResponseMessageHandler(message, event.source);
	                break;
	            }
	            case MessageTypes_1.MessageType.Command: {
	                if (!MessageTypeChecks_1.isCommandMessage(message) || !this.commandMessageHandler) {
	                    return;
	                }
	                this.commandMessageHandler(message, event.source);
	                break;
	            }
	            case MessageTypes_1.MessageType.Notification: {
	                if (!MessageTypeChecks_1.isNotificationMessage(message) || !this.notificationMessageHandler) {
	                    return;
	                }
	                this.notificationMessageHandler(message, event.source);
	                break;
	            }
	            default:
	        }
	    };
	    return CrossFrameMessenger;
	}());
	exports.CrossFrameMessenger = CrossFrameMessenger;


/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var guidRegex = /^[a-f0-9]{8}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{12}$/i;
	var emptyGuidValue = '00000000-0000-0000-0000-000000000000';
	/**
	 * This is where the magic happens. Generates the specified number of GUID quads using a random number.
	 * @param count The number of quads to generate.
	 */
	function generateQuad(count) {
	    if (count === void 0) { count = 1; }
	    var out = '';
	    for (var i = 0; i < count; i++) {
	        // tslint:disable-next-line:no-bitwise
	        out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	    }
	    return out;
	}
	/**
	 * Represents a Globally Unique Identifier (GUID). This is not meant to be cryptographically secure.
	 */
	var Guid = (function () {
	    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    // Constructor
	    function Guid(value) {
	        this.value = value.toLowerCase();
	    }
	    Object.defineProperty(Guid.prototype, "formattedValue", {
	        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	        // Properties
	        /**
	         * Read-only formatted value of the GUID.
	         */
	        get: function () {
	            return this.value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Guid.prototype, "isEmpty", {
	        /**
	         * Returns a value indicating whether this GUID is empty (equal to Guid.EMPTY).
	         */
	        get: function () {
	            return this.value === emptyGuidValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    // Methods
	    /**
	     * Returns a value indicating whether the value is a valid GUID.
	     * @param value Either a Guid instance or a string
	     */
	    Guid.isGuid = function (value) {
	        return (value instanceof Guid) || guidRegex.test(value);
	    };
	    /**
	     * Creates a new GUID.
	     */
	    Guid.create = function () {
	        return new Guid([generateQuad(2), generateQuad(), generateQuad(), generateQuad(), generateQuad(3)].join('-'));
	    };
	    /**
	     * Parses an existing GUID string. Throws a TypeError if the value is not a valid GUID.
	     * @param value the existing GUID string to parse
	     */
	    Guid.parse = function (value) {
	        if (!Guid.isGuid(value)) {
	            throw new TypeError("Value is not a valid GUID: '" + value + "'");
	        }
	        return new Guid(value);
	    };
	    /**
	     * Returns the formatted GUID.
	     */
	    Guid.prototype.toString = function () {
	        return this.value;
	    };
	    /**
	     * Returns a value indicating whether another GUID is equal to this GUID.
	     * @param other Either another Guid instance or a formatted GUID string.
	     */
	    Guid.prototype.equals = function (other) {
	        var otherGuid = (other instanceof Guid) ? other : Guid.parse(other);
	        return this.formattedValue === otherGuid.formattedValue;
	    };
	    /**
	     * Represents a placeholder GUID or a value to represent a non-GUID.
	     * Returns '00000000-0000-0000-0000-000000000000'.
	     */
	    Guid.EMPTY = new Guid(emptyGuidValue);
	    return Guid;
	}());
	exports.Guid = Guid;


/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Implementation of the PreparedMessage interface used to post messages between
	 * two frames using window.postMessage
	 */
	var CrossFramePreparedMessage = (function () {
	    /**
	     * Creates an instance of CrossFramePreparedMessage.
	     * @param _message The message to be sent
	     * @param _target The target window where the message will be sent
	     * @param _origin The targetOrigin where this message can be received
	     */
	    function CrossFramePreparedMessage(_message, _target, _origin) {
	        this._message = _message;
	        this._target = _target;
	        this._origin = _origin;
	    }
	    Object.defineProperty(CrossFramePreparedMessage.prototype, "messageGuid", {
	        get: function () { return this._message.msgGuid; },
	        enumerable: true,
	        configurable: true
	    });
	    CrossFramePreparedMessage.prototype.send = function () {
	        this._target.postMessage(this._message, this._origin);
	        return this;
	    };
	    return CrossFramePreparedMessage;
	}());
	exports.CrossFramePreparedMessage = CrossFramePreparedMessage;


/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Enum defining the 4 different types of messages we have defined
	 */
	var MessageType;
	(function (MessageType) {
	    MessageType["Initialize"] = "initialize";
	    MessageType["Notification"] = "notification";
	    MessageType["Command"] = "command";
	    MessageType["CommandResponse"] = "command-response";
	})(MessageType = exports.MessageType || (exports.MessageType = {}));


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var guid_1 = __webpack_require__(46);
	var MessageTypes_1 = __webpack_require__(48);
	/* tslint:disable no-any */
	function isMessage(data) {
	    if (!data) {
	        return false;
	    }
	    var message = data;
	    if (!message || !message.msgGuid || !message.msgType) {
	        return false;
	    }
	    if (!guid_1.Guid.isGuid(message.msgGuid)) {
	        return false;
	    }
	    if (typeof message.msgType !== 'string') {
	        return false;
	    }
	    var messageTypes = [MessageTypes_1.MessageType.Command, MessageTypes_1.MessageType.CommandResponse, MessageTypes_1.MessageType.Initialize, MessageTypes_1.MessageType.Notification];
	    if (messageTypes.indexOf(message.msgType) < 0) {
	        return false;
	    }
	    return true;
	}
	exports.isMessage = isMessage;
	function isVersion(versionNumber) {
	    if (!versionNumber) {
	        return false;
	    }
	    var v = versionNumber;
	    if (typeof v !== 'object') {
	        return false;
	    }
	    if (typeof v.fix !== 'number' || typeof v.minor !== 'number' || typeof v.major !== 'number') {
	        return false;
	    }
	    return true;
	}
	exports.isVersion = isVersion;
	function isInitMessage(message) {
	    if (!isMessage(message)) {
	        return false;
	    }
	    var initMessage = message;
	    if (initMessage.msgType !== MessageTypes_1.MessageType.Initialize) {
	        return false;
	    }
	    if (!initMessage.apiVersion || !isVersion(initMessage.apiVersion)) {
	        return false;
	    }
	    if (!initMessage.crossFrameVersion || !isVersion(initMessage.crossFrameVersion)) {
	        return false;
	    }
	    return true;
	}
	exports.isInitMessage = isInitMessage;
	function isCommandResponseMessage(message) {
	    if (!isMessage(message)) {
	        return false;
	    }
	    var crMessage = message;
	    if (crMessage.msgType !== MessageTypes_1.MessageType.CommandResponse) {
	        return false;
	    }
	    if (!guid_1.Guid.isGuid(crMessage.commandGuid)) {
	        return false;
	    }
	    if (!crMessage.data && !crMessage.error) {
	        return false;
	    }
	    return true;
	}
	exports.isCommandResponseMessage = isCommandResponseMessage;
	function isCommandMessage(message) {
	    if (!isMessage(message)) {
	        return false;
	    }
	    var commandMessage = message;
	    if (commandMessage.msgType !== MessageTypes_1.MessageType.Command) {
	        return false;
	    }
	    if (!commandMessage.parameters || typeof commandMessage.parameters !== 'object') {
	        return false;
	    }
	    if (!commandMessage.verbId || typeof commandMessage.verbId !== 'string') {
	        return false;
	    }
	    return true;
	}
	exports.isCommandMessage = isCommandMessage;
	function isNotificationMessage(message) {
	    if (!isMessage(message)) {
	        return false;
	    }
	    var notificationMessage = message;
	    if (notificationMessage.msgType !== MessageTypes_1.MessageType.Notification) {
	        return false;
	    }
	    if (!notificationMessage.data || typeof notificationMessage.data !== 'object') {
	        return false;
	    }
	    if (!notificationMessage.notificationId || typeof notificationMessage.notificationId !== 'string') {
	        return false;
	    }
	    return true;
	}
	exports.isNotificationMessage = isNotificationMessage;


/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * This is an implementation of the InternalApiDispatcher interface which functions by passing messages
	 * across a frame boundary. This is usually between the code where our javscript library has been included
	 * by a 3rd party dev and another frame where Tableau server has content.
	 */
	var CrossFrameDispatcher = (function () {
	    /**
	     * Creates an instance of CrossFrameDispatcher which will use the given messenger to communicate
	     * @param _messenger an instantiated and listening messenger object
	     */
	    function CrossFrameDispatcher(_messenger) {
	        this._messenger = _messenger;
	        // Collection of pending promises which are waiting to be resolved. When we receive a response back from the other frame,
	        // these promises can be either resolved or rejected
	        this._pendingPromises = {};
	        // The collection of notification handlers which have been registered with this dispatcher
	        this._notificationHandlers = [];
	        if (!this._messenger) {
	            throw 'Missing messenger object';
	        }
	        // Set up our message handlers. We only care about incoming notifications and command responses
	        this._messenger.setCommandResponseMessageHandler(this.onCommandResponse.bind(this));
	        this._messenger.setNotificationMessageHandler(this.onNotification.bind(this));
	    }
	    ////// Start InternalApiDispatcher implementation
	    CrossFrameDispatcher.prototype.setVersionNumber = function (versionNumber) {
	        this._versionNumber = versionNumber;
	    };
	    CrossFrameDispatcher.prototype.execute = function (verb, parameters) {
	        var _this = this;
	        // To execute a verb, we first prepare a command message and then define a promise.
	        var preparedMessage = this._messenger.prepareCommandMessage(verb, parameters);
	        var promise = new Promise(function (resolve, reject) {
	            // Save off the pending promise by the messageGuid we are about to send. When a response is
	            // received, we'll be able to resolve this promise with the result
	            _this._pendingPromises[preparedMessage.messageGuid] = { resolve: resolve, reject: reject };
	        });
	        // Actually send the message and return the promise
	        preparedMessage.send();
	        return promise;
	    };
	    CrossFrameDispatcher.prototype.registerNotificationHandler = function (handler) {
	        this._notificationHandlers.push(handler);
	    };
	    CrossFrameDispatcher.prototype.unregisterNotificationHandler = function (handler) {
	        this._notificationHandlers = this._notificationHandlers.filter(function (h) { return h !== handler; });
	    };
	    ////// End InternalApiDispatcher implementation
	    CrossFrameDispatcher.prototype.onCommandResponse = function (response) {
	        // We got a command response, look through the pending promises and resolve
	        if (Object.keys(this._pendingPromises).indexOf(response.commandGuid) < 0) {
	            return; // We don't have any reference to this command, just return
	        }
	        var pendingPromise = this._pendingPromises[response.commandGuid];
	        // If we have an error defined, reject the promise
	        if (response.error) {
	            pendingPromise.reject(response.error);
	        }
	        // If we have data defined, resolve the promise
	        if (response.data) {
	            pendingPromise.resolve({ result: response.data });
	        }
	        // Clean up our pending promises object
	        delete this._pendingPromises[response.commandGuid];
	    };
	    CrossFrameDispatcher.prototype.onNotification = function (notificationMessage) {
	        // Go through each notification handler we have registered and let them know a notification came in
	        for (var _i = 0, _a = this._notificationHandlers; _i < _a.length; _i++) {
	            var handler = _a[_i];
	            try {
	                handler({ notificationId: notificationMessage.notificationId, data: notificationMessage.data });
	            }
	            catch (e) {
	                // Ignore this. Wrap in try/catch so if one handler errors, the other still get the message
	            }
	        }
	    };
	    return CrossFrameDispatcher;
	}());
	exports.CrossFrameDispatcher = CrossFrameDispatcher;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_utils_1 = __webpack_require__(10);
	/**
	 * Represents the current version of the extensions library
	 */
	var VersionNumber = (function () {
	    // private constructor so everyone uses the singleton instance
	    function VersionNumber(versionString) {
	        var parts = versionString.split('.').map(function (p) { return parseInt(p, 10); });
	        if (parts.length !== 3) {
	            throw api_utils_1.TableauException.error(VersionNumber.INVALID_VERSION_NUMBER, [versionString]);
	        }
	        this.major = parts[0];
	        this.minor = parts[1];
	        this.fix = parts[2];
	    }
	    Object.defineProperty(VersionNumber, "Instance", {
	        /**
	         * Gets the singleton instance of the version number.
	         */
	        get: function () {
	            return VersionNumber._instance;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    VersionNumber.SetVersionNumber = function (numString) {
	        VersionNumber._instance = new VersionNumber(numString);
	    };
	    Object.defineProperty(VersionNumber.prototype, "formattedValue", {
	        get: function () {
	            return this.major + "." + this.minor + "." + this.fix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    VersionNumber.INVALID_VERSION_NUMBER = 'Invalid version number: ';
	    return VersionNumber;
	}());
	exports.VersionNumber = VersionNumber;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	var EnumConverter_1 = __webpack_require__(11);
	exports.EnumConverter = EnumConverter_1.EnumConverter;
	var Param_1 = __webpack_require__(13);
	exports.Param = Param_1.Param;
	var TableauException_1 = __webpack_require__(12);
	exports.TableauException = TableauException_1.TableauException;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Sheet_1 = __webpack_require__(54);
	var Dashboard = (function (_super) {
	    __extends(Dashboard, _super);
	    function Dashboard(_dashboardImpl) {
	        var _this = _super.call(this, _dashboardImpl) || this;
	        _this._dashboardImpl = _dashboardImpl;
	        _dashboardImpl.initializeWithPublicInterfaces(_this);
	        return _this;
	    }
	    Object.defineProperty(Dashboard.prototype, "worksheets", {
	        get: function () {
	            return this._dashboardImpl.worksheets;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Dashboard.prototype, "objects", {
	        get: function () {
	            return this._dashboardImpl.objects;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Dashboard;
	}(Sheet_1.Sheet));
	exports.Dashboard = Dashboard;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	var Sheet = (function (_super) {
	    __extends(Sheet, _super);
	    function Sheet(_sheetImpl) {
	        var _this = _super.call(this) || this;
	        _this._sheetImpl = _sheetImpl;
	        return _this;
	    }
	    Object.defineProperty(Sheet.prototype, "name", {
	        get: function () {
	            return this._sheetImpl.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Sheet.prototype, "sheetType", {
	        get: function () {
	            return this._sheetImpl.sheetType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Sheet.prototype, "size", {
	        get: function () {
	            return this._sheetImpl.size;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Sheet.prototype.findParameterAsync = function (parameterName) {
	        return this._sheetImpl.findParameterAsync(parameterName, this);
	    };
	    Sheet.prototype.getParametersAsync = function () {
	        return this._sheetImpl.getParametersAsync(this);
	    };
	    return Sheet;
	}(api_shared_1.EventListenerManager));
	exports.Sheet = Sheet;


/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Implementation of the external DashboardContent namespace.
	 * This does not follow the Impl pattern as DashboardContent is
	 * currently just a (single) property bag.
	 */
	var DashboardContent = (function () {
	    function DashboardContent(_dashboard) {
	        this._dashboard = _dashboard;
	    }
	    Object.defineProperty(DashboardContent.prototype, "dashboard", {
	        get: function () {
	            return this._dashboard;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return DashboardContent;
	}());
	exports.DashboardContent = DashboardContent;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	/**
	 * Implementation of the external environment namespace.
	 * Environment does not follow the Impl pattern as it is
	 * just a property bag.
	 */
	var Environment = (function () {
	    function Environment(extensionEnvironment) {
	        this._apiVersion = extensionEnvironment.apiVersion;
	        this._context = api_shared_1.InternalToExternalEnumMappings.extensionContext.convert(extensionEnvironment.extensionContext);
	        this._language = extensionEnvironment.extensionLanguage;
	        this._locale = extensionEnvironment.extensionLocale;
	        this._mode = api_shared_1.InternalToExternalEnumMappings.extensionMode.convert(extensionEnvironment.extensionMode);
	        this._operatingSystem = extensionEnvironment.operatingSystem;
	        this._tableauVersion = extensionEnvironment.tableauVersion;
	    }
	    Object.defineProperty(Environment.prototype, "apiVersion", {
	        get: function () {
	            return this._apiVersion;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Environment.prototype, "context", {
	        get: function () {
	            return this._context;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Environment.prototype, "language", {
	        get: function () {
	            return this._language;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Environment.prototype, "locale", {
	        get: function () {
	            return this._locale;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Environment.prototype, "mode", {
	        get: function () {
	            return this._mode;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Environment.prototype, "operatingSystem", {
	        get: function () {
	            return this._operatingSystem;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Environment.prototype, "tableauVersion", {
	        get: function () {
	            return this._tableauVersion;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Environment;
	}());
	exports.Environment = Environment;


/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Implementation of the external settings namespace.
	 */
	var Settings = (function () {
	    function Settings(settingsImpl) {
	        this.settingsImpl = settingsImpl;
	    }
	    Settings.prototype.erase = function (key) {
	        this.settingsImpl.erase(key);
	    };
	    Settings.prototype.get = function (key) {
	        return this.settingsImpl.get(key);
	    };
	    Settings.prototype.getAll = function () {
	        return this.settingsImpl.getAll();
	    };
	    Object.defineProperty(Settings.prototype, "isModified", {
	        get: function () {
	            return this.settingsImpl.isModified;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Settings.prototype.saveAsync = function () {
	        return this.settingsImpl.saveAsync();
	    };
	    Settings.prototype.set = function (key, value) {
	        this.settingsImpl.set(key, value);
	    };
	    return Settings;
	}());
	exports.Settings = Settings;


/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Implementation of the external UI namespace.
	 */
	var UI = (function () {
	    function UI(_impl) {
	        this._impl = _impl;
	    }
	    UI.prototype.displayDialogAsync = function (url, height, width) {
	        return this._impl.displayDialogAsync(url, height, width);
	    };
	    //HACK: this should probably be async
	    UI.prototype.messageParentExtension = function (message) {
	        this._impl.messageParentExtension(message);
	    };
	    return UI;
	}());
	exports.UI = UI;
	var ExtensionDialog = (function () {
	    function ExtensionDialog(_impl) {
	        this._impl = _impl;
	    }
	    // HACK: This should probably be async
	    ExtensionDialog.prototype.close = function () {
	        //this._impl
	    };
	    ExtensionDialog.prototype.addEventListener = function (eventType, handler) {
	        this._impl.addEventListener(eventType, handler);
	    };
	    return ExtensionDialog;
	}());
	exports.ExtensionDialog = ExtensionDialog;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	var InitializationServiceImpl_1 = __webpack_require__(60);
	var SettingsServiceImpl_1 = __webpack_require__(61);
	var UIServiceImpl_1 = __webpack_require__(62);
	function registerAllExtensionsServices(dispatcher) {
	    api_shared_1.ApiServiceRegistry.instance.registerService(new InitializationServiceImpl_1.InitializationServiceImpl(dispatcher));
	    api_shared_1.ApiServiceRegistry.instance.registerService(new SettingsServiceImpl_1.SettingsServiceImpl(dispatcher));
	    api_shared_1.ApiServiceRegistry.instance.registerService(new UIServiceImpl_1.UIServiceImpl(dispatcher));
	}
	exports.registerAllExtensionsServices = registerAllExtensionsServices;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_internal_contract_1 = __webpack_require__(2);
	var InitializationServiceImpl = (function () {
	    function InitializationServiceImpl(dispatcher) {
	        this.dispatcher = dispatcher;
	    }
	    Object.defineProperty(InitializationServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "InitializationService" /* InitializationService */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    InitializationServiceImpl.prototype.initializeDashboardExtensionsAsync = function () {
	        // We don't need any parameters for this call because they are added in for us by the dispatcher
	        return this.dispatcher.execute(api_internal_contract_1.VerbId.InitializeExtension, {}).then(function (response) {
	            // TODO - Validate return value
	            var result = response.result;
	            return result;
	        });
	    };
	    return InitializationServiceImpl;
	}());
	exports.InitializationServiceImpl = InitializationServiceImpl;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_internal_contract_1 = __webpack_require__(2);
	var api_utils_1 = __webpack_require__(52);
	var SettingsServiceImpl = (function () {
	    function SettingsServiceImpl(dispatcher) {
	        this.dispatcher = dispatcher;
	    }
	    Object.defineProperty(SettingsServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "SettingsService" /* SettingsService */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SettingsServiceImpl.prototype.saveSettingsAsync = function (settings) {
	        var parameters = (_a = {}, _a[api_internal_contract_1.ParameterId.SettingsValues] = settings, _a);
	        return this.dispatcher.execute(api_internal_contract_1.VerbId.SaveExtensionSettings, parameters).then(function (value) {
	            var result = value.result;
	            if (!result || !result.settingsValues) {
	                throw api_utils_1.TableauException.internalError(['saving settings.']);
	            }
	            return (result.settingsValues);
	        });
	        var _a;
	    };
	    return SettingsServiceImpl;
	}());
	exports.SettingsServiceImpl = SettingsServiceImpl;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_internal_contract_1 = __webpack_require__(2);
	var UIServiceImpl = (function () {
	    function UIServiceImpl(dispatcher) {
	        this.dispatcher = dispatcher;
	    }
	    Object.defineProperty(UIServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "UIService" /* UIService */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    UIServiceImpl.prototype.displayDialogAsync = function (url) {
	        var parameters = (_a = {}, _a[api_internal_contract_1.ParameterId.DialogUrl] = url, _a);
	        return this.dispatcher.execute(api_internal_contract_1.VerbId.DisplayDialog, parameters).then(function (value) {
	            return;
	        });
	        var _a;
	    };
	    UIServiceImpl.prototype.closeDialog = function () {
	        var parameters = {};
	        this.dispatcher.execute(api_internal_contract_1.VerbId.CloseDialog, parameters);
	    };
	    UIServiceImpl.prototype.sendMessage = function (message) {
	        var parameters = (_a = {}, _a[api_internal_contract_1.ParameterId.DialogMessage] = message, _a);
	        this.dispatcher.execute(api_internal_contract_1.VerbId.CloseDialog, parameters);
	        var _a;
	    };
	    return UIServiceImpl;
	}());
	exports.UIServiceImpl = UIServiceImpl;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(64);
	var api_internal_contract_1 = __webpack_require__(2);
	var api_shared_1 = __webpack_require__(8);
	var DashboardObject_1 = __webpack_require__(65);
	var Worksheet_1 = __webpack_require__(66);
	var SheetImpl_1 = __webpack_require__(67);
	var SheetInfoImpl_1 = __webpack_require__(68);
	var WorksheetImpl_1 = __webpack_require__(69);
	var DashboardImpl = (function (_super) {
	    __extends(DashboardImpl, _super);
	    function DashboardImpl(_info, _sheetPath) {
	        var _this = _super.call(this, new SheetInfoImpl_1.SheetInfoImpl(_info.name, Contract.SheetType.Dashboard, new api_shared_1.Size(_info.size.h, _info.size.w))) || this;
	        _this._info = _info;
	        _this._sheetPath = _sheetPath;
	        return _this;
	    }
	    Object.defineProperty(DashboardImpl.prototype, "worksheets", {
	        get: function () {
	            return this._worksheets;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DashboardImpl.prototype, "objects", {
	        get: function () {
	            return this._objects;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DashboardImpl.prototype.initializeWithPublicInterfaces = function (dashboard) {
	        this._worksheets = new Array();
	        this._objects = new Array();
	        // Process all the zones which are contained in this dashboard
	        for (var _i = 0, _a = this._info.zones; _i < _a.length; _i++) {
	            var zone = _a[_i];
	            var worksheet = undefined;
	            var zoneSize = new api_shared_1.Size(zone.height, zone.width);
	            if (zone.zoneType === api_internal_contract_1.DashboardObjectType.Worksheet) {
	                var sheetInfo = new SheetInfoImpl_1.SheetInfoImpl(zone.name, Contract.SheetType.Worksheet, zoneSize);
	                var vizId = {
	                    worksheet: zone.name,
	                    dashboard: this._info.name,
	                    storyboard: this._sheetPath.storyboard,
	                    flipboardZoneID: this._sheetPath.flipboardZoneID,
	                    storyPointID: this._sheetPath.storyPointID
	                };
	                var worksheetImpl = new WorksheetImpl_1.WorksheetImpl(sheetInfo, vizId, dashboard);
	                worksheet = new Worksheet_1.Worksheet(worksheetImpl);
	                this._worksheets.push(worksheet);
	            }
	            var zonePoint = new api_shared_1.Point(zone.x, zone.y);
	            var dashboardObject = new DashboardObject_1.DashboardObject(dashboard, api_shared_1.InternalToExternalEnumMappings.dashboardObjectType.convert(zone.zoneType), zonePoint, zoneSize, worksheet);
	            this._objects.push(dashboardObject);
	        }
	    };
	    return DashboardImpl;
	}(SheetImpl_1.SheetImpl));
	exports.DashboardImpl = DashboardImpl;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(21));


/***/ },
/* 65 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Implementation of the dashboard objects - the zones in a dashboard.
	 * This does not follow the Impl pattern as it is just a property bag.
	 */
	var DashboardObject = (function () {
	    function DashboardObject(_dashboard, _type, _position, _size, _worksheet) {
	        this._dashboard = _dashboard;
	        this._type = _type;
	        this._position = _position;
	        this._size = _size;
	        this._worksheet = _worksheet;
	    }
	    Object.defineProperty(DashboardObject.prototype, "dashboard", {
	        get: function () {
	            return this._dashboard;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DashboardObject.prototype, "type", {
	        get: function () {
	            return this._type;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DashboardObject.prototype, "position", {
	        get: function () {
	            return this._position;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DashboardObject.prototype, "size", {
	        get: function () {
	            return this._size;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DashboardObject.prototype, "worksheet", {
	        get: function () {
	            return this._worksheet;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return DashboardObject;
	}());
	exports.DashboardObject = DashboardObject;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_utils_1 = __webpack_require__(52);
	var Sheet_1 = __webpack_require__(54);
	var Worksheet = (function (_super) {
	    __extends(Worksheet, _super);
	    function Worksheet(_worksheetImpl) {
	        var _this = _super.call(this, _worksheetImpl) || this;
	        _this._worksheetImpl = _worksheetImpl;
	        // Call to initialize events and then call down to the event listener manager to handle things
	        _this._worksheetImpl.initializeEvents(_this).forEach(function (e) { return _this.addNewEventType(e); });
	        return _this;
	    }
	    Object.defineProperty(Worksheet.prototype, "parentDashboard", {
	        get: function () {
	            return this._worksheetImpl.parentDashboard;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Worksheet.prototype.applyFilterAsync = function (fieldName, values, updateType, options) {
	        return this._worksheetImpl.applyFilterAsync(fieldName, values, updateType, options);
	    };
	    Worksheet.prototype.applyRangeFilterAsync = function (fieldName, filterOptions) {
	        return this._worksheetImpl.applyRangeFilterAsync(fieldName, filterOptions);
	    };
	    Worksheet.prototype.clearFilterAsync = function (fieldName) {
	        return this._worksheetImpl.clearFilterAsync(fieldName);
	    };
	    Worksheet.prototype.getAnalyticObjectsAsync = function () {
	        throw api_utils_1.TableauException.apiNotImplemented(['getAnalyticObjectsAsync']);
	    };
	    Worksheet.prototype.getDataSourcesAsync = function () {
	        return this._worksheetImpl.getDataSourcesAsync();
	    };
	    Worksheet.prototype.getEncodingsAsync = function () {
	        throw api_utils_1.TableauException.apiNotImplemented(['getEncodingsAsync']);
	    };
	    Worksheet.prototype.getFiltersAsync = function () {
	        return this._worksheetImpl.getFiltersAsync();
	    };
	    Worksheet.prototype.getSelectedMarksAsync = function () {
	        return this._worksheetImpl.getSelectedMarksAsync();
	    };
	    Worksheet.prototype.getHighlightedMarksAsync = function () {
	        return this._worksheetImpl.getHighlightedMarksAsync();
	    };
	    Worksheet.prototype.getSummaryDataAsync = function (options) {
	        return this._worksheetImpl.getSummaryDataAsync(options);
	    };
	    Worksheet.prototype.getUnderlyingDataAsync = function (options) {
	        return this._worksheetImpl.getUnderlyingDataAsync(options);
	    };
	    Worksheet.prototype.clearSelectedMarksAsync = function () {
	        return this._worksheetImpl.clearSelectedMarksAsync();
	    };
	    Worksheet.prototype.selectMarksByIDAsync = function (marksInfo, updateType) {
	        return this._worksheetImpl.selectMarksByIdAsync(marksInfo, updateType);
	    };
	    Worksheet.prototype.selectMarksByValueAsync = function (selections, selectionUpdateType) {
	        return this._worksheetImpl.selectMarksByValueAsync(selections, selectionUpdateType);
	    };
	    Worksheet.prototype.selectMarksByIdAsync = function (selections, selectionUpdateType) {
	        return this._worksheetImpl.selectMarksByIdAsync(selections, selectionUpdateType);
	    };
	    return Worksheet;
	}(Sheet_1.Sheet));
	exports.Worksheet = Worksheet;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	var SheetImpl = (function () {
	    function SheetImpl(_sheetInfoImpl) {
	        this._sheetInfoImpl = _sheetInfoImpl;
	    }
	    Object.defineProperty(SheetImpl.prototype, "name", {
	        get: function () {
	            return this._sheetInfoImpl.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SheetImpl.prototype, "sheetType", {
	        get: function () {
	            return this._sheetInfoImpl.sheetType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SheetImpl.prototype, "sheetPath", {
	        get: function () {
	            return this._sheetInfoImpl.sheetPath;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SheetImpl.prototype, "size", {
	        get: function () {
	            return this._sheetInfoImpl.sheetSize;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SheetImpl.prototype.findParameterAsync = function (parameterName, sheet) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("parameters-service" /* Parameters */);
	        return service.findParameterByNameAsync(parameterName, sheet);
	    };
	    SheetImpl.prototype.getParametersAsync = function (sheet) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("parameters-service" /* Parameters */);
	        return service.getParametersForSheetAsync(this.sheetPath, sheet);
	    };
	    return SheetImpl;
	}());
	exports.SheetImpl = SheetImpl;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_external_contract_1 = __webpack_require__(64);
	var SheetInfoImpl = (function () {
	    function SheetInfoImpl(_name, _sheetType, _sheetSize) {
	        this._name = _name;
	        this._sheetType = _sheetType;
	        this._sheetSize = _sheetSize;
	    }
	    Object.defineProperty(SheetInfoImpl.prototype, "name", {
	        get: function () {
	            return this._name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SheetInfoImpl.prototype, "sheetSize", {
	        get: function () {
	            return this._sheetSize;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SheetInfoImpl.prototype, "sheetType", {
	        get: function () {
	            return this._sheetType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SheetInfoImpl.prototype, "sheetPath", {
	        get: function () {
	            return {
	                sheetName: this.name,
	                isDashboard: this.sheetType === api_external_contract_1.SheetType.Dashboard
	                // TODO - Stories
	            };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return SheetInfoImpl;
	}());
	exports.SheetInfoImpl = SheetInfoImpl;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(64);
	var api_internal_contract_1 = __webpack_require__(2);
	var api_shared_1 = __webpack_require__(8);
	var DataSource_1 = __webpack_require__(70);
	var DataSourceImpl_1 = __webpack_require__(71);
	var SheetImpl_1 = __webpack_require__(67);
	var visualIdsAreEqual = function (a, b) {
	    return a && b &&
	        a.worksheet === b.worksheet &&
	        a.dashboard === b.dashboard &&
	        a.storyboard === b.storyboard &&
	        a.storyPointID === b.storyPointID &&
	        a.flipboardZoneID === b.flipboardZoneID;
	};
	var WorksheetImpl = (function (_super) {
	    __extends(WorksheetImpl, _super);
	    function WorksheetImpl(sheetInfoImpl, _visualId, _parentDashboard) {
	        var _this = _super.call(this, sheetInfoImpl) || this;
	        _this._visualId = _visualId;
	        _this._parentDashboard = _parentDashboard;
	        return _this;
	    }
	    Object.defineProperty(WorksheetImpl.prototype, "parentDashboard", {
	        get: function () {
	            return this._parentDashboard;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Helper method which goes through and registers each event type this impl knows about
	     * with the NotificationService. It returns an array of SingleEventManager objects which
	     * can then be passed to an EventListenerManager to handle user registration / unregistration.
	     *
	     * @param {Worksheet} worksheet The worksheet object which will be included with the event notifications
	     * @returns {Array<SingleEventManager>} Collection of event managers to pass to an EventListenerManager
	     */
	    WorksheetImpl.prototype.initializeEvents = function (worksheet) {
	        var _this = this;
	        var results = new Array();
	        var notificationService;
	        try {
	            notificationService = api_shared_1.ApiServiceRegistry.instance.getService("notification-service" /* Notification */);
	        }
	        catch (e) {
	            // If we don't have this service registered, just return
	            return results;
	        }
	        // Initialize all of the event managers we'll need (one for each event type)
	        var marksEvent = new api_shared_1.SingleEventManagerImpl(Contract.TableauEventType.MarkSelectionChanged);
	        notificationService.registerHandler(api_internal_contract_1.NotificationId.SelectedMarksChanged, function (model) {
	            var visualId = model;
	            return visualIdsAreEqual(visualId, _this.visualId);
	        }, function (viz) {
	            marksEvent.triggerEvent(function () { return new api_shared_1.MarksSelectedEvent(worksheet); });
	        });
	        var filterEvent = new api_shared_1.SingleEventManagerImpl(Contract.TableauEventType.FilterChanged);
	        notificationService.registerHandler(api_internal_contract_1.NotificationId.FilterChanged, function (model) {
	            var filterEventResponse = model;
	            return _this.visualId.worksheet === filterEventResponse.visualId.worksheet;
	        }, function (event) {
	            filterEvent.triggerEvent(function () { return new api_shared_1.FilterChangedEvent(worksheet, event.fieldName); });
	        });
	        results.push(marksEvent);
	        results.push(filterEvent);
	        // TODO - other event types
	        return results;
	    };
	    Object.defineProperty(WorksheetImpl.prototype, "visualId", {
	        get: function () {
	            return this._visualId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WorksheetImpl.prototype.applyFilterAsync = function (fieldName, values, updateType, options) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
	        return service.applyFilterAsync(this.visualId, fieldName, values, updateType, options);
	    };
	    WorksheetImpl.prototype.applyRangeFilterAsync = function (fieldName, filterOptions) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
	        return service.applyRangeFilterAsync(this.visualId, fieldName, filterOptions);
	    };
	    WorksheetImpl.prototype.clearFilterAsync = function (fieldName) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
	        return service.clearFilterAsync(this.visualId, fieldName);
	    };
	    WorksheetImpl.prototype.getDataSourcesAsync = function () {
	        var _this = this;
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("data-source-service" /* DataSourceService */);
	        return service.getDataSourcesAsync().then(function (result) {
	            var dataSchema = result;
	            var worksheetDataSourceInfo = dataSchema.worksheetDataSchemaMap[_this.name];
	            var dataSources = [];
	            // First, add the primary datasource.  By convention, it comes first in the returned array.
	            var primaryId = worksheetDataSourceInfo.primaryDataSource;
	            dataSources.push(_this.createDataSourceFromInfo(dataSchema.dataSources[primaryId]));
	            // Then, loop through any secondary data sources and add them.
	            for (var _i = 0, _a = worksheetDataSourceInfo.referencedDataSourceList; _i < _a.length; _i++) {
	                var secondaryId = _a[_i];
	                if (secondaryId !== primaryId) {
	                    dataSources.push(_this.createDataSourceFromInfo(dataSchema.dataSources[secondaryId]));
	                }
	            }
	            return dataSources;
	        });
	    };
	    WorksheetImpl.prototype.getFiltersAsync = function () {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
	        return service.getFiltersAsync(this.visualId);
	    };
	    WorksheetImpl.prototype.getSelectedMarksAsync = function () {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
	        return service.getSelectedMarksAsync(this.visualId);
	    };
	    WorksheetImpl.prototype.getHighlightedMarksAsync = function () {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
	        return service.getHighlightedMarksAsync(this.visualId);
	    };
	    WorksheetImpl.prototype.getSummaryDataAsync = function (options) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
	        options = options || {};
	        return service.getUnderlyingDataAsync(this.visualId, api_shared_1.GetDataType.Summary, !!options.ignoreAliases, !!options.ignoreSelection, true, 0);
	    };
	    WorksheetImpl.prototype.getUnderlyingDataAsync = function (options) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
	        options = options || {};
	        return service.getUnderlyingDataAsync(this.visualId, api_shared_1.GetDataType.Underlying, !!options.ignoreAliases, !!options.ignoreSelection, !!options.includeAllColumns, options.maxRows || 0);
	    };
	    WorksheetImpl.prototype.clearSelectedMarksAsync = function () {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("selection-service" /* Selection */);
	        return service.clearSelectedMarksAsync(this.visualId);
	    };
	    WorksheetImpl.prototype.selectMarksByValueAsync = function (selections, selectionUpdateType) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("selection-service" /* Selection */);
	        return service.selectMarksByValueAsync(this.visualId, selections, selectionUpdateType);
	    };
	    WorksheetImpl.prototype.selectMarksByIdAsync = function (selections, selectionUpdateType) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("selection-service" /* Selection */);
	        return service.selectMarksByIdAsync(this.visualId, selections, selectionUpdateType);
	    };
	    WorksheetImpl.prototype.createDataSourceFromInfo = function (dataSourceInfo) {
	        var dataSourceImpl = new DataSourceImpl_1.DataSourceImpl(dataSourceInfo);
	        var dataSource = new DataSource_1.DataSource(dataSourceImpl);
	        dataSourceImpl.initializeWithPublicInterfaces(dataSource);
	        return dataSource;
	    };
	    return WorksheetImpl;
	}(SheetImpl_1.SheetImpl));
	exports.WorksheetImpl = WorksheetImpl;


/***/ },
/* 70 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var DataSource = (function () {
	    function DataSource(_dataSourceImpl) {
	        this._dataSourceImpl = _dataSourceImpl;
	    }
	    Object.defineProperty(DataSource.prototype, "name", {
	        get: function () {
	            return this._dataSourceImpl.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSource.prototype, "id", {
	        get: function () {
	            return this._dataSourceImpl.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSource.prototype, "fields", {
	        get: function () {
	            return this._dataSourceImpl.fields;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSource.prototype, "extractUpdateTime", {
	        get: function () {
	            return this._dataSourceImpl.extractUpdateTime;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSource.prototype, "isExtract", {
	        get: function () {
	            return this._dataSourceImpl.isExtract;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DataSource.prototype.refreshAsync = function () {
	        return this._dataSourceImpl.refreshAsync();
	    };
	    DataSource.prototype.getActiveTablesAsync = function () {
	        return this._dataSourceImpl.getActiveTablesAsync();
	    };
	    DataSource.prototype.getConnectionSummariesAsync = function () {
	        return this._dataSourceImpl.getConnectionSummariesAsync();
	    };
	    DataSource.prototype.getUnderlyingDataAsync = function (options) {
	        return this._dataSourceImpl.getUnderlyingDataAsync(options);
	    };
	    return DataSource;
	}());
	exports.DataSource = DataSource;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	var api_utils_1 = __webpack_require__(52);
	var FieldImpl_1 = __webpack_require__(72);
	var Field_1 = __webpack_require__(73);
	var TableSummary_1 = __webpack_require__(74);
	var DataSourceImpl = (function () {
	    function DataSourceImpl(_dataSourceInfo) {
	        var _this = this;
	        this._dataSourceInfo = _dataSourceInfo;
	        this._fields = _dataSourceInfo.fields.map(function (fieldModel) {
	            var fieldImpl = new FieldImpl_1.FieldImpl(fieldModel, _this);
	            return new Field_1.Field(fieldImpl);
	        });
	    }
	    Object.defineProperty(DataSourceImpl.prototype, "name", {
	        get: function () {
	            return this._dataSourceInfo.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSourceImpl.prototype, "id", {
	        get: function () {
	            return this._dataSourceInfo.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSourceImpl.prototype, "extractUpdateTime", {
	        get: function () {
	            return this._dataSourceInfo.extractUpdateTime;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSourceImpl.prototype, "fields", {
	        get: function () {
	            return this._fields;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSourceImpl.prototype, "isExtract", {
	        get: function () {
	            return this._dataSourceInfo.isExtract;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DataSourceImpl.prototype.refreshAsync = function () {
	        var dataSourceService = api_shared_1.ApiServiceRegistry.instance.getService("data-source-service" /* DataSourceService */);
	        return dataSourceService.refreshAsync(this._dataSourceInfo.id);
	    };
	    DataSourceImpl.prototype.getConnectionSummariesAsync = function () {
	        throw api_utils_1.TableauException.apiNotImplemented(['DataSource connectionSummaries']);
	    };
	    DataSourceImpl.prototype.getActiveTablesAsync = function () {
	        var dataSourceService = api_shared_1.ApiServiceRegistry.instance.getService("data-source-service" /* DataSourceService */);
	        return dataSourceService.getActiveTablesAsync(this._dataSourceInfo.id).then(function (tableInfos) {
	            return tableInfos.map(function (tableInfo) { return new TableSummary_1.TableSummary(tableInfo); });
	        });
	    };
	    DataSourceImpl.prototype.getUnderlyingDataAsync = function (options) {
	        var defaultOptions = {
	            ignoreAliases: false,
	            maxRows: 10000,
	            columnsToInclude: [],
	        };
	        options = options || {};
	        var getDataService = api_shared_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
	        return getDataService.getDataSourceDataAsync(this.id, !!options.ignoreAliases, options.maxRows || defaultOptions.maxRows, options.columnsToInclude || defaultOptions.columnsToInclude);
	    };
	    DataSourceImpl.prototype.initializeWithPublicInterfaces = function (dataSource) {
	        this._fields = this._dataSourceInfo.fields.map(function (fieldModel) {
	            var fieldImpl = new FieldImpl_1.FieldImpl(fieldModel, dataSource);
	            return new Field_1.Field(fieldImpl);
	        });
	    };
	    return DataSourceImpl;
	}());
	exports.DataSourceImpl = DataSourceImpl;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	var FieldImpl = (function () {
	    function FieldImpl(_fieldInfo, _parentDataSource) {
	        this._fieldInfo = _fieldInfo;
	        this._parentDataSource = _parentDataSource;
	    }
	    Object.defineProperty(FieldImpl.prototype, "name", {
	        get: function () {
	            return this._fieldInfo.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "id", {
	        get: function () {
	            return this._fieldInfo.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "description", {
	        get: function () {
	            return this._fieldInfo.description;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "aggregation", {
	        get: function () {
	            return api_shared_1.InternalToExternalEnumMappings.fieldAggregationType.convert(this._fieldInfo.aggregation);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "dataSource", {
	        get: function () {
	            return this._parentDataSource;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "role", {
	        get: function () {
	            return api_shared_1.InternalToExternalEnumMappings.fieldRoleType.convert(this._fieldInfo.role);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "isHidden", {
	        get: function () {
	            return this._fieldInfo.isHidden;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "isGenerated", {
	        get: function () {
	            return this._fieldInfo.isGenerated;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "isCalculatedField", {
	        get: function () {
	            return this._fieldInfo.isCalculatedField;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "isCombinedField", {
	        get: function () {
	            return this._fieldInfo.isCombinedField;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FieldImpl.prototype.getCalculatedFieldAsync = function () {
	        throw new Error('Field getCalculatedFieldAsync method not yet implemented.');
	    };
	    return FieldImpl;
	}());
	exports.FieldImpl = FieldImpl;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_utils_1 = __webpack_require__(52);
	var Field = (function () {
	    function Field(_fieldImpl) {
	        this._fieldImpl = _fieldImpl;
	    }
	    Object.defineProperty(Field.prototype, "name", {
	        get: function () {
	            return this._fieldImpl.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "id", {
	        get: function () {
	            return this._fieldImpl.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "description", {
	        get: function () {
	            return this._fieldImpl.description;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "aggregation", {
	        get: function () {
	            return this._fieldImpl.aggregation;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "dataSource", {
	        get: function () {
	            return this._fieldImpl.dataSource;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "role", {
	        get: function () {
	            return this._fieldImpl.role;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "isHidden", {
	        get: function () {
	            return this._fieldImpl.isHidden;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "isGenerated", {
	        get: function () {
	            return this._fieldImpl.isGenerated;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "isCalculatedField", {
	        get: function () {
	            return this._fieldImpl.isCalculatedField;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "columnType", {
	        get: function () {
	            throw api_utils_1.TableauException.apiNotImplemented(['Field.columnType']);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "isCombinedField", {
	        get: function () {
	            return this._fieldImpl.isCombinedField;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Field.prototype.getCalculatedFieldAsync = function () {
	        return this._fieldImpl.getCalculatedFieldAsync();
	    };
	    return Field;
	}());
	exports.Field = Field;


/***/ },
/* 74 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Implementation of a table summary.
	 * This does not follow the Impl pattern as it is just a property bag.
	 */
	var TableSummary = (function () {
	    function TableSummary(_tableInfo) {
	        this._tableInfo = _tableInfo;
	    }
	    Object.defineProperty(TableSummary.prototype, "name", {
	        get: function () {
	            return this._tableInfo.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TableSummary.prototype, "id", {
	        get: function () {
	            return this._tableInfo.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TableSummary.prototype, "connectionId", {
	        get: function () {
	            return this._tableInfo.connectionId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TableSummary.prototype, "customSQL", {
	        get: function () {
	            return this._tableInfo.customSQL;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return TableSummary;
	}());
	exports.TableSummary = TableSummary;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	var api_utils_1 = __webpack_require__(52);
	var SettingsImpl = (function () {
	    function SettingsImpl(settingsInfo) {
	        // Since promises can't be introspected for state, keep a variable that
	        // indicates a save is in progress, so that set/erase can't be called during a save.
	        this._saveInProgress = false;
	        this.initializeSettings(settingsInfo);
	    }
	    SettingsImpl.prototype.erase = function (key) {
	        api_utils_1.Param.verifyValue(key, 'key');
	        // Only make a modification if we have the key already
	        if (this._currentSettings[key]) {
	            this.verifySettingsAreUnlocked();
	            delete this._currentSettings[key];
	            this._isModified = true;
	        }
	    };
	    SettingsImpl.prototype.get = function (key) {
	        api_utils_1.Param.verifyValue(key, 'key');
	        return this._currentSettings[key];
	    };
	    SettingsImpl.prototype.getAll = function () {
	        // Returns a mutable copy of the settings
	        return Object.assign({}, this._currentSettings);
	    };
	    Object.defineProperty(SettingsImpl.prototype, "isModified", {
	        get: function () {
	            return this._isModified;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SettingsImpl.prototype.saveAsync = function () {
	        var _this = this;
	        this.verifySettingsAreUnlocked();
	        // Just resolve immediately if settings are unchanged
	        if (!this._isModified) {
	            return Promise.resolve(this._currentSettings);
	        }
	        this._saveInProgress = true;
	        // Use the settings service to save settings to twb
	        var settingsService = api_shared_1.ApiServiceRegistry.instance.getService("SettingsService" /* SettingsService */);
	        return settingsService.saveSettingsAsync(this._currentSettings).then(function (newSettings) {
	            _this._saveInProgress = false;
	            _this._isModified = false;
	            Object.assign(_this._currentSettings, newSettings);
	            return newSettings;
	        });
	    };
	    SettingsImpl.prototype.set = function (key, value) {
	        api_utils_1.Param.verifyValue(key, 'key'); // Key shouldn't be an empty string.
	        api_utils_1.Param.verifyString(value, 'value'); // Empty string value is allowed.
	        this.verifySettingsAreUnlocked();
	        this._currentSettings[key] = value;
	        this._isModified = true;
	    };
	    SettingsImpl.prototype.initializeSettings = function (settingsInfo) {
	        api_utils_1.Param.verifyValue(settingsInfo, 'settingsInfo');
	        api_utils_1.Param.verifyValue(settingsInfo.settingsValues, 'settingsInfo.SettingsValues');
	        this._currentSettings = settingsInfo.settingsValues;
	        // Reset the isModified flag
	        this._isModified = false;
	    };
	    /**
	     * This helper should be called before any local update to this.currentSettings.
	     * Checks if a current save call is still in progress and throws an error if so.
	     */
	    SettingsImpl.prototype.verifySettingsAreUnlocked = function () {
	        if (this._saveInProgress) {
	            throw api_utils_1.TableauException.error(SettingsImpl.ASYNC_SAVE_IN_PROGRESS);
	        }
	    };
	    SettingsImpl.ASYNC_SAVE_IN_PROGRESS = 'Async Save is in progress, updating settings is not allowed.';
	    return SettingsImpl;
	}());
	exports.SettingsImpl = SettingsImpl;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	var ExtensionDialog_1 = __webpack_require__(77);
	var ExtensionDialogImpl_1 = __webpack_require__(78);
	var UIImpl = (function () {
	    function UIImpl() {
	    }
	    UIImpl.prototype.displayDialogAsync = function (url, height, width) {
	        var uiService = api_shared_1.ApiServiceRegistry.instance.getService("UIService" /* UIService */);
	        return uiService.displayDialogAsync(url).then(function (response) {
	            return new ExtensionDialog_1.ExtensionDialog(new ExtensionDialogImpl_1.ExtensionDialogImpl());
	        });
	    };
	    UIImpl.prototype.messageParentExtension = function (message) {
	        var uiService = api_shared_1.ApiServiceRegistry.instance.getService("UIService" /* UIService */);
	        uiService.sendMessage(message);
	    };
	    return UIImpl;
	}());
	exports.UIImpl = UIImpl;


/***/ },
/* 77 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ExtensionDialog = (function () {
	    function ExtensionDialog(_impl) {
	        this._impl = _impl;
	    }
	    ExtensionDialog.prototype.close = function () {
	        this._impl.close();
	    };
	    ExtensionDialog.prototype.addEventListener = function (type, handler) {
	        this._impl.addEventListener(type, handler);
	    };
	    return ExtensionDialog;
	}());
	exports.ExtensionDialog = ExtensionDialog;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_internal_contract_1 = __webpack_require__(2);
	var api_shared_1 = __webpack_require__(8);
	var ExtensionDialogImpl = (function () {
	    function ExtensionDialogImpl() {
	    }
	    ExtensionDialogImpl.prototype.close = function () {
	        var uiService = api_shared_1.ApiServiceRegistry.instance.getService("UIService" /* UIService */);
	        uiService.closeDialog();
	    };
	    ExtensionDialogImpl.prototype.addEventListener = function (type, handler) {
	        var notificationService;
	        try {
	            notificationService = api_shared_1.ApiServiceRegistry.instance.getService("notification-service" /* Notification */);
	        }
	        catch (e) {
	            // If we don't have this service registered, just return
	            return;
	        }
	        var filterFn = function (model) {
	            var message = model;
	            if (message.message) {
	                return true;
	            }
	            return false;
	        };
	        notificationService.registerHandler(api_internal_contract_1.NotificationId.UIMessage, filterFn, handler);
	    };
	    return ExtensionDialogImpl;
	}());
	exports.ExtensionDialogImpl = ExtensionDialogImpl;


/***/ },
/* 79 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Implementation of the external Extensions namespace.
	 */
	var Extensions = (function () {
	    function Extensions(extensionImpl) {
	        this.extensionImpl = extensionImpl;
	        this.extensionImpl = extensionImpl;
	    }
	    Object.defineProperty(Extensions.prototype, "dashboardContent", {
	        get: function () {
	            return this.extensionImpl.dashboardContent;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Extensions.prototype, "environment", {
	        get: function () {
	            return this.extensionImpl.environment;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Extensions.prototype, "settings", {
	        get: function () {
	            return this.extensionImpl.settings;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Extensions.prototype, "ui", {
	        get: function () {
	            return this.extensionImpl.ui;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Extensions.prototype.initializeAsync = function () {
	        return this.extensionImpl.initializeAsync();
	    };
	    return Extensions;
	}());
	exports.Extensions = Extensions;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhOWMwMTdhYzhkNjMxZmRmOTE0MCIsIndlYnBhY2s6Ly8vLi4vc3JjL0V4dGVuc2lvbnNBcGkudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9JbnRlcm5hbC9FeHRlbnNpb25zSW1wbC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1pbnRlcm5hbC1jb250cmFjdC9zcmMvQXBpSW50ZXJuYWxDb250cmFjdC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1pbnRlcm5hbC1jb250cmFjdC9zcmMvaW50ZXJmYWNlL0VudW1zLnRzIiwid2VicGFjazovLy9EOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLWludGVybmFsLWNvbnRyYWN0L3NyYy9pbnRlcmZhY2UvSW50ZXJuYWxBcGlEaXNwYXRjaGVyLnRzIiwid2VicGFjazovLy9EOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLWludGVybmFsLWNvbnRyYWN0L3NyYy9pbnRlcmZhY2UvTm90aWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1pbnRlcm5hbC1jb250cmFjdC9zcmMvaW50ZXJmYWNlL1BhcmFtZXRlcnMudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktaW50ZXJuYWwtY29udHJhY3Qvc3JjL2ludGVyZmFjZS9WZXJicy50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0FwaVNoYXJlZC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0V2ZW50TGlzdGVuZXJNYW5hZ2VyLnRzIiwid2VicGFjazovLy9EOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXV0aWxzL3NyYy9BcGlVdGlscy50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS11dGlscy9zcmMvRW51bUNvbnZlcnRlci50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS11dGlscy9zcmMvVGFibGVhdUV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS11dGlscy9zcmMvUGFyYW0udHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9QYXJhbWV0ZXIudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9Qb2ludC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1NpemUudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9Nb2RlbHMvR2V0RGF0YU1vZGVscy50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0V4Y2VwdGlvbnMvVGFibGVhdUV4Y2VwdGlvbnMudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9FdmVudHMvRmlsdGVyQ2hhbmdlZEV2ZW50LnRzIiwid2VicGFjazovLy9EOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLWV4dGVybmFsLWNvbnRyYWN0L3NyYy9BcGlFeHRlcm5hbENvbnRyYWN0LnRzIiwid2VicGFjazovLy9EOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLWV4dGVybmFsLWNvbnRyYWN0L3NyYy9FbnVtcy50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0V2ZW50cy9UYWJsZWF1V29ya3NoZWV0RXZlbnQudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9FdmVudHMvVGFibGVhdVNoZWV0RXZlbnQudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9FdmVudHMvVGFibGVhdUV2ZW50LnRzIiwid2VicGFjazovLy9EOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRXZlbnRzL01hcmtzU2VsZWN0ZWRFdmVudC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0ludGVybmFsL1NpbmdsZUV2ZW50TWFuYWdlckltcGwudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9HZXREYXRhU2VydmljZS50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1NlcnZpY2VzL1JlZ2lzdGVyQWxsU2hhcmVkU2VydmljZXMudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9pbXBsL0RhdGFTb3VyY2VTZXJ2aWNlSW1wbC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1NlcnZpY2VzL2ltcGwvRmlsdGVyU2VydmljZUltcGwudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9FbnVtTWFwcGluZ3MvRXh0ZXJuYWxUb0ludGVybmFsRW51bU1hcHBpbmdzLnRzIiwid2VicGFjazovLy9EOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRW51bU1hcHBpbmdzL0ludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncy50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL01vZGVscy9GaWx0ZXJNb2RlbHMudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9TZXJ2aWNlUmVnaXN0cnkudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9pbXBsL0dldERhdGFTZXJ2aWNlSW1wbC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1NlcnZpY2VzL2ltcGwvTm90aWZpY2F0aW9uU2VydmljZUltcGwudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9pbXBsL1BhcmFtZXRlcnNTZXJ2aWNlSW1wbC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0ludGVybmFsL1BhcmFtZXRlckltcGwudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9FdmVudHMvUGFyYW1ldGVyQ2hhbmdlZEV2ZW50LnRzIiwid2VicGFjazovLy9EOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvU2VydmljZXMvaW1wbC9TZWxlY3Rpb25TZXJ2aWNlSW1wbC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL01vZGVscy9TZWxlY3Rpb25Nb2RlbHMudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9Dcm9zc0ZyYW1lL0Nyb3NzRnJhbWVCb290c3RyYXAudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktbWVzc2FnaW5nL3NyYy9BcGlNZXNzYWdpbmcudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktbWVzc2FnaW5nL3NyYy9Dcm9zc0ZyYW1lTWVzc2VuZ2VyLnRzIiwid2VicGFjazovLy8uLi9zcmMvR3VpZC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1tZXNzYWdpbmcvc3JjL0Nyb3NzRnJhbWVQcmVwYXJlZE1lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktbWVzc2FnaW5nL3NyYy9pbnRlcmZhY2UvTWVzc2FnZVR5cGVzLnRzIiwid2VicGFjazovLy9EOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLW1lc3NhZ2luZy9zcmMvTWVzc2FnZVR5cGVDaGVja3MudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9Dcm9zc0ZyYW1lL0Nyb3NzRnJhbWVEaXNwYXRjaGVyLnRzIiwid2VicGFjazovLy9EOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvVmVyc2lvbk51bWJlci50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0Rhc2hib2FyZC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL1NoZWV0LnRzIiwid2VicGFjazovLy8uLi9zcmMvTmFtZXNwYWNlcy9EYXNoYm9hcmRDb250ZW50LnRzIiwid2VicGFjazovLy8uLi9zcmMvTmFtZXNwYWNlcy9FbnZpcm9ubWVudC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL05hbWVzcGFjZXMvU2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9OYW1lc3BhY2VzL1VJLnRzIiwid2VicGFjazovLy8uLi9zcmMvU2VydmljZXMvUmVnaXN0ZXJBbGxFeHRlbnNpb25zU2VydmljZXMudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9TZXJ2aWNlcy9JbXBsL0luaXRpYWxpemF0aW9uU2VydmljZUltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9TZXJ2aWNlcy9JbXBsL1NldHRpbmdzU2VydmljZUltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9TZXJ2aWNlcy9JbXBsL1VJU2VydmljZUltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9JbnRlcm5hbC9EYXNoYm9hcmRJbXBsLnRzIiwid2VicGFjazovLy8uLi9zcmMvRGFzaGJvYXJkT2JqZWN0LnRzIiwid2VicGFjazovLy8uLi9zcmMvV29ya3NoZWV0LnRzIiwid2VicGFjazovLy8uLi9zcmMvSW50ZXJuYWwvU2hlZXRJbXBsLnRzIiwid2VicGFjazovLy8uLi9zcmMvSW50ZXJuYWwvU2hlZXRJbmZvSW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0ludGVybmFsL1dvcmtzaGVldEltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9EYXRhU291cmNlLnRzIiwid2VicGFjazovLy8uLi9zcmMvSW50ZXJuYWwvRGF0YVNvdXJjZUltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9JbnRlcm5hbC9GaWVsZEltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9GaWVsZC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL1RhYmxlU3VtbWFyeS50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0ludGVybmFsL1NldHRpbmdzSW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0ludGVybmFsL1VJSW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0V4dGVuc2lvbkRpYWxvZy50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0ludGVybmFsL0V4dGVuc2lvbkRpYWxvZ0ltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9OYW1lc3BhY2VzL0V4dGVuc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FB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TSxJQUFHLDRDQUE0QixDQUFDLE1BQU07U0FDMUUsR0FBQyw0Q0FBNEIsQ0FBQyxHQUFHLElBQUcsNENBQTRCLENBQUMsR0FBRztTQUNwRSxHQUFDLDRDQUE0QixDQUFDLEdBQUcsSUFBRyw0Q0FBNEIsQ0FBQyxHQUFHO1NBQ3BFLEdBQUMsNENBQTRCLENBQUMsSUFBSSxJQUFHLDRDQUE0QixDQUFDLElBQUk7U0FDdEUsR0FBQyw0Q0FBNEIsQ0FBQyxLQUFLLElBQUcsNENBQTRCLENBQUMsS0FBSztTQUN4RSxHQUFDLDRDQUE0QixDQUFDLFFBQVEsSUFBRyw0Q0FBNEIsQ0FBQyxRQUFRO1NBQzlFLEdBQUMsNENBQTRCLENBQUMsR0FBRyxJQUFHLDRDQUE0QixDQUFDLEdBQUc7U0FDcEUsR0FBQyw0Q0FBNEIsQ0FBQyxHQUFHLElBQUcsNENBQTRCLENBQUMsR0FBRztTQUNwRSxHQUFDLDRDQUE0QixDQUFDLE1BQU0sSUFBRyw0Q0FBNEIsQ0FBQyxNQUFNO1NBQzFFLEdBQUMsNENBQTRCLENBQUMsR0FBRyxJQUFHLDRDQUE0QixDQUFDLEdBQUc7U0FDcEUsR0FBQyw0Q0FBNEIsQ0FBQyxNQUFNLElBQUcsNENBQTRCLENBQUMsTUFBTTtTQUMxRSxHQUFDLDRDQUE0QixDQUFDLFNBQVMsSUFBRyw0Q0FBNEIsQ0FBQyxTQUFTO1NBQ2hGLEdBQUMsNENBQTRCLENBQUMsSUFBSSxJQUFHLDRDQUE0QixDQUFDLElBQUk7U0FDdEUsR0FBQyw0Q0FBNEIsQ0FBQyxHQUFHLElBQUcsNENBQTRCLENBQUMsR0FBRztTQUNwRSxHQUFDLDRDQUE0QixDQUFDLE1BQU0sSUFBRyw0Q0FBNEIsQ0FBQyxNQUFNO1NBQzFFLEdBQUMsNENBQTRCLENBQUMsTUFBTSxJQUFHLDRDQUE0QixDQUFDLE1BQU07U0FDMUUsR0FBQyw0Q0FBNEIsQ0FBQyxNQUFNLElBQUcsNENBQTRCLENBQUMsTUFBTTtTQUMxRSxHQUFDLDRDQUE0QixDQUFDLFFBQVEsSUFBRyw0Q0FBNEIsQ0FBQyxRQUFRO1NBQzlFLEdBQUMsNENBQTRCLENBQUMsS0FB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UTtjQUFuQjthQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztTQUNyQyxDQUFDOzs7UUFBQTtLQUVELHNCQUFXLDBCQUFFO2NBQWI7YUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7U0FDL0IsQ0FBQzs7O1FBQUE7S0FFTSxvQ0FBZSxHQUF0QjtTQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQzlDLENBQUM7S0FDSCxpQkFBQztBQUFELEVBQUM7QUF4QlksaUNBQVUiLCJmaWxlIjoiQHRhYmxlYXUvZXh0ZW5zaW9ucy1hcGkuMC42LjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ0YWJsZWF1XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInRhYmxlYXVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGE5YzAxN2FjOGQ2MzFmZGY5MTQwXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgeW91ciBtYWluLiBUaGlzIGlzIHdoZXJlIHlvdSByZS1leHBvcnQgZXZlcnl0aGluZyB5b3Ugd2FudCB0byBiZSBwdWJsaWNseSBhdmFpbGFibGUuXHJcbiAqXHJcbiAqIFRoZSBidWlsZCBlbmZvcmNlcyB0aGF0IHRoZSBmaWxlIGhhcyB0aGUgc2FtZSBuYW1lIGFzIHRoZSBnbG9iYWwgdmFyaWFibGUgdGhhdCBpcyBleHBvcnRlZC5cclxuICovXHJcblxyXG4vLyBEdWUgdG8gdGhlIHdheSB3ZSBjb25maWd1cmVkIHdlYnBhY2ssIHdlIHNob3VsZCBiZSBleHBvcnRpbmcgdGhpbmdzIHdoaWNoIHdpbGwgYmUgdW5kZXJcclxuLy8gYSBnbG9iYWwgdmFyaWFibGUgY2FsbGVkIFwidGFibGVhdVwiLiBFeHBvcnQgZXZlcnl0aGluZyB3ZSB3YW50IHRvIGJlIHZpc2libGUgdW5kZXIgdGFibGVhdVxyXG4vLyBmcm9tIHRoaXMgZmlsZS5cclxuXHJcbmltcG9ydCB7IEV4dGVuc2lvbnNJbXBsIH0gZnJvbSAnLi9JbnRlcm5hbC9FeHRlbnNpb25zSW1wbCc7XHJcbmltcG9ydCB7IEV4dGVuc2lvbnMgfSBmcm9tICcuL05hbWVzcGFjZXMvRXh0ZW5zaW9ucyc7XHJcblxyXG5pbXBvcnQgeyBWZXJzaW9uTnVtYmVyIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXNoYXJlZCc7XHJcblxyXG5kZWNsYXJlIHZhciBFWFRFTlNJT05fQVBJX1ZFUlNJT05fTlVNQkVSOiBzdHJpbmc7XHJcblZlcnNpb25OdW1iZXIuU2V0VmVyc2lvbk51bWJlcihFWFRFTlNJT05fQVBJX1ZFUlNJT05fTlVNQkVSKTtcclxuXHJcbmNvbnN0IGV4dGVuc2lvbkltcGwgPSBuZXcgRXh0ZW5zaW9uc0ltcGwoKTtcclxuZXhwb3J0IGNvbnN0IGV4dGVuc2lvbnMgPSBuZXcgRXh0ZW5zaW9ucyhleHRlbnNpb25JbXBsKTtcclxuXHJcbi8vIEV4cG9ydCBFbnVtc1xyXG4vLyBUaGVzZSBzaG93IHVwIHVuZGVyIHRoZSB0YWJsZWF1IG9iamVjdC4gSS5lLiB0YWJsZWF1LkV4dGVuc2lvbkNvbnRleHQuU2VydmVyXHJcbmV4cG9ydCB7XHJcbiAgRXh0ZW5zaW9uQ29udGV4dCxcclxuICBFeHRlbnNpb25Nb2RlLFxyXG4gIEFuYWx5dGljc09iamVjdFR5cGUsXHJcbiAgQ29sdW1uVHlwZSxcclxuICBEYXNoYm9hcmRPYmplY3RUeXBlLFxyXG4gIERhdGFUeXBlLFxyXG4gIERhdGVSYW5nZVR5cGUsXHJcbiAgRGlhbG9nRXZlbnRUeXBlLFxyXG4gIEVuY29kaW5nVHlwZSxcclxuICBFcnJvckNvZGVzLFxyXG4gIEZpZWxkQWdncmVnYXRpb25UeXBlLFxyXG4gIEZpZWxkUm9sZVR5cGUsXHJcbiAgRmlsdGVyRG9tYWluVHlwZSxcclxuICBGaWx0ZXJUeXBlLFxyXG4gIEZpbHRlclVwZGF0ZVR5cGUsXHJcbiAgRmlsdGVyTnVsbE9wdGlvbixcclxuICBNYXJrVHlwZSxcclxuICBQYXJhbWV0ZXJWYWx1ZVR5cGUsXHJcbiAgUGVyaW9kVHlwZSxcclxuICBRdWlja1RhYmxlQ2FsY1R5cGUsXHJcbiAgU2VsZWN0aW9uVXBkYXRlVHlwZSxcclxuICBTaGVldFR5cGUsXHJcbiAgU29ydERpcmVjdGlvbixcclxuICBUYWJsZWF1RXZlbnRUeXBlLFxyXG4gIFRyZW5kTGluZU1vZGVsVHlwZVxyXG59IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9FeHRlbnNpb25zQXBpLnRzXG4gKiovIiwiaW1wb3J0IHtcclxuICBFeHRlbnNpb25EYXNoYm9hcmRJbmZvLFxyXG4gIEV4dGVuc2lvblNldHRpbmdzSW5mbyxcclxuICBJbnRlcm5hbEFwaURpc3BhdGNoZXIsXHJcbiAgSW50ZXJuYWxBcGlEaXNwYXRjaGVySG9sZGVyLFxyXG4gIFNoZWV0UGF0aCxcclxufSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVnaXN0cnksIGRvQ3Jvc3NGcmFtZUJvb3RzdHJhcCwgcmVnaXN0ZXJBbGxTaGFyZWRTZXJ2aWNlcywgVmVyc2lvbk51bWJlciB9IGZyb20gJ0B0YWJsZWF1L2FwaS1zaGFyZWQnO1xyXG5pbXBvcnQgeyBUYWJsZWF1RXhjZXB0aW9uIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXV0aWxzJztcclxuXHJcbmltcG9ydCB7IERhc2hib2FyZCB9IGZyb20gJy4uL0Rhc2hib2FyZCc7XHJcbmltcG9ydCB7IERhc2hib2FyZENvbnRlbnQgfSBmcm9tICcuLi9OYW1lc3BhY2VzL0Rhc2hib2FyZENvbnRlbnQnO1xyXG5pbXBvcnQgeyBFbnZpcm9ubWVudCB9IGZyb20gJy4uL05hbWVzcGFjZXMvRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gJy4uL05hbWVzcGFjZXMvU2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBVSSB9IGZyb20gJy4uL05hbWVzcGFjZXMvVUknO1xyXG5pbXBvcnQgeyBFeHRlbnNpb25zU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vU2VydmljZXMvRXh0ZW5zaW9uc1NlcnZpY2VOYW1lcyc7XHJcbmltcG9ydCB7IEluaXRpYWxpemF0aW9uU2VydmljZSB9IGZyb20gJy4uL1NlcnZpY2VzL0luaXRpYWxpemF0aW9uU2VydmljZSc7XHJcbmltcG9ydCB7IHJlZ2lzdGVyQWxsRXh0ZW5zaW9uc1NlcnZpY2VzIH0gZnJvbSAnLi4vU2VydmljZXMvUmVnaXN0ZXJBbGxFeHRlbnNpb25zU2VydmljZXMnO1xyXG5pbXBvcnQgeyBEYXNoYm9hcmRJbXBsIH0gZnJvbSAnLi9EYXNoYm9hcmRJbXBsJztcclxuaW1wb3J0IHsgU2V0dGluZ3NJbXBsIH0gZnJvbSAnLi9TZXR0aW5nc0ltcGwnO1xyXG5pbXBvcnQgeyBVSUltcGwgfSBmcm9tICcuL1VJSW1wbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRXh0ZW5zaW9uc0ltcGwge1xyXG4gIHByaXZhdGUgX2luaXRpYWxpemF0aW9uUHJvbWlzZTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgcHVibGljIGRhc2hib2FyZENvbnRlbnQ6IERhc2hib2FyZENvbnRlbnQ7XHJcbiAgcHVibGljIGVudmlyb25tZW50OiBFbnZpcm9ubWVudDtcclxuICBwdWJsaWMgc2V0dGluZ3M6IFNldHRpbmdzO1xyXG4gIHB1YmxpYyB1aTogVUk7XHJcblxyXG4gIHB1YmxpYyBpbml0aWFsaXplQXN5bmMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBpZiAoIXRoaXMuX2luaXRpYWxpemF0aW9uUHJvbWlzZSkge1xyXG4gICAgICB0aGlzLl9pbml0aWFsaXphdGlvblByb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgLy8gRmlyc3QgdGhpbmcgd2Ugd2FudCB0byBkbyBpcyBjaGVjayB0byBzZWUgaWYgdGhlcmUgaXMgYSBkZXNrdG9wIGRpc3BhdGNoZXIgYWxyZWFkeSByZWdpc3RlcmVkIGZvciB1c1xyXG4gICAgICAgIGlmIChJbnRlcm5hbEFwaURpc3BhdGNoZXJIb2xkZXIuaGFzRGVza3RvcEFwaURpc3BhdGNoZXJQcm9taXNlKCkpIHtcclxuICAgICAgICAgIC8vIFJ1bm5pbmcgaW4gZGVza3RvcCwgdXNlIHRoaXMgcHJvbWlzZVxyXG4gICAgICAgICAgY29uc3QgZGVza3RvcERpc3BhdGNoZXJQcm9taXNlID0gSW50ZXJuYWxBcGlEaXNwYXRjaGVySG9sZGVyLmdldERlc2t0b3BEaXNwYXRjaGVyUHJvbWlzZSgpO1xyXG4gICAgICAgICAgZGVza3RvcERpc3BhdGNoZXJQcm9taXNlLnRoZW4odGhpcy5vbkRpc3BhdGNoZXJSZWNlaXZlZC5iaW5kKHRoaXMpKS50aGVuKCgpID0+IHsgcmVzb2x2ZSgpOyB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gV2UgbXVzdCBiZSBydW5uaW5nIGluIHNlcnZlciwgc28gd2Ugc2hvdWxkIHRyeSB0byBraWNrIG9mIHRoZSBzZXJ2ZXIgZGlzcGF0Y2hlciBib290c3RyYXBwaW5nXHJcbiAgICAgICAgICBkb0Nyb3NzRnJhbWVCb290c3RyYXAod2luZG93LCBWZXJzaW9uTnVtYmVyLkluc3RhbmNlKS50aGVuKHRoaXMub25EaXNwYXRjaGVyUmVjZWl2ZWQuYmluZCh0aGlzKSkudGhlbigoKSA9PiB7IHJlc29sdmUoKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5faW5pdGlhbGl6YXRpb25Qcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkRpc3BhdGNoZXJSZWNlaXZlZChkaXNwYXRjaGVyOiBJbnRlcm5hbEFwaURpc3BhdGNoZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGRpc3BhdGNoZXIuc2V0VmVyc2lvbk51bWJlcihWZXJzaW9uTnVtYmVyLkluc3RhbmNlKTtcclxuXHJcbiAgICAvLyBDYWxsIHRvIHJlZ2lzdGVyIGFsbCB0aGUgc2VydmljZXMgd2hpY2ggd2lsbCB1c2UgdGhlIG5ld2x5IGluaXRpYWxpemVkIGRpc3BhdGNoZXJcclxuICAgIHJlZ2lzdGVyQWxsU2hhcmVkU2VydmljZXMoZGlzcGF0Y2hlcik7XHJcbiAgICByZWdpc3RlckFsbEV4dGVuc2lvbnNTZXJ2aWNlcyhkaXNwYXRjaGVyKTtcclxuXHJcbiAgICAvLyBHZXQgdGhlIGluaXRpYWxpemF0aW9uIHNlcnZpY2UgYW5kIGluaXRpYWxpemUgdGhpcyBleHRlbnNpb25cclxuICAgIGNvbnN0IGluaXRpYWxpemF0aW9uU2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPEluaXRpYWxpemF0aW9uU2VydmljZT4oXHJcbiAgICAgIEV4dGVuc2lvbnNTZXJ2aWNlTmFtZXMuSW5pdGlhbGl6YXRpb25TZXJ2aWNlKTtcclxuXHJcbiAgICByZXR1cm4gaW5pdGlhbGl6YXRpb25TZXJ2aWNlLmluaXRpYWxpemVEYXNoYm9hcmRFeHRlbnNpb25zQXN5bmMoKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgIGlmICghcmVzdWx0LmV4dGVuc2lvbkluc3RhbmNlLmxvY2F0b3IuZGFzaGJvYXJkUGF0aCkge1xyXG4gICAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uaXNVbmRlZmluZWQoWydEYXNoYm9hcmRQYXRoJ10pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmRhc2hib2FyZENvbnRlbnQgPSB0aGlzLmluaXRpYWxpemVEYXNoYm9hcmRDb250ZW50KHJlc3VsdC5leHRlbnNpb25EYXNoYm9hcmRJbmZvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5leHRlbnNpb25JbnN0YW5jZS5sb2NhdG9yLmRhc2hib2FyZFBhdGgpO1xyXG4gICAgICB0aGlzLmVudmlyb25tZW50ID0gbmV3IEVudmlyb25tZW50KHJlc3VsdC5leHRlbnNpb25FbnZpcm9ubWVudCk7XHJcbiAgICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLmluaXRpYWxpemVTZXR0aW5ncyhyZXN1bHQuZXh0ZW5zaW9uU2V0dGluZ3NJbmZvKTtcclxuICAgICAgdGhpcy51aSA9IG5ldyBVSShuZXcgVUlJbXBsKCkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRpYWxpemVEYXNoYm9hcmRDb250ZW50KGluZm86IEV4dGVuc2lvbkRhc2hib2FyZEluZm8sIHNoZWV0UGF0aDogU2hlZXRQYXRoKTogRGFzaGJvYXJkQ29udGVudCB7XHJcbiAgICBjb25zdCBkYXNoYm9hcmRJbXBsID0gbmV3IERhc2hib2FyZEltcGwoaW5mbywgc2hlZXRQYXRoKTtcclxuICAgIGNvbnN0IGRhc2hib2FyZCA9IG5ldyBEYXNoYm9hcmQoZGFzaGJvYXJkSW1wbCk7XHJcbiAgICByZXR1cm4gbmV3IERhc2hib2FyZENvbnRlbnQoZGFzaGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVNldHRpbmdzKHNldHRpbmdzSW5mbzogRXh0ZW5zaW9uU2V0dGluZ3NJbmZvKTogU2V0dGluZ3Mge1xyXG4gICAgY29uc3Qgc2V0dGluZ3NJbXBsID0gbmV3IFNldHRpbmdzSW1wbChzZXR0aW5nc0luZm8pO1xyXG4gICAgcmV0dXJuIG5ldyBTZXR0aW5ncyhzZXR0aW5nc0ltcGwpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvSW50ZXJuYWwvRXh0ZW5zaW9uc0ltcGwudHNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyB5b3VyIG1haW4uIFRoaXMgaXMgd2hlcmUgeW91IHJlLWV4cG9ydCBldmVyeXRoaW5nIHlvdSB3YW50IHRvIGJlIHB1YmxpY2x5IGF2YWlsYWJsZS5cclxuICpcclxuICogVGhlIGJ1aWxkIGVuZm9yY2VzIHRoYXQgdGhlIGZpbGUgaGFzIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGdsb2JhbCB2YXJpYWJsZSB0aGF0IGlzIGV4cG9ydGVkLlxyXG4gKi9cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL0VudW1zJztcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJuYWxBcGlEaXNwYXRjaGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvTW9kZWxzJztcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvTm90aWZpY2F0aW9ucyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL1BhcmFtZXRlcnMnO1xyXG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9WZXJicyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL1ZlcnNpb25OdW1iZXInO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLWludGVybmFsLWNvbnRyYWN0L3NyYy9BcGlJbnRlcm5hbENvbnRyYWN0LnRzXG4gKiovIiwiZXhwb3J0IGVudW0gRXh0ZW5zaW9uQ29udGV4dCB7XHJcbiAgRGVza3RvcCA9ICdkZXNrdG9wJyxcclxuICBTZXJ2ZXIgPSAnc2VydmVyJyxcclxuICBVbmtub3duID0gJ3Vua25vd24nXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEV4dGVuc2lvbk1vZGUge1xyXG4gIEF1dGhvcmluZyA9ICdhdXRob3JpbmcnLFxyXG4gIFZpZXdpbmcgPSAndmlld2luZycsXHJcbiAgVW5rbm93biA9ICd1bmtub3duJ1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBDb2x1bW5UeXBlIHtcclxuICBEaXNjcmV0ZSA9ICdkaXNjcmV0ZScsXHJcbiAgQ29udGludW91cyA9ICdjb250aW51b3VzJ1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBEYXNoYm9hcmRPYmplY3RUeXBlIHtcclxuICBCbGFuayA9ICdibGFuaycsXHJcbiAgV29ya3NoZWV0ID0gJ3dvcmtzaGVldCcsXHJcbiAgUXVpY2tGaWx0ZXIgPSAncXVpY2stZmlsdGVyJyxcclxuICBQYXJhbWV0ZXJDb250cm9sID0gJ3BhcmFtZXRlci1jb250cm9sJyxcclxuICBQYWdlRmlsdGVyID0gJ3BhZ2UtZmlsdGVyJyxcclxuICBMZWdlbmQgPSAnbGVnZW5kJyxcclxuICBUaXRsZSA9ICd0aXRsZScsXHJcbiAgVGV4dCA9ICd0ZXh0JyxcclxuICBJbWFnZSA9ICdpbWFnZScsXHJcbiAgV2ViUGFnZSA9ICd3ZWItcGFnZScsXHJcbiAgRXh0ZW5zaW9uID0gJ2V4dGVuc2lvbidcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRGF0YVR5cGUge1xyXG4gIFN0cmluZyA9ICdzdHJpbmcnLFxyXG4gIEludCA9ICdpbnQnLFxyXG4gIEZsb2F0ID0gJ2Zsb2F0JyxcclxuICBCb29sID0gJ2Jvb2wnLFxyXG4gIERhdGUgPSAnZGF0ZScsXHJcbiAgRGF0ZVRpbWUgPSAnZGF0ZS10aW1lJyxcclxuICBTcGF0aWFsID0gJ3NwYXRpYWwnXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVuY29kZWREYXRhVHlwZSB7XHJcbiAgTnVtYmVyID0gJ251bWJlcicsXHJcbiAgU3RyaW5nID0gJ3N0cmluZycsXHJcbiAgRGF0ZSA9ICdkYXRlJyxcclxuICBCb29sZWFuID0gJ2Jvb2xlYW4nXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVycm9yQ29kZSB7XHJcbiAgU2VydmVyRXJyb3IgPSAnc2VydmVyLWVycm9yJyxcclxuICBJbnZhbGlkQWdncmVnYXRpb25GaWVsZE5hbWUgPSAnaW52YWxpZC1hZ2dyZWdhdGlvbi1maWVsZC1uYW1lJyxcclxuICBJbnZhbGlkRmlsdGVyRmllbGROYW1lID0gJ2ludmFsaWQtZmlsdGVyLWZpZWxkbmFtZScsXHJcbiAgSW52YWxpZEZpbHRlckZpZWxkVmFsdWUgPSAnaW52YWxpZC1maWx0ZXItZmllbGQtdmFsdWUnXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEZpZWxkQWdncmVnYXRpb25UeXBlIHtcclxuICBTdW0gPSAnc3VtJyxcclxuICBBdmcgPSAnYXZnJyxcclxuICBNaW4gPSAnbWluJyxcclxuICBNYXggPSAnbWF4JyxcclxuICBTdGRldiA9ICdzdGRldicsXHJcbiAgU3RkZXZwID0gJ3N0ZGV2cCcsXHJcbiAgVmFyID0gJ3ZhcicsXHJcbiAgVmFycCA9ICd2YXJwJyxcclxuICBDb3VudCA9ICdjb3VudCcsXHJcbiAgQ291bnRkID0gJ2NvdW50ZCcsXHJcbiAgTWVkaWFuID0gJ21lZGlhbicsXHJcbiAgQXR0ciA9ICdhdHRyJyxcclxuICBOb25lID0gJ25vbmUnLFxyXG4gIFllYXIgPSAneWVhcicsXHJcbiAgUXRyID0gJ3F0cicsXHJcbiAgTW9udGggPSAnbW9udGgnLFxyXG4gIERheSA9ICdkYXknLFxyXG4gIEhvdXIgPSAnaG91cicsXHJcbiAgTWludXRlID0gJ21pbnV0ZScsXHJcbiAgU2Vjb25kID0gJ3NlY29uZCcsXHJcbiAgV2VlayA9ICd3ZWVrJyxcclxuICBXZWVrZGF5ID0gJ3dlZWtkYXknLFxyXG4gIE1vbnRoWWVhciA9ICdtb250aC15ZWFyJyxcclxuICBNZHkgPSAnbWR5JyxcclxuICBFbmQgPSAnZW5kJyxcclxuICBUcnVuY1llYXIgPSAndHJ1bmMteWVhcicsXHJcbiAgVHJ1bmNRdHIgPSAndHJ1bmMtcXRyJyxcclxuICBUcnVuY01vbnRoID0gJ3RydW5jLW1vbnRoJyxcclxuICBUcnVuY1dlZWsgPSAndHJ1bmMtd2VlaycsXHJcbiAgVHJ1bmNEYXkgPSAndHJ1bmMtZGF5JyxcclxuICBUcnVuY0hvdXIgPSAndHJ1bmMtaG91cicsXHJcbiAgVHJ1bmNNaW51dGUgPSAndHJ1bmMtbWludXRlJyxcclxuICBUcnVuY1NlY29uZCA9ICd0cnVuYy1zZWNvbmQnLFxyXG4gIFF1YXJ0MSA9ICdxdWFydDEnLFxyXG4gIFF1YXJ0MyA9ICdxdWFydDMnLFxyXG4gIFNrZXduZXNzID0gJ3NrZXduZXNzJyxcclxuICBLdXJ0b3NpcyA9ICdrdXJ0b3NpcycsXHJcbiAgSW5PdXQgPSAnaW4tb3V0JyxcclxuICBVc2VyID0gJ3VzZXInXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEZpZWxkUm9sZVR5cGUge1xyXG4gIERpbWVuc2lvbiA9ICdkaW1lbnNpb24nLFxyXG4gIE1lYXN1cmUgPSAnbWVhc3VyZScsXHJcbiAgVW5rbm93biA9ICd1bmtub3duJ1xyXG59XHJcblxyXG4vKipcclxuICogIFRoZSBkaWZmZXJlbnQgdXBkYXRlIHR5cGVzIGZvciBhcHBseWluZyBmaWx0ZXIuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBGaWx0ZXJVcGRhdGVUeXBlIHtcclxuICBBZGQgPSAnYWRkJyxcclxuICBBbGwgPSAnYWxsJyxcclxuICBSZXBsYWNlID0gJ3JlcGxhY2UnLFxyXG4gIFJlbW92ZSA9ICdyZW1vdmUnXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNoZWV0VHlwZSB7XHJcbiAgRGFzaGJvYXJkID0gJ2Rhc2hib2FyZCcsXHJcbiAgU3RvcnkgPSAnc3RvcnknLFxyXG4gIFdvcmtzaGVldCA9ICd3b3Jrc2hlZXQnXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIERvbWFpblJlc3RyaWN0aW9uVHlwZSB7XHJcbiAgQWxsID0gJ2FsbCcsXHJcbiAgTGlzdCA9ICdsaXN0JyxcclxuICBSYW5nZSA9ICdyYW5nZSdcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRGF0ZVN0ZXBQZXJpb2Qge1xyXG4gIFllYXJzID0gJ3llYXJzJyxcclxuICBRdWFydGVycyA9ICdxdWFydGVycycsXHJcbiAgTW9udGhzID0gJ21vbnRocycsXHJcbiAgV2Vla3MgPSAnd2Vla3MnLFxyXG4gIERheXMgPSAnZGF5cycsXHJcbiAgSG91cnMgPSAnaG91cnMnLFxyXG4gIE1pbnV0ZXMgPSAnbWludXRlcycsXHJcbiAgU2Vjb25kcyA9ICdzZWNvbmRzJ1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIG9wdGlvbiBmb3Igc3BlY2lmeWluZyB3aGljaCB2YWx1ZXMgdG8gaW5jbHVkZSBmb3IgZmlsdGVyaW5nLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gRmlsdGVyTnVsbE9wdGlvbiB7XHJcbiAgTnVsbFZhbHVlcyA9ICdudWxsdmFsdWVzJyxcclxuICBOb25OdWxsVmFsdWVzID0gJ25vbm51bGx2YWx1ZXMnLFxyXG4gIEFsbFZhbHVlcyA9ICdhbGx2YWx1ZXMnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgdHlwZSBvZiBmaWx0ZXIgZG9tYWluXHJcbiAqL1xyXG5leHBvcnQgZW51bSBGaWx0ZXJEb21haW5UeXBlIHtcclxuICBSZWxldmFudCA9ICdyZWxldmFudCcsXHJcbiAgRGF0YWJhc2UgPSAnZGF0YWJhc2UnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnRlcm5hbCBlbnVtIGZvciBzcGVjaWZ5aW5nIHRoZSBzZWxlY3Rpb24gdHlwZSBmb3Igc2VsZWN0IG1hcmtzIGFwaS5cclxuICovXHJcbmV4cG9ydCBlbnVtIFNlbGVjdGlvblVwZGF0ZVR5cGUge1xyXG4gIFJlcGxhY2UgPSAnc2VsZWN0LXJlcGxhY2UnLFxyXG4gIEFkZCA9ICdzZWxlY3QtYWRkJyxcclxuICBSZW1vdmUgPSAnc2VsZWN0LXJlbW92ZSdcclxufVxyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGVudW0gZm9yIHNwZWNpZnlpbmcgdGhlIGluY2x1ZGVkIHZhbHVlcyB0eXBlIGZvciByYW5nZSBzZWxlY3Rpb24uXHJcbiAqL1xyXG5leHBvcnQgZW51bSBRdWFudGl0YXRpdmVJbmNsdWRlZFZhbHVlcyB7XHJcbiAgSW5jbHVkZU51bGwgPSAnaW5jbHVkZS1udWxsJyxcclxuICBJbmNsdWRlTm9uTnVsbCA9ICdpbmNsdWRlLW5vbi1udWxsJyxcclxuICBJbmNsdWRlQWxsID0gJ2luY2x1ZGUtYWxsJ1xyXG59XHJcblxyXG4vKipcclxuICogVHlwZSBvZiBtYXJrIGZvciBhIGdpdmVuIG1hcmtzIGNhcmQgaW4gYSB2aXouXHJcbiAqL1xyXG5leHBvcnQgZW51bSBNYXJrVHlwZSB7XHJcbiAgICBCYXIgPSAnYmFyJyxcclxuICAgIExpbmUgPSAnbGluZScsXHJcbiAgICBBcmVhID0gJ2FyZWEnLFxyXG4gICAgU3F1YXJlID0gJ3NxdWFyZScsXHJcbiAgICBDaXJjbGUgPSAnY2lyY2xlJyxcclxuICAgIFNoYXBlID0gJ3NoYXBlJyxcclxuICAgIFRleHQgPSAndGV4dCcsXHJcbiAgICBNYXAgPSAnbWFwJyxcclxuICAgIFBpZSA9ICdwaWUnLFxyXG4gICAgR2FudHRCYXIgPSAnZ2FudHQtYmFyJyxcclxuICAgIFBvbHlnb24gPSAncG9seWdvbicsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnRlcm5hbCBlbnVtIGZvciBzcGVjaWZ5aW5nIHRoZSB0eXBlIG9mIGZpbHRlclxyXG4gKi9cclxuZXhwb3J0IGVudW0gRmlsdGVyVHlwZSB7XHJcbiAgQ2F0ZWdvcmljYWwgPSAnY2F0ZWdvcmljYWwnLFxyXG4gIFJhbmdlID0gJ3JhbmdlJyxcclxuICBSZWxhdGl2ZURhdGUgPSAncmVsYXRpdmVEYXRlJyxcclxuICBIaWVyYXJjaGljYWwgPSAnaGllcmFyY2hpY2FsJ1xyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJuYWwgZW51bSBmb3Igc3BlY2lmeWluZyB0aGUgRGF0ZVJhbmdlVHlwZSBvZiBhIHJlbGF0aXZlIGRhdGUgZmlsdGVyXHJcbiAqL1xyXG5leHBvcnQgZW51bSBEYXRlUmFuZ2VUeXBlIHtcclxuICAvKipcclxuICAgKiBSZWZlcnMgdG8gdGhlIGxhc3QgZGF5LCB3ZWVrLCBtb250aCwgZXRjLiBvZiB0aGUgZGF0ZSBwZXJpb2QuXHJcbiAgICovXHJcbiAgTGFzdCA9ICdsYXN0JyxcclxuICAvKipcclxuICAgKiBSZWZlcnMgdG8gdGhlIGxhc3QgTiBkYXlzLCB3ZWVrcywgbW9udGhzLCBldGMuIG9mIHRoZSBkYXRlIHBlcmlvZC5cclxuICAgKi9cclxuICBMYXN0TiA9ICdsYXN0TicsXHJcbiAgLyoqXHJcbiAgICogUmVmZXJzIHRvIHRoZSBuZXh0IGRheSwgd2VlaywgbW9udGgsIGV0Yy4gb2YgdGhlIGRhdGUgcGVyaW9kLlxyXG4gICAqL1xyXG4gIE5leHQgPSAnbmV4dCcsXHJcbiAgLyoqXHJcbiAgICogUmVmZXJzIHRvIHRoZSBuZXh0IE4gZGF5cywgd2Vla3MsIG1vbnRocywgZXRjLiBvZiB0aGUgZGF0ZSBwZXJpb2QuXHJcbiAgICovXHJcbiAgTmV4dE4gPSAnbmV4dE4nLFxyXG4gIC8qKlxyXG4gICAqIFJlZmVycyB0byB0aGUgY3VycmVudCBkYXksIHdlZWssIG1vbnRoLCBldGMuIG9mIHRoZSBkYXRlIHBlcmlvZC5cclxuICAgKi9cclxuICBDdXJyZW50ID0gJ2N1cnJlbnQnLFxyXG4gIC8qKlxyXG4gICAqIFJlZmVycyB0byBldmVyeXRoaW5nIHVwIHRvIGFuZCBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgZGF5LCB3ZWVrLCBtb250aCwgZXRjLiBvZiB0aGUgZGF0ZSBwZXJpb2QuXHJcbiAgICovXHJcbiAgVG9EYXRlID0gJ3RvRGF0ZSdcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLWludGVybmFsLWNvbnRyYWN0L3NyYy9pbnRlcmZhY2UvRW51bXMudHNcbiAqKi8iLCJpbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4vTW9kZWxzJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uSWQgfSBmcm9tICcuL05vdGlmaWNhdGlvbnMnO1xyXG5pbXBvcnQgeyBWZXJiSWQgfSBmcm9tICcuL1ZlcmJzJztcclxuaW1wb3J0IHsgVmVyc2lvbk51bWJlciB9IGZyb20gJy4vVmVyc2lvbk51bWJlcic7XHJcblxyXG5leHBvcnQgdHlwZSBOb3RpZmljYXRpb25IYW5kbGVyID0gKG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBFeGVjdXRlUGFyYW1ldGVycyB7XHJcbiAgW2tleTogc3RyaW5nXTogTW9kZWw7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXhlY3V0ZVJlc3BvbnNlIHtcclxuICByZXN1bHQ6IE1vZGVsO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvbiB7XHJcbiAgbm90aWZpY2F0aW9uSWQ6IE5vdGlmaWNhdGlvbklkO1xyXG4gIGRhdGE6IE1vZGVsO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsQXBpRGlzcGF0Y2hlciB7XHJcbiAgc2V0VmVyc2lvbk51bWJlcih2ZXJzaW9uTnVtYmVyOiBWZXJzaW9uTnVtYmVyKTogdm9pZDtcclxuICBleGVjdXRlKHZlcmI6IFZlcmJJZCwgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMpOiBQcm9taXNlPEV4ZWN1dGVSZXNwb25zZT47XHJcbiAgcmVnaXN0ZXJOb3RpZmljYXRpb25IYW5kbGVyKGhhbmRsZXI6IE5vdGlmaWNhdGlvbkhhbmRsZXIpOiB2b2lkO1xyXG4gIHVucmVnaXN0ZXJOb3RpZmljYXRpb25IYW5kbGVyKGhhbmRsZXI6IE5vdGlmaWNhdGlvbkhhbmRsZXIpOiB2b2lkO1xyXG59XHJcblxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgaW50ZXJmYWNlIFdpbmRvdyB7IF9fdGFibGVhdURlc2t0b3BEaXNwYXRjaGVyOiBQcm9taXNlPEludGVybmFsQXBpRGlzcGF0Y2hlcj47IH1cclxufVxyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBJbnRlcm5hbEFwaURpc3BhdGNoZXJIb2xkZXIge1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXREZXNrdG9wRGlzcGF0Y2hlclByb21pc2UoKTogUHJvbWlzZTxJbnRlcm5hbEFwaURpc3BhdGNoZXI+IHtcclxuICAgIHJldHVybiB3aW5kb3cuX190YWJsZWF1RGVza3RvcERpc3BhdGNoZXI7XHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gaGFzRGVza3RvcEFwaURpc3BhdGNoZXJQcm9taXNlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhSW50ZXJuYWxBcGlEaXNwYXRjaGVySG9sZGVyLmdldERlc2t0b3BEaXNwYXRjaGVyUHJvbWlzZSgpO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHNldERlc2t0b3BEaXNwYXRjaGVyUHJvbWlzZShkaXNwYXRjaGVyOiBQcm9taXNlPEludGVybmFsQXBpRGlzcGF0Y2hlcj4pOiB2b2lkIHtcclxuICAgIHdpbmRvdy5fX3RhYmxlYXVEZXNrdG9wRGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktaW50ZXJuYWwtY29udHJhY3Qvc3JjL2ludGVyZmFjZS9JbnRlcm5hbEFwaURpc3BhdGNoZXIudHNcbiAqKi8iLCJleHBvcnQgZW51bSBOb3RpZmljYXRpb25JZCB7XHJcbiAgU2VsZWN0ZWRNYXJrc0NoYW5nZWQgPSAnc2VsZWN0ZWQtbWFya3MtY2hhbmdlZCcsXHJcbiAgUGFyYW1ldGVyQ2hhbmdlZCA9ICdwYXJhbWV0ZXItY2hhbmdlZCcsXHJcbiAgRmlsdGVyQ2hhbmdlZCA9ICdmaWx0ZXItY2hhbmdlZCcsXHJcbiAgVUlNZXNzYWdlID0gJ3VpLW1lc3NhZ2UnLFxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktaW50ZXJuYWwtY29udHJhY3Qvc3JjL2ludGVyZmFjZS9Ob3RpZmljYXRpb25zLnRzXG4gKiovIiwiZXhwb3J0IGVudW0gUGFyYW1ldGVySWQge1xyXG4gIEV4dGVuc2lvbkxvY2F0b3IgPSAnZXh0ZW5zaW9uLWxvY2F0b3InLFxyXG4gIEV4dGVuc2lvbkJvb3RzdHJhcEluZm8gPSAnZXh0ZW5zaW9uLWJvb3RzdHJhcC1pbmZvJyxcclxuICBFeHRlbnNpb25TZXR0aW5nc0luZm8gPSAnZXh0ZW5zaW9uLXNldHRpbmdzLWluZm8nLFxyXG4gIFZpc3VhbElkID0gJ3Zpc3VhbC1pZCcsXHJcbiAgU2hlZXRQYXRoID0gJ3NoZWV0LXBhdGgnLFxyXG4gIElnbm9yZUFsaWFzZXMgPSAnaWdub3JlLWFsaWFzZXMnLFxyXG4gIElnbm9yZVNlbGVjdGlvbiA9ICdpZ25vcmUtc2VsZWN0aW9uJyxcclxuICBJbmNsdWRlQWxsQ29sdW1ucyA9ICdpbmNsdWRlLWFsbC1jb2x1bW5zJyxcclxuICBNYXhSb3dzID0gJ21heC1yb3dzJyxcclxuICBVbmRlcmx5aW5nRGF0YVRhYmxlID0gJ3VuZGVybHlpbmctZGF0YS10YWJsZScsXHJcbiAgVW5kZXJseWluZ1N1bW1hcnlEYXRhVGFibGUgPSAndW5kZXJseWluZy1zdW1tYXJ5LWRhdGEtdGFibGUnLFxyXG4gIERhdGFTb3VyY2VEYXRhVGFibGUgPSAnZGF0YS1zb3VyY2UtZGF0YS10YWJsZScsXHJcbiAgU2V0dGluZ3NWYWx1ZXMgPSAnc2V0dGluZ3MtdmFsdWVzJyxcclxuICBTZWxlY3RlZERhdGEgPSAnc2VsZWN0ZWQtZGF0YScsXHJcbiAgSGlnaGxpZ2h0ZWREYXRhID0gJ2hpZ2hsaWdodGVkLWRhdGEnLFxyXG5cclxuICAgLy8gRmlsdGVyIFBhcmFtc1xyXG4gIEZpZWxkTmFtZSA9ICdmaWVsZC1uYW1lJyxcclxuICBGaWx0ZXJWYWx1ZXMgPSAnZmlsdGVyLXZhbHVlcycsXHJcbiAgRmlsdGVyVXBkYXRlVHlwZSA9ICdmaWx0ZXItdXBkYXRlLXR5cGUnLFxyXG4gIElzRXhjbHVkZU1vZGUgPSAnaXMtZXhjbHVkZScsXHJcbiAgRmlsdGVyUmFuZ2VNaW4gPSAnZmlsdGVyLXJhbmdlLW1pbicsXHJcbiAgRmlsdGVyUmFuZ2VNYXggPSAnZmlsdGVyLXJhbmdlLW1heCcsXHJcbiAgRmlsdGVyUmFuZ2VOdWxsT3B0aW9uID0gJ2ZpbHRlci1yYW5nZS1udWxsLW9wdGlvbicsXHJcbiAgV29ya3NoZWV0RmlsdGVycyA9ICd3b3Jrc2hlZXQtZmlsdGVycycsXHJcbiAgRmllbGRJZCA9ICdmaWVsZC1pZCcsXHJcbiAgRG9tYWluVHlwZSA9ICdkb21haW4tdHlwZScsXHJcbiAgQ2F0ZWdvcmljYWxEb21haW4gPSAnY2F0ZWdvcmljYWwtZG9tYWluJyxcclxuICBRdWFudGl0YXRpdmVEb21haW4gPSAncXVhbnRpdGF0aXZlLWRtYWluJyxcclxuXHJcbiAgV29ya3NoZWV0TmFtZSA9ICd3b3Jrc2hlZXQtbmFtZScsXHJcbiAgRGFzaGJvYXJkTmFtZSA9ICdkYXNoYm9hcmQnLFxyXG5cclxuICBQYXJhbWV0ZXJJbmZvID0gJ3BhcmFtZXRlci1pbmZvJyxcclxuICBQYXJhbWV0ZXJJbmZvcyA9ICdwYXJhbWV0ZXItaW5mb3MnLFxyXG4gIFBhcmFtZXRlckNhcHRpb24gPSAncGFyZW1ldGVyLWNhcHRpb24nLFxyXG4gIFBhcmFtZXRlckZpZWxkTmFtZSA9ICdwYXJhbWV0ZXItZmllbGQtbmFtZScsXHJcbiAgUGFyYW1ldGVyVmFsdWUgPSAncGFyYW1ldGVyLXZhbHVlJyxcclxuICBTZWxlY3Rpb24gPSAnc2VsZWN0aW9uJyxcclxuICBTZWxlY3Rpb25VcGRhdGVUeXBlID0gJ3NlbGVjdGlvblVwZGF0ZVR5cGUnLFxyXG4gIEhpZXJWYWxTZWxlY3Rpb25Nb2RlbHMgPSAnaGllcmFyY2hpY2FsVmFsdWVTZWxlY3Rpb25Nb2RlbHMnLFxyXG4gIFF1YW50UmFuZ2VTZWxlY3Rpb25Nb2RlbHMgPSAncXVhbnRhdGl2ZVJhbmdlU2VsZWN0aW9uTW9kZWxzJyxcclxuICBEaW1WYWxTZWxlY3Rpb25Nb2RlbHMgPSAnZGltZW5zaW9uVmFsdWVTZWxlY3Rpb25Nb2RlbHMnLFxyXG5cclxuICBEYXRhU291cmNlSWQgPSAnZGF0YS1zb3VyY2UtaWQnLFxyXG4gIERhdGFTY2hlbWEgPSAnZGF0YS1zY2hlbWEnLFxyXG4gIERhdGFTb3VyY2VOYW1lID0gJ2RhdGEtc291cmNlLW5hbWUnLFxyXG4gIENvbHVtbnNUb0luY2x1ZGUgPSAnY29sdW1ucy10by1pbmNsdWRlJyxcclxuICBKb2luRGVzY3JpcHRpb24gPSAnam9pbi1kZXNjcmlwdGlvbicsXHJcblxyXG4gIERpYWxvZ1VybCA9ICdkaWFsb2ctdXJsJyxcclxuICBEaWFsb2dNZXNzYWdlID0gJ2RpYWxvZy1tZXNzYWdlJyxcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLWludGVybmFsLWNvbnRyYWN0L3NyYy9pbnRlcmZhY2UvUGFyYW1ldGVycy50c1xuICoqLyIsIi8vIERlY2xhcmUgdGhpcyBrZXkgdHlwZSBhbmQgZXhwb3J0IHRoZSBOb3RpZmljYXRpb25JZCB0byBtYWtlIHRoaXMgYmVoYXZlIGxpa2UgYSBzdHJpbmcgZW51bVxyXG5leHBvcnQgZW51bSBWZXJiSWQge1xyXG4gIEFwcGx5Q2F0ZWdvcmljYWxGaWx0ZXIgPSAnY2F0ZWdvcmljYWwtZmlsdGVyJyxcclxuICBBcHBseVJhbmdlRmlsdGVyID0gJ3JhbmdlLWZpbHRlcicsXHJcbiAgQ2xlYXJGaWx0ZXIgPSAnY2xlYXItZmlsdGVyJyxcclxuICBJbml0aWFsaXplRXh0ZW5zaW9uID0gJ2luaXRpYWxpemUtZXh0ZW5zaW9uJyxcclxuICBHZXREYXRhU3VtbWFyeURhdGEgPSAnZ2V0LXN1bW1hcnktZGF0YScsXHJcbiAgR2V0VW5kZXJseWluZ0RhdGEgPSAnZ2V0LXVuZGVybHlpbmctZGF0YScsXHJcbiAgR2V0RGF0YVNvdXJjZURhdGEgPSAnZ2V0LWRhdGFzb3VyY2UtZGF0YScsXHJcbiAgU2F2ZUV4dGVuc2lvblNldHRpbmdzID0gJ3NhdmUtZXh0ZW5zaW9uLXNldHRpbmdzJyxcclxuICBHZXRTZWxlY3RlZE1hcmtzID0gJ2dldC1zZWxlY3RlZC1tYXJrcycsXHJcbiAgR2V0SGlnaGxpZ2h0ZWRNYXJrcyA9ICdnZXQtaGlnaGxpZ2h0ZWQtbWFya3MnLFxyXG4gIEdldFBhcmFtZXRlcnNGb3JTaGVldCA9ICdnZXQtcGFyYW1ldGVycy1mb3Itc2hlZXQnLFxyXG4gIEZpbmRQYXJhbWV0ZXIgPSAnZmluZC1wYXJhbWV0ZXInLFxyXG4gIENoYW5nZVBhcmFtZXRlclZhbHVlID0gJ2NoYW5nZS1wYXJhbWV0ZXItdmFsdWUnLFxyXG4gIENsZWFyU2VsZWN0ZWRNYXJrcyA9ICdjbGVhci1zZWxlY3RlZC1tYXJrcycsXHJcbiAgU2VsZWN0QnlWYWx1ZSA9ICdzZWxlY3QtYnktdmFsdWUnLFxyXG4gIEdldERhdGFTb3VyY2VzID0gJ2dldC1kYXRhLXNvdXJjZXMnLFxyXG4gIFJlZnJlc2hEYXRhU291cmNlID0gJ3JlZnJlc2gtZGF0YS1zb3VyY2UnLFxyXG4gIEdldEZpbHRlcnMgPSAnZ2V0LWZpbHRlcnMnLFxyXG4gIEdldENhdGVnb3JpY2FsRG9tYWluID0gJ2dldC1jYXRlZ29yaWNhbC1kb21haW4nLFxyXG4gIEdldFJhbmdlRG9tYWluID0gJ2dldC1yYW5nZS1kb21haW4nLFxyXG4gIEdldEpvaW5EZXNjcmlwdGlvbiA9ICdnZXQtam9pbi1kZXNjcmlwdGlvbicsXHJcbiAgRGlzcGxheURpYWxvZyA9ICdkaXNwbGF5LWRpYWxvZycsXHJcbiAgQ2xvc2VEaWFsb2cgPSAnY2xvc2UtZGlhbG9nJyxcclxuICBTZW5kTWVzc2FnZSA9ICdzZW5kLW1lc3NhZ2UnLFxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktaW50ZXJuYWwtY29udHJhY3Qvc3JjL2ludGVyZmFjZS9WZXJicy50c1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIHlvdXIgbWFpbi4gVGhpcyBpcyB3aGVyZSB5b3UgcmUtZXhwb3J0IGV2ZXJ5dGhpbmcgeW91IHdhbnQgdG8gYmUgcHVibGljbHkgYXZhaWxhYmxlLlxyXG4gKlxyXG4gKiBUaGUgYnVpbGQgZW5mb3JjZXMgdGhhdCB0aGUgZmlsZSBoYXMgdGhlIHNhbWUgbmFtZSBhcyB0aGUgZ2xvYmFsIHZhcmlhYmxlIHRoYXQgaXMgZXhwb3J0ZWQuXHJcbiAqL1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9FdmVudExpc3RlbmVyTWFuYWdlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vUGFyYW1ldGVyJztcclxuZXhwb3J0IHsgUG9pbnQgfSBmcm9tICcuL1BvaW50JztcclxuZXhwb3J0ICogZnJvbSAnLi9TaW5nbGVFdmVudE1hbmFnZXInO1xyXG5leHBvcnQgeyBTaXplIH0gZnJvbSAnLi9TaXplJztcclxuZXhwb3J0ICogZnJvbSAnLi9Nb2RlbHMvR2V0RGF0YU1vZGVscyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vRXhjZXB0aW9ucy9UYWJsZWF1RXhjZXB0aW9ucyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRzL0ZpbHRlckNoYW5nZWRFdmVudCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRzL01hcmtzU2VsZWN0ZWRFdmVudCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRzL1RhYmxlYXVFdmVudCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRzL1RhYmxlYXVTaGVldEV2ZW50JztcclxuZXhwb3J0ICogZnJvbSAnLi9FdmVudHMvVGFibGVhdVdvcmtzaGVldEV2ZW50JztcclxuZXhwb3J0ICogZnJvbSAnLi9JbnRlcm5hbC9TaW5nbGVFdmVudE1hbmFnZXJJbXBsJztcclxuZXhwb3J0ICogZnJvbSAnLi9TZXJ2aWNlcy9EYXRhU291cmNlU2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vU2VydmljZXMvR2V0RGF0YVNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL1NlcnZpY2VzL0ZpbHRlclNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL1NlcnZpY2VzL05vdGlmaWNhdGlvblNlcnZpY2UnO1xyXG5leHBvcnQgeyBQYXJhbWV0ZXJzU2VydmljZSB9IGZyb20gJy4vU2VydmljZXMvUGFyYW1ldGVyc1NlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL1NlcnZpY2VzL1JlZ2lzdGVyQWxsU2hhcmVkU2VydmljZXMnO1xyXG5leHBvcnQgKiBmcm9tICcuL1NlcnZpY2VzL1NlbGVjdGlvblNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL1NlcnZpY2VzL1NlcnZpY2VSZWdpc3RyeSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vRW51bU1hcHBpbmdzL0ludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vQ3Jvc3NGcmFtZS9Dcm9zc0ZyYW1lQm9vdHN0cmFwJztcclxuZXhwb3J0ICogZnJvbSAnLi9WZXJzaW9uTnVtYmVyJztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0FwaVNoYXJlZC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgU2luZ2xlRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi9TaW5nbGVFdmVudE1hbmFnZXInO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGRlc2lnbmVkIHRvIHJlZ2lzdGVyIGFuZCB1bnJlZ2lzdGVyIGhhbmRsZXJzIGZyb20gYSB1c2VyLiBPbmx5IHRob3NlIGV2ZW50c1xyXG4gKiB3aGljaCBhcmUgYWRkZWQgdmlhIEFkZE5ld0V2ZW50VHlwZSB3aWxsIGJlIHN1cHBvcnRlZCBieSB0aGlzIGluc3RhbmNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRMaXN0ZW5lck1hbmFnZXIgaW1wbGVtZW50cyAgQ29udHJhY3QuRXZlbnRMaXN0ZW5lck1hbmFnZXIge1xyXG4gIHByaXZhdGUgc3RhdGljIFVOU1VQUE9SVEVEX0VWRU5UOiBzdHJpbmcgPSAnVW5zdXBwb3J0ZWQgZXZlbnQgdHlwZSA6ICUxJztcclxuICBwcml2YXRlIF9ldmVudExpc3RlbmVyTWFuYWdlcnM6IHsgW3RhYmxlYXVFdmVudFR5cGU6IHN0cmluZ106IFNpbmdsZUV2ZW50TWFuYWdlcjsgfTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fZXZlbnRMaXN0ZW5lck1hbmFnZXJzID0ge307XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGU6IENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogQ29udHJhY3QuVGFibGVhdUV2ZW50SGFuZGxlckZuKTogQ29udHJhY3QuVGFibGVhdUV2ZW50VW5yZWdpc3RlckZuIHtcclxuICAgIGlmICghdGhpcy5fZXZlbnRMaXN0ZW5lck1hbmFnZXJzLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5lcnJvcihFdmVudExpc3RlbmVyTWFuYWdlci5VTlNVUFBPUlRFRF9FVkVOVCwgW2V2ZW50VHlwZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9ldmVudExpc3RlbmVyTWFuYWdlcnNbZXZlbnRUeXBlXS5hZGRFdmVudExpc3RlbmVyKGhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlOiBDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlLCBoYW5kbGVyOiBDb250cmFjdC5UYWJsZWF1RXZlbnRIYW5kbGVyRm4pOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5fZXZlbnRMaXN0ZW5lck1hbmFnZXJzLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5lcnJvcihFdmVudExpc3RlbmVyTWFuYWdlci5VTlNVUFBPUlRFRF9FVkVOVCwgW2V2ZW50VHlwZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9ldmVudExpc3RlbmVyTWFuYWdlcnNbZXZlbnRUeXBlXS5yZW1vdmVFdmVudExpc3RlbmVyKGhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGFkZE5ld0V2ZW50VHlwZShldmVudE1hbmFnZXI6IFNpbmdsZUV2ZW50TWFuYWdlcik6IHZvaWQge1xyXG4gICAgdGhpcy5fZXZlbnRMaXN0ZW5lck1hbmFnZXJzW2V2ZW50TWFuYWdlci5ldmVudFR5cGVdID0gZXZlbnRNYW5hZ2VyO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRXZlbnRMaXN0ZW5lck1hbmFnZXIudHNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyB5b3VyIG1haW4uIFRoaXMgaXMgd2hlcmUgeW91IHJlLWV4cG9ydCBldmVyeXRoaW5nIHlvdSB3YW50IHRvIGJlIHB1YmxpY2x5IGF2YWlsYWJsZS5cclxuICpcclxuICogVGhlIGJ1aWxkIGVuZm9yY2VzIHRoYXQgdGhlIGZpbGUgaGFzIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGdsb2JhbCB2YXJpYWJsZSB0aGF0IGlzIGV4cG9ydGVkLlxyXG4gKi9cclxuXHJcbmV4cG9ydCB7IEVudW1Db252ZXJ0ZXIgfSBmcm9tICcuL0VudW1Db252ZXJ0ZXInO1xyXG5leHBvcnQgeyBQYXJhbSB9IGZyb20gJy4vUGFyYW0nO1xyXG5leHBvcnQgeyBUYWJsZWF1RXhjZXB0aW9uIH0gZnJvbSAnLi9UYWJsZWF1RXhjZXB0aW9uJztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS11dGlscy9zcmMvQXBpVXRpbHMudHNcbiAqKi8iLCJpbXBvcnQgeyBUYWJsZWF1RXhjZXB0aW9uIH0gZnJvbSAnLi9UYWJsZWF1RXhjZXB0aW9uJztcclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgY29udmVydHMgZnJvbSBhIHNvdXJjZSBlbnVtIHZhbHVlIHRvIGRlc3RpbmF0aW9uIGVudW1cclxuICogdmFsdWUgZ2l2ZW4gYSBtYXBwaW5nIGZyb20gc291cmNlIHRvIGRlc3RpbmF0aW9uIHdoZW4gY29uc3RydWN0ZWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW51bUNvbnZlcnRlcjxUU291cmNlVHlwZSBleHRlbmRzIHN0cmluZywgVERlc3RpbmF0aW9uVHlwZT4ge1xyXG4gIHByaXZhdGUgc3RhdGljIE1BUFBJTkdfTk9UX0ZPVU5EOiBzdHJpbmcgPSAnTWFwcGluZyBub3QgZm91bmQgZm9yICUxJztcclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9tYXBwaW5nczogeyBbZW51bVZhbDogc3RyaW5nXTogVERlc3RpbmF0aW9uVHlwZTsgfSxcclxuICAgIHByaXZhdGUgX2RlZmF1bHRWYWw/OiBURGVzdGluYXRpb25UeXBlKSB7IH1cclxuXHJcbiAgcHVibGljIGNvbnZlcnQoZW51bVZhbDogVFNvdXJjZVR5cGUsIHRocm93SWZNaXNzaW5nPzogYm9vbGVhbik6IFREZXN0aW5hdGlvblR5cGUge1xyXG4gICAgaWYgKHRoaXMuX21hcHBpbmdzLmhhc093blByb3BlcnR5KGVudW1WYWwpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9tYXBwaW5nc1tlbnVtVmFsIGFzIHN0cmluZ107XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlZmF1bHRWYWwgIT09IHVuZGVmaW5lZCAmJiAhdGhyb3dJZk1pc3NpbmcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRWYWw7XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5lcnJvcihFbnVtQ29udmVydGVyLk1BUFBJTkdfTk9UX0ZPVU5ELCBbZW51bVZhbF0pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXV0aWxzL3NyYy9FbnVtQ29udmVydGVyLnRzXG4gKiovIiwiZXhwb3J0IGNsYXNzIFRhYmxlYXVFeGNlcHRpb24ge1xyXG4gIHB1YmxpYyBzdGF0aWMgQVBJX05PVF9JTVBMRU1FTlRFRDogc3RyaW5nID0gJyUxIEFQSSBub3QgeWV0IGltcGxlbWVudGVkLic7XHJcbiAgcHVibGljIHN0YXRpYyBVTkRFRklORUQ6IHN0cmluZyA9ICclMSBpcyB1bmRlZmluZWQuJztcclxuICBwdWJsaWMgc3RhdGljIElOVkFMSURfUEFSQU1FVEVSX1ZBTFVFOiBzdHJpbmcgPSAnSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyOiAlMS4gJTInO1xyXG4gIHB1YmxpYyBzdGF0aWMgSU5WQUxJRF9QQVJBTUVURVJfVFlQRTogc3RyaW5nID0gJ0ludmFsaWQgdHlwZSBmb3IgcGFyYW1ldGVyOiAlMS4gJTInO1xyXG4gIHB1YmxpYyBzdGF0aWMgTUlTU0lOR19QQVJBTUVURVI6IHN0cmluZyA9ICdNaXNzaW5nIFBhcmFtZXRlcjogJTEuJztcclxuICBwdWJsaWMgc3RhdGljIFVOS05PV05fRVJST1I6IHN0cmluZyA9ICdVbmtub3duIGVycm9yLic7XHJcbiAgcHVibGljIHN0YXRpYyBJTlRFUk5BTF9FUlJPUjogc3RyaW5nID0gJ0ludGVybmFsIGVycm9yOiAlMS4nO1xyXG4gIHB1YmxpYyBzdGF0aWMgSU5WQUxJRDogc3RyaW5nID0gJ0ludmFsaWQ6ICUxLiAlMic7XHJcbiAgcHVibGljIHN0YXRpYyBJU19OVUxMOiBzdHJpbmcgPSAnJTEgaXMgbnVsbC4nO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGFwaU5vdEltcGxlbWVudGVkIChwYXJhbXM6IEFycmF5PHN0cmluZz4pOiBFcnJvciB7XHJcbiAgICBsZXQgbWVzc2FnZTogc3RyaW5nID0gVGFibGVhdUV4Y2VwdGlvbi5mb3JtYXQoVGFibGVhdUV4Y2VwdGlvbi5BUElfTk9UX0lNUExFTUVOVEVELCBwYXJhbXMpO1xyXG4gICAgcmV0dXJuIG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaXNVbmRlZmluZWQgKHBhcmFtczogQXJyYXk8c3RyaW5nPik6IEVycm9yIHtcclxuICAgIGxldCBtZXNzYWdlOiBzdHJpbmcgPSBUYWJsZWF1RXhjZXB0aW9uLmZvcm1hdChUYWJsZWF1RXhjZXB0aW9uLlVOREVGSU5FRCwgcGFyYW1zKTtcclxuICAgIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGlzTnVsbCAocGFyYW1zOiBBcnJheTxzdHJpbmc+KTogRXJyb3Ige1xyXG4gICAgbGV0IG1lc3NhZ2U6IHN0cmluZyA9IFRhYmxlYXVFeGNlcHRpb24uZm9ybWF0KFRhYmxlYXVFeGNlcHRpb24uSVNfTlVMTCwgcGFyYW1zKTtcclxuICAgIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGludmFsaWRQYXJhbVZhbHVlIChwYXJhbXM6IEFycmF5PHN0cmluZz4pOiBFcnJvciB7XHJcbiAgICBsZXQgbWVzc2FnZTogc3RyaW5nID0gVGFibGVhdUV4Y2VwdGlvbi5mb3JtYXQoVGFibGVhdUV4Y2VwdGlvbi5JTlZBTElEX1BBUkFNRVRFUl9WQUxVRSwgcGFyYW1zKTtcclxuICAgIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGludmFsaWRQYXJhbVR5cGUgKHBhcmFtczogQXJyYXk8c3RyaW5nPik6IEVycm9yIHtcclxuICAgIGxldCBtZXNzYWdlOiBzdHJpbmcgPSBUYWJsZWF1RXhjZXB0aW9uLmZvcm1hdChUYWJsZWF1RXhjZXB0aW9uLklOVkFMSURfUEFSQU1FVEVSX1RZUEUsIHBhcmFtcyk7XHJcbiAgICByZXR1cm4gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBtaXNzaW5nUGFyYW1ldGVyIChwYXJhbXM6IEFycmF5PHN0cmluZz4pOiBFcnJvciB7XHJcbiAgICBsZXQgbWVzc2FnZTogc3RyaW5nID0gVGFibGVhdUV4Y2VwdGlvbi5mb3JtYXQoVGFibGVhdUV4Y2VwdGlvbi5NSVNTSU5HX1BBUkFNRVRFUiwgcGFyYW1zKTtcclxuICAgIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGludmFsaWQgKHBhcmFtczogQXJyYXk8c3RyaW5nPik6IEVycm9yIHtcclxuICAgIGxldCBtZXNzYWdlOiBzdHJpbmcgPSBUYWJsZWF1RXhjZXB0aW9uLmZvcm1hdChUYWJsZWF1RXhjZXB0aW9uLklOVkFMSUQsIHBhcmFtcyk7XHJcbiAgICByZXR1cm4gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbnRlcm5hbEVycm9yIChwYXJhbXM6IEFycmF5PHN0cmluZz4pOiBFcnJvciB7XHJcbiAgICBsZXQgbWVzc2FnZTogc3RyaW5nID0gVGFibGVhdUV4Y2VwdGlvbi5mb3JtYXQoVGFibGVhdUV4Y2VwdGlvbi5JTlRFUk5BTF9FUlJPUiwgcGFyYW1zKTtcclxuICAgIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGVycm9yIChtZXNzYWdlOiBzdHJpbmcsIHBhcmFtcz86IEFycmF5PHN0cmluZz4pOiBFcnJvciB7XHJcbiAgICBsZXQgcmVzdWx0OiBzdHJpbmc7XHJcbiAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgIHJlc3VsdCA9IFRhYmxlYXVFeGNlcHRpb24uZm9ybWF0KG1lc3NhZ2UsIHBhcmFtcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSBtZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBFcnJvcihyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBmb3JtYXQgKG1lc3NhZ2U6IHN0cmluZywgcGFyYW1zOiBBcnJheTxzdHJpbmc+KTogc3RyaW5nIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBtYXRjaDogc3RyaW5nID0gJyUnICsgKGkgKyAxKTtcclxuICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZShuZXcgUmVnRXhwKG1hdGNoLCAnZycpLCBwYXJhbXNbaV0pO1xyXG4gICAgfVxyXG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZShuZXcgUmVnRXhwKCclWzAtOV0rJywgJ2cnKSwgJycpO1xyXG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UudHJpbSgpO1xyXG4gICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktdXRpbHMvc3JjL1RhYmxlYXVFeGNlcHRpb24udHNcbiAqKi8iLCJpbXBvcnQgeyBUYWJsZWF1RXhjZXB0aW9uIH0gZnJvbSAnLi9UYWJsZWF1RXhjZXB0aW9uJztcclxuZXhwb3J0IGNsYXNzIFBhcmFtIHtcclxuICAvKipcclxuICAgKiBWZXJpZmllcyB0aGF0IGFuIGluY29taW5nIHBhcmFtZXRlciBpcyAndHJ1dGh5JyBhbmQgdGhyb3dzXHJcbiAgICogYW4gZXJyb3IgaWYgaXQncyBub3QuIFRoaXMgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgdmFsdWVcclxuICAgKiBpcyBudWxsLCB1bmRlZmluZWQsIE5hTiwgdGhlIGVtcHR5IHN0cmluZywgMCwgb3IgZmFsc2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYXJndW1lbnRWYWx1ZSB2YWx1ZSB0byB2ZXJpZnlcclxuICAgKiBAcGFyYW0gYXJndW1lbnROYW1lIG5hbWUgb2YgYXJndW1lbnQgdG8gdmVyaWZ5XHJcbiAgICovXHJcbiAgLyp0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cclxuICBwdWJsaWMgc3RhdGljIHZlcmlmeVZhbHVlKGFyZ3VtZW50VmFsdWU6IGFueSwgYXJndW1lbnROYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmICghYXJndW1lbnRWYWx1ZSkge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmludmFsaWRQYXJhbVZhbHVlKFthcmd1bWVudE5hbWVdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZlcmlmaWVzIHRoYXQgYSBzdHJpbmcgaXMgdmFsaWQuICBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIHN0cmluZyBpc1xyXG4gICAqIG51bGwsIHVuZGVmaW5lZCwgb3IgTmFOLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGFyZ3VtZW50VmFsdWUgdmFsdWUgdG8gdmVyaWZ5XHJcbiAgICogQHBhcmFtIGFyZ3VtZW50TmFtZSBuYW1lIG9mIGFyZ3VtZW50IHRvIHZlcmlmeVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgdmVyaWZ5U3RyaW5nKGFyZ3VtZW50VmFsdWU6IHN0cmluZywgYXJndW1lbnROYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmIChhcmd1bWVudFZhbHVlID09PSBudWxsIHx8IGFyZ3VtZW50VmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmludmFsaWRQYXJhbVZhbHVlKFthcmd1bWVudE5hbWVdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZlcmlmaWVzIHRoZSB2YWx1ZSBpcyBwYXJ0IG9mIHRoZSBFbnVtXHJcbiAgICpcclxuICAgKiBTdHJpbmcgZW51bXMgYXJlIHtzdHJpbmcgOiBzdHJpbmd9IGRpY3Rpb25hcmllcyB3aGljaCBhcmUgbm90IHJldmVyc2UgbWFwcGFibGVcclxuICAgKiBUaGlzIGlzIGFuIHVnbHkgd29ya2Fyb3VuZFxyXG4gICAqIEBwYXJhbSB2YWx1ZSB2YWx1ZSB0byB2ZXJpZnlcclxuICAgKiBAcGFyYW0gZW51bVR5cGUgZW51bSB0byB2ZXJpZnkgYWdhaW5zdFxyXG4gICAqL1xyXG4gIC8qIHRzbGludDpkaXNhYmxlOm5vLWFueSAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaXNWYWxpZEVudW1WYWx1ZTxFbnVtVHlwZT4odmFsdWU6IEVudW1UeXBlLCBlbnVtVHlwZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaXNWYWxpZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgT2JqZWN0LmtleXMoZW51bVR5cGUpLmZvckVhY2goKGVudW1LZXkpID0+IHtcclxuICAgICAgaWYgKGVudW1UeXBlW2VudW1LZXldID09PSB2YWx1ZS50b1N0cmluZygpKSB7XHJcbiAgICAgICAgaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgfVxyXG4gIC8qIHRzbGludDplbmFibGU6bm8tYW55ICovXHJcblxyXG4gIC8qKlxyXG4gICAqIHNlcmlhbGl6ZXMgdGhlIGRhdGUgaW50byB0aGUgZm9ybWF0IHRoYXQgdGhlIHNlcnZlciBleHBlY3RzLlxyXG4gICAqIEBwYXJhbSBkYXRlIHRoZSBkYXRlIHRvIHNlcmlhbGl6ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgc2VyaWFsaXplRGF0ZUZvclBsYXRmb3JtKGRhdGU6IERhdGUpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgeWVhcjogbnVtYmVyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xyXG4gICAgY29uc3QgbW9udGg6IG51bWJlciA9IGRhdGUuZ2V0VVRDTW9udGgoKSArIDE7XHJcbiAgICBjb25zdCBkYXk6IG51bWJlciA9IGRhdGUuZ2V0VVRDRGF0ZSgpO1xyXG4gICAgY29uc3QgaGg6IG51bWJlciA9IGRhdGUuZ2V0VVRDSG91cnMoKTtcclxuICAgIGNvbnN0IG1tOiBudW1iZXIgPSBkYXRlLmdldFVUQ01pbnV0ZXMoKTtcclxuICAgIGNvbnN0IHNlYzogbnVtYmVyID0gZGF0ZS5nZXRVVENTZWNvbmRzKCk7XHJcbiAgICByZXR1cm4geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5ICsgJyAnICsgaGggKyAnOicgKyBtbSArICc6JyArIHNlYztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgc2VyaWFsaXplQm9vbGVhbkZvclBsYXRmb3JtKGJvb2w6IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGJvb2wgPyAndHJ1ZScgOiAnZmFsc2UnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBzZXJpYWxpemVOdW1iZXJGb3JQbGF0Zm9ybShudW06IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gbnVtLnRvU3RyaW5nKDEwKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZlcmlmaWVzIHRoZSBwYXJhbXMgbWluIGFuZCBtYXggZm9yIGFwcGx5aW5nIHJhbmdlIGZpbHRlclxyXG4gICAqIEBwYXJhbSBtaW4gcmFuZ2UgbWluXHJcbiAgICogQHBhcmFtIG1heCByYW5nZSBtYXhcclxuICAgKi9cclxuICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgKi9cclxuICBwdWJsaWMgc3RhdGljIHZlcmlmeVJhbmdlUGFyYW1UeXBlKG1pbjogYW55LCBtYXg6IGFueSk6IHZvaWQge1xyXG4gIC8qIHRzbGludDplbmFibGU6bm8tYW55ICovXHJcbiAgICBpZiAoIW1pbiAmJiAhbWF4KSB7XHJcbiAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uaW52YWxpZFBhcmFtVmFsdWUoWydSYW5nZSBwYXJhbWV0ZXJzJywgJ0F0IGxlYXN0IG9uZSBvZiBtaW4gb3IgbWF4IGlzIHJlcXVpcmVkLiddKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIVBhcmFtLmlzVHlwZU51bWJlcihtaW4pICYmICFQYXJhbS5pc1R5cGVEYXRlKG1pbikpIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5pbnZhbGlkUGFyYW1UeXBlKFsnUmFuZ2UgcGFyYW1ldGVycycsICdPbmx5IERhdGUgYW5kIG51bWJlciBhcmUgYWxsb3dlZCBmb3IgcGFyYW1ldGVyIG1pbi4nXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFQYXJhbS5pc1R5cGVOdW1iZXIobWF4KSAmJiAhUGFyYW0uaXNUeXBlRGF0ZShtYXgpKSB7XHJcbiAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uaW52YWxpZFBhcmFtVHlwZShbJ1JhbmdlIHBhcmFtZXRlcnMnLCAnT25seSBEYXRlIGFuZCBudW1iZXIgYXJlIGFsbG93ZWQgZm9yIHBhcmFtZXRlciBtYXguJ10pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YobWluKSAhPT0gdHlwZW9mKG1heCkpIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5pbnZhbGlkUGFyYW1UeXBlKFsnUmFuZ2UgcGFyYW1ldGVycycsICdQYXJhbWV0ZXJzIG1pbiBhbmQgbWF4IHNob3VsZCBiZSBvZiB0aGUgc2FtZSB0eXBlLiddKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZlcmlmaWVzIHRoZSBpbnB1dCBpcyBhIG51bWJlclxyXG4gICAqL1xyXG4gIC8qIHRzbGludDpkaXNhYmxlOm5vLWFueSAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaXNUeXBlTnVtYmVyKGlucHV0OiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlb2YoaW5wdXQpID09PSAnbnVtYmVyJyB8fCBpbnB1dCBpbnN0YW5jZW9mIE51bWJlcjtcclxuICB9XHJcbiAgLyogdHNsaW50OmVuYWJsZTpuby1hbnkgKi9cclxuXHJcbiAgLyoqXHJcbiAgICogVmVyaWZpZXMgdGhlIGlucHV0IGlzIGEgRGF0ZVxyXG4gICAqL1xyXG4gIC8qIHRzbGludDpkaXNhYmxlOm5vLWFueSAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaXNUeXBlRGF0ZShpbnB1dDogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBEYXRlO1xyXG4gIH1cclxuICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLWFueSAqL1xyXG5cclxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55ICovXHJcbiAgcHVibGljIHN0YXRpYyBpc1R5cGVTdHJpbmcoaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZihpbnB1dCkgPT09ICdzdHJpbmcnIHx8IGlucHV0IGluc3RhbmNlb2YgU3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaXNUeXBlQm9vbChpbnB1dDogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHlwZW9mKGlucHV0KSA9PT0gJ2Jvb2xlYW4nIHx8IGlucHV0IGluc3RhbmNlb2YgQm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cclxuICBwdWJsaWMgc3RhdGljIHNlcmlhbGl6ZVBhcmFtdGVyVmFsdWUodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICBpZiAoUGFyYW0uaXNUeXBlTnVtYmVyKHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4gUGFyYW0uc2VyaWFsaXplTnVtYmVyRm9yUGxhdGZvcm0odmFsdWUgYXMgbnVtYmVyKTtcclxuICAgIH0gZWxzZSBpZiAoUGFyYW0uaXNUeXBlRGF0ZSh2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIFBhcmFtLnNlcmlhbGl6ZURhdGVGb3JQbGF0Zm9ybSh2YWx1ZSBhcyBEYXRlKTtcclxuICAgIH0gZWxzZSBpZiAoUGFyYW0uaXNUeXBlQm9vbCh2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIFBhcmFtLnNlcmlhbGl6ZUJvb2xlYW5Gb3JQbGF0Zm9ybSh2YWx1ZSBhcyBib29sZWFuKTtcclxuICAgIH0gZWxzZSBpZiAoUGFyYW0uaXNUeXBlU3RyaW5nKHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmludmFsaWRQYXJhbVZhbHVlKFsndmFsdWUnXSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktdXRpbHMvc3JjL1BhcmFtLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IEV2ZW50TGlzdGVuZXJNYW5hZ2VyIH0gZnJvbSAnLi9FdmVudExpc3RlbmVyTWFuYWdlcic7XHJcbmltcG9ydCB7IFBhcmFtZXRlckltcGwgfSBmcm9tICcuL0ludGVybmFsL1BhcmFtZXRlckltcGwnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBQYXJhbWV0ZXIgY29udHJhY3QuIENhbGxzIGRvd24gdG8gdGhlIGltcGxcclxuICogY2xhc3MgZm9yIGFsbW9zdCBhbGwgb2YgdGhlIHdvcmsgaXQgZG9lcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBQYXJhbWV0ZXIgZXh0ZW5kcyBFdmVudExpc3RlbmVyTWFuYWdlciBpbXBsZW1lbnRzIENvbnRyYWN0LlBhcmFtZXRlciB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1ldGVySW1wbDogUGFyYW1ldGVySW1wbCwgc2hlZXQ6IENvbnRyYWN0LlNoZWV0KSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgb3VyIGV2ZW50IGhhbmRsaW5nIGZvciB0aGlzIGNsYXNzXHJcbiAgICB0aGlzLnBhcmFtZXRlckltcGwuaW5pdGlhbGl6ZUV2ZW50cyhzaGVldCkuZm9yRWFjaChlID0+IHRoaXMuYWRkTmV3RXZlbnRUeXBlKGUpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyYW1ldGVySW1wbC5uYW1lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBjdXJyZW50VmFsdWUoKTogQ29udHJhY3QuRGF0YVZhbHVlIHtcclxuICAgIHJldHVybiB0aGlzLnBhcmFtZXRlckltcGwuY3VycmVudFZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBkYXRhVHlwZSgpOiBDb250cmFjdC5EYXRhVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXJhbWV0ZXJJbXBsLmRhdGFUeXBlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBhbGxvd2FibGVWYWx1ZXMoKTogQ29udHJhY3QuUGFyYW1ldGVyRG9tYWluUmVzdHJpY3Rpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyYW1ldGVySW1wbC5hbGxvd2FibGVWYWx1ZXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXJhbWV0ZXJJbXBsLmlkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5nZVZhbHVlQXN5bmMobmV3VmFsdWU6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBEYXRlKTogUHJvbWlzZTxDb250cmFjdC5EYXRhVmFsdWU+IHtcclxuICAgIHJldHVybiB0aGlzLnBhcmFtZXRlckltcGwuY2hhbmdlVmFsdWVBc3luYyhuZXdWYWx1ZSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9QYXJhbWV0ZXIudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50IGltcGxlbWVudHMgQ29udHJhY3QuUG9pbnQge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF94OiBudW1iZXIsIHByaXZhdGUgX3k6IG51bWJlcikgeyB9XHJcblxyXG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3g7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHkoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl95O1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvUG9pbnQudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpemUgaW1wbGVtZW50cyBDb250cmFjdC5TaXplIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIsIHByaXZhdGUgX3dpZHRoOiBudW1iZXIpIHsgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgd2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl93aWR0aDtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1NpemUudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZSBpbXBsZW1lbnRzIENvbnRyYWN0LkRhdGFUYWJsZSB7XHJcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9kYXRhOiBBcnJheTxBcnJheTxDb250cmFjdC5EYXRhVmFsdWU+PixcclxuICAgIHByaXZhdGUgX2NvbHVtbnM6IEFycmF5PENvbnRyYWN0LkNvbHVtbj4sXHJcbiAgICBwcml2YXRlIF90b3RhbFJvd0NvdW50OiBudW1iZXIsXHJcbiAgICBwcml2YXRlIF9pc1N1bW1hcnlEYXRhOiBib29sZWFuLFxyXG4gICAgcHJpdmF0ZSBfbWFya3NJbmZvPzogQXJyYXk8TWFya0luZm8+KSB7XHJcbiAgICAgICAgLy8gVE9ETzogZ2V0IHJpZCBvZiB0aGlzIGluIHJlZGVzaWduLlxyXG4gICAgICAgIHRoaXMuX25hbWUgPSBfaXNTdW1tYXJ5RGF0YSA/ICdTdW1tYXJ5IERhdGEgVGFibGUnIDogJ1VuZGVybHlpbmcgRGF0YSBUYWJsZSc7XHJcbiAgICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGRhdGEoKTogQXJyYXk8QXJyYXk8Q29udHJhY3QuRGF0YVZhbHVlPj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGNvbHVtbnMoKTogQXJyYXk8Q29udHJhY3QuQ29sdW1uPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbWFya3NJbmZvKCk6IEFycmF5PENvbnRyYWN0Lk1hcmtJbmZvPiB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFya3NJbmZvO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0b3RhbFJvd0NvdW50KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fdG90YWxSb3dDb3VudDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaXNTdW1tYXJ5RGF0YSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc1N1bW1hcnlEYXRhO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hcmtJbmZvIGltcGxlbWVudHMgQ29udHJhY3QuTWFya0luZm8ge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX3R5cGU6IENvbnRyYWN0Lk1hcmtUeXBlLFxyXG4gICAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZyxcclxuICAgIHByaXZhdGUgX3R1cGxlSWQ/OiBOdW1iZXJcclxuICApIHt9XHJcblxyXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBDb250cmFjdC5NYXJrVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgY29sb3IoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgdHVwbGVJZCgpOiBOdW1iZXIgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX3R1cGxlSWQ7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29sdW1uIGltcGxlbWVudHMgQ29udHJhY3QuQ29sdW1uIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9maWVsZE5hbWU6IHN0cmluZyxcclxuICAgIHByaXZhdGUgX2RhdGFUeXBlOiBDb250cmFjdC5EYXRhVHlwZSwgLy8gVE9ETzogdGhpcyBzaG91ZGwgYmUgYW4gZW51bSB0eXBlXHJcbiAgICBwcml2YXRlIF9pc1JlZmVyZW5jZWQ6IGJvb2xlYW4sXHJcbiAgICBwcml2YXRlIF9pbmRleDogbnVtYmVyKSB7fVxyXG5cclxuICBwdWJsaWMgZ2V0IGZpZWxkTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkTmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZGF0YVR5cGUoKTogQ29udHJhY3QuRGF0YVR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFUeXBlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc1JlZmVyZW5jZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNSZWZlcmVuY2VkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpbmRleCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luZGV4O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFWYWx1ZSBpbXBsZW1lbnRzIENvbnRyYWN0LkRhdGFWYWx1ZSB7XHJcbiAgLyogdHNsaW50OmRpc2FibGU6bm8tYW55ICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueSxcclxuICAgIHByaXZhdGUgX2Zvcm1hdHRlZFZhbHVlOiBzdHJpbmcpIHt9XHJcblxyXG4gIHB1YmxpYyBnZXQgdmFsdWUoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZm9ybWF0dGVkVmFsdWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9mb3JtYXR0ZWRWYWx1ZTtcclxuICB9XHJcbiAgLyogdHNsaW50OmVuYWJsZTpuby1hbnkgKi9cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvTW9kZWxzL0dldERhdGFNb2RlbHMudHNcbiAqKi8iLCJleHBvcnQgY2xhc3MgVGFibGVhdUV4Y2VwdGlvbnMge1xyXG4gIC8vIFRPRE8sIEFwaUVycm9yQ29kZXMgbmVlZCB0byBiZSBhZGRlZCB0byBleHRlcm5hbCBpbnRlcmZhY2VzLlxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9FeGNlcHRpb25zL1RhYmxlYXVFeGNlcHRpb25zLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgVGFibGVhdUV4Y2VwdGlvbiB9IGZyb20gJ0B0YWJsZWF1L2FwaS11dGlscyc7XHJcblxyXG5pbXBvcnQgeyBUYWJsZWF1V29ya3NoZWV0RXZlbnQgfSBmcm9tICcuL1RhYmxlYXVXb3Jrc2hlZXRFdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsdGVyQ2hhbmdlZEV2ZW50IGV4dGVuZHMgVGFibGVhdVdvcmtzaGVldEV2ZW50IGltcGxlbWVudHMgQ29udHJhY3QuRmlsdGVyQ2hhbmdlZEV2ZW50IHtcclxuICBwdWJsaWMgY29uc3RydWN0b3Iod29ya3NoZWV0OiBDb250cmFjdC5Xb3Jrc2hlZXQsIHByaXZhdGUgX2ZpZWxkTmFtZTogc3RyaW5nKSB7XHJcbiAgICBzdXBlcihDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlLkZpbHRlckNoYW5nZWQsIHdvcmtzaGVldCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGZpZWxkTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkTmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRGaWx0ZXJBc3luYygpOiBQcm9taXNlPENvbnRyYWN0LkZpbHRlcj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dvcmtzaGVldC5nZXRGaWx0ZXJzQXN5bmMoKS50aGVuPENvbnRyYWN0LkZpbHRlcj4oZmlsdGVycyA9PiB7XHJcbiAgICAgIC8vIFRPRE86IEZpbHRlcmluZyBvZiB0aGUgZmlsdGVycyBzaG91bGQgZXZlbnR1YWxseSBiZSBkb25lIHBsYXRmb3JtIHNpZGUuXHJcbiAgICAgIGNvbnN0IGV2ZW50ZWRGaWx0ZXIgPSBmaWx0ZXJzLmZpbmQoKGZpbHRlcikgPT4gKGZpbHRlci5maWVsZE5hbWUgPT09IHRoaXMuX2ZpZWxkTmFtZSkpO1xyXG5cclxuICAgICAgaWYgKCFldmVudGVkRmlsdGVyKSB7XHJcbiAgICAgICAgLy8gV2Ugc2hvdWxkbid0IGhpdCB0aGlzIHVubGVzcyB0aGUgZmlsdGVyIHdhcyByZW1vdmVkIGZyb20gdGhlIHdvcmtzaGVldFxyXG4gICAgICAgIC8vIGFmdGVyIHRoZSBldmVudCB3YXMgcmFpc2VkLlxyXG4gICAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uaW50ZXJuYWxFcnJvcihbJ0ZpbHRlciBubyBsb25nZXIgZm91bmQgaW4gd29ya3NoZWV0LiddKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGV2ZW50ZWRGaWx0ZXI7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0V2ZW50cy9GaWx0ZXJDaGFuZ2VkRXZlbnQudHNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyB5b3VyIG1haW4uIFRoaXMgaXMgd2hlcmUgeW91IHJlLWV4cG9ydCBldmVyeXRoaW5nIHlvdSB3YW50IHRvIGJlIHB1YmxpY2x5IGF2YWlsYWJsZS5cclxuICpcclxuICogVGhlIGJ1aWxkIGVuZm9yY2VzIHRoYXQgdGhlIGZpbGUgaGFzIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGdsb2JhbCB2YXJpYWJsZSB0aGF0IGlzIGV4cG9ydGVkLlxyXG4gKi9cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vQW5hbHl0aWNzSW50ZXJmYWNlcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vRGF0YVNvdXJjZUludGVyZmFjZXMnO1xyXG5leHBvcnQgKiBmcm9tICcuL0RhdGFUYWJsZUludGVyZmFjZXMnO1xyXG5leHBvcnQgKiBmcm9tICcuL0VuY29kaW5nSW50ZXJmYWNlcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vRW51bXMnO1xyXG5leHBvcnQgKiBmcm9tICcuL0V2ZW50SW50ZXJmYWNlcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vRmlsdGVySW50ZXJmYWNlcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vU2VsZWN0aW9uSW50ZXJmYWNlcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vUGFyYW1ldGVySW50ZXJmYWNlcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vU2VsZWN0aW9uSW50ZXJmYWNlcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vU2hlZXRJbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCB7IEV4dGVuc2lvbnMgfSBmcm9tICcuL05hbWVzcGFjZXMvRXh0ZW5zaW9ucyc7XHJcbmV4cG9ydCB7IERhc2hib2FyZENvbnRlbnQgfSBmcm9tICcuL05hbWVzcGFjZXMvRGFzaGJvYXJkQ29udGVudCc7XHJcbmV4cG9ydCB7IEVudmlyb25tZW50IH0gZnJvbSAnLi9OYW1lc3BhY2VzL0Vudmlyb25tZW50JztcclxuZXhwb3J0IHsgU2V0dGluZ3MgfSBmcm9tICcuL05hbWVzcGFjZXMvU2V0dGluZ3MnO1xyXG5leHBvcnQgeyBVSSwgRXh0ZW5zaW9uRGlhbG9nIH0gZnJvbSAnLi9OYW1lc3BhY2VzL1VJJztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1leHRlcm5hbC1jb250cmFjdC9zcmMvQXBpRXh0ZXJuYWxDb250cmFjdC50c1xuICoqLyIsIi8vIEFsbCBlbnVtIHZhbHVlcyBtYWRlIGF2YWlsYWJsZSB0byBFeHRlbnNpb25zIGRldmVsb3BlcnMuXHJcbi8vIEVudW1zIHNob3VsZCBiZSBrZXB0IGluIGFscGhhYmV0aWNhbCBvcmRlci5cclxuXHJcbi8qKlxyXG4gKiBUaGUgY29udGV4dCBpbiB3aGljaCB0aGUgRXh0ZW5zaW9ucyBpcyBjdXJyZW50bHkgcnVubmluZy5cclxuICovXHJcbmV4cG9ydCBlbnVtIEV4dGVuc2lvbkNvbnRleHQge1xyXG4gIERlc2t0b3AgPSAnZGVza3RvcCcsXHJcbiAgU2VydmVyID0gJ3NlcnZlcidcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBtb2RlIGluIHdoaWNoIHRoZSBFeHRlbnNpb25zIGlzIGN1cnJlbnRseSBydW5uaW5nLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gRXh0ZW5zaW9uTW9kZSB7XHJcbiAgQXV0aG9yaW5nID0gJ2F1dGhvcmluZycsXHJcbiAgVmlld2luZyA9ICd2aWV3aW5nJ1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBBbmFseXRpY3NPYmplY3RUeXBlIHtcclxuICBDbHVzdGVyID0gJ2NsdXN0ZXInLFxyXG4gIEZvcmVjYXN0ID0gJ2ZvcmVjYXN0JyxcclxuICBUcmVuZExpbmUgPSAndHJlbmQtbGluZSdcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQ29sdW1uVHlwZSB7XHJcbiAgRGlzY3JldGUgPSAnZGlzY3JldGUnLFxyXG4gIENvbnRpbnVvdXMgPSAnY29udGludW91cydcclxufVxyXG5cclxuLyoqXHJcbiAqIFdoYXQgdGhlIG9iamVjdCByZXByZXNlbnRzIGluIGEgZGFzaGJvYXJkLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gRGFzaGJvYXJkT2JqZWN0VHlwZSB7XHJcbiAgQmxhbmsgPSAnYmxhbmsnLFxyXG4gIFdvcmtzaGVldCA9ICd3b3Jrc2hlZXQnLFxyXG4gIFF1aWNrRmlsdGVyID0gJ3F1aWNrLWZpbHRlcicsXHJcbiAgUGFyYW1ldGVyQ29udHJvbCA9ICdwYXJhbWV0ZXItY29udHJvbCcsXHJcbiAgUGFnZUZpbHRlciA9ICdwYWdlLWZpbHRlcicsXHJcbiAgTGVnZW5kID0gJ2xlZ2VuZCcsXHJcbiAgVGl0bGUgPSAndGl0bGUnLFxyXG4gIFRleHQgPSAndGV4dCcsXHJcbiAgSW1hZ2UgPSAnaW1hZ2UnLFxyXG4gIFdlYlBhZ2UgPSAnd2ViLXBhZ2UnLFxyXG4gIEV4dGVuc2lvbiA9ICdleHRlbnNpb24nXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGlmZmVyZW50IHR5cGVzIG9mIGRhdGEgYSB2YWx1ZSBjYW4gaGF2ZVxyXG4gKi9cclxuZXhwb3J0IGVudW0gRGF0YVR5cGUge1xyXG4gIFN0cmluZyA9ICdzdHJpbmcnLFxyXG4gIEludCA9ICdpbnQnLFxyXG4gIEZsb2F0ID0gJ2Zsb2F0JyxcclxuICBCb29sID0gJ2Jvb2wnLFxyXG4gIERhdGUgPSAnZGF0ZScsXHJcbiAgRGF0ZVRpbWUgPSAnZGF0ZS10aW1lJyxcclxuICBTcGF0aWFsID0gJ3NwYXRpYWwnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBWYWxpZCBkYXRlIHJhbmdlcyBmb3IgYSByZWxhdGl2ZSBkYXRlIGZpbHRlci5cclxuICovXHJcbmV4cG9ydCBlbnVtIERhdGVSYW5nZVR5cGUge1xyXG4gIExhc3QgPSAnbGFzdCcsXHJcbiAgTGFzdE4gPSAnbGFzdC1uJyxcclxuICBOZXh0ID0gJ25leHQnLFxyXG4gIE5leHROID0gJ25leHQtbicsXHJcbiAgQ3VycmVudCA9ICdjdXJyZW50JyxcclxuICBUb0RhdGUgPSAndG8tZGF0ZSdcclxufVxyXG5cclxuLyoqXHJcbiAqIFR5cGVzIG9mIGRpYWxvZyBldmVudCBmb3IgZXZlbnQgbGlzdGVuaW5nIGJldHdlZW4gYSBwYXJlbnQgRXh0ZW5zaW9ucyBhbmQgYSBwb3B1cCBkaWFsb2cuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBEaWFsb2dFdmVudFR5cGUge1xyXG4gIERpYWxvZ01lc3NhZ2UgPSAnZGlhbG9nLW1lc3NhZ2UnLFxyXG4gIERpYWxvZ0V2ZW50ID0gJ2RpYWxvZy1ldmVudCdcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRW5jb2RpbmdUeXBlIHtcclxuICBDb2x1bW4gPSAnY29sdW1uJyxcclxuICBSb3cgPSAncm93JyxcclxuICBQYWdlID0gJ3BhZ2UnLFxyXG4gIEZpbHRlciA9ICdmaWx0ZXInLFxyXG4gIE1hcmtzVHlwZSA9ICdtYXJrcy10eXBlJyxcclxuICBNZWFzdXJlVmFsdWVzID0gJ21lYXN1cmUtdmFsdWVzJyxcclxuICBDb2xvciA9ICdjb2xvcicsXHJcbiAgU2l6ZSA9ICdzaXplJyxcclxuICBMYWJlbCA9ICdsYWJlbCcsXHJcbiAgRGV0YWlsID0gJ2RldGFpbCcsXHJcbiAgVG9vbHRpcCA9ICd0b29sdGlwJyxcclxuICBTaGFwZSA9ICdzaGFwZScsXHJcbiAgUGF0aCA9ICdwYXRoJyxcclxuICBBbmdsZSA9ICdhbmdsZSdcclxufVxyXG5cclxuLyoqXHJcbiAqIEFsbCBlcnJvciBjb2RlcyB1c2VkIGJ5IHRoZSBFeHRlbnNpb25zIEFQSS5cclxuICovXHJcbmV4cG9ydCBlbnVtIEVycm9yQ29kZXMge1xyXG4gIC8qKlxyXG4gICAqIE9ubHkgb25lIGRpYWxvZyBjYW4gYmUgb3BlbmVkIGF0IHRpbWUgd2l0aCB0aGUgVUkgbmFtZXNwYWNlIGZ1bmN0aW9uYWxpdHkuXHJcbiAgICovXHJcbiAgRGlhbG9nQWxyZWFkeU9wZW4gPSAnZGlhbG9nLWFscmVhZHktb3BlbicsXHJcbiAgLyoqXHJcbiAgICogVGhlIG9wZW4gZGlhbG9nIHdhcyBjbG9zZWQgYnkgdGhlIHVzZXIuXHJcbiAgICovXHJcbiAgRGlhbG9nQ2xvc2VkQnlVc2VyID0gJ2RpYWxvZy1jbG9zZWQtYnktdXNlcicsXHJcbiAgLyoqXHJcbiAgICogQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgYXR0ZW1wdGluZyB0byBwZXJmb3JtIGEgZmlsdGVyIG9wZXJhdGlvbi5cclxuICAgKi9cclxuICBGaWx0ZXJDYW5ub3RCZVBlcmZvcm1lZCA9ICdmaWx0ZXItY2Fubm90LWJlLXBlcmZvcm1lZCcsXHJcbiAgLyoqXHJcbiAgICogQW4gZXJyb3Igb2NjdXJyZWQgd2l0aGluIHRoZSBUYWJsZWF1IEV4dGVuc2lvbnMgQVBJLiBDb250YWN0IFRhYmxlYXUgU3VwcG9ydC5cclxuICAgKi9cclxuICBJbnRlcm5hbEVycm9yID0gJ2ludGVybmFsLWVycm9yJyxcclxuICAvKipcclxuICAgKiBBbiBpbnZhbGlkIGFnZ3JlZ2F0aW9uIHdhcyBzcGVjaWZpZWQgZm9yIHRoZSBmaWx0ZXIsIHN1Y2ggYXMgc2V0dGluZyBhIHJhbmdlIGZpbHRlciB0byBcIlNVTShTYWxlcylcIiBpbnN0ZWFkIG9mIFwiU2FsZXNcIi5cclxuICAgKi9cclxuICBJbnZhbGlkQWdncmVnYXRpb25GaWVsZE5hbWUgPSAnaW52YWxpZC1hZ2dyZWdhdGlvbi1maWVsZC1uYW1lJyxcclxuICAvKipcclxuICAgKiBBIGRpYWxvZyBtdXN0IGZpcnN0IGxhdW5jaCB0bywgYW5kIHNlbmQgbWVzc2FnZXMgZnJvbSwgdGhlIHNhbWUgZG9tYWluIGFzIHRoZSBwYXJlbnQgRXh0ZW5zaW9ucy5cclxuICAgKi9cclxuICBJbnZhbGlkRG9tYWluRGlhbG9nID0gJ2ludmFsaWQtZGlhbG9nLWRvbWFpbicsXHJcbiAgLyoqXHJcbiAgICogQW4gaW52YWxpZCBkYXRlIHdhcyBzcGVjaWZpZWQgaW4gYSBtZXRob2QgdGhhdCByZXF1aXJlZCBhIGRhdGUgcGFyYW1ldGVyLlxyXG4gICAqL1xyXG4gIEludmFsaWREYXRlUGFyYW1ldGVyID0gJ2ludmFsaWQtZGF0ZS1wYXJhbWV0ZXInLFxyXG4gIC8qKlxyXG4gICAqIEEgZmlsdGVyIG9wZXJhdGlvbiB3YXMgYXR0ZW1wdGVkIG9uIGEgZmllbGQgdGhhdCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgZGF0YSBzb3VyY2UuXHJcbiAgICovXHJcbiAgSW52YWxpZEZpbHRlckZpZWxkTmFtZSA9ICdpbnZhbGlkLWZpbHRlci1maWVsZC1uYW1lJyxcclxuICAvKipcclxuICAgKiBBIGZpbHRlciBvcGVyYXRpb24gd2FzIGF0dGVtcHRlZCB1c2luZyBhIHZhbHVlIHRoYXQgaXMgdGhlIHdyb25nIGRhdGEgdHlwZSBvciBmb3JtYXQuXHJcbiAgICovXHJcbiAgSW52YWxpZEZpbHRlckZpZWxkVmFsdWUgPSAnaW52YWxpZC1maWx0ZXItZmllbGQtdmFsdWUnLFxyXG4gIC8qKlxyXG4gICAqIEEgcGFyYW1ldGVyIGlzIG5vdCB0aGUgY29ycmVjdCBkYXRhIHR5cGUgb3IgZm9ybWF0LiBUaGUgbmFtZSBvZiB0aGUgcGFyYW1ldGVyIGlzIHNwZWNpZmllZCBpbiB0aGUgRXJyb3IubWVzc2FnZSBmaWVsZC5cclxuICAgKi9cclxuICBJbnZhbGlkUGFyYW1ldGVyID0gJ2ludmFsaWQtcGFyYW1ldGVyJyxcclxuICAvKipcclxuICAgKiBBbiBpbnZhbGlkIGRhdGUgdmFsdWUgd2FzIHNwZWNpZmllZCBpbiBhIFNoZWV0LnNlbGVjdE1hcmtzQXN5bmMoKSBjYWxsIGZvciBhIGRhdGUgZmllbGQuXHJcbiAgICovXHJcbiAgSW52YWxpZFNlbGVjdGlvbkRhdGUgPSAnaW52YWxpZC1zZWxlY3Rpb24tZGF0ZScsXHJcbiAgLyoqXHJcbiAgICogQSBmaWVsZCB3YXMgc3BlY2lmaWVkIGluIGEgU2hlZXQuc2VsZWN0TWFya3NBc3luYygpIGNhbGwgdGhhdCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgZGF0YSBzb3VyY2UuXHJcbiAgICovXHJcbiAgSW52YWxpZFNlbGVjdGlvbkZpZWxkTmFtZSA9ICdpbnZhbGlkLXNlbGVjdGlvbi1maWVsZC1uYW1lJyxcclxuICAvKipcclxuICAgKiBBbiBpbnZhbGlkIHZhbHVlIHdhcyBzcGVjaWZpZWQgaW4gYSBTaGVldC5zZWxlY3RNYXJrc0FzeW5jKCkgY2FsbC5cclxuICAgKi9cclxuICBJbnZhbGlkU2VsZWN0aW9uVmFsdWUgPSAnaW52YWxpZC1zZWxlY3Rpb24tdmFsdWUnLFxyXG4gIC8qKlxyXG4gICAqIEEgcmVxdWlyZWQgcGFyYW1ldGVyIHdhcyBub3Qgc3BlY2lmaWVkLCBudWxsLCBvciBhbiBlbXB0eSBzdHJpbmcvYXJyYXkuXHJcbiAgICovXHJcbiAgTnVsbE9yRW1wdHlQYXJhbWV0ZXIgPSAnbnVsbC1vci1lbXB0eS1wYXJhbWV0ZXInLFxyXG4gIC8qKlxyXG4gICAqIEFuIHVua25vd24gZXZlbnQgbmFtZSB3YXMgc3BlY2lmaWVkIGluIHRoZSBjYWxsIHRvIFZpei5hZGRFdmVudExpc3RlbmVyb3IgVml6LnJlbW92ZUV2ZW50TGlzdGVuZXIuXHJcbiAgICovXHJcbiAgVW5zdXBwb3J0ZWRFdmVudE5hbWUgPSAndW5zdXBwb3J0ZWQtZXZlbnQtbmFtZScsXHJcbiAgLyoqXHJcbiAgICogQSBtZXRob2Qgd2FzIHVzZWQgZm9yIGEgdHlwZSBvZiBkYXRhc291cmNlIHRoYXQgZG9lc24ndCBzdXBwb3J0IHRoYXQgbWV0aG9kIChzZWUgZ2V0QWN0aXZlVGFibGVzQXN5bmMgZm9yIGFuIGV4YW1wbGUpXHJcbiAgICovXHJcbiAgVW5zdXBwb3J0ZWRNZXRob2RGb3JEYXRhU291cmNlVHlwZSA9ICd1bnN1cHBvcnRlZC1tZXRob2QtZm9yLWRhdGEtc291cmNlLXR5cGUnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiAgVHlwZSBvZiBhZ2dyZWdhdGlvbiBvbiBhIGZpZWxkLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gRmllbGRBZ2dyZWdhdGlvblR5cGUge1xyXG4gIFN1bSA9ICdzdW0nLFxyXG4gIEF2ZyA9ICdhdmcnLFxyXG4gIE1pbiA9ICdtaW4nLFxyXG4gIE1heCA9ICdtYXgnLFxyXG4gIFN0ZGV2ID0gJ3N0ZGV2JyxcclxuICBTdGRldnAgPSAnc3RkZXZwJyxcclxuICBWYXIgPSAndmFyJyxcclxuICBWYXJwID0gJ3ZhcnAnLFxyXG4gIENvdW50ID0gJ2NvdW50JyxcclxuICBDb3VudGQgPSAnY291bnRkJyxcclxuICBNZWRpYW4gPSAnbWVkaWFuJyxcclxuICBBdHRyID0gJ2F0dHInLFxyXG4gIE5vbmUgPSAnbm9uZScsXHJcbiAgWWVhciA9ICd5ZWFyJyxcclxuICBRdHIgPSAncXRyJyxcclxuICBNb250aCA9ICdtb250aCcsXHJcbiAgRGF5ID0gJ2RheScsXHJcbiAgSG91ciA9ICdob3VyJyxcclxuICBNaW51dGUgPSAnbWludXRlJyxcclxuICBTZWNvbmQgPSAnc2Vjb25kJyxcclxuICBXZWVrID0gJ3dlZWsnLFxyXG4gIFdlZWtkYXkgPSAnd2Vla2RheScsXHJcbiAgTW9udGhZZWFyID0gJ21vbnRoLXllYXInLFxyXG4gIE1keSA9ICdtZHknLFxyXG4gIEVuZCA9ICdlbmQnLFxyXG4gIFRydW5jWWVhciA9ICd0cnVuYy15ZWFyJyxcclxuICBUcnVuY1F0ciA9ICd0cnVuYy1xdHInLFxyXG4gIFRydW5jTW9udGggPSAndHJ1bmMtbW9udGgnLFxyXG4gIFRydW5jV2VlayA9ICd0cnVuYy13ZWVrJyxcclxuICBUcnVuY0RheSA9ICd0cnVuYy1kYXknLFxyXG4gIFRydW5jSG91ciA9ICd0cnVuYy1ob3VyJyxcclxuICBUcnVuY01pbnV0ZSA9ICd0cnVuYy1taW51dGUnLFxyXG4gIFRydW5jU2Vjb25kID0gJ3RydW5jLXNlY29uZCcsXHJcbiAgUXVhcnQxID0gJ3F1YXJ0MScsXHJcbiAgUXVhcnQzID0gJ3F1YXJ0MycsXHJcbiAgU2tld25lc3MgPSAnc2tld25lc3MnLFxyXG4gIEt1cnRvc2lzID0gJ2t1cnRvc2lzJyxcclxuICBJbk91dCA9ICdpbi1vdXQnLFxyXG4gIFVzZXIgPSAndXNlcidcclxufVxyXG5cclxuLyoqXHJcbiAqIFJvbGUgb2YgYSBmaWVsZC5cclxuICovXHJcbmV4cG9ydCBlbnVtIEZpZWxkUm9sZVR5cGUge1xyXG4gIERpbWVuc2lvbiA9ICdkaW1lbnNpb24nLFxyXG4gIE1lYXN1cmUgPSAnbWVhc3VyZScsXHJcbiAgVW5rbm93biA9ICd1bmtub3duJ1xyXG59XHJcblxyXG4vKipcclxuICogQW4gZW51bWVyYXRpb24gb2YgdGhlIHZhbGlkIHR5cGVzIG9mIGZpbHRlcnMgdGhhdCBjYW4gYmUgYXBwbGllZC5cclxuICovXHJcbmV4cG9ydCBlbnVtIEZpbHRlclR5cGUge1xyXG4gIENhdGVnb3JpY2FsID0gJ2NhdGVnb3JpY2FsJyxcclxuICBSYW5nZSA9ICdyYW5nZScsXHJcbiAgSGllcmFyY2hpY2FsID0gJ2hpZXJhcmNoaWNhbCcsXHJcbiAgUmVsYXRpdmVEYXRlID0gJ3JlbGF0aXZlLWRhdGUnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGlmZmVyZW50IHVwZGF0ZSB0eXBlcyBmb3IgYXBwbHlpbmcgZmlsdGVyXHJcbiAqL1xyXG5leHBvcnQgZW51bSBGaWx0ZXJVcGRhdGVUeXBlIHtcclxuICBBZGQgPSAnYWRkJyxcclxuICBBbGwgPSAnYWxsJyxcclxuICBSZXBsYWNlID0gJ3JlcGxhY2UnLFxyXG4gIFJlbW92ZSA9ICdyZW1vdmUnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgZG9tYWluIHR5cGUgZm9yIGEgZmlsdGVyXHJcbiAqL1xyXG5leHBvcnQgZW51bSBGaWx0ZXJEb21haW5UeXBlIHtcclxuICAvKipcclxuICAgKiBUaGUgZG9tYWluIHZhbHVlcyB0aGF0IGFyZSByZWxldmFudCB0byB0aGUgc3BlY2lmaWVkIGZpbHRlclxyXG4gICAqIGkuZS4gdGhlIGRvbWFpbiBpcyByZXN0cmljdGVkIGJ5IGEgcHJldmlvdXMgZmlsdGVyXHJcbiAgICovXHJcbiAgUmVsZXZhbnQgPSAncmVsZXZhbnQnLFxyXG4gIC8qKlxyXG4gICAqIGxpc3Qgb2YgYWxsIHBvc3NpYmxlIGRvbWFpbiB2YWx1ZXMgZnJvbSBkYXRhYmFzZVxyXG4gICAqL1xyXG4gIERhdGFiYXNlID0gJ2RhdGFiYXNlJ1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIG9wdGlvbiBmb3Igc3BlY2lmeWluZyB3aGljaCB2YWx1ZXMgdG8gaW5jbHVkZSBmb3IgZmlsdGVyaW5nXHJcbiAqIEluZGljYXRlcyB3aGF0IHRvIGRvIHdpdGggbnVsbCB2YWx1ZXMgZm9yIGEgZ2l2ZW4gZmlsdGVyIG9yIG1hcmsgc2VsZWN0aW9uIGNhbGwuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBGaWx0ZXJOdWxsT3B0aW9uIHtcclxuICBOdWxsVmFsdWVzID0gJ251bGwtdmFsdWVzJyxcclxuICBOb25OdWxsVmFsdWVzID0gJ25vbi1udWxsLXZhbHVlcycsXHJcbiAgQWxsVmFsdWVzID0gJ2FsbC12YWx1ZXMnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUeXBlIG9mIG1hcmsgZm9yIGEgZ2l2ZW4gbWFya3MgY2FyZCBpbiBhIHZpei5cclxuICovXHJcbmV4cG9ydCBlbnVtIE1hcmtUeXBlIHtcclxuICBCYXIgPSAnYmFyJyxcclxuICBMaW5lID0gJ2xpbmUnLFxyXG4gIEFyZWEgPSAnYXJlYScsXHJcbiAgU3F1YXJlID0gJ3NxdWFyZScsXHJcbiAgQ2lyY2xlID0gJ2NpcmNsZScsXHJcbiAgU2hhcGUgPSAnc2hhcGUnLFxyXG4gIFRleHQgPSAndGV4dCcsXHJcbiAgTWFwID0gJ21hcCcsXHJcbiAgUGllID0gJ3BpZScsXHJcbiAgR2FudHRCYXIgPSAnZ2FudHQtYmFyJyxcclxuICBQb2x5Z29uID0gJ3BvbHlnb24nXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbiBlbnVtZXJhdGlvbiBkZXNjcmliaW5nIHRoZSBkaWZmZXJlbnQgdHlwZXMgb2YgYWxsb3dhYmxlIHZhbHVlcy5cclxuICogVGhpcyBpcyB1c2VkIGZvciByZXN0cmljdGluZyB0aGUgZG9tYWluIG9mIGEgcGFyYW1ldGVyXHJcbiAqL1xyXG5leHBvcnQgZW51bSBQYXJhbWV0ZXJWYWx1ZVR5cGUge1xyXG4gIEFsbCA9ICdhbGwnLFxyXG4gIExpc3QgPSAnbGlzdCcsXHJcbiAgUmFuZ2UgPSAncmFuZ2UnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEYXRlIHBlcmlvZCB1c2VkIGluIGZpbHRlcnMgYW5kIGluIHBhcmFtZXRlcnMuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBQZXJpb2RUeXBlIHtcclxuICBZZWFycyA9ICd5ZWFycycsXHJcbiAgUXVhcnRlcnMgPSAncXVhcnRlcnMnLFxyXG4gIE1vbnRocyA9ICdtb250aHMnLFxyXG4gIFdlZWtzID0gJ3dlZWtzJyxcclxuICBEYXlzID0gJ2RheXMnLFxyXG4gIEhvdXJzID0gJ2hvdXJzJyxcclxuICBNaW51dGVzID0gJ21pbnV0ZXMnLFxyXG4gIFNlY29uZHMgPSAnc2Vjb25kcydcclxufVxyXG5cclxuZXhwb3J0IGVudW0gUXVpY2tUYWJsZUNhbGNUeXBlIHtcclxuICBSdW5uaW5nVG90YWwgPSAncnVubmluZy10b3RhbCcsXHJcbiAgRGlmZmVyZW5jZSA9ICdkaWZmZXJlbmNlJyxcclxuICBQZXJjZW50RGlmZmVyZW5jZSA9ICdwZXJjZW50LWRpZmZlcmVuY2UnLFxyXG4gIFBlcmNlbnRPZlRvdGFsID0gJ3BlcmNlbnQtb2YtdG90YWwnLFxyXG4gIFJhbmsgPSAncmFuaycsXHJcbiAgUGVyY2VudGlsZSA9ICdwZXJjZW50aWxlJyxcclxuICBNb3ZpbmdBdmVyYWdlID0gJ21vdmluZy1hdmVyYWdlJyxcclxuICBZVERUb3RhbCA9ICd5dGQtdG90YWwnLFxyXG4gIENvbXBvdW5kR3Jvd3RoUmF0ZSA9ICdjb21wb3VuZC1ncm93dGgtcmF0ZScsXHJcbiAgWWVhck92ZXJZZWFyR3Jvd3RoID0gJ3llYXItb3Zlci15ZWFyLWdyb3d0aCcsXHJcbiAgWVRER3Jvd3RoID0gJ3l0ZC1ncm93dGgnLFxyXG4gIFVuZGVmaW5lZCA9ICd1bmRlZmluZWQnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbnVtIGZvciBzcGVjaWZ5aW5nIHRoZSBzZWxlY3Rpb24gdHlwZSBmb3Igc2VsZWN0IG1hcmtzIGFwaS5cclxuICovXHJcbmV4cG9ydCBlbnVtIFNlbGVjdGlvblVwZGF0ZVR5cGUge1xyXG4gIFJlcGxhY2UgPSAnc2VsZWN0LXJlcGxhY2UnLFxyXG4gIEFkZCA9ICdzZWxlY3QtYWRkJyxcclxuICBSZW1vdmUgPSAnc2VsZWN0LXJlbW92ZSdcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSB0eXBlIG9mIHNoZWV0IGEgU2hlZXQgb2JqZWN0IHJlcHJlc2VudHNcclxuICovXHJcbmV4cG9ydCBlbnVtIFNoZWV0VHlwZSB7XHJcbiAgRGFzaGJvYXJkID0gJ2Rhc2hib2FyZCcsXHJcbiAgU3RvcnkgPSAnc3RvcnknLFxyXG4gIFdvcmtzaGVldCA9ICd3b3Jrc2hlZXQnXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNvcnREaXJlY3Rpb24ge1xyXG4gIEluY3JlYXNpbmcgPSAnaW5jcmVhc2luZycsXHJcbiAgRGVjcmVhc2luZyA9ICdkZWNyZWFzaW5nJ1xyXG59XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIGNlcnRhaW4gdHlwZSBvZiBldmVudCB3aGljaCBjYW4gYmUgbGlzdGVuZWQgZm9yXHJcbiAqL1xyXG5leHBvcnQgZW51bSBUYWJsZWF1RXZlbnRUeXBlIHtcclxuICAvKiogUmFpc2VkIHdoZW4gYW55IGZpbHRlciBoYXMgY2hhbmdlZCBzdGF0ZS4qL1xyXG4gIEZpbHRlckNoYW5nZWQgPSAnZmlsdGVyLWNoYW5nZWQnLFxyXG5cclxuICAvKiogVGhlIHNlbGVjdGVkIG1hcmtzIG9uIGEgdmlzdWFsaXphdGlvbiBoYXMgY2hhbmdlZCAqL1xyXG4gIE1hcmtTZWxlY3Rpb25DaGFuZ2VkID0gJ21hcmstc2VsZWN0aW9uLWNoYW5nZWQnLFxyXG5cclxuICAvKiogQSBwYXJhbWV0ZXIgaGFzIGhhZCBpdHMgdmFsdWUgbW9kaWZpZWQgKi9cclxuICBQYXJhbWV0ZXJDaGFuZ2VkID0gJ3BhcmFtZXRlci1jaGFuZ2VkJ1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBUcmVuZExpbmVNb2RlbFR5cGUge1xyXG4gIExpbmVhciA9ICdsaW5lYXInLFxyXG4gIExvZ2FyaXRobWljID0gJ2xvZ2FyaXRobWljJyxcclxuICBFeHBvbmVudGlhbCA9ICdleHBvbmVudGlhbCcsXHJcbiAgUG9seW5vbWlhbCA9ICdwb2x5bm9taWFsJ1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktZXh0ZXJuYWwtY29udHJhY3Qvc3JjL0VudW1zLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IFRhYmxlYXVTaGVldEV2ZW50IH0gZnJvbSAnLi9UYWJsZWF1U2hlZXRFdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVhdVdvcmtzaGVldEV2ZW50IGV4dGVuZHMgVGFibGVhdVNoZWV0RXZlbnQgaW1wbGVtZW50cyBDb250cmFjdC5UYWJsZWF1V29ya3NoZWV0RXZlbnQge1xyXG4gIHB1YmxpYyBnZXQgd29ya3NoZWV0KCk6IENvbnRyYWN0LldvcmtzaGVldCB7XHJcbiAgICByZXR1cm4gdGhpcy5fd29ya3NoZWV0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHR5cGU6IENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGUsIHByb3RlY3RlZCBfd29ya3NoZWV0OiBDb250cmFjdC5Xb3Jrc2hlZXQpIHtcclxuICAgIHN1cGVyKHR5cGUsIF93b3Jrc2hlZXQpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRXZlbnRzL1RhYmxlYXVXb3Jrc2hlZXRFdmVudC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5pbXBvcnQgeyBUYWJsZWF1RXZlbnQgfSBmcm9tICcuL1RhYmxlYXVFdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVhdVNoZWV0RXZlbnQgZXh0ZW5kcyBUYWJsZWF1RXZlbnQgaW1wbGVtZW50cyBDb250cmFjdC5UYWJsZWF1U2hlZXRFdmVudCB7XHJcbiAgcHJpdmF0ZSBfc2hlZXQ6IENvbnRyYWN0LlNoZWV0O1xyXG5cclxuICBwdWJsaWMgZ2V0IHNoZWV0KCk6IENvbnRyYWN0LlNoZWV0IHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih0eXBlOiBDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlLCBzaGVldDogQ29udHJhY3QuU2hlZXQpIHtcclxuICAgIHN1cGVyKHR5cGUpO1xyXG5cclxuICAgIHRoaXMuX3NoZWV0ID0gc2hlZXQ7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9FdmVudHMvVGFibGVhdVNoZWV0RXZlbnQudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxlYXVFdmVudCBpbXBsZW1lbnRzIENvbnRyYWN0LlRhYmxlYXVFdmVudCB7XHJcbiAgcHJpdmF0ZSBfdHlwZTogQ29udHJhY3QuVGFibGVhdUV2ZW50VHlwZTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHR5cGU6IENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGUpIHtcclxuICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0eXBlKCk6IENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9FdmVudHMvVGFibGVhdUV2ZW50LnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IFRhYmxlYXVXb3Jrc2hlZXRFdmVudCB9IGZyb20gJy4vVGFibGVhdVdvcmtzaGVldEV2ZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXJrc1NlbGVjdGVkRXZlbnQgZXh0ZW5kcyBUYWJsZWF1V29ya3NoZWV0RXZlbnQgaW1wbGVtZW50cyBDb250cmFjdC5NYXJrc1NlbGVjdGVkRXZlbnQge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih3b3Jrc2hlZXQ6IENvbnRyYWN0LldvcmtzaGVldCkge1xyXG4gICAgc3VwZXIoQ29udHJhY3QuVGFibGVhdUV2ZW50VHlwZS5NYXJrU2VsZWN0aW9uQ2hhbmdlZCwgd29ya3NoZWV0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRNYXJrc0FzeW5jKCk6IFByb21pc2U8Q29udHJhY3QuTWFya3NDb2xsZWN0aW9uPiB7XHJcbiAgICByZXR1cm4gdGhpcy53b3Jrc2hlZXQuZ2V0U2VsZWN0ZWRNYXJrc0FzeW5jKCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9FdmVudHMvTWFya3NTZWxlY3RlZEV2ZW50LnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IFNpbmdsZUV2ZW50TWFuYWdlciB9IGZyb20gJy4uL1NpbmdsZUV2ZW50TWFuYWdlcic7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpbXBsZW1lbnRzIHRoZSBTaW5nbGVFdmVudE1hbmFnZXIgaW50ZXJmYWNlIGZvciBhIHNpbmdsZSB0eXBlIG9mIFRhYmxlYXUgZXZlbnRcclxuICpcclxuICogQHRlbXBsYXRlIFRFdmVudFR5cGUgVGhlIFRhYmxlYXUgZXZlbnQgdHlwZSB0aGlzIGNsYXNzIHNwZWNpYWxpemVzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2luZ2xlRXZlbnRNYW5hZ2VySW1wbDxURXZlbnRUeXBlIGV4dGVuZHMgQ29udHJhY3QuVGFibGVhdUV2ZW50PiBpbXBsZW1lbnRzIFNpbmdsZUV2ZW50TWFuYWdlciB7XHJcbiAgcHJpdmF0ZSBfZXZlbnRUeXBlOiBDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlO1xyXG4gIHByaXZhdGUgX2hhbmRsZXJzOiBBcnJheTwoZXZlbnRPYmo6IFRFdmVudFR5cGUpID0+IHZvaWQ+O1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoZXZlbnRUeXBlOiBDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlKSB7XHJcbiAgICB0aGlzLl9ldmVudFR5cGUgPSBldmVudFR5cGU7XHJcbiAgICB0aGlzLl9oYW5kbGVycyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBldmVudFR5cGUoKTogQ29udHJhY3QuVGFibGVhdUV2ZW50VHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRUeXBlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoaGFuZGxlcjogKGV2ZW50T2JqOiBURXZlbnRUeXBlKSA9PiB2b2lkKTogQ29udHJhY3QuVGFibGVhdUV2ZW50VW5yZWdpc3RlckZuIHtcclxuICAgIHRoaXMuX2hhbmRsZXJzLnB1c2goaGFuZGxlcik7XHJcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoaGFuZGxlcjogKGV2ZW50T2JqOiBURXZlbnRUeXBlKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBiZWZvcmVDb3VudCA9IHRoaXMuX2hhbmRsZXJzLmxlbmd0aDtcclxuICAgIHRoaXMuX2hhbmRsZXJzID0gdGhpcy5faGFuZGxlcnMuZmlsdGVyKGggPT4gaCAhPT0gaGFuZGxlcik7XHJcbiAgICByZXR1cm4gYmVmb3JlQ291bnQgPiB0aGlzLl9oYW5kbGVycy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdHJpZ2dlckV2ZW50KGV2ZW50R2VuZXJhdG9yOiAoKSA9PiBURXZlbnRUeXBlKTogdm9pZCB7XHJcbiAgICBmb3IgKGNvbnN0IGhhbmRsZXIgb2YgdGhpcy5faGFuZGxlcnMpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBldmVudE1vZGVsID0gZXZlbnRHZW5lcmF0b3IoKTtcclxuICAgICAgICBoYW5kbGVyKGV2ZW50TW9kZWwpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgLy8gU2luY2UgdGhpcyBoYW5kbGVyIGNvdWxkIGJlIG91dHNpZGUgb3VyIGNvbnRyb2wsIGp1c3QgY2F0Y2ggYW55dGhpbmcgaXQgdGhyb3dzIGFuZCBjb250aW51ZSBvblxyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9JbnRlcm5hbC9TaW5nbGVFdmVudE1hbmFnZXJJbXBsLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgVmlzdWFsSWQgfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4vU2VydmljZVJlZ2lzdHJ5JztcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHdoaWNoIHR5cGUgb2YgZ2V0RGF0YSBjYWxsIHRvIG1ha2UuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBHZXREYXRhVHlwZSB7XHJcbiAgU3VtbWFyeSA9ICdzdW1tYXJ5JyxcclxuICBVbmRlcmx5aW5nID0gJ3VuZGVybHlpbmcnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXJ2aWNlIGZvciBpbXBsZW1lbnRpbmcgdGhlIGxvZ2ljIGZvciB2YXJpb3VzIGdldERhdGEgY2FsbHNcclxuICpcclxuICogQGludGVyZmFjZSBHZXREYXRhU2VydmljZVxyXG4gKiBAZXh0ZW5kcyB7QXBpU2VydmljZX1cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2V0RGF0YVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcclxuICAvKipcclxuICAgKiBHZXRzIHRoZSB1bmRlcmx5aW5nIGRhdGEgZm9yIGEgcGFydGljdWxhciB2aXN1YWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7VmlzdWFsSWR9IHZpc3VhbElkICBUaGUgdmlzdWFsIHRvIGdldCBkYXRhIGZvclxyXG4gICAqIEBwYXJhbSB7R2V0RGF0YVR5cGV9IGdldFR5cGUgIFRoZSB0eXBlIG9mIGdldERhdGEgY2FsbCB0byBtYWtlXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBpZ25vcmVBbGlhc2VzICBXaGV0aGVyIG9yIG5vdCBhbGlhc2VzIHNob3VsZCBiZSBpZ25vcmVkXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBpZ25vcmVTZWxlY3Rpb24gIFdoZXRoZXIgb3Igbm90IHNlbGVjdGlvbiBzaG91bGQgYmUgaWdub3JlZFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZUFsbENvbHVtbnMgIFNob3VsZCBhbGwgY29sdW1ucyBiZSBpbmNsdWRlZFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhSb3dzICBNYXhpbXVtIG51bWJlciBvZiByb3dzIHRvIHJldHVyblxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPENvbnRyYWN0LkRhdGFUYWJsZT59ICBEYXRhIHRhYmxlIHdpdGggdGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICovXHJcbiAgICBnZXRVbmRlcmx5aW5nRGF0YUFzeW5jKFxyXG4gICAgICB2aXN1YWxJZDogVmlzdWFsSWQsXHJcbiAgICAgIGdldFR5cGU6IEdldERhdGFUeXBlLFxyXG4gICAgICBpZ25vcmVBbGlhc2VzOiBib29sZWFuLFxyXG4gICAgICBpZ25vcmVTZWxlY3Rpb246IGJvb2xlYW4sXHJcbiAgICAgIGluY2x1ZGVBbGxDb2x1bW5zOiBib29sZWFuLFxyXG4gICAgICBtYXhSb3dzOiBudW1iZXIpOiBQcm9taXNlPENvbnRyYWN0LkRhdGFUYWJsZT47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgbWFya3MgZm9yIGEgZ2l2ZW4gdmlzdWFsXHJcbiAgICAgKlxyXG4gICAgKiBAcGFyYW0ge1Zpc3VhbElkfSB2aXN1YWxJZCAgVGhlIHZpc3VhbCB0byBnZXQgZGF0YSBmb3JcclxuICAgICogQHJldHVybnMge1Byb21pc2U8QWN0aXZlTWFya3M+fSAgQ29sbGVjdGlvbiBvZiBkYXRhIHRhYmxlcyB3aXRoIHRoZSBhY3RpdmUgbWFya3NcclxuICAgICovXHJcbiAgICBnZXRTZWxlY3RlZE1hcmtzQXN5bmModmlzdWFsSWQ6IFZpc3VhbElkKTogUHJvbWlzZTxDb250cmFjdC5NYXJrc0NvbGxlY3Rpb24+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudGx5IGhpZ2hsaWdodGVkIG1hcmtzIGZvciBhIGdpdmVuIHZpc3VhbFxyXG4gICAgICpcclxuICAgICogQHBhcmFtIHtWaXN1YWxJZH0gdmlzdWFsSWQgIFRoZSB2aXN1YWwgdG8gZ2V0IGRhdGEgZm9yXHJcbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFjdGl2ZU1hcmtzPn0gIENvbGxlY3Rpb24gb2YgZGF0YSB0YWJsZXMgd2l0aCB0aGUgYWN0aXZlIG1hcmtzXHJcbiAgICAqL1xyXG4gICAgZ2V0SGlnaGxpZ2h0ZWRNYXJrc0FzeW5jKHZpc3VhbElkOiBWaXN1YWxJZCk6IFByb21pc2U8Q29udHJhY3QuTWFya3NDb2xsZWN0aW9uPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhc291cmNlSWQgIFRoZSBpZCBvZiB0aGUgZGF0YXNvdXJjZSB0byBnZXQgZGF0YSBmb3JcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlQWxpYXNlcyAgV2hldGhlciBhbGlhcyB2YWx1ZXMgc2hvdWxkIGJlIGlnbm9yZWQgaW4gdGhlIHJldHVybmVkIGRhdGFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhSb3dzIFRoZSBtYXhpbXVtIG51bWJlciBvZiByb3dzIHRvIHJldHJpZXZlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGNvbHVtbnNUb0luY2x1ZGUgIENvbGxlY3Rpb24gb2YgY29sdW1uIGNhcHRpb25zIHdoaWNoIHNob3VsZCBiZSByZXR1cm5lZC4gRW1wdHkgbWVhbnMgYWxsIGNvbHVtbnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPENvbnRyYWN0LkRhdGFUYWJsZT59ICBEYXRhIHRhYmxlIHdpdGggdGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIGdldERhdGFTb3VyY2VEYXRhQXN5bmMoXHJcbiAgICAgIGRhdGFzb3VyY2VJZDogc3RyaW5nLFxyXG4gICAgICBpZ25vcmVBbGlhc2VzOiBib29sZWFuLFxyXG4gICAgICBtYXhSb3dzOiBudW1iZXIsXHJcbiAgICAgIGNvbHVtbnNUb0luY2x1ZGU6IEFycmF5PHN0cmluZz4pOiBQcm9taXNlPENvbnRyYWN0LkRhdGFUYWJsZT47XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1NlcnZpY2VzL0dldERhdGFTZXJ2aWNlLnRzXG4gKiovIiwiaW1wb3J0IHsgSW50ZXJuYWxBcGlEaXNwYXRjaGVyIH0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2VTZXJ2aWNlSW1wbCB9IGZyb20gJy4vaW1wbC9EYXRhU291cmNlU2VydmljZUltcGwnO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlSW1wbCB9IGZyb20gJy4vaW1wbC9GaWx0ZXJTZXJ2aWNlSW1wbCc7XHJcbmltcG9ydCB7IEdldERhdGFTZXJ2aWNlSW1wbCB9IGZyb20gJy4vaW1wbC9HZXREYXRhU2VydmljZUltcGwnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlSW1wbCB9IGZyb20gJy4vaW1wbC9Ob3RpZmljYXRpb25TZXJ2aWNlSW1wbCc7XHJcbmltcG9ydCB7IFBhcmFtZXRlcnNTZXJ2aWNlSW1wbCB9IGZyb20gJy4vaW1wbC9QYXJhbWV0ZXJzU2VydmljZUltcGwnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25TZXJ2aWNlSW1wbCB9IGZyb20gJy4vaW1wbC9TZWxlY3Rpb25TZXJ2aWNlSW1wbCc7XHJcbmltcG9ydCB7IEFwaVNlcnZpY2VSZWdpc3RyeSB9IGZyb20gJy4vU2VydmljZVJlZ2lzdHJ5JztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckFsbFNoYXJlZFNlcnZpY2VzKGRpc3BhdGNoZXI6IEludGVybmFsQXBpRGlzcGF0Y2hlcik6IHZvaWQge1xyXG4gIEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5yZWdpc3RlclNlcnZpY2UobmV3IERhdGFTb3VyY2VTZXJ2aWNlSW1wbChkaXNwYXRjaGVyKSk7XHJcbiAgQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLnJlZ2lzdGVyU2VydmljZShuZXcgR2V0RGF0YVNlcnZpY2VJbXBsKGRpc3BhdGNoZXIpKTtcclxuICBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UucmVnaXN0ZXJTZXJ2aWNlKG5ldyBGaWx0ZXJTZXJ2aWNlSW1wbChkaXNwYXRjaGVyKSk7XHJcbiAgQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLnJlZ2lzdGVyU2VydmljZShuZXcgTm90aWZpY2F0aW9uU2VydmljZUltcGwoZGlzcGF0Y2hlcikpO1xyXG4gIEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5yZWdpc3RlclNlcnZpY2UobmV3IFBhcmFtZXRlcnNTZXJ2aWNlSW1wbChkaXNwYXRjaGVyKSk7XHJcbiAgQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLnJlZ2lzdGVyU2VydmljZShuZXcgU2VsZWN0aW9uU2VydmljZUltcGwoZGlzcGF0Y2hlcikpO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9SZWdpc3RlckFsbFNoYXJlZFNlcnZpY2VzLnRzXG4gKiovIiwiaW1wb3J0IHsgRXJyb3JDb2RlcyB9IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7XHJcbiAgRGF0YVNjaGVtYSxcclxuICBFeGVjdXRlUGFyYW1ldGVycyxcclxuICBJbnRlcm5hbEFwaURpc3BhdGNoZXIsXHJcbiAgSm9pbkRlc2NyaXB0aW9uLFxyXG4gIFBhcmFtZXRlcklkLFxyXG4gIFRhYmxlSW5mbyxcclxuICBWZXJiSWRcclxufSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHsgVGFibGVhdUV4Y2VwdGlvbiB9IGZyb20gJ0B0YWJsZWF1L2FwaS11dGlscyc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlU2VydmljZSB9IGZyb20gJy4uL0RhdGFTb3VyY2VTZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vU2VydmljZVJlZ2lzdHJ5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhU291cmNlU2VydmljZUltcGwgaW1wbGVtZW50cyBEYXRhU291cmNlU2VydmljZSB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Rpc3BhdGNoZXI6IEludGVybmFsQXBpRGlzcGF0Y2hlcikgeyB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2VydmljZU5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBTZXJ2aWNlTmFtZXMuRGF0YVNvdXJjZVNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVmcmVzaEFzeW5jKGRhdGFTb3VyY2VJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHtbUGFyYW1ldGVySWQuRGF0YVNvdXJjZUlkXTogZGF0YVNvdXJjZUlkfTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5SZWZyZXNoRGF0YVNvdXJjZSwgcGFyYW1ldGVycykudGhlbjx2b2lkPihyZXNwb25zZSA9PiB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEFjdGl2ZVRhYmxlc0FzeW5jKGRhdGFTb3VyY2VJZDogc3RyaW5nKTogUHJvbWlzZTxUYWJsZUluZm9bXT4ge1xyXG4gICAgY29uc3Qgam9pblBhcmFtZXRlcnM6IEV4ZWN1dGVQYXJhbWV0ZXJzID0ge1tQYXJhbWV0ZXJJZC5EYXRhU291cmNlSWRdOiBkYXRhU291cmNlSWR9O1xyXG5cclxuICAgIC8vIEdldCB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIHRhYmxlcyB1c2VkIGJ5IHRoaXMgY29ubmVjdGlvblxyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZXhlY3V0ZShWZXJiSWQuR2V0Sm9pbkRlc2NyaXB0aW9uLCBqb2luUGFyYW1ldGVycykudGhlbjxUYWJsZUluZm9bXT4oam9pblJlc3BvbnNlID0+IHtcclxuICAgICAgY29uc3Qgam9pbkRlc2NyaXB0aW9uID0gam9pblJlc3BvbnNlLnJlc3VsdCBhcyBKb2luRGVzY3JpcHRpb247XHJcblxyXG4gICAgICAvLyBnZXRBY3RpdmVUYWJsZXMgaXMgdW5zdXBwb3J0ZWQgZm9yIGN1YmVzIGFuZCBHQS4gV2UgZG8gbm90IGhhdmUgYSBjb25uZWN0aW9uIHR5cGUgcHJvcGVydHlcclxuICAgICAgLy8gYXZhaWxhYmxlIGZyb20gdGhlIHBsYXRmb3JtIChpbnRlbnRpb25hbGx5LCB0byByZWR1Y2UgY29kZSBjaHVybiBhcyBuZXcgY29ubmVjdGlvbnMgYXJlIGFkZGVkKS5cclxuICAgICAgLy8gSW5zdGVhZCxqdXN0IGNoZWNrIGlmIGFueSB0YWJsZXMgYXJlIHJldHVybmVkLiBUaGlzIGFycmF5IHdpbGwgYmUgZW1wdHkgZm9yIGFueSBub24tdGFibGUgYmFzZWQgZGF0YXNvdXJjZS5cclxuICAgICAgaWYgKGpvaW5EZXNjcmlwdGlvbi50YWJsZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5lcnJvcignZ2V0QWN0aXZlVGFibGVzQXN5bmMgaXMgdW5zdXBwb3J0ZWQgZm9yIERhdGFTb3VyY2UuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbRXJyb3JDb2Rlcy5VbnN1cHBvcnRlZE1ldGhvZEZvckRhdGFTb3VyY2VUeXBlXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBqb2luRGVzY3JpcHRpb24udGFibGVzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RGF0YVNvdXJjZXNBc3luYygpOiBQcm9taXNlPERhdGFTY2hlbWE+IHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmV4ZWN1dGUoVmVyYklkLkdldERhdGFTb3VyY2VzLCB7fSkudGhlbjxEYXRhU2NoZW1hPihyZXNwb25zZSA9PiB7XHJcbiAgICAgIGNvbnN0IGRhdGFTY2hlbWEgPSByZXNwb25zZS5yZXN1bHQgYXMgRGF0YVNjaGVtYTtcclxuICAgICAgcmV0dXJuIGRhdGFTY2hlbWE7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1NlcnZpY2VzL2ltcGwvRGF0YVNvdXJjZVNlcnZpY2VJbXBsLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0ICogYXMgSW50ZXJuYWxDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQge1xyXG4gIENvbW1hbmRFcnJvcixcclxuICBFeGVjdXRlUGFyYW1ldGVycyxcclxuICBGaWx0ZXJUeXBlLFxyXG4gIEludGVybmFsQXBpRGlzcGF0Y2hlcixcclxuICBQYXJhbWV0ZXJJZCxcclxuICBWZXJiSWQsXHJcbiAgVmlzdWFsSWRcclxufSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBQYXJhbSwgVGFibGVhdUV4Y2VwdGlvbiB9IGZyb20gJ0B0YWJsZWF1L2FwaS11dGlscyc7XHJcblxyXG5pbXBvcnQgeyBFeHRlcm5hbFRvSW50ZXJuYWxFbnVtTWFwcGluZ3MgYXMgRXh0ZXJuYWxFbnVtQ29udmVydGVyIH0gZnJvbSAnLi4vLi4vRW51bU1hcHBpbmdzL0V4dGVybmFsVG9JbnRlcm5hbEVudW1NYXBwaW5ncyc7XHJcbmltcG9ydCB7IEludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncyBhcyBJbnRlcm5hbEVudW1Db252ZXJ0ZXIgfSBmcm9tICcuLi8uLi9FbnVtTWFwcGluZ3MvSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzJztcclxuaW1wb3J0IHtcclxuICBDYXRlZ29yaWNhbERvbWFpbixcclxuICBDYXRlZ29yaWNhbEZpbHRlcixcclxuICBSYW5nZURvbWFpbixcclxuICBSYW5nZUZpbHRlcixcclxuICBSZWxhdGl2ZURhdGVGaWx0ZXJcclxufSBmcm9tICcuLi8uLi9Nb2RlbHMvRmlsdGVyTW9kZWxzJztcclxuaW1wb3J0IHsgRGF0YVZhbHVlIH0gZnJvbSAnLi4vLi4vTW9kZWxzL0dldERhdGFNb2RlbHMnO1xyXG5cclxuaW1wb3J0IHsgRmlsdGVyU2VydmljZSB9IGZyb20gJy4uL0ZpbHRlclNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTmFtZXMgfSBmcm9tICcuLi9TZXJ2aWNlUmVnaXN0cnknO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbHRlclNlcnZpY2VJbXBsIGltcGxlbWVudHMgRmlsdGVyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgRklMVEVSX0VSUk9SOiBzdHJpbmcgPSAnRXJyb3IgQXBwbHlpbmcgRmlsdGVyOiAlMSc7XHJcbiAgcHJpdmF0ZSBfZGlzcGF0Y2hlcjogSW50ZXJuYWxBcGlEaXNwYXRjaGVyO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoZGlzcGF0Y2hlcjogSW50ZXJuYWxBcGlEaXNwYXRjaGVyKSB7XHJcbiAgICB0aGlzLl9kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2VydmljZU5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBTZXJ2aWNlTmFtZXMuRmlsdGVyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFwcGx5RmlsdGVyQXN5bmMoXHJcbiAgICB2aXN1YWxJZDogVmlzdWFsSWQsXHJcbiAgICBmaWVsZE5hbWU6IHN0cmluZyxcclxuICAgIHZhbHVlczogQXJyYXk8c3RyaW5nPixcclxuICAgIHVwZGF0ZVR5cGU6IENvbnRyYWN0LkZpbHRlclVwZGF0ZVR5cGUsXHJcbiAgICBmaWx0ZXJPcHRpb25zOiBDb250cmFjdC5GaWx0ZXJPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgaWYgKCFQYXJhbS5pc1ZhbGlkRW51bVZhbHVlPENvbnRyYWN0LkZpbHRlclVwZGF0ZVR5cGU+KHVwZGF0ZVR5cGUsIENvbnRyYWN0LkZpbHRlclVwZGF0ZVR5cGUpKSB7XHJcbiAgICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5pbnZhbGlkUGFyYW1WYWx1ZShbJ0ZpbHRlclVwZGF0ZVR5cGUnXSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdmVyYiA9IFZlcmJJZC5BcHBseUNhdGVnb3JpY2FsRmlsdGVyO1xyXG4gICAgICBjb25zdCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLlZpc3VhbElkXSA9IHZpc3VhbElkO1xyXG4gICAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLkZpZWxkTmFtZV0gPSBmaWVsZE5hbWU7XHJcbiAgICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuRmlsdGVyVmFsdWVzXSA9IHZhbHVlcztcclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5GaWx0ZXJVcGRhdGVUeXBlXSA9IHVwZGF0ZVR5cGU7XHJcbiAgICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuSXNFeGNsdWRlTW9kZV0gPVxyXG4gICAgICAgIChmaWx0ZXJPcHRpb25zID09PSB1bmRlZmluZWQgfHwgZmlsdGVyT3B0aW9ucy5pc0V4Y2x1ZGVNb2RlID09PSB1bmRlZmluZWQpID8gZmFsc2UgOiBmaWx0ZXJPcHRpb25zLmlzRXhjbHVkZU1vZGU7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5leGVjdXRlKHZlcmIsIHBhcmFtZXRlcnMpLnRoZW48c3RyaW5nPihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgY29uc3QgZXJyb3IgPSByZXNwb25zZS5yZXN1bHQgYXMgQ29tbWFuZEVycm9yO1xyXG4gICAgICAgIGlmICghKGVycm9yLmVycm9yQ29kZSA9PT0gbnVsbCB8fCBlcnJvci5lcnJvckNvZGUgPT09IHVuZGVmaW5lZCkpIHtcclxuICAgICAgICAgIC8vIFRPRE86IGNvbWUgYmFjayBhbmQgaW1wbGVtZW50IGVycm9yIGhhbmRsaW5nIGxvZ2ljXHJcbiAgICAgICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmVycm9yKEZpbHRlclNlcnZpY2VJbXBsLkZJTFRFUl9FUlJPUiwgW2Vycm9yLmVycm9yQ29kZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmllbGROYW1lO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgcHVibGljIGFwcGx5UmFuZ2VGaWx0ZXJBc3luYyh2aXN1YWxJZDogVmlzdWFsSWQsIGZpZWxkTmFtZTogc3RyaW5nLCBmaWx0ZXJPcHRpb25zOiBDb250cmFjdC5SYW5nZUZpbHRlck9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgaWYgKCFmaWx0ZXJPcHRpb25zKSB7XHJcbiAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24ubWlzc2luZ1BhcmFtZXRlcihbJ1JhbmdlRmlsdGVyT3B0aW9ucyddKTtcclxuICAgIH1cclxuICAgIFBhcmFtLnZlcmlmeVJhbmdlUGFyYW1UeXBlKGZpbHRlck9wdGlvbnMubWluLCBmaWx0ZXJPcHRpb25zLm1heCk7XHJcblxyXG4gICAgY29uc3QgdmVyYiA9IFZlcmJJZC5BcHBseVJhbmdlRmlsdGVyO1xyXG4gICAgY29uc3QgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMgPSB7fTtcclxuXHJcbiAgICBpZiAoZmlsdGVyT3B0aW9ucy5taW4pIHtcclxuICAgICAgbGV0IG1pbjogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgICBpZiAoZmlsdGVyT3B0aW9ucy5taW4gaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgbWluID0gUGFyYW0uc2VyaWFsaXplRGF0ZUZvclBsYXRmb3JtKGZpbHRlck9wdGlvbnMubWluKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBtaW4gPSBmaWx0ZXJPcHRpb25zLm1pbjtcclxuICAgICAgfVxyXG4gICAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLkZpbHRlclJhbmdlTWluXSA9IG1pbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZmlsdGVyT3B0aW9ucy5tYXgpIHtcclxuICAgICAgbGV0IG1heDogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgICBpZiAoZmlsdGVyT3B0aW9ucy5tYXggaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgbWF4ID0gUGFyYW0uc2VyaWFsaXplRGF0ZUZvclBsYXRmb3JtKGZpbHRlck9wdGlvbnMubWF4KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBtYXggPSBmaWx0ZXJPcHRpb25zLm1heDtcclxuICAgICAgfVxyXG4gICAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLkZpbHRlclJhbmdlTWF4XSA9IG1heDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZmlsdGVyT3B0aW9ucy5udWxsT3B0aW9uKSB7XHJcbiAgICAgIGlmICghUGFyYW0uaXNWYWxpZEVudW1WYWx1ZTxDb250cmFjdC5GaWx0ZXJOdWxsT3B0aW9uPihmaWx0ZXJPcHRpb25zLm51bGxPcHRpb24sIENvbnRyYWN0LkZpbHRlck51bGxPcHRpb24pKSB7XHJcbiAgICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5pbnZhbGlkUGFyYW1WYWx1ZShbJ051bGxPcHRpb24nXSk7XHJcbiAgICAgIH1cclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5GaWx0ZXJSYW5nZU51bGxPcHRpb25dID0gRXh0ZXJuYWxFbnVtQ29udmVydGVyLm51bGxPcHRpb25zLmNvbnZlcnQoZmlsdGVyT3B0aW9ucy5udWxsT3B0aW9uKTtcclxuICAgIH1cclxuICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuRmllbGROYW1lXSA9IGZpZWxkTmFtZTtcclxuICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuVmlzdWFsSWRdID0gdmlzdWFsSWQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZXhlY3V0ZSh2ZXJiLCBwYXJhbWV0ZXJzKS50aGVuPHN0cmluZz4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICByZXR1cm4gZmllbGROYW1lO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXJGaWx0ZXJBc3luYyh2aXN1YWxJZDogVmlzdWFsSWQsIGZpZWxkTmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIGNvbnN0IHZlcmIgPSBWZXJiSWQuQ2xlYXJGaWx0ZXI7XHJcbiAgICBsZXQgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMgPSB7fTtcclxuICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuVmlzdWFsSWRdID0gdmlzdWFsSWQ7XHJcbiAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLkZpZWxkTmFtZV0gPSBmaWVsZE5hbWU7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5leGVjdXRlKHZlcmIsIHBhcmFtZXRlcnMpLnRoZW48c3RyaW5nPihyZXNwb3NuZSA9PiB7XHJcbiAgICAgIHJldHVybiBmaWVsZE5hbWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRGaWx0ZXJzQXN5bmModmlzdWFsSWQ6IFZpc3VhbElkKTogUHJvbWlzZTxDb250cmFjdC5GaWx0ZXJbXT4ge1xyXG4gICAgY29uc3QgdmVyYiA9IFZlcmJJZC5HZXRGaWx0ZXJzO1xyXG4gICAgbGV0IHBhcmFtZXRlcnM6IEV4ZWN1dGVQYXJhbWV0ZXJzID0ge307XHJcbiAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLlZpc3VhbElkXSA9IHZpc3VhbElkO1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZXhlY3V0ZSh2ZXJiLCBwYXJhbWV0ZXJzKS50aGVuPENvbnRyYWN0LkZpbHRlcltdPihyZXNwb25zZSA9PiB7XHJcbiAgICAgIGxldCBmaWx0ZXJzID0gcmVzcG9uc2UucmVzdWx0IGFzIEludGVybmFsQ29udHJhY3QuRmlsdGVyW107XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnZlcnREb21haW5GaWx0ZXJzKGZpbHRlcnMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q2F0ZWdvcmljYWxEb21haW5Bc3luYyhcclxuICAgIHdvcmtzaGVldE5hbWU6IHN0cmluZyxcclxuICAgIGZpZWxkSWQ6IHN0cmluZyxcclxuICAgIGRvbWFpblR5cGU6IENvbnRyYWN0LkZpbHRlckRvbWFpblR5cGUpOiBQcm9taXNlPENvbnRyYWN0LkNhdGVnb3JpY2FsRG9tYWluPiB7XHJcbiAgICBpZiAoIVBhcmFtLmlzVmFsaWRFbnVtVmFsdWU8Q29udHJhY3QuRmlsdGVyRG9tYWluVHlwZT4oZG9tYWluVHlwZSwgQ29udHJhY3QuRmlsdGVyRG9tYWluVHlwZSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgRmlsdGVyRG9tYWluVHlwZScpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdmVyYiA9IFZlcmJJZC5HZXRDYXRlZ29yaWNhbERvbWFpbjtcclxuICAgIGxldCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5WaXN1YWxJZF0gPSB7XHJcbiAgICAgIHdvcmtzaGVldDogd29ya3NoZWV0TmFtZVxyXG4gICAgfTtcclxuICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuRmllbGRJZF0gPSBmaWVsZElkO1xyXG4gICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5Eb21haW5UeXBlXSA9IGRvbWFpblR5cGU7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5leGVjdXRlKHZlcmIsIHBhcmFtZXRlcnMpLnRoZW48Q29udHJhY3QuQ2F0ZWdvcmljYWxEb21haW4+KHJlc3BvbnNlID0+IHtcclxuICAgICAgbGV0IGRvbWFpbiA9IHJlc3BvbnNlLnJlc3VsdCBhcyBJbnRlcm5hbENvbnRyYWN0LkNhdGVnb3JpY2FsRG9tYWluO1xyXG4gICAgICByZXR1cm4gdGhpcy5jb252ZXJ0Q2F0ZWdvcmljYWxEb21haW4oZG9tYWluLCBkb21haW5UeXBlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFJhbmdlRG9tYWluQXN5bmMod29ya3NoZWV0TmFtZTogc3RyaW5nLCBmaWVsZElkOiBzdHJpbmcsIGRvbWFpblR5cGU6IENvbnRyYWN0LkZpbHRlckRvbWFpblR5cGUpOiBQcm9taXNlPENvbnRyYWN0LlJhbmdlRG9tYWluPiB7XHJcbiAgICBpZiAoIVBhcmFtLmlzVmFsaWRFbnVtVmFsdWU8Q29udHJhY3QuRmlsdGVyRG9tYWluVHlwZT4oZG9tYWluVHlwZSwgQ29udHJhY3QuRmlsdGVyRG9tYWluVHlwZSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgRmlsdGVyRG9tYWluVHlwZScpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdmVyYiA9IFZlcmJJZC5HZXRSYW5nZURvbWFpbjtcclxuICAgIGxldCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5WaXN1YWxJZF0gPSB7XHJcbiAgICAgIHdvcmtzaGVldDogd29ya3NoZWV0TmFtZVxyXG4gICAgfTtcclxuICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuRmllbGRJZF0gPSBmaWVsZElkO1xyXG4gICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5Eb21haW5UeXBlXSA9IEV4dGVybmFsRW51bUNvbnZlcnRlci5maWx0ZXJEb21haW5UeXBlLmNvbnZlcnQoZG9tYWluVHlwZSk7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5leGVjdXRlKHZlcmIsIHBhcmFtZXRlcnMpLnRoZW48Q29udHJhY3QuUmFuZ2VEb21haW4+KHJlc3BvbnNlID0+IHtcclxuICAgICAgbGV0IGRvbWFpbiA9IHJlc3BvbnNlLnJlc3VsdCBhcyBJbnRlcm5hbENvbnRyYWN0LlJhbmdlRG9tYWluO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuY29udmVydFJhbmdlRG9tYWluKGRvbWFpbiwgZG9tYWluVHlwZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIEhlbHBlciBNZXRob2RzXHJcbiAgcHJpdmF0ZSBjb252ZXJ0RG9tYWluRmlsdGVycyhkb21haW5GaWx0ZXJzOiBJbnRlcm5hbENvbnRyYWN0LkZpbHRlcltdKTogQ29udHJhY3QuRmlsdGVyW10ge1xyXG4gICAgbGV0IGZpbHRlcnM6IENvbnRyYWN0LkZpbHRlcltdID0gW107XHJcbiAgICBkb21haW5GaWx0ZXJzLmZvckVhY2goZG9tYWluRmlsdGVyID0+IHtcclxuICAgICAgc3dpdGNoIChkb21haW5GaWx0ZXIuZmlsdGVyVHlwZSkge1xyXG4gICAgICAgIGNhc2UgRmlsdGVyVHlwZS5DYXRlZ29yaWNhbDoge1xyXG4gICAgICAgICAgbGV0IGZpbHRlciA9IGRvbWFpbkZpbHRlciBhcyBJbnRlcm5hbENvbnRyYWN0LkNhdGVnb3JpY2FsRmlsdGVyO1xyXG4gICAgICAgICAgaWYgKGZpbHRlcikge1xyXG4gICAgICAgICAgICBmaWx0ZXJzLnB1c2godGhpcy5jb252ZXJ0Q2F0ZWdvcmljYWxGaWx0ZXIoZmlsdGVyKSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgQ2F0ZWdvcmljYWwgRmlsdGVyJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgRmlsdGVyVHlwZS5SYW5nZToge1xyXG4gICAgICAgICAgbGV0IGZpbHRlciA9IGRvbWFpbkZpbHRlciBhcyBJbnRlcm5hbENvbnRyYWN0LlJhbmdlRmlsdGVyO1xyXG4gICAgICAgICAgaWYgKGZpbHRlcikge1xyXG4gICAgICAgICAgICBmaWx0ZXJzLnB1c2godGhpcy5jb252ZXJ0UmFuZ2VGaWx0ZXIoZmlsdGVyKSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgUmFuZ2UgRmlsdGVyJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgRmlsdGVyVHlwZS5SZWxhdGl2ZURhdGU6IHtcclxuICAgICAgICAgIGxldCBmaWx0ZXIgPSBkb21haW5GaWx0ZXIgYXMgSW50ZXJuYWxDb250cmFjdC5SZWxhdGl2ZURhdGVGaWx0ZXI7XHJcbiAgICAgICAgICBpZiAoZmlsdGVyKSB7XHJcbiAgICAgICAgICAgIGZpbHRlcnMucHVzaCh0aGlzLmNvbnZlcnRSZWxhdGl2ZURhdGVGaWx0ZXIoZmlsdGVyKSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgUmVsYXRpdmUgRGF0ZSBGaWx0ZXInKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmaWx0ZXJzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb252ZXJ0Q2F0ZWdvcmljYWxGaWx0ZXIoZG9tYWluRmlsdGVyOiBJbnRlcm5hbENvbnRyYWN0LkNhdGVnb3JpY2FsRmlsdGVyKTogQ29udHJhY3QuQ2F0ZWdvcmljYWxGaWx0ZXIge1xyXG4gICAgbGV0IGFwcGxpZWRWYWx1ZXM6IENvbnRyYWN0LkRhdGFWYWx1ZVtdID0gZG9tYWluRmlsdGVyLnZhbHVlcy5tYXAoZHYgPT4ge1xyXG4gICAgICByZXR1cm4gbmV3IERhdGFWYWx1ZShkdi52YWx1ZSwgZHYuZm9ybWF0dGVkVmFsdWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBDYXRlZ29yaWNhbEZpbHRlcihcclxuICAgICAgZG9tYWluRmlsdGVyLnZpc3VhbElkLndvcmtzaGVldCxcclxuICAgICAgZG9tYWluRmlsdGVyLmZpZWxkQ2FwdGlvbixcclxuICAgICAgZG9tYWluRmlsdGVyLmZpZWxkTmFtZSxcclxuICAgICAgQ29udHJhY3QuRmlsdGVyVHlwZS5DYXRlZ29yaWNhbCxcclxuICAgICAgYXBwbGllZFZhbHVlcyxcclxuICAgICAgZG9tYWluRmlsdGVyLmlzRXhjbHVkZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbnZlcnRSYW5nZUZpbHRlcihkb21haW5GaWx0ZXI6IEludGVybmFsQ29udHJhY3QuUmFuZ2VGaWx0ZXIpOiBDb250cmFjdC5SYW5nZUZpbHRlciB7XHJcbiAgICBsZXQgbWluVmFsdWU6IERhdGFWYWx1ZSA9IG5ldyBEYXRhVmFsdWUoZG9tYWluRmlsdGVyLm1pbi52YWx1ZSwgZG9tYWluRmlsdGVyLm1pbi5mb3JtYXR0ZWRWYWx1ZSk7XHJcbiAgICBsZXQgbWF4VmFsdWU6IERhdGFWYWx1ZSA9IG5ldyBEYXRhVmFsdWUoZG9tYWluRmlsdGVyLm1heC52YWx1ZSwgZG9tYWluRmlsdGVyLm1heC5mb3JtYXR0ZWRWYWx1ZSk7XHJcbiAgICByZXR1cm4gbmV3IFJhbmdlRmlsdGVyKFxyXG4gICAgICBkb21haW5GaWx0ZXIudmlzdWFsSWQud29ya3NoZWV0LFxyXG4gICAgICBkb21haW5GaWx0ZXIuZmllbGRDYXB0aW9uLFxyXG4gICAgICBkb21haW5GaWx0ZXIuZmllbGROYW1lLFxyXG4gICAgICBDb250cmFjdC5GaWx0ZXJUeXBlLlJhbmdlLFxyXG4gICAgICBtaW5WYWx1ZSxcclxuICAgICAgbWF4VmFsdWUsXHJcbiAgICAgIGRvbWFpbkZpbHRlci5pbmNsdWRlTnVsbFZhbHVlc1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29udmVydFJlbGF0aXZlRGF0ZUZpbHRlcihkb21haW5GaWx0ZXI6IEludGVybmFsQ29udHJhY3QuUmVsYXRpdmVEYXRlRmlsdGVyKTogQ29udHJhY3QuUmVsYXRpdmVEYXRlRmlsdGVyIHtcclxuICAgIGxldCBhbmNob3JEYXRlVmFsdWU6IERhdGFWYWx1ZSA9IG5ldyBEYXRhVmFsdWUoZG9tYWluRmlsdGVyLmFuY2hvckRhdGUudmFsdWUsIGRvbWFpbkZpbHRlci5hbmNob3JEYXRlLmZvcm1hdHRlZFZhbHVlKTtcclxuICAgIHJldHVybiBuZXcgUmVsYXRpdmVEYXRlRmlsdGVyIChcclxuICAgICAgZG9tYWluRmlsdGVyLnZpc3VhbElkLndvcmtzaGVldCxcclxuICAgICAgZG9tYWluRmlsdGVyLmZpZWxkQ2FwdGlvbixcclxuICAgICAgZG9tYWluRmlsdGVyLmZpZWxkTmFtZSxcclxuICAgICAgQ29udHJhY3QuRmlsdGVyVHlwZS5SZWxhdGl2ZURhdGUsXHJcbiAgICAgIGFuY2hvckRhdGVWYWx1ZSxcclxuICAgICAgSW50ZXJuYWxFbnVtQ29udmVydGVyLmRhdGVTdGVwUGVyaW9kLmNvbnZlcnQoZG9tYWluRmlsdGVyLnBlcmlvZFR5cGUpLFxyXG4gICAgICBJbnRlcm5hbEVudW1Db252ZXJ0ZXIuZGF0ZVJhbmdlVHlwZS5jb252ZXJ0KGRvbWFpbkZpbHRlci5yYW5nZVR5cGUpLFxyXG4gICAgICBkb21haW5GaWx0ZXIucmFuZ2VOXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb252ZXJ0Q2F0ZWdvcmljYWxEb21haW4oXHJcbiAgICBkb21haW46IEludGVybmFsQ29udHJhY3QuQ2F0ZWdvcmljYWxEb21haW4sXHJcbiAgICBkb21haW5UeXBlOiBDb250cmFjdC5GaWx0ZXJEb21haW5UeXBlKTogQ29udHJhY3QuQ2F0ZWdvcmljYWxEb21haW4ge1xyXG4gICAgbGV0IHZhbHVlczogRGF0YVZhbHVlW10gPSBkb21haW4udmFsdWVzLm1hcCgoZG9tYWluRHYpID0+IHtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRhVmFsdWUoZG9tYWluRHYudmFsdWUsIGRvbWFpbkR2LmZvcm1hdHRlZFZhbHVlKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG5ldyBDYXRlZ29yaWNhbERvbWFpbih2YWx1ZXMsIGRvbWFpblR5cGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb252ZXJ0UmFuZ2VEb21haW4oZG9tYWluOiBJbnRlcm5hbENvbnRyYWN0LlJhbmdlRG9tYWluLCBkb21haW5UeXBlOiBDb250cmFjdC5GaWx0ZXJEb21haW5UeXBlKTogQ29udHJhY3QuUmFuZ2VEb21haW4ge1xyXG4gICAgbGV0IG1pbjogRGF0YVZhbHVlID0gbmV3IERhdGFWYWx1ZShkb21haW4ubWluLnZhbHVlLCBkb21haW4ubWluLmZvcm1hdHRlZFZhbHVlKTtcclxuICAgIGxldCBtYXg6IERhdGFWYWx1ZSA9IG5ldyBEYXRhVmFsdWUoZG9tYWluLm1heC52YWx1ZSwgZG9tYWluLm1heC5mb3JtYXR0ZWRWYWx1ZSk7XHJcbiAgICByZXR1cm4gbmV3IFJhbmdlRG9tYWluKFxyXG4gICAgICBtaW4sXHJcbiAgICAgIG1heCxcclxuICAgICAgZG9tYWluVHlwZVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1NlcnZpY2VzL2ltcGwvRmlsdGVyU2VydmljZUltcGwudHNcbiAqKi8iLCJpbXBvcnQge1xyXG4gIEZpbHRlckRvbWFpblR5cGUgYXMgRXh0ZXJuYWxEb21haW5UeXBlLFxyXG4gIEZpbHRlck51bGxPcHRpb24gYXMgRXh0ZXJuYWxOdWxsT3B0aW9uXHJcbn0gZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHtcclxuICBGaWx0ZXJEb21haW5UeXBlIGFzIEludGVybmFsRG9tYWluVHlwZSxcclxuICBGaWx0ZXJOdWxsT3B0aW9uIGFzIEludGVybmFsTnVsbE9wdGlvblxyXG59IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5pbXBvcnQgeyBFbnVtQ29udmVydGVyIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXV0aWxzJztcclxuXHJcbi8qIHRzbGludDpkaXNhYmxlOnR5cGVkZWYgLSBEaXNhYmxlIHRoaXMgdG8gbWFrZSBkZWNsYXJpbmcgdGhlc2UgY2xhc3NlcyBhIGJpdCBlYXNpZXIgKi9cclxuLyoqXHJcbiAqIE1hcHMgZW51bXMgdXNlZCBieSB0aGUgZXh0ZXJuYWwtYXBpLWNvbnRyYWN0IHRvIHRoZSBlbnVtcyB1c2VkXHJcbiAqIGluIHRoZSBpbnRlcm5hbC1hcGktY29udHJhY3QsIHdoaWNoIGRldmVsb3BlcnMgY29kZSBhZ2FpbnN0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEV4dGVybmFsVG9JbnRlcm5hbEVudW1NYXBwaW5ncyB7XHJcbiAgcHVibGljIHN0YXRpYyBudWxsT3B0aW9ucyA9IG5ldyBFbnVtQ29udmVydGVyPEV4dGVybmFsTnVsbE9wdGlvbiwgSW50ZXJuYWxOdWxsT3B0aW9uPih7XHJcbiAgICBbRXh0ZXJuYWxOdWxsT3B0aW9uLkFsbFZhbHVlc106IEludGVybmFsTnVsbE9wdGlvbi5BbGxWYWx1ZXMsXHJcbiAgICBbRXh0ZXJuYWxOdWxsT3B0aW9uLk5vbk51bGxWYWx1ZXNdOiBJbnRlcm5hbE51bGxPcHRpb24uTm9uTnVsbFZhbHVlcyxcclxuICAgIFtFeHRlcm5hbE51bGxPcHRpb24uTm9uTnVsbFZhbHVlc106IEludGVybmFsTnVsbE9wdGlvbi5OdWxsVmFsdWVzXHJcbiAgfSk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZmlsdGVyRG9tYWluVHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEV4dGVybmFsRG9tYWluVHlwZSwgSW50ZXJuYWxEb21haW5UeXBlPih7XHJcbiAgICBbRXh0ZXJuYWxEb21haW5UeXBlLlJlbGV2YW50XTogSW50ZXJuYWxEb21haW5UeXBlLlJlbGV2YW50LFxyXG4gICAgW0V4dGVybmFsRG9tYWluVHlwZS5EYXRhYmFzZV06IEludGVybmFsRG9tYWluVHlwZS5EYXRhYmFzZVxyXG4gIH0pO1xyXG59XHJcbi8qIHRzbGludDplbmFibGU6dHlwZWRlZiAqL1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRW51bU1hcHBpbmdzL0V4dGVybmFsVG9JbnRlcm5hbEVudW1NYXBwaW5ncy50c1xuICoqLyIsImltcG9ydCB7XHJcbiAgQ29sdW1uVHlwZSBhcyBFeHRlcm5hbENvbHVtblR5cGUsXHJcbiAgRGFzaGJvYXJkT2JqZWN0VHlwZSBhcyBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUsXHJcbiAgRGF0YVR5cGUgYXMgRXh0ZXJuYWxEYXRhVHlwZSxcclxuICBEYXRlUmFuZ2VUeXBlIGFzIEV4dGVybmFsRGF0ZVJhbmdlVHlwZSxcclxuICBFeHRlbnNpb25Db250ZXh0IGFzIEV4dGVybmFsRXh0ZW5zaW9uc0NvbnRleHQsXHJcbiAgRXh0ZW5zaW9uTW9kZSBhcyBFeHRlcm5hbEV4dGVuc2lvbnNNb2RlLFxyXG4gIEZpZWxkQWdncmVnYXRpb25UeXBlIGFzIEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUsXHJcbiAgRmllbGRSb2xlVHlwZSBhcyBFeHRlcm5hbEZpZWxkUm9sZVR5cGUsXHJcbiAgRmlsdGVyVHlwZSBhcyBFeHRlcm5hbEZpbHRlclR5cGUsXHJcbiAgRmlsdGVyVXBkYXRlVHlwZSBhcyBFeHRlcm5hbEZpbHRlclVwZGF0ZVR5cGUsXHJcbiAgUGFyYW1ldGVyVmFsdWVUeXBlIGFzIEV4dGVybmFsUGFyYW1ldGVyVmFsdWVUeXBlLFxyXG4gIFBlcmlvZFR5cGUgYXMgRXh0ZXJuYWxEYXRlUGVyaW9kLFxyXG4gIFNoZWV0VHlwZSBhcyBFeHRlcm5hbFNoZWV0VHlwZSxcclxufSBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHtcclxuICBDb2x1bW5UeXBlIGFzIEludGVybmFsQ29sdW1uVHlwZSxcclxuICBEYXNoYm9hcmRPYmplY3RUeXBlIGFzIEludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZSxcclxuICBEYXRhVHlwZSBhcyBJbnRlcm5hbERhdGFUeXBlLFxyXG4gIERhdGVSYW5nZVR5cGUgYXMgSW50ZXJuYWxEYXRlUmFuZ2VUeXBlLFxyXG4gIERhdGVTdGVwUGVyaW9kIGFzIEludGVybmFsRGF0ZVN0ZXBQZXJpb2QsXHJcbiAgRG9tYWluUmVzdHJpY3Rpb25UeXBlIGFzIEludGVybmFsRG9tYWluUmVzdHJpY3Rpb25UeXBlLFxyXG4gIEV4dGVuc2lvbkNvbnRleHQgYXMgSW50ZXJuYWxFeHRlbnNpb25zQ29udGV4dCxcclxuICBFeHRlbnNpb25Nb2RlIGFzIEludGVybmFsRXh0ZW5zaW9uc01vZGUsXHJcbiAgRmllbGRBZ2dyZWdhdGlvblR5cGUgYXMgSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZSxcclxuICBGaWVsZFJvbGVUeXBlIGFzIEludGVybmFsRmllbGRSb2xlVHlwZSxcclxuICBGaWx0ZXJUeXBlIGFzIEludGVybmFsRmlsdGVyVHlwZSxcclxuICBGaWx0ZXJVcGRhdGVUeXBlIGFzIEludGVybmFsRmlsdGVyVXBkYXRlVHlwZSxcclxuICBTaGVldFR5cGUgYXMgSW50ZXJuYWxTaGVldFR5cGUsXHJcbn0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IEVudW1Db252ZXJ0ZXIgfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuLyogdHNsaW50OmRpc2FibGU6dHlwZWRlZiAtIERpc2FibGUgdGhpcyB0byBtYWtlIGRlY2xhcmluZyB0aGVzZSBjbGFzc2VzIGEgYml0IGVhc2llciAqL1xyXG4vKipcclxuICogTWFwcyBlbnVtcyB1c2VkIGJ5IHRoZSBpbnRlcm5hbC1hcGktY29udHJhY3QgdG8gdGhlIGVudW1zIHVzZWRcclxuICogaW4gdGhlIGV4dGVybmFsLWFwaS1jb250cmFjdCwgd2hpY2ggZGV2ZWxvcGVycyBjb2RlIGFnYWluc3QuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzIHtcclxuICBwdWJsaWMgc3RhdGljIGV4dGVuc2lvbkNvbnRleHQgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbEV4dGVuc2lvbnNDb250ZXh0LCBFeHRlcm5hbEV4dGVuc2lvbnNDb250ZXh0Pih7XHJcbiAgICBbSW50ZXJuYWxFeHRlbnNpb25zQ29udGV4dC5EZXNrdG9wXTogRXh0ZXJuYWxFeHRlbnNpb25zQ29udGV4dC5EZXNrdG9wLFxyXG4gICAgW0ludGVybmFsRXh0ZW5zaW9uc0NvbnRleHQuU2VydmVyXTogRXh0ZXJuYWxFeHRlbnNpb25zQ29udGV4dC5TZXJ2ZXJcclxuICB9KTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBleHRlbnNpb25Nb2RlID0gbmV3IEVudW1Db252ZXJ0ZXI8SW50ZXJuYWxFeHRlbnNpb25zTW9kZSwgRXh0ZXJuYWxFeHRlbnNpb25zTW9kZT4oe1xyXG4gICAgW0ludGVybmFsRXh0ZW5zaW9uc01vZGUuQXV0aG9yaW5nXTogRXh0ZXJuYWxFeHRlbnNpb25zTW9kZS5BdXRob3JpbmcsXHJcbiAgICBbSW50ZXJuYWxFeHRlbnNpb25zTW9kZS5WaWV3aW5nXTogRXh0ZXJuYWxFeHRlbnNpb25zTW9kZS5WaWV3aW5nXHJcbiAgfSk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY29sdW1uVHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsQ29sdW1uVHlwZSwgRXh0ZXJuYWxDb2x1bW5UeXBlPih7XHJcbiAgICBbSW50ZXJuYWxDb2x1bW5UeXBlLkNvbnRpbnVvdXNdOiBFeHRlcm5hbENvbHVtblR5cGUuQ29udGludW91cyxcclxuICAgIFtJbnRlcm5hbENvbHVtblR5cGUuRGlzY3JldGVdOiBFeHRlcm5hbENvbHVtblR5cGUuRGlzY3JldGVcclxuICB9KTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBmaWVsZEFnZ3JlZ2F0aW9uVHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUsIEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGU+KHtcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkF0dHJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkF0dHIsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5BdmddOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkF2ZyxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkNvdW50XTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Db3VudCxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkNvdW50ZF06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuQ291bnRkLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuRGF5XTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5EYXksXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5FbmRdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkVuZCxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkhvdXJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkhvdXIsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Jbk91dF06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuSW5PdXQsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5LdXJ0b3Npc106IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuS3VydG9zaXMsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5NYXhdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLk1heCxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLk1keV06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTWR5LFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTWVkaWFuXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5NZWRpYW4sXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5NaW5dOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLk1pbixcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLk1pbnV0ZV06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTWludXRlLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTW9udGhZZWFyXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Nb250aFllYXIsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Ob25lXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Ob25lLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuUXRyXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5RdHIsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5RdWFydDFdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlF1YXJ0MSxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlF1YXJ0M106IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuUXVhcnQzLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuU2Vjb25kXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5TZWNvbmQsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Ta2V3bmVzc106IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuU2tld25lc3MsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5TdGRldl06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuU3RkZXYsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5TdGRldnBdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlN0ZGV2cCxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlN1bV06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuU3VtLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNEYXldOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlRydW5jRGF5LFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNIb3VyXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY0hvdXIsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY01pbnV0ZV06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNNaW51dGUsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY01vbnRoXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY01vbnRoLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNRdHJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlRydW5jUXRyLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNTZWNvbmRdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlRydW5jU2Vjb25kLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNXZWVrXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY1dlZWssXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY1llYXJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlRydW5jWWVhcixcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlVzZXJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlVzZXIsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5WYXJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlZhcixcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlZhcnBdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlZhcnAsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5XZWVrXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5XZWVrLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuV2Vla2RheV06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuV2Vla2RheSxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlllYXJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlllYXIsXHJcbiAgfSk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZmllbGRSb2xlVHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsRmllbGRSb2xlVHlwZSwgRXh0ZXJuYWxGaWVsZFJvbGVUeXBlPih7XHJcbiAgICBbSW50ZXJuYWxGaWVsZFJvbGVUeXBlLkRpbWVuc2lvbl06IEV4dGVybmFsRmllbGRSb2xlVHlwZS5EaW1lbnNpb24sXHJcbiAgICBbSW50ZXJuYWxGaWVsZFJvbGVUeXBlLk1lYXN1cmVdOiBFeHRlcm5hbEZpZWxkUm9sZVR5cGUuTWVhc3VyZSxcclxuICAgIFtJbnRlcm5hbEZpZWxkUm9sZVR5cGUuVW5rbm93bl06IEV4dGVybmFsRmllbGRSb2xlVHlwZS5Vbmtub3duLFxyXG4gIH0pO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIHNoZWV0VHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsU2hlZXRUeXBlLCBFeHRlcm5hbFNoZWV0VHlwZT4oe1xyXG4gICAgW0ludGVybmFsU2hlZXRUeXBlLkRhc2hib2FyZF06IEV4dGVybmFsU2hlZXRUeXBlLkRhc2hib2FyZCxcclxuICAgIFtJbnRlcm5hbFNoZWV0VHlwZS5TdG9yeV06IEV4dGVybmFsU2hlZXRUeXBlLlN0b3J5LFxyXG4gICAgW0ludGVybmFsU2hlZXRUeXBlLldvcmtzaGVldF06IEV4dGVybmFsU2hlZXRUeXBlLldvcmtzaGVldFxyXG4gIH0pO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGRhc2hib2FyZE9iamVjdFR5cGUgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUsIEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZT4oe1xyXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5FeHRlbnNpb25dOiBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuRXh0ZW5zaW9uLFxyXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5CbGFua106IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5CbGFuayxcclxuICAgIFtJbnRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuSW1hZ2VdOiBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuSW1hZ2UsXHJcbiAgICBbSW50ZXJuYWxEYXNoYm9hcmRPYmplY3RUeXBlLkxlZ2VuZF06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5MZWdlbmQsXHJcbiAgICBbSW50ZXJuYWxEYXNoYm9hcmRPYmplY3RUeXBlLlBhZ2VGaWx0ZXJdOiBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuUGFnZUZpbHRlcixcclxuICAgIFtJbnRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuUGFyYW1ldGVyQ29udHJvbF06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5QYXJhbWV0ZXJDb250cm9sLFxyXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5RdWlja0ZpbHRlcl06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5RdWlja0ZpbHRlcixcclxuICAgIFtJbnRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuVGV4dF06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5UZXh0LFxyXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5UaXRsZV06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5UaXRsZSxcclxuICAgIFtJbnRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuV2ViUGFnZV06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5XZWJQYWdlLFxyXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5Xb3Jrc2hlZXRdOiBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuV29ya3NoZWV0XHJcbiAgfSk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZGF0YVR5cGUgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbERhdGFUeXBlLCBFeHRlcm5hbERhdGFUeXBlPih7XHJcbiAgICBbSW50ZXJuYWxEYXRhVHlwZS5Cb29sXTogRXh0ZXJuYWxEYXRhVHlwZS5Cb29sLFxyXG4gICAgW0ludGVybmFsRGF0YVR5cGUuRGF0ZV06IEV4dGVybmFsRGF0YVR5cGUuRGF0ZSxcclxuICAgIFtJbnRlcm5hbERhdGFUeXBlLkRhdGVUaW1lXTogRXh0ZXJuYWxEYXRhVHlwZS5EYXRlVGltZSxcclxuICAgIFtJbnRlcm5hbERhdGFUeXBlLkZsb2F0XTogRXh0ZXJuYWxEYXRhVHlwZS5GbG9hdCxcclxuICAgIFtJbnRlcm5hbERhdGFUeXBlLkludF06IEV4dGVybmFsRGF0YVR5cGUuSW50LFxyXG4gICAgW0ludGVybmFsRGF0YVR5cGUuU3RyaW5nXTogRXh0ZXJuYWxEYXRhVHlwZS5TdHJpbmdcclxuICB9KTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBmaWx0ZXJVcGRhdGVUeXBlID0gbmV3IEVudW1Db252ZXJ0ZXI8SW50ZXJuYWxGaWx0ZXJVcGRhdGVUeXBlLCBFeHRlcm5hbEZpbHRlclVwZGF0ZVR5cGU+KHtcclxuICAgIFtJbnRlcm5hbEZpbHRlclVwZGF0ZVR5cGUuQWRkXTogRXh0ZXJuYWxGaWx0ZXJVcGRhdGVUeXBlLkFkZCxcclxuICAgIFtJbnRlcm5hbEZpbHRlclVwZGF0ZVR5cGUuQWxsXTogRXh0ZXJuYWxGaWx0ZXJVcGRhdGVUeXBlLkFsbCxcclxuICAgIFtJbnRlcm5hbEZpbHRlclVwZGF0ZVR5cGUuUmVtb3ZlXTogRXh0ZXJuYWxGaWx0ZXJVcGRhdGVUeXBlLlJlbW92ZSxcclxuICAgIFtJbnRlcm5hbEZpbHRlclVwZGF0ZVR5cGUuUmVwbGFjZV06IEV4dGVybmFsRmlsdGVyVXBkYXRlVHlwZS5SZXBsYWNlXHJcbiAgfSk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYWxsb3dhYmxlVmFsdWVzID0gbmV3IEVudW1Db252ZXJ0ZXI8SW50ZXJuYWxEb21haW5SZXN0cmljdGlvblR5cGUsIEV4dGVybmFsUGFyYW1ldGVyVmFsdWVUeXBlPih7XHJcbiAgICBbSW50ZXJuYWxEb21haW5SZXN0cmljdGlvblR5cGUuQWxsXTogRXh0ZXJuYWxQYXJhbWV0ZXJWYWx1ZVR5cGUuQWxsLFxyXG4gICAgW0ludGVybmFsRG9tYWluUmVzdHJpY3Rpb25UeXBlLkxpc3RdOiBFeHRlcm5hbFBhcmFtZXRlclZhbHVlVHlwZS5MaXN0LFxyXG4gICAgW0ludGVybmFsRG9tYWluUmVzdHJpY3Rpb25UeXBlLlJhbmdlXTogRXh0ZXJuYWxQYXJhbWV0ZXJWYWx1ZVR5cGUuUmFuZ2VcclxuICB9KTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBkYXRlU3RlcFBlcmlvZCA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsRGF0ZVN0ZXBQZXJpb2QsIEV4dGVybmFsRGF0ZVBlcmlvZD4oe1xyXG4gICAgW0ludGVybmFsRGF0ZVN0ZXBQZXJpb2QuWWVhcnNdOiBFeHRlcm5hbERhdGVQZXJpb2QuWWVhcnMsXHJcbiAgICBbSW50ZXJuYWxEYXRlU3RlcFBlcmlvZC5RdWFydGVyc106IEV4dGVybmFsRGF0ZVBlcmlvZC5RdWFydGVycyxcclxuICAgIFtJbnRlcm5hbERhdGVTdGVwUGVyaW9kLk1vbnRoc106IEV4dGVybmFsRGF0ZVBlcmlvZC5Nb250aHMsXHJcbiAgICBbSW50ZXJuYWxEYXRlU3RlcFBlcmlvZC5XZWVrc106IEV4dGVybmFsRGF0ZVBlcmlvZC5XZWVrcyxcclxuICAgIFtJbnRlcm5hbERhdGVTdGVwUGVyaW9kLkRheXNdOiBFeHRlcm5hbERhdGVQZXJpb2QuRGF5cyxcclxuICAgIFtJbnRlcm5hbERhdGVTdGVwUGVyaW9kLkhvdXJzXTogRXh0ZXJuYWxEYXRlUGVyaW9kLkhvdXJzLFxyXG4gICAgW0ludGVybmFsRGF0ZVN0ZXBQZXJpb2QuTWludXRlc106IEV4dGVybmFsRGF0ZVBlcmlvZC5NaW51dGVzLFxyXG4gICAgW0ludGVybmFsRGF0ZVN0ZXBQZXJpb2QuU2Vjb25kc106IEV4dGVybmFsRGF0ZVBlcmlvZC5TZWNvbmRzXHJcbiAgfSk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZGF0ZVJhbmdlVHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsRGF0ZVJhbmdlVHlwZSwgRXh0ZXJuYWxEYXRlUmFuZ2VUeXBlPih7XHJcbiAgICBbSW50ZXJuYWxEYXRlUmFuZ2VUeXBlLkN1cnJlbnRdOiBFeHRlcm5hbERhdGVSYW5nZVR5cGUuQ3VycmVudCxcclxuICAgIFtJbnRlcm5hbERhdGVSYW5nZVR5cGUuTGFzdF06IEV4dGVybmFsRGF0ZVJhbmdlVHlwZS5MYXN0LFxyXG4gICAgW0ludGVybmFsRGF0ZVJhbmdlVHlwZS5MYXN0Tl06IEV4dGVybmFsRGF0ZVJhbmdlVHlwZS5MYXN0TixcclxuICAgIFtJbnRlcm5hbERhdGVSYW5nZVR5cGUuTmV4dF06IEV4dGVybmFsRGF0ZVJhbmdlVHlwZS5OZXh0LFxyXG4gICAgW0ludGVybmFsRGF0ZVJhbmdlVHlwZS5OZXh0Tl06IEV4dGVybmFsRGF0ZVJhbmdlVHlwZS5OZXh0TixcclxuICAgIFtJbnRlcm5hbERhdGVSYW5nZVR5cGUuVG9EYXRlXTogRXh0ZXJuYWxEYXRlUmFuZ2VUeXBlLlRvRGF0ZVxyXG4gIH0pO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGZpbHRlclR5cGUgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbEZpbHRlclR5cGUsIEV4dGVybmFsRmlsdGVyVHlwZT4oe1xyXG4gICAgW0ludGVybmFsRmlsdGVyVHlwZS5DYXRlZ29yaWNhbF06IEV4dGVybmFsRmlsdGVyVHlwZS5DYXRlZ29yaWNhbCxcclxuICAgIFtJbnRlcm5hbEZpbHRlclR5cGUuUmFuZ2VdIDogRXh0ZXJuYWxGaWx0ZXJUeXBlLlJhbmdlLFxyXG4gICAgW0ludGVybmFsRmlsdGVyVHlwZS5SZWxhdGl2ZURhdGVdOiBFeHRlcm5hbEZpbHRlclR5cGUuUmVsYXRpdmVEYXRlLFxyXG4gICAgW0ludGVybmFsRmlsdGVyVHlwZS5IaWVyYXJjaGljYWxdOiBFeHRlcm5hbEZpbHRlclR5cGUuSGllcmFyY2hpY2FsXHJcbiAgfSk7XHJcbn1cclxuLyogdHNsaW50OmVuYWJsZTp0eXBlZGVmICovXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9FbnVtTWFwcGluZ3MvSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9TZXJ2aWNlcy9GaWx0ZXJTZXJ2aWNlJztcclxuaW1wb3J0IHsgQXBpU2VydmljZVJlZ2lzdHJ5LCBTZXJ2aWNlTmFtZXMgfSBmcm9tICcuLi9TZXJ2aWNlcy9TZXJ2aWNlUmVnaXN0cnknO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbHRlciBpbXBsZW1lbnRzIENvbnRyYWN0LkZpbHRlciB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIF93b3Jrc2hlZXROYW1lOiBzdHJpbmcsXHJcbiAgICBwcm90ZWN0ZWQgX2ZpZWxkTmFtZTogc3RyaW5nLFxyXG4gICAgcHJvdGVjdGVkIF9maWx0ZXJUeXBlOiBDb250cmFjdC5GaWx0ZXJUeXBlLFxyXG4gICAgcHJvdGVjdGVkIF9maWVsZElkOiBzdHJpbmcpIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgd29ya3NoZWV0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dvcmtzaGVldE5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGZpZWxkTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkTmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZmllbGRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkSWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGZpbHRlclR5cGUoKTogQ29udHJhY3QuRmlsdGVyVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVyVHlwZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRGaWVsZEFzeW5jKCk6IFByb21pc2U8Q29udHJhY3QuRmllbGQ+IHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZCcpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENhdGVnb3JpY2FsRmlsdGVyIGV4dGVuZHMgRmlsdGVyIGltcGxlbWVudHMgQ29udHJhY3QuQ2F0ZWdvcmljYWxGaWx0ZXIge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIHdvcmtzaGVldE5hbWU6IHN0cmluZyxcclxuICAgIGZpZWxkTmFtZTogc3RyaW5nLFxyXG4gICAgZmllbGRJZDogc3RyaW5nLFxyXG4gICAgZmlsdGVyVHlwZTogQ29udHJhY3QuRmlsdGVyVHlwZSxcclxuICAgIHByaXZhdGUgX2FwcGxpZWRWYWx1ZXM6IENvbnRyYWN0LkRhdGFWYWx1ZVtdLFxyXG4gICAgcHJpdmF0ZSBfaXNFeGNsdWRlTW9kZTogYm9vbGVhbikge1xyXG4gICAgICBzdXBlcih3b3Jrc2hlZXROYW1lLCBmaWVsZE5hbWUsIGZpbHRlclR5cGUsIGZpZWxkSWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBhcHBsaWVkVmFsdWVzKCk6IENvbnRyYWN0LkRhdGFWYWx1ZVtdIHtcclxuICAgIHJldHVybiB0aGlzLl9hcHBsaWVkVmFsdWVzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc0V4Y2x1ZGVNb2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lzRXhjbHVkZU1vZGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RG9tYWluQXN5bmMoZG9tYWluVHlwZT86IENvbnRyYWN0LkZpbHRlckRvbWFpblR5cGUpOiBQcm9taXNlPENvbnRyYWN0LkNhdGVnb3JpY2FsRG9tYWluPiB7XHJcbiAgICBpZiAoIWRvbWFpblR5cGUpIHtcclxuICAgICAgZG9tYWluVHlwZSA9IENvbnRyYWN0LkZpbHRlckRvbWFpblR5cGUuUmVsZXZhbnQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8RmlsdGVyU2VydmljZT4oU2VydmljZU5hbWVzLkZpbHRlcik7XHJcbiAgICByZXR1cm4gc2VydmljZS5nZXRDYXRlZ29yaWNhbERvbWFpbkFzeW5jKHRoaXMuX3dvcmtzaGVldE5hbWUsIHRoaXMuX2ZpZWxkSWQsIGRvbWFpblR5cGUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJhbmdlRmlsdGVyIGV4dGVuZHMgRmlsdGVyIGltcGxlbWVudHMgQ29udHJhY3QuUmFuZ2VGaWx0ZXIge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIHdvcmtzaGVldE5hbWU6IHN0cmluZyxcclxuICAgIGZpZWxkTmFtZTogc3RyaW5nLFxyXG4gICAgZmllbGRJZDogc3RyaW5nLFxyXG4gICAgZmlsdGVyVHlwZTogQ29udHJhY3QuRmlsdGVyVHlwZSxcclxuICAgIHByaXZhdGUgX21pbjogQ29udHJhY3QuRGF0YVZhbHVlLFxyXG4gICAgcHJpdmF0ZSBfbWF4OiBDb250cmFjdC5EYXRhVmFsdWUsXHJcbiAgICBwcml2YXRlIF9pbmNsdWRlTnVsbFZhbHVlczogYm9vbGVhbikge1xyXG4gICAgICBzdXBlcih3b3Jrc2hlZXROYW1lLCBmaWVsZE5hbWUsIGZpbHRlclR5cGUsIGZpZWxkSWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBtaW5WYWx1ZSgpOiBDb250cmFjdC5EYXRhVmFsdWUge1xyXG4gICAgcmV0dXJuIHRoaXMuX21pbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbWF4VmFsdWUoKTogQ29udHJhY3QuRGF0YVZhbHVlIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGluY2x1ZGVOdWxsVmFsdWVzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luY2x1ZGVOdWxsVmFsdWVzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljICBnZXREb21haW5Bc3luYyhkb21haW5UeXBlPzogQ29udHJhY3QuRmlsdGVyRG9tYWluVHlwZSk6IFByb21pc2U8Q29udHJhY3QuUmFuZ2VEb21haW4+IHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxGaWx0ZXJTZXJ2aWNlPihTZXJ2aWNlTmFtZXMuRmlsdGVyKTtcclxuICAgIGlmICghZG9tYWluVHlwZSkge1xyXG4gICAgICBkb21haW5UeXBlID0gQ29udHJhY3QuRmlsdGVyRG9tYWluVHlwZS5SZWxldmFudDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZXJ2aWNlLmdldFJhbmdlRG9tYWluQXN5bmModGhpcy5fd29ya3NoZWV0TmFtZSwgdGhpcy5fZmllbGRJZCwgZG9tYWluVHlwZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVsYXRpdmVEYXRlRmlsdGVyIGV4dGVuZHMgRmlsdGVyIGltcGxlbWVudHMgQ29udHJhY3QuUmVsYXRpdmVEYXRlRmlsdGVyIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICB3b3Jrc2hlZXROYW1lOiBzdHJpbmcsXHJcbiAgICBmaWVsZE5hbWU6IHN0cmluZyxcclxuICAgIGZpZWxkSWQ6IHN0cmluZyxcclxuICAgIGZpbHRlclR5cGU6IENvbnRyYWN0LkZpbHRlclR5cGUsXHJcbiAgICBwcml2YXRlIF9hbmNob3JEYXRlOiBDb250cmFjdC5EYXRhVmFsdWUsXHJcbiAgICBwcml2YXRlIF9wZXJpb2RUeXBlOiBDb250cmFjdC5QZXJpb2RUeXBlLFxyXG4gICAgcHJpdmF0ZSBfcmFuZ2VUeXBlOiBDb250cmFjdC5EYXRlUmFuZ2VUeXBlLFxyXG4gICAgcHJpdmF0ZSBfcmFuZ2VOOiBudW1iZXIpIHtcclxuICAgICAgc3VwZXIod29ya3NoZWV0TmFtZSwgZmllbGROYW1lLCBmaWx0ZXJUeXBlLCBmaWVsZElkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgYW5jaG9yRGF0ZSgpOiBDb250cmFjdC5EYXRhVmFsdWUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FuY2hvckRhdGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHBlcmlvZFR5cGUoKTogQ29udHJhY3QuUGVyaW9kVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGVyaW9kVHlwZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgcmFuZ2VUeXBlKCk6IENvbnRyYWN0LkRhdGVSYW5nZVR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlVHlwZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgcmFuZ2VOKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VOO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENhdGVnb3JpY2FsRG9tYWluIGltcGxlbWVudHMgQ29udHJhY3QuQ2F0ZWdvcmljYWxEb21haW4ge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX3ZhbHVlczogQ29udHJhY3QuRGF0YVZhbHVlW10sXHJcbiAgICBwcml2YXRlIF9kb21haW5UeXBlOiBDb250cmFjdC5GaWx0ZXJEb21haW5UeXBlKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHZhbHVlcygpOiBDb250cmFjdC5EYXRhVmFsdWVbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0eXBlKCk6IENvbnRyYWN0LkZpbHRlckRvbWFpblR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RvbWFpblR5cGU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmFuZ2VEb21haW4gaW1wbGVtZW50cyBDb250cmFjdC5SYW5nZURvbWFpbiB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfbWluOiBDb250cmFjdC5EYXRhVmFsdWUsXHJcbiAgICBwcml2YXRlIF9tYXg6IENvbnRyYWN0LkRhdGFWYWx1ZSxcclxuICAgIHByaXZhdGUgX2RvbWFpblR5cGU6IENvbnRyYWN0LkZpbHRlckRvbWFpblR5cGUpIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBDb250cmFjdC5GaWx0ZXJEb21haW5UeXBlIHtcclxuICAgIHJldHVybiB0aGlzLl9kb21haW5UeXBlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBtaW4oKTogQ29udHJhY3QuRGF0YVZhbHVlIHtcclxuICAgIHJldHVybiB0aGlzLl9taW47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG1heCgpOiBDb250cmFjdC5EYXRhVmFsdWUge1xyXG4gICAgcmV0dXJuIHRoaXMuX21heDtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL01vZGVscy9GaWx0ZXJNb2RlbHMudHNcbiAqKi8iLCJpbXBvcnQgeyBUYWJsZWF1RXhjZXB0aW9uIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXV0aWxzJztcclxuLyoqXHJcbiAqIEJhc2UgaW50ZXJmYWNlIGZvciBhbiBhcGkgc2VydmljZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBBcGlTZXJ2aWNlIHtcclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBuYW1lIGZvciB0aGlzIHNlcnZpY2UuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgc2VydmljZU5hbWU6IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbGxlY3Rpb24gb2Ygc2VydmljZSBuYW1lIHdoaWNoIHdpbGwgYmUgcmVnaXN0ZXJlZCBpbiB0aGUgYXBpLXNoYXJlZCBwcm9qZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZW51bSBTZXJ2aWNlTmFtZXMge1xyXG4gIERhdGFTb3VyY2VTZXJ2aWNlID0gJ2RhdGEtc291cmNlLXNlcnZpY2UnLFxyXG4gIEdldERhdGEgPSAnZ2V0LWRhdGEtc2VydmljZScsXHJcbiAgRmlsdGVyID0gJ2ZpbHRlci1zZXJ2aWNlJyxcclxuICBOb3RpZmljYXRpb24gPSAnbm90aWZpY2F0aW9uLXNlcnZpY2UnLFxyXG4gIFBhcmFtZXRlcnMgPSAncGFyYW1ldGVycy1zZXJ2aWNlJyxcclxuICBTZWxlY3Rpb24gPSAnc2VsZWN0aW9uLXNlcnZpY2UnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEbyBzb21lIGdsb2JhYmwgZGVjbGFyYXRpb25zIHNvIHdlIGNhbiBjcmVhdGUgYSBzaW5nbGV0b24gb24gdGhlIHdpbmRvdyBvYmplY3RcclxuICovXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICBpbnRlcmZhY2UgV2luZG93IHsgX190YWJsZWF1QXBpU2VydmljZVJlZ2lzdHJ5OiBTZXJ2aWNlUmVnaXN0cnkgfCB1bmRlZmluZWQ7IH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZXJ2aWNlUmVnaXN0cnkge1xyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVycyBhIG5ldyBzZXJ2aWNlIGludG8gdGhlIHNlcnZpY2UgcmVnaXN0cnkuIEFueSBleGlzdGluZyBvbmUgd2lsbFxyXG4gICAqIGJlIG92ZXJ3cml0dGVuLiB0aGUgc2VydmljZSBpcyByZWdpc3RlcmVkIHVuZGVyIHNlcnZpY2Uuc2VydmljZU5hbWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7QXBpU2VydmljZX0gc2VydmljZSBUaGUgc2Vydml2ZSB0byByZWdpc3RlclxyXG4gICAqL1xyXG4gIHJlZ2lzdGVyU2VydmljZShzZXJ2aWNlOiBBcGlTZXJ2aWNlKTogdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmVzIHRoZSBnaXZlbiBzZXJ2aWNlIGZyb20gdGhlIHJlZ2lzdHJ5LiBJZiB0aGVyZSBpcyBub3QgYVxyXG4gICAqIHNlcnZpY2UgcmVnaXN0ZXJlZCB1bmRlciB0aGF0IG5hbWUsIHRocm93cyBhbmQgZXJyb3JcclxuICAgKlxyXG4gICAqIEB0ZW1wbGF0ZSBUIFRoZSB0eXBlIG9mIHRoZSBzZXJ2aWNlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlcnZpY2VOYW1lIFRoZSBuYW1lIG9mIHRoZSBzZXJ2aWNlLlxyXG4gICAqIEByZXR1cm5zIHtUfSBUaGUgcmVxdWVzdGVkIHNlcnZpY2VcclxuICAgKi9cclxuICBnZXRTZXJ2aWNlPFQgZXh0ZW5kcyBBcGlTZXJ2aWNlPihzZXJ2aWNlTmFtZTogc3RyaW5nKTogVDtcclxufVxyXG5cclxuY2xhc3MgU2VydmljZVJlZ2lzdHJ5SW1wbCBpbXBsZW1lbnRzIFNlcnZpY2VSZWdpc3RyeSB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgU0VSVklDRV9OT1RfUkVHSVNURVJFRDogc3RyaW5nID0gJ05vIFNlcnZpY2UgJTEgaXMgcmVnaXN0ZXJlZCc7XHJcbiAgcHJpdmF0ZSBfc2VydmljZXM6IHsgW3NlcnZpY2VOYW1lOiBzdHJpbmddOiBBcGlTZXJ2aWNlOyB9O1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9zZXJ2aWNlcyA9IHt9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyU2VydmljZShzZXJ2aWNlOiBBcGlTZXJ2aWNlKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zZXJ2aWNlc1tzZXJ2aWNlLnNlcnZpY2VOYW1lXSA9IHNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U2VydmljZTxUIGV4dGVuZHMgQXBpU2VydmljZT4oc2VydmljZU5hbWU6IHN0cmluZyk6IFQge1xyXG4gICAgaWYgKCF0aGlzLl9zZXJ2aWNlcy5oYXNPd25Qcm9wZXJ0eShzZXJ2aWNlTmFtZSkpIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5lcnJvcihTZXJ2aWNlUmVnaXN0cnlJbXBsLlNFUlZJQ0VfTk9UX1JFR0lTVEVSRUQsIFtzZXJ2aWNlTmFtZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlc1tzZXJ2aWNlTmFtZV0gYXMgVDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBzdGF0aWMgY2xhc3MgdXNlZCBmb3IgZ2V0dGluZyBhY2Nlc3MgdG8gdGhlIHNpbmdsZSBpbnN0YW5jZVxyXG4gKiBvZiB0aGUgQXBpU2VydmljZVJlZ2lzdHJ5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZVJlZ2lzdHJ5IHtcclxuICBwcml2YXRlIHN0YXRpYyBTRVJWSUNFX1JFR0lTVFJZX0ZBSUxFRDogc3RyaW5nID0gJ0Fzc2lnbmluZyBzZXJ2aWNlIHJlZ2lzdHJ5IGZhaWxlZCc7XHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIGluc3RhbmNlIG9mIHRoZSBTZXJ2aWNlUmVnaXN0cnlcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBTZXJ2aWNlUmVnaXN0cnkge1xyXG4gICAgaWYgKCF3aW5kb3cuX190YWJsZWF1QXBpU2VydmljZVJlZ2lzdHJ5KSB7XHJcbiAgICAgIEFwaVNlcnZpY2VSZWdpc3RyeS5zZXRJbnN0YW5jZShuZXcgU2VydmljZVJlZ2lzdHJ5SW1wbCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXdpbmRvdy5fX3RhYmxlYXVBcGlTZXJ2aWNlUmVnaXN0cnkpIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5lcnJvcihBcGlTZXJ2aWNlUmVnaXN0cnkuU0VSVklDRV9SRUdJU1RSWV9GQUlMRUQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB3aW5kb3cuX190YWJsZWF1QXBpU2VydmljZVJlZ2lzdHJ5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIG1ldGhvZCB0byBvdmVycmlkZSB0aGUgcmVnaXN0cnkgaW5zdGFuY2UuIENhbiBiZSB1c2VkIGJ5IHVuaXQgdGVzdHNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U2VydmljZVJlZ2lzdHJ5fSBzZXJ2aWNlUmVnaXN0cnkgVGhlIG5ldyByZWdpc3RyeVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgc2V0SW5zdGFuY2Uoc2VydmljZVJlZ2lzdHJ5PzogU2VydmljZVJlZ2lzdHJ5KTogdm9pZCB7XHJcbiAgICB3aW5kb3cuX190YWJsZWF1QXBpU2VydmljZVJlZ2lzdHJ5ID0gc2VydmljZVJlZ2lzdHJ5O1xyXG4gIH1cclxuXHJcbiAgLy8gUHJpdmF0ZSB0byBhdm9pZCBhbnlvbmUgY29uc3RydWN0aW5nIHRoaXNcclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvU2VydmljZXMvU2VydmljZVJlZ2lzdHJ5LnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHtcclxuICBEYXRhVGFibGUgYXMgRGF0YVRhYmxlSW50ZXJuYWxDb250cmFjdCxcclxuICBFeGVjdXRlUGFyYW1ldGVycyxcclxuICBIaWdobGlnaHRlZE1hcmtzVGFibGUsXHJcbiAgSW50ZXJuYWxBcGlEaXNwYXRjaGVyLFxyXG4gIFBhcmFtZXRlcklkLFxyXG4gIFNlbGVjdGVkTWFya3NUYWJsZSxcclxuICBVbmRlcmx5aW5nRGF0YVRhYmxlLFxyXG4gIFZlcmJJZCxcclxuICBWaXN1YWxJZCxcclxufSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHsgQ29sdW1uLCBEYXRhVGFibGUsIERhdGFWYWx1ZSwgTWFya0luZm8gfSBmcm9tICcuLi8uLi9Nb2RlbHMvR2V0RGF0YU1vZGVscyc7XHJcbmltcG9ydCB7IEdldERhdGFTZXJ2aWNlLCBHZXREYXRhVHlwZSB9IGZyb20gJy4uL0dldERhdGFTZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vU2VydmljZVJlZ2lzdHJ5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBHZXREYXRhU2VydmljZUltcGwgaW1wbGVtZW50cyBHZXREYXRhU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfZGlzcGF0Y2hlcjogSW50ZXJuYWxBcGlEaXNwYXRjaGVyO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoZGlzcGF0Y2hlcjogSW50ZXJuYWxBcGlEaXNwYXRjaGVyKSB7XHJcbiAgICB0aGlzLl9kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2VydmljZU5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBTZXJ2aWNlTmFtZXMuR2V0RGF0YTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRVbmRlcmx5aW5nRGF0YUFzeW5jKFxyXG4gICAgdmlzdWFsSWQ6IFZpc3VhbElkLFxyXG4gICAgZ2V0VHlwZTogR2V0RGF0YVR5cGUsXHJcbiAgICBpZ25vcmVBbGlhc2VzOiBib29sZWFuLFxyXG4gICAgaWdub3JlU2VsZWN0aW9uOiBib29sZWFuLFxyXG4gICAgaW5jbHVkZUFsbENvbHVtbnM6IGJvb2xlYW4sXHJcbiAgICBtYXhSb3dzOiBudW1iZXIpOiBQcm9taXNlPERhdGFUYWJsZT4ge1xyXG4gICAgICAvLyBDcmVhdGUgYWxsIG9mIG91ciBwYXJhbWV0ZXJzXHJcbiAgICAgIGNvbnN0IHZlcmIgPSBnZXRUeXBlID09PSBHZXREYXRhVHlwZS5TdW1tYXJ5ID8gVmVyYklkLkdldERhdGFTdW1tYXJ5RGF0YSA6IFZlcmJJZC5HZXRVbmRlcmx5aW5nRGF0YTtcclxuICAgICAgY29uc3QgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMgPSB7fTtcclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5WaXN1YWxJZF0gPSB2aXN1YWxJZDtcclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5JZ25vcmVBbGlhc2VzXSA9IGlnbm9yZUFsaWFzZXM7XHJcbiAgICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuSWdub3JlU2VsZWN0aW9uXSA9IGlnbm9yZVNlbGVjdGlvbjtcclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5JbmNsdWRlQWxsQ29sdW1uc10gPSBpbmNsdWRlQWxsQ29sdW1ucztcclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5NYXhSb3dzXSA9IG1heFJvd3M7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5leGVjdXRlKHZlcmIsIHBhcmFtZXRlcnMpLnRoZW48RGF0YVRhYmxlPihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gcmVzcG9uc2UucmVzdWx0IGFzIFVuZGVybHlpbmdEYXRhVGFibGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1Jlc3VsdHNUYWJsZShyZXNwb25zZURhdGEuZGF0YSwgcmVzcG9uc2VEYXRhLmlzU3VtbWFyeSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U2VsZWN0ZWRNYXJrc0FzeW5jKHZpc3VhbElkOiBWaXN1YWxJZCk6IFByb21pc2U8Q29udHJhY3QuTWFya3NDb2xsZWN0aW9uPiB7XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHsgW1BhcmFtZXRlcklkLlZpc3VhbElkXTogdmlzdWFsSWQgfTtcclxuICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmV4ZWN1dGUoVmVyYklkLkdldFNlbGVjdGVkTWFya3MsIHBhcmFtZXRlcnMpLnRoZW48Q29udHJhY3QuTWFya3NDb2xsZWN0aW9uPihyZXNwb25zZSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IHJlc3BvbnNlLnJlc3VsdCBhcyBTZWxlY3RlZE1hcmtzVGFibGU7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLmRhdGEubWFwKHRhYmxlID0+IHRoaXMucHJvY2Vzc1Jlc3VsdHNUYWJsZSh0YWJsZSwgdHJ1ZSkpXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRIaWdobGlnaHRlZE1hcmtzQXN5bmModmlzdWFsSWQ6IFZpc3VhbElkKTogUHJvbWlzZTxDb250cmFjdC5NYXJrc0NvbGxlY3Rpb24+IHtcclxuICAgIGNvbnN0IHBhcmFtZXRlcnM6IEV4ZWN1dGVQYXJhbWV0ZXJzID0geyBbUGFyYW1ldGVySWQuVmlzdWFsSWRdOiB2aXN1YWxJZCB9O1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZXhlY3V0ZShWZXJiSWQuR2V0SGlnaGxpZ2h0ZWRNYXJrcywgcGFyYW1ldGVycykudGhlbjxDb250cmFjdC5NYXJrc0NvbGxlY3Rpb24+KHJlc3BvbnNlID0+IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gcmVzcG9uc2UucmVzdWx0IGFzIEhpZ2hsaWdodGVkTWFya3NUYWJsZTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEuZGF0YS5tYXAodGFibGUgPT4gdGhpcy5wcm9jZXNzUmVzdWx0c1RhYmxlKHRhYmxlLCB0cnVlKSlcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERhdGFTb3VyY2VEYXRhQXN5bmMoXHJcbiAgICBkYXRhU291cmNlSWQ6IHN0cmluZyxcclxuICAgIGlnbm9yZUFsaWFzZXM6IGJvb2xlYW4sXHJcbiAgICBtYXhSb3dzOiBudW1iZXIsXHJcbiAgICBjb2x1bW5zVG9JbmNsdWRlOiBBcnJheTxzdHJpbmc+KTogUHJvbWlzZTxEYXRhVGFibGU+IHtcclxuICAgICAgY29uc3QgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMgPSB7XHJcbiAgICAgICAgW1BhcmFtZXRlcklkLkRhdGFTb3VyY2VJZF06IGRhdGFTb3VyY2VJZCxcclxuICAgICAgICBbUGFyYW1ldGVySWQuSWdub3JlQWxpYXNlc106IGlnbm9yZUFsaWFzZXMsXHJcbiAgICAgICAgW1BhcmFtZXRlcklkLk1heFJvd3NdOiBtYXhSb3dzLFxyXG4gICAgICAgIFtQYXJhbWV0ZXJJZC5Db2x1bW5zVG9JbmNsdWRlXTogY29sdW1uc1RvSW5jbHVkZSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmV4ZWN1dGUoVmVyYklkLkdldERhdGFTb3VyY2VEYXRhLCBwYXJhbWV0ZXJzKS50aGVuPERhdGFUYWJsZT4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IHJlc3BvbnNlLnJlc3VsdCBhcyBVbmRlcmx5aW5nRGF0YVRhYmxlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NSZXN1bHRzVGFibGUocmVzcG9uc2VEYXRhLmRhdGEsIGZhbHNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIHByb3RlY3RlZCBwcm9jZXNzUmVzdWx0c1RhYmxlKHJlc3BvbnNlRGF0YTogRGF0YVRhYmxlSW50ZXJuYWxDb250cmFjdCwgaXNTdW1tYXJ5OiBib29sZWFuKTogRGF0YVRhYmxlIHtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSByZXNwb25zZURhdGEuaGVhZGVycy5tYXAoaCA9PiBuZXcgQ29sdW1uKGguZmllbGRDYXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250cmFjdC5EYXRhVHlwZS5TdHJpbmcgLypoLkRhdGFUeXBlKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGguaXNSZWZlcmVuY2VkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLmluZGV4KSk7XHJcbiAgICAvLyBUT0RPIFRoaXMgc2hvdWxkIGJlIGNvbnRyb2xsZWQgYnkgYSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB0aGlzIGFwaSB3aWxsIHJlc3BvbmQgbWFya3MgaW5mbyBvciBub3RcclxuICAgIGxldCBtYXJrcztcclxuICAgIGlmIChyZXNwb25zZURhdGEubWFya3MpIHtcclxuICAgICAgbWFya3MgPSByZXNwb25zZURhdGEubWFya3MubWFwKGggPT4gbmV3IE1hcmtJbmZvKGgudHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgudHVwbGVJZCkpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGFibGUgPSByZXNwb25zZURhdGEuZGF0YVRhYmxlLm1hcChyb3cgPT4ge1xyXG4gICAgICByZXR1cm4gcm93Lm1hcChjZWxsID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGFWYWx1ZShjZWxsLnZhbHVlLCBjZWxsLmZvcm1hdHRlZFZhbHVlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAobWFya3MpIHtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRhVGFibGUodGFibGUsIGhlYWRlcnMsIHRhYmxlLmxlbmd0aCwgaXNTdW1tYXJ5LCBtYXJrcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IERhdGFUYWJsZSh0YWJsZSwgaGVhZGVycywgdGFibGUubGVuZ3RoLCBpc1N1bW1hcnkpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvU2VydmljZXMvaW1wbC9HZXREYXRhU2VydmljZUltcGwudHNcbiAqKi8iLCJpbXBvcnQgeyBJbnRlcm5hbEFwaURpc3BhdGNoZXIsIE1vZGVsLCBOb3RpZmljYXRpb24sIE5vdGlmaWNhdGlvbklkIH0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UsIFVucmVnaXN0ZXJGbiB9IGZyb20gJy4uL05vdGlmaWNhdGlvblNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTmFtZXMgfSBmcm9tICcuLi9TZXJ2aWNlUmVnaXN0cnknO1xyXG5cclxuY2xhc3MgUmVnaXN0cmF0aW9uIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9maWx0ZXJGbjogKG5vdGlmaWNhdGlvbk1vZGVsOiBNb2RlbCkgPT4gYm9vbGVhbixcclxuICAgIHByaXZhdGUgX2NhbGxiYWNrRm46IChub3RpZmljYXRpb25Nb2RlbDogTW9kZWwpID0+IHZvaWQpIHtcclxuICAgICAgLy8gTm90aGluZyBIZXJlXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Ob3RpZmljYXRpb24obm90aWZpY2F0aW9uTW9kZWw6IE1vZGVsKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fZmlsdGVyRm4obm90aWZpY2F0aW9uTW9kZWwpKSB7XHJcbiAgICAgIHRoaXMuX2NhbGxiYWNrRm4obm90aWZpY2F0aW9uTW9kZWwpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2VJbXBsIGltcGxlbWVudHMgTm90aWZpY2F0aW9uU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfaGFuZGxlcnM6IHsgW25vdGlmaWNhdGlvbklkOiBzdHJpbmddOiBBcnJheTxSZWdpc3RyYXRpb24+IH07XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpc3BhdGNoZXI6IEludGVybmFsQXBpRGlzcGF0Y2hlcikge1xyXG4gICAgdGhpcy5faGFuZGxlcnMgPSB7fTtcclxuICAgIHRoaXMuZGlzcGF0Y2hlci5yZWdpc3Rlck5vdGlmaWNhdGlvbkhhbmRsZXIodGhpcy5vbk5vdGlmaWNhdGlvbi5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2VydmljZU5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBTZXJ2aWNlTmFtZXMuTm90aWZpY2F0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVySGFuZGxlcihpZDogTm90aWZpY2F0aW9uSWQsIGZpbHRlckZuOiAobW9kZWw6IE1vZGVsKSA9PiBib29sZWFuLCBoYW5kbGVyOiAobW9kZWw6IE1vZGVsKSA9PiB2b2lkKTogVW5yZWdpc3RlckZuIHtcclxuICAgIGNvbnN0IGhhbmRsZXJzID0gdGhpcy5faGFuZGxlcnNbaWRdIHx8IG5ldyBBcnJheTxSZWdpc3RyYXRpb24+KCk7XHJcbiAgICBjb25zdCByZWdpc3RyYXRpb24gPSBuZXcgUmVnaXN0cmF0aW9uKGZpbHRlckZuLCBoYW5kbGVyKTtcclxuICAgIGhhbmRsZXJzLnB1c2gocmVnaXN0cmF0aW9uKTtcclxuICAgIHRoaXMuX2hhbmRsZXJzW2lkXSA9IGhhbmRsZXJzO1xyXG4gICAgcmV0dXJuICgpID0+IHRoaXMucmVtb3ZlUmVnaXN0cmF0aW9uKGlkLCByZWdpc3RyYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYXNIYW5kbGVyc0Zvck5vdGlmaWNhdGlvblR5cGUoaWQ6IE5vdGlmaWNhdGlvbklkKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlcnMuaGFzT3duUHJvcGVydHkoaWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbk5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbik6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmhhc0hhbmRsZXJzRm9yTm90aWZpY2F0aW9uVHlwZShub3RpZmljYXRpb24ubm90aWZpY2F0aW9uSWQpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHbyB0aHJvdWdoIGFuZCBjaGVjayBmb3IgYWxsIHRoZSBoYW5kbGVycyBvZiB0aGlzIHBhcnRpY3VsYXIgbm90aWZpY2F0aW9uXHJcbiAgICB0aGlzLl9oYW5kbGVyc1tub3RpZmljYXRpb24ubm90aWZpY2F0aW9uSWRdLmZvckVhY2goaCA9PiBoLm9uTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbi5kYXRhKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZVJlZ2lzdHJhdGlvbihpZDogTm90aWZpY2F0aW9uSWQsIHJlZ2lzdHJhdGlvbjogUmVnaXN0cmF0aW9uKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaGFzSGFuZGxlcnNGb3JOb3RpZmljYXRpb25UeXBlKGlkKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5faGFuZGxlcnNbaWRdID0gdGhpcy5faGFuZGxlcnNbaWRdLmZpbHRlcihyZWcgPT4gcmVnICE9PSByZWdpc3RyYXRpb24pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvU2VydmljZXMvaW1wbC9Ob3RpZmljYXRpb25TZXJ2aWNlSW1wbC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7XHJcbiAgRXhlY3V0ZVBhcmFtZXRlcnMsXHJcbiAgSW50ZXJuYWxBcGlEaXNwYXRjaGVyLFxyXG4gIE1vZGVsLFxyXG4gIFBhcmFtZXRlcklkLFxyXG4gIFBhcmFtZXRlckluZm8sXHJcbiAgU2hlZXRQYXRoLFxyXG4gIFZlcmJJZCxcclxufSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBUYWJsZWF1RXhjZXB0aW9uIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXV0aWxzJztcclxuXHJcbmltcG9ydCB7IFBhcmFtZXRlckltcGwgfSBmcm9tICcuLi8uLi9JbnRlcm5hbC9QYXJhbWV0ZXJJbXBsJztcclxuaW1wb3J0IHsgUGFyYW1ldGVyIH0gZnJvbSAnLi4vLi4vUGFyYW1ldGVyJztcclxuaW1wb3J0IHsgUGFyYW1ldGVyc1NlcnZpY2UgfSBmcm9tICcuLi9QYXJhbWV0ZXJzU2VydmljZSc7XHJcbmltcG9ydCB7IFNlcnZpY2VOYW1lcyB9IGZyb20gJy4uL1NlcnZpY2VSZWdpc3RyeSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFyYW1ldGVyc1NlcnZpY2VJbXBsIGltcGxlbWVudHMgUGFyYW1ldGVyc1NlcnZpY2Uge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpc3BhdGNoZXI6IEludGVybmFsQXBpRGlzcGF0Y2hlcikge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBzZXJ2aWNlTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFNlcnZpY2VOYW1lcy5QYXJhbWV0ZXJzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBhcmFtZXRlcnNGb3JTaGVldEFzeW5jKHNoZWV0UGF0aDogU2hlZXRQYXRoLCBzaGVldDogQ29udHJhY3QuU2hlZXQpOiBQcm9taXNlPEFycmF5PFBhcmFtZXRlcj4+IHtcclxuICAgIGNvbnN0IHBhcmFtZXRlcnMgPSB7XHJcbiAgICAgIFtQYXJhbWV0ZXJJZC5TaGVldFBhdGhdOiBzaGVldFBhdGhcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5HZXRQYXJhbWV0ZXJzRm9yU2hlZXQsIHBhcmFtZXRlcnMpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAvLyBUT0RPIC0gQ2hlY2sgZm9yIGVycm9yXHJcblxyXG4gICAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5yZXN1bHQgYXMgQXJyYXk8UGFyYW1ldGVySW5mbz47XHJcbiAgICAgIHJldHVybiByZXN1bHQubWFwKHBhcmFtZXRlckluZm8gPT4ge1xyXG4gICAgICAgIGNvbnN0IGltcGwgPSBuZXcgUGFyYW1ldGVySW1wbChwYXJhbWV0ZXJJbmZvKTtcclxuICAgICAgICByZXR1cm4gbmV3IFBhcmFtZXRlcihpbXBsLCBzaGVldCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmdlUGFyYW1ldGVyVmFsdWVBc3luYyhmaWVsZE5hbWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZyk6IFByb21pc2U8UGFyYW1ldGVySW5mbz4ge1xyXG4gICAgY29uc3QgcGFyYW1ldGVycyA9IHtcclxuICAgICAgW1BhcmFtZXRlcklkLlBhcmFtZXRlckZpZWxkTmFtZV06IGZpZWxkTmFtZSxcclxuICAgICAgW1BhcmFtZXRlcklkLlBhcmFtZXRlclZhbHVlXTogbmV3VmFsdWVcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5DaGFuZ2VQYXJhbWV0ZXJWYWx1ZSwgcGFyYW1ldGVycykudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLnJlc3VsdCBhcyBQYXJhbWV0ZXJJbmZvO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmluZFBhcmFtZXRlckJ5TmFtZUFzeW5jKG5hbWU6IHN0cmluZywgc2hlZXQ6IENvbnRyYWN0LlNoZWV0KTogUHJvbWlzZTxQYXJhbWV0ZXIgfCB1bmRlZmluZWQ+IHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRQYXJhbWV0ZXJBc3luYyhzaGVldCwgbmFtZSwgdW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaW5kUGFyYW1ldGVyQnlHbG9iYWxGaWVsZE5hbWVBc3luYyhmaWVsZE5hbWU6IHN0cmluZywgc2hlZXQ6IENvbnRyYWN0LlNoZWV0KTogUHJvbWlzZTxQYXJhbWV0ZXIgfCB1bmRlZmluZWQ+IHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRQYXJhbWV0ZXJBc3luYyhzaGVldCwgdW5kZWZpbmVkLCBmaWVsZE5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5kUGFyYW1ldGVyQXN5bmMoXHJcbiAgICBzaGVldDogQ29udHJhY3QuU2hlZXQsXHJcbiAgICBuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBmaWVsZE5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCk6IFByb21pc2U8UGFyYW1ldGVyIHwgdW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLlBhcmFtZXRlckNhcHRpb25dID0gbmFtZTtcclxuICAgIH0gZWxzZSBpZiAoZmllbGROYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5QYXJhbWV0ZXJGaWVsZE5hbWVdID0gZmllbGROYW1lO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5taXNzaW5nUGFyYW1ldGVyKFsnZmllbGQgbmFtZSBvciBjYXB0aW9uJ10pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmRpc3BhdGNoZXIuZXhlY3V0ZShWZXJiSWQuRmluZFBhcmFtZXRlciwgcGFyYW1ldGVycykudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIGNvbnN0IGluc3RhbmNlT2ZQYXJhbWV0ZXJJbmZvID0gKG9iamVjdDogTW9kZWwpOiBvYmplY3QgaXMgUGFyYW1ldGVySW5mbyA9PiB7XHJcbiAgICAgICAgcmV0dXJuICdmaWVsZE5hbWUnIGluIG9iamVjdDtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgdG8gc2VlIGlmIHdlIGdvdCBhIHZhbGlkIHJlc3BvbnNlIGJhY2sgYWdhaW5cclxuICAgICAgaWYgKGluc3RhbmNlT2ZQYXJhbWV0ZXJJbmZvKHJlc3BvbnNlLnJlc3VsdCkpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5yZXN1bHQgYXMgUGFyYW1ldGVySW5mbztcclxuICAgICAgICBjb25zdCBpbXBsID0gbmV3IFBhcmFtZXRlckltcGwocmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gbmV3IFBhcmFtZXRlcihpbXBsLCBzaGVldCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9pbXBsL1BhcmFtZXRlcnNTZXJ2aWNlSW1wbC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbklkLCBQYXJhbWV0ZXJJbmZvIH0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgUGFyYW0gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzIH0gZnJvbSAnLi4vRW51bU1hcHBpbmdzL0ludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncyc7XHJcbmltcG9ydCB7IFBhcmFtZXRlckNoYW5nZWRFdmVudCB9IGZyb20gJy4uL0V2ZW50cy9QYXJhbWV0ZXJDaGFuZ2VkRXZlbnQnO1xyXG5pbXBvcnQgeyBEYXRhVmFsdWUgfSBmcm9tICcuLi9Nb2RlbHMvR2V0RGF0YU1vZGVscyc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9TZXJ2aWNlcy9Ob3RpZmljYXRpb25TZXJ2aWNlJztcclxuaW1wb3J0IHsgUGFyYW1ldGVyc1NlcnZpY2UgfSBmcm9tICcuLi9TZXJ2aWNlcy9QYXJhbWV0ZXJzU2VydmljZSc7XHJcbmltcG9ydCB7IEFwaVNlcnZpY2VSZWdpc3RyeSwgU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vU2VydmljZXMvU2VydmljZVJlZ2lzdHJ5JztcclxuaW1wb3J0IHsgU2luZ2xlRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi4vU2luZ2xlRXZlbnRNYW5hZ2VyJztcclxuaW1wb3J0IHsgU2luZ2xlRXZlbnRNYW5hZ2VySW1wbCB9IGZyb20gJy4vU2luZ2xlRXZlbnRNYW5hZ2VySW1wbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFyYW1ldGVySW1wbCB7XHJcbiAgcHJpdmF0ZSBfYWxsb3dhYmxlVmFsdWVzOiBDb250cmFjdC5QYXJhbWV0ZXJEb21haW5SZXN0cmljdGlvbjtcclxuICBwcml2YXRlIF9nbG9iYWxGaWVsZE5hbWU6IHN0cmluZztcclxuICBwcml2YXRlIF9wYXJhbWV0ZXJJbmZvOiBQYXJhbWV0ZXJJbmZvO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1ldGVySW5mbzogUGFyYW1ldGVySW5mbykge1xyXG4gICAgdGhpcy5zZXRQYXJhbWV0ZXJJbmZvKHBhcmFtZXRlckluZm8pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFyYW1ldGVySW5mby5uYW1lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBjdXJyZW50VmFsdWUoKTogRGF0YVZhbHVlIHtcclxuICAgIHJldHVybiBuZXcgRGF0YVZhbHVlKHRoaXMuX3BhcmFtZXRlckluZm8uY3VycmVudFZhbHVlLnZhbHVlLCB0aGlzLl9wYXJhbWV0ZXJJbmZvLmN1cnJlbnRWYWx1ZS5mb3JtYXR0ZWRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGRhdGFUeXBlKCk6IENvbnRyYWN0LkRhdGFUeXBlIHtcclxuICAgIHJldHVybiBJbnRlcm5hbFRvRXh0ZXJuYWxFbnVtTWFwcGluZ3MuZGF0YVR5cGUuY29udmVydCh0aGlzLl9wYXJhbWV0ZXJJbmZvLmRhdGFUeXBlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9nbG9iYWxGaWVsZE5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGFsbG93YWJsZVZhbHVlcygpOiBDb250cmFjdC5QYXJhbWV0ZXJEb21haW5SZXN0cmljdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWxsb3dhYmxlVmFsdWVzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5nZVZhbHVlQXN5bmMobmV3VmFsdWU6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBEYXRlKTogUHJvbWlzZTxEYXRhVmFsdWU+IHtcclxuICAgIGxldCBjb2VyY2VkVmFsdWUgPSBQYXJhbS5zZXJpYWxpemVQYXJhbXRlclZhbHVlKG5ld1ZhbHVlKTtcclxuICAgIGNvbnN0IHBhcmFtZXRlcnNTZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8UGFyYW1ldGVyc1NlcnZpY2U+KFNlcnZpY2VOYW1lcy5QYXJhbWV0ZXJzKTtcclxuICAgIHJldHVybiBwYXJhbWV0ZXJzU2VydmljZS5jaGFuZ2VQYXJhbWV0ZXJWYWx1ZUFzeW5jKHRoaXMuX2dsb2JhbEZpZWxkTmFtZSwgY29lcmNlZFZhbHVlKS50aGVuKHBhcmFtZXRlckluZm8gPT4ge1xyXG4gICAgICB0aGlzLnNldFBhcmFtZXRlckluZm8ocGFyYW1ldGVySW5mbyk7XHJcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIG1ldGhvZCB3aGljaCBnb2VzIHRocm91Z2ggYW5kIHJlZ2lzdGVycyBlYWNoIGV2ZW50IHR5cGUgdGhpcyBpbXBsIGtub3dzIGFib3V0XHJcbiAgICogd2l0aCB0aGUgTm90aWZpY2F0aW9uU2VydmljZS4gSXQgcmV0dXJucyBhbiBhcnJheSBvZiBTaW5nbGVFdmVudE1hbmFnZXIgb2JqZWN0cyB3aGljaFxyXG4gICAqIGNhbiB0aGVuIGJlIHBhc3NlZCB0byBhbiBFdmVudExpc3RlbmVyTWFuYWdlciB0byBoYW5kbGUgdXNlciByZWdpc3RyYXRpb24gLyB1bnJlZ2lzdHJhdGlvbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzaGVldCBUaGUgc2hlZXQgb2JqZWN0IHdoaWNoIHdpbGwgYmUgaW5jbHVkZWQgd2l0aCB0aGUgZXZlbnQgbm90aWZpY2F0aW9uc1xyXG4gICAqIEByZXR1cm5zIHtBcnJheTxTaW5nbGVFdmVudE1hbmFnZXI+fSBDb2xsZWN0aW9uIG9mIGV2ZW50IG1hbmFnZXJzIHRvIHBhc3MgdG8gYW4gRXZlbnRMaXN0ZW5lck1hbmFnZXJcclxuICAgKi9cclxuICBwdWJsaWMgaW5pdGlhbGl6ZUV2ZW50cyhzaGVldDogQ29udHJhY3QuU2hlZXQpOiBBcnJheTxTaW5nbGVFdmVudE1hbmFnZXI+IHtcclxuICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgQXJyYXk8U2luZ2xlRXZlbnRNYW5hZ2VyPigpO1xyXG4gICAgbGV0IG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2U7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbm90aWZpY2F0aW9uU2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPE5vdGlmaWNhdGlvblNlcnZpY2U+KFNlcnZpY2VOYW1lcy5Ob3RpZmljYXRpb24pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIHRoaXMgc2VydmljZSByZWdpc3RlcmVkLCBqdXN0IHJldHVyblxyXG4gICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbml0aWFsaXplIGFsbCBvZiB0aGUgZXZlbnQgbWFuYWdlcnMgd2UnbGwgbmVlZCAob25lIGZvciBlYWNoIGV2ZW50IHR5cGUpXHJcbiAgICBjb25zdCBwYXJhbWV0ZXJFdmVudCA9IG5ldyBTaW5nbGVFdmVudE1hbmFnZXJJbXBsPFBhcmFtZXRlckNoYW5nZWRFdmVudD4oQ29udHJhY3QuVGFibGVhdUV2ZW50VHlwZS5QYXJhbWV0ZXJDaGFuZ2VkKTtcclxuICAgIG5vdGlmaWNhdGlvblNlcnZpY2UucmVnaXN0ZXJIYW5kbGVyKE5vdGlmaWNhdGlvbklkLlBhcmFtZXRlckNoYW5nZWQsIChtb2RlbCkgPT4ge1xyXG4gICAgICBjb25zdCBmaWVsZE5hbWUgPSBtb2RlbCBhcyBzdHJpbmc7XHJcbiAgICAgIHJldHVybiBmaWVsZE5hbWUgPT09IHRoaXMuX2dsb2JhbEZpZWxkTmFtZTtcclxuICAgIH0sIChmaWVsZE5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBwYXJhbWV0ZXJFdmVudC50cmlnZ2VyRXZlbnQoKCkgPT4gbmV3IFBhcmFtZXRlckNoYW5nZWRFdmVudChmaWVsZE5hbWUsIHNoZWV0KSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXN1bHRzLnB1c2gocGFyYW1ldGVyRXZlbnQpO1xyXG5cclxuICAgIHJldHVybiByZXN1bHRzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRQYXJhbWV0ZXJJbmZvKHBhcmFtZXRlckluZm86IFBhcmFtZXRlckluZm8pOiB2b2lkIHtcclxuICAgIHRoaXMuX3BhcmFtZXRlckluZm8gPSBwYXJhbWV0ZXJJbmZvO1xyXG4gICAgdGhpcy5fZ2xvYmFsRmllbGROYW1lID0gcGFyYW1ldGVySW5mby5maWVsZE5hbWU7XHJcblxyXG4gICAgY29uc3QgdHlwZSA9IEludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncy5hbGxvd2FibGVWYWx1ZXMuY29udmVydChwYXJhbWV0ZXJJbmZvLmFsbG93YWJsZVZhbHVlc1R5cGUpO1xyXG4gICAgbGV0IGxpc3RWYWx1ZXM6IEFycmF5PERhdGFWYWx1ZT4gfCB1bmRlZmluZWQ7XHJcbiAgICBsZXQgbWluVmFsdWU6IERhdGFWYWx1ZSB8IHVuZGVmaW5lZDtcclxuICAgIGxldCBtYXhWYWx1ZTogRGF0YVZhbHVlIHwgdW5kZWZpbmVkO1xyXG4gICAgbGV0IHN0ZXBTaXplOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgICBsZXQgZGF0ZVN0ZXBQZXJpb2Q6IENvbnRyYWN0LlBlcmlvZFR5cGUgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgaWYgKHR5cGUgPT09IENvbnRyYWN0LlBhcmFtZXRlclZhbHVlVHlwZS5MaXN0KSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHBhcmFtZXRlckluZm8uYWxsb3dhYmxlVmFsdWVzIHx8IFtdO1xyXG4gICAgICBsaXN0VmFsdWVzID0gdmFsdWVzLm1hcCh2YWwgPT4gbmV3IERhdGFWYWx1ZSh2YWwudmFsdWUsIHZhbC5mb3JtYXR0ZWRWYWx1ZSkpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBDb250cmFjdC5QYXJhbWV0ZXJWYWx1ZVR5cGUuUmFuZ2UpIHtcclxuICAgICAgbWluVmFsdWUgPSBwYXJhbWV0ZXJJbmZvLm1pblZhbHVlICYmIG5ldyBEYXRhVmFsdWUocGFyYW1ldGVySW5mby5taW5WYWx1ZS52YWx1ZSwgcGFyYW1ldGVySW5mby5taW5WYWx1ZS5mb3JtYXR0ZWRWYWx1ZSk7XHJcbiAgICAgIG1heFZhbHVlID0gcGFyYW1ldGVySW5mby5tYXhWYWx1ZSAmJiBuZXcgRGF0YVZhbHVlKHBhcmFtZXRlckluZm8ubWF4VmFsdWUudmFsdWUsIHBhcmFtZXRlckluZm8ubWF4VmFsdWUuZm9ybWF0dGVkVmFsdWUpO1xyXG4gICAgICBzdGVwU2l6ZSA9IHBhcmFtZXRlckluZm8uc3RlcFNpemU7XHJcbiAgICAgIGRhdGVTdGVwUGVyaW9kID0gcGFyYW1ldGVySW5mby5kYXRlU3RlcFBlcmlvZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgIEludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncy5kYXRlU3RlcFBlcmlvZC5jb252ZXJ0KHBhcmFtZXRlckluZm8uZGF0ZVN0ZXBQZXJpb2QpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2FsbG93YWJsZVZhbHVlcyA9IHtcclxuICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgYWxsb3dhYmxlVmFsdWVzOiBsaXN0VmFsdWVzLFxyXG4gICAgICBtaW5WYWx1ZTogbWluVmFsdWUsXHJcbiAgICAgIG1heFZhbHVlOiBtYXhWYWx1ZSxcclxuICAgICAgc3RlcFNpemU6IHN0ZXBTaXplLFxyXG4gICAgICBkYXRlU3RlcFBlcmlvZDogZGF0ZVN0ZXBQZXJpb2RcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9JbnRlcm5hbC9QYXJhbWV0ZXJJbXBsLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgVGFibGVhdUV4Y2VwdGlvbiB9IGZyb20gJ0B0YWJsZWF1L2FwaS11dGlscyc7XHJcbmltcG9ydCB7IFBhcmFtZXRlcnNTZXJ2aWNlIH0gZnJvbSAnLi4vU2VydmljZXMvUGFyYW1ldGVyc1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVnaXN0cnksIFNlcnZpY2VOYW1lcyB9IGZyb20gJy4uL1NlcnZpY2VzL1NlcnZpY2VSZWdpc3RyeSc7XHJcbmltcG9ydCB7IFRhYmxlYXVTaGVldEV2ZW50IH0gZnJvbSAnLi9UYWJsZWF1U2hlZXRFdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFyYW1ldGVyQ2hhbmdlZEV2ZW50IGV4dGVuZHMgVGFibGVhdVNoZWV0RXZlbnQgaW1wbGVtZW50cyBDb250cmFjdC5QYXJhbWV0ZXJDaGFuZ2VkRXZlbnQge1xyXG4gIHByaXZhdGUgc3RhdGljIFBBUkFNX05PVF9GT1VORDogc3RyaW5nID0gJ1VuYWJsZSB0byBmaW5kIHBhcmFtZXRlcic7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX2dsb2JhbEZpZWxkTmFtZTogc3RyaW5nLCBzaGVldDogQ29udHJhY3QuU2hlZXQpIHtcclxuICAgIHN1cGVyKENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGUuUGFyYW1ldGVyQ2hhbmdlZCwgc2hlZXQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBhcmFtZXRlckFzeW5jKCk6IFByb21pc2U8Q29udHJhY3QuUGFyYW1ldGVyPiB7XHJcbiAgICAvLyBDYWxsIGRvd24gdG8gb3VyIHNlcnZpY2UgdG8gZ2V0IHRoZSBwYXJhbWV0ZXIgYmFjayB2aWEgaXRzIGZpZWxkIG5hbWVcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxQYXJhbWV0ZXJzU2VydmljZT4oU2VydmljZU5hbWVzLlBhcmFtZXRlcnMpO1xyXG4gICAgcmV0dXJuIHNlcnZpY2UuZmluZFBhcmFtZXRlckJ5R2xvYmFsRmllbGROYW1lQXN5bmModGhpcy5fZ2xvYmFsRmllbGROYW1lLCB0aGlzLnNoZWV0KS50aGVuKHBhcmFtZXRlciA9PiB7XHJcbiAgICAgIGlmIChwYXJhbWV0ZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uZXJyb3IoUGFyYW1ldGVyQ2hhbmdlZEV2ZW50LlBBUkFNX05PVF9GT1VORCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBwYXJhbWV0ZXI7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0V2ZW50cy9QYXJhbWV0ZXJDaGFuZ2VkRXZlbnQudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQge1xyXG4gIEV4ZWN1dGVQYXJhbWV0ZXJzLFxyXG4gIEludGVybmFsQXBpRGlzcGF0Y2hlcixcclxuICBQYXJhbWV0ZXJJZCxcclxuICBRdWFudGl0YXRpdmVJbmNsdWRlZFZhbHVlcyxcclxuICBTZWxlY3Rpb25VcGRhdGVUeXBlIGFzIFNlbGVjdGlvblVwZGF0ZVR5cGVJbnRlcm5hbCxcclxuICBWZXJiSWQsXHJcbiAgVmlzdWFsSWRcclxufSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBUYWJsZWF1RXhjZXB0aW9uIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXV0aWxzJztcclxuaW1wb3J0IHsgRGltZW5zaW9uU2VsZWN0aW9uTW9kZWwsXHJcbiAgSGllcmFyY2hpY2FsU2VsZWN0aW9uTW9kZWwsXHJcbiAgUmFuZ2VTZWxlY3Rpb25Nb2RlbCxcclxuICBTZWxlY3Rpb25Nb2RlbHNDb250YWluZXIsXHJcbiAgVHVwbGVTZWxlY3Rpb25Nb2RlbCxcclxuICBWYWx1ZVNlbGVjdGlvbk1vZGVsXHJcbn0gZnJvbSAnLi4vLi4vTW9kZWxzL1NlbGVjdGlvbk1vZGVscyc7XHJcbmltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9TZWxlY3Rpb25TZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vU2VydmljZVJlZ2lzdHJ5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25TZXJ2aWNlSW1wbCBpbXBsZW1lbnRzIFNlbGVjdGlvblNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2Rpc3BhdGNoZXI6IEludGVybmFsQXBpRGlzcGF0Y2hlcjtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKGRpc3BhdGNoZXI6IEludGVybmFsQXBpRGlzcGF0Y2hlcikge1xyXG4gICAgdGhpcy5fZGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNlcnZpY2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU2VydmljZU5hbWVzLlNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBjbGVhciBhbGwgdGhlIHNlbGVjdGVkIG1hcmtzIGZvciB0aGUgZ2l2ZW4gd29ya3NoZWV0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHZpc3VhbElkXHJcbiAgICovXHJcbiAgcHVibGljIGNsZWFyU2VsZWN0ZWRNYXJrc0FzeW5jKHZpc3VhbElkOiBWaXN1YWxJZCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3QgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMgPSB7W1BhcmFtZXRlcklkLlZpc3VhbElkXTogdmlzdWFsSWR9O1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZXhlY3V0ZShWZXJiSWQuQ2xlYXJTZWxlY3RlZE1hcmtzLCBwYXJhbWV0ZXJzKS50aGVuPHZvaWQ+KHJlc3BvbnNlID0+IHtcclxuICAgICAgcmV0dXJuIDsgLy8gRXhwZWN0aW5nIGFuIGVtcHR5IG1vZGVsIGFuZCBoZW5jZSB0aGUgdm9pZCByZXNwb25zZS5cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIHNlbGVjdCBtYXJrcyBmb3IgdGhlIGdpdmVuIHdvcmtzaGVldC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB2aXN1YWxJZFxyXG4gICAqIEBwYXJhbSBzZWxlY3Rpb25Dcml0ZXJpYVxyXG4gICAqIEBwYXJhbSBzZWxlY3Rpb25VcGRhdGVUeXBlXHJcbiAgICovXHJcbiAgcHVibGljIHNlbGVjdE1hcmtzQnlWYWx1ZUFzeW5jKHZpc3VhbElkOiBWaXN1YWxJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQ3JpdGVyaWFzOiBBcnJheTxDb250cmFjdC5TZWxlY3Rpb25Dcml0ZXJpYT4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZVR5cGU6IENvbnRyYWN0LlNlbGVjdGlvblVwZGF0ZVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmIChzZWxlY3Rpb25Dcml0ZXJpYXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uaW52YWxpZChbJ1NlbGVjdGlvbiBjcml0ZXJpYScsICdTZWxlY3Rpb25zIG1pc3NpbmcuJ10pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdGlvblR5cGU6IHN0cmluZyA9IHRoaXMudmFsaWRhdGVTZWxlY3Rpb25VcGRhdGVUeXBlKHNlbGVjdGlvblVwZGF0ZVR5cGUpO1xyXG4gICAgbGV0IHNlbGVjdGlvbkNyaXRlcmlhVHlwZTogU2VsZWN0aW9uQ3JpdGVyaWFUeXBlID0gdGhpcy52YWxpZGF0ZVNlbGVjdGlvbkNyaXRlcmlhKHNlbGVjdGlvbkNyaXRlcmlhc1swXSk7XHJcbiAgICBsZXQgc2VsZWN0aW9uTW9kZWxDb250YWluZXI6IFNlbGVjdGlvbk1vZGVsc0NvbnRhaW5lciA9IHRoaXMucGFyc2VTZWxlY3Rpb25NYXJrcyhzZWxlY3Rpb25Dcml0ZXJpYXMsIHNlbGVjdGlvbkNyaXRlcmlhVHlwZSk7XHJcblxyXG4gICAgY29uc3QgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMgPSB7XHJcbiAgICAgIFtQYXJhbWV0ZXJJZC5WaXN1YWxJZF06IHZpc3VhbElkLFxyXG4gICAgICBbUGFyYW1ldGVySWQuU2VsZWN0aW9uVXBkYXRlVHlwZV06IHNlbGVjdGlvblR5cGVcclxuICAgIH07XHJcblxyXG4gICAgc3dpdGNoIChzZWxlY3Rpb25Dcml0ZXJpYVR5cGUpIHtcclxuICAgICAgY2FzZSBTZWxlY3Rpb25Dcml0ZXJpYVR5cGUuSGllcmFyY2hpY2FsVHlwZToge1xyXG4gICAgICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuSGllclZhbFNlbGVjdGlvbk1vZGVsc10gPSBzZWxlY3Rpb25Nb2RlbENvbnRhaW5lci5oaWVyTW9kZWxBcnI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBTZWxlY3Rpb25Dcml0ZXJpYVR5cGUuUmFuZ2VUeXBlOiB7XHJcbiAgICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5RdWFudFJhbmdlU2VsZWN0aW9uTW9kZWxzXSA9IHNlbGVjdGlvbk1vZGVsQ29udGFpbmVyLnF1YW50TW9kZWxBcnI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBTZWxlY3Rpb25Dcml0ZXJpYVR5cGUuRGltZW5zaW9uVHlwZToge1xyXG4gICAgICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuRGltVmFsU2VsZWN0aW9uTW9kZWxzXSA9IHNlbGVjdGlvbk1vZGVsQ29udGFpbmVyLmRpbU1vZGVsQXJyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5TZWxlY3RCeVZhbHVlLCBwYXJhbWV0ZXJzKS50aGVuPHZvaWQ+KHJlc3BvbnNlID0+IHtcclxuICAgICAgLy8gRXhwZWN0aW5nIGFuIGVtcHR5IG1vZGVsIGFuZCBoZW5jZSB0aGUgdm9pZCByZXNwb25zZS5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgICAvLyBUT0RPIEludmVzdGlnYXRlIHRoZSBlcnJvciByZXNwb25zZSB3aXRoIG11bHRpcGxlIG91dHB1dCBwYXJhbXMgYW5kIHRocm93IGVycm9yIGFjY29yZGluZ2x5LlxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAqIE1ldGhvZCB0byBzZWxlY3QgbWFya3MgZm9yIHRoZSBnaXZlbiB3b3Jrc2hlZXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdmlzdWFsSWRcclxuICAgKiBAcGFyYW0gTWFya0luZm9cclxuICAgKiBAcGFyYW0gc2VsZWN0aW9uVXBkYXRlVHlwZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZWxlY3RNYXJrc0J5SWRBc3luYyh2aXN1YWxJZDogVmlzdWFsSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtzOiBBcnJheTxDb250cmFjdC5NYXJrSW5mbz4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZVR5cGU6IENvbnRyYWN0LlNlbGVjdGlvblVwZGF0ZVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmIChtYXJrcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5pbnZhbGlkKFsnU2VsZWN0aW9uJywgJ01hcmtzIGluZm8gbWlzc2luZy4nXSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0aW9uVHlwZTogc3RyaW5nID0gdGhpcy52YWxpZGF0ZVNlbGVjdGlvblVwZGF0ZVR5cGUoc2VsZWN0aW9uVXBkYXRlVHlwZSk7XHJcbiAgICBsZXQgc2VsZWN0aW9uTW9kZWxDb250YWluZXI6IFNlbGVjdGlvbk1vZGVsc0NvbnRhaW5lciA9IHRoaXMucGFyc2VTZWxlY3Rpb25JZHMobWFya3MpO1xyXG5cclxuICAgIGNvbnN0IHBhcmFtZXRlcnM6IEV4ZWN1dGVQYXJhbWV0ZXJzID0ge1xyXG4gICAgICBbUGFyYW1ldGVySWQuVmlzdWFsSWRdOiB2aXN1YWxJZCxcclxuICAgICAgW1BhcmFtZXRlcklkLlNlbGVjdGlvblVwZGF0ZVR5cGVdOiBzZWxlY3Rpb25UeXBlLFxyXG4gICAgICBbUGFyYW1ldGVySWQuU2VsZWN0aW9uXTogc2VsZWN0aW9uTW9kZWxDb250YWluZXIuc2VsZWN0aW9uXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZXhlY3V0ZShWZXJiSWQuU2VsZWN0QnlWYWx1ZSwgcGFyYW1ldGVycykudGhlbjx2b2lkPihyZXNwb25zZSA9PiB7XHJcbiAgICAgIC8vIEV4cGVjdGluZyBhbiBlbXB0eSBtb2RlbCBhbmQgaGVuY2UgdGhlIHZvaWQgcmVzcG9uc2UuXHJcbiAgICAgIHJldHVybjtcclxuICAgICAgLy8gVE9ETyBJbnZlc3RpZ2F0ZSB0aGUgZXJyb3IgcmVzcG9uc2Ugd2l0aCBtdWx0aXBsZSBvdXRwdXQgcGFyYW1zIGFuZCB0aHJvdyBlcnJvciBhY2NvcmRpbmdseS5cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIHByZXBhcmUgdGhlIHByZXMgbW9kZWxzIGZvciBzZWxlY3Rpb24gYnkgTWFya3NJbmZvXHJcbiAgICogQHBhcmFtIG1hcmtzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwYXJzZVNlbGVjdGlvbklkcyhtYXJrczogQXJyYXk8Q29udHJhY3QuTWFya0luZm8+KTogU2VsZWN0aW9uTW9kZWxzQ29udGFpbmVyIHtcclxuICAgIGxldCBpZHM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIGxldCBzZWxlY3Rpb25Nb2RlbENvbnRhaW5lcjogU2VsZWN0aW9uTW9kZWxzQ29udGFpbmVyID0gbmV3IFNlbGVjdGlvbk1vZGVsc0NvbnRhaW5lcigpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXJrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgdHVwbGVJZDogTnVtYmVyIHwgdW5kZWZpbmVkICA9IG1hcmtzW2ldLnR1cGxlSWQ7XHJcbiAgICAgIGlmICh0dXBsZUlkICE9PSB1bmRlZmluZWQgJiYgdHVwbGVJZCAhPT0gbnVsbCkgeyAvLyBJZiB0dXBsZSBpZCBpcyBwcm92aWRlZCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHBhaXJcclxuICAgICAgICAgaWRzLnB1c2godHVwbGVJZC50b1N0cmluZygpKTsgLy8gY29sbGVjdCB0aGUgdHVwbGUgaWRzXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5pbnZhbGlkKFsndHVwbGVJZCddKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGlkcy5sZW5ndGggIT09IDApIHsgLy8gdHVwbGUgaWRzIGJhc2VkIHNlbGVjdGlvblxyXG4gICAgICBsZXQgdHVwbGVTZWxlY3Rpb25Nb2RlbDogVHVwbGVTZWxlY3Rpb25Nb2RlbCA9IG5ldyBUdXBsZVNlbGVjdGlvbk1vZGVsKCk7XHJcbiAgICAgIHR1cGxlU2VsZWN0aW9uTW9kZWwuc2VsZWN0aW9uVHlwZSA9ICd0dXBsZXMnO1xyXG4gICAgICB0dXBsZVNlbGVjdGlvbk1vZGVsLm9iamVjdElkcyA9IGlkcztcclxuICAgICAgc2VsZWN0aW9uTW9kZWxDb250YWluZXIuc2VsZWN0aW9uID0gdHVwbGVTZWxlY3Rpb25Nb2RlbDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWxlY3Rpb25Nb2RlbENvbnRhaW5lcjtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIHByZXBhcmUgdGhlIHByZXMgbW9kZWxzIGZvciBzZWxlY3Rpb24gYnkgdmFsdWVzLlxyXG4gICAqXHJcbiAgICogU3VwcG9ydHMgMyB0eXBlcyBmb3Igc2VsZWN0aW9uOlxyXG4gICAqIDEpIGhpZXJhcmNoaWNhbCB2YWx1ZSBiYXNlZCBzZWxlY3Rpb25cclxuICAgKiAyKSByYW5nZSB2YWx1ZSBiYXNlZCBzZWxlY3Rpb25cclxuICAgKiAzKSBEaW1lbnNpb24gdmFsdWUgYmFzZWQgc2VsZWN0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbWFya3NcclxuICAgKiBAcGFyYW0gaGllck1vZGVsQXJyXHJcbiAgICogQHBhcmFtIGRpbU1vZGVsQXJyXHJcbiAgICogQHBhcmFtIHF1YW50TW9kZWxBcnJcclxuICAgKiBAcGFyYW0gc2VsZWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwYXJzZVNlbGVjdGlvbk1hcmtzKHNlbGVjdGlvbkNyaXRlcmlhczogQXJyYXk8Q29udHJhY3QuU2VsZWN0aW9uQ3JpdGVyaWE+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25Dcml0ZXJpYVR5cGUpOiBTZWxlY3Rpb25Nb2RlbHNDb250YWluZXIge1xyXG4gICAgbGV0IHNlbGVjdGlvbk1vZGVsQ29udGFpbmVyOiBTZWxlY3Rpb25Nb2RlbHNDb250YWluZXIgPSBuZXcgU2VsZWN0aW9uTW9kZWxzQ29udGFpbmVyKCk7XHJcbiAgICBsZXQgbWl4ZWRTZWxlY3Rpb25zRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGlvbkNyaXRlcmlhcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBzdCA9IHNlbGVjdGlvbkNyaXRlcmlhc1tpXTtcclxuICAgICAgaWYgKHN0LmZpZWxkTmFtZSAmJiAoc3QudmFsdWUgIT09IHVuZGVmaW5lZCAmJiBzdC52YWx1ZSAhPT0gbnVsbCkpIHtcclxuICAgICAgICBsZXQgY2F0UmVnZXggPSBuZXcgUmVnRXhwKCcoXFxbW0EtWmEtejAtOV0rXSkuKicsICdnJyk7XHJcbiAgICAgICAgbGV0IHJhbmdlT3B0aW9uOiBDb250cmFjdC5SYW5nZVZhbHVlID0gc3QudmFsdWUgYXMgQ29udHJhY3QuUmFuZ2VWYWx1ZTtcclxuICAgICAgICBpZiAoY2F0UmVnZXgudGVzdChzdC5maWVsZE5hbWUpKSB7IC8vIEhpZXJhcmNoaWNhbCB2YWx1ZSBzZWxlY3Rpb25cclxuICAgICAgICAgIGlmIChzZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25Dcml0ZXJpYVR5cGUuSGllcmFyY2hpY2FsVHlwZSkge1xyXG4gICAgICAgICAgICBsZXQgaGllck1vZGVsOiBIaWVyYXJjaGljYWxTZWxlY3Rpb25Nb2RlbCA9IDxIaWVyYXJjaGljYWxTZWxlY3Rpb25Nb2RlbD4gdGhpcy5hZGRUb1BhcmFtc0xpc3Qoc3QuZmllbGROYW1lLCBzdC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsQ29udGFpbmVyLmhpZXJNb2RlbEFyci5wdXNoKGhpZXJNb2RlbCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtaXhlZFNlbGVjdGlvbnNFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoKDxDb250cmFjdC5SYW5nZVZhbHVlPiByYW5nZU9wdGlvbikubWluICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICYmICg8Q29udHJhY3QuUmFuZ2VWYWx1ZT4gcmFuZ2VPcHRpb24pLm1heCAhPT0gdW5kZWZpbmVkKSB7IC8vIFJhbmdlIHZhbHVlIHNlbGVjdGlvblxyXG4gICAgICAgICAgaWYgKHNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvbkNyaXRlcmlhVHlwZS5SYW5nZVR5cGUpIHtcclxuICAgICAgICAgICAgbGV0IHF1YW50TW9kZWw6IFJhbmdlU2VsZWN0aW9uTW9kZWwgPSB0aGlzLmFkZFRvUmFuZ2VQYXJhbXNMaXN0KHN0LmZpZWxkTmFtZSwgcmFuZ2VPcHRpb24pO1xyXG4gICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbENvbnRhaW5lci5xdWFudE1vZGVsQXJyLnB1c2gocXVhbnRNb2RlbCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtaXhlZFNlbGVjdGlvbnNFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7IC8vIERpbWVuc2lvbiB2YWx1ZSBzZWxlY3Rpb25cclxuICAgICAgICAgIGlmIChzZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25Dcml0ZXJpYVR5cGUuRGltZW5zaW9uVHlwZSkge1xyXG4gICAgICAgICAgICBsZXQgZGltTW9kZWw6IERpbWVuc2lvblNlbGVjdGlvbk1vZGVsID0gPERpbWVuc2lvblNlbGVjdGlvbk1vZGVsPiB0aGlzLmFkZFRvUGFyYW1zTGlzdChzdC5maWVsZE5hbWUsIHN0LnZhbHVlKTtcclxuICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWxDb250YWluZXIuZGltTW9kZWxBcnIucHVzaChkaW1Nb2RlbCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtaXhlZFNlbGVjdGlvbnNFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChtaXhlZFNlbGVjdGlvbnNFcnJvcikge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmludmFsaWQoWydTZWxlY3Rpb24gQ3JpdGVyaWEnLCAnRGlmZmVyZW50IHR5cGVzIG9mIHNlbGVjdGlvbiBjcml0ZXJpYXMgcHJvdmlkZWQuJ10pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbk1vZGVsQ29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc2VsZWN0aW9uQ3JpdGVyaWFzIFZhbGlkYXRlIGFuZCBkZXRlcm1pbmUgdGhlIHNlbGVjdGlvbiBjcml0ZXJpYXMgdHlwZS5cclxuICAgKi9cclxuICBwcml2YXRlIHZhbGlkYXRlU2VsZWN0aW9uQ3JpdGVyaWEoc2VsZWN0aW9uQ3JpdGVyaWE6IENvbnRyYWN0LlNlbGVjdGlvbkNyaXRlcmlhKTogU2VsZWN0aW9uQ3JpdGVyaWFUeXBlIHtcclxuICAgIGxldCBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25Dcml0ZXJpYVR5cGU7XHJcbiAgICAvLyBEZXRlcm1pbmUgdGhlIHR5cGUgb2Ygc2VsZWN0aW9uLCB0aGlzIGNvbW1hbmQgaXMgYnkgbG9va2luZyBhdCB0aGUgZmlyc3Qgc2VsZWN0aW9uXHJcbiAgICBsZXQgY3JpdDogQ29udHJhY3QuU2VsZWN0aW9uQ3JpdGVyaWEgPSBzZWxlY3Rpb25Dcml0ZXJpYTtcclxuXHJcbiAgICBsZXQgY2F0UmVnZXggPSBuZXcgUmVnRXhwKCcoXFxbW0EtWmEtejAtOV0rXSkuKicsICdnJyk7XHJcbiAgICBsZXQgcmFuZ2VPcHRpb246IENvbnRyYWN0LlJhbmdlVmFsdWUgPSBjcml0LnZhbHVlIGFzIENvbnRyYWN0LlJhbmdlVmFsdWU7XHJcblxyXG4gICAgaWYgKGNyaXQuZmllbGROYW1lICYmIChjcml0LnZhbHVlICE9PSB1bmRlZmluZWQgJiYgY3JpdC52YWx1ZSAhPT0gbnVsbCkpIHtcclxuICAgICAgaWYgKGNhdFJlZ2V4LnRlc3QoY3JpdC5maWVsZE5hbWUpKSB7IC8vIEhpZXJhcmNoaWNhbCB2YWx1ZSBzZWxlY3Rpb25cclxuICAgICAgICBzZWxlY3Rpb25UeXBlID0gU2VsZWN0aW9uQ3JpdGVyaWFUeXBlLkhpZXJhcmNoaWNhbFR5cGU7XHJcbiAgICAgIH0gZWxzZSBpZiAoKDxDb250cmFjdC5SYW5nZVZhbHVlPiByYW5nZU9wdGlvbikubWluICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICYmICg8Q29udHJhY3QuUmFuZ2VWYWx1ZT4gcmFuZ2VPcHRpb24pLm1heCAhPT0gdW5kZWZpbmVkKSB7IC8vIFJhbmdlIHZhbHVlIHNlbGVjdGlvblxyXG4gICAgICAgIHNlbGVjdGlvblR5cGUgPSBTZWxlY3Rpb25Dcml0ZXJpYVR5cGUuUmFuZ2VUeXBlO1xyXG4gICAgICB9IGVsc2UgeyAvLyBEaW1lcnNpb24gdmFsdWUgc2VsZWN0aW9uXHJcbiAgICAgICAgc2VsZWN0aW9uVHlwZSA9IFNlbGVjdGlvbkNyaXRlcmlhVHlwZS5EaW1lbnNpb25UeXBlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmludmFsaWQoWydTZWxlY3Rpb24nLCAnQ3JpdGVyaWEgZm9ybWF0LiddKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWxlY3Rpb25UeXBlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIHRyYW5zZm9ybSB0aGUga2V5IHZhbHVlIHBhaXIgaW50byB2YWx1ZSBiYXNlZCBwcmVzIG1vZGVsIG9iamVjdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB2YWx1ZVNlbGVjdGlvbk1vZGVsXHJcbiAgICogQHBhcmFtIGZpZWxkTmFtZVxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkVG9QYXJhbXNMaXN0KGZpZWxkTmFtZTogc3RyaW5nLCB2YWx1ZTogb2JqZWN0KTogVmFsdWVTZWxlY3Rpb25Nb2RlbCB7XHJcbiAgICBsZXQgdmFsdWVTZWxlY3Rpb25Nb2RlbDogVmFsdWVTZWxlY3Rpb25Nb2RlbCA9IG5ldyBWYWx1ZVNlbGVjdGlvbk1vZGVsKCk7XHJcbiAgICBsZXQgbWFya1ZhbHVlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGxldCB2YWx1ZUFycjogQXJyYXk8c3RyaW5nPiA9IHZhbHVlO1xyXG4gICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB2YWx1ZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG1hcmtWYWx1ZXMucHVzaCh2YWx1ZUFycltpXS50b1N0cmluZygpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWFya1ZhbHVlcy5wdXNoKHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbHVlU2VsZWN0aW9uTW9kZWwucXVhbGlmaWVkRmllbGRDYXB0aW9uID0gZmllbGROYW1lO1xyXG4gICAgdmFsdWVTZWxlY3Rpb25Nb2RlbC5zZWxlY3RWYWx1ZXMgPSBtYXJrVmFsdWVzO1xyXG4gICAgcmV0dXJuIHZhbHVlU2VsZWN0aW9uTW9kZWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gdHJhbnNmb3JtIHRoZSBrZXkgdmFsdWUgcGFpciBpbnRvIHJhbmdlIGJhc2VkIHNlbGVjdGlvbiBwcmVzIG1vZGVsLlxyXG4gICAqXHJcbiAgICogVE9ETzogTmVlZCB0byBoYW5kbGUgdGhlIHBhcnNpbmcgb2YgZGF0ZSB0eXBlIHZhbHVlcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB2YWx1ZVNlbGVjdGlvbk1vZGVsXHJcbiAgICogQHBhcmFtIGZpZWxkTmFtZVxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkVG9SYW5nZVBhcmFtc0xpc3QoZmllbGROYW1lOiBzdHJpbmcsIHZhbHVlOiBDb250cmFjdC5SYW5nZVZhbHVlKTogUmFuZ2VTZWxlY3Rpb25Nb2RlbCB7XHJcbiAgICBsZXQgcmFuZ2VTZWxlY3Rpb25Nb2RlbDogUmFuZ2VTZWxlY3Rpb25Nb2RlbCA9IG5ldyBSYW5nZVNlbGVjdGlvbk1vZGVsKCk7XHJcbiAgICByYW5nZVNlbGVjdGlvbk1vZGVsLnF1YWxpZmllZEZpZWxkQ2FwdGlvbiA9IGZpZWxkTmFtZTtcclxuICAgIGlmICh2YWx1ZS5tYXggIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS5tYXggIT09IG51bGwpIHtcclxuICAgICAgcmFuZ2VTZWxlY3Rpb25Nb2RlbC5tYXhWYWx1ZSA9IHZhbHVlLm1heC50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbHVlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLm1pbiAhPT0gbnVsbCkge1xyXG4gICAgICByYW5nZVNlbGVjdGlvbk1vZGVsLm1pblZhbHVlID0gdmFsdWUubWluLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICByYW5nZVNlbGVjdGlvbk1vZGVsLmluY2x1ZGVkID0gdGhpcy52YWxpZGF0ZU51bGxPcHRpb25UeXBlKHZhbHVlLm51bGxPcHRpb24pO1xyXG4gICAgcmV0dXJuIHJhbmdlU2VsZWN0aW9uTW9kZWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gdmFsaWRhdGUgdGhlIHNlbGVjdGlvbiB1cGRhdGUgdHlwZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzZWxlY3Rpb25VcGRhdGVUeXBlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB2YWxpZGF0ZVNlbGVjdGlvblVwZGF0ZVR5cGUoc2VsZWN0aW9uVXBkYXRlVHlwZTogQ29udHJhY3QuU2VsZWN0aW9uVXBkYXRlVHlwZSk6IHN0cmluZyB7XHJcbiAgICBpZiAoc2VsZWN0aW9uVXBkYXRlVHlwZSA9PT0gQ29udHJhY3QuU2VsZWN0aW9uVXBkYXRlVHlwZS5SZXBsYWNlKSB7XHJcbiAgICAgIHJldHVybiBTZWxlY3Rpb25VcGRhdGVUeXBlSW50ZXJuYWwuUmVwbGFjZTtcclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uVXBkYXRlVHlwZSA9PT0gQ29udHJhY3QuU2VsZWN0aW9uVXBkYXRlVHlwZS5BZGQpIHtcclxuICAgICAgcmV0dXJuIFNlbGVjdGlvblVwZGF0ZVR5cGVJbnRlcm5hbC5BZGQ7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvblVwZGF0ZVR5cGUgPT09IENvbnRyYWN0LlNlbGVjdGlvblVwZGF0ZVR5cGUuUmVtb3ZlKSB7XHJcbiAgICAgIHJldHVybiBTZWxlY3Rpb25VcGRhdGVUeXBlSW50ZXJuYWwuUmVtb3ZlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFNlbGVjdGlvblVwZGF0ZVR5cGVJbnRlcm5hbC5SZXBsYWNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIHZhbGlkYXRlIHRoZSBpbmNsdWRlIHR5cGUgZm9yIHJhbmdlIHNlbGVjdGlvbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBudWxsT3B0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB2YWxpZGF0ZU51bGxPcHRpb25UeXBlKG51bGxPcHRpb246IENvbnRyYWN0LkZpbHRlck51bGxPcHRpb24gfCB1bmRlZmluZWQpOiBzdHJpbmcge1xyXG4gICAgaWYgKG51bGxPcHRpb24pIHtcclxuICAgICAgaWYgKG51bGxPcHRpb24gPT09IENvbnRyYWN0LkZpbHRlck51bGxPcHRpb24uTnVsbFZhbHVlcykge1xyXG4gICAgICAgIHJldHVybiBRdWFudGl0YXRpdmVJbmNsdWRlZFZhbHVlcy5JbmNsdWRlTnVsbDtcclxuICAgICAgfSBlbHNlIGlmIChudWxsT3B0aW9uID09PSBDb250cmFjdC5GaWx0ZXJOdWxsT3B0aW9uLk5vbk51bGxWYWx1ZXMpIHtcclxuICAgICAgICByZXR1cm4gUXVhbnRpdGF0aXZlSW5jbHVkZWRWYWx1ZXMuSW5jbHVkZU5vbk51bGw7XHJcbiAgICAgIH0gZWxzZSBpZiAobnVsbE9wdGlvbiA9PT0gQ29udHJhY3QuRmlsdGVyTnVsbE9wdGlvbi5BbGxWYWx1ZXMpIHtcclxuICAgICAgICByZXR1cm4gUXVhbnRpdGF0aXZlSW5jbHVkZWRWYWx1ZXMuSW5jbHVkZUFsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBRdWFudGl0YXRpdmVJbmNsdWRlZFZhbHVlcy5JbmNsdWRlQWxsO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbnVtIGZvciB0aGUgZGlmZmVyZW50IHNlbGVjdGlvbiBjcml0ZXJpYSB0eXBlcy5cclxuICovXHJcbmVudW0gU2VsZWN0aW9uQ3JpdGVyaWFUeXBlIHtcclxuICBIaWVyYXJjaGljYWxUeXBlID0gMSxcclxuICBSYW5nZVR5cGUgPSAyLFxyXG4gIERpbWVuc2lvblR5cGUgPSAzLFxyXG4gIFR1cGxlc1R5cGUgPSA0LFxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9pbXBsL1NlbGVjdGlvblNlcnZpY2VJbXBsLnRzXG4gKiovIiwiLyoqXHJcbiAqIFNlbGVjdGlvbiBNb2RlbC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25Nb2RlbCB7XHJcbiAgcXVhbGlmaWVkRmllbGRDYXB0aW9uOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBWYWx1ZSBiYXNlZCBzZWxlY3Rpb24gbW9kZWwuIE1lYW50IGZvciBoaWVyYXJjaGljYWwsIHJhbmdlIGFuZCBjYXRlZ29yaWNhbCBzZWxlY3Rpb25zLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZhbHVlU2VsZWN0aW9uTW9kZWwgZXh0ZW5kcyBTZWxlY3Rpb25Nb2RlbCB7XHJcbiAgc2VsZWN0VmFsdWVzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIaWVyYXJjaGljYWwgdmFsdWUgc2VsZWN0aW9uIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSGllcmFyY2hpY2FsU2VsZWN0aW9uTW9kZWwgZXh0ZW5kcyBWYWx1ZVNlbGVjdGlvbk1vZGVsIHtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJhbmdlIGJhc2VkIHZhbHVlIHNlbGVjdGlvbiBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJhbmdlU2VsZWN0aW9uTW9kZWwgZXh0ZW5kcyBTZWxlY3Rpb25Nb2RlbCB7XHJcbiAgbWluVmFsdWU6IHN0cmluZztcclxuICBtYXhWYWx1ZTogc3RyaW5nO1xyXG4gIGluY2x1ZGVkOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEaW1lbnNpb24gdmFsdWUgc2VsZWN0aW9uIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGltZW5zaW9uU2VsZWN0aW9uTW9kZWwgZXh0ZW5kcyBWYWx1ZVNlbGVjdGlvbk1vZGVsIHtcclxufVxyXG4vKipcclxuICogVHVwbGUgYmFzZWQgc2VsZWN0aW9uIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHVwbGVTZWxlY3Rpb25Nb2RlbCB7XHJcbiAgc2VsZWN0aW9uVHlwZTogc3RyaW5nO1xyXG4gIG9iamVjdElkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGNsYXNzIHRvIHBvcHVsYXRlIGFsbCB0aGUgc2VsZWN0aW9uIG1vZGVscyB3aGVuIHBhcnNpbmcgaW5wdXRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25Nb2RlbHNDb250YWluZXIge1xyXG4gIGhpZXJNb2RlbEFycjogQXJyYXk8SGllcmFyY2hpY2FsU2VsZWN0aW9uTW9kZWw+ID0gW107XHJcbiAgZGltTW9kZWxBcnI6IEFycmF5PERpbWVuc2lvblNlbGVjdGlvbk1vZGVsPiA9IFtdO1xyXG4gIHF1YW50TW9kZWxBcnI6IEFycmF5PFJhbmdlU2VsZWN0aW9uTW9kZWw+ID0gW107XHJcbiAgc2VsZWN0aW9uOiBUdXBsZVNlbGVjdGlvbk1vZGVsO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9Nb2RlbHMvU2VsZWN0aW9uTW9kZWxzLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHtcclxuICBDb21tYW5kUmVzcG9uc2VNZXNzYWdlLFxyXG4gIENyb3NzRnJhbWVNZXNzZW5nZXIsXHJcbiAgVkVSU0lPTiBhcyBBcGlNZXNzYWdpbmdWZXJzaW9uLFxyXG59IGZyb20gJ0B0YWJsZWF1L2FwaS1tZXNzYWdpbmcnO1xyXG5cclxuaW1wb3J0IHsgQ3Jvc3NGcmFtZURpc3BhdGNoZXIgfSBmcm9tICcuL0Nyb3NzRnJhbWVEaXNwYXRjaGVyJztcclxuXHJcbi8vIENoZWNrcyB0byBzZWUgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYW4gaWZyYW1lIGN1cnJlbnRseTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzMyNjA3Ni84ODIxMTUzXHJcbmZ1bmN0aW9uIGluSWZyYW1lKHRoaXNXaW5kb3c6IFdpbmRvdyk6IGJvb2xlYW4ge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gdGhpc1dpbmRvdy5zZWxmICE9PSB0aGlzV2luZG93LnBhcmVudDtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBdHRlbXB0cyB0byBib290c3RyYXAgdGhlIGV4dGVuc2lvbiB3aXRoIGEgY3Jvc3MtZnJhbWUgcGFyZW50IHdoZXJlIFRhYmxlYXUgaXMgcnVubmluZ1xyXG4gKlxyXG4gKiBAcGFyYW0gdGhpc1dpbmRvdyBUaGUgd2luZG93IHdoaWNoIHdlIGFyZSBydW5uaW5nIGluIChpbmplY3RlZCBmb3IgdW5pdCB0ZXN0aW5nIHB1cnBvc2VzKVxyXG4gKiBAcGFyYW0gdmVyc2lvbk51bWJlciBUaGUgdmVyc2lvbiBudW1iZXIgb2Ygb3VyIEFQSSB0byBpbmNsdWRlIGluIHRoZSBpbml0aWFsaXphdGlvbiBtZXNzYWdlXHJcbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCBpcyBkb2luZyB0aGUgYWN0dWFsIGJvb3RzdHJhcHBpbmdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkb0Nyb3NzRnJhbWVCb290c3RyYXAodGhpc1dpbmRvdzogV2luZG93LCB2ZXJzaW9uTnVtYmVyOiBDb250cmFjdC5WZXJzaW9uTnVtYmVyKTogUHJvbWlzZTxDb250cmFjdC5JbnRlcm5hbEFwaURpc3BhdGNoZXI+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2U8Q29udHJhY3QuSW50ZXJuYWxBcGlEaXNwYXRjaGVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG4gICAgLy8gQ2hlY2sgdG8gbWFrZSBzdXJlIHdlJ3JlIGluIGFuIGlmcmFtZSBhbmQgaGF2ZSBhIHBhcmVudCB0byBjb21tdW5pY2F0ZSB3aXRoXHJcbiAgICBpZiAoIWluSWZyYW1lKHRoaXNXaW5kb3cpKSB7XHJcbiAgICAgIHJlamVjdCgnVGhpcyBleHRlbnNpb24gaXMgbm90IHJ1bm5pbmcgaW5zaWRlIGFuIGlmcmFtZSBvciBkZXNrdG9wLiBJbml0aWFsaXphdGlvbiBmYWlsZWQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JlYXRlIHRoZSBtZXNzZW5nZXIgd2hpY2ggd2lsbCBkbyBoZSBjb21tdW5pY2F0aW9uIGJldHdlZW4gdGhpcyB3aW5kb3cgYW5kIG91ciBwYXJlbnRcclxuICAgIC8vIFNpbmNlIHdlIGRvbid0IGtub3cgd2hlcmUgd2UgYXJlIHJ1bm5pbmcgeWV0LCB3ZSBoYXZlIHRvIG1ha2UgdGhpcyBpbml0aWFsIG9yaWdpbiAnKicuIE9uY2VcclxuICAgIC8vIHdlIGhhdmUgc3VjY2Vzc2Z1bGx5IGluaXRpYWxpemVkIG91ciBleHRlbnNpb24sIHdlIHdpbGwgbGltaXQgd2hlcmUgd2Ugc2VuZCBtZXNzYWdlc1xyXG4gICAgY29uc3QgbWVzc2VuZ2VyID0gbmV3IENyb3NzRnJhbWVNZXNzZW5nZXIodGhpc1dpbmRvdywgdGhpc1dpbmRvdy5wYXJlbnQsICcqJyk7XHJcblxyXG4gICAgLy8gUHJlcGFyZSB0byBzZW5kIGFuIGluaXRpYWxpemF0aW9uIG1lc3NhZ2UgdG8gdGhlIHBhcmVudCBmcmFtZVxyXG4gICAgY29uc3QgaW5pdGlhbGl6YXRpb25NZXNzYWdlID0gbWVzc2VuZ2VyLnByZXBhcmVJbml0aWFsaXphdGlvbk1lc3NhZ2UodmVyc2lvbk51bWJlciwgQXBpTWVzc2FnaW5nVmVyc2lvbik7XHJcblxyXG4gICAgLy8gV2hlbiB3ZSByZWNlaXZlIGEgcmVzcG9uc2UgYmFjayBmcm9tIHRoZSBwYXJlbnQsIHdlIGNoZWNrIHRvIG1ha2Ugc3VyZSB0aGUgZ3VpZHMgbWF0Y2ggYW5kIHRoZW4gd2Uga25vd1xyXG4gICAgLy8gdGhhdCB0aGUgcGFyZW50IGlzIGF3YXJlIG9mIHVzIGFuZCB3ZSBjYW4gc3RhcnQgY29tbXVuaWNhdGluZ1xyXG4gICAgbWVzc2VuZ2VyLnNldENvbW1hbmRSZXNwb25zZU1lc3NhZ2VIYW5kbGVyKGZ1bmN0aW9uKG1zZzogQ29tbWFuZFJlc3BvbnNlTWVzc2FnZSk6IHZvaWQge1xyXG5cclxuICAgICAgLy8gVmVyaWZ5IHdlIGFyZSBnZXR0aW5nIGEgcmVzcG9uc2UgZnJvbSBvdXIgaW5pdGlhbGl6ZSBtZXNzYWdlXHJcbiAgICAgIGlmIChtc2cuY29tbWFuZEd1aWQgPT09IGluaXRpYWxpemF0aW9uTWVzc2FnZS5tZXNzYWdlR3VpZCkge1xyXG4gICAgICAgIGNvbnN0IGRpc3BhdGNoZXIgPSBuZXcgQ3Jvc3NGcmFtZURpc3BhdGNoZXIobWVzc2VuZ2VyKTtcclxuICAgICAgICByZXNvbHZlKGRpc3BhdGNoZXIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBOb3cgdGhhdCBvdXIgaGFuZGxlcnMgYXJlIHJlYWR5LCBzdGFydCBsaXN0ZW5pbmcgYW5kIHNlbmQgb3VyIGluaXRpYWxpemF0aW9uIG1lc3NhZ2VcclxuICAgIG1lc3Nlbmdlci5zdGFydExpc3RlbmluZygpO1xyXG4gICAgaW5pdGlhbGl6YXRpb25NZXNzYWdlLnNlbmQoKTtcclxuICB9KTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvQ3Jvc3NGcmFtZS9Dcm9zc0ZyYW1lQm9vdHN0cmFwLnRzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgeW91ciBtYWluLiBUaGlzIGlzIHdoZXJlIHlvdSByZS1leHBvcnQgZXZlcnl0aGluZyB5b3Ugd2FudCB0byBiZSBwdWJsaWNseSBhdmFpbGFibGUuXHJcbiAqXHJcbiAqIFRoZSBidWlsZCBlbmZvcmNlcyB0aGF0IHRoZSBmaWxlIGhhcyB0aGUgc2FtZSBuYW1lIGFzIHRoZSBnbG9iYWwgdmFyaWFibGUgdGhhdCBpcyBleHBvcnRlZC5cclxuICovXHJcblxyXG5leHBvcnQgKiBmcm9tICcuL0Nyb3NzRnJhbWVNZXNzZW5nZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9NZXNzYWdlRGlzcGF0Y2hlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL01lc3NhZ2VMaXN0ZW5lcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL01lc3NhZ2VUeXBlcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL01lc3Nlbmdlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL1ByZXBhcmVkTWVzc2FnZSc7XHJcblxyXG4vLyBFeHBvcnQgdGhlIHZlcnNpb24gbnVtYmVyIG9mIG1lc3NhZ2luZyBmb3IgY29uc3VtZXJzIHRvIHVzZS5cclxuLy8gQmUgdmVyeSBjYXJlZnVsIG1ha2luZyBhbnkgdXBkYXRlcyB0byB0aGlzIGNvbnRyYWN0IHdoaWNoIGJyZWFrIHZlcnNpb24gY29tcGF0aWJpbGl0eS5cclxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSB7XHJcbiAgbWFqb3I6IDEsXHJcbiAgbWlub3I6IDAsXHJcbiAgZml4OiAwXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktbWVzc2FnaW5nL3NyYy9BcGlNZXNzYWdpbmcudHNcbiAqKi8iLCJpbXBvcnQgeyBFeGVjdXRlUGFyYW1ldGVycywgTW9kZWwsIE5vdGlmaWNhdGlvbklkLCBWZXJiSWQsIFZlcnNpb25OdW1iZXIgfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBHdWlkIH0gZnJvbSAnQHRhYmxlYXUvZ3VpZCc7XHJcblxyXG5pbXBvcnQgeyBDcm9zc0ZyYW1lUHJlcGFyZWRNZXNzYWdlIH0gZnJvbSAnLi9Dcm9zc0ZyYW1lUHJlcGFyZWRNZXNzYWdlJztcclxuaW1wb3J0IHtcclxuICBDb21tYW5kTWVzc2FnZSxcclxuICBDb21tYW5kUmVzcG9uc2VNZXNzYWdlLFxyXG4gIEluaXRpYWxpemVNZXNzYWdlLFxyXG4gIE1lc3NhZ2UsXHJcbiAgTWVzc2FnZVR5cGUsXHJcbiAgTm90aWZpY2F0aW9uTWVzc2FnZSxcclxufSBmcm9tICcuL2ludGVyZmFjZS9NZXNzYWdlVHlwZXMnO1xyXG5pbXBvcnQgeyBNZXNzZW5nZXIgfSBmcm9tICcuL2ludGVyZmFjZS9NZXNzZW5nZXInO1xyXG5pbXBvcnQgeyBQcmVwYXJlZE1lc3NhZ2UgfSBmcm9tICcuL2ludGVyZmFjZS9QcmVwYXJlZE1lc3NhZ2UnO1xyXG5pbXBvcnQge1xyXG4gIGlzQ29tbWFuZE1lc3NhZ2UsXHJcbiAgaXNDb21tYW5kUmVzcG9uc2VNZXNzYWdlLFxyXG4gIGlzSW5pdE1lc3NhZ2UsXHJcbiAgaXNNZXNzYWdlLFxyXG4gIGlzTm90aWZpY2F0aW9uTWVzc2FnZSxcclxufSBmcm9tICcuL01lc3NhZ2VUeXBlQ2hlY2tzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ3Jvc3NGcmFtZU1lc3NlbmdlciBpcyB0aGUgcHJpbWFyeSBleHBvcnQgZnJvbSB0aGUgYXBpLW1lc3NhZ2luZyBtb2R1bGUuIEFuIGluc3RhbmNlIG9mXHJcbiAqIHRoaXMgY2xhc3MgY2FuIGJlIGluc3RhbnRpYXRlZCBvbiBib3RoIHNpZGVzIG9mIGEgZnJhbWUgYm91bmRhcnkgdG8gZmFjaWxpdGF0ZSBjb21tdW5pY2F0aW9uXHJcbiAqIGluIGJvdGggZGlyZWN0aW9ucyBiZXR3ZWVuIHRoZSBmcmFtZXMuIFRoaXMgY2xhc3MgaW1wbGVtZW50cyBib3RoIHRoZSBkaXNwYXRjaGVyIGFuZCB0aGUgbGlzdGVuZXJcclxuICogcG9ydGlvbnMsIGJ1dCBkb2Vzbid0IHJlcXVpcmUgY2FsbGVycyB0byBjYXJlIGFib3V0IGJvdGguXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ3Jvc3NGcmFtZU1lc3NlbmdlciBpbXBsZW1lbnRzIE1lc3NlbmdlciB7XHJcbiAgcHJpdmF0ZSB1bnJlZ2lzdGVyRnVuY3Rpb246IHVuZGVmaW5lZCB8ICgoKSA9PiB2b2lkKTtcclxuICBwcml2YXRlIGluaXRpYWxpemVNZXNzYWdlSGFuZGxlcjogdW5kZWZpbmVkIHwgKChtc2c6IEluaXRpYWxpemVNZXNzYWdlLCBzb3VyY2U6IFdpbmRvdykgPT4gdm9pZCk7XHJcbiAgcHJpdmF0ZSBjb21tYW5kUmVzcG9uc2VNZXNzYWdlSGFuZGxlcjogdW5kZWZpbmVkIHwgKChtc2c6IENvbW1hbmRSZXNwb25zZU1lc3NhZ2UsIHNvdXJjZTogV2luZG93KSA9PiB2b2lkKTtcclxuICBwcml2YXRlIGNvbW1hbmRNZXNzYWdlSGFuZGxlcjogdW5kZWZpbmVkIHwgKChtc2c6IENvbW1hbmRNZXNzYWdlLCBzb3VyY2U6IFdpbmRvdykgPT4gdm9pZCk7XHJcbiAgcHJpdmF0ZSBub3RpZmljYXRpb25NZXNzYWdlSGFuZGxlcjogdW5kZWZpbmVkIHwgKChtc2c6IE5vdGlmaWNhdGlvbk1lc3NhZ2UsIHNvdXJjZTogV2luZG93KSA9PiB2b2lkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDcm9zc0ZyYW1lTWVzc2VuZ2VyLiBJZiB5b3Ugd291bGQgbGlrZSB0byB1c2UgdGhlIENyb3NzRnJhbWVNZXNzZW5nZXIgYXMgYSBNZXNzYWdlTGlzdGVuZXIsXHJcbiAgICogYmUgc3VyZSB0byBjYWxsIFN0YXJ0TGlzdGVuaW5nIGFuZCByZWdpc3RlciBtZXNzYWdlIGhhbmRsZXJzLlxyXG4gICAqIEBwYXJhbSB0aGlzV2luZG93IFRoZSB3aW5kb3cgb2JqZWN0IHdoaWNoIHRoZSBDcm9zc0ZyYW1lTWVzc2VuZ2VyIGxpdmVzLiBBbiBvbk1lc3NhZ2UgbGlzdGVuZXIgd2lsbCBiZSBhZGRlZCBoZXJlLlxyXG4gICAqIEBwYXJhbSBbb3RoZXJXaW5kb3ddIE9wdGlvbmFsIG90aGVyV2luZG93IHdoaWNoIG1lc3NhZ2VzIHdpbGwgYmUgcG9zdGVkIHRvLlxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgIElmIGRlZmluZWQsIGluY29taW5nIG1lc3NhZ2VzIG11c3Qgb3JpZ2luYXRlIGZyb20gb3RoZXJXaW5kb3cgdG8gYmUgcGFzc2VkIG9uXHJcbiAgICogQHBhcmFtIFtvdGhlcldpbmRvd09yaWdpbl0gVGhlIHRhcmdldCBvcmlnaW4gd2hpY2ggb3RoZXJXaW5kb3cgbXVzdCBoYXZlIGluIG9yZGVyIHRvIHJlY2VpdmUgZGlzcGF0Y2hlZCBtZXNzYWdlcy5cclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIHZhbHVlIHdpbGwgYmUgc2VudCBhcyB0aGUgdGFyZ2V0T3JpZ2luIG9mIGEgcG9zdE1lc3NhZ2VcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvdy9wb3N0TWVzc2FnZSlcclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSB0aGlzV2luZG93OiBXaW5kb3csIHByaXZhdGUgb3RoZXJXaW5kb3c/OiBXaW5kb3csIHByaXZhdGUgb3RoZXJXaW5kb3dPcmlnaW4/OiBzdHJpbmcpIHtcclxuICAgIC8vIE1ha2Ugc3VyZSB0byBjYWxsIFN0YXJ0TGlzdGVuaW5nXHJcbiAgfVxyXG5cclxuICAvLy8vLyBNZXNzYWdlTGlzdGVuZXIgSW1wbGVtZW50YXRpb25cclxuXHJcbiAgcHVibGljIHN0YXJ0TGlzdGVuaW5nKCk6IHZvaWQge1xyXG4gICAgLy8gQ2hlY2sgaWYgd2UgYWxyZWFkeSBhcmUgbGlzdGVuaW5nLCBpZiBub3QsIGhvb2sgdXAgYSBtZXNzYWdlIGxpc3RlbmVyXHJcbiAgICBpZiAoIXRoaXMudW5yZWdpc3RlckZ1bmN0aW9uKSB7XHJcbiAgICAgIGNvbnN0IGJvdW5kSGFuZGxlciA9IHRoaXMub25NZXNzYWdlUmVjZWl2ZWQuYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy50aGlzV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBib3VuZEhhbmRsZXIsIHRydWUpO1xyXG4gICAgICB0aGlzLnVucmVnaXN0ZXJGdW5jdGlvbiA9ICgpID0+IHRoaXMudGhpc1dpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgYm91bmRIYW5kbGVyLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdG9wTGlzdGVuaW5nKCk6IHZvaWQge1xyXG4gICAgLy8gU3RvcCBsaXN0ZW5pbmcgaWYgd2UgaGF2ZSBzdGFydGVkIGxpc3RlbmluZ1xyXG4gICAgaWYgKHRoaXMudW5yZWdpc3RlckZ1bmN0aW9uKSB7XHJcbiAgICAgIHRoaXMudW5yZWdpc3RlckZ1bmN0aW9uKCk7XHJcbiAgICAgIHRoaXMudW5yZWdpc3RlckZ1bmN0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldEluaXRpYWxpemVNZXNzYWdlSGFuZGxlcihoYW5kbGVyPzogKG1zZzogSW5pdGlhbGl6ZU1lc3NhZ2UsIHNvdXJjZTogV2luZG93KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLmluaXRpYWxpemVNZXNzYWdlSGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0Q29tbWFuZFJlc3BvbnNlTWVzc2FnZUhhbmRsZXIoaGFuZGxlcj86IChtc2c6IENvbW1hbmRSZXNwb25zZU1lc3NhZ2UsIHNvdXJjZTogV2luZG93KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbW1hbmRSZXNwb25zZU1lc3NhZ2VIYW5kbGVyID0gaGFuZGxlcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRDb21tYW5kTWVzc2FnZUhhbmRsZXIoaGFuZGxlcj86IChtc2c6IENvbW1hbmRNZXNzYWdlLCBzb3VyY2U6IFdpbmRvdykgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb21tYW5kTWVzc2FnZUhhbmRsZXIgPSBoYW5kbGVyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE5vdGlmaWNhdGlvbk1lc3NhZ2VIYW5kbGVyKGhhbmRsZXI/OiAobXNnOiBOb3RpZmljYXRpb25NZXNzYWdlLCBzb3VyY2U6IFdpbmRvdykgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5ub3RpZmljYXRpb25NZXNzYWdlSGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgfVxyXG5cclxuICAvLy8vLyBNZXNzYWdlRGlzcGF0Y2hlciBJbXBsZW1lbnRhdGlvblxyXG5cclxuICBwdWJsaWMgcHJlcGFyZUluaXRpYWxpemF0aW9uTWVzc2FnZShhcGlWZXJzaW9uOiBWZXJzaW9uTnVtYmVyLCBjcm9zc0ZyYW1lVmVyc2lvbjogVmVyc2lvbk51bWJlcik6IFByZXBhcmVkTWVzc2FnZSB7XHJcbiAgICBjb25zdCBtZXNzYWdlOiBJbml0aWFsaXplTWVzc2FnZSA9IHtcclxuICAgICAgbXNnR3VpZDogR3VpZC5jcmVhdGUoKS5mb3JtYXR0ZWRWYWx1ZSxcclxuICAgICAgbXNnVHlwZTogTWVzc2FnZVR5cGUuSW5pdGlhbGl6ZSxcclxuICAgICAgY3Jvc3NGcmFtZVZlcnNpb246IGNyb3NzRnJhbWVWZXJzaW9uLFxyXG4gICAgICBhcGlWZXJzaW9uOiBhcGlWZXJzaW9uXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGlzLnByZXBhcmVNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHByZXBhcmVDb21tYW5kTWVzc2FnZSh2ZXJiSWQ6IFZlcmJJZCwgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMpOiBQcmVwYXJlZE1lc3NhZ2Uge1xyXG4gICAgY29uc3QgbWVzc2FnZTogQ29tbWFuZE1lc3NhZ2UgPSB7XHJcbiAgICAgIG1zZ0d1aWQ6IEd1aWQuY3JlYXRlKCkuZm9ybWF0dGVkVmFsdWUsXHJcbiAgICAgIG1zZ1R5cGU6IE1lc3NhZ2VUeXBlLkNvbW1hbmQsXHJcbiAgICAgIHZlcmJJZDogdmVyYklkLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGlzLnByZXBhcmVNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHByZXBhcmVDb21tYW5kUmVzcG9uc2VNZXNzYWdlKGNvbW1hbmRHdWlkOiBzdHJpbmcsIGRhdGE6IE1vZGVsIHwgdW5kZWZpbmVkLCBlcnJvcjogTW9kZWwgfCB1bmRlZmluZWQpOiBQcmVwYXJlZE1lc3NhZ2Uge1xyXG4gICAgY29uc3QgbWVzc2FnZTogQ29tbWFuZFJlc3BvbnNlTWVzc2FnZSA9IHtcclxuICAgICAgbXNnR3VpZDogR3VpZC5jcmVhdGUoKS5mb3JtYXR0ZWRWYWx1ZSxcclxuICAgICAgbXNnVHlwZTogTWVzc2FnZVR5cGUuQ29tbWFuZFJlc3BvbnNlLFxyXG4gICAgICBjb21tYW5kR3VpZDogY29tbWFuZEd1aWQsXHJcbiAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgIGVycm9yOiBlcnJvclxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5wcmVwYXJlTWVzc2FnZShtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwcmVwYXJlTm90aWZpY2F0aW9uTWVzc2FnZShub3RpZmljYXRpb25JZDogTm90aWZpY2F0aW9uSWQsIGRhdGE6IE1vZGVsKTogUHJlcGFyZWRNZXNzYWdlIHtcclxuICAgIGNvbnN0IG1lc3NhZ2U6IE5vdGlmaWNhdGlvbk1lc3NhZ2UgPSB7XHJcbiAgICAgIG1zZ0d1aWQ6IEd1aWQuY3JlYXRlKCkuZm9ybWF0dGVkVmFsdWUsXHJcbiAgICAgIG1zZ1R5cGU6IE1lc3NhZ2VUeXBlLk5vdGlmaWNhdGlvbixcclxuICAgICAgbm90aWZpY2F0aW9uSWQ6IG5vdGlmaWNhdGlvbklkLFxyXG4gICAgICBkYXRhOiBkYXRhXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGlzLnByZXBhcmVNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJlcGFyZXMgYSBwZW5kaW5nIG1lc3NhZ2UgZm9yIHNlbmRpbmcgYW5kIHJldHVybnMgdGhlIHByZXBhcmVkIG1lc3NhZ2VcclxuICAgKlxyXG4gICAqIEBwYXJhbSBtc2cgVGhlIG1lc3NhZ2UgdG8gYmUgc2VudCB0byB0aGlzLm90aGVyV2luZG93XHJcbiAgICogQHJldHVybnMgVGhlIHByZXBhcmVkIG1lc3NhZ2VcclxuICAgKi9cclxuICBwcml2YXRlIHByZXBhcmVNZXNzYWdlKG1zZzogTWVzc2FnZSk6IFByZXBhcmVkTWVzc2FnZSB7XHJcbiAgICBpZiAoIXRoaXMub3RoZXJXaW5kb3cgfHwgIXRoaXMub3RoZXJXaW5kb3dPcmlnaW4pIHtcclxuICAgICAgdGhyb3cgJ090aGVyIHdpbmRvdyBub3QgaW5pdGlhbGl6ZWQsIGNhbm5vdCBkaXNwYXRjaCBtZXNzYWdlcyc7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJlcGFyZWRNZXNzYWdlID0gbmV3IENyb3NzRnJhbWVQcmVwYXJlZE1lc3NhZ2UobXNnLCB0aGlzLm90aGVyV2luZG93LCB0aGlzLm90aGVyV2luZG93T3JpZ2luKTtcclxuICAgIHJldHVybiBwcmVwYXJlZE1lc3NhZ2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhIG1lc3NhZ2UgaXMgcmVjZWl2ZWQuIERvZXMgc29tZSB2YWxpZGF0aW9uIG9mIHRoZSBtZXNzYWdlLCBhbmQgdGhlblxyXG4gICAqIGNhbGxzIGFuIGFwcHJvcHJpYXRlIG1lc3NhZ2UgaGFuZGxlciBpZiBvbmUgaXMgZGVmaW5lZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50IFRoZSBpbmNvbWluZyBNZXNzYWdlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTWVzc2FnZVJlY2VpdmVkKGV2ZW50OiBNZXNzYWdlRXZlbnQpOiB2b2lkIHtcclxuXHJcbiAgICAvLyBJZiB3ZSBoYXZlIGFuIG90aGVyV2luZG93IGRlZmluZWQsIG1ha2Ugc3VyZSB0aGUgbWVzc2FnZSBpcyBjb21pbmcgZnJvbSB0aGVyZVxyXG4gICAgaWYgKHRoaXMub3RoZXJXaW5kb3cgJiYgZXZlbnQuc291cmNlICE9PSB0aGlzLm90aGVyV2luZG93KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEbyBzb21lIHZhbGlkYXRpb24gb24gZXZlbnQuZGF0YSB0byBtYWtlIHN1cmUgdGhhdCB3ZSBoYXZlIHJlY2VpdmVkIGEgcmVhbCBtZXNzYWdlXHJcbiAgICBpZiAoIWV2ZW50LmRhdGEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5kYXRhO1xyXG4gICAgaWYgKCFpc01lc3NhZ2UobWVzc2FnZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIHRoZSBkZWNsYXJlZCBtZXNzYWdlIHR5cGUsIHZhbGlkYXRlIHRoZSBtZXNzYWdlLCBhbmQgY2FsbCBhbiBhcHByb3ByaWF0ZSBoYW5kZXIgaWYgb25lIGV4aXN0c1xyXG4gICAgc3dpdGNoIChtZXNzYWdlLm1zZ1R5cGUpIHtcclxuICAgICAgY2FzZSBNZXNzYWdlVHlwZS5Jbml0aWFsaXplOiB7XHJcbiAgICAgICAgaWYgKCFpc0luaXRNZXNzYWdlKG1lc3NhZ2UpIHx8ICF0aGlzLmluaXRpYWxpemVNZXNzYWdlSGFuZGxlcikge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplTWVzc2FnZUhhbmRsZXIobWVzc2FnZSwgZXZlbnQuc291cmNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIE1lc3NhZ2VUeXBlLkNvbW1hbmRSZXNwb25zZToge1xyXG4gICAgICAgIGlmICghaXNDb21tYW5kUmVzcG9uc2VNZXNzYWdlKG1lc3NhZ2UpIHx8ICF0aGlzLmNvbW1hbmRSZXNwb25zZU1lc3NhZ2VIYW5kbGVyKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbW1hbmRSZXNwb25zZU1lc3NhZ2VIYW5kbGVyKG1lc3NhZ2UsIGV2ZW50LnNvdXJjZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBNZXNzYWdlVHlwZS5Db21tYW5kOiB7XHJcbiAgICAgICAgaWYgKCFpc0NvbW1hbmRNZXNzYWdlKG1lc3NhZ2UpIHx8ICF0aGlzLmNvbW1hbmRNZXNzYWdlSGFuZGxlcikge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb21tYW5kTWVzc2FnZUhhbmRsZXIobWVzc2FnZSwgZXZlbnQuc291cmNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIE1lc3NhZ2VUeXBlLk5vdGlmaWNhdGlvbjoge1xyXG4gICAgICAgIGlmICghaXNOb3RpZmljYXRpb25NZXNzYWdlKG1lc3NhZ2UpIHx8ICF0aGlzLm5vdGlmaWNhdGlvbk1lc3NhZ2VIYW5kbGVyKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbk1lc3NhZ2VIYW5kbGVyKG1lc3NhZ2UsIGV2ZW50LnNvdXJjZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBKdXN0IGlnbm9yZSB0aGlzIHNpbmNlIHdlIGRvbid0IGtub3cgaG93IHRvIGhhbmRsZSB0aGUgbWVzc2FnZSB0eXBlXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi90eXBlc2NyaXB0L2pzLWFwaS9hcGktbWVzc2FnaW5nL3NyYy9Dcm9zc0ZyYW1lTWVzc2VuZ2VyLnRzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9HdWlkLnRzXG4gKiovIiwiaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJy4vaW50ZXJmYWNlL01lc3NhZ2VUeXBlcyc7XHJcbmltcG9ydCB7IFByZXBhcmVkTWVzc2FnZSB9IGZyb20gJy4vaW50ZXJmYWNlL1ByZXBhcmVkTWVzc2FnZSc7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIFByZXBhcmVkTWVzc2FnZSBpbnRlcmZhY2UgdXNlZCB0byBwb3N0IG1lc3NhZ2VzIGJldHdlZW5cclxuICogdHdvIGZyYW1lcyB1c2luZyB3aW5kb3cucG9zdE1lc3NhZ2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDcm9zc0ZyYW1lUHJlcGFyZWRNZXNzYWdlIGltcGxlbWVudHMgUHJlcGFyZWRNZXNzYWdlIHtcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENyb3NzRnJhbWVQcmVwYXJlZE1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIF9tZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGJlIHNlbnRcclxuICAgKiBAcGFyYW0gX3RhcmdldCBUaGUgdGFyZ2V0IHdpbmRvdyB3aGVyZSB0aGUgbWVzc2FnZSB3aWxsIGJlIHNlbnRcclxuICAgKiBAcGFyYW0gX29yaWdpbiBUaGUgdGFyZ2V0T3JpZ2luIHdoZXJlIHRoaXMgbWVzc2FnZSBjYW4gYmUgcmVjZWl2ZWRcclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZTogTWVzc2FnZSwgcHJpdmF0ZSBfdGFyZ2V0OiBXaW5kb3csIHByaXZhdGUgX29yaWdpbjogc3RyaW5nKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBtZXNzYWdlR3VpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbWVzc2FnZS5tc2dHdWlkOyB9XHJcblxyXG4gIHB1YmxpYyBzZW5kKCk6IFByZXBhcmVkTWVzc2FnZSB7XHJcbiAgICB0aGlzLl90YXJnZXQucG9zdE1lc3NhZ2UodGhpcy5fbWVzc2FnZSwgdGhpcy5fb3JpZ2luKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLW1lc3NhZ2luZy9zcmMvQ3Jvc3NGcmFtZVByZXBhcmVkTWVzc2FnZS50c1xuICoqLyIsImltcG9ydCB7IEV4ZWN1dGVQYXJhbWV0ZXJzLCBNb2RlbCwgTm90aWZpY2F0aW9uSWQsIFZlcmJJZCwgVmVyc2lvbk51bWJlciB9IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcblxyXG4vKipcclxuICogRW51bSBkZWZpbmluZyB0aGUgNCBkaWZmZXJlbnQgdHlwZXMgb2YgbWVzc2FnZXMgd2UgaGF2ZSBkZWZpbmVkXHJcbiAqL1xyXG5leHBvcnQgZW51bSBNZXNzYWdlVHlwZSB7XHJcbiAgSW5pdGlhbGl6ZSA9ICdpbml0aWFsaXplJyxcclxuICBOb3RpZmljYXRpb24gPSAnbm90aWZpY2F0aW9uJyxcclxuICBDb21tYW5kID0gJ2NvbW1hbmQnLFxyXG4gIENvbW1hbmRSZXNwb25zZSA9ICdjb21tYW5kLXJlc3BvbnNlJ1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIE1lc3NhZ2UgaW50ZXJmYWNlIGlzIHRoZSBiYXNlIGludGVyZmFjZSBmb3IgYWxsIHRoZSBvdGhlclxyXG4gKiBtZXNzYWdlIHR5cGUgaW50ZXJmYWNlcy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZSB7XHJcbiAgLyoqXHJcbiAgICogQSB1bmlxdWUgaWQgZm9yIHRoaXMgbWVzc2FnZVxyXG4gICAqL1xyXG4gIG1zZ0d1aWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHR5cGUgb2YgdGhpcyBtZXNzYWdlXHJcbiAgICovXHJcbiAgbXNnVHlwZTogTWVzc2FnZVR5cGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgaW5pdGlhbGl6ZSBtZXNzYWdlIGlzIHRoZSBmaXJzdCBtZXNzYWdlIHdoaWNoIHdpbGwgYmUgc2VudFxyXG4gKiBmcm9tIHRoZSBqYXZhc2NyaXB0IHRvIHNldCB1cCBjb21tdW5pY2F0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJbml0aWFsaXplTWVzc2FnZSBleHRlbmRzIE1lc3NhZ2Uge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBhcGkgd2hpY2ggdGhlIHNlbmRlciB3YW50cyB0byB1c2VcclxuICAgKi9cclxuICBhcGlWZXJzaW9uOiBWZXJzaW9uTnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdmVyc2lvbiBvZiB0aGlzIG1lc3NhZ2luZyBjb250cmFjdCB0byBiZSB1c2VkLiBGb3Igbm93LCB0aGVyZVxyXG4gICAqIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHZlcnNpb24gYnV0IHNlbmRpbmcgdGhpcyBhbG9uZyBzaG91bGQgaGVscFxyXG4gICAqIGlmIHdlIG5lZWQgdG8gYWRkIGEgbmV3IHZlcnNpb24gaW4gYSBmdXR1cmUgcmVsZWFzZVxyXG4gICAqL1xyXG4gIGNyb3NzRnJhbWVWZXJzaW9uOiBWZXJzaW9uTnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBtZXNzYWdlIGlzIHNlbnQgd2hlbiBhIG5vdGlmaWNhdGlvbiBvY2N1cnMgZnJvbSB0aGUgcHJlc2xheWVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvbk1lc3NhZ2UgZXh0ZW5kcyBNZXNzYWdlIHtcclxuICAvKipcclxuICAgKiBUaGUgaWQgZm9yIHRoaXMgdHlwZSBvZiBub3RpZmljYXRpb25cclxuICAgKi9cclxuICBub3RpZmljYXRpb25JZDogTm90aWZpY2F0aW9uSWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXRhIHdoaWNoIGNhbWUgYWxvbmcgd2l0aCB0aGUgbm90aWZpY2F0aW9uXHJcbiAgICovXHJcbiAgZGF0YTogTW9kZWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGNhbGxpbmcgYW4gaW50ZXJuYWwgY29udHJhY3QgY29tbWFuZFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kTWVzc2FnZSBleHRlbmRzIE1lc3NhZ2Uge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBpZCBvZiB0aGUgY29tbWFuZCB3aGljaCBzaG91bGQgYmUgZXhlY3V0ZWRcclxuICAgKi9cclxuICB2ZXJiSWQ6IFZlcmJJZDtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBjb21tYW5kXHJcbiAgICovXHJcbiAgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1lc3NhZ2UgaXMgc2VudCBpbiByZXNwb25zZSB0byBhIENvbW1hbmRNZXNzYWdlIHdpdGggdGhlXHJcbiAqIHJlc3VsdCBvZiB0aGF0IGNvbW1hbmRzIGludm9jYXRpb25cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZFJlc3BvbnNlTWVzc2FnZSBleHRlbmRzIE1lc3NhZ2Uge1xyXG4gIC8qKlxyXG4gICAqIEd1aWQgb2YgdGhlIENvbW1hbmRNZXNzYWdlIHdoaWNoIHRoaXMgaXMgaW4gcmVzcG9uc2UgdG9cclxuICAgKi9cclxuICBjb21tYW5kR3VpZDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBJZiB0aGVyZSB3YXMgYW4gZXJyb3IgcmV0dXJuZWQgZnJvbSB0aGUgY29tbWFuZCwgdGhpcyB3aWxsIGJlIGRlZmluZWRcclxuICAgKiBhbmQgY29udGFpbiB0aGUgZXJyb3JcclxuICAgKi9cclxuICBlcnJvcj86IE1vZGVsO1xyXG5cclxuICAvKipcclxuICAgKiBJZiB0aGUgY29tbWFuZCBleGVjdXRlZCBzdWNjZXNzZnVsbHksIHRoaXMgd2lsbCBjb250YWluIHRoZSBjb21tYW5kIHJlc3VsdFxyXG4gICAqL1xyXG4gIGRhdGE/OiBNb2RlbDtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLW1lc3NhZ2luZy9zcmMvaW50ZXJmYWNlL01lc3NhZ2VUeXBlcy50c1xuICoqLyIsImltcG9ydCB7IFZlcnNpb25OdW1iZXIgfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBHdWlkIH0gZnJvbSAnQHRhYmxlYXUvZ3VpZCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENvbW1hbmRNZXNzYWdlLFxyXG4gIENvbW1hbmRSZXNwb25zZU1lc3NhZ2UsXHJcbiAgSW5pdGlhbGl6ZU1lc3NhZ2UsXHJcbiAgTWVzc2FnZSxcclxuICBNZXNzYWdlVHlwZSxcclxuICBOb3RpZmljYXRpb25NZXNzYWdlLFxyXG59IGZyb20gJy4vaW50ZXJmYWNlL01lc3NhZ2VUeXBlcyc7XHJcblxyXG4vKiB0c2xpbnQ6ZGlzYWJsZSBuby1hbnkgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTWVzc2FnZShkYXRhOiBNZXNzYWdlIHwgYW55KTogZGF0YSBpcyBNZXNzYWdlIHtcclxuICBpZiAoIWRhdGEpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1lc3NhZ2UgPSBkYXRhIGFzIE1lc3NhZ2U7XHJcbiAgaWYgKCFtZXNzYWdlIHx8ICFtZXNzYWdlLm1zZ0d1aWQgfHwgIW1lc3NhZ2UubXNnVHlwZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFHdWlkLmlzR3VpZChtZXNzYWdlLm1zZ0d1aWQpKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG1lc3NhZ2UubXNnVHlwZSAhPT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1lc3NhZ2VUeXBlczogQXJyYXk8c3RyaW5nPiA9XHJcbiAgWyBNZXNzYWdlVHlwZS5Db21tYW5kLCBNZXNzYWdlVHlwZS5Db21tYW5kUmVzcG9uc2UsIE1lc3NhZ2VUeXBlLkluaXRpYWxpemUsIE1lc3NhZ2VUeXBlLk5vdGlmaWNhdGlvbiBdO1xyXG5cclxuICBpZiAobWVzc2FnZVR5cGVzLmluZGV4T2YobWVzc2FnZS5tc2dUeXBlKSA8IDApIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWZXJzaW9uKHZlcnNpb25OdW1iZXI6IFZlcnNpb25OdW1iZXIgfCBhbnkpOiB2ZXJzaW9uTnVtYmVyIGlzIFZlcnNpb25OdW1iZXIge1xyXG4gIGlmICghdmVyc2lvbk51bWJlcikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdiA9IHZlcnNpb25OdW1iZXIgYXMgVmVyc2lvbk51bWJlcjtcclxuXHJcbiAgaWYgKHR5cGVvZiB2ICE9PSAnb2JqZWN0Jykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiB2LmZpeCAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHYubWlub3IgIT09ICdudW1iZXInIHx8IHR5cGVvZiB2Lm1ham9yICE9PSAnbnVtYmVyJykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0luaXRNZXNzYWdlKG1lc3NhZ2U6IEluaXRpYWxpemVNZXNzYWdlIHwgYW55KTogbWVzc2FnZSBpcyBJbml0aWFsaXplTWVzc2FnZSB7XHJcbiAgaWYgKCFpc01lc3NhZ2UobWVzc2FnZSkpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGluaXRNZXNzYWdlID0gbWVzc2FnZSBhcyBJbml0aWFsaXplTWVzc2FnZTtcclxuICBpZiAoaW5pdE1lc3NhZ2UubXNnVHlwZSAhPT0gTWVzc2FnZVR5cGUuSW5pdGlhbGl6ZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFpbml0TWVzc2FnZS5hcGlWZXJzaW9uIHx8ICFpc1ZlcnNpb24oaW5pdE1lc3NhZ2UuYXBpVmVyc2lvbikpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmICghaW5pdE1lc3NhZ2UuY3Jvc3NGcmFtZVZlcnNpb24gfHwgIWlzVmVyc2lvbihpbml0TWVzc2FnZS5jcm9zc0ZyYW1lVmVyc2lvbikpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNDb21tYW5kUmVzcG9uc2VNZXNzYWdlKG1lc3NhZ2U6IENvbW1hbmRSZXNwb25zZU1lc3NhZ2UgfCBhbnkpOiBtZXNzYWdlIGlzIENvbW1hbmRSZXNwb25zZU1lc3NhZ2Uge1xyXG4gIGlmICghaXNNZXNzYWdlKG1lc3NhZ2UpKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjck1lc3NhZ2UgPSBtZXNzYWdlIGFzIENvbW1hbmRSZXNwb25zZU1lc3NhZ2U7XHJcbiAgaWYgKGNyTWVzc2FnZS5tc2dUeXBlICE9PSBNZXNzYWdlVHlwZS5Db21tYW5kUmVzcG9uc2UpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmICghR3VpZC5pc0d1aWQoY3JNZXNzYWdlLmNvbW1hbmRHdWlkKSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFjck1lc3NhZ2UuZGF0YSAmJiAhY3JNZXNzYWdlLmVycm9yKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29tbWFuZE1lc3NhZ2UobWVzc2FnZTogQ29tbWFuZE1lc3NhZ2UgfCBhbnkpOiBtZXNzYWdlIGlzIENvbW1hbmRNZXNzYWdlIHtcclxuICBpZiAoIWlzTWVzc2FnZShtZXNzYWdlKSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29tbWFuZE1lc3NhZ2UgPSBtZXNzYWdlIGFzIENvbW1hbmRNZXNzYWdlO1xyXG4gIGlmIChjb21tYW5kTWVzc2FnZS5tc2dUeXBlICE9PSBNZXNzYWdlVHlwZS5Db21tYW5kKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoIWNvbW1hbmRNZXNzYWdlLnBhcmFtZXRlcnMgfHwgdHlwZW9mIGNvbW1hbmRNZXNzYWdlLnBhcmFtZXRlcnMgIT09ICdvYmplY3QnKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoIWNvbW1hbmRNZXNzYWdlLnZlcmJJZCB8fCB0eXBlb2YgY29tbWFuZE1lc3NhZ2UudmVyYklkICE9PSAnc3RyaW5nJykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc05vdGlmaWNhdGlvbk1lc3NhZ2UobWVzc2FnZTogTm90aWZpY2F0aW9uTWVzc2FnZSB8IGFueSk6IG1lc3NhZ2UgaXMgTm90aWZpY2F0aW9uTWVzc2FnZSB7XHJcbiAgaWYgKCFpc01lc3NhZ2UobWVzc2FnZSkpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG5vdGlmaWNhdGlvbk1lc3NhZ2UgPSBtZXNzYWdlIGFzIE5vdGlmaWNhdGlvbk1lc3NhZ2U7XHJcbiAgaWYgKG5vdGlmaWNhdGlvbk1lc3NhZ2UubXNnVHlwZSAhPT0gTWVzc2FnZVR5cGUuTm90aWZpY2F0aW9uKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoIW5vdGlmaWNhdGlvbk1lc3NhZ2UuZGF0YSB8fCB0eXBlb2Ygbm90aWZpY2F0aW9uTWVzc2FnZS5kYXRhICE9PSAnb2JqZWN0Jykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFub3RpZmljYXRpb25NZXNzYWdlLm5vdGlmaWNhdGlvbklkIHx8IHR5cGVvZiBub3RpZmljYXRpb25NZXNzYWdlLm5vdGlmaWNhdGlvbklkICE9PSAnc3RyaW5nJykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L3R5cGVzY3JpcHQvanMtYXBpL2FwaS1tZXNzYWdpbmcvc3JjL01lc3NhZ2VUeXBlQ2hlY2tzLnRzXG4gKiovIiwiaW1wb3J0IHtcclxuICBFeGVjdXRlUGFyYW1ldGVycyxcclxuICBFeGVjdXRlUmVzcG9uc2UsXHJcbiAgSW50ZXJuYWxBcGlEaXNwYXRjaGVyLFxyXG4gIE1vZGVsLFxyXG4gIE5vdGlmaWNhdGlvbkhhbmRsZXIsXHJcbiAgVmVyYklkLFxyXG4gIFZlcnNpb25OdW1iZXIsXHJcbn0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgQ29tbWFuZFJlc3BvbnNlTWVzc2FnZSwgTWVzc2VuZ2VyLCBOb3RpZmljYXRpb25NZXNzYWdlIH0gZnJvbSAnQHRhYmxlYXUvYXBpLW1lc3NhZ2luZyc7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgSW50ZXJuYWxBcGlEaXNwYXRjaGVyIGludGVyZmFjZSB3aGljaCBmdW5jdGlvbnMgYnkgcGFzc2luZyBtZXNzYWdlc1xyXG4gKiBhY3Jvc3MgYSBmcmFtZSBib3VuZGFyeS4gVGhpcyBpcyB1c3VhbGx5IGJldHdlZW4gdGhlIGNvZGUgd2hlcmUgb3VyIGphdnNjcmlwdCBsaWJyYXJ5IGhhcyBiZWVuIGluY2x1ZGVkXHJcbiAqIGJ5IGEgM3JkIHBhcnR5IGRldiBhbmQgYW5vdGhlciBmcmFtZSB3aGVyZSBUYWJsZWF1IHNlcnZlciBoYXMgY29udGVudC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDcm9zc0ZyYW1lRGlzcGF0Y2hlciBpbXBsZW1lbnRzIEludGVybmFsQXBpRGlzcGF0Y2hlciB7XHJcblxyXG4gIC8vIFRoZSBhcGkgdmVyc2lvbiB3ZSBhcmUgb3BlcmF0aW5nIHRocm91Z2hcclxuICBwcml2YXRlIF92ZXJzaW9uTnVtYmVyOiBWZXJzaW9uTnVtYmVyO1xyXG5cclxuICAvLyBDb2xsZWN0aW9uIG9mIHBlbmRpbmcgcHJvbWlzZXMgd2hpY2ggYXJlIHdhaXRpbmcgdG8gYmUgcmVzb2x2ZWQuIFdoZW4gd2UgcmVjZWl2ZSBhIHJlc3BvbnNlIGJhY2sgZnJvbSB0aGUgb3RoZXIgZnJhbWUsXHJcbiAgLy8gdGhlc2UgcHJvbWlzZXMgY2FuIGJlIGVpdGhlciByZXNvbHZlZCBvciByZWplY3RlZFxyXG4gIHByaXZhdGUgX3BlbmRpbmdQcm9taXNlczogeyBbbWVzc2FnZUd1aWQ6IHN0cmluZ106IHsgcmVzb2x2ZTogKHJlc3BvbnNlOiBFeGVjdXRlUmVzcG9uc2UpID0+IHZvaWQsIHJlamVjdDogKGVycm9yOiBNb2RlbCkgPT4gdm9pZH0gfSA9IHt9O1xyXG5cclxuICAvLyBUaGUgY29sbGVjdGlvbiBvZiBub3RpZmljYXRpb24gaGFuZGxlcnMgd2hpY2ggaGF2ZSBiZWVuIHJlZ2lzdGVyZWQgd2l0aCB0aGlzIGRpc3BhdGNoZXJcclxuICBwcml2YXRlIF9ub3RpZmljYXRpb25IYW5kbGVyczogQXJyYXk8Tm90aWZpY2F0aW9uSGFuZGxlcj4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDcm9zc0ZyYW1lRGlzcGF0Y2hlciB3aGljaCB3aWxsIHVzZSB0aGUgZ2l2ZW4gbWVzc2VuZ2VyIHRvIGNvbW11bmljYXRlXHJcbiAgICogQHBhcmFtIF9tZXNzZW5nZXIgYW4gaW5zdGFudGlhdGVkIGFuZCBsaXN0ZW5pbmcgbWVzc2VuZ2VyIG9iamVjdFxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXNzZW5nZXI6IE1lc3Nlbmdlcikge1xyXG4gICAgaWYgKCF0aGlzLl9tZXNzZW5nZXIpIHtcclxuICAgICAgdGhyb3cgJ01pc3NpbmcgbWVzc2VuZ2VyIG9iamVjdCc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0IHVwIG91ciBtZXNzYWdlIGhhbmRsZXJzLiBXZSBvbmx5IGNhcmUgYWJvdXQgaW5jb21pbmcgbm90aWZpY2F0aW9ucyBhbmQgY29tbWFuZCByZXNwb25zZXNcclxuICAgIHRoaXMuX21lc3Nlbmdlci5zZXRDb21tYW5kUmVzcG9uc2VNZXNzYWdlSGFuZGxlcih0aGlzLm9uQ29tbWFuZFJlc3BvbnNlLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5fbWVzc2VuZ2VyLnNldE5vdGlmaWNhdGlvbk1lc3NhZ2VIYW5kbGVyKHRoaXMub25Ob3RpZmljYXRpb24uYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICAvLy8vLy8gU3RhcnQgSW50ZXJuYWxBcGlEaXNwYXRjaGVyIGltcGxlbWVudGF0aW9uXHJcblxyXG4gIHB1YmxpYyBzZXRWZXJzaW9uTnVtYmVyKHZlcnNpb25OdW1iZXI6IFZlcnNpb25OdW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuX3ZlcnNpb25OdW1iZXIgPSB2ZXJzaW9uTnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGV4ZWN1dGUodmVyYjogVmVyYklkLCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyk6IFByb21pc2U8RXhlY3V0ZVJlc3BvbnNlPiB7XHJcbiAgICAvLyBUbyBleGVjdXRlIGEgdmVyYiwgd2UgZmlyc3QgcHJlcGFyZSBhIGNvbW1hbmQgbWVzc2FnZSBhbmQgdGhlbiBkZWZpbmUgYSBwcm9taXNlLlxyXG4gICAgY29uc3QgcHJlcGFyZWRNZXNzYWdlID0gdGhpcy5fbWVzc2VuZ2VyLnByZXBhcmVDb21tYW5kTWVzc2FnZSh2ZXJiLCBwYXJhbWV0ZXJzKTtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxFeGVjdXRlUmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICAgIC8vIFNhdmUgb2ZmIHRoZSBwZW5kaW5nIHByb21pc2UgYnkgdGhlIG1lc3NhZ2VHdWlkIHdlIGFyZSBhYm91dCB0byBzZW5kLiBXaGVuIGEgcmVzcG9uc2UgaXNcclxuICAgICAgLy8gcmVjZWl2ZWQsIHdlJ2xsIGJlIGFibGUgdG8gcmVzb2x2ZSB0aGlzIHByb21pc2Ugd2l0aCB0aGUgcmVzdWx0XHJcbiAgICAgIHRoaXMuX3BlbmRpbmdQcm9taXNlc1twcmVwYXJlZE1lc3NhZ2UubWVzc2FnZUd1aWRdID0geyByZXNvbHZlOiByZXNvbHZlLCByZWplY3Q6IHJlamVjdCB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWN0dWFsbHkgc2VuZCB0aGUgbWVzc2FnZSBhbmQgcmV0dXJuIHRoZSBwcm9taXNlXHJcbiAgICBwcmVwYXJlZE1lc3NhZ2Uuc2VuZCgpO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJOb3RpZmljYXRpb25IYW5kbGVyKGhhbmRsZXI6IE5vdGlmaWNhdGlvbkhhbmRsZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuX25vdGlmaWNhdGlvbkhhbmRsZXJzLnB1c2goaGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdW5yZWdpc3Rlck5vdGlmaWNhdGlvbkhhbmRsZXIoaGFuZGxlcjogTm90aWZpY2F0aW9uSGFuZGxlcik6IHZvaWQge1xyXG4gICAgdGhpcy5fbm90aWZpY2F0aW9uSGFuZGxlcnMgPSB0aGlzLl9ub3RpZmljYXRpb25IYW5kbGVycy5maWx0ZXIoaCA9PiBoICE9PSBoYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIC8vLy8vLyBFbmQgSW50ZXJuYWxBcGlEaXNwYXRjaGVyIGltcGxlbWVudGF0aW9uXHJcblxyXG4gIHByaXZhdGUgb25Db21tYW5kUmVzcG9uc2UocmVzcG9uc2U6IENvbW1hbmRSZXNwb25zZU1lc3NhZ2UpOiB2b2lkIHtcclxuICAgIC8vIFdlIGdvdCBhIGNvbW1hbmQgcmVzcG9uc2UsIGxvb2sgdGhyb3VnaCB0aGUgcGVuZGluZyBwcm9taXNlcyBhbmQgcmVzb2x2ZVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuX3BlbmRpbmdQcm9taXNlcykuaW5kZXhPZihyZXNwb25zZS5jb21tYW5kR3VpZCkgPCAwKSB7XHJcbiAgICAgIHJldHVybjsgLy8gV2UgZG9uJ3QgaGF2ZSBhbnkgcmVmZXJlbmNlIHRvIHRoaXMgY29tbWFuZCwganVzdCByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwZW5kaW5nUHJvbWlzZSA9IHRoaXMuX3BlbmRpbmdQcm9taXNlc1tyZXNwb25zZS5jb21tYW5kR3VpZF07XHJcblxyXG4gICAgLy8gSWYgd2UgaGF2ZSBhbiBlcnJvciBkZWZpbmVkLCByZWplY3QgdGhlIHByb21pc2VcclxuICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xyXG4gICAgICBwZW5kaW5nUHJvbWlzZS5yZWplY3QocmVzcG9uc2UuZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHdlIGhhdmUgZGF0YSBkZWZpbmVkLCByZXNvbHZlIHRoZSBwcm9taXNlXHJcbiAgICBpZiAocmVzcG9uc2UuZGF0YSkge1xyXG4gICAgICBwZW5kaW5nUHJvbWlzZS5yZXNvbHZlKHtyZXN1bHQ6IHJlc3BvbnNlLmRhdGF9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbGVhbiB1cCBvdXIgcGVuZGluZyBwcm9taXNlcyBvYmplY3RcclxuICAgIGRlbGV0ZSB0aGlzLl9wZW5kaW5nUHJvbWlzZXNbcmVzcG9uc2UuY29tbWFuZEd1aWRdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbk5vdGlmaWNhdGlvbihub3RpZmljYXRpb25NZXNzYWdlOiBOb3RpZmljYXRpb25NZXNzYWdlKTogdm9pZCB7XHJcbiAgICAvLyBHbyB0aHJvdWdoIGVhY2ggbm90aWZpY2F0aW9uIGhhbmRsZXIgd2UgaGF2ZSByZWdpc3RlcmVkIGFuZCBsZXQgdGhlbSBrbm93IGEgbm90aWZpY2F0aW9uIGNhbWUgaW5cclxuICAgIGZvciAoY29uc3QgaGFuZGxlciBvZiB0aGlzLl9ub3RpZmljYXRpb25IYW5kbGVycykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGhhbmRsZXIoe25vdGlmaWNhdGlvbklkOiBub3RpZmljYXRpb25NZXNzYWdlLm5vdGlmaWNhdGlvbklkLCBkYXRhOiBub3RpZmljYXRpb25NZXNzYWdlLmRhdGF9KTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIC8vIElnbm9yZSB0aGlzLiBXcmFwIGluIHRyeS9jYXRjaCBzbyBpZiBvbmUgaGFuZGxlciBlcnJvcnMsIHRoZSBvdGhlciBzdGlsbCBnZXQgdGhlIG1lc3NhZ2VcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvQ3Jvc3NGcmFtZS9Dcm9zc0ZyYW1lRGlzcGF0Y2hlci50c1xuICoqLyIsImltcG9ydCB7IFZlcnNpb25OdW1iZXIgYXMgVmVyc2lvbk51bWJlckNvbnRyYWN0IH0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgVGFibGVhdUV4Y2VwdGlvbiB9IGZyb20gJ0B0YWJsZWF1L2FwaS11dGlscyc7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgY3VycmVudCB2ZXJzaW9uIG9mIHRoZSBleHRlbnNpb25zIGxpYnJhcnlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWZXJzaW9uTnVtYmVyIGltcGxlbWVudHMgVmVyc2lvbk51bWJlckNvbnRyYWN0IHtcclxuXHJcbiAgLy8gVXNpbmcgc29tZSB3ZWJwYWNrIHRyaWNrcywgd2UgY2FuIGluamVjdCB0aGlzIHZlcnNpb24gaW50byBvdXIgY29kZSAoa2luZGEgbGlrZSBjKysgcHJlcHJvY2Vzc29yIHN0dWZmKVxyXG4gIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogVmVyc2lvbk51bWJlcjtcclxuICBwcml2YXRlIHN0YXRpYyBJTlZBTElEX1ZFUlNJT05fTlVNQkVSOiBzdHJpbmcgPSAnSW52YWxpZCB2ZXJzaW9uIG51bWJlcjogJztcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIGluc3RhbmNlIG9mIHRoZSB2ZXJzaW9uIG51bWJlci5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBWZXJzaW9uTnVtYmVyIHtcclxuICAgIHJldHVybiBWZXJzaW9uTnVtYmVyLl9pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgU2V0VmVyc2lvbk51bWJlcihudW1TdHJpbmc6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgVmVyc2lvbk51bWJlci5faW5zdGFuY2UgPSBuZXcgVmVyc2lvbk51bWJlcihudW1TdHJpbmcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IG1ham9yOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IG1pbm9yOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGZpeDogbnVtYmVyO1xyXG5cclxuICAvLyBwcml2YXRlIGNvbnN0cnVjdG9yIHNvIGV2ZXJ5b25lIHVzZXMgdGhlIHNpbmdsZXRvbiBpbnN0YW5jZVxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IodmVyc2lvblN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IHZlcnNpb25TdHJpbmcuc3BsaXQoJy4nKS5tYXAocCA9PiBwYXJzZUludChwLCAxMCkpO1xyXG4gICAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMykge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmVycm9yKFZlcnNpb25OdW1iZXIuSU5WQUxJRF9WRVJTSU9OX05VTUJFUiwgW3ZlcnNpb25TdHJpbmddKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1ham9yID0gcGFydHNbMF07XHJcbiAgICB0aGlzLm1pbm9yID0gcGFydHNbMV07XHJcbiAgICB0aGlzLmZpeCA9IHBhcnRzWzJdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBmb3JtYXR0ZWRWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGAke3RoaXMubWFqb3J9LiR7dGhpcy5taW5vcn0uJHt0aGlzLmZpeH1gO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvdHlwZXNjcmlwdC9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvVmVyc2lvbk51bWJlci50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5pbXBvcnQgeyBEYXNoYm9hcmRJbXBsIH0gZnJvbSAnLi9JbnRlcm5hbC9EYXNoYm9hcmRJbXBsJztcclxuaW1wb3J0IHsgU2hlZXQgfSBmcm9tICcuL1NoZWV0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBTaGVldCBpbXBsZW1lbnRzIENvbnRyYWN0LkRhc2hib2FyZCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Rhc2hib2FyZEltcGw6IERhc2hib2FyZEltcGwpIHtcclxuICAgIHN1cGVyKF9kYXNoYm9hcmRJbXBsKTtcclxuICAgIF9kYXNoYm9hcmRJbXBsLmluaXRpYWxpemVXaXRoUHVibGljSW50ZXJmYWNlcyh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgd29ya3NoZWV0cygpOiBBcnJheTxDb250cmFjdC5Xb3Jrc2hlZXQ+IHtcclxuICAgIHJldHVybiB0aGlzLl9kYXNoYm9hcmRJbXBsLndvcmtzaGVldHM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG9iamVjdHMoKTogQXJyYXk8Q29udHJhY3QuRGFzaGJvYXJkT2JqZWN0PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGFzaGJvYXJkSW1wbC5vYmplY3RzO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvRGFzaGJvYXJkLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IEV2ZW50TGlzdGVuZXJNYW5hZ2VyIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXNoYXJlZCc7XHJcblxyXG5pbXBvcnQgeyBTaGVldEltcGwgfSBmcm9tICcuL0ludGVybmFsL1NoZWV0SW1wbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2hlZXQgZXh0ZW5kcyBFdmVudExpc3RlbmVyTWFuYWdlciBpbXBsZW1lbnRzIENvbnRyYWN0LlNoZWV0IHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfc2hlZXRJbXBsOiBTaGVldEltcGwpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldEltcGwubmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2hlZXRUeXBlKCk6IENvbnRyYWN0LlNoZWV0VHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hlZXRJbXBsLnNoZWV0VHlwZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2l6ZSgpOiBDb250cmFjdC5TaXplIHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldEltcGwuc2l6ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaW5kUGFyYW1ldGVyQXN5bmMocGFyYW1ldGVyTmFtZTogc3RyaW5nKTogUHJvbWlzZTxDb250cmFjdC5QYXJhbWV0ZXIgfCB1bmRlZmluZWQ+IHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldEltcGwuZmluZFBhcmFtZXRlckFzeW5jKHBhcmFtZXRlck5hbWUsIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBhcmFtZXRlcnNBc3luYygpOiBQcm9taXNlPEFycmF5PENvbnRyYWN0LlBhcmFtZXRlcj4+IHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldEltcGwuZ2V0UGFyYW1ldGVyc0FzeW5jKHRoaXMpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvU2hlZXQudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBleHRlcm5hbCBEYXNoYm9hcmRDb250ZW50IG5hbWVzcGFjZS5cclxuICogVGhpcyBkb2VzIG5vdCBmb2xsb3cgdGhlIEltcGwgcGF0dGVybiBhcyBEYXNoYm9hcmRDb250ZW50IGlzXHJcbiAqIGN1cnJlbnRseSBqdXN0IGEgKHNpbmdsZSkgcHJvcGVydHkgYmFnLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhc2hib2FyZENvbnRlbnQgaW1wbGVtZW50cyBDb250cmFjdC5EYXNoYm9hcmRDb250ZW50IHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfZGFzaGJvYXJkOiBDb250cmFjdC5EYXNoYm9hcmQpIHsgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGRhc2hib2FyZCgpOiBDb250cmFjdC5EYXNoYm9hcmQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rhc2hib2FyZDtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL05hbWVzcGFjZXMvRGFzaGJvYXJkQ29udGVudC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5pbXBvcnQgeyBFeHRlbnNpb25FbnZpcm9ubWVudCB9IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IEludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncyBhcyBFbnVtTWFwcGluZ3MgfSBmcm9tICdAdGFibGVhdS9hcGktc2hhcmVkJztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgZXh0ZXJuYWwgZW52aXJvbm1lbnQgbmFtZXNwYWNlLlxyXG4gKiBFbnZpcm9ubWVudCBkb2VzIG5vdCBmb2xsb3cgdGhlIEltcGwgcGF0dGVybiBhcyBpdCBpc1xyXG4gKiBqdXN0IGEgcHJvcGVydHkgYmFnLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50IGltcGxlbWVudHMgQ29udHJhY3QuRW52aXJvbm1lbnQge1xyXG4gIHByaXZhdGUgX2FwaVZlcnNpb246IHN0cmluZztcclxuICBwcml2YXRlIF9jb250ZXh0OiBDb250cmFjdC5FeHRlbnNpb25Db250ZXh0O1xyXG4gIHByaXZhdGUgX2xhbmd1YWdlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfbW9kZTogQ29udHJhY3QuRXh0ZW5zaW9uTW9kZTtcclxuICBwcml2YXRlIF9vcGVyYXRpbmdTeXN0ZW06IHN0cmluZztcclxuICBwcml2YXRlIF90YWJsZWF1VmVyc2lvbjogc3RyaW5nO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoZXh0ZW5zaW9uRW52aXJvbm1lbnQ6IEV4dGVuc2lvbkVudmlyb25tZW50KSB7XHJcbiAgICB0aGlzLl9hcGlWZXJzaW9uID0gZXh0ZW5zaW9uRW52aXJvbm1lbnQuYXBpVmVyc2lvbjtcclxuICAgIHRoaXMuX2NvbnRleHQgPSBFbnVtTWFwcGluZ3MuZXh0ZW5zaW9uQ29udGV4dC5jb252ZXJ0KGV4dGVuc2lvbkVudmlyb25tZW50LmV4dGVuc2lvbkNvbnRleHQpO1xyXG4gICAgdGhpcy5fbGFuZ3VhZ2UgPSBleHRlbnNpb25FbnZpcm9ubWVudC5leHRlbnNpb25MYW5ndWFnZTtcclxuICAgIHRoaXMuX2xvY2FsZSA9IGV4dGVuc2lvbkVudmlyb25tZW50LmV4dGVuc2lvbkxvY2FsZTtcclxuICAgIHRoaXMuX21vZGUgPSBFbnVtTWFwcGluZ3MuZXh0ZW5zaW9uTW9kZS5jb252ZXJ0KGV4dGVuc2lvbkVudmlyb25tZW50LmV4dGVuc2lvbk1vZGUpO1xyXG4gICAgdGhpcy5fb3BlcmF0aW5nU3lzdGVtID0gZXh0ZW5zaW9uRW52aXJvbm1lbnQub3BlcmF0aW5nU3lzdGVtO1xyXG4gICAgdGhpcy5fdGFibGVhdVZlcnNpb24gPSBleHRlbnNpb25FbnZpcm9ubWVudC50YWJsZWF1VmVyc2lvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgYXBpVmVyc2lvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FwaVZlcnNpb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGNvbnRleHQoKTogQ29udHJhY3QuRXh0ZW5zaW9uQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbGFuZ3VhZ2UoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9sYW5ndWFnZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbG9jYWxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBtb2RlKCk6IENvbnRyYWN0LkV4dGVuc2lvbk1vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX21vZGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG9wZXJhdGluZ1N5c3RlbSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX29wZXJhdGluZ1N5c3RlbTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgdGFibGVhdVZlcnNpb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl90YWJsZWF1VmVyc2lvbjtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL05hbWVzcGFjZXMvRW52aXJvbm1lbnQudHNcbiAqKi8iLCJpbXBvcnQgeyBTZXR0aW5ncyBhcyBTZXR0aW5nc0NvbnRyYWN0IH0gZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IFNldHRpbmdzSW1wbCB9IGZyb20gJy4uL0ludGVybmFsL1NldHRpbmdzSW1wbCc7XHJcbmltcG9ydCB7IFNldHRpbmdzQ29sbGVjdGlvbiB9IGZyb20gJy4uL1NlcnZpY2VzL1NldHRpbmdzU2VydmljZSc7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIGV4dGVybmFsIHNldHRpbmdzIG5hbWVzcGFjZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyBpbXBsZW1lbnRzIFNldHRpbmdzQ29udHJhY3Qge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHNldHRpbmdzSW1wbDogU2V0dGluZ3NJbXBsKSB7IH1cclxuXHJcbiAgcHVibGljIGVyYXNlKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnNldHRpbmdzSW1wbC5lcmFzZShrZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldChrZXk6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nc0ltcGwuZ2V0KGtleSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0QWxsKCk6IFNldHRpbmdzQ29sbGVjdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nc0ltcGwuZ2V0QWxsKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGlzTW9kaWZpZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nc0ltcGwuaXNNb2RpZmllZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzYXZlQXN5bmMoKTogUHJvbWlzZTxTZXR0aW5nc0NvbGxlY3Rpb24+IHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzSW1wbC5zYXZlQXN5bmMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0dGluZ3NJbXBsLnNldChrZXksIHZhbHVlKTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL05hbWVzcGFjZXMvU2V0dGluZ3MudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHsgRXh0ZW5zaW9uRGlhbG9nSW1wbCB9IGZyb20gJy4uL0ludGVybmFsL0V4dGVuc2lvbkRpYWxvZ0ltcGwnO1xyXG5pbXBvcnQgeyBVSUltcGwgfSBmcm9tICcuLi9JbnRlcm5hbC9VSUltcGwnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBleHRlcm5hbCBVSSBuYW1lc3BhY2UuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVUkgaW1wbGVtZW50cyBDb250cmFjdC5VSSB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ltcGw6IFVJSW1wbCkgeyB9XHJcblxyXG4gIHB1YmxpYyBkaXNwbGF5RGlhbG9nQXN5bmModXJsOiBzdHJpbmcsIGhlaWdodD86IG51bWJlciwgd2lkdGg/OiBudW1iZXIpOiBQcm9taXNlPENvbnRyYWN0LkV4dGVuc2lvbkRpYWxvZz4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ltcGwuZGlzcGxheURpYWxvZ0FzeW5jKHVybCwgaGVpZ2h0LCB3aWR0aCk7XHJcbiAgfVxyXG5cclxuICAvL0hBQ0s6IHRoaXMgc2hvdWxkIHByb2JhYmx5IGJlIGFzeW5jXHJcbiAgcHVibGljIG1lc3NhZ2VQYXJlbnRFeHRlbnNpb24obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLl9pbXBsLm1lc3NhZ2VQYXJlbnRFeHRlbnNpb24obWVzc2FnZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXh0ZW5zaW9uRGlhbG9nIGltcGxlbWVudHMgQ29udHJhY3QuRXh0ZW5zaW9uRGlhbG9nIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfaW1wbDogRXh0ZW5zaW9uRGlhbG9nSW1wbCkgeyB9XHJcblxyXG4gIC8vIEhBQ0s6IFRoaXMgc2hvdWxkIHByb2JhYmx5IGJlIGFzeW5jXHJcbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgLy90aGlzLl9pbXBsXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGU6IENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGUsIGhhbmRsZXI6IENvbnRyYWN0LlRhYmxlYXVFdmVudEhhbmRsZXJGbik6IHZvaWQge1xyXG4gICAgdGhpcy5faW1wbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XHJcbiAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL05hbWVzcGFjZXMvVUkudHNcbiAqKi8iLCJpbXBvcnQgeyBJbnRlcm5hbEFwaURpc3BhdGNoZXIgfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVnaXN0cnkgfSBmcm9tICdAdGFibGVhdS9hcGktc2hhcmVkJztcclxuXHJcbmltcG9ydCB7IEluaXRpYWxpemF0aW9uU2VydmljZUltcGwgfSBmcm9tICcuL0ltcGwvSW5pdGlhbGl6YXRpb25TZXJ2aWNlSW1wbCc7XHJcbmltcG9ydCB7IFNldHRpbmdzU2VydmljZUltcGwgfSBmcm9tICAnLi9JbXBsL1NldHRpbmdzU2VydmljZUltcGwnO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2VJbXBsIH0gZnJvbSAnLi9JbXBsL1VJU2VydmljZUltcGwnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQWxsRXh0ZW5zaW9uc1NlcnZpY2VzKGRpc3BhdGNoZXI6IEludGVybmFsQXBpRGlzcGF0Y2hlcik6IHZvaWQge1xyXG4gIEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5yZWdpc3RlclNlcnZpY2UobmV3IEluaXRpYWxpemF0aW9uU2VydmljZUltcGwoZGlzcGF0Y2hlcikpO1xyXG4gIEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5yZWdpc3RlclNlcnZpY2UobmV3IFNldHRpbmdzU2VydmljZUltcGwoZGlzcGF0Y2hlcikpO1xyXG4gIEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5yZWdpc3RlclNlcnZpY2UobmV3IFVJU2VydmljZUltcGwoZGlzcGF0Y2hlcikpO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9TZXJ2aWNlcy9SZWdpc3RlckFsbEV4dGVuc2lvbnNTZXJ2aWNlcy50c1xuICoqLyIsImltcG9ydCB7IEV4dGVuc2lvbkJvb3RzdHJhcEluZm8sIEludGVybmFsQXBpRGlzcGF0Y2hlciwgVmVyYklkIH0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IEV4dGVuc2lvbnNTZXJ2aWNlTmFtZXMgfSBmcm9tICcuLi9FeHRlbnNpb25zU2VydmljZU5hbWVzJztcclxuaW1wb3J0IHsgSW5pdGlhbGl6YXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vSW5pdGlhbGl6YXRpb25TZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbml0aWFsaXphdGlvblNlcnZpY2VJbXBsIGltcGxlbWVudHMgSW5pdGlhbGl6YXRpb25TZXJ2aWNlIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBkaXNwYXRjaGVyOiBJbnRlcm5hbEFwaURpc3BhdGNoZXIpIHsgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNlcnZpY2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gRXh0ZW5zaW9uc1NlcnZpY2VOYW1lcy5Jbml0aWFsaXphdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdGlhbGl6ZURhc2hib2FyZEV4dGVuc2lvbnNBc3luYygpOiBQcm9taXNlPEV4dGVuc2lvbkJvb3RzdHJhcEluZm8+IHtcclxuICAgIC8vIFdlIGRvbid0IG5lZWQgYW55IHBhcmFtZXRlcnMgZm9yIHRoaXMgY2FsbCBiZWNhdXNlIHRoZXkgYXJlIGFkZGVkIGluIGZvciB1cyBieSB0aGUgZGlzcGF0Y2hlclxyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5Jbml0aWFsaXplRXh0ZW5zaW9uLCB7fSkudGhlbjxFeHRlbnNpb25Cb290c3RyYXBJbmZvPihyZXNwb25zZSA9PiB7XHJcbiAgICAgIC8vIFRPRE8gLSBWYWxpZGF0ZSByZXR1cm4gdmFsdWVcclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLnJlc3VsdCBhcyBFeHRlbnNpb25Cb290c3RyYXBJbmZvO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9TZXJ2aWNlcy9JbXBsL0luaXRpYWxpemF0aW9uU2VydmljZUltcGwudHNcbiAqKi8iLCJpbXBvcnQge1xyXG4gIEV4ZWN1dGVQYXJhbWV0ZXJzLFxyXG4gIEV4dGVuc2lvblNldHRpbmdzSW5mbyxcclxuICBJbnRlcm5hbEFwaURpc3BhdGNoZXIsXHJcbiAgUGFyYW1ldGVySWQsXHJcbiAgVmVyYklkXHJcbn0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgVGFibGVhdUV4Y2VwdGlvbiB9IGZyb20gJ0B0YWJsZWF1L2FwaS11dGlscyc7XHJcblxyXG5pbXBvcnQgeyBFeHRlbnNpb25zU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vRXh0ZW5zaW9uc1NlcnZpY2VOYW1lcyc7XHJcbmltcG9ydCB7IFNldHRpbmdzQ29sbGVjdGlvbiwgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vU2V0dGluZ3NTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1NlcnZpY2VJbXBsIGltcGxlbWVudHMgU2V0dGluZ3NTZXJ2aWNlIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBkaXNwYXRjaGVyOiBJbnRlcm5hbEFwaURpc3BhdGNoZXIpIHsgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNlcnZpY2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gRXh0ZW5zaW9uc1NlcnZpY2VOYW1lcy5TZXR0aW5nc1NlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2F2ZVNldHRpbmdzQXN5bmMoc2V0dGluZ3M6IFNldHRpbmdzQ29sbGVjdGlvbik6IFByb21pc2U8U2V0dGluZ3NDb2xsZWN0aW9uPiB7XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHtbUGFyYW1ldGVySWQuU2V0dGluZ3NWYWx1ZXNdOiBzZXR0aW5nc307XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5TYXZlRXh0ZW5zaW9uU2V0dGluZ3MsIHBhcmFtZXRlcnMpLnRoZW48U2V0dGluZ3NDb2xsZWN0aW9uPih2YWx1ZSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlLnJlc3VsdCBhcyBFeHRlbnNpb25TZXR0aW5nc0luZm87XHJcblxyXG4gICAgICBpZiAoIXJlc3VsdCB8fCAhcmVzdWx0LnNldHRpbmdzVmFsdWVzKSB7XHJcbiAgICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5pbnRlcm5hbEVycm9yKFsnc2F2aW5nIHNldHRpbmdzLiddKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuKHJlc3VsdC5zZXR0aW5nc1ZhbHVlcyk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL1NlcnZpY2VzL0ltcGwvU2V0dGluZ3NTZXJ2aWNlSW1wbC50c1xuICoqLyIsImltcG9ydCB7XHJcbiAgRXhlY3V0ZVBhcmFtZXRlcnMsXHJcbiAgSW50ZXJuYWxBcGlEaXNwYXRjaGVyLFxyXG4gIFBhcmFtZXRlcklkLFxyXG4gIFZlcmJJZFxyXG59IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5pbXBvcnQgeyBFeHRlbnNpb25zU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vRXh0ZW5zaW9uc1NlcnZpY2VOYW1lcyc7XHJcbmltcG9ydCB7IFVJU2VydmljZSB9IGZyb20gJy4uL1VJU2VydmljZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVUlTZXJ2aWNlSW1wbCBpbXBsZW1lbnRzIFVJU2VydmljZSB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlzcGF0Y2hlcjogSW50ZXJuYWxBcGlEaXNwYXRjaGVyKSB7IH1cclxuXHJcbiAgcHVibGljIGdldCBzZXJ2aWNlTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIEV4dGVuc2lvbnNTZXJ2aWNlTmFtZXMuVUlTZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc3BsYXlEaWFsb2dBc3luYyh1cmw6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3QgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMgPSB7W1BhcmFtZXRlcklkLkRpYWxvZ1VybF06IHVybH07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5EaXNwbGF5RGlhbG9nLCBwYXJhbWV0ZXJzKS50aGVuKHZhbHVlID0+IHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xvc2VEaWFsb2coKTogdm9pZCB7XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgdGhpcy5kaXNwYXRjaGVyLmV4ZWN1dGUoVmVyYklkLkNsb3NlRGlhbG9nLCBwYXJhbWV0ZXJzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZW5kTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IHBhcmFtZXRlcnM6IEV4ZWN1dGVQYXJhbWV0ZXJzID0geyBbUGFyYW1ldGVySWQuRGlhbG9nTWVzc2FnZV06IG1lc3NhZ2UgfTtcclxuICAgIHRoaXMuZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5DbG9zZURpYWxvZywgcGFyYW1ldGVycyk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9TZXJ2aWNlcy9JbXBsL1VJU2VydmljZUltcGwudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBEYXNoYm9hcmRPYmplY3RUeXBlLCBFeHRlbnNpb25EYXNoYm9hcmRJbmZvLCBTaGVldFBhdGgsIFZpc3VhbElkIH0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzLCBQb2ludCwgU2l6ZSB9IGZyb20gJ0B0YWJsZWF1L2FwaS1zaGFyZWQnO1xyXG5cclxuaW1wb3J0IHsgRGFzaGJvYXJkT2JqZWN0IH0gZnJvbSAnLi4vRGFzaGJvYXJkT2JqZWN0JztcclxuaW1wb3J0IHsgV29ya3NoZWV0IH0gZnJvbSAnLi4vV29ya3NoZWV0JztcclxuaW1wb3J0IHsgU2hlZXRJbXBsIH0gZnJvbSAnLi9TaGVldEltcGwnO1xyXG5pbXBvcnQgeyBTaGVldEluZm9JbXBsIH0gZnJvbSAnLi9TaGVldEluZm9JbXBsJztcclxuaW1wb3J0IHsgV29ya3NoZWV0SW1wbCB9IGZyb20gJy4vV29ya3NoZWV0SW1wbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkSW1wbCBleHRlbmRzIFNoZWV0SW1wbCB7XHJcbiAgcHJpdmF0ZSBfd29ya3NoZWV0czogQXJyYXk8Q29udHJhY3QuV29ya3NoZWV0PjtcclxuICBwcml2YXRlIF9vYmplY3RzOiBBcnJheTxDb250cmFjdC5EYXNoYm9hcmRPYmplY3Q+O1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfaW5mbzogRXh0ZW5zaW9uRGFzaGJvYXJkSW5mbywgcHJpdmF0ZSBfc2hlZXRQYXRoOiBTaGVldFBhdGgpIHtcclxuICAgIHN1cGVyKG5ldyBTaGVldEluZm9JbXBsKF9pbmZvLm5hbWUsIENvbnRyYWN0LlNoZWV0VHlwZS5EYXNoYm9hcmQsIG5ldyBTaXplKF9pbmZvLnNpemUuaCwgX2luZm8uc2l6ZS53KSkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB3b3Jrc2hlZXRzKCk6IEFycmF5PENvbnRyYWN0LldvcmtzaGVldD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dvcmtzaGVldHM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG9iamVjdHMoKTogQXJyYXk8Q29udHJhY3QuRGFzaGJvYXJkT2JqZWN0PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fb2JqZWN0cztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0aWFsaXplV2l0aFB1YmxpY0ludGVyZmFjZXMoZGFzaGJvYXJkOiBDb250cmFjdC5EYXNoYm9hcmQpOiB2b2lkIHtcclxuICAgIHRoaXMuX3dvcmtzaGVldHMgPSBuZXcgQXJyYXk8V29ya3NoZWV0PigpO1xyXG4gICAgdGhpcy5fb2JqZWN0cyA9IG5ldyBBcnJheTxDb250cmFjdC5EYXNoYm9hcmRPYmplY3Q+KCk7XHJcblxyXG4gICAgLy8gUHJvY2VzcyBhbGwgdGhlIHpvbmVzIHdoaWNoIGFyZSBjb250YWluZWQgaW4gdGhpcyBkYXNoYm9hcmRcclxuICAgIGZvciAoY29uc3Qgem9uZSBvZiB0aGlzLl9pbmZvLnpvbmVzKSB7XHJcbiAgICAgIGxldCB3b3Jrc2hlZXQ6IFdvcmtzaGVldCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgIGNvbnN0IHpvbmVTaXplID0gbmV3IFNpemUoem9uZS5oZWlnaHQsIHpvbmUud2lkdGgpO1xyXG5cclxuICAgICAgaWYgKHpvbmUuem9uZVR5cGUgPT09IERhc2hib2FyZE9iamVjdFR5cGUuV29ya3NoZWV0KSB7XHJcbiAgICAgICAgY29uc3Qgc2hlZXRJbmZvID0gbmV3IFNoZWV0SW5mb0ltcGwoem9uZS5uYW1lLCBDb250cmFjdC5TaGVldFR5cGUuV29ya3NoZWV0LCB6b25lU2l6ZSk7XHJcbiAgICAgICAgY29uc3Qgdml6SWQ6IFZpc3VhbElkID0ge1xyXG4gICAgICAgICAgd29ya3NoZWV0OiB6b25lLm5hbWUsXHJcbiAgICAgICAgICBkYXNoYm9hcmQ6IHRoaXMuX2luZm8ubmFtZSxcclxuICAgICAgICAgIHN0b3J5Ym9hcmQ6IHRoaXMuX3NoZWV0UGF0aC5zdG9yeWJvYXJkLFxyXG4gICAgICAgICAgZmxpcGJvYXJkWm9uZUlEOiB0aGlzLl9zaGVldFBhdGguZmxpcGJvYXJkWm9uZUlELFxyXG4gICAgICAgICAgc3RvcnlQb2ludElEOiB0aGlzLl9zaGVldFBhdGguc3RvcnlQb2ludElEXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgd29ya3NoZWV0SW1wbCA9IG5ldyBXb3Jrc2hlZXRJbXBsKHNoZWV0SW5mbywgdml6SWQsIGRhc2hib2FyZCk7XHJcbiAgICAgICAgd29ya3NoZWV0ID0gbmV3IFdvcmtzaGVldCh3b3Jrc2hlZXRJbXBsKTtcclxuICAgICAgICB0aGlzLl93b3Jrc2hlZXRzLnB1c2god29ya3NoZWV0KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgem9uZVBvaW50ID0gbmV3IFBvaW50KHpvbmUueCwgem9uZS55KTtcclxuXHJcbiAgICAgIGNvbnN0IGRhc2hib2FyZE9iamVjdCA9IG5ldyBEYXNoYm9hcmRPYmplY3QoXHJcbiAgICAgICAgZGFzaGJvYXJkLFxyXG4gICAgICAgIEludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncy5kYXNoYm9hcmRPYmplY3RUeXBlLmNvbnZlcnQoem9uZS56b25lVHlwZSksXHJcbiAgICAgICAgem9uZVBvaW50LFxyXG4gICAgICAgIHpvbmVTaXplLFxyXG4gICAgICAgIHdvcmtzaGVldFxyXG4gICAgICApO1xyXG5cclxuICAgICAgdGhpcy5fb2JqZWN0cy5wdXNoKGRhc2hib2FyZE9iamVjdCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9JbnRlcm5hbC9EYXNoYm9hcmRJbXBsLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgZGFzaGJvYXJkIG9iamVjdHMgLSB0aGUgem9uZXMgaW4gYSBkYXNoYm9hcmQuXHJcbiAqIFRoaXMgZG9lcyBub3QgZm9sbG93IHRoZSBJbXBsIHBhdHRlcm4gYXMgaXQgaXMganVzdCBhIHByb3BlcnR5IGJhZy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRPYmplY3QgaW1wbGVtZW50cyBDb250cmFjdC5EYXNoYm9hcmRPYmplY3Qge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2Rhc2hib2FyZDogQ29udHJhY3QuRGFzaGJvYXJkLFxyXG4gICAgcHJpdmF0ZSBfdHlwZTogQ29udHJhY3QuRGFzaGJvYXJkT2JqZWN0VHlwZSxcclxuICAgIHByaXZhdGUgX3Bvc2l0aW9uOiBDb250cmFjdC5Qb2ludCxcclxuICAgIHByaXZhdGUgX3NpemU6IENvbnRyYWN0LlNpemUsXHJcbiAgICBwcml2YXRlIF93b3Jrc2hlZXQ6IENvbnRyYWN0LldvcmtzaGVldCB8IHVuZGVmaW5lZFxyXG4gICkgeyB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZGFzaGJvYXJkKCk6IENvbnRyYWN0LkRhc2hib2FyZCB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGFzaGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0eXBlKCk6IENvbnRyYWN0LkRhc2hib2FyZE9iamVjdFR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHBvc2l0aW9uKCk6IENvbnRyYWN0LlBvaW50IHtcclxuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2l6ZSgpOiBDb250cmFjdC5TaXplIHtcclxuICAgIHJldHVybiB0aGlzLl9zaXplO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB3b3Jrc2hlZXQoKTogQ29udHJhY3QuV29ya3NoZWV0IHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl93b3Jrc2hlZXQ7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9EYXNoYm9hcmRPYmplY3QudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBUYWJsZWF1RXhjZXB0aW9uIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXV0aWxzJztcclxuXHJcbmltcG9ydCB7IFNoZWV0IH0gZnJvbSAnLi9TaGVldCc7XHJcblxyXG5pbXBvcnQgeyBXb3Jrc2hlZXRJbXBsIH0gZnJvbSAnLi9JbnRlcm5hbC9Xb3Jrc2hlZXRJbXBsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXb3Jrc2hlZXQgZXh0ZW5kcyBTaGVldCBpbXBsZW1lbnRzIENvbnRyYWN0LldvcmtzaGVldCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX3dvcmtzaGVldEltcGw6IFdvcmtzaGVldEltcGwpIHtcclxuICAgIHN1cGVyKF93b3Jrc2hlZXRJbXBsKTtcclxuXHJcbiAgICAvLyBDYWxsIHRvIGluaXRpYWxpemUgZXZlbnRzIGFuZCB0aGVuIGNhbGwgZG93biB0byB0aGUgZXZlbnQgbGlzdGVuZXIgbWFuYWdlciB0byBoYW5kbGUgdGhpbmdzXHJcbiAgICB0aGlzLl93b3Jrc2hlZXRJbXBsLmluaXRpYWxpemVFdmVudHModGhpcykuZm9yRWFjaChlID0+IHRoaXMuYWRkTmV3RXZlbnRUeXBlKGUpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgcGFyZW50RGFzaGJvYXJkKCk6IENvbnRyYWN0LkRhc2hib2FyZCB7XHJcbiAgICByZXR1cm4gdGhpcy5fd29ya3NoZWV0SW1wbC5wYXJlbnREYXNoYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXBwbHlGaWx0ZXJBc3luYyhcclxuICAgIGZpZWxkTmFtZTogc3RyaW5nLCB2YWx1ZXM6IEFycmF5PHN0cmluZz4sIHVwZGF0ZVR5cGU6IENvbnRyYWN0LkZpbHRlclVwZGF0ZVR5cGUsIG9wdGlvbnM6IENvbnRyYWN0LkZpbHRlck9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5fd29ya3NoZWV0SW1wbC5hcHBseUZpbHRlckFzeW5jKGZpZWxkTmFtZSwgdmFsdWVzLCB1cGRhdGVUeXBlLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhcHBseVJhbmdlRmlsdGVyQXN5bmMoZmllbGROYW1lOiBzdHJpbmcsIGZpbHRlck9wdGlvbnM6IENvbnRyYWN0LlJhbmdlRmlsdGVyT3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fd29ya3NoZWV0SW1wbC5hcHBseVJhbmdlRmlsdGVyQXN5bmMoZmllbGROYW1lLCBmaWx0ZXJPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhckZpbHRlckFzeW5jKGZpZWxkTmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiB0aGlzLl93b3Jrc2hlZXRJbXBsLmNsZWFyRmlsdGVyQXN5bmMoZmllbGROYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRBbmFseXRpY09iamVjdHNBc3luYygpOiBQcm9taXNlPEFycmF5PENvbnRyYWN0LkFuYWx5dGljc09iamVjdD4+IHtcclxuICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uYXBpTm90SW1wbGVtZW50ZWQoWydnZXRBbmFseXRpY09iamVjdHNBc3luYyddKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXREYXRhU291cmNlc0FzeW5jKCk6IFByb21pc2U8QXJyYXk8Q29udHJhY3QuRGF0YVNvdXJjZT4+IHtcclxuICAgIHJldHVybiB0aGlzLl93b3Jrc2hlZXRJbXBsLmdldERhdGFTb3VyY2VzQXN5bmMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRFbmNvZGluZ3NBc3luYygpOiBQcm9taXNlPEFycmF5PENvbnRyYWN0LkVuY29kaW5nPj4ge1xyXG4gICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5hcGlOb3RJbXBsZW1lbnRlZChbJ2dldEVuY29kaW5nc0FzeW5jJ10pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEZpbHRlcnNBc3luYygpOiBQcm9taXNlPENvbnRyYWN0LkZpbHRlcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fd29ya3NoZWV0SW1wbC5nZXRGaWx0ZXJzQXN5bmMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTZWxlY3RlZE1hcmtzQXN5bmMoKTogUHJvbWlzZTxDb250cmFjdC5NYXJrc0NvbGxlY3Rpb24+IHtcclxuICAgIHJldHVybiB0aGlzLl93b3Jrc2hlZXRJbXBsLmdldFNlbGVjdGVkTWFya3NBc3luYygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEhpZ2hsaWdodGVkTWFya3NBc3luYygpOiBQcm9taXNlPENvbnRyYWN0Lk1hcmtzQ29sbGVjdGlvbj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dvcmtzaGVldEltcGwuZ2V0SGlnaGxpZ2h0ZWRNYXJrc0FzeW5jKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U3VtbWFyeURhdGFBc3luYyhvcHRpb25zOiBDb250cmFjdC5HZXRTdW1tYXJ5RGF0YU9wdGlvbnMpOiBQcm9taXNlPENvbnRyYWN0LkRhdGFUYWJsZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dvcmtzaGVldEltcGwuZ2V0U3VtbWFyeURhdGFBc3luYyhvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRVbmRlcmx5aW5nRGF0YUFzeW5jKG9wdGlvbnM6IENvbnRyYWN0LkdldFVuZGVybHlpbmdEYXRhT3B0aW9ucyk6IFByb21pc2U8Q29udHJhY3QuRGF0YVRhYmxlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fd29ya3NoZWV0SW1wbC5nZXRVbmRlcmx5aW5nRGF0YUFzeW5jKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyU2VsZWN0ZWRNYXJrc0FzeW5jKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dvcmtzaGVldEltcGwuY2xlYXJTZWxlY3RlZE1hcmtzQXN5bmMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RNYXJrc0J5SURBc3luYyhtYXJrc0luZm86IEFycmF5PENvbnRyYWN0Lk1hcmtJbmZvPiwgdXBkYXRlVHlwZTogQ29udHJhY3QuU2VsZWN0aW9uVXBkYXRlVHlwZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dvcmtzaGVldEltcGwuc2VsZWN0TWFya3NCeUlkQXN5bmMobWFya3NJbmZvLCB1cGRhdGVUeXBlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RNYXJrc0J5VmFsdWVBc3luYyhzZWxlY3Rpb25zOiBBcnJheTxDb250cmFjdC5TZWxlY3Rpb25Dcml0ZXJpYT4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZVR5cGU6IENvbnRyYWN0LlNlbGVjdGlvblVwZGF0ZVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLl93b3Jrc2hlZXRJbXBsLnNlbGVjdE1hcmtzQnlWYWx1ZUFzeW5jKHNlbGVjdGlvbnMsIHNlbGVjdGlvblVwZGF0ZVR5cGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdE1hcmtzQnlJZEFzeW5jKHNlbGVjdGlvbnM6IEFycmF5PENvbnRyYWN0Lk1hcmtJbmZvPixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlVHlwZTogQ29udHJhY3QuU2VsZWN0aW9uVXBkYXRlVHlwZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dvcmtzaGVldEltcGwuc2VsZWN0TWFya3NCeUlkQXN5bmMoc2VsZWN0aW9ucywgc2VsZWN0aW9uVXBkYXRlVHlwZSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9Xb3Jrc2hlZXQudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHsgU2hlZXRQYXRoIH0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgQXBpU2VydmljZVJlZ2lzdHJ5LCBQYXJhbWV0ZXJzU2VydmljZSwgU2VydmljZU5hbWVzIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXNoYXJlZCc7XHJcblxyXG5pbXBvcnQgeyBTaGVldEluZm9JbXBsIH0gZnJvbSAnLi9TaGVldEluZm9JbXBsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaGVldEltcGwge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zaGVldEluZm9JbXBsOiBTaGVldEluZm9JbXBsKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldEluZm9JbXBsLm5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNoZWV0VHlwZSgpOiBDb250cmFjdC5TaGVldFR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NoZWV0SW5mb0ltcGwuc2hlZXRUeXBlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBzaGVldFBhdGgoKTogU2hlZXRQYXRoIHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldEluZm9JbXBsLnNoZWV0UGF0aDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2l6ZSgpOiBDb250cmFjdC5TaXplIHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldEluZm9JbXBsLnNoZWV0U2l6ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaW5kUGFyYW1ldGVyQXN5bmMocGFyYW1ldGVyTmFtZTogc3RyaW5nLCBzaGVldDogQ29udHJhY3QuU2hlZXQpOiBQcm9taXNlPENvbnRyYWN0LlBhcmFtZXRlciB8IHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3Qgc2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPFBhcmFtZXRlcnNTZXJ2aWNlPihTZXJ2aWNlTmFtZXMuUGFyYW1ldGVycyk7XHJcbiAgICByZXR1cm4gc2VydmljZS5maW5kUGFyYW1ldGVyQnlOYW1lQXN5bmMocGFyYW1ldGVyTmFtZSwgc2hlZXQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBhcmFtZXRlcnNBc3luYyhzaGVldDogQ29udHJhY3QuU2hlZXQpOiBQcm9taXNlPEFycmF5PENvbnRyYWN0LlBhcmFtZXRlcj4+IHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxQYXJhbWV0ZXJzU2VydmljZT4oU2VydmljZU5hbWVzLlBhcmFtZXRlcnMpO1xyXG4gICAgcmV0dXJuIHNlcnZpY2UuZ2V0UGFyYW1ldGVyc0ZvclNoZWV0QXN5bmModGhpcy5zaGVldFBhdGgsIHNoZWV0KTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL0ludGVybmFsL1NoZWV0SW1wbC50c1xuICoqLyIsImltcG9ydCB7IFNoZWV0VHlwZSwgU2l6ZSB9IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IFNoZWV0UGF0aCB9IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2hlZXRJbmZvSW1wbCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBfc2hlZXRUeXBlOiBTaGVldFR5cGUsXHJcbiAgICBwcml2YXRlIF9zaGVldFNpemU6IFNpemVcclxuICApIHsgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBzaGVldFNpemUoKTogU2l6ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hlZXRTaXplO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBzaGVldFR5cGUoKTogU2hlZXRUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldFR5cGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNoZWV0UGF0aCgpOiBTaGVldFBhdGgge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2hlZXROYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgIGlzRGFzaGJvYXJkOiB0aGlzLnNoZWV0VHlwZSA9PT0gU2hlZXRUeXBlLkRhc2hib2FyZFxyXG4gICAgICAvLyBUT0RPIC0gU3Rvcmllc1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL0ludGVybmFsL1NoZWV0SW5mb0ltcGwudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQge1xyXG4gIERhdGFTY2hlbWEsXHJcbiAgRGF0YVNvdXJjZSBhcyBEYXRhU291cmNlSW5mbyxcclxuICBGaWx0ZXJFdmVudCwgTm90aWZpY2F0aW9uSWQsXHJcbiAgVmlzdWFsSWQsXHJcbiAgV29ya3NoZWV0RGF0YVNvdXJjZUluZm9cclxufSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHtcclxuICBBcGlTZXJ2aWNlUmVnaXN0cnksXHJcbiAgRGF0YVNvdXJjZVNlcnZpY2UsXHJcbiAgRmlsdGVyQ2hhbmdlZEV2ZW50LFxyXG4gIEZpbHRlclNlcnZpY2UsXHJcbiAgR2V0RGF0YVNlcnZpY2UsXHJcbiAgR2V0RGF0YVR5cGUsXHJcbiAgTWFya3NTZWxlY3RlZEV2ZW50LFxyXG4gIE5vdGlmaWNhdGlvblNlcnZpY2UsXHJcbiAgU2VsZWN0aW9uU2VydmljZSxcclxuICBTZXJ2aWNlTmFtZXMsXHJcbiAgU2luZ2xlRXZlbnRNYW5hZ2VyLFxyXG4gIFNpbmdsZUV2ZW50TWFuYWdlckltcGxcclxufSBmcm9tICdAdGFibGVhdS9hcGktc2hhcmVkJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9EYXRhU291cmNlJztcclxuaW1wb3J0IHsgV29ya3NoZWV0IH0gZnJvbSAnLi4vV29ya3NoZWV0JztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2VJbXBsIH0gZnJvbSAnLi9EYXRhU291cmNlSW1wbCc7XHJcbmltcG9ydCB7IFNoZWV0SW1wbCB9IGZyb20gJy4vU2hlZXRJbXBsJztcclxuaW1wb3J0IHsgU2hlZXRJbmZvSW1wbCB9IGZyb20gJy4vU2hlZXRJbmZvSW1wbCc7XHJcblxyXG5jb25zdCB2aXN1YWxJZHNBcmVFcXVhbCA9IGZ1bmN0aW9uKGE6IFZpc3VhbElkLCBiOiBWaXN1YWxJZCk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBhICYmIGIgJiZcclxuICAgIGEud29ya3NoZWV0ID09PSBiLndvcmtzaGVldCAmJlxyXG4gICAgYS5kYXNoYm9hcmQgPT09IGIuZGFzaGJvYXJkICYmXHJcbiAgICBhLnN0b3J5Ym9hcmQgPT09IGIuc3Rvcnlib2FyZCAmJlxyXG4gICAgYS5zdG9yeVBvaW50SUQgPT09IGIuc3RvcnlQb2ludElEICYmXHJcbiAgICBhLmZsaXBib2FyZFpvbmVJRCA9PT0gYi5mbGlwYm9hcmRab25lSUQ7XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgV29ya3NoZWV0SW1wbCBleHRlbmRzIFNoZWV0SW1wbCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHNoZWV0SW5mb0ltcGw6IFNoZWV0SW5mb0ltcGwsXHJcbiAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUgX3Zpc3VhbElkOiBWaXN1YWxJZCxcclxuICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBfcGFyZW50RGFzaGJvYXJkOiBDb250cmFjdC5EYXNoYm9hcmQpIHtcclxuICAgIHN1cGVyKHNoZWV0SW5mb0ltcGwpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBwYXJlbnREYXNoYm9hcmQoKTogQ29udHJhY3QuRGFzaGJvYXJkIHtcclxuICAgIHJldHVybiB0aGlzLl9wYXJlbnREYXNoYm9hcmQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIZWxwZXIgbWV0aG9kIHdoaWNoIGdvZXMgdGhyb3VnaCBhbmQgcmVnaXN0ZXJzIGVhY2ggZXZlbnQgdHlwZSB0aGlzIGltcGwga25vd3MgYWJvdXRcclxuICAgKiB3aXRoIHRoZSBOb3RpZmljYXRpb25TZXJ2aWNlLiBJdCByZXR1cm5zIGFuIGFycmF5IG9mIFNpbmdsZUV2ZW50TWFuYWdlciBvYmplY3RzIHdoaWNoXHJcbiAgICogY2FuIHRoZW4gYmUgcGFzc2VkIHRvIGFuIEV2ZW50TGlzdGVuZXJNYW5hZ2VyIHRvIGhhbmRsZSB1c2VyIHJlZ2lzdHJhdGlvbiAvIHVucmVnaXN0cmF0aW9uLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtXb3Jrc2hlZXR9IHdvcmtzaGVldCBUaGUgd29ya3NoZWV0IG9iamVjdCB3aGljaCB3aWxsIGJlIGluY2x1ZGVkIHdpdGggdGhlIGV2ZW50IG5vdGlmaWNhdGlvbnNcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8U2luZ2xlRXZlbnRNYW5hZ2VyPn0gQ29sbGVjdGlvbiBvZiBldmVudCBtYW5hZ2VycyB0byBwYXNzIHRvIGFuIEV2ZW50TGlzdGVuZXJNYW5hZ2VyXHJcbiAgICovXHJcbiAgcHVibGljIGluaXRpYWxpemVFdmVudHMod29ya3NoZWV0OiBXb3Jrc2hlZXQpOiBBcnJheTxTaW5nbGVFdmVudE1hbmFnZXI+IHtcclxuICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgQXJyYXk8U2luZ2xlRXZlbnRNYW5hZ2VyPigpO1xyXG4gICAgbGV0IG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2U7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbm90aWZpY2F0aW9uU2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPE5vdGlmaWNhdGlvblNlcnZpY2U+KFNlcnZpY2VOYW1lcy5Ob3RpZmljYXRpb24pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIHRoaXMgc2VydmljZSByZWdpc3RlcmVkLCBqdXN0IHJldHVyblxyXG4gICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbml0aWFsaXplIGFsbCBvZiB0aGUgZXZlbnQgbWFuYWdlcnMgd2UnbGwgbmVlZCAob25lIGZvciBlYWNoIGV2ZW50IHR5cGUpXHJcbiAgICBjb25zdCBtYXJrc0V2ZW50ID0gbmV3IFNpbmdsZUV2ZW50TWFuYWdlckltcGw8TWFya3NTZWxlY3RlZEV2ZW50PihDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlLk1hcmtTZWxlY3Rpb25DaGFuZ2VkKTtcclxuICAgIG5vdGlmaWNhdGlvblNlcnZpY2UucmVnaXN0ZXJIYW5kbGVyKE5vdGlmaWNhdGlvbklkLlNlbGVjdGVkTWFya3NDaGFuZ2VkLCAobW9kZWwpID0+IHtcclxuICAgICAgY29uc3QgdmlzdWFsSWQgPSBtb2RlbCBhcyBWaXN1YWxJZDtcclxuICAgICAgcmV0dXJuIHZpc3VhbElkc0FyZUVxdWFsKHZpc3VhbElkLCB0aGlzLnZpc3VhbElkKTtcclxuICAgIH0sICh2aXo6IFZpc3VhbElkKSA9PiB7XHJcbiAgICAgIG1hcmtzRXZlbnQudHJpZ2dlckV2ZW50KCgpID0+IG5ldyBNYXJrc1NlbGVjdGVkRXZlbnQod29ya3NoZWV0KSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBmaWx0ZXJFdmVudCA9IG5ldyBTaW5nbGVFdmVudE1hbmFnZXJJbXBsPEZpbHRlckNoYW5nZWRFdmVudD4oQ29udHJhY3QuVGFibGVhdUV2ZW50VHlwZS5GaWx0ZXJDaGFuZ2VkKTtcclxuICAgIG5vdGlmaWNhdGlvblNlcnZpY2UucmVnaXN0ZXJIYW5kbGVyKE5vdGlmaWNhdGlvbklkLkZpbHRlckNoYW5nZWQsIChtb2RlbCkgPT4ge1xyXG4gICAgICBjb25zdCBmaWx0ZXJFdmVudFJlc3BvbnNlID0gbW9kZWwgYXMgRmlsdGVyRXZlbnQ7XHJcbiAgICAgIHJldHVybiB0aGlzLnZpc3VhbElkLndvcmtzaGVldCA9PT0gZmlsdGVyRXZlbnRSZXNwb25zZS52aXN1YWxJZC53b3Jrc2hlZXQ7XHJcbiAgICB9LCAoZXZlbnQ6IEZpbHRlckV2ZW50KSA9PiB7XHJcbiAgICAgIGZpbHRlckV2ZW50LnRyaWdnZXJFdmVudCgoKSA9PiBuZXcgRmlsdGVyQ2hhbmdlZEV2ZW50KHdvcmtzaGVldCwgZXZlbnQuZmllbGROYW1lKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXN1bHRzLnB1c2gobWFya3NFdmVudCk7XHJcbiAgICByZXN1bHRzLnB1c2goZmlsdGVyRXZlbnQpO1xyXG5cclxuICAgIC8vIFRPRE8gLSBvdGhlciBldmVudCB0eXBlc1xyXG5cclxuICAgIHJldHVybiByZXN1bHRzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB2aXN1YWxJZCgpOiBWaXN1YWxJZCB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmlzdWFsSWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXBwbHlGaWx0ZXJBc3luYyhcclxuICAgIGZpZWxkTmFtZTogc3RyaW5nLCB2YWx1ZXM6IEFycmF5PHN0cmluZz4sIHVwZGF0ZVR5cGU6IENvbnRyYWN0LkZpbHRlclVwZGF0ZVR5cGUsIG9wdGlvbnM6IENvbnRyYWN0LkZpbHRlck9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICBjb25zdCBzZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8RmlsdGVyU2VydmljZT4oU2VydmljZU5hbWVzLkZpbHRlcik7XHJcbiAgICAgIHJldHVybiBzZXJ2aWNlLmFwcGx5RmlsdGVyQXN5bmModGhpcy52aXN1YWxJZCwgZmllbGROYW1lLCB2YWx1ZXMsIHVwZGF0ZVR5cGUsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICBwdWJsaWMgYXBwbHlSYW5nZUZpbHRlckFzeW5jKGZpZWxkTmFtZTogc3RyaW5nLCBmaWx0ZXJPcHRpb25zOiBDb250cmFjdC5SYW5nZUZpbHRlck9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgY29uc3Qgc2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPEZpbHRlclNlcnZpY2U+KFNlcnZpY2VOYW1lcy5GaWx0ZXIpO1xyXG4gICAgcmV0dXJuIHNlcnZpY2UuYXBwbHlSYW5nZUZpbHRlckFzeW5jKHRoaXMudmlzdWFsSWQsIGZpZWxkTmFtZSwgZmlsdGVyT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXJGaWx0ZXJBc3luYyhmaWVsZE5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8RmlsdGVyU2VydmljZT4oU2VydmljZU5hbWVzLkZpbHRlcik7XHJcbiAgICByZXR1cm4gc2VydmljZS5jbGVhckZpbHRlckFzeW5jKHRoaXMudmlzdWFsSWQsIGZpZWxkTmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RGF0YVNvdXJjZXNBc3luYygpOiBQcm9taXNlPEFycmF5PENvbnRyYWN0LkRhdGFTb3VyY2U+PiB7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8RGF0YVNvdXJjZVNlcnZpY2U+KFNlcnZpY2VOYW1lcy5EYXRhU291cmNlU2VydmljZSk7XHJcblxyXG4gICAgcmV0dXJuIHNlcnZpY2UuZ2V0RGF0YVNvdXJjZXNBc3luYygpLnRoZW48QXJyYXk8Q29udHJhY3QuRGF0YVNvdXJjZT4+KHJlc3VsdCA9PiB7XHJcbiAgICAgIGNvbnN0IGRhdGFTY2hlbWE6IERhdGFTY2hlbWEgPSByZXN1bHQgYXMgRGF0YVNjaGVtYTtcclxuICAgICAgY29uc3Qgd29ya3NoZWV0RGF0YVNvdXJjZUluZm86IFdvcmtzaGVldERhdGFTb3VyY2VJbmZvID0gZGF0YVNjaGVtYS53b3Jrc2hlZXREYXRhU2NoZW1hTWFwW3RoaXMubmFtZV07XHJcblxyXG4gICAgICBsZXQgZGF0YVNvdXJjZXM6IEFycmF5PENvbnRyYWN0LkRhdGFTb3VyY2U+ID0gW107XHJcblxyXG4gICAgICAvLyBGaXJzdCwgYWRkIHRoZSBwcmltYXJ5IGRhdGFzb3VyY2UuICBCeSBjb252ZW50aW9uLCBpdCBjb21lcyBmaXJzdCBpbiB0aGUgcmV0dXJuZWQgYXJyYXkuXHJcbiAgICAgIGxldCBwcmltYXJ5SWQ6IHN0cmluZyA9IHdvcmtzaGVldERhdGFTb3VyY2VJbmZvLnByaW1hcnlEYXRhU291cmNlO1xyXG4gICAgICBkYXRhU291cmNlcy5wdXNoKHRoaXMuY3JlYXRlRGF0YVNvdXJjZUZyb21JbmZvKGRhdGFTY2hlbWEuZGF0YVNvdXJjZXNbcHJpbWFyeUlkXSkpO1xyXG5cclxuICAgICAgLy8gVGhlbiwgbG9vcCB0aHJvdWdoIGFueSBzZWNvbmRhcnkgZGF0YSBzb3VyY2VzIGFuZCBhZGQgdGhlbS5cclxuICAgICAgZm9yIChsZXQgc2Vjb25kYXJ5SWQgb2Ygd29ya3NoZWV0RGF0YVNvdXJjZUluZm8ucmVmZXJlbmNlZERhdGFTb3VyY2VMaXN0KSB7XHJcbiAgICAgICAgaWYgKHNlY29uZGFyeUlkICE9PSBwcmltYXJ5SWQpIHtcclxuICAgICAgICAgIGRhdGFTb3VyY2VzLnB1c2godGhpcy5jcmVhdGVEYXRhU291cmNlRnJvbUluZm8oZGF0YVNjaGVtYS5kYXRhU291cmNlc1tzZWNvbmRhcnlJZF0pKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBkYXRhU291cmNlcztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEZpbHRlcnNBc3luYygpOiBQcm9taXNlPENvbnRyYWN0LkZpbHRlcltdPiB7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8RmlsdGVyU2VydmljZT4oU2VydmljZU5hbWVzLkZpbHRlcik7XHJcbiAgICByZXR1cm4gc2VydmljZS5nZXRGaWx0ZXJzQXN5bmModGhpcy52aXN1YWxJZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U2VsZWN0ZWRNYXJrc0FzeW5jKCk6IFByb21pc2U8Q29udHJhY3QuTWFya3NDb2xsZWN0aW9uPiB7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8R2V0RGF0YVNlcnZpY2U+KFNlcnZpY2VOYW1lcy5HZXREYXRhKTtcclxuICAgIHJldHVybiBzZXJ2aWNlLmdldFNlbGVjdGVkTWFya3NBc3luYyh0aGlzLnZpc3VhbElkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRIaWdobGlnaHRlZE1hcmtzQXN5bmMoKTogUHJvbWlzZTxDb250cmFjdC5NYXJrc0NvbGxlY3Rpb24+IHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxHZXREYXRhU2VydmljZT4oU2VydmljZU5hbWVzLkdldERhdGEpO1xyXG4gICAgcmV0dXJuIHNlcnZpY2UuZ2V0SGlnaGxpZ2h0ZWRNYXJrc0FzeW5jKHRoaXMudmlzdWFsSWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFN1bW1hcnlEYXRhQXN5bmMob3B0aW9uczogQ29udHJhY3QuR2V0U3VtbWFyeURhdGFPcHRpb25zKTogUHJvbWlzZTxDb250cmFjdC5EYXRhVGFibGU+IHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxHZXREYXRhU2VydmljZT4oU2VydmljZU5hbWVzLkdldERhdGEpO1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgcmV0dXJuIHNlcnZpY2UuZ2V0VW5kZXJseWluZ0RhdGFBc3luYyhcclxuICAgICAgdGhpcy52aXN1YWxJZCwgR2V0RGF0YVR5cGUuU3VtbWFyeSwgISFvcHRpb25zLmlnbm9yZUFsaWFzZXMsICEhb3B0aW9ucy5pZ25vcmVTZWxlY3Rpb24sIHRydWUsIDApO1xyXG4gICAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VW5kZXJseWluZ0RhdGFBc3luYyhvcHRpb25zOiBDb250cmFjdC5HZXRVbmRlcmx5aW5nRGF0YU9wdGlvbnMpOiBQcm9taXNlPENvbnRyYWN0LkRhdGFUYWJsZT4ge1xyXG4gICAgY29uc3Qgc2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPEdldERhdGFTZXJ2aWNlPihTZXJ2aWNlTmFtZXMuR2V0RGF0YSk7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIHJldHVybiBzZXJ2aWNlLmdldFVuZGVybHlpbmdEYXRhQXN5bmMoXHJcbiAgICAgIHRoaXMudmlzdWFsSWQsXHJcbiAgICAgIEdldERhdGFUeXBlLlVuZGVybHlpbmcsXHJcbiAgICAgICEhb3B0aW9ucy5pZ25vcmVBbGlhc2VzLFxyXG4gICAgICAhIW9wdGlvbnMuaWdub3JlU2VsZWN0aW9uLFxyXG4gICAgICAhIW9wdGlvbnMuaW5jbHVkZUFsbENvbHVtbnMsXHJcbiAgICAgIG9wdGlvbnMubWF4Um93cyB8fCAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhclNlbGVjdGVkTWFya3NBc3luYygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxTZWxlY3Rpb25TZXJ2aWNlPihTZXJ2aWNlTmFtZXMuU2VsZWN0aW9uKTtcclxuICAgIHJldHVybiBzZXJ2aWNlLmNsZWFyU2VsZWN0ZWRNYXJrc0FzeW5jKHRoaXMudmlzdWFsSWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdE1hcmtzQnlWYWx1ZUFzeW5jKHNlbGVjdGlvbnM6IEFycmF5PENvbnRyYWN0LlNlbGVjdGlvbkNyaXRlcmlhPixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlVHlwZTogQ29udHJhY3QuU2VsZWN0aW9uVXBkYXRlVHlwZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3Qgc2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPFNlbGVjdGlvblNlcnZpY2U+KFNlcnZpY2VOYW1lcy5TZWxlY3Rpb24pO1xyXG4gICAgcmV0dXJuIHNlcnZpY2Uuc2VsZWN0TWFya3NCeVZhbHVlQXN5bmModGhpcy52aXN1YWxJZCwgc2VsZWN0aW9ucywgc2VsZWN0aW9uVXBkYXRlVHlwZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VsZWN0TWFya3NCeUlkQXN5bmMoc2VsZWN0aW9uczogQXJyYXk8Q29udHJhY3QuTWFya0luZm8+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25VcGRhdGVUeXBlOiBDb250cmFjdC5TZWxlY3Rpb25VcGRhdGVUeXBlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8U2VsZWN0aW9uU2VydmljZT4oU2VydmljZU5hbWVzLlNlbGVjdGlvbik7XHJcbiAgICByZXR1cm4gc2VydmljZS5zZWxlY3RNYXJrc0J5SWRBc3luYyh0aGlzLnZpc3VhbElkLCBzZWxlY3Rpb25zLCBzZWxlY3Rpb25VcGRhdGVUeXBlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlRGF0YVNvdXJjZUZyb21JbmZvKGRhdGFTb3VyY2VJbmZvOiBEYXRhU291cmNlSW5mbyk6IENvbnRyYWN0LkRhdGFTb3VyY2Uge1xyXG4gICAgY29uc3QgZGF0YVNvdXJjZUltcGwgPSBuZXcgRGF0YVNvdXJjZUltcGwoZGF0YVNvdXJjZUluZm8pO1xyXG4gICAgY29uc3QgZGF0YVNvdXJjZSA9IG5ldyBEYXRhU291cmNlKGRhdGFTb3VyY2VJbXBsKTtcclxuICAgIGRhdGFTb3VyY2VJbXBsLmluaXRpYWxpemVXaXRoUHVibGljSW50ZXJmYWNlcyhkYXRhU291cmNlKTtcclxuICAgIHJldHVybiBkYXRhU291cmNlO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvSW50ZXJuYWwvV29ya3NoZWV0SW1wbC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlSW1wbCB9IGZyb20gJy4vSW50ZXJuYWwvRGF0YVNvdXJjZUltcGwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFTb3VyY2UgaW1wbGVtZW50cyBDb250cmFjdC5EYXRhU291cmNlIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0YVNvdXJjZUltcGw6IERhdGFTb3VyY2VJbXBsKSB7IH1cclxuXHJcbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZUltcGwubmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlSW1wbC5pZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZmllbGRzKCk6IENvbnRyYWN0LkZpZWxkW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VJbXBsLmZpZWxkcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZXh0cmFjdFVwZGF0ZVRpbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlSW1wbC5leHRyYWN0VXBkYXRlVGltZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaXNFeHRyYWN0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VJbXBsLmlzRXh0cmFjdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWZyZXNoQXN5bmMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZUltcGwucmVmcmVzaEFzeW5jKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0QWN0aXZlVGFibGVzQXN5bmMoKTogUHJvbWlzZTxDb250cmFjdC5UYWJsZVN1bW1hcnlbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VJbXBsLmdldEFjdGl2ZVRhYmxlc0FzeW5jKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q29ubmVjdGlvblN1bW1hcmllc0FzeW5jKCk6IFByb21pc2U8Q29udHJhY3QuQ29ubmVjdGlvblN1bW1hcnlbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VJbXBsLmdldENvbm5lY3Rpb25TdW1tYXJpZXNBc3luYygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFVuZGVybHlpbmdEYXRhQXN5bmMob3B0aW9ucz86IENvbnRyYWN0LkRhdGFTb3VyY2VVbmRlcmx5aW5nRGF0YU9wdGlvbnMpOlxyXG4gICAgUHJvbWlzZTxDb250cmFjdC5EYXRhVGFibGU+IHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlSW1wbC5nZXRVbmRlcmx5aW5nRGF0YUFzeW5jKG9wdGlvbnMpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvRGF0YVNvdXJjZS50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCAqIGFzIEludGVybmFsQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgQXBpU2VydmljZVJlZ2lzdHJ5LCBEYXRhU291cmNlU2VydmljZSwgR2V0RGF0YVNlcnZpY2UsIFNlcnZpY2VOYW1lcyB9IGZyb20gJ0B0YWJsZWF1L2FwaS1zaGFyZWQnO1xyXG5pbXBvcnQgeyBUYWJsZWF1RXhjZXB0aW9uIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXV0aWxzJztcclxuXHJcbmltcG9ydCB7IEZpZWxkSW1wbCB9IGZyb20gJy4vRmllbGRJbXBsJztcclxuXHJcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgeyBUYWJsZVN1bW1hcnkgfSBmcm9tICcuLi9UYWJsZVN1bW1hcnknO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFTb3VyY2VJbXBsIHtcclxuICBwcml2YXRlIF9maWVsZHM6IEZpZWxkW107XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRhU291cmNlSW5mbzogSW50ZXJuYWxDb250cmFjdC5EYXRhU291cmNlKSB7XHJcbiAgICB0aGlzLl9maWVsZHMgPSBfZGF0YVNvdXJjZUluZm8uZmllbGRzLm1hcChmaWVsZE1vZGVsID0+IHtcclxuICAgICAgY29uc3QgZmllbGRJbXBsID0gbmV3IEZpZWxkSW1wbChmaWVsZE1vZGVsLCB0aGlzKTtcclxuICAgICAgcmV0dXJuIG5ldyBGaWVsZChmaWVsZEltcGwpO1xyXG4gICAgfSk7XHJcbiAgIH1cclxuXHJcbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZUluZm8ubmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlSW5mby5pZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZXh0cmFjdFVwZGF0ZVRpbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlSW5mby5leHRyYWN0VXBkYXRlVGltZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZmllbGRzKCk6IENvbnRyYWN0LkZpZWxkW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaXNFeHRyYWN0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VJbmZvLmlzRXh0cmFjdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWZyZXNoQXN5bmMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBkYXRhU291cmNlU2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPERhdGFTb3VyY2VTZXJ2aWNlPihcclxuICAgICAgU2VydmljZU5hbWVzLkRhdGFTb3VyY2VTZXJ2aWNlKTtcclxuXHJcbiAgICByZXR1cm4gZGF0YVNvdXJjZVNlcnZpY2UucmVmcmVzaEFzeW5jKHRoaXMuX2RhdGFTb3VyY2VJbmZvLmlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDb25uZWN0aW9uU3VtbWFyaWVzQXN5bmMoKTogUHJvbWlzZTxDb250cmFjdC5Db25uZWN0aW9uU3VtbWFyeVtdPiB7XHJcbiAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmFwaU5vdEltcGxlbWVudGVkKFsnRGF0YVNvdXJjZSBjb25uZWN0aW9uU3VtbWFyaWVzJ10pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEFjdGl2ZVRhYmxlc0FzeW5jKCk6IFByb21pc2U8Q29udHJhY3QuVGFibGVTdW1tYXJ5W10+IHtcclxuICAgIGNvbnN0IGRhdGFTb3VyY2VTZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8RGF0YVNvdXJjZVNlcnZpY2U+KFxyXG4gICAgICBTZXJ2aWNlTmFtZXMuRGF0YVNvdXJjZVNlcnZpY2UpO1xyXG5cclxuICAgIHJldHVybiBkYXRhU291cmNlU2VydmljZS5nZXRBY3RpdmVUYWJsZXNBc3luYyh0aGlzLl9kYXRhU291cmNlSW5mby5pZCkudGhlbjxDb250cmFjdC5UYWJsZVN1bW1hcnlbXT4odGFibGVJbmZvcyA9PiB7XHJcbiAgICAgIHJldHVybiB0YWJsZUluZm9zLm1hcCh0YWJsZUluZm8gPT4gbmV3IFRhYmxlU3VtbWFyeSh0YWJsZUluZm8pKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFVuZGVybHlpbmdEYXRhQXN5bmMob3B0aW9ucz86IENvbnRyYWN0LkRhdGFTb3VyY2VVbmRlcmx5aW5nRGF0YU9wdGlvbnMpOlxyXG4gICAgUHJvbWlzZTxDb250cmFjdC5EYXRhVGFibGU+IHtcclxuICAgICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBpZ25vcmVBbGlhc2VzOiBmYWxzZSxcclxuICAgICAgICAgIG1heFJvd3M6IDEwMDAwLFxyXG4gICAgICAgICAgY29sdW1uc1RvSW5jbHVkZTogW10sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICAgIGNvbnN0IGdldERhdGFTZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8R2V0RGF0YVNlcnZpY2U+KFNlcnZpY2VOYW1lcy5HZXREYXRhKTtcclxuICAgICAgcmV0dXJuIGdldERhdGFTZXJ2aWNlLmdldERhdGFTb3VyY2VEYXRhQXN5bmMoXHJcbiAgICAgICAgdGhpcy5pZCxcclxuICAgICAgICAhIW9wdGlvbnMuaWdub3JlQWxpYXNlcyxcclxuICAgICAgICBvcHRpb25zLm1heFJvd3MgfHwgZGVmYXVsdE9wdGlvbnMubWF4Um93cyxcclxuICAgICAgICBvcHRpb25zLmNvbHVtbnNUb0luY2x1ZGUgfHwgZGVmYXVsdE9wdGlvbnMuY29sdW1uc1RvSW5jbHVkZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdGlhbGl6ZVdpdGhQdWJsaWNJbnRlcmZhY2VzKGRhdGFTb3VyY2U6IENvbnRyYWN0LkRhdGFTb3VyY2UpOiB2b2lkIHtcclxuICAgIHRoaXMuX2ZpZWxkcyA9IHRoaXMuX2RhdGFTb3VyY2VJbmZvLmZpZWxkcy5tYXAoZmllbGRNb2RlbCA9PiB7XHJcbiAgICAgIGNvbnN0IGZpZWxkSW1wbCA9IG5ldyBGaWVsZEltcGwoZmllbGRNb2RlbCwgZGF0YVNvdXJjZSk7XHJcbiAgICAgIHJldHVybiBuZXcgRmllbGQoZmllbGRJbXBsKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvSW50ZXJuYWwvRGF0YVNvdXJjZUltcGwudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgKiBhcyBJbnRlcm5hbENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IEludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncyB9IGZyb20gJ0B0YWJsZWF1L2FwaS1zaGFyZWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpZWxkSW1wbCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZpZWxkSW5mbzogSW50ZXJuYWxDb250cmFjdC5GaWVsZCxcclxuICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBfcGFyZW50RGF0YVNvdXJjZTogQ29udHJhY3QuRGF0YVNvdXJjZSkgeyAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZEluZm8ubmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZEluZm8uaWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGRlc2NyaXB0aW9uKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRJbmZvLmRlc2NyaXB0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBhZ2dyZWdhdGlvbigpOiBDb250cmFjdC5GaWVsZEFnZ3JlZ2F0aW9uVHlwZSB7XHJcbiAgICByZXR1cm4gSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzLmZpZWxkQWdncmVnYXRpb25UeXBlLmNvbnZlcnQodGhpcy5fZmllbGRJbmZvLmFnZ3JlZ2F0aW9uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZGF0YVNvdXJjZSgpOiBDb250cmFjdC5EYXRhU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLl9wYXJlbnREYXRhU291cmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCByb2xlKCk6IENvbnRyYWN0LkZpZWxkUm9sZVR5cGUge1xyXG4gICAgcmV0dXJuIEludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncy5maWVsZFJvbGVUeXBlLmNvbnZlcnQodGhpcy5fZmllbGRJbmZvLnJvbGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc0hpZGRlbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZEluZm8uaXNIaWRkZW47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGlzR2VuZXJhdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkSW5mby5pc0dlbmVyYXRlZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaXNDYWxjdWxhdGVkRmllbGQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRJbmZvLmlzQ2FsY3VsYXRlZEZpZWxkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc0NvbWJpbmVkRmllbGQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRJbmZvLmlzQ29tYmluZWRGaWVsZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDYWxjdWxhdGVkRmllbGRBc3luYygpOiBQcm9taXNlPENvbnRyYWN0LkNhbGN1bGF0ZWRGaWVsZCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdGaWVsZCBnZXRDYWxjdWxhdGVkRmllbGRBc3luYyBtZXRob2Qgbm90IHlldCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL0ludGVybmFsL0ZpZWxkSW1wbC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5pbXBvcnQgeyBGaWVsZEltcGwgfSBmcm9tICcuL0ludGVybmFsL0ZpZWxkSW1wbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmllbGQgaW1wbGVtZW50cyBDb250cmFjdC5GaWVsZCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZpZWxkSW1wbDogRmllbGRJbXBsKSB7IH1cclxuXHJcbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRJbXBsLm5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRJbXBsLmlkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkSW1wbC5kZXNjcmlwdGlvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgYWdncmVnYXRpb24oKTogQ29udHJhY3QuRmllbGRBZ2dyZWdhdGlvblR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkSW1wbC5hZ2dyZWdhdGlvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZGF0YVNvdXJjZSgpOiBDb250cmFjdC5EYXRhU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZEltcGwuZGF0YVNvdXJjZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgcm9sZSgpOiBDb250cmFjdC5GaWVsZFJvbGVUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZEltcGwucm9sZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaXNIaWRkZW4oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRJbXBsLmlzSGlkZGVuO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc0dlbmVyYXRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZEltcGwuaXNHZW5lcmF0ZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGlzQ2FsY3VsYXRlZEZpZWxkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkSW1wbC5pc0NhbGN1bGF0ZWRGaWVsZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgY29sdW1uVHlwZSgpOiBDb250cmFjdC5Db2x1bW5UeXBlIHtcclxuICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uYXBpTm90SW1wbGVtZW50ZWQoWydGaWVsZC5jb2x1bW5UeXBlJ10pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc0NvbWJpbmVkRmllbGQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRJbXBsLmlzQ29tYmluZWRGaWVsZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDYWxjdWxhdGVkRmllbGRBc3luYygpOiBQcm9taXNlPENvbnRyYWN0LkNhbGN1bGF0ZWRGaWVsZCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkSW1wbC5nZXRDYWxjdWxhdGVkRmllbGRBc3luYygpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvRmllbGQudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBUYWJsZUluZm8gfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIG9mIGEgdGFibGUgc3VtbWFyeS5cclxuICogVGhpcyBkb2VzIG5vdCBmb2xsb3cgdGhlIEltcGwgcGF0dGVybiBhcyBpdCBpcyBqdXN0IGEgcHJvcGVydHkgYmFnLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRhYmxlU3VtbWFyeSBpbXBsZW1lbnRzIENvbnRyYWN0LlRhYmxlU3VtbWFyeSB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RhYmxlSW5mbzogVGFibGVJbmZvKSB7IH1cclxuXHJcbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGFibGVJbmZvLm5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGFibGVJbmZvLmlkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBjb25uZWN0aW9uSWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl90YWJsZUluZm8uY29ubmVjdGlvbklkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBjdXN0b21TUUwoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl90YWJsZUluZm8uY3VzdG9tU1FMO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvVGFibGVTdW1tYXJ5LnRzXG4gKiovIiwiaW1wb3J0IHsgRXh0ZW5zaW9uU2V0dGluZ3NJbmZvIH0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgQXBpU2VydmljZVJlZ2lzdHJ5IH0gZnJvbSAnQHRhYmxlYXUvYXBpLXNoYXJlZCc7XHJcbmltcG9ydCB7IFBhcmFtLCBUYWJsZWF1RXhjZXB0aW9uIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXV0aWxzJztcclxuXHJcbmltcG9ydCB7IEV4dGVuc2lvbnNTZXJ2aWNlTmFtZXMgfSBmcm9tICcuLi9TZXJ2aWNlcy9FeHRlbnNpb25zU2VydmljZU5hbWVzJztcclxuaW1wb3J0IHsgU2V0dGluZ3NDb2xsZWN0aW9uLCBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tICcuLi9TZXJ2aWNlcy9TZXR0aW5nc1NlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzSW1wbCB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgQVNZTkNfU0FWRV9JTl9QUk9HUkVTUzogc3RyaW5nID0gJ0FzeW5jIFNhdmUgaXMgaW4gcHJvZ3Jlc3MsIHVwZGF0aW5nIHNldHRpbmdzIGlzIG5vdCBhbGxvd2VkLic7XHJcbiAgcHJpdmF0ZSBfaXNNb2RpZmllZDogYm9vbGVhbjtcclxuICBwcml2YXRlIF9jdXJyZW50U2V0dGluZ3M6IFNldHRpbmdzQ29sbGVjdGlvbjtcclxuXHJcbiAgLy8gU2luY2UgcHJvbWlzZXMgY2FuJ3QgYmUgaW50cm9zcGVjdGVkIGZvciBzdGF0ZSwga2VlcCBhIHZhcmlhYmxlIHRoYXRcclxuICAvLyBpbmRpY2F0ZXMgYSBzYXZlIGlzIGluIHByb2dyZXNzLCBzbyB0aGF0IHNldC9lcmFzZSBjYW4ndCBiZSBjYWxsZWQgZHVyaW5nIGEgc2F2ZS5cclxuICBwcml2YXRlIF9zYXZlSW5Qcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2V0dGluZ3NJbmZvOiBFeHRlbnNpb25TZXR0aW5nc0luZm8pIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZVNldHRpbmdzKHNldHRpbmdzSW5mbyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXJhc2Uoa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIFBhcmFtLnZlcmlmeVZhbHVlKGtleSwgJ2tleScpO1xyXG5cclxuICAgIC8vIE9ubHkgbWFrZSBhIG1vZGlmaWNhdGlvbiBpZiB3ZSBoYXZlIHRoZSBrZXkgYWxyZWFkeVxyXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRTZXR0aW5nc1trZXldKSB7XHJcbiAgICAgIHRoaXMudmVyaWZ5U2V0dGluZ3NBcmVVbmxvY2tlZCgpO1xyXG5cclxuICAgICAgZGVsZXRlIHRoaXMuX2N1cnJlbnRTZXR0aW5nc1trZXldO1xyXG4gICAgICB0aGlzLl9pc01vZGlmaWVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgUGFyYW0udmVyaWZ5VmFsdWUoa2V5LCAna2V5Jyk7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFNldHRpbmdzW2tleV07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0QWxsKCk6IFNldHRpbmdzQ29sbGVjdGlvbiB7XHJcbiAgICAvLyBSZXR1cm5zIGEgbXV0YWJsZSBjb3B5IG9mIHRoZSBzZXR0aW5nc1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2N1cnJlbnRTZXR0aW5ncyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGlzTW9kaWZpZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNNb2RpZmllZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzYXZlQXN5bmMoKTogUHJvbWlzZTxTZXR0aW5nc0NvbGxlY3Rpb24+IHtcclxuICAgIHRoaXMudmVyaWZ5U2V0dGluZ3NBcmVVbmxvY2tlZCgpO1xyXG5cclxuICAgIC8vIEp1c3QgcmVzb2x2ZSBpbW1lZGlhdGVseSBpZiBzZXR0aW5ncyBhcmUgdW5jaGFuZ2VkXHJcbiAgICBpZiAoIXRoaXMuX2lzTW9kaWZpZWQpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZTxTZXR0aW5nc0NvbGxlY3Rpb24+KHRoaXMuX2N1cnJlbnRTZXR0aW5ncyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2F2ZUluUHJvZ3Jlc3MgPSB0cnVlO1xyXG5cclxuICAgIC8vIFVzZSB0aGUgc2V0dGluZ3Mgc2VydmljZSB0byBzYXZlIHNldHRpbmdzIHRvIHR3YlxyXG4gICAgY29uc3Qgc2V0dGluZ3NTZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8U2V0dGluZ3NTZXJ2aWNlPihcclxuICAgICAgRXh0ZW5zaW9uc1NlcnZpY2VOYW1lcy5TZXR0aW5nc1NlcnZpY2UpO1xyXG5cclxuICAgIHJldHVybiBzZXR0aW5nc1NlcnZpY2Uuc2F2ZVNldHRpbmdzQXN5bmModGhpcy5fY3VycmVudFNldHRpbmdzKS50aGVuPFNldHRpbmdzQ29sbGVjdGlvbj4obmV3U2V0dGluZ3MgPT4ge1xyXG4gICAgICB0aGlzLl9zYXZlSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLl9pc01vZGlmaWVkID0gZmFsc2U7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fY3VycmVudFNldHRpbmdzLCBuZXdTZXR0aW5ncyk7XHJcbiAgICAgIHJldHVybiBuZXdTZXR0aW5ncztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgUGFyYW0udmVyaWZ5VmFsdWUoa2V5LCAna2V5Jyk7IC8vIEtleSBzaG91bGRuJ3QgYmUgYW4gZW1wdHkgc3RyaW5nLlxyXG4gICAgUGFyYW0udmVyaWZ5U3RyaW5nKHZhbHVlLCAndmFsdWUnKTsgLy8gRW1wdHkgc3RyaW5nIHZhbHVlIGlzIGFsbG93ZWQuXHJcbiAgICB0aGlzLnZlcmlmeVNldHRpbmdzQXJlVW5sb2NrZWQoKTtcclxuXHJcbiAgICB0aGlzLl9jdXJyZW50U2V0dGluZ3Nba2V5XSA9IHZhbHVlO1xyXG4gICAgdGhpcy5faXNNb2RpZmllZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRpYWxpemVTZXR0aW5ncyhzZXR0aW5nc0luZm86IEV4dGVuc2lvblNldHRpbmdzSW5mbyk6IHZvaWQge1xyXG4gICAgUGFyYW0udmVyaWZ5VmFsdWUoc2V0dGluZ3NJbmZvLCAnc2V0dGluZ3NJbmZvJyk7XHJcbiAgICBQYXJhbS52ZXJpZnlWYWx1ZShzZXR0aW5nc0luZm8uc2V0dGluZ3NWYWx1ZXMsICdzZXR0aW5nc0luZm8uU2V0dGluZ3NWYWx1ZXMnKTtcclxuXHJcbiAgICB0aGlzLl9jdXJyZW50U2V0dGluZ3MgPSBzZXR0aW5nc0luZm8uc2V0dGluZ3NWYWx1ZXM7XHJcblxyXG4gICAgLy8gUmVzZXQgdGhlIGlzTW9kaWZpZWQgZmxhZ1xyXG4gICAgdGhpcy5faXNNb2RpZmllZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBoZWxwZXIgc2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgYW55IGxvY2FsIHVwZGF0ZSB0byB0aGlzLmN1cnJlbnRTZXR0aW5ncy5cclxuICAgKiBDaGVja3MgaWYgYSBjdXJyZW50IHNhdmUgY2FsbCBpcyBzdGlsbCBpbiBwcm9ncmVzcyBhbmQgdGhyb3dzIGFuIGVycm9yIGlmIHNvLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdmVyaWZ5U2V0dGluZ3NBcmVVbmxvY2tlZCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9zYXZlSW5Qcm9ncmVzcykge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmVycm9yKFNldHRpbmdzSW1wbC5BU1lOQ19TQVZFX0lOX1BST0dSRVNTKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL0ludGVybmFsL1NldHRpbmdzSW1wbC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IEFwaVNlcnZpY2VSZWdpc3RyeSB9IGZyb20gJ0B0YWJsZWF1L2FwaS1zaGFyZWQnO1xyXG5cclxuaW1wb3J0IHsgRXh0ZW5zaW9uRGlhbG9nIH0gZnJvbSAnLi4vRXh0ZW5zaW9uRGlhbG9nJztcclxuXHJcbmltcG9ydCB7IEV4dGVuc2lvbkRpYWxvZ0ltcGwgfSBmcm9tICcuL0V4dGVuc2lvbkRpYWxvZ0ltcGwnO1xyXG5cclxuaW1wb3J0IHsgRXh0ZW5zaW9uc1NlcnZpY2VOYW1lcyB9IGZyb20gJy4uL1NlcnZpY2VzL0V4dGVuc2lvbnNTZXJ2aWNlTmFtZXMnO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICcuLi9TZXJ2aWNlcy9VSVNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVJSW1wbCB7XHJcbiAgcHVibGljIGRpc3BsYXlEaWFsb2dBc3luYyh1cmw6IHN0cmluZywgaGVpZ2h0PzogbnVtYmVyLCB3aWR0aD86IG51bWJlcik6IFByb21pc2U8Q29udHJhY3QuRXh0ZW5zaW9uRGlhbG9nPiB7XHJcbiAgICBjb25zdCB1aVNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxVSVNlcnZpY2U+KFxyXG4gICAgICBFeHRlbnNpb25zU2VydmljZU5hbWVzLlVJU2VydmljZSk7XHJcblxyXG4gICAgcmV0dXJuIHVpU2VydmljZS5kaXNwbGF5RGlhbG9nQXN5bmModXJsKS50aGVuPENvbnRyYWN0LkV4dGVuc2lvbkRpYWxvZz4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICByZXR1cm4gbmV3IEV4dGVuc2lvbkRpYWxvZyhuZXcgRXh0ZW5zaW9uRGlhbG9nSW1wbCgpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG1lc3NhZ2VQYXJlbnRFeHRlbnNpb24obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCB1aVNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxVSVNlcnZpY2U+KFxyXG4gICAgICBFeHRlbnNpb25zU2VydmljZU5hbWVzLlVJU2VydmljZSk7XHJcblxyXG4gICAgdWlTZXJ2aWNlLnNlbmRNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvSW50ZXJuYWwvVUlJbXBsLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IEV4dGVuc2lvbkRpYWxvZ0ltcGwgfSBmcm9tICcuL0ludGVybmFsL0V4dGVuc2lvbkRpYWxvZ0ltcGwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV4dGVuc2lvbkRpYWxvZyBpbXBsZW1lbnRzIENvbnRyYWN0LkV4dGVuc2lvbkRpYWxvZyB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ltcGw6IEV4dGVuc2lvbkRpYWxvZ0ltcGwpIHsgfVxyXG5cclxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9pbXBsLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOiBDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlLCBoYW5kbGVyOiBDb250cmFjdC5UYWJsZWF1RXZlbnRIYW5kbGVyRm4pOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5faW1wbC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvRXh0ZW5zaW9uRGlhbG9nLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgTW9kZWwsIE5vdGlmaWNhdGlvbklkLCBVSU1lc3NhZ2UgfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVnaXN0cnksIE5vdGlmaWNhdGlvblNlcnZpY2UsIFNlcnZpY2VOYW1lcyB9IGZyb20gJ0B0YWJsZWF1L2FwaS1zaGFyZWQnO1xyXG5cclxuaW1wb3J0IHsgRXh0ZW5zaW9uc1NlcnZpY2VOYW1lcyB9IGZyb20gJy4uL1NlcnZpY2VzL0V4dGVuc2lvbnNTZXJ2aWNlTmFtZXMnO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICcuLi9TZXJ2aWNlcy9VSVNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV4dGVuc2lvbkRpYWxvZ0ltcGwge1xyXG4gIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHVpU2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPFVJU2VydmljZT4oXHJcbiAgICAgIEV4dGVuc2lvbnNTZXJ2aWNlTmFtZXMuVUlTZXJ2aWNlKTtcclxuXHJcbiAgICB1aVNlcnZpY2UuY2xvc2VEaWFsb2coKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6IENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGUsIGhhbmRsZXI6IENvbnRyYWN0LlRhYmxlYXVFdmVudEhhbmRsZXJGbik6IHZvaWQge1xyXG4gICAgbGV0IG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2U7XHJcbiAgICB0cnkge1xyXG4gICAgICBub3RpZmljYXRpb25TZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8Tm90aWZpY2F0aW9uU2VydmljZT4oU2VydmljZU5hbWVzLk5vdGlmaWNhdGlvbik7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgdGhpcyBzZXJ2aWNlIHJlZ2lzdGVyZWQsIGp1c3QgcmV0dXJuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZmlsdGVyRm46IChtb2RlbDogTW9kZWwpID0+IGJvb2xlYW4gPSAobW9kZWw6IE1vZGVsKSA9PiB7XHJcbiAgICAgIGxldCBtZXNzYWdlOiBVSU1lc3NhZ2UgPSBtb2RlbCBhcyBVSU1lc3NhZ2U7XHJcbiAgICAgIGlmIChtZXNzYWdlLm1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbm90aWZpY2F0aW9uU2VydmljZS5yZWdpc3RlckhhbmRsZXIoTm90aWZpY2F0aW9uSWQuVUlNZXNzYWdlLCBmaWx0ZXJGbiwgaGFuZGxlcik7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9JbnRlcm5hbC9FeHRlbnNpb25EaWFsb2dJbXBsLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IEV4dGVuc2lvbnNJbXBsIH0gZnJvbSAnLi4vSW50ZXJuYWwvRXh0ZW5zaW9uc0ltcGwnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBleHRlcm5hbCBFeHRlbnNpb25zIG5hbWVzcGFjZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpb25zIGltcGxlbWVudHMgQ29udHJhY3QuRXh0ZW5zaW9ucyB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZW5zaW9uSW1wbDogRXh0ZW5zaW9uc0ltcGwpIHtcclxuICAgIHRoaXMuZXh0ZW5zaW9uSW1wbCA9IGV4dGVuc2lvbkltcGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGRhc2hib2FyZENvbnRlbnQoKTogQ29udHJhY3QuRGFzaGJvYXJkQ29udGVudCB7XHJcbiAgICByZXR1cm4gdGhpcy5leHRlbnNpb25JbXBsLmRhc2hib2FyZENvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGVudmlyb25tZW50KCk6IENvbnRyYWN0LkVudmlyb25tZW50IHtcclxuICAgIHJldHVybiB0aGlzLmV4dGVuc2lvbkltcGwuZW52aXJvbm1lbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNldHRpbmdzKCk6IENvbnRyYWN0LlNldHRpbmdzIHtcclxuICAgIHJldHVybiB0aGlzLmV4dGVuc2lvbkltcGwuc2V0dGluZ3M7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHVpKCk6IENvbnRyYWN0LlVJIHtcclxuICAgIHJldHVybiB0aGlzLmV4dGVuc2lvbkltcGwudWk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdGlhbGl6ZUFzeW5jKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5zaW9uSW1wbC5pbml0aWFsaXplQXN5bmMoKTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL05hbWVzcGFjZXMvRXh0ZW5zaW9ucy50c1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=