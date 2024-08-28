//
//  Plugin+Ext.swift
//  App
//
//  Created by Alan Nunez on 6/16/20.
//  Copyright © 2021 CBORD. All rights reserved.

import UIKit

public enum EventType: String {
   case APPLE_PAY = "ApplePayEvent"
   case APPLE_WALLET = "AppleWalletEvent"
   case PHOTO_UPLOAD_UPDATE = "PHOTO_UPLOAD_UPDATE"
}

extension Plugin {
    
    @objc func notifyApplePayResponse(_ notification: Notification) {
        guard let json = notification.userInfo as? [String: Any] else { return }
        self.notifyListeners(EventType.APPLE_PAY.rawValue, data: json, retainUntilConsumed: true)
    }
    
    @objc func notifyAppleWallet() {
        self.notifyListeners(EventType.APPLE_WALLET.rawValue, data: [:], retainUntilConsumed: true)
    }
    
    @objc func notifyPhotoUploadUpdate(_ notification: Notification) {
        guard let json = notification.userInfo as? [String: Any] else { return }
        self.notifyListeners(EventType.PHOTO_UPLOAD_UPDATE.rawValue, data: json, retainUntilConsumed: true)
    }
}
