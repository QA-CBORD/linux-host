package com.cbord.get.notification;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;

import androidx.core.app.NotificationCompat;

import com.cbord.get.R;

public class LocalNotification {
    private  final static String CHANNEL_ID = "GET_Channel_ID";
    private  final static String CHANNEL_NAME = "GET_Channel";
    private  final static String CHANNEL_DESCRIPTION = "GET Local notification";

    public static void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME, importance);
            channel.setDescription(CHANNEL_DESCRIPTION);
            NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }

    }

    public static void showNotifications(Context context, String title, String message) {
        var notificationBuilder = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_launcher_round)
                .setContentTitle(title)
                .setContentText(message)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        var notifyId = 1;
        var notification = notificationBuilder.build();

        NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
        notificationManager.notify(notifyId, notification);
    }

}
