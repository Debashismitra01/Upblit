package com.upblit.backend.ai;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.upblit.backend.core.Organization;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Doc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;
    private String filename;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;

    private String content_hash;
    private String status;
    private Instant created_at;
    private Instant updated_at;

}
