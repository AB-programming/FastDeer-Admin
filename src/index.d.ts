interface AuthOption {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}