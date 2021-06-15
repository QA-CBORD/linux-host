export interface MerchantOrderTypesInfo {
  merchantId: string;
  pickup: boolean;
  delivery: boolean;
  dineIn: boolean;
  pickupPrepTime: number; /// 30
  deliveryPrepTime: number; /// 45
  dineInPrepTime: number; /// 30
  pickupInstructions: string;
  deliveryInstructions: string;
  dineInInstructions: string;
  merchantTimeZone: string;
}
