package com.upblit.backend.core.user;

import com.upblit.backend.core.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("User")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping
    public User create(@RequestBody User user){
        return userService.CreateUser(user);
    }
    @GetMapping
    public User findAll(@RequestParam("username") String username){
        return userService.findUserByUsername(username);
    }
}
