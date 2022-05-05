//
//  Plugin.m
//  App
//
//  Created by Alan Nunez on 5/12/20.
//  Copyright © 2021 CBORD. All rights reserved.

#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(Plugin, "IOSDevice",
            CAP_PLUGIN_METHOD(getAppleWalletInfo, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(addToAppleWallet, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(setEnvironment, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(checkIsConnectedToNetwork, CAPPluginReturnPromise);
           )

