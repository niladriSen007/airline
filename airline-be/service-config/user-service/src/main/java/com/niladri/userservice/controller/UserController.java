package com.niladri.userservice.controller;

import com.niladri.dto.response.UserResponse;
import com.niladri.payload.ApiResponse;
import com.niladri.userservice.dto.request.UpdateRequest;
import com.niladri.userservice.service.IUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@Slf4j
public class UserController {
    private final IUserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> getUserProfile(@RequestHeader("X-User-Email") String email) {
        return ResponseEntity.ok(ApiResponse.success(userService.getUserByEmail(email), 200));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> updateUserProfile(@RequestHeader("X-User-Email") String email,
                                                                       @RequestBody UpdateRequest updateRequest) {
        return ResponseEntity.ok(ApiResponse.success(userService.updateUser(email, updateRequest), 200));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable String userId) {
        return ResponseEntity.ok(ApiResponse.success(userService.getUserById(Long.valueOf(userId)), 200));
    }

    @GetMapping("/admin/users")
    @PreAuthorize("hasRole('ADMIN') AND hasAuthority('VIEW_ALL_USERS')")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.success(userService.getAllUsers(), 200));
    }
}
