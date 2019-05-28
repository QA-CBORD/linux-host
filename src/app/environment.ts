export enum EnvType {
  development,
  vendorvalidation,
  production,
}

export class Environment {
  /// GET Development
  static readonly BASE_SERVICES_URL_DEVTEST = 'https://services.get.dev.cbord.com/GETServices/services';
  static readonly BASE_GET_PATRON_URL_DEVTEST = 'http://get.dev.cbord.com';

  /// GET Vendor Validation
  static readonly BASE_SERVICES_URL_VENDORVAL = 'http://getdemo.cbord.com/GETServices/services'; // Vendor validation
  static readonly BASE_GET_PATRON_URL_VENDORVAL = 'http://get.demo.cbord.com';

  // GET Production
  static readonly BASE_SERVICES_URL_PRODUCTION = 'https://services.get.cbord.com/GETServices/services'; // PRODUCTION
  static readonly BASE_GET_PATRON_URL_PRODUCTION = 'https://get.cbord.com';

  /// CBORD Student Development
  static readonly BASE_CBORD_STUDENT_URL_DEVTEST = 'https://student.dev.cbord.com';

  /// CBORD Student Vendor Validation
  static readonly BASE_CBORD_STUDENT_URL_VENDORVAL = 'https://student.demo.cbord.com';

  /// CBORD Student Production
  static readonly BASE_CBORD_STUDENT_URL_PRODUCTION = 'https://student.cbord.com';

  /// AWS API Gateway Development
  static readonly BASE_AWS_API_URL_DEVTEST = 'https://dwptofebk7.execute-api.us-east-1.amazonaws.com/dev';

  static currentEnvironment: EnvType = EnvType.development;

  static servicesBaseURL: string = Environment.BASE_SERVICES_URL_DEVTEST;
  static fullSiteBaseURL: string = Environment.BASE_GET_PATRON_URL_DEVTEST;

  static apiGatewayServiceBaseURL: string = Environment.BASE_AWS_API_URL_DEVTEST;

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
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_DEVTEST;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_DEVTEST;
    } else if (newEnvironment === EnvType.vendorvalidation) {
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_VENDORVAL;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_VENDORVAL;
    } else if (newEnvironment === EnvType.production) {
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_PRODUCTION;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_PRODUCTION;
    } else {
      // will never happen due to enum restrictions
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_DEVTEST;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_DEVTEST;
    }
  }

  /**
   * Set the current environment using the app/page URL
   *
   * @param appBaseURL    App / Page URL
   */
  static setEnvironmentViaURL(appBaseURL: string) {
    if (appBaseURL.includes('dev')) {
      Environment.currentEnvironment = EnvType.development;
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_DEVTEST;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_DEVTEST;
    } else if (appBaseURL.includes('demo')) {
      Environment.currentEnvironment = EnvType.vendorvalidation;
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_VENDORVAL;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_VENDORVAL;
    } else if (appBaseURL.includes('student.cbord')) {
      Environment.currentEnvironment = EnvType.production;
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_PRODUCTION;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_PRODUCTION;
    } else {
      Environment.currentEnvironment = EnvType.development;
      Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_DEVTEST;
      Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_DEVTEST;
    }
  }

  static isDevelopmentEnvironment(appBaseURL: string): boolean {
    return appBaseURL.includes('dev') || appBaseURL.includes('localhost');
  }
}
