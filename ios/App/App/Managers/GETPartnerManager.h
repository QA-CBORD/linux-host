//
//  GETPartnerManager.h
//  GET
//
//  Created by Abhiney Natarajan on 2019-02-22.
//  Copyright © 2019 CBORD. All rights reserved.
//
//  Modified by Alan Nunez
//  Copyright © 2020 CBORD. All rights reserved.

#import <Foundation/Foundation.h>
#import "GETProvisioningBundleResponse.h"
#import "GETActivePassesResponse.h"

@class WalletProvisioningBundle;
@interface GETPartnerManager : NSObject

- (void)activePassesFor:(GETAuthorizationBlobResponse *)authorizationBlobResponse withCallback:(void (^)(GETActivePassesResponse *))callback;
- (void)prepareProvisioningFor:(WalletProvisioningBundle *)bundle withCallback:(void (^)(GETProvisioningBundleResponse *))callback;

@end
