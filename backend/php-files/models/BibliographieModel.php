<?php

class BibliographieModel {
    private $db; // ici c'est un objet PDO

    public function __construct($db) {
        $this->db = $db;
    }

    // 🔍 READ - Récupérer tous les ouvrages
    public function getAll(): array {
        $stmt = $this->db->query("SELECT * FROM bibliographie ORDER BY created_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // 🔍 READ - Récupérer un ouvrage par ID
    public function getById(int $id): ?array {
        $stmt = $this->db->prepare("SELECT * FROM bibliographie WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $ouvrage = $stmt->fetch(PDO::FETCH_ASSOC);
        return $ouvrage ?: null;
    }

    // 🆕 CREATE - Ajouter un ouvrage
    public function create(array $data): bool {
        $stmt = $this->db->prepare("
            INSERT INTO bibliographie (titre, auteur, annee, editeur, isbn, resume)
            VALUES (:titre, :auteur, :annee, :editeur, :isbn, :resume)
        ");
        return $stmt->execute([
            ':titre'   => $data['titre'],
            ':auteur'  => $data['auteur'],
            ':annee'   => $data['annee'] ?? null,
            ':editeur' => $data['editeur'] ?? null,
            ':isbn'    => $data['isbn'] ?? null,
            ':resume'  => $data['resume'] ?? null
        ]);
    }

    // ✏️ UPDATE - Modifier un ouvrage
    public function update(int $id, array $data): bool {
        $stmt = $this->db->prepare("
            UPDATE bibliographie
            SET titre = :titre, auteur = :auteur, annee = :annee, editeur = :editeur, isbn = :isbn, resume = :resume
            WHERE id = :id
        ");
        return $stmt->execute([
            ':id'      => $id,
            ':titre'   => $data['titre'],
            ':auteur'  => $data['auteur'],
            ':annee'   => $data['annee'] ?? null,
            ':editeur' => $data['editeur'] ?? null,
            ':isbn'    => $data['isbn'] ?? null,
            ':resume'  => $data['resume'] ?? null
        ]);
    }

    // ❌ DELETE - Supprimer un ouvrage
    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM bibliographie WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
