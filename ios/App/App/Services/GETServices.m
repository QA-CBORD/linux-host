//
//  GETServices.m
//  GET
//
//  Created by Matt Kaufman on 10/18/13.
//  Copyright (c) 2013 CBORD. All rights reserved.
//

#import "GETServices.h"
#import "GETUtilities.h"

@interface GETServices ()

@end

@implementation GETServices

#define HOST_DEV @"services.get.dev.cbord.com"
#define HOST_FEATURE1 @"services.get.feature1.cbord.com"
#define HOST_VV @"services.get.demo.cbord.com"
#define HOST_PROD @"services.get.cbord.com"
#define HOST_PAT @"services.get.pat.cbord.com"

#define PARTNER_DEV @"api.payments.demo.cbord.com"
#define PARTNER_FEATURE1 @"api.payments.demo.cbord.com"
#define PARTNER_VV @"api.partnerpayments.pat.cbord.com"
#define PARTNER_PROD @"api.partnerpayments.cbord.com"
#define PARTNER_PAT @"api.partnerpayments.pat.cbord.com"

#define SERVICES_CONSUMER @"get_mobile"
#define SERVICES_CONSUMER_PWD @"NOTUSED"

#define PROTOCOL @"https"

#define SERVICES_PATH @"/GETServices/services/json"

#define PATRON_URL_HOST_DEV @"get.dev.cbord.com"
#define PATRON_URL_HOST_FEATURE1 @"get.feature1.cbord.com"
#define PATRON_URL_HOST_VV @"get.demo.cbord.com"
#define PATRON_URL_HOST_PROD @"get.cbord.com"
#define PATRON_URL_HOST_PAT @"get.pat.cbord.com"

#define STUDENT_URL_HOST_DEV @"student.dev.cbord.com"
#define STUDENT_URL_HOST_FEATURE1 @"student.feature1.cbord.com"
#define STUDENT_URL_HOST_VV @"student.demo.cbord.com"
#define STUDENT_URL_HOST_PROD @"student.cbord.com"
#define STUDENT_URL_HOST_PAT @"student.pat.cbord.com"

# pragma mark - Initializers

// Designated initializer
- (id)init {
    self = [super init];
    if (self) {
        [self setup];
    }
    
    return self;
}

- (id)initWithServiceName:(NSString *)serviceName {
    self = [super init];
    if (self) {
        [self setup];
        [self setServiceName:serviceName];
    }
    
    return self;
}

- (void)setup {
    // set default values
    _systemDomain = @"";
    _systemUsername = SERVICES_CONSUMER;
    _systemPassword = SERVICES_CONSUMER_PWD;
}

+ (NSString *) protocol {
    return PROTOCOL;
}

+ (NSString *) servicesFullURL {
    NSString *servicesURL = [NSString stringWithFormat:@"%@%@", [GETServices servicesURLHost], [GETServices servicesURLPath]];
    return servicesURL;
}

+ (NSString *) partnerServicesFullURL {
    NSString *servicesURL = [NSString stringWithFormat:@"%@", [GETServices partnerServicesURLHost]];
    return servicesURL;
}

+ (NSString *) servicesURLHost {
    NSString *host;
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString *hostUrl = [defaults objectForKey:@"host_url"];
    BOOL customSetting = [defaults boolForKey:@"custom_setting"];
    
    if(customSetting && hostUrl != nil && ![hostUrl  isEqual: @""])
    {
        host = hostUrl;
    } else {
#ifdef DEVELOPMENT
    host = HOST_DEV;
#elif VENDOR_VALIDATION
    host = HOST_VV;
#else
    host = HOST_PROD;
#endif
    }
    return host;
}

+ (NSString *) partnerServicesURLHost {
    NSString *host;
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString *partnerUrl = [defaults objectForKey:@"partner_url"];
    BOOL customSetting = [defaults boolForKey:@"custom_setting"];
    
    if(customSetting && partnerUrl != nil && ![partnerUrl  isEqual: @""])
    {
        host = partnerUrl;
    } else {
#ifdef DEVELOPMENT
        host = PARTNER_DEV;
#elif VENDOR_VALIDATION
        host = PARTNER_VV;
#else
        host = PARTNER_PROD;
#endif
    }
    return host;
}

+ (NSString *) servicesURLPath {
    NSString *path;
    
#ifdef DEVELOPMENT
    path = SERVICES_PATH;
#elif VENDOR_VALIDATION
    path = SERVICES_PATH;
#else
    path = SERVICES_PATH;
#endif
    
    return path;
}

+ (NSString *) patronURLHost {
    NSString *host;
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    BOOL customSetting = [defaults boolForKey:@"custom_setting"];
    NSString *hostUrl = [defaults objectForKey:@"host_url"];
    
    if(customSetting && hostUrl != nil && ![hostUrl  isEqual: @""])
    {
        if([hostUrl isEqualToString:HOST_DEV]) {
            host = PATRON_URL_HOST_DEV;
        } else if([hostUrl isEqualToString:HOST_FEATURE1]) {
            host = PATRON_URL_HOST_FEATURE1;
        } else if([hostUrl isEqualToString:HOST_VV]) {
            host = PATRON_URL_HOST_VV;
        } else if([hostUrl isEqualToString:HOST_PAT]) {
            host = PATRON_URL_HOST_PAT;
        } else if([hostUrl isEqualToString:HOST_PROD]) {
            host = PATRON_URL_HOST_PROD;
        } else {
            host = PATRON_URL_HOST_PROD;
        }
    } else {
#ifdef DEVELOPMENT
        host = PATRON_URL_HOST_DEV;
#elif VENDOR_VALIDATION
        host = PATRON_URL_HOST_VV;
#else
        host = PATRON_URL_HOST_PROD;
#endif
    }
    return host;
}

+ (NSString *)studentURLHost {
    NSString *host;
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    BOOL customSetting = [defaults boolForKey:@"custom_setting"];
    NSString *hostUrl = [defaults objectForKey:@"host_url"];
    
    if(customSetting && hostUrl != nil && ![hostUrl  isEqual: @""])
    {
        if([hostUrl isEqualToString:HOST_DEV]) {
            host = STUDENT_URL_HOST_DEV;
        } else if([hostUrl isEqualToString:HOST_FEATURE1]) {
            host = STUDENT_URL_HOST_FEATURE1;
        } else if([hostUrl isEqualToString:HOST_VV]) {
            host = STUDENT_URL_HOST_VV;
        } else if([hostUrl isEqualToString:HOST_PAT]) {
            host = STUDENT_URL_HOST_PAT;
        } else if([hostUrl isEqualToString:HOST_PROD]) {
            host = STUDENT_URL_HOST_PROD;
        } else {
            host = STUDENT_URL_HOST_PROD;
        }
    } else {
#ifdef DEVELOPMENT
        host = STUDENT_URL_HOST_DEV;
#elif VENDOR_VALIDATION
        host = STUDENT_URL_HOST_VV;
#else
        host = STUDENT_URL_HOST_PROD;
#endif
    }
    
    host = [NSString stringWithFormat:@"%@://%@", [GETServices protocol], host];
    return host;
}

# pragma properties
- (NSString*)servicesURL {
    _servicesURL = [NSString stringWithFormat:@"%@/%@", [GETServices servicesFullURL], _serviceName];
    return _servicesURL;
}

- (NSString*)partnerServicesURL {
    _servicesURL = [NSString stringWithFormat:@"%@/%@", [GETServices partnerServicesFullURL], _serviceName];
    return _servicesURL;
}

# pragma mark - HTTP Handling

// TODO: Add Network Reachability Manager for checking if GET services are online -- display in UI (at least when down)... check periodically?

- (NSDictionary *)synchronousServiceRequestWithDictionary:(NSDictionary *)requestDict {
    NSDictionary *responseDictionary = nil;
    
    // convert request dictionary to JSON string
    NSString *request;
    NSError *jsonError;
    NSData *requestData = [NSJSONSerialization dataWithJSONObject:requestDict options:NSJSONWritingPrettyPrinted error:&jsonError];
    if (jsonError == nil) {
        // Convert JSON Data into a String
        request = [[NSString alloc] initWithData:requestData encoding:NSUTF8StringEncoding];
    }
    
    NSError* error = nil;
    NSData* data = nil;
    if (request != nil) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;
        });
        NSURL *url = [NSURL URLWithString:self.servicesURL];
        
        #ifdef DEBUG
        NSLog(@"Request URL: %@", url);
        NSLog(@"Request Data: %@", request);
        #endif
        
        NSMutableURLRequest *urlRequest = [NSMutableURLRequest requestWithURL:url];
        [urlRequest addValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
        [urlRequest setHTTPMethod:@"POST"];
        [urlRequest setHTTPBody:[request dataUsingEncoding:NSUTF8StringEncoding]];
        
        NSURLResponse* response;
        data = [self sendSynchronousRequest:urlRequest returningResponse:&response error:&error];
    }
    
    if (error == nil && data != nil) {
        NSError *parseError;
        
        #ifdef DEBUG
        // Log response
        NSLog(@"Response Data: %@", [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding]);
        #endif
        
        // Parse the JSON response. If the response is not vaid JSON, then it will return a parse error and be handled below
        responseDictionary = [NSJSONSerialization
                              JSONObjectWithData:data
                              options:NSJSONReadingMutableContainers + NSJSONReadingAllowFragments
                              error:&parseError];
        
        if (parseError) {
            // convert data to a string and log
            NSString *dataString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];

            // Log parsing error and data converted to a string if possible.
            NSLog(@"Error parsing response: %@ Data: %@", [parseError description], dataString);
            
            // build an error response for the caller
            responseDictionary = @{@"error": @YES, @"response":[parseError description], @"body":dataString};
        }
    } else {
        NSLog(@"Error calling service: %@", [error description]);
        responseDictionary = @{@"error": @YES, @"response":[error description], @"body":@""};
    }
    dispatch_async(dispatch_get_main_queue(), ^{
        [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
    });

    return responseDictionary;
}

- (NSData *)sendSynchronousRequest:(NSURLRequest *)request returningResponse:(NSURLResponse **)response error:(NSError **)error
{
    
    NSError __block *err = NULL;
    NSData __block *data;
    BOOL __block reqProcessed = false;
    NSURLResponse __block *resp;
    
    [[[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:^(NSData * _Nullable _data, NSURLResponse * _Nullable _response, NSError * _Nullable _error) {
        resp = _response;
        err = _error;
        data = _data;
        reqProcessed = true;
    }] resume];
    
    while (!reqProcessed) {
        [NSThread sleepForTimeInterval:0];
    }
    
    *response = resp;
    *error = err;
    return data;
}

- (void)servicePostRequest:(NSString *)postData toService:(NSString *)serviceName withCompletionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {

    if (serviceName) {
        self.serviceName = serviceName;
    }
    NSURL *url = [NSURL URLWithString:self.servicesURL];

    NSURLSessionConfiguration *defaultConfigObject = [NSURLSessionConfiguration defaultSessionConfiguration];
    defaultConfigObject.connectionProxyDictionary = CFBridgingRelease(CFNetworkCopySystemProxySettings());
    
    NSURLSession *defaultSession = [NSURLSession sessionWithConfiguration: defaultConfigObject delegate:nil delegateQueue: [NSOperationQueue mainQueue]];
#ifdef DEBUG
    NSLog(@"Request URL: %@", url);
    NSLog(@"Request Data: %@", postData);
#endif
    NSMutableURLRequest *urlRequest = [NSMutableURLRequest requestWithURL:url];
    [urlRequest addValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [urlRequest setHTTPMethod:@"POST"];
    [urlRequest setHTTPBody:[postData dataUsingEncoding:NSUTF8StringEncoding]];
    
    NSURLSessionDataTask *dataTask =[defaultSession dataTaskWithRequest:urlRequest completionHandler:completionHandler];
    [dataTask resume];
}

//alternate specifying services url
- (void)servicePartnerServicesPostRequest:(NSString *)postData toService:(NSString *)serviceName  withCompletionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {
    
    if (serviceName) {
        self.serviceName = serviceName;
    }
    NSURL *url = [NSURL URLWithString:self.partnerServicesURL];
    
    NSURLSessionConfiguration *defaultConfigObject = [NSURLSessionConfiguration defaultSessionConfiguration];
    defaultConfigObject.connectionProxyDictionary = CFBridgingRelease(CFNetworkCopySystemProxySettings());
    
    NSURLSession *defaultSession = [NSURLSession sessionWithConfiguration: defaultConfigObject delegate:nil delegateQueue: [NSOperationQueue mainQueue]];
#ifdef DEBUG
    NSLog(@"Request URL: %@", url);
    NSLog(@"Request Data: %@", postData);
#endif
    NSMutableURLRequest *urlRequest = [NSMutableURLRequest requestWithURL:url];
    [urlRequest addValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [urlRequest addValue:[[NSUUID UUID] UUIDString] forHTTPHeaderField:@"x-requestId"];
    [urlRequest setHTTPMethod:@"POST"];
    [urlRequest setHTTPBody:[postData dataUsingEncoding:NSUTF8StringEncoding]];
    
    NSURLSessionDataTask *dataTask =[defaultSession dataTaskWithRequest:urlRequest completionHandler:completionHandler];
    [dataTask resume];
}

- (void)sendPostWithRequestDictionary:(NSDictionary *)requestDict withCallback:(void (^)(NSDictionary *))callback {
    NSString *request;
    
    // Convert Dictionary into JSON Data
    NSError *jsonError;

    NSData *requestData = [NSJSONSerialization dataWithJSONObject:requestDict options:NSJSONWritingPrettyPrinted error:&jsonError];
    if (jsonError == nil) {
        // Convert JSON Data into a String
        request = [[NSString alloc] initWithData:requestData encoding:NSUTF8StringEncoding];
        
        if (request != nil) {
            dispatch_async(dispatch_get_main_queue(), ^{
                [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;
                
                [self servicePostRequest:request toService:self.serviceName withCompletionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                    [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
                    [self serviceResponseHandleData:data urlResponse:response error:error withCallback:callback];
                }];
            });
        } else {
            NSLog(@"Error occurred converting JSON NSData to NSString.");
            NSDictionary *responseDictionary = @{@"error": @"true", @"response":@"Error occurred converting JSON NSData to NSString.", @"body":@""};
            callback(responseDictionary);
        }
    } else {
        NSLog(@"Error formatting request data: %@", [jsonError description]);
        NSDictionary *responseDictionary = @{@"error": @"true", @"response":[jsonError description], @"body":@""};
        callback(responseDictionary);
    }
}

//alternate specifying different services url
- (void)sendPostForPartnerServicesWithRequestDictionary:(NSDictionary *)requestDict serviceMethodName:(NSString *)serviceMethodName withCallback:(void (^)(NSDictionary *))callback {
    NSString *request;
    
    // Convert Dictionary into JSON Data
    NSError *jsonError;
    
    NSData *requestData = [NSJSONSerialization dataWithJSONObject:requestDict options:NSJSONWritingPrettyPrinted error:&jsonError];
    if (jsonError == nil) {
        // Convert JSON Data into a String
        request = [[NSString alloc] initWithData:requestData encoding:NSUTF8StringEncoding];
        
        if (request != nil) {
            dispatch_async(dispatch_get_main_queue(), ^{
                [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;
                NSString *url = [NSString stringWithFormat:@"%@%@", self.serviceName, serviceMethodName];
                [self servicePartnerServicesPostRequest:request toService:url withCompletionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                    [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
                    [self serviceResponseHandleData:data urlResponse:response error:error withCallback:callback];
                }];
            });
        } else {
            NSLog(@"Error occurred converting JSON NSData to NSString.");
            NSDictionary *responseDictionary = @{@"error": @"true", @"response":@"Error occurred converting JSON NSData to NSString.", @"body":@""};
            callback(responseDictionary);
        }
    } else {
        NSLog(@"Error formatting request data: %@", [jsonError description]);
        NSDictionary *responseDictionary = @{@"error": @"true", @"response":[jsonError description], @"body":@""};
        callback(responseDictionary);
    }
}

- (void)serviceResponseHandleData:(NSData *)data urlResponse:(NSURLResponse *)response error:(NSError *)error withCallback:(void (^)(NSDictionary *))callback {
    NSDictionary *responseDictionary;
    if (error == nil && data != nil) {
        NSError *parseError;
        
#ifdef DEBUG
        // Log response
        NSLog(@"Response Data: %@", [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding]);
#endif
        
        // Parse the JSON response. If the response is not vaid JSON, then it will return a parse error and be handled below
        responseDictionary = [NSJSONSerialization
                              JSONObjectWithData:data
                              options:NSJSONReadingMutableContainers + NSJSONReadingAllowFragments
                              error:&parseError];

        if (parseError) {
            // convert data to a string and log
            NSString *dataString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
            
            // Log parsing error and data converted to a string if possible.
            NSLog(@"Error parsing response: %@ Data: %@", [parseError description], dataString);
            
            // build an error response for the caller
            responseDictionary = @{@"error": @YES, @"response":[parseError description], @"body":dataString};
        }
    } else if ([error code] == -1001) {
        NSLog(@"Network error calling service: %@", [error description]);
        responseDictionary = @{@"error": @YES, @"response":@"Network Error", @"body":@""};
    } else {
        NSLog(@"Error calling service: %@", [error description]);
        responseDictionary = @{@"error": @YES, @"response":[error description], @"body":[error description]};
    }
    callback(responseDictionary);
}

@end
