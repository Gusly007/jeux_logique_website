<?php
require_once __DIR__ . '/../models/RegisterModel.php';
require_once __DIR__ . '/../config/DataBaseConnexion.php';

class RegisterController {
    private $model;

    public function __construct() {
        try {
            $db = Database::getInstance()->getConnection();
            if (!$db) {
                throw new Exception("Erreur de connexion à la base de données");
            }
            $this->model = new RegisterModel($db);
        } catch (Exception $e) {
            error_log("Erreur dans RegisterController : " . $e->getMessage());
            http_response_code(500);
            echo json_encode(["message" => "Erreur interne du serveur."]);
            exit;
        }
    }

    public function register() {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
            http_response_code(400);
            echo json_encode(["message" => "Nom d'utilisateur, email ou mot de passe manquant."]);
            return;
        }

        try {
            $this->model->registerUser(
                trim($data['username']),
                trim($data['password']),
                trim($data['email'])
            );
            http_response_code(201);
            echo json_encode(["message" => "Inscription réussie ✅"]);
        } catch (Exception $e) {
            error_log("Erreur d'inscription : " . $e->getMessage());
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }
}
