package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CryptoApiController {

    private final CryptoApiClient cryptoApiClient;

    @Autowired
    public CryptoApiController(CryptoApiClient cryptoApiClient) {
        this.cryptoApiClient = cryptoApiClient;
    }

    @GetMapping("/crypto")
    public String getCrypto() {
        return cryptoApiClient.getLatestCryptoData();
    }
}
