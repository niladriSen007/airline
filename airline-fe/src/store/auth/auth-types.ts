type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

export type AuthStore = {
  status: AuthStatus;
  isBootStraped: boolean;
  user: AppUser | null;
  error: string | null;
  setLoading: () => void;
  setUser: (user: AppUser | null) => void;
  setError: (errorMessage: string | null) => void;
  clearAuthState: () => void;
};

export type AppUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role:
    | "ROLE_ADMIN"
    | "ROLE_PASSENGER"
    | "ROLE_AIRLINE_STAFF"
    | "ROLE_AIRLINE_ADMIN"
    | "ROLE_AIRLINE_MANAGER"
    | "ROLE_AIRLINE_PILOT"
    | "ROLE_AIRLINE_CREW"
    | "ROLE_AIRLINE_GROUND_STAFF"
    | "ROLE_AIRLINE_MAINTENANCE"
    | "ROLE_AIRLINE_SECURITY";
  userPermissions: Set<
    | "VIEW_FLIGHTS"
    | "BOOK_FLIGHTS"
    | "MANAGE_FLIGHTS"
    | "MANAGE_BOOKINGS"
    | "MANAGE_USERS"
    | "MANAGE_AIRLINE_OPERATIONS"
  >;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
  lastLoggedInTime: string | null;
};

export type UserResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
  userResponse: AppUser | null;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export type SignupResponse = {
  message: string;
  userResponse: AppUser | null;
};
