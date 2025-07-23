<?php
// $headers = getallheaders();
// $token = $headers['Authorization'] ?? '';

// if (preg_match('/Bearer\s(\S+)/', $token, $matches)) {
//     $token = $matches[1];

//     // Vérifie le token en base ou en mémoire
//     if ($token === '8f237749f3a7fe74028c71ed3a4ee361') {
//         // L'utilisateur est autorisé
//         echo json_encode(['profile' => [/* infos utilisateur */]]);
//     } else {
//         http_response_code(401);
//         echo json_encode(['error' => 'Token invalide']);
//     }
// } else {
//     http_response_code(401);
//     echo json_encode(['error' => 'Aucun token']);
// }
//je dois crreer une table dans ma base de donner dans laquelle je vais enregistrer les tokens et je les verifirer//
class JeuxController {
    public function __construct() {
        // Initialisation si nécessaire
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





