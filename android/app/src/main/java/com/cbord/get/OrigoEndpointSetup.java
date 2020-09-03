package com.cbord.get;

import com.hid.origo.OrigoKeysApiFacade;
import com.hid.origo.api.OrigoMobileKeysCallback;
import com.hid.origo.api.OrigoMobileKeysException;

public class OrigoEndpointSetup implements OrigoMobileKeysCallback {

    private OrigoKeysApiFacade mobileKeysApiFacade;
    
    @Override
    public void handleMobileKeysTransactionCompleted() {

    }

    @Override
    public void handleMobileKeysTransactionFailed(OrigoMobileKeysException e) {

    }
}
