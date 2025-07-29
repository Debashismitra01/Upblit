package com.deployx.Backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeployDTO {
    private String clone_url;
    private String name;
    private String Privacy;
    private Integer Port;
}
