
//  Modified by Alan Nunez on 5/26/20.
//  Copyright © 2021 CBORD. All rights reserved.

import UIKit

extension UIViewController: PKAddPaymentPassViewControllerDelegate {
    public func addPaymentPassViewController(_ controller: PKAddPaymentPassViewController, generateRequestWithCertificateChain certificates: [Data], nonce: Data, nonceSignature: Data, completionHandler handler: @escaping (PKAddPaymentPassRequest) -> Void) {
        GETUtilities.sharedInstance().handleAppleWalletSuccess(controller: controller, certificates: certificates, nonce: nonce, nonceSignature: nonceSignature, appleCallback: handler) { _ in }
    }
    
    public func addPaymentPassViewController(_ controller: PKAddPaymentPassViewController, didFinishAdding pass: PKPaymentPass?, error: Error?) {
        NotificationCenter.default.post(name: .handleAppleWalletRefresh, object: nil)
        controller.dismiss(animated: true, completion: nil)
    }
}
