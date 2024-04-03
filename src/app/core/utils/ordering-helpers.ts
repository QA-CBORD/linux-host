import { MerchantSettingInfo } from '@sections/ordering';

export enum MerchantSettingTypes {
  JSON = 5,
  NUMERIC = 3,
}

export type MerchantSettingType = boolean;

export function parseBitBasedMerchantSetting(setting: MerchantSettingInfo): MerchantSettingType {
  const merchantSettingTransfromByType = {
    [MerchantSettingTypes.JSON]: JSON.parse,
    [MerchantSettingTypes.NUMERIC]: Boolean,
  };
  const transform = merchantSettingTransfromByType[setting?.contentMediaType];
  if (transform) {
    return transform(setting.value);
  }
  return Boolean(setting?.value);
}
