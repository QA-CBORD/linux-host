//
//  GETSecurityManager.h
//  GET
//
//  Created by Chad Juby on 1/10/14.
//  Copyright (c) 2014 CBORD. All rights reserved.
//
//  Modified by Alan Nunez 
//  Copyright © 2020 CBORD. All rights reserved.

#import <Foundation/Foundation.h>
#import "GETAuthorizationBlobResponse.h"

@interface GETSecurityManager : NSObject
- (void)retrieveAuthorizationBlobForSessionId: (NSString *)sessionId deviceModel:(NSString *)deviceModel withOSVersion:(NSString *)deviceOSVersion withCallback:(void (^)(GETAuthorizationBlobResponse *, NSString *))callback;
@end
