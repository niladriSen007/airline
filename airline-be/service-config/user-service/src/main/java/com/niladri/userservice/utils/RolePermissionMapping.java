package com.niladri.userservice.utils;

import com.niladri.enums.UserPermission;
import com.niladri.enums.UserRole;

import java.util.Map;
import java.util.Set;


public class RolePermissionMapping {
    private static final Map<UserRole, Set<UserPermission>> roleBasedPermission = Map.of(UserRole.ROLE_CUSTOMER,
            Set.of(UserPermission.BOOK_TICKET, UserPermission.CANCEL_TICKET, UserPermission.VIEW_BOOKINGS),
            UserRole.ROLE_AIRLINE_OWNER,
            Set.of(UserPermission.CREATE_AIRPORT, UserPermission.UPDATE_AIRPORT, UserPermission.DELETE_AIRPORT),
            UserRole.ROLE_SYSTEM_ADMIN, Set.of(UserPermission.CREATE_AIRPORT, UserPermission.UPDATE_AIRPORT, UserPermission.DELETE_AIRPORT,
                    UserPermission.BOOK_TICKET, UserPermission.CANCEL_TICKET, UserPermission.VIEW_BOOKINGS));

    public static Set<UserPermission> getPermissionsByRole(UserRole role) {
        return roleBasedPermission.get(role);
    }
}
