package com.deployx.Backend.Service;

import com.deployx.Backend.DTO.DeployDTO;
import com.deployx.Backend.Model.Project;
import com.deployx.Backend.Model.User;
import com.deployx.Backend.Repository.UserRepository;
import com.deployx.Backend.Security.UserdataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

@Service
public class DeployService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private PortService portService;

    public ResponseEntity<?> deploy(DeployDTO deployDTO){
        if (deployDTO.getClone_url() == null || deployDTO.getName() == null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Missing 'clone_url' or 'project_name'."
            ));
        }

        String projectName = deployDTO.getName().toLowerCase();
        String cloneUrl=deployDTO.getClone_url();
        System.out.println(deployDTO.getPrivacy());
        User user=userRepository.findByUsername(UserdataUtil.getCurrentUsername()).orElse(null);
        if(deployDTO.getPrivacy().equals("true")){
            String token= user.getAccessToken();
            cloneUrl=deployDTO.getClone_url().replace("https://","https://"+token+"@");

        }
        Integer port= portService.getAvailablePort();
        Project project= projectService.createProject(projectName, cloneUrl, port, user);
        try {
            String userDir = System.getProperty("user.dir")
                    .replace("\\", "/")
                    .replace("C:", "/mnt/c");  // Make path WSL-compatible

            // WSL path to script
            String scriptPath = userDir + "/deployx.sh";

            String[] command = {
                    "wsl", "-d", "Ubuntu", "--",
                    "bash", "-c",
                    String.format("bash deployx.sh '%s' '%s' '%s'", cloneUrl, projectName, String.valueOf(port))
            };

            ProcessBuilder builder = new ProcessBuilder(command);
            builder.redirectErrorStream(true);

            Process process = builder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            int exitCode = process.waitFor();

            Map<String, Object> response = new HashMap<>();
            response.put("project", projectName);
            response.put("log", output.toString());

            if (exitCode == 0) {
                response.put("status", "success");
                response.put("message", "Project deployed successfully.");
                projectService.markProjectAsDeployed(project,user);
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "failed");
                response.put("message", "Script exited with error.");
                return ResponseEntity.status(500).body(response);
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", "error",
                    "message", "🚨 Exception occurred",
                    "details", e.getMessage()
            ));
        }
    }
    public ResponseEntity<?> delete(String name){
        Project project= projectService.getProject(name);
        portService.addPort(project.getPort());
        try {
            projectService.delete(project);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}


