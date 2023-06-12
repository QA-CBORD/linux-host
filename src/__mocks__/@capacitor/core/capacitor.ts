import { PLATFORM } from "@shared/accessibility/services/accessibility.service";

export const Capacitor = {
    getPlatform: (): string => PLATFORM.ios
};
