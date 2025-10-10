package com.deployx.Backend.Service;

import com.deployx.Backend.Model.User;
import com.deployx.Backend.Repository.UserRepository;
import com.deployx.Backend.Security.UserdataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TesterService {
    @Autowired
    private UserRepository userRepository;

    public User getUser(){
        return userRepository.findByUsername(UserdataUtil.getCurrentUsername()).orElse(null);
    }
}
