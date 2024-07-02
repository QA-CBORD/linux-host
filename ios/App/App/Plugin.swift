//
//  Plugin.swift
//  App
//
//  Modified by Alan Nunez on 4/21/22.
//  Copyright © 2022 CBORD. All rights reserved.

import Foundation
import Capacitor
import PassKit
import SafariServices

@objc(Plugin)
public class Plugin: CAPPlugin, CAPBridgedPlugin {
      
    public let identifier = String(describing: Plugin.self)
    public let jsName = "IOSDevice"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getAppleWalletInfo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "addToAppleWallet", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setEnvironment", returnType: CAPPluginReturnPromise)
    ]
    
    override public func load() {
        NotificationCenter.default.addObserver(self, selector: #selector(self.notifyApplePayResponse(_:)), name: .handleApplePayResponse, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(self.notifyAppleWallet), name: .handleAppleWalletRefresh, object: nil)
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
        UserDefaults.standard.set(false, forKey: "custom_setting")
    }
    
    @objc public func getAppleWalletInfo(_ call: CAPPluginCall) {
        DispatchQueue.global(qos: .utility).async  {
            WatchSessionManager.sharedManager.startSession()
            guard let sessionIdStr = call.getString("sessionId") else {
                return
            }
            let sessionId = sessionIdStr.replacingOccurrences(of: "\"", with: "")
            GETUtilities.sharedInstance()?.appleWalletNetworkCalls(sessionId: sessionId) { _ in
                let userDefaults = UserDefaults.standard
                let iPhoneProvisioned = userDefaults.bool(forKey: "isIphoneInWallet")
                let watchProvisioned = userDefaults.bool(forKey: "isWatchInWallet")
                let watchPaired = userDefaults.bool(forKey: "isWatchPaired")
                let iPhoneCredStatus = userDefaults.value(forKey: "iPhoneCredStatus") as? Int
                let phoneCred = AppleWalletCredentialStatus(rawValue: iPhoneCredStatus ?? 0)
                let watchCredStatus = userDefaults.value(forKey: "watchCredStatus") as? Int
                let watchCred = AppleWalletCredentialStatus(rawValue: watchCredStatus ?? 0)
                let appleWalletEnabled = true
                var isAppleWalletAvailable = true
                let model = UIDevice.current.model
                if !model.hasPrefix("iPhone") {
                    isAppleWalletAvailable = false // Apple Wallet is enabled only for phones, not for iPads
                }
                let isAppleWalletEnabled = appleWalletEnabled && isAppleWalletAvailable
                let canAddPass = phoneCred != AppleWalletCredentialStatus.disabled || (watchCred != AppleWalletCredentialStatus.disabled && watchPaired)
                
                let appleWalletInfo = AppleWalletInfo(iPhoneProvisioned: iPhoneProvisioned,
                                                      watchProvisioned: watchProvisioned,
                                                      watchPaired: watchPaired,
                                                      iPhoneCredStatus: iPhoneCredStatus,
                                                      watchCredStatus: watchCredStatus,
                                                      isAppleWalletEnabled: isAppleWalletEnabled,
                                                      canAddPass: canAddPass)
                
                if let jsonData = try? JSONEncoder().encode(appleWalletInfo) {
                    let json = try? JSONSerialization.jsonObject(with: jsonData, options: .allowFragments) as? [String: Any]
                    call.resolve(json ?? [:])
                } else {
                    call.reject("getAppleWalletInfo: failed to retrieve the data.")
                }
            }
        }
    }
    
    @objc func addToAppleWallet(_ call: CAPPluginCall) {
        let json = call.getString("user")
        guard let jsonData = json?.data(using: .utf8) else {
            return
        }
        let user = try? JSONSerialization.jsonObject(with: jsonData, options: .allowFragments) as? [String: Any]
        if let user = user, let firstname = user["firstName"] as? String, let lastname = user["lastName"] as? String {
            let patronName = "\(firstname) \(lastname)"
            if let paymentRequestConfiguration = PKAddPaymentPassRequestConfiguration(encryptionScheme: PKEncryptionScheme.ECC_V2) {
                var appleWalletReferenceID = ""
                if let refId = UserDefaults.standard.value(forKey: "AppleWalletReferenceId") as? String {
                    appleWalletReferenceID = refId
                }
                paymentRequestConfiguration.cardholderName = patronName
                paymentRequestConfiguration.primaryAccountIdentifier = appleWalletReferenceID
                paymentRequestConfiguration.localizedDescription = patronName
                
                if let paymentPassViewController = PKAddPaymentPassViewController(requestConfiguration: paymentRequestConfiguration, delegate: self.bridge?.viewController) {
                    DispatchQueue.main.async {
                        self.bridge?.viewController?.present(paymentPassViewController, animated: true, completion: nil)
                    }
                }
            }
        }
    }
    /// This function synchronizes the URLs from the Ionic side.
    @objc func setEnvironment(_ call: CAPPluginCall) {
        DispatchQueue.global(qos: .background).async  {
            guard let environmentURL = call.getObject("env"), let partnerURL = environmentURL["partner_services_url"],
                  let fullPath = environmentURL["services_url"] as? String, let index = fullPath.endIndex(of: "com") else {
                return
            }
            
            let serviceURL = String(fullPath[..<index])
            UserDefaults.standard.set(true, forKey: "custom_setting")
            UserDefaults.standard.set(serviceURL, forKey: "host_url")
            UserDefaults.standard.set(partnerURL, forKey: "partner_url")
        }
        call.resolve();
    } 
    
}
