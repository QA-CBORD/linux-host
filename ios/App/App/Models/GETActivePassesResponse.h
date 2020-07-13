//
//  GETActivePassesResponse.h
//  GET
//
//  Created by Abhiney Natarajan on 2019-06-05.
//  Copyright © 2019 CBORD. All rights reserved.
//

#import "GETJSONModel.h"
#import "GETPartnerServicesHeaderResponse.h"
#import "GETParterServicesPassesBundle.h"
#import "GETPartnerServicesCredStatus.h"
NS_ASSUME_NONNULL_BEGIN

@interface GETActivePassesResponse : GETJSONModel

@property (strong, nonatomic, nullable) GETPartnerServicesHeaderResponse *responseHeader;
@property (strong, nonatomic, nullable) GETParterServicesPassesBundle *passes;
@property (strong, nonatomic, nullable) GETPartnerServicesCredStatus *credStatus;
@property (strong, nonatomic, nullable) NSString *referenceIdentifier;

@end

NS_ASSUME_NONNULL_END
