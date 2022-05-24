import { Settings } from '../../app.global';

export const getSettingInfoObject = (setting: Settings.Setting | Settings.SettingList): any => {
  const settingName = setting.toString().split('.');
  let result = { domain: settingName[0], category: settingName[1] };
  result['name'] = settingName.length > 2 ? settingName[2] : undefined;
  return result;
};

export const getSettingInfoObjectArray = (settings: Settings.Setting[]): any => {
  return settings.map(setting => getSettingInfoObject(setting));
};

export const getSettingName = (setting: Settings.Setting): string => {
  if(!setting) return 'huh?';
  return setting.toString().split('.')[2];
};

