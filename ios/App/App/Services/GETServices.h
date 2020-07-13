//
//  GETServices.h
//  GET
//
//  Created by Matt Kaufman on 10/18/13.
//  Copyright (c) 2013 CBORD. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface GETServices : NSObject

@property (strong, nonatomic) NSString *servicesURL;
@property (strong, nonatomic) NSString *serviceName;
@property (strong, nonatomic) NSString *systemDomain;
@property (strong, nonatomic) NSString *systemUsername;
@property (strong, nonatomic) NSString *systemPassword;

+ (NSString *) protocol;
+ (NSString *) servicesFullURL;
+ (NSString *) servicesURLHost;
+ (NSString *) servicesURLPath;
+ (NSString *) patronURLHost;
+ (NSString *) studentURLHost;

// Designated initializer
- (id)initWithServiceName:(NSString *)serviceName;

- (void)servicePostRequest:(NSString *)postData toService:(NSString *)serviceName withCompletionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler;

- (void)sendPostWithRequestDictionary:(NSDictionary *)requestDict withCallback:(void (^)(NSDictionary *))callback;
- (void)sendPostForPartnerServicesWithRequestDictionary:(NSDictionary *)requestDict serviceMethodName:(NSString *)serviceMethodName withCallback:(void (^)(NSDictionary *))callback;

- (void)serviceResponseHandleData:(NSData *)data urlResponse:(NSURLResponse *)response error:(NSError *)error withCallback:(void (^)(NSDictionary *))callback;

@end
