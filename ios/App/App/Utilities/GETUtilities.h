//  Copyright © 2021 CBORD. All rights reserved.

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import <PassKit/PassKit.h>

typedef NS_ENUM (NSInteger, AppleWalletCredentialStatus) {
    AppleWalletCredentialStatusDisabled = 0,
    AppleWalletCredentialStatusAvailable = 1,
    AppleWalletCredentialStatusSuspendRequested = 4,
    AppleWalletCredentialStatusSuspended = 5,
    AppleWalletCredentialStatusUnlinkRequested = 6,
    AppleWalletCredentialStatusUnlinkDisableRequested = 7,
    AppleWalletCredentialStatusResumeRequested = 8,
    AppleWalletCredentialStatusActive = 20
};

@interface GETUtilities: NSObject

+ (GETUtilities *)sharedInstance;

- (BOOL)isStringValid:(NSString *)stringToCheck;

@property (strong, nonatomic, nullable) NSString *sessionId;

@end
