//
//  GETPartnerServicesProvisioningBundle.h
//  GET
//
//  Created by Abhiney Natarajan on 2019-02-23.
//  Copyright © 2019 CBORD. All rights reserved.
//

#import "GETJSONModel.h"
#import "GETAuthorizationBlobResponse.h"

NS_ASSUME_NONNULL_BEGIN

@interface GETPartnerServicesProvisioningBundle : GETJSONModel

@property (strong, nonatomic, nullable) GETAuthorizationBlobResponse *authorizationBlob;
@property (strong, nonatomic, nullable) NSString *nonce;
@property (strong, nonatomic, nullable) NSString *nonceSignature;
@property (strong, nonatomic, nullable) NSString *provisioningBundleIdentifier;
@property (strong, nonatomic, nullable) NSString *cardConfigurationIdentifier;

@end

NS_ASSUME_NONNULL_END
