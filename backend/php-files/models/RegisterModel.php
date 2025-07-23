<?php
class RegisterModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }
    /**
     * Enregistre un nouvel utilisateur dans la base de données.
     *
     * @param string $username
     * @param string $password
     * @param string $email
     * @return bool
     * @throws Exception en cas d’erreur
     */
    public function registerUser(string $username, string $password, string $email): bool {
        // Vérification si l'utilisateur ou l'email existe déjà
        if ($this->userExists($username, $email)) {
            throw new Exception("Nom d'utilisateur ou e-mail déjà utilisé.");
        }

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $isAdministrator = 0;

        $stmt = $this->db->prepare(
            "INSERT INTO user (username, password, email, is_administrator)
             VALUES (:username, :password, :email, :admin)"
        );

        if (!$stmt) {
            throw new Exception("Erreur de préparation : " . implode(" | ", $this->db->errorInfo()));
        }

        $success = $stmt->execute([
            'username' => $username,
            'password' => $hashedPassword,
            'email'    => $email,
            'admin'    => $isAdministrator
        ]);

        if (!$success) {
            throw new Exception("Erreur d'exécution : " . implode(" | ", $stmt->errorInfo()));
        }

        return true;
    }

    /**
     * Vérifie si un utilisateur ou un email existe déjà en base.
     */
    private function userExists(string $username, string $email): bool {
        $stmt = $this->db->prepare("SELECT id FROM user WHERE username = :username OR email = :email");
        $stmt->execute(['username' => $username, 'email' => $email]);
        return $stmt->fetch() !== false;
    }
}
