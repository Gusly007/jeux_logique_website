<?php
class ProfilModel {
    private $db;

    public function __construct($db) {
        try {
            $this->db = $db;
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            error_log("Erreur de connexion à la base de données : " . $e->getMessage());
            throw new Exception("Erreur de connexion à la base de données.");
        }
    }

    public function getUserProfile($userId) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM user WHERE id = :id");
            $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result !== false ? $result : null;
        } catch (PDOException $e) {
            error_log("Erreur lors de la récupération du profil utilisateur : " . $e->getMessage());
            throw new Exception("Erreur lors de la récupération du profil utilisateur.");
        }
    }
}