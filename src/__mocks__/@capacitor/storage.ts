import { MigrateResult } from '@capacitor/storage';

export const Storage = {
  async get(data: { key: string }): Promise<{ value: string | undefined }> {
    return { value: undefined };
  },

  async set(data: { key: string; value: string }): Promise<void> {},
  async clear(): Promise<void> {},
  async migrate(): Promise<MigrateResult> {
    return { existing: [], migrated: [] };
  },
};
