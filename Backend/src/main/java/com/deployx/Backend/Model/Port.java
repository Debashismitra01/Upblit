package com.deployx.Backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Port {
    @Id
    private Integer port;
    private String status; // "AVAILABLE", "IN_USE"

}
