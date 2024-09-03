package com.cbord.get.plugins;

import com.capacitorjs.plugins.pushnotifications.PushNotificationsPlugin;
import com.cbord.get.EventType;
import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginHandle;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "ExtendedPushNotification")
public class ExtendedPushNotificationPlugin extends PushNotificationsPlugin {

    public static Bridge staticBridge = null;

    public void load() {
        staticBridge = this.bridge;
    }

    public static void notifyAPushListeners(JSObject response) {
        ExtendedPushNotificationPlugin pushPlugin = ExtendedPushNotificationPlugin.getInstance();

        if (pushPlugin != null) {
            pushPlugin.notifyListeners(
                    EventType.PUSH_NOTIFICATION_RECEIVED.toString(),
                    response,
                    true
            );
        }
    }

    private static ExtendedPushNotificationPlugin getInstance() {
        if (staticBridge != null && staticBridge.getWebView() != null) {
            PluginHandle handle = staticBridge.getPlugin("ExtendedPushNotification");
            if (handle == null) {
                return null;
            }
            return (ExtendedPushNotificationPlugin) handle.getInstance();
        }
        return null;
    }
}
