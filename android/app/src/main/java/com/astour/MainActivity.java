package com.astour;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;

public class MainActivity extends BridgeActivity {
     @Override
     public void onCreate(Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);
         registerPlugin(com.getcapacitor.community.stripe.StripePlugin.class);
     }
}
