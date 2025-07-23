<?php

class FactorielleModel
{
    public function __construct() {
        // Initialisation si nécessaire
    }
 public function generateQuestion() {
    $n = rand(1, 10);
    $fact = $this->factorielle($n); // méthode factorielle que tu dois définir
    return [
        "question" => "$n!",
        "answer" => $fact
    ];
}

public function factorielle($n) {
    return ($n <= 1) ? 1 : $n * $this->factorielle($n - 1);
}


}
