package com.upblit.backend.core.org;

import com.upblit.backend.core.Organization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/org")
public class orgcontroller {
    @Autowired
    private SupabaseService supabaseService;

    @Autowired
    private OrganizationService organizationService;

    @PostMapping
    public Organization create(        @ModelAttribute OrganizationDTO orgDTO,
                                 @RequestParam("file") MultipartFile file) throws Exception {

        String LogoUrl = supabaseService.uploadFile(file);
        return organizationService.create(orgDTO,LogoUrl);
    }
    @GetMapping
     public ResponseEntity<?> get(){
        return organizationService.findAll().map(organization -> ResponseEntity.ok().body(organization))
                .orElse(ResponseEntity.notFound().build());

     }
}
