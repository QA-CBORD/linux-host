//
//  GETPartnerServices.h
//  GET
//
//  Created by Abhiney Natarajan on 2019-02-21.
//  Copyright © 2019 CBORD. All rights reserved.
//

#import "GETServices.h"
#import "GETAuthorizationBlobResponse.h"
#import "GET__x2009_Mobile-Swift.h"

@interface GETPartnerServices: GETServices

- (void)activePassesFor:(GETAuthorizationBlobResponse *)authorizationBlobResponse withCallback: (void (^) (NSDictionary *))callback;
- (void)prepareProvisioningFor:(WalletProvisioningBundle *)bundle withCallback: (void (^) (NSDictionary *))callback;
@end
