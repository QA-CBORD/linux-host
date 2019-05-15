export enum EnvType {
  development,
  qa,
  pat,
  demo,
  production,
}

export class Environment {
  /// GET Development
  static readonly BASE_SERVICES_URL_DEV = 'https://services.get.dev.cbord.com/GETServices/services';
  static readonly BASE_GET_PATRON_URL_DEV = 'http://get.dev.cbord.com';
  /// GET Quality Assurance
  static readonly BASE_SERVICES_URL_QA = 'https://services.get.qa.cbord.com/GETServices/services';
  static readonly BASE_GET_PATRON_URL_QA = 'http://get.qa.cbord.com';
  /// GET Partner Acceptance Testing
  static readonly BASE_SERVICES_URL_PAT = 'https://services.get.pat.cbord.com/GETServices/services';
  static readonly BASE_GET_PATRON_URL_PAT = 'http://get.pat.cbord.com';
  /// GET Demo
  static readonly BASE_SERVICES_URL_DEMO = 'https://services.get.demo.cbord.com/GETServices/services'; // Vendor validation
  static readonly BASE_GET_PATRON_URL_DEMO = 'https://get.demo.cbord.com';
  // GET Production
  static readonly BASE_SERVICES_URL_PROD = 'https://services.get.cbord.com/GETServices/services'; // PRODUCTION
  static readonly BASE_GET_PATRON_URL_PRODUCTION = 'https://get.cbord.com';

  /// CBORD Student Development
  static readonly BASE_CBORD_STUDENT_URL_DEV = 'https://student.dev.cbord.com';
  /// CBORD Student Quality Assurance
  static readonly BASE_CBORD_STUDENT_URL_QA = 'https://student.qa.cbord.com';
  /// CBORD Student Partner Acceptance Testing
  static readonly BASE_CBORD_STUDENT_URL_PAT = 'https://student.pat.cbord.com';
  /// CBORD Student Vendor Validation
  static readonly BASE_CBORD_STUDENT_URL_DEMO = 'https://student.demo.cbord.com';
  /// CBORD Student Production
  static readonly BASE_CBORD_STUDENT_URL_PROD = 'https://student.cbord.com';

  /// AWS API Gateway Development
  static readonly BASE_AWS_API_URL_DEV = 'https://secmsg.api.dev.cbord.com';
  /// AWS API Gateway Quality Assurance
  static readonly BASE_AWS_API_URL_QA = 'https://secmsg.api.qa.cbord.com';
  /// AWS API Gateway Partner Acceptance Testing
  static readonly BASE_AWS_API_URL_PAT = 'https://secmsg.api.pat.cbord.com';
  /// AWS API Gateway Demo
  static readonly BASE_AWS_API_URL_DEMO = 'https://secmsg.api.demo.cbord.com';
  /// AWS API Gateway Prod
  static readonly BASE_AWS_API_URL_PROD = 'https://secmsg.api.cbord.com';

  static currentEnvironment: EnvType = EnvType.development;

  static servicesBaseURL: string = Environment.BASE_SERVICES_URL_DEV;
  static fullSiteBaseURL: string = Environment.BASE_GET_PATRON_URL_DEV;

  static apiGatewayServiceBaseURL: string = Environment.BASE_AWS_API_URL_DEV;

  constructor() {}

  /**
   *  Get the GET current services URL
   */
  static getGETServicesBaseURL(): string {
    return Environment.servicesBaseURL;
  }

  /**
   *  Get the AWS API Gateway current services URL
   */
  static getAPIGatewayServicesBaseURL(): string {
    return Environment.apiGatewayServiceBaseURL;
  }

  /**
   * Set the current environment
   *
   * @param newEnvironment    New environment enum value
   */
  static setEnvironment(newEnvironment: EnvType) {
    Environment.currentEnvironment = newEnvironment;
    if (newEnvironment === EnvType.development) {
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_DEV;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_DEV;
      Environment.apiGatewayServiceBaseURL = Environment.BASE_AWS_API_URL_DEV;
    } else if (newEnvironment === EnvType.qa) {
      Environment.currentEnvironment = EnvType.qa;
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_QA;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_QA;
      Environment.apiGatewayServiceBaseURL = Environment.BASE_AWS_API_URL_QA;
    } else if (newEnvironment === EnvType.pat) {
      Environment.currentEnvironment = EnvType.pat;
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_PAT;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_PAT;
      Environment.apiGatewayServiceBaseURL = Environment.BASE_AWS_API_URL_PAT;
    } else if (newEnvironment === EnvType.demo) {
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_DEMO;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_DEMO;
      Environment.apiGatewayServiceBaseURL = Environment.BASE_AWS_API_URL_DEMO;
    } else if (newEnvironment === EnvType.production) {
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_PROD;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_PROD;
      Environment.apiGatewayServiceBaseURL = Environment.BASE_AWS_API_URL_PROD;
    } else {
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_DEV;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_DEV;
      Environment.apiGatewayServiceBaseURL = Environment.BASE_AWS_API_URL_DEV;
    }
  }

  /**
   * Set the current environment using the app/page URL
   *
   * @param appBaseURL    App / Page URL
   */
  static setEnvironmentViaURL(appBaseURL: string) {
    if (appBaseURL.includes('dev')) {
      this.setEnvironment(EnvType.development);
    } else if (appBaseURL.includes('qa')) {
      this.setEnvironment(EnvType.qa);
    } else if (appBaseURL.includes('pat')) {
      this.setEnvironment(EnvType.pat);
    } else if (appBaseURL.includes('demo')) {
      this.setEnvironment(EnvType.demo);
    } else if (appBaseURL.includes('student.cbord')) {
      this.setEnvironment(EnvType.production);
    } else {
      this.setEnvironment(EnvType.development);
    }
  }

  static isDevelopmentEnvironment(appBaseURL: string): boolean {
    if (appBaseURL.includes('dev') || appBaseURL.includes('localhost')) {
      return true;
    }
    return false;
  }
}
