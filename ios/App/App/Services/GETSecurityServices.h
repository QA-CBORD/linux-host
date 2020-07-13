//
//  GETSecurityServices.h
//  GET
//
//  Created by Chad Juby on 1/7/14.
//  Copyright (c) 2014 CBORD. All rights reserved.
//

#import "GETServices.h"

@interface GETSecurityServices : GETServices

- (void)retrieveAuthorizationBlobFor:(NSString *)sessionId forDeviceModel:(NSString *)deviceModel withOSVersion:(NSString *)deviceOSVersion withCallback:(void (^) (NSDictionary *))callback;
@end
