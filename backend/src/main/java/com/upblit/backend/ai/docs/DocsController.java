package com.upblit.backend.ai.docs;

import com.upblit.backend.Library.SupabaseService;
import com.upblit.backend.ai.Doc;
import com.upblit.backend.ai.Tenant;
import com.upblit.backend.ai.TenantRepository;
import com.upblit.backend.core.org.OrganizationDTO;
import com.upblit.backend.security.UserdataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;

@RestController
@RequestMapping("/ai/docs")
public class DocsController {
    @Autowired
    private DocsService docsService;

    @Autowired
    private DocsSender docsSender;



    @PostMapping
    public ResponseEntity<?> createDoc(@RequestParam("TenantId") Long TenantId,
                                    @RequestParam("file") MultipartFile file) throws Exception {
        Doc doc = docsService.create(TenantId,file);
        if(doc == null) return ResponseEntity.of(ProblemDetail.forStatus(HttpStatus.FORBIDDEN)).build();
        DocsTransferDTO docsTransferDTO = new DocsTransferDTO();
        docsTransferDTO.setFile_name(doc.getFilename());
        docsTransferDTO.setSupabase_url(doc.getUrl());
        docsTransferDTO.setTenant_id(doc.getTenant().getId().toString());
        return ResponseEntity.ok().body(docsSender.docs_send(docsTransferDTO));
    }


}
