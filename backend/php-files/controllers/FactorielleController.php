<?php
require_once __DIR__ . '/../models/FactorielleModel.php';

class FactorielleController {
    private $model;

    public function __construct() {
        $this->model = new FactorielleModel();
    }

    public function getQuestion() {
        header('Content-Type: application/json');
        $question = $this->model->generateQuestion(); // ["question" => 5, "answer" => 120]
        echo json_encode([
            "question" => $question['question']
        ]);
    }

    public function checkAnswer() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);

        $clientAnswer = isset($data['reponse']) ? (int)$data['reponse'] : null;
        $originalQuestion = isset($data['question']) ? (int)$data['question'] : null;

        if ($clientAnswer === null || $originalQuestion === null) {
            http_response_code(400);
            echo json_encode(["message" => "Question ou réponse manquante."]);
            return;
        }

        $expectedAnswer = $this->model->factorielle($originalQuestion);
        $isCorrect = ($clientAnswer === $expectedAnswer);

        echo json_encode([
            "correct" => $isCorrect,
            "message" => $isCorrect ? "Bonne réponse !" : "Mauvaise réponse."
        ]);
    }
}
