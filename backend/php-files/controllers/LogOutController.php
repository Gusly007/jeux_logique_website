<?php
require_once __DIR__ . '/../models/LogOutModel.php';

class LogOutController {
    private $model;

    public function __construct() {
        try {
            $this->model = new LogOutModel();
        } catch (Exception $e) {
            error_log("Erreur dans le constructeur LogOutController : " . $e->getMessage());
            http_response_code(500);
            echo json_encode(["message" => "Erreur interne du serveur."]);
            exit;
        }
    }

    public function logout() {
        try {
            if ($this->model->logoutUser()) {
                http_response_code(200);
                echo json_encode(["message" => "Déconnexion réussie."]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Échec de la déconnexion."]);
            }
        } catch (Exception $e) {
            error_log("Erreur lors de la déconnexion : " . $e->getMessage());
            http_response_code(500);
            echo json_encode(["message" => "Erreur lors de la déconnexion."]);
        }
    }
}
