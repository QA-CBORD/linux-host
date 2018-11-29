

export enum EnvType {
    development,
    vendorvalidation,
    production
}

export class Environment {

    /// GET Development
    public static readonly BASE_SERVICES_URL_DEVTEST = "https://services.get.dev.cbord.com/GETServices/services";
    public static readonly BASE_GET_PATRON_URL_DEVTEST = "http://get.dev.cbord.com";

    /// GET Vendor Validation
    public static readonly BASE_SERVICES_URL_VENDORVAL = "http://getdemo.cbord.com/GETServices/services";           // Vendor validation
    public static readonly BASE_GET_PATRON_URL_VENDORVAL = "http://get.demo.cbord.com";

    // GET Production
    public static readonly BASE_SERVICES_URL_PRODUCTION = "https://services.get.cbord.com/GETServices/services";    // PRODUCTION
    public static readonly BASE_GET_PATRON_URL_PRODUCTION = "https://get.cbord.com";


    /// CBORD Student Development
    public static readonly BASE_CBORD_STUDENT_URL_DEVTEST = "https://student.dev.cbord.com";

    /// CBORD Student Vendor Validation
    public static readonly BASE_CBORD_STUDENT_URL_VENDORVAL = "https://student.demo.cbord.com";

    /// CBORD Student Production
    public static readonly BASE_CBORD_STUDENT_URL_PRODUCTION = "https://student.cbord.com";


    /// AWS API Gateway Development
    public static readonly BASE_AWS_API_URL_DEVTEST = "https://dwptofebk7.execute-api.us-east-1.amazonaws.com/dev";


    public static currentEnvironment: EnvType = EnvType.development;

    public static servicesBaseURL: string = Environment.BASE_SERVICES_URL_DEVTEST;
    public static fullSiteBaseURL: string = Environment.BASE_GET_PATRON_URL_DEVTEST;

    public static apiGatewayServiceBaseURL: string = Environment.BASE_AWS_API_URL_DEVTEST;


    constructor() {
    }

    /**
     *  Get the GET current services URL
     */
    public static getGETServicesBaseURL(): string {
        return Environment.servicesBaseURL;
    }

    /**
     *  Get the AWS API Gateway current services URL 
     */
    public static getAPIGatewayServicesBaseURL(): string {
        return Environment.apiGatewayServiceBaseURL;
    }

    /**
     * Set the current environment
     * 
     * @param newEnvironment    New environment enum value
     */
    static setEnvironment(newEnvironment: EnvType) {
        Environment.currentEnvironment = newEnvironment;
        if (newEnvironment == EnvType.development) {
            console.log('Env Set Dev');
            Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_DEVTEST;
            Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_DEVTEST;
        } else if (newEnvironment == EnvType.vendorvalidation) {
            console.log('Env Set VV');
            Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_VENDORVAL;
            Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_VENDORVAL;
        } else if (newEnvironment == EnvType.production) {
            console.log('Env Set Prod');
            Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_PRODUCTION;
            Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_PRODUCTION;
        } else {
            /// will never happen due to enum restrictions
            console.log('Env Set Dev due to error');
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
        if (appBaseURL.includes("dev")) {
            console.log('Env Set Dev');
            Environment.currentEnvironment = EnvType.development;
            Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_DEVTEST;
            Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_DEVTEST;
        } else if (appBaseURL.includes("demo")) {
            console.log('Env Set VV');
            Environment.currentEnvironment = EnvType.vendorvalidation;
            Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_VENDORVAL;
            Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_VENDORVAL;
        } else if (appBaseURL.includes("student.cbord")){
            console.log('Env Set Prod');
            Environment.currentEnvironment = EnvType.production;
            Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_PRODUCTION;
            Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_PRODUCTION;
        } else {
            Environment.currentEnvironment = EnvType.development;
            console.error('Env Set Dev due to local testing or invalid url');
            Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_DEVTEST;
            Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_DEVTEST;
        }
    }



}