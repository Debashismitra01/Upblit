package com.upblit.backend.Library;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;

@Service
public class SupabaseService {

    private final String SUPABASE_URL = "https://emdcswqcxgzsfqicsddb.supabase.co";
    @Value("${supabase.api.key}")
    private String API_KEY;

    public String uploadFile(MultipartFile file,String BUCKET) throws Exception {

        // ✅ generate random filename
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String path = "uploads/" + fileName;

        URL url = new URL(SUPABASE_URL + "/storage/v1/object/" + BUCKET + "/" + path);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setDoOutput(true);
        conn.setRequestMethod("POST");

        conn.setRequestProperty("Authorization", "Bearer " + API_KEY);
        conn.setRequestProperty("apikey", API_KEY);
        conn.setRequestProperty("Content-Type", file.getContentType());

        // upload file
        OutputStream os = conn.getOutputStream();
        os.write(file.getBytes());
        os.flush();
        os.close();

        int responseCode = conn.getResponseCode();

        if (responseCode >= 200 && responseCode < 300) {
            // ✅ public URL
            return SUPABASE_URL + "/storage/v1/object/public/" + BUCKET + "/" + path;
        } else {
            throw new RuntimeException("Upload failed: " + responseCode);
        }
    }
}