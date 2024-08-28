//
//  Notification+Ext.swift
//  App
//
//  Created by Alan Nunez on 6/16/20.
//  Copyright © 2021 CBORD. All rights reserved.

import UIKit

extension Notification.Name {
    static let handleApplePayResponse = Notification.Name("handleApplePayResponse")
    static let handleAppleWalletRefresh = Notification.Name("handleAppleWalletRefresh")
    static let handleSilentPhotoUploadUpdate = Notification.Name("handleSilentPhotoUpdate")
}
