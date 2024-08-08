import { getSectionsFromEnabledSettings } from './guest-dashboard.resolver';
import { GuestDashboardSection } from '../dashboard/model/dashboard.item.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';

// Mock data
const mockGuestDashboardSections: GuestDashboardSection[] = [
  { id: 'feature1', title: 'Feature 1' },
  { id: 'feature2', title: 'Feature 2' },
  { id: 'deposit1', title: 'Deposit 1' },
] as GuestDashboardSection[];

describe('getSectionsFromEnabledSettings', () => {
  it('should return sections based on enabled settings', () => {
    const mockSettings: SettingInfo[] = [
      { name: 'feature1', value: '1' },
      { name: 'feature2', value: '0' },
      { name: 'deposit1', value: '1' },
    ];

    const result = getSectionsFromEnabledSettings(mockSettings, mockGuestDashboardSections);

    expect(result).toEqual([
      { id: 'feature1', title: 'Feature 1' },
      { id: 'deposit1', title: 'Deposit 1' },
    ]);
  });

  it('should return an empty array if no settings are enabled', () => {
    const mockSettings: SettingInfo[] = [
      { name: 'feature1', value: '0' },
      { name: 'feature2', value: '0' },
      { name: 'deposit1', value: '0' },
    ];

    const result = getSectionsFromEnabledSettings(mockSettings, mockGuestDashboardSections);

    expect(result).toEqual([]);
  });

  it('should return an empty array if settings list is empty', () => {
    const mockSettings: SettingInfo[] = [];

    const result = getSectionsFromEnabledSettings(mockSettings, mockGuestDashboardSections);

    expect(result).toEqual([]);
  });

  it('should handle settings with non-numeric values gracefully', () => {
    const mockSettings: SettingInfo[] = [
      { name: 'feature1', value: 'true' },
      { name: 'feature2', value: 'false' },
      { name: 'deposit1', value: '1' },
    ];

    const result = getSectionsFromEnabledSettings(mockSettings, mockGuestDashboardSections);

    expect(result).toEqual([{ id: 'deposit1', title: 'Deposit 1' }]);
  });
});
