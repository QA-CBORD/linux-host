//
//  GETProvisioningBundle.h
//  GET
//
//  Created by Abhiney Natarajan on 2019-03-22.
//  Copyright © 2019 CBORD. All rights reserved.
//

#import "GETJSONModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface GETProvisioningBundle : GETJSONModel

@property (strong, nonatomic, nullable) NSString *version;
@property (strong, nonatomic, nullable) NSString *ephemeralPublicKey;
@property (strong, nonatomic, nullable) NSString *publicKeyHash;
@property (strong, nonatomic, nullable) NSString *data;

@end

NS_ASSUME_NONNULL_END
