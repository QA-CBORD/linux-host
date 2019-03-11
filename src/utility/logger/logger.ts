
export class Logger {

    static LOGGING_ENABLED: boolean = false;

    public static setLoggingEnabled(loggingEnabled: boolean){
        Logger.LOGGING_ENABLED = loggingEnabled;
    }

    public static log(logLevel: string, logMessage: string, logObject?: any) {

        if (Logger.LOGGING_ENABLED == false) {
            return;
        }

        let finalLogMessage = logMessage;
        if (logObject != null) {
            logMessage = logMessage + " | " + JSON.stringify(logObject);
        }

        switch (logLevel) {
            case "e":
                console.error(finalLogMessage);
                break;
            default:
                console.log(finalLogMessage);
        }
    }

}