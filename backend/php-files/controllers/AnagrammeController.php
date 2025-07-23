<?php
require_once 'AnagrammeModel.php';

header('Content-Type: application/json');

$model = new AnagrammeModel();
$questions = [];

for ($i = 0; $i < 5; $i++) {
    $q = $model->generateQuestion();
    $questions[] = ["anagramme" => $q["anagramme"]];
}

echo json_encode($questions);
