import { Settings } from 'src/app/app.global';

export enum ReportCardStatus {
  NOT_LOST = 1,
  LOST = 2,
}

export const ReportCardStatusSetting: { [key: number]: string } = {
  [`${ReportCardStatus.LOST}`]: Settings.Setting.REPORT_LOST_CARD_ENABLED,
  [`${ReportCardStatus.NOT_LOST}`]: Settings.Setting.REPORT_FOUND_CARD_ENABLED,
};
