package com.cbord.get.plugin;

import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import android.Manifest;

@CapacitorPlugin(name = "AndroidPermissionsPlugin",permissions = {
              @Permission(
                  alias = "location",
                  strings = { Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION }
              )
          })
public class AndroidPermissionsPlugin extends Plugin {

    @PluginMethod()
    public void requestPermissions(PluginCall call) {
        if (!hasLocationPermissions()) {
            requestPermissionForAlias("location", call, "androidPermsCallback");
        } else {
            resolvePermissions(call, true);
        }
    }

    @PermissionCallback
    private void androidPermsCallback(PluginCall call) {
          this.checkPermissions(call);
    }

    @PluginMethod()
    public void checkPermissions(PluginCall call) {
        if (hasLocationPermissions()) {
            resolvePermissions(call, true);
        }
        else {
            resolvePermissions(call, false);
        }
    }

    private boolean hasLocationPermissions() {
        return getPermissionState("location") == PermissionState.GRANTED;
    }

    private void resolvePermissions(PluginCall call, boolean status) {
        JSObject response = new JSObject();
        response.put("hasPermission", status);
        call.resolve(response);
    }
}
