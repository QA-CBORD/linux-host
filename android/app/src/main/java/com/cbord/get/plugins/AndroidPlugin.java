package com.cbord.get.plugins;


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

    public static void notifySilentListeners(JSObject response) {

        String eventCategory = (String) response.getString("category");
        AndroidPlugin pushPlugin = getInstance();

        if (pushPlugin == null || !pushPlugin.hasListeners(eventCategory)) {
            return;
        }
        pushPlugin.notifyListeners(
                eventCategory,
                response,
                true
        );
    }

    private static AndroidPlugin getInstance() {
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
