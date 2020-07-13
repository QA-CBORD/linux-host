//  Copyright © 2020 CBORD. All rights reserved.

#import "GETUtilities.h"
#import "GETSecurityManager.h"
#import "GETServices.h"
#import "GETPartnerManager.h"

@implementation GETUtilities

+ (GETUtilities *)sharedInstance {
    static GETUtilities *sharedUtilities = nil;
    static dispatch_once_t onceToken;

    dispatch_once (&onceToken, ^{
      sharedUtilities = [[self alloc] init];
    });
    return sharedUtilities;
}

- (id)init {
    self = [super init];
    return self;
}

- (BOOL)isStringValid:(NSString *)stringToCheck {
    BOOL isStringValid = NO;

    if (stringToCheck && [stringToCheck isKindOfClass:[NSString class]] && stringToCheck != (NSString *)[NSNull null] && stringToCheck.length > 0) {
        isStringValid = YES;
    }
    return isStringValid;
}

@end
