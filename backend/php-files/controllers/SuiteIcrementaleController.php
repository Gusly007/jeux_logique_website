<?php
require_once 'SuiteIncrementale.php';

header('Content-Type: application/json');

$model = new SuiteIncrementale();
$questions = [];

for ($i = 0; $i < 5; $i++) {
    $q = $model->generateQuestion();
    // On ne renvoie pas la réponse attendue ("expected") dans l'API publique
    $questions[] = [
        "type" => $q["type"],
        "suite" => $q["suite"]
    ];
}

echo json_encode($questions);
