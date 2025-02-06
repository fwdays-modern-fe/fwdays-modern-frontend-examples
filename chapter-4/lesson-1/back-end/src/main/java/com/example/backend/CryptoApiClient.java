package com.example.backend;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;
import org.springframework.scheduling.annotation.Scheduled;

@Component
public class CryptoApiClient {

    private static final String KRAKEN_API_URL = "https://api.kraken.com/0/public/Ticker?pair=";
    private final RestTemplate restTemplate = new RestTemplate();

    // Array of cryptocurrency pairs to fetch
    private static final String[] CRYPTO_PAIRS = {"XBTUSD", "ETHUSD", "SOLUSD"};

    private JSONObject latestCryptoData = new JSONObject();

    @Scheduled(fixedRate = 5000) // Query every 5 seconds
    public void fetchCryptoData() {
        StringBuilder pairs = new StringBuilder();
        for (String pair : CRYPTO_PAIRS) {
            pairs.append(pair).append(",");
        }
        // Remove the last comma
        String queryPairs = pairs.length() > 0 ? pairs.substring(0, pairs.length() - 1) : "";

        String url = KRAKEN_API_URL + queryPairs;
        String response = restTemplate.getForObject(url, String.class);

        JSONObject jsonResponse = new JSONObject(response);
        if (jsonResponse.has("result")) {
            latestCryptoData = jsonResponse.getJSONObject("result");
        }
    }

    public String getLatestCryptoData(){
        return latestCryptoData.toString();
    }
}
