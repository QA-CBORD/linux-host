export interface NativeStartupInfo {
  showMessage: number; 					/// 1|0 - show message to user
  minSupportedVersionFailure: number; 	/// 1|0 - app does not meet min supported version, tell user to update
  message: string; 					/// message to display to user
  messageTitle: string; 				/// message title
  messageDigest: string; 			/// message version
  showOnce: number; 					/// only show message one time (use messageDigest)
  action: string ; 					/// 'none' - no action | 'store' - ? | 'block' - block user from proceding
  minSupportedVersion: string; 		/// minimum app supported version
  enableOfflineBarcodeGeneration: string;
}
