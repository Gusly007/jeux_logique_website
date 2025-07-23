<?php
class UserSession {
    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function isAuthenticated(): bool {
        return isset($_SESSION['user_id']);
    }

    public function getId(): ?int {
        return $_SESSION['user_id'] ?? null;
    }

    public function getUsername(): ?string {
        return $_SESSION['username'] ?? null;
    }

    public function hasRole(string $role): bool {
        return isset($_SESSION['role']) && $_SESSION['role'] === $role;
    }

    public function logout(): void {
        $_SESSION = [];
        session_destroy();
    }
}
