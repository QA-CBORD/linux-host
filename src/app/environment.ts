
export class Environment {

    private static readonly ENV_DEVELOPMENT = "development";
    private static readonly ENV_VENDORVALIDATION = "vendorvalidation";
    private static readonly ENV_PRODUCTION = "production";

    public static currentEnvironment: string = Environment.ENV_PRODUCTION;

    public static servicesBaseURL: string = "https://services.get.dev.cbord.com/GETServices/services";
    public static fullSiteBaseURL: string = "http://get.dev.cbord.com/"

    /// Development Env
    public static readonly BASE_SERVICES_URL_DEVTEST = "https://services.get.dev.cbord.com/GETServices/services";
    public static readonly BASE_GET_PATRON_URL_DEVTEST = "http://get.dev.cbord.com";
    public static readonly BASE_CBORD_STUDENT_URL_DEVTEST = "https://student.dev.cbord.com";

    /// Vendor Validation Env
    public static readonly BASE_SERVICES_URL_VENDORVAL = "http://getdemo.cbord.com/GETServices/services";           // Vendor validation
    public static readonly BASE_GET_PATRON_URL_VENDORVAL = "http://get.demo.cbord.com";
    public static readonly BASE_CBORD_STUDENT_URL_VENDORVAL = "https://student.demo.cbord.com";

    // Production Env
    public static readonly BASE_SERVICES_URL_PRODUCTION = "https://services.get.cbord.com/GETServices/services";    // PRODUCTION
    public static readonly BASE_GET_PATRON_URL_PRODUCTION = "https://get.cbord.com";
    public static readonly BASE_CBORD_STUDENT_URL_PRODUCTION = "https://student.cbord.com";


    constructor(){
    }

    public static getServicesBaseURL() : string {
        return Environment.servicesBaseURL;
    }

    /**
     * 
     * @param newEnvironment 
     */
    static setEnvironment(newEnvironment: string){
        Environment.currentEnvironment = newEnvironment;
        if(newEnvironment == Environment.ENV_DEVELOPMENT){
            console.log('Env Set Dev');
            Environment.servicesBaseURL = Environment.BASE_SERVICES_URL_DEVTEST;
            Environment.fullSiteBaseURL = Environment.BASE_CBORD_STUDENT_URL_DEVTEST;
        } else if(newEnvironment == Environment.ENV_VENDORVALIDATION){
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