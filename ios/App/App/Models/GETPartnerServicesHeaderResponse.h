//
//  GETPartnerServicesHeaderResponse.h
//  GET
//
//  Created by Abhiney Natarajan on 2019-02-23.
//  Copyright © 2019 CBORD. All rights reserved.
//

#import "GETJSONModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface GETPartnerServicesHeaderResponse : GETJSONModel

@property (strong, nonatomic, nullable) NSNumber *statusCode;
@property (strong, nonatomic, nullable) NSNumber *subStatusCode;
@property (strong, nonatomic, nullable) NSString *statusMessage;

@end

NS_ASSUME_NONNULL_END
