package com.cbord.get.plugin;

import com.capacitorjs.plugins.pushnotifications.PushNotificationsPlugin;
import com.cbord.get.EventType;
import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginHandle;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "AndroidDevice")
public class AndroidPlugin extends Plugin {

    public static Bridge staticBridge = null;

    public void load() {
        staticBridge = this.bridge;
    }

    public static void notifyAndroidListeners(JSObject response) {
        AndroidPlugin pushPlugin = AndroidPlugin.getAndroidPluginInstance();
         if (pushPlugin != null) {
                     pushPlugin.notifyListeners(
                     EventType.PHOTO_UPLOAD_UPDATE.toString(),
                     response,
                     true
             );
         }
    }

    public static void notifyPushListeners(JSObject response) {
        PushNotificationsPlugin pushPlugin = PushNotificationsPlugin.getPushNotificationsInstance();
        if (pushPlugin != null) {
            pushPlugin.notifyListeners("pushNotificationReceived", response, true);
        }
    }

    private static AndroidPlugin getAndroidPluginInstance() {
        if (staticBridge != null && staticBridge.getWebView() != null) {
            PluginHandle handle = staticBridge.getPlugin("AndroidDevice");
            if (handle == null) {
                return null;
            }
            return (AndroidPlugin) handle.getInstance();
        }
        return null;
    }
}
