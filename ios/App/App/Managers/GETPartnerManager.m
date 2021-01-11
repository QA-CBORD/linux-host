//
//  GETSecurityManager.h
//  GET
//
//  Created by Chad Juby on 1/10/14.
//  Copyright (c) 2014 CBORD. All rights reserved.
//
//  Modified by Alan Nunez
//  Copyright © 2021 CBORD. All rights reserved.

#import <Foundation/Foundation.h>
#import "GETPartnerManager.h"
#import "GETPartnerServices.h"

@interface GETPartnerManager ()
@end

@implementation GETPartnerManager: NSObject

- (void)activePassesFor:(GETAuthorizationBlobResponse *)authorizationBlobResponse withCallback:(void (^)(GETActivePassesResponse *))callback {
    GETPartnerServices *partnerServices = [[GETPartnerServices alloc] init];
    [partnerServices activePassesFor:authorizationBlobResponse withCallback:^(NSDictionary *response) {
        if (response && ![response isEqual:@""]) {
            NSError * err;
            NSData * jsonData = [NSJSONSerialization dataWithJSONObject:response options:NSJSONWritingPrettyPrinted error:&err];
            NSString * responseString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
            
            GETActivePassesResponse *activePasses  = [[GETActivePassesResponse alloc] initWithString:responseString error:&err];
            callback(activePasses);
        } else {
            callback(nil);
        }
    }];
}

- (void)prepareProvisioningFor:(WalletProvisioningBundle *)bundle withCallback:(void (^)(GETProvisioningBundleResponse *))callback {
    GETPartnerServices *partnerServices = [[GETPartnerServices alloc] init];
    [partnerServices prepareProvisioningFor:bundle withCallback:^(NSDictionary *response) {
        if (response && ![response isEqual:@""]) {
            NSError * err;
            NSData * jsonData = [NSJSONSerialization dataWithJSONObject:response options:NSJSONWritingPrettyPrinted error:&err];
            NSString * responseString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
            
            GETProvisioningBundleResponse *provisioningBundle  = [[GETProvisioningBundleResponse alloc] initWithString:responseString error:&err];
            callback(provisioningBundle);
        } else {
            callback(nil);
        }
    }];
}
@end
