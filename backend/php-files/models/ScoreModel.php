<?php

class ScoreModel {
    private PDO $db;

    
    public function __construct(PDO $db) {
        $this->db = $db;
    }

    // ✅ Ajouter un score
    public function ajouterScore(int $userId, string $jeu, int $valeur): bool {
        $sql = "INSERT INTO score (user_id, jeu, valeur) VALUES (:user_id, :jeu, :valeur)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':user_id' => $userId,
            ':jeu'     => $jeu,
            ':valeur'  => $valeur
        ]);
    }

    // ✅ Obtenir tous les scores d’un utilisateur
    public function getScoresParUtilisateur(int $userId): array {
        $sql = "SELECT * FROM score WHERE user_id = :user_id ORDER BY date_enregistrement DESC";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':user_id' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // ✅ Obtenir la moyenne des scores pour un jeu donné d’un utilisateur
    public function getMoyenneScoreParJeu(int $userId, string $jeu): ?float {
        $sql = "SELECT AVG(valeur) AS moyenne FROM score WHERE user_id = :user_id AND jeu = :jeu";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':user_id' => $userId,
            ':jeu'     => $jeu
        ]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result && $result['moyenne'] !== null ? (float) $result['moyenne'] : null;
    }

    // ✅ Supprimer les scores d’un utilisateur
    public function supprimerScoresUtilisateur(int $userId): bool {
        $sql = "DELETE FROM score WHERE user_id = :user_id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([':user_id' => $userId]);
    }
}
