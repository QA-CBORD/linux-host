//
//  Data+Ext.swift
//  GET
//
//  Created by Abhiney Natarajan on 2019-04-24.
//  Copyright © 2019 CBORD. All rights reserved.

import Foundation

extension Data {
    var hexDescription: String {
        return reduce("") {$0 + String(format: "%02x", $1)}
    }
}
