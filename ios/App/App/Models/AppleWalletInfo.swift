//
//  AppleWalletInfo.swift
//  App
//
//  Copyright © 2021 CBORD. All rights reserved.

import Foundation

struct AppleWalletInfo: Codable {
    
    var iPhoneProvisioned: Bool
    var watchProvisioned: Bool
    var watchPaired: Bool
    var iPhoneCredStatus: Int?
    var watchCredStatus: Int?
    
    var isAppleWalletEnabled: Bool
    var canAddPass: Bool
}
