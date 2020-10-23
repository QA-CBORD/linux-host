package com.cbord.get;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

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
        }});
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK) {
            Log.d("RESULT_OK: ", Integer.toString(resultCode));
        } else if (resultCode == RESULT_CANCELED) {
            Log.d("RESULT_CANCELED: ", Integer.toString(resultCode));
        } else {
            Log.d("RESULT_UNKNOWN: ", Integer.toString(resultCode));
        }
    }
}