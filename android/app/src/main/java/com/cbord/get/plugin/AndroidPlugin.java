package com.cbord.get.plugin;

import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginHandle;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "AndroidPlugin")
public class AndroidPlugin extends Plugin {

    public static Bridge staticBridge = null;

    public void load() {
        staticBridge = this.bridge;
    }

    @PluginMethod
    public void emitEvent(PluginCall call) {

        System.out.println("emitEvent " +   EventType.PHOTO_UPLOAD_UPDATE.toString());
        // Prepare the data to send
        JSObject ret = new JSObject();
        ret.put("message", "Hello from Java!");

        // Emit the event to the JavaScript side
        notifyListeners(EventType.PHOTO_UPLOAD_UPDATE.toString(), ret);

        // Complete the call
        call.resolve();
    }

     public static void notifyListeners(JSObject response) {
        System.out.println("notifyListeners " +   EventType.PHOTO_UPLOAD_UPDATE.toString());
         AndroidPlugin pushPlugin = AndroidPlugin.getAndroidPluginInstance();
         if (pushPlugin != null) {
             pushPlugin.notifyListeners(
                     EventType.PHOTO_UPLOAD_UPDATE.toString(),
                     response,
                     true
             );
         }

    }

    public static AndroidPlugin getAndroidPluginInstance() {
        if (staticBridge != null && staticBridge.getWebView() != null) {
            PluginHandle handle = staticBridge.getPlugin("AndroidPlugin");
            if (handle == null) {
                return null;
            }
            return (AndroidPlugin) handle.getInstance();
        }
        return null;
    }
}
