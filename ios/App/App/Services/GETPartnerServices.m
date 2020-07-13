//
//  GETPartnerServices.m
//  GET
//
//  Created by Abhiney Natarajan on 2019-02-21.
//  Copyright © 2019 CBORD. All rights reserved.
//

#import "GETPartnerServices.h"

@implementation GETPartnerServices
#define SERVICE_NAME @"partner/v1/"

- (GETPartnerServices *)init {
    self = [super initWithServiceName:SERVICE_NAME];
    if (self) {
    }
    
    return self;
}

- (void)activePassesFor:(GETAuthorizationBlobResponse *)authorizationBlobResponse withCallback: (void (^) (NSDictionary *))callback {
    NSMutableDictionary *requestDict = [[NSMutableDictionary alloc] init];
    NSMutableDictionary *authorizationBlob = [[NSMutableDictionary alloc] init];
    authorizationBlob[@"patronData"] = authorizationBlobResponse.patronData;
    authorizationBlob[@"signature"] = authorizationBlobResponse.signature;
    authorizationBlob[@"clientIdentifier"] = authorizationBlobResponse.clientIdentifier;
    [requestDict setObject:authorizationBlob forKey:@"authorizationBlob"];
    
    [self sendPostForPartnerServicesWithRequestDictionary:requestDict serviceMethodName:@"activePasses" withCallback:callback];
}


- (void)prepareProvisioningFor:(WalletProvisioningBundle *)bundle withCallback: (void (^) (NSDictionary *))callback {

    NSMutableDictionary *requestDict = [[NSMutableDictionary alloc] init];
    NSMutableDictionary *authorizationBlob = [[NSMutableDictionary alloc] init];
    authorizationBlob[@"patronData"] = bundle.authorizationBlob.patronData;
    authorizationBlob[@"signature"] = bundle.authorizationBlob.signature;
    authorizationBlob[@"clientIdentifier"] = bundle.authorizationBlob.clientIdentifier;
    [requestDict setObject:authorizationBlob forKey:@"authorizationBlob"];
    requestDict[@"action"] = bundle.action;
    requestDict[@"cardConfigurationIdentifier"] = bundle.cardConfigurationIdentifier;
    requestDict[@"app"] = bundle.app;
    requestDict[@"deviceId"] = bundle.deviceId;
    requestDict[@"nonce"] = bundle.nonce;
    requestDict[@"nonceSignature"] = bundle.nonceSignature;
    requestDict[@"encryptionCertChain"] = bundle.encryptionCertChain;

    [self sendPostForPartnerServicesWithRequestDictionary:requestDict serviceMethodName:@"prepareProvisioningBundle" withCallback:callback];
}

@end
