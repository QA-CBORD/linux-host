
export class Environment {

    private static readonly ENV_DEVELOPMENT = "development";
    private static readonly ENV_VENDORVALIDATION = "vendorvalidation";
    private static readonly ENV_PRODUCTION = "production";

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
    public static readonly BASE_AWS_API_URL_DEVTEST = "https://gwaywbf6gl.execute-api.us-east-1.amazonaws.com/dev";


    public static currentEnvironment: string = Environment.ENV_PRODUCTION;

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
     * @param newEnvironment    New environment
     */
    static setEnvironment(newEnvironment: string) {
        Environment.currentEnvironment = newEnvironment;
        if (newEnvironment == Environment.ENV_DEVELOPMENT) {
            console.log('Env Set Dev');
            Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_DEVTEST;
            Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_DEVTEST;
        } else if (newEnvironment == Environment.ENV_VENDORVALIDATION) {
            console.log('Env Set VV');
            Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_VENDORVAL;
            Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_VENDORVAL;
        } else {
            console.log('Env Set Prod');
            Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_PRODUCTION;
            Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_PRODUCTION;
        }
    }

}