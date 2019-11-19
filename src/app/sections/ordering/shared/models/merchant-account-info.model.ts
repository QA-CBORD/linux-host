import { UserAccount } from '@core/model/account/account.model';

export interface MerchantAccountInfoList {
	accounts: UserAccount[];
	cashlessAccepted: boolean;
	creditAccepted: boolean;
	rollOver: boolean;
	mealEquivalency: boolean;
}
