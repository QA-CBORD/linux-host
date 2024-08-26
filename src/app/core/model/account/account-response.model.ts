import { UserAccount } from './account.model';

export interface AccountResponse {
  accounts: UserAccount[];
  planName: string;
}
