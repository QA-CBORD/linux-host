/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrateResult } from '@capacitor/storage';

export const Storage = {
  async get(data: { key: string }): Promise<{ value: string | undefined }> {
    return { value: undefined };
  },

  async set(data: { key: string; value: string }): Promise<void> {return;},
  async clear(): Promise<void> {return;},
  async migrate(): Promise<MigrateResult> {
    return { existing: [], migrated: [] };
  },
};
