#import "GETJSONModel.h"

@implementation GETJSONModel

/**
 @abstract Makes all properties optional
 */
+ (BOOL)propertyIsOptional:(NSString *)propertyName {
    return YES;
}

+(JSONKeyMapper *)keyMapper {
    return [[JSONKeyMapper alloc] initWithModelToJSONDictionary:@{ @"GETDescription" : @"description", @"GETId" : @"id" }];
}

@end
