//
//  MyViewController.swift
//  App
//
//  Created by Alan Nunez on 7/2/24.
//

import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
       bridge?.registerPluginInstance(Plugin())
    }
}
