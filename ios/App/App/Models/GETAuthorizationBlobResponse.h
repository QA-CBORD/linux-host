//
//  GETAuhtorizationBlobResponse.h
//  GET
//
//  Created by Abhiney Natarajan on 2019-02-22.
//  Copyright © 2019 CBORD. All rights reserved.
//
#import "GETJSONModel.h"

@interface GETAuthorizationBlobResponse: GETJSONModel

@property (strong, nonatomic, nullable) NSString *patronData;
@property (strong, nonatomic, nullable) NSString *clientIdentifier;
@property (strong, nonatomic, nullable) NSString *signature;

@end
