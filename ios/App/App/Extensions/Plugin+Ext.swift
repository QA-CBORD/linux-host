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
}

extension Plugin {
    
    @objc func notifyApplePayResponse(_ notification: Notification) {
        guard let json = notification.userInfo as? [String: Any] else { return }
        self.notifyListeners(EventType.APPLE_PAY.rawValue, data: json, retainUntilConsumed: true)
    }
    
    @objc func notifyAppleWallet() {
        self.notifyListeners(EventType.APPLE_WALLET.rawValue, data: [:], retainUntilConsumed: true)
    }
    
    @objc func notifySilentListeners(_ notification: Notification) {
        guard let json = notification.userInfo as? [String: Any] else { return }
        guard let category = json["category"] as? String, !hasListeners(category) else { return }
        self.notifyListeners(category, data: json, retainUntilConsumed: true)
    }
}
