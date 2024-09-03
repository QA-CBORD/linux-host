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


            String title = (String) userInfo.getData().get("title");
            String status = (String) userInfo.getData().get("status");
            String userId = (String) userInfo.getData().get("userId");

            if (title == null || status == null || userId == null) {
                return null;
            }

            JSObject response = new JSObject();
            response.put("title", title);
            response.put("status", status);
            response.put("userId", userId);
            response.put("category", category);
            return response;
    }

    public static @NonNull JSObject build(@NonNull RemoteMessage remoteMessage) {
        JSObject response = new JSObject();
        response.put("id", remoteMessage.getMessageId());
        JSObject data = new JSObject();
        for (String key : remoteMessage.getData().keySet()) {
            Object value = remoteMessage.getData().get(key);
            data.put(key, value);
        }
        response.put("data", data);
        RemoteMessage.Notification notification = remoteMessage.getNotification();
        if (notification != null) {
            String title = notification.getTitle();
            String body = notification.getBody();
            response.put("title", title);
            response.put("body", body);
            response.put("click_action", notification.getClickAction());
            Uri link = notification.getLink();
            if (link != null) {
                response.put("link", link.toString());
            }
        }
        return response;
    }
}
