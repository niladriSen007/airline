package com.niladri.dto.response;
import com.niladri.enums.UserPermission;
import com.niladri.enums.UserRole;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String profileImage;
    private UserRole role;
    private Set<UserPermission> userPermissions;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoggedInTime;

}
