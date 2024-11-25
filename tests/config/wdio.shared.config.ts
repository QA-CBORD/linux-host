/**
 * All not needed configurations, for this boilerplate, are removed.
 * If you want to know which configuration options you have then you can
 * check https://webdriver.io/docs/configurationfile
 */
export const config: WebdriverIO.Config = {
  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      // project: "tsconfig.wdio.json",
    },
    // tsconfig-paths is only used if "tsConfigPathsOpts" are provided, if you
    // do please make sure "tsconfig-paths" is installed as dependency
    tsConfigPathsOpts: {
      paths: {},
      baseUrl: './',
    },
  },
  baseUrl: process.env.SERVE_PORT
    ? `http://localhost:${process.env.SERVE_PORT}/wd/hub/`
    : 'http://localhost:8085/wd/hub/',
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
  // on a remote machine).
  runner: 'local',
  //
  // ==================
  // Specify Test Files
  // ==================
  //
  specs: ['./tests/**/*.spec.ts'],
  suites: {
    loginHostedStudent: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/app.location-disclousure.spec.ts',
    ],
    loginHostedGuest: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/guest/app.pre-login-as-guest.spec.ts',
      './tests/specs/guest/app.login-guest.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/app.location-disclousure.spec.ts',
    ],
    loginSSOGuest: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.ssoinstitutions.spec.ts',
      './tests/specs/guest/app.pre-login-as-guest.spec.ts',
      './tests/specs/guest/app.login-guest.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/app.location-disclousure.spec.ts',
    ],
    forgotPasswordStudent: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.go-to-forgotpassword.spec.ts',
      './tests/specs/hosted/app.forgotpassword.spec.ts',
      './tests/specs/hosted/app.emailsent.spec.ts',
    ],
    forgotPasswordGuest: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/guest/app.pre-login-as-guest.spec.ts',
      './tests/specs/hosted/app.go-to-forgotpassword.spec.ts',
      './tests/specs/hosted/app.forgotpassword.spec.ts',
      './tests/specs/hosted/app.emailsent.spec.ts',
    ],
    forgotPasswordSSOGuest: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.ssoinstitutions.spec.ts',
      './tests/specs/guest/app.pre-login-as-guest.spec.ts',
      './tests/specs/hosted/app.go-to-forgotpassword.spec.ts',
      './tests/specs/hosted/app.forgotpassword.spec.ts',
      './tests/specs/hosted/app.emailsent.spec.ts',
    ],
    registrationHostedGuest: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/guest/app.pre-login-as-guest.spec.ts',
      './tests/specs/shared/app.signup.spec.ts',
      './tests/specs/shared/app.createaccount.spec.ts',
    ],
    registrationBlockDueIncorrectFields: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/guest/app.pre-login-as-guest.spec.ts',
      './tests/specs/shared/app.signup.spec.ts',
      './tests/specs/shared/app.createaccount-fail.spec.ts',
    ],
    registrationSSOGuest: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.ssoinstitutions.spec.ts',
      './tests/specs/guest/app.pre-login-as-guest.spec.ts',
      './tests/specs/shared/app.signup.spec.ts',
      './tests/specs/shared/app.createaccount.spec.ts',
    ],
    navigationFromDashboard: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/swipe-back-in-dashboard.spec.ts',
    ],
    invalidloginHostedGuest: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/guest/app.pre-login-as-guest.spec.ts',
      './tests/specs/shared/app.invalidlogin.spec.ts',
    ],
    invalidloginHostedStudent: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/shared/app.invalidlogin.spec.ts',
    ],
    settingsFeedbackandSupportHelpGuest: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/guest/app.login-guest.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/app.location-disclousure.spec.ts',
      './tests/specs/shared/app.dashboardsettings.spec.ts',
      './tests/specs/shared/app.settingsfeedbackandsupporthelp.spec.ts',
    ],
    settingsaddeditdeleteaddress: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/guest/app.login-guest.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/app.dashboardsettings.spec.ts',
      './tests/specs/shared/app.settings-addaddress.spec.ts',
      './tests/specs/shared/app.settings-editaddress.spec.ts',
      './tests/specs/shared/app.settings-deleteaddress.spec.ts',
    ],
    settingsuploadphoto: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/app.location-disclousure.spec.ts',
      './tests/specs/shared/go-configuration-through-more.spec.ts',
      './tests/specs/patron/update-photo.spec.ts',
    ],
    checkVersion: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/guest/app.pre-login-as-guest.spec.ts',
      './tests/specs/guest/app.login-guest.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-configuration.spec.ts',
      './tests/specs/shared/settings.spec.ts',
    ],
    reportCardAsLost: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-configuration-through-more.spec.ts',
      './tests/specs/shared/report-card-as-lost.spec.ts',
      './tests/specs/shared/confirm-report-card-as-lost.spec.ts',
    ],
    reportCardAsFound: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-configuration-through-more.spec.ts',
      './tests/specs/shared/report-card-as-found.spec.ts',
      './tests/specs/shared/confirm-report-card-as-found.spec.ts',
    ],
    validatePayments: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-configuration-through-more.spec.ts',
      './tests/specs/shared/verify-payments.spec.ts',
    ],
    removeCreditCards: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-configuration-through-more.spec.ts',
      './tests/specs/shared/verify-payments.spec.ts',
      './tests/specs/shared/delete-credit-cards.spec.ts',
    ],
    addFundsBillFromDashboard: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-to-add-funds-from-dashboard.spec.ts',
      './tests/specs/shared/add-funds-bill.spec.ts',
      './tests/specs/shared/confirm-deposit-funds.spec.ts',
    ],
    addFundsBillFromAccount: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-to-add-funds-from-account.spec.ts',
      './tests/specs/shared/add-funds-bill.spec.ts',
      './tests/specs/shared/confirm-deposit-funds.spec.ts',
    ],
    addFundsCreditCardFromDashboard: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-to-add-funds-from-dashboard.spec.ts',
      './tests/specs/shared/add-funds-credit-card.spec.ts',
      './tests/specs/shared/confirm-deposit-funds.spec.ts',
    ],
    addFundsCreditCardFromAccount: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-to-add-funds-from-account.spec.ts',
      './tests/specs/shared/add-funds-credit-card.spec.ts',
      './tests/specs/shared/confirm-deposit-funds.spec.ts',
    ],
    editPhoneNumber: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-configuration-through-more.spec.ts',
      './tests/specs/shared/change-phone-number.spec.ts',
    ],
    editEmail: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-configuration-through-more.spec.ts',
      './tests/specs/shared/change-email.spec.ts',
    ],
    goToAccountsThroughTile: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-to-accounts-through-tile.spec.ts',
    ],
    goToAccountsThroughTab: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-to-accounts-through-tab.spec.ts',
    ],
    fulfillLowBalanceAutoDeposit: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-to-accounts-through-tab.spec.ts',
      './tests/specs/shared/fulfill-low-balance-auto-deposit.spec.ts',
    ],
    fulfillTimeBasedWeeklyAutoDeposit: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-to-accounts-through-tab.spec.ts',
      './tests/specs/shared/fulfill-time-based-weekly-auto-deposit.spec.ts',
    ],
    fulfillTimeBasedMonthlyAutoDeposit: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-to-accounts-through-tab.spec.ts',
      './tests/specs/shared/fulfill-time-based-monthly-auto-deposit.spec.ts',
    ],
    setAutoDepositOption: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-to-accounts-through-tab.spec.ts',
      './tests/specs/shared/auto-deposit.spec.ts',
    ],
    changePIN: [
      './tests/specs/shared/app.entry.spec.ts',
      './tests/specs/shared/app.institutions.spec.ts',
      './tests/specs/hosted/app.pre-login.spec.ts',
      './tests/specs/hosted/app.login.spec.ts',
      './tests/specs/shared/app.create-and-confirm-pin.spec.ts',
      './tests/specs/shared/go-configuration-through-more.spec.ts',
      './tests/specs/shared/change-pin.spec.ts',
    ],
  },
  //
  // ============
  // Capabilities
  // ============
  // The capabilities are specified in:
  // - wdio.android.config.ts
  // - wdio.ios.config.ts
  // - wdio.web.config.ts
  //
  capabilities: [],
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'error',
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/applitools-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  // baseUrl: 'https://localhost',
  // Default timeout for all waitFor* commands.
  /**
   * NOTE: This has been increased for more stable Appium Native app
   * tests because they can take a bit longer.
   */
  waitforTimeout: 45000,
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  // Default request retries count
  connectionRetryCount: 3,
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  //
  // Services are empty here but will be defined in the
  // - wdio.shared.appium.config.ts
  // - wdio.web.config.ts
  // configuration files
  services: [],
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'mocha',
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter
  reporters: ['spec', ['allure', {
    outputDir: 'report/allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false,
    disableMochaHooks: true
}]],
  // Options to be passed to Jasmine.
  mochaOpts: {
    // Jasmine default timeout
    /**
     * NOTE: This has been increased for more stable Appium Native app
     * tests because they can take a bit longer.
     */   
    ui: 'bdd',
    retries: 1,
    timeout: 1200000,
  },

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  //
  /**
   * NOTE: No Hooks are used in this project, but feel free to add them if you need them.
   */
};
