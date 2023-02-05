//package com.ezpz.shabit.config.auth.base.oauth.service;
//
//import com.ezpz.shabit.config.auth.base.oauth.entity.UserPrincipal;
//import com.ezpz.shabit.user.entity.Users;
//import com.ezpz.shabit.user.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class CustomUserDetailsService implements UserDetailsService {
//
//    private final UserRepository userRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Users user = userRepository.findUserByEmail(username);
//        if (user == null) {
//            throw new UsernameNotFoundException("Can not find username.");
//        }
//        return UserPrincipal.create(user);
//    }
//}
