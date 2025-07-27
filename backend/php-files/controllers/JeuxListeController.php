<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

class JeuxController {
    public function __construct() {
        
    }

    public function getJeux() {
        $jeux = [
    [ "id" => 1, "nom" => "Calcul Mental", "description" => "Un jeu rapide", "chemin" => "/jeux/calcul" ],
    [ "id" => 2, "nom" => "Mémoire", "description" => "Exercez votre mémoire", "chemin" => "/jeux/memoire" ],
    [ "id" => 3, "nom" => "Réflexes", "description" => "Testez vos réflexes", "chemin" => "/jeux/reflexes" ],
    [ "id" => 4, "nom" => "MotManquant", "description" => "trouver le mot manquant", "chemin" => "/motmanquant" ],
    ["id" => 5, "nom" => "factorielle", "description" => "trouver les bon resultat", "chemin" => "/factorielle" ]
    
];
        // Cette méthode pourrait être étendue pour récupérer des jeux depuis une base de données
     echo json_encode($jeux);
    }
}





