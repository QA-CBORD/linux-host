//
//  GETProvisioningBundleResponse.h
//  GET
//
//  Created by Abhiney Natarajan on 2019-02-23.
//  Copyright © 2019 CBORD. All rights reserved.
//

#import "GETJSONModel.h"
#import "GETPartnerServicesHeaderResponse.h"
#import "GETPartnerServicesProvisioningBundle.h"
#import "GETProvisioningBundle.h"

NS_ASSUME_NONNULL_BEGIN

@interface GETProvisioningBundleResponse : GETJSONModel

@property (strong, nonatomic, nullable) GETPartnerServicesHeaderResponse *responseHeader;
//@property (strong, nonatomic, nullable) GETPartnerServicesProvisioningBundle *data;
@property (strong, nonatomic, nullable) GETProvisioningBundle *provisioningBundle;


@property BOOL error;
@property (strong, nonatomic, nullable) NSString *response;
@property (strong, nonatomic, nullable) NSString *body;

@end

NS_ASSUME_NONNULL_END
