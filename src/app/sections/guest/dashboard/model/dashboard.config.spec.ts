import { GuestSetting } from "@sections/guest/model/guest-settings";
import { GuestDashboardSections } from "./dashboard.config";

describe('GuestDashboardSections', () => {
  it('should have a deposit section with the correct properties', () => {
    const depositSection = GuestDashboardSections.deposit;
    expect(depositSection.title).toBe('Guest Deposit');
    expect(depositSection.imageUrl).toBe('assets/icon/get_deposit.svg');
    expect(depositSection.willNavigate).toBe(true);
    expect(depositSection.stackNavigation).toBe(true);
  });

  it('visibilityOn function should return true for deposit section when GuestSetting allows deposit', () => {
    const depositSection = GuestDashboardSections.deposit;
    const guestSetting = { canDeposit: true };
    expect(depositSection.visibilityOn(guestSetting as GuestSetting)).toBe(true);
  });

  it('visibilityOn function should return false for deposit section when GuestSetting disallows deposit', () => {
    const depositSection = GuestDashboardSections.deposit;
    const guestSetting = { canDeposit: false };
    expect(depositSection.visibilityOn(guestSetting as GuestSetting)).toBe(false);
  });

  it('visibilityOn function should return true for order section when GuestSetting allows ordering', () => {
    const orderSection = GuestDashboardSections.order;
    const guestSetting = { canOrder: true };
    expect(orderSection.visibilityOn(guestSetting as GuestSetting)).toBe(true);
  });

  it('visibilityOn function should return false for order section when GuestSetting disallows ordering', () => {
    const orderSection = GuestDashboardSections.order;
    const guestSetting = { canOrder: false };
    expect(orderSection.visibilityOn(guestSetting as GuestSetting)).toBe(false);
  });

  it('visibilityOn function should return true for explore section when GuestSetting allows exploring', () => {
    const exploreSection = GuestDashboardSections.explore;
    const guestSetting = { canExplore: true };
    expect(exploreSection.visibilityOn(guestSetting as GuestSetting)).toBe(true);
  });

  it('visibilityOn function should return false for explore section when GuestSetting disallows exploring', () => {
    const exploreSection = GuestDashboardSections.explore;
    const guestSetting = { canExplore: false };
    expect(exploreSection.visibilityOn(guestSetting as GuestSetting)).toBe(false);
  });
});
