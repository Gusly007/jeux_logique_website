<?php
require_once __DIR__ . '/../models/BibliographieModel.php';
require_once __DIR__ . '/../config/DataBaseConnexion.php';

class BibliographieController {
    private $model;

    public function __construct() {
        try {
            $db = Database::getInstance()->getConnection();
            $this->model = new BibliographieModel($db);
            header('Content-Type: application/json');
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur de connexion à la base de données."]);
            exit;
        }
    }

    // GET /api/bibliographie
    public function getAll() {
        $result = $this->model->getAll();
        echo json_encode($result);
    }

    // GET /api/bibliographie?id=123
    public function getById($id) {
        $item = $this->model->getById((int)$id);
        if ($item) {
            echo json_encode($item);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Ouvrage non trouvé."]);
        }
    }

    // POST /api/bibliographie (JSON dans le corps)
    public function create() {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || empty($data['titre']) || empty($data['auteur'])) {
            http_response_code(400);
            echo json_encode(["message" => "Titre et auteur sont requis."]);
            return;
        }

        $success = $this->model->create($data);
        if ($success) {
            http_response_code(201);
            echo json_encode(["message" => "Ouvrage ajouté."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erreur lors de l'ajout."]);
        }
    }

    // PUT /api/bibliographie?id=123 (JSON dans le corps)
    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["message" => "Données manquantes pour la mise à jour."]);
            return;
        }

        $success = $this->model->update((int)$id, $data);
        if ($success) {
            echo json_encode(["message" => "Ouvrage mis à jour."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Échec de la mise à jour."]);
        }
    }

    // DELETE /api/bibliographie?id=123
    public function delete($id) {
        $success = $this->model->delete((int)$id);
        if ($success) {
            echo json_encode(["message" => "Ouvrage supprimé."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Échec de la suppression."]);
        }
    }
}
