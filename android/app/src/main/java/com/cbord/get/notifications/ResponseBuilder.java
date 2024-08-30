package com.cbord.get.notifications;

import android.net.Uri;

import androidx.annotation.NonNull;

import com.cbord.get.EventType;
import com.getcapacitor.JSObject;
import com.google.firebase.messaging.RemoteMessage;

public class ResponseBuilder {

    public static JSObject buildSilent(RemoteMessage userInfo) {
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

    public static @NonNull JSObject build(@NonNull RemoteMessage remoteMessage) {
        JSObject remoteMessageData = new JSObject();
        remoteMessageData.put("id", remoteMessage.getMessageId());
        JSObject data = new JSObject();
        for (String key : remoteMessage.getData().keySet()) {
            Object value = remoteMessage.getData().get(key);
            data.put(key, value);
        }
        remoteMessageData.put("data", data);
        RemoteMessage.Notification notification = remoteMessage.getNotification();
        if (notification != null) {
            String title = notification.getTitle();
            String body = notification.getBody();
            remoteMessageData.put("title", title);
            remoteMessageData.put("body", body);
            remoteMessageData.put("click_action", notification.getClickAction());
            Uri link = notification.getLink();
            if (link != null) {
                remoteMessageData.put("link", link.toString());
            }
        }
        return remoteMessageData;
    }
}
