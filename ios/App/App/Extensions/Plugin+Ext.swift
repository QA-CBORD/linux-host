//
//  Plugin+Ext.swift
//  App
//
//  Created by Alan Nunez on 6/16/20.
//  Copyright © 2020 CBORD. All rights reserved.

import UIKit

extension Plugin {
    
    @objc func notifyApplePayResponse(_ notification: Notification) {
        guard let json = notification.userInfo as? [String: Any] else { return }
        self.notifyListeners("ApplePayEvent", data: json, retainUntilConsumed: true)
    }
    
    @objc func notifyAppleWallet() {
        self.notifyListeners("AppleWalletEvent", data: [:], retainUntilConsumed: true)
    }
}
