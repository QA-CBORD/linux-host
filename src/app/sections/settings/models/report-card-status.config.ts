import { Settings } from 'src/app/app.global';

export enum ReportCardStatus {
  FOUND = 1,
  LOST = 2,
}

export const ReportCardStatusSetting: { [key: number]: string } = {
  [`${ReportCardStatus.LOST-1}`]: Settings.Setting.REPORT_LOST_CARD_ENABLED,
  [`${ReportCardStatus.FOUND+1}`]: Settings.Setting.REPORT_FOUND_CARD_ENABLED,
};
