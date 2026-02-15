package com.upblit.backend.Service;

import com.upblit.backend.Models.User;
import com.upblit.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User CreateUser(User user) {
        return userRepository.save(user);
    }
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}
