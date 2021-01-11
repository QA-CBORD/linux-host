package com.cbord.get;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.cbord.get.mcredential.MobileCredentialStatusPlugin;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            add(HIDPlugin.class);
            add(GooglePayPlugin.class);
            add(MobileCredentialStatusPlugin.class);
        }});
    }
}