<?php
require_once __DIR__ . '/../models/MotManquantModel.php';

class MotManquantController
{
    private int $count; // Nombre de questions à générer
    private MotManquantModel $model;

    public function __construct()
    {
        $this->count = 5; // Nombre de questions à générer, peut être modifié selon les besoins
        // Initialisation du modèle de génération de questions
        $this->model = new MotManquantModel();
    }

    public function getQuestions()
    {
        header('Content-Type: application/json');
        $questions = [];

        for ($i = 0; $i < $this->count; $i++) {
            $q = $this->model->generateQuestion();
            // On masque la réponse correcte pour ne pas tricher
            $questions[] = ["phrase" => $q["phrase"]];
        }

        echo json_encode($questions);
    }
public function verifyAnswer(): void
{
    header('Content-Type: application/json');

    $input = json_decode(file_get_contents('php://input'), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(['error' => 'Requête invalide.']);
        return;
    }

    require_once __DIR__ . '/../models/MotManquantModel.php';
    $model = new MotManquantModel();

    $result = $model->verifyAnswers($input);

    echo json_encode($result);
}



}
