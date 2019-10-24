export interface MerchantAccountInfoList {
	accounts: any[]; // AccountInfo[] ???
	cashlessAccepted: boolean;
	creditAccepted: boolean;
	rollOver: boolean;
	mealEquivalency: boolean;
}