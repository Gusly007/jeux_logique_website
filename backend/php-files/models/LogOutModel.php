<?php
class LogOutModel {
    public function logoutUser(): bool {
        // Démarre la session si elle n'est pas déjà active
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Supprime toutes les variables de session
        $_SESSION = [];

        // Détruit le cookie de session si utilisé
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }

        // Détruit la session
        session_destroy();

        return true;
    }
}
