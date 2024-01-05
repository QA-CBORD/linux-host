package com.cbord.get;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
public class LocalNotification {
    private  final static String CHANNEL_ID = "Location_Channel_ID";
    private  final static String CHANNEL_NAME = "Location Channel";
    private  final static String CHANNEL_DESCRIPTION = "Notifications related to location updates";


    public static void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME, importance);
            channel.setDescription(CHANNEL_DESCRIPTION);
            NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }

    }
    public static void showNotifications(Context context) {
        var notificationBuilder = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_launcher_round)
                .setContentTitle("New Update Available")
                .setContentText("Please update to the latest version for improved performance")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        var notifyId = 1;
        var notification = notificationBuilder.build();

        NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
        notificationManager.notify(notifyId, notification);
    }

}
