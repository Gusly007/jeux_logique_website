<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once __DIR__ . '/../models/LoginModel.php';
require_once __DIR__ . '/../models/ProfilModel.php';
require_once __DIR__ . '/../config/DataBaseConnexion.php';

class LoginController {
    private $model;
    private $profilmodel;
    private $db;

    public function __construct() {
        try {
            $db1 = Database::getInstance()->getConnection();
            $this->model = new LoginModel($db1);
            $this->db = $db1;
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (Exception $e) {
            error_log("Erreur de connexion à la base de données : " . $e->getMessage());
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode(["message" => "Erreur interne du serveur (connexion DB)."]);
            exit;
        }
    }

    public function login() {
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['username']) || empty($data['password'])) {
            http_response_code(400);
            echo json_encode(["message" => "Nom d'utilisateur et mot de passe requis."]);
            return;
        }

        $username = $data['username'];
        $password = $data['password'];
        error_log("Tentative de login pour : $username");

        try {
            $user = $this->model->authenticateUser($username, $password);

            if ($user) {
                error_log("Utilisateur authentifié : {$user['username']}");
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];

                $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
                $this->model->logUserLogin($user['id'], $ip);

                http_response_code(200);
                $this->profilmodel = new ProfilModel($this->db);
                $profile = $this->profilmodel->getUserProfile($user['id']);
                echo json_encode([
                    "message" => "Connexion réussie.",
                    "token" => session_id(),
                    "profile" => $profile
                ]);
                
            } else {
                error_log("Échec de login pour $username : mauvais identifiants");
                http_response_code(401);
                echo json_encode(["message" => "Nom d'utilisateur ou mot de passe incorrect."]);
            }
        } catch (Exception $e) {
            error_log("Erreur lors de la tentative de login : " . $e->getMessage());
            http_response_code(500);
            echo json_encode(["message" => "Erreur interne du serveuron esttt."]);
        }
    }
}
