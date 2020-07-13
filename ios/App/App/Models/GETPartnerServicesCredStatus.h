//
//  GETPartnerServicesCredStatus.h
//  GET
//
//  Created by Abhiney Natarajan on 2019-07-11.
//  Copyright © 2019 CBORD. All rights reserved.
//

#import "GETJSONModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface GETPartnerServicesCredStatus : GETJSONModel

@property (strong, nonatomic, nullable) NSNumber *iPhone;
@property (strong, nonatomic, nullable) NSNumber *iWatch;


@end

NS_ASSUME_NONNULL_END
