//
//  GETUtilities+Ext.swift
//  GET
//
//  Created by Abhiney Natarajan on 2019-02-17.
//  Copyright © 2019 CBORD. All rights reserved.

import Foundation
import PassKit

extension GETUtilities {

    struct  Constants {
        static let iphoneInWallet = "isIphoneInWallet"
        static let watchInWallet = "isWatchInWallet"
        static let iphoneCred = "iPhoneCredStatus"
        static let watchCred = "watchCredStatus"
        static let appleRefId = "AppleWalletReferenceId"
    }
    
    @objc func appleWalletNetworkCalls(sessionId: String, completion: ((Bool) -> Void)?) {
        self.sessionId = sessionId
        let operatingSystemVersion = UIDevice.current.systemVersion
        let deviceModel = UIDevice.modelName
        GETSecurityManager().retrieveAuthorizationBlob(forSessionId: sessionId, deviceModel: deviceModel, withOSVersion: operatingSystemVersion) { (authorizationBlob, exception) in
            GETPartnerManager().activePasses(for: authorizationBlob
                , withCallback: { passes in
                    guard let passes = passes else {
                        completion?(false)
                        return
                    }
                    let userDefaults = UserDefaults.standard
                    userDefaults.set(passes.passes?.iPhone ?? false, forKey: Constants.iphoneInWallet)
                    userDefaults.set(passes.passes?.iWatch ?? false, forKey: Constants.watchInWallet)
                    userDefaults.set(passes.credStatus?.iPhone ?? 0, forKey: Constants.iphoneCred)
                    userDefaults.set(passes.credStatus?.iWatch ?? 0, forKey: Constants.watchCred)
                    userDefaults.set(passes.referenceIdentifier ?? "", forKey: Constants.appleRefId)
                    completion?(true)
            })
        }
    }
    
    @objc func handleAppleWalletSuccess(controller: PKAddPaymentPassViewController, certificates: [Data]?, nonce: Data, nonceSignature: Data, appleCallback : @escaping (PKAddPaymentPassRequest) -> Void, completion: @escaping (Bool) -> Void) {
        let nonceHex = nonce.hexDescription
        let nonceSignatureHex = nonceSignature.hexDescription
        let certificatesArray = certificates?.map { $0.base64EncodedString(options: .lineLength64Characters) }
        let operatingSystemVersion = UIDevice.current.systemVersion
        let deviceModel = UIDevice.modelName
        GETSecurityManager().retrieveAuthorizationBlob(forSessionId: self.sessionId ?? "", deviceModel: deviceModel, withOSVersion: operatingSystemVersion) { [weak self] (authorizationBlob, exception) in
            if self?.isStringValid(authorizationBlob?.clientIdentifier) == true {
                let bundle = WalletProvisioningBundle(authorizationBlob: authorizationBlob,
                                                      action: "prepareProvisioningBundle",
                                                      cardConfigurationIdentifier: "CSGOLD",
                                                      app: nil,
                                                      deviceId: nil,
                                                      nonce: nonceHex,
                                                      nonceSignature: nonceSignatureHex,
                                                      encryptionCertChain: certificatesArray)
                GETPartnerManager().activePasses(for: authorizationBlob, withCallback: { passes in
                    guard let passes = passes, let credStatus = passes.credStatus else {
                        completion(false)
                        return
                    }
                    if credStatus.iPhone?.intValue ?? 0 == AppleWalletCredentialStatus.available.rawValue || (credStatus.iWatch?.intValue ?? 0 == AppleWalletCredentialStatus.available.rawValue && UserDefaults.standard.bool(forKey: "isWatchPaired") == true) {
                        //call provisioning profile service call with partner api
                        GETPartnerManager().prepareProvisioning(for: bundle, withCallback: { response in
                            guard let response = response, let result = response.provisioningBundle , !response.error else {
                                completion(false)
                                return
                            }
                            let paymentRequest = PKAddPaymentPassRequest()
                            //passing dummy activation data
                            paymentRequest.activationData = "dummydata".data(using: .utf8)
                            //Also from Gold once we enable encryption for prepareProvisioningBundle
                            paymentRequest.encryptedPassData = Data(base64Encoded: result.data ?? "")
                            //Will come from Gold once we enable encryption for prepareProvisioningBundle (we can enable encryption in the v0 environment anytime
                            paymentRequest.ephemeralPublicKey = Data(base64Encoded: result.ephemeralPublicKey ?? "")
                            
                            appleCallback(paymentRequest)
                            completion(true)
                        })
                    } else {
                        completion(false)
                        return
                    }
                })
            }
        }
    }
}
