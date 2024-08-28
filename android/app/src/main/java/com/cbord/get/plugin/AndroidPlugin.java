package com.cbord.get.plugin;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "AndroidPlugin")
public class AndroidPlugin extends Plugin {

    public void notifyListeners(JSObject response) {
        this.notifyListeners(
                EventType.PHOTO_UPLOAD_UPDATE.toString(),
                response,
                true
        );
    }
}
