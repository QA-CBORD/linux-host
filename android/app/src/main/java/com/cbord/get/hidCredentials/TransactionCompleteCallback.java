package com.cbord.get.hidCredentials;

@FunctionalInterface
public interface TransactionCompleteCallback {
    void onCompleted(final Object transactionResult);
}
