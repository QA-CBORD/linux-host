//
//  GETSecurityServices.m
//  GET
//
//  Created by Chad Juby on 1/7/14.
//  Copyright (c) 2014 CBORD. All rights reserved.
//

#import "GETSecurityServices.h"

@implementation GETSecurityServices

#define SERVICE_NAME @"authentication"

- (GETSecurityServices*)init {
    self = [super initWithServiceName:SERVICE_NAME];
    if (self) {
    }
    
    return self;
}

- (void)retrieveAuthorizationBlobFor:(NSString *)sessionId forDeviceModel:(NSString *)deviceModel withOSVersion:(NSString *)deviceOSVersion withCallback:(void (^) (NSDictionary *))callback {
    NSMutableDictionary *params = [[NSMutableDictionary alloc] init];
    [params setObject:sessionId forKey:@"sessionId"];
    [params setObject:deviceModel forKey:@"deviceModel"];
    [params setObject:deviceOSVersion forKey:@"deviceOSVersion"];
    
    NSMutableDictionary *requestDict = [[NSMutableDictionary alloc] init];
    [requestDict setValue:@"retrieveAuthorizationBlob" forKey:@"method"];
    [requestDict setObject:@"1" forKey:@"version"];
    [requestDict setObject:params forKey:@"params"];
    
    [self sendPostWithRequestDictionary:requestDict withCallback:callback];
}

@end
