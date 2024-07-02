//
//  MyViewController.swift
//  App
//
//  Created by Alan Nunez on 7/2/24.
//

import UIKit
import Capacitor

class GETMainViewController: CAPBridgeViewController {
 
    override func capacitorDidLoad() {
       bridge?.registerPluginInstance(Plugin())
    }
}
