package com.cbord.get.notification;

import com.cbord.get.EventType;
import com.getcapacitor.JSObject;
import com.google.firebase.messaging.RemoteMessage;

public class ConfigurationFactory {

    public static JSObject createConfiguration(RemoteMessage userInfo) {
        String category = (String) userInfo.getData().get("category");
        if (category == null) {
            return null;
        }

        if (EventType.PHOTO_UPLOAD_UPDATE.toString().equals(category)) {
            String title = (String) userInfo.getData().get("title");
            String status = (String) userInfo.getData().get("status");
            String userId = (String) userInfo.getData().get("userId");

            if (title == null || status == null || userId == null) {
                return null;
            }

            JSObject configuration = new JSObject();
            configuration.put("title", title);
            configuration.put("status", status);
            configuration.put("userId", userId);

            return configuration;
        }

        return null;
    }
}
