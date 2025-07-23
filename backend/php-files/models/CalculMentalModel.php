<?php
class CalculMentalModel {
    public function generateQuestion() {
        $operators = ['+', '-', '*', '/'];
        $operator = $operators[array_rand($operators)];
        
        // Ajuster les plages de nombres selon l'opérateur
        switch ($operator) {
            case '+':
                $a = rand(1, 100);
                $b = rand(1, 100);
                break;               
            case '-':
                $a = rand(1, 100);
                $b = rand(1, 100);
                break;
            case '*':
                $a = rand(1, 12);
                $b = rand(1, 12);
                break;
            case '/':
                $b = rand(1, 12);
                $a = $b * rand(1, 12); // Assure une division exacte
                break;
        }
        
        return ["arg1" => $a, "arg2" => $b, "operator" => $operator];
    }
public function verifyAnswer($clientAnswer) {
    session_start();  // Assure-toi que la session est démarrée

    if (!isset($_SESSION['questions']['calcul'])) {
        return false;
    }

    $question = $_SESSION['questions']['calcul'];
    $a = $question['arg1'];
    $b = $question['arg2'];
    $operator = $question['operator'];

    switch ($operator) {
        case '+': $correct = $a + $b; break;
        case '-': $correct = $a - $b; break;
        case '*': $correct = $a * $b; break;
        case '/': $correct = $b != 0 ? $a / $b : null; break;
        default: return false;
    }

    return round(floatval($clientAnswer), 2) == round($correct, 2);
}

}