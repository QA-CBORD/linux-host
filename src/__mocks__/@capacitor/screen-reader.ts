export const ScreenReader = {
  async isEnabled(): Promise<{ value: boolean }> {
    return Promise.resolve({ value: true });
  },

  async speak(value): Promise<void> {
    return Promise.resolve(value);
  },
};
