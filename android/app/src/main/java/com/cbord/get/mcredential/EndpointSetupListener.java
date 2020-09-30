package com.cbord.get.mcredential;


public interface EndpointSetupListener {
    void onSuccess(Object someObject);
    void onFailure(int errorCode);
}
