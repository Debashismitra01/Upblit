package com.deployx.Backend.Service;

import com.deployx.Backend.Model.Port;
import com.deployx.Backend.Repository.PortRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PortService {

    @Autowired
    private PortRepository portRepo;

    @Transactional
    public Integer getAvailablePort() {
        Port port = portRepo.findOneAvailablePortWithLock();

        port.setStatus("IN_USE");
        portRepo.save(port);
        return port.getPort();
    }

    public void addPort(int port) {
        if (!portRepo.existsById(port)) {
            Port newPort = new Port();
            newPort.setPort(port);
            newPort.setStatus("AVAILABLE");
            portRepo.save(newPort);
        }
    }
}
