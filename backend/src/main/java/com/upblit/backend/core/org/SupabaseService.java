package com.upblit.backend.core.org;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;

@Service
public class SupabaseService {

    private final String SUPABASE_URL = "https://fiyytxeuitkchnafptkr.storage.supabase.co";
    private final String API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpeXl0eGV1aXRrY2huYWZwdGtyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDU1OTA0NSwiZXhwIjoyMDc2MTM1MDQ1fQ.EKZo2RWqcTgri07252MchRTrJPr_P4blHV1cFKjTU9A";
    private final String BUCKET = "Avatars";

    public String uploadFile(MultipartFile file) throws Exception {

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