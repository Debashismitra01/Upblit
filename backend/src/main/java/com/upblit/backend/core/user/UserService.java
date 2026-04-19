package com.upblit.backend.core.user;

import com.upblit.backend.core.User;
import com.upblit.backend.core.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
