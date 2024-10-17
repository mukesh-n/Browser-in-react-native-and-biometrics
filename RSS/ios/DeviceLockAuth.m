#import "DeviceLockAuth.h"
#import <LocalAuthentication/LocalAuthentication.h>

@implementation DeviceLockAuth

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(authenticate:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  LAContext *context = [[LAContext alloc] init];
  NSError *error = nil;

  if ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthentication error:&error]) {
    [context evaluatePolicy:LAPolicyDeviceOwnerAuthentication
            localizedReason:@"Authenticate to access the app"
                      reply:^(BOOL success, NSError *error) {
      if (success) {
        resolve(@(YES));
      } else {
        reject(@"authentication_failed", @"Device lock authentication failed", error);
      }
    }];
  } else {
    reject(@"authentication_not_available", @"Device lock authentication is not available", error);
  }
}

@end
