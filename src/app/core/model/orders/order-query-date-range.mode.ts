import { ORDERING_STATUS } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';

export interface QueryOrderDateRange {
  sessionId?: string;
  institutionId?: string;
  userId?: string;
  merchantId?: string;
  orderStatuses?: ORDERING_STATUS[];
  startDate?: string;
  endDate?: string;
  maxReturn?: number;
}
