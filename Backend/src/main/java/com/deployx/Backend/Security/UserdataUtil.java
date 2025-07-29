package com.deployx.Backend.Security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


public class UserdataUtil {


    public static String getCurrentUsername(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }



}
