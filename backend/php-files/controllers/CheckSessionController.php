<?php
class CheckSessionController {
    public function __construct() {
        
    }
  public function checkSession() {
    header('Content-Type: application/json');

    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];
        $username = $_SESSION['username'] ?? null;

        require_once __DIR__ . '/../models/ProfilModel.php';
        require_once __DIR__ . '/../config/DataBaseConnexion.php';

        $db = Database::getInstance()->getConnection();
        $profileModel = new ProfilModel($db);
        $profile = $profileModel->getUserProfile($userId);

        if (!$profile) {
            http_response_code(404);
            echo json_encode(["message" => "Profil non trouvé"]);
            return;
        }

        echo json_encode([
            "message" => "Session active",
            "username" => $username,
            "profile" => $profile
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Session inactive"]);
    }
}

}

?>