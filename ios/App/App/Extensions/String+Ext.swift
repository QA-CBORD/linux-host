//  StringProtocol+Ext.swift
//  App
//
//  Modified by Alan Nunez on 5/26/20.
//  Copyright © 2021 CBORD. All rights reserved.

import Foundation

extension StringProtocol {
    func endIndex<S: StringProtocol>(of string: S, options: String.CompareOptions = []) -> Index? {
        range(of: string, options: options)?.upperBound
    }
}
