package com.upblit.backend.ai;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.upblit.backend.core.Organization;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "tenant")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tenant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id")
    private Organization organization;

    private String name;

    @OneToMany(mappedBy = "tenant")
    @JsonIgnore
    private List<Doc> docs;
}
