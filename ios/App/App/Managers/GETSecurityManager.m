//
//  GETSecurityManager.m
//  GET
//
//  Created by Chad Juby on 1/10/14.
//  Copyright (c) 2014 CBORD. All rights reserved.
//
//  Modified by Alan Nunez
//  Copyright © 2020 CBORD. All rights reserved.

#import "GETSecurityManager.h"
#import "GETSecurityServices.h"

@interface GETSecurityManager ()
@end

@implementation GETSecurityManager

- (void)retrieveAuthorizationBlobForSessionId: (NSString *)sessionId deviceModel:(NSString *)deviceModel withOSVersion:(NSString *)deviceOSVersion withCallback:(void (^)(GETAuthorizationBlobResponse *, NSString *))callback {
    
    GETSecurityServices *securityServices = [[GETSecurityServices alloc] init];
    [securityServices retrieveAuthorizationBlobFor:sessionId forDeviceModel:deviceModel withOSVersion:deviceOSVersion withCallback:^(NSDictionary *response) {
        if (response) {
            if ([response valueForKey:@"exception"] != [NSNull null]) {
                NSLog(@"Exception returned from retrieveAuthorizationBlobFor: %@", [response valueForKey:@"exception"]);
                callback(nil, [response valueForKey:@"exception"]);
            } else {
                NSError * err;
                NSData * jsonData = [NSJSONSerialization dataWithJSONObject:[response objectForKey:@"response"] options:0 error:&err];
                NSString * responseString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
                
                GETAuthorizationBlobResponse *authorizationBlob  = [[GETAuthorizationBlobResponse alloc] initWithString:responseString error:&err];
                callback(authorizationBlob, nil);
                
            }
        } else {
            // TODO: handle no response from service call
            callback(nil, nil);
        }
    }];
}

@end
