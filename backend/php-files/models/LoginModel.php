<?php
class LoginModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    /**
     * Authentifie un utilisateur en vérifiant son mot de passe hashé.
     */
    public function authenticateUser($username, $password) {
        $stmt = $this->db->prepare("SELECT * FROM user WHERE username = :username");
        if (!$stmt) {
            throw new Exception("Erreur de préparation : " . implode(" | ", $this->db->errorInfo()));
        }

        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            return $user;
        }

        return false;
    }

    /**
     * Enregistre un log de connexion utilisateur.
     */
    public function logUserLogin($userId, $ipAddress) {
        error_log("probletablepasencore creer");
        $stmt = $this->db->prepare(
            "INSERT INTO user_logins (user_id, ip_address, login_time) VALUES (:user_id, :ip_address, NOW())"
        );

        if (!$stmt) {
            throw new Exception("Erreur de préparation : " . implode(" | ", $this->db->errorInfo()));
        }

        $success = $stmt->execute([
            'user_id' => $userId,
            'ip_address' => $ipAddress
        ]);

        if (!$success) {
            throw new Exception("Erreur d'exécution : " . implode(" | ", $stmt->errorInfo()));
        }

        return true;
    }
}
