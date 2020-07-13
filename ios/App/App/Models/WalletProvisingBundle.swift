//
//  WalletProvisioningBundle.swift
//  GET
//
//  Created by Abhiney Natarajan on 2019-02-21.
//  Copyright © 2019 CBORD. All rights reserved.
//

import Foundation

@objcMembers
class WalletProvisioningBundle: NSObject {
    public let authorizationBlob: GETAuthorizationBlobResponse?
    public let action: String?
    public let cardConfigurationIdentifier: String?
    public let app: String?
    public let deviceId: String?
    public let nonce: String?
    public let nonceSignature: String?
    public let encryptionCertChain: [String]?
    
    init(authorizationBlob: GETAuthorizationBlobResponse?, action: String, cardConfigurationIdentifier: String?, app: String?, deviceId: String?, nonce: String?, nonceSignature: String?, encryptionCertChain: [String]?) {
        self.authorizationBlob = authorizationBlob
        self.action = action
        self.cardConfigurationIdentifier = cardConfigurationIdentifier
        self.app = app
        self.deviceId = deviceId
        self.nonceSignature = nonceSignature
        self.nonce = nonce
        self.encryptionCertChain = encryptionCertChain
    }
}
