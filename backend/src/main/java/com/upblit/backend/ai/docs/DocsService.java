package com.upblit.backend.ai.docs;

import com.upblit.backend.Library.SupabaseService;
import com.upblit.backend.ai.Doc;
import com.upblit.backend.ai.DocRepository;
import com.upblit.backend.ai.Tenant;
import com.upblit.backend.ai.TenantRepository;
import com.upblit.backend.core.UserRepository;
import com.upblit.backend.security.UserdataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;

@Service
public class DocsService {

    @Autowired
    private TenantRepository tenantRepository;
    @Autowired
    private SupabaseService  supabaseService;
    @Autowired
    private DocRepository docRepository;

    public Doc create(Long TenantId, MultipartFile file) throws Exception {
        Tenant tenant = tenantRepository.findByIdAndOrganizationUsersId(TenantId, UserdataUtil.getCurrentUserId()).orElse(null);
        if (tenant == null) {
            return null;
        }
        String FileUrl = supabaseService.uploadFile(file, "Docs");
        Doc doc = new Doc();
        doc.setUrl(FileUrl);
        doc.setFilename(file.getOriginalFilename());
        doc.setTenant(tenant);
        doc.setStatus("not started");
        doc.setCreated_at(Instant.now());
        doc.setUpdated_at(Instant.now());
        return  docRepository.save(doc);
    }
}
