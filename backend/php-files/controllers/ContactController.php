<?php
require_once __DIR__ . '/../models/ContactModel.php';

class ContactController {
    private $model;

    public function __construct() {
        $this->model = new contactModel();
    }

    public function sendMessage() {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
            http_response_code(400);
            echo json_encode(["message" => "Tous les champs sont requis."]);
            return;
        }

        $result = $this->model->putInDatabasebase($data);

        if ($result) {
            http_response_code(200);
            echo json_encode(["message" => "Message envoyé avec succès."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erreur lors de l'envoi du message."]);
        }
    }
}