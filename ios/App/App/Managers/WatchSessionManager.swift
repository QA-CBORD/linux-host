//
//  WatchSessionManager.swift
//
//  Modified by Alan Nunez on 7/31/20.

import UIKit
import CoreData
import WatchConnectivity

class WatchSessionManager: NSObject, WCSessionDelegate  {
    static let sharedManager = WatchSessionManager()
    private let session = WCSession.default
    
    public func startSession() {
        if WCSession.isSupported() {
            session.delegate = self
            session.activate()
        }
    }
    
    func session(_ session: WCSession,
                 activationDidCompleteWith activationState: WCSessionActivationState,
                 error: Error?) {
        let isWatchPaired = activationState == .activated && session.isPaired
        UserDefaults.standard.set(isWatchPaired, forKey: "isWatchPaired")
    }
    
    func sessionDidBecomeInactive(_ session: WCSession) {
    }
    
    func sessionDidDeactivate(_ session: WCSession) {
    }
}
